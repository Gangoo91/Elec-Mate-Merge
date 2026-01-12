import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

import { useCategoryMaterials } from "@/hooks/useCategoryMaterials";
import { MATERIAL_CATEGORY_META } from "@/components/electrician-materials/materialCategoryStyleUtils";

// New premium components
import PremiumMaterialPageHeader from "@/components/electrician-materials/PremiumMaterialPageHeader";
import MaterialSlideOutFilters, { MaterialFilterState } from "@/components/electrician-materials/MaterialSlideOutFilters";
import EnhancedMaterialsGrid from "@/components/electrician-materials/EnhancedMaterialsGrid";
import InlineMaterialCompareSection from "@/components/electrician-materials/InlineMaterialCompareSection";
import InlineMaterialAIInsightsSection from "@/components/electrician-materials/InlineMaterialAIInsightsSection";
import MaterialTips from "@/components/electrician-materials/MaterialTips";

const CategoryMaterials = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();

  // Redirect tools category to dedicated tools page
  if (categoryId === "tools") {
    return <Navigate to="/electrician/tools" replace />;
  }

  const meta = MATERIAL_CATEGORY_META[categoryId] || {
    title: "Materials",
    description: "Browse curated products by category",
  };

  // Use comprehensive materials data
  const { materials, isLoading, error, refetch } = useCategoryMaterials(categoryId);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<MaterialFilterState>({
    brands: [],
    priceRanges: [],
    availability: [],
    suppliers: [],
  });
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([]);

  // Helper function to parse price string to number
  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[£,]/g, "")) || 0;
  };

  // Helper function to check if price falls within range
  const priceInRange = (price: number, range: string): boolean => {
    switch (range) {
      case "Under £50":
        return price < 50;
      case "£50 - £200":
        return price >= 50 && price < 200;
      case "£200 - £500":
        return price >= 200 && price < 500;
      case "£500 - £1000":
        return price >= 500 && price < 1000;
      case "£1000 - £2500":
        return price >= 1000 && price < 2500;
      case "Over £2500":
        return price >= 2500;
      default:
        return true;
    }
  };

  // Filter materials
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];

    let result = materials;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (material) =>
          material.name?.toLowerCase().includes(term) ||
          material.supplier?.toLowerCase().includes(term) ||
          material.category?.toLowerCase().includes(term)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((material) => {
        const firstWord = material.name?.split(" ")[0];
        return (
          filters.brands.includes(firstWord) ||
          filters.brands.includes(material.category)
        );
      });
    }

    // Price range filter
    if (filters.priceRanges.length > 0) {
      result = result.filter((material) => {
        const price = parsePrice(material.price);
        return filters.priceRanges.some((range) => priceInRange(price, range));
      });
    }

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter(
        (material) =>
          material.stockStatus && filters.availability.includes(material.stockStatus)
      );
    }

    // Supplier filter
    if (filters.suppliers.length > 0) {
      result = result.filter(
        (material) =>
          material.supplier && filters.suppliers.includes(material.supplier)
      );
    }

    return result;
  }, [materials, searchTerm, filters]);

  // Compare handlers
  const handleAddToCompare = (item: any) => {
    if (selectedMaterials.length >= 4) return;
    const isAlreadySelected = selectedMaterials.find(
      (selected) =>
        (selected.id && item.id && selected.id === item.id) ||
        (selected.name === item.name && !selected.id && !item.id)
    );
    if (!isAlreadySelected) {
      setSelectedMaterials((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setSelectedMaterials((prev) =>
      prev.filter((item) => (item.id ? String(item.id) !== itemId : item.name !== itemId))
    );
  };

  const clearComparison = () => {
    setSelectedMaterials([]);
  };

  // Active filters count
  const activeFiltersCount =
    filters.brands.length +
    filters.priceRanges.length +
    filters.availability.length +
    filters.suppliers.length;

  // SEO metadata
  const pageTitle = `${meta.title} | ElecMate Electrical Materials`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant.`;

  // Error state
  if (error) {
    return (
      <main className="space-y-6 animate-fade-in">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>

        <div className="text-center space-y-4 py-12">
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
    <div className="min-h-screen bg-background pt-safe pb-safe">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/* Premium Sticky Header with Search */}
      <PremiumMaterialPageHeader
        categoryId={categoryId}
        categoryName={meta.title}
        materialCount={filteredMaterials.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setFiltersOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* Loading State */}
        {isLoading && (
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-primary font-medium">
                  Loading {meta.title.toLowerCase()}...
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Fetching data from comprehensive materials database
              </p>
            </CardContent>
          </Card>
        )}

        {/* Product Grid */}
        {!isLoading && (
          <section>
            <EnhancedMaterialsGrid
              materials={filteredMaterials}
              searchTerm={searchTerm}
              filters={filters}
              isLoading={isLoading}
              onAddToCompare={handleAddToCompare}
              onRemoveFromCompare={handleRemoveFromCompare}
              selectedItems={selectedMaterials}
              isCompareDisabled={selectedMaterials.length >= 4}
            />
          </section>
        )}

        {/* Inline Compare Section */}
        {selectedMaterials.length > 0 && (
          <InlineMaterialCompareSection
            items={selectedMaterials}
            onRemoveItem={handleRemoveFromCompare}
            onClearAll={clearComparison}
          />
        )}

        {/* AI Insights Section */}
        <InlineMaterialAIInsightsSection
          materials={materials || []}
          categoryName={meta.title}
        />

        {/* Material Tips */}
        <MaterialTips />
      </main>

      {/* Slide-out Filter Panel */}
      <MaterialSlideOutFilters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        materials={materials || []}
      />
    </div>
  );
};

export default CategoryMaterials;
