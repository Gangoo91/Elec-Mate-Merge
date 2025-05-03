
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

// Course units for EAL Level 2 diploma in the specified order: 01, 04, 05A, 05B, 08
export const ealLevel2Units: CourseUnit[] = [
  {
    id: "unit-1",
    title: "Health and Safety in Electrical Installation",
    code: "ELEC2/01",
    description: "This unit covers essential health and safety principles for electrical work, including risk assessment, PPE requirements, and safe isolation procedures.",
    resources: [
      {
        id: "resource-1",
        title: "Safe Isolation Procedures",
        description: "Step-by-step guide to safe isolation",
        type: "document",
        duration: "20 mins"
      },
      {
        id: "resource-2",
        title: "PPE Requirements Video",
        description: "Video demonstration of required PPE",
        type: "video",
        duration: "15 mins"
      },
      {
        id: "resource-3",
        title: "Risk Assessment Quiz",
        description: "Test your knowledge of risk assessment",
        type: "learning",
        duration: "30 mins"
      }
    ]
  },
  {
    id: "unit-3",
    title: "Electrical Installation Theory and Technology",
    code: "ELEC2/04",
    description: "This unit covers electrical installation techniques, theories and technological applications in modern buildings.",
    resources: [
      {
        id: "resource-6",
        title: "Installation Methods Overview",
        description: "Introduction to installation methods",
        type: "document",
        duration: "25 mins"
      }
    ]
  },
  {
    id: "unit-4",
    title: "Electrical Installation Methods, Procedures and Requirements",
    code: "ELEC2/05A",
    description: "This unit focuses on specific techniques, regulatory requirements and standard procedures for electrical installations.",
    resources: [
      {
        id: "resource-7",
        title: "Wiring Regulations Overview",
        description: "Key points from BS7671 wiring regulations",
        type: "learning",
        duration: "40 mins"
      }
    ]
  },
  {
    id: "unit-5",
    title: "Electrical Installation Craft Skills",
    code: "ELEC2/05B",
    description: "This unit focuses on the practical hands-on skills required for electrical installation work.",
    resources: [
      {
        id: "resource-8",
        title: "Cable Installation Techniques",
        description: "Video demonstration of proper cable installation",
        type: "video",
        duration: "35 mins"
      }
    ]
  },
  {
    id: "unit-2",
    title: "Electrical Science and Principles",
    code: "ELEC2/08",
    description: "This unit explores fundamental electrical concepts including current, voltage, resistance, and power.",
    resources: [
      {
        id: "resource-4",
        title: "Ohm's Law Calculations",
        description: "Practice exercises on applying Ohm's Law",
        type: "learning",
        duration: "45 mins"
      },
      {
        id: "resource-5",
        title: "Circuit Theory Explained",
        description: "Comprehensive guide to electrical circuits",
        type: "document",
        duration: "30 mins"
      }
    ]
  }
];
