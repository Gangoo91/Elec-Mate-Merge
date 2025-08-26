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
    const { postcode, radius = 15000, courseType = 'electrical', lat, lng } = await req.json();
    
    if (!postcode && (!lat || !lng)) {
      return new Response(
        JSON.stringify({ error: "Either postcode or coordinates (lat, lng) are required" }),
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

    let location: { lat: number; lng: number };
    let searchLocation = '';

    if (lat && lng) {
      // Use provided coordinates directly
      location = { lat, lng };
      searchLocation = `${lat}, ${lng}`;
      console.log(`Using provided coordinates: ${lat}, ${lng}`);
    } else {
      // Convert postcode → lat/lng
      console.log(`Searching for training providers near: ${postcode} within ${radius}m`);
      
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

      location = geoData.results[0].geometry.location;
      searchLocation = postcode;
      console.log(`Geocoded location: ${location.lat}, ${location.lng}`);
    }

    // 2. Multiple search strategies for comprehensive results
    let allResults: any[] = [];
    
    const searchQueries = [
      `"college" electrical training ${searchLocation}`,
      `"training center" electrical courses ${searchLocation}`,
      `"training centre" electrical courses ${searchLocation}`,
      `"learning center" electrical ${searchLocation}`,
      `"City & Guilds" training center ${searchLocation}`,
      `"EAL" training center ${searchLocation}`,
      `"NICEIC Training" ${searchLocation}`,
      `"Pearson" electrical courses ${searchLocation}`,
      `"university" electrical engineering ${searchLocation}`,
      `"further education college" electrical ${searchLocation}`,
      `"vocational college" electrical ${searchLocation}`,
      `"institute" electrical training ${searchLocation}`,
      `"academy" electrical training ${searchLocation}`
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
              category: getCategoryFromTypes(details.types || []),
              quality_score: 0 // Will be calculated later
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
          category: getCategoryFromTypes(place.types || []),
          quality_score: 0 // Will be calculated later
        };
      })
    );

    // Helper function to categorize providers and filter out non-educational businesses
    function getCategoryFromTypes(types: string[]): string | null {
      // Exclude commercial electrical businesses
      const commercialTypes = ['electrician', 'contractor', 'plumber', 'home_goods_store', 'store', 'hardware_store', 'general_contractor'];
      if (types.some(t => commercialTypes.some(ct => t.includes(ct)))) {
        return null; // Filter out commercial businesses
      }

      // Educational institution types
      if (types.some(t => ['university', 'school'].some(et => t.includes(et)))) return 'University';
      if (types.some(t => ['school', 'secondary_school', 'primary_school'].some(et => t.includes(et)))) return 'College';
      if (types.some(t => ['establishment', 'point_of_interest'].some(et => t.includes(et)))) return 'Training Centre';
      
      return 'Educational Institution';
    }

    // Enhanced filtering for educational institutions
    function isLegitimateTrainingProvider(place: any): boolean {
      const name = place.name?.toLowerCase() || '';
      const address = place.vicinity?.toLowerCase() || '';
      
      // Educational keywords that indicate legitimate training providers
      const educationalKeywords = [
        'college', 'university', 'training', 'centre', 'center', 'institute', 'academy', 
        'school', 'education', 'learning', 'campus', 'city & guilds', 'eal', 'niceic training',
        'pearson', 'btec', 'nvq', 'apprenticeship', 'qualifications'
      ];
      
      // Commercial electrical business patterns to exclude
      const commercialPatterns = [
        'electrical services', 'electrical contractor', 'electrical installation', 
        'electrical repairs', 'electrician', 'electrical solutions', 'electrical maintenance',
        'electrical testing', 'electrical company', 'electrical ltd', 'electrical limited',
        'heating', 'plumbing', 'building services', 'property maintenance', 'solar panels'
      ];
      
      // Check if name contains educational keywords
      const hasEducationalKeywords = educationalKeywords.some(keyword => 
        name.includes(keyword) || address.includes(keyword)
      );
      
      // Check if name contains commercial patterns to exclude
      const hasCommercialPatterns = commercialPatterns.some(pattern => 
        name.includes(pattern) || address.includes(pattern)
      );
      
      // Must have educational keywords and not have commercial patterns
      return hasEducationalKeywords && !hasCommercialPatterns;
    }

    // Calculate quality score for ranking
    function calculateQualityScore(place: any): number {
      let score = 0;
      const name = place.name?.toLowerCase() || '';
      const types = place.types || [];
      
      // Higher score for educational institution types
      if (types.some(t => ['university', 'school'].some(et => t.includes(et)))) score += 50;
      if (types.some(t => ['establishment', 'point_of_interest'].some(et => t.includes(et)))) score += 30;
      
      // Higher score for educational keywords in name
      const premiumKeywords = ['college', 'university', 'training center', 'training centre', 'institute'];
      if (premiumKeywords.some(keyword => name.includes(keyword))) score += 40;
      
      // Higher score for known training providers
      const knownProviders = ['city & guilds', 'eal', 'niceic training', 'pearson'];
      if (knownProviders.some(provider => name.includes(provider))) score += 60;
      
      // Rating bonus
      if (place.rating >= 4.0) score += 20;
      if (place.rating >= 4.5) score += 10;
      
      // Reviews count bonus
      if (place.user_ratings_total >= 10) score += 10;
      if (place.user_ratings_total >= 50) score += 10;
      
      return score;
    }

    // Enhanced filtering and scoring
    const providers = enrichedProviders
      .filter(p => p !== null && p.category !== null) // Filter out commercial businesses
      .filter(p => isLegitimateTrainingProvider(p)) // Additional validation
      .map(p => ({
        ...p,
        quality_score: calculateQualityScore(p)
      }))
      .filter(p => p.quality_score >= 30) // Minimum quality threshold
      .sort((a, b) => {
        // Sort by quality score first, then rating
        if (b.quality_score !== a.quality_score) {
          return b.quality_score - a.quality_score;
        }
        return (b.rating || 0) - (a.rating || 0);
      });

    console.log(`Returning ${providers.length} filtered training providers`);

    return new Response(
      JSON.stringify({ 
        providers: providers,
        search_location: {
          postcode: postcode || null,
          coordinates: { lat: location.lat, lng: location.lng },
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