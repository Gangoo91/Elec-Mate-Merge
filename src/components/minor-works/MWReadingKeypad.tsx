import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export interface KeypadStatus {
  tone: 'pass' | 'check';
  label: string;
}

interface MWReadingKeypadProps {
  /** Field key currently being entered — null hides the keypad */
  activeField: string | null;
  label: string;
  unit: string;
  value: string;
  /** Show the off-the-scale key (insulation resistance readings) */
  allowInfinity?: boolean;
  /**
   * What the off-the-scale key writes, e.g. '>1049' on a Kewtech KT66DL at
   * 500V (ELE-1438/1467). Defaults to '>999' — the old hardcoded value —
   * which is wrong for most testers, and was exactly the complaint.
   */
  infinityValue?: string;
  status?: KeypadStatus | null;
  hint?: string;
  isLastReading?: boolean;
  onChange: (value: string) => void;
  onNext: () => void;
  onClose: () => void;
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Site-glove numeric entry for test readings — big targets, one reading at a
 * time, explicit Next (reading lengths vary: 0.45, 28, >999 — auto-advance on
 * digit count would misfire). Fixed where the footer normally sits; the opaque
 * z-50 panel covers the z-40 sticky footer (tapping a key blurs the input, so
 * focus-based footer hiding does NOT apply — keep this panel opaque and above
 * z-40). Touch devices only — the caller gates on pointer coarseness, phones
 * and tablets alike.
 */
const MWReadingKeypad: React.FC<MWReadingKeypadProps> = ({
  activeField,
  label,
  unit,
  value,
  allowInfinity = false,
  infinityValue = '>999',
  status,
  hint,
  isLastReading = false,
  onChange,
  onNext,
  onClose,
}) => {
  const haptic = useHaptic();
  const open = activeField !== null;

  // A tap into any other text field means the user has moved on — get out of
  // the way and let the native keyboard have the space.
  useEffect(() => {
    if (!open) return;
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return;
      // Reading fields drive the keypad through their own onFocus — closing
      // here as well would race that update (last write wins → keypad dies
      // when hopping directly between readings). Only stand down for fields
      // that genuinely need the native keyboard.
      if (el.dataset.keypadField) return;
      onClose();
    };
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [open, activeField, onClose]);

  if (!open) return null;

  const press = (key: string) => {
    haptic.light();
    // An off-the-scale reading is atomic: any keypress replaces it whole,
    // rather than editing '>1049' into '>104'.
    const isOffScale = value === infinityValue || value.startsWith('>');
    if (key === 'del') {
      onChange(isOffScale ? '' : value.slice(0, -1));
      return;
    }
    if (key === 'inf') {
      onChange(infinityValue);
      return;
    }
    if (key === '.' && (value.includes('.') || isOffScale)) return;
    if (isOffScale) {
      onChange(key === '.' ? '0.' : key);
      return;
    }
    if (value.length >= 6) return;
    onChange(key === '.' && value === '' ? '0.' : value + key);
  };

  return (
    <div
      // FULLY opaque — any alpha/blur lets the sticky footer's volt button glow
      // through from behind (z-40, un-hidden the moment a key tap blurs the
      // input). preventDefault on pointerdown keeps focus on the reading input:
      // no blue focus ring on keys, and the footer's typing-hide holds.
      onPointerDown={(e) => e.preventDefault()}
      data-mw-keypad
      className="fixed bottom-0 right-0 z-50 px-4 pt-2 bg-background border-t border-white/[0.08] lg:px-8"
      style={{
        left: 'var(--sidebar-width, 0px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
      }}
    >
      {/* Reading header — label, live value, verdict */}
      <div className="flex items-center gap-3 pb-2">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white truncate">{label}</p>
          <p className="text-lg font-bold text-white tabular-nums leading-tight">
            {value === '' ? (
              <span className="text-white text-sm font-medium">Enter reading</span>
            ) : (
              <>
                {value}
                <span className="text-[13px] text-white font-semibold ml-1">{unit}</span>
              </>
            )}
          </p>
          {hint && !status && <p className="text-[10px] text-white truncate">{hint}</p>}
          {status && (
            <p
              className={cn(
                'text-[10px] font-semibold truncate',
                status.tone === 'pass' ? 'text-green-400' : 'text-red-400'
              )}
            >
              {status.label}
            </p>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'shrink-0 text-[11px] font-bold tracking-[0.08em] px-3 py-1.5 rounded-full border',
              status.tone === 'pass'
                ? 'bg-green-500/10 text-green-400 border-green-500/35'
                : 'bg-red-500/10 text-red-400 border-red-500/35'
            )}
          >
            {status.tone === 'pass' ? 'PASS' : 'CHECK'}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onClose();
          }}
          className="shrink-0 h-11 px-2 text-[12px] font-semibold text-white touch-manipulation active:scale-[0.97]"
        >
          Done
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {DIGITS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => press(d)}
            className="h-11 rounded-xl bg-white/[0.08] border border-white/[0.14] text-lg font-bold tabular-nums text-white touch-manipulation active:scale-[0.94] active:bg-white/[0.1] transition-transform"
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={() => press('.')}
          className="h-11 rounded-xl bg-white/[0.08] border border-white/[0.14] text-lg font-bold text-white touch-manipulation active:scale-[0.94] transition-transform"
        >
          .
        </button>
        <button
          type="button"
          onClick={() => press('0')}
          className="h-11 rounded-xl bg-white/[0.08] border border-white/[0.14] text-lg font-bold tabular-nums text-white touch-manipulation active:scale-[0.94] transition-transform"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => press('del')}
          className="h-11 rounded-xl bg-white/[0.08] border border-white/[0.14] text-[12px] font-bold text-white/80 touch-manipulation active:scale-[0.94] transition-transform"
        >
          Delete
        </button>
      </div>

      <div className="flex gap-1.5 mt-1.5">
        {allowInfinity && (
          <button
            type="button"
            onClick={() => press('inf')}
            className="h-11 px-4 rounded-xl bg-white/[0.08] border border-white/[0.14] text-[13px] font-bold text-white touch-manipulation active:scale-[0.96] transition-transform"
          >
            {infinityValue}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            haptic.medium();
            onNext();
          }}
          className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[14px] font-bold touch-manipulation active:scale-[0.97] transition-transform"
        >
          {isLastReading ? 'Finish readings' : 'Next reading'}
        </button>
      </div>
    </div>
  );
};

export default MWReadingKeypad;
