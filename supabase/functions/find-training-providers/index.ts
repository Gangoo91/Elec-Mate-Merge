import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postcode, radius = 15000, courseType = 'electrical' } = await req.json();
    
    if (!postcode) {
      return new Response(
        JSON.stringify({ error: "Postcode is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const googleApiKey = Deno.env.get('GoogleAPI');
    if (!googleApiKey) {
      console.error('Google Maps API key not found in environment variables');
      return new Response(
        JSON.stringify({ error: "Google Maps API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for training providers near: ${postcode} within ${radius}m`);

    // 1. Convert postcode → lat/lng
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=${googleApiKey}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return new Response(
        JSON.stringify({ error: "Location not found" }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const location = geoData.results[0].geometry.location;
    console.log(`Geocoded location: ${location.lat}, ${location.lng}`);

    // 2. Multiple search strategies for comprehensive results
    let allResults: any[] = [];
    
    const searchQueries = [
      `City & Guilds electrical training ${postcode}`,
      `EAL electrical qualifications ${postcode}`,
      `NICEIC training center ${postcode}`, 
      `electrical installation courses ${postcode}`,
      `18th Edition training ${postcode}`,
      `electrical apprenticeship provider ${postcode}`,
      `vocational college electrical ${postcode}`,
      `further education college ${postcode}`,
      `training college ${postcode}`,
      `university ${postcode}`
    ];

    console.log(`Searching with ${searchQueries.length} different queries...`);

    // Execute multiple searches to get comprehensive results
    for (const query of searchQueries) {
      try {
        console.log(`Searching: ${query}`);
        const placesRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${location.lat},${location.lng}&radius=${radius}&key=${googleApiKey}`
        );
        const placesData = await placesRes.json();

        if (placesData.status === 'OK' && placesData.results?.length) {
          // Add results with search context
          const resultsWithContext = placesData.results.map((result: any) => ({
            ...result,
            search_context: query
          }));
          allResults = [...allResults, ...resultsWithContext];
          console.log(`Found ${placesData.results.length} results for: ${query}`);
        }
      } catch (error) {
        console.warn(`Search failed for query: ${query}`, error);
      }
    }

    // Remove duplicates based on place_id
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex(r => r.place_id === result.place_id)
    );

    console.log(`Total unique results found: ${uniqueResults.length}`);

    if (!uniqueResults.length) {
      return new Response(
        JSON.stringify({ error: 'No training providers found in your area. Try expanding your search radius or search in a different location.' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404
        }
      );
    }

    // 3. Enrich results with additional details using Place Details API
    const enrichedProviders = await Promise.all(
      uniqueResults.slice(0, 20).map(async (place: any) => { // Limit to 20 for performance
        try {
          // Get detailed information for each place
          const detailsRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,geometry,rating,user_ratings_total,formatted_phone_number,website,opening_hours,business_status,types,price_level,photos&key=${googleApiKey}`
          );
          const detailsData = await detailsRes.json();
          
          if (detailsData.status === 'OK' && detailsData.result) {
            const details = detailsData.result;
            return {
              place_id: place.place_id,
              name: details.name,
              vicinity: details.formatted_address,
              location: details.geometry.location,
              rating: details.rating || 0,
              user_ratings_total: details.user_ratings_total || 0,
              types: details.types || [],
              business_status: details.business_status,
              price_level: details.price_level,
              phone: details.formatted_phone_number,
              website: details.website,
              opening_hours: details.opening_hours,
              photos: details.photos?.slice(0, 3), // First 3 photos
              search_context: place.search_context,
              category: getCategoryFromTypes(details.types || [])
            };
          }
        } catch (error) {
          console.warn(`Failed to get details for ${place.name}:`, error);
        }
        
        // Fallback to basic info if details API fails
        return {
          place_id: place.place_id,
          name: place.name,
          vicinity: place.formatted_address || place.vicinity,
          location: place.geometry.location,
          rating: place.rating || 0,
          user_ratings_total: place.user_ratings_total || 0,
          types: place.types || [],
          business_status: place.business_status,
          search_context: place.search_context,
          category: getCategoryFromTypes(place.types || [])
        };
      })
    );

    // Helper function to categorize providers
    function getCategoryFromTypes(types: string[]): string {
      if (types.some(t => t.includes('university'))) return 'University';
      if (types.some(t => t.includes('school'))) return 'College';
      if (types.some(t => t.includes('establishment'))) return 'Training Centre';
      return 'Educational Institution';
    }

    // Filter out null results and sort by rating
    const providers = enrichedProviders
      .filter(p => p !== null)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));

    console.log(`Returning ${providers.length} filtered training providers`);

    return new Response(
      JSON.stringify({ 
        providers: providers,
        search_location: {
          postcode,
          lat: location.lat,
          lng: location.lng,
          radius_km: radius / 1000
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in find-training-providers:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}