"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { site, whatsappHref } from "@/config/site";
import { Field, Honeypot, inputClass, textareaClass } from "@/components/forms/fields";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "whatsapp">("idle");
  const [serverError, setServerError] = useState("");
  const [lastData, setLastData] = useState<ContactInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", company: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setLastData(data);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", data }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus(json.fallback === "whatsapp" ? "whatsapp" : "done");
      else {
        setServerError(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — please try WhatsApp or email instead.");
      setStatus("error");
    }
  };

  const waLink =
    lastData &&
    whatsappHref(
      `Message for ${site.name}\n—\n${lastData.message}\n—\n${lastData.name}${lastData.phone ? ` · ${lastData.phone}` : ""}${lastData.email ? ` · ${lastData.email}` : ""}`,
    );

  if (status === "done") {
    return (
      <div className="border border-line bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="font-display mt-4 text-2xl font-medium text-navy-900">Message received.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-slate-ink">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }
  if (status === "whatsapp" && waLink) {
    return (
      <div className="border border-line bg-white p-8 text-center">
        <MessageCircle className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="font-display mt-4 text-2xl font-medium text-navy-900">Send it via WhatsApp.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-slate-ink">
          Your message is pre-filled and ready.
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
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5 border border-line bg-white p-6 sm:p-8" noValidate>
      <Honeypot register={register} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} required>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone} hint="optional">
          <input className={inputClass} autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <Field label="Email" error={errors.email} hint="optional if you leave a phone">
        <input type="email" className={inputClass} autoComplete="email" {...register("email")} />
      </Field>
      <Field label="Your message" error={errors.message} required>
        <textarea className={textareaClass} {...register("message")} placeholder="Tell us about your shipment or question…" />
      </Field>
      {status === "error" && (
        <p role="alert" className="border-l-2 border-accent-deep bg-paper p-4 text-sm text-accent-deep">
          {serverError}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-navy-950 disabled:opacity-60"
      >
        {status === "sending" ? (
          <><Loader2 className="size-4 animate-spin" aria-hidden /> Sending…</>
        ) : (
          <><Send className="size-4" aria-hidden /> Send message</>
        )}
      </button>
    </form>
  );
}
