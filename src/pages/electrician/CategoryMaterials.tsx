
import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      return /cable|wire|swa|t&e|t\s*&\s*e|flex|cat\d|data|6242y|power\s+cable|armoured|data\s+cable|twin.*earth|earth.*cable|power.*cable|armour|flex.*cable/.test(hay);
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
      "cables wiring" // Single comprehensive search for cables since we use database cache
    ],
    components: [
      "consumer units, MCBs, RCDs, isolators, accessories" // Single comprehensive search for components
    ],
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
  const [hasAttemptedLiveFetch, setHasAttemptedLiveFetch] = useState(false);
  const [liveFetchFailed, setLiveFetchFailed] = useState(false);
  const [dataSource, setDataSource] = useState<'live' | 'static' | 'none'>('none');
  
  // Cable type filter state
  const [selectedCableTypes, setSelectedCableTypes] = useState<string[]>([]);
  
  // Cache duration and freshness checking
  const CACHE_DURATION = categoryId === 'cables' ? 0 : 30 * 60 * 1000; // No frontend cache for cables
  
  // Check if live data is fresh
  const isLiveDataFresh = useMemo(() => {
    if (!hasAttemptedLiveFetch) return false;
    const now = Date.now();
    return (now - lastFetchTime) < CACHE_DURATION;
  }, [hasAttemptedLiveFetch, lastFetchTime, CACHE_DURATION]);
  
  // Check if we have valid live data
  const hasValidLiveData = useMemo(() => {
    return hasAttemptedLiveFetch && !liveFetchFailed && liveProducts.length > 0;
  }, [hasAttemptedLiveFetch, liveFetchFailed, liveProducts.length]);
  
  // Cable type detection function
  const getCableType = (itemName: string): string[] => {
    const name = itemName.toLowerCase();
    const types: string[] = [];
    
    if (name.includes('twin') && name.includes('earth') || name.includes('t&e') || name.includes('6242y')) {
      types.push('Twin & Earth');
    }
    if (name.includes('swa') || name.includes('armour')) {
      types.push('SWA');
    }
    if (name.includes('flex') && !name.includes('flexible')) {
      types.push('Flex');
    }
    if (name.includes('data') || name.includes('cat') || name.includes('ethernet') || name.includes('coax')) {
      types.push('Data');
    }
    if (name.includes('control') || name.includes('alarm') || name.includes('fire')) {
      types.push('Control');
    }
    
    return types;
  };
  
  // Smart product selection: only show live data, no static fallback
  const baseProducts = useMemo(() => {
    // If we have valid and fresh live data, use it
    if (hasValidLiveData && (categoryId === 'cables' || isLiveDataFresh)) {
      setDataSource('live');
      return liveProducts;
    }
    
    // Don't show static data - only show live data or nothing
    setDataSource('none');
    return [];
  }, [hasValidLiveData, isLiveDataFresh, categoryId, liveProducts]);
  const displayProducts = useMemo(() => {
    if (categoryId !== 'cables' || selectedCableTypes.length === 0) {
      return baseProducts;
    }
    
    return baseProducts.filter(product => {
      const cableTypes = getCableType(product.name);
      return selectedCableTypes.some(selectedType => cableTypes.includes(selectedType));
    });
  }, [baseProducts, selectedCableTypes, categoryId]);

  // Enhanced fetch with better error handling and state management
  const fetchLiveDeals = async (isAutoLoad = false) => {
    // Check cache first for non-cables categories
    const now = Date.now();
    if (isAutoLoad && hasValidLiveData && isLiveDataFresh) {
      console.log('Using fresh cached results for', categoryId);
      return;
    }

    setIsFetching(true);
    setLiveFetchFailed(false);
    
    try {
      const searchTerms = CATEGORY_QUERIES[categoryId] || [meta.title];
      const allCollected: LiveItem[] = [];
      
      // Reduce redundant calls to minimize duplicates from fallback products
      const termsToUse = categoryId === 'cables' ? searchTerms.slice(0, 2) : [searchTerms[0]];
      
      for (const term of termsToUse) {
        const tasks: Promise<any>[] = [];
        for (const supplier of SUPPLIERS) {
          tasks.push(
            supabase.functions.invoke('scrape-supplier-products', {
              body: { supplierSlug: supplier, searchTerm: term, category: categoryId }
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
        // For fallback products (identified by placeholder image or specific price patterns),
        // deduplicate by name and price to avoid supplier duplicates
        const isFallbackProduct = item.image?.includes('placeholder') || 
                                  item.productUrl?.includes('search') ||
                                  item.name?.includes('Twin & Earth') ||
                                  item.name?.includes('SWA Cable');
        
        const key = isFallbackProduct 
          ? `${item.name}|${item.price}` 
          : item.productUrl || `${item.supplier}|${item.name}`;
          
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
      setHasAttemptedLiveFetch(true);
      setLiveFetchFailed(false);
      
      if (!isAutoLoad) {
        toast({ 
          title: 'Live deals updated', 
          description: `Found ${deduped.length} products from ${termsToUse.length} search${termsToUse.length > 1 ? 'es' : ''}` 
        });
      }
    } catch (e) {
      console.error('Failed to fetch live deals:', e);
      setLiveFetchFailed(true);
      setHasAttemptedLiveFetch(true);
      
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

  // Auto-load live deals for cables and components categories
  useEffect(() => {
    if ((categoryId === 'cables' || categoryId === 'components') && !isAutoLoaded && !isFetching) {
      console.log(`Auto-loading live ${categoryId} deals...`);
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

      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <Link to="/electrician/materials">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs sm:text-sm h-10">
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to Sections
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            {meta.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 text-left pl-8 sm:pl-10">{meta.description}</p>
        </div>
      </header>

      {/* Cable type filters for cables category */}
      {categoryId === 'cables' && (
        <section aria-labelledby="cable-filters" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filter by cable type
            </div>
            <Button variant="outline" size="sm" onClick={handleManualRefresh} disabled={isFetching} className="flex items-center gap-1.5 text-xs sm:text-sm">
              <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">{isFetching ? 'Fetching…' : 'Fetch Live Deals'}</span>
              <span className="xs:hidden">Refresh Deals</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Twin & Earth', 'SWA', 'Flex', 'Data', 'Control'].map((cableType) => {
              const isSelected = selectedCableTypes.includes(cableType);
              return (
                <Badge
                  key={cableType}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-elec-yellow text-elec-black hover:bg-elec-yellow/90' 
                      : 'hover:bg-elec-yellow/10 hover:border-elec-yellow/30'
                  }`}
                  onClick={() => {
                    setSelectedCableTypes(prev => 
                      isSelected 
                        ? prev.filter(t => t !== cableType)
                        : [...prev, cableType]
                    );
                  }}
                >
                  {cableType}
                </Badge>
              );
            })}
            {selectedCableTypes.length > 0 && (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive border-destructive/30 text-destructive"
                onClick={() => setSelectedCableTypes([])}
              >
                Clear all
              </Badge>
            )}
          </div>
          {selectedCableTypes.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Showing {displayProducts.length} products for: {selectedCableTypes.join(', ')}
            </p>
          )}
        </section>
      )}

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
          <CardContent className="p-6 text-center space-y-3">
            <p className="text-muted-foreground">
              {!hasAttemptedLiveFetch ? 
                'Loading live products...' :
                liveFetchFailed ?
                'Failed to fetch live products. Please try refreshing.' :
                'No live products found for this category.'
              }
            </p>
            {hasAttemptedLiveFetch && !liveFetchFailed && (
              <p className="text-sm text-muted-foreground">
                Try using the "Fetch Live Deals" button to get updated products.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <section aria-label={`${meta.title} products`} className="space-y-4">
          {/* Data source indicator */}
          {dataSource !== 'none' && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                📡 Live data • Updated {new Date(lastFetchTime).toLocaleTimeString()}
              </span>
              {dataSource === 'live' && !isLiveDataFresh && categoryId !== 'cables' && (
                <span className="text-yellow-600">• Data may be stale</span>
              )}
            </div>
          )}
          
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
