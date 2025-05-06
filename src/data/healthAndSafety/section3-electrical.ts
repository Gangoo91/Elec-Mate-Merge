
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Basic Electrical Safety",
  content: {
    introduction: "Understanding basic electrical safety principles is essential for all electrical workers. This section covers fundamental safety concepts, risk assessment, and special installation considerations.",
    sectionNumber: "3",
    title: "Basic Electrical Safety",
    description: "Understanding basic electrical safety principles is essential for all electrical workers. This section covers fundamental safety concepts, risk assessment, and special installation considerations.",
    icon: "shield-alert",
    isMainSection: true,
    subsections: [
      {
        id: "3.1",
        title: "Electrical Safety Fundamentals",
        content: "Electrical safety is fundamental to preventing accidents in electrical work. Understanding the dangers posed by electricity and taking appropriate precautions is essential for all electrical workers. Electric shock occurs when current passes through the body and can result in effects ranging from a tingling sensation to death. As little as 50mA can be fatal, especially if the current path passes through the heart. Wet conditions significantly increase the severity of electric shock. Electrical fires and burns can result from heated equipment, arc flashes, ignition of combustible materials, explosions in flammable atmospheres, and secondary fires from damaged equipment. Safety legislation including the Health and Safety at Work Act 1974 and Electricity at Work Regulations 1989 governs electrical work, requiring competence for all electrical work.",
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
        title: "Risk Assessment in Electrical Work",
        content: "Risk assessment is a fundamental process for identifying hazards and implementing control measures in electrical installation work. The five steps to risk assessment include identifying hazards, determining who might be harmed, evaluating risks and deciding on precautions, recording findings and implementing them, and reviewing and updating as necessary. Common electrical hazards include electric shock and burns, fire and explosion, arcing and flashover, mechanical hazards from equipment, and environmental hazards. The Management of Health and Safety at Work Regulations 1999 require suitable and sufficient risk assessments that are regularly reviewed. The hierarchy of control for managing risks includes elimination, substitution, engineering controls, administrative controls, and personal protective equipment (PPE) as a last resort.",
        keyPoints: [
          "The five steps of risk assessment include identifying hazards, determining who might be harmed, evaluating risks, recording findings, and reviewing regularly",
          "Common electrical hazards include shock, burns, fire, explosion, and environmental factors",
          "The hierarchy of control prioritizes elimination and substitution over PPE",
          "Specific control measures include isolation procedures, safe working distances, and insulated tools",
          "Task-specific risk assessments are required for non-standard or high-risk electrical work"
        ]
      },
      {
        id: "3.3",
        title: "Special Installations",
        content: "Certain locations and installations require special considerations due to increased risks or specific requirements. Bathrooms and shower rooms have zone classifications (0, 1, 2, and outside zones) with different electrical equipment permitted in each zone. All circuits in bathrooms require 30mA RCD protection, with different IP ratings required for different zones. Swimming pools also have extended zone classifications with SELV (max 12V AC) required in Zone 0 and enhanced supplementary bonding. Agricultural locations require additional protection against fire, increased IP ratings for dust/water protection, animal-resistant enclosures, enhanced equipotential bonding, and special considerations for livestock areas. Temporary installations such as construction sites often use reduced LV systems (110V center-tapped) with enhanced mechanical protection for cables.",
        keyPoints: [
          "Bathroom zones (0, 1, 2) require different levels of protection and equipment ratings",
          "All bathroom circuits require 30mA RCD protection",
          "Swimming pools need SELV (max 12V AC) in Zone 0 and enhanced supplementary bonding",
          "Agricultural locations require additional fire protection and animal-resistant equipment",
          "Temporary installations often use 110V center-tapped systems for increased safety"
        ]
      }
    ]
  }
};
