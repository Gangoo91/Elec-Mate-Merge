/**
 * The Study Centre's four headline figures (ELE-2024, 9 Oct 2026).
 *
 * 10 Oct 2026 redesign (Andrew: "less AI generated… not a fan of the icons…
 * make the charts look professional"): one panel split by hairlines, like a
 * statement, instead of four cards each wearing an icon badge and its own
 * colour. Each figure carries the chart that makes its number mean something:
 *
 *   Streak        the last seven days, studied / frozen / missed
 *   Mock average  the last ten scores as a trend, with the pass line drawn
 *   Due           where the work comes from, as labelled bars
 *   Level         XP through this level, ends labelled, XP still to go
 *
 * Colour means one thing each: orange = below the pass mark or needs doing,
 * green = at or above it, yellow = XP. Never a translucent yellow wash.
 */
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { BarList, ScoreTrend } from './charts';

/** Hairlines between the cells: 2×2 on a phone, one row of four from lg. */
const DIVIDE = [
  '',
  'border-l',
  'border-t lg:border-l lg:border-t-0',
  'border-l border-t lg:border-t-0',
];

function Cell({
  i,
  label,
  onClick,
  ariaLabel,
  children,
}: {
  i: number;
  label: string;
  onClick?: () => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <motion.button
      variants={itemVariants}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'group flex min-h-[176px] min-w-0 flex-col border-white/[0.1] p-4 text-left transition-colors touch-manipulation active:bg-white/[0.05] sm:p-5 lg:hover:bg-white/[0.03]',
        DIVIDE[i]
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-white">{label}</span>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-white opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </span>
      {children}
    </motion.button>
  );
}

function Figure({ value, unit, tone }: { value: ReactNode; unit?: string; tone?: string }) {
  return (
    <span className="mt-1.5 flex items-baseline gap-1.5">
      <span
        className={cn(
          'text-[30px] font-bold leading-none tracking-tight tabular-nums sm:text-[34px]',
          tone ?? 'text-white'
        )}
      >
        {value}
      </span>
      {unit && <span className="text-[13px] font-medium text-white">{unit}</span>}
    </span>
  );
}

const DAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * The last 7 days (oldest first) and whether each is inside the current run.
 * Calendar arithmetic on YYYY-MM-DD keys (setDate), never 24-hour steps —
 * those land an hour off across the October and March clock changes.
 */
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function lastSevenDays(currentStreak: number, lastStudyDate: string | null, frozen: string[] = []) {
  const today = new Date();
  let runStartKey: string | null = null;
  if (currentStreak > 0 && lastStudyDate) {
    const [y, m, d] = lastStudyDate.split('-').map(Number);
    runStartKey = dayKey(new Date(y, m - 1, d - (Math.max(currentStreak, 1) - 1)));
  }
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - i));
    const key = dayKey(d);
    const inRun = !!(runStartKey && lastStudyDate && key >= runStartKey && key <= lastStudyDate);
    const froze = inRun && frozen.includes(key);
    return { label: DAY[d.getDay()], on: inRun && !froze, froze, today: i === 6 };
  });
}

export interface StudyFiguresProps {
  streak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  /** Streak freezes held, and the days a freeze kept the run alive. */
  freezes?: number;
  frozenDays?: string[];
  mockAvg: number | null;
  mockCount: number;
  /** The last ten mock scores, oldest first. */
  mockScores?: number[];
  passMark: number;
  mockLoading: boolean;
  dueMock: number;
  dueCards: number;
  dueLoading: boolean;
  level: number;
  totalXP: number;
  xpProgress: number;
  /** XP still needed for the next level. */
  xpToNext?: number;
  onStreak: () => void;
  onMocks: () => void;
  onDue: () => void;
  onLevel: () => void;
}

