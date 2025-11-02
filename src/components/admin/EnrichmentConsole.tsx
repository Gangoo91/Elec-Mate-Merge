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
import { FacetDistributionStats } from './FacetDistributionStats';
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
    enrichmentModel: 'faceted',
    targetMultiplier: 30,
    sourceFilter: { column: 'regulation_number', op: 'neq', value: 'General' }
  },
  health_safety: {
    label: 'Health & Safety',
    jobType: 'enrich_health_safety_knowledge',
    sourceTable: 'health_safety_knowledge',
    targetTable: 'health_safety_intelligence',
    enrichmentModel: 'simple',
    targetMultiplier: 1,
    sourceFilter: null
  },
  pricing: {
    label: 'Pricing Data',
    jobType: 'enrich_pricing_data',
    sourceTable: 'pricing_embeddings',
    targetTable: 'pricing_intelligence',
    enrichmentModel: 'simple',
    targetMultiplier: 1,
    sourceFilter: null
  },
  practical_work: {
    label: 'Practical Work',
    jobType: 'enrich_practical_work',
    sourceTable: 'practical_work',
    targetTable: 'practical_work_intelligence',
    enrichmentModel: 'faceted',
    targetMultiplier: 8.0, // Updated to 8 facets per source
    sourceFilter: { column: 'is_canonical', op: 'eq', value: true }
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
  const rawTask = searchParams.get('task') || 'bs7671';

  // Validate task exists in config
  useEffect(() => {
    if (!TASK_CONFIG[rawTask as keyof typeof TASK_CONFIG]) {
      setSearchParams({ task: 'bs7671' }, { replace: true });
    }
  }, [rawTask, setSearchParams]);

  const selectedTask = (rawTask in TASK_CONFIG ? rawTask : 'bs7671') as keyof typeof TASK_CONFIG;
  const config = TASK_CONFIG[selectedTask];
  
  const [jobs, setJobs] = useState<JobStatus[]>([]);
  const [batches, setBatches] = useState<BatchProgress[]>([]);
  const [stats, setStats] = useState({ 
    sourceTotal: 0, 
    sourceEnriched: 0, 
    isEstimated: false,
    actualCanonical: 0,
    facetsCreated: 0, 
    targetFacets: 0, 
    remaining: 0, 
    progress: 0,
    stageProgress: {} as Record<string, number>,
    // 8-facet compliance metrics (last 10 min)
    compliance: {
      sourcesEnriched10min: 0,
      exactly8Count10min: 0,
      avgFacets10min: 0,
      compliancePercentage10min: 0,
      exactly8CountAllTime: 0,
      avgFacetsAllTime: 0
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [missingRegulations, setMissingRegulations] = useState<string[]>([]);
  const [integrityCheck, setIntegrityCheck] = useState<{
    beforeCount: number;
    beforeUniqueRegs: number;
    beforeTimestamp: string;
    total_unique_regs?: number;
    enriched_unique_regs?: number;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

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

      // Load batches for active jobs (include ALL batches for full visibility)
      if (jobsData && jobsData.length > 0) {
        const jobIds = jobsData.map(j => j.id);
        const { data: batchesData } = await supabase
          .from('batch_progress')
          .select('*')
          .in('job_id', jobIds)
          .order('batch_number', { ascending: true });

        setBatches(batchesData || []);
      } else {
        // No jobs = no batches, clear stale state
        setBatches([]);
      }

      // Load stats based on task type
      const isPracticalWork = selectedTask === 'practical_work' || selectedTask.startsWith('practical_work_');
      
      if (isPracticalWork) {
        // PRACTICAL WORK: All stages use same stats calculation
        const facetType = selectedTask === 'practical_work' ? 'primary' : selectedTask.replace('practical_work_', '');
        
        // For primary stage, count source records
        let sourceTotal = 0;
        if (facetType === 'primary') {
          const { count } = await supabase
            .from('practical_work' as const)
            .select('*', { count: 'exact', head: true })
            .eq('is_canonical', true);
          sourceTotal = count || 0;
        } else {
          // For specialist stages, count primary facets as source
          const { count } = await supabase
            .from('practical_work_intelligence' as const)
            .select('*', { count: 'exact', head: true })
            .eq('facet_type', 'primary');
          sourceTotal = count || 0;
        }

        let facetsCreated = 0;
        
        // Try primary facet_type first (current standard)
        const { count: primaryCount } = await supabase
          .from('practical_work_intelligence' as const)
          .select('*', { count: 'exact', head: true })
          .eq('facet_type', facetType);
        
        facetsCreated = primaryCount || 0;
        
        // Defensive fallback: if primary = 0 but scenario exists (legacy), show scenario count
        if (facetsCreated === 0 && facetType === 'primary') {
          const { count: scenarioCount } = await supabase
            .from('practical_work_intelligence' as const)
            .select('*', { count: 'exact', head: true })
            .eq('facet_type', 'scenario');
          
          if (scenarioCount && scenarioCount > 0) {
            console.warn('⚠️ Using legacy scenario count as fallback', { scenarioCount });
            facetsCreated = scenarioCount;
          }
        }

        const targetFacets = Math.round((sourceTotal || 0) * (config.targetMultiplier || 1));
        const progress = targetFacets > 0 ? Math.round(((facetsCreated || 0) / targetFacets) * 100) : 0;

        // Fetch 8-facet compliance metrics
        const { data: complianceData } = await supabase
          .from('practical_work_facet_compliance')
          .select('*')
          .single();

        setStats({
          sourceTotal: sourceTotal || 0,
          sourceEnriched: facetsCreated || 0,
          isEstimated: false,
          actualCanonical: 0,
          facetsCreated: facetsCreated || 0,
          targetFacets,
          remaining: Math.max(0, targetFacets - (facetsCreated || 0)),
          progress,
          stageProgress: {},
          compliance: {
            sourcesEnriched10min: complianceData?.sources_enriched || 0,
            exactly8Count10min: 0,
            avgFacets10min: complianceData?.avg_facets_per_source || 0,
            compliancePercentage10min: complianceData?.compliance_percentage || 0,
            exactly8CountAllTime: 0,
            avgFacetsAllTime: complianceData?.avg_facets_per_source || 0
          }
        });

      } else if (selectedTask === 'bs7671') {
        // BS 7671: Faceted model
        const { data: sourceRawData } = await supabase
          .from(config.sourceTable as 'bs7671_embeddings')
          .select('regulation_number')
          .neq('regulation_number', 'General')
          .limit(3000);
        
        const sourceTotal = new Set((sourceRawData || []).map(r => r.regulation_number)).size;

        const { data: enrichedRawData } = await supabase
          .from(config.targetTable as 'regulations_intelligence')
          .select('regulation_number')
          .limit(2000);

        const uniqueEnrichedRegulations = new Set(
          (enrichedRawData || []).map(e => e.regulation_number).filter(Boolean)
        );

        const { count: facetsCreated } = await supabase
          .from(config.targetTable)
          .select('*', { count: 'exact', head: true });

        const avgFacetsPerReg = 30;
        const projectedTargetFacets = (sourceTotal || 0) * avgFacetsPerReg;
        const targetFacets = Math.max(facetsCreated || 0, projectedTargetFacets);

        const sourceEnriched = uniqueEnrichedRegulations.size;
        const remaining = Math.max(0, sourceTotal - sourceEnriched);
        const progress = sourceTotal > 0 ? Math.round((sourceEnriched / sourceTotal) * 100) : 0;

        setStats({ 
          sourceTotal: sourceTotal || 0, 
          sourceEnriched, 
          isEstimated: false,
          actualCanonical: 0,
          facetsCreated: facetsCreated || 0, 
          targetFacets, 
          remaining, 
          progress,
          stageProgress: {},
          compliance: {
            sourcesEnriched10min: 0,
            exactly8Count10min: 0,
            avgFacets10min: 0,
            compliancePercentage10min: 0,
            exactly8CountAllTime: 0,
            avgFacetsAllTime: 0
          }
        });

      } else {
        // Health & Safety / Pricing: Simple 1:1 model
        const { count: sourceTotal } = await supabase
          .from(config.sourceTable)
          .select('*', { count: 'exact', head: true });

        const { count: facetsCreated } = await supabase
          .from(config.targetTable)
          .select('*', { count: 'exact', head: true });

        const progress = sourceTotal > 0 ? Math.round(((facetsCreated || 0) / sourceTotal) * 100) : 0;

        setStats({
          sourceTotal: sourceTotal || 0,
          sourceEnriched: facetsCreated || 0,
          isEstimated: false,
          actualCanonical: 0,
          facetsCreated: facetsCreated || 0,
          targetFacets: sourceTotal || 0,
          remaining: Math.max(0, (sourceTotal || 0) - (facetsCreated || 0)),
          progress,
          stageProgress: {},
          compliance: {
            sourcesEnriched10min: 0,
            exactly8Count10min: 0,
            avgFacets10min: 0,
            compliancePercentage10min: 0,
            exactly8CountAllTime: 0,
            avgFacetsAllTime: 0
          }
        });
      }
    } catch (error) {
      console.error('Failed to load status:', error);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 10000); // Reduced frequency - realtime handles instant updates
    return () => clearInterval(interval);
  }, [selectedTask]); // Reload when task changes

  // Realtime subscription for live facet updates (Practical Work stages only)
  useEffect(() => {
    const isPracticalWork = selectedTask.startsWith('practical_work_');
    if (!isPracticalWork) return;

    const facetType = selectedTask.replace('practical_work_', '');
    console.log(`🔴 Setting up realtime subscription for ${facetType} facets`);

    const channel = supabase
      .channel(`practical-work-${facetType}-live`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'practical_work_intelligence',
          filter: `facet_type=eq.${facetType}`
        },
        (payload) => {
          console.log(`✨ New ${facetType} facet created:`, payload.new);
          
          // Immediately update stats without waiting for next poll
          setStats(prev => {
            const newFacetsCreated = prev.facetsCreated + 1;
            const newProgress = prev.targetFacets > 0
              ? Math.round((newFacetsCreated / prev.targetFacets) * 100)
              : 0;

            return {
              ...prev,
              facetsCreated: newFacetsCreated,
              remaining: Math.max(0, prev.targetFacets - newFacetsCreated),
              progress: newProgress,
              stageProgress: {
                ...prev.stageProgress,
                [facetType]: (prev.stageProgress[facetType] || 0) + 1
              }
            };
          });
        }
      )
      .subscribe();

    return () => {
      console.log('🔴 Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [selectedTask]);

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

      // Warn user if no source records found
      if (data?.message?.includes('0 source records') || data?.message?.includes('No canonical')) {
        toast.error('No canonical procedures found. Please verify data integrity.');
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

  const handleFindMissing = async () => {
    setIsLoading(true);
    try {
      // Use server-computed missing regulations
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'compute_missing' }
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Compute failed');

      const missingCount = data.missing_count || 0;
      
      toast.success(`Found ${missingCount} regulations needing enrichment`, {
        description: missingCount > 0 ? `Sample: ${data.sample?.join(', ')}...` : 'All enriched'
      });
      
    } catch (error: any) {
      toast.error('Failed to find missing regulations');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyIntegrity = async () => {
    setIsVerifying(true);
    try {
      // Get current baseline from target table
      const { count: totalRecords } = await supabase
        .from(config.targetTable)
        .select('*', { count: 'exact', head: true });

      // Query source table with filter if applicable
      let sourceQuery = supabase
        .from(config.sourceTable)
        .select('*')
        .limit(5000);
      
      if (config.sourceFilter) {
        const { column, op, value } = config.sourceFilter;
        sourceQuery = sourceQuery[op](column, value);
      }
      
      const { data: sourceData } = await sourceQuery;

      // Query target table
      const { data: targetData } = await supabase
        .from(config.targetTable)
        .select('*')
        .limit(5000);

      // Extract unique IDs based on task type
      let uniqueSource = 0;
      let uniqueEnriched = 0;
      
      if (selectedTask === 'bs7671') {
        uniqueSource = new Set((sourceData || []).map((r: any) => r.regulation_number?.trim()).filter(Boolean)).size;
        uniqueEnriched = new Set((targetData || []).map((r: any) => r.regulation_number?.trim()).filter(Boolean)).size;
      } else if (selectedTask === 'practical_work') {
        uniqueSource = new Set((sourceData || []).map((r: any) => r.id).filter(Boolean)).size;
        uniqueEnriched = new Set((targetData || []).map((r: any) => r.practical_work_id).filter(Boolean)).size;
      } else {
        uniqueSource = sourceData?.length || 0;
        uniqueEnriched = targetData?.length || 0;
      }

      const checkData = {
        beforeCount: totalRecords || 0,
        beforeUniqueRegs: uniqueEnriched,
        beforeTimestamp: new Date().toISOString(),
        total_unique_regs: uniqueSource,
        enriched_unique_regs: uniqueEnriched
      };

      setIntegrityCheck(checkData);

      const itemLabel = selectedTask === 'bs7671' ? 'regulations' : 
                       selectedTask === 'practical_work' ? 'procedures' : 'items';
      
      toast.success('Data integrity verified', {
        description: `${uniqueEnriched}/${uniqueSource} unique ${itemLabel} enriched • ${uniqueSource - uniqueEnriched} missing`
      });
    } catch (error: any) {
      toast.error('Failed to verify data integrity');
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCompleteMissing = async () => {
    setIsLoading(true);
    
    try {
      // Step 1: Get server-computed counts first
      toast.info('Computing missing regulations...');
      const { data: computeData, error: computeError } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'compute_missing' }
      });
      
      if (computeError) throw computeError;
      if (!computeData?.success) throw new Error(computeData?.error || 'Compute failed');
      
      const { total_unique, enriched_unique, missing_count, suggested_batch_size, suggested_workers } = computeData;
      
      setIsLoading(false);
      
      // Step 2: Short-circuit if nothing to do
      if (missing_count === 0) {
        toast.success('All regulations already enriched');
        return;
      }
      
      // Step 3: Show confirmation with server numbers
      const estimatedBatches = Math.ceil(missing_count / suggested_batch_size);
      const estimatedMinutes = Math.ceil(missing_count * 1.5 / 60);
      
      const confirmed = window.confirm(
        `Complete Missing Regulations\n\n` +
        `Total Regulations: ${total_unique.toLocaleString()}\n` +
        `Already Enriched: ${enriched_unique.toLocaleString()}\n` +
        `Missing: ${missing_count}\n\n` +
        `This will create ${estimatedBatches} batches.\n` +
        `Estimated time: ${estimatedMinutes} minutes.\n\n` +
        `Continue?`
      );
      
      if (!confirmed) return;
      
      setIsLoading(true);
      
      // Step 4: Start the job with server-suggested parameters
      toast.info('Starting enrichment job...');
      const startResponse = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { 
          action: 'start_missing',
          chunkSize: suggested_batch_size,
          workers: suggested_workers
        }
      });
      
      if (startResponse.error) throw startResponse.error;
      
      const result = startResponse.data;
      
      if (!result?.success) throw new Error(result?.error || 'Failed to start job');
      
      if (result.missing_count === 0) {
        toast.success('All regulations already enriched');
        await loadStatus();
        return;
      }
      
      if (result?.jobId && result?.batchesCreated) {
        toast.success(`Started job for ${result.missing_count} missing regulations (${result.batchesCreated} batches)`, {
          description: '⏳ Monitor "Live Worker Activity" below for real-time progress'
        });
        console.log(`📊 Job ID: ${result.jobId}, Batches: ${result.batchesCreated}, Missing: ${result.missing_count}`);
        
        // Start monitoring for completion
        const jobId = result.jobId;
        const monitorInterval = setInterval(async () => {
          const { data: job } = await supabase
            .from('batch_jobs')
            .select('status, completed_batches, total_batches')
            .eq('id', jobId)
            .single();

          if (!job || job.status === 'completed') {
            clearInterval(monitorInterval);
            
            // Verify data integrity after completion
            const { count: afterCount } = await supabase
              .from('regulations_intelligence')
              .select('*', { count: 'exact', head: true });

            const { data: afterUniqueRegsData } = await supabase
              .from('regulations_intelligence')
              .select('regulation_number');

            const afterUniqueRegs = new Set((afterUniqueRegsData || []).map(r => r.regulation_number)).size;

            const recordsAdded = (afterCount || 0) - integrityCheck.beforeCount;
            const regsAdded = afterUniqueRegs - integrityCheck.beforeUniqueRegs;

            toast.success('✅ Enrichment complete - Data verified', {
              description: `Added: ${recordsAdded.toLocaleString()} records • ${regsAdded} unique regulations`
            });

            await loadStatus();
          }
        }, 3000); // Check every 3 seconds
      } else {
        toast.error('Failed to create new batches. Try "Clear All" then start again.');
      }
      
      // Refresh status
      await loadStatus();
    } catch (error: any) {
      console.error('Failed to start fresh job:', error);
      toast.error(error.message || 'Failed to start enrichment job');
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
    const fourPointFiveMinutesAgo = now - (4.5 * 60 * 1000); // ✅ Updated to 4.5 minutes
    
    return batches.filter(b => 
      b.status === 'processing' && 
      b.started_at && 
      new Date(b.started_at).getTime() < fourPointFiveMinutesAgo
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
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              {config.label}
            </h3>
            {selectedTask.startsWith('practical_work_') && (
              <Badge variant="outline" className="text-xs">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Live Updates
              </Badge>
            )}
          </div>
          {stats.progress > 0 && (
            <Badge variant={stats.progress === 100 ? "default" : "secondary"}>
              {stats.progress}% Complete
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-primary">
              {stats.sourceEnriched?.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Source Records
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-success">{stats.facetsCreated.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Facets Created
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-warning">{stats.remaining.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Remaining
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-chart-2">{stats.progress}%</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-2xl font-bold text-chart-3">{batches.filter(b => b.status === 'processing').length}</div>
            <div className="text-xs text-muted-foreground">Active Batches</div>
          </div>
        </div>

        {/* 8-Facet Compliance Metrics (Practical Work only) */}
        {selectedTask === 'practical_work' && stats.compliance.sourcesEnriched10min > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              8-Facet Compliance (Last 10 Minutes)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-xl font-bold text-primary">
                  {stats.compliance.avgFacets10min}
                </div>
                <div className="text-xs text-muted-foreground">Avg Facets/Source</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-xl font-bold text-success">
                  {stats.compliance.compliancePercentage10min}%
                </div>
                <div className="text-xs text-muted-foreground">Exactly 8</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-xl font-bold text-chart-2">
                  {stats.compliance.sourcesEnriched10min}
                </div>
                <div className="text-xs text-muted-foreground">Sources Enriched</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-md">
                <div className="text-xl font-bold text-chart-3">
                  {stats.compliance.avgFacetsAllTime}
                </div>
                <div className="text-xs text-muted-foreground">All-Time Avg</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Missing Items Alert (All Tasks) */}
      {stats.sourceTotal > stats.sourceEnriched && (
        <Card className="p-4 border-warning bg-warning/5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-warning" />
            <h4 className="font-semibold text-warning">Incomplete Enrichment Detected</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {stats.sourceTotal - stats.sourceEnriched} unique {
              selectedTask === 'bs7671' ? 'regulations' :
              selectedTask === 'practical_work' ? 'procedures' : 'items'
            } are missing enrichment data.
          </p>
          
          {/* Data Integrity Panel */}
          {integrityCheck && (
            <div className="mb-3 p-3 bg-muted rounded-md border border-success/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-success">Data Integrity Verified</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono space-y-1">
                <div>Baseline: {integrityCheck.beforeCount.toLocaleString()} records • {integrityCheck.beforeUniqueRegs} unique regs</div>
                <div>Timestamp: {new Date(integrityCheck.beforeTimestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <MobileButton
              onClick={handleVerifyIntegrity}
              disabled={isVerifying || isLoading}
              size={isMobile ? 'default' : 'sm'}
              variant="outline"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {isVerifying ? 'Verifying...' : 'Verify Data Integrity'}
            </MobileButton>
            
            <MobileButton
              onClick={handleCompleteMissing}
              disabled={isLoading || !integrityCheck}
              size={isMobile ? 'default' : 'sm'}
            >
              <Play className="w-4 h-4 mr-2" />
              Complete Missing
              {!integrityCheck && ' (Verify First)'}
            </MobileButton>

            {/* Archive Excess Facets Button (Practical Work only) */}
            {selectedTask === 'practical_work' && (
              <MobileButton
                onClick={async () => {
                  if (!confirm('Archive excess facets (rank 9+) to archive table? This is reversible and preserves all data.')) return;
                  setIsLoading(true);
                  try {
                    const { data, error } = await supabase.rpc('prune_practical_work_to_8_archive');
                    if (error) throw error;
                    
                    const result = data[0];
                    toast.success('✅ Archived excess facets', {
                      description: `Before: ${result.total_facets_before?.toLocaleString()} facets • After: ${result.total_facets_after?.toLocaleString()} • Archived: ${result.facets_archived?.toLocaleString()} • Sources: ${result.sources_affected}`
                    });
                    
                    await loadStatus();
                  } catch (error: any) {
                    toast.error('Failed to archive facets', { description: error.message });
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                size={isMobile ? 'default' : 'sm'}
                variant="outline"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Prune to 8 Facets
              </MobileButton>
            )}
          </div>
        </Card>
      )}

      {/* Facet Distribution Dashboard - Only for Practical Work */}
      {selectedTask === 'practical_work' && <FacetDistributionStats />}

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

      {/* Live Batch Activity */}
      {batches.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse text-success" />
              Live Worker Activity
            </h4>
            <Badge variant="secondary" className="text-xs">
              {batches.filter(b => b.status === 'processing').length} Active Workers
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {batches.map((batch, idx) => {
              const progress = batch.total_items > 0 
                ? Math.round((batch.items_processed / batch.total_items) * 100) 
                : 0;
              const elapsed = batch.started_at 
                ? Math.round((Date.now() - new Date(batch.started_at).getTime()) / 1000)
                : 0;
              
              return (
                <div key={batch.id} className="p-3 bg-muted rounded-md border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        batch.status === 'completed' ? 'default' : 
                        batch.status === 'processing' ? 'secondary' : 
                        batch.status === 'failed' ? 'destructive' : 'outline'
                      } className="text-xs">
                        Batch {batch.batch_number}
                      </Badge>
                      {batch.status === 'processing' && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                          <span className="text-xs text-muted-foreground">{elapsed}s</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {batch.items_processed}/{batch.total_items} items
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        batch.status === 'completed' ? 'bg-success' :
                        batch.status === 'processing' ? 'bg-primary animate-pulse' :
                        batch.status === 'failed' ? 'bg-destructive' :
                        'bg-muted-foreground'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {batch.status === 'processing' && batch.data?.current_regulation && (
                    <div className="mt-2 text-xs text-muted-foreground font-mono">
                      Processing: {batch.data.current_regulation}
                    </div>
                  )}

                  {/* Real-time Progress: Skipped vs New */}
                  {batch.data?.skipped_count !== undefined && batch.data?.new_count !== undefined && (
                    <div className="mt-2 flex gap-3 text-xs">
                      <span className="text-muted-foreground">
                        Skipped: <span className="font-semibold text-warning">{batch.data.skipped_count}</span>
                      </span>
                      <span className="text-muted-foreground">
                        New: <span className="font-semibold text-success">{batch.data.new_count}</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
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
                These batches have been processing for over 4.5 minutes without progress
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