import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Shipping Terms & Restrictions",
  description: `Shipping terms, restricted items and documentation requirements for ${site.name} services.`,
  path: "/legal/shipping-terms",
});

export default function ShippingTerms() {
  return (
    <>
      <h1>Shipping Terms &amp; Restrictions</h1>
      <p className="meta">Draft template · last reviewed [DATE] · requires legal review</p>

      <h2>What can be shipped</h2>
      <p>
        Most personal parcels, documents, household goods and commercial cargo
        can be shipped subject to the restrictions below and the regulations of
        Bangladesh, Canada and transit countries. Always describe your contents
        accurately — we confirm acceptability before shipping.
      </p>

      <h2>Restricted and prohibited items</h2>
      <p>The following categories generally cannot be shipped or require special review:</p>
      <ul>
        <li>Dangerous goods — flammable, explosive, corrosive or toxic items</li>
        <li>Currency, negotiable instruments and precious metals</li>
        <li>Perishable foods and items requiring refrigeration</li>
        <li>Illegal items under either country&apos;s law</li>
        <li>Items restricted by aviation or customs regulations</li>
        <li>[REVIEW: complete list per carrier rules and local law]</li>
      </ul>

      <h2>Documentation</h2>
      <p>
        Shipments require accurate contents descriptions, declared values, and
        sender/receiver identification. Commercial shipments may require
        invoices and additional paperwork. Incomplete or inaccurate documentation
        can delay or block a shipment.
      </p>

      <h2>Customs, duties and fees</h2>
      <p>
        International shipments are subject to customs inspection. Duties,
        taxes and fees assessed by authorities are the responsibility of the
        party designated in the shipping arrangement. We explain what typically
        applies to your shipment before it moves.
      </p>

      <h2>Weight and measurement</h2>
      <p>
        Charges are based on actual or volumetric weight, whichever is greater,
        using measurements taken at processing. Under-declared weight or size
        may result in adjusted charges.
      </p>

      <h2>Claims</h2>
      <p>
        [REVIEW: insert your actual claims process, time limits for reporting
        loss or damage, and required evidence. Must be reviewed before
        publication.]
      </p>
    </>
  );
}
