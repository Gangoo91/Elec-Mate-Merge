
import { SectionData } from './types';

export const safeWorkingEnvironmentSection: SectionData = {
  sectionNumber: "2",
  title: "Safe Working Environment",
  content: {
    introduction: "Maintaining a safe working environment is essential in electrical installation. This section covers workplace inspections, documentation, and safety communication systems.",
    subsections: [
      {
        id: "1",
        title: "Workplace Inspection Procedures",
        content: "Regular workplace inspections help identify potential hazards and ensure compliance with health and safety regulations.",
        keyPoints: ["Document all inspection findings", "Address identified hazards promptly", "Review inspection procedures regularly"]
      },
      {
        id: "2",
        title: "Documentation and Record-Keeping",
        content: "Proper documentation is essential for maintaining safety standards and demonstrating compliance with regulations.",
        keyPoints: ["Maintain up-to-date risk assessments", "Keep records of all safety training", "Document incident investigations"]
      },
      {
        id: "3",
        title: "Safety Communication Systems",
        content: "Effective communication systems ensure that safety information is shared throughout the workplace.",
        keyPoints: ["Implement clear reporting procedures", "Use visual safety indicators", "Conduct regular safety briefings"]
      }
    ]
  }
};
