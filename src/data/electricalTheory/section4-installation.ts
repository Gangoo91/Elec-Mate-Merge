
import { SectionData } from '../healthAndSafety/types';

export const installationPracticesSection: SectionData = {
  sectionNumber: "4",
  title: "Electrical Installation Practices",
  content: {
    sectionNumber: "4",
    title: "Electrical Installation Practices",
    description: "Practical techniques and methods for electrical installation work.",
    icon: "construction",
    isMainSection: true,
    subsections: [
      {
        id: "4.1",
        title: "Cable Types and Selection",
        content: "Selecting the appropriate cable for an installation is critical for safety and performance. Common types include flat twin and earth (6242Y), single core (6491X), and armored cables (SWA). Factors influencing selection include current-carrying capacity, voltage drop, installation method, environmental conditions, and mechanical protection requirements. Cables must be sized correctly to carry the design current without excessive voltage drop or overheating. BS 7671 provides detailed tables for determining appropriate cable sizes based on installation conditions.",
        keyPoints: [
          "Common domestic cables: 6242Y (flat twin and earth), 6491X (singles in conduit)",
          "SWA (Steel Wire Armored) for external or harsh environments",
          "Cable selection factors: current capacity, voltage drop, installation method, environment",
          "Conductor identification: brown (live), blue (neutral), green/yellow (earth)"
        ]
      },
      {
        id: "4.2",
        title: "Installation Methods (Trunking, Conduit, Cable Tray)",
        content: "Electrical containment systems provide physical protection and organized routing for cables. Trunking is a rectangular enclosure with a removable lid, available in various sizes and materials. Conduit is a tube system for cable protection, available in metal or plastic variants. Cable tray provides an open support system for larger cable runs. Each system has specific installation requirements regarding supports, bends, and accessories. Selection depends on the environment, aesthetics, future expansion needs, and protection requirements.",
        keyPoints: [
          "Trunking: rectangular PVC or metal enclosure with removable cover",
          "Conduit: PVC or metal tubing system with various fittings",
          "Cable tray: open support system for larger installations",
          "Factors in selection: environment, appearance, future expansion, protection level required"
        ]
      },
      {
        id: "4.3",
        title: "Enclosures and Containment Systems",
        content: "Electrical enclosures house connection points, control devices, and distribution equipment. They provide protection against environmental factors and prevent access to live parts. Enclosures are rated using IP (Ingress Protection) codes that indicate protection against solid objects and water. For example, IP44 provides protection against objects over 1mm and splashing water. The first digit (0-6) indicates protection against solid objects, while the second digit (0-8) indicates protection against liquids. Selection should consider the installation environment, access requirements, and protection needs.",
        keyPoints: [
          "IP ratings specify enclosure protection: first digit for solids, second for liquids",
          "Common ratings: IP20 (indoor), IP44 (splash-proof), IP65 (dust-tight and water jets)",
          "Consumer units require specific fireproof enclosures",
          "Enclosure selection based on environment, accessibility, and equipment requirements"
        ]
      }
    ]
  }
};
