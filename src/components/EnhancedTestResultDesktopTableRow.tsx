import React, { useState, useMemo } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { validateTestResult } from '@/utils/testValidation';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';

// Import all the cell components
import { CircuitNumberCell } from './table-cells/CircuitNumberCell';
import { CircuitDetailsCells } from './table-cells/CircuitDetailsCells';
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
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  showRegulationStatus?: boolean;
  collapsedGroups: Set<string>;
  rowNumber: number;
}

const EnhancedTestResultDesktopTableRow: React.FC<EnhancedTestResultDesktopTableRowProps> = ({ 
  result, 
  onUpdate, 
  onRemove, 
  onBulkUpdate,
  showRegulationStatus = false,
  collapsedGroups,
  rowNumber
}) => {
  const [showRegulationWarning, setShowRegulationWarning] = useState(false);
  
  // Validate the test result - memoized to prevent expensive recalculation
  const validation = useMemo(() => validateTestResult(result), [result]);
  
  // Get overall compliance status
  const getOverallCompliance = (validation: any) => {
    const hasErrors = Object.values(validation).some((v: any) => v?.type === 'error');
    const hasWarnings = Object.values(validation).some((v: any) => v?.type === 'warning');
    
    if (hasErrors) return 'error';
    if (hasWarnings) return 'warning';
    return 'success';
  };

  // Check regulation compliance - memoized to prevent expensive recalculation
  const regulationCompliance = useMemo(() => checkRegulationCompliance(result), [result]);
  
  // Determine row background color based on validation status and regulation compliance
  const getRowBgColor = () => {
    const overallCompliance = getOverallCompliance(validation);

    if (overallCompliance === 'error') {
      return 'bg-red-500/10 hover:bg-red-500/20';
    }
    if (overallCompliance === 'warning') {
      return 'bg-amber-500/10 hover:bg-amber-500/20';
    }
    // All rows use the same dark background - no special blue for auto-filled
    return 'bg-card hover:bg-muted/30';
  };

  // Get regulation status icon
  const getRegulationStatusIcon = () => {
    if (!regulationCompliance.isCompliant) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-5 w-5 p-0 text-red-600 hover:text-red-700"
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
          className="h-5 w-5 p-0 text-amber-600 hover:text-amber-700"
          onClick={handleValidateClick}
          title="Click to view validation warnings"
        >
          <AlertTriangle className="h-3 w-3" />
        </Button>
      );
    }
    
    return (
      <div className="flex items-center justify-center">
        <CheckCircle className="h-3 w-3 text-green-600" />
      </div>
    );
  };

  const handleValidateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRegulationWarning(true);
  };

  const isGroupCollapsed = (groupName: string) => collapsedGroups.has(groupName);

  // Field completion indicator
  const getFieldCompletion = () => {
    const requiredFields = [
      'circuitDesignation', 'circuitDescription', 'liveSize', 'cpcSize',
      'bsStandard', 'protectiveDeviceRating', 'maxZs', 'insulationLiveNeutral',
      'insulationLiveEarth', 'polarity', 'zs'
    ];
    
    const filledFields = requiredFields.filter(field => {
      const value = result[field as keyof TestResult];
      return value && value !== '';
    });
    
    const completionPercentage = (filledFields.length / requiredFields.length) * 100;
    
    if (completionPercentage === 100) {
      return { icon: '✅', color: 'text-green-600', title: '100% Complete' };
    } else if (completionPercentage >= 50) {
      return { icon: '⚠️', color: 'text-amber-600', title: `${Math.round(completionPercentage)}% Complete` };
    } else {
      return { icon: '⭕', color: 'text-muted-foreground', title: `${Math.round(completionPercentage)}% Complete` };
    }
  };

  const fieldCompletion = getFieldCompletion();

  return (
    <>
      <TableRow
        data-circuit-id={result.id}
        className={`${getRowBgColor()} border-b border-border/30 transition-colors`}
      >
        {/* Circuit Number - Always visible */}
        <TableCell className="sticky left-0 z-30 p-0 h-8 align-middle w-20 min-w-[80px] max-w-[80px]" style={{ backgroundColor: 'inherit' }}>
          <EnhancedValidatedInput
            value={result.circuitDesignation}
            onChange={(value) => onUpdate(result.id, 'circuitDesignation', value)}
            className="h-8 text-sm text-center px-1 w-full"
            disabled={!!result.sourceCircuitId}
          />
        </TableCell>

        {/* Phase Type - Always visible */}
        <PhaseTypeCell result={result} onUpdate={onUpdate} />

        {/* Circuit Details */}
        {!isGroupCollapsed('circuit') && (
          <>
            <TableCell className="sticky left-[80px] z-30 p-0 h-8 align-middle min-w-[220px] max-w-[220px]" style={{ backgroundColor: 'inherit' }}>
              <EnhancedValidatedInput
                value={result.circuitDescription}
                onChange={(value) => onUpdate(result.id, 'circuitDescription', value)}
                placeholder="e.g. Kitchen Ring, Upstairs Lighting"
                className="h-8 text-sm px-2 w-full"
                disabled={!!result.sourceCircuitId}
              />
            </TableCell>
            <TypeOfWiringCell result={result} onUpdate={onUpdate} />
            <RefMethodCell result={result} onUpdate={onUpdate} />
            <PointsServedCell result={result} onUpdate={onUpdate} />
          </>
        )}
        
        {/* Conductor Details */}
        {!isGroupCollapsed('conductor') && (
          <ConductorCells result={result} onUpdate={onUpdate} />
        )}
        
        {/* Protective Device */}
        {!isGroupCollapsed('protection') && (
          <ProtectiveDeviceCells result={result} onUpdate={onUpdate} onBulkUpdate={onBulkUpdate} />
        )}
        
        {/* RCD Details */}
        {!isGroupCollapsed('rcdDetails') && (
          <RcdDetailsCells result={result} onUpdate={onUpdate} onBulkUpdate={onBulkUpdate} />
        )}
        
        {/* Continuity Tests */}
        {!isGroupCollapsed('continuity') && (
          <ContinuityCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        
        {/* Insulation Tests */}
        {!isGroupCollapsed('insulation') && (
          <InsulationCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        
        {/* Zs (Ω) Tests */}
        {!isGroupCollapsed('zs') && (
          <ZsCells result={result} onUpdate={onUpdate} validation={validation} />
        )}
        
        {/* RCD Tests */}
        {!isGroupCollapsed('rcd') && (
          <RcdTestCells result={result} onUpdate={onUpdate} />
        )}
        
        {/* AFDD Test */}
        {!isGroupCollapsed('afdd') && (
          <AfddCell result={result} onUpdate={onUpdate} />
        )}
        

        {/* Functional Test */}
        {!isGroupCollapsed('functional') && (
          <FunctionalTestCell result={result} onUpdate={onUpdate} />
        )}

        {/* Remarks Column */}
        <RemarksCell result={result} onUpdate={onUpdate} />

        {/* Regulation Status Column */}
        {showRegulationStatus && (
          <TableCell className="text-center h-8 p-1">
            {getRegulationStatusIcon()}
          </TableCell>
        )}

        {/* Actions Column */}
        <TableCell className="text-center h-8 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(result.id)}
            className="h-7 w-7 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
            title="Remove this circuit"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
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

export default React.memo(EnhancedTestResultDesktopTableRow);
