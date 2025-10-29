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
    
    console.log(`🏥 Starting health & safety enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch batch of health & safety knowledge
    const { data: documents, error: fetchError } = await supabase
      .from('health_safety_knowledge')
      .select('*')
      .range(startFrom, startFrom + batchSize - 1)
      .order('created_at', { ascending: true });

    if (fetchError) throw fetchError;
    if (!documents || documents.length === 0) {
      console.log('✅ No more documents to process');
      return new Response(JSON.stringify({ 
        success: true, 
        processed: 0, 
        message: 'No more documents' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📄 Processing ${documents.length} health & safety documents`);

    let processed = 0;
    let failed = 0;

    for (const doc of documents) {
      try {
        const extractionPrompt = `Extract all electrical safety hazards and health & safety procedures from this document.

DOCUMENT:
${doc.content}

Extract:
1. **Electrical hazards** (shock, arc flash, burns, etc.)
2. **Safety procedures** (isolation, PPE, permits)
3. **Risk assessments**
4. **Control measures**
5. **Emergency procedures**

Return JSON array:
[{
  "hazard_type": "electrical_shock | arc_flash | mechanical | chemical | working_at_height | etc",
  "hazard_description": "Clear description of the hazard",
  "severity": "low | medium | high | critical",
  "likelihood": "rare | unlikely | possible | likely | almost_certain",
  "affected_activities": ["activity1", "activity2"],
  "control_measures": ["control1", "control2"],
  "ppe_required": ["ppe1", "ppe2"],
  "regulations_cited": ["BS 7671 Section X", "Health & Safety at Work Act"],
  "emergency_response": "What to do if incident occurs",
  "training_required": ["qualification1", "qualification2"]
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
              content: 'You are a health & safety expert. Extract structured hazard data from electrical safety documents. Return valid JSON only.'
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
        let hazards;
        
        try {
          const parsed = JSON.parse(content);
          hazards = Array.isArray(parsed) ? parsed : (parsed.hazards || []);
        } catch {
          hazards = [];
        }

        // Insert each hazard
        for (const hazard of hazards) {
          const { error: insertError } = await supabase
            .from('regulation_hazards_extracted')
            .insert({
              regulation_number: 'H&S-' + doc.id.substring(0, 8),
              section: doc.topic || 'Health & Safety',
              hazard_type: hazard.hazard_type || 'general',
              hazard_description: hazard.hazard_description || '',
              severity: hazard.severity || 'medium',
              likelihood: hazard.likelihood || 'possible',
              affected_activities: hazard.affected_activities || [],
              control_measures: hazard.control_measures || [],
              ppe_required: hazard.ppe_required || [],
              regulations_cited: hazard.regulations_cited || [],
              emergency_response: hazard.emergency_response,
              training_required: hazard.training_required || [],
              confidence_score: 0.85,
              source_document: 'health_safety_knowledge',
              source_id: doc.id
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
