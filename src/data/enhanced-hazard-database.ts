import { EnhancedRiskConsequence } from "./hazards";

// 🚀 COMPREHENSIVE ENHANCED RISK DATABASE - ELECTRICAL SAFETY EXCELLENCE
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
    environment: ["indoor", "outdoor", "confined-space"]
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
    environment: ["bathroom", "kitchen", "outdoor"]
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
    environment: ["outdoor", "construction-site"]
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
    environment: ["all-environments"]
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