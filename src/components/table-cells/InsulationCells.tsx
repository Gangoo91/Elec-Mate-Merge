import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  onBulkUpdate,
}) => {
  // Use specific fields for Live-Live, Live-Earth and Neutral-Earth (ELE-868)
  const liveLiveValue = result.insulationLiveNeutral || '';
  const liveEarthValue = result.insulationLiveEarth || '';
  const neutralEarthValue = result.insulationNeutralEarth || '';

  return (
    <>
      {/* Column 21: Test voltage (V) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[104px] max-w-[104px]">
        <Select
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
        >
          <SelectTrigger className="h-8 text-sm px-1.5 gap-1 [&_svg]:h-3 [&_svg]:w-3 bg-transparent border border-transparent text-white rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border rounded-md z-[9999] min-w-[160px]">
            {insulationTestVoltageOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-xs text-white"
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 22: Live - Live (MΩ) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[104px] max-w-[104px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={liveLiveValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveNeutral', value)}
            className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
            validation={validation.insulationLiveNeutral}
            placeholder="—"
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
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[104px] max-w-[104px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={liveEarthValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveEarth', value)}
            className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
            validation={validation.insulationLiveEarth}
            placeholder="—"
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

      {/* Column 24: Neutral - Earth (MΩ) — ELE-868 (Mark Glowacki: PDF has N-E
          column but UI was missing the input). Same pattern as L-L / L-E. */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[104px] max-w-[104px]">
        <div className="flex items-center gap-1">
          <EnhancedValidatedInput
            value={neutralEarthValue}
            onChange={(value) => onUpdate(result.id, 'insulationNeutralEarth', value)}
            className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 hover:bg-muted/20 focus:bg-muted/30"
            placeholder="—"
          />
          {allResults && onBulkUpdate && neutralEarthValue && (
            <BulkPasteButton
              value={neutralEarthValue}
              fieldName="insulationNeutralEarth"
              fieldLabel="Neutral-Earth (MΩ)"
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
