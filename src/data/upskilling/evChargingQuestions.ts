import { QuizQuestion } from '@/types/quiz';

export const evChargingQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the maximum DC voltage typically used in rapid charging systems?",
    options: ["400V", "800V", "1000V", "1200V"],
    correctAnswer: 2,
    explanation: "Most rapid charging systems operate at up to 1000V DC to enable faster charging times while maintaining safety standards.",
    moduleId: 1
  },
  {
    id: 2,
    question: "Which type of connector is standard for Type 2 AC charging in the UK?",
    options: ["CCS", "CHAdeMO", "Mennekes", "Tesla Supercharger"],
    correctAnswer: 2,
    explanation: "The Mennekes (Type 2) connector is the European standard for AC charging and is widely used in the UK.",
    moduleId: 1
  },
  {
    id: 3,
    question: "What is the minimum cable cross-sectional area required for a 32A EV charging point?",
    options: ["2.5mm²", "4mm²", "6mm²", "10mm²"],
    correctAnswer: 2,
    explanation: "For 32A charging, 6mm² cable is typically required to handle the current safely according to BS7671.",
    moduleId: 3
  },
  {
    id: 4,
    question: "Which protective device is specifically required for EV charging installations?",
    options: ["RCBO", "RCD Type A", "RCD Type B", "MCB only"],
    correctAnswer: 2,
    explanation: "RCD Type B is required for EV charging as it can detect DC residual currents that may occur during charging.",
    moduleId: 4
  },
  {
    id: 5,
    question: "What is the maximum charging current for a standard domestic Type 2 socket?",
    options: ["16A", "32A", "63A", "125A"],
    correctAnswer: 1,
    explanation: "Standard domestic Type 2 sockets are typically rated at 32A for single-phase charging.",
    moduleId: 2
  },
  {
    id: 6,
    question: "Which British Standard covers the installation of EV charging equipment?",
    options: ["BS 7671", "BS 1362", "BS 546", "BS 6004"],
    correctAnswer: 0,
    explanation: "BS 7671 (IET Wiring Regulations) covers the electrical installation requirements for EV charging equipment.",
    moduleId: 1
  },
  {
    id: 7,
    question: "What is the typical power rating of a rapid DC charger?",
    options: ["7kW", "22kW", "50kW+", "3.6kW"],
    correctAnswer: 2,
    explanation: "Rapid DC chargers typically start at 50kW and can go up to 350kW or more for ultra-rapid charging.",
    moduleId: 2
  },
  {
    id: 8,
    question: "Which communication protocol is commonly used in EV charging infrastructure?",
    options: ["Modbus", "OCPP", "BACnet", "KNX"],
    correctAnswer: 1,
    explanation: "OCPP (Open Charge Point Protocol) is the standard communication protocol for EV charging infrastructure.",
    moduleId: 5
  },
  {
    id: 9,
    question: "What type of earthing arrangement is required for outdoor EV charging points?",
    options: ["TT", "TN-S", "TN-C-S", "IT"],
    correctAnswer: 1,
    explanation: "TN-S earthing is preferred for EV charging installations to ensure proper protective conductor integrity.",
    moduleId: 4
  },
  {
    id: 10,
    question: "What is the minimum IP rating required for outdoor EV charging equipment?",
    options: ["IP44", "IP54", "IP65", "IP67"],
    correctAnswer: 1,
    explanation: "IP54 is the minimum rating for outdoor EV charging equipment to protect against dust and water ingress.",
    moduleId: 3
  },
  {
    id: 11,
    question: "Which type of cable is recommended for buried EV charging installations?",
    options: ["SWA", "FP200", "MICC", "PVC/PVC"],
    correctAnswer: 0,
    explanation: "SWA (Steel Wire Armoured) cable provides mechanical protection and is ideal for buried installations.",
    moduleId: 3
  },
  {
    id: 12,
    question: "What is the maximum loop impedance for a 32A Type B RCD protecting an EV charger?",
    options: ["1.44Ω", "1.15Ω", "0.87Ω", "0.35Ω"],
    correctAnswer: 0,
    explanation: "For 32A Type B RCD, maximum Zs is 1.44Ω to ensure disconnection within required time limits.",
    moduleId: 4
  },
  {
    id: 13,
    question: "Which factor affects EV charging efficiency most significantly?",
    options: ["Ambient temperature", "Cable length", "Battery state of charge", "Grid frequency"],
    correctAnswer: 2,
    explanation: "Battery state of charge significantly affects charging efficiency, with slower rates near full capacity.",
    moduleId: 1
  },
  {
    id: 14,
    question: "What is the purpose of pilot wire in EV charging systems?",
    options: ["Earth fault detection", "Communication and control", "Overcurrent protection", "Temperature monitoring"],
    correctAnswer: 1,
    explanation: "The pilot wire (CP - Control Pilot) provides communication between the vehicle and charger for safe charging control.",
    moduleId: 2
  },
  {
    id: 15,
    question: "Which voltage level is used for three-phase AC fast charging?",
    options: ["230V", "400V", "690V", "1000V"],
    correctAnswer: 1,
    explanation: "Three-phase AC fast charging typically uses 400V (3-phase) to deliver higher power levels.",
    moduleId: 3
  },
  {
    id: 16,
    question: "What is the recommended segregation distance between EV charging cables and data cables?",
    options: ["50mm", "100mm", "150mm", "300mm"],
    correctAnswer: 3,
    explanation: "300mm segregation is recommended to prevent electromagnetic interference between power and data cables.",
    moduleId: 3
  },
  {
    id: 17,
    question: "Which testing method is used to verify Type B RCD operation?",
    options: ["Push button test only", "Ramp test with DC component", "Loop impedance test", "Insulation resistance test"],
    correctAnswer: 1,
    explanation: "Type B RCDs require ramp testing with DC components to verify they can detect DC residual currents.",
    moduleId: 6
  },
  {
    id: 18,
    question: "What is the typical charging time for an 80% charge using a 7kW charger on a 60kWh battery?",
    options: ["4 hours", "6 hours", "8 hours", "12 hours"],
    correctAnswer: 2,
    explanation: "For 80% of 60kWh (48kWh) at 7kW efficiency considered, approximately 8 hours charging time.",
    moduleId: 1
  },
  {
    id: 19,
    question: "Which connector type is used for CCS (Combined Charging System)?",
    options: ["Type 1 + DC pins", "Type 2 + DC pins", "CHAdeMO", "Tesla proprietary"],
    correctAnswer: 1,
    explanation: "CCS uses Type 2 AC connector with additional DC pins for combined AC/DC charging capability.",
    moduleId: 2
  },
  {
    id: 20,
    question: "What is the minimum height for wall-mounted EV charging points?",
    options: ["0.8m", "1.2m", "1.5m", "1.8m"],
    correctAnswer: 1,
    explanation: "Wall-mounted EV charging points should be at least 1.2m high for accessibility and safety requirements.",
    moduleId: 3
  },
  {
    id: 21,
    question: "Which factor determines the maximum charging current for an EV?",
    options: ["Charger rating only", "Vehicle onboard charger", "Cable rating", "All of the above"],
    correctAnswer: 3,
    explanation: "Maximum charging current is limited by the lowest rating among charger, vehicle onboard charger, and cable.",
    moduleId: 1
  },
  {
    id: 22,
    question: "What is the purpose of the proximity detection in EV charging?",
    options: ["Measure distance to vehicle", "Detect cable connection", "Monitor temperature", "Check earth integrity"],
    correctAnswer: 1,
    explanation: "Proximity detection (PP signal) detects if the charging cable is properly connected to the vehicle.",
    moduleId: 2
  },
  {
    id: 23,
    question: "Which type of surge protection is recommended for EV charging installations?",
    options: ["Type 1 SPD", "Type 2 SPD", "Type 3 SPD", "No SPD required"],
    correctAnswer: 1,
    explanation: "Type 2 SPD is recommended for EV charging points to protect against switching surges and induced voltages.",
    moduleId: 4
  },
  {
    id: 24,
    question: "What is the maximum recommended cable length for a 7kW EV charger?",
    options: ["10m", "20m", "50m", "100m"],
    correctAnswer: 2,
    explanation: "50m is typically the maximum recommended cable length for 7kW chargers to minimize voltage drop.",
    moduleId: 3
  },
  {
    id: 25,
    question: "Which safety feature prevents EV charging when the vehicle is in drive mode?",
    options: ["Emergency stop", "Contactor control", "Pilot wire signaling", "RCD protection"],
    correctAnswer: 2,
    explanation: "Pilot wire signaling communicates vehicle status and prevents charging when not in park/neutral.",
    moduleId: 2
  },
  {
    id: 26,
    question: "What is the typical efficiency of AC to DC conversion in EV onboard chargers?",
    options: ["75-80%", "85-90%", "90-95%", "95-99%"],
    correctAnswer: 2,
    explanation: "Modern EV onboard chargers typically achieve 90-95% efficiency in AC to DC conversion.",
    moduleId: 1
  },
  {
    id: 27,
    question: "Which testing instrument is specifically designed for EV charging point testing?",
    options: ["Standard MFT", "EV-specific tester", "Oscilloscope", "Power analyzer"],
    correctAnswer: 1,
    explanation: "EV-specific testers can verify pilot wire signals, proximity detection, and RCD Type B operation.",
    moduleId: 6
  },
  {
    id: 28,
    question: "What is the recommended inspection frequency for commercial EV charging installations?",
    options: ["Monthly", "Quarterly", "Annually", "5 years"],
    correctAnswer: 2,
    explanation: "Annual inspection is typically recommended for commercial EV charging installations per BS 7671.",
    moduleId: 6
  },
  {
    id: 29,
    question: "Which factor affects the location planning for EV charging infrastructure?",
    options: ["Grid capacity", "Traffic patterns", "Future demand", "All of the above"],
    correctAnswer: 3,
    explanation: "All factors must be considered: grid capacity, traffic patterns, and future demand projections.",
    moduleId: 3
  },
  {
    id: 30,
    question: "What is the purpose of load balancing in EV charging systems?",
    options: ["Reduce installation costs", "Optimize power distribution", "Improve safety", "Increase charging speed"],
    correctAnswer: 1,
    explanation: "Load balancing optimizes power distribution across multiple charging points to maximize efficiency.",
    moduleId: 5
  },
  {
    id: 31,
    question: "Which standard defines the safety requirements for EV conductive charging?",
    options: ["IEC 61851", "IEC 60364", "IEC 61008", "IEC 60947"],
    correctAnswer: 0,
    explanation: "IEC 61851 defines the safety and performance requirements for EV conductive charging systems.",
    moduleId: 1
  },
  {
    id: 32,
    question: "What is the minimum cross-sectional area for protective conductor in EV installations?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correctAnswer: 1,
    explanation: "Protective conductor should be minimum 2.5mm² for fixed installations per BS 7671 requirements.",
    moduleId: 4
  },
  {
    id: 33,
    question: "Which type of isolation is required before working on EV charging equipment?",
    options: ["Single pole", "Double pole", "Secure isolation", "Emergency stop only"],
    correctAnswer: 2,
    explanation: "Secure isolation with proper locking and testing procedures is required before maintenance work.",
    moduleId: 6
  },
  {
    id: 34,
    question: "What is the typical power factor of an EV charging system?",
    options: ["0.7-0.8", "0.8-0.9", "0.9-0.95", "0.95-1.0"],
    correctAnswer: 3,
    explanation: "Modern EV charging systems typically achieve power factors of 0.95-1.0 due to power factor correction.",
    moduleId: 3
  },
  {
    id: 35,
    question: "Which feature allows multiple EVs to charge simultaneously without overloading the supply?",
    options: ["Time delay", "Load management", "Voltage regulation", "Frequency control"],
    correctAnswer: 1,
    explanation: "Load management systems dynamically allocate available power among multiple charging points.",
    moduleId: 5
  },
  {
    id: 36,
    question: "What is the maximum voltage drop allowed for EV charging circuits?",
    options: ["3%", "5%", "6%", "10%"],
    correctAnswer: 1,
    explanation: "Maximum 5% voltage drop is allowed for EV charging circuits to ensure efficient charging.",
    moduleId: 3
  },
  {
    id: 37,
    question: "Which component provides emergency disconnection in EV charging systems?",
    options: ["MCB", "RCD", "Emergency stop button", "Isolation switch"],
    correctAnswer: 2,
    explanation: "Emergency stop buttons provide immediate disconnection in case of emergency situations.",
    moduleId: 4
  },
  {
    id: 38,
    question: "What is the purpose of pre-charging in DC fast charging systems?",
    options: ["Test connectivity", "Gradual voltage buildup", "Temperature control", "Current limiting"],
    correctAnswer: 1,
    explanation: "Pre-charging gradually builds up voltage to prevent inrush current damage to vehicle systems.",
    moduleId: 2
  },
  {
    id: 39,
    question: "Which earthing electrode is preferred for EV charging installations?",
    options: ["Earth rod", "Earth tape", "Foundation earth", "Water pipe"],
    correctAnswer: 2,
    explanation: "Foundation earthing provides the most stable and reliable earth connection for EV charging.",
    moduleId: 4
  },
  {
    id: 40,
    question: "What is the typical THD (Total Harmonic Distortion) limit for EV chargers?",
    options: ["5%", "8%", "12%", "15%"],
    correctAnswer: 0,
    explanation: "Most standards require THD to be less than 5% to minimize power quality issues on the grid.",
    moduleId: 3
  },
  {
    id: 41,
    question: "Which protocol enables smart charging and grid integration?",
    options: ["Modbus", "OCPP", "ISO 15118", "CAN bus"],
    correctAnswer: 2,
    explanation: "ISO 15118 enables smart charging, grid integration, and bi-directional power flow communication.",
    moduleId: 5
  },
  {
    id: 42,
    question: "What is the minimum separation distance between EV charging points?",
    options: ["1m", "1.5m", "2m", "2.5m"],
    correctAnswer: 2,
    explanation: "Minimum 2m separation is recommended between charging points for safe vehicle maneuvering.",
    moduleId: 3
  },
  {
    id: 43,
    question: "Which factor affects battery charging acceptance rate?",
    options: ["Temperature", "State of charge", "Battery age", "All of the above"],
    correctAnswer: 3,
    explanation: "Battery charging acceptance is affected by temperature, state of charge, age, and chemistry type.",
    moduleId: 1
  },
  {
    id: 44,
    question: "What is the purpose of vehicle identification in charging systems?",
    options: ["Security", "Billing", "Load management", "All of the above"],
    correctAnswer: 3,
    explanation: "Vehicle identification supports security, billing accuracy, and optimized load management.",
    moduleId: 5
  },
  {
    id: 45,
    question: "Which material is preferred for EV charging cable cores?",
    options: ["Copper", "Aluminum", "Silver", "Copper-clad aluminum"],
    correctAnswer: 0,
    explanation: "Copper is preferred for EV charging cables due to superior conductivity and flexibility.",
    moduleId: 3
  },
  {
    id: 46,
    question: "What is the typical charging curve profile for lithium-ion batteries?",
    options: ["Linear", "Exponential", "CC-CV (Constant Current-Constant Voltage)", "Stepped"],
    correctAnswer: 2,
    explanation: "Lithium-ion batteries use CC-CV charging: constant current then constant voltage phases."
  },
  {
    id: 47,
    question: "Which protection is specifically required against DC earth faults in EV charging?",
    options: ["RCBO", "RCD Type A", "RCD Type B", "AFDD"],
    correctAnswer: 2,
    explanation: "RCD Type B is specifically designed to detect both AC and DC earth faults in EV systems."
  },
  {
    id: 48,
    question: "What is the maximum recommended ambient temperature for EV charging equipment operation?",
    options: ["40°C", "50°C", "60°C", "70°C"],
    correctAnswer: 1,
    explanation: "Most EV charging equipment is rated for operation up to 50°C ambient temperature."
  },
  {
    id: 49,
    question: "Which feature prevents unauthorized access to EV charging?",
    options: ["RFID authentication", "Mobile app control", "Key lock", "All of the above"],
    correctAnswer: 3,
    explanation: "Access control can use RFID, mobile apps, key locks, or combination methods for security."
  },
  {
    id: 50,
    question: "What is the purpose of dynamic load management in EV charging?",
    options: ["Reduce costs", "Prevent grid overload", "Optimize charging time", "All of the above"],
    correctAnswer: 3,
    explanation: "Dynamic load management reduces costs, prevents overload, and optimizes charging schedules."
  },
  {
    id: 51,
    question: "Which connector locking mechanism is used in Type 2 charging?",
    options: ["Manual twist lock", "Automatic electronic lock", "Magnetic lock", "Bayonet lock"],
    correctAnswer: 1,
    explanation: "Type 2 connectors use automatic electronic locking controlled by the charging system."
  },
  {
    id: 52,
    question: "What is the typical warranty period for commercial EV charging equipment?",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correctAnswer: 2,
    explanation: "Commercial EV charging equipment typically comes with 3-year manufacturer warranties."
  },
  {
    id: 53,
    question: "Which factor determines the grid connection requirements for EV charging?",
    options: ["Total power demand", "Number of charging points", "Simultaneity factor", "All of the above"],
    correctAnswer: 3,
    explanation: "Grid connection considers total power, number of points, and simultaneity of usage."
  },
  {
    id: 54,
    question: "What is the purpose of thermal monitoring in EV charging cables?",
    options: ["Prevent overheating", "Optimize charging rate", "Extend cable life", "All of the above"],
    correctAnswer: 3,
    explanation: "Thermal monitoring prevents overheating, enables optimization, and extends equipment life."
  },
  {
    id: 55,
    question: "Which standard covers electromagnetic compatibility for EV charging?",
    options: ["EN 55011", "EN 61000", "EN 50065", "EN 60335"],
    correctAnswer: 1,
    explanation: "EN 61000 series covers electromagnetic compatibility requirements for EV charging equipment."
  },
  {
    id: 56,
    question: "What is the recommended maintenance schedule for EV charging infrastructure?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctAnswer: 2,
    explanation: "Quarterly preventive maintenance is recommended for optimal EV charging infrastructure performance."
  },
  {
    id: 57,
    question: "Which communication method enables vehicle-to-grid (V2G) functionality?",
    options: ["Power line communication", "Wireless", "ISO 15118", "Ethernet"],
    correctAnswer: 2,
    explanation: "ISO 15118 communication standard enables bi-directional power flow for V2G applications."
  },
  {
    id: 58,
    question: "What is the typical installation depth for underground EV charging cables?",
    options: ["300mm", "450mm", "600mm", "900mm"],
    correctAnswer: 2,
    explanation: "Underground EV charging cables should typically be installed at 600mm depth for protection."
  },
  {
    id: 59,
    question: "Which factor affects the choice between AC and DC charging infrastructure?",
    options: ["Installation cost", "Charging speed requirement", "Available space", "All of the above"],
    correctAnswer: 3,
    explanation: "Infrastructure choice depends on cost, speed requirements, space, and application needs."
  },
  {
    id: 60,
    question: "What is the purpose of energy metering in EV charging systems?",
    options: ["Billing accuracy", "Load monitoring", "Efficiency tracking", "All of the above"],
    correctAnswer: 3,
    explanation: "Energy metering supports accurate billing, load monitoring, and efficiency analysis."
  },
  {
    id: 61,
    question: "Which safety feature prevents charging during cable damage?",
    options: ["RCBO", "Pilot wire monitoring", "Emergency stop", "Temperature sensor"],
    correctAnswer: 1,
    explanation: "Pilot wire monitoring detects cable integrity and prevents charging if damaged."
  },
  {
    id: 62,
    question: "What is the recommended cable bend radius for EV charging installations?",
    options: ["4 times diameter", "6 times diameter", "8 times diameter", "10 times diameter"],
    correctAnswer: 2,
    explanation: "EV charging cables should maintain minimum 8 times diameter bend radius to prevent damage."
  },
  {
    id: 63,
    question: "Which feature enables remote monitoring of EV charging stations?",
    options: ["GPRS/4G connectivity", "Ethernet connection", "Wi-Fi", "All of the above"],
    correctAnswer: 3,
    explanation: "Remote monitoring can use various connectivity methods: cellular, ethernet, or Wi-Fi."
  },
  {
    id: 64,
    question: "What is the typical lifespan of EV charging infrastructure?",
    options: ["5-7 years", "10-15 years", "15-20 years", "25+ years"],
    correctAnswer: 1,
    explanation: "EV charging infrastructure typically has a 10-15 year operational lifespan with proper maintenance."
  },
  {
    id: 65,
    question: "Which protection device is used for arc fault detection in EV installations?",
    options: ["RCBO", "AFDD", "SPD", "MCB"],
    correctAnswer: 1,
    explanation: "AFDD (Arc Fault Detection Device) provides protection against dangerous arc faults."
  },
  {
    id: 66,
    question: "What is the purpose of cable cooling in high-power DC charging?",
    options: ["Extend cable life", "Enable higher current", "Improve efficiency", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable cooling extends life, enables higher currents, and improves charging efficiency."
  },
  {
    id: 67,
    question: "Which factor determines the transformer sizing for EV charging installations?",
    options: ["Peak demand", "Diversity factor", "Future expansion", "All of the above"],
    correctAnswer: 3,
    explanation: "Transformer sizing considers peak demand, diversity factor, and planned future expansion."
  },
  {
    id: 68,
    question: "What is the recommended testing frequency for RCD Type B in EV installations?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctAnswer: 2,
    explanation: "RCD Type B devices should be tested quarterly for reliable protection in EV applications."
  },
  {
    id: 69,
    question: "Which standard defines the charging interface for electric vehicles?",
    options: ["IEC 62196", "IEC 61851", "ISO 15118", "SAE J1772"],
    correctAnswer: 0,
    explanation: "IEC 62196 defines the plugs, socket-outlets, and couplers for EV charging interfaces."
  },
  {
    id: 70,
    question: "What is the purpose of ground fault monitoring in DC charging systems?",
    options: ["Personnel safety", "Equipment protection", "System reliability", "All of the above"],
    correctAnswer: 3,
    explanation: "Ground fault monitoring ensures personnel safety, equipment protection, and system reliability."
  },
  {
    id: 71,
    question: "Which component manages power conversion in DC fast chargers?",
    options: ["Transformer", "Rectifier", "Inverter", "Converter"],
    correctAnswer: 3,
    explanation: "Power conversion modules (converters) manage AC to DC conversion in fast charging systems."
  },
  {
    id: 72,
    question: "What is the typical charging efficiency of modern EV charging systems?",
    options: ["80-85%", "85-90%", "90-95%", "95-98%"],
    correctAnswer: 2,
    explanation: "Modern EV charging systems typically achieve 90-95% overall charging efficiency."
  },
  {
    id: 73,
    question: "Which feature prevents simultaneous AC and DC charging?",
    options: ["Mechanical interlock", "Software control", "Pilot wire logic", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple safety mechanisms prevent dangerous simultaneous AC and DC charging attempts."
  },
  {
    id: 74,
    question: "What is the recommended IP rating for EV charging connectors?",
    options: ["IP44", "IP54", "IP67", "IP69K"],
    correctAnswer: 2,
    explanation: "IP67 rating ensures EV charging connectors are protected against water immersion."
  },
  {
    id: 75,
    question: "Which factor affects the selection of charging cable gauge?",
    options: ["Current capacity", "Voltage drop", "Ambient temperature", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable gauge selection considers current capacity, voltage drop, and temperature derating."
  },
  {
    id: 76,
    question: "What is the purpose of contactor verification in EV charging?",
    options: ["Confirm circuit closure", "Detect contact welding", "Ensure safety isolation", "All of the above"],
    correctAnswer: 3,
    explanation: "Contactor verification confirms proper operation, detects faults, and ensures safe operation."
  },
  {
    id: 77,
    question: "Which protocol enables plug-and-charge functionality?",
    options: ["OCPP", "MQTT", "ISO 15118", "Modbus"],
    correctAnswer: 2,
    explanation: "ISO 15118 enables plug-and-charge with automatic authentication and billing."
  },
  {
    id: 78,
    question: "What is the recommended clearance around EV charging equipment?",
    options: ["500mm", "800mm", "1000mm", "1500mm"],
    correctAnswer: 2,
    explanation: "Minimum 1000mm clearance is recommended around EV charging equipment for maintenance access."
  },
  {
    id: 79,
    question: "Which component provides overcurrent protection specifically for EV charging?",
    options: ["Standard MCB", "Motor protection CB", "EV-rated MCB", "Electronic CB"],
    correctAnswer: 2,
    explanation: "EV-rated MCBs are designed specifically for EV charging application characteristics."
  },
  {
    id: 80,
    question: "What is the typical operating temperature range for EV batteries during charging?",
    options: ["-10°C to 40°C", "0°C to 45°C", "5°C to 50°C", "10°C to 60°C"],
    correctAnswer: 1,
    explanation: "EV batteries typically operate optimally in the 0°C to 45°C range during charging."
  },
  {
    id: 81,
    question: "Which feature enables load balancing across multiple EV chargers?",
    options: ["Local controller", "Central management system", "Smart meters", "All of the above"],
    correctAnswer: 3,
    explanation: "Load balancing uses local controllers, central management, and smart metering for optimization."
  },
  {
    id: 82,
    question: "What is the purpose of insulation monitoring in EV DC charging?",
    options: ["Safety assurance", "Fault detection", "System integrity", "All of the above"],
    correctAnswer: 3,
    explanation: "Insulation monitoring ensures safety, detects faults, and maintains system integrity."
  },
  {
    id: 83,
    question: "Which connector type supports the highest charging power?",
    options: ["Type 2", "CCS2", "CHAdeMO", "Tesla Supercharger"],
    correctAnswer: 1,
    explanation: "CCS2 (Combined Charging System) supports the highest charging powers up to 350kW+."
  },
  {
    id: 84,
    question: "What is the recommended testing procedure for EV charging installations?",
    options: ["Visual inspection only", "Electrical testing only", "Functional testing only", "All testing methods"],
    correctAnswer: 3,
    explanation: "Comprehensive testing includes visual, electrical, and functional testing procedures."
  },
  {
    id: 85,
    question: "Which factor determines the heat dissipation requirements for EV chargers?",
    options: ["Power rating", "Efficiency", "Ambient conditions", "All of the above"],
    correctAnswer: 3,
    explanation: "Heat dissipation depends on power rating, efficiency losses, and ambient conditions."
  },
  {
    id: 86,
    question: "What is the purpose of vehicle communication timeout in charging systems?",
    options: ["Energy saving", "Safety disconnection", "Fault detection", "All of the above"],
    correctAnswer: 3,
    explanation: "Communication timeout enables energy saving, safety disconnection, and fault detection."
  },
  {
    id: 87,
    question: "Which material provides the best electromagnetic shielding for EV cables?",
    options: ["Aluminum foil", "Copper braid", "Steel armor", "Conductive polymer"],
    correctAnswer: 1,
    explanation: "Copper braid provides excellent electromagnetic shielding for EV charging cables."
  },
  {
    id: 88,
    question: "What is the typical reactive power requirement for EV charging installations?",
    options: ["No reactive power", "Capacitive", "Inductive", "Variable"],
    correctAnswer: 3,
    explanation: "EV chargers typically have variable reactive power depending on load and power factor correction."
  },
  {
    id: 89,
    question: "Which feature enables predictive maintenance of EV charging equipment?",
    options: ["Remote monitoring", "Data analytics", "Condition monitoring", "All of the above"],
    correctAnswer: 3,
    explanation: "Predictive maintenance uses remote monitoring, analytics, and condition monitoring together."
  },
  {
    id: 90,
    question: "What is the recommended surge withstand capability for EV charging equipment?",
    options: ["2kV", "4kV", "6kV", "8kV"],
    correctAnswer: 2,
    explanation: "EV charging equipment should typically withstand 6kV surge tests per relevant standards."
  },
  {
    id: 91,
    question: "Which protocol enables integration with renewable energy sources?",
    options: ["OCPP", "MQTT", "OpenADR", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple protocols (OCPP, MQTT, OpenADR) can enable renewable energy integration."
  },
  {
    id: 92,
    question: "What is the purpose of cable temperature monitoring in EV charging?",
    options: ["Prevent overheating", "Optimize charging rate", "Extend cable life", "All of the above"],
    correctAnswer: 3,
    explanation: "Temperature monitoring prevents overheating, enables optimization, and extends cable life."
  },
  {
    id: 93,
    question: "Which factor affects the grid impact of EV charging infrastructure?",
    options: ["Charging profile", "Load diversity", "Time of use", "All of the above"],
    correctAnswer: 3,
    explanation: "Grid impact depends on charging profiles, load diversity, and time-of-use patterns."
  },
  {
    id: 94,
    question: "What is the recommended approach for EV charging infrastructure expansion?",
    options: ["Reactive installation", "Proactive planning", "Demand-driven", "Future-ready design"],
    correctAnswer: 3,
    explanation: "Future-ready design allows for cost-effective expansion as demand grows."
  },
  {
    id: 95,
    question: "Which component enables bi-directional power flow in V2G systems?",
    options: ["Inverter", "Converter", "Transformer", "Rectifier"],
    correctAnswer: 0,
    explanation: "Bi-directional inverters enable two-way power flow between vehicle and grid in V2G systems."
  },
  {
    id: 96,
    question: "What is the typical power factor correction capability of modern EV chargers?",
    options: ["0.85-0.90", "0.90-0.95", "0.95-0.99", "Unity power factor"],
    correctAnswer: 2,
    explanation: "Modern EV chargers can achieve 0.95-0.99 power factor through active correction."
  },
  {
    id: 97,
    question: "Which safety feature prevents charging with damaged vehicle inlet?",
    options: ["Visual inspection", "Pilot wire check", "Proximity detection", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple safety checks including pilot wire and proximity detection prevent unsafe charging."
  },
  {
    id: 98,
    question: "What is the recommended backup power solution for critical EV charging locations?",
    options: ["UPS system", "Diesel generator", "Battery storage", "Solar + battery"],
    correctAnswer: 2,
    explanation: "Battery storage provides clean, immediate backup power for critical EV charging locations."
  },
  {
    id: 99,
    question: "Which factor determines the optimal placement of EV charging infrastructure?",
    options: ["Traffic flow", "Grid capacity", "User convenience", "All of the above"],
    correctAnswer: 3,
    explanation: "Optimal placement considers traffic patterns, grid capacity, and user accessibility."
  },
  {
    id: 100,
    question: "What is the purpose of dynamic pricing in EV charging systems?",
    options: ["Revenue optimization", "Load management", "Grid stability", "All of the above"],
    correctAnswer: 3,
    explanation: "Dynamic pricing optimizes revenue, manages load, and supports grid stability."
  },
  {
    id: 101,
    question: "Which communication standard enables smart grid integration for EV charging?",
    options: ["IEC 61850", "IEEE 2030.5", "OpenADR", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple standards (IEC 61850, IEEE 2030.5, OpenADR) enable smart grid integration."
  },
  {
    id: 102,
    question: "What is the typical charging curve efficiency for lithium-ion batteries?",
    options: ["Constant efficiency", "Decreasing efficiency", "Increasing efficiency", "Variable efficiency"],
    correctAnswer: 1,
    explanation: "Lithium-ion battery charging efficiency typically decreases as state of charge increases."
  },
  {
    id: 103,
    question: "Which component manages thermal protection in high-power charging cables?",
    options: ["Thermistor", "RTD sensor", "Thermocouple", "All of the above"],
    correctAnswer: 3,
    explanation: "Various temperature sensors (thermistor, RTD, thermocouple) can provide thermal protection."
  },
  {
    id: 104,
    question: "What is the recommended approach for EV charging network interoperability?",
    options: ["Proprietary protocols", "Open standards", "Hybrid approach", "Custom solutions"],
    correctAnswer: 1,
    explanation: "Open standards ensure maximum interoperability and future compatibility."
  },
  {
    id: 105,
    question: "Which factor affects the selection of EV charging management software?",
    options: ["Scalability", "Integration capability", "User interface", "All of the above"],
    correctAnswer: 3,
    explanation: "Software selection considers scalability, integration, user interface, and functionality."
  },
  {
    id: 106,
    question: "What is the purpose of ground fault circuit interruption in DC charging?",
    options: ["Personnel protection", "Equipment protection", "Fire prevention", "All of the above"],
    correctAnswer: 3,
    explanation: "GFCI in DC systems provides comprehensive protection for personnel, equipment, and fire prevention."
  },
  {
    id: 107,
    question: "Which connector design feature prevents reverse polarity connection?",
    options: ["Keying", "Mechanical guides", "Electronic verification", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple design features prevent reverse polarity: keying, guides, and electronic verification."
  },
  {
    id: 108,
    question: "What is the recommended cable management approach for EV charging installations?",
    options: ["Overhead routing", "Underground routing", "Surface mounting", "Application-specific"],
    correctAnswer: 3,
    explanation: "Cable routing should be selected based on specific application requirements and constraints."
  },
  {
    id: 109,
    question: "Which feature enables automatic load shedding in EV charging systems?",
    options: ["Smart meters", "Load controllers", "Central management", "All of the above"],
    correctAnswer: 3,
    explanation: "Automatic load shedding requires smart meters, load controllers, and central management."
  },
  {
    id: 110,
    question: "What is the typical operating voltage range for EV battery systems?",
    options: ["200-400V", "300-500V", "400-800V", "600-1000V"],
    correctAnswer: 2,
    explanation: "Modern EV battery systems typically operate in the 400-800V range for efficiency."
  },
  {
    id: 111,
    question: "Which protection device is specifically rated for EV charging applications?",
    options: ["Standard RCBO", "EV-rated RCBO", "Motor RCBO", "Electronic RCBO"],
    correctAnswer: 1,
    explanation: "EV-rated RCBOs are specifically designed for EV charging application characteristics."
  },
  {
    id: 112,
    question: "What is the purpose of cable strain relief in EV charging connectors?",
    options: ["Prevent cable damage", "Maintain connection integrity", "Extend service life", "All of the above"],
    correctAnswer: 3,
    explanation: "Strain relief prevents damage, maintains integrity, and extends cable service life."
  },
  {
    id: 113,
    question: "Which factor determines the cooling requirements for EV charging infrastructure?",
    options: ["Power losses", "Ambient temperature", "Operating duration", "All of the above"],
    correctAnswer: 3,
    explanation: "Cooling requirements depend on power losses, ambient conditions, and operating duration."
  },
  {
    id: 114,
    question: "What is the recommended testing interval for EV charging cable assemblies?",
    options: ["Monthly", "Quarterly", "Annually", "Before each use"],
    correctAnswer: 2,
    explanation: "Annual testing of EV charging cable assemblies is typically recommended for safety."
  },
  {
    id: 115,
    question: "Which component enables remote firmware updates in EV charging stations?",
    options: ["Ethernet connection", "Cellular modem", "Wi-Fi module", "Any network connection"],
    correctAnswer: 3,
    explanation: "Remote firmware updates can be delivered through any available network connection."
  },
  {
    id: 116,
    question: "What is the purpose of vehicle authentication in EV charging systems?",
    options: ["Security", "Billing accuracy", "Load optimization", "All of the above"],
    correctAnswer: 3,
    explanation: "Vehicle authentication supports security, billing accuracy, and load optimization."
  },
  {
    id: 117,
    question: "Which standard defines the safety requirements for EV supply equipment installation?",
    options: ["NEC Article 625", "IEC 60364", "BS 7671", "All apply regionally"],
    correctAnswer: 3,
    explanation: "Different regions use different standards: NEC in US, IEC 60364 internationally, BS 7671 in UK."
  },
  {
    id: 118,
    question: "What is the typical service life expectancy for EV charging connectors?",
    options: ["1,000 cycles", "5,000 cycles", "10,000+ cycles", "20,000+ cycles"],
    correctAnswer: 2,
    explanation: "Quality EV charging connectors are designed for 10,000+ mating cycles."
  },
  {
    id: 119,
    question: "Which feature enables automatic tariff selection in EV charging?",
    options: ["Time scheduling", "User profiles", "Vehicle identification", "All of the above"],
    correctAnswer: 3,
    explanation: "Automatic tariff selection uses time, user profiles, and vehicle identification data."
  },
  {
    id: 120,
    question: "What is the recommended approach for EV charging infrastructure commissioning?",
    options: ["Basic functional test", "Comprehensive testing", "Phased commissioning", "Full system validation"],
    correctAnswer: 3,
    explanation: "Full system validation ensures all components work together safely and effectively."
  },
  {
    id: 121,
    question: "Which component provides arc fault protection in EV DC charging circuits?",
    options: ["Standard AFCI", "DC-rated AFCI", "Electronic protection", "Software monitoring"],
    correctAnswer: 1,
    explanation: "DC-rated AFCI devices are specifically designed for DC circuit arc fault protection."
  },
  {
    id: 122,
    question: "What is the purpose of cable pre-heating in cold climate EV charging?",
    options: ["Improve flexibility", "Reduce resistance", "Prevent damage", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable pre-heating improves flexibility, reduces resistance, and prevents cold damage."
  },
  {
    id: 123,
    question: "Which factor affects the selection of EV charging payment systems?",
    options: ["User preferences", "Infrastructure costs", "Integration complexity", "All of the above"],
    correctAnswer: 3,
    explanation: "Payment system selection considers user needs, costs, and integration requirements."
  },
  {
    id: 124,
    question: "What is the recommended approach for EV charging data management?",
    options: ["Local storage only", "Cloud-based storage", "Hybrid approach", "Real-time processing"],
    correctAnswer: 2,
    explanation: "Cloud-based storage provides scalability, accessibility, and advanced analytics capabilities."
  },
  {
    id: 125,
    question: "Which safety feature prevents energizing damaged charging equipment?",
    options: ["Pre-energization checks", "Continuous monitoring", "Fault detection", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple safety features prevent operation of damaged equipment through various monitoring methods."
  },
  {
    id: 126,
    question: "What is the typical electromagnetic emission limit for EV charging equipment?",
    options: ["Class A limits", "Class B limits", "Industrial limits", "Residential limits"],
    correctAnswer: 1,
    explanation: "EV charging equipment typically must meet Class B emission limits for residential use."
  },
  {
    id: 127,
    question: "Which component enables power quality monitoring in EV charging systems?",
    options: ["Power analyzer", "Smart meter", "Dedicated monitor", "All of the above"],
    correctAnswer: 3,
    explanation: "Power quality can be monitored using analyzers, smart meters, or dedicated monitoring equipment."
  },
  {
    id: 128,
    question: "What is the purpose of cable locking mechanisms in EV charging?",
    options: ["Theft prevention", "Connection security", "Safety assurance", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable locking prevents theft, ensures secure connection, and maintains safety."
  },
  {
    id: 129,
    question: "Which factor determines the optimal charging schedule for fleet operations?",
    options: ["Energy costs", "Grid constraints", "Operational needs", "All of the above"],
    correctAnswer: 3,
    explanation: "Optimal scheduling considers energy costs, grid limitations, and operational requirements."
  },
  {
    id: 130,
    question: "What is the recommended approach for EV charging infrastructure monitoring?",
    options: ["Periodic manual checks", "Continuous automated monitoring", "Alarm-based monitoring", "Comprehensive monitoring"],
    correctAnswer: 3,
    explanation: "Comprehensive monitoring combines continuous automation, alarms, and periodic checks."
  },
  {
    id: 131,
    question: "Which connector material provides the best electrical conductivity for EV charging?",
    options: ["Brass", "Copper", "Silver-plated copper", "Aluminum"],
    correctAnswer: 2,
    explanation: "Silver-plated copper provides the best conductivity and corrosion resistance for EV connectors."
  },
  {
    id: 132,
    question: "What is the purpose of demand response integration in EV charging?",
    options: ["Cost reduction", "Grid stability", "Renewable integration", "All of the above"],
    correctAnswer: 3,
    explanation: "Demand response reduces costs, stabilizes the grid, and integrates renewable energy."
  },
  {
    id: 133,
    question: "Which feature enables predictive fault detection in EV charging systems?",
    options: ["Machine learning", "Historical data analysis", "Real-time monitoring", "All of the above"],
    correctAnswer: 3,
    explanation: "Predictive fault detection uses ML, historical data, and real-time monitoring together."
  },
  {
    id: 134,
    question: "What is the typical operating efficiency of DC fast charging systems?",
    options: ["80-85%", "85-90%", "90-95%", "95-98%"],
    correctAnswer: 2,
    explanation: "Modern DC fast charging systems typically achieve 90-95% operating efficiency."
  },
  {
    id: 135,
    question: "Which standard defines the requirements for EV charging station accessibility?",
    options: ["ADA guidelines", "ISO 14040", "IEC 62196", "Local building codes"],
    correctAnswer: 0,
    explanation: "ADA (Americans with Disabilities Act) guidelines define accessibility requirements in the US."
  },
  {
    id: 136,
    question: "What is the purpose of battery thermal management during EV charging?",
    options: ["Optimize charging rate", "Prevent overheating", "Extend battery life", "All of the above"],
    correctAnswer: 3,
    explanation: "Thermal management optimizes charging, prevents overheating, and extends battery life."
  },
  {
    id: 137,
    question: "Which component enables load forecasting for EV charging networks?",
    options: ["Historical data", "Weather data", "Traffic patterns", "All of the above"],
    correctAnswer: 3,
    explanation: "Load forecasting uses historical data, weather, traffic patterns, and other factors."
  },
  {
    id: 138,
    question: "What is the recommended approach for EV charging cybersecurity?",
    options: ["Basic encryption", "Multi-layer security", "Regular updates", "Comprehensive security"],
    correctAnswer: 3,
    explanation: "Comprehensive cybersecurity includes encryption, multi-layer protection, and regular updates."
  },
  {
    id: 139,
    question: "Which factor affects the selection of EV charging cable materials?",
    options: ["Temperature rating", "Flexibility requirements", "Chemical resistance", "All of the above"],
    correctAnswer: 3,
    explanation: "Cable material selection considers temperature, flexibility, chemical resistance, and durability."
  },
  {
    id: 140,
    question: "What is the purpose of energy storage integration with EV charging?",
    options: ["Peak shaving", "Grid services", "Renewable buffering", "All of the above"],
    correctAnswer: 3,
    explanation: "Energy storage enables peak shaving, grid services, and renewable energy buffering."
  },
  {
    id: 141,
    question: "Which component enables automatic meter reading for EV charging?",
    options: ["Smart meters", "Communication modules", "Data loggers", "All of the above"],
    correctAnswer: 3,
    explanation: "AMR requires smart meters, communication modules, and data logging capabilities."
  },
  {
    id: 142,
    question: "What is the typical power quality standard for EV charging installations?",
    options: ["IEEE 519", "IEC 61000", "EN 50160", "All apply regionally"],
    correctAnswer: 3,
    explanation: "Different regions use different power quality standards for EV charging installations."
  },
  {
    id: 143,
    question: "Which feature enables seamless roaming between EV charging networks?",
    options: ["Common protocols", "Billing integration", "User authentication", "All of the above"],
    correctAnswer: 3,
    explanation: "Seamless roaming requires common protocols, billing integration, and authentication systems."
  },
  {
    id: 144,
    question: "What is the recommended approach for EV charging infrastructure scaling?",
    options: ["Reactive expansion", "Proactive planning", "Modular design", "Future-ready architecture"],
    correctAnswer: 3,
    explanation: "Future-ready architecture enables cost-effective scaling as demand grows."
  },
  {
    id: 145,
    question: "Which component provides the primary safety interlock in EV charging systems?",
    options: ["Contactor", "Relay", "Switch", "Electronic control"],
    correctAnswer: 0,
    explanation: "Contactors provide the primary safety interlock for disconnecting power in EV charging systems."
  },
  {
    id: 146,
    question: "What is the purpose of charging session analytics in EV networks?",
    options: ["Usage optimization", "Revenue analysis", "System improvement", "All of the above"],
    correctAnswer: 3,
    explanation: "Session analytics supports usage optimization, revenue analysis, and system improvements."
  },
  {
    id: 147,
    question: "Which factor determines the optimal placement density for EV charging stations?",
    options: ["Vehicle density", "Travel patterns", "Grid capacity", "All of the above"],
    correctAnswer: 3,
    explanation: "Optimal density considers vehicle density, travel patterns, and available grid capacity."
  },
  {
    id: 148,
    question: "What is the recommended approach for EV charging maintenance planning?",
    options: ["Reactive maintenance", "Preventive maintenance", "Predictive maintenance", "Condition-based maintenance"],
    correctAnswer: 2,
    explanation: "Predictive maintenance optimizes reliability while minimizing costs and downtime."
  },
  {
    id: 149,
    question: "Which communication protocol enables real-time grid integration for EV charging?",
    options: ["MQTT", "CoAP", "IEEE 2030.5", "All of the above"],
    correctAnswer: 3,
    explanation: "Multiple protocols (MQTT, CoAP, IEEE 2030.5) can enable real-time grid integration."
  },
  {
    id: 150,
    question: "What is the ultimate goal of smart EV charging infrastructure development?",
    options: ["Cost minimization", "Grid optimization", "User convenience", "Sustainable transportation"],
    correctAnswer: 3,
    explanation: "The ultimate goal is enabling sustainable transportation through smart, efficient charging infrastructure."
  }
];