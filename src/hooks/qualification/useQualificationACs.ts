/**
 * useQualificationACs
 *
 * Loads the full Unit → LO → AC tree from qualification_requirements
 * for a given requirement code. Used by the AC picker, KSB assistant,
 * and overview to replace all hardcoded assessment criteria.
 */

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AssessmentCriterion {
  /** e.g. "2.3" */
  acRef: string;
  /** e.g. "301.2.3" */
  acFullRef: string;
  /** Full text, e.g. "2.3 Describe the types of..." */
  acText: string;
}

export interface LearningOutcome {
  loNumber: string;
  loText: string;
  assessmentCriteria: AssessmentCriterion[];
}

export interface QualificationUnit {
  unitCode: string;
  unitTitle: string;
  learningOutcomes: LearningOutcome[];
}

export interface QualificationACTree {
  units: QualificationUnit[];
  totalACs: number;
}

interface RawRequirement {
  unit_code: string;
  unit_title: string;
  lo_number: number | null;
  lo_text: string;
  ac_code: string;
  ac_text: string;
}

export function useQualificationACs(requirementCode: string | null) {
  const [rawData, setRawData] = useState<RawRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!requirementCode) {
      setRawData([]);
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: queryError } = await supabase
          .from('qualification_requirements')
          .select('unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
          .eq('qualification_code', requirementCode!)
          .order('unit_code', { ascending: true })
          .order('lo_number', { ascending: true })
          .order('ac_code', { ascending: true });

        if (queryError) throw queryError;
        if (!cancelled) {
          setRawData((data as RawRequirement[]) || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load ACs');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [requirementCode]);

  const tree = useMemo((): QualificationACTree => {
    const unitMap = new Map<string, QualificationUnit>();
    const loMap = new Map<string, LearningOutcome>();
    let totalACs = 0;

    for (const req of rawData) {
      if (!unitMap.has(req.unit_code)) {
        unitMap.set(req.unit_code, {
          unitCode: req.unit_code,
          unitTitle: req.unit_title,
          learningOutcomes: [],
        });
      }

      const unit = unitMap.get(req.unit_code)!;
      const loKey = `${req.unit_code}-${req.lo_number ?? '0'}`;

      if (!loMap.has(loKey)) {
        const lo: LearningOutcome = {
          loNumber: String(req.lo_number ?? ''),
          loText: req.lo_text,
          assessmentCriteria: [],
        };
        loMap.set(loKey, lo);
        unit.learningOutcomes.push(lo);
      }

      const lo = loMap.get(loKey)!;
      totalACs++;
      lo.assessmentCriteria.push({
        acRef: req.ac_code,
        acFullRef: `${req.unit_code}.${req.ac_code}`,
        acText: `${req.ac_code} ${req.ac_text}`,
      });
    }

    return {
      units: Array.from(unitMap.values()),
      totalACs,
    };
  }, [rawData]);

  return { tree, isLoading, error };
}
