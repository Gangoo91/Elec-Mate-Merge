import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Electrical CPV codes
const ELECTRICAL_CPV_CODES = [
  '45310000', // Electrical installation work
  '45311000', // Electrical wiring and fitting work
  '45311100', // Electrical wiring work
  '45311200', // Electrical fitting work
  '45312000', // Alarm system and antenna installation work
  '45312100', // Fire-alarm system installation work
  '45312200', // Burglar-alarm system installation work
  '45312310', // Lightning-protection works
  '45314000', // Installation of telecommunications equipment
  '45315000', // Electrical installation work of heating and other equipment
  '45315100', // Electrical engineering installation works
  '45315300', // Electricity supply installations
  '45315600', // Low-voltage installation work
  '45315700', // Switching station installation work
  '45316000', // Installation work of illumination and signalling systems
  '45317000', // Other electrical installation work
];

interface ContractsFinderToken {
  access_token: string;
  expires_at: number;
}

let cachedToken: ContractsFinderToken | null = null;

async function getAccessToken(): Promise<string> {
  // Check cached token
  if (cachedToken && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token;
  }

  const clientId = Deno.env.get('CONTRACTS_FINDER_CLIENT_ID');
  const clientSecret = Deno.env.get('CONTRACTS_FINDER_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    throw new Error('Contracts Finder credentials not configured');
  }

  const credentials = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch('https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();

  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 min early
  };

  return cachedToken.access_token;
}

interface OCDSNotice {
  id: string;
  ocid: string;
  date: string;
  tag: string[];
  initiationType: string;
  parties: Array<{
    id: string;
    name: string;
    roles: string[];
    address?: {
      streetAddress?: string;
      locality?: string;
      region?: string;
      postalCode?: string;
      countryName?: string;
    };
    contactPoint?: {
      name?: string;
      email?: string;
      telephone?: string;
    };
  }>;
  tender: {
    id: string;
    title: string;
    description: string;
    status: string;
    value?: {
      amount: number;
      currency: string;
    };
    minValue?: {
      amount: number;
      currency: string;
    };
    maxValue?: {
      amount: number;
      currency: string;
    };
    procurementMethod: string;
    procurementMethodDetails?: string;
    mainProcurementCategory: string;
    items?: Array<{
      id: string;
      description: string;
      classification?: {
        scheme: string;
        id: string;
        description: string;
      };
      deliveryLocation?: {
        geometry?: {
          type: string;
          coordinates: number[];
        };
        gazetteer?: {
          scheme: string;
          identifiers: string[];
        };
      };
    }>;
    tenderPeriod?: {
      startDate: string;
      endDate: string;
    };
    contractPeriod?: {
      startDate?: string;
      endDate?: string;
      durationInDays?: number;
    };
    documents?: Array<{
      id: string;
      documentType: string;
      title: string;
      url: string;
      format?: string;
    }>;
  };
}

function extractPostcode(parties: OCDSNotice['parties'], items: OCDSNotice['tender']['items']): string | null {
  // Try to get postcode from buyer address
  const buyer = parties.find(p => p.roles.includes('buyer'));
  if (buyer?.address?.postalCode) {
    return buyer.address.postalCode;
  }

  // Try to get from items delivery location
  if (items) {
    for (const item of items) {
      if (item.deliveryLocation?.gazetteer?.identifiers) {
        const postcode = item.deliveryLocation.gazetteer.identifiers.find(id =>
          /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(id)
        );
        if (postcode) return postcode;
      }
    }
  }

  return null;
}

function extractCPVCodes(items: OCDSNotice['tender']['items']): string[] {
  if (!items) return [];

  return items
    .filter(item => item.classification?.scheme === 'CPV')
    .map(item => item.classification!.id)
    .filter((v, i, a) => a.indexOf(v) === i); // Unique
}

function determineCategories(cpvCodes: string[], description: string): string[] {
  const categories: string[] = ['electrical'];
  const descLower = description.toLowerCase();

  if (cpvCodes.some(c => c.startsWith('45312')) || descLower.includes('fire alarm') || descLower.includes('fire detection')) {
    categories.push('fire_alarm');
  }
  if (cpvCodes.some(c => c.startsWith('45316')) || descLower.includes('emergency light') || descLower.includes('exit sign')) {
    categories.push('emergency_lighting');
  }
  if (descLower.includes('eicr') || descLower.includes('electrical inspection') || descLower.includes('periodic test')) {
    categories.push('testing');
  }
  if (descLower.includes('rewire') || descLower.includes('re-wire')) {
    categories.push('rewire');
  }
  if (descLower.includes('consumer unit') || descLower.includes('distribution board')) {
    categories.push('consumer_units');
  }
  if (descLower.includes('ev charg') || descLower.includes('electric vehicle')) {
    categories.push('ev_charging');
  }
  if (descLower.includes('data') || descLower.includes('network') || descLower.includes('cabling')) {
    categories.push('data_cabling');
  }

  return categories;
}

function determineSector(parties: OCDSNotice['parties'], description: string): string {
  const buyer = parties.find(p => p.roles.includes('buyer'));
  const buyerName = buyer?.name?.toLowerCase() || '';
  const descLower = description.toLowerCase();

  if (buyerName.includes('nhs') || buyerName.includes('hospital') || buyerName.includes('health')) {
    return 'healthcare';
  }
  if (buyerName.includes('housing') || buyerName.includes('homes') || descLower.includes('social housing')) {
    return 'housing';
  }
  if (buyerName.includes('school') || buyerName.includes('academy') || buyerName.includes('college') || buyerName.includes('university')) {
    return 'education';
  }
  if (buyerName.includes('council') || buyerName.includes('borough') || buyerName.includes('district')) {
    return 'local_authority';
  }

  return 'public';
}

function determineComplexity(value: number | null, description: string): string {
  const descLower = description.toLowerCase();

  if (value && value > 500000) return 'complex';
  if (descLower.includes('3 phase') || descLower.includes('three phase') || descLower.includes('high voltage') || descLower.includes('hv ')) {
    return 'complex';
  }
  if (value && value < 25000) return 'simple';
  if (descLower.includes('domestic') || descLower.includes('single property')) {
    return 'simple';
  }

  return 'standard';
}

