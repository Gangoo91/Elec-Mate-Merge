import React, { useCallback, useId, useMemo, useState } from 'react';
import ReadingKeypad, { KeypadStatus } from '@/components/inspection/shared/ReadingKeypad';

export interface ReadingMeta {
  label: string;
  unit: string;
  /** Show the >999 key (insulation readings). */
  inf?: boolean;
  hint?: string;
}

interface UseReadingKeypadOptions {
  /** Every field the keypad can serve — render source for the keypad header. */
  meta: Record<string, ReadingMeta>;
  /** Explicit Next-reading order. Fields outside it advance through DOM order. */
  sequence?: string[];
  /** Current value for a field. */
  getValue: (field: string) => string;
  /** Write a value back (the cert's onUpdate). */
  setValue: (field: string, value: string) => void;
  /** Optional live verdict for the keypad header (PASS / CHECK chip). */
  getStatus?: (field: string, value: string) => KeypadStatus | null;
}

/**
 * Shared numeric reading keypad wiring — the proven Minor Works pattern for
 * every cert. Touch devices (any size — phones, iPads, sub-desktop windows)
 * get the keypad via pointer coarseness; wide mouse-first machines keep native
 * typing. inputMode='none' only suppresses VIRTUAL keyboards, so a hardware
 * keyboard can always type either way — the input can never go dead.
 *
 * Usage:
 *   const keypad = useReadingKeypad({ meta, sequence, getValue, setValue, getStatus });
 *   <Input {...keypad.field('zdb')} ... />          // spread on each reading input
 *   {keypad.spacer}                                  // once, at the end of the scroll area
 *   {keypad.element}                                 // once, near the root
 */
export const useReadingKeypad = ({
  meta,
  sequence = [],
  getValue,
  setValue,
  getStatus,
}: UseReadingKeypadOptions) => {
  const [coarsePointer] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)
  );
  const [activeField, setActiveField] = useState<string | null>(null);
  // Instance id — multiple hosts can coexist (one per board panel); the keypad
  // closes itself when a field owned by a different instance takes focus.
  const ownerId = useId();

  /** Scroll a reading so it sits fully ABOVE the keypad panel. Centring is
   * wrong here — with the keypad owning the lower part of the screen, the
   * viewport centre is roughly the cut line, leaving the field half-hidden.
   * Double rAF lets the keypad mount before measuring its real top edge. */
  const scrollClearOfKeypad = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const panel = document.querySelector('[data-reading-keypad]');
        const keypadTop = panel ? panel.getBoundingClientRect().top : window.innerHeight * 0.6;
        const rect = el.getBoundingClientRect();
        const clearance = 32; // room for the verdict line under the input
        const headerBottom = 175; // app header + fixed cert shell (title + step tabs)
        const needed = rect.bottom + clearance - keypadTop;
        if (needed <= 0) return;
        const allowed = Math.max(0, rect.top - headerBottom);
        const delta = Math.min(needed, allowed);
        // Sheet-hosted readings (e.g. the PAT appliance sheet) scroll inside an
        // overflow container, not the window — walk up to the nearest
        // scrollable ancestor and scroll THAT.
        let scroller: HTMLElement | null = el.parentElement;
        while (scroller) {
          const style = window.getComputedStyle(scroller);
          if (
            /(auto|scroll)/.test(style.overflowY) &&
            scroller.scrollHeight > scroller.clientHeight
          ) {
            break;
          }
          scroller = scroller.parentElement;
        }
        if (scroller) {
          scroller.scrollBy({ top: delta, behavior: 'smooth' });
        } else {
          window.scrollBy({ top: delta, behavior: 'smooth' });
        }
      })
    );
  }, []);

  /** Props to spread on a reading input. Desktop keeps native typing. */
  const field = useCallback(
    (name: string) =>
      coarsePointer
        ? {
            inputMode: 'none' as const,
            autoComplete: 'off',
            'data-keypad-field': name,
            'data-keypad-owner': ownerId,
            onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
              setActiveField(name);
              scrollClearOfKeypad(e.currentTarget);
            },
          }
        : {},
    [coarsePointer, ownerId, scrollClearOfKeypad]
  );

  /** A reading the keypad may write into: rendered, enabled and editable —
   * skips LIM-marked/disabled and read-only inputs on advance. */
  const isUsable = (el: HTMLElement | null): el is HTMLElement => {
    if (!el || el.offsetParent === null) return false;
    const input = el as HTMLInputElement;
    return !input.disabled && !input.readOnly;
  };

  const fieldEl = (name: string) =>
    document.querySelector<HTMLElement>(`[data-keypad-field="${name}"]`);

  /** Next USABLE reading input after `current`, in DOM order — used when the
   * active field sits outside the main sequence. */
  const nextVisibleField = useCallback((current: string): string | null => {
    const fields = Array.from(document.querySelectorAll<HTMLElement>('[data-keypad-field]'));
    const ix = fields.findIndex((el) => el.dataset.keypadField === current);
    if (ix === -1) return null;
    const nextEl = fields.slice(ix + 1).find((el) => isUsable(el));
    return nextEl?.dataset.keypadField || null;
  }, []);

  /** Next usable field in the explicit sequence, skipping disabled/read-only. */
  const nextInSequence = useCallback(
    (current: string): string | null => {
      const ix = sequence.indexOf(current);
      if (ix === -1) return null;
      for (let i = ix + 1; i < sequence.length; i++) {
        if (isUsable(fieldEl(sequence[i]))) return sequence[i];
      }
      return null;
    },
    [sequence]
  );

  const advance = useCallback(() => {
    const current = activeField || '';
    const next =
      sequence.indexOf(current) === -1 ? nextVisibleField(current) : nextInSequence(current);
    if (!next) {
      setActiveField(null);
      return;
    }
    setActiveField(next);
    scrollClearOfKeypad(fieldEl(next));
  }, [activeField, sequence, nextVisibleField, nextInSequence, scrollClearOfKeypad]);

  const isLastReading = useMemo(() => {
    if (!activeField) return false;
    return sequence.indexOf(activeField) === -1
      ? nextVisibleField(activeField) === null
      : nextInSequence(activeField) === null;
  }, [activeField, sequence, nextVisibleField, nextInSequence]);

  const reading = activeField ? meta[activeField] : null;
  const rawValue = activeField ? getValue(activeField) || '' : '';

  /** Scroll room so even the last reading on the page can rise clear of the
   * keypad panel — render once at the end of the scrollable content. */
  const spacer =
    coarsePointer && activeField ? <div className="h-[300px]" aria-hidden="true" /> : null;

  const element =
    coarsePointer && activeField && reading ? (
      <ReadingKeypad
        activeField={activeField}
        ownerId={ownerId}
        label={reading.label}
        unit={reading.unit}
        value={rawValue}
        allowInfinity={!!reading.inf}
        status={getStatus ? getStatus(activeField, rawValue) : null}
        hint={reading.hint}
        isLastReading={isLastReading}
        onChange={(v) => setValue(activeField, v)}
        onNext={advance}
        onClose={() => setActiveField(null)}
      />
    ) : null;

  return { coarsePointer, activeField, field, spacer, element };
};

export default useReadingKeypad;
