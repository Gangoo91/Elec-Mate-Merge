import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SortAsc, SortDesc, Grid, List, Loader2, Package } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";
import PremiumToolCard from "./PremiumToolCard";
import ToolDetailModal from "./ToolDetailModal";
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
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (tool: ToolItem) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

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
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
          <Package className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading tools...</p>
          <p className="text-muted-foreground text-sm">Fetching products from suppliers</p>
        </div>
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
              className="h-10 w-10 px-0 touch-manipulation active:scale-[0.98]"
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "gold" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-10 w-10 px-0 touch-manipulation active:scale-[0.98]"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-48 h-11 rounded-lg bg-elec-card/50 border-elec-yellow/20 text-elec-light touch-manipulation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50 bg-elec-card border-elec-yellow/20 shadow-lg">
              <SelectItem value="relevance" className="py-1.5">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-3.5 w-3.5" />
                  <span className="text-sm">Relevance</span>
                </div>
              </SelectItem>
              <SelectItem value="price-low" className="py-1.5">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-3.5 w-3.5" />
                  <span className="text-sm">Price: Low to High</span>
                </div>
              </SelectItem>
              <SelectItem value="price-high" className="py-1.5">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-3.5 w-3.5" />
                  <span className="text-sm">Price: High to Low</span>
                </div>
              </SelectItem>
              <SelectItem value="name" className="py-1.5">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-3.5 w-3.5" />
                  <span className="text-sm">Name A-Z</span>
                </div>
              </SelectItem>
              <SelectItem value="supplier" className="py-1.5">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-3.5 w-3.5" />
                  <span className="text-sm">Supplier</span>
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
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-enter"
            : "space-y-4 stagger-enter"
          }>
            {currentTools.map((tool) => (
              <PremiumToolCard
                key={tool.id || tool.name}
                item={tool}
                onAddToCompare={onAddToCompare}
                onRemoveFromCompare={onRemoveFromCompare}
                isSelected={selectedItems.some(item => item.id === tool.id)}
                isCompareDisabled={isCompareDisabled}
                onCardClick={handleCardClick}
                variant="default"
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

          {/* Tool Detail Modal */}
          <ToolDetailModal
            tool={selectedTool}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            isSelected={selectedTool ? selectedItems.some(item => item.id === selectedTool.id) : false}
            isCompareDisabled={isCompareDisabled}
          />
        </>
      )}
    </div>
  );
};

export default EnhancedProductGrid;