
// Define types for course units
export interface CourseResource {
  id: string;
  title: string;
  type: 'learning' | 'assessment' | 'reference';
  url?: string;
}

export interface CourseUnit {
  id: string;
  code: string;
  title: string;
  description: string;
  resources: CourseResource[];
}

// Example course units data
export const courseUnits: CourseUnit[] = [
  {
    id: "unit-01",
    code: "ELEC2/01",
    title: "Health and Safety in Electrical Installation",
    description: "Understand the health and safety requirements for electrical installation work.",
    resources: [
      { id: "resource-01-01", title: "Introduction to Health and Safety", type: "learning" },
      { id: "resource-01-02", title: "Risk Assessment", type: "learning" },
      { id: "resource-01-03", title: "Assessment Quiz", type: "assessment" }
    ]
  },
  {
    id: "unit-04",
    code: "ELEC2/04",
    title: "Electrical Theory and Technology",
    description: "Understand the principles of electrical theory and technology for installation work.",
    resources: [
      { id: "resource-04-01", title: "Basic Electrical Theory", type: "learning" },
      { id: "resource-04-02", title: "Circuit Principles", type: "learning" },
      { id: "resource-04-03", title: "Assessment Quiz", type: "assessment" }
    ]
  },
  {
    id: "unit-05a",
    code: "ELEC2/05A",
    title: "Installation Methods and Materials",
    description: "Understand different methods and materials used in electrical installation.",
    resources: [
      { id: "resource-05a-01", title: "Cable Installation Methods", type: "learning" },
      { id: "resource-05a-02", title: "Wiring Regulations", type: "learning" },
      { id: "resource-05a-03", title: "Assessment Quiz", type: "assessment" }
    ]
  },
  {
    id: "unit-05b",
    code: "ELEC2/05B",
    title: "Electrical Installation Craft Skills",
    description: "Develop practical skills required for electrical installation work.",
    resources: [
      { id: "resource-05b-01", title: "Basic Tools and Techniques", type: "learning" },
      { id: "resource-05b-02", title: "Termination and Connection", type: "learning" },
      { id: "resource-05b-03", title: "Assessment Quiz", type: "assessment" }
    ]
  }
];
