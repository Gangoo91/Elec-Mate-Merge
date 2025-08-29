
import { useState } from "react";
import { Search, MapPin, Briefcase, Calendar, Building2, Users, Clock, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUnifiedJobSearch } from "@/hooks/job-vacancies/useUnifiedJobSearch";
import { Progress } from "@/components/ui/progress";
import JobGrid from "./JobGrid";
import JobPagination from "./JobPagination";
import { toast } from "@/hooks/use-toast";

const UnifiedJobSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  
  const {
    jobs,
    loading,
    error,
    searchProgress,
    searchAllJobs,
    currentPage,
    jobsPerPage,
    paginate,
    changeJobsPerPage
  } = useUnifiedJobSearch();

  const handleSearch = async () => {
    if (!keywords.trim() && !location.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter keywords or location to search for jobs",
        variant: "destructive"
      });
      return;
    }

    setHasSearched(true);
    await searchAllJobs(keywords, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const popularKeywords = [
    "Electrician", "Electrical Engineer", "Maintenance", "Installation", 
    "Testing", "Commercial", "Domestic", "Industrial", "Apprentice"
  ];

  const quickFilters = [
    { label: "Apprenticeships", icon: Users, active: false },
    { label: "Remote", icon: Building2, active: false },
    { label: "Full Time", icon: Clock, active: true },
    { label: "Contract", icon: Briefcase, active: false },
    { label: "Entry Level", icon: Sparkles, active: false }
  ];

  const totalJobs = jobs.length;
  const startIndex = jobsPerPage === -1 ? 0 : (currentPage - 1) * jobsPerPage;
  const endIndex = jobsPerPage === -1 ? totalJobs : Math.min(startIndex + jobsPerPage, totalJobs);
  const currentJobs = jobsPerPage === -1 ? jobs : jobs.slice(startIndex, endIndex);
  const totalPages = jobsPerPage === -1 ? 1 : Math.ceil(totalJobs / jobsPerPage);

  return (
    <div className="space-y-6">
      <Card className="bg-elec-card border-elec-yellow/20 max-w-4xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Search UK Electrician Jobs</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {/* Search Form */}
          <div className="w-full">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords, or company..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-11 sm:h-12 bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow text-white placeholder-muted-foreground"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location (e.g., London, Manchester, UK)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-11 sm:h-12 bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow text-white placeholder-muted-foreground"
                />
              </div>
              
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="h-11 sm:h-12 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 w-full font-semibold transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-elec-dark mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Jobs
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Popular Keywords */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Popular searches:</p>
            <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
              {popularKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => setKeywords(keyword)}
                  className="text-xs px-3 py-1 bg-elec-gray hover:bg-elec-yellow/10 border border-elec-yellow/20 rounded-full text-muted-foreground hover:text-elec-yellow transition-colors flex-shrink-0 max-w-[120px] truncate"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Quick filters:</p>
            <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
              {quickFilters.map((filter, index) => {
                const IconComponent = filter.icon;
                return (
                  <Badge 
                    key={index}
                    variant={filter.active ? "default" : "outline"}
                    className={`cursor-pointer transition-all gap-1 flex-shrink-0 max-w-[140px] ${
                      filter.active 
                        ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                        : "border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 hover:text-elec-yellow"
                    }`}
                  >
                    <IconComponent className="h-3 w-3" />
                    <span className="truncate">{filter.label}</span>
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Progress */}
      {loading && searchProgress.isSearching && (
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-elec-light">
                  Searching job sites... ({searchProgress.completedSources}/{searchProgress.totalSources})
                </h3>
                <span className="text-sm text-elec-yellow font-medium">
                  {searchProgress.totalJobsFound} jobs found
                </span>
              </div>
              
              <Progress 
                value={(searchProgress.completedSources / searchProgress.totalSources) * 100} 
                className="h-2"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-full overflow-hidden">
                {searchProgress.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs min-w-0 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      source.status === 'completed' ? 'bg-green-400' :
                      source.status === 'loading' ? 'bg-elec-yellow animate-pulse' :
                      source.status === 'failed' || source.status === 'timeout' ? 'bg-red-400' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-muted-foreground truncate">
                      {source.source} ({source.jobCount})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {hasSearched && !loading && (
        <div className="space-y-4">
          {error ? (
            <Card className="bg-elec-card border-red-500/20">
              <CardContent className="p-6 text-center">
                <p className="text-red-400">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <JobGrid
                jobs={currentJobs}
                selectedJob={null}
                handleApply={(jobId: string, url: string) => {
                  window.open(url, '_blank');
                }}
                resetFilters={() => {
                  setKeywords("");
                  setLocation("");
                  setHasSearched(false);
                }}
                isLoading={loading}
              />
              
              {totalPages > 1 && (
                <JobPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UnifiedJobSearch;
