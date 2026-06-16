/**
 * AM2ReadinessDashboard
 *
 * Replaces the prior cyan-themed stacked-cards layout with the apprentice
 * hub design pattern: yellow accents, connected-grid mode cards, and a
 * wider container so the page works on desktop without wasting screen.
 *
 * Sections (top → bottom):
 *   1. Hero — Am2ReadinessRing (session-based score, explainable bands,
 *      exam-date chip, timed-mock CTA)
 *   2. Recalculate + last-calculated stamp
 *   3. Risk banner
 *   4. Connected-grid of 4 mode cards — matches /apprentice/hub style:
 *      yellow "01 · TESTING" eyebrow row, alert pill when score is low,
 *      score / attempts / weight in the footer row, "Open →" CTA
 *   5. Priority gaps (when present)
 *   6. History link footer
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ArrowRight,
  Clock,
  BookOpenCheck,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Am2ReadinessRing } from '@/components/apprentice/am2/Am2ReadinessRing';
import { AM2JourneyPanel } from './AM2JourneyPanel';
import {
  useAM2Readiness,
  type AM2ReadinessStatus,
  type AM2Component,
} from '@/hooks/am2/useAM2Readiness';

interface AM2ReadinessDashboardProps {
  onNavigateToTab: (tab: string) => void;
}

const RISK_CONFIG = {
  high: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-300',
    label: 'High risk of underperforming',
    description: 'Significant gaps in key assessment areas — focus on the priorities below.',
    icon: ShieldAlert,
  },
  moderate: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    label: 'Moderate risk',
    description: 'Some areas need attention before you book your AM2.',
    icon: AlertTriangle,
  },
  low: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    label: 'Likely competent',
    description: "All sections at 70%+ — you're showing competence across AM2 areas.",
    icon: ShieldCheck,
  },
};

/* Mode-card metadata. Order matches the AM2 assessment-weighting order so
   the highest-weighted area surfaces first. */
