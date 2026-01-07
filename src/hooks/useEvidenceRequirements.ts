/**
 * useEvidenceRequirements
 *
 * Hook for fetching and managing evidence requirements
 * for qualification units.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  EvidenceType,
  UnitEvidenceRequirement,
  EvidenceRequirementWithTypes,
  EvidenceTypeCode,
  UnitEvidenceProgress,
} from '@/types/evidence';

interface UseEvidenceRequirementsOptions {
  categoryId?: string;
}

export function useEvidenceRequirements(options: UseEvidenceRequirementsOptions = {}) {
  const { categoryId } = options;

  const [evidenceTypes, setEvidenceTypes] = useState<EvidenceType[]>([]);
  const [requirements, setRequirements] = useState<UnitEvidenceRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all evidence types
  const fetchEvidenceTypes = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('evidence_types')
        .select('*')
        .order('sort_order');

      if (fetchError) throw fetchError;
      return (data || []) as EvidenceType[];
    } catch (err) {
      console.error('Error fetching evidence types:', err);
      return [];
    }
  }, []);

  // Fetch requirements for a specific category
  const fetchRequirements = useCallback(async (catId?: string) => {
    const targetCatId = catId || categoryId;
    if (!targetCatId) return [];

    try {
      const { data, error: fetchError } = await supabase
        .from('unit_evidence_requirements')
        .select('*')
        .eq('category_id', targetCatId)
        .order('assessment_criterion');

      if (fetchError) throw fetchError;
      return (data || []) as UnitEvidenceRequirement[];
    } catch (err) {
      console.error('Error fetching evidence requirements:', err);
      return [];
    }
  }, [categoryId]);

  // Load data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [types, reqs] = await Promise.all([
        fetchEvidenceTypes(),
        fetchRequirements(),
      ]);

      setEvidenceTypes(types);
      setRequirements(reqs);
    } catch (err) {
      setError('Failed to load evidence requirements');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvidenceTypes, fetchRequirements]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get evidence type by code
  const getEvidenceType = useCallback(
    (code: EvidenceTypeCode): EvidenceType | undefined => {
      return evidenceTypes.find((t) => t.code === code);
    },
    [evidenceTypes]
  );

  // Get requirements with resolved types
  const requirementsWithTypes = useMemo((): EvidenceRequirementWithTypes[] => {
    return requirements.map((req) => ({
      ...req,
      evidence_types: req.evidence_type_codes
        .map((code) => getEvidenceType(code))
        .filter(Boolean) as EvidenceType[],
    }));
  }, [requirements, getEvidenceType]);

  // Get unique evidence types needed for this unit
  const requiredEvidenceTypes = useMemo((): EvidenceType[] => {
    const uniqueCodes = new Set<EvidenceTypeCode>();
    requirements.forEach((req) => {
      req.evidence_type_codes.forEach((code) => uniqueCodes.add(code));
    });
    return Array.from(uniqueCodes)
      .map((code) => getEvidenceType(code))
      .filter(Boolean) as EvidenceType[];
  }, [requirements, getEvidenceType]);

  // Get mandatory requirements
  const mandatoryRequirements = useMemo(() => {
    return requirements.filter((r) => r.is_mandatory);
  }, [requirements]);

  // Get optional requirements
  const optionalRequirements = useMemo(() => {
    return requirements.filter((r) => !r.is_mandatory);
  }, [requirements]);

  // Calculate total evidence items needed
  const totalEvidenceNeeded = useMemo(() => {
    return requirements.reduce((sum, req) => sum + req.quantity_required, 0);
  }, [requirements]);

  // Group requirements by assessment criterion prefix (e.g., "1.x", "2.x")
  const requirementsBySection = useMemo(() => {
    const sections: Record<string, UnitEvidenceRequirement[]> = {};
    requirements.forEach((req) => {
      const section = req.assessment_criterion.split('.')[0];
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(req);
    });
    return sections;
  }, [requirements]);

  return {
    // Data
    evidenceTypes,
    requirements,
    requirementsWithTypes,
    requiredEvidenceTypes,
    mandatoryRequirements,
    optionalRequirements,
    requirementsBySection,
    isLoading,
    error,

    // Stats
    totalEvidenceNeeded,
    totalRequirements: requirements.length,
    mandatoryCount: mandatoryRequirements.length,

    // Helpers
    getEvidenceType,
    refetch: loadData,
  };
}

/**
 * Hook to fetch evidence types only (no category needed)
 */
export function useEvidenceTypes() {
  const [evidenceTypes, setEvidenceTypes] = useState<EvidenceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('evidence_types')
          .select('*')
          .order('sort_order');

        if (error) throw error;
        setEvidenceTypes((data || []) as EvidenceType[]);
      } catch (err) {
        console.error('Error fetching evidence types:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const getByCode = useCallback(
    (code: EvidenceTypeCode): EvidenceType | undefined => {
      return evidenceTypes.find((t) => t.code === code);
    },
    [evidenceTypes]
  );

  return {
    evidenceTypes,
    isLoading,
    getByCode,
  };
}

export default useEvidenceRequirements;
