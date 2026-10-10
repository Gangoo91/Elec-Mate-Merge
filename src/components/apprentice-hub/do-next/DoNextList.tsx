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
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Check,
  ClipboardList,
  MessageSquareReply,
  Clock,
  FileQuestion,
  Target,
  MessageCircle,
  MessagesSquare,
  CalendarCheck,
  PenLine,
  Eye,
  School,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  useMyDoNext,
  type DoNextItem,
  type DoNextKind,
  type DoNextSuggestion,
} from '@/hooks/useMyDoNext';
import { lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { HOME_CARD } from '@/components/apprentice/ApprenticeHomeUi';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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

/** A plain line icon per kind, beside the label (never a tile). */
const KIND_ICON: Record<DoNextKind, LucideIcon> = {
  plan: ClipboardList,
  referred: MessageSquareReply,
  otj_returned: Clock,
  hours_confirm: Clock,
  quiz: FileQuestion,
  quiz_marked: FileQuestion,
  goal_blocked: Target,
  goal_overdue: Target,
  goal_new: Target,
  goal_comment: Target,
  goal_due: Target,
  message: MessageCircle,
  comment: MessagesSquare,
  review_sign: CalendarCheck,
  review_input: CalendarCheck,
  witness: PenLine,
  observation: Eye,
  lesson: School,
  revision: BookOpen,
};

/**
 * A little colour, used with intent (Andrew, 10 Oct: "a little bit of
 * colour"): each kind of thing carries one hue, as a small marker before its
 * name, so hours, plan goals, evidence and quizzes read apart at a glance.
 * Never a wash behind text, never an icon tile (they read as generated).
 */
const KIND_TONE: Record<DoNextKind, string> = {
  plan: 'bg-emerald-400',
  referred: 'bg-emerald-400',
  otj_returned: 'bg-sky-400',
  hours_confirm: 'bg-sky-400',
  quiz: 'bg-amber-300',
  quiz_marked: 'bg-amber-300',
  goal_blocked: 'bg-violet-300',
  goal_overdue: 'bg-violet-300',
  goal_new: 'bg-violet-300',
  goal_comment: 'bg-violet-300',
  goal_due: 'bg-violet-300',
  message: 'bg-pink-300',
  comment: 'bg-emerald-400',
  review_sign: 'bg-teal-300',
  review_input: 'bg-teal-300',
  witness: 'bg-emerald-400',
  observation: 'bg-emerald-400',
  lesson: 'bg-indigo-300',
  revision: 'bg-amber-300',
};

/** The category word with its colour marker, e.g. ● Off-the-job hours. */
function KindLabel({ kind, label }: { kind: DoNextKind; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white">
      <span className={cn('h-2 w-2 shrink-0 rounded-full', KIND_TONE[kind])} aria-hidden />
      {label ?? KIND_LABEL[kind]}
    </span>
  );
}

/** "Goal overdue: Meet your target" → "Meet your target"; the chip already says it is late. */
const plainGoalTitle = (t: string) => t.replace(/^goal (overdue|due|blocked|new)\s*:\s*/i, '');

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
    {
      swatch: 'bg-orange-400',
      label: 'Orange chip: overdue or sent back',
      body: 'Costs something every day it waits.',
    },
    {
      swatch: 'bg-white',
      label: 'Plain chip: when it is due',
      body: 'Due this week or later. Nothing urgent yet.',
    },
  ],
};

/* --------------------------------------------------------------------------
   Criteria in words. get_my_do_next titles a sent-back criterion by its code
   ("Add more evidence for 022 AC 2.1"), which means nothing to a learner. The
   item's deep link carries the unit and criterion codes, so the words come
   from get_portfolio_ac_state (the same rows the tutor and assessor read):
   the criterion text as the title, the unit title under it, the code small.
   -------------------------------------------------------------------------- */

interface AcWords {
  unit_title: string | null;
  ac_text: string | null;
}
type AcLookup = Map<string, AcWords>;

const acKey = (unit: string, ac: string) => `${unit}::${ac}`;
const acWordsCache = new Map<string, AcLookup>();

