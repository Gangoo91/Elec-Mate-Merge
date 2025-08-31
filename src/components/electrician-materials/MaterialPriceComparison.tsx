import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingDown, Crown, ExternalLink, Loader2, AlertCircle } from "lucide-react";
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
}

interface PriceComparisonResult {
  searchTerm: string;
  products: PriceComparisonItem[];
  cheapestPrice: number;
  averagePrice: number;
  priceRange: string;
}

const MaterialPriceComparison = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<PriceComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { category: 'all', supplier: 'all', searchTerm: searchQuery }
      });

      if (error) throw new Error(error.message);

      if (data?.materials && data.materials.length > 0) {
        // Process and normalize the results
        const processedProducts: PriceComparisonItem[] = data.materials.map((item: any) => ({
          ...item,
          numericPrice: extractPrice(item.price)
        }));

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
        setError("No products found for your search. Try different keywords.");
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

      {/* Search Interface */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for materials (e.g., '2.5mm Twin & Earth 100m', 'MCB 32A')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-elec-dark border-elec-yellow/30 text-white"
              />
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
          {/* Summary */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white">
                Search Results for "{comparisonResult.searchTerm}"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Products Found</p>
                  <p className="text-2xl font-bold text-elec-yellow">{comparisonResult.products.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Best Price</p>
                  <p className="text-2xl font-bold text-green-400">{formatPrice(comparisonResult.cheapestPrice)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-2xl font-bold text-white">{comparisonResult.priceRange}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-white text-sm leading-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{product.supplier}</p>
                      </div>
                      {isCheapest && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
                          <Crown className="h-3 w-3 mr-1" />
                          Best Price
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-elec-yellow">{product.price}</span>
                        {savings > 0 && (
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-red-400 text-xs">
                              <TrendingDown className="h-3 w-3" />
                              +{savings}%
                            </div>
                            <p className="text-xs text-muted-foreground">vs best</p>
                          </div>
                        )}
                      </div>

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

                      {product.highlights && product.highlights.length > 0 && (
                        <div className="space-y-1">
                          {product.highlights.slice(0, 2).map((highlight, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground">• {highlight}</p>
                          ))}
                        </div>
                      )}

                      {product.productUrl && (
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black"
                        >
                          <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                            View on {product.supplier}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPriceComparison;