
export interface CourseResource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'learning';
  duration?: string;
  href?: string;
}

export interface CourseUnit {
  id: string;
  title: string;
  code: string;
  description: string;
  resources: CourseResource[];
}

// Course units for EAL Level 2 diploma (currently being redeveloped)
export const ealLevel2Units: CourseUnit[] = [
  {
    id: "unit-1",
    title: "Content Being Updated",
    code: "ELEC2/01",
    description: "This course content is currently being redeveloped. Please check back soon for updated materials.",
    resources: []
  }
];
