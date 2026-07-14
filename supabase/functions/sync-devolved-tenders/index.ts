import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Ingests OPEN electrical tenders from the devolved-nations procurement
// portals into public.tender_opportunities (same table the VPS pipeline
// feeds from Contracts Finder / Find a Tender).
//
// Runs here rather than on the VPS because both portals IP-block the
// Hetzner range (connection reset) — Supabase egress reaches them fine.
//  - Public Contracts Scotland: working OCDS API
//  - Sell2Wales: same Millstream API shape; their API currently 500s on
//    every documented query ("Error converting data type nvarchar to
//    float") — we attempt it each run and skip gracefully until they fix it.
//
// Invoked daily by pg_cron (sync-devolved-tenders-daily).

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SOURCES = [
  {
    source: 'public_contracts_scotland',
    base: 'https://api.publiccontractsscotland.gov.uk/v1/Notices',
    noticeBase: 'https://www.publiccontractsscotland.gov.uk',
    defaultRegion: 'scotland',
  },
  {
    source: 'sell2wales',
    base: 'https://api.sell2wales.gov.wales/v1/Notices',
    noticeBase: 'https://www.sell2wales.gov.wales',
    defaultRegion: 'wales',
  },
];

// noticeType 2 = OJEU contract notice; 51 = site invitation to tender
// (sub-threshold local work — the small jobs solo contractors can win)
const NOTICE_TYPES = [2, 51];

// Electrical CPV prefixes — mirrors src/pipelines/tenders.py on the VPS
const ELECTRICAL_CPV = [
  '4531',
  '4521',
  '5071',
  '7131',
  '7132',
  '7133',
  '3970',
  '3134',
  '4534',
  '5053',
  '3151',
  '3152',
  '4231',
];

const KEYWORDS = [
  'electrical installation',
  'electrical contractor',
  'electrical works',
  'rewire',
  'mechanical and electrical',
  'm&e services',
  'ev charging',
  'solar pv',
  'fire alarm',
  'eicr',
  'electrical maintenance',
  'data cabling',
  'emergency lighting',
  'lighting installation',
  'street lighting',
  'electrical testing',
  'electrical infrastructure',
  'electrician',
  'fire detection',
  'lightning protection',
  'led lighting',
  'switchgear',
  'substation',
  'battery energy storage',
  'photovoltaic',
  'distribution board',
  'fixed wire testing',
  'door entry system',
];

const EXCLUDE = ['medical electr', 'electronic voting', 'electoral'];

const CATEGORY_RULES: Array<[string, string[]]> = [
  ['fire_alarm', ['fire alarm', 'fire detection', 'bs 5839']],
  ['emergency_lighting', ['emergency light', 'bs 5266']],
  ['ev_charging', ['ev charg', 'electric vehicle charg', 'evse']],
  [
    'data_cabling',
    ['data cabling', 'structured cabling', 'cat6', 'network cabling', 'containment'],
  ],
  ['rewire', ['rewire', 're-wire']],
  ['consumer_units', ['consumer unit', 'distribution board', 'switchgear', 'lv panel']],
  ['testing', ['eicr', 'electrical testing', 'fixed wire test', 'periodic inspection', 'pat test']],
  ['electrical', ['electric', 'm&e', 'mechanical and electrical', 'lighting', 'solar', 'power']],
];

function isElectrical(tender: Record<string, unknown>): { ok: boolean; cpvs: string[] } {
  const t = tender as {
    title?: string;
    description?: string;
    items?: Array<{ classification?: { id?: string } }>;
    classification?: { id?: string };
  };
  const cpvs: string[] = [];
  for (const item of t.items ?? []) {
    if (item?.classification?.id) cpvs.push(String(item.classification.id));
  }
  if (t.classification?.id) cpvs.push(String(t.classification.id));
  const blob = `${t.title ?? ''} ${t.description ?? ''} ${cpvs.join(' ')}`.toLowerCase();
  if (EXCLUDE.some((x) => blob.includes(x))) return { ok: false, cpvs };
  const cpvHit = cpvs.some((c) => ELECTRICAL_CPV.some((p) => c.startsWith(p)));
  const kwHit = KEYWORDS.some((k) => blob.includes(k));
  return { ok: cpvHit || kwHit, cpvs };
}

function deriveCategories(blob: string): string[] {
  const cats = CATEGORY_RULES.filter(([, terms]) => terms.some((t) => blob.includes(t))).map(
    ([c]) => c
  );
  return cats.length ? cats : ['electrical'];
}

function relevance(blob: string, cpvs: string[], value: number | null, cats: string[]): number {
  let score = 40;
  if (cpvs.some((c) => c.startsWith('4531') || c.startsWith('5071') || c.startsWith('5053')))
    score += 30;
  if (cats.length > 1 || cats[0] !== 'electrical') score += 12;
  if (value != null) {
    if (value >= 10_000 && value <= 500_000) score += 15;
    else if (value > 5_000_000) score -= 15;
  }
  score += Math.min(
    10,
    ['electrical', 'rewire', 'lighting', 'fire alarm', 'eicr'].filter((k) => blob.includes(k))
      .length * 2
  );
  return Math.max(0, Math.min(100, score));
}

