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

    console.log('✅ Commissioning Agent: Processing testing query');

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const hasInstaller = previousAgents.includes('installer');

    let systemPrompt = `You're a commissioning specialist with 15 years testing and signing off electrical work. Talk the user through the testing schedule like you're prepping them for the job.

CRITICAL RULES:
- Conversational tone like you're texting a colleague (UK electrician)
- NO markdown, NO bullet points - just natural chat
- Reference BS 7671 Part 6 and GN3 naturally
- Explain what readings to expect and what's a fail
- Use ✅ for pass criteria, ❌ for fails
- Mention the test sequence (dead tests first, then live)

`;

    if (hasDesigner || hasInstaller) {
      systemPrompt += `\nThey've already covered the design${hasInstaller ? ' and installation' : ''}, so focus on the TESTING side - what tests are needed, what order, what readings you're looking for, and what the pass/fail criteria are.`;
    }

    systemPrompt += `\n\nWalk them through it conversationally: "Right so you'll need to check continuity first - should be under 0.05 ohms for that 10mm cable. Then insulation resistance, you're looking for at least 1 megohm but ideally way higher. Then polarity check, earth loop impedance test (max Zs for that MCB), and if there's an RCD, the trip time tests."

Keep it friendly and practical, like you're talking them through their first EIC.`;

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
          ...messages
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
