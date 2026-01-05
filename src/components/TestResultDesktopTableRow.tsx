
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { validateTestResult, getOverallCompliance } from '@/utils/testValidation';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, XCircle, CheckCircle, Shield } from 'lucide-react';
import {
  CircuitDetailsCells,
  TypeOfWiringCell,
  ConductorCells,
  ProtectiveDeviceCells,
  RcdDetailsCells,
  ContinuityCells,
  InsulationCells,
  ZsCells,
  RcdTestCells,
  AfddCell,
  
  RemarksCell
} from './TestResultDesktopTableCells';
import { CircuitNumberCell } from './table-cells/CircuitNumberCell';
import { ReferenceMethodCell } from './table-cells/ReferenceMethodCell';
import { PointsServedCell } from './table-cells/PointsServedCell';
import { FunctionalTestCell } from './table-cells/FunctionalTestCell';
import { Trash2 } from 'lucide-react';

interface TestResultDesktopTableRowProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  showRegulationStatus?: boolean;
  rowNumber?: number;
}

const TestResultDesktopTableRow: React.FC<TestResultDesktopTableRowProps> = ({ 
  result, 
  onUpdate, 
  onRemove,
  showRegulationStatus = false,
  rowNumber = 0
}) => {
  const [showRegulationDialog, setShowRegulationDialog] = useState(false);
  
  const validation = validateTestResult(result);
  const compliance = getOverallCompliance(validation);
  const regulationCheck = checkRegulationCompliance(result);
  
  const getRowBgColor = () => {
    if (result.sourceCircuitId) return 'bg-blue-50/20 hover:bg-blue-50/40';
    
    // Only show regulation status if explicitly enabled
    if (showRegulationStatus && regulationCheck.warnings.length > 0) {
      const hasCritical = regulationCheck.warnings.some(w => w.severity === 'critical');
      if (hasCritical) return 'hover:bg-red-50/40 border-l-4 border-l-red-400';
      return 'hover:bg-amber-50/40 border-l-4 border-l-amber-400';
    }
    
    // Default to test validation status
    switch (compliance.status) {
      case 'pass': return 'hover:bg-green-50/30';
      case 'warning': return 'hover:bg-amber-50/30';
      case 'fail': return 'hover:bg-red-50/30';
      default: return 'hover:bg-muted/20';
    }
  };

  const getRegulationStatusIcon = () => {
    if (!showRegulationStatus) return null;
    
    if (regulationCheck.warnings.length === 0) {
      return (
          <div title="No regulation issues">
          <CheckCircle className="h-3 w-3 text-green-500" />
        </div>
      );
    }
    
    const hasCritical = regulationCheck.warnings.some(w => w.severity === 'critical');
    if (hasCritical) {
      return (
        <div title={`${regulationCheck.warnings.length} issues (critical)`}>
          <XCircle className="h-3 w-3 text-red-500" />
        </div>
      );
    }
    
    return (
      <div title={`${regulationCheck.warnings.length} warnings`}>
        <AlertTriangle className="h-3 w-3 text-amber-500" />
      </div>
    );
  };

  const handleValidateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRegulationDialog(true);
  };

  // Get field completion status
  const getFieldCompletion = () => {
    const requiredFields: (keyof TestResult)[] = [
      'circuitNumber', 'circuitDescription', 'protectiveDeviceRating', 
      'r1r2', 'insulationLiveNeutral', 'insulationLiveEarth', 'zs'
    ];
    const filledCount = requiredFields.filter(field => result[field]).length;
    const percentage = Math.round((filledCount / requiredFields.length) * 100);
    
    if (percentage === 100) return { icon: '✅', color: 'text-success' };
    if (percentage > 50) return { icon: '⚠️', color: 'text-warning' };
    return { icon: '⭕', color: 'text-muted-foreground' };
  };

  const fieldCompletion = getFieldCompletion();

  return (
    <>
      <TableRow 
        data-circuit-id={result.id}
        className="bg-white hover:bg-neutral-50 border-b border-neutral-300 transition-colors h-5"
      >
        {/* Row Number Column - Sticky Left */}
        <TableCell className="sticky left-0 z-50 bg-neutral-100 font-medium text-neutral-700 text-center w-12">
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm">{rowNumber}</span>
            <span className={`text-xs ${fieldCompletion.color}`} title="Field completion status">
              {fieldCompletion.icon}
            </span>
          </div>
        </TableCell>

        {/* Circuit Number Column - Sticky after row number */}
        <TableCell className="sticky left-[48px] z-45 bg-black px-1 py-0 h-5 align-middle w-12">
          <CircuitNumberCell result={result} onUpdate={onUpdate} />
        </TableCell>

        {/* Circuit Description */}
        <CircuitDetailsCells result={result} onUpdate={onUpdate} />
        
        {/* Column 3: Type of wiring */}
        <TypeOfWiringCell result={result} onUpdate={onUpdate} />
        
        {/* Column 4: Reference method */}
        <ReferenceMethodCell result={result} onUpdate={onUpdate} />
        
        {/* Column 5: Number of points served */}
        <PointsServedCell result={result} onUpdate={onUpdate} />
        
        {/* Columns 6-7: Conductors */}
        <ConductorCells result={result} onUpdate={onUpdate} />
        
        {/* Columns 8-12: Overcurrent Protective Device */}
        <ProtectiveDeviceCells result={result} onUpdate={onUpdate} />
        
        {/* Columns 13-16: RCD Details */}
        <RcdDetailsCells result={result} onUpdate={onUpdate} />
        
        {/* Columns 18-21: Ring Final Circuit Tests (r₁, rₙ, r₂, R₁+R₂) */}
        <ContinuityCells result={result} onUpdate={onUpdate} validation={validation} />
        
        {/* Columns 22-24: Insulation Resistance */}
        <InsulationCells result={result} onUpdate={onUpdate} validation={validation} />
        
        {/* Columns 25-26: Polarity & Zs */}
        <ZsCells result={result} onUpdate={onUpdate} validation={validation} />
        
        {/* Columns 27-28: RCD Tests */}
        <RcdTestCells result={result} onUpdate={onUpdate} />
        
        {/* Column 29: AFDD Test */}
        <AfddCell result={result} onUpdate={onUpdate} />
        
        {/* Column 31: Functional Test */}
        <FunctionalTestCell result={result} onUpdate={onUpdate} />
        
        {/* Column 30: Remarks */}
        <RemarksCell result={result} onUpdate={onUpdate} />
        
        {/* BS 7671 Regulation Status */}
        {showRegulationStatus && (
          <td className="px-2 py-1 w-20">
            <div className="flex items-center gap-1">
              {getRegulationStatusIcon()}
              {regulationCheck.warnings.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleValidateClick}
                  className="h-6 px-2 text-xs"
                >
                  <Shield className="h-3 w-3" />
                </Button>
              )}
            </div>
          </td>
        )}

        {/* Actions - Bin Button */}
        <TableCell className="bg-black text-center w-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(result.id)}
            className="h-5 w-5 p-0 text-red-600 hover:text-red-700"
            title="Remove this circuit"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </TableCell>
      </TableRow>

      <EnhancedRegulationWarningDialog
        open={showRegulationDialog}
        onOpenChange={setShowRegulationDialog}
        warnings={regulationCheck.warnings}
        circuitDescription={result.circuitDescription || `Circuit ${result.circuitNumber}`}
        onApprove={() => setShowRegulationDialog(false)}
        onReject={() => setShowRegulationDialog(false)}
      />
    </>
  );
};

export default TestResultDesktopTableRow;
