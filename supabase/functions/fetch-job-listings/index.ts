import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);
    
    logger.info('📋 Fetch job listings started');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new ValidationError('Supabase credentials not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the live job aggregator to get fresh job data with retry and timeout
    logger.info('Calling live job aggregator');
    const { data: aggregatedData, error: aggregatorError } = await withTimeout(
      withRetry(
        () => supabase.functions.invoke('live-job-aggregator', {
          body: {
            keywords: 'electrician electrical maintenance installation',
            location: 'UK',
            page: 1
          }
        }),
        RetryPresets.STANDARD
      ),
      Timeouts.LONG,
      'job aggregator invocation'
    );

    if (aggregatorError) {
      logger.error('Aggregator error', { error: aggregatorError });
      throw new Error(`Job aggregation failed: ${aggregatorError.message}`);
    }

    logger.info('Aggregated jobs received', { count: aggregatedData?.jobs?.length || 0 });

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
    logger.info('Cleaning up old job listings');
    const { error: deleteError } = await withTimeout(
      supabase
        .from('job_listings')
        .delete()
        .lt('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
      Timeouts.QUICK,
      'old jobs cleanup'
    );

    if (deleteError) {
      logger.error('Error cleaning old jobs', { error: deleteError });
    }

    // Transform and insert new jobs
    const jobsToInsert = aggregatedData.jobs.map((job: any) => ({
      title: job.title || 'Electrician Position',
      company: job.company || 'Unknown Company',
      image_url: job.imageUrl || "",
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

    logger.info('Inserting new jobs', { count: jobsToInsert.length });
    
    const { data: insertedJobs, error: insertError } = await withTimeout(
      supabase
        .from('job_listings')
        .upsert(jobsToInsert, { 
          onConflict: 'title,company',
          ignoreDuplicates: false 
        })
        .select('count'),
      Timeouts.STANDARD,
      'job listings upsert'
    );

    if (insertError) {
      logger.error('Insert error', { error: insertError });
      throw new Error(`Failed to store jobs: ${insertError.message}`);
    }

    // Get total count after insert with timeout
    const { count: totalJobs } = await withTimeout(
      supabase
        .from('job_listings')
        .select('*', { count: 'exact', head: true }),
      Timeouts.QUICK,
      'total jobs count'
    );

    logger.info('Successfully stored jobs', { 
      newJobs: jobsToInsert.length, 
      totalInDatabase: totalJobs 
    });

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
    return handleError(error);
  }
});
