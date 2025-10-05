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
    const { description } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Parsing circuit description:', description);

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
            content: `You are an expert UK electrical engineer. Parse natural language circuit descriptions into structured data. Extract:
- loadType: ring-main, lighting, cooker, shower, ev-charger, heat-pump, immersion, fire-alarm, emergency-light, outdoor-socket, or custom
- totalLoad: power in watts (extract from kW, W, or common circuit types)
- cableLength: distance in meters
- location: inside, outside, underground, loft, plant-room
- cableRun: clipped-direct, trunking-perforated, trunking-enclosed, conduit-surface, conduit-embedded, cable-tray, buried-direct, loft-free, loft-insulation-contact
- mechanicalProtection: true if outside/underground
- voltage: 230V for single phase, 400V for three phase
- phases: single or three

Common loads:
- Ring main: 7360W (32A)
- Lighting: 1000W
- Cooker: 9200W (40A)
- Shower: 8500W (typically 8.5-10.5kW)
- EV charger: 7000W (7kW single phase)
- Heat pump: 5000W
- Immersion: 3000W

Return ONLY valid JSON, no markdown.` 
          },
          { role: 'user', content: description }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "parse_circuit",
              description: "Parse circuit description into structured installation data",
              parameters: {
                type: "object",
                properties: {
                  loadType: { 
                    type: "string",
                    enum: ["ring-main", "lighting", "cooker", "shower", "ev-charger", "heat-pump", "immersion", "fire-alarm", "emergency-light", "outdoor-socket", "custom"]
                  },
                  totalLoad: { type: "number", description: "Load in watts" },
                  cableLength: { type: "number", description: "Cable run length in meters" },
                  location: { 
                    type: "string",
                    enum: ["inside", "outside", "underground", "loft", "plant-room"]
                  },
                  cableRun: { 
                    type: "string",
                    enum: ["clipped-direct", "trunking-perforated", "trunking-enclosed", "conduit-surface", "conduit-embedded", "cable-tray", "buried-direct", "loft-free", "loft-insulation-contact"]
                  },
                  mechanicalProtection: { type: "boolean" },
                  voltage: { type: "number" },
                  phases: { type: "string", enum: ["single", "three"] }
                },
                required: ["loadType", "totalLoad"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "parse_circuit" } }
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

    const parsedData = JSON.parse(toolCall.function.arguments);
    console.log('Parsed circuit data:', parsedData);

    return new Response(JSON.stringify(parsedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in parse-circuit-description function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to parse description' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
