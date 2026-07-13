/**
 * match-supplier-invoice — photograph a supplier's invoice and 3-way match it
 * against the purchase order and what was actually received. Flags overcharges,
 * price hikes, and being billed for goods that never arrived.
 *
 * Vision extraction via Gemini (the repo's OCR model). Self-contained.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

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

Deno.serve(async (req) => {
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

    const { order_id, image_base64, image_type } = await req.json();
    if (!order_id || !image_base64) return json({ error: 'order_id and image_base64 required' }, 400);

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
    const systemPrompt = `You read UK electrical supplier/merchant invoices. Return STRICT JSON only:
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
                { text: 'Extract this supplier invoice as JSON.' },
                { inline_data: { mime_type: image_type || 'image/jpeg', data: image_base64 } },
              ],
            },
          ],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 4000, temperature: 0.05 },
        }),
      }
    );
    if (!vRes.ok) return json({ error: 'Could not read the invoice image.' }, 502);
    const vJson = await vRes.json();
    const text = vJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return json({ error: 'Could not read the invoice.' }, 502);

    let inv: { supplier_name?: string; invoice_number?: string; invoice_total?: number; lines?: InvoiceLine[] };
    try {
      inv = JSON.parse(text);
    } catch {
      return json({ error: 'Invoice extraction was unreadable — try a clearer photo.' }, 422);
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

    const matched = variances.length === 0;

    // 3) Store the invoice + verdict.
    await supabase.from('employer_supplier_invoices').insert({
      order_id,
      supplier_name: inv.supplier_name ?? (order as { supplier?: { name?: string } }).supplier?.name ?? null,
      invoice_number: inv.invoice_number ?? null,
      invoice_total: invTotal,
      lines: inv.lines ?? [],
      matched,
      variances,
    });

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
});
