
import { SectionData } from './types';

export const legislationSection: SectionData = {
  sectionNumber: "1",
  title: "Legislation and Regulations",
  content: {
    introduction: "Understanding the legal framework that governs electrical safety is essential for all electrical workers.",
    sectionNumber: "1",
    title: "Legislation and Regulations",
    description: "Understanding the legal framework that governs electrical safety is essential for all electrical workers.",
    icon: "safety",
    isMainSection: true,
    subsections: [
      {
        id: "1.1",
        title: "Key Legislation",
        content: "The electrical industry is governed by several key pieces of legislation designed to protect workers and the public.\n\nThe Health and Safety at Work Act 1974 forms the foundation of workplace safety in the UK, placing general duties on employers to ensure the health, safety and welfare of employees and others who may be affected by work activities.\n\nThe Electricity at Work Regulations 1989 specifically addresses electrical safety requirements, mandating that electrical systems be maintained to prevent danger and that work activities are carried out in a way that prevents injury.\n\nThe Management of Health and Safety at Work Regulations 1999 requires employers to assess risks, implement preventive measures, and provide appropriate training and supervision.\n\nThese regulations work together to create a comprehensive framework for electrical safety, with penalties including fines and imprisonment for serious breaches.\n\nEvery electrical worker must understand these laws and how they apply to daily tasks, as compliance is not just a legal requirement but essential for preventing accidents and saving lives in this high-risk industry.",
        keyPoints: [
          "The Health and Safety at Work Act 1974 establishes the legal framework for workplace safety",
          "The Electricity at Work Regulations 1989 specifically addresses electrical safety standards and requirements",
          "The Management of Health and Safety at Work Regulations 1999 requires risk assessments for all work activities",
          "Non-compliance can result in fines, imprisonment, and prohibition notices"
        ]
      },
      {
        id: "1.2",
        title: "Construction Design and Management Regulations",
        content: "The Construction (Design and Management) Regulations 2015 (CDM 2015) are particularly relevant for electrical contractors working on construction projects.\n\nThese regulations create specific duties for all parties involved in construction work, including clients, designers, principal contractors, contractors, and workers.\n\nFor electrical installations in construction environments, CDM requires proper planning before work begins, including risk assessments specific to the electrical work being undertaken.\n\nThe regulations mandate clear communication channels between all parties to ensure safety information flows effectively. Site-specific documentation must be maintained, including construction phase plans, risk assessments, and method statements for electrical installations.\n\nThe principal designer and principal contractor have specific responsibilities to coordinate health and safety matters. Electrical contractors must ensure that their workers are properly trained, supervised, and provided with appropriate information about site hazards and control measures.\n\nThe regulations emphasize the importance of considering safety not just during installation but throughout the entire lifecycle of electrical systems, including maintenance and eventual decommissioning.",
        keyPoints: [
          "Defines duties for all parties involved in construction projects",
          "Requires proper planning and management of projects to ensure safety",
          "Specifies documentation and communication requirements for health and safety",
          "Applies to both new construction and renovation/refurbishment projects",
          "Creates specific duties for principal designers and principal contractors"
        ]
      },
      {
        id: "1.3",
        title: "RIDDOR and Incident Reporting",
        content: "The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) creates a legal duty to report certain workplace incidents to the Health and Safety Executive (HSE).\n\nFor electrical workers, this includes reporting any electrical accident that results in a fatality, specified injury, or incapacitation for more than seven days.\n\nRIDDOR also requires reporting of dangerous occurrences related to electrical work, even if no injury results, such as electrical short circuits or overloads which cause significant damage or fire.\n\nOccupational diseases that may affect electrical workers, such as hand-arm vibration syndrome or occupational dermatitis, must also be reported when diagnosed.\n\nReports must be made within specific timeframes: deaths and specified injuries must be reported immediately, while less severe injuries have longer reporting windows.\n\nEmployers must maintain records of all reportable incidents for at least three years. The data collected through RIDDOR helps the HSE identify patterns in workplace accidents and develop targeted interventions and guidance.\n\nIt's crucial for electrical contractors to have clear procedures for reporting incidents and ensuring all staff understand their RIDDOR obligations.",
        keyPoints: [
          "Mandates reporting of work-related accidents resulting in serious injury",
          "Covers dangerous occurrences even if no injury results",
          "Requires reporting of certain occupational diseases",
          "Specifies timeframes for different types of reports",
          "Reports contribute to national statistics and help identify industry-wide safety trends"
        ]
      }
    ]
  }
};
