
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import { decode } from 'https://deno.land/std@0.177.0/encoding/base64.ts';
import { load } from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { DOMParser } from 'https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts';

// Initialize Supabase client
const supabaseUrl = 'https://jtwygbeceundfgnkirof.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced RSS feed URLs for multiple job sources
const jobFeeds = [
  // Reed - Multiple feeds for better coverage
  {
    url: 'https://www.reed.co.uk/services/jobs/feed?keywords=electrician&location=uk',
    source: 'Reed',
    type: 'reed'
  },
  {
    url: 'https://www.reed.co.uk/services/jobs/feed?keywords=electrical+engineer&location=uk',
    source: 'Reed',
    type: 'reed'
  },
  {
    url: 'https://www.reed.co.uk/services/jobs/feed?keywords=electrical+technician&location=uk',
    source: 'Reed',
    type: 'reed'
  },
  
  // Indeed - Multiple geographical and keyword feeds
  {
    url: 'https://uk.indeed.com/rss?q=electrician&l=uk',
    source: 'Indeed',
    type: 'indeed'
  },
  {
    url: 'https://uk.indeed.com/rss?q=electrical+engineer&l=uk',
    source: 'Indeed',
    type: 'indeed'
  },
  {
    url: 'https://uk.indeed.com/rss?q=electrical+technician&l=uk',
    source: 'Indeed',
    type: 'indeed'
  },
  {
    url: 'https://uk.indeed.com/rss?q=electrical+apprentice&l=uk',
    source: 'Indeed',
    type: 'indeed'
  },
  
  // TotalJobs - Multiple feeds with different keywords
  {
    url: 'https://www.totaljobs.com/job/electrician/electrician-jobs/rss',
    source: 'TotalJobs',
    type: 'totaljobs'
  },
  {
    url: 'https://www.totaljobs.com/job/electrical-engineer/electrical-engineer-jobs/rss',
    source: 'TotalJobs',
    type: 'totaljobs'
  },
  {
    url: 'https://www.totaljobs.com/job/electrical-technician/electrical-technician-jobs/rss',
    source: 'TotalJobs',
    type: 'totaljobs'
  },
  
  // CV Library
  {
    url: 'https://www.cv-library.co.uk/cgi-bin/jobs2.cgi?match=phrase&salarymin=&salarymax=&location=UK&distance=15&category=&keywords=electrician&format=rss',
    source: 'CV Library',
    type: 'cvlibrary'
  },
  {
    url: 'https://www.cv-library.co.uk/cgi-bin/jobs2.cgi?match=phrase&salarymin=&salarymax=&location=UK&distance=15&category=&keywords=electrical+engineer&format=rss',
    source: 'CV Library',
    type: 'cvlibrary'
  },
  
  // Jobs.co.uk
  {
    url: 'https://www.jobs.co.uk/rss/electrician-jobs-uk.xml',
    source: 'Jobs.co.uk',
    type: 'jobscouk'
  },
  {
    url: 'https://www.jobs.co.uk/rss/electrical-engineer-jobs-uk.xml',
    source: 'Jobs.co.uk',
    type: 'jobscouk'
  }
];

// Source-specific parsers for different job boards
async function parseJobFeed(feedText: string, source: string, feedType: string) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(feedText, 'text/xml');
    if (!xmlDoc) return [];

    const items = Array.from(xmlDoc.querySelectorAll('item'));
    
    return items.map((item) => {
      let jobData;
      
      switch (feedType) {
        case 'reed':
          jobData = parseReedJob(item, source);
          break;
        case 'indeed':
          jobData = parseIndeedJob(item, source);
          break;
        case 'totaljobs':
          jobData = parseTotalJobsJob(item, source);
          break;
        case 'cvlibrary':
          jobData = parseCVLibraryJob(item, source);
          break;
        case 'jobscouk':
          jobData = parseJobsCoUkJob(item, source);
          break;
        default:
          jobData = parseGenericJob(item, source);
      }
      
      return jobData;
    }).filter(job => job && job.title && job.external_url);
    
  } catch (error) {
    console.error(`Error parsing ${source} feed:`, error);
    return [];
  }
}

