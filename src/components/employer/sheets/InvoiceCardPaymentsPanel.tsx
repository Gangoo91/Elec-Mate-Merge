import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy, CreditCard, Loader2, QrCode, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { createStripeConnectAccount } from '@/services/financeService';
import { trackStripeConnectStarted } from '@/lib/analytics-events';
import { useActingFirmId, useFirmCardPayments } from '@/hooks/useJobProfit';
import { formatGBP } from '@/lib/financeDefinitions';
import { cn } from '@/lib/utils';

/**
 * ELE-1823 — card payments on a hub invoice.
 *
 * The pay link is the permanent /pay/<invoice id> page (ELE-1705): it mints a
 * fresh Stripe Checkout session on the FIRM's Connect account every time it
 * is opened, so it never expires and always charges the current balance.
 * Stripe Checkout offers card, Apple Pay and Google Pay on the same page.
 *
 * - Paid: how and when ("Paid by card · 7 Oct, 14:02").
 * - Firm takes cards: copy, share, or show a QR for the customer to scan.
 * - Not set up: says so plainly; the owner can start Stripe from here, a
 *   manager is told only the owner can.
 */

export const PAY_PAGE_BASE = 'https://www.elec-mate.com/pay/';

function usePaymentDetail(invoiceId: string, isPaid: boolean) {
  return useQuery({
    queryKey: ['invoice-payment-detail', invoiceId],
    enabled: isPaid,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('invoice_paid_at, invoice_payment_method')
        .eq('id', invoiceId)
        .maybeSingle();
      if (error) throw error;
      return data as {
        invoice_paid_at: string | null;
        invoice_payment_method: string | null;
      } | null;
    },
  });
}

const METHOD: Record<string, string> = {
  card: 'by card',
  stripe: 'by card',
  bank_transfer: 'by bank transfer',
  'bank transfer': 'by bank transfer',
  cash: 'in cash',
  cheque: 'by cheque',
};

