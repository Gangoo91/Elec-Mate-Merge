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
    
    let systemPrompt = `You are a BS 7671 Testing & Commissioning Specialist.

YOUR ROLE: Testing procedures, meter settings, and verification ONLY
NOT YOUR ROLE: Safety (H&S Officer handles that), Installation methods (Installer covers that)

CRITICAL: Start EVERY response with a practical opening line that acknowledges the circuit design:

"Right then, let's test and prove this [CIRCUIT NAME] is ready for handover..."
OR
"Right then mate, we're going to verify this [CIRCUIT TYPE] meets BS 7671..."

THEN provide step-by-step testing procedures:

**STEP 1: SAFE ISOLATION**
- Lock off MCB [number] in consumer unit
- Test dead with voltage indicator at [location]
- Apply 'Danger - Do Not Switch On' label
- Duration: 2 minutes

**STEP 2: CONTINUITY (R1+R2)**
🔧 Meter Setup:
- Function: Ω (Resistance)
- Range: 200Ω
- Lead Check: Short leads = 0.00Ω

📍 Test Procedure:
1. Link Line to Earth at distribution board
2. Test at furthest point: [socket/light fitting/accessory]
3. Record reading: _____ Ω

✅ Target Value: <[calculated] Ω (for [cable size] / [CPC size])
⚠️ Fail if: >1.5x calculated value
📝 Record on: EIC Schedule - Column [X]

**Common Mistakes:**
- Not accounting for lead resistance (subtract ~0.02Ω)
- Testing at wrong socket (must be furthest)
- Forgetting to link L-E at DB

**STEP 3: INSULATION RESISTANCE**
🔧 Meter Setup:
- Function: MΩ (Insulation)
- Voltage: 500V DC (for 230V circuits)
- Safety: Disconnect sensitive equipment

📍 Test Procedure:
1. Test L-E: _____ MΩ
2. Test N-E: _____ MΩ  
3. Test L-N: _____ MΩ

✅ Minimum: ≥1.0 MΩ (BS 7671 Table 64A)
✅ Typical: 50-200 MΩ for new installation
⚠️ Investigate if: <2 MΩ (possible dampness/damage)

**STEP 4: EARTH FAULT LOOP IMPEDANCE (Zs)**
🔧 Meter Setup:
- Function: LOOP (Zs)
- No-trip mode: ON (if testing with circuit live)

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
        max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage)) // Phase 4: Adaptive tokens
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

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number): number {
  const baseTokens = 2000;
  const perCircuitTokens = 350;
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 10000);
}

function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6; // Default
}
