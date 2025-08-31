import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingDown, Crown, ExternalLink, Loader2, AlertCircle, Filter, Star, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PriceComparisonItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
  highlights?: string[];
  numericPrice: number;
  rating?: number;
  deliveryInfo?: string;
  originalPrice?: string;
  discount?: string;
}

interface PriceComparisonResult {
  searchTerm: string;
  products: PriceComparisonItem[];
  cheapestPrice: number;
  averagePrice: number;
  priceRange: string;
}

// Common electrical product suggestions for autocomplete
const COMMON_PRODUCTS = [
  "Twin & Earth Cable 2.5mm", "Twin & Earth Cable 1.5mm", "SWA Cable 4mm", "SWA Cable 2.5mm",
  "MCB 32A", "MCB 20A", "MCB 16A", "MCB 6A", "RCD 30mA", "RCD 100mA",
  "Consumer Unit 10 Way", "Consumer Unit 18 Way", "Isolator Switch", "Circuit Breaker",
  "LED Downlight 6W", "LED Downlight 9W", "Emergency Light", "Batten Light 4ft",
  "Cable Clips", "Cable Gland 20mm", "Conduit 20mm", "Trunking 50x50",
  "Junction Box", "Weatherproof Box", "Socket Outlet", "Light Switch"
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "cables", label: "Cables" },
  { value: "components", label: "Components" },
  { value: "lighting", label: "Lighting" },
  { value: "protection", label: "Protection" },
  { value: "accessories", label: "Accessories" }
];

const SUPPLIERS = [
  { value: "all", label: "All Suppliers" },
  { value: "screwfix", label: "Screwfix" },
  { value: "cef", label: "CEF" },
  { value: "rs", label: "RS Components" },
  { value: "toolstation", label: "Toolstation" }
];

