import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  LEARNING_PATH,
  REFERENCE_TABLES,
  SAFE_ISOLATION_KEY,
  type LearningStep,
} from '@/data/itLearningPath';
import { STEP_CONTENT } from '@/data/itLearningContent';
import { useItHubProgress } from '@/hooks/useItHubProgress';
import type { LearningSection } from '../LearningHub';

/**
 * The Learn surface — ELE I&T hub redesign.
 *
 * Structured on the BS 7671 Reg 643 test order, which is not a teaching
 * convention: 643 requires the tests in 643.2 to 643.6 to be carried out in
 * that order and completed before the installation is energised. Learning the
 * hub therefore teaches the sequence the job is actually done in, and the order
 * the schedule of tests prints in.
 *
 * Each step expands where it stands rather than pushing a screen — the old hub
 * was four tiles, then a card list, then content, all on a phone.
 *
 * A step is completed by answering its questions correctly, NOT by a
 * "Mark as learned" button. Self-certification recorded a tap and taught
 * nothing; retrieval — being asked and having to produce the answer — is what
 * makes any of this stick, and it means the progress figure means something.
 */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5';

const headingCn = 'mb-3 text-[15px] font-semibold tracking-tight text-white';
const eyebrowCn = 'text-[11px] font-medium uppercase tracking-[0.18em] text-white';

/** Limits worth having in front of you while learning a given test. */
const REFERENCE_FOR_STEP: Record<string, string[]> = {
  'insulation-resistance': ['insulation'],
  'earth-fault-loop-impedance': ['zs-max', 'zs-site'],
  'rcd-operation': ['rcd'],
  'functional-testing': ['disconnection'],
};

interface StepRowProps {
  step: LearningStep;
  done: boolean;
  open: boolean;
  onToggleOpen: () => void;
  onComplete: (complete: boolean) => void;
}

