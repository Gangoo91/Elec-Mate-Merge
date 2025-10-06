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

    console.log('✅ Commissioning Agent: Processing testing query');

    const tools = [
      {
        type: "function",
        function: {
          name: "list_required_tests",
          description: "List all required tests per BS 7671 Part 6 based on circuit type and installation",
          parameters: {
            type: "object",
            properties: {
              circuit_type: { type: "string", description: "Type of circuit being tested" },
              installation_type: { type: "string", enum: ["domestic", "commercial", "industrial"] }
            },
            required: ["circuit_type"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "specify_test_values",
          description: "Provide expected test results and pass/fail criteria per BS 7671",
          parameters: {
            type: "object",
            properties: {
              test_type: { type: "string", enum: ["insulation_resistance", "continuity", "earth_fault_loop", "rcd"], description: "Type of test" },
              voltage: { type: "number", description: "Circuit voltage" },
              circuit_details: { type: "object", description: "Circuit specifications" }
            },
            required: ["test_type"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "generate_test_schedule",
          description: "Create testing checklist with sequence and procedures",
          parameters: {
            type: "object",
            properties: {
              circuits: { type: "array", items: { type: "string" }, description: "List of circuits to test" }
            },
            required: ["circuits"]
          }
        }
      }
    ];

    const systemPrompt = `You're a commissioning specialist chatting with a colleague about testing the job. Keep it natural and conversational - no markdown, no bullet points, just chat like you're texting a mate about what tests to do.

Talk about the required tests (continuity, insulation resistance, polarity, earth loop, RCD tests) but explain it casually. Reference BS 7671 Part 6 and GN3 when needed but keep it flowing naturally.

Mention what readings they should expect and what would be a fail, but do it conversationally. For example: "Right so you'll need to check continuity first - should be under 0.05 ohms for that 10mm. Then insulation resistance, you're looking for at least 1 megohm, ideally way higher."

Keep it friendly and helpful, like you're walking them through the test schedule.`;

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

    const toolCalls = assistantMessage.tool_calls || [];
    const citations: any[] = [];

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 Executing tool: ${functionName}`, args);
      
      const toolResult = await executeCommissioningTool(functionName, args);
      
      if (toolResult.citations) {
        citations.push(...toolResult.citations);
      }
    }

    const responseContent = assistantMessage.content || 'Testing guidance complete.';

    return new Response(JSON.stringify({
      response: responseContent,
      toolCalls,
      citations,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in commissioning-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Commissioning agent failed',
      response: 'Unable to process testing request.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function executeCommissioningTool(functionName: string, args: any): Promise<any> {
  switch (functionName) {
    case 'list_required_tests':
      return listRequiredTests(args);
    case 'specify_test_values':
      return specifyTestValues(args);
    case 'generate_test_schedule':
      return generateTestSchedule(args);
    default:
      return { result: 'Unknown tool' };
  }
}

function listRequiredTests(args: any) {
  const { circuit_type, installation_type } = args;
  
  const baseTests = [
    'Continuity of protective conductors',
    'Insulation resistance',
    'Polarity',
    'Earth fault loop impedance',
    'RCD operation (if applicable)'
  ];
  
  const ringTests = circuit_type?.toLowerCase().includes('ring') 
    ? ['Ring final circuit continuity'] 
    : [];
  
  return {
    result: {
      required_tests: [...baseTests, ...ringTests],
      test_sequence: 'Dead tests first, then live tests',
      equipment_needed: [
        'Multifunction tester (MFT)',
        'Proving unit',
        'RCD tester (if applicable)'
      ]
    },
    citations: [
      { number: 'Reg 610.1', title: 'General requirements for testing' },
      { number: 'Reg 612', title: 'Testing procedures' }
    ]
  };
}

function specifyTestValues(args: any) {
  const { test_type, voltage } = args;
  
  const testCriteria: Record<string, any> = {
    'insulation_resistance': {
      test_voltage: voltage && voltage > 250 ? '500V DC' : '250V DC',
      min_value: '≥ 1.0 MΩ (preferably ≥ 2.0 MΩ)',
      regulation: 'Reg 612.4',
      procedure: 'Test between live conductors and earth, and between live conductors'
    },
    'continuity': {
      test_method: 'Long lead or wander lead method',
      max_value: 'R1 + R2 should not exceed calculated value',
      regulation: 'Reg 612.2',
      procedure: 'Measure resistance between MET and furthest point on circuit'
    },
    'earth_fault_loop': {
      test_method: 'Direct measurement using loop tester',
      max_value: 'Must not exceed maximum Zs for protective device',
      regulation: 'Reg 612.9',
      safety: 'Live test - ensure RCD bypassed or locked out'
    },
    'rcd': {
      trip_time_half_rating: '≤ 300ms at 0.5 × IΔn',
      trip_time_full_rating: '≤ 300ms at 1 × IΔn',
      trip_time_five_times: '≤ 40ms at 5 × IΔn',
      regulation: 'Reg 612.10'
    }
  };
  
  return {
    result: testCriteria[test_type] || { message: 'Refer to BS 7671 Part 6' },
    citations: [
      { number: 'BS 7671 Part 6', title: 'Inspection and Testing' }
    ]
  };
}

function generateTestSchedule(args: any) {
  const { circuits } = args;
  
  return {
    result: {
      test_sequence: [
        '1. Visual inspection (Reg 611)',
        '2. Continuity tests (dead)',
        '3. Insulation resistance tests (dead)',
        '4. Polarity check (dead)',
        '5. Earth fault loop impedance (live)',
        '6. RCD operation tests (live)',
        '7. Functional testing'
      ],
      schedule: circuits?.map((circuit: string, idx: number) => ({
        circuit_number: idx + 1,
        circuit_description: circuit,
        tests_required: 'All applicable tests per BS 7671 Part 6',
        status: 'Pending'
      })) || [],
      documentation: 'Record all results on Electrical Installation Certificate (EIC)'
    }
  };
}
