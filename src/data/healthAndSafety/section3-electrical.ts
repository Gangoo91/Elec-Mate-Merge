
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Electrical Safety",
  description: "Understanding the fundamentals of electrical safety",
  content: {
    introduction: "Understanding electrical safety is fundamental for all electrical work.",
    subsections: [
      {
        id: "3.1",
        title: "Electrical Safety Fundamentals",
        content: "Electrical safety is fundamental to preventing accidents in electrical work. Understanding the dangers posed by electricity and taking appropriate precautions is essential for all electrical workers. The Electricity at Work Regulations 1989 place legal responsibilities on both employers and individuals to ensure competence for electrical work. The essential steps of safe isolation must be followed without exception: Identify, Isolate, Prove the tester, Test dead, Reprove the tester, Lock off and tag, Issue permit. Proper isolation equipment includes approved voltage indicators, proving units, and locking off devices.",
        keyPoints: [
          "Electric shock can cause effects ranging from tingling to death, with 50mA potentially fatal",
          "Safe isolation procedures must be followed without exception before working on electrical equipment",
          "Electrical fires can result from overheating, arcing, or ignition of combustible materials",
          "The Electricity at Work Regulations 1989 require competence for all electrical work",
          "Appropriate PPE and insulated tools must be used for electrical work"
        ]
      },
      {
        id: "3.2",
        title: "Working Safely with Electrical Systems",
        content: "Working safely with electrical systems requires following established procedures and using appropriate equipment. All work should comply with the Electricity at Work Regulations and BS 7671. Different types of electrical work present different hazards, and appropriate control measures must be implemented in each case. Testing and inspection work requires particular attention to safety measures, including the use of safe isolation procedures, appropriate PPE, and suitable test equipment. Emergency procedures must be established for electrical accidents.",
        keyPoints: [
          "Live working should be avoided unless absolutely necessary and justified",
          "Appropriate test equipment must be used and maintained",
          "Risk assessment should be conducted before any electrical work",
          "Special precautions are needed for work in hazardous areas",
          "Emergency procedures must be established and communicated"
        ]
      },
      {
        id: "3.3",
        title: "Protective Equipment for Electrical Work",
        content: "Personal protective equipment (PPE) is essential for electrical work. The selection of PPE depends on the nature of the work and the potential hazards. Insulated tools and equipment are vital for safe electrical work, and must be regularly inspected and maintained. Safety equipment such as voltage indicators and proving units must be used correctly and maintained according to manufacturers' instructions. PPE should be provided by employers, but it is the responsibility of employees to use it correctly.",
        keyPoints: [
          "Insulating gloves must be appropriate for the voltage level being worked on",
          "Face shields provide protection against arc flash hazards",
          "Insulated tools must be rated for the voltages they will be used with",
          "Test equipment must be maintained and calibrated as required",
          "PPE should be stored correctly to prevent damage"
        ]
      }
    ],
    icon: "shield-alert"
  }
};
