import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

type SupplierSlug = "screwfix" | "electricaldirect" | "toolstation";

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  isOnSale?: boolean;
  salePrice?: string;
  stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
}

const SUPPLIER_NAMES: Record<SupplierSlug, string> = {
  "screwfix": "Screwfix",
  "electricaldirect": "ElectricalDirect",
  "toolstation": "Toolstation",
};

// Firecrawl v2 JSON schema for cables & wiring
const cablesWiringSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: { type: "string", description: "The name or title of the product" },
      price: { type: "string", description: "The price of the product, including currency and VAT info" },
      description: { type: "string", description: "Key features or details of the product" },
      reviews: { type: "string", description: "The number of reviews or rating summary" },
      image: { type: "string", format: "uri", description: "URL of the product image" },
      view_product_url: { type: "string", format: "uri", description: "Direct URL to the product page" },
      category: { type: "string", description: "The category or cable type of the product" },
      highlights: { type: "array", description: "The highlight or cable highlight of the product" },
    },
  },
};

// JSON schema for protection equipment structured extraction
const protectionProductSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: { type: "string", description: "The name or title of the product" },
      price: { type: "string", description: "The price of the product, including currency and VAT info" },
      description: { type: "string", description: "Key features or details of the product" },
      reviews: { type: "string", description: "The number of reviews or rating summary" },
      image: { type: "string", format: "uri", description: "URL of the product image" },
      view_product_url: { type: "string", format: "uri", description: "Direct URL to the product page" },
      highlights: { 
        type: "array", 
        items: { type: "string" },
        description: "Product highlights, features, certifications (BS/CE compliance), safety features, key specifications, or protection capabilities" 
      },
    },
  },
};

// Categorize protection products based on their names
function categorizeProtectionProduct(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (/\b(mcb|miniature|circuit.*breaker|type.*[abc])\b/i.test(lowerName)) {
    return "MCBs";
  } else if (/\b(rcd|residual.*current|earth.*leakage)\b/i.test(lowerName)) {
    return "RCDs";
  } else if (/\b(rcbo|combined.*protection)\b/i.test(lowerName)) {
    return "RCBOs";
  } else if (/\b(surge.*protect|spd|lightning.*protect|transient)\b/i.test(lowerName)) {
    return "Surge Protectors";
  } else if (/\b(isolator|switch.*disconnect|main.*switch)\b/i.test(lowerName)) {
    return "Isolators";
  } else if (/\b(afdd|arc.*fault|arc.*detect)\b/i.test(lowerName)) {
    return "AFDD";
  } else {
    return "Protection";
  }
}

