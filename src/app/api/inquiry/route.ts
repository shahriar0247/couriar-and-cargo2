import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { contactSchema, quoteSchema, urgentSchema } from "@/lib/schemas";
import { z } from "zod";

/**
 * Unified inquiry endpoint.
 *
 * Flow: validate → rate-limit → forward to the FastAPI backend when
 * QUOTE_API_URL is configured → otherwise return `fallback: "whatsapp"`
 * so the client completes the inquiry through a prefilled WhatsApp message.
 *
 * Secrets never reach the client: QUOTE_API_KEY is server-only.
 */

const payloadSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("quote"), data: quoteSchema }),
  z.object({ kind: z.literal("urgent"), data: urgentSchema }),
  z.object({ kind: z.literal("contact"), data: contactSchema }),
]);

// --- naive in-memory rate limit: 6 submissions / IP / 10 min ---
const buckets = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 6;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  b.count += 1;
  return b.count > MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions — please try again later or message us on WhatsApp." },
      { status: 429 },
    );
  }

  let payload: z.infer<typeof payloadSchema>;
  try {
    payload = payloadSchema.parse(await req.json());
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission.", issues: e instanceof z.ZodError ? e.flatten() : undefined },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed for bots, store nothing.
  if (payload.data.company) {
    return NextResponse.json({ ok: true });
  }

  if (site.api.quoteUrl) {
    try {
      const res = await fetch(`${site.api.quoteUrl}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(site.api.apiKey ? { "X-API-Key": site.api.apiKey } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Could not save your inquiry right now — please try WhatsApp instead.", fallback: "whatsapp" },
          { status: 502 },
        );
      }
      const json = await res.json().catch(() => ({}));
      return NextResponse.json({ ok: true, id: json.id ?? null });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not reach the inquiry service — please try WhatsApp instead.", fallback: "whatsapp" },
        { status: 502 },
      );
    }
  }

  // No backend configured — client should offer the WhatsApp path.
  return NextResponse.json({ ok: true, fallback: "whatsapp" });
}
