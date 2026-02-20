import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId } = await req.json();
    console.log(`[PROCESS-SURVEY] Starting job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('site_survey_analysis_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('[PROCESS-SURVEY] Job not found:', jobId);
      return new Response(JSON.stringify({ error: 'Job not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update status to processing — 5%
    await supabase
      .from('site_survey_analysis_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Loading site visit data...',
      })
      .eq('id', jobId);

    try {
      const inputData = job.input_data;

      // 15% — Build context
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          progress: 15,
          current_step: 'Building analysis context...',
        })
        .eq('id', jobId);

      const contextParts: string[] = [];
      contextParts.push(`Property Type: ${inputData.propertyType || 'Unknown'}`);
      contextParts.push(`Address: ${inputData.propertyAddress || 'Unknown'}`);
      contextParts.push(`Postcode: ${inputData.propertyPostcode || 'Unknown'}`);
      contextParts.push(`Photos: ${inputData.photoCount || 0}`);
      contextParts.push('');
      contextParts.push('=== ROOMS & ITEMS ===');

      for (const room of inputData.rooms || []) {
        contextParts.push(`\nRoom: ${room.roomName} (${room.roomType})`);
        if (room.notes) contextParts.push(`  Notes: ${room.notes}`);
        for (const item of room.items || []) {
          contextParts.push(
            `  - ${item.description} x${item.quantity} ${item.unit}${item.notes ? ` (${item.notes})` : ''}`
          );
        }
      }

      contextParts.push('\n=== PROPERTY ASSESSMENT PROMPTS ===');
      for (const prompt of inputData.prompts || []) {
        contextParts.push(`  ${prompt.question}: ${prompt.response}`);
      }

      const contextString = contextParts.join('\n');

      // 25% — RAG query for pricing
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          progress: 25,
          current_step: 'Querying pricing database...',
        })
        .eq('id', jobId);

      // Simple keyword-based pricing lookup (no embedding needed for basic items)
      let pricingContext = '';
      try {
        const itemDescriptions = (inputData.rooms || [])
          .flatMap((r: Record<string, unknown>) =>
            ((r.items as Record<string, unknown>[]) || []).map(
              (i: Record<string, unknown>) => i.description
            )
          )
          .filter(Boolean)
          .slice(0, 20);

        if (itemDescriptions.length > 0) {
          const { data: pricingData } = await supabase
            .from('pricing_embeddings')
            .select('description, unit_price, unit, supplier')
            .or(
              itemDescriptions
                .map((d: string) => `description.ilike.%${d.split(' ')[0]}%`)
                .join(',')
            )
            .limit(50);

          if (pricingData && pricingData.length > 0) {
            pricingContext =
              '\n=== REFERENCE PRICING ===\n' +
              pricingData
                .map(
                  (p: Record<string, unknown>) =>
                    `${p.description}: £${p.unit_price}/${p.unit} (${p.supplier})`
                )
                .join('\n');
          }
        }
      } catch (pricingErr) {
        console.warn('[PROCESS-SURVEY] Pricing lookup failed (non-fatal):', pricingErr);
      }

      // 40% — Call OpenAI
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          progress: 40,
          current_step: 'Running AI analysis...',
        })
        .eq('id', jobId);

      const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

      const analysisTools = [
        {
          type: 'function',
          function: {
            name: 'submit_analysis',
            description: 'Submit the complete site survey analysis results',
            parameters: {
              type: 'object',
              properties: {
                materials_list: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      quantity: { type: 'number' },
                      unit: { type: 'string' },
                      est_price_gbp: { type: 'number' },
                      supplier: { type: 'string' },
                    },
                    required: ['description', 'quantity', 'unit', 'est_price_gbp'],
                  },
                },
                regulatory_flags: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      regulation: { type: 'string' },
                      description: { type: 'string' },
                      severity: { type: 'string', enum: ['info', 'warning', 'critical'] },
                      room: { type: 'string' },
                    },
                    required: ['regulation', 'description', 'severity'],
                  },
                },
                cable_sizing: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      circuit: { type: 'string' },
                      cable_type: { type: 'string' },
                      csa_mm2: { type: 'string' },
                      ref_method: { type: 'string' },
                    },
                    required: ['circuit', 'cable_type', 'csa_mm2', 'ref_method'],
                  },
                },
                circuit_recommendations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      room: { type: 'string' },
                      circuit_type: { type: 'string' },
                      rating_a: { type: 'number' },
                      protection: { type: 'string' },
                    },
                    required: ['room', 'circuit_type', 'rating_a', 'protection'],
                  },
                },
                labour_estimate: {
                  type: 'object',
                  properties: {
                    total_hours: { type: 'number' },
                    breakdown: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          task: { type: 'string' },
                          hours: { type: 'number' },
                        },
                        required: ['task', 'hours'],
                      },
                    },
                  },
                  required: ['total_hours', 'breakdown'],
                },
                cost_summary: {
                  type: 'object',
                  properties: {
                    materials_gbp: { type: 'number' },
                    labour_gbp: { type: 'number' },
                    total_gbp: { type: 'number' },
                    confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
                  },
                  required: ['materials_gbp', 'labour_gbp', 'total_gbp', 'confidence'],
                },
                issues: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      severity: { type: 'string', enum: ['info', 'warning', 'critical'] },
                      action: { type: 'string' },
                    },
                    required: ['description', 'severity', 'action'],
                  },
                },
              },
              required: [
                'materials_list',
                'regulatory_flags',
                'cable_sizing',
                'circuit_recommendations',
                'labour_estimate',
                'cost_summary',
                'issues',
              ],
            },
          },
        },
      ];

      const systemPrompt = `You are an expert UK electrical contractor analysing a site survey.
Based on the captured site visit data, provide a comprehensive analysis including:
1. Materials list with estimated UK trade prices in GBP
2. Regulatory flags — reference BS 7671:2018+A3:2024 (the current 18th Edition with Amendment 3). NEVER reference A2:2022 — always use A3:2024. Keep each flag description to 1 sentence max.
3. Cable sizing recommendations. Rules:
   - csa_mm2: ONLY the number e.g. "2.5" or "6" — NO "mm" or "mm²"
   - cable_type: short e.g. "T&E" or "SWA" — max 3 words
   - ref_method: just the method letter/number e.g. "C" or "A" or "B" — NOT full BS 7671 references
   - circuit: short name e.g. "Kitchen ring final" — max 4 words
4. Circuit recommendations per room. Rules:
   - Lighting = 6A (NOT 10A), ring final = 32A, radial sockets = 20A, cooker = 32A or 45A
   - circuit_type: short e.g. "Ring final" or "Radial" — max 3 words
   - protection: short e.g. "32A MCB + 30mA RCD" — max 6 words
5. Labour estimate in hours
6. Overall cost summary
7. Any issues or concerns — 1 sentence per issue max

CRITICAL: This displays on a mobile phone. ALL text values must be SHORT and concise. No long paragraphs. Max 1 sentence per description field.
Use the reference pricing data if available. All prices in GBP.
Labour rate: £${inputData.labourRateGbp || 45}/hour for a qualified electrician.
Always call the submit_analysis tool with your complete analysis.`;

      const response = await callOpenAI(
        {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: contextString + pricingContext },
          ],
          tools: analysisTools,
          tool_choice: { type: 'function', function: { name: 'submit_analysis' } },
          max_tokens: 16384,
        },
        openAiKey
      );

      // 70% — Parse response
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          progress: 70,
          current_step: 'Parsing analysis results...',
        })
        .eq('id', jobId);

      let analysisResult;
      if (response.toolCalls && response.toolCalls.length > 0) {
        const toolCall = response.toolCalls[0];
        const args =
          typeof toolCall.function?.arguments === 'string'
            ? JSON.parse(toolCall.function.arguments)
            : toolCall.function?.arguments;
        analysisResult = args;
      } else {
        // Fallback: try to parse from content
        try {
          analysisResult = JSON.parse(response.content);
        } catch {
          throw new Error('AI did not return structured analysis data');
        }
      }

      // 100% — Save result
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          status: 'completed',
          progress: 100,
          current_step: 'Analysis complete',
          result: analysisResult,
          completed_at: new Date().toISOString(),
        })
        .eq('id', jobId);

      console.log(`[PROCESS-SURVEY] ✅ Job completed: ${jobId}`);

      return new Response(JSON.stringify({ success: true, jobId }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (processingError: unknown) {
      console.error('[PROCESS-SURVEY] Error processing job:', processingError);
      await captureException(processingError, {
        functionName: 'process-site-survey-analysis',
        requestUrl: req.url,
        requestMethod: req.method,
      });

      const processingErrorMessage =
        processingError instanceof Error ? processingError.message : String(processingError);
      await supabase
        .from('site_survey_analysis_jobs')
        .update({
          status: 'failed',
          error: processingErrorMessage,
          completed_at: new Date().toISOString(),
        })
        .eq('id', jobId);

      return new Response(JSON.stringify({ error: processingErrorMessage }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error: unknown) {
    console.error('[PROCESS-SURVEY] Fatal error:', error);
    await captureException(error, {
      functionName: 'process-site-survey-analysis',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
