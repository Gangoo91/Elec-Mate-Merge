import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    console.log('🔧 Installer Agent: Processing installation query');

    const tools = [
      {
        type: "function",
        function: {
          name: "check_special_location",
          description: "Identify special location requirements per BS 7671 Section 7 (bathrooms, swimming pools, saunas, etc.)",
          parameters: {
            type: "object",
            properties: {
              location_type: { type: "string", description: "Type of location (e.g., 'bathroom', 'outdoor', 'sauna')" },
              zone: { type: "string", description: "Zone within special location (e.g., 'Zone 1', 'Zone 2')" }
            },
            required: ["location_type"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "suggest_installation_method",
          description: "Recommend practical installation method based on building structure and cable route",
          parameters: {
            type: "object",
            properties: {
              cable_route: { type: "string", description: "Planned cable route description" },
              building_type: { type: "string", description: "Type of building (domestic, commercial, industrial)" },
              cable_size: { type: "number", description: "Cable size in mm²" }
            },
            required: ["cable_route"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "identify_hazards",
          description: "List safety hazards and required precautions for the installation",
          parameters: {
            type: "object",
            properties: {
              work_area: { type: "string", description: "Description of work area" },
              energized_work: { type: "boolean", description: "Is work near live parts?" }
            },
            required: ["work_area"]
          }
        }
      }
    ];

    const systemPrompt = `You are an experienced electrical installer with 25+ years on-site experience.

CRITICAL RULES:
- Focus on practical, safe installation methods
- Reference IET On-Site Guide and Approved Codes of Practice
- Identify special location requirements per BS 7671 Section 7
- Consider building fabric and cable routing practicalities
- Emphasize safe isolation procedures
- Recommend appropriate tools and fixing methods

Provide step-by-step installation guidance covering:
1. Safety precautions and PPE
2. Required tools and equipment
3. Cable routing and fixing methods
4. Termination procedures
5. Special location requirements (if applicable)
6. Final checks before energization

Always prioritize safety and compliance.`;

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
        temperature: 0.4
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    const toolCalls = assistantMessage.tool_calls || [];

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 Executing tool: ${functionName}`, args);
      await executeInstallerTool(functionName, args);
    }

    const responseContent = assistantMessage.content || 'Installation guidance complete.';

    return new Response(JSON.stringify({
      response: responseContent,
      toolCalls,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in installer-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Installer agent failed',
      response: 'Unable to process installation request.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function executeInstallerTool(functionName: string, args: any): Promise<any> {
  switch (functionName) {
    case 'check_special_location':
      return checkSpecialLocation(args);
    case 'suggest_installation_method':
      return suggestInstallationMethod(args);
    case 'identify_hazards':
      return identifyHazards(args);
    default:
      return { result: 'Unknown tool' };
  }
}

function checkSpecialLocation(args: any) {
  const { location_type, zone } = args;
  
  const specialRequirements: Record<string, any> = {
    'bathroom': {
      ipRating: 'IPX4 minimum (Zone 2), IPX5 for Zone 1',
      restrictions: 'No socket outlets in Zones 0-2',
      bonding: 'Supplementary bonding may be required',
      regulation: 'BS 7671 Section 701'
    },
    'outdoor': {
      ipRating: 'IPX4 minimum (IP65 recommended)',
      restrictions: 'RCD protection required (30mA)',
      bonding: 'Check earth electrode requirements',
      regulation: 'BS 7671 Section 714'
    }
  };
  
  return {
    result: specialRequirements[location_type.toLowerCase()] || {
      message: 'Standard installation requirements apply'
    }
  };
}

function suggestInstallationMethod(args: any) {
  const { cable_route, building_type, cable_size } = args;
  
  return {
    result: {
      method: 'Surface clipped (Method C)',
      clips_spacing: cable_size && cable_size >= 10 ? '250mm horizontal, 400mm vertical' : '300mm horizontal, 450mm vertical',
      protection: 'Consider oval conduit in high-traffic areas',
      fire_barriers: 'Seal penetrations with fire-rated material'
    }
  };
}

function identifyHazards(args: any) {
  const { work_area, energized_work } = args;
  
  return {
    result: {
      hazards: [
        'Live electrical circuits',
        'Working at height',
        'Confined spaces (if applicable)',
        'Asbestos (in older buildings)',
        'Dust and debris'
      ],
      precautions: [
        'Safe isolation and lock-off',
        'PPE: Safety boots, hard hat, gloves, safety glasses',
        'Test before touch - prove dead',
        'Adequate lighting',
        'First aid kit and trained first aider on site'
      ],
      permits_required: energized_work ? ['Permit to Work'] : []
    }
  };
}
