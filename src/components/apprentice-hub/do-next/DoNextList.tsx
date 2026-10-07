/**
 * DoNextList — the learner's home: one ranked "Do next" list (ELE-1896).
 *
 * Fed by get_my_do_next() (useMyDoNext): assessment plan items, criteria the
 * assessor sent back, returned and proposed hours, quizzes, goals, tutor
 * messages, portfolio comments, progress reviews, witness requests and the next
 * class. Each row says what it is, why it is on the list, and one verb; the
 * whole row is the tap target and lands on the exact screen (capture with the
 * criteria ticked, the quiz, the confirm card, the review to sign, the thread).
 *
 * Empty → never a dead end: the one thing that would help most this week
 * (from the server's gap analysis: choose a course, catch up on hours, the
 * unit with the biggest gap, or a timed mock).
 *
 * Mounted at the top of Today, the Apprentice Hub and the college area.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  useMyDoNext,
  type DoNextItem,
  type DoNextKind,
  type DoNextSuggestion,
} from '@/hooks/useMyDoNext';

const KIND_LABEL: Record<DoNextKind, string> = {
  plan: 'Assessment plan',
  referred: 'Assessor feedback',
  otj_returned: 'Off-the-job hours',
  hours_confirm: 'Off-the-job hours',
  quiz: 'Quiz',
  quiz_marked: 'Quiz result',
  goal_blocked: 'Learning plan',
  goal_overdue: 'Learning plan',
  goal_new: 'Learning plan',
  goal_comment: 'Learning plan',
  goal_due: 'Learning plan',
  message: 'Message',
  comment: 'Portfolio',
  review_sign: 'Progress review',
  review_input: 'Progress review',
  witness: 'Witness statement',
  observation: 'Observation',
  lesson: 'College',
  revision: 'Revision',
};

export const DO_NEXT_HELP: PageHelpContent = {
  id: 'learner-do-next',
  title: 'Do next',
  what: 'Everything that is waiting on you, in one list, with the thing that costs most to leave at the top. Your college, your assessor and the app all feed it.',
  steps: [
    {
      title: 'Start at the top',
      body: 'Overdue work, criteria your assessor sent back and a review to sign come first. Then anything due this week, then the rest.',
    },
    {
      title: 'Tap the row',
      body: 'Each item opens the exact place to deal with it: capture with the criteria already ticked, the quiz, the hours to confirm, the message thread.',
    },
    {
      title: 'It clears itself',
      body: 'Send the evidence, confirm the hours or sign the review and the item drops off. Nothing to tick here.',
    },
  ],
  notes: [
    {
      title: 'Nothing on the list?',
      body: 'You get the one thing that would help most this week, worked out from your course: the unit with the biggest gap, or your off-the-job hours if you are behind.',
    },
    {
      title: 'No college?',
      body: 'The list still works. Your portfolio, assessor feedback and witness statements are yours, college or not.',
    },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Overdue or sent back', body: 'Costs something every day it waits.' },
    { swatch: 'bg-elec-yellow', label: 'This week', body: 'Due within seven days, or someone is waiting on a reply.' },
    { swatch: 'bg-white/40', label: 'Later', body: 'On your radar, nothing urgent.' },
  ],
};

function fmtDue(item: DoNextItem, today: string | undefined): string | null {
  if (!item.due) return null;
  const t = today ?? new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
  const days = Math.round(
    (new Date(`${item.due}T12:00:00Z`).getTime() - new Date(`${t}T12:00:00Z`).getTime()) / 86_400_000
  );
  const label = new Date(`${item.due}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  if (days < 0) return `Was due ${label}`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7)
    return new Date(`${item.due}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long' });
  return label;
}

function Row({
  item,
  first,
  today,
  onOpen,
}: {
  item: DoNextItem;
  first: boolean;
  today?: string;
  onOpen: (href: string) => void;
}) {
  const due = fmtDue(item, today);
  const now = item.urgency === 'now';
  return (
    <li className="h-full">
      <button
        type="button"
        onClick={() => onOpen(item.href)}
        className={cn(
          'group flex h-full min-h-[76px] w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors',
          'hover:bg-white/[0.04] active:bg-white/[0.07]',
          'sm:rounded-2xl sm:border sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025] sm:px-5',
          now ? 'sm:border-orange-400/45' : 'sm:border-white/[0.1] sm:hover:border-white/[0.22]'
        )}
      >
        <span
          className={cn(
            'w-1 self-stretch shrink-0 rounded-full',
            now ? 'bg-orange-400' : item.urgency === 'soon' ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 text-[11.5px] font-semibold uppercase tracking-[0.12em]">
            <span className={now ? 'text-orange-300' : 'text-elec-yellow'}>{KIND_LABEL[item.kind]}</span>
            {due && <span className={cn('normal-case tracking-normal', now ? 'text-orange-300' : 'text-white')}>{due}</span>}
            {now && !due && <span className="normal-case tracking-normal text-orange-300">Needs you now</span>}
          </span>
          <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-white line-clamp-2">
            {item.title}
          </span>
          {item.detail && (
            <span className="mt-0.5 block text-[13px] leading-snug text-white line-clamp-2">{item.detail}</span>
          )}
          {/* Phone: the verb sits under the text so the title keeps the width. */}
          <span
            className={cn(
              'mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold sm:hidden',
              first ? 'h-9 rounded-lg bg-elec-yellow px-3 text-black' : 'text-elec-yellow'
            )}
          >
            {item.action}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
        <span
          className={cn(
            'hidden h-11 shrink-0 items-center gap-1 rounded-xl px-3 text-[13.5px] font-semibold sm:inline-flex',
            first ? 'bg-elec-yellow text-black' : 'text-elec-yellow'
          )}
        >
          {item.action}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </button>
    </li>
  );
}

