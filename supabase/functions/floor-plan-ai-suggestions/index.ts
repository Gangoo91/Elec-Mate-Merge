import { serve, corsHeaders } from '../_shared/deps.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SYSTEM_PROMPT = `You are a senior NICEIC-qualified electrical inspector reviewing floor plan drawings for UK domestic and commercial installations.

Your expertise:
- BS 7671:2018+A4:2026 (IET Wiring Regulations 18th Edition) — every regulation number
- Building Regulations: Part B (fire safety), Part F (ventilation), Part L (conservation of energy), Part M (accessibility), Part P (electrical safety)
- IET On-Site Guide and Guidance Notes
- CIBSE design guides
- NICEIC and NAPIT assessment criteria

Your review style:
- Practical — focus on things that would actually fail an inspection or cause problems on site
- Specific — cite regulation numbers (e.g. "Regulation 701.512.3" not just "Section 701")
- Helpful — explain WHY something matters, not just that it's wrong
- Proportionate — don't flag minor preferences as critical issues
- UK English only`;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { room_name, symbols, room_type } = await req.json();

    if (!symbols || symbols.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: { missing: [], compliance: [], improvements: [], summary: 'No symbols to analyse — add some electrical symbols first.' } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const symbolList = symbols.map((s: any) => `- ${s.count}× ${s.name}`).join('\n');

    // RAG: Pull relevant regulations based on room type and symbols
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get relevant regulations for this room type
    const keywords = [room_type || 'domestic', 'socket', 'lighting', 'protection', 'rcd'].filter(Boolean);
    const { data: regulations } = await supabaseAdmin
      .from('regulations_intelligence')
      .select('regulation_number, category, primary_topic')
      .or(keywords.map(k => `primary_topic.ilike.%${k}%`).join(','))
      .limit(10);

    // Get practical work guidance
    const { data: practicalWork } = await supabaseAdmin
      .from('practical_work_intelligence')
      .select('equipment_category, installation_method, cable_routes, termination_methods')
      .limit(5);

    const ragContext = regulations?.length
      ? `\n\nRELEVANT BS 7671 REGULATIONS (from database — cite these):\n${regulations.map(r => `- Reg ${r.regulation_number} (${r.category}): ${r.primary_topic}`).join('\n')}`
      : '';

    const practicalContext = practicalWork?.length
      ? `\n\nPRACTICAL INSTALLATION GUIDANCE (from database):\n${practicalWork.map(p => `- ${p.equipment_category}: ${p.installation_method || ''} ${p.cable_routes?.join(', ') || ''}`).join('\n')}`
      : '';

    const result = await callOpenAI({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analyse this ${room_type || 'room'} called "${room_name || 'Room'}" with these electrical symbols placed:

${symbolList}
${ragContext}
${practicalContext}

Provide your analysis as JSON with these fields:
{
  "missing": [{"symbol": "symbol-id", "name": "Human readable name", "reason": "Why it should be added"}],
  "compliance": [{"issue": "Description of the issue", "regulation": "BS 7671 Section/Regulation reference", "severity": "high|medium|low"}],
  "improvements": [{"suggestion": "What to improve", "benefit": "Why it matters"}],
  "summary": "One sentence overall assessment"
}

Be practical — focus on things that would actually fail an inspection or cause problems on site. Don't over-engineer.`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 4000,
    });

    const data = JSON.parse(result.content);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AI suggestions error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to analyse floor plan' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
