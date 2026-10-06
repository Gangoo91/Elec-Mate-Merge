/**
 * BondingView — continuity of the main protective bonding conductors.
 *
 * AM2 plan, 6 Oct 2026. Regulation 643.2.1: the continuity of protective
 * conductors, bonding conductors included, is verified by measuring
 * resistance. Low-resistance ohms, null the long lead, MET to each clamp,
 * judge it, record the conductor size.
 *   Learn       — the method is shown and each judgement explained.
 *   Practise    — no prompts; the meter shows what it shows.
 *   Assessment  — as Practise; marked at the end.
 * Sources and figures: src/data/am2/sectionBBonding.ts.
 *
 * Round 6: the supplementary bond at the shower is tested here too, and a bond
 * judged faulty can be put right (with the board isolated) and tested again.
 */
import { ArrowLeft, Check, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { BOND_FIX_OPTIONS } from '@/data/am2/sectionBRectify';
import {
  BONDING_CSA,
  BONDING_CSA_OPTIONS,
  BONDS,
  RIG_SUPPLY,
  SUPP_BOND_MAX,
  bondReading,
  bondSound,
  type BondId,
  type BondVerdict,
  type BondingState,
} from '@/data/am2/sectionBBonding';
import type { SimMistake, SimMode } from '@/data/am2/sectionBRules';

interface BondingViewProps {
  mode: SimMode;
  bonding: BondingState;
  energised: boolean;
  onUpdate: (patch: Partial<BondingState>, mistake?: SimMistake) => void;
  onBack: () => void;
  /** Put a faulty bond right (Reg 644.1.1). */
  onRectify?: (bond: BondId, optionId: string) => void;
}

const RANGES = [
  { id: 'ohms', label: 'Low-resistance ohms (Ω)' },
  { id: 'ir', label: 'Insulation, 500 V (MΩ)' },
  { id: 'zs', label: 'Loop impedance (Zs)' },
] as const;

const chip = (on: boolean) =>
  cn(
    'min-h-[44px] rounded-xl border px-3.5 text-[13.5px] touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

function Step({ n, title, children }: { n?: number; title: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-2xl border border-white/[0.14] p-4 sm:p-5', CARD_SURFACE)}>
      <h2 className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
        {n != null && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-elec-yellow font-mono text-[12px] font-bold text-black">
            {n}
          </span>
        )}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function BondingView({
  mode,
  bonding,
  energised,
  onUpdate,
  onBack,
  onRectify,
}: BondingViewProps) {
  const [fixing, setFixing] = useState<BondId | null>(null);
  const [fixedNote, setFixedNote] = useState<BondId | null>(null);
  const learn = mode === 'learn';
  const marked = mode !== 'learn';
  const [range, setRange] = useState<(typeof RANGES)[number]['id'] | null>(
    bonding.rangeSet ? 'ohms' : null
  );
  const [wrongRangeTried, setWrongRangeTried] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const assess = mode === 'assessment';

  const test = (b: BondId) => {
    if (!range) return;
    // On the wrong range the meter gives nothing in ohms — the mistake is
    // logged when the test is taken, not when a chip is tapped.
    if (range !== 'ohms') {
      setNote('The meter gives no reading in ohms on that range.');
      if (marked)
        onUpdate(
          {},
          {
            tag: 'not_a_test',
            what: `Main bonding tested on ${RANGES.find((x) => x.id === range)?.label.toLowerCase()}.`,
            fix: 'Continuity of bonding conductors is measured on low-resistance ohms.',
          }
        );
      return;
    }
    setNote(null);
    const reading = bondReading(b, bonding.fault, bonding.nulled);
    const mistake: SimMistake | undefined = !marked
      ? undefined
      : energised
        ? {
            tag: 'live_before_dead',
            what: 'Main bonding continuity tested with the board energised.',
            fix: 'Bonding continuity is a dead test (Reg 643.1): do it with the dead tests, before you switch on.',
          }
        : !bonding.nulled
          ? {
              tag: 'leads_not_nulled',
              what: 'Main bonding tested without nulling the long lead.',
              fix: 'Null the long (wander) lead first, or every reading carries its resistance.',
            }
          : undefined;
    // A retest replaces the reading and clears the judgement made on the old one.
    const verdicts = { ...bonding.verdicts };
    delete verdicts[b];
    onUpdate(
      {
        readings: { ...bonding.readings, [b]: reading },
        nulledAt: { ...bonding.nulledAt, [b]: bonding.nulled },
        verdicts,
      },
      mistake
    );
  };

  const judged = BONDS.every((b) => bonding.readings[b.id] && bonding.verdicts[b.id]);
  const ready = judged && !!bonding.csa;

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
              Section B · continuity{mode !== 'assessment' && ' · Reg 643.2.1'}
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              Protective bonding
            </h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
              Continuity of protective conductors includes the main bonding to the water and gas
              pipes, and the supplementary bonding at the shower.
              {mode !== 'assessment' &&
                ' It’s a dead test — do it with the others, before you switch on.'}
              {learn &&
                ' Low-resistance ohms, null the long lead, then measure from the main earthing terminal (MET) to each main bonding clamp, and the supplementary bond end to end.'}
            </p>
          </header>

          <Step n={assess ? undefined : 1} title="Set the meter">
            <div className="flex flex-wrap gap-2">
              {RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={range === r.id}
                  onClick={() => {
                    setRange(r.id);
                    setNote(null);
                    onUpdate({ rangeSet: r.id === 'ohms' });
                    if (r.id !== 'ohms') setWrongRangeTried(true);
                  }}
                  className={chip(range === r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {!assess && range && range !== 'ohms' && (
              <p className="mt-2 text-[13px] text-white">
                That range doesn’t measure continuity — the meter won’t give a reading in ohms on
                it.
              </p>
            )}
            {learn && wrongRangeTried && range === 'ohms' && (
              <p className="mt-2 text-[13px] text-white">
                Right — continuity is low-resistance ohms.
              </p>
            )}
          </Step>

          <Step n={assess ? undefined : 2} title={assess ? 'The leads' : 'Null the long lead'}>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!range || bonding.nulled}
                onClick={() =>
                  range === 'ohms'
                    ? onUpdate({ nulled: true })
                    : setNote('There’s nothing to null on that range.')
                }
                className={cn(
                  'inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-[13.5px] font-semibold touch-manipulation',
                  !bonding.nulled && 'disabled:opacity-60',
                  bonding.nulled
                    ? 'border-emerald-400 text-white'
                    : 'border-white/[0.2] bg-white/[0.06] text-white'
                )}
              >
                {bonding.nulled && <Check className="h-4 w-4 text-emerald-400" />}
                {bonding.nulled
                  ? 'Lead nulled — reads 0.00 Ω'
                  : 'Touch the leads together and null'}
              </button>
              {learn && !bonding.nulled && (
                <p className="text-[13px] text-white">
                  A long wander lead can be most of an ohm on its own — null it so it isn’t in the
                  reading.
                </p>
              )}
            </div>
          </Step>

          <Step
            n={assess ? undefined : 3}
            title={assess ? 'Each bond' : 'Measure each bond, and judge it'}
          >
            {note && <p className="mb-3 text-[13px] font-medium text-white">{note}</p>}
            <ul className="space-y-3">
              {BONDS.map((b) => {
                const reading = bonding.readings[b.id];
                const said = bonding.verdicts[b.id];
                const sound = bondSound(b.id, bonding.fault);
                const right = !!bonding.nulledAt?.[b.id] && said === (sound ? 'ok' : 'fault');
                return (
                  <li key={b.id} className="rounded-xl border border-white/[0.12] p-3.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold text-white">{b.label}</p>
                        <p className="text-[12.5px] text-white">{b.where}</p>
                      </div>
                      <p
                        className="min-w-[5.5rem] rounded-lg border border-white/[0.18] bg-black px-3 py-1.5 text-right font-mono text-[18px] font-bold tabular-nums text-white"
                        aria-label={`Reading ${reading ?? 'none'}`}
                      >
                        {reading ? (reading === 'OL' ? 'OL' : `${reading} Ω`) : '— Ω'}
                      </p>
                      <button
                        type="button"
                        disabled={!range}
                        onClick={() => test(b.id)}
                        className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
                      >
                        {reading ? 'Test again' : 'Test'}
                      </button>
                    </div>
                    {reading && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {(['ok', 'fault'] as BondVerdict[]).map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={said === v}
                            onClick={() =>
                              onUpdate({ verdicts: { ...bonding.verdicts, [b.id]: v } })
                            }
                            className={chip(said === v)}
                          >
                            {v === 'ok' ? 'Continuity confirmed' : 'Fault — record it'}
                          </button>
                        ))}
                      </div>
                    )}
                    {learn && said && (
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
                          {!bonding.nulledAt?.[b.id]
                            ? 'This reading was taken before the lead was nulled, so it includes the lead. Null it and test again before you judge.'
                            : sound
                              ? b.id === 'supp'
                                ? `Sound — a few hundredths of an ohm. Reg 415.2.2’s limit here is 50 V ÷ 30 mA, about ${SUPP_BOND_MAX.toLocaleString('en-GB')} Ω — on an RCD circuit it’s continuity that matters.`
                                : 'Sound — a few hundredths of an ohm. GN3: across a clamp joint, readings should approach 0.05 Ω.'
                              : 'A fault. GN3: first and foremost, no discontinuity — and across a clamp joint, readings should approach 0.05 Ω. Tenths of an ohm, or OL, is a bad clamp or a break.'}
                        </span>
                      </p>
                    )}
                    {/* Put a bond judged faulty right, then test it again */}
                    {marked && onRectify && said === 'fault' && (
                      <div className="mt-3 border-t border-white/[0.1] pt-3">
                        {fixing !== b.id ? (
                          <button
                            type="button"
                            onClick={() => setFixing(b.id)}
                            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/[0.2] px-3.5 text-[13.5px] font-semibold text-white touch-manipulation"
                          >
                            Put it right
                          </button>
                        ) : energised ? (
                          <p className="text-[13px] text-white">
                            The board is energised — isolate it on the rig page before a repair.
                          </p>
                        ) : (
                          <div className="grid gap-2">
                            {BOND_FIX_OPTIONS.map((o) => (
                              <button
                                key={o.id}
                                type="button"
                                onClick={() => {
                                  onRectify(b.id, o.id);
                                  setFixing(null);
                                  setFixedNote(b.id);
                                }}
                                className="flex min-h-[48px] items-center rounded-xl border border-white/[0.16] px-3.5 py-2 text-left text-[13.5px] font-medium text-white touch-manipulation hover:border-elec-yellow"
                              >
                                {o.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {fixedNote === b.id && !reading && (
                      <p className="mt-2 text-[13px] font-semibold text-white">
                        Done — now test it again (Reg 643.1).
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Step>

          <Step n={assess ? undefined : 4} title="Minimum size for this supply">
            <p className="text-[13px] text-white">
              The rig’s supply details: <span className="font-semibold">{RIG_SUPPLY.system}</span>,
              PEN conductor <span className="font-semibold">{RIG_SUPPLY.pen}</span>. What’s the
              minimum size of main protective bonding conductor for this supply?
              {learn && ' Look it up in Table 54.8.'}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {BONDING_CSA_OPTIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={bonding.csa === o}
                  onClick={() => onUpdate({ csa: o })}
                  className={chip(bonding.csa === o)}
                >
                  {o} mm²
                </button>
              ))}
            </div>
            {learn && bonding.csa && (
              <p className="mt-2 text-[13px] text-white">
                {bonding.csa === BONDING_CSA
                  ? 'Right — Table 54.8 gives at least 10 mm² copper for a PEN conductor of 35 mm² or less.'
                  : Number(bonding.csa) > 10
                    ? 'That would comply, but it isn’t the minimum — Table 54.8 gives 10 mm² copper for a PEN conductor of 35 mm² or less.'
                    : 'Too small — Table 54.8 gives at least 10 mm² copper for a PEN conductor of 35 mm² or less.'}
              </p>
            )}
          </Step>
        </div>
      </div>

      <div className="border-t border-white/[0.1] bg-background px-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-[900px] items-center gap-3">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-white">
            {BONDS.filter((b) => bonding.verdicts[b.id]).length} of {BONDS.length} judged
            {bonding.csa ? ' · size answered' : ''}
          </p>
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              onUpdate({ done: true });
              onBack();
            }}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
          >
            {ready ? 'Bonding done' : 'Test, judge and record'}
            {ready && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BondingView;
