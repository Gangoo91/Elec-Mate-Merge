import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords, location = "United Kingdom", page = 1 } = await req.json();
    
    console.log(`Fetching TotalJobs for: ${keywords} in ${location}`);
    
    // Build TotalJobs search URL
    const searchUrl = new URL('https://www.totaljobs.com/jobs');
    searchUrl.searchParams.set('q', keywords || 'electrician');
    searchUrl.searchParams.set('l', location);
    searchUrl.searchParams.set('radius', '25');
    searchUrl.searchParams.set('s', 'header');
    
    console.log(`TotalJobs URL: ${searchUrl.toString()}`);

    // Fetch TotalJobs page
    const response = await fetch(searchUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`TotalJobs API error: ${response.status}`);
    }

    const html = await response.text();
    const jobs = parseTotalJobsJobs(html);
    
    console.log(`Retrieved ${jobs.length} jobs from TotalJobs`);

    return new Response(JSON.stringify({
      jobs,
      total: jobs.length,
      page,
      source: 'TotalJobs'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching TotalJobs:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      jobs: [],
      total: 0,
      page: 1,
      source: 'TotalJobs'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseTotalJobsJobs(html: string) {
  const jobs = [];
  
  try {
    // Extract job listings using regex patterns for TotalJobs structure
    const jobPattern = /<article[^>]*class="[^"]*job[^"]*"[^>]*>[\s\S]*?<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>[\s\S]*?<div[^>]*class="[^"]*company[^"]*"[^>]*>([^<]+)<\/div>[\s\S]*?<div[^>]*class="[^"]*location[^"]*"[^>]*>([^<]+)<\/div>/g;
    
    let match;
    let count = 0;
    while ((match = jobPattern.exec(html)) !== null && count < 20) {
      const [, url, title, company, location] = match;
      
      // Generate unique ID
      const jobId = `totaljobs-${count}-${Date.now()}`;
      
      // Extract salary if available
      const salaryMatch = html.match(new RegExp(`<a[^>]*href="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?<div[^>]*class="[^"]*salary[^"]*"[^>]*>([^<]+)<\/div>`));
      const salary = salaryMatch ? salaryMatch[1].trim() : null;
      
      jobs.push({
        id: jobId,
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        salary: salary,
        type: 'Full-time',
        description: `${title} position at ${company} in ${location}`,
        external_url: url.startsWith('/') ? `https://www.totaljobs.com${url}` : url,
        posted_date: new Date().toISOString(),
        source: 'TotalJobs'
      });
      
      count++;
    }
  } catch (error) {
    console.error('Error parsing TotalJobs:', error);
  }
  
  return jobs;
}