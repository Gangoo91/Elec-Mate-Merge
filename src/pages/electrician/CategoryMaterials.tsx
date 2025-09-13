import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ArrowLeft, RefreshCw, Loader2, Scale, Brain } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import BulkPricingCalculator from "@/components/electrician-materials/BulkPricingCalculator";
import PriceHistoryAlerts from "@/components/electrician-materials/PriceHistoryAlerts";
import RefreshButton from "@/components/electrician-materials/RefreshButton";
import MaterialSmartSearch from "@/components/electrician-materials/MaterialSmartSearch";
import MaterialFilters from "@/components/electrician-materials/MaterialFilters";
import MaterialsMoreTools from "@/components/electrician-materials/MaterialsMoreTools";
import MaterialDealsOfTheDay from "@/components/electrician-materials/MaterialDealsOfTheDay";
import MaterialTopDiscounts from "@/components/electrician-materials/MaterialTopDiscounts";
import { useCategoryMaterials } from "@/hooks/useCategoryMaterials";
import { useMaterialsDeals } from "@/hooks/useMaterialsDeals";

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
  }
};

const CategoryMaterials = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  
  // Redirect tools category to dedicated tools page
  if (categoryId === "tools") {
    return <Navigate to="/electrician/tools" replace />;
  }
  
  const meta = CATEGORY_META[categoryId] || { title: "Materials", description: "Browse curated products by category" };
  
  // Use comprehensive materials data
  const { materials, categoryData, isLoading, isRefetching, error, refetch } = useCategoryMaterials(categoryId);

  // Enhanced filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'browse' | 'compare' | 'bulk' | 'alerts' | 'ai'>('browse');
  const isMobile = useIsMobile();
  
  // Get deals data
  const { dealOfTheDay, topDiscounts } = useMaterialsDeals(materials || []);
  
  // Enhanced filtering logic
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    
    let filtered = materials;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(material => {
        return activeFilters.every(filterId => {
          // Price filters
          if (filterId.startsWith('price-')) {
            const price = parseFloat(material.price.replace(/[£,]/g, ''));
            if (filterId === 'price-0-50') return price <= 50;
            if (filterId === 'price-50-200') return price > 50 && price <= 200;
            if (filterId === 'price-200-plus') return price > 200;
          }
          
          // Availability filters
          if (filterId === 'in-stock') return material.stockStatus === 'In Stock';
          if (filterId === 'low-stock') return material.stockStatus === 'Low Stock';
          if (filterId === 'on-sale') return material.isOnSale === true;
          
          // Supplier filters
          if (filterId.startsWith('supplier-')) {
            const supplierName = filterId.replace('supplier-', '').replace(/-/g, ' ');
            return material.supplier?.toLowerCase().includes(supplierName);
          }
          
          // Brand/category filters
          if (filterId.startsWith('brand-')) {
            const brandName = filterId.replace('brand-', '').replace(/-/g, ' ');
            return material.category?.toLowerCase().includes(brandName);
          }
          
          return true;
        });
      });
    }
    
    return filtered;
  }, [materials, searchTerm, activeFilters]);

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
    <main className="mobile-card-spacing animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="mobile-card-spacing">
        <div className="flex items-center justify-between mb-4">
          <Link to="/electrician/materials">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Materials
            </Button>
          </Link>
          <MaterialsMoreTools
            selectedCount={selectedItems.length}
            onCompareClick={() => setCurrentView('compare')}
            onBulkPricingClick={() => setCurrentView('bulk')}
            onPriceAlertsClick={() => setCurrentView('alerts')}
            onAIInsightsClick={() => setCurrentView('ai')}
          />
        </div>
        <div className="space-y-3">
          <h1 className="mobile-heading font-bold tracking-tight flex items-center gap-2">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0">{meta.title}</span>
          </h1>
          <p className="mobile-text text-muted-foreground leading-relaxed pl-7 sm:pl-8 lg:pl-10">{meta.description}</p>
        </div>
      </header>

      {/* Enhanced Browse Section - Main Focus */}
      {currentView === 'browse' && (
        <section className="space-y-6">
          {/* Deals Integration */}
          {dealOfTheDay && (
            <MaterialDealsOfTheDay deal={dealOfTheDay} />
          )}
          
          {topDiscounts.length > 0 && (
            <MaterialTopDiscounts deals={topDiscounts} />
          )}

          {/* Smart Search + Filters */}
          <div className="space-y-4">
            <MaterialSmartSearch
              value={searchTerm}
              onChange={setSearchTerm}
              materials={materials || []}
              placeholder="Search materials, suppliers, categories..."
            />
            
            <MaterialFilters
              materials={materials || []}
              onFiltersChange={setActiveFilters}
              activeFilters={activeFilters}
            />
          </div>

          {/* Quick Compare Bar */}
          {selectedItems.length > 0 && (
            <Card className="bg-elec-yellow/10 border-elec-yellow/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-elec-yellow" />
                    <span className="font-medium">{selectedItems.length}/3 items selected for comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setCurrentView("compare")}
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

          {/* Category Items - Main Focus */}
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

          {!isLoading && (
            <>
              {filteredMaterials.length === 0 ? (
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardContent className="p-6 text-center space-y-3">
                    <p className="text-muted-foreground">
                      {searchTerm || activeFilters.length > 0
                        ? `No materials found matching your criteria`
                        : `No materials found in ${meta.title.toLowerCase()} category`
                      }
                    </p>
                    {(searchTerm || activeFilters.length > 0) && (
                      <div className="flex gap-2 justify-center">
                        {searchTerm && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSearchTerm("")}
                          >
                            Clear search
                          </Button>
                        )}
                        {activeFilters.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveFilters([])}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <section aria-label={`${meta.title} products`} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredMaterials.length} product{filteredMaterials.length !== 1 ? 's' : ''}
                      {(searchTerm || activeFilters.length > 0) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSearchTerm("");
                            setActiveFilters([]);
                          }}
                          className="ml-2 text-xs text-elec-yellow hover:bg-elec-yellow/10"
                        >
                          Clear all
                        </Button>
                      )}
                    </p>
                    <RefreshButton
                      isFetching={isRefetching}
                      lastFetchTime={0}
                      onRefresh={refetch}
                      categoryId={categoryId}
                      className="shrink-0"
                    />
                  </div>
                  
                  <div className={`grid gap-6 pb-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
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
        </section>
      )}

      {/* Advanced Features - Moved to More Tools */}
      {currentView === 'compare' && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('browse')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
          <MaterialPriceComparison 
            initialQuery={categoryId}
            selectedItems={selectedItems}
            onClearSelection={clearComparison}
          />
        </section>
      )}

      {currentView === 'bulk' && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('browse')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
          <BulkPricingCalculator categoryId={categoryId} products={materials} />
        </section>
      )}

      {currentView === 'alerts' && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('browse')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
          <PriceHistoryAlerts categoryId={categoryId} />
        </section>
      )}

      {currentView === 'ai' && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('browse')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </div>
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
                variant="gold"
                size="sm"
                onClick={() => setCurrentView("compare")}
              >
                Try AI Recommendations in Compare
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
};

export default CategoryMaterials;