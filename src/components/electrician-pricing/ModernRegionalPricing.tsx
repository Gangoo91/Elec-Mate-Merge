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
import { supabase } from "@/integrations/supabase/client";
import { useJobTypes } from "@/hooks/useJobTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CommunityPricingSubmission from "./CommunityPricingSubmission";

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

  const formatPrice = (price: number, unit: string, currency: string = 'GBP') => {
    const symbol = currency === 'GBP' ? '£' : currency;
    return `${symbol}${price.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  };

  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-500/20 text-green-400';
      case 'standard': return 'bg-blue-500/20 text-blue-400';
      case 'complex': return 'bg-orange-500/20 text-orange-400';
      case 'expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const renderPricingCard = (item: RegionalPricingData) => (
    <Card key={item.id} className="mobile-card hover:shadow-lg transition-all duration-300 hover:border-primary/40">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{item.job_type}</h3>
                <p className="text-sm text-muted-foreground">{item.job_category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {item.region}{item.county && `, ${item.county}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Min</p>
                <p className="font-semibold text-sm">{formatPrice(item.min_price, item.unit)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Average</p>
                <p className="font-semibold text-sm text-primary">{formatPrice(item.average_price, item.unit)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Max</p>
                <p className="font-semibold text-sm">{formatPrice(item.max_price, item.unit)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={`text-xs ${getComplexityColor(item.complexity_level)}`}>
                {item.complexity_level}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.data_source === 'community' ? (
                  <><Users className="h-3 w-3 mr-1" />Community</>
                ) : (
                  <><TrendingUp className="h-3 w-3 mr-1" />Market Data</>
                )}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(item.last_updated).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

                  {/* Inline Suggestions */}
                  {showSuggestions && (searchSuggestions.length > 0 || isFetchingSuggestions) && (
                    <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-primary/20 shadow-xl">
                      <CardContent className="p-0">
                        {isFetchingSuggestions ? (
                          <div className="p-4 text-center">
                            <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Searching locations...</p>
                          </div>
                        ) : (
                          <div className="max-h-64 overflow-y-auto">
                            {searchSuggestions.map((suggestion) => (
                              <button
                                key={suggestion.district_code}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full p-4 text-left hover:bg-accent/50 border-b border-border/20 last:border-b-0 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">{suggestion.district_code}</p>
                                    <p className="text-sm text-muted-foreground">
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

        {/* Community Contribution Tab */}
        <div className="mt-12">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Search Results</TabsTrigger>
              <TabsTrigger value="contribute">
                <Users className="h-4 w-4 mr-2" />
                Contribute Data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="contribute" className="mt-8">
              <CommunityPricingSubmission onSubmissionSuccess={() => {
                if (searchLocation.trim()) {
                  handleSearch();
                }
              }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ModernRegionalPricing;