export function StudyFigures(p: StudyFiguresProps) {
  const days = lastSevenDays(p.streak, p.lastStudyDate, p.frozenDays ?? []);
  const due = p.dueMock + p.dueCards;
  const scores = p.mockScores ?? [];
  const avgTone =
    p.mockAvg === null
      ? 'text-white'
      : p.mockAvg >= p.passMark
        ? 'text-emerald-400'
        : 'text-orange-400';
  const freezes = p.freezes ?? 0;

  return (
    <motion.section
      aria-label="Your figures"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05 }}
      className="-mx-4 grid grid-cols-2 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl lg:grid-cols-4"
    >
      {/* Streak */}
      <Cell
        i={0}
        label="Day streak"
        onClick={p.onStreak}
        ariaLabel={`Day streak ${p.streak}. Best run ${p.longestStreak} days.${freezes ? ` ${freezes} freezes held.` : ''}`}
      >
        <Figure value={p.streak} unit={p.streak === 1 ? 'day' : 'days'} />
        <span className="mt-auto block pt-4" aria-hidden>
          <span className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <span
                key={i}
                className={cn(
                  'flex h-7 items-center justify-center rounded-md text-[12px] font-semibold',
                  d.on
                    ? 'bg-orange-400 text-black'
                    : d.froze
                      ? 'bg-sky-400 text-black'
                      : 'bg-white/[0.08] text-white',
                  d.today && 'ring-1 ring-white ring-offset-2 ring-offset-[#1e1e1e]'
                )}
              >
                {d.label}
              </span>
            ))}
          </span>
          <span className="mt-2 block text-[12px] font-medium text-white">
            Best {p.longestStreak} {p.longestStreak === 1 ? 'day' : 'days'}
            {freezes > 0 && ` · ${freezes} ${freezes === 1 ? 'freeze' : 'freezes'} held`}
          </span>
        </span>
      </Cell>

      {/* Mock average */}
      <Cell
        i={1}
        label="Mock average"
        onClick={p.onMocks}
        ariaLabel={
          p.mockAvg === null
            ? 'Mock average: no mocks yet'
            : `Mock average ${p.mockAvg}% over your last ${Math.min(10, p.mockCount)}, pass mark ${p.passMark}%`
        }
      >
        <Figure
          value={p.mockLoading ? '…' : p.mockAvg === null ? '—' : `${p.mockAvg}%`}
          tone={avgTone}
        />
        <span className="mt-auto block pt-4">
          {scores.length >= 2 ? (
            <ScoreTrend scores={scores} pass={p.passMark} />
          ) : (
            <span className="relative block h-1.5 rounded-full bg-white/[0.1]" aria-hidden>
              {p.mockAvg !== null && (
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full',
                    p.mockAvg >= p.passMark ? 'bg-emerald-400' : 'bg-orange-400'
                  )}
                  style={{ width: `${Math.max(p.mockAvg, 3)}%` }}
                />
              )}
              <span
                className="absolute -top-1 h-3.5 w-0.5 rounded-full bg-white"
                style={{ left: `${p.passMark}%` }}
              />
            </span>
          )}
          <span className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-white">
            {p.mockAvg === null ? (
              'Sit a mock to see it'
            ) : (
              <>
                <span className="w-3 border-t border-dashed border-white" aria-hidden />
                Pass {p.passMark}% · last {Math.min(10, p.mockCount)}
              </>
            )}
          </span>
        </span>
      </Cell>

      {/* Due */}
      <Cell
        i={2}
        label="Due to revise"
        onClick={p.onDue}
        ariaLabel={`${due} due to revise: ${p.dueMock} mock questions, ${p.dueCards} flashcards`}
      >
        <Figure
          value={p.dueLoading ? '…' : due}
          tone={due === 0 && !p.dueLoading ? 'text-emerald-400' : undefined}
        />
        <span className="mt-auto block pt-4">
          {due > 0 || p.dueLoading ? (
            <BarList
              rows={[
                { label: 'Mock questions', value: p.dueMock, tone: 'warn' },
                { label: 'Flashcards', value: p.dueCards, tone: 'warn' },
              ]}
            />
          ) : (
            <span className="block text-[12px] font-medium text-white">
              All caught up. Nothing due today.
            </span>
          )}
        </span>
      </Cell>

      {/* Level */}
      <Cell
        i={3}
        label={`Level ${p.level}`}
        onClick={p.onLevel}
        ariaLabel={`Level ${p.level}, ${p.totalXP} XP, ${p.xpToNext ?? 0} XP to level ${p.level + 1}`}
      >
        <Figure value={p.totalXP.toLocaleString('en-GB')} unit="XP" />
        <span className="mt-auto block pt-4">
          <span className="block h-1.5 overflow-hidden rounded-full bg-white/[0.1]" aria-hidden>
            <span
              className="block h-full rounded-full bg-elec-yellow"
              style={{ width: `${Math.min(100, Math.max(p.xpProgress, 2))}%` }}
            />
          </span>
          <span
            className="mt-1.5 flex justify-between text-[12px] font-semibold tabular-nums text-white"
            aria-hidden
          >
            <span>L{p.level}</span>
            <span>L{p.level + 1}</span>
          </span>
          <span className="mt-1 block text-[12px] font-medium text-white">
            {p.xpToNext ? `${p.xpToNext.toLocaleString('en-GB')} XP to go` : 'Top level reached'}
          </span>
        </span>
      </Cell>
    </motion.section>
  );
}
