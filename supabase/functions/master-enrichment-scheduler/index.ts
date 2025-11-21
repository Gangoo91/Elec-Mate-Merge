import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { autoRecoverStuckBatches } from './watchdog.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper: Fetch all regulation_number with pagination (avoids 1000-row truncation)
async function fetchAllRegNumbers(
  supabase: ReturnType<typeof createClient>,
  table: string,
  opts?: { neqGeneral?: boolean; enrichmentV1?: boolean }
): Promise<string[]> {
  const pageSize = 1000;
  let offset = 0;
  const regs = new Set<string>();
  let pages = 0;

  while (true) {
    let query = supabase.from(table).select('regulation_number').range(offset, offset + pageSize - 1);

    if (opts?.neqGeneral) {
      query = query.neq('regulation_number', 'General');
    }
    if (opts?.enrichmentV1) {
      query = query.eq('enrichment_version', 'v1');
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) break;

    pages++;
    for (const row of data) {
      const rn = row.regulation_number?.trim();
      if (rn) regs.add(rn);
    }

    if (data.length < pageSize) break; // last page reached
    offset += pageSize;
  }

  const result = Array.from(regs).sort();
  console.log(`📄 Fetched ${table} in ${pages} page(s) → ${result.length} unique regulations`);
  return result;
}

// Helper: Fetch all practical_work IDs with pagination
async function fetchAllPracticalWorkIds(
  supabase: ReturnType<typeof createClient>,
  table: string,
  opts?: { canonicalOnly?: boolean; enriched?: boolean }
): Promise<string[]> {
  const pageSize = 1000;
  let offset = 0;
  const ids = new Set<string>();
  let pages = 0;

  while (true) {
    let query = supabase.from(table).select(
      opts?.enriched ? 'practical_work_id' : 'id'
    ).range(offset, offset + pageSize - 1);

    if (opts?.canonicalOnly) {
      query = query.eq('is_canonical', true);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) break;

    pages++;
    for (const row of data) {
      const id = opts?.enriched ? row.practical_work_id?.trim() : row.id?.trim();
      if (id) ids.add(id);
    }

    if (data.length < pageSize) break;
    offset += pageSize;
  }

  const result = Array.from(ids).sort();
  console.log(`📄 Fetched ${table} in ${pages} page(s) → ${result.length} unique IDs`);
  return result;
}

interface EnrichmentTask {
  name: string;
  functionName: string;
  sourceTable: string;
  targetTable: string;
  batchSize: number;
  priority: number;
  workerCount?: number; // Optional worker count override (defaults to 6)
  filter?: any;
  facetType?: string;
}

const ENRICHMENT_TASKS: EnrichmentTask[] = [
  // Phase 1: Core Knowledge Bases (Priority 1) - OPTIMIZED BATCH SIZES
  { name: 'BS 7671 Intelligence', functionName: 'enrich-regulations', sourceTable: 'bs7671_embeddings', targetTable: 'regulations_intelligence', batchSize: 20, priority: 1, workerCount: 2 },
  { name: 'Health & Safety Knowledge', functionName: 'enrich-health-safety', sourceTable: 'health_safety_knowledge', targetTable: 'health_safety_intelligence', batchSize: 15, priority: 1, workerCount: 6 },
  { name: 'Installation Procedures', functionName: 'enrich-installation-procedures', sourceTable: 'installation_knowledge', targetTable: 'installation_procedures', batchSize: 20, priority: 1, workerCount: 6 },
  
  // Phase 2: Specialized Domains (Priority 2)
  { name: 'Inspection Procedures', functionName: 'enrich-inspection-procedures', sourceTable: 'inspection_testing_knowledge', targetTable: 'inspection_procedures', batchSize: 30, priority: 2, workerCount: 6 },
  { name: 'Maintenance Schedules', functionName: 'enrich-maintenance-schedules', sourceTable: 'maintenance_knowledge', targetTable: 'maintenance_schedules', batchSize: 30, priority: 2, workerCount: 6 },
  { name: 'Project Templates', functionName: 'enrich-project-templates', sourceTable: 'project_mgmt_knowledge', targetTable: 'project_templates', batchSize: 30, priority: 2, workerCount: 6 },
  
  // Phase 3: Pricing Intelligence (Priority 3)
  { name: 'Pricing Intelligence', functionName: 'enrich-pricing-intelligence', sourceTable: 'pricing_embeddings', targetTable: 'pricing_intelligence', batchSize: 10, priority: 3, workerCount: 6 },
  
  // Phase 4: Practical Work Unified Enrichment (Priority 4) - ✅ 12-item batches, 10 concurrent workers (8 facets/source)
  { name: 'Practical Work', functionName: 'enrich-practical-work', sourceTable: 'practical_work', targetTable: 'practical_work_intelligence', batchSize: 12, priority: 4, filter: { is_canonical: true }, workerCount: 10 },
  
  // Phase 5: Design Knowledge Enrichment (Priority 1) - 12-item batches, 10 workers, 8 facets/source
  { name: 'Design Knowledge', functionName: 'enrich-design-knowledge', sourceTable: 'design_knowledge', targetTable: 'design_knowledge_intelligence', batchSize: 12, priority: 1, filter: null, workerCount: 10 },
];

