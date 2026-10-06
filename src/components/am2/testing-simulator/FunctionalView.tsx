/**
 * FunctionalView — functional testing (Reg 643.10).
 *
 * AM2 plan, round 6 (6 Oct 2026). Operate each piece of switchgear and
 * control on the rig with the board energised, see what happens, and judge
 * whether it works as intended. A fault found here is put right from the
 * circuit's page ("Put something right"), with the board isolated, and the
 * item operated again.
 *   Learn       — what to look for, and each judgement explained.
 *   Practise    — no prompts; marked at the end.
 *   Assessment  — as Practise.
 * Items and faults: src/data/am2/sectionBFunctional.ts.
 */
import { ArrowLeft, Check, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  FUNC_ITEMS,
  funcOutcome,
  funcSound,
  type FuncId,
  type FunctionalState,
} from '@/data/am2/sectionBFunctional';
import type { OriginState } from '@/data/am2/sectionBOrigin';
import type { SimMistake, SimMode } from '@/data/am2/sectionBRules';

interface FunctionalViewProps {
  mode: SimMode;
  functional: FunctionalState;
  origin: OriginState;
  energised: boolean;
  onUpdate: (patch: Partial<FunctionalState>, mistake?: SimMistake) => void;
  onBack: () => void;
}

const chip = (on: boolean) =>
  cn(
    'min-h-[44px] rounded-xl border px-3.5 text-[13.5px] touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

export function FunctionalView({
  mode,
  functional,
  origin,
  energised,
  onUpdate,
  onBack,
}: FunctionalViewProps) {
  const learn = mode === 'learn';
  const assess = mode === 'assessment';

  const operate = (id: FuncId) => {
    if (!energised) return;
    const verdicts = { ...functional.verdicts };
    delete verdicts[id];
    onUpdate({ operated: { ...functional.operated, [id]: Date.now() }, verdicts });
  };

  const judged = FUNC_ITEMS.filter(
    (i) => functional.operated[i.id] && functional.verdicts[i.id]
  ).length;

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[900px] space-y-4 px-4 pb-8 pt-5 sm:px-6 lg:pt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center gap-1.5 text-[13.5px] font-semibold text-white touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" /> The rig
          </button>

          <header>
            <p className="text-[12px] font-semibold text-white">
              Section B · functional testing{!assess && ' · Reg 643.10'}
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              Does it work as intended?
            </h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
              Operate the switchgear and controls and judge each one.
              {!assess && ' The board has to be energised.'}
              {learn &&
                ' If one doesn’t work, isolate the board, put it right from that circuit’s page, then operate it again.'}
            </p>
            {!energised && (
              <p className="mt-2 text-[13px] font-semibold text-white">
                The board is dead — nothing will operate.
              </p>
            )}
          </header>

          <ul className="space-y-3">
            {FUNC_ITEMS.map((item) => {
              const at = functional.operated[item.id];
              const said = functional.verdicts[item.id];
              const sound = funcSound(item.id, functional, origin);
              const right = said === (sound ? 'ok' : 'fault');
              return (
                <li
                  key={item.id}
                  className={cn('rounded-2xl border border-white/[0.14] p-4', CARD_SURFACE)}
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-white">
                        {item.circuitId && (
                          <span className="font-mono text-[12px]">Circuit {item.circuitId} · </span>
                        )}
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[13px] text-white">{item.how}</p>
                    </div>
                    <button
                      type="button"
                      disabled={!energised}
                      onClick={() => operate(item.id)}
                      className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
                    >
                      {at ? 'Operate again' : 'Operate'}
                    </button>
                  </div>
                  {at && (
                    <>
                      <p className="mt-3 rounded-xl border border-white/[0.14] px-3.5 py-2.5 text-[14px] text-white">
                        {funcOutcome(item.id, functional, origin)}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {(['ok', 'fault'] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={said === v}
                            onClick={() =>
                              onUpdate({ verdicts: { ...functional.verdicts, [item.id]: v } })
                            }
                            className={chip(said === v)}
                          >
                            {v === 'ok' ? 'Works as intended' : 'Doesn’t'}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {learn && at && said && (
                    <p className="mt-2.5 flex gap-2 text-[13px] leading-snug text-white">
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
                      <span>
                        {sound
                          ? `It works: ${item.okSeen}`
                          : 'It doesn’t work as intended. Isolate, put it right from the circuit’s page, then operate it again.'}
                      </span>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.1] bg-background px-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-[900px] items-center gap-3">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-white">
            {judged} of {FUNC_ITEMS.length} checked
          </p>
          <button
            type="button"
            onClick={() => {
              if (judged === FUNC_ITEMS.length) onUpdate({ done: true });
              onBack();
            }}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
          >
            {judged === FUNC_ITEMS.length ? 'Functional checks done' : 'Back to the rig'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FunctionalView;
