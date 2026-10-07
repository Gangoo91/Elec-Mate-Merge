/**
 * usePortfolioExports — export packs and EPAO gateway packs (ELE-1881 / ELE-1883).
 *
 * The edge function `portfolio-export-pack` builds the pack in the background
 * and records each one in `portfolio_exports`; this hook lists them (RLS: the
 * apprentice's own, or a learner the caller can assess), starts new ones,
 * polls while one is building and fetches a 24-hour download link.
 *
 * Also reads and signs the gateway declarations (epa_gateway_declarations).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { saveOrShareFile } from '@/utils/save-or-share-file';

export type ExportKind = 'evidence_pack' | 'gateway_pack';

export interface PortfolioExport {
  id: string;
  learner_id: string;
  kind: ExportKind;
  status: 'building' | 'ready' | 'failed';
  progress: string | null;
  requested_by_name: string | null;
  requested_role: 'learner' | 'staff';
  zip_path: string | null;
  pdf_path: string | null;
  zip_bytes: number | null;
  pdf_pages: number | null;
  file_count: number | null;
  counts: Record<string, number>;
  error: string | null;
  created_at: string;
  completed_at: string | null;
}

const COLS =
  'id, learner_id, kind, status, progress, requested_by_name, requested_role, zip_path, pdf_path, zip_bytes, pdf_pages, file_count, counts, error, created_at, completed_at';

/** A build older than this without finishing is treated as failed in the UI. */
const STALE_MS = 10 * 60_000;

export const isStale = (e: PortfolioExport) =>
  e.status === 'building' && Date.now() - new Date(e.created_at).getTime() > STALE_MS;

async function callFn<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('portfolio-export-pack', { body });
  if (error) {
    // Supabase wraps non-2xx; read the function's own message when it sent one.
    let msg = error.message;
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.json === 'function') msg = ((await ctx.json()) as { error?: string }).error ?? msg;
    } catch {
      /* keep the generic message */
    }
    throw new Error(msg);
  }
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as T;
}

/**
 * @param learnerId the apprentice's auth user id, or null for "me".
 */
export function usePortfolioExports(
  learnerId: string | null,
  opts: {
    enabled?: boolean;
    kinds?: ExportKind[];
    /** The apprentice's view: gateway packs only in their own copy (the college's copy holds its own documents). */
    ownGatewayCopiesOnly?: boolean;
  } = {}
) {
  const kinds = (opts.kinds ?? ['evidence_pack', 'gateway_pack']).join(',');
  const ownGatewayOnly = !!opts.ownGatewayCopiesOnly;
  const enabled = opts.enabled ?? true;
  const [exports, setExports] = useState<PortfolioExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState<ExportKind | null>(null);
  const [me, setMe] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let live = true;
    supabase.auth.getUser().then(({ data }) => live && setMe(data.user?.id ?? null));
    return () => {
      live = false;
    };
  }, []);
  const target = learnerId ?? me;

  const load = useCallback(async () => {
    if (!target) return;
    const { data, error: e } = await supabase
      .from('portfolio_exports' as never)
      .select(COLS)
      .eq('learner_id' as never, target as never)
      .in('kind' as never, kinds.split(',') as never)
      .order('created_at', { ascending: false })
      .limit(30);
    if (e) setError(e.message);
    else {
      setError(null);
      const rows = (data ?? []) as unknown as PortfolioExport[];
      setExports(ownGatewayOnly ? rows.filter((e) => e.kind !== 'gateway_pack' || e.requested_role === 'learner') : rows);
    }
    setLoading(false);
  }, [target, kinds, ownGatewayOnly]);

  useEffect(() => {
    if (!enabled || !target) return;
    setLoading(true);
    void load();
  }, [enabled, target, load]);

  // Poll while anything is building.
  const building = exports.some((e) => e.status === 'building' && !isStale(e));
  useEffect(() => {
    if (!enabled || !building) return;
    timer.current = setTimeout(() => void load(), 2000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enabled, building, exports, load]);

  const start = useCallback(
    async (kind: ExportKind) => {
      setStarting(kind);
      try {
        const res = await callFn<{ id: string }>({
          action: 'create',
          kind,
          ...(learnerId ? { learnerId } : {}),
        });
        await load();
        return res.id;
      } finally {
        setStarting(null);
      }
    },
    [learnerId, load]
  );

  const download = useCallback(async (e: PortfolioExport, file: 'zip' | 'pdf') => {
    const res = await callFn<{ url: string }>({ action: 'link', exportId: e.id, file });
    const path = file === 'pdf' ? e.pdf_path : e.zip_path;
    const name = path?.split('/').pop() ?? (file === 'pdf' ? 'pack.pdf' : 'pack.zip');
    await saveOrShareFile(res.url, name);
  }, []);

  return { exports, loading, error, starting, building, start, download, reload: load, learnerUserId: target };
}

// ── Gateway declarations ────────────────────────────────────────────────────

export type DeclarationKind = 'learner' | 'provider' | 'employer';

export interface SignedDeclaration {
  id: string;
  kind: DeclarationKind;
  signer_name: string | null;
  signer_role: string | null;
  signer_company: string | null;
  signed_at: string;
  snapshot_hash: string | null;
  statement_version?: number;
  has_signature: boolean;
}

export interface GatewayDeclarations {
  standard: { route: string; code: string | null; title: string | null; assessment: string | null } | null;
  /** The wording version a new signature signs (epa_gateway_declarations.statement_version). */
  statement_version?: number;
  /** Where the employer confirmation wording is quoted from (ST0152 / ST1017 EPA plan), if any. */
  wording_source?: { title: string; url: string } | null;
  statements: Record<DeclarationKind, string>;
  signed: SignedDeclaration[];
  employer_pending: { id: string; token: string | null; created_at: string; expires_at: string; requested_by_name: string | null } | null;
  snapshot: {
    learner_name?: string;
    employer_name?: string;
    criteria?: { passed: number; total: number };
    hours?: { counted: number; required: number };
  };
}

export function useGatewayDeclarations(learnerId: string | null, opts: { enabled?: boolean } = {}) {
  const enabled = opts.enabled ?? true;
  const [data, setData] = useState<GatewayDeclarations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: d, error: e } = await supabase.rpc(
      'get_gateway_declarations' as never,
      { p_learner: learnerId } as never
    );
    if (e) setError(e.message);
    else {
      setError(null);
      setData(d as unknown as GatewayDeclarations);
    }
    setLoading(false);
  }, [learnerId]);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    void load();
  }, [enabled, load]);

  const sign = useCallback(
    async (kind: 'learner' | 'provider', name: string, signature: string | null) => {
      const { data: d, error: e } = await supabase.rpc(
        'sign_gateway_declaration' as never,
        { p_learner: learnerId, p_kind: kind, p_name: name, p_signature: signature } as never
      );
      if (e) throw new Error(e.message);
      const res = d as unknown as { error?: string };
      if (res?.error) throw new Error(res.error);
      await load();
    },
    [learnerId, load]
  );

  const requestEmployerLink = useCallback(async () => {
    if (!learnerId) throw new Error('Choose a learner first.');
    const { data: d, error: e } = await supabase.rpc(
      'request_gateway_employer_declaration' as never,
      { p_learner: learnerId } as never
    );
    if (e) throw new Error(e.message);
    await load();
    return d as unknown as { token: string; employer_email: string | null };
  }, [learnerId, load]);

  const signedOf = (k: DeclarationKind) => data?.signed.find((s) => s.kind === k) ?? null;

  return { data, loading, error, reload: load, sign, requestEmployerLink, signedOf };
}

export const gatewayLinkFor = (token: string) =>
  `${typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com'}/gateway-declaration/${token}`;

export function fmtBytes(n: number | null | undefined): string {
  if (!n) return '';
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