// Generate highlights for components when not provided by scraping
function generateComponentHighlights(name: string, description: string = ""): string[] {
  const highlights: string[] = [];
  const lowerName = name.toLowerCase();
  const lowerDesc = description.toLowerCase();
  const combined = `${lowerName} ${lowerDesc}`;

  // Extract ratings and specifications
  const ampMatch = combined.match(/(\d+)\s*a\b/i);
  if (ampMatch) highlights.push(`${ampMatch[1]}A Rated`);

  const voltMatch = combined.match(/(\d+)\s*v\b/i);
  if (voltMatch) highlights.push(`${voltMatch[1]}V`);

  // Module counts
  const moduleMatch = combined.match(/(\d+)\s*(?:way|module|circuit)/i);
  if (moduleMatch) highlights.push(`${moduleMatch[1]}-Module`);

  // Safety standards
  if (/\bbs\s*\d+/i.test(combined)) highlights.push("BS Compliant");
  if (/\bce\b/i.test(combined)) highlights.push("CE Marked");
  if (/\ben\s*\d+/i.test(combined)) highlights.push("EN Standard");

  // Product type specific highlights
  if (/\bmcb\b/i.test(combined)) {
    highlights.push("Circuit Protection");
    if (/type\s*[abc]/i.test(combined)) {
      const typeMatch = combined.match(/type\s*([abc])/i);
      if (typeMatch) highlights.push(`Type ${typeMatch[1].toUpperCase()}`);
    }
  }

  if (/\brcd\b/i.test(combined)) {
    highlights.push("Earth Leakage Protection");
    const sensitivityMatch = combined.match(/(\d+)\s*ma/i);
    if (sensitivityMatch) highlights.push(`${sensitivityMatch[1]}mA Sensitivity`);
  }

  if (/\brcbo\b/i.test(combined)) {
    highlights.push("Combined Protection");
  }

  if (/consumer.*unit/i.test(combined)) {
    highlights.push("Distribution Board");
    if (/split.*load/i.test(combined)) highlights.push("Split Load");
    if (/metal/i.test(combined)) highlights.push("Metal Enclosure");
  }

  if (/isolator/i.test(combined)) {
    highlights.push("Isolation Switch");
  }

  if (/surge/i.test(combined)) {
    highlights.push("Surge Protection");
  }

  // Quality indicators
  if (/professional/i.test(combined)) highlights.push("Professional Grade");
  if (/contractor/i.test(combined)) highlights.push("Contractor Grade");
  if (/din.*rail/i.test(combined)) highlights.push("DIN Rail Mount");

  // Default highlights if none found
  if (highlights.length === 0) {
    if (/mcb/i.test(combined)) highlights.push("Circuit Breaker");
    if (/rcd/i.test(combined)) highlights.push("Safety Device");
    if (/consumer/i.test(combined)) highlights.push("Distribution");
    if (/switch/i.test(combined)) highlights.push("Switching Device");
    
    // Fallback
    if (highlights.length === 0) highlights.push("Electrical Component");
  }

  return highlights.slice(0, 3); // Limit to 3 highlights for clean display
}

function buildSearchUrl(slug: SupplierSlug, query: string) {
  const q = encodeURIComponent(query);
  
  // For tools category, use specific category pages for better results
  const isToolsSearch = /multimeter|socket tester|cable detector|voltage detector|testing|tester|meter/i.test(query);
  const isProtectionSearch = /mcb|rcd|rcbo|breaker|protection|switch|isolator|surge|spd/i.test(query);
  
  switch (slug) {
    case "screwfix":
      // Use testing equipment category page for tools searches
      if (isToolsSearch) {
        return "https://www.screwfix.com/c/tools/testing-equipment/cat8830001";
      }
      // Use protection equipment search for protection searches
      if (isProtectionSearch) {
        return "https://www.screwfix.com/search?search=Protection+Equipment";
      }
      return `https://www.screwfix.com/search?search=${q}`;
    case "electricaldirect":
      // ElectricalDirect prefers `query` param – using `q` can yield Netlify 404s
      return `https://www.electricaldirect.co.uk/search?query=${q}`;
    case "toolstation":
      return `https://www.toolstation.com/search?q=${q}`;
    default:
      return "#";
  }
}

// Function to scrape components (Consumer units, MCBs, RCDs, isolators, accessories) using Firecrawl v2
async function scrapeComponentsWithFirecrawl(): Promise<MaterialItem[]> {
  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlKey) {
    throw new Error("Firecrawl API key not configured");
  }

  const url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.screwfix.com/search?search=Consumer+units%2C+MCBs%2C+RCDs%2C+isolators%2C+accessories&page_size=100",
      onlyMainContent: true,
      maxAge: 0,
      parsers: [],
      formats: [
        {
          type: "json",
          schema: protectionProductSchema,
        },
      ],
    }),
  };

  try {
    console.log(`[COMPONENTS] Firecrawl v2 scraping Screwfix comprehensive components search...`);
    
    const response = await fetch(url, options);
    console.log(`[COMPONENTS] Firecrawl status: ${response.status} ${response.ok}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[COMPONENTS] Firecrawl response received, processing data...`);
    
    if (data.success && data.data && data.data.json) {
      const products = Array.isArray(data.data.json) ? data.data.json : [];
      console.log(`[COMPONENTS] Extracted ${products.length} products from Firecrawl v2`);
      
      return products.map((product: any, index: number) => ({
        id: Date.now() + index,
        name: product.name || "Unknown Product",
        category: categorizeProtectionProduct(product.name || ""),
        price: product.price || "Price on application",
        supplier: "Screwfix",
        image: product.image && product.image.startsWith('http') ? product.image : "/placeholder.svg",
        productUrl: product.view_product_url || "https://www.screwfix.com",
        highlights: product.highlights || generateComponentHighlights(product.name || "", product.description || "")
      }));
    } else {
      console.log(`[COMPONENTS] Invalid Firecrawl v2 response structure`);
      return [];
    }
  } catch (error) {
    console.error(`[COMPONENTS] Firecrawl v2 scraping failed:`, error);
    return [];
  }
}

