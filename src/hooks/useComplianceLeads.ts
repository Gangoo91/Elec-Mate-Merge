import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useComplianceLeads — list of staff who hold any of the safeguarding /
   compliance leadership roles (DSL, Deputy DSL, Prevent, H&S, MH, QN).
   RLS via college_staff (auth.role() check) keeps results scoped per call.
   ========================================================================== */

export type LeadRoleKey =
  | 'is_dsl'
  | 'is_deputy_dsl'
  | 'is_prevent_lead'
  | 'is_h_and_s_lead'
  | 'is_quality_nominee'
  | 'is_mental_health_lead';

export interface LeadStaff {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  role: string;
  department: string | null;
  is_dsl: boolean;
  is_deputy_dsl: boolean;
  is_prevent_lead: boolean;
  is_h_and_s_lead: boolean;
  is_quality_nominee: boolean;
  is_mental_health_lead: boolean;
}

const COLS =
  'id, name, email, phone, photo_url, role, department, is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead';

export function useComplianceLeads() {
  const [leads, setLeads] = useState<LeadStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_staff')
      .select(COLS)
      .is('archived_at', null)
      .or(
        'is_dsl.eq.true,is_deputy_dsl.eq.true,is_prevent_lead.eq.true,is_h_and_s_lead.eq.true,is_quality_nominee.eq.true,is_mental_health_lead.eq.true'
      )
      .order('name');

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setLeads((data ?? []) as LeadStaff[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime so role-flag toggles in the drawer reflect on the home widget
  useEffect(() => {
    const channel = supabase
      .channel('compliance_leads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_staff' }, () =>
        fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  return { leads, loading, error, refresh: fetch };
}
