/**
 * MFTInstrument v7 — looks and works like the tester on the bench.
 *
 * Rebuilt 5 Oct 2026 (Andrew: "make it proper feel real"). v6 was a gold
 * rectangle with a strip of coloured pills and a black slot for a display.
 * A real multifunction tester is a dark moulded case in a coloured rubber
 * holster, with lead sockets along the top, a reflective grey-green LCD, a
 * rotary range switch and a big round TEST button — so that is what this is.
 * Ranges sit round the knob; tapping one turns the knob to it.
 *
 * The holster is SOLID volt (the house rule bans translucent yellow fills,
 * not solid ones).
 */

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { DialPosition, TestReading } from '@/types/am2-testing-simulator';
import { DIAL_POSITIONS } from '@/types/am2-testing-simulator';

interface MFTInstrumentProps {
  dialPosition: DialPosition;
  displayMode: 'idle' | 'testing' | 'result' | 'hold';
  reading: TestReading | null;
  onDialChange: (position: DialPosition) => void;
  onTest: () => void;
  testDisabled?: boolean;
  /** Highlights the range this test needs, until it's selected. */
  targetPosition?: DialPosition | null;
  /** Assessment: no ⚠ LIMIT flag — the learner judges the reading. */
  hideVerdict?: boolean;
}

/** What is printed on the faceplate beside each range. */
const FACE: Record<DialPosition, { label: string; sub?: string }> = {
  OFF: { label: 'OFF' },
  CONTINUITY: { label: 'Ω', sub: 'R₁+R₂' },
  IR_250V: { label: '250V', sub: 'MΩ' },
  IR_500V: { label: '500V', sub: 'MΩ' },
  LOOP_ZS: { label: 'Zs', sub: 'LOOP' },
  RCD_30: { label: '30', sub: 'mA' },
  RCD_100: { label: '100', sub: 'mA' },
  RCD_300: { label: '300', sub: 'mA' },
  PFC: { label: 'PFC', sub: 'kA' },
};

/** Ranges spread round the knob from 8 o'clock to 4 o'clock (240°). */
const SWEEP_START = -120;
const SWEEP = 240;
const angleOf = (i: number) => SWEEP_START + (SWEEP / (DIAL_POSITIONS.length - 1)) * i;

const HOLD_MS = 300;

/* ── LCD ───────────────────────────────────────────────────────────── */

function Lcd({
  dialPosition,
  displayMode,
  reading,
  hideVerdict,
}: Pick<MFTInstrumentProps, 'dialPosition' | 'displayMode' | 'reading' | 'hideVerdict'>) {
  const pos = DIAL_POSITIONS.find((p) => p.id === dialPosition);
  const off = dialPosition === 'OFF';
  const live = pos?.testCategory === 'live';
  const value =
    displayMode === 'testing'
      ? '- - -'
      : displayMode === 'result' && reading
        ? reading.displayValue
        : off
          ? ''
          : '- - - -';
  const unit = reading?.unit || pos?.unit || '';
  const fail = !hideVerdict && displayMode === 'result' && reading && !reading.compliant;
  const seg = off ? 'text-transparent' : 'text-[#1c2117]';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border-[3px] border-[#141517] px-3 pb-2 pt-1.5',
        'shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]'
      )}
      style={{
        background: off
          ? 'linear-gradient(160deg, #6f7766 0%, #5d6455 100%)'
          : 'linear-gradient(160deg, #c3cdb2 0%, #aab894 55%, #9dab88 100%)',
      }}
      aria-live="polite"
    >
      {/* Annunciators */}
      <div className={cn('flex items-center gap-2 font-mono text-[10px] font-bold', seg)}>
        <span>{pos?.label ?? ''}</span>
        {!off && (
          <span className="rounded-sm border border-current px-1 leading-tight">
            {live ? 'LIVE' : 'DEAD'}
          </span>
        )}
        {displayMode === 'testing' && <span className="animate-pulse">TESTING</span>}
        <span className="ml-auto flex items-center gap-0.5" aria-hidden>
          {/* battery */}
          <span className="inline-block h-2 w-4 rounded-[1px] border border-current p-[1px]">
            <span className="block h-full w-3/4 bg-current" />
          </span>
        </span>
      </div>

      {/* Main figure */}
      <div className="flex h-[58px] items-end justify-end gap-1.5">
        {fail && (
          <span className={cn('mb-2 mr-auto font-mono text-[11px] font-black', seg)}>⚠ LIMIT</span>
        )}
        <span
          className={cn(
            'font-mono text-[46px] font-bold leading-none tracking-tight tabular-nums',
            seg,
            displayMode === 'testing' && 'animate-pulse'
          )}
          style={{ textShadow: off ? 'none' : '1px 1px 0 rgba(0,0,0,0.12)' }}
        >
          {value}
        </span>
        <span className={cn('mb-1.5 w-8 font-mono text-[15px] font-bold', seg)}>
          {off ? '' : unit}
        </span>
      </div>
    </div>
  );
}

/* ── Rotary range switch ───────────────────────────────────────────── */

