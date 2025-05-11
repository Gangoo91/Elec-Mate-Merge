
import { CourseUnit } from './courseTypes';

// Level 2 Diploma Units
export const level2DiplomaUnits: CourseUnit[] = [
  {
    id: "elec2-01",
    title: "Health and Safety in Electrical Installation",
    code: "ELEC2/01",
    description: "Learn about health and safety regulations, risk assessment, and safe working practices in electrical installations.",
    sections: [],
    resources: []
  },
  {
    id: "elec2-04",
    title: "Electrical Installation Theory and Technology",
    code: "ELEC2/04",
    description: "Understand the fundamental theories and technologies behind electrical installations.",
    sections: [],
    resources: []
  },
  {
    id: "elec2-05a",
    title: "Electrical Installation Methods, Procedures and Requirements",
    code: "ELEC2/05A",
    description: "Explore proper installation methods and procedures according to industry standards.",
    sections: [],
    resources: []
  },
  {
    id: "elec2-05b",
    title: "Electrical Installation Craft Skills",
    code: "ELEC2/05B",
    description: "Develop hands-on skills necessary for professional electrical installation work.",
    sections: [],
    resources: []
  },
  {
    id: "elec2-08",
    title: "Electrical Science and Principles",
    code: "ELEC2/08",
    description: "Master the scientific principles that govern electrical systems and components.",
    sections: [],
    resources: []
  }
];

// Empty array for other course units
export const courseUnits: CourseUnit[] = [];

// Helper function for future course unit fetching
export const getCourseUnitById = (id: string): CourseUnit | undefined => {
  // Check in level2DiplomaUnits first
  const level2Unit = level2DiplomaUnits.find(unit => unit.id === id);
  if (level2Unit) return level2Unit;
  
  // Then check in other courseUnits
  return courseUnits.find(unit => unit.id === id);
};
