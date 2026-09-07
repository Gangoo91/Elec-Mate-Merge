import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  useAiNextBestAction,
  type ActionKind,
  type ActionPriority,
  type NextAction,
} from '@/hooks/useAiNextBestAction';

/* ==========================================================================
   SectionNextBestAction — the first card on a learner's page.

   Tutor opens a learner → AI reads cross-hub data → returns the 3-5
   highest-leverage things to do today. Each row is a one-tap shortcut that
   opens the right sheet/dialog/route (the parent decides which).

   Rebuilt in the hub language: HubSectionHeading, one CARD_SURFACE card,
   HubWorkList-style rows (rule + words + chevron). The icon boxes, the
   amber glow and the shimmer bar went — a row of glowing wand icons is the
   single most recognisable "AI made this" tell, and none of it told the
   tutor anything the words didn't.
   ========================================================================== */

interface Props {
  id: string;
  studentId: string;
  studentName: string;
  /** Triggered when the tutor taps an action — parent decides what to open */
  onAction: (action: NextAction) => void;
}

const KIND_LABEL: Record<ActionKind, string> = {
  schedule_one_to_one: 'Schedule 1-2-1',
  log_observation: 'Record observation',
  send_message: 'Send message',
  add_pastoral_note: 'Add note',
  log_otj: 'Log off-the-job',
  review_portfolio: 'Review portfolio',
  edit_ilp: 'Edit ILP',
  add_ilp_goal: 'Add ILP goal',
  log_attendance: 'Log attendance',
  add_evidence: 'Add evidence',
  escalate_safeguarding: 'Escalate to DSL',
  praise: 'Send praise',
  other: 'Open',
};

const PRIORITY_LABEL: Record<ActionPriority, string> = {
  high: 'High priority',
  medium: 'Medium',
  low: 'Low',
};

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';

export function SectionNextBestAction({ id, studentId, studentName, onAction }: Props) {
  const ai = useAiNextBestAction();
  const first = studentName.split(' ')[0];

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
    <section id={id} className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Next best action</HubSectionHeading>
        {ai.status === 'done' && (
          <button type="button" onClick={handleRefresh} className={ACTION_BTN}>
            Refresh
          </button>
        )}
      </div>

      {ai.status === 'idle' && (
        <button
          type="button"
          onClick={handleRefresh}
          className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full flex-row items-center gap-3 px-4 py-4 sm:px-5')}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold leading-tight text-white group-hover:text-elec-yellow">
              What should you do for {first} today?
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-white">
              Reads risk, off-the-job, attendance, portfolio, observations and the ILP, then
              returns the three to five highest-leverage actions.
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
        </button>
      )}

      {ai.status === 'streaming' && <StreamingState first={first} />}
      {ai.status === 'error' && <ErrorState message={ai.error} onRetry={handleRefresh} />}
      {ai.status === 'done' && ai.plan && (
        <DoneState plan={ai.plan} onAction={onAction} onRefresh={handleRefresh} />
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function StreamingState({ first }: { first: string }) {
  const [stepIdx, setStepIdx] = useState(0);
  const steps = [
    'Reading risk signals…',
    'Checking AC coverage gaps…',
    'Reviewing off-the-job this week…',
    'Scanning portfolio submissions…',
    'Looking at recent observations…',
    'Cross-referencing ILP goals…',
    'Prioritising actions…',
  ];

  useEffect(() => {
    const t = setInterval(() => setStepIdx((i) => (i + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-elec-yellow/35 px-4 py-5 sm:px-5',
        CARD_SURFACE
      )}
    >
      <div className="text-[14px] font-semibold text-white">Analysing {first}'s record…</div>
      <div className="relative mt-1 h-[18px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="text-[12px] leading-tight text-elec-yellow"
          >
            {steps[stepIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 animate-pulse"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <div className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.12]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 rounded bg-white/[0.08]" style={{ width: `${60 + (i % 3) * 12}%` }} />
              <div className="h-2 rounded bg-white/[0.05]" style={{ width: `${40 + (i % 3) * 8}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/[0.10] pt-3 text-[11px] tabular-nums text-white">
        Usually takes 5–10 seconds
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-red-400/30 px-4 py-3 sm:px-5',
        CARD_SURFACE
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-white">Couldn't compute actions</div>
        <p className="mt-0.5 text-[12px] text-white">{message ?? 'Try again'}</p>
      </div>
      <button type="button" onClick={onRetry} className={cn(ACTION_BTN, '-my-0')}>
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
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      {plan.summary && (
        <div className="border-b border-white/[0.10] px-4 py-3 sm:px-5">
          <p className="text-[12.5px] leading-snug text-white">{plan.summary}</p>
        </div>
      )}

      <ul className="divide-y divide-white/[0.10]">
        <AnimatePresence initial={false}>
          {plan.actions.map((action, i) => {
            const urgent = action.priority === 'high';
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
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 h-8 w-[3px] shrink-0 rounded-full',
                      urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block text-[11px] font-semibold',
                        urgent ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {PRIORITY_LABEL[action.priority]} · {KIND_LABEL[action.kind] ?? KIND_LABEL.other}
                    </span>
                    <span className="mt-0.5 block text-[14px] font-semibold leading-tight text-white">
                      {action.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white">
                      {action.why}
                    </span>
                    {action.detail && (
                      <span className="mt-1 block text-[11.5px] leading-snug text-white">
                        {action.detail}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.10] px-4 py-2 sm:px-5">
        <span className="text-[11px] tabular-nums text-white">
          {plan.actions.length} suggestion{plan.actions.length === 1 ? '' : 's'} from AI — review
          before acting
        </span>
        <button type="button" onClick={onRefresh} className={cn(ACTION_BTN, '-my-0')}>
          Refresh
        </button>
      </div>
    </div>
  );
}
