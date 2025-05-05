
import { SectionData } from '../healthAndSafety/types';

export const circuitRequirementsSection: SectionData = {
  sectionNumber: "7",
  title: "Circuit Requirements",
  content: {
    sectionNumber: "7",
    title: "Circuit Requirements",
    description: "Basic requirements for circuit design and implementation ensure electrical systems function safely and effectively.",
    icon: "circuit-board",
    isMainSection: true,
    subsections: [
      {
        id: "7.1",
        title: "Cable Sizing and Selection",
        content: "Cable sizing is a critical aspect of circuit design that ensures cables can safely carry the intended current without overheating or excessive voltage drop. Factors affecting cable selection include current-carrying capacity (based on the design current and installation method), voltage drop (limited to 3% for lighting and 5% for other circuits from origin to end), thermal constraints (including grouping and ambient temperature), and fault current capacity. BS 7671 provides detailed tables for determining appropriate cable sizes based on these factors. The correct application of these principles ensures the safety, efficiency, and compliance of the installation.",
        keyPoints: [
          "Current-carrying capacity depends on installation method and environment",
          "Maximum permissible voltage drop is 3% for lighting, 5% for other circuits",
          "Correction factors account for grouping, ambient temperature, and installation method",
          "Fault current capacity must be sufficient for the circuit protective device to operate"
        ]
      },
      {
        id: "7.2",
        title: "Circuit Protection Requirements",
        content: "Circuit protection devices safeguard the installation against overcurrent (overload and short-circuit) and electric shock. Protection devices must be selected based on the circuit characteristics, including the design current, cable capacity, and expected fault levels. Coordination between protective devices ensures discrimination, where the device closest to a fault operates first. The type of protection required depends on the circuit purpose, with additional protection (usually RCDs) required for certain locations and socket circuits. Understanding these requirements is essential for creating a safe electrical installation that protects both the building and its occupants.",
        keyPoints: [
          "Overcurrent protection must match cable current-carrying capacity",
          "Fault protection must ensure sufficiently rapid disconnection times",
          "RCDs provide additional protection against electric shock",
          "Discrimination ensures selective operation of protective devices"
        ]
      },
      {
        id: "7.3",
        title: "Installation Standards",
        content: "Proper installation standards must be followed to ensure the safety and longevity of electrical circuits. This includes correct fixing methods for cables and equipment, appropriate separation from other services, protection against mechanical damage, and proper identification of circuits. Cables must be supported at appropriate intervals depending on their type and installation method. Connections should be accessible for inspection and testing, except for specific permitted exceptions. All parts of the installation must comply with the relevant sections of BS 7671 and manufacturer instructions. Adhering to these standards ensures the installation performs safely and reliably throughout its intended life.",
        keyPoints: [
          "Cables must be adequately supported and protected from damage",
          "Connections should be accessible for inspection and maintenance",
          "Circuit identification is essential for safe operation and maintenance",
          "Separation from other services prevents interference and hazards"
        ]
      }
    ]
  }
};
