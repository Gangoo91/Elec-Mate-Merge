
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

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }

    console.log('🔍 Starting basic job search:', { query, location });
    setLoading(true);
    setJobs([]);

    try {
      const response = await fetch('https://jtwygbeceundfgnkirof.supabase.co/functions/v1/basic-job-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8`
        },
        body: JSON.stringify({
          query: query.trim(),
          location: location.trim() || 'UK'
        }),
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Search results:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      const jobResults = data.jobs || [];
      setJobs(jobResults);

      toast({
        title: "Search Complete",
        description: `Found ${jobResults.length} jobs`
      });

    } catch (error) {
      console.error('❌ Search error:', error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDescription = (description: string) => {
    const clean = description.replace(/<[^>]*>/g, '');
    return clean.length > 150 ? clean.substring(0, 150) + "..." : clean;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Recently posted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            Job Search
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            
            <div className="md:col-span-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location (UK)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
              >
                {loading ? (
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
          </h3>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-gray-200 hover:border-l-elec-yellow/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                        {job.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-gray-50">
                          {job.type}
                        </Badge>
                        
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {job.source}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">
                        {formatDescription(job.description)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {job.salary && (
                        <div className="px-3 py-1 rounded-md border bg-gray-50 text-gray-700 border-gray-200 text-sm font-medium">
                          {job.salary}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(job.posted_date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => window.open(job.external_url, '_blank')}
                      className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && query && (
        <Card className="border-elec-yellow/20">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground">
              Try different keywords or check back later for new opportunities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BasicJobSearch;
