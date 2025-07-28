
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ExternalLink,
  Building2,
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { LocationService } from "@/services/locationService";
import EnhancedJobCard from "./EnhancedJobCard";
import { supabase } from "@/integrations/supabase/client";
import SearchError from "./SearchError";

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

const BasicJobSearch = () => {
  const [query, setQuery] = useState("electrician");
  const [location, setLocation] = useState("Cumbria");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

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
        title: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }

    // Auto-expand common partial terms for better results
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
        console.log(`🔍 Auto-expanded "${query}" to "${searchQuery}"`);
      }
    }

    console.log('🔍 Starting basic job search:', { query, location });
    setLoading(true);
    setError(null);
    setJobs([]);

    try {
      const { data, error } = await supabase.functions.invoke('basic-job-search', {
        body: {
          query: searchQuery,
          location: location.trim() || 'UK'
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch jobs');
      }

      console.log('📊 Search results:', data);

      if (data?.error) {
        throw new Error(data.error);
      }

      let jobResults = data.jobs || [];
      
      // Apply client-side location filtering if specific location is provided
      if (location.trim() && location.toLowerCase() !== 'uk' && location.toLowerCase() !== 'united kingdom') {
        console.log('📍 Applying client-side location filtering for:', location);
        jobResults = LocationService.filterJobsByLocation(jobResults, location, 100);
        console.log(`Applied location filtering: ${jobResults.length} jobs within 100 miles of ${location}`);
      }

      setJobs(jobResults);

      if (jobResults.length === 0 && searchQuery !== query.trim()) {
        toast({
          title: "Search Auto-Expanded",
          description: `Searched for "${searchQuery}" instead of "${query.trim()}" but no results found. Try different terms.`
        });
      } else {
        toast({
          title: "Search Complete", 
          description: `Found ${jobResults.length} jobs${searchQuery !== query.trim() ? ` (searched for "${searchQuery}")` : ''}`
        });
      }

    } catch (error) {
      console.error('❌ Search error:', error);
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

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border-2 border-yellow-400/30 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <div className="p-2 bg-yellow-400 rounded-lg">
              <Search className="h-5 w-5 text-black" />
            </div>
            Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-yellow-400">Job Title / Keywords</label>
              <Input
                placeholder="e.g. electrician, maintenance, testing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 bg-gray-800 border-2 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400 transition-colors rounded-lg"
              />
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-yellow-400">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-400" />
                <Input
                  placeholder="Location (UK)"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-12 pl-12 bg-gray-800 border-2 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400 transition-colors rounded-lg"
                />
              </div>
              
              {/* Location Suggestions */}
              {showLocationSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 border-2 border-yellow-400/30 rounded-lg shadow-xl">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-3 hover:bg-yellow-400/10 text-sm text-white border-b border-gray-700 last:border-b-0 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      onClick={() => selectLocationSuggestion(suggestion)}
                    >
                      <MapPin className="inline h-4 w-4 mr-3 text-yellow-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="h-12 bg-yellow-400 text-black hover:bg-yellow-500 w-full font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-3 h-5 w-5" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && <SearchError error={error} onRetry={() => handleSearch()} />}

      {/* Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
          </h3>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <EnhancedJobCard
                key={job.id}
                job={job}
                selectedJob={null}
                handleApply={handleApply}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && query && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">No Jobs Found</h3>
            <p className="text-gray-400 mb-4">
              {location 
                ? `No electrical jobs found matching "${query}" in or near ${location}`
                : `No electrical jobs found matching "${query}"`
              }
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">Try:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Using broader terms like "electrician", "electrical", or "maintenance"</li>
                <li>Expanding your search location or trying nearby areas</li>
                <li>Checking spelling and trying alternative keywords</li>
                <li>Using job-specific terms like "testing", "installation", or "commissioning"</li>
                <li>Including qualifications like "18th edition" or "City & Guilds"</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Popular searches: "electrician", "electrical engineer", "maintenance electrician", "electrical testing"
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BasicJobSearch;
