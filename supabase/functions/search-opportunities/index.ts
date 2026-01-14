import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchRequest {
  postcode?: string;
  lat?: number;
  lng?: number;
  radius_miles?: number;
  categories?: string[];
  min_value?: number;
  max_value?: number;
  sector?: string;
  status?: string;
  sort_by?: 'deadline' | 'value' | 'distance' | 'relevance';
  page?: number;
  limit?: number;
}

interface GeocodeResult {
  lat: number;
  lng: number;
  region: string;
  outcode: string;
}

async function geocodePostcode(postcode: string): Promise<GeocodeResult | null> {
  try {
    const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleanPostcode)}`);

    if (!response.ok) {
      // Try outcode only
      const outcode = cleanPostcode.match(/^[A-Z]{1,2}\d{1,2}/)?.[0];
      if (outcode) {
        const outcodeResponse = await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(outcode)}`);
        if (outcodeResponse.ok) {
          const outcodeData = await outcodeResponse.json();
          if (outcodeData.result) {
            return {
              lat: outcodeData.result.latitude,
              lng: outcodeData.result.longitude,
              region: mapRegion(outcodeData.result.admin_county || outcodeData.result.admin_district),
              outcode: outcode,
            };
          }
        }
      }
      return null;
    }

    const data = await response.json();
    if (data.status === 200 && data.result) {
      return {
        lat: data.result.latitude,
        lng: data.result.longitude,
        region: mapRegion(data.result.admin_county || data.result.admin_district || data.result.region),
        outcode: data.result.outcode,
      };
    }
  } catch (e) {
    console.error(`Geocode failed for ${postcode}:`, e);
  }
  return null;
}

function mapRegion(adminArea: string): string {
  const area = adminArea?.toLowerCase() || '';

  if (area.includes('london') || area.includes('greater london')) return 'london';
  if (area.includes('manchester') || area.includes('merseyside') || area.includes('lancashire') || area.includes('cheshire')) return 'northwest';
  if (area.includes('birmingham') || area.includes('west midlands') || area.includes('staffordshire') || area.includes('warwickshire')) return 'west_midlands';
  if (area.includes('leeds') || area.includes('yorkshire') || area.includes('sheffield') || area.includes('hull')) return 'yorkshire';
  if (area.includes('newcastle') || area.includes('tyne') || area.includes('durham') || area.includes('northumberland')) return 'northeast';
  if (area.includes('nottingham') || area.includes('leicester') || area.includes('derby') || area.includes('northampton')) return 'east_midlands';
  if (area.includes('bristol') || area.includes('devon') || area.includes('cornwall') || area.includes('somerset') || area.includes('dorset')) return 'southwest';
  if (area.includes('cambridge') || area.includes('norfolk') || area.includes('suffolk') || area.includes('essex')) return 'east_england';
  if (area.includes('oxford') || area.includes('reading') || area.includes('brighton') || area.includes('kent') || area.includes('surrey') || area.includes('hampshire')) return 'southeast';
  if (area.includes('cardiff') || area.includes('wales') || area.includes('swansea')) return 'wales';
  if (area.includes('edinburgh') || area.includes('glasgow') || area.includes('scotland')) return 'scotland';
  if (area.includes('belfast') || area.includes('northern ireland')) return 'northern_ireland';

  return 'uk_wide';
}

