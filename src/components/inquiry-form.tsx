"use client";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import {
  inquiryTypes,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";

export function InquiryForm() {
  const id = useId();
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      ["name", "email", "inquiryType", "details"].map((key) => [
        key,
        String(data.get(key) ?? "").trim(),
      ]),
    ) as Inquiry;
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    setStatus("");
    setFailed(false);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement)?.focus();
      return;
    }
    setSending(true);
    try {
      const result = await submitInquiry(values);
      form.reset();
      setStatus(result.message);
    } catch (error) {
      setFailed(true);
      setStatus(
        error instanceof Error && error.message === "EMAILJS_NOT_CONFIGURED"
          ? "Email delivery isn’t configured yet. Please contact the studio directly at kumaraman50099@gmail.com."
          : "Your inquiry could not be sent. Please try again or contact the studio directly.",
      );
    } finally {
      setSending(false);
    }
  }

  function fieldProps(name: keyof Inquiry) {
    return {
      id: `${id}-${name}`,
      name,
      required: true,
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
      onChange: () => {
        setErrors((previous) => ({ ...previous, [name]: undefined }));
        setStatus("");
      },
    };
  }
  function error(name: keyof Inquiry) {
    return (
      errors[name] && (
        <p
          className="field-error pt-2 text-xs leading-5 text-[#ffcabf]"
          id={`${id}-${name}-error`}
        >
          {errors[name]}
        </p>
      )
    );
  }

  const fieldClass =
    "block h-[52px] min-h-[52px] w-full rounded-none border-0 border-b border-white/30 bg-transparent px-0 pt-[18px] pb-3 text-sm leading-[21px] text-white placeholder:text-white/60 focus:border-orange focus:outline-none aria-[invalid=true]:border-[#f4b4a7] max-md:text-base";
  const labelClass =
    "absolute top-0 left-0 z-[1] cursor-text text-[11px] leading-[15px] text-[var(--muted)]";

  return (
    <form
      className="flex min-w-0 flex-col items-stretch gap-8 rounded-md bg-(--form) p-6 text-white shadow-[0_12px_16px_rgb(58_53_48/6%)] sm:p-8 xl:p-12"
      aria-labelledby={`${id}-heading`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <p className="eyebrow text-[11px]!">Inquire Now</p>
        <h2
          className="text-4xl! leading-[1.15]! !text-white"
          id={`${id}-heading`}
        >
          Save your date
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="relative min-w-0">
            <label className={labelClass} htmlFor={`${id}-name`}>
              Name
            </label>
            <input
              className={fieldClass}
              {...fieldProps("name")}
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              maxLength={120}
            />
            {error("name")}
          </div>
          <div className="relative min-w-0">
            <label className={labelClass} htmlFor={`${id}-email`}>
              Email
            </label>
            <input
              className={fieldClass}
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              maxLength={254}
            />
            {error("email")}
          </div>
        </div>
        <div className="relative min-w-0">
          <label className={labelClass} htmlFor={`${id}-inquiryType`}>
            Inquiry Type
          </label>
          <select
            className={`${fieldClass} appearance-none text-ellipsis [&>option]:bg-[var(--form)] [&>option]:text-white`}
            {...fieldProps("inquiryType")}
            defaultValue=""
          >
            <option value="" disabled>
              Select an inquiry type
            </option>
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {error("inquiryType")}
        </div>
        <div className="relative min-w-0">
          <label className={labelClass} htmlFor={`${id}-details`}>
            Event Details &amp; Location
          </label>
          <textarea
            className={`${fieldClass}`}
            {...fieldProps("details")}
            placeholder="Delhi, Winter 2026..."
            rows={2}
            maxLength={5000}
            onInput={(event) => {
              const field = event.currentTarget;
              field.style.height = "20px";
              field.style.height = `${field.scrollHeight + 1}px`;
            }}
          />
          {error("details")}
        </div>
      </div>
      <button type="submit" className="button button-gold" disabled={sending}>
        {sending ? "Preparing inquiry…" : "Send Inquiry"}
      </button>
      {status && (
        <p
          role={failed ? "alert" : "status"}
          className="border-t border-white/30 pt-4 text-[13px] leading-relaxed"
        >
          {status}
        </p>
      )}
    </form>
  );
}
