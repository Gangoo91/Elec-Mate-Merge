import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type?: string;
  icon?: React.ReactNode;
}

interface MobileSearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  onSearch: (query: string) => void;
  results?: SearchResult[];
  recentSearches?: string[];
  onResultClick?: (result: SearchResult) => void;
  onClearRecent?: () => void;
  isLoading?: boolean;
}

/**
 * Full-screen search sheet optimized for mobile.
 * Includes recent searches and instant results.
 */
export function MobileSearchSheet({
  open,
  onOpenChange,
  placeholder = "Search...",
  onSearch,
  results = [],
  recentSearches = [],
  onResultClick,
  onClearRecent,
  isLoading = false,
}: MobileSearchSheetProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClose = () => {
    setQuery("");
    onOpenChange(false);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    onSearch(term);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="h-full w-full p-0 border-0 bg-background"
      >
        <div className="flex flex-col h-full">
          {/* Search Header */}
          <div className="flex items-center gap-2 p-3 border-b border-border bg-elec-gray pt-safe">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 h-12 text-base bg-background border-border"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="shrink-0 text-muted-foreground"
            >
              Cancel
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-6 w-6 border-2 border-elec-yellow border-t-transparent rounded-full" />
              </div>
            )}

            {/* Results */}
            {!isLoading && query && results.length > 0 && (
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Results
                </p>
                <div className="space-y-1">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        onResultClick?.(result);
                        handleClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3",
                        "hover:bg-muted/50 active:bg-muted transition-colors text-left"
                      )}
                    >
                      {result.icon && (
                        <div className="shrink-0">{result.icon}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      {result.type && (
                        <span className="text-xs text-muted-foreground shrink-0">
                          {result.type}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!isLoading && query && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm font-medium text-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for something else
                </p>
              </div>
            )}

            {/* Recent Searches (shown when no query) */}
            {!query && recentSearches.length > 0 && (
              <div className="py-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Recent Searches
                  </p>
                  {onClearRecent && (
                    <button
                      onClick={onClearRecent}
                      className="text-xs text-elec-yellow hover:text-elec-yellow/80"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(term)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3",
                        "hover:bg-muted/50 active:bg-muted transition-colors text-left"
                      )}
                    >
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-foreground flex-1 truncate">
                        {term}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state (no query, no recent) */}
            {!query && recentSearches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Search for jobs, employees, invoices...
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