function getRegionFromPostcodePrefix(prefix: string): string {
  const regionMap: Record<string, string> = {
    'B': 'west_midlands', 'CV': 'west_midlands', 'DY': 'west_midlands', 'WS': 'west_midlands', 'WV': 'west_midlands', 'ST': 'west_midlands', 'HR': 'west_midlands', 'TF': 'west_midlands', 'WR': 'west_midlands',
    'M': 'northwest', 'L': 'northwest', 'WA': 'northwest', 'WN': 'northwest', 'BL': 'northwest', 'OL': 'northwest', 'PR': 'northwest', 'FY': 'northwest', 'BB': 'northwest', 'SK': 'northwest', 'CW': 'northwest', 'CH': 'northwest', 'CA': 'northwest', 'LA': 'northwest',
    'LS': 'yorkshire', 'BD': 'yorkshire', 'HX': 'yorkshire', 'HD': 'yorkshire', 'WF': 'yorkshire', 'S': 'yorkshire', 'DN': 'yorkshire', 'HU': 'yorkshire', 'YO': 'yorkshire', 'HG': 'yorkshire',
    'NE': 'northeast', 'DH': 'northeast', 'SR': 'northeast', 'TS': 'northeast', 'DL': 'northeast',
    'NG': 'east_midlands', 'DE': 'east_midlands', 'LE': 'east_midlands', 'NN': 'east_midlands', 'LN': 'east_midlands',
    'BS': 'southwest', 'BA': 'southwest', 'EX': 'southwest', 'PL': 'southwest', 'TQ': 'southwest', 'TR': 'southwest', 'GL': 'southwest', 'TA': 'southwest', 'DT': 'southwest', 'BH': 'southwest', 'SP': 'southwest', 'SN': 'southwest',
    'CB': 'east_england', 'CO': 'east_england', 'IP': 'east_england', 'NR': 'east_england', 'PE': 'east_england', 'CM': 'east_england', 'SS': 'east_england', 'AL': 'east_england', 'SG': 'east_england', 'LU': 'east_england',
    'RG': 'southeast', 'SL': 'southeast', 'HP': 'southeast', 'MK': 'southeast', 'OX': 'southeast', 'GU': 'southeast', 'PO': 'southeast', 'BN': 'southeast', 'TN': 'southeast', 'ME': 'southeast', 'CT': 'southeast', 'SO': 'southeast', 'RH': 'southeast',
    'SW': 'london', 'SE': 'london', 'NW': 'london', 'N': 'london', 'E': 'london', 'W': 'london', 'EC': 'london', 'WC': 'london', 'CR': 'london', 'BR': 'london', 'DA': 'london', 'EN': 'london', 'HA': 'london', 'IG': 'london', 'KT': 'london', 'RM': 'london', 'SM': 'london', 'TW': 'london', 'UB': 'london', 'WD': 'london',
    'CF': 'wales', 'SA': 'wales', 'LL': 'wales', 'SY': 'wales', 'NP': 'wales', 'LD': 'wales',
    'G': 'scotland', 'EH': 'scotland', 'AB': 'scotland', 'DD': 'scotland', 'KY': 'scotland', 'FK': 'scotland', 'PA': 'scotland', 'IV': 'scotland', 'PH': 'scotland', 'ML': 'scotland', 'KA': 'scotland', 'DG': 'scotland', 'TD': 'scotland',
    'BT': 'northern_ireland',
  };

  // Try both single and double letter prefixes
  return regionMap[prefix] || regionMap[prefix.charAt(0)] || 'uk_wide';
}

