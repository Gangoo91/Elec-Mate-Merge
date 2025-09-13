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
    <div className="space-y-2">
      <h4 className="font-medium text-elec-light text-sm">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Badge
            key={item}
            variant={filters[category].includes(item) ? "gold" : "outline"}
            className={`cursor-pointer transition-all duration-200 ${
              filters[category].includes(item)
                ? "bg-elec-yellow text-elec-dark shadow-sm"
                : "bg-elec-card/50 border-elec-yellow/20 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/40"
            }`}
            onClick={() => toggleFilter(category, item)}
          >
            {item}
            {filters[category].includes(item) && (
              <X className="h-3 w-3 ml-1" />
            )}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Quick Filters Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-elec-card/50 border-elec-yellow/20 text-elec-light hover:bg-elec-yellow/10"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="gold" className="ml-2 h-5 w-5 p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>

        {/* Quick filter chips for popular options */}
        {availability.includes("In Stock") && (
          <Badge
            variant={filters.availability.includes("In Stock") ? "gold" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter("availability", "In Stock")}
          >
            In Stock
          </Badge>
        )}

        {suppliers.includes("Screwfix") && (
          <Badge
            variant={filters.suppliers.includes("Screwfix") ? "gold" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter("suppliers", "Screwfix")}
          >
            Screwfix
          </Badge>
        )}

        <Badge
          variant={filters.priceRanges.includes("Under £25") ? "gold" : "outline"}
          className="cursor-pointer"
          onClick={() => toggleFilter("priceRanges", "Under £25")}
        >
          Under £25
        </Badge>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-elec-yellow hover:bg-elec-yellow/10"
          >
            Clear All
            <X className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <Card className="bg-elec-card/30 border-elec-yellow/20">
            <CardContent className="p-4 space-y-6">
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
    </div>
  );
};

export default ProductFilters;