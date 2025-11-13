import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all hazards with NULL embeddings
    const { data: hazards, error: fetchError } = await supabase
      .from('regulation_hazards_extracted')
      .select('id, hazard_description')
      .is('embedding', null);

    if (fetchError) throw fetchError;

    console.log(`📊 Found ${hazards?.length || 0} hazards without embeddings`);

    if (!hazards || hazards.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No hazards need embedding generation', updated: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process in batches of 20 to avoid rate limits
    const batchSize = 20;
    let totalUpdated = 0;

    for (let i = 0; i < hazards.length; i += batchSize) {
      const batch = hazards.slice(i, i + batchSize);
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(hazards.length / batchSize)}`);

      // Generate embeddings for this batch
      const embeddingPromises = batch.map(async (hazard) => {
        try {
          const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: hazard.hazard_description,
            }),
          });

          if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
          }

          const result = await response.json();
          return {
            id: hazard.id,
            embedding: result.data[0].embedding,
          };
        } catch (error) {
          console.error(`❌ Failed to generate embedding for hazard ${hazard.id}:`, error);
          return null;
        }
      });

      const embeddings = (await Promise.all(embeddingPromises)).filter(e => e !== null);

      // Update records with embeddings
      for (const { id, embedding } of embeddings) {
        const { error: updateError } = await supabase
          .from('regulation_hazards_extracted')
          .update({ embedding })
          .eq('id', id);

        if (updateError) {
          console.error(`❌ Failed to update hazard ${id}:`, updateError);
        } else {
          totalUpdated++;
        }
      }

      // Rate limit: wait 1 second between batches
      if (i + batchSize < hazards.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Successfully generated embeddings for ${totalUpdated}/${hazards.length} hazards`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Hazard embeddings generated successfully',
        total: hazards.length,
        updated: totalUpdated
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error generating hazard embeddings:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
