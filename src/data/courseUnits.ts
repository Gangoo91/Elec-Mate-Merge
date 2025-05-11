
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
  slug: string; // Added missing 'slug' property
  description: string;
  resources: CourseResource[];
}

// Course units for EAL Level 2 diploma
export const ealLevel2Units: CourseUnit[] = [
  {
    id: "unit-1",
    title: "Health and Safety in Electrical Installations",
    code: "ELEC2/01",
    slug: "elec2-01", // Added slug property
    description: "Essential health and safety principles for electrical installation work.",
    resources: []
  },
  {
    id: "unit-2",
    title: "Electrical Installation Theory and Technology",
    code: "ELEC2/04",
    slug: "elec2-04", // Added slug property
    description: "Fundamental theories and technologies related to electrical installations.",
    resources: []
  },
  {
    id: "unit-3",
    title: "Electrical Installation Methods, Procedures and Requirements",
    code: "ELEC2/05A",
    slug: "elec2-05a", // Added slug property
    description: "Standard methods, procedures and requirements for electrical installations.",
    resources: []
  },
  {
    id: "unit-4",
    title: "Electrical Installation Craft Skills",
    code: "ELEC2/05B",
    slug: "elec2-05b", // Added slug property
    description: "Practical craft skills for electrical installation work.",
    resources: []
  },
  {
    id: "unit-5",
    title: "Electrical Science and Principles",
    code: "ELEC2/08", 
    slug: "elec2-08", // Added slug property
    description: "Scientific principles that underpin electrical installation work.",
    resources: []
  }
];

// Export as courseUnits for use in other files
export const courseUnits = ealLevel2Units;
