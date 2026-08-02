import React, { useState, useMemo } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { validateTestResult } from '@/utils/testValidation';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import { getSpareCircuitFields } from '@/utils/spareCircuitFields';

// Import all the cell components
import { TypeOfWiringCell } from './table-cells/TypeOfWiringCell';
import { RefMethodCell } from './table-cells/RefMethodCell';
import { PointsServedCell } from './table-cells/PointsServedCell';
import { ConductorCells } from './table-cells/ConductorCells';
import { ProtectiveDeviceCells } from './table-cells/ProtectiveDeviceCells';
import { RcdDetailsCells } from './table-cells/RcdDetailsCells';
import { ContinuityCells } from './table-cells/ContinuityCells';
import { InsulationCells } from './table-cells/InsulationCells';
import { ZsCells } from './table-cells/ZsCells';
import { RcdTestCells } from './table-cells/RcdTestCells';
import { EnhancedValidatedInput } from './table-cells/EnhancedValidatedInput';

import { AfddCell } from './table-cells/AfddCell';
import { FunctionalTestCell } from './table-cells/FunctionalTestCell';
import { RemarksCell } from './table-cells/RemarksCell';
import { PhaseTypeCell } from './table-cells/PhaseTypeCell';

interface EnhancedTestResultDesktopTableRowProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  showRegulationStatus?: boolean;
  collapsedGroups: Set<string>;
  earthingArrangement?: string;
}

