
import { SectionData } from '../courseTypes';

export const legislationSection: SectionData = {
  sectionNumber: "1",
  title: "Legislation & Regulations",
  description: "Legislation, Regulations, and Guidance for Electrical Installation Work",
  content: {
    introduction: "This section covers the key legislation, regulations, and standards that govern electrical installation work in the UK.",
    subsections: [
      {
        id: "1.1",
        title: "Health and Safety at Work Act 1974",
        content: "Understanding the Health and Safety at Work Act 1974, which outlines the duties of employers and employees to maintain a safe working environment.",
        keyPoints: [
          "Employer and employee responsibilities under HSWA 1974",
          "Powers of HSE inspectors and enforcement mechanisms",
          "Risk assessment requirements and documentation"
        ]
      },
      {
        id: "1.2",
        title: "Electricity at Work Regulations 1989",
        content: "Focusing on the legal requirements for electrical systems to prevent danger and ensure safety during installation and maintenance.",
        keyPoints: [
          "Specific requirements for working on electrical systems",
          "Safe isolation procedures and their legal basis",
          "Competency requirements for electrical work"
        ]
      },
      {
        id: "1.3",
        title: "Building Regulations (Part P)",
        content: "Covering the requirements for electrical installations in dwellings to ensure they are safe and comply with national standards.",
        keyPoints: [
          "Notifiable and non-notifiable work",
          "Compliance routes and certification",
          "Responsibilities of installers under Part P"
        ]
      },
      {
        id: "1.4",
        title: "British Standards (BS 7671)",
        content: "Studying the IET Wiring Regulations, which set the standards for electrical installation in the UK, ensuring safety and proper functioning.",
        keyPoints: [
          "Structure and purpose of BS 7671",
          "Key chapters and their application",
          "Amendments and update cycles"
        ]
      },
      {
        id: "1.5",
        title: "Guidance Documents",
        content: "Utilizing documents such as the IET On-Site Guide and the Electrician's Guide to Good Electrical Practice to apply regulations effectively in practical scenarios.",
        keyPoints: [
          "IET On-Site Guide and its practical applications",
          "Guidance Notes and their specialized content",
          "Industry best practice publications"
        ]
      },
      {
        id: "1.6",
        title: "Roles and Responsibilities",
        content: "Identifying the responsibilities of various parties involved in electrical installation, including designers, installers, and inspectors, to ensure compliance with legal and safety standards.",
        keyPoints: [
          "Designer responsibilities and qualifications",
          "Installer competency and certification requirements",
          "Inspector roles in verification and testing",
          "Client responsibilities and informed decisions"
        ]
      }
    ]
  }
};
