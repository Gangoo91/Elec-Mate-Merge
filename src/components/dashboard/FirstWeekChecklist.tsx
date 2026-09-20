import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { cn } from '@/lib/utils';

/**
 * FirstWeekChecklist — the dashboard's first week, as a list that ticks
 * itself off.
 *
 * Retention plan, 20 Sep 2026. The number that predicts who stays is three
 * active days in the first seven, not the first certificate. This replaces
 * the first-visit banner for the first eight days: seven day-dots that fill
 * as the person turns up, and four role-specific things to do that tick off
 * from their own data. It disappears on its own once they have three days
 * and one real document, or after day eight, or when dismissed.
 */

const DISMISS_KEY = 'elec-mate-first-week-dismissed';
const DAY_MS = 86_400_000;

interface Step {
  key: string;
  label: string;
  hint: string;
  to: string;
  done: boolean;
}

export default function FirstWeekChecklist() {
  const { user, profile } = useAuth();
  const [dismissed, setDismissed] = useState(() => storageGetSync(DISMISS_KEY) === '1');
  const [activeDays, setActiveDays] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  // Admin-only preview: /dashboard?preview=first-week[&role=apprentice] shows
  // the day-2 state with sample progress, so the design can be checked on a
  // veteran account. A real user's view is never affected.
  const [searchParams] = useSearchParams();
  const preview =
    !!(profile as { admin_role?: string | null } | null)?.admin_role &&
    searchParams.get('preview') === 'first-week';
  const previewRole = searchParams.get('role') === 'apprentice' ? 'apprentice' : 'electrician';
  const rawRole = preview ? previewRole : profile?.role;
  const role: 'electrician' | 'apprentice' =
    rawRole === 'apprentice' ? 'apprentice' : 'electrician';
  const createdAt = preview
    ? new Date(Date.now() - 1.4 * DAY_MS)
    : profile?.created_at
      ? new Date(profile.created_at)
      : null;
  const dayIndex = createdAt ? Math.floor((Date.now() - createdAt.getTime()) / DAY_MS) : 99;
  // Electricians and apprentices only: an employer or a college tutor must
  // never be told to make a certificate.
  const eligible =
    !!user &&
    !!createdAt &&
    dayIndex <= 8 &&
    (rawRole === 'electrician' || rawRole === 'apprentice');

  useEffect(() => {
    if (!eligible || !user || !createdAt) return;
    if (preview) {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10);
      setActiveDays(new Set([yesterday, today]));
      setIntent(previewRole === 'apprentice' ? 'revision' : 'quote');
      setCounts(
        previewRole === 'apprentice'
          ? { study: 1, mocks: 0, ai: 0 }
          : { certs: 0, quotes: 1, invoices: 0, calendar: 0 }
      );
      return;
    }
    let cancelled = false;
    const load = async () => {
      const since = createdAt.toISOString();
      // Same window the Retention page uses for "3 in 7": the first seven days
      // from signup, so the dashboard and the admin page cannot disagree.
      const until = new Date(createdAt.getTime() + 7 * DAY_MS).toISOString();
      const ev = await supabase
        .from('user_events')
        .select('created_at')
        .eq('user_id', user.id)
        .gte('created_at', since)
        .lt('created_at', until)
        .order('created_at', { ascending: false })
        .limit(2000);
      const days = new Set<string>();
      for (const r of ev.data ?? []) days.add(String(r.created_at).slice(0, 10));
      if (dayIndex <= 6) days.add(new Date().toISOString().slice(0, 10)); // they are here now

      // What they said they came for on the welcome screen. It decides which
      // step sits at the top: someone who came for quotes should not be told
      // to make a certificate first.
      const it = await supabase
        .from('user_events')
        .select('event_data')
        .eq('user_id', user.id)
        .eq('event_type', 'feature_use')
        .eq('event_name', 'onboarding_intent')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      const chosen = (it.data?.event_data as { intent?: string } | null)?.intent ?? null;

      // Own rows only under RLS; head counts keep each to one round-trip.
      const head = { count: 'exact' as const, head: true };
      const next: Record<string, number> = {};
      if (role === 'electrician') {
        const [certs, quotes, invoices, calendar] = await Promise.all([
          // Opening a form writes an auto-draft; that is not "made a certificate".
          supabase
            .from('reports')
            .select('id', head)
            .eq('user_id', user.id)
            .is('deleted_at', null)
            .neq('status', 'auto-draft'),
          supabase.from('quotes').select('id', head).eq('user_id', user.id),
          supabase.from('invoices').select('id', head).eq('user_id', user.id),
          supabase.from('calendar_events').select('id', head).eq('user_id', user.id),
        ]);
        Object.assign(next, {
          certs: certs.count ?? 0,
          quotes: quotes.count ?? 0,
          invoices: invoices.count ?? 0,
          calendar: calendar.count ?? 0,
        });
      } else {
        const [study, mocks, ai] = await Promise.all([
          supabase.from('learning_activity_log').select('id', head).eq('user_id', user.id),
          supabase.from('quiz_results').select('id', head).eq('user_id', user.id),
          supabase.from('ai_chat_history').select('id', head).eq('user_id', user.id),
        ]);
        Object.assign(next, {
          study: study.count ?? 0,
          mocks: mocks.count ?? 0,
          ai: ai.count ?? 0,
        });
      }
      if (!cancelled) {
        setActiveDays(days);
        setIntent(chosen);
        setCounts(next);
      }
    };
    load().catch(() => {
      if (!cancelled) setCounts({});
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligible, user?.id, role, preview]);

  if (!eligible || dismissed || !counts) return null;

  const steps: Step[] =
    role === 'electrician'
      ? [
          {
            key: 'cert',
            label: 'Make one certificate',
            hint: 'Your logo on it, PDF to yourself. About 90 seconds.',
            to: '/electrician/inspection-testing',
            done: (counts.certs ?? 0) > 0,
          },
          {
            key: 'quote',
            label: 'Quote the next job',
            hint: 'Branded PDF with a link they can accept on their phone.',
            to: '/electrician/quote-builder/create',
            done: (counts.quotes ?? 0) > 0,
          },
          {
            key: 'invoice',
            label: 'Raise an invoice',
            hint: 'Pay-by-card link. It chases itself if unpaid.',
            to: '/electrician/invoices',
            done: (counts.invoices ?? 0) > 0,
          },
          {
            key: 'calendar',
            label: 'Put a job in the diary',
            hint: 'Syncs with Google Calendar once connected.',
            to: '/electrician/business/calendar',
            done: (counts.calendar ?? 0) > 0,
          },
        ]
      : [
          {
            key: 'study',
            label: 'Finish one section',
            hint: 'About ten minutes. Your streak starts here.',
            to: '/study-centre/apprentice',
            done: (counts.study ?? 0) > 0,
          },
          {
            key: 'ai',
            label: 'Ask the AI mentor one thing',
            hint: 'The thing you nodded along to at college and didn’t get.',
            to: '/study-centre/apprentice',
            done: (counts.ai ?? 0) > 0,
          },
          {
            key: 'mock',
            label: 'Sit one mock exam',
            hint: 'Twenty minutes. It tells you what to study next.',
            to: '/study-centre/mock-exams',
            done: (counts.mocks ?? 0) > 0,
          },
          {
            key: 'streak',
            label: 'Come back tomorrow',
            hint: 'Three days in the first week is what makes it stick.',
            to: '/study-centre/apprentice',
            done: activeDays.size >= 3,
          },
        ];

  // The step they came for leads; the rest keep their natural order.
  // Welcome-screen keys: electrician certificate | quote | tools | browse,
  // apprentice am2 | revision | ojt | browse (see WelcomeModal INTENTS).
  const lead =
    role === 'electrician'
      ? intent === 'quote'
        ? 'quote'
        : 'cert'
      : intent === 'am2'
        ? 'mock'
        : 'study';
  steps.sort((a, b) => (a.key === lead ? -1 : b.key === lead ? 1 : 0));

  // Graduated: three active days and one real thing made (a document for an
  // electrician, a study session for an apprentice). The list has done its job.
  const madeSomething =
    role === 'electrician'
      ? (counts.certs ?? 0) + (counts.quotes ?? 0) + (counts.invoices ?? 0) > 0
      : (counts.study ?? 0) > 0;
  if (activeDays.size >= 3 && madeSomething) return null;

  const dots = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(createdAt!.getTime() + i * DAY_MS).toISOString().slice(0, 10);
    return { i, on: activeDays.has(d), past: i < dayIndex, today: i === dayIndex };
  });

  return (
    <section className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            Your first week
          </p>
          <h2 className="mt-1 text-[18px] font-semibold leading-tight tracking-tight text-white">
            {activeDays.size >= 3
              ? 'Three days in. That’s the habit.'
              : `Day ${Math.min(dayIndex + 1, 7)} of 7. Three days in is what makes it stick.`}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => {
            storageSetSync(DISMISS_KEY, '1');
            setDismissed(true);
          }}
          className="h-11 shrink-0 touch-manipulation px-2 text-[12px] font-medium text-white"
          aria-label="Hide first-week checklist"
        >
          Hide
        </button>
      </div>

      <div
        className="mt-3 flex items-center gap-1.5"
        aria-label="Days you opened the app this week"
      >
        {dots.map((d) => (
          <span
            key={d.i}
            className={cn(
              'h-2.5 flex-1 rounded-full',
              d.on ? 'bg-elec-yellow' : d.past ? 'bg-white/[0.18]' : 'bg-white/[0.08]',
              d.today && !d.on && 'ring-1 ring-elec-yellow/60'
            )}
          />
        ))}
      </div>

      <ul className="mt-4 divide-y divide-white/[0.08]">
        {steps.map((s) => (
          <li key={s.key}>
            <Link
              to={s.to}
              className="flex min-h-[56px] touch-manipulation items-center gap-3 py-2"
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  s.done
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-white/[0.25] text-transparent'
                )}
                aria-hidden
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-[14px] font-medium leading-tight text-white',
                    s.done && 'line-through opacity-80'
                  )}
                >
                  {s.label}
                </span>
                {!s.done && (
                  <span className="mt-0.5 block text-[12px] leading-snug text-white">{s.hint}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