function mapRelease(
  release: Record<string, unknown>,
  src: (typeof SOURCES)[number]
): Record<string, unknown> | null {
  const rel = release as {
    ocid?: string;
    id?: string;
    date?: string;
    buyer?: { name?: string };
    parties?: Array<{ roles?: string[]; contactPoint?: Record<string, string> }>;
    tender?: Record<string, unknown>;
  };
  const tender = (rel.tender ?? {}) as {
    title?: string;
    description?: string;
    value?: { amount?: number; currency?: string };
    tenderPeriod?: { endDate?: string };
    contractPeriod?: { startDate?: string };
    items?: Array<{ deliveryAddresses?: Array<Record<string, string>> }>;
    documents?: Array<{ url?: string }>;
  };
  const { ok, cpvs } = isElectrical(tender);
  if (!ok) return null;
  const ocid = rel.ocid ?? rel.id;
  if (!ocid) return null;

  const deadline = tender.tenderPeriod?.endDate ?? null;
  if (deadline && new Date(deadline) < new Date()) return null;

  let value: number | null = null;
  const rawAmount = tender.value?.amount;
  if (typeof rawAmount === 'number' && isFinite(rawAmount) && rawAmount > 0 && rawAmount < 1e12) {
    value = Math.round(rawAmount * 100) / 100;
  }

  const addr = tender.items?.[0]?.deliveryAddresses?.[0] ?? {};
  const title = (tender.title ?? 'Untitled tender').slice(0, 500);
  const blob = `${title} ${tender.description ?? ''}`.toLowerCase();
  const cats = deriveCategories(blob);
  const contact = rel.parties?.find((p) => (p.roles ?? []).includes('buyer'))?.contactPoint ?? {};

  const score = relevance(blob, cpvs, value, cats);
  const parts = [
    `${(cats[0] ?? 'electrical').replace(/_/g, ' ')} contract`.replace(/^\w/, (c) =>
      c.toUpperCase()
    ),
  ];
  if (value) parts.push(`~£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`);
  if (deadline) parts.push(`bids close ${deadline.slice(0, 10)}`);

  return {
    external_id: String(ocid),
    source: src.source,
    source_url: tender.documents?.find((d) => d.url)?.url ?? src.noticeBase,
    title,
    description: tender.description ?? null,
    client_name: rel.buyer?.name ?? null,
    client_type: 'public_sector',
    cpv_codes: cpvs.length ? cpvs : null,
    categories: cats,
    region: src.defaultRegion,
    relevance_score: score,
    ai_summary: parts.join(' · '),
    value_exact: value,
    currency: tender.value?.currency ?? 'GBP',
    location_text: addr.region ?? addr.locality ?? null,
    postcode: addr.postalCode ?? null,
    published_at: rel.date ?? null,
    deadline,
    expires_at: deadline,
    contact_name: contact.name ?? null,
    contact_email: contact.email ?? null,
    contact_phone: contact.telephone ?? null,
    status: 'live',
    opportunity_type: 'tender',
    raw_data: release,
    fetched_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function monthParams(): string[] {
  // current + previous month, mm-yyyy (the Millstream API date format)
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const fmt = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  return [fmt(now), fmt(prev)];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const stats: Record<
    string,
    { fetched: number; kept: number; upserted: number; errors: string[] }
  > = {};

  for (const src of SOURCES) {
    const s = { fetched: 0, kept: 0, upserted: 0, errors: [] as string[] };
    stats[src.source] = s;
    const rows: Record<string, unknown>[] = [];
    const seen = new Set<string>();

    for (const month of monthParams()) {
      for (const noticeType of NOTICE_TYPES) {
        try {
          const url = `${src.base}?dateFrom=${month}&noticeType=${noticeType}&outputType=0`;
          const r = await fetch(url, {
            headers: { Accept: 'application/json', 'User-Agent': 'Elec-Mate/1.0' },
          });
          if (!r.ok) {
            s.errors.push(`${month}/nt${noticeType}: HTTP ${r.status}`);
            continue;
          }
          const releases =
            ((await r.json()) as { releases?: Record<string, unknown>[] }).releases ?? [];
          s.fetched += releases.length;
          for (const rel of releases) {
            const mapped = mapRelease(rel, src);
            if (mapped && !seen.has(mapped.external_id as string)) {
              seen.add(mapped.external_id as string);
              rows.push(mapped);
            }
          }
        } catch (e) {
          s.errors.push(`${month}/nt${noticeType}: ${String(e).slice(0, 120)}`);
        }
      }
    }

    s.kept = rows.length;
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      const { error } = await supabase
        .from('tender_opportunities')
        .upsert(batch, { onConflict: 'external_id' });
      if (error) s.errors.push(`upsert: ${error.message.slice(0, 120)}`);
      else s.upserted += batch.length;
    }
  }

  console.log('[sync-devolved-tenders]', JSON.stringify(stats));
  return new Response(JSON.stringify({ success: true, stats }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
