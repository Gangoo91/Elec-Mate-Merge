
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Clock, ExternalLink } from "lucide-react";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";

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

const SimpleJobSearch: React.FC = () => {
  const [query, setQuery] = useState("electrician");
  const [location, setLocation] = useState("United Kingdom");
  const [jobType, setJobType] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searchTime, setSearchTime] = useState<number>(0);

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

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a job search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    const startTime = Date.now();

    try {
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
        throw error;
      }

      const searchDuration = Date.now() - startTime;
      setSearchTime(searchDuration);
      setResults(data);

      toast({
        title: "Search Complete",
        description: `Found ${data.totalFound} jobs in ${searchDuration}ms`,
      });

    } catch (error) {
      console.error('Job search error:', error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to search jobs",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleApply = (job: JobResult) => {
    window.open(job.external_url, '_blank');
    toast({
      title: "Application Started",
      description: `Opening job listing for ${job.title}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-elec-gray/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. electrician, electrical engineer"
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. London, Manchester, UK"
                  className="pl-10"
                />
              </div>
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

          <Button 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isSearching ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Search Results Summary */}
      {results && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700">
                <Search className="h-4 w-4" />
                <span className="font-medium">
                  Found {results.totalFound} jobs
                </span>
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
      {results && results.jobs.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {results.jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold line-clamp-2">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs ml-4">
                    {job.source}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {job.location}
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Posted {new Date(job.posted_date).toLocaleDateString()}
                  </div>
                  <Button 
                    onClick={() => handleApply(job)}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    Apply
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {results && results.jobs.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-1">
            Try different keywords or broaden your search criteria
          </p>
        </Card>
      )}
    </div>
  );
};

export default SimpleJobSearch;
