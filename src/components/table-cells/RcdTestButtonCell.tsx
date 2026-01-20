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
        <SelectTrigger className="h-8 text-sm px-2 bg-transparent border-0 rounded-md hover:bg-muted/20 focus:bg-muted/30 focus:ring-1 focus:ring-elec-yellow/30">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border rounded-md z-[100]">
          <SelectItem value="Pass" className="text-sm text-green-400">Pass</SelectItem>
          <SelectItem value="Fail" className="text-sm text-red-400">Fail</SelectItem>
          <SelectItem value="N/A" className="text-sm">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const RcdTestButtonCell = React.memo(RcdTestButtonCellComponent);
