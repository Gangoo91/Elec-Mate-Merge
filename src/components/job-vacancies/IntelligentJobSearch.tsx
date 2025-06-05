
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, Brain, Zap, MapPin, Clock, ExternalLink, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IntelligentJobResult {
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
  relevanceScore?: number;
  aiTags?: string[];
  skillsRequired?: string[];
  experienceLevel?: string;
  salaryCompetitiveness?: string;
}

interface SearchResults {
  jobs: IntelligentJobResult[];
  totalFound: number;
  searchQueries: string[];
  sources: string[];
}

const IntelligentJobSearch: React.FC = () => {
  const [query, setQuery] = useState("electrician");
  const [location, setLocation] = useState("United Kingdom");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searchTime, setSearchTime] = useState<number>(0);
  const [hasApiError, setHasApiError] = useState(false);

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
    setHasApiError(false);
    const startTime = Date.now();

    try {
      const { data, error } = await supabase.functions.invoke('intelligent-job-search', {
        body: {
          query: query.trim(),
          location: location.trim() || "United Kingdom",
          filters: {
            jobType,
            experienceLevel,
          }
        },
      });

      if (error) {
        if (error.message.includes('OpenAI API key')) {
          setHasApiError(true);
          toast({
            title: "API Configuration Required",
            description: "OpenAI API key needs to be configured. Please contact your administrator.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      const searchDuration = Date.now() - startTime;
      setSearchTime(searchDuration);
      setResults(data);

      toast({
        title: "Search Complete",
        description: `Found ${data.totalFound} jobs across ${data.sources.length} sources in ${searchDuration}ms`,
      });

    } catch (error) {
      console.error('Intelligent search error:', error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to search jobs",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleApply = (job: IntelligentJobResult) => {
    window.open(job.external_url, '_blank');
    toast({
      title: "Application Started",
      description: `Opening ${job.source} job listing for ${job.title}`,
    });
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getSalaryCompetitivenessColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'average': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-elec-gray/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            AI-Powered Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasApiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">AI features require OpenAI API configuration. Search will work with limited functionality.</p>
              </div>
            </div>
          )}
          
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

            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead/Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {isSearching ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Searching across job sites...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search All UK Job Sites
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
                <Zap className="h-4 w-4" />
                <span className="font-medium">
                  Found {results.totalFound} jobs across {results.sources.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Clock className="h-3 w-3" />
                {searchTime}ms
              </div>
            </div>
            {results.searchQueries.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-green-600 mb-1">AI-generated search queries:</p>
                <div className="flex flex-wrap gap-1">
                  {results.searchQueries.slice(0, 3).map((searchQuery, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                      {searchQuery}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
                  <div className="flex items-center gap-2 ml-4">
                    {job.relevanceScore && (
                      <Badge className={`text-xs ${getRelevanceColor(job.relevanceScore)}`}>
                        {job.relevanceScore}% match
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {job.source}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {job.location}
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <span>{job.salary}</span>
                      {job.salaryCompetitiveness && (
                        <Badge className={`text-xs ${getSalaryCompetitivenessColor(job.salaryCompetitiveness)}`}>
                          {job.salaryCompetitiveness}
                        </Badge>
                      )}
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                  {job.experienceLevel && (
                    <Badge variant="outline" className="text-xs">{job.experienceLevel}</Badge>
                  )}
                </div>

                {job.aiTags && job.aiTags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {job.aiTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow">
                          <Zap className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {job.skillsRequired && job.skillsRequired.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.skillsRequired.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

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
                    Apply on {job.source}
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

export default IntelligentJobSearch;
