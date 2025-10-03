import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Filter, ChevronDown, X } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

export interface FilterState {
  brands: string[];
  priceRanges: string[];
  availability: string[];
  suppliers: string[];
}

interface ProductFiltersProps {
  tools: ToolItem[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const ProductFilters = ({ tools, filters, onFiltersChange }: ProductFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values from tools
  const getUniqueValues = () => {
    const brands = new Set<string>();
    const suppliers = new Set<string>();
    const availability = new Set<string>();

    tools.forEach(tool => {
      // Extract brand from tool name (first word typically)
      const firstWord = tool.name.split(' ')[0];
      if (firstWord && firstWord.length > 2) {
        brands.add(firstWord);
      }

      if (tool.supplier) {
        suppliers.add(tool.supplier);
      }

      if (tool.stockStatus) {
        availability.add(tool.stockStatus);
      }
    });

    return {
      brands: Array.from(brands).slice(0, 10), // Limit to top 10
      suppliers: Array.from(suppliers),
      availability: Array.from(availability)
    };
  };

  const { brands, suppliers, availability } = getUniqueValues();
  
  const priceRanges = [
    "Under £25",
    "£25 - £50", 
    "£50 - £100",
    "£100 - £250",
    "£250 - £500",
    "Over £500"
  ];

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFiltersChange({
      ...filters,
      [category]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      priceRanges: [],
      availability: [],
      suppliers: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  const FilterSection = ({ title, items, category }: { title: string; items: string[]; category: keyof FilterState }) => (
    <div className="space-y-3 p-4 rounded-lg bg-background/40 border border-primary/20">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground text-base tracking-wide flex items-center gap-2">
          {title}
        </h4>
        {filters[category].length > 0 && (
          <Badge variant="gold" className="text-xs px-2 py-0.5">
            {filters[category].length} selected
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Badge
            key={item}
            variant={filters[category].includes(item) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 text-sm py-1.5 px-3 ${
              filters[category].includes(item)
                ? "bg-elec-yellow text-black hover:bg-elec-yellow/90 shadow-sm"
                : "bg-background/60 border-border/50 text-foreground hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
            }`}
            onClick={() => toggleFilter(category, item)}
          >
            {item}
            {filters[category].includes(item) && (
              <X className="h-3.5 w-3.5 ml-1.5" />
            )}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Quick Filters Bar with Enhanced Design */}
      <div className="relative p-4 rounded-xl bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-primary/20">
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-transparent border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/50 transition-all duration-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="gold" className="ml-2 h-5 min-w-[20px] px-1.5 text-xs font-semibold">
                {activeFilterCount}
              </Badge>
            )}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {/* Quick filter chips with enhanced styling */}
          {availability.includes("In Stock") && (
            <Badge
              variant={filters.availability.includes("In Stock") ? "gold" : "outline"}
              className={`cursor-pointer transition-all duration-300 ${
                filters.availability.includes("In Stock")
                  ? "shadow-md shadow-elec-yellow/20 scale-105"
                  : "hover:scale-105 hover:border-elec-yellow/50"
              }`}
              onClick={() => toggleFilter("availability", "In Stock")}
            >
              In Stock
              {filters.availability.includes("In Stock") && (
                <X className="h-3 w-3 ml-1.5" />
              )}
            </Badge>
          )}

          {suppliers.includes("Screwfix") && (
            <Badge
              variant={filters.suppliers.includes("Screwfix") ? "gold" : "outline"}
              className={`cursor-pointer transition-all duration-300 ${
                filters.suppliers.includes("Screwfix")
                  ? "shadow-md shadow-elec-yellow/20 scale-105"
                  : "hover:scale-105 hover:border-elec-yellow/50"
              }`}
              onClick={() => toggleFilter("suppliers", "Screwfix")}
            >
              Screwfix
              {filters.suppliers.includes("Screwfix") && (
                <X className="h-3 w-3 ml-1.5" />
              )}
            </Badge>
          )}

          <Badge
            variant={filters.priceRanges.includes("Under £25") ? "gold" : "outline"}
            className={`cursor-pointer transition-all duration-300 ${
              filters.priceRanges.includes("Under £25")
                ? "shadow-md shadow-elec-yellow/20 scale-105"
                : "hover:scale-105 hover:border-elec-yellow/50"
            }`}
            onClick={() => toggleFilter("priceRanges", "Under £25")}
          >
            Under £25
            {filters.priceRanges.includes("Under £25") && (
              <X className="h-3 w-3 ml-1.5" />
            )}
          </Badge>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-300 ml-auto"
            >
              <span className="font-medium">Clear All</span>
              <X className="h-4 w-4 ml-1.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Filters with Enhanced Design */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <Card className="overflow-hidden rounded-xl border border-primary/20 bg-elec-gray/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">Refine Your Search</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-300"
                  >
                    <span className="text-sm font-medium">Clear All</span>
                    <X className="h-4 w-4 ml-1.5" />
                  </Button>
                )}
              </div>
              
              <FilterSection title="Price Range" items={priceRanges} category="priceRanges" />
              
              {availability.length > 0 && (
                <FilterSection title="Availability" items={availability} category="availability" />
              )}
              
              {suppliers.length > 0 && (
                <FilterSection title="Supplier" items={suppliers} category="suppliers" />
              )}
              
              {brands.length > 0 && (
                <FilterSection title="Brand" items={brands} category="brands" />
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ProductFilters;