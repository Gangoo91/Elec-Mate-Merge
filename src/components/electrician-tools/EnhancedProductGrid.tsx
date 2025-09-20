import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SortAsc, SortDesc, Grid, List, Loader2 } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";
import ToolCard from "./ToolCard";
import { FilterState } from "./ProductFilters";
import { usePagination } from "@/hooks/usePagination";
import ProductPagination from "@/components/ui/product-pagination";

interface EnhancedProductGridProps {
  tools: ToolItem[];
  searchTerm: string;
  filters: FilterState;
  isLoading?: boolean;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  selectedItems?: ToolItem[];
  isCompareDisabled?: boolean;
}

type SortOption = "relevance" | "price-low" | "price-high" | "name" | "supplier";
type ViewMode = "grid" | "list";

const EnhancedProductGrid = ({
  tools,
  searchTerm,
  filters,
  isLoading = false,
  onAddToCompare,
  onRemoveFromCompare,
  selectedItems = [],
  isCompareDisabled = false
}: EnhancedProductGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Apply filters and search
  const filteredTools = useMemo(() => {
    let result = tools;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.highlights?.some(highlight => 
          typeof highlight === 'string' && highlight.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(tool => {
        const firstWord = tool.name.split(' ')[0];
        return filters.brands.includes(firstWord);
      });
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      result = result.filter(tool => {
        const priceMatch = tool.price?.match(/£([\d,]+\.?\d*)/);
        if (!priceMatch) return false;
        
        const price = parseFloat(priceMatch[1].replace(',', ''));
        
        return filters.priceRanges.some(range => {
          switch (range) {
            case "Under £25": return price < 25;
            case "£25 - £50": return price >= 25 && price <= 50;
            case "£50 - £100": return price >= 50 && price <= 100;
            case "£100 - £250": return price >= 100 && price <= 250;
            case "£250 - £500": return price >= 250 && price <= 500;
            case "Over £500": return price > 500;
            default: return false;
          }
        });
      });
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      result = result.filter(tool => 
        tool.stockStatus && filters.availability.includes(tool.stockStatus)
      );
    }

    // Apply supplier filter
    if (filters.suppliers.length > 0) {
      result = result.filter(tool =>
        tool.supplier && filters.suppliers.includes(tool.supplier)
      );
    }

    return result;
  }, [tools, searchTerm, filters]);

  // Apply sorting
  const sortedTools = useMemo(() => {
    const sorted = [...filteredTools];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[£,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[£,]/g, '') || '0');
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[£,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[£,]/g, '') || '0');
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
  }, [filteredTools, sortBy]);

  // Pagination
  const {
    currentItems: currentTools,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage
  } = usePagination<ToolItem>({
    items: sortedTools,
    itemsPerPage: 12
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-elec-light">Loading tools...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-pagination-target>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-elec-light">
          <span className="font-semibold">{totalItems}</span> tools found
          {searchTerm && (
            <span className="text-text-muted"> for "{searchTerm}"</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center border border-elec-yellow/20 rounded-lg p-1 bg-elec-card/30">
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
            <SelectTrigger className="w-48 bg-elec-card/50 border-elec-yellow/20 text-elec-light">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50 bg-elec-card border-elec-yellow/20 shadow-lg">
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
        <Card className="bg-elec-card/30 border-elec-yellow/20">
          <CardContent className="p-8 text-center">
            <p className="text-elec-light mb-2">No tools found matching your criteria</p>
            <p className="text-text-muted text-sm">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {currentTools.map((tool) => (
              <ToolCard
                key={tool.id || tool.name}
                item={tool}
                onAddToCompare={onAddToCompare}
                onRemoveFromCompare={onRemoveFromCompare}
                isSelected={selectedItems.some(item => item.id === tool.id)}
                isCompareDisabled={isCompareDisabled}
              />
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
            itemType="tools"
          />
        </>
      )}
    </div>
  );
};

export default EnhancedProductGrid;