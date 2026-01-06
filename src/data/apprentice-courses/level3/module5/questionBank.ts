// Level 3 Module 5: Inspection & Testing - Question Bank
// 200 Questions covering initial verification, periodic inspection, and certification

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module5Questions: Question[] = [
  // Section 5.1: Initial Verification (Questions 1-35)
  {
    id: 1,
    question: "Initial verification of an electrical installation must be carried out:",
    options: ["Only if the customer requests it", "During and upon completion of new work", "Only for commercial installations", "After the first year of use"],
    correctAnswer: 1,
    explanation: "BS 7671 requires initial verification during construction and upon completion of new installations or alterations.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "Who is responsible for ensuring initial verification is carried out?",
    options: ["The customer only", "The installing contractor", "Local authority only", "The DNO"],
    correctAnswer: 1,
    explanation: "The contractor responsible for the electrical installation has the duty to ensure proper initial verification is completed.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "Initial verification comprises:",
    options: ["Visual inspection only", "Testing only", "Comparison of results only", "Visual inspection, testing, and comparison with design"],
    correctAnswer: 3,
    explanation: "Initial verification requires visual inspection, appropriate testing, and verification that the installation meets the design requirements.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "Visual inspection should be carried out:",
    options: ["Only after all testing", "Before testing and preferably with the supply disconnected", "Only with power on", "It's optional for domestic work"],
    correctAnswer: 1,
    explanation: "Visual inspection should precede testing and is preferably done with the supply disconnected for safety reasons.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 5,
    question: "Which document confirms the installation complies with BS 7671 after initial verification?",
    options: ["Visual inspection report", "Electrical Installation Certificate (EIC)", "Schedule of Rates", "Installation manual"],
    correctAnswer: 1,
    explanation: "The Electrical Installation Certificate (EIC) is the formal document confirming a new installation complies with BS 7671.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 6,
    question: "The schedule of inspections for initial verification records:",
    options: ["Test equipment used", "Items inspected and their compliance", "Costs of the installation", "Customer details only"],
    correctAnswer: 1,
    explanation: "The schedule of inspections documents all items checked during visual inspection and whether they comply with requirements.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 7,
    question: "What must be verified regarding cable installation methods?",
    options: ["Colour only", "Selection appropriate for external influences and installation conditions", "Length only", "Cost effectiveness"],
    correctAnswer: 1,
    explanation: "Cable selection and installation methods must be appropriate for the environmental conditions and installation situation.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "During initial inspection, fire barriers and seals should be:",
    options: ["Ignored", "Verified as correctly installed where cables penetrate floors/walls", "Installed by others", "Only checked in commercial buildings"],
    correctAnswer: 1,
    explanation: "Fire barriers and seals at cable penetrations must be checked as they're essential for maintaining fire compartmentation.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Initial verification of protective devices requires checking:",
    options: ["Brand name only", "Correct type, rating, and breaking capacity for the circuits protected", "Physical size", "Colour coding"],
    correctAnswer: 1,
    explanation: "Protective devices must be verified for correct type, current rating, and adequate breaking capacity for prospective fault current.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Verification of earthing arrangements should confirm:",
    options: ["Earth clamp colour", "Type of system, main earthing terminal, and bonding conductors installed", "Cable manufacturer", "Installation date"],
    correctAnswer: 1,
    explanation: "Earthing verification includes confirming system type (TN-S, TN-C-S, TT), main earthing arrangements, and bonding conductors.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "The condition of insulation on conductors visible during initial inspection should be:",
    options: ["Assumed satisfactory", "Checked for damage or deterioration", "Only checked on expensive cables", "Ignored if cables are new"],
    correctAnswer: 1,
    explanation: "Visible insulation must be checked for damage that may have occurred during installation or from other causes.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 12,
    question: "Access to equipment for operation and maintenance should be verified as:",
    options: ["Not relevant to inspection", "Adequate for safe operation and maintenance", "Only for industrial installations", "Customer's responsibility entirely"],
    correctAnswer: 1,
    explanation: "Adequate access must be available for safe operation, maintenance, and inspection of electrical equipment.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 13,
    question: "Verification of protective conductor cross-sectional areas ensures:",
    options: ["Cable colours are correct", "CPCs are adequately sized for fault current and duration", "Cables look professional", "Cost minimisation"],
    correctAnswer: 1,
    explanation: "CPC sizing must be verified to ensure conductors can safely carry prospective fault current for the disconnection time.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "During initial inspection, basic protection measures should be verified including:",
    options: ["Cable prices", "Insulation of live parts and barriers/enclosures", "Installation speed", "Contractor qualifications"],
    correctAnswer: 1,
    explanation: "Basic protection against direct contact is verified by checking insulation of live parts and barriers/enclosures are adequate.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 15,
    question: "Verification of correct identification of conductors checks:",
    options: ["Cable length", "Colour coding and labelling meet requirements", "Installation date", "Manufacturer name"],
    correctAnswer: 1,
    explanation: "Conductors must be correctly identified through colour coding and/or labelling according to BS 7671 requirements.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 16,
    question: "What should be checked regarding circuit arrangements at distribution boards?",
    options: ["Paint finish", "Correct division of circuits and presence of labels/charts", "Board manufacturer only", "Installation company logo"],
    correctAnswer: 1,
    explanation: "Circuit arrangement, division between different circuit types, and presence of circuit charts/labels must be verified.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "Presence and adequacy of undervoltage protection should be verified for:",
    options: ["All circuits", "Motor circuits and equipment where restart could cause danger", "Domestic installations only", "It's never required"],
    correctAnswer: 1,
    explanation: "Undervoltage protection is required where automatic restart after voltage restoration could create a hazard.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "Verification that enclosures provide adequate IP protection requires:",
    options: ["Opening all enclosures", "Checking IP rating is suitable for the location and installation", "Measuring internal dimensions", "Only for outdoor equipment"],
    correctAnswer: 1,
    explanation: "Enclosure IP ratings must be appropriate for the environmental conditions at the installation location.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "Initial inspection of socket outlets should verify:",
    options: ["Only quantity", "Correct type, mounting, and appropriateness for location", "Brand name", "Installation speed"],
    correctAnswer: 1,
    explanation: "Socket outlets must be correct type (e.g., shuttered for domestic), properly mounted, and suitable for the location.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 20,
    question: "Labelling at the origin of the installation should include:",
    options: ["Contractor's phone number only", "Type of earthing, max demand, and warning notices where required", "Paint supplier details", "Installation cost"],
    correctAnswer: 1,
    explanation: "Required labels include earthing system type, maximum demand details, and relevant warning notices.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 21,
    question: "Initial verification must check that RCDs protect circuits as required by:",
    options: ["Customer preference", "The design and BS 7671 requirements", "Cost considerations", "Available stock"],
    correctAnswer: 1,
    explanation: "RCD protection must comply with the design specification and mandatory requirements of BS 7671.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 22,
    question: "Verification of surge protection devices (where installed) includes:",
    options: ["Only presence", "Correct installation, rating, and indication of functional status", "Colour matching", "Brand preference"],
    correctAnswer: 1,
    explanation: "SPD verification includes checking correct installation, appropriate ratings, and that status indicators show correct operation.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 23,
    question: "Protective measure 'automatic disconnection of supply' requires verification of:",
    options: ["Switch positions", "Correct protective devices, earthing, and bonding arrangements", "Cable colours only", "Installation duration"],
    correctAnswer: 1,
    explanation: "ADS verification confirms protective devices, earth fault paths, and bonding are correctly installed to ensure rapid disconnection.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 24,
    question: "During initial inspection, external influences affecting equipment selection should be verified including:",
    options: ["Paint colours", "Ambient temperature, water, and mechanical stresses", "Contractor preferences", "Material costs"],
    correctAnswer: 1,
    explanation: "Equipment selection must consider external influences like temperature range, presence of water, and mechanical conditions.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "What must be checked regarding cables installed in thermal insulation?",
    options: ["Colour only", "Appropriate current rating derating has been applied", "Installation date", "Brand name"],
    correctAnswer: 1,
    explanation: "Cables in thermal insulation must be derated appropriately as the insulation reduces heat dissipation capability.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "Initial verification must confirm that equipment is suitable for:",
    options: ["The cheapest option", "The maximum voltage and current in normal service", "Appearance only", "Fast installation"],
    correctAnswer: 1,
    explanation: "Equipment must be rated for the voltage and current it will experience in normal operation.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 27,
    question: "Verification of fault protection in TT systems requires checking:",
    options: ["RCD protection with appropriate residual current rating", "Type B MCBs only", "Double insulation only", "No specific requirements"],
    correctAnswer: 0,
    explanation: "TT systems typically require RCD protection as earth fault currents are limited by earth electrode resistance.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 28,
    question: "The design documentation should be consulted during initial verification to:",
    options: ["Verify contractor qualifications", "Confirm installation matches intended design", "Calculate profit margins", "Determine completion speed"],
    correctAnswer: 1,
    explanation: "Design documentation is checked to verify the installation has been completed according to the intended design.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 29,
    question: "During initial verification of SELV circuits, what should be confirmed?",
    options: ["Normal voltage is present", "Source is appropriate and circuit is electrically separated from other systems", "Only fuse ratings", "Cable colours only"],
    correctAnswer: 1,
    explanation: "SELV verification confirms the safety source, electrical separation from other systems, and absence of earthing.",
    section: "5.1",
    difficulty: "advanced"
  },
  {
    id: 30,
    question: "Verification of functional switching includes checking:",
    options: ["Only emergency switches", "All switches controlling equipment are correctly positioned and labelled", "Paint colours", "Brand names"],
    correctAnswer: 1,
    explanation: "Functional switching verification ensures switches are positioned appropriately and properly labelled for their purpose.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 31,
    question: "Initial inspection should verify that diagrams and documentation are:",
    options: ["In colour", "Available and accurate for the installation", "Expensive", "Digitally stored"],
    correctAnswer: 1,
    explanation: "Required documentation must be available and accurately reflect the completed installation.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 32,
    question: "Checking that equipment is correctly installed in accordance with manufacturer instructions is:",
    options: ["Optional", "A requirement of initial verification", "Only for complex equipment", "Customer's responsibility"],
    correctAnswer: 1,
    explanation: "Equipment must be installed according to manufacturer instructions as this affects safety and warranty.",
    section: "5.1",
    difficulty: "basic"
  },
  {
    id: 33,
    question: "Initial verification of supplementary bonding in special locations requires:",
    options: ["Ignoring bonding", "Confirming bonding conductors connect required parts", "Testing current flow", "Only visual check of colour"],
    correctAnswer: 1,
    explanation: "Supplementary bonding in locations like bathrooms must be verified to ensure all required parts are interconnected.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "What should be verified regarding protective devices at circuit origins?",
    options: ["Brand preference", "All circuits originate from a protective device of appropriate rating", "Installation speed", "Cost of devices"],
    correctAnswer: 1,
    explanation: "Each circuit must originate from an appropriate protective device that provides protection for the circuit conductors.",
    section: "5.1",
    difficulty: "intermediate"
  },
  {
    id: 35,
    question: "Verification of emergency switching arrangements includes:",
    options: ["Only checking switch colour", "Correct location, identification, and type of device", "Cost analysis", "Brand selection"],
    correctAnswer: 1,
    explanation: "Emergency switches must be correctly located, clearly identified, and be of appropriate type for their function.",
    section: "5.1",
    difficulty: "intermediate"
  },

  // Section 5.2: Periodic Inspection (Questions 36-70)
  {
    id: 36,
    question: "The purpose of periodic inspection is to:",
    options: ["Find warranty issues", "Assess whether the installation is safe for continued use", "Generate revenue", "Satisfy planning requirements"],
    correctAnswer: 1,
    explanation: "Periodic inspection determines whether an installation remains safe for continued use and identifies any deterioration.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 37,
    question: "Who should determine the extent and limitations of periodic inspection?",
    options: ["Only the customer", "The inspector based on agreement with the client", "Building control only", "The DNO"],
    correctAnswer: 1,
    explanation: "The extent and limitations should be agreed between the inspector and client based on available information and access.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 38,
    question: "An EICR should report which classification for immediate danger?",
    options: ["C1", "C2", "C3", "FI"],
    correctAnswer: 0,
    explanation: "C1 indicates danger present requiring immediate remedial action and disconnection if necessary.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 39,
    question: "Classification code C2 on an EICR indicates:",
    options: ["Danger present", "Potentially dangerous - urgent remedial action required", "Improvement recommended", "Further investigation needed"],
    correctAnswer: 1,
    explanation: "C2 indicates a condition that is potentially dangerous and requires urgent remedial action.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 40,
    question: "When should 'FI' (Further Investigation) be used on an EICR?",
    options: ["As a catch-all code", "When investigation is needed to determine if a code applies", "Instead of C1", "For perfect circuits"],
    correctAnswer: 1,
    explanation: "FI is used when further investigation is required to determine the nature or extent of a potential deficiency.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 41,
    question: "The recommended interval for periodic inspection of domestic premises is typically:",
    options: ["1 year", "5 years or change of occupancy", "20 years", "Never needed"],
    correctAnswer: 1,
    explanation: "Domestic installations should typically be inspected at least every 5 years or on change of occupancy.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 42,
    question: "For industrial installations, typical maximum periodic inspection interval is:",
    options: ["10 years", "1 year", "3 years", "Never"],
    correctAnswer: 2,
    explanation: "Industrial installations typically require inspection at maximum 3-year intervals due to harsher conditions.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 43,
    question: "Sampling of circuits during periodic inspection may be appropriate when:",
    options: ["The inspector is tired", "The installation is large and uniform, with proper agreement", "Always preferred for speed", "Customer requests minimum testing"],
    correctAnswer: 1,
    explanation: "Sampling may be agreed for large uniform installations, but must be representative and properly documented.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 44,
    question: "During periodic inspection, circuits should be inspected for:",
    options: ["Original cost", "Any damage, deterioration, or defects affecting safety", "Brand names", "Original installer"],
    correctAnswer: 1,
    explanation: "Periodic inspection looks for damage, deterioration, defects, and changes that may affect safety.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 45,
    question: "What does a 'satisfactory' overall condition on an EICR indicate?",
    options: ["Perfection", "No C1 or C2 codes and safe for continued use", "All original", "New installation"],
    correctAnswer: 1,
    explanation: "Satisfactory indicates no immediate danger (C1) or potentially dangerous conditions (C2) are present.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 46,
    question: "An 'unsatisfactory' EICR means:",
    options: ["Installation must be rewired", "C1 and/or C2 codes are present requiring action", "The inspector was unhappy", "Building must be vacated"],
    correctAnswer: 1,
    explanation: "Unsatisfactory indicates the presence of dangerous or potentially dangerous conditions requiring remedial action.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 47,
    question: "Periodic inspection requires checking that protective devices:",
    options: ["Are painted correctly", "Remain suitable for their duty and operating correctly", "Are expensive brands", "Were installed recently"],
    correctAnswer: 1,
    explanation: "Protective devices must be checked to confirm they remain suitable and show no signs of damage or deterioration.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "When inspecting earthing and bonding during periodic inspection:",
    options: ["Only visual check is needed", "Verify integrity, adequacy, and correct connection", "Replace all clamps", "Only check main earth"],
    correctAnswer: 1,
    explanation: "Earthing and bonding must be inspected and tested to verify continued integrity and adequacy.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "Signs of thermal damage at equipment should be classified as:",
    options: ["C3 only", "At least C2, possibly C1 depending on severity", "Not coded", "Ignored if equipment works"],
    correctAnswer: 1,
    explanation: "Thermal damage indicates a potentially dangerous condition (C2) or worse, requiring classification based on severity.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "C3 classification indicates:",
    options: ["Danger present", "Potentially dangerous", "Improvement recommended for best practice", "Further investigation needed"],
    correctAnswer: 2,
    explanation: "C3 indicates improvement is recommended but the item doesn't constitute a danger.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 51,
    question: "Periodic inspection of consumer units should check:",
    options: ["Brand name only", "Evidence of deterioration, thermal damage, and correct labelling", "Installation date only", "Cost when new"],
    correctAnswer: 1,
    explanation: "Consumer unit inspection includes checking for deterioration, thermal damage, labelling, and overall condition.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 52,
    question: "If parts of an installation cannot be accessed for inspection:",
    options: ["Assume they're satisfactory", "Document the limitation clearly on the report", "Report the whole installation unsatisfactory", "Complete without mentioning it"],
    correctAnswer: 1,
    explanation: "Limitations on access must be clearly documented on the EICR so readers understand what wasn't inspected.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "The interval to the next inspection on an EICR should be based on:",
    options: ["Standard intervals only", "Type, use, and condition of the installation", "Customer budget", "Inspector preference"],
    correctAnswer: 1,
    explanation: "Recommended interval considers the installation type, usage, condition found, and relevant guidance.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 54,
    question: "During periodic inspection, RCD test results should be compared with:",
    options: ["Previous records only", "BS 7671 requirements and previous records where available", "Nothing specific", "Other installations"],
    correctAnswer: 1,
    explanation: "RCD tests should meet BS 7671 requirements, and comparison with previous results shows any deterioration trends.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 55,
    question: "Absence of circuit charts at a distribution board should typically be coded as:",
    options: ["Ignored", "C3 for improvement", "C1 always", "Not reported"],
    correctAnswer: 1,
    explanation: "Missing circuit charts is typically a C3 improvement recommendation as it affects safety management but isn't immediately dangerous.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 56,
    question: "Evidence of DIY modifications to an installation should be:",
    options: ["Ignored", "Assessed for safety and reported/coded appropriately", "Automatically C1", "Not the inspector's concern"],
    correctAnswer: 1,
    explanation: "DIY modifications must be assessed for safety with appropriate coding based on their actual condition and compliance.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 57,
    question: "For periodic inspection of swimming pools, the maximum inspection interval is:",
    options: ["5 years", "1 year", "10 years", "Same as domestic premises"],
    correctAnswer: 1,
    explanation: "Swimming pools and special locations typically require annual inspection due to increased risks.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 58,
    question: "Outdated consumer unit without RCD protection in a domestic property should be coded as:",
    options: ["Satisfactory", "At least C2 or C3 depending on specific circumstances", "Ignored", "C1 always"],
    correctAnswer: 1,
    explanation: "Lack of RCD protection is typically coded C2 or C3 depending on circuit types and risk assessment.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 59,
    question: "The duty holder for maintaining an installation in safe condition is:",
    options: ["The original installer", "The person responsible for the premises", "The DNO", "Local authority"],
    correctAnswer: 1,
    explanation: "The duty holder (typically the owner or occupier) is responsible for maintaining electrical installations.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 60,
    question: "Testing during periodic inspection typically includes:",
    options: ["All tests required for initial verification", "Tests appropriate to the scope and accessible parts", "New installation tests only", "No testing required"],
    correctAnswer: 1,
    explanation: "Testing is performed as appropriate to the agreed scope and what's accessible, not necessarily all initial verification tests.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 61,
    question: "Observed departures from current regulations in an old installation should be:",
    options: ["Always coded C1", "Assessed for safety and coded appropriately", "Ignored as regulations have changed", "Automatically require rewiring"],
    correctAnswer: 1,
    explanation: "Departures from current standards should be assessed for actual safety risk and coded based on danger posed.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 62,
    question: "The observations section of an EICR should contain:",
    options: ["Only positive comments", "Details of all coded items and other relevant observations", "Advertising for the inspector", "Financial information"],
    correctAnswer: 1,
    explanation: "Observations should detail coded items, their locations, and provide clear information for remedial action.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 63,
    question: "When sampling is used for periodic inspection, the sample should be:",
    options: ["Random and undocumented", "Representative of the installation and documented", "The smallest possible", "Only new circuits"],
    correctAnswer: 1,
    explanation: "Samples must be representative of the whole installation and clearly documented in the report.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 64,
    question: "Evidence of water damage to electrical equipment should typically be coded:",
    options: ["C3 only", "C1 or C2 depending on severity", "Not coded", "Ignored if dried out"],
    correctAnswer: 1,
    explanation: "Water damage presents safety risks and should be coded C1 or C2 depending on the current condition and ongoing risk.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 65,
    question: "Periodic inspection of agricultural installations should occur at maximum intervals of:",
    options: ["10 years", "3 years", "5 years", "1 year"],
    correctAnswer: 1,
    explanation: "Agricultural installations require inspection at maximum 3-year intervals due to harsh environmental conditions.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 66,
    question: "If dangerous conditions are found during periodic inspection, the inspector should:",
    options: ["Continue testing first", "Advise the duty holder immediately and recommend disconnection if necessary", "Only mention in final report", "Complete all testing before advising"],
    correctAnswer: 1,
    explanation: "Dangerous conditions should be reported immediately to the duty holder with advice on necessary action.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 67,
    question: "The summary sheet of an EICR provides:",
    options: ["Detailed test results", "Overview of extent, limitations, and overall condition", "Just the price", "Installation history"],
    correctAnswer: 1,
    explanation: "The summary gives an overview including extent of inspection, limitations, and overall assessment.",
    section: "5.2",
    difficulty: "basic"
  },
  {
    id: 68,
    question: "Changes since the last inspection should be:",
    options: ["Assumed compliant", "Noted and inspected for compliance", "Ignored", "Reported but not coded"],
    correctAnswer: 1,
    explanation: "Changes or additions should be identified and assessed for compliance with relevant standards.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 69,
    question: "Missing earthing conductor to an extraneous-conductive-part in a bathroom should be coded as:",
    options: ["Satisfactory", "C2 - potentially dangerous", "C3 only", "Not relevant"],
    correctAnswer: 1,
    explanation: "Missing supplementary bonding in bathrooms creates shock risk and is typically coded C2.",
    section: "5.2",
    difficulty: "intermediate"
  },
  {
    id: 70,
    question: "The person ordering the EICR should be provided with:",
    options: ["Only a verbal summary", "The complete report including observations and test results", "Just the certificate page", "Only if they request it"],
    correctAnswer: 1,
    explanation: "The complete EICR including all pages, observations, and schedules should be provided to the ordering party.",
    section: "5.2",
    difficulty: "basic"
  },

  // Section 5.3: Test Sequences (Questions 71-100)
  {
    id: 71,
    question: "The correct sequence for testing during initial verification begins with:",
    options: ["RCD testing", "Continuity of protective conductors", "Earth fault loop impedance", "Polarity"],
    correctAnswer: 1,
    explanation: "Testing starts with continuity of protective conductors to ensure the earth path is established before other tests.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 72,
    question: "Why should continuity testing be performed before insulation resistance testing?",
    options: ["It's easier", "To verify the protective conductor exists before other tests", "No particular reason", "To check cable colours"],
    correctAnswer: 1,
    explanation: "Continuity testing first confirms protective conductors are present and intact before progressing to other safety tests.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 73,
    question: "Insulation resistance testing should be performed:",
    options: ["With the supply connected", "With the circuit isolated and proved dead", "At any convenient time", "Only on new installations"],
    correctAnswer: 1,
    explanation: "Insulation resistance testing requires the circuit to be isolated and safe, with electronic equipment disconnected.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 74,
    question: "Polarity testing is carried out:",
    options: ["Only with a voltage tester", "During continuity testing and verified with installation live", "Only at final circuits", "Only if customer requests"],
    correctAnswer: 1,
    explanation: "Polarity is initially verified during continuity tests and confirmed with the supply energised.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "Earth fault loop impedance testing requires:",
    options: ["The circuit to be dead", "The circuit to be energised", "Only insulation tester", "No specific requirements"],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance testing requires the circuit to be energised as it measures the live fault path.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 76,
    question: "RCD testing in the sequence is performed:",
    options: ["First", "After earth fault loop impedance testing has verified adequate path", "Any time", "Only annually"],
    correctAnswer: 1,
    explanation: "RCD testing follows earth fault loop impedance tests, which confirm an adequate earth path exists for RCD operation.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "The standard test sequence for initial verification after continuity is:",
    options: ["Loop, RCD, insulation, polarity", "Insulation resistance, polarity, EFLI, RCD", "RCD first always", "Random order is acceptable"],
    correctAnswer: 1,
    explanation: "Standard sequence: Continuity > Insulation Resistance > Polarity verification > Earth Fault Loop > RCD testing.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "Why should earth electrode resistance be tested before external loop impedance in TT systems?",
    options: ["It's faster", "To verify adequate earth path exists before energising tests", "No particular reason", "Equipment requires it"],
    correctAnswer: 1,
    explanation: "Earth electrode testing in TT systems confirms adequate earth before performing live tests that rely on this path.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 79,
    question: "Prospective fault current measurement should be made:",
    options: ["First in the sequence", "At the origin and relevant points throughout", "Only at final circuits", "Never required"],
    correctAnswer: 1,
    explanation: "PFC is measured at the origin and other points to verify protective devices have adequate breaking capacity.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "Testing of AFDD-protected circuits should include:",
    options: ["No specific tests", "Verification of correct operation using manufacturer instructions", "Only visual inspection", "Testing is impossible"],
    correctAnswer: 1,
    explanation: "AFDDs should be tested according to manufacturer instructions to verify correct operation.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 81,
    question: "Phase sequence verification in three-phase installations should be checked:",
    options: ["Never", "Before energising motor circuits", "Only if customer complains", "After all other tests"],
    correctAnswer: 1,
    explanation: "Phase sequence should be verified before energising motors to prevent reverse rotation.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 82,
    question: "Ring final circuit continuity testing requires:",
    options: ["Only an end-to-end test", "Verification that the ring is continuous throughout", "Testing at one socket only", "No specific requirement"],
    correctAnswer: 1,
    explanation: "Ring testing must verify continuity of the ring including all conductors through all points.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 83,
    question: "The 'dead' test sequence should be completed before:",
    options: ["Any tests", "Energising the installation for live tests", "Visual inspection", "Documentation"],
    correctAnswer: 1,
    explanation: "Dead tests (continuity, insulation resistance) must be completed satisfactorily before energising for live tests.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 84,
    question: "Functional testing of switchgear and controls is performed:",
    options: ["First in the sequence", "After safety tests confirm the installation is safe to energise", "Before any testing", "Only if specifically requested"],
    correctAnswer: 1,
    explanation: "Functional tests are performed after safety testing confirms the installation is safe to operate.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 85,
    question: "If insulation resistance fails, you should:",
    options: ["Continue with other tests", "Investigate and rectify before proceeding", "Document and ignore", "Test again hoping for better result"],
    correctAnswer: 1,
    explanation: "Failed insulation resistance indicates a potential problem that must be investigated and rectified before proceeding.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 86,
    question: "Testing continuity of the main protective bonding conductors requires measuring between:",
    options: ["Extraneous parts and main earth", "The main earthing terminal and the connection point on extraneous-conductive-parts", "Phase and neutral", "Two random points"],
    correctAnswer: 1,
    explanation: "Bonding continuity is measured from the main earthing terminal to each bonding connection point.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 87,
    question: "For periodic inspection, testing may be:",
    options: ["Skipped entirely", "Limited based on scope agreed and safe condition of accessible parts", "Always complete as initial verification", "Random selection only"],
    correctAnswer: 1,
    explanation: "Periodic testing extent depends on agreed scope, available access, and ensuring adequate assessment of safety.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 88,
    question: "Verification of voltage drop by measurement requires:",
    options: ["Disconnected circuit", "Circuit energised under load", "No equipment connected", "Insulation tester"],
    correctAnswer: 1,
    explanation: "Voltage drop measurement requires the circuit to be energised with load connected to create the drop.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 89,
    question: "Testing SPDs (surge protective devices) during initial verification includes:",
    options: ["No tests required", "Verification of functional indicators and correct installation", "Applying surge voltage", "Disconnection and resistance test"],
    correctAnswer: 1,
    explanation: "SPD testing involves visual verification of correct installation and checking status indicators show normal operation.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 90,
    question: "External earth fault loop impedance (Ze) should be measured at:",
    options: ["Every socket", "The origin of the installation with the main switch off", "Final circuits only", "Anywhere convenient"],
    correctAnswer: 1,
    explanation: "Ze is measured at the origin, typically at the consumer unit with the main switch open to isolate the installation.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 91,
    question: "When should earth electrode resistance be tested?",
    options: ["Only for TT systems", "For TT systems and where used for functional earthing", "Never in the UK", "Only in summer"],
    correctAnswer: 1,
    explanation: "Earth electrode testing is required for TT systems and where earth electrodes provide other functions.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 92,
    question: "The test sequence for circuits with RCBOs differs from standard sequence because:",
    options: ["No testing needed", "The RCBO provides both overcurrent and RCD protection so both must be considered", "Only RCD test is needed", "Only continuity matters"],
    correctAnswer: 1,
    explanation: "RCBOs combine overcurrent and RCD protection, so testing must verify both functions.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 93,
    question: "Continuity testing of supplementary bonding requires:",
    options: ["Only visual inspection", "Measurement of resistance between bonded parts", "No testing in domestic premises", "Testing with supply on"],
    correctAnswer: 1,
    explanation: "Supplementary bonding continuity is verified by measuring resistance between connected parts.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 94,
    question: "Before performing live tests, you must have:",
    options: ["Customer permission only", "Completed dead tests satisfactorily and verified safe to energise", "Nothing specific", "New test leads"],
    correctAnswer: 1,
    explanation: "Live tests only proceed after dead tests confirm the installation is safe to energise.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 95,
    question: "Testing PELV circuits differs from SELV because:",
    options: ["No difference", "PELV has earth connection which must be verified", "PELV doesn't need testing", "Only visual inspection needed"],
    correctAnswer: 1,
    explanation: "PELV systems have earthed live parts, so both separation and earthing must be verified.",
    section: "5.3",
    difficulty: "advanced"
  },
  {
    id: 96,
    question: "The test sequence should be adjusted when:",
    options: ["Never", "Circumstances require different order for safety or practical reasons", "Customer prefers", "Equipment is expensive"],
    correctAnswer: 1,
    explanation: "While standard sequence is preferred, circumstances may require adjustment providing safety isn't compromised.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 97,
    question: "Testing continuity of ring final circuit conductors uses the figure-8 method to:",
    options: ["Save time", "Verify the ring is complete and identify any interconnections or breaks", "Create confusion", "Check cable size"],
    correctAnswer: 1,
    explanation: "The figure-8 test method verifies ring integrity and reveals any breaks or interconnections in the ring.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 98,
    question: "Operation of isolators and switching devices is tested:",
    options: ["Before any electrical tests", "After safety tests confirm safe operation", "Only in industrial premises", "Never required"],
    correctAnswer: 1,
    explanation: "Operational testing of switches follows completion of safety tests confirming safe to operate.",
    section: "5.3",
    difficulty: "basic"
  },
  {
    id: 99,
    question: "When testing motor circuits, additional tests may include:",
    options: ["No additional tests", "Rotation direction, phase sequence, and protective relay settings", "Only visual inspection", "Just insulation resistance"],
    correctAnswer: 1,
    explanation: "Motor circuits may require additional tests for rotation direction, phase sequence, and protective device settings.",
    section: "5.3",
    difficulty: "intermediate"
  },
  {
    id: 100,
    question: "Documentation of test sequence should:",
    options: ["Not mention sequence", "Record the sequence used and any deviations from standard", "Only record results", "Be verbal only"],
    correctAnswer: 1,
    explanation: "Documentation should record the testing sequence used and explain any deviations from standard practice.",
    section: "5.3",
    difficulty: "intermediate"
  },

  // Section 5.4: Test Values & Limits (Questions 101-135)
  {
    id: 101,
    question: "The minimum acceptable insulation resistance for a circuit up to 500V is:",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "0.1 MΩ"],
    correctAnswer: 1,
    explanation: "For circuits up to 500V, minimum insulation resistance is 1.0 MΩ when tested at 500V DC.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 102,
    question: "The test voltage for insulation resistance testing on SELV circuits is:",
    options: ["500V DC", "250V DC", "1000V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "SELV and PELV circuits up to 50V are tested at 250V DC with minimum 0.5 MΩ required.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 103,
    question: "For circuits above 500V, insulation resistance test voltage should be:",
    options: ["500V DC", "1000V DC", "250V DC", "Same as supply voltage"],
    correctAnswer: 1,
    explanation: "Circuits above 500V (e.g., three-phase industrial) are tested at 1000V DC.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 104,
    question: "The maximum disconnection time for a 32A final circuit protected by RCD is:",
    options: ["5 seconds", "0.4 seconds", "1 second", "0.2 seconds"],
    correctAnswer: 1,
    explanation: "Final circuits not exceeding 32A require 0.4s maximum disconnection time in TN systems.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 105,
    question: "A 30mA RCD must trip within 300ms at:",
    options: ["15mA", "30mA (rated residual current)", "150mA", "5mA"],
    correctAnswer: 1,
    explanation: "An RCD must trip within 300ms at its rated residual current (IΔn).",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 106,
    question: "At 5 times rated residual current (5 × IΔn), an RCD must trip within:",
    options: ["300ms", "40ms for general type, 150ms for S-type", "1 second", "No requirement"],
    correctAnswer: 1,
    explanation: "At 5×IΔn, general RCDs must trip within 40ms, while time-delayed (S-type) have 150ms maximum.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 107,
    question: "The continuity of protective conductors should be measured using:",
    options: ["Any instrument", "A low resistance ohmmeter capable of 200mA test current", "Insulation tester", "Earth loop tester"],
    correctAnswer: 1,
    explanation: "Continuity requires a low resistance ohmmeter with minimum 200mA test current for reliable measurements.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 108,
    question: "Maximum earth fault loop impedance values for protective devices are:",
    options: ["All the same", "Specific to device type and rating, listed in tables in BS 7671", "Only for RCDs", "Calculated by the installer"],
    correctAnswer: 1,
    explanation: "Maximum Zs values are specific to each protective device type and rating, listed in BS 7671 tables.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "When comparing measured loop impedance with maximum values, you should:",
    options: ["Use measured value directly", "Apply correction factor for conductor temperature", "Ignore temperature effects", "Only compare at 10°C"],
    correctAnswer: 1,
    explanation: "Temperature correction is needed as conductors are tested cold but operate warm, increasing resistance.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 110,
    question: "The maximum permitted value of R1+R2 for a circuit is determined by:",
    options: ["Cable length only", "Subtracting Ze from maximum Zs for the protective device", "Fixed value of 1 ohm", "Installation type"],
    correctAnswer: 1,
    explanation: "Maximum R1+R2 = Maximum Zs (from tables) minus Ze (external earth fault loop impedance).",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "For TT systems, earth electrode resistance should typically not exceed:",
    options: ["500Ω where 30mA RCD is used", "200Ω regardless of RCD", "1000Ω", "Any value is acceptable"],
    correctAnswer: 0,
    explanation: "With 30mA RCD protection, earth electrode resistance should be low enough to allow 50V touch voltage maximum.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 112,
    question: "The minimum recommended value for insulation resistance on an individual circuit is:",
    options: ["Greater than 1 MΩ", "Greater than 2 MΩ to allow for parallel paths", "Exactly 1 MΩ", "Any reading"],
    correctAnswer: 1,
    explanation: "While 1 MΩ is the minimum, individual circuits should exceed this to allow for parallel paths when whole installation is tested.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 113,
    question: "RCD test button operation is to be tested:",
    options: ["Only at commissioning", "Quarterly by the user", "Daily", "Never by users"],
    correctAnswer: 1,
    explanation: "Users should test RCDs using the test button quarterly to verify mechanical operation.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 114,
    question: "Prospective fault current at the origin must not exceed:",
    options: ["Any value", "The breaking capacity of the protective devices", "10kA always", "6kA for domestic"],
    correctAnswer: 1,
    explanation: "PFC must not exceed the rated breaking capacity of protective devices at that point.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "The test current for low resistance continuity measurement must be at least:",
    options: ["1mA", "200mA", "1A", "10A"],
    correctAnswer: 1,
    explanation: "Minimum 200mA test current is required to ensure reliable low resistance measurements.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 116,
    question: "Ring final circuit continuity readings for L-L, N-N, and CPC-CPC should be:",
    options: ["All different", "Within acceptable tolerance showing consistent cross-sectional area", "Exactly equal", "Random"],
    correctAnswer: 1,
    explanation: "End-to-end readings should be similar (allowing for different CPC size), indicating consistent conductors throughout.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "The 0.5 × IΔn RCD test verifies:",
    options: ["The RCD trips", "The RCD does NOT trip at half rated current", "Maximum trip time", "Minimum trip current"],
    correctAnswer: 1,
    explanation: "At 50% of rated current, the RCD should NOT trip, demonstrating it won't nuisance trip.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "Maximum voltage drop for lighting circuits from origin to point of use is:",
    options: ["10%", "3%", "5%", "8%"],
    correctAnswer: 1,
    explanation: "BS 7671 recommends maximum 3% voltage drop for lighting circuits (from origin to equipment).",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "For socket outlet circuits, maximum recommended voltage drop is:",
    options: ["3%", "5%", "8%", "10%"],
    correctAnswer: 1,
    explanation: "Maximum recommended voltage drop for other circuits (including sockets) is 5%.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 120,
    question: "An S-type (time-delayed) RCD must trip within 300ms at:",
    options: ["30mA", "IΔn (rated residual current)", "2 × IΔn", "5 × IΔn"],
    correctAnswer: 1,
    explanation: "S-type RCDs must trip within 300ms at rated current, but have intentional delay at higher currents.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 121,
    question: "Earth fault loop impedance measured at 32A Type B MCB protected socket must not exceed:",
    options: ["1.37Ω at 10°C, adjusted for temperature", "2.0Ω always", "1.0Ω", "Any reasonable value"],
    correctAnswer: 0,
    explanation: "Tables give maximum Zs at 10°C - measurements must be temperature-adjusted or compare with 80% rule value.",
    section: "5.4",
    difficulty: "advanced"
  },
  {
    id: 122,
    question: "When using the 'rule of thumb' 80% value for Zs comparison:",
    options: ["Add 20% to reading", "Compare reading to 80% of tabulated maximum", "Subtract 20% from reading", "Multiply reading by 1.2"],
    correctAnswer: 1,
    explanation: "The 80% rule: measured Zs should not exceed 80% of maximum tabulated value to allow temperature increase.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 123,
    question: "Minimum insulation resistance for a complete installation tested as a whole is:",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "Higher than individual circuits"],
    correctAnswer: 1,
    explanation: "Overall installation minimum is 1.0 MΩ, though individual circuits may show higher values.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 124,
    question: "For additional protection, RCDs protecting socket outlets must have a rating not exceeding:",
    options: ["100mA", "30mA", "10mA", "300mA"],
    correctAnswer: 1,
    explanation: "Additional protection for socket outlets requires RCDs with rated residual current not exceeding 30mA.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 125,
    question: "Continuity of main bonding conductors should give a reading of:",
    options: ["Zero exactly", "Low resistance typically below 0.05Ω", "Any value below 1Ω", "High resistance"],
    correctAnswer: 1,
    explanation: "Main bonding conductors should show very low resistance, typically well below 0.05Ω.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 126,
    question: "Maximum disconnection time for distribution circuits is:",
    options: ["0.4 seconds", "5 seconds", "1 second", "0.2 seconds"],
    correctAnswer: 1,
    explanation: "Distribution circuits (>32A) have maximum 5s disconnection time in TN systems.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 127,
    question: "A Type AC RCD tested at IΔn on DC should:",
    options: ["Trip normally", "Not trip as Type AC is for AC only", "Trip at double time", "Show error message"],
    correctAnswer: 1,
    explanation: "Type AC RCDs only detect AC earth fault currents and won't trip on DC residual currents.",
    section: "5.4",
    difficulty: "advanced"
  },
  {
    id: 128,
    question: "Polarity test at a lighting point should confirm:",
    options: ["Any arrangement is acceptable", "Phase connected to switch wire, not lamp holder", "Neutral to centre contact", "Earth to metal parts"],
    correctAnswer: 1,
    explanation: "Polarity verifies phase is switched and connected correctly, with neutral to lamp holder outer contact.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 129,
    question: "External earth fault loop impedance (Ze) in a typical TN-C-S system should be:",
    options: ["Greater than 1Ω", "Not greater than 0.35Ω typically", "Exactly 0.8Ω", "Any value is acceptable"],
    correctAnswer: 1,
    explanation: "TN-C-S systems typically have Ze values around 0.35Ω maximum - higher values suggest supply issues.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 130,
    question: "Measured insulation resistance between live conductors and earth should be:",
    options: ["Below 1 MΩ", "At least 1 MΩ with higher values preferred", "Exactly 2 MΩ", "Zero ohms"],
    correctAnswer: 1,
    explanation: "Insulation resistance should be at least 1 MΩ minimum, with higher values indicating better insulation quality.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 131,
    question: "For 10mA RCD protection (e.g., shaver sockets), trip time at IΔn must not exceed:",
    options: ["40ms", "300ms", "200ms", "500ms"],
    correctAnswer: 1,
    explanation: "All RCDs, regardless of rating, must trip within 300ms at rated residual current.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "A test reading of 0.95 MΩ insulation resistance should be considered:",
    options: ["Satisfactory", "Unsatisfactory - below minimum 1.0 MΩ", "Perfect", "Retested only"],
    correctAnswer: 1,
    explanation: "0.95 MΩ is below the minimum 1.0 MΩ requirement and should be investigated.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 133,
    question: "The open-circuit voltage of a low resistance ohmmeter should be between:",
    options: ["4V and 24V", "50V and 500V", "230V and 400V", "Less than 4V"],
    correctAnswer: 0,
    explanation: "Low resistance ohmmeters operate at 4V to 24V open-circuit to avoid damaging sensitive components.",
    section: "5.4",
    difficulty: "intermediate"
  },
  {
    id: 134,
    question: "R1+R2 values measured during testing should be recorded on:",
    options: ["No record needed", "The schedule of test results", "A separate document", "Verbal report only"],
    correctAnswer: 1,
    explanation: "R1+R2 measurements should be recorded on the schedule of test results for each circuit.",
    section: "5.4",
    difficulty: "basic"
  },
  {
    id: 135,
    question: "When testing reveals Zs exactly at the maximum limit, this should be:",
    options: ["Accepted without concern", "Investigated as it may exceed limits when conductors warm up", "Perfect result", "Recorded as satisfactory"],
    correctAnswer: 1,
    explanation: "Readings exactly at limits may exceed when warm - investigation or temperature correction is needed.",
    section: "5.4",
    difficulty: "intermediate"
  },

  // Section 5.5: Certification (Questions 136-165)
  {
    id: 136,
    question: "An Electrical Installation Certificate (EIC) is required for:",
    options: ["All work", "New installations, alterations, and additions", "Only commercial installations", "Repairs only"],
    correctAnswer: 1,
    explanation: "EICs are required for new installations and for alterations/additions that include new circuit(s).",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 137,
    question: "A Minor Electrical Installation Works Certificate is appropriate for:",
    options: ["New consumer unit installation", "Additions to existing circuits not involving new circuits", "Complete rewires", "All fault repairs"],
    correctAnswer: 1,
    explanation: "Minor works certificates cover additions like new socket outlets on existing circuits.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 138,
    question: "The declaration on an EIC confirms the installation complies with:",
    options: ["Manufacturer instructions only", "BS 7671 to the best of the signatory's knowledge and belief", "Customer requirements only", "Building regulations only"],
    correctAnswer: 1,
    explanation: "The declaration confirms compliance with BS 7671 to the best knowledge of the signatory.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 139,
    question: "Who should sign Part 1 of the EIC (design)?",
    options: ["Anyone", "Person responsible for the design", "Only qualified supervisors", "The customer"],
    correctAnswer: 1,
    explanation: "Part 1 must be signed by the person responsible for the design of the electrical installation.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 140,
    question: "Part 2 of the EIC (construction) should be signed by:",
    options: ["The designer", "Person responsible for construction/installation", "The tester", "The customer"],
    correctAnswer: 1,
    explanation: "Part 2 is signed by the person responsible for the construction and installation work.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 141,
    question: "Part 3 of the EIC (inspection and testing) must be signed by:",
    options: ["Any electrician", "A competent person responsible for inspection and testing", "The customer", "Building control"],
    correctAnswer: 1,
    explanation: "Part 3 requires signature from a competent person who conducted the inspection and testing.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 142,
    question: "Can one person sign all three parts of an EIC?",
    options: ["Never", "Yes, if they are competent in all three aspects", "Only for domestic work", "Only electricians can"],
    correctAnswer: 1,
    explanation: "One person can sign all parts if they have competence in design, construction, and testing.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 143,
    question: "An EICR must state whether the installation is:",
    options: ["Old or new", "Satisfactory or unsatisfactory for continued use", "Expensive or cheap", "Simple or complex"],
    correctAnswer: 1,
    explanation: "The overall assessment states whether the installation is satisfactory or unsatisfactory for continued use.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 144,
    question: "The schedule of inspections records:",
    options: ["Only test results", "Items visually inspected and whether they comply", "Customer complaints", "Material costs"],
    correctAnswer: 1,
    explanation: "The schedule of inspections documents what was visually inspected and the compliance status of each item.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 145,
    question: "The schedule of test results must include:",
    options: ["Only failed tests", "All test results for circuits tested", "Cost of testing", "Time taken"],
    correctAnswer: 1,
    explanation: "All relevant test results for each circuit must be recorded on the schedule of test results.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 146,
    question: "Who should receive a copy of the completed EIC?",
    options: ["Only the contractor", "The person ordering the work", "Building control only", "No one requires a copy"],
    correctAnswer: 1,
    explanation: "The person ordering the work should receive the original or a copy of the completed certificate.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 147,
    question: "For building regulations compliance in England, electrical work may require:",
    options: ["No notification", "Registration with a competent person scheme or building control notification", "Only an EIC", "Customer approval only"],
    correctAnswer: 1,
    explanation: "Notifiable work requires either competent person self-certification or building control notification.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 148,
    question: "The recommended next inspection date on an EICR should be based on:",
    options: ["Random selection", "Type, use, and condition of the installation", "Customer preference", "Fixed 10-year interval"],
    correctAnswer: 1,
    explanation: "Recommended inspection interval considers installation type, use, condition found, and relevant guidance.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 149,
    question: "When should departures from BS 7671 be recorded?",
    options: ["Never", "On the certificate with reasons", "Only verbally", "On a separate document"],
    correctAnswer: 1,
    explanation: "Any departures from BS 7671 must be recorded on the certificate with reasons.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "Certificates should be retained by the duty holder for:",
    options: ["1 year", "At least the life of the installation", "5 years only", "No retention required"],
    correctAnswer: 1,
    explanation: "Certificates should be retained for the life of the installation as they provide essential safety documentation.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 151,
    question: "The extent and limitations section of an EICR records:",
    options: ["Financial limitations", "What was and wasn't inspected/tested", "Time constraints only", "Equipment limitations"],
    correctAnswer: 1,
    explanation: "This section clearly defines the scope of inspection and any limitations on access or testing.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 152,
    question: "An EIC schedule of circuit details includes:",
    options: ["Only circuit numbers", "Circuit reference, description, protective devices, and cable details", "Cost of installation", "Installation time"],
    correctAnswer: 1,
    explanation: "Circuit schedules detail the reference, description, protective device ratings, and cable specifications.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "BS 7671 model forms are:",
    options: ["The only forms permitted", "Provided as guidance but equivalents may be used", "Legally required exactly as shown", "Only for domestic work"],
    correctAnswer: 1,
    explanation: "Model forms in BS 7671 are guidance - equivalent forms containing the same information may be used.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "Information about the earthing system should appear on:",
    options: ["Only the schedule", "The certificate showing type (TN-S, TN-C-S, TT, etc.)", "Verbal report only", "No record required"],
    correctAnswer: 1,
    explanation: "Earthing system type must be recorded on the certificate for future reference.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 155,
    question: "If parts of an installation are not covered by certification, this should be:",
    options: ["Not mentioned", "Clearly stated with reasons", "Covered by a verbal explanation", "Ignored"],
    correctAnswer: 1,
    explanation: "Limitations on certification scope must be clearly stated to avoid assumptions about uncertified parts.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "The prospective fault current at the origin should be recorded on:",
    options: ["A separate document", "The schedule of test results", "Nowhere", "Customer copy only"],
    correctAnswer: 1,
    explanation: "PFC at the origin is recorded on the schedule of test results to verify protective device suitability.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 157,
    question: "Multiple signatures on an EIC from different contractors indicates:",
    options: ["Poor workmanship", "Shared responsibility with each signing for their part", "Invalid certificate", "Higher quality"],
    correctAnswer: 1,
    explanation: "Different parties can sign for their responsible areas (design, construction, testing).",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 158,
    question: "The description of installation on a certificate should include:",
    options: ["Only the address", "Extent of installation covered and maximum demand", "Price of work", "Duration of installation"],
    correctAnswer: 1,
    explanation: "Description includes the extent of the installation covered and relevant supply and demand information.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 159,
    question: "For notifiable work under Part P, who issues the Building Regulations Compliance Certificate?",
    options: ["The electrician always", "The competent person scheme or local authority", "The customer", "No certificate required"],
    correctAnswer: 1,
    explanation: "Compliance certificates are issued by registered competent persons or local authority building control.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 160,
    question: "Amendment records to certification should:",
    options: ["Replace original certificate", "Be added as supplementary documentation", "Be verbal only", "Not be required"],
    correctAnswer: 1,
    explanation: "Amendments should be documented in addition to original certification, not replacing it.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 161,
    question: "An EICR issued with C1 classification must be followed up with:",
    options: ["No action required", "Immediate remedial action and re-inspection of affected items", "Next scheduled inspection", "Customer review only"],
    correctAnswer: 1,
    explanation: "C1 (danger present) requires immediate remedial action and re-inspection to verify safety.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "The supply characteristics recorded on certificates include:",
    options: ["Cost per unit", "System type, voltage, and current ratings", "Supplier name only", "Installation date"],
    correctAnswer: 1,
    explanation: "Supply characteristics include earthing system, nominal voltage, and supply details.",
    section: "5.5",
    difficulty: "intermediate"
  },
  {
    id: 163,
    question: "Test instrument details on certificates should include:",
    options: ["Cost of instruments", "Make/model, serial numbers, and calibration dates", "Age of instruments", "Brand preferences"],
    correctAnswer: 1,
    explanation: "Instrument details including calibration status demonstrate tests were performed with proper equipment.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 164,
    question: "Electronic certificates are:",
    options: ["Not permitted", "Acceptable if they contain all required information", "Only for commercial use", "Less valid than paper"],
    correctAnswer: 1,
    explanation: "Electronic certificates are acceptable provided they contain all required information and signatures.",
    section: "5.5",
    difficulty: "basic"
  },
  {
    id: 165,
    question: "When an installation has been tested by a third party (not the installer), this should be:",
    options: ["Hidden", "Clearly indicated on certification", "Not mentioned", "Only told to the customer"],
    correctAnswer: 1,
    explanation: "Third-party testing should be clearly indicated with appropriate signatures and contact details.",
    section: "5.5",
    difficulty: "intermediate"
  },

  // Section 5.6: Documentation (Questions 166-185)
  {
    id: 166,
    question: "As-fitted drawings should be provided when:",
    options: ["Never required", "The installation differs significantly from original design", "Only for commercial installations", "Customer specifically pays extra"],
    correctAnswer: 1,
    explanation: "As-fitted drawings should be provided when the installation differs from the original design documentation.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "Circuit charts at distribution boards should show:",
    options: ["Installation cost", "Circuit numbers, descriptions, and protective device ratings", "Electrician details", "Test dates only"],
    correctAnswer: 1,
    explanation: "Circuit charts identify each circuit with number, description, and protective device details.",
    section: "5.6",
    difficulty: "basic"
  },
  {
    id: 168,
    question: "Operating instructions for the installation should be:",
    options: ["Provided only if requested", "Provided to the person responsible for the installation", "Not part of documentation", "Only for complex systems"],
    correctAnswer: 1,
    explanation: "Appropriate operating instructions should be provided to the duty holder or occupier.",
    section: "5.6",
    difficulty: "basic"
  },
  {
    id: 169,
    question: "Records of previous inspections are valuable because they:",
    options: ["Have no value for current inspection", "Show trends and history of the installation", "Only help with invoicing", "Are required by law to be kept"],
    correctAnswer: 1,
    explanation: "Previous records help identify trends, deterioration, and changes to the installation over time.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 170,
    question: "Warning notices required on installations should be:",
    options: ["Optional", "Documented as part of inspection records", "Only installed not documented", "Customer's responsibility to document"],
    correctAnswer: 1,
    explanation: "Required warning notices should be documented to confirm they are present and appropriate.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 171,
    question: "Documentation of RCD test button operation frequency advice should:",
    options: ["Not be provided", "Advise quarterly testing by user", "Recommend daily testing", "Advise against any testing"],
    correctAnswer: 1,
    explanation: "Users should be advised to test RCDs using the test button at least quarterly.",
    section: "5.6",
    difficulty: "basic"
  },
  {
    id: 172,
    question: "Maintenance schedules for the installation should:",
    options: ["Never be provided", "Be provided as appropriate for the installation type", "Only for industrial installations", "Be verbal only"],
    correctAnswer: 1,
    explanation: "Appropriate maintenance schedules help ensure ongoing safety and should be provided where relevant.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 173,
    question: "Emergency procedures documentation should include:",
    options: ["Nothing specific", "Location of isolation points and emergency contacts", "Only fire procedures", "Electrical theory"],
    correctAnswer: 1,
    explanation: "Emergency documentation should identify isolation points and relevant emergency contacts.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 174,
    question: "Manufacturer's instructions for installed equipment should be:",
    options: ["Discarded after installation", "Retained and available for reference", "Only kept by installer", "Filed with building control"],
    correctAnswer: 1,
    explanation: "Manufacturer's instructions should be retained for maintenance and operation reference.",
    section: "5.6",
    difficulty: "basic"
  },
  {
    id: 175,
    question: "Logbooks for electrical installations are recommended for:",
    options: ["Never needed", "Recording maintenance and modifications over time", "Commercial premises only", "New builds only"],
    correctAnswer: 1,
    explanation: "Logbooks help track maintenance activities and modifications throughout installation life.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 176,
    question: "Information about special conditions affecting the installation should be:",
    options: ["Kept confidential", "Documented for future reference", "Not recorded", "Verbal only"],
    correctAnswer: 1,
    explanation: "Special conditions affecting design or maintenance should be documented for future work.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 177,
    question: "Maximum demand calculations should be:",
    options: ["Destroyed after installation", "Documented and available", "Only kept by designer", "Never written down"],
    correctAnswer: 1,
    explanation: "Maximum demand calculations should be documented for future reference and alterations.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 178,
    question: "Documentation of discrimination studies (where required) should show:",
    options: ["Cost analysis", "How protective devices are coordinated for selective operation", "Manufacturer preferences", "Installation speed"],
    correctAnswer: 1,
    explanation: "Discrimination studies document how protective devices coordinate to ensure selective operation.",
    section: "5.6",
    difficulty: "advanced"
  },
  {
    id: 179,
    question: "Risk assessments for electrical work should be:",
    options: ["Informal only", "Documented and retained", "Only for high voltage", "Not required in domestic premises"],
    correctAnswer: 1,
    explanation: "Risk assessments should be documented to demonstrate safety considerations and planning.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 180,
    question: "Handover documentation to the client should include:",
    options: ["Invoice only", "Certificates, operating instructions, and maintenance guidance", "Nothing specific", "Test equipment manuals"],
    correctAnswer: 1,
    explanation: "Complete handover includes certificates, instructions, maintenance guidance, and relevant documentation.",
    section: "5.6",
    difficulty: "basic"
  },
  {
    id: 181,
    question: "Documentation of cable routes is particularly important for:",
    options: ["Appearance", "Future maintenance and avoiding damage during building work", "Certification only", "Insurance purposes"],
    correctAnswer: 1,
    explanation: "Cable route documentation prevents damage during future work and aids maintenance access.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 182,
    question: "System earthing documentation should record:",
    options: ["Earth colour only", "Earthing arrangement type, main earth connection point, and bonding", "Cost of earthing materials", "Installation time"],
    correctAnswer: 1,
    explanation: "Earthing documentation records system type, connections, and bonding arrangements.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "Documentation of voltage optimisation or power quality equipment should include:",
    options: ["Nothing special", "Settings, operating parameters, and maintenance requirements", "Brand preference", "Colour scheme"],
    correctAnswer: 1,
    explanation: "Complex equipment requires documentation of settings and maintenance requirements.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 184,
    question: "Fire alarm system documentation provided alongside electrical certificates should:",
    options: ["Be separate only", "Cross-reference the electrical installation it serves", "Not be mentioned", "Replace electrical certificates"],
    correctAnswer: 1,
    explanation: "Fire alarm documentation should reference the electrical supply and interface with the installation.",
    section: "5.6",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "Photographic records of concealed elements are useful for:",
    options: ["Marketing purposes", "Future reference when elements are hidden", "Nothing practical", "Insurance only"],
    correctAnswer: 1,
    explanation: "Photos of concealed work provide valuable reference for future maintenance or modifications.",
    section: "5.6",
    difficulty: "basic"
  },

  // Section 5.7: Reporting (Questions 186-200)
  {
    id: 186,
    question: "Reports to clients about inspection findings should be:",
    options: ["Technical jargon only", "Clear and understandable to non-technical persons", "Verbal only", "Only written if requested"],
    correctAnswer: 1,
    explanation: "Reports should be written clearly so non-technical clients can understand the findings and recommendations.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 187,
    question: "When reporting dangerous conditions, the communication should be:",
    options: ["Delayed until convenient", "Immediate and documented", "Verbal only to avoid alarm", "Only in final report"],
    correctAnswer: 1,
    explanation: "Dangerous conditions require immediate communication to the responsible person, documented for records.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 188,
    question: "Recommendations for remedial work should include:",
    options: ["Only cost estimates", "Clear description of what's needed and why", "Brand specifications", "Installation timeframes"],
    correctAnswer: 1,
    explanation: "Recommendations should clearly explain what work is needed and the safety reasons for it.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 189,
    question: "Priority coding on reports helps clients understand:",
    options: ["Costs involved", "Urgency of required actions", "Contractor preferences", "Technical specifications"],
    correctAnswer: 1,
    explanation: "Priority codes (C1, C2, C3, FI) indicate urgency of action required for each observation.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 190,
    question: "Reports for landlords under private rented sector regulations must include:",
    options: ["Tenant names", "EICR showing satisfactory/unsatisfactory status", "Rent amounts", "Decoration requirements"],
    correctAnswer: 1,
    explanation: "Landlords require valid EICRs showing the installation is satisfactory or identifying work needed.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 191,
    question: "Verbal reporting of findings should be:",
    options: ["The only method needed", "Supported by written documentation", "Avoided completely", "More detailed than written reports"],
    correctAnswer: 1,
    explanation: "Verbal explanations should always be supported by written documentation for clarity and records.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 192,
    question: "When reporting to multiple stakeholders (e.g., building owner and tenant), reports should:",
    options: ["Only go to one party", "Be appropriate for each recipient's needs", "Contain different information", "Be verbal to tenants only"],
    correctAnswer: 1,
    explanation: "Reports may need to be tailored to different stakeholders while maintaining consistent technical content.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 193,
    question: "Follow-up reporting after remedial work should confirm:",
    options: ["Payment received", "Work completed and defects satisfactorily addressed", "Original inspector's opinion", "Time taken"],
    correctAnswer: 1,
    explanation: "Follow-up reports confirm remedial work has been completed and coded items satisfactorily addressed.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 194,
    question: "Reports should avoid:",
    options: ["Technical terms", "Ambiguous language that could be misinterpreted", "Specific recommendations", "Cost implications"],
    correctAnswer: 1,
    explanation: "Clear, unambiguous language prevents misunderstanding of safety-critical information.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 195,
    question: "Photographic evidence in reports is useful for:",
    options: ["Making reports longer", "Clearly showing conditions found", "Avoiding written descriptions", "Marketing purposes"],
    correctAnswer: 1,
    explanation: "Photos provide clear visual evidence of conditions and support written observations.",
    section: "5.7",
    difficulty: "basic"
  },
  {
    id: 196,
    question: "Reporting limitations on inspection scope is important because:",
    options: ["It reduces liability only", "It ensures clients understand what was and wasn't assessed", "Regulations require lengthy explanations", "It justifies higher charges"],
    correctAnswer: 1,
    explanation: "Clearly stating limitations ensures clients don't assume areas not inspected are satisfactory.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 197,
    question: "Confidentiality of inspection reports typically means:",
    options: ["Never sharing with anyone", "Sharing only with authorized parties as appropriate", "Making all reports public", "Only verbal communication"],
    correctAnswer: 1,
    explanation: "Reports should be shared with appropriate parties while respecting client confidentiality.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 198,
    question: "When observed conditions are serious but not immediately dangerous (C2), reporting should:",
    options: ["Minimise concern", "Clearly communicate urgency while not causing unnecessary alarm", "Overstate the danger", "Delay reporting"],
    correctAnswer: 1,
    explanation: "C2 conditions require clear communication of urgency without creating unnecessary panic.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 199,
    question: "Summary reports for complex installations should:",
    options: ["Replace detailed schedules", "Provide overview while referencing detailed documentation", "Contain all technical data", "Be verbal only"],
    correctAnswer: 1,
    explanation: "Summaries provide accessible overviews while detailed schedules contain complete technical data.",
    section: "5.7",
    difficulty: "intermediate"
  },
  {
    id: 200,
    question: "Report retention by the inspector should be:",
    options: ["Not necessary", "For a reasonable period matching certification requirements", "Only until payment", "Customer's responsibility only"],
    correctAnswer: 1,
    explanation: "Inspectors should retain report copies for reasonable periods, often matching certification retention guidance.",
    section: "5.7",
    difficulty: "intermediate"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module5Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module5Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module5Questions.filter(q => q.difficulty === difficulty);
};

export default module5Questions;
