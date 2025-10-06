import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// BS 7671:2018+A2:2022 Chapter 64 - Complete Testing Knowledge
import { getTestSequence, getTest, verifyInsulationResistance, INSULATION_RESISTANCE_LIMITS } from "../shared/bs7671TestingRequirements.ts";
import { getMaxZs } from "../shared/bs7671ProtectionData.ts";

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

    console.log('✅ Commissioning Agent: Processing testing query');

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const hasInstaller = previousAgents.includes('installer');

    // Build testing context from BS 7671 Chapter 64
    const testSequence = getTestSequence();
    const testContext = testSequence.map(t => 
      `${t.testNumber}. ${t.testName} (${t.regulation}): ${t.passFailCriteria}`
    ).join('\n');
    
    let systemPrompt = `You're a commissioning specialist with full BS 7671:2018+A2:2022 Chapter 64 knowledge. Talk them through testing like you're prepping them for their first EIC.

CRITICAL RULES:
- Conversational tone like you're texting a colleague (UK electrician)
- NO markdown, NO bullet points - just natural chat
- Reference EXACT regulations and table values from BS 7671
- Explain expected readings with REAL numbers from the tables
- Use ✅ for pass criteria, ❌ for fails
- ALWAYS follow correct test sequence: Dead tests (1-4) then Live tests (5-7)

BS 7671 CHAPTER 64 TEST SEQUENCE:
${testContext}

CRITICAL TEST VALUES TO USE:
- Insulation resistance: ≥1.0MΩ at 500V DC for 230V circuits (Table 64), but should see 50-200MΩ+
- Max Zs examples: B32 MCB = 1.44Ω, C32 MCB = 0.72Ω (Table 41.3)
- RCD trip times: ≤300ms at 1× IΔn, ≤40ms at 5× IΔn (Reg 643.8)
- Continuity: Very low (typically <0.05Ω short runs, <1Ω longer runs)
`;

    if (hasDesigner || hasInstaller) {
      systemPrompt += `\nThey've covered the design${hasInstaller ? ' and installation' : ''}, so focus on TESTING - the 7-step sequence, expected readings, and pass/fail criteria. Use the EXACT values from BS 7671 tables.`;
    }

    systemPrompt += `\n\nWalk them through conversationally with REAL numbers: "Right so first up is continuity - Reg 643.2. You're testing the protective conductor path, should be well under 0.05 ohms for that 10mm cable run. Record your R1+R2 value - you'll need it later for Zs calcs. Then insulation resistance at 500V DC - Table 64 says minimum 1 megohm but you want to see way higher, ideally 50MΩ+. Anything under 2MΩ needs investigating. Then polarity check, then the live tests - Zs test (max 1.44Ω for your B32), RCD trip time test (must trip under 300ms at 30mA), and functional tests."

Keep it friendly but technically accurate with exact regulation numbers and values.`;

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    const responseContent = assistantMessage.content || 'Testing guidance complete.';

    // Extract citations from response
    const citations: any[] = [];
    const regMatches = responseContent.matchAll(/(?:Reg|BS 7671)\s*(\d{3}(?:\.\d+)?)/gi);
    for (const match of regMatches) {
      citations.push({
        number: `Reg ${match[1]}`,
        title: `BS 7671 Regulation ${match[1]}`
      });
    }

    return new Response(JSON.stringify({
      response: responseContent,
      citations,
      confidence: 0.85,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in commissioning-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Commissioning agent failed',
      response: 'Unable to process testing request. Standard BS 7671 Part 6 testing applies.',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
