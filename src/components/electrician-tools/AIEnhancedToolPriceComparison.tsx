import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calculator, History, ChevronDown, Download, TrendingUp, Zap, Wrench, BatteryCharging, AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ToolSearchInterface } from "./price-comparison/ToolSearchInterface";

interface AIEnhancedToolPriceComparisonProps {
  initialQuery?: string;
  selectedItems?: ToolItem[];
  onClearSelection?: () => void;
}

interface AIRecommendation {
  type: 'bundle' | 'upgrade' | 'alternative' | 'accessory';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  priceImpact?: string;
  reasoning: string;
  tools?: string[];
}

interface AIInsights {
  costAnalysis: {
    totalCost: number;
    averageCost: number;
    priceRange: string;
    bestValueTool: string;
  };
  recommendations: AIRecommendation[];
  marketInsights: {
    priceComparison: string;
    brandAnalysis: string;
    valueForMoney: string;
  };
  professionalAdvice: string[];
}

const AIEnhancedToolPriceComparison: React.FC<AIEnhancedToolPriceComparisonProps> = ({
  initialQuery = "",
  selectedItems = [],
  onClearSelection
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [powerSource, setPowerSource] = useState("all");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("comparison");
  const isMobile = useIsMobile();

  // Use only selected items - no fallback mock data
  const comparisonTools: ToolItem[] = selectedItems;

  // Filter options
  const categories = ["all", "Power Tools", "Hand Tools", "Test Equipment", "Safety Tools", "Storage"];
  const suppliers = ["all", "Screwfix", "Toolstation", "Amazon", "Trade Counter"];
  const priceRanges = ["all", "Under £50", "£50-£100", "£100-£200", "£200-£500", "Over £500"];
  const powerSources = ["all", "Cordless", "Corded", "Manual", "Battery"];

  // Run AI analysis when tools or AI enabled changes
  useEffect(() => {
    if (aiEnabled && comparisonTools.length > 0) {
      runAIAnalysis();
    }
  }, [comparisonTools, aiEnabled]);

  const runAIAnalysis = async () => {
    if (!aiEnabled || comparisonTools.length === 0) return;
    
    console.log(`🤖 Running AI analysis on ${comparisonTools.length} tools...`);
    setIsAiAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-tool-recommendations', {
        body: { 
          tools: comparisonTools, 
          searchQuery: searchTerm || "tool comparison analysis"
        }
      });

      if (error) {
        console.error('❌ AI analysis error:', error);
        toast({
          title: "AI Analysis Error",
          description: "Failed to get AI insights. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data?.success && data?.recommendations) {
        // Transform AI response to insights format
        const insights: AIInsights = {
          costAnalysis: {
            totalCost: comparisonTools.reduce((sum, tool) => sum + getPriceValue(tool.price), 0),
            averageCost: comparisonTools.reduce((sum, tool) => sum + getPriceValue(tool.price), 0) / comparisonTools.length,
            priceRange: `£${Math.min(...comparisonTools.map(t => getPriceValue(t.price)))} - £${Math.max(...comparisonTools.map(t => getPriceValue(t.price)))}`,
            bestValueTool: findBestValue()?.name || "N/A"
          },
          recommendations: data.recommendations || [],
          marketInsights: data.insights || {
            priceComparison: "Competitive pricing across selected tools",
            brandAnalysis: "Mixed brand selection provides good comparison",
            valueForMoney: "Good value options identified"
          },
          professionalAdvice: [
            "Consider tool compatibility when building a kit",
            "Invest in quality for frequently used tools",
            "Check warranty terms and service support"
          ]
        };
        
        setAiInsights(insights);
        console.log('✅ AI analysis completed successfully');
      }
    } catch (error) {
      console.error('❌ AI analysis failed:', error);
      toast({
        title: "AI Analysis Failed",
        description: "Unable to analyze tools. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const getToolSpecs = (tool: ToolItem) => {
    const specs: Record<string, string> = {};
    const name = tool.name.toLowerCase();
    
    if (name.includes('multimeter')) {
      specs['Type'] = 'Digital Multimeter';
      specs['True RMS'] = name.includes('true rms') ? 'Yes' : 'Standard';
      specs['CAT Rating'] = name.includes('cat iii') ? 'CAT III' : name.includes('cat iv') ? 'CAT IV' : 'CAT II';
    } else if (name.includes('tester')) {
      specs['Type'] = 'Multifunction Tester';
      specs['Standards'] = '17th/18th Edition';
      specs['Display'] = name.includes('colour') ? 'Colour LCD' : 'LCD';
    } else if (name.includes('drill')) {
      specs['Type'] = 'Power Drill';
      specs['Voltage'] = name.includes('18v') ? '18V' : name.includes('12v') ? '12V' : 'Variable';
      specs['Chuck Size'] = '13mm';
    } else if (name.includes('saw')) {
      specs['Type'] = 'Power Saw';
      specs['Blade Size'] = '165mm';
      specs['Cut Depth'] = '55mm';
    }
    
    return specs;
  };

  const comparisonData = useMemo(() => {
    if (comparisonTools.length === 0) return null;
    
    const allSpecs = new Set<string>();
    comparisonTools.forEach(tool => {
      Object.keys(getToolSpecs(tool)).forEach(spec => allSpecs.add(spec));
    });
    
    return {
      tools: comparisonTools,
      specifications: Array.from(allSpecs)
    };
  }, [comparisonTools]);

  const getPriceValue = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[£,]/g, '')) || 0;
  };

  const findBestValue = () => {
    if (comparisonTools.length === 0) return null;
    
    const toolsWithValue = comparisonTools.map(tool => ({
      ...tool,
      priceValue: getPriceValue(tool.price)
    }));
    
    return toolsWithValue.reduce((best, current) => 
      current.priceValue < best.priceValue ? current : best
    );
  };

  const bestValue = findBestValue();

  const exportComparison = () => {
    const data = {
      tools: comparisonTools.map(tool => ({
        name: tool.name,
        price: tool.price,
        supplier: tool.supplier,
        category: tool.category,
        specifications: getToolSpecs(tool)
      })),
      analysis: aiInsights
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tool-comparison-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Tool comparison data has been downloaded.",
      variant: "default"
    });
  };

  if (!comparisonData) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6 text-center space-y-4">
          <Scale className="h-12 w-12 text-elec-yellow mx-auto" />
          <h3 className="text-xl font-semibold">AI-Enhanced Tool Comparison</h3>
          <p className="text-muted-foreground">
            Select tools from the browse section to compare with AI-powered insights and recommendations.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Brain className="h-5 w-5 text-elec-yellow" />
            <span className="text-sm text-elec-yellow font-medium">Powered by AI Analysis</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with AI Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Scale className="h-6 w-6 text-elec-yellow" />
            AI-Enhanced Tool Comparison
          </h2>
          <p className="text-muted-foreground">
            Comparing {comparisonData.tools.length} tools with intelligent insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium">AI Analysis</span>
            <Switch 
              checked={aiEnabled} 
              onCheckedChange={setAiEnabled}
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>
          {onClearSelection && (
            <Button
              variant="outline"
              onClick={onClearSelection}
              className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
            >
              Clear Selection
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Search & Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-elec-yellow" />
              Search & Filter Tools
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-elec-yellow hover:bg-elec-yellow/10"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                <SelectValue placeholder="Supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(sup => (
                  <SelectItem key={sup} value={sup}>
                    {sup === "all" ? "All Suppliers" : sup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={runAIAnalysis}
              disabled={isAiAnalyzing || !aiEnabled}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              {isAiAnalyzing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              Re-analyze
            </Button>
          </div>

          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleContent className="space-y-4 pt-4 border-t border-elec-yellow/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range} value={range}>
                        {range === "all" ? "All Prices" : range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={powerSource} onValueChange={setPowerSource}>
                  <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                    <SelectValue placeholder="Power Source" />
                  </SelectTrigger>
                  <SelectContent>
                    {powerSources.map(power => (
                      <SelectItem key={power} value={power}>
                        {power === "all" ? "All Power Sources" : power}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={exportComparison}
                  variant="outline"
                  className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-elec-card/50 border border-elec-yellow/20">
          <TabsTrigger value="comparison" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            <Scale className="h-4 w-4 mr-2" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            <Target className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {/* Best Value Highlight */}
          {bestValue && (
            <Card className="bg-elec-yellow/10 border-elec-yellow/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  <span className="font-semibold text-elec-yellow">Best Value Pick</span>
                </div>
                <p className="text-sm">
                  <strong>{bestValue.name}</strong> offers the best price at {bestValue.price}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comparison Grid */}
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {comparisonData.tools.map((tool) => (
              <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray relative">
                {tool.id === bestValue?.id && (
                  <Badge 
                    variant="gold" 
                    className="absolute -top-2 left-4 z-10"
                  >
                    Best Value
                  </Badge>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2 flex-1">
                      {tool.name}
                    </CardTitle>
                    {tool.stockStatus && (
                      <Badge 
                        variant={tool.stockStatus === 'In Stock' ? 'success' : 'warning'}
                        className="text-xs"
                      >
                        {tool.stockStatus}
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {tool.supplier}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden rounded-md bg-muted">
                    <img 
                      src={tool.image || "/placeholder.svg"} 
                      alt={tool.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  
                  {/* Price */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-elec-yellow mb-1">
                      {tool.price}
                    </div>
                    {tool.reviews && (
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {tool.reviews}
                      </div>
                    )}
                  </div>
                  
                  {/* Specifications */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      Specifications
                    </h4>
                    {comparisonData.specifications.map(spec => {
                      const toolSpecs = getToolSpecs(tool);
                      const value = toolSpecs[spec];
                      return (
                        <div key={spec} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{spec}:</span>
                          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
                            {value || 'N/A'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Action Button */}
                  <Button variant="gold" size="sm" className="w-full" asChild>
                    <a 
                      href={tool.productUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Product
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          {isAiAnalyzing ? (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                  <Brain className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                <p className="text-muted-foreground">
                  Analyzing tools for value, compatibility, and professional recommendations...
                </p>
              </CardContent>
            </Card>
          ) : aiInsights ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-elec-yellow" />
                    Cost Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className="font-semibold text-elec-yellow">£{aiInsights.costAnalysis.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Cost:</span>
                    <span className="font-semibold">£{aiInsights.costAnalysis.averageCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Range:</span>
                    <span className="font-semibold">{aiInsights.costAnalysis.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Value:</span>
                    <span className="font-semibold text-green-500">{aiInsights.costAnalysis.bestValueTool}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-elec-yellow" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Price Comparison:</span>
                    <p className="text-muted-foreground mt-1">{aiInsights.marketInsights.priceComparison}</p>
                  </div>
                  <div>
                    <span className="font-medium">Brand Analysis:</span>
                    <p className="text-muted-foreground mt-1">{aiInsights.marketInsights.brandAnalysis}</p>
                  </div>
                  <div>
                    <span className="font-medium">Value Assessment:</span>
                    <p className="text-muted-foreground mt-1">{aiInsights.marketInsights.valueForMoney}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No AI Insights Available</h3>
                <p className="text-muted-foreground mb-4">
                  Enable AI analysis to get intelligent insights and recommendations.
                </p>
                <Button 
                  onClick={() => setAiEnabled(true)}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Enable AI Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Summary Table for Desktop */}
          {!isMobile && comparisonData.tools.length > 1 && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-elec-yellow" />
                  Detailed Comparison Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-elec-yellow/20">
                        <th className="text-left p-2">Feature</th>
                        {comparisonData.tools.map(tool => (
                          <th key={tool.id} className="text-left p-2 min-w-[200px]">
                            {tool.name.split(' ').slice(0, 3).join(' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="p-2 font-medium">Price</td>
                        {comparisonData.tools.map(tool => (
                          <td key={tool.id} className="p-2 text-elec-yellow font-semibold">
                            {tool.price}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="p-2 font-medium">Supplier</td>
                        {comparisonData.tools.map(tool => (
                          <td key={tool.id} className="p-2">{tool.supplier}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-elec-yellow/10">
                        <td className="p-2 font-medium">Stock Status</td>
                        {comparisonData.tools.map(tool => (
                          <td key={tool.id} className="p-2">
                            <Badge 
                              variant={tool.stockStatus === 'In Stock' ? 'success' : 'warning'}
                              className="text-xs"
                            >
                              {tool.stockStatus || 'Unknown'}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                      {comparisonData.specifications.map(spec => (
                        <tr key={spec} className="border-b border-elec-yellow/10">
                          <td className="p-2 font-medium">{spec}</td>
                          {comparisonData.tools.map(tool => {
                            const toolSpecs = getToolSpecs(tool);
                            const value = toolSpecs[spec];
                            return (
                              <td key={tool.id} className="p-2">
                                {value || '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {aiInsights?.recommendations && aiInsights.recommendations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {aiInsights.recommendations.map((rec, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                      <Badge 
                        variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'warning' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <p className="text-xs text-muted-foreground">{rec.reasoning}</p>
                    {rec.priceImpact && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-elec-yellow" />
                        <span className="text-sm font-medium">Price Impact: {rec.priceImpact}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
                <p className="text-muted-foreground">
                  Run AI analysis to get intelligent tool recommendations and professional advice.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIEnhancedToolPriceComparison;