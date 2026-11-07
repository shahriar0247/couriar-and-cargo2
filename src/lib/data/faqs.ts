export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export type FaqCategory =
  | "General"
  | "Air Cargo"
  | "Sea Cargo"
  | "Parcels"
  | "Urgent"
  | "Pricing"
  | "Customs"
  | "Packaging"
  | "Contact";

export const FAQ_CATEGORIES: FaqCategory[] = [
  "General",
  "Air Cargo",
  "Sea Cargo",
  "Parcels",
  "Urgent",
  "Pricing",
  "Customs",
  "Packaging",
  "Contact",
];

export const faqs: FaqItem[] = [
  // General
  {
    category: "General",
    question: "Do you ship both ways between Bangladesh and Canada?",
    answer:
      "Yes. We handle inquiries in both directions — Bangladesh to Canada and Canada to Bangladesh — by air, sea and courier services.",
  },
  {
    category: "General",
    question: "Which cities do you ship from and to?",
    answer:
      "We regularly discuss shipments involving major cities such as Dhaka, Chattogram, Toronto, Vancouver and Montréal, among others. Tell us your origin and destination in a quote request and we will confirm what options are available for your route.",
  },
  {
    category: "General",
    question: "How long does shipping take?",
    answer:
      "Transit time depends on the service, route, carrier schedules and customs processing. Air and courier services are generally faster than sea freight. Once we know your shipment details, we can discuss realistic timing for your route — we don't quote fixed transit guarantees without confirming the specific shipment.",
  },
  // Air
  {
    category: "Air Cargo",
    question: "When should I choose air cargo?",
    answer:
      "Air cargo suits time-sensitive or higher-value shipments — commercial goods needed quickly, samples, urgent personal effects and larger consignments that can't wait for sea transit. It's typically priced higher per kilogram than sea freight.",
  },
  {
    category: "Air Cargo",
    question: "What information do you need for an air cargo quote?",
    answer:
      "Origin and destination cities, a description of the goods, approximate weight and dimensions, number of packages, and your timeline. If the goods are commercial, the declared value and intended use help too.",
  },
  // Sea
  {
    category: "Sea Cargo",
    question: "When is sea freight the better option?",
    answer:
      "For larger, heavier or less time-sensitive shipments — household goods, commercial inventory and bulk cargo — sea freight is usually far more economical per kilogram than air.",
  },
  {
    category: "Sea Cargo",
    question: "Can I send a small shipment by sea?",
    answer:
      "Smaller sea shipments often travel as consolidated cargo, sharing container space with other consignments. Availability depends on the route and schedule — ask us with your shipment details and we'll explain the options.",
  },
  // Parcels
  {
    category: "Parcels",
    question: "Can I send documents or a small parcel?",
    answer:
      "Yes — documents, personal parcels and smaller packages are handled through our courier services. Tell us what you're sending, where to, and how soon it needs to arrive.",
  },
  {
    category: "Parcels",
    question: "How should I pack a parcel?",
    answer:
      "Use a sturdy box, cushion fragile items, seal edges with strong tape and remove old labels. Documents should go in rigid envelopes. We share packing guidance when we confirm your shipment details.",
  },
  // Urgent
  {
    category: "Urgent",
    question: "I need something shipped urgently — what should I do?",
    answer:
      "Contact us by phone or WhatsApp straight away, or use the urgent shipping form. Tell us the shipment, the route and your deadline — we'll discuss the fastest workable options. We never promise delivery dates we can't stand behind.",
  },
  {
    category: "Urgent",
    question: "Is same-day or next-day delivery available?",
    answer:
      "It depends on the route, shipment, carrier schedules and cut-off times. Urgent options are often possible, but we confirm specifics only after reviewing your shipment — never as a blanket guarantee.",
  },
  // Pricing
  {
    category: "Pricing",
    question: "How much does shipping cost?",
    answer:
      "Pricing depends on the route, service, weight, dimensions and the nature of the goods — plus any applicable duties or fees. That's why we quote per shipment rather than publishing flat rates. Request a quote with your details for an accurate figure.",
  },
  {
    category: "Pricing",
    question: "Why is weight and size needed for a quote?",
    answer:
      "Carriers price on actual or volumetric weight — whichever is greater. Dimensions let us calculate that correctly and avoid surprise charges later.",
  },
  // Customs
  {
    category: "Customs",
    question: "Will my shipment go through customs?",
    answer:
      "International shipments are subject to customs inspection in both countries. Duties, taxes and clearance requirements vary by goods, value and destination — we explain what typically applies to your shipment when we quote.",
  },
  {
    category: "Customs",
    question: "What documents do I need?",
    answer:
      "Commonly an item description, value declaration and sender/receiver identification — commercial cargo may need invoices or additional paperwork. We walk you through the requirements for your specific shipment before you hand anything over.",
  },
  // Packaging
  {
    category: "Packaging",
    question: "What can't I ship?",
    answer:
      "Dangerous goods, perishables, currency, and items restricted by either country's regulations can't travel with us. Rules differ by service and destination — tell us what you're sending and we'll confirm whether it's acceptable.",
  },
  {
    category: "Packaging",
    question: "Do you provide packing help?",
    answer:
      "We can advise on packing for your shipment type when you book. Let us know if your items are fragile or unusual so we can discuss the right approach.",
  },
  // Contact
  {
    category: "Contact",
    question: "How do I get updates on my shipment?",
    answer:
      "Once your shipment is confirmed, we agree on how updates reach you — typically WhatsApp, phone or email. We don't operate a public tracking portal; communication stays personal and direct.",
  },
  {
    category: "Contact",
    question: "What's the fastest way to reach you?",
    answer:
      "WhatsApp or a phone call is usually fastest. For detailed quote requests, the quote form collects everything we need in one pass and we reply on your preferred channel.",
  },
];
