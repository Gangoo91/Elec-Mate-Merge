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
    
    console.log(`Fetching Indeed jobs for: ${keywords} in ${location}`);
    
    // Build Indeed search URL
    const searchUrl = new URL('https://uk.indeed.com/jobs');
    searchUrl.searchParams.set('q', keywords || 'electrician');
    searchUrl.searchParams.set('l', location);
    searchUrl.searchParams.set('sort', 'date');
    searchUrl.searchParams.set('start', ((page - 1) * 10).toString());

    console.log(`Indeed URL: ${searchUrl.toString()}`);

    // Add random delay to avoid pattern detection
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

    // Enhanced headers for better anti-detection
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
    ];
    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    // Fetch Indeed page with enhanced headers
    const response = await fetch(searchUrl.toString(), {
      headers: {
        'User-Agent': randomUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://uk.indeed.com/'
      }
    });

    if (!response.ok) {
      throw new Error(`Indeed API error: ${response.status}`);
    }

    const html = await response.text();
    const jobs = parseIndeedJobs(html);
    
    console.log(`Retrieved ${jobs.length} jobs from Indeed`);

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

function parseIndeedJobs(html: string) {
  const jobs = [];
  
  try {
    // Extract job listings using regex patterns
    const jobPattern = /data-jk="([^"]+)"[\s\S]*?<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*><span[^>]*title="([^"]*)"[\s\S]*?<span class="companyName"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>[\s\S]*?<div[^>]*data-testid="job-location"[^>]*>([^<]+)<\/div>/g;
    
    let match;
    let count = 0;
    while ((match = jobPattern.exec(html)) !== null && count < 20) {
      const [, jobId, relativeUrl, title, company, location] = match;
      
      // Extract salary if available
      const salaryMatch = html.match(new RegExp(`data-jk="${jobId}"[\\s\\S]*?<span[^>]*class="[^"]*salary[^"]*"[^>]*>([^<]+)<\/span>`));
      const salary = salaryMatch ? salaryMatch[1].trim() : null;
      
      // Extract posted date
      const dateMatch = html.match(new RegExp(`data-jk="${jobId}"[\\s\\S]*?<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]+)<\/span>`));
      const postedDate = dateMatch ? formatDate(dateMatch[1].trim()) : new Date().toISOString();
      
      jobs.push({
        id: `indeed-${jobId}`,
        title: title.trim(),
        company: company.trim(),
        location: location.trim(),
        salary: salary,
        type: 'Full-time',
        description: `${title} position at ${company} in ${location}`,
        external_url: relativeUrl.startsWith('/') ? `https://uk.indeed.com${relativeUrl}` : relativeUrl,
        posted_date: postedDate,
        source: 'Indeed'
      });
      
      count++;
    }
  } catch (error) {
    console.error('Error parsing Indeed jobs:', error);
  }
  
  return jobs;
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