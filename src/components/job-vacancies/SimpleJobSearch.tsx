import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Clock, ExternalLink, X, Loader2, AlertTriangle, Filter } from "lucide-react";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LocationService } from "@/services/locationService";
import EnhancedJobCard from "./EnhancedJobCard";

interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  external_url: string;
  posted_date: string;
  source: string;
}

interface SearchResults {
  jobs: JobResult[];
  totalFound: number;
  searchQueries: string[];
  sources: string[];
}

// Common UK job search terms for suggestions
const JOB_SEARCH_SUGGESTIONS = [
  "electrician",
  "electrical engineer", 
  "electrical technician",
  "electrical installer",
  "electrical supervisor",
  "maintenance electrician",
  "commercial electrician",
  "domestic electrician",
  "industrial electrician",
  "apprentice electrician"
];

const SimpleJobSearch: React.FC = () => {
  const [query, setQuery] = useState("electrician");
  const [location, setLocation] = useState("United Kingdom");
  const [jobType, setJobType] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [locationRadius, setLocationRadius] = useState("25");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [filteredResults, setFilteredResults] = useState<SearchResults | null>(null);
  const [searchTime, setSearchTime] = useState<number>(0);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [locationWarning, setLocationWarning] = useState<string>("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Job type options for the combobox
  const jobTypeOptions: ComboboxOption[] = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
  ];

  // Experience level options for the combobox
  const experienceLevelOptions: ComboboxOption[] = [
    { value: "all", label: "All Levels" },
    { value: "entry", label: "Entry Level" },
    { value: "intermediate", label: "Intermediate" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead/Management" },
  ];

  // Sort options
  const sortOptions: ComboboxOption[] = [
    { value: "relevance", label: "Most Relevant" },
    { value: "date", label: "Most Recent" },
    { value: "salary", label: "Highest Salary" },
    { value: "distance", label: "Nearest Location" },
  ];

  // Location radius options
  const radiusOptions: ComboboxOption[] = [
    { value: "10", label: "Within 10 miles" },
    { value: "25", label: "Within 25 miles" },
    { value: "50", label: "Within 50 miles" },
    { value: "100", label: "Within 100 miles" },
    { value: "unlimited", label: "Unlimited" },
  ];

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jobSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search term to history
  const saveToHistory = useCallback((searchTerm: string) => {
    const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('jobSearchHistory', JSON.stringify(updatedHistory));
  }, [searchHistory]);

  // Debounced search validation
  const validateSearch = useCallback(() => {
    if (!query.trim()) {
      return "Please enter a job search term";
    }
    if (query.trim().length < 2) {
      return "Search term must be at least 2 characters";
    }
    return null;
  }, [query]);

  // Location validation
  const validateLocation = useCallback((locationInput: string) => {
    if (!locationInput.trim()) return "";
    
    const isValid = LocationService.isValidUKLocation(locationInput);
    if (!isValid) {
      return "Location not recognised. Try a UK city, county, or region.";
    }
    return "";
  }, []);

  // Update location warning when location changes
  useEffect(() => {
    const warning = validateLocation(location);
    setLocationWarning(warning);
  }, [location, validateLocation]);

  // Apply client-side filtering and sorting
  const applyClientSideFiltering = useCallback((searchResults: SearchResults) => {
    if (!searchResults || !searchResults.jobs) return searchResults;

    let filteredJobs = [...searchResults.jobs];

    // Apply location filtering if specific location is provided
    if (location && location !== "United Kingdom" && locationRadius !== "unlimited") {
      const radiusMiles = parseInt(locationRadius);
      filteredJobs = LocationService.filterJobsByLocation(filteredJobs, location, radiusMiles);
    }

    // Apply sorting
    switch (sortBy) {
      case "date":
        filteredJobs.sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());
        break;
      case "salary":
        filteredJobs.sort((a, b) => {
          const aSalary = a.salary ? parseFloat(a.salary.replace(/[£,]/g, '')) : 0;
          const bSalary = b.salary ? parseFloat(b.salary.replace(/[£,]/g, '')) : 0;
          return bSalary - aSalary;
        });
        break;
      case "distance":
        // For now, keep original order as distance calculation would need coordinates
        break;
      default: // relevance
        // Keep original order from API
        break;
    }

    return {
      ...searchResults,
      jobs: filteredJobs,
      totalFound: filteredJobs.length
    };
  }, [location, locationRadius, sortBy]);

  const handleSearch = async () => {
    const validationError = validateSearch();
    if (validationError) {
      toast({
        title: "Search Validation",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    // Show location warning but don't prevent search
    if (locationWarning) {
      toast({
        title: "Location Notice",
        description: locationWarning + " Searching UK-wide instead.",
        variant: "default",
      });
    }

    setIsSearching(true);
    const startTime = Date.now();

    try {
      console.log('Starting job search with:', { 
        query: query.trim(), 
        location: location.trim(),
        locationRadius,
        sortBy
      });
      
      const { data, error } = await supabase.functions.invoke('intelligent-job-search', {
        body: {
          query: query.trim(),
          location: location.trim() || "United Kingdom",
          filters: {
            jobType: jobType === "all" ? "" : jobType,
            experienceLevel: experienceLevel === "all" ? "" : experienceLevel,
          }
        },
      });

      if (error) {
        console.error('Job search error:', error);
        throw error;
      }

      const searchDuration = Date.now() - startTime;
      setSearchTime(searchDuration);
      setResults(data);
      
      // Apply client-side filtering and sorting
      const filtered = applyClientSideFiltering(data);
      setFilteredResults(filtered);
      
      // Save successful search to history
      saveToHistory(query.trim());

      if (filtered.totalFound === 0) {
        toast({
          title: "No Results Found",
          description: "Try different keywords, broader location, or adjust your filters",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${filtered.totalFound} jobs in ${searchDuration}ms`,
        });
      }

    } catch (error) {
      console.error('Job search error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to search jobs";
      
      toast({
        title: "Search Failed", 
        description: `${errorMessage}. Please check your connection and try again.`,
        variant: "destructive",
      });
      
      // Set empty results on error
      setResults({ jobs: [], totalFound: 0, searchQueries: [], sources: [] });
      setFilteredResults({ jobs: [], totalFound: 0, searchQueries: [], sources: [] });
    } finally {
      setIsSearching(false);
    }
  };

  // Re-apply filters when filter options change
  useEffect(() => {
    if (results) {
      const filtered = applyClientSideFiltering(results);
      setFilteredResults(filtered);
    }
  }, [results, applyClientSideFiltering]);

  const handleJobSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowJobSuggestions(false);
  };

  const handleLocationSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowLocationSuggestions(false);
  };

  const clearAllFilters = () => {
    setQuery("electrician");
    setLocation("United Kingdom");
    setJobType("all");
    setExperienceLevel("all");
    setSortBy("relevance");
    setLocationRadius("25");
    setResults(null);
    setFilteredResults(null);
    setLocationWarning("");
  };

  const handleApply = (job: JobResult) => {
    window.open(job.external_url, '_blank');
    toast({
      title: "Application Started",
      description: `Opening job listing for ${job.title}`,
    });
  };

  const filteredJobSuggestions = JOB_SEARCH_SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase()) && suggestion !== query
  );

  const locationSuggestions = LocationService.getLocationSuggestions(location);

  const displayResults = filteredResults || results;

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-elec-gray/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            Intelligent Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium">Job Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowJobSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowJobSuggestions(false), 200)}
                  placeholder="e.g. electrician, electrical engineer"
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              {/* Job Search Suggestions */}
              {showJobSuggestions && (filteredJobSuggestions.length > 0 || searchHistory.length > 0) && (
                <div className="absolute top-full left-0 right-0 z-50 bg-elec-gray border border-gray-700 rounded-md shadow-lg mt-1">
                  {searchHistory.length > 0 && (
                    <div className="p-2 border-b border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Recent searches</p>
                      {searchHistory.map((historyItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleJobSuggestionClick(historyItem)}
                          className="block w-full text-left px-2 py-1 text-sm text-white hover:bg-gray-700 rounded"
                        >
                          <Clock className="inline h-3 w-3 mr-2" />
                          {historyItem}
                        </button>
                      ))}
                    </div>
                  )}
                  {filteredJobSuggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleJobSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium flex items-center gap-2">
                Location
                {locationWarning && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  placeholder="e.g. London, Manchester, Cumbria"
                  className={`pl-10 ${locationWarning ? 'border-yellow-500' : ''}`}
                />
              </div>
              
              {locationWarning && (
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {locationWarning}
                </p>
              )}
              
              {/* Location Suggestions */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 bg-elec-gray border border-gray-700 rounded-md shadow-lg mt-1">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <MapPin className="inline h-3 w-3 mr-2" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Combobox
                options={jobTypeOptions}
                value={jobType}
                onValueChange={setJobType}
                placeholder="Select job type..."
                searchPlaceholder="Search job types..."
                emptyMessage="No job types found."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Combobox
                options={experienceLevelOptions}
                value={experienceLevel}
                onValueChange={setExperienceLevel}
                placeholder="Select experience level..."
                searchPlaceholder="Search experience levels..."
                emptyMessage="No experience levels found."
                className="w-full"
              />
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-xs"
            >
              <Filter className="h-3 w-3 mr-1" />
              {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Results</label>
                <Combobox
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={setSortBy}
                  placeholder="Sort by..."
                  searchPlaceholder="Search sort options..."
                  emptyMessage="No sort options found."
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Radius</label>
                <Combobox
                  options={radiusOptions}
                  value={locationRadius}
                  onValueChange={setLocationRadius}
                  placeholder="Select radius..."
                  searchPlaceholder="Search radius..."
                  emptyMessage="No radius options found."
                  className="w-full"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </>
              )}
            </Button>
            
            <Button 
              onClick={clearAllFilters}
              variant="outline"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Summary */}
      {displayResults && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700">
                <Search className="h-4 w-4" />
                <span className="font-medium">
                  Found {displayResults.totalFound} jobs
                  {filteredResults && results && filteredResults.totalFound !== results.totalFound && (
                    <span className="text-sm text-green-600 ml-1">
                      (filtered from {results.totalFound})
                    </span>
                  )}
                </span>
                {displayResults.sources && displayResults.sources.length > 0 && (
                  <span className="text-sm">
                    from {displayResults.sources.join(', ')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Clock className="h-3 w-3" />
                {searchTime}ms
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Results */}
      {displayResults && displayResults.jobs.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {displayResults.jobs.map((job) => (
            <EnhancedJobCard
              key={job.id}
              job={job}
              selectedJob={null}
              handleApply={() => handleApply(job)}
              isAIEnhanced={true}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {displayResults && displayResults.jobs.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-1">
            Try different keywords, broader location, or adjust your filters
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">Try these suggestions:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {JOB_SEARCH_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleJobSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SimpleJobSearch;
