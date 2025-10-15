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
    invoice_notes: row.invoice_notes,
    additional_invoice_items: row.additional_invoice_items || [],
    pdf_document_id: row.pdf_document_id,
    pdf_url: row.pdf_url,
    pdf_generated_at: row.pdf_generated_at ? new Date(row.pdf_generated_at) : undefined,
    pdf_version: row.pdf_version,
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
      .is('deleted_at', null)
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

      // 1. Save invoice data to database
      const { data: updatedQuote, error: updateError } = await supabase
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
          job_details: invoice.jobDetails ? JSON.parse(JSON.stringify(invoice.jobDetails)) : null,
          subtotal: invoice.subtotal,
          overhead: invoice.overhead,
          profit: invoice.profit,
          vat_amount: invoice.vatAmount,
          total: invoice.total,
          pdf_version: (invoice.pdf_version || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', invoice.id)
        .select()
        .single();

      if (updateError) throw updateError;

      toast({
        title: 'Invoice saved',
        description: `Invoice ${invoice.invoice_number} has been saved successfully.`,
      });

      // 2. Force regenerate PDF with LATEST data on every save
      try {
        toast({
          title: 'Generating PDF',
          description: 'Creating invoice PDF with latest data...',
        });

        const { data: companyData } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('User not authenticated');
        }

        // ALWAYS regenerate with fresh data - pass updatedQuote
        const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
          body: {
            quote: updatedQuote, // Use the fresh data from database
            companyProfile: companyData,
            invoice_mode: true,
            force_regenerate: true // Force fresh generation
          },
          headers: { Authorization: `Bearer ${session.access_token}` }
        });

        if (pdfError) throw pdfError;

        // 3. Poll if needed & update PDF metadata
        let pdfUrl = pdfData?.downloadUrl;
        const documentId = pdfData?.documentId;

        if (!pdfUrl && documentId) {
          // Poll for PDF completion
          for (let i = 0; i < 45; i++) {
            const { data: statusData } = await supabase.functions.invoke('generate-pdf-monkey', {
              body: { documentId, mode: 'status' },
              headers: { Authorization: `Bearer ${session.access_token}` },
            });
            if (statusData?.downloadUrl) {
              pdfUrl = statusData.downloadUrl;
              break;
            }
            await new Promise((res) => setTimeout(res, 2000));
          }
        }

        // 4. Store PDF metadata with current timestamp
        if (pdfUrl && documentId) {
          const { error: pdfUpdateError } = await supabase
            .from('quotes')
            .update({
              pdf_document_id: documentId,
              pdf_url: pdfUrl,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: (invoice.pdf_version || 0) + 1
            })
            .eq('id', invoice.id);

          if (pdfUpdateError) {
            console.error('PDF metadata update error:', pdfUpdateError);
          }

          toast({
            title: 'PDF generated',
            description: 'Invoice PDF created with latest data',
            variant: 'success',
          });
        }
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        // Don't fail the save if PDF generation fails
        toast({
          title: 'PDF generation skipped',
          description: 'Invoice saved, PDF will generate on next download',
        });
      }

      // 5. Refetch to get the latest data including PDF URL
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

  const deleteInvoice = async (invoiceId: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to delete invoices',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase
        .from('quotes')
        .update({ 
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', invoiceId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Invoice deleted',
        description: 'Invoice has been deleted successfully.',
      });

      await fetchInvoices();
      return true;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast({
        title: 'Error deleting invoice',
        description: 'Failed to delete invoice. Please try again.',
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
    deleteInvoice,
  };
};
