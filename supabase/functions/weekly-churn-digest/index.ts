// Weekly churn digest — Saturday-night cancellation analysis (Andrew's ask,
// 2026-07-31). Aggregates the week's cancel_survey_responses (with their
// frozen context snapshots) + Stripe paying-vs-trial split, segments the
// leavers into actionable groups, emails founder@ via the Brevo shim, and —
// when LINEAR_API_KEY is configured — raises the week's churn-review ticket.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface SurveyRow {
  user_id: string;
  reason: string;
  reason_detail: string | null;
  outcome: string;
  subscription_tier: string | null;
  created_at: string;
  context: Record<string, unknown>;
}

interface Enriched extends SurveyRow {
  name: string;
  email: string;
}

/** House format: day/month/year, always. */
function ukDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Paying-vs-trial split, decided by whether the customer EVER PAID — not by
 * cancel timing. The old heuristic (cancelled within 1h of trial_end = trial)
 * misclassified the failed-first-invoice pattern: trial ends, the invoice
 * fails, Stripe's dunning cancels the sub 2–3 weeks later, and someone who
 * never paid a penny showed up as "paying lost". Audited 2026-08-29: 6 of the
 * week's "16 paying lost" had only £0/failed invoices — the digest overstated
 * paying churn by 60% and revenue lost by 84% (£233.84 vs the true £126.90).
 */
interface PayingChurner {
  customerId: string;
  email: string | null;
  name: string | null;
  monthlyGbp: number;
  totalPaidGbp: number;
  tenureMonths: number;
  /** Set when the person is NOT actually lost — resubscribed or went lifetime. */
  cameBack: null | 'resubscribed' | 'lifetime';
  userId?: string | null;
  reason?: string | null;
  reasonDetail?: string | null;
}

async function stripeWeekSplit(since: number): Promise<{
  churners: PayingChurner[];
  trials: number;
  failedFirstPayment: number;
}> {
  const key = Deno.env.get('STRIPE_SECRET_KEY');
  const out = { churners: [] as PayingChurner[], trials: 0, failedFirstPayment: 0 };
  if (!key) return out;
  const headers = { Authorization: `Bearer ${key}` };

  // deno-lint-ignore no-explicit-any
  const candidates: any[] = [];
  let after: string | null = null;
  for (let page = 0; page < 20; page++) {
    const url = `https://api.stripe.com/v1/subscriptions?status=canceled&limit=100${after ? `&starting_after=${after}` : ''}`;
    const res = await fetch(url, { headers });
    const d = await res.json();
    if (!d.data) break;
    for (const s of d.data) {
      const ca = s.canceled_at;
      if (!ca || ca < since) continue;
      const te = s.trial_end;
      if (te && ca <= te + 3600) {
        out.trials++;
      } else {
        candidates.push(s);
      }
    }
    if (!d.has_more) break;
    after = d.data[d.data.length - 1].id;
    // canceled list is not time-ordered; keep paging but stop after 20 pages
  }

  // Ground truth per candidate: at least one invoice with money actually
  // collected (the old cancel-timing heuristic counted failed-first-invoice
  // trials as paying churn — audited 2026-08-29, 6 of "16" had never paid).
  for (const s of candidates) {
    let paidPence = 0;
    try {
      const res = await fetch(
        `https://api.stripe.com/v1/invoices?subscription=${s.id}&limit=100`,
        { headers }
      );
      const inv = await res.json();
      for (const i of inv.data ?? []) paidPence += i.amount_paid ?? 0;
    } catch {
      // Can't verify — count as paying rather than silently shrinking churn.
      paidPence = 1;
    }
    if (paidPence <= 0) {
      // Trial ended, first payment never collected — a conversion failure,
      // not revenue churn. Worth its own number: these are card-fix saves.
      out.failedFirstPayment++;
      continue;
    }

    let monthly = 0;
    for (const it of s.items?.data ?? []) {
      const amt = (it.price?.unit_amount ?? 0) * (it.quantity ?? 1);
      const iv = it.price?.recurring?.interval;
      monthly += iv === 'year' ? amt / 100 / 12 : amt / 100;
    }

    // Identity + come-back check on the same customer. A cancel followed by a
    // new active sub (plan switch, resubscribe) is not a loss; nor is the
    // lifetime fulfilment, which CANCELS the sub as part of the upgrade
    // (checked against profiles later, where lifetime is recorded).
    let email: string | null = null;
    let name: string | null = null;
    let cameBack: PayingChurner['cameBack'] = null;
    try {
      const c = await (
        await fetch(`https://api.stripe.com/v1/customers/${s.customer}`, { headers })
      ).json();
      email = c.email ?? null;
      name = c.name ?? null;
      const live = await (
        await fetch(
          `https://api.stripe.com/v1/subscriptions?customer=${s.customer}&status=all&limit=10`,
          { headers }
        )
      ).json();
      if (
        (live.data ?? []).some((x: { status: string }) =>
          ['active', 'trialing', 'past_due'].includes(x.status)
        )
      ) {
        cameBack = 'resubscribed';
      }
    } catch {
      /* identity is best-effort */
    }

    out.churners.push({
      customerId: s.customer,
      email,
      name,
      monthlyGbp: Math.round(monthly * 100) / 100,
      totalPaidGbp: Math.round(paidPence) / 100,
      tenureMonths: Math.round(((s.canceled_at - s.created) / 86400 / 30.4) * 10) / 10,
      cameBack,
    });
  }
  return out;
}

