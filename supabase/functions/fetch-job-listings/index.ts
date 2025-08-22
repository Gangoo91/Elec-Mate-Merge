import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.0.0';

// Initialize Supabase client
const supabaseUrl = 'https://jtwygbeceundfgnkirof.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Firecrawl client
const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
const firecrawl = firecrawlApiKey ? new FirecrawlApp({ apiKey: firecrawlApiKey }) : null;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Job board targets for Firecrawl scraping
const jobTargets = [
  {
    name: 'Indeed UK - Electrician',
    url: 'https://uk.indeed.com/jobs?q=electrician&l=United+Kingdom&sort=date',
    source: 'Indeed',
    keywords: ['electrician', 'electrical engineer', 'electrical technician']
  },
  {
    name: 'TotalJobs - Electrician',
    url: 'https://www.totaljobs.com/jobs/electrician',
    source: 'TotalJobs',
    keywords: ['electrician', 'electrical engineer', 'electrical technician']
  },
  {
    name: 'CV Library - Electrician',
    url: 'https://www.cv-library.co.uk/search-jobs/electrician',
    source: 'CV Library',
    keywords: ['electrician', 'electrical engineer', 'electrical technician']
  },
  {
    name: 'Reed - Electrician',
    url: 'https://www.reed.co.uk/jobs/electrician',
    source: 'Reed',
    keywords: ['electrician', 'electrical engineer', 'electrical technician']
  }
];

// Job board specific parsers
function parseIndeedJobs(html: string, source: string): any[] {
  const jobs = [];
  
  // Indeed job parsing patterns
  const jobPattern = /<div class="job_seen_beacon"[\s\S]*?<\/div>/g;
  const titlePattern = /<span title="([^"]+)"/;
  const companyPattern = /<span class="companyName">[\s\S]*?<span[^>]*>([^<]+)</;
  const locationPattern = /<div data-testid="job-location">([^<]+)</;
  const salaryPattern = /£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+|p\/a|pa|per annum)?/i;
  const linkPattern = /<a[^>]+href="\/viewjob\?jk=([^"]+)"/;
  
  let match;
  while ((match = jobPattern.exec(html)) !== null) {
    const jobHtml = match[0];
    
    const titleMatch = titlePattern.exec(jobHtml);
    const companyMatch = companyPattern.exec(jobHtml);
    const locationMatch = locationPattern.exec(jobHtml);
    const salaryMatch = salaryPattern.exec(jobHtml);
    const linkMatch = linkPattern.exec(jobHtml);
    
    if (titleMatch && linkMatch) {
      jobs.push({
        title: cleanTitle(titleMatch[1]),
        company: companyMatch ? cleanText(companyMatch[1]) : 'Unknown Company',
        location: locationMatch ? cleanText(locationMatch[1]) : 'UK',
        salary: salaryMatch ? cleanSalary(salaryMatch[0]) : null,
        external_url: `https://uk.indeed.com/viewjob?jk=${linkMatch[1]}`,
        source,
        posted_date: new Date().toISOString().split('T')[0],
        type: determineJobType(titleMatch[1], ''),
        description: extractJobDescription(jobHtml)
      });
    }
  }
  
  return jobs;
}

