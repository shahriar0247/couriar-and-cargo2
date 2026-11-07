"use client";

import type { ReactNode } from "react";
import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

const inputBase =
  "w-full border border-line bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-ink/50 transition-colors focus:border-navy-900 disabled:opacity-50";

export const inputClass = inputBase;
export const selectClass = `${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23101C2E%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`;
export const textareaClass = `${inputBase} min-h-28 resize-y`;

export function Field({
  label,
  error,
  hint,
  required = false,
  children,
  className = "",
}: {
  label: string;
  error?: FieldError;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-1.5 flex items-baseline gap-2 text-[0.8125rem] font-semibold text-navy-900">
          {label}
          {required && <span className="text-accent" aria-hidden>*</span>}
          {hint && <span className="font-normal text-slate-ink/70 text-[0.6875rem]">{hint}</span>}
        </span>
        {children}
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-accent-deep">
          {error.message}
        </p>
      )}
    </div>
  );
}

/** Visually-hidden honeypot — bots fill it, humans never see it. */
export function Honeypot<T extends FieldValues>({
  register,
}: {
  register: UseFormRegister<T>;
}) {
  return (
    <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        Company
        <input type="text" tabIndex={-1} autoComplete="off" {...register("company" as Path<T>)} />
      </label>
    </div>
  );
}
