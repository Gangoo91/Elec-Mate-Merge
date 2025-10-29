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
    
    console.log(`📋 Starting project templates enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: documents, error: fetchError } = await supabase
      .from('project_mgmt_knowledge')
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

    console.log(`📄 Processing ${documents.length} project management documents`);

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
          .from('project_templates')
          .select('enrichment_version, source_hash')
          .eq('source_id', doc.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          skipped++;
          continue;
        }
        const extractionPrompt = `Extract structured project templates and methodologies from this electrical project management document.

DOCUMENT:
${doc.content}

Extract project frameworks and templates. Return JSON array:
[{
  "template_type": "new_installation | rewire | consumer_unit_upgrade | inspection_report | etc",
  "title": "Clear project template title",
  "phases": [{
    "phase_number": 1,
    "phase_name": "Initial Survey",
    "duration_days": 2,
    "activities": ["Activity 1", "Activity 2"],
    "deliverables": ["Deliverable 1"],
    "dependencies": ["Previous phase"],
    "key_milestones": ["Milestone 1"]
  }],
  "deliverables": [{
    "name": "Installation Certificate",
    "type": "document | drawing | test_results",
    "timing": "end_of_project"
  }],
  "required_documents": ["EIC", "Test certificates", "As-built drawings"],
  "typical_duration_days": 10,
  "team_roles": ["Project Manager", "Approved Electrician", "Electrician"],
  "regulations_cited": ["BS 7671 Section X"],
  "risk_factors": [{
    "risk": "Access restrictions",
    "mitigation": "Pre-site survey",
    "impact": "medium"
  }]
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
              content: 'You are a project management expert in electrical contracting. Extract structured project templates. Return valid JSON only.'
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
        let templates;
        
        try {
          const parsed = JSON.parse(content);
          templates = Array.isArray(parsed) ? parsed : (parsed.templates || []);
        } catch {
          templates = [];
        }

        if (!validateQuality(templates)) {
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;

        for (const template of templates) {
          await supabase
            .from('project_templates')
            .upsert({
              source_id: doc.id,
              template_type: template.template_type || 'general',
              title: template.title || '',
              phases: template.phases || [],
              deliverables: template.deliverables || [],
              required_documents: template.required_documents || [],
              typical_duration_days: template.typical_duration_days,
              team_roles: template.team_roles || [],
              regulations_cited: template.regulations_cited || [],
              risk_factors: template.risk_factors || [],
              confidence_score: 0.85,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash
            }, {
              onConflict: 'source_id,title'
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

function validateQuality(templates: any[]): boolean {
  if (!templates || templates.length === 0) return false;
  const first = templates[0];
  return first.phases?.length >= 1 && first.typical_duration_days > 0;
}
