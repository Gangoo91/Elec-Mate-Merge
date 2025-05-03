
import { SectionData } from '../healthAndSafety/types';

export const regulationsStandardsSection: SectionData = {
  sectionNumber: "5",
  title: "Regulations and Standards",
  content: {
    sectionNumber: "5",
    title: "Regulations and Standards",
    description: "Key regulations and standards governing electrical installations in the UK.",
    icon: "section",
    isMainSection: true,
    subsections: [
      {
        id: "5.1",
        title: "Introduction to BS 7671 (IET Wiring Regulations)",
        content: "BS 7671, commonly known as the IET Wiring Regulations, is the national standard for electrical installations in the UK. Currently in its 18th Edition, it provides comprehensive requirements for the design, installation, inspection, and testing of electrical installations. The regulations are divided into seven parts, covering fundamental principles, definitions, assessment, protection, selection of equipment, inspection and testing, and special installations. Compliance with BS 7671 is essential for ensuring electrical safety and is referenced by building regulations.",
        keyPoints: [
          "BS 7671 (18th Edition) is the UK standard for electrical installations",
          "Seven parts covering all aspects from design to verification",
          "Not legally binding itself, but often required to comply with other legislation",
          "Updated approximately every 3 years with amendments between editions"
        ]
      },
      {
        id: "5.2",
        title: "Building Regulations Part P",
        content: "Building Regulations Part P applies to electrical installations in domestic premises in England and Wales. It states that electrical installations must be designed and installed so as to protect people from fire and electric shock. Under Part P, certain electrical work must be notified to the local building control authority, unless carried out by a registered competent person scheme member (such as NICEIC, ELECSA, or NAPIT). Work that requires notification includes new circuits, work in special locations like bathrooms, and consumer unit replacements.",
        keyPoints: [
          "Legal requirement for domestic electrical installations in England and Wales",
          "Requires notification of certain electrical work to building control",
          "Work can be self-certified by registered competent persons",
          "Special locations (e.g., bathrooms, swimming pools) have additional requirements"
        ]
      },
      {
        id: "5.3",
        title: "Manufacturer Instructions and Industry Standards",
        content: "In addition to wiring regulations, electrical installations must comply with manufacturer instructions and relevant industry standards. Manufacturer instructions provide specific guidance for the installation, operation, and maintenance of electrical equipment. Deviating from these instructions may void warranties and create safety hazards. Industry standards from organizations like British Standards Institute (BSI) provide additional specifications for particular installations or equipment. These include standards for specific types of equipment, installation practices, and testing procedures.",
        keyPoints: [
          "Manufacturer instructions must be followed for correct installation and warranty validity",
          "British Standards provide additional requirements for specific situations",
          "Industry best practices complement regulatory requirements",
          "Documentation of compliance is an important part of professional installation"
        ]
      }
    ]
  }
};
