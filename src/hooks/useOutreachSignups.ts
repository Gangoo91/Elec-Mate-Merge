import { useMemo } from 'react';
import { useAdminUsersBase } from './useAdminUsersBase';

/*
  Did any of the cold outreach actually turn into an account?

  College Outreach could not answer that question at all. Its four headline
  cells were Contacts / Sent / Opened / Clicked, and three of those four are
  dead: `outreach_contacts.total_opens` is 0 on all 16,890 rows,
  `outreach_campaign_sends.opened_at` is NULL on all 17,324 rows, and every
  `outreach_campaigns.open_count` / `click_count` is 0 — nothing writes them,
  so open rate and click rate are permanently "0%". A page about whether the
  outreach worked was reporting three permanent noughts and no conversions.

  The only real conversion signal available is whether an address we pitched —
  or a colleague at the same institution — now has a live Elec-Mate account.
  That means reading account emails, and emails are NOT on `profiles`; the
  column simply does not exist there, so `profiles.select('email')` answers
  PostgREST 42703, the row comes back null and the feature silently dies.
  `admin-get-users` (behind `useAdminUsersBase`) is the one place that joins
  auth.users to profiles, and the admin app already keeps it cached, so this
  reads that rather than issuing a query that cannot succeed.
*/

/*
  Domains that prove nothing.

  Institutional matching is the point: a tutor pitched at their college address
  who signs up with a personal one still counts, and so does a colleague at the
  same college. But scraped contact lists contain personal addresses too, and
  matching those on domain matches every consumer mailbox in the country —
  btinternet.com and sky.com alone account for 30 of the 35 domain hits in the
  education pool and not one of them is a college. Denylist them so the number
  means "an institution we pitched has someone using Elec-Mate".
*/
const CONSUMER_EMAIL_DOMAINS = new Set([
  'aol.com',
  'aol.co.uk',
  'blueyonder.co.uk',
  'btconnect.com',
  'btinternet.com',
  'gmail.com',
  'googlemail.com',
  'hotmail.co.uk',
  'hotmail.com',
  'icloud.com',
  'live.co.uk',
  'live.com',
  'mac.com',
  'me.com',
  'msn.com',
  'ntlworld.com',
  'outlook.com',
  'outlook.co.uk',
  'proton.me',
  'protonmail.com',
  'sky.com',
  'talktalk.net',
  'tiscali.co.uk',
  'virginmedia.com',
  'yahoo.co.uk',
  'yahoo.com',
  'ymail.com',
  'yourmail.com',
]);

function domainOf(email: string | null | undefined): string | null {
  if (!email) return null;
  const at = email.lastIndexOf('@');
  if (at < 0) return null;
  const d = email
    .slice(at + 1)
    .trim()
    .toLowerCase();
  return d || null;
}

export interface OutreachSignupIndex {
  /** True once the account list has loaded — before that every lookup is false. */
  isReady: boolean;
  /** How many live accounts the index was built from, for the "out of N" copy. */
  accountCount: number;
  /** This exact address has an Elec-Mate account. The strongest possible signal. */
  hasAccount: (email: string) => boolean;
  /** Somebody else at the same institution has an account. Consumer domains never match. */
  hasColleague: (email: string) => boolean;
}

/**
 * Index every live Elec-Mate account by address and by institutional domain so
 * an outreach contact can be checked against it in O(1) inside a render loop.
 * Rebuilt only when the cached account list changes, never per row — the pool
 * is ~2,000 contacts and the account list ~1,500, so a naive nested scan would
 * be three million string comparisons on every keystroke in the search box.
 */
export function useOutreachSignups(): OutreachSignupIndex {
  const { data: accounts } = useAdminUsersBase();

  return useMemo(() => {
    const emails = new Set<string>();
    const domains = new Set<string>();

    for (const a of accounts ?? []) {
      const email = a.email?.trim().toLowerCase();
      if (!email) continue;
      emails.add(email);
      const d = domainOf(email);
      if (d && !CONSUMER_EMAIL_DOMAINS.has(d)) domains.add(d);
    }

    return {
      isReady: !!accounts,
      accountCount: emails.size,
      hasAccount: (email: string) => emails.has(email.trim().toLowerCase()),
      hasColleague: (email: string) => {
        const d = domainOf(email);
        return !!d && !CONSUMER_EMAIL_DOMAINS.has(d) && domains.has(d);
      },
    };
  }, [accounts]);
}
