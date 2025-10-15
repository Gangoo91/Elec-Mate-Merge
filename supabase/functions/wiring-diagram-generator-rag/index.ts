import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { safeAll } from "../_shared/safe-parallel.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'wiring-diagram-generator-rag' });

  try {
    const { component_type, circuit_params, installation_context, component_image_url } = await req.json();

    if (!component_type) {
      throw new ValidationError('component_type is required');
    }

    logger.info('Wiring Diagram Generator RAG initiated', { 
      component_type, 
      circuit_params 
    });

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Analyze component image if provided
    let enhancedComponentType = component_type;
    let imageAnalysisContext = '';
    
    if (component_image_url) {
      logger.info('Analyzing component image', { component_image_url });
      
      const imageAnalysisData = await withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { 
                  role: 'user', 
                  content: [
                    {
                      type: 'text',
                      text: 'Analyze this electrical component image. Identify: component type, ratings (amps/volts), manufacturer, model number, visible terminals, cable entry points, and any visible labels/markings. Be specific and technical.'
                    },
                    {
                      type: 'image_url',
                      image_url: { url: component_image_url }
                    }
                  ]
                }
              ],
              max_tokens: 500
            }),
          }).then(async (res) => {
            if (!res.ok) {
              logger.warn('Image analysis failed', { status: res.status });
              return { choices: [{ message: { content: '' } }] };
            }
            return res.json();
          }),
          Timeouts.STANDARD,
          'Image analysis'
        ),
        RetryPresets.STANDARD
      );
      
      imageAnalysisContext = imageAnalysisData.choices[0].message.content;
      enhancedComponentType = `${component_type} - ${imageAnalysisContext}`;
      
      logger.info('Image analysis completed', { imageAnalysisContext: imageAnalysisContext.substring(0, 100) });
    }

    // RAG query for wiring procedures and installation methods
    const ragQuery = `${enhancedComponentType} wiring procedure terminal connections cable installation methods UK colour codes safe isolation testing`;

    // Generate embedding
    const embeddingData = await logger.time(
      'Lovable AI embedding generation',
      async () => await withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: ragQuery,
            }),
          }).then(async (res) => {
            if (!res.ok) {
              throw new ExternalAPIError('Lovable AI', `Embedding failed: ${res.status}`);
            }
            return res.json();
          }),
          Timeouts.STANDARD,
          'Lovable AI embedding'
        ),
        RetryPresets.STANDARD
      )
    );

    const embedding = embeddingData.data[0].embedding;

    // Query all knowledge bases in parallel with safe failure handling
    const { successes, failures } = await logger.time(
      'Knowledge base searches',
      async () => await safeAll([
        {
          name: 'installation',
          execute: () => withTimeout(
            supabase.rpc('search_installation_knowledge', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'Installation knowledge search'
          )
        },
        {
          name: 'bs7671',
          execute: () => withTimeout(
            supabase.rpc('search_bs7671', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'BS 7671 search'
          )
        },
        {
          name: 'health_safety',
          execute: () => withTimeout(
            supabase.rpc('search_health_safety', {
              query_embedding: embedding,
              match_threshold: 0.7,
              match_count: 3
            }),
            Timeouts.STANDARD,
            'Safety knowledge search'
          )
        }
      ])
    );

    if (failures.length > 0) {
      logger.warn('Some knowledge base searches failed', { failures });
    }

    const installationDocs = successes.find(s => s.name === 'installation')?.result?.data || [];
    const regulations = successes.find(s => s.name === 'bs7671')?.result?.data || [];
    const safetyDocs = successes.find(s => s.name === 'health_safety')?.result?.data || [];

    logger.info('Knowledge base search completed', { 
      installationCount: installationDocs.length, 
      regulationsCount: regulations.length,
      safetyCount: safetyDocs.length 
    });

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
IMAGE ANALYSIS: ${imageAnalysisContext || 'No image provided'}
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

    const aiData = await logger.time(
      'AI schematic generation',
      async () => await withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
          }).then(async (res) => {
            if (!res.ok) {
              throw new ExternalAPIError('Lovable AI', `Schematic generation failed: ${res.status}`);
            }
            return res.json();
          }),
          Timeouts.LONG,
          'AI schematic generation'
        ),
        RetryPresets.STANDARD
      )
    );

    const result = JSON.parse(aiData.choices[0].message.content);

    logger.info('Schematic diagram generated successfully');

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
    logger.error('Wiring diagram generator RAG failed', { error });
    return handleError(error);
  }
});
