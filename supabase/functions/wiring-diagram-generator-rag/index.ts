import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, handleError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { safeAll } from "../_shared/safe-parallel.ts";
import { retrieveRegulations } from "../_shared/rag-retrieval.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'wiring-guidance-generator' });

  try {
    const { component_image_url } = await req.json();

    if (!component_image_url) {
      throw new ValidationError('component_image_url is required');
    }

    logger.info('Wiring guidance generator initiated', { component_image_url });

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Step 1: Identify component from image
    logger.info('Analyzing component image');
    
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
                    text: `Identify this electrical component. Provide:
1. Component type (e.g., "Electric Shower", "Socket Outlet", "Light Switch")
2. Ratings visible (amps/watts/volts)
3. Manufacturer and model (if visible)
4. Terminal markings (L, N, E, COM, L1, L2, etc.)
5. Any specific features (2-gang, 3-position, IP rating, etc.)

Be concise and technical.`
                  },
                  {
                    type: 'image_url',
                    image_url: { url: component_image_url }
                  }
                ]
              }
            ],
            max_tokens: 300
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Image analysis failed: ${res.status}`);
          }
          return res.json();
        }),
        Timeouts.STANDARD,
        'Image analysis'
      ),
      RetryPresets.STANDARD
    );
    
    const componentDetails = imageAnalysisData.choices[0].message.content;
    logger.info('Component identified', { componentDetails: componentDetails.substring(0, 100) });

    // Step 2: Intelligent component-specific RAG retrieval
    const componentType = componentDetails.split('\n')[0].replace(/^\d+\.\s*/, '').trim();
    
    logger.info('Using intelligent RAG for component-specific regulations', { componentType });

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      logger.warn('OPENAI_API_KEY not found, falling back to keyword search');
    }

    const { successes, failures } = await logger.time(
      'Smart RAG searches',
      async () => await safeAll([
        {
          name: 'installation',
          execute: () => withTimeout(
            supabase
              .from('installation_knowledge')
              .select('*')
              .or(`topic.ilike.%${componentType}%,content.ilike.%${componentType}%,content.ilike.%terminal%,content.ilike.%wiring%`)
              .limit(10),
            Timeouts.STANDARD,
            'Installation manuals'
          )
        },
        {
          name: 'wiring_regs',
          execute: async () => openAiKey 
            ? await retrieveRegulations(
                `${componentType} wiring requirements: terminal connections, cable colors, protection requirements`,
                8,
                openAiKey
              )
            : { data: [], error: null }
        },
        {
          name: 'safety_regs',
          execute: async () => openAiKey
            ? await retrieveRegulations(
                `${componentType} safety requirements: RCD protection, IP ratings, zones, isolation`,
                5,
                openAiKey
              )
            : { data: [], error: null }
        },
        {
          name: 'installation_regs',
          execute: async () => openAiKey
            ? await retrieveRegulations(
                `${componentType} installation method: cable sizing, mounting, earthing, bonding`,
                5,
                openAiKey
              )
            : { data: [], error: null }
        }
      ])
    );

    if (failures.length > 0) {
      logger.warn('Some RAG searches failed', { failures });
    }

    const installationDocs = successes.find(s => s.name === 'installation')?.result?.data || [];
    const wiringRegs = successes.find(s => s.name === 'wiring_regs')?.result || [];
    const safetyRegs = successes.find(s => s.name === 'safety_regs')?.result || [];
    const installRegs = successes.find(s => s.name === 'installation_regs')?.result || [];
    
    // Merge and deduplicate regulations
    const allRegulations = [...wiringRegs, ...safetyRegs, ...installRegs];
    const regulations = Array.from(
      new Map(allRegulations.map(reg => [reg.id, reg])).values()
    );

    logger.info('Smart RAG retrieval completed', { 
      installationCount: installationDocs.length,
      regulationsCount: regulations.length,
      wiringRegsCount: wiringRegs.length,
      safetyRegsCount: safetyRegs.length,
      installRegsCount: installRegs.length
    });

    // Step 3: Generate wiring guidance using AI + enhanced RAG context
    const ragContext = `
