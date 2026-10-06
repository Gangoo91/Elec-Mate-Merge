import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

/**
 * Fills `safety_alerts` from the government's Product Safety Alerts, Reports
 * and Recalls (OPSS, published on GOV.UK), for the kit electricians fit, use
 * and find on site. Runs daily from pg_cron; service-role only.
 *
 * Source: the public GOV.UK search API (no key). Each row keeps the notice's
 * own title, summary, risk level and type, and links to the notice itself.
 * Nothing is reworded or graded by us: a missing risk level stays missing.
 *
 * `content` is PLAIN TEXT. The feed used to inject `content` as HTML; it now
 * renders text only, and nothing here stores markup.
 */

const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const CATEGORIES = [
  'electrical-appliances-equipment',
  'lighting-products',
  'adaptors-plugs-sockets',
  'personal-protective-equipment-ppe',
  'hand-tools',
  'machinery',
  'construction-products',
  'measuring-instruments',
];
const DAYS = 90;
const UA = { 'User-Agent': 'Elec-Mate safety alerts sync (founder@elec-mate.com)' };

/**
 * "Hazard:" and "Corrective action:" from the notice's summary block, verbatim.
 * Every OPSS notice opens with these lines (checked across recalls, safety
 * reports and alerts, Oct 2026). Plain text only; '' when absent.
 */
async function noticeDetail(link: string): Promise<{ hazard: string; action: string }> {
  const res = await fetch(`https://www.gov.uk/api/content${link}`, { headers: UA });
  if (!res.ok) return { hazard: '', action: '' };
  const body: string = ((await res.json()) as { details?: { body?: string } }).details?.body ?? '';
  const text = body
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .replace(/\n\s*\n+/g, '\n');
  const line = (label: string) =>
    (text.match(new RegExp(`${label}:\\s*\\n?\\s*([^\\n]+)`, 'i'))?.[1] ?? '').trim().slice(0, 600);
  return { hazard: line('Hazard'), action: line('Corrective action') };
}

// OPSS risk level → the feed's severity scale. 'not-provided' has no
// equivalent: it is stored as 'low' for sorting only, and the feed shows the
// notice's own wording ("Risk not stated"), never an invented grade.
const SEVERITY: Record<string, string> = { serious: 'critical', high: 'high', medium: 'medium', low: 'low' };
const TYPE_LABEL: Record<string, string> = {
  'product-recall': 'Recall',
  'product-safety-alert': 'Safety alert',
  'product-safety-report': 'Safety report',
};
const CATEGORY_LABEL: Record<string, string> = {
  'electrical-appliances-equipment': 'Electrical appliances and equipment',
  'lighting-products': 'Lighting',
  'adaptors-plugs-sockets': 'Adaptors, plugs and sockets',
  'personal-protective-equipment-ppe': 'PPE',
  'hand-tools': 'Hand tools',
  machinery: 'Machinery',
  'construction-products': 'Construction products',
  'measuring-instruments': 'Measuring instruments',
};

interface GovUkResult {
  title: string;
  link: string;
  public_timestamp: string;
  description?: string;
  product_category?: string;
  product_risk_level?: string;
  product_alert_type?: string;
}

serve(async (req) => {
  if (req.headers.get('Authorization') !== `Bearer ${SERVICE_KEY}`) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), { status: 401 });
  }
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, SERVICE_KEY);
    const since = new Date(Date.now() - DAYS * 864e5).toISOString().slice(0, 10);
    // Paged: one request returned at most 300, and a busy 90 days must not be
    // cut off silently.
    const results: GovUkResult[] = [];
    for (let start = 0; start < 2000; start += 200) {
      const qs = new URLSearchParams({
        filter_format: 'product_safety_alert_report_recall',
        filter_public_timestamp: `from:${since}`,
        order: '-public_timestamp',
        count: '200',
        start: String(start),
        fields: 'title,link,public_timestamp,description,product_category,product_risk_level,product_alert_type',
      });
      for (const c of CATEGORIES) qs.append('filter_product_category[]', c);
      const res = await fetch(`https://www.gov.uk/api/search.json?${qs}`, { headers: UA });
      if (!res.ok) throw new Error(`GOV.UK search ${res.status}`);
      const page = (await res.json()) as { results: GovUkResult[]; total: number };
      results.push(...page.results);
      if (results.length >= page.total || page.results.length === 0) break;
    }

    const rows = results
      .filter((r) => r.title && r.link)
      .map((r) => {
        const risk = r.product_risk_level && r.product_risk_level !== 'not-provided' ? r.product_risk_level : null;
        const type = TYPE_LABEL[r.product_alert_type ?? ''] ?? 'Notice';
        const category = CATEGORY_LABEL[r.product_category ?? ''] ?? 'Other';
        const summary = (r.description ?? '').trim() || r.title;
        return {
          source: 'opss',
          source_id: r.link,
          source_url: `https://www.gov.uk${r.link}`,
          title: r.title.trim(),
          summary,
          content: summary,
          severity: risk ? SEVERITY[risk] ?? 'low' : 'low',
          risk_level: risk,
          alert_type: type,
          category,
          date_published: r.public_timestamp.slice(0, 10),
          is_active: true,
          updated_at: new Date().toISOString(),
        };
      });

    if (rows.length) {
      const { error } = await supabase.from('safety_alerts').upsert(rows, { onConflict: 'source_id' });
      if (error) throw error;
    }
    // Hazard and corrective action for notices that do not have them yet —
    // one content request per NEW notice, a few at a time.
    const { data: missing } = await supabase
      .from('safety_alerts')
      .select('id, source_id')
      .eq('source', 'opss')
      .eq('is_active', true)
      .is('hazard', null)
      .limit(150);
    let detailed = 0;
    const queue = [...(missing ?? [])];
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        for (let m = queue.shift(); m; m = queue.shift()) {
          try {
            const d = await noticeDetail(m.source_id as string);
            // '' (not NULL) when the notice has no such line, so it is not refetched daily.
            await supabase
              .from('safety_alerts')
              .update({ hazard: d.hazard, corrective_action: d.action })
              .eq('id', m.id);
            detailed++;
          } catch (e) {
            console.warn('[sync-safety-alerts] detail failed', m.source_id, e);
          }
        }
      })
    );

    // Older than the window: keep the row, stop showing it.
    const { error: ageErr } = await supabase
      .from('safety_alerts')
      .update({ is_active: false })
      .eq('source', 'opss')
      .lt('date_published', since);
    if (ageErr) throw ageErr;

    return new Response(JSON.stringify({ success: true, upserted: rows.length, detailed, since }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'sync-safety-alerts' });
    console.error('[sync-safety-alerts]', error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), { status: 500 });
  }
});
