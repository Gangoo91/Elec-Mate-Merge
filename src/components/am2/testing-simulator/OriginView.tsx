/**
 * OriginView — the tests at the origin: Ze, prospective fault current and
 * phase sequence.
 *
 * AM2 plan, round 6 (6 Oct 2026). Ze used to be typed in, Ipf worked out for
 * the learner and the phase sequence pre-filled. Now:
 *   - Ze: main switch open (the board dead), the main earthing conductor off
 *     the MET for the test, line to earth at the incoming terminals — then put
 *     it back. With it still on, the bonding gives parallel paths and it reads
 *     low; with the board live, the installation isn't isolated.
 *   - PSCC (L–N) and PEFC (L–E) at the origin (Reg 643.7.3.201); the
 *     certificate takes the L–N × 2 on this three-phase supply, or the PEFC if
 *     greater (Appendix 14).
 *   - Phase rotation at the incoming terminals and at the motor isolator
 *     (Reg 643.9).
 *   Learn       — each step shown and each result explained.
 *   Practise    — no prompts; marked at the end.
 *   Assessment  — as Practise.
 * Figures and sources: src/data/am2/sectionBOrigin.ts.
 */
import { ArrowLeft, Check, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  SEQ_POINTS,
  SEQ_RIGHT,
  ipfFrom,
  pfcReading,
  seqReading,
  zeReading,
  type OriginState,
  type SeqPoint,
} from '@/data/am2/sectionBOrigin';
import { RIG_DRAWINGS } from '@/data/am2/sectionBDetails';
import type { SimMistake, SimMode } from '@/data/am2/sectionBRules';

interface OriginViewProps {
  mode: SimMode;
  origin: OriginState;
  energised: boolean;
  onUpdate: (patch: Partial<OriginState>, mistake?: SimMistake) => void;
  onBack: () => void;
}

const chip = (on: boolean) =>
  cn(
    'min-h-[44px] rounded-xl border px-3.5 text-[13.5px] touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

const testBtn =
  'inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-2xl border border-white/[0.14] p-4 sm:p-5', CARD_SURFACE)}>
      <h2 className="text-[15px] font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Meter({ value, unit, label }: { value?: string; unit: string; label: string }) {
  return (
    <p
      className="min-w-[6rem] rounded-lg border border-white/[0.18] bg-black px-3 py-1.5 text-right font-mono text-[18px] font-bold tabular-nums text-white"
      aria-label={`${label} ${value ?? 'none'}`}
    >
      {value ? `${value} ${unit}` : `— ${unit}`}
    </p>
  );
}

function Explain({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <p className="flex gap-2 text-[13px] leading-snug text-white">
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          ok ? 'bg-emerald-400' : 'bg-red-500'
        )}
      >
        {ok ? <Check className="h-3 w-3 text-black" /> : <X className="h-3 w-3 text-white" />}
      </span>
      <span>{children}</span>
    </p>
  );
}

