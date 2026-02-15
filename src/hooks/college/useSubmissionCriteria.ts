/**
 * useSubmissionCriteria
 *
 * Fetches the full assessment criteria tree for a category,
 * cross-references it with the student's portfolio items and
 * coverage matrix to build a checkable criteria checklist.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo } from 'react';

// ── Types ──────────────────────────────────────────────────────

export interface CriterionItem {
  /** e.g. "1.1" */
  acRef: string;
  /** e.g. "301.1.1" */
  acFullRef: string;
  /** Full description text */
  acText: string;
  /** Has the assessor verified this criterion? */
  verified: boolean;
  /** Number of portfolio items the student linked to this AC */
  evidenceCount: number;
  /** IDs of portfolio items linked to this AC */
  linkedItemIds: string[];
}

export interface LearningOutcomeGroup {
  loNumber: string;
  loText: string;
  criteria: CriterionItem[];
}

export interface CriteriaChecklistData {
  learningOutcomes: LearningOutcomeGroup[];
  totalCriteria: number;
  verifiedCriteria: number;
  evidencedCriteria: number;
  completionPercentage: number;
  hasGaps: boolean;
  gapCriteria: CriterionItem[];
}

// ── Hook ───────────────────────────────────────────────────────

export function useSubmissionCriteria(
  categoryId: string | null,
  qualificationId: string | null,
  studentId: string | null
) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 1. Fetch the qualification_categories row to get qualification_code
  const { data: category } = useQuery({
    queryKey: ['submission-criteria-category', categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const { data, error } = await supabase
        .from('qualification_categories')
        .select('id, name, learning_outcomes, assessment_criteria, qualification_id')
        .eq('id', categoryId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });

  // 2. Fetch the qualification to get its code for qualification_requirements lookup
  const { data: qualification } = useQuery({
    queryKey: ['submission-criteria-qualification', qualificationId],
    queryFn: async () => {
      if (!qualificationId) return null;
      const { data, error } = await supabase
        .from('qualifications')
        .select('id, code, title')
        .eq('id', qualificationId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!qualificationId,
  });

  // 3. Fetch normalised requirements from qualification_requirements
  const qualCode = qualification?.code ?? null;
  const { data: requirements = [] } = useQuery({
    queryKey: ['submission-criteria-requirements', qualCode, categoryId],
    queryFn: async () => {
      if (!qualCode) return [];

      // Get the category name to filter requirements by unit
      const catName = category?.name ?? '';

      const { data, error } = await supabase
        .from('qualification_requirements')
        .select('unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
        .eq('qualification_code', qualCode)
        .order('lo_number', { ascending: true })
        .order('ac_code', { ascending: true });

      if (error) throw error;

      // If we have a category name, try to filter to matching unit
      // The category name often corresponds to a unit title
      if (catName && data && data.length > 0) {
        const catNameLower = catName.toLowerCase();
        const filtered = data.filter(
          (r: Record<string, unknown>) =>
            (r.unit_title as string)?.toLowerCase().includes(catNameLower) ||
            catNameLower.includes((r.unit_title as string)?.toLowerCase() ?? '')
        );
        if (filtered.length > 0) return filtered;
      }

      return data || [];
    },
    enabled: !!qualCode,
  });

  // 4. Fetch coverage matrix for this student + category
  const { data: coverageMatrix } = useQuery({
    queryKey: ['submission-criteria-coverage', studentId, categoryId, qualificationId],
    queryFn: async () => {
      if (!studentId || !categoryId || !qualificationId) return null;
      const { data, error } = await supabase
        .from('unit_coverage_matrix')
        .select('*')
        .eq('user_id', studentId)
        .eq('category_id', categoryId)
        .eq('qualification_id', qualificationId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!studentId && !!categoryId && !!qualificationId,
  });

  // 5. Fetch the student's portfolio items for this category to count evidence linkage
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ['submission-criteria-items', studentId, categoryId],
    queryFn: async () => {
      if (!studentId || !categoryId) return [];
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('id, title, assessment_criteria_met, learning_outcomes_met')
        .eq('user_id', studentId)
        .eq('category', categoryId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId && !!categoryId,
  });

  // 6. Fetch verified criteria from coverage matrix metadata
  //    We store assessor-verified ACs as a JSONB array in the coverage matrix
  const verifiedACs: string[] = useMemo(() => {
    if (!coverageMatrix) return [];
    // verified_criteria_refs is our JSONB storage for assessor-verified AC refs
    const refs = (coverageMatrix as Record<string, unknown>).verified_criteria_refs;
    if (Array.isArray(refs)) return refs;
    return [];
  }, [coverageMatrix]);

  // ── Build the checklist data ─────────────────────────────────

  const checklistData = useMemo((): CriteriaChecklistData => {
    // If we have normalised requirements from qualification_requirements
    if (requirements.length > 0) {
      return buildFromRequirements(requirements, portfolioItems, verifiedACs);
    }

    // Fallback: use the JSONB arrays on qualification_categories
    if (category) {
      return buildFromCategory(category, portfolioItems, verifiedACs);
    }

    return emptyChecklist();
  }, [requirements, category, portfolioItems, verifiedACs]);

  // ── Mutation: toggle an AC as verified/unverified ────────────

  const toggleCriterion = useMutation({
    mutationFn: async ({ acRef, verified }: { acRef: string; verified: boolean }) => {
      if (!studentId || !categoryId || !qualificationId) {
        throw new Error('Missing required IDs');
      }

      // Update local verified list
      let newRefs: string[];
      if (verified) {
        newRefs = [...new Set([...verifiedACs, acRef])];
      } else {
        newRefs = verifiedACs.filter((r) => r !== acRef);
      }

      const verifiedCount = newRefs.length;
      const totalCount = checklistData.totalCriteria;
      const completionPct = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;

      // Upsert coverage matrix
      const { data: existing } = await supabase
        .from('unit_coverage_matrix')
        .select('id')
        .eq('user_id', studentId)
        .eq('category_id', categoryId)
        .eq('qualification_id', qualificationId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('unit_coverage_matrix')
          .update({
            verified_criteria: verifiedCount,
            total_criteria: totalCount,
            completion_percentage: completionPct,
            last_updated: new Date().toISOString(),
            status: completionPct >= 100 ? 'complete' : 'in_progress',
          })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('unit_coverage_matrix').insert({
          user_id: studentId,
          category_id: categoryId,
          qualification_id: qualificationId,
          verified_criteria: verifiedCount,
          total_criteria: totalCount,
          evidenced_criteria: checklistData.evidencedCriteria,
          completion_percentage: completionPct,
          required_entries: 0,
          completed_entries: 0,
          status: completionPct >= 100 ? 'complete' : 'in_progress',
          started_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submission-criteria-coverage', studentId, categoryId, qualificationId],
      });
      queryClient.invalidateQueries({ queryKey: ['student-portfolio-detail'] });
      queryClient.invalidateQueries({ queryKey: ['college-portfolios'] });
    },
  });

  const isLoading = !category && !!categoryId;

  return {
    checklistData,
    coverageMatrix,
    isLoading,
    toggleCriterion,
    verifiedACs,
  };
}

// ── Helpers ────────────────────────────────────────────────────

function emptyChecklist(): CriteriaChecklistData {
  return {
    learningOutcomes: [],
    totalCriteria: 0,
    verifiedCriteria: 0,
    evidencedCriteria: 0,
    completionPercentage: 0,
    hasGaps: false,
    gapCriteria: [],
  };
}

function buildFromRequirements(
  requirements: Record<string, unknown>[],
  portfolioItems: Record<string, unknown>[],
  verifiedACs: string[]
): CriteriaChecklistData {
  const loMap = new Map<string, LearningOutcomeGroup>();
  const allCriteria: CriterionItem[] = [];

  for (const req of requirements) {
    const loKey = `${req.lo_number ?? '0'}`;
    if (!loMap.has(loKey)) {
      loMap.set(loKey, {
        loNumber: String(req.lo_number ?? ''),
        loText: req.lo_text || '',
        criteria: [],
      });
    }

    const lo = loMap.get(loKey)!;
    const acRef = req.ac_code;
    const acFullRef = `${req.unit_code}.${req.ac_code}`;

    // Count how many portfolio items reference this AC
    const linkedItems = portfolioItems.filter((item) => {
      const acMet: string[] = item.assessment_criteria_met || [];
      return acMet.some((ac: string) => ac === acRef || ac === acFullRef || ac.includes(acRef));
    });

    const criterion: CriterionItem = {
      acRef,
      acFullRef,
      acText: req.ac_text || '',
      verified: verifiedACs.includes(acRef) || verifiedACs.includes(acFullRef),
      evidenceCount: linkedItems.length,
      linkedItemIds: linkedItems.map((i) => i.id),
    };

    lo.criteria.push(criterion);
    allCriteria.push(criterion);
  }

  const totalCriteria = allCriteria.length;
  const verifiedCriteria = allCriteria.filter((c) => c.verified).length;
  const evidencedCriteria = allCriteria.filter((c) => c.evidenceCount > 0).length;
  const gapCriteria = allCriteria.filter((c) => c.evidenceCount === 0 && !c.verified);

  return {
    learningOutcomes: Array.from(loMap.values()),
    totalCriteria,
    verifiedCriteria,
    evidencedCriteria,
    completionPercentage:
      totalCriteria > 0 ? Math.round((verifiedCriteria / totalCriteria) * 100) : 0,
    hasGaps: gapCriteria.length > 0,
    gapCriteria,
  };
}

function buildFromCategory(
  category: Record<string, unknown>,
  portfolioItems: Record<string, unknown>[],
  verifiedACs: string[]
): CriteriaChecklistData {
  const los: string[] = category.learning_outcomes || [];
  const acs: string[] = category.assessment_criteria || [];

  if (acs.length === 0) return emptyChecklist();

  // Group ACs by their LO prefix (e.g. "1.1" → LO "1")
  const loMap = new Map<string, LearningOutcomeGroup>();
  const allCriteria: CriterionItem[] = [];

  for (const ac of acs) {
    const loPrefix = ac.split('.')[0] || '1';
    if (!loMap.has(loPrefix)) {
      const loText =
        los.find((lo) => lo.startsWith(loPrefix + '.') || lo.startsWith(loPrefix + ' ')) ||
        `Learning Outcome ${loPrefix}`;
      loMap.set(loPrefix, {
        loNumber: loPrefix,
        loText,
        criteria: [],
      });
    }

    const lo = loMap.get(loPrefix)!;
    const linkedItems = portfolioItems.filter((item) => {
      const acMet: string[] = item.assessment_criteria_met || [];
      return acMet.includes(ac);
    });

    const criterion: CriterionItem = {
      acRef: ac,
      acFullRef: ac,
      acText: ac,
      verified: verifiedACs.includes(ac),
      evidenceCount: linkedItems.length,
      linkedItemIds: linkedItems.map((i) => i.id),
    };

    lo.criteria.push(criterion);
    allCriteria.push(criterion);
  }

  const totalCriteria = allCriteria.length;
  const verifiedCriteria = allCriteria.filter((c) => c.verified).length;
  const evidencedCriteria = allCriteria.filter((c) => c.evidenceCount > 0).length;
  const gapCriteria = allCriteria.filter((c) => c.evidenceCount === 0 && !c.verified);

  return {
    learningOutcomes: Array.from(loMap.values()),
    totalCriteria,
    verifiedCriteria,
    evidencedCriteria,
    completionPercentage:
      totalCriteria > 0 ? Math.round((verifiedCriteria / totalCriteria) * 100) : 0,
    hasGaps: gapCriteria.length > 0,
    gapCriteria,
  };
}

export default useSubmissionCriteria;
