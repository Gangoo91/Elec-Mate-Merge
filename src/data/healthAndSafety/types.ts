
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface SectionContentData {
  subsections: Subsection[];
  icon: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools";
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: {
    subsections: Subsection[];
    icon: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools";
  };
}
