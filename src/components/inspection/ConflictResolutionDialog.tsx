import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Edit Conflict Detected</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            This report was edited elsewhere
            {serverTime && (
              <span className="block mt-1 text-white">Last updated: {serverTime}</span>
            )}
            <span className="block mt-2 text-white">
              Would you like to use the server version or keep your local changes?
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onResolve(false)} className="h-11 touch-manipulation">
            Keep My Changes
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onResolve(true)} className="h-11 touch-manipulation">
            Use Server Version
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
