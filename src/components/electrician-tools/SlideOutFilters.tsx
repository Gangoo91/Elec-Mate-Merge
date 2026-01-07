import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  SlidersHorizontal,
  Tag,
  Store,
  Package,
  Check,
} from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

export interface FilterState {
  brands: string[];
  priceRanges: string[];
  availability: string[];
  suppliers: string[];
}

interface SlideOutFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  tools: ToolItem[];
}

const PRICE_RANGES = [
  "Under £25",
  "£25 - £50",
  "£50 - £100",
  "£100 - £250",
  "£250 - £500",
  "Over £500",
];

const AVAILABILITY_OPTIONS = ["In Stock", "Low Stock"];

const SlideOutFilters = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  tools,
}: SlideOutFiltersProps) => {
  // Extract unique brands and suppliers from tools
  const { brands, suppliers } = useMemo(() => {
    const brandSet = new Set<string>();
    const supplierSet = new Set<string>();

    tools.forEach((tool) => {
      // Extract brand from first word of name or brand field
      if (tool.brand) {
        brandSet.add(tool.brand);
      } else {
        const firstWord = tool.name?.split(" ")[0];
        if (firstWord && firstWord.length > 2) {
          brandSet.add(firstWord);
        }
      }

      if (tool.supplier) {
        supplierSet.add(tool.supplier);
      }
    });

    return {
      brands: Array.from(brandSet).sort().slice(0, 10),
      suppliers: Array.from(supplierSet).sort(),
    };
  }, [tools]);

  const activeFiltersCount =
    filters.brands.length +
    filters.priceRanges.length +
    filters.availability.length +
    filters.suppliers.length;

  const toggleFilter = (
    category: keyof FilterState,
    value: string
  ) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFiltersChange({ ...filters, [category]: updated });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      priceRanges: [],
      availability: [],
      suppliers: [],
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[360px] bg-background border-l border-border
                    transform transition-transform duration-300 ease-ios-spring
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Filters</h2>
              {activeFiltersCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {activeFiltersCount} active
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Filter Content */}
        <ScrollArea className="h-[calc(100%-140px)]">
          <div className="p-4 space-y-6">
            {/* Price Range */}
            <FilterSection
              icon={Tag}
              title="Price Range"
              options={PRICE_RANGES}
              selected={filters.priceRanges}
              onToggle={(value) => toggleFilter("priceRanges", value)}
            />

            {/* Availability */}
            <FilterSection
              icon={Package}
              title="Availability"
              options={AVAILABILITY_OPTIONS}
              selected={filters.availability}
              onToggle={(value) => toggleFilter("availability", value)}
            />

            {/* Suppliers */}
            {suppliers.length > 0 && (
              <FilterSection
                icon={Store}
                title="Supplier"
                options={suppliers}
                selected={filters.suppliers}
                onToggle={(value) => toggleFilter("suppliers", value)}
              />
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <FilterSection
                icon={Tag}
                title="Brand"
                options={brands}
                selected={filters.brands}
                onToggle={(value) => toggleFilter("brands", value)}
              />
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              disabled={activeFiltersCount === 0}
              className="flex-1 h-12 rounded-xl border-white/10 hover:bg-white/10"
            >
              Clear All
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Filter Section Component
interface FilterSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

const FilterSection = ({
  icon: Icon,
  title,
  options,
  selected,
  onToggle,
}: FilterSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {selected.length > 0 && (
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30 text-xs ml-auto"
          >
            {selected.length}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <label
              key={option}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                         ${
                           isSelected
                             ? "bg-primary/10 border border-primary/30"
                             : "bg-white/5 border border-white/10 hover:bg-white/10"
                         }`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(option)}
                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span
                className={`text-sm ${
                  isSelected ? "text-white font-medium" : "text-white/80"
                }`}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SlideOutFilters;
