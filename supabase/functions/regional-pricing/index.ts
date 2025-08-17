import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, jobType } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`Fetching regional pricing for location: ${location}, jobType: ${jobType || 'all'}`);

    // First, try to geocode the location
    const geocodeResponse = await fetch(`${supabaseUrl}/functions/v1/geocode-location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ location })
    });

    let geocodeData = null;
    if (geocodeResponse.ok) {
      geocodeData = await geocodeResponse.json();
      console.log('Geocoded location:', geocodeData);
    } else {
      console.log('Geocoding failed, will try text search');
    }

    // Build query for regional pricing
    let query = supabase
      .from('regional_job_pricing')
      .select('*')
      .eq('is_active', true);

    // Add job type filter if specified
    if (jobType && jobType !== 'all') {
      query = query.ilike('job_type', `%${jobType}%`);
    }

    let results: any[] = [];
    let isApproximate = false;

    // Try exact matches first
    if (geocodeData?.success) {
      const { region, county } = geocodeData.location;
      
      // Try region match
      const { data: regionData } = await query.ilike('region', `%${region}%`);
      if (regionData && regionData.length > 0) {
        results = regionData;
        console.log(`Found ${results.length} results for region: ${region}`);
      }
      
      // Try county match if region didn't work
      if (results.length === 0 && county) {
        const { data: countyData } = await query.ilike('county', `%${county}%`);
        if (countyData && countyData.length > 0) {
          results = countyData;
          console.log(`Found ${results.length} results for county: ${county}`);
        }
      }
    }

    // If no geocoding or no results, try text search
    if (results.length === 0) {
      const { data: textSearchData } = await query.or(`region.ilike.%${location}%,county.ilike.%${location}%`);
      if (textSearchData && textSearchData.length > 0) {
        results = textSearchData;
        console.log(`Found ${results.length} results for text search: ${location}`);
      }
    }

    // If still no results, provide fallback regional data
    if (results.length === 0) {
      console.log('No exact matches found, providing fallback data');
      isApproximate = true;
      
      // Get national average data or most common job types
      const { data: fallbackData } = await query.limit(10);
      results = fallbackData || [];
      
      // Apply regional multiplier based on location patterns
      const locationLower = location.toLowerCase();
      let multiplier = 1.0;
      
      if (locationLower.includes('london') || locationLower.includes('se1') || locationLower.includes('sw1')) {
        multiplier = 1.3; // London premium
      } else if (locationLower.includes('manchester') || locationLower.includes('birmingham') || locationLower.includes('leeds')) {
        multiplier = 1.1; // Major cities
      } else if (locationLower.includes('scotland') || locationLower.includes('wales')) {
        multiplier = 0.9; // Scotland/Wales adjustment
      }
      
      // Apply multiplier to prices
      results = results.map(item => ({
        ...item,
        min_price: Math.round(item.min_price * multiplier),
        max_price: Math.round(item.max_price * multiplier),
        average_price: Math.round(item.average_price * multiplier),
        id: `approx-${item.id}`, // Mark as approximate
        region: `${item.region} (Approximate)`,
        data_source: 'approximate'
      }));
    }

    console.log(`Returning ${results.length} pricing results, isApproximate: ${isApproximate}`);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        isApproximate,
        location: geocodeData?.location || null,
        searchLocation: location,
        jobType: jobType || 'all'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in regional-pricing function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});