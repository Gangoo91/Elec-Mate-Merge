/**
 * MFTInstrument v6 — Compact Card Layout
 *
 * No SVG rotary dial — replaced with a pill selector row.
 * Layout (top to bottom, ~130px total):
 *   1. LCD display (compact)
 *   2. Mode pill selector (scrollable, colour-coded)
 *   3. TEST button (full width)
 * Yellow/grey Megger-style body wraps everything.
 */

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { DialPosition, TestReading } from '@/types/am2-testing-simulator';
import { DIAL_POSITIONS } from '@/types/am2-testing-simulator';
import { MFTLCDDisplay } from './MFTLCDDisplay';
import { MFTTestButton } from './MFTTestButton';

interface MFTInstrumentProps {
  dialPosition: DialPosition;
  displayMode: 'idle' | 'testing' | 'result' | 'hold';
  reading: TestReading | null;
  onDialChange: (position: DialPosition) => void;
  onTest: () => void;
  testDisabled?: boolean;
}

/** Short labels for the pill buttons */
const PILL_LABELS: Record<string, string> = {
  OFF: 'OFF',
  CONTINUITY: 'Ω',
  IR_250V: '250V',
  IR_500V: '500V',
  LOOP_ZS: 'Zs',
  RCD_30: '30mA',
  RCD_100: '100mA',
  RCD_300: '300mA',
  PFC: 'PFC',
};

/** Pill colour based on test category — high contrast on yellow body */
function pillStyle(
  pos: (typeof DIAL_POSITIONS)[number],
  isActive: boolean
): { bg: string; text: string; border: string } {
  if (isActive) {
    return {
      bg: '#164e63',
      text: '#22d3ee',
      border: '#22d3ee',
    };
  }
  if (pos.id === 'OFF') {
    return {
      bg: '#1f2937',
      text: '#e5e7eb',
      border: '#374151',
    };
  }
  if (pos.testCategory === 'dead') {
    return {
      bg: '#1c1917',
      text: '#fbbf24',
      border: '#78350f',
    };
  }
  // live
  return {
    bg: '#1c1917',
    text: '#f87171',
    border: '#7f1d1d',
  };
}

export function MFTInstrument({
  dialPosition,
  displayMode,
  reading,
  onDialChange,
  onTest,
  testDisabled,
}: MFTInstrumentProps) {
  const isOff = dialPosition === 'OFF';
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active pill into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [dialPosition]);

  return (
    <div className="relative mx-auto select-none w-full">
      {/* ── Instrument Body ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            'linear-gradient(175deg, #d4a826 0%, #c49820 25%, #b8901c 50%, #a07818 75%, #8a6a16 100%)',
          boxShadow:
            '0 4px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)',
            backgroundSize: '4px 4px',
          }}
        />

        {/* Grey rubber grip — top */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
          style={{
            background: 'linear-gradient(180deg, #4b5563 0%, #6b7280 100%)',
          }}
        />

        {/* Grey rubber grip — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl"
          style={{
            background: 'linear-gradient(0deg, #374151 0%, #4b5563 60%, transparent 100%)',
          }}
        />

        {/* ── Content ── */}
        <div className="relative px-3 pt-3 pb-3">
          {/* Brand label */}
          <p
            className="text-[7px] font-bold tracking-[0.15em] text-white/40 mb-1 text-center"
            style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}
          >
            ELEC-MATE MFT
          </p>

          {/* LCD Display */}
          <div className="w-full mb-2">
            <MFTLCDDisplay
              dialPosition={dialPosition}
              displayMode={displayMode}
              reading={reading}
            />
          </div>

          {/* ── Mode Selector Pills ── */}
          <div
            ref={scrollRef}
            className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {DIAL_POSITIONS.map((pos) => {
              const isActive = pos.id === dialPosition;
              const style = pillStyle(pos, isActive);

              return (
                <button
                  key={pos.id}
                  data-active={isActive}
                  onClick={() => onDialChange(pos.id)}
                  className={cn(
                    'shrink-0 h-8 px-3 rounded-lg text-[11px] font-bold',
                    'touch-manipulation transition-all duration-150',
                    'border',
                    isActive && 'ring-1 ring-cyan-400/30'
                  )}
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    borderColor: style.border,
                  }}
                >
                  {PILL_LABELS[pos.id] || pos.id}
                </button>
              );
            })}
          </div>

          {/* ── TEST Button (full width) ── */}
          <MFTTestButton
            onTest={onTest}
            disabled={testDisabled || isOff}
            isActive={displayMode === 'testing'}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
