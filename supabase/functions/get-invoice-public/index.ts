/**
 * Get Invoice Public
 * Returns invoice details without authentication for success page display
 * Uses service role key to bypass RLS - only returns safe public data
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

interface PublicInvoiceData {
  invoice_number: string;
  invoice_total: number;
  invoice_status: string;
  invoice_paid_at: string | null;
  company_name: string | null;
  company_email: string | null;
  company_phone: string | null;
  client_name: string | null;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { invoice_id, session_id } = await req.json();

    if (!invoice_id && !session_id) {
      throw new ValidationError('invoice_id or session_id is required');
    }

    // Use service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let invoiceQuery = supabase
      .from('quotes')
      .select(`
        id,
        invoice_number,
        invoice_total,
        invoice_status,
        invoice_paid_at,
        client_data,
        user_id
      `);

    // Query by either invoice_id or try to find by stripe session metadata
    if (invoice_id) {
      invoiceQuery = invoiceQuery.eq('id', invoice_id);
    }

    const { data: invoice, error: invoiceError } = await invoiceQuery.single();

    if (invoiceError || !invoice) {
      console.log('Invoice lookup failed:', invoiceError?.message || 'Not found');
      throw new ValidationError('Invoice not found');
    }

    // Parse client data
    const clientData = typeof invoice.client_data === 'string'
      ? JSON.parse(invoice.client_data)
      : invoice.client_data;

    // Fetch company profile for contact details
    let companyName: string | null = null;
    let companyEmail: string | null = null;
    let companyPhone: string | null = null;

    if (invoice.user_id) {
      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, company_phone')
        .eq('user_id', invoice.user_id)
        .single();

      if (companyProfile) {
        companyName = companyProfile.company_name;
        companyEmail = companyProfile.company_email;
        companyPhone = companyProfile.company_phone;
      }
    }

    // Build response with only safe public data
    const publicData: PublicInvoiceData = {
      invoice_number: invoice.invoice_number || `INV-${invoice.id.substring(0, 8).toUpperCase()}`,
      invoice_total: invoice.invoice_total || 0,
      invoice_status: invoice.invoice_status || 'unknown',
      invoice_paid_at: invoice.invoice_paid_at,
      company_name: companyName,
      company_email: companyEmail,
      company_phone: companyPhone,
      client_name: clientData?.name || null,
    };

    console.log(`Public invoice data requested for: ${publicData.invoice_number}`);

    return new Response(
      JSON.stringify({ data: publicData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