export function InvoiceCardPaymentsPanel({
  invoiceId,
  invoiceNumber,
  clientName,
  amount,
  isPaid,
  isDraft,
  storedLink,
  paidDate,
}: {
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  isPaid: boolean;
  isDraft: boolean;
  storedLink?: string | null;
  /** invoices.paid_date, the fallback when the payment row has no timestamp. */
  paidDate?: string | null;
}) {
  const { data: firmId } = useActingFirmId();
  const { data: card, isLoading } = useFirmCardPayments(firmId);
  const { data: paid } = usePaymentDetail(invoiceId, isPaid);
  const [showQr, setShowQr] = useState(false);
  const [starting, setStarting] = useState(false);

  const cardClass =
    '-mx-4 rounded-none border-y sm:mx-0 sm:rounded-2xl sm:border-x border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-3';

  // The ONE paid state on the sheet: amount, how, and when. The sheet used to
  // show its own "Paid in full" block above this as well.
  if (isPaid) {
    const at = paid?.invoice_paid_at ? new Date(paid.invoice_paid_at) : null;
    const how = METHOD[(paid?.invoice_payment_method ?? '').toLowerCase()] ?? '';
    const when = at
      ? `${at.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, ${at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
      : paidDate
        ? new Date(paidDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : null;
    const detail = [how ? `Paid ${how}` : null, when ? `on ${when}` : null]
      .filter(Boolean)
      .join(' ');
    return (
      <div className="-mx-4 rounded-none border-y sm:mx-0 sm:rounded-2xl sm:border-x border-emerald-500/25 bg-emerald-500/10 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Check className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-[15px] font-semibold text-emerald-400">Paid in full</span>
          </div>
          <span className="text-lg font-bold tabular-nums text-emerald-400">
            £{amount.toLocaleString('en-GB')}
          </span>
        </div>
        {detail && (
          <p className="mt-1 text-[13px] text-white">
            {detail.charAt(0).toUpperCase() + detail.slice(1)}
          </p>
        )}
      </div>
    );
  }

  if (isLoading || !card) {
    return (
      <div className={cardClass}>
        <div className="h-4 w-40 rounded bg-white/[0.08] animate-pulse" />
      </div>
    );
  }

  const active = card.status === 'active';
  // Prefer the permanent page; an old stored Checkout URL may have expired.
  const link =
    storedLink && storedLink.startsWith(PAY_PAGE_BASE)
      ? storedLink
      : `${PAY_PAGE_BASE}${invoiceId}`;

  if (active) {
    const share = async () => {
      const text = `Invoice ${invoiceNumber} for ${formatGBP(amount)}. Pay securely by card or Apple Pay: ${link}`;
      try {
        if (navigator.share) {
          await navigator.share({ title: `Invoice ${invoiceNumber}`, text, url: link });
          return;
        }
      } catch {
        /* closed the share sheet */
        return;
      }
      await copyToClipboard(text);
      toast.success('Message with the pay link copied');
    };

    return (
      <div className={cardClass}>
        <div className="flex items-start gap-2.5">
          <CreditCard className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-white">
              {clientName} can pay by card or Apple Pay
            </p>
            <p className="text-[12px] text-white leading-snug">
              {isDraft
                ? 'The Pay now button goes out with the invoice when you send it.'
                : 'The Pay now link never expires and always charges what is still owed. Paid status lands here and on the job by itself.'}
            </p>
          </div>
        </div>
        {!isDraft && (
          <>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={async () => {
                  await copyToClipboard(link);
                  toast.success('Pay link copied');
                }}
                className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white inline-flex items-center justify-center gap-1.5 touch-manipulation"
              >
                <Copy className="h-4 w-4" /> Copy
              </button>
              <button
                type="button"
                onClick={share}
                className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white inline-flex items-center justify-center gap-1.5 touch-manipulation"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button
                type="button"
                onClick={() => setShowQr((v) => !v)}
                aria-expanded={showQr}
                className={cn(
                  'h-11 rounded-xl border text-[13px] font-medium inline-flex items-center justify-center gap-1.5 touch-manipulation',
                  showQr
                    ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                    : 'border-white/[0.12] bg-white/[0.06] text-white'
                )}
              >
                <QrCode className="h-4 w-4" /> QR
              </button>
            </div>
            {showQr && (
              <div className="flex flex-col items-center gap-2 pt-1">
                <div className="rounded-2xl bg-white p-4">
                  <QRCodeSVG value={link} size={208} level="M" includeMargin={false} />
                </div>
                <p className="text-[12.5px] text-white text-center">
                  The customer scans this with their phone camera to pay {formatGBP(amount)}.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  const startSetup = async () => {
    setStarting(true);
    try {
      trackStripeConnectStarted({ source: 'employer_invoice', method: 'express' });
      const r = await createStripeConnectAccount('', null);
      await openExternalUrl(r.onboardingUrl);
    } catch (e) {
      toast.error((e as Error).message || 'Could not start Stripe setup');
    } finally {
      setStarting(false);
    }
  };

  const pending = card.status === 'pending' || card.status === 'restricted';
  return (
    <div className={cardClass}>
      <div className="flex items-start gap-2.5">
        <CreditCard className="h-4 w-4 mt-0.5 text-orange-300 shrink-0" />
        <div className="min-w-0 space-y-1">
          <p className="text-[14px] font-semibold text-white">
            {clientName} can’t pay this by card
          </p>
          <p className="text-[12px] text-white leading-snug">
            {pending
              ? 'Stripe setup was started but isn’t finished, so invoices go out without a Pay now button.'
              : 'Card payments aren’t switched on for the firm, so this invoice has no Pay now button.'}
            {card.sentWithoutLink90d > 0 &&
              ` In the last 90 days ${card.sentWithoutLink90d} invoice${card.sentWithoutLink90d === 1 ? '' : 's'} worth ${formatGBP(card.valueWithoutLink90d)} went out the same way.`}
          </p>
        </div>
      </div>
      {card.isOwner ? (
        <button
          type="button"
          onClick={startSetup}
          disabled={starting}
          className="w-full h-11 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold inline-flex items-center justify-center gap-2 touch-manipulation disabled:opacity-60"
        >
          {starting && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? 'Finish Stripe setup' : 'Turn on card payments'}
        </button>
      ) : (
        <p className="text-[12.5px] text-white">
          Only the account owner can switch card payments on (Settings → Card payments).
        </p>
      )}
      <p className="text-[11.5px] text-white">
        About 2.5% + 20p a card payment (Stripe’s fee plus 1% to Elec-Mate). The money goes to the
        firm’s own Stripe account.
      </p>
    </div>
  );
}
