import { serve, corsHeaders } from '../_shared/deps.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SYSTEM_PROMPT = `You are an experienced UK electrical contractor with 15+ years pricing domestic and light commercial installations.

Your pricing knowledge (2026 UK market):
- Trade account prices at CEF, Edmundson, Rexel (not retail)
- Typical day rate for qualified electrician: £280-350/day (varies by region)
- Typical apprentice/mate rate: £120-160/day
- First fix vs second fix labour splits
- Testing and commissioning time
- Certification costs (EIC: £30-50, EICR: £150-250 depending on circuits)
- Building control notification (Part P): £200-300
- Sundries typically 12-15% of materials (clips, fixings, trunking, consumables)

Your quoting style:
- Competitive but profitable — aim for 25-35% margin on materials, £40-50/hour effective labour rate
- Include everything — no hidden extras that lose trust
- Clear exclusions so there are no disputes
- Professional presentation suitable for sending to a client
- VAT registered (20%)
- UK English, prices in GBP (£)`;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { materials, total_items, room_count, property_address, rooms } = await req.json();

    if (!materials || materials.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: { error: 'No materials to quote — add symbols to rooms first.' } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const materialsList = materials.map((m: any) => `- ${m.count}× ${m.name} (${m.category})`).join('\n');
    const roomsList = rooms?.map((r: any) => r.name).join(', ') || 'Various rooms';

    // RAG: Pull real pricing data from pricing_embeddings
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: pricingData } = await supabaseAdmin
      .from('pricing_embeddings')
      .select('product_name, price, supplier, category')
      .limit(15);

    // Pull labour timing data
    const { data: labourData } = await supabaseAdmin
      .from('practical_work_intelligence')
      .select('equipment_category, activity_types, fixing_intervals')
      .limit(8);

    const pricingContext = pricingData?.length
      ? `\n\nREAL UK TRADE PRICES (from our database — use these where applicable):\n${pricingData.map(p => `- ${p.product_name}: £${p.price} (${p.supplier || 'trade'})`).join('\n')}`
      : '';

    const labourContext = labourData?.length
      ? `\n\nLABOUR TIMING DATA:\n${labourData.map(l => `- ${l.equipment_category}: ${l.activity_types?.join(', ') || 'install'}`).join('\n')}`
      : '';

    const result = await callOpenAI({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Generate a quotation for this domestic electrical installation:

Property: ${property_address || 'Domestic property'}
Rooms: ${roomsList}
Total rooms: ${room_count || 1}

Materials required:
${materialsList}

Total electrical items: ${total_items || 0}
${pricingContext}
${labourContext}

Produce a complete quote as JSON:
{
  "quoteRef": "Q-2026-XXXX",
  "materials": [
    {"item": "Description", "qty": N, "unitPrice": N, "total": N}
  ],
  "materialsSubtotal": N,
  "labour": {
    "description": "Electrical installation labour",
    "hours": N,
    "rate": N,
    "total": N
  },
  "sundries": {"description": "Fixings, clips, trunking, consumables", "total": N},
  "certification": {"description": "EIC and testing", "total": N},
  "subtotalExVat": N,
  "vat": N,
  "totalIncVat": N,
  "estimatedDuration": "X days",
  "paymentTerms": "Description of payment terms",
  "validity": "Quote valid for 30 days",
  "exclusions": ["List of what's NOT included"],
  "assumptions": ["List of assumptions made"]
}

Use realistic 2026 UK prices. A qualified electrician day rate is typically £250-350/day.`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 6000,
    });

    const data = JSON.parse(result.content);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI quote error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to generate quote' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
