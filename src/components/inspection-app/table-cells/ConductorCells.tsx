
import React, { useCallback } from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
        <MobileSelectPicker
          value={result.liveSize || ''}
          onValueChange={handleLiveSizeChange}
          options={cableSizeOptions}
          placeholder="Live"
          title="Live Conductor Size"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>

      {/* Column 9: CPC (mm²) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <MobileSelectPicker
          value={result.cpcSize || ''}
          onValueChange={handleCpcSizeChange}
          options={cableSizeOptions}
          placeholder="CPC"
          title="CPC Size"
          triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
        />
      </TableCell>
    </>
  );
};

export const ConductorCells = React.memo(ConductorCellsComponent);
