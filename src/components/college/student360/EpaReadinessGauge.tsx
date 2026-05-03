import { cn } from '@/lib/utils';
import { User2, ShieldCheck, Bot, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { EpaJudgement, EpaSource } from '@/hooks/useEpaReadiness';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { epaJudgementPosition } from '@/lib/epaBands';

/* ==========================================================================
   EpaReadinessGauge — unified visualisation of every voice's verdict on a
   single readiness scale.

   Maps verdict → band start, confidence → position within the band:
     refer    →  0–25
     not_yet  → 25–50
     almost   → 50–75
     ready    → 75–100

   Each voice (Learner / Tutor / AI / Employer) becomes a marker on the track.
   Markers stack visually if they cluster.
   ========================================================================== */

const BAND_LABELS = ['Refer', 'Not yet', 'Almost', 'Ready'];

const VOICE_META: Record<
  EpaSource,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    colour: string;
    ring: string;
    bg: string;
    border: string;
  }
> = {
  learner: {
    label: 'Learner',
    icon: User2,
    colour: 'text-blue-200',
    ring: 'ring-blue-400/60',
    bg: 'bg-blue-500',
    border: 'border-blue-400/60',
  },
  tutor: {
    label: 'Tutor',
    icon: ShieldCheck,
    colour: 'text-elec-yellow',
    ring: 'ring-elec-yellow/60',
    bg: 'bg-elec-yellow',
    border: 'border-elec-yellow/60',
  },
  ai: {
    label: 'AI',
    icon: Bot,
    colour: 'text-purple-200',
    ring: 'ring-purple-400/60',
    bg: 'bg-purple-400',
    border: 'border-purple-400/60',
  },
  employer: {
    label: 'Employer',
    icon: User2,
    colour: 'text-emerald-200',
    ring: 'ring-emerald-400/60',
    bg: 'bg-emerald-400',
    border: 'border-emerald-400/60',
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
  /** Synthetic from a mock — counts visually but smaller marker */
  synthetic?: boolean;
  /** Optional override for label below */
  subtitle?: string | null;
}

export function EpaReadinessGauge({
  voices,
  cohort,
}: {
  voices: Voice[];
  /** Optional cohort context for percentile + sparkline */
  cohort?: {
    percentileLabel: string | null;
    cohortSize: number;
    trajectory: number[];
  };
}) {
  const { settings } = useCollegeSettings();
  const bands = settings.epa_verdict_bands;
  const judgementToPosition = (j: Voice['judgement']): number | null =>
    epaJudgementPosition(j ?? null, bands);
  // Filter to voices we have something for
  const placed = voices
    .map((v) => ({ voice: v, position: judgementToPosition(v.judgement) }))
    .filter((p): p is { voice: Voice; position: number } => p.position !== null);

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Readiness gauge
          </div>
          {cohort?.percentileLabel && cohort.cohortSize > 1 && (
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[9.5px] font-semibold tracking-[0.06em] uppercase',
                cohort.percentileLabel.startsWith('Top 25')
                  ? 'bg-emerald-500/[0.12] border-emerald-400/40 text-emerald-200'
                  : cohort.percentileLabel.startsWith('Top 50')
                    ? 'bg-amber-500/[0.12] border-amber-400/40 text-amber-200'
                    : 'bg-orange-500/[0.10] border-orange-400/30 text-orange-200'
              )}
              title={`Cohort of ${cohort.cohortSize}`}
            >
              {cohort.percentileLabel}
            </span>
          )}
          {cohort && cohort.trajectory.length >= 2 && <Sparkline points={cohort.trajectory} />}
        </div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">
          {placed.length}/{voices.length} verdict{placed.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Track */}
      <div className="mt-5">
        {/* Band background */}
        <div className="relative h-14">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full overflow-hidden flex">
            <div className="flex-1 bg-red-500/[0.14]" />
            <div className="flex-1 bg-orange-500/[0.14]" />
            <div className="flex-1 bg-amber-500/[0.14]" />
            <div className="flex-1 bg-emerald-500/[0.14]" />
          </div>
          {/* Tick marks at band boundaries */}
          {[25, 50, 75].map((x) => (
            <div
              key={x}
              className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/[0.14]"
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
                    'h-7 w-7 rounded-full ring-2 flex items-center justify-center shadow-lg shadow-black/40',
                    meta.bg,
                    meta.ring,
                    p.voice.synthetic && 'opacity-60'
                  )}
                  title={`${meta.label}: ${p.voice.judgement?.verdict?.replace('_', ' ')}${p.voice.judgement?.predicted_grade ? ` · ${p.voice.judgement.predicted_grade}` : ''}`}
                >
                  <Icon className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
                </div>
                {/* Verdical line down to track */}
                <div
                  className={cn(
                    'absolute left-1/2 top-full -translate-x-1/2 w-px bg-white/15',
                    stack > 0 ? 'h-3' : 'h-2'
                  )}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        {/* Band labels under track */}
        <div className="mt-1 flex text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/55">
          {BAND_LABELS.map((l, i) => (
            <div
              key={l}
              className={cn(
                'flex-1 text-center',
                i === 0 && 'text-red-300/85',
                i === 1 && 'text-orange-300/85',
                i === 2 && 'text-amber-300/85',
                i === 3 && 'text-emerald-300/85'
              )}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Voice legend rows */}
      <div className="mt-5 space-y-2">
        {voices.map((v) => {
          const meta = VOICE_META[v.source];
          const Icon = meta.icon;
          const j = v.judgement;
          return (
            <div key={v.source} className="flex items-center gap-3">
              <div
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0',
                  j ? meta.bg : 'bg-white/[0.04]',
                  j ? '' : 'border border-dashed border-white/[0.12]'
                )}
              >
                <Icon
                  className={cn('h-3.5 w-3.5', j ? 'text-black' : 'text-white/35')}
                  strokeWidth={2.5}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn('text-[12px] font-semibold tracking-tight', meta.colour)}>
                    {meta.label}
                  </span>
                  {v.synthetic && (
                    <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.06] border border-white/[0.12] text-[9px] font-semibold tracking-[0.06em] uppercase text-white/55">
                      Draft
                    </span>
                  )}
                  {j?.verdict && (
                    <span className="text-[11px] text-white/85 capitalize">
                      {j.verdict.replace('_', ' ')}
                    </span>
                  )}
                  {j?.predicted_grade && (
                    <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
                      {GRADE_LABEL[j.predicted_grade] ?? j.predicted_grade}
                    </span>
                  )}
                </div>
                {v.subtitle && (
                  <div className="mt-0.5 text-[10.5px] text-white/45">{v.subtitle}</div>
                )}
              </div>
              {j?.confidence != null && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="h-1.5 w-[60px] rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        j.confidence >= 70
                          ? 'bg-emerald-400'
                          : j.confidence >= 40
                            ? 'bg-elec-yellow'
                            : 'bg-amber-400'
                      )}
                      style={{ width: `${j.confidence}%` }}
                    />
                  </div>
                  <span className="text-[10.5px] text-white/65 tabular-nums">{j.confidence}%</span>
                </div>
              )}
              {!j && <span className="text-[10.5px] text-white/35 italic">No verdict yet</span>}
            </div>
          );
        })}
      </div>
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
  const trendTone = delta > 2 ? 'text-emerald-300' : delta < -2 ? 'text-red-300' : 'text-white/55';
  return (
    <span
      className="inline-flex items-center gap-1 align-middle"
      title={`Trajectory across last ${points.length} verdicts`}
    >
      <svg width={W} height={H} className="overflow-visible">
        <path
          d={path}
          className="stroke-elec-yellow/85 fill-none"
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
              className={i === points.length - 1 ? 'fill-elec-yellow' : 'fill-elec-yellow/50'}
            />
          );
        })}
      </svg>
      <TrendIcon className={cn('h-3 w-3', trendTone)} strokeWidth={2.5} />
    </span>
  );
}
