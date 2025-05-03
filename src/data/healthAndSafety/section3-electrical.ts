
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Basic Electrical Safety",
  content: {
    sectionNumber: "3",
    title: "Basic Electrical Safety Requirements",
    description: "Recognizing the fundamental safety measures necessary when working with electrical systems to prevent accidents and injuries.",
    icon: "warning",
    isMainSection: true,
    subsections: [
      {
        id: "3.1",
        title: "Safe Isolation Procedures",
        content: "Safe isolation is the most critical procedure in electrical work, preventing exposure to live conductors and reducing the risk of electric shock. The five essential steps of safe isolation must be followed without exception: (1) Identify the circuit or equipment to be worked on, using diagrams and labels to ensure the correct isolation point; (2) Isolate the supply by switching off and locking the isolation device; (3) Prove the test instrument on a known live source; (4) Use the test instrument to verify the circuit is dead; (5) Confirm the test instrument still works on a known live source after testing. Proper isolation equipment includes dedicated lock-off devices that prevent reconnection of the supply, individual safety locks with unique keys, and danger tags that clearly identify who has isolated the circuit and why. For complex systems or multiple isolation points, permit-to-work systems provide additional control. Isolation procedures must address stored energy, such as capacitors that can remain charged after power disconnection, requiring discharge before work begins. For work in public buildings or shared facilities, additional measures may be needed to prevent others from accessing electrical distribution boards. The integrity of the isolation must be maintained throughout the work period, with regular verification if necessary. Re-energization procedures should be equally rigorous, including checks that work is complete, all tools and materials are removed, and all workers are clear before removing locks.",
        keyPoints: [
          "The five essential steps of safe isolation",
          "Proper use and maintenance of isolation locks and tags",
          "Verification procedures to confirm isolation",
          "Documentation requirements for isolation procedures",
          "Re-energization protocols to ensure safety when work is complete"
        ]
      },
      {
        id: "3.2",
        title: "Test Equipment for Verification",
        content: "Selecting and using appropriate test equipment is essential for verifying safe isolation and conducting electrical work safely. Voltage indicators used for proving dead must conform to GS38 guidelines, with appropriate fused leads, finger guards, and insulation. The 'test-test-test' methodology is critical: first testing on a known live circuit to verify the instrument works, then testing the isolated circuit, then re-testing on a live circuit to confirm the instrument is still functioning correctly. This process ensures that false negative readings don't lead to dangerous situations. Test equipment must be regularly calibrated according to manufacturers' recommendations, typically annually, with calibration certificates maintained as part of equipment records. Visual inspection before each use is essential to identify damaged leads, cracked cases, or other issues that could compromise safety. Different applications require specialized equipment: voltage indicators for proving dead, multimeters for detailed circuit analysis, clamp meters for current measurement without breaking the circuit, and installation testers for commissioning tests. Common errors in verification testing include using inappropriate instruments (such as non-contact voltage detectors for proving dead), failing to check instrument functionality before and after testing, and not testing all conductors in multi-phase systems. Test equipment should be stored in protective cases to prevent damage and should never be used beyond its rated category or voltage range.",
        keyPoints: [
          "Selection of appropriate test equipment for different applications",
          "Proper testing procedures including the 'test-test-test' methodology",
          "Calibration and maintenance requirements for test equipment",
          "Common errors in verification testing and how to avoid them",
          "GS38 requirements for voltage indicators and test leads"
        ]
      },
      {
        id: "3.3",
        title: "Circuit Protection Devices",
        content: "Circuit protection devices are fundamental components in electrical safety, designed to prevent damage to electrical equipment and reduce fire risks by automatically interrupting circuits under fault conditions. Miniature Circuit Breakers (MCBs) provide overcurrent protection, disconnecting when current exceeds rated values due to overload or short circuit. Their operating characteristics are defined by their type (B, C, or D), which determines their magnetic trip point relative to rated current, with selection based on the load characteristics. Residual Current Devices (RCDs) monitor the balance between live and neutral currents, tripping when an imbalance indicates current leaking to earth, potentially through a person. RCDs with ratings of 30mA provide protection against electric shock, while higher-rated devices (100mA, 300mA) primarily provide fire protection. Fuses, the simplest protection devices, contain a metal element that melts when current exceeds its rating, breaking the circuit. They're classified by type (e.g., BS1362, BS88, BS3036) and rated by current and breaking capacity. Coordination of protection devices ensures selective operation, with devices closer to the fault operating before upstream protection, minimizing disruption. Regular testing is essential: RCDs should be tested quarterly using their test button and annually using proper test equipment; MCBs should be functionally tested during installation and periodically thereafter; fuses should be visually inspected when accessible. Protection devices have specific applications: Type A RCDs are required for equipment with electronic components that may produce DC fault currents; Type C MCBs are typically used for inductive loads like motors; cartridge fuses provide better protection characteristics than rewirable fuses.",
        keyPoints: [
          "Functions and applications of MCBs, RCDs, and fuses",
          "Selection criteria for different protection devices",
          "Testing and maintenance requirements",
          "Coordination of protection devices in electrical systems",
          "Fault current ratings and breaking capacity considerations"
        ]
      },
      {
        id: "3.4",
        title: "Earthing and Bonding Requirements",
        content: "Earthing and bonding are critical safety systems that provide protection against electric shock and fire in the event of faults. Protective earthing connects exposed conductive parts of electrical equipment to the general mass of earth, ensuring that if a live conductor contacts the equipment casing, the resulting fault current trips protection devices and renders the equipment safe. The earthing system must have sufficiently low impedance to allow enough current to flow to operate protection devices quickly. Main equipotential bonding connects extraneous conductive parts (such as water and gas pipes) entering a building to the main earthing terminal, ensuring that no dangerous potential differences can arise between these parts and electrical equipment. This bonding must use conductors sized according to the incoming supply, as specified in BS 7671. Supplementary bonding is required in special locations with increased risk, such as bathrooms and swimming pools, connecting all simultaneously accessible conductive parts. Testing of earthing systems includes earth electrode resistance tests for TT systems, earth fault loop impedance tests for all systems, and continuity tests of protective conductors, main bonding, and supplementary bonding. Different earthing arrangements are used in electrical systems, classified as TN-S, TN-C-S (PME), and TT, each with specific requirements and considerations. Inadequate earthing or bonding is a major cause of electrical accidents, as it can allow dangerous voltages to remain on equipment during fault conditions. Regular inspection and testing of earthing systems is therefore essential, especially in older installations where connections may have deteriorated over time.",
        keyPoints: [
          "Purpose and principles of protective earthing",
          "Main equipotential bonding requirements",
          "Supplementary bonding in special locations",
          "Testing and verification of earthing systems",
          "Different types of earthing arrangements (TN-S, TN-C-S, TT) and their characteristics"
        ]
      }
    ]
  }
};
