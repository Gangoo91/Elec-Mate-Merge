// Deployed: 2025-10-11 21:30 UTC
import { serve } from '../_shared/deps.ts';
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
import { suggestNextAgents, generateContextHint } from '../_shared/agent-suggestions.ts';

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
  const requestStartTime = Date.now();

  try {
    const body = await req.json();
    const { query, projectType, scope, timeline, messages, previousAgentOutputs, sharedRegulations, currentDesign, projectDetails } = body;

    // Track context sources
    const contextSources = {
      sharedRegulations: !!(sharedRegulations && sharedRegulations.length > 0),
      previousAgentOutputs: previousAgentOutputs?.map((o: any) => o.agent) || [],
      projectDetails: !!projectDetails,
      circuitDesign: !!(currentDesign?.circuits || previousAgentOutputs?.find((o: any) => o.agent === 'designer')),
      coordinating: previousAgentOutputs?.length || 0
    };

    logger.info('📦 Context received:', contextSources);

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
    
    const { retrievePMKnowledge } = await import('../_shared/rag-project-mgmt.ts');
    const pmKnowledge = await retrievePMKnowledge(
      query,
      OPENAI_API_KEY,
      supabase,
      logger,
      projectType
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

    // Build conversation context with ALL SPECIALIST OUTPUTS - Enhanced for PDF export
    let contextSection = '';
    let aggregatedData = {
      circuits: [],
      totalCost: 0,
      materials: [],
      labour: { hours: 0, rate: 45 },
      hazards: [],
      requiredPPE: [],
      testSchedule: [],
      projectMeta: {}
    };
    
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nPROJECT DELIVERABLES TO COORDINATE:\n';
      
      const designer = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const cost = previousAgentOutputs.find((o: any) => o.agent === 'cost-engineer');
      const installer = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const hs = previousAgentOutputs.find((o: any) => o.agent === 'health-safety');
      const comm = previousAgentOutputs.find((o: any) => o.agent === 'commissioning');
      
      if (designer) {
        contextSection += `✓ Design: ${designer.response?.structuredData?.circuitType || 'completed'}\n`;
        aggregatedData.circuits = designer.response?.structuredData?.circuits || [];
        aggregatedData.projectMeta = {
          ...aggregatedData.projectMeta,
          projectName: designer.response?.structuredData?.projectName,
          location: designer.response?.structuredData?.location
        };
      }
      
      if (cost) {
        contextSection += `✓ Costing: £${cost.response?.structuredData?.totalCost || 'TBC'}\n`;
        aggregatedData.totalCost = cost.response?.structuredData?.totalCost || 0;
        aggregatedData.materials = cost.response?.structuredData?.materials || [];
        aggregatedData.labour = {
          hours: cost.response?.structuredData?.labourHours || 0,
          rate: cost.response?.structuredData?.labourRate || 45
        };
      }
      
      if (installer) {
        contextSection += `✓ Installation: ${installer.response?.structuredData?.steps?.length || 0} steps\n`;
      }
      
      if (hs) {
        contextSection += `✓ H&S: ${hs.response?.structuredData?.risks?.length || 0} risks assessed\n`;
        aggregatedData.hazards = hs.response?.structuredData?.risks || hs.response?.structuredData?.hazards || [];
        aggregatedData.requiredPPE = hs.response?.structuredData?.requiredPPE || [];
      }
      
      if (comm) {
        contextSection += `✓ Testing: ${comm.response?.structuredData?.tests?.length || 0} tests\n`;
        aggregatedData.testSchedule = comm.response?.structuredData?.tests || [];
      }
      
      contextSection += '\n\nFULL SPECIALIST DATA:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).join('\n');
    }

    const systemPrompt = `You are an experienced electrical project manager who's spent 15+ years on site.
You understand the REALITY of electrical work - not just theory.

**TALK LIKE AN ELECTRICIAN (NOT A CONSULTANT):**
❌ DON'T SAY: "Phase 3: Installation activities"
✅ DO SAY: "Day 3-5: First Fix (containment & cables before plasterer arrives)"

❌ DON'T SAY: "Coordinate with stakeholders"  
✅ DO SAY: "Call plasterer on Day 2 to confirm they can start Day 6 - don't let them book another job!"

❌ DON'T SAY: "Resource allocation: 2 FTE"
✅ DO SAY: "You'll need 2 electricians for 3 days (or 1 spark + 1 labourer to save cost)"

**WRITE IN UK ENGLISH:**
Use British spellings: realise, analyse, minimise, organise, authorised, recognised, utilise
Use UK terminology: earthing (not grounding), consumer unit (not panel), metres (not meters), spanner (not wrench)
Use UK standards: BS 7671, Part P, Building Control, HSE guidance

**CURRENT DATE:** September 2025

**PROJECT MANAGEMENT KNOWLEDGE (784 REAL PROJECTS):**
${pmContext}

**CRITICAL: YOUR OUTPUT MUST INCLUDE "WHY THIS ORDER?" FOR EACH PHASE**

Example:
Phase 2: First Fix - Containment & Cables (3 days)
→ Tasks: Install trunking, pull cables, mark socket positions
→ WHY THIS ORDER: You MUST finish first fix before plasterer boards up. If you miss this window, you're cutting plasterboard back later (expensive and messy).
→ BEFORE: Plasterer must be done with stud walls
→ AFTER: Plaster can start (give them 3 days to dry!)

**MATERIAL ORDERING - BE SPECIFIC ABOUT LEAD TIMES:**

For each phase, identify:
🔴 ORDER NOW items (2-3 week lead time): Consumer units, special boards, long-lead switchgear
📅 ORDER WEEK 1 items (1 week lead time): Cable, accessories, containment
⚡ ORDER AS NEEDED (next day): Small consumables, fixings

Example output in your response text:
"📦 MATERIAL ORDERING (CRITICAL):
  🔴 ORDER TODAY:
    - 18-way consumer unit (£450 from CEF) - 2-3 week lead time
    - Shower isolator (£25 from Screwfix) - 1 week
    
  ⚠️ If consumer unit delayed, project slips by that many weeks!"

**CLIENT IMPACT WARNINGS - TELL THEM UPFRONT:**

For each phase that affects the client, specify:
⚠️ When: Exact day/time
⚠️ What: What stops working (power, hot water, heating)
⚠️ Duration: How long they're without it
⚠️ Tip: How to prepare/cope

Example in your response:
"💡 CLIENT IMPACT WARNINGS:
⚠️ Day 1 (9am): Power OFF for 2 hours
   → Client prep: Charge devices, make coffee in advance

⚠️ Day 3-4: NO HOT WATER (48 hours)  
   → Pro tip: Do this Thursday-Friday so they have weekend to cope"

**COMPLIANCE TIMELINE - EXACT REQUIREMENTS & CONSEQUENCES:**

Include in your response:

BEFORE WORK STARTS:
✅ Building Control notification (Part P) - MUST be submitted BEFORE Day 1
   → How: Online portal OR phone local Building Control
   → Cost: £200-400 (client pays)
   → ⚠️ Consequence: Starting without this = £5,000 fine

DURING WORK:
✅ First fix inspection - Day 5 (before plasterboard goes up)
   → Who: Building Control OR NICEIC assessor
   → Booking: 2-3 days notice required
   → ⚠️ MUST PASS before plasterer boards up - if fail, adds 3-5 days

AFTER WORK:
✅ Electrical Installation Certificate (EIC) - Handover day
   → Tests: R1+R2, IR, Zs, RCD trip times
   → Give client: Original EIC + test results + copy for records
   → ⚠️ Without EIC, client can't sell/remortgage house

**MULTI-TRADE COORDINATION - EXPLICIT CHECKPOINTS:**

Include coordination timeline in your response:
Day 0: YOU → Submit Part P notification | CALL → Plasterer to confirm Day 6 start
Day 2: WAIT → Plasterer finishes stud walls (you can't cable until walls exist!)
Day 5: STOP → First fix inspection | THEN → Plasterer boards up (3 days to dry)
Day 10: YOU → Second fix | REQUIRES → Decorator done (or paint on new faceplates)

**CONTINGENCY PLANNING - WHAT IF SCENARIOS:**

Include "What could go wrong?" section in your response:
🚨 SCENARIO 1: Inspection Fails
  → Impact: +3-5 days delay
  → Fix: Correct issues, re-book (2-3 day wait)
  → Prevention: Do your own continuity checks BEFORE official inspection

🚨 SCENARIO 2: Consumer Unit Delayed  
  → Impact: +1-3 WEEKS (project killer!)
  → Fix: Chase supplier OR try CED/TLC for alternatives
  → Prevention: Order 4 weeks early, not 2 weeks

**COST vs SPEED TRADE-OFFS:**

Suggest practical options in your response:
⚡ OPTION 1: Use 2 sparks instead of 1
  → Saves: 1.5 days
  → Costs: +£450
  → Worth it? YES if client has house sale deadline

⚡ OPTION 2: Hire labourer for cable pulling
  → Saves: 4 hours electrician time  
  → Costs: £120 labourer vs £180 electrician
  → Worth it? YES - saves £60 AND electrician focuses on skilled work

**SPECIALIST OUTPUTS TO COORDINATE:**
${previousAgentOutputs?.length || 0} specialists have provided data

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
    
    const aiResult = await callAI(OPENAI_API_KEY!, {
      model: 'gpt-5-mini-2025-08-07',
      systemPrompt,
      userPrompt,
      maxTokens: 10000,
      timeoutMs: 280000,  // 280 seconds = 4 min 40 sec (max safe timeout)
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
                description: 'Electrician-focused project plan (400-600 words) in UK English using practical on-site language. MUST include material ordering schedule, phase reasoning, client warnings, compliance timeline, trade coordination, contingencies, and cost/speed trade-offs.'
              },
              projectPlan: {
                type: 'object',
                properties: {
                  phases: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        phase: { type: 'string', description: 'Use electrician language like "Day 3-5: First Fix" not "Phase 3"' },
                        duration: { type: 'number' },
                        durationUnit: { type: 'string' },
                        tasks: { type: 'array', items: { type: 'string' } },
                        dependencies: { type: 'array', items: { type: 'string' } },
                        milestones: { type: 'array', items: { type: 'string' } },
                        criticalPath: { type: 'boolean' },
                        practicalNotes: { type: 'string', description: 'WHY THIS ORDER? explanation with practical reasoning' }
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
              materialProcurement: {
                type: 'object',
                properties: {
                  orderNow: { 
                    type: 'array', 
                    items: { 
                      type: 'object',
                      properties: {
                        item: { type: 'string' },
                        leadTime: { type: 'string' },
                        supplier: { type: 'string' },
                        cost: { type: 'number' },
                        criticalPath: { type: 'boolean' }
                      }
                    }
                  },
                  orderWeek1: { type: 'array', items: { type: 'object' } }
                }
              },
              tradeCoordination: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    day: { type: 'number' },
                    you: { type: 'string', description: 'What electrician does this day' },
                    otherTrades: { type: 'string', description: 'What other trades need to do' }
                  }
                }
              },
              clientImpact: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    when: { type: 'string', description: 'Exact day/time like "Day 1 (9am)"' },
                    what: { type: 'string', description: 'What stops working - power, water, etc' },
                    duration: { type: 'string' },
                    tip: { type: 'string', description: 'How client can prepare/cope' }
                  }
                }
              },
              complianceTimeline: {
                type: 'object',
                properties: {
                  beforeWork: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        what: { type: 'string' },
                        when: { type: 'string' },
                        how: { type: 'string' },
                        cost: { type: 'string' },
                        consequence: { type: 'string' }
                      }
                    }
                  },
                  duringWork: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        what: { type: 'string' },
                        when: { type: 'string' },
                        who: { type: 'string' },
                        bookingTime: { type: 'string' },
                        passRequired: { type: 'boolean' },
                        failConsequence: { type: 'string' }
                      }
                    }
                  },
                  afterWork: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        what: { type: 'string' },
                        when: { type: 'string' },
                        tests: { type: 'array', items: { type: 'string' } },
                        consequence: { type: 'string' }
                      }
                    }
                  }
                }
              },
              contingencies: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    scenario: { type: 'string' },
                    impact: { type: 'string' },
                    action: { type: 'string' },
                    prevention: { type: 'string' }
                  }
                }
              },
              accelerationOptions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    option: { type: 'string' },
                    timeSaved: { type: 'string' },
                    costIncrease: { type: 'number' },
                    worthIt: { type: 'string' }
                  }
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

    let pmResult;

    // Check if aiResult has toolCalls (new ai-wrapper format)
    if (aiResult.toolCalls && aiResult.toolCalls.length > 0) {
      // ai-wrapper already extracted the tool arguments
      pmResult = JSON.parse(aiResult.content);
      logger.debug('Parsed tool call from ai-wrapper', { hasToolCalls: true });
    } else {
      // Fallback: try to parse as full OpenAI response structure
      try {
        const aiData = JSON.parse(aiResult.content);
        
        if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
          logger.error('Invalid AI response structure', { aiData });
          throw new Error('AI returned invalid response structure');
        }
        
        const message = aiData.choices[0].message;
        
        if (!message.tool_calls || !message.tool_calls[0]) {
          logger.error('No tool calls in AI response', { 
            hasToolCalls: !!message.tool_calls,
            finishReason: aiData.choices[0].finish_reason,
            messageKeys: Object.keys(message)
          });
          throw new Error('AI did not return expected tool call');
        }
        
        const toolCall = message.tool_calls[0];
        
        if (!toolCall.function || !toolCall.function.arguments) {
          logger.error('Invalid tool call structure', { toolCall });
          throw new Error('Tool call missing function arguments');
        }
        
        pmResult = JSON.parse(toolCall.function.arguments);
        logger.debug('Parsed tool call from legacy format', { hasToolCalls: false });
      } catch (parseError) {
        logger.error('Failed to parse AI response', { 
          error: parseError instanceof Error ? parseError.message : String(parseError),
          contentPreview: aiResult.content.substring(0, 200)
        });
        throw new Error('Failed to parse AI response structure');
      }
    }

    // IMPROVEMENT: Response Quality Validation
    const { validateResponse } = await import('../_shared/response-validation.ts');
    const validation = validateResponse(
      pmResult.response,
      effectiveQuery,
      { pmKnowledge, projectType }
    );

    if (!validation.isValid) {
      logger.warn('⚠️ PM response validation issues', {
        issues: validation.issues.length
      });
    }

    logger.info('Project plan completed', { 
      phasesCount: pmResult.projectPlan?.phases?.length,
      totalDuration: pmResult.projectPlan?.totalDuration,
      validationConfidence: validation.confidence
    });

    // Step 5: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      pmResult.response || 'Project plan generated successfully',
      pmKnowledge, // Already has confidence scores from rag-project-mgmt.ts
      'project-mgmt',
      { projectType, scope, timeline }
    );

    // Log RAG metrics for observability
    const totalTime = Date.now() - requestStartTime;
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'project-mgmt-v3',
      request_id: requestId,
      rag_time: Date.now() - ragStart,
      total_time: totalTime,
      regulation_count: pmKnowledge?.length || 0,
      success: true,
      query_type: projectType || 'general'
    });
    
    if (metricsError) {
      logger.warn('Failed to log metrics', { error: metricsError.message });
    }

    // Return enriched response with aggregated data for PDF export
    const { response, suggestedNextAgents, projectPlan, resources, compliance, risks, recommendations } = pmResult;
    
    // Ensure aggregatedData exists with defaults
    const safeAggregatedData = aggregatedData || {
      circuits: [],
      totalCost: 0,
      materials: [],
      labour: { hours: 0, rate: 45 },
      hazards: [],
      requiredPPE: [],
      testSchedule: [],
      projectMeta: {}
    };
    
    // Check which agents have provided outputs
    const designer = previousAgentOutputs?.some((o: any) => o.agent === 'designer');
    const cost = previousAgentOutputs?.some((o: any) => o.agent === 'cost-engineer');
    const hs = previousAgentOutputs?.some((o: any) => o.agent === 'health-safety');
    const installer = previousAgentOutputs?.some((o: any) => o.agent === 'installer');
    const comm = previousAgentOutputs?.some((o: any) => o.agent === 'commissioning');
    
    // Enhance structured data with aggregated specialist outputs
    const enhancedStructuredData = {
      projectPlan: projectPlan || { phases: [] },
      resources: {
        ...(resources || {}),
        materials: safeAggregatedData.materials || [],
        labour: [
          {
            role: 'Electrician',
            hours: safeAggregatedData.labour?.hours || 0,
            rate: safeAggregatedData.labour?.rate || 45
          },
          ...(resources?.labour || [])
        ],
        totalCost: safeAggregatedData.totalCost || 0
      },
      compliance: compliance || {},
      risks: [
        ...((safeAggregatedData.hazards || []).map((h: any) => ({
          risk: h.hazard || h.risk || 'Unknown risk',
          mitigation: h.controls || h.mitigation || 'To be determined',
          severity: (h.riskRating || 0) >= 15 ? 'High' : (h.riskRating || 0) >= 8 ? 'Medium' : 'Low'
        }))),
        ...(risks || [])
      ],
      recommendations: recommendations || [],
      phases: (projectPlan?.phases || []).map((phase: any, idx: number) => ({
        ...phase,
        phase: idx + 1,
        tasks: phase.tasks || [],
        resources: phase.resources || [],
        duration: phase.duration || '1 day'
      })),
      milestones: (projectPlan?.phases || []).flatMap((p: any) => 
        (p.milestones || []).map((m: string) => ({
          milestone: m,
          targetDate: 'TBC',
          status: 'Pending' as const
        }))
      ) || [],
      referencedDocuments: [
        designer ? 'Circuit Design Specification' : null,
        cost ? 'Cost Estimate & Quote' : null,
        hs ? 'Risk Assessment' : null,
        installer ? 'Installation Method Statement' : null,
        comm ? 'Test Schedule & EIC' : null
      ].filter(Boolean) as string[],
      endDate: 'TBC',
      notes: `Project coordinated from ${previousAgentOutputs?.length || 0} specialist outputs`
    };
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          response: enrichedResponse.response,
          enrichment: enrichedResponse.enrichment,
          citations: enrichedResponse.citations,
          rendering: enrichedResponse.rendering,
          structuredData: enhancedStructuredData,
          projectPlan: enhancedStructuredData
        },
        suggestedNextAgents: suggestNextAgents(
          'project-manager',
          query,
          enrichedResponse.response,
          (previousAgentOutputs || []).map((o: any) => o.agent)
        ).map((s: any) => ({
          ...s,
          contextHint: generateContextHint(s.agent, 'project-manager', enhancedStructuredData)
        }))
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
