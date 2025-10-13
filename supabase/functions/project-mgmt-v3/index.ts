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
      JSON.stringify({ status: 'healthy', function: 'project-mgmt-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'project-mgmt-v3' });

  try {
    const body = await req.json();
    const { query, projectType, scope, timeline, messages, previousAgentOutputs, sharedRegulations } = body;

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
    if (projectType && typeof projectType !== 'string') {
      throw new ValidationError('projectType must be a string');
    }
    if (scope && typeof scope !== 'string') {
      throw new ValidationError('scope must be a string');
    }
    if (timeline && typeof timeline !== 'string') {
      throw new ValidationError('timeline must be a string');
    }

    logger.info('📋 Project Manager V3 request received', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      projectType,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Use intelligent RAG with cross-encoder for PM knowledge
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    logger.debug('Starting intelligent RAG for project management');
    const ragStart = Date.now();
    
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
    const pmKnowledge = await intelligentRAGSearch(
      `${query} ${projectType || ''} project planning timeline coordination`,
      'project_mgmt_knowledge',
      8,
      OPENAI_API_KEY,
      supabase,
      logger
    );
    
    logger.debug('PM knowledge retrieved', { 
      duration: Date.now() - ragStart,
      count: pmKnowledge?.length || 0
    });

    // Step 3: Build PM context
    const pmContext = pmKnowledge && pmKnowledge.length > 0
      ? pmKnowledge.map((pm: any) => 
          `${pm.topic}: ${pm.content}`
        ).join('\n\n')
      : 'Apply general UK electrical project management best practices.';

    // Build conversation context with ALL SPECIALIST OUTPUTS
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nPROJECT DELIVERABLES TO COORDINATE:\n';
      
      const designer = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const cost = previousAgentOutputs.find((o: any) => o.agent === 'cost-engineer');
      const installer = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const hs = previousAgentOutputs.find((o: any) => o.agent === 'health-safety');
      const comm = previousAgentOutputs.find((o: any) => o.agent === 'commissioning');
      
      if (designer) contextSection += `✓ Design: ${designer.response?.structuredData?.circuitType || 'completed'}\n`;
      if (cost) contextSection += `✓ Costing: £${cost.response?.structuredData?.totalCost || 'TBC'}\n`;
      if (installer) contextSection += `✓ Installation: ${installer.response?.structuredData?.steps?.length || 0} steps\n`;
      if (hs) contextSection += `✓ H&S: ${hs.response?.structuredData?.risks?.length || 0} risks assessed\n`;
      if (comm) contextSection += `✓ Testing: ${comm.response?.structuredData?.tests?.length || 0} tests\n`;
      
      contextSection += '\n\nFULL SPECIALIST DATA:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are an expert electrical project manager applying PRINCE2/APM methodology.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You apply PRINCE2/APM methodology to electrical projects
- Use the PRINCE2/APM knowledge in RAG for project structure
- Provide ACCELERATION tips (how to speed up without cutting corners)
- Apply electrical-specific project sequencing (you can't commission before installation!)
- Include Part P notification timelines, DNO coordination, building control
- Identify CRITICAL PATH items (what delays the whole project)
- Coordinate all specialist outputs into a coherent delivery plan

Your task is to provide comprehensive project planning and coordination guidance.

CURRENT DATE: September 2025

PROJECT MANAGEMENT KNOWLEDGE DATABASE (YOU MUST USE THIS DATA):
${pmContext}

🔴 CRITICAL INSTRUCTIONS FOR PROJECT PLANNING:
1. EXTRACT typical durations from knowledge base:
   Example from database: "Consumer unit installation: 1-2 days for 10-way board"
   Your output: {"phase": "CU Installation", "duration": 1.5, "unit": "days"}
   
2. APPLY UK notification requirements from knowledge:
   - Building Control (Part P notification within 48 hours)
   - DNO notification (for supply modifications - 2 weeks notice)
   - CDM regulations (if >30 days or >500 person-days)
   
3. SEQUENCE phases based on electrical installation workflow:
   Phase 1: Design & Certification
   Phase 2: Material Procurement (identify long-lead items)
   Phase 3: First Fix (containment, cables) - MUST finish before plastering
   → INSPECTION HOLD POINT (building control)
   Phase 4: Second Fix (accessories, terminations)
   Phase 5: Dead Testing (before energisation)
   → COMPLIANCE HOLD POINT (EIC completion)
   Phase 6: Energisation & Live Testing
   Phase 7: Handover & Demonstration
   
4. RESOURCE all specialist outputs:
   ${previousAgentOutputs?.length || 0} specialists have provided data - coordinate them in your plan
   
5. INCLUDE compliance checkpoints:
   - First fix inspection (before covering)
   - Pre-energisation tests (dead tests)
   - Live testing (earth loop, RCD)
   - Final EIC completion
   
6. IDENTIFY PROJECT ACCELERATION OPPORTUNITIES:
   - Fast-track design and procurement in parallel
   - Pre-fabricate panels offsite
   - Coordinate building trades sequencing
   - Batch similar tasks to reduce tool changes
   - Overlap phases where safe (different areas)
   
7. DEFINE CRITICAL PATH clearly (what delays everything)

The PM knowledge contains ${pmKnowledge?.length || 0} verified planning practices. Apply them!

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "PRINCE2/APM project plan summary (200-300 words) covering business case, work breakdown, critical path, acceleration tips, compliance milestones, risk register, and resource plan",
  "projectPlan": {
    "phases": [
      {
        "phase": "Design & Planning",
        "duration": 5,
        "durationUnit": "days",
        "tasks": ["Circuit design", "Part P notification"],
        "dependencies": [],
        "milestones": ["Design sign-off"],
        "criticalPath": true
      }
    ],
    "totalDuration": 20,
    "totalDurationUnit": "days",
    "criticalPath": ["Material delivery", "First fix", "Inspection"],
    "acceleration": ["Fast-track procurement", "Pre-fabricate offsite"]
  },
  "resources": {
    "team": [
      {"role": "Electrician", "quantity": 2, "duration": 10}
    ],
    "equipment": ["Tool 1", "Tool 2"]
  },
  "compliance": {
    "notifications": ["Building Control", "DNO"],
    "certifications": ["EIC", "MWC"],
    "inspections": ["First fix", "Second fix"]
  },
  "risks": [
    {"risk": "Risk description", "mitigation": "Mitigation strategy", "severity": "Medium"}
  ],
  "recommendations": ["Key recommendation"],
  "suggestedNextAgents": []
}`;

    const userPrompt = `Provide a comprehensive project plan for:
${query}

${projectType ? `Project Type: ${projectType}` : ''}
${scope ? `Scope: ${scope}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Include phases, resources, compliance requirements, and risk management.`;

    // Step 4: Call AI with universal wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model: 'google/gemini-2.5-flash',
      systemPrompt,
      userPrompt,
      maxTokens: 2000,
      timeoutMs: 55000,
      tools: [{
        type: 'function',
        function: {
          name: 'provide_project_plan',
          description: 'Return comprehensive PRINCE2/APM project plan with phases and resources',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'PRINCE2/APM project plan summary (200-300 words)'
              },
              projectPlan: {
                type: 'object',
                properties: {
                  phases: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        phase: { type: 'string' },
                        duration: { type: 'number' },
                        durationUnit: { type: 'string' },
                        tasks: { type: 'array', items: { type: 'string' } },
                        dependencies: { type: 'array', items: { type: 'string' } },
                        milestones: { type: 'array', items: { type: 'string' } },
                        criticalPath: { type: 'boolean' }
                      },
                      required: ['phase', 'duration', 'tasks']
                    }
                  },
                  totalDuration: { type: 'number' },
                  totalDurationUnit: { type: 'string' },
                  criticalPath: { type: 'array', items: { type: 'string' } },
                  acceleration: { type: 'array', items: { type: 'string' } }
                }
              },
              resources: {
                type: 'object',
                properties: {
                  team: { type: 'array', items: { type: 'object' } },
                  equipment: { type: 'array', items: { type: 'string' } }
                }
              },
              compliance: {
                type: 'object',
                properties: {
                  notifications: { type: 'array', items: { type: 'string' } },
                  certifications: { type: 'array', items: { type: 'string' } },
                  inspections: { type: 'array', items: { type: 'string' } }
                }
              },
              risks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    risk: { type: 'string' },
                    mitigation: { type: 'string' },
                    severity: { type: 'string' }
                  },
                  required: ['risk', 'mitigation']
                }
              },
              recommendations: {
                type: 'array',
                items: { type: 'string' }
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
            required: ['response', 'projectPlan'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_project_plan' } }
    });

    const aiData = JSON.parse(aiResult.content);
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const pmResult = JSON.parse(toolCall.function.arguments);

    logger.info('Project plan completed', { 
      phasesCount: pmResult.projectPlan?.phases?.length,
      totalDuration: pmResult.projectPlan?.totalDuration
    });

    // Step 5: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      pmResult,
      pmKnowledge, // Already has confidence scores from rag-project-mgmt.ts
      'project-mgmt',
      { projectType, scope, timeline }
    );

    // Return enriched response
    const { response, suggestedNextAgents, projectPlan, resources, compliance, risks, recommendations } = pmResult;
    
    return new Response(
      JSON.stringify({
        success: true,
        response: enrichedResponse.response,
        enrichment: enrichedResponse.enrichment,
        citations: enrichedResponse.citations,
        rendering: enrichedResponse.rendering,
        structuredData: { projectPlan, resources, compliance, risks, recommendations },
        suggestedNextAgents: suggestedNextAgents || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Project Manager V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
