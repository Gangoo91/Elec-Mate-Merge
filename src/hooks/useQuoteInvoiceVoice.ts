import { useState, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Quote/Invoice ElevenLabs agent
const QUOTE_INVOICE_AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';

interface UseQuoteInvoiceVoiceOptions {
  currentSection?: 'quotes' | 'invoices';
  onToolResult?: () => void;
}

// Helper to generate quote number
function generateQuoteNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `QTE-${year}${month}-${random}`;
}

// Helper to generate invoice number
function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
}

export function useQuoteInvoiceVoice(options: UseQuoteInvoiceVoiceOptions = {}) {
  const { currentSection = 'quotes', onToolResult } = options;

  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [agentMessage, setAgentMessage] = useState('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onToolResultRef = useRef(onToolResult);
  onToolResultRef.current = onToolResult;

  // Helper to get auth session
  const getAuthSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');
    return session;
  };

  // Helper to find quote by client name or quote number
  const findQuote = async (params: { clientName?: string; quoteNumber?: string }) => {
    const session = await getAuthSession();

    let query = supabase
      .from('quotes')
      .select('*')
      .eq('user_id', session.user.id)
      .is('invoice_raised', false);

    if (params.quoteNumber) {
      query = query.ilike('quote_number', `%${params.quoteNumber}%`);
    } else if (params.clientName) {
      query = query.ilike('client_data->>name', `%${params.clientName}%`);
    } else {
      throw new Error('Please provide a client name or quote number');
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1).single();

    if (error || !data) {
      throw new Error(`Quote not found for ${params.clientName || params.quoteNumber}`);
    }

    return data;
  };

  // Helper to find invoice by client name or invoice number
  const findInvoice = async (params: { clientName?: string; invoiceNumber?: string }) => {
    const session = await getAuthSession();

    let query = supabase
      .from('quotes')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('invoice_raised', true);

    if (params.invoiceNumber) {
      query = query.ilike('invoice_number', `%${params.invoiceNumber}%`);
    } else if (params.clientName) {
      query = query.ilike('client_data->>name', `%${params.clientName}%`);
    } else {
      throw new Error('Please provide a client name or invoice number');
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1).single();

    if (error || !data) {
      throw new Error(`Invoice not found for ${params.clientName || params.invoiceNumber}`);
    }

    return data;
  };

  // Helper to trigger refresh
  const triggerRefresh = () => {
    onToolResultRef.current?.();
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log('[QuoteInvoiceVoice] Connected');
      setIsConnecting(false);
      setIsActive(true);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.success('Voice connected', {
        description: currentSection === 'quotes'
          ? 'Say "Send quote to..." or "Create a quote for..."'
          : 'Say "Send invoice to..." or "Create an invoice for..."',
        duration: 4000,
      });
    },
    onDisconnect: () => {
      console.log('[QuoteInvoiceVoice] Disconnected');
      setIsActive(false);
      setIsConnecting(false);
    },
    onError: (error) => {
      console.error('[QuoteInvoiceVoice] Error:', error);
      setIsConnecting(false);
      setIsActive(false);
      toast.error('Voice error', {
        description: error.message || 'Connection failed',
      });
    },
    onMessage: (message) => {
      const msg = message as unknown as Record<string, unknown>;
      if (msg.type === 'user_transcript') {
        const event = msg.user_transcription_event as { user_transcript?: string } | undefined;
        setTranscript(event?.user_transcript || '');
      }
      if (msg.type === 'agent_response') {
        const event = msg.agent_response_event as { agent_response?: string } | undefined;
        setAgentMessage(event?.agent_response || '');
      }
    },
    // Client tools - direct Supabase/edge function calls
    clientTools: {
      // Send an existing quote by client name or quote number
      send_quote: async (params: { clientName?: string; quoteNumber?: string }) => {
        console.log('[QuoteInvoiceVoice] send_quote called:', params);
        try {
          const quote = await findQuote(params);
          await getAuthSession(); // Verify user is authenticated

          // Call send-quote-resend edge function (auth handled automatically by Supabase client)
          console.log('[QuoteInvoiceVoice] Calling send-quote-resend for quote:', quote.id);
          const { data, error } = await supabase.functions.invoke('send-quote-resend', {
            body: { quoteId: quote.id },
          });

          console.log('[QuoteInvoiceVoice] send-quote-resend response:', { data, error });

          if (error) throw new Error(error.message);
          if (data?.error) throw new Error(data.error);

          triggerRefresh();
          const clientName = typeof quote.client_data === 'object' ? quote.client_data?.name : 'the client';
          return `Quote ${quote.quote_number} sent to ${clientName}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] send_quote error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to send quote'}`;
        }
      },

      // Send an existing invoice by client name or invoice number
      send_invoice: async (params: { clientName?: string; invoiceNumber?: string }) => {
        console.log('[QuoteInvoiceVoice] send_invoice called:', params);
        try {
          const invoice = await findInvoice(params);
          await getAuthSession(); // Verify user is authenticated

          // Call send-invoice-resend edge function (auth handled automatically by Supabase client)
          console.log('[QuoteInvoiceVoice] Calling send-invoice-resend for invoice:', invoice.id);
          const { data, error } = await supabase.functions.invoke('send-invoice-resend', {
            body: { invoiceId: invoice.id },
          });

          console.log('[QuoteInvoiceVoice] send-invoice-resend response:', { data, error });

          if (error) throw new Error(error.message);
          if (data?.error) throw new Error(data.error);

          triggerRefresh();
          const clientName = typeof invoice.client_data === 'object' ? invoice.client_data?.name : 'the client';
          return `Invoice ${invoice.invoice_number} sent to ${clientName}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] send_invoice error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to send invoice'}`;
        }
      },

      // Create a new quote (without sending)
      create_quote: async (params: {
        clientName: string;
        clientEmail: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        jobTitle: string;
        jobDescription?: string;
        itemDescription: string;
        itemQuantity: number;
        itemUnitPrice: number;
        vatRate?: number;
        notes?: string;
        expiryDays?: number;
      }) => {
        console.log('[QuoteInvoiceVoice] create_quote called:', params);
        try {
          const session = await getAuthSession();
          const quoteNumber = generateQuoteNumber();
          const vatRate = params.vatRate ?? 20;
          const quantity = params.itemQuantity || 1;
          const unitPrice = params.itemUnitPrice || 0;
          const lineTotal = quantity * unitPrice;
          const subtotal = lineTotal;
          const vatAmount = subtotal * (vatRate / 100);
          const total = subtotal + vatAmount;

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + (params.expiryDays || 30));

          const quoteData = {
            user_id: session.user.id,
            quote_number: quoteNumber,
            status: 'draft',
            client_data: {
              name: params.clientName,
              email: params.clientEmail,
              phone: params.clientPhone || '',
              address: params.clientAddress || '',
              postcode: params.clientPostcode || '',
            },
            job_details: {
              title: params.jobTitle,
              description: params.jobDescription || '',
            },
            items: [{
              description: params.itemDescription,
              quantity: quantity,
              unitPrice: unitPrice,
              total: lineTotal,
            }],
            subtotal: subtotal,
            vat_amount: vatAmount,
            total: total,
            settings: {
              vatRate: vatRate,
              vatRegistered: vatRate > 0,
            },
            notes: params.notes || '',
            expiry_date: expiryDate.toISOString(),
            invoice_raised: false,
          };

          const { data, error } = await supabase
            .from('quotes')
            .insert(quoteData)
            .select()
            .single();

          if (error) throw new Error(error.message);

          triggerRefresh();
          return `Quote ${quoteNumber} created for ${params.clientName}. Total: £${total.toFixed(2)}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] create_quote error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to create quote'}`;
        }
      },

      // Create a new invoice (without sending)
      create_invoice: async (params: {
        clientName: string;
        clientEmail: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        jobTitle: string;
        jobDescription?: string;
        itemDescription: string;
        itemQuantity: number;
        itemUnitPrice: number;
        vatRate?: number;
        paymentDays?: number;
        notes?: string;
      }) => {
        console.log('[QuoteInvoiceVoice] create_invoice called:', params);
        try {
          const session = await getAuthSession();
          const quoteNumber = generateQuoteNumber();
          const invoiceNumber = generateInvoiceNumber();
          const vatRate = params.vatRate ?? 20;
          const quantity = params.itemQuantity || 1;
          const unitPrice = params.itemUnitPrice || 0;
          const lineTotal = quantity * unitPrice;
          const subtotal = lineTotal;
          const vatAmount = subtotal * (vatRate / 100);
          const total = subtotal + vatAmount;

          const invoiceDate = new Date();
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + (params.paymentDays || 30));

          const invoiceData = {
            user_id: session.user.id,
            quote_number: quoteNumber,
            invoice_number: invoiceNumber,
            status: 'accepted',
            invoice_raised: true,
            invoice_status: 'draft',
            invoice_date: invoiceDate.toISOString(),
            invoice_due_date: dueDate.toISOString(),
            client_data: {
              name: params.clientName,
              email: params.clientEmail,
              phone: params.clientPhone || '',
              address: params.clientAddress || '',
              postcode: params.clientPostcode || '',
            },
            job_details: {
              title: params.jobTitle,
              description: params.jobDescription || '',
            },
            items: [{
              description: params.itemDescription,
              quantity: quantity,
              unitPrice: unitPrice,
              total: lineTotal,
            }],
            subtotal: subtotal,
            vat_amount: vatAmount,
            total: total,
            settings: {
              vatRate: vatRate,
              vatRegistered: vatRate > 0,
              paymentTerms: `Due within ${params.paymentDays || 30} days`,
            },
            invoice_notes: params.notes || '',
          };

          const { data, error } = await supabase
            .from('quotes')
            .insert(invoiceData)
            .select()
            .single();

          if (error) throw new Error(error.message);

          triggerRefresh();
          return `Invoice ${invoiceNumber} created for ${params.clientName}. Total: £${total.toFixed(2)}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] create_invoice error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to create invoice'}`;
        }
      },

      // Delete a quote
      delete_quote: async (params: { clientName?: string; quoteNumber?: string }) => {
        console.log('[QuoteInvoiceVoice] delete_quote called:', params);
        try {
          const quote = await findQuote(params);

          // Check if already invoiced
          if (quote.invoice_raised) {
            return `Cannot delete quote ${quote.quote_number} - it has been converted to an invoice`;
          }

          const { error } = await supabase
            .from('quotes')
            .delete()
            .eq('id', quote.id);

          if (error) throw new Error(error.message);

          triggerRefresh();
          const clientName = typeof quote.client_data === 'object' ? quote.client_data?.name : 'the client';
          return `Quote ${quote.quote_number} for ${clientName} has been deleted`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] delete_quote error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to delete quote'}`;
        }
      },

      // Delete an invoice
      delete_invoice: async (params: { clientName?: string; invoiceNumber?: string }) => {
        console.log('[QuoteInvoiceVoice] delete_invoice called:', params);
        try {
          const invoice = await findInvoice(params);

          // Check if paid
          if (invoice.invoice_status === 'paid') {
            return `Cannot delete invoice ${invoice.invoice_number} - it has been marked as paid`;
          }

          const { error } = await supabase
            .from('quotes')
            .delete()
            .eq('id', invoice.id);

          if (error) throw new Error(error.message);

          triggerRefresh();
          const clientName = typeof invoice.client_data === 'object' ? invoice.client_data?.name : 'the client';
          return `Invoice ${invoice.invoice_number} for ${clientName} has been deleted`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] delete_invoice error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to delete invoice'}`;
        }
      },

      // Convert a quote to an invoice
      convert_quote_to_invoice: async (params: { clientName?: string; quoteNumber?: string }) => {
        console.log('[QuoteInvoiceVoice] convert_quote_to_invoice called:', params);
        try {
          const quote = await findQuote(params);

          // Check if already invoiced
          if (quote.invoice_raised) {
            return `Quote ${quote.quote_number} has already been converted to invoice ${quote.invoice_number}`;
          }

          // Check if accepted (should be accepted before converting)
          if (quote.status !== 'accepted') {
            console.log('[QuoteInvoiceVoice] Converting non-accepted quote, status:', quote.status);
          }

          const invoiceNumber = generateInvoiceNumber();
          const invoiceDate = new Date();
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);

          const { error } = await supabase
            .from('quotes')
            .update({
              invoice_raised: true,
              invoice_number: invoiceNumber,
              invoice_date: invoiceDate.toISOString(),
              invoice_due_date: dueDate.toISOString(),
              invoice_status: 'draft',
              status: 'accepted',
            })
            .eq('id', quote.id);

          if (error) throw new Error(error.message);

          triggerRefresh();
          const clientName = typeof quote.client_data === 'object' ? quote.client_data?.name : 'the client';
          return `Quote ${quote.quote_number} converted to invoice ${invoiceNumber} for ${clientName}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] convert_quote_to_invoice error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to convert quote'}`;
        }
      },

      // Create a new quote and send it
      create_and_send_quote: async (params: {
        clientName: string;
        clientEmail: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        jobTitle: string;
        jobDescription?: string;
        jobLocation?: string;
        estimatedDuration?: string;
        workStartDate?: string;
        specialRequirements?: string;
        itemDescription: string;
        itemQuantity: number;
        itemUnitPrice: number;
        itemCategory?: string;
        labourRate?: number;
        overheadPercentage?: number;
        profitMargin?: number;
        vatRate?: number;
        vatRegistered?: boolean;
        breakdownMaterials?: boolean;
        notes?: string;
        expiryDays?: number;
      }) => {
        console.log('[QuoteInvoiceVoice] create_and_send_quote called:', params);
        try {
          const session = await getAuthSession();
          const quoteNumber = generateQuoteNumber();
          const vatRate = params.vatRate ?? 20;
          const quantity = params.itemQuantity || 1;
          const unitPrice = params.itemUnitPrice || 0;
          const lineTotal = quantity * unitPrice;
          const subtotal = lineTotal;
          const vatAmount = subtotal * (vatRate / 100);
          const total = subtotal + vatAmount;

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + (params.expiryDays || 30));

          const quoteData = {
            user_id: session.user.id,
            quote_number: quoteNumber,
            status: 'draft',
            client_data: {
              name: params.clientName,
              email: params.clientEmail,
              phone: params.clientPhone || '',
              address: params.clientAddress || '',
              postcode: params.clientPostcode || '',
            },
            job_details: {
              title: params.jobTitle,
              description: params.jobDescription || '',
              location: params.jobLocation || '',
              estimatedDuration: params.estimatedDuration || '',
              workStartDate: params.workStartDate || '',
              specialRequirements: params.specialRequirements || '',
            },
            items: [{
              description: params.itemDescription,
              quantity: quantity,
              unitPrice: unitPrice,
              total: lineTotal,
              category: params.itemCategory || 'general',
            }],
            subtotal: subtotal,
            vat_amount: vatAmount,
            total: total,
            settings: {
              vatRate: vatRate,
              vatRegistered: params.vatRegistered ?? (vatRate > 0),
              labourRate: params.labourRate,
              overheadPercentage: params.overheadPercentage,
              profitMargin: params.profitMargin,
              breakdownMaterials: params.breakdownMaterials,
            },
            notes: params.notes || '',
            expiry_date: expiryDate.toISOString(),
            invoice_raised: false,
          };

          // Insert quote
          const { data: quote, error: insertError } = await supabase
            .from('quotes')
            .insert(quoteData)
            .select()
            .single();

          if (insertError) throw new Error(insertError.message);

          // Send quote via edge function (auth handled automatically by Supabase client)
          console.log('[QuoteInvoiceVoice] Calling send-quote-resend for new quote:', quote.id);
          const { data: sendData, error: sendError } = await supabase.functions.invoke('send-quote-resend', {
            body: { quoteId: quote.id },
          });

          console.log('[QuoteInvoiceVoice] send-quote-resend response:', { sendData, sendError });

          if (sendError || sendData?.error) {
            const errMsg = sendError?.message || sendData?.error || 'Unknown error';
            console.error('[QuoteInvoiceVoice] Failed to send quote:', errMsg);
            triggerRefresh();
            return `Quote ${quoteNumber} created but failed to send: ${errMsg}`;
          }

          triggerRefresh();
          return `Quote ${quoteNumber} created and sent to ${params.clientName} at ${params.clientEmail}. Total: £${total.toFixed(2)}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] create_and_send_quote error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to create and send quote'}`;
        }
      },

      // Create and send invoice (from quote or fresh)
      create_and_send_invoice: async (params: {
        quoteNumber?: string;
        clientName?: string;
        clientEmail?: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        jobTitle?: string;
        jobDescription?: string;
        workCompletionDate?: string;
        itemDescription?: string;
        itemQuantity?: number;
        itemUnitPrice?: number;
        itemCategory?: string;
        vatRate?: number;
        vatRegistered?: boolean;
        breakdownMaterials?: boolean;
        paymentTerms?: string;
        paymentDays?: number;
        paymentMethod?: string;
        bankName?: string;
        bankAccountName?: string;
        bankAccountNumber?: string;
        bankSortCode?: string;
        invoiceNotes?: string;
        purchaseOrder?: string;
      }) => {
        console.log('[QuoteInvoiceVoice] create_and_send_invoice called:', params);
        try {
          const session = await getAuthSession();
          let invoiceId: string;
          let invoiceNumber: string;
          let clientName: string;

          // If quoteNumber provided, convert existing quote to invoice
          if (params.quoteNumber) {
            const quote = await findQuote({ quoteNumber: params.quoteNumber });

            if (quote.invoice_raised) {
              // Already an invoice, just send it
              invoiceId = quote.id;
              invoiceNumber = quote.invoice_number;
              clientName = typeof quote.client_data === 'object' ? quote.client_data?.name : 'the client';
            } else {
              // Convert to invoice
              invoiceNumber = generateInvoiceNumber();
              const invoiceDate = new Date();
              const dueDate = new Date();
              dueDate.setDate(dueDate.getDate() + (params.paymentDays || 30));

              const { error: updateError } = await supabase
                .from('quotes')
                .update({
                  invoice_raised: true,
                  invoice_number: invoiceNumber,
                  invoice_date: invoiceDate.toISOString(),
                  invoice_due_date: dueDate.toISOString(),
                  invoice_status: 'draft',
                  status: 'accepted',
                  invoice_notes: params.invoiceNotes || '',
                  settings: {
                    ...quote.settings,
                    paymentTerms: params.paymentTerms || `Due within ${params.paymentDays || 30} days`,
                    bankDetails: params.bankName ? {
                      bankName: params.bankName,
                      accountName: params.bankAccountName,
                      accountNumber: params.bankAccountNumber,
                      sortCode: params.bankSortCode,
                    } : quote.settings?.bankDetails,
                  },
                })
                .eq('id', quote.id);

              if (updateError) throw new Error(updateError.message);

              invoiceId = quote.id;
              clientName = typeof quote.client_data === 'object' ? quote.client_data?.name : 'the client';
            }
          } else {
            // Create fresh invoice
            if (!params.clientName || !params.clientEmail) {
              return 'Error: Client name and email are required to create an invoice';
            }
            if (!params.jobTitle || !params.itemDescription || !params.itemUnitPrice) {
              return 'Error: Job title, item description, and price are required';
            }

            const quoteNumber = generateQuoteNumber();
            invoiceNumber = generateInvoiceNumber();
            const vatRate = params.vatRate ?? 20;
            const quantity = params.itemQuantity || 1;
            const unitPrice = params.itemUnitPrice;
            const lineTotal = quantity * unitPrice;
            const subtotal = lineTotal;
            const vatAmount = subtotal * (vatRate / 100);
            const total = subtotal + vatAmount;

            const invoiceDate = new Date();
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + (params.paymentDays || 30));

            const invoiceData = {
              user_id: session.user.id,
              quote_number: quoteNumber,
              invoice_number: invoiceNumber,
              status: 'accepted',
              invoice_raised: true,
              invoice_status: 'draft',
              invoice_date: invoiceDate.toISOString(),
              invoice_due_date: dueDate.toISOString(),
              client_data: {
                name: params.clientName,
                email: params.clientEmail,
                phone: params.clientPhone || '',
                address: params.clientAddress || '',
                postcode: params.clientPostcode || '',
              },
              job_details: {
                title: params.jobTitle,
                description: params.jobDescription || '',
                workCompletionDate: params.workCompletionDate || '',
              },
              items: [{
                description: params.itemDescription,
                quantity: quantity,
                unitPrice: unitPrice,
                total: lineTotal,
                category: params.itemCategory || 'general',
              }],
              subtotal: subtotal,
              vat_amount: vatAmount,
              total: total,
              settings: {
                vatRate: vatRate,
                vatRegistered: params.vatRegistered ?? (vatRate > 0),
                paymentTerms: params.paymentTerms || `Due within ${params.paymentDays || 30} days`,
                bankDetails: params.bankName ? {
                  bankName: params.bankName,
                  accountName: params.bankAccountName,
                  accountNumber: params.bankAccountNumber,
                  sortCode: params.bankSortCode,
                } : undefined,
              },
              invoice_notes: params.invoiceNotes || '',
            };

            const { data: invoice, error: insertError } = await supabase
              .from('quotes')
              .insert(invoiceData)
              .select()
              .single();

            if (insertError) throw new Error(insertError.message);

            invoiceId = invoice.id;
            clientName = params.clientName;
          }

          // Send invoice via edge function (auth handled automatically by Supabase client)
          console.log('[QuoteInvoiceVoice] Calling send-invoice-resend for invoice:', invoiceId);
          const { data: sendData, error: sendError } = await supabase.functions.invoke('send-invoice-resend', {
            body: { invoiceId },
          });

          console.log('[QuoteInvoiceVoice] send-invoice-resend response:', { sendData, sendError });

          if (sendError || sendData?.error) {
            const errMsg = sendError?.message || sendData?.error || 'Unknown error';
            console.error('[QuoteInvoiceVoice] Failed to send invoice:', errMsg);
            triggerRefresh();
            return `Invoice ${invoiceNumber} created but failed to send: ${errMsg}`;
          }

          triggerRefresh();
          return `Invoice ${invoiceNumber} created and sent to ${clientName}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] create_and_send_invoice error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to create and send invoice'}`;
        }
      },

      // Get information about quotes
      get_quote_info: async (params: { client?: string; status?: string }) => {
        console.log('[QuoteInvoiceVoice] get_quote_info called:', params);
        try {
          const session = await getAuthSession();

          let query = supabase
            .from('quotes')
            .select('quote_number, status, total, client_data, created_at')
            .eq('user_id', session.user.id)
            .is('invoice_raised', false);

          if (params.client) {
            query = query.ilike('client_data->>name', `%${params.client}%`);
          }
          if (params.status) {
            query = query.eq('status', params.status);
          }

          const { data, error } = await query.order('created_at', { ascending: false }).limit(5);

          if (error) throw new Error(error.message);
          if (!data || data.length === 0) {
            return params.client
              ? `No quotes found for ${params.client}`
              : 'No quotes found';
          }

          const quoteList = data.map(q => {
            const clientName = typeof q.client_data === 'object' ? (q.client_data as any)?.name : 'Unknown';
            return `${q.quote_number}: ${clientName} - £${q.total?.toFixed(2) || '0.00'} (${q.status})`;
          }).join('; ');

          return `Found ${data.length} quote${data.length > 1 ? 's' : ''}: ${quoteList}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] get_quote_info error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to get quote info'}`;
        }
      },

      // Get information about invoices
      get_invoice_info: async (params: { client?: string; status?: string }) => {
        console.log('[QuoteInvoiceVoice] get_invoice_info called:', params);
        try {
          const session = await getAuthSession();

          let query = supabase
            .from('quotes')
            .select('invoice_number, invoice_status, total, client_data, invoice_date, invoice_due_date')
            .eq('user_id', session.user.id)
            .eq('invoice_raised', true);

          if (params.client) {
            query = query.ilike('client_data->>name', `%${params.client}%`);
          }
          if (params.status) {
            query = query.eq('invoice_status', params.status);
          }

          const { data, error } = await query.order('invoice_date', { ascending: false }).limit(5);

          if (error) throw new Error(error.message);
          if (!data || data.length === 0) {
            return params.client
              ? `No invoices found for ${params.client}`
              : 'No invoices found';
          }

          const invoiceList = data.map(inv => {
            const clientName = typeof inv.client_data === 'object' ? (inv.client_data as any)?.name : 'Unknown';
            return `${inv.invoice_number}: ${clientName} - £${inv.total?.toFixed(2) || '0.00'} (${inv.invoice_status || 'draft'})`;
          }).join('; ');

          return `Found ${data.length} invoice${data.length > 1 ? 's' : ''}: ${invoiceList}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] get_invoice_info error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to get invoice info'}`;
        }
      },

      // Get list of overdue invoices
      get_overdue_invoices: async () => {
        console.log('[QuoteInvoiceVoice] get_overdue_invoices called');
        try {
          const session = await getAuthSession();
          const today = new Date().toISOString();

          const { data, error } = await supabase
            .from('quotes')
            .select('invoice_number, invoice_status, total, client_data, invoice_due_date')
            .eq('user_id', session.user.id)
            .eq('invoice_raised', true)
            .neq('invoice_status', 'paid')
            .lt('invoice_due_date', today)
            .order('invoice_due_date', { ascending: true })
            .limit(10);

          if (error) throw new Error(error.message);
          if (!data || data.length === 0) {
            return 'No overdue invoices found';
          }

          const overdueList = data.map(inv => {
            const clientName = typeof inv.client_data === 'object' ? (inv.client_data as any)?.name : 'Unknown';
            const dueDate = inv.invoice_due_date ? new Date(inv.invoice_due_date).toLocaleDateString('en-GB') : 'unknown';
            return `${inv.invoice_number}: ${clientName} - £${inv.total?.toFixed(2) || '0.00'} (due ${dueDate})`;
          }).join('; ');

          return `${data.length} overdue invoice${data.length > 1 ? 's' : ''}: ${overdueList}`;
        } catch (err) {
          console.error('[QuoteInvoiceVoice] get_overdue_invoices error:', err);
          return `Error: ${err instanceof Error ? err.message : 'Failed to get overdue invoices'}`;
        }
      },
    },
  });

  const startVoice = useCallback(async () => {
    if (isConnecting || isActive) return;

    setIsConnecting(true);

    try {
      // Request microphone
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get conversation token
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId: QUOTE_INVOICE_AGENT_ID },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || 'Failed to get conversation token');
      }

      // Set connection timeout
      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[QuoteInvoiceVoice] Connection timeout');
        setIsConnecting(false);
        conversation.endSession();
        toast.error('Connection timed out');
      }, 15000);

      // Start session
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      // Send initial context
      setTimeout(() => {
        if (conversation.status === 'connected') {
          conversation.sendContextualUpdate(`User is on the ${currentSection} page. Help them create, send, or manage ${currentSection === 'quotes' ? 'quotes' : 'invoices'}.`);
        }
      }, 500);

    } catch (error) {
      console.error('[QuoteInvoiceVoice] Failed to start:', error);
      setIsConnecting(false);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.error('Failed to connect', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [conversation, isConnecting, isActive, currentSection]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
    setIsActive(false);
    setIsConnecting(false);
  }, [conversation]);

  const toggleVoice = useCallback(() => {
    if (isActive) {
      stopVoice();
    } else {
      startVoice();
    }
  }, [isActive, startVoice, stopVoice]);

  return {
    isConnecting,
    isActive,
    isConnected: conversation.status === 'connected',
    isSpeaking: conversation.isSpeaking,
    transcript,
    agentMessage,
    startVoice,
    stopVoice,
    toggleVoice,
  };
}
