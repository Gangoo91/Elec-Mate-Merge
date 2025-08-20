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

            const isCable = /\b(cable|t\s*&\s*e|twin\s*&\s*earth|twin|earth|swa|flex|mm2|mm²|cat\d)\b/i.test(text) || /cable/i.test(searchTerm);
            const name = textRaw.length > 120 ? textRaw.slice(0, 117) + "…" : textRaw;

            results.push({
              id: Date.now() + results.length,
              name,
              category: isCable ? "Cables" : "Materials",
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
      } catch (err) {
        console.error("[SCRAPE-SUPPLIER-PRODUCTS] Firecrawl fetch failed:", err);
      }
    }

    // Fallback behaviour
    if (!products || products.length === 0) {
      if (firecrawlKey) {
        // When Firecrawl is configured but yielded no items, return empty to avoid misleading prices
        products = [];
      } else {
        // No Firecrawl key: return curated dataset
        products = [
          {
            id: 10001,
            name: "Twin & Earth 2.5mm² (100m)",
            category: "Cables",
            price: "£89.20",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
          {
            id: 10004,
            name: "6mm² SWA Cable (50m)",
            category: "Cables",
            price: "£154.10",
            supplier: supplierName,
            image: "/placeholder.svg",
            stockStatus: "In Stock",
            productUrl: searchUrl,
          },
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
        note: firecrawlKey ? (products.length ? "Live scraping results" : "Live scraping returned no products") : "Firecrawl key missing - returning curated results",
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
