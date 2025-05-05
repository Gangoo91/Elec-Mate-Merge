
import { SectionData } from '../healthAndSafety/types';

export const basicElectricalTheorySection: SectionData = {
  sectionNumber: "1",
  title: "Legislation and Regulations",
  content: {
    sectionNumber: "1",
    title: "Legislation and Regulations",
    description: "Understanding the laws and guidelines that govern electrical installation work is fundamental to being an electrician.",
    icon: "info",
    isMainSection: true,
    subsections: [
      {
        id: "1.1",
        title: "Electricity at Work Regulations 1989",
        content: "The Electricity at Work Regulations 1989 is a key piece of legislation that establishes legal duties for employers and electricians. It requires that all electrical systems are maintained to prevent danger, work activities are carried out safely, and those working on electrical systems are competent. The regulations apply to all aspects of electrical work and cover both fixed installations and portable equipment. Compliance with these regulations is a legal requirement for all electrical workers.",
        keyPoints: [
          "Legal requirement for safe working with electricity",
          "Applies to all electrical systems and work activities",
          "Requires systems to be maintained in a safe condition",
          "Mandates competence for those working on electrical systems"
        ]
      },
      {
        id: "1.2",
        title: "BS 7671 (IET Wiring Regulations)",
        content: "BS 7671, known as the IET Wiring Regulations, provides comprehensive technical standards for electrical installations in the UK. Currently in its 18th Edition, these regulations specify requirements for the design, installation, inspection, and testing of all electrical installations. While not statutory law themselves, they are the accepted standard for compliance with relevant statutory regulations. The regulations are divided into parts covering fundamental principles, definitions, assessment of general characteristics, protection, selection and erection of equipment, inspection and testing, and special installations.",
        keyPoints: [
          "Current 18th Edition provides latest technical standards",
          "Covers all aspects from design to verification of installations",
          "Compliance demonstrates meeting statutory requirements",
          "Regular updates ensure standards reflect current best practices"
        ]
      },
      {
        id: "1.3",
        title: "Building Regulations Part P",
        content: "Building Regulations Part P applies specifically to domestic electrical installations in England and Wales. It requires that electrical installations are designed and installed to protect people from fire and electric shock. Under Part P, certain electrical work must be notified to local building control authorities unless carried out by a registered competent person who can self-certify their work. Work requiring notification includes new circuits, consumer unit replacements, and work in special locations such as bathrooms and swimming pools. It is essential for electricians working in domestic settings to understand these requirements.",
        keyPoints: [
          "Applies to domestic electrical installations in England and Wales",
          "Requires notification of certain electrical work",
          "Registered competent persons can self-certify work",
          "Special locations have additional requirements"
        ]
      }
    ]
  }
};
