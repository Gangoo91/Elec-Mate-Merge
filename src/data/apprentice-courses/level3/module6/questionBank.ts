// Level 3 Module 6: Systems Design - Question Bank
// 200 Questions covering electrical design principles, calculations, and protection

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module6Questions: Question[] = [
  // Section 6.1: Design Principles (Questions 1-30)
  {
    id: 1,
    question: "The fundamental objective of electrical installation design is to provide:",
    options: ["Maximum profit", "Safety and functionality at reasonable cost", "The most complex system possible", "Identical systems for all buildings"],
    correctAnswer: 1,
    explanation: "Design must balance safety, functionality, and economic considerations while meeting user requirements.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "BS 7671 Chapter 13 deals with:",
    options: ["Inspection and testing", "Fundamental principles of design", "Special installations", "Definitions only"],
    correctAnswer: 1,
    explanation: "Chapter 13 sets out the fundamental principles for electrical installation design.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "The design process must consider protection against:",
    options: ["Only electric shock", "Electric shock, fire, thermal effects, overcurrent, and voltage disturbances", "Fire only", "Overcurrent only"],
    correctAnswer: 1,
    explanation: "Comprehensive design addresses multiple hazards including shock, fire, thermal effects, overcurrent, and voltage issues.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 4,
    question: "Assessment of general characteristics at the start of design includes:",
    options: ["Only the building size", "Purpose of installation, supply characteristics, and environmental conditions", "Cost estimates only", "Cable colours"],
    correctAnswer: 1,
    explanation: "Initial assessment covers purpose, supply details, external influences, and compatibility requirements.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 5,
    question: "External influences in design refer to:",
    options: ["Economic factors only", "Environmental and utilisation conditions affecting the installation", "Customer preferences", "Contractor availability"],
    correctAnswer: 1,
    explanation: "External influences include ambient conditions, water presence, mechanical factors, and usage patterns.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 6,
    question: "The maintainability of an installation must be considered during design to:",
    options: ["Increase initial cost", "Ensure safe access for future inspection and maintenance", "Make the job difficult", "Avoid future work"],
    correctAnswer: 1,
    explanation: "Design must allow for safe access to equipment for inspection, testing, and maintenance throughout its life.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "Division of an installation into circuits is necessary to:",
    options: ["Use more materials", "Avoid danger, minimise inconvenience, and meet safety requirements", "Make installation complex", "Increase testing time"],
    correctAnswer: 1,
    explanation: "Circuit division limits extent of faults, enables isolation for maintenance, and prevents total loss of supply.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "Compatibility between devices and the supply should ensure:",
    options: ["All devices are the same brand", "No harmful effects during normal operation including switching", "Identical appearance", "Minimum equipment"],
    correctAnswer: 1,
    explanation: "Equipment must be compatible with supply characteristics and not cause harmful effects on other devices.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Design documentation required by BS 7671 includes:",
    options: ["Only a price list", "Diagrams, schedules, and calculations as appropriate", "Verbal descriptions only", "Customer preference notes"],
    correctAnswer: 1,
    explanation: "Adequate documentation must be provided including diagrams, schedules, and design calculations.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 10,
    question: "When designing for future expansion, the designer should:",
    options: ["Ignore future needs", "Allow for reasonably anticipated additions", "Provide unlimited spare capacity", "Only design for current needs"],
    correctAnswer: 1,
    explanation: "Design should reasonably anticipate future requirements where economically practical.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "The concept of diversity in electrical design refers to:",
    options: ["Using different brands", "Not all loads operate simultaneously at full load", "Installing various cable sizes", "Using multiple contractors"],
    correctAnswer: 1,
    explanation: "Diversity recognises that not all connected loads operate at full load simultaneously.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 12,
    question: "Selection of protective measures depends primarily on:",
    options: ["Designer preference", "The type of earthing system and circuit characteristics", "Equipment colour", "Customer budget only"],
    correctAnswer: 1,
    explanation: "Protective measures are selected based on earthing system type and specific circuit requirements.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "The design current (Ib) of a circuit is:",
    options: ["The fuse rating", "The current intended to flow under normal conditions", "Maximum possible current", "Testing current"],
    correctAnswer: 1,
    explanation: "Design current is the current expected to flow in the circuit during normal operation.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 14,
    question: "British Standards relevant to electrical design include:",
    options: ["Only BS 7671", "BS 7671, BS EN standards, and product standards", "No standards are mandatory", "Only EU standards"],
    correctAnswer: 1,
    explanation: "Design must comply with BS 7671 plus relevant product and installation standards.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 15,
    question: "Risk assessment in electrical design helps to:",
    options: ["Avoid all work", "Identify hazards and implement appropriate control measures", "Increase costs", "Delay projects"],
    correctAnswer: 1,
    explanation: "Risk assessment identifies potential hazards and ensures appropriate protective measures are included in design.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "The designer must verify that the supply is adequate for the:",
    options: ["Building size only", "Maximum demand, fault current, and operating characteristics", "Number of floors", "Distance from substation"],
    correctAnswer: 1,
    explanation: "Design must confirm supply can meet maximum demand and protective devices have adequate ratings.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "Electromagnetic compatibility (EMC) in design ensures:",
    options: ["All cables are the same colour", "Equipment doesn't cause or suffer from electromagnetic interference", "Maximum power consumption", "Identical equipment throughout"],
    correctAnswer: 1,
    explanation: "EMC considerations prevent electromagnetic interference problems between equipment and external sources.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "The purpose of Chapter 51 in BS 7671 regarding design is to:",
    options: ["Define cable colours", "Set requirements for selecting and erecting equipment", "List manufacturers", "Specify testing procedures"],
    correctAnswer: 1,
    explanation: "Chapter 51 provides rules for selecting and erecting electrical equipment appropriately.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "Designing for safety requires considering:",
    options: ["Normal operation only", "Normal operation, foreseeable faults, and misuse", "Only catastrophic failures", "Equipment appearance"],
    correctAnswer: 1,
    explanation: "Safety design covers normal operation, reasonably foreseeable faults, and potential misuse scenarios.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 20,
    question: "The importance of coordination between designer and installer is:",
    options: ["Optional", "Essential to ensure design intent is correctly implemented", "Only for large projects", "Administrative only"],
    correctAnswer: 1,
    explanation: "Close coordination ensures the installation matches design requirements and any deviations are properly assessed.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 21,
    question: "Design must ensure electrical equipment is accessible for:",
    options: ["Viewing only", "Operation, inspection, maintenance, and repair", "Photography", "Customer tours"],
    correctAnswer: 1,
    explanation: "Accessibility is required for all operational and maintenance activities throughout equipment life.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 22,
    question: "Energy efficiency in electrical design is addressed by:",
    options: ["Ignoring it entirely", "Selecting efficient equipment and optimising circuit arrangements", "Using maximum cable sizes", "Installing maximum lighting"],
    correctAnswer: 1,
    explanation: "Energy efficiency includes equipment selection, power factor, voltage drop, and circuit optimisation.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 23,
    question: "The protection against basic protection (direct contact) in design ensures:",
    options: ["High voltage access", "Live parts are not accessible during normal use", "All parts are accessible", "Only trained access"],
    correctAnswer: 1,
    explanation: "Basic protection prevents contact with live parts during normal operation and use.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 24,
    question: "Fault protection (protection against indirect contact) in design ensures:",
    options: ["No protection needed", "Automatic disconnection or other measures prevent shock from exposed-conductive-parts", "Manual disconnection only", "Faults are ignored"],
    correctAnswer: 1,
    explanation: "Fault protection ensures automatic disconnection or equivalent measures protect against indirect contact.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "Design verification before construction should confirm:",
    options: ["Equipment prices only", "The design meets BS 7671 and client requirements", "Installation schedule", "Weather forecasts"],
    correctAnswer: 1,
    explanation: "Design must be verified for BS 7671 compliance and meeting client specifications before work starts.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "Selecting equipment for design requires considering:",
    options: ["Brand popularity only", "Voltage, current, frequency, power, and environmental conditions", "Colour scheme", "Installer preference only"],
    correctAnswer: 1,
    explanation: "Equipment selection considers electrical ratings, environmental conditions, and application requirements.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 27,
    question: "The responsibility for electrical design ultimately rests with:",
    options: ["The customer", "The designer/contractor who signs the design certificate", "Building control only", "The equipment manufacturer"],
    correctAnswer: 1,
    explanation: "The designer who signs Part 1 of the EIC takes responsibility for the design.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 28,
    question: "Standard circuit arrangements exist for:",
    options: ["All installations", "Common applications like ring finals, radials, and lighting circuits", "Industrial only", "No standard arrangements exist"],
    correctAnswer: 1,
    explanation: "Standard arrangements exist for common circuits though variations may be needed for specific requirements.",
    section: "6.1",
    difficulty: "basic"
  },
  {
    id: 29,
    question: "Design considerations for special locations in Part 7 of BS 7671 require:",
    options: ["Ignoring special requirements", "Additional or modified requirements beyond standard rules", "Identical design to normal locations", "Less stringent requirements"],
    correctAnswer: 1,
    explanation: "Part 7 special locations require additional or modified protective measures beyond standard requirements.",
    section: "6.1",
    difficulty: "intermediate"
  },
  {
    id: 30,
    question: "The design process typically includes which sequence?",
    options: ["Install then design", "Assess > Calculate > Select > Document", "Random approach", "Testing only"],
    correctAnswer: 1,
    explanation: "Design follows logical sequence: assess requirements, calculate parameters, select equipment, document design.",
    section: "6.1",
    difficulty: "basic"
  },

  // Section 6.2: Load Calculations (Questions 31-65)
  {
    id: 31,
    question: "Maximum demand is defined as:",
    options: ["Total connected load", "Maximum expected load taking diversity into account", "Minimum load", "Average daily load"],
    correctAnswer: 1,
    explanation: "Maximum demand is the highest load expected considering diversity factors.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 32,
    question: "For a domestic ring final circuit, the assumed maximum current per socket is typically:",
    options: ["13A always", "Based on diversity, often 10-13A for assumed current", "32A", "3A"],
    correctAnswer: 1,
    explanation: "Ring circuits use diversity assumptions where not all sockets operate at full 13A simultaneously.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 33,
    question: "Diversity factor is expressed as:",
    options: ["A percentage greater than 100%", "A decimal or percentage less than 1 (or 100%)", "Fixed value of 1.5", "Same for all installations"],
    correctAnswer: 1,
    explanation: "Diversity factor is typically less than 1 (or less than 100%) as not all loads operate at full capacity simultaneously.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "The formula for calculating current from single-phase power is:",
    options: ["I = P × V", "I = P / (V × pf) for power factor loads", "I = V / P", "I = P × pf"],
    correctAnswer: 1,
    explanation: "For single-phase loads: I = P / (V × power factor), or I = P / V for purely resistive loads.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 35,
    question: "For three-phase balanced loads, line current is calculated using:",
    options: ["I = P / V", "I = P / (√3 × VL × pf)", "I = P / (3 × V)", "I = P × 3"],
    correctAnswer: 1,
    explanation: "Three-phase balanced load current: I = P / (√3 × VL × power factor).",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 36,
    question: "A 3kW heater at 230V draws approximately:",
    options: ["3A", "13A", "30A", "100A"],
    correctAnswer: 1,
    explanation: "I = P/V = 3000/230 = 13A approximately.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 37,
    question: "When calculating load for a domestic cooker circuit, diversity allows for:",
    options: ["Full rating always", "10A plus 30% of remainder over 10A plus socket allowance", "50% of total rating", "No diversity permitted"],
    correctAnswer: 1,
    explanation: "Cooker diversity calculation: first 10A + 30% of balance + 5A if socket fitted.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 38,
    question: "An electric shower rated at 10.8kW requires minimum design current of:",
    options: ["32A", "47A", "50A", "100A"],
    correctAnswer: 1,
    explanation: "I = 10800/230 = 47A. This typically requires a 50A circuit.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 39,
    question: "For motor starting current considerations, design should allow for:",
    options: ["Running current only", "Starting current which can be 6-8 times full load", "Half running current", "No special consideration"],
    correctAnswer: 1,
    explanation: "Motor starting currents are significantly higher than running current and must be considered in design.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 40,
    question: "Lighting load calculations for domestic premises typically allow:",
    options: ["500W per room", "66W per outlet minimum or actual load if higher", "100W fixed per room", "No specific guidance"],
    correctAnswer: 1,
    explanation: "Minimum 66W per lighting outlet or actual connected load, whichever is greater.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 41,
    question: "Power factor affects load calculations because:",
    options: ["It has no effect", "Apparent power (VA) is greater than true power (W) for reactive loads", "It only applies to DC", "It reduces all loads"],
    correctAnswer: 1,
    explanation: "Poor power factor means higher apparent power and current for the same true power output.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "If power factor is 0.8, and true power is 8kW, the apparent power is:",
    options: ["6.4kVA", "10kVA", "8kVA", "64kVA"],
    correctAnswer: 1,
    explanation: "S = P/pf = 8000/0.8 = 10000VA = 10kVA.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 43,
    question: "For small office/commercial premises, socket outlet loads often assume:",
    options: ["13A each socket", "500W per m² or similar rules of thumb", "No load", "1A per socket"],
    correctAnswer: 1,
    explanation: "Commercial estimates often use W/m² or assumed loads per outlet depending on use type.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 44,
    question: "The total connected load of a circuit is:",
    options: ["The same as maximum demand", "Sum of all equipment ratings connected to the circuit", "Average daily consumption", "Fuse rating"],
    correctAnswer: 1,
    explanation: "Total connected load is the sum of all equipment ratings without applying diversity.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 45,
    question: "EV charger load calculations should consider:",
    options: ["Full rated current with limited diversity", "50% of rating", "Ignored in demand calculations", "Occasional use only"],
    correctAnswer: 0,
    explanation: "EV chargers typically have limited diversity applied as they often operate simultaneously at full load.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "Heat pump load calculations must account for:",
    options: ["Only heating mode", "Both heating and cooling loads where applicable", "No electrical load", "Same as conventional heating"],
    correctAnswer: 1,
    explanation: "Heat pumps may have different loads in heating vs cooling modes - both should be considered.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 47,
    question: "For a circuit supplying multiple discharge lighting fittings, the current should be calculated as:",
    options: ["Lamp wattage / voltage", "1.8 × lamp watts / voltage to allow for control gear", "Half lamp rating", "Same as filament lamps"],
    correctAnswer: 1,
    explanation: "Discharge lighting current calculation multiplies by 1.8 to account for control gear and power factor.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "A commercial kitchen with multiple cooking appliances would typically use:",
    options: ["100% of all ratings", "Diversity factors based on simultaneous use probability", "50% of total", "No calculations needed"],
    correctAnswer: 1,
    explanation: "Commercial kitchen diversity considers which appliances operate together during peak service.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "LED lighting loads compared to equivalent fluorescent loads are typically:",
    options: ["Higher", "Lower, requiring recalculation of existing circuits", "Identical", "Not comparable"],
    correctAnswer: 1,
    explanation: "LED loads are usually lower than equivalent fluorescent, potentially allowing circuit optimisation.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "When converting single-phase loads to three-phase supply, the goal is to:",
    options: ["Connect all to one phase", "Balance loads across all three phases", "Use only two phases", "Ignore balance requirements"],
    correctAnswer: 1,
    explanation: "Three-phase design should balance single-phase loads across phases to prevent neutral overload.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 51,
    question: "Spare capacity in load calculations is desirable for:",
    options: ["Maximum cost only", "Future expansion and operating margins", "Avoiding any spare capacity", "Reducing safety"],
    correctAnswer: 1,
    explanation: "Reasonable spare capacity allows for future additions and prevents operation at maximum limits.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 52,
    question: "In a dwelling with 100A supply, typical maximum demand calculation produces:",
    options: ["Exactly 100A", "Usually significantly less than 100A due to diversity", "Always exceeds supply", "Fixed at 80A"],
    correctAnswer: 1,
    explanation: "Domestic diversity means actual maximum demand is typically much less than total connected load.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "Standby generator sizing should be based on:",
    options: ["Average load only", "Essential loads maximum demand plus starting currents", "Total building load", "Minimum possible size"],
    correctAnswer: 1,
    explanation: "Generator sizing considers essential loads, starting requirements, and load sequencing.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 54,
    question: "For water heating by immersion, typical load is:",
    options: ["500W", "3kW standard element", "10kW", "100W"],
    correctAnswer: 1,
    explanation: "Standard immersion heaters are typically 3kW, though other ratings exist.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 55,
    question: "UPS load calculations must consider:",
    options: ["Only battery backup time", "Connected equipment VA rating and power factor", "Cost of UPS only", "No calculation needed"],
    correctAnswer: 1,
    explanation: "UPS sizing considers connected equipment VA ratings, power factor, and required backup duration.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 56,
    question: "Data centre load calculations are typically based on:",
    options: ["Standard domestic diversity", "W/m² with little diversity due to continuous high loads", "Minimum possible loads", "Lighting loads only"],
    correctAnswer: 1,
    explanation: "Data centres have high continuous loads with limited diversity - often calculated per rack or m².",
    section: "6.2",
    difficulty: "advanced"
  },
  {
    id: 57,
    question: "Peak demand in commercial buildings typically occurs:",
    options: ["At night", "During business hours when most systems operate", "Weekends only", "All times equally"],
    correctAnswer: 1,
    explanation: "Commercial peak demand usually aligns with business hours when HVAC, lighting, and equipment operate.",
    section: "6.2",
    difficulty: "basic"
  },
  {
    id: 58,
    question: "When combining resistive and motor loads, the calculation must account for:",
    options: ["Only resistive loads", "Different power factors affecting total current", "Motors as resistive", "No difference in treatment"],
    correctAnswer: 1,
    explanation: "Motor and resistive loads have different power factors affecting combined calculations.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 59,
    question: "The formula P = V²/R shows that for a fixed resistance, power varies with:",
    options: ["Current only", "Square of voltage", "Voltage linearly", "Independently of voltage"],
    correctAnswer: 1,
    explanation: "Power varies with the square of voltage for fixed resistance - voltage changes have significant effect.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 60,
    question: "For calculating neutral current in a three-phase four-wire system with balanced loads:",
    options: ["Equal to phase current", "Zero for perfectly balanced loads", "Three times phase current", "Half phase current"],
    correctAnswer: 1,
    explanation: "With balanced three-phase loads, phase currents cancel and neutral current is theoretically zero.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 61,
    question: "Harmonic currents affect neutral sizing because:",
    options: ["They have no effect", "Triple-N harmonics add in the neutral rather than cancelling", "They reduce neutral current", "Only in single phase"],
    correctAnswer: 1,
    explanation: "Third order (triple-N) harmonics don't cancel in the neutral and can cause significant neutral currents.",
    section: "6.2",
    difficulty: "advanced"
  },
  {
    id: 62,
    question: "A three-phase motor rated at 15kW, 0.85pf, 400V draws approximately:",
    options: ["38A", "25A", "22A", "50A"],
    correctAnswer: 1,
    explanation: "I = 15000/(√3 × 400 × 0.85) = 25.4A approximately.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 63,
    question: "When calculating demand for dwellings with electric vehicle charging:",
    options: ["Ignore EV charger", "Add EV charger load with appropriate diversity", "Reduce other loads", "Use 7kW regardless of charger rating"],
    correctAnswer: 1,
    explanation: "EV charger load should be added with consideration of charging patterns and potential diversity with other loads.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 64,
    question: "Demand-side response systems can reduce peak demand by:",
    options: ["Increasing all loads", "Scheduling non-essential loads away from peak times", "Running generators constantly", "Reducing supply voltage"],
    correctAnswer: 1,
    explanation: "Demand-side management schedules flexible loads to reduce peak demand and improve load factor.",
    section: "6.2",
    difficulty: "intermediate"
  },
  {
    id: 65,
    question: "A good load factor (ratio of average to peak demand) indicates:",
    options: ["Poor efficiency", "Consistent load profile making efficient use of capacity", "Need for larger supply", "System problems"],
    correctAnswer: 1,
    explanation: "High load factor indicates consistent demand and efficient use of installed capacity.",
    section: "6.2",
    difficulty: "intermediate"
  },

  // Section 6.3: Cable Selection (Questions 66-100)
  {
    id: 66,
    question: "The three main factors for cable sizing are:",
    options: ["Colour, length, and price", "Current carrying capacity, voltage drop, and fault protection", "Weight, flexibility, and appearance", "Brand, availability, and customer preference"],
    correctAnswer: 1,
    explanation: "Cables must carry design current, limit voltage drop, and allow protective devices to operate correctly.",
    section: "6.3",
    difficulty: "basic"
  },
  {
    id: 67,
    question: "The relationship between cable sizing requirements is: Ib ≤ In ≤ Iz, where:",
    options: ["Ib is breaking capacity", "Ib is design current, In is device rating, Iz is cable capacity", "All are the same", "Order doesn't matter"],
    correctAnswer: 1,
    explanation: "Design current ≤ protective device rating ≤ cable current carrying capacity under installation conditions.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 68,
    question: "Derating factors (correction factors) reduce cable capacity for:",
    options: ["All installations equally", "Higher ambient temperature, grouping, and thermal insulation", "Standard installations only", "Underground cables only"],
    correctAnswer: 1,
    explanation: "Derating accounts for conditions that reduce heat dissipation: high temperature, grouped cables, thermal insulation.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 69,
    question: "If ambient temperature correction factor (Ca) is 0.87 and a cable has tabulated rating of 27A, the derated capacity is:",
    options: ["31A", "23.5A", "27A unchanged", "40A"],
    correctAnswer: 1,
    explanation: "Derated capacity = 27 × 0.87 = 23.49A approximately.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 70,
    question: "Grouping factor (Cg) accounts for:",
    options: ["Single cable installation", "Reduced heat dissipation when cables are installed together", "Underground installation", "Cable colour"],
    correctAnswer: 1,
    explanation: "Grouped cables dissipate heat less effectively, requiring derating via grouping factor.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 71,
    question: "Cables installed in thermal insulation must be derated using factor (Ci) because:",
    options: ["Insulation increases capacity", "Heat cannot dissipate effectively through thermal insulation", "Regulations require it regardless", "It only applies to very long runs"],
    correctAnswer: 1,
    explanation: "Thermal insulation significantly reduces heat dissipation, requiring substantial derating.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 72,
    question: "For a cable completely surrounded by thermal insulation over 0.5m, the factor (Ci) is:",
    options: ["1.0", "0.5", "0.88", "0.75"],
    correctAnswer: 1,
    explanation: "Cable completely surrounded by thermal insulation requires 0.5 (50%) derating.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 73,
    question: "Voltage drop in cables is calculated using:",
    options: ["V = I × R (ignoring reactance for small cables)", "V = I × L only", "No calculation needed", "Fixed percentage always"],
    correctAnswer: 0,
    explanation: "Voltage drop uses mV/A/m values from tables incorporating resistance (and reactance for larger cables).",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 74,
    question: "The maximum recommended voltage drop from origin to load for lighting circuits is:",
    options: ["10%", "3%", "5%", "8%"],
    correctAnswer: 1,
    explanation: "BS 7671 recommends maximum 3% voltage drop for lighting circuits.",
    section: "6.3",
    difficulty: "basic"
  },
  {
    id: 75,
    question: "For a circuit with Ib=25A, and derated cable capacity of 24A, the cable is:",
    options: ["Correctly sized", "Undersized - design current exceeds cable capacity", "Oversized", "Perfect match"],
    correctAnswer: 1,
    explanation: "Cable is undersized: Ib (25A) must be ≤ Iz (24A derated). A larger cable is needed.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 76,
    question: "The mV/A/m value for voltage drop calculations is:",
    options: ["Fixed for all cables", "Varies with cable size and construction - from tables", "Always 1mV/A/m", "Only for three-phase"],
    correctAnswer: 1,
    explanation: "mV/A/m values vary with cable size and type - found in BS 7671 Appendix 4 tables.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "For a 30m cable run carrying 20A with mV/A/m of 18, the voltage drop is:",
    options: ["10.8V", "1.08V", "108V", "0.108V"],
    correctAnswer: 0,
    explanation: "VD = (mV/A/m × I × L)/1000 = (18 × 20 × 30)/1000 = 10.8V.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "Adiabatic equation for protective conductor sizing uses:",
    options: ["Only cable capacity", "S = √(I²t)/k relating fault current, time, and conductor constant", "Fixed sizes always", "No calculation method exists"],
    correctAnswer: 1,
    explanation: "Adiabatic equation S = √(I²t)/k calculates minimum CPC size from fault current and disconnection time.",
    section: "6.3",
    difficulty: "advanced"
  },
  {
    id: 79,
    question: "Reference installation methods in BS 7671 affect cable ratings because:",
    options: ["They don't affect ratings", "Heat dissipation varies with installation method", "Only appearance matters", "All methods have same ratings"],
    correctAnswer: 1,
    explanation: "Different installation methods have different heat dissipation characteristics affecting current capacity.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "Installation method C (clipped direct) typically has higher ratings than method A (enclosed) because:",
    options: ["Method C is more expensive", "Direct clipping allows better heat dissipation than enclosures", "Method A is always better", "No difference exists"],
    correctAnswer: 1,
    explanation: "Clipped direct cables dissipate heat more effectively than enclosed cables, allowing higher ratings.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 81,
    question: "SWA (Steel Wire Armoured) cable is typically used for:",
    options: ["Internal lighting only", "Underground and external installations requiring mechanical protection", "High voltage only", "Temporary installations"],
    correctAnswer: 1,
    explanation: "SWA provides mechanical protection suitable for direct burial and external installation.",
    section: "6.3",
    difficulty: "basic"
  },
  {
    id: 82,
    question: "XLPE insulation on cables allows higher operating temperature than PVC, meaning:",
    options: ["Lower current ratings", "Higher current ratings for same size conductor", "Identical ratings", "Only for DC circuits"],
    correctAnswer: 1,
    explanation: "XLPE's higher temperature rating (90°C vs 70°C for PVC) allows higher current capacity.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 83,
    question: "For earth fault protection, the cable/device combination must ensure disconnection within:",
    options: ["Any time", "The time specified for the circuit type (0.4s for final, 5s for distribution)", "Always 1 second", "Time is not critical"],
    correctAnswer: 1,
    explanation: "Disconnection time limits depend on circuit type: 0.4s for ≤32A final circuits, 5s for distribution.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 84,
    question: "The 'k' value in CPC sizing calculations represents:",
    options: ["Cable cost", "Conductor material and insulation type constant", "Length factor", "Temperature only"],
    correctAnswer: 1,
    explanation: "k is a constant depending on conductor material (copper/aluminium) and insulation type.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 85,
    question: "When voltage drop and current capacity require different cable sizes:",
    options: ["Use the smaller size", "Use the larger cable that meets both requirements", "Average the sizes", "Ignore voltage drop"],
    correctAnswer: 1,
    explanation: "The cable must meet BOTH requirements, so use the larger of the two calculated sizes.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "Aluminium conductors compared to copper for the same current capacity:",
    options: ["Are the same size", "Need larger cross-section due to lower conductivity", "Are smaller", "Cannot be used"],
    correctAnswer: 1,
    explanation: "Aluminium has lower conductivity than copper, requiring larger sizes for equivalent capacity.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 87,
    question: "Fire performance of cables (e.g., fire resistant, LSHF) affects selection for:",
    options: ["All circuits equally", "Emergency circuits, escape routes, and fire spread prevention", "Only external cables", "Cost reduction only"],
    correctAnswer: 1,
    explanation: "Fire performance requirements apply to emergency systems and where fire/smoke spread must be limited.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 88,
    question: "Flexible cables are typically rated for:",
    options: ["All installations", "Connections to moving equipment or where flexibility is needed", "Permanent wiring", "Underground only"],
    correctAnswer: 1,
    explanation: "Flexible cables suit applications requiring movement or flexibility in connection.",
    section: "6.3",
    difficulty: "basic"
  },
  {
    id: 89,
    question: "Combined correction factors for cable sizing are calculated by:",
    options: ["Adding all factors", "Multiplying all applicable factors together", "Using largest factor only", "Ignoring them all"],
    correctAnswer: 1,
    explanation: "Overall correction factor = Ca × Cg × Ci × Cc (all applicable factors multiplied).",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 90,
    question: "If multiple correction factors are 0.94, 0.82, and 0.75, the combined factor is approximately:",
    options: ["2.51", "0.58", "0.94", "0.75"],
    correctAnswer: 1,
    explanation: "Combined = 0.94 × 0.82 × 0.75 = 0.578 (approximately 0.58).",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 91,
    question: "Cable sizing for motor circuits should additionally consider:",
    options: ["Only running current", "Starting current and protection coordination", "Appearance only", "No special considerations"],
    correctAnswer: 1,
    explanation: "Motor cables must handle starting currents and coordinate with motor protection devices.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 92,
    question: "Ring final circuit cables are typically 2.5mm² because:",
    options: ["It's the minimum manufactured size", "Two parallel paths share the current, adequately sized for 32A protection", "Customer preference", "Arbitrary standard"],
    correctAnswer: 1,
    explanation: "Ring arrangement creates two parallel paths, so 2.5mm² adequately carries half the current in each leg.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 93,
    question: "For circuits in potentially explosive atmospheres, cable selection must:",
    options: ["Be standard", "Meet specific requirements for hazardous area classification", "Use minimum sizes", "Ignore special requirements"],
    correctAnswer: 1,
    explanation: "Hazardous areas require cables and equipment certified for the specific zone classification.",
    section: "6.3",
    difficulty: "advanced"
  },
  {
    id: 94,
    question: "Cable volt drop at operating temperature differs from cold because:",
    options: ["Temperature has no effect", "Conductor resistance increases with temperature", "Resistance decreases when warm", "Only affects AC circuits"],
    correctAnswer: 1,
    explanation: "Conductor resistance increases with temperature, affecting voltage drop calculations.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 95,
    question: "For circuits protected by BS 88 fuses, the cable must be sized so that:",
    options: ["Any size works", "I2 ≤ 1.45 × Iz is satisfied for overload protection", "Only disconnection time matters", "No specific rule applies"],
    correctAnswer: 1,
    explanation: "Cable must be protected so I2 (fuse operation current) doesn't exceed 1.45 times cable capacity.",
    section: "6.3",
    difficulty: "advanced"
  },
  {
    id: 96,
    question: "Conduit fill calculations ensure:",
    options: ["Maximum cable density", "Cables can be drawn in without damage and heat dissipation is adequate", "Minimum cables installed", "Only appearance is considered"],
    correctAnswer: 1,
    explanation: "Conduit capacity limits prevent installation damage and ensure adequate heat dissipation.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 97,
    question: "Busbars are typically used instead of cables when:",
    options: ["Low currents are involved", "High currents require more effective heat dissipation and connections", "Cost is critical", "Underground installation needed"],
    correctAnswer: 1,
    explanation: "Busbars suit high current applications where heat management and connections benefit from busbar systems.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 98,
    question: "Cable ratings in BS 7671 tables assume:",
    options: ["100°C ambient", "Specific reference conditions including 30°C ambient", "Any conditions", "Zero ambient temperature"],
    correctAnswer: 1,
    explanation: "Tabulated ratings assume reference conditions - typically 30°C ambient - requiring correction for other conditions.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 99,
    question: "For long cable runs, the dominant sizing factor is usually:",
    options: ["Current capacity", "Voltage drop", "Fault capacity", "Appearance"],
    correctAnswer: 1,
    explanation: "Long runs often require upsizing for voltage drop even when current capacity is adequate.",
    section: "6.3",
    difficulty: "intermediate"
  },
  {
    id: 100,
    question: "The minimum cross-sectional area for protective conductors in most circuits is:",
    options: ["Equal to phase conductor", "Related to phase conductor size per Table 54.7 or calculation", "Always 1mm²", "Half phase conductor size"],
    correctAnswer: 1,
    explanation: "CPC minimum size relates to phase conductor size via Table 54.7 or adiabatic calculation.",
    section: "6.3",
    difficulty: "intermediate"
  },

  // Section 6.4: Protection Coordination (Questions 101-130)
  {
    id: 101,
    question: "Protection coordination (discrimination) means:",
    options: ["All devices operate simultaneously", "Only the device nearest the fault operates, leaving other circuits unaffected", "No devices operate", "Random operation"],
    correctAnswer: 1,
    explanation: "Discrimination ensures the protective device closest to the fault operates first, maintaining supply elsewhere.",
    section: "6.4",
    difficulty: "basic"
  },
  {
    id: 102,
    question: "Back-up protection occurs when:",
    options: ["No protection exists", "An upstream device clears a fault if the closer device fails", "Only one device is installed", "Protection is unnecessary"],
    correctAnswer: 1,
    explanation: "Back-up protection provides secondary protection if the primary device fails to operate.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 103,
    question: "Time-current characteristics of protective devices are important for:",
    options: ["Appearance only", "Understanding how devices respond to different fault levels", "Marketing purposes", "Colour coding"],
    correctAnswer: 1,
    explanation: "Time-current curves show operating time at different current levels, essential for coordination.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 104,
    question: "For fuses to discriminate, the upstream fuse rating should typically be:",
    options: ["Same as downstream", "At least 1.6 times the downstream fuse rating", "Smaller than downstream", "Exactly double"],
    correctAnswer: 1,
    explanation: "Fuse discrimination typically requires upstream rating to be at least 1.6× (often 2×) downstream.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 105,
    question: "MCB type (B, C, D) affects coordination because:",
    options: ["Only colour differs", "Different types have different instantaneous trip levels", "All types are identical", "Type doesn't matter for coordination"],
    correctAnswer: 1,
    explanation: "MCB types trip at different multiples of rated current (B:3-5×, C:5-10×, D:10-20×).",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 106,
    question: "Type B MCBs trip instantaneously between:",
    options: ["1-2 times In", "3-5 times In", "5-10 times In", "10-20 times In"],
    correctAnswer: 1,
    explanation: "Type B MCBs have instantaneous magnetic trip between 3× and 5× rated current.",
    section: "6.4",
    difficulty: "basic"
  },
  {
    id: 107,
    question: "Type C MCBs are typically used for:",
    options: ["Lighting only", "Motor circuits and equipment with moderate inrush current", "Highly resistive loads only", "All domestic circuits"],
    correctAnswer: 1,
    explanation: "Type C (5-10× trip) suits motor circuits and equipment with higher inrush currents.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 108,
    question: "Type D MCBs are appropriate for:",
    options: ["Standard lighting", "High inrush loads like transformers and X-ray equipment", "All domestic circuits", "Only resistive loads"],
    correctAnswer: 1,
    explanation: "Type D (10-20× trip) suits very high inrush applications like transformers.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "RCD coordination between upstream and downstream RCDs requires:",
    options: ["Identical ratings", "S-type upstream with appropriate current/time discrimination", "Random selection", "Avoiding multiple RCDs"],
    correctAnswer: 1,
    explanation: "S-type (time-delayed) RCDs upstream allow downstream general RCDs to operate first.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 110,
    question: "The let-through energy (I²t) of protective devices is important for:",
    options: ["Only accounting purposes", "Ensuring cables and equipment survive fault conditions", "Marketing comparisons", "Colour selection"],
    correctAnswer: 1,
    explanation: "Let-through energy determines whether cables and equipment withstand fault energy without damage.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "Breaking capacity of a protective device must be:",
    options: ["Lower than prospective fault current", "At least equal to prospective fault current at installation point", "Exactly equal to rated current", "Unrelated to fault current"],
    correctAnswer: 1,
    explanation: "Device breaking capacity must equal or exceed the maximum prospective fault current.",
    section: "6.4",
    difficulty: "basic"
  },
  {
    id: 112,
    question: "If prospective fault current is 8kA, the minimum device breaking capacity should be:",
    options: ["6kA", "At least 8kA (typically use 10kA rated device)", "3kA", "Any rating is acceptable"],
    correctAnswer: 1,
    explanation: "Breaking capacity must at least equal prospective fault current - 10kA device would be suitable.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 113,
    question: "Cascading (back-up protection) allows:",
    options: ["No protection", "Downstream devices with lower breaking capacity if properly coordinated with upstream", "Ignoring fault levels", "Using any combination"],
    correctAnswer: 1,
    explanation: "Properly coordinated cascading allows lower rated downstream devices protected by upstream devices.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 114,
    question: "The purpose of current limiting in protective devices is to:",
    options: ["Increase fault current", "Reduce actual fault current by fast operation before peak", "Has no purpose", "Only affects cost"],
    correctAnswer: 1,
    explanation: "Current-limiting devices operate fast enough to reduce the fault current below prospective peak.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "For motor protection coordination, the overload relay setting should be:",
    options: ["Higher than motor FLC", "Matched to motor full load current", "Lower than starting current", "Random setting"],
    correctAnswer: 1,
    explanation: "Overload protection is set at or near motor full load current to detect overload conditions.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 116,
    question: "Short circuit protection for motors must:",
    options: ["Only protect cables", "Allow starting current while protecting against faults", "Trip during starting", "Be set lower than running current"],
    correctAnswer: 1,
    explanation: "Short circuit protection must be set above starting current to prevent nuisance tripping while protecting against faults.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "Protection coordination studies are typically required for:",
    options: ["All installations", "Complex commercial/industrial installations", "Domestic only", "Never required"],
    correctAnswer: 1,
    explanation: "Complex installations with multiple protection levels need coordination studies to verify discrimination.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "The I²t withstand of cables relates to:",
    options: ["Normal operation", "Energy cable can withstand during fault without damage", "Voltage rating", "Length only"],
    correctAnswer: 1,
    explanation: "I²t withstand indicates fault energy the cable can survive without insulation damage.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "When MCBs and fuses are used together in a system, coordination requires:",
    options: ["Ignoring characteristics", "Analysis of time-current curves to ensure proper sequence", "Using identical ratings", "Random placement"],
    correctAnswer: 1,
    explanation: "Different device types require careful curve comparison to achieve discrimination.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 120,
    question: "Ground fault protection in large systems provides:",
    options: ["No benefit", "Additional protection with adjustable settings for coordination", "Same as standard overcurrent", "Only metering function"],
    correctAnswer: 1,
    explanation: "Ground fault protection adds adjustable earth fault detection coordinated with other protection.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 121,
    question: "Selectivity in RCD systems can be achieved by:",
    options: ["Using identical RCDs everywhere", "Using time-delayed (S-type) and higher rated RCDs upstream", "Not using RCDs", "Random selection"],
    correctAnswer: 1,
    explanation: "RCD selectivity uses time delay and/or higher IΔn rating for upstream devices.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 122,
    question: "A 100mA S-type RCD upstream of 30mA RCDs provides selectivity because:",
    options: ["Rating is higher only", "Both higher rating AND time delay allow downstream to operate first", "S-type is faster", "No selectivity is achieved"],
    correctAnswer: 1,
    explanation: "Combination of higher IΔn rating and time delay ensures downstream 30mA trips first.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 123,
    question: "For circuits with electronic loads (VFDs, etc.), protection must consider:",
    options: ["Only overload", "High frequency content affecting RCD operation and coordination", "Standard protection only", "No special consideration"],
    correctAnswer: 1,
    explanation: "Electronic loads may produce harmonics and DC components affecting standard protection.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 124,
    question: "MCCB adjustable settings include:",
    options: ["Colour only", "Long-time, short-time, instantaneous, and ground fault settings", "Just on/off", "Fixed settings only"],
    correctAnswer: 1,
    explanation: "MCCBs often have adjustable trip settings for various protection functions enabling coordination.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 125,
    question: "The term 'fully rated' in protection means:",
    options: ["All devices identical", "Each device rated for full prospective fault current at its location", "Minimum ratings used", "Under-rated system"],
    correctAnswer: 1,
    explanation: "Fully rated means each device has adequate breaking capacity for fault current at its location.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 126,
    question: "Series rating (cascading) documentation should show:",
    options: ["Nothing specific", "Tested combinations approved by manufacturer", "Any combination is valid", "Cost savings only"],
    correctAnswer: 1,
    explanation: "Cascaded combinations must be manufacturer-tested and approved, with documentation available.",
    section: "6.4",
    difficulty: "intermediate"
  },
  {
    id: 127,
    question: "For transformer secondary protection, the device must consider:",
    options: ["Only transformer rating", "Transformer impedance effect on fault current", "Primary only", "No transformer considerations"],
    correctAnswer: 1,
    explanation: "Transformer impedance limits secondary fault current, affecting protection sizing.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 128,
    question: "Arc flash protection measures in design include:",
    options: ["Ignoring arc flash", "Fast-acting devices and arc-resistant equipment where appropriate", "Maximum operating times", "No protection possible"],
    correctAnswer: 1,
    explanation: "Arc flash mitigation uses fast protection and appropriate equipment design.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 129,
    question: "Zone selective interlocking allows:",
    options: ["All zones to trip", "Upstream devices to wait for downstream to clear faults", "Faster upstream tripping", "No interlocking benefit"],
    correctAnswer: 1,
    explanation: "ZSI provides communication between devices enabling proper selective operation.",
    section: "6.4",
    difficulty: "advanced"
  },
  {
    id: 130,
    question: "Documentation of protection coordination should include:",
    options: ["Just device schedules", "Single line diagrams, settings, and coordination curves", "Verbal description only", "Cost information only"],
    correctAnswer: 1,
    explanation: "Complete documentation includes diagrams, device schedules, settings, and coordination studies.",
    section: "6.4",
    difficulty: "intermediate"
  },

  // Section 6.5: Earthing & Bonding (Questions 131-160)
  {
    id: 131,
    question: "The purpose of earthing in an electrical installation is primarily to:",
    options: ["Reduce electricity bills", "Provide a path for fault currents and limit touch voltages", "Improve power factor", "Reduce cable costs"],
    correctAnswer: 1,
    explanation: "Earthing provides fault current path enabling protective device operation and limits touch voltages.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 132,
    question: "The main earthing terminal connects:",
    options: ["Phase and neutral", "All earthing and bonding conductors to the means of earthing", "Only light fittings", "Extraneous parts only"],
    correctAnswer: 1,
    explanation: "Main earthing terminal is the common connection point for circuit CPCs, bonding, and earthing conductor.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 133,
    question: "TN-S earthing system has:",
    options: ["Combined neutral and earth", "Separate neutral and earth conductors from source", "Earth electrode only", "No earth connection"],
    correctAnswer: 1,
    explanation: "TN-S has separate protective conductor throughout, typically via cable sheath.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 134,
    question: "TN-C-S (PME) earthing system uses:",
    options: ["Separate conductors throughout", "Combined PEN from supply, separate in installation", "Earth electrode only", "No earthing system"],
    correctAnswer: 1,
    explanation: "TN-C-S combines neutral and earth in supply (PEN), separating to PE and N at origin.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 135,
    question: "TT earthing system relies on:",
    options: ["Supply earth", "Installation earth electrode separate from supply earth", "Combined neutral/earth", "No earth needed"],
    correctAnswer: 1,
    explanation: "TT systems use local earth electrode independent of supply system earthing.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 136,
    question: "Main protective bonding connects:",
    options: ["Only water pipes", "Extraneous-conductive-parts to main earthing terminal", "Phase to neutral", "Between circuits"],
    correctAnswer: 1,
    explanation: "Main bonding connects incoming services (water, gas, structural steel) to main earthing terminal.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 137,
    question: "Minimum main bonding conductor size for PME supply in domestic installation is typically:",
    options: ["2.5mm²", "10mm²", "16mm²", "6mm²"],
    correctAnswer: 1,
    explanation: "PME supplies typically require minimum 10mm² main bonding conductors (16mm² for larger supplies).",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 138,
    question: "Supplementary bonding is required in locations where:",
    options: ["All installations", "Risk of shock is increased, such as bathrooms", "Never required now", "Only industrial premises"],
    correctAnswer: 1,
    explanation: "Supplementary bonding in special locations (bathrooms etc.) reduces touch voltage between parts.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 139,
    question: "An extraneous-conductive-part is:",
    options: ["Part of electrical installation", "Metal part not part of installation but liable to introduce potential", "Any metal surface", "Only structural steel"],
    correctAnswer: 1,
    explanation: "Extraneous-conductive-parts can introduce potential from outside the installation (e.g., water pipes).",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 140,
    question: "An exposed-conductive-part is:",
    options: ["Part of building structure", "Metal part of electrical equipment that can become live under fault", "Always live", "Extraneous part"],
    correctAnswer: 1,
    explanation: "Exposed-conductive-parts are touchable metal of electrical equipment not normally live but potentially so under fault.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 141,
    question: "The earthing conductor connects:",
    options: ["Neutral to earth", "Main earthing terminal to means of earthing", "Between circuits", "Light fittings"],
    correctAnswer: 1,
    explanation: "The earthing conductor links main earthing terminal to the earth electrode or supply earth.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 142,
    question: "For TT systems, the earth electrode resistance should be low enough to:",
    options: ["Any value is acceptable", "Ensure RCD operates within required time (typically Ra×IΔn ≤ 50V)", "Be zero ohms", "Match supply impedance"],
    correctAnswer: 1,
    explanation: "Earth electrode resistance must be low enough that fault voltage doesn't exceed 50V when RCD operates.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 143,
    question: "Types of earth electrode include:",
    options: ["Only copper rods", "Rods, tapes, plates, foundation electrodes, and structural steel", "Plastic pipes", "Only imported earths"],
    correctAnswer: 1,
    explanation: "Various electrode types are acceptable depending on soil conditions and installation requirements.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 144,
    question: "PME supplies have specific requirements for bonding because:",
    options: ["No special requirements", "Loss of supply PEN could make installation conductive parts live", "PME is simpler", "Lower fault currents"],
    correctAnswer: 1,
    explanation: "PME PEN conductor failure could energise all bonded metalwork, requiring comprehensive bonding.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 145,
    question: "Earthing and bonding conductor materials must be:",
    options: ["Only copper", "Suitable for the environment and adequately protected", "Always aluminium", "Any metal"],
    correctAnswer: 1,
    explanation: "Materials must withstand environmental conditions and be adequately sized and protected.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 146,
    question: "A circuit protective conductor (CPC) provides:",
    options: ["Current carrying path", "Earth fault return path for each circuit", "Neutral function", "Phase connection"],
    correctAnswer: 1,
    explanation: "The CPC provides the earth fault path from exposed-conductive-parts back to source.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 147,
    question: "CPC sizing using Table 54.7 relates to:",
    options: ["Cable length", "Phase conductor cross-sectional area", "Voltage drop", "Installation method"],
    correctAnswer: 1,
    explanation: "Table 54.7 gives minimum CPC size related to associated phase conductor size.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 148,
    question: "The earthing terminal in a consumer unit should be:",
    options: ["Optional", "Clearly identified and accessible", "Hidden", "Connected to neutral"],
    correctAnswer: 1,
    explanation: "Main earthing terminal must be clearly identified and accessible for inspection and testing.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 149,
    question: "Functional earthing differs from protective earthing as it:",
    options: ["Is the same thing", "Provides earthing for equipment operation rather than safety", "Is not required", "Replaces protective earthing"],
    correctAnswer: 1,
    explanation: "Functional earthing enables equipment to work correctly (e.g., filters) distinct from safety earthing.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "Combined earthing and neutral (PEN) conductors in TN-C systems must be:",
    options: ["Any size", "At least 10mm² copper or 16mm² aluminium minimum", "Same as phase", "4mm² minimum"],
    correctAnswer: 1,
    explanation: "PEN conductor minimum sizes are specified as it carries both functions.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 151,
    question: "Earth clamps and connections should be:",
    options: ["Any method", "Labelled with safety electrical connection warning", "Painted over", "Hidden from view"],
    correctAnswer: 1,
    explanation: "Earth connections must be labelled 'Safety Electrical Connection - Do Not Remove'.",
    section: "6.5",
    difficulty: "basic"
  },
  {
    id: 152,
    question: "Automatic disconnection of supply (ADS) relies on:",
    options: ["Manual operation", "Earth fault path impedance being low enough for device operation", "Time delay only", "Voltage rise"],
    correctAnswer: 1,
    explanation: "ADS requires low enough earth fault loop impedance to cause rapid protective device operation.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "For outbuildings supplied from the main building, earthing arrangements should:",
    options: ["Use the same earth always", "Consider whether PME conditions permit extension or TT is needed", "Be separate always", "Not be considered"],
    correctAnswer: 1,
    explanation: "Outbuilding earthing must consider PME restrictions and may require local TT system.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "Lightning protection earthing, where installed, should be:",
    options: ["Completely separate", "Bonded to installation earthing", "Not considered", "Replace installation earth"],
    correctAnswer: 1,
    explanation: "Lightning protection earth should be bonded to installation earth to prevent dangerous potential differences.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 155,
    question: "Gas pipes require main bonding:",
    options: ["Within 600mm of meter, consumer side", "At any convenient point", "Outside the building", "Never required"],
    correctAnswer: 0,
    explanation: "Gas bonding should be within 600mm of the meter on consumer side (or where first accessible).",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "Water pipes require main bonding where:",
    options: ["Never", "They enter the building (or within 600mm of stopcock)", "Only if copper", "Only external sections"],
    correctAnswer: 1,
    explanation: "Water bonding at point of entry or within 600mm of internal stopcock.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 157,
    question: "Plastic pipe sections in water systems affect bonding because:",
    options: ["No effect", "Metalwork each side may need individual bonding", "Bonding is not required", "Plastic is conductive"],
    correctAnswer: 1,
    explanation: "Plastic sections can isolate metal sections requiring individual bonding assessment.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 158,
    question: "Oil supply pipes typically require bonding where:",
    options: ["Never required", "They are metal and within the building", "Only external sections", "Bonding prohibited"],
    correctAnswer: 1,
    explanation: "Metal oil pipes within buildings require bonding as extraneous-conductive-parts.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 159,
    question: "In bathrooms, supplementary bonding connects:",
    options: ["Only the bath", "All extraneous and exposed-conductive-parts within zones", "Only light fittings", "The window frame"],
    correctAnswer: 1,
    explanation: "Supplementary bonding in bathrooms connects all accessible conductive parts together.",
    section: "6.5",
    difficulty: "intermediate"
  },
  {
    id: 160,
    question: "The 'Ze' value at the origin represents:",
    options: ["Total installation impedance", "External earth fault loop impedance from supply", "CPC resistance", "Bonding conductor resistance"],
    correctAnswer: 1,
    explanation: "Ze is external earth fault loop impedance measured at origin with installation disconnected.",
    section: "6.5",
    difficulty: "intermediate"
  },

  // Section 6.6: Special Locations (Questions 161-185)
  {
    id: 161,
    question: "Special locations in Part 7 of BS 7671 require:",
    options: ["Standard rules only", "Additional or modified requirements beyond standard rules", "Less stringent requirements", "No specific rules"],
    correctAnswer: 1,
    explanation: "Part 7 locations have increased risk requiring additional or modified protective measures.",
    section: "6.6",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "Bathroom zones define:",
    options: ["Decorative areas", "Areas with specific equipment and protection requirements", "Room sizes only", "Colour schemes"],
    correctAnswer: 1,
    explanation: "Zones 0, 1, and 2 define areas with specific IP rating and equipment requirements.",
    section: "6.6",
    difficulty: "basic"
  },
  {
    id: 163,
    question: "Zone 0 in a bathroom is:",
    options: ["The window area", "Inside the bath or shower basin", "The entire room", "Above the ceiling"],
    correctAnswer: 1,
    explanation: "Zone 0 is the interior of the bath or shower tray - the highest risk area.",
    section: "6.6",
    difficulty: "basic"
  },
  {
    id: 164,
    question: "Equipment in bathroom Zone 1 must have minimum IP rating of:",
    options: ["IP20", "IPX4 (or IPX5 where water jets used)", "No requirement", "IP68"],
    correctAnswer: 1,
    explanation: "Zone 1 requires minimum IPX4 protection (IPX5 where water jets used for cleaning).",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 165,
    question: "Swimming pool design must consider:",
    options: ["Only Zone 0", "All zones with very specific equipment and protection requirements", "Standard domestic rules", "No special requirements"],
    correctAnswer: 1,
    explanation: "Swimming pool zones have strict requirements including SELV where applicable and supplementary bonding.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 166,
    question: "Sauna room temperatures affect design because:",
    options: ["No effect", "High temperatures require heat-resistant cables and equipment", "Cold temperatures are the issue", "Only affects lighting"],
    correctAnswer: 1,
    explanation: "High sauna temperatures require cables and equipment rated for elevated temperatures.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "Construction site installations require:",
    options: ["Standard domestic installation rules", "Reduced voltage, RCD protection, and robust equipment", "No specific requirements", "Higher voltage supplies"],
    correctAnswer: 1,
    explanation: "Construction sites need reduced voltage supplies, 30mA RCDs, and equipment suitable for harsh conditions.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 168,
    question: "Agricultural and horticultural installations have special requirements due to:",
    options: ["Only aesthetic reasons", "Presence of livestock, dust, moisture, and corrosive atmospheres", "Low voltage only", "Simple equipment"],
    correctAnswer: 1,
    explanation: "Agricultural premises face livestock contact risk, moisture, dust, and potentially corrosive environments.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 169,
    question: "For agricultural premises, the maximum disconnection time for socket circuits is:",
    options: ["5 seconds", "0.2 seconds", "1 second", "0.4 seconds"],
    correctAnswer: 1,
    explanation: "Agricultural socket circuits require 0.2s disconnection time due to increased risk.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 170,
    question: "Caravan parks electrical design must provide:",
    options: ["Any convenient supply", "Correctly rated socket outlets with RCD protection at pitch", "Extension leads only", "No specific requirements"],
    correctAnswer: 1,
    explanation: "Caravan pitches require specific BS EN 60309 sockets with individual RCD protection.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 171,
    question: "Marina electrical installations must consider:",
    options: ["Only boat sizes", "Water proximity, floating equipment, and maritime conditions", "Standard requirements only", "Aesthetics"],
    correctAnswer: 1,
    explanation: "Marinas face water exposure, floating equipment, and harsh marine environment requiring specific measures.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 172,
    question: "Temporary installations at exhibitions require:",
    options: ["Permanent wiring standards", "Specific attention to public safety and frequent inspection", "No specific requirements", "Lower standards"],
    correctAnswer: 1,
    explanation: "Exhibition installations need careful attention due to public access and temporary nature.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 173,
    question: "Solar PV installation design must include:",
    options: ["Standard requirements only", "DC system considerations, isolation, and labelling requirements", "Only AC requirements", "No specific requirements"],
    correctAnswer: 1,
    explanation: "PV systems have DC circuit requirements, isolation provisions, and specific labelling requirements.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 174,
    question: "Electric vehicle charging installations require:",
    options: ["Standard socket outlets", "Dedicated circuits with RCD protection and appropriate equipment", "No special requirements", "Three-phase only"],
    correctAnswer: 1,
    explanation: "EV charging requires dedicated circuits, appropriate protection, and compliant charging equipment.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 175,
    question: "Medical locations have specific requirements for:",
    options: ["Appearance only", "IT systems, equipotential bonding, and power supply reliability", "Standard rules only", "Cost reduction"],
    correctAnswer: 1,
    explanation: "Medical locations require specialised earthing arrangements, IT systems for critical areas, and reliable supplies.",
    section: "6.6",
    difficulty: "advanced"
  },
  {
    id: 176,
    question: "Hazardous area design (explosive atmospheres) requires:",
    options: ["Standard equipment", "Equipment certified for the zone classification", "Only increased ventilation", "No electrical equipment"],
    correctAnswer: 1,
    explanation: "Hazardous areas require specifically certified equipment for the relevant zone (0, 1, 2 for gas; 20, 21, 22 for dust).",
    section: "6.6",
    difficulty: "advanced"
  },
  {
    id: 177,
    question: "Conducting locations with restricted movement require:",
    options: ["Standard requirements", "SELV or additional protective measures", "Higher voltage supplies", "No special requirements"],
    correctAnswer: 1,
    explanation: "Conductive restricted locations increase shock risk, requiring SELV or specific protective measures.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 178,
    question: "Operating and maintenance gangways have requirements for:",
    options: ["Only width", "Safe access, working space, and emergency escape", "Aesthetics only", "No requirements"],
    correctAnswer: 1,
    explanation: "Gangways must allow safe access, adequate working space, and emergency egress.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 179,
    question: "Floor and ceiling heating systems require:",
    options: ["Standard wiring only", "Protection against overheating and mechanical damage", "No specific requirements", "Only thermostatic control"],
    correctAnswer: 1,
    explanation: "Heating systems need thermal cutouts, mechanical protection, and consideration of temperature effects.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 180,
    question: "Outdoor lighting installations must consider:",
    options: ["Only appearance", "Weather exposure, IP rating, and mechanical protection", "Indoor requirements", "Cost only"],
    correctAnswer: 1,
    explanation: "Outdoor installations face weather, require appropriate IP ratings, and may need mechanical protection.",
    section: "6.6",
    difficulty: "basic"
  },
  {
    id: 181,
    question: "Fountains and water features have requirements similar to:",
    options: ["Standard lighting", "Swimming pools with zone requirements", "No special requirements", "Agricultural installations"],
    correctAnswer: 1,
    explanation: "Fountains have zone requirements similar to swimming pools due to water contact risks.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 182,
    question: "Mobile or transportable unit supplies must include:",
    options: ["Fixed wiring only", "Appropriate connection means and protective measures", "No special requirements", "Permanent installation"],
    correctAnswer: 1,
    explanation: "Mobile units require suitable supply connections and protective measures for their mobile nature.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "Electrical installations in caravans must comply with:",
    options: ["Domestic standards only", "BS 7671 Section 721 requirements", "No specific requirements", "Industrial standards"],
    correctAnswer: 1,
    explanation: "Caravan installations have specific requirements in BS 7671 Section 721.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 184,
    question: "Emergency lighting design must ensure:",
    options: ["Only appearance", "Adequate illumination, duration, and reliability during emergencies", "Minimum cost", "Identical to normal lighting"],
    correctAnswer: 1,
    explanation: "Emergency lighting provides required illumination levels for specified duration with high reliability.",
    section: "6.6",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "Fire alarm system wiring should:",
    options: ["Use standard cables", "Use fire resistant cables and follow BS 5839 requirements", "Any cable is acceptable", "Only surface mounted"],
    correctAnswer: 1,
    explanation: "Fire alarm wiring requires fire resistant cables and compliance with BS 5839.",
    section: "6.6",
    difficulty: "intermediate"
  },

  // Section 6.7: Design Documentation (Questions 186-200)
  {
    id: 186,
    question: "Design documentation must include:",
    options: ["Only final certificate", "Sufficient information to verify design and enable safe operation", "Marketing material", "Verbal descriptions"],
    correctAnswer: 1,
    explanation: "Documentation must enable design verification and provide information for safe operation and maintenance.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 187,
    question: "Single line diagrams show:",
    options: ["All individual conductors", "Simplified representation of circuits and equipment", "Decorative layouts", "Only the origin"],
    correctAnswer: 1,
    explanation: "Single line diagrams show circuit arrangements in simplified form for overall understanding.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 188,
    question: "Schematic diagrams provide:",
    options: ["Physical layouts", "Functional relationships between components", "Aesthetic layouts", "Cost breakdowns"],
    correctAnswer: 1,
    explanation: "Schematics show how circuits function and components interconnect logically.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 189,
    question: "Layout drawings show:",
    options: ["Electrical theory", "Physical positions of equipment and cable routes", "Test results", "Maintenance schedules"],
    correctAnswer: 1,
    explanation: "Layout drawings show where equipment is physically located and cable routing.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 190,
    question: "Design calculations should demonstrate:",
    options: ["Cost efficiency only", "Compliance with cable sizing, protection, and voltage drop requirements", "Installation speed", "Contractor preference"],
    correctAnswer: 1,
    explanation: "Calculations demonstrate compliance with technical requirements of BS 7671.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 191,
    question: "Equipment schedules list:",
    options: ["Only manufacturers", "Equipment types, ratings, and locations", "Paint colours", "Installation dates"],
    correctAnswer: 1,
    explanation: "Schedules itemise equipment with their specifications and positions in the installation.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 192,
    question: "Cable schedules should include:",
    options: ["Only cable colours", "Cable types, sizes, routes, and protective device coordination", "Manufacturer preferences", "Installation labour"],
    correctAnswer: 1,
    explanation: "Cable schedules detail cable specifications, routes, and associated protection.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 193,
    question: "Part 1 of the EIC (design) requires the designer to confirm:",
    options: ["Installation cost", "The design meets BS 7671 requirements", "Customer preference", "Contractor availability"],
    correctAnswer: 1,
    explanation: "Design certification confirms the design complies with BS 7671 and designer specifications.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 194,
    question: "As-built documentation is necessary when:",
    options: ["Never", "The final installation differs from original design", "Only for large projects", "Customer requests it"],
    correctAnswer: 1,
    explanation: "As-built records are needed when installation varies from original design.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 195,
    question: "Design risk assessments should identify:",
    options: ["Only cost risks", "Hazards and mitigation measures incorporated in design", "Weather forecasts", "Contractor qualifications"],
    correctAnswer: 1,
    explanation: "Design risk assessments identify hazards and how the design addresses them.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 196,
    question: "Technical specifications define:",
    options: ["Only brands to use", "Performance requirements and standards to be met", "Installation schedule", "Colour schemes"],
    correctAnswer: 1,
    explanation: "Specifications set out performance requirements and applicable standards.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 197,
    question: "Operation and maintenance manuals should include:",
    options: ["Marketing material", "Information for safe operation and maintenance of the installation", "Installation costs", "Contractor history"],
    correctAnswer: 1,
    explanation: "O&M manuals provide essential information for safe, ongoing operation and maintenance.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 198,
    question: "Design documentation retention should be:",
    options: ["Immediately destroyed", "For the life of the installation", "One year only", "No retention needed"],
    correctAnswer: 1,
    explanation: "Design documentation should be retained throughout installation life for reference.",
    section: "6.7",
    difficulty: "basic"
  },
  {
    id: 199,
    question: "Changes to design during construction should be:",
    options: ["Ignored", "Documented and verified for continued compliance", "Hidden from records", "Only verbal notification"],
    correctAnswer: 1,
    explanation: "Design changes must be documented and verified to ensure continued BS 7671 compliance.",
    section: "6.7",
    difficulty: "intermediate"
  },
  {
    id: 200,
    question: "BIM (Building Information Modelling) in electrical design provides:",
    options: ["Only 3D visualisation", "Integrated design information and coordination with other services", "Marketing material", "No practical benefit"],
    correctAnswer: 1,
    explanation: "BIM integrates design data and enables coordination between electrical and other building services.",
    section: "6.7",
    difficulty: "intermediate"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module6Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module6Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module6Questions.filter(q => q.difficulty === difficulty);
};

export default module6Questions;
