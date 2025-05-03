
export interface Subsection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface SectionContentData {
  sectionNumber: string;
  title: string;
  description: string;
  icon: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section";
  isMainSection: boolean;
  subsections: Subsection[];
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  content: SectionContentData;
}

export const healthAndSafetyContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Health and Safety Legislation",
    content: {
      sectionNumber: "1",
      title: "Health and Safety Legislation in Electrical Work",
      description: "Understanding how health and safety applies to electrotechnical operations and the relevance of health and safety legislation in electrical work.",
      icon: "safety",
      isMainSection: true,
      subsections: [
        {
          id: "1.1",
          title: "Key Legislation",
          content: "The electrical industry is governed by several key pieces of legislation designed to protect workers and the public. The Health and Safety at Work Act 1974 forms the foundation of workplace safety in the UK, placing general duties on employers to ensure the health, safety and welfare of employees and others who may be affected by work activities. The Electricity at Work Regulations 1989 specifically addresses electrical safety requirements, mandating that electrical systems be maintained to prevent danger and that work activities are carried out in a way that prevents injury. The Management of Health and Safety at Work Regulations 1999 requires employers to assess risks, implement preventive measures, and provide appropriate training and supervision. These regulations work together to create a comprehensive framework for electrical safety, with penalties including fines and imprisonment for serious breaches. Every electrical worker must understand these laws and how they apply to daily tasks, as compliance is not just a legal requirement but essential for preventing accidents and saving lives in this high-risk industry.",
          keyPoints: [
            "The Health and Safety at Work Act 1974 establishes the legal framework for workplace safety",
            "The Electricity at Work Regulations 1989 specifically addresses electrical safety standards and requirements",
            "The Management of Health and Safety at Work Regulations 1999 requires risk assessments for all work activities",
            "Non-compliance can result in fines, imprisonment, and prohibition notices"
          ]
        },
        {
          id: "1.2",
          title: "Construction Design and Management Regulations",
          content: "The Construction (Design and Management) Regulations 2015 (CDM 2015) are particularly relevant for electrical contractors working on construction projects. These regulations create specific duties for all parties involved in construction work, including clients, designers, principal contractors, contractors, and workers. For electrical installations in construction environments, CDM requires proper planning before work begins, including risk assessments specific to the electrical work being undertaken. The regulations mandate clear communication channels between all parties to ensure safety information flows effectively. Site-specific documentation must be maintained, including construction phase plans, risk assessments, and method statements for electrical installations. The principal designer and principal contractor have specific responsibilities to coordinate health and safety matters. Electrical contractors must ensure that their workers are properly trained, supervised, and provided with appropriate information about site hazards and control measures. The regulations emphasize the importance of considering safety not just during installation but throughout the entire lifecycle of electrical systems, including maintenance and eventual decommissioning.",
          keyPoints: [
            "Defines duties for all parties involved in construction projects",
            "Requires proper planning and management of projects to ensure safety",
            "Specifies documentation and communication requirements for health and safety",
            "Applies to both new construction and renovation/refurbishment projects",
            "Creates specific duties for principal designers and principal contractors"
          ]
        },
        {
          id: "1.3",
          title: "RIDDOR and Incident Reporting",
          content: "The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) creates a legal duty to report certain workplace incidents to the Health and Safety Executive (HSE). For electrical workers, this includes reporting any electrical accident that results in a fatality, specified injury, or incapacitation for more than seven days. RIDDOR also requires reporting of dangerous occurrences related to electrical work, even if no injury results, such as electrical short circuits or overloads which cause significant damage or fire. Occupational diseases that may affect electrical workers, such as hand-arm vibration syndrome or occupational dermatitis, must also be reported when diagnosed. Reports must be made within specific timeframes: deaths and specified injuries must be reported immediately, while less severe injuries have longer reporting windows. Employers must maintain records of all reportable incidents for at least three years. The data collected through RIDDOR helps the HSE identify patterns in workplace accidents and develop targeted interventions and guidance. It's crucial for electrical contractors to have clear procedures for reporting incidents and ensuring all staff understand their RIDDOR obligations.",
          keyPoints: [
            "Mandates reporting of work-related accidents resulting in serious injury",
            "Covers dangerous occurrences even if no injury results",
            "Requires reporting of certain occupational diseases",
            "Specifies timeframes for different types of reports",
            "Reports contribute to national statistics and help identify industry-wide safety trends"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "Safe Working Environment",
    content: {
      sectionNumber: "2",
      title: "Safe Working Environment Procedures",
      description: "Identifying and implementing procedures to maintain a safe working environment and establishing effective safety protocols.",
      icon: "construction",
      isMainSection: true,
      subsections: [
        {
          id: "2.1",
          title: "Workplace Inspection Procedures",
          content: "Regular workplace inspections are a cornerstone of maintaining safety in electrical work environments. A comprehensive inspection program includes daily pre-work checks, where electricians examine their immediate work area, tools, and equipment before beginning tasks. These checks include looking for trip hazards, damaged tools, or other obvious safety concerns. Weekly documented inspections should be more thorough, with formal checklists covering all electrical equipment, access paths, fire safety provisions, and first aid facilities. Monthly comprehensive safety audits should be conducted by supervisors or safety officers and should examine not just physical conditions but also work practices, procedures, and documentation. Effective inspection programs use standardized forms to ensure consistency, with clear criteria for evaluating conditions. When issues are found, they must be documented, assigned responsibility for correction, and given deadlines for resolution. Follow-up procedures should verify that corrective actions have been completed. Technology can enhance inspection efficiency, with mobile apps allowing real-time data collection, photo documentation, and immediate notification of critical issues. The inspection process should be dynamic, with regular reviews of its effectiveness and updates to reflect new hazards or changing work conditions.",
          keyPoints: [
            "Daily pre-work safety checks of equipment and work area",
            "Weekly documented inspections of all electrical equipment",
            "Monthly comprehensive workplace safety audits",
            "Methods for recording and addressing issues found during inspections",
            "Designated responsibilities for completing corrective actions"
          ]
        },
        {
          id: "2.2",
          title: "Documentation and Record-Keeping",
          content: "Proper documentation is essential for both legal compliance and effective safety management in electrical work. Core documentation includes risk assessments that identify hazards and control measures for specific tasks, and method statements that outline how work will be completed safely. These documents should be task-specific, not generic, addressing the particular circumstances of each job. Equipment inspection records must track testing dates, results, and due dates for future inspections, with systems to flag when tests are due. Training records should document all safety-related instruction and certification, including refresher training requirements and expiration dates. Incident reports must thoroughly document any accidents or near-misses, including root cause analysis and corrective actions taken. For electrical installations, certificates of compliance are critical legal documents that verify work meets required standards. Document control systems should ensure that all workers have access to the latest versions of procedures and forms, with clear versioning to avoid confusion. Digital record-keeping systems offer advantages in searchability and data analysis but must have appropriate backup and security measures. Regular audits of documentation help identify gaps or inconsistencies that could indicate safety management weaknesses.",
          keyPoints: [
            "Requirements for risk assessments and method statements",
            "Maintenance of equipment inspection records",
            "Documentation of safety training and certifications",
            "Incident reporting procedures and documentation",
            "Systems for document control and accessibility"
          ]
        },
        {
          id: "2.3",
          title: "Safety Communication Systems",
          content: "Effective safety communication is vital to preventing accidents in electrical work. Communication systems should establish clear reporting hierarchies so workers know exactly who to notify about different types of safety concerns, from immediate hazards requiring emergency response to suggestions for safety improvements. Regular toolbox talks provide opportunities to discuss specific safety topics relevant to current or upcoming work, with documented attendance and content. Safety briefings should be conducted at the start of each shift or when tasks change significantly, highlighting particular hazards and control measures. Anonymous reporting mechanisms, such as suggestion boxes or confidential hotlines, encourage reporting of concerns without fear of reprisal. Visual communication through safety signage, color coding, and warning systems helps reinforce safety messages in the workplace. Digital communication tools, including safety apps and messaging systems, can provide immediate alerts about emerging hazards. Safety committees with representation from different levels of the organization create forums for collaborative problem-solving. Regular safety meetings should review incidents, near-misses, inspection findings, and upcoming work that may present new hazards. For multilingual workforces, safety communication must be provided in languages understood by all workers, potentially including visual aids for those with limited literacy.",
          keyPoints: [
            "Establishing clear reporting hierarchies for safety issues",
            "Implementing toolbox talks and safety briefings",
            "Creating systems for anonymous safety reporting",
            "Regular safety meetings and updates",
            "Multiple communication channels to ensure message reception"
          ]
        }
      ]
    }
  },
  {
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
  },
  {
    sectionNumber: "4",
    title: "Access Equipment Safety",
    content: {
      sectionNumber: "4",
      title: "Safety Requirements for Access Equipment",
      description: "Understanding the correct use and safety considerations for ladders, scaffolding, and other access tools used in electrical work.",
      icon: "hardhat",
      isMainSection: true,
      subsections: [
        {
          id: "4.1",
          title: "Ladder Safety and Inspection",
          content: "Ladders are among the most commonly used pieces of access equipment in electrical work, but they're also involved in many serious accidents when used improperly. Pre-use inspection is critical and should cover several key areas: stiles should be checked for cracks, bends, or splits; rungs must be firmly attached with no signs of wear or damage; feet should have secure, undamaged non-slip pads; locking mechanisms on extension ladders must function correctly; and any moving parts should operate smoothly. Positioning is equally important: ladders should be set at a 75° angle (1:4 ratio—one unit out for every four units up), on firm, level ground, and secured whenever possible by tying at top, middle, or bottom. If securing isn't possible, a second person should foot the ladder. The top of the ladder should extend at least 1 meter above the landing point to provide a handhold for users stepping off. Load ratings must be respected, with industrial-duty ladders (EN131 Professional) generally required for electrical work. The three points of contact rule is essential—maintaining two feet and one hand, or two hands and one foot, on the ladder at all times. This means tools should be carried in belts or pouches, not in hands while climbing. For electrical work specifically, fiberglass ladders are preferable to aluminum ones as they don't conduct electricity. Ladders should never be used in front of doors unless the door is locked or guarded, near live electrical equipment unless necessary safety measures are in place, or in high winds or adverse weather conditions.",
          keyPoints: [
            "Pre-use inspection procedures for ladders",
            "Proper positioning and securing techniques",
            "Maximum safe working heights and load ratings",
            "Three points of contact rule and safe climbing practices",
            "Specific considerations for electrical work, including ladder material"
          ]
        },
        {
          id: "4.2",
          title: "Scaffolding Requirements",
          content: "Scaffolding provides a more stable working platform than ladders but requires specific knowledge to use safely. Electrical workers should understand that scaffolding must be erected, modified, and dismantled only by trained and competent persons, never by unqualified workers. Before use, scaffolding must display a completed inspection tag confirming it has been checked by a competent person within the last seven days, after alteration, or following extreme weather. Tower scaffolds are commonly used for electrical installations and have specific safety requirements: the height should not exceed three times the smallest base dimension for outdoor use (3.5 times for indoor use); stabilizers or outriggers may be needed to achieve this ratio; and platforms should have full guardrails (top rail, mid-rail, and toe board) on all open sides. Access must be via internal ladders, never by climbing the frame. Working platforms must be fully boarded with no gaps and have adequate width for work activities (minimum 600mm). Load limitations must be strictly observed, with materials stored evenly to prevent instability. Tools and materials should be raised and lowered using a rope and bucket system, not carried up ladders. For electrical work near overhead lines, non-conductive scaffolding components may be required, and minimum separation distances must be maintained. Mobile tower scaffolds have additional requirements: wheels must be locked when in use; they should never be moved with people or materials on the platform; and they should be pushed at the base, not pulled at the top. Regular inspection should check for complete platforms, secure guardrails, proper bracing, stable foundations, and safe access ladders.",
          keyPoints: [
            "Types of scaffolding appropriate for electrical work",
            "Inspection tags and documentation requirements",
            "Safe working practices on scaffolding platforms",
            "Load limitations and material handling on scaffolds",
            "Requirements for guardrails, toe boards, and access ladders"
          ]
        },
        {
          id: "4.3",
          title: "Mobile Elevated Work Platforms",
          content: "Mobile Elevated Work Platforms (MEWPs) provide efficient access for electrical work at height, but require specific training and precautions. The two main types used in electrical work are boom lifts (articulated or telescopic) and scissor lifts. Operators must have completed IPAF (International Powered Access Federation) or equivalent training for the specific category of MEWP they will use. Daily pre-use checks are essential and should include: hydraulic fluid levels and leaks; battery condition; structural components for damage; controls for proper function; emergency lowering systems; outriggers and stabilizers; wheels and brakes; and guardrail systems. Ground conditions must be assessed before deployment, ensuring the surface can support the MEWP's weight, considering factors like underground services or voids. When used outdoors, maximum wind speed ratings must be observed, typically around 12.5m/s (28mph) for most MEWPs, with work ceasing and platforms lowered when this is exceeded. Fall protection varies by MEWP type: in boom lifts, operators must wear full body harnesses with short lanyards attached to designated anchor points; for scissor lifts, the guardrail system typically provides sufficient protection if gates are closed. Overhead hazards, particularly power lines, require careful assessment, with safe distances maintained according to the voltage involved (minimum 9m from overhead lines unless formally assessed and permitted). Outriggers must be fully extended and firmly supported on suitable load-spreading plates when required by the manufacturer. Emergency procedures must be established before work begins, including ground-level emergency controls for lowering the platform if the operator becomes incapacitated. Rescue plans should account for foreseeable emergencies like power failures, control malfunctions, or operator medical emergencies.",
          keyPoints: [
            "Types of MEWPs suitable for electrical installation work",
            "Training and certification requirements for operators",
            "Pre-use checks and operational safety measures",
            "Emergency procedures when using MEWPs",
            "Special considerations for working near live electrical equipment"
          ]
        },
        {
          id: "4.4",
          title: "Weather Considerations",
          content: "Weather conditions significantly impact the safety of access equipment, especially in the variable UK climate where conditions can change rapidly. Wind speed is a critical factor: ladders become difficult to control and unstable in winds above 17mph (Force 4); tower scaffolds typically have a maximum working wind speed of 17-21mph; and MEWPs have manufacturer-specified limits, usually around 28mph. Sudden gusts can be particularly dangerous, so local weather forecasts should be consulted before working at height, and work should cease if conditions deteriorate. Rain and snow create slip hazards on all access equipment surfaces, requiring extra caution and potentially non-slip footwear with enhanced grip. Wet conditions also affect electrical safety when using metal access equipment, increasing conductivity risks. Lightning presents a severe hazard when working at height, especially when using metal access equipment or working on external electrical systems—all such work should cease during thunderstorms, with workers descending to safe locations. Cold temperatures affect both equipment and workers: metal surfaces become colder to touch, requiring gloves; hydraulic systems on MEWPs may operate more slowly; and workers' dexterity and concentration can be impaired, requiring additional breaks and appropriate clothing. High temperatures also present risks, with metal surfaces potentially becoming hot enough to cause burns and workers at risk of heat stress or sunburn. The combination of high winds and rain significantly increases risks and often requires work postponement. Weather-related risk assessments should be dynamic, with workers empowered to stop work if conditions become unsafe, regardless of production pressures.",
          keyPoints: [
            "Wind speed limitations for different types of access equipment",
            "Precautions for wet or icy conditions",
            "Lightning risks when working at height",
            "Temperature effects on equipment stability and worker safety",
            "Dynamic risk assessment for changing weather conditions"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "5",
    title: "Identifying & Dealing with Hazards",
    content: {
      sectionNumber: "5",
      title: "Identifying and Dealing with Hazards",
      description: "Developing the ability to spot potential hazards in electrical work environments and implementing appropriate control measures.",
      icon: "warning",
      isMainSection: true,
      subsections: [
        {
          id: "5.1",
          title: "Risk Assessment Process",
          content: "A comprehensive risk assessment process is fundamental to safety in electrical work. The five-step approach begins with hazard identification, systematically examining work activities to identify anything with potential to cause harm, including electrical, physical, environmental, and health hazards. The second step determines who might be harmed—not just electrical workers, but also other trades on site, building occupants, or the public—and how each group might be affected differently. The third step evaluates risks by considering both the likelihood of harm occurring and its potential severity, then determining whether existing precautions are adequate or if more controls are needed. Risk evaluation should use a consistent methodology, often using a 5×5 matrix (likelihood × severity) to produce a numerical risk rating. The fourth step involves recording findings in a formal document that identifies hazards, specifies who is at risk, describes control measures, assigns responsibilities, and sets review dates. Finally, risk assessments must be regularly reviewed, especially when work methods change, new equipment is introduced, after incidents occur, or at planned intervals. Dynamic risk assessment supplements formal written assessments, with workers continuously evaluating changing conditions and responding appropriately. For electrical work, risk assessments should specifically address isolation procedures, test equipment selection, use of appropriate PPE, emergency procedures, and access requirements. Method statements often accompany risk assessments, detailing step-by-step procedures for completing high-risk tasks safely. Effective risk assessment requires worker involvement at all stages, as those performing tasks often have the best insight into practical hazards and controls.",
          keyPoints: [
            "Five steps of risk assessment: identify hazards, determine who might be harmed, evaluate risks, record findings, review assessment",
            "Dynamic risk assessment techniques for changing conditions",
            "Documentation requirements and templates",
            "Review and updating procedures for risk assessments",
            "Worker involvement in the risk assessment process"
          ]
        },
        {
          id: "5.2",
          title: "Common Electrical Hazards",
          content: "Electrical work involves numerous hazards that must be recognized and controlled. Electric shock occurs when current passes through the body, with severity depending on current magnitude, pathway through the body, and duration. As little as 50mA through the heart can be fatal, while higher currents cause tissue burns, respiratory failure, and cardiac arrest. Arc flash is an explosive release of energy when a high-amperage fault occurs, generating temperatures up to 20,000°C, intense UV radiation, molten metal splatter, and pressure waves. These can cause severe burns, eye damage, hearing damage, and blast injuries. Fire risks from electrical faults are significant, with overheated conductors, loose connections, and damaged insulation commonly causing ignition. Electrical fires often start within walls or ceiling voids, spreading undetected before visible detection. Secondary hazards include falls resulting from shock or arc blast, which may throw workers from height or cause them to react involuntarily and lose balance. Confined spaces present additional risks, with limited escape routes and potential for gases to accumulate. Stored energy in capacitors and inductors can deliver shocks even after power disconnection, requiring specific discharge procedures. Cable striking during excavation or drilling into walls remains a common cause of electrical injuries, requiring cable detection tools and safe digging practices. Damaged equipment or installations create unpredictable hazards, particularly in older buildings or following flooding/fire damage. Identifying these hazards requires thorough inspection before work begins, including visual checks, testing where appropriate, and consulting building records and installation certificates.",
          keyPoints: [
            "Electric shock and its physiological effects",
            "Arc flash and blast hazards",
            "Fire risks from electrical faults",
            "Secondary hazards such as falls after shock",
            "Cable strike risks during excavation or drilling"
          ]
        },
        {
          id: "5.3",
          title: "Hierarchy of Control Measures",
          content: "The hierarchy of control provides a systematic approach to implementing the most effective safety measures for electrical hazards. Elimination, the most effective control, involves completely removing the hazard, such as de-commissioning redundant electrical circuits rather than leaving them disconnected but present. When elimination isn't feasible, substitution replaces the hazard with something less dangerous, like using 110V tools instead of 230V, or replacing aging installations with modern equipment featuring enhanced safety features. Engineering controls modify designs or equipment to reduce risk, such as installing permanent RCD protection, implementing automatic isolation systems, or redesigning installations to locate equipment in more accessible positions. When hazards cannot be adequately controlled through these higher-level methods, administrative controls change how people work around the hazard. These include implementing permit-to-work systems, establishing clear procedures for isolation and testing, providing regular training, using warning signs, and implementing supervision for high-risk tasks. Personal protective equipment (PPE), while essential, is considered the last line of defense because it doesn't eliminate hazards and relies on correct selection, use, and maintenance. For electrical work, PPE includes insulated tools, voltage-rated gloves, arc flash protection, safety eyewear, and appropriate footwear. The most effective risk management typically involves multiple control measures across different hierarchy levels. When selecting controls, consideration should be given to long-term sustainability, maintenance requirements, the introduction of new risks, and worker acceptance. Controls should be regularly reviewed for effectiveness and updated as technology or work practices change.",
          keyPoints: [
            "Elimination - removing the hazard completely",
            "Substitution - replacing with less hazardous alternatives",
            "Engineering controls - redesigning equipment or processes",
            "Administrative controls - changing work methods",
            "Personal protective equipment - last line of defense",
            "Implementing multiple controls from different hierarchy levels for best protection"
          ]
        }
      ]
    }
  },
  {
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
  }
];
