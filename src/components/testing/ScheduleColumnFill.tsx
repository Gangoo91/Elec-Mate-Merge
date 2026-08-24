/**
 * Per-column fill for the schedule of tests — ELE-1605.
 *
 * Sean, 24 Aug 2026: "It would be useful to have the fill option on the ring
 * circuit test results and R2, maybe on all the columns? Having to copy and
 * paste N/A a lot."
 *
 * The capability already existed — as `applyToAll` on the *mobile* test
 * section, and as one-off `onFillAll*` props on a subset of desktop columns.
 * The five continuity columns (r₁, rₙ, r₂, R₁+R₂, R₂), Zs and the RCD
 * disconnection time had none, which is precisely the set an electrician marks
 * N/A over and over on a board of radials.
 *
 * ── Two rules this control exists to enforce ─────────────────────────────────
 *
 * 1. **Blanks only, by default.** These are test results on a legal document.
 *    A fill that silently replaces a measured 0.35 Ω with N/A is far worse than
 *    the copy-pasting it saves. Overwriting is available, but it is a separate,
 *    labelled choice and the button says how many readings it will replace.
 *
 * 2. **Board scoping is the caller's job and it is not optional.** The schedule
 *    holds every board's circuits in one array; the desktop table renders one
 *    board at a time and passes its own circuit ids down. See
 *    `handleBulkFieldUpdate` — a fill that ignored the scope would overwrite
 *    another consumer unit's readings with no way to tell.
 *
 * Spare ways and device rows are skipped by the same guard the existing fills
 * use (`isSpareCircuit`): an empty position has nothing to measure.
 */
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import type { ColumnFillMode } from '@/utils/columnFill';

export type { ColumnFillMode };

interface ScheduleColumnFillProps {
  /** Human name of the column, for the popover heading — e.g. 'r₁'. */
  label: string;
  /** Values worth one tap. N/A first: it is the one Sean is pasting. */
  presets?: string[];
  /**
   * Blank vs populated counts for this column, over the board being rendered.
   *
   * 🔴 A FUNCTION, not two numbers, and called while the popover is open —
   * because the schedule header is `React.memo`'d and reads its circuits
   * through a ref precisely so it does NOT re-render on every keystroke.
   * Numbers passed as props would therefore be whatever they were when the
   * header last rendered: the popover would offer to "fill 8 empty cells"
   * after six of them had been typed in. A control that misreports what it is
   * about to do is worse than no control.
   */
  getCounts: () => { blankCount: number; populatedCount: number };
  onFill: (value: string, mode: ColumnFillMode) => void;
}

const DEFAULT_PRESETS = ['N/A', 'LIM', 'N/V'];

const ScheduleColumnFill: React.FC<ScheduleColumnFillProps> = ({
  label,
  presets = DEFAULT_PRESETS,
  getCounts,
  onFill,
}) => {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState('');

  // Read on each render of THIS component. Opening the popover is local state,
  // so this re-runs at open time with the live circuits even though the
  // memoised parent header has not re-rendered.
  const { blankCount, populatedCount } = open
    ? getCounts()
    : { blankCount: 0, populatedCount: 0 };

  const apply = (value: string, mode: ColumnFillMode) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onFill(trimmed, mode);
    setCustom('');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-[9.5px] font-bold text-elec-yellow touch-manipulation"
          title={`Fill the ${label} column`}
        >
          Fill
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 p-2 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
        align="center"
      >
        <p className="mb-2 text-[10px] font-semibold text-white">Fill {label}</p>

        {presets.map((value) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            className="h-8 w-full justify-start text-xs font-medium text-white hover:bg-elec-yellow hover:text-black"
            onClick={() => apply(value, 'blank')}
          >
            {value}
          </Button>
        ))}

        <div className="mt-2 border-t border-white/[0.1] pt-2">
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                apply(custom, 'blank');
              }
            }}
            placeholder="Or type a value"
            className="input-underline h-9 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-sm font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
          />
          <Button
            variant="ghost"
            size="sm"
            disabled={!custom.trim()}
            className="mt-1 h-8 w-full justify-start text-xs font-medium text-white hover:bg-elec-yellow hover:text-black disabled:opacity-40"
            onClick={() => apply(custom, 'blank')}
          >
            Fill {blankCount} empty {blankCount === 1 ? 'cell' : 'cells'}
          </Button>
        </div>

        {/*
          Overwrite is deliberately below a rule, deliberately not the default,
          and deliberately states the count. It is only offered when there is
          something to destroy — otherwise it is the same action as above
          wearing a frightening label.
        */}
        {populatedCount > 0 && (
          <div className="mt-2 border-t border-white/[0.1] pt-2">
            <p className="mb-1 text-[10px] font-medium text-white">
              {populatedCount} {populatedCount === 1 ? 'circuit has' : 'circuits have'} a reading
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-full justify-start text-xs font-medium text-orange-300 hover:bg-orange-500/20 hover:text-orange-200"
              onClick={() => {
                const value = custom.trim() || presets[0];
                apply(value, 'overwrite');
              }}
            >
              Replace all {populatedCount} with{' '}
              {custom.trim() || presets[0]}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ScheduleColumnFill;
