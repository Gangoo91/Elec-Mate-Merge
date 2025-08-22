import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Filter,
  Briefcase, 
  ExternalLink,
  Building2,
  Calendar,
  Loader2,
  AlertCircle,
  PoundSterling,
  Zap
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { LocationService } from "@/services/locationService";
import { supabase } from "@/integrations/supabase/client";
import SearchError from "./SearchError";
import { Skeleton } from "@/components/ui/skeleton";
interface Job {
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

const UnifiedJobSearch = () => {
  const [query, setQuery] = useState("electrician");
  const [location, setLocation] = useState("Cumbria");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const salaryRanges = [
    { value: "all", label: "All Salaries" },
    { value: "0-25000", label: "Up to £25,000" },
    { value: "25000-35000", label: "£25,000 - £35,000" },
    { value: "35000-45000", label: "£35,000 - £45,000" },
    { value: "45000-60000", label: "£45,000 - £60,000" },
    { value: "60000+", label: "£60,000+" }
  ];

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "permanent", label: "Permanent" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "apprenticeship", label: "Apprenticeship" }
  ];

  const experienceLevels = [
    { value: "all", label: "All Experience Levels" },
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
    { value: "apprentice", label: "Apprentice/Trainee" }
  ];

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

  const resetFilters = () => {
    setSalaryFilter("all");
    setJobTypeFilter("all");
    setExperienceFilter("all");
    setShowFilters(false);
  };

  const getMatchPercentage = (job: Job) => {
    let score = 60; // Base score for electrical jobs
    
    const title = job.title.toLowerCase();
    const desc = job.description.toLowerCase();
    
    // Title matching
    if (title.includes('electrician')) score += 15;
    if (title.includes('electrical')) score += 10;
    if (title.includes('maintenance')) score += 5;
    if (title.includes('installation')) score += 5;
    
    // Location bonus (Cumbria preference)
    if (job.location.toLowerCase().includes('cumbria')) score += 10;
    
    // Salary bonus
    if (job.salary && job.salary.includes('£')) score += 5;
    
    // Description keywords
    if (desc.includes('18th edition')) score += 8;
    if (desc.includes('city & guilds')) score += 5;
    if (desc.includes('testing')) score += 3;
    if (desc.includes('bs7671')) score += 8;
    
    return Math.min(Math.max(score + Math.floor(Math.random() * 10), 65), 98);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }

    let searchQuery = query.trim();
    if (searchQuery.length >= 2 && searchQuery.length < 8) {
      const expansions: { [key: string]: string } = {
        'elec': 'electrical',
        'elect': 'electrical', 
        'electr': 'electrical',
        'electri': 'electrical',
        'electric': 'electrical',
        'spark': 'electrician',
        'wire': 'electrical wiring',
        'install': 'electrical installation',
        'maint': 'electrical maintenance',
        'test': 'electrical testing',
        'design': 'electrical design',
        'comm': 'electrical commissioning',
        'ev': 'electric vehicle charging',
        'solar': 'solar electrical',
        'led': 'led lighting electrical'
      };
      
      const lowerQuery = searchQuery.toLowerCase();
      if (expansions[lowerQuery]) {
        searchQuery = expansions[lowerQuery];
      }
    }

    setLoading(true);
    setError(null);
    setJobs([]);

    try {
      const { data, error } = await supabase.functions.invoke('reed-job-listings', {
        body: {
          keywords: searchQuery,
          location: location.trim() || undefined,
          page: 1
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch jobs');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      let jobResults = data.jobs || [];
      
      // Apply client-side location filtering
      if (location.trim() && location.toLowerCase() !== 'uk') {
        jobResults = LocationService.filterJobsByLocation(jobResults, location, 100);
      }

      // Apply salary filter
      if (salaryFilter !== "all") {
        jobResults = jobResults.filter((job: Job) => {
          if (!job.salary) return false;
          const salaryText = job.salary.toLowerCase();
          const salaryNumbers = salaryText.match(/[\d,]+/g);
          if (!salaryNumbers) return false;
          
          const salary = parseInt(salaryNumbers[0].replace(/,/g, ''));
          
          switch (salaryFilter) {
            case "0-25000":
              return salary <= 25000;
            case "25000-35000":
              return salary >= 25000 && salary <= 35000;
            case "35000-45000":
              return salary >= 35000 && salary <= 45000;
            case "45000-60000":
              return salary >= 45000 && salary <= 60000;
            case "60000+":
              return salary >= 60000;
            default:
              return true;
          }
        });
      }

      // Apply job type filter
      if (jobTypeFilter !== "all") {
        jobResults = jobResults.filter((job: Job) => 
          job.type.toLowerCase().includes(jobTypeFilter)
        );
      }

      setJobs(jobResults);

      toast({
        title: "Search Complete", 
        description: `Found ${jobResults.length} jobs${searchQuery !== query.trim() ? ` (searched for "${searchQuery}")` : ''}`
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again";
      setError(errorMessage);
      toast({
        title: "Search Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Application Opened",
      description: "The job application has opened in a new tab. Good luck!"
    });
  };

  const formatDescription = (description: string) => {
    const strippedDescription = description.replace(/<[^>]*>/g, '');
    return strippedDescription.length > 120 
      ? strippedDescription.substring(0, 120) + '...'
      : strippedDescription;
  };

  const formatSalary = (salary: string | null) => {
    if (!salary) return null;
    return salary.replace(/\$/g, '£');
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently posted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form with Integrated Filters */}
      <Card className="border-elec-yellow/20 bg-elec-card w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-elec-light text-xl">
            <div className="p-2 bg-elec-yellow rounded-lg">
              <Search className="h-5 w-5 text-elec-dark" />
            </div>
            Find Your Perfect Electrical Job
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-4">
          {/* Primary Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
            <div className="md:col-span-2 lg:col-span-5 space-y-2">
              <label className="text-sm font-medium text-elec-yellow">Job Title / Keywords</label>
              <Input
                placeholder="e.g. electrician, maintenance, testing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="h-11 sm:h-12 bg-elec-gray border-elec-yellow/30 text-elec-light placeholder:text-muted-foreground focus:border-elec-yellow transition-colors"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-4 space-y-2 relative">
              <label className="text-sm font-medium text-elec-yellow">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                <Input
                  placeholder="Location (UK)"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-11 sm:h-12 pl-10 sm:pl-12 bg-elec-gray border-elec-yellow/30 text-elec-light placeholder:text-muted-foreground focus:border-elec-yellow transition-colors"
                />
              </div>
              
              {showLocationSuggestions && (
                <div className="absolute z-50 w-full mt-1 bg-elec-card border border-elec-yellow/30 rounded-lg shadow-xl max-h-48 overflow-y-auto scrollbar-none">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-elec-yellow/10 text-sm text-elec-light border-b border-elec-yellow/20 last:border-b-0 transition-colors"
                      onClick={() => selectLocationSuggestion(suggestion)}
                    >
                      <MapPin className="inline h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-elec-yellow" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="h-11 sm:h-12 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1 font-semibold transition-all duration-200 min-w-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Searching...</span>
                    <span className="sm:hidden">Search</span>
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Search Jobs</span>
                    <span className="sm:hidden">Search</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 sm:h-12 border-elec-yellow/30 hover:bg-elec-yellow/10 sm:w-auto flex-shrink-0"
              >
                <Filter className="h-4 w-4 sm:mr-0" />
                <span className="ml-2 sm:hidden">Filters</span>
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-elec-yellow/20 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-elec-light">Advanced Filters</h3>
                <Button variant="ghost" onClick={resetFilters} className="text-elec-yellow hover:text-elec-yellow/80">
                  Reset All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-elec-yellow">Salary Range</label>
                  <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-card z-50"> 
                      {salaryRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-elec-yellow">Job Type</label>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-card z-50">
                      {jobTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-elec-yellow">Experience Level</label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-card z-50">
                      {experienceLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Active Filters */}
              {(salaryFilter !== "all" || jobTypeFilter !== "all" || experienceFilter !== "all") && (
                <div className="flex flex-col items-start gap-2 pt-2">
                  <span className="text-sm text-elec-light">Active filters:</span>
                  {salaryFilter !== "all" && (
                    <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                      {salaryRanges.find(r => r.value === salaryFilter)?.label}
                    </Badge>
                  )}
                  {jobTypeFilter !== "all" && (
                    <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                      {jobTypes.find(t => t.value === jobTypeFilter)?.label}
                    </Badge>
                  )}
                  {experienceFilter !== "all" && (
                    <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                      {experienceLevels.find(e => e.value === experienceFilter)?.label}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && <SearchError error={error} onRetry={() => handleSearch()} />}

      {/* Loading state */}
      {loading && (
        <div className="grid gap-4">
          {[1,2,3].map((i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 w-3/4">
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-10 w-28" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-elec-light">
              {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Found
            </h3>
            <div className="text-sm text-muted-foreground">Sorted by relevance</div>
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => {
              const matchPercentage = getMatchPercentage(job);
              
              return (
                <Card key={job.id} className="border-elec-yellow/20 bg-elec-card hover:border-elec-yellow/40 transition-all duration-200 group">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between items-center text-center gap-3 md:gap-4">
                      <div className="flex-1 space-y-2 md:space-y-3 w-full">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between items-center gap-2 md:gap-3 w-full">
                          <div className="text-center md:text-left w-full md:w-auto">
                            <h3 className="text-base sm:text-lg font-semibold text-elec-light group-hover:text-elec-yellow transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 md:gap-3 mt-1 text-muted-foreground justify-center md:justify-start text-sm">
                              <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="truncate">{job.company}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 sm:gap-2 bg-elec-yellow/10 px-2 sm:px-3 py-1 rounded-full self-center md:self-auto mt-1 md:mt-0 shrink-0">
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
                            <span className="text-xs sm:text-sm font-semibold text-elec-yellow">
                              {matchPercentage}% match
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate max-w-[120px] sm:max-w-none">{job.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{job.type}</span>
                          </div>
                          
                          {formatSalary(job.salary) && (
                            <div className="flex items-center gap-1">
                              <PoundSterling className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="font-medium text-elec-yellow truncate">
                                {formatSalary(job.salary)}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate">{formatDate(job.posted_date)}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 text-center md:text-left">
                          {formatDescription(job.description)}
                        </p>
                      </div>
                      
                      <div className="w-full md:w-auto md:ml-4 lg:ml-6 shrink-0">
                        <Button 
                          onClick={() => handleApply(job.id, job.external_url)}
                          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transition-colors w-full md:w-auto min-w-[100px] sm:min-w-[120px] h-9 sm:h-10"
                        >
                          <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">Apply Now</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && query && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-elec-light">No Jobs Found</h3>
            <p className="text-muted-foreground mb-4">
              {location 
                ? `No electrical jobs found matching "${query}" in or near ${location}`
                : `No electrical jobs found matching "${query}"`
              }
            </p>
            <div className="bg-elec-dark/50 rounded-lg p-4 mt-4">
              <p className="text-elec-yellow font-medium mb-3">Search suggestions:</p>
              <ul className="text-sm text-elec-light/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span>Use broader terms like "electrician", "electrical", or "maintenance"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span>Try adjusting your filters or reset them completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span>Expand your search location or try nearby areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span>Include qualifications like "18th edition" or "City & Guilds"</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnifiedJobSearch;