# Corridor Cargo — Bangladesh ⇄ Canada shipping site

Marketing + inquiry website for a courier / international cargo company
operating on the Bangladesh–Canada corridor. Next.js 16 (App Router,
Turbopack), TypeScript, Tailwind CSS v4, Motion for React, Zod +
React Hook Form, and an optional FastAPI + SQLite inquiry backend.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, quick-quote, services, urgent band, route map, process, FAQ preview |
| `/services/air-cargo` | Air freight service page |
| `/services/sea-cargo` | Ocean freight service page |
| `/services/parcel-courier` | Parcel & express page |
| `/urgent-shipping` | High-conversion urgent inquiry page (call / WhatsApp / short form) |
| `/shipping-routes` | Both directions + customs notes + animated corridor map |
| `/get-a-quote` | 5-step quote wizard (route → service → shipment → contact → review) |
| `/how-it-works` | Interactive 6-step timeline |
| `/about` | Company introduction |
| `/faq` | Searchable, category-filtered FAQ |
| `/contact` | WhatsApp / phone / email / form |
| `/legal/*` | Privacy, Terms, Shipping Terms — **draft templates, need legal review** |

## Configure the business

Everything business-specific lives in `src/config/site.ts` and reads
env vars (see `.env.local.example`): company name, phone, WhatsApp,
email, offices, hours, socials, backend URL. **Contact channels left
empty are simply not rendered** — nothing fake is ever shown.

```bash
cp .env.local.example .env.local   # then fill it in
```

## Run the frontend

```bash
npm install
npm run dev      # http://localhost:3000
```

## Run the inquiry backend (optional)

Without `QUOTE_API_URL`, form submissions fall back to a pre-filled
WhatsApp message — the site is fully usable with no backend at all.

```bash
cd backend
pip install -r requirements.txt
$env:API_KEY = "your-secret"            # PowerShell
uvicorn main:app --port 8000
```

Then set in `.env.local`:

```
QUOTE_API_URL=http://localhost:8000
QUOTE_API_KEY=your-secret
```

Submissions flow: browser → `/api/inquiry` (Zod validation, honeypot,
IP rate limit) → FastAPI (`X-API-Key`, second validation + rate limit)
→ `inquiries.db` (SQLite). List stored inquiries via
`GET /inquiries` with the API key.

## Notes

- No imagery is hot-linked — all visuals are self-authored SVG in
  `src/components/visual/` (corridor map, aircraft, ship, parcel art).
- Legal pages are marked templates; have counsel review before launch.
- No tracking feature exists because none was supplied — don't add a
  fake one.
