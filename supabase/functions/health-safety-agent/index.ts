import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

interface HealthSafetyAgentRequest {
  messages: Array<{ role: string; content: string }>;
  currentDesign?: any;
  context?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentDesign, context } = await req.json() as HealthSafetyAgentRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🦺 Health & Safety Agent: Analyzing work for safety requirements');

    const latestMessage = messages[messages.length - 1]?.content || '';

    // Extract circuit details from context
    const circuitDetails = extractCircuitDetails(latestMessage, currentDesign, context);

    // System prompt: Senior H&S advisor
    const systemPrompt = `You are a senior Health & Safety advisor specializing in electrical work, with 20 years experience in BS 7671, CDM 2015, and HASAWA 1974.

CRITICAL RULES:
1. Always cite specific regulations (e.g., "EWR 1989 Reg 4(3)", "CDM 2015 Reg 13", "BS 7671 Reg 537.2")
2. Assess risks using 5x5 matrix: Likelihood (1-5) × Severity (1-5)
3. Provide SPECIFIC hazards for the work being done, not generic lists
4. Focus on ELECTRICAL-SPECIFIC hazards (arc flash, electric shock, underground cables)
5. Include emergency procedures for electrical incidents
6. Speak like a UK site safety officer - direct but friendly

KNOWLEDGE BASE (from src/data/healthAndSafety/):
- HASAWA 1974, EWR 1989, CDM 2015 legislation
- Electrical safety: live work prohibition, safe isolation (lock-off), emergency procedures
- Access equipment: ladders (max 9m), scaffolding, MEWPs
- Hazards: working at height, confined spaces, underground cables, asbestos
- PPE: Arc flash protection, insulated gloves (BS EN 60903), safety boots (BS EN ISO 20345)
- Safe working practices: isolation procedure, voltage indicator testing, permit-to-work

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
          { role: 'user', content: latestMessage }
        ],
        max_completion_tokens: 2000,
        response_format: { type: "json_object" }
      }),
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

    // Ensure structured output
    const structuredResponse = {
      agent: 'health-safety',
      response: parsedResponse.response || "Safety assessment complete. Refer to risk assessment below.",
      riskAssessment: parsedResponse.riskAssessment || { hazards: [] },
      requiredPPE: parsedResponse.requiredPPE || [],
      methodStatement: parsedResponse.methodStatement || [],
      citations: parsedResponse.citations || [],
      emergencyProcedures: parsedResponse.emergencyProcedures || [],
      confidence: parsedResponse.confidence || 0.85
    };

    console.log('✅ H&S Agent: Generated risk assessment with', structuredResponse.riskAssessment.hazards.length, 'hazards');

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
