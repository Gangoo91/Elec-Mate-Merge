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
    const { userQuery, designContext, messages } = await req.json();
    
    console.log('🔄 Generating design alternatives for:', userQuery);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const prompt = `You are an electrical design expert. The user has requested a circuit design.

USER REQUEST: ${userQuery}

CURRENT DESIGN CONTEXT:
${designContext || 'No previous design context'}

CONVERSATION HISTORY (last 10 messages):
${messages?.map((m: any) => `${m.role}: ${m.content}`).join('\n\n') || 'None'}

Generate 3 alternative design approaches for this installation. Each alternative should be technically sound, BS 7671 compliant, but use different strategies:

1. **Cost-Optimised**: Minimum cost while meeting regulations
2. **Performance-Optimised**: Best electrical performance (lowest voltage drop, highest safety margin)
3. **Balanced**: Middle ground between cost and performance

For each alternative, provide:
- Title (brief, descriptive name)
- Approach (explain the strategy in 2-3 sentences)
- Cable size (mm²)
- Protection device (e.g., "32A MCB Type B")
- Estimated cost (£, materials only)
- Voltage drop (% at full load)
- Pros (2-3 advantages as array of strings)
- Cons (2-3 disadvantages as array of strings)
- Compliance ("fully_compliant" or "requires_attention")

Respond with valid JSON:
{
  "alternatives": [
    {
      "id": "cost-optimised",
      "title": "Cost-Effective Solution",
      "approach": "Uses minimum cable size...",
      "cableSize": 2.5,
      "protectionDevice": "32A MCB Type B",
      "estimatedCost": 180,
      "voltageDrop": 2.8,
      "pros": ["Lower material cost", "Easier to install"],
      "cons": ["Higher voltage drop", "Less future-proof"],
      "compliance": "fully_compliant"
    },
    ...
  ]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert electrical design consultant specializing in BS 7671 compliant installations.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log('✅ Generated', result.alternatives?.length || 0, 'alternatives');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error generating alternatives:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate alternatives'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
