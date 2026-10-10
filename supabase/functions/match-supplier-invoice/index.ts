/**
 * match-supplier-invoice — a supplier's invoice (the emailed PDF, or a photo of
 * the paper copy) 3-way matched against the purchase order and what was
 * actually received. Flags overcharges, price hikes, and being billed for goods
 * that never arrived.
 *
 * Vision extraction via Gemini (the repo's OCR model), which reads PDFs and
 * images alike as inline data. Self-contained.
 *
 * Owner/admin only: the PO read below runs on the caller's RLS, and since
 * ELE-1978 purchase orders are visible to the owner and admins only (office
 * managers never see buy prices), so an office caller gets 404 here.
 * Inserting the invoice row fires trg_supplier_invoice_last_paid, which stamps
 * "last paid" on the price-book items the PO lines came from.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const money = (v: number) => `£${Number(v || 0).toFixed(2)}`;

interface InvoiceLine {
  description?: string;
  qty?: number;
  unit_price?: number;
  line_total?: number;
}
interface Variance {
  type: string;
  detail: string;
  amount: number;
}

Deno.serve(withSentry('match-supplier-invoice', async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return json({ error: 'Not authenticated' }, 401);

    // `image_*` names kept for existing callers; a PDF travels the same way.
    const { order_id, image_base64, image_type } = await req.json();
    if (!order_id || !image_base64) return json({ error: 'order_id and image_base64 required' }, 400);
    const mime = String(image_type || 'image/jpeg').toLowerCase();
    const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!ALLOWED.includes(mime)) {
      return json({ error: 'Send the invoice as a PDF or a photo (JPEG, PNG, WebP or HEIC).' }, 415);
    }
    // ~15 MB of file as base64 — Gemini's inline limit is 20 MB per request.
    if (String(image_base64).length > 20_000_000) {
      return json({ error: 'That invoice is too large — under 15 MB please.' }, 413);
    }
    const isPdf = mime === 'application/pdf';

    // Ownership enforced by RLS on the user-scoped client.
    const { data: order, error: oErr } = await supabase
      .from('employer_material_orders')
      .select('*, supplier:employer_suppliers(name)')
      .eq('id', order_id)
      .single();
    if (oErr || !order) return json({ error: 'Purchase order not found' }, 404);

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) return json({ error: 'Vision not configured' }, 500);

    // 1) Extract the invoice with Gemini vision.
    const systemPrompt = `You read UK electrical supplier/merchant invoices (PDF documents or photos; a PDF may run to several pages — read every page). Return STRICT JSON only:
{"supplier_name": string, "invoice_number": string|null, "invoice_total": number, "lines":[{"description": string, "qty": number, "unit_price": number, "line_total": number}]}
invoice_total is the grand total payable (inc VAT if shown). Numbers only, no currency symbols. Extract every line. If unsure, use null/0.`;
    const vRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: isPdf ? 'Extract this supplier invoice PDF as JSON.' : 'Extract this supplier invoice as JSON.' },
                { inline_data: { mime_type: mime, data: image_base64 } },
              ],
            },
          ],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 4000, temperature: 0.05 },
        }),
      }
    );
    if (!vRes.ok) return json({ error: isPdf ? 'Could not read the invoice PDF.' : 'Could not read the invoice photo.' }, 502);
    const vJson = await vRes.json();
    const text = vJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return json({ error: 'Could not read the invoice.' }, 502);

    let inv: { supplier_name?: string; invoice_number?: string; invoice_total?: number; lines?: InvoiceLine[] };
    try {
      inv = JSON.parse(text);
    } catch {
      return json({ error: isPdf ? 'Could not read that PDF. Check it is the supplier invoice and try again.' : 'Invoice extraction was unreadable — try a clearer photo.' }, 422);
    }

    // 2) 3-way match: invoice vs PO vs goods received.
    const poItems = (order.items as { name: string; qty: number; unit_cost: number; received_qty?: number }[]) ?? [];
    const poTotal = Number(order.total || 0);
    const invTotal = Number(inv.invoice_total || 0);
    const orderedQty = poItems.reduce((s, i) => s + Number(i.qty || 0), 0);
    const receivedQty = poItems.reduce((s, i) => s + Number(i.received_qty || 0), 0);
    const tol = 0.02; // 2% tolerance on money

    const variances: Variance[] = [];

    if (invTotal > poTotal * (1 + tol)) {
      variances.push({
        type: 'overcharge',
        detail: `Invoiced ${money(invTotal)} but the PO was ${money(poTotal)}`,
        amount: Number((invTotal - poTotal).toFixed(2)),
      });
    }
    // Only a problem if they've billed ~the full PO but the goods aren't all in.
    // A smaller invoice for a partial delivery is legitimate, not a variance.
    if (orderedQty > 0 && receivedQty < orderedQty && invTotal >= poTotal * (1 - tol)) {
      variances.push({
        type: 'short_delivery',
        detail: `Invoiced ${money(invTotal)} (≈ the full PO) but only ${receivedQty} of ${orderedQty} items marked received`,
        amount: 0,
      });
    }
    // Per-line price hikes (match invoice line to a PO item by name).
    for (const line of inv.lines ?? []) {
      const name = (line.description ?? '').toLowerCase();
      if (!name) continue;
      const po = poItems.find(
        (p) => name.includes(p.name.toLowerCase().slice(0, 8)) || p.name.toLowerCase().includes(name.slice(0, 8))
      );
      if (po && Number(line.unit_price) > Number(po.unit_cost) * (1 + tol)) {
        variances.push({
          type: 'price_hike',
          detail: `${po.name}: invoiced ${money(Number(line.unit_price))}/unit vs PO ${money(Number(po.unit_cost))}`,
          amount: Number(((Number(line.unit_price) - Number(po.unit_cost)) * Number(po.qty)).toFixed(2)),
        });
      }
    }

    // Gap §4.4: ONE supplier-bill rule for the whole app, in SQL
    // (_supplier_bill_check: 1% plus half a penny on the total and on each
    // line; a smaller bill is a part delivery, not a variance). The checks
    // above are the old 2% rule, kept only as the fallback for a database
    // that doesn't have supplier_bill_check yet.
    const { data: rule, error: ruleErr } = await supabase.rpc('supplier_bill_check', {
      p_order: order_id,
      p_bill_total: invTotal,
      p_lines: inv.lines ?? [],
    });
    if (!ruleErr && rule && Array.isArray((rule as { variances?: unknown }).variances)) {
      variances.length = 0;
      variances.push(...((rule as { variances: Variance[] }).variances));
    }

    const matched = variances.length === 0;

    // 3) Store the invoice + verdict.
    const { error: insErr } = await supabase.from('employer_supplier_invoices').insert({
      order_id,
      supplier_name: inv.supplier_name ?? (order as { supplier?: { name?: string } }).supplier?.name ?? null,
      invoice_number: inv.invoice_number ?? null,
      invoice_total: invTotal,
      lines: inv.lines ?? [],
      matched,
      variances,
    });
    if (insErr) return json({ error: 'Read the invoice but could not save it — try again.' }, 500);

    return json({
      matched,
      invoice_total: invTotal,
      po_total: poTotal,
      supplier_name: inv.supplier_name ?? null,
      invoice_number: inv.invoice_number ?? null,
      variances,
    });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500);
  }
}));
