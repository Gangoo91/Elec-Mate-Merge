import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';

export const useInvoiceStorage = () => {
  const [invoices, setInvoices] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to view invoices',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .eq('invoice_raised', true)
        .order('invoice_date', { ascending: false });

      if (error) throw error;

      setInvoices((data || []) as unknown as Quote[]);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast({
        title: 'Error loading invoices',
        description: 'Failed to load invoices. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveInvoice = async (invoice: Partial<Invoice>): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to save invoice',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase
        .from('quotes')
        .update({
          invoice_raised: true,
          invoice_number: invoice.invoice_number,
          invoice_date: invoice.invoice_date?.toISOString(),
          invoice_due_date: invoice.invoice_due_date?.toISOString(),
          invoice_status: invoice.invoice_status,
          additional_invoice_items: JSON.parse(JSON.stringify(invoice.additional_invoice_items || [])),
          invoice_notes: invoice.invoice_notes,
          work_completion_date: invoice.work_completion_date?.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', invoice.id);

      if (error) throw error;

      toast({
        title: 'Invoice saved',
        description: `Invoice ${invoice.invoice_number} has been saved successfully.`,
      });

      await fetchInvoices();
      return true;
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: 'Error saving invoice',
        description: 'Failed to save invoice. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const markWorkComplete = async (quoteId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({
          work_completion_date: new Date().toISOString(),
          tags: ['work_done'],
        })
        .eq('id', quoteId);

      if (error) throw error;

      toast({
        title: 'Work marked complete',
        description: 'You can now raise an invoice for this quote.',
      });

      return true;
    } catch (error) {
      console.error('Error marking work complete:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark work as complete. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateInvoiceStatus = async (invoiceId: string, status: Invoice['invoice_status']): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ invoice_status: status })
        .eq('id', invoiceId);

      if (error) throw error;

      toast({
        title: 'Status updated',
        description: `Invoice status changed to ${status}`,
      });

      await fetchInvoices();
      return true;
    } catch (error) {
      console.error('Error updating invoice status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update invoice status. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    invoices,
    isLoading,
    saveInvoice,
    markWorkComplete,
    updateInvoiceStatus,
    fetchInvoices,
  };
};
