import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase, SUPABASE_URL } from '@/integrations/supabase/client';
import { LC_CARD } from '@/components/apprentice-hub/college-hub/learnerUi';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   CollegeCalendarFeedCard — "Add to my calendar" (8 Oct 2026).

   Apprentices live in their phone calendar. This gives each learner and
   tutor a private iCalendar subscription link: classes, quiz due dates,
   progress reviews and EPA dates for a learner; the classes they teach,
   reviews, standardisation meetings and observations for a tutor.

   - The link is made on request (public.get_my_college_calendar_feed), never
     just by opening the page.
   - The feed is served by the college-calendar-feed edge function; the token
     in the URL is the only credential, so "New link" and "Stop sharing"
     revoke it (the old URL then returns 404).
   ========================================================================== */

type Variant = 'learner' | 'tutor';

const FEED_FN = `${SUPABASE_URL}/functions/v1/college-calendar-feed`;

function collegeFeedUrls(token: string) {
  const https = `${FEED_FN}?token=${token}`;
  const webcal = https.replace(/^https:\/\//, 'webcal://');
  return {
    https,
    webcal,
    google: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`,
  };
}

const COPY: Record<Variant, { what: string }> = {
  learner: {
    what: 'Your classes with room and time, quiz due dates, progress reviews and EPA dates go straight into your phone calendar and stay up to date.',
  },
  tutor: {
    what: 'The classes you teach, progress reviews, standardisation meetings and observations go straight into your calendar and stay up to date.',
  },
};

const LINK_BTN =
  'inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white underline-offset-4 hover:underline touch-manipulation disabled:opacity-40';

export function CollegeCalendarFeedCard({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState<'rotate' | 'stop' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('college_calendar_feeds' as never)
      .select('token')
      .eq('user_id', uid)
      .is('revoked_at', null)
      .maybeSingle();
    setToken((data as { token?: string } | null)?.token ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const issue = async (rotate: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error: err } = await supabase.rpc(
      'get_my_college_calendar_feed' as never,
      {
        p_rotate: rotate,
      } as never
    );
    setBusy(false);
    setConfirm(null);
    if (err) {
      setError('Could not make your calendar link. Try again in a moment.');
      return;
    }
    const rows = data as unknown as { token?: string }[] | { token?: string } | null;
    const row = Array.isArray(rows) ? rows[0] : rows;
    setToken(row?.token ?? null);
    setCopied(false);
  };

  const stop = async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.rpc('revoke_my_college_calendar_feed' as never);
    setBusy(false);
    setConfirm(null);
    if (err) {
      setError('Could not stop sharing. Try again in a moment.');
      return;
    }
    setToken(null);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const urls = token ? collegeFeedUrls(token) : null;
  const frame = variant === 'learner' ? LC_CARD : COLLEGE_CARD;

  return (
    <section
      className={cn(frame, 'gap-0', className)}
      aria-labelledby="college-calendar-title"
      data-testid="college-calendar-card"
    >
      <h2
        id="college-calendar-title"
        className="text-[17px] font-semibold tracking-tight text-white"
      >
        Add to my calendar
      </h2>
      <p className="mt-1.5 text-[13px] leading-snug text-white">{COPY[variant].what}</p>

      {loading ? (
        <div className="mt-4 h-11 w-full animate-pulse rounded-xl bg-white/[0.06]" aria-hidden />
      ) : !urls ? (
        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            className={cn(COLLEGE_BTN_PRIMARY, 'w-full sm:w-auto sm:self-start')}
            onClick={() => void issue(false)}
            disabled={busy}
          >
            {busy ? 'Making your link…' : 'Get my calendar link'}
          </button>
          <p className="text-[12px] leading-snug text-white">
            The link is private to you. Anyone who has it can see these dates, so keep it to
            yourself. You can stop it working at any time.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {/* All outlined (10 Oct): the page keeps its one solid yellow action.
              Equal buttons that only sit side by side when each has room for its label. */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
            <a
              href={urls.webcal}
              className={cn(COLLEGE_BTN, 'w-full')}
              data-testid="calendar-apple"
            >
              Add to Apple / iPhone calendar
            </a>
            <a
              href={urls.google}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(COLLEGE_BTN, 'w-full')}
              data-testid="calendar-google"
            >
              Add to Google Calendar
            </a>
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'w-full')}
              onClick={() => void copy(urls.https)}
              data-testid="calendar-copy"
            >
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>

          <ol className="space-y-1.5 text-[13px] leading-snug text-white">
            <li>
              <span className="font-semibold">iPhone or Mac:</span> tap Add to Apple / iPhone
              calendar, then Subscribe.
            </li>
            <li>
              <span className="font-semibold">Android or Google:</span> tap Add to Google Calendar
              while signed in to Google. It can take a few hours to appear on your phone.
            </li>
            <li>
              <span className="font-semibold">Outlook or anything else:</span> copy the link and add
              it as a calendar from the internet.
            </li>
          </ol>

          <p className="text-[12px] leading-snug text-white">
            Private to you. Changes in Elec-Mate show up when your calendar next refreshes, and
            anything cancelled drops out. Anyone with the link can see these dates, so do not share
            it.
          </p>

          {confirm ? (
            <div className="rounded-xl border border-white/[0.14] p-3">
              <p className="text-[13px] leading-snug text-white">
                {confirm === 'rotate'
                  ? 'Your current link will stop working and you will need to add the new one to your calendar.'
                  : 'Your link will stop working and the dates will stop updating in your calendar.'}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={COLLEGE_BTN}
                  disabled={busy}
                  onClick={() => void (confirm === 'rotate' ? issue(true) : stop())}
                  data-testid="calendar-confirm"
                >
                  {busy ? 'Working…' : confirm === 'rotate' ? 'Make a new link' : 'Stop sharing'}
                </button>
                <button
                  type="button"
                  className={LINK_BTN}
                  onClick={() => setConfirm(null)}
                  disabled={busy}
                >
                  Keep my link
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-5 border-t border-white/[0.08] pt-2">
              <button
                type="button"
                className={LINK_BTN}
                onClick={() => setConfirm('rotate')}
                data-testid="calendar-rotate"
              >
                New link
              </button>
              <button
                type="button"
                className={LINK_BTN}
                onClick={() => setConfirm('stop')}
                data-testid="calendar-stop"
              >
                Stop sharing
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 text-[13px] text-orange-300" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export default CollegeCalendarFeedCard;
