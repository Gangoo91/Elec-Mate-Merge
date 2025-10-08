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
    const { component_type, circuit_params, installation_context } = await req.json();

    console.log('📐 Wiring Diagram Generator RAG: Creating schematic');
    console.log('Component:', component_type);
    console.log('Params:', circuit_params);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // RAG query for wiring procedures and installation methods
    const ragQuery = `${component_type} wiring procedure terminal connections cable installation methods UK colour codes safe isolation testing`;

    // Generate embedding
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Query installation knowledge
    const { data: installationDocs, error: instError } = await supabase.rpc('search_installation_knowledge', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 5
    });

    // Query BS 7671 for wiring requirements
    const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 5
    });

    // Query health & safety for safe working
    const { data: safetyDocs, error: safetyError } = await supabase.rpc('search_health_safety_knowledge', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: 3
    });

    console.log(`✅ RAG Results: ${installationDocs?.length || 0} installation docs, ${regulations?.length || 0} regs, ${safetyDocs?.length || 0} safety docs`);

    const ragContext = `
INSTALLATION KNOWLEDGE:
${installationDocs?.map((d: any) => `${d.topic}: ${d.content}`).join('\n') || 'None found'}

BS 7671 WIRING REQUIREMENTS:
${regulations?.map((r: any) => `Reg ${r.regulation_number}: ${r.content}`).join('\n') || 'None found'}

HEALTH & SAFETY PROCEDURES:
${safetyDocs?.map((s: any) => `${s.topic}: ${s.content}`).join('\n') || 'None found'}
`;

    // Generate schematic SVG using AI
    const schematicPrompt = `You are an electrical installation expert. Generate a simple single-line circuit diagram in SVG format.

COMPONENT: ${component_type}
CIRCUIT SPECIFICATION: ${JSON.stringify(circuit_params)}
INSTALLATION CONTEXT: ${installation_context}

${ragContext}

Generate a professional single-line diagram showing:
1. Supply (incoming from consumer unit)
2. Protection device (MCB/RCBO with ratings)
3. Cable run (with size labelled)
4. Load (component being wired)
5. Earth connection

Respond with valid JSON:
{
  "schematic_svg": "<svg>...</svg>",
  "circuit_spec": {
    "cableSize": 2.5,
    "cableType": "6242Y Twin & Earth",
    "protectionDevice": "32A MCB Type B",
    "rcdRequired": true,
    "rcdRating": 30
  },
  "wiring_procedure": [
    {
      "step": 1,
      "title": "Safe Isolation",
      "instruction": "Isolate supply and verify dead using approved voltage tester",
      "safety_critical": true,
      "bs7671_reference": "537.2",
      "ppe_required": ["Voltage tester", "Insulated tools"]
    }
  ],
  "terminal_connections": [
    {
      "terminal": "L",
      "wire_colour": "Brown",
      "connection_point": "Live terminal",
      "torque_setting": "1.2 Nm"
    }
  ],
  "testing_requirements": ["Continuity test (R1+R2)", "Insulation resistance ≥1MΩ", "Polarity check", "RCD test 30mA"],
  "installation_method_guidance": "From RAG knowledge...",
  "safety_warnings": ["Always isolate before working", "Use appropriate PPE", "Double-check polarity"]
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: schematicPrompt },
          { role: 'user', content: 'Generate the wiring schematic and procedure based on the installation knowledge provided.' }
        ],
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('AI schematic generation failed');
    }

    const aiData = await aiResponse.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    console.log('✅ Schematic diagram generated');

    return new Response(JSON.stringify({
      schematic_svg: result.schematic_svg || '<svg><text>Schematic generation in progress</text></svg>',
      circuit_spec: result.circuit_spec || {},
      wiring_procedure: result.wiring_procedure || [],
      terminal_connections: result.terminal_connections || [],
      testing_requirements: result.testing_requirements || [],
      installation_method_guidance: result.installation_method_guidance || '',
      safety_warnings: result.safety_warnings || [],
      rag_sources: {
        installation_docs_count: installationDocs?.length || 0,
        regulations_count: regulations?.length || 0,
        safety_docs_count: safetyDocs?.length || 0
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Wiring diagram generator RAG error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Diagram generation failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
