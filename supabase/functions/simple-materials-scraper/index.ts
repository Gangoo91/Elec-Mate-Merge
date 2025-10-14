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
      url: "https://www.screwfix.com/c/electrical-lighting/cables/cat850003?page_size=50",
      onlyMainContent: true,
      maxAge: 0,
      timeout: 30000,
      formats: ["markdown"],
    }),
  };

  try {
    logger.info('Starting Firecrawl scrape from Screwfix (markdown mode)');
    const response = await withRetry(
      () => withTimeout(
        fetch(url, options),
        45000,
        'Firecrawl materials scrape'
      ),
      RetryPresets.STANDARD
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Firecrawl API error', { status: response.status, error: errorText });
      throw new Error(`Firecrawl API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    logger.info('Firecrawl response received', { 
      success: data.success,
      hasMarkdown: !!data.data?.markdown,
      markdownLength: data.data?.markdown?.length || 0
    });

    if (!data.data?.markdown) {
      logger.warn('No markdown data in response');
      return [];
    }

    // Parse markdown to extract product information
    const markdown = data.data.markdown;
    const products = [];
    
    // Simple regex to find product patterns - looking for price indicators
    const priceMatches = markdown.matchAll(/£(\d+\.\d{2})/g);
    const prices = Array.from(priceMatches);
    
    logger.info('Found prices in markdown', { count: prices.length });
    
    // For now, return a simple parsed structure
    // This is a basic implementation - we can enhance it based on what we see
    const lines = markdown.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const priceMatch = line.match(/£(\d+\.\d{2})/);
      
      if (priceMatch && i > 0) {
        // Look for product name in previous lines
        const nameLine = lines[i - 1] || lines[i - 2] || '';
        if (nameLine.trim()) {
          products.push({
            name: nameLine.trim().replace(/[#*]/g, ''),
            price: `£${priceMatch[1]}`,
            supplier: 'Screwfix',
            inStock: true,
          });
        }
      }
    }

    logger.info('Extracted products from markdown', { count: products.length });
    return products;
  } catch (error) {
    logger.error('Error scraping from Screwfix', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
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
