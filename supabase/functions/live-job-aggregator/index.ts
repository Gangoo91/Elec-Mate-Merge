import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, location = "United Kingdom", page = 1 } = await req.json();
    
    console.log(`Starting live job aggregation for: ${keywords} in ${location}`);
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Define sources with individual timeouts
    const sources = [
      { name: 'reed-job-listings', displayName: 'Reed', timeout: 15000 },
      { name: 'indeed-job-listings', displayName: 'Indeed', timeout: 20000 },
      { name: 'totaljobs-job-listings', displayName: 'TotalJobs', timeout: 30000 },
      { name: 'cvlibrary-job-listings', displayName: 'CV Library', timeout: 20000 },
      { name: 'jobscouk-job-listings', displayName: 'Jobs.co.uk', timeout: 20000 }
    ];

    const allJobs: any[] = [];
    const sourceResults: any[] = [];

    // Process each source with individual timeout handling
    const sourcePromises = sources.map(async ({ name, displayName, timeout }) => {
      try {
        console.log(`🔍 Fetching from ${displayName}...`);
        
        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        );
        
        // Race between actual request and timeout
        const result = await Promise.race([
          supabase.functions.invoke(name, {
            body: { keywords, location, page }
          }),
          timeoutPromise
        ]);
        
        const { data, error } = result as any;
        
        if (error) {
          console.log(`❌ ${displayName}: ${error.message}`);
          return {
            source: displayName,
            jobCount: 0,
            success: false,
            error: error.message
          };
        }
        
        const jobs = data?.jobs || [];
        console.log(`✅ ${displayName}: ${jobs.length} jobs`);
        
        return {
          source: displayName,
          jobCount: jobs.length,
          success: true,
          error: null,
          jobs
        };
        
      } catch (error) {
        if (error instanceof Error && error.message === 'Timeout') {
          console.log(`⏱️ ${displayName}: Request timed out after ${timeout}ms`);
          return {
            source: displayName,
            jobCount: 0,
            success: false,
            error: `Timed out after ${timeout/1000}s`
          };
        } else {
          console.log(`❌ ${displayName}: Unknown error`);
          return {
            source: displayName,
            jobCount: 0,
            success: false,
            error: 'Unknown error'
          };
        }
      }
    });

    // Wait for all sources to complete (with their individual timeouts)
    const results = await Promise.allSettled(sourcePromises);
    
    // Process results
    for (const result of results) {
      if (result.status === 'fulfilled') {
        const sourceResult = result.value;
        sourceResults.push({
          source: sourceResult.source,
          jobCount: sourceResult.jobCount,
          success: sourceResult.success,
          error: sourceResult.error
        });
        
        if (sourceResult.jobs) {
          allJobs.push(...sourceResult.jobs);
        }
      }
    }

    // Remove duplicates based on title + company
    const uniqueJobs = removeDuplicates(allJobs);
    
    // Sort by posted date (newest first)
    uniqueJobs.sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());

    const summary = {
      totalJobs: uniqueJobs.length,
      originalJobs: allJobs.length,
      duplicatesRemoved: allJobs.length - uniqueJobs.length,
      sourceBreakdown: sourceResults,
      searchCriteria: { keywords, location, page }
    };

    console.log(`📊 Aggregation complete: ${uniqueJobs.length} unique jobs from ${sourceResults.filter(s => s.success).length} sources`);

    return new Response(JSON.stringify({
      jobs: uniqueJobs,
      total: uniqueJobs.length,
      page,
      summary,
      sourceResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in live job aggregator:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      jobs: [],
      total: 0,
      page: 1,
      summary: null,
      sourceResults: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function removeDuplicates(jobs: any[]) {
  const seen = new Set();
  return jobs.filter(job => {
    const key = `${job.title?.toLowerCase().trim()}-${job.company?.toLowerCase().trim()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}