const MaterialPriceComparison = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<PriceComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const extractPrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[£,]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const formatPrice = (price: number): string => {
    return `£${price.toFixed(2)}`;
  };

  const calculateSavings = (currentPrice: number, cheapestPrice: number): number => {
    if (cheapestPrice === 0) return 0;
    return Math.round(((currentPrice - cheapestPrice) / cheapestPrice) * 100);
  };

  // Handle search input with autocomplete
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 1) {
      const filtered = COMMON_PRODUCTS.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  // Enhanced product processing with supplier-specific data enrichment
  const enrichProductData = (product: any): PriceComparisonItem => {
    const supplierData = {
      'Screwfix': { rating: 4.6, deliveryInfo: 'Click & Collect' },
      'CEF': { rating: 4.8, deliveryInfo: 'Trade Counter' },
      'RS Components': { rating: 4.7, deliveryInfo: 'Next Day' },
      'Toolstation': { rating: 4.5, deliveryInfo: 'In Store' }
    };

    const enrichment = supplierData[product.supplier as keyof typeof supplierData] || 
                     { rating: 4.4, deliveryInfo: 'Standard' };

    return {
      ...product,
      numericPrice: extractPrice(product.price),
      rating: enrichment.rating,
      deliveryInfo: enrichment.deliveryInfo
    };
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { 
          category: selectedCategory === 'all' ? 'all' : selectedCategory, 
          supplier: selectedSupplier === 'all' ? 'all' : selectedSupplier, 
          searchTerm: searchQuery 
        }
      });

      if (error) throw new Error(error.message);

      if (data?.materials && data.materials.length > 0) {
        // Process and enrich the results
        const processedProducts: PriceComparisonItem[] = data.materials.map(enrichProductData);

        // Filter out items with 0 price and sort by price
        const validProducts = processedProducts.filter(p => p.numericPrice > 0);
        const sortedProducts = validProducts.sort((a, b) => a.numericPrice - b.numericPrice);

        const prices = sortedProducts.map(p => p.numericPrice);
        const cheapestPrice = Math.min(...prices);
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

        setComparisonResult({
          searchTerm: searchQuery,
          products: sortedProducts,
          cheapestPrice,
          averagePrice,
          priceRange
        });
      } else {
        setError("No products found for your search. Try different keywords or adjust filters.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch price comparison data");
      toast({
        title: "Search failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Material Price Comparison</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare prices across multiple suppliers to find the best deals on electrical materials
        </p>
      </div>

      {/* Enhanced Search Interface */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Main Search Input */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search for materials (e.g., '2.5mm Twin & Earth 100m', 'MCB 32A')"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 bg-elec-dark border-elec-yellow/30 text-white"
                />
                
                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-elec-dark border border-elec-yellow/30 rounded-md z-10 shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        className="w-full px-3 py-2 text-left text-white hover:bg-elec-yellow/20 first:rounded-t-md last:rounded-b-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Compare Prices"
                )}
              </Button>
            </div>

            {/* Advanced Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-elec-dark border-elec-yellow/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/30">
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value} className="text-white focus:bg-elec-yellow/20">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger className="w-40 bg-elec-dark border-elec-yellow/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/30">
                  {SUPPLIERS.map(sup => (
                    <SelectItem key={sup.value} value={sup.value} className="text-white focus:bg-elec-yellow/20">
                      {sup.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {comparisonResult && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSearch}
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {comparisonResult && (
        <div className="space-y-6">
          {/* Enhanced Summary */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">
                    Search Results for "{comparisonResult.searchTerm}"
                  </CardTitle>
                  <p className="text-sm text-elec-yellow">
                    {selectedCategory !== 'all' && `${CATEGORIES.find(c => c.value === selectedCategory)?.label} • `}
                    {selectedSupplier !== 'all' && `${SUPPLIERS.find(s => s.value === selectedSupplier)?.label} • `}
                    Live pricing
                  </p>
                </div>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                  Updated now
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Products Found</p>
                  <p className="text-2xl font-bold text-elec-yellow">{comparisonResult.products.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Best Price</p>
                  <p className="text-2xl font-bold text-green-400">{formatPrice(comparisonResult.cheapestPrice)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Average Price</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(comparisonResult.averagePrice)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-lg font-bold text-white">{comparisonResult.priceRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Product Comparison */}
          <div className="space-y-4">
            {comparisonResult.products.map((product, index) => {
              const isCheapest = product.numericPrice === comparisonResult.cheapestPrice;
              const savings = calculateSavings(product.numericPrice, comparisonResult.cheapestPrice);
              
              return (
                <Card 
                  key={product.id} 
                  className={`border transition-all hover:shadow-lg ${
                    isCheapest 
                      ? 'border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20' 
                      : 'border-elec-yellow/20 bg-elec-gray'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white text-sm">{product.supplier}</span>
                            {isCheapest && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                Best Price
                              </Badge>
                            )}
                          </div>
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-amber-400 fill-current" />
                              <span className="text-xs text-muted-foreground">{product.rating}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              product.stockStatus === 'In Stock' 
                                ? 'border-green-500/30 text-green-400' 
                                : product.stockStatus === 'Low Stock'
                                ? 'border-yellow-500/30 text-yellow-400'
                                : 'border-red-500/30 text-red-400'
                            }`}
                          >
                            {product.stockStatus}
                          </Badge>
                          {product.deliveryInfo && (
                            <span className="text-xs text-muted-foreground">{product.deliveryInfo}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {product.originalPrice && (
                            <>
                              <span className="text-sm line-through text-muted-foreground">
                                {product.originalPrice}
                              </span>
                              <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                                -{product.discount}
                              </Badge>
                            </>
                          )}
                          <div className="text-right">
                            <span className="text-xl font-bold text-elec-yellow">{product.price}</span>
                            {savings > 0 && (
                              <div className="flex items-center gap-1 text-red-400 text-xs">
                                <TrendingDown className="h-3 w-3" />
                                +{savings}% vs best
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {product.productUrl && (
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm" 
                            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black"
                          >
                            <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {product.highlights && product.highlights.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                        <div className="grid grid-cols-2 gap-2">
                          {product.highlights.slice(0, 4).map((highlight, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground">• {highlight}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trade Tips */}
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-4">
              <p className="text-sm text-blue-300">
                💡 <strong>Trade Tips:</strong> Prices include VAT where applicable. Check delivery costs and 
                availability before ordering. Trade account discounts may apply. Consider bulk pricing for larger projects.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MaterialPriceComparison;