import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type LTIPlatformType = 'canvas' | 'moodle' | 'blackboard' | 'd2l' | 'schoology' | 'other';
export type LTIPlatformStatus = 'Connected' | 'Disconnected' | 'Pending';

export interface LTIPlatformRow {
  id: string;
  name: string;
  platform_type: LTIPlatformType;
  issuer: string;
  client_id: string;
  deployment_id: string | null;
  auth_login_url: string;
  auth_token_url: string;
  jwks_url: string;
  status: LTIPlatformStatus;
  college_id: string | null;
  settings: Record<string, unknown> | null;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LTIPlatformInput {
  name: string;
  platform_type: LTIPlatformType;
  issuer: string;
  client_id: string;
  deployment_id?: string | null;
  auth_login_url: string;
  auth_token_url: string;
  jwks_url: string;
  college_id: string;
}

export interface LTILaunchRow {
  id: string;
  platform_id: string;
  user_id: string | null;
  lti_user_id: string;
  context_id: string | null;
  context_title: string | null;
  roles: string[] | null;
  validated: boolean;
  created_at: string;
  launch_data: Record<string, unknown> | null;
}

/**
 * CRUD + read hook for LTI platforms and their launches for the current college.
 * Scoped to the user's college_id via their profile.
 */
export function useLTIPlatforms() {
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? null;

  const [platforms, setPlatforms] = useState<LTIPlatformRow[]>([]);
  const [launches, setLaunches] = useState<LTILaunchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!collegeId) {
      setPlatforms([]);
      setLaunches([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const [plats, lanches] = await Promise.all([
      supabase
        .from('lti_platforms')
        .select('*')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false }),
      supabase
        .from('lti_launches')
        .select(
          'id, platform_id, user_id, lti_user_id, context_id, context_title, roles, validated, created_at, launch_data'
        )
        .order('created_at', { ascending: false })
        .limit(50),
    ]);

    if (plats.error) {
      setError(plats.error.message);
      setLoading(false);
      return;
    }
    setPlatforms((plats.data ?? []) as LTIPlatformRow[]);
    // Scope launches to platforms belonging to this college
    const platformIds = new Set((plats.data ?? []).map((p) => p.id));
    const scoped = (lanches.data ?? []).filter((l) => platformIds.has(l.platform_id));
    setLaunches(scoped as LTILaunchRow[]);
    setLoading(false);
  }, [collegeId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPlatform = useCallback(
    async (input: LTIPlatformInput) => {
      if (!input.college_id) throw new Error('college_id is required');
      const { data, error: err } = await supabase
        .from('lti_platforms')
        .insert({
          ...input,
          status: 'Pending',
          settings: {},
        })
        .select('*')
        .single();
      if (err) throw err;
      await refresh();
      return data as LTIPlatformRow;
    },
    [refresh]
  );

  const updatePlatform = useCallback(
    async (id: string, patch: Partial<LTIPlatformInput> & { status?: LTIPlatformStatus; settings?: Record<string, unknown> }) => {
      const { error: err } = await supabase
        .from('lti_platforms')
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (err) throw err;
      await refresh();
    },
    [refresh]
  );

  const deletePlatform = useCallback(
    async (id: string) => {
      const { error: err } = await supabase.from('lti_platforms').delete().eq('id', id);
      if (err) throw err;
      await refresh();
    },
    [refresh]
  );

  const launchesForPlatform = useCallback(
    (platformId: string) => launches.filter((l) => l.platform_id === platformId),
    [launches]
  );

  // Derived global KPIs for the observability panel
  const globalStats = (() => {
    const total = launches.length;
    const successful = launches.filter((l) => l.validated).length;
    const failed = total - successful;
    const successRate = total ? Math.round((successful / total) * 100) : null;
    // Group failures by error_code from launch_data
    const errorCounts = new Map<string, number>();
    for (const l of launches.filter((l) => !l.validated)) {
      const code = ((l.launch_data as Record<string, unknown> | null)?.error as string) ?? 'unknown';
      errorCounts.set(code, (errorCounts.get(code) ?? 0) + 1);
    }
    const topErrors = Array.from(errorCounts.entries())
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    // Per-day buckets for last 7 days
    const now = Date.now();
    const days: { date: string; total: number; failed: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 86_400_000);
      const key = d.toISOString().slice(0, 10);
      const rows = launches.filter((l) => l.created_at.slice(0, 10) === key);
      days.push({
        date: key,
        total: rows.length,
        failed: rows.filter((r) => !r.validated).length,
      });
    }
    return { total, successful, failed, successRate, topErrors, days };
  })();

  // Health probe
  const [health, setHealth] = useState<{
    status: 'ok' | 'degraded' | 'unknown';
    checks?: Record<string, { ok: boolean; detail?: string; ms: number }>;
    version?: string;
    total_ms?: number;
  }>({ status: 'unknown' });

  const refreshHealth = useCallback(async () => {
    try {
      const r = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-health'
      );
      const body = await r.json();
      setHealth({
        status: body.status,
        checks: body.checks,
        version: body.version,
        total_ms: body.total_ms,
      });
    } catch {
      setHealth({ status: 'degraded' });
    }
  }, []);

  useEffect(() => {
    refreshHealth();
  }, [refreshHealth]);

  /**
   * Call lti-verify-platform — runs JWKS fetch + reachability + host-consistency checks.
   * Auto-flips status to Connected if all pass.
   */
  const verifyPlatform = useCallback(
    async (platformId: string) => {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-verify-platform',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ platform_id: platformId }),
        }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
      await refresh();
      return body as {
        ok: boolean;
        checks: Array<{ name: string; ok: boolean; message: string; latency_ms?: number }>;
        new_status: string;
      };
    },
    [refresh]
  );

  const statsForPlatform = useCallback(
    (platformId: string) => {
      const rows = launches.filter((l) => l.platform_id === platformId);
      const ok = rows.filter((r) => r.validated).length;
      const fail = rows.length - ok;
      const uniqueUsers = new Set(rows.map((r) => r.lti_user_id)).size;
      const uniqueContexts = new Set(rows.map((r) => r.context_id).filter(Boolean)).size;
      return {
        totalLaunches: rows.length,
        successfulLaunches: ok,
        failedLaunches: fail,
        successRate: rows.length ? Math.round((ok / rows.length) * 100) : null,
        uniqueUsers,
        uniqueContexts,
        lastLaunchAt: rows[0]?.created_at ?? null,
      };
    },
    [launches]
  );

  return {
    collegeId,
    platforms,
    launches,
    loading,
    error,
    refresh,
    addPlatform,
    updatePlatform,
    deletePlatform,
    launchesForPlatform,
    statsForPlatform,
    verifyPlatform,
    globalStats,
    health,
    refreshHealth,
  };
}

/** URL validator — returns null if valid, else an error message. */
export function validateLtiUrl(value: string, label: string): string | null {
  if (!value) return `${label} is required`;
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:') return `${label} must use https://`;
    if (!u.hostname.includes('.')) return `${label} does not look like a valid host`;
    return null;
  } catch {
    return `${label} is not a valid URL`;
  }
}
