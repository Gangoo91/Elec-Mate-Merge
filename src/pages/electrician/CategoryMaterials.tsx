import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ArrowLeft, Filter, RefreshCw, Loader2, Search, Scale, TrendingUp, Calculator, AlertTriangle, Brain } from "lucide-react";
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import BulkPricingCalculator from "@/components/electrician-materials/BulkPricingCalculator";
import PriceHistoryAlerts from "@/components/electrician-materials/PriceHistoryAlerts";
import { useCategoryMaterials } from "@/hooks/useCategoryMaterials";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  cables: {
    title: "Cables & Wiring",
    description: "Twin & Earth, SWA, flex, data and control cabling"
  },
  components: {
    title: "Electrical Components",
    description: "Consumer units, MCBs, RCDs, isolators and accessories"
  },
  protection: {
    title: "Protection Equipment",
    description: "Earthing, surge protection and circuit protection"
  },
  accessories: {
    title: "Installation Accessories",
    description: "Junction boxes, glands, trunking and fixings"
  },
  lighting: {
    title: "Lighting Solutions",
    description: "LED downlights, battens, emergency and controls"
  },
  tools: {
    title: "Electrical Tools",
    description: "Testers, hand tools and power tools for electricians"
  }
};

const CategoryMaterials = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const meta = CATEGORY_META[categoryId] || { title: "Materials", description: "Browse curated products by category" };
  
  // Use comprehensive materials data
  const { materials, categoryData, isLoading, error, refetch } = useCategoryMaterials(categoryId);

  // Filter state for the materials
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  
  // Filter and search the materials
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    
    let filtered = materials;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [materials, searchTerm]);

  const pageTitle = `${meta.title} | ElecMate Electrical Materials`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant guidance.`.slice(0, 160);

  const handleAddToCompare = (item: any) => {
    if (selectedItems.length >= 3) return;
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
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
          <p className="text-red-400">Failed to load materials data</p>
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
    <main className="space-y-6 animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <Link to="/materials">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs sm:text-sm h-10">
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to Materials
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            {meta.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 text-left pl-8 sm:pl-10">{meta.description}</p>
          
          {categoryData && (
            <div className="flex items-center gap-4 mt-3 pl-8 sm:pl-10">
              <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                {categoryData.productCount} products
              </Badge>
              {categoryData.priceRange && (
                <span className="text-sm text-muted-foreground">
                  Price range: <span className="text-elec-yellow">{categoryData.priceRange}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Advanced Features Navigation */}
      <section className="space-y-4 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
          <TabsList className="flex w-full flex-wrap justify-center lg:grid lg:grid-cols-5 bg-elec-gray border border-elec-yellow/20 relative z-20 gap-2 p-2">
            <TabsTrigger value="browse" className="flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm min-w-fit data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Package className="h-4 w-4 mr-2" />
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

          {/* Search and filters for Browse tab */}
          {activeTab === "browse" && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </Button>
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
                    <span className="font-medium">{selectedItems.length}/3 items selected for comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setActiveTab("compare")}
                      className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                    >
                      Compare Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearComparison}
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
                    Fetching data from comprehensive materials database
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Materials grid */}
            {!isLoading && (
              <>
                {filteredMaterials.length === 0 ? (
                  <Card className="border-elec-yellow/20 bg-elec-gray">
                    <CardContent className="p-6 text-center space-y-3">
                      <p className="text-muted-foreground">
                        {searchTerm ? 
                          `No materials found matching "${searchTerm}"` :
                          `No materials found in ${meta.title.toLowerCase()} category`
                        }
                      </p>
                      {searchTerm && (
                        <Button
                          variant="outline"
                          onClick={() => setSearchTerm("")}
                        >
                          Clear search
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <section aria-label={`${meta.title} products`} className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Showing {filteredMaterials.length} {filteredMaterials.length === 1 ? 'material' : 'materials'}
                      </span>
                      <span>
                        📡 Live data from comprehensive materials database
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredMaterials.map((item, index) => (
                        <MaterialCard 
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
            <MaterialPriceComparison 
              initialQuery={categoryId}
              selectedItems={selectedItems}
              onClearSelection={clearComparison}
            />
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6 mt-6">
            <BulkPricingCalculator categoryId={categoryId} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6 mt-6">
            <PriceHistoryAlerts categoryId={categoryId} />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 mt-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Brain className="h-8 w-8 text-elec-yellow" />
                  <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                </div>
                <p className="text-muted-foreground">
                  Get personalised recommendations, value analysis, and purchase suggestions for {meta.title.toLowerCase()}.
                </p>
                <Button
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
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

export default CategoryMaterials;