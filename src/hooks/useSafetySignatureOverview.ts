import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SignatureDocSummary {
  type: string;
  label: string;
  total: number;
  signed: number;
  unsigned: number;
}

export interface SignatureOverview {
  totalDocuments: number;
  totalSigned: number;
  totalUnsigned: number;
  signedPercent: number;
  byType: SignatureDocSummary[];
}

/**
 * Composite hook that queries all safety tables for signature status.
 * Returns a unified overview of signed/unsigned documents across:
 * - Permits to Work (issuer + receiver)
 * - Safe Isolation (isolator + verifier)
 * - COSHH (assessor + reviewer)
 * - Accident Records (reporter)
 * - Near Miss (reporter)
 * - Inspections (inspector)
 * - Site Diary (recorder)
 * - Safety Observations (observer)
 * - Pre-Use Checks (checker)
 * - Fire Watch (completed_by)
 */
export function useSafetySignatureOverview() {
  const { session } = useAuth();

  return useQuery({
    queryKey: ['safety-signature-overview', session?.user?.id],
    queryFn: async (): Promise<SignatureOverview> => {
      if (!session?.user?.id) {
        return {
          totalDocuments: 0,
          totalSigned: 0,
          totalUnsigned: 0,
          signedPercent: 0,
          byType: [],
        };
      }

      const uid = session.user.id;

      // Run all queries in parallel — each returns total count and signed count
      const [
        permits,
        isolation,
        coshh,
        accidents,
        nearMiss,
        inspections,
        diary,
        observations,
        preUse,
        fireWatch,
      ] = await Promise.all([
        // Permits: need both issuer AND receiver signatures
        supabase
          .from('permits_to_work')
          .select('id, issuer_signature, receiver_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Safe Isolation: need both isolator AND verifier
        supabase
          .from('safe_isolation_records')
          .select('id, isolator_signature, verifier_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // COSHH: assessor required, reviewer optional
        supabase
          .from('coshh_assessments')
          .select('id, assessor_signature, reviewer_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Accident Records
        supabase
          .from('accident_records')
          .select('id, reporter_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Near Miss
        supabase
          .from('near_miss_reports')
          .select('id, reporter_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Inspections
        supabase
          .from('inspection_records')
          .select('id, inspector_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Site Diary
        supabase
          .from('electrician_site_diary')
          .select('id, recorder_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Safety Observations
        supabase
          .from('safety_observations')
          .select('id, observer_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Pre-Use Checks
        supabase
          .from('pre_use_checks')
          .select('id, signature', { count: 'exact', head: false })
          .eq('user_id', uid),
        // Fire Watch
        supabase
          .from('fire_watch_records')
          .select('id, completed_signature', { count: 'exact', head: false })
          .eq('user_id', uid),
      ]);

      const byType: SignatureDocSummary[] = [];

      // Helper: count records with all required signatures present
      const addType = (
        label: string,
        type: string,
        data: Record<string, unknown>[] | null,
        signatureFields: string[]
      ) => {
        if (!data || data.length === 0) return;
        const total = data.length;
        const signed = data.filter((row) =>
          signatureFields.every((f) => row[f] && String(row[f]).length > 0)
        ).length;
        byType.push({ type, label, total, signed, unsigned: total - signed });
      };

      addType('Permits to Work', 'permit', permits.data, [
        'issuer_signature',
        'receiver_signature',
      ]);
      addType('Safe Isolation', 'safe-isolation', isolation.data, [
        'isolator_signature',
        'verifier_signature',
      ]);
      addType('COSHH Assessments', 'coshh', coshh.data, ['assessor_signature']);
      addType('Accident Records', 'accident', accidents.data, ['reporter_signature']);
      addType('Near Miss Reports', 'near-miss', nearMiss.data, ['reporter_signature']);
      addType('Inspection Reports', 'inspection', inspections.data, ['inspector_signature']);
      addType('Site Diary', 'site-diary', diary.data, ['recorder_signature']);
      addType('Safety Observations', 'observation', observations.data, ['observer_signature']);
      addType('Pre-Use Checks', 'pre-use-check', preUse.data, ['signature']);
      addType('Fire Watch', 'fire-watch', fireWatch.data, ['completed_signature']);

      const totalDocuments = byType.reduce((sum, t) => sum + t.total, 0);
      const totalSigned = byType.reduce((sum, t) => sum + t.signed, 0);
      const totalUnsigned = totalDocuments - totalSigned;
      const signedPercent =
        totalDocuments > 0 ? Math.round((totalSigned / totalDocuments) * 100) : 0;

      return { totalDocuments, totalSigned, totalUnsigned, signedPercent, byType };
    },
    enabled: !!session?.user?.id,
    staleTime: 60_000,
  });
}
