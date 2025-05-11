
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  number?: string; // Making this optional
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  description: string;
  content: {
    introduction: string;
    subsections: Subsection[];
    icon?: string;
  };
  subsections?: Subsection[]; // For backward compatibility
}
