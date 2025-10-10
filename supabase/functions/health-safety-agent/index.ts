// HEALTH & SAFETY AGENT - Risk assessments and method statements
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, getErrorMessage } from '../_shared/errors.ts';
import { validateAgentRequest, getRequestBody } from '../_shared/validation.ts';
import { emergencyProcedures } from '../_shared/emergencyProcedures.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

interface HealthSafetyAgentRequest {
  messages: Array<{ role: string; content: string }>;
  currentDesign?: any;
  context?: any;
  jobScale?: 'domestic' | 'commercial' | 'industrial';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-agent' });

  try {
    const { messages, currentDesign, context, jobScale = 'commercial' } = await req.json() as HealthSafetyAgentRequest;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new ValidationError('LOVABLE_API_KEY not configured');
    }

    logger.info('Health & Safety Agent analyzing work', { jobScale, messageCount: messages?.length });

    const latestMessage = messages[messages.length - 1]?.content || '';
    const circuitDetails = extractCircuitDetails(latestMessage, currentDesign, context);
    const workType = extractWorkType(latestMessage, currentDesign);

    // RAG: Query health_safety_knowledge via Supabase RPC
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const ragQuery = `${workType} electrical work hazards safety risks controls PPE ACOP CDM EWR HASAWA`;
    console.log(`🔍 RAG: Searching H&S knowledge for: ${ragQuery}`);
    
    let ragContext = ''; // Initialize empty for graceful degradation
    
    // Generate embedding for RAG query using Lovable AI with retry + timeout
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

    // Only use RAG if embedding generation succeeds
    if (embeddingResponse.ok) {
      const embeddingData = await embeddingResponse.json();
      const queryEmbedding = embeddingData.data[0].embedding;
      logger.debug('Embedding generated successfully');

      // Query RAG database with timeout protection
      const { data: ragResults, error: ragError } = await logger.time(
        'Health & Safety vector search',
        () => withTimeout(
          supabase.rpc('search_health_safety', {
            query_embedding: queryEmbedding,
            match_threshold: 0.75,
            match_count: 5
          }),
          Timeouts.STANDARD,
          'Health & Safety vector search'
        )
      );

      if (!ragError && ragResults && ragResults.length > 0) {
        ragContext = ragResults
          .map((item: any, idx: number) => 
            `${idx + 1}. ${item.topic} (Source: ${item.source}, Similarity: ${(item.similarity * 100).toFixed(0)}%)\n${item.content}`
          ).join('\n\n');
        logger.info('Found H&S knowledge entries', { count: ragResults.length });
      } else {
        logger.warn('No relevant H&S knowledge found in database');
        ragContext = 'No specific guidelines found - using general electrical safety knowledge.';
      }
    } else {
      logger.error('Embedding generation failed, continuing without RAG');
      ragContext = 'RAG system unavailable - using general electrical safety knowledge.';
    }

    // Extract context from previous agents
    const previousAgentOutputs = context?.previousAgentOutputs || [];
    const previousContext = previousAgentOutputs.length > 0
      ? `\n\n**PREVIOUS AGENT RESPONSES:**\n${previousAgentOutputs.map((a: any) => 
          `[${a.agent}]: ${a.response.substring(0, 300)}...`
        ).join('\n\n')}`
      : '';

