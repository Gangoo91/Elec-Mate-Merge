
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REEDJOB_API');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, location, filters } = await req.json();
    console.log('Starting job search for:', { query, location, filters });
    
    const allJobs = [];
    
    // Search Reed Jobs only (remove Adzuna for now to simplify)
    if (reedApiKey) {
      try {
        const reedJobs = await searchReedJobs(query, location, filters);
        allJobs.push(...reedJobs);
        console.log(`Found ${reedJobs.length} jobs from Reed`);
      } catch (error) {
        console.warn('Reed search failed:', error.message);
      }
    }
    
    // Deduplicate jobs
    const uniqueJobs = deduplicateJobs(allJobs);
    console.log(`Found ${allJobs.length} total jobs, ${uniqueJobs.length} unique`);
    
    // Sort by date (most recent first)
    uniqueJobs.sort((a, b) => {
      return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
    });
    
    return new Response(
      JSON.stringify({ 
        jobs: uniqueJobs.slice(0, 50),
        totalFound: uniqueJobs.length,
        searchQueries: [query],
        sources: reedApiKey ? ['Reed'] : []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in job search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        jobs: [],
        totalFound: 0
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function searchReedJobs(query: string, location: string, filters: any) {
  if (!reedApiKey) return [];
  
  const params = new URLSearchParams({
    keywords: query,
    location: location || 'United Kingdom',
    resultsToTake: '50'
  });
  
  // Add job type filter if specified
  if (filters.jobType === 'full-time') {
    params.append('fullTime', 'true');
  } else if (filters.jobType === 'part-time') {
    params.append('partTime', 'true');
  } else if (filters.jobType === 'contract') {
    params.append('temp', 'true');
  }
  
  const response = await fetch(`https://www.reed.co.uk/api/1.0/search?${params}`, {
    headers: {
      'Authorization': `Basic ${btoa(reedApiKey + ':')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Reed API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return (data.results || []).map((job: any) => ({
    id: `reed-${job.jobId}`,
    title: job.jobTitle,
    company: job.employerName,
    location: job.locationName,
    salary: job.minimumSalary && job.maximumSalary ? 
      `£${job.minimumSalary.toLocaleString()} - £${job.maximumSalary.toLocaleString()}` : 
      job.minimumSalary ? `£${job.minimumSalary.toLocaleString()}+` : null,
    type: job.fullTime ? 'Full-time' : job.partTime ? 'Part-time' : 'Contract',
    description: job.jobDescription,
    external_url: job.jobUrl,
    posted_date: job.date,
    source: 'Reed'
  }));
}

function deduplicateJobs(jobs: any[]) {
  const seen = new Set();
  const unique = [];
  
  for (const job of jobs) {
    const key = `${job.title?.toLowerCase()}-${job.company?.toLowerCase()}-${job.location?.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(job);
    }
  }
  
  return unique;
}
