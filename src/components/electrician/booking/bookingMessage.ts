/**
 * Building the booking link and the messages that carry it.
 *
 * The booking link is a plain public URL — no signing, no expiry, nothing
 * private in the query string. That is what makes `wa.me?text=` and `mailto:`
 * viable here when they were not for quotes: ELE-1377 removed the wa.me
 * fallback from `QuoteSendDropdown` because it dumped a raw signed PDF URL
 * into a chat window. Nothing of the sort applies to a link an electrician
 * wants on the side of a van.
 */

export const BOOKING_ORIGIN = 'https://www.elec-mate.com';

export function bookingUrl(userId: string): string {
  return `${BOOKING_ORIGIN}/book/${userId}`;
}

/**
 * A UK number in the form wa.me accepts: international, digits only, no plus.
 *
 * Returns null when there is nothing usable, so callers fall back to WhatsApp's
 * contact picker rather than opening a chat with a mangled number.
 */
export function normaliseUkPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;

  const trimmed = phone.trim();
  // Keep a leading + long enough to tell an international number from a
  // domestic one, then work in digits.
  const hadPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7) return null;

  // Already international, however it was typed.
  if (hadPlus) return digits;
  if (digits.startsWith('44')) return digits;

  // 07700 900123 → 447700900123. Also covers 01/02/03 landlines.
  if (digits.startsWith('0')) return `44${digits.slice(1)}`;

  // 7700900123 — the leading zero dropped somewhere along the way.
  if (digits.length === 10 && digits.startsWith('7')) return `44${digits}`;

  return digits;
}

interface MessageParts {
  url: string;
  /** The electrician's trading name, when it is known. */
  businessName?: string | null;
  /** The client's first name, when sending to someone specific. */
  clientName?: string | null;
}

/** First name only — "Hi Mrs Patricia Hargreaves," reads like a letter from a bank. */
function firstName(name: string | null | undefined): string | null {
  if (!name) return null;
  const first = name.trim().split(/\s+/)[0];
  return first && first.length > 1 ? first : null;
}

/**
 * The message body.
 *
 * Written as an electrician would text a customer — no marketing voice, no
 * "Click the link below!". It has to survive being read on a doorstep.
 */
export function bookingMessage({ url, businessName, clientName }: MessageParts): string {
  const who = firstName(clientName);
  const greeting = who ? `Hi ${who},` : 'Hi,';
  const from = businessName ? ` with ${businessName}` : '';
  return `${greeting}\n\nYou can book a time${from} here — pick whatever slot suits you and it comes straight through to my diary:\n\n${url}`;
}

export function bookingEmailSubject(businessName?: string | null): string {
  return businessName ? `Book a time with ${businessName}` : 'Book a time with me';
}

/**
 * WhatsApp. With a number it opens that chat; without one, WhatsApp's own
 * contact picker — which is the right behaviour for "send this to someone",
 * and the thing the OS share sheet was doing on mobile all along.
 */
export function whatsappUrl(parts: MessageParts, phone?: string | null): string {
  const text = encodeURIComponent(bookingMessage(parts));
  const to = normaliseUkPhone(phone);
  return to ? `https://wa.me/${to}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function mailtoUrl(parts: MessageParts, email?: string | null): string {
  const subject = encodeURIComponent(bookingEmailSubject(parts.businessName));
  const body = encodeURIComponent(bookingMessage(parts));
  return `mailto:${email ?? ''}?subject=${subject}&body=${body}`;
}

/**
 * SMS.
 *
 * `sms:<number>?&body=` is the form that works on both iOS and Android — iOS
 * wants the separator before `body`, Android tolerates it. Dropping the `?&`
 * breaks one platform or the other depending on which you pick.
 */
export function smsUrl(parts: MessageParts, phone?: string | null): string {
  const body = encodeURIComponent(bookingMessage(parts));
  const to = phone ? phone.replace(/[^\d+]/g, '') : '';
  return `sms:${to}?&body=${body}`;
}
