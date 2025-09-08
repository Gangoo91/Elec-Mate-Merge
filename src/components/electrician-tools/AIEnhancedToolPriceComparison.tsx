import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Calculator, History, ChevronDown, Download, TrendingUp, Zap, Wrench, 
  BatteryCharging, AlertTriangle, Scale, Search, Filter, ExternalLink, Star,
  Loader2, BarChart3, Target
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ToolSearchInterface } from "./price-comparison/ToolSearchInterface";

interface ToolItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
  numericPrice?: number;
  rating?: number;
  deliveryInfo?: string;
  voltage?: string;
  brand?: string;
  toolType?: string;
}

interface ToolPriceComparisonResult {
  searchTerm: string;
  tools: ToolItem[];
  cheapestPrice: number;
  averagePrice: number;
  priceRange: string;
  aiInsights?: any;
}

interface AIInsights {
  recommendations: Array<{
    type: 'bundle' | 'alternative' | 'upgrade' | 'accessory';
    title: string;
    description: string;
    reasoning: string;
    potentialSavings?: string;
  }>;
  insights: {
    totalAnalyzed: number;
    categories: string[];
    averagePrice: number;
    topBrands: string[];
    priceRange?: { min: number; max: number; };
  };
}

interface AIEnhancedToolPriceComparisonProps {
  initialQuery?: string;
  selectedItems?: any[];
  onClearSelection?: () => void;
  onAddToQuote?: (tool: any, quantity?: number) => void;
  onAddMultipleToQuote?: (tools: any[]) => void;
}

