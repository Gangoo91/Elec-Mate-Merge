
import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowLeft, Filter, RefreshCw } from "lucide-react";
import { productsBySupplier, MaterialItem } from "@/data/electrician/productData";
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CATEGORY_META: Record<string, { title: string; description: string } > = {
  cables: {
    title: "Cables & Wiring",
    description: "Twin & Earth, SWA, flex, data and control cabling"
  },
  components: {
    title: "Electrical Components",
    description: "Consumer units, MCBs, RCDs, isolators and accessories"
  },
  protection: {
    title: "Protection Equipment",
    description: "Earthing, surge protection and circuit protection"
  },
  accessories: {
    title: "Installation Accessories",
    description: "Junction boxes, glands, trunking and fixings"
  },
  lighting: {
    title: "Lighting Solutions",
    description: "LED downlights, battens, emergency and controls"
  },
  tools: {
    title: "Electrical Tools",
    description: "Testers, hand tools and power tools for electricians"
  }
};

function matchesCategory(item: MaterialItem, categoryId: string) {
  const hay = `${item.category} ${item.name}`.toLowerCase();
  switch (categoryId) {
    case "cables":
      return /cable|wire|swa|t&e|t\s*&\s*e|flex|cat\d|data|6242y|power\s+cable|armoured|data\s+cable/.test(hay);
    case "components":
      return /consumer|rcd|rcbo|mcb|isolator|breaker|protector|fuse/.test(hay);
    case "protection":
      return /surge|rcd|breaker|earthing|earth|protector|bond|sp\d?d?/.test(hay);
    case "accessories":
      return /junction|gland|trunk|tray|clip|box|plate|socket|switch|backbox/.test(hay);
    case "lighting":
      return /light|led|batten|downlight|lamp|bulb|emergency/.test(hay);
    case "tools":
      return /tester|test|tool|screwdriver|pliers|multimeter|drill/.test(hay);
    default:
      return false;
  }
}

