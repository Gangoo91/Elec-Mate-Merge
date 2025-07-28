
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Get the Reed API key from environment variables
const reedApiKey = Deno.env.get('REED_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('Reed API key available:', !!reedApiKey);
    
    if (!reedApiKey) {
      console.error('Reed API key is not configured or not accessible');
      return new Response(
        JSON.stringify({ error: "Reed API key is not configured. Please add the 'REED_API_KEY' to your Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { keywords, location, distance, permanent, temp, fullTime, partTime, page } = await req.json();
    
    // Base URL for the Reed Jobs API
    const apiUrl = new URL("https://www.reed.co.uk/api/1.0/search");
    
    // Set required parameters - use broader electrical terms if no keywords provided
    const searchKeywords = keywords || "electrical,electrician,electrical engineer,electrical technician";
    apiUrl.searchParams.append("keywords", searchKeywords);
    
    // Add optional parameters if provided
    if (location) apiUrl.searchParams.append("locationName", location);
    if (distance) apiUrl.searchParams.append("distanceFromLocation", distance.toString());
    if (permanent === true) apiUrl.searchParams.append("permanent", "true");
    if (temp === true) apiUrl.searchParams.append("temp", "true");
    if (fullTime === true) apiUrl.searchParams.append("fullTime", "true");
    if (partTime === true) apiUrl.searchParams.append("partTime", "true");
    if (page) apiUrl.searchParams.append("resultsToSkip", ((page - 1) * 100).toString());
    
    // Maximum results per page is 100 for Reed API
    apiUrl.searchParams.append("resultsToTake", "100");
    
    console.log('Fetching jobs from Reed API:', apiUrl.toString());
    
    // Make the request to Reed API with Basic Authentication
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(reedApiKey + ':')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reed API Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: `Error from API: ${response.statusText}`,
          status: response.status,
          details: errorText
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    console.log(`Retrieved ${data.totalResults} jobs from API`);
    
    // Map Reed API response to our job listings format without mentioning source
    const jobs = data.results.map(job => ({
      id: job.jobId.toString(),
      title: job.jobTitle,
      company: job.employerName,
      location: job.locationName,
      salary: job.minimumSalary && job.maximumSalary ? 
        `£${job.minimumSalary.toLocaleString()} - £${job.maximumSalary.toLocaleString()}${job.currency === 'GBP' ? '' : ' ' + job.currency}` :
        job.minimumSalary ? 
          `£${job.minimumSalary.toLocaleString()}${job.currency === 'GBP' ? '' : ' ' + job.currency}` : 
          'Not specified',
      type: job.fullTime ? 'Full-time' : job.partTime ? 'Part-time' : 'Contract',
      description: job.jobDescription,
      external_url: job.jobUrl,
      posted_date: job.datePosted,
      source: null,
      expires_at: job.expirationDate || null,
      is_remote: job.isRemote || false
    }));
    
    return new Response(
      JSON.stringify({ 
        jobs,
        totalResults: data.totalResults,
        currentPage: page || 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in job-listings function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
