import { EnhancedRiskConsequence } from "./hazards";

// 🚀 COMPREHENSIVE ENHANCED RISK DATABASE - ELECTRICAL SAFETY EXCELLENCE
// Export main database with enhanced fields
export const enhancedRiskDatabase: EnhancedRiskConsequence[] = [
  // ⚡ Critical Electrical Hazards
  {
    id: "elec-shock-001",
    hazard: "Electric shock from live conductors",
    consequence: "Fatal electric shock, cardiac arrest, severe burns, permanent disability",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      elimination: ["Design out live work through pre-planning", "Use alternative methods (dead working)"],
      engineering: ["Isolation and lock-off procedures (BS7671 Regulation 514.11)", "Proving unit dead with approved voltage detector (GS38)", "Safe working distances from live parts (minimum 600mm)"],
      administrative: ["Two-person working rule for high-risk activities", "Emergency resuscitation equipment readily available"],
      ppe: ["Use of appropriate PPE including insulated gloves to BS EN 60903"]
    },
    bs7671References: ["514.11 - Isolation and switching", "Part 4 - Protection for safety", "411 - Protective measure: automatic disconnection"],
    category: "electrical",
    workType: ["installation", "maintenance", "testing", "fault-finding"],
    environment: ["indoor", "outdoor", "confined-space"],
    guidanceNotes: [
      "Always assume conductors are live until proven dead with a properly calibrated voltage detector",
      "Isolation devices must be locked off and tagged - only the person who locked off should remove",
      "Safe working distance of 600mm must be maintained from live conductors unless wearing appropriate insulated gloves",
      "Never work alone on high-voltage or hazardous electrical systems"
    ],
    emergencyProcedures: [
      "If someone receives an electric shock, DO NOT touch them if still in contact with live conductor",
      "Isolate power source immediately using nearest isolation point or emergency stop",
      "Call 999 and request ambulance - state 'electrical injury'",
      "Begin CPR if trained and casualty not breathing - do not delay",
      "Use AED (defibrillator) if available - electrical injury victims respond well to defibrillation",
      "Monitor casualty until paramedics arrive - even if they seem recovered, internal damage may be present"
    ],
    inspectionChecks: [
      "Verify isolation device is locked and tagged before starting work",
      "Test voltage detector on known live source before and after use (proving unit)",
      "Check condition of insulated tools - no cracks, damage, or missing insulation",
      "Inspect PPE for damage, check date labels haven't expired",
      "Ensure adequate lighting to see conductor colours and connections clearly"
    ],
    trainingRequired: [
      "BS7671:2018+A2:2022 18th Edition Wiring Regulations",
      "Safe Isolation Procedures (GS38)",
      "Emergency First Aid at Work with CPR/AED",
      "Electrical Safety Awareness Training"
    ],
    realWorldScenarios: [
      "Electrician working alone on consumer unit replacement touches live busbar - collapses. No one present to isolate or help. Fatal. LESSON: Never work alone on live equipment.",
      "Tester assumes circuit is dead after switching MCB. Doesn't use voltage tester. Gets 230V shock through screwdriver. LESSON: Always prove dead, never assume.",
      "Contractor cuts cable during renovation without checking plans. Strikes 230V buried cable. Severe burns to hands. LESSON: Always use cable detection equipment before cutting/drilling."
    ],
    relatedHazards: ["elec-shock-002", "arc-fault-001", "live-testing-001"],
    costOfFailure: "Fatal injury: £1.5-3M+ fine, imprisonment, business closure. Serious injury: £500k+, HSE investigation, reputation damage, loss of contracts.",
    hseGuidanceRef: ["HSG85 - Electricity at work: Safe working practices", "GS38 - Electrical test equipment for use on low voltage electrical systems"],
    lastUpdated: "2025-01-15"
  },
  {
    id: "elec-shock-002", 
    hazard: "Electric shock from faulty earth bonding",
    consequence: "Electric shock through metalwork, equipment damage, fire risk",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Main protective bonding to BS7671 Section 544", "Installation of RCD protection (411.3.3)"],
      administrative: ["Earth continuity testing with appropriate instruments", "Visual inspection of bonding conductors", "Supplementary bonding in special locations (701.415.2)"]
    },
    bs7671References: ["544 - Protective bonding conductors", "701.415.2 - Supplementary bonding", "411.3.3 - RCD protection"],
    category: "electrical",
    workType: ["installation", "testing", "inspection"],
    environment: ["bathroom", "kitchen", "outdoor"],
    guidanceNotes: [
      "Main bonding must be sized according to earth conductor size (minimum 6mm² copper)",
      "Supplementary bonding connects all exposed and extraneous conductive parts in special locations",
      "RCD protection is mandatory for all socket outlets rated 20A or less in domestic installations",
      "Bonding conductors must be continuous - no joints except at junction points"
    ],
    emergencyProcedures: [
      "If metalwork becomes live, do not touch - isolate at main switch immediately",
      "Evacuate area and prevent others from touching affected metalwork",
      "Call qualified electrician - do not attempt to repair without proper equipment",
      "Test all exposed metalwork with voltage tester before allowing re-entry"
    ],
    inspectionChecks: [
      "Visual check bonding clamps are tight and labelled correctly",
      "Earth continuity test between main earth terminal and bonded metalwork (should be <0.05Ω)",
      "RCD test using dedicated RCD tester - should trip within 40ms at 30mA",
      "Check bonding conductors haven't been painted over or damaged"
    ],
    trainingRequired: [
      "Electrical Installation Testing & Inspection (2391)",
      "BS7671:2018+A2:2022 18th Edition",
      "Special Locations (Bathrooms/Kitchens)"
    ],
    realWorldScenarios: [
      "Homeowner touches metal bath tap while using hairdryer. Gets 230V shock because main bonding disconnected during bathroom refurb. LESSON: Check bonding before any alteration work.",
      "Kitchen extension built without supplementary bonding. Customer gets shock from sink while unplugging kettle. LESSON: Special locations require extra protection measures.",
      "Plumber removes bonding clamp to fit new pipe. Doesn't reconnect. Next person to touch exposed pipework gets shocked. LESSON: Never remove bonding without immediately replacing."
    ],
    relatedHazards: ["elec-shock-001", "consumer-unit-001"],
    costOfFailure: "Serious injury risk: £100k+ fine. Death: £1M+ fine, manslaughter charges. Insurance invalidation on properties without proper earthing.",
    hseGuidanceRef: ["HSG85 - Electricity at work: Safe working practices"],
    lastUpdated: "2025-01-15"
  },
  {
    id: "cable-strike-001",
    hazard: "Underground cable strike during excavation",
    consequence: "Fatal electric shock, explosion, widespread power outage, prosecution",
    likelihood: 4,
    severity: 5,
    riskRating: 20,
    controlMeasures: {
      elimination: ["Use alternative cable routes above ground where possible"],
      engineering: ["Cable location using CAT and Genny equipment", "Ground penetrating radar for complex sites"],
      administrative: ["Coordination with DNO for cable plans", "Permit to dig system implementation", "Hand digging within 1m of suspected cables"],
      ppe: ["Use of insulated tools and equipment"]
    },
    bs7671References: ["Part 5 - Selection and erection", "522.8.10 - Underground cables"],
    category: "excavation",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "construction-site"],
    guidanceNotes: [
      "Over 60% of cable strikes occur because detection equipment wasn't used or was used incorrectly",
      "Underground cables can be anywhere - don't assume they follow logical routes",
      "Hand digging ('soft dig') is mandatory within 1m of known/suspected underground services",
      "Mark cable positions on ground with spray paint before any mechanical excavation starts",
      "Armoured cables can still be lethal even if outer sheath appears intact"
    ],
    emergencyProcedures: [
      "STOP ALL WORK IMMEDIATELY if cable struck - do not pull back equipment",
      "Evacuate all personnel to 10m safety distance minimum",
      "Call 999 and report electrical incident - stay on line for guidance",
      "Contact DNO emergency hotline immediately (105 for all UK networks)",
      "Do not allow anyone to approach equipment or excavation - establish exclusion zone",
      "Wait for DNO engineer to arrive before resuming any work - they must make safe"
    ],
    inspectionChecks: [
      "Check CAT & Genny equipment is calibrated and functioning before use each day",
      "Verify you have current utility plans from all providers (electric, gas, water, telecoms)",
      "Mark all detected services with paint and stakes before digging commences",
      "Conduct toolbox talk with all digger operators about cable strike risks",
      "Ensure emergency contact numbers are displayed on site and in mobile phones"
    ],
    trainingRequired: [
      "Cable Avoidance Tools (CAT & Genny) Training Certificate",
      "Safe Digging Practices",
      "Permit to Work Systems",
      "Emergency Response Procedures"
    ],
    realWorldScenarios: [
      "Digger operator strikes 11kV cable during sewer work. Massive explosion, equipment destroyed, operator hospitalised with burns. Cost: £2M+, 18-month HSE investigation. LESSON: Always use detection equipment.",
      "Contractor uses CAT scanner but doesn't understand how it works. Strikes cable 30cm from marked position. LESSON: Training on equipment is essential, not just owning it.",
      "Weekend DIY project - homeowner digs post holes, strikes incoming mains cable. Lucky to survive. £50k fine for unauthorized works. LESSON: Always get plans and detection done professionally."
    ],
    relatedHazards: ["elec-shock-001", "gas-leak-001", "explosion-001"],
    costOfFailure: "Fatality: £3M+ fine, imprisonment up to 2 years. Cable damage alone: £50k-500k repair + compensation. DNO claims can reach £10M for major outages.",
    hseGuidanceRef: ["HSG47 - Avoiding danger from underground services", "HSE Guidance on Cable Strikes"],
    lastUpdated: "2025-01-15"
  },
  {
    id: "arc-fault-001",
    hazard: "Arc fault in aging electrical installation",
    consequence: "Fire, property damage, injury from molten metal, toxic fumes",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Installation of Arc Fault Detection Devices (AFDDs) - 421.1.7", "Fire suppression systems in electrical rooms"],
      administrative: ["Regular thermal imaging inspections", "Torque checking of connections annually", "Replacement of aging switchgear and cables", "Emergency isolation procedures"]
    },
    bs7671References: ["421.1.7 - Arc fault detection devices", "Part 7 - Special installations"],
    category: "electrical",
    workType: ["maintenance", "inspection", "upgrade"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "consumer-unit-001",
    hazard: "Consumer unit upgrade in old property with unknown wiring",
    consequence: "Electric shock, fire risk, non-compliance, insurance issues",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["RCD protection for all circuits (411.3.3)", "SPD installation where required (443.4)"],
      administrative: ["Full electrical installation condition report (EICR)", "Circuit identification and testing", "Proper earthing and bonding verification", "Building Control notification"]
    },
    bs7671References: ["411.3.3 - RCD protection", "443.4 - Surge protective devices", "Part 6 - Inspection and testing"],
    category: "electrical",
    workType: ["upgrade", "installation"],
    environment: ["domestic"]
  },
  
  // 🚀 NEW ENHANCED ELECTRICAL HAZARDS FOR COMPREHENSIVE SAFETY
  {
    id: "ev-charging-001",
    hazard: "EV charging point installation hazards",
    consequence: "High current electric shock, DC arc fault, fire from overloaded supply",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Type A RCD protection (30mA)", "DC isolation devices", "Surge protection devices", "Load monitoring systems"],
      administrative: ["DNO notification for loads >7kW", "Electrical capacity calculations", "Installation certification", "User training on safe operation"],
      ppe: ["Arc flash PPE for high-power installations", "Insulated tools", "Voltage detectors"]
    },
    bs7671References: ["722 - Electric vehicle charging installations", "411.3.3 - RCD protection"],
    category: "electrical",
    workType: ["installation", "commissioning"],
    environment: ["domestic", "commercial", "outdoor"]
  },
  {
    id: "smart-home-001",
    hazard: "Smart home system integration risks",
    consequence: "Cyber security vulnerabilities, electrical interference, system failures",
    likelihood: 3,
    severity: 2,
    riskRating: 6,
    controlMeasures: {
      engineering: ["Network security protocols", "Isolated smart circuits", "Proper earthing for data systems"],
      administrative: ["Cybersecurity training", "Regular software updates", "Network monitoring", "Data protection compliance"],
      ppe: ["Anti-static equipment", "Network testing tools"]
    },
    bs7671References: ["Part 4 - Protection for safety", "Section 444 - Protection against electromagnetic disturbances"],
    category: "electrical",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["domestic", "commercial"]
  },
  {
    id: "solar-battery-001", 
    hazard: "Solar PV and battery storage system risks",
    consequence: "DC electric shock, fire from thermal runaway, toxic gas release",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      elimination: ["Use inherently safe battery chemistries where possible"],
      engineering: ["Battery management systems", "Fire suppression in battery areas", "DC isolation at multiple points", "Ventilation for battery rooms"],
      administrative: ["Manufacturer training", "Emergency response procedures", "Regular thermal monitoring", "G99 grid connection compliance"],
      ppe: ["Arc flash protection", "Breathing apparatus for battery areas", "Thermal monitoring equipment"]
    },
    bs7671References: ["712 - Solar photovoltaic power supply systems", "Section 534 - Devices for protection against overvoltage"],
    category: "renewable-energy",
    workType: ["installation", "maintenance", "commissioning"],
    environment: ["domestic", "commercial", "outdoor"]
  },
  {
    id: "data-centre-001",
    hazard: "Data centre electrical maintenance",
    consequence: "Critical system failure, electric shock from high-density power, business interruption",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Redundant power systems", "UPS systems", "Environmental monitoring", "Hot-swappable components"],
      administrative: ["Change control procedures", "24/7 monitoring", "Maintenance windows", "Business continuity planning"],
      ppe: ["ESD protection", "High-voltage rated PPE", "Environmental suits"]
    },
    bs7671References: ["Section 560 - Safety services", "Part 4 - Protection for safety"],
    category: "electrical",
    workType: ["maintenance", "upgrade", "emergency-repair"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "street-lighting-001",
    hazard: "Street lighting and highway electrical work",
    consequence: "Vehicle strike, electrocution from damaged cables, public safety risks",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Traffic management systems", "Crash barriers", "Underground cable protection", "LED conversion for safety"],
      administrative: ["Highway authority coordination", "Public notifications", "Night working procedures", "Emergency contact systems"],
      ppe: ["High-visibility clothing", "Traffic management equipment", "Fall protection for column work"]
    },
    bs7671References: ["714 - Outdoor lighting installations", "Part 7 - Special installations"],
    category: "public-infrastructure",
    workType: ["installation", "maintenance", "emergency-repair"],
    environment: ["outdoor", "public-highway"]
  },
  {
    id: "temporary-supply-001",
    hazard: "Temporary electrical supplies and site power",
    consequence: "Electrocution from damaged temporary cables, fire from overloading",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      engineering: ["RCD protection on all temporary circuits", "Armoured cables", "Weather-resistant equipment", "Load monitoring"],
      administrative: ["Daily visual inspections", "Competent person supervision", "Weather monitoring", "Load management"],
      ppe: ["Waterproof PPE", "Non-slip footwear", "Portable RCD testers"]
    },
    bs7671References: ["704 - Construction and demolition site installations", "Section 411 - Protective measures"],
    category: "temporary-installation", 
    workType: ["installation", "maintenance"],
    environment: ["construction-site", "outdoor", "temporary"]
  },
  {
    id: "heritage-building-001",
    hazard: "Electrical work in heritage/listed buildings",
    consequence: "Structural damage, fire risk to irreplaceable heritage, regulatory prosecution",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Minimal intervention techniques", "Compatible materials", "Fire-resistant cable systems", "Discrete installation methods"],
      administrative: ["Conservation officer approval", "Heritage impact assessments", "Specialist contractor requirements", "Planning permissions"],
      ppe: ["Clean tools to avoid marking", "Dust protection", "Minimal impact equipment"]
    },
    bs7671References: ["Part 5 - Selection and erection", "522 - Selection and erection of wiring systems"],
    category: "specialist-installation",
    workType: ["installation", "maintenance", "upgrade"],
    environment: ["heritage", "domestic", "commercial"]
  },
  {
    id: "agricultural-001",
    hazard: "Agricultural electrical installations", 
    consequence: "Livestock electric shock, fire in agricultural buildings, equipment damage from harsh environments",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["RCBO protection for each circuit", "IP65 rated equipment", "Corrosion-resistant materials", "Livestock-safe cable routes"],
      administrative: ["Veterinary liaison", "Farmer training", "Regular inspection schedules", "Emergency isolation procedures"],
      ppe: ["Waterproof equipment", "Respiratory protection", "Slip-resistant footwear"]
    },
    bs7671References: ["705 - Agricultural and horticultural premises", "Section 537 - Isolation and switching"],
    category: "agricultural",
    workType: ["installation", "maintenance"],
    environment: ["rural", "outdoor", "harsh-environment"]
  },
  {
    id: "marine-electrical-001",
    hazard: "Marine and waterside electrical installations",
    consequence: "Electrocution in water, galvanic corrosion, environmental damage",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Isolation transformers", "Galvanic isolation", "Marine-grade equipment", "30mA RCD protection"],
      administrative: ["Marine electrical certification", "Environmental permits", "Tide monitoring", "Emergency marine procedures"],
      ppe: ["Marine safety equipment", "Buoyancy aids", "Waterproof communications"]
    },
    bs7671References: ["709 - Marinas and similar locations", "Section 411 - Protective measures"],
    category: "marine",
    workType: ["installation", "maintenance"],
    environment: ["marine", "waterside", "outdoor"]
  },
  
  // ⚡ Modern Electrical Systems
  {
    id: "heat-pump-001",
    hazard: "Heat pump installation electrical hazards",
    consequence: "Electric shock from refrigerant contactors, incorrect wiring causing efficiency loss, fire risk",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["Type B RCD protection", "Dedicated circuit with correct cable sizing", "Outdoor-rated isolator"],
      administrative: ["MCS certification requirements", "Building regulations compliance", "Refrigerant handling certification", "Commissioning procedures"],
      ppe: ["Refrigerant handling PPE", "Insulated tools", "Safety glasses"]
    },
    bs7671References: ["Section 411 - Protective measures", "433 - Protection against overload current"],
    category: "heating-systems",
    workType: ["installation", "commissioning"],
    environment: ["domestic", "commercial", "outdoor"]
  },
  {
    id: "three-phase-001",
    hazard: "Three-phase motor control installation",
    consequence: "Phase rotation issues causing equipment damage, electric shock from contactors, fire from overload",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Motor protection relays", "Emergency stop circuits", "Phase sequence monitoring", "Thermal overload protection"],
      administrative: ["Competent person testing", "Motor load calculations", "Installation certificates", "Operational testing procedures"],
      ppe: ["Arc flash rated PPE", "Insulated gloves", "Face shield for live testing"]
    },
    bs7671References: ["552 - Rotating machines", "Part 4 - Protection for safety"],
    category: "industrial",
    workType: ["installation", "maintenance", "commissioning"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "bms-001",
    hazard: "Building Management System (BMS) integration",
    consequence: "Data loss, system conflicts, electric shock from control panels, fire from incorrect wiring",
    likelihood: 2,
    severity: 3,
    riskRating: 6,
    controlMeasures: {
      engineering: ["Segregation of power and control circuits", "Surge protection on data lines", "EMC compliance"],
      administrative: ["Integration testing procedures", "System documentation", "Commissioning protocols", "User training"],
      ppe: ["Anti-static equipment", "Insulated tools"]
    },
    bs7671References: ["444 - Protection against electromagnetic disturbances", "528 - Proximity to other services"],
    category: "building-automation",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "fire-alarm-001",
    hazard: "Fire alarm system installation and testing",
    consequence: "False alarms causing evacuation, system failure in emergency, electric shock from panels",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Battery backup systems", "Zone isolation", "Addressable system design", "Cause and effect programming"],
      administrative: ["BS 5839 compliance", "Commissioning certificates", "Log book maintenance", "Regular testing schedules", "Building occupant notification"],
      ppe: ["Hearing protection for alarm testing", "Insulated tools"]
    },
    bs7671References: ["560 - Safety services", "Section 313 - Supplies for safety services"],
    category: "life-safety",
    workType: ["installation", "testing", "maintenance"],
    environment: ["commercial", "public-building", "residential"]
  },
  {
    id: "access-control-001",
    hazard: "Access control and security system installation",
    consequence: "Security vulnerabilities, electric shock from power supplies, data breaches",
    likelihood: 2,
    severity: 3,
    riskRating: 6,
    controlMeasures: {
      engineering: ["Power supply backup", "Fail-safe/fail-secure configuration", "Cable segregation", "Network security"],
      administrative: ["Data protection compliance", "System access controls", "Emergency override procedures", "User training"],
      ppe: ["Anti-static equipment", "Network testing tools"]
    },
    bs7671References: ["Section 444 - Electromagnetic disturbances", "313 - Supplies for safety services"],
    category: "security-systems",
    workType: ["installation", "commissioning"],
    environment: ["commercial", "industrial", "public-building"]
  },
  {
    id: "cctv-001",
    hazard: "CCTV and surveillance system installation",
    consequence: "Electric shock from outdoor equipment, lightning damage, data privacy breaches",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["Surge protection devices", "PoE isolation", "Weatherproof enclosures", "Proper earthing systems"],
      administrative: ["GDPR compliance", "Data retention policies", "Privacy impact assessments", "Installation notifications"],
      ppe: ["Work at height equipment", "Insulated tools", "Weather protection"]
    },
    bs7671References: ["443 - Protection against overvoltage", "522 - Selection and erection of wiring systems"],
    category: "security-systems",
    workType: ["installation", "maintenance"],
    environment: ["commercial", "outdoor", "public-building"]
  },
  {
    id: "power-factor-001",
    hazard: "Power factor correction equipment installation",
    consequence: "Capacitor bank explosion, harmonic issues, electric shock from high voltages",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Discharge resistors", "Automatic control systems", "Harmonic filtering", "Proper ventilation"],
      administrative: ["Load analysis", "DNO notification", "Specialist testing", "Maintenance schedules"],
      ppe: ["Arc flash protection", "Insulated tools rated for capacitive circuits"]
    },
    bs7671References: ["Part 4 - Protection for safety", "331 - Assessment of general characteristics"],
    category: "industrial",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "generator-001",
    hazard: "Standby generator installation and maintenance",
    consequence: "Backfeed to utility grid, carbon monoxide poisoning, fire from fuel leaks, electric shock",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Grid-tied solar systems instead where viable"],
      engineering: ["Automatic transfer switch (ATS)", "Generator interlocking", "Exhaust systems", "Fuel containment"],
      administrative: ["G59/3 compliance for grid connection", "Building Control notification", "Commissioning tests", "Load bank testing", "Regular maintenance"],
      ppe: ["Hearing protection", "Fuel handling PPE", "Insulated tools"]
    },
    bs7671References: ["551 - Low voltage generating sets", "560 - Safety services"],
    category: "backup-power",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["commercial", "industrial", "healthcare"]
  },
  {
    id: "emergency-lighting-001",
    hazard: "Emergency lighting system installation",
    consequence: "System failure during emergency evacuation, electric shock, non-compliance",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Battery backup systems", "Self-test functionality", "Maintained/non-maintained configuration", "Central battery systems"],
      administrative: ["BS 5266 compliance", "Monthly testing procedures", "Annual duration tests", "Log book records", "Escape route surveys"],
      ppe: ["Work at height equipment", "Insulated tools"]
    },
    bs7671References: ["560 - Safety services", "313 - Supplies for safety services"],
    category: "life-safety",
    workType: ["installation", "testing", "maintenance"],
    environment: ["commercial", "public-building", "industrial"]
  },
  
  // 🔋 Emerging Technologies
  {
    id: "hydrogen-fuel-cell-001",
    hazard: "Hydrogen fuel cell electrical systems",
    consequence: "Hydrogen explosion, asphyxiation, DC arc flash, toxic gas exposure",
    likelihood: 1,
    severity: 5,
    riskRating: 5,
    controlMeasures: {
      elimination: ["Use battery storage where hydrogen not essential"],
      engineering: ["Hydrogen detection systems", "Explosion-proof equipment", "Forced ventilation", "Emergency shutdown systems"],
      administrative: ["Specialist training", "Permit to work systems", "Emergency response plans", "Gas safety certificates"],
      ppe: ["Breathing apparatus", "Explosion-proof tools", "Gas detection equipment"]
    },
    bs7671References: ["Part 7 - Special installations", "422 - Protection against fire"],
    category: "emerging-technology",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["industrial", "research"]
  },
  {
    id: "dc-fast-charging-001",
    hazard: "DC fast charging infrastructure for EVs",
    consequence: "High-voltage DC shock (up to 1000V), arc flash, thermal incidents",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["DC isolation devices", "Ground fault monitoring", "Liquid cooling systems", "Arc fault detection"],
      administrative: ["High-voltage competency certification", "DNO high-load applications", "G99 compliance", "Emergency isolation procedures"],
      ppe: ["High-voltage rated PPE (tested to 1000V DC)", "Arc flash suit", "Insulated tools"]
    },
    bs7671References: ["722 - Electric vehicle charging", "Part 4 - Protection for safety"],
    category: "ev-infrastructure",
    workType: ["installation", "commissioning"],
    environment: ["commercial", "public-highway", "industrial"]
  },
  {
    id: "microgrid-001",
    hazard: "Microgrid and grid-tied renewable systems",
    consequence: "Grid instability, islanding hazards, reverse power flow, synchronization failures",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Anti-islanding protection", "Grid synchronization equipment", "Energy management systems", "Frequency and voltage monitoring"],
      administrative: ["G98/G99 applications", "DNO approvals", "Commissioning procedures", "Export limitation agreements"],
      ppe: ["High-voltage PPE", "Arc flash protection"]
    },
    bs7671References: ["712 - Solar PV systems", "551 - Low voltage generating sets"],
    category: "renewable-energy",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "iot-network-001",
    hazard: "IoT device network installation",
    consequence: "Cyber security vulnerabilities, network disruption, fire from cheap devices",
    likelihood: 4,
    severity: 2,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Network segmentation", "Firewall protection", "Quality certified devices only", "Surge protection"],
      administrative: ["Cybersecurity policies", "Regular firmware updates", "Device inventory management", "Risk assessments"],
      ppe: ["Anti-static equipment"]
    },
    bs7671References: ["444 - Protection against electromagnetic disturbances", "421 - Protection against fire"],
    category: "building-automation",
    workType: ["installation", "commissioning"],
    environment: ["domestic", "commercial"]
  },
  
  // 🏥 Specialist Environments
  {
    id: "hospital-electrical-001",
    hazard: "Hospital electrical systems and medical equipment",
    consequence: "Patient electrocution, life-support system failure, cardiac arrest from micro-shock",
    likelihood: 1,
    severity: 5,
    riskRating: 5,
    controlMeasures: {
      engineering: ["Medical IT systems (isolated supply)", "Insulation monitoring devices", "Equipotential bonding", "Redundant power supplies"],
      administrative: ["HTM 06-01 compliance", "Medical electrical safety training", "Regular testing schedules", "Permit to work in clinical areas"],
      ppe: ["Anti-static equipment", "Insulated tools", "Hospital-grade cleaning"]
    },
    bs7671References: ["710 - Medical locations", "Section 411 - Protective measures"],
    category: "healthcare",
    workType: ["installation", "maintenance", "testing"],
    environment: ["hospital", "medical-facility"]
  },
  {
    id: "swimming-pool-001",
    hazard: "Swimming pool and spa electrical installations",
    consequence: "Fatal electric shock in water, electrolytic corrosion, pump failure",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["30mA RCD protection", "SELV for underwater lighting (max 12V AC)", "Zone protection (0, 1, 2)", "Equipotential bonding of all metalwork"],
      administrative: ["BS 7671 Section 702 compliance", "Annual electrical testing", "Water conductivity testing", "Lifeguard notification"],
      ppe: ["Insulated tools", "Non-slip footwear", "Lockout/tagout equipment"]
    },
    bs7671References: ["702 - Swimming pools and other basins", "411.3.3 - RCD protection", "414 - SELV/PELV"],
    category: "leisure",
    workType: ["installation", "maintenance", "testing"],
    environment: ["leisure-facility", "commercial", "domestic"]
  },
  {
    id: "commercial-kitchen-001",
    hazard: "Commercial kitchen catering equipment",
    consequence: "Electric shock in wet environment, fire from equipment overload, RCD nuisance tripping",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Type A or Type B RCD protection", "Dedicated circuits for heavy equipment", "IP-rated equipment", "Stainless steel trunking"],
      administrative: ["Load calculations", "Regular PAT testing", "Staff training on isolation", "Emergency shutdown procedures"],
      ppe: ["Insulated tools", "Non-slip footwear", "Heat-resistant gloves"]
    },
    bs7671References: ["Section 411 - Protective measures", "543 - Protective conductors"],
    category: "catering",
    workType: ["installation", "maintenance"],
    environment: ["commercial-kitchen", "hospitality"]
  },
  {
    id: "theatre-lighting-001",
    hazard: "Theatre and entertainment lighting systems",
    consequence: "Falls from rigging work, electric shock from dimming systems, fire from overheating",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Lighting control systems", "Thermal cutouts", "Emergency lighting separate circuits", "DMX isolation"],
      administrative: ["LOLER inspections", "Working at height permits", "Performance testing", "Emergency procedures", "Competent rigger certification"],
      ppe: ["Work at height equipment", "Insulated tools", "Eye protection for arc lights"]
    },
    bs7671References: ["711 - Exhibitions, shows and stands", "Part 5 - Selection and erection"],
    category: "entertainment",
    workType: ["installation", "maintenance", "rigging"],
    environment: ["theatre", "entertainment-venue"]
  },
  {
    id: "explosive-atmosphere-001",
    hazard: "Electrical work in explosive atmospheres (ATEX)",
    consequence: "Explosion, fire, multiple fatalities, widespread damage",
    likelihood: 1,
    severity: 5,
    riskRating: 5,
    controlMeasures: {
      elimination: ["Eliminate ignition sources", "Use pneumatic alternatives where possible"],
      engineering: ["ATEX certified equipment only", "Intrinsically safe circuits", "Explosion-proof enclosures", "Zone classification"],
      administrative: ["ATEX training and certification", "Hot work permits", "Gas monitoring", "Emergency procedures", "Competent person supervision"],
      ppe: ["Anti-static clothing", "Explosion-proof tools", "Gas detection equipment"]
    },
    bs7671References: ["Part 4 - Protection for safety", "422 - Protection against fire"],
    category: "hazardous-area",
    workType: ["installation", "maintenance"],
    environment: ["industrial", "petrochemical", "explosive-atmosphere"]
  },
  {
    id: "cold-storage-001",
    hazard: "Cold storage and refrigeration electrical systems",
    consequence: "Hypothermia, equipment failure causing stock loss, electric shock in freezing conditions",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["Low-temperature rated cable", "Condensation-resistant equipment", "Emergency lighting", "Alarm systems for door lockout"],
      administrative: ["Time limits for cold exposure", "Buddy system", "Regular defrosting schedules", "Emergency procedures"],
      ppe: ["Thermal clothing", "Anti-freeze gloves (insulated)", "Emergency beacon"]
    },
    bs7671References: ["522 - Selection of wiring systems", "Section 512 - External influences"],
    category: "refrigeration",
    workType: ["installation", "maintenance"],
    environment: ["industrial", "cold-storage"]
  },
  {
    id: "telecoms-001",
    hazard: "Telecommunications infrastructure electrical work",
    consequence: "Electric shock from power cables, RF exposure, falls from telecom towers",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Power/telecom segregation", "Lightning protection systems", "RF shielding", "Fall arrest systems"],
      administrative: ["Tower climbing certification", "Working at height permits", "RF exposure monitoring", "Rescue procedures"],
      ppe: ["Work at height equipment", "RF exposure monitors", "Insulated tools"]
    },
    bs7671References: ["528 - Proximity to other services", "443 - Protection against overvoltage"],
    category: "telecommunications",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "rooftop", "tower"]
  },
  {
    id: "wind-turbine-001",
    hazard: "Wind turbine electrical systems maintenance",
    consequence: "High-voltage shock, arc flash, falls from height, confined space hazards",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Multiple isolation points", "Arc flash detection", "Fall arrest systems", "Emergency descent equipment"],
      administrative: ["GWO certification", "Rescue plans", "Weather monitoring", "Lockout/tagout procedures", "Confined space permits"],
      ppe: ["High-voltage PPE", "Arc flash suit", "Fall arrest harness", "Emergency descent device"]
    },
    bs7671References: ["Part 7 - Special installations", "551 - Low voltage generating sets"],
    category: "renewable-energy",
    workType: ["maintenance", "commissioning"],
    environment: ["outdoor", "offshore", "height"]
  },
  
  // 🔧 Common Maintenance Hazards
  {
    id: "live-testing-001",
    hazard: "Testing live electrical equipment",
    consequence: "Electric shock, arc flash, burns, cardiac arrest",
    likelihood: 4,
    severity: 5,
    riskRating: 20,
    controlMeasures: {
      elimination: ["Test dead wherever possible", "Use simulation/modeling instead"],
      engineering: ["GS38 compliant test equipment", "Insulated probes", "Voltage limiting devices"],
      administrative: ["Live working risk assessment", "Permit to work system", "Two-person rule", "Emergency resuscitation equipment"],
      ppe: ["Insulated gloves BS EN 60903", "Arc flash face shield", "Flame-resistant clothing"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "514.11 - Isolation"],
    category: "testing",
    workType: ["testing", "fault-finding", "commissioning"],
    environment: ["all-environments"],
    guidanceNotes: [
      "Live testing should only be done when absolutely necessary for fault diagnosis or functional testing",
      "All test equipment must comply with GS38 - fused leads, insulated probes with maximum 4mm exposed tip",
      "Barriers should be erected around the test area to prevent accidental contact by others",
      "Person conducting live testing must be competent - minimum City & Guilds 2391 or equivalent",
      "Keep one hand in pocket when probing live circuits to prevent current path through heart"
    ],
    emergencyProcedures: [
      "If arc flash occurs, turn away immediately to protect face and eyes",
      "Sound alarm and evacuate immediate area",
      "Only attempt rescue after power is isolated - do not touch casualty while energized",
      "Cool burns with running water for at least 10 minutes",
      "Call 999 for any electrical burns - internal tissue damage may not be visible",
      "Preserve test equipment and scene for HSE investigation if serious injury occurs"
    ],
    inspectionChecks: [
      "Check test leads for damage, fraying, or exposed conductors before each use",
      "Verify voltage rating of test equipment exceeds expected voltage",
      "Test proving unit is functioning - test meter on known live source before dead circuit",
      "Ensure adequate lighting - can see colours and markings clearly",
      "Check emergency stop/isolation is accessible and clearly marked"
    ],
    trainingRequired: [
      "Electrical Testing & Inspection Qualification (City & Guilds 2391 or equivalent)",
      "Live Working Safety Awareness",
      "Arc Flash Hazard Training",
      "First Aid for Electrical Injuries"
    ],
    realWorldScenarios: [
      "Electrician testing live 3-phase panel uses standard screwdriver instead of insulated probe. Arc flash, second-degree burns to face and hands. Six months recovery. LESSON: Always use GS38 compliant equipment.",
      "Apprentice watches qualified electrician test live board. Stands too close, leans on metalwork. Gets shock through contact voltage. LESSON: Maintain safe distance, establish barriers.",
      "Emergency call-out at 2am. Tired electrician testing live circuit, hand slips, probe touches busbar. Massive arc flash, destroyed test meter, burns to hand. LESSON: Never test live when fatigued."
    ],
    relatedHazards: ["elec-shock-001", "arc-fault-001", "time-pressure-001"],
    costOfFailure: "Death or serious injury: £500k-2M fine. Loss of insurance cover for live work without proper training and procedures. Professional qualification revoked.",
    hseGuidanceRef: ["GS38 - Electrical test equipment for use on low voltage electrical systems", "HSG85 - Electricity at work: Safe working practices"],
    lastUpdated: "2025-01-15"
  },
  {
    id: "fault-finding-001",
    hazard: "Fault-finding in energized systems",
    consequence: "Electric shock during diagnosis, intermittent faults causing arc flash, misdiagnosis causing further damage",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      engineering: ["Thermal imaging cameras", "Clamp meters for current measurement", "Insulation resistance testers"],
      administrative: ["Systematic fault-finding procedures", "Documentation of findings", "Risk assessment for each step", "Communication with system users"],
      ppe: ["Insulated gloves", "Arc-rated clothing", "Safety glasses"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "514.11 - Isolation"],
    category: "maintenance",
    workType: ["fault-finding", "maintenance"],
    environment: ["all-environments"]
  },
  {
    id: "emergency-callout-001",
    hazard: "Emergency call-out electrical work",
    consequence: "Rushed work causing errors, electric shock from inadequate assessment, fatigue-related accidents",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      substitution: ["Temporary safe isolation rather than immediate repair where possible"],
      administrative: ["Emergency call-out procedures", "Adequate lighting and access", "Risk assessment even under time pressure", "Backup personnel", "Maximum working hours limits"],
      ppe: ["Full PPE kit in emergency van", "Headlamps", "High-vis clothing"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "514.11 - Isolation"],
    category: "emergency",
    workType: ["emergency-repair", "fault-finding"],
    environment: ["all-environments"]
  },
  {
    id: "time-pressure-001",
    hazard: "Working under time pressure or tight deadlines",
    consequence: "Cutting corners on safety, missed isolation steps, inadequate testing, non-compliance",
    likelihood: 5,
    severity: 3,
    riskRating: 15,
    controlMeasures: {
      elimination: ["Realistic project scheduling", "Buffer time for complications"],
      administrative: ["'Stop work' authority for safety concerns", "Regular breaks", "Adequate manning levels", "Client education on safety timescales"],
      ppe: ["Standard PPE maintained despite time pressure"]
    },
    bs7671References: ["All Parts - Compliance cannot be rushed"],
    category: "workplace-factors",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "occupied-premises-001",
    hazard: "Electrical work in customer-occupied premises",
    consequence: "Public electric shock, disruption to business, damage to customer property, fire risk",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Temporary barriers and signage", "Dust extraction", "Minimal disruption techniques"],
      administrative: ["Customer liaison and notifications", "Out-of-hours working where appropriate", "Clear communication of isolation periods", "Property protection measures"],
      ppe: ["Clean work practices", "Dust sheets", "Professional appearance"]
    },
    bs7671References: ["All sections apply - customer safety paramount"],
    category: "workplace-factors",
    workType: ["all-work-types"],
    environment: ["domestic", "commercial", "occupied-building"]
  },
  {
    id: "historic-wiring-001",
    hazard: "Working on historic or unknown wiring systems",
    consequence: "Unknown cable routes causing damage, asbestos exposure, absence of modern protection, fire from overloading",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      engineering: ["Cable detection equipment", "Asbestos survey before invasive work", "Additional RCD protection"],
      administrative: ["Thorough investigation and testing", "EICR before major work", "Photographic documentation", "Expectation management with clients"],
      ppe: ["RPE for dusty environments", "Protective overalls", "Gloves"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "All Parts for upgrade work"],
    category: "heritage",
    workType: ["maintenance", "upgrade", "fault-finding"],
    environment: ["domestic", "heritage", "old-building"]
  },
  {
    id: "substation-work-001",
    hazard: "Substation electrical work (11kV-33kV)",
    consequence: "Fatal high-voltage shock, arc flash explosion, widespread power outage",
    likelihood: 1,
    severity: 5,
    riskRating: 5,
    controlMeasures: {
      elimination: ["Remote operation where possible", "Robotics for high-risk tasks"],
      engineering: ["HV switching procedures", "Earth impedance testing", "Arc flash barriers", "Remote monitoring"],
      administrative: ["High voltage authorization", "Permit to work systems", "DNO coordination", "Switching schedules", "Competent person supervision"],
      ppe: ["High-voltage PPE (tested to 33kV)", "Arc flash suit (ATPV rated)", "HV gloves and tools"]
    },
    bs7671References: ["Not covered - See BS EN 50110 for HV work"],
    category: "high-voltage",
    workType: ["maintenance", "testing", "commissioning"],
    environment: ["substation", "industrial"]
  },

  // 📋 REGULATORY COMPLIANCE HAZARDS (10 new)
  {
    id: "cdm-notification-001",
    hazard: "CDM 2015 notification failures",
    consequence: "HSE prosecution (up to £20k fine), project delays, legal liability, insurance invalidation",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["F10 notification for projects >30 days or 500 person-days", "Principal Designer appointment", "Construction phase plan", "HSE notification procedures", "Client duty compliance", "Pre-construction information pack"],
      ppe: ["N/A - administrative control"]
    },
    bs7671References: ["CDM Regulations 2015", "HSG47 - Avoiding danger from underground services"],
    category: "regulatory-compliance",
    workType: ["project-management", "installation"],
    environment: ["all-environments"]
  },
  {
    id: "part-p-001",
    hazard: "Building Regulations Part P non-compliance",
    consequence: "Local authority prosecution, insurance void, property sale issues, client legal action",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Competent Person Scheme membership (NICEIC, NAPIT, etc.)", "Building Control notification for non-notifiable work", "Electrical Installation Certificate issuance", "Design compliance documentation", "Minor Works Certificates for additions"],
      ppe: ["N/A - regulatory process"]
    },
    bs7671References: ["Building Regulations Approved Document P", "BS 7671 - compliance mandatory"],
    category: "regulatory-compliance",
    workType: ["installation", "upgrade"],
    environment: ["domestic", "domestic-commercial"]
  },
  {
    id: "esqcr-001",
    hazard: "Electricity Safety, Quality and Continuity Regulations breaches",
    consequence: "DNO enforcement action, supply disconnection, criminal prosecution, network damage liability",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      administrative: ["DNO notification for installations >13.8kVA", "G98/G99 connection agreements", "Earthing and bonding compliance", "Supply characteristic verification", "Metering position compliance"],
      engineering: ["Proper earthing electrode installation (TT systems)", "Protective Multiple Earthing (PME) compliance", "Supply isolation coordination with DNO"]
    },
    bs7671References: ["ESQCR 2002 (as amended)", "Part 5 - Selection and erection", "542 - Earth electrodes"],
    category: "regulatory-compliance",
    workType: ["installation", "connection"],
    environment: ["all-environments"]
  },
  {
    id: "eicr-failure-001",
    hazard: "Inadequate Electrical Installation Condition Reports (EICR)",
    consequence: "Professional negligence claims, undetected hazards causing injury/fire, loss of registration",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["BS 7671 Schedule of Inspection compliance", "C1/C2/C3 coding accuracy", "Limitation clauses where access restricted", "Photographic evidence", "Report sign-off by qualified supervisor", "Five-year review cycle compliance"],
      engineering: ["Full testing sequence per Appendix 15", "Continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "Appendix 6 - Model forms for certification", "BS 7671:2018+A2:2022 Schedule of Inspection"],
    category: "regulatory-compliance",
    workType: ["inspection", "testing"],
    environment: ["all-environments"]
  },
  {
    id: "special-location-701-001",
    hazard: "BS 7671 Section 701 bathroom/shower room violations",
    consequence: "Fatal electric shock in wet environment, insurance rejection, prosecution, property condemnation",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      elimination: ["SELV lighting only in Zones 0 and 1"],
      engineering: ["Supplementary bonding of all metalwork in reach", "30mA RCD protection for all circuits", "IPX4 minimum equipment (IPX5 for Zone 1, IPX7 for Zone 0)", "3m exclusion zone for socket outlets"],
      administrative: ["Zone classification drawings", "Equipotential bonding testing", "Water conductivity considerations"]
    },
    bs7671References: ["701 - Locations containing a bath or shower", "411.3.3 - Additional protection by RCD", "701.415.2 - Supplementary bonding"],
    category: "special-installation",
    workType: ["installation", "inspection"],
    environment: ["domestic", "bathroom", "wet-room"]
  },
  {
    id: "special-location-704-001",
    hazard: "BS 7671 Section 704 construction site installation failures",
    consequence: "Electrocution from damaged cables, fire from overload, multiple casualties, HSE prohibition notice",
    likelihood: 4,
    severity: 5,
    riskRating: 20,
    controlMeasures: {
      engineering: ["Reduced low voltage system (110V CTE or 55V ph-earth)", "RCD protection (30mA max) for all socket outlets", "Armoured cable or robust mechanical protection", "Segregation from other services"],
      administrative: ["Daily visual inspection regime", "Competent person supervision", "Damage reporting system", "Adverse weather protocols"],
      ppe: ["High-vis clothing", "Safety footwear", "Hard hats"]
    },
    bs7671References: ["704 - Construction and demolition site installations", "411.3.3 - RCD requirements", "522.8 - External influences"],
    category: "special-installation",
    workType: ["temporary-installation"],
    environment: ["construction-site", "outdoor"]
  },
  {
    id: "special-location-708-001",
    hazard: "BS 7671 Section 708 caravan/camping park installations",
    consequence: "Electrocution of holidaymakers, fire in caravans, child safety incidents, liability claims",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["30mA RCD for each pitch", "PME earthing prohibited - TT system mandatory", "IP44 minimum equipment rating", "Pitch supply points ≥0.5m, ≤1.5m above ground"],
      administrative: ["Annual electrical inspection", "Caravan connection safety briefings", "Emergency isolation procedures", "Seasonal commissioning checks"],
      ppe: ["Weather-appropriate PPE", "Insulated tools"]
    },
    bs7671References: ["708 - Electrical installations in caravan/camping parks", "411.5 - TT system protection", "411.3.3 - RCD requirements"],
    category: "special-installation",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "leisure-facility", "camping"]
  },
  {
    id: "special-location-710-001",
    hazard: "BS 7671 Section 710 medical location installations",
    consequence: "Patient death from micro-shock, life-support failure, micro-shock to cardiac patients, regulatory closure",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Medical IT systems (isolated supplies) for Group 2 locations", "Insulation monitoring devices (IMD)", "Supplementary equipotential bonding ≤0.2Ω", "Battery backup for critical supplies", "Automatic changeover switches"],
      administrative: ["HTM 06-01 compliance (England/Wales)", "Medical electrical engineer supervision", "IEC 60601 medical equipment standards", "Commissioning by competent medical electrical specialist"],
      ppe: ["Anti-static footwear", "ESD wrist straps"]
    },
    bs7671References: ["710 - Medical locations", "560.6 - Safety services for medical locations", "710.413 - Additional protection in Group 1 and Group 2"],
    category: "special-installation",
    workType: ["installation", "maintenance", "testing"],
    environment: ["healthcare", "hospital", "medical-facility"]
  },
  {
    id: "special-location-712-001",
    hazard: "BS 7671 Section 712 solar PV DC isolation failures",
    consequence: "DC arc flash (difficult to extinguish), electrocution during maintenance, fire brigade shock risk",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["DC isolators at both string and inverter", "Overvoltage protection (SPD Type I & II)", "String voltage <600V DC", "Firefighter emergency shutdown switch", "Arc fault detection devices (AFDD)"],
      administrative: ["MCS certification requirements", "G98/G99 DNO applications", "Fire brigade liaison and labelling", "Commissioning tests per MCS standards"],
      ppe: ["DC-rated insulated gloves", "Arc flash face shield", "Voltage detector rated for DC"]
    },
    bs7671References: ["712 - Solar photovoltaic (PV) power supply systems", "534.4 - Overvoltage protection", "712.411.3.2.1.2 - DC isolation"],
    category: "special-installation",
    workType: ["installation", "maintenance"],
    environment: ["domestic", "commercial", "outdoor", "rooftop"]
  },
  {
    id: "fire-alarm-bs5839-001",
    hazard: "Fire alarm system BS 5839 non-compliance",
    consequence: "System failure in fire emergency, false alarm penalties, insurance void, regulatory prosecution",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      engineering: ["Category L1-L5 or M system design", "Automatic fire detection in risk areas", "Manual call points at exits", "Sounder coverage (≥65dB)", "Battery autonomy ≥24h standby + 30min alarm"],
      administrative: ["Weekly alarm tests", "Quarterly inspection by responsible person", "Annual servicing by competent technician", "Log book maintenance", "Cause and effect matrix"],
      ppe: ["Hearing protection during commissioning"]
    },
    bs7671References: ["560 - Safety services", "313 - Supplies for safety services", "BS 5839-1:2017 Fire alarm systems"],
    category: "regulatory-compliance",
    workType: ["installation", "maintenance", "testing"],
    environment: ["commercial", "residential", "public-building"]
  },
  {
    id: "emergency-lighting-bs5266-001",
    hazard: "Emergency lighting BS 5266 inadequacy",
    consequence: "Evacuation fatalities in fire/power loss, regulatory closure, prosecution under Fire Safety Order",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      engineering: ["1 lux horizontal illuminance on escape routes", "≥3 hour duration", "Central battery or self-contained luminaires", "Maintained or non-maintained configuration", "Escape route and exit signage"],
      administrative: ["Daily function indicator check", "Monthly function test (brief)", "Annual 3-hour duration test", "Third-yearly design compliance review", "Fire Risk Assessment alignment"],
      ppe: ["Standard electrical PPE"]
    },
    bs7671References: ["560 - Safety services", "313 - Supplies for safety services", "BS 5266-1:2016", "BS EN 1838:2013 Lighting applications"],
    category: "regulatory-compliance",
    workType: ["installation", "testing"],
    environment: ["commercial", "public-building", "residential"]
  },

  // 🔍 TESTING & INSPECTION HAZARDS (8 new)
  {
    id: "insulation-resistance-001",
    hazard: "Insulation resistance test procedure errors",
    consequence: "Damage to electronic equipment, false pass results, undetected insulation faults causing shock/fire",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Disconnect surge protection devices (SPDs)", "Remove lamps and sensitive equipment", "Short phase and neutral for combined test", "Test at 250V for SELV/PELV, 500V for LV", "Minimum acceptable values: 1MΩ (≥1MΩ required)"],
      engineering: ["Digital insulation tester calibrated annually", "Test lead inspection before use"]
    },
    bs7671References: ["Part 6 - Section 612", "643.3 - Insulation resistance testing", "Table 61 - Minimum values of insulation resistance"],
    category: "testing-inspection",
    workType: ["testing", "inspection", "commissioning"],
    environment: ["all-environments"]
  },
  {
    id: "earth-fault-loop-001",
    hazard: "Earth fault loop impedance (Zs) measurement errors",
    consequence: "Inadequate fault protection, extended disconnection times, electric shock risk, non-compliance",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Test at furthest point of each circuit", "Compare results with BS 7671 maximum Zs tables", "Apply 0.8 correction factor (Rule of Thumb)", "RCD bypass for non-RCD circuits", "Temperature correction (ambient ≠ 70°C conductor)"],
      engineering: ["Calibrated multifunction tester", "GS38 test leads", "RCD loop testers where appropriate"]
    },
    bs7671References: ["Part 6 - Section 612", "411.4 - Automatic disconnection of supply", "411.5.3 - Maximum Zs values", "Appendix 2 - Maximum earth fault loop impedance tables"],
    category: "testing-inspection",
    workType: ["testing", "commissioning"],
    environment: ["all-environments"]
  },
  {
    id: "rcd-test-001",
    hazard: "RCD test procedure failures",
    consequence: "RCD fails to operate in shock event, nuisance tripping undetected, false sense of security",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Test at rated residual operating current (IΔn): 30mA, 100mA, 300mA", "Test at 50% IΔn (should not trip), 100% IΔn (≤300ms), 150% IΔn (≤150ms), 5× IΔn (≤40ms)", "Test in both half-cycles (0° and 180°)", "Verify mechanical function test button", "Quarterly testing for socket-outlet RCDs"],
      engineering: ["RCD tester calibrated annually", "Test at furthest socket on circuit"]
    },
    bs7671References: ["Part 6 - Section 612", "643.7 - Testing of RCDs", "411.3.3 - Additional protection", "415.1 - Requirements for fault protection"],
    category: "testing-inspection",
    workType: ["testing", "commissioning", "periodic-inspection"],
    environment: ["all-environments"]
  },
  {
    id: "polarity-test-001",
    hazard: "Polarity testing omissions",
    consequence: "Live switched neutral causing exposed metalwork to remain live, shock from 'off' equipment, fire risk",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Verify all single-pole devices in phase conductor only", "Test at every outlet and accessory", "Check centre-contact of ES lampholders are phase", "Confirm socket outlet polarity (L-R, N-L, E-top)", "Document all polarity test results"],
      engineering: ["Continuity tester or multimeter", "Socket tester for verification"]
    },
    bs7671References: ["Part 6 - Section 612", "612.6 - Polarity testing", "510.3.2 - Single-pole switching in phase conductor"],
    category: "testing-inspection",
    workType: ["testing", "commissioning"],
    environment: ["all-environments"]
  },
  {
    id: "functional-testing-001",
    hazard: "Inadequate functional testing of switchgear and control equipment",
    consequence: "Interlocks fail, emergency stops inoperative, incorrect sequencing causing equipment damage/injury",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Test all control and protective devices", "Emergency stop circuits under load", "RCD mechanical test button verification", "Interlocks and safety circuits", "Correct operation of changeover switches", "Indicator lamps and audible warnings"],
      engineering: ["Simulate fault conditions where safe to do so", "Functional load testing"]
    },
    bs7671References: ["Part 6 - Section 643.10", "643.10 - Verification of measures of protection by automatic disconnection"],
    category: "testing-inspection",
    workType: ["commissioning", "testing"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "test-equipment-calibration-001",
    hazard: "Uncalibrated or faulty test equipment",
    consequence: "False readings causing dangerous situations, non-compliance undetected, professional negligence",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Annual calibration to ISO 17025 or equivalent", "Calibration certificates retained", "Pre-use proving unit checks", "Test equipment register with calibration due dates", "Equipment out of service if calibration expired"],
      engineering: ["Purchase test equipment from reputable manufacturers", "Proving unit device (voltage indicator verification)"]
    },
    bs7671References: ["Part 6 - Section 610.4", "GS38 - Electrical test equipment for use by electricians"],
    category: "testing-inspection",
    workType: ["testing", "inspection"],
    environment: ["all-environments"]
  },
  {
    id: "periodic-inspection-overdue-001",
    hazard: "Periodic inspection and testing schedules not maintained",
    consequence: "Deterioration undetected, insurance void, HSE improvement notices, fire risk escalation",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Domestic: 10 years or change of occupancy", "Commercial: 5 years", "Industrial: 3 years", "Educational: 5 years", "Rented domestic: 5 years (England) / 5 years (Scotland)", "Client reminder system", "EICR recommendation adherence"],
      engineering: ["Full testing per BS 7671 Schedule of Inspection"]
    },
    bs7671References: ["Part 6 - Inspection and testing", "IET Guidance Note 3", "Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020"],
    category: "testing-inspection",
    workType: ["inspection", "testing"],
    environment: ["all-environments"]
  },
  {
    id: "voltage-drop-measurement-001",
    hazard: "Voltage drop calculation and measurement errors",
    consequence: "Equipment malfunction, motor overheating, LED flicker, non-compliance, client complaints",
    likelihood: 4,
    severity: 2,
    riskRating: 8,
    controlMeasures: {
      administrative: ["Measure voltage drop under full load", "Lighting circuits: max 3% of supply voltage (6.9V on 230V)", "Other circuits: max 5% (11.5V)", "Apply mV/A/m values from BS 7671 Appendix 4", "Consider diversity and actual load"],
      engineering: ["True RMS voltmeter", "Clamp meter for load measurement", "Cable sizing calculations verified"]
    },
    bs7671References: ["525 - Voltage drop in consumers' installations", "Appendix 4 - Current-carrying capacity and voltage drop", "Table 4Ab - Voltage drop (mV/A/m)"],
    category: "testing-inspection",
    workType: ["testing", "design", "commissioning"],
    environment: ["all-environments"]
  },

  // 📐 DESIGN & CALCULATIONS HAZARDS (10 new)
  {
    id: "load-diversity-001",
    hazard: "Load diversity calculation errors",
    consequence: "Undersized supply causing overload, volt-drop issues, cable/switchgear damage, fire risk",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Apply BS 7671 Appendix H diversity factors", "Consider simultaneous loads realistically", "Socket outlets: 100% first 10A, 40% remainder", "Lighting: 66% if >10 points", "Heating/cooling: 100% (rarely diversified)", "Document assumptions"],
      engineering: ["Maximum demand assessment", "Load monitoring for verification", "Future expansion allowance"]
    },
    bs7671References: ["Appendix H - Current demand and diversity", "311 - Assessment of general characteristics"],
    category: "design-calculations",
    workType: ["design", "installation"],
    environment: ["all-environments"]
  },
  {
    id: "cable-sizing-001",
    hazard: "Cable current-carrying capacity miscalculations",
    consequence: "Cable overheating causing insulation failure, fire, tripping, electrical failure",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Determine design current (Ib)", "Select protective device In (Ib ≤ In ≤ Iz)", "Apply correction factors: grouping (Cg), ambient temperature (Ca), thermal insulation (Ci), BS 3036 fuses (0.725)", "Iz ≥ In / (Ca × Cg × Ci)", "Use BS 7671 Appendix 4 tables"],
      engineering: ["Thermal imaging to verify installed performance", "Load monitoring"]
    },
    bs7671References: ["523 - Current-carrying capacities", "Appendix 4 - Tables 4A-4L", "Table 52.3 - Correction factors"],
    category: "design-calculations",
    workType: ["design", "installation"],
    environment: ["all-environments"]
  },
  {
    id: "protection-coordination-001",
    hazard: "Protective device discrimination failures",
    consequence: "Incorrect device trips causing total power loss, safety systems failure, production downtime",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["Selectivity studies using manufacturer curves", "Time-current discrimination ratios", "RCD selective (S-type) for upstream devices", "Fuse-to-MCB discrimination", "Back-up protection verification"],
      engineering: ["Use of cascading tables", "Short-circuit withstand (Ipf) checks", "Energy let-through (I²t) calculations"]
    },
    bs7671References: ["536 - Coordination of protective devices", "533.2 - Selectivity between protective devices"],
    category: "design-calculations",
    workType: ["design", "commissioning"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "short-circuit-001",
    hazard: "Short-circuit current (Ipf) calculation errors",
    consequence: "Inadequate breaking capacity, device explosion, arc flash, fire, conductor damage",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      administrative: ["Calculate prospective fault current at origin (Ze)", "Apply impedance to calculate Ipf at all points", "Verify protective device breaking capacity >Ipf", "Earth fault current verification", "Use manufacturer fault level data"],
      engineering: ["Prospective fault current testing at origin", "Use of impedance values from DNO", "Adiabatic equation verification (t ≤ k²S² / I²)"]
    },
    bs7671References: ["434 - Protection against fault current", "Appendix 3 - Time/current zones", "411.4.4 - Fault protection by automatic disconnection"],
    category: "design-calculations",
    workType: ["design", "testing"],
    environment: ["all-environments"]
  },
  {
    id: "adiabatic-equation-001",
    hazard: "Adiabatic equation application errors",
    consequence: "Conductor damage during fault, cable insulation failure, fire risk, inadequate CPC size",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Apply formula: t = (k × S / I)²", "Where t = disconnection time (s), k = conductor constant (115 for copper, 74 for aluminium), S = conductor CSA (mm²), I = fault current (A)", "Verify CPC adequacy", "Check protective device operating time from curves"],
      engineering: ["Use manufacturer adiabatic tables", "Thermal withstand verification"]
    },
    bs7671References: ["543.1.3 - Adiabatic equation", "434.5.2 - Fault current protection", "Table 54.7 - Conductor k values"],
    category: "design-calculations",
    workType: ["design"],
    environment: ["all-environments"]
  },
  {
    id: "maximum-demand-001",
    hazard: "Maximum demand assessment failures",
    consequence: "Supply inadequacy, DNO reinforcement costs, installation redesign costs, project delays",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["Sum all connected loads", "Apply diversity per Appendix H", "Add allowance for future expansion (typically 20%)", "Consider power factor", "Verify with DNO supply characteristics"],
      engineering: ["Load profiling for complex installations", "Monitoring of existing installations", "Single-phase balance calculations"]
    },
    bs7671References: ["311.1 - Maximum demand", "Appendix H - Diversity factors"],
    category: "design-calculations",
    workType: ["design"],
    environment: ["all-environments"]
  },
  {
    id: "earthing-design-001",
    hazard: "Earthing system design inadequacies",
    consequence: "Ineffective fault protection, electric shock risk, fire, equipment damage, non-compliance",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      engineering: ["Verify earthing arrangement type (TN-S, TN-C-S, TT, IT)", "Main earthing terminal (MET) correctly sized", "Earth electrode resistance <200Ω (TT systems)", "Protective conductor continuity", "Bonding conductor sizing per BS 7671 Section 544"],
      administrative: ["Earth fault loop impedance verification", "Bonding of extraneous-conductive-parts", "Label all earthing and bonding conductors"]
    },
    bs7671References: ["Part 5 - Chapter 54 Earthing arrangements", "411.4 - TN systems", "411.5 - TT systems", "544 - Protective conductors"],
    category: "design-calculations",
    workType: ["design", "installation"],
    environment: ["all-environments"]
  },
  {
    id: "thermal-constraints-001",
    hazard: "Thermal constraint violations in fault conditions",
    consequence: "CPC failure during fault, sustained touch voltages, fire, conductor vaporization",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      administrative: ["CPC cross-sectional area ≥1.5mm² for short fault durations", "Verify thermal withstand using k²S² ≥ I²t", "Compare with protective device characteristics", "Document calculations"],
      engineering: ["Adequate CPC sizing from outset", "Protective device coordination"]
    },
    bs7671References: ["543.1 - Cross-sectional areas of protective conductors", "543.1.3 - Adiabatic equation for fault conditions"],
    category: "design-calculations",
    workType: ["design"],
    environment: ["all-environments"]
  },
  {
    id: "discrimination-study-001",
    hazard: "Lack of discrimination study between protective devices",
    consequence: "Nuisance tripping of upstream devices, loss of supply to critical loads, production loss",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Manufacturer selectivity tables", "Time-current curve analysis", "Use of selective (S-type or time-delayed) RCDs upstream", "Discrimination ratios: 2:1 for MCBs, 1.6:1 for fuses"],
      engineering: ["Coordination software (Amtech, Trimble, etc.)", "Testing of discrimination on commissioning"]
    },
    bs7671References: ["536 - Coordination of protective devices", "533.2.1.5 - Discrimination (selectivity)"],
    category: "design-calculations",
    workType: ["design", "commissioning"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "harmonic-distortion-001",
    hazard: "Harmonic distortion in electrical installations",
    consequence: "Neutral conductor overheating, nuisance RCD tripping, equipment malfunction, power quality issues",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["Oversized neutral for harmonic currents (up to 200%)", "Harmonic filters", "K-factor rated transformers", "Derating of cables in presence of harmonics", "Power quality monitoring"],
      administrative: ["Harmonic analysis during design", "Total Harmonic Distortion (THD) limits <5%", "LED driver compatibility checks"]
    },
    bs7671References: ["Appendix 4 - Harmonic currents", "523.6.3 - Neutral conductors", "433.2 - Overload protection"],
    category: "design-calculations",
    workType: ["design", "testing"],
    environment: ["commercial", "industrial", "data-centre"]
  },

  // 🌍 WORK ENVIRONMENT HAZARDS (8 new)
  {
    id: "lone-working-001",
    hazard: "Lone working without adequate supervision or emergency support",
    consequence: "Delayed rescue in electric shock event, unwitnessed accidents, fatality risk, mental health impact",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Lone working risk assessment", "Check-in procedures (2-hourly minimum)", "Man-down/panic alarm systems", "Mobile phone or radio contact", "Emergency contact procedures", "Prohibition of high-risk live work when lone", "Buddy system for hazardous tasks"],
      engineering: ["Lone worker alarm devices with GPS", "Automatic check-in apps"]
    },
    bs7671References: ["HSE - Working alone in safety"],
    category: "work-environment",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "night-work-001",
    hazard: "Night work and reduced visibility",
    consequence: "Increased accident risk, errors due to fatigue, security risks, reduced emergency response",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Adequate site lighting (minimum 200 lux for electrical work)", "Breaks and shift limits", "Buddy system", "Security arrangements", "Emergency contact procedures", "Limit to non-complex tasks where possible"],
      engineering: ["Head torches and task lighting", "Floodlights for work areas", "Emergency lighting"]
    },
    bs7671References: ["HSE - Night work guidance"],
    category: "work-environment",
    workType: ["maintenance", "emergency-repair"],
    environment: ["all-environments"]
  },
  {
    id: "weather-exposure-001",
    hazard: "Adverse weather exposure (heat, cold, rain, wind)",
    consequence: "Heat stroke, hypothermia, cold-related injuries, slips on wet surfaces, wind-blown hazards",
    likelihood: 5,
    severity: 3,
    riskRating: 15,
    controlMeasures: {
      administrative: ["Weather monitoring and work suspension triggers (>Force 6 wind, <-5°C, >30°C)", "Hydration breaks (hot weather)", "Warm-up breaks (cold weather)", "Weather protection (tents, shelters)", "Rescheduling for extreme conditions"],
      engineering: ["Weather-protective structures", "Heating/cooling facilities"],
      ppe: ["Weather-appropriate clothing", "High-vis waterproofs", "Sun protection (hat, sunscreen)", "Thermal layers for cold"]
    },
    bs7671References: ["HSE - Temperature and weather conditions at work"],
    category: "work-environment",
    workType: ["outdoor-work"],
    environment: ["outdoor", "construction-site"]
  },
  {
    id: "noise-exposure-001",
    hazard: "Noise-induced hearing loss (NIHL) from power tools and equipment",
    consequence: "Permanent hearing damage, tinnitus, reduced communication ability, accident risk",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Use quieter tools and methods where possible"],
      engineering: ["Acoustic enclosures", "Vibration damping", "Tool maintenance to reduce noise"],
      administrative: ["Noise assessments", "Hearing protection zones (>85dB)", "Rotation of workers", "Audiometry testing"],
      ppe: ["Hearing protection (earplugs or defenders) rated for noise level", "Class 4 or 5 for >100dB", "Proper fitting and maintenance"]
    },
    bs7671References: ["Control of Noise at Work Regulations 2005"],
    category: "work-environment",
    workType: ["all-work-types"],
    environment: ["industrial", "construction-site"]
  },
  {
    id: "vibration-exposure-001",
    hazard: "Hand-Arm Vibration Syndrome (HAVS) from power tools",
    consequence: "Permanent vascular and neurological damage to hands, loss of manual dexterity, cold sensitivity",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Use low-vibration tools", "Alternative methods (e.g., cable clips vs drilling)"],
      engineering: ["Anti-vibration tool handles", "Tool maintenance", "Sharp drill bits (less vibration)"],
      administrative: ["Vibration exposure monitoring", "Tool vibration ratings (m/s²)", "Exposure action value (EAV): 2.5m/s² over 8hrs", "Exposure limit value (ELV): 5m/s²", "Health surveillance", "Work rotation"],
      ppe: ["Anti-vibration gloves (limited effectiveness)", "Keeping hands warm"]
    },
    bs7671References: ["Control of Vibration at Work Regulations 2005"],
    category: "work-environment",
    workType: ["installation", "maintenance"],
    environment: ["all-environments"]
  },
  {
    id: "mental-health-stress-001",
    hazard: "Work-related stress and mental health issues",
    consequence: "Errors leading to accidents, long-term mental health conditions, absence, reduced concentration",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Realistic workload and deadlines", "Management support and supervision", "Mental health awareness training", "Employee assistance programs", "Open communication culture", "Stress risk assessments", "Work-life balance policies"],
      engineering: ["N/A"]
    },
    bs7671References: ["HSE - Work-related stress"],
    category: "work-environment",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "fatigue-001",
    hazard: "Fatigue from long hours, shift work, or travel",
    consequence: "Reduced concentration, errors, accidents, driving incidents, health deterioration",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Working Time Regulations compliance (48hr average week)", "Maximum shift length limits", "Adequate breaks (20min per 6hrs)", "Consecutive night shift limits", "Driving hour limits", "Fatigue risk assessments"],
      engineering: ["Accommodation near site for long projects"]
    },
    bs7671References: ["Working Time Regulations 1998", "HSE - Fatigue and shift work"],
    category: "work-environment",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "dehydration-heat-001",
    hazard: "Dehydration and heat stress on hot sites",
    consequence: "Heat exhaustion, heat stroke (potentially fatal), reduced concentration, accidents",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Hydration breaks (≥250ml water per hour in heat)", "Acclimatization period", "Work-rest cycles in extreme heat", "Monitoring of workers", "Cool-down facilities"],
      engineering: ["Shaded rest areas", "Cooling fans", "Cold water provision"],
      ppe: ["Light-colored clothing", "Wide-brim hats", "Sunscreen"]
    },
    bs7671References: ["HSE - Temperature at work"],
    category: "work-environment",
    workType: ["outdoor-work"],
    environment: ["outdoor", "hot-environment"]
  },

  // 📊 PROJECT MANAGEMENT HAZARDS (7 new)
  {
    id: "method-statement-gaps-001",
    hazard: "Inadequate method statements",
    consequence: "Uncontrolled hazards, worker injury, non-compliance, HSE enforcement, legal liability",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Method statement for all significant tasks", "Step-by-step procedure documented", "Hazard identification at each step", "Control measures specified", "Emergency procedures", "Review and approval by competent person", "Briefing to all workers"],
      engineering: ["N/A - procedural control"]
    },
    bs7671References: ["CDM 2015 - Construction phase plan", "HSE - Method statements"],
    category: "project-management",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "risk-assessment-gaps-001",
    hazard: "Risk assessment omissions or inadequacies",
    consequence: "Unidentified hazards causing injury, HSE enforcement, inadequate control measures, liability",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Generic risk assessments for routine tasks", "Site-specific risk assessments for unique hazards", "Regular review (annually or after incident)", "Worker involvement in risk assessment", "Documented and communicated to all affected workers", "RAMS integration"],
      engineering: ["N/A - procedural control"]
    },
    bs7671References: ["Management of Health and Safety at Work Regulations 1999", "Electricity at Work Regulations 1989"],
    category: "project-management",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "coordination-failures-001",
    hazard: "Poor coordination between trades on multi-discipline sites",
    consequence: "Interface hazards, service strikes, access issues, delays, accidents from concurrent work",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Principal contractor coordination meetings", "Integrated programme", "Service drawings coordination", "Permit to work systems", "Exclusion zones", "Trade sequencing plans", "Communication protocols"],
      engineering: ["BIM coordination (clash detection)", "Service coordination drawings"]
    },
    bs7671References: ["CDM 2015 - Cooperation and coordination"],
    category: "project-management",
    workType: ["installation"],
    environment: ["construction-site", "commercial"]
  },
  {
    id: "communication-failures-001",
    hazard: "Communication failures on site",
    consequence: "Misunderstood instructions, isolation errors, concurrent working hazards, injuries",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      administrative: ["Daily toolbox talks", "Clear communication protocols", "Language barriers addressed (translators if needed)", "Written permits and logs", "Radio/phone communication systems", "Emergency communication procedures"],
      engineering: ["Two-way radios", "Site communication boards"]
    },
    bs7671References: ["CDM 2015 - Information and training"],
    category: "project-management",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "toolbox-talks-001",
    hazard: "Lack of toolbox talks and site inductions",
    consequence: "Workers unaware of site hazards, control measures not understood, accidents, non-compliance",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Daily or task-specific toolbox talks", "Site induction for all new workers", "Hazard briefings", "Control measure explanations", "Emergency procedure review", "Question and answer session", "Attendance records"],
      engineering: ["N/A - procedural control"]
    },
    bs7671References: ["CDM 2015 - Information and training", "Health and Safety at Work Act 1974"],
    category: "project-management",
    workType: ["all-work-types"],
    environment: ["all-environments"]
  },
  {
    id: "site-induction-001",
    hazard: "Inadequate site inductions for new workers or visitors",
    consequence: "Unfamiliarity with site hazards, emergency procedures unknown, visitor injuries, liability",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Comprehensive site induction covering: site hazards, emergency procedures, welfare facilities, PPE requirements, permit systems, reporting procedures", "Induction record and sign-off", "Visitor escorts", "Refresher inductions for long-term workers"],
      engineering: ["Induction videos or presentations", "Site maps with hazards marked"]
    },
    bs7671References: ["CDM 2015 - Training and competence"],
    category: "project-management",
    workType: ["all-work-types"],
    environment: ["construction-site", "industrial"]
  },
  {
    id: "permit-to-work-001",
    hazard: "Permit to work system failures",
    consequence: "Concurrent working accidents, isolation errors, live working incidents, confined space fatalities",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: {
      administrative: ["Formal permit to work system for high-risk activities (confined spaces, live work, hot work, excavations)", "Permit content: task description, hazards, controls, isolation points, authorizing persons", "Permit displayed at work location", "Permit closure and handback", "Training in permit system"],
      engineering: ["Permit log and tracking system"]
    },
    bs7671References: ["Electricity at Work Regulations 1989 - Regulation 14", "HSE - Permit to work systems"],
    category: "project-management",
    workType: ["high-risk-work"],
    environment: ["industrial", "high-risk"]
  },

  // 🔧 SPECIALIZED EQUIPMENT HAZARDS (10 new)
  {
    id: "thermal-camera-001",
    hazard: "Thermal imaging camera misuse",
    consequence: "Missed hotspots causing fire, false sense of security, electrical hazards undetected",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["Training in thermal imaging interpretation", "Understanding emissivity variations", "Load cycling before imaging (equipment at operating temperature)", "Minimum 40% load for meaningful results", "Image documentation with visible light reference"],
      engineering: ["Quality thermal camera with ≥320×240 resolution", "Temperature range appropriate for electrical work (-20°C to +650°C)", "Calibration annually"]
    },
    bs7671References: ["BS 7671 - Inspection and testing guidance"],
    category: "specialized-equipment",
    workType: ["testing", "inspection", "maintenance"],
    environment: ["all-environments"]
  },
  {
    id: "multifunction-tester-001",
    hazard: "Multifunction tester calibration and operational failures",
    consequence: "False pass/fail results, undetected faults, electric shock risk from faulty installation",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Annual calibration to ISO 17025", "Calibration certificate retention", "Daily function checks using proving unit", "Test lead inspection (GS38 compliance)", "Understanding of test sequences"],
      engineering: ["Purchase quality test equipment (Megger, Fluke, Metrel)", "Proving unit for voltage indicator verification", "Test lead storage to prevent damage"]
    },
    bs7671References: ["GS38 - Electrical test equipment", "Part 6 - Inspection and testing"],
    category: "specialized-equipment",
    workType: ["testing", "inspection"],
    environment: ["all-environments"]
  },
  {
    id: "clamp-meter-001",
    hazard: "Clamp meter incorrect usage",
    consequence: "Inaccurate current readings, missed overload conditions, inadequate cable sizing, fire risk",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Zero the meter before measurement", "Ensure only one conductor in clamp jaws", "Clamp perpendicular to conductor", "Use AC or AC+DC mode as appropriate", "Understand true RMS vs averaging meters", "Multiple readings for consistency"],
      engineering: ["True RMS clamp meter for distorted waveforms", "Annual calibration", "Appropriate current range (typically 0-1000A)"]
    },
    bs7671References: ["BS 7671 - Testing and verification"],
    category: "specialized-equipment",
    workType: ["testing", "fault-finding"],
    environment: ["all-environments"]
  },
  {
    id: "phase-rotation-001",
    hazard: "Phase rotation meter errors causing motor damage",
    consequence: "Three-phase motor reverse rotation, equipment damage, production loss, safety system failure",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["Verify phase rotation (L1-L2-L3 clockwise) before energizing motors", "Document phase rotation at distribution boards", "Label phases consistently throughout installation", "Check after any supply changes"],
      engineering: ["Phase rotation indicator at main distribution", "Motor protection relays with phase monitoring"]
    },
    bs7671References: ["Part 6 - Verification", "552 - Rotating machines"],
    category: "specialized-equipment",
    workType: ["commissioning", "testing"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "pat-tester-001",
    hazard: "PAT testing equipment faults and procedure errors",
    consequence: "Dangerous appliances passed as safe, electric shock, fire, legal liability",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["PAT tester calibration annually", "IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment", "User checks, formal visual inspection, combined inspection and testing", "Class I: earth continuity, insulation resistance, earth leakage, load test", "Class II: insulation resistance, load test", "Pass/fail labelling"],
      engineering: ["Quality PAT tester (Megger, Seaward, Kewtech)", "Test adapter collection", "Barcode scanner for asset tracking"]
    },
    bs7671References: ["IET Code of Practice for PAT", "Electricity at Work Regulations 1989"],
    category: "specialized-equipment",
    workType: ["testing", "inspection"],
    environment: ["all-environments"]
  },
  {
    id: "earth-tester-001",
    hazard: "Earth electrode testing equipment and interpretation errors",
    consequence: "Inadequate earthing undetected, electric shock risk in TT systems, non-compliance",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: ["Disconnect earth electrode from installation before test", "Three or four-terminal test method", "Test spike spacing: 10m between electrode and first spike, 10m to second spike", "Resistance <200Ω for TT systems", "Seasonal variations (test in dry conditions)", "Document results"],
      engineering: ["Earth resistance tester (Megger DET series, Fluke 1623)", "Test spikes and leads", "Annual calibration"]
    },
    bs7671References: ["542.2 - Earth electrodes", "Part 6 - Testing of earthing arrangements"],
    category: "specialized-equipment",
    workType: ["testing", "commissioning"],
    environment: ["all-environments"]
  },
  {
    id: "insulation-tester-selection-001",
    hazard: "Insulation tester voltage selection errors",
    consequence: "Equipment damage from excessive test voltage, inadequate testing from low voltage, false results",
    likelihood: 4,
    severity: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: ["SELV/PELV: 250V DC test voltage", "LV circuits up to 500V: 500V DC test voltage", "LV circuits over 500V: 1000V DC test voltage", "Disconnect sensitive equipment (LED drivers, dimmers, IT equipment, surge protection devices)", "Short phase and neutral for combined test", "Minimum 1MΩ required"],
      engineering: ["Variable voltage insulation tester", "Test lead polarity awareness"]
    },
    bs7671References: ["643.3 - Insulation resistance testing", "Table 61 - Minimum insulation resistance values"],
    category: "specialized-equipment",
    workType: ["testing"],
    environment: ["all-environments"]
  },
  {
    id: "cable-locator-001",
    hazard: "Cable locator (CAT & Genny) false readings",
    consequence: "Undetected cables struck during excavation, electrocution, explosion, service disruption",
    likelihood: 4,
    severity: 5,
    riskRating: 20,
    controlMeasures: {
      administrative: ["Utility plans obtained before work", "Sweep area in multiple modes (power, radio, genny)", "Mark all detected services", "Hand digging within 0.5m of detected services", "Assume cables present if signal ambiguous", "Regular equipment calibration"],
      engineering: ["CAT4+ or Genny4 equipment", "Ground penetrating radar for complex sites", "Multiple detection methods"]
    },
    bs7671References: ["HSG47 - Avoiding danger from underground services"],
    category: "specialized-equipment",
    workType: ["excavation", "installation"],
    environment: ["outdoor", "construction-site"]
  },
  {
    id: "voltage-indicator-001",
    hazard: "Voltage indicator failures causing 'dead' indication on live circuits",
    consequence: "Electric shock, arc flash, fatality from working on live circuits believed dead",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      administrative: ["GS38 compliant voltage indicators only", "Prove-Test-Prove sequence (test on known live, test circuit, re-test on known live)", "Two-pole testing (phase-earth and phase-neutral)", "Visual inspection of test equipment before use", "Six-monthly calibration check"],
      engineering: ["LED or LCD voltage indicators with self-test function", "Fused and insulated test leads to GS38", "Proving unit for verification"]
    },
    bs7671References: ["GS38 - Electrical test equipment", "Electricity at Work Regulations 1989 - Regulation 12 (Dead working)"],
    category: "specialized-equipment",
    workType: ["isolation", "testing"],
    environment: ["all-environments"]
  },
  {
    id: "proving-unit-001",
    hazard: "Proving unit faults causing false verification",
    consequence: "Voltage indicator not verified, working on live circuits believed dead, fatality",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      administrative: ["Test proving unit with known live source periodically", "Battery replacement schedule", "Verification that proving unit produces expected voltage (typically 230V or 400V)", "Visual inspection before use"],
      engineering: ["Quality proving unit (Fluke, Megger, Martindale)", "Battery status indicator", "Self-test function"]
    },
    bs7671References: ["GS38 - Electrical test equipment"],
    category: "specialized-equipment",
    workType: ["isolation", "testing"],
    environment: ["all-environments"]
  }
];

