import { serve, corsHeaders } from '../_shared/deps.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SYSTEM_PROMPT = `You are a chartered electrical engineer writing NBS-style electrical specifications for an NICEIC-registered contractor's design pack.

Your specifications:
- Follow NBS Chorus / NBS Create format where applicable
- Reference specific BS 7671:2018+A3:2024 regulation numbers
- Include cable types (T&E, SWA, LSOH), sizes, and current ratings
- Specify mounting heights to finished floor level (FFL) in millimetres
- Note IP ratings for wet areas (IP44 minimum, IP65 for external)
- Specify RCD requirements per BS 7671 Regulation 411.3.3
- Include earthing arrangements and protective conductor sizing
- Use proper electrical terminology (IET/NICEIC standard terms)
- UK English only
- Be concise but technically precise — a QS or building control officer should be satisfied`;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { room_name, symbols, room_type, property_address } = await req.json();

    if (!symbols || symbols.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: { specification: 'No symbols placed — add electrical symbols to generate a specification.' } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const symbolList = symbols.map((s: any) => `- ${s.count}× ${s.name} (${s.id})`).join('\n');

    // RAG: Pull relevant practical work intelligence for cable sizes, mounting heights
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: practicalWork } = await supabaseAdmin
      .from('practical_work_intelligence')
      .select('equipment_category, equipment_subcategory, installation_method, fixing_intervals, cable_routes, termination_methods')
      .limit(8);

    const { data: regulations } = await supabaseAdmin
      .from('regulations_intelligence')
      .select('regulation_number, category, primary_topic')
      .or(`category.eq.Installation,category.eq.Protection,category.eq.Design`)
      .limit(10);

    const ragContext = [
      regulations?.length ? `\nRELEVANT REGULATIONS:\n${regulations.map(r => `Reg ${r.regulation_number}: ${r.primary_topic}`).join('\n')}` : '',
      practicalWork?.length ? `\nINSTALLATION METHODS:\n${practicalWork.map(p => `${p.equipment_category}/${p.equipment_subcategory}: ${p.installation_method || ''}`).join('\n')}` : '',
    ].filter(Boolean).join('\n');

    const result = await callOpenAI({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Write an electrical specification for the following installation:

Property: ${property_address || 'Domestic property'}
Room: ${room_name || 'Room'}
Room Type: ${room_type || 'General'}

Electrical items to be installed:
${symbolList}
${ragContext}

Write a professional numbered specification. Each item should include:
- Description of the accessory/fitting
- Mounting height where applicable
- Cable type and size
- Circuit reference (e.g., "Fed from Lighting Circuit L1")
- Protection device
- Any special requirements (IP rating, RCD, etc.)

End with a general compliance statement.

Return as JSON:
{
  "title": "Electrical Specification — ${room_name || 'Room'}",
  "items": [
    {"number": 1, "description": "Supply and install...", "circuit": "L1", "cable": "1.5mm² T&E", "protection": "6A MCB Type B"}
  ],
  "generalNotes": "All work to comply with...",
  "regulations": ["BS 7671 Reg 314.1", "BS 7671 Section 701"]
}`,
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
    console.error('AI spec error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to generate specification' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
