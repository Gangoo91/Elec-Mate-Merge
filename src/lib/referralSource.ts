/**
 * referralSource
 *
 * Single source of truth for `referrals.source`.
 *
 * The column carries a CHECK constraint. Any value outside it makes the INSERT
 * fail — and that row is the only thing that pays the referrer, so an
 * unrecognised value costs a real person their free month. This list must stay
 * in step with the `referrals_source_check` constraint in the database.
 *
 * The `?src=` values that reach /auth/signup in the wild:
 *   link        — landed on /auth/signup?ref=CODE with no src
 *   invite      — tapped the CTA on the /r/CODE invite landing page
 *   deeplink    — /r/CODE opened inside the native app (auto-redirect)
 *   push        — referral push notification, shared straight away
 *   whatsapp    — share sheet built the link with an explicit channel
 *   qr, native_share, email — other share-sheet channels
 */
export const REFERRAL_SOURCES = [
  'link',
  'invite',
  'deeplink',
  'push',
  'push_post_login',
  'whatsapp',
  'qr',
  'native_share',
  'email',
] as const;

export type ReferralSource = (typeof REFERRAL_SOURCES)[number];

/**
 * Coerce an arbitrary `?src=` value to something the CHECK constraint accepts.
 * Unknown values degrade to 'link' — losing the channel label is a nuisance,
 * losing the referral row is not.
 */
export function normaliseReferralSource(src: string | null | undefined): ReferralSource {
  if (!src) return 'link';
  const cleaned = src.trim().toLowerCase();
  return (REFERRAL_SOURCES as readonly string[]).includes(cleaned)
    ? (cleaned as ReferralSource)
    : 'link';
}
