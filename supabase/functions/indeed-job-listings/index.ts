import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, location = "United Kingdom", page = 1 } = await req.json();
    
    console.log(`Fetching Indeed jobs for: ${keywords} in ${location}`);
    
    // Build Indeed search URL
    const searchUrl = new URL('https://uk.indeed.com/jobs');
    searchUrl.searchParams.set('q', keywords || 'electrician');
    searchUrl.searchParams.set('l', location);
    searchUrl.searchParams.set('sort', 'date');
    searchUrl.searchParams.set('start', ((page - 1) * 10).toString());

    console.log(`Indeed URL: ${searchUrl.toString()}`);

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
    const jobs = processFirecrawlJobs(firecrawlData?.data?.json?.jobs || []);
    
    console.log(`Retrieved ${jobs.length} jobs from Indeed via Firecrawl`);

    return new Response(JSON.stringify({
      jobs,
      total: jobs.length,
      page,
      source: 'Indeed'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching Indeed jobs:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      jobs: [],
      total: 0,
      page: 1,
      source: 'Indeed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function processFirecrawlJobs(jobs: any[]) {
  return jobs.map((job, index) => {
    const jobId = `indeed-${index}-${Date.now()}`;
    
    return {
      id: jobId,
      title: job.jobTitle || 'Unknown Position',
      company: job.company || 'Unknown Company',
      location: job.location || 'Unknown Location',
      salary: job.salary || null,
      type: job.employmentType || 'Full-time',
      description: job.jobDescription || `${job.jobTitle} position at ${job.company} in ${job.location}`,
      external_url: job.applyUrl || '#',
      posted_date: formatDate(job.postedDate) || new Date().toISOString(),
      source: 'Indeed'
    };
  }).slice(0, 20); // Limit to 20 jobs
}

function formatDate(dateStr: string): string {
  try {
    if (dateStr.includes('today') || dateStr.includes('Today')) {
      return new Date().toISOString();
    }
    if (dateStr.includes('yesterday') || dateStr.includes('Yesterday')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString();
    }
    if (dateStr.includes('days ago')) {
      const daysAgo = parseInt(dateStr.match(/(\d+)/)?.[1] || '1');
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString();
    }
    return new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}