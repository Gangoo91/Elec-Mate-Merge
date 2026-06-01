/**
 * useKSBTracking
 *
 * Hook for managing Knowledge, Skills, and Behaviours (KSBs)
 * tracking for apprenticeship qualifications.
 *
 * ST0152 has K1-K8 (Knowledge) and B1-B8 (Behaviours).
 * Skills are integrated into knowledge units — there is no separate skills category.
 * The hook still exposes `skills` for backward compatibility (always empty for ST0152).
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type {
  ApprenticeshipKSB,
  UserKSBProgress,
  KSBProgressStatus,
  KSBSummary,
  KSBType,
  KSBUnitMapping,
} from '@/types/qualification';

interface UseKSBTrackingOptions {
  qualificationId?: string;
  /** Filter by route — shows 'core' + selected route KSBs */
  route?: 'installation' | 'maintenance';
}

export function useKSBTracking(options: UseKSBTrackingOptions = {}) {
  const { user } = useAuth();
  const { qualificationId, route } = options;

  const [ksbs, setKsbs] = useState<ApprenticeshipKSB[]>([]);
  const [progress, setProgress] = useState<UserKSBProgress[]>([]);
  const [summary, setSummary] = useState<KSBSummary[]>([]);
  const [unitMappings, setUnitMappings] = useState<KSBUnitMapping[]>([]);
  // Unit codes the apprentice has portfolio evidence for — drives auto-deriving
  // KSB coverage from AC evidence (no manual linking needed).
  const [evidencedUnits, setEvidencedUnits] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch KSBs for a qualification
  const fetchKSBs = useCallback(
    async (qualId?: string) => {
      const targetQualId = qualId || qualificationId;
      if (!targetQualId) return [];

      try {
        const { data, error: fetchError } = await supabase
          .from('apprenticeship_ksbs')
          .select('*')
          .eq('qualification_id', targetQualId)
          .order('ksb_type')
          .order('sort_order');

        if (fetchError) throw fetchError;
        return data || [];
      } catch (err) {
        console.error('Error fetching KSBs:', err);
        return [];
      }
    },
    [qualificationId]
  );

  // Fetch KSB unit mappings
  const fetchUnitMappings = useCallback(async (ksbIds: string[]) => {
    if (ksbIds.length === 0) return [];

    try {
      const { data, error: fetchError } = await supabase
        .from('ksb_unit_mapping')
        .select('*')
        .in('ksb_id', ksbIds);

      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      console.error('Error fetching unit mappings:', err);
      return [];
    }
  }, []);

  // Fetch user's KSB progress
  const fetchProgress = useCallback(async () => {
    if (!user) return [];

    try {
      const { data, error: fetchError } = await supabase
        .from('user_ksb_progress')
        .select(
          `
          *,
          ksb:apprenticeship_ksbs(*)
        `
        )
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      console.error('Error fetching KSB progress:', err);
      return [];
    }
  }, [user]);

  // Fetch KSB summary by type
  const fetchSummary = useCallback(
    async (qualId?: string) => {
      if (!user) return [];
      const targetQualId = qualId || qualificationId;
      if (!targetQualId) return [];

      try {
        const { data, error: fetchError } = await supabase
          .from('apprentice_ksb_summary')
          .select('*')
          .eq('user_id', user.id)
          .eq('qualification_id', targetQualId);

        if (fetchError) throw fetchError;
        return data || [];
      } catch (err) {
        console.error('Error fetching KSB summary:', err);
        return [];
      }
    },
    [user, qualificationId]
  );

  // Load all data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [ksbData, progressData, summaryData] = await Promise.all([
        fetchKSBs(),
        fetchProgress(),
        fetchSummary(),
      ]);

      setKsbs(ksbData);
      setProgress(progressData);
      setSummary(summaryData);

      // Fetch unit mappings for all KSBs
      if (ksbData.length > 0) {
        const mappings = await fetchUnitMappings(ksbData.map((k) => k.id));
        setUnitMappings(mappings);
      }

      // Derive which units the apprentice has portfolio evidence for, so KSBs
      // mapped to those units count as auto-evidenced without manual linking.
      if (user) {
        const { data: items } = await supabase
          .from('portfolio_items')
          .select('assessment_criteria_met')
          .eq('user_id', user.id);
        const units = new Set<string>();
        for (const it of items ?? []) {
          const acs = (it as { assessment_criteria_met?: string[] | null })
            .assessment_criteria_met;
          for (const ac of acs ?? []) {
            const m =
              ac.match(/^\s*([A-Za-z0-9/._-]+)\s+AC\b/) ??
              ac.match(/Unit\s*([A-Za-z0-9/._-]+)/i);
            if (m?.[1]) units.add(m[1]);
          }
        }
        setEvidencedUnits(units);
      }
    } catch (err) {
      setError('Failed to load KSB data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchKSBs, fetchProgress, fetchSummary, fetchUnitMappings]);

  // Update KSB progress
  const updateKSBProgress = useCallback(
    async (ksbId: string, status: KSBProgressStatus, notes?: string): Promise<boolean> => {
      if (!user) {
        toast.error('You must be logged in');
        return false;
      }

      try {
        const { error: upsertError } = await supabase.from('user_ksb_progress').upsert(
          {
            user_id: user.id,
            ksb_id: ksbId,
            status,
            notes,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,ksb_id',
          }
        );

        if (upsertError) throw upsertError;

        // Refresh progress data
        const newProgress = await fetchProgress();
        setProgress(newProgress);

        toast.success('Progress updated');
        return true;
      } catch (err) {
        console.error('Error updating KSB progress:', err);
        toast.error('Failed to update progress');
        return false;
      }
    },
    [user, fetchProgress]
  );

  // Link portfolio evidence to a KSB
  const linkEvidence = useCallback(
    async (ksbId: string, portfolioItemId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        // Get current progress
        const { data: currentProgress } = await supabase
          .from('user_ksb_progress')
          .select('evidence_portfolio_ids')
          .eq('user_id', user.id)
          .eq('ksb_id', ksbId)
          .single();

        const currentIds = currentProgress?.evidence_portfolio_ids || [];
        if (currentIds.includes(portfolioItemId)) {
          toast.info('Evidence already linked');
          return true;
        }

        const { error: updateError } = await supabase.from('user_ksb_progress').upsert(
          {
            user_id: user.id,
            ksb_id: ksbId,
            evidence_portfolio_ids: [...currentIds, portfolioItemId],
            status: 'evidence_submitted',
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id,ksb_id',
          }
        );

        if (updateError) throw updateError;

        // Refresh progress
        const newProgress = await fetchProgress();
        setProgress(newProgress);

        toast.success('Evidence linked to KSB');
        return true;
      } catch (err) {
        console.error('Error linking evidence:', err);
        toast.error('Failed to link evidence');
        return false;
      }
    },
    [user, fetchProgress]
  );

  // Unlink portfolio evidence from a KSB
  const unlinkEvidence = useCallback(
    async (ksbId: string, portfolioItemId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const { data: currentProgress } = await supabase
          .from('user_ksb_progress')
          .select('evidence_portfolio_ids')
          .eq('user_id', user.id)
          .eq('ksb_id', ksbId)
          .single();

        const currentIds = currentProgress?.evidence_portfolio_ids || [];
        const newIds = currentIds.filter((id: string) => id !== portfolioItemId);

        const { error: updateError } = await supabase
          .from('user_ksb_progress')
          .update({
            evidence_portfolio_ids: newIds,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('ksb_id', ksbId);

        if (updateError) throw updateError;

        const newProgress = await fetchProgress();
        setProgress(newProgress);

        toast.success('Evidence unlinked');
        return true;
      } catch (err) {
        console.error('Error unlinking evidence:', err);
        toast.error('Failed to unlink evidence');
        return false;
      }
    },
    [user, fetchProgress]
  );

  // Get KSBs grouped by type
  const getKSBsByType = useCallback(
    (type: KSBType): ApprenticeshipKSB[] => {
      return ksbs.filter((k) => k.ksb_type === type);
    },
    [ksbs]
  );

  // Get progress for a specific KSB
  const getKSBProgress = useCallback(
    (ksbId: string): UserKSBProgress | undefined => {
      return progress.find((p) => p.ksb_id === ksbId);
    },
    [progress]
  );

  // Get unit mappings for a specific KSB
  const getUnitMappings = useCallback(
    (ksbId: string): KSBUnitMapping[] => {
      return unitMappings.filter((m) => m.ksb_id === ksbId);
    },
    [unitMappings]
  );

  // Calculate overall completion
  const getOverallCompletion = useCallback((): number => {
    if (ksbs.length === 0) return 0;
    const completedCount = progress.filter(
      (p) => p.status === 'completed' || p.status === 'verified'
    ).length;
    return Math.round((completedCount / ksbs.length) * 100);
  }, [ksbs, progress]);

  // True when a KSB is auto-evidenced: a unit it maps to has portfolio
  // evidence, even if the apprentice hasn't manually linked an item.
  const isAutoEvidenced = useCallback(
    (ksbId: string): boolean =>
      unitMappings.some((m) => m.ksb_id === ksbId && evidencedUnits.has(m.unit_code)),
    [unitMappings, evidencedUnits]
  );

  // Effective status = the higher of the manual status and the auto-derived
  // one (a mapped unit with evidence lifts a KSB to at least evidence_submitted).
  const STATUS_RANK: Record<KSBProgressStatus, number> = {
    not_started: 0,
    in_progress: 1,
    evidence_submitted: 2,
    verified: 3,
    completed: 4,
  };
  const getDerivedStatus = useCallback(
    (ksbId: string): KSBProgressStatus => {
      const manual = progress.find((p) => p.ksb_id === ksbId)?.status ?? 'not_started';
      if (isAutoEvidenced(ksbId) && STATUS_RANK[manual] < STATUS_RANK.evidence_submitted) {
        return 'evidence_submitted';
      }
      return manual;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress, isAutoEvidenced]
  );

  // % of KSBs with at least derived evidence (manual or auto).
  const getDerivedCompletion = useCallback((): number => {
    if (ksbs.length === 0) return 0;
    const covered = ksbs.filter(
      (k) => STATUS_RANK[getDerivedStatus(k.id)] >= STATUS_RANK.evidence_submitted
    ).length;
    return Math.round((covered / ksbs.length) * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ksbs, getDerivedStatus]);

  // Filter KSBs by route (core + selected route)
  const filteredKSBs = ksbs.filter((k) => {
    if (!route) return true;
    return k.route === 'core' || k.route === route;
  });

  // Initial load
  useEffect(() => {
    if (qualificationId) {
      loadData();
    }
  }, [qualificationId, loadData]);

  return {
    // Data
    ksbs: filteredKSBs,
    progress,
    summary,
    unitMappings,
    isLoading,
    error,

    // Actions
    updateKSBProgress,
    linkEvidence,
    unlinkEvidence,
    refetch: loadData,

    // Helpers
    getKSBsByType,
    getKSBProgress,
    getUnitMappings,
    getOverallCompletion,

    // Auto-derived coverage from AC evidence
    evidencedUnits,
    isAutoEvidenced,
    getDerivedStatus,
    getDerivedCompletion,

    // Grouped KSBs (filtered by route)
    knowledge: filteredKSBs.filter((k) => k.ksb_type === 'knowledge'),
    skills: filteredKSBs.filter((k) => k.ksb_type === 'skill'),
    behaviours: filteredKSBs.filter((k) => k.ksb_type === 'behaviour'),
  };
}

export default useKSBTracking;
