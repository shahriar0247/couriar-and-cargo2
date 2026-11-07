"""Inquiry API — stores quote / urgent / contact submissions in SQLite.

Run:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Env:
    API_KEY        shared secret; the Next.js route sends it as X-API-Key.
                   Leave unset (default "dev") to accept anything locally.
    DB_PATH        sqlite file location (default: inquiries.db)
    ALLOWED_ORIGIN CORS origin for the Next.js site (default: http://localhost:3000)
"""

import os
import sqlite3
import time
import uuid
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from typing import Literal, Optional

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, StringConstraints
from typing_extensions import Annotated

API_KEY = os.environ.get("API_KEY", "dev")
DB_PATH = os.environ.get("DB_PATH", "inquiries.db")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "http://localhost:3000")

Str2 = Annotated[str, StringConstraints(strip_whitespace=True, min_length=2, max_length=200)]
StrOpt = Annotated[Optional[str], StringConstraints(strip_whitespace=True, max_length=2000)]


# ---------- models (mirror of src/lib/schemas.ts) ----------

class QuoteData(BaseModel):
    model_config = ConfigDict(extra="forbid")
    direction: Literal["bd-to-ca", "ca-to-bd"]
    originCity: Str2
    destinationCity: Str2
    service: Literal["air", "sea", "parcel", "not-sure"]
    shipmentType: Literal["documents", "parcel", "cargo", "household", "commercial", "other"]
    weight: StrOpt = None
    weightUnit: Literal["kg", "lb"] = "kg"
    dimensions: StrOpt = None
    packageCount: StrOpt = None
    contents: Str2
    readyDate: StrOpt = None
    urgency: Literal["standard", "soon", "urgent"]
    name: Str2
    email: Optional[str] = ""
    phone: Str2
    preferredContact: Literal["whatsapp", "phone", "email"] = "whatsapp"
    notes: StrOpt = None
    consent: bool
    company: str = ""


class UrgentData(BaseModel):
    model_config = ConfigDict(extra="forbid")
    direction: Literal["bd-to-ca", "ca-to-bd"]
    originCity: Str2
    destinationCity: Str2
    shipmentType: Literal["documents", "parcel", "cargo", "household", "commercial", "other"]
    weight: StrOpt = None
    neededBy: StrOpt = None
    contents: Str2
    name: Str2
    phone: Str2
    email: Optional[str] = ""
    company: str = ""


class ContactData(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: Str2
    email: Optional[str] = ""
    phone: StrOpt = None
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=10, max_length=4000)]
    company: str = ""


class Inquiry(BaseModel):
    kind: Literal["quote", "urgent", "contact"]
    data: QuoteData | UrgentData | ContactData


# ---------- storage ----------

def init_db() -> None:
    with sqlite3.connect(DB_PATH) as db:
        db.execute(
            """
            CREATE TABLE IF NOT EXISTS inquiries (
                id TEXT PRIMARY KEY,
                kind TEXT NOT NULL,
                payload TEXT NOT NULL,
                ip TEXT,
                created_at REAL NOT NULL,
                status TEXT NOT NULL DEFAULT 'new'
            )
            """
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Inquiry API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_methods=["POST"],
    allow_headers=["Content-Type", "X-API-Key"],
)


# ---------- rate limit: 10 req / IP / 10 min ----------

_hits: dict[str, deque[float]] = defaultdict(deque)
WINDOW, LIMIT = 600, 10


def rate_limit(request: Request) -> None:
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        raise HTTPException(429, "Too many submissions — try again later.")
    q.append(now)


def require_key(x_api_key: str = Header(default="")) -> None:
    if API_KEY != "dev" and x_api_key != API_KEY:
        raise HTTPException(401, "Invalid API key.")


# ---------- routes ----------

@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.post("/inquiries", status_code=201)
def create_inquiry(
    inquiry: Inquiry,
    request: Request,
    _: None = Depends(rate_limit),
    __: None = Depends(require_key),
) -> dict:
    # Honeypot filled → pretend success, store nothing.
    if getattr(inquiry.data, "company", ""):
        return {"ok": True, "id": None}

    inquiry_id = uuid.uuid4().hex[:12]
    with sqlite3.connect(DB_PATH) as db:
        db.execute(
            "INSERT INTO inquiries (id, kind, payload, ip, created_at) VALUES (?,?,?,?,?)",
            (
                inquiry_id,
                inquiry.kind,
                inquiry.data.model_dump_json(),
                request.client.host if request.client else None,
                time.time(),
            ),
        )
    return {"ok": True, "id": inquiry_id}


@app.get("/inquiries")
def list_inquiries(_: None = Depends(require_key)) -> dict:
    """Simple admin read — protect with API_KEY in real deployments."""
    with sqlite3.connect(DB_PATH) as db:
        db.row_factory = sqlite3.Row
        rows = db.execute(
            "SELECT id, kind, payload, created_at, status FROM inquiries ORDER BY created_at DESC LIMIT 100"
        ).fetchall()
    return {"inquiries": [dict(r) for r in rows]}
