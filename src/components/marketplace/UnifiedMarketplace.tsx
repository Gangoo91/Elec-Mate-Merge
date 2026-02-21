import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Tag,
  Search,
  RefreshCw,
  Clock,
  ListChecks,
  BarChart3,
  LucideIcon,
  Ticket,
} from 'lucide-react';
import { motion } from 'framer-motion';
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
import { SaveToListSheet } from '@/components/marketplace/SaveToListSheet';
import { CouponCard } from '@/components/marketplace/CouponCard';
import { DealOfTheDay } from '@/components/marketplace/DealOfTheDay';
import { PriceAlertsBanner } from '@/components/marketplace/PriceAlertsBanner';
import { useMarketplacePriceAlerts } from '@/hooks/useMarketplacePriceAlerts';
import { cn } from '@/lib/utils';

export interface UnifiedMarketplaceProps {
  productType: 'tools' | 'materials';
  title: string;
  icon: LucideIcon;
  accentColor: 'yellow' | 'orange';
  searchPlaceholder: string;
  categories: { name: string; slug?: string }[];
  supplierLabel: string;
  dealsTitle: string;
  listsPath?: string;
}

// Safe price formatting helper
const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return '-.--';
  return price.toFixed(2);
};

function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

/**
 * Unified marketplace page component shared by Materials and Tools pages.
 * Redesigned to match Site Safety layout with stagger animations.
 */