interface StorePaidLeaver {
  userId: string;
  email: string | null;
  name: string | null;
  store: string;
  productId: string;
  lifetimeGrossUsd: number;
  cameBack: boolean;
}

/**
 * Which of this week's store EXPIRATIONs had actually PAID? RevenueCat fires
 * EXPIRATION for free trials running out too — of 73 August expirations only
 * 23 had ever paid a penny. `total_revenue_in_usd.gross > 0` on the RC v2
 * subscriptions list is the ground truth. Fail-open per user: an RC error
 * skips that user rather than killing the digest.
 */
async function storePaidLeavers(
  // deno-lint-ignore no-explicit-any
  db: any,
  sinceIso: string
): Promise<StorePaidLeaver[]> {
  const rcKey = Deno.env.get('REVENUECAT_API_V2_KEY');
  if (!rcKey) return [];
  const { data: exps } = await db
    .from('billing_events')
    .select('user_id, store, product_id')
    .eq('event_type', 'EXPIRATION')
    .gte('created_at', sinceIso);
  const seen = new Set<string>();
  const out: StorePaidLeaver[] = [];
  for (const e of (exps ?? []).slice(0, 40)) {
    if (!e.user_id || seen.has(e.user_id)) continue;
    seen.add(e.user_id);
    try {
      const res = await fetch(
        `https://api.revenuecat.com/v2/projects/proj5dd5e597/customers/${e.user_id}/subscriptions`,
        { headers: { Authorization: `Bearer ${rcKey}` } }
      );
      if (!res.ok) continue;
      const d = await res.json();
      let gross = 0;
      let anyActive = false;
      for (const sub of d.items ?? []) {
        gross += Number(sub.total_revenue_in_usd?.gross ?? 0);
        if (sub.gives_access) anyActive = true;
      }
      if (gross <= 0) continue;

      let email: string | null = null;
      let name: string | null = null;
      try {
        const { data: au } = await db.auth.admin.getUserById(e.user_id);
        email = au?.user?.email ?? null;
        const { data: prof } = await db
          .from('profiles')
          .select('full_name, subscribed')
          .eq('id', e.user_id)
          .maybeSingle();
        name = prof?.full_name ?? null;
        if (prof?.subscribed === true) anyActive = true;
      } catch {
        /* best-effort */
      }
      out.push({
        userId: e.user_id,
        email,
        name,
        store: e.store === 'PLAY_STORE' ? 'Play' : e.store === 'APP_STORE' ? 'Apple' : e.store,
        productId: e.product_id ?? '',
        lifetimeGrossUsd: Math.round(gross * 100) / 100,
        cameBack: anyActive,
      });
    } catch {
      /* skip on error */
    }
  }
  out.sort((a, b) => b.lifetimeGrossUsd - a.lifetimeGrossUsd);
  return out;
}

interface LinearIssue {
  identifier: string;
  url: string;
}

function linearGql(query: string, variables: Record<string, unknown>) {
  const key = Deno.env.get('LINEAR_API_KEY');
  if (!key) return Promise.resolve(null);
  return fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { Authorization: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // deno-lint-ignore no-explicit-any
  }).then((r) => r.json() as Promise<any>);
}

let _teamId: string | null = null;
async function linearTeamId(): Promise<string | null> {
  if (_teamId) return _teamId;
  const teams = await linearGql('query { teams(first: 10) { nodes { id key } } }', {});
  _teamId =
    teams?.data?.teams?.nodes?.find((t: { key: string }) => t.key === 'ELE')?.id ?? null;
  return _teamId;
}

