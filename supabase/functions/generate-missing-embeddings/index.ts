// One-time utility to generate missing embeddings in design_knowledge table
import { corsHeaders, serve } from '../_shared/deps.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

serve(async (req) => {
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

    // Fetch rows without embeddings
    const { data: missingRows, error: fetchError } = await supabase
      .from('design_knowledge')
      .select('id, topic, content')
      .is('embedding', null);

    if (fetchError) throw fetchError;

    if (!missingRows || missingRows.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No missing embeddings found',
          count: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${missingRows.length} rows without embeddings`);

    // Generate embeddings for each row
    const results = [];
    for (const row of missingRows) {
      try {
        const textToEmbed = `${row.topic}\n\n${row.content}`;
        
        // Generate embedding using OpenAI
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: textToEmbed,
          }),
        });

        if (!embeddingResponse.ok) {
          const errorText = await embeddingResponse.text();
          throw new Error(`OpenAI API error: ${embeddingResponse.status} - ${errorText}`);
        }

        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;

        // Update the row with the embedding
        const { error: updateError } = await supabase
          .from('design_knowledge')
          .update({ embedding: JSON.stringify(embedding) })
          .eq('id', row.id);

        if (updateError) {
          console.error(`Failed to update row ${row.id}:`, updateError);
          results.push({ id: row.id, topic: row.topic, success: false, error: updateError.message });
        } else {
          console.log(`✅ Generated embedding for: ${row.topic}`);
          results.push({ id: row.id, topic: row.topic, success: true });
        }
      } catch (error) {
        console.error(`Error processing row ${row.id}:`, error);
        results.push({ id: row.id, topic: row.topic, success: false, error: error.message });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${missingRows.length} rows: ${successCount} successful, ${failureCount} failed`,
        totalProcessed: missingRows.length,
        successful: successCount,
        failed: failureCount,
        details: results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating embeddings:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
