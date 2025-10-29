import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    let processed = 0;
    let failed = 0;

    for (const doc of documents) {
      try {
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

        for (const template of templates) {
          const { error: insertError } = await supabase
            .from('project_templates')
            .insert({
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
              confidence_score: 0.85
            });

          if (insertError) {
            console.error('❌ Insert error:', insertError.message);
          }
        }

        processed++;
        
        if (jobId) {
          await supabase
            .from('batch_progress')
            .update({ 
              items_processed: startFrom + processed,
              status: 'processing'
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

    console.log(`✅ Processed ${processed}/${documents.length} documents (${failed} failed)`);

    return new Response(JSON.stringify({ 
      success: true,
      processed,
      failed,
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
