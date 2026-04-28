/** Single source of truth for Mate's WhatsApp contact details */

export const MATE_PHONE_RAW = '447507241303';
export const MATE_PHONE_DISPLAY = '+44 7507 241303';
export const MATE_WHATSAPP_LINK = `https://wa.me/${MATE_PHONE_RAW}?text=Hey%20Mate`;

/** Build a one-tap activation deep link with the user's verification code pre-filled. */
export function buildActivationDeeplink(code: string): string {
  return `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent(`START ${code}`)}`;
}
