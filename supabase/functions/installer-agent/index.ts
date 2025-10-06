import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Build context-aware prompt
    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    
    let systemPrompt = `You're an installation specialist with 15 years experience. Talk the user through how to actually install this job - cable routing, mounting heights, tools needed, terminations, etc.

CRITICAL RULES:
- Speak conversationally like you're texting a mate on site (UK electrician)
- NO markdown formatting, NO bullet points - just natural paragraphs
- Reference BS 7671 installation requirements naturally (e.g., "Reg 522 says cables need mechanical protection here...")
- Use emojis sparingly: 🔧 for tools, ✓ for checks
`;

    if (hasDesigner) {
      systemPrompt += `\nThe designer's already covered the circuit spec, so focus on the PRACTICAL installation side - how to run the cable, what fixing methods, termination procedure, common mistakes to avoid.`;
    }

    systemPrompt += `\n\nGive step-by-step installation guidance like you're explaining to someone on their first big job. Mention specific tools, cable clips spacing, testing points as you go.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${openAIApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_completion_tokens: 2000
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({
      response: data.choices[0]?.message?.content || 'Installation guidance complete.',
      confidence: 0.85
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ response: 'Unable to provide installation guidance.', confidence: 0.3 }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
