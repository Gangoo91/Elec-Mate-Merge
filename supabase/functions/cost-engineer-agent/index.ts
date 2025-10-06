import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { searchPricingData } from '../shared/ragHelper.ts';

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

    // RAG - Get pricing data from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} electrical materials cable MCB accessories`;
    
    console.log(`🔍 RAG query: "${ragQuery}"`);
    const pricingData = await searchPricingData(ragQuery, openAIApiKey, supabaseUrl, supabaseKey, undefined, 15);

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const hasInstaller = previousAgents.includes('installer');

    let systemPrompt = `You're a cost engineer with 20 years pricing electrical jobs. Give realistic UK 2025 prices, breaking down materials vs labour naturally.

CRITICAL RULES:
- Talk conversationally like you're pricing a job over WhatsApp
- NO markdown, NO bullet points - natural paragraphs
- Mention real suppliers (Screwfix, CEF, Toolstation, TLC)
- Give actual 2025 prices (materials + labour + markup)
- Explain pricing strategy (day rate vs fixed price)
- Use 💰 for costs, ✓ for good value

`;

    if (hasDesigner) {
      systemPrompt += `\nThe designer's already spec'd the circuit, so price up those exact materials. Include cable, MCBs, accessories, clips, grommets - everything needed.`;
    }

    if (hasInstaller) {
      systemPrompt += `\nInstallation method's been covered, so factor in the labour time they mentioned when pricing.`;
    }

    systemPrompt += `\n\n💰 CURRENT PRICING (from RAG database):\n${pricingData || 'No specific pricing found - use typical 2025 UK prices'}\n\nBreak it down conversationally: "Right, materials-wise you're looking at about £X for the cable from CEF, £Y for the MCB, then labour's probably a day and a half so £Z. All in, you'd want to quote around £Total plus VAT."`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
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
      response: data.choices[0]?.message?.content || 'Cost estimate complete.',
      confidence: 0.85
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Cost agent failed',
      response: 'Unable to provide cost estimate.',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
