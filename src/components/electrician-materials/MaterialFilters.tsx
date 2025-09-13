import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  category: 'brand' | 'price' | 'availability' | 'supplier';
}

interface MaterialFiltersProps {
  materials: any[];
  onFiltersChange: (filters: string[]) => void;
  activeFilters: string[];
}

const MaterialFilters = ({ materials, onFiltersChange, activeFilters }: MaterialFiltersProps) => {
  const [showAllFilters, setShowAllFilters] = useState(false);

  // Generate filter options from materials data
  const filterOptions: FilterOption[] = [
    // Price ranges
    { id: 'price-0-50', label: '£0-50', category: 'price' },
    { id: 'price-50-200', label: '£50-200', category: 'price' },
    { id: 'price-200-plus', label: '£200+', category: 'price' },
    
    // Availability
    { id: 'in-stock', label: 'In Stock', category: 'availability' },
    { id: 'low-stock', label: 'Low Stock', category: 'availability' },
    { id: 'on-sale', label: 'On Sale', category: 'availability' },
    
    // Dynamic suppliers from materials
    ...Array.from(new Set(materials.map(m => m.supplier)))
      .filter(Boolean)
      .slice(0, 6)
      .map(supplier => ({
        id: `supplier-${supplier.toLowerCase().replace(/\s+/g, '-')}`,
        label: supplier,
        category: 'supplier' as const
      })),
    
    // Dynamic brands/categories from materials  
    ...Array.from(new Set(materials.map(m => m.category)))
      .filter(Boolean)
      .slice(0, 6)
      .map(category => ({
        id: `brand-${category.toLowerCase().replace(/\s+/g, '-')}`,
        label: category,
        category: 'brand' as const
      }))
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  const visibleFilters = showAllFilters ? filterOptions : filterOptions.slice(0, 8);

  return (
    <Card className="bg-elec-card/50 border-elec-yellow/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-light">Quick Filters</span>
          </div>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-elec-yellow hover:bg-elec-yellow/10"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {/* Filter badges */}
          <div className="flex flex-wrap gap-2">
            {visibleFilters.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <Badge
                  key={filter.id}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      : "border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                  }`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                  {isActive && <X className="h-3 w-3 ml-1" />}
                </Badge>
              );
            })}
          </div>

          {/* Show more/less toggle */}
          {filterOptions.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="text-xs text-elec-yellow hover:bg-elec-yellow/10"
            >
              {showAllFilters ? 'Show less' : `Show ${filterOptions.length - 8} more filters`}
            </Button>
          )}

          {/* Active filters summary */}
          {activeFilters.length > 0 && (
            <div className="pt-2 border-t border-elec-yellow/10">
              <span className="text-xs text-muted-foreground">
                {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} applied
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialFilters;