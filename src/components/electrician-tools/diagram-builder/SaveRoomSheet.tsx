import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';

interface SaveRoomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
  defaultName?: string;
}

export const SaveRoomSheet = ({ open, onOpenChange, onSave, defaultName = '' }: SaveRoomSheetProps) => {
  const [name, setName] = useState(defaultName);
  const haptic = useHaptic();

  useEffect(() => {
    if (open) {
      setName(defaultName);
    }
  }, [defaultName, open]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      haptic.warning();
      return;
    }
    onSave(trimmed);
    setName('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] lg:h-auto p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between w-full max-w-lg mx-auto px-4 py-3 border-b border-white/10">
            <SheetTitle className="text-white text-base font-semibold">Save Room</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="h-11 w-11 flex items-center justify-center text-white touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 w-full max-w-lg mx-auto p-4 space-y-4">
            <div>
              <label
                htmlFor="save-room-name"
                className="text-[12px] text-white font-medium mb-1 block"
              >
                Room name
              </label>
              <Input
                id="save-room-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kitchen"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
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
