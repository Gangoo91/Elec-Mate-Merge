/**
 * GET /api/public/v1/pricing-job?job=EICR&region=london
 *
 * Returns verified UK pricing for an electrical job in a specific region.
 * Backed by `regional_job_pricing` — real-market data aggregated by
 * job type + region + complexity.
 *
 * Returns avg / min / max price, currency, unit (per job, per day, per test),
 * and sample size. Lets AI answer "how much for an EICR in London" with
 * specific numbers, not guesses.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { queryTable, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface PricingRow {
  region: string | null;
  county: string | null;
  job_type: string;
  job_category: string | null;
  min_price: string | number | null;
  max_price: string | number | null;
  average_price: string | number | null;
  currency: string | null;
  unit: string | null;
  complexity_level: string | null;
  is_active: boolean | null;
}

const REGION_ALIASES: Record<string, string[]> = {
  london: ['London', 'Greater London'],
  southeast: ['South East'],
  southwest: ['South West'],
  eastmidlands: ['East Midlands'],
  westmidlands: ['West Midlands'],
  northwest: ['North West'],
  northeast: ['North East'],
  yorkshire: ['Yorkshire', 'Yorkshire and The Humber'],
  scotland: ['Scotland'],
  wales: ['Wales'],
  northernireland: ['Northern Ireland'],
  east: ['East of England', 'East'],
};

function normaliseRegion(input: string | null): string[] {
  if (!input) return [];
  const key = input.toLowerCase().replace(/[\s-]/g, '');
  return REGION_ALIASES[key] || [input];
}

function num(v: string | number | null): number | null {
  if (v === null) return null;
  const n = typeof v === 'string' ? Number.parseFloat(v) : v;
  return Number.isFinite(n) ? n : null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const job = (url.searchParams.get('job') || '').trim();
  const region = url.searchParams.get('region');

  if (job.length < 3) {
    return errorResponse(
      "Query param 'job' must be at least 3 characters (e.g. EICR, EV Charger, Consumer Unit, Shower)"
    );
  }

  const ilikeTerm = `*${escapeIlike(job)}*`;
  const queryString =
    `select=region,county,job_type,job_category,min_price,max_price,average_price,currency,unit,complexity_level,is_active` +
    `&is_active=eq.true` +
    `&job_type=ilike.${encodeURIComponent(ilikeTerm)}` +
    `&limit=500`;

  const result = await queryTable<PricingRow>('regional_job_pricing', queryString);

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query regional pricing',
        upstream_status: result.status,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  let rows = result.data;

  // Filter by region if provided
  if (region) {
    const wantedRegions = normaliseRegion(region).map((r) => r.toLowerCase());
    rows = rows.filter(
      (r) =>
        (r.region && wantedRegions.includes(r.region.toLowerCase())) ||
        (r.county && wantedRegions.includes(r.county.toLowerCase()))
    );
  }

  if (rows.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No pricing data for job='${job}'${region ? ` in region='${region}'` : ''}. Try broader terms like 'EICR', 'EV Charger', 'Consumer Unit', 'Shower', 'Rewire'.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  const averages = rows.map((r) => num(r.average_price)).filter((n): n is number => n !== null);
  const mins = rows.map((r) => num(r.min_price)).filter((n): n is number => n !== null);
  const maxes = rows.map((r) => num(r.max_price)).filter((n): n is number => n !== null);

  const avgPrice = averages.length
    ? Math.round((averages.reduce((s, n) => s + n, 0) / averages.length) * 100) / 100
    : null;
  const minPrice = mins.length ? Math.min(...mins) : null;
  const maxPrice = maxes.length ? Math.max(...maxes) : null;

  const uniqueRegions = Array.from(
    new Set(rows.map((r) => r.region).filter((r): r is string => !!r))
  );
  const unitsObserved = Array.from(
    new Set(rows.map((r) => r.unit).filter((u): u is string => !!u))
  );

  return jsonResponse({
    query: { job, region: region || null },
    matched_job_types: Array.from(new Set(rows.map((r) => r.job_type))),
    sample_size: rows.length,
    regions_included: uniqueRegions,
    units_observed: unitsObserved,
    currency: rows[0]?.currency || 'GBP',
    pricing_gbp: {
      avg: avgPrice,
      min: minPrice,
      max: maxPrice,
    },
    notes:
      'Verified UK market pricing data aggregated by Elec-Mate. Variation reflects regional rate, complexity, site access, and listed contractor margins.',
    citation: 'Elec-Mate Regional Job Pricing — UK market rates (2026)',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/electrician-day-rates-uk',
  });
}
