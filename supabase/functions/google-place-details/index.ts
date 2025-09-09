import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceDetails {
  formatted_address: string;
  address_components: AddressComponent[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeId } = await req.json();
    
    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'Place ID is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const googleApiKey = Deno.env.get('GoogleAPI');
    
    if (!googleApiKey) {
      console.error('Google API key not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Google API key not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Get place details
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components&key=${googleApiKey}`;
    
    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Place Details API error:', data);
      return new Response(
        JSON.stringify({ error: 'Place details request failed', status: data.status }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    const place: PlaceDetails = data.result;
    
    // Parse address components
    let streetNumber = '';
    let route = '';
    let locality = '';
    let postalTown = '';
    let administrativeArea1 = '';
    let postalCode = '';
    let country = '';

    place.address_components.forEach((component: AddressComponent) => {
      const types = component.types;
      
      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        route = component.long_name;
      } else if (types.includes('locality')) {
        locality = component.long_name;
      } else if (types.includes('postal_town')) {
        postalTown = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        administrativeArea1 = component.long_name;
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name;
      } else if (types.includes('country')) {
        country = component.long_name;
      }
    });

    // Construct address object
    const line1 = [streetNumber, route].filter(Boolean).join(' ');
    const town = postalTown || locality;
    
    const address = {
      line_1: line1,
      line_2: locality && locality !== postalTown ? locality : '',
      post_town: town,
      postcode: postalCode,
      county: administrativeArea1,
      formatted_address: place.formatted_address
    };

    return new Response(
      JSON.stringify({ address }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in google-place-details:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch place details' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})