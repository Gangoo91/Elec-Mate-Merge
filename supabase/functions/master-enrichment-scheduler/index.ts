import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

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
  // Phase 1: Core Knowledge Bases (Priority 1) - REDUCED TO 25 ITEMS PER BATCH
  { name: 'BS 7671 Intelligence', functionName: 'enrich-regulations', sourceTable: 'bs7671_embeddings', targetTable: 'regulations_intelligence', batchSize: 25, priority: 1 },
  { name: 'Health & Safety Knowledge', functionName: 'enrich-health-safety', sourceTable: 'health_safety_knowledge', targetTable: 'health_safety_knowledge', batchSize: 25, priority: 1 },
  { name: 'Installation Procedures', functionName: 'enrich-installation-procedures', sourceTable: 'installation_knowledge', targetTable: 'installation_procedures', batchSize: 25, priority: 1 },
  { name: 'Design Patterns', functionName: 'enrich-design-patterns', sourceTable: 'design_knowledge', targetTable: 'design_patterns_structured', batchSize: 25, priority: 1 },
  
  // Phase 2: Specialized Domains (Priority 2)
  { name: 'Inspection Procedures', functionName: 'enrich-inspection-procedures', sourceTable: 'inspection_testing_knowledge', targetTable: 'inspection_procedures', batchSize: 50, priority: 2 },
  { name: 'Maintenance Schedules', functionName: 'enrich-maintenance-schedules', sourceTable: 'maintenance_knowledge', targetTable: 'maintenance_schedules', batchSize: 50, priority: 2 },
  { name: 'Project Templates', functionName: 'enrich-project-templates', sourceTable: 'project_mgmt_knowledge', targetTable: 'project_templates', batchSize: 50, priority: 2 },
  
  // Phase 3: Pricing Intelligence (Priority 3)
  { name: 'Pricing Intelligence', functionName: 'enrich-pricing-intelligence', sourceTable: 'pricing_embeddings', targetTable: 'pricing_intelligence', batchSize: 100, priority: 3 },
];

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
  
  if (action === 'start') {
      let tasksToRun = ENRICHMENT_TASKS;
      if (phase) {
        tasksToRun = ENRICHMENT_TASKS.filter(t => t.priority === phase);
      }
      if (taskName) {
        tasksToRun = ENRICHMENT_TASKS.filter(t => t.name === taskName);
      }

      console.log(`🚀 Starting ${tasksToRun.length} enrichment tasks`);

      const jobIds: string[] = [];

      for (const task of tasksToRun) {
        const { count } = await supabase
          .from(task.sourceTable)
          .select('*', { count: 'exact', head: true });

        const totalBatches = Math.ceil((count || 0) / task.batchSize);

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

        // Start processing in background (don't await)
        processNextBatch(supabase, job.id, task);
      }

      // Return immediately
      return new Response(JSON.stringify({ 
        success: true,
        message: `Started ${tasksToRun.length} enrichment tasks`,
        tasks: tasksToRun.map(t => t.name),
        jobIds
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

async function processNextBatch(supabase: any, jobId: string, task: EnrichmentTask) {
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
    
    // Retry invoke up to 2 times
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await supabase.functions.invoke(task.functionName, {
        body: {
          batchSize: task.batchSize,
          startFrom: batch.batch_number * task.batchSize,
          jobId: jobId
        }
      });
      
      if (!response.error) break;
      
      invokeError = response.error;
      console.warn(`⚠️ Invoke attempt ${attempt + 1}/3 failed for ${task.functionName}:`, response.error);
      
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }

    if (invokeError) throw invokeError;

    await supabase
      .from('batch_progress')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        items_processed: batch.total_items
      })
      .eq('id', batch.id);

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

    await processNextBatch(supabase, jobId, task);

  } catch (error) {
    console.error(`❌ Batch ${batch.batch_number} (job ${jobId}) failed:`, error);
    
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'failed',
        error_message: error.message,
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
        error_message: error.message
      })
      .eq('id', jobId);
    
    // Continue to next batch despite failure
    console.log(`↪️ Continuing to next batch despite failure...`);
    await processNextBatch(supabase, jobId, task);
  }
}
