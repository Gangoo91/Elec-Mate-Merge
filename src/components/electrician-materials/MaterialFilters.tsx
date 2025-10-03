import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, ChevronDown, X } from "lucide-react";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

export interface MaterialFilterState {
  brands: string[];
  priceRanges: string[];
  availability: string[];
  suppliers: string[];
}

interface MaterialFiltersProps {
  materials: MaterialItem[];
  filters: MaterialFilterState;
  onFiltersChange: (filters: MaterialFilterState) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const MaterialFilters = ({ filters, isExpanded, setIsExpanded }: MaterialFiltersProps) => {

  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsExpanded(!isExpanded)}
      className="border-elec-yellow/20 text-elec-light hover:bg-elec-yellow/10"
    >
      <Filter className="h-4 w-4 mr-2" />
      Filters
      {activeFilterCount > 0 && (
        <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs bg-elec-yellow text-elec-dark">
          {activeFilterCount}
        </Badge>
      )}
      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
    </Button>
  );
};

interface MaterialFiltersContentProps {
  materials: MaterialItem[];
  filters: MaterialFilterState;
  onFiltersChange: (filters: MaterialFilterState) => void;
}

export const MaterialFiltersContent = ({ materials, filters, onFiltersChange }: MaterialFiltersContentProps) => {
  // Extract unique values from materials
  const getUniqueValues = () => {
    const brands = new Set<string>();
    const suppliers = new Set<string>();
    const availability = new Set<string>();

    materials.forEach(material => {
      // Extract brand from material name (first word typically) or use category
      const firstWord = material.name.split(' ')[0];
      if (firstWord && firstWord.length > 2) {
        brands.add(firstWord);
      }
      if (material.category) {
        brands.add(material.category);
      }

      if (material.supplier) {
        suppliers.add(material.supplier);
      }

      if (material.stockStatus) {
        availability.add(material.stockStatus);
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
    "Under £50",
    "£50 - £200", 
    "£200 - £500",
    "£500 - £1000",
    "£1000 - £2500",
    "Over £2500"
  ];

  const toggleFilter = (category: keyof MaterialFilterState, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFiltersChange({
      ...filters,
      [category]: newValues
    });
  };

  const FilterSection = ({ title, items, category }: { title: string; items: string[]; category: keyof MaterialFilterState }) => (
    <div className="space-y-2">
      <h4 className="font-medium text-elec-light text-sm">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Badge
            key={item}
            variant={filters[category].includes(item) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 ${
              filters[category].includes(item)
                ? "bg-elec-yellow text-elec-dark shadow-sm"
                : "border-elec-yellow/20 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/40"
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
    <Card className="border-elec-yellow/20 bg-elec-card/50">
      <CardContent className="p-4 space-y-6">
        <FilterSection title="Price Range" items={priceRanges} category="priceRanges" />
        
        {availability.length > 0 && (
          <FilterSection title="Availability" items={availability} category="availability" />
        )}
        
        {suppliers.length > 0 && (
          <FilterSection title="Supplier" items={suppliers} category="suppliers" />
        )}
        
        {brands.length > 0 && (
          <FilterSection title="Brand/Category" items={brands} category="brands" />
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialFilters;