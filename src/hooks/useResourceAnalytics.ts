import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useResourceAnalytics — read aggregate stats on resources for the
   tutor analytics panel. Also exports recordResourceEvent + setGoldStandard.
   ELE-905 (B10).
   ========================================================================== */

export interface ResourceAnalyticsRow {
  resource_id: string;
  title: string | null;
  kind: string | null;
  views_count: number;
  downloads_count: number;
  gold_standard: boolean;
  last_viewed_at: string | null;
  view_count_30d: number;
  unique_viewers_30d: number;
}

export async function recordResourceEvent(opts: {
  resourceId: string;
  eventKind: 'view' | 'download' | 'open_link';
  context?: string;
  acId?: string | null;
  durationSeconds?: number | null;
}) {
  const { error } = await supabase.rpc('record_resource_event', {
    p_resource_id: opts.resourceId,
    p_event_kind: opts.eventKind,
    p_context: opts.context ?? null,
    p_ac_id: opts.acId ?? null,
    p_duration_seconds: opts.durationSeconds ?? null,
  });
  if (error) console.warn('record_resource_event failed', error);
}

export async function setResourceGoldStandard(resourceId: string, value: boolean) {
  const { error } = await supabase.rpc('set_resource_gold_standard', {
    p_resource_id: resourceId,
    p_gold_standard: value,
  });
  if (error) throw error;
}

export function useResourceAnalytics() {
  const [rows, setRows] = useState<ResourceAnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string } | null)?.college_id;
      if (!collegeId) return;

      // Pull resources first, then enrich with the per-resource event stats.
      const { data: resources, error: rErr } = await supabase
        .from('college_resources')
        .select('id, title, kind, views_count, downloads_count, gold_standard')
        .eq('college_id', collegeId)
        .order('views_count', { ascending: false })
        .limit(50);
      if (rErr) throw rErr;

      const thirtyAgo = new Date(Date.now() - 30 * 86_400_000).toISOString();
      const { data: events } = await supabase
        .from('college_resource_views')
        .select('resource_id, user_id, created_at, event_kind')
        .eq('college_id', collegeId)
        .gte('created_at', thirtyAgo);

      const stats = new Map<
        string,
        { views30: number; uniq30: Set<string>; lastView: string | null }
      >();
      for (const e of events ?? []) {
        if (e.event_kind !== 'view') continue;
        const s =
          stats.get(e.resource_id) ?? {
            views30: 0,
            uniq30: new Set<string>(),
            lastView: null,
          };
        s.views30 += 1;
        if (e.user_id) s.uniq30.add(e.user_id);
        if (!s.lastView || e.created_at > s.lastView) s.lastView = e.created_at;
        stats.set(e.resource_id, s);
      }

      const enriched: ResourceAnalyticsRow[] = (resources ?? []).map((r: any) => {
        const s = stats.get(r.id);
        return {
          resource_id: r.id,
          title: r.title,
          kind: r.kind,
          views_count: r.views_count ?? 0,
          downloads_count: r.downloads_count ?? 0,
          gold_standard: r.gold_standard ?? false,
          last_viewed_at: s?.lastView ?? null,
          view_count_30d: s?.views30 ?? 0,
          unique_viewers_30d: s?.uniq30.size ?? 0,
        };
      });
      setRows(enriched);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return { rows, loading, error, refetch: fetchAll };
}
