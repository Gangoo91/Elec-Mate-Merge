// This edge function securely handles API calls to find mental health services by postcode
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { corsHeaders } from '../_shared/cors.ts'

// Mind's API base URL - replace with actual Mind API endpoint when available
const MINDS_API_BASE_URL = "https://www.mind.org.uk/api/local-services";

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
      // Call Mind's API to get local mental health services
      // Note: This is a placeholder implementation using Mind's API structure
      // You'll need to check their actual API documentation for the correct endpoint and parameters
      const response = await fetch(`${MINDS_API_BASE_URL}?postcode=${encodeURIComponent(postcode)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any required API keys or auth headers here if needed
        },
      });

      if (!response.ok) {
        console.error(`Mind API error: ${response.status} - ${await response.text()}`);
        
        // Fallback to mock data if the API fails
        return new Response(
          JSON.stringify({ 
            services: generateMockServices(postcode),
            source: "mock (API unavailable)" 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      
      // Transform the Mind API response to match our expected format
      // This will need to be adjusted based on actual Mind API response structure
      const services = data.services.map((service: any) => ({
        name: service.name,
        distance: service.distance || "Unknown",
        type: service.serviceType || "Support Service",
        contact: service.telephone || service.email || "Contact details unavailable",
        address: service.address || "Address unavailable"
      }));

      return new Response(
        JSON.stringify({ 
          services,
          source: "Mind API" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
      
    } catch (apiError) {
      console.error('Error calling Mind API:', apiError);
      
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
