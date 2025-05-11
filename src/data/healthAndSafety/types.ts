
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  description?: string; // Adding optional description field
}

export interface SectionContentData {
  introduction?: string; // Make introduction optional
  subsections: {
    id: string;
    title: string;
    content: string;
    keyPoints: string[];
    description?: string; // Adding optional description field
  }[];
  icon?: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools" | "shield-alert";
  sectionNumber?: string;
  title?: string;
  description?: string; // Adding optional description field
  isMainSection?: boolean;
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContentData;
  description?: string; // Adding optional description field
}
