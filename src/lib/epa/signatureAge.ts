/**
 * Gateway signature age (NET, 10 Oct 2026).
 *
 * NET's AM2S candidate checklist (v25.12) only accepts apprentice, employer
 * and provider gateway signatures dated within 6 months of the gateway
 * application. The server gate (get_gateway_readiness, _gateway_signature_age)
 * applies the same rule; this is the client copy for screens that read the
 * declarations directly (the gateway pack sheet).
 *
 *   expired   more than 6 months old today: sign again
 *   expiring  still valid, but turns 6 months old within 30 days
 */

export interface SignatureAge {
  signedAt: Date;
  /** The last day NET accepts it (signed date + 6 months). */
  validUntil: Date;
  ageDays: number;
  expired: boolean;
  expiring: boolean;
}

const DAY = 86_400_000;

/** Midnight (local) of a date, so ages count calendar days. */
function dayOf(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function signatureAge(
  signedAt: string | null | undefined,
  now: Date = new Date()
): SignatureAge | null {
  if (!signedAt) return null;
  const signed = new Date(signedAt);
  if (Number.isNaN(signed.getTime())) return null;
  const s = dayOf(signed);
  const today = dayOf(now);
  const validUntil = new Date(s.getFullYear(), s.getMonth() + 6, s.getDate());
  const ageDays = Math.round((today.getTime() - s.getTime()) / DAY);
  const expired = today.getTime() > validUntil.getTime();
  const expiring = !expired && today.getTime() + 30 * DAY > validUntil.getTime();
  return { signedAt: signed, validUntil, ageDays, expired, expiring };
}

const fmtDay = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** "4 months old" / "12 days old", for a short status line. */
export function ageWords(a: SignatureAge): string {
  if (a.ageDays < 1) return 'signed today';
  if (a.ageDays < 45) return `${a.ageDays} day${a.ageDays === 1 ? '' : 's'} old`;
  const months = Math.floor(a.ageDays / 30.44);
  return `${months} month${months === 1 ? '' : 's'} old`;
}

/**
 * One sentence on the age for staff and learners, or null when nothing needs
 * saying beyond the date (under 5 months old).
 */
export function signatureAgeNote(a: SignatureAge | null): string | null {
  if (!a) return null;
  if (a.expired)
    return `Over 6 months old. NET only accepts gateway signatures dated within 6 months of the gateway application, so this needs signing again.`;
  if (a.expiring)
    return `NET accepts it until ${fmtDay(a.validUntil)}. If the gateway application is later, it needs signing again.`;
  return null;
}

/** The server figures (get_gateway_readiness items[].figures.signature). */
export interface GateSignatureFigures {
  signed_at: string;
  valid_until: string;
  age_days: number;
  expired: boolean;
  expiring: boolean;
}

export function gateSignature(figures: unknown): GateSignatureFigures | null {
  const s = (figures as { signature?: GateSignatureFigures } | null | undefined)?.signature;
  return s && typeof s === 'object' && 'expired' in s ? s : null;
}
