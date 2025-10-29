import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { autoRecoverStuckBatches } from './watchdog.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EnrichmentTask {
  name: string;
  functionName: string;
  sourceTable: string;
  targetTable: string;
  batchSize: number;
  priority: number;
}

const ENRICHMENT_TASKS: EnrichmentTask[] = [
  // Phase 1: Core Knowledge Bases (Priority 1) - OPTIMIZED BATCH SIZES
  { name: 'BS 7671 Intelligence', functionName: 'enrich-regulations', sourceTable: 'bs7671_embeddings', targetTable: 'regulations_intelligence', batchSize: 15, priority: 1 },
  { name: 'Health & Safety Knowledge', functionName: 'enrich-health-safety', sourceTable: 'health_safety_knowledge', targetTable: 'regulation_hazards_extracted', batchSize: 15, priority: 1 },
  { name: 'Installation Procedures', functionName: 'enrich-installation-procedures', sourceTable: 'installation_knowledge', targetTable: 'installation_procedures', batchSize: 20, priority: 1 },
  { name: 'Design Patterns', functionName: 'enrich-design-patterns', sourceTable: 'design_knowledge', targetTable: 'design_patterns_structured', batchSize: 20, priority: 1 },
  
  // Phase 2: Specialized Domains (Priority 2)
  { name: 'Inspection Procedures', functionName: 'enrich-inspection-procedures', sourceTable: 'inspection_testing_knowledge', targetTable: 'inspection_procedures', batchSize: 30, priority: 2 },
  { name: 'Maintenance Schedules', functionName: 'enrich-maintenance-schedules', sourceTable: 'maintenance_knowledge', targetTable: 'maintenance_schedules', batchSize: 30, priority: 2 },
  { name: 'Project Templates', functionName: 'enrich-project-templates', sourceTable: 'project_mgmt_knowledge', targetTable: 'project_templates', batchSize: 30, priority: 2 },
  
  // Phase 3: Pricing Intelligence (Priority 3)
  { name: 'Pricing Intelligence', functionName: 'enrich-pricing-intelligence', sourceTable: 'pricing_embeddings', targetTable: 'pricing_intelligence', batchSize: 10, priority: 3 },
];

// Global worker state tracking
const activeWorkers = new Map<string, boolean>();

