
// This edge function securely handles API calls to find mental health services by postcode
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

// Google Places API configuration
const GOOGLE_PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_MAPS_API_KEY = Deno.env.get("GoogleAPI") || "";

// Types for better code organization
interface LocalResource {
  name: string;
  distance: string;
  type: string;
  contact?: string;
  address?: string;
  open_now?: boolean;
}

interface PlaceDetails {
  formatted_phone_number?: string;
  website?: string;
  formatted_address?: string;
}

// Set up CORS to allow requests from our app
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postcode } = await req.json();
    
    // Validate input
    const validationError = validatePostcode(postcode);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    try {
      console.log("Using API key:", GOOGLE_MAPS_API_KEY ? "API key exists" : "No API key found");
      
      // Step 1: Convert postcode to coordinates
      const { latitude, longitude, error: postcodeError } = await getCoordinatesFromPostcode(postcode);
      if (postcodeError) {
        throw new Error(postcodeError);
      }
      
      // Step 2: Search for mental health services near the coordinates
      const { services, error: searchError, status } = await searchMentalHealthServices(latitude || 0, longitude || 0);
      if (searchError) {
        throw new Error(searchError);
      }
      
      return new Response(
        JSON.stringify({ services, source: "Google Places API" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
      
    } catch (apiError) {
      console.error('Error calling external APIs:', apiError);
      
      // Fallback to mock data if the API call fails
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
    return createErrorResponse(error instanceof Error ? error.message : 'Unknown error occurred', 500);
  }
});

// Validate the postcode format
function validatePostcode(postcode: string): string | null {
  if (!postcode) {
    return 'Postcode is required';
  }
  
  // Validate UK postcode format
  const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  if (!postcodePattern.test(postcode)) {
    return 'Invalid UK postcode format';
  }
  
  return null;
}

// Create a standardized error response
function createErrorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status 
    }
  );
}

// Convert postcode to latitude and longitude using postcodes.io
async function getCoordinatesFromPostcode(postcode: string): Promise<{latitude?: number, longitude?: number, error?: string}> {
  try {
    const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    
    if (!postcodeResponse.ok) {
      return { error: `Postcode API error: ${postcodeResponse.status}` };
    }
    
    const postcodeData = await postcodeResponse.json();
    const { latitude, longitude } = postcodeData.result;
    
    if (!latitude || !longitude) {
      return { error: 'Could not get coordinates for this postcode' };
    }
    
    return { latitude, longitude };
  } catch (error) {
    return { error: `Failed to get coordinates: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

// Search for mental health services near the given coordinates
async function searchMentalHealthServices(latitude: number, longitude: number): Promise<{services?: LocalResource[], error?: string, status?: string}> {
  try {
    // Search for nearby places
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
      return { error: `Google Places API error: ${placesResponse.status}` };
    }
    
    const placesData = await placesResponse.json();
    
    // Log the Google Places API response status for debugging
    console.log("Google Places API response status:", placesData.status);
    
    if (placesData.status !== "OK" && placesData.status !== "ZERO_RESULTS") {
      console.error("Google Places API error:", placesData);
      return { 
        error: `Google Places API returned status: ${placesData.status}`, 
        status: placesData.status 
      };
    }
    
    // Transform each place result into our LocalResource format
    const services = await Promise.all(
      (placesData.results || [])
        .slice(0, 5)
        .map(async (place: any) => await transformPlaceToResource(place, latitude, longitude))
    );

    return { services };
  } catch (error) {
    return { error: `Error searching for services: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

// Transform a Google Place result into our LocalResource format
async function transformPlaceToResource(place: any, userLat: number, userLng: number): Promise<LocalResource> {
  // Get additional place details for contact information
  const details = await getPlaceDetails(place.place_id);
  
  // Calculate distance in miles
  const distance = calculateDistance(
    userLat, 
    userLng, 
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
}

// Get additional details for a place using its ID
async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  try {
    const detailsParams = new URLSearchParams({
      place_id: placeId,
      fields: 'name,formatted_address,formatted_phone_number,website,opening_hours',
      key: GOOGLE_MAPS_API_KEY
    });
    
    const detailsResponse = await fetch(
      `${GOOGLE_PLACES_API_BASE_URL}/details/json?${detailsParams.toString()}`
    );
    
    if (!detailsResponse.ok) {
      return {};
    }
    
    const detailsData = await detailsResponse.json();
    if (detailsData.status === "OK") {
      return detailsData.result;
    }
    
    return {};
  } catch (error) {
    console.error(`Error fetching place details for ${placeId}:`, error);
    return {};
  }
}

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

// Generate mock services as a fallback
function generateMockServices(postcode: string): LocalResource[] {
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
