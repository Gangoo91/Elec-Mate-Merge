
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  description?: string;
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  description: string;
  content: {
    introduction?: string;
    subsections: Subsection[];
    icon?: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools" | "shield-alert";
  };
}
