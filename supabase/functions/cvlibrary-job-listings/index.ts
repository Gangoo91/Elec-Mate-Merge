import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, location = "United Kingdom", page = 1 } = await req.json();
    
    console.log(`Fetching CV Library jobs for: ${keywords} in ${location}`);
    
    // Build CV Library search URL
    const searchUrl = new URL('https://www.cv-library.co.uk/search-jobs');
    searchUrl.searchParams.set('q', keywords || 'electrician');
    searchUrl.searchParams.set('l', location);
    searchUrl.searchParams.set('sort', 'newest');
    searchUrl.searchParams.set('page', page.toString());
    
    console.log(`CV Library URL: ${searchUrl.toString()}`);

    // Use Firecrawl API for structured data extraction
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: searchUrl.toString(),
        onlyMainContent: true,
        maxAge: 172800000,
        formats: [{
          type: "json",
          schema: {
            title: "JobListings",
            type: "object",
            properties: {
              jobs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    jobTitle: { type: "string", description: "The title of the job" },
                    imageUrl: { type: "string", description: "The image of the job" },
                    company: { type: "string", description: "The company offering the job" },
                    location: { type: "string", description: "The job location" },
                    employmentType: { type: "string", description: "The contract type (e.g., Full-time, Contract)" },
                    salary: { type: "string", description: "The salary range for the job" },
                    postedDate: { type: "string", description: "Information about when the job was posted" },
                    jobDescription: { type: "string", description: "Short preview/summary of the job description" },
                    applyUrl: { type: "string", description: "The URL for applying to the job" }
                  },
                  required: ["jobTitle", "company", "location"]
                }
              }
            }
          }
        }]
      })
    });

    if (!firecrawlResponse.ok) {
      throw new Error(`Firecrawl API error: ${firecrawlResponse.status}`);
    }

    const firecrawlData = await firecrawlResponse.json();
    const jobs = processFirecrawlJobs(firecrawlData?.data?.json?.jobs || [], 'CV Library');
    
    console.log(`Retrieved ${jobs.length} jobs from CV Library via Firecrawl`);

    return new Response(JSON.stringify({
      jobs,
      total: jobs.length,
      page,
      source: 'CV Library'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching CV Library jobs:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      jobs: [],
      total: 0,
      page: 1,
      source: 'CV Library'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function processFirecrawlJobs(jobs: any[], source: string) {
  return jobs.map((job, index) => {
    const jobId = `${source.toLowerCase().replace(' ', '')}-${index}-${Date.now()}`;
    
    return {
      id: jobId,
      title: job.jobTitle || 'Unknown Position',
      company: job.company || 'Unknown Company',
      image_url: job.imageUrl || "",
      location: job.location || 'Unknown Location',
      salary: job.salary || null,
      type: job.employmentType || 'Full-time',
      description: job.jobDescription || `${job.jobTitle} position at ${job.company} in ${job.location}`,
      external_url: job.applyUrl || '#',
      posted_date: new Date().toISOString(),
      source: source
    };
  }).slice(0, 20); // Limit to 20 jobs
}