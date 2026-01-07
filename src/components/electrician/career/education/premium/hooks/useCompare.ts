/**
 * Hook for managing programme comparison feature
 * Allows comparing up to 3 programmes side-by-side
 */

import { useState, useCallback, useMemo } from "react";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

const MAX_COMPARE_ITEMS = 3;

export interface ComparisonMetric {
  label: string;
  values: (string | number)[];
  type: "progress" | "text";
  max?: number;
  format?: (value: number) => string;
}

export const useCompare = () => {
  const [compareList, setCompareList] = useState<LiveEducationData[]>([]);

  // Check if a programme is in compare list
  const isInCompare = useCallback(
    (programmeId: string): boolean => {
      return compareList.some((p) => p.id === programmeId);
    },
    [compareList]
  );

  // Check if compare list is full
  const isCompareFull = useMemo(
    () => compareList.length >= MAX_COMPARE_ITEMS,
    [compareList]
  );

  // Add programme to compare list
  const addToCompare = useCallback(
    (programme: LiveEducationData): boolean => {
      if (compareList.length >= MAX_COMPARE_ITEMS) {
        return false;
      }
      if (compareList.some((p) => p.id === programme.id)) {
        return false;
      }
      setCompareList((prev) => [...prev, programme]);
      return true;
    },
    [compareList]
  );

  // Remove programme from compare list
  const removeFromCompare = useCallback((programmeId: string): void => {
    setCompareList((prev) => prev.filter((p) => p.id !== programmeId));
  }, []);

  // Toggle programme in compare list
  const toggleCompare = useCallback(
    (programme: LiveEducationData): boolean => {
      if (isInCompare(programme.id)) {
        removeFromCompare(programme.id);
        return false;
      } else {
        return addToCompare(programme);
      }
    },
    [isInCompare, removeFromCompare, addToCompare]
  );

  // Clear all programmes from compare list
  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // Generate comparison metrics
  const comparisonMetrics = useMemo((): ComparisonMetric[] => {
    if (compareList.length < 2) return [];

    return [
      {
        label: "Rating",
        values: compareList.map((p) => p.rating || 0),
        type: "progress",
        max: 5,
        format: (v) => v.toFixed(1),
      },
      {
        label: "Employment Rate",
        values: compareList.map((p) => p.employmentRate || 0),
        type: "progress",
        max: 100,
        format: (v) => `${v}%`,
      },
      {
        label: "Duration",
        values: compareList.map((p) => p.duration),
        type: "text",
      },
      {
        label: "Fees",
        values: compareList.map((p) => p.tuitionFees),
        type: "text",
      },
      {
        label: "Study Mode",
        values: compareList.map((p) => p.studyMode),
        type: "text",
      },
      {
        label: "Location",
        values: compareList.map((p) => p.locations[0] || "Online"),
        type: "text",
      },
      {
        label: "Level",
        values: compareList.map((p) => p.level),
        type: "text",
      },
    ];
  }, [compareList]);

  // Get winner for a metric (highest value)
  const getMetricWinner = useCallback(
    (metricLabel: string): number | null => {
      const metric = comparisonMetrics.find((m) => m.label === metricLabel);
      if (!metric || metric.type !== "progress") return null;

      const numericValues = metric.values as number[];
      const maxValue = Math.max(...numericValues);
      const winnerIndex = numericValues.indexOf(maxValue);

      // Only return winner if there's a clear difference
      const allSame = numericValues.every((v) => v === numericValues[0]);
      if (allSame) return null;

      return winnerIndex;
    },
    [comparisonMetrics]
  );

  return {
    compareList,
    compareCount: compareList.length,
    maxCompareItems: MAX_COMPARE_ITEMS,
    isInCompare,
    isCompareFull,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    comparisonMetrics,
    getMetricWinner,
  };
};

export default useCompare;
