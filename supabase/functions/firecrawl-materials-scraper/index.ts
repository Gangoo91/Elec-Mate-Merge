import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
  description?: string;
}

const suppliers = [
  {
    name: 'CEF',
    baseUrl: 'https://www.cef.co.uk',
    categories: {
      'cables': '/products/cables',
      'components': '/products/consumer-units',
      'protection': '/products/earthing-lightning-protection',
      'accessories': '/products/cable-accessories',
      'lighting': '/products/led-lighting'
    }
  },
  {
    name: 'Rexel',
    baseUrl: 'https://www.rexel.co.uk',
    categories: {
      'cables': '/electrical-cables',
      'components': '/consumer-units-mcbs',
      'protection': '/surge-protection',
      'accessories': '/cable-management',
      'lighting': '/led-lighting'
    }
  },
  {
    name: 'Edmundson',
    baseUrl: 'https://www.edmundsonelectrical.com',
    categories: {
      'cables': '/cables-wiring',
      'components': '/protection-control',
      'protection': '/earthing-bonding',
      'accessories': '/cable-accessories',
      'lighting': '/lighting-solutions'
    }
  },
  {
    name: 'TLC',
    baseUrl: 'https://www.tlc-direct.co.uk',
    categories: {
      'cables': '/products/cables',
      'components': '/products/mcbs-rcds',
      'protection': '/products/surge-protection',
      'accessories': '/products/junction-boxes',
      'lighting': '/products/led-lighting'
    }
  }
];

const categorySchemas = {
  cables: {
    type: "object",
    properties: {
      products: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Cable product name" },
            price: { type: "string", description: "Price in GBP format" },
            stockStatus: { type: "string", enum: ["In Stock", "Out of Stock", "Low Stock"] },
            specifications: { type: "string", description: "Cable specifications (cores, CSA, voltage)" },
            productUrl: { type: "string", description: "Product page URL" },
            image: { type: "string", description: "Product image URL" }
          },
          required: ["name", "price"]
        }
      }
    }
  },
  components: {
    type: "object", 
    properties: {
      products: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Component product name" },
            price: { type: "string", description: "Price in GBP format" },
            stockStatus: { type: "string", enum: ["In Stock", "Out of Stock", "Low Stock"] },
            rating: { type: "string", description: "Current rating (A)" },
            poles: { type: "string", description: "Number of poles" },
            productUrl: { type: "string", description: "Product page URL" },
            image: { type: "string", description: "Product image URL" }
          },
          required: ["name", "price"]
        }
      }
    }
  },
  protection: {
    type: "object",
    properties: {
      products: {
        type: "array", 
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Protection equipment name" },
            price: { type: "string", description: "Price in GBP format" },
            stockStatus: { type: "string", enum: ["In Stock", "Out of Stock", "Low Stock"] },
            protectionType: { type: "string", description: "Type of protection" },
            productUrl: { type: "string", description: "Product page URL" },
            image: { type: "string", description: "Product image URL" }
          },
          required: ["name", "price"]
        }
      }
    }
  },
  accessories: {
    type: "object",
    properties: {
      products: {
        type: "array",
        items: {
          type: "object", 
          properties: {
            name: { type: "string", description: "Accessory product name" },
            price: { type: "string", description: "Price in GBP format" },
            stockStatus: { type: "string", enum: ["In Stock", "Out of Stock", "Low Stock"] },
            material: { type: "string", description: "Material type" },
            productUrl: { type: "string", description: "Product page URL" },
            image: { type: "string", description: "Product image URL" }
          },
          required: ["name", "price"]
        }
      }
    }
  },
  lighting: {
    type: "object",
    properties: {
      products: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Lighting product name" },
            price: { type: "string", description: "Price in GBP format" },
            stockStatus: { type: "string", enum: ["In Stock", "Out of Stock", "Low Stock"] },
            wattage: { type: "string", description: "Power rating in watts" },
            lightOutput: { type: "string", description: "Lumens output" },
            productUrl: { type: "string", description: "Product page URL" },
            image: { type: "string", description: "Product image URL" }
          },
          required: ["name", "price"]
        }
      }
    }
  }
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }

    const { category = 'all', forceRefresh = false } = await req.json();
    
    console.log(`Starting Firecrawl materials scraping for category: ${category}`);
    
    const firecrawlApp = new FirecrawlApp({ apiKey });
    const allMaterials: MaterialItem[] = [];
    
    const categoriesToScrape = category === 'all' 
      ? ['cables', 'components', 'protection', 'accessories', 'lighting']
      : [category];

    for (const cat of categoriesToScrape) {
      console.log(`Scraping category: ${cat}`);
      
      for (const supplier of suppliers) {
        try {
          const categoryUrl = supplier.categories[cat as keyof typeof supplier.categories];
          if (!categoryUrl) continue;
          
          const fullUrl = `${supplier.baseUrl}${categoryUrl}`;
          console.log(`Scraping ${supplier.name} for ${cat}: ${fullUrl}`);
          
          const scrapeResponse = await firecrawlApp.scrapeUrl(fullUrl, {
            formats: ['extract'],
            extract: {
              schema: categorySchemas[cat as keyof typeof categorySchemas],
              systemPrompt: `Extract electrical ${cat} products from this ${supplier.name} page. Focus on products with clear pricing and availability. Include all relevant product specifications.`
            }
          });

          if (scrapeResponse.success && scrapeResponse.extract?.products) {
            const products = scrapeResponse.extract.products;
            console.log(`Found ${products.length} products from ${supplier.name} ${cat}`);
            
            products.forEach((product: any, index: number) => {
              const material: MaterialItem = {
                id: `${supplier.name.toLowerCase()}-${cat}-${index + 1}`,
                name: product.name || `${supplier.name} ${cat} Product`,
                category: cat.charAt(0).toUpperCase() + cat.slice(1),
                price: product.price || '£0.00',
                supplier: supplier.name,
                image: product.image || '/placeholder.svg',
                stockStatus: product.stockStatus || 'In Stock',
                productUrl: product.productUrl ? (product.productUrl.startsWith('http') ? product.productUrl : `${supplier.baseUrl}${product.productUrl}`) : fullUrl,
                description: product.specifications || product.rating || product.protectionType || product.material || product.wattage || 'Electrical product',
                highlights: product.specifications ? [product.specifications] : []
              };
              
              allMaterials.push(material);
            });
          }
        } catch (error) {
          console.error(`Error scraping ${supplier.name} ${cat}:`, error);
          // Continue with other suppliers/categories
        }
      }
    }

    console.log(`Total materials scraped: ${allMaterials.length}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        materials: allMaterials,
        totalCount: allMaterials.length,
        categories: categoriesToScrape,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in firecrawl-materials-scraper:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        materials: [],
        totalCount: 0
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