function parseTotalJobsJobs(html: string, source: string): any[] {
  const jobs = [];
  
  // TotalJobs parsing patterns
  const jobPattern = /<article[^>]*class="[^"]*job[^"]*"[\s\S]*?<\/article>/g;
  const titlePattern = /<h2[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/;
  const companyPattern = /<p[^>]*class="[^"]*company[^"]*"[^>]*>([^<]+)</;
  const locationPattern = /<p[^>]*class="[^"]*location[^"]*"[^>]*>([^<]+)</;
  const salaryPattern = /£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i;
  const linkPattern = /<a[^>]+href="([^"]+)"/;
  
  let match;
  while ((match = jobPattern.exec(html)) !== null) {
    const jobHtml = match[0];
    
    const titleMatch = titlePattern.exec(jobHtml);
    const companyMatch = companyPattern.exec(jobHtml);
    const locationMatch = locationPattern.exec(jobHtml);
    const salaryMatch = salaryPattern.exec(jobHtml);
    const linkMatch = linkPattern.exec(jobHtml);
    
    if (titleMatch && linkMatch) {
      jobs.push({
        title: cleanTitle(titleMatch[1]),
        company: companyMatch ? cleanText(companyMatch[1]) : 'Unknown Company',
        location: locationMatch ? cleanText(locationMatch[1]) : 'UK',
        salary: salaryMatch ? cleanSalary(salaryMatch[0]) : null,
        external_url: linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.totaljobs.com${linkMatch[1]}`,
        source,
        posted_date: new Date().toISOString().split('T')[0],
        type: determineJobType(titleMatch[1], ''),
        description: extractJobDescription(jobHtml)
      });
    }
  }
  
  return jobs;
}

function parseCVLibraryJobs(html: string, source: string): any[] {
  const jobs = [];
  
  // CV Library parsing patterns
  const jobPattern = /<div[^>]*class="[^"]*job[^"]*"[\s\S]*?<\/div>/g;
  const titlePattern = /<h2[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/;
  const companyPattern = /<p[^>]*class="[^"]*company[^"]*"[^>]*>([^<]+)</;
  const locationPattern = /<span[^>]*class="[^"]*location[^"]*"[^>]*>([^<]+)</;
  const salaryPattern = /£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i;
  const linkPattern = /<a[^>]+href="([^"]+)"/;
  
  let match;
  while ((match = jobPattern.exec(html)) !== null) {
    const jobHtml = match[0];
    
    const titleMatch = titlePattern.exec(jobHtml);
    const companyMatch = companyPattern.exec(jobHtml);
    const locationMatch = locationPattern.exec(jobHtml);
    const salaryMatch = salaryPattern.exec(jobHtml);
    const linkMatch = linkPattern.exec(jobHtml);
    
    if (titleMatch && linkMatch) {
      jobs.push({
        title: cleanTitle(titleMatch[1]),
        company: companyMatch ? cleanText(companyMatch[1]) : 'Unknown Company',
        location: locationMatch ? cleanText(locationMatch[1]) : 'UK',
        salary: salaryMatch ? cleanSalary(salaryMatch[0]) : null,
        external_url: linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.cv-library.co.uk${linkMatch[1]}`,
        source,
        posted_date: new Date().toISOString().split('T')[0],
        type: determineJobType(titleMatch[1], ''),
        description: extractJobDescription(jobHtml)
      });
    }
  }
  
  return jobs;
}

function parseReedJobs(html: string, source: string): any[] {
  const jobs = [];
  
  // Reed parsing patterns
  const jobPattern = /<article[^>]*class="[^"]*job[^"]*"[\s\S]*?<\/article>/g;
  const titlePattern = /<h3[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/;
  const companyPattern = /<div[^>]*class="[^"]*employer[^"]*"[^>]*>([^<]+)</;
  const locationPattern = /<li[^>]*class="[^"]*location[^"]*"[^>]*>([^<]+)</;
  const salaryPattern = /£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i;
  const linkPattern = /<a[^>]+href="([^"]+)"/;
  
  let match;
  while ((match = jobPattern.exec(html)) !== null) {
    const jobHtml = match[0];
    
    const titleMatch = titlePattern.exec(jobHtml);
    const companyMatch = companyPattern.exec(jobHtml);
    const locationMatch = locationPattern.exec(jobHtml);
    const salaryMatch = salaryPattern.exec(jobHtml);
    const linkMatch = linkPattern.exec(jobHtml);
    
    if (titleMatch && linkMatch) {
      jobs.push({
        title: cleanTitle(titleMatch[1]),
        company: companyMatch ? cleanText(companyMatch[1]) : 'Unknown Company',
        location: locationMatch ? cleanText(locationMatch[1]) : 'UK',
        salary: salaryMatch ? cleanSalary(salaryMatch[0]) : null,
        external_url: linkMatch[1].startsWith('http') ? linkMatch[1] : `https://www.reed.co.uk${linkMatch[1]}`,
        source,
        posted_date: new Date().toISOString().split('T')[0],
        type: determineJobType(titleMatch[1], ''),
        description: extractJobDescription(jobHtml)
      });
    }
  }
  
  return jobs;
}

