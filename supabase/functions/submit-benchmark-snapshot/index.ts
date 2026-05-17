// submit-benchmark-snapshot — submit a college's anonymised monthly snapshot
// to the national benchmark pool, ONLY if they're opted in.
// ELE-934 (K2). Service-role only. Called by a monthly cron.
//
// POST { mode: 'cron' | 'single', college_id? }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function isoMonth(d = new Date()): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function sectorBand(learnerCount: number): string {
  if (learnerCount < 150) return 'small';
  if (learnerCount < 500) return 'medium';
  return 'large';
}

async function ensureToken(
  sb: ReturnType<typeof createClient>,
  collegeId: string
): Promise<string> {
  const { data: existing } = await sb
    .from('college_benchmark_tokens')
    .select('current_token, rotates_at')
    .eq('college_id', collegeId)
    .maybeSingle();
  if (existing && new Date(existing.rotates_at) > new Date()) {
    return existing.current_token as string;
  }
  // Rotate yearly
  const arr = new Uint8Array(24);
  crypto.getRandomValues(arr);
  const token = Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
  const rotatesAt = new Date(Date.now() + 365 * 86_400_000).toISOString();
  await sb
    .from('college_benchmark_tokens')
    .upsert({ college_id: collegeId, current_token: token, rotates_at: rotatesAt });
  return token;
}

async function snapshotForCollege(
  sb: ReturnType<typeof createClient>,
  collegeId: string,
  optIn: Record<string, boolean>
) {
  // Pull what's allowed
  const [studentsRes, attendanceRes, gradesRes, epaRes] = await Promise.all([
    sb
      .from('college_students')
      .select('id, status')
      .eq('college_id', collegeId),
    optIn.share_attendance
      ? sb
          .from('college_attendance')
          .select('status, date, student_id')
          .gte('date', new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10))
      : Promise.resolve({ data: [] }),
    optIn.share_achievement
      ? sb.from('college_grades').select('grade, status')
      : Promise.resolve({ data: [] }),
    optIn.share_epa
      ? sb.from('college_epa').select('status, result')
      : Promise.resolve({ data: [] }),
  ]);

  const students = (studentsRes.data ?? []) as Array<{ id: string; status: string }>;
  const total = students.length;
  const active = students.filter((s) => s.status === 'Active').length;
  const withdrawn = students.filter((s) => s.status === 'withdrawn').length;
  const retention = total ? (active / total) * 100 : null;

  const attendance = (attendanceRes.data ?? []) as Array<{ status: string }>;
  const present = attendance.filter(
    (a) => a.status === 'Present' || a.status === 'Authorised'
  ).length;
  const attendancePct = attendance.length ? (present / attendance.length) * 100 : null;

  const grades = (gradesRes.data ?? []) as Array<{ grade: string }>;
  const achievementPct = grades.length
    ? (grades.filter((g) =>
        ['pass', 'merit', 'distinction', 'P', 'M', 'D'].includes((g.grade ?? '').toLowerCase())
      ).length /
        grades.length) *
      100
    : null;

  const epa = (epaRes.data ?? []) as Array<{ status: string; result?: string }>;
  const epaPass = epa.filter((e) =>
    ['pass', 'merit', 'distinction'].includes((e.result ?? '').toLowerCase())
  ).length;
  const epaDistinction = epa.filter(
    (e) => (e.result ?? '').toLowerCase() === 'distinction'
  ).length;
  const epaPassPct = epa.length ? (epaPass / epa.length) * 100 : null;
  const epaDistinctionPct = epa.length ? (epaDistinction / epa.length) * 100 : null;

  return {
    learner_count: total,
    attendance_pct: attendancePct,
    retention_pct: retention,
    achievement_pct: achievementPct,
    epa_pass_pct: epaPassPct,
    epa_distinction_pct: epaDistinctionPct,
    otj_on_track_pct: null,         // TODO: aggregate from forecaster
    fs_gateway_clear_pct: null,     // TODO: aggregate from fs view
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: { mode?: 'cron' | 'single'; college_id?: string };
  try {
    body = (await req.json()) as any;
  } catch {
    body = { mode: 'cron' };
  }

  let optInQuery = sb
    .from('college_benchmark_opt_in')
    .select('*')
    .is('opted_out_at', null)
    .not('opted_in_at', 'is', null);
  if (body.mode === 'single' && body.college_id) {
    optInQuery = optInQuery.eq('college_id', body.college_id);
  }

  const { data: optIns, error: oErr } = await optInQuery;
  if (oErr) {
    return new Response(JSON.stringify({ error: oErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const month = isoMonth();
  const results: Array<{ college_id: string; status: string }> = [];

  for (const opt of (optIns ?? []) as Array<any>) {
    try {
      const token = await ensureToken(sb, opt.college_id);
      const snap = await snapshotForCollege(sb, opt.college_id, opt);

      // Region/sector — we infer from settings; leave null if unknown.
      const { data: college } = await sb
        .from('colleges')
        .select('settings')
        .eq('id', opt.college_id)
        .maybeSingle();
      const region = (college?.settings as any)?.region_band ?? null;
      const sector = sectorBand(snap.learner_count ?? 0);

      await sb.from('national_benchmark_snapshots').upsert(
        {
          anonymous_token: token,
          iso_month: month,
          sector_band: sector,
          region_band: region,
          ...snap,
        },
        { onConflict: 'anonymous_token,iso_month' }
      );

      // Build comparison cache (this college vs median of its band)
      const { data: medianRow } = await sb
        .from('national_benchmark_medians')
        .select('*')
        .eq('iso_month', month)
        .eq('sector_band', sector)
        .maybeSingle();

      await sb.from('college_benchmark_comparison_cache').upsert({
        college_id: opt.college_id,
        iso_month: month,
        this_college: snap,
        national_median: medianRow ?? {},
        rank_within_sector_pct: null,
      });

      results.push({ college_id: opt.college_id, status: 'submitted' });
    } catch (e) {
      results.push({
        college_id: opt.college_id,
        status: `failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  }

  return new Response(JSON.stringify({ month, results }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
