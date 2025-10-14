import { serve, corsHeaders } from "../_shared/deps.ts";
import { handleError, ValidationError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: {
        type: "string",
        description: "Full product name or title",
      },
      brand: {
        type: "string",
        description: "Brand or manufacturer name",
      },
      category: {
        type: "string",
        description: "Product category (e.g., Cables, Components, Lighting)",
      },
      price: {
        type: "string",
        description: "The price of the product including currency and VAT",
      },
      inStock: {
        type: "boolean",
        description: "Whether the product is currently in stock",
      },
      description: {
        type: "string",
        description: "Product description or key features",
      },
      image: {
        type: "string",
        format: "uri",
        description: "URL of the product image",
      },
      view_product_url: {
        type: "string",
        format: "uri",
        description: "Direct URL to the product page",
      }
    }
  },
};

async function scrapeFromScrewfix(logger: any) {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    throw new ValidationError('FIRECRAWL_API_KEY not found');
  }

  const url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.screwfix.com/c/electrical-lighting/cat850002?page_size=100",
      onlyMainContent: true,
      maxAge: 0,
      timeout: 45000,
      formats: [
        {
          type: "json",
          schema: productSchema,
          prompt: `Extract all electrical products visible on this page. For each product, include:  
                      - Full product names  
                      - Brand names
                      - Exact prices in GBP  
                      - Stock availability
                      - Product categories
                      - Product images  
                      - Direct URLs to product pages
    
                      Extract every product visible on the page.`
        },
      ],
    }),
  };

  try {
    logger.info('Starting Firecrawl scrape from Screwfix');
    const response = await withRetry(
      () => withTimeout(
        fetch(url, options),
        Timeouts.LONG,
        'Firecrawl materials scrape'
      ),
      RetryPresets.STANDARD
    );

    if (!response.ok) {
      throw new Error(`Firecrawl API request failed: ${response.status}`);
    }

    const data = await response.json();
    logger.info('Firecrawl scrape successful', { count: data.data?.json?.length || 0 });

    return data.data?.json || [];
  } catch (error) {
    logger.error('Error scraping from Screwfix', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'simple-materials-scraper' });

  try {
    logger.info('Simple materials scraper invoked');
    
    const materials = await logger.time(
      'Materials scraping',
      () => scrapeFromScrewfix(logger)
    );
    
    logger.info('Retrieved electrical materials from Screwfix', { count: materials.length });

    // Transform to consistent format
    const formattedMaterials = materials.map((item: any) => ({
      name: item.name,
      category: item.category || 'Electrical Materials',
      price: item.price,
      supplier: 'Screwfix',
      image: item.image,
      productUrl: item.view_product_url,
      inStock: item.inStock !== false,
      description: item.description,
      brand: item.brand
    }));

    return new Response(
      JSON.stringify({ 
        materials: formattedMaterials, 
        count: formattedMaterials.length,
        requestId 
      }), 
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
      }
    );

  } catch (error) {
    logger.error('Simple materials scraper error', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return handleError(error);
  }
});