// Utility functions for data cleaning
function cleanTitle(title: string): string {
  return title.replace(/<[^>]*>/g, '').trim().substring(0, 200);
}

function cleanText(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
}

function cleanSalary(salary: string): string {
  return salary.replace(/<[^>]*>/g, '').trim().substring(0, 100);
}

function extractJobDescription(html: string): string {
  const descPattern = /<p[^>]*class="[^"]*description[^"]*"[^>]*>([^<]+)</;
  const match = descPattern.exec(html);
  return match ? cleanText(match[1]).substring(0, 500) : '';
}

function determineJobType(title: string, description: string): string {
  const fullText = (title + ' ' + description).toLowerCase();
  
  if (fullText.includes('apprentice') || fullText.includes('trainee') || fullText.includes('graduate')) {
    return 'Apprenticeship';
  } else if (fullText.includes('contract') || fullText.includes('temporary') || fullText.includes('temp') || fullText.includes('freelance') || fullText.includes('consultant')) {
    return 'Contract';
  } else if (fullText.includes('part time') || fullText.includes('part-time') || fullText.includes('weekend')) {
    return 'Part-time';
  } else {
    return 'Full-time';
  }
}

// Scrape jobs from a single target
async function scrapeJobTarget(target: { name: string, url: string, source: string, keywords: string[] }) {
  if (!firecrawl) {
    console.error('Firecrawl API key not configured');
    return [];
  }

  try {
    console.log(`🔍 Scraping ${target.name}: ${target.url}`);
    
    const scrapeResponse = await firecrawl.scrapeUrl(target.url, {
      formats: ['html'],
      waitFor: 2000,
      timeout: 30000
    });

    if (!scrapeResponse.success || !scrapeResponse.data?.html) {
      console.error(`Failed to scrape ${target.name}: ${scrapeResponse.error || 'No HTML content'}`);
      return [];
    }

    const html = scrapeResponse.data.html;
    let jobs = [];

    // Parse based on source
    switch (target.source) {
      case 'Indeed':
        jobs = parseIndeedJobs(html, target.source);
        break;
      case 'TotalJobs':
        jobs = parseTotalJobsJobs(html, target.source);
        break;
      case 'CV Library':
        jobs = parseCVLibraryJobs(html, target.source);
        break;
      case 'Reed':
        jobs = parseReedJobs(html, target.source);
        break;
      default:
        console.warn(`Unknown source: ${target.source}`);
        return [];
    }

    // Filter jobs to ensure they're electrical-related
    const filteredJobs = jobs.filter(job => {
      const titleLower = job.title.toLowerCase();
      return target.keywords.some(keyword => 
        titleLower.includes(keyword) ||
        titleLower.includes('electrical') ||
        titleLower.includes('electric')
      );
    });

    console.log(`✅ Scraped ${filteredJobs.length} electrical jobs from ${target.name}`);
    return filteredJobs;

  } catch (error) {
    console.error(`❌ Error scraping ${target.name}:`, error.message);
    return [];
  }
}

