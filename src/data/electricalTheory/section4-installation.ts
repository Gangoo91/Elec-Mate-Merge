
import { SectionData } from '../healthAndSafety/types';

export const servicePositionSection: SectionData = {
  sectionNumber: "4",
  title: "Service Position Equipment",
  content: {
    introduction: "The service position is where electricity enters a building, containing critical components for safe power distribution.",
    sectionNumber: "4",
    title: "Service Position Equipment",
    description: "The service position is where electricity enters a building, containing critical components for safe power distribution.",
    icon: "construction",
    isMainSection: true,
    subsections: [
      {
        id: "4.1",
        title: "Main Components and Layout",
        content: "The service position is where the electrical supply enters a premises and typically includes several key components. The service head is where the supply cable enters the building. The meter equipment measures electrical consumption and is typically owned by the energy supplier. The consumer unit or distribution board houses protective devices and distributes electricity to final circuits. The main switch provides a means of isolating the entire installation. These components must be arranged in an accessible, logical layout that complies with regulations and allows for safe operation and maintenance.",
        keyPoints: [
          "Service head provides the entry point for supply cables",
          "Meter equipment must be accessible for reading and maintenance",
          "Consumer unit houses protective devices for circuit distribution",
          "Main switch must be easily accessible for emergency isolation"
        ]
      },
      {
        id: "4.2",
        title: "Consumer Units and Distribution Boards",
        content: "Consumer units (also called distribution boards) are central to domestic and small commercial electrical installations. Modern units feature a main switch, RCDs (Residual Current Devices) for additional protection, and circuit breakers for individual circuits. They must comply with BS EN 61439-3 and have specific fire-resistant enclosure requirements. Distribution in larger installations may involve multiple distribution boards arranged in a hierarchical system. Understanding the selection, installation and arrangement of these units is essential for creating safe, compliant electrical installations that meet the needs of the building and its occupants.",
        keyPoints: [
          "Modern consumer units must have metal enclosures for fire safety",
          "RCD protection arrangements depend on installation requirements",
          "Proper circuit identification and labeling is essential",
          "Adequate space must be maintained around units for access and cooling"
        ]
      },
      {
        id: "4.3",
        title: "Supply Characteristics",
        content: "Understanding electrical supply characteristics is fundamental to proper installation design. UK standard domestic supplies are typically 230V single-phase, while commercial and industrial premises often have 400V three-phase supplies. Supply capacity is defined by the maximum current that can be drawn, often limited by the cut-out fuse rating (typically 80A or 100A in domestic properties). Supply systems are classified by earthing arrangements (TN-S, TN-C-S, TT). External factors such as prospective fault current and supply impedance affect protection design. These characteristics form the foundation for all subsequent decisions about an electrical installation.",
        keyPoints: [
          "UK standard voltage is 230V single-phase, 400V three-phase",
          "Maximum demand calculations determine required supply capacity",
          "Earth system type affects protection arrangements",
          "External network characteristics influence fault protection design"
        ]
      }
    ]
  }
};
