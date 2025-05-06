
import { SectionData } from './types';

export const legislationSection: SectionData = {
  sectionNumber: "1",
  title: "How Health and Safety Applies to Electrotechnical Operations",
  content: {
    introduction: "This section covers the key legislation and regulations that govern health and safety in electrical work, along with the roles and responsibilities of different stakeholders.",
    subsections: [
      {
        id: "1",
        title: "Electricity at Work Regulations 1989",
        content: "Specific regulations that govern electrical safety in the workplace.",
        keyPoints: ["Key requirements for electrical systems", "Duty holder responsibilities", "Practical application to work activities"]
      },
      {
        id: "2",
        title: "Health and Safety at Work Act",
        content: "Fundamental legislation covering workplace safety and health.",
        keyPoints: ["Employer and employee duties", "Enforcement mechanisms", "Relationship to electrical work"]
      },
      {
        id: "3",
        title: "COSHH Regulations",
        content: "Regulations for controlling hazardous substances in the workplace.",
        keyPoints: ["Identifying hazardous substances", "Risk assessment requirements", "Control measures"]
      }
    ]
  }
};