const AIEnhancedToolPriceComparison = ({ 
  initialQuery = "", 
  selectedItems = [], 
  onClearSelection, 
  onAddToQuote, 
  onAddMultipleToQuote 
}: AIEnhancedToolPriceComparisonProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ToolPriceComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'comparison' | 'bulk' | 'history'>('comparison');
  const [selectedToolForAnalysis, setSelectedToolForAnalysis] = useState<ToolItem | null>(null);
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
  const processSelectedItems = (items: any[]): ToolPriceComparisonResult | null => {
    if (!items || items.length === 0) return null;

    const processedTools: ToolItem[] = items.map((item, index) => ({
      id: item.id || index,
      name: item.name || 'Unknown Tool',
      category: item.category || 'Tools',
      price: item.price || '£0.00',
      supplier: item.supplier || 'Unknown',
      image: item.image || '/placeholder.svg',
      stockStatus: item.stockStatus || 'In Stock',
      productUrl: item.productUrl,
      highlights: item.highlights || [],
      numericPrice: extractPrice(item.price || '£0.00'),
      rating: 4.5,
      deliveryInfo: 'Standard',
      voltage: extractVoltage(item.name || ''),
      brand: extractBrand(item.name || ''),
      toolType: extractToolType(item.name || '')
    }));

    // Filter out items with 0 price and sort by price
    const validTools = processedTools.filter(t => t.numericPrice > 0);
    const sortedTools = validTools.sort((a, b) => a.numericPrice - b.numericPrice);

    if (sortedTools.length === 0) return null;

    const prices = sortedTools.map(t => t.numericPrice);
    const cheapestPrice = Math.min(...prices);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

    return {
      searchTerm: `Selected Tools (${items.length})`,
      tools: sortedTools,
      cheapestPrice,
      averagePrice,
      priceRange
    };
  };

  // Enhanced tool processing with tool-specific data enrichment
  const enrichToolData = (tool: any): ToolItem => {
    const supplierData = {
      'Screwfix': { rating: 4.6, deliveryInfo: 'Click & Collect' },
      'Toolstation': { rating: 4.5, deliveryInfo: 'Store Pickup' },
      'Amazon Business': { rating: 4.4, deliveryInfo: 'Next Day' },
      'CEF': { rating: 4.8, deliveryInfo: 'Trade Counter' },
      'RS Components': { rating: 4.7, deliveryInfo: 'Next Day' }
    };

    const enrichment = supplierData[tool.supplier as keyof typeof supplierData] || 
                     { rating: 4.4, deliveryInfo: 'Standard' };

    return {
      ...tool,
      numericPrice: extractPrice(tool.price),
      rating: enrichment.rating,
      deliveryInfo: enrichment.deliveryInfo,
      voltage: extractVoltage(tool.name),
      brand: extractBrand(tool.name),
      toolType: extractToolType(tool.name)
    };
  };

  // Enhanced AI Analysis for tools
  const runAiAnalysis = async (tools: ToolItem[]) => {
    if (!aiEnabled || tools.length === 0) {
      console.log('🚫 AI analysis skipped - disabled or no tools');
      return;
    }
    
    console.log(`🤖 Running AI analysis on ${tools.length} tools...`);
    setIsAiAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-tool-recommendations', {
        body: { 
          searchQuery,
          tools
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
        description: "Tool comparison still available, but AI insights unavailable.",
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
        description: "Please enter a search term to find tools.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('🔍 Starting tool search:', { searchQuery, selectedCategory, selectedSupplier });
    
    setIsLoading(true);
    setError(null);
    setShowingPreSelected(false);
    
    try {
      console.log('📡 Calling comprehensive-tools-scraper...');
      const { data, error } = await supabase.functions.invoke('comprehensive-tools-scraper', {
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

      if (data?.tools && data.tools.length > 0) {
        console.log(`✅ Found ${data.tools.length} tools`);
        
        // Process and enrich the results
        const processedTools: ToolItem[] = data.tools.map(enrichToolData);

        // Filter out items with 0 price
        const validTools = processedTools.filter(t => t.numericPrice > 0);
        
        const sortedTools = validTools.sort((a, b) => a.numericPrice - b.numericPrice);

        const prices = sortedTools.map(t => t.numericPrice);
        const cheapestPrice = Math.min(...prices);
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const priceRange = `${formatPrice(cheapestPrice)} - ${formatPrice(Math.max(...prices))}`;

        // Create initial result
        const result: ToolPriceComparisonResult = {
          searchTerm: searchQuery,
          tools: sortedTools,
          cheapestPrice,
          averagePrice,
          priceRange
        };

        setComparisonResult(result);

        // Run AI analysis in parallel
        if (aiEnabled) {
          console.log('🤖 Starting AI analysis...');
          runAiAnalysis(sortedTools).then(aiInsights => {
            if (aiInsights) {
              console.log('✅ AI analysis completed');
              setComparisonResult(prev => prev ? { ...prev, aiInsights } : null);
            }
          });
        }
      } else {
        console.log('⚠️ No tools found in response');
        setError("No tools found for your search. Try different keywords or adjust filters.");
      }
    } catch (err: any) {
      console.error('❌ Search failed:', err);
      const errorMessage = err.message || "Failed to fetch tool comparison data";
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

  // Export functionality
  const exportToPDF = async () => {
    if (!comparisonResult) return;
    
    try {
      const exportData = {
        searchTerm: comparisonResult.searchTerm,
        tools: comparisonResult.tools.map(t => ({
          name: t.name,
          supplier: t.supplier,
          price: t.price,
          voltage: t.voltage,
          brand: t.brand,
          stockStatus: t.stockStatus,
          savings: t.numericPrice === comparisonResult.cheapestPrice ? 'Best Price' : 
                   `+${calculateSavings(t.numericPrice, comparisonResult.cheapestPrice)}%`
        })),
        summary: {
          totalTools: comparisonResult.tools.length,
          priceRange: comparisonResult.priceRange,
          cheapestPrice: formatPrice(comparisonResult.cheapestPrice)
        },
        exportDate: new Date().toLocaleDateString('en-GB')
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tool-price-comparison-${comparisonResult.searchTerm.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Tool comparison data exported successfully.",
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
          runAiAnalysis(result.tools).then(aiInsights => {
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
        <h2 className="text-3xl font-bold text-white">AI-Powered Tool Price Comparison</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Compare tool prices across multiple suppliers with intelligent voltage compatibility and professional recommendations
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="h-3 w-3 mr-1" />
            AI-Enhanced
          </Badge>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            <BatteryCharging className="h-3 w-3 mr-1" />
            Voltage Compatible
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
              {activeTab === 'comparison' && "Tool Price Comparison"}
              {activeTab === 'bulk' && "Bulk Tool Pricing"}
              {activeTab === 'history' && "Price History & Alerts"}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-elec-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-xl overflow-hidden">
            {[
              { key: 'comparison', label: 'Tool Price Comparison', icon: Brain, disabled: false },
              { key: 'bulk', label: 'Bulk Tool Pricing', icon: Calculator, disabled: true },
              { key: 'history', label: 'Price History & Alerts', icon: History, disabled: true }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => !tab.disabled && setActiveTab(tab.key as any)}
                disabled={tab.disabled}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors mobile-interactive touch-target ${
                  activeTab === tab.key 
                    ? 'bg-elec-yellow/10 text-elec-yellow border-l-2 border-elec-yellow' 
                    : tab.disabled 
                      ? 'text-muted-foreground cursor-not-allowed' 
                      : 'text-elec-light hover:bg-elec-yellow/5'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
                {tab.disabled && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Coming Soon
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
        <TabsContent value="comparison" className="space-y-6">
          {/* Search Interface */}
          <ToolSearchInterface 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
            isLoading={isLoading}
            onSearch={handleSearch}
            onClearSelection={handleClearSelection}
            showingPreSelected={showingPreSelected}
          />

          {/* Error Display */}
          {error && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Display */}
          {comparisonResult && (
            <div className="space-y-6">
              {/* Summary Card with Export */}
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-elec-light">
                      <TrendingUp className="h-5 w-5 text-elec-yellow" />
                      Tool Comparison Results - {comparisonResult.searchTerm}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportToPDF}
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-elec-yellow">
                        {comparisonResult.tools.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Tools Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {formatPrice(comparisonResult.cheapestPrice)}
                      </div>
                      <div className="text-sm text-muted-foreground">Best Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {formatPrice(comparisonResult.averagePrice)}
                      </div>
                      <div className="text-sm text-muted-foreground">Average Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-elec-yellow">
                        {comparisonResult.priceRange}
                      </div>
                      <div className="text-sm text-muted-foreground">Price Range</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              {comparisonResult.aiInsights && (
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      {isAiAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent" />
                          Analyzing Tools...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4" />
                          AI Tool Recommendations
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparisonResult.aiInsights.recommendations && comparisonResult.aiInsights.recommendations.length > 0 ? (
                      <div className="space-y-4">
                        {comparisonResult.aiInsights.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-1 bg-blue-500/20 rounded">
                                {rec.type === 'bundle' && <Zap className="h-3 w-3 text-blue-400" />}
                                {rec.type === 'alternative' && <TrendingUp className="h-3 w-3 text-blue-400" />}
                                {rec.type === 'upgrade' && <Brain className="h-3 w-3 text-blue-400" />}
                                {rec.type === 'accessory' && <Wrench className="h-3 w-3 text-blue-400" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-blue-400 mb-1">{rec.title}</h4>
                                <p className="text-sm text-blue-300/80 mb-2">{rec.description}</p>
                                <p className="text-xs text-blue-400/60">{rec.reasoning}</p>
                                {rec.potentialSavings && (
                                  <div className="mt-2">
                                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                                      {rec.potentialSavings}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-blue-400/60 text-sm">AI analysis in progress...</p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisonResult.tools.map((tool) => (
                  <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm text-elec-light line-clamp-2">
                          {tool.name}
                        </h3>
                        {tool.isOnSale && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-elec-yellow">
                            {tool.price}
                          </span>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">
                              {tool.supplier}
                            </div>
                            {tool.rating && (
                              <div className="text-xs text-yellow-400">
                                ⭐ {tool.rating.toFixed(1)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {tool.stockStatus === 'In Stock' ? (
                            <Badge className="bg-green-500/20 text-green-400 text-xs">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">
                              {tool.stockStatus}
                            </Badge>
                          )}
                          {tool.voltage && (
                            <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                              {tool.voltage}
                            </Badge>
                          )}
                          {tool.brand && (
                            <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                              {tool.brand}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Savings indicator */}
                        {tool.numericPrice !== comparisonResult.cheapestPrice && (
                          <div className="text-xs text-orange-400">
                            +{calculateSavings(tool.numericPrice, comparisonResult.cheapestPrice)}% vs best price
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          {tool.productUrl && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 text-xs"
                              onClick={() => window.open(tool.productUrl, '_blank')}
                            >
                              View Product
                            </Button>
                          )}
                          {onAddToQuote && (
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => onAddToQuote(tool)}
                            >
                              Add to Quote
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <Calculator className="h-12 w-12 text-elec-yellow/40 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Bulk Tool Pricing Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Calculate bulk discounts and quantity pricing for professional tool purchases.
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-elec-yellow/40 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Tool Price History & Alerts</h3>
              <p className="text-muted-foreground mb-4">
                Track tool price trends and set up alerts for significant price drops.
              </p>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper functions for tool processing
function extractVoltage(name: string): string {
  const voltageMatch = name.match(/(\d+(?:\.\d+)?)\s*v(?:olt)?/i);
  return voltageMatch ? voltageMatch[1] + 'V' : '';
}

function extractBrand(name: string): string {
  const brands = ['DeWalt', 'Makita', 'Bosch', 'Milwaukee', 'Fluke', 'Stanley', 'Klein', 'Wera', 'Festool', 'Hilti'];
  for (const brand of brands) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return '';
}

function extractToolType(name: string): string {
  const nameLower = name.toLowerCase();
  const types = {
    'drill': 'Drill',
    'driver': 'Driver',
    'saw': 'Saw',
    'grinder': 'Grinder',
    'multimeter': 'Multimeter',
    'tester': 'Tester',
    'pliers': 'Pliers',
    'screwdriver': 'Screwdriver',
    'torch': 'Torch',
    'level': 'Level'
  };
  
  for (const [key, value] of Object.entries(types)) {
    if (nameLower.includes(key)) return value;
  }
  
  return '';
}

export default AIEnhancedToolPriceComparison;