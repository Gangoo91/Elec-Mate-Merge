/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { captureError, captureApiError, trackMilestone, addBreadcrumb } from '@/lib/sentry';
import { trackFeatureUse } from '@/components/ActivityTracker';

// Database storage for quotes (no longer using localStorage)

export const useQuoteStorage = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [invoicedQuotes, setInvoicedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const parseNumber = (value: unknown): number => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    if (typeof value === 'string') {
      const parsed = Number.parseFloat(value);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
  };

  // Convert database row to Quote object
  const convertDbRowToQuote = useCallback(
    (row: any): Quote => ({
      id: row.id,
      quoteNumber: row.quote_number,
      client: row.client_data,
      jobDetails: row.job_details,
      items: row.items,
      settings: row.settings,
      subtotal: parseNumber(row.subtotal),
      overhead: parseNumber(row.overhead),
      profit: parseNumber(row.profit),
      discountAmount: parseNumber(row.discount_amount),
      vatAmount: parseNumber(row.vat_amount),
      total: parseNumber(row.total),
      status: row.status,
      tags: row.tags || [],
      lastReminderSentAt: row.last_reminder_sent_at
        ? new Date(row.last_reminder_sent_at)
        : undefined,
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
      public_token: row.public_token,
      invoice_raised: row.invoice_raised,
      work_completion_date: row.work_completion_date
        ? new Date(row.work_completion_date)
        : undefined,
      pdf_document_id: row.pdf_document_id,
      pdf_url: row.pdf_url,
      pdf_generated_at: row.pdf_generated_at ? new Date(row.pdf_generated_at) : undefined,
      pdf_version: row.pdf_version,
      // Email tracking fields
      first_sent_at: row.first_sent_at ? new Date(row.first_sent_at) : undefined,
      reminder_count: row.reminder_count || 0,
      auto_followup_enabled: row.auto_followup_enabled !== false, // Default true
      expiry_notification_sent: row.expiry_notification_sent || false,
      // Email view tracking (from join with quote_views if available)
      email_opened_at: row.email_opened_at ? new Date(row.email_opened_at) : undefined,
      email_open_count: row.email_open_count || 0,
      // Linked certificate fields
      linked_certificate_id: row.linked_certificate_id,
      linked_certificate_type: row.linked_certificate_type,
      linked_certificate_reference: row.linked_certificate_reference,
      linked_certificate_pdf_url: row.linked_certificate_pdf_url,
    }),
    []
  );

  const fetchActiveQuotesForUser = useCallback(
    async (userId: string): Promise<Quote[]> => {
      const { data, error } = await supabase
        .from('quotes')
        .select(
          `
          *,
          quote_views!left (
            email_opened_at,
            email_open_count,
            email_sent_at,
            last_viewed_at,
            view_count
          )
        `
        )
        .eq('user_id', userId)
        .eq('invoice_raised', false)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (
        data?.map((row: any) => {
          const quoteView = row.quote_views?.[0] || {};
          return convertDbRowToQuote({
            ...row,
            email_opened_at: quoteView.email_opened_at,
            email_open_count: quoteView.email_open_count || 0,
          });
        }) || []
      );
    },
    [convertDbRowToQuote]
  );

  const fetchInvoicedQuotesForUser = useCallback(
    async (userId: string): Promise<Quote[]> => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', userId)
        .eq('invoice_raised', true)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []).map((row: any) => convertDbRowToQuote(row));
    },
    [convertDbRowToQuote]
  );

  // Manually refresh quotes from database
  const refreshQuotes = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      const [quotes, invoiced] = await Promise.all([
        fetchActiveQuotesForUser(user.id),
        fetchInvoicedQuotesForUser(user.id),
      ]);

      setSavedQuotes(quotes);
      setInvoicedQuotes(invoiced);
      setLastUpdated(new Date());
    } catch (error) {
      captureApiError(
        error instanceof Error ? error : new Error(String(error)),
        'quotes/refresh',
        { context: 'refreshQuotes' }
      );
    }
  }, [fetchActiveQuotesForUser, fetchInvoicedQuotesForUser]);

  // Load quotes from Supabase on mount
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const quotes = await fetchActiveQuotesForUser(user.id);
        setSavedQuotes(quotes);
        setLastUpdated(new Date());
      } catch (error) {
        captureApiError(
          error instanceof Error ? error : new Error(String(error)),
          'quotes/load',
          { context: 'loadQuotes' }
        );
      } finally {
        setLoading(false);
      }
    };

    // Load quotes that have been converted to invoices (for the Invoiced filter tab)
    const loadInvoicedQuotes = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const converted = await fetchInvoicedQuotesForUser(user.id);
        setInvoicedQuotes(converted);
      } catch (error) {
        captureApiError(
          error instanceof Error ? error : new Error(String(error)),
          'quotes/load-invoiced',
          { context: 'loadInvoicedQuotes' }
        );
      }
    };

    loadQuotes();
    loadInvoicedQuotes();

    // Set up real-time subscription for quote updates AND inserts
    const setupRealtimeSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const channel = supabase
        .channel('quote-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'quotes',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newRecord = payload.new as any;
            const isInvoice = !!newRecord.invoice_number;
            const clientName = newRecord.client_data?.name || 'Client';
            const total = parseFloat(newRecord.total || 0).toFixed(2);

            // Show toast notification for new quote or invoice (likely from voice)
            toast({
              title: isInvoice ? 'Invoice Created' : 'Quote Created',
              description: `${isInvoice ? newRecord.invoice_number : newRecord.quote_number} for ${clientName} - £${total}`,
              duration: 5000,
            });

            // Refresh quotes to update UI
            refreshQuotes();
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'quotes',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const updatedQuote = payload.new as any;

            // Show toast notification for acceptance/rejection
            if (updatedQuote.acceptance_status === 'accepted') {
              toast({
                title: 'Quote Accepted!',
                description: `${updatedQuote.client_data?.name || 'Client'} accepted quote ${updatedQuote.quote_number}`,
                duration: 5000,
              });
            } else if (updatedQuote.acceptance_status === 'rejected') {
              toast({
                title: 'Quote Declined',
                description: `${updatedQuote.client_data?.name || 'Client'} declined quote ${updatedQuote.quote_number}`,
                variant: 'destructive',
                duration: 5000,
              });
            }

            // Refresh quotes to update UI
            refreshQuotes();
          }
        )
        .subscribe();

      return channel;
    };

    let channel: any = null;
    setupRealtimeSubscription().then((ch) => {
      channel = ch;
    });

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [fetchActiveQuotesForUser, fetchInvoicedQuotesForUser, refreshQuotes]);

  // Save a new quote to Supabase
  const saveQuote = useCallback(
    async (quote: Quote) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          return false;
        }

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
          last_reminder_sent_at: quote.lastReminderSentAt
            ? quote.lastReminderSentAt instanceof Date
              ? quote.lastReminderSentAt.toISOString()
              : new Date(quote.lastReminderSentAt).toISOString()
            : null,
          notes: quote.notes,
          expiry_date:
            quote.expiryDate instanceof Date
              ? quote.expiryDate.toISOString()
              : new Date(quote.expiryDate || Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          acceptance_status: quote.acceptance_status || 'pending',
          accepted_at: quote.accepted_at
            ? quote.accepted_at instanceof Date
              ? quote.accepted_at.toISOString()
              : new Date(quote.accepted_at).toISOString()
            : null,
          public_token: quote.public_token,
          // Linked certificate fields (when created from EICR/EIC/Minor Works)
          linked_certificate_id: quote.linked_certificate_id || null,
          linked_certificate_type: quote.linked_certificate_type || null,
          linked_certificate_reference: quote.linked_certificate_reference || null,
          linked_certificate_pdf_url: quote.linked_certificate_pdf_url || null,
          // Project linking
          project_id: quote.project_id || null,
        };

        let { error } = await supabase.from('quotes').upsert(quoteData, { onConflict: 'id' });

        // Handle duplicate quote number error by generating a unique one
        if (error?.message?.includes('unique_quote_number_per_user')) {
          // Generate a unique quote number with timestamp
          const currentYear = new Date().getFullYear();
          const uniqueSuffix = Date.now().toString().slice(-6);
          quoteData.quote_number = `${currentYear}/T${uniqueSuffix}`;

          // Retry with new quote number
          const retryResult = await supabase.from('quotes').upsert(quoteData, { onConflict: 'id' });

          error = retryResult.error;
        }

        if (error) {
          captureApiError(new Error(`Quote save failed: ${error.message}`), 'quotes/save', {
            quoteId: quote.id,
            quoteNumber: quote.quoteNumber,
            errorCode: error.code,
          });
          return false;
        }

        // STEP 3: Generate PDF for quote (like invoices)
        try {
          const { data: companyData } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            const { data: pdfData } = await supabase.functions.invoke('generate-pdf-monkey', {
              body: {
                quote: quoteData,
                companyProfile: companyData,
                invoice_mode: false,
                force_regenerate: true,
              },
              headers: { Authorization: `Bearer ${session.access_token}` },
            });

            const documentId = pdfData?.documentId;
            if (documentId) {
              await supabase
                .from('quotes')
                .update({
                  pdf_document_id: documentId,
                  pdf_generated_at: new Date().toISOString(),
                  pdf_version: (quote.pdf_version || 0) + 1,
                })
                .eq('id', quote.id);
            }
          }
        } catch {
          // PDF generation error (non-blocking)
        }

        // Update local state with potentially updated quote number
        const savedQuoteData = { ...quote, quoteNumber: quoteData.quote_number };
        const updatedQuotes = [savedQuoteData, ...savedQuotes.filter((q) => q.id !== quote.id)];
        setSavedQuotes(updatedQuotes);

        // Track successful quote creation/update
        trackMilestone('Quote Saved', { quoteId: quote.id, total: quote.total });
        trackFeatureUse(user.id, 'quote_saved', { quoteId: quote.id, total: quote.total });

        return true;
      } catch (error) {
        captureError(error instanceof Error ? error : new Error('Quote save unexpected error'), {
          quoteId: quote.id,
          context: 'saveQuote',
        });
        return false;
      }
    },
    [savedQuotes]
  );

  // Delete a quote from Supabase
  const deleteQuote = useCallback(
    async (quoteId: string) => {
      try {
        addBreadcrumb('Deleting quote', 'quote', { quoteId });

        const { error } = await supabase.from('quotes').delete().eq('id', quoteId);

        if (error) {
          captureApiError(new Error(`Quote delete failed: ${error.message}`), 'quotes/delete', {
            quoteId,
          });
          return false;
        }

        // Update local state
        const updatedQuotes = savedQuotes.filter((q) => q.id !== quoteId);
        setSavedQuotes(updatedQuotes);
        return true;
      } catch (error) {
        captureError(error instanceof Error ? error : new Error('Quote delete error'), { quoteId });
        return false;
      }
    },
    [savedQuotes]
  );

  // Get quote statistics
  const getQuoteStats = useCallback(() => {
    const pending = savedQuotes.filter((q) => q.status === 'pending').length;
    const sent = savedQuotes.filter((q) => q.status === 'sent').length;
    const approved = savedQuotes.filter((q) => q.status === 'approved').length;
    const rejected = savedQuotes.filter((q) => q.status === 'rejected').length;
    const draft = savedQuotes.filter((q) => q.status === 'draft').length;
    const awaitingPayment = savedQuotes.filter((q) => q.tags?.includes('awaiting_payment')).length;

    // Calculate this month's total from completed quotes
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyTotal = savedQuotes
      .filter((q) => q.status === 'approved' && q.createdAt >= thisMonth)
      .reduce((total, quote) => total + (quote.total || 0), 0);

    return {
      pending,
      sent,
      approved,
      rejected,
      draft,
      awaitingPayment,
      monthlyTotal,
      totalQuotes: savedQuotes.length,
    };
  }, [savedQuotes]);

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

  const updateQuoteStatus = async (
    quoteId: string,
    status: Quote['status'],
    tags?: Quote['tags'],
    acceptanceStatus?: Quote['acceptance_status']
  ): Promise<boolean> => {
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
          const quote = savedQuotes.find((q) => q.id === quoteId);
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

          }
        }
      }

      if (acceptanceStatus !== undefined) {
        updateData.acceptance_status = acceptanceStatus;
        updateData.accepted_at = new Date().toISOString();
        // When a quote is accepted, always promote its status to 'approved'
        // so it leaves the Drafts tab and appears under Approved.
        if (acceptanceStatus === 'accepted') {
          updateData.status = 'approved';
        }
      }

      const { error } = await supabase.from('quotes').update(updateData).eq('id', quoteId);

      if (error) {
        return false;
      }

      // Update local state
      const effectiveStatus = acceptanceStatus === 'accepted' ? 'approved' : status;
      setSavedQuotes((prev) =>
        prev.map((quote) =>
          quote.id === quoteId
            ? {
                ...quote,
                status: effectiveStatus,
                tags: tags || quote.tags,
                acceptance_status: acceptanceStatus || quote.acceptance_status,
                accepted_at: acceptanceStatus ? new Date() : quote.accepted_at,
                work_completion_date: tags?.includes('work_done')
                  ? new Date()
                  : quote.work_completion_date,
                invoice_raised: tags?.includes('work_done') ? true : quote.invoice_raised,
                updatedAt: new Date(),
              }
            : quote
        )
      );

      return true;
    } catch {
      return false;
    }
  };

  const sendPaymentReminder = async (
    quoteId: string,
    reminderType: 'gentle' | 'firm' | 'final'
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.functions.invoke('send-payment-reminder', {
        body: { quoteId, reminderType },
      });

      if (error) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };

  // Send a quote follow-up reminder (for quotes awaiting acceptance)
  const sendQuoteReminder = async (
    quoteId: string,
    reminderType: 'gentle' | 'firm' | 'urgent' = 'gentle'
  ): Promise<boolean> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        return false;
      }

      const { data, error } = await supabase.functions.invoke('send-quote-reminder', {
        body: { quoteId, reminderType },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) {
        toast({
          title: 'Failed to send reminder',
          description: error.message || 'Please try again',
          variant: 'destructive',
        });
        return false;
      }

      // Update local state
      setSavedQuotes((prev) =>
        prev.map((quote) =>
          quote.id === quoteId
            ? {
                ...quote,
                reminder_count: (quote.reminder_count || 0) + 1,
                lastReminderSentAt: new Date(),
              }
            : quote
        )
      );

      toast({
        title: 'Reminder Sent',
        description: data?.message || 'Follow-up reminder sent to client',
      });

      return true;
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send reminder',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Toggle auto follow-up for a quote
  const toggleAutoFollowup = async (quoteId: string, enabled: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({
          auto_followup_enabled: enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', quoteId);

      if (error) {
        return false;
      }

      // Update local state
      setSavedQuotes((prev) =>
        prev.map((quote) =>
          quote.id === quoteId ? { ...quote, auto_followup_enabled: enabled } : quote
        )
      );

      toast({
        title: enabled ? 'Auto Follow-ups Enabled' : 'Auto Follow-ups Disabled',
        description: enabled
          ? "We'll automatically send reminders for this quote"
          : 'No automatic reminders will be sent',
      });

      return true;
    } catch {
      return false;
    }
  };

  return {
    savedQuotes,
    invoicedQuotes,
    saveQuote,
    deleteQuote,
    updateQuoteStatus,
    sendPaymentReminder,
    sendQuoteReminder,
    toggleAutoFollowup,
    getQuoteStats,
    loading,
    refreshQuotes,
    lastUpdated,
  };
};
