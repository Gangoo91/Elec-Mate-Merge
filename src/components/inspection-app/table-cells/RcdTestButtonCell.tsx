import React from 'react';
import { TableCell } from '@/components/ui/table';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

interface RcdTestButtonCellProps {
  value: string;
  onChange: (value: string) => void;
}

const RcdTestButtonCellComponent = ({ value, onChange }: RcdTestButtonCellProps) => {
  return (
    <TableCell className="p-0 h-8 align-middle text-center">
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
        triggerClassName="h-8 bg-transparent border-0 hover:bg-muted/20 focus:bg-muted/30"
      />
    </TableCell>
  );
};

export const RcdTestButtonCell = React.memo(RcdTestButtonCellComponent);
