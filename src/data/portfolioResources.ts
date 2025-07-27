export interface PortfolioResource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'checklist' | 'video' | 'standard' | 'assessment';
  category: 'building' | 'evidence' | 'assessment' | 'standards' | 'safety' | 'electrical';
  provider: 'City & Guilds' | 'EAL' | 'JTL' | 'NICEIC' | 'IET' | 'HSE' | 'Internal';
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'mp4' | 'html';
  lastUpdated: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  isNew?: boolean;
  isPremium?: boolean;
}

export const portfolioResources: PortfolioResource[] = [
  // Portfolio Building Guides
  {
    id: 'portfolio-guide-comprehensive',
    title: 'Comprehensive Portfolio Building Guide',
    description: 'Complete step-by-step guide to building an effective electrical apprenticeship portfolio, covering all assessment criteria and industry standards.',
    type: 'guide',
    category: 'building',
    provider: 'City & Guilds',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    lastUpdated: '2024-01-15',
    tags: ['portfolio', 'assessment', 'standards', 'apprenticeship'],
    difficulty: 'beginner',
    estimatedTime: '45 mins',
    isNew: true
  },
  {
    id: 'bs7671-portfolio-guide',
    title: 'BS 7671 Compliance Portfolio Guide',
    description: 'Specific guidance on demonstrating BS 7671 18th Edition compliance in your portfolio evidence and documentation.',
    type: 'guide',
    category: 'electrical',
    provider: 'IET',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    lastUpdated: '2024-01-10',
    tags: ['BS7671', '18th edition', 'wiring regulations', 'compliance'],
    difficulty: 'intermediate',
    estimatedTime: '30 mins'
  },
  {
    id: 'digital-portfolio-guide',
    title: 'Digital Portfolio Best Practices',
    description: 'Modern approaches to creating and maintaining digital portfolios, including cloud storage and version control.',
    type: 'guide',
    category: 'building',
    provider: 'EAL',
    fileType: 'pdf',
    fileSize: '1.2 MB',
    lastUpdated: '2024-01-08',
    tags: ['digital', 'cloud', 'organisation', 'technology'],
    difficulty: 'intermediate',
    estimatedTime: '25 mins'
  },

  // Evidence Collection Templates
  {
    id: 'work-activity-template',
    title: 'Work Activity Evidence Template',
    description: 'Structured template for documenting work activities, including photos, diagrams, and reflective commentary.',
    type: 'template',
    category: 'evidence',
    provider: 'JTL',
    fileType: 'docx',
    fileSize: '156 KB',
    lastUpdated: '2024-01-12',
    tags: ['evidence', 'work activity', 'documentation', 'reflection'],
    difficulty: 'beginner',
    estimatedTime: '10 mins'
  },
  {
    id: 'learning-log-template',
    title: 'Weekly Learning Log Template',
    description: 'Template for recording weekly learning activities, skills developed, and areas for improvement.',
    type: 'template',
    category: 'evidence',
    provider: 'City & Guilds',
    fileType: 'xlsx',
    fileSize: '89 KB',
    lastUpdated: '2024-01-14',
    tags: ['learning log', 'weekly review', 'skills tracking', 'progress'],
    difficulty: 'beginner',
    estimatedTime: '5 mins'
  },
  {
    id: 'installation-evidence-template',
    title: 'Electrical Installation Evidence Pack',
    description: 'Comprehensive template for documenting electrical installation work, including safety checks and compliance verification.',
    type: 'template',
    category: 'evidence',
    provider: 'NICEIC',
    fileType: 'docx',
    fileSize: '245 KB',
    lastUpdated: '2024-01-09',
    tags: ['installation', 'electrical work', 'safety', 'compliance'],
    difficulty: 'intermediate',
    estimatedTime: '15 mins'
  },

  // Assessment Criteria & Standards
  {
    id: 'level-3-assessment-criteria',
    title: 'Level 3 Electrical Assessment Criteria',
    description: 'Detailed breakdown of Level 3 electrical apprenticeship assessment criteria and mapping to portfolio evidence.',
    type: 'standard',
    category: 'assessment',
    provider: 'City & Guilds',
    fileType: 'pdf',
    fileSize: '892 KB',
    lastUpdated: '2024-01-16',
    tags: ['level 3', 'assessment criteria', 'mapping', 'standards'],
    difficulty: 'intermediate',
    estimatedTime: '20 mins'
  },
  {
    id: 'competency-framework',
    title: 'Electrical Competency Framework',
    description: 'Industry-standard competency framework outlining required skills and knowledge for electrical apprentices.',
    type: 'standard',
    category: 'standards',
    provider: 'EAL',
    fileType: 'pdf',
    fileSize: '1.1 MB',
    lastUpdated: '2024-01-11',
    tags: ['competency', 'framework', 'skills', 'knowledge'],
    difficulty: 'advanced',
    estimatedTime: '35 mins'
  },

  // Safety Documentation
  {
    id: 'safety-evidence-checklist',
    title: 'Health & Safety Evidence Checklist',
    description: 'Comprehensive checklist for ensuring all health and safety evidence is properly documented and compliant.',
    type: 'checklist',
    category: 'safety',
    provider: 'HSE',
    fileType: 'pdf',
    fileSize: '567 KB',
    lastUpdated: '2024-01-13',
    tags: ['health safety', 'checklist', 'compliance', 'evidence'],
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    isNew: true
  },
  {
    id: 'risk-assessment-template',
    title: 'Risk Assessment Portfolio Template',
    description: 'Template for documenting risk assessments and safety procedures in your portfolio evidence.',
    type: 'template',
    category: 'safety',
    provider: 'HSE',
    fileType: 'docx',
    fileSize: '198 KB',
    lastUpdated: '2024-01-07',
    tags: ['risk assessment', 'safety procedures', 'documentation'],
    difficulty: 'intermediate',
    estimatedTime: '12 mins'
  },

  // Video Resources
  {
    id: 'portfolio-walkthrough-video',
    title: 'Portfolio Walkthrough: Best Examples',
    description: 'Video guide showing examples of excellent apprentice portfolios and explaining what makes them effective.',
    type: 'video',
    category: 'building',
    provider: 'JTL',
    fileType: 'mp4',
    fileSize: '145 MB',
    lastUpdated: '2024-01-05',
    tags: ['video guide', 'examples', 'best practice', 'walkthrough'],
    difficulty: 'beginner',
    estimatedTime: '22 mins'
  },
  {
    id: 'evidence-photography-video',
    title: 'Effective Evidence Photography',
    description: 'Video tutorial on taking professional-quality photographs for portfolio evidence documentation.',
    type: 'video',
    category: 'evidence',
    provider: 'NICEIC',
    fileType: 'mp4',
    fileSize: '87 MB',
    lastUpdated: '2024-01-04',
    tags: ['photography', 'evidence', 'documentation', 'visual'],
    difficulty: 'beginner',
    estimatedTime: '18 mins'
  }
];

export const getResourcesByCategory = (category: string): PortfolioResource[] => {
  return portfolioResources.filter(resource => resource.category === category);
};

export const getResourcesByType = (type: string): PortfolioResource[] => {
  return portfolioResources.filter(resource => resource.type === type);
};

export const getResourcesByProvider = (provider: string): PortfolioResource[] => {
  return portfolioResources.filter(resource => resource.provider === provider);
};

export const getFeaturedResources = (): PortfolioResource[] => {
  return portfolioResources.filter(resource => resource.isNew || resource.isPremium);
};

export const searchResources = (query: string): PortfolioResource[] => {
  const lowercaseQuery = query.toLowerCase();
  return portfolioResources.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};