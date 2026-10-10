/**
 * SafetyScope — whose safety records a Site Safety screen is working on.
 *
 * Site Safety is one system used from two hubs:
 *  - personal (the Electrical Hub, and the default with no provider): the
 *    signed-in person's own records, `user_id = me`.
 *  - firm (the Employer Hub): the firm's records, `employer_id = firm`, where
 *    the firm is the owner's profiles.id (the same answer as
 *    my_default_employer_id(), so a co-admin works on the owner's firm).
 *
 * With no provider every helper here behaves exactly as the code did before it
 * existed: `applySafetyScope` adds the same `user_id` filter, the query-key
 * suffix is empty, and inserts are passed through untouched.
 *
 * The database decides the firm on its own as well: a trigger sets and checks
 * `employer_id` on every write (see the 20261008 site-safety migrations), so
 * nothing here can file a record against a firm the person is not part of.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

export type SafetyScopeMode = 'personal' | 'firm';

export interface SafetyScope {
  mode: SafetyScopeMode;
  /** The firm (owner's profiles.id). Always null in personal mode. */
  employerId: string | null;
}

export const PERSONAL_SAFETY_SCOPE: SafetyScope = Object.freeze({
  mode: 'personal',
  employerId: null,
}) as SafetyScope;

const SafetyScopeContext = createContext<SafetyScope>(PERSONAL_SAFETY_SCOPE);

export function useSafetyScope(): SafetyScope {
  return useContext(SafetyScopeContext);
}

/** True only for a firm scope that has resolved its firm. */
export function isFirmScope(scope: SafetyScope): scope is SafetyScope & { employerId: string } {
  return scope.mode === 'firm' && !!scope.employerId;
}

interface SafetyScopeProviderProps {
  mode: SafetyScopeMode;
  /** Optional: the firm. Resolved from my_default_employer_id() when omitted. */
  employerId?: string | null;
  /** Shown while the firm is being resolved. */
  fallback?: ReactNode;
  children: ReactNode;
}

export function SafetyScopeProvider({
  mode,
  employerId,
  fallback = null,
  children,
}: SafetyScopeProviderProps) {
  const { user } = useAuth();
  const needsLookup = mode === 'firm' && !employerId && !!user?.id;
  const { data: resolved } = useQuery({
    queryKey: ['safety-scope-employer', user?.id],
    enabled: needsLookup,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });

  if (mode === 'personal') {
    return (
      <SafetyScopeContext.Provider value={PERSONAL_SAFETY_SCOPE}>
        {children}
      </SafetyScopeContext.Provider>
    );
  }

  const firmId = employerId ?? resolved ?? null;
  // Never render a firm screen without its firm: it would fall back to
  // nothing rather than to the person's own records, but say so by waiting.
  if (!firmId) return <>{fallback}</>;

  return (
    <SafetyScopeContext.Provider value={{ mode: 'firm', employerId: firmId }}>
      {children}
    </SafetyScopeContext.Provider>
  );
}

/**
 * Extra query-key parts for a scope. Empty in personal mode, so existing keys
 * (and every invalidation that targets them) are unchanged.
 */
export function safetyScopeKey(scope: SafetyScope): string[] {
  return isFirmScope(scope) ? ['firm', scope.employerId] : [];
}

type Filterable<Q> = { eq: (column: string, value: string) => Q };

/**
 * Scope a list query: `user_id = me` in personal mode, `employer_id = firm` in
 * firm mode. Never rely on RLS alone for a list — RLS lets a firm manager read
 * their team's job-linked records, which must not appear in a personal list.
 */
export function applySafetyScope<Q>(query: Q, scope: SafetyScope, userId: string): Q {
  const q = query as unknown as Filterable<Q>;
  return isFirmScope(scope) ? q.eq('employer_id', scope.employerId) : q.eq('user_id', userId);
}

/**
 * Fields a shared safety record carries. All optional: personal records (and
 * rows read by the existing client) have none of them set.
 */
export interface FirmRecordFields {
  user_id?: string | null;
  employer_id?: string | null;
  employer_job_id?: string | null;
  firm_countersigned_by?: string | null;
  firm_countersigned_name?: string | null;
  firm_countersigned_at?: string | null;
}

/**
 * The people who act for the firm in scope: its owner and active co-admins
 * (safety_firm_manager_ids). A record any of them made is the firm's. Empty in
 * personal scope.
 */
