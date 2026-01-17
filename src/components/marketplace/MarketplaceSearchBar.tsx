import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useInstantSearch, useRecentSearches, InstantSearchResult } from '@/hooks/useInstantSearch';
import { cn } from '@/lib/utils';

interface MarketplaceSearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function MarketplaceSearchBar({
  initialQuery = '',
  onSearch,
  className,
  autoFocus = false,
}: MarketplaceSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useInstantSearch(query);
  const { searches: recentSearches, addSearch, clearSearches } = useRecentSearches();

  const results = searchResults?.results || [];
  const hasResults = results.length > 0;
  const showRecent = !query && recentSearches.length > 0;
  const showDropdown = isOpen && (hasResults || showRecent || isLoading);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    addSearch(trimmed);
    setIsOpen(false);

    if (onSearch) {
      onSearch(trimmed);
    } else {
      navigate(`/electrician/tools-marketplace?q=${encodeURIComponent(trimmed)}`);
    }
  };

  // Handle product click
  const handleProductClick = (product: InstantSearchResult) => {
    addSearch(product.name);
    setIsOpen(false);
    window.open(product.product_url, '_blank');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const items = showRecent ? recentSearches : results;
    const maxIndex = items.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex <= maxIndex) {
          if (showRecent) {
            handleSearch(recentSearches[selectedIndex]);
          } else {
            handleProductClick(results[selectedIndex]);
          }
        } else {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results, recentSearches]);

  return (
    <div className={cn('relative w-full', className)}>
      {/* Search Input */}
      <div className="relative">
        {!query && (
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        )}
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools across all suppliers..."
          className={cn("h-12 sm:h-14 pr-12 text-base sm:text-lg bg-background border-2 border-elec-yellow/30 focus:border-elec-yellow focus:ring-elec-yellow rounded-xl touch-manipulation", !query && "pl-12")}
          autoFocus={autoFocus}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full touch-manipulation"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {/* Recent Searches */}
          {showRecent && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Recent Searches
                </span>
                <button
                  onClick={clearSearches}
                  className="text-xs text-muted-foreground hover:text-foreground touch-manipulation"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-muted rounded-lg touch-manipulation transition-colors',
                    selectedIndex === index && 'bg-muted'
                  )}
                >
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {hasResults && (
            <div className="p-2">
              <div className="px-3 py-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Products
                </span>
              </div>
              {results.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 hover:bg-muted rounded-lg touch-manipulation transition-colors',
                    selectedIndex === index && 'bg-muted'
                  )}
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt=""
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{product.supplier_name}</span>
                      {product.is_on_sale && (
                        <span className="text-green-500 font-medium">
                          {product.discount_percentage}% off
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-elec-yellow">
                      £{product.current_price.toFixed(2)}
                    </p>
                    {product.regular_price && product.is_on_sale && (
                      <p className="text-sm text-muted-foreground line-through">
                        £{product.regular_price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </button>
              ))}

              {/* View All Results */}
              {searchResults?.hasMore && (
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 text-elec-yellow hover:bg-muted rounded-lg touch-manipulation font-medium"
                >
                  <TrendingUp className="h-4 w-4" />
                  View all results for "{query}"
                </button>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && !hasResults && (
            <div className="p-8 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query.length >= 2 && !hasResults && !showRecent && (
            <div className="p-8 text-center">
              <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No products found for "{query}"</p>
              <button
                onClick={() => handleSearch(query)}
                className="mt-2 text-sm text-elec-yellow hover:underline touch-manipulation"
              >
                Search anyway
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