const EnhancedTestResultDesktopTableRow: React.FC<EnhancedTestResultDesktopTableRowProps> = ({
  result,
  onUpdate,
  onRemove,
  onDuplicate,
  onBulkUpdate,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  showRegulationStatus = false,
  collapsedGroups,
  earthingArrangement,
}) => {
  const [showRegulationWarning, setShowRegulationWarning] = useState(false);

  // Validate the test result - memoized to prevent expensive recalculation
  const validation = useMemo(() => validateTestResult(result, earthingArrangement), [result, earthingArrangement]);

  // Get overall compliance status
  const getOverallCompliance = (validation: any): 'error' | 'warning' | 'pass' => {
    if (!validation || typeof validation !== 'object') return 'pass';
    try {
      const values = Object.values(validation);
      const hasErrors = values.some((v: any) => v?.type === 'error');
      const hasWarnings = values.some((v: any) => v?.type === 'warning');
      if (hasErrors) return 'error';
      if (hasWarnings) return 'warning';
    } catch {
      return 'pass';
    }
    return 'pass';
  };

  // Check regulation compliance - memoized to prevent expensive recalculation
  const regulationCompliance = useMemo(() => checkRegulationCompliance(result), [result]);

  // Memoized row background class - prevents expensive recalculation on every render
  // Default rows take base/zebra tones from the .sot-row CSS; error/warning
  // validation tints are dedicated classes so index.css can keep them flat on
  // hover too (founder call: pointing at a row must not shift colours).
  const rowBgClass = useMemo(() => {
    const overallCompliance = getOverallCompliance(validation);
    if (overallCompliance === 'error') return 'sot-row-error';
    if (overallCompliance === 'warning') return 'sot-row-warning';
    return '';
  }, [validation]);

  // Get regulation status icon
  const getRegulationStatusIcon = () => {
    if (!regulationCompliance.isCompliant) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-red-400 hover:text-red-300"
          onClick={handleValidateClick}
          title="Click to view regulation compliance issues"
        >
          <XCircle className="h-3 w-3" />
        </Button>
      );
    }

    const overallCompliance = getOverallCompliance(validation);
    if (overallCompliance === 'warning') {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-amber-400 hover:text-amber-300"
          onClick={handleValidateClick}
          title="Click to view validation warnings"
        >
          <AlertTriangle className="h-3 w-3" />
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <CheckCircle className="h-3 w-3 text-green-400" />
      </div>
    );
  };

  const handleValidateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRegulationWarning(true);
  };

  const isGroupCollapsed = (groupName: string) => collapsedGroups.has(groupName);

  return (
    <>
      <TableRow
        data-circuit-id={result.id}
        className={`sot-row transition-colors ${rowBgClass}`}
      >
        {/* Actions — first column on the left (Craig/QS feedback: no more
            scrolling 30 columns to move/duplicate a circuit) but NOT sticky
            (founder call) — it scrolls away under the pinned Way column.
            Density cell — h-7 controls exempt from the 44px rule. */}
        <TableCell className="h-8 px-1.5 py-0.5 align-middle w-[210px] min-w-[210px] max-w-[210px] border-r border-white/10">
          {/* One even row of compact controls — no pills, no dividers.
              Density cell — h-7 controls exempt from the 44px rule. */}
          <div className="flex items-center justify-center gap-1">
            {onMoveUp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveUp(result.id)}
                disabled={!canMoveUp}
                className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                title="Move circuit up"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            {onMoveDown && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveDown(result.id)}
                disabled={!canMoveDown}
                className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                title="Move circuit down"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
            {onBulkUpdate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkUpdate(result.id, getSpareCircuitFields())}
                className="h-7 px-2 text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Mark as spare way — sets all results to N/A"
              >
                Spare
              </Button>
            )}
            {onDuplicate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(result.id)}
                className="h-7 w-7 p-0 text-white/80 hover:text-elec-yellow hover:bg-white/10 rounded-md transition-colors"
                title="Duplicate this circuit"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(result.id)}
              className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
              title="Remove this circuit"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>

        {/* Circuit Number — sticky at left:0; the non-sticky Actions column
            scrolls in under it (ELE-830 overlap rules still apply). */}
        <TableCell className="sot-sticky-col p-0 h-8 align-middle w-[112px] min-w-[112px] max-w-[112px]">
          <EnhancedValidatedInput
            value={result.circuitDesignation}
            onChange={(value) => onUpdate(result.id, 'circuitDesignation', value)}
            className="h-8 text-[11px] text-center px-2 w-full tracking-tight whitespace-nowrap"
            disabled={!!result.sourceCircuitId}
          />
        </TableCell>

        {/* Description — always visible, sticky flush after Way (founder call:
            sits before 1P/3P), last frozen column */}
        <TableCell className="sot-sticky-col-2 sot-sticky-last p-0 h-8 align-middle min-w-[244px] max-w-[244px]">
          <EnhancedValidatedInput
            value={result.circuitDescription}
            onChange={(value) => onUpdate(result.id, 'circuitDescription', value)}
            onCommit={(value) => {
              // Typing "spare" in the description cascades N/A to every
              // test + detail field — saves hunting for the Spare button
              // on the right-hand side of a 30-column table.
              const normalised = (value || '').trim().toLowerCase();
              if ((normalised === 'spare' || normalised === 'spare way') && onBulkUpdate) {
                onBulkUpdate(result.id, getSpareCircuitFields());
              }
            }}
            placeholder="e.g. Kitchen Ring — type 'spare' to N/A all fields"
            className="h-8 text-sm px-2 w-full"
            disabled={!!result.sourceCircuitId}
          />
        </TableCell>

        {/* Phase Type - Always visible */}
        <PhaseTypeCell result={result} onUpdate={onUpdate} />

        {/* Circuit Details */}
        {!isGroupCollapsed('circuit') && (
          <>
            <TypeOfWiringCell result={result} onUpdate={onUpdate} />
            <RefMethodCell result={result} onUpdate={onUpdate} />
            <PointsServedCell result={result} onUpdate={onUpdate} />
          </>
        )}

        {/* Collapsed groups keep ONE narrow column (matching the colSpan-1 group
            banner in the header) — placeholder cells keep every row's column
            count identical in collapsed state. */}
        {isGroupCollapsed('circuit') && <TableCell className="h-8 p-0" />}

        {/* Conductor Details */}
        {!isGroupCollapsed('conductor') && <ConductorCells result={result} onUpdate={onUpdate} />}
        {isGroupCollapsed('conductor') && <TableCell className="h-8 p-0" />}

        {/* Protective Device */}
        {!isGroupCollapsed('protection') && (
          <ProtectiveDeviceCells result={result} onUpdate={onUpdate} onBulkUpdate={onBulkUpdate} />
        )}
        {isGroupCollapsed('protection') && <TableCell className="h-8 p-0" />}

        {/* RCD Details */}
        {!isGroupCollapsed('rcdDetails') && (
          <RcdDetailsCells result={result} onUpdate={onUpdate} onBulkUpdate={onBulkUpdate} />
        )}
        {isGroupCollapsed('rcdDetails') && <TableCell className="h-8 p-0" />}

        {/* Continuity Tests */}
        {!isGroupCollapsed('continuity') && (
          <ContinuityCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        {isGroupCollapsed('continuity') && <TableCell className="h-8 p-0" />}

        {/* Insulation Tests */}
        {!isGroupCollapsed('insulation') && (
          <InsulationCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        {isGroupCollapsed('insulation') && <TableCell className="h-8 p-0" />}

        {/* Zs (Ω) Tests */}
        {!isGroupCollapsed('zs') && (
          <ZsCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        {isGroupCollapsed('zs') && <TableCell className="h-8 p-0" />}

        {/* RCD Tests */}
        {!isGroupCollapsed('rcd') && <RcdTestCells result={result} onUpdate={onUpdate} />}
        {isGroupCollapsed('rcd') && <TableCell className="h-8 p-0" />}

        {/* AFDD Test — single-column group, never collapsible (header has no
            toggle for it) */}
        <AfddCell result={result} onUpdate={onUpdate} />

        {/* Functional Test — same */}
        <FunctionalTestCell result={result} onUpdate={onUpdate} />

        {/* Remarks Column */}
        <RemarksCell result={result} onUpdate={onUpdate} />

        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableCell className="text-center h-8 p-1">{getRegulationStatusIcon()}</TableCell>
        )}
      </TableRow>

      {/* Enhanced Regulation Warning Dialog */}
      <EnhancedRegulationWarningDialog
        open={showRegulationWarning}
        onOpenChange={setShowRegulationWarning}
        warnings={regulationCompliance.warnings}
      />
    </>
  );
};

// Custom comparator: Set objects need deep comparison to avoid busting memo on every render
const arePropsEqual = (
  prev: EnhancedTestResultDesktopTableRowProps,
  next: EnhancedTestResultDesktopTableRowProps
) => {
  if (prev.result !== next.result) return false;
  if (prev.onUpdate !== next.onUpdate) return false;
  if (prev.onRemove !== next.onRemove) return false;
  if (prev.onBulkUpdate !== next.onBulkUpdate) return false;
  if (prev.onMoveUp !== next.onMoveUp) return false;
  if (prev.onMoveDown !== next.onMoveDown) return false;
  if (prev.canMoveUp !== next.canMoveUp) return false;
  if (prev.canMoveDown !== next.canMoveDown) return false;
  if (prev.showRegulationStatus !== next.showRegulationStatus) return false;
  if (prev.onDuplicate !== next.onDuplicate) return false;
  // Validation (TT vs TN Zs limits) is derived from the earthing arrangement —
  // omitting it left memoised rows showing stale red/amber tints after an
  // earthing change on the supply tab.
  if (prev.earthingArrangement !== next.earthingArrangement) return false;
  // Deep compare Sets: same size and same entries
  if (prev.collapsedGroups.size !== next.collapsedGroups.size) return false;
  for (const key of prev.collapsedGroups) {
    if (!next.collapsedGroups.has(key)) return false;
  }
  return true;
};

export default React.memo(EnhancedTestResultDesktopTableRow, arePropsEqual);
