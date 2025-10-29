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
    
    console.log(`🔧 Starting installation procedures enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: documents, error: fetchError } = await supabase
      .from('installation_knowledge')
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

    console.log(`📄 Processing ${documents.length} installation documents`);

    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
    let startIndex = resumeFromId ? documents.findIndex(d => d.id === resumeFromId) + 1 : 0;

    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0, totalProcessingTime = 0;

    for (let i = startIndex; i < documents.length; i++) {
      const doc = documents[i];
      const docStartTime = Date.now();
      try {
        const contentHash = await hashContent(doc.content);
        const { data: existing } = await supabase
          .from('installation_procedures')
          .select('enrichment_version, source_hash')
          .eq('source_id', doc.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          skipped++;
          continue;
        }
        const extractionPrompt = `Extract structured installation procedures from this electrical installation document.

DOCUMENT:
${doc.content}

Extract step-by-step procedures for electrical installations. Return JSON array:
[{
  "procedure_type": "cable_installation | circuit_installation | equipment_mounting | testing | commissioning | etc",
  "procedure_title": "Clear title",
  "steps": [{
    "step_number": 1,
    "action": "What to do",
    "tools_required": ["tool1", "tool2"],
    "safety_notes": ["note1", "note2"],
    "verification": "How to verify step completed"
  }],
  "safety_requirements": [{
    "requirement": "Safety requirement",
    "regulation": "BS 7671 section"
  }],
  "tools_required": ["tool1", "tool2"],
  "materials_required": ["material1", "material2"],
  "estimated_time_minutes": 60,
  "skill_level": "apprentice | competent_person | approved_electrician",
  "regulations_cited": ["BS 7671 Section X"]
}]`;

        const response = await callOpenAIWithRetry(openAIKey, extractionPrompt, 'You are an electrical installation expert. Extract structured procedures. Return valid JSON only.');

        if (!response.ok) {
          console.error(`❌ OpenAI error for doc ${doc.id}`);
          failed++;
          continue;
        }

        const aiData = await response.json();
        const content = aiData.choices[0].message.content;
        let procedures;
        
        try {
          const parsed = JSON.parse(content);
          procedures = Array.isArray(parsed) ? parsed : (parsed.procedures || []);
        } catch {
          procedures = [];
        }

        if (!validateQuality(procedures)) {
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;

        for (const proc of procedures) {
          await supabase
            .from('installation_procedures')
            .upsert({
              source_id: doc.id,
              procedure_type: proc.procedure_type || 'general',
              procedure_title: proc.procedure_title || '',
              steps: proc.steps || [],
              safety_requirements: proc.safety_requirements || [],
              tools_required: proc.tools_required || [],
              materials_required: proc.materials_required || [],
              estimated_time_minutes: proc.estimated_time_minutes,
              skill_level: proc.skill_level,
              regulations_cited: proc.regulations_cited || [],
              confidence_score: 0.85,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash
            }, {
              onConflict: 'source_id,procedure_title'
            });
        }

        processed++;
        totalProcessingTime += Date.now() - docStartTime;
        
        if ((i + 1) % 25 === 0 || i === documents.length - 1) {
          await supabase
            .from('batch_progress')
            .update({
              last_checkpoint: { last_processed_id: doc.id, processed_count: i + 1 },
              items_processed: startFrom + i + 1,
              status: 'processing',
              data: { quality_passed: qualityPassed, quality_failed: qualityFailed, skipped, avg_processing_time_ms: totalProcessingTime / processed, api_cost_gbp: processed * 0.004 }
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

    console.log(`✅ Processed ${processed}/${documents.length} (${failed} failed, ${skipped} skipped)`);

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

function validateQuality(procedures: any[]): boolean {
  if (!procedures || procedures.length === 0) return false;
  const first = procedures[0];
  return first.steps?.length >= 3 && first.tools_required?.length > 0;
}

async function callOpenAIWithRetry(apiKey: string, userPrompt: string, systemPrompt: string, maxRetries = 3) {
  const TIMEOUT_MS = 60000; // 60s per item (increased from 30s)
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_completion_tokens: 1000,
          response_format: { type: "json_object" }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
      
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn(`⚠️ OpenAI call attempt ${attempt + 1}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      } else {
        throw error;
      }
    }
  }
}
