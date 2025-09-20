import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SortAsc, SortDesc, Grid, List, Loader2 } from "lucide-react";
import MaterialCard from "./MaterialCard";
import MaterialListCard from "./MaterialListCard";
import { MaterialFilterState } from "./MaterialFilters";
import { MaterialItem } from "@/hooks/useToolsForMaterials";
import { usePagination } from "@/hooks/usePagination";
import ProductPagination from "@/components/ui/product-pagination";

interface EnhancedMaterialsGridProps {
  materials: MaterialItem[];
  searchTerm: string;
  filters: MaterialFilterState;
  isLoading?: boolean;
  onAddToCompare?: (item: MaterialItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  selectedItems?: MaterialItem[];
  isCompareDisabled?: boolean;
}

type SortOption = "relevance" | "price-low" | "price-high" | "name" | "supplier";
type ViewMode = "grid" | "list";

const EnhancedMaterialsGrid = ({
  materials,
  searchTerm,
  filters,
  isLoading = false,
  onAddToCompare,
  onRemoveFromCompare,
  selectedItems = [],
  isCompareDisabled = false
}: EnhancedMaterialsGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Helper function to parse price
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/£([\d,]+\.?\d*)/);
    if (!match) return 0;
    return parseFloat(match[1].replace(',', ''));
  };

  // Helper function to check price range
  const isInPriceRange = (price: number, range: string): boolean => {
    switch (range) {
      case "Under £50": return price < 50;
      case "£50 - £200": return price >= 50 && price <= 200;
      case "£200 - £500": return price >= 200 && price <= 500;
      case "Over £500": return price > 500;
      default: return false;
    }
  };

  // Apply filters and search
  const filteredMaterials = useMemo(() => {
    let result = materials;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(material =>
        material.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.highlights?.some(highlight => 
          typeof highlight === 'string' && highlight.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(material => {
        const firstWord = material.name.split(' ')[0];
        return filters.brands.includes(firstWord);
      });
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      result = result.filter(material => {
        const price = parsePrice(material.price);
        if (price === 0) return false;
        
        return filters.priceRanges.some(range => isInPriceRange(price, range));
      });
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      result = result.filter(material => 
        material.stockStatus && filters.availability.includes(material.stockStatus)
      );
    }

    // Apply supplier filter
    if (filters.suppliers.length > 0) {
      result = result.filter(material =>
        material.supplier && filters.suppliers.includes(material.supplier)
      );
    }

    return result;
  }, [materials, searchTerm, filters]);

  // Apply sorting
  const sortedMaterials = useMemo(() => {
    const sorted = [...filteredMaterials];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceB - priceA;
        });
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "supplier":
        return sorted.sort((a, b) => (a.supplier || '').localeCompare(b.supplier || ''));
      case "relevance":
      default:
        // Sort by relevance: sale items first, then by name
        return sorted.sort((a, b) => {
          if (a.isOnSale && !b.isOnSale) return -1;
          if (!a.isOnSale && b.isOnSale) return 1;
          return a.name.localeCompare(b.name);
        });
    }
  }, [filteredMaterials, sortBy]);

  // Pagination
  const {
    currentItems: currentMaterials,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage
  } = usePagination<MaterialItem>({
    items: sortedMaterials,
    itemsPerPage: 12
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-elec-light">Loading materials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-pagination-target>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-elec-light">
          <span className="font-semibold">{totalItems}</span> materials found
          {searchTerm && (
            <span className="text-text-muted"> for "{searchTerm}"</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center border border-elec-yellow/20 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "gold" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "gold" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-48 border-elec-yellow/20 text-elec-light">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50 border-elec-yellow/20 shadow-lg">
              <SelectItem value="relevance">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Relevance
                </div>
              </SelectItem>
              <SelectItem value="price-low">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-high">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-4 w-4" />
                  Price: High to Low
                </div>
              </SelectItem>
              <SelectItem value="name">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Name A-Z
                </div>
              </SelectItem>
              <SelectItem value="supplier">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  Supplier
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid/List */}
      {totalItems === 0 ? (
        <Card className="border-elec-yellow/20">
          <CardContent className="p-8 text-center">
            <p className="text-elec-light mb-2">No materials found matching your criteria</p>
            <p className="text-text-muted text-sm">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {currentMaterials.map((material, index) => (
              viewMode === "grid" ? (
                <MaterialCard
                  key={`${material.id || material.name}-${material.supplier}-${index}`}
                  item={material}
                  onAddToCompare={onAddToCompare}
                  onRemoveFromCompare={onRemoveFromCompare}
                  isSelected={selectedItems.some(item => 
                    (item.id && material.id && item.id === material.id) ||
                    (item.name === material.name && !item.id && !material.id)
                  )}
                  isCompareDisabled={isCompareDisabled}
                />
              ) : (
                <MaterialListCard
                  key={`${material.id || material.name}-${material.supplier}-${index}`}
                  item={material}
                  onAddToCompare={onAddToCompare}
                  onRemoveFromCompare={onRemoveFromCompare}
                  isSelected={selectedItems.some(item => 
                    (item.id && material.id && item.id === material.id) ||
                    (item.name === material.name && !item.id && !material.id)
                  )}
                  isCompareDisabled={isCompareDisabled}
                />
              )
            ))}
          </div>

          {/* Pagination */}
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            itemType="materials"
          />
        </>
      )}
    </div>
  );
};

export default EnhancedMaterialsGrid;