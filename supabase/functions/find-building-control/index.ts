import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BuildingControlResult {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  distanceText?: string;
}

/**
 * Extract postcode components from an address/postcode string
 * Returns the outcode (e.g., "SW1A" from "SW1A 1AA") and area (e.g., "SW")
 */
function extractPostcodeInfo(input: string): { outcode: string; area: string } | null {
  const clean = input.trim().toUpperCase().replace(/[^A-Z0-9\s]/g, '');

  // UK postcode regex - matches full postcodes or just outcodes
  const fullPostcodeMatch = clean.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})?/);

  if (fullPostcodeMatch) {
    const outcode = fullPostcodeMatch[1];
    const area = outcode.replace(/\d+[A-Z]?$/, ''); // Remove numbers to get area (e.g., "SW" from "SW1A")
    return { outcode, area };
  }

  return null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();

    if (!address || typeof address !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Address or postcode is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[FIND-BUILDING-CONTROL] Searching for: ${address}`);

    // Extract postcode info
    const postcodeInfo = extractPostcodeInfo(address);

    if (!postcodeInfo) {
      // Try to geocode the address to find the local authority
      console.log(`[FIND-BUILDING-CONTROL] No postcode found in input, trying geocode`);

      return new Response(
        JSON.stringify({
          results: [],
          message: 'Please enter a valid UK postcode (e.g., SW1A 1AA or CA25 5EL)'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { outcode, area } = postcodeInfo;
    console.log(`[FIND-BUILDING-CONTROL] Extracted outcode: ${outcode}, area: ${area}`);

    // Create Supabase client with service role for database access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try to find building control authorities by postcode prefix
    // First try the full outcode, then fall back to the area
    const searchTerms = [outcode, area];
    let results: BuildingControlResult[] = [];

    for (const term of searchTerms) {
      if (results.length > 0) break;

      console.log(`[FIND-BUILDING-CONTROL] Searching with term: ${term}`);

      const { data, error } = await supabase
        .from('building_control_authorities')
        .select('*')
        .or(`postcode_prefixes.cs.{${term}},postcode_area.ilike.%${term}%,authority_name.ilike.%${term}%`)
        .limit(10);

      if (error) {
        console.error(`[FIND-BUILDING-CONTROL] Database error:`, error);
        // Try simpler query
        const { data: simpleData, error: simpleError } = await supabase
          .from('building_control_authorities')
          .select('*')
          .limit(10);

        if (!simpleError && simpleData) {
          // Filter manually
          results = simpleData
            .filter((row: any) => {
              const prefixes = row.postcode_prefixes || [];
              return prefixes.some((p: string) =>
                p.toUpperCase().startsWith(term) || term.startsWith(p.toUpperCase())
              );
            })
            .map((row: any) => ({
              name: row.authority_name || row.name || 'Building Control',
              address: row.address || row.contact_address || '',
              phone: row.phone || row.contact_phone || undefined,
              website: row.website || row.contact_website || undefined,
            }));
        }
      } else if (data && data.length > 0) {
        results = data.map((row: any) => ({
          name: row.authority_name || row.name || 'Building Control',
          address: row.address || row.contact_address || '',
          phone: row.phone || row.contact_phone || undefined,
          website: row.website || row.contact_website || undefined,
        }));
      }
    }

    // If still no results, try using postcodes.io to get the local authority
    if (results.length === 0) {
      console.log(`[FIND-BUILDING-CONTROL] No database results, trying postcodes.io`);

      try {
        const postcodeResponse = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(address.replace(/\s+/g, ''))}`
        );

        if (postcodeResponse.ok) {
          const postcodeData = await postcodeResponse.json();

          if (postcodeData.status === 200 && postcodeData.result) {
            const adminDistrict = postcodeData.result.admin_district;
            const region = postcodeData.result.region;

            console.log(`[FIND-BUILDING-CONTROL] Postcodes.io found: ${adminDistrict}, ${region}`);

            // Create a result based on the local authority
            if (adminDistrict) {
              results.push({
                name: `${adminDistrict} Building Control`,
                address: `Contact ${adminDistrict} Council for building control services`,
                website: `https://www.gov.uk/find-local-council`,
              });
            }
          }
        }
      } catch (e) {
        console.error(`[FIND-BUILDING-CONTROL] Postcodes.io error:`, e);
      }
    }

    console.log(`[FIND-BUILDING-CONTROL] Returning ${results.length} results`);

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[FIND-BUILDING-CONTROL] Error:', error);

    return new Response(
      JSON.stringify({
        error: 'Error searching for building control offices',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
