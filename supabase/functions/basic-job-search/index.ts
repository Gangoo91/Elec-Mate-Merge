
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const reedApiKey = Deno.env.get('REED_API_KEY');

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
    
    // Normalize location for better API results
    const normalizedLocation = normalizeLocationForAPI(location);
    console.log('📍 Normalized location for API:', normalizedLocation);
    
    // Search Reed Jobs with improved location handling
    const jobs = await searchReedJobs(query, normalizedLocation);
    
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

async function searchReedJobs(query: string, location: string) {
  if (!reedApiKey) {
    console.log('🚫 Reed API key not available');
    return [];
  }
  
  try {
    const params = new URLSearchParams({
      keywords: query,
      location: location || 'United Kingdom',
      resultsToTake: '50' // Increased to get more results for filtering
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
    
    const jobs = data.results.map((job: any) => ({
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

    // Apply more flexible location filtering - be less restrictive to show more relevant jobs
    if (location && location.toLowerCase() !== 'united kingdom' && location.toLowerCase() !== 'uk') {
      console.log('📍 Applying server-side location filtering for:', location);
      const filteredJobs = filterJobsByLocation(jobs, location);
      console.log(`Server-side filtering: ${filteredJobs.length}/${jobs.length} jobs match location`);
      
      // If filtering results in very few jobs, return more jobs with a wider radius
      if (filteredJobs.length < 5) {
        console.log('🔍 Too few results, expanding search radius...');
        const expandedJobs = filterJobsByLocationExpanded(jobs, location);
        console.log(`Expanded filtering: ${expandedJobs.length}/${jobs.length} jobs in expanded area`);
        return expandedJobs.slice(0, 20); // Still limit total results
      }
      
      return filteredJobs;
    }
    
    return jobs;
  } catch (error) {
    console.error('❌ Reed search failed:', error);
    return [];
  }
}

function filterJobsByLocation(jobs: any[], searchLocation: string): any[] {
  const normalizedSearch = searchLocation.toLowerCase().trim();
  console.log(`📍 Filtering jobs for location: "${normalizedSearch}"`);
  
  const filteredJobs = jobs.filter(job => {
    const jobLocation = (job.location || '').toLowerCase();
    
    // Direct text matching
    const directMatch = jobLocation.includes(normalizedSearch) || 
                       normalizedSearch.includes(jobLocation);
    
    if (directMatch) {
      console.log(`✅ Direct match: "${job.location}" matches "${searchLocation}"`);
      return true;
    }

    // Check for common location aliases
    const locationAliases: Record<string, string[]> = {
      'cumbria': ['cumbria', 'lake district', 'carlisle', 'kendal', 'barrow', 'penrith', 'workington', 'whitehaven', 'cockermouth', 'keswick', 'windermere', 'ambleside', 'grasmere'],
      'london': ['london', 'greater london', 'central london'],
      'manchester': ['manchester', 'greater manchester', 'trafford', 'salford'],
      'birmingham': ['birmingham', 'west midlands', 'solihull'],
      'leeds': ['leeds', 'west yorkshire', 'bradford', 'wakefield'],
      'glasgow': ['glasgow', 'greater glasgow', 'clyde'],
      'edinburgh': ['edinburgh', 'lothian'],
      'cardiff': ['cardiff', 'caerdydd', 'south wales'],
      'belfast': ['belfast', 'northern ireland']
    };

    // Check if search location has aliases
    for (const [region, aliases] of Object.entries(locationAliases)) {
      if (aliases.includes(normalizedSearch)) {
        const regionMatch = aliases.some(alias => jobLocation.includes(alias));
        if (regionMatch) {
          console.log(`✅ Alias match: "${job.location}" matches alias of "${searchLocation}"`);
          return true;
        }
      }
    }

    // Broader word matching for partial matches
    const searchWords = normalizedSearch.split(' ').filter(word => word.length > 2);
    const jobWords = jobLocation.split(' ').filter((word: string) => word.length > 2);
    
    const hasCommonWord = searchWords.some(searchWord => 
      jobWords.some((jobWord: string) => 
        jobWord.includes(searchWord) || searchWord.includes(jobWord)
      )
    );

    if (hasCommonWord) {
      console.log(`✅ Word match: "${job.location}" has common words with "${searchLocation}"`);
      return true;
    }

    console.log(`❌ No match: "${job.location}" doesn't match "${searchLocation}"`);
    return false;
  });

  console.log(`📊 Location filtering result: ${filteredJobs.length}/${jobs.length} jobs match "${searchLocation}"`);
  return filteredJobs;
}

function filterJobsByLocationExpanded(jobs: any[], searchLocation: string): any[] {
  const normalizedSearch = searchLocation.toLowerCase().trim();
  console.log(`🔍 Expanded location filtering for: "${normalizedSearch}"`);
  
  const expandedRegions: Record<string, string[]> = {
    'cumbria': ['cumbria', 'lake district', 'carlisle', 'kendal', 'barrow', 'penrith', 'workington', 'whitehaven', 'cockermouth', 'keswick', 'windermere', 'ambleside', 'grasmere', 'lancaster', 'preston', 'blackpool', 'north west', 'northwest'],
    'london': ['london', 'greater london', 'central london', 'south east', 'southeast', 'home counties'],
    'manchester': ['manchester', 'greater manchester', 'trafford', 'salford', 'north west', 'northwest', 'lancashire'],
    'birmingham': ['birmingham', 'west midlands', 'solihull', 'midlands', 'coventry'],
    'leeds': ['leeds', 'west yorkshire', 'bradford', 'wakefield', 'yorkshire', 'north england'],
    'glasgow': ['glasgow', 'greater glasgow', 'clyde', 'scotland', 'central scotland'],
    'edinburgh': ['edinburgh', 'lothian', 'scotland', 'central scotland'],
    'cardiff': ['cardiff', 'caerdydd', 'south wales', 'wales', 'welsh'],
    'belfast': ['belfast', 'northern ireland', 'ni', 'ulster']
  };
  
  const filteredJobs = jobs.filter(job => {
    const jobLocation = (job.location || '').toLowerCase();
    
    // Check expanded regions
    for (const [region, keywords] of Object.entries(expandedRegions)) {
      if (keywords.includes(normalizedSearch) || normalizedSearch.includes(region)) {
        const regionMatch = keywords.some(keyword => jobLocation.includes(keyword));
        if (regionMatch) {
          console.log(`✅ Expanded match: "${job.location}" matches expanded "${searchLocation}"`);
          return true;
        }
      }
    }
    
    // Fallback to any UK location if very specific search
    if (jobLocation.includes('uk') || jobLocation.includes('united kingdom') || jobLocation.includes('england') || jobLocation.includes('scotland') || jobLocation.includes('wales')) {
      console.log(`✅ UK fallback: "${job.location}" accepted for UK search`);
      return true;
    }
    
    return false;
  });
  
  console.log(`📊 Expanded filtering result: ${filteredJobs.length}/${jobs.length} jobs in expanded area`);
  return filteredJobs;
}
