import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export interface KeypadStatus {
  tone: 'pass' | 'check';
  label: string;
}

interface ReadingKeypadProps {
  /** Field key currently being entered — null hides the keypad */
  activeField: string | null;
  label: string;
  unit: string;
  value: string;
  /** Show the >999 key (insulation resistance readings) */
  allowInfinity?: boolean;
  status?: KeypadStatus | null;
  hint?: string;
  isLastReading?: boolean;
  /** Instance id — lets multiple keypad hosts coexist (e.g. one per board):
   * focusing a field owned by ANOTHER instance closes this panel. */
  ownerId?: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onClose: () => void;
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Shared site-glove numeric entry for test readings — the Minor Works keypad,
 * generalised for every cert (EIC, specialists, EICR). Big targets, one reading
 * at a time, explicit Next (reading lengths vary: 0.45, 28, >999 — auto-advance
 * on digit count would misfire). Fixed where the sticky footer normally sits;
 * the OPAQUE z-50 panel covers the z-40 footer, and preventDefault on
 * pointerdown keeps focus on the reading input so the footer's typing-hide
 * holds and keys never grab a focus ring. Touch devices only — callers gate on
 * pointer coarseness via useReadingKeypad.
 */
const ReadingKeypad: React.FC<ReadingKeypadProps> = ({
  activeField,
  label,
  unit,
  value,
  allowInfinity = false,
  status,
  hint,
  isLastReading = false,
  ownerId,
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
      if (el.dataset.keypadField) {
        // Same-instance hops are driven by the field's own onFocus — closing
        // here as well would race that update (last write wins → keypad dies
        // when hopping directly between readings). But a reading owned by a
        // DIFFERENT keypad instance (another board's panel) must close this
        // one, or two panels stack.
        if (ownerId && el.dataset.keypadOwner && el.dataset.keypadOwner !== ownerId) {
          onClose();
        }
        return;
      }
      onClose();
    };
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [open, activeField, ownerId, onClose]);

  if (!open) return null;

  const press = (key: string) => {
    haptic.light();
    if (key === 'del') {
      onChange(value === '>999' ? '' : value.slice(0, -1));
      return;
    }
    if (key === 'inf') {
      onChange('>999');
      return;
    }
    if (key === '.' && (value.includes('.') || value === '>999')) return;
    if (value === '>999') {
      onChange(key === '.' ? '0.' : key);
      return;
    }
    if (value.length >= 6) return;
    onChange(key === '.' && value === '' ? '0.' : value + key);
  };

  return (
    <div
      onPointerDown={(e) => e.preventDefault()}
      data-reading-keypad
      className="fixed bottom-0 right-0 z-50 px-4 pt-2 bg-background border-t border-white/[0.08] lg:px-8"
      style={{
        left: 'var(--sidebar-width, 0px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
      }}
    >
      {/* Reading header — label, live value, verdict */}
      <div className="flex items-center gap-3 pb-2">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white/60 truncate">{label}</p>
          <p className="text-lg font-bold text-white tabular-nums leading-tight">
            {value === '' ? (
              <span className="text-white/40 text-sm font-medium">Enter reading</span>
            ) : (
              <>
                {value}
                <span className="text-[13px] text-white/60 font-semibold ml-1">{unit}</span>
              </>
            )}
          </p>
          {hint && !status && <p className="text-[10px] text-white/50 truncate">{hint}</p>}
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
          className="shrink-0 h-11 px-2 text-[12px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
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
            &gt;999
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

export default ReadingKeypad;
