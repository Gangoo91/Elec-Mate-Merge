import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import FirecrawlApp from 'npm:@mendable/firecrawl-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SCREWFIX_CATEGORIES = [
  'https://www.screwfix.com/c/electrical-lighting/electrical-cable/cat850003',
  'https://www.screwfix.com/c/electrical-lighting/consumer-units-accessories/cat850019',
  'https://www.screwfix.com/c/electrical-lighting/circuit-protection/cat850014',
  'https://www.screwfix.com/c/electrical-lighting/electrical-accessories/cat850026',
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!firecrawlApiKey || !openAIApiKey) {
      throw new Error('API keys not configured');
    }

    console.log('Starting Screwfix scrape...');

    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let totalProducts = 0;

    for (const categoryUrl of SCREWFIX_CATEGORIES) {
      console.log(`Scraping category: ${categoryUrl}`);

      const crawlResult = await firecrawl.crawlUrl(categoryUrl, {
        limit: 50,
        scrapeOptions: {
          formats: ['markdown'],
        }
      });

      if (!crawlResult.success) continue;

      const products = [];
      
      for (const page of (crawlResult as any).data || []) {
        const markdown = page.markdown || '';
        
        // Extract product info from markdown (simplified - real implementation would be more robust)
        const productMatches = markdown.matchAll(/\*\*([^*]+)\*\*.*?£([\d.]+)/g);
        
        for (const match of productMatches) {
          const [_, name, price] = match;
          products.push({
            item_name: name.trim(),
            category: 'electrical',
            base_cost: parseFloat(price),
            wholesaler: 'screwfix',
            price_per_unit: 'each',
            in_stock: true,
            product_url: page.url || categoryUrl,
            metadata: {
              scraped_at: new Date().toISOString(),
              source_page: page.url
            }
          });
        }
      }

      if (products.length > 0) {
        // Generate embeddings for products
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: products.map(p => `${p.item_name} ${p.category}`),
          }),
        });

        const embeddingData = await embeddingResponse.json();
        
        const productsWithEmbeddings = products.map((product, idx) => ({
          ...product,
          embedding: JSON.stringify(embeddingData.data[idx].embedding),
        }));

        // Insert products
        const { error } = await supabase
          .from('pricing_embeddings')
          .upsert(productsWithEmbeddings, { 
            onConflict: 'item_name,wholesaler',
            ignoreDuplicates: false 
          });

        if (error) {
          console.error('Error inserting products:', error);
        } else {
          totalProducts += products.length;
          console.log(`Inserted ${products.length} products from category`);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      productsScraped: totalProducts,
      wholesaler: 'screwfix'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error scraping Screwfix:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to scrape' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
