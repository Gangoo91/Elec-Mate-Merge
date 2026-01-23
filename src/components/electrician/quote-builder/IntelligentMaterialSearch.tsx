import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, ShoppingCart, ExternalLink, Package, Sparkles, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";
import { useMaterialsAutocomplete } from "@/hooks/useMaterialsAutocomplete";

interface IntelligentMaterialSearchProps {
  onAddToQuote?: (material: MaterialToQuoteItem, quantity?: number) => void;
}

interface SearchResult {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
  highlights?: string[];
  similarity?: number;
  brand?: string;
  description?: string;
  isFuzzyMatch?: boolean;
}

export const IntelligentMaterialSearch = ({ onAddToQuote }: IntelligentMaterialSearchProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchMethod, setSearchMethod] = useState<string>("");
  const [serverSuggestions, setServerSuggestions] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Autocomplete hook
  const { suggestions: autocompleteSuggestions, isLoading: autocompleteLoading } = useMaterialsAutocomplete(
    searchQuery,
    { debounceMs: 150, minChars: 2, maxSuggestions: 8 }
  );

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    "all",
    "Cables & Wires",
    "Consumer Units",
    "Protection Devices",
    "Sockets & Switches",
    "Lighting",
    "Accessories"
  ];

  const suppliers = [
    "all",
    "BG Electrical",
    "CEF",
    "Screwfix",
    "TLC Direct",
    "Wylex",
    "Crabtree"
  ];

  const handleSearch = async (queryOverride?: string) => {
    const queryToSearch = queryOverride || searchQuery;

    if (!queryToSearch.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term to find materials.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResults([]);
    setServerSuggestions([]);
    setShowAutocomplete(false);

    try {
      console.log('🔍 Fuzzy searching 43k materials:', { query: queryToSearch, selectedCategory, selectedSupplier });

      const { data, error: functionError } = await supabase.functions.invoke('search-materials-fast', {
        body: {
          query: queryToSearch,
          categoryFilter: selectedCategory !== "all" ? selectedCategory : null,
          supplierFilter: selectedSupplier !== "all" ? selectedSupplier : null,
          limit: 50
        }
      });

      if (functionError) {
        console.error('❌ Fuzzy search error:', functionError);
        throw new Error(functionError.message);
      }

      console.log('✅ Fuzzy search results:', data);

      if (data?.materials && data.materials.length > 0) {
        setSearchResults(data.materials);
        setSearchMethod(data.searchMethod || 'fuzzy_trigram');

        const fuzzyCount = data.materials.filter((m: SearchResult) => m.isFuzzyMatch).length;
        toast({
          title: "Search Complete",
          description: `Found ${data.materials.length} materials${fuzzyCount > 0 ? ` (${fuzzyCount} fuzzy matches)` : ''}`,
        });
      } else {
        // Store server suggestions for "Did you mean?" display
        if (data?.suggestions && data.suggestions.length > 0) {
          setServerSuggestions(data.suggestions);
        }
        setError("No materials found matching your search.");
        toast({
          title: "No Results",
          description: data?.suggestions?.length > 0
            ? "Check 'Did you mean?' suggestions below"
            : "Try broader search terms or remove filters.",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      console.error('❌ Search failed:', err);
      setError(err.message || "Failed to search materials");
      toast({
        title: "Search Failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowAutocomplete(false);
    handleSearch(suggestion);
  };

  // Highlight matching text in a string
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    let result = text;

    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, '<mark class="bg-elec-yellow/30 text-foreground rounded px-0.5">$1</mark>');
    });

    return result;
  };

  const handleAddToQuote = (material: SearchResult) => {
    if (!onAddToQuote) return;

    const materialToAdd: MaterialToQuoteItem = {
      id: material.id,
      name: material.name,
      category: material.category,
      price: material.price,
      supplier: material.supplier,
      stockStatus: material.stockStatus,
      productUrl: material.productUrl,
      highlights: material.highlights
    };

    onAddToQuote(materialToAdd, 1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
    setSelectedCategory("all");
    setSelectedSupplier("all");
    setServerSuggestions([]);
    setShowAutocomplete(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Package className="h-6 w-6 text-elec-yellow" />
          <h3 className="text-2xl font-bold text-foreground">Intelligent Material Search</h3>
        </div>
        <p className="text-muted-foreground">
          Search across <span className="text-elec-yellow font-semibold">43,371 materials</span> with AI-powered matching
        </p>
      </div>

      {/* Search Interface */}
      <Card className="bg-card/50 border border-primary/20">
        <div className="p-4 sm:p-6 space-y-4">
          {/* Main Search Bar with Autocomplete */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4 text-elec-yellow" />
              Search Materials
              {autocompleteLoading && (
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              )}
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  id="search"
                  placeholder="e.g. '13A socket', 'sockt' (typos OK!), 'downlight'..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowAutocomplete(true);
                  }}
                  onFocus={() => setShowAutocomplete(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    } else if (e.key === 'Escape') {
                      setShowAutocomplete(false);
                    }
                  }}
                  className="h-12 text-base touch-manipulation"
                  disabled={isSearching}
                  autoComplete="off"
                />

                {/* Autocomplete Dropdown */}
                {showAutocomplete && autocompleteSuggestions.length > 0 && !isSearching && (
                  <div
                    ref={autocompleteRef}
                    className="absolute z-[100] w-full mt-1 bg-card border border-primary/20 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="p-2 border-b border-primary/10 flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-elec-yellow" />
                      Suggestions
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                      {autocompleteSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.name)}
                          className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors border-b border-primary/5 last:border-b-0 touch-manipulation"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-sm font-medium text-foreground line-clamp-1"
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(suggestion.name, searchQuery)
                              }}
                            />
                            <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                              {Math.round(suggestion.score * 100)}%
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {suggestion.category}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={isSearching || !searchQuery.trim()}
                className="h-12 px-6"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="h-11 touch-manipulation bg-elec-gray border-white/[0.1] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-white/[0.1]">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier" className="text-sm font-medium">Supplier</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger id="supplier" className="h-11 touch-manipulation bg-elec-gray border-white/[0.1] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-white/[0.1]">
                  {suppliers.map(sup => (
                    <SelectItem key={sup} value={sup}>
                      {sup === "all" ? "All Suppliers" : sup}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchResults.length > 0 && (
            <Button variant="outline" onClick={clearSearch} className="w-full">
              Clear Search
            </Button>
          )}
        </div>
      </Card>

      {/* Error State with "Did you mean?" Suggestions */}
      {error && (
        <Card className="p-6 border-destructive/20 bg-destructive/10">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>

            {/* Did you mean? suggestions */}
            {serverSuggestions.length > 0 && (
              <div className="pt-4 border-t border-destructive/20">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Did you mean?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {serverSuggestions.slice(0, 5).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{searchResults.length}</span> materials
              {searchMethod && (
                <span className="ml-2 text-xs text-elec-yellow">
                  ({searchMethod === 'fuzzy_trigram' ? 'Fuzzy Search' : 'Keyword'})
                </span>
              )}
            </p>
            {searchResults.some(m => m.isFuzzyMatch) && (
              <span className="text-xs px-2 py-1 bg-elec-yellow/10 text-elec-yellow rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Includes fuzzy matches
              </span>
            )}
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {searchResults.map((material) => (
              <Card key={material.id} className={`bg-card border transition-all ${
                material.isFuzzyMatch
                  ? 'border-elec-yellow/30 hover:border-elec-yellow/60'
                  : 'border-primary/20 hover:border-elec-yellow/50'
              }`}>
                <div className="p-4 space-y-3">
                  {/* Material Name with Fuzzy Match Indicator */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="font-semibold text-foreground line-clamp-2 text-sm flex-1"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(material.name, searchQuery)
                        }}
                      />
                      {material.isFuzzyMatch && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-elec-yellow/20 text-elec-yellow rounded shrink-0">
                          Fuzzy
                        </span>
                      )}
                    </div>
                    {material.brand && (
                      <p className="text-xs text-muted-foreground">{material.brand}</p>
                    )}
                  </div>

                  {/* Price & Supplier */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-2xl font-bold text-elec-yellow">
                        {material.price}
                      </p>
                      <p className="text-xs text-muted-foreground">{material.supplier}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        material.stockStatus === "In Stock"
                          ? "bg-green-500/20 text-green-400"
                          : material.stockStatus === "Low Stock"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {material.stockStatus}
                      </span>
                    </div>
                  </div>

                  {/* Category & Similarity Score */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>{material.category}</span>
                    {material.similarity !== undefined && (
                      <span className={`ml-auto font-medium ${
                        material.similarity >= 0.9 ? 'text-green-400' :
                        material.similarity >= 0.7 ? 'text-elec-yellow' :
                        'text-orange-400'
                      }`}>
                        {Math.round(material.similarity * 100)}% match
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  {material.highlights && material.highlights.length > 0 && (
                    <div className="space-y-1">
                      {material.highlights.slice(0, 2).map((highlight, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground line-clamp-1">
                          • {highlight}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleAddToQuote(material)}
                      className="flex-1 h-9 touch-manipulation"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Quote
                    </Button>
                    {material.productUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 touch-manipulation"
                        onClick={() => window.open(material.productUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && searchResults.length === 0 && !error && searchQuery && (
        <Card className="p-12 text-center border-dashed">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No results yet</h3>
          <p className="text-sm text-muted-foreground">
            Try searching for materials like "sockets", "cables", "consumer unit"
          </p>
        </Card>
      )}
    </div>
  );
};
