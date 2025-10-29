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
    
    console.log(`📐 Starting design patterns enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: documents, error: fetchError } = await supabase
      .from('design_knowledge')
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

    console.log(`📄 Processing ${documents.length} design documents`);

    let processed = 0;
    let failed = 0;

    for (const doc of documents) {
      try {
        const extractionPrompt = `Extract structured electrical design patterns and calculations from this document.

DOCUMENT:
${doc.content}

Extract design patterns, formulas, and calculation methods. Return JSON array:
[{
  "pattern_type": "cable_sizing | voltage_drop | discrimination | earth_fault_loop | load_calculation | etc",
  "title": "Clear title",
  "description": "What this pattern does",
  "calculation_formula": "Mathematical formula (if applicable)",
  "input_parameters": {
    "param1": {"type": "number", "unit": "A", "description": "Description"},
    "param2": {"type": "number", "unit": "m", "description": "Description"}
  },
  "example_values": {
    "param1": 32,
    "param2": 25,
    "result": "2.5mm² cable"
  },
  "regulations_cited": ["BS 7671 Section X"],
  "constraints": [
    {"type": "minimum", "value": 0, "parameter": "current"},
    {"type": "maximum", "value": 1000, "parameter": "distance"}
  ],
  "typical_applications": ["Domestic circuits", "Industrial distribution"]
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
              content: 'You are an electrical design expert. Extract structured design patterns and calculations. Return valid JSON only.'
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
        let patterns;
        
        try {
          const parsed = JSON.parse(content);
          patterns = Array.isArray(parsed) ? parsed : (parsed.patterns || []);
        } catch {
          patterns = [];
        }

        for (const pattern of patterns) {
          const { error: insertError } = await supabase
            .from('design_patterns_structured')
            .insert({
              source_id: doc.id,
              pattern_type: pattern.pattern_type || 'general',
              title: pattern.title || '',
              description: pattern.description,
              calculation_formula: pattern.calculation_formula,
              input_parameters: pattern.input_parameters || {},
              example_values: pattern.example_values || {},
              regulations_cited: pattern.regulations_cited || [],
              constraints: pattern.constraints || [],
              typical_applications: pattern.typical_applications || [],
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
