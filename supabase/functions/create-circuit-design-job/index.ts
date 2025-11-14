import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callGemini } from '../_shared/ai-providers.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CircuitInput {
  id: string;
  name: string;
  loadType: string;
  loadPower?: number;
  cableLength?: number;
  phases: 'single' | 'three';
  specialLocation?: 'bathroom' | 'outdoor' | 'underground' | 'kitchen' | 'none';
  notes?: string;
}

/**
 * Extract circuits from natural language prompt using AI
 */
async function extractCircuitsFromPrompt(prompt: string, geminiKey: string): Promise<CircuitInput[]> {
  console.log('🔍 Extracting circuits from prompt:', prompt);

  const systemPrompt = `You are a UK electrical circuit extraction expert. Extract circuit information from descriptions and convert to structured data.

CRITICAL RULES:
1. Extract ALL circuits mentioned in the description
2. Infer typical UK power ratings for each circuit type
3. Set reasonable cable lengths (15-25m for most circuits)
4. Use correct UK load types

LOAD TYPES:
Domestic: socket, lighting, cooker, shower, ev-charger, immersion, heating, smoke-alarm, garage, outdoor
Commercial: office-sockets, emergency-lighting, hvac, server-room, kitchen-equipment, signage, fire-alarm, access-control, cctv, data-cabinet
Industrial: three-phase-motor, machine-tool, welding, conveyor, extraction, control-panel, overhead-lighting, workshop-sockets, compressor, production-line

TYPICAL UK POWER RATINGS:
- Socket ring: 3000-7360W (32A max)
- Lighting circuit: 1000-1500W
- Shower: 7500-10500W
- EV charger: 3600-7400W
- Cooker: 7000-11000W
- Immersion heater: 3000W
- Outdoor socket: 3000W

Examples:
"4 socket rings" → 4 circuits with type=socket, power=7360W each
"6 lighting circuits" → 6 circuits with type=lighting, power=1200W each
"10.5kW shower" → 1 circuit with type=shower, power=10500W
"7.4kW EV charger" → 1 circuit with type=ev-charger, power=7400W`;

  const tools = [{
    type: "function",
    function: {
      name: "extract_circuits",
      description: "Extract circuit information from description",
      parameters: {
        type: "object",
        properties: {
          circuits: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", description: "Circuit name (e.g., 'Socket Ring 1', 'Kitchen Lighting')" },
                loadType: { type: "string", description: "Load type from the approved list" },
                loadPower: { type: "number", description: "Power in watts" },
                cableLength: { type: "number", description: "Cable length in meters (15-25m typical)" },
                phases: { type: "string", enum: ["single", "three"], description: "Single or three phase" },
                specialLocation: { type: "string", enum: ["bathroom", "outdoor", "underground", "kitchen", "none"], description: "Special location if applicable" }
              },
              required: ["name", "loadType", "loadPower", "phases"]
            }
          }
        },
        required: ["circuits"]
      }
    }
  }];

  const response = await callGemini({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Extract all circuits from: "${prompt}"` }
    ],
    tools,
    tool_choice: { type: "function", function: { name: "extract_circuits" } },
    temperature: 0.1,
    max_tokens: 4000
  }, geminiKey);

  if (!response.toolCalls || response.toolCalls.length === 0) {
    console.error('❌ No tool calls from Gemini');
    return [];
  }

  const extracted = response.toolCalls[0].function.arguments;
  const circuits: CircuitInput[] = extracted.circuits.map((c: any, idx: number) => ({
    id: `extracted-${Date.now()}-${idx}`,
    name: c.name,
    loadType: c.loadType,
    loadPower: c.loadPower,
    cableLength: c.cableLength || 20,
    phases: c.phases || 'single',
    specialLocation: c.specialLocation || 'none',
    notes: 'Extracted from AI prompt'
  }));

  console.log(`✅ Extracted ${circuits.length} circuits`);
  return circuits;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { inputs } = await req.json();

    if (!inputs) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: inputs' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract circuits from additionalPrompt if provided and circuits array is empty
    if (inputs.additionalPrompt && (!inputs.circuits || inputs.circuits.length === 0)) {
      const geminiKey = Deno.env.get('GEMINI_API_KEY');
      if (!geminiKey) {
        console.error('❌ GEMINI_API_KEY not configured');
        return new Response(
          JSON.stringify({ error: 'AI circuit extraction not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        console.log('🤖 Extracting circuits from prompt...');
        const extractedCircuits = await extractCircuitsFromPrompt(inputs.additionalPrompt, geminiKey);
        
        if (extractedCircuits.length === 0) {
          return new Response(
            JSON.stringify({ 
              error: 'Could not extract circuits from description',
              suggestion: 'Please be more specific or add circuits manually'
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        inputs.circuits = extractedCircuits;
        console.log(`✅ Added ${extractedCircuits.length} circuits from AI extraction`);
      } catch (error: any) {
        console.error('❌ Circuit extraction failed:', error);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to extract circuits from description',
            details: error.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create job record
    const { data: job, error } = await supabase
      .from('circuit_design_jobs')
      .insert({
        user_id: user.id,
        job_inputs: inputs,
        status: 'pending',
        progress: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create job:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Created circuit design job: ${job.id}`);

    // Trigger background processing (fire and forget)
    const processUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/process-circuit-design`;
    fetch(processUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobId: job.id })
    }).catch(err => console.error('Failed to trigger processing:', err));

    console.log(`🚀 Triggered background processing for job: ${job.id}`);

    return new Response(
      JSON.stringify({ jobId: job.id, status: 'pending' }),
      { 
        status: 202, // Accepted
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in create-circuit-design-job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
