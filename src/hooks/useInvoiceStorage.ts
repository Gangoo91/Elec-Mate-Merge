import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';
import { generateSequentialInvoiceNumber } from '@/utils/invoice-number-generator';

export const useInvoiceStorage = () => {
  const [invoices, setInvoices] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

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
    invoice_sent_at: row.invoice_sent_at ? new Date(row.invoice_sent_at) : undefined,
    invoice_paid_at: row.invoice_paid_at ? new Date(row.invoice_paid_at) : undefined,
    invoice_payment_method: row.invoice_payment_method,
    invoice_payment_reference: row.invoice_payment_reference,
    work_completion_date: row.work_completion_date ? new Date(row.work_completion_date) : undefined,
    invoice_notes: row.invoice_notes,
    additional_invoice_items: row.additional_invoice_items || [],
    pdf_document_id: row.pdf_document_id,
    pdf_generated_at: row.pdf_generated_at ? new Date(row.pdf_generated_at) : undefined,
    pdf_version: row.pdf_version,
    // Linked certificate fields
    linked_certificate_id: row.linked_certificate_id,
    linked_certificate_type: row.linked_certificate_type,
    linked_certificate_reference: row.linked_certificate_reference,
    linked_certificate_pdf_url: row.linked_certificate_pdf_url,
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
      .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedInvoices = (data || []).map(convertDbRowToQuote);
      setInvoices(convertedInvoices);
      setLastUpdated(new Date());
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

  const saveInvoice = async (invoice: Partial<Invoice>, retryCount = 0): Promise<boolean> => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 500;

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

      // Generate invoice number if it's TEMP or missing
      // Detect if this is a standalone invoice (not from a quote)
      const isStandaloneInvoice = !invoice.originalQuoteId && !invoice.quoteNumber;
      
      let finalInvoiceNumber = invoice.invoice_number;
      if (!finalInvoiceNumber || finalInvoiceNumber === 'Invoice/TEMP') {
        // Import the standalone generator at the top if not already imported
        const { generateStandaloneInvoiceNumber } = await import('@/utils/invoice-number-generator');
        
        finalInvoiceNumber = isStandaloneInvoice 
          ? await generateStandaloneInvoiceNumber()
          : await generateSequentialInvoiceNumber();
        
        console.log('📝 Generated invoice number:', finalInvoiceNumber,
                    isStandaloneInvoice ? '(standalone)' : '(quote-based)',
                    retryCount > 0 ? `(retry ${retryCount})` : '');
      }

      // Warn if client email is missing - thank-you email won't be sent
      if (!invoice.client?.email?.trim()) {
        console.warn('⚠️ Invoice being saved without client email - thank-you email will not be sent');
      }

      // Merge additional invoice items into the main items array
      const mergedItems = [
        ...(invoice.items || []),
        ...(invoice.additional_invoice_items || [])
      ];

      // Check if this is a new standalone invoice or existing quote
      const { data: existingQuote } = await supabase
        .from('quotes')
        .select('id')
        .eq('id', invoice.id)
        .maybeSingle();

      const isNewInvoice = !existingQuote;
      let updatedQuote;

      if (isNewInvoice) {
        // INSERT new standalone invoice
        console.log('📝 Creating new standalone invoice');
        const { data: newInvoice, error: insertError } = await supabase
          .from('quotes')
          .insert([{
            user_id: user.id,
            quote_number: finalInvoiceNumber,
            client_data: JSON.parse(JSON.stringify(invoice.client)) as any,
            items: JSON.parse(JSON.stringify(mergedItems)) as any,
            settings: JSON.parse(JSON.stringify(invoice.settings || {})) as any,
            job_details: invoice.jobDetails ? JSON.parse(JSON.stringify(invoice.jobDetails)) as any : null,
            subtotal: invoice.subtotal,
            overhead: invoice.overhead,
            profit: invoice.profit,
            vat_amount: invoice.vatAmount,
            total: invoice.total,
            status: 'approved',
            invoice_raised: true,
            invoice_number: finalInvoiceNumber,
            invoice_date: invoice.invoice_date?.toISOString(),
            invoice_due_date: invoice.invoice_due_date?.toISOString(),
            invoice_status: invoice.invoice_status || 'draft',
            invoice_notes: invoice.invoice_notes || null,
            work_completion_date: invoice.work_completion_date?.toISOString(),
            additional_invoice_items: [] as any,
            tags: [] as any,
            expiry_date: invoice.invoice_due_date?.toISOString(),
            acceptance_status: 'accepted',
            accepted_at: new Date().toISOString(),
            pdf_version: 1,
            // Linked certificate fields (when created from EICR/EIC/Minor Works)
            linked_certificate_id: invoice.linked_certificate_id || null,
            linked_certificate_type: invoice.linked_certificate_type || null,
            linked_certificate_reference: invoice.linked_certificate_reference || null,
            linked_certificate_pdf_url: invoice.linked_certificate_pdf_url || null,
          }])
          .select()
          .single();

        if (insertError) {
          console.error('❌ Error inserting standalone invoice:', insertError);
          throw insertError;
        }
        updatedQuote = newInvoice;
      } else {
        // UPDATE existing quote
        console.log('📝 Updating existing quote to invoice');
        const { data: updated, error: updateError } = await supabase
          .from('quotes')
          .update({
            invoice_raised: true,
            invoice_number: finalInvoiceNumber,
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

        if (updateError) {
          console.error('❌ Error updating quote:', updateError);
          throw updateError;
        }
        updatedQuote = updated;
      }

      // 2. Force regenerate PDF with LATEST data on every save (silent background process)
      try {

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

        // 4. Store PDF metadata with incremented version
        if (documentId) {
          const newVersion = (updatedQuote.pdf_version || 0) + 1;
          const { error: pdfUpdateError } = await supabase
            .from('quotes')
            .update({
              pdf_document_id: documentId,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion
            })
            .eq('id', updatedQuote.id);

          if (pdfUpdateError) {
            console.error('PDF metadata update error:', pdfUpdateError);
          }
        }

        // Show single success toast after everything is done
        toast({
          title: 'Invoice saved',
          variant: 'success',
          duration: 3000,
        });
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        // Silent - PDF regenerates in background
      }

      // 5. Return success without refetching (database trigger handles updated_at)
      setInvoices(prev => prev.map(inv => inv.id === invoice.id ? convertDbRowToQuote(updatedQuote) : inv));
      return true;
    } catch (error: any) {
      console.error('Error saving invoice:', error);
      
      // Check if it's a duplicate key error (PostgreSQL error code 23505)
      const isDuplicateKeyError = error?.code === '23505' || 
                                   error?.message?.includes('duplicate key') ||
                                   error?.message?.includes('invoice_number_key');
      
      if (isDuplicateKeyError && retryCount < MAX_RETRIES) {
        console.warn(`⚠️ Duplicate invoice number detected, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        
        // Wait before retrying with exponential backoff
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount)));
        
        // Retry with a fresh invoice number by clearing the existing one
        return saveInvoice({ ...invoice, invoice_number: undefined }, retryCount + 1);
      }
      
      toast({
        title: 'Error saving invoice',
        description: isDuplicateKeyError && retryCount >= MAX_RETRIES
          ? 'Failed to generate unique invoice number after multiple attempts. Please try again.'
          : 'Failed to save invoice. Please try again.',
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
        variant: 'success',
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
        variant: 'success',
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
        variant: 'success',
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
    lastUpdated,
  };
};
