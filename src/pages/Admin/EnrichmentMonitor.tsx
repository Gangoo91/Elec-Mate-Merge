import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Play, TestTube2, AlertTriangle, Trash2, SkipForward, Pause, Clock, Activity, Zap, Filter, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';
import { useKeepalive } from '@/hooks/useKeepalive';
import { useQueryClient } from '@tanstack/react-query';

// Task filter mapping
const TASK_FILTERS = {
  all: { label: 'All Tasks', jobTypes: null as string[] | null },
  bs7671: { label: 'BS 7671 Regulations', jobTypes: ['enrich_bs7671_embeddings'] },
  health_safety: { label: 'Health & Safety Knowledge', jobTypes: ['enrich_health_safety_knowledge'] },
  design: { label: 'Design Knowledge', jobTypes: ['enrich_design_knowledge'] },
  installation: { label: 'Installation Procedures', jobTypes: ['enrich_installation_knowledge'] },
  inspection: { label: 'Inspection & Testing', jobTypes: ['enrich_inspection_testing_knowledge'] },
  maintenance: { label: 'Maintenance Procedures', jobTypes: ['enrich_maintenance_knowledge'] },
  project_mgmt: { label: 'Project Management', jobTypes: ['enrich_project_management_knowledge'] },
  pricing: { label: 'Pricing Intelligence', jobTypes: ['enrich_pricing_intelligence'] },
};

