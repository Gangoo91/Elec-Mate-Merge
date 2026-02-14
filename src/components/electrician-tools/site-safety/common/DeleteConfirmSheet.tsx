import { AlertTriangle } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DeleteConfirmSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmSheet({
  open,
  onOpenChange,
  onConfirm,
  title = 'Delete Record?',
  description = 'This cannot be undone',
  isDeleting = false,
}: DeleteConfirmSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto rounded-t-2xl p-0">
        <div className="p-3">
          <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-3" />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs text-white">{description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 rounded-xl bg-white/10 text-sm font-medium text-white touch-manipulation active:bg-white/15"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onOpenChange(false);
                onConfirm();
              }}
              disabled={isDeleting}
              className="flex-1 h-11 rounded-xl bg-red-500 text-sm font-semibold text-white touch-manipulation active:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </SheetContent>
    </Sheet>
  );
}
