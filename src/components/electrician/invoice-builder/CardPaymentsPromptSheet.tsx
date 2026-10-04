/**
 * ELE-1705 — the moment an invoice goes out without a way to pay it by card,
 * and the moment card payments come on.
 *
 * Only 11 of 1,777 users could take a card payment, and in the 90 days to
 * 4 Oct 2026 the other 35 senders emailed 413 invoices worth about £226k with
 * no Pay now button on any of them. The whole Stripe Connect chain was built
 * and working; the only prompt was an 8-second toast after the send.
 *
 * Two moments, one sheet:
 *  - `prompt` — straight after the send: who cannot pay, what they would have
 *    seen, what this invoice would pay out after fees, one tap into setup.
 *    "Not now" snoozes it for a fortnight so it informs rather than nags.
 *  - `ready`  — back from Stripe with the account live: offer to resend the
 *    invoice that started it, now with the button. Setup is only worth doing
 *    if it gets THIS invoice paid.
 */
import { useEffect, useState } from 'react';
import { CreditCard, Loader2, Lock, Send } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { ghostButtonCn, primaryButtonCn } from '@/components/shared/surfaceStyles';

export type CardPromptStatus = 'not_connected' | 'pending';

interface CardPaymentsPromptSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'prompt' | 'ready';
  /** Only for `prompt`: never set up, or set up but unfinished. */
  status?: CardPromptStatus;
  /** Who the invoice went to — "Mrs Smith can't pay this one by card". */
  clientName?: string | null;
  invoiceNumber?: string | null;
  /** The invoice total in pounds, for the preview and the payout line. */
  amount?: number | null;
  /** New Stripe account, or carry on with one already started. */
  onSetUp?: () => void;
  /** Log in to a Stripe account they already have. */
  onConnectExisting?: () => void;
  /** `ready`: send the invoice again, now with the Pay now button. */
  onResend?: () => void;
  onNotNow: () => void;
  busy?: boolean;
}

/** Stripe's UK card rate plus our 1% — the same figures Settings shows. */
const FEE_PERCENT = 0.025;
const FEE_FIXED = 0.2;

const gbp = (n: number, pence = true) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: pence ? 2 : 0,
    maximumFractionDigits: pence ? 2 : 0,
  }).format(n);

