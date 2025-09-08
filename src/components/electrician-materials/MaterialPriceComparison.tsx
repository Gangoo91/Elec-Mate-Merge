import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Search, Star, ExternalLink, ShoppingCart, Filter, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import RefreshButton from "./RefreshButton";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

export interface PriceComparisonItem {
  id: number;
  name: string;
  supplier: string;
  price: string;
  originalPrice?: string;
  isOnSale?: boolean;
  salePrice?: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  image: string;
  category: string;
  highlights?: string[];
  pricePerUnit?: string;
  numericPrice: number;
  priceValue: number;
  originalPriceValue?: number;
  productUrl?: string;
  view_product_url?: string;
  description?: string;
  reviews?: string;
}

interface MaterialPriceComparisonProps {
  onAddToQuote?: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote?: (materials: MaterialToQuoteItem[]) => void;
}

const enrichProductData = (item: any): PriceComparisonItem => {
  const priceStr = item.price || item.salePrice || "£0.00";
  const originalPriceStr = item.originalPrice || item.price;
  
  // Extract numeric price for sorting and calculations
  const priceMatch = priceStr.match(/£?([\d,]+\.?\d*)/);
  const numericPrice = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;
  
  const originalPriceMatch = originalPriceStr?.match(/£?([\d,]+\.?\d*)/);
  const originalPriceValue = originalPriceMatch ? parseFloat(originalPriceMatch[1].replace(/,/g, '')) : numericPrice;

  return {
    id: item.id || Math.random(),
    name: item.name || 'Unknown Product',
    supplier: item.supplier || 'Unknown Supplier',
    price: priceStr,
    originalPrice: item.originalPrice,
    isOnSale: item.isOnSale || false,
    salePrice: item.salePrice,
    stockStatus: item.stockStatus || 'In Stock' as const,
    image: item.image || '/placeholder.svg',
    category: item.category || 'General',
    highlights: item.highlights || [],
    numericPrice,
    priceValue: numericPrice,
    originalPriceValue,
    productUrl: item.productUrl || item.view_product_url,
    description: item.description,
    reviews: item.reviews
  };
};

const defaultMaterials: PriceComparisonItem[] = [
  {
    id: 1,
    name: "2.5mm² Twin & Earth Cable",
    supplier: "Screwfix",
    price: "£89.99",
    stockStatus: "In Stock",
    image: "/placeholder.svg",
    category: "Cables",
    highlights: ["BS 6004 compliant", "100m coil"],
    numericPrice: 89.99,
    priceValue: 89.99
  },
  {
    id: 2,
    name: "MCB 32A Type B",
    supplier: "Toolstation",
    price: "£12.50",
    stockStatus: "In Stock",
    image: "/placeholder.svg",
    category: "Protection",
    highlights: ["BS EN 60898", "10kA breaking capacity"],
    numericPrice: 12.50,
    priceValue: 12.50
  },
  {
    id: 3,
    name: "RCD 63A 30mA",
    supplier: "CEF",
    price: "£45.00",
    stockStatus: "Low Stock",
    image: "/placeholder.svg",
    category: "Protection",
    highlights: ["Type AC", "BS EN 61008"],
    numericPrice: 45.00,
    priceValue: 45.00
  }
];

