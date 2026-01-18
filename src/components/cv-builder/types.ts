
export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    professionalSummary: string;
    // Extended fields
    photoUrl?: string;
    linkedIn?: string;
    portfolio?: string;
  };
  professionalCards: ProfessionalCards;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  keyProjects: KeyProject[];
  references: Reference[];
}

export interface ProfessionalCards {
  ecsCardNumber?: string;
  ecsCardType?: 'Gold' | 'Blue' | 'White' | 'Yellow' | 'Green' | 'Black' | '';
  ecsExpiry?: string;
  cscsCardNumber?: string;
  cscsCardType?: string;
  cscsExpiry?: string;
  drivingLicence: string[];
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade?: string;
}

export interface KeyProject {
  id: string;
  title: string;
  client?: string;
  value?: string;
  role: string;
  description: string;
  completionDate?: string;
}

export interface Reference {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

export type CVFormat = 'full' | 'summary' | 'ats';

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    professionalSummary: "",
    photoUrl: "",
    linkedIn: "",
    portfolio: ""
  },
  professionalCards: {
    ecsCardNumber: "",
    ecsCardType: "",
    ecsExpiry: "",
    cscsCardNumber: "",
    cscsCardType: "",
    cscsExpiry: "",
    drivingLicence: []
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  keyProjects: [],
  references: []
};