function RangeDial({
  dialPosition,
  onDialChange,
  targetPosition,
}: Pick<MFTInstrumentProps, 'dialPosition' | 'onDialChange' | 'targetPosition'>) {
  const index = Math.max(
    0,
    DIAL_POSITIONS.findIndex((p) => p.id === dialPosition)
  );
  const pointer = angleOf(index);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[260px]">
      {/* Range labels on the faceplate */}
      {DIAL_POSITIONS.map((p, i) => {
        const a = (angleOf(i) * Math.PI) / 180;
        const r = 42; // % of the box from centre
        const x = 50 + r * Math.sin(a);
        const y = 50 - r * Math.cos(a);
        const on = p.id === dialPosition;
        const target = !on && targetPosition === p.id;
        const face = FACE[p.id];
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onDialChange(p.id)}
            aria-pressed={on}
            aria-label={`Range ${p.label}`}
            className={cn(
              'absolute flex h-11 w-12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg leading-none touch-manipulation transition-colors',
              on
                ? 'bg-elec-yellow text-black'
                : target
                  ? 'text-white ring-2 ring-elec-yellow'
                  : 'text-white hover:bg-white/[0.08]'
            )}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                'text-[13px] font-black',
                !on && p.testCategory === 'live' && 'text-[#ff8a7a]'
              )}
            >
              {face.label}
            </span>
            {face.sub && <span className="mt-0.5 text-[8.5px] font-bold">{face.sub}</span>}
          </button>
        );
      })}

      {/* Dead / live bands printed on the face */}
      <span className="pointer-events-none absolute left-1/2 top-[50%] -translate-x-1/2 translate-y-[64px] whitespace-nowrap text-[9px] font-bold tracking-[0.18em] text-white">
        DEAD · <span className="text-[#ff8a7a]">LIVE</span>
      </span>

      {/* The knob */}
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#101113] p-[6%] shadow-[0_6px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div
          className="relative h-full w-full rounded-full transition-transform duration-200 ease-out"
          style={{
            transform: `rotate(${pointer}deg)`,
            background: 'radial-gradient(circle at 35% 30%, #4a4d53 0%, #2a2c30 55%, #1a1b1e 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 1px 0 rgba(0,0,0,0.5)',
          }}
        >
          {/* grip bar */}
          <div className="absolute left-1/2 top-[6%] h-[88%] w-[26%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#3a3d42] to-[#232528] shadow-[0_0_0_1px_rgba(0,0,0,0.5)]" />
          {/* pointer */}
          <div className="absolute left-1/2 top-[8%] h-[22%] w-[7%] -translate-x-1/2 rounded-full bg-elec-yellow" />
        </div>
      </div>
    </div>
  );
}

/* ── The instrument ────────────────────────────────────────────────── */

export function MFTInstrument({
  dialPosition,
  displayMode,
  reading,
  onDialChange,
  onTest,
  testDisabled,
  targetPosition,
  hideVerdict,
}: MFTInstrumentProps) {
  const [pressed, setPressed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disabled = testDisabled || dialPosition === 'OFF';

  const down = useCallback(() => {
    if (disabled) return;
    setPressed(true);
    timer.current = setTimeout(onTest, HOLD_MS);
  }, [disabled, onTest]);
  const up = useCallback(() => {
    setPressed(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  return (
    <div className="select-none">
      {/* Holster */}
      <div className="rounded-[26px] bg-elec-yellow p-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-3px_0_rgba(0,0,0,0.18)]">
        {/* Case */}
        <div className="rounded-[18px] bg-gradient-to-b from-[#2e3034] to-[#1d1e21] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-4">
          {/* Lead sockets */}
          <div className="mb-3 flex items-center justify-center gap-5" aria-hidden>
            {[
              { c: '#c62828', l: 'L' },
              { c: '#1565c0', l: 'N' },
              { c: '#2e7d32', l: 'E' },
            ].map((s) => (
              <span key={s.l} className="flex flex-col items-center gap-1">
                <span
                  className="h-4 w-4 rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]"
                  style={{ background: s.c }}
                >
                  <span className="m-[5px] block h-1.5 w-1.5 rounded-full bg-black/80" />
                </span>
                <span className="text-[9px] font-bold text-white">{s.l}</span>
              </span>
            ))}
          </div>

          <Lcd
            dialPosition={dialPosition}
            displayMode={displayMode}
            reading={reading}
            hideVerdict={hideVerdict}
          />

          <div className="mt-2 grid grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <RangeDial
              dialPosition={dialPosition}
              onDialChange={onDialChange}
              targetPosition={targetPosition}
            />

            {/* TEST */}
            <div className="flex flex-col items-center gap-2 pb-1 sm:pb-0 sm:pr-1">
              <button
                type="button"
                onPointerDown={down}
                onPointerUp={up}
                onPointerLeave={up}
                onPointerCancel={up}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                    e.preventDefault();
                    onTest();
                  }
                }}
                disabled={disabled}
                aria-label="Test — press and hold"
                className={cn(
                  'flex h-[84px] w-[84px] items-center justify-center rounded-full border-[5px] border-[#101113] touch-manipulation transition-transform',
                  disabled
                    ? 'bg-[#3a3c40] text-white'
                    : 'bg-elec-yellow text-black shadow-[0_5px_0_#8a6d00,0_8px_14px_rgba(0,0,0,0.5)]',
                  pressed && !disabled && 'translate-y-[4px] shadow-[0_1px_0_#8a6d00]'
                )}
              >
                <span className="text-[17px] font-black tracking-wide">TEST</span>
              </button>
              <span className="text-center text-[10.5px] font-semibold leading-tight text-white">
                {dialPosition === 'OFF' ? 'Pick a range' : 'Press and hold'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
