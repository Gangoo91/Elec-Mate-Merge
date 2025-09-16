export type ProfessionalBody = 'NICEIC' | 'ECA' | 'SELECT' | 'NAPIT' | 'STROMA' | 'ELECSA';

export type CPDCategory = 
  | 'regulations-standards'
  | 'technical-skills'
  | 'safety-health'
  | 'business-commercial'
  | 'professional-ethics'
  | 'environmental-sustainability'
  | 'digital-technology'
  | 'customer-service';

export type ActivityType = 
  | 'formal-training'
  | 'work-based-learning'
  | 'self-directed-study'
  | 'professional-activities'
  | 'conferences-seminars'
  | 'mentoring'
  | 'assessment-preparation';

export type EvidenceType = 
  | 'certificate'
  | 'attendance-record'
  | 'site-photo'
  | 'reflection-notes'
  | 'assessment-results'
  | 'toolbox-talk'
  | 'technical-document'
  | 'video-recording';

export interface ProfessionalBodyRequirement {
  body: ProfessionalBody;
  membershipNumber?: string;
  renewalDate: string;
  minHoursPerYear?: number;
  requiredCategories: CPDCategory[];
  assessmentRequired: boolean;
  complianceStatus: 'compliant' | 'at-risk' | 'non-compliant';
  nextAssessment?: string;
}

export interface EvidenceFile {
  id: string;
  type: EvidenceType;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  extractedData?: Record<string, any>;
  verified: boolean;
  thumbnailUrl?: string;
}

export interface CPDActivityTemplate {
  id: string;
  title: string;
  category: CPDCategory;
  type: ActivityType;
  estimatedHours: number;
  description: string;
  provider?: string;
  learningOutcomes: string[];
  evidenceRequired: EvidenceType[];
  isPopular: boolean;
}

export interface CPDReminder {
  id: string;
  type: 'deadline' | 'goal-progress' | 'assessment' | 'renewal';
  title: string;
  message: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  dismissed: boolean;
  actionRequired?: string;
}

export interface ComplianceAnalysis {
  overallStatus: 'compliant' | 'at-risk' | 'non-compliant';
  hoursCompleted: number;
  hoursRequired: number;
  categoryGaps: Array<{
    category: CPDCategory;
    completed: number;
    required: number;
    status: 'complete' | 'on-track' | 'behind';
  }>;
  recommendations: string[];
  nextDeadlines: Array<{
    date: string;
    type: string;
    description: string;
  }>;
}

export interface EnhancedCPDEntry {
  id: string;
  date: string;
  activity: string;
  category: CPDCategory;
  type: ActivityType;
  hours: number;
  provider: string;
  description?: string;
  learningOutcomes?: string;
  evidenceFiles: EvidenceFile[];
  status: 'verified' | 'pending' | 'rejected';
  isAutomatic?: boolean;
  location?: string;
  coordinates?: { lat: number; lng: number };
  supervisorApproval?: {
    approved: boolean;
    supervisorName: string;
    date: string;
    comments?: string;
  };
  createdAt: string;
  updatedAt: string;
  templateUsed?: string;
  reflectionNotes?: string;
  skillsGained?: string[];
}

export interface CPDSettings {
  professionalBodies: ProfessionalBodyRequirement[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    remindBefore: number; // days
  };
  autoTrackingEnabled: boolean;
  requireSupervisorApproval: boolean;
  defaultProvider: string;
}