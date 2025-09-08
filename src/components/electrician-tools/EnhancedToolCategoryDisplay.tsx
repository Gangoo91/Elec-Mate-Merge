import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wrench, ArrowLeft, Filter, RefreshCw, Loader2, Search, Scale, TrendingUp, Calculator, AlertTriangle, Brain, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import ToolCard from "@/components/electrician-tools/ToolCard";
import ToolPriceComparison from "@/components/electrician-tools/ToolPriceComparison";
import BulkToolPricingCalculator from "@/components/electrician-tools/BulkToolPricingCalculator";
import ToolPriceHistoryAlerts from "@/components/electrician-tools/ToolPriceHistoryAlerts";
import { ToolAIInsights } from "./ToolAIInsights";
import ToolRefreshButton from "@/components/electrician-tools/ToolRefreshButton";
import ToolSearchWidget from "./ToolSearchWidget";
import AdvancedToolSearch from "./AdvancedToolSearch";
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

  // Enhanced filter state for the tools
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedItems, setSelectedItems] = useState<ToolItem[]>([]);
  const [isTabSelectorOpen, setIsTabSelectorOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all");
  const [selectedPowerSource, setSelectedPowerSource] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [stockStatusFilter, setStockStatusFilter] = useState<string>("all");
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

  // Enhanced filter and search the tools
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

    // Apply advanced filters
    if (selectedSupplier !== "all") {
      categoryFiltered = categoryFiltered.filter(tool => 
        tool.supplier?.toLowerCase() === selectedSupplier.toLowerCase()
      );
    }

    if (selectedBrand !== "all") {
      categoryFiltered = categoryFiltered.filter(tool => 
        tool.name?.toLowerCase().includes(selectedBrand.toLowerCase())
      );
    }

    if (selectedPowerSource !== "all") {
      if (selectedPowerSource === "cordless") {
        categoryFiltered = categoryFiltered.filter(tool => 
          tool.name?.toLowerCase().includes("cordless") || 
          tool.name?.toLowerCase().includes("18v") ||
          tool.name?.toLowerCase().includes("12v") ||
          tool.description?.toLowerCase().includes("battery")
        );
      } else if (selectedPowerSource === "corded") {
        categoryFiltered = categoryFiltered.filter(tool => 
          !tool.name?.toLowerCase().includes("cordless") && 
          !tool.name?.toLowerCase().includes("18v") &&
          !tool.name?.toLowerCase().includes("12v")
        );
      }
    }

    if (stockStatusFilter !== "all") {
      categoryFiltered = categoryFiltered.filter(tool => 
        tool.stockStatus?.toLowerCase() === stockStatusFilter.toLowerCase()
      );
    }

    // Apply price range filter
    categoryFiltered = categoryFiltered.filter(tool => {
      const price = parseFloat(tool.price?.replace(/[£,]/g, '') || '0');
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    return categoryFiltered;
  }, [allTools, categoryName, searchTerm, selectedSupplier, selectedBrand, selectedPowerSource, stockStatusFilter, priceRange]);

  // Get unique values for filter options
  const supplierOptions = useMemo(() => {
    const suppliers = new Set(allTools?.map(tool => tool.supplier).filter(Boolean) || []);
    return Array.from(suppliers);
  }, [allTools]);

  const brandOptions = useMemo(() => {
    const brands = new Set();
    allTools?.forEach(tool => {
      const name = tool.name?.toLowerCase() || '';
      if (name.includes('dewalt')) brands.add('DeWalt');
      if (name.includes('bosch')) brands.add('Bosch');
      if (name.includes('makita')) brands.add('Makita');
      if (name.includes('milwaukee')) brands.add('Milwaukee');
      if (name.includes('fluke')) brands.add('Fluke');
      if (name.includes('kewtech')) brands.add('Kewtech');
    });
    return Array.from(brands) as string[];
  }, [allTools]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSupplier("all");
    setSelectedBrand("all");
    setSelectedPowerSource("all");
    setStockStatusFilter("all");
    setPriceRange([0, 1000]);
  };

  const activeFilterCount = [
    searchTerm ? 1 : 0,
    selectedSupplier !== "all" ? 1 : 0,
    selectedBrand !== "all" ? 1 : 0,
    selectedPowerSource !== "all" ? 1 : 0,
    stockStatusFilter !== "all" ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0
  ].reduce((sum, count) => sum + count, 0);

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
          <p className="mobile-text text-text-muted leading-relaxed pl-9 sm:pl-10 lg:pl-11">{meta.description}</p>
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

          {/* Enhanced Search and filters for Browse tab */}
          {activeTab === "browse" && (
            <>
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="shrink-0 touch-target bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 relative"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {activeFilterCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-elec-yellow text-elec-dark text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                  <ToolRefreshButton
                    isFetching={isLoading}
                    lastFetchTime={0}
                    onRefresh={refetch}
                    categoryName={categoryName}
                    className="shrink-0 touch-target"
                  />
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <Card className="mobile-card bg-elec-card/50 border-elec-yellow/20 mt-4">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-elec-light">Advanced Filters</h3>
                      {activeFilterCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                          className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                        >
                          Reset ({activeFilterCount})
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Supplier Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-elec-light">Supplier</label>
                        <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                          <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                            <SelectValue placeholder="All suppliers" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/30 z-50">
                            <SelectItem value="all">All Suppliers</SelectItem>
                            {supplierOptions.map(supplier => (
                              <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Brand Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-elec-light">Brand</label>
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                          <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                            <SelectValue placeholder="All brands" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/30 z-50">
                            <SelectItem value="all">All Brands</SelectItem>
                            {brandOptions.map(brand => (
                              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Power Source Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-elec-light">Power Source</label>
                        <Select value={selectedPowerSource} onValueChange={setSelectedPowerSource}>
                          <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                            <SelectValue placeholder="All power sources" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/30 z-50">
                            <SelectItem value="all">All Power Sources</SelectItem>
                            <SelectItem value="cordless">Cordless/Battery</SelectItem>
                            <SelectItem value="corded">Corded/Mains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Stock Status Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-elec-light">Stock Status</label>
                        <Select value={stockStatusFilter} onValueChange={setStockStatusFilter}>
                          <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                            <SelectValue placeholder="All stock levels" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/30 z-50">
                            <SelectItem value="all">All Stock Levels</SelectItem>
                            <SelectItem value="in stock">In Stock</SelectItem>
                            <SelectItem value="low stock">Low Stock</SelectItem>
                            <SelectItem value="out of stock">Out of Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Price Range Slider */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-elec-light">
                        Price Range: £{priceRange[0]} - £{priceRange[1]}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                    </div>

                    {/* Tool Search Widget */}
                    <div className="pt-4 border-t border-elec-yellow/20">
                      <ToolSearchWidget onSearch={(query, filters, location) => {
                        setSearchTerm(query);
                        // Handle additional filters from widget
                      }} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
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
                      <p className="mobile-text text-text-muted mb-4">
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
                          className="touch-target mobile-interactive bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                        >
                          Clear search
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <section aria-label={`${meta.title} products`} className="mobile-section-spacing">
                    <div className="mobile-grid-responsive pb-6">
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