import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Search, X, Clock, Zap, HardHat, AlertTriangle, Building2, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HazardCardV2 } from './HazardCardV2';
import type { EnhancedRiskConsequence } from '@/data/hazards';

interface HazardSearchOverlayProps {
  open: boolean;
  onClose: () => void;
  hazards: EnhancedRiskConsequence[];
  bookmarks: Set<string>;
  onSelectHazard: (hazard: EnhancedRiskConsequence) => void;
  onToggleBookmark: (id: string) => void;
}

// Popular category cards for empty search state
const popularCategories = [
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'from-yellow-500/20 to-yellow-500/5' },
  { id: 'height', name: 'Working at Height', icon: HardHat, color: 'from-blue-500/20 to-blue-500/5' },
  { id: 'asbestos', name: 'Hazardous Materials', icon: AlertTriangle, color: 'from-red-500/20 to-red-500/5' },
  { id: 'structural', name: 'Structural', icon: Building2, color: 'from-gray-500/20 to-gray-500/5' },
];

const RECENT_SEARCHES_KEY = 'hazard-recent-searches';
const MAX_RECENT = 5;

export const HazardSearchOverlay: React.FC<HazardSearchOverlayProps> = ({
  open,
  onClose,
  hazards,
  bookmarks,
  onSelectHazard,
  onToggleBookmark,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Clear query when closing
  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  // Search results - limit to 20 for performance
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return hazards
      .filter(
        (h) =>
          h.hazard.toLowerCase().includes(lowerQuery) ||
          h.consequence.toLowerCase().includes(lowerQuery) ||
          h.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 20); // Limit results for mobile performance
  }, [query, hazards]);

  // Save search to recent
  const saveSearch = (term: string) => {
    if (!term.trim()) return;

    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      MAX_RECENT
    );
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  // Handle selecting a hazard
  const handleSelectHazard = (hazard: EnhancedRiskConsequence) => {
    saveSearch(query);
    onSelectHazard(hazard);
    onClose();
  };

  // Clear recent searches
  const clearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      // Ignore
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-elec-dark transition-all duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Search Header */}
      <div className="sticky top-0 bg-elec-dark/95 backdrop-blur-md px-4 pt-4 pb-2 border-b border-white/[0.06] safe-area-inset-top">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            {!query && (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hazards, controls, PPE..."
              className={cn(
                "w-full h-12 bg-white/[0.05] rounded-2xl pr-10 text-white",
                "placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50",
                "border border-white/[0.08]",
                !query && "pl-12"
              )}
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/[0.1]"
              >
                <X className="h-5 w-5 text-white/40" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-elec-yellow font-medium text-sm px-2 py-2"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Search Content */}
      <div
        className="px-4 py-4 overflow-y-auto"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {!query ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs text-white/50 uppercase tracking-wider font-medium">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecent}
                    className="text-xs text-elec-yellow hover:text-elec-yellow/80"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className={cn(
                        "w-full flex items-center gap-3 py-3 px-4 rounded-xl",
                        "hover:bg-white/[0.05] transition-colors text-left"
                      )}
                    >
                      <Clock className="h-4 w-4 text-white/30" />
                      <span className="text-white/70">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse by Category */}
            <div>
              <h3 className="text-xs text-white/50 uppercase tracking-wider font-medium mb-3">
                Browse by Category
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {popularCategories.map((cat) => {
                  const Icon = cat.icon;
                  const count = hazards.filter(
                    (h) => h.category === cat.id
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setQuery(cat.name)}
                      className={cn(
                        "flex flex-col items-start p-4 rounded-2xl",
                        "bg-gradient-to-br border border-white/[0.06]",
                        cat.color,
                        "hover:border-white/[0.12] transition-all active:scale-[0.98]"
                      )}
                    >
                      <Icon className="h-6 w-6 text-white/70 mb-2" />
                      <span className="text-sm font-medium text-white">
                        {cat.name}
                      </span>
                      <span className="text-xs text-white/40 mt-0.5">
                        {count} hazard{count !== 1 ? 's' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="text-sm font-medium text-white mb-2">
                Search Tips
              </h4>
              <ul className="text-xs text-white/50 space-y-1.5">
                <li>Try searching for specific hazards like "electric shock"</li>
                <li>Search by PPE type like "insulated gloves"</li>
                <li>Find by work type like "installation" or "testing"</li>
              </ul>
            </div>
          </>
        ) : results.length > 0 ? (
          /* Search Results */
          <div>
            <p className="text-xs text-white/50 mb-3">
              {results.length} result{results.length !== 1 ? 's' : ''} for "
              {query}"
            </p>
            <div className="space-y-3">
              {results.map((hazard, i) => (
                <HazardCardV2
                  key={hazard.id}
                  hazard={hazard}
                  index={i}
                  isBookmarked={bookmarks.has(hazard.id)}
                  onTap={() => handleSelectHazard(hazard)}
                  onBookmark={() => onToggleBookmark(hazard.id)}
                  highlight={query}
                />
              ))}
            </div>
          </div>
        ) : (
          /* No Results */
          <div className="flex flex-col items-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
              <Search className="h-10 w-10 text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No Results Found
            </h3>
            <p className="text-sm text-white/50 text-center max-w-xs">
              No hazards match "{query}". Try different keywords or browse by
              category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardSearchOverlay;
