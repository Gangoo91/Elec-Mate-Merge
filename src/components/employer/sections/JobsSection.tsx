import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Briefcase, PoundSterling, Users, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobCard, AssignedWorker } from "@/components/employer/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AddJobDialog } from "@/components/employer/dialogs/AddJobDialog";
import { ViewJobSheet } from "@/components/employer/sheets/ViewJobSheet";
import { JobFilterSheet, JobFilters } from "@/components/employer/sheets/JobFilterSheet";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/services/jobService";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function JobsSection() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobSheet, setShowJobSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const { data: jobs = [], isLoading, refetch, isRefetching } = useJobs();

  // Fetch all job assignments with employee details
  const { data: allAssignments = [] } = useQuery({
    queryKey: ['all-job-assignments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_assignments')
        .select(`
          job_id,
          employee:employees(id, name, avatar_initials, photo_url)
        `);
      if (error) throw error;
      return data || [];
    },
  });

  // Group assignments by job_id for quick lookup
  const assignmentsByJob = useMemo(() => {
    const map = new Map<string, AssignedWorker[]>();
    allAssignments.forEach((a: any) => {
      if (a.employee) {
        const jobId = a.job_id;
        if (!map.has(jobId)) map.set(jobId, []);
        map.get(jobId)!.push({
          id: a.employee.id,
          name: a.employee.name,
          avatar_initials: a.employee.avatar_initials,
          photo_url: a.employee.photo_url,
        });
      }
    });
    return map;
  }, [allAssignments]);

  // Subscribe to real-time updates on job_assignments and jobs
  useEffect(() => {
    const channel = supabase
      .channel('jobs-realtime-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'job_assignments'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        queryClient.invalidateQueries({ queryKey: ['all-job-assignments'] });
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs'
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Calculate max job value for filter
  const maxJobValue = useMemo(() => {
    return Math.max(...jobs.map(j => j.value || 0), 500000);
  }, [jobs]);

  const [filters, setFilters] = useState<JobFilters>({
    statuses: [],
    minValue: 0,
    maxValue: maxJobValue,
  });

  // Update max value when jobs load
  useMemo(() => {
    if (filters.maxValue === 500000 && maxJobValue > 500000) {
      setFilters(f => ({ ...f, maxValue: maxJobValue }));
    }
  }, [maxJobValue]);

  const activeFilterCount = 
    filters.statuses.length + 
    (filters.minValue > 0 || filters.maxValue < maxJobValue ? 1 : 0);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        filters.statuses.length === 0 || 
        filters.statuses.includes(job.status);
      
      // Value filter
      const jobValue = job.value || 0;
      const matchesValue = 
        jobValue >= filters.minValue && 
        jobValue <= filters.maxValue;
      
      return matchesSearch && matchesStatus && matchesValue;
    });
  }, [jobs, searchQuery, filters]);

  const activeJobs = filteredJobs.filter(j => j.status === "Active");
  const pendingJobs = filteredJobs.filter(j => j.status === "Pending");
  const completedJobs = filteredJobs.filter(j => j.status === "Completed");

  const totalValue = jobs.reduce((acc, j) => acc + (Number(j.value) || 0), 0);
  const activeValue = activeJobs.reduce((acc, j) => acc + (Number(j.value) || 0), 0);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobSheet(true);
  };

  const renderJobCard = (job: Job) => (
    <JobCard
      key={job.id}
      title={job.title}
      client={job.client}
      location={job.location}
      status={job.status}
      progress={job.progress}
      startDate={formatDate(job.start_date)}
      endDate={formatDate(job.end_date)}
      workersCount={job.workers_count || 0}
      value={job.value}
      description={job.description}
      assignedWorkers={assignmentsByJob.get(job.id) || []}
      onClick={() => handleJobClick(job)}
    />
  );

  const renderJobGrid = (jobList: Job[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobList.map(renderJobCard)}
      {jobList.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No jobs found</p>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        {/* Actions row */}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-12 w-12"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              className="h-12 gap-2 px-4"
              onClick={() => setShowFilterSheet(true)}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <Badge variant="default" className="h-5 w-5 p-0 justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
          
          <AddJobDialog 
            open={showAddDialog} 
            onOpenChange={setShowAddDialog}
          />
        </div>
      </div>

      {/* Stats - Horizontal scrolling on mobile */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
        {/* Total Jobs */}
        <Card className="shrink-0 w-40 md:w-auto card-hover bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border-elec-yellow/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-50" />
          <CardContent className="p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-elec-yellow/15 shadow-inner">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight">{jobs.length}</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">Total Jobs</p>
          </CardContent>
        </Card>

        {/* Active Jobs */}
        <Card className="shrink-0 w-40 md:w-auto card-hover bg-gradient-to-br from-success/15 via-success/5 to-transparent border-success/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-50" />
          <CardContent className="p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-success/15 shadow-inner">
                <Users className="h-5 w-5 text-success" />
              </div>
              <span className="text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">LIVE</span>
            </div>
            <p className="text-3xl font-bold text-success tracking-tight">{activeJobs.length}</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">Active</p>
          </CardContent>
        </Card>

        {/* Active Value - Premium Gold */}
        <Card className="shrink-0 w-40 md:w-auto card-hover bg-gradient-to-br from-gold/20 via-gold/10 to-gold-dark/5 border-gold/40 overflow-hidden relative shadow-lg shadow-gold/10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-dark/10 opacity-60" />
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold/20 rounded-full blur-2xl -translate-y-4 translate-x-4" />
          <CardContent className="p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-gold/20 shadow-inner border border-gold/30">
                <PoundSterling className="h-5 w-5 text-gold-dark" />
              </div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-gold-dark">£</span>
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {activeValue >= 1000 
                  ? ((activeValue / 1000) % 1 === 0 ? (activeValue / 1000) : (activeValue / 1000).toFixed(1)) + 'k'
                  : activeValue}
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-1">Active Value</p>
          </CardContent>
        </Card>

        {/* Total Value - Premium Dark Gold */}
        <Card className="shrink-0 w-40 md:w-auto card-hover bg-gradient-to-br from-surface-elevated via-surface to-gold/5 border-gold/30 overflow-hidden relative shadow-lg shadow-gold/5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10 opacity-40" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gold/15 rounded-full blur-2xl translate-y-6 -translate-x-6" />
          <CardContent className="p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-gold/15 shadow-inner border border-gold/20">
                <PoundSterling className="h-5 w-5 text-gold" />
              </div>
              <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">TOTAL</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-gold">£</span>
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {totalValue >= 1000 
                  ? ((totalValue / 1000) % 1 === 0 ? (totalValue / 1000) : (totalValue / 1000).toFixed(1)) + 'k'
                  : totalValue}
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-1">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex h-12">
          <TabsTrigger value="active" className="text-xs sm:text-sm">
            Active ({activeJobs.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending ({pendingJobs.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs sm:text-sm">
            Done ({completedJobs.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All ({filteredJobs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 pb-24">
          {renderJobGrid(activeJobs)}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 pb-24">
          {renderJobGrid(pendingJobs)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 pb-24">
          {renderJobGrid(completedJobs)}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 pb-24">
          {renderJobGrid(filteredJobs)}
        </TabsContent>
      </Tabs>

      {/* Filter Sheet */}
      <JobFilterSheet
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        filters={filters}
        onFiltersChange={setFilters}
        maxJobValue={maxJobValue}
      />

      {/* View/Edit Job Sheet */}
      <ViewJobSheet
        job={selectedJob}
        open={showJobSheet}
        onOpenChange={setShowJobSheet}
      />
    </div>
  );
}
