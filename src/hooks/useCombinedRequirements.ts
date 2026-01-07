/**
 * useCombinedRequirements
 *
 * Hook that combines unit-level evidence requirements with tutor-assigned
 * custom requirements, providing a unified view for apprentices.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEvidenceRequirements } from './useEvidenceRequirements';
import { useStudentRequirements } from './useTutorRequirements';
import type {
  CombinedEvidenceRequirement,
  EvidenceType,
  EvidenceTypeCode,
  EvidenceTypeSummary,
} from '@/types/evidence';

interface UseCombinedRequirementsOptions {
  categoryId?: string;
  uploadedEvidenceTypes?: EvidenceTypeCode[];
}

interface PortfolioEvidence {
  requirement_id: string | null;
  evidence_type: EvidenceTypeCode;
  count: number;
}

export function useCombinedRequirements(options: UseCombinedRequirementsOptions = {}) {
  const { categoryId, uploadedEvidenceTypes = [] } = options;
  const { user } = useAuth();

  // Get unit requirements
  const {
    requirements: unitRequirements,
    evidenceTypes,
    isLoading: unitLoading,
    getEvidenceType,
  } = useEvidenceRequirements({ categoryId });

  // Get tutor-assigned requirements
  const { requirements: tutorRequirements, isLoading: tutorLoading } =
    useStudentRequirements(categoryId);

  // Track uploaded evidence counts
  const [evidenceCounts, setEvidenceCounts] = useState<Map<string, number>>(new Map());
  const [isLoadingEvidence, setIsLoadingEvidence] = useState(false);

  // Fetch evidence counts for this category
  const fetchEvidenceCounts = useCallback(async () => {
    if (!user || !categoryId) return;

    setIsLoadingEvidence(true);
    try {
      // Get count of portfolio items by evidence type for this category
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('evidence_type')
        .eq('user_id', user.id)
        .eq('category_id', categoryId);

      if (error) throw error;

      // Count by evidence type
      const counts = new Map<string, number>();
      (data || []).forEach((item: { evidence_type: string }) => {
        if (item.evidence_type) {
          counts.set(item.evidence_type, (counts.get(item.evidence_type) || 0) + 1);
        }
      });
      setEvidenceCounts(counts);
    } catch (err) {
      console.error('Error fetching evidence counts:', err);
    } finally {
      setIsLoadingEvidence(false);
    }
  }, [user, categoryId]);

  useEffect(() => {
    fetchEvidenceCounts();
  }, [fetchEvidenceCounts]);

  // Combine and transform requirements
  const combinedRequirements = useMemo((): CombinedEvidenceRequirement[] => {
    const combined: CombinedEvidenceRequirement[] = [];

    // Add unit requirements
    unitRequirements.forEach((req) => {
      const types = req.evidence_type_codes
        .map((code) => getEvidenceType(code))
        .filter(Boolean) as EvidenceType[];

      // Calculate uploaded count for this requirement
      let uploaded = 0;
      req.evidence_type_codes.forEach((code) => {
        uploaded += evidenceCounts.get(code) || 0;
      });

      combined.push({
        id: req.id,
        source: 'unit',
        title: null,
        assessment_criterion: req.assessment_criterion,
        assessment_criterion_text: req.assessment_criterion_text,
        evidence_type_codes: req.evidence_type_codes,
        evidence_types: types,
        quantity_required: req.quantity_required,
        quantity_uploaded: uploaded,
        is_mandatory: req.is_mandatory,
        is_complete: uploaded >= req.quantity_required,
        guidance: req.guidance,
        due_date: null,
      });
    });

    // Add tutor requirements
    tutorRequirements.forEach((req) => {
      const types = req.evidence_type_codes
        .map((code) => getEvidenceType(code as EvidenceTypeCode))
        .filter(Boolean) as EvidenceType[];

      // Calculate uploaded count for this requirement
      let uploaded = 0;
      req.evidence_type_codes.forEach((code) => {
        uploaded += evidenceCounts.get(code) || 0;
      });

      combined.push({
        id: req.id,
        source: 'tutor',
        title: req.title,
        assessment_criterion: null,
        assessment_criterion_text: req.description,
        evidence_type_codes: req.evidence_type_codes,
        evidence_types: types,
        quantity_required: req.quantity_required,
        quantity_uploaded: uploaded,
        is_mandatory: req.is_mandatory,
        is_complete: uploaded >= req.quantity_required,
        guidance: req.guidance,
        due_date: req.due_date,
      });
    });

    // Sort: mandatory first, then by completion status, then by due date
    return combined.sort((a, b) => {
      // Mandatory first
      if (a.is_mandatory !== b.is_mandatory) {
        return a.is_mandatory ? -1 : 1;
      }
      // Incomplete first
      if (a.is_complete !== b.is_complete) {
        return a.is_complete ? 1 : -1;
      }
      // Due date (earliest first, null last)
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return 0;
    });
  }, [unitRequirements, tutorRequirements, evidenceCounts, getEvidenceType]);

  // Separate mandatory and optional
  const mandatoryRequirements = useMemo(
    () => combinedRequirements.filter((r) => r.is_mandatory),
    [combinedRequirements]
  );

  const optionalRequirements = useMemo(
    () => combinedRequirements.filter((r) => !r.is_mandatory),
    [combinedRequirements]
  );

  // Calculate progress
  const progress = useMemo(() => {
    const total = combinedRequirements.length;
    const completed = combinedRequirements.filter((r) => r.is_complete).length;
    const mandatoryTotal = mandatoryRequirements.length;
    const mandatoryCompleted = mandatoryRequirements.filter((r) => r.is_complete).length;

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      mandatoryTotal,
      mandatoryCompleted,
      mandatoryPercentage:
        mandatoryTotal > 0 ? Math.round((mandatoryCompleted / mandatoryTotal) * 100) : 100,
      allMandatoryComplete: mandatoryCompleted === mandatoryTotal,
    };
  }, [combinedRequirements, mandatoryRequirements]);

  // Get evidence type summary (for overview display)
  const evidenceTypeSummary = useMemo((): EvidenceTypeSummary[] => {
    const typeMap = new Map<
      EvidenceTypeCode,
      { required: number; submitted: number; verified: number }
    >();

    // Sum up requirements by evidence type
    combinedRequirements.forEach((req) => {
      req.evidence_type_codes.forEach((code) => {
        const existing = typeMap.get(code) || { required: 0, submitted: 0, verified: 0 };
        existing.required += req.quantity_required;
        typeMap.set(code, existing);
      });
    });

    // Add uploaded counts
    evidenceCounts.forEach((count, code) => {
      const existing = typeMap.get(code as EvidenceTypeCode);
      if (existing) {
        existing.submitted = count;
      }
    });

    // Convert to array with type info
    return Array.from(typeMap.entries())
      .map(([code, counts]) => {
        const type = getEvidenceType(code);
        if (!type) return null;
        return {
          code,
          name: type.name,
          icon: type.icon,
          color: type.color,
          required_count: counts.required,
          submitted_count: counts.submitted,
          verified_count: counts.verified,
        };
      })
      .filter(Boolean) as EvidenceTypeSummary[];
  }, [combinedRequirements, evidenceCounts, getEvidenceType]);

  // Get requirements that need specific evidence type
  const getRequirementsForType = useCallback(
    (typeCode: EvidenceTypeCode) => {
      return combinedRequirements.filter((r) =>
        r.evidence_type_codes.includes(typeCode)
      );
    },
    [combinedRequirements]
  );

  // Check if a specific evidence type is still needed
  const isEvidenceTypeNeeded = useCallback(
    (typeCode: EvidenceTypeCode): boolean => {
      const reqs = getRequirementsForType(typeCode);
      return reqs.some((r) => !r.is_complete);
    },
    [getRequirementsForType]
  );

  // Get requirements with upcoming due dates
  const upcomingDueRequirements = useMemo(() => {
    const now = new Date();
    const inWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return combinedRequirements.filter((r) => {
      if (!r.due_date || r.is_complete) return false;
      const due = new Date(r.due_date);
      return due >= now && due <= inWeek;
    });
  }, [combinedRequirements]);

  // Get overdue requirements
  const overdueRequirements = useMemo(() => {
    const now = new Date();

    return combinedRequirements.filter((r) => {
      if (!r.due_date || r.is_complete) return false;
      return new Date(r.due_date) < now;
    });
  }, [combinedRequirements]);

  return {
    // Data
    requirements: combinedRequirements,
    mandatoryRequirements,
    optionalRequirements,
    evidenceTypes,
    evidenceTypeSummary,
    isLoading: unitLoading || tutorLoading || isLoadingEvidence,

    // Progress
    progress,

    // Filtered views
    upcomingDueRequirements,
    overdueRequirements,

    // Helpers
    getRequirementsForType,
    isEvidenceTypeNeeded,
    getEvidenceType,

    // Refetch
    refetch: fetchEvidenceCounts,
  };
}

export default useCombinedRequirements;