export default function EnrichmentMonitor() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [keepaliveEnabled, setKeepaliveEnabled] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get task filter from URL or default to 'all'
  const selectedTask = (searchParams.get('task') || 'all') as keyof typeof TASK_FILTERS;

  const fetchJobs = async () => {
    try {
      // Server-side filtering when a specific task is selected
      const taskJobTypes = TASK_FILTERS[selectedTask].jobTypes;
      
      let query = supabase
        .from('batch_jobs')
        .select(`
          *,
          progress:batch_progress(*)
        `)
        .order('created_at', { ascending: false });
      
      // Apply filter if not 'all'
      if (taskJobTypes) {
        query = query.in('job_type', taskJobTypes);
      }
      
      query = query.limit(50); // Increased for safety
      
      const { data: jobs, error } = await query;
      
      if (error) throw error;
      
      // Calculate aggregate stats for each job
      const enrichedJobs = jobs?.map(job => {
        const completedBatches = job.progress?.filter((p: any) => p.status === 'completed').length || 0;
        const failedBatches = job.progress?.filter((p: any) => p.status === 'failed').length || 0;
        const processingBatches = job.progress?.filter((p: any) => p.status === 'processing').length || 0;
        const totalBatches = job.total_batches || job.progress?.length || 0;
        
        // Check for recent activity in batches
        const recentActivity = job.progress?.some((p: any) => {
          if (p.status !== 'processing') return false;
          const startedAt = new Date(p.started_at || p.updated_at).getTime();
          return Date.now() - startedAt < 3 * 60 * 1000; // Last 3 minutes
        });
        
        return {
          ...job,
          completedBatches,
          failedBatches,
          processingBatches,
          totalBatches,
          progressPercent: totalBatches > 0 ? Math.round((completedBatches / totalBatches) * 100) : 0,
          hasRecentActivity: recentActivity
        };
      });
      
      setJobs(enrichedJobs || []);
    } catch (error: any) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  // Derived state for keepalive
  const hasIncomplete = jobs.some(j => j.completedBatches < j.totalBatches);
  const hasRecentActivity = jobs.some(j => j.hasRecentActivity);

  // Keepalive callback
  const handleKeepalivePing = async () => {
    const taskJobTypes = TASK_FILTERS[selectedTask].jobTypes;
    const isSingleTaskMode = selectedTask !== 'all' && taskJobTypes && taskJobTypes.length > 0;
    
    const body = isSingleTaskMode 
      ? { 
          action: 'start', 
          scope: 'single', 
          jobType: taskJobTypes[0],
          createIfMissing: true 
        }
      : { action: 'start' };
    
    await supabase.functions.invoke('master-enrichment-scheduler', { body });
    await fetchJobs();
  };

  // Setup keepalive
  const keepalive = useKeepalive({
    isActive: keepaliveEnabled && hasIncomplete,
    callback: handleKeepalivePing,
    intervalMs: 120000 // 2 minutes
  });

  useEffect(() => {
    // Clear React Query cache on mount to prevent stale data
    queryClient.clear();
    
    fetchJobs();
    if (autoRefresh) {
      const interval = setInterval(fetchJobs, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const startEnrichment = async (phase?: number, singleTask?: boolean) => {
    setLoading(true);
    try {
      // If a specific task is selected and singleTask is true, start only that task
      const taskJobTypes = TASK_FILTERS[selectedTask].jobTypes;
      const isSingleTaskMode = singleTask && selectedTask !== 'all' && taskJobTypes && taskJobTypes.length > 0;
      
      const body = isSingleTaskMode 
        ? { 
            action: 'start', 
            scope: 'single', 
            jobType: taskJobTypes[0],
            createIfMissing: true 
          }
        : { action: 'start', phase };
      
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body
      });
      
      const taskName = data?.tasks?.[0] || (isSingleTaskMode ? TASK_FILTERS[selectedTask].label : 'enrichment');
      
      toast({ 
        title: isSingleTaskMode ? `✅ Started ${taskName}` : '✅ Long-running worker started',
        description: data?.worker_active 
          ? (isSingleTaskMode ? `Processing ${taskName} only` : 'Continuous processing active - will auto-complete all batches')
          : 'Jobs are now processing. Check progress below.'
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '⏳ Enrichment may be starting',
        description: 'Check the jobs below for progress.'
      });
      setTimeout(() => fetchJobs(), 2000);
    } finally {
      setLoading(false);
    }
  };

  const startTest = async () => {
    setLoading(true);
    try {
      await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'test' }
      });
      
      toast({ 
        title: '✅ Test started successfully',
        description: 'Processing 100 documents. Check progress below.'
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '⏳ Test may be starting',
        description: 'Check the jobs below for progress.'
      });
      setTimeout(() => fetchJobs(), 2000);
    } finally {
      setLoading(false);
    }
  };

  const recoverStuck = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'recover' }
      });
      
      toast({ 
        title: '✅ Recovery complete',
        description: `Recovered ${data?.recovered_batches || 0} stuck batches.`
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '❌ Recovery failed',
        description: error.message || 'Check logs for details.'
      });
    } finally {
      setLoading(false);
    }
  };

  const abortDuplicates = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'abort_duplicates' }
      });
      
      toast({ 
        title: '✅ Duplicates removed',
        description: `Aborted ${data?.aborted || 0} duplicate jobs.`
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '❌ Abort failed',
        description: error.message || 'Check logs for details.'
      });
    } finally {
      setLoading(false);
    }
  };

  const restartPhase1 = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'restart', phase: 1 }
      });
      
      toast({ 
        title: '✅ Phase 1 restarted',
        description: `Started ${data?.jobIds?.length || 0} fresh jobs.`
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '❌ Restart failed',
        description: error.message || 'Check logs for details.'
      });
    } finally {
      setLoading(false);
    }
  };

  const skipBatch = async (jobId: string, batchId: string) => {
    try {
      await supabase
        .from('batch_progress')
        .update({ status: 'failed', error_message: 'Manually skipped', completed_at: new Date().toISOString() })
        .eq('id', batchId);
      
      toast({ title: '✅ Batch skipped', description: 'Moving to next batch...' });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ title: '❌ Skip failed', description: error.message });
    }
  };

  const clearAllJobs = async () => {
    setLoading(true);
    try {
      // Call edge function with service role privileges to truly delete everything
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'clear_all' }
      });
      
      if (error) throw error;
      
      if (!data?.success) {
        throw new Error(data?.error || 'Failed to clear jobs');
      }
      
      console.log('✅ Purge complete:', data);
      
      // Reset UI state
      setJobs([]);
      
      toast({ 
        title: '✅ All jobs cleared',
        description: `Purged ${data.purged?.jobs || 0} jobs and ${data.purged?.progress || 0} batches. Ready to start fresh.`,
        variant: 'success'
      });
      
      // Refresh after a delay to confirm empty state
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      console.error('❌ Clear failed:', error);
      toast({ 
        title: '❌ Clear failed',
        description: error.message || 'Check logs for details.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
      setShowClearDialog(false);
    }
  };

  const forceResetJob = async (jobId: string, jobType: string) => {
    setLoading(true);
    try {
      // Reset job status to pending
      await supabase
        .from('batch_jobs')
        .update({ status: 'pending' })
        .eq('id', jobId);
      
      // Reset any stuck batches for this job
      await supabase
        .from('batch_progress')
        .update({ status: 'pending', started_at: null, error_message: null })
        .eq('job_id', jobId)
        .eq('status', 'processing');
      
      toast({ 
        title: '✅ Job reset successfully',
        description: `${jobType} cleared from ghost lock. Keepalive will resume processing.`,
        variant: 'success'
      });
      
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      console.error('❌ Reset failed:', error);
      toast({ 
        title: '❌ Reset failed',
        description: error.message || 'Check logs for details.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Jobs are already filtered server-side, no need for client filtering
  const filteredJobs = jobs;

  // Calculate metrics from filtered jobs using job.progress (joined data)
  const totalQualityPassed = filteredJobs.reduce((sum, job) => {
    const batches = job.progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_passed || 0), 0);
  }, 0);

  const totalQualityFailed = filteredJobs.reduce((sum, job) => {
    const batches = job.progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_failed || 0), 0);
  }, 0);

  const successRate = totalQualityPassed / (totalQualityPassed + totalQualityFailed) * 100 || 0;

  const totalCost = filteredJobs.reduce((sum, job) => {
    const batches = job.progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.api_cost_gbp || 0), 0);
  }, 0);

  const activeJobs = filteredJobs.filter(j => ['pending', 'processing'].includes(j.status));
  
  // Calculate health metrics using job.progress (joined data)
  const getJobHealth = (job: any) => {
    const batches = job.progress || [];
    const processingBatches = batches.filter((b: any) => b.status === 'processing');
    const stuckBatches = processingBatches.filter((b: any) => {
      const startTime = new Date(b.started_at).getTime();
      return Date.now() - startTime > 10 * 60 * 1000; // >10 min
    });
    
    const failureRate = batches.length ? 
      (batches.filter((b: any) => b.status === 'failed').length / batches.length * 100) : 0;
    
    const avgProcessingTime = batches.reduce((sum: number, b: any) => 
      sum + (b.data?.avg_processing_time_ms || 0), 0) / (batches.length || 1);
    
    return {
      stuck: stuckBatches.length,
      failureRate,
      avgProcessingTime,
      currentBatch: processingBatches[0],
      estimatedTimeRemaining: job.status === 'processing' ? 
        (job.total_batches - job.completed_batches) * avgProcessingTime / 1000 / 60 : 0
    };
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Universal Enrichment Monitor</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time batch processing with automatic recovery
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setAutoRefresh(!autoRefresh)} 
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
            >
              <Pause className="w-4 h-4 mr-2" />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </Button>
            <Button onClick={fetchJobs} variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Auto-processing Status Bar */}
        {hasIncomplete && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {keepaliveEnabled && !keepalive.isPaused ? (
                      <Activity className="w-5 h-5 text-primary animate-pulse" />
                    ) : (
                      <Pause className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-semibold text-sm">
                        Auto-processing: {keepaliveEnabled && !keepalive.isPaused ? 'Active' : 'Paused'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {keepaliveEnabled && !keepalive.isPaused && `Next refresh in: ${keepalive.secondsUntilNext}s`}
                        {keepalive.lastPingTime && ` • Last ping: ${keepalive.lastPingTime.toLocaleTimeString()}`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    onClick={keepalive.pingNow}
                    variant="secondary"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    disabled={loading}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Process Now
                  </Button>
                  <Button
                    onClick={() => {
                      if (keepaliveEnabled && !keepalive.isPaused) {
                        keepalive.pause();
                      } else if (!keepaliveEnabled) {
                        setKeepaliveEnabled(true);
                      } else {
                        keepalive.resume();
                      }
                    }}
                    variant={keepaliveEnabled && !keepalive.isPaused ? "outline" : "default"}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    {keepaliveEnabled && !keepalive.isPaused ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task Filter */}
        <div className="w-full">
          <Select 
            value={selectedTask} 
            onValueChange={(value) => {
              setSearchParams(value === 'all' ? {} : { task: value });
            }}
          >
            <SelectTrigger className="w-full sm:w-64">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by task" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TASK_FILTERS).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {selectedTask !== 'all' ? (
            <Button onClick={() => startEnrichment(undefined, true)} disabled={loading} size="lg" className="w-full col-span-2 sm:col-span-1 bg-primary">
              <Play className="w-4 h-4 mr-2" />
              Start {TASK_FILTERS[selectedTask].label}
            </Button>
          ) : (
            <Button onClick={() => startEnrichment(1)} disabled={loading} size="lg" className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Phase 1
            </Button>
          )}
          <Button onClick={recoverStuck} disabled={loading} variant="secondary" size="lg" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Recover Stuck
          </Button>
          <Button onClick={abortDuplicates} disabled={loading} variant="destructive" size="lg" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Duplicates
          </Button>
          <Button onClick={restartPhase1} disabled={loading} variant="outline" size="lg" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Phase 1
          </Button>
          <Button onClick={startTest} disabled={loading} variant="secondary" size="lg" className="w-full">
            <TestTube2 className="w-4 h-4 mr-2" />
            Test (100)
          </Button>
          <Button 
            onClick={() => startEnrichment()} 
            disabled={loading} 
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            All Phases
          </Button>
          <Button 
            onClick={() => setShowClearDialog(true)} 
            disabled={loading} 
            variant="destructive" 
            size="lg" 
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Jobs
          </Button>
        </div>
      </div>

      {/* Worker Status Card - Only show when truly active */}
      {hasRecentActivity && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <div className="font-semibold text-sm">Autonomous Processing</div>
                    <div className="text-xs text-muted-foreground">
                      Workers actively processing batches
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {activeJobs.length} active job{activeJobs.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Idle state hint */}
      {!hasRecentActivity && activeJobs.length > 0 && (
        <Card className="border-muted bg-muted/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Jobs are idle. Press "Resume" on a job card or enable auto-processing above.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{successRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              ✅ {totalQualityPassed} | ❌ {totalQualityFailed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">API Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£{totalCost.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">Total spent</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {jobs.filter(j => j.status === 'processing').length} processing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Failed Batches</CardTitle>
          </CardHeader>
            <CardContent>
            <div className="text-3xl font-bold">
              {filteredJobs.reduce((sum, j) => sum + (j.failed_batches || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total failures</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const health = getJobHealth(job);
          const batchSize = job.metadata?.batchSize || 25;
          
          return (
            <Card key={job.id} className={health.stuck > 0 ? 'border-destructive' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 flex-wrap">
                      {job.job_type?.replace('enrich_', '').replace(/_/g, ' ').toUpperCase()}
                      {job.status === 'processing' && job.processingBatches > 0 && (
                        <Badge variant="destructive" className="animate-pulse">
                          <Activity className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                      {health.stuck > 0 && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {health.stuck} STUCK
                        </Badge>
                      )}
                      <Badge variant="outline">{job.status}</Badge>
                      
                      {/* Force Reset button - show when job is stuck (processing >5 min) */}
                      {job.status === 'processing' && 
                       Date.now() - new Date(job.updated_at).getTime() > 5 * 60 * 1000 && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="ml-auto"
                          onClick={() => forceResetJob(job.id, job.job_type)}
                          disabled={loading}
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Force Reset
                        </Button>
                      )}
                      
                      {/* Resume button - show when incomplete and not actively processing */}
                      {job.completedBatches < job.totalBatches && (job.processingBatches === 0 || !job.hasRecentActivity) && 
                       !(job.status === 'processing' && Date.now() - new Date(job.updated_at).getTime() > 5 * 60 * 1000) && (
                        <Button
                          size="sm"
                          variant="default"
                          className="ml-auto"
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await supabase.functions.invoke('master-enrichment-scheduler', {
                                body: { 
                                  action: 'start', 
                                  scope: 'single', 
                                  jobType: job.job_type 
                                }
                              });
                              toast({ title: '✅ Resuming job...', description: job.job_type });
                              setTimeout(() => fetchJobs(), 1000);
                            } catch (error: any) {
                              toast({ title: '❌ Resume failed', description: error.message });
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Resume
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2 flex-wrap">
                      <span>{job.completedBatches}/{job.totalBatches} batches completed</span>
                      {job.failedBatches > 0 && <span>• {job.failedBatches} failed</span>}
                      {job.processingBatches > 0 && (
                        <>
                          <span>• {job.processingBatches} processing</span>
                          <Badge variant="outline" className="gap-1 border-elec-yellow/30 text-elec-yellow">
                            <Rocket className="w-3 h-3" />
                            10 Workers Active
                          </Badge>
                        </>
                      )}
                    </CardDescription>
                    {health.estimatedTimeRemaining > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        Est. {Math.ceil(health.estimatedTimeRemaining)} mins remaining
                      </div>
                    )}
                    {job.error_message && (
                      <p className="text-xs text-destructive mt-2 font-mono">
                        Error: {job.error_message}
                      </p>
                    )}
                  </div>
                  
                  {health.currentBatch && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => skipBatch(job.id, health.currentBatch.id)}
                    >
                      <SkipForward className="w-4 h-4 mr-1" />
                      Skip Current
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">{job.progressPercent}%</span>
                  </div>
                  <Progress value={job.progressPercent || 0} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {job.completedBatches} done
                    </span>
                    {job.processingBatches > 0 && (
                      <span className="inline-flex items-center gap-1 text-elec-yellow">
                        <Activity className="w-3 h-3" />
                        {job.processingBatches} active
                      </span>
                    )}
                    {job.failedBatches > 0 && (
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <AlertTriangle className="w-3 h-3" />
                        {job.failedBatches} failed
                      </span>
                    )}
                  </div>
                </div>
                
                {health.currentBatch && (
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="font-medium mb-1 flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-pulse text-elec-yellow" />
                      Processing Batch #{health.currentBatch.batch_number}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {health.currentBatch.items_processed || 0}/{health.currentBatch.total_items} items
                      {health.currentBatch.data?.avg_processing_time_ms && 
                        ` • ${(health.currentBatch.data.avg_processing_time_ms / 1000).toFixed(1)}s avg`
                      }
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        
        {filteredJobs.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardContent className="py-12 text-center space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {jobs.length === 0 
                    ? "Ready to Start Fresh" 
                    : `No ${TASK_FILTERS[selectedTask].label} jobs found`
                  }
                </h3>
                <p className="text-sm text-muted-foreground">
                  {jobs.length === 0 && selectedTask === 'bs7671' 
                    ? "Ready to enrich 2,557 BS 7671 regulations with 10 parallel workers (~25-30 min)"
                    : jobs.length === 0
                    ? "Click 'Start Enrichment' above to begin processing"
                    : `Filter shows no jobs. Try selecting a different task or click 'All Tasks'.`
                  }
                </p>
              </div>
              {jobs.length === 0 && (
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="outline" className="gap-1 border-elec-yellow/30 text-elec-yellow">
                    <Rocket className="w-4 h-4" />
                    10 Parallel Workers Ready
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    GPT-5 Model Enabled
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Clear All Jobs Confirmation Dialog */}
      <ConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        title="Clear All Jobs?"
        description="This will permanently delete all batch jobs and their progress from the database. This action cannot be undone."
        confirmText="Clear All Jobs"
        cancelText="Cancel"
        onConfirm={clearAllJobs}
        variant="destructive"
        loading={loading}
      />
    </div>
  );
}
