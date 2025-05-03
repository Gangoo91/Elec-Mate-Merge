
import { SectionData } from '../healthAndSafety/types';

export const circuitTypesSection: SectionData = {
  sectionNumber: "3",
  title: "Circuit Types and Components",
  content: {
    sectionNumber: "3",
    title: "Circuit Types and Components",
    description: "Essential circuit configurations and protective components used in electrical installations.",
    icon: "safety",
    isMainSection: true,
    subsections: [
      {
        id: "3.1",
        title: "Ring and Radial Circuits",
        content: "Domestic and commercial electrical installations typically use ring or radial circuit configurations. Ring circuits (or ring mains) start and end at the same point in the consumer unit, forming a loop. They are common in the UK and allow more socket outlets on a single circuit. Radial circuits branch out from the consumer unit to serve a specific area or purpose. They're simpler but generally allow fewer outlets per circuit. Understanding the design requirements and limitations of each type is essential for safe and compliant installations.",
        keyPoints: [
          "Ring circuits: form a complete loop, typically fused at 32A, common for socket outlets",
          "Radial circuits: extend from the consumer unit without returning, typically fused at 20A or 32A",
          "Circuit selection depends on load requirements, accessibility, and regional practices",
          "Floor area limitations apply to both circuit types according to BS 7671"
        ]
      },
      {
        id: "3.2",
        title: "Protective Devices (Fuses, MCBs, RCDs)",
        content: "Protective devices are essential components that safeguard electrical installations against overcurrent, short circuits, and earth leakage. Fuses contain a wire that melts when excessive current flows. Miniature Circuit Breakers (MCBs) are automatic switches that trip when detecting an overcurrent. Residual Current Devices (RCDs) detect imbalances between live and neutral conductors, indicating a potential earth leakage, and disconnect the supply. Modern installations often use Residual Current Circuit Breakers with Overcurrent protection (RCBOs) which combine MCB and RCD functions.",
        keyPoints: [
          "Fuses: sacrificial devices that melt under overcurrent conditions",
          "MCBs: resettable protective devices that trip under overcurrent conditions",
          "RCDs: detect earth leakage current to prevent electric shock",
          "RCBOs: combine overcurrent and earth leakage protection in one device"
        ]
      },
      {
        id: "3.3",
        title: "Earthing and Bonding Methods",
        content: "Earthing and bonding are fundamental safety measures in electrical installations. Earthing connects exposed conductive parts to the general mass of earth through an earth electrode system. This ensures that in case of a fault, current has a path to earth, which activates protective devices. Bonding connects extraneous conductive parts together, ensuring they remain at the same potential, reducing the risk of electric shock. The three main earthing systems are TN-S, TN-C-S (PME), and TT, each with specific requirements and applications.",
        keyPoints: [
          "Main earthing systems: TN-S, TN-C-S (PME), and TT",
          "Main bonding connects water pipes, gas pipes, and other services to the main earthing terminal",
          "Supplementary bonding may be required in special locations like bathrooms",
          "Protective conductors must be properly sized according to the main conductor"
        ]
      }
    ]
  }
};