// Reed-specific parser
function parseReedJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  // Reed-specific extraction patterns
  const locationMatch = description.match(/Location:\s*([^,\n]+)/i) || description.match(/Location:\s*([^<]+)/i);
  const companyMatch = description.match(/Company:\s*([^,\n]+)/i) || description.match(/Employer:\s*([^,\n]+)/i);
  const salaryMatch = description.match(/Salary:\s*([^,\n]+)/i) || description.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i);
  
  const location = locationMatch ? locationMatch[1].trim() : extractLocationFromTitle(title);
  const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
  const salary = salaryMatch ? cleanSalary(salaryMatch[0]) : null;
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// Indeed-specific parser
function parseIndeedJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  // Indeed-specific patterns
  const locationMatch = title.match(/\s-\s([^-]+)$/) || description.match(/Location:\s*([^,\n]+)/i);
  const companyMatch = description.match(/Company:\s*([^,\n]+)/i) || description.match(/<b>([^<]+)<\/b>/);
  const salaryMatch = description.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+|p\/a|pa|per annum)?/i);
  
  const location = locationMatch ? locationMatch[1].trim() : 'UK';
  const company = companyMatch ? companyMatch[1].trim() : extractCompanyFromDescription(description);
  const salary = salaryMatch ? cleanSalary(salaryMatch[0]) : null;
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// TotalJobs-specific parser
function parseTotalJobsJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  // TotalJobs-specific patterns
  const locationMatch = description.match(/Location:\s*([^,\n]+)/i) || title.match(/,\s*([^,]+)$/);
  const companyMatch = description.match(/Company:\s*([^,\n]+)/i) || description.match(/Recruiter:\s*([^,\n]+)/i);
  const salaryMatch = description.match(/Salary:\s*([^,\n]+)/i) || description.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i);
  
  const location = locationMatch ? locationMatch[1].trim() : 'UK';
  const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
  const salary = salaryMatch ? cleanSalary(salaryMatch[0]) : null;
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// CV Library-specific parser
function parseCVLibraryJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  const locationMatch = description.match(/Location:\s*([^,\n]+)/i) || title.match(/\s-\s([^-]+)$/);
  const companyMatch = description.match(/Company:\s*([^,\n]+)/i);
  const salaryMatch = description.match(/Salary:\s*([^,\n]+)/i) || description.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i);
  
  const location = locationMatch ? locationMatch[1].trim() : 'UK';
  const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
  const salary = salaryMatch ? cleanSalary(salaryMatch[0]) : null;
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// Jobs.co.uk-specific parser
function parseJobsCoUkJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  const locationMatch = description.match(/Location:\s*([^,\n]+)/i) || title.match(/,\s*([^,]+)$/);
  const companyMatch = description.match(/Company:\s*([^,\n]+)/i);
  const salaryMatch = description.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+)?/i);
  
  const location = locationMatch ? locationMatch[1].trim() : 'UK';
  const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
  const salary = salaryMatch ? cleanSalary(salaryMatch[0]) : null;
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// Generic parser fallback
function parseGenericJob(item: Element, source: string) {
  const title = item.querySelector('title')?.textContent || 'No Title';
  const description = item.querySelector('description')?.textContent || '';
  const link = item.querySelector('link')?.textContent || '#';
  const pubDate = item.querySelector('pubDate')?.textContent || '';

  const location = extractLocationFromTitle(title) || 'UK';
  const company = extractCompanyFromDescription(description) || 'Unknown Company';
  const salary = extractSalaryFromText(title + ' ' + description);
  
  return {
    title: cleanTitle(title),
    description: cleanDescription(description),
    company,
    location,
    salary,
    external_url: link,
    source,
    posted_date: formatDate(pubDate),
    type: determineJobType(title, description),
  };
}

// Utility functions for data cleaning
function cleanTitle(title: string): string {
  return title.replace(/<[^>]*>/g, '').trim().substring(0, 200);
}

function cleanDescription(description: string): string {
  return description.replace(/<[^>]*>/g, '').trim().substring(0, 500);
}