async function geocodePostcode(postcode: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // Use postcodes.io (free, no API key needed)
    const cleanPostcode = postcode.replace(/\s+/g, '');
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleanPostcode)}`);

    if (!response.ok) return null;

    const data = await response.json();
    if (data.status === 200 && data.result) {
      return {
        lat: data.result.latitude,
        lng: data.result.longitude,
      };
    }
  } catch (e) {
    console.error(`Geocode failed for ${postcode}:`, e);
  }
  return null;
}

/**
 * Scrape Contracts Finder public search page for electrical tenders
 * This gets REAL LIVE data without needing API credentials
 */
async function scrapeContractsFinderPublic(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let totalFound = 0;
  let totalInserted = 0;

  // Search terms for electrical contracts
  const searchTerms = [
    'electrical installation',
    'electrical rewiring',
    'fire alarm',
    'emergency lighting',
    'electrical testing',
    'EICR',
    'EV charging',
    'LED lighting',
    'electrical maintenance',
    'M&E electrical',
    'electrical upgrade',
    'consumer unit',
    'distribution board',
    'electrical contractor',
    'solar PV installation',
  ];

  for (const searchTerm of searchTerms) {
    try {
      console.log(`[SCRAPE] Searching for: ${searchTerm}`);

      // Contracts Finder search URL
      const searchUrl = `https://www.contractsfinder.service.gov.uk/Search/Results?searchTerm=${encodeURIComponent(searchTerm)}&locationPostcode=&locationDistance=0&locationDistanceMiles=0&publishedFrom=&publishedTo=&deadlineFrom=&deadlineTo=&budgetFrom=&budgetTo=&statuses=Open&sortType=Relevance`;

      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.5',
        },
      });

      if (!response.ok) {
        errors.push(`Search failed for "${searchTerm}": ${response.status}`);
        continue;
      }

      const html = await response.text();

      // Parse search results - looking for notice links and data
      const noticeMatches = html.matchAll(/<a[^>]*href="\/Notice\/([a-f0-9-]+)"[^>]*>([^<]+)<\/a>/gi);
      const notices: { id: string; title: string }[] = [];

      for (const match of noticeMatches) {
        const id = match[1];
        const title = match[2].trim();
        if (title.length > 10 && !notices.some(n => n.id === id)) {
          notices.push({ id, title });
        }
      }

      console.log(`[SCRAPE] Found ${notices.length} notices for "${searchTerm}"`);
      totalFound += notices.length;

      // Fetch details for each notice (limit to prevent rate limiting)
      const noticeLimit = Math.min(notices.length, 20);
      for (let i = 0; i < noticeLimit; i++) {
        const notice = notices[i];
        try {
          const detailUrl = `https://www.contractsfinder.service.gov.uk/Notice/${notice.id}`;
          const detailResponse = await fetch(detailUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'text/html',
            },
          });

          if (!detailResponse.ok) continue;

          const detailHtml = await detailResponse.text();
          const opportunity = parseContractsFinderNotice(notice.id, notice.title, detailHtml);

          if (opportunity) {
            const { error } = await supabase
              .from('tender_opportunities')
              .upsert(opportunity, { onConflict: 'source,external_id' });

            if (!error) {
              totalInserted++;
            }
          }

          // Small delay to be respectful
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          errors.push(`Error fetching notice ${notice.id}: ${(e as Error).message}`);
        }
      }

      // Delay between search terms
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      errors.push(`Search error for "${searchTerm}": ${(e as Error).message}`);
    }
  }

  console.log(`[SCRAPE] Complete: ${totalFound} found, ${totalInserted} inserted`);
  return { found: totalFound, inserted: totalInserted, errors };
}

/**
 * Parse a Contracts Finder notice page into opportunity data
 */
function parseContractsFinderNotice(noticeId: string, title: string, html: string): any | null {
  try {
    // Extract key fields from the HTML
    const getValue = (label: string): string | null => {
      const regex = new RegExp(`${label}[:\\s]*<[^>]*>([^<]+)<`, 'i');
      const match = html.match(regex);
      return match ? match[1].trim() : null;
    };

    const getSection = (heading: string): string | null => {
      const regex = new RegExp(`<h[23][^>]*>${heading}</h[23]>[\\s\\S]*?<[^>]*>([\\s\\S]*?)</`, 'i');
      const match = html.match(regex);
      return match ? match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : null;
    };

    // Extract buyer/organisation
    const buyerMatch = html.match(/Organisation[:\s]*<[^>]*>([^<]+)</i) ||
                       html.match(/Contracting authority[:\s]*<[^>]*>([^<]+)</i) ||
                       html.match(/<span[^>]*class="[^"]*organisation[^"]*"[^>]*>([^<]+)</i);
    const clientName = buyerMatch ? buyerMatch[1].trim() : 'Unknown Organisation';

    // Extract value
    let valueLow: number | null = null;
    let valueHigh: number | null = null;
    const valueMatch = html.match(/(?:Value|Budget|Contract value)[:\s]*£?([\d,]+)(?:\s*-\s*£?([\d,]+))?/i);
    if (valueMatch) {
      valueLow = parseInt(valueMatch[1].replace(/,/g, '')) || null;
      valueHigh = valueMatch[2] ? parseInt(valueMatch[2].replace(/,/g, '')) : valueLow;
    }

    // Extract deadline
    let deadline: string | null = null;
    const deadlineMatch = html.match(/(?:Closing|Deadline|Submission)[^:]*[:\s]*(\d{1,2}[\s\/\-]\w+[\s\/\-]\d{4}|\d{4}-\d{2}-\d{2})/i);
    if (deadlineMatch) {
      try {
        deadline = new Date(deadlineMatch[1]).toISOString();
      } catch (e) {
        // Invalid date
      }
    }

    // Extract location/postcode
    const postcodeMatch = html.match(/([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})/i);
    const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase() : null;

    const locationMatch = html.match(/(?:Location|Region|Area)[:\s]*<[^>]*>([^<]+)</i);
    const locationText = locationMatch ? locationMatch[1].trim() : null;

    // Extract description
    const descMatch = html.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    if (!description) {
      description = getSection('Description') || getSection('Summary') || '';
    }

    // Determine categories based on title and description
    const text = (title + ' ' + description).toLowerCase();
    const categories: string[] = ['electrical'];

    if (text.includes('fire alarm') || text.includes('fire detection')) categories.push('fire_alarm');
    if (text.includes('emergency light')) categories.push('emergency_lighting');
    if (text.includes('rewir') || text.includes('re-wir')) categories.push('rewire');
    if (text.includes('eicr') || text.includes('periodic') || text.includes('testing')) categories.push('testing');
    if (text.includes('ev charg') || text.includes('electric vehicle')) categories.push('ev_charging');
    if (text.includes('led') || text.includes('lighting upgrade')) categories.push('lighting');
    if (text.includes('solar') || text.includes('pv')) categories.push('solar');
    if (text.includes('data') || text.includes('cabling')) categories.push('data_cabling');

    // Determine sector
    const clientLower = clientName.toLowerCase();
    let sector = 'public';
    if (clientLower.includes('nhs') || clientLower.includes('hospital') || clientLower.includes('health')) {
      sector = 'healthcare';
    } else if (clientLower.includes('housing') || clientLower.includes('homes')) {
      sector = 'housing';
    } else if (clientLower.includes('school') || clientLower.includes('college') || clientLower.includes('university') || clientLower.includes('academy')) {
      sector = 'education';
    } else if (clientLower.includes('council') || clientLower.includes('borough')) {
      sector = 'local_authority';
    }

    // Determine complexity
    let complexity = 'standard';
    if ((valueLow && valueLow > 500000) || text.includes('complex') || text.includes('major')) {
      complexity = 'complex';
    } else if ((valueLow && valueLow < 30000) || text.includes('minor') || text.includes('small')) {
      complexity = 'simple';
    }

    return {
      external_id: noticeId,
      source: 'contracts_finder',
      source_url: `https://www.contractsfinder.service.gov.uk/Notice/${noticeId}`,
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
      lat: null, // Will geocode separately
      lng: null,
      region: postcode ? extractRegionFromPostcode(postcode) : null,
      published_at: new Date().toISOString(),
      deadline,
      requirements: { niceic: true },
      estimated_complexity: complexity,
      status: 'live',
      fetched_at: new Date().toISOString(),
    };
  } catch (e) {
    console.error(`[PARSE] Error parsing notice ${noticeId}:`, e);
    return null;
  }
}

