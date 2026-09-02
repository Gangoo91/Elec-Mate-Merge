/**
 * Admin Sentry stats — errors in the last 24 hours, against the 24 before, and
 * the three loudest unresolved issues. A dashboard that cannot tell you the
 * app is broken is not finished.
 *
 * Needs SENTRY_AUTH_TOKEN (an org auth token with project:read + event:read).
 * Without it the function answers `configured: false` and the page says so
 * rather than showing a zero that means nothing. Cached five minutes in
 * admin_metric_cache; Sentry's API is not fast.
 */
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

const ORG = 'elec-mate';
const REGION = 'https://de.sentry.io';
const CACHE_KEY = 'sentry_overview';
const CACHE_FRESH_MS = 5 * 60 * 1000;

type SentryOverview = {
  configured: boolean;
  errors24h: number | null;
  errorsPrev24h: number | null;
  topIssues: Array<{ title: string; count: number; permalink: string; culprit: string | null }>;
  asOf: string;
};

async function fetchSentry(token: string): Promise<SentryOverview> {
  const headers = { Authorization: `Bearer ${token}` };
  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();
  const stats = async (startMs: number, endMs: number) => {
    const url =
      `${REGION}/api/0/organizations/${ORG}/stats_v2/` +
      `?field=sum(quantity)&category=error&outcome=accepted&interval=1d` +
      `&start=${encodeURIComponent(iso(startMs))}&end=${encodeURIComponent(iso(endMs))}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Sentry stats ${res.status}: ${await res.text()}`);
    const json = await res.json();
    const groups = (json.groups ?? []) as Array<{ totals?: Record<string, number> }>;
    return groups.reduce((t, g) => t + (g.totals?.['sum(quantity)'] ?? 0), 0);
  };
  const [errors24h, errorsPrev24h] = await Promise.all([
    stats(now - 24 * 3600 * 1000, now),
    stats(now - 48 * 3600 * 1000, now - 24 * 3600 * 1000),
  ]);
  const issuesRes = await fetch(
    `${REGION}/api/0/organizations/${ORG}/issues/?statsPeriod=24h&query=${encodeURIComponent('is:unresolved')}&sort=freq&limit=3`,
    { headers }
  );
  if (!issuesRes.ok) throw new Error(`Sentry issues ${issuesRes.status}: ${await issuesRes.text()}`);
  const issues = (await issuesRes.json()) as Array<{
    title: string;
    count: string | number;
    permalink: string;
    culprit?: string;
  }>;
  return {
    configured: true,
    errors24h,
    errorsPrev24h,
    topIssues: issues.map((i) => ({
      title: i.title,
      count: Number(i.count) || 0,
      permalink: i.permalink,
      culprit: i.culprit ?? null,
    })),
    asOf: new Date().toISOString(),
  };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');
    const { data: profile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (!profile?.admin_role) throw new Error('Admin access required');

    const token = Deno.env.get('SENTRY_AUTH_TOKEN');
    if (!token) {
      const body: SentryOverview = {
        configured: false,
        errors24h: null,
        errorsPrev24h: null,
        topIssues: [],
        asOf: new Date().toISOString(),
      };
      return new Response(JSON.stringify(body), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { data: cached } = await admin
      .from('admin_metric_cache')
      .select('value, updated_at')
      .eq('key', CACHE_KEY)
      .maybeSingle();
    if (cached?.value && Date.now() - new Date(cached.updated_at).getTime() < CACHE_FRESH_MS) {
      return new Response(JSON.stringify(cached.value), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const fresh = await fetchSentry(token);
    await admin
      .from('admin_metric_cache')
      .upsert({ key: CACHE_KEY, value: fresh, updated_at: new Date().toISOString() });
    return new Response(JSON.stringify(fresh), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
