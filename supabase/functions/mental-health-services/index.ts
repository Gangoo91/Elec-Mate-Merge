
// This edge function securely handles API calls to find mental health services by postcode
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

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

    // In a production environment, we would call an actual API here
    // For now, we'll return realistic mock data based on the first character of the postcode
    // This simulates different results based on location
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

    return new Response(
      JSON.stringify({ services: mockServices }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})
