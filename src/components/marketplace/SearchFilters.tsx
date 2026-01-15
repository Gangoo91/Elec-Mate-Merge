import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SearchFilters as SearchFiltersType, SearchFacets, SortOption } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  facets: SearchFacets;
  sort: SortOption;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

/**
 * Search Filters Sidebar
 * Desktop: Sidebar on the left
 * Mobile: Bottom sheet
 */
export function SearchFilters({
  filters,
  facets,
  sort,
  onFiltersChange,
  onSortChange,
  className,
}: SearchFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Count active filters
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.suppliers?.length || 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.dealsOnly ? 1 : 0);

  // Clear all filters
  const clearFilters = () => {
    onFiltersChange({});
  };

  // Filter content (shared between desktop and mobile)
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Sort (Mobile only - desktop shows in header) */}
      <div className="sm:hidden">
        <FilterSection title="Sort By">
          <SortSelect sort={sort} onSortChange={onSortChange} />
        </FilterSection>
      </div>

      {/* Deals Only Toggle */}
      <FilterSection title="Deals">
        <label className="flex items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            checked={filters.dealsOnly ?? false}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, dealsOnly: checked === true })
            }
            className="h-5 w-5 border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
          />
          <span className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-green-500" />
            Show deals only
          </span>
        </label>
      </FilterSection>

      {/* Category Filter */}
      {facets.categories.length > 0 && (
        <FilterSection title="Category" defaultOpen>
          <div className="space-y-0 max-h-64 overflow-y-auto -mx-2">
            {facets.categories.slice(0, 10).map((cat) => (
              <label
                key={cat.name}
                className="flex items-center justify-between gap-3 cursor-pointer touch-manipulation min-h-[44px] px-2 hover:bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filters.category === cat.name}
                    onCheckedChange={(checked) =>
                      onFiltersChange({
                        ...filters,
                        category: checked ? cat.name : undefined,
                      })
                    }
                    className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-sm">{cat.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Supplier Filter */}
      {facets.suppliers.length > 0 && (
        <FilterSection title="Supplier" defaultOpen>
          <div className="space-y-0 -mx-2">
            {facets.suppliers.map((supplier) => (
              <label
                key={supplier.slug}
                className="flex items-center justify-between gap-3 cursor-pointer touch-manipulation min-h-[44px] px-2 hover:bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filters.suppliers?.includes(supplier.slug) ?? false}
                    onCheckedChange={(checked) => {
                      const current = filters.suppliers || [];
                      const updated = checked
                        ? [...current, supplier.slug]
                        : current.filter((s) => s !== supplier.slug);
                      onFiltersChange({
                        ...filters,
                        suppliers: updated.length > 0 ? updated : undefined,
                      });
                    }}
                    className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-sm">{supplier.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({supplier.count})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range Filter */}
      <FilterSection title="Price Range">
        <PriceRangeFilter
          min={facets.priceRange.min}
          max={facets.priceRange.max}
          currentMin={filters.minPrice}
          currentMax={filters.maxPrice}
          onChange={(minPrice, maxPrice) =>
            onFiltersChange({ ...filters, minPrice, maxPrice })
          }
        />
      </FilterSection>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full h-11 touch-manipulation"
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn('hidden lg:block w-64 flex-shrink-0', className)}>
        <div className="sticky top-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h2>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-elec-yellow text-black px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filter Button + Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-11 touch-manipulation"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-elec-yellow text-black text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto pb-8">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

/**
 * Collapsible Filter Section
 */
function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-11 touch-manipulation -mx-2 px-2 hover:bg-muted/30 rounded-lg transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
}

/**
 * Sort Select
 */
function SortSelect({
  sort,
  onSortChange,
}: {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Biggest Discount' },
  ];

  return (
    <div className="space-y-0 -mx-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer touch-manipulation min-h-[44px] px-2 hover:bg-muted/50 rounded-lg"
        >
          <input
            type="radio"
            name="sort"
            checked={sort === option.value}
            onChange={() => onSortChange(option.value)}
            className="h-5 w-5 text-elec-yellow accent-elec-yellow focus:ring-elec-yellow"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * Price Range Filter with Slider
 */
function PriceRangeFilter({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
}: {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  onChange: (min?: number, max?: number) => void;
}) {
  const [localRange, setLocalRange] = useState([
    currentMin ?? min,
    currentMax ?? max,
  ]);

  const handleChange = (values: number[]) => {
    setLocalRange(values);
  };

  const handleCommit = () => {
    const newMin = localRange[0] > min ? localRange[0] : undefined;
    const newMax = localRange[1] < max ? localRange[1] : undefined;
    onChange(newMin, newMax);
  };

  return (
    <div className="space-y-4">
      <Slider
        value={localRange}
        min={min}
        max={max}
        step={1}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
        className="touch-manipulation"
      />
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">£{localRange[0]}</span>
        <span className="text-muted-foreground">to</span>
        <span className="font-medium">£{localRange[1]}</span>
      </div>
    </div>
  );
}

/**
 * Sort dropdown for desktop header
 */
export function SortDropdown({
  sort,
  onSortChange,
}: {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Biggest Discount' },
  ];

  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="h-11 px-3 bg-elec-gray border border-elec-gray rounded-lg text-sm text-base focus:border-elec-yellow focus:ring-elec-yellow touch-manipulation"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          Sort: {option.label}
        </option>
      ))}
    </select>
  );
}
