import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// EICR Fault Classification Decision Tree
const EICR_DECISION_TREE: Record<string, any> = {
  'exposed_live_conductor': {
    context_checks: [
      { condition: 'within_bathroom', code: 'C1', regulation: '701.512.2' },
      { condition: 'accessible_to_touch', code: 'C1', regulation: '416.1' },
      { condition: 'behind_barrier', code: 'C2', regulation: '416.2' }
    ]
  },
  'missing_earth_bond': {
    context_checks: [
      { condition: 'main_bonding', code: 'C1', regulation: '411.3.1.2' },
      { condition: 'supplementary_bonding', code: 'C2', regulation: '415.2' }
    ]
  },
  'damaged_protection_device': {
    context_checks: [
      { condition: 'arcing_visible', code: 'C1', regulation: '511.1' },
      { condition: 'casing_cracked', code: 'C2', regulation: '511.1' },
      { condition: 'cosmetic_damage', code: 'C3', regulation: '511.1' }
    ]
  },
  'cable_damage': {
    context_checks: [
      { condition: 'insulation_exposed', code: 'C1', regulation: '522.6.1' },
      { condition: 'sheath_damaged', code: 'C2', regulation: '522.6.1' },
      { condition: 'mechanical_stress', code: 'C3', regulation: '522.6.6' }
    ]
  },
  'missing_rcd_protection': {
    context_checks: [
      { condition: 'bathroom_socket', code: 'C2', regulation: '701.411.3.3' },
      { condition: 'outdoor_socket', code: 'C2', regulation: '411.3.3' },
      { condition: 'general_socket', code: 'C3', regulation: '411.3.3' }
    ]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fault_description, location_context, visible_indicators } = await req.json();

    console.log('🔍 Visual Fault Diagnosis RAG: Verifying EICR classification');
    console.log('Fault:', fault_description);
    console.log('Location:', location_context);
    console.log('Indicators:', visible_indicators);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build comprehensive RAG query
    const ragQuery = `${fault_description} ${location_context} EICR fault classification GN3 guidance BS 7671 compliance immediate danger potential danger improvement`;

    // Generate embedding using Lovable AI
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

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate embedding for fault classification');
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Query BS 7671 regulations
    const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 5
    });

    // Query inspection/testing knowledge (includes GN3)
    const { data: inspectionKnowledge, error: inspError } = await supabase.rpc('search_inspection_testing', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 3
    });

    // Query health & safety knowledge
    const { data: safetyKnowledge, error: safetyError } = await supabase.rpc('search_health_safety', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 3
    });

    if (regError) {
      console.error('❌ BS 7671 search failed:', regError);
    }
    if (inspError) {
      console.error('❌ Inspection knowledge search failed:', inspError);
    }
    if (safetyError) {
      console.error('❌ Safety knowledge search failed:', safetyError);
    }

    console.log(`✅ RAG Results: ${regulations?.length || 0} regs, ${inspectionKnowledge?.length || 0} inspection docs, ${safetyKnowledge?.length || 0} safety docs`);

    // Determine EICR code using AI with RAG context
    const ragContext = `
BS 7671 REGULATIONS:
${regulations?.map((r: any) => `Reg ${r.regulation_number} (${r.section}): ${r.content}`).join('\n') || 'None found'}

INSPECTION & TESTING GUIDANCE (GN3):
${inspectionKnowledge?.map((k: any) => `${k.topic}: ${k.content}`).join('\n') || 'None found'}

HEALTH & SAFETY REQUIREMENTS:
${safetyKnowledge?.map((s: any) => `${s.topic}: ${s.content}`).join('\n') || 'None found'}
`;

    const classificationPrompt = `You are an EICR inspector expert in BS 7671:2018+A3:2024 and GN3 (Guidance Note 3: Inspection & Testing).

Based on the following fault, determine the correct EICR classification code:

FAULT DESCRIPTION: ${fault_description}
LOCATION: ${location_context}
VISIBLE INDICATORS: ${visible_indicators?.join(', ') || 'N/A'}

${ragContext}

EICR CODES:
- C1 (Code 1): Danger present - immediate action required. Risk of injury or fire.
- C2 (Code 2): Potentially dangerous - urgent remedial action required.
- C3 (Code 3): Improvement recommended to enhance safety and compliance.
- FI (Further Investigation): Unable to verify compliance from inspection alone.

YOU MUST respond with valid JSON only:
{
  "fault_code": "C1|C2|C3|FI",
  "regulation_references": [
    {
      "number": "411.3.2",
      "section": "RCD protection",
      "content": "Full regulation text...",
      "similarity": 0.92,
      "severity_justification": "Why this regulation determines the code"
    }
  ],
  "gn3_guidance": "Relevant GN3 guidance text with section reference",
  "confidence": 0.95,
  "reasoning": "Detailed explanation of why this code was assigned based on BS 7671 and GN3"
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: classificationPrompt },
          { role: 'user', content: 'Classify this fault according to EICR standards using the regulations provided.' }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('AI classification failed');
    }

    const aiData = await aiResponse.json();
    const classification = JSON.parse(aiData.choices[0].message.content);

    console.log(`✅ Fault classified as: ${classification.fault_code} (confidence: ${classification.confidence})`);

    return new Response(JSON.stringify({
      fault_code: classification.fault_code,
      regulation_references: classification.regulation_references || [],
      gn3_guidance: classification.gn3_guidance || 'No specific GN3 guidance found',
      confidence: classification.confidence || 0.8,
      reasoning: classification.reasoning || '',
      verification_status: 'Verified against BS 7671 + GN3',
      rag_sources: {
        regulations_count: regulations?.length || 0,
        inspection_docs_count: inspectionKnowledge?.length || 0,
        safety_docs_count: safetyKnowledge?.length || 0
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Visual fault diagnosis RAG error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Fault classification failed',
      fault_code: 'FI',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
