import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert BS 7671:2018 qualified electrical installation designer. Your role is to have a natural conversation with electricians to design safe, compliant installations.

CRITICAL RULES:
1. Ask ONE question at a time - never overwhelm with multiple questions
2. Be conversational and friendly, not robotic
3. Always cite BS 7671 regulations when making recommendations
4. Validate responses and catch potential issues
5. Suggest typical values when relevant
6. Only use tool calls when you have COMPLETE information for a circuit

WHAT YOU NEED TO COLLECT (for single circuits):
- Circuit type (shower, cooker, EV charger, ring main, lighting, etc.)
- Load in watts or amps
- Cable length in meters
- Location (inside/outside/underground/loft)
- Installation method (clipped direct, buried, conduit, etc.)

CONTEXT AWARENESS (suggest these when mentioned):
- Shower: typically 8-10.5kW, needs RCD protection
- Cooker: typically 9-13kW, diversity may apply
- EV charger: 7kW (single phase) or 22kW (3-phase), Type B RCD required
- Underground: suggest SWA cable, ask about burial depth
- Fire alarm/Emergency lighting: require fire-rated cables
- Bathroom zones: special requirements per BS 7671 Section 701

FOR MULTI-CIRCUIT/WHOLE BOARD DESIGN:
- Ask about property type and size
- Calculate diversity per BS 7671 Appendix A
- Recommend appropriate main switch size
- Suggest RCD configuration (Type A/AC/B as needed)
- Calculate SPD requirements per BS 7671 Section 443.4
- Recommend RCBO vs RCD+MCB approach

VALIDATION:
- If values seem wrong, question them: "10MW seems very high for a shower - did you mean 10kW?"
- Warn about long cable runs: "30m is quite long - you may need larger cable or experience voltage drop"
- Check compatibility: "Underground SWA doesn't need additional mechanical protection"

TONE:
- Professional but friendly
- Educational - explain WHY not just WHAT
- Confident in regulations
- Helpful with suggestions

When you have complete information, use the set_installation_data tool to structure the data.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentData } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('AI Planner request:', { messageCount: messages.length, currentData });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "set_installation_data",
              description: "Set installation parameters when you have COMPLETE and VALIDATED information from the conversation",
              parameters: {
                type: "object",
                properties: {
                  loadType: { 
                    type: "string",
                    enum: ["ring-main", "lighting", "cooker", "shower", "ev-charger", "heat-pump", "immersion", "fire-alarm", "emergency-light", "outdoor-socket", "custom"],
                    description: "Type of electrical load/circuit"
                  },
                  totalLoad: { 
                    type: "number",
                    description: "Total load in watts"
                  },
                  cableLength: { 
                    type: "number",
                    description: "Cable run length in meters"
                  },
                  installationMethod: {
                    type: "string",
                    enum: ["clipped-direct", "trunking-perforated", "trunking-enclosed", "conduit-surface", "conduit-embedded", "cable-tray", "buried-direct", "loft-free", "loft-insulation-contact"],
                    description: "How the cable will be installed"
                  },
                  voltage: {
                    type: "number",
                    description: "Supply voltage (230V single phase, 400V three phase)"
                  },
                  phases: {
                    type: "string",
                    enum: ["single", "three"],
                    description: "Number of phases"
                  }
                },
                required: ["loadType", "totalLoad"]
              }
            }
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    const assistantMessage = data.choices[0]?.message;
    
    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    // Check if AI made a tool call (extracted data)
    let extractedData = null;
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0];
      if (toolCall.function.name === 'set_installation_data') {
        extractedData = JSON.parse(toolCall.function.arguments);
        console.log('Extracted installation data:', extractedData);
      }
    }

    return new Response(JSON.stringify({ 
      response: assistantMessage.content || "I've updated the installation details based on our conversation.",
      extractedData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in conversational-install-planner:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to process conversation' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
