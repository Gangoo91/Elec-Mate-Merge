import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Scrapes Find a Tender (UK High Value Contracts > £139k)
 * https://www.find-tender.service.gov.uk
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    console.log('[SYNC] Starting Find a Tender scrape...');

    const searchTerms = [
      'electrical',
      'fire alarm',
      'M&E',
      'electrical installation',
      'lighting',
      'emergency lighting',
      'electrical contractor',
    ];

    let totalFound = 0;
    let totalInserted = 0;
    const errors: string[] = [];

    for (const searchTerm of searchTerms) {
      try {
        console.log(`[SCRAPE] Searching Find a Tender for: ${searchTerm}`);

        // Find a Tender search API
        const searchUrl = `https://www.find-tender.service.gov.uk/Search/Results?keywords=${encodeURIComponent(searchTerm)}&stage=tender&sort=newest`;

        const response = await fetch(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          },
        });

        if (!response.ok) {
          errors.push(`Search failed for "${searchTerm}": ${response.status}`);
          continue;
        }

        const html = await response.text();

        // Parse notice IDs from search results
        const noticeMatches = html.matchAll(/href="\/Notice\/(\d+)"/gi);
        const noticeIds: string[] = [];

        for (const match of noticeMatches) {
          if (!noticeIds.includes(match[1])) {
            noticeIds.push(match[1]);
          }
        }

        console.log(`[SCRAPE] Found ${noticeIds.length} notices for "${searchTerm}"`);
        totalFound += noticeIds.length;

        // Fetch each notice
        const limit = Math.min(noticeIds.length, 15);
        for (let i = 0; i < limit; i++) {
          const noticeId = noticeIds[i];
          try {
            const noticeUrl = `https://www.find-tender.service.gov.uk/Notice/${noticeId}`;
            const noticeResponse = await fetch(noticeUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html',
              },
            });

            if (!noticeResponse.ok) continue;

            const noticeHtml = await noticeResponse.text();
            const opportunity = parseNotice(noticeId, noticeHtml);

            if (opportunity) {
              const { error } = await supabase
                .from('tender_opportunities')
                .upsert(opportunity, { onConflict: 'source,external_id' });

              if (!error) {
                totalInserted++;
              }
            }

            await new Promise(r => setTimeout(r, 300));
          } catch (e) {
            errors.push(`Error fetching notice ${noticeId}: ${(e as Error).message}`);
          }
        }

        await new Promise(r => setTimeout(r, 500));
      } catch (e) {
        errors.push(`Search error for "${searchTerm}": ${(e as Error).message}`);
      }
    }

    // Update source sync status
    await supabase
      .from('tender_sources')
      .update({
        last_sync_at: new Date().toISOString(),
        last_sync_count: totalInserted,
      })
      .eq('name', 'find_a_tender');

    console.log(`[SYNC] Find a Tender complete: ${totalFound} found, ${totalInserted} inserted`);

    return new Response(
      JSON.stringify({
        success: true,
        source: 'find_a_tender',
        total_found: totalFound,
        inserted: totalInserted,
        errors,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[SYNC] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseNotice(noticeId: string, html: string): any | null {
  try {
    // Extract title
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Notice';

    // Extract organisation
    const orgMatch = html.match(/(?:Contracting authority|Organisation)[:\s]*<[^>]*>([^<]+)</i) ||
                     html.match(/<dd[^>]*class="[^"]*organisation[^"]*"[^>]*>([^<]+)</i);
    const clientName = orgMatch ? orgMatch[1].trim() : 'Unknown Organisation';

    // Extract value
    let valueLow: number | null = null;
    let valueHigh: number | null = null;
    const valueMatch = html.match(/(?:Total value|Estimated value|Value)[:\s]*£?([\d,]+)(?:\s*[-–]\s*£?([\d,]+))?/i);
    if (valueMatch) {
      valueLow = parseInt(valueMatch[1].replace(/,/g, '')) || null;
      valueHigh = valueMatch[2] ? parseInt(valueMatch[2].replace(/,/g, '')) : valueLow;
    }

    // Extract deadline
    let deadline: string | null = null;
    const deadlineMatch = html.match(/(?:Time limit|Deadline|Closing date)[^:]*[:\s]*(\d{1,2}[\s\/\-]\w+[\s\/\-]\d{4}|\d{4}-\d{2}-\d{2})/i);
    if (deadlineMatch) {
      try {
        deadline = new Date(deadlineMatch[1]).toISOString();
      } catch (e) {}
    }

    // Extract location
    const postcodeMatch = html.match(/([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})/i);
    const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase() : null;

    const locationMatch = html.match(/(?:Place of performance|Location|Region|NUTS code)[:\s]*<[^>]*>([^<]+)</i);
    const locationText = locationMatch ? locationMatch[1].trim() : null;

    // Extract description
    const descMatch = html.match(/(?:Short description|Description)[:\s]*<[^>]*>([\s\S]*?)<\/(?:p|dd|div)/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

    // Determine categories
    const text = (title + ' ' + description).toLowerCase();
    const categories: string[] = ['electrical'];

    if (text.includes('fire alarm') || text.includes('fire detection')) categories.push('fire_alarm');
    if (text.includes('emergency light')) categories.push('emergency_lighting');
    if (text.includes('rewir')) categories.push('rewire');
    if (text.includes('m&e') || text.includes('mechanical and electrical')) categories.push('m_and_e');
    if (text.includes('ev charg')) categories.push('ev_charging');
    if (text.includes('led') || text.includes('lighting')) categories.push('lighting');
    if (text.includes('solar') || text.includes('pv')) categories.push('solar');

    // Determine sector
    const clientLower = clientName.toLowerCase();
    let sector = 'public';
    if (clientLower.includes('nhs') || clientLower.includes('hospital') || clientLower.includes('health')) {
      sector = 'healthcare';
    } else if (clientLower.includes('housing')) {
      sector = 'housing';
    } else if (clientLower.includes('school') || clientLower.includes('university') || clientLower.includes('college')) {
      sector = 'education';
    } else if (clientLower.includes('council') || clientLower.includes('borough')) {
      sector = 'local_authority';
    }

    return {
      external_id: `FTS-${noticeId}`,
      source: 'find_a_tender',
      source_url: `https://www.find-tender.service.gov.uk/Notice/${noticeId}`,
      title: title.substring(0, 500),
      description: description.substring(0, 2000),
      scope_of_works: description,
      client_name: clientName,
      client_type: sector,
      cpv_codes: ['45310000'],
      categories,
      sector,
      value_low: valueLow,
      value_high: valueHigh,
      currency: 'GBP',
      location_text: locationText,
      postcode,
      lat: null,
      lng: null,
      region: postcode ? extractRegion(postcode) : null,
      published_at: new Date().toISOString(),
      deadline,
      requirements: { niceic: true },
      estimated_complexity: valueLow && valueLow > 500000 ? 'complex' : 'standard',
      status: 'live',
      fetched_at: new Date().toISOString(),
    };
  } catch (e) {
    console.error(`[PARSE] Error parsing notice ${noticeId}:`, e);
    return null;
  }
}

function extractRegion(postcode: string): string {
  const prefix = postcode.replace(/\s+/g, '').match(/^[A-Z]{1,2}/i)?.[0]?.toUpperCase() || '';

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

  return regionMap[prefix] || 'uk_wide';
}
