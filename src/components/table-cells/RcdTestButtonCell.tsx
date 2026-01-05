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
    <TableCell className="text-center">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-24 bg-transparent">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pass" className="text-sm text-green-600">Pass</SelectItem>
          <SelectItem value="Fail" className="text-sm text-red-600">Fail</SelectItem>
          <SelectItem value="N/A" className="text-sm">N/A</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};

export const RcdTestButtonCell = React.memo(RcdTestButtonCellComponent);
