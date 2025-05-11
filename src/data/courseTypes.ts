
export interface CourseUnit {
  id: string;
  title: string;
  code: string;
  description: string;
  sections: CourseSection[];
  resources: UnitResource[];
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  subsections?: CourseSectionContent[];
}

export interface CourseSectionContent {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface UnitResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'assessment';
  url: string;
  completed?: boolean;
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

export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  number?: string; // Making this optional
}
