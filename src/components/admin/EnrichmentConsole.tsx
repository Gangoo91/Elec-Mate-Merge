import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, RotateCw, Trash2, CheckCircle2, AlertCircle, 
  Clock, Activity, Database, TrendingUp 
} from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface JobStatus {
  id: string;
  job_type: string;
  status: string;
  total_batches: number;
  completed_batches: number;
  failed_batches: number;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
  metadata: any;
}

interface BatchProgress {
  id: string;
  job_id: string;
  batch_number: number;
  status: string;
  items_processed: number;
  total_items: number;
  started_at: string | null;
  data: any;
}

export default function EnrichmentConsole() {
  const [jobs, setJobs] = useState<JobStatus[]>([]);
  const [batches, setBatches] = useState<BatchProgress[]>([]);
  const [stats, setStats] = useState({ total: 0, enriched: 0, remaining: 0, progress: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const loadStatus = async () => {
    try {
      // Load jobs
      const { data: jobsData } = await supabase
        .from('batch_jobs')
        .select('*')
        .eq('job_type', 'enrich_bs7671_embeddings')
        .order('created_at', { ascending: false })
        .limit(5);

      setJobs(jobsData || []);

      // Load batches for active jobs
      if (jobsData && jobsData.length > 0) {
        const jobIds = jobsData.map(j => j.id);
        const { data: batchesData } = await supabase
          .from('batch_progress')
          .select('*')
          .in('job_id', jobIds)
          .in('status', ['pending', 'processing'])
          .order('batch_number', { ascending: true });

        setBatches(batchesData || []);
      }

      // Load stats
      const { count: totalCount } = await supabase
        .from('bs7671_embeddings')
        .select('*', { count: 'exact', head: true })
        .neq('regulation_number', 'General');

      const { count: enrichedCount } = await supabase
        .from('regulations_intelligence')
        .select('regulation_id', { count: 'exact', head: true });

      const total = totalCount || 0;
      const enriched = enrichedCount || 0;
      const remaining = Math.max(0, total - enriched);
      const progress = total > 0 ? Math.round((enriched / total) * 100) : 0;

      setStats({ total, enriched, remaining, progress });
    } catch (error) {
      console.error('Failed to load status:', error);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const callScheduler = async (action: string, extraParams = {}) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { 
          action, 
          scope: 'single', 
          jobType: 'enrich_bs7671_embeddings',
          createIfMissing: true,
          ...extraParams 
        }
      });

      if (error) throw error;
      
      toast.success(data.message || `Action '${action}' completed`);
      await loadStatus();
    } catch (error: any) {
      toast.error(error.message || `Action '${action}' failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => callScheduler('start');
  const handleContinue = () => callScheduler('continue');
  const handleRecover = () => callScheduler('recover');
  const handleDedupe = () => callScheduler('dedupe_batches');
  const handleAbortDupes = () => callScheduler('abort_duplicates');
  const handleClear = async () => {
    if (!confirm('Clear ALL jobs and batches? This cannot be undone.')) return;
    
    setIsLoading(true);
    try {
      await supabase.from('batch_progress').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('batch_jobs').delete().eq('job_type', 'enrich_bs7671_embeddings');
      toast.success('All jobs cleared');
      await loadStatus();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReconcile = async () => {
    setIsLoading(true);
    try {
      // Find missing items
      const { data: allRegs } = await supabase
        .from('bs7671_embeddings')
        .select('id, regulation_number')
        .neq('regulation_number', 'General');

      const { data: enriched } = await supabase
        .from('regulations_intelligence')
        .select('regulation_id');

      const enrichedIds = new Set((enriched || []).map(e => e.regulation_id));
      const missing = (allRegs || []).filter(r => !enrichedIds.has(r.id));

      if (missing.length === 0) {
        toast.success('✅ No missing regulations - all enriched!');
      } else {
        toast.warning(`Found ${missing.length} missing regulations`, {
          description: `IDs: ${missing.slice(0, 5).map(m => m.regulation_number).join(', ')}${missing.length > 5 ? '...' : ''}`
        });
        
        // Save reconciliation record
        await supabase.from('enrichment_reconciliation').insert({
          job_type: 'enrich_bs7671_embeddings',
          source_table: 'bs7671_embeddings',
          target_table: 'regulations_intelligence',
          total_source_items: allRegs?.length || 0,
          total_enriched_items: enriched?.length || 0,
          missing_items: missing.length,
          missing_ids: missing.map(m => ({ id: m.id, reg: m.regulation_number }))
        });
      }

      await loadStatus();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStuckBatches = () => {
    const now = Date.now();
    const threeMinutesAgo = now - (3 * 60 * 1000);
    
    return batches.filter(b => 
      b.status === 'processing' && 
      b.started_at && 
      new Date(b.started_at).getTime() < threeMinutesAgo
    );
  };

  const stuckBatches = getStuckBatches();
  const activeJob = jobs.find(j => ['pending', 'processing'].includes(j.status));

  return (
    <div className="space-y-4 p-4">
      {/* Stats Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            BS 7671 Enrichment
          </h3>
          {stats.progress > 0 && (
            <Badge variant={stats.progress === 100 ? "default" : "secondary"}>
              {stats.progress}% Complete
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-success">{stats.enriched}</div>
            <div className="text-xs text-muted-foreground">Enriched</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-warning">{stats.remaining}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-chart-2">{batches.length}</div>
            <div className="text-xs text-muted-foreground">Active Batches</div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="p-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Controls
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <MobileButton 
            variant="default" 
            size="wide" 
            onClick={handleStart}
            disabled={isLoading || !!activeJob}
            icon={<Play className="w-4 h-4" />}
          >
            Start
          </MobileButton>
          
          <MobileButton 
            variant="secondary" 
            size="wide" 
            onClick={handleContinue}
            disabled={isLoading || !activeJob}
            icon={<Pause className="w-4 h-4" />}
          >
            Continue
          </MobileButton>
          
          <MobileButton 
            variant="outline" 
            size="wide" 
            onClick={handleRecover}
            disabled={isLoading}
            icon={<RotateCw className="w-4 h-4" />}
          >
            Recover Stuck
            {stuckBatches.length > 0 && (
              <Badge variant="destructive" className="ml-1">{stuckBatches.length}</Badge>
            )}
          </MobileButton>
          
          <MobileButton 
            variant="outline" 
            size="wide" 
            onClick={handleDedupe}
            disabled={isLoading}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Dedupe
          </MobileButton>
          
          <MobileButton 
            variant="outline" 
            size="wide" 
            onClick={handleReconcile}
            disabled={isLoading}
            icon={<TrendingUp className="w-4 h-4" />}
          >
            Reconcile
          </MobileButton>
          
          <MobileButton 
            variant="destructive" 
            size="wide" 
            onClick={handleClear}
            disabled={isLoading}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Clear All
          </MobileButton>
        </div>
      </Card>

      {/* Active Jobs */}
      {jobs.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">Recent Jobs</h4>
          <div className="space-y-2">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={
                      job.status === 'completed' ? 'default' : 
                      job.status === 'processing' ? 'secondary' : 
                      job.status === 'failed' ? 'destructive' : 'outline'
                    }>
                      {job.status}
                    </Badge>
                    <span className="text-sm font-mono">{job.job_type}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {job.completed_batches}/{job.total_batches} batches
                    {job.failed_batches > 0 && ` • ${job.failed_batches} failed`}
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {new Date(job.updated_at).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Stuck Batches Warning */}
      {stuckBatches.length > 0 && (
        <Card className="p-4 border-destructive">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-destructive mb-1">
                {stuckBatches.length} Stuck Batch{stuckBatches.length > 1 ? 'es' : ''} Detected
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                These batches have been processing for over 3 minutes without progress
              </p>
              <MobileButton 
                variant="destructive" 
                size="sm" 
                onClick={handleRecover}
                disabled={isLoading}
                icon={<RotateCw className="w-4 h-4" />}
              >
                Reset Stuck Batches
              </MobileButton>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
