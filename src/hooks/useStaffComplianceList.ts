import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStaffComplianceList — one row per staff with rolled-up compliance
   status, role flags (DSL/Prevent/H&S/etc.) and staff age (for onboarding
   tone). RLS scopes rows to the caller's college.
   ========================================================================== */

export type ComputedStatus = 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';

export interface StaffRoleFlags {
  is_dsl: boolean;
  is_deputy_dsl: boolean;
  is_prevent_lead: boolean;
  is_h_and_s_lead: boolean;
  is_quality_nominee: boolean;
  is_mental_health_lead: boolean;
}

export interface StaffComplianceRow extends StaffRoleFlags {
  college_staff_id: string;
  name: string;
  role: string;
  department: string | null;
  archived_at: string | null;
  staff_created_at: string | null;
  totals: {
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
    pending_verification: number;
    total: number;
  };
  /** worst-case across all SCR-required items */
  worst_status: ComputedStatus;
  /** soonest expiry across valid + expiring */
  next_expiry: string | null;
  /** has any compliance records at all yet */
  has_any_records: boolean;
}

const STATUS_RANK: Record<ComputedStatus, number> = {
  valid: 0,
  expiring: 1,
  pending_verification: 2,
  missing: 3,
  expired: 4,
};

interface ScrViewRow extends StaffRoleFlags {
  college_staff_id: string;
  name: string;
  role: string;
  department: string | null;
  archived_at: string | null;
  staff_created_at: string | null;
  computed_status: ComputedStatus;
  expires_at: string | null;
  record_id: string | null;
}

const SCR_COLS =
  'college_staff_id, name, role, department, archived_at, staff_created_at, ' +
  'is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead, ' +
  'computed_status, expires_at, record_id';

export function useStaffComplianceList() {
  const [rows, setRows] = useState<StaffComplianceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.from('v_single_central_record').select(SCR_COLS);

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    const grouped = new Map<string, StaffComplianceRow>();
    for (const r of (data ?? []) as ScrViewRow[]) {
      let staff = grouped.get(r.college_staff_id);
      if (!staff) {
        staff = {
          college_staff_id: r.college_staff_id,
          name: r.name,
          role: r.role,
          department: r.department,
          archived_at: r.archived_at,
          staff_created_at: r.staff_created_at,
          is_dsl: r.is_dsl,
          is_deputy_dsl: r.is_deputy_dsl,
          is_prevent_lead: r.is_prevent_lead,
          is_h_and_s_lead: r.is_h_and_s_lead,
          is_quality_nominee: r.is_quality_nominee,
          is_mental_health_lead: r.is_mental_health_lead,
          totals: {
            valid: 0,
            expiring: 0,
            expired: 0,
            missing: 0,
            pending_verification: 0,
            total: 0,
          },
          worst_status: 'valid',
          next_expiry: null,
          has_any_records: false,
        };
        grouped.set(r.college_staff_id, staff);
      }
      staff.totals[r.computed_status] += 1;
      staff.totals.total += 1;
      if (r.record_id) staff.has_any_records = true;
      if (STATUS_RANK[r.computed_status] > STATUS_RANK[staff.worst_status]) {
        staff.worst_status = r.computed_status;
      }
      if (
        r.expires_at &&
        (r.computed_status === 'valid' || r.computed_status === 'expiring') &&
        (!staff.next_expiry || r.expires_at < staff.next_expiry)
      ) {
        staff.next_expiry = r.expires_at;
      }
    }

    setRows(
      Array.from(grouped.values()).sort((a, b) => {
        const r = STATUS_RANK[b.worst_status] - STATUS_RANK[a.worst_status];
        if (r !== 0) return r;
        if (a.next_expiry && b.next_expiry) {
          if (a.next_expiry !== b.next_expiry) return a.next_expiry < b.next_expiry ? -1 : 1;
        } else if (a.next_expiry) {
          return -1;
        } else if (b.next_expiry) {
          return 1;
        }
        return a.name.localeCompare(b.name);
      })
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel('staff_compliance_list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff_compliance_records' },
        () => fetch()
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_staff' }, () =>
        fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  return { rows, loading, error, refresh: fetch };
}

/* ──────────────────────────────────────────────────────── */

export function isOnboarding(row: StaffComplianceRow): boolean {
  if (row.has_any_records) return false;
  if (!row.staff_created_at) return false;
  const ageDays = (Date.now() - new Date(row.staff_created_at).getTime()) / 86_400_000;
  return ageDays <= 14;
}
