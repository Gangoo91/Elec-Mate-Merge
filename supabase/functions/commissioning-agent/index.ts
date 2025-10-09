import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { getTestSequence } from "../shared/bs7671TestingRequirements.ts";
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
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    console.log('✅ Commissioning Agent: Processing testing query');

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const hasInstaller = previousAgents.includes('installer');

    // RAG - Get testing regulations from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} testing commissioning insulation resistance earth fault loop RCD Chapter 64`;
    
    console.log(`🔍 RAG query: "${ragQuery}"`);
    
    // Generate embedding for testing regulations search
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

    let testingRegulations = '';
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      const { data: regulations, error: ragError } = await supabase.rpc('search_bs7671', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 10
      });

      if (!ragError && regulations && regulations.length > 0) {
        testingRegulations = regulations.map((r: any) => 
          `Reg ${r.regulation_number} (${r.section}): ${r.content}`
        ).join('\n\n');
        console.log(`✅ Found ${regulations.length} testing regulations`);
      } else {
        console.log('⚠️ No relevant regulations found');
      }
    }

    // Build testing context from BS 7671 Chapter 64
    const testSequence = getTestSequence();
    const testContext = testSequence.map(t => 
      `${t.testNumber}. ${t.testName} (${t.regulation}): ${t.passFailCriteria}`
    ).join('\n');
    
    let systemPrompt = `You are an on-site Testing & Commissioning Specialist with 20+ years BS 7671 experience. Provide PRACTICAL STEP-BY-STEP testing procedures, not just theory.

RESPONSE FORMAT - Practical On-Site Testing Procedures:

When asked about testing, provide PRACTICAL PROCEDURES in this format:

**Testing Circuit [Name]**

**STEP 1: SAFE ISOLATION (Reg 537.2)**
🔒 Procedure:
- Lock off MCB [number] in consumer unit
- Test dead with voltage indicator at circuit outlet
- Apply 'Danger - Do Not Switch On' label
- Duration: 2-3 minutes

⚠️ Common Mistake: Not testing EVERY circuit - borrowed neutrals are common!

**STEP 2: CONTINUITY (R1+R2) - Reg 643.2**
🔧 Meter Setup:
- Function: Ω (Resistance)
- Range: 200Ω
- Lead Check: Short leads together = 0.00Ω (subtract from reading)

📍 Test Procedure:
1. Link Line to Earth at distribution board
2. Test at furthest socket/point
3. Record reading: _____ Ω

✅ Target: <[calculated value]Ω for [cable size] / [CPC size]
⚠️ Fail if: >1.5× expected value
📝 Record: EIC Schedule Column 13

Common Mistakes:
- Not accounting for lead resistance (~0.02Ω)
- Testing wrong socket (must be furthest from DB)
- Forgetting to unlink after test

**STEP 3: INSULATION RESISTANCE - Reg 643.3, Table 64**
🔧 Meter Setup:
- Function: MΩ (Insulation)
- Test Voltage: 500V DC (for 230V circuits)
- Safety: Disconnect sensitive equipment (dimmers, LEDs, electronics)

📍 Test Procedure:
1. Link Live & Neutral together
2. Test L+N to Earth: _____ MΩ
3. Separate L & N
4. Test L to N: _____ MΩ

✅ Minimum (BS 7671 Table 64): ≥1.0 MΩ
✅ Expected (new install): 50-200 MΩ
⚠️ Investigate if: <2 MΩ (possible dampness/cable damage)

Troubleshooting Low IR:
- Check for wet plaster (allow 48hrs drying)
- Test individual cables (disconnect at accessories)
- Inspect terminations for damaged insulation

**STEP 4: POLARITY - Reg 643.4**
🔧 Test Method:
- Verify phase conductor to centre pin (ES lamps)
- Switch interrupts phase conductor ONLY
- Check socket orientation (L-R, N-L, E-top)

✅ Pass: Correct polarity throughout
⚠️ Critical: Reversed polarity = FAIL (shock risk)

**STEP 5: EARTH FAULT LOOP IMPEDANCE (Zs) - Reg 643.7**
🔧 Meter Setup:
- Function: LOOP (Zs)
- No-trip mode: ON (if testing live)

📍 Test Procedure:
1. Test at origin (consumer unit) for Ze: _____ Ω
2. Test at furthest circuit point for Zs: _____ Ω
3. Verify: Zs ≈ Ze + R1+R2

✅ Max Zs for B32 MCB: 1.44Ω (BS 7671 Table 41.3)
✅ Max Zs for C32 MCB: 0.72Ω
✅ Max Zs for B16 MCB: 2.87Ω
⚠️ Fail if: >80% of maximum Zs

Expected Reading: [calculated Ze] + [R1+R2] = [expected Zs]Ω

**STEP 6: RCD OPERATION - Reg 643.8**
🔧 Test Procedure:
- Test at 1× IΔn (e.g., 30mA): Trip time ≤300ms
- Test at 5× IΔn (e.g., 150mA): Trip time ≤40ms
- Verify mechanical trip operates

✅ Pass: Both trip times within limits AND RCD trips
⚠️ Fail: Slow trip or no disconnection

**STEP 7: FUNCTIONAL TESTING**
- Energise circuit
- Verify all equipment operates correctly
- Check accessories for loose connections
- Test switches and controls

${testingRegulations ? `
BS 7671 TESTING REGULATIONS (from knowledge base):
${testingRegulations}
` : ''}

RECORD SHEET TEMPLATE:
Circuit: _______  MCB: _______  Cable: _______ / _______ mm²
R1+R2: _____ Ω  |  IR (L-E): _____ MΩ  |  IR (N-E): _____ MΩ  |  IR (L-N): _____ MΩ
Polarity: ☐ PASS  |  Ze: _____ Ω  |  Zs: _____ Ω (Max: _____Ω)
RCD 1×: _____ ms  |  RCD 5×: _____ ms  |  Overall: ☐ PASS ☐ FAIL

Always provide meter settings, target values, common mistakes, and troubleshooting. Use UK English (energised not energized). Keep it practical and conversational but technically accurate.`;

    if (hasDesigner || hasInstaller) {
      systemPrompt += `\nThey've covered the design${hasInstaller ? ' and installation' : ''}, so focus on TESTING - the 7-step sequence, expected readings, and pass/fail criteria. Use the EXACT values from BS 7671 tables.`;
    }

    systemPrompt += `\n\nWalk them through conversationally with REAL numbers: "Right so first up is continuity - Reg 643.2. You're testing the protective conductor path, should be well under 0.05 ohms for that cable run. Record your R1+R2 value - you'll need it later for Zs calcs. Then insulation resistance at 500V DC - Table 64 says minimum 1 megohm but you want to see way higher, ideally 50MΩ+. Anything under 2MΩ needs investigating."

Keep it friendly but technically accurate with exact regulation numbers and values.`;

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
        max_completion_tokens: 3000 // INCREASED for comprehensive testing guidance
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0]?.message?.content || 'Testing guidance complete.';

    // Extract citations
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
    console.error('❌ Commissioning agent error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Commissioning agent failed',
      response: 'Unable to process testing request.',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
