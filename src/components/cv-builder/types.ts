
export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    professionalSummary: string;
  };
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
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

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    professionalSummary: ""
  },
  experience: [],
  education: [],
  skills: [],
  certifications: []
};
