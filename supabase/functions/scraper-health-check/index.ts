/**
 * Scraper Health Check
 *
 * Runs daily (cron) and audits the freshness of all scraper sources across
 * industry_news, marketplace_products, and job_listings. Anything stale for
 * more than STALE_HOURS gets flagged and an email summary is sent to
 * founder@elec-mate.com so silent scraper failures stop going unnoticed
 * for weeks at a time.
 *
 * Results are written to scraper_health_log for the admin panel.
 *
 * Invocation:
 *   POST /functions/v1/scraper-health-check
 *   body: { quiet?: boolean }  (quiet=true skips the email, log only)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Anything stale for more than this is flagged in the email.
const STALE_HOURS = 48;
const WARNING_HOURS = 30;
// Only alert on sources with at least this many rows — one-off historical
// imports (1-2 rows) are noise and shouldn't wake anyone up.
const MIN_ROWS_FOR_ALERT = 5;
// Cap the number of stale rows shown in the email so huge outage reports
// don't become unreadable.
const MAX_EMAIL_STALE_ROWS = 25;
const ALERT_TO = 'founder@elec-mate.com';
const ALERT_FROM = 'Elec-Mate Scraper Health <founder@elec-mate.com>';

interface HealthRow {
  dataset: string;
  source: string;
  last_scraped_at: string | null;
  hours_stale: number;
  row_count: number;
  status: 'ok' | 'warning' | 'stale';
}

function classify(hours: number): 'ok' | 'warning' | 'stale' {
  if (hours >= STALE_HOURS) return 'stale';
  if (hours >= WARNING_HOURS) return 'warning';
  return 'ok';
}

function hoursBetween(iso: string | null): number {
  if (!iso) return Number.POSITIVE_INFINITY;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return (Date.now() - t) / (1000 * 60 * 60);
}

async function queryDataset(
  supabase: ReturnType<typeof createClient>,
  dataset: string,
  table: string,
  sourceCol: string,
  timeCol: string
): Promise<HealthRow[]> {
  // Aggregate by source via an RPC would be cleanest but we'll do this the
  // portable way with a raw select + grouping in JS. Limit keeps us under
  // row caps; we only care about per-source maxima.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from as any)(table)
    .select(`${sourceCol}, ${timeCol}`)
    .order(timeCol, { ascending: false })
    .limit(10000);

  if (error) {
    console.warn(`Failed to query ${dataset}:`, error.message);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = (data || []) as any[];
  const byGroup = new Map<string, { latest: string | null; count: number }>();
  for (const r of rows) {
    const src = (r[sourceCol] as string) || 'unknown';
    const t = (r[timeCol] as string) || null;
    const existing = byGroup.get(src);
    if (!existing) {
      byGroup.set(src, { latest: t, count: 1 });
    } else {
      existing.count += 1;
      if (
        t &&
        (!existing.latest || new Date(t).getTime() > new Date(existing.latest).getTime())
      ) {
        existing.latest = t;
      }
    }
  }

  const result: HealthRow[] = [];
  for (const [source, info] of byGroup.entries()) {
    const hours = hoursBetween(info.latest);
    result.push({
      dataset,
      source,
      last_scraped_at: info.latest,
      hours_stale: Number.isFinite(hours) ? Math.round(hours * 10) / 10 : 99999,
      row_count: info.count,
      status: classify(hours),
    });
  }
  return result;
}

function buildEmail(staleRows: HealthRow[], allRows: HealthRow[]): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `[Elec-Mate] ${staleRows.length} scraper source${staleRows.length === 1 ? '' : 's'} stale`;

  const staleList = staleRows
    .sort((a, b) => b.hours_stale - a.hours_stale)
    .map(
      (r) =>
        `• ${r.dataset} / ${r.source} — last scrape ${Math.round(r.hours_stale)}h ago (${r.row_count} rows)`
    )
    .join('\n');

  const byDataset = new Map<string, HealthRow[]>();
  for (const r of allRows) {
    const list = byDataset.get(r.dataset) || [];
    list.push(r);
    byDataset.set(r.dataset, list);
  }

  const tableHtml = [...byDataset.entries()]
    .map(
      ([dataset, rows]) =>
        `<h3 style="margin:24px 0 8px;font-size:14px;color:#111;">${dataset}</h3>
         <table cellpadding="8" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:13px;">
           <tr style="background:#f3f4f6;text-align:left;">
             <th style="padding:8px;border-bottom:1px solid #e5e7eb;">Source</th>
             <th style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">Last scrape</th>
             <th style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">Rows</th>
             <th style="padding:8px;border-bottom:1px solid #e5e7eb;">Status</th>
           </tr>
           ${rows
             .sort((a, b) => b.hours_stale - a.hours_stale)
             .map((r) => {
               const colour =
                 r.status === 'stale' ? '#dc2626' : r.status === 'warning' ? '#ea580c' : '#15803d';
               const hoursText = Number.isFinite(r.hours_stale)
                 ? `${Math.round(r.hours_stale)}h`
                 : 'never';
               return `<tr>
                 <td style="padding:8px;border-bottom:1px solid #f3f4f6;">${r.source}</td>
                 <td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right;color:${colour};">${hoursText}</td>
                 <td style="padding:8px;border-bottom:1px solid #f3f4f6;text-align:right;">${r.row_count.toLocaleString()}</td>
                 <td style="padding:8px;border-bottom:1px solid #f3f4f6;font-weight:600;color:${colour};">${r.status.toUpperCase()}</td>
               </tr>`;
             })
             .join('')}
         </table>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;font-family:-apple-system,sans-serif;background:#fff;color:#111;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <h1 style="font-size:20px;margin:0 0 8px;">Elec-Mate Scraper Health</h1>
    <p style="margin:0 0 16px;color:#6b7280;font-size:13px;">${new Date().toUTCString()}</p>
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin-bottom:16px;">
      <strong style="color:#991b1b;">${staleRows.length} source${staleRows.length === 1 ? '' : 's'} stale</strong>
      <pre style="margin:8px 0 0;font-size:12px;color:#991b1b;white-space:pre-wrap;font-family:ui-monospace,monospace;">${staleList || 'none'}</pre>
    </div>
    ${tableHtml}
    <p style="margin:24px 0 0;font-size:11px;color:#9ca3af;">
      Threshold: stale = >${STALE_HOURS}h since last scrape. Sent automatically from scraper-health-check.
    </p>
  </div>
</body>
</html>`;

  const text = `Elec-Mate Scraper Health — ${new Date().toUTCString()}

${staleRows.length} source${staleRows.length === 1 ? '' : 's'} stale (> ${STALE_HOURS}h):

${staleList || 'none'}

Full report in HTML version.`;

  return { subject, html, text };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json().catch(() => ({}));
    const quiet = Boolean(body?.quiet);

    // 1. Query each scraper dataset
    const [news, products, jobs] = await Promise.all([
      queryDataset(supabase, 'industry_news', 'industry_news', 'source_name', 'created_at'),
      queryDataset(
        supabase,
        'marketplace_products',
        'marketplace_products',
        'supplier_id',
        'scraped_at'
      ),
      queryDataset(supabase, 'job_listings', 'job_listings', 'source', 'updated_at'),
    ]);

    // Resolve marketplace supplier ids to names
    if (products.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: suppliers } = await (supabase.from as any)('marketplace_suppliers')
        .select('id, name');
      const nameById = new Map((suppliers || []).map((s: { id: string; name: string }) => [s.id, s.name]));
      for (const p of products) {
        p.source = (nameById.get(p.source) as string) || p.source;
      }
    }

    const allRows: HealthRow[] = [...news, ...products, ...jobs];
    // Only alert on sources meaningful enough to matter (>= MIN_ROWS_FOR_ALERT
    // rows). Sort worst-first and cap the email to the top MAX_EMAIL_STALE_ROWS.
    const staleRows = allRows
      .filter((r) => r.status === 'stale' && r.row_count >= MIN_ROWS_FOR_ALERT)
      .sort((a, b) => b.hours_stale - a.hours_stale)
      .slice(0, MAX_EMAIL_STALE_ROWS);

    // 2. Write to scraper_health_log
    if (allRows.length > 0) {
      const logRows = allRows.map((r) => ({
        dataset: r.dataset,
        source: r.source,
        last_scraped_at: r.last_scraped_at,
        hours_stale: Number.isFinite(r.hours_stale) ? r.hours_stale : null,
        status: r.status,
        row_count: r.row_count,
        email_sent: false,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from as any)('scraper_health_log').insert(logRows);
    }

    // 3. Send email if we have stale sources and we're not in quiet mode
    let emailSent = false;
    let emailError: string | null = null;
    if (staleRows.length > 0 && !quiet) {
      const resendKey = Deno.env.get('RESEND_API_KEY');
      if (resendKey) {
        try {
          const resend = new Resend(resendKey);
          const email = buildEmail(staleRows, allRows);
          const { error: sendErr } = await resend.emails.send({
            from: ALERT_FROM,
            to: [ALERT_TO],
            subject: email.subject,
            html: email.html,
            text: email.text,
          });
          if (sendErr) {
            emailError = sendErr.message || 'unknown';
          } else {
            emailSent = true;
          }
        } catch (e) {
          emailError = (e as Error).message;
        }
      } else {
        emailError = 'RESEND_API_KEY not set';
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        datasets: {
          industry_news: news.length,
          marketplace_products: products.length,
          job_listings: jobs.length,
        },
        totalSources: allRows.length,
        staleSources: staleRows.length,
        warningSources: allRows.filter((r) => r.status === 'warning').length,
        okSources: allRows.filter((r) => r.status === 'ok').length,
        emailSent,
        emailError,
        rows: allRows,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('scraper-health-check FAILED', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
