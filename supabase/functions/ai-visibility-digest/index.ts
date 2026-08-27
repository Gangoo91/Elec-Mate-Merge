/**
 * ai-visibility-digest — weekly email of first-party AI-visibility numbers.
 *
 * Summarises the last 7 days of `ai_crawler_hits` (written by the edge
 * middleware for bot fetches and by main.tsx for AI-assistant referrals,
 * ELE-1589) into one email to the founder: hits by agent with week-over-week
 * movement, AI referral totals, and the most-fetched pages. Counters only —
 * the table holds no personal data at all.
 *
 * Scheduled by pg_cron (Mondays 07:00 UTC) using the vault service_role_key
 * pattern — pg_cron http_post WITHOUT an Authorization header fails as a
 * silent 401 (bit three times before; see lifecycle-email memory).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { withSentry } from '../_shared/sentry.ts';
const DIGEST_TO = { email: 'founder@elec-mate.com', name: 'Andrew Moore' };

async function sendBrevo(opts: { subject: string; html: string }) {
  const key = Deno.env.get('BREVO_API_KEY');
  if (!key) return { ok: false, error: 'no_brevo_key' };
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Elec-Mate · AI Visibility', email: 'no-reply@elec-mate.com' },
      to: [DIGEST_TO],
      subject: opts.subject,
      htmlContent: opts.html,
    }),
  });
  if (!res.ok) return { ok: false, error: `${res.status} ${await res.text()}` };
  return { ok: true };
}

interface AgentRow {
  agent: string;
  hits: number;
}

function table(rows: Array<[string, string, string]>, headers: [string, string, string]) {
  const th = headers
    .map(
      (h) =>
        `<th style="text-align:left;padding:6px 12px 6px 0;border-bottom:1px solid #ddd;font-size:12px;color:#666">${h}</th>`
    )
    .join('');
  const trs = rows
    .map(
      ([a, b, c]) =>
        `<tr><td style="padding:5px 12px 5px 0;font-size:13px">${a}</td><td style="padding:5px 12px 5px 0;font-size:13px">${b}</td><td style="padding:5px 12px 5px 0;font-size:13px;color:#666">${c}</td></tr>`
    )
    .join('');
  return `<table style="border-collapse:collapse;margin:8px 0 20px"><tr>${th}</tr>${trs}</table>`;
}

// House rule asks every function for CORS preflight handling — deliberately
// omitted here: this endpoint is service-role-gated and pg_cron-only, and
// browsers must never be able to call it. No CORS = browser calls fail at
// preflight, which is the correct behaviour for this function.
Deno.serve(withSentry('ai-visibility-digest', async (req) => {
  try {
    if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

    // verify_jwt accepts ANY valid JWT including the public anon key — without
    // this check anyone could trigger digest emails. Only the pg_cron caller
    // (vault service_role_key) may invoke.
    const auth = req.headers.get('authorization') ?? '';
    if (auth !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
      return new Response('forbidden', { status: 403 });
    }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const day = (offset: number) =>
    new Date(Date.now() - offset * 86_400_000).toISOString().slice(0, 10);
  const weekAgo = day(7);
  const twoWeeksAgo = day(14);

  // This week + last week by agent (counters table is tiny — fetch and fold).
  const { data: rows, error } = await sb
    .from('ai_crawler_hits')
    .select('day, agent, path, hits')
    .gte('day', twoWeeksAgo);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const thisWeek = new Map<string, number>();
  const lastWeek = new Map<string, number>();
  const pageHits = new Map<string, number>();
  let referralsThisWeek = 0;

  for (const r of rows ?? []) {
    const isThisWeek = r.day >= weekAgo;
    const bucket = isThisWeek ? thisWeek : lastWeek;
    bucket.set(r.agent, (bucket.get(r.agent) ?? 0) + r.hits);
    if (isThisWeek) {
      if (r.agent.startsWith('referral:')) referralsThisWeek += r.hits;
      else pageHits.set(r.path, (pageHits.get(r.path) ?? 0) + r.hits);
    }
  }

  const agents: AgentRow[] = [...thisWeek.entries()]
    .map(([agent, hits]) => ({ agent, hits }))
    .sort((a, b) => b.hits - a.hits);
  const totalThisWeek = agents
    .filter((a) => !a.agent.startsWith('referral:'))
    .reduce((s, a) => s + a.hits, 0);

  const agentRows: Array<[string, string, string]> = agents.slice(0, 15).map((a) => {
    const prev = lastWeek.get(a.agent) ?? 0;
    const delta = prev === 0 ? 'new' : `${a.hits >= prev ? '+' : ''}${a.hits - prev} vs last wk`;
    return [a.agent, String(a.hits), delta];
  });

  const topPages: Array<[string, string, string]> = [...pageHits.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, hits]) => [path, String(hits), '']);

  const html = `
    <div style="font-family:-apple-system,system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">AI visibility — week to ${day(0)}</h2>
      <p style="margin:0 0 16px;color:#666;font-size:13px">
        First-party counters from ai_crawler_hits (bot fetches via edge middleware,
        referrals via the app). Not sampled, not a Beta dashboard — your own data.
      </p>
      <p style="font-size:15px"><strong>${totalThisWeek}</strong> bot fetches ·
        <strong>${referralsThisWeek}</strong> human visits referred by AI assistants</p>
      <h3 style="margin:16px 0 4px;font-size:14px">By agent</h3>
      ${agentRows.length ? table(agentRows, ['Agent', 'Hits', 'Change']) : '<p style="color:#666;font-size:13px">No hits recorded yet.</p>'}
      <h3 style="margin:16px 0 4px;font-size:14px">Most-fetched pages</h3>
      ${topPages.length ? table(topPages, ['Page', 'Hits', '']) : '<p style="color:#666;font-size:13px">No page data yet.</p>'}
      <p style="color:#999;font-size:11px;margin-top:20px">
        ai-visibility-digest · runs Mondays 07:00 UTC · reply-to goes nowhere, data queries welcome in Claude Code.
      </p>
    </div>`;

  const send = await sendBrevo({
    subject: `AI visibility: ${totalThisWeek} bot fetches, ${referralsThisWeek} AI referrals this week`,
    html,
  });
  return new Response(JSON.stringify(send), {
      status: send.ok ? 200 : 500,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}));
