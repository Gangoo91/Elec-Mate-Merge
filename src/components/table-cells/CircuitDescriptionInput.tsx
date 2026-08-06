/**
 * Circuit description with preset suggestions as you type.
 *
 * The description was a plain text box, so naming a circuit and specifying it
 * were two separate jobs: type "Kitchen Ring", then open the preset sheet
 * (four taps) to get the device, cable and RCD. Typing "kit" and tapping
 * *Kitchen Ring · 32A Type B RCBO · 2.5/1.5mm²* now does both at once.
 *
 * It stays a free-text field. Real schedules are full of descriptions no preset
 * list will ever hold — "Kitchen, Bed 2, Hall Sockets" is from a live
 * certificate — so suggestions appear alongside what you are typing and never
 * replace it. Nothing is applied without an explicit tap.
 */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TestResult } from '@/types/testResult';
import {
  CircuitPreset,
  describePreset,
  searchCircuitPresets,
} from '@/constants/circuitPresets';
import { cn } from '@/lib/utils';

interface CircuitDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Fires on blur — used for the "type spare to N/A everything" shortcut. */
  onCommit?: (value: string) => void;
  /** Applies a preset's device, cable and RCD fields in one write. */
  onApplyPreset?: (updates: Partial<TestResult>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CircuitDescriptionInput: React.FC<CircuitDescriptionInputProps> = ({
  value,
  onChange,
  onCommit,
  onApplyPreset,
  placeholder,
  className,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // Viewport coordinates for the suggestion list.
  //
  // The list cannot live inside the cell. The schedule is a 30-column grid in an
  // `overflow: auto` container with sticky way/description columns, so an
  // absolutely-positioned child is clipped by the scroll box AND painted over by
  // the sticky cells — it appeared as a sliver behind the next row. Rendering it
  // into `document.body` at fixed coordinates escapes both.
  const [anchor, setAnchor] = useState<{ left: number; top: number; width: number } | null>(null);
  // Suppresses the list after a preset is applied, so it does not immediately
  // reopen matching the name it just wrote.
  const justAppliedRef = useRef(false);

  const matches = useMemo<CircuitPreset[]>(
    () => (onApplyPreset ? searchCircuitPresets(value) : []),
    [value, onApplyPreset]
  );

  const showList = open && !disabled && matches.length > 0;

  const measure = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(Math.max(r.width, 260), window.innerWidth - 24);
    // Flip above the field when there is not room below — on a phone the
    // schedule sits low in the viewport and the list would fall off-screen.
    const spaceBelow = window.innerHeight - r.bottom;
    const estimatedHeight = Math.min(matches.length, 6) * 52 + 34;
    const above = spaceBelow < estimatedHeight && r.top > estimatedHeight;
    setAnchor({
      left: Math.min(Math.max(8, r.left), window.innerWidth - width - 8),
      top: above ? r.top - estimatedHeight - 4 : r.bottom + 4,
      width,
    });
  }, [matches.length]);

  useLayoutEffect(() => {
    if (showList) measure();
  }, [showList, measure]);

  useEffect(() => {
    if (!showList) return;
    // `true` for capture — the grid scrolls in a nested container, not the
    // window, so a bubbling listener never sees it and the list detaches.
    const onMove = () => measure();
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [showList, measure]);

  const apply = (preset: CircuitPreset) => {
    justAppliedRef.current = true;
    setOpen(false);
    onChange(preset.type);
    onApplyPreset?.({ ...preset.suggestions, circuitDescription: preset.type });
    // Keep the caret in the field — the electrician's next move is the next
    // column, not a hunt for where focus went.
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showList) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      setHighlighted((i) => (i + 1) % matches.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setHighlighted((i) => (i - 1 + matches.length) % matches.length);
      return;
    }
    if (e.key === 'Enter') {
      // Only claim Enter while a suggestion is showing. Otherwise it belongs to
      // the grid, which uses it to move down a row.
      e.preventDefault();
      e.stopPropagation();
      apply(matches[highlighted]);
      return;
    }
    if (e.key === 'Escape') {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          justAppliedRef.current = false;
          setHighlighted(0);
          setOpen(true);
          onChange(e.target.value);
        }}
        onFocus={() => {
          if (!justAppliedRef.current) setOpen(true);
        }}
        onBlur={() => {
          // A tap on a suggestion blurs the input first; give the click through.
          window.setTimeout(() => setOpen(false), 140);
          onCommit?.(value);
        }}
        onKeyDown={handleKeyDown}
        className={className}
      />

      {showList &&
        anchor &&
        createPortal(
          <div
            role="listbox"
            // Fixed to the viewport, in a portal on <body>. z-index is above the
            // sticky columns (z-40) and the sheet overlays, but below a modal.
            style={{ left: anchor.left, top: anchor.top, width: anchor.width }}
            className="fixed z-[70] overflow-hidden rounded-xl border border-white/[0.16] bg-[hsl(0_0%_12%)] shadow-2xl shadow-black/70"
          >
            {matches.map((preset, i) => (
              <button
                key={preset.type}
                type="button"
                role="option"
                aria-selected={i === highlighted}
                // onMouseDown, not onClick — blur fires first and would close the
                // list before a click ever landed.
                onMouseDown={(e) => {
                  e.preventDefault();
                  apply(preset);
                }}
                onMouseEnter={() => setHighlighted(i)}
                className={cn(
                  'flex min-h-11 w-full flex-col items-start justify-center gap-0.5 px-3 py-2 text-left touch-manipulation',
                  i === highlighted ? 'bg-white/[0.10]' : 'bg-transparent'
                )}
              >
                <span className="text-[13px] font-semibold text-white">{preset.type}</span>
                <span className="text-[11.5px] font-medium text-white/85">
                  {describePreset(preset)}
                </span>
              </button>
            ))}
            <p className="border-t border-white/[0.1] px-3 py-1.5 text-[11px] font-medium text-white/85">
              Keep typing to name it yourself
            </p>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CircuitDescriptionInput;
