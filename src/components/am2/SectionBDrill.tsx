/**
 * SectionBDrill — six quick questions on one weakness (or a mix).
 *
 * AM2 plan, Phase 2 (6 Oct 2026). Opened from "Your weak spots" on the AM2
 * home and from "Practise just these" on the Section B debrief. One question
 * at a time, answer with a tap or keys 1–4, the reason shown straight away
 * with its reference, a short result at the end.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { DRILLS, buildDrill, type DrillKind } from '@/data/am2/sectionBDrills';
import { recordDrill } from '@/hooks/am2/drillLog';
import { useAuth } from '@/contexts/AuthContext';

interface SectionBDrillProps {
  kinds: DrillKind[];
  onExit: () => void;
  onOpenRig: () => void;
}

const SURFACE = cn('rounded-2xl border border-white/[0.14]', CARD_SURFACE);

export function SectionBDrill({ kinds, onExit, onOpenRig }: SectionBDrillProps) {
  const [round, setRound] = useState(0);
  // Keyed on the kinds' text, not the array: the parent passes a fresh array
  // each render, which rebuilt the questions under the learner mid-drill.
  const kindsKey = kinds.join(',');
  const questions = useMemo(() => {
    const list = (kindsKey ? kindsKey.split(',') : ['limits']) as DrillKind[];
    // `round` changes to deal a fresh set for "Go again".
    void round;
    return buildDrill(list, 6);
  }, [kindsKey, round]);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const done = i >= questions.length;
  const q = questions[i];
  // Logged once per round, so the weak-spot card can say it was drilled.
  const { user } = useAuth();
  useEffect(() => {
    if (done && questions.length && user)
      recordDrill(user.id, kindsKey.split(',') as DrillKind[], right, questions.length);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = useCallback(
    (n: number) => {
      if (chosen !== null || !q || n >= q.options.length) return;
      setChosen(n);
      if (n === q.answer) setRight((r) => r + 1);
    },
    [chosen, q]
  );
  const next = useCallback(() => {
    setChosen(null);
    setI((x) => x + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4) choose(n - 1);
      if (e.key === 'Enter' && chosen !== null) next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choose, next, chosen, done]);

  const title = kinds.length === 1 && DRILLS[kinds[0]] ? DRILLS[kinds[0]].title : 'Your weak spots';
  const section = (DRILLS[kinds[0]] ?? DRILLS.limits).section;

  if (done) {
    const all = right === questions.length;
    return (
      <div className="mx-auto w-full max-w-[860px] space-y-5">
        <div>
          <p className="text-[12px] font-semibold text-white">
            Section {section} drill · {title}
          </p>
          <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-white">
            <span className={'text-white'}>
              {right} of {questions.length}
            </span>{' '}
            right
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            {all
              ? 'Clean. Put it to work on the rig — the weak spots update after each run.'
              : 'Go again — the questions change each time — then try it on the rig.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setRound((r) => r + 1);
              setI(0);
              setRight(0);
              setChosen(null);
            }}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black touch-manipulation"
          >
            <RotateCcw className="h-4 w-4" /> Six more
          </button>
          <button
            type="button"
            onClick={onOpenRig}
            className="h-12 rounded-xl border border-white/[0.22] px-5 text-[14px] font-semibold text-white touch-manipulation"
          >
            {section === 'C' ? 'Safe isolation' : section === 'D' ? 'Find a fault' : 'Test the rig'}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="h-12 rounded-xl border border-white/[0.22] px-5 text-[14px] font-semibold text-white touch-manipulation"
          >
            AM2 home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[860px] space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-white">
          Section {DRILLS[q.kind].section} drill · {DRILLS[q.kind].title}
        </p>
        <p className="font-mono text-[13px] font-semibold tabular-nums text-white">
          {i + 1} / {questions.length}
        </p>
      </div>
      <div className="flex gap-1" aria-hidden>
        {questions.map((_, n) => (
          <span
            key={n}
            className={cn(
              'h-1.5 flex-1 rounded-full',
              n < i ? 'bg-elec-yellow' : n === i ? 'bg-white/[0.5]' : 'bg-white/[0.12]'
            )}
          />
        ))}
      </div>

      <div className={cn(SURFACE, 'p-5 lg:p-6')}>
        <h2 className="text-[19px] font-bold leading-snug text-white lg:text-[21px]">{q.prompt}</h2>
        <div className="mt-4 grid gap-2">
          {q.options.map((o, n) => {
            const isAnswer = n === q.answer;
            const isChosen = n === chosen;
            return (
              <button
                key={o}
                type="button"
                onClick={() => choose(n)}
                disabled={chosen !== null}
                className={cn(
                  'flex min-h-[52px] items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[15px] text-white touch-manipulation transition-colors',
                  chosen === null && 'border-white/[0.18] hover:border-elec-yellow',
                  chosen !== null && isAnswer && 'border-emerald-400 bg-emerald-400 text-black',
                  chosen !== null && isChosen && !isAnswer && 'border-red-500 bg-red-500',
                  chosen !== null && !isAnswer && !isChosen && 'border-white/[0.1]'
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-[12px] font-bold',
                    chosen !== null && isAnswer ? 'border-black/40' : 'border-white/[0.3]'
                  )}
                >
                  {chosen !== null && isAnswer ? (
                    <Check className="h-4 w-4" />
                  ) : chosen !== null && isChosen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    n + 1
                  )}
                </span>
                <span className="font-medium">{o}</span>
              </button>
            );
          })}
        </div>

        {chosen !== null && (
          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.1] pt-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-[14px] leading-relaxed text-white">
              <span className="font-bold">{chosen === q.answer ? 'Right. ' : 'Not quite. '}</span>
              {q.why}
            </p>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black touch-manipulation"
            >
              {i + 1 === questions.length ? 'See how you did' : 'Next'}{' '}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionBDrill;
