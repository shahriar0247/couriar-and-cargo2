import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms governing use of the ${site.name} website and services.`,
  path: "/legal/terms",
});

export default function Terms() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="meta">Draft template · last reviewed [DATE] · requires legal review</p>

      <h2>The service</h2>
      <p>
        {site.name} facilitates shipping of parcels, documents and cargo between
        Bangladesh and Canada by air and sea, in both directions. Specific
        services are arranged and confirmed per shipment.
      </p>

      <h2>Quotes and pricing</h2>
      <p>
        Quotes are provided per shipment based on the details you supply — route,
        weight, dimensions, contents and service. A quote is an offer valid for
        the period stated at the time it is given; it is not a guaranteed price
        until confirmed. [REVIEW: define actual quote validity terms.]
      </p>

      <h2>No guaranteed transit times</h2>
      <p>
        Transit times discussed are estimates based on route, service, carrier
        schedules and customs processing. Unless a specific guarantee is agreed
        in writing for a shipment, timing is not guaranteed.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Provide accurate shipment descriptions and values</li>
        <li>Ensure items are permitted under applicable regulations</li>
        <li>Pack shipments appropriately or follow agreed packing arrangements</li>
        <li>Provide correct sender and receiver information</li>
      </ul>

      <h2>Liability</h2>
      <p>
        [REVIEW: insert your actual liability terms — carrier liability limits,
        declared value, insurance options and exclusions. Do not publish without
        legal review; liability terms are jurisdiction-specific and
        business-specific.]
      </p>

      <h2>Website use</h2>
      <p>
        Content on this website is for general information and does not
        constitute a binding offer. Contractual terms are agreed per shipment.
      </p>
    </>
  );
}
