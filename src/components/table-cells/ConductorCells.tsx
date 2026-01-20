
import React, { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import { cableSizeOptions } from '@/types/cableTypes';

interface ConductorCellsProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const ConductorCellsComponent: React.FC<ConductorCellsProps> = ({ result, onUpdate }) => {
  const handleLiveSizeChange = useCallback((value: string) => {
    onUpdate(result.id, 'liveSize', value);
  }, [result.id, onUpdate]);

  const handleCpcSizeChange = useCallback((value: string) => {
    onUpdate(result.id, 'cpcSize', value);
  }, [result.id, onUpdate]);

  return (
    <>
      {/* Column 8: Live (mm²) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <Select
          name={`liveSize-${result.id}`}
          value={result.liveSize || ''}
          onValueChange={handleLiveSizeChange}
        >
          <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
            <SelectValue placeholder="Live" />
          </SelectTrigger>
          <SelectContent key={`liveSize-content-${result.id}`} className="bg-background border border-border rounded-md z-[100]">
            {cableSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Column 9: CPC (mm²) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <Select
          name={`cpcSize-${result.id}`}
          value={result.cpcSize || ''}
          onValueChange={handleCpcSizeChange}
        >
          <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
            <SelectValue placeholder="CPC" />
          </SelectTrigger>
          <SelectContent key={`cpcSize-content-${result.id}`} className="bg-background border border-border rounded-md z-[100]">
            {cableSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs text-neutral-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </>
  );
};

export const ConductorCells = React.memo(ConductorCellsComponent);
