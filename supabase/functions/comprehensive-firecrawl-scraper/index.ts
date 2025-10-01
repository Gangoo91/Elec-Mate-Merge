import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tool categories with their specific URLs for electrical tools scraping
const TOOL_CATEGORIES = {
  'Electrical Hand Tools': {
    urls: [
      'https://www.screwfix.com/search?search=wire+strippers+crimpers+electrical&page_size=50',
      'https://www.screwfix.com/search?search=electrical+pliers+side+cutters&page_size=50',
      'https://www.toolstation.com/search?q=electrical+hand+tools+wire+strippers'
    ]
  },
  'Test Equipment': {
    urls: [
      'https://www.screwfix.com/search?search=multimeter+voltage+tester+electrical&page_size=50',
      'https://www.screwfix.com/search?search=electrical+testing+equipment&page_size=50',
      'https://www.toolstation.com/search?q=multimeter+voltage+tester+electrical'
    ]
  },
  'Power Tools': {
    urls: [
      'https://www.screwfix.com/search?search=electrical+drill+sds+hammer&page_size=50',
      'https://www.screwfix.com/search?search=angle+grinder+reciprocating+saw&page_size=50',
      'https://www.toolstation.com/search?q=electrical+power+tools+drill'
    ]
  },
  'Cable Installation': {
    urls: [
      'https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50',
      'https://www.screwfix.com/search?search=conduit+bender+cable+pulling&page_size=50',
      'https://www.toolstation.com/search?q=cable+management+electrical+tools'
    ]
  },
  'Electrical Safety': {
    urls: [
      'https://www.screwfix.com/search?search=electrical+safety+equipment+gloves&page_size=50',
      'https://www.screwfix.com/search?search=lockout+tagout+electrical+safety&page_size=50',
      'https://www.toolstation.com/search?q=electrical+safety+equipment'
    ]
  }
};

// Updated product schema with more flexible extraction
const productSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { 
            type: "string", 
            description: "Product name, title, or description. Look for product headings, titles in cards, or link text." 
          },
          price: { 
            type: "string", 
            description: "Product price including currency symbol (£). Look for price elements, cost displays, or pricing text." 
          },
          availability: { 
            type: "string", 
            description: "Stock status like 'In Stock', 'Available', 'Out of Stock'. This field is optional." 
          },
          image: { 
            type: "string", 
            description: "Product image URL or src attribute. This field is optional." 
          },
          productUrl: { 
            type: "string", 
            description: "Full URL link to the product detail page. This field is optional." 
          },
          description: { 
            type: "string", 
            description: "Brief product description or features. This field is optional." 
          },
          supplier: { 
            type: "string", 
            description: "Always set this based on the website domain: 'Screwfix' for screwfix.com, 'Toolstation' for toolstation.com" 
          }
        },
        required: ["name", "price"]
      }
    },
    pageInfo: {
      type: "object",
      properties: {
        totalFound: { type: "number", description: "Total number of products found on the page" },
        pageTitle: { type: "string", description: "Title of the webpage" }
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
      
      // First try to get basic content to verify the page loads
      console.log(`🔍 Testing basic page access for ${url}...`);
      const basicTest = await firecrawl.scrapeUrl(url, {
        formats: ['markdown'],
        timeout: 15000
      });
      
      if (!basicTest.success) {
        console.error(`❌ Basic page access failed for ${url}:`, basicTest.error);
        continue; // Skip this URL
      }
      
      console.log(`✅ Basic access successful, content length: ${(basicTest as any).data?.markdown?.length || 0}`);
      
      // Now attempt structured extraction with improved prompt
      const crawlResponse = await firecrawl.scrapeUrl(url, {
        formats: ['extract'],
        extract: {
          schema: productSchema as any,
          prompt: `You are extracting product information from a ${supplier} search results page. 

WHAT TO LOOK FOR:
- Product cards, tiles, or listings
- Product names/titles (often in headings or link text)
- Prices (look for £ symbol, "Price:", cost displays)
- Any electrical tools, equipment, or supplies

ELECTRICAL TOOLS INCLUDE:
- Wire strippers, crimpers, electrical pliers
- Multimeters, voltage testers, electrical testing equipment  
- Electrical drills, SDS drills, impact drivers
- Cable strippers, fish tapes, conduit benders
- Electrical safety equipment, insulated tools
- Electrical screwdrivers, nut drivers
- Cable management tools and accessories

EXTRACT ALL PRODUCTS YOU FIND, even if not strictly electrical tools. 
Set the supplier field to "${supplier}" for all products.
If you find products but no clear prices, still extract them with price as "Contact for Price" or "See Website".

Focus on quantity over perfect accuracy - we want to see what products are available.`
        },
        timeout: 30000
      });

      if (crawlResponse.success && (crawlResponse as any).data?.extract) {
        const extractedData = (crawlResponse as any).data.extract;
        console.log(`📋 Raw extraction result:`, JSON.stringify(extractedData, null, 2).substring(0, 500));
        
        if (extractedData.products && Array.isArray(extractedData.products)) {
          const products = extractedData.products.map((product: any) => ({
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
          console.log(`✅ Successfully extracted ${products.length} products from ${supplier}`);
          
          // Log a sample product for debugging
          if (products.length > 0) {
            console.log(`📦 Sample product:`, JSON.stringify(products[0], null, 2));
          }
        } else {
          console.warn(`⚠️ No products array found in extraction result for ${url}`);
          console.log(`🔍 Available keys in extraction:`, Object.keys(extractedData));
        }
        
        // Rate limiting between requests
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.error(`❌ Extraction failed for ${url}:`, crawlResponse.error || 'Unknown error');
        console.log(`🔍 Response structure:`, JSON.stringify(crawlResponse, null, 2).substring(0, 300));
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
      console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
      throw new Error('FIRECRAWL_API_KEY configuration missing - please contact support');
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

    // Treat 0 tools found as a failure since this indicates scraping issues
    if (totalProductsFound === 0) {
      console.error('❌ No tools found during scraping - this indicates a scraping failure');
      return new Response(JSON.stringify({
        success: false,
        error: 'No tools found during scraping. This may be due to website structure changes, anti-bot protection, or network issues.',
        categoriesScraped: categoriesToScrape.length,
        totalProducts: 0,
        details: 'All supplier websites returned 0 products',
        tools: []
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Store results in database
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
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      tools: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});