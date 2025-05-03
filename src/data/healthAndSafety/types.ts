
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface SectionContentData {
  sectionNumber: string;
  title: string;
  description: string;
  icon: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section";
  isMainSection: boolean;
  subsections: Subsection[];
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContentData;
}
