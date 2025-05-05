
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
        title: "Legislation and Regulations",
        content: "Understanding the laws and guidelines that govern electrical installation work is fundamental to being an electrician. Legislation such as the Electricity at Work Regulations 1989 establishes legal duties for employers and electricians. BS 7671 (IET Wiring Regulations) provides comprehensive technical standards for electrical installations in the UK. Building Regulations Part P covers domestic electrical installations, requiring notification of certain work. Health and Safety at Work Act 1974 sets out general duties for workplace safety. The Electricity Safety, Quality and Continuity Regulations 2002 govern the supply of electricity to premises. Understanding these regulations is essential for compliant and safe electrical work.",
        keyPoints: [
          "Understand the Electricity at Work Regulations 1989",
          "Apply requirements of BS 7671 (IET Wiring Regulations)",
          "Comply with Building Regulations Part P",
          "Follow Health and Safety legislation"
        ]
      },
      {
        id: "2",
        title: "Technical Information",
        content: "Interpreting and utilizing technical data is essential for electrical installation work. Electricians must be able to read and understand wiring diagrams, circuit schematics, equipment specifications, and installation manuals. Technical information includes electrical symbols that represent components in diagrams, calculation tables for determining cable sizes and voltage drop, manufacturers' data sheets for specific products, and installation guides. The ability to access, interpret and apply this technical information ensures installations are performed correctly, safely, and in compliance with standards. Keeping up-to-date with technical developments is also important as products and standards evolve.",
        keyPoints: [
          "Interpret wiring diagrams and circuit schematics",
          "Read and understand electrical symbols",
          "Apply manufacturers' technical specifications",
          "Use calculation tables for installation design"
        ]
      },
      {
        id: "3",
        title: "Wiring Systems",
        content: "Wiring systems form the backbone of electrical installations, each with specific properties, applications, and limitations. Common systems include PVC-insulated cable installations in conduit or trunking, mineral-insulated copper-clad cables for fire-resistant circuits, armored cables for external or harsh environments, and cable tray or basket systems for multiple cable runs. Selection factors include environmental conditions, installation requirements, fire performance needs, and cost considerations. Each system has specific installation methods and fixing requirements to ensure safety and longevity. Understanding the appropriate application of different wiring systems is crucial for creating safe and effective electrical installations that meet the specific needs of each project.",
        keyPoints: [
          "Compare properties of different cable types and wiring systems",
          "Select appropriate wiring systems for specific applications",
          "Understand installation methods for various systems",
          "Identify limitations and environmental considerations"
        ]
      },
      {
        id: "4",
        title: "Service Position Equipment",
        content: "The service position is where electricity enters a building, containing critical components for safe power distribution. Typical equipment includes the service head (where the supply cable enters), meter equipment (for measuring consumption), distribution boards (consumer units), main switches, and protective devices. The layout must provide safe access for operation and maintenance. The service position must be located to minimize fire risk, be easily accessible, and contain equipment suitable for the installation's maximum demand. Understanding the general layout and function of service position equipment is essential for ensuring a safe electrical installation from the point of supply to the final circuits.",
        keyPoints: [
          "Identify the main components at a typical service position",
          "Understand the function of consumer units/distribution boards",
          "Recognize metering arrangements and supply characteristics",
          "Apply regulations related to service position installations"
        ]
      },
      {
        id: "5",
        title: "Lighting Circuits",
        content: "Lighting circuits are fundamental components of electrical installations, providing illumination throughout buildings. Standard configurations include one-way switching (control from a single location), two-way switching (control from two locations), and intermediate switching (control from three or more locations). Circuits typically operate at 230V and are protected by MCBs or fuses, usually rated at 6A or 10A. Circuit design must consider factors such as the number of lighting points, switching arrangements, control systems (such as dimmers or presence detectors), and energy efficiency. Modern installations increasingly incorporate LED lighting and smart control systems, which present different electrical characteristics and design considerations compared to traditional lighting methods.",
        keyPoints: [
          "Understand one-way, two-way, and intermediate switching arrangements",
          "Identify different lighting circuit configurations",
          "Calculate maximum number of lighting points per circuit",
          "Apply energy efficiency considerations to lighting design"
        ]
      },
      {
        id: "6",
        title: "Ring and Radial Circuits",
        content: "Ring and radial final circuits are the two main configurations used for socket outlets in UK electrical installations. Ring circuits (also called ring mains) start and end at the same point in the consumer unit, forming a loop through socket outlets, and are typically protected by a 30/32A device. They allow for more socket outlets than radial circuits due to their design. Radial circuits branch out from the consumer unit in a single line and are usually protected by a 20A or 32A device depending on the installation requirements. Each type has specific advantages, limitations, and installation requirements regarding cable sizes, number of socket outlets permitted, and floor area coverage. Understanding these circuit types is essential for designing effective power distribution systems within buildings.",
        keyPoints: [
          "Compare ring and radial circuit configurations and applications",
          "Calculate the number of socket outlets permitted on different circuits",
          "Determine appropriate circuit protective device ratings",
          "Recognize the advantages and limitations of each circuit type"
        ]
      },
      {
        id: "7",
        title: "Circuit Requirements",
        content: "Basic requirements for circuit design and implementation ensure electrical systems function safely and effectively. Circuits must be sized according to their intended load, with appropriate cable sizing to prevent overheating. Protection devices must be correctly rated to protect against overcurrent while allowing normal operation. Disconnection times for fault protection must meet regulatory requirements to ensure safety. Circuits should be divided logically to prevent widespread outages from single faults and to facilitate maintenance. Installation practices must follow regulations regarding cable routes, support methods, and protection from mechanical damage. Understanding these requirements is fundamental to creating safe, reliable electrical installations that comply with BS 7671.",
        keyPoints: [
          "Determine appropriate cable sizes based on load and installation method",
          "Select correct protective devices for different circuit types",
          "Apply disconnection time requirements for fault protection",
          "Follow regulatory requirements for circuit installation"
        ]
      },
      {
        id: "8",
        title: "Earthing and Bonding",
        content: "Earthing and bonding are critical safety systems in electrical installations, providing protection against electric shock and fire risks from fault conditions. Earthing connects exposed conductive parts of electrical equipment to the general mass of Earth, creating a path for fault current. Main protective bonding connects extraneous conductive parts (like metal pipes) to the main earthing terminal, preventing dangerous potential differences during fault conditions. The earthing system type (TN-S, TN-C-S, TT) determines specific installation requirements. Supplementary bonding may be required in special locations such as bathrooms. Proper testing of earthing and bonding connections is essential to verify their effectiveness. These systems are fundamental to electrical safety and must be correctly designed, installed, and maintained.",
        keyPoints: [
          "Understand different earthing system types (TN-S, TN-C-S, TT)",
          "Identify requirements for main protective bonding",
          "Apply supplementary bonding in special locations",
          "Test earthing and bonding systems for effectiveness"
        ]
      },
      {
        id: "9",
        title: "Overcurrent Protection",
        content: "Overcurrent protection is essential to safeguard electrical installations from damage and fire risks caused by excessive current flow. Protection devices include fuses and circuit breakers that automatically disconnect the supply when current exceeds safe levels. Overcurrent can occur due to overload (too many appliances) or short-circuit (direct connection between live conductors). Protection devices must be correctly rated for the circuit's current-carrying capacity and coordinated to ensure discrimination (selective operation). Modern installations often use RCBOs (Residual Current Circuit Breakers with Overcurrent protection) that combine overcurrent protection with additional personal protection against electric shock. Understanding the principles and correct application of overcurrent protection is vital for creating safe electrical installations.",
        keyPoints: [
          "Distinguish between overload and short-circuit protection",
          "Select appropriate protective devices based on circuit characteristics",
          "Apply discrimination principles in protection schemes",
          "Understand the operation of different types of protective devices"
        ]
      },
      {
        id: "10",
        title: "Circuit Design",
        content: "Electrical circuit design involves creating systems that safely and efficiently distribute power to meet the needs of a building's occupants. Fundamental design considerations include determining maximum demand, diversity factors, and load assessment to correctly size the supply and distribution equipment. Cable sizing calculations must account for current-carrying capacity, voltage drop, and thermal constraints. Protection schemes must provide appropriate overcurrent protection and fault protection that meets required disconnection times. Circuit arrangement should provide logical separation of loads, with consideration for maintainability and future expansion. Special locations like bathrooms or external areas have additional design requirements. Good circuit design balances safety, regulatory compliance, efficiency, and cost-effectiveness.",
        keyPoints: [
          "Calculate maximum demand and apply diversity factors",
          "Design circuits to meet voltage drop requirements",
          "Apply protection requirements for different installation types",
          "Create logical circuit arrangements for effective distribution"
        ]
      }
    ]
  }
};
