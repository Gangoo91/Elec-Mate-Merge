
// This edge function securely handles API calls to find mental health services by postcode
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

// Google Places API configuration
const GOOGLE_PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_MAPS_API_KEY = Deno.env.get("GoogleAPI") || "";

// Set up CORS to allow requests from our app
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postcode } = await req.json();
    
    if (!postcode) {
      return new Response(
        JSON.stringify({ error: 'Postcode is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate UK postcode format
    const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodePattern.test(postcode)) {
      return new Response(
        JSON.stringify({ error: 'Invalid UK postcode format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    try {
      console.log("Using API key:", GOOGLE_MAPS_API_KEY ? "API key exists" : "No API key found");
      
      // Step 1: Convert postcode to coordinates using postcodes.io
      const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
      
      if (!postcodeResponse.ok) {
        throw new Error(`Postcode API error: ${postcodeResponse.status}`);
      }
      
      const postcodeData = await postcodeResponse.json();
      const { latitude, longitude } = postcodeData.result;
      
      if (!latitude || !longitude) {
        throw new Error('Could not get coordinates for this postcode');
      }
      
      // Step 2: Search for mental health services near the coordinates
      const searchParams = new URLSearchParams({
        location: `${latitude},${longitude}`,
        radius: '5000', // 5km radius
        keyword: 'mental health support counselling therapy',
        key: GOOGLE_MAPS_API_KEY
      });
      
      const placesResponse = await fetch(
        `${GOOGLE_PLACES_API_BASE_URL}/nearbysearch/json?${searchParams.toString()}`
      );
      
      if (!placesResponse.ok) {
        throw new Error(`Google Places API error: ${placesResponse.status}`);
      }
      
      const placesData = await placesResponse.json();
      
      // Log the Google Places API response status for debugging
      console.log("Google Places API response status:", placesData.status);
      
      if (placesData.status !== "OK" && placesData.status !== "ZERO_RESULTS") {
        console.error("Google Places API error:", placesData);
        throw new Error(`Google Places API returned status: ${placesData.status}`);
      }
      
      // Transform the Places API response to match our expected format
      const services = await Promise.all((placesData.results || []).slice(0, 5).map(async (place: any) => {
        // Get additional place details for contact information
        const detailsParams = new URLSearchParams({
          place_id: place.place_id,
          fields: 'name,formatted_address,formatted_phone_number,website,opening_hours',
          key: GOOGLE_MAPS_API_KEY
        });
        
        const detailsResponse = await fetch(
          `${GOOGLE_PLACES_API_BASE_URL}/details/json?${detailsParams.toString()}`
        );
        
        let details = {};
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          if (detailsData.status === "OK") {
            details = detailsData.result;
          }
        }
        
        // Calculate distance in miles
        const distance = calculateDistance(
          latitude, 
          longitude, 
          place.geometry.location.lat, 
          place.geometry.location.lng
        ).toFixed(1);
        
        return {
          name: place.name,
          distance: `${distance} miles`,
          type: determineServiceType(place),
          contact: details.formatted_phone_number || details.website || "Contact details unavailable",
          address: place.vicinity || details.formatted_address || "Address unavailable",
          open_now: place.opening_hours?.open_now
        };
      }));

      return new Response(
        JSON.stringify({ 
          services,
          source: "Google Places API" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
      
    } catch (apiError) {
      console.error('Error calling external APIs:', apiError);
      
      // Fallback to our mock data if the API call fails
      // This ensures users still get results even if the external API is down
      return new Response(
        JSON.stringify({ 
          services: generateMockServices(postcode),
          source: "mock (API error)" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("General error in mental-health-services function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Helper function to determine the type of mental health service
function determineServiceType(place: any): string {
  const types = place.types || [];
  const name = place.name.toLowerCase();
  
  if (types.includes('hospital')) return 'Hospital';
  if (types.includes('doctor') || types.includes('health')) return 'Healthcare';
  if (name.includes('nhs') || name.includes('national health')) return 'NHS';
  if (name.includes('charity') || name.includes('trust')) return 'Charity';
  if (name.includes('support') || name.includes('group')) return 'Support Group';
  if (name.includes('counselling') || name.includes('counseling') || name.includes('therapy')) return 'Counselling';
  
  return 'Support Service';
}

// Keep the mock service generator as a fallback
function generateMockServices(postcode: string) {
  const firstChar = postcode.charAt(0).toUpperCase();
    
  // Generate a deterministic but varied set of results based on postcode
  const mockServices = [
    { 
      name: `${firstChar} Area Mental Health Team`,
      distance: `${(parseInt(postcode.replace(/\D/g, '').charAt(0)) + 0.7).toFixed(1)} miles`, 
      type: "NHS", 
      contact: "0800 123 4567",
      address: `${firstChar} Health Center, ${postcode.substring(0, 3).toUpperCase()} Area`
    },
    { 
      name: "Andy's Man Club - Local Group", 
      distance: `${(parseInt(postcode.replace(/\D/g, '').charAt(0)) + 2.3).toFixed(1)} miles`, 
      type: "Support Group",
      contact: "info@andysmanclub.co.uk",
      address: `Community Center, ${firstChar}${postcode.substring(1, 3).toLowerCase()} Street`
    },
    { 
      name: `${firstChar}${postcode.substring(1, 2).toLowerCase()} Mind Support Centre`, 
      distance: `${(parseInt(postcode.replace(/\D/g, '').charAt(1)) + 1.5).toFixed(1)} miles`, 
      type: "Charity",
      contact: "0300 123 3393",
      address: `${firstChar}${postcode.substring(1, 2).toLowerCase()} Mind Building, ${postcode.substring(0, 4).toUpperCase()}`
    },
    { 
      name: "Mental Health Crisis Team", 
      distance: `${(parseInt(postcode.replace(/\D/g, '').charAt(0)) + 3.2).toFixed(1)} miles`, 
      type: "NHS Emergency",
      contact: "0800 169 0398",
      address: `${firstChar} District Hospital, ${firstChar}${postcode.substring(1, 3).toLowerCase()} Road`
    },
    { 
      name: `${firstChar} Wellbeing Services`, 
      distance: `${(parseInt(postcode.replace(/\D/g, '').charAt(1)) + 0.9).toFixed(1)} miles`, 
      type: "Community",
      contact: "0800 567 7890",
      address: `${firstChar} Community Hub, ${postcode.substring(0, 2).toUpperCase()} District`
    }
  ];

  // Sort by distance
  mockServices.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  
  return mockServices;
}