function cleanSalary(salary: string): string {
  return salary.replace(/<[^>]*>/g, '').trim().substring(0, 100);
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function extractLocationFromTitle(title: string): string {
  const locationMatch = title.match(/,\s*([^,]+)$/) || title.match(/\s-\s([^-]+)$/);
  return locationMatch ? locationMatch[1].trim() : 'UK';
}

function extractCompanyFromDescription(description: string): string {
  const companyPatterns = [
    /Company:\s*([^,\n]+)/i,
    /Employer:\s*([^,\n]+)/i,
    /Recruiter:\s*([^,\n]+)/i,
    /<b>([^<]+)<\/b>/,
    /\b([A-Z][a-zA-Z\s&]+(?:Ltd|Limited|plc|PLC|Inc|Corporation))\b/
  ];
  
  for (const pattern of companyPatterns) {
    const match = description.match(pattern);
    if (match) return match[1].trim();
  }
  
  return 'Unknown Company';
}

function extractSalaryFromText(text: string): string | null {
  const salaryMatch = text.match(/£[\d,]+[\s-]*(?:to|-)?\s*£?[\d,]*\s*(?:per\s+\w+|p\/a|pa|per annum)?/i);
  return salaryMatch ? cleanSalary(salaryMatch[0]) : null;
}

// Enhanced job type determination
function determineJobType(title: string, description: string): string {
  const fullText = (title + ' ' + description).toLowerCase();
  
  if (fullText.includes('apprentice') || fullText.includes('trainee') || fullText.includes('graduate')) {
    return 'Apprenticeship';
  } else if (fullText.includes('contract') || fullText.includes('temporary') || fullText.includes('temp') || fullText.includes('freelance') || fullText.includes('consultant')) {
    return 'Contract';
  } else if (fullText.includes('part time') || fullText.includes('part-time') || fullText.includes('weekend')) {
    return 'Part-time';
  } else if (fullText.includes('full time') || fullText.includes('full-time') || fullText.includes('permanent')) {
    return 'Full-time';
  } else {
    return 'Full-time';
  }
}

// Enhanced feed fetching with retry logic and rate limiting
async function fetchFeed(feed: { url: string, source: string, type: string }, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching ${feed.source} (attempt ${attempt + 1}): ${feed.url}`);
      
      // Add rate limiting - wait 2 seconds between feeds
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      const response = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; JobAggregator/1.0)',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const feedText = await response.text();
      
      if (!feedText || feedText.trim().length === 0) {
        throw new Error('Empty response received');
      }
      
      const jobs = await parseJobFeed(feedText, feed.source, feed.type);
      console.log(`✅ Successfully parsed ${jobs.length} jobs from ${feed.source}`);
      return jobs;
      
    } catch (error) {
      console.error(`❌ Attempt ${attempt + 1} failed for ${feed.source}:`, error.message);
      
      if (attempt === retries) {
        console.error(`🔥 All attempts failed for ${feed.source}`);
        return [];
      }
    }
  }
  return [];
}

// Enhanced job insertion with data validation and batch processing
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

  // Check for existing jobs in batches to improve performance
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
    console.log('Starting job listings fetch...');
    
    // Manual trigger requires authentication
    if (req.method === 'POST') {
      // Get the JWT from the request
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Authorization header is required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Process all configured job feeds with enhanced logging
    console.log(`🚀 Processing ${jobFeeds.length} job feeds...`);
    const allJobs = [];
    const feedResults = [];
    
    for (const feed of jobFeeds) {
      const startTime = Date.now();
      const jobs = await fetchFeed(feed);
      const duration = Date.now() - startTime;
      
      const result = {
        source: feed.source,
        type: feed.type,
        jobCount: jobs.length,
        duration: `${duration}ms`,
        success: jobs.length > 0
      };
      
      feedResults.push(result);
      allJobs.push(...jobs);
      
      console.log(`📈 ${feed.source} (${feed.type}): ${jobs.length} jobs in ${duration}ms`);
      
      // Rate limiting between feeds
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Insert new jobs into the database with enhanced result tracking
    console.log(`💾 Processing ${allJobs.length} total jobs for database insertion...`);
    const result = await insertJobs(allJobs);
    
    const summary = {
      totalFeeds: jobFeeds.length,
      totalJobsFound: allJobs.length,
      newJobsInserted: result.count,
      feedBreakdown: feedResults,
      errors: result.errors || [],
      timestamp: new Date().toISOString()
    };
    
    console.log(`✅ Job fetch complete: ${result.count} new jobs inserted`);
    console.log(`📊 Summary:`, JSON.stringify(summary, null, 2));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${allJobs.length} jobs from ${jobFeeds.length} sources, inserted ${result.count} new jobs`,
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
    console.error('Error in job listings fetch:', error);
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
