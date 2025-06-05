
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  Building2,
  Calendar,
  Banknote
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
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

interface JobSearchFilters {
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  postedWithin: string;
}

interface SearchStatus {
  searching: boolean;
  sources: {
    reed: 'idle' | 'searching' | 'success' | 'error';
    adzuna: 'idle' | 'searching' | 'success' | 'error';
  };
  totalFound: number;
  searchTime?: number;
}

const SimpleJobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobResult[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    searching: false,
    sources: { reed: 'idle', adzuna: 'idle' },
    totalFound: 0
  });
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filters, setFilters] = useState<JobSearchFilters>({
    jobType: "all",
    salaryMin: "",
    salaryMax: "",
    postedWithin: "30"
  });

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value.length >= 2) {
      const suggestions = LocationService.getLocationSuggestions(value);
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(suggestions.length > 0);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocationSuggestion = (suggestion: string) => {
    setLocation(suggestion);
    setShowLocationSuggestions(false);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a job title or keyword to search for.",
        variant: "destructive"
      });
      return;
    }

    // Validate location if provided
    if (location && !LocationService.isValidUKLocation(location)) {
      toast({
        title: "Invalid Location",
        description: `"${location}" doesn't appear to be a valid UK location. Try: London, Manchester, Birmingham, etc.`,
        variant: "destructive"
      });
      return;
    }

    console.log('🔍 Starting job search:', { query, location, filters });
    
    setSearchStatus({
      searching: true,
      sources: { reed: 'searching', adzuna: 'searching' },
      totalFound: 0
    });
    setJobs([]);
    setFilteredJobs([]);

    try {
      const startTime = Date.now();
      const response = await fetch('/api/supabase/functions/v1/intelligent-job-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          location: location.trim() || 'United Kingdom',
          filters
        }),
      });

      const endTime = Date.now();
      const searchTime = endTime - startTime;

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Search results received:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      const jobResults = data.jobs || [];
      setJobs(jobResults);

      // Apply location filtering if location is specified
      let locationFilteredJobs = jobResults;
      if (location.trim()) {
        console.log('📍 Applying location filtering for:', location);
        locationFilteredJobs = LocationService.filterJobsByLocation(jobResults, location, 50);
        console.log(`Applied location filtering: ${locationFilteredJobs.length} jobs within 50 miles of ${location}`);
      }

      setFilteredJobs(locationFilteredJobs);

      // Update search status
      setSearchStatus({
        searching: false,
        sources: { 
          reed: data.sources?.includes('Reed') ? 'success' : 'idle',
          adzuna: data.sources?.includes('Adzuna') ? 'success' : 'idle'
        },
        totalFound: locationFilteredJobs.length,
        searchTime
      });

      // Show success message
      const sourceCount = data.sources?.length || 0;
      const sourceText = sourceCount > 0 ? ` from ${sourceCount} source${sourceCount !== 1 ? 's' : ''}` : '';
      
      toast({
        title: "Search Complete",
        description: `Found ${locationFilteredJobs.length} job${locationFilteredJobs.length !== 1 ? 's' : ''}${sourceText} in ${(searchTime / 1000).toFixed(1)}s`,
        variant: "success"
      });

      if (locationFilteredJobs.length === 0) {
        toast({
          title: "No Jobs Found",
          description: location 
            ? `Try expanding your search area or checking nearby locations to ${location}`
            : "Try different keywords or remove some filters",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('❌ Search error:', error);
      setSearchStatus({
        searching: false,
        sources: { reed: 'error', adzuna: 'error' },
        totalFound: 0
      });

      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Unable to search for jobs. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleApply = (jobId: string, url: string) => {
    setSelectedJob(jobId);
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Application Opened",
      description: "The job application has opened in a new tab. Good luck!"
    });
  };

  const getStatusIcon = (status: 'idle' | 'searching' | 'success' | 'error') => {
    switch (status) {
      case 'searching': return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'error': return <XCircle className="h-3 w-3 text-red-500" />;
      default: return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStatusText = (status: 'idle' | 'searching' | 'success' | 'error') => {
    switch (status) {
      case 'searching': return 'Searching...';
      case 'success': return 'Complete';
      case 'error': return 'Failed';
      default: return 'Ready';
    }
  };

  // Apply additional filters
  useEffect(() => {
    let filtered = [...jobs];

    // Apply location filtering
    if (location.trim()) {
      filtered = LocationService.filterJobsByLocation(filtered, location, 50);
    }

    // Apply job type filter
    if (filters.jobType !== "all") {
      filtered = filtered.filter(job => 
        job.type.toLowerCase().includes(filters.jobType.toLowerCase()) ||
        (filters.jobType === "permanent" && job.type.toLowerCase().includes("full"))
      );
    }

    // Apply salary filter
    if (filters.salaryMin) {
      const minSalary = parseInt(filters.salaryMin);
      filtered = filtered.filter(job => {
        if (!job.salary) return false;
        const salaryNumbers = job.salary.match(/[\d,]+/g);
        if (salaryNumbers && salaryNumbers.length > 0) {
          const salary = parseInt(salaryNumbers[0].replace(/,/g, ''));
          return salary >= minSalary;
        }
        return false;
      });
    }

    // Apply posted date filter
    if (filters.postedWithin !== "all") {
      const daysAgo = parseInt(filters.postedWithin);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      
      filtered = filtered.filter(job => {
        try {
          const postedDate = new Date(job.posted_date);
          return postedDate >= cutoffDate;
        } catch {
          return true; // Include jobs with invalid dates
        }
      });
    }

    setFilteredJobs(filtered);
    setSearchStatus(prev => ({ ...prev, totalFound: filtered.length }));
  }, [jobs, filters, location]);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Input
                placeholder="Job title, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            
            <div className="md:col-span-1 relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location (UK)"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              {/* Location Suggestions */}
              {showLocationSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-elec-dark border border-elec-yellow/20 rounded-md shadow-lg">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-elec-yellow/10 text-sm"
                      onClick={() => selectLocationSuggestion(suggestion)}
                    >
                      <MapPin className="inline h-3 w-3 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={searchStatus.searching}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1"
              >
                {searchStatus.searching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-elec-yellow/20"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Status */}
          {(searchStatus.searching || searchStatus.totalFound > 0) && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(searchStatus.sources.reed)}
                  <span>Reed: {getStatusText(searchStatus.sources.reed)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(searchStatus.sources.adzuna)}
                  <span>Adzuna: {getStatusText(searchStatus.sources.adzuna)}</span>
                </div>
              </div>
              
              <div className="text-elec-yellow">
                {searchStatus.totalFound} jobs found
                {searchStatus.searchTime && ` in ${(searchStatus.searchTime / 1000).toFixed(1)}s`}
              </div>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Job Type</label>
                  <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Min Salary (£)</label>
                  <Input
                    type="number"
                    placeholder="25000"
                    value={filters.salaryMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMin: e.target.value }))}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Max Salary (£)</label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={filters.salaryMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMax: e.target.value }))}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Posted Within</label>
                  <Select value={filters.postedWithin} onValueChange={(value) => setFilters(prev => ({ ...prev, postedWithin: value }))}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Last 24 hours</SelectItem>
                      <SelectItem value="3">Last 3 days</SelectItem>
                      <SelectItem value="7">Last week</SelectItem>
                      <SelectItem value="14">Last 2 weeks</SelectItem>
                      <SelectItem value="30">Last month</SelectItem>
                      <SelectItem value="all">Any time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {filteredJobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
            </h3>
          </div>

          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <EnhancedJobCard
                key={job.id}
                job={job}
                selectedJob={selectedJob}
                handleApply={handleApply}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!searchStatus.searching && filteredJobs.length === 0 && query && (
        <Card className="border-elec-yellow/20">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground mb-4">
              {location 
                ? `No electrical jobs found matching "${query}" in ${location}`
                : `No electrical jobs found matching "${query}"`
              }
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Try:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Different keywords or job titles</li>
                <li>Expanding your search location</li>
                <li>Removing some filters</li>
                <li>Using broader terms like "electrician" or "electrical"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleJobSearch;
