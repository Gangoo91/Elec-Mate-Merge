import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

interface VoiceToolRequest {
  tool: string;
  params: Record<string, unknown>;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get authorization header for user context
    const authHeader = req.headers.get('Authorization');

    // Create Supabase client with user context (if auth provided) or service role
    const supabase = authHeader
      ? createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        )
      : createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

    // Get user from auth header if provided
    let userId: string | null = null;
    if (authHeader) {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        return new Response(
          JSON.stringify({ error: 'Authentication failed' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userId = user?.id ?? null;
    }

    const { tool, params }: VoiceToolRequest = await req.json();

    if (!tool) {
      return new Response(
        JSON.stringify({ error: 'Tool name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Voice tool called: ${tool}`, { params, userId });

    let result: string;

    switch (tool) {
      case 'get_quote_info': {
        const { client, status } = params as { client?: string; status?: string };
        let query = supabase
          .from('quotes')
          .select('id, quoteNumber, client_data, total, status, acceptance_status, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (status) {
          query = query.eq('status', status);
        }

        const { data: quotes, error } = await query;

        if (error) {
          console.error('Error fetching quotes:', error);
          result = 'Failed to fetch quotes';
        } else if (!quotes || quotes.length === 0) {
          result = 'No quotes found';
        } else {
          // Filter by client name if provided
          let filteredQuotes = quotes;
          if (client) {
            const clientLower = client.toLowerCase();
            filteredQuotes = quotes.filter(q => {
              const clientData = typeof q.client_data === 'string'
                ? JSON.parse(q.client_data)
                : q.client_data;
              return clientData?.name?.toLowerCase().includes(clientLower);
            });
          }

          if (filteredQuotes.length === 0) {
            result = client ? `No quotes found for ${client}` : 'No quotes found';
          } else {
            const summary = filteredQuotes.slice(0, 5).map(q => {
              const clientData = typeof q.client_data === 'string'
                ? JSON.parse(q.client_data)
                : q.client_data;
              return `Quote #${q.quoteNumber} for ${clientData?.name || 'Unknown'}: £${q.total?.toFixed(2) || 0} (${q.acceptance_status || q.status})`;
            }).join('. ');
            result = `Found ${filteredQuotes.length} quotes. ${summary}`;
          }
        }
        break;
      }

      case 'get_invoice_info': {
        const { client, status } = params as { client?: string; status?: string };
        let query = supabase
          .from('quotes')
          .select('id, invoice_number, client_data, total, invoice_status, invoice_date, invoice_due_date')
          .not('invoice_number', 'is', null)
          .order('invoice_date', { ascending: false })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (status) {
          query = query.eq('invoice_status', status);
        }

        const { data: invoices, error } = await query;

        if (error) {
          console.error('Error fetching invoices:', error);
          result = 'Failed to fetch invoices';
        } else if (!invoices || invoices.length === 0) {
          result = 'No invoices found';
        } else {
          // Filter by client name if provided
          let filteredInvoices = invoices;
          if (client) {
            const clientLower = client.toLowerCase();
            filteredInvoices = invoices.filter(i => {
              const clientData = typeof i.client_data === 'string'
                ? JSON.parse(i.client_data)
                : i.client_data;
              return clientData?.name?.toLowerCase().includes(clientLower);
            });
          }

          if (filteredInvoices.length === 0) {
            result = client ? `No invoices found for ${client}` : 'No invoices found';
          } else {
            const summary = filteredInvoices.slice(0, 5).map(i => {
              const clientData = typeof i.client_data === 'string'
                ? JSON.parse(i.client_data)
                : i.client_data;
              return `Invoice #${i.invoice_number} for ${clientData?.name || 'Unknown'}: £${i.total?.toFixed(2) || 0} (${i.invoice_status})`;
            }).join('. ');
            result = `Found ${filteredInvoices.length} invoices. ${summary}`;
          }
        }
        break;
      }

      case 'get_overdue_invoices': {
        const today = new Date().toISOString().split('T')[0];
        let query = supabase
          .from('quotes')
          .select('id, invoice_number, client_data, total, invoice_status, invoice_due_date')
          .not('invoice_number', 'is', null)
          .neq('invoice_status', 'paid')
          .lt('invoice_due_date', today)
          .order('invoice_due_date', { ascending: true });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data: overdueInvoices, error } = await query;

        if (error) {
          console.error('Error fetching overdue invoices:', error);
          result = 'Failed to fetch overdue invoices';
        } else if (!overdueInvoices || overdueInvoices.length === 0) {
          result = 'No overdue invoices. All payments are on track!';
        } else {
          const totalOverdue = overdueInvoices.reduce((sum, i) => sum + (i.total || 0), 0);
          const summary = overdueInvoices.slice(0, 3).map(i => {
            const clientData = typeof i.client_data === 'string'
              ? JSON.parse(i.client_data)
              : i.client_data;
            const daysOverdue = Math.floor(
              (new Date().getTime() - new Date(i.invoice_due_date).getTime()) / (1000 * 60 * 60 * 24)
            );
            return `Invoice #${i.invoice_number} for ${clientData?.name || 'Unknown'}: £${i.total?.toFixed(2) || 0} (${daysOverdue} days overdue)`;
          }).join('. ');
          result = `You have ${overdueInvoices.length} overdue invoices totalling £${totalOverdue.toFixed(2)}. ${summary}`;
        }
        break;
      }

      case 'lookup_price': {
        const { searchTerm } = params as { searchTerm: string };
        if (!searchTerm) {
          result = 'Please specify what item you want to look up';
          break;
        }

        // Search pricing_embeddings for material prices
        const { data: prices, error } = await supabase
          .from('pricing_embeddings')
          .select('title, price, unit, supplier')
          .ilike('title', `%${searchTerm}%`)
          .limit(5);

        if (error) {
          console.error('Error looking up price:', error);
          result = `Could not find pricing for ${searchTerm}`;
        } else if (!prices || prices.length === 0) {
          result = `No pricing found for ${searchTerm}. Try a different search term.`;
        } else {
          const priceList = prices.map(p =>
            `${p.title}: £${p.price?.toFixed(2) || 'N/A'} per ${p.unit || 'unit'}${p.supplier ? ` (${p.supplier})` : ''}`
          ).join('. ');
          result = `Found ${prices.length} results for ${searchTerm}. ${priceList}`;
        }
        break;
      }

      case 'get_dashboard_summary': {
        // Get a quick summary of quotes and invoices
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        let quotesQuery = supabase
          .from('quotes')
          .select('id, total, status, acceptance_status, invoice_status, invoice_number', { count: 'exact' });

        if (userId) {
          quotesQuery = quotesQuery.eq('user_id', userId);
        }

        const { data: allData, count } = await quotesQuery;

        if (!allData) {
          result = 'Unable to fetch dashboard data';
          break;
        }

        const quotes = allData.filter(d => !d.invoice_number);
        const invoices = allData.filter(d => d.invoice_number);

        const pendingQuotes = quotes.filter(q => q.status === 'sent' && !q.acceptance_status).length;
        const acceptedQuotes = quotes.filter(q => q.acceptance_status === 'accepted').length;
        const paidInvoices = invoices.filter(i => i.invoice_status === 'paid').length;
        const unpaidInvoices = invoices.filter(i => i.invoice_status !== 'paid').length;

        const totalRevenue = invoices
          .filter(i => i.invoice_status === 'paid')
          .reduce((sum, i) => sum + (i.total || 0), 0);

        result = `Dashboard summary: ${quotes.length} quotes (${pendingQuotes} pending response, ${acceptedQuotes} accepted). ${invoices.length} invoices (${paidInvoices} paid, ${unpaidInvoices} awaiting payment). Total revenue: £${totalRevenue.toFixed(2)}.`;
        break;
      }

      case 'get_cert_info': {
        const { certNumber, status } = params as { certNumber?: string; status?: string };

        // Query EICR certificates
        let eicrQuery = supabase
          .from('eicr_certificates')
          .select('id, certificate_number, client_name, installation_address, status, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          eicrQuery = eicrQuery.eq('user_id', userId);
        }
        if (certNumber) {
          eicrQuery = eicrQuery.ilike('certificate_number', `%${certNumber}%`);
        }
        if (status) {
          eicrQuery = eicrQuery.eq('status', status);
        }

        const { data: eicrCerts, error: eicrError } = await eicrQuery;

        // Query EIC certificates
        let eicQuery = supabase
          .from('eic_certificates')
          .select('id, certificate_number, client_name, installation_address, status, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          eicQuery = eicQuery.eq('user_id', userId);
        }
        if (certNumber) {
          eicQuery = eicQuery.ilike('certificate_number', `%${certNumber}%`);
        }
        if (status) {
          eicQuery = eicQuery.eq('status', status);
        }

        const { data: eicCerts, error: eicError } = await eicQuery;

        if (eicrError && eicError) {
          result = 'Failed to fetch certificates';
        } else {
          const allCerts = [...(eicrCerts || []).map(c => ({ ...c, type: 'EICR' })), ...(eicCerts || []).map(c => ({ ...c, type: 'EIC' }))];

          if (allCerts.length === 0) {
            result = certNumber ? `No certificates found matching "${certNumber}"` : 'No certificates found';
          } else {
            const summary = allCerts.slice(0, 5).map(c =>
              `${c.type} ${c.certificate_number || 'Draft'} for ${c.client_name || 'Unknown'} (${c.status})`
            ).join('. ');
            result = `Found ${allCerts.length} certificates. ${summary}`;
          }
        }
        break;
      }

      case 'get_recent_certificates': {
        const { days = 30 } = params as { days?: number };
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        // Query recent EICR certificates
        let eicrQuery = supabase
          .from('eicr_certificates')
          .select('id, certificate_number, client_name, status, created_at')
          .gte('created_at', cutoffDate.toISOString())
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          eicrQuery = eicrQuery.eq('user_id', userId);
        }

        const { data: eicrCerts } = await eicrQuery;

        // Query recent EIC certificates
        let eicQuery = supabase
          .from('eic_certificates')
          .select('id, certificate_number, client_name, status, created_at')
          .gte('created_at', cutoffDate.toISOString())
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          eicQuery = eicQuery.eq('user_id', userId);
        }

        const { data: eicCerts } = await eicQuery;

        const eicrCount = eicrCerts?.length || 0;
        const eicCount = eicCerts?.length || 0;
        const totalCount = eicrCount + eicCount;

        if (totalCount === 0) {
          result = `No certificates created in the last ${days} days`;
        } else {
          const completedEicr = eicrCerts?.filter(c => c.status === 'completed').length || 0;
          const completedEic = eicCerts?.filter(c => c.status === 'completed').length || 0;
          result = `${totalCount} certificates in the last ${days} days: ${eicrCount} EICRs (${completedEicr} completed), ${eicCount} EICs (${completedEic} completed)`;
        }
        break;
      }

      // ============================================
      // QUOTE/INVOICE SEND TOOLS
      // ============================================

      case 'send_quote': {
        const { quoteId, clientName, quoteNumber } = params as {
          quoteId?: string;
          clientName?: string;
          quoteNumber?: string;
        };

        if (!quoteId && !clientName && !quoteNumber) {
          result = 'Please specify a quote to send by client name, quote number, or ID';
          break;
        }

        // Find the quote
        let query = supabase.from('quotes').select('*');
        if (userId) query = query.eq('user_id', userId);

        if (quoteId) {
          query = query.eq('id', quoteId);
        } else if (quoteNumber) {
          query = query.ilike('quote_number', `%${quoteNumber}%`);
        } else if (clientName) {
          // Search in client_data JSON
          const { data: allQuotes } = await query.order('created_at', { ascending: false }).limit(20);
          const matchingQuote = allQuotes?.find(q => {
            const cd = typeof q.client_data === 'string' ? JSON.parse(q.client_data) : q.client_data;
            return cd?.name?.toLowerCase().includes(clientName.toLowerCase());
          });
          if (!matchingQuote) {
            result = `No quote found for client "${clientName}"`;
            break;
          }
          // Send this quote via Resend
          const { error } = await supabase.functions.invoke('send-quote-resend', {
            body: { quoteId: matchingQuote.id },
            headers: authHeader ? { Authorization: authHeader } : undefined,
          });
          const cd = typeof matchingQuote.client_data === 'string' ? JSON.parse(matchingQuote.client_data) : matchingQuote.client_data;
          result = error
            ? `Failed to send quote: ${error.message}`
            : `Quote ${matchingQuote.quote_number} for £${matchingQuote.total?.toFixed(2)} sent to ${cd?.email}`;
          break;
        }

        const { data: quote, error: fetchError } = await query.limit(1).single();
        if (fetchError || !quote) {
          result = 'Quote not found';
          break;
        }

        // Send the quote via Resend
        const { error: sendError } = await supabase.functions.invoke('send-quote-resend', {
          body: { quoteId: quote.id },
          headers: authHeader ? { Authorization: authHeader } : undefined,
        });

        const clientData = typeof quote.client_data === 'string' ? JSON.parse(quote.client_data) : quote.client_data;
        result = sendError
          ? `Failed to send quote: ${sendError.message}`
          : `Quote ${quote.quote_number} for £${quote.total?.toFixed(2)} sent to ${clientData?.email}`;
        break;
      }

      case 'send_invoice': {
        const { invoiceId, clientName, invoiceNumber } = params as {
          invoiceId?: string;
          clientName?: string;
          invoiceNumber?: string;
        };

        if (!invoiceId && !clientName && !invoiceNumber) {
          result = 'Please specify an invoice to send by client name, invoice number, or ID';
          break;
        }

        // Find the invoice (quotes table with invoice_number set)
        let invoiceQuery = supabase.from('quotes')
          .select('*')
          .not('invoice_number', 'is', null);

        if (userId) invoiceQuery = invoiceQuery.eq('user_id', userId);

        if (invoiceId) {
          invoiceQuery = invoiceQuery.eq('id', invoiceId);
        } else if (invoiceNumber) {
          invoiceQuery = invoiceQuery.ilike('invoice_number', `%${invoiceNumber}%`);
        } else if (clientName) {
          const { data: allInvoices } = await invoiceQuery.order('invoice_date', { ascending: false }).limit(20);
          const matchingInvoice = allInvoices?.find(i => {
            const cd = typeof i.client_data === 'string' ? JSON.parse(i.client_data) : i.client_data;
            return cd?.name?.toLowerCase().includes(clientName.toLowerCase());
          });
          if (!matchingInvoice) {
            result = `No invoice found for client "${clientName}"`;
            break;
          }
          // Send this invoice via Resend
          const { error } = await supabase.functions.invoke('send-invoice-resend', {
            body: { invoiceId: matchingInvoice.id },
            headers: authHeader ? { Authorization: authHeader } : undefined,
          });
          const cd = typeof matchingInvoice.client_data === 'string' ? JSON.parse(matchingInvoice.client_data) : matchingInvoice.client_data;
          result = error
            ? `Failed to send invoice: ${error.message}`
            : `Invoice ${matchingInvoice.invoice_number} for £${matchingInvoice.total?.toFixed(2)} sent to ${cd?.email}`;
          break;
        }

        const { data: invoice, error: invFetchError } = await invoiceQuery.limit(1).single();
        if (invFetchError || !invoice) {
          result = 'Invoice not found';
          break;
        }

        const { error: invSendError } = await supabase.functions.invoke('send-invoice-resend', {
          body: { invoiceId: invoice.id },
          headers: authHeader ? { Authorization: authHeader } : undefined,
        });

        const invClientData = typeof invoice.client_data === 'string' ? JSON.parse(invoice.client_data) : invoice.client_data;
        result = invSendError
          ? `Failed to send invoice: ${invSendError.message}`
          : `Invoice ${invoice.invoice_number} for £${invoice.total?.toFixed(2)} sent to ${invClientData?.email}`;
        break;
      }

      case 'create_and_send_quote': {
        // Full parameters matching ElevenLabs tool definition
        const {
          // Client details
          clientName,
          clientEmail,
          clientPhone,
          clientAddress,
          clientPostcode,
          // Job details
          jobTitle,
          jobDescription,
          jobLocation,
          estimatedDuration,
          workStartDate,
          specialRequirements,
          // Line item
          itemDescription,
          itemQuantity = 1,
          itemUnitPrice,
          itemCategory = 'labour',
          // Settings
          labourRate,
          overheadPercentage = 10,
          profitMargin = 15,
          vatRate = 20,
          vatRegistered = true,
          breakdownMaterials = false,
          // Extras
          notes,
          expiryDays = 30,
          // Send control - default FALSE for draft behavior
          sendNow = false
        } = params as {
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
          itemQuantity?: number;
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
          sendNow?: boolean;
        };

        if (!userId) {
          result = 'Authentication required to create quotes';
          break;
        }

        if (!clientName || !clientEmail) {
          result = 'Need client name and email to create a quote';
          break;
        }

        if (!itemDescription || !itemUnitPrice) {
          result = 'Need item description and price to create a quote';
          break;
        }

        // Generate quote number
        const newQuoteNumber = `Q-${Date.now().toString(36).toUpperCase()}`;

        // Calculate totals
        const subtotal = itemQuantity * itemUnitPrice;
        const overhead = subtotal * (overheadPercentage / 100);
        const profit = (subtotal + overhead) * (profitMargin / 100);
        const netTotal = subtotal + overhead + profit;
        const vatAmount = vatRegistered ? netTotal * (vatRate / 100) : 0;
        const total = netTotal + vatAmount;

        // Format items for storage
        const formattedItems = [{
          id: 'item-1',
          description: itemDescription,
          quantity: itemQuantity,
          unit: 'each',
          unitPrice: itemUnitPrice,
          total: subtotal,
          type: 'line',
          category: itemCategory
        }];

        // Create the quote
        const { data: newQuote, error: insertError } = await supabase
          .from('quotes')
          .insert({
            user_id: userId,
            quote_number: newQuoteNumber,
            client_data: {
              name: clientName,
              email: clientEmail,
              phone: clientPhone || '',
              address: clientAddress || '',
              postcode: clientPostcode || ''
            },
            job_details: {
              title: jobTitle || 'Electrical Work',
              description: jobDescription || '',
              location: jobLocation || '',
              estimatedDuration: estimatedDuration || '',
              workStartDate: workStartDate || '',
              specialRequirements: specialRequirements || ''
            },
            items: formattedItems,
            settings: {
              showVat: vatRegistered,
              vatPercent: vatRate,
              overheadPercent: overheadPercentage,
              profitPercent: profitMargin,
              labourRate: labourRate || 45,
              vatRegistered,
              showMaterialsBreakdown: breakdownMaterials
            },
            notes: notes || '',
            subtotal,
            overhead,
            profit,
            vat_amount: vatAmount,
            total,
            status: sendNow ? 'pending' : 'draft',
            acceptance_status: sendNow ? 'pending' : null,
            expiry_date: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString()
          })
          .select()
          .single();

        if (insertError || !newQuote) {
          result = `Failed to create quote: ${insertError?.message || 'Unknown error'}`;
          break;
        }

        // Only send if sendNow is true
        if (sendNow) {
          const { error: newSendError } = await supabase.functions.invoke('send-quote-resend', {
            body: { quoteId: newQuote.id },
            headers: authHeader ? { Authorization: authHeader } : undefined,
          });

          result = newSendError
            ? `Quote ${newQuoteNumber} created for £${total.toFixed(2)} but failed to send: ${newSendError.message}`
            : `Quote ${newQuoteNumber} for £${total.toFixed(2)} created and sent to ${clientEmail}`;
        } else {
          // Saved as draft - no email sent
          result = `Quote ${newQuoteNumber} for £${total.toFixed(2)} saved as draft. You can review and send it from the Quotes section.`;
        }
        break;
      }

      case 'create_and_send_invoice': {
        // Full parameters matching ElevenLabs tool definition
        const {
          // Quote conversion
          quoteNumber: invoiceQuoteNumber,
          // Client details
          clientName: invoiceClientName,
          clientEmail: invoiceClientEmail,
          clientPhone: invoiceClientPhone,
          clientAddress: invoiceClientAddress,
          clientPostcode: invoiceClientPostcode,
          // Job details
          jobTitle: invoiceJobTitle,
          jobDescription: invoiceJobDescription,
          workCompletionDate,
          // Line item
          itemDescription: invoiceItemDescription,
          itemQuantity: invoiceItemQuantity = 1,
          itemUnitPrice: invoiceItemUnitPrice,
          itemCategory: invoiceItemCategory = 'labour',
          // Financial settings
          vatRate: invoiceVatRate = 20,
          vatRegistered: invoiceVatRegistered = true,
          breakdownMaterials: invoiceBreakdownMaterials = false,
          // Invoice-specific
          paymentTerms,
          paymentDays = 14,
          paymentMethod,
          // Bank details
          bankName,
          bankAccountName,
          bankAccountNumber,
          bankSortCode,
          // Extras
          invoiceNotes,
          purchaseOrder,
          // Send control - default FALSE for draft behavior
          sendNow: invoiceSendNow = false
        } = params as {
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
          sendNow?: boolean;
        };

        if (!userId) {
          result = 'Authentication required to create invoices';
          break;
        }

        // MODE 1: Convert from quote (if quoteNumber provided or searching by client name for accepted quote)
        if (invoiceQuoteNumber || (!invoiceClientEmail && invoiceClientName)) {
          let acceptedQuery = supabase.from('quotes')
            .select('*')
            .eq('user_id', userId)
            .eq('acceptance_status', 'accepted')
            .is('invoice_number', null);

          if (invoiceQuoteNumber) {
            acceptedQuery = acceptedQuery.ilike('quote_number', `%${invoiceQuoteNumber}%`);
          } else if (invoiceClientName) {
            const { data: allAccepted } = await acceptedQuery.order('created_at', { ascending: false }).limit(20);
            const matchingAccepted = allAccepted?.find(q => {
              const cd = typeof q.client_data === 'string' ? JSON.parse(q.client_data) : q.client_data;
              return cd?.name?.toLowerCase().includes(invoiceClientName.toLowerCase());
            });
            if (!matchingAccepted) {
              result = invoiceClientName
                ? `No accepted quote found for "${invoiceClientName}" that hasn't been invoiced. Would you like to create a fresh invoice instead?`
                : 'No accepted quotes found to invoice';
              break;
            }
            acceptedQuery = supabase.from('quotes').select('*').eq('id', matchingAccepted.id);
          }

          const { data: acceptedQuote, error: acceptedFetchError } = await acceptedQuery.limit(1).single();
          if (acceptedFetchError || !acceptedQuote) {
            result = 'No accepted quote found to invoice';
            break;
          }

          // Generate invoice number and update with bank details
          const newInvoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
          const existingSettings = typeof acceptedQuote.settings === 'string'
            ? JSON.parse(acceptedQuote.settings)
            : acceptedQuote.settings || {};

          const updatedSettings = {
            ...existingSettings,
            paymentTerms: paymentTerms || `Payment due within ${paymentDays} days`,
            paymentMethod: paymentMethod || 'bank transfer',
            ...(bankName && bankAccountNumber && bankSortCode ? {
              bankDetails: {
                bankName,
                accountName: bankAccountName || invoiceClientName,
                accountNumber: bankAccountNumber,
                sortCode: bankSortCode
              }
            } : {})
          };

          const { error: updateError } = await supabase
            .from('quotes')
            .update({
              invoice_number: newInvoiceNumber,
              invoice_date: new Date().toISOString(),
              invoice_due_date: new Date(Date.now() + paymentDays * 24 * 60 * 60 * 1000).toISOString(),
              invoice_status: invoiceSendNow ? 'sent' : 'draft',
              invoice_raised: true,
              settings: updatedSettings,
              notes: invoiceNotes || acceptedQuote.notes,
              purchase_order: purchaseOrder
            })
            .eq('id', acceptedQuote.id);

          if (updateError) {
            result = `Failed to create invoice: ${updateError.message}`;
            break;
          }

          const quoteClientData = typeof acceptedQuote.client_data === 'string' ? JSON.parse(acceptedQuote.client_data) : acceptedQuote.client_data;

          // Only send if sendNow is true
          if (invoiceSendNow) {
            const { error: invoiceSendError } = await supabase.functions.invoke('send-invoice-resend', {
              body: { invoiceId: acceptedQuote.id },
              headers: authHeader ? { Authorization: authHeader } : undefined,
            });

            result = invoiceSendError
              ? `Invoice ${newInvoiceNumber} created but failed to send: ${invoiceSendError.message}`
              : `Invoice ${newInvoiceNumber} for £${acceptedQuote.total?.toFixed(2)} sent to ${quoteClientData?.email}`;
          } else {
            result = `Invoice ${newInvoiceNumber} for £${acceptedQuote.total?.toFixed(2)} saved as draft. You can review and send it from the Invoices section.`;
          }
          break;
        }

        // MODE 2: Create fresh invoice (if clientEmail is provided)
        if (!invoiceClientName || !invoiceClientEmail) {
          result = 'Need client name and email to create a fresh invoice';
          break;
        }

        if (!invoiceItemDescription || !invoiceItemUnitPrice) {
          result = 'Need item description and price to create an invoice';
          break;
        }

        // Generate invoice number
        const freshInvoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;

        // Calculate totals
        const invSubtotal = invoiceItemQuantity * invoiceItemUnitPrice;
        const invVatAmount = invoiceVatRegistered ? invSubtotal * (invoiceVatRate / 100) : 0;
        const invTotal = invSubtotal + invVatAmount;

        // Format items
        const invoiceItems = [{
          id: 'item-1',
          description: invoiceItemDescription,
          quantity: invoiceItemQuantity,
          unit: 'each',
          unitPrice: invoiceItemUnitPrice,
          total: invSubtotal,
          type: 'line',
          category: invoiceItemCategory
        }];

        // Build settings with bank details
        const invoiceSettings: Record<string, unknown> = {
          showVat: invoiceVatRegistered,
          vatPercent: invoiceVatRate,
          vatRegistered: invoiceVatRegistered,
          showMaterialsBreakdown: invoiceBreakdownMaterials,
          paymentTerms: paymentTerms || `Payment due within ${paymentDays} days`,
          paymentMethod: paymentMethod || 'bank transfer'
        };

        // Add bank details if provided
        if (bankName && bankAccountNumber && bankSortCode) {
          invoiceSettings.bankDetails = {
            bankName,
            accountName: bankAccountName || invoiceClientName,
            accountNumber: bankAccountNumber,
            sortCode: bankSortCode
          };
        }

        // Create the fresh invoice
        const { data: newInvoice, error: invoiceInsertError } = await supabase
          .from('quotes')
          .insert({
            user_id: userId,
            quote_number: `Q-${Date.now().toString(36).toUpperCase()}`, // Quotes table requires quote_number
            invoice_number: freshInvoiceNumber,
            client_data: {
              name: invoiceClientName,
              email: invoiceClientEmail,
              phone: invoiceClientPhone || '',
              address: invoiceClientAddress || '',
              postcode: invoiceClientPostcode || ''
            },
            job_details: {
              title: invoiceJobTitle || 'Electrical Work',
              description: invoiceJobDescription || '',
              completionDate: workCompletionDate || ''
            },
            items: invoiceItems,
            settings: invoiceSettings,
            notes: invoiceNotes || '',
            purchase_order: purchaseOrder,
            subtotal: invSubtotal,
            vat_amount: invVatAmount,
            total: invTotal,
            status: 'approved', // Already approved since it's an invoice
            acceptance_status: 'accepted',
            invoice_date: new Date().toISOString(),
            invoice_due_date: new Date(Date.now() + paymentDays * 24 * 60 * 60 * 1000).toISOString(),
            invoice_status: invoiceSendNow ? 'sent' : 'draft',
            invoice_raised: true
          })
          .select()
          .single();

        if (invoiceInsertError || !newInvoice) {
          result = `Failed to create invoice: ${invoiceInsertError?.message || 'Unknown error'}`;
          break;
        }

        // Only send if sendNow is true
        if (invoiceSendNow) {
          const { error: freshInvSendError } = await supabase.functions.invoke('send-invoice-resend', {
            body: { invoiceId: newInvoice.id },
            headers: authHeader ? { Authorization: authHeader } : undefined,
          });

          result = freshInvSendError
            ? `Invoice ${freshInvoiceNumber} created for £${invTotal.toFixed(2)} but failed to send: ${freshInvSendError.message}`
            : `Invoice ${freshInvoiceNumber} for £${invTotal.toFixed(2)} created and sent to ${invoiceClientEmail}. Payment due in ${paymentDays} days.`;
        } else {
          result = `Invoice ${freshInvoiceNumber} for £${invTotal.toFixed(2)} saved as draft. You can review and send it from the Invoices section.`;
        }
        break;
      }

      default:
        result = `Unknown tool: ${tool}. Available tools are: get_quote_info, get_invoice_info, get_overdue_invoices, lookup_price, get_dashboard_summary, get_cert_info, get_recent_certificates, send_quote, send_invoice, create_and_send_quote, create_and_send_invoice`;
    }

    return new Response(
      JSON.stringify({ result, message: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Voice tools error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, result: `Error: ${errorMessage}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
