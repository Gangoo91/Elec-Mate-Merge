/** Evidence type recognised by UK awarding bodies / EPAOs. */
export type EvidenceType =
  | 'observation'
  | 'work-product'
  | 'witness-testimony'
  | 'professional-discussion'
  | 'photo'
  | 'reflective-account';

/** A workplace witness / supervisor who saw the work carried out. */
export interface PortfolioWitness {
  name?: string;
  role?: string;
  date?: string; // ISO date the work was witnessed
}

/**
 * Assessor-ready capture metadata — the fields that turn a quick photo into
 * evidence that passes VACSR (Valid, Authentic, Current, Sufficient, Reliable)
 * first time. All optional; stored in portfolio_items.metadata (jsonb).
 */
export interface PortfolioEntryMeta {
  workDate?: string; // ISO date the work was actually carried out (currency)
  siteRef?: string; // site / job reference (context)
  role?: string; // what the apprentice personally did (individual contribution)
  evidenceType?: EvidenceType;
  witness?: PortfolioWitness;
  authenticityConfirmed?: boolean; // apprentice declares it's their own work
}

export interface PortfolioEntry {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  skills: string[];
  reflection: string;
  dateCreated: string;
  dateCompleted?: string;
  evidenceFiles: PortfolioFile[];
  tags: string[];
  assessmentCriteria: string[];
  learningOutcomes: string[];
  supervisorFeedback?: string;
  selfAssessment: number; // 1-5 rating
  status: 'draft' | 'in-progress' | 'completed' | 'reviewed';
  timeSpent: number; // minutes
  awardingBodyStandards: string[];
  isVerified?: boolean;
  lastValidationGrade?: string;
  metadata?: PortfolioEntryMeta;
}

export interface PortfolioFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string; // For actual files, we'll mock this
  uploadDate: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requiredEntries: number;
  completedEntries: number;
  groupTheme?: string;
  competencyLevel?: 'foundation' | 'intermediate' | 'advanced';
}

export interface PortfolioAnalytics {
  totalEntries: number;
  completedEntries: number;
  totalTimeSpent: number;
  averageRating: number;
  categoriesProgress: { [key: string]: number };
  skillsDemo: string[];
  recentActivity: PortfolioActivity[];
}

export interface PortfolioActivity {
  id: string;
  type: 'created' | 'updated' | 'completed' | 'reviewed';
  entryId: string;
  entryTitle: string;
  date: string;
}

export interface PortfolioGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  categories: PortfolioCategory[];
  totalRequired: number;
  totalCompleted: number;
  progressPercentage: number;
  competencyLevel: 'foundation' | 'intermediate' | 'advanced';
}

export interface GroupedPortfolioAnalytics extends PortfolioAnalytics {
  groupsProgress: { [key: string]: number };
  competencyLevelProgress: { [key: string]: number };
  groupedActivity: { [key: string]: PortfolioActivity[] };
}

export interface ExportOptions {
  format: 'pdf' | 'word' | 'html';
  includeEvidence: boolean;
  includeReflections: boolean;
  categories: string[];
  groups?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
}
