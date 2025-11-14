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

  const systemPrompt = `You are a UK electrical circuit extraction expert. Extract ALL circuits from descriptions.

LOAD TYPES: socket, lighting, cooker, shower, ev-charger, immersion, heating, outdoor

TYPICAL UK POWER:
- Socket ring: 7360W
- Lighting: 1200W  
- Shower: 8500-10500W
- EV charger: 7400W
- Cooker: 9200W
- Outdoor socket: 3000W

Return ONLY valid JSON array of circuits. No markdown, no explanation.

Format:
[
  {
    "name": "Socket Ring 1",
    "loadType": "socket",
    "loadPower": 7360,
    "cableLength": 20,
    "phases": "single",
    "specialLocation": "none"
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
    console.error('❌ No circuits extracted');
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

    // Fix 5: Remove duplicate circuit extraction - batch-design-handler handles this more comprehensively

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
