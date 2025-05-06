
// Define types for health and safety content
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface SectionContent {
  subsections: Subsection[];
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContent;
}
