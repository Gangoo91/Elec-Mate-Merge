/**
 * Actions on a row selection — ELE-1494. Desktop.
 *
 * Appears only when something is selected, so it costs nothing when unused.
 *
 * The field list is `SEARCHABLE_COLUMNS`, the same registry Find & Replace
 * uses. A second copy is how the three preset lists drifted into producing
 * three different "Downstairs Ring" circuits, so there is one list.
 *
 * Delete is deliberately the last action, visually separated and never the
 * default. Everything else here is reversible by re-selecting and setting
 * again; delete is the only one that removes work.
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TestResult } from '@/types/testResult';
import { SEARCHABLE_COLUMNS } from '@/utils/scheduleFindReplace';

interface ScheduleSelectionBarProps {
  count: number;
  /** How many of the selected rows are spare ways — they are skipped on write. */
  spareCount: number;
  onClear: () => void;
  onSetField: (field: keyof TestResult, value: string) => void;
  onMarkNotApplicable: () => void;
  onMarkDeviceRow: () => void;
  onDelete: () => void;
}

const actionCn =
  'h-9 px-3 rounded-lg border border-white/[0.12] bg-white/[0.06] text-white text-[12.5px] ' +
  'font-semibold hover:bg-white/[0.12] touch-manipulation';

const ScheduleSelectionBar: React.FC<ScheduleSelectionBarProps> = ({
  count,
  spareCount,
  onClear,
  onSetField,
  onMarkNotApplicable,
  onMarkDeviceRow,
  onDelete,
}) => {
  const [field, setField] = useState<string>('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const applyField = () => {
    if (!field) return;
    onSetField(field as keyof TestResult, value);
    setValue('');
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-y border-elec-yellow/25 bg-elec-yellow/[0.07]">
      <span className="text-[13px] font-semibold text-white tabular-nums">
        {count} selected
      </span>
      {spareCount > 0 && (
        <span className="text-[11.5px] font-medium text-white">
          ({spareCount} spare — skipped on write)
        </span>
      )}

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className={actionCn}>Set a field</Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-72 p-3 z-[9999] rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.14] shadow-[0_16px_40px_rgba(0,0,0,0.55)] space-y-3"
          >
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-white block">Column</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white focus:border-elec-yellow focus:outline-none [color-scheme:dark] touch-manipulation"
              >
                <option value="">Choose a column</option>
                {SEARCHABLE_COLUMNS.map((c) => (
                  <option key={`${c.group}-${String(c.field)}`} value={String(c.field)}>
                    {c.group} — {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-white block">Value</label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Leave empty to clear"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus-visible:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
              />
            </div>

            <Button
              onClick={applyField}
              disabled={!field}
              className="w-full h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 disabled:bg-white/[0.06] disabled:text-white touch-manipulation"
            >
              Set on {count} {count === 1 ? 'circuit' : 'circuits'}
            </Button>
          </PopoverContent>
        </Popover>

        <Button onClick={onMarkNotApplicable} className={actionCn}>
          Mark N/A
        </Button>
        <Button onClick={onMarkDeviceRow} className={actionCn}>
          Mark as device row
        </Button>
        <Button
          onClick={onDelete}
          className="h-9 px-3 rounded-lg border border-red-500/40 bg-transparent text-red-300 text-[12.5px] font-semibold hover:bg-red-500/15 touch-manipulation"
        >
          Delete
        </Button>
        <Button onClick={onClear} className={actionCn}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ScheduleSelectionBar;
