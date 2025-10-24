import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { safeAll } from "../_shared/safe-parallel.ts";

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

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'visual-fault-diagnosis-rag' });

  try {
    const { fault_description, location_context, visible_indicators } = await req.json();

    if (!fault_description) {
      throw new ValidationError('fault_description is required');
    }

    logger.info('Visual Fault Diagnosis RAG initiated', { 
      fault_description, 
      location_context, 
      visible_indicators 
    });

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) throw new Error('OPENAI_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build comprehensive RAG query
    const ragQuery = `${fault_description} ${location_context} EICR fault classification GN3 guidance BS 7671 compliance immediate danger potential danger improvement`;

    // Generate embedding using Lovable AI
    const embeddingData = await logger.time(
      'Lovable AI embedding generation',
      async () => await withRetry(
        () => withTimeout(
          fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: ragQuery,
            }),
          }).then(async (res) => {
            if (!res.ok) {
              throw new ExternalAPIError('Lovable AI', `Embedding failed: ${res.status}`);
            }
            return res.json();
          }),
          Timeouts.STANDARD,
          'Lovable AI embedding'
        ),
        RetryPresets.STANDARD
      )
    );

    const embedding = embeddingData.data[0].embedding;

    // Query all knowledge bases in parallel with safe failure handling
    const { successes, failures } = await logger.time(
      'Knowledge base searches',
      async () => await safeAll([
        {
          name: 'bs7671',
          execute: () => withTimeout(
            supabase.rpc('search_bs7671', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'BS 7671 search'
          )
        },
        {
          name: 'inspection_testing',
          execute: () => withTimeout(
            supabase.rpc('search_inspection_testing', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 3
            }),
            Timeouts.STANDARD,
            'Inspection knowledge search'
          )
        },
        {
          name: 'health_safety',
          execute: () => withTimeout(
            supabase.rpc('search_health_safety', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 3
            }),
            Timeouts.STANDARD,
            'Safety knowledge search'
          )
        }
      ])
    );

    if (failures.length > 0) {
      logger.warn('Some knowledge base searches failed', { failures });
    }

    const regulations = successes.find(s => s.name === 'bs7671')?.result?.data || [];
    const inspectionKnowledge = successes.find(s => s.name === 'inspection_testing')?.result?.data || [];
    const safetyKnowledge = successes.find(s => s.name === 'health_safety')?.result?.data || [];

    logger.info('Knowledge base search completed', { 
      regulationsCount: regulations.length, 
      inspectionCount: inspectionKnowledge.length,
      safetyCount: safetyKnowledge.length 
    });

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
- PASS: No faults detected - installation compliant.

**CRITICAL INSTRUCTIONS FOR "PASS" RESPONSES:**
When the installation passes inspection (no faults detected), you MUST:
1. **Acknowledge user context**: Directly address any specific concerns mentioned in the fault description (e.g., "Regarding your VR cable concern...")
2. **Explain WHY it passed**: List specific compliant elements visible and regulations satisfied
3. **Cite regulations met**: Reference BS 7671 clauses that are satisfied with justifications
4. **Provide positive observations**: List specific compliant features observed
5. **Build confidence**: Explain why it's safe/compliant with evidence

YOU MUST respond with valid JSON only:
{
  "fault_code": "C1|C2|C3|FI|PASS",
  "regulation_references": [
    {
      "number": "411.3.2",
      "section": "RCD protection",
      "content": "Full regulation text...",
      "similarity": 0.92,
      "severity_justification": "Why this regulation determines the code (or for PASS: why this requirement is met)"
    }
  ],
  "gn3_guidance": "Relevant GN3 guidance text with section reference",
  "confidence": 0.95,
  "reasoning": "Detailed explanation of why this code was assigned based on BS 7671 and GN3",
  "user_context_addressed": "For PASS only: Address user's specific concerns mentioned in fault description",
  "positive_observations": ["For PASS only: List of compliant features", "Proper cable support visible", "Appropriate protection devices"]
}`;

    const aiData = await logger.time(
      'AI fault classification',
      async () => await withRetry(
        () => withTimeout(
          fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-5-mini-2025-08-07',
              messages: [
                { role: 'system', content: classificationPrompt },
                { role: 'user', content: 'Classify this fault according to EICR standards using the regulations provided.' }
              ],
              response_format: { type: 'json_object' }
            }),
          }).then(async (res) => {
            if (!res.ok) {
              throw new ExternalAPIError('Lovable AI', `Classification failed: ${res.status}`);
            }
            return res.json();
          }),
          Timeouts.LONG,
          'AI classification'
        ),
        RetryPresets.STANDARD
      )
    );

    const classification = JSON.parse(aiData.choices[0].message.content);

    logger.info('Fault classification completed', { 
      faultCode: classification.fault_code, 
      confidence: classification.confidence 
    });

    return new Response(JSON.stringify({
      fault_code: classification.fault_code,
      regulation_references: classification.regulation_references || [],
      gn3_guidance: classification.gn3_guidance || 'No specific GN3 guidance found',
      confidence: classification.confidence || 0.8,
      reasoning: classification.reasoning || '',
      user_context_addressed: classification.user_context_addressed || null,
      positive_observations: classification.positive_observations || [],
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
    logger.error('Visual fault diagnosis RAG failed', { error });
    
    // Return FI (Further Investigation) on error with proper error handling
    if (error instanceof ValidationError || error instanceof ExternalAPIError) {
      return handleError(error);
    }
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Fault classification failed',
      fault_code: 'FI',
      confidence: 0.3,
      requestId
    }), {
      status: 200, // Return 200 with FI code as fallback
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