const MODE_CARDS: Array<{
  componentKey: string;
  eyebrow: string;
  title: string;
  description: string;
  tab: string;
}> = [
  {
    componentKey: 'testingSequence',
    eyebrow: 'Testing',
    title: 'Testing sequence',
    description:
      'Run through the AM2 testing order — continuity, IR, polarity, Zs, RCD. Get it right end-to-end.',
    tab: 'testing',
  },
  {
    componentKey: 'faultDiagnosis',
    eyebrow: 'Faults',
    title: 'Fault diagnosis',
    description: 'Work through fault scenarios on each circuit type. Logic, isolation, recovery.',
    tab: 'faults',
  },
  {
    componentKey: 'safeIsolation',
    eyebrow: 'Isolation',
    title: 'Safe isolation',
    description:
      'Practise the 8-step safe-isolation procedure. AM2 will fail you instantly on this — get it perfect.',
    tab: 'safe-isolation',
  },
  {
    componentKey: 'knowledgeAssessment',
    eyebrow: 'Knowledge',
    title: 'Knowledge test',
    description:
      'BS 7671, health & safety, building regs. 400-question bank with weak-topic feedback.',
    tab: 'knowledge',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
};

export function AM2ReadinessDashboard({ onNavigateToTab }: AM2ReadinessDashboardProps) {
  const { data, isLoading, recalculate } = useAM2Readiness();

  // 8 cards is too many for AM2, 4 is the right shape. Compose them from
  // MODE_CARDS + the live component scores so the grid always shows real
  // numbers, not "Not started" boilerplate.
  const cards = useMemo(() => {
    if (!data) return [];
    return MODE_CARDS.map((m, i) => {
      const comp = data.components[m.componentKey];
      return { ...m, index: i, comp };
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-16 px-4 justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">Calculating readiness…</p>
          <p className="text-xs text-white/60 mt-1">Analysing simulation results</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center space-y-4">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-elec-yellow/10 flex items-center justify-center">
          <ShieldAlert className="h-8 w-8 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">AM2 readiness</h2>
          <p className="text-sm text-white/60 mt-1">
            Complete simulations to build your readiness score and identify practical gaps before
            you book.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTab('safe-isolation')}
          className="h-11 px-6 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-95 transition-transform"
        >
          Start safe isolation
        </button>
      </div>
    );
  }

  const riskConfig = RISK_CONFIG[data.riskLevel];
  const RiskIcon = riskConfig.icon;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-5"
    >
      {/* Hero — session-based readiness ring with explainable bands,
          exam-date chip and the timed-mock CTA. The per-mode component
          scores still drive the risk banner + mode cards below. */}
      <motion.div variants={fadeUp} className="flex flex-col items-center pt-2">
        <Am2ReadinessRing onRunMock={() => onNavigateToTab('mock-day')} />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={recalculate}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/70 hover:text-white touch-manipulation h-8 px-2.5 rounded-full hover:bg-white/[0.04] transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Recalculate
          </button>
          <span className="text-[10.5px] text-white/40 tabular-nums">
            Last{' '}
            {data.calculatedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </motion.div>

      {/* Risk banner */}
      <motion.div
        variants={fadeUp}
        className={cn(
          'p-4 sm:p-5 rounded-2xl border flex items-start gap-3',
          riskConfig.bg,
          riskConfig.border
        )}
      >
        <RiskIcon className={cn('h-5 w-5 shrink-0 mt-0.5', riskConfig.text)} />
        <div className="min-w-0">
          <p className={cn('text-[13.5px] font-semibold', riskConfig.text)}>{riskConfig.label}</p>
          <p className="text-[12px] text-white/70 mt-0.5 leading-relaxed">
            {riskConfig.description}
          </p>
        </div>
      </motion.div>

      {/* Journey panel — target date + streak + projection. Sits below the
          risk banner because it depends on having a sense of risk first. */}
      <motion.div variants={fadeUp}>
        <AM2JourneyPanel />
      </motion.div>

      {/* Mode cards — connected grid, matches /apprentice/hub */}
      <motion.div variants={fadeUp} className="space-y-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Practical modes · take any in any order
        </div>
        <div
          className={cn(
            // Default `align-items: stretch` keeps same-row cards equal-
            // height; natural row size means content drives the height
            // and the footer can never clip.
            'relative grid gap-[2px]',
            'bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
            'grid-cols-1 sm:grid-cols-2'
          )}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
          {cards.map((c) => (
            <ModeCard
              key={c.componentKey}
              index={c.index}
              eyebrow={c.eyebrow}
              title={c.title}
              description={c.description}
              comp={c.comp}
              onTap={() => onNavigateToTab(c.tab)}
            />
          ))}
        </div>
      </motion.div>

      {/* Priority gaps */}
      {data.gaps.length > 0 && (
        <motion.div variants={fadeUp} className="space-y-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Priority areas · in order
          </div>
          <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden divide-y divide-white/[0.04]">
            {data.gaps.slice(0, 4).map((gap, i) => {
              const priorityTone =
                gap.priority === 'high'
                  ? 'text-red-300'
                  : gap.priority === 'medium'
                    ? 'text-amber-300'
                    : 'text-blue-300';
              return (
                <li key={i} className="p-4 sm:p-5 flex items-start gap-3">
                  <span
                    className={cn(
                      'h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 bg-white/[0.04] border border-white/[0.06] mt-0.5',
                      priorityTone
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <p className="text-[13.5px] font-semibold text-white">{gap.area}</p>
                      <span
                        className={cn(
                          'text-[9.5px] font-semibold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded border',
                          priorityTone,
                          gap.priority === 'high'
                            ? 'border-red-400/30 bg-red-500/[0.08]'
                            : gap.priority === 'medium'
                              ? 'border-amber-400/30 bg-amber-500/[0.08]'
                              : 'border-blue-400/30 bg-blue-500/[0.08]'
                        )}
                      >
                        {gap.priority}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/65 mt-1 leading-snug">{gap.description}</p>
                    <p className="text-[12px] text-white/85 mt-1.5 font-medium leading-snug">
                      → {gap.action}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      {/* Mock AM2 day — the killer practice mode. Strings all four
          simulators into one timed session matching the real exam order.
          Yellow-accented to stand out from the per-mode cards above. */}
      <motion.div variants={fadeUp}>
        <button
          type="button"
          onClick={() => onNavigateToTab('mock-day')}
          className="group w-full text-left rounded-2xl border border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/[0.06] to-elec-yellow/[0.02] hover:from-elec-yellow/[0.10] hover:to-elec-yellow/[0.04] transition-colors p-5 sm:p-6 touch-manipulation flex items-start gap-4"
        >
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-elec-yellow/[0.12] border border-elec-yellow/30 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6 text-elec-yellow" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              Killer practice · all four phases
            </div>
            <h3 className="mt-1.5 text-[18px] sm:text-[20px] font-semibold text-white tracking-tight group-hover:text-elec-yellow transition-colors">
              Mock AM2 day
            </h3>
            <p className="mt-1.5 text-[12.5px] text-white/70 leading-relaxed max-w-md">
              The closest in-app practice to a real AM2 day. Safe isolation → testing → faults →
              knowledge in sequence, with per-phase timing and a combined result.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-elec-yellow">
              Start the day
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </motion.div>

      {/* Adaptive drill — the spaced-repetition loop. Pulls the apprentice's
          weakest regs first based on am2_reg_attempts history. Only shows
          something useful once they've answered some BS 7671 questions —
          the empty state handles that case. Yellow-accented like the
          Mock day because both are "killer practice" surfaces. */}
      <motion.div variants={fadeUp}>
        <button
          type="button"
          onClick={() => onNavigateToTab('drill')}
          className="group w-full text-left rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.05] to-elec-yellow/[0.01] hover:from-elec-yellow/[0.08] hover:to-elec-yellow/[0.02] transition-colors p-5 sm:p-6 touch-manipulation flex items-start gap-4"
        >
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-elec-yellow/[0.10] border border-elec-yellow/25 flex items-center justify-center shrink-0">
            <Target className="h-6 w-6 text-elec-yellow" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              Adaptive · personalised today
            </div>
            <h3 className="mt-1.5 text-[18px] sm:text-[20px] font-semibold text-white tracking-tight group-hover:text-elec-yellow transition-colors">
              Drill your weakest regs
            </h3>
            <p className="mt-1.5 text-[12.5px] text-white/70 leading-relaxed max-w-md">
              Spaced repetition with a twist — regs you got wrong while certain come back fastest.
              8 questions, ranked by what'll move the needle for you today.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-elec-yellow">
              Start the drill
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </motion.div>

      {/* BS 7671 spot check — RAG-backed mini quiz pulling real regs from
          bs7671_facets. Sits between the killer practice (Mock AM2 day)
          and the lower-priority history link. */}
      <motion.div variants={fadeUp}>
        <button
          type="button"
          onClick={() => onNavigateToTab('bs7671')}
          className="group w-full text-left inline-flex items-start justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-white/[0.02] hover:border-elec-yellow/30 transition-colors p-4 sm:p-5 touch-manipulation"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/20 flex items-center justify-center shrink-0">
              <BookOpenCheck className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                Live from BS 7671
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white">BS 7671 spot check</div>
              <div className="mt-1 text-[11.5px] text-white/55 leading-snug max-w-md">
                8 quick questions pulled fresh from the actual regulations — every answer cites the
                reg you'll need to know.
              </div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-elec-yellow/70 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>

      {/* History link */}
      <motion.div variants={fadeUp}>
        <button
          type="button"
          onClick={() => onNavigateToTab('history')}
          className="w-full inline-flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:bg-white/[0.02] transition-colors p-4 sm:p-5 touch-manipulation"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Clock className="h-4 w-4 text-white/55 shrink-0" />
            <div className="min-w-0 text-left">
              <div className="text-[13px] font-semibold text-white">Session history</div>
              <div className="text-[11.5px] text-white/55 leading-snug">
                Every simulator run with score, components and time.
              </div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-elec-yellow/70 shrink-0" />
        </button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-[10px] text-white/40 text-center px-2">
        AM2-style simulation to identify practical gaps. Not affiliated with or endorsed by any
        awarding organisation.
      </motion.p>
    </motion.div>
  );
}

/* --- Mode card — apprentice-hub matched. -------------------------------- */

function ModeCard({
  index,
  eyebrow,
  title,
  description,
  comp,
  onTap,
}: {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  comp: AM2Component | undefined;
  onTap: () => void;
}) {
  const score = comp?.score ?? 0;
  const attempts = comp?.attempts ?? 0;
  const weight = comp ? Math.round(comp.weight * 100) : 0;
  const notStarted = score === 0 && attempts === 0;
  const lowScore = !notStarted && score < 50;
  const greatScore = score >= 70;

  const scoreTone = notStarted
    ? 'text-white/45'
    : score >= 70
      ? 'text-emerald-300'
      : score >= 50
        ? 'text-amber-300'
        : 'text-red-300';

  const statusLabel = notStarted
    ? 'Not started'
    : score >= 70
      ? 'On track'
      : score >= 50
        ? 'Catching up'
        : 'Needs work';

  return (
    <button
      type="button"
      onClick={onTap}
      className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 text-left touch-manipulation flex flex-col h-full min-h-[300px] sm:min-h-[320px] lg:min-h-[340px]"
    >
      {/* Top — eyebrow + status pill. flex-wrap so a long status doesn't
          shove the eyebrow off-screen on narrow widths. */}
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · {eyebrow}
          </span>
        </div>
        {lowScore && (
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded">
            Action
          </span>
        )}
        {greatScore && (
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300 border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            70%+
          </span>
        )}
      </div>

      <h3 className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
        {title}
      </h3>
      {/* Description — drop the max-w and constrain by line count instead.
          Two lines on mobile, three on desktop keeps the card tidy
          without ever clipping a sentence half-way through a word. */}
      <p className="mt-2 text-[12.5px] leading-relaxed text-white/65 line-clamp-3">
        {description}
      </p>

      <div className="flex-grow min-h-[8px]" />

      {/* Score bar */}
      <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full',
            score >= 70
              ? 'bg-emerald-400'
              : score >= 50
                ? 'bg-amber-400'
                : score > 0
                  ? 'bg-red-400'
                  : 'bg-white/20'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Footer — stacks vertically so the Open CTA is anchored to a
          dedicated line and can never get clipped by long metadata.
          On wider cards (lg+) we go inline since there's room. */}
      <div className="mt-3 pt-3 border-t border-white/[0.05] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <span className="text-[11px] text-white/55 tabular-nums leading-tight">
          <span className={cn('font-semibold', scoreTone)}>{notStarted ? '—' : `${score}%`}</span>
          <span className="mx-1.5 text-white/25">·</span>
          {statusLabel}
          <span className="mx-1.5 text-white/25">·</span>
          {weight}% weight
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-elec-yellow shrink-0 self-start lg:self-auto">
          Open
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </button>
  );
}

export default AM2ReadinessDashboard;
