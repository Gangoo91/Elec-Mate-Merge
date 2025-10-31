import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';
import { Timeouts, withTimeout } from '../_shared/timeout.ts';
import { searchPracticalWorkBatch, searchBS7671Batch } from '../_shared/rag-batch-loader.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { batchId, items } = await req.json();
    logger.info(`🧪 Testing enrichment batch ${batchId}: ${items.length} items`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('batch_progress').update({
      status: 'processing',
      started_at: new Date().toISOString()
    }).eq('id', batchId);

    const enrichedItems = [];
    let lastHeartbeat = Date.now();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (Date.now() - lastHeartbeat > 20000) {
        await supabase.from('batch_progress').update({
          items_processed: i,
          updated_at: new Date().toISOString()
        }).eq('id', batchId);
        lastHeartbeat = Date.now();
      }

      try {
        const enriched = await enrichTesting(supabase, item, logger);
        enrichedItems.push(enriched);
      } catch (error) {
        logger.error(`Failed to enrich item ${item.id}`, { error });
      }
    }

    await supabase.from('batch_progress').update({
      status: 'completed',
      items_processed: items.length,
      completed_at: new Date().toISOString()
    }).eq('id', batchId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Testing enrichment failed', { error });
    
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function enrichTesting(supabase: any, item: any, logger: any) {
  const { id, content, description } = item;
  
  const testingContext = await searchPracticalWorkBatch(supabase, {
    keywords: ['test', 'inspection', 'continuity', 'insulation'],
    limit: 5,
    activity_filter: ['testing', 'inspection']
  });

  const bs7671Context = await searchBS7671Batch(supabase, {
    keywords: ['testing', 'inspection', 'verification'],
    limit: 3
  });

  const prompt = `You are a BS 7671 testing and inspection specialist. Analyze this test/inspection procedure.

PROCEDURE: ${content || description}

TESTING KNOWLEDGE:
${testingContext.map(c => c.content).join('\n\n')}

BS 7671 TESTING STANDARDS:
${bs7671Context.map(c => c.content).join('\n\n')}

Extract:
1. test_procedures: Array of test names
2. test_equipment_required: Array of equipment
3. acceptance_criteria: {continuity_max_ohms?, insulation_min_mohms?, rcd_trip_time_ms?, earth_loop_max_ohms?}
4. inspection_checklist: Array of inspection points
5. eicr_observation_codes: Array of applicable codes ["C1", "C2", "C3", "FI"]

Return ONLY valid JSON.`;

  const chatCompletion = await withTimeout(
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 800,
        temperature: 0.2,
        response_format: { type: 'json_object' }
      }),
    }).then(res => res.json()),
    Timeouts.PRACTICAL_WORK,
    'Testing enrichment'
  );

  const data = JSON.parse(chatCompletion.choices[0].message.content);

  await supabase.from('practical_work_intelligence').update({
    test_procedures: data.test_procedures,
    test_equipment_required: data.test_equipment_required,
    acceptance_criteria: data.acceptance_criteria,
    inspection_checklist: data.inspection_checklist,
    eicr_observation_codes: data.eicr_observation_codes,
    enrichment_metadata: supabase.raw(`
      jsonb_set(
        COALESCE(enrichment_metadata, '{}'::jsonb),
        '{stages}',
        COALESCE(enrichment_metadata->'stages', '[]'::jsonb) || '["testing"]'::jsonb
      )
    `)
  }).eq('practical_work_id', id);

  logger.info(`✅ Testing enriched: ${id}`);
  return { id, success: true };
}
