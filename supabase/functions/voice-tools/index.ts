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

      default:
        result = `Unknown tool: ${tool}. Available tools are: get_quote_info, get_invoice_info, get_overdue_invoices, lookup_price, get_dashboard_summary, get_cert_info, get_recent_certificates`;
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
