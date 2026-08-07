import React, { useRef } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import type { ZsBasis } from '@/utils/autoRegChecker';
import { TestResult } from '@/types/testResult';
import { MobileHorizontalScrollTableHeader } from './MobileHorizontalScrollTableHeader';
import { MobileHorizontalScrollTableRow } from './MobileHorizontalScrollTableRow';
import { toast } from 'sonner';

interface MobileHorizontalScrollTableProps {
  /** ELE-1505 — decides whether TN or TT limits apply. */
  earthingArrangement?: string;
  /** Opens the Validate sheet on a circuit — see the row's note. */
  onOpenWarning?: (circuitId: string) => void;
  /** Which maximum a measured Zs is judged against — see `ZsBasis`. */
  zsBasis?: ZsBasis;
  /** When false the grid carries no compliance marking. Findings are unaffected. */
  showChecks?: boolean;
  testResults: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  /**
   * Bulk "Fill" from the header. The table is rendered once per distribution
   * board with ONLY that board's circuits, so it passes `circuitIds` (the ids
   * of the circuits it is rendering) as the third argument — parents that
   * manage the whole schedule MUST scope the update to those ids, otherwise a
   * fill on Board 2 silently overwrites Board 1. Parents that ignore the third
   * argument keep the previous (whole-schedule) behaviour.
   */
  onBulkFieldUpdate?: (field: keyof TestResult, value: string, circuitIds?: string[]) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
}