// Graceful shutdown handler
addEventListener('beforeunload', (ev) => {
  console.log('🛑 Scheduler shutting down:', ev.detail?.reason);
  console.log(`Active workers at shutdown: ${activeWorkers.size}`);
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action = 'start', phase, taskName } = await req.json();
    
    console.log(`🎯 Master Enrichment Scheduler: ${action}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

  // Action: Abort duplicate jobs
  if (action === 'abort_duplicates') {
    console.log('🧹 Aborting duplicate jobs...');
    
    const { data: allJobs } = await supabase
      .from('batch_jobs')
      .select('*')
      .in('status', ['pending', 'processing'])
      .order('created_at', { ascending: false });
    
    const jobsByType = new Map<string, any[]>();
    allJobs?.forEach(job => {
      if (!jobsByType.has(job.job_type)) jobsByType.set(job.job_type, []);
      jobsByType.get(job.job_type)!.push(job);
    });
    
    let aborted = 0;
    for (const [jobType, jobs] of jobsByType.entries()) {
      if (jobs.length > 1) {
        const [keep, ...duplicates] = jobs;
        for (const dup of duplicates) {
          await supabase.from('batch_jobs').update({
            status: 'aborted',
            completed_at: new Date().toISOString(),
            error_message: 'Aborted as duplicate'
          }).eq('id', dup.id);
          aborted++;
        }
        console.log(`✅ Kept ${keep.id}, aborted ${duplicates.length} duplicates for ${jobType}`);
      }
    }
    
    return new Response(JSON.stringify({ success: true, aborted }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // Action: Recover stuck batches
  if (action === 'recover') {
    console.log('🔧 Recovering stuck batches...');
    
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    
    const { data: stuckBatches } = await supabase
      .from('batch_progress')
      .select('*, batch_jobs!inner(job_type, status)')
      .eq('status', 'processing')
      .lt('started_at', tenMinutesAgo);
    
    let recovered = 0;
    const affectedJobIds = new Set<string>();
    
    if (stuckBatches && stuckBatches.length > 0) {
      for (const batch of stuckBatches) {
        await supabase.from('batch_progress').update({
          status: 'pending',
          started_at: null,
          error_message: null
        }).eq('id', batch.id);
        
        affectedJobIds.add(batch.job_id);
        recovered++;
      }
      
      // Reset jobs to pending if needed
      for (const jobId of affectedJobIds) {
        await supabase.from('batch_jobs').update({
          status: 'pending'
        }).eq('id', jobId);
        
        // Kick off processing (non-blocking)
        const { data: job } = await supabase.from('batch_jobs').select('*').eq('id', jobId).single();
        if (job) {
          const task = ENRICHMENT_TASKS.find(t => t.functionName === job.job_type.replace('enrich_', 'enrich-'));
          if (task) {
            processNextBatch(supabase, jobId, task).catch(err => 
              console.error(`Failed to process after recovery for ${jobId}:`, err)
            );
          }
        }
      }
    }
    
    console.log(`✅ Recovered ${recovered} stuck batches across ${affectedJobIds.size} jobs`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      recovered_batches: recovered,
      affected_jobs: affectedJobIds.size
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (action === 'clear_all') {
    console.log('🧹 ADMIN PURGE: Clearing all jobs and batches...');
    
    try {
      // Step 1: Delete batch_progress (has foreign key to batch_jobs)
      const { count: progressCount, error: progressError } = await supabase
        .from('batch_progress')
        .delete()
        .gte('created_at', '1970-01-01')
        .select('*', { count: 'exact', head: true });
      
      if (progressError) {
        console.error('❌ Failed to delete batch_progress:', progressError);
        throw progressError;
      }
      
      console.log(`✅ Deleted ${progressCount || 0} batch_progress records`);
      
      // Step 2: Delete batch_jobs
      const { count: jobsCount, error: jobsError } = await supabase
        .from('batch_jobs')
        .delete()
        .gte('created_at', '1970-01-01')
        .select('*', { count: 'exact', head: true });
      
      if (jobsError) {
        console.error('❌ Failed to delete batch_jobs:', jobsError);
        throw jobsError;
      }
      
      console.log(`✅ Deleted ${jobsCount || 0} batch_jobs records`);
      
      // Step 3: Clear in-memory worker map
      activeWorkers.clear();
      console.log('✅ Cleared in-memory worker map');
      
      return new Response(JSON.stringify({
        success: true,
        purged: {
          jobs: jobsCount || 0,
          progress: progressCount || 0
        },
        worker_cleared: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('❌ Purge failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to purge jobs'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
  
  if (action === 'start') {
      // 🧹 STEP 1: Auto-cleanup old aborted/failed jobs before creating new ones
      console.log('🧹 Cleaning up old aborted/failed jobs...');
      const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
      
      const { error: cleanupError } = await supabase
        .from('batch_jobs')
        .update({ status: 'completed' })
        .in('status', ['aborted', 'failed'])
        .lt('created_at', oneHourAgo);
      
      if (cleanupError) {
        console.warn('⚠️ Cleanup warning:', cleanupError);
      } else {
        console.log('✅ Old jobs cleaned up');
      }

      let tasksToRun = ENRICHMENT_TASKS;
      if (phase) {
        tasksToRun = ENRICHMENT_TASKS.filter(t => t.priority === phase);
      }
      if (taskName) {
        tasksToRun = ENRICHMENT_TASKS.filter(t => t.name === taskName);
      }

      console.log(`🚀 Starting ${tasksToRun.length} enrichment tasks`);

      const jobIds: string[] = [];
      const jobTaskMap = new Map<string, EnrichmentTask>();

      for (const task of tasksToRun) {
        // Pre-flight validation: compare source vs target enriched counts
        const { count: totalCount } = await supabase
          .from(task.sourceTable)
          .select('*', { count: 'exact', head: true });
        
        // Count already-enriched records in TARGET table (by version)
        const { count: enrichedCount } = await supabase
          .from(task.targetTable)
          .select('*', { count: 'exact', head: true })
          .eq('enrichment_version', 'v1');

        const unenrichedCount = Math.max(0, (totalCount || 0) - (enrichedCount || 0));

        if (unenrichedCount <= 0) {
          console.log(`⏭️ Skipping ${task.name}: All ${totalCount || 0} records already enriched (${enrichedCount || 0} in ${task.targetTable})`);
          continue;
        }
        
        console.log(`📊 ${task.name}: ${unenrichedCount}/${totalCount || 0} records need enrichment`);
        const totalBatches = Math.ceil(unenrichedCount / task.batchSize);

        const { data: job, error: jobError } = await supabase
          .from('batch_jobs')
          .insert({
            job_type: `enrich_${task.sourceTable}`,
            status: 'pending',
            total_batches: totalBatches,
            metadata: {
              task_name: task.name,
              function_name: task.functionName,
              source_table: task.sourceTable,
              target_table: task.targetTable,
              batch_size: task.batchSize,
              priority: task.priority
            }
          })
          .select()
          .single();

        if (jobError) {
          console.error(`❌ Failed to create job for ${task.name}:`, jobError);
          continue;
        }

        console.log(`✅ Created job ${job.id} for ${task.name} (${totalBatches} batches)`);
        jobIds.push(job.id);
        jobTaskMap.set(job.id, task);

        for (let i = 0; i < totalBatches; i++) {
          await supabase
            .from('batch_progress')
            .insert({
              job_id: job.id,
              batch_number: i,
              total_items: Math.min(task.batchSize, Math.max(0, (unenrichedCount || 0) - (i * task.batchSize))),
              status: 'pending',
              data: {}
            });
        }
      }

      // 🔥 PHASE 2: Start long-running worker ONLY if jobs were created
      if (jobIds.length > 0) {
        console.log(`🚀 Starting continuous worker for ${jobIds.length} jobs`);
        
        // @ts-ignore - EdgeRuntime is available in Deno edge functions
        if (typeof EdgeRuntime !== 'undefined') {
          // @ts-ignore
          EdgeRuntime.waitUntil(
            continuousProcessor(supabase, jobIds, jobTaskMap).catch(err => {
              console.error('❌ Continuous processor failed:', err);
            })
          );
          console.log('✅ Long-running worker initiated with EdgeRuntime.waitUntil()');
        } else {
          console.warn('⚠️ EdgeRuntime not available, falling back to immediate processing');
          // Fallback for local testing
          jobIds.forEach(jobId => {
            const task = jobTaskMap.get(jobId);
            if (task) processNextBatch(supabase, jobId, task);
          });
        }
      } else {
        console.error('❌ No jobs created, worker not started. Check logs above for job creation errors.');
      }

      // Return immediately while worker continues in background
      return new Response(JSON.stringify({ 
        success: true,
        message: `Started ${tasksToRun.length} enrichment tasks with continuous worker`,
        tasks: tasksToRun.map(t => t.name),
        jobIds,
        worker_active: typeof EdgeRuntime !== 'undefined'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'test') {
      const testTasks = ENRICHMENT_TASKS.slice(0, 4).map((t, idx) => ({ 
        ...t, 
        batchSize: idx < 4 ? 20 : 10,
        test_mode: true 
      }));

      console.log(`🧪 Starting test mode: 100 documents`);

      const jobIds: string[] = [];

      for (const task of testTasks) {
        const { data: job } = await supabase
          .from('batch_jobs')
          .insert({
            job_type: `test_enrich_${task.sourceTable}`,
            status: 'pending',
            total_batches: 1,
            metadata: { ...task, test_mode: true }
          })
          .select()
          .single();

        jobIds.push(job.id);

        await supabase
          .from('batch_progress')
          .insert({
            job_id: job.id,
            batch_number: 0,
            total_items: task.batchSize,
            status: 'pending',
            data: {}
          });

        // Start processing in background (don't await)
        processNextBatch(supabase, job.id, task);
      }

      // Return immediately
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Test mode: Processing 100 documents',
        tasks: testTasks.map(t => t.name),
        jobIds
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'status') {
      const { data: jobs } = await supabase
        .from('batch_jobs')
        .select('*, batch_progress(*)')
        .in('job_type', ENRICHMENT_TASKS.map(t => `enrich_${t.sourceTable}`))
        .order('created_at', { ascending: false })
        .limit(20);

      return new Response(JSON.stringify({ 
        success: true,
        jobs: jobs || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'continue') {
      // WATCHDOG: Auto-recover stuck batches before continuing
      await autoRecoverStuckBatches(supabase);
      
      const { data: pendingJobs } = await supabase
        .from('batch_jobs')
        .select('*')
        .in('status', ['pending', 'processing'])
        .in('job_type', ENRICHMENT_TASKS.map(t => `enrich_${t.sourceTable}`));

      for (const job of pendingJobs || []) {
        const task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === job.job_type);
        if (task) {
          await processNextBatch(supabase, job.id, task);
        }
      }

      return new Response(JSON.stringify({ 
        success: true,
        message: `Continuing ${pendingJobs?.length || 0} jobs`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'recover') {
      console.log('🔄 Recovering stuck batches...');
      
      // Find batches stuck in processing for more than 10 minutes
      const { data: stuckBatches } = await supabase
        .from('batch_progress')
        .select('*, batch_jobs!inner(job_type)')
        .eq('status', 'processing')
        .lt('started_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());
      
      if (!stuckBatches || stuckBatches.length === 0) {
        return new Response(JSON.stringify({ 
          success: true,
          message: 'No stuck batches found',
          recovered: 0
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Reset stuck batches to pending
      const batchIds = stuckBatches.map(b => b.id);
      await supabase
        .from('batch_progress')
        .update({ 
          status: 'pending',
          started_at: null,
          error_message: null
        })
        .in('id', batchIds);
      
      // Get unique job IDs and restart them
      const jobIds = [...new Set(stuckBatches.map(b => b.job_id))];
      for (const jobId of jobIds) {
        await supabase
          .from('batch_jobs')
          .update({ status: 'pending' })
          .eq('id', jobId);
        
        const task = ENRICHMENT_TASKS.find(t => 
          stuckBatches.find(b => b.job_id === jobId)?.batch_jobs?.job_type === `enrich_${t.sourceTable}`
        );
        
        if (task) {
          processNextBatch(supabase, jobId, task);
        }
      }

      console.log(`✅ Recovered ${stuckBatches.length} stuck batches across ${jobIds.length} jobs`);
      
      return new Response(JSON.stringify({ 
        success: true,
        message: `Recovered ${stuckBatches.length} stuck batches`,
        recovered: stuckBatches.length,
        jobsRestarted: jobIds.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'restart' && phase === 1) {
      console.log('🔄 Restarting Phase 1...');
      
      // Abort existing Phase 1 jobs
      const phase1Tasks = ENRICHMENT_TASKS.filter(t => t.priority === 1);
      const jobTypes = phase1Tasks.map(t => `enrich_${t.sourceTable}`);
      
      await supabase
        .from('batch_jobs')
        .update({ 
          status: 'aborted',
          completed_at: new Date().toISOString()
        })
        .in('job_type', jobTypes)
        .in('status', ['pending', 'processing']);
      
      // Start fresh Phase 1 jobs
      const jobIds: string[] = [];
      for (const task of phase1Tasks) {
        const { count } = await supabase
          .from(task.sourceTable)
          .select('*', { count: 'exact', head: true });

        const totalBatches = Math.ceil((count || 0) / task.batchSize);

        const { data: job } = await supabase
          .from('batch_jobs')
          .insert({
            job_type: `enrich_${task.sourceTable}`,
            status: 'pending',
            total_batches: totalBatches,
            metadata: {
              task_name: task.name,
              function_name: task.functionName,
              source_table: task.sourceTable,
              target_table: task.targetTable,
              batch_size: task.batchSize,
              priority: task.priority
            }
          })
          .select()
          .single();

        if (job) {
          jobIds.push(job.id);
          
          for (let i = 0; i < totalBatches; i++) {
            await supabase
              .from('batch_progress')
              .insert({
                job_id: job.id,
                batch_number: i,
                total_items: Math.min(task.batchSize, (count || 0) - (i * task.batchSize)),
                status: 'pending',
                data: {}
              });
          }
          
          processNextBatch(supabase, job.id, task);
        }
      }

      console.log(`✅ Restarted Phase 1 with ${jobIds.length} new jobs`);
      
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Phase 1 restarted with fresh jobs',
        jobIds
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      error: 'Invalid action' 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Scheduler error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

/**
 * PHASE 2: Continuous Processing Loop
 * Keeps the edge function alive and processes batches until all work is complete
 */
async function continuousProcessor(
  supabase: any, 
  jobIds: string[], 
  jobTaskMap: Map<string, EnrichmentTask>
) {
  const workerId = crypto.randomUUID().substring(0, 8);
  activeWorkers.set(workerId, true);
  
  console.log(`🔄 Worker ${workerId} started for ${jobIds.length} jobs`);
  
  let cycles = 0;
  let lastWatchdogCheck = Date.now();
  
  while (activeWorkers.has(workerId)) {
    cycles++;
    
    // PHASE 3: Run watchdog every 5 minutes
    if (Date.now() - lastWatchdogCheck > 5 * 60 * 1000) {
      const recovered = await autoRecoverStuckBatches(supabase);
      if (recovered > 0) {
        console.log(`🔧 Watchdog recovered ${recovered} stuck batches`);
      }
      lastWatchdogCheck = Date.now();
    }
    
    // Check for pending work across all jobs
    const { data: pendingBatches } = await supabase
      .from('batch_progress')
      .select('job_id, status')
      .in('job_id', jobIds)
      .in('status', ['pending', 'processing']);
    
    const hasPendingWork = pendingBatches && pendingBatches.length > 0;
    
    if (!hasPendingWork) {
      console.log(`✅ Worker ${workerId} complete: All ${jobIds.length} jobs finished (${cycles} cycles)`);
      activeWorkers.delete(workerId);
      break;
    }
    
    // Process jobs sequentially (one batch at a time across all jobs)
    // This prevents overwhelming the system and ensures proper batch completion
    for (const jobId of jobIds) {
      const task = jobTaskMap.get(jobId);
      if (!task) continue;
      
      // Check if this job has pending work
      const { data: pendingBatch } = await supabase
        .from('batch_progress')
        .select('id')
        .eq('job_id', jobId)
        .eq('status', 'pending')
        .limit(1)
        .single();
      
      if (pendingBatch) {
        try {
          await processNextBatch(supabase, jobId, task);
        } catch (error) {
          console.error(`❌ Worker ${workerId} error processing job ${jobId}:`, error);
        }
      }
    }
    
    // Brief pause between processing rounds
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Log heartbeat every 10 cycles (~20 seconds)
    if (cycles % 10 === 0) {
      console.log(`💓 Worker ${workerId} heartbeat: Cycle ${cycles}, ${pendingBatches?.length || 0} pending batches`);
    }
  }
  
  console.log(`🛑 Worker ${workerId} terminated after ${cycles} cycles`);
}

/**
 * Wait for a batch to complete processing
 */
async function waitForBatchCompletion(
  supabase: any,
  batchId: string,
  batchNumber: number,
  maxWaitMinutes: number = 10
): Promise<'completed' | 'failed' | 'timeout'> {
  const startTime = Date.now();
  const maxWaitMs = maxWaitMinutes * 60 * 1000;
  
  // Initial wait for background function to start processing
  console.log(`⏰ Waiting for batch ${batchNumber} to complete...`);
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds initial wait
  
  // Poll every 15 seconds until completion
  while (Date.now() - startTime < maxWaitMs) {
    const { data: batchStatus } = await supabase
      .from('batch_progress')
      .select('status, items_processed, data')
      .eq('id', batchId)
      .single();
    
    if (!batchStatus) {
      console.error(`❌ Batch ${batchNumber} not found in database`);
      return 'failed';
    }
    
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    
    if (batchStatus.status === 'completed') {
      console.log(`✅ Batch ${batchNumber} completed after ${elapsed}s`);
      return 'completed';
    }
    
    if (batchStatus.status === 'failed') {
      console.error(`❌ Batch ${batchNumber} failed after ${elapsed}s`);
      return 'failed';
    }
    
    // Still processing, log progress
    const processed = batchStatus.items_processed || 0;
    console.log(`⏳ Batch ${batchNumber} still processing... ${elapsed}s elapsed (${processed} items)`);
    
    // Wait 15 seconds before next check
    await new Promise(resolve => setTimeout(resolve, 15000));
  }
  
  console.warn(`⏱️ Batch ${batchNumber} timed out after ${maxWaitMinutes} minutes`);
  return 'timeout';
}

/**
 * Process a single batch (PHASE 3: Enhanced error handling)
 */
async function processNextBatch(supabase: any, jobId: string, task: EnrichmentTask) {
  // PHASE 3: Ghost lock detection before processing
  const { data: ghostLocks } = await supabase
    .from('batch_progress')
    .select('id, batch_number')
    .eq('job_id', jobId)
    .eq('status', 'processing')
    .is('started_at', null);
  
  if (ghostLocks && ghostLocks.length > 0) {
    console.warn(`⚠️ Detected ${ghostLocks.length} ghost locks for job ${jobId}, clearing...`);
    await supabase
      .from('batch_progress')
      .update({ status: 'pending', started_at: null, error_message: 'Ghost lock cleared' })
      .in('id', ghostLocks.map((b: any) => b.id));
  }
  
  const { data: batch } = await supabase
    .from('batch_progress')
    .select('*')
    .eq('job_id', jobId)
    .eq('status', 'pending')
    .order('batch_number')
    .limit(1)
    .single();

  if (!batch) {
    await supabase
      .from('batch_jobs')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        progress_percentage: 100
      })
      .eq('id', jobId);
    
    console.log(`✅ Job ${jobId} completed`);
    return;
  }

  await supabase
    .from('batch_progress')
    .update({ 
      status: 'processing',
      started_at: new Date().toISOString()
    })
    .eq('id', batch.id);

  await supabase
    .from('batch_jobs')
    .update({ 
      status: 'processing',
      current_batch: batch.batch_number,
      started_at: new Date().toISOString()
    })
    .eq('id', jobId);

  try {
    let response;
    let invokeError;
    
    // PHASE 3: Extended retry with exponential backoff (5 retries, up to 30s delay)
    for (let attempt = 0; attempt < 5; attempt++) {
      response = await supabase.functions.invoke(task.functionName, {
        body: {
          batchSize: task.batchSize,
          startFrom: batch.batch_number * task.batchSize,
          jobId: jobId
        }
      });
      
      // Just check if it started successfully (fire-and-forget)
      if (!response.error && response.data?.success) {
        console.log(`✅ Batch ${batch.batch_number} started successfully`);
        break;
      }
      
      invokeError = response.error;
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.warn(`⚠️ Invoke attempt ${attempt + 1}/5 failed for ${task.functionName} (retry in ${delay}ms):`, response.error);
      
      if (attempt < 4) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (invokeError) throw invokeError;
    
    // Wait for batch to actually complete in background (with timeout)
    const completionStatus = await waitForBatchCompletion(supabase, batch.id, batch.batch_number, 10);
    
    if (completionStatus === 'timeout') {
      console.warn(`⏱️ Batch ${batch.batch_number} timed out, marking as failed`);
      await supabase
        .from('batch_progress')
        .update({ 
          status: 'failed',
          error_message: 'Batch processing timed out after 10 minutes',
          completed_at: new Date().toISOString()
        })
        .eq('id', batch.id);
    }

    const { data: allBatches } = await supabase
      .from('batch_progress')
      .select('status')
      .eq('job_id', jobId);

    const completedCount = allBatches?.filter(b => b.status === 'completed').length || 0;
    const totalCount = allBatches?.length || 1;
    const progress = Math.round((completedCount / totalCount) * 100);

    await supabase
      .from('batch_jobs')
      .update({ 
        completed_batches: completedCount,
        progress_percentage: progress
      })
      .eq('id', jobId);

    console.log(`✅ Batch ${batch.batch_number} completed (${progress}% overall)`);

    // ⚠️ DO NOT recursively call processNextBatch here!
    // The continuousProcessor loop handles calling processNextBatch for all jobs

  } catch (error: any) {
    console.error(`❌ Batch ${batch.batch_number} (job ${jobId}) failed:`, error);
    
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'failed',
        error_message: error.message || String(error),
        completed_at: new Date().toISOString()
      })
      .eq('id', batch.id);

    const { data: job } = await supabase
      .from('batch_jobs')
      .select('failed_batches')
      .eq('id', jobId)
      .single();

    await supabase
      .from('batch_jobs')
      .update({ 
        failed_batches: (job?.failed_batches || 0) + 1,
        error_message: error.message || String(error)
      })
      .eq('id', jobId);
    
    // ⚠️ DO NOT recursively call processNextBatch here!
    // The continuousProcessor loop will pick up the next batch
    console.log(`↪️ Batch failed, continuousProcessor will retry next batch...`);
  }
}
