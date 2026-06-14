import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  RotateCw,
  ChevronRight,
  Calendar,
  Eye,
  MessageSquare,
  StickyNote,
  Clock,
  BookOpen,
  Target,
  CalendarCheck,
  Shield,
  Sparkles,
  CircleArrowUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useAiNextBestAction,
  type ActionKind,
  type ActionPriority,
  type NextAction,
} from '@/hooks/useAiNextBestAction';

/* ==========================================================================
   SectionNextBestAction — the killer Student 360 feature.

   Tutor opens a learner → AI reads cross-hub data → returns the 3-5
   highest-leverage things to do today. Each action has a one-tap shortcut
   that opens the right sheet/dialog/route.
   ========================================================================== */

interface Props {
  id: string;
  studentId: string;
  studentName: string;
  /** Triggered when the tutor taps an action — parent decides what to open */
  onAction: (action: NextAction) => void;
}

const KIND_ICON: Record<ActionKind, typeof Calendar> = {
  schedule_one_to_one: Calendar,
  log_observation: Eye,
  send_message: MessageSquare,
  add_pastoral_note: StickyNote,
  log_otj: Clock,
  review_portfolio: BookOpen,
  edit_ilp: Target,
  add_ilp_goal: Target,
  log_attendance: CalendarCheck,
  add_evidence: BookOpen,
  escalate_safeguarding: Shield,
  praise: Sparkles,
  other: CircleArrowUp,
};

const KIND_LABEL: Record<ActionKind, string> = {
  schedule_one_to_one: 'Schedule 1-2-1',
  log_observation: 'Record observation',
  send_message: 'Send message',
  add_pastoral_note: 'Add note',
  log_otj: 'Log OTJ',
  review_portfolio: 'Review portfolio',
  edit_ilp: 'Edit ILP',
  add_ilp_goal: 'Add ILP goal',
  log_attendance: 'Log attendance',
  add_evidence: 'Add evidence',
  escalate_safeguarding: 'Escalate to DSL',
  praise: 'Send praise',
  other: 'Open',
};

const PRIORITY_DOT: Record<ActionPriority, string> = {
  high: 'bg-red-400',
  medium: 'bg-elec-yellow',
  low: 'bg-white/40',
};

