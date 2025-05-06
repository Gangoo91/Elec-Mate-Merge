
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

// Course units for EAL Level 2 diploma
export const ealLevel2Units: CourseUnit[] = [
  {
    id: "unit-1",
    title: "Health and Safety in Electrical Installations",
    code: "ELEC2/01",
    description: "Essential health and safety principles for electrical installation work.",
    resources: []
  },
  {
    id: "unit-2",
    title: "Electrical Installation Theory and Technology",
    code: "ELEC2/04",
    description: "Fundamental theories and technologies related to electrical installations.",
    resources: []
  },
  {
    id: "unit-3",
    title: "Electrical Installation Methods, Procedures and Requirements",
    code: "ELEC2/05A",
    description: "Standard methods, procedures and requirements for electrical installations.",
    resources: []
  },
  {
    id: "unit-4",
    title: "Electrical Installation Craft Skills",
    code: "ELEC2/05B",
    description: "Practical craft skills for electrical installation work.",
    resources: []
  },
  {
    id: "unit-5",
    title: "Electrical Science and Principles",
    code: "ELEC2/08", 
    description: "Scientific principles that underpin electrical installation work.",
    resources: []
  }
];
