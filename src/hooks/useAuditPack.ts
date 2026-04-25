import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAuditPack — single-snapshot aggregate of everything an Ofsted/EQA pack
   needs: college info, Single Central Record rows, policies + per-policy
   acknowledgement logs, staff compliance matrix. RLS scopes everything to
   the caller's college via _ch_same_college.
   ========================================================================== */

export interface AuditPackCollege {
  id: string;
  name: string;
  code: string | null;
  address: string | null;
}

export interface AuditPackOfficer {
  user_id: string;
  name: string;
  role: string;
  email: string | null;
}

export interface ScrRow {
  college_staff_id: string;
  staff_name: string;
  staff_role: string;
  department: string | null;
  requirement_code: string;
  requirement_label: string;
  category: string;
  computed_status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';
  expires_at: string | null;
  reference_no: string | null;
  verified_at: string | null;
  days_to_expiry: number | null;
}

export interface PolicySummary {
  id: string;
  code: string | null;
  title: string;
  category: string;
  status: 'draft' | 'live' | 'archived';
  version: number;
  effective_from: string | null;
  review_due_at: string | null;
  owner_role: string | null;
  requires_acknowledgement: boolean;
  approved_at: string | null;
  ack_count: number;
  ack_target: number;
}

export interface PolicyAckLogEntry {
  staff_id: string;
  staff_name: string;
  staff_role: string;
  department: string | null;
  status: 'signed' | 'outdated' | 'outstanding';
  signed_version: number | null;
  signed_at: string | null;
}

export interface PolicyWithAckLog extends PolicySummary {
  log: PolicyAckLogEntry[];
}

export interface AuditPackData {
  generated_at: string;
  college: AuditPackCollege | null;
  officer: AuditPackOfficer | null;
  scr: ScrRow[];
  policies: PolicyWithAckLog[];
  staff: {
    id: string;
    name: string;
    role: string;
    department: string | null;
    email: string | null;
    archived_at: string | null;
    is_dsl: boolean;
    is_deputy_dsl: boolean;
    is_prevent_lead: boolean;
    is_h_and_s_lead: boolean;
    is_quality_nominee: boolean;
    is_mental_health_lead: boolean;
  }[];
  /** Aggregate counts across all SCR rows for the cover stats. */
  summary: {
    total_staff: number;
    total_scr_rows: number;
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
    pending_verification: number;
    policies_live: number;
    policies_draft: number;
    policies_archived: number;
  };
}

interface ScrViewRow {
  college_staff_id: string;
  name: string;
  role: string;
  department: string | null;
  requirement_code: string;
  requirement: string;
  category: string;
  computed_status: ScrRow['computed_status'];
  expires_at: string | null;
  reference_no: string | null;
  verified_at: string | null;
  days_to_expiry: number | null;
}

interface RawPolicy {
  id: string;
  code: string | null;
  title: string;
  category: string;
  status: PolicySummary['status'];
  version: number;
  effective_from: string | null;
  review_due_at: string | null;
  owner_role: string | null;
  requires_acknowledgement: boolean;
  approved_at: string | null;
}

interface RawAck {
  policy_id: string;
  user_id: string;
  policy_version: number;
  acknowledged_at: string;
}

interface RawStaff {
  id: string;
  name: string;
  role: string;
  department: string | null;
  email: string | null;
  user_id: string | null;
  archived_at: string | null;
  is_dsl: boolean;
  is_deputy_dsl: boolean;
  is_prevent_lead: boolean;
  is_h_and_s_lead: boolean;
  is_quality_nominee: boolean;
  is_mental_health_lead: boolean;
}

const SCR_COLS =
  'college_staff_id, name, role, department, requirement_code, requirement, category, computed_status, expires_at, reference_no, verified_at, days_to_expiry';

const POLICY_COLS =
  'id, code, title, category, status, version, effective_from, review_due_at, owner_role, requires_acknowledgement, approved_at';

const STAFF_COLS =
  'id, name, role, department, email, user_id, archived_at, is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead';

