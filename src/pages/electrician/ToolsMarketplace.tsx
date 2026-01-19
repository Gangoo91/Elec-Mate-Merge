import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Wrench, ArrowLeft, Flame, Tag, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { SortDropdown } from '@/components/marketplace/SearchFilters';
import {
  useMarketplaceSearch,
  SearchFilters as SearchFiltersType,
  SortOption,
  MarketplaceProduct,
} from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

// Safe price formatting helper
const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return '-.--';
  return price.toFixed(2);
};

/**
 * Tools Marketplace Page
 * Clean, mobile-first marketplace with deals section
 */
export default function ToolsMarketplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial state from URL
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || undefined;
  const initialDealsOnly = searchParams.get('deals') === 'true';
  const initialSort = (searchParams.get('sort') as SortOption) || 'relevance';

  // State
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: initialCategory,
    dealsOnly: initialDealsOnly,
    productType: 'tools', // Only show tools
  });
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<MarketplaceProduct[]>([]);

  // Main search query
  const { data, isLoading, isFetching, isError, refetch } = useMarketplaceSearch(
    query,
    filters,
    sort,
    page,
    24
  );

  // Deals query (for the deals section - tools only)
  const { data: dealsData, refetch: refetchDeals } = useMarketplaceSearch(
    '',
    { dealsOnly: true, productType: 'tools' },
    'discount',
    1,
    6
  );

  // Accumulate products
  useEffect(() => {
    if (data?.products) {
      if (page === 1) {
        setAllProducts(data.products);
      } else {
        setAllProducts(prev => [...prev, ...data.products]);
      }
    }
  }, [data?.products, page]);

  // Reset on filter changes
  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [query, filters, sort]);

  // Load more
  const handleLoadMore = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage(prev => prev + 1);
    }
  }, [data, page]);

  const hasMore = data ? page < data.totalPages : false;

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.dealsOnly) params.set('deals', 'true');
    if (sort !== 'relevance') params.set('sort', sort);
    setSearchParams(params, { replace: true });
  }, [query, filters, sort, setSearchParams]);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
    setAllProducts([]);
    setPage(1);
  };

  // Category filter
  const handleCategoryFilter = (cat: string | undefined) => {
    setFilters({ ...filters, category: cat, productType: 'tools' });
    setAllProducts([]);
    setPage(1);
  };

  // Deals toggle
  const handleDealsToggle = () => {
    setFilters({ ...filters, dealsOnly: !filters.dealsOnly, productType: 'tools' });
    setAllProducts([]);
    setPage(1);
  };

  // Manual refresh
  const handleRefresh = () => {
    setAllProducts([]);
    setPage(1);
    refetch();
    refetchDeals();
  };

  // Categories for filter chips
  const categories = [
    { name: 'All', slug: undefined },
    { name: 'Hand Tools', slug: 'hand-tools' },
    { name: 'Power Tools', slug: 'power-tools' },
    { name: 'Test Equipment', slug: 'test-equipment' },
    { name: 'PPE', slug: 'ppe' },
  ];

  return (
    <div className="bg-background pb-20 sm:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-orange-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          {/* Back Button */}
          <Link to="/electrician/business">
            <Button variant="ghost" size="sm" className="mb-3 -ml-2 touch-manipulation h-10 text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Business Hub
            </Button>
          </Link>

          {/* Title Row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <Wrench className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Tools Marketplace</h1>
              <p className="text-muted-foreground text-sm">
                {data?.total?.toLocaleString() || '800+'} products from UK suppliers
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              {!searchInput && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              )}
              <Input
                type="search"
                placeholder="Search tools, brands..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={cn("h-11 bg-card border-border focus:border-orange-500 focus:ring-orange-500/20", !searchInput && "pl-10")}
              />
            </div>
            <Button type="submit" className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white">
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Deals Section - Only show if we have deals */}
        {dealsData?.products && dealsData.products.length > 0 && !filters.dealsOnly && !query && (
          <section className="py-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Deals of the Day</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDealsToggle}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                View All Deals
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dealsData.products.slice(0, 6).map((product) => (
                <a
                  key={product.id}
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-3 hover:border-orange-500/50 active:border-orange-500/70 transition-all touch-manipulation active:scale-[0.98]"
                >
                  {/* Discount Badge */}
                  {product.discount_percentage && (
                    <div className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                      <Tag className="h-3 w-3" />
                      {product.discount_percentage}% OFF
                    </div>
                  )}
                  {/* Image */}
                  <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Wrench className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <p className="text-xs font-medium line-clamp-2 mb-1 group-hover:text-orange-400">
                    {product.name}
                  </p>
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-400">
                      £{formatPrice(product.current_price)}
                    </span>
                    {product.regular_price && (
                      <span className="text-xs text-muted-foreground line-through">
                        £{formatPrice(product.regular_price)}
                      </span>
                    )}
                  </div>
                  {/* Supplier */}
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.supplier_name}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-white/5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {/* Category Chips */}
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryFilter(cat.slug)}
                className={`h-11 px-4 rounded-full border text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all ${
                  filters.category === cat.slug || (!filters.category && cat.slug === undefined)
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-card border-border hover:border-orange-500/50 active:border-orange-500/70'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* Deals Filter */}
            <button
              onClick={handleDealsToggle}
              className={`h-11 px-4 rounded-full border text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all flex items-center gap-1.5 ${
                filters.dealsOnly
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-card border-border hover:border-red-500/50 active:border-red-500/70'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Deals
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <SortDropdown sort={sort} onSortChange={setSort} />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            {data?.total ? (
              <>
                <span className="font-medium text-foreground">{data.total.toLocaleString()}</span> products
                {query && <> matching "{query}"</>}
                {filters.category && <> in {filters.category.replace('-', ' ')}</>}
                {filters.dealsOnly && <> on sale</>}
              </>
            ) : isLoading ? (
              'Loading products...'
            ) : isError ? (
              'Failed to load products'
            ) : (
              'No products found'
            )}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
            className="h-9 touch-manipulation text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-red-500/10 rounded-full mb-4">
              <Wrench className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Unable to Load Products</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              There was a problem loading the marketplace. Please check your connection and try again.
            </p>
            <Button
              onClick={handleRefresh}
              className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white touch-manipulation"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={allProducts}
          total={data?.total || 0}
          isLoading={isLoading || (isFetching && page === 1)}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}
