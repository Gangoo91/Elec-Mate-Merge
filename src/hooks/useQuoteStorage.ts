import { useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';

// Database storage for quotes (no longer using localStorage)

export const useQuoteStorage = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert database row to Quote object
  const convertDbRowToQuote = useCallback((row: any): Quote => ({
    id: row.id,
    quoteNumber: row.quote_number,
    client: row.client_data,
    jobDetails: row.job_details,
    items: row.items,
    settings: row.settings,
    subtotal: parseFloat(row.subtotal),
    overhead: parseFloat(row.overhead),
    profit: parseFloat(row.profit),
    vatAmount: parseFloat(row.vat_amount),
    total: parseFloat(row.total),
    status: row.status,
    tags: row.tags || [],
    lastReminderSentAt: row.last_reminder_sent_at ? new Date(row.last_reminder_sent_at) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    expiryDate: new Date(row.expiry_date),
    notes: row.notes,
    acceptance_status: row.acceptance_status,
    accepted_at: row.accepted_at ? new Date(row.accepted_at) : undefined,
    accepted_by_name: row.accepted_by_name,
    accepted_by_email: row.accepted_by_email,
    public_token: row.public_token,
    invoice_raised: row.invoice_raised,
    work_completion_date: row.work_completion_date ? new Date(row.work_completion_date) : undefined,
  }), []);

  // Load quotes from Supabase on mount
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user authenticated');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('invoice_raised', false)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading quotes:', error);
          return;
        }

        const quotes = data?.map(convertDbRowToQuote) || [];
        setSavedQuotes(quotes);
        console.log('Quotes loaded from Supabase:', quotes.length);
      } catch (error) {
        console.error('Error loading quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();

    // Set up real-time subscription for quote updates
    const channel = supabase
      .channel('quote-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quotes'
        },
        (payload) => {
          console.log('Quote updated in real-time:', payload);
          // Refresh quotes when any quote is updated (e.g., client accepts/rejects)
          refreshQuotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [convertDbRowToQuote]);

  // Save a new quote to Supabase
  const saveQuote = useCallback(async (quote: Quote) => {
    try {
      console.log('Quote Storage - Starting save process', {
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        status: quote.status,
        clientName: quote.client?.name,
        total: quote.total
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('Quote Storage - User not authenticated');
        return false;
      }

      console.log('Quote Storage - User authenticated', {
        userId: user.id,
        userEmail: user.email
      });

      const quoteData = {
        id: quote.id,
        user_id: user.id,
        quote_number: quote.quoteNumber,
        client_data: quote.client as any,
        job_details: quote.jobDetails as any,
        items: quote.items as any,
        settings: quote.settings as any,
        subtotal: quote.subtotal,
        overhead: quote.overhead,
        profit: quote.profit,
        vat_amount: quote.vatAmount,
        total: quote.total,
        status: quote.status,
        tags: quote.tags || [],
        last_reminder_sent_at: quote.lastReminderSentAt?.toISOString(),
        notes: quote.notes,
        expiry_date: quote.expiryDate.toISOString(),
        acceptance_status: quote.acceptance_status || 'pending',
        accepted_at: quote.accepted_at?.toISOString(),
        public_token: quote.public_token
      };

      console.log('Quote Storage - Prepared data for database', {
        id: quoteData.id,
        user_id: quoteData.user_id,
        quote_number: quoteData.quote_number,
        status: quoteData.status,
        total: quoteData.total,
        acceptance_status: quoteData.acceptance_status
      });

      const { error } = await supabase
        .from('quotes')
        .upsert(quoteData, { onConflict: 'id' });

      if (error) {
        console.error('Quote Storage - Database error:', error);
        console.error('Quote Storage - Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return false;
      }

      console.log('Quote Storage - Database save successful');

      // STEP 3: Generate PDF for quote (like invoices)
      try {
        const { data: companyData } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: pdfData } = await supabase.functions.invoke('generate-pdf-monkey', {
            body: {
              quote: quoteData,
              companyProfile: companyData,
              invoice_mode: false,
              force_regenerate: true
            },
            headers: { Authorization: `Bearer ${session.access_token}` }
          });

          const documentId = pdfData?.documentId;
          if (documentId) {
            await supabase
              .from('quotes')
              .update({
                pdf_document_id: documentId,
                pdf_generated_at: new Date().toISOString(),
                pdf_version: (quote.pdf_version || 0) + 1
              })
              .eq('id', quote.id);
          }
        }
      } catch (pdfError) {
        console.error('Quote PDF generation error (non-blocking):', pdfError);
      }

      // Update local state
      const updatedQuotes = [quote, ...savedQuotes.filter(q => q.id !== quote.id)];
      setSavedQuotes(updatedQuotes);
      
      console.log('Quote Storage - Local state updated', {
        quoteId: quote.id,
        totalQuotes: updatedQuotes.length,
        isNewQuote: !savedQuotes.some(q => q.id === quote.id)
      });

      return true;
    } catch (error) {
      console.error('Quote Storage - Unexpected error:', error);
      return false;
    }
  }, [savedQuotes]);

  // Delete a quote from Supabase
  const deleteQuote = useCallback(async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) {
        console.error('Error deleting quote:', error);
        return false;
      }

      // Update local state
      const updatedQuotes = savedQuotes.filter(q => q.id !== quoteId);
      setSavedQuotes(updatedQuotes);
      console.log('Quote deleted from Supabase:', quoteId);
      return true;
    } catch (error) {
      console.error('Error deleting quote:', error);
      return false;
    }
  }, [savedQuotes]);

  // Get quote statistics
  const getQuoteStats = useCallback(() => {
    const pending = savedQuotes.filter(q => q.status === 'pending').length;
    const sent = savedQuotes.filter(q => q.status === 'sent').length;
    const approved = savedQuotes.filter(q => q.status === 'approved').length;
    const rejected = savedQuotes.filter(q => q.status === 'rejected').length;
    const draft = savedQuotes.filter(q => q.status === 'draft').length;
    const awaitingPayment = savedQuotes.filter(q => q.tags?.includes('awaiting_payment')).length;
    
    // Calculate this month's total from completed quotes
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyTotal = savedQuotes
      .filter(q => q.status === 'approved' && q.createdAt >= thisMonth)
      .reduce((total, quote) => total + (quote.total || 0), 0);

    return {
      pending,
      sent,
      approved,
      rejected,
      draft,
      awaitingPayment,
      monthlyTotal,
      totalQuotes: savedQuotes.length
    };
  }, [savedQuotes]);

  // Manually refresh quotes from database
  const refreshQuotes = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user authenticated');
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('invoice_raised', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error refreshing quotes:', error);
        return;
      }

      const quotes = data?.map(convertDbRowToQuote) || [];
      setSavedQuotes(quotes);
      console.log('Quotes refreshed:', quotes.length);
    } catch (error) {
      console.error('Error refreshing quotes:', error);
    }
  }, [convertDbRowToQuote]);

  // Generate invoice number from quote number
  const generateInvoiceNumber = (quoteNumber: string): string => {
    if (quoteNumber.startsWith('Q')) {
      return 'INV' + quoteNumber.slice(1);
    }
    if (quoteNumber.startsWith('QTE')) {
      return quoteNumber.replace('QTE', 'INV');
    }
    return `INV-${Date.now().toString(36).toUpperCase()}`;
  };

  const updateQuoteStatus = async (quoteId: string, status: Quote['status'], tags?: Quote['tags'], acceptanceStatus?: Quote['acceptance_status']): Promise<boolean> => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString(),
      };

      if (tags !== undefined) {
        updateData.tags = tags;

        // If marking work as done, set completion date AND auto-create invoice
        if (tags.includes('work_done')) {
          updateData.work_completion_date = new Date().toISOString();

          // Get the quote to generate invoice number
          const quote = savedQuotes.find(q => q.id === quoteId);
          if (quote && !quote.invoice_raised) {
            const invoiceNumber = generateInvoiceNumber(quote.quoteNumber);
            const invoiceDate = new Date();
            const invoiceDueDate = new Date();
            invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);

            updateData.invoice_raised = true;
            updateData.invoice_number = invoiceNumber;
            updateData.invoice_date = invoiceDate.toISOString();
            updateData.invoice_due_date = invoiceDueDate.toISOString();
            updateData.invoice_status = 'draft';

            console.log('Auto-creating invoice for completed work:', {
              quoteId,
              invoiceNumber,
              invoiceDate: invoiceDate.toISOString(),
              invoiceDueDate: invoiceDueDate.toISOString()
            });
          }
        }
      }

      if (acceptanceStatus !== undefined) {
        updateData.acceptance_status = acceptanceStatus;
        updateData.accepted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('quotes')
        .update(updateData)
        .eq('id', quoteId);

      if (error) {
        console.error('Error updating quote status:', error);
        return false;
      }

      // Update local state
      setSavedQuotes(prev => prev.map(quote =>
        quote.id === quoteId
          ? {
              ...quote,
              status,
              tags: tags || quote.tags,
              acceptance_status: acceptanceStatus || quote.acceptance_status,
              accepted_at: acceptanceStatus ? new Date() : quote.accepted_at,
              work_completion_date: tags?.includes('work_done') ? new Date() : quote.work_completion_date,
              invoice_raised: tags?.includes('work_done') ? true : quote.invoice_raised,
              updatedAt: new Date()
            }
          : quote
      ));

      return true;
    } catch (error) {
      console.error('Error updating quote status:', error);
      return false;
    }
  };

  const sendPaymentReminder = async (quoteId: string, reminderType: 'gentle' | 'firm' | 'final'): Promise<boolean> => {
    try {
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: { quoteId, reminderType }
      });

      if (error) {
        console.error('Error sending payment reminder:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      return false;
    }
  };

  return {
    savedQuotes,
    saveQuote,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    getQuoteStats,
    loading,
    refreshQuotes,
  };
};