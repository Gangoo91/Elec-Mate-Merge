
import type { SectionData } from '../healthAndSafety/types';

// Installation Methods Content
export const installationMethodsContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Cable Installation Methods",
    content: {
      subsections: [
        {
          id: "1.1",
          title: "Cable Types and Selection",
          content: "Overview of different cable types used in electrical installations and criteria for selection.",
          keyPoints: [
            "Cable construction types",
            "Current-carrying capacity",
            "Environmental considerations"
          ]
        },
        {
          id: "1.2",
          title: "Containment Systems",
          content: "Various containment systems used for routing cables in buildings.",
          keyPoints: [
            "Conduit systems",
            "Trunking systems",
            "Cable trays and baskets"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "Wiring Regulations",
    content: {
      subsections: [
        {
          id: "2.1",
          title: "BS 7671 Requirements",
          content: "Key requirements from BS 7671 (IET Wiring Regulations) relating to installation methods.",
          keyPoints: [
            "Regulation structure",
            "Compliance requirements",
            "Recent updates"
          ]
        },
        {
          id: "2.2",
          title: "Installation Certificates",
          content: "Documentation required for certifying electrical installations.",
          keyPoints: [
            "Electrical Installation Certificate",
            "Minor Works Certificate",
            "Periodic Inspection Report"
          ]
        }
      ]
    }
  }
];
