/**
 * InspectionView — Section B's visual inspection, before any test.
 *
 * AM2 plan, 6 Oct 2026. Regulation 642.1: inspection precedes testing,
 * normally with the supply off. Ten checks on the rig; the learner judges each acceptable or
 * a defect.
 *   Learn       — what to check is shown, and each answer is explained at once.
 *   Practise    — what to check is one tap away; marked at the end.
 *   Assessment  — no help; marked at the end.
 */
import { ArrowLeft, Check, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  INSPECTION_ITEMS,
  type InspectionState,
  type InspectionVerdict,
} from '@/data/am2/sectionBInspection';
import type { SimMode } from '@/data/am2/sectionBRules';

interface InspectionViewProps {
  mode: SimMode;
  inspection: InspectionState;
  onAnswer: (id: string, verdict: InspectionVerdict) => void;
  onFinish: () => void;
  onBack: () => void;
}

export function InspectionView({
  mode,
  inspection,
  onAnswer,
  onFinish,
  onBack,
}: InspectionViewProps) {
  const learn = mode === 'learn';
  const [showCheck, setShowCheck] = useState<Record<string, boolean>>({});
  const answered = INSPECTION_ITEMS.filter((i) => inspection.answers[i.id]).length;
  const all = answered === INSPECTION_ITEMS.length;

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[900px] space-y-5 px-4 pb-8 pt-5 sm:px-6 lg:pt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center gap-1.5 text-[13.5px] font-semibold text-white touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" /> The rig
          </button>

          <header>
            <p className="text-[12px] font-semibold text-white">
              Section B · visual inspection{mode !== 'assessment' && ' · Reg 642.1'}
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              {mode === 'assessment' ? 'Visual inspection' : 'Inspect before you test'}
            </h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
              {mode !== 'assessment' &&
                'Inspection comes before testing, normally with the supply off. '}
              Go round the rig and judge each check: acceptable, or a defect.{' '}
              {learn
                ? 'Each answer is explained as you go.'
                : mode === 'practise'
                  ? 'Tap “What to check” if you need a pointer. It’s marked at the end.'
                  : 'No help — it’s marked at the end.'}
            </p>
          </header>

          <ul className="space-y-2.5">
            {INSPECTION_ITEMS.map((item) => {
              const defect = inspection.defects.includes(item.id);
              const said = inspection.answers[item.id];
              const right = said === (defect ? 'defect' : 'ok');
              const checkShown = learn || showCheck[item.id];
              return (
                <li
                  key={item.id}
                  className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
                >
                  <p className="text-[12px] font-semibold text-white">{item.where}</p>
                  <p className="mt-1 text-[15px] font-medium leading-snug text-white">
                    {defect ? item.defectSeen : item.okSeen}
                  </p>

                  {checkShown ? (
                    <p className="mt-2 text-[13px] text-white">
                      <span className="font-semibold">What to check:</span> {item.check}
                    </p>
                  ) : mode === 'practise' ? (
                    <button
                      type="button"
                      onClick={() => setShowCheck((s) => ({ ...s, [item.id]: true }))}
                      className="mt-2 inline-flex h-11 items-center rounded-xl border border-white/[0.18] px-3.5 text-[13px] font-semibold text-white touch-manipulation"
                    >
                      What to check
                    </button>
                  ) : null}

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(['ok', 'defect'] as InspectionVerdict[]).map((v) => (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={said === v}
                        onClick={() => onAnswer(item.id, v)}
                        className={cn(
                          'h-11 rounded-xl border text-[14px] touch-manipulation',
                          said === v
                            ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                            : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                        )}
                      >
                        {v === 'ok' ? 'Acceptable' : 'Defect'}
                      </button>
                    ))}
                  </div>

                  {/* Learn: explain straight away */}
                  {learn && said && (
                    <div className="mt-3 flex gap-2.5 border-t border-white/[0.1] pt-3">
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                          right ? 'bg-emerald-400' : 'bg-red-500'
                        )}
                      >
                        {right ? (
                          <Check className="h-3 w-3 text-black" />
                        ) : (
                          <X className="h-3 w-3 text-white" />
                        )}
                      </span>
                      <p className="text-[13px] leading-snug text-white">
                        <span className="font-semibold">
                          {defect ? 'A defect.' : 'Acceptable.'} Reg {item.reg}:
                        </span>{' '}
                        {item.why}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer: progress and finish */}
      <div className="border-t border-white/[0.1] bg-background px-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-[900px] items-center gap-3">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-white">
            {answered} of {INSPECTION_ITEMS.length} judged
          </p>
          <button
            type="button"
            disabled={!all}
            onClick={onFinish}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
          >
            {all
              ? mode === 'assessment'
                ? 'Inspection done'
                : 'Inspection done — start testing'
              : 'Judge every check'}
            {all && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InspectionView;