export function OriginView({ mode, origin, energised, onUpdate, onBack }: OriginViewProps) {
  const learn = mode === 'learn';
  const assess = mode === 'assessment';
  const marked = !learn;

  const toggleEarth = () => {
    if (!origin.earthOff && energised) {
      // Taking the earth off a live installation: the assessor stops you.
      if (marked)
        onUpdate(
          {},
          {
            tag: 'earth_left_off',
            what: 'Went to disconnect the main earthing conductor with the board energised.',
            fix: 'Isolate first — main switch open — then take the earthing conductor off for the Ze test.',
          }
        );
      return;
    }
    onUpdate({ earthOff: !origin.earthOff });
  };

  const testZe = () =>
    onUpdate({
      ze: zeReading(origin.earthOff),
      zeHow: { earthOff: origin.earthOff, isolated: !energised },
    });

  const testSeq = (p: SeqPoint) => {
    if (p === 'motor' && !energised) return;
    const verdicts = { ...origin.verdicts };
    delete verdicts[p];
    onUpdate({
      seq: { ...origin.seq, [p]: { shown: seqReading(p, origin), at: Date.now() } },
      verdicts,
    });
  };

  const ipf = ipfFrom(origin.pscc, origin.pefc);
  const done =
    !!origin.ze &&
    !!origin.pscc &&
    !!origin.pefc &&
    SEQ_POINTS.every((p) => origin.seq[p.id] && origin.verdicts[p.id]);

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
              Section B · the origin{!assess && ' · Regs 643.7.3, 643.9'}
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              Ze, fault current and phase sequence
            </h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white">
              {RIG_DRAWINGS.supply} {RIG_DRAWINGS.board}
            </p>
            <p className="mt-2 text-[13px] font-semibold text-white">
              Main switch:{' '}
              {energised ? 'closed — the board is energised' : 'open — the board is dead'}
            </p>
          </header>

          <Card title="External earth fault loop impedance, Ze">
            {learn && (
              <p className="text-[13px] text-white">
                With the main switch open, take the main earthing conductor off the MET so the
                bonding can’t give parallel paths, test line to earth at the incoming terminals,
                then put it back straight away.
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleEarth}
                className={cn(
                  'inline-flex min-h-[44px] items-center rounded-xl border px-4 text-[13.5px] font-semibold text-white touch-manipulation',
                  origin.earthOff ? 'border-red-400' : 'border-white/[0.2] bg-white/[0.06]'
                )}
              >
                {origin.earthOff
                  ? 'Reconnect the main earthing conductor'
                  : 'Disconnect the main earthing conductor from the MET'}
              </button>
              {learn && !origin.earthOff && energised && (
                <p className="text-[13px] text-white">
                  Isolate the board first — not on a live installation.
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="min-w-0 flex-1 text-[13.5px] text-white">
                Line to earth, incoming terminals
              </p>
              <Meter value={origin.ze} unit="Ω" label="Ze" />
              <button type="button" onClick={testZe} className={testBtn}>
                {origin.ze ? 'Test again' : 'Test'}
              </button>
            </div>
            {learn && origin.ze && origin.zeHow && (
              <Explain ok={origin.zeHow.earthOff && origin.zeHow.isolated}>
                {!origin.zeHow.isolated
                  ? 'Taken with the main switch closed. Open it — the installation is isolated for Ze.'
                  : !origin.zeHow.earthOff
                    ? 'Low: with the earthing conductor still on, the bonding to the pipes gives parallel paths. Disconnect it and test again.'
                    : `That’s Ze: ${origin.ze} Ω. Now reconnect the earthing conductor.`}
              </Explain>
            )}
            {origin.earthOff && !assess && (
              <p className="rounded-xl border border-red-400 px-3 py-2 text-[13px] font-semibold text-white">
                The main earthing conductor is off the MET — the installation has no earth until
                it’s back.
              </p>
            )}
          </Card>

          <Card title="Prospective fault current at the origin">
            {learn && (
              <p className="text-[13px] text-white">
                Reg 643.7.3.201: the prospective short-circuit current (line–neutral) and the
                prospective earth fault current (line–earth) at the origin. This supply is
                three-phase: Appendix 14 takes the line–neutral figure × 2 for a fault across all
                three lines — the certificate gets that, or the earth fault current if it were
                greater.
              </p>
            )}
            {(['pscc', 'pefc'] as const).map((k) => (
              <div key={k} className="flex flex-wrap items-center gap-3">
                <p className="min-w-0 flex-1 text-[13.5px] text-white">
                  {k === 'pscc' ? 'Line to neutral — PSCC' : 'Line to earth — PEFC'}
                </p>
                <Meter value={origin[k]} unit="kA" label={k} />
                <button
                  type="button"
                  onClick={() => onUpdate({ [k]: pfcReading(k) } as Partial<OriginState>)}
                  className={testBtn}
                >
                  {origin[k] ? 'Test again' : 'Test'}
                </button>
              </div>
            ))}
            {learn && ipf && (
              <Explain ok>
                For the certificate: {origin.pscc} × 2 = {(Number(origin.pscc) * 2).toFixed(2)} kA,
                against a PEFC of {origin.pefc} kA — Ipf {ipf} kA.
              </Explain>
            )}
          </Card>

          <Card title="Phase sequence">
            {learn && (
              <p className="text-[13px] text-white">
                Reg 643.9: on a polyphase installation the sequence is maintained at all relevant
                points. Check it at the incoming terminals, and at the motor isolator once the board
                is energised — a motor on the wrong sequence runs backwards.
              </p>
            )}
            <ul className="space-y-3">
              {SEQ_POINTS.map((p) => {
                const r = origin.seq[p.id];
                const said = origin.verdicts[p.id];
                const dead = p.live === 'board' && !energised;
                const right = r && said === (r.shown === SEQ_RIGHT ? 'ok' : 'fault');
                return (
                  <li key={p.id} className="rounded-xl border border-white/[0.12] p-3.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold text-white">{p.label}</p>
                        <p className="text-[12.5px] text-white">{p.where}</p>
                      </div>
                      <p className="min-w-[7rem] rounded-lg border border-white/[0.18] bg-black px-3 py-1.5 text-right font-mono text-[16px] font-bold text-white">
                        {r ? r.shown : dead ? 'No supply' : '—'}
                      </p>
                      <button
                        type="button"
                        disabled={dead}
                        onClick={() => testSeq(p.id)}
                        className={testBtn}
                      >
                        {r ? 'Check again' : 'Check'}
                      </button>
                    </div>
                    {r && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {(['ok', 'fault'] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={said === v}
                            onClick={() =>
                              onUpdate({ verdicts: { ...origin.verdicts, [p.id]: v } })
                            }
                            className={chip(said === v)}
                          >
                            {v === 'ok' ? 'Sequence correct' : 'Sequence wrong'}
                          </button>
                        ))}
                      </div>
                    )}
                    {learn && r && said && (
                      <div className="mt-2.5">
                        <Explain ok={!!right}>
                          {r.shown === SEQ_RIGHT
                            ? `${SEQ_RIGHT}: the sequence is right here.`
                            : `${r.shown}: two lines are crossed. Isolate, put it right on circuit 4 (swap two lines at the isolator), then check again.`}
                        </Explain>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>

      <div className="border-t border-white/[0.1] bg-background px-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-[900px] items-center gap-3">
          <p className="min-w-0 flex-1 text-[13px] font-semibold text-white">
            {[origin.ze, origin.pscc, origin.pefc].filter(Boolean).length} of 3 readings ·{' '}
            {SEQ_POINTS.filter((p) => origin.verdicts[p.id]).length} of 2 sequences judged
            {origin.earthOff ? ' · earthing conductor off' : ''}
          </p>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
          >
            {done ? 'Origin done' : 'Back to the rig'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OriginView;
