
import { SectionData } from './types';

export const safeWorkingPracticesSection: SectionData = {
  sectionNumber: "6",
  title: "Safe Working Practices",
  content: {
    sectionNumber: "6",
    title: "Safe Working Practices",
    description: "Demonstrating the application of health and safety knowledge in practical electrical installation tasks.",
    icon: "safety",
    isMainSection: true,
    subsections: [
      {
        id: "6.1",
        title: "Personal Protective Equipment",
        content: "Personal Protective Equipment (PPE) is crucial for electrical work safety, providing the last line of defense against residual risks. Proper selection is essential, with different tasks requiring specific protection. Insulated tools must conform to BS EN 60900, with insulation rated for the maximum voltage present (typically 1000V AC for most installation work) and inspected before each use for damage that might compromise protection. Voltage-rated gloves must be appropriately specified (Class 00 - 500V or Class 0 - 1000V for most work) and undergo both visual inspection and air testing (inflating to check for punctures) before use. Safety eyewear is essential for protection against flying particles during drilling or cutting and against UV radiation from arc flashes, with different types (safety glasses, goggles, or face shields) selected based on the specific hazard. Arc flash protective clothing becomes necessary for work on systems with high fault levels, with clothing rated in cal/cm² according to the potential incident energy. The level of protection required should be determined by arc flash risk assessment, considering the system's available fault current and disconnection time. Head protection is required on construction sites and when working below other trades, while safety footwear should have ankle support for uneven surfaces and appropriate electrical resistance properties. Hearing protection is necessary when using noisy equipment or working in high-noise environments. All PPE requires proper maintenance, with regular inspection, cleaning, and replacement when damaged or degraded. Workers must be trained in correct use, including pre-use checks, proper fitting, and limitations. PPE should be stored in clean, dry conditions away from contaminants, sunlight, and extreme temperatures that could degrade protective properties.",
        keyPoints: [
          "Selection of appropriate PPE for different electrical tasks",
          "Proper use and maintenance of insulated tools and gloves",
          "Arc flash protective clothing requirements",
          "Eye and face protection for electrical work",
          "Storage and inspection requirements for electrical PPE"
        ]
      },
      {
        id: "6.2",
        title: "Safe Work Procedures",
        content: "Established safe work procedures ensure consistency and thoroughness in electrical safety practices. Permit-to-work systems provide formal authorization and control for high-risk electrical tasks, particularly those involving work on or near live equipment, confined spaces, or complex isolations. A proper permit system defines the work scope precisely, identifies hazards, specifies precautions, clarifies responsibilities, and requires formal handover when work is complete. Lock-out/tag-out procedures extend beyond basic isolation, requiring each worker to apply their personal lock to isolation points, ensuring equipment cannot be energized while they're working on it. This is particularly important when multiple teams work on different parts of the same system. For complex systems, a hasp allowing multiple locks may be used, or a lock box system where isolation keys are secured in a box to which each worker applies their personal lock. Emergency response procedures must be established before work begins, including methods for contacting emergency services, location of first aid facilities, evacuation routes, assembly points, and specific protocols for electrical injuries. Workers should be trained in emergency first aid for electrical incidents, including safe rescue from live contact and CPR. Working alone on electrical systems presents additional risks, requiring specific protocols such as regular check-in procedures, panic alarms, or motion sensors that trigger alerts if no movement is detected for a set period. Communication requirements for safe work include pre-task briefings where procedures are reviewed and questions addressed, interim checks during complex or lengthy tasks, and post-work debriefing to identify any issues encountered. Documentation of safe work procedures should be accessible, regularly updated, and used as training material for new workers, with procedures reviewed after incidents or near misses to identify potential improvements.",
        keyPoints: [
          "Permit-to-work systems for high-risk electrical work",
          "Lock-out/tag-out procedures for equipment isolation",
          "Emergency response procedures for electrical incidents",
          "Working alone protocols and communication requirements",
          "Documentation and training for safe work procedures"
        ]
      },
      {
        id: "6.3",
        title: "Tool and Equipment Safety",
        content: "Proper handling and maintenance of tools is fundamental to electrical work safety. Inspection requirements vary by tool type but generally include checking for damage to casings, insulation, and cables; ensuring guards and safety features function correctly; and verifying that moving parts operate smoothly. Portable Appliance Testing (PAT) should be conducted according to a risk-based schedule, with equipment used on construction sites typically requiring more frequent testing (every 3 months) than office-based equipment. PAT testing includes visual inspection, earth continuity tests, insulation resistance tests, and functional checks. Documentation must record test dates, results, next test due dates, and any repairs or failures. Testing should be performed by competent persons with appropriate training and test equipment. Storage significantly affects tool safety and longevity; tools should be kept in cases or bags that prevent damage during transport, stored in dry conditions to prevent corrosion and insulation degradation, and organized to prevent tangled cables or accessories being lost. Transportation of tools between sites requires secure methods to prevent damage from movement or vibration. Battery-powered tools offer significant safety advantages for electrical work, eliminating trailing cables that create trip hazards and removing the risk of cutting through power cords. They also reduce the need for extension leads in wet environments, decreasing electric shock risk. However, battery charging stations must be set up safely, away from flammable materials and with sufficient ventilation. Damaged or defective tools must be immediately removed from service, labeled as defective, and either repaired by competent persons or replaced. Common electrical tool hazards include damaged insulation on casings or cables, exposed live parts due to missing screws or broken casings, incorrect fuse ratings, and bypassed safety features.",
        keyPoints: [
          "Inspection requirements for electrical tools",
          "PAT testing schedules and documentation",
          "Storage and transportation of tools to prevent damage",
          "Battery-powered vs. corded tools safety considerations",
          "Procedures for dealing with damaged or defective equipment"
        ]
      },
      {
        id: "6.4",
        title: "Housekeeping Practices",
        content: "Good housekeeping significantly reduces accidents in electrical work environments and improves efficiency. Cable management is crucial, with temporary cables routed to avoid trip hazards, protected from damage, and secured at appropriate intervals. Cable covers or mats should be used where cables must cross walkways, and suspended cables should have sufficient clearance height. Cables should be inspected regularly for damage to insulation or connectors. Material storage on job sites requires careful planning, with heavy items stored at waist height to reduce manual handling risks. Flammable materials, including many solvents used in electrical work, require ventilated storage away from ignition sources, with quantities kept to the minimum necessary. Components and fittings should be organized in clearly labeled containers to prevent time wasted searching and to ensure correct parts are used. Waste disposal procedures must address specific electrical materials: copper and other metals should be segregated for recycling; fluorescent tubes and other mercury-containing waste require specialist disposal due to hazardous content; electronic waste falls under WEEE regulations and must be disposed of accordingly; and packaging materials should be minimized and recycled where possible. End-of-day cleanup protocols should be established, including power tool disconnection and secure storage, returning all tools to storage cases, removing waste materials, securing the work area against unauthorized access, and conducting a final check for potential hazards such as exposed conductors or unstable materials. On construction sites, designated waste collection points should be established and regularly cleared. Spills of any liquids should be cleaned immediately, as even non-hazardous liquids can create slip hazards or damage to electrical equipment. The workspace should be maintained with clear access to distribution boards, fire exits, and emergency equipment at all times.",
        keyPoints: [
          "Cable management techniques to prevent trips and falls",
          "Material storage practices on job sites",
          "Waste disposal procedures for electrical materials",
          "End-of-day cleanup protocols",
          "Maintaining clear access to emergency equipment and exits"
        ]
      }
    ]
  }
};