const PRIORITY_LABEL: Record<ActionPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function SectionNextBestAction({ id, studentId, studentName, onAction }: Props) {
  const ai = useAiNextBestAction();

  // Reset state when the learner changes — but DO NOT auto-fire. Tutor must
  // press the button so we don't burn AI tokens on every page load.
  useEffect(() => {
    ai.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const handleRefresh = () => {
    void ai.compute(studentId);
  };

  return (
    <section id={id} className="scroll-mt-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            AI Next Best Action
          </div>
          <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            What to do for {studentName.split(' ')[0]}
          </h2>
        </div>
        {ai.status === 'done' && (
          <button
            type="button"
            onClick={handleRefresh}
            className="text-[12px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation no-print inline-flex items-center gap-1.5"
          >
            <RotateCw className="h-3 w-3" />
            Refresh
          </button>
        )}
      </div>

      <div className="mt-5">
        {ai.status === 'idle' && (
          <button
            type="button"
            onClick={handleRefresh}
            className="w-full rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-5 py-6 text-left hover:border-white/[0.18] transition-colors touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/[0.04] flex-shrink-0">
                <Wand2 className="h-5 w-5 text-elec-yellow" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-white">
                  Get AI's prioritised next actions
                </div>
                <div className="mt-0.5 text-[12px] text-white/85">
                  Reads risk, OTJ, attendance, portfolio, observations, ILP — returns the 3-5 highest-leverage things to do today.
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/70 flex-shrink-0" />
            </div>
          </button>
        )}

        {ai.status === 'streaming' && <StreamingState studentName={studentName} />}
        {ai.status === 'error' && <ErrorState message={ai.error} onRetry={handleRefresh} />}
        {ai.status === 'done' && ai.plan && (
          <DoneState plan={ai.plan} onAction={onAction} onRefresh={handleRefresh} />
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function StreamingState({ studentName }: { studentName: string }) {
  const [stepIdx, setStepIdx] = useState(0);
  const steps = [
    'Reading risk signals…',
    'Checking AC coverage gaps…',
    'Reviewing OTJ this week…',
    'Scanning portfolio submissions…',
    'Looking at recent observations…',
    'Cross-referencing ILP goals…',
    'Prioritising actions…',
  ];

  useEffect(() => {
    const t = setInterval(() => setStepIdx((i) => (i + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative rounded-2xl border border-elec-yellow/[0.18] bg-[hsl(0_0%_12%)] overflow-hidden">
      {/* Top shimmer bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent"
        style={{ animation: 'nbaShimmer 1.4s ease-in-out infinite' }}
      />
      {/* Soft amber glow under header */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-elec-yellow/[0.04] to-transparent pointer-events-none" />
      <style>{`
        @keyframes nbaShimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }
        @keyframes nbaPulse { 0%,100% { opacity: 0.5; transform: scale(1) } 50% { opacity: 1; transform: scale(1.06) } }
        @keyframes nbaSpin { from { transform: rotate(0) } to { transform: rotate(360deg) } }
      `}</style>

      <div className="relative px-5 py-7">
        {/* Header — spinning icon + clear AI message */}
        <div className="flex items-start gap-3.5">
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-xl bg-elec-yellow/30 blur-lg"
              style={{ animation: 'nbaPulse 1.6s ease-in-out infinite' }}
            />
            <div className="relative p-2.5 rounded-xl bg-elec-yellow/15 border border-elec-yellow/[0.25]">
              <Wand2
                className="h-5 w-5 text-elec-yellow"
                strokeWidth={2}
                style={{ animation: 'nbaSpin 4s linear infinite' }}
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13.5px] font-semibold text-white">
              AI is analysing {studentName.split(' ')[0]}'s data…
            </div>
            <div className="mt-1 h-[18px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="text-[12px] text-white/85 leading-tight"
                >
                  {steps[stepIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex-shrink-0 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-elec-yellow/[0.08] border border-elec-yellow/[0.18]">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
              Live
            </span>
          </div>
        </div>

        {/* Skeleton rows — slower & softer */}
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-pulse"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <div className="h-8 w-8 rounded-xl bg-white/[0.04] flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div
                  className="h-3 rounded bg-white/[0.05]"
                  style={{ width: `${60 + (i % 3) * 12}%` }}
                />
                <div
                  className="h-2 rounded bg-white/[0.03]"
                  style={{ width: `${40 + (i % 3) * 8}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/[0.04] text-[10.5px] text-white/55 tabular-nums">
          Usually takes 5–10 seconds
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-red-500/[0.2] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-red-500/15 flex-shrink-0">
        <X className="h-4 w-4 text-red-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] font-semibold text-white">Couldn't compute actions</div>
        <p className="mt-0.5 text-[11.5px] text-white/85">{message ?? 'Try again'}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation inline-flex items-center gap-1.5"
      >
        <RotateCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}

function DoneState({
  plan,
  onAction,
  onRefresh,
}: {
  plan: { summary: string; actions: NextAction[] };
  onAction: (action: NextAction) => void;
  onRefresh: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
      {/* Summary header */}
      {plan.summary && (
        <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.015]">
          <p className="text-[12.5px] text-white/85 leading-snug">
            <span className="text-white/55">→ </span>
            {plan.summary}
          </p>
        </div>
      )}

      {/* Action list */}
      <ul className="divide-y divide-white/[0.04]">
        <AnimatePresence initial={false}>
          {plan.actions.map((action, i) => {
            const Icon = KIND_ICON[action.kind] ?? KIND_ICON.other;
            const ctaLabel = KIND_LABEL[action.kind] ?? KIND_LABEL.other;
            return (
              <motion.li
                key={`${action.kind}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => onAction(action)}
                  className="w-full px-5 py-4 text-left hover:bg-white/[0.02] transition-colors touch-manipulation flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-white/[0.04] flex-shrink-0">
                    <Icon className="h-4 w-4 text-elec-yellow" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        aria-hidden
                        className={cn(
                          'inline-block h-1.5 w-1.5 rounded-full',
                          PRIORITY_DOT[action.priority]
                        )}
                      />
                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/85">
                        {PRIORITY_LABEL[action.priority]}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                        · {ctaLabel}
                      </span>
                    </div>
                    <h3 className="mt-1 text-[14px] font-semibold text-white leading-tight">
                      {action.title}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-white/85 leading-snug">{action.why}</p>
                    {action.detail && (
                      <p className="mt-1 text-[11px] text-white/85 leading-snug">{action.detail}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/35 flex-shrink-0 mt-2" />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.015] flex items-center justify-between">
        <span className="text-[10.5px] text-white/85 tabular-nums">
          {plan.actions.length} suggestion{plan.actions.length === 1 ? '' : 's'} from AI · review and act
        </span>
        <button
          type="button"
          onClick={onRefresh}
          className="text-[10.5px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation inline-flex items-center gap-1"
        >
          <RotateCw className="h-3 w-3" />
          Refresh
        </button>
      </div>
    </div>
  );
}
