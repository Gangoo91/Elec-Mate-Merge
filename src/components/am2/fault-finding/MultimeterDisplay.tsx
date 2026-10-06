/**
 * MultimeterDisplay
 *
 * The Section D tester. Restyled 6 Oct 2026 to match the Section B MFT: a
 * dark case in a solid volt holster, a reflective grey-green LCD, a two-way
 * range switch and the lead sockets. The verdict line and the pink LCD only
 * show in Learn mode (showVerdict) — otherwise you judge the reading.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TestMode } from '@/data/am2-fault-scenarios';

interface MultimeterDisplayProps {
  reading: string | null; // "0.35", "OL", "150.0", null = blank
  unit: string; // "Ω", "MΩ"
  mode: TestMode;
  isAbnormal: boolean;
  /** Learn mode only: colour the reading and say normal/abnormal. Off, you judge it. */
  showVerdict?: boolean;
  testLabel?: string; // What we're testing, e.g. "L to CPC"
  onModeChange?: (mode: TestMode) => void;
}

export function MultimeterDisplay({
  reading,
  unit,
  mode,
  isAbnormal,
  showVerdict = true,
  testLabel,
  onModeChange,
}: MultimeterDisplayProps) {
  const [displayReading, setDisplayReading] = useState<string>('---');

  // Animate reading change
  useEffect(() => {
    if (reading === null) {
      setDisplayReading('---');
      return;
    }

    if (reading === 'OL') {
      // Flash effect for overload
      const steps = ['- - -', '. . .', 'O L'];
      let step = 0;
      const interval = setInterval(() => {
        setDisplayReading(steps[step]);
        step++;
        if (step >= steps.length) {
          clearInterval(interval);
          setDisplayReading('O L');
        }
      }, 150);
      return () => clearInterval(interval);
    }

    // Numeric reading — count up animation
    const target = parseFloat(reading);
    if (isNaN(target)) {
      setDisplayReading(reading);
      return;
    }

    const duration = 600;
    const startTime = Date.now();
    const startVal = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * eased;

      if (target >= 100) {
        setDisplayReading(current.toFixed(0));
      } else if (target >= 10) {
        setDisplayReading(current.toFixed(1));
      } else {
        setDisplayReading(current.toFixed(2));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayReading(reading);
      }
    };

    requestAnimationFrame(animate);
  }, [reading]);

  const isOverload = reading === 'OL';
  const showStatus = showVerdict && reading !== null;
  const segColour =
    !showVerdict || reading === null
      ? 'text-[#1c2117]'
      : isAbnormal
        ? 'text-[#7a1010]'
        : 'text-[#1c2117]';

  return (
    <div className="select-none">
      {/* Holster — solid volt, as on the Section B tester */}
      <div className="rounded-[24px] bg-elec-yellow p-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-3px_0_rgba(0,0,0,0.18)]">
        <div className="rounded-[16px] bg-gradient-to-b from-[#2e3034] to-[#1d1e21] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-4">
          <p className="mb-2 text-center text-[10px] font-bold tracking-[0.2em] text-white">
            INSULATION · CONTINUITY TESTER
          </p>

          {/* LCD */}
          <div
            className="rounded-lg border-[3px] border-[#141517] px-3 pb-2 pt-1.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]"
            style={{
              background:
                showVerdict && isAbnormal && reading !== null
                  ? 'linear-gradient(160deg, #e2b4ad 0%, #d39a92 100%)'
                  : 'linear-gradient(160deg, #c3cdb2 0%, #aab894 55%, #9dab88 100%)',
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#1c2117]">
              <span>{mode === 'continuity' ? 'Ω' : 'MΩ 500V'}</span>
              <span className="truncate">{testLabel ?? ''}</span>
            </div>
            <div className="flex h-[52px] items-end justify-end gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={reading || 'blank'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'font-mono text-[40px] font-bold leading-none tracking-tight tabular-nums',
                    segColour
                  )}
                >
                  {displayReading}
                </motion.span>
              </AnimatePresence>
              <span className="mb-1 w-9 font-mono text-[14px] font-bold text-[#1c2117]">
                {isOverload ? '' : unit}
              </span>
            </div>
            {showStatus && (
              <p className="font-mono text-[10.5px] font-bold text-[#1c2117]">
                {isOverload
                  ? 'NO CONTINUITY — OPEN CIRCUIT'
                  : isAbnormal
                    ? 'ABNORMAL READING'
                    : 'NORMAL READING'}
              </p>
            )}
          </div>

          {/* Range switch */}
          <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Range">
            {(
              [
                ['continuity', 'Ω', 'Continuity'],
                ['insulation', 'MΩ', 'Insulation 500 V'],
              ] as const
            ).map(([m, sym, label]) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => onModeChange?.(m)}
                className={cn(
                  'flex h-12 flex-col items-center justify-center rounded-xl leading-tight touch-manipulation transition-colors',
                  mode === m
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.18] text-white hover:border-white/[0.35]'
                )}
              >
                <span className="text-[15px] font-black">{sym}</span>
                <span className="text-[10.5px] font-semibold">{label}</span>
              </button>
            ))}
          </div>

          {/* Lead sockets */}
          <div className="mt-3 flex items-center justify-center gap-6" aria-hidden>
            {[
              { c: '#c62828', l: 'RED' },
              { c: '#16181b', l: 'BLACK' },
            ].map((x) => (
              <span key={x.l} className="flex flex-col items-center gap-1">
                <span
                  className="h-4 w-4 rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]"
                  style={{ background: x.c, border: '1px solid #3a3d42' }}
                >
                  <span className="m-[5px] block h-1.5 w-1.5 rounded-full bg-black/80" />
                </span>
                <span className="text-[9px] font-bold text-white">{x.l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultimeterDisplay;
