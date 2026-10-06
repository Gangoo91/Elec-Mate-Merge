/**
 * RegQuestion — the shared question and results screens for the AM2
 * regulation quizzes (BS 7671 spot check, weak-regs drill).
 *
 * One design so the two read as the same tool: requirement on the left,
 * section-labelled options on the right, an inline "how sure are you?" row,
 * then the regulation's own wording and where it sits in the book.
 * Keyboard: 1–4 answer, then 1–3 for confidence, Enter for next.
 */
import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Check, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { computeCalibration, type Confidence } from './confidence';
import { sectionOf, type PoolReg } from './bs7671QuizPool';
import { BS7671_PARTS, bookPath, sectionTitle } from '@/data/am2/bs7671Sections';

export interface RegQuestionData {
  key: string;
  prompt: string;
  correctReg: PoolReg;
  regText: string | null;
  options: Array<{ id: string; reg_number: string }>;
}

const CONFIDENCE_CHOICES: Array<{ id: Confidence; label: string; sub: string }> = [
  { id: 'guess', label: 'Guess', sub: 'not sure' },
  { id: 'likely', label: 'Pretty sure', sub: 'likely right' },
  { id: 'certain', label: 'Certain', sub: 'would bet on it' },
];

const REG_SURFACE =
  'rounded-2xl border border-white/[0.16] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]';

/* ─── Question ──────────────────────────────────────────────────── */

