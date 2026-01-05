import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, ShoppingCart, ExternalLink, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
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

    try {
      console.log('🔍 Fast searching 43k materials:', { searchQuery, selectedCategory, selectedSupplier });

      const { data, error: functionError } = await supabase.functions.invoke('search-materials-fast', {
        body: {
          query: searchQuery,
          categoryFilter: selectedCategory !== "all" ? selectedCategory : null,
          supplierFilter: selectedSupplier !== "all" ? selectedSupplier : null,
          limit: 50
        }
      });

      if (functionError) {
        console.error('❌ Fast search error:', functionError);
        throw new Error(functionError.message);
      }

      console.log('✅ Fast search results:', data);

      if (data?.materials && data.materials.length > 0) {
        setSearchResults(data.materials);
        setSearchMethod(data.searchMethod || 'fast_keyword');
        
        toast({
          title: "Search Complete",
          description: `Found ${data.materials.length} materials using fast PostgreSQL search`,
        });
      } else {
        setError("No materials found. Try different keywords or filters.");
        toast({
          title: "No Results",
          description: "Try broader search terms or remove filters.",
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
          {/* Main Search Bar */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4 text-elec-yellow" />
              Search Materials
            </Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="e.g. '13A socket white', 'consumer unit 10 way', 'LED downlight'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 text-base"
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
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
                <SelectTrigger id="category" className="h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border shadow-lg">
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
                <SelectTrigger id="supplier" className="h-12">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border shadow-lg">
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

      {/* Error State */}
      {error && (
        <Card className="p-6 border-destructive/20 bg-destructive/10">
          <p className="text-destructive text-center">{error}</p>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{searchResults.length}</span> materials
              {searchMethod && (
                <span className="ml-2 text-xs text-elec-yellow">
                  ({searchMethod === 'fast_keyword' ? 'Fast PostgreSQL' : 'Keyword'} search)
                </span>
              )}
            </p>
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {searchResults.map((material) => (
              <Card key={material.id} className="bg-card border border-primary/20 hover:border-elec-yellow/50 transition-all">
                <div className="p-4 space-y-3">
                  {/* Material Name */}
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground line-clamp-2 text-sm">
                      {material.name}
                    </h4>
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

                  {/* Category & Similarity */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>{material.category}</span>
                    {material.similarity && (
                      <span className="ml-auto text-elec-yellow">
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
                      className="flex-1 h-9"
                      size="sm"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Quote
                    </Button>
                    {material.productUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3"
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
