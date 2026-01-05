import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SearchInterface } from "./price-comparison/SearchInterface";
import { ProductCard, PriceComparisonItem } from "./price-comparison/ProductCard";
import { PriceStats, PriceComparisonResult } from "./price-comparison/PriceStats";

interface MaterialPriceComparisonProps {
  initialQuery?: string;
  selectedItems?: any[];
  onClearSelection?: () => void;
  onAddToQuote?: (material: any, quantity?: number) => void;
}

const MaterialPriceComparison = ({ 
  initialQuery = "", 
  selectedItems = [], 
  onClearSelection, 
  onAddToQuote
}: MaterialPriceComparisonProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term to find materials.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('🔍 Starting search:', { searchQuery });
    
    setIsLoading(true);
    setError(null);
    
    try {
      toast({
        title: "Searching materials...",
        description: "Fetching latest prices from Screwfix...",
      });

      const { data, error } = await supabase.functions.invoke('simple-materials-scraper', {
        body: {}
      });

      console.log('✅ Scraper response:', { data, error });

      if (error) {
        console.error('❌ Scraper error:', error);
        throw new Error(error.message);
      }

      if (data?.materials && data.materials.length > 0) {
        console.log(`✅ Found ${data.materials.length} materials`);
        
        // Filter by search query
        const searchLower = searchQuery.toLowerCase();
        const filteredProducts = data.materials.filter((material: any) => {
          const nameMatch = material.name?.toLowerCase().includes(searchLower);
          const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
          return nameMatch && categoryMatch;
        });

        if (filteredProducts.length === 0) {
          setError("No products found for your search. Try different keywords.");
          return;
        }

        const processedProducts: PriceComparisonItem[] = filteredProducts.map((material: any, index: number) => ({
          id: material.id || index,
          name: material.name,
          category: material.category,
          price: material.price,
          supplier: material.supplier,
          image: material.image,
          stockStatus: material.stockStatus || 'In Stock',
          productUrl: material.productUrl,
          numericPrice: extractPrice(material.price),
          rating: 4.5,
          deliveryInfo: 'Click & Collect'
        }));

        const sortedProducts = processedProducts.sort((a, b) => a.numericPrice - b.numericPrice);
        const prices = sortedProducts.map(p => p.numericPrice).filter(p => p > 0);
        
        if (prices.length === 0) {
          setError("No valid prices found.");
          return;
        }

        const cheapestPrice = Math.min(...prices);
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

        const result: PriceComparisonResult = {
          searchTerm: searchQuery,
          products: sortedProducts,
          cheapestPrice,
          averagePrice,
          priceRange
        };

        setComparisonResult(result);
        toast({
          title: "Search Complete",
          description: `Found ${sortedProducts.length} products`,
        });
      } else {
        setError("No products found. Try again later.");
      }
    } catch (err: any) {
      console.error('❌ Search failed:', err);
      setError(err.message || "Failed to fetch materials");
      toast({
        title: "Search Failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSelection = () => {
    setComparisonResult(null);
    setSearchQuery("");
    if (onClearSelection) {
      onClearSelection();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Material Price Comparison</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare prices from Screwfix on electrical materials
        </p>
      </div>

      <SearchInterface
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSupplier={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
        onSearch={handleSearch}
        isLoading={isLoading}
        onClearSelection={handleClearSelection}
        showingPreSelected={false}
      />

      {error && (
        <Card className="p-6 border-red-500/20 bg-red-500/10">
          <p className="text-red-400 text-center">{error}</p>
        </Card>
      )}

      {comparisonResult && (
        <div className="space-y-6">
          <PriceStats result={comparisonResult} />

          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {comparisonResult.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cheapestPrice={comparisonResult.cheapestPrice}
                onAddToQuote={onAddToQuote}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPriceComparison;
