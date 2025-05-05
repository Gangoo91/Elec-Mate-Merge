
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface SectionContentData {
  subsections: Subsection[];
  icon: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools";
  sectionNumber?: string;
  title?: string;
  description?: string;
  isMainSection?: boolean;
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContentData;
}