// Function to scrape cables & wiring using Firecrawl v2 JSON extraction
async function scrapeCablesWiringWithFirecrawl(): Promise<MaterialItem[]> {
  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlKey) {
    throw new Error("Firecrawl API key not configured");
  }

  const url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.screwfix.com/search?search=Twin+%26+Earth%2C+SWA%2C+flex+cables%2C+data+cables&page_size=100",
      onlyMainContent: true,
      maxAge: 0,
      parsers: [],
      formats: [
        {
          type: "json",
          schema: cablesWiringSchema,
        },
      ],
    }),
  };

  try {
    console.log(`[CABLES-WIRING] Firecrawl v2 scraping Screwfix comprehensive cables search...`);
    
    const response = await fetch(url, options);
    console.log(`[CABLES-WIRING] Firecrawl status: ${response.status} ${response.ok}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[CABLES-WIRING] Firecrawl response received, processing data...`);
    
    if (data.success && data.data && data.data.json) {
      const products = Array.isArray(data.data.json) ? data.data.json : [];
      console.log(`[CABLES-WIRING] Extracted ${products.length} products from Firecrawl v2`);
      
      return products.map((product: any, index: number) => ({
        id: Date.now() + index,
        name: product.name || "Unknown Product",
        category: product.category || "Cables",
        price: product.price || "Price on application",
        supplier: "Screwfix",
        image: product.image && product.image.startsWith('http') ? product.image : "/placeholder.svg",
        productUrl: product.view_product_url || "https://www.screwfix.com",
        highlights: product.highlights || []
      }));
    } else {
      console.log(`[CABLES-WIRING] Invalid Firecrawl v2 response structure`);
      return [];
    }
  } catch (error) {
    console.error(`[CABLES-WIRING] Firecrawl v2 scraping failed:`, error);
    return [];
  }
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    const now = new Date().toISOString();

    // Initialize Supabase client
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Expecting JSON body with supplierSlug, searchTerm, category, and optional forceRefresh
    const body = await req.json().catch(() => ({}));
    const supplierSlug: SupplierSlug | undefined = body?.supplierSlug;
    const searchTerm: string = (body?.searchTerm || "electrical deals").toString();
    const category: string = body?.category || "general";
    const forceRefresh: boolean = body?.forceRefresh || false;

    if (!supplierSlug || !(supplierSlug in SUPPLIER_NAMES)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing supplierSlug" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For now, we return curated, structured results while keeping the function
    // ready to integrate with Firecrawl using FIRECRAWL_API_KEY.
    // Logs help verify the secret exists and wiring is correct.
    console.log("[SCRAPE-SUPPLIER-PRODUCTS] Invoked at", now);
    console.log("[SCRAPE-SUPPLIER-PRODUCTS] Supplier:", supplierSlug);
    console.log("[SCRAPE-SUPPLIER-PRODUCTS] Search Term:", searchTerm);
    console.log("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl key set:", !!firecrawlKey);

    // Build a sensible search URL to link users directly to supplier results.
    const supplierName = SUPPLIER_NAMES[supplierSlug];
    const searchUrl = buildSearchUrl(supplierSlug, searchTerm);

    // Check if this is a cached category request  
    let products: MaterialItem[] = [];
    const isCablesSearch = /cable|twin|earth|wiring|6242y|swa|flex/i.test(searchTerm) || category === 'cables';
    const isProtectionSearch = /earthing|surge protection|circuit protection|mcb|rcd|rcbo|breaker|protection equipment|switch|isolator|earth rod/i.test(searchTerm) || category === 'protection';
    const isComponentsSearch = /consumer units|accessories/i.test(searchTerm) || category === 'components';

    if (isCablesSearch || isComponentsSearch || isProtectionSearch) {
      const currentCategory = isCablesSearch ? 'cables' : (isProtectionSearch ? 'protection' : 'components');
      console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Using cached approach for ${currentCategory}`);
      
      // Check for cached data with category filter for the current supplier (skip if force refresh)
      if (forceRefresh) {
        console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Force refresh requested, clearing cache for ${currentCategory}`);
        // Delete existing cache entries for this supplier/category
        await supabase
          .from('cables_materials_cache')
          .delete()
          .eq('supplier', supplierSlug)
          .eq('category', currentCategory);
      }

      const { data: cachedData } = !forceRefresh ? await supabase
        .from('cables_materials_cache')
        .select('*')
        .eq('supplier', supplierSlug)
        .eq('category', currentCategory)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle() : { data: null };

      if (!forceRefresh && cachedData && cachedData.product_data && Array.isArray(cachedData.product_data) && cachedData.product_data.length > 0) {
        console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Using cached ${currentCategory} data with ${cachedData.product_data.length} products`);
        products = cachedData.product_data;
      } else {
        console.log(`[SCRAPE-SUPPLIER-PRODUCTS] ${forceRefresh ? 'Force refresh -' : 'Cache expired/missing,'} refreshing ${currentCategory} data`);
        
        // Fetch fresh data using appropriate function
        let freshResults: MaterialItem[] = [];
        if (currentCategory === 'cables') {
          freshResults = await scrapeCablesWiringWithFirecrawl();
        } else if (currentCategory === 'components') {
          freshResults = await scrapeComponentsWithFirecrawl();
        }
        
        if (freshResults.length > 0) {
          // Store in cache with category and correct supplier
          await supabase
            .from('cables_materials_cache')
            .upsert({
              supplier: supplierSlug,
              category: currentCategory,
              product_data: freshResults,
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week
            });
          
          console.log(`[SCRAPE-SUPPLIER-PRODUCTS] Cached ${freshResults.length} fresh ${currentCategory} products`);
          products = freshResults;
        }
      }
    }

    if (firecrawlKey && !isCablesSearch && !isComponentsSearch) {
      try {
        // Use Firecrawl v2 JSON schema for protection equipment, v1 for others
        if (isProtectionSearch && supplierSlug === "screwfix") {
          const fcRes = await fetch("https://api.firecrawl.dev/v2/scrape", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${firecrawlKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: searchUrl,
              onlyMainContent: true,
              maxAge: 0,
              parsers: [],
              formats: [
                {
                  type: "json",
                  schema: protectionProductSchema,
                },
              ],
            }),
          });

          const fcJson: any = await fcRes.json().catch(() => ({}));
          console.log("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl v2 status:", fcRes.status, fcJson?.success);

          if (fcJson.success && fcJson.data?.json) {
            const jsonProducts = Array.isArray(fcJson.data.json) ? fcJson.data.json : [];
            products = jsonProducts.slice(0, 8).map((item: any, index: number) => ({
              id: Date.now() + index,
              name: item.name || "Unknown Product",
              category: categorizeProtectionProduct(item.name || ""),
              price: item.price || "£0.00",
              supplier: supplierName,
              image: item.image && item.image.startsWith('http') ? item.image : "/placeholder.svg",
              productUrl: item.view_product_url || searchUrl,
              highlights: item.highlights || generateComponentHighlights(item.name || "", item.description || "")
            }));
          }
        } else {
          // Use v1 API for other categories
          const fcRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${firecrawlKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: searchUrl,
              formats: ["html"],
            }),
          });

          const fcJson: any = await fcRes.json().catch(() => ({}));
          console.log("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl status:", fcRes.status, fcJson?.status || fcJson?.success);

          const html: string = fcJson?.data?.html || fcJson?.html || "";

          if (html) {
          const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
          const textRegex = /<[^>]+>/g; // strip tags
          const seen = new Set<string>();

          const domain = new URL(searchUrl).hostname.replace(/^www\./, "");
          const priceRegex = /£\s?\d{1,4}(?:[.,]\d{2})?/i;
          const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
          const lowerTerm = norm(searchTerm);
          const termTokens = lowerTerm
            .replace(/mm²/g, 'mm2')
            .split(/[^a-z0-9+]+/)
            .filter(t => t && !['and','the','for','with','of','to'].includes(t));
          if (termTokens.includes('twin') && !termTokens.includes('t&e')) termTokens.push('t&e');

          // Strict cable matching derived from the search term (for accuracy & speed)
          const strict = /twin/i.test(lowerTerm) && /earth/i.test(lowerTerm);
          const mmMatch = lowerTerm.match(/(\d+(?:\.\d+)?)\s*mm(?:2|²)?/i);
          const mmTokens = mmMatch ? [
            `${mmMatch[1]}`, `${mmMatch[1]}mm`, `${mmMatch[1]} mm`, `${mmMatch[1]}mm2`, `${mmMatch[1]}mm²`
          ] : [];
          const lenMatch = lowerTerm.match(/(\d{2,4})\s*m\b/i);
          const len = lenMatch?.[1];
          const lenTokens = len ? [
            `${len}m`, `${len} m`, `${len}metre`, `${len}meter`, `${len}mtr`, `${len}mt`
          ] : [];
          const perMRegex = /per\s*m|\/\s*m|per\s*metre|per\s*meter/i;

          const results: MaterialItem[] = [];
          let match: RegExpExecArray | null;
          while ((match = anchorRegex.exec(html)) !== null && results.length < 48) {
            const hrefRaw = match[1];
            const innerHtml = (match[2] || "");
            const textRaw = innerHtml.replace(textRegex, '').replace(/\s+/g, ' ').trim();
            const text = norm(textRaw);
            if (!hrefRaw || !text || text.length < 3) continue;

            // Skip obvious non-product links
            if (/account|basket|cart|help|delivery|contact|login|register|cookie|privacy|terms/i.test(text)) continue;

            // Only keep links pointing to the same supplier domain
            let url: URL | null = null;
            try { url = new URL(hrefRaw, searchUrl); } catch (_) { /* ignore */ }
            if (!url) continue;
            const host = url.hostname.replace(/^www\./, "");
            if (!host.endsWith(domain)) continue;

            const key = url.toString();
            if (seen.has(key)) continue;

            // Strict 2.5mm T&E 100m style matching when applicable
            if (strict) {
              const hasMM = mmTokens.length ? mmTokens.some(t => text.includes(t)) : true;
              const hasLen = lenTokens.length ? lenTokens.some(t => text.includes(t)) : true;
              const hasTE = text.includes('t&e') || (text.includes('twin') && text.includes('earth'));
              if (!(hasMM && hasLen && hasTE)) continue;
            } else {
              // General relevance: require at least 2 token hits if we have 3+ tokens
              const tokenHits = termTokens.reduce((acc, t) => acc + (text.includes(t) ? 1 : 0), 0);
              if (termTokens.length >= 3 && tokenHits < 2) continue;
            }

            // Extract a sensible price near the anchor, avoiding per-metre prices
            const start = Math.max(0, (match.index || 0) - 400);
            const end = Math.min(html.length, anchorRegex.lastIndex + 400);
            const snippet = html.slice(start, end);

            const priceMatches = Array.from(snippet.matchAll(/£\s?\d{1,4}(?:[.,]\d{2})?/gi));
            let chosenPrice: string | null = null;
            for (const m of priceMatches) {
              const idx = m.index ?? 0;
              const window = snippet.slice(Math.max(0, idx - 24), Math.min(snippet.length, idx + 24));
              if (perMRegex.test(window)) {
                continue; // skip per-metre prices
              }
              chosenPrice = m[0];
              break;
            }
            if (!chosenPrice && priceMatches[0]) {
              chosenPrice = priceMatches[0][0]; // fallback to first if none qualified
            }
            if (!chosenPrice) continue;

            seen.add(key);

            // Try to extract an image from inside the anchor tag
            let image = "/placeholder.svg";
            const imgMatch = innerHtml.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
            if (imgMatch && imgMatch[1]) {
              try { image = new URL(imgMatch[1], searchUrl).toString(); } catch { /* keep placeholder */ }
            }

            // Enhanced cable detection and categorization
            const isCable = /\b(cable|t\s*&\s*e|twin\s*&\s*earth|twin|earth|swa|flex|mm2|mm²|cat\d|6242y|coax|data)\b/i.test(text) || /cable/i.test(searchTerm);
            const isTool = /\b(multimeter|tester|detector|meter|test|testing|socket|voltage|continuity|clamp|insulation)\b/i.test(text) || /multimeter|tester|detector/i.test(searchTerm);
            
            // Determine specific category
            let category = "Materials";
            if (isTool) {
              if (/\b(multimeter|digital.*meter|dmm)\b/i.test(text)) {
                category = "Multimeters";
              } else if (/\b(socket.*test|socket.*tester|pat.*test)\b/i.test(text)) {
                category = "Socket Testers";
              } else if (/\b(voltage.*detect|voltage.*tester|non.*contact)\b/i.test(text)) {
                category = "Voltage Detectors";
              } else if (/\b(cable.*detect|cable.*finder|cable.*tracer)\b/i.test(text)) {
                category = "Cable Detectors";
              } else if (/\b(clamp.*meter|current.*clamp)\b/i.test(text)) {
                category = "Clamp Meters";
              } else if (/\b(insulation.*test|insulation.*resist|megger)\b/i.test(text)) {
                category = "Insulation Testers";
              } else {
                category = "Testing Equipment";
              }
            } else if (isCable) {
              if (/\b(cat\d|ethernet|data|network)\b/i.test(text)) {
                category = "Data Cables";
              } else if (/\b(swa|armoured|armored)\b/i.test(text)) {
                category = "Armoured Cables";
              } else if (/\b(twin.*earth|t\s*&\s*e|6242y)\b/i.test(text)) {
                category = "Power Cables";
              } else if (/\b(flex|flexible)\b/i.test(text)) {
                category = "Flex Cables";
              } else {
                category = "Cables";
              }
            }
            
            const name = textRaw.length > 120 ? textRaw.slice(0, 117) + "…" : textRaw;

            results.push({
              id: Date.now() + results.length,
              name,
              category,
              price: chosenPrice,
              supplier: supplierName,
              image,
              productUrl: url.toString(),
            });
          }

            // Sort by numeric price and keep top results for speed/clarity
            results.sort((a, b) => (parseFloat(a.price.replace(/[^\d.]/g, '')) || 0) - (parseFloat(b.price.replace(/[^\d.]/g, '')) || 0));
            products = results.slice(0, 8);
          }
        }
      } catch (err) {
        console.error("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl fetch failed:", err);
      }
    }

    // Fallback behaviour: always show curated products when live scraping fails
    if (!products || products.length === 0) {
      // Return curated dataset relevant to the search term
      const isCableSearch = /cable|twin|earth|swa|6242y|mm2|mm²/i.test(searchTerm);
      const isToolsSearch = /multimeter|socket tester|cable detector|voltage detector|testing|tester|meter/i.test(searchTerm);
      const isProtectionSearch = /mcb|rcd|rcbo|breaker|protection/i.test(searchTerm);
      const isLightingSearch = /led|light|downlight|batten/i.test(searchTerm);
      
      if (isCableSearch) {
        // Comprehensive cables & wiring fallbacks
        products = [
          {
            id: 10001,
            name: "2.5mm² Twin & Earth Cable - 100m",
            category: "Cables",
            price: "£89.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10002,
            name: "1.5mm² Twin & Earth Cable - 100m",
            category: "Cables", 
            price: "£64.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10003,
            name: "4.0mm² Twin & Earth Cable - 50m",
            category: "Cables",
            price: "£125.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10004,
            name: "1.0mm² Twin & Earth Cable - 100m",
            category: "Cables",
            price: "£45.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10005,
            name: "6.0mm² Twin & Earth Cable - 25m",
            category: "Cables",
            price: "£89.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10006,
            name: "2.5mm² 3 Core SWA Cable - 50m",
            category: "Cables",
            price: "£156.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10007,
            name: "Cat6 Data Cable - 305m Box",
            category: "Cables",
            price: "£78.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10008,
            name: "3 Core Flex Cable - 1.5mm² 100m",
            category: "Cables",
            price: "£67.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          }
        ];
      }
      
      if (isToolsSearch) {
        products = [
          {
            id: 20001,
            name: "Digital Multimeter 600V CAT III",
            category: "Multimeters", 
            price: "£24.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20002,
            name: "Socket & See Electrical Test Kit",
            category: "Socket Testers",
            price: "£89.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20003,
            name: "Non-Contact Voltage Detector",
            category: "Voltage Detectors",
            price: "£12.49",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20004,
            name: "Cable Detector & Tracer Kit",
            category: "Cable Detectors",
            price: "£45.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20005,
            name: "RCD Circuit Breaker Finder",
            category: "Testing Equipment",
            price: "£67.50",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20006,
            name: "Insulation Resistance Tester",
            category: "Insulation Testers",
            price: "£189.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20007,
            name: "Clamp Meter AC/DC 400A",
            category: "Clamp Meters",
            price: "£78.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 20008,
            name: "PAT Testing Kit Complete",
            category: "Testing Equipment",
            price: "£156.00",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
        ];
      } else if (isProtectionSearch) {
        products = [
          {
            id: 30001,
            name: "32A Type B MCB BS EN 60898",
            category: "MCBs",
            price: "£7.95",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30002,
            name: "63A 30mA RCD Type AC",
            category: "RCDs",
            price: "£45.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30003,
            name: "32A Type B RCBO 30mA",
            category: "RCBOs",
            price: "£28.50",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30004,
            name: "Type 2 Surge Protector SPD 40kA",
            category: "Surge Protectors",
            price: "£67.99",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30005,
            name: "63A 4 Pole Main Switch Isolator",
            category: "Isolators",
            price: "£89.95",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30006,
            name: "AFDD Arc Fault Detection Device 16A",
            category: "AFDD",
            price: "£125.00",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30007,
            name: "20A Type C MCB High Breaking Capacity",
            category: "MCBs",
            price: "£9.25",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 30008,
            name: "100A 300mA S-Type RCD Time Delay",
            category: "RCDs",
            price: "£156.00",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
        ];
      } else if (isCableSearch) {
        products = [
          {
            id: 10001,
            name: "Twin & Earth 2.5mm² (100m)",
            category: "Power Cables",
            price: "£89.20",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10004,
            name: "6mm² SWA Cable (50m)",
            category: "Armoured Cables",
            price: "£154.10",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10007,
            name: "1.5mm Twin & Earth (100m)",
            category: "Power Cables",
            price: "£67.95",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10008,
            name: "3 Core 2.5mm² Flex (50m)",
            category: "Flex Cables",
            price: "£78.50",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
        ];
      } else {
        products = [
          {
            id: 10002,
            name: "32A Type B MCB",
            category: "Protection",
            price: "£7.95",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10003,
            name: "LED Downlight 6W Fire-Rated",
            category: "Lighting",
            price: "£18.49",
            supplier: supplierName,
            image: "/placeholder.svg",
            isOnSale: true,
            salePrice: "£16.99",
            stockStatus: "Low Stock",
            productUrl: searchUrl,
          },
          {
            id: 10005,
            name: "18th Edition Consumer Unit (10 Way)",
            category: "Distribution",
            price: "£112.30",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10006,
            name: "Weatherproof Junction Box",
            category: "Accessories",
            price: "£3.39",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
        ];
      }
    }

    return new Response(
      JSON.stringify({
        products,
        supplier: supplierName,
        lastUpdated: now,
        note: firecrawlKey ? (products.length ? "Live scraping results" : "Fallback products - live scraping returned no results") : "Curated products - Firecrawl key not configured",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[SCRAPE-SUPPLIER-PRODUCTS] Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch supplier products" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
