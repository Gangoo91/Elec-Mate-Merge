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
            description: "Full product name or title, including model number if applicable",
          },
          brand: {
            type: "string",
            description: "Brand or manufacturer name (e.g., Makita, DeWalt, Bosch, Hilti, Bahco, Wiha, Wera)",
          },
          category: {
            type: "string",
            description: "The product category (e.g., Drills, Screwdrivers, Power Tools, Cables) or type of cable",
          },
          productType: {
            type: "string",
            description: "Specific product type (e.g., SDS Drill, Combi Drill, Cordless, Corded)",
          },
          voltage: {
            type: "string",
            description: "Voltage rating if applicable (e.g., 18V, 240V)",
          },
          price: {
            type: "string",
            description: "The price of the product, including numeric value, currency, and VAT info if applicable",
          },
          inStock: {
            type: "boolean",
            description: "Whether the product is currently in stock",
          },
          description: {
            type: "string",
            description: "Key features, description, or important details of the product",
          },
          highlights: {
            type: "array",
            description: "Array of product highlights or key features",
          },
          reviews: {
            type: "string",
            description: "Number of reviews or rating summary",
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

async function fetchElectricalTools(logger: any) {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    throw new ValidationError('FIRECRAWL_API_KEY not found in environment variables');
  }

  const url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.screwfix.com/search?search=testers%2C+hand+tools+and+power+tools&page_size=100",
      onlyMainContent: true,
      maxAge: 0,
      timeout: 45000,
      formats: [
        {
          type: "json",
          schema: productSchema,
          prompt: `Extract all tool products visible on this page. For each product, include:  
                      - Full product names, including model numbers  
                      - Brand names (prioritize: Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK for hand tools)  
                      - Exact prices in GBP  
                      - Product codes or SKUs  
                      - Stock availability (in stock or not)  
                      - Product categories and specific types (e.g., SDS Drill, Combi Drill, Cordless, Corded, Screwdriver)  
                      - Voltage ratings for power tools (e.g., 18V, 240V)  
                      - Key features or highlights if available  
                      - Direct URLs to product pages  
                      - Product images  
    
                      Extract every product visible on the page, capturing all the details above.`
        },
      ],
    }),
  };

  try {
    logger.info('Starting Firecrawl scrape for electrical tools');
    const response = await withRetry(
      () => withTimeout(
        fetch(url, options),
        Timeouts.LONG,
        'Firecrawl tools scrape'
      ),
      RetryPresets.STANDARD
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    logger.info('Firecrawl scrape successful, processing results');

    return data.data.json || [];
  } catch (error) {
    logger.error('Error fetching electrical tools', { error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'firecrawl-tools-scraper' });

  try {
    logger.info('Firecrawl Tools Scraper invoked');
    
    const tools = await logger.time(
      'Tools scraping',
      () => fetchElectricalTools(logger)
    );
    
    logger.info('Retrieved electrical tools from Screwfix', { count: tools.length });

    return new Response(JSON.stringify({ tools, requestId }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    logger.error('Firecrawl tools scraper error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});