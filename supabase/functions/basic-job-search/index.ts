
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REEDJOB API');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, location } = await req.json();
    console.log('🔍 Basic job search for:', { query, location });
    
    if (!reedApiKey) {
      console.error('❌ Reed API key not found');
      return new Response(
        JSON.stringify({ 
          error: "Job search service not configured",
          jobs: [],
          totalFound: 0
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Search Reed Jobs only (skip Adzuna for now since it's failing)
    const jobs = await searchReedJobs(query, location);
    
    console.log(`✅ Found ${jobs.length} jobs from Reed`);
    
    return new Response(
      JSON.stringify({ 
        jobs: jobs.slice(0, 20), // Limit to 20 results
        totalFound: jobs.length,
        sources: ['Reed']
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('💥 Error in basic job search:', error);
    return new Response(
      JSON.stringify({ 
        error: "Search failed. Please try again.",
        jobs: [],
        totalFound: 0
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function searchReedJobs(query: string, location: string) {
  if (!reedApiKey) {
    console.log('🚫 Reed API key not available');
    return [];
  }
  
  try {
    const params = new URLSearchParams({
      keywords: query,
      location: location || 'UK',
      resultsToTake: '20'
    });
    
    const apiUrl = `https://www.reed.co.uk/api/1.0/search?${params}`;
    console.log('🏢 Reed API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Basic ${btoa(reedApiKey + ':')}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Reed API error: ${response.status} ${response.statusText}`);
      console.error('Reed API error response:', errorText);
      return [];
    }
    
    const data = await response.json();
    console.log(`📊 Reed API returned ${data.totalResults} total results, processing ${data.results?.length || 0} jobs`);
    
    if (!data.results || data.results.length === 0) {
      console.log('📭 No results from Reed API');
      return [];
    }
    
    return data.results.map((job: any) => ({
      id: `reed-${job.jobId}`,
      title: job.jobTitle,
      company: job.employerName,
      location: job.locationName,
      salary: job.minimumSalary && job.maximumSalary ? 
        `£${job.minimumSalary.toLocaleString()} - £${job.maximumSalary.toLocaleString()}` : 
        job.minimumSalary ? `£${job.minimumSalary.toLocaleString()}+` : null,
      type: job.fullTime ? 'Full-time' : job.partTime ? 'Part-time' : 'Contract',
      description: job.jobDescription || 'No description available',
      external_url: job.jobUrl,
      posted_date: job.date,
      source: 'Reed'
    }));
  } catch (error) {
    console.error('❌ Reed search failed:', error);
    return [];
  }
}
