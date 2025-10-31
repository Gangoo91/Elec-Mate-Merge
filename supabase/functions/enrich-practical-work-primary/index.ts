import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';
import { Timeouts, withTimeout } from '../_shared/timeout.ts';
import { searchBS7671Batch } from '../_shared/rag-batch-loader.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { batchId, items } = await req.json();
    logger.info(`🎯 Primary enrichment batch ${batchId}: ${items.length} items`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Mark batch as processing
    await supabase.from('batch_progress').update({
      status: 'processing',
      started_at: new Date().toISOString()
    }).eq('id', batchId);

    const enrichedItems = [];
    let lastHeartbeat = Date.now();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Heartbeat every 20 seconds
      if (Date.now() - lastHeartbeat > 20000) {
        await supabase.from('batch_progress').update({
          items_processed: i,
          updated_at: new Date().toISOString()
        }).eq('id', batchId);
        lastHeartbeat = Date.now();
      }

      try {
        const enriched = await enrichPracticalWorkPrimary(supabase, item, logger);
        enrichedItems.push(enriched);
      } catch (error) {
        logger.error(`Failed to enrich item ${item.id}`, { error });
        enrichedItems.push({ id: item.id, error: error.message });
      }
    }

    // Mark batch complete
    await supabase.from('batch_progress').update({
      status: 'completed',
      items_processed: items.length,
      completed_at: new Date().toISOString(),
      data: { enriched_count: enrichedItems.filter(i => !i.error).length }
    }).eq('id', batchId);

    logger.info(`✅ Batch ${batchId} complete: ${enrichedItems.filter(i => !i.error).length}/${items.length} enriched`);

    return new Response(JSON.stringify({
      success: true,
      enriched: enrichedItems.filter(i => !i.error).length,
      failed: enrichedItems.filter(i => i.error).length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Primary enrichment failed', { error });
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function enrichPracticalWorkPrimary(supabase: any, item: any, logger: any) {
  const { id, content, description, cluster_id, source_tables } = item;
  
  // Extract keywords for RAG search
  const keywords = [
    ...description.toLowerCase().split(' ').filter((w: string) => w.length > 4).slice(0, 5),
    'equipment', 'installation', 'zone'
  ];

  // Search BS 7671 for equipment standards
  const bs7671Context = await searchBS7671Batch(supabase, { 
    keywords, 
    limit: 5 
  });

  // Build enrichment prompt
  const prompt = `You are a BS 7671 electrical installation expert. Analyze this practical work procedure and extract structured intelligence.

PROCEDURE:
${content || description}

BS 7671 CONTEXT:
${bs7671Context.map(c => c.content).join('\n\n')}

Extract the following fields:
1. activity_types: Array of applicable types ["installation", "maintenance", "testing", "inspection", "fault_diagnosis"]
2. equipment_category: Main category (e.g., "Consumer Units", "Cables", "Socket Outlets")
3. equipment_subcategory: Specific type
4. bs7671_zones: Array of applicable zones ["Zone 0", "Zone 1", "Zone 2", "Outside Zones"]
5. technical_complexity: 1-5 scale
6. risk_level: "low" | "medium" | "high" | "critical"
7. common_tools: Array of tools required
8. ppe_required: Array of PPE items

Return ONLY valid JSON with these exact fields.`;

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
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    }).then(res => res.json()),
    Timeouts.PRACTICAL_WORK,
    'GPT-4o-mini enrichment'
  );

  const enrichmentData = JSON.parse(chatCompletion.choices[0].message.content);

  // Insert PRIMARY facet only (cross-cutting fields)
  const { error } = await supabase.from('practical_work_intelligence').upsert({
    practical_work_id: id,
    facet_type: 'primary', // NEW: Explicitly set facet type
    cluster_id,
    canonical_id: id,
    source_tables,
    
    // Primary facet fields (cross-cutting)
    activity_types: enrichmentData.activity_types || [],
    equipment_category: enrichmentData.equipment_category,
    equipment_subcategory: enrichmentData.equipment_subcategory,
    bs7671_zones: enrichmentData.bs7671_zones || [],
    technical_complexity: enrichmentData.technical_complexity || 3,
    risk_level: enrichmentData.risk_level || 'medium',
    common_tools: enrichmentData.common_tools || [],
    ppe_required: enrichmentData.ppe_required || [],
    
    enrichment_metadata: {
      stage: 'primary',
      rag_citations: bs7671Context.length,
      confidence: 0.85
    }
  }, {
    onConflict: 'practical_work_id,facet_type' // NEW: Composite key
  });

  if (error) throw error;

  logger.info(`✅ Enriched ${id}: ${enrichmentData.activity_types?.join(', ')}`);
  
  return { id, success: true };
}
