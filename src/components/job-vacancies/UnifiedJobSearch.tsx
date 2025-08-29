import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Loader2, Clock, Building2, MapIcon, List } from "lucide-react";
import { useUnifiedJobSearch, UnifiedJob } from "@/hooks/job-vacancies/useUnifiedJobSearch";
import JobCard from "./JobCard";

const UnifiedJobSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const { jobs, loading, error, searchProgress, searchAllJobs, triggerJobUpdate, currentPage, jobsPerPage, paginate, changeJobsPerPage } = useUnifiedJobSearch();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchAllJobs(keywords, location);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  const getStatusBadge = (source: any) => {
    switch (source.status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'loading':
        return <Badge variant="secondary"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 text-white">Completed ({source.jobCount})</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'timeout':
        return <Badge variant="destructive">Timeout</Badge>;
      default:
        return <Badge>{source.status}</Badge>;
    }
  };

  const getJobsToDisplay = () => {
    if (jobsPerPage === -1) {
      return jobs;
    }
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return jobs.slice(startIndex, endIndex);
  };

  const displayedJobs = getJobsToDisplay();

  return (
    <div className="space-y-4">
      <Card className="bg-elec-card border-elec-yellow/20">
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Keywords (e.g., electrician, engineer)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location (e.g., London, UK)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              Search Jobs
            </Button>
          </form>
        </div>
      </Card>

      {searchProgress.isSearching && (
        <Card className="bg-elec-card border-elec-yellow/20">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Searching Job Sources...</h3>
            <Separator className="my-2 bg-elec-yellow/30" />
            <ul className="space-y-2">
              {searchProgress.sources.map((source) => (
                <li key={source.source} className="flex items-center justify-between">
                  <span>{source.source}</span>
                  {getStatusBadge(source)}
                </li>
              ))}
            </ul>
            <Separator className="my-2 bg-elec-yellow/30" />
            <p>Total Jobs Found: {searchProgress.totalJobsFound}</p>
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {jobs.length} Jobs Found
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => handleViewModeChange("grid")}
          >
            <MapIcon className="mr-2 h-4 w-4" /> Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => handleViewModeChange("list")}
          >
            <List className="mr-2 h-4 w-4" /> List
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={jobsPerPage !== -1 ? currentPage * jobsPerPage >= jobs.length : true}
          variant="outline"
        >
          Next
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <span>Jobs per page:</span>
        <select
          value={jobsPerPage}
          onChange={(e) => changeJobsPerPage(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="-1">All</option>
        </select>
      </div>

      <Button onClick={triggerJobUpdate} variant="secondary">
        Update Job Listings
      </Button>
    </div>
  );
};

export default UnifiedJobSearch;
