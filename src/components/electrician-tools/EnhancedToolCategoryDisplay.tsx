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
import ToolPriceComparison from "@/components/electrician-tools/ToolPriceComparison";
import BulkToolPricingCalculator from "@/components/electrician-tools/BulkToolPricingCalculator";
import ToolPriceHistoryAlerts from "@/components/electrician-tools/ToolPriceHistoryAlerts";
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

  // Filter and search the tools
  const filteredTools = useMemo(() => {
    if (!allTools) return [];
    
    // Filter by category first
    const possibleMatches = getCategoryMappings(categoryName);
    let categoryFiltered = allTools.filter(tool => {
      const toolCategory = tool.category;
      return possibleMatches.some(match => 
        toolCategory === match || 
        toolCategory?.toLowerCase().includes(match.toLowerCase()) ||
        match.toLowerCase().includes(toolCategory?.toLowerCase() || '')
      );
    });
    
    // Apply search filter
    if (searchTerm) {
      categoryFiltered = categoryFiltered.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return categoryFiltered;
  }, [allTools, categoryName, searchTerm]);

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
    <main className="mobile-card-spacing animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="mobile-card-spacing">
        <div className="flex flex-wrap gap-2">
          <Link to="/electrician/tools">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          <h1 className="mobile-heading font-bold tracking-tight flex items-center gap-2">
            <Wrench className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0">{meta.title}</span>
          </h1>
          <p className="mobile-text text-muted-foreground leading-relaxed pl-7 sm:pl-8 lg:pl-10">{meta.description}</p>
        </div>
      </header>

      {/* Advanced Features Navigation */}
      <section className="space-y-4 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
          {/* Mobile Collapsible Tabs */}
          {isMobile ? (
            <div className="space-y-2">
              <Collapsible open={isTabSelectorOpen} onOpenChange={setIsTabSelectorOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between bg-elec-gray border border-elec-yellow/20 rounded-xl p-4 mobile-interactive touch-target hover:bg-elec-yellow/5 transition-colors">
                  <div className="flex items-center gap-3">
                    {activeTab === "browse" && <Wrench className="h-4 w-4 text-elec-yellow" />}
                    {activeTab === "compare" && <Scale className="h-4 w-4 text-elec-yellow" />}
                    {activeTab === "bulk" && <Calculator className="h-4 w-4 text-elec-yellow" />}
                    {activeTab === "alerts" && <TrendingUp className="h-4 w-4 text-elec-yellow" />}
                    {activeTab === "ai" && <Brain className="h-4 w-4 text-elec-yellow" />}
                    <span className="text-sm sm:text-base font-medium text-elec-light">
                      {activeTab === "browse" && "Browse Tools"}
                      {activeTab === "compare" && "Compare Tools"}
                      {activeTab === "bulk" && "Bulk Pricing"}
                      {activeTab === "alerts" && "Price Alerts"}
                      {activeTab === "ai" && "AI Insights"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-elec-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  <div className="bg-elec-gray border border-elec-yellow/20 rounded-xl overflow-hidden">
                    {["browse", "compare", "bulk", "alerts", "ai"].filter(tab => tab !== activeTab).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setIsTabSelectorOpen(false); // Auto-collapse after selection
                        }}
                        className="w-full flex items-center gap-3 p-4 text-left transition-all duration-200 mobile-interactive touch-target border-b border-elec-yellow/10 last:border-b-0 text-elec-light hover:bg-elec-yellow/10"
                      >
                        {tab === "browse" && <Wrench className="h-4 w-4" />}
                        {tab === "compare" && <Scale className="h-4 w-4" />}
                        {tab === "bulk" && <Calculator className="h-4 w-4" />}
                        {tab === "alerts" && <TrendingUp className="h-4 w-4" />}
                        {tab === "ai" && <Brain className="h-4 w-4" />}
                        <span className="text-sm sm:text-base font-medium">
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
            <TabsList className="flex w-full flex-wrap grid grid-cols-3 lg:grid-cols-5 bg-elec-gray border border-elec-yellow/20 relative z-20 p-[0.3rem] h-fit">
              <TabsTrigger value="browse" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                <Wrench className="h-4 w-4 mr-2" />
                Browse
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                <Scale className="h-4 w-4 mr-2" />
                Compare
              </TabsTrigger>
              <TabsTrigger value="bulk" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                <Calculator className="h-4 w-4 mr-2" />
                Bulk
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                <TrendingUp className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                <Brain className="h-4 w-4 mr-2" />
                AI
              </TabsTrigger>
            </TabsList>
          )}

          {/* Search and filters for Browse tab */}
          {activeTab === "browse" && (
            <div className="flex flex-col sm:flex-row gap-3 items-start mt-4">
              <div className="flex-1">
                <MobileInputWrapper
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  icon={<Search className="h-4 w-4" />}
                  hint="Search by tool name, supplier, or description"
                />
              </div>
              <div className="flex items-end">
                <ToolRefreshButton
                  isFetching={false}
                  lastFetchTime={0}
                  onRefresh={refetch}
                  categoryName={categoryName}
                  className="shrink-0"
                />
              </div>
            </div>
          )}

          {/* Quick Compare Bar */}
          {selectedItems.length > 0 && (
            <Card className="bg-elec-yellow/10 border-elec-yellow/30 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-elec-yellow" />
                    <span className="font-medium">{selectedItems.length}/3 tools selected for comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setActiveTab("compare")}
                      variant="gold"
                    >
                      Compare Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearComparison}
                      className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab Content */}
          <TabsContent value="browse" className="space-y-6 mt-6">
            {/* Loading state */}
            {isLoading && (
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
                    <p className="text-elec-yellow font-medium">Loading {meta.title.toLowerCase()}...</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Fetching data from comprehensive tools database
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tools grid */}
            {!isLoading && (
              <>
                {filteredTools.length === 0 ? (
                  <Card className="border-elec-yellow/20 bg-elec-gray">
                    <CardContent className="p-6 text-center space-y-3">
                      <p className="text-muted-foreground">
                        {searchTerm ? 
                          `No tools found matching "${searchTerm}"` :
                          `No tools found in ${meta.title.toLowerCase()} category`
                        }
                      </p>
                      {searchTerm && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchTerm("")}
                        >
                          Clear search
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <section aria-label={`${meta.title} products`} className="space-y-4">
                    <div className={`grid gap-6 pb-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
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
            <ToolPriceComparison 
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
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Brain className="h-8 w-8 text-elec-yellow" />
                  <h3 className="text-xl font-semibold">AI-Powered Tool Insights</h3>
                </div>
                <p className="text-muted-foreground">
                  Get personalised recommendations, value analysis, and purchase suggestions for {meta.title.toLowerCase()}.
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setActiveTab("compare")}
                >
                  Try AI Recommendations in Compare
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default EnhancedToolCategoryDisplay;