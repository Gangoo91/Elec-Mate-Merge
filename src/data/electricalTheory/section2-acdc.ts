
import { SectionData } from '../healthAndSafety/types';

export const technicalInformationSection: SectionData = {
  sectionNumber: "2",
  title: "Technical Information",
  content: {
    sectionNumber: "2",
    title: "Technical Information",
    description: "Interpreting and utilizing technical data is essential for electrical installation work.",
    icon: "info",
    isMainSection: true,
    subsections: [
      {
        id: "2.1",
        title: "Reading Electrical Drawings and Diagrams",
        content: "Electrical drawings and diagrams are essential communication tools in the electrical industry. They use standardized symbols to represent electrical components and connections. Common types include schematic diagrams (showing circuit operation principles), wiring diagrams (showing physical wire connections), and layout drawings (showing physical placement of components). The ability to accurately read these drawings is fundamental to proper installation work. Electricians must understand both the symbols used and the conventions for presenting different types of information across various drawing formats.",
        keyPoints: [
          "Different types of drawings serve different purposes",
          "Standard symbols represent electrical components and connections",
          "Scale and dimensions are critical for accurate installations",
          "Drawing conventions vary between domestic, commercial, and industrial installations"
        ]
      },
      {
        id: "2.2",
        title: "Electrical Symbols and Notation",
        content: "Electrical symbols provide a standardized visual language for communicating technical information. These symbols represent various components such as switches, socket outlets, lighting points, and distribution equipment on drawings and diagrams. British Standard BS EN 60617 provides the standardized symbols used in the UK. Understanding these symbols is essential for correctly interpreting installation requirements. In addition to component symbols, notation conventions for circuit references, cable types, and protective devices are used to convey detailed technical information efficiently.",
        keyPoints: [
          "BS EN 60617 standardizes electrical symbols in the UK",
          "Symbols represent both components and their functions",
          "Circuit references use standardized notation",
          "Cable type notation indicates conductor size, number, and insulation"
        ]
      },
      {
        id: "2.3",
        title: "Installation Specifications and Documentation",
        content: "Comprehensive documentation is crucial for electrical installations. Key documents include specifications (detailing required materials and methods), schedules (listing equipment with ratings), test certificates (recording verification results), and operation manuals (for end users). Installation specifications provide detailed information about the required materials, methods, and standards to be applied. These documents ensure the installation meets client requirements, regulatory standards, and provides a reference for future maintenance. Properly maintaining and understanding this documentation is an essential skill for professional electricians.",
        keyPoints: [
          "Specifications establish quality standards and compliance requirements",
          "Schedules detail equipment ratings and locations",
          "Test certificates provide evidence of safety verification",
          "As-built drawings record the actual installation details for future reference"
        ]
      }
    ]
  }
};
