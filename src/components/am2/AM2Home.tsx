/**
 * AM2Home — the AM2 simulator landing.
 *
 * 10 Oct 2026: rebuilt in the College Hub design language (Andrew: "make it
 * excellent" on phones). The title is the count ("0 of 5 sections ready");
 * everything else is one list on a phone and a grid of same-height cards on a
 * wider screen. One solid yellow action (first visit only); the next section
 * is marked by a yellow line of text, not a yellow card.
 *
 *   1. Where you stand — x of N sections ready (A1–E), AM2 date
 *   2. Start something — next section, mock day, spot check, drill
 *   3. Your sections — A1 to E: last score, change on the run before, verdict
 *   4. Weak spots — from the mistakes saved with each run
 *   5. Practice and records — Section A, your runs, the full-day result
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Info, Loader2 } from 'lucide-react';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { useAm2ExamDate } from '@/hooks/useAm2Readiness';
import { useAM2Sections, type AM2SectionState } from '@/hooks/am2/useAM2Sections';
import { drilledWhen, lastDrill } from '@/hooks/am2/drillLog';
import { useAuth } from '@/contexts/AuthContext';
import { useAM2WeakSpots } from '@/hooks/am2/useAM2WeakSpots';
import { DRILLS, type DrillKind } from '@/data/am2/sectionBDrills';

interface AM2HomeProps {
  onNavigateToTab: (tab: string, mode?: 'learn') => void;
  onOpenDrill: (kinds: DrillKind[]) => void;
  /** Section E: open the knowledge test set to one topic. */
  onOpenTopic: (topic: string) => void;
}

/** Short names for the KPI labels; the full titles are in useAM2Sections. */
const SHORT_TITLE: Record<string, string> = {
  A1: 'Safe working',
  B: 'Inspection & testing',
  C: 'Safe isolation',
  D: 'Fault diagnosis',
  E: 'Knowledge test',
};

function daysLabel(days: number): string {
  if (days === 0) return 'Your AM2 is today';
  if (days === 1) return 'Your AM2 is tomorrow';
  if (days === -1) return 'Your AM2 was yesterday';
  if (days < 0) return `Your AM2 was ${Math.abs(days)} days ago`;
  return `${days} days to your AM2`;
}

function verdictFor(s: AM2SectionState, isNext: boolean): string {
  if (s.status === 'ready') return 'Ready — keep it there';
  if (s.status === 'not_tried') return isNext ? 'Not tried — start here' : 'Not tried yet';
  const last = s.recent[0]?.score ?? 0;
  return last >= s.bar ? 'At the bar — once more to confirm' : 'Below the bar — go again';
}

/** A thing to open from the AM2 home: a title, a line, an optional figure. */
interface Am2Link {
  id: string;
  title: string;
  description?: string;
  /** A small first line, e.g. "Next up" or "In 2 of your last 3 runs". */
  lead?: string;
  figure?: string;
  meta?: string;
  onClick: () => void;
}

/*
 * One list on a phone (rows divided by hairlines, edge to edge), a grid of
 * same-height cards from sm: up. The College Hub home's pattern, so the AM2
 * home reads like the rest of the apprentice area.
 */
const GRID_LIST =
  '-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.06] bg-[hsl(0_0%_12%)] sm:mx-0 sm:grid sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-transparent';
const GRID_ITEM =
  'group flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:h-full sm:items-start sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-[hsl(0_0%_12%)] sm:p-5 sm:hover:border-white/[0.18]';

