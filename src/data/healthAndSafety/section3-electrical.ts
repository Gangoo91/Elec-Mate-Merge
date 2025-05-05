
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Basic Electrical Safety",
  content: {
    introduction: "Understanding basic electrical safety principles is essential for all electrical workers. This section covers fundamental safety concepts, risk assessment, and special installation considerations.",
    subsections: [
      {
        id: "1",
        title: "Electrical Safety Fundamentals",
        content: "Understanding electrical hazards and safety principles is fundamental to preventing accidents in electrical work.",
        keyPoints: ["Understand electrical shock risks", "Apply proper isolation procedures", "Use appropriate safety equipment"]
      },
      {
        id: "2",
        title: "Risk Assessment in Electrical Work",
        content: "Thorough risk assessments help identify and mitigate electrical hazards before work begins.",
        keyPoints: ["Identify all potential hazards", "Evaluate risks systematically", "Implement appropriate control measures"]
      },
      {
        id: "3",
        title: "Special Installations",
        content: "Special installations require additional safety considerations due to their unique hazards.",
        keyPoints: ["Follow specific regulations for special locations", "Implement enhanced safety measures", "Conduct specialized risk assessments"]
      }
    ]
  }
};
