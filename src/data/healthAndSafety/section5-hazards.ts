
import { SectionData } from './types';

export const hazardsSection: SectionData = {
  sectionNumber: "5",
  title: "Identifying and Dealing with Hazards",
  description: "Learning to identify and mitigate workplace hazards",
  content: {
    introduction: "Identifying and mitigating hazards is a critical skill for electrical workers. This section covers common hazards and appropriate response procedures.",
    subsections: [
      {
        id: "1",
        title: "Common Workplace Hazards",
        content: "Electrical work environments contain various hazards that must be recognised and addressed.",
        keyPoints: ["Identify electrical, physical, and chemical hazards", "Understand hazard risk levels", "Recognise warning signs"]
      },
      {
        id: "2",
        title: "Hazard Reporting Procedures",
        content: "Proper hazard reporting ensures that issues are addressed promptly and effectively.",
        keyPoints: ["Know the reporting chain of command", "Document hazards thoroughly", "Follow up on reported hazards"]
      },
      {
        id: "3",
        title: "Emergency Response",
        content: "Knowing how to respond in emergency situations can prevent injuries and save lives.",
        keyPoints: ["Know emergency evacuation procedures", "Learn basic first aid for electrical injuries", "Understand fire response protocols"]
      }
    ]
  }
};
