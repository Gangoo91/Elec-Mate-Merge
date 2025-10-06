import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  CABLE_SUPPORT_INTERVALS, 
  SAFE_ZONES, 
  FIRE_RATED_SUPPORT,
  ELECTRICAL_CONNECTION_REQUIREMENTS,
  TERMINATION_GUIDANCE,
  CABLE_IDENTIFICATION_STANDARDS,
  EXTERNAL_INFLUENCE_PROTECTIONS,
  checkSafeZoneCompliance,
  getCableSupportInterval,
  getTerminationGuidance
} from '../shared/bs7671InstallationMethods.ts';
import { SECTION_701_BATHROOMS, SECTION_722_EV_CHARGING, SAFE_ZONES_522_6 } from '../shared/bs7671SpecialLocations.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) throw new Error('OpenAI API key not configured');

    // Build context-aware prompt with BS 7671 Chapter 52 knowledge
    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    
    let systemPrompt = `You're a CITY & GUILDS 2391 qualified installation specialist with 15+ years on-site experience. Talk the user through the PRACTICAL installation - routing, fixing, terminating, testing.

🔧 YOUR BS 7671 CHAPTER 52 INSTALLATION KNOWLEDGE:

📏 CABLE SUPPORT INTERVALS (Reg 522.8.5):
${CABLE_SUPPORT_INTERVALS.map(s => `- ${s.cableType} ${s.orientation}: clips every ${s.maxSpacing}mm`).join('\n')}

🛡️ SAFE ZONES (Reg 522.6.202):
${SAFE_ZONES.map(z => `- ${z.zoneType}: ${z.description}`).join('\n')}
⚠️ IF cable <50mm depth AND outside safe zone → 30mA RCD REQUIRED

🔥 FIRE-RATED SUPPORT (Reg 521.10.202):
✅ MUST USE: ${FIRE_RATED_SUPPORT.acceptableMethods.slice(0, 3).join(', ')}
❌ PROHIBITED: ${FIRE_RATED_SUPPORT.prohibitedMethods.slice(0, 2).join(', ')}
Reason: Prevents cables collapsing across escape routes during fire

🔌 TERMINATIONS (Section 526):
${TERMINATION_GUIDANCE.slice(0, 2).map(t => `- ${t.conductorType}: ${t.torqueSettings}, strip ${t.stripLength}`).join('\n')}

🏷️ CABLE IDENTIFICATION (Reg 514.3):
- T&E: Brown=L, Blue=N, Bare CPC needs green/yellow sleeving at ALL terminations
- Old colours at changeover: CAUTION LABEL REQUIRED

🌧️ EXTERNAL INFLUENCES (Section 522):
${EXTERNAL_INFLUENCE_PROTECTIONS.slice(0, 4).map(p => `- ${p.code} (${p.influence}): ${p.protection}`).join('\n')}

COMMUNICATION STYLE:
- Chat naturally like you're texting a mate on site
- NO markdown, NO bullet points - conversational paragraphs only
- Reference specific BS 7671 regs naturally: "Reg 522.6.202 says you need clips every 250mm here..."
- Use emojis sparingly: 🔧 tools, ✓ checks, ⚠️ critical points
- Mention PRACTICAL details: cable clip spacing, depth of chases, which tools, termination torque`;

    if (hasDesigner) {
      systemPrompt += `\n\n📋 The Designer's already done the circuit calculations, so YOU focus on:
- HOW to route the cable (safe zones, support intervals)
- WHAT fixing methods to use (steel clips for fire rating)
- Termination procedure (strip lengths, torque settings)
- Common installation MISTAKES to avoid`;
    }

    systemPrompt += `\n\n💬 Guide them step-by-step like you're walking an apprentice through their first install. Be specific: "Right, you'll need your SDS drill, 20mm masonry bit, and steel cable clips every 250mm on this horizontal run..."`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openAIApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt }, 
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        max_completion_tokens: 2000
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({
      response: data.choices[0]?.message?.content || 'Installation guidance complete.',
      confidence: 0.90
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Installer agent error:', error);
    return new Response(JSON.stringify({ response: 'Unable to provide installation guidance.', confidence: 0.3 }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
