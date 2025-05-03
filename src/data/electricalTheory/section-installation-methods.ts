
import { SectionData } from '../healthAndSafety/types';

export const installationMethodsSection: SectionData = {
  sectionNumber: "05A",
  title: "Electrical Installation Methods, Procedures and Requirements",
  content: {
    sectionNumber: "05A",
    title: "Electrical Installation Methods, Procedures and Requirements",
    description: "This unit focuses on specific techniques, regulatory requirements and standard procedures for electrical installations.",
    icon: "construction",
    isMainSection: true,
    subsections: [
      {
        id: "1",
        title: "Installation Requirements",
        content: "Understanding installation requirements involves the interpretation of installation drawings, specifications, and diagrams to accurately implement electrical systems. Electricians must be able to identify suitable installation methods based on building type and purpose, as different structures have varying requirements. For example, domestic installations differ significantly from commercial or industrial settings in terms of load requirements and circuit types. Knowledge of installation zones and cable routing regulations according to BS 7671 is essential, as these dictate where cables can be safely run within walls, floors, and ceilings to minimize risk of damage and ensure accessibility for future maintenance.",
        keyPoints: [
          "Interpret installation drawings, specifications, and diagrams correctly",
          "Identify suitable installation methods based on building type and purpose",
          "Recognise installation zones and cable routing regulations (as per BS 7671)",
          "Consider accessibility for maintenance and future modifications"
        ]
      },
      {
        id: "2",
        title: "Selection of Equipment and Materials",
        content: "Selecting appropriate equipment and materials is critical to ensuring a safe and efficient installation. Electricians must choose suitable cables based on current-carrying capacity, voltage drop considerations, and environmental factors. Selection of enclosures and accessories must account for the installation environment, such as IP ratings for wet or dusty locations. External influences such as ambient temperature, presence of water, mechanical stress, and exposure to corrosive substances must be considered when selecting materials. Component compatibility is also crucial to ensure proper functioning and avoid potential hazards from incompatible equipment interactions.",
        keyPoints: [
          "Choose appropriate cables, enclosures, and accessories for specific applications",
          "Consider external influences such as environmental conditions and mechanical protection",
          "Understand compatibility of components to ensure safe and effective operation",
          "Select materials that comply with relevant standards and regulations"
        ]
      },
      {
        id: "3",
        title: "Installation Procedures",
        content: "Effective installation procedures require systematic planning and execution. Work is typically divided into first-fix (installation of containment systems, cables, and back boxes before plastering or covering) and second-fix (installation of accessories, consumer units, and final connections after decorating). Proper containment methods including trunking, conduit, and cable tray installation require specific techniques to ensure secure and neat installations. Correct termination and connection methods for wiring accessories are essential to prevent loose connections that could lead to overheating or arcing. All installation work must follow manufacturer instructions and industry best practices.",
        keyPoints: [
          "Plan sequencing of work (first-fix, second-fix) for efficient installation",
          "Use correct methods for containment (trunking, conduit, cable tray, etc.)",
          "Apply correct termination and connection methods for wiring accessories",
          "Follow manufacturer instructions and maintain appropriate workmanship standards"
        ]
      },
      {
        id: "4",
        title: "Safe Working Practices",
        content: "Safe working practices are paramount in electrical installation work. Proper isolation procedures must be followed before working on any electrical system, including identification, isolation, proving dead, and securing against reconnection. Application of lock-off devices and warning tags is essential to prevent accidental re-energization of circuits being worked on. Identification and correct use of appropriate Personal Protective Equipment (PPE) such as insulated tools, voltage-rated gloves, eye protection, and appropriate footwear is necessary to protect against electrical and other workplace hazards. All work must be risk-assessed and carried out in accordance with safe systems of work.",
        keyPoints: [
          "Follow proper isolation procedures before working on electrical installations",
          "Apply lock-off devices and warning tags to prevent accidental re-energization",
          "Identify and use appropriate Personal Protective Equipment (PPE)",
          "Complete risk assessments and follow safe systems of work"
        ]
      },
      {
        id: "5",
        title: "Legal and Regulatory Requirements",
        content: "Compliance with legal and regulatory requirements is an essential aspect of electrical installation work. BS 7671 (IET Wiring Regulations) provides the technical standards that all electrical installations must meet for safety and performance. The Electricity at Work Regulations 1989 place legal duties on employers, employees, and self-employed persons to ensure electrical safety in the workplace. Building Regulations Part P applies specifically to domestic electrical installations and requires notification of certain work to building control or completion by a competent person. The Health and Safety at Work Act 1974 provides the overarching legislative framework for workplace safety, placing duties on both employers and employees.",
        keyPoints: [
          "Comply with BS 7671 Wiring Regulations for technical standards",
          "Follow Electricity at Work Regulations 1989 for workplace electrical safety",
          "Adhere to Building Regulations Part P for domestic electrical installations",
          "Understand and apply Health and Safety at Work Act 1974 requirements"
        ]
      },
      {
        id: "6",
        title: "Testing and Commissioning Procedures",
        content: "Testing and commissioning procedures ensure that electrical installations are safe and function as intended before being put into service. Visual inspection is the first and most important part of testing, checking for obvious defects, compliance with regulations, and quality of workmanship. Pre-functional testing includes checks for continuity of protective conductors, polarity to ensure correct connection of live, neutral, and earth, and insulation resistance to verify adequate separation between conductors. Proper documentation of results through test certificates and installation certification provides evidence of compliance with standards and regulations, serving as a record for future reference and maintenance.",
        keyPoints: [
          "Understand visual inspection principles and procedure",
          "Perform pre-functional testing (continuity, polarity, insulation resistance)",
          "Document results and complete installation certification correctly",
          "Verify compliance with standards and specifications before handover"
        ]
      }
    ]
  }
};
