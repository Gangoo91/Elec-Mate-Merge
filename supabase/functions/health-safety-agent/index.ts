import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';
import { emergencyProcedures } from '../_shared/emergencyProcedures.ts';

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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 240000); // 240s timeout (4 minutes)

  try {
    const { messages, currentDesign, context, jobScale = 'commercial' } = await req.json() as HealthSafetyAgentRequest;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('🦺 Health & Safety Agent: Analyzing work with RAG knowledge base');

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
    
    // Generate embedding for RAG query using Lovable AI
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: ragQuery,
      }),
    });

    // Only use RAG if embedding generation succeeds
    if (embeddingResponse.ok) {
      const embeddingData = await embeddingResponse.json();
      const queryEmbedding = embeddingData.data[0].embedding;
      console.log('✅ Embedding generated successfully');

      // Query RAG database (optimized for speed)
      const ragStartTime = Date.now();
      const { data: ragResults, error: ragError } = await supabase.rpc('search_health_safety', {
        query_embedding: queryEmbedding,
        match_threshold: 0.75,
        match_count: 5
      });

      const ragDuration = Date.now() - ragStartTime;
      console.log(`⏱️ RAG query completed in ${ragDuration}ms`);

      if (!ragError && ragResults && ragResults.length > 0) {
        ragContext = ragResults
          .map((item: any, idx: number) => 
            `${idx + 1}. ${item.topic} (Source: ${item.source}, Similarity: ${(item.similarity * 100).toFixed(0)}%)\n${item.content}`
          ).join('\n\n');
        console.log(`✅ Found ${ragResults.length} H&S knowledge entries (avg similarity: ${Math.round(ragResults.reduce((sum: number, r: any) => sum + r.similarity, 0) / ragResults.length * 100)}%)`);
      } else {
        console.log('⚠️ No relevant H&S knowledge found in database');
        ragContext = 'No specific guidelines found - using general electrical safety knowledge.';
      }
    } else {
      console.error('⚠️ Embedding generation failed, continuing without RAG:', await embeddingResponse.text());
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

FOR EACH HAZARD IDENTIFIED:
- Likelihood (1-5): How often could this realistically occur?
- Severity (1-5): What's the worst-case credible outcome?
- Risk Rating: Likelihood × Severity
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

OUTPUT: 5-7 SPECIFIC HAZARDS
Risk ratings typically: Low-Medium (customer comfort & property protection priority)

TYPICAL DOMESTIC HAZARDS:
⚡ Borrowed neutrals (common in older properties)
🏠 Occupied premises (homeowner/tenant present during work)
🧱 Hidden services in walls (water pipes, gas, old cables)
🐕 Pets accessing work area
👶 Children near work area
🚗 Parking restrictions/access issues

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

    // Use structured tool calling for consistent JSON output
    console.log('🤖 Calling Lovable AI with structured tool calling');
    const openaiStartTime = Date.now();
    
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
    
    console.log('📤 Lovable AI Request:', JSON.stringify({ model: requestBody.model, messageCount: requestBody.messages.length }));
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Lovable AI error:', { status: response.status, error: errorText });
      throw new Error(`Lovable AI error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Lovable AI responded in ${Date.now() - openaiStartTime}ms`);
    
    // Extract structured data from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      console.error('❌ No tool call in response');
      throw new Error('No tool call from AI');
    }

    const parsedResponse = JSON.parse(toolCall.function.arguments);
    console.log('✅ Successfully parsed structured output with', parsedResponse.riskAssessment.hazards.length, 'hazards');

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
