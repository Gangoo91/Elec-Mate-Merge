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
    const { planData, result } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Validating installation design');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are a senior UK electrical engineer reviewing installation designs for BS 7671:2018 compliance.

Analyze the design and provide professional insights:
- Safety checks (voltage drop margins, protective device coordination, earth fault impedance)
- Optimization opportunities (could use smaller/larger cable, better protection)
- Cost savings (bulk buying, alternative materials)
- Warnings (long runs, high temperatures, special considerations)
- Best practice recommendations

Be specific and quantitative. Reference BS 7671 regulations where relevant.` 
          },
          { 
            role: 'user', 
            content: `Review this installation design:

Circuit: ${planData.loadType}
Load: ${planData.totalLoad}W (${(planData.totalLoad / planData.voltage).toFixed(1)}A)
Cable: ${result.recommendedCableSize}mm² ${planData.cableType}
Length: ${planData.cableLength}m
Installation: ${planData.installationMethod}
Location: ${planData.location}

Results:
- Voltage drop: ${result.voltageDropPercent.toFixed(2)}% (${result.voltageDrop.toFixed(2)}V)
- Protection: ${result.protectiveDevice}
- Cable capacity: ${result.capacity}A (derated: ${result.deratedCapacity.toFixed(1)}A)
- Zs: ${result.zs.toFixed(3)}Ω
- Safety margin: ${result.safetyMargin.toFixed(1)}%
- Derating: Temperature ${result.factors.temperature}, Grouping ${result.factors.grouping}, Overall ${result.factors.overall.toFixed(2)}

Provide structured insights in JSON format.` 
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "provide_insights",
              description: "Provide professional installation design insights",
              parameters: {
                type: "object",
                properties: {
                  safetyChecks: {
                    type: "array",
                    items: { type: "string" },
                    description: "Safety verification points"
                  },
                  optimizations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Design optimization suggestions"
                  },
                  costSavings: {
                    type: "array",
                    items: { type: "string" },
                    description: "Potential cost reduction opportunities"
                  },
                  warnings: {
                    type: "array",
                    items: { type: "string" },
                    description: "Important warnings or considerations"
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Best practice recommendations"
                  }
                },
                required: ["safetyChecks", "optimizations"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "provide_insights" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call in response');
    }

    const insights = JSON.parse(toolCall.function.arguments);
    console.log('Generated insights:', insights);

    return new Response(JSON.stringify(insights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in validate-installation function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to validate installation' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
