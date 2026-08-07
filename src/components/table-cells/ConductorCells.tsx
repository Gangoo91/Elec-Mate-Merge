import React, { useCallback } from 'react';
import { TableCell } from '@/components/ui/table';
import { TestResult } from '@/types/testResult';
import type { CellWarning } from '@/utils/cellWarnings';
import { cableSizeOptions } from '@/types/cableTypes';
import ComboboxCell from './ComboboxCell';

interface ConductorCellsProps {
  cellWarnings?: Partial<Record<keyof TestResult, CellWarning>>;
  onOpenWarning?: () => void;
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

const ConductorCellsComponent: React.FC<ConductorCellsProps> = ({ result, onUpdate, cellWarnings, onOpenWarning }) => {
  const handleLiveSizeChange = useCallback(
    (value: string) => {
      onUpdate(result.id, 'liveSize', value);
    },
    [result.id, onUpdate]
  );

  const handleCpcSizeChange = useCallback(
    (value: string) => {
      onUpdate(result.id, 'cpcSize', value);
    },
    [result.id, onUpdate]
  );

  return (
    <>
      {/* Column 8: Live (mm²) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <ComboboxCell
          regulationWarning={cellWarnings?.liveSize}
          onOpenWarning={onOpenWarning}
          value={result.liveSize || ''}
          onChange={handleLiveSizeChange}
          options={cableSizeOptions}
          placeholder="—"
          compact
        />
      </TableCell>

      {/* Column 9: CPC (mm²) */}
      <TableCell className="p-0 h-8 align-middle w-24 min-w-[90px] max-w-[90px]">
        <ComboboxCell
          regulationWarning={cellWarnings?.cpcSize}
          onOpenWarning={onOpenWarning}
          value={result.cpcSize || ''}
          onChange={handleCpcSizeChange}
          options={cableSizeOptions}
          placeholder="—"
          compact
        />
      </TableCell>
    </>
  );
};

export const ConductorCells = React.memo(ConductorCellsComponent);
