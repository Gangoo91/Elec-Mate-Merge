import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, location = "United Kingdom", page = 1 } = await req.json();

    console.log(`Fetching JIB jobs for: ${keywords} in ${location}`);

    // JIB (Joint Industry Board) electrical industry jobs
    const searchUrl = `https://www.jib.org.uk/jobs/`;

    console.log(`JIB URL: ${searchUrl}`);

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
        url: searchUrl,
        onlyMainContent: true,
        maxAge: 172800000,
        formats: [{
          type: "json",
          prompt: "Extract ALL electrical industry job listings visible on the page. These are jobs for qualified electricians, electrical engineers, and electrical apprentices. Include up to 50 jobs if available.",
          schema: {
            title: "JobListings",
            type: "object",
            properties: {
              jobs: {
                type: "array",
                maxItems: 50,
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
    let jobs = processFirecrawlJobs(firecrawlData?.data?.json?.jobs || [], 'JIB');

    // Filter by location if specified (JIB doesn't have location-based search)
    if (location && location !== 'United Kingdom') {
      const locationLower = location.toLowerCase();
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(locationLower) ||
        locationLower.includes(job.location.toLowerCase())
      );
    }

    // Filter by keywords if specified
    if (keywords) {
      const keywordsLower = keywords.toLowerCase();
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(keywordsLower) ||
        job.description.toLowerCase().includes(keywordsLower)
      );
    }

    console.log(`Retrieved ${jobs.length} jobs from JIB via Firecrawl`);

    return new Response(JSON.stringify({
      jobs,
      total: jobs.length,
      page,
      source: 'JIB'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching JIB jobs:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      jobs: [],
      total: 0,
      page: 1,
      source: 'JIB'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Process Firecrawl extracted jobs into standard format
function processFirecrawlJobs(jobs: any[], source: string) {
  if (!Array.isArray(jobs)) return [];

  return jobs.map((job, index) => ({
    id: `jib-${Date.now()}-${index}`,
    title: job.jobTitle || 'Untitled Position',
    company: job.company || 'Company not specified',
    location: job.location || 'Location not specified',
    salary: job.salary || null,
    type: job.employmentType || 'Full-time',
    description: job.jobDescription || '',
    external_url: job.applyUrl || null,
    posted_date: job.postedDate || new Date().toISOString(),
    source: source,
    image_url: job.imageUrl || null
  })).filter(job => job.title && job.title !== 'Untitled Position');
}
