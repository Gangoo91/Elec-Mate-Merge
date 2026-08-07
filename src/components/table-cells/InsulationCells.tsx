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
import type { CellWarning } from '@/utils/cellWarnings';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { TestValidationResults } from '@/utils/testValidation';
import { EnhancedValidatedInput } from './EnhancedValidatedInput';
import { BulkPasteButton } from './BulkPasteButton';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { getIrMaxForVoltage, isBlankReading } from '@/utils/irDefaults';

interface InsulationCellsProps {
  /** BS 7671 findings that name a cell in this group, keyed by field. */
  cellWarnings?: Partial<Record<keyof TestResult, CellWarning>>;
  /** Opens the finding in the Validate sheet. */
  onOpenWarning?: () => void;
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  validation: TestValidationResults;
  allResults?: TestResult[];
  onBulkUpdate?: (field: keyof TestResult, value: string) => void;
}

/**
 * One-tap fill with the tester's ceiling reading (ELE-1438/1467).
 *
 * Declared at module scope on purpose: defined inside the cell it would get a
 * fresh component identity on every render and remount on each keystroke.
 */
const FillMaxButton: React.FC<{ value: string; onFill: () => void }> = ({ value, onFill }) => (
  <button
    type="button"
    onClick={onFill}
    title={`Fill with your tester's maximum (${value})`}
    aria-label={`Fill with tester maximum ${value}`}
    className="shrink-0 rounded px-1 text-[11px] font-semibold leading-none text-elec-yellow hover:bg-white/[0.08] touch-manipulation"
  >
    Max
  </button>
);

const InsulationCellsComponent: React.FC<InsulationCellsProps> = ({
  result,
  onUpdate,
  cellWarnings,
  onOpenWarning,
  validation,
  allResults,
  onBulkUpdate,
}) => {
  // Live-Live and Live-Earth only — A4:2026 model form has no N-E column (ELE-1226)
  const liveLiveValue = result.insulationLiveNeutral || '';
  const liveEarthValue = result.insulationLiveEarth || '';

  // ELE-1438/1467 — the tester's ceiling reading for the voltage on THIS row,
  // from Settings → Business → Instruments. A healthy circuit reads off the
  // scale, so this is the same value over and over; offering it as one tap
  // beats typing ">1049" on every circuit. Shown only when a max is saved and
  // the cell is still empty — never overwrites a real reading.
  // useCompanyProfile is React-Query cached on a shared key, so the rows all
  // read one fetch rather than one each.
  const { companyProfile } = useCompanyProfile();
  const irMax = getIrMaxForVoltage(
    companyProfile?.testing_instruments,
    result.insulationTestVoltage
  );


  return (
    <>
      {/* Column 21: Test voltage (V) */}
      <TableCell className="p-0 h-8 align-middle w-28 min-w-[104px] max-w-[104px]">
        <Select
          value={result.insulationTestVoltage || ''}
          onValueChange={(value) => onUpdate(result.id, 'insulationTestVoltage', value)}
        >
          <SelectTrigger className="h-8 text-sm px-1.5 gap-1 [&_svg]:h-3 [&_svg]:w-3 bg-transparent border border-transparent text-white rounded-md hover:bg-white/[0.04] focus:bg-transparent focus:ring-1 focus:ring-inset focus:ring-elec-yellow focus:shadow-none">
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
          regulationWarning={cellWarnings?.insulationLiveNeutral}
          onOpenWarning={onOpenWarning}
            value={liveLiveValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveNeutral', value)}
            className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
            validation={validation.insulationLiveNeutral}
            placeholder="—"
          />
          {irMax && isBlankReading(liveLiveValue) && <FillMaxButton value={irMax} onFill={() => onUpdate(result.id, 'insulationLiveNeutral', irMax)} />}
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
          regulationWarning={cellWarnings?.insulationLiveEarth}
          onOpenWarning={onOpenWarning}
            value={liveEarthValue}
            onChange={(value) => onUpdate(result.id, 'insulationLiveEarth', value)}
            className="h-8 text-sm text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow focus:shadow-none hover:bg-white/[0.04] focus:bg-transparent"
            validation={validation.insulationLiveEarth}
            placeholder="—"
          />
          {irMax && isBlankReading(liveEarthValue) && <FillMaxButton value={irMax} onFill={() => onUpdate(result.id, 'insulationLiveEarth', irMax)} />}
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
