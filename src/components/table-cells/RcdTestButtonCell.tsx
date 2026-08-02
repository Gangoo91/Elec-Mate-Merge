import React from 'react';
import { TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RcdTestButtonCellProps {
  value: string;
  onChange: (value: string) => void;
}

const RcdTestButtonCellComponent = ({ value, onChange }: RcdTestButtonCellProps) => {
  return (
    <TableCell className="p-0 h-8 align-middle text-center">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-sm px-1.5 gap-1 [&_svg]:h-3 [&_svg]:w-3 bg-transparent border border-transparent text-white rounded-md hover:bg-white/[0.04] focus:bg-transparent focus:ring-1 focus:ring-inset focus:ring-elec-yellow focus:shadow-none">
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-md z-[9999] min-w-[160px]">
          <SelectItem value="Pass" className="text-sm text-green-400">
            Pass
          </SelectItem>
          <SelectItem value="Fail" className="text-sm text-red-400">
            Fail
          </SelectItem>
          <SelectItem value="N/A" className="text-sm">
            N/A
          </SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const RcdTestButtonCell = React.memo(RcdTestButtonCellComponent);
