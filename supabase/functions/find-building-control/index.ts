import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface BuildingControlResult {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  distanceText?: string;
}

/**
 * Resolve a UK postcode (or an address containing one) to its local authority —
 * which IS the Building Control body for that area — using postcodes.io (free,
 * no key, full UK coverage). Replaces the old lookup against a
 * `building_control_authorities` table that never existed, so the finder always
 * returned "no results".
 */
function extractPostcode(input: string): { full: string | null; outcode: string | null } {
  const clean = input.trim().toUpperCase().replace(/[^A-Z0-9\s]/g, ' ').replace(/\s+/g, ' ');
  // Full UK postcode, e.g. "CA28 8HE" / "SW1A1AA"
  const full = clean.match(/([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})/);
  if (full) return { full: `${full[1]}${full[2]}`, outcode: full[1] };
  // Just an outcode, e.g. "CA28"
  const out = clean.match(/\b([A-Z]{1,2}\d[A-Z\d]?)\b/);
  return { full: null, outcode: out ? out[1] : null };
}

function councilResult(
  district: string,
  region: string | null,
  country: string | null
): BuildingControlResult {
  const place = [region, country].filter(Boolean).join(', ');
  return {
    name: `${district} Council`,
    address: place ? `Local authority building control · ${place}` : 'Local authority building control',
    distanceText: 'Building Control for your area',
    website: `https://www.google.com/search?q=${encodeURIComponent(`${district} Council building control`)}`,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();

    if (!address || typeof address !== 'string') {
      return new Response(JSON.stringify({ error: 'Address or postcode is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[FIND-BUILDING-CONTROL] Searching for: ${address}`);
    const { full, outcode } = extractPostcode(address);

    if (!full && !outcode) {
      return new Response(
        JSON.stringify({ results: [], message: 'Enter a UK postcode (e.g. CA28 8HE) to find your council.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: BuildingControlResult[] = [];

    // 1) Try the full postcode — one exact council.
    if (full) {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(full)}`);
      if (res.ok) {
        const body = await res.json();
        const r = body?.result;
        if (r?.admin_district) {
          results.push(councilResult(r.admin_district, r.region ?? r.country ?? null, r.country ?? null));
        }
      }
    }

    // 2) Fall back to the outcode — may span more than one council.
    if (results.length === 0 && outcode) {
      const res = await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(outcode)}`);
      if (res.ok) {
        const body = await res.json();
        const r = body?.result;
        const districts: string[] = Array.isArray(r?.admin_district) ? r.admin_district : [];
        const region: string | null = Array.isArray(r?.region) ? r.region[0] ?? null : r?.region ?? null;
        const country: string | null = Array.isArray(r?.country) ? r.country[0] ?? null : r?.country ?? null;
        for (const d of districts) {
          if (d) results.push(councilResult(d, region, country));
        }
      }
    }

    if (results.length === 0) {
      return new Response(
        JSON.stringify({
          results: [],
          message: "We couldn't match that postcode. Check it, or search gov.uk for your local council.",
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[FIND-BUILDING-CONTROL] Resolved ${results.length} council(s)`);
    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[FIND-BUILDING-CONTROL] error', (error as Error).message);
    captureException(error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Failed to search for building control' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