function LinkGrid({
  title,
  items,
  cols = 'sm:grid-cols-2 lg:grid-cols-4',
}: {
  title: string;
  items: Am2Link[];
  cols?: string;
}) {
  return (
    <motion.section variants={itemVariants} className="space-y-3">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
      <ul className={cn(GRID_LIST, cols)}>
        {items.map((it) => (
          <li key={it.id}>
            <button type="button" onClick={it.onClick} className={GRID_ITEM}>
              <span className="flex min-w-0 flex-1 flex-col sm:h-full">
                {it.lead && (
                  <span className="mb-0.5 text-[12.5px] font-semibold text-elec-yellow">
                    {it.lead}
                  </span>
                )}
                <span className="text-[15px] font-semibold leading-snug text-white">
                  {it.title}
                </span>
                {it.figure && (
                  <span className="mt-2 text-[24px] font-bold leading-none tabular-nums text-white">
                    {it.figure}
                  </span>
                )}
                {it.description && (
                  <span className="mt-1 text-[13px] leading-snug text-white">{it.description}</span>
                )}
                {it.meta && (
                  <span className="mt-1.5 text-[12.5px] font-medium text-white sm:mt-auto sm:pt-2">
                    {it.meta}
                  </span>
                )}
              </span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 sm:mt-1"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

/** One section as a row (phone) or a card (desktop): key, name, verdict, last score. */
function SectionRow({
  s,
  isNext,
  onOpen,
}: {
  s: AM2SectionState;
  isNext: boolean;
  onOpen: () => void;
}) {
  const [last, prev] = s.recent;
  const delta = last && prev ? last.score - prev.score : null;
  const ready = s.status === 'ready';
  return (
    <li>
      <button type="button" onClick={onOpen} className={cn(GRID_ITEM, 'sm:flex-col sm:gap-3')}>
        <span className="flex w-full min-w-0 flex-1 items-center gap-3 sm:items-start">
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[14px] font-bold text-white',
              ready
                ? 'border-emerald-400/60'
                : isNext
                  ? 'border-elec-yellow'
                  : 'border-white/[0.18]'
            )}
          >
            {s.key}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-snug text-white">
              {SHORT_TITLE[s.key] ?? s.title}
            </span>
            <span
              className={cn(
                'mt-0.5 block text-[13px] leading-snug',
                ready ? 'text-emerald-300' : isNext ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {verdictFor(s, isNext)}
            </span>
          </span>
          <span className={cn('shrink-0 text-right sm:hidden', !last && 'hidden')}>
            <span className="block text-[20px] font-bold leading-none tabular-nums text-white">
              {last ? `${last.score}%` : ''}
            </span>
            {delta !== null && delta !== 0 && (
              <span
                className={cn(
                  'mt-1 block text-[12px] font-semibold tabular-nums',
                  delta > 0 ? 'text-emerald-300' : 'text-orange-300'
                )}
              >
                {delta > 0 ? '+' : ''}
                {delta} pts
              </span>
            )}
          </span>
        </span>
        {/* Desktop: the figure gets its own line, the bar and timing below. */}
        <span className="hidden w-full sm:block">
          <span className="flex items-baseline gap-2">
            <span
              className={cn(
                'leading-none tabular-nums text-white',
                last ? 'text-[26px] font-bold' : 'text-[15px] font-semibold'
              )}
            >
              {last ? `${last.score}%` : 'No runs yet'}
            </span>
            {delta !== null && delta !== 0 && (
              <span
                className={cn(
                  'text-[12.5px] font-semibold tabular-nums',
                  delta > 0 ? 'text-emerald-300' : 'text-orange-300'
                )}
              >
                {delta > 0 ? '+' : ''}
                {delta} pts
              </span>
            )}
          </span>
          <span className="mt-2 block text-[12.5px] leading-snug text-white">
            Bar {s.barLabel} · {s.onTheDay} on the day
            {s.runs ? ` · ${s.runs} run${s.runs === 1 ? '' : 's'}` : ''}
          </span>
        </span>
      </button>
    </li>
  );
}

function ExamDate() {
  const { examDate, setExamDate, daysToGo } = useAm2ExamDate();
  const [editing, setEditing] = useState(false);
  const picker = (
    <label className="flex items-center gap-2.5">
      <span className="whitespace-nowrap text-[13px] font-medium text-white">AM2 booked for</span>
      <input
        type="date"
        value={examDate ?? ''}
        onChange={(e) => {
          setExamDate(e.target.value || null);
          if (e.target.value) setEditing(false);
        }}
        className="h-11 w-[150px] rounded-none border-0 border-b border-white/[0.2] bg-transparent px-1 text-[13.5px] text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
      />
    </label>
  );
  if (daysToGo == null) return picker;
  if (editing)
    return (
      <span className="flex items-center gap-2">
        {picker}
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="h-11 px-2 text-[13px] font-medium text-white touch-manipulation"
        >
          Cancel
        </button>
      </span>
    );
  // The date has passed: a next step, not just "N days ago".
  if (daysToGo < 0) {
    return (
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[13px] font-semibold text-white">
          {daysLabel(daysToGo)} — resitting a section?
        </span>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          Set the resit date
        </button>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-3">
      <span className="text-[13px] font-semibold text-white">{daysLabel(daysToGo)}</span>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="h-11 text-[13px] font-medium text-elec-yellow touch-manipulation"
      >
        Change
      </button>
    </span>
  );
}

export function AM2Home({ onNavigateToTab, onOpenDrill, onOpenTopic }: AM2HomeProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error, reload } = useAM2Sections();
  const { data: weak } = useAM2WeakSpots('B');
  const { data: weakC } = useAM2WeakSpots('C');
  const { data: weakD } = useAM2WeakSpots('D');
  const { data: weakE } = useAM2WeakSpots('E');
  const [showHow, setShowHow] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center gap-3 py-20">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        <span className="text-sm text-white">Loading your AM2 practice…</span>
      </div>
    );
  }

  // A failed read isn't a new account — say so rather than showing "0 of 4".
  if (error) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <p className="text-base font-semibold text-white">Couldn’t load your AM2 practice</p>
        <p className="text-[13px] text-white">Check your connection — your runs are still saved.</p>
        <button
          type="button"
          onClick={() => void reload()}
          className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation"
        >
          Try again
        </button>
      </div>
    );
  }

  const { sections, readyCount, next, lastMock } = data;
  // Every run, not just the ones that count towards "ready".
  const totalRuns = data.allRuns ?? sections.reduce((n, s) => n + s.runs, 0);

  const quickStart: Am2Link[] = [
    next
      ? {
          id: 'next',
          lead: 'Next up',
          title: `Section ${next.key} · ${SHORT_TITLE[next.key] ?? next.title}`,
          description:
            next.status === 'not_tried' ? 'Not tried yet' : `Last run ${next.recent[0]?.score}%`,
          onClick: () => onNavigateToTab(next.tab),
        }
      : {
          id: 'mock',
          lead: 'Every section ready',
          title: 'Mock AM2 day',
          description: 'Run the full day back to back.',
          onClick: () => onNavigateToTab('mock-day'),
        },
    ...(next
      ? [
          {
            id: 'mock',
            title: 'Mock AM2 day',
            description: 'A1 and B to E back to back, in order',
            onClick: () => onNavigateToTab('mock-day'),
          },
        ]
      : []),
    {
      id: 'spot',
      title: 'BS 7671 spot check',
      description: '8 questions: which reg covers this?',
      onClick: () => onNavigateToTab('bs7671'),
    },
    {
      id: 'drill',
      title: 'Drill weak regs',
      description: 'Your misses come back first',
      onClick: () => onNavigateToTab('drill'),
    },
    ...(weak?.spots.length
      ? [
          {
            id: 'b-drill',
            title: 'Drill your Section B mistakes',
            description: weak.spots
              .map((w) => w.label)
              .slice(0, 2)
              .join(' · '),
            onClick: () =>
              onOpenDrill([
                ...new Set(weak.spots.map((w) => w.drill).filter((d): d is DrillKind => !!d)),
              ]),
          },
        ]
      : []),
  ];

  const records: Am2Link[] = [
    {
      id: 'section-a',
      lead: 'Section A',
      title: 'Composite installation',
      description:
        '10½ hours hands-on on the AM2S (8½ on the AM2). Practise it on a real board; the course covers the methods.',
      meta: 'AM2 course · Module 3',
      onClick: () => navigate('/study-centre/apprentice/am2/module3'),
    },
    {
      id: 'runs',
      title: 'Your runs',
      figure: totalRuns ? String(totalRuns) : undefined,
      description: totalRuns ? 'runs logged' : 'Every run with its result and time',
      onClick: () => onNavigateToTab('history'),
    },
    {
      id: 'mock',
      title: 'Last full day',
      figure: lastMock ? `${lastMock.atBar} of ${lastMock.of}` : undefined,
      description: lastMock
        ? `sections at the bar, ${new Date(lastMock.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
        : 'No mock day yet. Try one once a section is ready.',
      onClick: () => onNavigateToTab('mock-day'),
    },
  ];

  const anyWeak = [weak, weakC, weakD, weakE].some((w) => w && w.spots.length > 0);
  const weakEmpty: Am2Link | null =
    weak && weakC && weakD && weakE && !anyWeak
      ? [weak, weakC, weakD, weakE].some((w) => w.runsLooked > 0)
        ? {
            id: 'weak-clean',
            title: 'No repeated mistakes',
            description:
              'Nothing keeps coming up in your recent runs. Keep it that way in Assessment mode; that’s what counts towards ready.',
            onClick: () => onNavigateToTab('mock-day'),
          }
        : {
            id: 'weak-none',
            title: 'Nothing to go on yet',
            description:
              'Run any section in Practise or Assessment. Every mistake is saved, and the ones you repeat show up here with a way to fix them.',
            onClick: () => onNavigateToTab('testing'),
          }
      : null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      {/* 1 · Where you stand: the page title is the count. */}
      <motion.header
        variants={itemVariants}
        className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-elec-yellow">AM2 practice</p>
          <h1 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
            {readyCount} of {sections.length} sections ready
          </h1>
          <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-white">
            Ready means your last two Assessment runs both reach the practice bar (exam sittings for
            the knowledge test). Learn and Practise runs don’t count.
          </p>
          <button
            type="button"
            onClick={() => setShowHow((v) => !v)}
            aria-expanded={showHow}
            className="-ml-1 mt-1 inline-flex h-11 items-center gap-1.5 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            <Info className="h-4 w-4" strokeWidth={1.75} />
            {showHow ? 'Hide the practice bars' : 'What are the practice bars?'}
          </button>
          {showHow && (
            <p className="max-w-2xl text-[13.5px] leading-relaxed text-white">
              Practice bars: no mistakes on safe isolation, 80% on testing and faults, 70% on the
              knowledge paper. These are ours. The AM2 itself marks each criterion competent or not
              yet competent, with no overall percentage.
            </p>
          )}
        </div>
        <div className="shrink-0">
          <ExamDate />
        </div>
      </motion.header>

      {/* First visit: how this works, before any numbers. The one solid action. */}
      {totalRuns === 0 && (
        <motion.section variants={itemVariants} className={COLLEGE_CARD}>
          <h2 className="text-[17px] font-semibold text-white">How to get ready with this</h2>
          <ol className="mt-3 divide-y divide-white/[0.06] sm:grid sm:grid-cols-3 sm:gap-6 sm:divide-y-0">
            {[
              ['Learn', 'Each section walked through, every step explained.'],
              ['Practise', 'No prompts. You choose, and see where you went wrong.'],
              ['Assessment', 'As on the day. Two runs at the bar and the section is ready.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3 py-3 sm:py-0">
                <span className="w-5 shrink-0 text-[15px] font-bold tabular-nums text-white">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-snug text-white">
                  <span className="block text-[15px] font-semibold">{t}</span>
                  {d}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[13.5px] leading-relaxed text-white">
            Start with Section C, safe isolation. It’s the shortest, and every other section relies
            on it.
          </p>
          <button
            type="button"
            onClick={() => onNavigateToTab('safe-isolation', 'learn')}
            className={cn(COLLEGE_BTN_PRIMARY, 'mt-4 w-full sm:w-auto')}
          >
            Start Section C in Learn mode
          </button>
        </motion.section>
      )}

      {/* 2 · Start something */}
      <LinkGrid title="Start something" items={quickStart} />

      {/* 3 · Your sections */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">Your sections</h2>
        <ul className={cn(GRID_LIST, 'sm:grid-cols-2 lg:grid-cols-5')}>
          {sections.map((s) => (
            <SectionRow
              key={s.key}
              s={s}
              isNext={next?.key === s.key}
              onOpen={() => onNavigateToTab(s.tab)}
            />
          ))}
        </ul>
      </motion.section>

      {/* 4 · What keeps going wrong — from the mistakes saved with each run */}
      {weakEmpty ? (
        <LinkGrid title="Your weak spots" items={[weakEmpty]} cols="sm:grid-cols-1" />
      ) : (
        (
          [
            ['B', weak],
            ['C', weakC],
            ['D', weakD],
            ['E', weakE],
          ] as const
        ).map(([sec, w]) =>
          w && w.spots.length > 0 ? (
            <LinkGrid
              key={sec}
              title={`Your weak spots · Section ${sec}`}
              cols="sm:grid-cols-2 lg:grid-cols-3"
              items={w.spots.map((spot) => ({
                id: `weak-${sec}-${spot.tag}`,
                lead:
                  w.runsLooked === 1
                    ? 'In your last run'
                    : `In ${spot.runs} of your last ${w.runsLooked} runs`,
                title: sec === 'E' ? `Missed: ${spot.label}` : spot.label,
                description:
                  sec === 'E'
                    ? 'A short paper on just this topic.'
                    : spot.drill
                      ? `${DRILLS[spot.drill].title}: quick questions.`
                      : undefined,
                meta: (() => {
                  const d = spot.drill && user ? lastDrill(user.id, spot.drill) : null;
                  const times = `${spot.count} time${spot.count === 1 ? '' : 's'}`;
                  // Drilled since: say so — it clears with a clean run, not the drill.
                  return d
                    ? `${times} · drilled ${drilledWhen(d.at)}, ${d.right} of ${d.of}`
                    : times;
                })(),
                onClick: () =>
                  sec === 'E'
                    ? onOpenTopic(spot.label)
                    : spot.drill
                      ? onOpenDrill([spot.drill])
                      : undefined,
              }))}
            />
          ) : null
        )
      )}

      {/* 5 · Practice & records */}
      <LinkGrid title="Practice and records" items={records} cols="sm:grid-cols-3" />

      <p className="text-[12px] leading-snug text-white">
        Practice for the AM2. Not affiliated with or endorsed by NET or any awarding organisation.
      </p>
    </motion.div>
  );
}

export default AM2Home;
