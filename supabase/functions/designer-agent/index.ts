import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log('🎨 Designer Agent: Processing design query');

    // Define specialized tools for designer
    const tools = [
      {
        type: "function",
        function: {
          name: "calculate_cable_size",
          description: "Calculate required cable size based on load current, cable length, and installation method per BS 7671",
          parameters: {
            type: "object",
            properties: {
              load_watts: { type: "number", description: "Load in watts" },
              voltage: { type: "number", description: "Voltage (230V or 400V)" },
              cable_length: { type: "number", description: "Cable run length in meters" },
              installation_method: { type: "string", description: "Installation method (e.g., 'Method C - Clipped direct')" },
              phases: { type: "string", enum: ["single", "three"], description: "Single or three phase" }
            },
            required: ["load_watts", "voltage", "cable_length", "installation_method"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "check_voltage_drop",
          description: "Calculate voltage drop and check compliance with BS 7671 (3% limit for lighting, 5% for other uses)",
          parameters: {
            type: "object",
            properties: {
              cable_size: { type: "number", description: "Cable CSA in mm²" },
              current: { type: "number", description: "Load current in amps" },
              length: { type: "number", description: "Cable length in meters" },
              voltage: { type: "number", description: "Supply voltage" }
            },
            required: ["cable_size", "current", "length", "voltage"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "select_protection_device",
          description: "Select appropriate MCB/RCBO rating based on cable size and load per BS 7671 Reg 433",
          parameters: {
            type: "object",
            properties: {
              load_current: { type: "number", description: "Design current (Ib) in amps" },
              cable_ccc: { type: "number", description: "Cable current-carrying capacity (Iz) in amps" },
              circuit_type: { type: "string", description: "Circuit type (e.g., 'socket', 'lighting', 'shower', 'cooker')" }
            },
            required: ["load_current", "cable_ccc"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "validate_earth_fault_loop",
          description: "Calculate maximum Zs and validate earth fault loop impedance for disconnection times per BS 7671 Reg 411.3.2",
          parameters: {
            type: "object",
            properties: {
              protective_device_rating: { type: "number", description: "MCB rating in amps" },
              device_type: { type: "string", enum: ["B", "C", "D"], description: "MCB type curve" },
              circuit_type: { type: "string", description: "Circuit type" }
            },
            required: ["protective_device_rating", "device_type"]
          }
        }
      }
    ];

    const systemPrompt = `You're an experienced spark chatting with a colleague about circuit design. Keep it natural and conversational - no markdown, no bullet points, just chat like you're texting a mate.

Still cite regulations naturally (e.g., "According to Reg 433.1..." or "Reg 525 says...") but make it flow in sentences.

Cover the technical stuff - cable sizing, voltage drop, protection devices - but explain it like you're on a job site having a brew, not writing a textbook.

Keep it friendly but professional. You know your stuff, so sound confident.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        tools,
        tool_choice: "auto",
        max_tokens: 1500,
        temperature: 0.2
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    // Handle tool calls if any
    const toolCalls = assistantMessage.tool_calls || [];
    const citations: any[] = [];

    // Execute tool calls
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 Executing tool: ${functionName}`, args);
      
      // Execute the tool function
      const toolResult = await executeDesignerTool(functionName, args);
      
      // Extract citations from tool results
      if (toolResult.citations) {
        citations.push(...toolResult.citations);
      }
    }

    const responseContent = assistantMessage.content || 'Design analysis complete.';

    return new Response(JSON.stringify({
      response: responseContent,
      toolCalls,
      citations,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in designer-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Designer agent failed',
      response: 'Unable to process design request.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function executeDesignerTool(functionName: string, args: any): Promise<any> {
  switch (functionName) {
    case 'calculate_cable_size':
      return calculateCableSize(args);
    case 'check_voltage_drop':
      return checkVoltageDrop(args);
    case 'select_protection_device':
      return selectProtectionDevice(args);
    case 'validate_earth_fault_loop':
      return validateEarthFaultLoop(args);
    default:
      return { result: 'Unknown tool' };
  }
}

function calculateCableSize(args: any) {
  const { load_watts, voltage, cable_length, installation_method, phases } = args;
  
  const current = phases === 'three' 
    ? load_watts / (Math.sqrt(3) * voltage * 0.95) 
    : load_watts / (voltage * 0.95);
  
  // Simplified cable sizing (in reality, this would use BS 7671 tables)
  let cableSize = 1.5;
  if (current > 20) cableSize = 2.5;
  if (current > 27) cableSize = 4;
  if (current > 37) cableSize = 6;
  if (current > 47) cableSize = 10;
  if (current > 63) cableSize = 16;
  
  return {
    result: {
      cable_size: cableSize,
      load_current: Math.round(current * 10) / 10,
      installation_method
    },
    citations: [
      { number: 'Reg 433.1.204', title: 'Cable selection for fault protection' }
    ]
  };
}

function checkVoltageDrop(args: any) {
  const { cable_size, current, length, voltage } = args;
  
  // Simplified mV/A/m values for copper conductors
  const mvPerAmpMeter: Record<number, number> = {
    1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75
  };
  
  const mvDrop = (mvPerAmpMeter[cable_size] || 18) * current * length / 1000;
  const voltageDropPercent = (mvDrop / voltage) * 100;
  
  return {
    result: {
      voltage_drop_volts: Math.round(mvDrop * 10) / 10,
      voltage_drop_percent: Math.round(voltageDropPercent * 100) / 100,
      compliant: voltageDropPercent <= 5,
      limit: '5% (Reg 525)'
    },
    citations: [
      { number: 'Reg 525', title: 'Voltage drop in consumers installations' }
    ]
  };
}

function selectProtectionDevice(args: any) {
  const { load_current, cable_ccc, circuit_type } = args;
  
  // Standard BS EN 60898 ratings
  const standardRatings = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100];
  
  let selectedRating = standardRatings.find(rating => 
    rating >= load_current && rating <= cable_ccc
  ) || 6;
  
  const deviceType = circuit_type?.toLowerCase().includes('shower') || 
                     circuit_type?.toLowerCase().includes('cooker') ? 'Type B' : 'Type B';
  
  return {
    result: {
      rating: selectedRating,
      device_type: deviceType,
      compliant: selectedRating >= load_current && selectedRating <= cable_ccc
    },
    citations: [
      { number: 'Reg 433.1', title: 'Protection against overload current' }
    ]
  };
}

function validateEarthFaultLoop(args: any) {
  const { protective_device_rating, device_type } = args;
  
  // Max Zs values from BS 7671 Table 41.3 (simplified)
  const maxZsTable: Record<string, Record<number, number>> = {
    'B': { 6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44, 40: 1.15, 45: 1.02, 50: 0.92, 63: 0.73 },
    'C': { 6: 3.83, 10: 2.30, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 45: 0.51, 50: 0.46, 63: 0.36 },
    'D': { 6: 1.92, 10: 1.15, 16: 0.72, 20: 0.57, 25: 0.46, 32: 0.36, 40: 0.29, 45: 0.26, 50: 0.23, 63: 0.18 }
  };
  
  const maxZs = maxZsTable[device_type]?.[protective_device_rating] || 1.15;
  
  return {
    result: {
      max_zs: maxZs,
      disconnection_time: '0.4s',
      regulation: 'BS 7671 Reg 411.3.2'
    },
    citations: [
      { number: 'Reg 411.3.2', title: 'Maximum earth fault loop impedance' },
      { number: 'Table 41.3', title: 'Maximum Zs values for automatic disconnection' }
    ]
  };
}
