import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, parseISO } from 'date-fns';

export interface OverdueInvoice {
  id: string;
  quoteNumber: string;
  clientName: string;
  total: number;
  invoiceDueDate: string;
  daysOverdue: number;
}

export interface ExpiringQuote {
  id: string;
  quoteNumber: string;
  clientName: string;
  total: number;
  expiryDate: string;
  daysUntilExpiry: number;
}

export interface FinanceAlerts {
  overdueInvoices: OverdueInvoice[];
  expiringQuotes: ExpiringQuote[];
}

export function useFinanceAlerts() {
  return useQuery<FinanceAlerts>({
    queryKey: ['finance-alerts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { overdueInvoices: [], expiringQuotes: [] };

      const now = new Date().toISOString();
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const [invoiceRes, quoteRes] = await Promise.all([
        // Overdue invoices: raised, not paid, due date passed
        supabase
          .from('quotes')
          .select('id, quote_number, client_data, total, invoice_due_date')
          .eq('user_id', user.id)
          .eq('invoice_raised', true)
          .not('invoice_status', 'eq', 'paid')
          .not('invoice_due_date', 'is', null)
          .lt('invoice_due_date', now)
          .is('deleted_at', null),

        // Expiring quotes: status sent, expiry within 7 days, not yet expired
        supabase
          .from('quotes')
          .select('id, quote_number, client_data, total, expiry_date')
          .eq('user_id', user.id)
          .eq('status', 'sent')
          .not('expiry_date', 'is', null)
          .gt('expiry_date', now)
          .lt('expiry_date', sevenDaysFromNow)
          .is('deleted_at', null),
      ]);

      const overdueInvoices: OverdueInvoice[] = (invoiceRes.data ?? []).map((q) => ({
        id: q.id,
        quoteNumber: q.quote_number,
        clientName: (q.client_data as any)?.name || 'Unknown Client',
        total: q.total ?? 0,
        invoiceDueDate: q.invoice_due_date,
        daysOverdue: Math.abs(differenceInDays(parseISO(q.invoice_due_date), new Date())),
      }));

      const expiringQuotes: ExpiringQuote[] = (quoteRes.data ?? []).map((q) => ({
        id: q.id,
        quoteNumber: q.quote_number,
        clientName: (q.client_data as any)?.name || 'Unknown Client',
        total: q.total ?? 0,
        expiryDate: q.expiry_date,
        daysUntilExpiry: differenceInDays(parseISO(q.expiry_date), new Date()),
      }));

      return { overdueInvoices, expiringQuotes };
    },
    staleTime: 5 * 60 * 1000,
  });
}
