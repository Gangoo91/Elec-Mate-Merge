import { serve, corsHeaders } from '../_shared/deps.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userQuery, designContext, messages } = await req.json();
    
    console.log('🔄 Generating design alternatives for:', userQuery);

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error('GEMINI_API_KEY not configured');

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

    // Import Gemini provider
    const { callGemini, withRetry } = await import('../_shared/ai-providers.ts');

    const result = await withRetry(async () => {
      const response = await callGemini({
        messages: [
          { role: 'system', content: 'You are an expert electrical design consultant specializing in BS 7671 compliant installations.' },
          { role: 'user', content: prompt }
        ],
        model: 'gemini-2.5-flash',
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }, geminiKey);

      return JSON.parse(response.content);
    }, 3, 2000);

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
