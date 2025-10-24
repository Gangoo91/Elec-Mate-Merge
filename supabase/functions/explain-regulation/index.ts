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
    const { topic, context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Explaining regulation:', topic);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: `You are an experienced UK electrical engineer explaining BS 7671:2018 regulations in plain English.

Provide clear, concise explanations that:
- Explain the "why" behind the requirement
- Reference specific BS 7671 regulation numbers
- Use practical examples
- Keep it under 100 words
- Focus on safety rationale

Be professional but approachable.` 
          },
          { 
            role: 'user', 
            content: `Explain why ${topic} in this context: ${JSON.stringify(context)}` 
          }
        ],
        max_completion_tokens: 200
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const explanation = data.choices[0]?.message?.content || "Unable to generate explanation";

    console.log('Generated explanation for:', topic);

    return new Response(JSON.stringify({ 
      explanation,
      topic,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in explain-regulation function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate explanation' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