function calculateRelevanceScore(
  opportunity: any,
  userPreferences?: any,
  distance?: number
): number {
  let score = 50; // Base score

  // Deadline urgency (more urgent = higher score)
  if (opportunity.deadline) {
    const daysUntilDeadline = Math.ceil(
      (new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilDeadline <= 7) score += 20;
    else if (daysUntilDeadline <= 14) score += 15;
    else if (daysUntilDeadline <= 21) score += 10;
    else if (daysUntilDeadline <= 30) score += 5;
  }

  // Distance factor
  if (distance !== undefined) {
    if (distance <= 10) score += 15;
    else if (distance <= 25) score += 10;
    else if (distance <= 50) score += 5;
  }

  // Value alignment (if user has preferences)
  if (userPreferences?.max_contract_value && opportunity.value_high) {
    if (opportunity.value_high <= userPreferences.max_contract_value) {
      score += 10;
    }
  }

  // Complexity match
  if (opportunity.estimated_complexity === 'simple') score += 5;
  else if (opportunity.estimated_complexity === 'standard') score += 10;

  // Category bonus for specialized work
  if (opportunity.categories?.includes('ev_charging')) score += 5;
  if (opportunity.categories?.includes('fire_alarm')) score += 5;

  return Math.min(100, Math.max(0, score));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const body: SearchRequest = await req.json();

    const {
      postcode,
      lat: providedLat,
      lng: providedLng,
      radius_miles = 25,
      categories,
      min_value,
      max_value,
      sector,
      status = 'live',
      sort_by = 'deadline',
      page = 1,
      limit = 20,
    } = body;

    console.log('[SEARCH] Request:', { postcode, radius_miles, categories, min_value, max_value, sector });

    // Get coordinates
    let searchLat = providedLat;
    let searchLng = providedLng;
    let userRegion: string | null = null;

    if (postcode && (!searchLat || !searchLng)) {
      const geocoded = await geocodePostcode(postcode);
      if (geocoded) {
        searchLat = geocoded.lat;
        searchLng = geocoded.lng;
        userRegion = geocoded.region;
        console.log('[SEARCH] Geocoded:', { postcode, lat: searchLat, lng: searchLng, region: userRegion });
      } else {
        // Instead of returning error, try to extract region from postcode prefix
        // and show UK-wide results filtered by region
        const postcodePrefix = postcode.replace(/\s+/g, '').toUpperCase().match(/^[A-Z]{1,2}/)?.[0];
        if (postcodePrefix) {
          userRegion = getRegionFromPostcodePrefix(postcodePrefix);
          console.log('[SEARCH] Could not geocode, using region fallback:', { postcode, region: userRegion });
        } else {
          // Show all UK opportunities if we can't determine region
          console.log('[SEARCH] Could not geocode or determine region, showing all UK opportunities');
        }
      }
    }

    // Build query
    let query = supabase
      .from('tender_opportunities')
      .select('*', { count: 'exact' })
      .eq('status', status);

    // Category filter
    if (categories && categories.length > 0) {
      query = query.overlaps('categories', categories);
    }

    // Value filters
    if (min_value !== undefined) {
      query = query.or(`value_low.gte.${min_value},value_exact.gte.${min_value}`);
    }
    if (max_value !== undefined) {
      query = query.or(`value_high.lte.${max_value},value_exact.lte.${max_value},value_high.is.null`);
    }

    // Sector filter
    if (sector) {
      query = query.eq('sector', sector);
    }

    // Execute query
    const { data: allOpportunities, error: queryError, count } = await query;

    if (queryError) {
      throw queryError;
    }

    // Calculate distances and filter by radius
    let opportunities = (allOpportunities || []).map(opp => {
      let distance: number | null = null;

      if (searchLat && searchLng && opp.lat && opp.lng) {
        // Haversine formula for distance in miles
        const R = 3959; // Earth's radius in miles
        const dLat = (opp.lat - searchLat) * Math.PI / 180;
        const dLng = (opp.lng - searchLng) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(searchLat * Math.PI / 180) * Math.cos(opp.lat * Math.PI / 180) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distance = R * c;
      }

      return {
        ...opp,
        distance_miles: distance !== null ? Math.round(distance * 10) / 10 : null,
        relevance_score: calculateRelevanceScore(opp, null, distance || undefined),
      };
    });

    // Filter by radius if location provided
    // Only include opportunities that have valid coordinates AND are within radius
    // Opportunities without coordinates are excluded when searching by location
    if (searchLat && searchLng) {
      opportunities = opportunities.filter(opp =>
        opp.distance_miles !== null && opp.distance_miles <= radius_miles
      );
    }

    // Sort
    switch (sort_by) {
      case 'deadline':
        opportunities.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        break;
      case 'value':
        opportunities.sort((a, b) => {
          const aVal = a.value_high || a.value_exact || 0;
          const bVal = b.value_high || b.value_exact || 0;
          return bVal - aVal; // Highest first
        });
        break;
      case 'distance':
        opportunities.sort((a, b) => {
          if (a.distance_miles === null) return 1;
          if (b.distance_miles === null) return -1;
          return a.distance_miles - b.distance_miles;
        });
        break;
      case 'relevance':
        opportunities.sort((a, b) => b.relevance_score - a.relevance_score);
        break;
    }

    // Pagination
    const offset = (page - 1) * limit;
    const paginatedOpportunities = opportunities.slice(offset, offset + limit);

    // Get stats
    const stats = {
      total: opportunities.length,
      live: opportunities.filter(o => o.status === 'live').length,
      coming_soon: opportunities.filter(o => o.status === 'pipeline').length,
      avg_value: opportunities.length > 0
        ? Math.round(opportunities.reduce((sum, o) => sum + (o.value_exact || o.value_high || o.value_low || 0), 0) / opportunities.length)
        : 0,
      by_sector: opportunities.reduce((acc, o) => {
        acc[o.sector || 'other'] = (acc[o.sector || 'other'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      by_complexity: opportunities.reduce((acc, o) => {
        acc[o.estimated_complexity || 'standard'] = (acc[o.estimated_complexity || 'standard'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    console.log(`[SEARCH] Found ${opportunities.length} opportunities within ${radius_miles} miles`);

    return new Response(
      JSON.stringify({
        success: true,
        opportunities: paginatedOpportunities,
        total: opportunities.length,
        page,
        limit,
        total_pages: Math.ceil(opportunities.length / limit),
        search_location: postcode ? { postcode, lat: searchLat, lng: searchLng, region: userRegion } : null,
        stats,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[SEARCH] Error:', error);

    return new Response(
      JSON.stringify({ error: error.message, opportunities: [], total: 0 }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
