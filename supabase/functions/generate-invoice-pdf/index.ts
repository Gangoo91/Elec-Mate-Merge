/**
 * generate-invoice-pdf — printable HTML for an EMPLOYER invoice.
 *
 * Old version was an unauthenticated service-role endpoint reading the
 * electrician `invoices` table with global app branding — any UUID could
 * pull any invoice. Now: caller-authenticated, employer_invoices under the
 * caller's RLS, branded from THEIR company profile.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LineItem {
  description: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  total: number;
  type?: string;
}

const money = (v: number) => `£${Number(v || 0).toFixed(2)}`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { invoiceId } = await req.json();
    if (!invoiceId) throw new Error('Invoice ID is required');

    // Caller's RLS enforces ownership
    const { data: invoice, error } = await supabase
      .from('employer_invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();
    if (error || !invoice) throw new Error('Invoice not found');

    const { data: company } = await supabase
      .from('company_profiles')
      .select('company_name, company_email, company_phone, company_website, logo_url, bank_details')
      .eq('user_id', user.id)
      .maybeSingle();

    const companyName = company?.company_name || 'Your Company';
    const bank = (company?.bank_details || {}) as {
      accountName?: string;
      sortCode?: string;
      accountNumber?: string;
    };

    const lineItems: LineItem[] = Array.isArray(invoice.line_items) ? invoice.line_items : [];
    const subtotal = lineItems.reduce((s, i) => s + (i.total || 0), 0);
    const vatAmount = subtotal * 0.2;
    const createdDate = new Date(invoice.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const dueDate = invoice.due_date
      ? new Date(invoice.due_date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'On Receipt';
    const isPaid = invoice.status === 'Paid';

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoice ${invoice.invoice_number}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;color:#0f172a;line-height:1.6}.page{max-width:800px;margin:0 auto;padding:48px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;border-top:6px solid #f59e0b;padding-top:24px}.company h1{font-size:24px;font-weight:700}.company p{font-size:13px;color:#64748b}.badge{text-align:right}.badge h2{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#64748b}.badge .num{font-size:26px;font-weight:700;color:#f59e0b}.paid{display:inline-block;background:#22c55e;color:#fff;padding:6px 20px;font-weight:700;border-radius:8px;margin-top:10px;text-transform:uppercase}.meta{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;padding:20px;background:#f8fafc;border-radius:12px}.meta label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8}.meta .v{font-size:16px;font-weight:600}table{width:100%;border-collapse:collapse;margin-bottom:24px}th{text-align:left;font-size:11px;text-transform:uppercase;color:#64748b;padding:10px 0;border-bottom:1px solid #e2e8f0}th:last-child,td:last-child{text-align:right}td{padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px}.totals{background:#0f172a;border-radius:12px;padding:20px 24px;color:#fff}.trow{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;color:#cbd5e1}.grand{font-size:22px;font-weight:700;color:#f59e0b;border-top:2px solid #f59e0b;padding-top:14px;margin-top:8px}.grand span:first-child{color:#fff}.bank{margin-top:28px;padding:20px;background:#fef9ec;border-radius:12px;border-left:4px solid #f59e0b}.bank h4{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}.bank .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;font-size:14px}.bank label{display:block;font-size:11px;color:#64748b}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#94a3b8}.actions{position:fixed;bottom:24px;right:24px;display:flex;gap:10px}.actions button{padding:12px 24px;font-size:14px;font-weight:600;border-radius:10px;border:none;cursor:pointer}.print{background:#f59e0b;color:#0f172a}.close{background:#0f172a;color:#fff}@media print{.actions{display:none!important}.page{padding:24px}}</style></head>
<body><div class="page">
<div class="header"><div class="company">${company?.logo_url ? `<img src="${company.logo_url}" style="height:48px;margin-bottom:8px" />` : ''}<h1>${companyName}</h1><p>${[company?.company_phone, company?.company_email].filter(Boolean).join(' · ')}</p></div>
<div class="badge"><h2>Invoice</h2><div class="num">${invoice.invoice_number}</div>${isPaid ? '<div class="paid">✓ Paid</div>' : ''}</div></div>
<div class="meta"><div><label>Bill to</label><div class="v">${invoice.client}</div>${invoice.project ? `<p style="font-size:13px;color:#64748b">${invoice.project}</p>` : ''}</div>
<div style="text-align:right"><label>Invoice date</label><div class="v">${createdDate}</div><label style="margin-top:10px">${isPaid ? 'Status' : 'Due'}</label><div class="v">${isPaid ? 'Paid' : dueDate}</div></div></div>
${lineItems.length > 0 ? `<table><thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Amount</th></tr></thead><tbody>${lineItems.map((i) => `<tr><td>${i.description}</td><td>${i.quantity}</td><td>${money(i.unitPrice)}</td><td>${money(i.total)}</td></tr>`).join('')}</tbody></table>` : ''}
<div class="totals">${lineItems.length > 0 ? `<div class="trow"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="trow"><span>VAT (20%)</span><span>${money(vatAmount)}</span></div>` : ''}<div class="trow grand"><span>${isPaid ? 'Amount paid' : 'Amount due'}</span><span>${money(Number(invoice.amount))}</span></div></div>
${!isPaid && (bank.accountName || bank.sortCode || bank.accountNumber) ? `<div class="bank"><h4>Payment details</h4><div class="grid">${bank.accountName ? `<div><label>Account name</label>${bank.accountName}</div>` : ''}${bank.sortCode ? `<div><label>Sort code</label>${bank.sortCode}</div>` : ''}${bank.accountNumber ? `<div><label>Account number</label>${bank.accountNumber}</div>` : ''}</div><p style="margin-top:12px;font-size:13px;color:#64748b">Reference: <strong>${invoice.invoice_number}</strong></p></div>` : ''}
${invoice.notes ? `<p style="margin-top:24px;font-size:13px;white-space:pre-wrap">${invoice.notes}</p>` : ''}
<div class="footer">${companyName}${company?.company_website ? ` · ${String(company.company_website).replace(/^https?:\/\//, '')}` : ''}</div>
</div><div class="actions"><button class="close" onclick="window.close()">Close</button><button class="print" onclick="window.print()">Print / Save as PDF</button></div></body></html>`;

    return new Response(
      JSON.stringify({
        html,
        invoice: { number: invoice.invoice_number, client: invoice.client, total: money(Number(invoice.amount)) },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
