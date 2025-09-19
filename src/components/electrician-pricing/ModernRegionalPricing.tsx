import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Info, 
  Loader2, 
  TrendingUp, 
  Users, 
  Clock,
  Star,
  Zap,
  X,
  Filter
} from "lucide-react";
import RealMarketInsights from "./RealMarketInsights";
import { supabase } from "@/integrations/supabase/client";
import { useJobTypes } from "@/hooks/useJobTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ModernSubmitPage from "./ModernSubmitPage";

interface RegionalPricingData {
  id: string;
  region: string;
  county: string;
  job_type: string;
  job_category: string;
  min_price: number;
  max_price: number;
  average_price: number;
  currency: string;
  unit: string;
  complexity_level: string;
  last_updated: string;
  data_source: string;
}

interface PostcodeDistrict {
  district_code: string;
  region: string;
  county: string;
  local_authority: string;
}

const ModernRegionalPricing = () => {
  const { data: jobTypes, isLoading: jobTypesLoading } = useJobTypes();
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RegionalPricingData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [communityStats, setCommunityStats] = useState<any>(null);
  
  // New state for inline suggestions
  const [searchSuggestions, setSearchSuggestions] = useState<PostcodeDistrict[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Popular locations for quick access
  const popularLocations = [
    { code: "M1", name: "Manchester" },
    { code: "SW1", name: "Westminster" },
    { code: "B1", name: "Birmingham" },
    { code: "LS1", name: "Leeds" },
    { code: "G1", name: "Glasgow" },
    { code: "E1", name: "East London" }
  ];

  // Debounced search for suggestions
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsFetchingSuggestions(true);
    try {
      const { data, error } = await supabase
        .from('uk_postcode_districts')
        .select('area_code, region, county, local_authority')
        .or(`area_code.ilike.%${query}%,region.ilike.%${query}%,local_authority.ilike.%${query}%`)
        .limit(8);

      if (error) throw error;
      
      const suggestions = (data || []).map((item: any) => ({
        district_code: item.area_code || query,
        region: item.region || 'UK',
        county: item.county || '',
        local_authority: item.local_authority || ''
      }));
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Fallback to simple suggestions
      setSearchSuggestions([{
        district_code: query.toUpperCase(),
        region: 'UK',
        county: '',
        local_authority: 'Search for this location'
      }]);
      setShowSuggestions(true);
    } finally {
      setIsFetchingSuggestions(false);
    }
  }, []);

  // Remove auto-search to use explicit search button instead

  // Fetch suggestions when input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(searchLocation);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchLocation, fetchSuggestions]);

  const handleSearch = async () => {
    if (!searchLocation.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchPerformed(true);
    setShowSuggestions(false);

    try {
      const { data, error } = await supabase.functions.invoke('enhanced-regional-pricing', {
        body: {
          location: searchLocation.trim(),
          jobType: selectedJobType === 'all' ? null : selectedJobType,
          includeNearby: true,
          maxDistance: 10
        }
      });

      if (error) throw error;

      setSearchResults(data.results || []);
      
      const communityVerified = data.results?.filter(
        (r: any) => r.pricing_data_sources?.source_type === 'community'
      ).length || 0;
      
      setCommunityStats({
        total: data.results?.length || 0,
        communityVerified,
        location: data.search_metadata,
        isApproximate: data.search_metadata?.search_strategy !== 'exact_postcode'
      });

    } catch (error: any) {
      console.error('Search error:', error);
      setSearchError(error.message || 'Failed to search pricing data');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: PostcodeDistrict) => {
    setSearchLocation(suggestion.district_code);
    setShowSuggestions(false);
  };

  const handleQuickLocation = (location: { code: string; name: string }) => {
    setSearchLocation(location.code);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchLocation("");
    setSelectedJobType("all");
    setSearchResults([]);
    setSearchPerformed(false);
    setSearchError(null);
    setCommunityStats(null);
    setShowSuggestions(false);
  };

  const formatPrice = (price: number | null | undefined, unit: string, currency: string = 'GBP') => {
    if (price === null || price === undefined || isNaN(price)) {
      return 'Price TBC';
    }
    const symbol = currency === 'GBP' ? '£' : currency;
    return `${symbol}${price.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  };

  const calculateFallbackAverage = (min: number | null, max: number | null): number | null => {
    if (min !== null && max !== null && !isNaN(min) && !isNaN(max)) {
      return Math.round((min + max) / 2);
    }
    return null;
  };

  const getDataFreshness = (lastUpdated: string) => {
    const now = new Date();
    const updated = new Date(lastUpdated);
    
    // Handle invalid dates
    if (isNaN(updated.getTime())) {
      return { text: 'Date unknown', color: 'secondary' };
    }
    
    const diffInDays = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return { text: 'Today', color: 'default' };
    if (diffInDays === 1) return { text: 'Yesterday', color: 'default' };
    if (diffInDays <= 7) return { text: `${diffInDays}d ago`, color: 'default' };
    if (diffInDays <= 30) return { text: `${diffInDays}d ago`, color: 'secondary' };
    return { text: `${diffInDays}d ago`, color: 'destructive' };
  };

  const getComplexityColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'basic': 
      case 'simple': 
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'standard': 
      case 'medium': 
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'complex': 
      case 'advanced': 
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'expert': 
      case 'specialist': 
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: 
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const renderPricingCard = (item: RegionalPricingData) => {
    const fallbackAverage = item.average_price || calculateFallbackAverage(item.min_price, item.max_price);
    const priceRange = (item.max_price || 0) - (item.min_price || 0);
    const avgPosition = priceRange > 0 && fallbackAverage ? 
      ((fallbackAverage - (item.min_price || 0)) / priceRange) * 100 : 50;
    const freshness = getDataFreshness(item.last_updated);

    return (
      <Card key={item.id} className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-card/90 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        
        <CardContent className="relative p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {item.job_type}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.job_category}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 items-start">
                <Badge className={`text-xs font-medium ${getComplexityColor(item.complexity_level)}`}>
                  {item.complexity_level}
                </Badge>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary/70 flex-shrink-0" />
              <span className="font-medium">{item.region}</span>
              {item.county && <span className="text-muted-foreground/70">• {item.county}</span>}
            </div>
          </div>

          {/* Enhanced Price Display */}
          <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 rounded-xl p-5 border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
            <div className="text-center space-y-4">
              {/* Main Price */}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Starting from</div>
                <div className="text-3xl font-black text-primary mb-2 tracking-tight">
                  {formatPrice(item.min_price, '')}
                </div>
                <div className="text-sm text-muted-foreground">
                  {fallbackAverage && (
                    <>Avg: {formatPrice(fallbackAverage, '')} • </>
                  )}
                  {item.unit}
                </div>
              </div>

              {/* Price Range Visualization */}
              {item.min_price !== null && item.max_price !== null && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {formatPrice(item.min_price, '')}</span>
                    <span>Max: {formatPrice(item.max_price, '')}</span>
                  </div>
                  <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"></div>
                    {fallbackAverage && (
                      <div 
                        className="absolute top-0 w-1 h-2 bg-primary rounded-full transform -translate-x-0.5 transition-all duration-700"
                        style={{ left: `${Math.min(Math.max(avgPosition, 0), 100)}%` }}
                      />
                    )}
                  </div>
                  {fallbackAverage && (
                    <div className="text-xs text-primary/80 font-medium">
                      Average position in range
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {item.data_source === 'community' ? (
                  <><Users className="h-3 w-3 mr-1" />Community</>
                ) : (
                  <><TrendingUp className="h-3 w-3 mr-1" />Market</>
                )}
              </Badge>
              <Badge variant={freshness.color as any} className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {freshness.text}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">Verified</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="mobile-container py-8 sm:py-12">
          <div className="text-center mb-8">
            <h1 className="mobile-heading gradient-text mb-4">
              UK Regional Electrical Pricing
            </h1>
            <p className="mobile-text text-muted-foreground max-w-2xl mx-auto">
              Discover accurate electrical job pricing for any UK location. Get instant market rates,
              community-verified prices, and detailed regional insights.
            </p>
          </div>

          {/* Search Interface */}
          <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Location Search */}
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder="Enter UK postcode or location (e.g., M1, Birmingham, London)..."
                      className="pl-12 h-14 text-lg bg-background/50 border-muted/40 focus:border-primary/60"
                      onFocus={() => {
                        if (searchSuggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      onBlur={(e) => {
                        // Keep suggestions open if clicking on them
                        setTimeout(() => {
                          if (!e.currentTarget.contains(document.activeElement)) {
                            setShowSuggestions(false);
                          }
                        }, 150);
                      }}
                    />
                    {searchLocation && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    {isSearching && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Inline Suggestions - Better UX without absolute positioning */}
                  {showSuggestions && (searchSuggestions.length > 0 || isFetchingSuggestions) && (
                    <div className="mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      <Card className="border-primary/20 shadow-lg">
                        <CardContent className="p-0">
                          {isFetchingSuggestions ? (
                            <div className="p-4 text-center">
                              <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Searching locations...</p>
                            </div>
                          ) : (
                            <div className="max-h-48 overflow-y-auto">
                              {searchSuggestions.map((suggestion) => (
                                <button
                                  key={suggestion.district_code}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="w-full p-3 text-left hover:bg-accent/80 border-b border-border/20 last:border-b-0 transition-all duration-150 hover:scale-[1.01]"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-md bg-primary/10">
                                      <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{suggestion.district_code}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {suggestion.local_authority}, {suggestion.region}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Quick Location Access */}
                {!searchLocation && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Popular locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularLocations.map((location) => (
                        <Button
                          key={location.code}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickLocation(location)}
                          className="h-9 border-primary/30 hover:bg-primary/10 hover:border-primary/60"
                        >
                          {location.code} - {location.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Type Filter */}
                <div className="flex items-center gap-4">
                  <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger className="h-12 bg-background/50 border-muted/40">
                      <SelectValue placeholder="Filter by job type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      <SelectItem value="all">All job types</SelectItem>
                      {jobTypesLoading ? (
                        <SelectItem value="loading" disabled>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Loading...
                        </SelectItem>
                      ) : (
                        jobTypes?.byCategory && Object.entries(jobTypes.byCategory).map(([category, jobs]) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-xs font-medium text-primary/80 bg-accent/30 sticky top-0">
                              {category}
                            </div>
                            {jobs.map((job) => (
                              <SelectItem key={job.job_type} value={job.job_type}>
                                {job.job_type}
                              </SelectItem>
                            ))}
                          </div>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={handleSearch}
                    disabled={!searchLocation.trim() || isSearching}
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Search Pricing
                      </>
                    )}
                  </Button>
                  
                  {searchPerformed && (
                    <Button 
                      onClick={clearSearch}
                      variant="outline"
                      className="h-12 px-6 border-primary/30 hover:bg-primary/10"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      <div className="mobile-container py-8">
        {/* Results Summary */}
        {communityStats && (
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Results for {communityStats.location?.postcode_district || searchLocation}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {communityStats.isApproximate ? "Expanded regional search" : "Exact postcode match"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <p className="text-2xl font-bold text-primary">{communityStats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <p className="text-2xl font-bold text-accent">{communityStats.communityVerified}</p>
                  <p className="text-xs text-muted-foreground">Community Verified</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-4 w-4 text-primary mr-1" />
                    <p className="text-lg font-bold">95%</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Data Accuracy</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <Badge variant={communityStats.isApproximate ? "secondary" : "default"} className="mb-2">
                    {communityStats.isApproximate ? "Regional" : "Exact"}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Match Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchError ? (
          <Card className="text-center py-12 border-destructive/20">
            <CardContent>
              <Info className="h-12 w-12 mx-auto mb-4 text-destructive/50" />
              <h3 className="font-semibold text-destructive mb-2">Search Error</h3>
              <p className="text-sm text-muted-foreground">{searchError}</p>
            </CardContent>
          </Card>
        ) : searchPerformed ? (
          searchResults.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="mobile-subheading">
                  Pricing Results ({searchResults.length})
                </h2>
                <Button variant="outline" size="sm" onClick={clearSearch}>
                  Clear Search
                </Button>
              </div>
              
              <div className="grid gap-4 sm:gap-6">
                {searchResults.map(renderPricingCard)}
              </div>
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-semibold mb-2">No Results Found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  No pricing data found for "{searchLocation}"
                  {selectedJobType !== 'all' && ` - ${selectedJobType}`}
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  Try Different Search
                </Button>
              </CardContent>
            </Card>
          )
        ) : (
          <Card className="text-center py-12 border-primary/20">
            <CardContent>
              <div className="p-4 rounded-full bg-primary/10 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mobile-subheading mb-4">Ready to Find Pricing?</h3>
              <p className="mobile-text text-muted-foreground mb-6 max-w-md mx-auto">
                Enter a UK postcode or location above to discover accurate electrical job pricing
                in your area. Our data includes market rates and community-verified prices.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Consumer Unit', 'Socket Installation', 'Light Fitting', 'EV Charger'].map(jobType => (
                  <Button
                    key={jobType}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJobType(jobType)}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    {jobType}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Tab Navigation */}
        <div className="mt-12">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search">
                <MapPin className="h-4 w-4 mr-2" />
                Regional
              </TabsTrigger>
              <TabsTrigger value="insights">
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="contribute">
                <Users className="h-4 w-4 mr-2" />
                Contribute Data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="mt-8">
              <RealMarketInsights />
            </TabsContent>
            
            <TabsContent value="contribute" className="mt-8">
              <ModernSubmitPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ModernRegionalPricing;