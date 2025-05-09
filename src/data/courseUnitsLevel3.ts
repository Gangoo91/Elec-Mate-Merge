
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

// Course units for EAL Level 3 diploma
export const ealLevel3Units: CourseUnit[] = [
  {
    id: "unit-301",
    title: "Understanding Environmental Legislation",
    code: "ELEC3/01",
    description: "Environmental legislation, procedures and requirements for the electrical industry.",
    resources: []
  },
  {
    id: "unit-302",
    title: "Advanced Electrical Science and Principles",
    code: "ELEC3/02",
    description: "Advanced scientific principles required for electrical installation, commissioning and maintenance work.",
    resources: []
  },
  {
    id: "unit-303",
    title: "Electrical Installations: Fault Diagnosis and Rectification",
    code: "ELEC3/03",
    description: "Techniques for diagnosing and rectifying faults in electrical systems and equipment.",
    resources: []
  },
  {
    id: "unit-304",
    title: "Inspection, Testing and Commissioning",
    code: "ELEC3/04",
    description: "Requirements and procedures for the inspection, testing and commissioning of electrical installations.",
    resources: []
  },
  {
    id: "unit-305",
    title: "Electrical Systems Design",
    code: "ELEC3/05", 
    description: "Principles and procedures for the design of electrical systems and circuits.",
    resources: []
  }
];
