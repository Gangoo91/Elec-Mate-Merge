import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <Select
          name={`rcdBsStandard-${result.id}`}
          value={result.rcdBsStandard || ''}
          onValueChange={handleRcdBsStandardChange}
        >
          <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0 focus:bg-transparent data-[state=open]:bg-transparent">
            <SelectValue placeholder="BS EN" />
          </SelectTrigger>
          <SelectContent 
            key={`rcdBsStandard-content-${result.id}`} 
            position="popper"
            sideOffset={5}
            className="bg-background border border-border rounded-md z-[9999]"
          >
            {rcdBsStandardOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 14: Type - RCD */}
      <TableCell className="p-0 bg-black h-5 align-middle w-28 min-w-[105px] max-w-[105px]">
        <Select
          name={`rcdType-${result.id}`}
          value={result.rcdType || ''}
          onValueChange={handleRcdTypeChange}
        >
          <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0 focus:bg-transparent data-[state=open]:bg-transparent">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent 
            key={`rcdType-content-${result.id}`} 
            position="popper"
            sideOffset={5}
            className="bg-background border border-border rounded-md z-[9999]"
          >
            {rcdTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 15: IΔn (mA) */}
      <TableCell className="p-0 bg-black h-5 align-middle w-28 min-w-[100px] max-w-[100px]">
        <Select
          name={`rcdRating-${result.id}`}
          value={result.rcdRating || ''}
          onValueChange={handleRcdRatingChange}
        >
          <SelectTrigger className="h-4 text-xs px-0 bg-transparent border-0 rounded-none focus:ring-0 focus:bg-transparent data-[state=open]:bg-transparent">
            <SelectValue placeholder="mA" />
          </SelectTrigger>
          <SelectContent 
            key={`rcdRating-content-${result.id}`} 
            position="popper"
            sideOffset={5}
            className="bg-background border border-border rounded-md z-[9999]"
          >
            <SelectItem value="10mA" className="text-xs text-neutral-100">10mA</SelectItem>
            <SelectItem value="30mA" className="text-xs text-neutral-100">30mA</SelectItem>
            <SelectItem value="100mA" className="text-xs text-neutral-100">100mA</SelectItem>
            <SelectItem value="300mA" className="text-xs text-neutral-100">300mA</SelectItem>
            <SelectItem value="500mA" className="text-xs text-neutral-100">500mA</SelectItem>
          </SelectContent>
        </Select>
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
