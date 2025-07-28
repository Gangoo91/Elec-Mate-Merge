import { PortfolioCategory, PortfolioGroup } from '@/types/portfolio';

export interface GroupingConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  competencyLevel: 'foundation' | 'intermediate' | 'advanced';
  keywords: string[];
}

// Define smart grouping configurations based on electrical apprenticeship requirements
export const groupingConfigs: GroupingConfig[] = [
  {
    id: 'safety-compliance',
    name: 'Safety & Compliance',
    description: 'Health, safety procedures, risk assessments, and regulatory compliance',
    icon: 'shield',
    color: 'green',
    competencyLevel: 'foundation',
    keywords: ['health', 'safety', 'risk', 'assessment', 'compliance', 'regulation', 'bs7671', 'wiring', 'code', 'standard', 'procedure']
  },
  {
    id: 'electrical-theory',
    name: 'Electrical Theory & Fundamentals',
    description: 'Core electrical principles, circuit theory, and fundamental concepts',
    icon: 'zap',
    color: 'yellow',
    competencyLevel: 'foundation',
    keywords: ['theory', 'circuit', 'electrical', 'principle', 'fundamental', 'basic', 'concept', 'ohm', 'voltage', 'current', 'resistance']
  },
  {
    id: 'installation-practical',
    name: 'Installation & Practical Skills',
    description: 'Hands-on installation work, wiring, and practical electrical tasks',
    icon: 'wrench',
    color: 'blue',
    competencyLevel: 'intermediate',
    keywords: ['installation', 'practical', 'wiring', 'cable', 'conduit', 'fitting', 'socket', 'switch', 'panel', 'distribution', 'board']
  },
  {
    id: 'testing-commissioning',
    name: 'Testing & Commissioning',
    description: 'Electrical testing, inspection, certification, and commissioning procedures',
    icon: 'search',
    color: 'purple',
    competencyLevel: 'intermediate',
    keywords: ['testing', 'inspection', 'commissioning', 'certificate', 'measurement', 'instrument', 'multimeter', 'earth', 'insulation', 'continuity']
  },
  {
    id: 'maintenance-troubleshooting',
    name: 'Maintenance & Troubleshooting',
    description: 'Fault finding, repair work, and preventive maintenance activities',
    icon: 'settings',
    color: 'orange',
    competencyLevel: 'intermediate',
    keywords: ['maintenance', 'repair', 'fault', 'troubleshoot', 'diagnostic', 'fix', 'problem', 'issue', 'breakdown', 'preventive']
  },
  {
    id: 'advanced-systems',
    name: 'Advanced Systems & Technology',
    description: 'Complex electrical systems, automation, and emerging technologies',
    icon: 'cpu',
    color: 'red',
    competencyLevel: 'advanced',
    keywords: ['advanced', 'complex', 'automation', 'smart', 'technology', 'system', 'plc', 'control', 'motor', 'industrial']
  },
  {
    id: 'professional-skills',
    name: 'Professional Skills & Development',
    description: 'Communication, customer service, teamwork, and professional development',
    icon: 'users',
    color: 'indigo',
    competencyLevel: 'foundation',
    keywords: ['professional', 'communication', 'customer', 'service', 'team', 'development', 'learning', 'skill', 'soft', 'interpersonal']
  },
  {
    id: 'business-commercial',
    name: 'Business & Commercial Awareness',
    description: 'Commercial understanding, quotations, project management, and business skills',
    icon: 'briefcase',
    color: 'emerald',
    competencyLevel: 'advanced',
    keywords: ['business', 'commercial', 'quote', 'estimate', 'project', 'management', 'cost', 'time', 'planning', 'finance']
  }
];

/**
 * Determine which group a category belongs to based on name and description analysis
 */
export const categorizeByKeywords = (category: PortfolioCategory): string => {
  const text = `${category.name} ${category.description || ''}`.toLowerCase();
  
  // Score each group based on keyword matches
  const scores = groupingConfigs.map(config => {
    const keywordMatches = config.keywords.filter(keyword => 
      text.includes(keyword.toLowerCase())
    ).length;
    
    return {
      groupId: config.id,
      score: keywordMatches,
      config
    };
  });
  
  // Find the group with the highest score
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  // If no keywords match, categorize as professional skills (general fallback)
  return bestMatch.score > 0 ? bestMatch.groupId : 'professional-skills';
};

/**
 * Create portfolio groups from categories using smart grouping logic
 */
export const createPortfolioGroups = (
  categories: PortfolioCategory[],
  entries: any[]
): PortfolioGroup[] => {
  // Group categories by their assigned group
  const categoryGroups: { [key: string]: PortfolioCategory[] } = {};
  
  categories.forEach(category => {
    const groupId = categorizeByKeywords(category);
    if (!categoryGroups[groupId]) {
      categoryGroups[groupId] = [];
    }
    categoryGroups[groupId].push(category);
  });
  
  // Create portfolio groups
  return Object.entries(categoryGroups).map(([groupId, groupCategories]) => {
    const config = groupingConfigs.find(c => c.id === groupId) || groupingConfigs[6]; // fallback to professional skills
    
    const totalRequired = groupCategories.reduce((sum, cat) => sum + cat.requiredEntries, 0);
    const totalCompleted = groupCategories.reduce((sum, cat) => {
      const completedEntries = entries.filter(e => 
        e.category?.id === cat.id && e.status === 'completed'
      ).length;
      return sum + completedEntries;
    }, 0);
    
    return {
      id: groupId,
      name: config.name,
      description: config.description,
      icon: config.icon,
      color: config.color,
      categories: groupCategories,
      totalRequired,
      totalCompleted,
      progressPercentage: totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0,
      competencyLevel: config.competencyLevel
    };
  }).sort((a, b) => {
    // Sort by competency level first, then by name
    const levelOrder = { foundation: 1, intermediate: 2, advanced: 3 };
    const levelDiff = levelOrder[a.competencyLevel] - levelOrder[b.competencyLevel];
    return levelDiff !== 0 ? levelDiff : a.name.localeCompare(b.name);
  });
};

/**
 * Get entries by group ID
 */
export const getEntriesByGroup = (
  groupId: string,
  categories: PortfolioCategory[],
  entries: any[]
) => {
  const groupCategoryIds = categories
    .filter(cat => categorizeByKeywords(cat) === groupId)
    .map(cat => cat.id);
  
  return entries.filter(entry => 
    entry.category && groupCategoryIds.includes(entry.category.id)
  );
};

/**
 * Get categories by competency level
 */
export const getCategoriesByCompetencyLevel = (
  level: 'foundation' | 'intermediate' | 'advanced',
  categories: PortfolioCategory[]
): PortfolioCategory[] => {
  return categories.filter(category => {
    const groupId = categorizeByKeywords(category);
    const config = groupingConfigs.find(c => c.id === groupId);
    return config?.competencyLevel === level;
  });
};