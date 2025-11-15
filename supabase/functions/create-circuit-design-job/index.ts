import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callOpenAI } from '../_shared/ai-providers.ts';

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
async function extractCircuitsFromPrompt(prompt: string, openAiKey: string): Promise<CircuitInput[]> {
  console.log('🔍 Extracting circuits from prompt:', prompt);

  const propertyType = (prompt.match(/\b(domestic|commercial|industrial)\b/i)?.[1] || 'domestic').toLowerCase();
  
  const systemPrompt = `You are a UK electrical circuit extraction expert for ${propertyType} installations.

CRITICAL: Generate COMPREHENSIVE circuit lists. For a ${propertyType} installation, you typically need:
- Domestic: 8-15 circuits (lighting, sockets, dedicated appliances)
- Commercial: 12-25 circuits (lighting zones, power circuits, IT, emergency systems)
- Industrial: 15-40 circuits (motors, control panels, distribution, emergency systems)

EXTRACT ALL CIRCUITS from the description. If unclear, INFER standard circuits for ${propertyType}.

LOAD TYPES: socket, lighting, cooker, shower, ev-charger, immersion, heating, outdoor, motor, control-panel, emergency-light, fire-alarm, data, hvac, compressor, conveyor

TYPICAL UK POWER VALUES:
- Socket ring: 7360W
- Lighting circuit: 1200W
- Motor (small): 2200W, (medium): 5500W, (large): 11000W
- Control panel: 3000W
- Emergency lighting: 500W
- Fire alarm: 300W
- HVAC: 3000-7500W
- Shower: 8500-10500W
- EV charger: 7400W
- Cooker: 9200W
- Compressor: 7500W
- Conveyor: 3000-5500W

FOR COMMERCIAL/INDUSTRIAL:
- Create separate zones (e.g., "Front Area Lighting", "Back Area Lighting")
- Include emergency lighting (BS 5266)
- Include fire alarm circuits if applicable (BS 5839)
- Separate circuits for IT/comms equipment
- Dedicated circuits for high-power equipment

EXAMPLES:

"Retail shop": Generate 8-12 circuits:
- Display Lighting (front)
- Display Lighting (back)
- Socket Ring 1 (till area)
- Socket Ring 2 (office)
- Emergency Lighting
- Security System
- External Signage
- Server/IT Equipment

"Production line": Generate 12-20 circuits:
- Conveyor Motor 1
- Conveyor Motor 2
- Control Panel 1
- Control Panel 2
- Lighting Zone 1
- Lighting Zone 2
- Emergency Lighting
- Socket Ring (office)
- Compressor
- Extraction System

Return ONLY valid JSON array. No markdown.

Format:
[
  {
    "name": "Circuit name",
    "loadType": "socket|lighting|motor|etc",
    "loadPower": 7360,
    "cableLength": 20,
    "phases": "single"|"three",
    "specialLocation": "none"|"bathroom"|"outdoor"
  }
]`;

  const response = await callOpenAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Extract circuits from: "${prompt}"` }
    ],
    model: 'gpt-5-mini-2025-08-07',
    max_tokens: 4000
  }, openAiKey, 120000); // 2 minute timeout for circuit extraction

  let content = response.content.trim();
  
  // Remove markdown code blocks if present
  if (content.startsWith('```')) {
    content = content.replace(/```json?\n?/g, '').replace(/```\n?$/g, '').trim();
  }

  let parsedCircuits;
  try {
    parsedCircuits = JSON.parse(content);
  } catch (e) {
    console.error('❌ Failed to parse JSON:', content);
    throw new Error('Failed to parse circuit extraction response');
  }

  if (!Array.isArray(parsedCircuits) || parsedCircuits.length === 0) {
    console.warn('⚠️ No circuits extracted from AI, returning empty array');
    return [];
  }

  const circuits: CircuitInput[] = parsedCircuits.map((c: any, idx: number) => ({
    id: `extracted-${Date.now()}-${idx}`,
    name: c.name,
    loadType: c.loadType,
    loadPower: c.loadPower,
    cableLength: c.cableLength || 20,
    phases: c.phases || 'single',
    specialLocation: c.specialLocation === 'none' ? undefined : c.specialLocation,
    notes: 'Extracted from AI prompt'
  }));

  console.log(`✅ Extracted ${circuits.length} circuits from prompt`);
  return circuits;
}

/**
 * Generate intelligent fallback circuits based on property type
 */
