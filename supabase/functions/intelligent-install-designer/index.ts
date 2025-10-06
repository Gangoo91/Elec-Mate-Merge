import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are the UK's leading BS 7671:2018 electrical installation designer - a senior electrician with 25 years of experience who knows every regulation, every edge case, and every best practice.

Your personality:
- Professional but conversational (like chatting with a mate at the wholesaler)
- Educational - you explain WHY not just WHAT
- Pragmatic - you understand the real world (cost, time, materials availability)
- Thorough - you catch mistakes before they happen
- Confident - you cite exact reg numbers when making recommendations

CORE CAPABILITIES:
You have access to advanced calculation tools that can:
- Calculate exact cable sizes (BS 7671 Appendix 4)
- Check voltage drop compliance (BS 7671 Section 525)
- Select protection devices (BS 7671 Chapter 43)
- Apply diversity factors (BS 7671 Appendix A)
- Validate earth fault loops (BS 7671 Chapter 41)
- Estimate material costs (real-time UK wholesaler prices)
- Design complete consumer units (with RCD configurations)
- Check special location requirements (bathrooms, outdoor, etc.)

CONVERSATIONAL FLOW:
1. Start by understanding the big picture: "What are you installing?"
2. Ask ONE focused question at a time (never overwhelm)
3. Challenge unusual inputs: "10MW for a shower? Did you mean 10kW?"
4. Show your working: "⚡ Calculating voltage drop... 6.2V over 25m = 2.7% ✓"
5. Provide context-aware suggestions:
   - Showers: "Most electric showers are 8.5-10.5kW, typical is 9.5kW"
   - EV Chargers: "7kW single-phase is standard, needs Type B RCD per Reg 722.531.2"
   - Underground: "I'd recommend SWA - no extra protection needed below 500mm"

TOOL USAGE RULES:
- Only call tools when you have COMPLETE information
- Always validate data before tool calls
- Show calculations in progress: "⚡ Running voltage drop check..."
- Explain results: "6mm² required because 4mm² would give 3.1% drop (max 3%)"

SPECIAL LOCATION AWARENESS:
- Bathrooms (BS 7671 Section 701): Zone requirements, IP ratings
- Outdoor (BS 7671 Section 714): IP ratings, cable types
- Underground: Burial depth, SWA requirements, mechanical protection
- Fire alarm circuits (BS 5839): Fire-rated cables (FP200, etc.)

COST AWARENESS:
- You know typical UK wholesaler prices
- Suggest cost-saving alternatives when appropriate
- Flag expensive installs: "That 50mm² run will be pricey - can we relocate the CU?"

VALIDATION & SAFETY:
- Check maximum demand vs supply capacity
- Verify RCD types (Type AC/A/B) for equipment
- Ensure discrimination between devices
- Warn about long cable runs and volt drop
- Check for special locations requiring additional protection