// 🚀 ENHANCED WORKPLACE SCENARIOS - Comprehensive and Realistic
export const workplaceScenarios = [
  {
    id: "domestic-rewire",
    name: "Domestic Property Rewire", 
    description: "Full electrical installation in residential property including consumer unit upgrade",
    commonHazards: ["elec-shock-001", "consumer-unit-001", "manual-handling-001", "falls-height-001"],
    environment: "domestic",
    riskLevel: "medium",
    requiredCompetencies: ["Part P notification", "Building Control liaison", "Consumer unit installation"],
    typicalDuration: "3-7 days",
    specialConsiderations: ["Asbestos survey for pre-1980 properties", "Temporary supply arrangements", "Customer liaison"]
  },
  {
    id: "commercial-ev-charging",
    name: "Commercial EV Charging Installation",
    description: "High-power EV charging infrastructure for commercial premises",
    commonHazards: ["ev-charging-001", "elec-shock-001", "three-phase-001", "cable-strike-001"],
    environment: "commercial",
    riskLevel: "high",
    requiredCompetencies: ["EV charging certification", "DNO applications", "Load calculations"],
    typicalDuration: "2-5 days",
    specialConsiderations: ["Grid capacity assessments", "Future expansion planning", "User training requirements"]
  },
  {
    id: "heritage-building-upgrade",
    name: "Heritage Building Electrical Upgrade",
    description: "Sensitive electrical work in listed or heritage buildings",
    commonHazards: ["heritage-building-001", "elec-shock-001", "confined-space-001", "manual-handling-001"],
    environment: "heritage",
    riskLevel: "high",
    requiredCompetencies: ["Conservation training", "Heritage regulations", "Specialist techniques"],
    typicalDuration: "2-6 weeks",
    specialConsiderations: ["Planning permissions", "Conservation officer liaison", "Minimal intervention techniques"]
  },
  {
    id: "agricultural-installation",
    name: "Agricultural Electrical Installation",
    description: "Electrical systems for farming and agricultural environments",
    commonHazards: ["agricultural-001", "elec-shock-001", "manual-handling-001", "confined-space-001"],
    environment: "agricultural",
    riskLevel: "high",
    requiredCompetencies: ["Agricultural regulations", "Livestock safety", "Environmental protection"],
    typicalDuration: "1-3 weeks",
    specialConsiderations: ["Livestock safety", "Environmental permits", "Weather dependency"]
  },
  {
    id: "temporary-event-power",
    name: "Temporary Event Power Supply",
    description: "Temporary electrical installations for events and construction",
    commonHazards: ["temporary-supply-001", "elec-shock-001", "manual-handling-001", "overhead-contact-001"],
    environment: "temporary",
    riskLevel: "very-high",
    requiredCompetencies: ["Temporary installation expertise", "Event safety", "Emergency procedures"],
    typicalDuration: "1-3 days",
    specialConsiderations: ["Weather monitoring", "Public safety", "Rapid deployment/removal"]
  },
  {
    id: "marine-electrical",
    name: "Marine Electrical Installation",
    description: "Electrical systems for marinas, boats, and waterside facilities",
    commonHazards: ["marine-electrical-001", "elec-shock-001", "confined-space-001", "manual-handling-001"],
    environment: "marine",
    riskLevel: "very-high",
    requiredCompetencies: ["Marine electrical certification", "Galvanic corrosion prevention", "Marine safety"],
    typicalDuration: "3-10 days",
    specialConsiderations: ["Tidal access", "Corrosion protection", "Environmental regulations"]
  }
];

