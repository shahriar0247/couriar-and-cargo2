"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { urgentSchema, type UrgentInput } from "@/lib/schemas";
import { site, whatsappHref } from "@/config/site";
import { Field, Honeypot, inputClass, selectClass, textareaClass } from "@/components/forms/fields";

export function UrgentForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "whatsapp">("idle");
  const [serverError, setServerError] = useState("");
  const [lastData, setLastData] = useState<UrgentInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrgentInput>({
    resolver: zodResolver(urgentSchema),
    defaultValues: {
      direction: "bd-to-ca",
      originCity: "",
      destinationCity: "",
      shipmentType: "parcel",
      weight: "",
      neededBy: "",
      contents: "",
      name: "",
      phone: "",
      email: "",
      company: "",
    },
  });

  const onSubmit = async (data: UrgentInput) => {
    setStatus("sending");
    setLastData(data);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "urgent", data }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus(json.fallback === "whatsapp" ? "whatsapp" : "done");
      else {
        setServerError(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — call or WhatsApp us directly for the fastest reply.");
      setStatus("error");
    }
  };

  const waLink =
    lastData &&
    whatsappHref(
      `URGENT inquiry — ${site.name}\nRoute: ${lastData.direction === "bd-to-ca" ? "Bangladesh → Canada" : "Canada → Bangladesh"}\n${lastData.originCity} → ${lastData.destinationCity}\nType: ${lastData.shipmentType}${lastData.weight ? ` · ${lastData.weight}` : ""}\nNeeded by: ${lastData.neededBy || "ASAP"}\nContents: ${lastData.contents}\n—\n${lastData.name} · ${lastData.phone}`,
    );

  if (status === "done") {
    return (
      <div className="border border-white/15 bg-white/[0.04] p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="font-display mt-4 text-2xl font-medium text-paper">Urgent inquiry received.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-paper/60">
          We treat urgent inquiries with priority. Expect a reply shortly — or
          call us right now if it truly can&apos;t wait.
        </p>
      </div>
    );
  }
  if (status === "whatsapp" && waLink) {
    return (
      <div className="border border-white/15 bg-white/[0.04] p-8 text-center">
        <MessageCircle className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="font-display mt-4 text-2xl font-medium text-paper">Send it via WhatsApp.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-paper/60">
          Your urgent inquiry is pre-filled — tap below and press send.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-[#25d366] px-8 py-4 text-sm font-semibold text-white hover:opacity-90"
        >
          <MessageCircle className="size-4" aria-hidden /> Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5 border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8" noValidate>
      <Honeypot register={register} />

      <div className="grid grid-cols-2 gap-px border border-white/15 bg-white/15">
        {(
          [
            { value: "bd-to-ca", label: "BD → Canada" },
            { value: "ca-to-bd", label: "Canada → BD" },
          ] as const
        ).map((d) => (
          <label key={d.value} className="cursor-pointer">
            <input type="radio" value={d.value} {...register("direction")} className="peer sr-only" />
            <span className="block p-3.5 text-center text-sm font-semibold text-paper/70 transition-colors peer-checked:bg-accent peer-checked:text-navy-950">
              {d.label}
            </span>
          </label>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 [&_label>span]:text-paper/80 [&_input]:border-white/20 [&_input]:bg-white/5 [&_input]:text-paper [&_select]:border-white/20 [&_select]:bg-white/5 [&_select]:text-paper [&_textarea]:border-white/20 [&_textarea]:bg-white/5 [&_textarea]:text-paper">
        <Field label="Origin city" error={errors.originCity} required>
          <input className={inputClass} {...register("originCity")} placeholder="e.g. Toronto" />
        </Field>
        <Field label="Destination city" error={errors.destinationCity} required>
          <input className={inputClass} {...register("destinationCity")} placeholder="e.g. Dhaka" />
        </Field>
        <Field label="Shipment type" error={errors.shipmentType} required>
          <select className={`${selectClass} [&>option]:text-navy-900`} {...register("shipmentType")}>
            <option value="documents">Documents</option>
            <option value="parcel">Parcel</option>
            <option value="cargo">Cargo</option>
            <option value="household">Household goods</option>
            <option value="commercial">Commercial goods</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Approx. weight" error={errors.weight} hint="optional">
          <input className={inputClass} {...register("weight")} placeholder="e.g. 5 kg" />
        </Field>
      </div>

      <Field label="Needed by" error={errors.neededBy} hint="date or 'ASAP'">
        <input className={`${inputClass} border-white/20 bg-white/5 text-paper`} {...register("neededBy")} placeholder="e.g. this Friday" />
      </Field>

      <Field label="What are you sending?" error={errors.contents} required>
        <textarea className={`${textareaClass} border-white/20 bg-white/5 text-paper`} {...register("contents")} placeholder="Describe the shipment briefly" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2 [&_label>span]:text-paper/80 [&_input]:border-white/20 [&_input]:bg-white/5 [&_input]:text-paper">
        <Field label="Your name" error={errors.name} required>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone} required>
          <input className={inputClass} autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <Field label="Email" error={errors.email} hint="optional" className="[&_label>span]:text-paper/80">
        <input type="email" className={`${inputClass} border-white/20 bg-white/5 text-paper`} {...register("email")} />
      </Field>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-accent bg-white/5 p-4 text-sm text-paper/80">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 bg-accent px-6 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-paper disabled:opacity-60"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" aria-hidden /> Sending…</>
        ) : (
          <><Send className="size-4" aria-hidden /> Contact us about urgent shipping</>
        )}
      </button>
      <p className="text-center text-[0.6875rem] text-paper/40">
        We&apos;ll confirm what&apos;s realistically possible — no blanket promises.
      </p>
    </form>
  );
}
