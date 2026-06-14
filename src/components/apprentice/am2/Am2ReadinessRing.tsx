/**
 * Am2ReadinessRing — the AM2 readiness hero.
 *
 * SVG circular progress ring (~120px) showing the session-based
 * "match fitness" score from useAm2Readiness, with:
 *   • the explainable bands underneath (label · mini bar · hint) so the
 *     number is never a black box,
 *   • a days-to-go chip when the exam date is set ("AM2 in 41 days"),
 *     or a small inline native date input when it isn't,
 *   • an h-11 yellow "Run a timed mock" CTA into the simulator.
 *
 * The score stays elec-yellow at every value — we don't traffic-light
 * someone's confidence. The ring animates its stroke on mount.
 *
 * Also exports Am2ReadinessRow — the compact ring-less one-row version
 * (score chip + days-to-go + chevron) used on the Progress dashboard.
 */

import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/components/ui/MobileAwareMotion';
import { useAm2Readiness } from '@/hooks/useAm2Readiness';

const SIMULATOR_PATH = '/apprentice/am2-simulator';
const TIMED_MOCK_PATH = `${SIMULATOR_PATH}?tab=mock-day`;

function daysToGoLabel(daysToGo: number): string {
  if (daysToGo === 0) return 'AM2 today';
  if (daysToGo === 1) return 'AM2 tomorrow';
  if (daysToGo < 0)
    return `AM2 was ${Math.abs(daysToGo)} day${Math.abs(daysToGo) === 1 ? '' : 's'} ago`;
  return `AM2 in ${daysToGo} days`;
}

/* ─── The ring itself ─────────────────────────────────────────────── */

function Ring({ score, size = 120 }: { score: number | null; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const reducedMotion = useReducedMotion();

  // Animate stroke on mount: start fully offset, transition to target.
  // Skipped entirely under prefers-reduced-motion (house pattern —
  // MobileAwareMotion) so the arc just appears at its value.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const pct = drawn || reducedMotion ? Math.max(0, Math.min(100, score ?? 0)) : 0;
  const offset = circumference * (1 - pct / 100);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={
        score === null ? 'AM2 readiness — no timed runs yet' : `AM2 readiness ${score} of 100`
      }
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress — single accent, whatever the score */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-elec-yellow"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: reducedMotion
              ? 'none'
              : 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </svg>
      {/* Centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[32px] font-semibold tabular-nums leading-none text-white">
          {score === null ? '—' : score}
        </span>
        <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {score === null ? 'No runs' : 'Ready'}
        </span>
      </div>
    </div>
  );
}

/* ─── Hero — ring + bands + date + CTA ───────────────────────────── */

interface Am2ReadinessRingProps {
  /** Where the "Run a timed mock" CTA goes. Defaults to a Link into the simulator's mock day. */
  onRunMock?: () => void;
  className?: string;
}

export function Am2ReadinessRing({ onRunMock, className }: Am2ReadinessRingProps) {
  const { score, bands, sessionsCount, loading, examDate, setExamDate, daysToGo } =
    useAm2Readiness();
  const dateInputId = useId();

  if (loading) {
    return (
      <div className={cn('flex flex-col items-center py-4', className)}>
        <div className="h-[120px] w-[120px] rounded-full border-8 border-white/[0.06] animate-pulse" />
        <div className="mt-5 h-3 w-44 rounded bg-white/[0.05] animate-pulse" />
      </div>
    );
  }

  const ctaClasses =
    'inline-flex h-11 items-center justify-center rounded-xl bg-elec-yellow px-6 text-[13px] font-semibold text-black touch-manipulation transition-transform active:scale-95';

  return (
    <section className={cn('flex flex-col items-center', className)}>
      <Ring score={score} />

      {/* Null state — first-run nudge instead of a misleading zero */}
      {score === null && (
        <p className="mt-4 max-w-xs text-center text-[12.5px] leading-relaxed text-white/65">
          No timed runs banked yet — your readiness score starts with your first one.
        </p>
      )}

      {/* The WHY — explainable bands, quiet rows */}
      {score !== null && bands.length > 0 && (
        <ul className="mt-5 w-full max-w-xl divide-y divide-white/[0.04] overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
          {bands.map((band) => (
            <li key={band.key} className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[11.5px] font-medium text-white/80">
                  {band.label}
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-elec-yellow/80"
                    style={{ width: `${band.value}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 text-right text-[11.5px] tabular-nums text-white/70">
                  {band.value}
                </span>
              </div>
              <p className="mt-1 text-[10.5px] leading-snug text-white/45">{band.hint}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Exam date — chip when set, small inline input when not */}
      <div className="mt-4 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {examDate && daysToGo !== null ? (
          <span
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11.5px] font-medium tabular-nums',
              daysToGo >= 0
                ? 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow'
                : 'border-white/[0.08] bg-white/[0.03] text-white/55'
            )}
          >
            <Calendar className="h-3 w-3" />
            {daysToGoLabel(daysToGo)}
          </span>
        ) : (
          <label
            htmlFor={dateInputId}
            className="inline-flex items-center gap-2 text-[11.5px] font-medium text-white/65"
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-elec-yellow" />
              Set exam date
            </span>
            <input
              id={dateInputId}
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                if (e.target.value) setExamDate(e.target.value);
              }}
              className="h-8 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_8%)] px-2 text-[12px] text-white outline-none touch-manipulation focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
            />
          </label>
        )}

        {onRunMock ? (
          <button type="button" onClick={onRunMock} className={ctaClasses}>
            {sessionsCount === 0 ? 'Take your first timed run' : 'Run a timed mock'}
          </button>
        ) : (
          <Link to={TIMED_MOCK_PATH} className={ctaClasses}>
            {sessionsCount === 0 ? 'Take your first timed run' : 'Run a timed mock'}
          </Link>
        )}
      </div>
    </section>
  );
}

/* ─── Compact one-row version — Progress dashboard ───────────────── */

export function Am2ReadinessRow({ className }: { className?: string }) {
  const { score, sessionsCount, loading, daysToGo } = useAm2Readiness();

  return (
    <Link
      to={SIMULATOR_PATH}
      className={cn(
        'flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3 touch-manipulation transition-colors hover:bg-white/[0.02]',
        className
      )}
    >
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          AM2 readiness
        </div>
        <div className="mt-1 flex items-baseline gap-2 text-[13px] text-white/70">
          {loading ? (
            <span className="text-white/45">Checking your runs…</span>
          ) : score === null ? (
            <span>No timed runs yet — take your first</span>
          ) : (
            <>
              <span className="font-mono text-[18px] font-semibold tabular-nums leading-none text-elec-yellow">
                {score}
              </span>
              <span className="text-[11px] text-white/45">/ 100</span>
              <span className="text-white/25">·</span>
              <span className="tabular-nums">
                {sessionsCount} run{sessionsCount === 1 ? '' : 's'}
              </span>
              {daysToGo !== null && daysToGo >= 0 && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="tabular-nums">{daysToGoLabel(daysToGo)}</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow/70" />
    </Link>
  );
}

export default Am2ReadinessRing;
