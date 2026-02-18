import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddItemButtonProps {
  onAdd: () => void;
  autoScroll?: boolean;
}

export const AddItemButton = ({ onAdd, autoScroll = true }: AddItemButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleAdd = () => {
    onAdd();
    if (autoScroll && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  return (
    <Button
      ref={ref}
      onClick={handleAdd}
      variant="outline"
      className="w-full h-11 touch-manipulation border-dashed border-white/20 text-white hover:border-emerald-500 hover:text-emerald-400"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Item
    </Button>
  );
};
