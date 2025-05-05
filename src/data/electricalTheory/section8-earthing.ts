
import { SectionData } from '../healthAndSafety/types';

export const earthingBondingSection: SectionData = {
  sectionNumber: "8",
  title: "Earthing and Bonding",
  content: {
    introduction: "Earthing and bonding are critical safety systems in electrical installations, providing protection against electric shock and fire risks from fault conditions.",
    sectionNumber: "8",
    title: "Earthing and Bonding",
    description: "Earthing and bonding are critical safety systems in electrical installations, providing protection against electric shock and fire risks from fault conditions.",
    icon: "shield-alert",
    isMainSection: true,
    subsections: [
      {
        id: "8.1",
        title: "Earthing Systems and Principles",
        content: "Earthing connects exposed conductive parts of electrical equipment to the general mass of Earth, creating a path for fault current. This ensures that protective devices operate quickly to disconnect the supply if a fault occurs. The three main types of earthing systems in the UK are TN-S (separate neutral and protective conductors throughout), TN-C-S (combined neutral and protective conductor in the supply network, separated in the installation, also known as PME), and TT (installation earth is provided by a local electrode). Each system has specific requirements and implications for protective measures. Understanding these systems is fundamental to creating safe electrical installations.",
        keyPoints: [
          "TN-S system has separate neutral and protective conductors throughout",
          "TN-C-S (PME) system has combined PEN conductor in the supply network",
          "TT system relies on a local earth electrode for fault current path",
          "System type determines earthing conductor size and protection requirements"
        ]
      },
      {
        id: "8.2",
        title: "Main and Supplementary Bonding",
        content: "Protective bonding connects extraneous conductive parts (such as metal pipes and structural parts) to the main earthing terminal to prevent dangerous potential differences during fault conditions. Main protective bonding connects water, gas, and other services as they enter the building. Supplementary bonding may be required in special locations such as bathrooms, connecting all simultaneously accessible exposed and extraneous conductive parts. Bonding conductors must be properly sized based on the main supply conductors and correctly identified with green/yellow sleeving. Proper implementation of bonding is essential for protection against electric shock in fault conditions.",
        keyPoints: [
          "Main bonding connects metallic services at their point of entry",
          "Bonding conductor sizes are determined by supply conductor size",
          "Supplementary bonding is required in high-risk locations",
          "Bonding creates equipotential zones to prevent dangerous voltage differences"
        ]
      },
      {
        id: "8.3",
        title: "Testing and Verification",
        content: "Testing and verification of earthing and bonding systems is essential to confirm their effectiveness. Key tests include earth electrode resistance measurement (for TT systems), earth fault loop impedance testing (to verify disconnection times can be met), and continuity testing of protective conductors, bonding conductors, and ring circuit continuity. These tests must be performed using calibrated test equipment and following safe testing procedures. Results should be compared with the maximum values permitted by BS 7671. Proper documentation of these test results forms a crucial part of the electrical installation certificate and provides evidence that the installation's safety systems will function as intended.",
        keyPoints: [
          "Earth electrode resistance must be low enough for protection to operate",
          "Earth fault loop impedance must meet required values for disconnection times",
          "Continuity of protective conductors ensures fault current path integrity",
          "Test results must be recorded on appropriate certification documents"
        ]
      }
    ]
  }
};
