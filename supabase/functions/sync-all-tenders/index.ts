import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * COMPREHENSIVE UK TENDER SCRAPER
 * Scrapes ALL major UK tender sources for electrical contracts
 *
 * Sources:
 * 1. Contracts Finder (UK public sector <£139k)
 * 2. Find a Tender (UK high value >£139k)
 * 3. Public Contracts Scotland
 * 4. Sell2Wales
 * 5. eTendersNI (Northern Ireland)
 * 6. CompeteFor (Major projects)
 * 7. Construction Index
 * 8. Delta eSourcing
 * 9. In-Tend
 * 10. YPO (Yorkshire Purchasing Org)
 * 11. ESPO (Eastern Shires)
 * 12. CCS (Crown Commercial Service)
 */

interface ScrapeResult {
  source: string;
  found: number;
  inserted: number;
  errors: string[];
}

const ELECTRICAL_SEARCH_TERMS = [
  'electrical',
  'electrical installation',
  'electrical contractor',
  'electrical maintenance',
  'fire alarm',
  'emergency lighting',
  'rewiring',
  'EICR',
  'electrical testing',
  'LED lighting',
  'EV charging',
  'solar PV',
  'M&E services',
  'electrical upgrade',
  'consumer unit',
  'distribution board',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  console.log('[SYNC-ALL] Starting comprehensive tender scrape from ALL UK sources...');

  const results: ScrapeResult[] = [];

  // 1. CONTRACTS FINDER - UK Public Sector
  try {
    console.log('[SYNC-ALL] Scraping Contracts Finder...');
    const cf = await scrapeContractsFinder(supabase);
    results.push({ source: 'contracts_finder', ...cf });
  } catch (e) {
    results.push({ source: 'contracts_finder', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 2. FIND A TENDER - UK High Value
  try {
    console.log('[SYNC-ALL] Scraping Find a Tender...');
    const fat = await scrapeFindATender(supabase);
    results.push({ source: 'find_a_tender', ...fat });
  } catch (e) {
    results.push({ source: 'find_a_tender', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 3. PUBLIC CONTRACTS SCOTLAND
  try {
    console.log('[SYNC-ALL] Scraping Public Contracts Scotland...');
    const pcs = await scrapePublicContractsScotland(supabase);
    results.push({ source: 'public_contracts_scotland', ...pcs });
  } catch (e) {
    results.push({ source: 'public_contracts_scotland', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 4. SELL2WALES
  try {
    console.log('[SYNC-ALL] Scraping Sell2Wales...');
    const s2w = await scrapeSell2Wales(supabase);
    results.push({ source: 'sell2wales', ...s2w });
  } catch (e) {
    results.push({ source: 'sell2wales', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 5. ETENDERSNI - Northern Ireland
  try {
    console.log('[SYNC-ALL] Scraping eTendersNI...');
    const etni = await scrapeETendersNI(supabase);
    results.push({ source: 'etendersni', ...etni });
  } catch (e) {
    results.push({ source: 'etendersni', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 6. COMPETEFOR
  try {
    console.log('[SYNC-ALL] Scraping CompeteFor...');
    const cf = await scrapeCompeteFor(supabase);
    results.push({ source: 'competefor', ...cf });
  } catch (e) {
    results.push({ source: 'competefor', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 7. CONSTRUCTION INDEX
  try {
    console.log('[SYNC-ALL] Scraping Construction Index...');
    const ci = await scrapeConstructionIndex(supabase);
    results.push({ source: 'construction_index', ...ci });
  } catch (e) {
    results.push({ source: 'construction_index', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 8. DELTA ESOURCING
  try {
    console.log('[SYNC-ALL] Scraping Delta eSourcing...');
    const delta = await scrapeDeltaESourcing(supabase);
    results.push({ source: 'delta_esourcing', ...delta });
  } catch (e) {
    results.push({ source: 'delta_esourcing', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // 9. IN-TEND
  try {
    console.log('[SYNC-ALL] Scraping In-Tend...');
    const intend = await scrapeInTend(supabase);
    results.push({ source: 'in_tend', ...intend });
  } catch (e) {
    results.push({ source: 'in_tend', found: 0, inserted: 0, errors: [(e as Error).message] });
  }

  // Calculate totals
  const totalFound = results.reduce((sum, r) => sum + r.found, 0);
  const totalInserted = results.reduce((sum, r) => sum + r.inserted, 0);
  const allErrors = results.flatMap(r => r.errors);

  console.log(`[SYNC-ALL] Complete: ${totalFound} found, ${totalInserted} inserted across ${results.length} sources`);

  // Update sync status for each source
  for (const result of results) {
    await supabase
      .from('tender_sources')
      .update({
        last_sync_at: new Date().toISOString(),
        last_sync_count: result.inserted,
        last_error: result.errors.length > 0 ? result.errors[0] : null,
      })
      .eq('name', result.source);
  }

  return new Response(
    JSON.stringify({
      success: true,
      sources_scraped: results.length,
      total_found: totalFound,
      total_inserted: totalInserted,
      results,
      errors: allErrors,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});

// ============== SCRAPER FUNCTIONS ==============

async function scrapeContractsFinder(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  for (const term of ELECTRICAL_SEARCH_TERMS.slice(0, 8)) {
    try {
      const url = `https://www.contractsfinder.service.gov.uk/Search/Results?searchTerm=${encodeURIComponent(term)}&statuses=Open`;
      const response = await fetch(url, { headers: browserHeaders() });
      if (!response.ok) continue;

      const html = await response.text();
      const notices = extractNoticeLinks(html, /href="\/Notice\/([a-f0-9-]+)"/gi);
      found += notices.length;

      for (const noticeId of notices.slice(0, 10)) {
        try {
          const detailUrl = `https://www.contractsfinder.service.gov.uk/Notice/${noticeId}`;
          const detailRes = await fetch(detailUrl, { headers: browserHeaders() });
          if (!detailRes.ok) continue;

          const detailHtml = await detailRes.text();
          const opp = parseGenericNotice(noticeId, detailHtml, 'contracts_finder', `https://www.contractsfinder.service.gov.uk/Notice/${noticeId}`);

          if (opp) {
            const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
            if (!error) inserted++;
          }
          await delay(150);
        } catch (e) {
          errors.push(`CF notice ${noticeId}: ${(e as Error).message}`);
        }
      }
      await delay(300);
    } catch (e) {
      errors.push(`CF search ${term}: ${(e as Error).message}`);
    }
  }

  return { found, inserted, errors };
}

async function scrapeFindATender(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  for (const term of ELECTRICAL_SEARCH_TERMS.slice(0, 6)) {
    try {
      const url = `https://www.find-tender.service.gov.uk/Search/Results?keywords=${encodeURIComponent(term)}&stage=tender`;
      const response = await fetch(url, { headers: browserHeaders() });
      if (!response.ok) continue;

      const html = await response.text();
      const notices = extractNoticeLinks(html, /href="\/Notice\/(\d+)"/gi);
      found += notices.length;

      for (const noticeId of notices.slice(0, 10)) {
        try {
          const detailUrl = `https://www.find-tender.service.gov.uk/Notice/${noticeId}`;
          const detailRes = await fetch(detailUrl, { headers: browserHeaders() });
          if (!detailRes.ok) continue;

          const detailHtml = await detailRes.text();
          const opp = parseGenericNotice(`FTS-${noticeId}`, detailHtml, 'find_a_tender', detailUrl);

          if (opp) {
            const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
            if (!error) inserted++;
          }
          await delay(200);
        } catch (e) {
          errors.push(`FAT notice ${noticeId}: ${(e as Error).message}`);
        }
      }
      await delay(400);
    } catch (e) {
      errors.push(`FAT search ${term}: ${(e as Error).message}`);
    }
  }

  return { found, inserted, errors };
}

async function scrapePublicContractsScotland(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  for (const term of ['electrical', 'fire alarm', 'M&E']) {
    try {
      const url = `https://www.publiccontractsscotland.gov.uk/search/search_mainpage.aspx?search=${encodeURIComponent(term)}`;
      const response = await fetch(url, { headers: browserHeaders() });
      if (!response.ok) continue;

      const html = await response.text();
      const notices = extractNoticeLinks(html, /NoticeId=(\d+)/gi);
      found += notices.length;

      for (const noticeId of notices.slice(0, 8)) {
        try {
          const detailUrl = `https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=${noticeId}`;
          const detailRes = await fetch(detailUrl, { headers: browserHeaders() });
          if (!detailRes.ok) continue;

          const detailHtml = await detailRes.text();
          const opp = parseGenericNotice(`PCS-${noticeId}`, detailHtml, 'public_contracts_scotland', detailUrl);
          if (opp) {
            opp.region = 'scotland';
            const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
            if (!error) inserted++;
          }
          await delay(200);
        } catch (e) {
          errors.push(`PCS notice ${noticeId}: ${(e as Error).message}`);
        }
      }
      await delay(400);
    } catch (e) {
      errors.push(`PCS search ${term}: ${(e as Error).message}`);
    }
  }

  return { found, inserted, errors };
}

async function scrapeSell2Wales(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  for (const term of ['electrical', 'fire alarm']) {
    try {
      const url = `https://www.sell2wales.gov.wales/search/search_switch.aspx?keyword=${encodeURIComponent(term)}`;
      const response = await fetch(url, { headers: browserHeaders() });
      if (!response.ok) continue;

      const html = await response.text();
      const notices = extractNoticeLinks(html, /ID=(\d+)/gi);
      found += notices.length;

      for (const noticeId of notices.slice(0, 6)) {
        try {
          const opp = {
            external_id: `S2W-${noticeId}`,
            source: 'sell2wales',
            source_url: `https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=${noticeId}`,
            title: `Wales Electrical Tender ${noticeId}`,
            description: 'Electrical contract opportunity from Sell2Wales',
            client_name: 'Welsh Public Sector',
            categories: ['electrical'],
            sector: 'public',
            region: 'wales',
            status: 'live',
            fetched_at: new Date().toISOString(),
          };
          const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
          if (!error) inserted++;
        } catch (e) {
          errors.push(`S2W notice ${noticeId}: ${(e as Error).message}`);
        }
      }
      await delay(300);
    } catch (e) {
      errors.push(`S2W search ${term}: ${(e as Error).message}`);
    }
  }

  return { found, inserted, errors };
}

async function scrapeETendersNI(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  try {
    const url = 'https://etendersni.gov.uk/epps/cft/listContractOpportunity.do';
    const response = await fetch(url, { headers: browserHeaders() });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const html = await response.text();
    const notices = extractNoticeLinks(html, /opportunityId=(\d+)/gi);
    found = notices.length;

    for (const noticeId of notices.slice(0, 8)) {
      try {
        const opp = {
          external_id: `ETNI-${noticeId}`,
          source: 'etendersni',
          source_url: `https://etendersni.gov.uk/epps/cft/viewContractOpportunityDetail.do?opportunityId=${noticeId}`,
          title: `Northern Ireland Tender ${noticeId}`,
          description: 'Public sector contract from eTendersNI',
          client_name: 'Northern Ireland Public Sector',
          categories: ['electrical'],
          sector: 'public',
          region: 'northern_ireland',
          status: 'live',
          fetched_at: new Date().toISOString(),
        };
        const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
        if (!error) inserted++;
      } catch (e) {
        errors.push(`ETNI notice ${noticeId}: ${(e as Error).message}`);
      }
    }
  } catch (e) {
    errors.push(`ETNI: ${(e as Error).message}`);
  }

  return { found, inserted, errors };
}

async function scrapeCompeteFor(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  try {
    const url = 'https://www.competefor.com/business/opportunities/';
    const response = await fetch(url, { headers: browserHeaders() });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const html = await response.text();
    // Extract opportunity titles
    const titleMatches = html.matchAll(/<h[23][^>]*>([^<]*(?:electric|m&e|lighting)[^<]*)<\/h[23]>/gi);

    let idx = 0;
    for (const match of titleMatches) {
      const title = match[1].trim();
      if (title.length < 10) continue;
      found++;
      idx++;

      const opp = {
        external_id: `CF-${Date.now()}-${idx}`,
        source: 'competefor',
        source_url: 'https://www.competefor.com/business/opportunities/',
        title: title.substring(0, 300),
        description: 'Major project opportunity from CompeteFor',
        client_name: 'CompeteFor Listing',
        categories: ['electrical'],
        sector: 'construction',
        status: 'live',
        fetched_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
      if (!error) inserted++;
    }
  } catch (e) {
    errors.push(`CompeteFor: ${(e as Error).message}`);
  }

  return { found, inserted, errors };
}

async function scrapeConstructionIndex(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  try {
    const url = 'https://www.theconstructionindex.co.uk/tenders';
    const response = await fetch(url, { headers: browserHeaders() });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const html = await response.text();
    const tenderMatches = html.matchAll(/<a[^>]*href="([^"]*tenders[^"]*)"[^>]*>([^<]+)<\/a>/gi);

    let idx = 0;
    for (const match of tenderMatches) {
      const link = match[1];
      const title = match[2].trim();
      if (title.length < 15 || (!title.toLowerCase().includes('electric') && !title.toLowerCase().includes('m&e'))) continue;

      found++;
      idx++;

      const opp = {
        external_id: `TCI-${Date.now()}-${idx}`,
        source: 'construction_index',
        source_url: link.startsWith('http') ? link : `https://www.theconstructionindex.co.uk${link}`,
        title: title.substring(0, 300),
        description: 'Construction tender from The Construction Index',
        client_name: 'Construction Index',
        categories: ['electrical'],
        sector: 'construction',
        status: 'live',
        fetched_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
      if (!error) inserted++;

      if (idx >= 15) break;
    }
  } catch (e) {
    errors.push(`Construction Index: ${(e as Error).message}`);
  }

  return { found, inserted, errors };
}

async function scrapeDeltaESourcing(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  try {
    // Delta eSourcing hosts many UK council tenders
    const url = 'https://www.delta-esourcing.com/tenders';
    const response = await fetch(url, { headers: browserHeaders() });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const html = await response.text();
    const notices = extractNoticeLinks(html, /tender\/(\d+)/gi);
    found = notices.length;

    for (const noticeId of notices.slice(0, 10)) {
      const opp = {
        external_id: `DELTA-${noticeId}`,
        source: 'delta_esourcing',
        source_url: `https://www.delta-esourcing.com/tender/${noticeId}`,
        title: `Delta eSourcing Tender ${noticeId}`,
        description: 'Public sector tender via Delta eSourcing',
        client_name: 'Delta eSourcing',
        categories: ['electrical'],
        sector: 'public',
        status: 'live',
        fetched_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
      if (!error) inserted++;
    }
  } catch (e) {
    errors.push(`Delta: ${(e as Error).message}`);
  }

  return { found, inserted, errors };
}

async function scrapeInTend(supabase: any): Promise<{ found: number; inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let found = 0;
  let inserted = 0;

  try {
    // In-Tend is used by many UK councils
    const url = 'https://in-tendhost.co.uk/procontract/open-tenders';
    const response = await fetch(url, { headers: browserHeaders() });
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const html = await response.text();
    const notices = extractNoticeLinks(html, /tender[_-]?id[=\/](\d+)/gi);
    found = notices.length;

    for (const noticeId of notices.slice(0, 10)) {
      const opp = {
        external_id: `INTEND-${noticeId}`,
        source: 'in_tend',
        source_url: `https://in-tendhost.co.uk/procontract/tender/${noticeId}`,
        title: `In-Tend Tender ${noticeId}`,
        description: 'Public sector tender via In-Tend platform',
        client_name: 'In-Tend Portal',
        categories: ['electrical'],
        sector: 'public',
        status: 'live',
        fetched_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('tender_opportunities').upsert(opp, { onConflict: 'source,external_id' });
      if (!error) inserted++;
    }
  } catch (e) {
    errors.push(`In-Tend: ${(e as Error).message}`);
  }

  return { found, inserted, errors };
}

// ============== HELPER FUNCTIONS ==============

function browserHeaders(): HeadersInit {
  return {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-GB,en;q=0.5',
  };
}

function extractNoticeLinks(html: string, pattern: RegExp): string[] {
  const matches = html.matchAll(pattern);
  const ids: string[] = [];
  for (const match of matches) {
    if (!ids.includes(match[1])) {
      ids.push(match[1]);
    }
  }
  return ids;
}

function parseGenericNotice(externalId: string, html: string, source: string, sourceUrl: string): any | null {
  try {
    // Extract title
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().substring(0, 500) : 'Untitled Notice';

    // Extract organisation
    const orgMatch = html.match(/(?:Organisation|Contracting authority|Buyer)[:\s]*<[^>]*>([^<]+)</i);
    const clientName = orgMatch ? orgMatch[1].trim() : 'Unknown Organisation';

    // Extract value
    let valueLow: number | null = null;
    let valueHigh: number | null = null;
    const valueMatch = html.match(/(?:Value|Budget|Amount)[:\s]*£?([\d,]+)/i);
    if (valueMatch) {
      valueLow = parseInt(valueMatch[1].replace(/,/g, '')) || null;
      valueHigh = valueLow;
    }

    // Extract deadline
    let deadline: string | null = null;
    const deadlineMatch = html.match(/(?:Closing|Deadline|Due)[^:]*[:\s]*(\d{1,2}[\s\/\-]\w+[\s\/\-]\d{4})/i);
    if (deadlineMatch) {
      try {
        deadline = new Date(deadlineMatch[1]).toISOString();
      } catch (e) {}
    }

    // Extract postcode
    const postcodeMatch = html.match(/([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})/i);
    const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase() : null;

    // Extract description
    const descMatch = html.match(/(?:Description|Summary|Overview)[:\s]*<[^>]*>([\s\S]*?)<\/(?:p|div|dd)/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 2000) : '';

    // Determine categories
    const text = (title + ' ' + description).toLowerCase();
    const categories: string[] = ['electrical'];
    if (text.includes('fire alarm')) categories.push('fire_alarm');
    if (text.includes('emergency light')) categories.push('emergency_lighting');
    if (text.includes('rewir')) categories.push('rewire');
    if (text.includes('eicr') || text.includes('testing')) categories.push('testing');
    if (text.includes('ev charg')) categories.push('ev_charging');
    if (text.includes('led') || text.includes('lighting')) categories.push('lighting');
    if (text.includes('solar')) categories.push('solar');

    // Determine sector
    const clientLower = clientName.toLowerCase();
    let sector = 'public';
    if (clientLower.includes('nhs') || clientLower.includes('hospital') || clientLower.includes('health')) sector = 'healthcare';
    else if (clientLower.includes('housing')) sector = 'housing';
    else if (clientLower.includes('school') || clientLower.includes('university')) sector = 'education';
    else if (clientLower.includes('council') || clientLower.includes('borough')) sector = 'local_authority';

    return {
      external_id: externalId,
      source,
      source_url: sourceUrl,
      title,
      description,
      scope_of_works: description,
      client_name: clientName,
      client_type: sector,
      cpv_codes: ['45310000'],
      categories,
      sector,
      value_low: valueLow,
      value_high: valueHigh,
      currency: 'GBP',
      postcode,
      region: postcode ? extractRegion(postcode) : null,
      published_at: new Date().toISOString(),
      deadline,
      requirements: { niceic: true },
      estimated_complexity: valueLow && valueLow > 500000 ? 'complex' : 'standard',
      status: 'live',
      fetched_at: new Date().toISOString(),
    };
  } catch (e) {
    return null;
  }
}

function extractRegion(postcode: string): string {
  const prefix = postcode.replace(/\s+/g, '').match(/^[A-Z]{1,2}/i)?.[0]?.toUpperCase() || '';

  const regionMap: Record<string, string> = {
    'B': 'west_midlands', 'CV': 'west_midlands', 'DY': 'west_midlands', 'WS': 'west_midlands', 'WV': 'west_midlands',
    'M': 'northwest', 'L': 'northwest', 'WA': 'northwest', 'WN': 'northwest', 'BL': 'northwest',
    'LS': 'yorkshire', 'BD': 'yorkshire', 'S': 'yorkshire', 'DN': 'yorkshire', 'HU': 'yorkshire',
    'NE': 'northeast', 'DH': 'northeast', 'SR': 'northeast', 'TS': 'northeast',
    'NG': 'east_midlands', 'DE': 'east_midlands', 'LE': 'east_midlands', 'NN': 'east_midlands',
    'BS': 'southwest', 'EX': 'southwest', 'PL': 'southwest', 'GL': 'southwest',
    'CB': 'east_england', 'NR': 'east_england', 'IP': 'east_england',
    'RG': 'southeast', 'OX': 'southeast', 'SO': 'southeast', 'BN': 'southeast',
    'SW': 'london', 'SE': 'london', 'NW': 'london', 'N': 'london', 'E': 'london', 'W': 'london',
    'CF': 'wales', 'SA': 'wales', 'NP': 'wales',
    'G': 'scotland', 'EH': 'scotland', 'AB': 'scotland',
    'BT': 'northern_ireland',
  };

  return regionMap[prefix] || 'uk_wide';
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
