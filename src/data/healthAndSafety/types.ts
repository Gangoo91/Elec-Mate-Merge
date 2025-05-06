
// This file is intentionally minimal as we've removed all EAL content
// It exists to prevent build errors from missing imports

export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface SectionContent {
  subsections: Subsection[];
  introduction?: string;
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContent;
}
