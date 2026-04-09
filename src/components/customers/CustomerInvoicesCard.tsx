import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerInvoicesCardProps {
  customerId: string;
  customerName: string;
}

interface InvoiceRow {
  id: string;
  invoice_number: string | null;
  total: number;
  invoice_status: string | null;
  invoice_date: string | null;
  invoice_due_date: string | null;
  invoice_paid_at: string | null;
}

export const CustomerInvoicesCard = ({ customerId, customerName }: CustomerInvoicesCardProps) => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select(
            'id, invoice_number, total, invoice_status, invoice_date, invoice_due_date, invoice_paid_at'
          )
          .eq('customer_id', customerId)
          .eq('invoice_raised', true)
          .order('invoice_date', { ascending: false })
          .limit(5);

        if (error) throw error;
        setInvoices((data as InvoiceRow[]) || []);
      } catch (error) {
        console.error('Failed to fetch customer invoices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount || 0);
  };

  const getInvoiceStatusBadge = (invoice: InvoiceRow) => {
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
        <h3 className="text-sm font-bold text-white">Invoices</h3>
        <button
          onClick={() =>
            navigate('/electrician/quotes/new', {
              state: { prefillCustomer: customerName, customerId, createInvoice: true },
            })
          }
          className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          + New
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        ) : invoices.length > 0 ? (
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => navigate(`/electrician/quotes?quoteId=${invoice.id}`)}
                className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">
                    {invoice.invoice_number || 'Invoice'}
                  </p>
                  <p className="text-xs text-white">{formatCurrency(invoice.total)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {getInvoiceStatusBadge(invoice)}
                  {invoice.invoice_date && (
                    <p className="text-[10px] text-white mt-1">
                      {formatDate(invoice.invoice_date)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No invoices linked to this customer yet
          </p>
        )}
      </div>
    </div>
  );
};
