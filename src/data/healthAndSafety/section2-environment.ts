
import { SectionData } from './types';

export const safeWorkingEnvironmentSection: SectionData = {
  sectionNumber: "2",
  title: "Health and Safety Procedures in the Work Environment",
  description: "Understanding safety procedures for the electrical work environment",
  content: {
    introduction: "This section covers emergency procedures, proper documentation and reporting practices, and environmental considerations for electrical work.",
    subsections: [
      {
        id: "1",
        title: "Accident and Emergency Procedures",
        content: "Protocols for responding to workplace incidents including electrical accidents.",
        keyPoints: ["Electric shock response", "Fire procedures", "First aid requirements"]
      },
      {
        id: "2",
        title: "Reporting and Documentation",
        content: "Proper procedures for documenting and reporting safety incidents and hazards.",
        keyPoints: ["RIDDOR requirements", "Internal reporting chains", "Documentation templates"]
      },
      {
        id: "3",
        title: "Environmental Considerations",
        content: "Impact of electrical work on the environment and appropriate mitigation measures.",
        keyPoints: ["Waste management", "Energy efficiency", "Sustainable practices"]
      }
    ]
  }
};
