/**
 * The exam start screen, shared by every in-app paper.
 *
 * Built on the app's card recipe (src/components/ui/card-recipe.ts) rather
 * than hand-rolled surfaces. Three rules from that file that a first pass at
 * this screen broke, and which are why it read as flat and dated:
 *
 *  1. Volt FILLS are only ever SOLID. `bg-elec-yellow/10` and friends mix with
 *     the near-black ground into sludge. Volt lines and text are exempt.
 *  2. Borders are `border-elec-yellow/35`, not white-alpha. A white border on
 *     a black page is a grey outline and the page becomes grey rectangles with
 *     no brand on it.
 *  3. Surfaces are a DIAGONAL white-alpha ramp with an inset top highlight —
 *     that is the difference between a card that looks lit and one that looks
 *     printed.
 */
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_PRIMARY, CARD_SURFACE, SURFACE_DEPTH } from '@/components/ui/card-recipe';
import type { MockExamHistory } from '@/hooks/useMockExamHistory';

export interface ExamStartPanelProps {
  title: string;
  /** e.g. "Level 3 — C&G 2365-03 Unit 201". */
  subtitle?: string;
  totalQuestions: number;
  /** Size of the pool the paper is drawn from, when larger than the paper. */
  bankSize?: number;
  timeLimitMinutes: number;
  passThreshold: number;
  topics?: string[];
  history?: MockExamHistory;
  /**
   * Paper-specific condition worth knowing before starting — e.g. AM2 allows
   * reference materials in the real assessment, so practising it closed-book
   * is practising the wrong exam.
   */
  note?: string;
  onStart: () => void;
  onExit: () => void;
  exitLabel?: string;
}

const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;

/** Quiet uppercase micro-label — the app's standard uppercase eyebrow. */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{children}</p>
);

export function ExamStartPanel({
  title,
  subtitle,
  totalQuestions,
  bankSize,
  timeLimitMinutes,
  passThreshold,
  topics = [],
  history,
  note,
  onStart,
  onExit,
  exitLabel = 'course',
}: ExamStartPanelProps) {
  const haptic = useHaptic();
  const passMarkQuestions = Math.ceil((totalQuestions * passThreshold) / 100);
  const drawsFromPool = typeof bankSize === 'number' && bankSize > totalQuestions;
  const best = history?.best ?? null;
  const hasRecord = Boolean(history && history.attempts > 0);

  return (
    <div className="min-h-screen bg-elec-dark px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onExit();
          }}
          className="-ml-1 mb-4 flex h-11 items-center gap-1.5 px-1 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {exitLabel}
        </button>

        {/* Masthead — title, what actually happens, and the learner's standing
            on this paper as a ring rather than another row of numbers. */}
        <section
          className={cn(
            'relative overflow-hidden rounded-2xl border border-elec-yellow/35 p-5 sm:p-7',
            CARD_SURFACE
          )}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <Eyebrow>Mock exam</Eyebrow>
              <h1 className="mt-1.5 text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[30px]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-[13.5px] font-semibold text-elec-yellow">{subtitle}</p>
              )}
              <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-white">
                {drawsFromPool
                  ? `A fresh set of ${totalQuestions} questions drawn at random from a bank of ${bankSize}. Sit it as many times as you like — you'll get a different paper each go.`
                  : `${totalQuestions} questions under exam conditions. Progress saves as you go, and you can flag anything to come back to.`}
              </p>
            </div>

            {hasRecord && (
              <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:gap-2">
                <div
                  role="img"
                  aria-label={`Best score ${best}%`}
                  className="relative h-[68px] w-[68px]"
                >
                  <svg width="68" height="68" className="-rotate-90" aria-hidden>
                    <circle
                      cx="34"
                      cy="34"
                      r={RING_R}
                      fill="none"
                      strokeWidth="5"
                      className="stroke-white/[0.14]"
                    />
                    <circle
                      cx="34"
                      cy="34"
                      r={RING_R}
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={RING_C}
                      strokeDashoffset={RING_C * (1 - (best ?? 0) / 100)}
                      className={cn(
                        'transition-[stroke-dashoffset] duration-700',
                        (best ?? 0) >= passThreshold ? 'stroke-green-400' : 'stroke-elec-yellow'
                      )}
                    />
                  </svg>
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center text-[15px] font-bold tabular-nums text-white"
                  >
                    {best}%
                  </span>
                </div>
                <div className="sm:text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                    Your best
                  </p>
                  <p className="mt-0.5 text-[12px] text-white">
                    {history?.attempts} {history?.attempts === 1 ? 'attempt' : 'attempts'} · last{' '}
                    {history?.last}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {hasRecord && best !== null && best < passThreshold && (
            <p className="mt-5 border-t border-white/[0.1] pt-4 text-[12.5px] leading-relaxed text-white">
              <span className="font-semibold text-elec-yellow">
                {passThreshold - best}% off the pass mark.
              </span>{' '}
              Every question you get wrong is saved to your revision pile — clear that first, then
              come back.
            </p>
          )}
        </section>

        {/* The three numbers a learner checks before committing the time. */}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { value: String(totalQuestions), label: 'Questions' },
            { value: `${timeLimitMinutes}`, label: 'Minutes', suffix: 'min' },
            { value: `${passThreshold}%`, label: `Pass · ${passMarkQuestions}/${totalQuestions}` },
          ].map((f) => (
            <div
              key={f.label}
              className={cn(
                'rounded-2xl border border-elec-yellow/35 px-3 py-4 text-center',
                CARD_SURFACE
              )}
            >
              <p className="text-[26px] font-bold leading-none tabular-nums tracking-tight text-white sm:text-[30px]">
                {f.value}
              </p>
              <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white">
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {topics.length > 0 && (
          <section className="mt-5">
            <Eyebrow>What it covers</Eyebrow>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <span
                  key={t}
                  className={cn(
                    'rounded-full border border-elec-yellow/35 px-3 py-1.5 text-[12px] font-medium text-white',
                    SURFACE_DEPTH
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Volt EDGE — the original carried this in blue, which is off-brand
            and read as a system message rather than exam guidance. */}
        {note && (
          <p
            className={cn(
              'mt-5 rounded-xl border border-elec-yellow px-4 py-3 text-[13px] font-medium leading-relaxed text-white',
              SURFACE_DEPTH
            )}
          >
            {note}
          </p>
        )}

        <p className="mt-5 text-[12.5px] leading-relaxed text-white">
          Flag anything you're unsure of and it'll be waiting at the end for review. Wrong answers
          are added to your revision pile automatically, so nothing you miss gets lost.
        </p>

        {/* Solid volt — the recipe's primary. Never a translucent yellow wash. */}
        <button
          type="button"
          onClick={() => {
            haptic.medium();
            onStart();
          }}
          className={cn(
            'mt-5 flex h-14 w-full items-center justify-center rounded-2xl border text-[15px] font-bold text-black',
            'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
            'transition-[background-image,transform] duration-150 ease-out active:scale-[0.97]',
            CARD_PRIMARY
          )}
        >
          {hasRecord ? 'Sit it again' : 'Start exam'}
        </button>
      </div>
    </div>
  );
}
