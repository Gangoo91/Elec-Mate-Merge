import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { safeAll } from '../_shared/safe-parallel.ts';

const suppliers = [
  { name: "Screwfix", url: "https://www.screwfix.com/search?search=" },
  { name: "Toolstation", url: "https://www.toolstation.com/search?q=" },
  { name: "RS Components", url: "https://uk.rs-online.com/web/c/?searchTerm=" },
  { name: "CEF - City Electrical Factors", url: "https://www.cef.co.uk/catalogue/products/search?q=" },
];

// --- Electrical Tools Categories (BS7671 Compliant) ---
const productList = [
  {
    category: "Power Tools",
    items: ["cordless drill", "impact driver", "SDS drill", "angle grinder", "circular saw", "reciprocating saw", "multi-tool"],
  },
  {
    category: "Hand Tools", 
    items: ["electrician pliers", "wire strippers", "screwdriver set", "side cutters", "long nose pliers", "combination pliers", "electrical knife"],
  },
  {
    category: "Test Equipment",
    items: ["multimeter", "voltage tester", "insulation tester", "RCD tester", "PAT tester", "socket tester", "phase rotation tester", "earth loop tester"],
  },
  {
    category: "Measuring Tools",
    items: ["cable detector", "pipe detector", "stud finder", "laser level", "spirit level", "measuring tape", "digital caliper"],
  },
  {
    category: "Safety Equipment",
    items: ["safety helmet", "safety glasses", "work gloves", "high vis vest", "knee pads", "safety boots", "ear protection"],
  },
  {
    category: "Specialist Tools",
    items: ["cable pulling system", "fish tape", "conduit bender", "cable cutter", "crimping tool", "torque wrench", "hole saw kit"],
  },
  {
    category: "Access Tools & Equipment",
    items: ["step ladder", "extension ladder", "platform steps", "scaffold tower", "mobile platform", "roof ladder"],
  },
  {
    category: "Tool Storage",
    items: ["tool bag", "tool box", "tool belt", "tool case", "tool trolley", "tool vest", "storage cabinet"],
  }
];

// --- Firecrawl Schema ---
const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: { type: "string" },
      category: { type: "string" },
      highlights: { type: "array" },
      price: { type: "string" },
      description: { type: "string" },
      reviews: { type: "string" },
      image: { type: "string", format: "uri" },
      view_product_url: { type: "string", format: "uri" },
    },
  },
};

