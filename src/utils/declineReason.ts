/**
 * How a lost quote's reason is stored in `quotes.declined_reason`.
 *
 * The column holds one of the fixed keys below. ELE-1683: when the electrician
 * picks "Other" he can now say why, and that note travels in the same column as
 * `other:<what he typed>` so no schema change is needed and win/loss analytics
 * can still group every "Other" together while keeping the text for review.
 */

export const DECLINE_REASONS = [
  { key: 'price', label: 'Too expensive', hint: 'Price was the sticking point' },
  { key: 'timing', label: 'Bad timing', hint: 'Couldn’t start soon enough' },
  { key: 'competitor', label: 'Went elsewhere', hint: 'Chose another electrician' },
  { key: 'no_response', label: 'Went quiet', hint: 'Client stopped responding' },
  { key: 'cancelled', label: 'Job cancelled', hint: 'Work no longer happening' },
  { key: 'other', label: 'Other', hint: 'Say why — it builds up a picture' },
] as const;

export type DeclineReasonKey = (typeof DECLINE_REASONS)[number]['key'];

const OTHER_PREFIX = 'other:';

/** Build the stored value. A note is only kept for "Other". */
export function encodeDeclineReason(key: string, note?: string | null): string {
  const trimmed = (note ?? '').trim();
  return key === 'other' && trimmed ? `${OTHER_PREFIX}${trimmed}` : key;
}

/** Split a stored value back into its key and, for "Other", the free text. */
export function parseDeclineReason(raw: string | null | undefined): {
  key: string | null;
  note: string | null;
} {
  if (!raw) return { key: null, note: null };
  if (raw.startsWith(OTHER_PREFIX)) {
    const note = raw.slice(OTHER_PREFIX.length).trim();
    return { key: 'other', note: note || null };
  }
  return { key: raw, note: null };
}

/** Human label for a stored value, e.g. "Too expensive" or "Other — no parking". */
export function describeDeclineReason(raw: string | null | undefined): string | null {
  const { key, note } = parseDeclineReason(raw);
  if (!key) return null;
  const label = DECLINE_REASONS.find((r) => r.key === key)?.label ?? key;
  return note ? `${label} — ${note}` : label;
}
