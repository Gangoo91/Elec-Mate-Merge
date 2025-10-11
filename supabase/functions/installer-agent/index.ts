// INSTALLER AGENT - Practical installation guidance
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, getErrorMessage } from '../_shared/errors.ts';
import { validateAgentRequest, getRequestBody } from '../_shared/validation.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { safeAll } from '../_shared/safe-parallel.ts';
import { 
  CABLE_SUPPORT_INTERVALS, 
  SAFE_ZONES, 
  FIRE_RATED_SUPPORT,
  TERMINATION_GUIDANCE
} from '../shared/bs7671InstallationMethods.ts';
import { ContextEnvelope, mergeContext } from '../_shared/agent-context.ts';

// corsHeaders imported from shared deps

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installer-agent' });

  try {
    const { messages, currentDesign, context, jobScale = 'commercial', incomingContext } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new ValidationError('LOVABLE_API_KEY not configured');

    logger.info('Installer Agent processing', { 
      jobScale, 
      messageCount: messages?.length,
      hasIncomingContext: !!incomingContext 
    });

    // Use incoming context
    let agentContext: ContextEnvelope | undefined = incomingContext;
    if (agentContext) {
      agentContext.agentChain.push('installer');
      agentContext.previousAgent = agentContext.agentChain[agentContext.agentChain.length - 2];
    }

    // RAG - Get installation knowledge from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // RAG OPTIMIZATION: Route by installation method
    // Extract installation method from previous agents or user message
    const previousAgentOutputs = context?.previousAgentOutputs || [];
    const designerOutput = previousAgentOutputs.find((a: any) => a.agent === 'designer');
    
    // Parse installation method
    let installationMethod = 'general';
    const methodPatterns = {
      'clipped-direct': /clipped\s+direct|surface\s+mount|twin\s+&\s+earth|T&E/i,
      'swa': /SWA|steel\s+wire\s+armoured|armoured/i,
      'cable-tray': /cable\s+tray|on\s+tray/i,
      'conduit': /conduit/i,
      'trunking': /trunking/i,
      'buried': /buried|underground/i
    };
    
    const combinedText = `${userMessage} ${designerOutput?.response || ''}`;
    for (const [method, pattern] of Object.entries(methodPatterns)) {
      if (pattern.test(combinedText)) {
        installationMethod = method;
        break;
      }
    }
    
    const ragQuery = `${userMessage} cable installation methods safe zones support intervals termination practical guidance`;
    
    console.log(`🔍 RAG: Searching installation knowledge (method: ${installationMethod}) for: ${ragQuery}`);
    
    // Check for cached embedding
    const cachedEmbedding = agentContext?.embeddingCache?.query === ragQuery ? agentContext.embeddingCache.embedding : null;
    
    let embedding: number[];
    
    if (cachedEmbedding) {
      embedding = cachedEmbedding;
      logger.info('⚡ Reusing cached embedding from previous agent');
    } else {
      // Generate embedding for installation knowledge search with retry + timeout
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

      if (embeddingResponse.ok) {
        const embeddingDataRes = await embeddingResponse.json();
        embedding = embeddingDataRes.data[0].embedding;
        
        // Cache embedding
        if (agentContext) {
          agentContext.embeddingCache = {
            query: ragQuery,
            embedding,
            generatedAt: Date.now()
          };
        }
      } else {
        logger.warn('Embedding generation failed, skipping RAG');
        embedding = [];
      }
    }
    
    let installationKnowledge = '';
    
    if (embedding && embedding.length > 0) {
      
      // OPTIMIZED: Only search installation knowledge with method filter
      const { data: instResults, error: instError } = await logger.time(
        'Installation knowledge search',
        () => withTimeout(
          supabase.rpc('search_installation_knowledge', {
            query_embedding: embedding,
            method_filter: installationMethod, // NEW: Filter by method
            match_threshold: 0.75,
            match_count: 3 // Reduced from 8
          }),
          Timeouts.STANDARD,
          'Installation knowledge search'
        )
      );

      if (!instError && instResults && instResults.length > 0) {
        installationKnowledge = instResults.map((d: any) => 
          `${d.topic} (${d.source}): ${d.content}`
        ).join('\n\n');
        
        logger.info('📚 Installer RAG Performance', { 
          chunks: instResults.length,
          sizeKB: Math.round(installationKnowledge.length / 1024),
          method: installationMethod
        });
      } else {
        logger.warn('No installation knowledge found, using static guidance');
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const designKnowledge = installationKnowledge; // Reference to RAG data
    
    const getScaleSpecificInstallerPrompt = (scale: 'domestic' | 'commercial' | 'industrial') => {
      const basePrompt = `You are an installation supervisor breaking down work into LOGICAL PHASES.

THINK IN MAJOR WORK STAGES, NOT MICRO-STEPS.

❌ BAD (too granular):
1. Pick up cable drum
2. Measure first cable run
3. Cut cable to length
4. Strip 10mm from cable end
5. Insert cable into MCB terminal
6. Tighten terminal screw

✅ GOOD (logical phases):
1. PREPARATION & SETUP (15 mins)
   - Confirm isolation and lock-off
   - Set up access equipment
   - Prepare tools and materials
   
2. CABLE ROUTING (45 mins)
   - Route cable from DB to first outlet via [route description]
   - Fix at intervals per BS 7671 Table 4A2 (300mm horizontal)
   - Maintain safe zones 150mm from corners
   
3. TERMINATIONS (30 mins)
   - Consumer unit terminations with [torque settings]
   - Outlet terminations following manufacturer specs
   - Label circuits clearly

4. INSPECTION & TESTING (30 mins)
   - Visual inspection per GN3 Section 10
   - Continuity and IR testing
   - Complete EIC Schedule of Test Results

EACH PHASE MUST:
- Represent a complete, logical chunk of work
- Include the "why" not just "what"
- Reference relevant BS 7671 regulations
- Note critical safety/quality checkpoints
- List required tools/materials for that phase

AVOID:
❌ Individual screw-tightening steps
❌ Picking up individual tools
❌ Walking between locations
❌ Opening packaging

INCLUDE:
✅ Major work stages with clear boundaries
✅ Critical decision points
✅ Quality checkpoints
✅ Safety-critical procedures
✅ Regulation compliance steps

${CABLE_SUPPORT_INTERVALS.map(s => `${s.cableType} ${s.orientation}: clips every ${s.maxSpacing}mm (Reg 522.8.5)`).join('\n')}

SAFE ZONES (Reg 522.6.202):
${SAFE_ZONES.map(z => `${z.zoneType}: ${z.description}`).join('\n')}

TERMINATIONS (Section 526):
${TERMINATION_GUIDANCE.slice(0, 2).map(t => `${t.conductorType}: Torque ${t.torqueSettings}, strip ${t.stripLength}`).join('\n')}

${installationKnowledge ? `
INSTALLATION KNOWLEDGE (from database):
${installationKnowledge}
` : ''}

${designKnowledge ? `
DESIGN GUIDANCE (relevant to installation):
${designKnowledge}
` : ''}`;

      if (scale === 'domestic') {
        return basePrompt + `

🏠 DOMESTIC SCALE - GRANULARITY GUIDANCE:

**TARGET: 4-6 MAJOR PHASES** for typical single circuit job

TYPICAL STRUCTURE:
1. PREPARATION (10-15 mins) - Isolation, customer brief, area protection
2. FIRST FIX (30-60 mins) - Cable routing, fixing, containment
3. TERMINATIONS (20-30 mins) - CU connections, accessories
4. TESTING & HANDOVER (20-30 mins) - Testing, customer demonstration

**DOMESTIC-SPECIFIC STEPS TO INCLUDE:**
- Customer communication (explain isolation, duration, noise)
- Property protection (dustsheets, floor coverings)
- Minimising disruption (tidy as you go, vacuum dust)
- Customer handover (demonstrate operation, provide cert)

**PHASE DURATION:** 10-60 mins per phase
**TOTAL JOB TIME:** 2-4 hours typical for single circuit

EXAMPLE PHASES:
✓ "CUSTOMER BRIEFING & ISOLATION (15 mins)"
✓ "CABLE ROUTING & FIXING (45 mins)"
✓ "TERMINATIONS & LABELLING (30 mins)"
✓ "TESTING & CUSTOMER DEMONSTRATION (30 mins)"`;
      }

      if (scale === 'commercial') {
        return basePrompt + `

🏢 COMMERCIAL SCALE - GRANULARITY GUIDANCE:

**TARGET: 6-10 MAJOR PHASES** for typical commercial project

TYPICAL STRUCTURE:
1. SITE COORDINATION (30 mins) - Building manager liaison, access, permits
2. PREPARATION & ISOLATION (45 mins) - Multi-circuit isolation, signage
3. FIRST FIX - ZONE 1 (2-3 hours) - Phased installation by area
4. FIRST FIX - ZONE 2 (2-3 hours) - Maintain business continuity
5. TERMINATIONS & LABELLING (1-2 hours) - Systematic, documented
6. TESTING & COMMISSIONING (2-3 hours) - Witnessed tests, handover docs
7. ENERGISATION & MONITORING (1 hour) - Phased re-energisation, checks

**COMMERCIAL-SPECIFIC STEPS TO INCLUDE:**
- Stakeholder coordination (building manager, tenants, security)
- Out-of-hours working (evening/weekend scheduling)
- Business continuity (phased isolation, temporary supplies)
- Fire alarm coordination (testing windows, notification)
- Handover documentation (O&M manuals, as-built drawings)

**PHASE DURATION:** 30 mins - 3 hours per phase
**TOTAL JOB TIME:** 1-3 days typical for multi-circuit installation

EXAMPLE PHASES:
✓ "SITE COORDINATION & PERMIT TO WORK (45 mins)"
✓ "PHASED ISOLATION - NORTH WING (1 hour)"
✓ "CABLE INSTALLATION - FLOOR 1 DISTRIBUTION (3 hours)"
✓ "DB TERMINATIONS & LABELLING (2 hours)"
✓ "TESTING & CERTIFICATION (3 hours)"
✓ "PHASED ENERGISATION & HANDOVER (1.5 hours)"`;
      }

      if (scale === 'industrial') {
        return basePrompt + `

🏭 INDUSTRIAL SCALE - GRANULARITY GUIDANCE:

**TARGET: 8-15 MAJOR PHASES** for typical industrial project

TYPICAL STRUCTURE:
1. PRE-WORK COORDINATION (1 day) - Permits, toolbox talks, shutdown planning
2. ISOLATION & PROVING (2-4 hours) - Multi-source isolation, HV switching
3. CABLE INSTALLATION - MAIN ROUTES (1-2 days) - Tray, ladder, conduit
4. CABLE INSTALLATION - FINAL CIRCUITS (1-2 days) - Equipment connections
5. TERMINATIONS - DISTRIBUTION (1 day) - Switchgear, DBs
6. TERMINATIONS - EQUIPMENT (1 day) - Motors, controls, instrumentation
7. TESTING & INSPECTION (2-3 days) - Phased, witnessed, documented
8. PRE-COMMISSIONING CHECKS (1 day) - Dry runs, interlock checks
9. COMMISSIONING & HANDOVER (1-2 days) - Energisation, load testing, training

**INDUSTRIAL-SPECIFIC STEPS TO INCLUDE:**
- Permit to Work systems (isolation certificates, hot work, confined space)
- Production coordination (planned shutdowns, critical path)
- Multi-trade interface (mechanical, process, instrumentation)
- Environmental controls (ATEX compliance, spillage containment)
- Commissioning procedures (load testing, sequence verification)
- Operator training and handover
- As-built documentation and O&M manuals

**PHASE DURATION:** 2 hours - 2 days per phase
**TOTAL JOB TIME:** 1-4 weeks typical for major installation

EXAMPLE PHASES:
✓ "PRE-WORK COORDINATION & PERMIT TO WORK (1 day)"
✓ "HV ISOLATION & PROVING PROCEDURES (4 hours)"
✓ "CABLE TRAY INSTALLATION - MAIN ROUTES (2 days)"
✓ "MOTOR CIRCUIT INSTALLATION & TERMINATION (1.5 days)"
✓ "CONTROL PANEL INTEGRATION (1 day)"
✓ "TESTING & INSPECTION - POWER CIRCUITS (1.5 days)"
✓ "COMMISSIONING & LOAD TESTING (2 days)"
✓ "OPERATOR TRAINING & HANDOVER (1 day)"`;
      }

      return basePrompt;
    };

    const lowerMsg = userMessage.toLowerCase();
    const isOutdoor = lowerMsg.includes('outside') || lowerMsg.includes('outdoor') || 
                      lowerMsg.includes('external') || lowerMsg.includes('tray');
    
    let systemPrompt = getScaleSpecificInstallerPrompt(jobScale);

    if (hasDesigner) {
      systemPrompt += `\n\n📋 The Designer's already done the circuit calculations, so YOU focus on:
- HOW to route the cable (safe zones, support intervals)
- WHAT fixing methods to use (steel clips for fire rating)
- Termination procedure (strip lengths, torque settings)
- Common installation MISTAKES to avoid`;
    }
    
    if (isOutdoor) {
      systemPrompt += `\n\n🌍 OUTDOOR INSTALLATION GUIDANCE:
- SWA cable terminations (glands, earth tags per BS 7671 Reg 543.3.2)
- IP rating requirements for enclosures (minimum IP54 for outdoor, IP65 for exposed)
- Cable support on tray (spacing per BS EN 61537)
- Weatherproofing and UV protection
- Reference BS 7671 Section 522 (External influences)`;
    }

    systemPrompt += `\n\n💬 Guide them step-by-step like you're walking an apprentice through their first install.`;

    // Use structured tool calling with retry + timeout (60s for complex installations)
    const response = await logger.time(
      'Lovable AI installation generation',
      () => withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
              tools: [{
          type: "function",
          function: {
            name: "create_method_statement",
            description: "Create detailed installation method statement",
            parameters: {
              type: "object",
              properties: {
                response: { type: "string", description: "Natural language installation guidance" },
                installationSteps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      stepNumber: { type: "number" },
                      phase: { type: "string", description: "Major work phase name (e.g., PREPARATION & SETUP)" },
                      title: { type: "string" },
                      description: { type: "string", description: "What's done in this phase and why" },
                      safetyRequirements: { type: "array", items: { type: "string" }, description: "Specific safety controls for this phase" },
                      equipmentNeeded: { type: "array", items: { type: "string" }, description: "Tools and materials needed" },
                      qualifications: { type: "array", items: { type: "string" }, description: "Required competencies" },
                      estimatedDuration: { type: "string", description: "e.g., '30-45 mins' or '2 days'" },
                      criticalPoints: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Key things that could go wrong or must be checked"
                      },
                      regulationReferences: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "BS 7671, HSE, or other regulation references"
                      },
                      riskLevel: { type: "string", enum: ["low", "medium", "high"] }
                    },
                    required: ["stepNumber", "phase", "title", "description", "safetyRequirements", "equipmentNeeded", "criticalPoints", "riskLevel"]
                  }
                },
                supportIntervals: { type: "string" },
                specialRequirements: { type: "array", items: { type: "string" } },
                confidence: { type: "number" }
              },
              required: ["response", "installationSteps", "confidence"],
              additionalProperties: false
            }
          }
        }],
              tool_choice: { type: "function", function: { name: "create_method_statement" } },
              max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage))
            }),
          }),
          Timeouts.LONG,
          'Lovable AI installation generation'
        ),
        RetryPresets.STANDARD
      )
    );

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    // Robust fallback: If no tool call, extract from text response
    let structuredData;
    if (!toolCall) {
      console.warn('⚠️ No tool call - falling back to text extraction');
      const textResponse = data.choices?.[0]?.message?.content || '';
      
      // Extract basic installation steps from text
      const lines = textResponse.split('\n').filter(l => l.trim());
      const steps = lines
        .filter(l => /^\d+\./.test(l.trim()) || /^[-•]/.test(l.trim()))
        .map((line, idx) => ({
          stepNumber: idx + 1,
          phase: `Step ${idx + 1}`,
          title: line.replace(/^[\d.•-]+\s*/, '').trim(),
          description: line.replace(/^[\d.•-]+\s*/, '').trim(),
          safetyRequirements: [],
          equipmentNeeded: [],
          criticalPoints: [],
          riskLevel: 'medium'
        }));
      
      structuredData = {
        response: textResponse,
        installationSteps: steps.length > 0 ? steps : [
          {
            stepNumber: 1,
            phase: 'Installation',
            title: 'Follow guidance above',
            description: textResponse.substring(0, 200),
            safetyRequirements: [],
            equipmentNeeded: [],
            criticalPoints: [],
            riskLevel: 'medium'
          }
        ],
        confidence: 0.7
      };
    } else {
      structuredData = JSON.parse(toolCall.function.arguments);
    }
    
    // PHASE 2: Build Installer reasoning
    const selectedInstallationMethod = currentDesign?.installationMethod || installationMethod || 'clipped direct';
    
    const reasoningSteps = [
      {
        step: 'Installation method selection',
        reasoning: `Selected ${selectedInstallationMethod} based on circuit location and cable type`,
        timestamp: new Date().toISOString()
      },
      {
        step: 'Tool and equipment planning',
        reasoning: 'Compiled comprehensive tool list based on installation method and cable specifications',
        timestamp: new Date().toISOString()
      },
      {
        step: 'Installation sequence planning',
        reasoning: 'Ordered tasks logically: isolation → cable routing → termination → testing',
        timestamp: new Date().toISOString()
      },
      {
        step: 'Quality checkpoints',
        reasoning: 'Identified critical inspection points during installation process',
        timestamp: new Date().toISOString()
      }
    ];

    const regulationsConsulted = [
      {
        section: '522',
        title: 'Selection and erection of wiring systems',
        relevance: 'Requirements for cable installation methods',
        source: 'BS 7671:2018+A2:2022'
      },
      {
        section: '526',
        title: 'Electrical connections',
        relevance: 'Standards for conductor terminations',
        source: 'BS 7671:2018+A2:2022'
      },
      {
        section: '134',
        title: 'Good workmanship and proper materials',
        relevance: 'General installation quality requirements',
        source: 'BS 7671:2018+A2:2022'
      }
    ];

    const assumptionsMade = [];
    const msgLower = userMessage.toLowerCase();

    if (!msgLower.includes('outdoor') && !msgLower.includes('indoor') && !msgLower.includes('underground')) {
      assumptionsMade.push({
        parameter: 'Installation environment',
        assumed: 'Standard indoor installation',
        reason: 'Not specified in request',
        impact: 'Affects cable type and mechanical protection requirements'
      });
    }

    // Build citations from RAG
    const citations = [];
    if (installationKnowledge && installationKnowledge.length > 0) {
      citations.push(...installationKnowledge.slice(0, 5).map((item: any) => ({
        source: item.source || 'Installation Knowledge Base',
        section: item.topic,
        title: item.topic,
        content: item.content?.slice(0, 150) + '...',
        relevance: item.similarity,
        type: 'knowledge'
      })));
    }

    // Add to structuredData
    structuredData.reasoningSteps = reasoningSteps;
    structuredData.regulationsConsulted = regulationsConsulted;
    structuredData.assumptionsMade = assumptionsMade;
    structuredData.citations = citations;
    
    logger.info('Installation guidance generated successfully', { requestId });

    return new Response(JSON.stringify({
      response: structuredData.response || 'Installation guidance complete.',
      structuredData: {
        installationSteps: structuredData.installationSteps || [],
        supportIntervals: structuredData.supportIntervals || "",
        specialRequirements: structuredData.specialRequirements || [],
        reasoningSteps: structuredData.reasoningSteps || [],
        regulationsConsulted: structuredData.regulationsConsulted || [],
        assumptionsMade: structuredData.assumptionsMade || [],
        citations: structuredData.citations || []
      },
      confidence: structuredData.confidence || 0.90
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    logger.error('Installer agent error', { error: getErrorMessage(error) });
    return handleError(error);
  }
});

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number): number {
  const baseTokens = 2000;
  const perCircuitTokens = 400;
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 10000);
}

function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6;
}
