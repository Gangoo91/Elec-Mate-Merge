/**
 * ELE-2034 — "the deposit isn't paid yet" at the moment a quote becomes an
 * invoice.
 *
 * A deposit is only taken off the final invoice if it was paid BEFORE the
 * conversion (ELE-1760 credits it then). Converted first, the invoice asks for
 * the full amount and the deposit, paid later, is never netted off — the
 * client is billed deposit plus full price. Crediting it automatically
 * afterwards would double it for everyone who records a bank-transfer deposit
 * by hand as a part payment (they do — "20 percent deposit"), so this asks
 * instead, at the one point it can still be got right.
 *
 * Content only; the caller supplies the sheet or dialog.
 */
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  cancelPendingDeposit,
  markDepositPaid,
  type PendingDeposit,
} from '@/services/quoteDepositInvoice';

interface PendingDepositPanelProps {
  quoteId: string;
  pending: PendingDeposit;
  /** The deposit is now marked paid — reload the quote so it is credited. */
  onMarkedPaid: () => void;
  /** Invoice the full amount anyway. */
  onFullAmount: () => void;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

export function PendingDepositPanel({
  quoteId,
  pending,
  onMarkedPaid,
  onFullAmount,
}: PendingDepositPanelProps) {
  const [busy, setBusy] = useState(false);

  const invoiceInFull = async () => {
    setBusy(true);
    try {
      await cancelPendingDeposit(quoteId, pending.invoiceId);
      toast({
        title: `${pending.invoiceNumber} cancelled`,
        description:
          'The invoice is for the full amount, so the deposit can no longer be paid on its own.',
      });
      onFullAmount();
    } catch {
      toast({ title: 'Could not cancel the deposit', variant: 'destructive' });
      setBusy(false);
    }
  };

  const markPaid = async () => {
    setBusy(true);
    try {
      await markDepositPaid(pending.invoiceId);
      toast({
        title: 'Deposit marked paid',
        description: `${gbp(pending.amount)} will come off the invoice.`,
      });
      onMarkedPaid();
    } catch {
      toast({ title: 'Could not mark the deposit paid', variant: 'destructive' });
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">
          The deposit isn't paid yet
        </h2>
        <p className="text-[14px] leading-snug text-white">
          {pending.invoiceNumber} for {gbp(pending.amount)} is still open. If it has been paid, mark
          it paid first and it comes off this invoice. If you invoice now, the invoice is for the
          full amount and the deposit invoice is cancelled, so it can't be paid as well.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={markPaid}
          disabled={busy}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          It's paid — mark {gbp(pending.amount)} paid
        </button>
        <button
          type="button"
          onClick={invoiceInFull}
          disabled={busy}
          className="h-11 w-full rounded-xl border border-white/[0.14] text-[14px] font-medium text-white touch-manipulation disabled:opacity-60"
        >
          Invoice the full amount anyway
        </button>
      </div>
    </div>
  );
}

export default PendingDepositPanel;
