import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wrench, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MarketplaceSearchBar } from '@/components/marketplace/MarketplaceSearchBar';
import { SearchResultsGrid } from '@/components/marketplace/SearchResultsGrid';
import { SearchFilters, SortDropdown } from '@/components/marketplace/SearchFilters';
import { DealsBanner } from '@/components/marketplace/DealsBanner';
import { CouponsList } from '@/components/marketplace/CouponCodeCard';
import {
  useMarketplaceSearch,
  SearchFilters as SearchFiltersType,
  SortOption,
} from '@/hooks/useMarketplaceSearch';

/**
 * Tools Marketplace Page
 * Search-first marketplace design for electrical tools
 */
export default function ToolsMarketplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial state from URL
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || undefined;
  const initialSuppliers = searchParams.get('suppliers')?.split(',').filter(Boolean) || undefined;
  const initialDealsOnly = searchParams.get('deals') === 'true';
  const initialSort = (searchParams.get('sort') as SortOption) || 'relevance';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  // State
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: initialCategory,
    suppliers: initialSuppliers,
    dealsOnly: initialDealsOnly,
  });
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(initialPage);

  // Search query
  const { data, isLoading, isFetching } = useMarketplaceSearch(
    query,
    filters,
    sort,
    page,
    20
  );

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.suppliers?.length) params.set('suppliers', filters.suppliers.join(','));
    if (filters.dealsOnly) params.set('deals', 'true');
    if (sort !== 'relevance') params.set('sort', sort);
    if (page > 1) params.set('page', page.toString());

    setSearchParams(params, { replace: true });
  }, [query, filters, sort, page, setSearchParams]);

  // Handle search
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Handle sort change
  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setPage(1);
  };

  // Determine if we're showing search results or home state
  const hasSearched = query.length > 0 || Object.keys(filters).some(k =>
    filters[k as keyof SearchFiltersType] !== undefined &&
    filters[k as keyof SearchFiltersType] !== false &&
    (Array.isArray(filters[k as keyof SearchFiltersType])
      ? (filters[k as keyof SearchFiltersType] as string[]).length > 0
      : true)
  );

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-elec-yellow/10 to-transparent">
        <div className="container mx-auto px-4 py-6 sm:py-10">
          {/* Back Button */}
          <Link to="/electrician/business">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 touch-manipulation">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Business Hub
            </Button>
          </Link>

          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-elec-yellow/20 rounded-xl">
              <Wrench className="h-7 w-7 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Tools Marketplace</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Search tools across Screwfix, Toolstation, CEF & more
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <MarketplaceSearchBar
            initialQuery={query}
            onSearch={handleSearch}
            className="max-w-3xl"
            autoFocus={!initialQuery}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {!hasSearched ? (
          // Home State - Show deals and browse prompts
          <div className="space-y-8 py-6">
            {/* Deals Banner */}
            <DealsBanner />

            {/* Coupons */}
            <CouponsList limit={4} />

            {/* Quick Category Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { name: 'Hand Tools', icon: '🔧' },
                  { name: 'Power Tools', icon: '⚡' },
                  { name: 'Test Equipment', icon: '📊' },
                  { name: 'PPE', icon: '🦺' },
                  { name: 'Tool Storage', icon: '🧰' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setFilters({ ...filters, category: cat.name.toLowerCase().replace(' ', '-') });
                      setQuery('');
                    }}
                    className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-elec-yellow/50 transition-colors touch-manipulation"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Supplier Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shop by Supplier</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Screwfix', slug: 'screwfix' },
                  { name: 'Toolstation', slug: 'toolstation' },
                  { name: 'CEF', slug: 'cef' },
                  { name: 'RS Components', slug: 'rs-components' },
                ].map((supplier) => (
                  <button
                    key={supplier.slug}
                    onClick={() => {
                      setFilters({ ...filters, suppliers: [supplier.slug] });
                      setQuery('');
                    }}
                    className="flex items-center justify-center p-4 bg-card border border-border rounded-xl hover:border-elec-yellow/50 transition-colors touch-manipulation"
                  >
                    <span className="font-medium">{supplier.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Search Results State
          <div className="flex flex-col lg:flex-row gap-6 py-6">
            {/* Filters Sidebar */}
            <SearchFilters
              filters={filters}
              facets={data?.facets || { categories: [], suppliers: [], priceRange: { min: 0, max: 1000 } }}
              sort={sort}
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
            />

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results Header (Desktop) */}
              <div className="hidden lg:flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {query && (
                    <>
                      Results for "<span className="font-medium text-foreground">{query}</span>"
                    </>
                  )}
                  {filters.category && !query && (
                    <>
                      Browsing <span className="font-medium text-foreground">{filters.category}</span>
                    </>
                  )}
                </p>
                <SortDropdown sort={sort} onSortChange={handleSortChange} />
              </div>

              {/* Mobile Header */}
              <div className="lg:hidden flex items-center justify-between mb-4">
                <SearchFilters
                  filters={filters}
                  facets={data?.facets || { categories: [], suppliers: [], priceRange: { min: 0, max: 1000 } }}
                  sort={sort}
                  onFiltersChange={handleFiltersChange}
                  onSortChange={handleSortChange}
                />
                <SortDropdown sort={sort} onSortChange={handleSortChange} />
              </div>

              {/* Results Grid */}
              <SearchResultsGrid
                products={data?.products || []}
                total={data?.total || 0}
                page={page}
                totalPages={data?.totalPages || 0}
                isLoading={isLoading || isFetching}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
