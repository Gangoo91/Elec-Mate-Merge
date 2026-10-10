import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PanelTitle, panel } from '@/components/employer/pageParts/PageParts';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { useBillsInbox, useResetBillsAddress } from '@/hooks/useBillsInbox';

/* ==========================================================================
   Gap #7: the firm's bills address, bills-<token>@in.elec-mate.com.
   Shown in Purchase orders, Expenses (Receipts) and Price book › Wholesalers.
   Owner/admin only: renders nothing for anyone else.
   ========================================================================== */

export function BillsAddressPanel({ className }: { className?: string }) {
  const { data: firmId } = useOfficeFirmId();
  const { data, isLoading } = useBillsInbox(firmId);
  const reset = useResetBillsAddress(firmId);
  const [copied, setCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);
  useEffect(() => {
    if (!confirmReset) return;
    const t = setTimeout(() => setConfirmReset(false), 5000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  if (isLoading) {
    return (
      <section className={className}>
        <PanelTitle title="Bills by email" />
        <div className={cn(panel, 'p-4 sm:p-5')}>
          <div className="h-11 animate-pulse rounded-lg bg-white/[0.05]" />
        </div>
      </section>
    );
  }
  if (!data?.allowed || !data.address) return null;
  const address = data.address;
  const held = data.bills.filter((b) => b.status === 'held').length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      toast.error('Could not copy. Press and hold the address to copy it.');
    }
  };

  return (
    <section className={className} aria-label="Bills by email">
      <PanelTitle
        title="Bills by email"
        meta={
          held > 0
            ? `${held} held`
            : data.last_received_at
              ? `Last ${formatDistanceToNowStrict(new Date(data.last_received_at), { addSuffix: true })}`
              : undefined
        }
      />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className="space-y-3 px-4 py-4 sm:px-5">
          <p className="text-[14px] leading-snug text-white">
            Forward your wholesaler invoices here. Each one is read for you and waits in Receipts
            until you check it.
          </p>
          <div className="flex items-center gap-2">
            <span
              data-testid="bills-address"
              className="min-w-0 flex-1 select-all rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 py-2.5 text-[14px] font-medium leading-snug tracking-tight text-white [overflow-wrap:anywhere]"
            >
              {/* Breaks before the @ when it has to, never inside the domain */}
              <span className="whitespace-nowrap">{address.split('@')[0]}</span>
              <wbr />
              <span className="whitespace-nowrap">@{address.split('@')[1]}</span>
            </span>
            <button
              type="button"
              onClick={() => void copy()}
              data-testid="bills-address-copy"
              className={cn(
                'h-11 w-[84px] shrink-0 rounded-xl text-[14px] font-semibold touch-manipulation',
                copied
                  ? 'border border-emerald-500/50 text-white'
                  : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
              )}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        {data.forwarding_code && (
          <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
            <p className="text-[14px] font-semibold text-white">
              Gmail wants to confirm forwarding
            </p>
            <p className="mt-0.5 text-[13px] text-white">
              Enter code <span className="font-mono font-semibold">{data.forwarding_code}</span> in
              Gmail's forwarding settings to finish.
            </p>
          </div>
        )}
        <div className="flex min-h-[52px] items-center gap-3 border-t border-white/[0.07] px-4 sm:px-5">
          <p className="min-w-0 flex-1 text-[13px] text-white">
            {data.bills.length === 0
              ? 'No bills have come in yet.'
              : `${data.bills.length} bill${data.bills.length === 1 ? '' : 's'} by email so far.`}{' '}
            Bills from senders you don't know are held, not read.
          </p>
          <button
            type="button"
            disabled={reset.isPending}
            onClick={() => {
              if (!confirmReset) return setConfirmReset(true);
              reset.mutate(undefined, {
                onSuccess: () => {
                  setConfirmReset(false);
                  toast.success('New address made. The old one no longer works');
                },
                onError: (e) => toast.error((e as Error).message),
              });
            }}
            className="h-11 shrink-0 text-[13px] font-semibold text-white underline-offset-2 hover:underline touch-manipulation"
          >
            {confirmReset ? 'Tap to confirm' : 'New address'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BillsAddressPanel;