export function useAuditPack() {
  const [data, setData] = useState<AuditPackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Resolve current user → profile → college
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id ?? null;
      let collegeId: string | null = null;
      let officer: AuditPackOfficer | null = null;
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id, full_name, role, email')
          .eq('id', userId)
          .maybeSingle();
        if (profile) {
          collegeId = (profile.college_id as string | null) ?? null;
          officer = {
            user_id: userId,
            name: (profile.full_name as string | null) ?? 'Unknown',
            role: (profile.role as string | null) ?? '',
            email: (profile.email as string | null) ?? null,
          };
        }
      }

      // 2. Fetch all the bits in parallel
      const staffQuery = supabase
        .from('college_staff')
        .select(STAFF_COLS)
        .is('archived_at', null)
        .order('name');
      if (collegeId) staffQuery.eq('college_id', collegeId);

      const collegeQuery = collegeId
        ? supabase
            .from('colleges')
            .select('id, name, code, address')
            .eq('id', collegeId)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null } as const);

      const [scrRes, policiesRes, acksRes, staffRes, collegeRes] = await Promise.all([
        supabase.from('v_single_central_record').select(SCR_COLS),
        supabase
          .from('college_policies')
          .select(POLICY_COLS)
          .order('status', { ascending: true })
          .order('updated_at', { ascending: false }),
        supabase
          .from('policy_acknowledgements')
          .select('policy_id, user_id, policy_version, acknowledged_at')
          .order('acknowledged_at', { ascending: false }),
        staffQuery,
        collegeQuery,
      ]);

      if (scrRes.error) throw scrRes.error;
      if (policiesRes.error) throw policiesRes.error;
      if (acksRes.error) throw acksRes.error;
      if (staffRes.error) throw staffRes.error;

      const scrRows: ScrViewRow[] = (scrRes.data ?? []) as ScrViewRow[];
      const rawPolicies: RawPolicy[] = (policiesRes.data ?? []) as RawPolicy[];
      const rawAcks: RawAck[] = (acksRes.data ?? []) as RawAck[];
      const rawStaff: RawStaff[] = (staffRes.data ?? []) as RawStaff[];

      // 3. Map SCR rows to public shape
      const scr: ScrRow[] = scrRows.map((r) => ({
        college_staff_id: r.college_staff_id,
        staff_name: r.name,
        staff_role: r.role,
        department: r.department,
        requirement_code: r.requirement_code,
        requirement_label: r.requirement,
        category: r.category,
        computed_status: r.computed_status,
        expires_at: r.expires_at,
        reference_no: r.reference_no,
        verified_at: r.verified_at,
        days_to_expiry: r.days_to_expiry,
      }));

      // 4. Build per-policy ack log
      const ackTarget = rawStaff.length;
      const acksByPolicy = new Map<string, RawAck[]>();
      for (const a of rawAcks) {
        const list = acksByPolicy.get(a.policy_id) ?? [];
        list.push(a);
        acksByPolicy.set(a.policy_id, list);
      }

      const policies: PolicyWithAckLog[] = rawPolicies.map((p) => {
        const policyAcks = acksByPolicy.get(p.id) ?? [];
        const latestByUser = new Map<string, RawAck>();
        for (const a of policyAcks) {
          const existing = latestByUser.get(a.user_id);
          if (!existing || a.acknowledged_at > existing.acknowledged_at) {
            latestByUser.set(a.user_id, a);
          }
        }

        const ackCount = policyAcks.filter((a) => a.policy_version === p.version).length;

        const log: PolicyAckLogEntry[] = rawStaff.map((s) => {
          const ack = s.user_id ? latestByUser.get(s.user_id) : undefined;
          let status: PolicyAckLogEntry['status'] = 'outstanding';
          if (ack) {
            status = ack.policy_version === p.version ? 'signed' : 'outdated';
          }
          return {
            staff_id: s.id,
            staff_name: s.name,
            staff_role: s.role,
            department: s.department,
            status,
            signed_version: ack?.policy_version ?? null,
            signed_at: ack?.acknowledged_at ?? null,
          };
        });

        return {
          ...p,
          ack_count: ackCount,
          ack_target: ackTarget,
          log,
        };
      });

      // 5. Summary stats
      const summary = {
        total_staff: rawStaff.length,
        total_scr_rows: scr.length,
        valid: 0,
        expiring: 0,
        expired: 0,
        missing: 0,
        pending_verification: 0,
        policies_live: 0,
        policies_draft: 0,
        policies_archived: 0,
      };
      for (const r of scr) {
        summary[r.computed_status] += 1;
      }
      for (const p of rawPolicies) {
        if (p.status === 'live') summary.policies_live += 1;
        else if (p.status === 'draft') summary.policies_draft += 1;
        else if (p.status === 'archived') summary.policies_archived += 1;
      }

      setData({
        generated_at: new Date().toISOString(),
        college: collegeRes.data
          ? {
              id: (collegeRes.data as { id: string }).id,
              name: (collegeRes.data as { name: string }).name,
              code: (collegeRes.data as { code: string | null }).code ?? null,
              address: (collegeRes.data as { address: string | null }).address ?? null,
            }
          : null,
        officer,
        scr,
        policies,
        staff: rawStaff.map((s) => ({
          id: s.id,
          name: s.name,
          role: s.role,
          department: s.department,
          email: s.email,
          archived_at: s.archived_at,
          is_dsl: s.is_dsl,
          is_deputy_dsl: s.is_deputy_dsl,
          is_prevent_lead: s.is_prevent_lead,
          is_h_and_s_lead: s.is_h_and_s_lead,
          is_quality_nominee: s.is_quality_nominee,
          is_mental_health_lead: s.is_mental_health_lead,
        })),
        summary,
      });
    } catch (e) {
      setError((e as Error).message ?? 'Could not build audit pack');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
