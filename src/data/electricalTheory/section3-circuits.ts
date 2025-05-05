
import { SectionData } from '../healthAndSafety/types';

export const wiringSectionsSection: SectionData = {
  sectionNumber: "3",
  title: "Wiring Systems",
  content: {
    introduction: "Wiring systems form the backbone of electrical installations, each with specific properties, applications, and limitations.",
    sectionNumber: "3",
    title: "Wiring Systems",
    description: "Wiring systems form the backbone of electrical installations, each with specific properties, applications, and limitations.",
    icon: "cable",
    isMainSection: true,
    subsections: [
      {
        id: "3.1",
        title: "Cable Types and Properties",
        content: "Various cable types are used in electrical installations, each with specific properties suited to different applications. Common types include PVC insulated and sheathed cables (flat twin & earth), XLPE insulated cables, mineral insulated copper clad cables (MICC), and armored cables. Selection factors include current-carrying capacity, voltage drop characteristics, mechanical strength, fire performance, and environmental resistance. Understanding the properties of different cable types is essential for making appropriate selections that ensure safety, compliance with regulations, and optimal performance for the specific installation environment.",
        keyPoints: [
          "PVC cables offer good general-purpose properties at lower cost",
          "XLPE insulation provides better temperature resistance",
          "MICC cables offer superior fire resistance and durability",
          "Armored cables provide protection against mechanical damage"
        ]
      },
      {
        id: "3.2",
        title: "Containment Systems",
        content: "Containment systems provide physical protection and support for cables. Common types include conduit (metal or PVC), trunking, cable tray, and basket systems. Each system has specific installation requirements regarding supports, bends, and accessories. Selection depends on the installation environment, aesthetics, ease of future modifications, and level of protection required. Proper installation of containment systems is crucial for the long-term integrity of the electrical installation, ensuring cables are protected from damage and properly supported throughout their length.",
        keyPoints: [
          "Conduit provides high mechanical protection in a sealed system",
          "Trunking offers easy access and capacity for multiple cables",
          "Cable tray provides economical support for larger cable runs",
          "Proper support spacing and fixing methods are essential for all systems"
        ]
      },
      {
        id: "3.3",
        title: "Installation Methods and Techniques",
        content: "Proper installation techniques are crucial for the integrity and safety of wiring systems. This includes correct cable routing practices, maintaining separation from other services, proper support methods, and appropriate termination techniques. Installation must comply with the manufacturer's instructions and relevant regulations from BS 7671. Factors such as fire barriers, expansion provisions, and protection against mechanical damage must be considered. The correct application of these techniques ensures the longevity, safety, and compliance of the electrical installation, as well as minimizing the risk of future failures.",
        keyPoints: [
          "Maintain minimum bending radii to prevent cable damage",
          "Provide adequate support intervals based on cable type and route",
          "Ensure proper separation from other services to prevent interference",
          "Apply correct termination techniques for reliable connections"
        ]
      }
    ]
  }
};
