/**
 * Find & replace across the schedule of tests — ELE-1493. Desktop only.
 *
 * Bulk fill can set a column to a value. It cannot say "wherever this reads
 * LIM, make it N/A", which is the actual job when a limitation is lifted or an
 * instrument is swapped mid-job. On a 23-way board that is otherwise 23 manual
 * edits, and the ones you miss are invisible.
 *
 * ## Three deliberate choices
 *
 * **The count is always on screen.** `findMatches` is pure and re-runs on every
 * keystroke, so the button reads "Replace 12 values across 8 circuits" before
 * anything is committed. A tool whose whole purpose is changing many rows at
 * once has to show its work first.
 *
 * **Exact match is the default.** Searching `LIM` with partial matching on also
 * rewrites `LIMITED`. Whole-value is what an electrician means by "change the
 * LIMs", so partial is opt-in and says what it does.
 *
 * **The column scope is a dropdown, not a disabled checkbox.** Tradecert greys
 * out "Only in selected column" and explains the enabling action *inside* the
 * dialog, while the action itself is outside it — so the explanation is only
 * readable once you can no longer act on it. Choosing the column here means the
 * control is never dead.
 *
 * Rendered as a centred Dialog rather than the house bottom sheet: this is a
 * desktop-only tool, and the sheet convention exists for one-handed reach on a
 * phone, which does not apply.
 */
import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TestResult } from '@/types/testResult';
import {
  FindReplaceOptions,
  LIMITATION_TOKENS,
  SEARCHABLE_COLUMNS,
  applyReplacements,
  describeMatches,
  findMatches,
} from '@/utils/scheduleFindReplace';
import { cn } from '@/lib/utils';

interface ScheduleFindReplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Circuits on the board the tool was opened from. */
  boardCircuits: TestResult[];
  /** Every circuit on the certificate, for the all-boards scope. */
  allCircuits: TestResult[];
  boardName?: string;
  boardCount: number;
  /** Commits the replaced rows in one state change. */
  onApply: (updated: TestResult[]) => void;
}

const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';

const chipCn =
  'h-8 rounded-lg border border-white/[0.12] bg-white/[0.06] px-2.5 text-[12px] font-semibold ' +
  'text-white hover:bg-white/[0.12] touch-manipulation';