Installation Manuals (${installationDocs.length} sources):
${installationDocs.map(doc => `- ${doc.topic}: ${doc.content.substring(0, 200)}`).join('\n')}

BS 7671 Wiring Regulations (${regulations.length} relevant regulations):
${regulations.map(reg => `- [${reg.regulation_number}] ${reg.similarity ? `(relevance: ${(reg.similarity * 100).toFixed(0)}%)` : ''} ${reg.content.substring(0, 250)}`).join('\n\n')}
`;

    logger.info('Generating wiring guidance with AI');

    const guidanceData = await withRetry(
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
                role: 'system',
                content: `You are a UK electrician providing BS 7671-compliant wiring guidance. Generate step-by-step instructions using UK wiring colours (Brown=Live, Blue=Neutral, Green/Yellow=Earth). Be practical and safety-focused.`
              },
              {
                role: 'user',
                content: `Component identified: ${componentDetails}

Using this technical knowledge:
${ragContext}

This component can potentially be wired in multiple ways depending on:
- Circuit type (lighting/power/dedicated)
- Control method (switched/unswitched/2-way/intermediate)
- Installation location (indoor/outdoor/bathroom zones)
- Supply configuration (single-phase/3-phase)
- Special requirements (RCD protection, isolation, emergency lighting)

Analyze if this component has multiple valid wiring scenarios. If YES, provide 2-4 distinct options.
If NO (only one standard method exists), provide that single method.

Return JSON in this format:
{
  "component_name": "Component name",
  "wiring_scenarios": [
    {
      "scenario_id": "scenario_1",
      "scenario_name": "Standard Switched Circuit",
      "use_case": "Most common domestic installation",
      "complexity": "simple",
      "recommended": true,
      "wiring_steps": [
        {
          "step": 1,
          "title": "Step title",
          "instruction": "Clear instruction",
          "safety_critical": true,
          "bs7671_reference": "Regulation number"
        }
      ],
      "terminal_connections": [
        {
          "terminal": "Terminal marking (L/N/E/COM/etc)",
          "wire_colour": "UK wire colour",
          "connection_point": "Description",
          "notes": "Any specific instructions"
        }
      ],
      "safety_warnings": ["Warning 1", "Warning 2"],
      "required_tests": ["Test 1", "Test 2"]
    }
  ],
  "comparison": {
    "key_differences": ["Difference 1", "Difference 2"],
    "decision_factors": ["Factor 1 to consider", "Factor 2"]
  }
}`
              }
            ],
            max_tokens: 1500
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Guidance generation failed: ${res.status}`);
          }
          return res.json();
        }),
        Timeouts.EXTENDED,
        'Guidance generation'
      ),
      RetryPresets.STANDARD
    );

    const guidanceText = guidanceData.choices[0].message.content;
    const jsonMatch = guidanceText.match(/\{[\s\S]*\}/);
    const guidance = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!guidance) {
      throw new Error('Failed to parse wiring guidance');
    }

    logger.info('Wiring guidance generated successfully');

    return new Response(JSON.stringify({
      component_name: guidance.component_name,
      component_details: componentDetails,
      wiring_scenarios: guidance.wiring_scenarios || [
        {
          scenario_id: 'default',
          scenario_name: 'Standard Installation',
          use_case: 'Standard BS 7671 compliant installation',
          complexity: 'simple',
          recommended: true,
          wiring_steps: guidance.wiring_steps,
          terminal_connections: guidance.terminal_connections,
          safety_warnings: guidance.safety_warnings,
          required_tests: guidance.required_tests
        }
      ],
      comparison: guidance.comparison,
      rag_sources: {
        installation_docs_count: installationDocs.length,
        regulations_count: regulations.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logger.error('Wiring guidance generator failed', { error });
    return handleError(error);
  }
});
