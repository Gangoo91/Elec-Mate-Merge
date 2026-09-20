import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();

    if (!description || description.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Description is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Expanding description:', description);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional electrician writing project descriptions for quotes. 
Expand brief notes into professional, clear project descriptions.
Keep it concise but comprehensive (2-4 sentences max).
Include scope of work mentioned.
Use professional UK English.
Do not add pricing or timescales.
Do not use bullet points - write flowing sentences.
Do not start with "We will" - describe the work directly.
Example input: "rewire kitchen"
Example output: "Full electrical rewire of kitchen including replacement of consumer unit, installation of new ring main, dedicated circuits for appliances, and upgrade to modern LED lighting throughout. All work completed to BS 7671 18th Edition standards with certification provided."`
          },
          {
            role: 'user',
            content: `Expand this into a professional project description: ${description}`
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    const expandedDescription = data.choices[0].message.content.trim();

    console.log('Expanded to:', expandedDescription);

    return new Response(
      JSON.stringify({ expandedDescription }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in expand-description:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});