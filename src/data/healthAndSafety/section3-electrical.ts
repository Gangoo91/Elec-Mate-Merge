
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
        content: "Safe isolation is the most critical procedure in electrical work, preventing exposure to live conductors and reducing the risk of electric shock.\n\nThe five essential steps of safe isolation must be followed without exception:\n\n1. Identify the circuit or equipment to be worked on, using diagrams and labels to ensure the correct isolation point.\n\n2. Isolate the supply by switching off and locking the isolation device.\n\n3. Prove the test instrument on a known live source.\n\n4. Use the test instrument to verify the circuit is dead.\n\n5. Confirm the test instrument still works on a known live source after testing.\n\nProper isolation equipment includes dedicated lock-off devices that prevent reconnection of the supply, individual safety locks with unique keys, and danger tags that clearly identify who has isolated the circuit and why.\n\nFor complex systems or multiple isolation points, permit-to-work systems provide additional control.\n\nIsolation procedures must address stored energy, such as capacitors that can remain charged after power disconnection, requiring discharge before work begins.\n\nFor work in public buildings or shared facilities, additional measures may be needed to prevent others from accessing electrical distribution boards.\n\nThe integrity of the isolation must be maintained throughout the work period, with regular verification if necessary.\n\nRe-energization procedures should be equally rigorous, including checks that work is complete, all tools and materials are removed, and all workers are clear before removing locks.",
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
        content: "Selecting and using appropriate test equipment is essential for verifying safe isolation and conducting electrical work safely.\n\nVoltage indicators used for proving dead must conform to GS38 guidelines, with appropriate features:\n\n1. Fused leads for protection against overcurrent\n\n2. Finger guards to prevent accidental contact with live parts\n\n3. Adequate insulation for the voltage being tested\n\nThe 'test-test-test' methodology is critical:\n\n1. First testing on a known live circuit to verify the instrument works\n\n2. Then testing the isolated circuit to confirm it's dead\n\n3. Then re-testing on a live circuit to confirm the instrument is still functioning correctly\n\nThis process ensures that false negative readings don't lead to dangerous situations.\n\nTest equipment must be regularly calibrated according to manufacturers' recommendations, typically annually, with calibration certificates maintained as part of equipment records.\n\nVisual inspection before each use is essential to identify damaged leads, cracked cases, or other issues that could compromise safety.\n\nDifferent applications require specialized equipment:\n\n- Voltage indicators for proving dead\n- Multimeters for detailed circuit analysis\n- Clamp meters for current measurement without breaking the circuit\n- Installation testers for commissioning tests\n\nCommon errors in verification testing include using inappropriate instruments (such as non-contact voltage detectors for proving dead), failing to check instrument functionality before and after testing, and not testing all conductors in multi-phase systems.\n\nTest equipment should be stored in protective cases to prevent damage and should never be used beyond its rated category or voltage range.",
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
        content: "Circuit protection devices are fundamental components in electrical safety, designed to prevent damage to electrical equipment and reduce fire risks by automatically interrupting circuits under fault conditions.\n\nTypes of protection devices include:\n\n1. Miniature Circuit Breakers (MCBs) - provide overcurrent protection, disconnecting when current exceeds rated values due to overload or short circuit. Their operating characteristics are defined by their type:\n   - Type B: trips at 3-5 times rated current (for resistive loads)\n   - Type C: trips at 5-10 times rated current (for slightly inductive loads)\n   - Type D: trips at 10-20 times rated current (for highly inductive loads)\n\n2. Residual Current Devices (RCDs) - monitor the balance between live and neutral currents, tripping when an imbalance indicates current leaking to earth. Different ratings serve different purposes:\n   - 30mA RCDs provide protection against electric shock\n   - 100mA, 300mA RCDs primarily provide fire protection\n\n3. Fuses - the simplest protection devices, containing a metal element that melts when current exceeds its rating. They're classified by type:\n   - BS1362: used in plugs and similar applications\n   - BS88: industrial cartridge fuses\n   - BS3036: semi-enclosed (rewirable) fuses\n\nCoordination of protection devices ensures selective operation, with devices closer to the fault operating before upstream protection, minimizing disruption.\n\nRegular testing requirements:\n\n- RCDs should be tested quarterly using their test button and annually using proper test equipment\n- MCBs should be functionally tested during installation and periodically thereafter\n- Fuses should be visually inspected when accessible\n\nSpecific applications for different devices:\n\n- Type A RCDs are required for equipment with electronic components that may produce DC fault currents\n- Type C MCBs are typically used for inductive loads like motors\n- Cartridge fuses provide better protection characteristics than rewirable fuses",
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
        content: "Earthing and bonding are critical safety systems that provide protection against electric shock and fire in the event of faults.\n\nProtective earthing connects exposed conductive parts of electrical equipment to the general mass of earth, ensuring that if a live conductor contacts the equipment casing, the resulting fault current trips protection devices and renders the equipment safe.\n\nThe earthing system must have sufficiently low impedance to allow enough current to flow to operate protection devices quickly.\n\nMain components of earthing and bonding systems:\n\n1. Main Equipotential Bonding - connects extraneous conductive parts (such as water and gas pipes) entering a building to the main earthing terminal, preventing dangerous potential differences\n\n2. Supplementary Bonding - required in special locations with increased risk (bathrooms, swimming pools), connecting all simultaneously accessible conductive parts\n\n3. Earth Electrodes - provide the connection to the general mass of earth in TT systems\n\n4. Circuit Protective Conductors (CPCs) - connect exposed conductive parts of equipment to the earthing system\n\nTesting of earthing systems includes:\n\n- Earth electrode resistance tests for TT systems\n- Earth fault loop impedance tests for all systems\n- Continuity tests of protective conductors, main bonding, and supplementary bonding\n\nDifferent earthing arrangements are used in electrical systems:\n\n- TN-S: separate neutral and protective conductors throughout the system\n- TN-C-S (PME): combined neutral and protective conductor from supply, separated within installation\n- TT: direct connection to earth via local electrode\n\nInadequate earthing or bonding is a major cause of electrical accidents, as it can allow dangerous voltages to remain on equipment during fault conditions.\n\nRegular inspection and testing of earthing systems is essential, especially in older installations where connections may have deteriorated over time.",
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
