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

async function stripeWeekSplit(since: number): Promise<{ paying: number; trials: number; mrrLostGbp: number }> {
  const key = Deno.env.get('STRIPE_SECRET_KEY');
  const out = { paying: 0, trials: 0, mrrLostGbp: 0 };
  if (!key) return out;
  let after: string | null = null;
  for (let page = 0; page < 20; page++) {
    const url = `https://api.stripe.com/v1/subscriptions?status=canceled&limit=100${after ? `&starting_after=${after}` : ''}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
    const d = await res.json();
    if (!d.data) break;
    for (const s of d.data) {
      const ca = s.canceled_at;
      if (!ca || ca < since) continue;
      const te = s.trial_end;
      if (te && ca <= te + 3600) {
        out.trials++;
      } else {
        out.paying++;
        for (const it of s.items?.data ?? []) {
          const amt = (it.price?.unit_amount ?? 0) * (it.quantity ?? 1);
          const iv = it.price?.recurring?.interval;
          out.mrrLostGbp += iv === 'year' ? amt / 100 / 12 : amt / 100;
        }
      }
    }
    if (!d.has_more) break;
    after = d.data[d.data.length - 1].id;
    // canceled list is not time-ordered; keep paging but stop after 20 pages
  }
  out.mrrLostGbp = Math.round(out.mrrLostGbp * 100) / 100;
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

    // App-store churn — store subs can't use the in-app cancel flow, so this
    // comes from the RevenueCat webhook's billing_events log instead.
    const { count: storeCancels } = await db
      .from('billing_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_type', 'CANCELLATION')
      .gte('created_at', weekAgo.toISOString());
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

    // ── Markdown (Linear) ──
    const md = [
      `## Churn review — w/e ${ukDate(now)}`,
      ``,
      `**${thisWeek.length} cancel-flow entries** (${people.length} people) vs ${lastWeek.length} last week.`,
      `Web (Stripe): **${stripe.paying} paying** cancelled (≈£${stripe.mrrLostGbp}/mo lost) + ${stripe.trials} unconverted trials. App stores: **${storeCancels ?? 0}** turned auto-renew off, ${storeExpirations ?? 0} expired.`,
      `Activation among leavers: **${activated.length}/${people.length}** ever saved a cert/quote/invoice.`,
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

    const stat = (value: string, label: string, tone = '#111111') => `
      <td style="background:#f7f7f7; border:1px solid #e8e8e8; border-radius:12px; padding:14px 10px; text-align:center;">
        <div style="font-size:24px; font-weight:bold; color:${tone};">${value}</div>
        <div style="font-size:11.5px; color:#333333; margin-top:4px; font-weight:600;">${label}</div>
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
            ${stat(String(stripe.paying), 'Web paying lost (Stripe)', '#b02a2a')}
            ${stat(`£${stripe.mrrLostGbp}`, 'Monthly revenue lost', '#b02a2a')}
            ${stat(String(storeCancels ?? 0), 'App-store auto-renew off')}
            ${stat(String(stripe.trials), 'Web trials unconverted')}
            ${stat(`${activated.length}/${people.length}`, 'Leavers who saved a cert')}
          </tr>
        </table>
        <p style="margin:8px 0 0; font-size:12.5px; color:#333333;">
          Survey cards below are web subscribers — Apple &amp; Google make store users cancel in
          store settings, so they never see the in-app questions. Their count is tracked above.
        </p>

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
      subject: `Churn digest — ${stripe.paying} paying lost, ${savable.length} savable (w/e ${ukDate(now)})`,
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
      `Churn review — w/e ${ukDate(now)} (${stripe.paying} paying lost)`,
      rollupMd
    ).catch(() => null);
    const linearUrl = weekly?.url ?? null;

    return new Response(
      JSON.stringify({
        success: true,
        entries: thisWeek.length,
        people: people.length,
        paying_lost: stripe.paying,
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
