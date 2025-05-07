
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

// RSS feed URLs for job listings
const jobFeeds = [
  {
    url: 'https://www.reed.co.uk/services/jobs/feed?keywords=electrician&location=uk',
    source: 'Reed',
  },
  {
    url: 'https://www.totaljobs.com/job/electrician/electrician-jobs/rss',
    source: 'TotalJobs',
  },
];

// Parse Reed RSS feed jobs
async function parseReedFeed(feedText: string, source: string) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(feedText, 'text/xml');
    if (!xmlDoc) return [];

    const items = Array.from(xmlDoc.querySelectorAll('item'));
    return items.map((item) => {
      const title = item.querySelector('title')?.textContent || 'No Title';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '#';
      const pubDate = item.querySelector('pubDate')?.textContent || '';

      // Extract location, company, and salary from description using regex
      const locationMatch = description.match(/Location: ([^,]+)/i);
      const companyMatch = description.match(/Company: ([^,]+)/i);
      const salaryMatch = description.match(/Salary: ([^,]+)/i);
      
      const location = locationMatch ? locationMatch[1].trim() : 'UK';
      const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
      const salary = salaryMatch ? salaryMatch[1].trim() : null;
      
      // Convert the date string to a proper format
      const postedDate = new Date(pubDate).toISOString().split('T')[0];
      
      return {
        title,
        description: description.replace(/<[^>]*>/g, '').substring(0, 500),
        company,
        location,
        salary,
        external_url: link,
        source,
        posted_date: postedDate,
        type: determineJobType(title, description),
      };
    });
  } catch (error) {
    console.error(`Error parsing ${source} feed:`, error);
    return [];
  }
}

// Determine job type from title and description
function determineJobType(title: string, description: string) {
  const fullText = (title + ' ' + description).toLowerCase();
  
  if (fullText.includes('apprentice') || fullText.includes('trainee')) {
    return 'Apprenticeship';
  } else if (fullText.includes('contract') || fullText.includes('temporary')) {
    return 'Contract';
  } else if (fullText.includes('part time') || fullText.includes('part-time')) {
    return 'Part-time';
  } else {
    return 'Full-time';
  }
}

// Fetch and process an RSS feed
async function fetchFeed(feed: { url: string, source: string }) {
  try {
    const response = await fetch(feed.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${feed.source} feed: ${response.status}`);
    }
    const feedText = await response.text();
    return parseReedFeed(feedText, feed.source);
  } catch (error) {
    console.error(`Error fetching ${feed.source} feed:`, error);
    return [];
  }
}

// Insert jobs into the database
async function insertJobs(jobs: any[]) {
  if (!jobs.length) return { count: 0 };

  // Filter out jobs that already exist in the database (by external_url)
  const newJobs = [];
  for (const job of jobs) {
    const { data, error } = await supabase
      .from('job_listings')
      .select('id')
      .eq('external_url', job.external_url)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking for existing job:', error);
      continue;
    }
    
    if (!data) {
      newJobs.push(job);
    }
  }
  
  if (newJobs.length === 0) {
    return { count: 0 };
  }
  
  const { data, error } = await supabase
    .from('job_listings')
    .insert(newJobs);
  
  if (error) {
    console.error('Error inserting jobs:', error);
    return { count: 0, error };
  }
  
  return { count: newJobs.length };
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

    // Process all configured job feeds
    const allJobs = [];
    for (const feed of jobFeeds) {
      console.log(`Fetching jobs from ${feed.source}...`);
      const jobs = await fetchFeed(feed);
      console.log(`Found ${jobs.length} jobs from ${feed.source}`);
      allJobs.push(...jobs);
    }
    
    // Insert new jobs into the database
    console.log(`Inserting ${allJobs.length} jobs into database...`);
    const result = await insertJobs(allJobs);
    console.log(`Inserted ${result.count} new jobs into database`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${allJobs.length} jobs, inserted ${result.count} new jobs` 
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
