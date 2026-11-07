import type { QuoteInput } from "@/lib/schemas";

const DIRECTION_LABEL = {
  "bd-to-ca": "Bangladesh → Canada",
  "ca-to-bd": "Canada → Bangladesh",
} as const;

const SERVICE_LABEL = {
  air: "Air Cargo",
  sea: "Sea Cargo",
  parcel: "Parcel & Express",
  "not-sure": "Not sure yet",
} as const;

/**
 * Prefilled WhatsApp message for a quote inquiry.
 * Plain text, \n separated — WhatsApp renders newlines from %0A.
 */
export function quoteWhatsappMessage(q: QuoteInput, companyName: string): string {
  const lines = [
    `New shipping inquiry — ${companyName}`,
    `Route: ${DIRECTION_LABEL[q.direction]}`,
    `From: ${q.originCity} → ${q.destinationCity}`,
    `Service: ${SERVICE_LABEL[q.service]}`,
    `Shipment: ${q.shipmentType}`,
    q.weight ? `Weight: ${q.weight} ${q.weightUnit}` : null,
    q.packageCount ? `Packages: ${q.packageCount}` : null,
    `Contents: ${q.contents}`,
    `Urgency: ${q.urgency}`,
    `—`,
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    q.email ? `Email: ${q.email}` : null,
    q.notes ? `Notes: ${q.notes}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}
