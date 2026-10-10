import { useEffect } from 'react';
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
import { pushOverlay } from '@/lib/overlay-stack';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

/**
 * A yes/no confirmation. A bottom sheet on a phone (thumb reach, buttons full
 * width above the home indicator), a centred dialog from sm: up (10 Oct 2026,
 * docs/college-mobile-standard.md rule 7). Still a Radix alert dialog, and it
 * registers with the overlay stack so Android back cancels it.
 */
export const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
  loading = false,
}: ConfirmationDialogProps) => {
  useEffect(() => {
    if (!open) return;
    return pushOverlay(() => onOpenChange(false));
  }, [open, onOpenChange]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          'max-sm:bottom-0 max-sm:left-0 max-sm:top-auto max-sm:max-h-[88dvh] max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:gap-5 max-sm:rounded-t-2xl max-sm:border-x-0 max-sm:border-b-0 max-sm:border-white/[0.08] max-sm:bg-[hsl(0_0%_8%)] max-sm:px-5 max-sm:pt-3',
          'max-sm:pb-[max(1rem,env(safe-area-inset-bottom))]',
          'max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=closed]:zoom-out-100 max-sm:data-[state=open]:zoom-in-100 max-sm:data-[state=closed]:slide-out-to-left-0 max-sm:data-[state=open]:slide-in-from-left-0'
        )}
      >
        <div aria-hidden className="mx-auto h-1 w-10 rounded-full bg-white/[0.25] sm:hidden" />
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle className="text-[17px] leading-snug text-white">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] leading-relaxed text-white">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="max-sm:gap-2">
          <AlertDialogCancel disabled={loading} className="h-11 touch-manipulation max-sm:mt-0">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'h-11 touch-manipulation',
              variant === 'destructive' &&
                'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            )}
          >
            {loading ? 'Processing...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