function extractRegionFromPostcode(postcode: string): string {
  const prefix = postcode.replace(/\s+/g, '').match(/^[A-Z]{1,2}/i)?.[0]?.toUpperCase() || '';

  const regionMap: Record<string, string> = {
    'B': 'west_midlands', 'CV': 'west_midlands', 'DY': 'west_midlands', 'WS': 'west_midlands', 'WV': 'west_midlands',
    'M': 'northwest', 'L': 'northwest', 'WA': 'northwest', 'WN': 'northwest', 'BL': 'northwest', 'OL': 'northwest', 'PR': 'northwest', 'FY': 'northwest',
    'LS': 'yorkshire', 'BD': 'yorkshire', 'HX': 'yorkshire', 'HD': 'yorkshire', 'WF': 'yorkshire', 'S': 'yorkshire', 'DN': 'yorkshire', 'HU': 'yorkshire', 'YO': 'yorkshire',
    'NE': 'northeast', 'DH': 'northeast', 'SR': 'northeast', 'TS': 'northeast', 'DL': 'northeast',
    'NG': 'east_midlands', 'DE': 'east_midlands', 'LE': 'east_midlands', 'NN': 'east_midlands', 'LN': 'east_midlands',
    'BS': 'southwest', 'BA': 'southwest', 'EX': 'southwest', 'PL': 'southwest', 'TQ': 'southwest', 'TR': 'southwest', 'GL': 'southwest', 'TA': 'southwest',
    'CB': 'east_england', 'CO': 'east_england', 'IP': 'east_england', 'NR': 'east_england', 'PE': 'east_england', 'CM': 'east_england',
    'RG': 'southeast', 'SL': 'southeast', 'HP': 'southeast', 'MK': 'southeast', 'OX': 'southeast', 'GU': 'southeast', 'PO': 'southeast', 'BN': 'southeast', 'TN': 'southeast', 'ME': 'southeast', 'CT': 'southeast', 'SO': 'southeast',
    'SW': 'london', 'SE': 'london', 'NW': 'london', 'N': 'london', 'E': 'london', 'W': 'london', 'EC': 'london', 'WC': 'london', 'CR': 'london', 'BR': 'london', 'DA': 'london', 'EN': 'london', 'HA': 'london', 'IG': 'london', 'KT': 'london', 'RM': 'london', 'SM': 'london', 'TW': 'london', 'UB': 'london',
    'CF': 'wales', 'SA': 'wales', 'LL': 'wales', 'SY': 'wales', 'NP': 'wales', 'LD': 'wales',
    'G': 'scotland', 'EH': 'scotland', 'AB': 'scotland', 'DD': 'scotland', 'KY': 'scotland', 'FK': 'scotland', 'PA': 'scotland', 'IV': 'scotland', 'PH': 'scotland', 'ML': 'scotland', 'KA': 'scotland',
    'BT': 'northern_ireland',
  };

  return regionMap[prefix] || 'uk_wide';
}

