
import { SectionData } from '../healthAndSafety/types';

export const electricalTheorySection: SectionData = {
  sectionNumber: "04",
  title: "Electrical Theory and Technology",
  content: {
    sectionNumber: "04",
    title: "Electrical Theory and Technology",
    description: "This unit explores the fundamental principles of electrical theory, technology, and applications for electrical installation work.",
    icon: "bulb",
    isMainSection: true,
    subsections: [
      {
        id: "1",
        title: "Basic Electrical Principles",
        content: "Electrical theory is built on fundamental principles about how electricity works. Electrical current is the flow of electrons through a conductor, measured in amperes (A). Voltage, measured in volts (V), is the electrical pressure that drives current flow. Resistance, measured in ohms (Ω), opposes the flow of current. These three quantities are related by Ohm's Law, which states that voltage equals current multiplied by resistance (V = I × R). Electrical power, measured in watts (W), is calculated by multiplying voltage and current (P = V × I). Understanding these relationships is essential for designing, installing, and troubleshooting electrical systems safely and effectively.",
        keyPoints: [
          "Define electrical current, voltage, and resistance",
          "Apply Ohm's Law to calculate circuit values",
          "Calculate electrical power using relevant formulas",
          "Understand the relationship between electrical quantities"
        ]
      },
      {
        id: "2",
        title: "AC and DC Systems",
        content: "Electrical systems operate using either alternating current (AC) or direct current (DC). AC is characterised by current that periodically changes direction, typically in a sinusoidal waveform at 50Hz in the UK. Most power distribution and domestic systems use AC because it can be efficiently transmitted over long distances and its voltage can be easily changed using transformers. DC flows in one direction only and is used in batteries, electronic devices, and some specialised applications. Understanding the differences between these systems is crucial for electricians, as they require different installation methods, protection devices, and calculation approaches. Modern installations often include both AC mains supply and DC components such as LED lighting, solar photovoltaic systems, and battery storage.",
        keyPoints: [
          "Differentiate between alternating current (AC) and direct current (DC)",
          "Explain the generation and characteristics of single-phase and three-phase supplies",
          "Calculate values in AC circuits including power factor and reactive components",
          "Identify applications suitable for AC and DC systems"
        ]
      },
      {
        id: "3",
        title: "Electrical Circuits",
        content: "Electrical circuits provide controlled paths for current flow to perform useful work. Series circuits have components connected end-to-end, sharing the same current but dividing the voltage. Parallel circuits have components connected across the same voltage points, with current dividing between paths. Circuit design must consider both normal operation and fault conditions. Protective devices like fuses, circuit breakers, and RCDs (Residual Current Devices) are integrated into circuits to provide overload, short-circuit, and shock protection. Understanding circuit principles allows electricians to properly size conductors, select appropriate protection devices, and ensure the safe and efficient operation of electrical systems.",
        keyPoints: [
          "Design and analyse series and parallel circuits",
          "Calculate values in complex circuits using Kirchhoff's Laws",
          "Identify appropriate protective devices for different circuit applications",
          "Troubleshoot common circuit faults using systematic procedures"
        ]
      },
      {
        id: "4",
        title: "Installation Methods",
        content: "Electrical installation methods encompass the techniques, materials, and practices used to safely and effectively install electrical systems in buildings. Proper installation begins with selecting the appropriate wiring systems for the environment and application, such as conduit, trunking, or cable trays. Cable selection is based on factors including current-carrying capacity, voltage drop, and environmental conditions. Installation must follow specific zones in walls and ceilings to prevent damage to concealed cables. All work must comply with BS 7671 (IET Wiring Regulations) requirements for selection and erection of equipment, ensuring systems are safe from mechanical damage, environmental hazards, and electrical faults.",
        keyPoints: [
          "Select appropriate wiring systems and enclosures for different environments",
          "Install cables according to regulatory requirements and best practices",
          "Apply proper termination techniques to ensure reliable connections",
          "Test installations to verify compliance with safety standards"
        ]
      },
      {
        id: "5",
        title: "Regulations and Standards",
        content: "Electrical installations are governed by extensive regulations and standards to ensure safety and performance. BS 7671 (IET Wiring Regulations) provides comprehensive requirements for electrical installations and is the primary technical standard in the UK. It covers all aspects from design and selection to inspection and testing. The Electricity at Work Regulations 1989 places legal duties on employers and individuals to ensure electrical safety in workplaces. Building Regulations Part P governs domestic electrical installations, requiring notification of certain work to building control authorities. Professional bodies like the IET and NICEIC provide additional guidance documents and maintain registration schemes for competent persons. Understanding and applying these regulations is fundamental to compliant electrical installation work.",
        keyPoints: [
          "Apply requirements of BS 7671 to electrical installations",
          "Understand the legal framework established by the Electricity at Work Regulations",
          "Follow Building Regulations Part P requirements for domestic installations",
          "Access and interpret appropriate guidance documents and standards"
        ]
      },
      {
        id: "6",
        title: "Testing and Verification",
        content: "Testing and verification ensure that electrical installations are safe to use and comply with relevant regulations. The process includes both visual inspection and instrument testing. Visual inspection identifies obvious defects and non-compliance before power is applied. Initial verification testing includes continuity testing of protective conductors, insulation resistance measurement, polarity verification, earth fault loop impedance testing, and RCD operation verification. All test results must be recorded on appropriate certification, including the Electrical Installation Certificate or Minor Works Certificate. The testing regime follows a logical sequence designed to first confirm safety before progressively applying power to the installation. Understanding proper test procedures and interpretation of results is essential for electricians.",
        keyPoints: [
          "Conduct comprehensive visual inspection before instrument testing",
          "Perform required tests in the correct sequence using appropriate test equipment",
          "Interpret test results against acceptable parameters",
          "Complete required certification documentation accurately"
        ]
      },
      {
        id: "7",
        title: "Environmental Technology",
        content: "Environmental technology in electrical installations focuses on energy efficiency and renewable systems. Modern electrical installations increasingly incorporate technologies like LED lighting, which uses up to 90% less energy than traditional incandescent lighting while providing longer service life. Renewable energy systems such as solar photovoltaic installations convert sunlight directly into electricity, reducing carbon emissions and energy costs. Heat pumps use electrical energy efficiently to move heat from one place to another, typically providing 3-4 units of heat energy for each unit of electrical energy consumed. Smart control systems optimise energy usage by scheduling loads during off-peak periods or when renewable generation is available. Understanding these technologies enables electricians to contribute to more sustainable building services.",
        keyPoints: [
          "Explain principles of energy efficiency in electrical installations",
          "Understand renewable energy systems including solar photovoltaic installations",
          "Describe heat pump technology and applications",
          "Implement smart control systems for energy management"
        ]
      }
    ]
  }
};

