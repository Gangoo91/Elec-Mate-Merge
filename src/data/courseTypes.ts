
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
  keyPoints?: string[];  // Added missing property
}

export interface SectionData {
  id: string;
  title: string;
  number: string;
  subsections: Subsection[];
  sectionNumber?: string;  // Added missing property
  content?: React.ReactNode;  // Added missing property
}
