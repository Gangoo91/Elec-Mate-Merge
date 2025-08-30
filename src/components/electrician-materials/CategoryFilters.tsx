import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Filter, ChevronDown, X } from "lucide-react";

interface FilterState {
  productTypes: string[];
  brands: string[];
  priceRanges: string[];
  moduleSizes: string[];
  cableTypes: string[];
}

interface CategoryFiltersProps {
  categoryId: string;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  productsCount: number;
}

const FILTER_OPTIONS = {
  components: {
    productTypes: ['Consumer Units', 'RCDs', 'MCBs', 'Isolators', 'Protection'],
    brands: ['Wylex', 'MK Sentry', 'Crabtree', 'Schneider Electric'],
    priceRanges: ['Under £25', '£25-£50', '£50-£100', 'Over £100'],
    moduleSizes: ['4-Module', '10-Module', '13-Module', '16-Module', '21-Module'],
    cableTypes: [] as string[]
  },
  cables: {
    cableTypes: ['Twin & Earth', 'SWA', 'Flex', 'Data', 'Control'],
    productTypes: [] as string[],
    brands: [] as string[],
    priceRanges: [] as string[],
    moduleSizes: [] as string[]
  },
  protection: {
    productTypes: ['RCBOs', 'Surge Protectors', 'Earth Rods', 'Bonding'],
    brands: ['Hager', 'Schneider', 'ABB', 'Eaton'],
    priceRanges: [] as string[],
    moduleSizes: [] as string[],
    cableTypes: [] as string[]
  },
  accessories: {
    productTypes: ['Junction Boxes', 'Cable Glands', 'Trunking', 'Fixings'],
    brands: ['Marshall-Tufflex', 'Legrand', 'Gewiss'],
    priceRanges: [] as string[],
    moduleSizes: [] as string[],
    cableTypes: [] as string[]
  },
  lighting: {
    productTypes: ['LED Downlights', 'Battens', 'Emergency Lighting', 'Controls'],
    brands: ['Aurora', 'Integral', 'JCC', 'Ansell'],
    priceRanges: [] as string[],
    moduleSizes: [] as string[],
    cableTypes: [] as string[]
  },
  tools: {
    productTypes: ['Testers', 'Hand Tools', 'Power Tools', 'Measuring'],
    brands: ['Fluke', 'Kewtech', 'Megger', 'DeWalt'],
    priceRanges: [] as string[],
    moduleSizes: [] as string[],
    cableTypes: [] as string[]
  }
};

const CategoryFilters = ({ categoryId, filters, onFiltersChange, productsCount }: CategoryFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const filterConfig = FILTER_OPTIONS[categoryId as keyof typeof FILTER_OPTIONS];
  
  if (!filterConfig) return null;

  const toggleFilter = (type: keyof FilterState, value: string) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value) 
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [type]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      productTypes: [],
      brands: [],
      priceRanges: [],
      moduleSizes: [],
      cableTypes: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  const renderFilterSection = (title: string, type: keyof FilterState, options: string[]) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = filters[type].includes(option);
          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-colors text-xs ${
                isSelected 
                  ? 'bg-elec-yellow text-elec-black hover:bg-elec-yellow/90' 
                  : 'hover:bg-elec-yellow/10 hover:border-elec-yellow/30'
              }`}
              onClick={() => toggleFilter(type, option)}
            >
              {option}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-elec-yellow/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Active filters summary */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between p-3 bg-elec-yellow/5 rounded-lg">
                <span className="text-sm text-muted-foreground">
                  Showing {productsCount} filtered products
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              </div>
            )}

            {/* Filter sections based on category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterConfig.productTypes && renderFilterSection(
                categoryId === 'cables' ? 'Cable Types' : 'Product Types', 
                categoryId === 'cables' ? 'cableTypes' : 'productTypes', 
                categoryId === 'cables' ? filterConfig.cableTypes! : filterConfig.productTypes
              )}
              
              {filterConfig.brands && renderFilterSection('Brands', 'brands', filterConfig.brands)}
              
              {filterConfig.priceRanges && renderFilterSection('Price Range', 'priceRanges', filterConfig.priceRanges)}
              
              {filterConfig.moduleSizes && renderFilterSection('Module Size', 'moduleSizes', filterConfig.moduleSizes)}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategoryFilters;