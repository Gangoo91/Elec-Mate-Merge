
import { SectionData } from './types';

export const safeWorkingPracticesSection: SectionData = {
  sectionNumber: "6",
  title: "Safe Working Practices",
  description: "Essential practices for working safely with electrical systems",
  content: {
    introduction: "Following safe working practices is essential for preventing accidents and injuries in electrical work. This section covers key procedures and best practices.",
    subsections: [
      {
        id: "1",
        title: "Safe Isolation Procedures",
        content: "Safe isolation is essential before working on electrical installations to prevent electric shock.",
        keyPoints: ["Follow the proper isolation sequence", "Verify isolation with approved testing equipment", "Use lock-off devices"]
      },
      {
        id: "2",
        title: "Personal Protective Equipment",
        content: "Appropriate PPE provides a critical layer of protection against electrical and other hazards.",
        keyPoints: ["Select the correct PPE for the task", "Inspect PPE before each use", "Maintain and store PPE properly"]
      },
      {
        id: "3",
        title: "Manual Handling Techniques",
        content: "Proper manual handling techniques prevent injuries when moving equipment and materials.",
        keyPoints: ["Assess loads before lifting", "Use proper lifting techniques", "Utilize mechanical aids when available"]
      }
    ]
  }
};
