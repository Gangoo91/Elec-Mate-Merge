import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Receipt, Calendar, Loader2, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
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
    badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    dotClass: 'bg-emerald-400',
  },
  fair: {
    label: 'Fair',
    badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    dotClass: 'bg-amber-400',
  },
  poor: {
    label: 'Late Payer',
    badgeClass: 'bg-red-500/15 border-red-500/30 text-red-400',
    dotClass: 'bg-red-400',
  },
};

export const CustomerPaymentStatsCard = ({ customerId }: CustomerPaymentStatsCardProps) => {
  const stats = useCustomerPaymentStats(customerId);

  if (stats.isLoading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </CardContent>
      </Card>
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
          return (
            <Badge className="text-[10px] bg-amber-500/15 border border-amber-500/30 text-amber-400">
              Paid late
            </Badge>
          );
        }
      }
      return (
        <Badge className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
          Paid
        </Badge>
      );
    }
    const graceCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (invoice.invoice_due_date && new Date(invoice.invoice_due_date) < graceCutoff) {
      return (
        <Badge className="text-[10px] bg-red-500/15 border border-red-500/30 text-red-400">
          Overdue
        </Badge>
      );
    }
    return (
      <Badge className="text-[10px] bg-blue-500/15 border border-blue-500/30 text-blue-400">
        Sent
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            Payment Reliability
          </span>
          {config && (
            <Badge className={`text-xs border ${config.badgeClass}`}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${config.dotClass}`} />
              {config.label}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-card/50 border border-border text-center">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-white">
              <Receipt className="h-4 w-4 text-blue-400" />
              {stats.totalInvoices}
            </div>
            <p className="text-xs text-white mt-0.5">Total Invoices</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border text-center">
            <div className="text-lg font-bold text-white">
              {stats.onTimeRate !== null ? `${stats.onTimeRate}%` : '—'}
            </div>
            <p className="text-xs text-white mt-0.5">On-Time Rate</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border text-center">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-white">
              <Clock className="h-4 w-4 text-white" />
              {stats.averageDaysToPayment !== null ? `${stats.averageDaysToPayment}d` : '—'}
            </div>
            <p className="text-xs text-white mt-0.5">Avg Days to Pay</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border text-center">
            <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-white">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
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
                    <span className="text-[10px] text-white flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
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
      </CardContent>
    </Card>
  );
};