const MaterialPriceComparison = ({ onAddToQuote, onAddMultipleToQuote }: MaterialPriceComparisonProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMaterials, setFilteredMaterials] = useState<PriceComparisonItem[]>([]);
  const [allMaterials, setAllMaterials] = useState<PriceComparisonItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [showingPreSelected, setShowingPreSelected] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'supplier'>('relevance');
  const [selectedMaterials, setSelectedMaterials] = useState<Set<number>>(new Set());
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasAttemptedAutoRefresh, setHasAttemptedAutoRefresh] = useState(false);

  useEffect(() => {
    // Check cache on component mount and auto-trigger refresh if empty
    const checkCacheAndAutoRefresh = async () => {
      setIsInitializing(true);
      try {
        console.log('🔍 Checking cache on component mount...');
        const { data: cacheEntries, error } = await supabase
          .from('materials_weekly_cache')
          .select('materials_data, created_at')
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false });

        if (!error && cacheEntries && cacheEntries.length > 0) {
          const allMaterials = cacheEntries.flatMap((entry: any) => entry.materials_data || []);
          if (allMaterials.length > 0) {
            console.log(`✅ Found ${allMaterials.length} materials in cache`);
            const enrichedMaterials = allMaterials.map(enrichProductData);
            setAllMaterials(enrichedMaterials);
            setFilteredMaterials(enrichedMaterials.slice(0, 10)); // Show first 10 as samples
            setShowingPreSelected(false);
            setIsInitializing(false);
            return;
          }
        }

        // Cache is empty - auto-trigger refresh if not already attempted
        if (!hasAttemptedAutoRefresh) {
          console.log('⚠️ Cache is empty, triggering auto-refresh...');
          setHasAttemptedAutoRefresh(true);
          
          toast({
            title: "Loading Materials",
            description: "No cached data found. Starting background refresh...",
          });
          
          try {
            await handleAutoRefresh();
          } catch (refreshError) {
            console.error('❌ Auto-refresh failed:', refreshError);
            // Fall back to defaults
            const enrichedDefaults = defaultMaterials.map(enrichProductData);
            setFilteredMaterials(enrichedDefaults);
            setAllMaterials(enrichedDefaults);
          }
        } else {
          // Show defaults if auto-refresh already attempted
          const enrichedDefaults = defaultMaterials.map(enrichProductData);
          setFilteredMaterials(enrichedDefaults);
          setAllMaterials(enrichedDefaults);
        }
      } catch (error) {
        console.error('❌ Error checking cache:', error);
        const enrichedDefaults = defaultMaterials.map(enrichProductData);
        setFilteredMaterials(enrichedDefaults);
        setAllMaterials(enrichedDefaults);
      } finally {
        setIsInitializing(false);
      }
    };

    checkCacheAndAutoRefresh();
  }, [hasAttemptedAutoRefresh]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term to find materials.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('🔍 Starting search:', { searchQuery, selectedCategory, selectedSupplier });
    
    setIsLoading(true);
    setError(null);
    setShowingPreSelected(false);
    
    try {
      // Use the cache-first strategy by directly querying the database
      console.log('📊 Searching materials from cache...');
      const { data: cacheEntries, error } = await supabase
        .from('materials_weekly_cache')
        .select('materials_data')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      console.log('📊 Cache query response:', { cacheEntries, error });

      if (error) {
        console.error('❌ Materials cache error:', error);
        setError(error.message || 'Failed to fetch materials data');
        toast({
          title: "Error",
          description: "Failed to fetch materials from cache. Please try refreshing.",
          variant: "destructive"
        });
        return;
      }

      let allMaterials: any[] = [];
      
      if (cacheEntries && cacheEntries.length > 0) {
        // Combine all materials from different cache entries
        allMaterials = cacheEntries.flatMap((entry: any) => entry.materials_data || []);
        console.log(`✅ Found ${allMaterials.length} materials in cache`);
      }

      if (allMaterials.length === 0) {
        console.log('⚠️ No materials found in cache');
        setFilteredMaterials([]);
        toast({
          title: "No Data",
          description: "No materials found in cache. Try refreshing to load new data.",
        });
        return;
      }

      // Filter materials based on search criteria
      const filteredResults = allMaterials.filter((material: any) => {
        const matchesSearch = material.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             material.description?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || 
                               material.category?.toLowerCase() === selectedCategory.toLowerCase();
        
        const matchesSupplier = selectedSupplier === 'all' || 
                               material.supplier?.toLowerCase() === selectedSupplier.toLowerCase();
        
        return matchesSearch && matchesCategory && matchesSupplier;
      });

      console.log(`✅ Filtered to ${filteredResults.length} materials matching criteria`);
      
      // Process and enrich the results
      const processedProducts: PriceComparisonItem[] = filteredResults.map(enrichProductData);

      // Filter out items with 0 price
      const validProducts = processedProducts.filter(p => p.numericPrice > 0);
      
      setAllMaterials(validProducts);
      setFilteredMaterials(validProducts);
      setHasSearched(true);

      toast({
        title: "Search Complete",
        description: `Found ${validProducts.length} materials matching your search.`,
      });

    } catch (error: any) {
      console.error('❌ Search error:', error);
      setError(error.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "Failed to search materials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoRefresh = async () => {
    try {
      console.log('🔄 Auto-triggering materials cache refresh...');
      
      const { data, error } = await supabase.functions.invoke('materials-cache-updater', {
        body: { refresh: true }
      });

      if (error) {
        console.error('❌ Auto-refresh failed:', error);
        throw error;
      }

      console.log('✅ Auto-refresh triggered successfully:', data);
      
      if (data?.action === 'skipped') {
        toast({
          title: "Cache Already Fresh",
          description: "Materials data is already up to date.",
        });
      } else if (data?.job_id) {
        toast({
          title: "Background Refresh Started",
          description: "Materials are being updated in the background. This may take a few minutes.",
        });
      }

      return data;
    } catch (error) {
      console.error('❌ Auto-refresh error:', error);
      throw error;
    }
  };

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    setHasAttemptedAutoRefresh(false); // Reset so auto-refresh can run again
  };

  const sortedMaterials = useMemo(() => {
    if (!filteredMaterials.length) return filteredMaterials;

    const sorted = [...filteredMaterials].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.numericPrice - b.numericPrice;
        case 'price-high':
          return b.numericPrice - a.numericPrice;
        case 'supplier':
          return a.supplier.localeCompare(b.supplier);
        case 'relevance':
        default:
          // Keep original order for relevance
          return 0;
      }
    });

    return sorted;
  }, [filteredMaterials, sortBy]);

  const categories = useMemo(() => {
    const cats = new Set(allMaterials.map(item => item.category));
    return Array.from(cats).sort();
  }, [allMaterials]);

  const suppliers = useMemo(() => {
    const sups = new Set(allMaterials.map(item => item.supplier));
    return Array.from(sups).sort();
  }, [allMaterials]);

  const handleAddToQuote = (material: PriceComparisonItem, quantity: number = 1) => {
    if (onAddToQuote) {
      const quoteItem: MaterialToQuoteItem = {
        id: material.id,
        name: material.name,
        price: material.price,
        category: material.category,
        supplier: material.supplier,
        stockStatus: material.stockStatus,
        productUrl: material.productUrl,
        highlights: material.highlights
      };
      onAddToQuote(quoteItem, quantity);
      toast({
        title: "Added to Quote",
        description: `${material.name} added to quote`,
      });
    }
  };

  const handleAddMultipleToQuote = () => {
    if (onAddMultipleToQuote && selectedMaterials.size > 0) {
      const materialsToAdd = sortedMaterials
        .filter(material => selectedMaterials.has(material.id))
        .map(material => ({
          id: material.id,
          name: material.name,
          price: material.price,
          category: material.category,
          supplier: material.supplier,
          stockStatus: material.stockStatus,
          productUrl: material.productUrl,
          highlights: material.highlights
        }));
      
      onAddMultipleToQuote(materialsToAdd);
      setSelectedMaterials(new Set());
      toast({
        title: "Added to Quote",
        description: `${materialsToAdd.length} materials added to quote`,
      });
    }
  };

  const toggleMaterialSelection = (materialId: number) => {
    const newSelection = new Set(selectedMaterials);
    if (newSelection.has(materialId)) {
      newSelection.delete(materialId);
    } else {
      newSelection.add(materialId);
    }
    setSelectedMaterials(newSelection);
  };

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case 'In Stock': return 'default';
      case 'Low Stock': return 'destructive';
      case 'Out of Stock': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Material Price Comparison</h2>
            <p className="text-muted-foreground">Compare prices across multiple suppliers</p>
          </div>
          <RefreshButton 
            isFetching={isLoading}
            lastFetchTime={Date.now()}
            onRefresh={handleRefresh}
            categoryId="materials"
            className="ml-auto"
          />
        </div>

        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="flex gap-2">
              <Input
                placeholder="Search materials (e.g., '2.5mm cable', 'MCB 32A')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isLoading} className="px-4">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger>
              <SelectValue placeholder="All Suppliers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              {suppliers.map(sup => (
                <SelectItem key={sup} value={sup}>{sup}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort and Bulk Actions */}
        {hasSearched && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
              
              {onAddMultipleToQuote && selectedMaterials.size > 0 && (
                <Button onClick={handleAddMultipleToQuote} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add {selectedMaterials.size} to Quote
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {sortedMaterials.length} materials found
            </p>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isInitializing && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading materials cache...</span>
          </div>
        </div>
      )}

      {/* Results */}
      {!isInitializing && showingPreSelected && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Popular Materials</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            These are some commonly searched electrical materials. Use the search above to find specific products.
          </p>
        </div>
      )}

      {/* Empty Cache Warning */}
      {!isInitializing && !showingPreSelected && sortedMaterials.length === 0 && !hasSearched && (
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              <div>
                <p className="text-yellow-200 font-medium">Materials cache is being refreshed</p>
                <p className="text-yellow-300/80 text-sm">
                  This usually takes 5-10 minutes. You can search existing data or wait for the refresh to complete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isInitializing && (
        <div className="grid gap-4">
          {sortedMaterials.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Checkbox for bulk selection */}
                  {onAddMultipleToQuote && (
                    <input
                      type="checkbox"
                      checked={selectedMaterials.has(item.id)}
                      onChange={() => toggleMaterialSelection(item.id)}
                      className="mt-1"
                    />
                  )}

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg leading-tight mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.supplier}
                          </Badge>
                          <Badge variant={getStockBadgeVariant(item.stockStatus)} className="text-xs">
                            {item.stockStatus}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        
                        {/* Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.highlights.map((highlight, index) => (
                              <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <div className="text-right">
                          {item.isOnSale && item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {item.originalPrice}
                            </div>
                          )}
                          <div className="text-2xl font-bold text-white">
                            {item.price}
                          </div>
                          {item.pricePerUnit && (
                            <div className="text-xs text-muted-foreground">
                              {item.pricePerUnit}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {item.productUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3"
                              asChild
                            >
                              <a href={item.productUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                          
                          {onAddToQuote && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3"
                              onClick={() => handleAddToQuote(item)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Quote
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isInitializing && !showingPreSelected && sortedMaterials.length === 0 && !isLoading && hasSearched && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No materials found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedSupplier('all');
              const enrichedDefaults = defaultMaterials.map(enrichProductData);
              setFilteredMaterials(enrichedDefaults);
              setAllMaterials(enrichedDefaults);
              setShowingPreSelected(true);
              setHasSearched(false);
            }}>
              Reset Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="text-center py-12">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-white mb-2">Searching materials...</h3>
            <p className="text-muted-foreground">
              Fetching the latest prices from suppliers
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaterialPriceComparison;
