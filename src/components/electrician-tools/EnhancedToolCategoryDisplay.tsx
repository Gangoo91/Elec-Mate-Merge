import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, ArrowLeft, Filter, RefreshCw, Loader2, Search, Scale, TrendingUp, Calculator, AlertTriangle, Brain, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import ToolCard from "@/components/electrician-tools/ToolCard";
import AIEnhancedToolPriceComparison from "@/components/electrician-tools/AIEnhancedToolPriceComparison";
import BulkToolPricingCalculator from "@/components/electrician-tools/BulkToolPricingCalculator";
import ToolPriceHistoryAlerts from "@/components/electrician-tools/ToolPriceHistoryAlerts";
import { ToolAIInsights } from "./ToolAIInsights";
import ToolRefreshButton from "@/components/electrician-tools/ToolRefreshButton";
import { useToolsData, type ToolItem } from "@/hooks/useToolsData";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "test-equipment": {
    title: "Test Equipment",
    description: "Multimeters, socket testers, insulation testers and PAT equipment"
  },
  "safety-tools": {
    title: "Safety Tools",
    description: "PPE, safety equipment and protective devices"
  },
  "power-tools": {
    title: "Power Tools",
    description: "Drills, saws, grinders and cordless tool systems"
  },
  "hand-tools": {
    title: "Hand Tools",
    description: "Screwdrivers, pliers, strippers and manual tools"
  },
  "access-tools": {
    title: "Access Tools & Equipment",
    description: "Ladders, steps, access platforms and safety equipment"
  },
  "tool-storage": {
    title: "Tool Storage",
    description: "Tool bags, cases, vans racking and storage solutions"
  },
  "specialist-tools": {
    title: "Specialist Tools",
    description: "Cable tools, crimpers, benders and specialised equipment"
  }
};

interface EnhancedToolCategoryDisplayProps {
  categoryName: string;
}

