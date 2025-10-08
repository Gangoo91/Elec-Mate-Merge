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

    // RAG - Get inspection & testing knowledge from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} inspection testing EICR fault diagnosis BS 7671 Part 6 test procedures`;
    
    console.log(`🔍 RAG: Searching inspection knowledge for: ${ragQuery}`);
    
    // Generate embedding for inspection knowledge search
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

    let inspectionKnowledge = '';
    let bs7671Knowledge = '';
    
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      // Search inspection & testing knowledge
      const { data: knowledge, error: ragError } = await supabase.rpc('search_inspection_testing', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 8
      });

      if (!ragError && knowledge && knowledge.length > 0) {
        inspectionKnowledge = knowledge.map((k: any) => 
          `${k.topic} (${k.source}): ${k.content}`
        ).join('\n\n');
        console.log(`✅ Found ${knowledge.length} inspection guides`);
      }
      
      // Search BS 7671 for regulation details
      const { data: bs7671Docs, error: bs7671Error } = await supabase.rpc('search_bs7671', {
        query_embedding: embedding,
        match_threshold: 0.6,
        match_count: 5
      });

      if (!bs7671Error && bs7671Docs && bs7671Docs.length > 0) {
        bs7671Knowledge = bs7671Docs.map((d: any) => 
          `Regulation ${d.regulation_number} (${d.section}): ${d.content}`
        ).join('\n\n');
        console.log(`✅ Found ${bs7671Docs.length} BS 7671 regulations`);
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasInstaller = previousAgents.includes('installer');
    
    let systemPrompt = `You are an Inspection & Testing specialist providing expert analysis per BS 7671:2018+A2:2022.

FORMAT YOUR RESPONSE AS:

SAFETY CLASSIFICATION
Classification: [C1/C2/C3/FI]
Risk Level: [Immediate danger/Potentially dangerous/Improvement recommended/Further investigation]
BS 7671: [Specific regulation violated]

FAULT ANALYSIS
[Detailed description of fault and why it violates BS 7671]
Safety Implications: [What could go wrong - shock, fire, etc.]

TESTING REQUIRED (BS 7671 Part 6)
Dead Tests:
- [Specific test] - Expected result: [value]
- [Test procedure per Regulation 64X.X]

Live Tests (if required):
- [Specific test] - Expected result: [value]
- Safety precautions per Regulation 643.3

Test Equipment: [Required per Regulation 642.2]

REGULATORY COMPLIANCE
[BS 7671 clauses violated with specific regulation numbers]
[GN3 guidance references if applicable]

REMEDIATION APPROACH
[High-level guidance - defer detailed installation steps to installer agent]
Estimated Complexity: [Simple/Moderate/Complex]

TIME TO RESOLVE: [X] hours for competent electrician

CRITICAL SAFETY CLASSIFICATIONS:
C1 - Danger present: Immediate risk of injury/death. Requires URGENT remedial action.
C2 - Potentially dangerous: Urgent remedial action required. Could become C1 if circumstances change.
C3 - Improvement recommended: Does not comply with BS 7671 but not immediately dangerous.
FI - Further Investigation: Cannot determine without additional testing or access.

BS 7671 PART 6 TESTING SEQUENCE:
1. CONTINUITY TESTS (Regulation 642.3)
   - Protective bonding conductors
   - Ring final circuit continuity
   - Protective conductor continuity

2. INSULATION RESISTANCE (Regulation 642.4)
   - Minimum 1.0 MΩ at 500V DC
   - Test between live conductors and earth

3. POLARITY (Regulation 642.6)
   - Verify correct connections at accessories
   - Check single-pole devices in phase conductor

4. EARTH FAULT LOOP IMPEDANCE (Regulation 642.7)
   - Zs measurement for ADS verification
   - Compare against maximum values in Table 41.5

5. RCD OPERATION (Regulation 642.8)
   - Trip time at rated residual current
   - Test at 1x and 5x IΔn

TEST EQUIPMENT REQUIREMENTS (Regulation 642.2):
- Low resistance ohmmeter (continuity)
- Insulation resistance tester (500V/1000V)
- Earth fault loop impedance tester
- RCD tester
- Proving unit (to verify safe isolation)

${inspectionKnowledge ? `
INSPECTION & TESTING KNOWLEDGE (from database):
${inspectionKnowledge}
` : ''}

${bs7671Knowledge ? `
BS 7671 REGULATION DETAILS:
${bs7671Knowledge}
` : ''}

Use professional language with UK English spelling. Cite specific regulations and test procedures. If user asks about remediation methods, suggest they consult the Installer Agent for detailed step-by-step guidance.`;

    if (hasInstaller) {
      systemPrompt += `\n\n📋 The Installer's already provided remediation guidance, so YOU focus on:
- Verifying the fault classification (C1/C2/C3/FI)
- Specific test procedures to CONFIRM the defect
- Test equipment requirements
- Expected test results (pass/fail criteria)
- Safety precautions during testing`;
    }

    systemPrompt += `\n\n💬 Guide them through the inspection & testing process like you're mentoring an apprentice on their first EICR.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${lovableApiKey}`, 
        'Content-Type': 'application/json' 
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
        max_completion_tokens: 3500
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({
      response: data.choices[0]?.message?.content || 'Inspection analysis complete.',
      confidence: 0.92
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Inspector agent error:', error);
    return new Response(JSON.stringify({ 
      response: 'Unable to provide inspection guidance.', 
      confidence: 0.3 
    }), {
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