const ScheduleFindReplaceDialog: React.FC<ScheduleFindReplaceDialogProps> = ({
  open,
  onOpenChange,
  boardCircuits,
  allCircuits,
  boardName,
  boardCount,
  onApply,
}) => {
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [matchPartial, setMatchPartial] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [allBoards, setAllBoards] = useState(false);
  const [field, setField] = useState<string>('');

  const scope = allBoards ? allCircuits : boardCircuits;

  const options: FindReplaceOptions = useMemo(
    () => ({
      find,
      replace,
      matchPartial,
      ignoreCase,
      field: field ? (field as keyof TestResult) : null,
    }),
    [find, replace, matchPartial, ignoreCase, field]
  );

  const summary = useMemo(() => findMatches(scope, options), [scope, options]);

  const reset = () => {
    setFind('');
    setReplace('');
    setMatchPartial(false);
    setIgnoreCase(false);
    setField('');
  };

  const handleApply = () => {
    if (!summary.matches.length) return;
    onApply(applyReplacements(allCircuits, summary.matches));
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[hsl(0_0%_10%)] border border-white/[0.14] rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-white/[0.1]">
          <DialogTitle className="text-[15px] font-semibold text-white">
            Find and replace
          </DialogTitle>
          <p className="text-[12px] font-medium text-white">
            {allBoards
              ? `Every circuit on this certificate — ${allCircuits.length} rows`
              : `${boardName || 'This board'} — ${boardCircuits.length} rows`}
          </p>
        </DialogHeader>

        <div className="px-5 py-4 space-y-5 max-h-[62vh] overflow-y-auto">
          {/* Find */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white block">Find</label>
            <Input
              autoFocus
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="Value to look for"
              className={fieldCn}
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {LIMITATION_TOKENS.map((t) => (
                <Button key={t} type="button" onClick={() => setFind(t)} className={chipCn}>
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Replace */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white block">Replace with</label>
            <Input
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Leave empty to clear the value"
              className={fieldCn}
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {LIMITATION_TOKENS.map((t) => (
                <Button key={t} type="button" onClick={() => setReplace(t)} className={chipCn}>
                  {t}
                </Button>
              ))}
              <Button type="button" onClick={() => setReplace('')} className={chipCn}>
                Clear
              </Button>
            </div>
          </div>

          {/* Column scope — a real choice, never a dead control */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white block">Column</label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white focus:border-elec-yellow focus:outline-none [color-scheme:dark] touch-manipulation"
            >
              <option value="">Every column</option>
              {SEARCHABLE_COLUMNS.map((c) => (
                <option key={`${c.group}-${String(c.field)}`} value={String(c.field)}>
                  {c.group} — {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-1">
            <label className="flex items-start gap-3 touch-manipulation cursor-pointer">
              <Checkbox
                checked={matchPartial}
                onCheckedChange={(v) => setMatchPartial(v === true)}
                className="mt-0.5"
              />
              <span>
                <span className="text-[13px] font-medium text-white block">Match partial text</span>
                <span className="text-[11.5px] font-medium text-white">
                  Off: only a whole cell equal to the search text changes. On: “LIM” also matches
                  “LIMITED”.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 touch-manipulation cursor-pointer">
              <Checkbox
                checked={ignoreCase}
                onCheckedChange={(v) => setIgnoreCase(v === true)}
                className="mt-0.5"
              />
              <span className="text-[13px] font-medium text-white">
                Ignore upper and lower case
              </span>
            </label>

            {boardCount > 1 && (
              <label className="flex items-start gap-3 touch-manipulation cursor-pointer">
                <Checkbox
                  checked={allBoards}
                  onCheckedChange={(v) => setAllBoards(v === true)}
                  className="mt-0.5"
                />
                <span className="text-[13px] font-medium text-white">
                  Search all {boardCount} boards, not just this one
                </span>
              </label>
            )}
          </div>

          {/* What will change — shown before it does */}
          {find.trim().length > 0 && (
            <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 space-y-2">
              <p className="text-[13px] font-semibold text-white">{describeMatches(summary)}</p>

              {summary.onNonCircuitRows > 0 && (
                <p className="text-[11.5px] font-medium text-amber-200">
                  {summary.onNonCircuitRows} of these sit on a spare way or a device row.
                </p>
              )}

              {summary.matches.slice(0, 6).map((m, i) => (
                <div
                  key={`${m.circuitId}-${String(m.field)}-${i}`}
                  className="flex items-center gap-2 text-[11.5px] font-medium"
                >
                  <span className="text-white shrink-0">{m.label}</span>
                  <span className="text-white/90 truncate">{m.before}</span>
                  <span className="text-white shrink-0">→</span>
                  <span className="text-elec-yellow truncate">{m.after || '(cleared)'}</span>
                </div>
              ))}

              {summary.matches.length > 6 && (
                <p className="text-[11.5px] font-medium text-white">
                  and {summary.matches.length - 6} more
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-white/[0.1]">
          <Button
            onClick={() => onOpenChange(false)}
            className="h-11 px-4 rounded-xl border border-white/[0.12] bg-white/[0.06] text-white text-[13px] font-semibold hover:bg-white/[0.1] touch-manipulation"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!summary.matches.length}
            className={cn(
              'h-11 px-4 rounded-xl text-[13px] font-semibold touch-manipulation',
              summary.matches.length
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                : 'bg-white/[0.06] text-white'
            )}
          >
            {summary.matches.length ? `Replace ${describeMatches(summary)}` : 'Replace'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFindReplaceDialog;