const EnhancedToolCategoryDisplay = ({ categoryName }: EnhancedToolCategoryDisplayProps) => {
  const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
  const meta = CATEGORY_META[categoryKey] || { title: categoryName, description: "Browse curated tools by category" };
  
  // Use comprehensive tools data
  const { data: allTools, isLoading, error, refetch } = useToolsData();

  // Filter state for the tools
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedItems, setSelectedItems] = useState<ToolItem[]>([]);
  const [isTabSelectorOpen, setIsTabSelectorOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Comprehensive category mapping function
  const getCategoryMappings = (frontendCategory: string): string[] => {
    const mappings: Record<string, string[]> = {
      'Test Equipment': ['Test Equipment', 'Testing Equipment', 'Test & Measurement', 'Testers'],
      'Safety Tools': ['Safety Tools', 'Safety Equipment', 'PPE', 'Personal Protective Equipment'],
      'Power Tools': ['Power Tools', 'Electric Tools', 'Cordless Tools', 'Battery Tools'],
      'Hand Tools': ['Hand Tools', 'Manual Tools', 'Basic Tools'],
      'Access Tools & Equipment': ['Access Tools & Equipment', 'Access Equipment', 'Ladders & Steps', 'Access'],
      'Tool Storage': ['Tool Storage', 'Storage', 'Tool Bags', 'Cases & Bags'],
      'Specialist Tools': ['Specialist Tools', 'Electrical Tools', 'Cable Tools', 'Wiring Tools']
    };
    
    return mappings[frontendCategory] || [frontendCategory];
  };

  // Filter and search the tools with fallback logic
  const filteredTools = useMemo(() => {
    if (!allTools) return [];
    
    // Filter by category first with improved matching
    const possibleMatches = getCategoryMappings(categoryName);
    let categoryFiltered = allTools.filter(tool => {
      const toolCategory = tool.category;
      const toolName = tool.name?.toLowerCase() || '';
      const toolDescription = tool.description?.toLowerCase() || '';
      
      // Try exact and partial category matches
      const categoryMatch = possibleMatches.some(match => 
        toolCategory === match || 
        toolCategory?.toLowerCase().includes(match.toLowerCase()) ||
        match.toLowerCase().includes(toolCategory?.toLowerCase() || '')
      );
      
      if (categoryMatch) return true;
      
      // Fallback: search by keywords in name/description for Power Tools
      if (categoryName === 'Power Tools') {
        const powerToolKeywords = ['drill', 'cordless', '18v', '12v', 'angle grinder', 'circular saw', 'impact driver', 'reciprocating saw', 'sds', 'battery'];
        return powerToolKeywords.some(keyword => 
          toolName.includes(keyword) || toolDescription.includes(keyword)
        );
      }
      
      // Fallback: search by keywords for other categories
      const categoryKeywords = getCategoryKeywords(categoryName);
      return categoryKeywords.some(keyword => 
        toolName.includes(keyword) || toolDescription.includes(keyword)
      );
    });
    
    // If no category-specific tools found, show related tools from Hand Tools for Power Tools
    if (categoryFiltered.length === 0 && categoryName === 'Power Tools') {
      categoryFiltered = allTools.filter(tool => {
        const toolName = tool.name?.toLowerCase() || '';
        const relatedKeywords = ['drill', 'driver', 'bit', 'battery', 'charger', 'grinder'];
        return relatedKeywords.some(keyword => toolName.includes(keyword));
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      categoryFiltered = categoryFiltered.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.highlights?.some(highlight => 
          typeof highlight === 'string' && highlight.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return categoryFiltered;
  }, [allTools, categoryName, searchTerm]);

  // Get keywords for category fallback searches
  const getCategoryKeywords = (category: string): string[] => {
    const keywordMap: Record<string, string[]> = {
      'Test Equipment': ['multimeter', 'tester', 'meter', 'clamp', 'voltage', 'continuity', 'insulation'],
      'Safety Tools': ['helmet', 'gloves', 'glasses', 'boots', 'harness', 'vest', 'safety'],
      'Power Tools': ['drill', 'cordless', '18v', '12v', 'grinder', 'saw', 'impact', 'sds', 'battery'],
      'Hand Tools': ['screwdriver', 'pliers', 'wire stripper', 'cable cutter', 'crimping', 'spanner'],
      'Measuring Tools': ['level', 'tape measure', 'ruler', 'detector', 'spirit level', 'laser'],
      'Cable Tools': ['cable', 'wire', 'stripper', 'cutter', 'puller', 'crimper'],
      'Lighting Tools': ['torch', 'light', 'led', 'inspection', 'headlamp', 'work light']
    };
    
    return keywordMap[category] || [category.toLowerCase()];
  };

  const pageTitle = `${meta.title} | ElecMate Professional Tools`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant guidance.`.slice(0, 160);

  const handleAddToCompare = (item: ToolItem) => {
    if (selectedItems.length >= 3) return;
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => String(item.id) !== itemId));
  };

  const clearComparison = () => {
    setSelectedItems([]);
  };

  if (error) {
    return (
      <main className="space-y-6 animate-fade-in">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>
        
        <div className="text-center space-y-4">
          <p className="text-red-400">Failed to load tools data</p>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mobile-container mobile-safe-area">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="mobile-section-spacing">
        <div className="flex flex-wrap gap-2 mb-4">
          <Link to="/electrician/tools">
            <Button variant="outline" size="sm" className="touch-target mobile-interactive bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          <h1 className="mobile-heading font-bold tracking-tight flex items-center gap-3">
            <Wrench className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 text-elec-light">{meta.title}</span>
          </h1>
          <p className="mobile-text text-text-muted leading-relaxed pl-9 sm:pl-10 lg:pl-11 pb-6">{meta.description}</p>
        </div>
      </header>

      {/* Advanced Features Navigation */}
      <section className="mobile-section-spacing relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
          {/* Mobile Collapsible Tabs */}
          {isMobile ? (
            <div className="mobile-card-spacing">
              <Collapsible open={isTabSelectorOpen} onOpenChange={setIsTabSelectorOpen}>
                <CollapsibleTrigger className="w-full mobile-card bg-elec-card/50 border-elec-yellow/20 mobile-interactive touch-target hover:bg-elec-yellow/5 mobile-tap-highlight">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      {activeTab === "browse" && <Wrench className="h-5 w-5 text-elec-yellow" />}
                      {activeTab === "compare" && <Scale className="h-5 w-5 text-elec-yellow" />}
                      {activeTab === "bulk" && <Calculator className="h-5 w-5 text-elec-yellow" />}
                      {activeTab === "alerts" && <TrendingUp className="h-5 w-5 text-elec-yellow" />}
                      {activeTab === "ai" && <Brain className="h-5 w-5 text-elec-yellow" />}
                      <span className="mobile-text font-medium text-elec-light">
                        {activeTab === "browse" && "Browse Tools"}
                        {activeTab === "compare" && "Compare Tools"}
                        {activeTab === "bulk" && "Bulk Pricing"}
                        {activeTab === "alerts" && "Price Alerts"}
                        {activeTab === "ai" && "AI Insights"}
                      </span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-elec-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  <div className="mobile-card bg-elec-card/30 border-elec-yellow/10 overflow-hidden">
                    {["browse", "compare", "bulk", "alerts", "ai"].filter(tab => tab !== activeTab).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setIsTabSelectorOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 text-left mobile-interactive touch-target border-b border-elec-yellow/10 last:border-b-0 text-elec-light hover:bg-elec-yellow/10 mobile-tap-highlight"
                      >
                        {tab === "browse" && <Wrench className="h-5 w-5 text-elec-yellow/70" />}
                        {tab === "compare" && <Scale className="h-5 w-5 text-elec-yellow/70" />}
                        {tab === "bulk" && <Calculator className="h-5 w-5 text-elec-yellow/70" />}
                        {tab === "alerts" && <TrendingUp className="h-5 w-5 text-elec-yellow/70" />}
                        {tab === "ai" && <Brain className="h-5 w-5 text-elec-yellow/70" />}
                        <span className="mobile-text font-medium">
                          {tab === "browse" && "Browse Tools"}
                          {tab === "compare" && "Compare Tools"}
                          {tab === "bulk" && "Bulk Pricing"}
                          {tab === "alerts" && "Price Alerts"}
                          {tab === "ai" && "AI Insights"}
                        </span>
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            /* Desktop Tabs */
            <TabsList className="mobile-grid-responsive grid grid-cols-3 lg:grid-cols-5 bg-elec-card/50 border border-elec-yellow/20 p-1 h-fit rounded-xl">
              <TabsTrigger value="browse" className="mobile-interactive touch-target px-4 py-3 text-sm font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm transition-all duration-200 text-elec-light hover:text-elec-yellow">
                <Wrench className="h-4 w-4 mr-2" />
                Browse
              </TabsTrigger>
              <TabsTrigger value="compare" className="mobile-interactive touch-target px-4 py-3 text-sm font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm transition-all duration-200 text-elec-light hover:text-elec-yellow">
                <Scale className="h-4 w-4 mr-2" />
                Compare
              </TabsTrigger>
              <TabsTrigger value="bulk" className="mobile-interactive touch-target px-4 py-3 text-sm font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm transition-all duration-200 text-elec-light hover:text-elec-yellow">
                <Calculator className="h-4 w-4 mr-2" />
                Bulk
              </TabsTrigger>
              <TabsTrigger value="alerts" className="mobile-interactive touch-target px-4 py-3 text-sm font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm transition-all duration-200 text-elec-light hover:text-elec-yellow">
                <TrendingUp className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="ai" className="mobile-interactive touch-target px-4 py-3 text-sm font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm transition-all duration-200 text-elec-light hover:text-elec-yellow">
                <Brain className="h-4 w-4 mr-2" />
                AI
              </TabsTrigger>
            </TabsList>
          )}

          {/* Search and filters for Browse tab */}
          {activeTab === "browse" && (
            <div className="mobile-action-bar">
              <div className="flex-1 w-full">
                <MobileInputWrapper
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  icon={<Search className="h-4 w-4 text-elec-yellow/70" />}
                  hint="Search by tool name, supplier, or description"
                />
              </div>
              <div className="flex items-center">
                <ToolRefreshButton
                  isFetching={isLoading}
                  lastFetchTime={0} // No static data - would come from actual cache metadata
                  onRefresh={refetch}
                  categoryName={categoryName}
                  className="shrink-0 touch-target"
                />
              </div>
            </div>
          )}

          {/* Quick Compare Bar */}
          {selectedItems.length > 0 && (
            <Card className="mobile-card bg-elec-yellow/10 border-elec-yellow/30 mt-4">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <span className="mobile-text font-medium text-elec-light">
                      {selectedItems.length}/3 tools selected for comparison
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      onClick={() => setActiveTab("compare")}
                      variant="gold"
                      className="touch-target mobile-interactive flex-1 sm:flex-none"
                    >
                      Compare Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearComparison}
                      className="touch-target mobile-interactive bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 flex-1 sm:flex-none"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab Content */}
          <TabsContent value="browse" className="mobile-section-spacing mt-6">
            {/* Loading state */}
            {isLoading && (
              <Card className="mobile-card bg-elec-card/30 border-elec-yellow/20">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                    <p className="mobile-text text-elec-yellow font-medium">Loading {meta.title.toLowerCase()}...</p>
                  </div>
                  <p className="mobile-small-text text-text-muted">
                    Fetching data from comprehensive tools database
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tools grid */}
            {!isLoading && (
              <>
                {filteredTools.length === 0 ? (
                  <Card className="mobile-card bg-elec-card/30 border-elec-yellow/20">
                    <CardContent className="p-6 text-center mobile-card-spacing">
                      <div className="space-y-4">
                        <p className="mobile-text text-text-muted mb-4">
                          {searchTerm ? 
                            `No tools found matching "${searchTerm}"` :
                            `No ${meta.title.toLowerCase()} available in our current database`
                          }
                        </p>
                        <p className="mobile-small-text text-text-muted">
                          {categoryName === 'Power Tools' 
                            ? "Power Tools data is being collected. Try browsing Hand Tools or search for specific items like 'drill' or '18V'."
                            : `${categoryName} data is being updated. Try searching for specific tools or browse available categories.`
                          }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          {categoryName === 'Power Tools' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSearchTerm("drill")}
                              className="touch-target mobile-interactive bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                            >
                              Search Drills
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchTerm("");
                              window.location.href = "/electrician/tools?category=Hand Tools";
                            }}
                            className="touch-target mobile-interactive bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                          >
                            Browse Hand Tools
                          </Button>
                          {searchTerm && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSearchTerm("")}
                              className="touch-target mobile-interactive bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <section aria-label={`${meta.title} products`} className="mobile-section-spacing">
                    <div className="mobile-grid-responsive md:grid-cols-2 pb-6">
                      {filteredTools.map((item, index) => (
                        <ToolCard 
                          key={item.id || `${item.supplier}-${item.name}-${index}`} 
                          item={item}
                          onAddToCompare={handleAddToCompare}
                          onRemoveFromCompare={handleRemoveFromCompare}
                          isSelected={selectedItems.some(selected => selected.id === item.id)}
                          isCompareDisabled={selectedItems.length >= 3 && !selectedItems.some(selected => selected.id === item.id)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="compare" className="space-y-6 mt-6">
            <AIEnhancedToolPriceComparison 
              initialQuery={categoryName}
              selectedItems={selectedItems}
              onClearSelection={clearComparison}
            />
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6 mt-6">
            <BulkToolPricingCalculator categoryName={categoryName} tools={filteredTools} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6 mt-6">
            <ToolPriceHistoryAlerts categoryName={categoryName} />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 mt-6">
            <ToolAIInsights 
              tools={filteredTools} 
              searchQuery={searchTerm || categoryName}
            />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default EnhancedToolCategoryDisplay;