/**
 * PremiumJobsHub - Main container for premium job vacancies
 * Tab navigation, pull-to-refresh, integrated state management
 * Now with unified employer + external job feed
 */

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Bookmark,
  BarChart3,
  Search,
  RefreshCw,
  Loader2,
  Shield,
  Building2,
} from "lucide-react";

// Premium components
import JobsHeroCard from "./JobsHeroCard";
import UnifiedJobCard from "./UnifiedJobCard";
import JobFilterPills, { type JobFilters } from "./JobFilterPills";
import JobDetailSheet from "./JobDetailSheet";
import EmployerJobDetailSheet from "./EmployerJobDetailSheet";
import JobSearchSheet from "./JobSearchSheet";
import SavedJobsTab from "./SavedJobsTab";
import JobCardSkeleton from "./JobCardSkeleton";

// Hooks
import { useSavedJobs } from "./hooks/useSavedJobs";
import { useUnifiedJobFeed } from "@/hooks/job-vacancies/useUnifiedJobFeed";
import { pageVariants, listContainerVariants, listItemVariants } from "./animations/variants";
import type { UnifiedJobListing } from "@/types/unified-jobs";

// Apply dialog for employer jobs
import { ApplyToVacancyDialog } from "@/components/electrician/vacancies/ApplyToVacancyDialog";
import type { InternalVacancy } from "@/components/electrician/vacancies/InternalVacancyCard";

type TabId = "explore" | "saved" | "insights";

interface Tab {
  id: TabId;
  label: string;
  icon: typeof Briefcase;
}

const TABS: Tab[] = [
  { id: "explore", label: "Explore", icon: Briefcase },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "insights", label: "Insights", icon: BarChart3 },
];

// Default filters
const DEFAULT_FILTERS: JobFilters = {
  jobTypes: [],
  salaryRanges: [],
  experience: [],
  sources: [],
};

