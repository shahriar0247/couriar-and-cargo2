import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  path: "/legal/privacy",
});

export default function Privacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="meta">Draft template · last reviewed [DATE] · requires legal review</p>

      <h2>What we collect</h2>
      <p>
        When you contact us or request a quote, we collect the information you
        provide: your name, contact details (phone, WhatsApp, email), and the
        shipment details you describe — origin, destination, contents and timing.
      </p>

      <h2>Why we collect it</h2>
      <ul>
        <li>To respond to your inquiry and provide a shipping quote</li>
        <li>To arrange and complete shipping services you request</li>
        <li>To communicate with you about your shipment</li>
        <li>To meet legal and customs documentation requirements</li>
      </ul>

      <h2>How we share it</h2>
      <p>
        Shipment details may be shared with carriers, customs authorities and
        logistics partners strictly as needed to complete your shipment. We do
        not sell personal information to third parties. [REVIEW: describe actual
        data-sharing practices and any processors used.]
      </p>

      <h2>Retention and security</h2>
      <p>
        We retain inquiry information as long as needed to serve you and meet
        legal obligations. [REVIEW: state actual retention period and security
        measures.] We take reasonable precautions to protect your information,
        though no transmission over the internet is perfectly secure.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us to access, correct or delete the personal information we
        hold about you, subject to legal requirements. Contact us through the
        channels on our contact page. [REVIEW: adapt to applicable privacy law —
        e.g., PIPEDA in Canada.]
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The current version is
        always published on this page.
      </p>
    </>
  );
}
