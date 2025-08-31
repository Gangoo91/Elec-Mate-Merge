
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Filter, ChevronDown, X, Sliders } from "lucide-react";

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
    brands: [] as string[],
    priceRanges: ['Under £25', '£25-£50', '£50-£100', '£100-£250', 'Over £250'],
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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sliders className="h-4 w-4 text-elec-yellow/60" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = filters[type].includes(option);
          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 text-xs px-3 py-1.5 rounded-full border ${
                isSelected 
                  ? 'bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 border-elec-yellow shadow-lg shadow-elec-yellow/20 transform hover:scale-105' 
                  : 'hover:bg-elec-yellow/10 hover:border-elec-yellow/50 border-elec-yellow/20 text-elec-yellow/80 hover:text-elec-yellow'
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
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-gray/80 shadow-xl shadow-black/20 backdrop-blur-sm">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-5 cursor-pointer hover:bg-gradient-to-r hover:from-elec-yellow/5 hover:to-elec-yellow/10 transition-all duration-300 border-b border-elec-yellow/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <Filter className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-base">Filter Products</span>
                  <span className="text-xs text-muted-foreground">Refine your search results</span>
                </div>
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs px-2 py-1">
                      {activeFilterCount} active
                    </Badge>
                    <div className="h-1 w-1 rounded-full bg-elec-yellow animate-pulse"></div>
                  </div>
                )}
              </div>
              <ChevronDown className={`h-5 w-5 text-elec-yellow/70 transition-all duration-300 ${isExpanded ? 'rotate-180 text-elec-yellow' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden">
          <CardContent className="pt-6 pb-6 space-y-6">
            {/* Active filters summary */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 rounded-xl border border-elec-yellow/20">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-elec-yellow animate-pulse"></div>
                  <span className="text-sm font-medium text-white">
                    Showing {productsCount} filtered results
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 px-3 rounded-lg transition-all duration-200"
                >
                  <X className="h-3 w-3 mr-2" />
                  Clear all
                </Button>
              </div>
            )}

            {/* Filter sections based on category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterConfig.productTypes && renderFilterSection(
                categoryId === 'cables' ? 'Cable Types' : 'Product Types', 
                categoryId === 'cables' ? 'cableTypes' : 'productTypes', 
                categoryId === 'cables' ? filterConfig.cableTypes! : filterConfig.productTypes
              )}
              
              {filterConfig.priceRanges && renderFilterSection('Price Range', 'priceRanges', filterConfig.priceRanges)}
            </div>

            {/* Filter actions */}
            <div className="flex items-center justify-between pt-4 border-t border-elec-yellow/10">
              <p className="text-xs text-muted-foreground">
                Use filters to narrow down your product search
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2 text-xs text-elec-yellow/60">
                  <div className="h-1 w-1 rounded-full bg-elec-yellow/60"></div>
                  <span>Filters applied</span>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategoryFilters;