    const getScaleSpecificPrompt = (scale: 'domestic' | 'commercial' | 'industrial') => {
      const basePrompt = `You are a Level 3 Health & Safety Officer conducting a thorough risk assessment.

**CRITICAL: ALL OUTPUT MUST BE IN UK ENGLISH**
- Use UK spellings: analysing (not analyzing), realise (not realize), categorise (not categorize), minimise (not minimize)
- Use UK terminology: spillage (not spill), tap (not faucet), pavement (not sidewalk), metre (not meter), labour (not labor)
- Use UK measurements: metres (not meters), litres (not liters)
- Use UK phrases: "whilst" (not "while"), "amongst" (not "among")
- Reference UK standards: BS 7671, BS EN ISO, HSE guidance

THINK LIKE A RISK ASSESSOR - WALK THROUGH THE JOB MENTALLY:
- What could go wrong at EVERY stage?
- What environmental factors apply? (weather, confined spaces, public access)
- What human error scenarios exist?
- What concurrent work might occur? (other trades, occupants)
- What non-obvious risks exist? (borrowed neutrals, asbestos, hidden services)

COMPREHENSIVE HAZARD IDENTIFICATION CHECKLIST:
✓ Electrical hazards (shock, arc flash, borrowed neutrals, hidden cables)
✓ Physical hazards (work at height, manual handling, confined spaces)
✓ Environmental hazards (dust, asbestos, water ingress, weather)
✓ Site-specific hazards (public access, occupied premises, operating hours)
✓ Equipment hazards (power tools, ladders, scaffold, MEWPs)
✓ Chemical hazards (COSHH - adhesives, cutting fluid, cable lubricant, sealants)

⚠️ RISK RATING CALIBRATION (5×5 Matrix):
Likelihood (L1-L5):
L1 = Rare (once in career)
L2 = Unlikely (with proper controls)
L3 = Possible (if controls lapse)
L4 = Likely (without controls)
L5 = Almost Certain (imminent)

Severity (S1-S5):
S1 = Negligible (first aid only)
S2 = Minor (lost time injury <3 days)
S3 = Moderate (lost time injury 3-7 days)
S4 = Major (hospitalisation, broken bones)
S5 = Catastrophic (death, multiple casualties)

TYPICAL ELECTRICAL RISK RATINGS:
⚡ Electric shock (with isolation): L2 × S4 = 8 (MEDIUM)
⚡ Electric shock (live work): L3 × S5 = 15 (HIGH)
🔥 Arc flash (domestic): L2 × S3 = 6 (LOW-MEDIUM)
🔥 Arc flash (commercial/HV): L3 × S5 = 15 (HIGH)
💥 Manual handling: L3 × S2 = 6 (LOW-MEDIUM)
🪜 Work at height: L2 × S4 = 8 (MEDIUM)

FOR EACH HAZARD IDENTIFIED:
- Likelihood (1-5): How often could this realistically occur?
- Severity (1-5): What's the worst-case credible outcome?
- Risk Rating: Likelihood × Severity (DO NOT default to L4/S5)
- Controls: SPECIFIC, ACTIONABLE controls (not generic "be careful")
- Residual Risk: After controls applied

MANDATORY COVERAGE:
✅ Pre-work isolation and testing procedures (GS38, Proving Unit)
✅ PPE requirements with BS/EN standards
✅ Emergency procedures (shock treatment, fire, injury response)
✅ First aid provision and emergency contact details
✅ Environmental controls (dust suppression, noise limits, waste disposal)
✅ Access control and signage requirements`;

      if (scale === 'domestic') {
        return basePrompt + `

🏠 DOMESTIC SCALE - FOCUS ON:
- Occupied premises considerations (homeowner present, children, pets)
- Minimising disruption (dustsheets, noise control, working hours)
- Protecting customer property (floor coverings, furniture protection)
- Customer communication (explaining work, isolation periods)
- Parking/access to residential street
- Neighbour considerations

**MANDATORY MINIMUM OUTPUT: 5 HAZARDS, 5 METHOD STEPS**
If you provide fewer than 5 hazards or 5 method steps, the assessment will be REJECTED.

OUTPUT: 5-7 SPECIFIC HAZARDS
Risk ratings typically: Low-Medium (customer comfort & property protection priority)

FOR DOMESTIC REWIRE:
Initial risks should typically be MEDIUM (6-12)
Residual risks (after controls) should be LOW-MEDIUM (2-6)

TYPICAL DOMESTIC HAZARDS (with realistic risk ratings):
⚡ Electric shock from existing circuits: L2 × S4 = 8 (with isolation) → Residual: 4
🏠 Occupied premises disruption: L4 × S1 = 4 → Residual: 2
🧱 Hidden services in walls: L3 × S3 = 9 → Residual: 6
🐕 Pets accessing work area: L3 × S2 = 6 → Residual: 3
👶 Children near work area: L3 × S2 = 6 → Residual: 3
🚗 Manual handling (cable drums): L3 × S2 = 6 → Residual: 3

RELEVANT H&S KNOWLEDGE FROM DATABASE (${workType}):
${ragContext}

EMERGENCY PROCEDURES:
Electric Shock: ${emergencyProcedures.electricShock.slice(0, 3).join(' → ')}
Arc Flash: ${emergencyProcedures.arcFlash.slice(0, 3).join(' → ')}

CURRENT WORK:
${circuitDetails}`;
      }

      if (scale === 'commercial') {
        return basePrompt + `

🏢 COMMERCIAL SCALE - FOCUS ON:
- Business continuity (out-of-hours work, phased isolation)
- Public access and liability (customers, staff, delivery drivers)
- Fire alarm coordination (notification, testing windows)
- Multiple stakeholders (building manager, tenants, security)
- Compliance documentation (method statements, permits to work)
- Disabled access considerations

**MANDATORY MINIMUM OUTPUT: 7 HAZARDS, 7 METHOD STEPS**
If you provide fewer than 7 hazards or 7 method steps, the assessment will be REJECTED.

OUTPUT: 7-10 SPECIFIC HAZARDS
Risk ratings typically: Medium-High (public liability & business disruption)

TYPICAL COMMERCIAL HAZARDS:
⚡ Working on live systems (business can't afford downtime)
👥 Public access to work area (shop customers, office staff)
🔥 Fire alarm system isolation coordination
📋 Multiple contractors on site (coordination required)
🚧 Emergency egress routes maintained
⏰ Restricted working hours (evenings/weekends only)
🔒 Security system integration

RELEVANT H&S KNOWLEDGE FROM DATABASE (${workType}):
${ragContext}

EMERGENCY PROCEDURES:
Electric Shock: ${emergencyProcedures.electricShock.slice(0, 3).join(' → ')}
Arc Flash: ${emergencyProcedures.arcFlash.slice(0, 3).join(' → ')}

CURRENT WORK:
${circuitDetails}`;
      }

      if (scale === 'industrial') {
        return basePrompt + `

🏭 INDUSTRIAL SCALE - FOCUS ON:
- High-voltage systems (HV switching, arc flash PPE)
- Hazardous environments (ATEX zones, confined spaces, chemical exposure)
- Production continuity (planned shutdowns, emergency isolation)
- Heavy machinery interaction (fork lifts, cranes, conveyors)
- Multiple trade coordination (mechanical, civils, process engineers)
- Permit to Work systems (hot work, confined space, isolation permits)
- Environmental controls (spillage, emissions, noise at boundary)

**MANDATORY MINIMUM OUTPUT: 10 HAZARDS, 10 METHOD STEPS**
If you provide fewer than 10 hazards or 10 method steps, the assessment will be REJECTED.

OUTPUT: 10-15 SPECIFIC HAZARDS
Risk ratings typically: High-Critical (major incident potential, regulatory scrutiny)

TYPICAL INDUSTRIAL HAZARDS:
⚡ Arc flash risk (>1000A fault current, Category 2+ PPE required)
🏭 ATEX zoned areas (explosive atmospheres, non-sparking tools)
🚧 Working at height (>2m, MEWP, scaffolding, harness)
🔒 Permit to Work systems (isolation certificates, hot work permits)
🏗️ Heavy plant operation nearby (fork lifts, cranes, vehicles)
⚠️ Confined spaces (cable trenches, ducts, vaults)
☣️ Hazardous substances (process chemicals, cooling fluids, oils)
📡 Critical systems (fire detection, emergency lighting, process control)
🚨 Emergency response requirements (COMAH sites, marshalling points)

RELEVANT H&S KNOWLEDGE FROM DATABASE (${workType}):
${ragContext}

EMERGENCY PROCEDURES:
Electric Shock: ${emergencyProcedures.electricShock.slice(0, 3).join(' → ')}
Arc Flash: ${emergencyProcedures.arcFlash.slice(0, 3).join(' → ')}

CURRENT WORK:
${circuitDetails}`;
      }

      return basePrompt;
    };

    const systemPrompt = getScaleSpecificPrompt(jobScale) + `${previousContext}

OUTPUT FORMAT:
{
  "agent": "health-safety",
  "response": "Natural language safety guidance (conversational, UK electrician tone)",
  "riskAssessment": {
    "hazards": [
      {
        "hazard": "Electric shock during installation",
        "likelihood": 3,
        "severity": 5,
        "riskRating": 15,
        "controls": ["Safe isolation to EWR 1989", "Voltage indicator testing", "Lock-off devices"],
        "residualRisk": 6
      }
    ]
  },
  "requiredPPE": ["Insulated gloves (BS EN 60903)", "Safety boots (BS EN ISO 20345)"],
  "methodStatement": [
    "Isolate supply at consumer unit",
    "Lock-off and tag circuit",
    "Test for dead with voltage indicator",
    "Apply earthing clip before work",
    "Re-test after work completion"
  ],
  "citations": ["EWR 1989 Reg 4(3)", "CDM 2015 Reg 13", "BS 7671:2018 Reg 537.2"],
  "acopCitations": ["L153: CDM 2015 ACOP", "L138: Work at Height ACOP"],
  "emergencyProcedures": ["In case of electric shock: isolate supply, call 999, start CPR if required"],
  "confidence": 0.95
}

IMPORTANT: Provide SPECIFIC hazards relevant to this exact work and job scale. Not generic checklists.`;

    // Use structured tool calling for consistent JSON output with retry + timeout (60s for complex risk assessments)
    logger.debug('Calling Lovable AI with structured tool calling');
    
    const requestBody = {
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: latestMessage }
      ],
      tools: [{
        type: "function",
        function: {
          name: "create_risk_assessment",
          description: "Create a comprehensive risk assessment for electrical work",
          parameters: {
            type: "object",
            properties: {
              response: {
                type: "string",
                description: "Natural language safety guidance in UK electrician tone"
              },
              riskAssessment: {
                type: "object",
                properties: {
                  hazards: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        hazard: { type: "string" },
                        likelihood: { type: "number", minimum: 1, maximum: 5 },
                        severity: { type: "number", minimum: 1, maximum: 5 },
                        riskRating: { type: "number" },
                        controls: { type: "array", items: { type: "string" } },
                        residualRisk: { type: "number" }
                      },
                      required: ["hazard", "likelihood", "severity", "riskRating", "controls", "residualRisk"]
                    }
                  }
                },
                required: ["hazards"]
              },
              requiredPPE: {
                type: "array",
                items: { type: "string" }
              },
              methodStatement: {
                type: "array",
                items: { type: "string" }
              },
              emergencyProcedures: {
                type: "array",
                items: { type: "string" }
              },
              citations: {
                type: "array",
                items: { type: "string" }
              },
              acopCitations: {
                type: "array",
                items: { type: "string" }
              },
              confidence: {
                type: "number",
                minimum: 0,
                maximum: 1
              }
            },
            required: ["response", "riskAssessment", "requiredPPE", "methodStatement", "emergencyProcedures", "citations", "confidence"],
            additionalProperties: false
          }
        }
      }],
      tool_choice: { type: "function", function: { name: "create_risk_assessment" } },
      max_completion_tokens: calculateTokenLimit(extractCircuitCount(latestMessage))
    };
    
    logger.debug('Lovable AI Request', { model: requestBody.model, messageCount: requestBody.messages.length });
    
    const response = await logger.time(
      'Lovable AI risk assessment generation',
      () => withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }),
          Timeouts.LONG,
          'Lovable AI risk assessment generation'
        ),
        RetryPresets.STANDARD
      )
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Lovable AI error', { status: response.status, error: errorText });
      throw new ValidationError(`Lovable AI error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract structured data from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      console.error('❌ No tool call in response');
      throw new Error('No tool call from AI');
    }

    let parsedResponse = JSON.parse(toolCall.function.arguments);
    logger.info('Successfully parsed structured output', { hazards: parsedResponse.riskAssessment.hazards.length, requestId });

    // UK English enforcement function
    const enforceUKEnglish = (text: string): string => {
      if (!text) return text;
      const americanToUK: Record<string, string> = {
        'analyzing': 'analysing', 'analyze': 'analyse',
        'minimizing': 'minimising', 'minimize': 'minimise',
        'organizing': 'organising', 'organize': 'organise',
        'realizing': 'realising', 'realize': 'realise',
        'meter': 'metre', 'meters': 'metres',
        'liter': 'litre', 'liters': 'litres',
        'color': 'colour', 'labor': 'labour',
        'while': 'whilst', 'among': 'amongst'
      };
      
      let ukText = text;
      Object.entries(americanToUK).forEach(([us, uk]) => {
        ukText = ukText.replace(new RegExp(`\\b${us}\\b`, 'gi'), (match) => {
          if (match === match.toUpperCase()) return uk.toUpperCase();
          if (match[0] === match[0].toUpperCase()) return uk.charAt(0).toUpperCase() + uk.slice(1);
          return uk;
        });
      });
      return ukText;
    };

    // Apply UK English to all text fields
    parsedResponse.response = enforceUKEnglish(parsedResponse.response || '');
    parsedResponse.riskAssessment.hazards = parsedResponse.riskAssessment.hazards.map((h: any) => ({
      ...h,
      hazard: enforceUKEnglish(h.hazard),
      controls: h.controls.map(enforceUKEnglish)
    }));
    parsedResponse.requiredPPE = parsedResponse.requiredPPE.map(enforceUKEnglish);
    parsedResponse.methodStatement = parsedResponse.methodStatement.map(enforceUKEnglish);
    parsedResponse.emergencyProcedures = parsedResponse.emergencyProcedures.map(enforceUKEnglish);

    // Validate minimum hazards and steps
    const minHazards = jobScale === 'domestic' ? 5 : jobScale === 'commercial' ? 7 : 10;
    const minSteps = minHazards;

    if (parsedResponse.riskAssessment.hazards.length < minHazards) {
      console.warn(`⚠️ Only ${parsedResponse.riskAssessment.hazards.length} hazards generated, expected ${minHazards}. Padding with generic hazards.`);
      
      const genericHazards = [
        { hazard: "Electric shock from live conductors", likelihood: 3, severity: 5, riskRating: 15, controls: ["Safe isolation to BS 7671", "Voltage testing to GS38", "Lock-off devices"], residualRisk: 6 },
        { hazard: "Manual handling injuries from cable drums and equipment", likelihood: 2, severity: 3, riskRating: 6, controls: ["Lifting assessment before moving items", "Two-person lift for heavy equipment", "Use trolleys and mechanical aids"], residualRisk: 3 },
        { hazard: "Falls from height during installation work", likelihood: 2, severity: 5, riskRating: 10, controls: ["Platform stepladder for work below 2m", "Harness and anchor if above 2m", "Clear area below work zone"], residualRisk: 4 },
        { hazard: "Contact with hidden services when drilling or chasing", likelihood: 2, severity: 4, riskRating: 8, controls: ["Cable detector scan before drilling", "Consult building drawings if available", "Drill at safe angles and depths"], residualRisk: 3 },
        { hazard: "Dust and debris inhalation during cutting operations", likelihood: 3, severity: 2, riskRating: 6, controls: ["Dust extraction equipment", "FFP3 respirator mask", "Dampen surfaces before cutting"], residualRisk: 2 }
      ];
      
      while (parsedResponse.riskAssessment.hazards.length < minHazards) {
        parsedResponse.riskAssessment.hazards.push(genericHazards[parsedResponse.riskAssessment.hazards.length % genericHazards.length]);
      }
    }

    if (parsedResponse.methodStatement.length < minSteps) {
      console.warn(`⚠️ Only ${parsedResponse.methodStatement.length} method steps generated, expected ${minSteps}. Padding with generic steps.`);
      
      const genericSteps = [
        "Obtain necessary permits and notify building management or homeowner of work schedule",
        "Establish safe working area with barriers, signage, and dust protection",
        "Test for dead using approved voltage indicator and apply lock-off devices",
        "Install circuit protection and cable runs according to BS 7671 requirements",
        "Complete testing, inspection, and certification to BS 7671 standards"
      ];
      
      while (parsedResponse.methodStatement.length < minSteps) {
        parsedResponse.methodStatement.push(genericSteps[parsedResponse.methodStatement.length % genericSteps.length]);
      }
    }

    // Ensure structured output with ACOP citations
    const structuredResponse = {
      agent: 'health-safety',
      response: parsedResponse.response || "Safety assessment complete. Refer to risk assessment below.",
      structuredData: {
        riskAssessment: parsedResponse.riskAssessment || { hazards: [] },
        requiredPPE: parsedResponse.requiredPPE || [],
        methodStatement: parsedResponse.methodStatement || [],
        emergencyProcedures: parsedResponse.emergencyProcedures || []
      },
      reasoning: parsedResponse.reasoning || [],
      citations: parsedResponse.citations || [],
      acopCitations: parsedResponse.acopCitations || [],
      confidence: parsedResponse.confidence || 0.85,
      timestamp: new Date().toISOString()
    };

    console.log('✅ H&S Agent: Generated risk assessment with', structuredResponse.structuredData.riskAssessment.hazards.length, 'hazards');
    
    clearTimeout(timeoutId);

    return new Response(JSON.stringify(structuredResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in health-safety-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Health & Safety agent failed',
      agent: 'health-safety',
      response: "I couldn't complete the safety assessment mate. Standard electrical safety precautions apply - isolate, test, lock-off.",
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractWorkType(message: string, currentDesign: any): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('shower') || lowerMessage.includes('bathroom')) return 'shower';
  if (lowerMessage.includes('outdoor') || lowerMessage.includes('garden')) return 'outdoor';
  if (lowerMessage.includes('commercial') || lowerMessage.includes('factory') || lowerMessage.includes('industrial')) return 'commercial';
  if (lowerMessage.includes('excavat') || lowerMessage.includes('dig') || lowerMessage.includes('underground')) return 'excavation';
  if (lowerMessage.includes('consumer unit') || lowerMessage.includes('distribution board')) return 'consumer-unit';
  if (lowerMessage.includes('height') || lowerMessage.includes('ladder') || lowerMessage.includes('scaffold')) return 'height';
  if (lowerMessage.includes('confined') || lowerMessage.includes('duct') || lowerMessage.includes('void') || lowerMessage.includes('loft')) return 'confined';
  if (lowerMessage.includes('refurb') || lowerMessage.includes('demolit') || lowerMessage.includes('strip out')) return 'refurbishment';
  
  return 'general';
}

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
  
  return 6;
}

function extractCircuitDetails(message: string, currentDesign: any, context: any): string {
  let details = `User Query: ${message}\n\n`;

  if (currentDesign) {
    details += `Circuit Type: ${currentDesign.loadType || 'Not specified'}\n`;
    details += `Voltage: ${currentDesign.voltage || 230}V ${currentDesign.phases === 'three' ? '3-phase' : 'single-phase'}\n`;
    details += `Load: ${currentDesign.totalLoad || 'Unknown'}W\n`;
    details += `Cable Length: ${currentDesign.cableLength || 'Unknown'}m\n`;
    details += `Installation Method: ${currentDesign.installationMethod || 'Not specified'}\n`;
    details += `Location: ${currentDesign.location || 'Not specified'}\n`;
  }

  if (context?.conversationSummary) {
    details += `\nProject Context: ${context.conversationSummary.lastTopic}\n`;
    details += `Project Type: ${context.conversationState?.projectType || 'domestic'}\n`;
  }

  return details;
}
