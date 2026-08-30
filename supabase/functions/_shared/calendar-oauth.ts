/**
 * Shared calendar-OAuth constants.
 *
 * The authorize call (calendar-oauth-init) and the token exchange
 * (calendar-oauth-callback) MUST agree on the redirect URI byte for byte, or
 * the provider rejects the exchange with `redirect_uri_mismatch`. They lived as
 * two copy-pasted blocks and drifted; they live here now so they cannot.
 */

/**
 * The public redirect the user's browser is sent back to.
 *
 * This is the domain the provider PUTS ON ITS CONSENT SCREEN, which is why it
 * matters beyond plumbing: with the Supabase fallback, electricians were asked
 * to grant calendar access to "jtwygbeceundfgnkirof.supabase.co". A Vercel
 * rewrite (vercel.json → /api/oauth/calendar-callback) proxies the public URL
 * through to this function, so the project ref never reaches the user.
 *
 * ⚠️ Whatever CALENDAR_OAUTH_REDIRECT is set to must ALSO be registered as an
 * authorised redirect URI in BOTH consoles — Google Cloud (OAuth client) and
 * Azure (app registration) — because Google and Outlook share this callback.
 * Setting it without registering it breaks every connect with
 * `redirect_uri_mismatch`, which is what happened on 29 Aug and why it was
 * rolled straight back out.
 */
export function calendarRedirectUri(): string {
  return (
    Deno.env.get('CALENDAR_OAUTH_REDIRECT') ||
    `${Deno.env.get('SUPABASE_URL')}/functions/v1/calendar-oauth-callback`
  );
}

/**
 * Google Calendar scope — events only, deliberately.
 *
 * The full `auth/calendar` scope reads to the user as "See, edit, share, and
 * permanently delete ALL the calendars you can access", which is an alarming
 * thing to ask a sole trader for, and a heavier Google verification. Every
 * Calendar call we make is on `/events` (list, insert, update, delete, watch)
 * and nothing touches `calendarList` or calendar ACLs, so this covers all of
 * it and reads as "View and edit events on all your calendars".
 *
 * Tokens already granted under the wider scope keep working — it is a superset.
 */
export const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';

export const GOOGLE_CALENDAR_SCOPES = [
  GOOGLE_CALENDAR_SCOPE,
  'https://www.googleapis.com/auth/userinfo.email',
  'openid',
].join(' ');

export const OUTLOOK_CALENDAR_SCOPES = 'Calendars.ReadWrite User.Read offline_access';

/**
 * Did the user actually grant calendar access?
 *
 * Google's granular consent screen lets people untick individual permissions,
 * and it still returns a perfectly valid token for whatever is left. Alex
 * Gibbons connected on 30 Aug, was told "connected", and every sync then failed
 * with `ACCESS_TOKEN_SCOPE_INSUFFICIENT` on Events.List — because the token
 * carried only openid and email. Nothing checked, so nothing said so.
 *
 * `auth/calendar` is accepted as well as `calendar.events`: it is the wider
 * scope this used to request, and existing connections still carry it.
 */
export function grantedCalendarAccess(grantedScope: string | undefined | null): boolean {
  const granted = (grantedScope ?? '').split(/\s+/).filter(Boolean);
  return (
    granted.includes(GOOGLE_CALENDAR_SCOPE) ||
    granted.includes('https://www.googleapis.com/auth/calendar')
  );
}

/** What to tell someone who left the calendar permission unticked. */
export const CALENDAR_SCOPE_DENIED_MESSAGE =
  'Calendar permission was not granted. Please connect again and leave the ' +
  'Google Calendar permission ticked, otherwise Elec-Mate cannot read or add your jobs.';
