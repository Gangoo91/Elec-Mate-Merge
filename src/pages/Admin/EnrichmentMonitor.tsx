import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Play, TestTube2, AlertTriangle, Trash2, SkipForward, Pause, Clock, Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

export default function EnrichmentMonitor() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [workerActive, setWorkerActive] = useState(false);
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { toast } = useToast();

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('batch_jobs')
      .select('*, batch_progress(*)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    setJobs(data || []);
  };

  useEffect(() => {
    fetchJobs();
    if (autoRefresh) {
      const interval = setInterval(fetchJobs, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const startEnrichment = async (phase?: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'start', phase }
      });
      
      if (data?.worker_active) {
        setWorkerActive(true);
        setLastHeartbeat(new Date());
      }
      
      toast({ 
        title: '✅ Long-running worker started',
        description: data?.worker_active 
          ? 'Continuous processing active - will auto-complete all batches' 
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
      // Delete all batch_progress first (foreign key constraint)
      const { error: progressError } = await supabase
        .from('batch_progress')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (progressError) throw progressError;
      
      // Delete all batch_jobs
      const { error: jobsError } = await supabase
        .from('batch_jobs')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (jobsError) throw jobsError;
      
      // Reset UI state
      setJobs([]);
      setWorkerActive(false);
      setLastHeartbeat(null);
      
      toast({ 
        title: '✅ All jobs cleared',
        description: 'Database reset complete. Ready to start fresh.'
      });
    } catch (error: any) {
      toast({ 
        title: '❌ Clear failed',
        description: error.message || 'Check logs for details.'
      });
    } finally {
      setLoading(false);
      setShowClearDialog(false);
    }
  };

  // Calculate metrics
  const totalQualityPassed = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_passed || 0), 0);
  }, 0);

  const totalQualityFailed = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_failed || 0), 0);
  }, 0);

  const successRate = totalQualityPassed / (totalQualityPassed + totalQualityFailed) * 100 || 0;

  const totalCost = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.api_cost_gbp || 0), 0);
  }, 0);

  const activeJobs = jobs.filter(j => ['pending', 'processing'].includes(j.status));
  
  // Update worker status based on active jobs
  useEffect(() => {
    if (activeJobs.length > 0) {
      setLastHeartbeat(new Date());
    }
  }, [activeJobs.length]);
  
  // Calculate health metrics
  const getJobHealth = (job: any) => {
    const batches = job.batch_progress || [];
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          <Button onClick={() => startEnrichment(1)} disabled={loading} size="lg" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Phase 1
          </Button>
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

      {/* PHASE 5: Worker Status Card */}
      {activeJobs.length > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <div className="font-semibold text-sm">Long-Running Worker Active</div>
                    <div className="text-xs text-muted-foreground">
                      {lastHeartbeat && `Last heartbeat: ${lastHeartbeat.toLocaleTimeString()}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  <Zap className="w-3 h-3 mr-1" />
                  Autonomous Processing
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {activeJobs.length} active job{activeJobs.length !== 1 ? 's' : ''}
                </div>
              </div>
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
              {jobs.reduce((sum, j) => sum + (j.failed_batches || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total failures</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job) => {
          const health = getJobHealth(job);
          const batchSize = job.metadata?.batch_size || 25;
          
          return (
            <Card key={job.id} className={health.stuck > 0 ? 'border-destructive' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {job.metadata?.task_name || job.job_type}
                      {job.status === 'processing' && (
                        <Badge variant="destructive" className="animate-pulse">
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
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Batch size: {batchSize} items | Failure rate: {health.failureRate.toFixed(1)}%
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
                    <span>Progress</span>
                    <span className="font-medium">{job.progress_percentage}%</span>
                  </div>
                  <Progress value={job.progress_percentage || 0} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {job.completed_batches}/{job.total_batches} batches completed
                    {job.failed_batches > 0 && ` • ${job.failed_batches} failed`}
                  </div>
                </div>
                
                {health.currentBatch && (
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <div className="font-medium mb-1">Current Batch #{health.currentBatch.batch_number}</div>
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
        
        {jobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No enrichment jobs found. Click "Start Phase 1" to begin.
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