// --- Scraper Function ---
async function fetchProductsFromSupplier(
  supplier: any, 
  query: string, 
  category: string, 
  FIRECRAWL_API_KEY: string,
  logger: any
) {
  logger.debug(`Fetching ${query} from ${supplier.name}`);

  const firecrawl_url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `${supplier.url}${encodeURIComponent(query)}`,
      onlyMainContent: true,
      maxAge: 0,
      formats: [
        {
          type: "json",
          prompt: `Extract product details for ${query} in category ${category}`,
          schema: productSchema,
        },
      ],
    }),
  };

  try {
    const response = await withRetry(
      () => withTimeout(
        fetch(firecrawl_url, options),
        Timeouts.LONG,
        `Firecrawl scrape ${supplier.name}`
      ),
      RetryPresets.STANDARD
    );
    if (!response.ok) {
      logger.error(`API request failed for ${supplier.name}`, { status: response.status });
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const responseText = await response.text();
    if (!responseText || responseText.trim() === '') {
      logger.warn(`Empty response from Firecrawl API for ${supplier.name}`);
      return [];
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      logger.error(`JSON parse error for ${supplier.name}`, { error: parseError });
      return [];
    }

    const products = data.data?.json || [];
    
    // Filter to ensure we only get electrical tools
    const filteredProducts = products.filter((item: any) => {
      const name = (item.name || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      
      // Exclude non-electrical items
      const exclusions = ['sealant', 'adhesive', 'glue', 'foam', 'tape measure', 'spirit level', 
                         'general purpose', 'masonry', 'building', 'construction only'];
      if (exclusions.some(exc => name.includes(exc) || description.includes(exc))) {
        return false;
      }
      
      // Include electrical tools
      const inclusions = ['electrical', 'electric', 'voltage', 'current', 'wire', 'cable', 'circuit',
                         'multimeter', 'tester', 'drill', 'driver', 'saw', 'grinder', 'pliers', 
                         'screwdriver', 'cutter', 'stripper', 'tool', 'safety', 'protection'];
      return inclusions.some(inc => name.includes(inc) || description.includes(inc) || query.toLowerCase().includes(inc));
    });
    
    return filteredProducts.map((item: any, index: number) => ({
      id: Date.now() + Math.random() * 1000 + index,
      name: item.name || 'Unknown Product',
      category: category,
      price: item.price || '£0.00',
      supplier: supplier.name,
      image: item.image || '/placeholder.svg',
      searched_product: query,
      productUrl: item.view_product_url,
      highlights: item.highlights || [],
      description: item.description,
      reviews: item.reviews,
      stockStatus: 'In Stock' as const,
      isOnSale: false
    }));
  } catch (error) {
    logger.warn(`Error fetching ${query} from ${supplier.name}`, { error: error instanceof Error ? error.message : String(error) });
    return [];
  }
}

// --- Main Function with Grouped Output ---
async function getMaterials(
  FIRECRAWL_API_KEY: string, 
  logger: any,
  categoryFilter?: string, 
  supplierFilter?: string, 
  searchTerm?: string
) {
  logger.info('Starting comprehensive materials scraping', { categoryFilter, supplierFilter, searchTerm });
  
  const jobs = [];
  const filteredSuppliers = supplierFilter
    ? suppliers.filter(supplier => supplier.name === supplierFilter)
    : suppliers;

  // If searchTerm is provided, use it directly instead of predefined queries
  if (searchTerm && searchTerm.trim()) {
    for (const supplier of filteredSuppliers) {
      jobs.push({
        name: `${supplier.name}-${searchTerm}`,
        execute: () => fetchProductsFromSupplier(supplier, searchTerm.trim(), 'search', FIRECRAWL_API_KEY, logger)
      });
    }
  } else {
    // Use predefined product queries
    const filteredProductList = categoryFilter 
      ? productList.filter(group => group.category === categoryFilter)
      : productList;

    for (const group of filteredProductList) {
      for (const product of group.items) {
        for (const supplier of filteredSuppliers) {
          jobs.push({
            name: `${supplier.name}-${product}`,
            execute: () => fetchProductsFromSupplier(supplier, product, group.category, FIRECRAWL_API_KEY, logger)
          });
        }
      }
    }
  }

  logger.info(`Processing ${jobs.length} scraping jobs`);
  const { successes, failures } = await safeAll(jobs);
  
  if (failures.length > 0) {
    logger.warn(`${failures.length} scraping jobs failed`, { failures: failures.map(f => f.name) });
  }
  
  const materials = successes.map(s => s.result).flat();
  logger.info(`Successfully fetched ${materials.length} products`);
  return materials;
}

// --- Save Prices to Historical Database ---
async function savePricesToHistory(materials: any[]) {
  console.log(`💾 Saving ${materials.length} prices to historical database...`);
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const historicalEntries = materials
    .filter(material => material.price && material.price !== '£0.00')
    .map(material => ({
      product_name: material.name,
      supplier: material.supplier,
      price: parseFloat(material.price.replace('£', '').replace(',', '')),
      currency: 'GBP',
      source_url: material.productUrl,
      category: material.category,
      date_scraped: new Date().toISOString()
    }));

  if (historicalEntries.length > 0) {
    const { error } = await supabase
      .from('historical_prices')
      .insert(historicalEntries);

    if (error) {
      console.error('❌ Error saving prices to history:', error);
    } else {
      console.log(`✅ Saved ${historicalEntries.length} prices to historical database`);
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'comprehensive-materials-scraper' });

  try {
    logger.info('Starting comprehensive materials scraper');
    
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new ValidationError('Firecrawl API key not configured');
    }

    // Parse request body for filters
    let categoryFilter: string | undefined;
    let supplierFilter: string | undefined;
    let searchTerm: string | undefined;
    
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        categoryFilter = body.category;
        supplierFilter = body.supplier;
        searchTerm = body.searchTerm || body.search;
      } catch (jsonError) {
        logger.warn('Failed to parse request body, using defaults');
      }
    }

    logger.info('Request filters', { categoryFilter: categoryFilter || 'all', supplierFilter: supplierFilter || 'all', searchTerm: searchTerm || 'none' });

    const materials = await logger.time(
      'Materials scraping',
      () => getMaterials(FIRECRAWL_API_KEY, logger, categoryFilter, supplierFilter, searchTerm)
    );

    // Save prices to historical database
    await savePricesToHistory(materials);

    const response = {
      success: true,
      count: materials.length,
      materials: materials,
      categories: productList.map(p => p.category),
      suppliers: suppliers.map(s => s.name),
      timestamp: new Date().toISOString(),
      requestId
    };

    logger.info('Materials scraping completed', { count: materials.length });

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    logger.error('Materials scraper error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});