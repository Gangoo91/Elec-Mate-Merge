// DESIGNER AGENT - Chain-of-Thought Reasoning with o4-mini
// Phase 5: Deep reasoning and "show your working"
// Phase 1: Uses o4-mini reasoning model

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
    const { messages, currentDesign, context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🎨 Designer Agent v2.0: Processing with chain-of-thought reasoning');

    // Enhanced system prompt for chain-of-thought
    const systemPrompt = `You're an experienced UK spark doing circuit design. CRITICAL: Always SHOW YOUR WORKING like you're explaining to an apprentice on site.

When calculating anything:
1. State what you're calculating and why
2. Show the formula
3. Show the actual numbers going in
4. Show the result
5. Check it against BS 7671 limits
6. Explain what it means in practice

Example response style:
"Right, let me work through this 9.5kW shower circuit properly mate...

**Load Current Calculation:**
Power = 9500W, voltage = 230V single phase
Load current = 9500W ÷ 230V ÷ 0.95 (power factor) = 43.5A

So we need a protective device ≥ 43.5A
Nearest standard rating: 45A Type B MCB (BS EN 60898) ✓

**Cable Sizing:**
45A MCB protection, assuming clipped direct installation (Method C)
From BS 7671 Table 4D5:
- 6mm² twin & earth = 46A capacity (too close to 45A limit)
- 10mm² twin & earth = 57A capacity ✓

Going with 10mm² for safety margin. Reg 433.1.204 says cable current-carrying capacity must be ≥ protective device rating.

**Voltage Drop Check:**
Cable run length: 12m (let's assume worst case)
From Table 4D5, mV/A/m for 10mm² = 4.4
Voltage drop = 4.4 × 43.5A × 12m ÷ 1000 = 2.3V
As percentage: 2.3V ÷ 230V × 100 = 1.0%
Well within 3% limit per Reg 525 ✓

**Earth Fault Loop:**
Max Zs for 45A Type B = 1.02Ω (Table 41.3)
Need to verify on site with loop tester during commissioning.

**Final Spec:**
- Cable: 10mm² twin & earth (6242Y)
- Protection: 45A Type B MCB
- Expected cable run: <12m to stay within volt drop
- RCD protection: Yes (30mA if socket could be used for portable equipment)

Regulations covered: Reg 433.1 (overload), Reg 525 (volt drop), Reg 411.3.2 (fault protection)"

Rules:
- NO markdown (**, ##, bullets)
- Write in paragraphs with natural flow
- Use emojis sparingly (✓ for checks, 🎨 for design points)
- Cite regulation numbers naturally in sentences
- Explain the WHY, not just the WHAT
- Sound like you're chatting over a brew on site
- Always show your calculations step-by-step`;

    // Use o4-mini for complex reasoning
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'o4-mini-2025-04-16', // PHASE 1: Reasoning model
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          ...(context?.previousAgentOutputs?.length ? [{
            role: 'system',
            content: `Previous specialist inputs:\n${context.previousAgentOutputs.map((a: any) => `${a.agent}: ${a.response.slice(0, 200)}...`).join('\n')}`
          }] : [])
        ],
        max_completion_tokens: 2500, // PHASE 1: Updated parameter for o4-mini
        // Note: o4-mini doesn't support temperature parameter
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;
    const responseContent = assistantMessage.content || 'Design analysis complete.';

    // Extract any regulation citations from the response
    const citations = extractCitations(responseContent);

    console.log('✅ Designer response generated with chain-of-thought reasoning');

    return new Response(JSON.stringify({
      response: responseContent,
      citations,
      confidence: 0.9, // High confidence for o4-mini reasoning
      model: 'o4-mini-2025-04-16',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in designer-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Designer agent failed',
      response: 'Unable to process design request. Please provide circuit details (load, cable length, installation method).',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractCitations(response: string): any[] {
  const citations: any[] = [];
  
  // Extract regulation references
  const regMatches = response.matchAll(/Reg(?:ulation)?\s*(\d{3}(?:\.\d+)?(?:\.\d+)?)/gi);
  for (const match of regMatches) {
    citations.push({
      number: `Reg ${match[1]}`,
      title: `BS 7671 Regulation ${match[1]}`
    });
  }

  // Extract table references
  const tableMatches = response.matchAll(/Table\s*(\w+)/gi);
  for (const match of tableMatches) {
    citations.push({
      number: `Table ${match[1]}`,
      title: `BS 7671 Table ${match[1]}`
    });
  }

  // Deduplicate
  return Array.from(new Map(citations.map(c => [c.number, c])).values());
}