const CategoryMaterials = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const meta = CATEGORY_META[categoryId] || { title: "Materials", description: "Browse curated products by category" };

  // Suppliers supported by the edge function
  const SUPPLIERS = [
    "screwfix",
    "city-electrical-factors", 
    "electricaldirect",
    "toolstation",
  ] as const;

  // Enhanced search terms per category for better results
  const CATEGORY_QUERIES: Record<string, string[]> = {
    cables: [
      "2.5mm twin and earth 100m",
      "6242Y twin earth cable",
      "SWA armoured cable 6mm",
      "3 core flex cable",
      "cat6 ethernet cable",
      "1.5mm twin and earth"
    ],
    components: ["consumer unit", "MCB circuit breaker", "RCD 30mA"],
    protection: ["rcbo", "surge protector", "earth rod"],
    accessories: ["junction box", "weatherproof enclosure", "cable gland"],
    lighting: ["led downlight", "LED batten", "emergency lighting"],
    tools: ["multimeter", "socket tester", "cable detector"],
  };

  const allProducts = useMemo(() => Object.values(productsBySupplier).flat(), []);
  const products = useMemo(() => allProducts.filter((p) => matchesCategory(p, categoryId)), [allProducts, categoryId]);

  type LiveItem = MaterialItem & { productUrl?: string };
  const [liveProducts, setLiveProducts] = useState<LiveItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAutoLoaded, setIsAutoLoaded] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  
  // Cache duration: 30 minutes
  const CACHE_DURATION = 30 * 60 * 1000;
  
  const displayProducts = liveProducts.length > 0 ? liveProducts : products;

  // Enhanced fetch with multiple search terms and caching
  const fetchLiveDeals = async (isAutoLoad = false) => {
    // Check cache first
    const now = Date.now();
    if (isAutoLoad && liveProducts.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Using cached results for', categoryId);
      return;
    }

    setIsFetching(true);
    try {
      const searchTerms = CATEGORY_QUERIES[categoryId] || [meta.title];
      const allCollected: LiveItem[] = [];
      
      // For cables category, use multiple search terms for better coverage
      const termsToUse = categoryId === 'cables' ? searchTerms.slice(0, 3) : [searchTerms[0]];
      
      for (const term of termsToUse) {
        const tasks: Promise<any>[] = [];
        for (const supplier of SUPPLIERS) {
          tasks.push(
            supabase.functions.invoke('scrape-supplier-products', {
              body: { supplierSlug: supplier, searchTerm: term }
            })
          );
        }
        
        const responses = await Promise.allSettled(tasks);
        
        for (const r of responses) {
          if (r.status === 'fulfilled') {
            const d = r.value?.data;
            if (Array.isArray(d?.products)) {
              allCollected.push(...(d.products as LiveItem[]));
            }
          }
        }
      }

      // Enhanced filtering and deduplication
      const inCat = allCollected.filter((p) => matchesCategory(p, categoryId));
      const deduped: LiveItem[] = [];
      const seen = new Set<string>();
      
      for (const item of inCat) {
        const key = item.productUrl || `${item.supplier}|${item.name}`;
        if (key && !seen.has(key)) {
          seen.add(key);
          deduped.push(item);
        }
      }

      // Sort by relevance for cables (T&E and common sizes first)
      if (categoryId === 'cables') {
        deduped.sort((a, b) => {
          const aRelevance = getCableRelevanceScore(a.name);
          const bRelevance = getCableRelevanceScore(b.name);
          return bRelevance - aRelevance;
        });
      }

      setLiveProducts(deduped);
      setLastFetchTime(now);
      setIsAutoLoaded(true);
      
      if (!isAutoLoad) {
        toast({ 
          title: 'Live deals updated', 
          description: `Found ${deduped.length} products from ${termsToUse.length} search${termsToUse.length > 1 ? 'es' : ''}` 
        });
      }
    } catch (e) {
      console.error('Failed to fetch live deals:', e);
      if (!isAutoLoad) {
        toast({ title: 'Failed to fetch', description: 'Please try again later.', variant: 'destructive' });
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Cable relevance scoring for better sorting
  const getCableRelevanceScore = (name: string): number => {
    const nameLower = name.toLowerCase();
    let score = 0;
    
    // Prioritize common electrical cable types
    if (nameLower.includes('twin') && nameLower.includes('earth')) score += 10;
    if (nameLower.includes('6242y')) score += 8;
    if (nameLower.includes('2.5mm')) score += 6;
    if (nameLower.includes('1.5mm')) score += 5;
    if (nameLower.includes('4mm')) score += 4;
    if (nameLower.includes('swa')) score += 7;
    if (nameLower.includes('100m')) score += 3;
    if (nameLower.includes('50m')) score += 2;
    
    return score;
  };

  // Manual refresh handler for button
  const handleManualRefresh = () => {
    fetchLiveDeals(false);
  };

  // Auto-load live deals for cables category
  useEffect(() => {
    if (categoryId === 'cables' && !isAutoLoaded && !isFetching) {
      console.log('Auto-loading live cable deals...');
      fetchLiveDeals(true);
    }
  }, [categoryId, isAutoLoaded, isFetching]);

  const pageTitle = `${meta.title} | ElecMate Electrical Materials`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant guidance.`.slice(0, 160);

  return (
    <main className="space-y-6 animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            {meta.title}
          </h1>
          <p className="text-muted-foreground mt-1">{meta.description}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/electrician/materials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <Link to="/electrician/trade-essentials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Trade Essentials
            </Button>
          </Link>
          <Button variant="outline" onClick={handleManualRefresh} disabled={isFetching} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Fetching…' : 'Fetch Live Deals'}
          </Button>
        </div>
      </header>

      <section aria-labelledby="filters" className="hidden">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Additional filters coming soon
        </div>
      </section>

      {/* Auto-loading indicator for cables */}
      {categoryId === 'cables' && isFetching && !isAutoLoaded && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <RefreshCw className="h-5 w-5 animate-spin text-elec-yellow" />
              <p className="text-elec-yellow font-medium">Loading live cable deals...</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Fetching real-time prices from electrical suppliers
            </p>
          </CardContent>
        </Card>
      )}

      {displayProducts.length === 0 && !isFetching ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {categoryId === 'cables' ? 
                'No cable products found. Try refreshing to get the latest deals.' : 
                'No products found in this category yet. Showing curated items soon.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <section aria-label={`${meta.title} products`} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryMaterials;
