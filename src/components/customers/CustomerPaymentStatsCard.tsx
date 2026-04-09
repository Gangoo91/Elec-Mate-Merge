import React from 'react';
import { Loader2 } from 'lucide-react';
import { useCustomerPaymentStats, ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';

interface CustomerPaymentStatsCardProps {
  customerId: string;
}

const reliabilityConfig: Record<
  Exclude<ReliabilityLevel, 'none'>,
  { label: string; badgeClass: string; dotClass: string }
> = {
  good: {
    label: 'Good Payer',
    badgeClass: 'bg-emerald-500/15 text-emerald-400',
    dotClass: 'bg-emerald-400',
  },
  fair: {
    label: 'Fair',
    badgeClass: 'bg-amber-500/15 text-amber-400',
    dotClass: 'bg-amber-400',
  },
  poor: {
    label: 'Late Payer',
    badgeClass: 'bg-red-500/15 text-red-400',
    dotClass: 'bg-red-400',
  },
};

export const CustomerPaymentStatsCard = ({ customerId }: CustomerPaymentStatsCardProps) => {
  const stats = useCustomerPaymentStats(customerId);

  if (stats.isLoading) {
    return (
      <div className="card-surface-interactive rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no invoices at all
  if (stats.totalInvoices === 0) return null;

  const config = stats.reliabilityLevel !== 'none' ? reliabilityConfig[stats.reliabilityLevel] : null;

  const getInvoiceStatusBadge = (invoice: (typeof stats.recentInvoices)[0]) => {
    if (invoice.invoice_status === 'paid') {
      if (invoice.invoice_paid_at && invoice.invoice_due_date) {
        const paidDate = new Date(invoice.invoice_paid_at);
        const dueDate = new Date(invoice.invoice_due_date);
        if (paidDate > dueDate) {
          return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">Paid late</span>;
        }
      }
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">Paid</span>;
    }
    const graceCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (invoice.invoice_due_date && new Date(invoice.invoice_due_date) < graceCutoff) {
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">Overdue</span>;
    }
    return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">Sent</span>;
  };

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white">Payment Reliability</h3>
        {config && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1.5 ${config.badgeClass}`}>
            <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
            {config.label}
          </span>
        )}
      </div>
      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-center">
            <div className="text-lg font-bold text-white">
              {stats.totalInvoices}
            </div>
            <p className="text-xs text-white mt-0.5">Total Invoices</p>
          </div>
          <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-center">
            <div className="text-lg font-bold text-white">
              {stats.onTimeRate !== null ? `${stats.onTimeRate}%` : '\u2014'}
            </div>
            <p className="text-xs text-white mt-0.5">On-Time Rate</p>
          </div>
          <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-center">
            <div className="text-lg font-bold text-white">
              {stats.averageDaysToPayment !== null ? `${stats.averageDaysToPayment}d` : '\u2014'}
            </div>
            <p className="text-xs text-white mt-0.5">Avg Days to Pay</p>
          </div>
          <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-center">
            <div className="text-lg font-bold text-white">
              {stats.paidLateCount}
            </div>
            <p className="text-xs text-white mt-0.5">Late Payments</p>
          </div>
        </div>

        {/* Recent Invoices */}
        {stats.recentInvoices.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-white uppercase tracking-wider">
              Recent Invoices
            </p>
            {stats.recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between py-1.5 px-2 rounded-md"
              >
                <span className="text-sm text-white truncate">
                  {invoice.invoice_number || 'Invoice'}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getInvoiceStatusBadge(invoice)}
                  {invoice.invoice_date && (
                    <span className="text-[10px] text-white">
                      {new Date(invoice.invoice_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Not enough data message */}
        {stats.paidCount < 2 && stats.totalInvoices > 0 && (
          <p className="text-xs text-white text-center">
            Need 2+ paid invoices to calculate reliability score
          </p>
        )}
      </div>
    </div>
  );
};
