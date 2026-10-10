/**
 * ELE-2034 — a deposit waiting to be paid, on the quote page.
 *
 * Until now nothing in the app could mark a DEP- invoice paid: they live in
 * the `invoices` table, which the Electrical Hub's invoice list never shows.
 * A deposit paid by bank transfer had nowhere to be recorded, so the final
 * invoice could not credit it. This is that place, for deposits from either
 * route (client signed the link, or raised at conversion).
 *
 * Renders nothing when there is no unpaid deposit.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { shareContent } from '@/utils/share';
import {
  getPendingDeposit,
  markDepositPaid,
  type PendingDeposit,
} from '@/services/quoteDepositInvoice';

const OUTLINE_BTN =
  'inline-flex h-12 touch-manipulation items-center justify-center rounded-full border border-white/40 px-3 text-[14px] font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/[0.06] disabled:opacity-40';
const PRIMARY_BTN =
  'inline-flex h-12 touch-manipulation items-center justify-center rounded-full bg-elec-yellow px-3 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.1] disabled:text-white';

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

export function QuoteDepositCard({
  quoteId,
  onPaid,
}: {
  quoteId: string;
  /** Called once the deposit is marked paid, so the page can refresh. */
  onPaid?: () => void;
}) {
  const [deposit, setDeposit] = useState<PendingDeposit | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    getPendingDeposit(quoteId)
      .then((d) => live && setDeposit(d))
      .catch(() => live && setDeposit(null));
    return () => {
      live = false;
    };
  }, [quoteId]);

  if (!deposit) return null;

  const markPaid = async () => {
    setBusy(true);
    try {
      await markDepositPaid(deposit.invoiceId);
      toast({
        title: 'Deposit marked paid',
        description: 'When you convert this quote, it comes off the final invoice automatically.',
      });
      setDeposit(null);
      onPaid?.();
    } catch (err) {
      toast({
        title: 'Could not mark it paid',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    if (!deposit.payUrl) return;
    const outcome = await shareContent({
      title: `Deposit ${deposit.invoiceNumber}`,
      text: deposit.quoteNumber
        ? `Here's the link to pay the ${gbp(deposit.amount)} deposit for quote ${deposit.quoteNumber}.`
        : `Here's the link to pay the ${gbp(deposit.amount)} deposit.`,
      url: deposit.payUrl,
    });
    if (outcome === 'copied') toast({ title: 'Pay link copied' });
  };

  return (
    <section className="-mx-4 space-y-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          Waiting for the deposit
        </p>
        <h2 className="mt-1.5 text-[18px] font-semibold text-white">
          {gbp(deposit.amount)} · {deposit.invoiceNumber}
        </h2>
        <p className="mt-1.5 text-[14px] leading-[21px] text-white">
          {deposit.payUrl
            ? 'Your client can pay by card from the link, or by bank transfer. If it comes by transfer, mark it paid here.'
            : 'When the bank transfer lands, mark it paid here. It then comes off the final invoice automatically.'}
        </p>
      </div>
      {deposit.payUrl ? (
        <div className="grid grid-cols-2 gap-2 [&>button]:w-full">
          <button type="button" onClick={markPaid} disabled={busy} className={OUTLINE_BTN}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Mark it paid'}
          </button>
          <button type="button" onClick={share} className={PRIMARY_BTN}>
            Share pay link
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={markPaid}
          disabled={busy}
          className={`${PRIMARY_BTN} w-full`}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Mark it paid'}
        </button>
      )}
    </section>
  );
}
