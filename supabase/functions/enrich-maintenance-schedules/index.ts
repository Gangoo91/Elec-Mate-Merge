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

    let processed = 0;
    let failed = 0;

    for (const doc of documents) {
      try {
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

        for (const schedule of schedules) {
          const { error: insertError } = await supabase
            .from('maintenance_schedules')
            .insert({
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
