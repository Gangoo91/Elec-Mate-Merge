import { QuizQuestion } from '@/types/quiz';

export const fireAlarmMockExamQuestions: QuizQuestion[] = [
  // Module 1 - Categories of Fire Alarm Systems (20 questions)
  {
    id: 1,
    question: "What is the minimum category of fire alarm system required for a single-family dwelling?",
    options: ["Category L1", "Category L2", "Category P1", "Category M"],
    correctAnswer: 3,
    explanation: "Category M systems are manual fire alarm systems suitable for single-family dwellings where occupants are familiar with the building."
  },
  {
    id: 2,
    question: "Which category provides detection throughout all areas except for certain excluded areas?",
    options: ["Category L1", "Category L2", "Category L3", "Category L4"],
    correctAnswer: 1,
    explanation: "Category L2 systems provide detection throughout all areas of the building except where specifically excluded."
  },
  {
    id: 3,
    question: "What type of premises would typically require a Category L1 system?",
    options: ["Shopping centres", "Offices", "Care homes", "Industrial warehouses"],
    correctAnswer: 2,
    explanation: "Category L1 systems providing maximum detection are typically required in care homes and similar high-risk premises."
  },
  {
    id: 4,
    question: "Which category is designed to protect escape routes only?",
    options: ["Category L3", "Category L4", "Category L5", "Category P1"],
    correctAnswer: 0,
    explanation: "Category L3 systems are designed to protect escape routes only, including circulation areas and rooms opening onto escape routes."
  },
  {
    id: 5,
    question: "What is the main purpose of a Category P1 system?",
    options: ["Life protection", "Property protection", "Environmental protection", "Asset protection"],
    correctAnswer: 1,
    explanation: "Category P1 systems are primarily designed for property protection rather than life safety."
  },
  {
    id: 6,
    question: "Which standard governs the design and installation of fire detection systems in domestic premises?",
    options: ["BS 5839-1", "BS 5839-6", "BS 5839-8", "BS 5839-9"],
    correctAnswer: 1,
    explanation: "BS 5839-6 covers the design and installation of fire detection and alarm systems in domestic premises."
  },
  {
    id: 7,
    question: "What is the maximum floor area that can be covered by a single zone in a Category L4 system?",
    options: ["600m²", "1000m²", "2000m²", "No limit"],
    correctAnswer: 2,
    explanation: "In Category L4 systems, a single zone can cover up to 2000m² or a single floor of a building."
  },
  {
    id: 8,
    question: "Which category would be most appropriate for a small office building?",
    options: ["Category L1", "Category L2", "Category L3", "Category L4"],
    correctAnswer: 3,
    explanation: "Category L4 is often suitable for small office buildings, providing detection in high-risk areas and escape routes."
  },
  {
    id: 9,
    question: "What does Category P2 systems primarily protect?",
    options: ["Specific risks or areas", "Entire building contents", "Life safety only", "Structural elements"],
    correctAnswer: 0,
    explanation: "Category P2 systems are designed to protect specific risks or defined areas within a building."
  },
  {
    id: 10,
    question: "Which document provides guidance on fire safety risk assessment?",
    options: ["PAS 79", "BS 5839-1", "BS 7974", "HM Government Fire Safety Risk Assessment guides"],
    correctAnswer: 3,
    explanation: "HM Government Fire Safety Risk Assessment guides provide comprehensive guidance for different premises types."
  },
  {
    id: 11,
    question: "In which type of building would you typically find a Category L5 system?",
    options: ["Hospitals", "Hotels", "Small shops", "Residential flats"],
    correctAnswer: 2,
    explanation: "Category L5 systems are localised systems suitable for small shops and similar premises."
  },
  {
    id: 12,
    question: "What is the key difference between Category L and Category P systems?",
    options: ["Detection technology used", "Primary purpose - life vs property protection", "Installation requirements", "Maintenance frequency"],
    correctAnswer: 1,
    explanation: "Category L systems are primarily for life protection, while Category P systems are for property protection."
  },
  {
    id: 13,
    question: "Which category requires detection in all areas where a fire might start and endanger occupants?",
    options: ["Category L1", "Category L2", "Category L3", "Category L4"],
    correctAnswer: 0,
    explanation: "Category L1 systems require detection throughout the building to provide the earliest possible warning."
  },
  {
    id: 14,
    question: "What is the minimum detection required for a Category M system?",
    options: ["Automatic detectors only", "Manual call points only", "Both automatic and manual", "Smoke alarms only"],
    correctAnswer: 1,
    explanation: "Category M systems are manual systems requiring only manual call points for fire alarm activation."
  },
  {
    id: 15,
    question: "Which category is most commonly installed in residential care homes?",
    options: ["Category L1", "Category L2", "Category L3", "Category LD2"],
    correctAnswer: 0,
    explanation: "Category L1 systems are typically required in care homes due to the vulnerability of occupants."
  },
  {
    id: 16,
    question: "What does LD2 stand for in fire alarm categorisation?",
    options: ["Large Detection 2", "Life Detection 2", "Limited Detection 2", "Low-risk Domestic 2"],
    correctAnswer: 2,
    explanation: "LD2 refers to Limited Detection grade 2, which provides detection in escape routes and high-risk areas in domestic premises."
  },
  {
    id: 17,
    question: "Which system category would be appropriate for protecting a computer server room?",
    options: ["Category L3", "Category L4", "Category P1", "Category P2"],
    correctAnswer: 3,
    explanation: "Category P2 systems are designed to protect specific high-value areas like computer server rooms."
  },
  {
    id: 18,
    question: "What is the maximum travel distance to a manual call point in most buildings?",
    options: ["30m", "45m", "60m", "75m"],
    correctAnswer: 1,
    explanation: "The maximum travel distance to a manual call point is typically 45m in most buildings."
  },
  {
    id: 19,
    question: "Which category provides the minimum level of automatic fire detection?",
    options: ["Category L4", "Category L5", "Category P2", "Category M"],
    correctAnswer: 1,
    explanation: "Category L5 systems provide localised detection and represent the minimum level of automatic detection."
  },
  {
    id: 20,
    question: "What type of building would benefit most from a Category P1 system?",
    options: ["School", "Hospital", "Warehouse storing valuable goods", "Residential home"],
    correctAnswer: 2,
    explanation: "Category P1 systems for comprehensive property protection are most beneficial in warehouses storing valuable goods."
  },

  // Module 2 - Detectors, Call Points, and Alarm Devices (25 questions)
  {
    id: 21,
    question: "What is the maximum coverage area for a single optical smoke detector in a normal risk area?",
    options: ["60m²", "84m²", "100m²", "120m²"],
    correctAnswer: 1,
    explanation: "In normal risk areas, a single optical smoke detector can cover a maximum of 84m²."
  },
  {
    id: 22,
    question: "Which type of detector is most suitable for detecting smouldering fires?",
    options: ["Ionisation smoke detector", "Optical smoke detector", "Heat detector", "Flame detector"],
    correctAnswer: 1,
    explanation: "Optical smoke detectors are most effective at detecting smouldering fires that produce visible smoke particles."
  },
  {
    id: 23,
    question: "At what height should manual call points normally be mounted?",
    options: ["1.0m", "1.2m", "1.4m", "1.6m"],
    correctAnswer: 2,
    explanation: "Manual call points should be mounted at 1.4m ±0.1m above floor level."
  },
  {
    id: 24,
    question: "What is the typical response temperature for a Grade A1 heat detector?",
    options: ["54-65°C", "57-68°C", "68-79°C", "79-109°C"],
    correctAnswer: 1,
    explanation: "Grade A1 heat detectors typically respond at temperatures between 57-68°C."
  },
  {
    id: 25,
    question: "Which detector type is most prone to false alarms from cooking activities?",
    options: ["Optical smoke detector", "Ionisation smoke detector", "Heat detector", "Multi-sensor detector"],
    correctAnswer: 1,
    explanation: "Ionisation smoke detectors are most sensitive to small particles and prone to false alarms from cooking."
  },
  {
    id: 26,
    question: "What is the maximum spacing between smoke detectors in a corridor?",
    options: ["7.5m", "10m", "15m", "30m"],
    correctAnswer: 2,
    explanation: "The maximum spacing between smoke detectors in corridors is 15m."
  },
  {
    id: 27,
    question: "Which type of detector would be most appropriate in a dusty warehouse environment?",
    options: ["Optical smoke detector", "Ionisation smoke detector", "Heat detector", "Beam detector"],
    correctAnswer: 2,
    explanation: "Heat detectors are least affected by dust and most suitable for dusty industrial environments."
  },
  {
    id: 28,
    question: "What is the minimum sound level for fire alarm sounders in occupied areas?",
    options: ["60dB(A)", "65dB(A)", "75dB(A)", "85dB(A)"],
    correctAnswer: 1,
    explanation: "Fire alarm sounders must achieve a minimum of 65dB(A) in occupied areas or 5dB above ambient noise."
  },
  {
    id: 29,
    question: "Which detector technology combines smoke and heat detection?",
    options: ["Aspirating detector", "Multi-sensor detector", "Beam detector", "Linear heat detector"],
    correctAnswer: 1,
    explanation: "Multi-sensor detectors combine optical smoke detection with heat detection to reduce false alarms."
  },
  {
    id: 30,
    question: "What is the typical beam path length range for optical beam smoke detectors?",
    options: ["5-50m", "10-100m", "15-150m", "50-500m"],
    correctAnswer: 1,
    explanation: "Optical beam smoke detectors typically operate with beam paths between 10-100m."
  },
  {
    id: 31,
    question: "Which colour should manual call point glass be?",
    options: ["Clear", "Red", "Green", "Blue"],
    correctAnswer: 1,
    explanation: "Manual call point glass should be red to ensure clear identification during emergencies."
  },
  {
    id: 32,
    question: "What is the maximum coverage radius for a heat detector in normal conditions?",
    options: ["5.2m", "6.5m", "7.5m", "9.0m"],
    correctAnswer: 2,
    explanation: "Heat detectors have a maximum coverage radius of 7.5m in normal risk areas."
  },
  {
    id: 33,
    question: "Which type of detector is best suited for very high ceiling applications?",
    options: ["Point smoke detector", "Aspirating detector", "Standard heat detector", "Multi-sensor detector"],
    correctAnswer: 1,
    explanation: "Aspirating detectors are most suitable for very high ceiling applications due to their sampling pipe network."
  },
  {
    id: 34,
    question: "What does IP65 rating indicate for fire alarm devices?",
    options: ["Fire resistance", "Dust tight and water jet protected", "Explosion proof", "High temperature resistant"],
    correctAnswer: 1,
    explanation: "IP65 rating indicates the device is dust tight and protected against water jets from any direction."
  },
  {
    id: 35,
    question: "Which sounder tone is recommended for fire alarm evacuation signals?",
    options: ["Continuous tone", "Intermittent tone", "Two-tone signal", "Voice evacuation only"],
    correctAnswer: 0,
    explanation: "A continuous tone is the standard evacuation signal for fire alarm systems."
  },
  {
    id: 36,
    question: "What is the maximum distance between visual alarm devices?",
    options: ["25m", "30m", "35m", "40m"],
    correctAnswer: 1,
    explanation: "Visual alarm devices should be spaced no more than 30m apart to ensure adequate coverage."
  },
  {
    id: 37,
    question: "Which detector type uses radioactive material?",
    options: ["Optical smoke detector", "Ionisation smoke detector", "Heat detector", "Flame detector"],
    correctAnswer: 1,
    explanation: "Ionisation smoke detectors use a small amount of radioactive material (typically Americium-241)."
  },
  {
    id: 38,
    question: "What is the typical detection range for a flame detector?",
    options: ["5-10m", "10-20m", "20-30m", "30-50m"],
    correctAnswer: 2,
    explanation: "Flame detectors typically have a detection range of 20-30m depending on the fire size and conditions."
  },
  {
    id: 39,
    question: "Which parameter is most important when selecting heat detectors?",
    options: ["Response time", "Operating temperature", "Physical size", "Power consumption"],
    correctAnswer: 1,
    explanation: "Operating temperature is the most critical parameter as it must be suitable for the ambient conditions."
  },
  {
    id: 40,
    question: "What type of detector is a linear heat detector classified as?",
    options: ["Point detector", "Line detector", "Area detector", "Volumetric detector"],
    correctAnswer: 1,
    explanation: "Linear heat detectors are classified as line detectors as they detect heat along their entire length."
  },
  {
    id: 41,
    question: "Which visual alarm device characteristic is most important for effectiveness?",
    options: ["Colour", "Flash rate", "Light intensity", "Physical size"],
    correctAnswer: 2,
    explanation: "Light intensity (measured in candela) is the most critical factor for visual alarm device effectiveness."
  },
  {
    id: 42,
    question: "What is the standard flash rate for visual alarm devices?",
    options: ["0.5Hz", "1Hz", "2Hz", "5Hz"],
    correctAnswer: 1,
    explanation: "Visual alarm devices should flash at a rate of 1Hz (one flash per second) for optimal effectiveness."
  },
  {
    id: 43,
    question: "Which detector would be most appropriate in a kitchen area?",
    options: ["Ionisation smoke detector", "Optical smoke detector", "Heat detector", "Multi-sensor detector"],
    correctAnswer: 2,
    explanation: "Heat detectors are most appropriate in kitchens as they're less prone to false alarms from cooking vapours."
  },
  {
    id: 44,
    question: "What is the maximum ambient temperature for standard electronic detectors?",
    options: ["40°C", "50°C", "55°C", "60°C"],
    correctAnswer: 2,
    explanation: "Standard electronic fire detectors are rated for maximum ambient temperatures of 55°C."
  },
  {
    id: 45,
    question: "Which type of manual call point requires a key to reset?",
    options: ["Glass break type", "Resettable element type", "Key operated type", "Push button type"],
    correctAnswer: 1,
    explanation: "Resettable element type manual call points require a special key to reset after activation."
  },

  // Module 3 - System Design and Zone Planning (20 questions)
  {
    id: 46,
    question: "What is the maximum number of detectors that should be connected to a single zone?",
    options: ["20", "32", "50", "No specific limit"],
    correctAnswer: 1,
    explanation: "BS 5839-1 recommends a maximum of 32 detectors per zone for effective zone identification."
  },
  {
    id: 47,
    question: "What is the minimum mounting height for ceiling-mounted smoke detectors?",
    options: ["0.6m", "0.8m", "1.0m", "1.2m"],
    correctAnswer: 0,
    explanation: "Smoke detectors should be mounted at least 0.6m below the ceiling to avoid dead air spaces."
  },
  {
    id: 48,
    question: "In open-plan offices, what factor determines detector spacing?",
    options: ["Ceiling height only", "Room area only", "Both ceiling height and furniture layout", "Building occupancy"],
    correctAnswer: 2,
    explanation: "Detector spacing depends on both ceiling height and furniture layout which can affect smoke flow patterns."
  },
  {
    id: 49,
    question: "What is the maximum zone size for a Category L4 system?",
    options: ["300m²", "600m²", "1000m²", "2000m²"],
    correctAnswer: 3,
    explanation: "Category L4 systems can have zones up to 2000m² or cover a complete floor of a building."
  },
  {
    id: 50,
    question: "Where should detectors be positioned relative to air conditioning vents?",
    options: ["Directly above them", "At least 1.5m away", "At least 3m away", "Position doesn't matter"],
    correctAnswer: 1,
    explanation: "Detectors should be positioned at least 1.5m away from air conditioning vents to prevent false alarms."
  },
  {
    id: 51,
    question: "What is the recommended zone indication method for large buildings?",
    options: ["Alphanumeric coding", "Floor plans", "Text displays", "All of the above"],
    correctAnswer: 3,
    explanation: "Large buildings benefit from multiple zone indication methods including alphanumeric coding, floor plans, and text displays."
  },
  {
    id: 52,
    question: "How should zones be arranged in multi-storey buildings?",
    options: ["Random arrangement", "By building function", "Logically by floor/area", "By detector type"],
    correctAnswer: 2,
    explanation: "Zones should be arranged logically by floor or functional area to aid emergency response."
  },
  {
    id: 53,
    question: "What is the minimum separation distance between smoke detectors?",
    options: ["No minimum", "1m", "3m", "5m"],
    correctAnswer: 0,
    explanation: "There is no minimum separation distance between smoke detectors in BS 5839-1."
  },
  {
    id: 54,
    question: "Which factor most affects smoke detector coverage area?",
    options: ["Detector type", "Ceiling height", "Room temperature", "Humidity levels"],
    correctAnswer: 1,
    explanation: "Ceiling height is the primary factor affecting smoke detector coverage area calculations."
  },
  {
    id: 55,
    question: "In sloped ceiling applications, where should detectors be positioned?",
    options: ["At the lowest point", "At the highest point", "Within 1m of the highest point", "Evenly distributed"],
    correctAnswer: 2,
    explanation: "On sloped ceilings, detectors should be positioned within 1m of the highest point where smoke accumulates."
  },
  {
    id: 56,
    question: "What is the maximum distance between the control panel and the most remote device?",
    options: ["100m", "300m", "500m", "1000m"],
    correctAnswer: 2,
    explanation: "The maximum circuit length from control panel to the most remote device should not exceed 500m to maintain signal integrity."
  },
  {
    id: 57,
    question: "How should zones be sized in residential care homes?",
    options: ["One zone per floor", "Multiple small zones", "Single zone for entire building", "Zones by room type"],
    correctAnswer: 1,
    explanation: "Care homes require multiple small zones to provide precise location information for vulnerable occupants."
  },
  {
    id: 58,
    question: "What environmental factor can affect optical smoke detector performance?",
    options: ["High humidity", "Low temperature", "Strong air movement", "All of the above"],
    correctAnswer: 3,
    explanation: "High humidity, low temperature, and strong air movement can all affect optical smoke detector performance."
  },
  {
    id: 59,
    question: "In areas with high ceilings (>6m), what detection strategy is recommended?",
    options: ["Standard point detectors", "Aspirating detection systems", "More sensitive detectors", "Heat detectors only"],
    correctAnswer: 1,
    explanation: "Aspirating detection systems are recommended for high ceiling areas as they can detect smoke before it reaches the ceiling."
  },
  {
    id: 60,
    question: "What is the purpose of detection zones in fire alarm design?",
    options: ["Cost reduction", "Location identification", "System redundancy", "Maintenance scheduling"],
    correctAnswer: 1,
    explanation: "Detection zones provide location identification to help emergency responders locate the source of fire quickly."
  },
  {
    id: 61,
    question: "Which room type typically requires the highest level of detection?",
    options: ["Offices", "Corridors", "Plant rooms", "Storage areas"],
    correctAnswer: 1,
    explanation: "Corridors require high detection levels as they are critical escape routes and must remain clear of smoke."
  },
  {
    id: 62,
    question: "What is the recommended approach for detector spacing in irregularly shaped rooms?",
    options: ["Use average dimensions", "Divide into regular sections", "Apply safety factors", "Use engineering judgment"],
    correctAnswer: 1,
    explanation: "Irregularly shaped rooms should be divided into regular sections for detector spacing calculations."
  },
  {
    id: 63,
    question: "How does ceiling height affect smoke detector sensitivity settings?",
    options: ["Higher ceilings require less sensitivity", "Higher ceilings require more sensitivity", "No relationship", "Depends on room area"],
    correctAnswer: 1,
    explanation: "Higher ceilings require more sensitive detectors as smoke disperses and cools as it rises."
  },
  {
    id: 64,
    question: "What is the maximum recommended area for a single detection zone?",
    options: ["1000m²", "2000m²", "3000m²", "No specific limit"],
    correctAnswer: 1,
    explanation: "BS 5839-1 recommends a maximum zone area of 2000m² for effective emergency response."
  },
  {
    id: 65,
    question: "Which design consideration is most important for escape route detection?",
    options: ["Early warning", "Precise location", "Multiple technologies", "High sensitivity"],
    correctAnswer: 0,
    explanation: "Early warning is most critical for escape route detection to ensure occupants can evacuate safely."
  },

  // Module 4 - Power Supply, Backup, and Cable Routing (20 questions)
  {
    id: 66,
    question: "What is the minimum standby battery duration for most fire alarm systems?",
    options: ["4 hours", "8 hours", "24 hours", "72 hours"],
    correctAnswer: 2,
    explanation: "Most fire alarm systems require a minimum 24-hour standby battery capacity followed by 30 minutes of alarm operation."
  },
  {
    id: 67,
    question: "Which cable type provides 30 minutes fire resistance?",
    options: ["FP200", "PH30", "MICC", "Standard PVC"],
    correctAnswer: 1,
    explanation: "PH30 cables are specifically designed to provide 30 minutes fire resistance for fire alarm circuits."
  },
  {
    id: 68,
    question: "What voltage is typically used for fire alarm system power supply?",
    options: ["12V DC", "24V DC", "48V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "24V DC is the standard voltage for most fire alarm system power supplies and devices."
  },
  {
    id: 69,
    question: "What is the maximum voltage drop allowed in fire alarm circuits?",
    options: ["2%", "5%", "10%", "15%"],
    correctAnswer: 1,
    explanation: "Fire alarm circuits should not exceed 5% voltage drop to ensure reliable operation of devices."
  },
  {
    id: 70,
    question: "Which backup power arrangement provides the highest reliability?",
    options: ["Single battery bank", "Dual battery banks", "Generator backup", "UPS system"],
    correctAnswer: 1,
    explanation: "Dual battery banks provide the highest reliability through redundancy in backup power supply."
  },
  {
    id: 71,
    question: "What type of cable is required for critical fire alarm circuits?",
    options: ["Fire-resistant cable", "Armoured cable", "Screened cable", "All of the above"],
    correctAnswer: 0,
    explanation: "Fire-resistant cable is essential for critical circuits to maintain circuit integrity during fire conditions."
  },
  {
    id: 72,
    question: "How often should fire alarm system batteries be tested?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctAnswer: 1,
    explanation: "Fire alarm system batteries should be tested monthly to ensure they maintain adequate capacity."
  },
  {
    id: 73,
    question: "What is the typical life expectancy of sealed lead-acid batteries in fire alarm systems?",
    options: ["2 years", "4 years", "6 years", "10 years"],
    correctAnswer: 1,
    explanation: "Sealed lead-acid batteries typically have a 4-year life expectancy in fire alarm applications."
  },
  {
    id: 74,
    question: "Which factor most affects battery standby time calculations?",
    options: ["Ambient temperature", "System load current", "Battery age", "Cable length"],
    correctAnswer: 1,
    explanation: "System load current is the primary factor in calculating required battery capacity and standby time."
  },
  {
    id: 75,
    question: "What protection is required for fire alarm power supplies?",
    options: ["Fuse protection only", "RCD protection", "Both fuse and RCD", "No specific requirements"],
    correctAnswer: 0,
    explanation: "Fire alarm power supplies require fuse protection but RCDs are not recommended as they could cause unwanted tripping."
  },
  {
    id: 76,
    question: "Where should fire alarm cables be routed in preference to other areas?",
    options: ["Above suspended ceilings", "In protected routes", "Underground", "Externally"],
    correctAnswer: 1,
    explanation: "Fire alarm cables should preferably be routed in protected routes such as fire-resistant enclosures."
  },
  {
    id: 77,
    question: "What segregation distance is required between fire alarm and power cables?",
    options: ["50mm", "100mm", "200mm", "300mm"],
    correctAnswer: 2,
    explanation: "A minimum segregation distance of 200mm is required between fire alarm and power cables to prevent interference."
  },
  {
    id: 78,
    question: "Which mains supply arrangement is preferred for fire alarm systems?",
    options: ["Shared with other systems", "Dedicated supply", "Emergency supply only", "Generator supply"],
    correctAnswer: 1,
    explanation: "A dedicated mains supply is preferred for fire alarm systems to ensure reliability and avoid interference."
  },
  {
    id: 79,
    question: "What happens if the fire alarm battery charger fails?",
    options: ["System shuts down immediately", "Backup time is reduced", "No immediate effect", "Alarm condition triggered"],
    correctAnswer: 1,
    explanation: "If the charger fails, the system continues on battery power but backup time is gradually reduced."
  },
  {
    id: 80,
    question: "Which cable installation method provides best fire resistance?",
    options: ["Surface mounting", "Conduit installation", "Cable tray", "Embedded in structure"],
    correctAnswer: 3,
    explanation: "Embedding cables in fire-resistant building structure provides the best fire resistance."
  },
  {
    id: 81,
    question: "What monitoring is required for fire alarm power supplies?",
    options: ["Voltage monitoring only", "Current monitoring only", "Both voltage and current", "No monitoring required"],
    correctAnswer: 0,
    explanation: "Fire alarm systems must monitor supply voltage and indicate any failure or reduction below acceptable levels."
  },
  {
    id: 82,
    question: "Which battery type is most commonly used in fire alarm systems?",
    options: ["Nickel-cadmium", "Lithium", "Sealed lead-acid", "Alkaline"],
    correctAnswer: 2,
    explanation: "Sealed lead-acid batteries are most commonly used in fire alarm systems due to their reliability and cost-effectiveness."
  },
  {
    id: 83,
    question: "What is the maximum resistance allowed for fire alarm earthing systems?",
    options: ["1 ohm", "5 ohms", "10 ohms", "20 ohms"],
    correctAnswer: 2,
    explanation: "Fire alarm earthing systems should not exceed 10 ohms resistance for proper operation and safety."
  },
  {
    id: 84,
    question: "How should fire alarm cable joints be made?",
    options: ["Wire nuts", "Crimped connections", "Soldered joints", "Screw terminals"],
    correctAnswer: 1,
    explanation: "Crimped connections are preferred for fire alarm cables as they provide reliable, maintenance-free joints."
  },
  {
    id: 85,
    question: "What causes the most common power supply problems in fire alarm systems?",
    options: ["Cable faults", "Battery failure", "Charger problems", "Mains supply issues"],
    correctAnswer: 1,
    explanation: "Battery failure is the most common power supply problem, often due to age or inadequate maintenance."
  },

  // Module 5 - Installation and Commissioning (20 questions)
  {
    id: 86,
    question: "When should fire alarm installation begin in a construction project?",
    options: ["First fix stage", "Second fix stage", "After decoration", "After practical completion"],
    correctAnswer: 1,
    explanation: "Fire alarm installation typically begins during second fix after basic building services are in place."
  },
  {
    id: 87,
    question: "What is the first step in commissioning a fire alarm system?",
    options: ["Detector testing", "Visual inspection", "Documentation review", "Battery test"],
    correctAnswer: 1,
    explanation: "Visual inspection of the complete installation is the first step in the commissioning process."
  },
  {
    id: 88,
    question: "Which document must be provided at handover?",
    options: ["Installation certificate only", "User manual only", "Both certificate and manual", "Warranty document only"],
    correctAnswer: 2,
    explanation: "Both the installation certificate and comprehensive user manual must be provided at system handover."
  },
  {
    id: 89,
    question: "What percentage of detectors should be tested during commissioning?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: 3,
    explanation: "All detectors (100%) must be tested during commissioning to ensure correct operation."
  },
  {
    id: 90,
    question: "How should detector addresses be recorded?",
    options: ["In installation manual", "On commissioning certificate", "On site drawings", "All of the above"],
    correctAnswer: 3,
    explanation: "Detector addresses should be recorded in multiple documents for future reference and maintenance."
  },
  {
    id: 91,
    question: "What training should be provided to building occupants?",
    options: ["System operation only", "Evacuation procedures only", "Both operation and evacuation", "No training required"],
    correctAnswer: 2,
    explanation: "Training should cover both basic system operation and evacuation procedures for all occupants."
  },
  {
    id: 92,
    question: "Which test should be performed first during commissioning?",
    options: ["Detector function test", "Sounder test", "Power supply test", "Battery test"],
    correctAnswer: 2,
    explanation: "Power supply tests should be performed first to ensure the system has adequate power for all other tests."
  },
  {
    id: 93,
    question: "What is the purpose of the 'cause and effect' matrix?",
    options: ["Cost calculation", "System programming", "Maintenance scheduling", "Design validation"],
    correctAnswer: 1,
    explanation: "The cause and effect matrix defines how the system should respond to various input conditions during programming."
  },
  {
    id: 94,
    question: "How long should the installation certificate be retained?",
    options: ["1 year", "5 years", "Life of the system", "No specific requirement"],
    correctAnswer: 2,
    explanation: "Installation certificates should be retained for the life of the system as they form part of the permanent record."
  },
  {
    id: 95,
    question: "What information must be included on detector labels?",
    options: ["Address only", "Zone number only", "Address and zone", "Installation date"],
    correctAnswer: 2,
    explanation: "Detector labels must include both the device address and zone number for identification purposes."
  },
  {
    id: 96,
    question: "Which commissioning test verifies detector sensitivity?",
    options: ["Magnet test", "Aerosol test", "Heat test", "All of the above"],
    correctAnswer: 3,
    explanation: "Different detector types require different sensitivity tests - magnetic test for some, aerosol for smoke detectors, heat for thermal detectors."
  },
  {
    id: 97,
    question: "What should happen if a detector fails commissioning tests?",
    options: ["Replace immediately", "Adjust sensitivity", "Record and continue", "Isolate device"],
    correctAnswer: 0,
    explanation: "Any detector failing commissioning tests should be replaced immediately before system acceptance."
  },
  {
    id: 98,
    question: "How should cable routes be documented?",
    options: ["Verbal description", "Photographs", "As-built drawings", "Not required"],
    correctAnswer: 2,
    explanation: "Cable routes should be documented on as-built drawings for future maintenance and modifications."
  },
  {
    id: 99,
    question: "What is the purpose of proving tests during installation?",
    options: ["Cost justification", "Quality assurance", "Insurance requirements", "Legal compliance"],
    correctAnswer: 1,
    explanation: "Proving tests during installation ensure quality assurance and verify that work meets specifications."
  },
  {
    id: 100,
    question: "Which document records the acceptance of the installation by the client?",
    options: ["Test certificate", "Handover certificate", "Completion certificate", "Acceptance certificate"],
    correctAnswer: 1,
    explanation: "The handover certificate formally records the client's acceptance of the completed installation."
  },
  {
    id: 101,
    question: "What coordination is required with other building services during installation?",
    options: ["None required", "Electrical services only", "All building services", "HVAC systems only"],
    correctAnswer: 2,
    explanation: "Fire alarm installation requires coordination with all building services to avoid conflicts and ensure integration."
  },
  {
    id: 102,
    question: "How should temporary systems be handled during phased installation?",
    options: ["Not permitted", "Temporary connections allowed", "Separate temporary system", "Partial commissioning"],
    correctAnswer: 2,
    explanation: "During phased installation, a separate temporary fire alarm system may be required to maintain fire safety."
  },
  {
    id: 103,
    question: "What health and safety considerations apply during installation?",
    options: ["Standard electrical safety", "Working at height regulations", "Site-specific risks", "All of the above"],
    correctAnswer: 3,
    explanation: "Fire alarm installation involves all standard safety considerations plus site-specific risks that must be assessed."
  },
  {
    id: 104,
    question: "Which tool is essential for commissioning addressable systems?",
    options: ["Multimeter", "Programming software", "Oscilloscope", "Insulation tester"],
    correctAnswer: 1,
    explanation: "Programming software is essential for configuring and commissioning addressable fire alarm systems."
  },
  {
    id: 105,
    question: "What should be done if building works continue after system installation?",
    options: ["No special measures", "Protect installed equipment", "Remove and reinstall", "Temporary disconnection"],
    correctAnswer: 1,
    explanation: "Installed fire alarm equipment must be protected from damage during continuing building works."
  },

  // Module 6 - Testing, Servicing, and Certification (20 questions)
  {
    id: 106,
    question: "How often should fire alarm systems be serviced according to BS 5839-1?",
    options: ["Monthly", "Quarterly", "Every 6 months", "Annually"],
    correctAnswer: 2,
    explanation: "BS 5839-1 requires fire alarm systems to be serviced every 6 months by a competent person."
  },
  {
    id: 107,
    question: "What is the maximum interval between full system tests?",
    options: ["6 months", "12 months", "18 months", "24 months"],
    correctAnswer: 1,
    explanation: "A full system test including all devices and functions should be carried out at least annually."
  },
  {
    id: 108,
    question: "Who should carry out weekly fire alarm tests?",
    options: ["Fire service", "Maintenance company", "Responsible person", "Local authority"],
    correctAnswer: 2,
    explanation: "Weekly routine tests should be carried out by the responsible person or their nominated deputy."
  },
  {
    id: 109,
    question: "What percentage of detectors should be tested annually?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: 0,
    explanation: "At least 25% of detectors should be tested annually, with different detectors tested each year to cover all over 4 years."
  },
  {
    id: 110,
    question: "Which document certifies that servicing has been carried out?",
    options: ["Service report", "Test certificate", "Compliance certificate", "Maintenance log"],
    correctAnswer: 0,
    explanation: "A service report should be issued after each service visit documenting work carried out and system condition."
  },
  {
    id: 111,
    question: "What should be done if a fire alarm system develops a fault?",
    options: ["Ignore until next service", "Report immediately", "Attempt repair", "Disconnect system"],
    correctAnswer: 1,
    explanation: "Any system fault should be reported immediately to the maintenance company for urgent attention."
  },
  {
    id: 112,
    question: "How long should test records be retained?",
    options: ["1 year", "2 years", "5 years", "Permanently"],
    correctAnswer: 1,
    explanation: "Test records should be retained for at least 2 years to demonstrate ongoing compliance."
  },
  {
    id: 113,
    question: "What is the purpose of the weekly test?",
    options: ["Full system check", "Battery test", "Basic operation verification", "Detector cleaning"],
    correctAnswer: 2,
    explanation: "Weekly tests verify basic system operation by testing a sample of manual call points and checking panel functions."
  },
  {
    id: 114,
    question: "Which component requires the most frequent replacement?",
    options: ["Detectors", "Control panel", "Batteries", "Cables"],
    correctAnswer: 2,
    explanation: "Batteries typically require the most frequent replacement, usually every 4-5 years."
  },
  {
    id: 115,
    question: "What training is required for service technicians?",
    options: ["Basic electrical", "Fire alarm specific", "Manufacturer training", "All of the above"],
    correctAnswer: 3,
    explanation: "Service technicians require basic electrical knowledge, fire alarm specific training, and manufacturer-specific training."
  },
  {
    id: 116,
    question: "How should false alarms be recorded?",
    options: ["Not necessary to record", "In the log book", "Report to fire service", "All of the above"],
    correctAnswer: 3,
    explanation: "False alarms should be recorded in the log book and may need to be reported to the fire service depending on local arrangements."
  },
  {
    id: 117,
    question: "What is the consequence of not maintaining fire alarm systems?",
    options: ["Insurance may be void", "Legal prosecution possible", "System reliability reduced", "All of the above"],
    correctAnswer: 3,
    explanation: "Poor maintenance can void insurance, lead to legal action, and significantly reduce system reliability."
  },
  {
    id: 118,
    question: "Which test verifies that sounders can be heard throughout the building?",
    options: ["Sound level test", "Coverage test", "Evacuation test", "All of the above"],
    correctAnswer: 1,
    explanation: "Coverage tests verify that fire alarm sounders can be heard adequately throughout all areas of the building."
  },
  {
    id: 119,
    question: "How often should evacuation drills be conducted?",
    options: ["Weekly", "Monthly", "Quarterly", "Depends on building type"],
    correctAnswer: 3,
    explanation: "Evacuation drill frequency depends on building type and occupancy - offices typically quarterly, some premises more frequently."
  },
  {
    id: 120,
    question: "What should be checked during battery tests?",
    options: ["Voltage only", "Load capacity", "Physical condition", "All of the above"],
    correctAnswer: 3,
    explanation: "Battery tests should check voltage, load capacity, and physical condition including terminals and connections."
  },
  {
    id: 121,
    question: "Which cleaning method is appropriate for optical smoke detectors?",
    options: ["Compressed air", "Vacuum cleaning", "Manufacturer's recommended method", "Water cleaning"],
    correctAnswer: 2,
    explanation: "Only the manufacturer's recommended cleaning method should be used for optical smoke detectors to avoid damage."
  },
  {
    id: 122,
    question: "What documentation should accompany service visits?",
    options: ["Previous service reports", "System manuals", "Defect history", "All of the above"],
    correctAnswer: 3,
    explanation: "Service technicians should have access to all relevant documentation to perform effective maintenance."
  },
  {
    id: 123,
    question: "How should urgent repairs be prioritised?",
    options: ["By cost", "By ease of repair", "By safety impact", "By customer preference"],
    correctAnswer: 2,
    explanation: "Urgent repairs should be prioritised based on their impact on fire safety and system reliability."
  },
  {
    id: 124,
    question: "What constitutes a fire alarm system failure?",
    options: ["Single detector fault", "Control panel fault", "Power supply failure", "Any safety-critical fault"],
    correctAnswer: 3,
    explanation: "Any fault that compromises the safety function of the fire alarm system constitutes a system failure requiring urgent attention."
  },
  {
    id: 125,
    question: "Which environmental factor most affects detector performance over time?",
    options: ["Temperature", "Humidity", "Dust accumulation", "Light levels"],
    correctAnswer: 2,
    explanation: "Dust accumulation is the primary environmental factor affecting detector performance over time, requiring regular cleaning."
  },

  // Module 7 - Regulatory Compliance and BS 5839 (25 questions)
  {
    id: 126,
    question: "Which part of BS 5839 covers fire detection in domestic premises?",
    options: ["BS 5839-1", "BS 5839-6", "BS 5839-8", "BS 5839-9"],
    correctAnswer: 1,
    explanation: "BS 5839-6 specifically covers the design and installation of fire detection systems in domestic premises."
  },
  {
    id: 127,
    question: "Who is the 'responsible person' under the Regulatory Reform (Fire Safety) Order?",
    options: ["Building owner", "Fire risk assessor", "Person with control of premises", "Local authority"],
    correctAnswer: 2,
    explanation: "The responsible person is whoever has control of the premises, which may be the owner, employer, or managing agent."
  },
  {
    id: 128,
    question: "What is the maximum penalty for serious fire safety offences?",
    options: ["£5,000 fine", "£20,000 fine", "Unlimited fine and imprisonment", "Community service"],
    correctAnswer: 2,
    explanation: "Serious fire safety offences can result in unlimited fines and up to 2 years imprisonment."
  },
  {
    id: 129,
    question: "How often must fire risk assessments be reviewed?",
    options: ["Annually", "Every 3 years", "Every 5 years", "When circumstances change"],
    correctAnswer: 3,
    explanation: "Fire risk assessments must be reviewed whenever circumstances change that might affect fire safety."
  },
  {
    id: 130,
    question: "Which document provides the legal framework for fire safety in England and Wales?",
    options: ["Building Regulations", "BS 5839", "Fire Safety Order 2005", "Building Act"],
    correctAnswer: 2,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 provides the primary legal framework for fire safety."
  },
  {
    id: 131,
    question: "What does 'third-party certification' mean for fire alarm companies?",
    options: ["Insurance certification", "Independent assessment of competence", "Government approval", "Manufacturer endorsement"],
    correctAnswer: 1,
    explanation: "Third-party certification involves independent assessment of a company's competence by accredited certification bodies."
  },
  {
    id: 132,
    question: "Which British Standard covers fire risk assessment methodology?",
    options: ["BS 5839", "BS 7974", "PAS 79", "BS 9999"],
    correctAnswer: 2,
    explanation: "PAS 79 provides the standard methodology for fire risk assessment in buildings."
  },
  {
    id: 133,
    question: "What is required when a fire alarm system is significantly modified?",
    options: ["New installation certificate", "Building control approval", "Fire service notification", "All of the above"],
    correctAnswer: 0,
    explanation: "Significant modifications require a new installation certificate to document the changed system configuration."
  },
  {
    id: 134,
    question: "Which enforcement authority is responsible for fire safety in most workplaces?",
    options: ["Local authority", "Fire and rescue service", "Health and Safety Executive", "Building control"],
    correctAnswer: 1,
    explanation: "Fire and rescue services are the primary enforcement authority for fire safety in most workplaces."
  },
  {
    id: 135,
    question: "What documentation must be available for fire service inspection?",
    options: ["Installation certificates", "Test records", "Risk assessments", "All of the above"],
    correctAnswer: 3,
    explanation: "All fire safety documentation including certificates, test records, and risk assessments must be available for inspection."
  },
  {
    id: 136,
    question: "Which organisation provides competence schemes for fire alarm installers?",
    options: ["BAFE", "NICEIC", "Both BAFE and NICEIC", "Local authorities"],
    correctAnswer: 2,
    explanation: "Both BAFE and NICEIC provide recognised competence schemes for fire alarm installers."
  },
  {
    id: 137,
    question: "What is the purpose of building warrant requirements in Scotland?",
    options: ["Planning permission", "Construction approval", "Fire safety compliance", "Insurance validation"],
    correctAnswer: 1,
    explanation: "Building warrants in Scotland ensure construction work complies with building standards including fire safety."
  },
  {
    id: 138,
    question: "How long should installation certificates be retained?",
    options: ["5 years", "10 years", "Life of the system", "No requirement"],
    correctAnswer: 2,
    explanation: "Installation certificates should be retained for the life of the system as permanent documentation."
  },
  {
    id: 139,
    question: "What constitutes 'general fire precautions' under fire safety legislation?",
    options: ["Detection systems only", "Escape routes only", "Comprehensive fire safety measures", "Staff training only"],
    correctAnswer: 2,
    explanation: "General fire precautions include all measures for fire prevention, detection, warning, escape, and firefighting."
  },
  {
    id: 140,
    question: "Which premises are exempt from the Fire Safety Order?",
    options: ["Domestic premises", "Small offices", "Schools", "None - all covered"],
    correctAnswer: 0,
    explanation: "Single private dwellings are generally exempt from the Fire Safety Order, though common areas in flats are covered."
  },
  {
    id: 141,
    question: "What insurance implications arise from non-compliant fire alarm systems?",
    options: ["Higher premiums only", "Policy voidance possible", "No implications", "Claim reduction only"],
    correctAnswer: 1,
    explanation: "Non-compliant fire alarm systems may void insurance policies completely, not just affect premiums or claims."
  },
  {
    id: 142,
    question: "Which standard covers integration of fire systems with building management systems?",
    options: ["BS 5839-1", "BS 5839-8", "BS 7273", "BS 9999"],
    correctAnswer: 2,
    explanation: "BS 7273 covers the integration of fire detection systems with other building systems."
  },
  {
    id: 143,
    question: "What professional development is required for fire alarm engineers?",
    options: ["None required", "Annual training only", "Continuing Professional Development", "One-time certification"],
    correctAnswer: 2,
    explanation: "Fire alarm engineers should undertake Continuing Professional Development (CPD) to maintain competence."
  },
  {
    id: 144,
    question: "How should conflicts between different standards be resolved?",
    options: ["Use oldest standard", "Use newest standard", "Engineering judgment", "Seek specialist advice"],
    correctAnswer: 3,
    explanation: "Conflicts between standards should be resolved by seeking specialist advice from competent professionals."
  },
  {
    id: 145,
    question: "What is the role of Approved Document B in fire alarm design?",
    options: ["Mandatory requirements", "Deemed-to-satisfy guidance", "Optional recommendations", "Historical reference"],
    correctAnswer: 1,
    explanation: "Approved Document B provides deemed-to-satisfy guidance for meeting Building Regulations fire safety requirements."
  },
  {
    id: 146,
    question: "Which European standard influences UK fire alarm requirements?",
    options: ["EN 54 series", "EN 12845", "EN 15004", "EN 3"],
    correctAnswer: 0,
    explanation: "The EN 54 series of standards for fire detection and alarm systems significantly influences UK requirements."
  },
  {
    id: 147,
    question: "What constitutes 'material change of use' requiring building control approval?",
    options: ["Change in occupancy type", "Increased fire risk", "Both occupancy and risk changes", "Any building modification"],
    correctAnswer: 2,
    explanation: "Material change of use involves changes in occupancy type or significantly increased fire risk requiring approval."
  },
  {
    id: 148,
    question: "How should fire alarm systems interface with suppression systems?",
    options: ["No interface required", "Simple relay connection", "Engineered integration", "Separate systems only"],
    correctAnswer: 2,
    explanation: "Fire alarm and suppression systems require carefully engineered integration to ensure proper coordination."
  },
  {
    id: 149,
    question: "What liability exists for fire alarm system designers?",
    options: ["No personal liability", "Professional indemnity only", "Criminal and civil liability", "Insurance covers all liability"],
    correctAnswer: 2,
    explanation: "Fire alarm designers can face both criminal prosecution and civil liability for inadequate designs."
  },
  {
    id: 150,
    question: "Which principle should guide fire alarm system specification?",
    options: ["Minimum cost", "Maximum features", "Fitness for purpose", "Latest technology"],
    correctAnswer: 2,
    explanation: "Fire alarm systems should be specified based on fitness for purpose, considering risk assessment and building use."
  }
];

export const getRandomFireAlarmMockExamQuestions = (count: number): QuizQuestion[] => {
  const shuffled = [...fireAlarmMockExamQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};