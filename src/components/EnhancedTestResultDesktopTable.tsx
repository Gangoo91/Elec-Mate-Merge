import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Table, TableBody } from '@/components/ui/table';
// Native scroll used instead of Radix ScrollArea for performance with many rows
import type { ZsBasis } from '@/utils/autoRegChecker';
import { TestResult } from '@/types/testResult';
import { cn } from '@/lib/utils';
import EnhancedTestResultDesktopTableHeader from './EnhancedTestResultDesktopTableHeader';
import { StickyHorizontalScrollbar } from './mobile/StickyHorizontalScrollbar';
import EnhancedTestResultDesktopTableRow from './EnhancedTestResultDesktopTableRow';
import { toast } from 'sonner';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { bsStandardRequiresCurve } from '@/types/protectiveDeviceTypes';
import { handleGridKeyDown } from '@/utils/scheduleGridNavigation';

interface EnhancedTestResultDesktopTableProps {
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onDuplicate?: (id: string) => void;
  allResults: TestResult[];
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onAddCircuit: () => void;
  /**
   * Bulk "Fill" from the header. The table is rendered once per distribution
   * board with ONLY that board's circuits, so it passes `circuitIds` (the ids
   * of the circuits it is rendering) as the third argument — parents that
   * manage the whole schedule MUST scope the update to those ids, otherwise a
   * fill on Board 2 silently overwrites Board 1. Parents that ignore the third
   * argument keep the previous (whole-schedule) behaviour.
   */
  onBulkFieldUpdate?: (field: keyof TestResult, value: string, circuitIds?: string[]) => void;
  onScanBoard?: () => void;
  earthingArrangement?: string;
  /**
   * Row selection (ELE-1494). Optional — omit it and the table renders exactly
   * as before, with no checkbox column and no behaviour change.
   */
  isRowSelected?: (id: string) => boolean;
  /** Opens the Validate sheet on a circuit, from a flagged cell. */
  onOpenWarning?: (circuitId: string) => void;
  /** Which maximum a measured Zs is judged against — see `ZsBasis`. */
  zsBasis?: ZsBasis;
  /** When false the grid carries no compliance marking. Findings are unaffected. */
  showChecks?: boolean;
  onToggleRowSelect?: (id: string, shiftKey: boolean) => void;
  onToggleSelectAll?: () => void;
  allSelected?: boolean;
  someSelected?: boolean;
}

