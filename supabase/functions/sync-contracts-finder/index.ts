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

    // Get access token
    let accessToken: string;
    try {
      accessToken = await getAccessToken();
    } catch (e) {
      console.log('[SYNC] No API credentials, using mock data for development');
      // Insert some mock opportunities for testing
      const mockOpportunities = generateMockOpportunities();

      for (const opp of mockOpportunities) {
        await supabase
          .from('tender_opportunities')
          .upsert(opp, { onConflict: 'source,external_id' });
      }

      // Update source sync status
      await supabase
        .from('tender_sources')
        .update({
          last_sync_at: new Date().toISOString(),
          last_sync_count: mockOpportunities.length,
        })
        .eq('name', 'contracts_finder');

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Synced mock data (no API credentials)',
          count: mockOpportunities.length
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

// Generate mock opportunities for testing without API credentials
function generateMockOpportunities() {
  const mockData = [
    {
      external_id: 'MOCK-2025-001',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-001',
      title: 'Electrical Rewiring - Council Housing Block',
      description: 'Full electrical rewiring of 24-unit residential block including new consumer units to BS 7671:2018, fire alarm system upgrade, emergency lighting to communal areas, and EICR certification for all units. NICEIC/NAPIT approved contractor required.',
      client_name: 'Birmingham City Council',
      client_type: 'local_authority',
      cpv_codes: ['45310000', '45311000'],
      categories: ['electrical', 'rewire', 'fire_alarm', 'emergency_lighting', 'testing'],
      sector: 'housing',
      value_low: 45000,
      value_high: 65000,
      currency: 'GBP',
      location_text: 'Ladywood, Birmingham',
      postcode: 'B16 8LP',
      lat: 52.4774,
      lng: -1.9330,
      region: 'west_midlands',
      published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, insurance: 5000000, asbestos_awareness: true },
      contact_name: 'John Smith',
      contact_email: 'procurement@birmingham.gov.uk',
      estimated_complexity: 'standard',
      status: 'live',
    },
    {
      external_id: 'MOCK-2025-002',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-002',
      title: 'Emergency Lighting Installation - NHS Trust',
      description: 'Supply and installation of emergency lighting system across 3 hospital buildings. Includes design, supply, install, test and commission. Work to be carried out in occupied building with minimal disruption. BAFE SP203-1 certification preferred.',
      client_name: 'University Hospitals Birmingham NHS Foundation Trust',
      client_type: 'nhs',
      cpv_codes: ['45316000', '45312100'],
      categories: ['electrical', 'emergency_lighting'],
      sector: 'healthcare',
      value_low: 85000,
      value_high: 120000,
      currency: 'GBP',
      location_text: 'Edgbaston, Birmingham',
      postcode: 'B15 2GW',
      lat: 52.4534,
      lng: -1.9398,
      region: 'west_midlands',
      published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, insurance: 10000000, dbs_check: true },
      contact_name: 'Sarah Johnson',
      contact_email: 'estates.procurement@uhb.nhs.uk',
      estimated_complexity: 'complex',
      status: 'live',
    },
    {
      external_id: 'MOCK-2025-003',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-003',
      title: 'Periodic Electrical Testing - School Estate',
      description: 'EICR testing and certification for 15 primary schools across Manchester. Fixed 5-year testing schedule with annual visual inspections. All remedial works to be quoted separately.',
      client_name: 'Manchester City Council',
      client_type: 'local_authority',
      cpv_codes: ['45310000'],
      categories: ['electrical', 'testing'],
      sector: 'education',
      value_low: 25000,
      value_high: 35000,
      currency: 'GBP',
      location_text: 'Manchester',
      postcode: 'M1 1AG',
      lat: 53.4808,
      lng: -2.2426,
      region: 'northwest',
      published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, insurance: 2000000 },
      contact_name: 'David Williams',
      contact_email: 'schools.maintenance@manchester.gov.uk',
      estimated_complexity: 'simple',
      status: 'live',
    },
    {
      external_id: 'MOCK-2025-004',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-004',
      title: 'EV Charging Infrastructure - Multi-Storey Car Park',
      description: 'Design and installation of 50 EV charging points (22kW) in council-owned multi-storey car park. Includes electrical infrastructure upgrade, load management system, and back-office integration.',
      client_name: 'Leeds City Council',
      client_type: 'local_authority',
      cpv_codes: ['45310000', '45315000'],
      categories: ['electrical', 'ev_charging'],
      sector: 'public',
      value_low: 150000,
      value_high: 200000,
      currency: 'GBP',
      location_text: 'Leeds City Centre',
      postcode: 'LS1 4BR',
      lat: 53.7996,
      lng: -1.5491,
      region: 'yorkshire',
      published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, insurance: 5000000, ev_experience: true },
      contact_name: 'Emma Thompson',
      contact_email: 'transport.projects@leeds.gov.uk',
      estimated_complexity: 'complex',
      status: 'live',
    },
    {
      external_id: 'MOCK-2025-005',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-005',
      title: 'Fire Alarm System Replacement - Housing Association',
      description: 'Complete replacement of existing fire alarm system in 6 sheltered housing schemes. Grade A LD1 systems required. Includes design, supply, installation, commissioning and handover training.',
      client_name: 'Clarion Housing Group',
      client_type: 'housing_association',
      cpv_codes: ['45312100'],
      categories: ['electrical', 'fire_alarm'],
      sector: 'housing',
      value_low: 75000,
      value_high: 95000,
      currency: 'GBP',
      location_text: 'Various locations, London',
      postcode: 'SW1A 1AA',
      lat: 51.5014,
      lng: -0.1419,
      region: 'london',
      published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, bafe: true, insurance: 5000000 },
      contact_name: 'Michael Brown',
      contact_email: 'procurement@clarionhg.com',
      estimated_complexity: 'standard',
      status: 'live',
    },
    {
      external_id: 'MOCK-2025-006',
      source: 'contracts_finder',
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/mock-006',
      title: 'Data Cabling Installation - Office Refurbishment',
      description: 'Cat6A structured cabling installation for new office fit-out. 200 data points, 2 server rooms, WiFi infrastructure. Certification and testing required.',
      client_name: 'Bristol City Council',
      client_type: 'local_authority',
      cpv_codes: ['45314000', '45311200'],
      categories: ['electrical', 'data_cabling'],
      sector: 'public',
      value_low: 35000,
      value_high: 50000,
      currency: 'GBP',
      location_text: 'Bristol City Centre',
      postcode: 'BS1 5TR',
      lat: 51.4545,
      lng: -2.5879,
      region: 'southwest',
      published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      requirements: { niceic: true, insurance: 2000000 },
      contact_name: 'Rachel Green',
      contact_email: 'it.infrastructure@bristol.gov.uk',
      estimated_complexity: 'simple',
      status: 'live',
    },
  ];

  return mockData;
}
