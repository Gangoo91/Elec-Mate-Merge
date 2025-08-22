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
    const searchParams = { keywords, location, page };
    
    // Fetch from all job sources in parallel
    const promises = [
      supabase.functions.invoke('reed-job-listings', { body: searchParams }),
      supabase.functions.invoke('indeed-job-listings', { body: searchParams }),
      supabase.functions.invoke('totaljobs-job-listings', { body: searchParams }),
      supabase.functions.invoke('cvlibrary-job-listings', { body: searchParams }),
      supabase.functions.invoke('jobscouk-job-listings', { body: searchParams })
    ];

    const results = await Promise.allSettled(promises);
    
    // Process results from each source
    const sourceResults = [];
    const allJobs = [];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const sources = ['Reed', 'Indeed', 'TotalJobs', 'CV Library', 'Jobs.co.uk'];
      const sourceName = sources[i];
      
      if (result.status === 'fulfilled' && result.value.data) {
        const { jobs = [], total = 0 } = result.value.data;
        sourceResults.push({
          source: sourceName,
          jobCount: jobs.length,
          success: true,
          error: null
        });
        allJobs.push(...jobs);
        console.log(`✅ ${sourceName}: ${jobs.length} jobs`);
      } else {
        const error = result.status === 'rejected' ? result.reason?.message : 'Unknown error';
        sourceResults.push({
          source: sourceName,
          jobCount: 0,
          success: false,
          error
        });
        console.log(`❌ ${sourceName}: ${error}`);
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