function SuggestionCard({
  suggestion,
  allClear,
  onOpen,
}: {
  suggestion: DoNextSuggestion;
  allClear: boolean;
  onOpen: (href: string) => void;
}) {
  return (
    <div
      className={cn(
        '-mx-4 border-y border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6',
        'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8'
      )}
    >
      <div className="min-w-0">
        {allClear && (
          <p className="mb-2 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black" aria-hidden>
              <Check className="h-3.5 w-3.5" />
            </span>
            Nothing is waiting on you
          </p>
        )}
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
          Best thing to do this week
        </p>
        <p className="mt-1 text-[18px] font-semibold leading-snug tracking-tight text-white sm:text-[20px]">
          {suggestion.title}
        </p>
        <p className="mt-1 max-w-[70ch] text-[13.5px] leading-snug text-white">{suggestion.detail}</p>
      </div>
      <button
        type="button"
        onClick={() => onOpen(suggestion.href)}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14.5px] font-semibold text-black touch-manipulation hover:opacity-90"
      >
        {suggestion.action}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

const NO_EXTRA: DoNextItem[] = [];

export function DoNextList({
  limit = 6,
  extra = NO_EXTRA,
  title = 'Do next',
  sub,
  className,
}: {
  /** Rows shown before "Show all". */
  limit?: number;
  /** Page-local items (e.g. revision on Today), ranked after the server's. */
  extra?: DoNextItem[];
  title?: string;
  sub?: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const { data, items: serverItems, loading, error, refresh } = useMyDoNext();
  const [showAll, setShowAll] = useState(false);

  const items = useMemo(() => {
    const rank = { now: 0, soon: 1, later: 2 } as const;
    // Stable: server order within a band, page extras last in their band.
    return [...serverItems, ...extra]
      .map((it, i) => ({ it, i }))
      .sort((a, b) => rank[a.it.urgency] - rank[b.it.urgency] || a.i - b.i)
      .map((x) => x.it);
  }, [serverItems, extra]);

  const open = (href: string) => navigate(href);
  const counts = data?.counts;
  const nowCount = items.filter((i) => i.urgency === 'now').length;
  const soonCount = items.filter((i) => i.urgency === 'soon').length;
  const visible = showAll ? items : items.slice(0, limit);
  const summary =
    items.length === 0
      ? null
      : [nowCount > 0 && `${nowCount} need${nowCount === 1 ? 's' : ''} you now`, soonCount > 0 && `${soonCount} this week`]
          .filter(Boolean)
          .join(' · ') || `${items.length} on your list`;

  return (
    <section className={cn('space-y-3', className)} aria-labelledby="do-next-title">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 id="do-next-title" className="text-[20px] font-semibold tracking-tight text-white sm:text-[22px]">
              {title}
            </h2>
            <PageHelpButton help={DO_NEXT_HELP} className="h-9 w-9" />
          </div>
          <p className="mt-0.5 text-[13px] text-white">
            {sub ?? 'What is waiting on you, most urgent first. Tap a row to deal with it.'}
          </p>
        </div>
        {summary && (
          <span
            className={cn(
              'shrink-0 text-right text-[12.5px] font-semibold tabular-nums',
              nowCount > 0 ? 'text-orange-300' : 'text-white'
            )}
          >
            {summary}
          </span>
        )}
      </div>

      {loading && !data ? (
        <div className="space-y-2" aria-hidden>
          {[0, 1, 2].map((k) => (
            <div key={k} className="h-[76px] animate-pulse bg-white/[0.04] sm:rounded-2xl" />
          ))}
        </div>
      ) : error && !data ? (
        <div className="-mx-4 flex items-center justify-between gap-3 border-y border-white/[0.1] px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border-x">
          <p className="text-[13.5px] text-white">Could not load your list just now.</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <ul
              className={cn(
                '-mx-4 divide-y divide-white/[0.07] border-y border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02]',
                'sm:mx-0 sm:grid sm:grid-cols-1 sm:items-stretch sm:gap-2.5 sm:divide-y-0 sm:border-0 sm:bg-none lg:grid-cols-2'
              )}
            >
              {visible.map((it, i) => (
                <Row key={it.key} item={it} first={i === 0} today={data?.today} onOpen={open} />
              ))}
            </ul>
          )}

          {items.length > limit && (
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
            >
              {showAll ? 'Show fewer' : `Show all ${items.length}`}
            </button>
          )}

          {/* The one thing that helps most: the whole answer when the list is
              empty, and a nudge underneath when nothing is pressing. */}
          {data?.suggestion && (items.length === 0 || (counts && nowCount === 0 && soonCount === 0)) && (
            <SuggestionCard suggestion={data.suggestion} allClear={items.length === 0} onOpen={open} />
          )}
        </>
      )}
    </section>
  );
}

export default DoNextList;