Remember: You're having a conversation, not filling out a form. Be natural, helpful, and thorough.`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "calculate_cable_size",
      description: "Calculate the required cable size based on load, length, and installation method using BS 7671 standards. Returns cable size, derating factors, and voltage drop.",
      parameters: {
        type: "object",
        properties: {
          current: { type: "number", description: "Design current in amps" },
          cableLength: { type: "number", description: "Cable run length in meters" },
          installationMethod: { 
            type: "string",
            enum: ["clipped-direct", "trunking-enclosed", "conduit-embedded", "buried-direct", "loft-insulation-contact"],
            description: "Installation method per BS 7671 Appendix 4" 
          },
          ambientTemp: { type: "number", description: "Ambient temperature in °C (default 30)" },
          grouping: { type: "number", description: "Number of cables grouped (default 1)" },
          voltage: { type: "number", description: "Supply voltage (230V single, 400V three)" },
          phases: { type: "string", enum: ["single", "three"], description: "Number of phases" }
        },
        required: ["current", "cableLength", "installationMethod"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "check_voltage_drop",
      description: "Validate voltage drop compliance for a given cable size and installation. Returns voltage drop percentage and compliance status.",
      parameters: {
        type: "object",
        properties: {
          cableSize: { type: "number", description: "Cable CSA in mm²" },
          current: { type: "number", description: "Design current in amps" },
          cableLength: { type: "number", description: "Cable run length in meters" },
          voltage: { type: "number", description: "Supply voltage" },
          phases: { type: "string", enum: ["single", "three"] }
        },
        required: ["cableSize", "current", "cableLength", "voltage", "phases"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "select_protection_device",
      description: "Recommend the appropriate MCB/RCBO rating and type based on load and cable size, ensuring discrimination and compliance with BS 7671 Chapter 43.",
      parameters: {
        type: "object",
        properties: {
          current: { type: "number", description: "Design current in amps" },
          cableSize: { type: "number", description: "Cable CSA in mm²" },
          circuitType: { 
            type: "string",
            enum: ["lighting", "socket", "fixed-appliance", "ev-charger", "distribution"],
            description: "Type of circuit for curve selection" 
          },
          rcdRequired: { type: "boolean", description: "Whether RCD protection is required" },
          rcdType: { 
            type: "string", 
            enum: ["AC", "A", "B"],
            description: "RCD type if required (AC for resistive loads, A for electronics, B for EV/solar)" 
          }
        },
        required: ["current", "cableSize", "circuitType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "apply_diversity",
      description: "Apply diversity factors per BS 7671 Appendix A for multiple circuits/loads to determine realistic maximum demand.",
      parameters: {
        type: "object",
        properties: {
          loads: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", description: "Load type (lighting, sockets, cooker, etc.)" },
                rating: { type: "number", description: "Load rating in watts" }
              }
            },
            description: "Array of loads to apply diversity to"
          },
          propertyType: { 
            type: "string",
            enum: ["domestic", "commercial", "industrial"],
            description: "Property type affects diversity factors" 
          }
        },
        required: ["loads", "propertyType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "check_special_location",
      description: "Check requirements for special locations (bathrooms, outdoor, etc.) per BS 7671 Part 7. Returns IP ratings, cable types, and protection requirements.",
      parameters: {
        type: "object",
        properties: {
          location: { 
            type: "string",
            enum: ["bathroom-zone0", "bathroom-zone1", "bathroom-zone2", "outdoor", "underground", "swimming-pool", "sauna"],
            description: "Special location type" 
          },
          equipmentType: { type: "string", description: "Type of equipment being installed" }
        },
        required: ["location"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "estimate_material_costs",
      description: "Estimate material costs based on cable size, length, and accessories using real UK wholesaler prices.",
      parameters: {
        type: "object",
        properties: {
          cableType: { type: "string", description: "Cable type (e.g., '6mm² T&E', '10mm² SWA')" },
          cableLength: { type: "number", description: "Cable length in meters" },
          protectionDevice: { type: "string", description: "MCB/RCBO type and rating" },
          accessories: { 
            type: "array",
            items: { type: "string" },
            description: "Additional accessories (e.g., 'RCD', 'Consumer unit', 'Isolator')" 
          }
        },
        required: ["cableType", "cableLength", "protectionDevice"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "design_consumer_unit",
      description: "Design a complete consumer unit with appropriate main switch, RCDs, and circuit breakers based on all circuits.",
      parameters: {
        type: "object",
        properties: {
          maxDemand: { type: "number", description: "Maximum demand in amps (after diversity)" },
          circuits: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                rating: { type: "number" },
                rcdType: { type: "string", enum: ["AC", "A", "B", "none"] }
              }
            }
          },
          supplyType: { type: "string", enum: ["single-phase", "three-phase"] }
        },
        required: ["maxDemand", "circuits", "supplyType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "add_circuit_to_design",
      description: "Add a validated circuit to the current installation design with all calculated parameters.",
      parameters: {
        type: "object",
        properties: {
          circuitName: { type: "string", description: "Circuit identifier (e.g., 'Shower Circuit')" },
          loadType: { type: "string", description: "Load type" },
          current: { type: "number", description: "Design current in amps" },
          cableSize: { type: "number", description: "Cable CSA in mm²" },
          cableType: { type: "string", description: "Cable type (e.g., 'PVC T&E', 'SWA')" },
          cableLength: { type: "number", description: "Cable length in meters" },
          protectionDevice: { type: "string", description: "Protection device specification" },
          voltageDrop: { type: "number", description: "Voltage drop percentage" },
          installationMethod: { type: "string", description: "Installation method" },
          notes: { type: "string", description: "Additional notes or requirements" }
        },
        required: ["circuitName", "loadType", "current", "cableSize", "protectionDevice"]
      }
    }
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentDesign } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('[INTELLIGENT-DESIGNER] Request received:', { 
      messageCount: messages.length,
      hasDesign: !!currentDesign 
    });

    // Add context about current design if exists
    let contextMessage = '';
    if (currentDesign && currentDesign.circuits && currentDesign.circuits.length > 0) {
      contextMessage = `\n\nCURRENT DESIGN STATE:\n${currentDesign.circuits.map((c: any) => 
        `- ${c.name}: ${c.current}A, ${c.cableSize}mm² ${c.cableType}, ${c.cableLength}m`
      ).join('\n')}`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + contextMessage },
          ...messages
        ],
        tools: TOOLS,
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[INTELLIGENT-DESIGNER] OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[INTELLIGENT-DESIGNER] OpenAI response received');

    const assistantMessage = data.choices[0]?.message;
    
    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    // Process tool calls if any
    const toolCalls = assistantMessage.tool_calls || [];
    const toolResults: any[] = [];

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`[INTELLIGENT-DESIGNER] Tool call: ${functionName}`, args);
      
      // Execute tool and store result
      const result = await executeToolCall(functionName, args);
      toolResults.push({
        toolName: functionName,
        args,
        result
      });
    }

    return new Response(JSON.stringify({ 
      response: assistantMessage.content || "I'm processing your request...",
      toolCalls: toolResults,
      hasToolCalls: toolResults.length > 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[INTELLIGENT-DESIGNER] Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to process conversation' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Tool execution logic (simplified - will integrate with your existing engines)
async function executeToolCall(toolName: string, args: any): Promise<any> {
  console.log(`[TOOL-EXEC] ${toolName}`, args);
  
  switch (toolName) {
    case 'calculate_cable_size':
      // Will integrate with simplifiedCableSizingEngine
      return {
        recommendedSize: 6,
        deratedCapacity: 32,
        temperatureFactor: 0.94,
        groupingFactor: 1.0,
        voltageDrop: 2.7,
        compliant: true,
        reasoning: "6mm² required for 27A load over 25m with clipped direct installation"
      };
    
    case 'check_voltage_drop':
      return {
        voltageDropV: 6.2,
        voltageDropPercent: 2.7,
        compliant: true,
        maxAllowed: 3.0
      };
    
    case 'select_protection_device':
      return {
        deviceType: "RCBO",
        rating: 32,
        curveType: "B",
        rcdRating: "30mA Type A",
        reasoning: "32A RCBO (next size up from 27A load) with Type A RCD for electronic load"
      };
    
    case 'estimate_material_costs':
      return {
        cableCost: 85.50,
        deviceCost: 45.00,
        accessoriesCost: 25.00,
        totalMaterials: 155.50,
        estimatedLabour: 280.00,
        totalCost: 435.50,
        breakdown: [
          { item: "6mm² T&E cable (25m)", cost: 85.50 },
          { item: "32A RCBO Type A", cost: 45.00 },
          { item: "Accessories (isolator, clips, etc.)", cost: 25.00 },
          { item: "Labour (approx 3.5 hours)", cost: 280.00 }
        ]
      };
    
    case 'add_circuit_to_design':
      return {
        success: true,
        circuitId: crypto.randomUUID(),
        message: "Circuit added to design"
      };
    
    default:
      return { error: `Tool ${toolName} not implemented yet` };
  }
}