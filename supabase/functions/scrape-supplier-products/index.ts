import { corsHeaders } from '../_shared/cors.ts';

const SUPPLIER_CONFIGS = {
  'screwfix': {
    name: 'Screwfix',
    searchUrl: 'https://www.screwfix.com/c/electrical-plumbing/electrical/cat830002'
  },
  'city-electrical-factors': {
    name: 'City Electrical Factors',
    searchUrl: 'https://www.cef.co.uk'
  },
  'electricaldirect': {
    name: 'Electrical Direct',
    searchUrl: 'https://www.electricaldirect.co.uk'
  },
  'toolstation': {
    name: 'Toolstation',
    searchUrl: 'https://www.toolstation.com/electrical'
  }
};

interface SupplierProduct {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  supplier: string;
  category: string;
  image?: string;
  productUrl: string;
  stock?: 'in-stock' | 'out-of-stock' | 'limited';
}

Deno.serve(async (req) => {
  console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Invoked at ${new Date().toISOString()}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { supplier, searchTerm } = await req.json();
    
    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Supplier: ${supplier}`);
    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Search Term: ${searchTerm}`);
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl key set: ${!!firecrawlApiKey}`);
    
    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    const supplierConfig = SUPPLIER_CONFIGS[supplier as keyof typeof SUPPLIER_CONFIGS];
    if (!supplierConfig) {
      throw new Error(`Unknown supplier: ${supplier}`);
    }

    // Use Firecrawl to search for products on the supplier's website
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `site:${new URL(supplierConfig.searchUrl).hostname} ${searchTerm}`,
        sources: ['web'],
        limit: 10,
        includeHtml: false,
        includeRawHtml: false
      })
    });

    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl status: ${firecrawlResponse.status} ${firecrawlResponse.ok}`);

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      console.error(`[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl error: ${errorText}`);
      throw new Error(`Firecrawl API error: ${firecrawlResponse.status}`);
    }

    const firecrawlData = await firecrawlResponse.json();
    const results = firecrawlData.results || [];

    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Found ${results.length} results`);

    // Process and structure the results
    const products: SupplierProduct[] = results.map((result: any, index: number) => {
      // Extract price from content - look for common UK price patterns
      const priceMatch = result.content?.match(/£([\d,]+\.?\d*)/);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : 0;

      // Generate product category based on search term
      let category = 'electrical';
      if (searchTerm.toLowerCase().includes('cable') || searchTerm.toLowerCase().includes('wire')) {
        category = 'cables';
      } else if (searchTerm.toLowerCase().includes('switch') || searchTerm.toLowerCase().includes('socket')) {
        category = 'components';
      } else if (searchTerm.toLowerCase().includes('tool')) {
        category = 'tools';
      }

      return {
        id: `${supplier}-${index}`,
        name: result.title || 'Product',
        price: price,
        supplier: supplierConfig.name,
        category: category,
        productUrl: result.url || supplierConfig.searchUrl,
        stock: 'in-stock' as const,
        image: result.image || undefined
      };
    }).filter(product => product.price > 0); // Only return products with valid prices

    console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Processed ${products.length} valid products`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        products,
        supplier: supplierConfig.name,
        searchTerm 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error(`[SCRAPE-SUPPLIER-PRODUCTS] Error:`, error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to scrape products',
        products: []
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});