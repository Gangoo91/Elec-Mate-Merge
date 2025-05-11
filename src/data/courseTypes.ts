
// Basic type definitions for course structure

export interface CourseResource {
  id: string;
  title: string;
  description: string;
  type: string;
  href?: string;
  duration?: string;
}

export interface CourseUnit {
  id: string;
  title: string;
  code: string;
  description: string;
  resources: CourseResource[];
}

export interface Subsection {
  id: string;
  title: string;
  content?: React.ReactNode;
  number: string;
  keyPoints?: string[];
}

export interface SectionData {
  id: string;
  title: string;
  number: string;
  subsections: Subsection[];
  sectionNumber?: string;
  content?: React.ReactNode | {
    introduction?: React.ReactNode;
    subsections: Subsection[];
  };
}
