// View-model types that outlived the mock-data layer (employerMockData is
// gone). ElecIDSection builds these card shapes from the REAL
// employer_elec_id_* tables; ElecIDCard renders them.

export type PhotoCategory = 'Before' | 'During' | 'After' | 'Completion' | 'Issue';

export interface ElecIdSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsExperience?: number;
  verified?: boolean;
}

export interface ElecIdWorkHistory {
  id: string;
  employer: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  projects: string[];
  referenceAvailable: boolean;
}

export interface ElecIdTraining {
  id: string;
  name: string;
  provider: string;
  completedDate: string;
  certificateId: string;
  fundedBy?: string;
  ownedBy: 'worker';
  documentUrl?: string;
  verified: boolean;
}

export interface ElecIdCertification {
  name: string;
  issuer: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Warning' | 'Expired';
  documentUrl?: string;
  verified: boolean;
}

export interface ElecIdProfile {
  id: string;
  employeeId: string;
  elecIdNumber: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string;
  yearsExperience: number;
  ecsCardType: string;
  ecsCardNumber: string;
  ecsExpiry: string;
  ecsStatus: string;
  skills: ElecIdSkill[];
  workHistory: ElecIdWorkHistory[];
  certifications: ElecIdCertification[];
  training: ElecIdTraining[];
  qualifications: { name: string; issuer: string; year: string }[];
  verified: boolean;
  lastVerified: string;
  profileViews: number;
  shareableLink?: string;
}
