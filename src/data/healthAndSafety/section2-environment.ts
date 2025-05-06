
import { SectionData } from './types';

export const safeWorkingEnvironmentSection: SectionData = {
  sectionNumber: "2",
  title: "Safe Working Environment",
  content: {
    introduction: "Creating and maintaining a safe working environment is fundamental to electrical work. This section covers essential practices for workplace safety management.",
    sectionNumber: "2",
    title: "Safe Working Environment",
    description: "Creating and maintaining a safe working environment is fundamental to electrical work. This section covers essential practices for workplace safety management.",
    icon: "safety",
    isMainSection: true,
    subsections: [
      {
        id: "2.1",
        title: "Workplace Inspection Procedures",
        content: "Regular workplace inspections are a cornerstone of maintaining safety in electrical work environments. A systematic approach to inspections helps identify and address hazards before they cause accidents or injuries. Electrical contractors and workers should follow a structured inspection program that includes daily pre-work checks, weekly documented inspections, monthly safety audits, and quarterly system reviews. These inspections should cover the work environment, tools and equipment, safety systems, and relevant documentation.",
        keyPoints: [
          "Regular inspections identify hazards before they cause accidents",
          "Inspections should follow a structured frequency (daily, weekly, monthly)",
          "Document all findings and assign responsibility for corrective actions",
          "Follow up on identified issues to ensure they are properly resolved",
          "Review trends to identify recurring safety concerns"
        ]
      },
      {
        id: "2.2",
        title: "Documentation and Record-Keeping",
        content: "Proper documentation is essential for both legal compliance and effective safety management in electrical work. Good record-keeping provides evidence of compliance with regulations, helps identify areas for improvement, and can be crucial in the event of an incident investigation or legal proceedings. Key documents include risk assessments, method statements, equipment inspection records, training certificates, and incident reports. These documents must be properly managed with clear version control, appropriate storage, defined retention periods, and accessibility to relevant personnel.",
        keyPoints: [
          "Documentation provides legal evidence of compliance with regulations",
          "Key documents include risk assessments, method statements, and equipment records",
          "Document management systems should include version control and secure storage",
          "Regular audits ensure documentation remains current and effective",
          "Digital record-keeping offers advantages in searchability and analysis"
        ]
      },
      {
        id: "2.3",
        title: "Safety Communication Systems",
        content: "Effective safety communication is vital to preventing accidents in electrical work. Clear communication ensures hazards are reported promptly and safety information reaches everyone who needs it. Communication structures should include clear reporting hierarchies, emergency communication procedures, designated safety representatives, feedback loops, and cross-team communication methods. Various communication methods should be employed, including toolbox talks, safety briefings, visual communication, digital tools, and anonymous reporting channels. Regular safety meetings with a structured format help maintain safety awareness and address emerging concerns.",
        keyPoints: [
          "Clear communication structures prevent accidents by ensuring hazards are reported promptly",
          "Multiple communication methods reach different people effectively",
          "Regular structured safety meetings maintain awareness and address concerns",
          "Inclusive communication considers language, literacy, and cultural factors",
          "Effective communication must lead to appropriate action"
        ]
      }
    ]
  }
};