const StepRow: React.FC<StepRowProps> = ({ step, done, open, onToggleOpen, onComplete }) => {
  const content = STEP_CONTENT[step.key];
  // Which option the learner picked for each question, by question index.
  const [picked, setPicked] = useState<Record<number, number>>({});

  const tables = (REFERENCE_FOR_STEP[step.key] ?? [])
    .map((k) => REFERENCE_TABLES.find((t) => t.key === k))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  /**
   * How far to rotate a question's options before showing them.
   *
   * Written naively, 16 of the 18 answers sat in the middle slot — a learner
   * notices that within three questions and stops reading the options, which
   * defeats the point of asking. Rotating by a value derived from the step and
   * question index spreads the correct answer evenly and keeps it spread as
   * questions are added, without anyone having to remember to shuffle them.
   *
   * It must be deterministic, not random: the rendered order has to be identical
   * on every re-render, or the index the learner tapped would stop matching the
   * option they saw.
   */
  const rotationFor = (qi: number, optionCount: number) =>
    (step.order + qi) % optionCount;

  /** The index in `question.options` that display position `j` is showing. */
  const sourceIndex = (j: number, qi: number, optionCount: number) =>
    (j + rotationFor(qi, optionCount)) % optionCount;

  const choose = (qi: number, displayIndex: number) => {
    const next = { ...picked, [qi]: displayIndex };
    setPicked(next);
    // Completion is earned: every question answered, every answer right.
    const allRight =
      content.questions.length > 0 &&
      content.questions.every((q, i) => {
        const chosen = next[i];
        if (chosen === undefined) return false;
        return sourceIndex(chosen, i, q.options.length) === q.answer;
      });
    if (allRight && !done) onComplete(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={onToggleOpen}
        aria-expanded={open}
        className="flex min-h-[3.75rem] w-full touch-manipulation items-center gap-3 p-4 text-left transition-colors active:bg-white/[0.04]"
      >
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold tabular-nums ${
            done
              ? 'bg-elec-yellow text-black'
              : 'border border-white/[0.18] bg-white/[0.06] text-white'
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : step.order === 0 ? '!' : step.order}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-medium text-white">{step.title}</span>
          <span className="mt-0.5 block text-[12px] text-white">{step.purpose}</span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && content && (
        <div className="space-y-5 border-t border-white/[0.08] bg-black/20 p-4">
          <p className="text-[12px] leading-relaxed text-white">{content.regulation}</p>

          <div>
            <p className={eyebrowCn}>Why it matters</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white">{content.why}</p>
          </div>

          <div>
            <p className={eyebrowCn}>How it&rsquo;s done</p>
            <ol className="mt-2 space-y-2">
              {content.how.map((line, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-white">
                  <span className="w-4 shrink-0 tabular-nums text-white">{i + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className={eyebrowCn}>Instrument</p>
            <p className="mt-1 text-[13px] text-white">{step.instrument}</p>
          </div>

          {/* A worked example with real figures — the difference between
              knowing the rule and being able to apply it on a board. */}
          <div className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-3">
            <p className={eyebrowCn}>Worked example</p>
            <p className="mt-1 text-[13px] font-medium text-white">{content.worked.title}</p>
            <div className="mt-2 space-y-1">
              {content.worked.lines.map((line, i) => (
                <p key={i} className="text-[13px] tabular-nums text-white">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-2 text-[13px] font-medium text-white">{content.worked.verdict}</p>
          </div>

          {tables.map((table) => (
            <div key={table.key}>
              <p className={eyebrowCn}>{table.title}</p>
              <div className="mt-1 space-y-1">
                {table.rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3 text-[13px]">
                    <span className="text-white">{row.label}</span>
                    <span className="font-semibold tabular-nums text-white">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-1 text-[11px] text-white">{table.source}</p>
            </div>
          ))}

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] p-3">
            <p className={eyebrowCn}>Where it goes wrong</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white">{step.watchOut}</p>
          </div>

          <div>
            <p className={eyebrowCn}>Check yourself</p>
            <p className="mt-1 text-[12px] text-white">
              Answer both correctly to complete this step.
            </p>

            <div className="mt-3 space-y-4">
              {content.questions.map((question, qi) => {
                const n = question.options.length;
                const answered = picked[qi] !== undefined;
                const correct =
                  answered && sourceIndex(picked[qi], qi, n) === question.answer;

                return (
                  <div key={qi}>
                    <p className="text-[13px] font-medium leading-relaxed text-white">
                      {question.q}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {Array.from({ length: n }, (_, j) => {
                        const oi = sourceIndex(j, qi, n);
                        const option = question.options[oi];
                        const chosen = picked[qi] === j;
                        const isAnswer = oi === question.answer;
                        return (
                          <button
                            key={j}
                            type="button"
                            onClick={() => choose(qi, j)}
                            className={`flex min-h-[2.75rem] w-full touch-manipulation items-center rounded-xl border px-3 py-2 text-left text-[13px] transition-colors ${
                              answered && isAnswer
                                ? 'border-emerald-500/40 bg-emerald-500/[0.12] text-white'
                                : chosen
                                  ? 'border-red-500/40 bg-red-500/[0.12] text-white'
                                  : 'border-white/[0.14] bg-white/[0.04] text-white active:bg-white/[0.08]'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {answered && (
                      <p className="mt-2 text-[12px] leading-relaxed text-white">
                        {correct ? '' : 'Not quite. '}
                        {question.explain}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface LearnPathProps {
  onNavigateToSection: (section: LearningSection) => void;
}

export const LearnPath: React.FC<LearnPathProps> = ({ onNavigateToSection }) => {
  const { completion, setStepComplete, completedCount } = useItHubProgress(LEARNING_PATH.length);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const isDone = (key: string) => (completion[key] ?? 0) >= 100;
  const total = LEARNING_PATH.length;
  const pct = Math.round((completedCount / total) * 100);

  const dead = LEARNING_PATH.filter((s) => s.phase === 'dead' && s.key !== SAFE_ISOLATION_KEY);
  const live = LEARNING_PATH.filter((s) => s.phase === 'live');
  const isolation = LEARNING_PATH.find((s) => s.key === SAFE_ISOLATION_KEY)!;

  const renderStep = (step: LearningStep) => (
    <StepRow
      key={step.key}
      step={step}
      done={isDone(step.key)}
      open={openKey === step.key}
      onToggleOpen={() => setOpenKey((k) => (k === step.key ? null : step.key))}
      onComplete={(complete) => void setStepComplete(step.key, complete)}
    />
  );

  return (
    <div className="space-y-6 px-4 py-4">
      <section className={cardCn}>
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-semibold tracking-tight text-white">Your progress</p>
          <p className="text-[13px] font-semibold tabular-nums text-white">
            {completedCount} of {total}
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.12]">
          <div
            className="h-full rounded-full bg-elec-yellow transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-[12px] text-white">
          {completedCount === 0
            ? 'Open a step, read it, then answer the questions to complete it.'
            : completedCount === total
              ? 'Every test covered and answered. Worth a run through the full question bank.'
              : 'Picks up where you left off, on any device.'}
        </p>
      </section>

      <section>
        <h2 className={headingCn}>Before anything else</h2>
        <div className="-mx-4 border-y border-red-500/30 bg-red-500/[0.12] sm:mx-0 sm:rounded-2xl sm:border-x">
          {renderStep(isolation)}
        </div>
      </section>

      <section>
        <h2 className={headingCn}>Dead tests</h2>
        {/* Straight from Reg 643: this order is required, not preferred. */}
        <p className="-mt-1 mb-3 text-[12px] leading-relaxed text-white">
          BS 7671 requires the tests in Reg 643.2 to 643.6 to be carried out in this order, and
          completed before the installation is energised.
        </p>
        <div className="-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          {dead.map(renderStep)}
        </div>
      </section>

      <section>
        <h2 className={headingCn}>Live tests</h2>
        <div className="-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          {live.map(renderStep)}
        </div>
      </section>

      <section>
        <h2 className={headingCn}>Go deeper</h2>
        <div className="-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          {[
            { title: 'Test procedures', desc: 'Step-by-step for each test', section: 'testing' as LearningSection },
            { title: 'Fault finding', desc: 'Diagnose it when a reading is wrong', section: 'fault-finding' as LearningSection },
            { title: 'Regulations', desc: 'Coding, checklists, plain-English answers', section: 'regulations' as LearningSection },
            { title: 'Full question bank', desc: '460 questions across every topic', section: 'quiz' as LearningSection },
          ].map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigateToSection(item.section);
              }}
              className="flex min-h-[3.25rem] w-full touch-manipulation items-center justify-between gap-3 p-4 text-left transition-colors active:bg-white/[0.04]"
            >
              <span className="min-w-0">
                <span className="block text-[14px] font-medium text-white">{item.title}</span>
                <span className="mt-0.5 block text-[12px] text-white">{item.desc}</span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-white" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearnPath;
