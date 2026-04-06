import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SaveRoomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
  defaultName?: string;
}

export const SaveRoomSheet = ({ open, onOpenChange, onSave, defaultName = '' }: SaveRoomSheetProps) => {
  const [name, setName] = useState(defaultName);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[50vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-white/10">
            <SheetTitle className="text-white text-base font-semibold">Save Room</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="h-11 w-11 flex items-center justify-center text-white touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 p-4 space-y-4">
            <div>
              <label className="text-sm text-white font-medium mb-1.5 block">Room Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kitchen"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                }}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={!name.trim()}
              className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-base touch-manipulation"
            >
              Save Room
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
