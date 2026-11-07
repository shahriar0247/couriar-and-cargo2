"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Package,
  Plane,
  Ship,
  HelpCircle,
} from "lucide-react";
import {
  quoteDefaults,
  quoteSchema,
  type QuoteInput,
} from "@/lib/schemas";
import { quoteWhatsappMessage } from "@/lib/whatsapp";
import { whatsappHref } from "@/config/site";
import { site } from "@/config/site";
import {
  Field,
  Honeypot,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/forms/fields";

const STEPS = ["Route", "Service", "Shipment", "Contact", "Review"] as const;

const STEP_FIELDS: Record<number, FieldPath<QuoteInput>[]> = {
  0: ["direction", "originCity", "destinationCity"],
  1: ["service"],
  2: ["shipmentType", "contents", "weight", "urgency"],
  3: ["name", "phone", "email", "consent"],
  4: [],
};

const SERVICE_OPTS = [
  { value: "air", label: "Air Cargo", note: "Time-sensitive freight", icon: Plane },
  { value: "sea", label: "Sea Cargo", note: "Larger, heavier loads", icon: Ship },
  { value: "parcel", label: "Parcel & Express", note: "Parcels and documents", icon: Package },
  { value: "not-sure", label: "Not sure yet", note: "We'll help you choose", icon: HelpCircle },
] as const;

export function QuoteForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "whatsapp">("idle");
  const [serverError, setServerError] = useState("");
  const [lastData, setLastData] = useState<QuoteInput | null>(null);

  const defaults = useMemo<QuoteInput>(() => {
    const d = { ...quoteDefaults };
    const dir = params.get("direction");
    if (dir === "bd-to-ca" || dir === "ca-to-bd") d.direction = dir;
    const origin = params.get("origin");
    if (origin) d.originCity = origin;
    const dest = params.get("dest");
    if (dest) d.destinationCity = dest;
    const service = params.get("service");
    if (service === "air" || service === "sea" || service === "parcel") d.service = service;
    return d;
  }, [params]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  const values = watch();

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: QuoteInput) => {
    setStatus("sending");
    setServerError("");
    setLastData(data);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "quote", data }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus(json.fallback === "whatsapp" ? "whatsapp" : "done");
      } else {
        setServerError(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — please try again or reach us on WhatsApp.");
      setStatus("error");
    }
  };

  const waLink = lastData
    ? whatsappHref(quoteWhatsappMessage(lastData, site.name))
    : whatsappHref();

  /* ---------- success states ---------- */
  if (status === "done") {
    return (
      <SuccessPanel
        title="Inquiry received."
        body="We've got your shipment details. Expect a reply on your preferred channel — usually the same business day."
      />
    );
  }
  if (status === "whatsapp") {
    return (
      <div className="border border-line bg-white p-8 text-center lg:p-12">
        <MessageCircle className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="font-display mt-5 text-2xl font-medium text-navy-900 sm:text-3xl">
          One step left — send it on WhatsApp.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-ink">
          Our inquiry inbox isn&apos;t connected yet, so your details are
          pre-filled into a WhatsApp message instead. Tap below — everything you
          entered is already written.
        </p>
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 bg-[#25d366] px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" aria-hidden /> Open WhatsApp
          </a>
        )}
        <p className="mt-4 text-xs text-slate-ink/70">
          Your details stay on your device until you press send in WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white">
      {/* progress */}
      <div className="border-b border-line px-6 py-5 sm:px-8">
        <ol className="flex items-center gap-2 sm:gap-3" aria-label="Quote progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                className={`flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.15em] uppercase transition-colors ${
                  i === step
                    ? "text-navy-900"
                    : i < step
                      ? "text-accent cursor-pointer"
                      : "text-slate-ink/40"
                }`}
              >
                <span
                  className={`grid size-6 place-items-center rounded-full text-[0.625rem] ${
                    i === step
                      ? "bg-navy-900 text-paper"
                      : i < step
                        ? "bg-accent text-navy-950"
                        : "border border-line text-slate-ink/50"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="size-3.5" aria-hidden /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px w-4 bg-line sm:w-8" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8" noValidate>
        <Honeypot register={register} />

        {/* STEP 1 · route */}
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-xl font-medium text-navy-900">
              Which way is it going?
            </legend>
            <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line">
              {(
                [
                  { value: "bd-to-ca", label: "Bangladesh → Canada" },
                  { value: "ca-to-bd", label: "Canada → Bangladesh" },
                ] as const
              ).map((d) => (
                <button
                  key={d.value}
                  type="button"
                  aria-pressed={values.direction === d.value}
                  onClick={() => setValue("direction", d.value, { shouldValidate: true })}
                  className={`p-5 text-sm font-semibold transition-colors ${
                    values.direction === d.value
                      ? "bg-navy-900 text-paper"
                      : "bg-white text-navy-900 hover:bg-paper"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="mt-6 grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <Field label="Origin city" error={errors.originCity} required>
                <input className={inputClass} {...register("originCity")} placeholder="e.g. Dhaka" />
              </Field>
              <button
                type="button"
                aria-label="Swap cities"
                onClick={() => {
                  const o = getValues("originCity");
                  setValue("originCity", getValues("destinationCity"));
                  setValue("destinationCity", o);
                }}
                className="mb-1 grid size-11 place-items-center justify-self-center border border-line text-slate-ink transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                <ArrowLeftRight className="size-4" aria-hidden />
              </button>
              <Field label="Destination city" error={errors.destinationCity} required>
                <input className={inputClass} {...register("destinationCity")} placeholder="e.g. Toronto" />
              </Field>
            </div>
          </fieldset>
        )}

        {/* STEP 2 · service */}
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-xl font-medium text-navy-900">
              Which service fits?
            </legend>
            <p className="mt-2 text-sm text-slate-ink">
              Not sure is fine — we&apos;ll recommend based on your shipment.
            </p>
            <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
              {SERVICE_OPTS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={values.service === s.value}
                  onClick={() => setValue("service", s.value, { shouldValidate: true })}
                  className={`flex items-start gap-4 p-5 text-left transition-colors ${
                    values.service === s.value
                      ? "bg-navy-900 text-paper"
                      : "bg-white text-navy-900 hover:bg-paper"
                  }`}
                >
                  <s.icon
                    className={`mt-0.5 size-5 shrink-0 ${values.service === s.value ? "text-accent" : "text-slate-ink"}`}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-semibold">{s.label}</span>
                    <span className={`mt-0.5 block text-xs ${values.service === s.value ? "text-paper/60" : "text-slate-ink"}`}>
                      {s.note}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* STEP 3 · shipment */}
        {step === 2 && (
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-medium text-navy-900">
              What are you sending?
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Shipment type" error={errors.shipmentType} required>
                <select className={selectClass} {...register("shipmentType")}>
                  <option value="documents">Documents</option>
                  <option value="parcel">Personal parcel</option>
                  <option value="cargo">Cargo</option>
                  <option value="household">Household goods</option>
                  <option value="commercial">Commercial goods</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Number of packages" error={errors.packageCount} hint="optional">
                <input className={inputClass} inputMode="numeric" {...register("packageCount")} placeholder="e.g. 3" />
              </Field>
              <Field label="Approximate weight" error={errors.weight} hint="optional">
                <div className="flex">
                  <input className={`${inputClass} rounded-r-none border-r-0`} inputMode="decimal" {...register("weight")} placeholder="e.g. 12" />
                  <select className={`${selectClass} w-20 rounded-l-none`} {...register("weightUnit")} aria-label="Weight unit">
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </Field>
              <Field label="Dimensions" error={errors.dimensions} hint="L×W×H, optional">
                <input className={inputClass} {...register("dimensions")} placeholder="e.g. 40 × 30 × 20 cm" />
              </Field>
            </div>
            <Field label="Describe the contents" error={errors.contents} required hint="the more honest, the more accurate the quote">
              <textarea className={textareaClass} {...register("contents")} placeholder="e.g. Winter clothes, books and a few gifts for family" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Ready to ship date" error={errors.readyDate} hint="optional">
                <input type="date" className={inputClass} {...register("readyDate")} />
              </Field>
              <Field label="How urgent is it?" error={errors.urgency} required>
                <select className={selectClass} {...register("urgency")}>
                  <option value="standard">Standard — no rush</option>
                  <option value="soon">Soon — within weeks</option>
                  <option value="urgent">Urgent — as fast as possible</option>
                </select>
              </Field>
            </div>
            {values.urgency === "urgent" && (
              <p className="border-l-2 border-accent bg-paper p-4 text-sm text-slate-ink">
                Urgent? After submitting, WhatsApp or a call will get you the
                fastest conversation.
              </p>
            )}
          </fieldset>
        )}

        {/* STEP 4 · contact */}
        {step === 3 && (
          <fieldset className="space-y-5">
            <legend className="font-display text-xl font-medium text-navy-900">
              Where do we reply?
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name} required>
                <input className={inputClass} autoComplete="name" {...register("name")} />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone} required hint="with country code">
                <input className={inputClass} autoComplete="tel" inputMode="tel" {...register("phone")} placeholder="+880 … or +1 …" />
              </Field>
              <Field label="Email" error={errors.email} hint="optional">
                <input type="email" className={inputClass} autoComplete="email" {...register("email")} />
              </Field>
              <Field label="Preferred contact" error={errors.preferredContact}>
                <select className={selectClass} {...register("preferredContact")}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone call</option>
                  <option value="email">Email</option>
                </select>
              </Field>
            </div>
            <Field label="Anything else?" error={errors.notes} hint="optional">
              <textarea className={`${textareaClass} min-h-20`} {...register("notes")} />
            </Field>
            <Field label="" error={errors.consent}>
              <span className="flex items-start gap-3 text-sm text-slate-ink">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[#F97316]"
                  {...register("consent")}
                />
                It&apos;s okay to contact me about this inquiry on the details above.
              </span>
            </Field>
          </fieldset>
        )}

        {/* STEP 5 · review */}
        {step === 4 && (
          <div>
            <h2 className="font-display text-xl font-medium text-navy-900">Check it, then send it.</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              {[
                ["Route", `${values.originCity} → ${values.destinationCity}`],
                ["Direction", values.direction === "bd-to-ca" ? "Bangladesh → Canada" : "Canada → Bangladesh"],
                ["Service", SERVICE_OPTS.find((s) => s.value === values.service)?.label ?? ""],
                ["Shipment", `${values.shipmentType}${values.weight ? ` · ${values.weight} ${values.weightUnit}` : ""}${values.packageCount ? ` · ${values.packageCount} pkg` : ""}`],
                ["Contents", values.contents],
                ["Urgency", values.urgency],
                ["Name", values.name],
                ["Contact", `${values.phone}${values.email ? ` · ${values.email}` : ""}`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-slate-ink">{k}</dt>
                  <dd className="text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-slate-ink">
              What happens next: we review the route and shipment, then reply on
              your preferred channel with options and a quote. No obligation.
            </p>
            {status === "error" && (
              <p role="alert" className="mt-4 border-l-2 border-accent-deep bg-paper p-4 text-sm text-accent-deep">
                {serverError}
              </p>
            )}
          </div>
        )}

        {/* nav */}
        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-ink transition-colors enabled:hover:text-navy-900 disabled:opacity-0"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-navy-950"
            >
              Continue <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-900 hover:text-paper disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>Send inquiry <ArrowRight className="size-4" aria-hidden /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function SuccessPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line bg-white p-8 text-center lg:p-12">
      <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
      <h2 className="font-display mt-5 text-2xl font-medium text-navy-900 sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-ink">{body}</p>
    </div>
  );
}