// Global worker state tracking
const activeWorkers = new Map<string, { workerId: string; timestamp: Date }>();

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
    const { 
      action = 'start', 
      phase, 
      taskName, 
      scope = 'all', 
      jobType, 
      createIfMissing = false, 
      missingRegulations = null,
      forceNewJob = false,
      regulationNumbers = null,
      chunkSize = 10,
      workers = 6
    } = await req.json();
    
    console.log(`🎯 Master Enrichment Scheduler: ${action}${scope === 'single' ? ` (SINGLE: ${jobType})` : ''}${missingRegulations ? ` [${missingRegulations.length} missing regs]` : ''}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

  // Action: Dedupe duplicate batch_progress rows
  if (action === 'dedupe_batches') {
    console.log('🧹 Deduplicating batch_progress rows...');
    
    const { data: activeJobs } = await supabase
      .from('batch_jobs')
      .select('id, job_type, total_batches')
      .in('status', ['pending', 'processing', 'completed']);
    
    let totalDuplicatesRemoved = 0;
    let jobsAffected = 0;
    
    for (const job of activeJobs || []) {
      // Find duplicate batch_progress rows for this job
      const { data: allBatches } = await supabase
        .from('batch_progress')
        .select('*')
        .eq('job_id', job.id)
        .order('created_at', { ascending: true });
      
      if (!allBatches || allBatches.length === 0) continue;
      
      // Group by batch_number
      const batchesByNumber = new Map<number, any[]>();
      allBatches.forEach(batch => {
        const num = batch.batch_number;
        if (!batchesByNumber.has(num)) batchesByNumber.set(num, []);
        batchesByNumber.get(num)!.push(batch);
      });
      
      // Find and remove duplicates
      let jobDuplicates = 0;
      for (const [batchNum, batches] of batchesByNumber.entries()) {
        if (batches.length > 1) {
          // Keep the canonical row (earliest created or completed one)
          const keep = batches.find(b => b.status === 'completed') || batches[0];
          const duplicates = batches.filter(b => b.id !== keep.id);
          
          for (const dup of duplicates) {
            await supabase.from('batch_progress').delete().eq('id', dup.id);
            jobDuplicates++;
            totalDuplicatesRemoved++;
          }
          
          console.log(`✅ Job ${job.job_type}, batch ${batchNum}: Kept ${keep.id}, removed ${duplicates.length} duplicates`);
        }
      }
      
      if (jobDuplicates > 0) {
        jobsAffected++;
        
        // Recalculate progress from job.total_batches
        const { data: remainingBatches } = await supabase
          .from('batch_progress')
          .select('status')
          .eq('job_id', job.id);
        
        const completedCount = remainingBatches?.filter(b => b.status === 'completed').length || 0;
        const progress = Math.round((completedCount / job.total_batches) * 100);
        
        await supabase.from('batch_jobs').update({
          completed_batches: completedCount,
          progress_percentage: progress
        }).eq('id', job.id);
        
        console.log(`📊 Job ${job.job_type}: Recalculated progress to ${progress}% (${completedCount}/${job.total_batches})`);
      }
    }
    
    console.log(`✅ Dedupe complete: Removed ${totalDuplicatesRemoved} duplicates across ${jobsAffected} jobs`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      duplicates_removed: totalDuplicatesRemoved,
      jobs_affected: jobsAffected
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
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
    
    const threeMinutesAgo = new Date(Date.now() - 4.5 * 60 * 1000).toISOString(); // ✅ Increased to 4.5 minutes
    
    const { data: stuckBatches } = await supabase
      .from('batch_progress')
      .select('*, batch_jobs!inner(job_type, status)')
      .eq('status', 'processing')
      .lt('started_at', threeMinutesAgo);
    
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
  
  // Action: Abort all active jobs
  if (action === 'abort_all') {
    console.log('🛑 Aborting all active jobs...');
    
    try {
      // Mark all active jobs as aborted
      const { data: activeJobs, error: queryError } = await supabase
        .from('batch_jobs')
        .select('id, job_type')
        .in('status', ['pending', 'processing']);
      
      if (queryError) throw queryError;
      
      let jobsAborted = 0;
      let batchesCancelled = 0;
      
      for (const job of activeJobs || []) {
        // Mark job as aborted
        await supabase
          .from('batch_jobs')
          .update({
            status: 'aborted',
            completed_at: new Date().toISOString(),
            error_message: 'Aborted by user via abort_all'
          })
          .eq('id', job.id);
        
        // Cancel pending batches
        const { count } = await supabase
          .from('batch_progress')
          .delete()
          .eq('job_id', job.id)
          .in('status', ['pending', 'processing'])
          .select('*', { count: 'exact', head: true });
        
        jobsAborted++;
        batchesCancelled += count || 0;
        
        console.log(`✅ Aborted job ${job.job_type}, cancelled ${count || 0} batches`);
      }
      
      // Clear in-memory worker map
      activeWorkers.clear();
      
      return new Response(JSON.stringify({
        success: true,
        jobs_aborted: jobsAborted,
        batches_cancelled: batchesCancelled
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('❌ Abort failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to abort jobs'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
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
  
  // NEW ACTION: compute_missing - Calculate missing regulations without creating job
  if (action === 'compute_missing') {
    console.log('📊 COMPUTE MISSING: Calculating missing regulations for BS 7671...');
    
    try {
      // Use paginated fetch to get ALL regulations (not truncated at 1000)
      const uniqueSourceRegs = await fetchAllRegNumbers(supabase, 'bs7671_embeddings', { neqGeneral: true });
      const uniqueEnrichedRegs = await fetchAllRegNumbers(supabase, 'regulations_intelligence', { enrichmentV1: true });
      
      const enrichedSet = new Set(uniqueEnrichedRegs);
      const missingRegulations = uniqueSourceRegs.filter(reg => !enrichedSet.has(reg));
      
      console.log(`📊 SOURCE REGS: ${uniqueSourceRegs.length} unique | ENRICHED: ${uniqueEnrichedRegs.length} | MISSING: ${missingRegulations.length}`);
      
      return new Response(JSON.stringify({
        success: true,
        total_unique: uniqueSourceRegs.length,
        enriched_unique: uniqueEnrichedRegs.length,
        missing_count: missingRegulations.length,
        sample: missingRegulations.slice(0, 10),
        suggested_batch_size: 5,
        suggested_workers: 6
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('❌ Compute missing failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to compute missing regulations'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }

  // NEW ACTION: compute_missing_practical_work - Calculate missing practical work procedures
  if (action === 'compute_missing_practical_work') {
    console.log('📊 COMPUTE MISSING: Calculating missing procedures for Practical Work...');
    
    try {
      const sourceIds = await fetchAllPracticalWorkIds(supabase, 'practical_work', { canonicalOnly: true });
      const enrichedIds = await fetchAllPracticalWorkIds(supabase, 'practical_work_intelligence', { enriched: true });
      
      const enrichedSet = new Set(enrichedIds);
      const missingIds = sourceIds.filter(id => !enrichedSet.has(id));
      
      console.log(`📊 SOURCE PROCEDURES: ${sourceIds.length} unique | ENRICHED: ${enrichedIds.length} | MISSING: ${missingIds.length}`);
      
      return new Response(JSON.stringify({
        success: true,
        total_unique: sourceIds.length,
        enriched_unique: enrichedIds.length,
        missing_count: missingIds.length,
        sample: missingIds.slice(0, 10),
        suggested_batch_size: 12,
        suggested_workers: 50
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('❌ Compute missing practical work failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to compute missing procedures'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }

  // NEW ACTION: start_missing - Server-side missing regulations detection and job creation
  if (action === 'start_missing') {
    console.log('🔍 SERVER-SIDE MISSING DETECTION: Computing missing regulations for BS 7671...');
    
    try {
      // Use paginated fetch to get ALL regulations (not truncated at 1000)
      const uniqueSourceRegs = await fetchAllRegNumbers(supabase, 'bs7671_embeddings', { neqGeneral: true });
      const uniqueEnrichedRegs = await fetchAllRegNumbers(supabase, 'regulations_intelligence', { enrichmentV1: true });
      
      const enrichedSet = new Set(uniqueEnrichedRegs);
      const missingRegulations = uniqueSourceRegs.filter(reg => !enrichedSet.has(reg));
      
      console.log(`📊 SOURCE REGS: ${uniqueSourceRegs.length} unique | ENRICHED: ${uniqueEnrichedRegs.length} | MISSING: ${missingRegulations.length}`);
      
      if (missingRegulations.length === 0) {
        console.log('✅ No missing regulations found - all enriched');
        return new Response(JSON.stringify({
          success: true,
          message: 'All regulations already enriched',
          missing_count: 0
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      console.log(`🎯 Found ${missingRegulations.length} missing regulations`);
      
      // ✅ NUCLEAR: Ultra-conservative settings for final 25 regulations
      console.log('⚙️ NUCLEAR MODE: batchSize=2, workers=2, throttle=3s');
      
      // Abort existing jobs
      const { data: existingJobs } = await supabase
        .from('batch_jobs')
        .select('id')
        .eq('job_type', 'enrich_bs7671_embeddings')
        .in('status', ['pending', 'processing']);
      
      for (const job of existingJobs || []) {
        await supabase
          .from('batch_jobs')
          .update({
            status: 'aborted',
            completed_at: new Date().toISOString(),
            error_message: 'Aborted to start fresh missing-regs job'
          })
          .eq('id', job.id);
        
        await supabase
          .from('batch_progress')
          .delete()
          .eq('job_id', job.id);
      }
      
      // Create new job with missing regulations list (NUCLEAR MODE)
      const batchSize = chunkSize || 2; // ✅ NUCLEAR: Reduced from 10 to 2
      const totalBatches = Math.ceil(missingRegulations.length / batchSize);
      
      const { data: newJob, error: jobError } = await supabase
        .from('batch_jobs')
        .insert({
          job_type: 'enrich_bs7671_embeddings',
          status: 'processing',
          total_batches: totalBatches,
          metadata: {
            source: 'start_missing',
            missingRegulations: missingRegulations,
            batchSize: batchSize,
            workers: workers || 2, // ✅ NUCLEAR: Reduced from 6 to 2
            throttle_ms: 3000 // ✅ NUCLEAR: 3-second delay between workers
          }
        })
        .select()
        .single();
      
      if (jobError || !newJob) {
        throw new Error('Failed to create missing-regs job');
      }
      
      // Create batches with regulation_number scoping
      const batches = [];
      for (let i = 0; i < missingRegulations.length; i += batchSize) {
        const chunk = missingRegulations.slice(i, i + batchSize);
        batches.push({
          job_id: newJob.id,
          batch_number: Math.floor(i / batchSize),
          status: 'pending',
          data: {
            regulations: chunk,
            startIndex: i
          }
        });
      }
      
      const { error: batchError } = await supabase
        .from('batch_progress')
        .insert(batches);
      
      if (batchError) {
        throw new Error('Failed to create batches');
      }
      
      console.log(`✅ Created job ${newJob.id} with ${batches.length} batches`);
      
      // ✅ FIX: Start continuous worker to ensure progress tracking
      const taskMap = new Map<string, EnrichmentTask>();
      taskMap.set(newJob.id, {
        name: 'BS 7671 Intelligence',
        functionName: 'enrich-regulations',
        sourceTable: 'bs7671_embeddings',
        targetTable: 'regulations_intelligence',
        batchSize: batchSize,
        priority: 1
      });
      
      EdgeRuntime.waitUntil(
        continuousProcessor(supabase, [newJob.id], taskMap)
      );
      
      console.log(`🔄 Started continuous worker for job ${newJob.id}`);
      
      return new Response(JSON.stringify({
        success: true,
        message: `Started missing-regs job for ${missingRegulations.length} regulations`,
        jobId: newJob.id,
        batchesCreated: batches.length,
        missing_count: missingRegulations.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    } catch (error: any) {
      console.error('❌ start_missing failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to start missing-regs job'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }

  // NEW ACTION: start_missing_practical_work - Create job for missing practical work procedures
  if (action === 'start_missing_practical_work') {
    console.log('🔍 START MISSING: Creating job for missing Practical Work procedures...');
    
    try {
      const sourceIds = await fetchAllPracticalWorkIds(supabase, 'practical_work', { canonicalOnly: true });
      const enrichedIds = await fetchAllPracticalWorkIds(supabase, 'practical_work_intelligence', { enriched: true });
      
      const enrichedSet = new Set(enrichedIds);
      const missingIds = sourceIds.filter(id => !enrichedSet.has(id));
      
      console.log(`📊 Missing: ${missingIds.length} procedures`);
      
      if (missingIds.length === 0) {
        return new Response(JSON.stringify({
          success: true,
          missing_count: 0,
          message: 'All procedures already enriched'
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
      }
      
      // Abort any existing practical work jobs
      await supabase.from('batch_jobs')
        .update({ status: 'aborted', completed_at: new Date().toISOString() })
        .eq('job_type', 'enrich_practical_work')
        .in('status', ['pending', 'processing']);
      
      // Create new job
      const batchSize = chunkSize || 12;
      const workerCount = workers || 50;
      const totalBatches = Math.ceil(missingIds.length / batchSize);
      
      const { data: newJob, error: jobError } = await supabase
        .from('batch_jobs')
        .insert({
          job_type: 'enrich_practical_work',
          status: 'pending',
          total_batches: totalBatches,
          completed_batches: 0,
          metadata: {
            source: 'start_missing',
            missingIds,
            batchSize,
            workers: workerCount,
            throttle_ms: 500
          }
        })
        .select()
        .single();
      
      if (jobError) throw jobError;
      
      // Create batch records
      const batches = [];
      for (let i = 0; i < totalBatches; i++) {
        const batchIds = missingIds.slice(i * batchSize, (i + 1) * batchSize);
        batches.push({
          job_id: newJob.id,
          batch_number: i + 1,
          status: 'pending',
          data: { practicalWorkIds: batchIds }
        });
      }
      
      await supabase.from('batch_progress').insert(batches);
      
      // Start continuous processor
      const task = ENRICHMENT_TASKS.find(t => t.functionName === 'enrich-practical-work');
      if (task) {
        for (let w = 0; w < workerCount; w++) {
          processNextBatch(supabase, newJob.id, task).catch(err =>
            console.error(`Worker ${w} startup failed:`, err)
          );
        }
      }
      
      return new Response(JSON.stringify({
        success: true,
        jobId: newJob.id,
        missing_count: missingIds.length,
        batchesCreated: totalBatches,
        workers: workerCount
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
      
    } catch (error: any) {
      console.error('❌ start_missing_practical_work failed:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to start missing practical work job'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
  
  if (action === 'start') {
      // NEW: Force new job mode - abort existing and create fresh batches
      if (forceNewJob && regulationNumbers && Array.isArray(regulationNumbers)) {
        console.log(`🆕 FORCE NEW JOB: Creating fresh run for ${regulationNumbers.length} regulations`);
        
        // Abort any active jobs for BS 7671
        const { data: existingJobs } = await supabase
          .from('batch_jobs')
          .select('id')
          .eq('job_type', 'enrich_bs7671_embeddings')
          .in('status', ['pending', 'processing']);
        
        for (const job of existingJobs || []) {
          await supabase
            .from('batch_jobs')
            .update({
              status: 'aborted',
              completed_at: new Date().toISOString(),
              error_message: 'Aborted to start fresh job'
            })
            .eq('id', job.id);
          
          // Delete pending batches for this job
          await supabase
            .from('batch_progress')
            .delete()
            .eq('job_id', job.id);
        }
        
        // Create new job with batches scoped to regulation list (NUCLEAR MODE)
        const batchSize = 2; // ✅ NUCLEAR: Hardcoded to 2 for stability
        const totalBatches = Math.ceil(regulationNumbers.length / batchSize);
        
        const { data: newJob, error: jobError } = await supabase
          .from('batch_jobs')
          .insert({
            job_type: 'enrich_bs7671_embeddings',
            status: 'processing',
            total_batches: totalBatches,
            metadata: {
              source: 'missing_regs',
              missingRegulations: regulationNumbers, // ✅ Primary key for worker
              regulationNumbers: regulationNumbers,  // ✅ Compatibility key
              batchSize: batchSize,
              workers: 2, // ✅ NUCLEAR: Reduced from variable to fixed 2
              throttle_ms: 3000 // ✅ NUCLEAR: 3-second delay between workers
            }
          })
          .select()
          .single();
        
        if (jobError || !newJob) {
          console.error('❌ Failed to create new job:', jobError);
          return new Response(JSON.stringify({
            success: false,
            error: 'Failed to create new job'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        // Create batches for this job
        const batches = [];
        for (let i = 0; i < regulationNumbers.length; i += batchSize) {
          const chunk = regulationNumbers.slice(i, i + batchSize);
          batches.push({
            job_id: newJob.id,
            batch_number: Math.floor(i / batchSize),
            status: 'pending',
            data: {
              regulations: chunk,
              startIndex: i
            }
          });
        }
        
        const { error: batchError } = await supabase
          .from('batch_progress')
          .insert(batches);
        
        if (batchError) {
          console.error('❌ Failed to create batches:', batchError);
          return new Response(JSON.stringify({
            success: false,
            error: 'Failed to create batches'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        console.log(`✅ Created job ${newJob.id} with ${batches.length} batches`);
        
        // Launch workers
        const workersStarted = Math.min(workers, batches.length);
        for (let i = 0; i < workersStarted; i++) {
          supabase.functions.invoke('enrich-regulations', {
            body: {
              jobId: newJob.id,
              batchSize: batchSize,
              startFrom: 0
            }
          }).catch(err => console.error(`Worker ${i} failed:`, err));
        }
        
        return new Response(JSON.stringify({
          success: true,
          jobId: newJob.id,
          batchesCreated: batches.length,
          workersStarted: workersStarted,
          regulations: regulationNumbers.length
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
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

      // 🔓 STEP 2: Auto-detect and reset ghost locks (jobs stuck in "processing" for >10 min)
      console.log('🔓 Checking for ghost locks...');
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      
      const { data: ghostLockedJobs } = await supabase
        .from('batch_jobs')
        .select('id, job_type, updated_at')
        .eq('status', 'processing')
        .lt('updated_at', tenMinutesAgo);
      
      if (ghostLockedJobs && ghostLockedJobs.length > 0) {
        console.log(`🔧 Ghost lock detected on ${ghostLockedJobs.length} job(s), auto-resetting...`);
        
        for (const job of ghostLockedJobs) {
          await supabase
            .from('batch_jobs')
            .update({ status: 'pending' })
            .eq('id', job.id);
          
          // Also reset any stuck batches for this job
          await supabase
            .from('batch_progress')
            .update({ status: 'pending', started_at: null, error_message: null })
            .eq('job_id', job.id)
            .eq('status', 'processing');
          
          console.log(`✅ Reset ghost lock for ${job.job_type} (last updated: ${job.updated_at})`);
        }
      } else {
        console.log('✅ No ghost locks detected');
      }

      // SINGLE SCOPE MODE: Only start the specified job type
      let tasksToRun = ENRICHMENT_TASKS;
      let jobTypesToStart: string[] = [];
      
      if (scope === 'single' && jobType) {
        // Find the specific task by jobType
        // Support both patterns:
        // 1. Legacy: 'enrich_${sourceTable}' (e.g., 'enrich_bs7671_embeddings')
        // 2. New: hyphenated function names (e.g., 'enrich-practical-installation')
        let task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === jobType);
        
        // If not found and jobType contains hyphens, try matching against functionName
        if (!task && jobType.includes('-')) {
          task = ENRICHMENT_TASKS.find(t => t.functionName === jobType);
        }
        
        if (task) {
          tasksToRun = [task];
          jobTypesToStart = [jobType];
          console.log(`🎯 SINGLE SCOPE: Starting only ${task.name} (${jobType})`);
        } else {
          console.error(`❌ Job type '${jobType}' not found in ENRICHMENT_TASKS`);
          return new Response(JSON.stringify({ 
            success: false, 
            error: `Invalid job type: ${jobType}` 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } else {
        // ALL SCOPE MODE (original behaviour)
        if (phase) {
          tasksToRun = ENRICHMENT_TASKS.filter(t => t.priority === phase);
        }
        if (taskName) {
          tasksToRun = ENRICHMENT_TASKS.filter(t => t.name === taskName);
        }
        jobTypesToStart = tasksToRun.map(t => `enrich_${t.sourceTable}`);
      }

      console.log(`🚀 Starting ${tasksToRun.length} enrichment task${tasksToRun.length !== 1 ? 's' : ''} (scope: ${scope})`);

      // Check for existing pending/processing jobs for the specified types
      const { data: existingJobs } = await supabase
        .from('batch_jobs')
        .select('*')
        .in('status', ['pending', 'processing'])
        .in('job_type', jobTypesToStart);

      const jobIds: string[] = [];
      const jobTaskMap = new Map<string, EnrichmentTask>();

      // If single scope and job exists, resume it instead of creating new one
      if (scope === 'single' && existingJobs && existingJobs.length > 0) {
        console.log(`🔄 SINGLE SCOPE: Found existing job, resuming instead of creating new one`);
        for (const job of existingJobs) {
          const task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === job.job_type);
          if (task) {
            jobIds.push(job.id);
            jobTaskMap.set(job.id, task);
          }
        }
      } else {
        // Create new jobs for tasks that don't have existing jobs
        const existingJobTypes = existingJobs?.map(j => j.job_type) || [];
        const tasksToCreate = tasksToRun.filter(t => !existingJobTypes.includes(`enrich_${t.sourceTable}`));

        for (const task of tasksToCreate) {
        // Pre-flight validation: Count DISTINCT source records, not facet rows
        const { count: totalCount } = await supabase
          .from(task.sourceTable)
          .select('*', { count: 'exact', head: true });
        
        // For BS 7671: Count DISTINCT regulation_id already enriched (not total facet rows)
        // For others: Use appropriate source FK (knowledge_id, pricing_id, etc.)
        const sourceFk = task.sourceTable === 'bs7671_embeddings' ? 'regulation_id' : 'source_id';
        
        const { data: enrichedData } = await supabase
          .from(task.targetTable)
          .select(sourceFk)
          .eq('enrichment_version', 'v1');
        
        // Count unique source records
        const uniqueEnrichedSources = new Set(
          (enrichedData || []).map((row: any) => row[sourceFk]).filter(Boolean)
        );
        
        const distinctEnriched = uniqueEnrichedSources.size;
        const unenrichedCount = Math.max(0, (totalCount || 0) - distinctEnriched);

        if (unenrichedCount <= 0) {
          console.log(`⏭️ Skipping ${task.name}: All ${totalCount || 0} source records already enriched (${distinctEnriched} distinct sources in ${task.targetTable})`);
          continue;
        }
        
        console.log(`📊 ${task.name}: ${unenrichedCount}/${totalCount || 0} source records need enrichment (${distinctEnriched} already enriched)`);
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
              priority: task.priority,
              missingRegulations: missingRegulations || null // Store filter list in job metadata
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
        const itemsInBatch = Math.min(task.batchSize, Math.max(0, (unenrichedCount || 0) - (i * task.batchSize)));
        
        // Use upsert to prevent duplicate batch_progress rows
        await supabase
          .from('batch_progress')
          .upsert({
            job_id: job.id,
            batch_number: i,
            total_items: itemsInBatch,
            status: 'pending',
            data: {
              batch_number: i,
              total_batches: totalBatches,
              items_in_batch: itemsInBatch,
              task_name: task.name,
              source_table: task.sourceTable
            }
          }, {
            onConflict: 'job_id,batch_number',
            ignoreDuplicates: false
          });
      }
        }
      }

      // 🔥 PHASE 2: Start long-running worker if jobs were created OR if existing jobs need resuming
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
      } else if (existingJobs && existingJobs.length > 0) {
        // RESILIENCE FIX: Even if no new jobs created, resume existing pending/processing jobs
        console.log(`🔄 No new jobs created, but resuming ${existingJobs.length} existing jobs with worker pool`);
        const resumeJobIds = existingJobs.map(j => j.id);
        const resumeJobTaskMap = new Map<string, EnrichmentTask>();
        existingJobs.forEach(job => {
          const task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === job.job_type);
          if (task) resumeJobTaskMap.set(job.id, task);
        });
        
        // @ts-ignore - EdgeRuntime is available in Deno edge functions
        if (typeof EdgeRuntime !== 'undefined') {
          // @ts-ignore
          EdgeRuntime.waitUntil(
            continuousProcessor(supabase, resumeJobIds, resumeJobTaskMap).catch(err => {
              console.error('❌ Continuous processor failed:', err);
            })
          );
          console.log('✅ Long-running worker initiated for existing jobs with EdgeRuntime.waitUntil()');
        } else {
          console.warn('⚠️ EdgeRuntime not available, falling back to immediate processing');
          resumeJobIds.forEach(jobId => {
            const task = resumeJobTaskMap.get(jobId);
            if (task) processNextBatch(supabase, jobId, task);
          });
        }
      } else {
        console.error('❌ No jobs to process. Check logs above for job creation errors.');
      }

      // Return immediately while worker continues in background
      return new Response(JSON.stringify({ 
        success: true,
        message: scope === 'single' 
          ? `Started single task: ${tasksToRun[0]?.name}` 
          : `Started ${tasksToRun.length} enrichment tasks with continuous worker`,
        tasks: tasksToRun.map(t => t.name),
        jobIds,
        scope,
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
      // WATCHDOG: Auto-recover stuck batches before continuing (use 3-minute threshold)
      const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000).toISOString();
      
      const { data: stuckBatchesForRecovery } = await supabase
        .from('batch_progress')
        .select('id, job_id, batch_number')
        .eq('status', 'processing')
        .lt('started_at', threeMinutesAgo);
      
      if (stuckBatchesForRecovery && stuckBatchesForRecovery.length > 0) {
        console.log(`🔧 Auto-recovering ${stuckBatchesForRecovery.length} stuck batches (>3 min)...`);
        await supabase
          .from('batch_progress')
          .update({ status: 'pending', started_at: null, error_message: null })
          .in('id', stuckBatchesForRecovery.map((b: any) => b.id));
      }
      
      // Support scope filtering for continue action
      let jobTypesToContinue = ENRICHMENT_TASKS.map(t => `enrich_${t.sourceTable}`);
      if (scope === 'single' && jobType) {
        jobTypesToContinue = [jobType];
      }
      
      const { data: pendingJobs } = await supabase
        .from('batch_jobs')
        .select('*')
        .in('status', ['pending', 'processing'])
        .in('job_type', jobTypesToContinue);

      // If no pending jobs but work remains, auto-start
      if (!pendingJobs || pendingJobs.length === 0) {
        if (scope === 'single' && jobType && createIfMissing) {
          console.log('🔄 Continue: No pending jobs found, checking for remaining work...');
          
          const task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === jobType);
          if (!task) {
            return new Response(JSON.stringify({ 
              success: false,
              error: `Invalid job type: ${jobType}`
            }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          
          // Check remaining work using distinct source count
          const { count: totalCount } = await supabase
            .from(task.sourceTable)
            .select('*', { count: 'exact', head: true });
          
          const sourceFk = task.sourceTable === 'bs7671_embeddings' ? 'regulation_id' : 'source_id';
          const { data: enrichedData } = await supabase
            .from(task.targetTable)
            .select(sourceFk)
            .eq('enrichment_version', 'v1');
          
          const uniqueEnrichedSources = new Set(
            (enrichedData || []).map((row: any) => row[sourceFk]).filter(Boolean)
          );
          
          const remaining = Math.max(0, (totalCount || 0) - uniqueEnrichedSources.size);
          
          if (remaining > 0) {
            console.log(`🚀 Auto-starting fresh batches for ${remaining} remaining source records`);
            // Recursively call start action
            const startReq = new Request(req.url, {
              method: 'POST',
              headers: req.headers,
              body: JSON.stringify({ action: 'start', scope: 'single', jobType })
            });
            return serve(startReq as any);
          }
        }
        
        return new Response(JSON.stringify({ 
          success: true,
          message: 'No pending jobs to continue',
          auto_started: false
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // RESILIENCE FIX: Launch continuous worker pool for all pending jobs
      const jobIds = pendingJobs.map(j => j.id);
      const jobTaskMap = new Map<string, EnrichmentTask>();
      
      for (const job of pendingJobs) {
        const task = ENRICHMENT_TASKS.find(t => `enrich_${t.sourceTable}` === job.job_type);
        if (task) {
          jobTaskMap.set(job.id, task);
          // Also trigger immediate processing for faster startup
          processNextBatch(supabase, job.id, task).catch(err => 
            console.error(`Failed immediate processing for ${job.id}:`, err)
          );
        }
      }

      // Launch continuous worker pool to keep processing after request ends
      console.log(`🚀 Continue: Starting continuous worker for ${jobIds.length} jobs`);
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
        console.warn('⚠️ EdgeRuntime not available');
      }

      return new Response(JSON.stringify({ 
        success: true,
        message: `Continuing ${pendingJobs.length} jobs with continuous worker`,
        jobIds,
        worker_active: typeof EdgeRuntime !== 'undefined'
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
  activeWorkers.set(workerId, { workerId, timestamp: new Date() });
  
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
    
    // Clean up stale worker registrations (>5 min old)
    const now = Date.now();
    for (const [jId, info] of activeWorkers.entries()) {
      if (now - info.timestamp.getTime() > 5 * 60 * 1000) {
        activeWorkers.delete(jId);
        console.log(`🧹 Cleared stale worker registration for ${jId}`);
      }
    }
    
    for (const jobId of jobIds) {
      const task = jobTaskMap.get(jobId);
      if (!task) continue;
      
      // Check if workers are already active for this job
      if (activeWorkers.has(jobId)) {
        console.log(`⏭️ Workers already active for job ${jobId}, skipping spawn`);
        continue;
      }
      
      // Check if this job has pending work
      const { data: hasPending } = await supabase
        .from('batch_progress')
        .select('id')
        .eq('job_id', jobId)
        .eq('status', 'pending')
        .limit(1)
        .single();
      
      if (!hasPending) continue;
      
      // Register this job's workers
      activeWorkers.set(jobId, { workerId: `job-${jobId}`, timestamp: new Date() });
      
      // Process batches in parallel with configurable worker pool per task
      const PARALLEL_WORKERS = task.workerCount || 6; // ✅ Use task-specific worker count (defaults to 6)
      
      console.log(`🚀 Starting ${PARALLEL_WORKERS} parallel workers for job ${jobId}`);
      
      // Worker function that processes batches until none remain
      async function batchWorker(batchWorkerId: number): Promise<void> {
        let processedCount = 0;
        
        while (true) {
          try {
            // Check if there are pending batches
            const { data: pending } = await supabase
              .from('batch_progress')
              .select('id')
              .eq('job_id', jobId)
              .eq('status', 'pending')
              .limit(1)
              .single();
            
            if (!pending) {
              if (processedCount > 0) {
                console.log(`✅ Batch worker ${batchWorkerId} finished (processed ${processedCount} batches)`);
              }
              break;
            }
            
            // Process next batch
            await processNextBatch(supabase, jobId, task);
            processedCount++;
            
            // Add 500ms inter-batch delay to reduce gateway pressure
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (error) {
            // No more batches or error - exit gracefully
            if (processedCount > 0) {
              console.log(`✅ Batch worker ${batchWorkerId} finished (processed ${processedCount} batches)`);
            }
            break;
          }
        }
      }
      
      // Launch parallel workers with throttle
      const workers = [];
      for (let i = 0; i < PARALLEL_WORKERS; i++) {
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, task.throttle_ms || 1500));
          console.log(`⏱️ Worker ${i + 1} starting after ${task.throttle_ms || 1500}ms throttle`);
        }
        workers.push(batchWorker(i + 1));
      }
      
      // Wait for all workers to complete
      await Promise.allSettled(workers);
      
      // Clean up worker registration
      activeWorkers.delete(jobId);
      console.log(`✅ All ${PARALLEL_WORKERS} workers completed for job ${jobId}, registry cleared`);
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
  maxWaitMinutes: number = 20
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
  
  // Atomic batch claiming: Select pending batch
  const { data: batch } = await supabase
    .from('batch_progress')
    .select('*')
    .eq('job_id', jobId)
    .eq('status', 'pending')
    .order('batch_number')
    .limit(1)
    .single();

  if (!batch) {
    // Only mark as completed if there are no processing batches either
    const { data: processingBatches } = await supabase
      .from('batch_progress')
      .select('id')
      .eq('job_id', jobId)
      .eq('status', 'processing')
      .limit(1);
    
    if (!processingBatches || processingBatches.length === 0) {
      await supabase
        .from('batch_jobs')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString(),
          progress_percentage: 100
        })
        .eq('id', jobId);
      
      console.log(`✅ Job ${jobId} completed (all batches done)`);
    } else {
      console.log(`⏸️ Job ${jobId}: No pending batches, but ${processingBatches.length} still processing`);
    }
    
    return;
  }

  // ATOMIC CLAIM: Try to claim batch with status guard (prevents race conditions)
  const workerId = crypto.randomUUID().substring(0, 8);
  const { data: claimedBatch, error: claimError } = await supabase
    .from('batch_progress')
    .update({ 
      status: 'processing',
      started_at: new Date().toISOString(),
      data: { 
        ...(batch.data || {}),
        claimed_by: workerId,
        claim_time: new Date().toISOString()
      }
    })
    .eq('id', batch.id)
    .eq('status', 'pending') // Guard: only claim if still pending
    .select()
    .single();
  
  // If claim failed, another worker claimed it first
  if (claimError || !claimedBatch) {
    console.log(`🔄 Batch ${batch.batch_number} claimed by another worker, skipping`);
    return;
  }
  
  console.log(`🔒 Worker ${workerId} claimed batch ${batch.batch_number}`);

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
    
    // Reduced retry with exponential backoff + jitter (3 attempts, 2-8s delays)
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await supabase.functions.invoke(task.functionName, {
        body: {
          batchSize: task.batchSize,
          startFrom: batch.batch_number * task.batchSize,
          jobId: jobId,
          batchId: batch.id // ✅ Pass batchId for monitoring
        }
      });
      
      // Just check if it started successfully (fire-and-forget)
      if (!response.error && response.data?.success) {
        console.log(`✅ Batch ${batch.batch_number} started successfully`);
        break;
      }
      
      invokeError = response.error;
      const baseDelay = 2000 * Math.pow(2, attempt); // 2s, 4s, 8s
      const jitter = Math.random() * 1000; // 0-1s jitter
      const delay = Math.min(baseDelay + jitter, 10000);
      console.warn(`⚠️ Invoke attempt ${attempt + 1}/3 failed for ${task.functionName} (retry in ${Math.round(delay)}ms):`, response.error);
      
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (invokeError) throw invokeError;
    
    // Wait for batch to actually complete in background (with timeout - increased to 20 min)
    const completionStatus = await waitForBatchCompletion(supabase, batch.id, batch.batch_number, 20);
    
    if (completionStatus === 'timeout') {
      console.warn(`⏱️ Batch ${batch.batch_number} timed out, marking as failed`);
      await supabase
        .from('batch_progress')
        .update({ 
          status: 'failed',
          error_message: 'Batch processing timed out after 20 minutes',
          completed_at: new Date().toISOString()
        })
        .eq('id', batch.id);
    }

    // Use job.total_batches as denominator (not count of batch_progress rows)
    const { data: job } = await supabase
      .from('batch_jobs')
      .select('total_batches')
      .eq('id', jobId)
      .single();
    
    const { data: allBatches } = await supabase
      .from('batch_progress')
      .select('status')
      .eq('job_id', jobId);

    const completedCount = allBatches?.filter(b => b.status === 'completed').length || 0;
    const totalBatches = job?.total_batches || allBatches?.length || 1;
    const progress = Math.round((completedCount / totalBatches) * 100);

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