// Risk assessment helpers and utilities
export const riskAssessmentHelpers = {
  calculateRiskRating: (likelihood: number, severity: number): number => {
    return likelihood * severity;
  },
  
  getRiskLevel: (riskRating: number): string => {
    if (riskRating >= 15) return "Very High";
    if (riskRating >= 10) return "High"; 
    if (riskRating >= 6) return "Medium";
    if (riskRating >= 3) return "Low";
    return "Very Low";
  },
  
  getRiskColor: (riskRating: number): string => {
    if (riskRating >= 15) return "bg-red-600";
    if (riskRating >= 10) return "bg-orange-500";
    if (riskRating >= 6) return "bg-yellow-500";
    if (riskRating >= 3) return "bg-blue-500";
    return "bg-green-500";
  },
  
  suggestHazardsByScenario: (scenarioId: string): string[] => {
    const scenario = workplaceScenarios.find(s => s.id === scenarioId);
    return scenario?.commonHazards || [];
  },
  
  getHazardsByCategory: (category: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard => hazard.category === category);
  },
  
  getHazardsByEnvironment: (environment: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard => 
      hazard.environment.includes(environment as any)
    );
  },
  
  getHazardsByWorkType: (workType: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard =>
      hazard.workType.includes(workType as any)
    );
  },
  
  searchHazards: (searchTerm: string): EnhancedRiskConsequence[] => {
    const term = searchTerm.toLowerCase();
    return enhancedRiskDatabase.filter(hazard =>
      hazard.hazard.toLowerCase().includes(term) ||
      hazard.consequence.toLowerCase().includes(term) ||
      Object.values(hazard.controlMeasures).flat().some(control => control?.toLowerCase().includes(term))
    );
  }
};

