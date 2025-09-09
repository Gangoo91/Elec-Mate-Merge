import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tool categories with their specific URLs for scraping
const TOOL_CATEGORIES = {
  'Hand Tools': {
    urls: [
      'https://www.screwfix.com/c/tools/hand-tools/ct/25002',
      'https://www.toolstation.com/electrical-hand-tools/c402',
      'https://www.cef.co.uk/catalogue/categories/tools-and-testers/hand-tools'
    ]
  },
  'Power Tools': {
    urls: [
      'https://www.screwfix.com/c/tools/power-tools/ct/25004',
      'https://www.toolstation.com/power-tools/c147',
      'https://www.cef.co.uk/catalogue/categories/tools-and-testers/power-tools'
    ]
  },
  'Test Equipment': {
    urls: [
      'https://www.screwfix.com/c/electrical/electrical-testing/ct/12003',
      'https://www.toolstation.com/electrical-testing/c405',
      'https://www.cef.co.uk/catalogue/categories/tools-and-testers/test-equipment'
    ]
  },
  'Installation Tools': {
    urls: [
      'https://www.screwfix.com/c/electrical/cable-management/ct/12004',
      'https://www.toolstation.com/cable-management/c406',
      'https://www.cef.co.uk/catalogue/categories/cable-management'
    ]
  },
  'Safety Tools': {
    urls: [
      'https://www.screwfix.com/c/building-hardware/workwear-safety/ct/19004',
      'https://www.toolstation.com/workwear-and-safety/c170',
      'https://www.cef.co.uk/catalogue/categories/safety-and-workwear'
    ]
  }
};

// Product schema for structured extraction
const productSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Product name" },
          price: { type: "string", description: "Product price with currency symbol" },
          availability: { type: "string", description: "Stock status" },
          image: { type: "string", description: "Product image URL" },
          productUrl: { type: "string", description: "Link to product page" },
          description: { type: "string", description: "Product description" },
          supplier: { type: "string", description: "Supplier name (Screwfix, Toolstation, CEF)" },
          features: { 
            type: "array", 
            items: { type: "string" },
            description: "Key product features"
          },
          specifications: {
            type: "object",
            description: "Technical specifications"
          }
        },
        required: ["name", "price", "supplier"]
      }
    }
  }
};

const getSupplierFromUrl = (url: string): string => {
  if (url.includes('screwfix.com')) return 'Screwfix';
  if (url.includes('toolstation.com')) return 'Toolstation';
  if (url.includes('cef.co.uk')) return 'CEF';
  return 'Unknown';
};

const scrapeCategory = async (firecrawl: FirecrawlApp, category: string, urls: string[]) => {
  console.log(`🔍 Scraping category: ${category}`);
  const allProducts = [];
  
  for (const url of urls) {
    try {
      console.log(`📡 Scraping URL: ${url}`);
      const supplier = getSupplierFromUrl(url);
      
      const crawlResponse = await firecrawl.scrapeUrl(url, {
        formats: ['extract'],
        extract: {
          schema: productSchema,
          prompt: `Extract electrical tools and equipment from this ${supplier} page. Focus on tools relevant to electricians and electrical work. Include prices, availability, and product details.`
        },
        timeout: 30000
      });

      if (crawlResponse.success && crawlResponse.extract?.products) {
        const products = crawlResponse.extract.products.map((product: any) => ({
          ...product,
          category,
          supplier: supplier,
          lastUpdated: new Date().toISOString(),
          // Ensure we have required fields
          availability: product.availability || 'Check Availability',
          image: product.image || '/placeholder.svg',
          description: product.description || '',
          features: product.features || [],
          specifications: product.specifications || {}
        }));
        
        allProducts.push(...products);
        console.log(`✅ Extracted ${products.length} products from ${supplier}`);
        
        // Rate limiting between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.warn(`⚠️ No products found for ${url}`);
      }
    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error);
      // Continue with next URL even if one fails
    }
  }
  
  return allProducts;
};

serve(async (req) => {
  console.log('🔧 [COMPREHENSIVE-FIRECRAWL-SCRAPER] Starting request...');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { categories, forceRefresh } = await req.json().catch(() => ({ categories: null, forceRefresh: false }));
    
    console.log(`🔍 Scraping tools - Categories: ${categories || 'all'} | Force refresh: ${forceRefresh}`);

    // Initialize Firecrawl
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }

    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Determine which categories to scrape
    const categoriesToScrape = categories ? 
      Object.entries(TOOL_CATEGORIES).filter(([cat]) => categories.includes(cat)) :
      Object.entries(TOOL_CATEGORIES);

    console.log(`📊 Scraping ${categoriesToScrape.length} categories`);

    const allScrapedTools = [];
    let totalProductsFound = 0;

    // Scrape each category
    for (const [categoryName, categoryConfig] of categoriesToScrape) {
      try {
        const categoryProducts = await scrapeCategory(firecrawl, categoryName, categoryConfig.urls);
        allScrapedTools.push(...categoryProducts);
        totalProductsFound += categoryProducts.length;
        
        console.log(`✅ Category "${categoryName}" completed: ${categoryProducts.length} products`);
        
        // Longer pause between categories
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`❌ Error scraping category ${categoryName}:`, error);
        // Continue with next category
      }
    }

    console.log(`🎉 Scraping completed! Total products found: ${totalProductsFound}`);

    // Store results in database
    if (allScrapedTools.length > 0) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Cache for 1 week

      const { error: storeError } = await supabase
        .from('tools_weekly_cache')
        .insert({
          tools_data: allScrapedTools,
          total_products: totalProductsFound,
          category: 'comprehensive_scrape',
          expires_at: expiresAt.toISOString(),
          update_status: 'completed'
        });

      if (storeError) {
        console.error('❌ Error storing scraped data:', storeError);
        throw storeError;
      }

      console.log('✅ Scraped data stored successfully');
    }

    return new Response(JSON.stringify({
      success: true,
      tools: allScrapedTools,
      totalFound: totalProductsFound,
      categoriesScraped: categoriesToScrape.map(([name]) => name),
      message: `Successfully scraped ${totalProductsFound} tools from ${categoriesToScrape.length} categories`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in comprehensive-firecrawl-scraper:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      tools: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});