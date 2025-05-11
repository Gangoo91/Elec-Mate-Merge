
import { SectionData } from './types';

// Simple placeholder sections
const placeholderSections: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Health and Safety Legislation",
    description: "Understanding key electrical safety regulations",
    content: {
      introduction: "Overview of relevant health and safety legislation.",
      subsections: [
        {
          id: "1",
          title: "Electricity at Work Regulations",
          content: "Key requirements of the Electricity at Work Regulations 1989.",
          keyPoints: ["Employer responsibilities", "Worker responsibilities"]
        }
      ]
    }
  }
];

export const healthAndSafetySections = placeholderSections;
export const healthAndSafetyContent = placeholderSections;

export const getHealthAndSafetySection = (sectionNumber: string): SectionData | null => {
  return healthAndSafetySections.find(section => section.sectionNumber === sectionNumber) || null;
};
