import React from 'react';
import { TableCell } from '@/components/ui/table';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

interface RcdTestButtonCellProps {
  value: string;
  onChange: (value: string) => void;
}

const RcdTestButtonCellComponent = ({ value, onChange }: RcdTestButtonCellProps) => {
  return (
    <TableCell className="text-center">
      <MobileSelectPicker
        value={value}
        onValueChange={onChange}
        options={[
          { value: 'Pass', label: 'Pass' },
          { value: 'Fail', label: 'Fail' },
          { value: 'N/A', label: 'N/A' },
        ]}
        placeholder="Select"
        title="RCD Test Button"
      />
    </TableCell>
  );
};

export const RcdTestButtonCell = React.memo(RcdTestButtonCellComponent);
