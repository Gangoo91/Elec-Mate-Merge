/**
 * AM2Home — the AM2 simulator landing, built from the same hub primitives as
 * the Business hub (HubQuickStart, HubKpi, HubToolGrid) so it looks and feels
 * like the rest of the app rather than a one-off page. Andrew, 5 Oct 2026:
 * "we need them to match the business hubs cards style".
 *
 * Built around the real assessment: sections A1–E as KPIs with a plain status
 * from the apprentice's recent runs (useAM2Sections) — no weighted
 * percentage, because the AM2 doesn't have one.
 *
 *   1. Status line — "x of N sections ready" (A1–E), AM2 date
 *   2. Start something — next section (the one solid volt card), mock day,
 *      spot check, drill
 *   3. Your sections — B, C, D, E as KPIs: last score, change on the run
 *      before, verdict, practice bar
 *   4. Practice & records — Section A, your runs, the full-day result
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Loader2 } from 'lucide-react';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubQuickStart,
  HubSectionHeading,
  HubToolGrid,
  type HubQuickAction,
  type HubTool,
} from '@/components/hub/HubPrimitives';
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

function SectionKpi({
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
  return (
    <HubKpi
      accent={isNext}
      label={`Section ${s.key} · ${SHORT_TITLE[s.key] ?? s.title}`}
      value={last ? `${last.score}%` : '—'}
      delta={delta === null ? undefined : `${delta >= 0 ? '+' : ''}${delta} pts`}
      direction={delta === null ? 'flat' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'}
      sentiment={delta === null || delta === 0 ? 'neutral' : delta > 0 ? 'good' : 'bad'}
      verdict={verdictFor(s, isNext)}
      context={`Bar ${s.barLabel} · ${s.onTheDay} on the day${s.runs ? ` · ${s.runs} run${s.runs === 1 ? '' : 's'}` : ''}`}
      onClick={onOpen}
    />
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

  const quickStart: HubQuickAction[] = [
    next
      ? {
          title: `Section ${next.key} · ${SHORT_TITLE[next.key] ?? next.title}`,
          description:
            next.status === 'not_tried'
              ? 'Next up · not tried yet'
              : `Next up · last ${next.recent[0]?.score}%`,
          onClick: () => onNavigateToTab(next.tab),
          primary: true,
        }
      : {
          title: 'Mock AM2 day',
          description: 'Every section ready — run the full day back to back.',
          onClick: () => onNavigateToTab('mock-day'),
          primary: true,
        },
    ...(next
      ? [
          {
            title: 'Mock AM2 day',
            description: 'A1 and B to E back to back, in order',
            onClick: () => onNavigateToTab('mock-day'),
          },
        ]
      : []),
    {
      title: 'BS 7671 spot check',
      description: '8 questions — which reg covers this?',
      onClick: () => onNavigateToTab('bs7671'),
    },
    {
      title: 'Drill weak regs',
      description: 'Your misses come back first',
      onClick: () => onNavigateToTab('drill'),
    },
    ...(weak?.spots.length
      ? [
          {
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

  const records: HubTool[] = [
    {
      id: 'section-a',
      eyebrow: 'Section A',
      title: 'Composite installation',
      description:
        '10½ hours hands-on on the AM2S (8½ on the AM2). Practise it on a real board — the course covers the methods.',
      meta: 'AM2 course · Module 3',
      to: '/study-centre/apprentice/am2/module3',
    },
    {
      id: 'runs',
      title: 'Your runs',
      value: totalRuns ? String(totalRuns) : undefined,
      valueLabel: totalRuns ? 'runs logged' : undefined,
      description: totalRuns ? undefined : 'Every run with its result and time',
      onClick: () => onNavigateToTab('history'),
    },
    {
      id: 'mock',
      title: 'Last full day',
      value: lastMock ? `${lastMock.atBar} of ${lastMock.of}` : undefined,
      valueLabel: lastMock
        ? new Date(lastMock.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        : undefined,
      description: lastMock
        ? 'sections at the bar'
        : 'No mock day yet — try one once a section is ready',
      onClick: () => onNavigateToTab('mock-day'),
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      {/* First visit: how this works, before any numbers */}
      {totalRuns === 0 && (
        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-elec-yellow/40 p-4 sm:p-5"
        >
          <p className="text-[17px] font-bold text-white">How to get ready with this</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              ['Learn', 'Each section walked through, every step explained.'],
              ['Practise', 'No prompts — you choose, and see where you went wrong.'],
              ['Assessment', 'As on the day. Two runs at the bar and the section is ready.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3 rounded-xl border border-white/[0.14] p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-elec-yellow text-[13px] font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-snug text-white">
                  <span className="block font-semibold">{t}</span>
                  {d}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[13px] text-white">
            Start with Section C, safe isolation — it’s the shortest, and every other section relies
            on it.
          </p>
          <button
            type="button"
            onClick={() => onNavigateToTab('safe-isolation', 'learn')}
            className="mt-3 inline-flex h-12 items-center rounded-xl bg-elec-yellow px-5 text-[14.5px] font-bold text-black touch-manipulation"
          >
            Start Section C in Learn mode
          </button>
        </motion.section>
      )}

      {/* 1 · Status line */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[28px]">
            {readyCount} of {sections.length} sections ready
          </p>
          <p className="mt-1 text-[13px] text-white">
            Ready means your last two Assessment runs both reach the practice bar (exam sittings for
            the knowledge test). Learn and Practise runs don’t count.{' '}
            <button
              type="button"
              onClick={() => setShowHow((v) => !v)}
              aria-expanded={showHow}
              className="inline-flex h-11 items-center gap-1 font-semibold text-elec-yellow touch-manipulation"
            >
              <Info className="h-3.5 w-3.5" />
              {showHow ? 'Hide' : 'More'}
            </button>
          </p>
          {showHow && (
            <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-white">
              Practice bars: no mistakes on safe isolation, 80% on testing and faults, 70% on the
              knowledge paper. These are ours — the AM2 itself marks each criterion competent or not
              yet competent, with no overall percentage.
            </p>
          )}
        </div>
        <ExamDate />
      </motion.section>

      {/* 2 · Start something */}
      <HubQuickStart label="Start something" items={quickStart} />

      {/* 3 · Your sections */}
      <section className="space-y-3">
        <HubSectionHeading>Your sections</HubSectionHeading>
        <HubKpiRow>
          {sections.map((s) => (
            <SectionKpi
              key={s.key}
              s={s}
              isNext={next?.key === s.key}
              onOpen={() => onNavigateToTab(s.tab)}
            />
          ))}
        </HubKpiRow>
      </section>

      {/* 4 · What keeps going wrong — from the mistakes saved with each run */}
      {weak &&
      weakC &&
      weakD &&
      weakE &&
      ![weak, weakC, weakD, weakE].some((w) => w.spots.length > 0) ? (
        <HubToolGrid
          label="Your weak spots"
          columns="three"
          cards={[
            [weak, weakC, weakD, weakE].some((w) => w.runsLooked > 0)
              ? {
                  id: 'weak-clean',
                  title: 'No repeated mistakes',
                  description:
                    'Nothing keeps coming up in your recent runs. Keep it that way in Assessment mode — that’s what counts towards ready.',
                  onClick: () => onNavigateToTab('mock-day'),
                }
              : {
                  id: 'weak-none',
                  title: 'Nothing to go on yet',
                  description:
                    'Run any section in Practise or Assessment. Every mistake is saved, and the ones you repeat show up here with a way to fix them.',
                  onClick: () => onNavigateToTab('testing'),
                },
          ]}
        />
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
            <HubToolGrid
              key={sec}
              label={`Your weak spots · Section ${sec}`}
              columns="three"
              cards={w.spots.map((spot) => ({
                id: `weak-${sec}-${spot.tag}`,
                eyebrow:
                  w.runsLooked === 1
                    ? 'In your last run'
                    : `In ${spot.runs} of your last ${w.runsLooked} runs`,
                title: sec === 'E' ? `Missed: ${spot.label}` : spot.label,
                description:
                  sec === 'E'
                    ? 'A short paper on just this topic.'
                    : spot.drill
                      ? `${DRILLS[spot.drill].title} — quick questions.`
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
                  sec === 'E' ? onOpenTopic(spot.label) : spot.drill && onOpenDrill([spot.drill]),
              }))}
            />
          ) : null
        )
      )}

      {/* 5 · Practice & records */}
      <HubToolGrid label="Practice & records" cards={records} columns="three" />

      <p className="text-[11px] leading-snug text-white">
        Practice for the AM2. Not affiliated with or endorsed by NET or any awarding organisation.
      </p>
    </motion.div>
  );
}

export default AM2Home;
