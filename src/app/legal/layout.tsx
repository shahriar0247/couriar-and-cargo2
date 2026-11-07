import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TriangleAlert } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-24 md:pt-32">
      <div className="container-site max-w-3xl pb-20">
        <Breadcrumbs items={[{ label: "Legal" }]} />
        <div className="mt-8 flex items-start gap-4 border border-amber-300 bg-amber-50 p-5">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
          <p className="text-sm leading-relaxed text-amber-900">
            <strong>Draft — requires legal review.</strong> This page is a
            starting template, not legal advice. Have qualified counsel review
            and adapt it to your business before publishing.
          </p>
        </div>
        <article className="prose-legal mt-10">{children}</article>
      </div>
    </section>
  );
}
