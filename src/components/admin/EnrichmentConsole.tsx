import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Task configuration for multi-source enrichment
const TASK_CONFIG = {
  bs7671: {
    label: 'BS 7671 Regulations',
    jobType: 'enrich_bs7671_embeddings',
    sourceTable: 'bs7671_embeddings',
    targetTable: 'regulations_intelligence',
    sourceFilter: { column: 'regulation_number', op: 'neq', value: 'General' }
  },
  health_safety: {
    label: 'Health & Safety',
    jobType: 'enrich_health_safety_knowledge',
    sourceTable: 'health_safety_knowledge',
    targetTable: 'health_safety_intelligence',
    sourceFilter: null
  },
  pricing: {
    label: 'Pricing Data',
    jobType: 'enrich_pricing_data',
    sourceTable: 'pricing_embeddings',
    targetTable: 'pricing_intelligence',
    sourceFilter: null
  }
} as const;

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
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTask = (searchParams.get('task') || 'bs7671') as keyof typeof TASK_CONFIG;
  const config = TASK_CONFIG[selectedTask];
  
  const [jobs, setJobs] = useState<JobStatus[]>([]);
  const [batches, setBatches] = useState<BatchProgress[]>([]);
  const [stats, setStats] = useState({ 
    sourceTotal: 0, 
    sourceEnriched: 0, 
    facetsCreated: 0, 
    targetFacets: 0, 
    remaining: 0, 
    progress: 0 
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const loadStatus = async () => {
    try {
      // Load jobs for current task
      const { data: jobsData } = await supabase
        .from('batch_jobs')
        .select('*')
        .eq('job_type', config.jobType)
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
      } else {
        // No jobs = no batches, clear stale state
        setBatches([]);
      }

      // Load stats (task-aware queries)
      let sourceQuery = supabase
        .from(config.sourceTable)
        .select('*', { count: 'exact', head: true });
      
      // Apply source filter if configured
      if (config.sourceFilter) {
        const { column, op, value } = config.sourceFilter;
        sourceQuery = sourceQuery[op](column, value);
      }
      
      const { count: sourceTotal } = await sourceQuery;

      // Count unique enriched source records (not facets)
      const { data: enrichedData } = await supabase
        .from(config.targetTable)
        .select('regulation_id, source_id, knowledge_id, pricing_id');

      // Extract unique source IDs (handles different FK column names across tables)
      const uniqueSourceIds = new Set(
        (enrichedData || []).map((e: any) => 
          e.regulation_id || e.source_id || e.knowledge_id || e.pricing_id
        ).filter(Boolean)
      );

      // Count actual facets created (total rows in target table)
      const { count: facetsCreated } = await supabase
        .from(config.targetTable)
        .select('*', { count: 'exact', head: true });

      // Calculate target facets based on task
      // BS 7671: 2,557 regs × 25 average facets = ~64,000
      // Others: 1:1 ratio (no facet expansion)
      const avgFacetsPerReg = selectedTask === 'bs7671' ? 25 : 1;
      const targetFacets = (sourceTotal || 0) * avgFacetsPerReg;

      const sourceEnriched = uniqueSourceIds.size;
      const remaining = Math.max(0, targetFacets - (facetsCreated || 0));
      const progress = targetFacets > 0 ? Math.round(((facetsCreated || 0) / targetFacets) * 100) : 0;

      setStats({ 
        sourceTotal: sourceTotal || 0, 
        sourceEnriched, 
        facetsCreated: facetsCreated || 0, 
        targetFacets, 
        remaining, 
        progress 
      });
    } catch (error) {
      console.error('Failed to load status:', error);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [selectedTask]); // Reload when task changes

  const callScheduler = async (action: string, extraParams = {}) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { 
          action, 
          scope: 'single', 
          jobType: config.jobType,
          createIfMissing: true,
          ...extraParams 
        }
      });

      if (error) throw error;
      
      // Special handling for Continue action when no pending jobs but work remains
      if (action === 'continue' && data?.message === 'No pending jobs to continue' && stats.remaining > 0) {
        toast.info('No pending jobs found — starting fresh batches for remaining work...');
        await callScheduler('start');
        return;
      }
      
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
      const response = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'clear_all' }
      });
      
      if (response.error) throw response.error;
      
      toast.success('All jobs and batches cleared');
      await loadStatus();
    } catch (error: any) {
      toast.error(error.message || 'Clear failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReconcile = async () => {
    setIsLoading(true);
    try {
      // Find missing items (task-aware with generic ID selection)
      let sourceQuery = supabase
        .from(config.sourceTable)
        .select('id');
      
      if (config.sourceFilter) {
        const { column, op, value } = config.sourceFilter;
        sourceQuery = sourceQuery[op](column, value);
      }
      
      const { data: allRegs } = await sourceQuery;

      // Generic query - works across different target table schemas
      const { data: enriched } = await supabase
        .from(config.targetTable)
        .select('*');

      // Extract source IDs from enriched records (handle different FK column names)
      const enrichedIds = new Set(
        (enriched || []).map((e: any) => 
          e.regulation_id || e.source_id || e.knowledge_id || e.pricing_id
        ).filter(Boolean)
      );
      
      const missing = (allRegs || []).filter(r => !enrichedIds.has(r.id));

      if (missing.length === 0) {
        toast.success('✅ No missing items - all enriched!');
      } else {
        toast.warning(`Found ${missing.length} missing items`, {
          description: `First 5 IDs: ${missing.slice(0, 5).map(m => m.id.substring(0, 8)).join(', ')}${missing.length > 5 ? '...' : ''}`
        });
        
        // Save reconciliation record
        await supabase.from('enrichment_reconciliation').insert({
          job_type: config.jobType,
          source_table: config.sourceTable,
          target_table: config.targetTable,
          total_source_items: allRegs?.length || 0,
          total_enriched_items: enriched?.length || 0,
          missing_items: missing.length,
          missing_ids: missing.map(m => ({ id: m.id }))
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
      {/* Task Selector */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Select Enrichment Task</h4>
        <Select value={selectedTask} onValueChange={(value) => setSearchParams({ task: value })}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TASK_CONFIG).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Stats Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            {config.label}
          </h3>
          {stats.progress > 0 && (
            <Badge variant={stats.progress === 100 ? "default" : "secondary"}>
              {stats.progress}% Complete
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.targetFacets.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Target Facets</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-success">{stats.facetsCreated.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Facets Created</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-warning">{stats.remaining.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-chart-2">{stats.sourceEnriched}/{stats.sourceTotal}</div>
            <div className="text-xs text-muted-foreground">Source Regs</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-chart-3">{batches.length}</div>
            <div className="text-xs text-muted-foreground">Active Batches</div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Controls
          </h4>
          <Badge variant="secondary" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Smart Resume Enabled
          </Badge>
        </div>
        
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