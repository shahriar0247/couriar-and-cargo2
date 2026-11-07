import { z } from "zod";

export const DIRECTIONS = ["bd-to-ca", "ca-to-bd"] as const;
export const SERVICES = ["air", "sea", "parcel", "not-sure"] as const;
export const SHIPMENT_TYPES = [
  "documents",
  "parcel",
  "cargo",
  "household",
  "commercial",
  "other",
] as const;
export const WEIGHT_UNITS = ["kg", "lb"] as const;
export const URGENCY = ["standard", "soon", "urgent"] as const;
export const CONTACT_METHODS = ["whatsapp", "phone", "email"] as const;

const phoneOrEmail = z
  .string()
  .trim()
  .min(5, "Enter a valid phone or WhatsApp number");

export const quoteSchema = z.object({
  // Step 1 — route
  direction: z.enum(DIRECTIONS),
  originCity: z.string().trim().min(2, "Enter the origin city"),
  destinationCity: z.string().trim().min(2, "Enter the destination city"),

  // Step 2 — service
  service: z.enum(SERVICES),

  // Step 3 — shipment
  shipmentType: z.enum(SHIPMENT_TYPES),
  weight: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || !Number.isNaN(Number(v)), "Weight must be a number"),
  weightUnit: z.enum(WEIGHT_UNITS),
  dimensions: z.string().trim().optional(),
  packageCount: z.string().trim().optional(),
  contents: z.string().trim().min(4, "Briefly describe what you are sending"),
  readyDate: z.string().trim().optional(),
  urgency: z.enum(URGENCY),

  // Step 4 — contact
  name: z.string().trim().min(2, "Enter your name"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]),
  phone: phoneOrEmail,
  preferredContact: z.enum(CONTACT_METHODS),
  notes: z.string().trim().optional(),
  consent: z.literal(true, {
    error: "Please confirm we can contact you about this inquiry",
  }),

  // Spam control — must stay empty (honeypot)
  company: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const quoteDefaults: QuoteInput = {
  direction: "bd-to-ca",
  originCity: "Dhaka",
  destinationCity: "Toronto",
  service: "not-sure",
  shipmentType: "parcel",
  weight: "",
  weightUnit: "kg",
  dimensions: "",
  packageCount: "",
  contents: "",
  readyDate: "",
  urgency: "standard",
  name: "",
  email: "",
  phone: "",
  preferredContact: "whatsapp",
  notes: "",
  consent: true,
  company: "",
};

export const urgentSchema = z.object({
  direction: z.enum(DIRECTIONS),
  originCity: z.string().trim().min(2, "Enter the origin city"),
  destinationCity: z.string().trim().min(2, "Enter the destination city"),
  shipmentType: z.enum(SHIPMENT_TYPES),
  weight: z.string().trim().optional(),
  neededBy: z.string().trim().optional(),
  contents: z.string().trim().min(4, "Briefly describe the shipment"),
  name: z.string().trim().min(2, "Enter your name"),
  phone: phoneOrEmail,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type UrgentInput = z.infer<typeof urgentSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more about your shipment"),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
