import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Info, Loader2, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useJobTypes } from "@/hooks/useJobTypes";
import EnhancedPricingCard from "./EnhancedPricingCard";
import PostcodeAutocomplete from "./PostcodeAutocomplete";
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

interface PricingResult {
  success: boolean;
  results: RegionalPricingData[];
  isApproximate: boolean;
  location: any;
  searchLocation: string;
  jobType: string;
}

const EnhancedRegionalPricing = () => {
  const { data: jobTypes, isLoading: jobTypesLoading } = useJobTypes();
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RegionalPricingData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [communityStats, setCommunityStats] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchLocation.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchPerformed(true);

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
      
      // Check if we have community-verified data
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchLocation("");
    setSelectedJobType("all");
    setSearchResults([]);
    setSearchPerformed(false);
    setSearchError(null);
    setCommunityStats(null);
  };

  const refreshData = () => {
    if (searchLocation.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            Enhanced UK Postcode Pricing
          </CardTitle>
          <p className="text-sm text-white">
            Get accurate electrical job pricing for any UK postcode district
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Enhanced Search Interface */}
          <div className="space-y-3">
            <div>
              <PostcodeAutocomplete
                value={searchLocation}
                onChange={setSearchLocation}
                placeholder="Enter UK postcode or location (e.g., M1, SW1, Birmingham)..."
              />
            </div>
            <div>
              <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="All job types" />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto bg-elec-dark border-elec-yellow/20 z-[9999]">
                  <SelectItem value="all">All job types</SelectItem>
                  {jobTypesLoading ? (
                    <SelectItem value="loading" disabled>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </SelectItem>
                  ) : (
                    jobTypes?.byCategory && Object.entries(jobTypes.byCategory).map(([category, jobs]) => (
                      <div key={category}>
                        <div className="px-2 py-1 text-xs font-medium text-elec-yellow/80 bg-elec-gray/30 sticky top-0">
                          {category}
                        </div>
                        {jobs.map((job) => (
                          <SelectItem key={job.job_type} value={job.job_type} className="hover:bg-elec-yellow/20">
                            {job.job_type}
                          </SelectItem>
                        ))}
                      </div>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleSearch} 
              disabled={!searchLocation.trim() || isSearching}
              className="w-full"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search UK Prices
                </>
              )}
            </Button>
            {searchPerformed && (
              <Button variant="outline" onClick={clearSearch} className="w-full">
                Clear
              </Button>
            )}
          </div>

          {/* Enhanced Results Banner */}
          {communityStats && (
            <div className="p-4 border border-elec-yellow/20 bg-elec-yellow/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium text-white">
                  Results for {communityStats.location?.postcode_district || searchLocation}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-elec-yellow font-medium">{communityStats.total}</span>
                  <span className="text-white/80 ml-1">pricing records</span>
                </div>
                <div>
                  <span className="text-elec-yellow font-medium">{communityStats.communityVerified}</span>
                  <span className="text-white/80 ml-1">community verified</span>
                </div>
                <div>
                  <Badge variant={communityStats.isApproximate ? "secondary" : "default"} className="text-xs">
                    {communityStats.isApproximate ? "Expanded search" : "Exact postcode"}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-white/60">
                    Strategy: {communityStats.location?.search_strategy?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchError ? (
            <div className="text-center py-8 text-red-600">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Search Error</p>
              <p className="text-sm mt-2">{searchError}</p>
            </div>
          ) : searchPerformed ? (
            searchResults.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Found {searchResults.length} result(s) for "{searchLocation}"
                  {selectedJobType !== 'all' && ` - ${selectedJobType}`}
                </p>
                
                <div className="grid gap-4">
                  {searchResults.map((item) => (
                    <EnhancedPricingCard key={item.id} pricingData={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No pricing data found</p>
                <p className="text-sm mt-2">
                  No results for "{searchLocation}"
                  {selectedJobType !== 'all' && ` - ${selectedJobType}`}
                </p>
                <p className="text-sm mt-1">Try searching for a different UK location or job type.</p>
              </div>
            )
          ) : (
            /* Welcome State with Popular Searches */
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium mb-2">Search UK Electrical Job Pricing</p>
              <p className="text-sm mb-4">
                Enter a UK postcode to view current market rates for electrical work
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['M1', 'SW1', 'B1', 'LS1', 'G1', 'EV Charger Install'].map(term => (
                  <Badge 
                    key={term} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-elec-yellow/10"
                    onClick={() => {
                      if (term.includes('Install')) {
                        setSelectedJobType(term);
                      } else {
                        setSearchLocation(term);
                      }
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Info Footer */}
          <div className="p-3 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              About Enhanced Postcode Pricing
            </h4>
            <p className="text-sm text-white">
              Prices use postcode-level data including demographic factors, competition analysis, and real job submissions. 
              Enhanced algorithm considers local income levels, contractor density, and transport accessibility. 
              Community-verified prices come from real UK electricians.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-elec-gray border-elec-yellow/20">
          <TabsTrigger value="search" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            Search Pricing
          </TabsTrigger>
          <TabsTrigger value="contribute" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
            <Users className="h-4 w-4 mr-2" />
            Contribute Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-6">
          {/* Search results are already shown above */}
        </TabsContent>
        
        <TabsContent value="contribute" className="mt-6">
          <CommunityPricingSubmission onSubmissionSuccess={refreshData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedRegionalPricing;