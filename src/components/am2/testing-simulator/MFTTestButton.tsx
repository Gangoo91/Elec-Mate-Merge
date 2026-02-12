/**
 * MFTTestButton v3 — Full-Width Bar
 *
 * When fullWidth=true: renders as a full-width rectangular bar (44px tall).
 * When fullWidth=false/undefined: renders as 52px circle (legacy).
 * 300ms hold-to-trigger. Visual depth and press animation.
 */

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MFTTestButtonProps {
  onTest: () => void;
  disabled?: boolean;
  isActive?: boolean;
  fullWidth?: boolean;
}

const HOLD_DURATION = 300; // ms

export function MFTTestButton({ onTest, disabled, isActive, fullWidth }: MFTTestButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerDown = useCallback(() => {
    if (disabled) return;
    setIsPressed(true);

    holdTimerRef.current = setTimeout(() => {
      onTest();
    }, HOLD_DURATION);
  }, [disabled, onTest]);

  const handlePointerUp = useCallback(() => {
    setIsPressed(false);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsPressed(false);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  if (fullWidth) {
    return (
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
        disabled={disabled}
        className={cn(
          'relative w-full touch-manipulation select-none focus:outline-none',
          'h-11 rounded-xl overflow-hidden',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
        aria-label="Test button — hold to test"
      >
        {/* Outer shadow well */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(180deg, #1f1a14 0%, #2a2018 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
          }}
        />

        {/* Button body */}
        <div
          className={cn(
            'absolute rounded-xl transition-all',
            isPressed ? 'inset-[3px]' : 'inset-[2px]'
          )}
          style={{
            background: isActive
              ? 'linear-gradient(170deg, #fb923c 0%, #ea580c 40%, #c2410c 100%)'
              : 'linear-gradient(170deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%)',
            boxShadow: isPressed
              ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
              : '0 2px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.15)',
            transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
            transition: 'all 0.1s ease-out',
          }}
        >
          {/* Top highlight */}
          <div
            className="absolute top-[2px] left-[15%] right-[15%] h-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
          />

          {/* TEST label */}
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <span
              className="text-xs font-bold tracking-widest text-white/90 select-none"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
            >
              HOLD TO TEST
            </span>
          </div>
        </div>

        {/* Active glow */}
        {isActive && !disabled && (
          <div
            className="absolute -inset-0.5 rounded-xl animate-pulse pointer-events-none"
            style={{
              border: '2px solid rgba(251,146,60,0.3)',
              boxShadow: '0 0 10px rgba(251,146,60,0.2)',
            }}
          />
        )}
      </button>
    );
  }

  // Circle variant (fallback)
  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerUp}
      disabled={disabled}
      className={cn(
        'relative touch-manipulation select-none focus:outline-none',
        'w-[52px] h-[52px] rounded-full',
        disabled && 'opacity-40 cursor-not-allowed'
      )}
      aria-label="Test button"
    >
      {/* Outer ring (shadow well) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #1f1a14 0%, #2a2018 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
        }}
      />

      {/* Button body */}
      <div
        className={cn(
          'absolute rounded-full transition-all',
          isPressed ? 'inset-[3px]' : 'inset-[2px]'
        )}
        style={{
          background: isActive
            ? 'linear-gradient(170deg, #fb923c 0%, #ea580c 40%, #c2410c 100%)'
            : 'linear-gradient(170deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%)',
          boxShadow: isPressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
            : '0 2px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.15)',
          transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
          transition: 'all 0.1s ease-out',
        }}
      >
        {/* Top highlight */}
        <div
          className="absolute top-[2px] left-[20%] right-[20%] h-[2px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />

        {/* TEST label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[10px] font-bold tracking-wider text-white/90 select-none"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
          >
            TEST
          </span>
        </div>
      </div>

      {/* Active ring glow */}
      {isActive && !disabled && (
        <div
          className="absolute -inset-1 rounded-full animate-pulse pointer-events-none"
          style={{
            border: '2px solid rgba(251,146,60,0.3)',
            boxShadow: '0 0 10px rgba(251,146,60,0.2)',
          }}
        />
      )}
    </button>
  );
}
