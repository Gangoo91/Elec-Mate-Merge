/* ==========================================================================
   College security: staff two-step sign-in (ELE-1915), support view-as
   consent (ELE-1966) and Microsoft sign-in domains (ELE-1971).

   The server decides everything; these hooks only read state and call the
   RPCs, which refuse anyone but the college's admin or head of department.
   ========================================================================== */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MfaRequirement {
  required: boolean;
  is_staff: boolean;
  college_id: string | null;
  college_name: string | null;
  aal: 'aal1' | 'aal2' | string;
  satisfied: boolean;
  college_requires_all_staff?: boolean;
  college_requires_safeguarding?: boolean;
  platform_totp_enabled?: boolean;
}

/** Am I staff at a college that requires two steps, and is this session aal2? */
export function useMfaRequirement() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-mfa-requirement', user?.id],
    enabled: !!user?.id,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_mfa_requirement' as never);
      if (error) throw error;
      return (data ?? null) as MfaRequirement | null;
    },
  });
}

export interface SsoDomain {
  id: string;
  domain: string;
  azure_tenant_id: string | null;
  allow_staff: boolean;
  allow_learners: boolean;
  created_at: string;
}

export interface CollegeSecurityState {
  requireStaffMfa: boolean;
  /** Safeguarding leads must use two steps (default on; ELE-1915). */
  requireSafeguardingMfa: boolean;
  /** TOTP enrolment switched on for Elec-Mate (platform_security_settings). */
  platformTotpEnabled: boolean;
  supportViewAs: boolean;
  supportChangedAt: string | null;
  domains: SsoDomain[];
}

export function useCollegeSecurity(collegeId: string | null | undefined) {
  const qc = useQueryClient();
  const key = useMemo(() => ['college-security', collegeId], [collegeId]);
  const query = useQuery({
    queryKey: key,
    enabled: !!collegeId,
    staleTime: 30_000,
    queryFn: async (): Promise<CollegeSecurityState> => {
      const [college, consent, domains, platform] = await Promise.all([
        supabase
          .from('colleges')
          .select('require_staff_mfa, require_safeguarding_mfa' as never)
          .eq('id', collegeId as string)
          .maybeSingle(),
        supabase
          .from('college_support_consent' as never)
          .select('view_as_allowed, changed_at')
          .eq('college_id', collegeId as string)
          .maybeSingle(),
        supabase
          .from('college_sso_domains' as never)
          .select('id, domain, azure_tenant_id, allow_staff, allow_learners, created_at')
          .eq('college_id', collegeId as string)
          .order('domain'),
        supabase
          .from('platform_security_settings' as never)
          .select('totp_enrolment_enabled')
          .maybeSingle(),
      ]);
      if (college.error) throw college.error;
      if (consent.error) throw consent.error;
      if (domains.error) throw domains.error;
      const c = consent.data as { view_as_allowed?: boolean; changed_at?: string } | null;
      const col = college.data as {
        require_staff_mfa?: boolean;
        require_safeguarding_mfa?: boolean;
      } | null;
      return {
        requireStaffMfa: !!col?.require_staff_mfa,
        requireSafeguardingMfa: col?.require_safeguarding_mfa !== false,
        platformTotpEnabled: !!(platform.data as { totp_enrolment_enabled?: boolean } | null)
          ?.totp_enrolment_enabled,
        supportViewAs: !!c?.view_as_allowed,
        supportChangedAt: c?.changed_at ?? null,
        domains: (domains.data ?? []) as unknown as SsoDomain[],
      };
    },
  });

  const refresh = useCallback(() => qc.invalidateQueries({ queryKey: key }), [qc, key]);

  const setRequireStaffMfa = useCallback(
    async (on: boolean) => {
      const { error } = await supabase.rpc(
        'set_college_require_staff_mfa' as never,
        { p_college: collegeId, p_required: on } as never
      );
      if (error) throw error;
      await refresh();
      await qc.invalidateQueries({ queryKey: ['my-mfa-requirement'] });
    },
    [collegeId, refresh, qc]
  );

  const setRequireSafeguardingMfa = useCallback(
    async (on: boolean) => {
      const { error } = await supabase.rpc(
        'set_college_require_safeguarding_mfa' as never,
        { p_college: collegeId, p_required: on } as never
      );
      if (error) throw error;
      await refresh();
      await qc.invalidateQueries({ queryKey: ['my-mfa-requirement'] });
    },
    [collegeId, refresh, qc]
  );

  const setSupportViewAs = useCallback(
    async (on: boolean) => {
      const { error } = await supabase.rpc(
        'set_college_support_consent' as never,
        { p_college: collegeId, p_allowed: on } as never
      );
      if (error) throw error;
      await refresh();
    },
    [collegeId, refresh]
  );

  const addDomain = useCallback(
    async (domain: string, tenant: string | null) => {
      const { error } = await supabase.rpc(
        'college_sso_add_domain' as never,
        { p_college: collegeId, p_domain: domain, p_tenant: tenant } as never
      );
      if (error) throw error;
      await refresh();
    },
    [collegeId, refresh]
  );

  const removeDomain = useCallback(
    async (id: string) => {
      const { error } = await supabase.rpc(
        'college_sso_remove_domain' as never,
        { p_id: id } as never
      );
      if (error) throw error;
      await refresh();
    },
    [refresh]
  );

  return {
    ...query,
    setRequireStaffMfa,
    setRequireSafeguardingMfa,
    setSupportViewAs,
    addDomain,
    removeDomain,
  };
}
