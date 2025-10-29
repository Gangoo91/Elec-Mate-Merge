import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { checkRAMSCache, storeRAMSCache } from '../_shared/rams-cache.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  let jobId: string | null = null;
  
  try {
    const body = await req.json();
    jobId = body.jobId;
    console.log(`📋 Processing RAMS job: ${jobId}`);

    // Get job details
    const { data: job, error: fetchError } = await supabase
      .from('rams_generation_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // ✅ QUICK WIN #3: Check cache first (instant response for common jobs)
    console.log('🔍 Checking semantic cache before generation...');
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const cacheResult = await checkRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      openAiKey: OPENAI_API_KEY
    });
    
    if (cacheResult.hit && cacheResult.data) {
      // Return cached result immediately (<1s response!)
      console.log('🎉 Cache HIT - serving instant result');
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Completed (served from cache)',
          rams_data: cacheResult.data.rams_data,
          method_data: cacheResult.data.method_data,
          completed_at: new Date().toISOString(),
          generation_metadata: { 
            cache_hit: true,
            similarity: cacheResult.data.similarity,
            cache_hit_count: cacheResult.data.hit_count
          }
        })
        .eq('id', jobId);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          jobId,
          cached: true,
          similarity: cacheResult.data.similarity
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('❌ Cache miss - proceeding with full generation');
    
    // Mark as processing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        current_step: 'Analysing job description and identifying potential hazards...',
        progress: 5
      })
      .eq('id', jobId);

    // Update: Starting health & safety analysis
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        current_step: `Evaluating risks for ${job.job_scale} installation work...`,
        progress: 10
      })
      .eq('id', jobId);

    console.log(`🔍 Calling health-safety-v3 for job: ${jobId}`);

    // Start heartbeat to show progress while H&S runs (15%, 20%, 25%, 30%, 35%)
    let heartbeatProgress = 15;
    const heartbeatInterval = setInterval(async () => {
      if (heartbeatProgress <= 35) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: heartbeatProgress,
            current_step: 'Analysing risks and generating control measures...'
          })
          .eq('id', jobId);
        heartbeatProgress += 5;
      }
    }, 15000); // Every 15 seconds

    let hsData, hsError;
    
    try {
      // Call health-safety-v3 with 180s timeout (function needs ~120s)
      const hsPromise = supabase.functions.invoke('health-safety-v3', {
        body: {
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        }
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Health-safety agent timeout after 180s')), 180000)
      );
      
      const result = await Promise.race([hsPromise, timeoutPromise]) as any;
      hsData = result.data;
      hsError = result.error;

      // Clear heartbeat once H&S completes
      clearInterval(heartbeatInterval);

      if (hsError || !hsData) {
        throw new Error(`Health-safety agent failed: ${hsError?.message ?? 'Unknown error'}`);
      }
      console.log(`✅ Health-safety completed for job: ${jobId}`);

      // Update progress
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: 40,
          current_step: 'Generating safety controls and PPE requirements...',
          raw_hs_response: hsData
        })
        .eq('id', jobId);
    } catch (error) {
      clearInterval(heartbeatInterval);
      throw error;
    }

    // Update: Starting method statement
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 50,
        current_step: 'Creating detailed step-by-step installation method...'
      })
      .eq('id', jobId);

    console.log(`🔧 Calling installer-v3 for job: ${jobId}`);

    // Call installer-v3 with 180s timeout
    const installerPromise = supabase.functions.invoke('installer-v3', {
      body: {
        query: job.job_description,
        userContext: { jobScale: job.job_scale },
        projectContext: job.project_info
      }
    });
    
    const installerTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Installer agent timeout after 240s')), 240000)
    );
    
    const installerResult = await Promise.race([installerPromise, installerTimeoutPromise]) as any;
    const installerData = installerResult.data;
    const installerError = installerResult.error;

    if (installerError || !installerData) {
      throw new Error(`Installer agent failed: ${installerError?.message ?? 'Unknown error'}`);
    }
    console.log(`✅ Installer completed for job: ${jobId}`);

    // Update: Finalizing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 85,
        current_step: 'Linking hazards to installation steps...'
      })
      .eq('id', jobId);

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 95,
        current_step: 'Finalising documentation formatting...'
      })
      .eq('id', jobId);

    // ✅ QUICK WIN #3: Store in cache for future reuse
    console.log('💾 Storing result in semantic cache...');
    await storeRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      ramsData: hsData.data,
      methodData: installerData.data,
      openAiKey: OPENAI_API_KEY
    });
    
    // Mark complete
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: '✨ Generation complete!',
        rams_data: hsData.data,
        method_data: installerData.data,
        raw_installer_response: installerData,
        completed_at: new Date().toISOString(),
        generation_metadata: {
          hs_timing: hsData.timing,
          installer_timing: installerData.timing,
          cache_hit: false
        }
      })
      .eq('id', jobId);

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Job processing failed:', error);
    
    // jobId already extracted at top of try block
    if (jobId) {
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
