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

    // 2. Get nearby training providers
    const keywords = [
      'electrical training',
      'electrical course',
      'electrical qualification',
      'apprenticeship',
      'vocational training',
      'electrician course',
      'city guilds',
      'electrical college'
    ];

    const searchKeyword = keywords.join('|');
    
    const placesRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=university|school|point_of_interest&keyword=${encodeURIComponent(searchKeyword)}&key=${googleApiKey}`
    );
    const placesData = await placesRes.json();

    if (placesData.status !== 'OK') {
      console.error('Places API error:', placesData);
      return new Response(
        JSON.stringify({ error: `Places API error: ${placesData.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${placesData.results?.length || 0} potential training providers`);

    // 3. Transform into course schema and filter relevant results
    const results = placesData.results
      .filter(place => {
        const name = place.name?.toLowerCase() || '';
        const types = place.types?.join(' ').toLowerCase() || '';
        
        // Filter for educational/training related places
        return (
          name.includes('college') ||
          name.includes('university') ||
          name.includes('training') ||
          name.includes('education') ||
          name.includes('apprentice') ||
          name.includes('electrical') ||
          name.includes('technical') ||
          name.includes('vocational') ||
          types.includes('school') ||
          types.includes('university') ||
          types.includes('establishment')
        );
      })
      .slice(0, 15)
      .map((place, index) => {
        // Calculate distance from search location
        const distance = calculateDistance(
          location.lat,
          location.lng,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        // Infer course category based on place details
        const inferCategory = (name: string, types: string[]) => {
          const nameLC = name.toLowerCase();
          const typesStr = types.join(' ').toLowerCase();
          
          if (nameLC.includes('university') || typesStr.includes('university')) {
            return 'Essential Qualifications';
          } else if (nameLC.includes('college') || nameLC.includes('technical')) {
            return 'Specialised Skills';
          } else if (nameLC.includes('apprentice')) {
            return 'Business & Management';
          } else {
            return 'Safety & Compliance';
          }
        };

        return {
          id: `places_${place.place_id}`,
          category: inferCategory(place.name, place.types || []),
          rating: place.rating || null,
          title: `Electrical Training at ${place.name}`,
          provider: place.name,
          description: `Training provider offering electrical courses and qualifications. ${place.types ? place.types.join(', ') : 'Educational establishment'}`,
          duration: "Varies by course",
          level: "All levels",
          format: "In-person",
          nextStartDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
          locations: [place.vicinity || place.formatted_address || 'Location available'],
          price: "Contact provider for pricing",
          accreditations: ["Google Verified Place"],
          external_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          source: 'google_places',
          place_id: place.place_id,
          google_rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          distance_miles: Math.round(distance * 10) / 10,
          business_status: place.business_status,
          opening_hours: place.opening_hours,
          phone: null, // Would need Place Details API for this
          website: null // Would need Place Details API for this
        };
      });

    console.log(`Returning ${results.length} filtered training providers`);

    return new Response(
      JSON.stringify({ 
        providers: results,
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