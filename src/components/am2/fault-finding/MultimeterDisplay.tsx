/**
 * MultimeterDisplay
 *
 * Animated SVG multimeter with LCD display, mode selector,
 * and spring-physics reading animation.
 * Designed to look like a real Fluke/Megger on screen.
 */

import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TestMode } from '@/data/am2-fault-scenarios';

interface MultimeterDisplayProps {
  reading: string | null; // "0.35", "OL", "150.0", null = blank
  unit: string; // "Ω", "MΩ"
  mode: TestMode;
  isAbnormal: boolean;
  testLabel?: string; // What we're testing, e.g. "L to CPC"
  onModeChange?: (mode: TestMode) => void;
}

export function MultimeterDisplay({
  reading,
  unit,
  mode,
  isAbnormal,
  testLabel,
  onModeChange,
}: MultimeterDisplayProps) {
  const [displayReading, setDisplayReading] = useState<string>('---');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate reading change
  useEffect(() => {
    if (reading === null) {
      setDisplayReading('---');
      return;
    }

    setIsAnimating(true);

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
          setIsAnimating(false);
        }
      }, 150);
      return () => clearInterval(interval);
    }

    // Numeric reading — count up animation
    const target = parseFloat(reading);
    if (isNaN(target)) {
      setDisplayReading(reading);
      setIsAnimating(false);
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
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [reading]);

  const isOverload = reading === 'OL';

  return (
    <div className="relative">
      {/* Meter body */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {/* Brand strip */}
        <div className="bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-cyan-500/20 px-4 py-1.5 border-b border-white/5">
          <p className="text-[10px] font-bold text-cyan-400/80 tracking-widest text-center uppercase">
            Multimeter
          </p>
        </div>

        {/* LCD Display */}
        <div className="mx-3 mt-3 mb-2">
          <div
            className={cn(
              'relative rounded-xl px-4 py-4 border transition-colors duration-300',
              isAbnormal && reading !== null
                ? 'bg-red-950/40 border-red-500/30'
                : 'bg-[#0a0f1a] border-white/5'
            )}
          >
            {/* LCD scan line effect */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
            </div>

            {/* Test label */}
            {testLabel && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-white/40 font-medium mb-1 truncate"
              >
                {testLabel}
              </motion.p>
            )}

            {/* Reading */}
            <div className="flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.span
                  key={reading || 'blank'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'text-3xl font-mono font-bold tracking-wider tabular-nums',
                    reading === null
                      ? 'text-white/20'
                      : isOverload
                        ? 'text-amber-400'
                        : isAbnormal
                          ? 'text-red-400'
                          : 'text-emerald-400'
                  )}
                >
                  {displayReading}
                </motion.span>
              </AnimatePresence>

              <span
                className={cn(
                  'text-sm font-medium mb-1 ml-2',
                  reading === null ? 'text-white/20' : 'text-white/60'
                )}
              >
                {isOverload ? '' : unit}
              </span>
            </div>

            {/* Status indicator */}
            {reading !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1.5 flex items-center gap-1.5"
              >
                <div
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    isAbnormal ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                  )}
                />
                <span className="text-[10px] text-white/40">
                  {isOverload
                    ? 'No continuity — open circuit'
                    : isAbnormal
                      ? 'Abnormal reading'
                      : 'Normal reading'}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mode selector */}
        <div className="px-3 pb-3">
          <div className="flex gap-1.5">
            <button
              onClick={() => onModeChange?.('continuity')}
              className={cn(
                'flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                mode === 'continuity'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-white/5 text-white/40 border border-white/10'
              )}
            >
              Ω Continuity
            </button>
            <button
              onClick={() => onModeChange?.('insulation')}
              className={cn(
                'flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                mode === 'insulation'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-white/5 text-white/40 border border-white/10'
              )}
            >
              MΩ Insulation
            </button>
          </div>
        </div>

        {/* Probe leads */}
        <div className="flex items-center justify-center gap-6 pb-3 px-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <div className="h-[2px] w-8 bg-red-500/40 rounded-full" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-[2px] w-8 bg-blue-500/40 rounded-full" />
            <div className="h-3 w-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultimeterDisplay;
