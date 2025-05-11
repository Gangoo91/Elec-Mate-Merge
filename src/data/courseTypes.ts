
export interface Section {
  id: string;
  title: string;
  description?: string;
}

export interface CourseUnit {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  code: string;
  resources: any[]; // Adding this to fix the CourseUnitGrid errors
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: CourseUnit[];
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
  subsections?: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  number?: string;
}

export interface CourseResource {
  id: string;
  title: string;
  type: string;
}
