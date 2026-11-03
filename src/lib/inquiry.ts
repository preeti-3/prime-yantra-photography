import { send } from "@emailjs/browser";
export type Inquiry = { name: string; email: string; inquiryType: string; details: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;
export const inquiryTypes = ["Editorial Wedding / Elopement", "Cinematic Portraits", "Commercial & Editorial", "Events", "Other"] as const;

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  if (inquiry.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email.trim())) errors.email = "Please enter a valid email address.";
  if (!inquiryTypes.some(type => type === inquiry.inquiryType)) errors.inquiryType = "Please select an inquiry type.";
  if (inquiry.details.trim().length < 1) errors.details = "Please share your location and a few details.";
  return errors;
}

export async function submitInquiry(inquiry: Inquiry): Promise<{ message: string }> {
  if (Object.keys(validateInquiry(inquiry)).length) throw new Error("Please check the highlighted fields.");
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (serviceId && templateId && publicKey) {
    await send(serviceId, templateId, {
      from_name: inquiry.name,
      from_email: inquiry.email,
      reply_to: inquiry.email,
      inquiry_type: inquiry.inquiryType,
      message: inquiry.details,
      submitted_at: new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata",
      }).format(new Date()),
    }, { publicKey, limitRate: { id: "prime-yatra-inquiry", throttle: 10000 } });
    return { message: "Thank you! Your inquiry has been sent. We will be in touch soon." };
  }
  const subject = `Photography inquiry: ${inquiry.inquiryType}`;
  const body = `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nType: ${inquiry.inquiryType}\n\n${inquiry.details}`;
  window.location.href = `mailto:kumaraman50099@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { message: "Your email app will open with your inquiry. Please send it to complete your request, or call +91 93500 03424." };
}
