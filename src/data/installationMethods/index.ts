
import type { SectionData } from "@/data/healthAndSafety/types";

export const installationMethodsContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Installation Requirements",
    content: {
      icon: "construction",
      sectionNumber: "1",
      title: "Installation Requirements",
      description: "This section covers the interpretation of installation drawings, selection of installation methods, and understanding of installation zones and cable routing.",
      isMainSection: true,
      subsections: [
        {
          id: "1.1",
          title: "Interpreting Installation Drawings",
          content: "Interpreting installation drawings, specifications, and diagrams requires careful attention to symbols, measurements, and notations. Electrical installation drawings typically include floor plans with symbols representing outlets, switches, and fixtures; schematic diagrams showing circuit connections; and detailed specifications for equipment installation.",
          keyPoints: [
            "Identify standard electrical symbols on blueprints and diagrams",
            "Read and interpret scale drawings to determine exact positioning",
            "Cross-reference specifications with drawings to ensure compliance",
            "Understand legend information and annotation conventions"
          ]
        },
        {
          id: "1.2",
          title: "Selecting Installation Methods",
          content: "When identifying suitable installation methods, considerations must be made regarding the building type, purpose, and specific area requirements. Different environments (residential, commercial, industrial) have unique demands that influence installation approaches.",
          keyPoints: [
            "Assess building structure and materials (concrete, timber frame, steel)",
            "Consider occupancy type and usage patterns",
            "Evaluate fire resistance requirements and building regulations",
            "Determine appropriate IP ratings for specific environments"
          ]
        },
        {
          id: "1.3",
          title: "Installation Zones and Cable Routing",
          content: "BS 7671 establishes specific installation zones for cable routing in buildings. Following these zones helps ensure safety, accessibility for maintenance, and protects cables from damage during subsequent building work.",
          keyPoints: [
            "Horizontal zones: 150mm from ceiling, 150mm from floor",
            "Vertical zones: 150mm from corners and 150mm from openings",
            "Specific requirements for zones in kitchens and bathrooms",
            "Methods for marking and documenting cable routes"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "Equipment and Materials Selection",
    content: {
      icon: "construction",
      sectionNumber: "2",
      title: "Equipment and Materials Selection",
      description: "This section covers the proper selection of cables, enclosures, and other components used in electrical installations.",
      isMainSection: true,
      subsections: [
        {
          id: "2.1",
          title: "Cable Selection",
          content: "Choosing appropriate cables requires consideration of current-carrying capacity, voltage rating, installation method, and environmental factors. The correct cable type and size ensures safety, compliance, and optimal performance.",
          keyPoints: [
            "Different cable types: PVC, LSZH, SWA, FP, MI",
            "Cable sizing based on current demand and voltage drop",
            "Derating factors for grouped cables and ambient temperatures",
            "Segregation requirements for different circuit types"
          ]
        },
        {
          id: "2.2",
          title: "Enclosures and Accessories",
          content: "Enclosures and accessories must be selected based on location, purpose, and protection requirements. IP ratings, material properties, and accessibility considerations all factor into the selection process.",
          keyPoints: [
            "IP rating system for ingress protection",
            "Material selection: metal vs plastic enclosures",
            "Fire rating requirements for specific locations",
            "Fixing methods appropriate to building construction"
          ]
        },
        {
          id: "2.3",
          title: "Component Compatibility",
          content: "Ensuring component compatibility is essential for a safe and effective installation. Manufacturers' specifications, industry standards, and regulatory requirements guide the selection of compatible components.",
          keyPoints: [
            "Manufacturer compatibility matrices and recommendations",
            "Termination methods for different component combinations",
            "Thermal considerations when combining components",
            "Testing procedures to verify compatibility"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "3",
    title: "Installation Procedures",
    content: {
      icon: "construction",
      sectionNumber: "3",
      title: "Installation Procedures",
      description: "This section covers the sequencing of installation work, containment methods, and proper termination techniques.",
      isMainSection: true,
      subsections: [
        {
          id: "3.1",
          title: "Work Sequencing",
          content: "Planning the sequence of installation work enhances efficiency and quality. Typical electrical installations follow a first-fix (containment systems and cabling) and second-fix (accessories and equipment) approach.",
          keyPoints: [
            "First-fix activities: routing, containment, cabling",
            "Second-fix activities: terminations, accessory mounting",
            "Coordination with other trades",
            "Critical path analysis for complex installations"
          ]
        },
        {
          id: "3.2",
          title: "Containment Methods",
          content: "Various containment methods exist for different installation scenarios. Each offers specific advantages in terms of protection, capacity, ease of installation, and future maintenance access.",
          keyPoints: [
            "Trunking systems: types, sizing, and installation techniques",
            "Conduit: metal vs PVC, threading and bending methods",
            "Cable tray: load ratings and support intervals",
            "Ladder systems and basket tray applications"
          ]
        },
        {
          id: "3.3",
          title: "Termination Methods",
          content: "Proper termination techniques ensure electrical continuity and safety. Different wiring accessories require specific termination methods according to manufacturer guidance and regulatory standards.",
          keyPoints: [
            "Screw terminations: correct torque settings",
            "Maintenance-free terminals: insertion techniques",
            "Crimping methods and tool selection",
            "Heat shrink and termination identification"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "4",
    title: "Safe Working Practices",
    content: {
      icon: "safety",
      sectionNumber: "4",
      title: "Safe Working Practices",
      description: "This section covers essential safety procedures when working with electrical installations, including isolation, lock-off, and personal protective equipment.",
      isMainSection: true,
      subsections: [
        {
          id: "4.1",
          title: "Isolation Procedures",
          content: "Safe isolation is a fundamental procedure that must be followed before working on electrical systems. The process involves multiple steps to ensure the equipment is dead and cannot be inadvertently re-energized.",
          keyPoints: [
            "The five-step safe isolation procedure",
            "Proving instruments and their certification",
            "Understanding the hierarchy of isolation",
            "Functional switching vs isolation switching"
          ]
        },
        {
          id: "4.2",
          title: "Lock-off and Tagging",
          content: "Lock-off and tagging procedures prevent accidental re-energization of electrical systems during maintenance or installation work. These procedures are critical safety measures that protect workers from electrical hazards.",
          keyPoints: [
            "Types of locking devices for different distribution equipment",
            "Multi-person lock-off procedures",
            "Information required on warning tags",
            "Permit to work systems for complex installations"
          ]
        },
        {
          id: "4.3",
          title: "Personal Protective Equipment",
          content: "Appropriate Personal Protective Equipment (PPE) must be identified and properly used when working on electrical installations. The level of protection required depends on the risk assessment for the specific task.",
          keyPoints: [
            "PPE categories for electrical work",
            "Arc flash protection ratings",
            "Insulated tools selection and testing",
            "Maintenance and inspection of electrical PPE"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "5",
    title: "Legal and Regulatory Requirements",
    content: {
      icon: "info",
      sectionNumber: "5",
      title: "Legal and Regulatory Requirements",
      description: "This section covers the various regulations and legal requirements governing electrical installations in the UK.",
      isMainSection: true,
      subsections: [
        {
          id: "5.1",
          title: "BS 7671 Wiring Regulations",
          content: "The BS 7671 Wiring Regulations (currently in the 18th Edition) provide the national standard for electrical installations in the UK. Compliance with these regulations is essential for all electrical installation work.",
          keyPoints: [
            "Structure and navigation of the regulations",
            "Key sections applicable to domestic installations",
            "Special locations requirements",
            "Updates and amendment processes"
          ]
        },
        {
          id: "5.2",
          title: "Electricity at Work Regulations",
          content: "The Electricity at Work Regulations 1989 create legal responsibilities for employers, employees, and self-employed persons when working with electricity. These regulations focus on safety in all work activities involving electrical systems.",
          keyPoints: [
            "Duties of employers and employees",
            "Requirements for competence and supervision",
            "Systems, work activities, and protective equipment",
            "Defense of due diligence and reasonable practicability"
          ]
        },
        {
          id: "5.3",
          title: "Building Regulations and Health & Safety",
          content: "Building Regulations Part P and the Health and Safety at Work Act 1974 establish additional requirements for electrical installations. These regulations ensure installations are safe and that work is carried out with minimal risk to workers and building occupants.",
          keyPoints: [
            "Part P notifiable work categories",
            "Competent person schemes",
            "Risk assessment requirements under HSWA",
            "Enforcement authorities and their powers"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "6",
    title: "Testing and Commissioning",
    content: {
      icon: "info",
      sectionNumber: "6",
      title: "Testing and Commissioning",
      description: "This section covers the procedures for testing and commissioning electrical installations, including visual inspection, pre-functional testing, and documentation.",
      isMainSection: true,
      subsections: [
        {
          id: "6.1",
          title: "Visual Inspection Principles",
          content: "Visual inspection is the first stage of testing an electrical installation. It involves methodically checking all accessible parts of the installation before any instrument testing begins.",
          keyPoints: [
            "Key areas for visual inspection",
            "Common installation defects",
            "Documentation of visual findings",
            "Safe access considerations during inspection"
          ]
        },
        {
          id: "6.2",
          title: "Pre-functional Testing",
          content: "Pre-functional testing confirms the safety and integrity of an installation before it is energized. These tests include continuity testing, insulation resistance measurement, and polarity verification.",
          keyPoints: [
            "Continuity testing of protective conductors",
            "Ring final circuit continuity verification",
            "Insulation resistance test procedures",
            "Polarity testing methods and significance"
          ]
        },
        {
          id: "6.3",
          title: "Documentation and Certification",
          content: "Proper documentation of test results and installation certification is a legal requirement. This provides evidence of compliance and creates a baseline for future reference and maintenance.",
          keyPoints: [
            "Electrical Installation Certificate structure",
            "Minor Works Certificate applications",
            "Schedule of test results completion",
            "Handover procedures and client instructions"
          ]
        }
      ]
    }
  }
];