/** Invoices this user sent in the last 90 days with no Pay now link on them. */
function useMissedInvoices(open: boolean) {
  const [missed, setMissed] = useState<{ count: number; value: number } | null>(null);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const since = new Date(Date.now() - 90 * 86_400_000).toISOString();
      const { data, error } = await supabase
        .from('quotes')
        .select('total')
        .eq('user_id', user.id)
        .gte('invoice_sent_at', since)
        .is('stripe_payment_link_url', null);
      if (cancelled || error || !data) return;
      setMissed({
        count: data.length,
        value: data.reduce((sum, row) => sum + (Number(row.total) || 0), 0),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);
  return missed;
}

/**
 * What lands in the client's inbox, drawn as an email rather than as app UI —
 * white, because that is what they see. The button is the whole point.
 */
const EmailPreview = ({
  who,
  invoiceNumber,
  amount,
}: {
  who: string;
  invoiceNumber?: string | null;
  amount?: number | null;
}) => (
  <figure className="space-y-2" aria-label={`What ${who} would receive`}>
    <figcaption className="text-[12px] font-medium text-white">What {who} would get</figcaption>
    <div className="rounded-xl bg-white p-4 text-left shadow-lg shadow-black/30" aria-hidden>
      <p className="text-[12px] font-medium text-neutral-500">
        {invoiceNumber ? `Invoice ${invoiceNumber}` : 'Your invoice'}
      </p>
      <p className="mt-0.5 text-[22px] font-bold tabular-nums tracking-tight text-neutral-900">
        {amount && amount > 0 ? gbp(amount) : '£—'}
      </p>
      <div className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-elec-yellow text-[14px] font-semibold text-black">
        <Lock className="h-3.5 w-3.5" />
        Pay now
      </div>
      <p className="mt-2 text-center text-[11px] text-neutral-500">Secure card payment by Stripe</p>
    </div>
  </figure>
);

const CardPaymentsPromptSheet = ({
  open,
  onOpenChange,
  mode,
  status = 'not_connected',
  clientName,
  invoiceNumber,
  amount,
  onSetUp,
  onConnectExisting,
  onResend,
  onNotNow,
  busy = false,
}: CardPaymentsPromptSheetProps) => {
  const missed = useMissedInvoices(open && mode === 'prompt');
  const who = clientName?.trim() || 'Your client';
  const pending = mode === 'prompt' && status === 'pending';
  const payout = amount && amount > 0 ? amount - (amount * FEE_PERCENT + FEE_FIXED) : null;

  const pill =
    mode === 'ready'
      ? { label: 'Card payments on', cn: 'bg-emerald-500/20 text-emerald-300' }
      : { label: 'Invoice sent', cn: 'bg-white/[0.10] text-white' };

  const title =
    mode === 'ready'
      ? `Resend ${who === 'Your client' ? 'the' : `${who}’s`} invoice with a Pay now button?`
      : pending
        ? 'Card payments aren’t switched on yet'
        : `${who} can’t pay this one by card`;

  const description =
    mode === 'ready'
      ? `It hasn’t been paid yet. Send it again and ${who === 'Your client' ? 'they' : who} can pay by card straight from the email.`
      : pending
        ? 'Stripe still needs a few details from you. Until then your invoices go out without a Pay now button.'
        : 'It went without a Pay now button. Turn card payments on and every invoice email carries one.';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex max-h-[85vh] flex-col bg-background">
          <div className="mx-auto w-full max-w-lg flex-1 space-y-5 overflow-y-auto px-5 pb-4 pt-5">
            <SheetHeader className="space-y-2 text-left">
              <span
                className={cn(
                  'w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em]',
                  pill.cn
                )}
              >
                {pill.label}
              </span>
              <SheetTitle className="text-[20px] font-semibold leading-snug tracking-tight text-white">
                {title}
              </SheetTitle>
              <SheetDescription className="text-[14px] leading-relaxed text-white">
                {description}
              </SheetDescription>
            </SheetHeader>

            {!pending && <EmailPreview who={who} invoiceNumber={invoiceNumber} amount={amount} />}

            {mode === 'prompt' && !pending && payout !== null && (
              <p className="text-[13px] leading-relaxed text-white">
                On this invoice you would receive{' '}
                <span className="font-semibold tabular-nums">{gbp(payout)}</span> after fees of 2.5%
                + 20p (Stripe 1.5% + 20p, Elec-Mate 1%). No monthly fee. Paid out to your bank in
                2–7 days. Setup takes a few minutes with Stripe.
              </p>
            )}

            {/* Their own numbers — a fact about their business, not a pitch. */}
            {mode === 'prompt' && missed && missed.count > 1 && (
              <p className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[13px] text-white">
                <span className="font-semibold tabular-nums">
                  {missed.count} invoices · {gbp(missed.value, false)}
                </span>{' '}
                went out without card payment in the last 90 days.
              </p>
            )}
          </div>

          {/* The answer stays in reach however long the case above it runs —
              on an SE the buttons were a scroll away. */}
          <div className="mx-auto w-full max-w-lg shrink-0 space-y-2 border-t border-white/[0.10] px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-3">
            {mode === 'ready' ? (
              <button
                type="button"
                onClick={onResend}
                disabled={busy}
                className={cn(
                  primaryButtonCn,
                  'flex w-full items-center justify-center gap-2 disabled:opacity-60'
                )}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Resend with Pay now
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onSetUp}
                  disabled={busy}
                  className={cn(
                    primaryButtonCn,
                    'flex w-full items-center justify-center gap-2 disabled:opacity-60'
                  )}
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  {pending ? 'Finish Stripe setup' : 'Turn on card payments'}
                </button>
                {!pending && (
                  <button
                    type="button"
                    onClick={onConnectExisting}
                    disabled={busy}
                    className={cn(ghostButtonCn, 'w-full disabled:opacity-60')}
                  >
                    I already have a Stripe account
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              onClick={onNotNow}
              className="h-11 w-full text-[13px] font-medium text-white touch-manipulation"
            >
              Not now
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardPaymentsPromptSheet;
