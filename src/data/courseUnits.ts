
import { CourseUnit } from './courseTypes';

// EAL Level 2 units
export const ealLevel2Units: CourseUnit[] = [
  {
    id: "unit-elec2-01",
    title: "Health and Safety in Electrical Installation",
    code: "ELEC2/01",
    description: "Understanding safety regulations and practices in electrical work environments.",
    resources: [
      {
        id: "resource-hs-1",
        title: "Health and Safety Legislation",
        description: "Overview of key legislation affecting electrical work",
        type: "learning",
        duration: "30 mins"
      },
      {
        id: "resource-hs-2",
        title: "Risk Assessment",
        description: "How to identify and mitigate risks on site",
        type: "document",
        duration: "20 mins"
      }
    ]
  },
  {
    id: "unit-elec2-04",
    title: "Electrical Installation Theory and Technology",
    code: "ELEC2/04",
    description: "Core theoretical knowledge necessary for electrical installation work.",
    resources: [
      {
        id: "resource-theory-1",
        title: "Electrical Circuits",
        description: "Understanding electrical circuit principles",
        type: "learning",
        duration: "45 mins"
      },
      {
        id: "resource-theory-2",
        title: "Principles of Electricity",
        description: "Fundamental concepts of electricity",
        type: "video",
        duration: "25 mins"
      }
    ]
  },
  {
    id: "unit-elec2-05A",
    title: "Electrical Installation Methods, Procedures and Requirements",
    code: "ELEC2/05A",
    description: "Standard methods and procedures for electrical installations.",
    resources: [
      {
        id: "resource-methods-1",
        title: "Wiring Systems",
        description: "Different types of wiring systems and their applications",
        type: "learning",
        duration: "35 mins"
      },
      {
        id: "resource-methods-2",
        title: "Installation Requirements",
        description: "Standards and specifications for electrical installations",
        type: "document",
        duration: "30 mins"
      }
    ]
  },
  {
    id: "unit-elec2-05B",
    title: "Electrical Installation Craft Skills",
    code: "ELEC2/05B",
    description: "Practical skills required for electrical installation work.",
    resources: [
      {
        id: "resource-craft-1",
        title: "Cable Installation",
        description: "Techniques for installing various cable types",
        type: "learning",
        duration: "40 mins"
      },
      {
        id: "resource-craft-2",
        title: "Termination Methods",
        description: "Proper techniques for terminating electrical connections",
        type: "video",
        duration: "35 mins"
      }
    ]
  },
  {
    id: "unit-elec2-08",
    title: "Electrical Science and Principles",
    code: "ELEC2/08",
    description: "Scientific principles that underlie electrical systems and components.",
    resources: [
      {
        id: "resource-science-1",
        title: "Ohm's Law",
        description: "Understanding the relationship between voltage, current, and resistance",
        type: "learning",
        duration: "30 mins"
      },
      {
        id: "resource-science-2",
        title: "Magnetism and Electromagnetism",
        description: "Principles of magnetism in electrical applications",
        type: "document",
        duration: "25 mins"
      }
    ]
  }
];

// Export all types from courseTypes to be available via courseUnits import
export type { CourseUnit, CourseResource } from './courseTypes';