export default function UnifiedMarketplace({
  productType,
  title,
  icon: Icon,
  accentColor,
  searchPlaceholder,
  categories,
  supplierLabel,
  dealsTitle,
  listsPath,
}: UnifiedMarketplaceProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Accent colour classes
  const accent = {
    yellow: {
      iconBg: 'bg-yellow-500/10 border border-yellow-500/20',
      iconColor: 'text-yellow-400',
      border: 'focus:border-yellow-500 focus:ring-yellow-500/20',
      chipActive: 'bg-yellow-500 text-black border-yellow-500',
      chipHover: 'hover:border-yellow-500/50',
      button: 'bg-yellow-500 hover:bg-yellow-600 text-black font-semibold',
      errorButton: 'bg-yellow-500 hover:bg-yellow-600 text-black font-semibold',
      dot: 'bg-yellow-400',
    },
    orange: {
      iconBg: 'bg-orange-500/10 border border-orange-500/20',
      iconColor: 'text-orange-400',
      border: 'focus:border-orange-500 focus:ring-orange-500/20',
      chipActive: 'bg-orange-500 text-white border-orange-500',
      chipHover: 'hover:border-orange-500/50',
      button: 'bg-orange-500 hover:bg-orange-600 text-white',
      errorButton: 'bg-orange-500 hover:bg-orange-600 text-white',
      dot: 'bg-orange-400',
    },
  }[accentColor];

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
    productType,
  });
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<MarketplaceProduct[]>([]);

  // Save to list state
  const [saveSheetOpen, setSaveSheetOpen] = useState(false);
  const [saveProduct, setSaveProduct] = useState<MarketplaceProduct | null>(null);
  const handleSaveProduct = useCallback((product: MarketplaceProduct) => {
    setSaveProduct(product);
    setSaveSheetOpen(true);
  }, []);

  // Price alerts
  const { alerts, dismissAlert } = useMarketplacePriceAlerts();

  // Main search query
  const { data, isLoading, isFetching, isError, refetch } = useMarketplaceSearch(
    query,
    filters,
    sort,
    page,
    24
  );

  // Deals query (for the deals section)
  const { data: dealsData, refetch: refetchDeals } = useMarketplaceSearch(
    '',
    { dealsOnly: true, productType },
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
        setAllProducts((prev) => [...prev, ...data.products]);
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
      setPage((prev) => prev + 1);
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
    setFilters({ ...filters, category: cat, productType });
    setAllProducts([]);
    setPage(1);
  };

  // Deals toggle
  const handleDealsToggle = () => {
    setFilters({ ...filters, dealsOnly: !filters.dealsOnly, productType });
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

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header — back button only */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => navigate('/electrician/business')}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Business Hub</span>
          </button>

          <div className="flex items-center gap-1">
            {productType === 'materials' && (
              <Link to="/electrician/materials/procurement">
                <Button
                  size="sm"
                  className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                >
                  <BarChart3 className="h-4 w-4 mr-1.5" />
                  Smart Procurement
                </Button>
              </Link>
            )}
            {listsPath && (
              <Link to={listsPath}>
                <Button variant="ghost" size="sm" className="h-11 touch-manipulation text-white">
                  <ListChecks className="h-4 w-4 mr-1.5" />
                  My Lists
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-6"
      >
        {/* Hero — icon + title + subtitle */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className={cn('p-3 rounded-xl', accent.iconBg)}>
            <Icon className={cn('h-6 w-6', accent.iconColor)} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-sm text-white">
              {data?.total?.toLocaleString() || '...'} products from {supplierLabel}
            </p>
          </div>
        </motion.div>

        {/* Last Updated */}
        {data?.lastUpdated && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 text-xs text-white -mt-3"
          >
            <Clock className="h-3 w-3" />
            <span>Prices updated {formatLastUpdated(data.lastUpdated)}</span>
          </motion.div>
        )}

        {/* Search Bar */}
        <motion.form variants={itemVariants} onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            {!searchInput && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={cn(
                'h-11 bg-white/[0.03] border-white/[0.08]',
                accent.border,
                !searchInput && 'pl-10'
              )}
            />
          </div>
          <Button type="submit" className={cn('h-11 px-6 touch-manipulation', accent.button)}>
            Search
          </Button>
        </motion.form>

        {/* Price Drop Alerts */}
        {alerts.length > 0 && !query && (
          <motion.section variants={itemVariants}>
            <PriceAlertsBanner alerts={alerts} onDismiss={dismissAlert} />
          </motion.section>
        )}

        {/* Deal of the Day */}
        {data?.dealOfTheDay && !query && !filters.dealsOnly && (
          <motion.section variants={itemVariants}>
            <DealOfTheDay deal={data.dealOfTheDay} />
          </motion.section>
        )}

        {/* Coupon Codes Section */}
        {data?.coupons && data.coupons.length > 0 && !query && (
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <h2 className="text-base font-bold text-white">Discount Codes</h2>
              <Ticket className="h-4 w-4 text-green-400" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {data.coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Deals Section */}
        {dealsData?.products && dealsData.products.length > 0 && !filters.dealsOnly && !query && (
          <motion.section variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <h2 className="text-base font-bold text-white">{dealsTitle}</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDealsToggle}
                className="h-11 touch-manipulation text-red-400 active:bg-red-500/10"
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
                  className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 transition-colors touch-manipulation active:bg-white/[0.06]"
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
                        <Icon className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <p className="text-xs font-medium text-white line-clamp-3 min-h-[3rem] mb-1">
                    {product.brand ? `${product.brand} ${product.name}` : product.name}
                  </p>
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-green-400">
                      £{formatPrice(product.current_price)}
                    </span>
                    {product.regular_price && (
                      <span className="text-xs text-white line-through">
                        £{formatPrice(product.regular_price)}
                      </span>
                    )}
                  </div>
                  {/* Supplier */}
                  <p className="text-xs text-white mt-1">{product.supplier_name}</p>
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filter Bar */}
        <motion.div
          variants={itemVariants}
          className="sticky top-[52px] z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-white/[0.08]"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryFilter(cat.slug)}
                className={cn(
                  'h-11 px-4 rounded-full border text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all',
                  filters.category === cat.slug || (!filters.category && cat.slug === undefined)
                    ? accent.chipActive
                    : cn('bg-white/[0.03] border-white/[0.08]', accent.chipHover)
                )}
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={handleDealsToggle}
              className={cn(
                'h-11 px-4 rounded-full border text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.97] transition-all flex items-center gap-1.5',
                filters.dealsOnly
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-red-500/50'
              )}
            >
              <Flame className="h-3.5 w-3.5" />
              Deals
            </button>

            <div className="flex-1" />

            <SortDropdown sort={sort} onSortChange={setSort} />
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={cn('h-1.5 w-1.5 rounded-full', accent.dot)} />
            <p className="text-sm font-bold text-white">
              {data?.total ? (
                <>
                  {data.total.toLocaleString()} products
                  {query && <> matching &ldquo;{query}&rdquo;</>}
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
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
            className="h-11 touch-manipulation text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </motion.div>

        {/* Error State */}
        {isError && !isLoading && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="p-3 bg-red-500/10 rounded-full mb-4">
              <Icon className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Unable to Load Products</h3>
            <p className="text-white mb-4 max-w-sm">
              There was a problem loading the marketplace. Please check your connection and try
              again.
            </p>
            <Button
              onClick={handleRefresh}
              className={cn('h-11 px-6 touch-manipulation', accent.errorButton)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Product Grid */}
        <motion.div variants={itemVariants}>
          <ProductGrid
            products={allProducts}
            total={data?.total || 0}
            isLoading={isLoading || (isFetching && page === 1)}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onSave={handleSaveProduct}
          />
        </motion.div>
      </motion.main>

      {/* Save to List Bottom Sheet */}
      <SaveToListSheet open={saveSheetOpen} onOpenChange={setSaveSheetOpen} product={saveProduct} />
    </div>
  );
}
