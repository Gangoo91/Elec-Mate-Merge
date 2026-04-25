import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStaffComplianceVault — everything for one staff member's drawer:
     · staff core (with role flags, archived flag, photo)
     · all applicable requirement types (filtered by role + role flags)
     · existing records joined per requirement
     · CPD progress for current year
   Three parallel queries; merged client-side.
   ========================================================================== */

export type RoleFlagKey =
  | 'is_dsl'
  | 'is_deputy_dsl'
  | 'is_prevent_lead'
  | 'is_h_and_s_lead'
  | 'is_quality_nominee'
  | 'is_mental_health_lead';

export interface StaffVaultCore {
  id: string;
  college_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  department: string | null;
  photo_url: string | null;
  status: string | null;
  archived_at: string | null;
  created_at: string | null;
  is_dsl: boolean;
  is_deputy_dsl: boolean;
  is_prevent_lead: boolean;
  is_h_and_s_lead: boolean;
  is_quality_nominee: boolean;
  is_mental_health_lead: boolean;
}

export interface RequirementType {
  code: string;
  label: string;
  description: string | null;
  category: 'statutory' | 'qualification' | 'training' | 'declaration';
  default_validity_months: number | null;
  applies_to_role: string;
  is_scr_required: boolean;
  sort_order: number;
}

export interface ComplianceRecord {
  id: string;
  requirement_code: string;
  issued_at: string | null;
  expires_at: string | null;
  reference_no: string | null;
  evidence_path: string | null;
  status: 'valid' | 'expiring' | 'expired' | 'pending' | 'pending_verification';
  notes: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaultRow {
  type: RequirementType;
  record: ComplianceRecord | null;
  computed_status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';
  days_to_expiry: number | null;
}

export interface CpdProgress {
  hours_this_year: number;
  target_hours: number;
  percent_to_target: number;
  entries_this_year: number;
  current_year: number;
}

export interface VaultData {
  core: StaffVaultCore | null;
  rows: VaultRow[];
  cpd: CpdProgress | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  toggleRoleFlag: (flag: RoleFlagKey, value: boolean) => Promise<void>;
}

const RECORD_COLS =
  'id, requirement_code, issued_at, expires_at, reference_no, evidence_path, status, notes, verified_by, verified_at, created_at, updated_at';

function daysUntil(date: string | null): number | null {
  if (!date) return null;
  const d = new Date(date);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

function deriveStatus(record: ComplianceRecord | null): VaultRow['computed_status'] {
  if (!record) return 'missing';
  // Verification overrides date math — until a verifier signs off, the
  // record is in limbo regardless of how clean the dates look.
  if (!record.verified_at && (record.issued_at || record.expires_at)) {
    return 'pending_verification';
  }
  if (!record.expires_at) return 'valid';
  const days = daysUntil(record.expires_at);
  if (days === null) return 'valid';
  if (days < 0) return 'expired';
  if (days <= 60) return 'expiring';
  return 'valid';
}

function appliesTo(type: RequirementType, core: StaffVaultCore): boolean {
  if (type.applies_to_role === 'all') return true;
  if (type.applies_to_role.toLowerCase() === core.role.toLowerCase()) return true;
  if (type.applies_to_role === 'dsl' && (core.is_dsl || core.is_deputy_dsl)) return true;
  return false;
}

export function useStaffComplianceVault(staffId: string | null): VaultData {
  const [core, setCore] = useState<StaffVaultCore | null>(null);
  const [types, setTypes] = useState<RequirementType[]>([]);
  const [records, setRecords] = useState<ComplianceRecord[]>([]);
  const [cpd, setCpd] = useState<CpdProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!staffId) {
      setCore(null);
      setRecords([]);
      setCpd(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const [coreRes, typesRes, recordsRes, cpdRes] = await Promise.all([
      supabase
        .from('college_staff')
        .select(
          'id, college_id, name, email, phone, role, department, photo_url, status, archived_at, created_at, is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead'
        )
        .eq('id', staffId)
        .maybeSingle(),
      supabase
        .from('compliance_requirement_types')
        .select(
          'code, label, description, category, default_validity_months, applies_to_role, is_scr_required, sort_order'
        )
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase.from('staff_compliance_records').select(RECORD_COLS).eq('college_staff_id', staffId),
      supabase
        .from('v_staff_cpd_progress')
        .select('hours_this_year, target_hours, percent_to_target, entries_this_year, current_year')
        .eq('college_staff_id', staffId)
        .maybeSingle(),
    ]);

    if (coreRes.error) {
      setError(coreRes.error.message);
      setLoading(false);
      return;
    }

    setCore((coreRes.data as StaffVaultCore | null) ?? null);
    setTypes((typesRes.data ?? []) as RequirementType[]);
    setRecords((recordsRes.data ?? []) as ComplianceRecord[]);
    setCpd(
      cpdRes.data
        ? {
            hours_this_year: Number(cpdRes.data.hours_this_year ?? 0),
            target_hours: Number(cpdRes.data.target_hours ?? 30),
            percent_to_target: Number(cpdRes.data.percent_to_target ?? 0),
            entries_this_year: Number(cpdRes.data.entries_this_year ?? 0),
            current_year: Number(cpdRes.data.current_year),
          }
        : null
    );
    setLoading(false);
  }, [staffId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime: refetch when this staff's records or CPD entries change
  useEffect(() => {
    if (!staffId) return;
    const channel = supabase
      .channel(`staff_vault:${staffId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_compliance_records',
          filter: `college_staff_id=eq.${staffId}`,
        },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_cpd_entries',
          filter: `college_staff_id=eq.${staffId}`,
        },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [staffId, fetchAll]);

  const rows = useMemo<VaultRow[]>(() => {
    if (!core) return [];
    const recordsByCode = new Map<string, ComplianceRecord>();
    for (const r of records) recordsByCode.set(r.requirement_code, r);
    return types
      .filter((t) => appliesTo(t, core))
      .map((type) => {
        const record = recordsByCode.get(type.code) ?? null;
        return {
          type,
          record,
          computed_status: deriveStatus(record),
          days_to_expiry: daysUntil(record?.expires_at ?? null),
        };
      });
  }, [core, types, records]);

  const toggleRoleFlag = useCallback(
    async (flag: RoleFlagKey, value: boolean) => {
      if (!core) return;
      // Optimistic
      setCore({ ...core, [flag]: value });
      const { error: updateErr } = await supabase
        .from('college_staff')
        .update({ [flag]: value })
        .eq('id', core.id);
      if (updateErr) {
        // Roll back
        setCore(core);
        setError(updateErr.message);
      }
    },
    [core]
  );

  return {
    core,
    rows,
    cpd,
    loading,
    error,
    refresh: fetchAll,
    toggleRoleFlag,
  };
}
