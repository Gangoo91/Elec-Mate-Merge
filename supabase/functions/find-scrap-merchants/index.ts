
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request data
    const { postcode } = await req.json();
    
    if (!postcode) {
      return new Response(
        JSON.stringify({ error: 'Postcode is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get the Google Maps API key from Supabase secrets
    const MAPS_API_KEY = Deno.env.get('GoogleAPI');
    
    if (!MAPS_API_KEY) {
      console.error('[FIND-SCRAP-MERCHANTS] API key not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Maps API key not configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`[FIND-SCRAP-MERCHANTS] Using API key found in secrets: ${MAPS_API_KEY ? 'Yes (key exists)' : 'No'}`);
    console.log(`[FIND-SCRAP-MERCHANTS] Searching for merchants near postcode: ${postcode}`);
    
    // First, geocode the postcode to get coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode + ', UK')}&key=${MAPS_API_KEY}`;
    
    console.log(`[FIND-SCRAP-MERCHANTS] Calling Geocoding API for postcode: ${postcode}`);
    
    const geocodeResponse = await fetch(geocodeUrl);
    
    if (!geocodeResponse.ok) {
      console.error(`[FIND-SCRAP-MERCHANTS] HTTP error when calling Geocoding API: ${geocodeResponse.status}`);
      return new Response(
        JSON.stringify({ error: `Failed to call Geocoding API: ${geocodeResponse.statusText}` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const geocodeData = await geocodeResponse.json();
    
    console.log(`[FIND-SCRAP-MERCHANTS] Geocode API response status: ${geocodeData.status}`);
    if (geocodeData.error_message) {
      console.error(`[FIND-SCRAP-MERCHANTS] Geocode API error message: ${geocodeData.error_message}`);
    }
    
    if (geocodeData.status !== 'OK' || !geocodeData.results || geocodeData.results.length === 0) {
      const errorDetails = geocodeData.error_message || 'No location found for this postcode';
      console.error(`[FIND-SCRAP-MERCHANTS] Geocoding API error: ${errorDetails}`);
      
      return new Response(
        JSON.stringify({ 
          error: 'Could not find location for this postcode', 
          details: {
            status: geocodeData.status,
            message: errorDetails
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { lat, lng } = geocodeData.results[0].geometry.location;
    console.log(`[FIND-SCRAP-MERCHANTS] Location found - Lat: ${lat}, Lng: ${lng}`);
    
    // Now search for nearby scrap merchants
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&keyword=scrap%20metal%20merchant&key=${MAPS_API_KEY}`;
    
    console.log(`[FIND-SCRAP-MERCHANTS] Calling Places API for location coordinates`);
    
    const placesResponse = await fetch(placesUrl);
    
    if (!placesResponse.ok) {
      console.error(`[FIND-SCRAP-MERCHANTS] HTTP error when calling Places API: ${placesResponse.status}`);
      return new Response(
        JSON.stringify({ 
          error: `Failed to call Places API: ${placesResponse.statusText}`,
          note: "You may need to enable the Places API in your Google Cloud Console"
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const placesData = await placesResponse.json();
    
    console.log(`[FIND-SCRAP-MERCHANTS] Places API response status: ${placesData.status}`);
    if (placesData.error_message) {
      console.error(`[FIND-SCRAP-MERCHANTS] Places API error message: ${placesData.error_message}`);
    }
    
    if (placesData.status !== 'OK') {
      // If no results found but API worked, return empty array instead of error
      if (placesData.status === 'ZERO_RESULTS') {
        console.log('[FIND-SCRAP-MERCHANTS] No scrap merchants found in this area');
        return new Response(
          JSON.stringify({ merchants: [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorDetails = placesData.error_message || 'Error with Places API';
      console.error(`[FIND-SCRAP-MERCHANTS] Places API error: ${errorDetails}`);
      
      if (placesData.status === 'REQUEST_DENIED') {
        return new Response(
          JSON.stringify({ 
            error: 'Places API request was denied', 
            details: {
              status: placesData.status,
              message: errorDetails || "You may need to enable the Places API in your Google Cloud Console"
            }
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Could not find scrap merchants', 
          details: {
            status: placesData.status,
            message: errorDetails
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Process the results into our format
    const merchants = placesData.results.map((place: any, index: number) => {
      // Calculate distance (would be more accurate with proper route calculation)
      const distance = calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);
      
      return {
        id: index + 1,
        name: place.name,
        address: place.vicinity,
        distance: `${distance.toFixed(1)} miles`,
        phone: place.formatted_phone_number || 'Not available',
        rating: place.rating || 4.0,
        openNow: place.opening_hours?.open_now ?? false,
        paymentMethods: ["Cash", "Bank Transfer"], // Default as this info isn't in Places API
        acceptedMaterials: ["Copper", "Brass", "Aluminum", "Steel"], // Default materials
        placeId: place.place_id,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      };
    });
    
    console.log(`[FIND-SCRAP-MERCHANTS] Found ${merchants.length} scrap merchants near ${postcode}`);
    
    return new Response(
      JSON.stringify({ merchants }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("[FIND-SCRAP-MERCHANTS] Error searching for scrap merchants:", error);
    
    return new Response(
      JSON.stringify({ error: 'Error searching for scrap merchants', details: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Calculate distance between two points in miles using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c;
  return distance;
}
