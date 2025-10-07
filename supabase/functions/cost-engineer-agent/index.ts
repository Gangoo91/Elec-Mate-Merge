import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    // RAG - Get pricing data from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} electrical materials cable MCB accessories`;
    
    console.log(`🔍 RAG: Searching pricing data for: ${ragQuery} `);
    
    // Generate embedding for pricing search
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    let pricingData = '';
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      const { data: pricingResults, error: ragError } = await supabase.rpc('search_pricing', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 15
      });

      if (!ragError && pricingResults && pricingResults.length > 0) {
        pricingData = pricingResults.map((p: any) => 
          `${p.item_name} - £${p.base_cost} (${p.price_per_unit}) at ${p.wholesaler} ${p.in_stock ? '✓ In Stock' : '✗ Out of Stock'}`
        ).join('\n');
        console.log(`✅ Found ${pricingResults.length} pricing items`);
      } else {
        console.log('⚠️ No relevant pricing data found');
      }
    }

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

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt }, 
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        max_tokens: 2000
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
