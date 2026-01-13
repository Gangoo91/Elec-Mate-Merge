// DraftRecoveryDialog - Best-in-Class Draft Recovery
// Allows users to recover work after browser crash or accidental closure

import React from 'react';
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
import { FileText, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DraftRecoveryDialogProps {
  open: boolean;
  reportType: 'eicr' | 'eic' | 'minor-works';
  draftPreview: {
    clientName?: string;
    installationAddress?: string;
    lastModified: Date;
  } | null;
  onRecover: () => void;
  onDiscard: () => void;
}

const REPORT_TYPE_LABELS: Record<string, string> = {
  'eicr': 'EICR',
  'eic': 'EIC',
  'minor-works': 'Minor Works',
};

export const DraftRecoveryDialog: React.FC<DraftRecoveryDialogProps> = ({
  open,
  reportType,
  draftPreview,
  onRecover,
  onDiscard,
}) => {
  if (!draftPreview) return null;

  const reportLabel = REPORT_TYPE_LABELS[reportType] || reportType.toUpperCase();
  const timeAgo = formatDistanceToNow(draftPreview.lastModified, { addSuffix: true });

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Recover unsaved work?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Found an unsaved <strong>{reportLabel}</strong> from {timeAgo}.
            </p>

            {(draftPreview.clientName || draftPreview.installationAddress) && (
              <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
                {draftPreview.clientName && (
                  <p>
                    <span className="text-muted-foreground">Client:</span>{' '}
                    <span className="text-foreground">{draftPreview.clientName}</span>
                  </p>
                )}
                {draftPreview.installationAddress && (
                  <p>
                    <span className="text-muted-foreground">Address:</span>{' '}
                    <span className="text-foreground">{draftPreview.installationAddress}</span>
                  </p>
                )}
              </div>
            )}

            <p className="text-muted-foreground text-sm">
              Would you like to continue where you left off?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onDiscard}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Discard
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onRecover}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Recover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DraftRecoveryDialog;
