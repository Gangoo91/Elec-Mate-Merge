import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting nightly job pricing ingest');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const ADZUNA_APP_ID = Deno.env.get('ADZUNA_APP_ID');
    const ADZUNA_APP_KEY = Deno.env.get('ADZUNA_APP_KEY');
    const REED_API_KEY = Deno.env.get('REED_API_KEY');

    if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY || !REED_API_KEY) {
      console.log('Missing API keys - using mock data mode');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'API keys not configured, skipping real data fetch',
          records_processed: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UK regions to fetch data for
    const ukRegions = [
      { name: 'London', location: 'London' },
      { name: 'Manchester', location: 'Manchester' },
      { name: 'Birmingham', location: 'Birmingham' },
      { name: 'Leeds', location: 'Leeds' },
      { name: 'Glasgow', location: 'Glasgow' },
      { name: 'Edinburgh', location: 'Edinburgh' },
      { name: 'Cardiff', location: 'Cardiff' },
      { name: 'Belfast', location: 'Belfast' },
      { name: 'Bristol', location: 'Bristol' },
      { name: 'Liverpool', location: 'Liverpool' }
    ];

    const jobTypes = ['electrician', 'electrical engineer', 'electrical installer', 'electrical technician'];
    let totalRecordsProcessed = 0;

    // Process each region and job type combination
    for (const region of ukRegions) {
      for (const jobType of jobTypes) {
        try {
          console.log(`Processing ${jobType} jobs in ${region.name}`);

          // Fetch from Reed API
          const reedResponse = await fetch(
            `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(jobType)}&locationName=${encodeURIComponent(region.location)}&resultsToTake=20`,
            {
              headers: {
                'Authorization': `Basic ${btoa(REED_API_KEY + ':')}`
              }
            }
          );

          if (reedResponse.ok) {
            const reedData = await reedResponse.json();
            console.log(`Reed API returned ${reedData.results?.length || 0} jobs for ${jobType} in ${region.name}`);

            if (reedData.results && reedData.results.length > 0) {
              // Process Reed data and convert to regional pricing
              const processedJobs = processReedJobs(reedData.results, region.name, jobType);
              
              for (const job of processedJobs) {
                await upsertRegionalPricing(supabase, job);
                totalRecordsProcessed++;
              }
            }
          }

          // Small delay to respect API limits
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
          console.error(`Error processing ${jobType} in ${region.name}:`, error);
        }
      }
    }

    // Update last ingestion timestamp
    await supabase
      .from('pricing_ingest_log')
      .insert({
        ingest_type: 'nightly_job_pricing',
        records_processed: totalRecordsProcessed,
        status: 'completed',
        notes: `Processed ${totalRecordsProcessed} job pricing records`
      });

    console.log(`Nightly ingest completed. Processed ${totalRecordsProcessed} records.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        records_processed: totalRecordsProcessed,
        message: 'Nightly job pricing ingest completed successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in nightly job pricing ingest:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function processReedJobs(jobs: any[], regionName: string, jobType: string) {
  const processedJobs = [];
  const salaries = jobs
    .filter(job => job.minimumSalary && job.maximumSalary)
    .map(job => ({
      min: job.minimumSalary,
      max: job.maximumSalary
    }));

  if (salaries.length === 0) return [];

  // Convert annual salaries to daily rates (assuming 220 working days)
  const dailyRates = salaries.map(salary => ({
    min: Math.round(salary.min / 220),
    max: Math.round(salary.max / 220)
  }));

  // Calculate regional job pricing from daily rates
  const allMins = dailyRates.map(rate => rate.min);
  const allMaxs = dailyRates.map(rate => rate.max);
  
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const averagePrice = Math.round((minPrice + maxPrice) / 2);

  // Map job types to our categories
  const jobTypeMapping = {
    'electrician': 'General Electrical Work',
    'electrical engineer': 'Electrical Design & Installation',
    'electrical installer': 'Installation Services',
    'electrical technician': 'Maintenance & Testing'
  };

  const mappedJobType = jobTypeMapping[jobType] || 'General Electrical Work';

  processedJobs.push({
    region: regionName,
    job_type: mappedJobType,
    job_category: 'electrical_services',
    min_price: minPrice,
    max_price: maxPrice,
    average_price: averagePrice,
    complexity_level: 'standard',
    data_source: 'reed_api',
    confidence_score: Math.min(95, Math.max(60, 70 + salaries.length * 2)) // Higher confidence with more data points
  });

  return processedJobs;
}

async function upsertRegionalPricing(supabase: any, jobData: any) {
  // Check if record exists
  const { data: existing } = await supabase
    .from('regional_job_pricing')
    .select('id')
    .eq('region', jobData.region)
    .eq('job_type', jobData.job_type)
    .single();

  if (existing) {
    // Update existing record
    await supabase
      .from('regional_job_pricing')
      .update({
        ...jobData,
        last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    // Insert new record
    await supabase
      .from('regional_job_pricing')
      .insert(jobData);
  }
}