
import { SectionData } from '../healthAndSafety/types';

export const inspectionTestingSection: SectionData = {
  sectionNumber: "6",
  title: "Inspection, Testing & Fault Finding (Introductory)",
  content: {
    introduction: "Basic principles and methods of electrical inspection, testing, and fault finding.",
    sectionNumber: "6",
    title: "Inspection, Testing & Fault Finding (Introductory)",
    description: "Basic principles and methods of electrical inspection, testing, and fault finding.",
    icon: "list",
    isMainSection: true,
    subsections: [
      {
        id: "6.1",
        title: "Basics of Continuity, Insulation Resistance",
        content: "Electrical testing is essential to verify the safety and performance of installations. Continuity testing checks that conductors form a complete path without excessive resistance. This applies to circuit protective conductors, main and supplementary bonding, and ring final circuit conductors. Insulation resistance testing verifies that insulation between live conductors and earth is sufficient to prevent dangerous leakage currents. These tests use specific test equipment and procedures as detailed in BS 7671 to ensure installations are safe before energization.",
        keyPoints: [
          "Continuity testing verifies complete paths with acceptable resistance",
          "Insulation resistance testing confirms adequate separation between conductors",
          "Minimum acceptable insulation resistance is typically 1MΩ for low voltage circuits",
          "Tests must be conducted in a safe, de-energized state following correct procedures"
        ]
      },
      {
        id: "6.2",
        title: "Test Instruments and Safety Precautions",
        content: "Testing electrical installations requires specific instruments that must be properly selected, used, and maintained. Common test instruments include multifunction testers, insulation resistance testers, earth loop impedance testers, and RCD testers. Before testing, circuits must be safely isolated, and appropriate precautions taken to prevent electric shock. Test instruments must comply with safety standards and be regularly calibrated. Safety during testing is paramount, requiring proper planning, risk assessment, and adherence to safe working procedures.",
        keyPoints: [
          "Test instruments must comply with BS EN 61557 and be regularly calibrated",
          "Verification of test instrument functionality before and after testing",
          "Proper test methods and sequence as specified in BS 7671",
          "Safety precautions including isolation, locking off, and verification of dead state"
        ]
      },
      {
        id: "6.3",
        title: "Common Faults and How to Identify Them",
        content: "Fault finding is a systematic process of identifying and locating electrical problems. Common faults include open circuits, short circuits, high resistance connections, and insulation breakdown. Effective fault finding requires understanding of circuit operation, systematic testing, and logical deduction. Visual inspection can identify obvious issues like damaged insulation or loose connections. Measurement and testing can locate less visible faults. Documentation and recording of fault conditions and remedial actions are important parts of the maintenance process.",
        keyPoints: [
          "Common faults: open circuit, short circuit, high resistance connections, earth leakage",
          "Systematic approach: visual inspection, testing, and logical reasoning",
          "Circuit diagrams and documentation aid in effective fault finding",
          "Thermal imaging and advanced diagnostics for complex installations"
        ]
      }
    ]
  }
};
