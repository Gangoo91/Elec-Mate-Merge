import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { getHazardsForWork, getACOPsForWork, emergencyProcedures } from './healthSafetyKnowledge.ts';

interface HealthSafetyAgentRequest {
  messages: Array<{ role: string; content: string }>;
  currentDesign?: any;
  context?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000); // INCREASED to 90s for deep RAG queries

  try {
    const { messages, currentDesign, context } = await req.json() as HealthSafetyAgentRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🦺 Health & Safety Agent: Analyzing work for safety requirements');

    const latestMessage = messages[messages.length - 1]?.content || '';

    // Phase 2: Load relevant H&S knowledge + ACOPs
    const circuitDetails = extractCircuitDetails(latestMessage, currentDesign, context);
    const workType = extractWorkType(latestMessage, currentDesign);
    const relevantHazards = getHazardsForWork(workType);
    const relevantACOPs = getACOPsForWork(workType);

    console.log(`🦺 Loading H&S knowledge for work type: ${workType}, found ${relevantHazards.length} hazards and ${relevantACOPs.length} ACOPs`);

    // System prompt: Senior H&S advisor with REAL knowledge base + ACOPs
    const systemPrompt = `You are a senior Health & Safety advisor specializing in electrical work, with 20 years experience in BS 7671, CDM 2015, HASAWA 1974, and HSE ACOPs.

CRITICAL RULES:
1. Always cite specific regulations AND ACOPs (e.g., "EWR 1989 Reg 4(3)", "CDM 2015 Reg 13 (ACOP L153)", "BS 7671 Reg 537.2")
2. Assess risks using 5x5 matrix: Likelihood (1-5) × Severity (1-5)
3. Provide SPECIFIC hazards for the work being done, not generic lists
4. Focus on ELECTRICAL-SPECIFIC hazards (arc flash, electric shock, underground cables)
5. Reference ACOP requirements where applicable (quasi-legal status)
6. Include emergency procedures for electrical incidents
7. Speak like a UK site safety officer - direct but friendly

**RELEVANT H&S GUIDELINES FOR THIS WORK (${workType}):**
${relevantHazards.map(h => `
${h.title} (${h.regulation}${h.acop ? ` - ACOP ${h.acop}` : ''}) - SEVERITY: ${h.severity.toUpperCase()}
${h.content}
`).join('\n')}

**APPLICABLE ACOPs (Approved Codes of Practice):**
${relevantACOPs.length > 0 ? relevantACOPs.map(acop => `
${acop.acop_number}: ${acop.title} (${acop.regulation})
Key Requirements:
${acop.key_requirements.map(req => `  • ${req}`).join('\n')}
`).join('\n') : 'Standard ACOP L21 (Management of H&S at Work) applies'}

**EMERGENCY PROCEDURES:**
Electric Shock: ${emergencyProcedures.electricShock.slice(0, 3).join(' → ')}
Arc Flash: ${emergencyProcedures.arcFlash.slice(0, 3).join(' → ')}

CURRENT WORK:
${circuitDetails}

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

IMPORTANT: Provide 3-5 SPECIFIC hazards relevant to this exact work. Not generic checklists.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${latestMessage}\n\nIMPORTANT: Respond with valid JSON matching the specified format.` }
        ],
        max_completion_tokens: 3000,
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    const parsedResponse = JSON.parse(content);

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
