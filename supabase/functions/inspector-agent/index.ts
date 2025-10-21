// INSPECTOR AGENT - Testing and inspection guidance
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { validateAgentRequest } from '../_shared/validation.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { safeAll } from '../_shared/safe-parallel.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'inspector-agent' });

  try {
    const { messages, context, userContext } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new ValidationError('LOVABLE_API_KEY not configured');

    logger.info('Inspector Agent processing', { messageCount: messages?.length });

    // RAG - Get inspection & testing knowledge from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} inspection testing EICR fault diagnosis BS 7671 Part 6 test procedures`;
    
    logger.debug('RAG query for inspection knowledge', { query: ragQuery });
    
    // Generate embedding for inspection knowledge search with retry + timeout
    const embeddingResponse = await logger.time(
      'Lovable AI embedding generation',
      () => withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: ragQuery,
            }),
          }),
          Timeouts.STANDARD,
          'Lovable AI embedding generation'
        ),
        RetryPresets.STANDARD
      )
    );

    let inspectionKnowledge = '';
    let bs7671Knowledge = '';
    
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      // Search inspection & testing knowledge and BS 7671 in parallel with timeout
      const { successes, failures } = await safeAll([
        {
          name: 'Inspection knowledge',
          execute: () => withTimeout(
            supabase.rpc('search_inspection_testing', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 8
            }),
            Timeouts.STANDARD,
            'Inspection knowledge search'
          )
        },
        {
          name: 'BS 7671 regulations',
          execute: () => withTimeout(
            supabase.rpc('search_bs7671', {
              query_embedding: embedding,
              match_threshold: 0.6,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'BS 7671 search'
          )
        }
      ]);

      // Extract inspection knowledge
      const inspectionResult = successes.find(s => s.name === 'Inspection knowledge');
      const knowledge = inspectionResult?.result?.data;

      if (knowledge && knowledge.length > 0) {
        inspectionKnowledge = knowledge.map((k: any) => 
          `${k.topic} (${k.source}): ${k.content}`
        ).join('\n\n');
        logger.info('Found inspection guides', { count: knowledge.length });
      }
      
      // Extract BS 7671 regulations
      const bs7671Result = successes.find(s => s.name === 'BS 7671 regulations');
      const bs7671Docs = bs7671Result?.result?.data;

      if (bs7671Docs && bs7671Docs.length > 0) {
        bs7671Knowledge = bs7671Docs.map((d: any) => 
          `Regulation ${d.regulation_number} (${d.section}): ${d.content}`
        ).join('\n\n');
        logger.info('Found BS 7671 regulations', { count: bs7671Docs.length });
      }

      // Log failures without blocking
      if (failures.length > 0) {
        logger.warn('Some knowledge base queries failed', { failures: failures.map(f => f.name) });
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasInstaller = previousAgents.includes('installer');
    
    // Prepend user context if provided
    const contextPrefix = userContext 
      ? `\n\n**PROJECT CONTEXT PROVIDED BY USER:**\n${userContext}\n\nUse this context to inform your analysis and tailor your diagnostic approach.\n\n---\n\n`
      : '';
    
    let systemPrompt = contextPrefix + `You are an Inspection & Testing specialist who thinks like a diagnostic electrician. Your FIRST priority is identifying the ROOT CAUSE and guiding the user to find what caused the fault.

**CRITICAL APPROACH - THINK LIKE A DIAGNOSTIC ELECTRICIAN**

## STEP 1: ROOT CAUSE ANALYSIS (ALWAYS START HERE)

**Fault Identification**
- What EXACTLY is the fault? (Be specific - e.g., "Damaged socket faceplate exposing live terminals" not just "socket damaged")
- WHERE is it located? (Circuit, zone, specific location)
- WHAT caused it? (Physical damage, age, poor installation, overload, environmental factors)
- WHY is it dangerous? (Specific risk - direct contact, fire, shock potential)

**Diagnostic Questions to Ask**
- Is this fault isolated or could it indicate a wider problem?
- What else should I check on this circuit/system?
- What would cause THIS specific fault?

## STEP 2: DIAGNOSTIC APPROACH (HOW TO FIND ROOT CAUSE)

**Investigation Strategy**
- What should I visually inspect to confirm the cause?
- What signs indicate this specific fault type? (Overheating marks, mechanical damage, water ingress, etc.)
- Is this symptomatic of other issues? (e.g., loose connection → check ALL connections on circuit)
- What environmental factors contributed? (Moisture, heat, vibration, age)

**Pattern Recognition**
- Is this a common failure mode for this equipment/circuit type?
- What related faults often occur together?

## STEP 3: SAFETY CLASSIFICATION

**Classification**: [C1/C2/C3/FI]
**Risk Level**: [Immediate danger/Potentially dangerous/Improvement recommended]
**BS 7671 Violation**: [Specific regulation number]
**Safety Implications**: [Exact risk - shock, fire, arc flash potential]

## STEP 4: VERIFICATION TESTS (ONLY AFTER ROOT CAUSE IDENTIFIED)

**Dead Tests** (Regulation 642.3-642.6)
- [Specific test] - What we're checking: [Why this test confirms the fault]
- Expected result: [Value/condition]
- Pass/Fail criteria: [BS 7671 reference]

**Live Tests** (if required - Regulation 642.7-642.8)
- [Specific test] - What we're checking: [Why this matters]
- Expected result: [Value]
- Safety precautions per Regulation 643.3

**Test Equipment Required** (Regulation 642.2)
- [Specific tester needed and why]

## STEP 5: RECTIFICATION APPROACH

**Immediate Action Required**
- [What to do RIGHT NOW for safety]

**Proper Fix**
- [How to rectify the ROOT CAUSE, not just the symptom]
- Materials needed: [List]
- Estimated time: [X hours]
- Complexity: [Simple/Moderate/Complex]

**Verification After Fix**
- Which tests confirm the repair is successful?
- What readings should I expect?

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
          ...(agentContext?.structuredKnowledge ? [{
            role: 'system',
            content: agentContext.structuredKnowledge
          }] : [])
        ],
        max_completion_tokens: 10000
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
