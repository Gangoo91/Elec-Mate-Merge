import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

type SupplierSlug = "screwfix" | "city-electrical-factors" | "electricaldirect" | "toolstation";

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
  "city-electrical-factors": "City Electrical Factors",
  "electricaldirect": "ElectricalDirect",
  "toolstation": "Toolstation",
};

function buildSearchUrl(slug: SupplierSlug, query: string) {
  const q = encodeURIComponent(query);
  switch (slug) {
    case "screwfix":
      return `https://www.screwfix.com/search?search=${q}`;
    case "city-electrical-factors":
      return `https://www.cef.co.uk/search?q=${q}`;
    case "electricaldirect":
      // ElectricalDirect prefers `query` param – using `q` can yield Netlify 404s
      return `https://www.electricaldirect.co.uk/search?query=${q}`;
    case "toolstation":
      return `https://www.toolstation.com/search?q=${q}`;
    default:
      return "#";
  }
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    const now = new Date().toISOString();

    // Expecting JSON body with supplierSlug and optional searchTerm
    const body = await req.json().catch(() => ({}));
    const supplierSlug: SupplierSlug | undefined = body?.supplierSlug;
    const searchTerm: string = (body?.searchTerm || "electrical deals").toString();

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

    // Attempt live scraping with Firecrawl if API key is configured
    let products: MaterialItem[] = [];

    if (firecrawlKey) {
      try {
        const fcRes = await fetch("https://api.firecrawl.dev/v1/crawl", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${firecrawlKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: searchUrl,
            limit: 1,
            scrapeOptions: { formats: ["html"] },
          }),
        });

        const fcJson: any = await fcRes.json().catch(() => ({}));
        console.log("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl status:", fcRes.status, fcJson?.status);

        const html: string = fcJson?.data?.[0]?.html || fcJson?.html || "";

        if (html) {
          const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
          const textRegex = /<[^>]+>/g; // strip tags
          const seen = new Set<string>();

          const domain = new URL(searchUrl).hostname.replace(/^www\./, "");
          const likelyPrice = /£\s?\d+[\d,.]*/i;
          const results: MaterialItem[] = [];
          let match: RegExpExecArray | null;
          while ((match = anchorRegex.exec(html)) !== null && results.length < 48) {
            const hrefRaw = match[1];
            let text = (match[2] || "").replace(textRegex, "").replace(/\s+/g, " ").trim();
            if (!hrefRaw || !text || text.length < 3) continue;

            // Only keep links pointing to the same supplier domain
            let url: URL | null = null;
            try {
              url = new URL(hrefRaw, searchUrl);
            } catch (_) { /* ignore */ }
            if (!url) continue;
            const host = url.hostname.replace(/^www\./, "");
            if (!host.endsWith(domain)) continue;

            const key = url.toString();
            if (seen.has(key)) continue;
            seen.add(key);

            const isCable = /cable|t\s*&\s*e|twin\s*&\s*earth|swa|flex|armoured|mm²|mm2|cat\d/i.test(text) || /cable/i.test(searchTerm);
            const name = text.length > 120 ? text.slice(0, 117) + "…" : text;

            results.push({
              id: Date.now() + results.length,
              name,
              category: isCable ? "Cables" : "Materials",
              price: (text.match(likelyPrice)?.[0] ?? "£—"),
              supplier: supplierName,
              image: "placeholder.svg",
              productUrl: url.toString(),
            });
          }

          products = results;
        }
      } catch (err) {
        console.error("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl fetch failed:", err);
      }
    }

    // Fallback curated dataset if scraping produced no items
    if (!products || products.length === 0) {
      products = [
        {
          id: 10001,
          name: "Twin & Earth 2.5mm² (100m)",
          category: "Cables",
          price: "£89.20",
          supplier: supplierName,
          image: "placeholder.svg",
          stockStatus: "In Stock",
          productUrl: searchUrl,
        },
        {
          id: 10004,
          name: "6mm² SWA Cable (50m)",
          category: "Cables",
          price: "£154.10",
          supplier: supplierName,
          image: "placeholder.svg",
          stockStatus: "In Stock",
          productUrl: searchUrl,
        },
        {
          id: 10002,
          name: "32A Type B MCB",
          category: "Protection",
          price: "£7.95",
          supplier: supplierName,
          image: "placeholder.svg",
          stockStatus: "In Stock",
          productUrl: searchUrl,
        },
        {
          id: 10003,
          name: "LED Downlight 6W Fire-Rated",
          category: "Lighting",
          price: "£18.49",
          supplier: supplierName,
          image: "placeholder.svg",
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
          image: "placeholder.svg",
          stockStatus: "In Stock",
          productUrl: searchUrl,
        },
        {
          id: 10006,
          name: "Weatherproof Junction Box",
          category: "Accessories",
          price: "£3.39",
          supplier: supplierName,
          image: "placeholder.svg",
          stockStatus: "In Stock",
          productUrl: searchUrl,
        },
      ];
    }

    return new Response(
      JSON.stringify({
        products,
        supplier: supplierName,
        lastUpdated: now,
        note: firecrawlKey ? "Live scraping attempted" : "Firecrawl key missing - returning curated results",
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
