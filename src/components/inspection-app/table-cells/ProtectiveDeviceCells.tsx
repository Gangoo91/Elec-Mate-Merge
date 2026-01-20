import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { protectiveDeviceTypeOptions, protectiveDeviceRatingOptions, protectiveDeviceCurveOptions, bsStandardOptions, bsStandardRequiresCurve } from '@/types/protectiveDeviceTypes';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { FieldTooltip } from '@/components/ui/field-tooltip';

interface ProtectiveDeviceCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
}

const ProtectiveDeviceCellsComponent: React.FC<ProtectiveDeviceCellsProps> = ({ result, onUpdate, onBulkUpdate }) => {
  // Show curve selector only for MCB/RCBO types (based on BS Standard)
  const showCurveSelector = bsStandardRequiresCurve(result.bsStandard || '');

  // Handle BS Standard change
  const handleBsStandardChange = useCallback((value: string) => {
    const updates: Partial<TestResult> = {
      bsStandard: value
    };
    
    // Clear curve if switching away from MCB/RCBO standards
    const needsCurve = bsStandardRequiresCurve(value);
    if (!needsCurve && result.protectiveDeviceCurve) {
      updates.protectiveDeviceCurve = '';
    }
    
    // Auto-fill maxZs if we have all required data
    const rating = result.protectiveDeviceRating || '';
    const curve = needsCurve ? (result.protectiveDeviceCurve || '') : '';
    if (rating && (needsCurve ? curve : true)) {
      const maxZs = getMaxZsFromDeviceDetails(value, curve, rating);
      if (maxZs !== null) {
        updates.maxZs = maxZs.toString();
      }
    }
    
    // Use bulk update if available, otherwise fall back to individual updates
    if (onBulkUpdate) {
      onBulkUpdate(result.id, updates);
    } else {
      Object.entries(updates).forEach(([field, val]) => {
        onUpdate(result.id, field as keyof TestResult, val as string);
      });
    }
  }, [result.id, result.protectiveDeviceCurve, result.protectiveDeviceRating, onUpdate, onBulkUpdate]);

  // Handle Curve change
  const handleCurveChange = useCallback((value: string) => {
    const updates: Partial<TestResult> = {
      protectiveDeviceCurve: value
    };
    
    // Auto-fill maxZs if we have all required data
    const bsStandard = result.bsStandard || '';
    const rating = result.protectiveDeviceRating || '';
    if (bsStandard && rating) {
      const maxZs = getMaxZsFromDeviceDetails(bsStandard, value, rating);
      if (maxZs !== null) {
        updates.maxZs = maxZs.toString();
      }
    }
    
    // Use bulk update if available, otherwise fall back to individual updates
    if (onBulkUpdate) {
      onBulkUpdate(result.id, updates);
    } else {
      Object.entries(updates).forEach(([field, val]) => {
        onUpdate(result.id, field as keyof TestResult, val as string);
      });
    }
  }, [result.id, result.bsStandard, result.protectiveDeviceRating, onUpdate, onBulkUpdate]);

  // Handle Rating change
  const handleRatingChange = useCallback((value: string) => {
    const updates: Partial<TestResult> = {
      protectiveDeviceRating: value
    };
    
    // Auto-fill maxZs if we have all required data
    const bsStandard = result.bsStandard || '';
    const curve = result.protectiveDeviceCurve || '';
    const needsCurve = bsStandardRequiresCurve(bsStandard);
    if (bsStandard && (needsCurve ? curve : true)) {
      const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, value);
      if (maxZs !== null) {
        updates.maxZs = maxZs.toString();
      }
    }
    
    // Use bulk update if available, otherwise fall back to individual updates
    if (onBulkUpdate) {
      onBulkUpdate(result.id, updates);
    } else {
      Object.entries(updates).forEach(([field, val]) => {
        onUpdate(result.id, field as keyof TestResult, val as string);
      });
    }
  }, [result.id, result.bsStandard, result.protectiveDeviceCurve, onUpdate, onBulkUpdate]);

  return (
    <>
      {/* Column 8: BS (EN) */}
      <TableCell className="p-0 h-8 align-middle w-36 min-w-[140px] max-w-[140px]">
        <MobileSelectPicker
          value={result.bsStandard || ''}
          onValueChange={handleBsStandardChange}
          options={bsStandardOptions}
          placeholder="BS EN"
          title="BS (EN) Standard"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>

      {/* Column 9: Type (Curve) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <MobileSelectPicker
          value={result.protectiveDeviceCurve || ''}
          onValueChange={handleCurveChange}
          options={protectiveDeviceCurveOptions}
          placeholder="Type"
          title="Protective Device Curve"
          disabled={!showCurveSelector}
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>

      {/* Column 10: Rating (A) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[95px] max-w-[95px]">
        <MobileSelectPicker
          value={result.protectiveDeviceRating || ''}
          onValueChange={handleRatingChange}
          options={protectiveDeviceRatingOptions}
          placeholder="A"
          title="Device Rating (A)"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>

      {/* Column 11: Breaking capacity (kA) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <EnhancedValidatedInput
          value={result.protectiveDeviceKaRating}
          onChange={(value) => onUpdate(result.id, 'protectiveDeviceKaRating', value)}
          className="h-8 text-sm text-center px-1"
          placeholder="kA"
        />
      </TableCell>

      {/* Column 12: Maximum permitted Zs (Ω)§ */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[100px] max-w-[100px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={result.maxZs || ''}
            onChange={(value) => onUpdate(result.id, 'maxZs', value)}
            className="h-8 text-sm text-center px-1"
            placeholder="Ω"
          />
          <FieldTooltip
            content="Maximum Zs values from BS 7671 Tables 41.2, 41.3, 41.4. These are the maximum permitted values - the tables already account for Cmin (0.95)."
            regulation="BS 7671 Chapter 41"
          />
        </div>
      </TableCell>
    </>
  );
};

export const ProtectiveDeviceCells = React.memo(ProtectiveDeviceCellsComponent);
