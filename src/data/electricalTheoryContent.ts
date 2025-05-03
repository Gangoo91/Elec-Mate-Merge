
import { SectionData } from './healthAndSafety/types';

export const electricalTheoryContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Basic Electrical Theory",
    content: {
      icon: "info",
      subsections: [
        {
          id: "1.1",
          title: "Voltage, Current, Resistance, and Power Relationships",
          content: "Electrical theory forms the foundation of all electrical work. Understanding the relationship between voltage, current, resistance and power is essential for any electrical installation professional. Voltage (V) is the electrical pressure or potential difference between two points, measured in volts. Current (I) is the flow of electrical charge, measured in amperes (amps). Resistance (R) is the opposition to current flow, measured in ohms (Ω). Power (P) is the rate of energy conversion, measured in watts (W).",
          keyPoints: [
            "Voltage is measured in volts (V) and represents electrical pressure",
            "Current is measured in amperes (A) and represents the flow of electrical charge",
            "Resistance is measured in ohms (Ω) and represents opposition to current flow",
            "Power is measured in watts (W) and represents the rate of energy conversion"
          ]
        },
        {
          id: "1.2",
          title: "Ohm's Law and Power Law",
          content: "Ohm's Law defines the relationship between voltage, current, and resistance. It states that the current flowing through a conductor is directly proportional to the voltage and inversely proportional to the resistance. This is expressed as I = V/R, where I is current, V is voltage, and R is resistance. The formula can be rearranged to V = I×R or R = V/I. Power Law describes how power relates to voltage and current, expressed as P = V×I. Using Ohm's Law, we can derive alternate forms: P = I²×R and P = V²/R.",
          keyPoints: [
            "Ohm's Law: I = V/R, V = I×R, R = V/I",
            "Power Law: P = V×I, P = I²×R, P = V²/R",
            "These formulas form the basis of all electrical circuit calculations",
            "Understanding these relationships is crucial for sizing circuits correctly"
          ]
        },
        {
          id: "1.3",
          title: "Series and Parallel Circuits",
          content: "Circuits can be configured in series, parallel, or a combination of both. In a series circuit, components are connected end-to-end, creating a single path for current. In a series circuit, the current is the same throughout the circuit, but the voltage is divided across components. In a parallel circuit, components are connected across common points, creating multiple paths for current. In a parallel circuit, the voltage is the same across each branch, but the current divides between the branches. Understanding the differences is crucial for circuit design and fault finding.",
          keyPoints: [
            "Series circuits: current is constant, voltage divides, resistances add (Rtotal = R1 + R2 + ...)",
            "Parallel circuits: voltage is constant, current divides, resistances combine as 1/Rtotal = 1/R1 + 1/R2 + ...",
            "Most practical installations use a combination of series and parallel configurations",
            "Circuit analysis techniques apply these principles to solve complex circuits"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "AC and DC Supplies",
    content: {
      icon: "construction",
      subsections: [
        {
          id: "2.1",
          title: "Differences between AC and DC",
          content: "Alternating Current (AC) and Direct Current (DC) are the two fundamental forms of electricity. AC periodically reverses direction, following a sinusoidal waveform, while DC flows in one direction consistently. Most power generation and distribution systems use AC because it's easier to transform to different voltage levels, while most electronic devices internally use DC. Modern electrical installations often involve both AC and DC components, with conversion between them handled by rectifiers, inverters, and power supplies.",
          keyPoints: [
            "AC changes direction and magnitude periodically, typically 50Hz in the UK",
            "DC maintains a constant direction and often a steady magnitude",
            "AC is easier to transmit over long distances and transform to different voltages",
            "DC is used in batteries, electronics, and certain specialized applications"
          ]
        },
        {
          id: "2.2",
          title: "Single-phase and Three-phase Systems",
          content: "Electrical supplies are categorized as single-phase or three-phase. Single-phase supplies consist of one alternating voltage, typically used in domestic settings. Three-phase supplies consist of three alternating voltages, offset by 120° from each other, commonly used in industrial and commercial settings. Three-phase systems are more efficient for powering large motors and heavy loads, as they provide more consistent power delivery and can transmit more power with less conductor material.",
          keyPoints: [
            "Single-phase: 230V nominal in the UK, used in most domestic properties",
            "Three-phase: 400V nominal in the UK (phase to phase), used in commercial/industrial settings",
            "Three-phase provides more consistent power delivery and higher capacity",
            "Three-phase motors are more efficient and smaller than equivalent single-phase motors"
          ]
        },
        {
          id: "2.3",
          title: "Frequency and Waveforms",
          content: "The frequency of AC power describes how many complete cycles occur per second, measured in Hertz (Hz). In the UK, the standard frequency is 50Hz. The waveform describes the shape of the voltage or current over time. Sinusoidal waveforms are most common in power systems, but electronic equipment may generate or require other waveforms like square, triangle, or sawtooth patterns. Understanding waveform characteristics is important for diagnosing power quality issues and harmonics.",
          keyPoints: [
            "UK standard frequency is 50Hz (50 cycles per second)",
            "Sinusoidal waveforms are standard for power distribution",
            "Non-sinusoidal waveforms can cause harmonics and power quality issues",
            "Oscilloscopes are used to visualize and analyze waveforms in electrical systems"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "3",
    title: "Circuit Types and Components",
    content: {
      icon: "safety",
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
  },
  {
    sectionNumber: "4",
    title: "Electrical Installation Practices",
    content: {
      icon: "construction",
      subsections: [
        {
          id: "4.1",
          title: "Cable Types and Selection",
          content: "Selecting the appropriate cable for an installation is critical for safety and performance. Common types include flat twin and earth (6242Y), single core (6491X), and armored cables (SWA). Factors influencing selection include current-carrying capacity, voltage drop, installation method, environmental conditions, and mechanical protection requirements. Cables must be sized correctly to carry the design current without excessive voltage drop or overheating. BS 7671 provides detailed tables for determining appropriate cable sizes based on installation conditions.",
          keyPoints: [
            "Common domestic cables: 6242Y (flat twin and earth), 6491X (singles in conduit)",
            "SWA (Steel Wire Armored) for external or harsh environments",
            "Cable selection factors: current capacity, voltage drop, installation method, environment",
            "Conductor identification: brown (live), blue (neutral), green/yellow (earth)"
          ]
        },
        {
          id: "4.2",
          title: "Installation Methods (Trunking, Conduit, Cable Tray)",
          content: "Electrical containment systems provide physical protection and organized routing for cables. Trunking is a rectangular enclosure with a removable lid, available in various sizes and materials. Conduit is a tube system for cable protection, available in metal or plastic variants. Cable tray provides an open support system for larger cable runs. Each system has specific installation requirements regarding supports, bends, and accessories. Selection depends on the environment, aesthetics, future expansion needs, and protection requirements.",
          keyPoints: [
            "Trunking: rectangular PVC or metal enclosure with removable cover",
            "Conduit: PVC or metal tubing system with various fittings",
            "Cable tray: open support system for larger installations",
            "Factors in selection: environment, appearance, future expansion, protection level required"
          ]
        },
        {
          id: "4.3",
          title: "Enclosures and Containment Systems",
          content: "Electrical enclosures house connection points, control devices, and distribution equipment. They provide protection against environmental factors and prevent access to live parts. Enclosures are rated using IP (Ingress Protection) codes that indicate protection against solid objects and water. For example, IP44 provides protection against objects over 1mm and splashing water. The first digit (0-6) indicates protection against solid objects, while the second digit (0-8) indicates protection against liquids. Selection should consider the installation environment, access requirements, and protection needs.",
          keyPoints: [
            "IP ratings specify enclosure protection: first digit for solids, second for liquids",
            "Common ratings: IP20 (indoor), IP44 (splash-proof), IP65 (dust-tight and water jets)",
            "Consumer units require specific fireproof enclosures",
            "Enclosure selection based on environment, accessibility, and equipment requirements"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "5",
    title: "Regulations and Standards",
    content: {
      icon: "section",
      subsections: [
        {
          id: "5.1",
          title: "Introduction to BS 7671 (IET Wiring Regulations)",
          content: "BS 7671, commonly known as the IET Wiring Regulations, is the national standard for electrical installations in the UK. Currently in its 18th Edition, it provides comprehensive requirements for the design, installation, inspection, and testing of electrical installations. The regulations are divided into seven parts, covering fundamental principles, definitions, assessment, protection, selection of equipment, inspection and testing, and special installations. Compliance with BS 7671 is essential for ensuring electrical safety and is referenced by building regulations.",
          keyPoints: [
            "BS 7671 (18th Edition) is the UK standard for electrical installations",
            "Seven parts covering all aspects from design to verification",
            "Not legally binding itself, but often required to comply with other legislation",
            "Updated approximately every 3 years with amendments between editions"
          ]
        },
        {
          id: "5.2",
          title: "Building Regulations Part P",
          content: "Building Regulations Part P applies to electrical installations in domestic premises in England and Wales. It states that electrical installations must be designed and installed so as to protect people from fire and electric shock. Under Part P, certain electrical work must be notified to the local building control authority, unless carried out by a registered competent person scheme member (such as NICEIC, ELECSA, or NAPIT). Work that requires notification includes new circuits, work in special locations like bathrooms, and consumer unit replacements.",
          keyPoints: [
            "Legal requirement for domestic electrical installations in England and Wales",
            "Requires notification of certain electrical work to building control",
            "Work can be self-certified by registered competent persons",
            "Special locations (e.g., bathrooms, swimming pools) have additional requirements"
          ]
        },
        {
          id: "5.3",
          title: "Manufacturer Instructions and Industry Standards",
          content: "In addition to wiring regulations, electrical installations must comply with manufacturer instructions and relevant industry standards. Manufacturer instructions provide specific guidance for the installation, operation, and maintenance of electrical equipment. Deviating from these instructions may void warranties and create safety hazards. Industry standards from organizations like British Standards Institute (BSI) provide additional specifications for particular installations or equipment. These include standards for specific types of equipment, installation practices, and testing procedures.",
          keyPoints: [
            "Manufacturer instructions must be followed for correct installation and warranty validity",
            "British Standards provide additional requirements for specific situations",
            "Industry best practices complement regulatory requirements",
            "Documentation of compliance is an important part of professional installation"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "6",
    title: "Inspection, Testing & Fault Finding (Introductory)",
    content: {
      icon: "list",
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
  },
  {
    sectionNumber: "7",
    title: "Environmental Considerations",
    content: {
      icon: "info",
      subsections: [
        {
          id: "7.1",
          title: "Energy Efficiency in Installations",
          content: "Electrical installations have significant environmental impact through energy consumption. Energy-efficient installations incorporate proper cable sizing to minimize losses, efficient lighting systems such as LED technology, and control systems that reduce unnecessary usage. Voltage optimization can improve efficiency and equipment lifespan. Power factor correction reduces reactive power and associated losses. Smart metering and monitoring systems provide data to identify improvement opportunities. These measures not only reduce environmental impact but also lower operating costs for clients.",
          keyPoints: [
            "Proper cable sizing reduces resistive losses and voltage drop",
            "LED lighting typically uses 75-80% less energy than incandescent lighting",
            "Automatic controls (PIR sensors, timers) minimize unnecessary energy usage",
            "Monitoring systems identify usage patterns and opportunities for improvement"
          ]
        },
        {
          id: "7.2",
          title: "Use of Sustainable Materials",
          content: "The environmental impact of electrical installations extends to the materials used. Low-smoke zero-halogen (LSZH) cables provide safer operation in fire conditions with reduced toxic emissions. Recyclable metals and plastics reduce landfill waste and resource consumption. PVC-free materials avoid potential environmental contamination. Manufacturers increasingly provide Environmental Product Declarations (EPDs) detailing the lifecycle impact of products. Responsible material selection and end-of-life disposal or recycling are important considerations for sustainable electrical installations.",
          keyPoints: [
            "Low-smoke zero-halogen cables reduce toxic emissions in fire conditions",
            "Recyclable components minimize waste and resource consumption",
            "Consideration of product lifespan and durability in material selection",
            "Proper disposal and recycling of electrical equipment at end-of-life"
          ]
        },
        {
          id: "7.3",
          title: "Minimising Environmental Impact",
          content: "Beyond material selection and energy efficiency, electrical installations can be designed to minimize environmental impact through various strategies. Renewable energy integration, such as solar PV systems, reduces dependence on fossil fuels. Smart systems and load management optimize energy use and enable demand response. Efficient space utilization of equipment and containment systems reduces material usage. Modular designs facilitate future upgrades with minimal waste. Proper commissioning ensures systems operate at optimal efficiency, and documentation enables effective maintenance throughout the installation's life.",
          keyPoints: [
            "Integration with renewable energy systems reduces carbon footprint",
            "Smart systems optimize energy usage based on demand and availability",
            "Efficient design minimizes material usage and installation waste",
            "Proper maintenance ensures continued efficiency throughout system lifecycle"
          ]
        }
      ]
    }
  }
];

