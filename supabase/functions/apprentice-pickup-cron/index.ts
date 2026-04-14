/**
 * apprentice-pickup-cron
 *
 * Runs daily at 17:00 UTC via pg_cron. Finds apprentices who started a
 * course section > 2 days ago and haven't completed it, then sends a
 * re-engagement push via sendSmartPush. The 2/day cap + 7-day referral
 * cooldown keep this from stacking on top of referral pushes.
 *
 * Signals:
 *   - course_progress.completed = false
 *   - course_progress.last_accessed_at BETWEEN (now - 14d) AND (now - 2d)
 *   - course_progress.progress_pct BETWEEN 10 AND 95  (too early = skip; done = skip)
 *
 * We only send ONE pickup push per user per run — pick the MOST RECENT
 * incomplete section so the prompt is about the thing they were last on.
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { reengagementTemplates } from '../_shared/notification-templates.ts';
import { sendSmartPush } from '../_shared/notification-engine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const now = Date.now();
    const twoDaysAgo = new Date(now - 2 * 24 * 3600 * 1000).toISOString();
    const fourteenDaysAgo = new Date(now - 14 * 24 * 3600 * 1000).toISOString();

    // Find candidate rows — incomplete sections that were worked on recently
    // but not in the last 2 days. Cap to 500 rows per run to avoid timeouts;
    // we'll catch up on the next run.
    const { data: rows, error } = await supabase
      .from('course_progress')
      .select('user_id, course_key, section_key, progress_pct, last_accessed_at')
      .eq('completed', false)
      .gte('last_accessed_at', fourteenDaysAgo)
      .lt('last_accessed_at', twoDaysAgo)
      .gte('progress_pct', 10)
      .lte('progress_pct', 95)
      .order('last_accessed_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('[apprentice-pickup-cron] fetch failed:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch candidates' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // One push per user per run — take the most recent incomplete section
    const seenUsers = new Set<string>();
    const deduped = (rows || []).filter((r: { user_id: string }) => {
      if (seenUsers.has(r.user_id)) return false;
      seenUsers.add(r.user_id);
      return true;
    });

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const row of deduped as Array<{
      user_id: string;
      course_key: string;
      section_key: string;
    }>) {
      // Build a human-readable section title from the key (e.g.
      // "apprentice-level2-module-3" → "Module 3")
      const sectionMatch = /module[-_](\d+)/i.exec(row.section_key);
      const sectionTitle = sectionMatch ? `Module ${sectionMatch[1]}` : row.section_key;

      // Deep link routes by course_key to the right course hub
      const deepLink = row.course_key.includes('apprentice')
        ? `/electrician/study-centre/apprentice?continue=${encodeURIComponent(row.section_key)}`
        : `/electrician/study-centre?continue=${encodeURIComponent(row.section_key)}`;

      const template = reengagementTemplates.apprentice_pick_up(sectionTitle, deepLink);

      const result = await sendSmartPush(
        supabase as unknown as Parameters<typeof sendSmartPush>[0],
        SUPABASE_URL,
        `Bearer ${SERVICE_ROLE_KEY}`,
        {
          userId: row.user_id,
          tier: 'reengagement',
          category: 'apprentice_pickup',
          template,
          refId: row.section_key,
        }
      );

      if (result.sent) sent++;
      else if (
        result.skipReason === 'cap_hit' ||
        result.skipReason === 'cooldown' ||
        result.skipReason === 'dedupe'
      ) {
        skipped++;
      } else failed++;
    }

    const summary = {
      candidates: deduped.length,
      sent,
      skipped,
      failed,
    };
    console.log('[apprentice-pickup-cron]', summary);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[apprentice-pickup-cron] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