// Insert new jobs into database with validation
async function insertJobs(jobs: any[]) {
  if (!jobs.length) return { count: 0, errors: [] };

  console.log(`🔍 Validating ${jobs.length} jobs before insertion...`);
  
  // Data validation - filter out invalid jobs
  const validJobs = jobs.filter(job => {
    const isValid = job.title && 
                   job.external_url && 
                   job.source && 
                   job.title.length > 3 &&
                   job.external_url.startsWith('http') &&
                   !job.title.toLowerCase().includes('test') &&
                   !job.title.toLowerCase().includes('example');
    
    if (!isValid) {
      console.log(`❌ Invalid job filtered out: ${job.title || 'No title'}`);
    }
    
    return isValid;
  });
  
  console.log(`✅ ${validJobs.length} valid jobs after filtering`);
  
  if (validJobs.length === 0) {
    return { count: 0, errors: ['No valid jobs to insert'] };
  }

  // Check for existing jobs in batches
  const batchSize = 50;
  const newJobs = [];
  const errors = [];
  
  for (let i = 0; i < validJobs.length; i += batchSize) {
    const batch = validJobs.slice(i, i + batchSize);
    const urls = batch.map(job => job.external_url);
    
    try {
      const { data: existingJobs, error } = await supabase
        .from('job_listings')
        .select('external_url')
        .in('external_url', urls);
      
      if (error) {
        console.error('Error checking existing jobs:', error);
        errors.push(`Batch ${i}-${i + batchSize}: ${error.message}`);
        continue;
      }
      
      const existingUrls = new Set(existingJobs?.map(job => job.external_url) || []);
      const batchNewJobs = batch.filter(job => !existingUrls.has(job.external_url));
      
      newJobs.push(...batchNewJobs);
      
    } catch (error) {
      console.error(`Error processing batch ${i}-${i + batchSize}:`, error);
      errors.push(`Batch ${i}-${i + batchSize}: ${error.message}`);
    }
  }
  
  console.log(`📊 Found ${newJobs.length} new jobs to insert`);
  
  if (newJobs.length === 0) {
    return { count: 0, errors: errors.length ? errors : ['All jobs already exist'] };
  }
  
  // Insert new jobs in batches
  let totalInserted = 0;
  
  for (let i = 0; i < newJobs.length; i += batchSize) {
    const batch = newJobs.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('job_listings')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting batch ${i}-${i + batchSize}:`, error);
        errors.push(`Insert batch ${i}-${i + batchSize}: ${error.message}`);
      } else {
        totalInserted += batch.length;
        console.log(`✅ Inserted batch ${i}-${i + batchSize}: ${batch.length} jobs`);
      }
      
    } catch (error) {
      console.error(`Exception inserting batch ${i}-${i + batchSize}:`, error);
      errors.push(`Insert batch ${i}-${i + batchSize}: ${error.message}`);
    }
  }
  
  return { count: totalInserted, errors };
}

// Main handler for the edge function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting Firecrawl-based job scraping...');
    
    // Check if Firecrawl is configured
    if (!firecrawl) {
      return new Response(
        JSON.stringify({ 
          error: 'Firecrawl API key not configured. Please add the FIRECRAWL_API_KEY to your Supabase secrets.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Manual trigger requires authentication
    if (req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Authorization header is required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Process all job targets with rate limiting
    console.log(`🚀 Processing ${jobTargets.length} job targets...`);
    const allJobs = [];
    const targetResults = [];
    
    for (const target of jobTargets) {
      const startTime = Date.now();
      const jobs = await scrapeJobTarget(target);
      const duration = Date.now() - startTime;
      
      const result = {
        name: target.name,
        source: target.source,
        jobCount: jobs.length,
        duration: `${duration}ms`,
        success: jobs.length > 0
      };
      
      targetResults.push(result);
      allJobs.push(...jobs);
      
      console.log(`📈 ${target.name}: ${jobs.length} jobs in ${duration}ms`);
      
      // Rate limiting between targets to avoid being blocked
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // Insert new jobs into the database
    console.log(`💾 Processing ${allJobs.length} total jobs for database insertion...`);
    const result = await insertJobs(allJobs);
    
    const summary = {
      totalTargets: jobTargets.length,
      totalJobsFound: allJobs.length,
      newJobsInserted: result.count,
      targetBreakdown: targetResults,
      errors: result.errors || [],
      timestamp: new Date().toISOString()
    };
    
    console.log(`✅ Firecrawl job scraping complete: ${result.count} new jobs inserted`);
    console.log(`📊 Summary:`, JSON.stringify(summary, null, 2));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Scraped ${allJobs.length} jobs from ${jobTargets.length} sources using Firecrawl, inserted ${result.count} new jobs`,
        summary
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in Firecrawl job scraping:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});