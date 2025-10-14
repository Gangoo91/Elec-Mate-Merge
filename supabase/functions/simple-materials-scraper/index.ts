import { serve, corsHeaders } from "../_shared/deps.ts";
import { handleError, ValidationError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

const extractSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          price: { type: "string" },
          brand: { type: "string" },
          image: { type: "string" },
          productUrl: { type: "string" },
          inStock: { type: "boolean" }
        },
        required: ["name", "price"]
      }
    }
  },
  required: ["products"]
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
      url: "https://www.screwfix.com/c/electrical-lighting/cables/cat850003",
      formats: [
        {
          type: "extract",
          schema: extractSchema,
          prompt: "Extract all electrical cable products from this page. For each product include the name, price (in GBP with £ symbol), brand, image URL, product page URL, and stock availability. Only extract actual products, not navigation items or ads."
        }
      ],
      onlyMainContent: true,
      timeout: 60000,
    }),
  };

  try {
    logger.info('Starting Firecrawl scrape from Screwfix (extract mode)');
    const response = await withRetry(
      () => withTimeout(
        fetch(url, options),
        70000,
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
      hasExtract: !!data.data?.extract,
      extractKeys: data.data?.extract ? Object.keys(data.data.extract) : []
    });

    if (!data.success) {
      logger.error('Firecrawl scrape failed', { data });
      return [];
    }

    const extractedData = data.data?.extract;
    if (!extractedData?.products || !Array.isArray(extractedData.products)) {
      logger.warn('No products array in extracted data', { extractedData });
      return [];
    }

    const products = extractedData.products.map((product: any) => ({
      name: product.name || 'Unknown Product',
      price: product.price || '£0.00',
      brand: product.brand,
      supplier: 'Screwfix',
      inStock: product.inStock !== false,
      image: product.image,
      view_product_url: product.productUrl,
      category: 'Electrical Cables'
    }));

    logger.info('Extracted products successfully', { count: products.length });
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