function extractRegion(postcode: string | null, location: string | null): string | null {
  if (!postcode && !location) return null;

  const regionMap: Record<string, string> = {
    'B': 'west_midlands', 'CV': 'west_midlands', 'DY': 'west_midlands', 'WS': 'west_midlands', 'WV': 'west_midlands',
    'M': 'northwest', 'L': 'northwest', 'WA': 'northwest', 'WN': 'northwest', 'BL': 'northwest', 'OL': 'northwest', 'PR': 'northwest',
    'LS': 'yorkshire', 'BD': 'yorkshire', 'HX': 'yorkshire', 'HD': 'yorkshire', 'WF': 'yorkshire', 'S': 'yorkshire', 'DN': 'yorkshire', 'HU': 'yorkshire',
    'NE': 'northeast', 'DH': 'northeast', 'SR': 'northeast', 'TS': 'northeast', 'DL': 'northeast',
    'NG': 'east_midlands', 'DE': 'east_midlands', 'LE': 'east_midlands', 'NN': 'east_midlands',
    'BS': 'southwest', 'BA': 'southwest', 'EX': 'southwest', 'PL': 'southwest', 'TQ': 'southwest', 'TR': 'southwest',
    'CB': 'east_england', 'CO': 'east_england', 'IP': 'east_england', 'NR': 'east_england', 'PE': 'east_england',
    'RG': 'southeast', 'SL': 'southeast', 'HP': 'southeast', 'MK': 'southeast', 'OX': 'southeast', 'GU': 'southeast', 'PO': 'southeast', 'BN': 'southeast', 'TN': 'southeast', 'ME': 'southeast', 'CT': 'southeast',
    'SW': 'london', 'SE': 'london', 'NW': 'london', 'N': 'london', 'E': 'london', 'W': 'london', 'EC': 'london', 'WC': 'london',
    'CF': 'wales', 'SA': 'wales', 'LL': 'wales', 'SY': 'wales', 'NP': 'wales',
    'G': 'scotland', 'EH': 'scotland', 'AB': 'scotland', 'DD': 'scotland', 'KY': 'scotland', 'FK': 'scotland', 'PA': 'scotland', 'IV': 'scotland',
    'BT': 'northern_ireland',
  };

  if (postcode) {
    const prefix = postcode.replace(/\s+/g, '').match(/^[A-Z]{1,2}/i)?.[0]?.toUpperCase();
    if (prefix && regionMap[prefix]) {
      return regionMap[prefix];
    }
  }

  return null;
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
    console.log('[SYNC] Starting Contracts Finder sync...');

    // Try API first, fall back to web scraping
    let accessToken: string | null = null;
    try {
      accessToken = await getAccessToken();
    } catch (e) {
      console.log('[SYNC] No API credentials, will scrape public website');
    }

    // If no API credentials, scrape the public Contracts Finder website
    if (!accessToken) {
      console.log('[SYNC] Scraping Contracts Finder public search...');
      const scrapedOpportunities = await scrapeContractsFinderPublic(supabase);

      // Update source sync status
      await supabase
        .from('tender_sources')
        .update({
          last_sync_at: new Date().toISOString(),
          last_sync_count: scrapedOpportunities.inserted,
        })
        .eq('name', 'contracts_finder');

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Scraped live data from Contracts Finder',
          total_found: scrapedOpportunities.found,
          inserted: scrapedOpportunities.inserted,
          errors: scrapedOpportunities.errors
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search for electrical tenders
    const searchParams = new URLSearchParams({
      'publishedFrom': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
      'publishedTo': new Date().toISOString().split('T')[0],
      'stage': 'tender',
      'size': '100',
    });

    // Add CPV code filter
    ELECTRICAL_CPV_CODES.forEach(code => {
      searchParams.append('cpvCodes', code);
    });

    const searchUrl = `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?${searchParams}`;

    console.log('[SYNC] Fetching from:', searchUrl);

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const releases = data.releases || [];

    console.log(`[SYNC] Found ${releases.length} notices`);

    let insertCount = 0;
    let errorCount = 0;

    for (const release of releases) {
      try {
        const notice = release as OCDSNotice;
        const tender = notice.tender;
        const buyer = notice.parties.find(p => p.roles.includes('buyer'));

        if (!tender || !buyer) continue;

        const cpvCodes = extractCPVCodes(tender.items);
        const postcode = extractPostcode(notice.parties, tender.items);
        const coords = postcode ? await geocodePostcode(postcode) : null;
        const region = extractRegion(postcode, buyer.address?.locality || null);

        const valueExact = tender.value?.amount || null;
        const valueLow = tender.minValue?.amount || valueExact;
        const valueHigh = tender.maxValue?.amount || valueExact;

        const opportunity = {
          external_id: notice.ocid,
          source: 'contracts_finder',
          source_url: `https://www.contractsfinder.service.gov.uk/Notice/${notice.id}`,
          title: tender.title,
          description: tender.description,
          client_name: buyer.name,
          client_type: determineSector(notice.parties, tender.description),
          cpv_codes: cpvCodes,
          categories: determineCategories(cpvCodes, tender.description),
          sector: determineSector(notice.parties, tender.description),
          value_low: valueLow,
          value_high: valueHigh,
          value_exact: valueExact,
          currency: tender.value?.currency || 'GBP',
          location_text: [buyer.address?.locality, buyer.address?.region].filter(Boolean).join(', '),
          postcode: postcode,
          lat: coords?.lat || null,
          lng: coords?.lng || null,
          region: region,
          published_at: notice.date,
          deadline: tender.tenderPeriod?.endDate || null,
          contract_start: tender.contractPeriod?.startDate || null,
          contract_duration: tender.contractPeriod?.durationInDays
            ? `${Math.ceil(tender.contractPeriod.durationInDays / 365)} years`
            : null,
          requirements: {},
          documents: tender.documents?.map(d => ({
            name: d.title,
            url: d.url,
            type: d.format || 'application/pdf',
          })) || [],
          contact_name: buyer.contactPoint?.name || null,
          contact_email: buyer.contactPoint?.email || null,
          contact_phone: buyer.contactPoint?.telephone || null,
          estimated_complexity: determineComplexity(valueExact, tender.description),
          status: tender.status === 'active' ? 'live' : tender.status,
          raw_data: release,
          fetched_at: new Date().toISOString(),
          expires_at: tender.tenderPeriod?.endDate || null,
        };

        const { error } = await supabase
          .from('tender_opportunities')
          .upsert(opportunity, { onConflict: 'source,external_id' });

        if (error) {
          console.error('[SYNC] Insert error:', error);
          errorCount++;
        } else {
          insertCount++;
        }
      } catch (e) {
        console.error('[SYNC] Processing error:', e);
        errorCount++;
      }
    }

    // Update source sync status
    await supabase
      .from('tender_sources')
      .update({
        last_sync_at: new Date().toISOString(),
        last_sync_count: insertCount,
        error_count: errorCount,
        last_error: errorCount > 0 ? `${errorCount} records failed` : null,
      })
      .eq('name', 'contracts_finder');

    console.log(`[SYNC] Complete: ${insertCount} inserted, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        inserted: insertCount,
        errors: errorCount,
        total: releases.length
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[SYNC] Fatal error:', error);

    // Update source with error
    await supabase
      .from('tender_sources')
      .update({
        last_error: error.message,
        error_count: 1,
      })
      .eq('name', 'contracts_finder');

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Generate comprehensive mock opportunities for testing without API credentials
function generateMockOpportunities() {
  // UK locations with accurate coordinates
  const locations = [
    // West Midlands
    { city: 'Birmingham', area: 'City Centre', postcode: 'B1 1BB', lat: 52.4862, lng: -1.8904, region: 'west_midlands' },
    { city: 'Birmingham', area: 'Edgbaston', postcode: 'B15 2TT', lat: 52.4534, lng: -1.9398, region: 'west_midlands' },
    { city: 'Birmingham', area: 'Erdington', postcode: 'B23 6RJ', lat: 52.5276, lng: -1.8379, region: 'west_midlands' },
    { city: 'Wolverhampton', area: 'City Centre', postcode: 'WV1 1NX', lat: 52.5870, lng: -2.1288, region: 'west_midlands' },
    { city: 'Coventry', area: 'City Centre', postcode: 'CV1 1FJ', lat: 52.4068, lng: -1.5197, region: 'west_midlands' },
    { city: 'Solihull', area: 'Town Centre', postcode: 'B91 3SJ', lat: 52.4120, lng: -1.7780, region: 'west_midlands' },
    // North West
    { city: 'Manchester', area: 'City Centre', postcode: 'M1 1AD', lat: 53.4808, lng: -2.2426, region: 'northwest' },
    { city: 'Manchester', area: 'Salford', postcode: 'M3 7DG', lat: 53.4839, lng: -2.2662, region: 'northwest' },
    { city: 'Manchester', area: 'Trafford', postcode: 'M16 0QG', lat: 53.4631, lng: -2.2887, region: 'northwest' },
    { city: 'Liverpool', area: 'City Centre', postcode: 'L1 1JF', lat: 53.4084, lng: -2.9916, region: 'northwest' },
    { city: 'Liverpool', area: 'Bootle', postcode: 'L20 3NJ', lat: 53.4464, lng: -3.0027, region: 'northwest' },
    { city: 'Warrington', area: 'Town Centre', postcode: 'WA1 1GP', lat: 53.3900, lng: -2.5970, region: 'northwest' },
    { city: 'Preston', area: 'City Centre', postcode: 'PR1 2HE', lat: 53.7632, lng: -2.7031, region: 'northwest' },
    { city: 'Blackpool', area: 'Town Centre', postcode: 'FY1 1HB', lat: 53.8175, lng: -3.0357, region: 'northwest' },
    // Yorkshire
    { city: 'Leeds', area: 'City Centre', postcode: 'LS1 4BR', lat: 53.7996, lng: -1.5491, region: 'yorkshire' },
    { city: 'Leeds', area: 'Headingley', postcode: 'LS6 2DJ', lat: 53.8199, lng: -1.5802, region: 'yorkshire' },
    { city: 'Sheffield', area: 'City Centre', postcode: 'S1 2HB', lat: 53.3811, lng: -1.4701, region: 'yorkshire' },
    { city: 'Sheffield', area: 'Hillsborough', postcode: 'S6 2LR', lat: 53.4084, lng: -1.5007, region: 'yorkshire' },
    { city: 'Bradford', area: 'City Centre', postcode: 'BD1 1JF', lat: 53.7950, lng: -1.7594, region: 'yorkshire' },
    { city: 'Hull', area: 'City Centre', postcode: 'HU1 1NQ', lat: 53.7457, lng: -0.3367, region: 'yorkshire' },
    { city: 'York', area: 'City Centre', postcode: 'YO1 9QL', lat: 53.9600, lng: -1.0873, region: 'yorkshire' },
    // North East
    { city: 'Newcastle', area: 'City Centre', postcode: 'NE1 4PA', lat: 54.9783, lng: -1.6178, region: 'northeast' },
    { city: 'Newcastle', area: 'Gateshead', postcode: 'NE8 1EP', lat: 54.9628, lng: -1.6016, region: 'northeast' },
    { city: 'Sunderland', area: 'City Centre', postcode: 'SR1 1DG', lat: 54.9069, lng: -1.3838, region: 'northeast' },
    { city: 'Durham', area: 'City Centre', postcode: 'DH1 3NJ', lat: 54.7753, lng: -1.5849, region: 'northeast' },
    { city: 'Middlesbrough', area: 'Town Centre', postcode: 'TS1 2AZ', lat: 54.5742, lng: -1.2350, region: 'northeast' },
    // East Midlands
    { city: 'Nottingham', area: 'City Centre', postcode: 'NG1 2GB', lat: 52.9540, lng: -1.1550, region: 'east_midlands' },
    { city: 'Nottingham', area: 'West Bridgford', postcode: 'NG2 5GJ', lat: 52.9327, lng: -1.1270, region: 'east_midlands' },
    { city: 'Leicester', area: 'City Centre', postcode: 'LE1 6DA', lat: 52.6369, lng: -1.1398, region: 'east_midlands' },
    { city: 'Derby', area: 'City Centre', postcode: 'DE1 2FS', lat: 52.9225, lng: -1.4746, region: 'east_midlands' },
    { city: 'Northampton', area: 'Town Centre', postcode: 'NN1 1ED', lat: 52.2405, lng: -0.9027, region: 'east_midlands' },
    // South West
    { city: 'Bristol', area: 'City Centre', postcode: 'BS1 5TR', lat: 51.4545, lng: -2.5879, region: 'southwest' },
    { city: 'Bristol', area: 'Clifton', postcode: 'BS8 2PS', lat: 51.4559, lng: -2.6197, region: 'southwest' },
    { city: 'Plymouth', area: 'City Centre', postcode: 'PL1 2AA', lat: 50.3755, lng: -4.1427, region: 'southwest' },
    { city: 'Exeter', area: 'City Centre', postcode: 'EX1 1GA', lat: 50.7236, lng: -3.5275, region: 'southwest' },
    { city: 'Bath', area: 'City Centre', postcode: 'BA1 1JW', lat: 51.3758, lng: -2.3599, region: 'southwest' },
    { city: 'Gloucester', area: 'City Centre', postcode: 'GL1 1PN', lat: 51.8667, lng: -2.2431, region: 'southwest' },
    // East of England
    { city: 'Cambridge', area: 'City Centre', postcode: 'CB2 1TN', lat: 52.2053, lng: 0.1218, region: 'east_england' },
    { city: 'Norwich', area: 'City Centre', postcode: 'NR1 3JF', lat: 52.6309, lng: 1.2974, region: 'east_england' },
    { city: 'Ipswich', area: 'Town Centre', postcode: 'IP1 1DH', lat: 52.0567, lng: 1.1482, region: 'east_england' },
    { city: 'Peterborough', area: 'City Centre', postcode: 'PE1 1EJ', lat: 52.5695, lng: -0.2405, region: 'east_england' },
    // South East
    { city: 'Reading', area: 'Town Centre', postcode: 'RG1 1LG', lat: 51.4551, lng: -0.9787, region: 'southeast' },
    { city: 'Brighton', area: 'City Centre', postcode: 'BN1 1AE', lat: 50.8225, lng: -0.1372, region: 'southeast' },
    { city: 'Southampton', area: 'City Centre', postcode: 'SO14 7FJ', lat: 50.9097, lng: -1.4044, region: 'southeast' },
    { city: 'Portsmouth', area: 'City Centre', postcode: 'PO1 2ED', lat: 50.8198, lng: -1.0880, region: 'southeast' },
    { city: 'Oxford', area: 'City Centre', postcode: 'OX1 2BQ', lat: 51.7520, lng: -1.2577, region: 'southeast' },
    { city: 'Milton Keynes', area: 'Central', postcode: 'MK9 2FE', lat: 52.0406, lng: -0.7594, region: 'southeast' },
    // London
    { city: 'London', area: 'Westminster', postcode: 'SW1A 1AA', lat: 51.5014, lng: -0.1419, region: 'london' },
    { city: 'London', area: 'Camden', postcode: 'NW1 0NE', lat: 51.5390, lng: -0.1426, region: 'london' },
    { city: 'London', area: 'Tower Hamlets', postcode: 'E1 6AN', lat: 51.5150, lng: -0.0720, region: 'london' },
    { city: 'London', area: 'Croydon', postcode: 'CR0 1RD', lat: 51.3762, lng: -0.0982, region: 'london' },
    { city: 'London', area: 'Ealing', postcode: 'W5 5QT', lat: 51.5130, lng: -0.3089, region: 'london' },
    { city: 'London', area: 'Greenwich', postcode: 'SE10 9EW', lat: 51.4826, lng: -0.0077, region: 'london' },
    { city: 'London', area: 'Hackney', postcode: 'E8 1DY', lat: 51.5450, lng: -0.0553, region: 'london' },
    { city: 'London', area: 'Lewisham', postcode: 'SE13 6LG', lat: 51.4415, lng: -0.0117, region: 'london' },
    // Wales
    { city: 'Cardiff', area: 'City Centre', postcode: 'CF10 1EP', lat: 51.4816, lng: -3.1791, region: 'wales' },
    { city: 'Swansea', area: 'City Centre', postcode: 'SA1 1NW', lat: 51.6214, lng: -3.9436, region: 'wales' },
    { city: 'Newport', area: 'City Centre', postcode: 'NP20 1TT', lat: 51.5842, lng: -2.9977, region: 'wales' },
    // Scotland
    { city: 'Edinburgh', area: 'City Centre', postcode: 'EH1 1YZ', lat: 55.9533, lng: -3.1883, region: 'scotland' },
    { city: 'Glasgow', area: 'City Centre', postcode: 'G1 1XQ', lat: 55.8642, lng: -4.2518, region: 'scotland' },
    { city: 'Aberdeen', area: 'City Centre', postcode: 'AB10 1XG', lat: 57.1497, lng: -2.0943, region: 'scotland' },
    { city: 'Dundee', area: 'City Centre', postcode: 'DD1 1DA', lat: 56.4620, lng: -2.9707, region: 'scotland' },
    // Northern Ireland
    { city: 'Belfast', area: 'City Centre', postcode: 'BT1 2BA', lat: 54.5973, lng: -5.9301, region: 'northern_ireland' },
    { city: 'Derry', area: 'City Centre', postcode: 'BT48 6HQ', lat: 54.9966, lng: -7.3086, region: 'northern_ireland' },
  ];

  // Project templates with detailed scopes
  const projectTemplates = [
    {
      type: 'rewire',
      titles: ['Electrical Rewiring', 'Full Rewire Project', 'Complete Electrical Upgrade'],
      scopes: [
        'Full electrical rewiring of {units}-unit residential block including new consumer units to BS 7671:2018, fire alarm system upgrade, emergency lighting to communal areas, and EICR certification for all units. Work to be completed in phases to minimise disruption to residents.',
        'Complete rewire of {sqm}sqm office building comprising {floors} floors. Scope includes new distribution boards, power circuits, lighting circuits, data infrastructure containment, and emergency lighting. All work to current 18th Edition regulations.',
        'Rewiring of heritage-listed property requiring sensitive approach. Works include upgrade of existing installation, replacement of hazardous wiring, installation of new consumer unit with RCBO protection, and full EICR certification.',
      ],
      valueRange: [35000, 120000],
      categories: ['electrical', 'rewire'],
      complexity: ['standard', 'complex'],
    },
    {
      type: 'fire_alarm',
      titles: ['Fire Alarm System Installation', 'Fire Detection System Upgrade', 'L1 Fire Alarm Replacement'],
      scopes: [
        'Design, supply and installation of Grade A LD1 fire alarm system for {units}-unit sheltered housing scheme. System to include intelligent addressable detectors, manual call points, sounders, and interface with warden call system. Full commissioning and BS 5839-1 certification required.',
        'Replacement of obsolete fire alarm system in {sqm}sqm industrial premises with Category L2 addressable system. Scope includes 72+ zone panel, cause and effect programming, integration with existing BMS, and full documentation.',
        'Installation of wireless fire alarm system across {buildings} buildings with central monitoring. Includes smoke detectors, heat detectors, manual call points, VADs for hearing impaired, and graphical interface.',
      ],
      valueRange: [25000, 95000],
      categories: ['electrical', 'fire_alarm'],
      complexity: ['standard', 'complex'],
      requirements: { bafe: true },
    },
    {
      type: 'emergency_lighting',
      titles: ['Emergency Lighting Installation', 'Emergency Lighting Upgrade', 'Emergency Escape Lighting'],
      scopes: [
        'Supply and installation of emergency lighting system across {sqm}sqm commercial property to BS 5266. Self-contained LED emergency luminaires throughout, with photoluminescent signage at all exit routes. Includes design, installation, testing and certification.',
        'Upgrade of emergency lighting in multi-storey car park comprising {levels} levels. Maintained and non-maintained fittings, central battery system with 3-hour duration, automatic testing system with remote monitoring.',
        'Installation of emergency lighting to communal areas of {units}-unit apartment block. Work includes escape route lighting, open area anti-panic lighting, and high-risk task lighting to plant rooms.',
      ],
      valueRange: [15000, 65000],
      categories: ['electrical', 'emergency_lighting'],
      complexity: ['simple', 'standard'],
    },
    {
      type: 'testing',
      titles: ['EICR Testing Programme', 'Periodic Inspection and Testing', 'Electrical Safety Testing'],
      scopes: [
        'EICR testing and certification for {properties} domestic properties across local authority housing stock. Includes visual inspection, dead testing, live testing, and detailed remedial recommendations. 5-year certification cycle.',
        'Periodic inspection of {sqm}sqm commercial premises including distribution systems, final circuits, and specialist equipment feeds. Full EICR report with photographic evidence and prioritised recommendations.',
        'Electrical testing programme for {schools} school buildings. Scope includes EICR inspection, PAT testing of portable appliances, thermal imaging survey of distribution boards, and executive summary report.',
      ],
      valueRange: [15000, 45000],
      categories: ['electrical', 'testing'],
      complexity: ['simple', 'standard'],
    },
    {
      type: 'ev_charging',
      titles: ['EV Charging Infrastructure', 'Electric Vehicle Charging Installation', 'EV Charging Point Rollout'],
      scopes: [
        'Design and installation of {chargers} EV charging points (22kW Type 2) in council car park. Scope includes DNO application for supply upgrade, cable installation, feeder pillar, load management system, and OZEV certification.',
        'Installation of workplace EV charging for {chargers} vehicles. Includes {fast} rapid chargers (50kW DC) and {slow} fast chargers (7kW AC), with smart load balancing and app-based payment system integration.',
        'Public EV charging hub installation comprising {chargers} charging points with mix of AC and DC units. Canopy with solar PV, battery storage, and grid connection. Full project management from design to commissioning.',
      ],
      valueRange: [75000, 250000],
      categories: ['electrical', 'ev_charging'],
      complexity: ['complex'],
      requirements: { ev_experience: true },
    },
    {
      type: 'data_cabling',
      titles: ['Structured Cabling Installation', 'Data Network Infrastructure', 'Cat6A Cabling Project'],
      scopes: [
        'Cat6A structured cabling installation for {datapoints} data points across {floors}-floor office building. Includes floor boxes, trunking, 19" rack cabinets, patch panels, and Fluke certification of all links.',
        'Fibre optic backbone installation connecting {buildings} buildings on campus. Single-mode and multi-mode fibre, fusion splicing, OTDR testing, and full documentation including as-built drawings.',
        'Data centre cabling refresh including {racks} rack relocations, new PDUs, hot/cold aisle containment cable management, and {connections} copper and fibre connections with full labelling.',
      ],
      valueRange: [25000, 85000],
      categories: ['electrical', 'data_cabling'],
      complexity: ['standard', 'complex'],
    },
    {
      type: 'lighting',
      titles: ['LED Lighting Upgrade', 'Lighting System Replacement', 'Energy Efficient Lighting'],
      scopes: [
        'LED lighting upgrade for {sqm}sqm warehouse including high bay fittings, daylight harvesting controls, and PIR presence detection. Guaranteed energy savings of 60%+ with 5-year warranty.',
        'Street lighting LED conversion programme for {lights} columns. Includes lantern replacement, photocell installation, CMS integration, and disposal of existing sodium fittings.',
        'Office lighting replacement to {sqm}sqm premises with LED panels, emergency conversion modules, and DALI dimming controls. Includes lighting design calculations and LG7 compliance report.',
      ],
      valueRange: [20000, 150000],
      categories: ['electrical', 'lighting'],
      complexity: ['simple', 'standard'],
    },
    {
      type: 'solar',
      titles: ['Solar PV Installation', 'Rooftop Solar Array', 'Commercial Solar Project'],
      scopes: [
        'Design and installation of {kw}kWp rooftop solar PV array on commercial premises. Scope includes structural survey, system design, MCS installation, G99 application, and monitoring system.',
        'Ground-mounted solar farm electrical infrastructure comprising {kw}kWp capacity. Includes inverter installation, AC and DC wiring, transformer, grid connection, and SCADA integration.',
        'Solar carport installation with {kw}kWp PV capacity and integrated EV charging. Steel canopy structure, weather-sealed cable routes, and export limiting system.',
      ],
      valueRange: [45000, 350000],
      categories: ['electrical', 'solar', 'renewable'],
      complexity: ['complex'],
      requirements: { mcs: true },
    },
    {
      type: 'maintenance',
      titles: ['Electrical Maintenance Contract', 'Reactive and Planned Maintenance', 'FM Electrical Services'],
      scopes: [
        '{years}-year electrical maintenance contract for {sqm}sqm mixed-use development. Includes PPM visits, 24/7 emergency callout, lamp replacement programme, and annual fixed wire testing.',
        'Planned preventive maintenance for {buildings} NHS buildings covering distribution systems, UPS, generators, and medical equipment electrical systems. Monthly inspections with detailed reporting.',
        'Reactive and planned electrical maintenance for {properties} properties in housing portfolio. SLA response times, compliance testing, minor works delivery, and asset data collection.',
      ],
      valueRange: [50000, 200000],
      categories: ['electrical', 'maintenance'],
      complexity: ['standard'],
    },
    {
      type: 'containment',
      titles: ['Cable Containment Installation', 'Electrical Infrastructure Works', 'Busbar and Containment'],
      scopes: [
        'Installation of {metres}m cable tray and ladder rack throughout new warehouse. Heavy duty hot-dip galvanised systems, fire stopping at compartment boundaries, and full labelling.',
        'Busbar system installation for {amps}A distribution in data centre. Copper busbar, tap-off units, segregated earth bar, and thermal imaging survey post-installation.',
        'External cable route installation comprising {metres}m trenching, ducting, draw pits, and cable pulling. Includes traffic management and reinstatement to highways specification.',
      ],
      valueRange: [30000, 120000],
      categories: ['electrical', 'containment'],
      complexity: ['standard', 'complex'],
    },
  ];

  // Client types
  const clientTypes = [
    { type: 'local_authority', names: ['{city} City Council', '{city} Borough Council', '{city} Metropolitan Council', '{city} District Council'], sector: 'public' },
    { type: 'nhs', names: ['{city} NHS Trust', '{city} University Hospitals NHS', '{city} Community Health NHS', '{city} Mental Health NHS Trust'], sector: 'healthcare' },
    { type: 'housing', names: ['{city} Housing Association', 'Metropolitan Housing {area}', 'Sanctuary Housing {region}', 'Places for People {city}'], sector: 'housing' },
    { type: 'education', names: ['{city} Academy Trust', '{city} College', 'University of {city}', '{city} Independent Schools'], sector: 'education' },
    { type: 'commercial', names: ['{city} Business Park', '{city} Shopping Centre', '{city} Office Complex', '{city} Industrial Estate'], sector: 'commercial' },
  ];

  const opportunities: any[] = [];
  let id = 1;

  // Generate opportunities for each location
  for (const location of locations) {
    // Generate 2-4 opportunities per location
    const numOpps = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < numOpps; i++) {
      const template = projectTemplates[Math.floor(Math.random() * projectTemplates.length)];
      const clientType = clientTypes[Math.floor(Math.random() * clientTypes.length)];
      const titleBase = template.titles[Math.floor(Math.random() * template.titles.length)];
      const scopeBase = template.scopes[Math.floor(Math.random() * template.scopes.length)];

      // Generate realistic values
      const valueVariation = 0.7 + Math.random() * 0.6;
      const valueLow = Math.round((template.valueRange[0] * valueVariation) / 1000) * 1000;
      const valueHigh = Math.round((template.valueRange[1] * valueVariation) / 1000) * 1000;

      // Generate deadline (7 to 42 days from now)
      const daysUntilDeadline = 7 + Math.floor(Math.random() * 35);
      const deadline = new Date(Date.now() + daysUntilDeadline * 24 * 60 * 60 * 1000);

      // Published date (1 to 14 days ago)
      const daysAgoPublished = 1 + Math.floor(Math.random() * 14);
      const publishedAt = new Date(Date.now() - daysAgoPublished * 24 * 60 * 60 * 1000);

      // Replace placeholders in scope
      const scope = scopeBase
        .replace('{units}', String(6 + Math.floor(Math.random() * 50)))
        .replace('{sqm}', String(500 + Math.floor(Math.random() * 5000)))
        .replace('{floors}', String(2 + Math.floor(Math.random() * 8)))
        .replace('{buildings}', String(2 + Math.floor(Math.random() * 6)))
        .replace('{levels}', String(3 + Math.floor(Math.random() * 7)))
        .replace('{properties}', String(20 + Math.floor(Math.random() * 200)))
        .replace('{schools}', String(5 + Math.floor(Math.random() * 20)))
        .replace('{chargers}', String(10 + Math.floor(Math.random() * 50)))
        .replace('{fast}', String(2 + Math.floor(Math.random() * 6)))
        .replace('{slow}', String(5 + Math.floor(Math.random() * 15)))
        .replace('{datapoints}', String(50 + Math.floor(Math.random() * 200)))
        .replace('{racks}', String(5 + Math.floor(Math.random() * 20)))
        .replace('{connections}', String(100 + Math.floor(Math.random() * 500)))
        .replace('{lights}', String(50 + Math.floor(Math.random() * 500)))
        .replace('{kw}', String(50 + Math.floor(Math.random() * 450)))
        .replace('{years}', String(2 + Math.floor(Math.random() * 4)))
        .replace('{metres}', String(100 + Math.floor(Math.random() * 500)))
        .replace('{amps}', String(400 + Math.floor(Math.random() * 2000)));

      // Generate client name
      const clientName = clientType.names[Math.floor(Math.random() * clientType.names.length)]
        .replace('{city}', location.city)
        .replace('{area}', location.area)
        .replace('{region}', location.region.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()));

      // Generate title
      const title = `${titleBase} - ${location.city} ${location.area}`;

      opportunities.push({
        external_id: `MOCK-2025-${String(id).padStart(4, '0')}`,
        source: 'contracts_finder',
        source_url: `https://www.contractsfinder.service.gov.uk/Notice/mock-${String(id).padStart(4, '0')}`,
        title,
        description: scope.substring(0, 200) + '...',
        scope_of_works: scope,
        client_name: clientName,
        client_type: clientType.type,
        cpv_codes: ['45310000', '45311000'],
        categories: template.categories,
        sector: clientType.sector,
        value_low: valueLow,
        value_high: valueHigh,
        currency: 'GBP',
        location_text: `${location.area}, ${location.city}`,
        postcode: location.postcode,
        lat: location.lat + (Math.random() - 0.5) * 0.02, // Slight variation
        lng: location.lng + (Math.random() - 0.5) * 0.02,
        region: location.region,
        published_at: publishedAt.toISOString(),
        deadline: deadline.toISOString(),
        requirements: {
          niceic: true,
          insurance: valueLow > 50000 ? 5000000 : 2000000,
          ...(template.requirements || {}),
        },
        contact_name: ['James Wilson', 'Sarah Thompson', 'Michael Brown', 'Emma Davies', 'Robert Taylor', 'Helen Clark'][Math.floor(Math.random() * 6)],
        contact_email: `procurement@${clientName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}.gov.uk`,
        estimated_complexity: template.complexity[Math.floor(Math.random() * template.complexity.length)],
        status: 'live',
      });

      id++;
    }
  }

  console.log(`[SYNC] Generated ${opportunities.length} mock opportunities across ${locations.length} UK locations`);
  return opportunities;
}