export const MobileHorizontalScrollTable: React.FC<MobileHorizontalScrollTableProps> = ({
  testResults,
  onUpdate,
  onRemove,
  onDuplicate,
  onBulkUpdate,
  onBulkFieldUpdate,
  onMoveUp,
  onMoveDown,
  earthingArrangement,
  onOpenWarning,
  zsBasis,
  showChecks,
}) => {
  // ELE-857 — per-board first/last identification
  const firstOfBoardIds = new Set<string>();
  const lastOfBoardIds = new Set<string>();
  {
    const seen = new Set<string>();
    const lastByBoard = new Map<string, string>();
    testResults.forEach((c) => {
      const b = (c as any).boardId || '__main__';
      if (!seen.has(b)) {
        seen.add(b);
        firstOfBoardIds.add(c.id);
      }
      lastByBoard.set(b, c.id);
    });
    lastByBoard.forEach((id) => lastOfBoardIds.add(id));
  }
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Board-scoped fill helper — passes this table's circuit ids so a
  // whole-schedule parent can limit the write to the rendered board.
  const fillAll = (field: keyof TestResult, value: string) => {
    if (onBulkFieldUpdate) {
      onBulkFieldUpdate(field, value, testResults.map((c) => c.id));
    } else {
      testResults.forEach((result) => {
        onUpdate(result.id, field, value);
      });
    }
  };

  // ELE-871 parity with desktop — Pass/Fail/N/A menus, not Pass-only
  const handleFillAllRcdTestButton = (value: string) => {
    fillAll('rcdTestButton', value);
    toast.success(`All ${testResults.length} RCD test button fields set to ${value}`, {
      duration: 2000,
    });
  };

  const handleFillAllAfdd = (value: string) => {
    fillAll('afddTest', value);
    toast.success(`All ${testResults.length} AFDD fields set to ${value}`, {
      duration: 2000,
    });
  };

  const handleFillAllFunctional = (value: string) => {
    fillAll('functionalTesting', value);
    toast.success(`All ${testResults.length} Functional Test fields set to ${value}`);
  };

  // ELE-871 — Smart RCD per-circuit fill based on the protective device type
  // (mirrors the desktop table's Smart fill).
  const handleSmartFillRcd = () => {
    if (!onBulkUpdate) {
      toast.error('Smart fill requires bulk update support');
      return;
    }
    let naCount = 0;
    let filledCount = 0;
    testResults.forEach((result) => {
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
        // Canonical mA form — matches the desktop cell Select vocabulary
        if (!result.rcdRating) updates.rcdRating = '30mA';
        if (!result.rcdRatingA && result.protectiveDeviceRating) {
          updates.rcdRatingA = result.protectiveDeviceRating;
        }
        if (Object.keys(updates).length > 0) {
          onBulkUpdate(result.id, updates);
          filledCount++;
        }
      } else if (isNonRcdDevice) {
        onBulkUpdate(result.id, {
          rcdBsStandard: 'N/A',
          rcdType: 'N/A',
          rcdRating: 'N/A',
          rcdRatingA: 'N/A',
        });
        naCount++;
      }
    });
    if (naCount + filledCount === 0) {
      toast.info('No circuits matched smart-fill rules (set BS standard first)');
    } else {
      toast.success(`Smart fill: ${filledCount} RCD/RCBO filled, ${naCount} non-RCD set to N/A`);
    }
  };

  const handleFillAllRcdBsStandard = (value: string) => {
    // '__smart__' is the Smart fill entry in the header's Fill menu
    if (value === '__smart__') {
      handleSmartFillRcd();
      return;
    }
    fillAll('rcdBsStandard', value);
    toast.success(`All RCD BS Standard fields filled with ${value}`);
  };

  const handleFillAllRcdType = (value: string) => {
    fillAll('rcdType', value);
    toast.success(`All RCD Type fields filled with ${value}`);
  };

  const handleFillAllRcdRating = (value: string) => {
    fillAll('rcdRating', value);
    // Value is already canonical ('30mA' / 'N/A') — no unit suffix needed
    toast.success(`All RCD IΔn fields filled with ${value}`);
  };

  const handleFillAllRcdRatingA = (value: string) => {
    fillAll('rcdRatingA', value);
    toast.success(
      `All RCD Rating (A) fields set to ${value === 'N/A' ? 'N/A' : `${value}A`}`,
      {
        description: `${testResults.length} circuit${testResults.length > 1 ? 's' : ''} updated`,
        duration: 2000,
      }
    );
  };

  // ELE-1182 — quick-fill for the core protective-device fields.
  const handleFillAllBsStandard = (value: string) => {
    fillAll('bsStandard', value);
    toast.success(`All BS Standard fields filled with ${value}`);
  };

  const handleFillAllCurve = (value: string) => {
    // Curve only applies to devices that have one (MCB / RCBO / MCCB).
    const curveApplies = (bs: string) =>
      bs === 'MCB (BS EN 60898)' || bs === 'RCBO (BS EN 61009)' || bs === 'MCCB (BS EN 60947)';
    let count = 0;
    testResults.forEach((result) => {
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
  };

  const handleFillAllKa = (value: string) => {
    fillAll('protectiveDeviceKaRating', value);
    toast.success(`All kA fields filled with ${value}`);
  };

  // Insulation Resistance fill handlers
  const handleFillAllInsulationVoltage = (value: string) => {
    fillAll('insulationTestVoltage', value);
    toast.success(`All Test Voltage fields filled with ${value}`);
  };

  const handleFillAllInsulationLiveNeutral = (value: string) => {
    fillAll('insulationLiveNeutral', value);
    toast.success(`All Live-Neutral fields filled with ${value} MΩ`);
  };

  const handleFillAllInsulationLiveEarth = (value: string) => {
    fillAll('insulationLiveEarth', value);
    toast.success(`All Live-Earth fields filled with ${value} MΩ`);
  };

  const handleFillAllPolarity = (value: string) => {
    fillAll('polarity', value);
    toast.success(`All Polarity fields filled with ${value}`);
  };

  // P2.3 — circuit-details bulk fill. The header already rendered these Fill
  // menus behind optional props; without these handlers they never mounted.
  const handleFillAllWiringType = (value: string) => {
    fillAll('typeOfWiring', value);
    toast.success(`All Wiring Type fields filled with ${value}`);
  };

  const handleFillAllRefMethod = (value: string) => {
    fillAll('referenceMethod', value);
    toast.success(`All Reference Method fields filled with ${value}`);
  };

  const handleFillAllLiveSize = (value: string) => {
    fillAll('liveSize', value);
    toast.success(`All Live conductor sizes filled with ${value} mm²`);
  };

  const handleFillAllCpcSize = (value: string) => {
    fillAll('cpcSize', value);
    toast.success(`All CPC sizes filled with ${value} mm²`);
  };

  return (
    <div className="w-screen relative left-[calc(-50vw+50%)]">
      {/* Table Container - Full bleed with slight padding */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          touchAction: 'pan-x pan-y',
          contain: 'layout',
        }}
      >
        <Table className="relative border-collapse w-full">
          <MobileHorizontalScrollTableHeader
            onFillAllRcdTestButton={handleFillAllRcdTestButton}
            onFillAllAfdd={handleFillAllAfdd}
            onFillAllBsStandard={handleFillAllBsStandard}
            onFillAllCurve={handleFillAllCurve}
            onFillAllKa={handleFillAllKa}
            onFillAllRcdBsStandard={handleFillAllRcdBsStandard}
            onFillAllRcdType={handleFillAllRcdType}
            onFillAllRcdRating={handleFillAllRcdRating}
            onFillAllRcdRatingA={handleFillAllRcdRatingA}
            showSmartFillRcd={!!onBulkUpdate}
            onFillAllInsulationVoltage={handleFillAllInsulationVoltage}
            onFillAllInsulationLiveNeutral={handleFillAllInsulationLiveNeutral}
            onFillAllInsulationLiveEarth={handleFillAllInsulationLiveEarth}
            onFillAllPolarity={handleFillAllPolarity}
            onFillAllFunctional={handleFillAllFunctional}
            onFillAllWiringType={handleFillAllWiringType}
            onFillAllRefMethod={handleFillAllRefMethod}
            onFillAllLiveSize={handleFillAllLiveSize}
            onFillAllCpcSize={handleFillAllCpcSize}
          />
          <TableBody>
            {testResults.map((result) => (
              <MobileHorizontalScrollTableRow
                earthingArrangement={earthingArrangement}
                onOpenWarning={onOpenWarning}
                zsBasis={zsBasis}
                showChecks={showChecks}
                key={result.id}
                result={result}
                onUpdate={onUpdate}
                onRemove={onRemove}
                onDuplicate={onDuplicate}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                canMoveUp={onMoveUp ? !firstOfBoardIds.has(result.id) : false}
                canMoveDown={onMoveDown ? !lastOfBoardIds.has(result.id) : false}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
