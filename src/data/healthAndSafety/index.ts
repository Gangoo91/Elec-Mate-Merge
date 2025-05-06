
import type { SectionData } from './types';

// Health and Safety Content
export const healthAndSafetyContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Health and Safety Introduction",
    content: {
      subsections: [
        {
          id: "1.1",
          title: "Introduction to Electrical Safety",
          content: "This section provides an introduction to electrical safety principles and their importance in the electrical industry.",
          keyPoints: [
            "Understanding electrical hazards",
            "Risk assessment basics",
            "Safety legislation overview"
          ]
        },
        {
          id: "1.2",
          title: "Legal Requirements",
          content: "An overview of the key legislation and regulations that govern electrical safety in the UK.",
          keyPoints: [
            "Health and Safety at Work Act",
            "Electricity at Work Regulations",
            "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR)"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "Risk Assessment",
    content: {
      subsections: [
        {
          id: "2.1",
          title: "Identifying Hazards",
          content: "Methods for identifying potential electrical hazards in various work environments.",
          keyPoints: [
            "Common electrical hazards",
            "Hazard spotting techniques",
            "Documentation of hazards"
          ]
        },
        {
          id: "2.2",
          title: "Evaluating Risks",
          content: "Techniques for evaluating and prioritising risks associated with electrical work.",
          keyPoints: [
            "Risk evaluation methods",
            "Severity and likelihood assessment",
            "Risk matrices"
          ]
        }
      ]
    }
  }
];
