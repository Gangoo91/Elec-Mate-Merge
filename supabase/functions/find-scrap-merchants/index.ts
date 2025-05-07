
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
    const MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');
    
    if (!MAPS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Maps API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // First, geocode the postcode to get coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode + ', UK')}&key=${MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    
    if (geocodeData.status !== 'OK' || !geocodeData.results || geocodeData.results.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Could not find location for this postcode', details: geocodeData }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { lat, lng } = geocodeData.results[0].geometry.location;
    
    // Now search for nearby scrap merchants
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&keyword=scrap%20metal%20merchant&key=${MAPS_API_KEY}`;
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();
    
    if (placesData.status !== 'OK') {
      return new Response(
        JSON.stringify({ error: 'Could not find scrap merchants', details: placesData }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    
    console.log(`Found ${merchants.length} scrap merchants near ${postcode}`);
    
    return new Response(
      JSON.stringify({ merchants }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error searching for scrap merchants:", error);
    
    return new Response(
      JSON.stringify({ error: 'Error searching for scrap merchants', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
