/**
 * ELE-2034 — "Take the deposit first?" when converting an accepted quote.
 *
 * Shown where a quote becomes an invoice: the convert dialog and the
 * quote→invoice builder. Only when the quote was accepted without a deposit
 * (the electrician marked it accepted; a client who signs the link already
 * got one) and the firm or the quote sets one.
 *
 * Content only, so each caller keeps its own sheet or dialog around it.
 */
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { shareContent } from '@/utils/share';
import {
  declineDepositOffer,
  markDepositPaid,
  raiseDepositInvoice,
  type DepositOffer,
  type RaisedDeposit,
} from '@/services/quoteDepositInvoice';

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

const OUTLINE_BTN =
  'inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-full border border-white/40 px-3 text-[14px] font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/[0.06] disabled:opacity-40';
const PRIMARY_BTN =
  'inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-full bg-elec-yellow px-3 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.1] disabled:text-white';

interface DepositChoicePanelProps {
  quoteId: string;
  offer: DepositOffer;
  /** "Invoice in full": carry on to the normal invoice. */
  onFullAmount: () => void;
  /** Finished with the deposit (raised, shared, or marked paid). */
  onDone: () => void;
}

export function DepositChoicePanel({
  quoteId,
  offer,
  onFullAmount,
  onDone,
}: DepositChoicePanelProps) {
  const [busy, setBusy] = useState(false);
  const [raised, setRaised] = useState<RaisedDeposit | null>(null);
  const [paid, setPaid] = useState(false);

  const balance = Math.max(0, Math.round((offer.payable - offer.amount) * 100) / 100);
  const label = offer.percent ? `${offer.percent}% deposit` : 'deposit';

  const raise = async () => {
    setBusy(true);
    try {
      setRaised(await raiseDepositInvoice(quoteId));
    } catch (err) {
      toast({
        title: 'Could not raise the deposit',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    if (!raised?.payUrl) return;
    const outcome = await shareContent({
      title: `Deposit ${raised.invoiceNumber}`,
      text: offer.quoteNumber
        ? `Here's the link to pay the ${gbp(raised.amount)} deposit for quote ${offer.quoteNumber}.`
        : `Here's the link to pay the ${gbp(raised.amount)} deposit.`,
      url: raised.payUrl,
    });
    if (outcome === 'copied') toast({ title: 'Pay link copied' });
  };

  const copy = async () => {
    if (!raised?.payUrl) return;
    if (await copyToClipboard(raised.payUrl)) toast({ title: 'Pay link copied' });
  };

  const markPaid = async () => {
    if (!raised) return;
    setBusy(true);
    try {
      await markDepositPaid(raised.invoiceId);
      setPaid(true);
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

  if (raised) {
    return (
      <div className="space-y-5">
        <Heading
          eyebrow={paid ? 'Deposit paid' : 'Deposit raised'}
          title={`${raised.invoiceNumber} · ${gbp(raised.amount)}`}
          subtitle={
            paid
              ? 'The quote shows the deposit as paid.'
              : raised.payUrl
                ? 'Send your client the pay link. They can pay by card straight away.'
                : 'Card payments are off, so your client pays by bank transfer. When the money lands, mark it paid here, or later from the quote.'
          }
        />
        <Facts
          items={[
            paid
              ? `When the job is done, convert this quote and the ${gbp(raised.amount)} comes off automatically`
              : 'Once it is paid, convert this quote and the deposit comes off the final invoice automatically',
            `The final invoice asks for the ${gbp(balance)} balance`,
          ]}
        />
        <div className="grid grid-cols-2 gap-2">
          {raised.payUrl && !paid ? (
            <>
              <button type="button" onClick={copy} className={OUTLINE_BTN}>
                Copy link
              </button>
              <button type="button" onClick={share} className={PRIMARY_BTN}>
                Share pay link
              </button>
            </>
          ) : paid ? (
            <button type="button" onClick={onDone} className={cn(PRIMARY_BTN, 'col-span-2')}>
              Done
            </button>
          ) : (
            <>
              <button type="button" onClick={markPaid} disabled={busy} className={OUTLINE_BTN}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Mark it paid'}
              </button>
              <button type="button" onClick={onDone} disabled={busy} className={PRIMARY_BTN}>
                Done
              </button>
            </>
          )}
        </div>
        {raised.payUrl && !paid && (
          <button
            type="button"
            onClick={onDone}
            className="flex h-11 w-full touch-manipulation items-center justify-center text-[14px] font-medium text-white"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Heading
        eyebrow="Before you invoice"
        title={`Take the ${label} first?`}
        subtitle="This quote was marked accepted in the app, so no deposit has been asked for yet."
      />
      <div className="border-t border-white/[0.08] text-white">
        <Row label="Deposit now" value={gbp(offer.amount)} strong />
        <Row label="Balance on the final invoice" value={gbp(balance)} />
        <Row label="Quote total" value={gbp(offer.payable)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            declineDepositOffer(quoteId);
            onFullAmount();
          }}
          disabled={busy}
          className={OUTLINE_BTN}
        >
          Invoice in full
        </button>
        <button type="button" onClick={raise} disabled={busy} className={PRIMARY_BTN}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : `Raise ${gbp(offer.amount)}`}
        </button>
      </div>
    </div>
  );
}

function Heading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-[22px] font-semibold leading-[27px] tracking-[-0.02em] text-white">
        {title}
      </h2>
      <p className="mt-2 text-[14px] leading-[21px] text-white">{subtitle}</p>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.08] py-3">
      <span className="text-[14px]">{label}</span>
      <span className={cn('tabular-nums', strong ? 'text-[20px] font-semibold' : 'text-[15px]')}>
        {value}
      </span>
    </div>
  );
}

function Facts({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 border-t border-white/[0.08] pt-4 text-white">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-[14px] leading-5">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow"
            strokeWidth={2.5}
            aria-hidden
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
