import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { hazardDatabase } from '@/data/enhanced-hazard-database';
import { getRiskLevel } from '@/utils/risk-level-helpers';

export const useHazardFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('all');
  const [riskScoreFilter, setRiskScoreFilter] = useState<{ min: number; max: number } | null>(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Debounce search for performance
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Calculate statistics
  const stats = useMemo(() => {
    const allHazards = hazardDatabase.flatMap(cat => cat.hazards);
    const totalControls = allHazards.reduce((sum, h) => {
      const measures = h.controlMeasures || {};
      return sum + 
        (measures.elimination?.length || 0) +
        (measures.substitution?.length || 0) +
        (measures.engineering?.length || 0) +
        (measures.administrative?.length || 0) +
        (measures.ppe?.length || 0);
    }, 0);

    const riskCounts = allHazards.reduce((acc, h) => {
      const score = h.likelihood * h.severity;
      if (score >= 15) acc.veryHigh++;
      else if (score >= 12) acc.high++;
      else if (score >= 6) acc.medium++;
      else acc.low++;
      return acc;
    }, { veryHigh: 0, high: 0, medium: 0, low: 0 });

    const categoryBreakdown = hazardDatabase.map(cat => ({
      category: cat.category,
      count: cat.hazards.length,
      color: cat.color || 'bg-elec-gray/20 text-foreground border-border/30'
    }));

    return {
      totalHazards: allHazards.length,
      ...riskCounts,
      totalControls,
      categoryBreakdown
    };
  }, []);

  // Filtered hazards with memoization
  const getFilteredHazards = useCallback((bookmarkedIds?: Set<string>) => {
    return hazardDatabase.flatMap(category => {
      if (selectedCategory !== 'all' && category.category !== selectedCategory) {
        return [];
      }

      return category.hazards.filter(hazard => {
        // Bookmarked filter
        if (showBookmarkedOnly && bookmarkedIds && !bookmarkedIds.has(hazard.id)) {
          return false;
        }

        const riskScore = hazard.likelihood * hazard.severity;
        const riskLevel = getRiskLevel(riskScore);

        // Search filter
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = !debouncedSearch || 
          hazard.hazard.toLowerCase().includes(searchLower) ||
          hazard.consequence?.toLowerCase().includes(searchLower) ||
          hazard.category.toLowerCase().includes(searchLower) ||
          hazard.bs7671References?.some((ref: string) => ref.toLowerCase().includes(searchLower));

        // Risk level filter
        const matchesRiskLevel = selectedRiskLevel === 'all' || riskLevel === selectedRiskLevel;

        // Work type filter
        const matchesWorkType = selectedWorkType === 'all' || 
          hazard.workType?.includes(selectedWorkType);

        // Regulation filter
        const matchesRegulation = selectedRegulation === 'all' ||
          hazard.bs7671References?.includes(selectedRegulation);

        // Risk score filter
        const matchesRiskScore = !riskScoreFilter || 
          (riskScore >= riskScoreFilter.min && riskScore <= riskScoreFilter.max);

        return matchesSearch && matchesRiskLevel && matchesWorkType && matchesRegulation && matchesRiskScore;
      }).map(hazard => ({
        ...hazard,
        category: category.category,
        categoryIcon: category.icon
      }));
    });
  }, [debouncedSearch, selectedCategory, selectedRiskLevel, selectedWorkType, selectedRegulation, riskScoreFilter, showBookmarkedOnly]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRiskLevel('all');
    setSelectedWorkType('all');
    setSelectedRegulation('all');
    setRiskScoreFilter(null);
    setShowBookmarkedOnly(false);
  }, []);

  const hasActiveFilters = 
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedRiskLevel !== 'all' ||
    selectedWorkType !== 'all' ||
    selectedRegulation !== 'all' ||
    riskScoreFilter !== null ||
    showBookmarkedOnly;

  return {
    // State
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedRiskLevel,
    setSelectedRiskLevel,
    selectedWorkType,
    setSelectedWorkType,
    selectedRegulation,
    setSelectedRegulation,
    riskScoreFilter,
    setRiskScoreFilter,
    showBookmarkedOnly,
    setShowBookmarkedOnly,

    // Computed
    stats,
    getFilteredHazards,
    hasActiveFilters,
    clearAllFilters,
  };
};
