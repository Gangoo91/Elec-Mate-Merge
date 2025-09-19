import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[FETCH-JOB-LISTINGS] Starting job fetch process');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Call the live job aggregator to get fresh job data
    console.log('[FETCH-JOB-LISTINGS] Calling live job aggregator');
    const { data: aggregatedData, error: aggregatorError } = await supabase.functions.invoke('live-job-aggregator', {
      body: {
        keywords: 'electrician electrical maintenance installation',
        location: 'UK',
        page: 1
      }
    });

    if (aggregatorError) {
      console.error('[FETCH-JOB-LISTINGS] Aggregator error:', aggregatorError);
      throw new Error(`Job aggregation failed: ${aggregatorError.message}`);
    }

    console.log('[FETCH-JOB-LISTINGS] Aggregated jobs received:', aggregatedData?.jobs?.length || 0);

    if (!aggregatedData?.jobs || aggregatedData.jobs.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No new jobs found',
          jobCount: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear existing jobs that are older than 24 hours to keep data fresh
    console.log('[FETCH-JOB-LISTINGS] Cleaning up old job listings');
    const { error: deleteError } = await supabase
      .from('job_listings')
      .delete()
      .lt('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (deleteError) {
      console.error('[FETCH-JOB-LISTINGS] Error cleaning old jobs:', deleteError);
    }

    // Transform and insert new jobs
    const jobsToInsert = aggregatedData.jobs.map((job: any) => ({
      title: job.title || 'Electrician Position',
      company: job.company || 'Unknown Company',
      location: job.location || 'UK',
      salary: job.salary || 'Competitive',
      type: job.type || 'Full-time',
      description: job.description || job.summary || 'Job description not available',
      external_url: job.apply_url || job.url || '#',
      posted_date: job.posted_date || new Date().toISOString(),
      source: job.source || 'aggregated',
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      is_remote: job.is_remote || false,
      count: 1
    }));

    console.log('[FETCH-JOB-LISTINGS] Inserting', jobsToInsert.length, 'new jobs');
    
    const { data: insertedJobs, error: insertError } = await supabase
      .from('job_listings')
      .upsert(jobsToInsert, { 
        onConflict: 'title,company',
        ignoreDuplicates: false 
      })
      .select('count');

    if (insertError) {
      console.error('[FETCH-JOB-LISTINGS] Insert error:', insertError);
      throw new Error(`Failed to store jobs: ${insertError.message}`);
    }

    // Get total count after insert
    const { count: totalJobs } = await supabase
      .from('job_listings')
      .select('*', { count: 'exact', head: true });

    console.log('[FETCH-JOB-LISTINGS] Successfully stored', jobsToInsert.length, 'jobs. Total in database:', totalJobs);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully fetched and stored ${jobsToInsert.length} job listings`,
        jobCount: totalJobs,
        sources: aggregatedData.sources || {},
        newJobs: jobsToInsert.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[FETCH-JOB-LISTINGS] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred',
        message: 'Failed to fetch job listings'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