function generateFallbackCircuits(propertyType: string): CircuitInput[] {
  const templates: Record<string, CircuitInput[]> = {
    domestic: [
      { id: 'fb-1', name: 'Downstairs Lighting', loadType: 'lighting', loadPower: 1000, cableLength: 25, phases: 'single' },
      { id: 'fb-2', name: 'Upstairs Lighting', loadType: 'lighting', loadPower: 800, cableLength: 30, phases: 'single' },
      { id: 'fb-3', name: 'Socket Ring 1 (Ground)', loadType: 'socket', loadPower: 7360, cableLength: 35, phases: 'single' },
      { id: 'fb-4', name: 'Socket Ring 2 (First Floor)', loadType: 'socket', loadPower: 7360, cableLength: 40, phases: 'single' },
      { id: 'fb-5', name: 'Cooker Circuit', loadType: 'cooker', loadPower: 9200, cableLength: 15, phases: 'single' },
      { id: 'fb-6', name: 'Shower Circuit', loadType: 'shower', loadPower: 8500, cableLength: 20, phases: 'single' }
    ],
    commercial: [
      { id: 'fb-1', name: 'Front Area Lighting', loadType: 'lighting', loadPower: 1500, cableLength: 30, phases: 'single' },
      { id: 'fb-2', name: 'Back Area Lighting', loadType: 'lighting', loadPower: 1200, cableLength: 25, phases: 'single' },
      { id: 'fb-3', name: 'Emergency Lighting', loadType: 'emergency-light', loadPower: 500, cableLength: 35, phases: 'single' },
      { id: 'fb-4', name: 'Socket Ring 1 (Front)', loadType: 'socket', loadPower: 7360, cableLength: 30, phases: 'single' },
      { id: 'fb-5', name: 'Socket Ring 2 (Office)', loadType: 'socket', loadPower: 7360, cableLength: 25, phases: 'single' },
      { id: 'fb-6', name: 'IT Equipment Circuit', loadType: 'data', loadPower: 3000, cableLength: 20, phases: 'single' },
      { id: 'fb-7', name: 'Fire Alarm System', loadType: 'fire-alarm', loadPower: 300, cableLength: 40, phases: 'single' },
      { id: 'fb-8', name: 'Security System', loadType: 'socket', loadPower: 500, cableLength: 35, phases: 'single' }
    ],
    industrial: [
      { id: 'fb-1', name: 'Production Lighting Zone 1', loadType: 'lighting', loadPower: 2000, cableLength: 40, phases: 'single' },
      { id: 'fb-2', name: 'Production Lighting Zone 2', loadType: 'lighting', loadPower: 2000, cableLength: 40, phases: 'single' },
      { id: 'fb-3', name: 'Office Lighting', loadType: 'lighting', loadPower: 800, cableLength: 25, phases: 'single' },
      { id: 'fb-4', name: 'Emergency Lighting', loadType: 'emergency-light', loadPower: 600, cableLength: 50, phases: 'single' },
      { id: 'fb-5', name: 'Motor Circuit 1', loadType: 'motor', loadPower: 5500, cableLength: 30, phases: 'three' },
      { id: 'fb-6', name: 'Motor Circuit 2', loadType: 'motor', loadPower: 5500, cableLength: 35, phases: 'three' },
      { id: 'fb-7', name: 'Control Panel 1', loadType: 'control-panel', loadPower: 3000, cableLength: 25, phases: 'single' },
      { id: 'fb-8', name: 'Socket Ring (Office)', loadType: 'socket', loadPower: 7360, cableLength: 30, phases: 'single' },
      { id: 'fb-9', name: 'Compressor Circuit', loadType: 'compressor', loadPower: 7500, cableLength: 40, phases: 'three' },
      { id: 'fb-10', name: 'HVAC System', loadType: 'hvac', loadPower: 5000, cableLength: 35, phases: 'three' }
    ]
  };
  
  const fallback = templates[propertyType] || templates.domestic;
  console.log(`📋 Generated ${fallback.length} fallback circuits for ${propertyType} installation`);
  return fallback;
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

    // Extract circuits from natural language prompt if provided
    let enrichedInputs = { ...inputs };
    
    if (inputs.additionalPrompt?.trim() && (!inputs.circuits || inputs.circuits.length === 0)) {
      console.log('🔍 Extracting circuits from natural language prompt...');
      try {
        const openAiKey = Deno.env.get('OPENAI_API_KEY');
        if (!openAiKey) {
          console.warn('⚠️ OpenAI API key not configured, skipping circuit extraction');
        } else {
          const extractedCircuits = await extractCircuitsFromPrompt(inputs.additionalPrompt, openAiKey);
          if (extractedCircuits.length > 0) {
            enrichedInputs.circuits = extractedCircuits;
            console.log(`✅ Extracted ${extractedCircuits.length} circuits from prompt`);
          } else {
            // Use intelligent fallback based on property type
            const propertyType = inputs.propertyType || 'domestic';
            const fallbackCircuits = generateFallbackCircuits(propertyType);
            enrichedInputs.circuits = fallbackCircuits;
            console.log(`📋 Using ${fallbackCircuits.length} fallback circuits for ${propertyType} installation`);
          }
        }
      } catch (error) {
        console.error('❌ Circuit extraction failed:', error);
        // Continue without extracted circuits - designer will handle the prompt directly
      }
    }

    // Create job record
    const { data: job, error } = await supabase
      .from('circuit_design_jobs')
      .insert({
        user_id: user.id,
        job_inputs: enrichedInputs,
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
        // Fix 3: Replace deprecated SUPABASE_ANON_KEY with SUPABASE_SERVICE_ROLE_KEY
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
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
