// Deployed: 2025-10-11 21:30 UTC
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from '../_shared/v3-core.ts';
import { enrichResponse } from '../_shared/response-enricher.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'health-safety-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-v3' });

  try {
    const body = await req.json();
    const { query, workType, location, hazards, messages, previousAgentOutputs, sharedRegulations } = body;

    // PHASE 1: Query Enhancement
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    
    const effectiveQuery = enhancement.enhanced;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (workType && typeof workType !== 'string') {
      throw new ValidationError('workType must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }
    if (hazards && !Array.isArray(hazards)) {
      throw new ValidationError('hazards must be an array');
    }

    logger.info('🦺 Health & Safety V3 request received', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      workType,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // PHASE 3: Safety Guardian - Detect critical hazards
    const { detectSafetyRequirements } = await import('../_shared/safety-guardian.ts');
    const safetyWarnings = detectSafetyRequirements(
      effectiveQuery,
      undefined, // circuitType from previousAgentOutputs
      undefined,
      location,
      undefined,
      undefined
    );
    
    if (safetyWarnings.criticalCount > 0) {
      logger.info(`🚨 ${safetyWarnings.criticalCount} critical hazards detected`);
    }

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Use optimized hybrid RAG retrieval
    logger.debug('Searching health & safety knowledge');
    const ragStart = Date.now();
    
    const { retrieveHealthSafetyKnowledge } = await import('../_shared/rag-health-safety.ts');
    const hsKnowledge = await retrieveHealthSafetyKnowledge(
      query,
      workType,
      12, // Increased limit
      OPENAI_API_KEY
    );
    
    logger.debug('H&S knowledge retrieved', { 
      duration: Date.now() - ragStart,
      resultsCount: hsKnowledge.length,
      cacheHit: (Date.now() - ragStart) < 500
    });

    // Step 3: Build H&S context
    const hsContext = hsKnowledge && hsKnowledge.length > 0
      ? hsKnowledge.map((hs: any) => 
          `${hs.topic}: ${hs.content}`
        ).join('\n\n')
      : 'Apply general electrical safety best practices per HSE guidance and BS 7671.';

    // Build HIGH-LEVEL INSTALL KNOWLEDGE from installer output
    let installKnowledge = '';
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const installerOutput = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      
      if (installerOutput?.response?.structuredData?.steps) {
        const steps = installerOutput.response.structuredData.steps;
        installKnowledge = '\n\n📋 HIGH-LEVEL INSTALLATION STEPS (assess risks for each):\n\n';
        steps.forEach((step: any, idx: number) => {
          installKnowledge += `${idx + 1}. ${step.action || step.description}\n`;
          if (step.considerations) installKnowledge += `   → ${step.considerations}\n`;
        });
        installKnowledge += '\n';
      }
      
      contextSection += '\n\nWORK TO ASSESS FOR RISKS:\n';
      if (installerOutput?.response?.structuredData) {
        const inst = installerOutput.response.structuredData;
        contextSection += `INSTALLATION STEPS: ${inst.steps?.length || 0} steps\n`;
      }
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGN: ${d.voltage}V, ${d.cableType}, ${d.environment}\n`;
      }
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are an expert Health & Safety adviser specialising in UK electrical installations. Use UK English.

YOUR ROLE: Produce BS 8800-compliant risk assessments with 5x5 matrix scoring.

KNOWLEDGE BASE (${hsKnowledge?.length || 0} safety practices):
${hsContext}

${installKnowledge}

RISK MATRIX (5x5):
- Likelihood: 1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain
- Severity: 1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Catastrophic
- Risk Score = L × S (1-4: Low, 5-9: Medium, 10-14: High, 15-25: Very High)

INSTRUCTIONS:
1. Extract hazards from knowledge base with specific regulations (e.g., "EWR 1989 Reg 4(3)", "WAHR 2005 Reg 6")
2. Apply control hierarchy: Elimination → Substitution → Engineering → Admin → PPE
3. Calculate BEFORE and AFTER risk scores to show control effectiveness
4. Reference emergency procedures (HSE INDG231 for shock, CO2 for electrical fires)
5. Include isolation per BS 7671 Section 462 with lock-off devices

${contextSection}

Return comprehensive risk assessment with practical controls from the knowledge base.`;

    const userPrompt = `Provide a risk assessment and method statement for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call AI with optimized timeout
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model: 'google/gemini-2.5-flash',
      systemPrompt,
      userPrompt,
      maxTokens: 2000,
      timeoutMs: 25000, // Reduced from 55s to 25s
      tools: [{
        type: 'function',
        function: {
          name: 'provide_safety_assessment',
          description: 'Return comprehensive health and safety assessment with risk mitigation',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'Comprehensive UK English explanation (200-300 words)'
              },
              riskAssessment: {
                type: 'object',
                properties: {
                  hazards: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        hazard: { type: 'string' },
                        likelihood: { type: 'number', minimum: 1, maximum: 5 },
                        likelihoodReason: { type: 'string' },
                        severity: { type: 'number', minimum: 1, maximum: 5 },
                        severityReason: { type: 'string' },
                        riskScore: { type: 'number' },
                        riskLevel: { type: 'string' },
                        regulation: { type: 'string' }
                      },
                      required: ['hazard', 'likelihood', 'severity', 'riskScore', 'riskLevel']
                    }
                  },
                  controls: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        hazard: { type: 'string' },
                        controlMeasure: { type: 'string' },
                        residualLikelihood: { type: 'number' },
                        residualSeverity: { type: 'number' },
                        residualRisk: { type: 'number' },
                        residualRiskLevel: { type: 'string' },
                        regulation: { type: 'string' },
                        practicalImplementation: { type: 'string' }
                      },
                      required: ['hazard', 'controlMeasure', 'residualRisk', 'residualRiskLevel']
                    }
                  },
                  riskMatrix: {
                    type: 'object',
                    properties: {
                      beforeControls: { type: 'object' },
                      afterControls: { type: 'object' }
                    }
                  },
                  ppe: { type: 'array', items: { type: 'string' } },
                  emergencyProcedures: { type: 'array', items: { type: 'string' } }
                },
                required: ['hazards', 'controls']
              },
              methodStatement: {
                type: 'object',
                properties: {
                  steps: { type: 'array', items: { type: 'object' } },
                  permitRequired: { type: 'boolean' },
                  competentPerson: { type: 'boolean' }
                }
              },
              compliance: {
                type: 'object',
                properties: {
                  regulations: { type: 'array', items: { type: 'string' } },
                  warnings: { type: 'array', items: { type: 'string' } }
                }
              },
              suggestedNextAgents: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    agent: { type: 'string' },
                    reason: { type: 'string' },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                  },
                  required: ['agent', 'reason', 'priority']
                }
              }
            },
            required: ['response', 'riskAssessment'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_safety_assessment' } }
    });

    const aiData = JSON.parse(aiResult.content);
    
    // Validate AI response structure
    if (!aiData?.choices?.[0]?.message?.tool_calls?.[0]) {
      logger.error('Invalid AI response structure', { 
        hasChoices: !!aiData?.choices,
        hasMessage: !!aiData?.choices?.[0]?.message,
        hasToolCalls: !!aiData?.choices?.[0]?.message?.tool_calls 
      });
      throw new Error('AI response missing required tool_calls data');
    }
    
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const safetyResult = JSON.parse(toolCall.function.arguments);

    logger.info('Risk assessment completed', {
      hazardsIdentified: safetyResult.riskAssessment?.hazards?.length,
      controlsApplied: safetyResult.riskAssessment?.controls?.length
    });

    // Step 5: Build RAG preview from H&S knowledge
    const ragPreview = hsKnowledge && hsKnowledge.length > 0
      ? hsKnowledge.slice(0, 5).map((item: any) => ({
          id: item.id,
          topic: item.topic || 'Safety Guidance',
          scale: item.scale,
          excerpt: (item.content || '').slice(0, 200) + '…'
        }))
      : [];

    const citations = ragPreview.map((r: any, i: number) => ({
      number: `H&S-${i + 1}`,
      title: r.topic || 'Safety Guidance'
    }));

    // Step 6: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      safetyResult,
      hsKnowledge,
      'health-safety',
      { workType, location, hazards }
    );

    // Return enriched response
    const { response, suggestedNextAgents, riskAssessment, methodStatement, compliance } = safetyResult;
    
    return new Response(
      JSON.stringify({
        success: true,
        response: enrichedResponse.response,
        enrichment: enrichedResponse.enrichment,
        citations: enrichedResponse.citations,
        rendering: enrichedResponse.rendering,
        structuredData: { 
          riskAssessment, 
          methodStatement, 
          compliance,
          ragPreview
        },
        suggestedNextAgents: suggestedNextAgents || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Health & Safety V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