/** Create an issue unless an open one with this title already exists. */
async function createIssueOnce(title: string, markdown: string): Promise<LinearIssue | null> {
  const teamId = await linearTeamId();
  if (!teamId) return null;
  const existing = await linearGql(
    `query($filter: IssueFilter) { issues(filter: $filter, first: 1) { nodes { identifier url } } }`,
    {
      filter: {
        team: { id: { eq: teamId } },
        title: { eq: title },
        state: { type: { nin: ['completed', 'canceled'] } },
      },
    }
  );
  const found = existing?.data?.issues?.nodes?.[0];
  if (found) return found as LinearIssue;
  const created = await linearGql(
    `mutation($input: IssueCreateInput!) { issueCreate(input: $input) { issue { identifier url } } }`,
    { input: { teamId, title, description: markdown } }
  );
  return (created?.data?.issueCreate?.issue as LinearIssue) ?? null;
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400_000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 86400_000);

    const { data: rows } = await db
      .from('cancel_survey_responses')
      .select('user_id, reason, reason_detail, outcome, subscription_tier, created_at, context')
      .gte('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false });

    const all = (rows ?? []) as SurveyRow[];
    const thisWeek = all.filter((r) => r.created_at >= weekAgo.toISOString());
    const lastWeek = all.filter((r) => r.created_at < weekAgo.toISOString());

    // Enrich this week's rows with identity (one query per unique user)
    const uids = [...new Set(thisWeek.map((r) => r.user_id))];
    const identities = new Map<string, { name: string; email: string }>();
    for (const uid of uids) {
      const { data: prof } = await db
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .maybeSingle();
      const { data: au } = await db.auth.admin.getUserById(uid);
      identities.set(uid, {
        name: prof?.full_name || au?.user?.email || uid.slice(0, 8),
        email: au?.user?.email || '',
      });
    }
    const enriched: Enriched[] = thisWeek.map((r) => ({
      ...r,
      ...(identities.get(r.user_id) ?? { name: r.user_id.slice(0, 8), email: '' }),
    }));

    // ── Analysis ──
    const reasonCount = (list: SurveyRow[]) => {
      const m = new Map<string, number>();
      for (const r of list) m.set(r.reason, (m.get(r.reason) ?? 0) + 1);
      return m;
    };
    const rcThis = reasonCount(thisWeek);
    const rcLast = reasonCount(lastWeek);
    const reasons = [...new Set([...rcThis.keys(), ...rcLast.keys()])].sort(
      (a, b) => (rcThis.get(b) ?? 0) - (rcThis.get(a) ?? 0)
    );

    // Rows older than the snapshot trigger carry empty context — fall back to
    // live activity data so nobody shows as "0h / 0 sessions" wrongly.
    const needsFallback = [
      ...new Set(
        thisWeek
          .filter((r) => !r.context || Object.keys(r.context).length === 0)
          .map((r) => r.user_id)
      ),
    ];
    const liveCtx = new Map<string, Record<string, unknown>>();
    if (needsFallback.length) {
      const { data: acts } = await db
        .from('user_activity_summary')
        .select('user_id, active_days, session_count, total_seconds_tracked, features_used')
        .in('user_id', needsFallback);
      for (const a of acts ?? []) {
        liveCtx.set(a.user_id, {
          active_days_30d: a.active_days,
          sessions_30d: a.session_count,
          hours_30d: Math.round(((a.total_seconds_tracked ?? 0) / 3600) * 10) / 10,
          features_used: a.features_used ?? [],
        });
      }
      const { data: certAgg } = await db
        .from('reports')
        .select('user_id')
        .in('user_id', needsFallback)
        .is('deleted_at', null);
      for (const c of certAgg ?? []) {
        const cur = liveCtx.get(c.user_id) ?? {};
        cur.certs_total = Number(cur.certs_total ?? 0) + 1;
        liveCtx.set(c.user_id, cur);
      }
      for (const uid of needsFallback) {
        const { data: au } = await db.auth.admin.getUserById(uid);
        if (au?.user?.created_at) {
          const cur = liveCtx.get(uid) ?? {};
          cur.tenure_days = Math.floor(
            (Date.now() - new Date(au.user.created_at).getTime()) / 86400_000
          );
          liveCtx.set(uid, cur);
        }
      }
    }

    const num = (r: SurveyRow, k: string) => {
      const fromCtx = (r.context as Record<string, unknown>)?.[k];
      if (fromCtx !== undefined && fromCtx !== null) return Number(fromCtx);
      return Number(liveCtx.get(r.user_id)?.[k] ?? 0);
    };
    const dedupe = new Map<string, Enriched>();
    for (const r of enriched) if (!dedupe.has(r.user_id)) dedupe.set(r.user_id, r);
    const people = [...dedupe.values()];

    const savable = people.filter((r) => r.outcome === 'pending' || r.outcome === 'stayed');
    const heavy = people.filter((r) => r.outcome === 'cancelled' && num(r, 'hours_30d') >= 3);
    const tourists = people.filter((r) => r.outcome === 'cancelled' && num(r, 'tenure_days') <= 2);
    const activated = people.filter(
      (r) => num(r, 'certs_total') > 0 || num(r, 'invoices_total') > 0 || num(r, 'quotes_total') > 0
    );

    const stripe = await stripeWeekSplit(Math.floor(weekAgo.getTime() / 1000));

    // ── Enrich web churners: lifetime upgrades, store resubs, survey reasons ──
    // The lifetime fulfilment CANCELS the Stripe sub, so a £300 buyer looks
    // like churn in every subscription query (info@ozzyelectrical, Aug 2026).
    try {
      const custIds = stripe.churners.map((c) => c.customerId);
      if (custIds.length > 0) {
        const { data: profs } = await db
          .from('profiles')
          .select('id, stripe_customer_id, subscribed, free_access_granted, free_access_reason, full_name')
          .in('stripe_customer_id', custIds);
        const byCust = new Map((profs ?? []).map((p: Record<string, unknown>) => [p.stripe_customer_id, p]));
        for (const ch of stripe.churners) {
          const p = byCust.get(ch.customerId) as Record<string, unknown> | undefined;
          if (!p) continue;
          ch.userId = p.id as string;
          if (!ch.name && p.full_name) ch.name = p.full_name as string;
          if (
            p.free_access_granted === true &&
            typeof p.free_access_reason === 'string' &&
            p.free_access_reason.toLowerCase().includes('lifetime')
          ) {
            ch.cameBack = 'lifetime';
          } else if (!ch.cameBack && p.subscribed === true) {
            ch.cameBack = 'resubscribed';
          }
        }
        const uids = stripe.churners.map((c) => c.userId).filter(Boolean) as string[];
        if (uids.length > 0) {
          const { data: surveys } = await db
            .from('cancel_survey_responses')
            .select('user_id, reason, reason_detail, created_at')
            .in('user_id', uids)
            .gte('created_at', twoWeeksAgo.toISOString())
            .order('created_at', { ascending: false });
          const latest = new Map<string, { reason: string; reason_detail: string | null }>();
          for (const s of surveys ?? []) {
            if (!latest.has(s.user_id)) latest.set(s.user_id, s);
          }
          for (const ch of stripe.churners) {
            const s = ch.userId ? latest.get(ch.userId) : undefined;
            if (s) {
              ch.reason = s.reason;
              ch.reasonDetail = s.reason_detail;
            }
          }
        }
      }
    } catch (enrichErr) {
      console.warn('[churn-digest] churner enrichment failed (non-fatal):', enrichErr);
    }

    const gone = stripe.churners.filter((c) => !c.cameBack);
    const returned = stripe.churners.filter((c) => c.cameBack);
    const payingLost = gone.length;
    const mrrLost = Math.round(gone.reduce((s, c) => s + c.monthlyGbp, 0) * 100) / 100;

    const storePaid = await storePaidLeavers(db, weekAgo.toISOString()).catch(() => []);
    const storeGone = storePaid.filter((s) => !s.cameBack);
    const storeReturned = storePaid.filter((s) => s.cameBack);

    // App-store churn — store subs can't use the in-app cancel flow, so this
    // comes from the RevenueCat webhook's billing_events log instead.
    // period_type splits paid cancels from trial auto-renew-offs (RC fires
    // CANCELLATION for both — the raw count read as 29 "lost" in a week where
    // RC's own churn chart showed ~4 paid subs actually churning). Rows
    // logged before 2026-08-29 have null period_type = unknown.
    const { data: cancelRows } = await db
      .from('billing_events')
      .select('period_type')
      .eq('event_type', 'CANCELLATION')
      .gte('created_at', weekAgo.toISOString());
    const storeCancels = cancelRows?.length ?? 0;
    const storeCancelsPaid = (cancelRows ?? []).filter((r) => r.period_type === 'NORMAL').length;
    const storeCancelsTrial = (cancelRows ?? []).filter((r) => r.period_type === 'TRIAL').length;
    const storeCancelsUnknown = storeCancels - storeCancelsPaid - storeCancelsTrial;
    const storeCancelLabel =
      storeCancelsUnknown === storeCancels
        ? `${storeCancels}` // all legacy rows — no split available yet
        : `${storeCancelsPaid} paid · ${storeCancelsTrial} trial${storeCancelsUnknown ? ` · ${storeCancelsUnknown} unknown` : ''}`;
    const { count: storeExpirations } = await db
      .from('billing_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_type', 'EXPIRATION')
      .gte('created_at', weekAgo.toISOString());

    const reasonLabel = (k: string) =>
      ({
        not_using: 'Not using it',
        missing_feature: 'Missing feature',
        too_expensive: 'Too expensive',
        switching: 'Switching app',
        bug: 'Hit a bug',
        other: 'Other',
      })[k] ?? k;

    const personLine = (r: Enriched) =>
      `${r.name} <${r.email}> — ${reasonLabel(r.reason)}${r.reason_detail ? ` (${r.reason_detail})` : ''} · ${r.subscription_tier ?? '?'} · ${num(r, 'hours_30d')}h in ${num(r, 'sessions_30d')} sessions · ${num(r, 'certs_total')} certs · ${num(r, 'tenure_days')} days in · ${r.outcome}`;

    // One line per genuine paying leaver — name, money, tenure, and their own
    // words if they gave any. This is the list that used to take a manual
    // Stripe/RC audit to produce.
    const churnerLine = (c: PayingChurner) =>
      `${c.name || c.email || c.customerId} <${c.email ?? '?'}> — £${c.monthlyGbp.toFixed(2)}/mo · paid £${c.totalPaidGbp.toFixed(2)} over ${c.tenureMonths} months · ${c.reason ? `${reasonLabel(c.reason)}${c.reasonDetail ? ` (“${c.reasonDetail}”)` : ''}` : 'no reason given'}`;
    const storeLine = (s: StorePaidLeaver) =>
      `${s.name || s.email || s.userId} <${s.email ?? '?'}> — ${s.store} · $${s.lifetimeGrossUsd.toFixed(2)} lifetime · no reason (store users never see the survey)`;
    const returnedLine = (c: PayingChurner) =>
      `${c.name || c.email || c.customerId} — ${c.cameBack === 'lifetime' ? 'bought LIFETIME (sub cancel was the fulfilment)' : 'resubscribed'}`;

    // ── Markdown (Linear) ──
    const md = [
      `## Churn review — w/e ${ukDate(now)}`,
      ``,
      `**${thisWeek.length} cancel-flow entries** (${people.length} people) vs ${lastWeek.length} last week.`,
      `Web (Stripe): **${payingLost} paying truly lost** (≈£${mrrLost}/mo) + ${stripe.trials} unconverted trials + ${stripe.failedFirstPayment} whose first post-trial payment failed (never paid — card-fix saves, not churn). App stores: **${storeGone.length} paid subs expired without renewing**; ${storeCancelLabel} turned auto-renew off, ${storeExpirations ?? 0} expired in total.`,
      `Activation among leavers: **${activated.length}/${people.length}** ever saved a cert/quote/invoice.`,
      ``,
      `### Paying subscribers truly lost (web)`,
      ...(gone.length ? gone.map((c) => `- ${churnerLine(c)}`) : ['- none']),
      ``,
      `### Paid store subscribers lost (expired, had really paid)`,
      ...(storeGone.length ? storeGone.map((s) => `- ${storeLine(s)}`) : ['- none']),
      ``,
      `### Left but came back — not churn`,
      ...([...returned, ...storeReturned.map((s) => ({ name: s.name, email: s.email, customerId: s.userId, cameBack: 'resubscribed' as const }))].length
        ? [...returned.map(returnedLine), ...storeReturned.map((s) => `${s.name || s.email} — resubscribed (store)`)].map((l) => `- ${l}`)
        : ['- none']),
      ``,
      `### Reasons (this week vs last)`,
      ...reasons.map((k) => `- ${k}: **${rcThis.get(k) ?? 0}** (was ${rcLast.get(k) ?? 0})`),
      ``,
      `### Savable — contact these first`,
      ...(savable.length ? savable.map((r) => `- [ ] ${personLine(r)}`) : ['- none']),
      ``,
      `### Heavy users who left anyway (interview targets)`,
      ...(heavy.length ? heavy.map((r) => `- [ ] ${personLine(r)}`) : ['- none']),
      ``,
      `### Tourists (≤2 days, winback emails handle)`,
      ...(tourists.length ? tourists.map((r) => `- ${personLine(r)}`) : ['- none']),
    ].join('\n');

    // ── HTML (email) — light, card-based, one glance per person ──
    const outcomePill = (o: string) => {
      const bg = o === 'pending' ? '#fff7e0' : o === 'stayed' ? '#e8f6ec' : '#fdecec';
      const fg = o === 'pending' ? '#8a6d00' : o === 'stayed' ? '#1e7a3a' : '#b02a2a';
      const label = o === 'pending' ? 'Undecided' : o === 'stayed' ? 'Stayed' : 'Cancelled';
      return `<span style="display:inline-block; padding:2px 10px; border-radius:20px; background:${bg}; color:${fg}; font-size:11px; font-weight:bold;">${label}</span>`;
    };

    const personCard = (r: Enriched, cta: string) => {
      const subject = encodeURIComponent(`Elec-Mate — quick one, ${(r.name || '').split(' ')[0]}`);
      const stats = [
        `<strong>${num(r, 'hours_30d')}h</strong> in app`,
        `<strong>${num(r, 'sessions_30d')}</strong> sessions`,
        `<strong>${num(r, 'certs_total')}</strong> certs`,
        `<strong>${num(r, 'tenure_days')}</strong> day${num(r, 'tenure_days') === 1 ? '' : 's'} in`,
      ].join(' &nbsp;·&nbsp; ');
      return `
        <div style="border:1px solid #e2e2e2; border-radius:12px; padding:16px 18px; margin:0 0 12px; background:#ffffff;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size:16px; font-weight:bold; color:#111111;">${esc(r.name)}</td>
            <td align="right">${outcomePill(r.outcome)}</td>
          </tr></table>
          <p style="margin:7px 0 3px; font-size:14px; color:#111111;">
            ${esc(reasonLabel(r.reason))}${r.reason_detail ? ` — <em>“${esc(r.reason_detail)}”</em>` : ''}
            &nbsp;·&nbsp; ${esc(r.subscription_tier ?? '?')}
          </p>
          <p style="margin:3px 0 12px; font-size:13px; color:#333333;">${stats}</p>
          <a href="mailto:${esc(r.email)}?subject=${subject}"
             style="display:inline-block; background:#FACC15; color:#111111; text-decoration:none; font-size:13.5px; font-weight:bold; padding:9px 18px; border-radius:8px;">
            ${cta} →
          </a>
        </div>`;
    };

    const sectionHead = (emoji: string, title: string, sub: string) => `
      <div style="margin:32px 0 12px; padding-top:18px; border-top:2px solid #111111;">
        <p style="margin:0; font-size:17px; font-weight:bold; color:#111111;">${emoji} ${title}</p>
        <p style="margin:3px 0 0; font-size:13px; color:#333333;">${sub}</p>
      </div>`;

    const empty = `<p style="color:#333333; font-size:13.5px; margin:0 0 10px;">None this week.</p>`;

    // Three stats per row, not six — six-across collapsed into unreadable
    // slivers on a phone, which is where this email is actually read.
    const stat = (value: string, label: string, tone = '#111111') => `
      <td width="33.3%" style="background:#f7f7f7; border:1px solid #e8e8e8; border-radius:12px; padding:14px 8px; text-align:center;">
        <div style="font-size:23px; font-weight:bold; color:${tone}; letter-spacing:-0.5px;">${value}</div>
        <div style="font-size:11.5px; color:#333333; margin-top:4px; font-weight:600; line-height:1.35;">${label}</div>
      </td>`;

    const delta = (a: number, b: number) =>
      a > b
        ? `<span style="color:#b02a2a; font-weight:600;">&#9650; up from ${b}</span>`
        : a < b
          ? `<span style="color:#1e7a3a; font-weight:600;">&#9660; down from ${b}</span>`
          : `<span style="color:#333333;">same as last week</span>`;

    const html = `
      <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 8px 4px; color: #1a1a1a; background:#ffffff;">
        <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#b8860b; font-weight:bold; margin:0;">Weekly churn digest</p>
        <h1 style="margin:4px 0 4px; font-size:27px; letter-spacing:-0.5px; color:#111111;">Week ending ${ukDate(now)}</h1>
        <p style="margin:0 0 20px; font-size:14px; color:#111111;"><strong>${thisWeek.length} cancel-flow entries</strong> from ${people.length} people — ${delta(thisWeek.length, lastWeek.length)}</p>

        <table width="100%" cellpadding="0" cellspacing="6" style="border-collapse:separate;">
          <tr>
            ${stat(String(payingLost), 'Paying lost — web', '#b02a2a')}
            ${stat(`£${mrrLost.toFixed(2)}`, 'Revenue lost /mo', '#b02a2a')}
            ${stat(String(stripe.failedFirstPayment), '1st payment failed', '#8a6d00')}
          </tr>
          <tr>
            ${stat(String(storeGone.length), 'Store paid lost', '#b02a2a')}
            ${stat(String(stripe.trials), 'Web trials unconverted')}
            ${stat(`${activated.length}/${people.length}`, 'Leavers who saved a cert')}
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 0; font-size:12.5px; color:#333333; line-height:1.55;">
          <tr><td style="padding:2px 0;"><strong style="color:#b02a2a;">Paying lost</strong> — subscribers who made at least one real payment. Trials that never paid are excluded.</td></tr>
          <tr><td style="padding:2px 0;"><strong style="color:#8a6d00;">1st payment failed</strong> — trial ended, card declined, never paid. Card-fix saves, not churn.</td></tr>
          <tr><td style="padding:2px 0;"><strong>Store paid lost</strong> — store subs that expired this week AND had genuinely paid (checked against RevenueCat revenue; trial expiries excluded). ${storeCancels ?? 0} turned auto-renew off (${storeCancelsUnknown === storeCancels ? 'incl. trials' : storeCancelLabel}); ${storeExpirations ?? 0} expired in total.</td></tr>
          <tr><td style="padding:2px 0;">Survey cards below are web subscribers — Apple &amp; Google make store users cancel in store settings, so they never see the in-app questions.</td></tr>
        </table>

        ${sectionHead('💸', 'Paying customers lost this week', 'Verified against real payments. Reasons come from the cancel survey where they gave one — store users never see it.')}
        ${
          gone.length || storeGone.length
            ? `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
                ${gone
                  .map(
                    (c) => `<tr>
                      <td style="padding:9px 0; border-bottom:1px solid #e8e8e8;">
                        <strong style="color:#111111;">${esc(c.name || c.email || 'Unknown')}</strong>
                        <span style="color:#555555;"> · web £${c.monthlyGbp.toFixed(2)}/mo</span><br/>
                        <span style="color:#333333;">paid £${c.totalPaidGbp.toFixed(2)} over ${c.tenureMonths} month${c.tenureMonths === 1 ? '' : 's'} — ${
                          c.reason
                            ? `${esc(reasonLabel(c.reason))}${c.reasonDetail ? ` <em>“${esc(c.reasonDetail)}”</em>` : ''}`
                            : '<em>no reason given</em>'
                        }</span>
                      </td>
                      <td align="right" style="padding:9px 0; border-bottom:1px solid #e8e8e8; white-space:nowrap;">
                        <a href="mailto:${esc(c.email ?? '')}?subject=${encodeURIComponent(`Elec-Mate — quick one`)}" style="color:#b8860b; font-weight:bold; text-decoration:none;">Email →</a>
                      </td>
                    </tr>`
                  )
                  .join('')}
                ${storeGone
                  .map(
                    (sp) => `<tr>
                      <td style="padding:9px 0; border-bottom:1px solid #e8e8e8;">
                        <strong style="color:#111111;">${esc(sp.name || sp.email || 'Unknown')}</strong>
                        <span style="color:#555555;"> · ${esc(sp.store)} store</span><br/>
                        <span style="color:#333333;">$${sp.lifetimeGrossUsd.toFixed(2)} lifetime — <em>no reason (store cancel flow)</em></span>
                      </td>
                      <td align="right" style="padding:9px 0; border-bottom:1px solid #e8e8e8; white-space:nowrap;">
                        <a href="mailto:${esc(sp.email ?? '')}?subject=${encodeURIComponent(`Elec-Mate — quick one`)}" style="color:#b8860b; font-weight:bold; text-decoration:none;">Email →</a>
                      </td>
                    </tr>`
                  )
                  .join('')}
              </table>`
            : empty
        }
        ${
          returned.length || storeReturned.length
            ? `<p style="margin:10px 0 0; font-size:12.5px; color:#1e7a3a;"><strong>↩︎ Left but came back (not counted):</strong> ${[
                ...returned.map((c) => `${esc(c.name || c.email || '?')} (${c.cameBack === 'lifetime' ? 'bought lifetime' : 'resubscribed'})`),
                ...storeReturned.map((sp) => `${esc(sp.name || sp.email || '?')} (store resub)`),
              ].join(' · ')}</p>`
            : ''
        }

        <div style="margin:32px 0 12px; padding-top:18px; border-top:2px solid #111111;">
          <p style="margin:0; font-size:17px; font-weight:bold; color:#111111;">Why they said they left</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
          ${reasons
            .map(
              (k) => `
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #e8e8e8; color:#111111;">${esc(reasonLabel(k))}</td>
              <td style="padding:10px 0; border-bottom:1px solid #e8e8e8; font-weight:bold; width:36px; text-align:right; color:#111111; font-size:15px;">${rcThis.get(k) ?? 0}</td>
              <td style="padding:10px 0 10px 14px; border-bottom:1px solid #e8e8e8; font-size:12.5px; text-align:right;">${delta(rcThis.get(k) ?? 0, rcLast.get(k) ?? 0)}</td>
            </tr>`
            )
            .join('')}
        </table>

        ${sectionHead('🔥', 'Savable — contact these first', 'Still undecided or wobbling. A personal reply this weekend can keep them.')}
        ${savable.length ? savable.map((r) => personCard(r, `Email ${esc((r.name || 'them').split(' ')[0])}`)).join('') : empty}

        ${sectionHead('🎯', 'Heavy users who left anyway', 'They put real hours in before leaving — the most valuable interviews you can get.')}
        ${heavy.length ? heavy.map((r) => personCard(r, 'Ask them why')).join('') : empty}

        ${sectionHead('👋', 'Tourists', 'Joined and left inside 2 days — the winback emails handle these automatically.')}
        ${
          tourists.length
            ? `<p style="font-size:13.5px; color:#111111; line-height:1.8; margin:0;">${tourists
                .map((r) => `${esc(r.name)} <span style="color:#333333;">(${esc(reasonLabel(r.reason))})</span>`)
                .join(' &nbsp;·&nbsp; ')}</p>`
            : empty
        }

        <p style="margin-top:32px; padding-top:14px; border-top:1px solid #e2e2e2; color:#555555; font-size:12px; line-height:1.6;">
          Every card shows the moment-of-cancel snapshot: hours and sessions (last 30 days), certificates ever saved, and account age.
          Sent every Saturday night. ${Deno.env.get('LINEAR_API_KEY') ? 'The Linear churn ticket has been raised automatically.' : 'Add a LINEAR_API_KEY secret in Supabase to auto-raise the weekly Linear ticket too.'}
        </p>
      </div>`;

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const { error: mailErr } = await resend.emails.send({
      from: 'Elec-Mate <noreply@elec-mate.com>',
      to: ['founder@elec-mate.com'],
      subject: `Churn digest — ${payingLost + storeGone.length} paying lost, ${savable.length} savable (w/e ${ukDate(now)})`,
      html,
    });
    if (mailErr) throw new Error(`Digest email failed: ${mailErr.message}`);

    // ── Smart Linear triage: action tickets, not information tickets ──
    const childTickets: LinearIssue[] = [];

    // 1. Win-back tickets — one per savable person (closeable by emailing them)
    for (const r of savable) {
      const t = await createIssueOnce(
        `Win back ${r.name} — ${reasonLabel(r.reason)}`,
        [
          `**${r.name}** <${r.email}> · ${r.subscription_tier ?? '?'} tier · outcome: ${r.outcome}`,
          ``,
          r.reason_detail ? `Their words: *"${r.reason_detail}"*` : `Reason: ${reasonLabel(r.reason)} (no detail left)`,
          ``,
          `Engagement at the moment they tried to leave: **${num(r, 'hours_30d')}h** in app · ${num(r, 'sessions_30d')} sessions · ${num(r, 'certs_total')} certs saved · ${num(r, 'tenure_days')} days since signup.`,
          ``,
          `- [ ] Personal email sent ([mailto](mailto:${r.email}?subject=${encodeURIComponent(`Elec-Mate — quick one, ${(r.name || '').split(' ')[0]}`)}))`,
          `- [ ] Replied / outcome recorded`,
        ].join('\n')
      ).catch(() => null);
      if (t) childTickets.push(t);
    }

    // 2. Pattern tickets — repeated signals become product signals
    const detailCounts = new Map<string, { n: number; reason: string; sample: string }>();
    for (const r of thisWeek) {
      if (!r.reason_detail) continue;
      if (r.reason !== 'missing_feature' && r.reason !== 'switching') continue;
      const norm = r.reason_detail.toLowerCase().replace(/[^a-z0-9 ]/g, '').slice(0, 40).trim();
      if (norm.length < 3) continue;
      const cur = detailCounts.get(norm) ?? { n: 0, reason: r.reason, sample: r.reason_detail };
      cur.n += 1;
      detailCounts.set(norm, cur);
    }
    for (const [, v] of detailCounts) {
      if (v.n < 2) continue;
      const t = await createIssueOnce(
        v.reason === 'switching'
          ? `Competitive churn signal: ${v.sample}`
          : `Feature demand from churn: ${v.sample}`,
        `Cited **${v.n}×** in the cancel flow during w/e ${ukDate(now)}.\n\nCheck whether this exists and is discoverable, is genuinely missing, or is broken — then decide build / surface / ignore.`
      ).catch(() => null);
      if (t) childTickets.push(t);
    }

    // 3. Weekly roll-up, linking the action tickets it spawned
    const rollupMd =
      md +
      (childTickets.length
        ? `\n\n### Action tickets raised\n` +
          childTickets.map((t) => `- ${t.identifier} — ${t.url}`).join('\n')
        : '\n\n_No individual action tickets this week — nothing savable and no repeated signals._');

    const weekly = await createIssueOnce(
      `Churn review — w/e ${ukDate(now)} (${payingLost + storeGone.length} paying lost)`,
      rollupMd
    ).catch(() => null);
    const linearUrl = weekly?.url ?? null;

    return new Response(
      JSON.stringify({
        success: true,
        entries: thisWeek.length,
        people: people.length,
        paying_lost: payingLost, store_paid_lost: storeGone.length, came_back: returned.length + storeReturned.length,
        linear: linearUrl,
        action_tickets: childTickets.map((t) => t.identifier),
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'weekly-churn-digest',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Digest failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