const EnhancedTestResultDesktopTable: React.FC<EnhancedTestResultDesktopTableProps> = ({
  testResults,
  onUpdate,
  onRemove,
  onDuplicate,
  onBulkUpdate,
  onMoveUp,
  onMoveDown,
  onAddCircuit,
  onBulkFieldUpdate,
  onScanBoard,
  earthingArrangement,
  isRowSelected,
  onOpenWarning,
  zsBasis,
  showChecks,
  onToggleRowSelect,
  onToggleSelectAll,
  allSelected = false,
  someSelected = false,
}) => {
  // ELE-857 — board-scoped boundaries so arrows disable correctly
  const { firstOfBoardIds, lastOfBoardIds } = useMemo(() => {
    const firstIds = new Set<string>();
    const lastIds = new Set<string>();
    const seen = new Set<string>();
    const lastByBoard = new Map<string, string>();
    testResults.forEach((c) => {
      const b = (c as any).boardId || '__main__';
      if (!seen.has(b)) {
        seen.add(b);
        firstIds.add(c.id);
      }
      lastByBoard.set(b, c.id);
    });
    lastByBoard.forEach((id) => lastIds.add(id));
    return { firstOfBoardIds: firstIds, lastOfBoardIds: lastIds };
  }, [testResults]);
  // Defaults on now the panel that toggled it has gone — see below.
  const [showRegulationStatus] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Fill handlers read the current circuits through a ref so they can be
  // stable (useCallback with no testResults dep) — that keeps the memoised
  // 1200-line header from re-rendering its ~15 popovers on every keystroke.
  const resultsRef = useRef(testResults);
  resultsRef.current = testResults;

  /** The horizontally scrolling box, mirrored by the sticky scrollbar (ELE-1535). */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Create a bulk update handler that matches the mobile interface
  const handleBulkUpdate = useCallback(
    (id: string, updates: Partial<TestResult>) => {
      if (onBulkUpdate) {
        onBulkUpdate(id, updates);
      } else {
        // Fallback to individual updates if onBulkUpdate is not provided
        Object.entries(updates).forEach(([field, value]) => {
          if (value !== undefined && value !== null) {
            onUpdate(id, field as keyof TestResult, String(value));
          }
        });
      }
    },
    [onBulkUpdate, onUpdate]
  );

  const toggleGroupCollapse = useCallback((groupName: string) => {
    setCollapsedGroups((current) => {
      const newCollapsed = new Set(current);
      if (newCollapsed.has(groupName)) {
        newCollapsed.delete(groupName);
      } else {
        newCollapsed.add(groupName);
      }
      return newCollapsed;
    });
  }, []);

  // Shared fill helper — board-scoped: passes this table's circuit ids so a
  // whole-schedule parent can limit the write to the rendered board.
  const fillAll = useCallback(
    (field: keyof TestResult, value: string) => {
      const circuits = resultsRef.current;
      if (onBulkFieldUpdate) {
        onBulkFieldUpdate(field, value, circuits.map((c) => c.id));
      } else {
        circuits.forEach((result) => {
          onUpdate(result.id, field, value);
        });
      }
    },
    [onBulkFieldUpdate, onUpdate]
  );

  // ELE-871 — accept a value so the header popover can offer Pass/Fail/N/A
  const handleFillAllRcdTestButton = useCallback(
    (value: string = '✓') => {
      fillAll('rcdTestButton', value);
      toast.success(`All ${resultsRef.current.length} RCD Test Button fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllAfdd = useCallback(
    (value: string = '✓') => {
      fillAll('afddTest', value);
      toast.success(`All ${resultsRef.current.length} AFDD fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllFunctional = useCallback(
    (value: string = '✓') => {
      fillAll('functionalTesting', value);
      toast.success(`All ${resultsRef.current.length} Functional Test fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllRcdBsStandard = useCallback(
    (value: string) => {
      fillAll('rcdBsStandard', value);
      toast.success(`All RCD BS Standard fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllRcdType = useCallback(
    (value: string) => {
      fillAll('rcdType', value);
      toast.success(`All RCD Type fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllRcdRating = useCallback(
    (value: string) => {
      fillAll('rcdRating', value);
      // Value is already canonical ('30mA' / 'N/A') — no unit suffix needed
      toast.success(`All RCD IΔn fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllRcdRatingA = useCallback(
    (value: string) => {
      fillAll('rcdRatingA', value);
      toast.success(
        `All RCD Rating (A) fields filled with ${value === 'N/A' ? 'N/A' : `${value}A`}`
      );
    },
    [fillAll]
  );

  const handleFillAllMaxZs = useCallback(() => {
    let successCount = 0;
    let skippedCount = 0;

    resultsRef.current.forEach((result) => {
      // Skip if Max Zs is already filled
      if (result.maxZs && result.maxZs.trim() !== '') {
        skippedCount++;
        return;
      }

      const bsStandard = result.bsStandard;
      const curve = result.protectiveDeviceCurve;
      const rating = result.protectiveDeviceRating;

      // Check if we have required data
      if (!bsStandard || !rating) {
        skippedCount++;
        return;
      }

      // For MCB/RCBO/MCCB the curve is required — shared helper matches the
      // stored combined form 'MCB (BS EN 60898)' etc (ELE-1391).
      const needsCurve = bsStandardRequiresCurve(bsStandard);
      if (needsCurve && !curve) {
        skippedCount++;
        return;
      }

      // Calculate Max Zs
      const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve || '', rating);
      if (maxZs !== null) {
        onUpdate(result.id, 'maxZs', maxZs.toString());
        successCount++;
      } else {
        skippedCount++;
      }
    });

    // Show user feedback
    if (successCount > 0) {
      toast.success(`Max Zs auto-filled for ${successCount} circuit${successCount > 1 ? 's' : ''}`);
    }
    if (skippedCount > 0) {
      toast.info(
        `${skippedCount} circuit${skippedCount > 1 ? 's' : ''} skipped (already filled or missing protective device details)`
      );
    }
    if (successCount === 0 && skippedCount === 0) {
      toast.error('No circuits available to fill');
    }
  }, [onUpdate]);

  // Insulation Resistance fill handlers
  const handleFillAllInsulationVoltage = useCallback(
    (value: string) => {
      fillAll('insulationTestVoltage', value);
      toast.success(`All Test Voltage fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllInsulationLiveNeutral = useCallback(
    (value: string) => {
      fillAll('insulationLiveNeutral', value);
      toast.success(`All Live-Neutral fields filled with ${value} MΩ`);
    },
    [fillAll]
  );

  const handleFillAllInsulationLiveEarth = useCallback(
    (value: string) => {
      fillAll('insulationLiveEarth', value);
      toast.success(`All Live-Earth fields filled with ${value} MΩ`);
    },
    [fillAll]
  );

  const handleFillAllPolarity = useCallback(
    (value: string) => {
      fillAll('polarity', value);
      toast.success(`All Polarity fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllWiringType = useCallback(
    (value: string) => {
      fillAll('typeOfWiring', value);
      toast.success(`All Wiring Type fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllRefMethod = useCallback(
    (value: string) => {
      fillAll('referenceMethod', value);
      toast.success(`All Reference Method fields filled with ${value}`);
    },
    [fillAll]
  );

  const handleFillAllKa = useCallback(
    (value: string) => {
      fillAll('protectiveDeviceKaRating', value);
      toast.success(`All kA fields filled with ${value}`);
    },
    [fillAll]
  );

  // ELE-1182 — quick-fill for the core protective-device fields (Craig Soper).
  const handleFillAllBsStandard = useCallback(
    (value: string) => {
      fillAll('bsStandard', value);
      toast.success(`All BS Standard fields filled with ${value}`);
    },
    [fillAll]
  );

  // Tripping curve only applies to devices that have one (MCB / RCBO / MCCB);
  // fuses don't, so they're skipped.
  const handleFillAllCurve = useCallback(
    (value: string) => {
      const curveApplies = (bs: string) =>
        bs === 'MCB (BS EN 60898)' || bs === 'RCBO (BS EN 61009)' || bs === 'MCCB (BS EN 60947)';
      let count = 0;
      resultsRef.current.forEach((result) => {
        if (curveApplies(result.bsStandard || '')) {
          onUpdate(result.id, 'protectiveDeviceCurve', value);
          count += 1;
        }
      });
      toast.success(
        count > 0
          ? `Curve ${value} applied to ${count} MCB/RCBO circuit${count === 1 ? '' : 's'}`
          : 'No MCB/RCBO circuits to apply a curve to'
      );
    },
    [onUpdate]
  );

  const handleFillAllPhase = useCallback(
    (value: string) => {
      fillAll('phaseType', value);
      toast.success(`All circuits set to ${value}`);
    },
    [fillAll]
  );

  const handleFillAllAfddNA = useCallback(() => handleFillAllAfdd('N/A'), [handleFillAllAfdd]);

  // ELE-871 — Smart RCD per-circuit fill based on the protective device type.
  // Saves a huge amount of clicking on certs where most circuits are MCBs (no RCD).
  // - BS EN 60898 / BS 88 / BS 3036 / BS 1361 → set all RCD detail fields to N/A
  // - BS EN 61009 (RCBO) → fill RCD details from the device data
  // - BS EN 61008 (RCD)  → same
  const handleSmartFillRcd = useCallback(() => {
    if (!onBulkUpdate) {
      toast.error('Smart fill requires bulk update support');
      return;
    }
    let naCount = 0;
    let filledCount = 0;
    resultsRef.current.forEach((result) => {
      const bs = (result.bsStandard || '').toUpperCase();
      const isRcbo = bs.includes('61009');
      const isRcd = bs.includes('61008');
      const isNonRcdDevice =
        bs.includes('60898') || bs.includes('BS 88') || bs.includes('3036') || bs.includes('1361');

      if (isRcbo || isRcd) {
        // Already-filled fields take priority — only backfill blanks
        const updates: Partial<TestResult> = {};
        if (!result.rcdBsStandard) {
          updates.rcdBsStandard = isRcbo ? 'BS EN 61009' : 'BS EN 61008';
        }
        if (!result.rcdType) updates.rcdType = 'AC';
        // Canonical mA form — matches the cell Select vocabulary
        if (!result.rcdRating) updates.rcdRating = '30mA';
        if (!result.rcdRatingA && result.protectiveDeviceRating) {
          updates.rcdRatingA = result.protectiveDeviceRating;
        }
        if (Object.keys(updates).length > 0) {
          onBulkUpdate(result.id, updates);
          filledCount++;
        }
      } else if (isNonRcdDevice) {
        const updates: Partial<TestResult> = {
          rcdBsStandard: 'N/A',
          rcdType: 'N/A',
          rcdRating: 'N/A',
          rcdRatingA: 'N/A',
        };
        onBulkUpdate(result.id, updates);
        naCount++;
      }
    });
    if (naCount + filledCount === 0) {
      toast.info('No circuits matched smart-fill rules (set BS standard first)');
    } else {
      toast.success(
        `Smart fill: ${filledCount} RCD/RCBO filled, ${naCount} non-RCD set to N/A`
      );
    }
  }, [onBulkUpdate]);

  const isEmpty = testResults.length === 0;

  return (
    <div className="w-full space-y-6">
      {/* Table - Full width edge-to-edge */}
      <div className="w-full">
        {isEmpty ? (
          <div className="flex flex-col items-center rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-10">
            {/* Mini board — empty ways waiting to be filled (same CSS-board
                visual language as the scanner intro; no icon tiles). */}
            <div aria-hidden="true" className="mb-5 w-full max-w-[240px]">
              <div className="rounded-xl border border-white/[0.16] bg-gradient-to-b from-white/[0.10] to-white/[0.05] p-1.5">
                <div className="rounded-lg bg-black/40 p-1.5 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
                  <div className="flex items-stretch gap-1">
                    <span className="flex w-7 shrink-0 flex-col items-center justify-center rounded bg-white/[0.14] py-1">
                      <span className="block h-2.5 w-1.5 rounded-sm bg-elec-yellow" />
                    </span>
                    <span className="grid flex-1 grid-cols-6 gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span
                          key={i}
                          className="flex h-6 items-center justify-center rounded border border-dashed border-white/[0.14] bg-white/[0.04]"
                        >
                          <span className="block h-2 w-1 rounded-sm bg-white/[0.14]" />
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold tracking-tight text-white">No circuits yet</h3>
            <p className="mt-1 max-w-md text-center text-[13px] leading-relaxed text-white/85">
              Each way gets its own row on the schedule.
            </p>

            {/* Option cards — the two ways in, each explained */}
            <div
              className={cn(
                'mt-6 grid w-full max-w-xl gap-2.5',
                onScanBoard && 'sm:grid-cols-2'
              )}
            >
              {onScanBoard && (
                <button
                  type="button"
                  onClick={onScanBoard}
                  className="rounded-xl bg-elec-yellow p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
                >
                  <span className="block text-sm font-semibold text-black">Scan the board</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-black/70">
                    Photo the board — AI reads every device, rating and label into the
                    schedule in seconds.
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={onAddCircuit}
                className="rounded-xl border border-white/[0.12] bg-white/[0.06] p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
              >
                <span className="block text-sm font-semibold text-white">Add manually</span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/85">
                  Start from a circuit preset or a blank way and build the schedule
                  yourself.
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="sot-table-wrapper">
            <div
              ref={scrollContainerRef}
              className="w-full overflow-auto enhanced-table-scroll"
              // ELE-1485 — Enter and the arrows move between cells. Handled here
              // rather than per cell: the keydown bubbles up from the input, and
              // the table's own DOM already describes the grid.
              onKeyDown={handleGridKeyDown}
              style={{
                maxHeight: 'calc(100vh - 140px)',
                overscrollBehavior: 'contain',
                willChange: 'scroll-position',
                contain: 'layout style',
              }}
            >
              <div className="min-w-max enhanced-table-scroll">
                <Table
                  useWrapper={false}
                  className="text-sm border-separate border-spacing-0 w-full"
                >
                  <EnhancedTestResultDesktopTableHeader
                    showRegulationStatus={showRegulationStatus}
                    collapsedGroups={collapsedGroups}
                    onToggleGroup={toggleGroupCollapse}
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggleSelectAll={onToggleSelectAll}
                    onFillAllRcdTestButton={handleFillAllRcdTestButton}
                    onFillAllAfdd={handleFillAllAfdd}
                    onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
                    onFillAllRcdType={handleFillAllRcdType}
                    onFillAllRcdRating={handleFillAllRcdRating}
                    onFillAllRcdRatingA={handleFillAllRcdRatingA}
                    onSmartFillRcd={handleSmartFillRcd}
                    onFillAllMaxZs={handleFillAllMaxZs}
                    onFillAllInsulationVoltage={handleFillAllInsulationVoltage}
                    onFillAllInsulationLiveNeutral={handleFillAllInsulationLiveNeutral}
                    onFillAllInsulationLiveEarth={handleFillAllInsulationLiveEarth}
                    onFillAllPolarity={handleFillAllPolarity}
                    onFillAllFunctional={handleFillAllFunctional}
                    onFillAllWiringType={handleFillAllWiringType}
                    onFillAllRefMethod={handleFillAllRefMethod}
                    onFillAllKa={handleFillAllKa}
                    onFillAllBsStandard={handleFillAllBsStandard}
                    onFillAllCurve={handleFillAllCurve}
                    onFillAllPhase={handleFillAllPhase}
                    onFillAllAfddNA={handleFillAllAfddNA}
                  />
                  <TableBody>
                    {testResults.map((result) => (
                      <EnhancedTestResultDesktopTableRow
                        key={result.id}
                        result={result}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        onDuplicate={onDuplicate}
                        onBulkUpdate={handleBulkUpdate}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        canMoveUp={onMoveUp ? !firstOfBoardIds.has(result.id) : false}
                        canMoveDown={onMoveDown ? !lastOfBoardIds.has(result.id) : false}
                        showRegulationStatus={showRegulationStatus}
                        collapsedGroups={collapsedGroups}
                        earthingArrangement={earthingArrangement}
                        isSelected={isRowSelected ? isRowSelected(result.id) : false}
                        onToggleSelect={onToggleRowSelect}
                        onOpenWarning={onOpenWarning}
                zsBasis={zsBasis}
                showChecks={showChecks}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The "Regulation checks" panel that used to sit here has gone.
          ────────────────────────────────────────────────────────────
          It duplicated the Validate sheet exactly — same checks, same counts —
          while occupying ~300px below the table on every board, on a page
          where the schedule is the thing you want to see. The Validate button
          in the board toolbar carries the issue count, opens the full detail,
          and unlike the panel it exists on mobile.

          The per-row status column it used to toggle is kept, and now shows by
          default: one narrow column of inline feedback is worth more than a
          panel you have to scroll past. */}

      {!isEmpty && (
        <div className="mt-3 flex flex-col lg:flex-row items-center justify-between gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-semibold text-white">
            BS 7671 Schedule of test results
          </span>
          {/* Keyboard hints — pointer devices only, meaningless on touch */}
          <div className="hidden flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-white sm:flex">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white">Tab</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white">Enter</kbd>
              <span>next row</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white">↑ ↓</kbd>
              <span>rows</span>
            </span>
            {/* ELE-1485 — plain ← → stay with the caret inside the field, so the
                horizontal move is modified. The legend used to promise bare
                arrows for cells, and a right-click copy/paste menu that has
                never existed. */}
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white">⌘ ← →</kbd>
              <span>cells</span>
            </span>
          </div>
        </div>
      )}

      {/* ELE-1535 — this table caps at calc(100vh - 140px) and scrolls inside
        itself, so its horizontal scrollbar lives on its bottom edge. In normal
        use that edge sits below the fold, and the only way to move sideways is
        to scroll the page hunting for it. */}
      <StickyHorizontalScrollbar targetRef={scrollContainerRef} />
    </div>
  );
};

export default EnhancedTestResultDesktopTable;
