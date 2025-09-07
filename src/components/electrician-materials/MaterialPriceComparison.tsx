import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Calculator, History, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import BulkPricingCalculator from "./BulkPricingCalculator";
import PriceHistoryAlerts from "./PriceHistoryAlerts";
import { SearchInterface } from "./price-comparison/SearchInterface";
import { ProductCard, PriceComparisonItem } from "./price-comparison/ProductCard";
import { AIInsightsComponent, AIInsights } from "./price-comparison/AIInsights";
import { PriceStats, PriceComparisonResult } from "./price-comparison/PriceStats";

interface MaterialPriceComparisonProps {
  initialQuery?: string;
  selectedItems?: any[];
  onClearSelection?: () => void;
  onAddToQuote?: (material: any, quantity?: number) => void;
  onAddMultipleToQuote?: (materials: any[]) => void;
}

const MaterialPriceComparison = ({ 
  initialQuery = "", 
  selectedItems = [], 
  onClearSelection, 
  onAddToQuote, 
  onAddMultipleToQuote 
}: MaterialPriceComparisonProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<PriceComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'comparison' | 'bulk' | 'history'>('comparison');
  const [selectedProductForAnalysis, setSelectedProductForAnalysis] = useState<PriceComparisonItem | null>(null);
  const [showingPreSelected, setShowingPreSelected] = useState(false);

  // Helper functions
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

  // Process selected items from the category page
  const processSelectedItems = (items: any[]): PriceComparisonResult | null => {
    if (!items || items.length === 0) return null;

    const processedProducts: PriceComparisonItem[] = items.map((item, index) => ({
      id: item.id || index,
      name: item.name || 'Unknown Product',
      category: item.category || 'Materials',
      price: item.price || '£0.00',
      supplier: item.supplier || 'Unknown',
      image: item.image || '/placeholder.svg',
      stockStatus: item.stockStatus || 'In Stock',
      productUrl: item.productUrl,
      highlights: item.highlights || [],
      numericPrice: extractPrice(item.price || '£0.00'),
      rating: 4.5,
      deliveryInfo: 'Standard'
    }));

    // Filter out items with 0 price and sort by price
    const validProducts = processedProducts.filter(p => p.numericPrice > 0);
    const sortedProducts = validProducts.sort((a, b) => a.numericPrice - b.numericPrice);

    if (sortedProducts.length === 0) return null;

    const prices = sortedProducts.map(p => p.numericPrice);
    const cheapestPrice = Math.min(...prices);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

    return {
      searchTerm: `Selected Items (${items.length})`,
      products: sortedProducts,
      cheapestPrice,
      averagePrice,
      priceRange
    };
  };

  // Enhanced product processing with supplier-specific data enrichment and spec extraction
  const enrichProductData = (product: any): PriceComparisonItem => {
    const supplierData = {
      'Screwfix': { rating: 4.6, deliveryInfo: 'Click & Collect' },
      'CEF': { rating: 4.8, deliveryInfo: 'Trade Counter' },
      'RS Components': { rating: 4.7, deliveryInfo: 'Next Day' },
      'Toolstation': { rating: 4.5, deliveryInfo: 'In Store' }
    };

    const enrichment = supplierData[product.supplier as keyof typeof supplierData] || 
                     { rating: 4.4, deliveryInfo: 'Standard' };

    // Extract specifications from product name
    const extractSpecs = (name: string) => {
      const specs: any = {};
      
      // Extract length (e.g., "100m", "50m", "25 metre")
      const lengthMatch = name.match(/(\d+(?:\.\d+)?)\s*(?:m|metre|meter)(?!\w)/i);
      if (lengthMatch) {
        specs.length = lengthMatch[1] + 'm';
      }
      
      // Extract cable size (e.g., "6mm", "2.5mm²", "4.0mm²")
      const sizeMatch = name.match(/(\d+(?:\.\d+)?)\s*mm[²²]?/i);
      if (sizeMatch) {
        specs.cableSize = sizeMatch[0];
      }
      
      // Extract core count (e.g., "3 Core", "2-Core", "3+E")
      const coreMatch = name.match(/(\d+)(?:\s*[-+]\s*\w+)?\s*core/i) || name.match(/(\d+)\+[EeNn]/);
      if (coreMatch) {
        specs.coreCount = coreMatch[0];
      }
      
      // Extract quantity if mentioned
      const quantityMatch = name.match(/(\d+)\s*(?:pack|pcs?|pieces?|units?)/i);
      if (quantityMatch) {
        specs.quantity = quantityMatch[0];
      }
      
      // Extract cable type
      if (name.match(/swa|armoured|steel\s*wire/i)) {
        specs.cableType = 'SWA';
      } else if (name.match(/pvc/i)) {
        specs.cableType = 'PVC';
      } else if (name.match(/xlpe/i)) {
        specs.cableType = 'XLPE';
      }
      
      return specs;
    };

    const specs = extractSpecs(product.name);

    return {
      ...product,
      numericPrice: extractPrice(product.price),
      rating: enrichment.rating,
      deliveryInfo: enrichment.deliveryInfo,
      ...specs
    };
  };

  // Enhanced AI Analysis
  const runAiAnalysis = async (products: PriceComparisonItem[]) => {
    if (!aiEnabled || products.length === 0) {
      console.log('🚫 AI analysis skipped - disabled or no products');
      return;
    }
    
    console.log(`🤖 Running AI analysis on ${products.length} products...`);
    setIsAiAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-material-recommendations', {
        body: { 
          products, 
          searchTerm: searchQuery,
          userLocation: 'UK'
        }
      });

      console.log('🤖 AI analysis response:', { data, error });

      if (error) {
        console.error('❌ AI analysis error:', error);
        throw new Error(error.message);
      }

      console.log('✅ AI analysis successful');
      return data;
    } catch (err: any) {
      console.error('❌ AI analysis failed:', err);
      toast({
        title: "AI Analysis Failed",
        description: "Price comparison still available, but AI insights unavailable.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAiAnalyzing(false);
    }
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
    
    console.log('🔍 Starting search:', { searchQuery, selectedCategory, selectedSupplier });
    
    setIsLoading(true);
    setError(null);
    setShowingPreSelected(false);
    
    try {
      console.log('📡 Calling comprehensive-materials-scraper...');
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { 
          categoryFilter: selectedCategory === 'all' ? null : selectedCategory, 
          supplierFilter: selectedSupplier === 'all' ? null : selectedSupplier, 
          searchTerm: searchQuery.trim()
        }
      });

      console.log('📡 Scraper response:', { data, error });

      if (error) {
        console.error('❌ Scraper error:', error);
        throw new Error(error.message);
      }

      if (data?.materials && data.materials.length > 0) {
        console.log(`✅ Found ${data.materials.length} materials`);
        
        // Process and enrich the results
        const processedProducts: PriceComparisonItem[] = data.materials.map(enrichProductData);

        // Filter out items with 0 price
        const validProducts = processedProducts.filter(p => p.numericPrice > 0);
        
        // Smart sorting: prioritize relevance over price
        const smartSortProducts = (products: PriceComparisonItem[], searchTerm: string) => {
          const searchLower = searchTerm.toLowerCase();
          const searchTerms = searchLower.split(/\s+/);
          
          // Calculate relevance score for each product
          const scoredProducts = products.map(product => {
            let relevanceScore = 0;
            const productName = product.name.toLowerCase();
            
            // Exact match bonus
            if (productName.includes(searchLower)) {
              relevanceScore += 100;
            }
            
            // Individual term matches
            searchTerms.forEach(term => {
              if (productName.includes(term)) {
                relevanceScore += 20;
              }
            });
            
            // Cable-specific matching for SWA, armoured, etc.
            if (searchLower.includes('swa') && productName.includes('swa')) {
              relevanceScore += 50;
            }
            if (searchLower.includes('armoured') && (productName.includes('armoured') || productName.includes('swa'))) {
              relevanceScore += 50;
            }
            
            // Size/spec matching (6mm, 100m, etc.)
            const sizeMatches = searchLower.match(/(\d+(?:\.\d+)?)\s*(mm|m|core)/g);
            if (sizeMatches) {
              sizeMatches.forEach(match => {
                if (productName.includes(match.replace(/\s/g, ''))) {
                  relevanceScore += 30;
                }
              });
            }
            
            return { ...product, relevanceScore };
          });
          
          // Sort by relevance first, then by price within relevance groups
          return scoredProducts.sort((a, b) => {
            if (a.relevanceScore !== b.relevanceScore) {
              return b.relevanceScore - a.relevanceScore; // Higher relevance first
            }
            return a.numericPrice - b.numericPrice; // Lower price within same relevance
          });
        };
        
        const sortedProducts = smartSortProducts(validProducts, searchQuery);

        const prices = sortedProducts.map(p => p.numericPrice);
        const cheapestPrice = Math.min(...prices);
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

        // Create initial result
        const result: PriceComparisonResult = {
          searchTerm: searchQuery,
          products: sortedProducts,
          cheapestPrice,
          averagePrice,
          priceRange
        };

        setComparisonResult(result);

        // Run AI analysis in parallel
        if (aiEnabled) {
          console.log('🤖 Starting AI analysis...');
          runAiAnalysis(sortedProducts).then(aiInsights => {
            if (aiInsights) {
              console.log('✅ AI analysis completed');
              setComparisonResult(prev => prev ? { ...prev, aiInsights } : null);
            }
          });
        }
      } else {
        console.log('⚠️ No materials found in response');
        setError("No products found for your search. Try different keywords or adjust filters.");
      }
    } catch (err: any) {
      console.error('❌ Search failed:', err);
      const errorMessage = err.message || "Failed to fetch price comparison data";
      setError(errorMessage);
      toast({
        title: "Search Failed",
        description: errorMessage.includes('fetch') ? "Network error - please check your connection" : "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // PDF Export functionality
  const exportToPDF = async () => {
    if (!comparisonResult) return;
    
    try {
      // Create a simple text-based export for now
      const exportData = {
        searchTerm: comparisonResult.searchTerm,
        products: comparisonResult.products.map(p => ({
          name: p.name,
          supplier: p.supplier,
          price: p.price,
          stockStatus: p.stockStatus,
          savings: p.numericPrice === comparisonResult.cheapestPrice ? 'Best Price' : 
                   `+${calculateSavings(p.numericPrice, comparisonResult.cheapestPrice)}%`
        })),
        summary: {
          totalProducts: comparisonResult.products.length,
          priceRange: comparisonResult.priceRange,
          cheapestPrice: formatPrice(comparisonResult.cheapestPrice)
        },
        exportDate: new Date().toLocaleDateString('en-GB')
      };

      // For now, download as JSON - could be enhanced to actual PDF
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `material-price-comparison-${comparisonResult.searchTerm.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Price comparison data exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export comparison data.",
        variant: "destructive"
      });
    }
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    setComparisonResult(null);
    setShowingPreSelected(false);
    setSearchQuery("");
    if (onClearSelection) {
      onClearSelection();
    }
  };

  // Process selected items when component mounts or selectedItems changes
  useEffect(() => {
    if (selectedItems && selectedItems.length > 0) {
      const result = processSelectedItems(selectedItems);
      if (result) {
        setComparisonResult(result);
        setShowingPreSelected(true);
        
        // Run AI analysis on pre-selected items if enabled
        if (aiEnabled) {
          runAiAnalysis(result.products).then(aiInsights => {
            if (aiInsights) {
              setComparisonResult(prev => prev ? { ...prev, aiInsights } : null);
            }
          });
        }
      }
    }
  }, [selectedItems, aiEnabled]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">AI-Powered Material Price Comparison</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare prices across multiple suppliers with intelligent recommendations and value analysis
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="h-3 w-3 mr-1" />
            AI-Enhanced
          </Badge>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
              className="rounded"
            />
            <span className="text-muted-foreground">Enable AI Recommendations</span>
          </label>
        </div>
      </div>

      {/* Tab Navigation - Collapsible */}
      <Collapsible className="mb-4">
        <CollapsibleTrigger className="w-full flex items-center justify-between bg-elec-gray border border-elec-yellow/20 rounded-xl p-4 mobile-interactive touch-target hover:bg-elec-yellow/5 transition-colors">
          <div className="flex items-center gap-3">
            {activeTab === 'comparison' && <Brain className="h-4 w-4 text-elec-yellow" />}
            {activeTab === 'bulk' && <Calculator className="h-4 w-4 text-elec-yellow" />}
            {activeTab === 'history' && <History className="h-4 w-4 text-elec-yellow" />}
            <span className="text-sm font-medium text-elec-light">
              {activeTab === 'comparison' && "Price Comparison"}
              {activeTab === 'bulk' && "Bulk Pricing"}
              {activeTab === 'history' && "Price History & Alerts"}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-elec-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-xl overflow-hidden">
            {[
              { key: 'comparison', label: 'Price Comparison', icon: Brain, disabled: false },
              { key: 'bulk', label: 'Bulk Pricing', icon: Calculator, disabled: !comparisonResult?.products.length },
              { key: 'history', label: 'Price History & Alerts', icon: History, disabled: !selectedProductForAnalysis }
            ].filter(tab => tab.key !== activeTab).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                disabled={tab.disabled}
                className={`w-full flex items-center gap-3 p-4 text-left transition-all duration-200 mobile-interactive touch-target border-b border-elec-yellow/10 last:border-b-0 ${
                  tab.disabled 
                    ? "text-elec-light/50 cursor-not-allowed" 
                    : "text-elec-light hover:bg-elec-yellow/10"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Tab Content */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {/* Search Interface */}
          <SearchInterface 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
            isLoading={isLoading}
            onSearch={handleSearch}
            onClearSelection={onClearSelection}
            showingPreSelected={showingPreSelected}
          />

          {/* Error Display */}
          {error && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 text-center">
                <p className="text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {comparisonResult && (
            <div className="space-y-6 pb-4">
              {/* Price Statistics */}
              <PriceStats 
                comparisonResult={comparisonResult}
                onExportToPDF={exportToPDF}
                onAddMultipleToQuote={onAddMultipleToQuote}
              />

              {/* AI Insights */}
              {(comparisonResult.aiInsights || isAiAnalyzing) && (
                <AIInsightsComponent 
                  aiInsights={comparisonResult.aiInsights!}
                  isAiAnalyzing={isAiAnalyzing}
                  onAddToQuote={onAddToQuote}
                  onAddMultipleToQuote={onAddMultipleToQuote}
                />
              )}

              {/* Product Cards */}
              <div className="space-y-4">
                {comparisonResult.products.map((product) => {
                  const isCheapest = product.numericPrice === comparisonResult.cheapestPrice;
                  const savings = calculateSavings(product.numericPrice, comparisonResult.cheapestPrice);
                  
                  return (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      isCheapest={isCheapest}
                      savings={savings}
                      onAddToQuote={onAddToQuote}
                    />
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
      )}

      {/* Bulk Pricing Tab */}
      {activeTab === 'bulk' && comparisonResult && (
        <BulkPricingCalculator 
          products={comparisonResult.products}
          onCalculate={(data) => {
            toast({
              title: "Bulk Pricing Calculated",
              description: `Calculated pricing for ${data.length} product(s)`,
            });
          }}
        />
      )}

      {/* Price History & Alerts Tab */}
      {activeTab === 'history' && (
        <PriceHistoryAlerts 
          selectedProduct={selectedProductForAnalysis}
          currentUserId="demo-user" // In real app, get from auth context
        />
      )}
    </div>
  );
};

export default MaterialPriceComparison;