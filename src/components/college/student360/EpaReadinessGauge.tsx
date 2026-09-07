import { cn } from '@/lib/utils';
import {
  User2,
  ShieldCheck,
  Bot,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react';
import type { EpaJudgement, EpaSource } from '@/hooks/useEpaReadiness';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { epaJudgementPosition } from '@/lib/epaBands';

/* ==========================================================================
   EpaReadinessGauge — every voice's verdict on one readiness scale.

   Maps verdict → band start, confidence → position within the band:
     refer    →  0–25
     not_yet  → 25–50
     almost   → 50–75
     ready    → 75–100

   Each voice (Learner / Tutor / AI / Employer) is a marker on the track.
   Markers stack if they cluster.

   Palette, not a rainbow. The old track was four translucent colour bands
   (red / orange / amber / emerald) with blue, purple and emerald markers on
   top — five hues to say "three people, one scale". The track is now one
   neutral rule with tick marks at the band boundaries; the tutor's marker is
   solid volt because in this hub the tutor's judgement is the one that
   counts, the learner's is solid white, the AI's is outlined. The icon
   inside each marker is what tells them apart, so the colour is not doing
   that job alone.
   ========================================================================== */

const BAND_LABELS = ['Refer', 'Not yet', 'Almost', 'Ready'];

const VOICE_META: Record<
  EpaSource,
  {
    label: string;
    icon: LucideIcon;
    /** The filled marker on the track and in the legend. */
    marker: string;
    /** Icon colour inside that marker. */
    glyph: string;
  }
> = {
  learner: {
    label: 'Learner',
    icon: User2,
    marker: 'bg-white',
    glyph: 'text-black',
  },
  tutor: {
    label: 'Tutor',
    icon: ShieldCheck,
    marker: 'bg-elec-yellow',
    glyph: 'text-black',
  },
  ai: {
    label: 'AI',
    icon: Bot,
    marker: 'border-2 border-white bg-elec-dark',
    glyph: 'text-white',
  },
  employer: {
    label: 'Employer',
    icon: User2,
    marker: 'border-2 border-elec-yellow bg-elec-dark',
    glyph: 'text-elec-yellow',
  },
};

const GRADE_LABEL: Record<string, string> = {
  distinction: 'Distinction',
  merit: 'Merit',
  pass: 'Pass',
  fail: 'Fail',
};

interface Voice {
  source: EpaSource;
  judgement: Pick<
    EpaJudgement,
    'verdict' | 'predicted_grade' | 'confidence' | 'source_name_snapshot'
  > | null;
  /** Synthetic from a mock — drawn, but dimmed and not counted as a verdict. */
  synthetic?: boolean;
  /** Optional override for label below */
  subtitle?: string | null;
}

export function EpaReadinessGauge({
  voices,
  cohort,
  headline,
  outlier = null,
  consensus = false,
}: {
  voices: Voice[];
  /** Optional cohort context for percentile + sparkline */
  cohort?: {
    percentileLabel: string | null;
    cohortSize: number;
    trajectory: number[];
  };
  /** The agreement line — "All three judges agree: Ready · Merit". */
  headline?: string;
  /** Which voice disagrees with the other two, if exactly one does. */
  outlier?: EpaSource | null;
  consensus?: boolean;
}) {
  const { settings } = useCollegeSettings();
  const bands = settings.epa_verdict_bands;
  const judgementToPosition = (j: Voice['judgement']): number | null =>
    epaJudgementPosition(j ?? null, bands);
  // Filter to voices we have something for
  const placed = voices
    .map((v) => ({ voice: v, position: judgementToPosition(v.judgement) }))
    .filter((p): p is { voice: Voice; position: number } => p.position !== null);

  // A verdict inferred from a mock is drawn so the tutor can see where the
  // learner's practice puts them, but it is NOT a recorded verdict and the
  // count must not say it is. The old "3/3 verdicts" counted it.
  const recorded = placed.filter((p) => !p.voice.synthetic).length;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-elec-yellow/35 px-4 py-4 sm:px-5',
        CARD_SURFACE
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-[13px] font-semibold text-white">Readiness</div>
          {cohort?.percentileLabel && cohort.cohortSize > 1 && (
            <span
              className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[10.5px] font-semibold text-white"
              title={`Cohort of ${cohort.cohortSize}`}
            >
              {cohort.percentileLabel} of cohort
            </span>
          )}
          {cohort && cohort.trajectory.length >= 2 && <Sparkline points={cohort.trajectory} />}
        </div>
        <div className="text-[12px] tabular-nums text-white">
          {recorded}/{voices.length} verdict{recorded === 1 ? '' : 's'}
        </div>
      </div>

      {/* Agreement line. Volt when one voice is the odd one out — that is
          the one thing here a tutor should act on. */}
      {headline && (
        <p
          className={cn(
            'mt-1 text-[12.5px] leading-snug',
            outlier && !consensus ? 'font-semibold text-elec-yellow' : 'text-white'
          )}
        >
          {headline}
        </p>
      )}

      {/* Track */}
      <div className="mt-4">
        <div className="relative h-14">
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/[0.10]" />
          {/* Tick marks at band boundaries */}
          {[25, 50, 75].map((x) => (
            <div
              key={x}
              className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-white/[0.25]"
              style={{ left: `${x}%` }}
              aria-hidden
            />
          ))}

          {/* Markers */}
          {placed.map((p, i) => {
            const meta = VOICE_META[p.voice.source];
            const Icon = meta.icon;
            // Stack offset if markers within 4% of each other
            const stack = placed.filter(
              (q, j) => j < i && Math.abs(q.position - p.position) < 4
            ).length;
            const offset = stack * 18;
            return (
              <div
                key={p.voice.source}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${p.position}%`,
                  transform: `translate(-50%, calc(-50% - ${offset}px))`,
                }}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.7)]',
                    meta.marker,
                    p.voice.synthetic && 'opacity-60'
                  )}
                  title={`${meta.label}: ${p.voice.judgement?.verdict?.replace('_', ' ')}${p.voice.judgement?.predicted_grade ? ` · ${p.voice.judgement.predicted_grade}` : ''}`}
                >
                  <Icon className={cn('h-3.5 w-3.5', meta.glyph)} strokeWidth={2.5} />
                </div>
                {/* Vertical line down to track */}
                <div
                  className={cn(
                    'absolute left-1/2 top-full w-px -translate-x-1/2 bg-white/[0.25]',
                    stack > 0 ? 'h-3' : 'h-2'
                  )}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        {/* Band labels under track */}
        <div className="mt-1 flex text-[11px] font-medium text-white">
          {BAND_LABELS.map((l) => (
            <div key={l} className="flex-1 text-center">
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Voice legend rows */}
      <ul className="mt-4 divide-y divide-white/[0.10]">
        {voices.map((v) => {
          const meta = VOICE_META[v.source];
          const Icon = meta.icon;
          const j = v.judgement;
          return (
            <li key={v.source} className="flex items-center gap-3 py-2.5">
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                  j ? meta.marker : 'border border-dashed border-white/[0.25]'
                )}
              >
                <Icon
                  className={cn('h-3.5 w-3.5', j ? meta.glyph : 'text-white')}
                  strokeWidth={2.5}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold tracking-tight text-white">
                    {meta.label}
                  </span>
                  {v.synthetic && (
                    <span className="inline-flex h-5 items-center rounded-md border border-white/[0.14] px-1.5 text-[10px] font-semibold text-white">
                      Inferred
                    </span>
                  )}
                  {j?.verdict && (
                    <span
                      className={cn(
                        'text-[12px] capitalize',
                        j.verdict === 'refer' ? 'font-semibold text-red-300' : 'text-white'
                      )}
                    >
                      {j.verdict.replace('_', ' ')}
                    </span>
                  )}
                  {j?.predicted_grade && (
                    <span className="text-[12px] font-semibold text-elec-yellow">
                      {GRADE_LABEL[j.predicted_grade] ?? j.predicted_grade}
                    </span>
                  )}
                </div>
                {v.subtitle && (
                  <div className="mt-0.5 text-[12px] leading-tight text-white">{v.subtitle}</div>
                )}
              </div>
              {j?.confidence != null && (
                <div className="flex shrink-0 items-center gap-2">
                  <div className="h-1.5 w-[60px] overflow-hidden rounded-full bg-white/[0.10]">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${j.confidence}%` }}
                    />
                  </div>
                  <span className="text-[12px] tabular-nums text-white">{j.confidence}%</span>
                </div>
              )}
              {!j && <span className="text-[12px] text-white">No verdict yet</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Sparkline — last few readiness positions
   ──────────────────────────────────────────────────────── */

function Sparkline({ points }: { points: number[] }) {
  const W = 80;
  const H = 18;
  const PAD = 1;
  const max = 100;
  const min = 0;
  const stepX = (W - PAD * 2) / Math.max(1, points.length - 1);
  const path = points
    .map((p, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - ((p - min) / (max - min)) * (H - PAD * 2);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const delta = last - prev;
  const TrendIcon = delta > 2 ? TrendingUp : delta < -2 ? TrendingDown : Minus;
  // Falling readiness is a real problem; rising is just the line.
  const trendTone = delta < -2 ? 'text-red-300' : 'text-white';
  return (
    <span
      className="inline-flex items-center gap-1 align-middle"
      title={`Trajectory across last ${points.length} verdicts`}
    >
      <svg width={W} height={H} className="overflow-visible">
        <path
          d={path}
          className="fill-none stroke-elec-yellow"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {points.map((p, i) => {
          const x = PAD + i * stepX;
          const y = H - PAD - ((p - min) / (max - min)) * (H - PAD * 2);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === points.length - 1 ? 1.8 : 1.1}
              className={i === points.length - 1 ? 'fill-elec-yellow' : 'fill-white/[0.25]'}
            />
          );
        })}
      </svg>
      <TrendIcon className={cn('h-3 w-3', trendTone)} strokeWidth={2.5} />
    </span>
  );
}