/** The unit:criterion pairs in a do-next deep link (`ac=022:2.1,022:2.2`). */
function acRefs(href: string): { unit: string; ac: string }[] {
  const m = /[?&]ac=([^&#]*)/.exec(href);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((pair) => {
      const i = pair.indexOf(':');
      if (i < 0) return null;
      try {
        return {
          unit: decodeURIComponent(pair.slice(0, i)),
          ac: decodeURIComponent(pair.slice(i + 1)),
        };
      } catch {
        return null;
      }
    })
    .filter((x): x is { unit: string; ac: string } => !!x && !!x.unit && !!x.ac);
}

/** Shorten criterion text to a title, on a word boundary. */
function shorten(text: string, max = 72): string {
  const t = text
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.;:]+$/, '');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > 40 ? cut.slice(0, sp) : cut).replace(/[,;:]+$/, '')}…`;
}

function useAcWords(needed: boolean): AcLookup | null {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [lookup, setLookup] = useState<AcLookup | null>(() =>
    uid ? (acWordsCache.get(uid) ?? null) : null
  );
  useEffect(() => {
    if (!needed || !uid) return;
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase.rpc(
        'get_portfolio_ac_state' as never,
        {
          p_user_id: uid,
        } as never
      );
      if (cancelled || error) return;
      const map: AcLookup = new Map();
      for (const r of (data ?? []) as unknown as {
        unit_code: string;
        ac_code: string;
        unit_title: string | null;
        ac_text: string | null;
      }[]) {
        map.set(acKey(r.unit_code, r.ac_code), { unit_title: r.unit_title, ac_text: r.ac_text });
        if (!map.has(acKey(r.unit_code, ''))) {
          map.set(acKey(r.unit_code, ''), { unit_title: r.unit_title, ac_text: null });
        }
      }
      acWordsCache.set(uid, map);
      setLookup(map);
    })();
    return () => {
      cancelled = true;
    };
  }, [needed, uid]);
  return lookup;
}

const unitCodeLabel = (unit: string) => (/^unit\b/i.test(unit) ? unit : `Unit ${unit}`);

interface Worded {
  title: string;
  /** The unit, in words, shown above the detail. */
  context: string | null;
  /** The code, small, for anyone matching it to a paper record. */
  code: string | null;
}

/** A referred item, reworded from its criteria. Falls back to the server title. */
function wordReferred(item: DoNextItem, lookup: AcLookup | null): Worded {
  const refs = acRefs(item.href);
  if (refs.length === 0) return { title: item.title, context: null, code: null };
  const unit = refs[0].unit;
  const unitTitle = lookup?.get(acKey(unit, ''))?.unit_title ?? null;
  if (refs.length === 1) {
    const words = lookup?.get(acKey(unit, refs[0].ac))?.ac_text;
    return {
      title: words ? `Add more evidence: ${shorten(words)}` : 'Add more evidence for one criterion',
      context: unitTitle,
      code: `${unitCodeLabel(unit)} · AC ${refs[0].ac}`,
    };
  }
  return {
    title: `Add more evidence for ${refs.length} criteria`,
    context: unitTitle,
    code: `${unitCodeLabel(unit)} · AC ${refs.map((r) => r.ac).join(', ')}`,
  };
}

function fmtDue(item: DoNextItem, today: string | undefined): string | null {
  if (!item.due) return null;
  const t =
    today ?? new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
  const days = Math.round(
    (new Date(`${item.due}T12:00:00Z`).getTime() - new Date(`${t}T12:00:00Z`).getTime()) /
      86_400_000
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
  lookup,
  onOpen,
}: {
  item: DoNextItem;
  first: boolean;
  today?: string;
  lookup: AcLookup | null;
  onOpen: (href: string) => void;
}) {
  const due = fmtDue(item, today);
  const worded: Worded =
    item.kind === 'referred'
      ? wordReferred(item, lookup)
      : { title: plainGoalTitle(item.title), context: null, code: null };
  const now = item.urgency === 'now';
  const late = !!due && due.startsWith('Was due');
  // Status is a chip (border and text only): orange when it needs you now or
  // is late, neutral otherwise.
  const chip = now && !due ? 'Needs you now' : due;
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(item.href)}
        className="group relative flex w-full min-w-0 items-start gap-3.5 px-4 py-4 text-left touch-manipulation transition-colors hover:bg-white/[0.035] active:bg-white/[0.06] sm:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <KindLabel kind={item.kind} />
            {chip && <span className={lcChip(now || late ? 'action' : 'neutral')}>{chip}</span>}
          </span>
          <span className="mt-1 block text-[15px] font-semibold leading-snug text-white line-clamp-2">
            {worded.title}
          </span>
          {(worded.context || worded.code) && (
            <span className="mt-0.5 block text-[13px] leading-snug text-white">
              {worded.context}
              {worded.code && (
                <span className={cn('text-[12px] tabular-nums', worded.context && 'ml-1.5')}>
                  {worded.context ? `(${worded.code})` : worded.code}
                </span>
              )}
            </span>
          )}
          {item.detail && (
            <span className="mt-0.5 block text-[13px] leading-snug text-white line-clamp-2">
              {item.detail}
            </span>
          )}
          {/* Phone: the verb sits under the text so the title keeps the width. */}
          <span
            className={cn(
              'mt-3 items-center justify-center gap-1 text-[14px] font-semibold sm:hidden',
              first
                ? 'flex h-11 w-full rounded-xl bg-elec-yellow text-black'
                : 'inline-flex h-6 text-white'
            )}
          >
            {item.action}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
        <span
          className={cn(
            'hidden h-11 shrink-0 items-center gap-1 self-center rounded-xl px-4 text-[13.5px] font-semibold sm:inline-flex',
            first
              ? 'bg-elec-yellow text-black'
              : 'border border-white/[0.14] text-white group-hover:border-white/[0.3]'
          )}
        >
          {item.action}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </button>
    </li>
  );
}

/**
 * Several overdue plan goals read as one thing ("4 goals are overdue") with
 * each goal a short row under it, instead of four identical cards that each
 * start "Goal overdue:".
 */
function GoalGroupRow({
  goals,
  today,
  onOpen,
}: {
  goals: DoNextItem[];
  today?: string;
  onOpen: (href: string) => void;
}) {
  const oldest = goals
    .map((g) => g.due)
    .filter((d): d is string => !!d)
    .sort()[0];
  const oldestLabel = oldest
    ? new Date(`${oldest}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;
  return (
    <li className="px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <KindLabel kind="goal_overdue" />
            <span className={lcChip('action')}>{goals.length} overdue</span>
          </div>
          <p className="mt-1 text-[15px] font-semibold leading-snug text-white">
            {goals.length} goals on your learning plan are past their date
          </p>
          <p className="mt-0.5 text-[13px] leading-snug text-white">
            {oldestLabel ? `The oldest was due ${oldestLabel}. ` : ''}Open one to update it or ask
            your tutor for a new date.
          </p>
        </div>
      </div>
      <ul className="mt-3 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08] ">
        {goals.map((g) => (
          <li key={g.key}>
            <button
              type="button"
              onClick={() => onOpen(g.href)}
              className="group flex min-h-[52px] w-full min-w-0 items-center gap-3 px-3.5 py-2.5 text-left touch-manipulation transition-colors hover:bg-white/[0.035] active:bg-white/[0.06]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold leading-snug text-white line-clamp-2">
                  {plainGoalTitle(g.title)}
                </span>
              </span>
              {fmtDue(g, today) && (
                <span className="shrink-0 text-[12.5px] font-medium tabular-nums text-orange-300">
                  {fmtDue(g, today)?.replace(/^Was due /, '')}
                </span>
              )}
              <ChevronRight
                className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
}

type Entry =
  { type: 'item'; item: DoNextItem } | { type: 'goals'; key: string; goals: DoNextItem[] };

/** Fold two or more overdue goals into one entry where the first of them sits. */
function toEntries(items: DoNextItem[]): Entry[] {
  const overdue = items.filter((i) => i.kind === 'goal_overdue');
  if (overdue.length < 2) return items.map((item) => ({ type: 'item', item }));
  const out: Entry[] = [];
  let placed = false;
  for (const item of items) {
    if (item.kind !== 'goal_overdue') out.push({ type: 'item', item });
    else if (!placed) {
      out.push({ type: 'goals', key: 'goals:overdue', goals: overdue });
      placed = true;
    }
  }
  return out;
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
  // The server titles the coverage gap "Capture evidence for unit 022: <title>";
  // lead with the unit's name and keep the code small.
  const gapMatch =
    suggestion.kind === 'coverage_gap'
      ? /^Capture evidence for unit (.+?): (.+)$/i.exec(suggestion.title)
      : null;
  const gap = gapMatch
    ? { title: `Capture evidence for ${gapMatch[2]}`, code: unitCodeLabel(gapMatch[1]) }
    : null;
  return (
    <div
      className={cn(
        HOME_CARD,
        'p-4 sm:p-5',
        'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8'
      )}
    >
      <div className="min-w-0">
        {allClear && (
          <p className="mb-2 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black"
              aria-hidden
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            Nothing is waiting on you
          </p>
        )}
        <p className="text-[13px] font-medium text-white">Best thing to do this week</p>
        <p className="mt-1 text-[18px] font-semibold leading-snug tracking-tight text-white sm:text-[20px]">
          {gap ? gap.title : suggestion.title}
          {gap?.code && (
            <span className="ml-2 align-middle text-[12px] font-medium tabular-nums">
              ({gap.code})
            </span>
          )}
        </p>
        <p className="mt-1 max-w-[70ch] text-[13.5px] leading-snug text-white">
          {suggestion.detail}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onOpen(suggestion.href)}
        className={cn(
          'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-semibold touch-manipulation transition-colors',
          allClear
            ? 'bg-elec-yellow text-black hover:opacity-90'
            : 'border border-white/[0.14] text-white hover:border-elec-yellow'
        )}
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
  const lookup = useAcWords(items.some((i) => i.kind === 'referred'));
  const counts = data?.counts;
  const nowCount = items.filter((i) => i.urgency === 'now').length;
  const soonCount = items.filter((i) => i.urgency === 'soon').length;
  const entries = useMemo(() => toEntries(items), [items]);
  const visible = showAll ? entries : entries.slice(0, limit);
  const summary =
    items.length === 0
      ? null
      : [
          nowCount > 0 && `${nowCount} need${nowCount === 1 ? 's' : ''} you now`,
          soonCount > 0 && `${soonCount} this week`,
        ]
          .filter(Boolean)
          .join(' · ') || `${items.length} on your list`;

  return (
    <section className={cn('space-y-3', className)} aria-labelledby="do-next-title">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2
              id="do-next-title"
              className="text-[20px] font-semibold tracking-tight text-white sm:text-[22px]"
            >
              {title}
            </h2>
            <PageHelpButton help={DO_NEXT_HELP} className="h-11 w-11" />
          </div>
          <p className="mt-0.5 text-[13px] text-white">
            {sub ?? 'What is waiting on you, most urgent first. Tap a row to deal with it.'}
          </p>
        </div>
        {summary && (
          <span
            className={cn(
              'shrink-0 text-[12.5px] font-semibold tabular-nums sm:text-right',
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
            <div className={HOME_CARD}>
              <ul className="divide-y divide-white/[0.07]">
                {visible.map((e, i) =>
                  e.type === 'goals' ? (
                    <GoalGroupRow key={e.key} goals={e.goals} today={data?.today} onOpen={open} />
                  ) : (
                    <Row
                      key={e.item.key}
                      item={e.item}
                      first={i === 0}
                      today={data?.today}
                      lookup={lookup}
                      onOpen={open}
                    />
                  )
                )}
              </ul>
              {entries.length > limit && (
                <button
                  type="button"
                  onClick={() => setShowAll((s) => !s)}
                  className="flex h-12 w-full items-center justify-center gap-1 border-t border-white/[0.08] text-[13.5px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.035] active:bg-white/[0.06]"
                >
                  {showAll ? 'Show fewer' : `Show all ${items.length}`}
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      showAll ? '-rotate-90' : 'rotate-90'
                    )}
                    aria-hidden
                  />
                </button>
              )}
            </div>
          )}

          {/* The one thing that helps most: the whole answer when the list is
              empty, and a nudge underneath when nothing is pressing. */}
          {data?.suggestion &&
            (items.length === 0 || (counts && nowCount === 0 && soonCount === 0)) && (
              <SuggestionCard
                suggestion={data.suggestion}
                allClear={items.length === 0}
                onOpen={open}
              />
            )}
        </>
      )}
    </section>
  );
}

export default DoNextList;
