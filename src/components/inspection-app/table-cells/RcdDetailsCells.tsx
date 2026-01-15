import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { rcdTypeOptions } from '@/types/wiringTypes';
import { rcdBsStandardOptions } from '@/types/protectiveDeviceTypes';
import ValidatedInput from '../ValidatedInput';

interface RcdDetailsCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
}

const RcdDetailsCellsComponent: React.FC<RcdDetailsCellsProps> = ({ result, onUpdate, onBulkUpdate }) => {
  const handleRcdBsStandardChange = useCallback((value: string) => {
    onUpdate(result.id, 'rcdBsStandard', value);
  }, [result.id, onUpdate]);

  const handleRcdTypeChange = useCallback((value: string) => {
    onUpdate(result.id, 'rcdType', value);
  }, [result.id, onUpdate]);

  const handleRcdRatingChange = useCallback((value: string) => {
    onUpdate(result.id, 'rcdRating', value);
  }, [result.id, onUpdate]);

  return (
    <>
      {/* Column 13: BS (EN) - RCD */}
      <TableCell className="p-0 bg-black h-5 align-middle w-40 min-w-[140px] max-w-[140px]">
        <MobileSelectPicker
          value={result.rcdBsStandard || ''}
          onValueChange={handleRcdBsStandardChange}
          options={rcdBsStandardOptions}
          placeholder="BS EN"
          title="RCD BS (EN) Standard"
        />
      </TableCell>

      {/* Column 14: Type - RCD */}
      <TableCell className="p-0 bg-black h-5 align-middle w-28 min-w-[105px] max-w-[105px]">
        <MobileSelectPicker
          value={result.rcdType || ''}
          onValueChange={handleRcdTypeChange}
          options={rcdTypeOptions}
          placeholder="Type"
          title="RCD Type"
        />
      </TableCell>

      {/* Column 15: IΔn (mA) */}
      <TableCell className="p-0 bg-black h-5 align-middle w-28 min-w-[100px] max-w-[100px]">
        <MobileSelectPicker
          value={result.rcdRating || ''}
          onValueChange={handleRcdRatingChange}
          options={[
            { value: '10mA', label: '10mA' },
            { value: '30mA', label: '30mA' },
            { value: '100mA', label: '100mA' },
            { value: '300mA', label: '300mA' },
            { value: '500mA', label: '500mA' },
          ]}
          placeholder="mA"
          title="RCD Rating (mA)"
        />
      </TableCell>

      {/* Column 16: Rating (A) - RCD */}
      <TableCell className="p-0 bg-black h-5 align-middle w-20 min-w-[75px] max-w-[75px]">
        <ValidatedInput
          value={result.rcdRatingA || ''}
          onChange={(value) => onUpdate(result.id, 'rcdRatingA', value)}
          className="h-4 text-xs text-center px-0 bg-transparent border-0 rounded-none focus-visible:ring-0 focus:bg-blue-50"
          placeholder="A"
        />
      </TableCell>
    </>
  );
};

export const RcdDetailsCells = React.memo(RcdDetailsCellsComponent);