// BS7671 18th Edition regulation lookup
export const bs7671RegulationLookup = {
  "514.11": {
    title: "Isolation and switching",
    description: "Every installation shall be provided with a main switch disconnecting all live conductors",
    section: "Part 5 - Selection and erection of electrical equipment"
  },
  "411.3.3": {
    title: "RCD protection",
    description: "Additional protection by 30mA RCD for socket outlets and mobile equipment",
    section: "Part 4 - Protection for safety"
  },
  "722": {
    title: "Electric vehicle charging installations",
    description: "Special requirements for EV charging equipment",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "712": {
    title: "Solar photovoltaic power supply systems",
    description: "Requirements for solar PV installations",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "705": {
    title: "Agricultural and horticultural premises",
    description: "Special requirements for farming environments",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "709": {
    title: "Marinas and similar locations",
    description: "Requirements for marine electrical installations",
    section: "Part 7 - Requirements for special installations or locations"
  }
};

// Export grouped hazard database for the UI
export const hazardDatabase = [
  {
    category: "Electrical",
    icon: "⚡",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "electrical")
  },
  {
    category: "Regulatory Compliance",
    icon: "📋",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "regulatory-compliance")
  },
  {
    category: "Special Installations",
    icon: "🏊",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "special-installation")
  },
  {
    category: "Testing & Inspection",
    icon: "🔍",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "testing-inspection")
  },
  {
    category: "Design & Calculations",
    icon: "📐",
    color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "design-calculations")
  },
  {
    category: "Work Environment",
    icon: "🌍",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "work-environment")
  },
  {
    category: "Project Management",
    icon: "📊",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "project-management")
  },
  {
    category: "Specialized Equipment",
    icon: "🔧",
    color: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "specialized-equipment")
  },
  {
    category: "Renewable Energy",
    icon: "☀️",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "renewable-energy")
  },
  {
    category: "Working at Height",
    icon: "🪜",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "height")
  },
  {
    category: "Industrial",
    icon: "🏭",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "industrial")
  },
  {
    category: "Marine",
    icon: "⚓",
    color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "marine")
  },
  {
    category: "Excavation",
    icon: "⛏️",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hazards: enhancedRiskDatabase.filter(h => h.category === "excavation")
  }
];