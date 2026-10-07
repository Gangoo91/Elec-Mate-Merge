import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyJobMoneyStatus } from '@/hooks/useJobProfit';
import { WorkerPanel, SectionTitle, SolidBadge } from '@/components/worker-tools/WorkerUi';

/**
 * The worker's job page (ELE-1824 / ELE-1823):
 *  - "Hours on this job: 14 of 16 quoted" — the crew's logged hours against
 *    what the job was priced on, so he knows on site when he is over.
 *  - Invoice sent · Unpaid / Paid, so he knows whether to mention it on site,
 *    and (qualified crew only, firm taking cards) a QR the customer scans to
 *    pay by card or Apple Pay at the end of the job.
 * No costs, rates or profit ever reach this screen — the RPC doesn't return
 * them. Apprentices see hours only.
 */

const h = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 1 });
const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

export function WorkerJobHoursAndPay({ jobId }: { jobId: string }) {
  const { data } = useMyJobMoneyStatus(jobId);
  const [qrFor, setQrFor] = useState<string | null>(null);
  if (!data) return null;

  const used = data.approvedHours + data.pendingHours;
  const quoted = data.quotedHours;
  const over = quoted !== null && quoted > 0 && used > quoted;
  const pct = quoted && quoted > 0 ? Math.min(100, (used / quoted) * 100) : 0;
  const invoices = data.showInvoices ? data.invoices : [];
  const hasHours = used > 0 || (quoted !== null && quoted > 0);

  if (!hasHours && invoices.length === 0) return null;

  return (
    <div className="space-y-6">
      {hasHours && (
        <div>
          <SectionTitle title="Hours on this job" />
          <WorkerPanel className="px-4 py-4 sm:px-5 space-y-2.5">
            <p className="text-[22px] font-semibold tabular-nums leading-tight text-white">
              {h(used)}
              {quoted !== null && quoted > 0 && (
                <span className="text-[15px] font-medium text-white"> of {h(quoted)} quoted</span>
              )}
            </p>
            {quoted !== null && quoted > 0 && (
              <div className="h-2.5 rounded-full bg-white/[0.1] overflow-hidden" aria-hidden>
                <div
                  className={cn(
                    'h-full rounded-full',
                    over ? 'bg-red-500' : pct >= 85 ? 'bg-orange-400' : 'bg-emerald-500'
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
            <p className={cn('text-[13px] leading-snug', over ? 'font-semibold text-red-300' : 'text-white')}>
              {over && quoted !== null
                ? `${h(used - quoted)} hrs over the quote. Let the office know before carrying on.`
                : quoted !== null && quoted > 0
                  ? `${h(Math.max(0, quoted - used))} hrs left on the quote. Whole crew, including time waiting for approval.`
                  : 'No quoted hours set for this job. Whole crew, including time waiting for approval.'}
              {data.myHours > 0 && ` You: ${h(data.myHours)} hrs.`}
            </p>
          </WorkerPanel>
        </div>
      )}

      {invoices.length > 0 && (
        <div>
          <SectionTitle title="Customer’s invoice" />
          <WorkerPanel className="divide-y divide-white/[0.07]">
            {invoices.map((inv) => (
              <div key={inv.id} className="px-4 py-3.5 sm:px-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-semibold text-white">
                      {inv.state === 'paid'
                        ? `Paid${inv.method === 'card' ? ' by card' : ''}`
                        : 'Invoice sent · Unpaid'}
                    </p>
                    <p className="text-[12.5px] text-white">
                      {inv.number ? `Invoice ${inv.number}` : 'Invoice'}
                      {inv.state === 'paid' && inv.paid_at
                        ? ` · ${format(parseISO(inv.paid_at), 'd MMM, HH:mm')}`
                        : inv.state === 'paid' && inv.paid_on
                          ? ` · ${format(parseISO(inv.paid_on), 'd MMM')}`
                          : ` · ${gbp(inv.balance)} to pay`}
                    </p>
                  </div>
                  <SolidBadge tone={inv.state === 'paid' ? 'green' : inv.state === 'overdue' ? 'red' : 'neutral'}>
                    {inv.state === 'paid' ? 'Paid' : inv.state === 'overdue' ? 'Overdue' : 'Unpaid'}
                  </SolidBadge>
                </div>
                {inv.state !== 'paid' && inv.pay_url && (
                  <button
                    type="button"
                    onClick={() => setQrFor(qrFor === inv.id ? null : inv.id)}
                    aria-expanded={qrFor === inv.id}
                    className={cn(
                      'flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold touch-manipulation',
                      qrFor === inv.id
                        ? 'border border-white/[0.18] bg-white/[0.06] text-white'
                        : 'bg-elec-yellow text-black'
                    )}
                  >
                    {qrFor === inv.id ? <X className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                    {qrFor === inv.id ? 'Hide QR code' : 'Take payment: show QR code'}
                  </button>
                )}
                {qrFor === inv.id && inv.pay_url && (
                  <div className="flex flex-col items-center gap-2 pb-1">
                    <div className="rounded-2xl bg-white p-4">
                      <QRCodeSVG value={inv.pay_url} size={220} level="M" includeMargin={false} />
                    </div>
                    <p className="text-center text-[13px] text-white">
                      The customer scans this with their phone camera and pays {gbp(inv.balance)} by
                      card or Apple Pay. It shows as paid here within seconds.
                    </p>
                  </div>
                )}
                {inv.state !== 'paid' && !inv.pay_url && !data.cardPayments && (
                  <p className="text-[12.5px] text-white">
                    The firm doesn’t take card payments yet, so the customer pays the office directly.
                  </p>
                )}
              </div>
            ))}
          </WorkerPanel>
        </div>
      )}
    </div>
  );
}
