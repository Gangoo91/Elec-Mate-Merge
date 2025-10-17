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
          execute: async () => {
            if (!openAiKey) return { data: [], error: null };
            const results = await retrieveRegulations(
              `${componentType} wiring requirements: terminal connections, cable colors, protection requirements`,
              8,
              openAiKey
            );
            return { data: results, error: null };
          }
        },
        {
          name: 'safety_regs',
          execute: async () => {
            if (!openAiKey) return { data: [], error: null };
            const results = await retrieveRegulations(
              `${componentType} safety requirements: RCD protection, IP ratings, zones, isolation`,
              5,
              openAiKey
            );
            return { data: results, error: null };
          }
        },
        {
          name: 'installation_regs',
          execute: async () => {
            if (!openAiKey) return { data: [], error: null };
            const results = await retrieveRegulations(
              `${componentType} installation method: cable sizing, mounting, earthing, bonding`,
              5,
              openAiKey
            );
            return { data: results, error: null };
          }
        }
      ])
    );

    if (failures.length > 0) {
      logger.warn('Some RAG searches failed', { failures });
    }

    const installationDocs = successes.find(s => s.name === 'installation')?.result?.data || [];
    const wiringRegs = successes.find(s => s.name === 'wiring_regs')?.result?.data || [];
    const safetyRegs = successes.find(s => s.name === 'safety_regs')?.result?.data || [];
    const installRegs = successes.find(s => s.name === 'installation_regs')?.result?.data || [];
    
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
                content: `You are an experienced UK electrician providing BS 7671:2018 compliant wiring guidance.

CRITICAL UK CABLE COLOUR STANDARDS:
- Brown = Line (Live) - permanent live or switched live
- Blue = Neutral - can be used as switched live ONLY if sleeved with brown sleeving at both ends
- Green/Yellow = Earth/CPC - protective conductor, NEVER carries current in normal operation
- Strappers (2-way/intermediate switching): Use brown/black cores from 3-core+E cable, or properly sleeved cores
- ALWAYS specify when sleeving is required
- Common strapper practice: Brown and Black cores from twin and earth with appropriate identification

RESPONSE FORMAT:
You MUST return ONLY valid JSON with no text before or after. Ensure proper commas between array items and closing brackets.

INSTRUCTION DETAIL REQUIREMENTS:
- Each wiring step instruction must be 2-3 sentences minimum
- Include practical guidance ("Use a torque screwdriver set to 1.2Nm", "Look for the terminal marked L1")
- Explain what to check and verify at each step
- Mention common mistakes to avoid
- Include visual/physical cues to help electricians
- Add verification steps ("Gently tug cable to ensure secure connection")
- Be specific about terminal markings and locations
- Provide "what_to_check" and "common_mistakes" for each step`
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

Analyze if this component has multiple valid wiring scenarios. If YES, provide 2-4 distinct options (e.g., 1-way vs 2-way switching, RCD vs non-RCD).
If NO (only one standard method), provide that single method.

CRITICAL: Return ONLY valid JSON. No markdown, no extra text, just pure JSON.

Format:
{
  "component_name": "Component name",
  "wiring_scenarios": [
    {
      "scenario_id": "scenario_1",
      "scenario_name": "Scenario name (e.g., '1-Gang 1-Way Switch', 'RCD Protected Socket')",
      "use_case": "When to use this method (be specific about room types, regulations)",
      "complexity": "simple|intermediate|advanced",
      "recommended": true,
      "wiring_steps": [
        {
          "step": 1,
          "title": "Clear action-based title",
          "instruction": "DETAILED instruction (2-3 sentences). Include: what to do, how to verify it's correct, what to look for, tool settings if relevant. Example: 'Connect the brown live conductor to terminal L1 on the switch. Ensure the terminal screw is tightened to 1.2Nm using a torque screwdriver - over-tightening can damage the terminal block. Gently tug the cable to verify a secure connection before proceeding.'",
          "what_to_check": "What to verify at this step (e.g., 'Terminal should be marked L1', 'Cable should not pull out with moderate force')",
          "common_mistakes": "Common error to avoid (e.g., 'Confusing L1 with L2 terminals', 'Over-stripping the conductor leaving bare copper exposed')",
          "safety_critical": true,
          "bs7671_reference": "e.g. 411.3.2"
        }
      ],
      "terminal_connections": [
        {
          "terminal": "L1",
          "wire_colour": "Brown",
          "connection_point": "Live supply from consumer unit",
          "notes": "Permanent live feed - use brown sleeving if using blue core"
        }
      ],
      "safety_warnings": [
        "Specific safety warning with consequences (e.g., 'NEVER work on live circuits - risk of fatal electric shock up to 230V')"
      ],
      "required_tests": [
        "Specific test with pass criteria (e.g., 'Insulation resistance test: >1MΩ between L-E at 500V DC')"
      ]
    }
  ],
  "comparison": {
    "key_differences": ["Difference 1", "Difference 2"],
    "decision_factors": ["Factor 1 to consider", "Factor 2"]
  }
}`
              }
            ],
            max_tokens: 4000
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
    
    // Extract JSON with improved regex
    let jsonMatch = guidanceText.match(/\{[\s\S]*\}/);
    let guidance = null;
    
    try {
      if (jsonMatch) {
        // Try to parse the matched JSON
        guidance = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: try parsing the entire response
        guidance = JSON.parse(guidanceText.trim());
      }
      
      // Validate required fields
      if (!guidance?.component_name || !guidance?.wiring_scenarios || !Array.isArray(guidance.wiring_scenarios)) {
        throw new Error('Invalid JSON structure: missing required fields');
      }
      
      // Validate each scenario has required fields
      for (const scenario of guidance.wiring_scenarios) {
        if (!scenario.scenario_id || !scenario.wiring_steps || !scenario.terminal_connections) {
          throw new Error(`Invalid scenario structure: ${scenario.scenario_id || 'unknown'}`);
        }
      }
      
      logger.info('JSON validation passed', { scenarioCount: guidance.wiring_scenarios.length });
      
    } catch (parseError) {
      logger.error('JSON parsing failed', { 
        error: parseError.message,
        responsePreview: guidanceText.substring(0, 500),
        responseLength: guidanceText.length
      });
      throw new Error(`Failed to parse AI response: ${parseError.message}. The AI returned invalid JSON.`);
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
