
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REEDJOB API');
const adzunaAppId = Deno.env.get('ADZUNA_APP_ID');
const adzunaAppKey = Deno.env.get('ADZUNA_APP_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { query, location, filters } = await req.json();
    console.log('🔍 Starting job search for:', { query, location, filters });
    console.log('🔑 API Keys available:', { 
      reed: !!reedApiKey, 
      adzuna: !!adzunaAppId && !!adzunaAppKey 
    });
    
    const allJobs = [];
    const sources = [];
    const searchQueries = [query];
    
    // Normalize location for better API calls
    const normalizedLocation = normalizeLocationForAPI(location);
    console.log('📍 Normalized location:', normalizedLocation);
    
    // Search Reed Jobs
    if (reedApiKey) {
      try {
        console.log('🏢 Attempting Reed search...');
        const reedJobs = await searchReedJobs(query, normalizedLocation, filters);
        allJobs.push(...reedJobs);
        sources.push('Reed');
        console.log(`✅ Reed: Found ${reedJobs.length} jobs`);
      } catch (error) {
        console.error('❌ Reed search failed:', error instanceof Error ? error.message : 'Unknown error');
        console.error('Reed error details:', error);
      }
    } else {
      console.log('⚠️ Reed API key not available');
    }
    
    // Search Adzuna Jobs
    if (adzunaAppId && adzunaAppKey) {
      try {
        console.log('🔍 Attempting Adzuna search...');
        const adzunaJobs = await searchAdzunaJobs(query, normalizedLocation, filters);
        allJobs.push(...adzunaJobs);
        sources.push('Adzuna');
        console.log(`✅ Adzuna: Found ${adzunaJobs.length} jobs`);
      } catch (error) {
        console.error('❌ Adzuna search failed:', error instanceof Error ? error.message : 'Unknown error');
        console.error('Adzuna error details:', error);
      }
    } else {
      console.log('⚠️ Adzuna API credentials not available');
    }
    
    // If no API keys are available
    if (!reedApiKey && (!adzunaAppId || !adzunaAppKey)) {
      console.error('🚫 No job search API keys found');
      return new Response(
        JSON.stringify({ 
          error: "Job search service temporarily unavailable. Please check API keys configuration.",
          jobs: [],
          totalFound: 0,
          searchQueries: [query],
          sources: []
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Deduplicate jobs
    const uniqueJobs = deduplicateJobs(allJobs);
    console.log(`📊 Total: ${allJobs.length} jobs, ${uniqueJobs.length} unique from sources: ${sources.join(', ')}`);
    
    // Sort by date (most recent first)
    uniqueJobs.sort((a, b) => {
      return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
    });
    
    return new Response(
      JSON.stringify({ 
        jobs: uniqueJobs.slice(0, 50),
        totalFound: uniqueJobs.length,
        searchQueries,
        sources
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('💥 Error in job search:', error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while searching for jobs. Please try again.",
        jobs: [],
        totalFound: 0,
        searchQueries: [],
        sources: []
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function normalizeLocationForAPI(location: string): string {
  if (!location) return 'United Kingdom';
  
  // Remove "United Kingdom" suffix if present
  let normalized = location.replace(/,?\s*united kingdom$/i, '').trim();
  
  // If empty after removal, default to UK
  if (!normalized) return 'United Kingdom';
  
  // Handle specific location mappings for better API results
  const locationMappings: Record<string, string> = {
    'cumbria': 'Cumbria',
    'lake district': 'Cumbria',
    'carlisle': 'Carlisle, Cumbria',
    'kendal': 'Kendal, Cumbria',
    'barrow': 'Barrow-in-Furness, Cumbria',
    'penrith': 'Penrith, Cumbria',
    'workington': 'Workington, Cumbria',
    'whitehaven': 'Whitehaven, Cumbria',
    'greater london': 'London',
    'greater manchester': 'Manchester',
    'west midlands': 'Birmingham',
    'west yorkshire': 'Leeds',
    'south wales': 'Cardiff',
    'northern ireland': 'Belfast'
  };
  
  const lowerNormalized = normalized.toLowerCase();
  return locationMappings[lowerNormalized] || normalized;
}

async function searchReedJobs(query: string, location: string, filters: any) {
  if (!reedApiKey) {
    console.log('🚫 Reed API key not available, skipping Reed search');
    return [];
  }
  
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
    throw new Error(`Reed API error: ${response.status} ${response.statusText}`);
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
    description: job.jobDescription,
    external_url: job.jobUrl,
    posted_date: job.date,
    source: 'Reed'
  }));
}

async function searchAdzunaJobs(query: string, location: string, filters: any) {
  if (!adzunaAppId || !adzunaAppKey) {
    console.log('🚫 Adzuna API credentials not available, skipping Adzuna search');
    return [];
  }
  
  // Clean and format location for Adzuna API
  let cleanLocation = location?.replace(/,?\s*united kingdom$/i, '') || 'uk';
  
  // Handle specific Adzuna location formatting
  if (cleanLocation.toLowerCase().includes('cumbria')) {
    cleanLocation = 'cumbria';
  } else if (cleanLocation.toLowerCase() === 'united kingdom') {
    cleanLocation = 'uk';
  }
  
  const params = new URLSearchParams({
    app_id: adzunaAppId,
    app_key: adzunaAppKey,
    what: query,
    where: cleanLocation,
    results_per_page: '50',
    content_type: 'application/json'
  });
  
  // Add job type filter if specified
  if (filters.jobType === 'full-time') {
    params.append('full_time', '1');
  } else if (filters.jobType === 'part-time') {
    params.append('part_time', '1');
  } else if (filters.jobType === 'contract') {
    params.append('contract', '1');
  }
  
  const apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?${params}`;
  console.log('🔍 Adzuna API URL:', apiUrl);
  
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Adzuna API error: ${response.status} ${response.statusText}`);
    console.error('Adzuna API error response:', errorText);
    throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log(`📊 Adzuna API returned ${data.count} total results, processing ${data.results?.length || 0} jobs`);
  
  if (!data.results || data.results.length === 0) {
    console.log('📭 No results from Adzuna API');
    return [];
  }
  
  return data.results.map((job: any) => ({
    id: `adzuna-${job.id}`,
    title: job.title,
    company: job.company?.display_name || 'Company not specified',
    location: `${job.location?.display_name || location}`,
    salary: job.salary_min && job.salary_max ? 
      `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()}` : 
      job.salary_min ? `£${Math.round(job.salary_min).toLocaleString()}+` : null,
    type: determineJobType(job.contract_type, job.contract_time),
    description: job.description || 'No description available',
    external_url: job.redirect_url,
    posted_date: job.created,
    source: 'Adzuna'
  }));
}

function determineJobType(contractType: string, contractTime: string): string {
  if (contractTime === 'full_time') return 'Full-time';
  if (contractTime === 'part_time') return 'Part-time';
  if (contractType === 'contract') return 'Contract';
  if (contractType === 'permanent') return 'Permanent';
  return 'Not specified';
}

function deduplicateJobs(jobs: any[]) {
  const seen = new Set();
  const unique = [];
  
  for (const job of jobs) {
    // Create a more sophisticated deduplication key
    const titleWords = job.title?.toLowerCase().split(' ').slice(0, 3).join(' ') || '';
    const companyName = job.company?.toLowerCase().replace(/\s+/g, '') || '';
    const locationKey = job.location?.toLowerCase().split(',')[0] || '';
    
    const key = `${titleWords}-${companyName}-${locationKey}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(job);
    } else {
      console.log(`🔄 Duplicate job filtered: ${job.title} at ${job.company}`);
    }
  }
  
  return unique;
}
