
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Understanding Basic Electrical Safety Requirements",
  content: {
    introduction: "Essential requirements for electrical safety including safe isolation procedures, test equipment usage, and safe working practices.",
    subsections: [
      {
        id: "1",
        title: "Safe Isolation Procedures",
        content: "Steps for safely isolating electrical systems before work begins.",
        keyPoints: ["Isolation sequence", "Locking off", "Testing dead"]
      },
      {
        id: "2",
        title: "Test Equipment",
        content: "Proper use and maintenance of electrical test equipment.",
        keyPoints: ["Voltage indicators", "Proving units", "Multimeters and their applications"]
      },
      {
        id: "3",
        title: "PPE Requirements",
        content: "Personal protective equipment for electrical work.",
        keyPoints: ["Insulated tools", "Arc flash protection", "Eye and hand protection"]
      }
    ]
  }
};
