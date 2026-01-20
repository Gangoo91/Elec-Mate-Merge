import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { TestValidationResults } from '@/utils/testValidation';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { BulkPasteButton } from './BulkPasteButton';

interface InsulationCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
  allResults?: TestResult[];
  onBulkUpdate?: (field: keyof TestResult, value: string) => void;
}

const InsulationCellsComponent: React.FC<InsulationCellsProps> = ({ 
  result, 
  onUpdate, 
  validation,
  allResults,
  onBulkUpdate
}) => {
  // Use specific fields for Live-Live and Live-Earth
  const liveLiveValue = result.insulationLiveNeutral || '';
  const liveEarthValue = result.insulationLiveEarth || '';
  
  return (
    <>
      {/* Column 21: Test voltage (V) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[80px] max-w-[80px]">
        <MobileSelectPicker
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
          options={insulationTestVoltageOptions}
          placeholder="Test V"
          title="Test Voltage"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>
      
      {/* Column 22: Live - Live (MΩ) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[80px] max-w-[80px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={liveLiveValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveNeutral', value)}
            className="h-4 text-xs text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
            validation={validation.insulationLiveNeutral}
            placeholder="MΩ"
          />
          {allResults && onBulkUpdate && liveLiveValue && (
            <BulkPasteButton
              value={liveLiveValue}
              fieldName="insulationLiveNeutral"
              fieldLabel="Live-Live (MΩ)"
              testResults={allResults}
              onBulkUpdate={onBulkUpdate}
            />
          )}
        </div>
      </TableCell>
      
      {/* Column 23: Live - Earth (MΩ) */}
      <TableCell className="p-0 h-8 align-middle w-20 min-w-[80px] max-w-[80px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={liveEarthValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveEarth', value)}
            className="h-4 text-xs text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
            validation={validation.insulationLiveEarth}
            placeholder="MΩ"
          />
          {allResults && onBulkUpdate && liveEarthValue && (
            <BulkPasteButton
              value={liveEarthValue}
              fieldName="insulationLiveEarth"
              fieldLabel="Live-Earth (MΩ)"
              testResults={allResults}
              onBulkUpdate={onBulkUpdate}
            />
          )}
        </div>
      </TableCell>
    </>
  );
};

export const InsulationCells = React.memo(InsulationCellsComponent);