export function RegQuestionScreen({
  questions,
  index,
  answers,
  confidences,
  onAnswer,
  onConfidence,
  onNext,
  onExit,
  eyebrow = 'Which regulation is this?',
  aside,
}: {
  questions: RegQuestionData[];
  index: number;
  answers: Record<number, string>;
  confidences: Record<number, Confidence>;
  onAnswer: (optionId: string) => void;
  onConfidence: (c: Confidence) => void;
  onNext: () => void;
  onExit?: () => void;
  eyebrow?: string;
  /** Extra line on the requirement card — the drill says why this reg is here. */
  aside?: ReactNode;
}) {
  const q = questions[index];
  const answer = answers[index];
  const confidence = confidences[index];
  const revealed = answer != null && confidence != null;
  const isCorrect = revealed && answer === q.correctReg.id;
  const answeredCount = Object.keys(confidences).length;
  const rightSoFar = questions.filter(
    (qq, i) => confidences[i] != null && answers[i] === qq.correctReg.id
  ).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const n = Number(e.key);
      if (answer == null && n >= 1 && n <= q.options.length) onAnswer(q.options[n - 1].id);
      else if (answer != null && confidence == null && n >= 1 && n <= 3)
        onConfidence(CONFIDENCE_CHOICES[n - 1].id);
      else if (revealed && e.key === 'Enter') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, answer, confidence, revealed, onAnswer, onConfidence, onNext]);

  return (
    <div className="mx-auto w-full max-w-[1300px] space-y-5 py-3 sm:py-5">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-1">
          {questions.map((qq, i) => {
            const done = confidences[i] != null;
            const ok = answers[i] === qq.correctReg.id;
            return (
              <span
                key={qq.key}
                className={cn(
                  'h-1.5 flex-1 rounded-full',
                  done
                    ? ok
                      ? 'bg-emerald-400'
                      : 'bg-red-400'
                    : i === index
                      ? 'bg-white'
                      : 'bg-white/15'
                )}
              />
            );
          })}
        </div>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {index + 1} / {questions.length}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
        {/* Requirement */}
        <div className={cn(REG_SURFACE, 'border-elec-yellow/40 p-5 sm:p-7 lg:sticky lg:top-4')}>
          <p className="text-[12px] font-semibold text-white">{eyebrow}</p>
          {aside && <div className="mt-2">{aside}</div>}
          <p className="mt-3 whitespace-pre-wrap text-[16px] leading-relaxed text-white sm:text-[17px]">
            {q.prompt}
          </p>
          {answeredCount > 0 && (
            <p className="mt-4 text-[12px] text-white">
              {rightSoFar} of {answeredCount} right so far
            </p>
          )}
        </div>

        {/* Options → confidence → reveal */}
        <div className="space-y-4">
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isCorrectOpt = opt.id === q.correctReg.id;
              const isPick = opt.id === answer;
              const title = sectionTitle(opt.reg_number);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onAnswer(opt.id)}
                  disabled={answer != null}
                  className={cn(
                    'flex min-h-[64px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation',
                    answer == null &&
                      'border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] hover:border-elec-yellow/60 hover:from-white/[0.15] active:scale-[0.99]',
                    answer != null &&
                      !revealed &&
                      (isPick
                        ? 'border-elec-yellow bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]'
                        : 'border-white/[0.12] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] opacity-80'),
                    revealed &&
                      isCorrectOpt &&
                      'border-emerald-400 bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]',
                    revealed &&
                      !isCorrectOpt &&
                      isPick &&
                      'border-red-400 bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]',
                    revealed &&
                      !isCorrectOpt &&
                      !isPick &&
                      'border-white/[0.12] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] opacity-75'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[13px] font-bold',
                      revealed && isCorrectOpt
                        ? 'border-emerald-400 bg-emerald-400 text-black'
                        : revealed && isPick
                          ? 'border-red-400 bg-red-400 text-black'
                          : isPick
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/[0.3] bg-white/[0.08] text-white'
                    )}
                  >
                    {revealed && isCorrectOpt ? (
                      <Check className="h-4 w-4" />
                    ) : revealed && isPick ? (
                      <X className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[15px] font-semibold tabular-nums text-white">
                      Regulation {opt.reg_number}
                    </span>
                    {title && (
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                        Section {sectionOf(opt.reg_number)} · {title}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {answer != null && confidence == null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="text-[13.5px] font-semibold text-white">How sure are you?</p>
              <div className="grid grid-cols-3 gap-2">
                {CONFIDENCE_CHOICES.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onConfidence(c.id)}
                    className="flex min-h-[56px] flex-col items-center justify-center rounded-xl border border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] px-2 py-2 text-center transition-colors hover:border-elec-yellow/60 active:scale-[0.98] touch-manipulation"
                  >
                    <span className="text-[13.5px] font-semibold text-white">
                      <span className="mr-1 hidden text-[11px] lg:inline">{i + 1}</span>
                      {c.label}
                    </span>
                    <span className="text-[11px] text-white">{c.sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                REG_SURFACE,
                'space-y-3 p-5',
                isCorrect ? 'border-emerald-400/60' : 'border-red-400/60'
              )}
            >
              <p className={cn('text-[15px] font-bold', 'text-white')}>
                {isCorrect
                  ? confidence === 'guess'
                    ? 'Right — but you guessed, so it will come back'
                    : 'Right'
                  : confidence === 'certain'
                    ? 'Wrong while certain — this one comes back first'
                    : `Not this time — it's ${q.correctReg.reg_number}`}
              </p>
              <div>
                <p className="font-mono text-[14px] font-semibold tabular-nums text-white">
                  Regulation {q.correctReg.reg_number}
                </p>
                <p className="text-[12.5px] text-white">
                  {bookPath(q.correctReg.reg_number)}
                  {sectionTitle(q.correctReg.reg_number)
                    ? ` · ${sectionTitle(q.correctReg.reg_number)}`
                    : ''}
                </p>
                {q.correctReg.part_number != null && (
                  <p className="text-[12px] text-white">
                    Part {q.correctReg.part_number}:{' '}
                    {BS7671_PARTS[String(q.correctReg.part_number)]}
                  </p>
                )}
              </div>
              {q.regText && (
                <blockquote className="border-l-2 border-elec-yellow/70 pl-3 text-[13.5px] leading-relaxed text-white">
                  {q.regText}
                </blockquote>
              )}
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98] sm:w-auto sm:px-8"
              >
                {index < questions.length - 1 ? 'Next question' : 'See how you did'}
                <ArrowRight className="h-4 w-4" />
                <span className="hidden text-[11px] font-semibold lg:inline">Enter</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Results ───────────────────────────────────────────────────── */

export function RegResultsScreen({
  title,
  questions,
  answers,
  confidences,
  seconds,
  onAgain,
  againLabel = 'New round',
  onExit,
  footnote,
}: {
  title: string;
  questions: RegQuestionData[];
  answers: Record<number, string>;
  confidences: Record<number, Confidence>;
  seconds: number;
  onAgain: () => void;
  againLabel?: string;
  onExit?: () => void;
  footnote?: string;
}) {
  const correctCount = questions.filter((q, i) => answers[i] === q.correctReg.id).length;
  const pct = Math.round((correctCount / questions.length) * 100);
  const cal = computeCalibration(
    questions,
    (q, i) => answers[i] === q.correctReg.id,
    (i) => confidences[i]
  );
  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-8 py-4 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold text-white">{title} · done</p>
          <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
            {correctCount} of {questions.length} right
          </h1>
          <p className="mt-1 text-[14px] text-white">
            {pct}% · {Math.floor(seconds / 60)}m {seconds % 60}s
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onAgain}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" /> {againLabel}
          </button>
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="h-12 rounded-xl border border-white/[0.16] px-5 text-[14px] font-medium text-white touch-manipulation"
            >
              Back to AM2
            </button>
          )}
        </div>
      </div>

      {cal.total > 0 && (
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">How sure you were</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { v: cal.lockedIn, l: 'Right and certain', tone: 'text-white' },
              {
                v: cal.overconfident,
                l: 'Wrong but certain',
                tone: 'text-white',
              },
              {
                v: cal.lucky,
                l: 'Right on a guess',
                tone: 'text-white',
              },
            ].map((t) => (
              <div key={t.l} className={cn(REG_SURFACE, 'px-4 py-3.5')}>
                <p className={cn('text-[28px] font-bold leading-none tabular-nums', t.tone)}>
                  {t.v}
                </p>
                <p className="mt-1.5 text-[12px] font-medium text-white">{t.l}</p>
              </div>
            ))}
          </div>
          {cal.overconfident > 0 && (
            <p className="flex items-start gap-2 text-[13px] leading-relaxed text-white">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
              Wrong-but-certain answers are the ones that catch people out on the day. They come
              back first in the drill.
            </p>
          )}
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Every question</h2>
        <ul className={cn(REG_SURFACE, 'divide-y divide-white/[0.08] overflow-hidden')}>
          {questions.map((q, i) => {
            const ok = answers[i] === q.correctReg.id;
            return (
              <li key={q.key} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black',
                    ok ? 'bg-emerald-400' : 'bg-red-400'
                  )}
                >
                  {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[13px] font-semibold tabular-nums text-white">
                    Regulation {q.correctReg.reg_number}
                    <span className="ml-2 font-sans font-normal">
                      {sectionTitle(q.correctReg.reg_number)}
                    </span>
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-white">
                    {q.prompt}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {footnote && <p className="text-[13px] text-white">{footnote}</p>}
      </section>
    </div>
  );
}
