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
    
    console.log(`🔍 Starting inspection procedures enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: documents, error: fetchError } = await supabase
      .from('inspection_testing_knowledge')
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

    console.log(`📄 Processing ${documents.length} inspection documents`);

    let processed = 0;
    let failed = 0;

    for (const doc of documents) {
      try {
        const extractionPrompt = `Extract structured inspection and testing procedures from this document.

DOCUMENT:
${doc.content}

Extract test procedures with acceptance criteria. Return JSON array:
[{
  "test_type": "continuity | insulation_resistance | earth_fault_loop | rcd | polarity | etc",
  "test_name": "Clear test name",
  "test_steps": [{
    "step_number": 1,
    "action": "What to do",
    "expected_result": "What should happen"
  }],
  "equipment_required": ["multimeter", "earth loop tester", "etc"],
  "acceptance_criteria": {
    "min_value": 0.5,
    "max_value": 1.0,
    "unit": "Ω",
    "condition": "Must be less than"
  },
  "regulations_cited": ["BS 7671 Section X"],
  "typical_values": {
    "good": "< 0.5Ω",
    "acceptable": "0.5-1.0Ω",
    "fail": "> 1.0Ω"
  },
  "frequency": "Initial verification, periodic inspection"
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
              content: 'You are an electrical testing expert. Extract structured test procedures. Return valid JSON only.'
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
        let procedures;
        
        try {
          const parsed = JSON.parse(content);
          procedures = Array.isArray(parsed) ? parsed : (parsed.procedures || []);
        } catch {
          procedures = [];
        }

        for (const proc of procedures) {
          const { error: insertError } = await supabase
            .from('inspection_procedures')
            .insert({
              source_id: doc.id,
              test_type: proc.test_type || 'general',
              test_name: proc.test_name || '',
              test_steps: proc.test_steps || [],
              equipment_required: proc.equipment_required || [],
              acceptance_criteria: proc.acceptance_criteria || {},
              regulations_cited: proc.regulations_cited || [],
              typical_values: proc.typical_values || {},
              frequency: proc.frequency,
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
