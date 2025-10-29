import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ENRICHMENT_VERSION = 'v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batchSize = 50, startFrom = 0, jobId } = await req.json();
    
    console.log(`🔧 Starting maintenance schedules enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: documents, error: fetchError } = await supabase
      .from('maintenance_knowledge')
      .select('*')
      .range(startFrom, startFrom + batchSize - 1)
      .order('created_at', { ascending: true });

    if (fetchError) throw fetchError;
    if (!documents || documents.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        processed: 0, 
        message: 'No more documents' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📄 Processing ${documents.length} maintenance documents`);

    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
    let startIndex = resumeFromId ? documents.findIndex(d => d.id === resumeFromId) + 1 : 0;
    console.log(resumeFromId ? `▶️ Resuming from checkpoint at doc ${startIndex}` : '🆕 Starting fresh batch');

    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0, totalProcessingTime = 0;

    for (let i = startIndex; i < documents.length; i++) {
      const doc = documents[i];
      const docStartTime = Date.now();
      try {
        const contentHash = await hashContent(doc.content);
        const { data: existing } = await supabase
          .from('maintenance_schedules')
          .select('enrichment_version, source_hash')
          .eq('source_id', doc.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          console.log(`⏭️ Skipping ${doc.id} - already enriched`);
          skipped++;
          continue;
        }
        const extractionPrompt = `Extract structured maintenance schedules and procedures from this document.

DOCUMENT:
${doc.content}

Extract maintenance procedures with schedules. Return JSON array:
[{
  "equipment_type": "switchgear | transformer | UPS | emergency_lighting | fire_alarm | etc",
  "maintenance_type": "preventive | corrective | predictive | inspection",
  "title": "Clear maintenance task title",
  "procedure_steps": [{
    "step_number": 1,
    "action": "What to do",
    "safety_check": "Safety verification",
    "tools_needed": ["tool1"]
  }],
  "frequency": "weekly | monthly | quarterly | annually",
  "estimated_duration_minutes": 120,
  "required_qualifications": ["18th Edition", "Approved Electrician"],
  "safety_precautions": [{
    "precaution": "Isolate supply",
    "regulation": "BS 7671 Section X"
  }],
  "regulations_cited": ["BS 7671 Section X"]
}]`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{
              role: 'system',
              content: 'You are an electrical maintenance expert. Extract structured maintenance schedules. Return valid JSON only.'
            }, {
              role: 'user',
              content: extractionPrompt
            }],
            response_format: { type: "json_object" },
            temperature: 0.1,
          }),
        });

        if (!response.ok) {
          console.error(`❌ OpenAI error for doc ${doc.id}`);
          failed++;
          continue;
        }

        const aiData = await response.json();
        const content = aiData.choices[0].message.content;
        let schedules;
        
        try {
          const parsed = JSON.parse(content);
          schedules = Array.isArray(parsed) ? parsed : (parsed.schedules || []);
        } catch {
          schedules = [];
        }

        if (!validateQuality(schedules)) {
          console.warn(`⚠️ Quality check failed for ${doc.id}`);
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;

        for (const schedule of schedules) {
          await supabase
            .from('maintenance_schedules')
            .upsert({
              source_id: doc.id,
              equipment_type: schedule.equipment_type || 'general',
              maintenance_type: schedule.maintenance_type || 'preventive',
              title: schedule.title || '',
              procedure_steps: schedule.procedure_steps || [],
              frequency: schedule.frequency,
              estimated_duration_minutes: schedule.estimated_duration_minutes,
              required_qualifications: schedule.required_qualifications || [],
              safety_precautions: schedule.safety_precautions || [],
              regulations_cited: schedule.regulations_cited || [],
              confidence_score: 0.85,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash
            }, {
              onConflict: 'source_id,title'
            });
        }

        processed++;
        const docProcessingTime = Date.now() - docStartTime;
        totalProcessingTime += docProcessingTime;
        
        if ((i + 1) % 25 === 0 || i === documents.length - 1) {
          await supabase
            .from('batch_progress')
            .update({
              last_checkpoint: { last_processed_id: doc.id, processed_count: i + 1, timestamp: new Date().toISOString() },
              items_processed: startFrom + i + 1,
              status: 'processing',
              data: { quality_passed: qualityPassed, quality_failed: qualityFailed, skipped, avg_processing_time_ms: totalProcessingTime / processed, api_cost_gbp: processed * 0.004, last_updated: new Date().toISOString() }
            })
            .eq('job_id', jobId)
            .eq('batch_number', Math.floor(startFrom / batchSize));
        }

        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Error processing doc ${doc.id}:`, error);
        failed++;
      }
    }

    console.log(`✅ Processed ${processed}/${documents.length} (${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed)`);

    return new Response(JSON.stringify({ 
      success: true,
      processed,
      failed,
      skipped,
      qualityPassed,
      qualityFailed,
      nextStartFrom: startFrom + batchSize,
      hasMore: documents.length === batchSize
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function validateQuality(schedules: any[]): boolean {
  if (!schedules || schedules.length === 0) return false;
  const first = schedules[0];
  return first.procedure_steps?.length >= 1 && first.frequency && first.safety_precautions?.length > 0;
}