// Parse salary from string to number for filtering
const parseSalary = (salary: string | null): number => {
  if (!salary) return 0;
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Check if salary matches range
const salaryMatchesRange = (salary: string | null, range: string): boolean => {
  const value = parseSalary(salary);
  switch (range) {
    case "20-30":
      return value >= 20000 && value < 30000;
    case "30-40":
      return value >= 30000 && value < 40000;
    case "40-50":
      return value >= 40000 && value < 50000;
    case "50+":
      return value >= 50000;
    default:
      return true;
  }
};

// Convert UnifiedJobListing to InternalVacancy for ApplyDialog
const toInternalVacancy = (job: UnifiedJobListing): InternalVacancy => ({
  id: job.id,
  title: job.title,
  location: job.location,
  type: job.type,
  status: 'open',
  salary_min: job.salary_min || null,
  salary_max: job.salary_max || null,
  salary_period: job.salary_period || 'annual',
  description: job.description,
  requirements: job.requirements || [],
  benefits: job.benefits || [],
  closing_date: job.closing_date || null,
  views: job.views || 0,
  created_at: job.posted_date,
  employer: job.employer_id ? {
    id: job.employer_id,
    company_name: job.company,
    logo_url: job.employer_logo || null,
  } : undefined,
  has_applied: job.has_applied,
});

const PremiumJobsHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("explore");
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState<UnifiedJobListing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEmployerDetailOpen, setIsEmployerDetailOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState<InternalVacancy | null>(null);

  // Unified job feed hook (employer + external jobs)
  const {
    jobs,
    employerJobs,
    externalJobs,
    employerJobCount,
    externalJobCount,
    isLoading,
    isLoadingEmployer,
    isLoadingExternal,
    employerError,
    externalError,
    searchExternalJobs,
    refetchEmployerJobs,
  } = useUnifiedJobFeed({
    searchQuery: searchQuery || undefined,
    location: searchLocation || undefined,
  });

  // Track if we've done an external search
  const [hasSearched, setHasSearched] = useState(false);

  // Track refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Saved jobs hook
  const {
    savedJobs,
    savedCount,
    isSaved,
    toggleSave,
    removeJob,
    clearAll: clearSavedJobs,
  } = useSavedJobs();

  // Calculate stats
  const stats = useMemo(() => {
    const allJobs = [...employerJobs, ...externalJobs];
    const totalJobs = allJobs.length;
    const newToday = allJobs.filter((job) => {
      const posted = new Date(job.posted_date);
      const today = new Date();
      return posted.toDateString() === today.toDateString();
    }).length;

    // Calculate average salary
    const salaries = allJobs
      .map((job) => parseSalary(job.salary))
      .filter((s) => s > 0);
    const avgSalary = salaries.length > 0
      ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
      : 35000;

    return {
      totalJobs,
      newToday,
      employerJobCount,
      externalJobCount,
      avgSalary: `£${avgSalary.toLocaleString()}`,
      matchPercentage: 85,
    };
  }, [employerJobs, externalJobs, employerJobCount, externalJobCount]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Job type filter
      if (filters.jobTypes.length > 0) {
        const jobType = job.type.toLowerCase();
        if (!filters.jobTypes.some((t) => jobType.includes(t.toLowerCase()))) {
          return false;
        }
      }

      // Salary range filter
      if (filters.salaryRanges.length > 0) {
        if (!filters.salaryRanges.some((range) => salaryMatchesRange(job.salary, range))) {
          return false;
        }
      }

      // Source filter
      if (filters.sources.length > 0) {
        if (!filters.sources.includes(job.source || "")) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  // Handlers
  const handleBack = () => navigate(-1);

  const handleJobSelect = (job: UnifiedJobListing) => {
    setSelectedJob(job);
    if (job.is_internal) {
      // Employer job - use employer detail sheet
      setIsEmployerDetailOpen(true);
    } else {
      // External job - use standard detail sheet
      setIsDetailOpen(true);
    }
  };

  const handleSaveJob = (jobId: string) => {
    const allJobs = [...employerJobs, ...externalJobs];
    const job = allJobs.find((j) => j.id === jobId);
    if (job) {
      // Convert to UnifiedJob format for saved jobs
      toggleSave({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        description: job.description,
        external_url: job.url || '',
        posted_date: job.posted_date,
        source: job.source,
      });
    }
  };

  const handleApplyJob = (job: UnifiedJobListing) => {
    if (job.is_internal) {
      // Employer job - open apply dialog with Elec-ID
      setJobToApply(toInternalVacancy(job));
      setIsApplyDialogOpen(true);
    } else if (job.url) {
      // External job - open URL
      window.open(job.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleSearch = useCallback(async (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    setHasSearched(true);
    // Search external jobs
    await searchExternalJobs(query, location);
  }, [searchExternalJobs]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchEmployerJobs();
      if (hasSearched && searchQuery) {
        await searchExternalJobs(searchQuery, searchLocation);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSmartSearch = () => {
    setIsSearchOpen(true);
  };

  const handleUploadCV = () => {
    navigate("/electrician/cv-builder");
  };

  const handleApplyDialogClose = () => {
    setIsApplyDialogOpen(false);
    setJobToApply(null);
    // Refresh employer jobs to update applied status
    refetchEmployerJobs();
  };

  // Get unique sources from jobs
  const availableSources = useMemo(() => {
    const allJobs = [...employerJobs, ...externalJobs];
    const sources = new Set(allJobs.map((j) => j.source).filter(Boolean) as string[]);
    return Array.from(sources);
  }, [employerJobs, externalJobs]);

  // Filter employer and external jobs separately
  const filteredEmployerJobs = useMemo(() => {
    return employerJobs.filter((job) => {
      if (filters.jobTypes.length > 0) {
        const jobType = job.type.toLowerCase();
        if (!filters.jobTypes.some((t) => jobType.includes(t.toLowerCase()))) {
          return false;
        }
      }
      if (filters.salaryRanges.length > 0) {
        if (!filters.salaryRanges.some((range) => salaryMatchesRange(job.salary, range))) {
          return false;
        }
      }
      return true;
    });
  }, [employerJobs, filters]);

  const filteredExternalJobs = useMemo(() => {
    return externalJobs.filter((job) => {
      if (filters.jobTypes.length > 0) {
        const jobType = job.type.toLowerCase();
        if (!filters.jobTypes.some((t) => jobType.includes(t.toLowerCase()))) {
          return false;
        }
      }
      if (filters.salaryRanges.length > 0) {
        if (!filters.salaryRanges.some((range) => salaryMatchesRange(job.salary, range))) {
          return false;
        }
      }
      if (filters.sources.length > 0) {
        if (!filters.sources.includes(job.source || "")) {
          return false;
        }
      }
      return true;
    });
  }, [externalJobs, filters]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-10 w-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">Job Vacancies</h1>
              <p className="text-xs text-white/50">Find your next role</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-10 w-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-10 w-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
            >
              {isRefreshing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tab.id === "saved" ? savedCount : undefined;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {count !== undefined && count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500/30 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === "explore" && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-4"
            >
              {/* Hero Card */}
              <JobsHeroCard
                totalJobs={stats.totalJobs}
                newJobsToday={stats.newToday}
                avgSalary={stats.avgSalary}
                matchPercentage={stats.matchPercentage}
                isSearching={isLoading}
                lastUpdated={isLoading ? undefined : "Just now"}
                onSmartSearch={handleSmartSearch}
                onUploadCV={handleUploadCV}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />

              {/* Filters */}
              <JobFilterPills
                filters={filters}
                onFiltersChange={setFilters}
                availableSources={availableSources}
              />

              {/* Search Status */}
              {searchQuery && (
                <div className="flex items-center justify-between px-1">
                  <div className="text-sm text-white/60">
                    Results for <span className="text-blue-400 font-medium">"{searchQuery}"</span>
                    {searchLocation && (
                      <>
                        {" "}in <span className="text-blue-400 font-medium">{searchLocation}</span>
                      </>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchLocation("");
                      setHasSearched(false);
                    }}
                    className="h-7 px-2 text-xs text-white/60 hover:text-white"
                  >
                    Clear
                  </Button>
                </div>
              )}

              {/* Employer Jobs Section - Always at top */}
              {filteredEmployerJobs.length > 0 && (
                <div className="space-y-3">
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Direct from Employers</h3>
                        <p className="text-xs text-white/50">Apply with your Elec-ID</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300 text-xs">
                      {filteredEmployerJobs.length} {filteredEmployerJobs.length === 1 ? 'job' : 'jobs'}
                    </Badge>
                  </div>

                  {/* Employer Job Cards */}
                  {isLoadingEmployer ? (
                    <JobCardSkeleton count={2} />
                  ) : (
                    <motion.div
                      variants={listContainerVariants}
                      initial="initial"
                      animate="animate"
                      className="space-y-3"
                    >
                      {filteredEmployerJobs.map((job) => (
                        <motion.div key={job.id} variants={listItemVariants}>
                          <UnifiedJobCard
                            job={job}
                            onSelect={handleJobSelect}
                            onSave={handleSaveJob}
                            onApply={handleApplyJob}
                            isSaved={isSaved(job.id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* External Jobs Section */}
              <div className="space-y-3">
                {/* Section Header - only show if there are employer jobs above */}
                {filteredEmployerJobs.length > 0 && (filteredExternalJobs.length > 0 || !hasSearched) && (
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">From Job Boards</h3>
                        <p className="text-xs text-white/50">Reed, Indeed, TotalJobs & more</p>
                      </div>
                    </div>
                    {filteredExternalJobs.length > 0 && (
                      <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300 text-xs">
                        {filteredExternalJobs.length} {filteredExternalJobs.length === 1 ? 'job' : 'jobs'}
                      </Badge>
                    )}
                  </div>
                )}

                {/* External Job Cards */}
                {isLoadingExternal ? (
                  <JobCardSkeleton count={5} />
                ) : !hasSearched && filteredExternalJobs.length === 0 ? (
                  <div className="text-center py-8 bg-white/[0.02] rounded-2xl border border-white/5">
                    <Search className="h-10 w-10 mx-auto text-white/20 mb-3" />
                    <p className="text-white/60 mb-2">Search for jobs from job boards</p>
                    <p className="text-xs text-white/40 mb-4">Use Smart Search to find jobs from Reed, Indeed, and more</p>
                    <Button
                      onClick={handleSmartSearch}
                      className="bg-blue-500 hover:bg-blue-400 text-white"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Smart Search
                    </Button>
                  </div>
                ) : filteredExternalJobs.length === 0 && hasSearched ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-10 w-10 mx-auto text-white/20 mb-3" />
                    <p className="text-white/60 mb-2">No external jobs found</p>
                    <p className="text-xs text-white/40">Try different search terms or filters</p>
                  </div>
                ) : (
                  <motion.div
                    variants={listContainerVariants}
                    initial="initial"
                    animate="animate"
                    className="space-y-3"
                  >
                    {filteredExternalJobs.map((job) => (
                      <motion.div key={job.id} variants={listItemVariants}>
                        <UnifiedJobCard
                          job={job}
                          onSelect={handleJobSelect}
                          onSave={handleSaveJob}
                          onApply={handleApplyJob}
                          isSaved={isSaved(job.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Results count */}
              {!isLoading && (filteredEmployerJobs.length > 0 || filteredExternalJobs.length > 0) && (
                <p className="text-center text-xs text-white/40 py-4">
                  Showing {filteredEmployerJobs.length + filteredExternalJobs.length} jobs
                  ({filteredEmployerJobs.length} employer, {filteredExternalJobs.length} external)
                </p>
              )}
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4"
            >
              <SavedJobsTab
                savedJobs={savedJobs}
                onRemove={removeJob}
                onSelect={handleJobSelect}
                onClearAll={clearSavedJobs}
                onBrowseJobs={() => setActiveTab("explore")}
              />
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4"
            >
              <div className="text-center py-16">
                <BarChart3 className="h-12 w-12 mx-auto text-white/20 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Market Insights</h3>
                <p className="text-sm text-white/60 max-w-xs mx-auto">
                  Salary trends, demand hotspots, and career analytics coming soon
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* External Job Detail Sheet */}
      <JobDetailSheet
        job={selectedJob && !selectedJob.is_internal ? {
          id: selectedJob.id,
          title: selectedJob.title,
          company: selectedJob.company,
          location: selectedJob.location,
          salary: selectedJob.salary,
          type: selectedJob.type,
          description: selectedJob.description,
          external_url: selectedJob.url || '',
          posted_date: selectedJob.posted_date,
          source: selectedJob.source,
          image_url: selectedJob.image_url,
        } : null}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApply={(job) => {
          if (job.external_url) {
            window.open(job.external_url, "_blank", "noopener,noreferrer");
          }
        }}
        onSave={handleSaveJob}
        isSaved={selectedJob ? isSaved(selectedJob.id) : false}
      />

      {/* Employer Job Detail Sheet */}
      <EmployerJobDetailSheet
        job={selectedJob?.is_internal ? selectedJob : null}
        isOpen={isEmployerDetailOpen}
        onClose={() => setIsEmployerDetailOpen(false)}
        onApply={handleApplyJob}
        onSave={handleSaveJob}
        isSaved={selectedJob ? isSaved(selectedJob.id) : false}
      />

      {/* Search Sheet */}
      <JobSearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        initialQuery={searchQuery}
        initialLocation={searchLocation}
      />

      {/* Apply Dialog for Employer Jobs */}
      <ApplyToVacancyDialog
        vacancy={jobToApply}
        open={isApplyDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleApplyDialogClose();
        }}
        onSuccess={handleApplyDialogClose}
      />
    </motion.div>
  );
};

export default PremiumJobsHub;
