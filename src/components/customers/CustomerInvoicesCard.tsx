import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Receipt, Plus, Calendar, Loader2, ExternalLink } from 'lucide-react';
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
      // Check if paid late
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

    // Check if overdue (24h grace period)
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
            <Receipt className="h-4 w-4 text-blue-400" />
            Invoices
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate('/electrician/quotes/new', {
                state: { prefillCustomer: customerName, customerId, createInvoice: true },
              })
            }
            className="h-8 text-xs touch-manipulation text-blue-400"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : invoices.length > 0 ? (
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => navigate(`/electrician/quotes?quoteId=${invoice.id}`)}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-blue-500/30 active:bg-blue-500/10 cursor-pointer transition-all touch-manipulation"
              >
                <Receipt className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {invoice.invoice_number || 'Invoice'}
                  </p>
                  <p className="text-xs text-white">{formatCurrency(invoice.total)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {getInvoiceStatusBadge(invoice)}
                  {invoice.invoice_date && (
                    <p className="text-[10px] text-white mt-1 flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(invoice.invoice_date)}
                    </p>
                  )}
                </div>
                <ExternalLink className="h-4 w-4 text-white" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No invoices linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
