
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
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: CourseUnit[];
}
