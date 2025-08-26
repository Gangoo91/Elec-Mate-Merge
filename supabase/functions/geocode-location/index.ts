import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory cache for geocoding results
const geocodeCache = new Map<string, {
  data: any;
  timestamp: number;
  ttl: number;
}>();

const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

const normalizeLocation = (location: string): string => {
  return location.toLowerCase().trim().replace(/\s+/g, ' ');
};

const getCachedResult = (location: string) => {
  const normalized = normalizeLocation(location);
  const cached = geocodeCache.get(normalized);
  
  if (!cached) return null;
  
  const now = Date.now();
  if (now > cached.timestamp + cached.ttl) {
    geocodeCache.delete(normalized);
    return null;
  }
  
  console.log(`Cache hit for location: ${location}`);
  return cached.data;
};

const setCachedResult = (location: string, data: any) => {
  const normalized = normalizeLocation(location);
  geocodeCache.set(normalized, {
    data,
    timestamp: Date.now(),
    ttl: CACHE_TTL
  });
  
  // Clean up old cache entries periodically
  if (geocodeCache.size > 1000) {
    const now = Date.now();
    for (const [key, value] of geocodeCache.entries()) {
      if (now > value.timestamp + value.ttl) {
        geocodeCache.delete(key);
      }
    }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check cache first
    const cachedResult = getCachedResult(location);
    if (cachedResult) {
      return new Response(
        JSON.stringify(cachedResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const googleApiKey = Deno.env.get('GoogleAPI');
    if (!googleApiKey) {
      console.error('Google API key not found');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Geocoding location (cache miss): ${location}`);

    // Use Google Geocoding API to convert location to coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&region=uk&key=${googleApiKey}`;
    
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
      console.log('Geocoding failed:', geocodeData.status);
      return new Response(
        JSON.stringify({ error: 'Location not found', details: 'Please try a different postcode or town name' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = geocodeData.results[0];
    const { lat, lng } = result.geometry.location;
    
    // Extract county and region from address components
    let county = '';
    let region = '';
    let formattedAddress = result.formatted_address;

    for (const component of result.address_components) {
      const types = component.types;
      
      if (types.includes('administrative_area_level_2')) {
        county = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        region = component.long_name;
      }
    }

    // Map UK regions to our database regions
    const regionMapping: { [key: string]: string } = {
      'England': 'England',
      'Scotland': 'Scotland',
      'Wales': 'Wales',
      'Northern Ireland': 'Northern Ireland',
      'Greater London': 'London',
      'London': 'London'
    };

    let mappedRegion = regionMapping[region] || region;
    
    // If in England, try to map to more specific regions
    if (mappedRegion === 'England') {
      const countyToRegion: { [key: string]: string } = {
        'Greater Manchester': 'North West',
        'Lancashire': 'North West',
        'Merseyside': 'North West',
        'Cumbria': 'North West',
        'West Yorkshire': 'Yorkshire',
        'South Yorkshire': 'Yorkshire',
        'North Yorkshire': 'Yorkshire',
        'Tyne and Wear': 'North East',
        'Durham': 'North East',
        'Northumberland': 'North East',
        'West Midlands': 'West Midlands',
        'Warwickshire': 'West Midlands',
        'Nottinghamshire': 'East Midlands',
        'Leicestershire': 'East Midlands',
        'Kent': 'South East',
        'Surrey': 'South East',
        'Essex': 'South East',
        'Devon': 'South West',
        'Cornwall': 'South West',
        'Somerset': 'South West'
      };
      
      mappedRegion = countyToRegion[county] || 'England';
    }

    console.log(`Geocoded successfully: ${location} -> ${lat}, ${lng} (${mappedRegion}, ${county})`);

    const result = {
      success: true,
      location: {
        lat,
        lng,
        county,
        region: mappedRegion,
        formattedAddress
      }
    };

    // Cache the successful result
    setCachedResult(location, result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in geocode-location function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});