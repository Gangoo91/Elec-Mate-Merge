
import { SectionData } from '../healthAndSafety/types';

export const circuitDesignSection: SectionData = {
  sectionNumber: "10",
  title: "Circuit Design",
  content: {
    sectionNumber: "10",
    title: "Circuit Design",
    description: "Electrical circuit design involves creating systems that safely and efficiently distribute power to meet the needs of a building's occupants.",
    icon: "cable", // Changed from "circuit-board" to "cable"
    isMainSection: true,
    subsections: [
      {
        id: "10.1",
        title: "Load Assessment and Diversity",
        content: "Load assessment is the process of determining the electrical demand of an installation, which forms the foundation of circuit design. This involves identifying all loads and their characteristics, including power ratings and usage patterns. Diversity factors recognize that not all equipment operates simultaneously at full load. These factors reduce the theoretical maximum demand to a practical figure for design purposes. Different types of installations and circuits have different diversity allowances, with guidance provided in BS 7671 and related standards. Accurate load assessment ensures the installation can meet actual needs without unnecessary oversizing, balancing safety with economic considerations.",
        keyPoints: [
          "Maximum demand calculation considers connected load and diversity",
          "Diversity factors vary by installation type and circuit purpose",
          "Future expansion requirements should be considered in initial design",
          "Different load types (continuous, cyclical, intermittent) affect calculations"
        ]
      },
      {
        id: "10.2",
        title: "Circuit Arrangements and Distribution",
        content: "Effective circuit arrangements involve logical separation of loads to ensure safety, convenience, and maintainability. This includes separating power and lighting circuits, dividing the installation into zones served by different circuits, and providing dedicated circuits for high-current loads such as cooking appliances, shower units, and fixed heating. The distribution system must provide adequate capacity while allowing isolation of specific areas for maintenance without disrupting the entire installation. Distribution boards should be arranged hierarchically in larger installations, with main and sub-distribution systems. This approach provides flexibility, facilitates fault finding, and minimizes the impact of circuit failures.",
        keyPoints: [
          "Separate circuits for lighting and power provide operational flexibility",
          "High-current loads require dedicated circuits with appropriate protection",
          "Zoning improves maintenance access and minimizes disruption during work",
          "Future expansion capability should be incorporated in distribution design"
        ]
      },
      {
        id: "10.3",
        title: "Special Locations Considerations",
        content: "Special locations as defined in BS 7671 Part 7 require additional design considerations to address specific risks. Bathrooms have zones with different requirements for equipment selection and protection. Outdoor installations need equipment with appropriate IP ratings to withstand environmental conditions. Swimming pool areas require extra protective measures due to increased electric shock risk. Agricultural locations must address issues of livestock, corrosive atmospheres, and fire risk. Other special locations include medical locations, construction sites, and exhibitions. Understanding these special requirements is essential for creating safe installations in these environments, where standard approaches may not provide adequate protection.",
        keyPoints: [
          "Bathroom zones define equipment specifications and protection requirements",
          "Outdoor installations need weatherproof equipment and enhanced protection",
          "Additional RCD protection is required in many special locations",
          "IP ratings must be selected based on environmental conditions and risks"
        ]
      }
    ]
  }
};
