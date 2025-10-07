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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔄 Starting pricing embeddings population...');

    // Fetch all materials from weekly cache
    const { data: materials, error: fetchError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching materials:', fetchError);
      throw fetchError;
    }

    if (!materials || materials.length === 0) {
      console.log('⚠️ No materials found in cache');
      return new Response(JSON.stringify({ 
        success: false,
        message: 'No materials found in cache',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📦 Found ${materials.length} materials to process`);

    let processedCount = 0;
    let errorCount = 0;
    const batchSize = 50;

    // Process in batches to avoid timeouts
    for (let i = 0; i < materials.length; i += batchSize) {
      const batch = materials.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(materials.length / batchSize)}`);

      for (const material of batch) {
        try {
          // Construct searchable text from material data
          const materialData = material.materials_data;
          
          // Handle both single object and array formats
          const items = Array.isArray(materialData) ? materialData : [materialData];
          
          for (const item of items) {
            const searchableText = [
              item.name || item.title,
              material.category,
              item.brand,
              item.specifications,
              item.supplier || material.source,
              `£${item.price}`,
              item.price_per_unit,
              item.in_stock ? 'in stock' : 'out of stock'
            ].filter(Boolean).join(' ');

            // Generate embedding
            const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${openAIApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'text-embedding-3-small',
                input: searchableText,
              }),
            });

            if (!embeddingResponse.ok) {
              console.error(`OpenAI API error: ${embeddingResponse.status}`);
              errorCount++;
              continue;
            }

            const embeddingData = await embeddingResponse.json();
            const embedding = embeddingData.data[0].embedding;

            // Insert into pricing_embeddings table with all required top-level fields
            const { error: insertError } = await supabase
              .from('pricing_embeddings')
              .upsert({
                content: searchableText,
                embedding: JSON.stringify(embedding),
                item_name: item.name || item.title || 'Unknown Item',
                category: material.category || 'Electrical Components',
                base_cost: parseFloat(item.price) || 0,
                wholesaler: item.supplier || material.source || 'Unknown',
                price_per_unit: item.price_per_unit || `£${item.price || 0}`,
                in_stock: Boolean(item.in_stock),
                product_url: item.url || null,
                last_scraped: new Date().toISOString(),
                metadata: {
                  brand: item.brand,
                  supplier: item.supplier || material.source,
                  specifications: item.specifications,
                  sku: item.sku,
                  pack_qty: item.pack_qty
                }
              }, {
                onConflict: 'content'
              });

            if (insertError) {
              console.error('Insert error:', insertError);
              errorCount++;
            } else {
              processedCount++;
            }
          }
        } catch (error) {
          console.error('Error processing material:', error);
          errorCount++;
        }
      }

      // Small delay between batches to avoid rate limits
      if (i + batchSize < materials.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Completed! Processed: ${processedCount}, Errors: ${errorCount}`);

    return new Response(JSON.stringify({
      success: true,
      processed: processedCount,
      errors: errorCount,
      total: materials.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in populate-pricing-embeddings:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to populate embeddings',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
