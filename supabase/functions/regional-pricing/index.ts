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

    // If still no results, provide fallback using baseline pricing + regional multipliers
    if (results.length === 0) {
      console.log('No exact matches found, providing fallback data using baseline prices');
      isApproximate = true;
      
      // Get baseline job pricing
      let baselineQuery = supabase.from('job_pricing_baseline').select('*');
      if (jobType && jobType !== 'all') {
        baselineQuery = baselineQuery.ilike('job_type', `%${jobType}%`);
      }
      
      const { data: baselineData } = await baselineQuery;
      
      // Get regional multipliers
      let multiplier = 1.0;
      if (geocodeData?.success) {
        const { region, county } = geocodeData.location;
        const { data: multiplierData } = await supabase
          .from('regional_multipliers')
          .select('*')
          .or(`region.ilike.%${region}%,county.ilike.%${county}%`)
          .limit(1);
        
        if (multiplierData && multiplierData.length > 0) {
          multiplier = multiplierData[0].multiplier;
          console.log(`Using regional multiplier: ${multiplier} for ${region}/${county}`);
        }
      } else {
        // Fallback multiplier based on location text patterns
        const locationLower = location.toLowerCase();
        if (locationLower.includes('london') || locationLower.includes('se1') || locationLower.includes('sw1')) {
          multiplier = 1.45; // London premium
        } else if (locationLower.includes('manchester') || locationLower.includes('birmingham') || locationLower.includes('leeds')) {
          multiplier = 1.1; // Major cities
        } else if (locationLower.includes('scotland') || locationLower.includes('wales')) {
          multiplier = 0.9; // Scotland/Wales adjustment
        }
      }
      
      // Transform baseline data to regional format
      results = (baselineData || []).map(item => ({
        id: `baseline-${item.id}`,
        region: geocodeData?.location?.region || 'UK Average',
        county: geocodeData?.location?.county || null,
        job_type: item.job_type,
        job_category: item.job_category,
        min_price: Math.round(item.base_price * multiplier * 0.8), // -20% for min
        max_price: Math.round(item.base_price * multiplier * 1.2), // +20% for max
        average_price: Math.round(item.base_price * multiplier),
        currency: item.currency,
        unit: item.unit,
        complexity_level: item.complexity_level,
        last_updated: new Date().toISOString(),
        data_source: 'computed_from_baseline',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }

    // Add confidence scores and approximation flags
    results = results.map(result => ({
      ...result,
      confidence_score: result.data_source === 'market_research' ? 85 : 
                       result.data_source === 'reed_api' ? 90 :
                       result.data_source === 'computed' ? 60 : 70,
      is_approximate: result.data_source === 'computed' || result.data_source === 'heuristic'
    }));

    console.log(`Returning ${results.length} pricing results, isApproximate: ${isApproximate}`);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        isApproximate,
        location: geocodeData?.location || null,
        searchLocation: location,
        jobType: jobType || 'all',
        confidence_notes: results.length > 0 ? 
          `Data confidence varies by source: Market research (85%), API data (90%), Computed estimates (60%)` :
          'No data available for this location'
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