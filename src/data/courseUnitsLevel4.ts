
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

// Course units for EAL Level 4 diploma
export const ealLevel4Units: CourseUnit[] = [
  {
    id: "unit-401",
    title: "Advanced Design of Electrical Installations",
    code: "ELEC4/01",
    description: "Mastery level design principles for complex electrical installations.",
    resources: []
  },
  {
    id: "unit-402",
    title: "Electrical Energy Management",
    code: "ELEC4/02",
    description: "Advanced systems for electrical energy efficiency and management.",
    resources: []
  },
  {
    id: "unit-403",
    title: "Complex Inspection and Testing",
    code: "ELEC4/03",
    description: "Procedures for inspecting and testing complex electrical installations.",
    resources: []
  },
  {
    id: "unit-404",
    title: "Building Services Management",
    code: "ELEC4/04",
    description: "Integration of electrical systems within advanced building services.",
    resources: []
  },
  {
    id: "unit-405",
    title: "Electrotechnical Project Management",
    code: "ELEC4/05", 
    description: "Principles and practices of managing large-scale electrical projects.",
    resources: []
  }
];
