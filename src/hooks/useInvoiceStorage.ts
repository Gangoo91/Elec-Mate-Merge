/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { Invoice } from '@/types/invoice';
import { Quote } from '@/types/quote';
import { toast } from '@/hooks/use-toast';
import { generateSequentialInvoiceNumber } from '@/utils/invoice-number-generator';
import { useStockMovements } from '@/hooks/useStockMovements';
import {
  captureApiError,
  captureEdgeFunctionError,
  trackMilestone,
  addBreadcrumb,
} from '@/lib/sentry';

export const useInvoiceStorage = () => {
  const [invoices, setInvoices] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { applyInvoiceDecrement, reverseInvoiceDecrement } = useStockMovements();

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

  // Convert database row to Quote object with invoice data
  const convertDbRowToQuote = useCallback(
    (row: any): Quote => ({
      id: row.id,
      quoteNumber: row.quote_number,
      client: row.client_data,
      items: row.items,
      settings: row.settings,
      jobDetails: row.job_details,
      subtotal: parseNumber(row.subtotal),
      overhead: parseNumber(row.overhead),
      profit: parseNumber(row.profit),
      discountAmount: parseNumber(row.discount_amount),
      vatAmount: parseNumber(row.vat_amount),
      total: parseNumber(row.total),
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
      total_paid: parseNumber(row.total_paid),
      partial_payments: row.partial_payments || [],
      work_completion_date: row.work_completion_date
        ? new Date(row.work_completion_date)
        : undefined,
      invoice_notes: row.invoice_notes,
      additional_invoice_items: row.additional_invoice_items || [],
      pdf_document_id: row.pdf_document_id,
      pdf_url: row.pdf_url,
      pdf_generated_at: row.pdf_generated_at ? new Date(row.pdf_generated_at) : undefined,
      pdf_version: row.pdf_version,
      // Linked certificate fields
      linked_certificate_id: row.linked_certificate_id,
      linked_certificate_type: row.linked_certificate_type,
      linked_certificate_reference: row.linked_certificate_reference,
      linked_certificate_pdf_url: row.linked_certificate_pdf_url,
    }),
    []
  );

  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const convertedInvoices = (data || []).map(convertDbRowToQuote);
      setInvoices(convertedInvoices);
      setLastUpdated(new Date());
    } catch (error) {
      captureApiError(error, 'invoices/fetch');
      toast({
        title: 'Error loading invoices',
        description: 'Failed to load invoices. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [convertDbRowToQuote]);

  useEffect(() => {
    fetchInvoices();

    // Set up real-time subscription for invoice updates (WhatsApp AI creates invoices)
    const setupRealtimeSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const channel = supabase
        .channel(realtimeChannelName('invoice-realtime'))
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
            if (newRecord.invoice_raised) {
              const clientName = newRecord.client_data?.name || 'Client';
              const total = parseFloat(newRecord.total || 0).toFixed(2);
              toast({
                title: 'New Invoice Created',
                description: `${newRecord.invoice_number || 'Invoice'} for ${clientName} — £${total}`,
                duration: 5000,
              });
              fetchInvoices();
            }
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
            const updatedRecord = payload.new as any;
            if (updatedRecord.invoice_raised) {
              fetchInvoices();
            }
          }
        )
        .subscribe((status, err) => {
          // CHANNEL_ERROR / TIMED_OUT without an err object are transient
          // network blips (Supabase reconnects automatically). Only escalate
          // when there's a real error payload to investigate.
          if (err) {
            const message =
              err instanceof Error
                ? err.message
                : String((err as { message?: string })?.message ?? '');
            const lowered = typeof message === 'string' ? message.toLowerCase() : '';
            // Known-recoverable realtime errors. Don't escalate to Sentry:
            //   - "bindings mismatch" — stale schema cache / token-refresh race
            //   - "InvalidJWTToken" / "Token has expired" — JWT TTL ran out
            //     while the tab was idle; the auth listener below calls
            //     supabase.realtime.setAuth on TOKEN_REFRESHED so the channel
            //     reconnects automatically (Sentry REACT-A1).
            const isKnownBindingsMismatch = lowered.includes('mismatch between server and client bindings');
            const isExpiredJwt =
              lowered.includes('invalidjwttoken') || lowered.includes('token has expired');
            if (isKnownBindingsMismatch) {
              addBreadcrumb('Realtime bindings mismatch (recoverable)', 'realtime', {
                channel: 'invoice-realtime',
                status,
              });
            } else if (isExpiredJwt) {
              addBreadcrumb('Realtime JWT expired (recoverable)', 'realtime', {
                channel: 'invoice-realtime',
                status,
              });
            } else {
              captureApiError(err, 'invoices/realtime', { status });
            }
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            addBreadcrumb(`Realtime ${status}`, 'realtime', { channel: 'invoice-realtime' });
          }
        });

      // Keep the realtime channel's JWT fresh. Supabase realtime keeps the
      // token it was opened with — when the access token refreshes (every
      // ~1h) we must push the new one in, otherwise the channel eventually
      // errors with "Token has expired" (Sentry REACT-A1).
      const { data: authSub } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'TOKEN_REFRESHED' && session?.access_token) {
          supabase.realtime.setAuth(session.access_token);
        }
      });

      return { channel, authSub };
    };

    let cleanup: { channel: any; authSub: { subscription: { unsubscribe: () => void } } } | null =
      null;
    setupRealtimeSubscription().then((res) => {
      cleanup = res;
    });

    return () => {
      if (cleanup?.channel) supabase.removeChannel(cleanup.channel);
      cleanup?.authSub?.subscription?.unsubscribe();
    };
  }, [fetchInvoices]);

  const saveInvoice = async (
    invoice: Partial<Invoice>,
    retryCount = 0
  ): Promise<string | false> => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 500;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
        const { generateStandaloneInvoiceNumber } =
          await import('@/utils/invoice-number-generator');

        finalInvoiceNumber = isStandaloneInvoice
          ? await generateStandaloneInvoiceNumber()
          : await generateSequentialInvoiceNumber();
      }

      // Merge additional invoice items into the main items array
      const mergedItems = [...(invoice.items || []), ...(invoice.additional_invoice_items || [])];

      // Check if this is a new standalone invoice or existing quote.
      // Short-circuit: if invoice.id is falsy (cert-created invoices have no id yet),
      // skip the DB lookup entirely — it would produce .eq('id', undefined) which is unreliable.
      let existingQuote = null;
      if (invoice.id) {
        const { data } = await supabase
          .from('quotes')
          .select('id')
          .eq('id', invoice.id)
          .maybeSingle();
        existingQuote = data;
      }

      const isNewInvoice = !existingQuote;
      let updatedQuote;

      // quotes.expiry_date is NOT NULL — but standalone invoices don't always
      // have a due date set by the user. Fall back to invoice_date + 30 days,
      // or now + 30 days if no invoice_date either. Same fallback pattern
      // saveQuote uses for the active-quote path.
      const fallbackDueIso = new Date(
        (invoice.invoice_date?.getTime() ?? Date.now()) + 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      const dueDateIso = invoice.invoice_due_date?.toISOString() ?? fallbackDueIso;

      if (isNewInvoice) {
        // INSERT new standalone invoice
        const { data: newInvoice, error: insertError } = await supabase
          .from('quotes')
          .insert([
            {
              user_id: user.id,
              quote_number: finalInvoiceNumber,
              client_data: JSON.parse(JSON.stringify(invoice.client)) as any,
              items: JSON.parse(JSON.stringify(mergedItems)) as any,
              settings: JSON.parse(JSON.stringify(invoice.settings || {})) as any,
              job_details: invoice.jobDetails
                ? (JSON.parse(JSON.stringify(invoice.jobDetails)) as any)
                : null,
              subtotal: invoice.subtotal,
              overhead: invoice.overhead,
              profit: invoice.profit,
              vat_amount: invoice.vatAmount,
              total: invoice.total,
              status: 'approved',
              invoice_raised: true,
              invoice_number: finalInvoiceNumber,
              invoice_date: invoice.invoice_date?.toISOString(),
              invoice_due_date: dueDateIso,
              invoice_status: invoice.invoice_status || 'draft',
              invoice_notes: invoice.invoice_notes || null,
              work_completion_date: invoice.work_completion_date?.toISOString(),
              additional_invoice_items: [] as any,
              tags: [] as any,
              expiry_date: dueDateIso,
              acceptance_status: 'accepted',
              accepted_at: new Date().toISOString(),
              pdf_version: 1,
              // Linked certificate fields (when created from EICR/EIC/Minor Works)
              linked_certificate_id: invoice.linked_certificate_id || null,
              linked_certificate_type: invoice.linked_certificate_type || null,
              linked_certificate_reference: invoice.linked_certificate_reference || null,
              linked_certificate_pdf_url: invoice.linked_certificate_pdf_url || null,
              // Project linking
              project_id: invoice.project_id || null,
            },
          ])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }
        updatedQuote = newInvoice;
      } else {
        // UPDATE existing quote
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
            client_data: JSON.parse(JSON.stringify(invoice.client)) as any,
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
          throw updateError;
        }
        updatedQuote = updated;
      }

      // Decrement stock for any stock-linked line items (idempotent per invoice,
      // best-effort — never blocks the save). ELE-1014.
      await applyInvoiceDecrement(updatedQuote?.id, mergedItems as any);

      // 2. Force regenerate PDF with LATEST data on every save (silent background process)
      try {
        const { data: companyData } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('User not authenticated');
        }

        // ALWAYS regenerate with fresh data - pass updatedQuote
        const { data: pdfData, error: pdfError } = await supabase.functions.invoke(
          'generate-pdf-monkey',
          {
            body: {
              quote: updatedQuote, // Use the fresh data from database
              companyProfile: companyData,
              invoice_mode: true,
              force_regenerate: true, // Force fresh generation
            },
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );

        if (pdfError) throw pdfError;

        // 3. Poll if needed & update PDF metadata
        let pdfUrl = pdfData?.downloadUrl;
        const documentId = pdfData?.documentId;
        let newVersion = updatedQuote.pdf_version || 0;

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
          newVersion = (updatedQuote.pdf_version || 0) + 1;
          const { error: pdfUpdateError } = await supabase
            .from('quotes')
            .update({
              pdf_document_id: documentId,
              pdf_url: pdfUrl || null,
              pdf_generated_at: new Date().toISOString(),
              pdf_version: newVersion,
            })
            .eq('id', updatedQuote.id);

          // PDF metadata update error is non-blocking
        }

        updatedQuote = {
          ...updatedQuote,
          pdf_document_id: documentId || updatedQuote.pdf_document_id,
          pdf_url: pdfUrl || updatedQuote.pdf_url,
          pdf_generated_at: new Date().toISOString(),
          pdf_version: newVersion,
        };

        // Show single success toast after everything is done
        toast({
          title: 'Invoice saved',
          variant: 'success',
          duration: 3000,
        });
      } catch (pdfError) {
        captureEdgeFunctionError(pdfError, 'generate-pdf-monkey', {
          invoiceId: invoice.id,
          invoiceNumber: finalInvoiceNumber,
        });
        // Silent - PDF regenerates in background
      }

      // 5. Return success without refetching (database trigger handles updated_at)
      const savedInvoice = convertDbRowToQuote(updatedQuote);
      setInvoices((prev) => [savedInvoice, ...prev.filter((inv) => inv.id !== savedInvoice.id)]);
      trackMilestone('Invoice Saved', {
        invoiceId: updatedQuote.id,
        invoiceNumber: finalInvoiceNumber,
        total: invoice.total,
        isStandalone: isStandaloneInvoice,
      });
      return updatedQuote.id;
    } catch (error: any) {
      // Check if it's a duplicate key error (PostgreSQL error code 23505)
      const isDuplicateKeyError =
        error?.code === '23505' ||
        error?.message?.includes('duplicate key') ||
        error?.message?.includes('invoice_number_key');

      // Track non-duplicate errors (duplicates are expected race conditions)
      if (!isDuplicateKeyError) {
        captureApiError(error, 'invoices/save', {
          invoiceId: invoice.id,
          errorCode: error?.code,
        });
      }

      if (isDuplicateKeyError && retryCount < MAX_RETRIES) {
        // Wait before retrying with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retryCount)));

        // Retry with a fresh invoice number by clearing the existing one
        return saveInvoice({ ...invoice, invoice_number: undefined }, retryCount + 1);
      }

      toast({
        title: 'Error saving invoice',
        description:
          isDuplicateKeyError && retryCount >= MAX_RETRIES
            ? 'Failed to generate unique invoice number after multiple attempts. Please try again.'
            : error?.message
              ? `Failed to save invoice: ${error.message}`
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
      captureApiError(error, 'invoices/mark-complete', { quoteId });
      toast({
        title: 'Error',
        description: 'Failed to mark work as complete. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateInvoiceStatus = async (
    invoiceId: string,
    status: Invoice['invoice_status']
  ): Promise<boolean> => {
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
      captureApiError(error, 'invoices/update-status', { invoiceId, newStatus: status });
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

      // Restore any stock this invoice had decremented (idempotent). ELE-1014.
      await reverseInvoiceDecrement(invoiceId);

      toast({
        title: 'Invoice deleted',
        variant: 'success',
      });

      await fetchInvoices();
      return true;
    } catch (error) {
      captureApiError(error, 'invoices/delete', { invoiceId });
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
