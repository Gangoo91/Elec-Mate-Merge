import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Info, Loader2, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useJobTypes } from "@/hooks/useJobTypes";
import EnhancedPricingCard from "./EnhancedPricingCard";

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
      const { data, error } = await supabase.functions.invoke('regional-pricing', {
        body: {
          location: searchLocation.trim(),
          jobType: selectedJobType === 'all' ? null : selectedJobType
        }
      });

      if (error) throw error;

      setSearchResults(data.results || []);
      
      // Check if we have community-verified data
      const communityVerified = data.results?.filter(
        (r: any) => r.data_source === 'community_verified'
      ).length || 0;
      
      setCommunityStats({
        total: data.results?.length || 0,
        communityVerified,
        location: data.location,
        isApproximate: data.isApproximate
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          UK Regional Job Pricing
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Search for current UK electrical job pricing by location and job type
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enhanced Search Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <Input
              placeholder="Enter UK location (e.g., Manchester, Birmingham, SW1 2AA)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger>
                <SelectValue placeholder="All job types" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all">All job types</SelectItem>
                {jobTypesLoading ? (
                  <SelectItem value="loading" disabled>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </SelectItem>
                ) : (
                  jobTypes?.byCategory && Object.entries(jobTypes.byCategory).map(([category, jobs]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted/50">
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
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSearch} 
            disabled={!searchLocation.trim() || isSearching}
            className="flex-1"
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
            <Button variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>

        {/* Community Stats Banner */}
        {communityStats && (
          <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Search Results for {communityStats.location?.region || searchLocation}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">{communityStats.total}</span>
                <span className="text-blue-700 ml-1">pricing records</span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">{communityStats.communityVerified}</span>
                <span className="text-blue-700 ml-1">community verified</span>
              </div>
              <div className="md:col-span-1 col-span-2">
                <Badge variant={communityStats.isApproximate ? "secondary" : "default"} className="text-xs">
                  {communityStats.isApproximate ? "Estimated" : "Current market data"}
                </Badge>
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
              Enter a UK location to view current market rates for electrical work
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'EV Charger Install'].map(term => (
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
            About UK Regional Pricing
          </h4>
          <p className="text-sm text-muted-foreground">
            Prices combine market research, live job board data, and community submissions. 
            Community-verified prices come from real UK electricians and are updated regularly. 
            Always obtain multiple local quotes for your specific requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRegionalPricing;