export function useFirmManagerIds(): { ids: Set<string>; isLoading: boolean } {
  const scope = useSafetyScope();
  const firmId = isFirmScope(scope) ? scope.employerId : null;
  const { data, isLoading } = useQuery({
    queryKey: ['safety-firm-managers', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<string[]> => {
      const { data: rows, error } = await supabase.rpc(
        'safety_firm_manager_ids' as never,
        { p_employer_id: firmId } as never
      );
      if (error) throw error;
      return ((rows as unknown as Array<string | { safety_firm_manager_ids: string }>) ?? []).map(
        (r) => (typeof r === 'string' ? r : r.safety_firm_manager_ids)
      );
    },
  });
  return { ids: new Set(data ?? (firmId ? [firmId] : [])), isLoading: !!firmId && isLoading };
}

export interface FirmRecordAccess {
  /** Firm scope and this record belongs to the firm. */
  firm: boolean;
  /** A worker's record shared through a firm job: read and countersign only. */
  sharedByWorker: boolean;
  /** The signed-in person may change the record here. */
  canEdit: boolean;
}

/**
 * What the signed-in person may do with a record. Personal scope: everything
 * they could always do (the row is theirs). Firm scope: the firm's own records
 * are editable by any manager; a worker's shared record is read-only.
 */
export function useFirmRecordAccess(row: FirmRecordFields | null | undefined): FirmRecordAccess {
  const scope = useSafetyScope();
  const { ids } = useFirmManagerIds();
  if (!isFirmScope(scope) || !row) return { firm: false, sharedByWorker: false, canEdit: true };
  const sharedByWorker = !!row.user_id && !ids.has(row.user_id);
  return { firm: true, sharedByWorker, canEdit: !sharedByWorker };
}

/** The tables a firm manager can countersign (safety_countersign). */
export type CountersignTable =
  | 'permits_to_work'
  | 'coshh_assessments'
  | 'safe_isolation_records'
  | 'fire_watch_records'
  | 'pre_use_checks'
  | 'inspection_records'
  | 'safety_observations'
  | 'electrician_site_diary'
  | 'rams_documents'
  | 'near_miss_reports'
  | 'accident_records';

/** Countersign (or withdraw a countersignature on) a record shared with the firm. */
export async function countersignSafetyRecord(
  table: CountersignTable,
  id: string,
  withdraw = false
): Promise<{ countersigned_name: string | null; countersigned_at: string | null }> {
  const { data, error } = await supabase.rpc(
    'safety_countersign' as never,
    { p_table: table, p_id: id, p_withdraw: withdraw } as never
  );
  if (error) throw error;
  return data as unknown as { countersigned_name: string | null; countersigned_at: string | null };
}

/**
 * An update in firm scope that RLS blocked returns no rows rather than an
 * error. Call with the rows an update returned (`.select('id')`) to say so.
 */
export function assertFirmWrite(scope: SafetyScope, rows: unknown[] | null | undefined): void {
  if (isFirmScope(scope) && (!rows || rows.length === 0)) {
    throw new Error('Only the person who made this record can change it.');
  }
}

/**
 * The message to show for a failed write. In firm scope an update RLS blocked
 * comes back as "no rows" (PGRST116 from `.single()`); say why instead. In
 * personal scope the message is exactly the error's, as before.
 */
export function firmWriteErrorMessage(scope: SafetyScope, error: unknown): string {
  const e = error as { code?: string; message?: string } | null;
  if (isFirmScope(scope) && e?.code === 'PGRST116') {
    return 'Only the person who made this record can change it.';
  }
  return e?.message ?? 'Something went wrong.';
}

export interface SafetyStampOptions {
  /** employer_jobs.id — files the record against a firm job (and so the firm). */
  employerJobId?: string | null;
}

/**
 * Stamp an insert with its firm. Firm mode: `employer_id` (+ the firm job when
 * given). Personal mode: only a chosen firm job (a worker sharing a record with
 * their firm) — the trigger derives `employer_id` from the job. Otherwise the
 * row is returned untouched.
 */
export function stampSafetyInsert<T extends object>(
  row: T,
  scope: SafetyScope,
  opts: SafetyStampOptions = {}
): T & { employer_id?: string; employer_job_id?: string } {
  if (isFirmScope(scope)) {
    return {
      ...row,
      employer_id: scope.employerId,
      ...(opts.employerJobId ? { employer_job_id: opts.employerJobId } : {}),
    };
  }
  if (opts.employerJobId) return { ...row, employer_job_id: opts.employerJobId };
  return row;
}

/** Where a generated RAMS opens: its own route, or the Employer Hub's tool. */
export function ramsResultPath(scope: SafetyScope, generationJobId: string): string {
  return isFirmScope(scope)
    ? `/employer?section=site-safety&tool=rams-result&id=${generationJobId}`
    : `/electrician/site-safety/ai-rams/${generationJobId}`;
}

/** Where Site Safety's home is for a scope. */
export function safetyHomePath(scope: SafetyScope): string {
  return isFirmScope(scope) ? '/employer?section=site-safety' : '/electrician/site-safety';
}
