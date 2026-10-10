import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileButton } from '@/components/ui/mobile-button';
import { FileText, Edit, Loader2 } from 'lucide-react';
import { DepositChoicePanel } from './DepositChoicePanel';
import {
  getDepositOffer,
  getPendingDeposit,
  type DepositOffer,
  type PendingDeposit,
} from '@/services/quoteDepositInvoice';
import { PendingDepositPanel } from './PendingDepositPanel';

interface InvoiceDecisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoChanges: () => void;
  onHasChanges: () => void;
  loading?: boolean;
  /**
   * ELE-2034 — the quote being converted. When it was accepted without a
   * deposit and one is due, the dialog asks "take the deposit first?" before
   * the usual two options.
   */
  quoteId?: string | null;
}

export const InvoiceDecisionDialog = ({
  open,
  onOpenChange,
  onNoChanges,
  onHasChanges,
  loading = false,
  quoteId = null,
}: InvoiceDecisionDialogProps) => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState<DepositOffer | null>(null);
  // A deposit already raised and not paid yet (ELE-2034).
  const [pending, setPending] = useState<PendingDeposit | null>(null);
  // Which quote the deposit check has finished for. Until it has, the two
  // usual options are held back, or they flash up and are then replaced.
  const [checkedFor, setCheckedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !quoteId) {
      setOffer(null);
      setPending(null);
      setCheckedFor(null);
      return;
    }
    let live = true;
    Promise.all([
      getDepositOffer(quoteId).catch(() => null),
      getPendingDeposit(quoteId).catch(() => null),
    ])
      .then(([o, p]) => {
        if (!live) return;
        setOffer(o);
        setPending(p);
      })
      .finally(() => live && setCheckedFor(quoteId));
    return () => {
      live = false;
    };
  }, [open, quoteId]);

  if (open && quoteId && checkedFor !== quoteId) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="sr-only">Create Invoice</DialogTitle>
          <DialogDescription className="sr-only">Checking the quote</DialogDescription>
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (pending && quoteId) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="sr-only">The deposit isn't paid yet</DialogTitle>
          <DialogDescription className="sr-only">
            Mark the deposit paid so it comes off the invoice, or invoice the full amount.
          </DialogDescription>
          <PendingDepositPanel
            quoteId={quoteId}
            pending={pending}
            // The builder loads the quote fresh, so the now-paid deposit is
            // credited there; this caller's in-memory copy would miss it.
            onMarkedPaid={() => {
              onOpenChange(false);
              navigate(`/electrician/invoice-quote-builder/${quoteId}`);
            }}
            onFullAmount={() => setPending(null)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (offer && quoteId) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="sr-only">Take the deposit first?</DialogTitle>
          <DialogDescription className="sr-only">
            Raise a deposit invoice now, or invoice the full amount.
          </DialogDescription>
          <DepositChoicePanel
            quoteId={quoteId}
            offer={offer}
            onFullAmount={() => setOffer(null)}
            onDone={() => {
              onOpenChange(false);
              navigate(`/electrician/quotes/view/${quoteId}`);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Were there any changes in costs from the original quote?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2">
          <MobileButton
            onClick={onNoChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <FileText className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-semibold mb-1">No Changes</div>
                <div className="text-sm text-white font-normal whitespace-normal break-words">
                  Use the exact quote amounts to generate the invoice
                </div>
              </div>
            </div>
          </MobileButton>

          <MobileButton
            onClick={onHasChanges}
            disabled={loading}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <Edit className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-semibold mb-1">Yes, There Are Changes</div>
                <div className="text-sm text-white font-normal whitespace-normal break-words">
                  Adjust costs, add or remove items before generating
                </div>
              </div>
            </div>
          </MobileButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
