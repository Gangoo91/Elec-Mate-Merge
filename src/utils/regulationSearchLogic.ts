
import { RegulationData, REGULATIONS_DATABASE } from './regulationDatabase';

export interface SearchFilters {
  searchTerm: string;
  filterPart: string;
  filterDifficulty: string;
  filterCategory: string;
  filterFrequency: string;
}

// Enhanced search function with multiple filters and better relevance scoring
export const searchRegulations = (filters: SearchFilters): RegulationData[] => {
  const { searchTerm, filterPart, filterDifficulty, filterCategory, filterFrequency } = filters;
  
  let filteredRegulations = REGULATIONS_DATABASE;

  // Apply filters
  if (filterPart !== 'all') {
    filteredRegulations = filteredRegulations.filter(reg => reg.part.toString() === filterPart);
  }

  if (filterDifficulty !== 'all') {
    filteredRegulations = filteredRegulations.filter(reg => reg.difficulty === filterDifficulty);
  }

  if (filterCategory !== 'all') {
    filteredRegulations = filteredRegulations.filter(reg => reg.category === filterCategory);
  }

  if (filterFrequency !== 'all') {
    filteredRegulations = filteredRegulations.filter(reg => reg.frequency === filterFrequency);
  }

  // Apply search term if provided
  if (searchTerm.trim()) {
    const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const searchResults = filteredRegulations.map(reg => {
      let relevanceScore = 0;
      const searchableText = [
        reg.number,
        reg.title,
        reg.section,
        reg.content,
        ...reg.keywords,
        ...reg.relatedRegs,
        reg.apprenticeNote || '',
        reg.testMethod || '',
        reg.safetyTip || ''
      ].join(' ').toLowerCase();

      searchTerms.forEach(term => {
        // Exact regulation number match (highest priority)
        if (reg.number.toLowerCase() === term) {
          relevanceScore += 100;
        }
        // Regulation number contains term
        else if (reg.number.toLowerCase().includes(term)) {
          relevanceScore += 50;
        }
        // Title contains term (high priority)
        else if (reg.title.toLowerCase().includes(term)) {
          relevanceScore += 25;
        }
        // Keyword match (medium-high priority)
        else if (reg.keywords.some(keyword => keyword.toLowerCase().includes(term))) {
          relevanceScore += 15;
        }
        // Content match (medium priority)
        else if (reg.content.toLowerCase().includes(term)) {
          relevanceScore += 10;
        }
        // Related regulation match
        else if (reg.relatedRegs.some(relReg => relReg.toLowerCase().includes(term))) {
          relevanceScore += 8;
        }
        // Section match
        else if (reg.section.toLowerCase().includes(term)) {
          relevanceScore += 5;
        }
        // Any other text match (low priority)
        else if (searchableText.includes(term)) {
          relevanceScore += 2;
        }
      });

      return { ...reg, relevanceScore };
    }).filter(reg => reg.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return searchResults;
  }

  // Sort by frequency and difficulty if no search term
  return filteredRegulations.sort((a, b) => {
    const frequencyOrder = { common: 3, frequent: 2, occasional: 1 };
    const difficultyOrder = { beginner: 3, intermediate: 2, advanced: 1 };
    
    const aFreq = frequencyOrder[a.frequency];
    const bFreq = frequencyOrder[b.frequency];
    
    if (aFreq !== bFreq) return bFreq - aFreq;
    
    const aDiff = difficultyOrder[a.difficulty];
    const bDiff = difficultyOrder[b.difficulty];
    
    return bDiff - aDiff;
  });
};

// Get search suggestions based on current database
export const getSearchSuggestions = (): string[] => {
  const suggestions = [
    // Common search terms
    'RCD requirements', 'Zs values', 'Testing sequence', 'Bathroom zones',
    'Socket outlets', 'Cable protection', 'Insulation resistance', 'Earth fault loop',
    'MCB ratings', 'IP ratings', 'Ring circuits', 'SELV systems',
    
    // Regulation numbers (most common)
    '612.1', '612.2.1', '612.3.1', '612.8', '411.3.3', '415.1.1',
    'Table 41.3', '701.411.3.3', '522.6.204',
    
    // By category
    'testing regulations', 'protection devices', 'special locations',
    'earthing requirements', 'cable installation', 'switching'
  ];
  
  return suggestions;
};

// Get statistics about the database
export const getDatabaseStats = () => {
  const stats = {
    total: REGULATIONS_DATABASE.length,
    byPart: {} as Record<number, number>,
    byDifficulty: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    byFrequency: {} as Record<string, number>
  };

  REGULATIONS_DATABASE.forEach(reg => {
    // By part
    stats.byPart[reg.part] = (stats.byPart[reg.part] || 0) + 1;
    
    // By difficulty
    stats.byDifficulty[reg.difficulty] = (stats.byDifficulty[reg.difficulty] || 0) + 1;
    
    // By category
    stats.byCategory[reg.category] = (stats.byCategory[reg.category] || 0) + 1;
    
    // By frequency
    stats.byFrequency[reg.frequency] = (stats.byFrequency[reg.frequency] || 0) + 1;
  });

  return stats;
};
