import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Quote } from "@/types/quote";

interface DeleteInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Quote;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteInvoiceDialog = ({
  open,
  onOpenChange,
  invoice,
  onConfirm,
  isDeleting,
}: DeleteInvoiceDialogProps) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const isPaid = invoice.invoice_status === 'paid';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            {isPaid ? 'Delete Paid Invoice?' : 'Delete Invoice?'}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              This will permanently delete invoice{' '}
              <strong className="text-foreground">#{invoice.invoice_number}</strong>{' '}
              for {formatCurrency(invoice.total)}.
            </p>
            {isPaid && (
              <p className="text-orange-600 font-semibold">
                ⚠️ Warning: This invoice is marked as PAID. Are you sure you want to delete it?
              </p>
            )}
            <p className="text-muted-foreground text-sm">
              The original quote will remain untouched.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete Invoice'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
