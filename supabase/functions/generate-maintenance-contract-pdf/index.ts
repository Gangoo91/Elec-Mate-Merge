import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

/**
 * Maintenance Agreement PDF (ELE-430).
 *
 * Renders the signable contract document for a maintenance contract — parties,
 * service, schedule/price strip, plain-English terms, signature lines — via the
 * PDFMonkey "Maintenance Agreement" template. Hand-over document (same class as
 * RAMS/handouts): the URL is returned for immediate share/download and never
 * stored; PDFMonkey links expire in ~1h and that is fine.
 *
 * Auth: the caller's JWT is forwarded to a user-scoped client, so RLS decides
 * whether they can see the contract. No service role.
 *
 * 🔴 Page margins are a TEMPLATE SETTING, not CSS — set on the template
 * resource (12/12/16/12mm, footer carries the page count).
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '84782316-78d5-4f86-899a-00f04aeece3d';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  six_monthly: 'Every 6 months',
  annually: 'Annually',
  two_yearly: 'Every 2 years',
  three_yearly: 'Every 3 years',
  five_yearly: 'Every 5 years',
  custom: 'Custom schedule',
};

const longDate = (iso: string | null): string =>
  iso
    ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

interface PdfMonkeyDoc {
  id: string;
  status: string;
  download_url?: string;
  errors?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    if (!PDFMONKEY_API_KEY) throw new Error('PDFMONKEY_API_KEY not configured');

    const { contract_id } = await req.json();
    if (!contract_id) return json({ error: 'contract_id is required' }, 400);

    // User-scoped client — RLS is the authorisation check.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    );

    const { data: contract, error: contractError } = await supabase
      .from('maintenance_contracts')
      .select('*')
      .eq('id', contract_id)
      .maybeSingle();
    if (contractError) throw contractError;
    if (!contract) return json({ error: 'Contract not found' }, 404);

    const [{ data: customer }, { data: company }] = await Promise.all([
      contract.customer_id
        ? supabase
            .from('customers')
            .select('name, email, phone, address')
            .eq('id', contract.customer_id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      supabase
        .from('company_profiles')
        .select(
          'company_name, company_email, company_phone, company_address, logo_url, logo_data_url, primary_color, vat_number, company_registration'
        )
        .eq('user_id', contract.user_id)
        .maybeSingle(),
    ]);

    if (!company?.company_name) {
      // Render proceeds — an unbranded agreement is valid, just not intended.
      console.warn('[generate-maintenance-contract-pdf] no company profile — rendering unbranded');
    }

    const ref = `MC-${String(contract.id).slice(0, 8).toUpperCase()}`;
    const payload = {
      accent_color: (company?.primary_color as string) || '#0f172a',
      generated_date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      company: {
        name: (company?.company_name as string) || 'Your Electrician',
        logo_url: (company?.logo_url as string) || (company?.logo_data_url as string) || '',
        address: (company?.company_address as string) || '',
        phone: (company?.company_phone as string) || '',
        email: (company?.company_email as string) || '',
        vat_number: (company?.vat_number as string) || '',
        registration_number: (company?.company_registration as string) || '',
      },
      client: {
        name: (customer?.name as string) || (contract.customer_name as string),
        address: (customer?.address as string) || '',
        email: (customer?.email as string) || '',
        phone: (customer?.phone as string) || '',
      },
      contract: {
        ref,
        client_type: (contract.client_type as string) || 'domestic',
        job_type: contract.job_type as string,
        description: (contract.description as string) || '',
        frequency_label:
          contract.frequency === 'custom' && contract.frequency_custom_days
            ? `Every ${contract.frequency_custom_days} days`
            : FREQUENCY_LABELS[contract.frequency as string] || (contract.frequency as string),
        start_date: longDate(contract.start_date as string),
        end_date: longDate(contract.end_date as string | null),
        price:
          contract.default_invoice_amount != null
            ? Number(contract.default_invoice_amount).toFixed(2)
            : '',
        signed_name: (contract.client_signed_name as string) || '',
        signed_date: contract.client_signed_at
          ? new Date(contract.client_signed_at as string).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : '',
        signature: (contract.client_signature as string) || '',
      },
    };

    const createRes = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          payload: JSON.stringify(payload),
          status: 'pending',
        },
      }),
    });
    if (!createRes.ok) {
      throw new Error(`PDFMonkey create failed: ${createRes.status} ${await createRes.text()}`);
    }
    const created = (await createRes.json()).document as PdfMonkeyDoc;

    let doc = created;
    for (let attempt = 0; attempt < 30 && doc.status !== 'success'; attempt++) {
      if (doc.status === 'failure') {
        throw new Error(`PDF generation failed: ${doc.errors?.join(', ') || 'unknown'}`);
      }
      await new Promise((r) => setTimeout(r, 1000));
      const res = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${doc.id}`, {
        headers: { Authorization: `Bearer ${PDFMONKEY_API_KEY}` },
      });
      if (!res.ok) throw new Error(`PDFMonkey poll failed: ${res.status}`);
      doc = (await res.json()).document as PdfMonkeyDoc;
    }
    if (doc.status !== 'success' || !doc.download_url) {
      throw new Error('PDF generation timed out');
    }

    const safeClient = String(payload.client.name)
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join('-');
    return json({
      url: doc.download_url,
      filename: `Maintenance-Agreement-${safeClient || ref}.pdf`,
    });
  } catch (error) {
    console.error('generate-maintenance-contract-pdf error:', error);
    await captureException(error, {
      functionName: 'generate-maintenance-contract-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'Internal error' }, 500);
  }
});
