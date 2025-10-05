import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';

export const useInvoiceStorage = () => {
  const [invoices, setInvoices] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Convert database row to Quote object with invoice data
  const convertDbRowToQuote = useCallback((row: any): Quote => ({
    id: row.id,
    quoteNumber: row.quote_number,
    client: row.client_data,
    items: row.items,
    settings: row.settings,
    jobDetails: row.job_details,
    subtotal: parseFloat(row.subtotal),
    overhead: parseFloat(row.overhead),
    profit: parseFloat(row.profit),
    vatAmount: parseFloat(row.vat_amount),
    total: parseFloat(row.total),
    status: row.status,
    tags: row.tags || [],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    expiryDate: new Date(row.expiry_date),
    notes: row.notes,
    acceptance_status: row.acceptance_status,
    acceptance_method: row.acceptance_method,
    accepted_at: row.accepted_at ? new Date(row.accepted_at) : undefined,
    accepted_by_name: row.accepted_by_name,
    accepted_by_email: row.accepted_by_email,
    accepted_ip: row.accepted_ip,
    accepted_user_agent: row.accepted_user_agent,
    signature_url: row.signature_url,
    docusign_envelope_id: row.docusign_envelope_id,
    docusign_status: row.docusign_status,
    public_token: row.public_token,
    invoice_raised: row.invoice_raised,
    invoice_number: row.invoice_number,
    invoice_date: row.invoice_date ? new Date(row.invoice_date) : undefined,
    invoice_due_date: row.invoice_due_date ? new Date(row.invoice_due_date) : undefined,
    invoice_status: row.invoice_status,
    work_completion_date: row.work_completion_date ? new Date(row.work_completion_date) : undefined,
  }), []);


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

      const convertedInvoices = (data || []).map(convertDbRowToQuote);
      setInvoices(convertedInvoices);
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

      // Merge additional invoice items into the main items array
      const mergedItems = [
        ...(invoice.items || []),
        ...(invoice.additional_invoice_items || [])
      ];

      const { error } = await supabase
        .from('quotes')
        .update({
          invoice_raised: true,
          invoice_number: invoice.invoice_number,
          invoice_date: invoice.invoice_date?.toISOString(),
          invoice_due_date: invoice.invoice_due_date?.toISOString(),
          invoice_status: invoice.invoice_status,
          additional_invoice_items: JSON.parse(JSON.stringify([])), // Clear after merging
          invoice_notes: invoice.invoice_notes || null,
          work_completion_date: invoice.work_completion_date?.toISOString(),
          items: JSON.parse(JSON.stringify(mergedItems)), // Save merged items
          settings: JSON.parse(JSON.stringify(invoice.settings || {})),
          subtotal: invoice.subtotal,
          overhead: invoice.overhead,
          profit: invoice.profit,
          vat_amount: invoice.vatAmount,
          total: invoice.total,
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
