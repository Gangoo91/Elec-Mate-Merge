import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeEmployers + useEmployerTokens — manage employer master
   records and their long-lived magic-link tokens for the public employer
   dashboard at /employer-view/<token>.
   ========================================================================== */

export interface CollegeEmployer {
  id: string;
  college_id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployerToken {
  id: string;
  employer_id: string;
  token: string;
  expires_at: string;
  revoked_at: string | null;
  use_count: number;
  last_used_at: string | null;
  created_at: string;
}

async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

function randomToken(): string {
  // 32 bytes of randomness → 43 char base64url. Unguessable.
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function useCollegeEmployers() {
  const [employers, setEmployers] = useState<CollegeEmployer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setEmployers([]);
        return;
      }
      const { data, error: e } = await supabase
        .from('college_employers')
        .select('*')
        .eq('college_id', collegeId)
        .order('company_name', { ascending: true });
      if (e) throw e;
      setEmployers((data ?? []) as CollegeEmployer[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  /** Register a new employer record. Returns the new id. */
  const create = useCallback(
    async (input: {
      id?: string;
      company_name: string;
      contact_name?: string;
      contact_email?: string;
      contact_phone?: string;
    }): Promise<CollegeEmployer | null> => {
      const collegeId = await callerCollegeId();
      if (!collegeId) throw new Error('No college');
      const insertRow: Record<string, unknown> = {
        college_id: collegeId,
        company_name: input.company_name.trim(),
        contact_name: input.contact_name?.trim() || null,
        contact_email: input.contact_email?.trim() || null,
        contact_phone: input.contact_phone?.trim() || null,
      };
      if (input.id) insertRow.id = input.id; // allow pinning UUID to match existing student.employer_id
      const { data, error: e } = await supabase
        .from('college_employers')
        .insert(insertRow)
        .select('*')
        .single();
      if (e) throw e;
      await fetch();
      return data as CollegeEmployer;
    },
    [fetch]
  );

  const update = useCallback(
    async (id: string, patch: Partial<CollegeEmployer>) => {
      const { error: e } = await supabase
        .from('college_employers')
        .update(patch)
        .eq('id', id);
      if (e) throw e;
      await fetch();
    },
    [fetch]
  );

  return { employers, loading, error, refetch: fetch, create, update };
}

export function useEmployerTokens(employerId: string | null) {
  const [tokens, setTokens] = useState<EmployerToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!employerId) {
      setTokens([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('college_employer_tokens')
        .select('*')
        .eq('employer_id', employerId)
        .order('created_at', { ascending: false });
      if (e) throw e;
      setTokens((data ?? []) as EmployerToken[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [employerId]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  /** Mint a new token, default 365 days. Returns the new row. */
  const issue = useCallback(
    async (validDays = 365): Promise<EmployerToken | null> => {
      if (!employerId) throw new Error('No employer');
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) throw new Error('Not signed in');
      const expiresAt = new Date(Date.now() + validDays * 86_400_000).toISOString();
      const token = randomToken();
      const { data, error: e } = await supabase
        .from('college_employer_tokens')
        .insert({
          employer_id: employerId,
          token,
          expires_at: expiresAt,
          created_by: userId,
        })
        .select('*')
        .single();
      if (e) throw e;
      await fetch();
      return data as EmployerToken;
    },
    [employerId, fetch]
  );

  const revoke = useCallback(
    async (id: string) => {
      const { error: e } = await supabase
        .from('college_employer_tokens')
        .update({ revoked_at: new Date().toISOString() })
        .eq('id', id);
      if (e) throw e;
      await fetch();
    },
    [fetch]
  );

  return { tokens, loading, error, refetch: fetch, issue, revoke };
}
