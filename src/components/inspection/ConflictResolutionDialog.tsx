import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { VersionConflict } from '@/utils/reportCloud';

interface ConflictResolutionDialogProps {
  conflict: VersionConflict | null;
  onResolve: (useServerVersion: boolean) => void;
}

export function ConflictResolutionDialog({ conflict, onResolve }: ConflictResolutionDialogProps) {
  const serverTime = conflict?.serverUpdatedAt
    ? new Date(conflict.serverUpdatedAt).toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  return (
    <AlertDialog open={!!conflict} onOpenChange={() => onResolve(false)}>
      <AlertDialogContent className="bg-background border border-white/[0.08] rounded-2xl p-0 max-w-[calc(100vw-2rem)]">
        <AlertDialogTitle className="sr-only">Edit Conflict Detected</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">Choose whether to use the server version or keep your local changes</AlertDialogDescription>
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">Edit Conflict Detected</h2>
            <p className="text-sm text-white mt-2">This report was edited elsewhere.</p>
            {serverTime && (
              <p className="text-sm text-white mt-1">Last updated: {serverTime}</p>
            )}
            <p className="text-sm text-white mt-2">Would you like to use the server version or keep your local changes?</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onResolve(true)}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.98] transition-all"
            >
              Use Server Version
            </button>
            <button
              onClick={() => onResolve(false)}
              className="w-full h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-medium text-sm touch-manipulation active:scale-[0.98] transition-all"
            >
              Keep My Changes
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
