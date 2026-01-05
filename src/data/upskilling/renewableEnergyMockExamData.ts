export const renewableEnergyMockExamQuestions = [
  // Module 1: Introduction to Renewable Energy
  {
    id: 1,
    question: "What percentage of global electricity generation came from renewable sources in 2023?",
    options: ["15%", "25%", "30%", "35%"],
    correct: 2,
    explanation: "Renewable energy accounted for approximately 30% of global electricity generation in 2023."
  },
  {
    id: 2,
    question: "Which renewable energy source has the fastest growth rate globally?",
    options: ["Wind", "Solar PV", "Hydroelectric", "Biomass"],
    correct: 1,
    explanation: "Solar PV has experienced the fastest growth rate among renewable energy technologies."
  },
  {
    id: 3,
    question: "What is the primary driver for renewable energy adoption in the UK?",
    options: ["Cost reduction", "Climate targets", "Energy security", "All of the above"],
    correct: 3,
    explanation: "All factors contribute significantly to renewable energy adoption in the UK."
  },
  {
    id: 4,
    question: "Which Act established the UK's legally binding net-zero target?",
    options: ["Climate Change Act 2008", "Energy Act 2013", "Clean Growth Strategy", "Environment Act 2021"],
    correct: 0,
    explanation: "The Climate Change Act 2008 (amended in 2019) established the UK's net-zero target for 2050."
  },
  {
    id: 5,
    question: "What does LCOE stand for?",
    options: ["Low Cost of Energy", "Levelised Cost of Electricity", "Local Community Energy", "Lifecycle Carbon Output Estimate"],
    correct: 1,
    explanation: "LCOE stands for Levelised Cost of Electricity, a key metric for comparing energy technologies."
  },

  // Module 2: Solar PV Technology
  {
    id: 6,
    question: "What is the typical efficiency range for monocrystalline silicon solar panels?",
    options: ["12-15%", "15-18%", "18-22%", "22-26%"],
    correct: 2,
    explanation: "Modern monocrystalline silicon panels typically achieve 18-22% efficiency."
  },
  {
    id: 7,
    question: "Which solar cell technology offers the highest efficiency but at higher cost?",
    options: ["Polycrystalline", "Monocrystalline", "Thin-film", "Bifacial"],
    correct: 1,
    explanation: "Monocrystalline technology offers the highest efficiency among standard commercial technologies."
  },
  {
    id: 8,
    question: "What is the main advantage of thin-film solar panels?",
    options: ["Higher efficiency", "Lower cost", "Better performance in low light", "Longer lifespan"],
    correct: 1,
    explanation: "Thin-film panels have lower manufacturing costs and better performance in high temperatures."
  },
  {
    id: 9,
    question: "What causes the photovoltaic effect?",
    options: ["Heat from sunlight", "Photons knocking electrons free", "Magnetic fields", "Chemical reactions"],
    correct: 1,
    explanation: "The photovoltaic effect occurs when photons knock electrons free from atoms in the semiconductor material."
  },
  {
    id: 10,
    question: "What is the typical degradation rate of modern solar panels per year?",
    options: ["0.1-0.3%", "0.4-0.8%", "1.0-1.5%", "2.0-3.0%"],
    correct: 1,
    explanation: "Modern solar panels typically degrade at 0.4-0.8% per year."
  },

  // Module 3: System Design and Components
  {
    id: 11,
    question: "What is the primary function of a solar inverter?",
    options: ["Store energy", "Convert DC to AC", "Regulate voltage", "Provide earthing"],
    correct: 1,
    explanation: "The primary function of a solar inverter is to convert DC electricity from panels to AC for use in homes and the grid."
  },
  {
    id: 12,
    question: "Which inverter type is best for installations with partial shading?",
    options: ["String inverter", "Central inverter", "Power optimisers", "Micro inverters"],
    correct: 3,
    explanation: "Micro inverters perform best with partial shading as each panel operates independently."
  },
  {
    id: 13,
    question: "What is the optimal tilt angle for solar panels in London?",
    options: ["25°", "35°", "45°", "55°"],
    correct: 1,
    explanation: "The optimal tilt angle for London is approximately 35°, matching the latitude."
  },
  {
    id: 14,
    question: "Which direction provides maximum solar irradiance in the UK?",
    options: ["East", "South-East", "South", "South-West"],
    correct: 2,
    explanation: "South-facing panels receive maximum solar irradiance in the UK."
  },
  {
    id: 15,
    question: "What is the minimum spacing between panel rows to avoid shading?",
    options: ["1.5 x panel height", "2 x panel height", "2.5 x panel height", "3 x panel height"],
    correct: 2,
    explanation: "Minimum spacing is typically 2.5 times the panel height to avoid shading during winter months."
  },

  // Module 4: Installation and Safety
  {
    id: 16,
    question: "According to BS 7671, what is the maximum DC voltage for a domestic solar installation?",
    options: ["600V", "800V", "1000V", "1500V"],
    correct: 2,
    explanation: "BS 7671 allows up to 1000V DC for domestic solar installations."
  },
  {
    id: 17,
    question: "What is the minimum clearance required around roof-mounted solar panels?",
    options: ["0.5m", "1.0m", "1.5m", "2.0m"],
    correct: 1,
    explanation: "A minimum 1.0m clearance is required around roof-mounted panels for maintenance access."
  },
  {
    id: 18,
    question: "Which regulation covers the installation of solar PV systems?",
    options: ["BS 7909", "BS 7671", "BS EN 62446", "MCS 012"],
    correct: 1,
    explanation: "BS 7671 (IET Wiring Regulations) covers the electrical installation of solar PV systems."
  },
  {
    id: 19,
    question: "What PPE is essential when working on rooftop solar installations?",
    options: ["Hard hat only", "Safety harness only", "Hard hat and safety boots", "Full fall protection system"],
    correct: 3,
    explanation: "Full fall protection including harness, hard hat, safety boots, and appropriate anchoring is essential."
  },
  {
    id: 20,
    question: "What is the purpose of rapid shutdown in solar installations?",
    options: ["Improve efficiency", "Safety for emergency responders", "Reduce maintenance", "Increase lifespan"],
    correct: 1,
    explanation: "Rapid shutdown ensures safety for emergency responders by quickly reducing DC voltage."
  },

  // Module 5: Grid Connection and Regulations
  {
    id: 21,
    question: "What does G99 regulation cover?",
    options: ["Planning permission", "Grid connection requirements", "Safety standards", "Environmental impact"],
    correct: 1,
    explanation: "G99 covers the requirements for connecting distributed energy resources to the distribution network."
  },
  {
    id: 22,
    question: "What is the capacity threshold for G99 Type A applications?",
    options: ["3.68kW", "16A per phase", "Both 3.68kW and 16A per phase", "10kW"],
    correct: 2,
    explanation: "G99 Type A covers installations up to 3.68kW total or 16A per phase."
  },
  {
    id: 23,
    question: "What is required for export limitation in solar installations?",
    options: ["Export limiting device", "Smart meter", "DNO approval", "All of the above"],
    correct: 3,
    explanation: "Export limitation requires appropriate devices, smart metering, and DNO compliance."
  },
  {
    id: 24,
    question: "What is the maximum export limit for single-phase domestic connections?",
    options: ["3.68kW", "5kW", "16A", "Unlimited"],
    correct: 0,
    explanation: "The standard export limit for single-phase domestic connections is 3.68kW (16A)."
  },
  {
    id: 25,
    question: "Which document must be submitted for G99 applications?",
    options: ["ENA form", "DNO application", "Technical schedule", "All of the above"],
    correct: 3,
    explanation: "G99 applications require completion of ENA forms, DNO-specific applications, and technical schedules."
  },

  // Module 6: Testing and Commissioning
  {
    id: 26,
    question: "What is the acceptable insulation resistance for a solar PV installation?",
    options: ["≥0.5MΩ", "≥1MΩ", "≥2MΩ", "≥5MΩ"],
    correct: 1,
    explanation: "The minimum acceptable insulation resistance for solar PV installations is 1MΩ."
  },
  {
    id: 27,
    question: "What test must be performed before connecting to the grid?",
    options: ["Insulation resistance", "Earth fault loop impedance", "Polarity", "All of the above"],
    correct: 3,
    explanation: "All electrical safety tests must be completed before grid connection."
  },
  {
    id: 28,
    question: "What is the typical open-circuit voltage test range for a 10-panel string?",
    options: ["200-250V", "300-400V", "400-500V", "500-600V"],
    correct: 2,
    explanation: "A 10-panel string typically produces 400-500V open-circuit voltage depending on panel specifications."
  },
  {
    id: 29,
    question: "Which standard covers testing of solar PV installations?",
    options: ["BS 7671", "BS EN 62446", "MCS 012", "G99"],
    correct: 1,
    explanation: "BS EN 62446 specifically covers testing and commissioning of solar PV installations."
  },
  {
    id: 30,
    question: "What documentation is required after commissioning?",
    options: ["Test certificates", "Performance ratio calculation", "Handover documentation", "All of the above"],
    correct: 3,
    explanation: "Complete documentation including test certificates, performance calculations, and handover documents is required."
  },

  // Module 7: Maintenance and Troubleshooting
  {
    id: 31,
    question: "How often should solar panels be visually inspected?",
    options: ["Monthly", "Quarterly", "Annually", "Every 2 years"],
    correct: 2,
    explanation: "Annual visual inspections are recommended for residential solar installations."
  },
  {
    id: 32,
    question: "What is the most common cause of reduced solar panel performance?",
    options: ["Inverter failure", "Soiling and debris", "Module degradation", "Shading"],
    correct: 1,
    explanation: "Soiling and debris accumulation is the most common cause of performance reduction."
  },
  {
    id: 33,
    question: "What is the typical lifespan of a solar inverter?",
    options: ["5-8 years", "8-12 years", "12-15 years", "20-25 years"],
    correct: 2,
    explanation: "Solar inverters typically last 12-15 years, shorter than the 25-year panel warranty."
  },
  {
    id: 34,
    question: "What should be checked during routine maintenance?",
    options: ["DC connections", "AC connections", "Monitoring system", "All of the above"],
    correct: 3,
    explanation: "Comprehensive maintenance includes checking all electrical connections and monitoring systems."
  },
  {
    id: 35,
    question: "What is the recommended cleaning frequency for solar panels in urban areas?",
    options: ["Monthly", "Quarterly", "Twice yearly", "Annually"],
    correct: 2,
    explanation: "Urban installations typically benefit from cleaning twice yearly due to pollution and debris."
  },

  // Module 8: Energy Storage
  {
    id: 36,
    question: "What is the most common battery technology for residential solar storage?",
    options: ["Lead-acid", "Lithium-ion", "Nickel-metal hydride", "Flow batteries"],
    correct: 1,
    explanation: "Lithium-ion batteries are the most common choice for residential solar storage due to efficiency and lifespan."
  },
  {
    id: 37,
    question: "What is the typical depth of discharge for lithium-ion batteries?",
    options: ["50%", "70%", "90%", "100%"],
    correct: 2,
    explanation: "Lithium-ion batteries can typically discharge to 90% depth without significant degradation."
  },
  {
    id: 38,
    question: "What does round-trip efficiency measure in battery systems?",
    options: ["Charging speed", "Energy lost in charge/discharge cycle", "Battery lifespan", "Capacity retention"],
    correct: 1,
    explanation: "Round-trip efficiency measures the energy lost during the complete charge and discharge cycle."
  },
  {
    id: 39,
    question: "What is the typical round-trip efficiency of lithium-ion batteries?",
    options: ["75-80%", "85-90%", "90-95%", "95-98%"],
    correct: 2,
    explanation: "Modern lithium-ion batteries achieve 90-95% round-trip efficiency."
  },
  {
    id: 40,
    question: "What safety considerations are important for battery installations?",
    options: ["Ventilation", "Temperature control", "Fire suppression", "All of the above"],
    correct: 3,
    explanation: "All safety aspects including ventilation, temperature control, and fire suppression are crucial."
  },

  // Module 9: Financial Considerations
  {
    id: 41,
    question: "What does SEG stand for?",
    options: ["Solar Energy Grant", "Smart Export Guarantee", "Sustainable Energy Generation", "Small Energy Generator"],
    correct: 1,
    explanation: "SEG stands for Smart Export Guarantee, the current export payment scheme in the UK."
  },
  {
    id: 42,
    question: "What is the typical payback period for a domestic solar installation?",
    options: ["3-5 years", "7-12 years", "15-20 years", "25+ years"],
    correct: 1,
    explanation: "Domestic solar installations typically have payback periods of 7-12 years."
  },
  {
    id: 43,
    question: "What VAT rate applies to domestic solar installations under 10kW?",
    options: ["0%", "5%", "20%", "Variable"],
    correct: 0,
    explanation: "Domestic solar installations under 10kW qualify for 0% VAT since April 2022."
  },
  {
    id: 44,
    question: "What is the main financial benefit of commercial solar installations?",
    options: ["Higher SEG rates", "VAT exemption", "Better self-consumption rates", "Government grants"],
    correct: 2,
    explanation: "Commercial installations benefit from better self-consumption rates due to daytime energy demand."
  },
  {
    id: 45,
    question: "What does IRR stand for in financial analysis?",
    options: ["Initial Rate of Return", "Internal Rate of Return", "Investment Risk Ratio", "Income Reduction Rate"],
    correct: 1,
    explanation: "IRR stands for Internal Rate of Return, a key metric for investment evaluation."
  },

  // Additional questions covering various topics
  {
    id: 46,
    question: "What is the standard test condition (STC) irradiance for solar panel rating?",
    options: ["800 W/m²", "1000 W/m²", "1200 W/m²", "1500 W/m²"],
    correct: 1,
    explanation: "Standard Test Conditions use 1000 W/m² irradiance at 25°C cell temperature."
  },
  {
    id: 47,
    question: "What is the temperature coefficient impact on solar panel performance?",
    options: ["Performance increases with temperature", "Performance decreases with temperature", "No impact", "Variable impact"],
    correct: 1,
    explanation: "Solar panel performance typically decreases as temperature increases, around -0.4%/°C."
  },
  {
    id: 48,
    question: "What is the minimum roof loading capacity required for solar panels?",
    options: ["35 kg/m²", "50 kg/m²", "75 kg/m²", "100 kg/m²"],
    correct: 1,
    explanation: "Most installations require a minimum roof loading capacity of 50 kg/m² including snow loads."
  },
  {
    id: 49,
    question: "What is bypass diode function in solar panels?",
    options: ["Voltage regulation", "Current limiting", "Bypass shaded cells", "Overvoltage protection"],
    correct: 2,
    explanation: "Bypass diodes allow current to bypass shaded or damaged cells, preventing hot spots."
  },
  {
    id: 50,
    question: "What is the typical warranty period for solar panels?",
    options: ["10 years", "15 years", "20 years", "25 years"],
    correct: 3,
    explanation: "Most solar panels come with 25-year performance warranties."
  },

  // Module completion questions 51-100 covering all aspects
  {
    id: 51,
    question: "What is the difference between grid-tied and off-grid solar systems?",
    options: ["Battery requirement", "Grid connection", "Component sizing", "All of the above"],
    correct: 3,
    explanation: "Grid-tied and off-grid systems differ in battery requirements, grid connection, and component sizing."
  },
  {
    id: 52,
    question: "What is maximum power point tracking (MPPT)?",
    options: ["Safety feature", "Efficiency optimization", "Grid synchronization", "Temperature control"],
    correct: 1,
    explanation: "MPPT optimizes the operating point to extract maximum power from solar panels."
  },
  {
    id: 53,
    question: "What causes potential induced degradation (PID) in solar panels?",
    options: ["High temperatures", "Voltage stress", "UV exposure", "Mechanical stress"],
    correct: 1,
    explanation: "PID is caused by high voltage stress between the solar cell and frame."
  },
  {
    id: 54,
    question: "What is the purpose of DC isolators in solar installations?",
    options: ["Voltage regulation", "Safety disconnection", "Current limiting", "Ground fault protection"],
    correct: 1,
    explanation: "DC isolators provide safe disconnection points for maintenance and emergency situations."
  },
  {
    id: 55,
    question: "What is the typical efficiency of modern string inverters?",
    options: ["85-90%", "90-95%", "95-98%", "98-99%"],
    correct: 2,
    explanation: "Modern string inverters typically achieve 95-98% efficiency."
  },
  {
    id: 56,
    question: "What is the recommended cable size for a 4kW solar installation?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correct: 2,
    explanation: "4mm² cable is typically recommended for 4kW installations to handle current and voltage drop."
  },
  {
    id: 57,
    question: "What is the main advantage of bifacial solar panels?",
    options: ["Lower cost", "Higher efficiency", "Both sides generate power", "Better aesthetics"],
    correct: 2,
    explanation: "Bifacial panels can generate power from both front and rear surfaces, increasing total output."
  },
  {
    id: 58,
    question: "What is the typical string voltage range for residential inverters?",
    options: ["150-400V", "200-600V", "300-800V", "400-1000V"],
    correct: 1,
    explanation: "Residential inverters typically operate in the 200-600V DC input range."
  },
  {
    id: 59,
    question: "What is the purpose of earthing in solar installations?",
    options: ["Improve efficiency", "Safety protection", "Reduce noise", "Extend lifespan"],
    correct: 1,
    explanation: "Earthing provides essential safety protection against electric shock and fault conditions."
  },
  {
    id: 60,
    question: "What is the typical peak sun hours in London?",
    options: ["2.5-3 hours", "3.5-4 hours", "4.5-5 hours", "5.5-6 hours"],
    correct: 1,
    explanation: "London typically receives 2.5-3 peak sun hours annually on average."
  },
  {
    id: 61,
    question: "What is the purpose of performance monitoring in solar systems?",
    options: ["Legal requirement", "Fault detection", "Warranty compliance", "All of the above"],
    correct: 3,
    explanation: "Monitoring serves legal, technical, and commercial purposes for solar installations."
  },
  {
    id: 62,
    question: "What is the typical degradation pattern of solar panels?",
    options: ["Linear decline", "Exponential decline", "Step function", "Random variation"],
    correct: 0,
    explanation: "Solar panels typically show linear degradation over their lifetime."
  },
  {
    id: 63,
    question: "What is the minimum ground clearance for solar panel installations?",
    options: ["0.5m", "0.8m", "1.0m", "1.2m"],
    correct: 1,
    explanation: "Minimum ground clearance of 0.8m is typically required for safety and maintenance access."
  },
  {
    id: 64,
    question: "What is the purpose of module-level power electronics (MLPE)?",
    options: ["Cost reduction", "Performance optimization", "Safety improvement", "Both B and C"],
    correct: 3,
    explanation: "MLPE improves both performance optimization and safety through module-level control."
  },
  {
    id: 65,
    question: "What is the typical voltage drop limit for DC cabling?",
    options: ["1%", "2%", "3%", "5%"],
    correct: 1,
    explanation: "DC voltage drop should typically be limited to 2% to maintain system efficiency."
  },
  {
    id: 66,
    question: "What is the main consideration for inverter placement?",
    options: ["Aesthetics", "Accessibility", "Temperature", "All of the above"],
    correct: 3,
    explanation: "Inverter placement must consider aesthetics, accessibility for maintenance, and temperature control."
  },
  {
    id: 67,
    question: "What is the typical lifespan of a solar PV system?",
    options: ["15-20 years", "20-25 years", "25-30 years", "30+ years"],
    correct: 2,
    explanation: "Solar PV systems typically have operational lifespans of 25-30 years or more."
  },
  {
    id: 68,
    question: "What is the purpose of arc fault detection in solar systems?",
    options: ["Efficiency improvement", "Fire prevention", "Performance monitoring", "Cost reduction"],
    correct: 1,
    explanation: "Arc fault detection prevents fires by detecting dangerous electrical arcs."
  },
  {
    id: 69,
    question: "What is the typical capacity factor for solar PV in the UK?",
    options: ["8-12%", "12-16%", "16-20%", "20-24%"],
    correct: 1,
    explanation: "UK solar PV typically achieves capacity factors of 12-16% depending on location and system design."
  },
  {
    id: 70,
    question: "What is the main benefit of string monitoring?",
    options: ["Higher efficiency", "Fault detection", "Cost reduction", "Easier installation"],
    correct: 1,
    explanation: "String monitoring enables rapid fault detection and system optimization."
  },
  {
    id: 71,
    question: "What is the typical AC cable size for connecting inverters?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correct: 1,
    explanation: "2.5mm² cable is typically used for AC connections from residential inverters."
  },
  {
    id: 72,
    question: "What is the purpose of generation meters in solar installations?",
    options: ["Legal requirement", "Performance monitoring", "Export measurement", "All of the above"],
    correct: 3,
    explanation: "Generation meters serve legal, monitoring, and commercial purposes."
  },
  {
    id: 73,
    question: "What is the typical operating temperature range for solar panels?",
    options: ["-20°C to +60°C", "-40°C to +85°C", "-10°C to +80°C", "0°C to +70°C"],
    correct: 1,
    explanation: "Solar panels typically operate in the range -40°C to +85°C."
  },
  {
    id: 74,
    question: "What is the main advantage of distributed generation?",
    options: ["Lower costs", "Reduced transmission losses", "Easier maintenance", "Higher efficiency"],
    correct: 1,
    explanation: "Distributed generation reduces transmission losses by generating power close to consumption."
  },
  {
    id: 75,
    question: "What is the purpose of power factor correction in solar systems?",
    options: ["Improve efficiency", "Grid stability", "Reduce costs", "Safety improvement"],
    correct: 1,
    explanation: "Power factor correction improves grid stability and reduces reactive power demand."
  },
  {
    id: 76,
    question: "What is the typical mounting system load rating?",
    options: ["1.5 kN/m²", "2.4 kN/m²", "3.6 kN/m²", "4.8 kN/m²"],
    correct: 1,
    explanation: "Mounting systems typically need to handle 2.4 kN/m² wind and snow loads."
  },
  {
    id: 77,
    question: "What is the main consideration for cable routing in solar installations?",
    options: ["Cost minimization", "Safety and aesthetics", "Ease of installation", "Performance optimization"],
    correct: 1,
    explanation: "Cable routing must prioritize safety and aesthetics while maintaining performance."
  },
  {
    id: 78,
    question: "What is the typical efficiency loss due to inverter aging?",
    options: ["0.1% per year", "0.5% per year", "1.0% per year", "2.0% per year"],
    correct: 1,
    explanation: "Inverters typically degrade at approximately 0.5% per year."
  },
  {
    id: 79,
    question: "What is the purpose of surge protection devices (SPDs) in solar systems?",
    options: ["Voltage regulation", "Lightning protection", "Current limiting", "Ground fault protection"],
    correct: 1,
    explanation: "SPDs protect against voltage surges from lightning and switching events."
  },
  {
    id: 80,
    question: "What is the typical string size for residential installations?",
    options: ["6-8 panels", "8-12 panels", "12-16 panels", "16-20 panels"],
    correct: 1,
    explanation: "Residential strings typically contain 8-12 panels depending on inverter specifications."
  },
  {
    id: 81,
    question: "What is the main factor affecting solar panel orientation?",
    options: ["Roof structure", "Solar irradiance", "Wind direction", "Aesthetic preferences"],
    correct: 1,
    explanation: "Solar irradiance is the primary factor determining optimal panel orientation."
  },
  {
    id: 82,
    question: "What is the typical commissioning period for solar installations?",
    options: ["1-2 days", "3-5 days", "1 week", "2 weeks"],
    correct: 0,
    explanation: "Most residential solar installations can be commissioned within 1-2 days."
  },
  {
    id: 83,
    question: "What is the purpose of module grounding in solar arrays?",
    options: ["Performance improvement", "Safety protection", "EMC compliance", "All of the above"],
    correct: 3,
    explanation: "Module grounding serves safety, performance, and electromagnetic compatibility purposes."
  },
  {
    id: 84,
    question: "What is the typical power tolerance of solar panels?",
    options: ["±1%", "±3%", "±5%", "±10%"],
    correct: 2,
    explanation: "Solar panels typically have power tolerance of ±5% from rated output."
  },
  {
    id: 85,
    question: "What is the main benefit of smart inverters?",
    options: ["Lower cost", "Grid support functions", "Higher efficiency", "Easier installation"],
    correct: 1,
    explanation: "Smart inverters provide grid support functions like voltage regulation and frequency response."
  },
  {
    id: 86,
    question: "What is the typical maintenance cost for solar systems?",
    options: ["0.5-1% of initial cost per year", "1-2% of initial cost per year", "2-3% of initial cost per year", "3-5% of initial cost per year"],
    correct: 0,
    explanation: "Solar system maintenance typically costs 0.5-1% of initial installation cost annually."
  },
  {
    id: 87,
    question: "What is the purpose of combiner boxes in solar arrays?",
    options: ["Voltage regulation", "String consolidation", "Safety isolation", "Performance monitoring"],
    correct: 1,
    explanation: "Combiner boxes consolidate multiple strings into fewer circuits for easier management."
  },
  {
    id: 88,
    question: "What is the typical wind speed rating for solar panels?",
    options: ["120 km/h", "150 km/h", "180 km/h", "200 km/h"],
    correct: 3,
    explanation: "Solar panels are typically rated for wind speeds up to 200 km/h (55 m/s)."
  },
  {
    id: 89,
    question: "What is the main consideration for battery sizing in solar systems?",
    options: ["Daily energy consumption", "Peak power demand", "Backup duration required", "All of the above"],
    correct: 3,
    explanation: "Battery sizing must consider daily consumption, peak demand, and required backup duration."
  },
  {
    id: 90,
    question: "What is the typical efficiency of charge controllers?",
    options: ["85-90%", "90-95%", "95-98%", "98-99%"],
    correct: 2,
    explanation: "Modern MPPT charge controllers typically achieve 95-98% efficiency."
  },
  {
    id: 91,
    question: "What is the purpose of isolation monitoring in solar systems?",
    options: ["Performance tracking", "Safety verification", "Grid compliance", "All of the above"],
    correct: 3,
    explanation: "Isolation monitoring serves safety, performance, and compliance purposes."
  },
  {
    id: 92,
    question: "What is the typical cable ampacity for 4mm² DC cable?",
    options: ["25A", "32A", "40A", "50A"],
    correct: 1,
    explanation: "4mm² DC cable typically has an ampacity of approximately 32A."
  },
  {
    id: 93,
    question: "What is the main benefit of distributed MPPT?",
    options: ["Lower cost", "Individual panel optimization", "Easier installation", "Higher reliability"],
    correct: 1,
    explanation: "Distributed MPPT allows individual panel optimization, improving overall system performance."
  },
  {
    id: 94,
    question: "What is the typical return on investment (ROI) for solar installations?",
    options: ["5-8%", "8-12%", "12-16%", "16-20%"],
    correct: 1,
    explanation: "Solar installations typically achieve ROI of 8-12% over their lifetime."
  },
  {
    id: 95,
    question: "What is the purpose of performance ratios in solar systems?",
    options: ["Cost analysis", "System comparison", "Fault detection", "All of the above"],
    correct: 3,
    explanation: "Performance ratios are used for cost analysis, system comparison, and fault detection."
  },
  {
    id: 96,
    question: "What is the typical specific yield for solar systems in the UK?",
    options: ["600-800 kWh/kWp", "800-1000 kWh/kWp", "1000-1200 kWh/kWp", "1200-1400 kWh/kWp"],
    correct: 1,
    explanation: "UK solar systems typically achieve specific yields of 800-1000 kWh/kWp annually."
  },
  {
    id: 97,
    question: "What is the main advantage of rail-less mounting systems?",
    options: ["Lower cost", "Faster installation", "Better aesthetics", "All of the above"],
    correct: 3,
    explanation: "Rail-less systems offer cost, installation time, and aesthetic advantages."
  },
  {
    id: 98,
    question: "What is the purpose of data logging in solar monitoring?",
    options: ["Performance tracking", "Fault diagnosis", "Warranty compliance", "All of the above"],
    correct: 3,
    explanation: "Data logging supports performance tracking, fault diagnosis, and warranty requirements."
  },
  {
    id: 99,
    question: "What is the typical carbon payback time for solar panels?",
    options: ["6 months", "1-2 years", "3-4 years", "5-6 years"],
    correct: 1,
    explanation: "Modern solar panels typically have carbon payback times of 1-2 years."
  },
  {
    id: 100,
    question: "What is the most important factor for long-term solar system performance?",
    options: ["Initial efficiency", "Quality components", "Regular maintenance", "All of the above"],
    correct: 3,
    explanation: "Long-term performance depends on initial efficiency, quality components, and regular maintenance."
  },
  
  // Additional Advanced Questions (101-200)
  {
    id: 101,
    question: "What is the maximum allowable fault ride-through time for a Type B renewable energy system under G99?",
    options: ["0.14 seconds", "0.5 seconds", "1.5 seconds", "3 seconds"],
    correct: 0,
    explanation: "Type B systems must remain connected for faults lasting up to 0.14 seconds under G99 requirements."
  },
  {
    id: 102,
    question: "Which battery chemistry typically offers the longest cycle life for grid-scale energy storage?",
    options: ["Lithium-ion", "Lead-acid", "Sodium-sulfur", "Lithium iron phosphate (LiFePO4)"],
    correct: 3,
    explanation: "LiFePO4 batteries typically offer the longest cycle life, often exceeding 6,000 cycles."
  },
  {
    id: 103,
    question: "What is the primary advantage of microinverters over string inverters in solar PV systems?",
    options: ["Lower cost", "Higher efficiency", "Module-level monitoring", "Simplified installation"],
    correct: 2,
    explanation: "Microinverters provide module-level monitoring and optimization, reducing the impact of shading on individual panels."
  },
  {
    id: 104,
    question: "In wind energy, what does the term 'capacity factor' represent?",
    options: ["Maximum power output", "Actual energy output vs theoretical maximum", "Wind speed at rated power", "Turbine availability"],
    correct: 1,
    explanation: "Capacity factor is the ratio of actual energy output to the theoretical maximum if operating at rated power continuously."
  },
  {
    id: 105,
    question: "What is the typical depth of discharge (DoD) recommendation for lead-acid batteries to maximize lifespan?",
    options: ["90%", "80%", "50%", "20%"],
    correct: 2,
    explanation: "Lead-acid batteries should typically not be discharged below 50% to maximize their operational lifespan."
  },
  {
    id: 106,
    question: "Which renewable energy technology has the fastest deployment time from planning to operation?",
    options: ["Offshore wind", "Hydroelectric", "Solar PV", "Biomass"],
    correct: 2,
    explanation: "Solar PV systems typically have the fastest deployment time, often completed within months rather than years."
  },
  {
    id: 107,
    question: "What is the primary purpose of a solar irradiance sensor in a PV monitoring system?",
    options: ["Measure temperature", "Calculate performance ratio", "Monitor inverter efficiency", "Detect faults"],
    correct: 1,
    explanation: "Irradiance sensors help calculate the performance ratio by comparing actual output to expected output based on available solar energy."
  },
  {
    id: 108,
    question: "In a grid-tied solar system, what happens during a power outage without battery backup?",
    options: ["System continues operating", "System shuts down for safety", "System operates at reduced capacity", "Only emergency loads are powered"],
    correct: 1,
    explanation: "Grid-tied systems without battery backup must shut down during outages to prevent feeding power into potentially unsafe grid conditions."
  },
  {
    id: 109,
    question: "What is the typical efficiency range for modern crystalline silicon solar panels?",
    options: ["10-15%", "15-20%", "20-25%", "25-30%"],
    correct: 2,
    explanation: "Modern crystalline silicon solar panels typically achieve efficiencies between 20-25% under standard test conditions."
  },
  {
    id: 110,
    question: "Which factor most significantly affects wind turbine power output?",
    options: ["Air density", "Wind speed", "Temperature", "Humidity"],
    correct: 1,
    explanation: "Wind speed has the most significant impact on power output, with power proportional to the cube of wind speed."
  },
  {
    id: 111,
    question: "What is the main advantage of bifacial solar panels?",
    options: ["Lower cost", "Higher efficiency", "Capture light from both sides", "Better durability"],
    correct: 2,
    explanation: "Bifacial panels can capture sunlight from both front and rear surfaces, increasing total energy generation."
  },
  {
    id: 112,
    question: "In energy storage systems, what does 'round-trip efficiency' measure?",
    options: ["Charging speed", "Energy retained during storage and discharge", "Maximum capacity", "Cycle life"],
    correct: 1,
    explanation: "Round-trip efficiency measures the percentage of energy that can be retrieved from a storage system compared to what was stored."
  },
  {
    id: 113,
    question: "What is the primary environmental concern with lithium-ion battery disposal?",
    options: ["Carbon emissions", "Toxic metal contamination", "Radiation exposure", "Plastic waste"],
    correct: 1,
    explanation: "Lithium-ion batteries contain toxic metals like cobalt and nickel that can contaminate soil and water if not properly recycled."
  },
  {
    id: 114,
    question: "Which wind turbine design is most common for utility-scale installations?",
    options: ["Vertical axis", "Horizontal axis with upwind rotor", "Horizontal axis with downwind rotor", "Darrieus turbine"],
    correct: 1,
    explanation: "Horizontal axis turbines with upwind rotors are the most common design for utility-scale wind installations."
  },
  {
    id: 115,
    question: "What is the typical operating temperature range for lithium-ion batteries?",
    options: ["-20°C to 60°C", "-10°C to 45°C", "0°C to 35°C", "10°C to 25°C"],
    correct: 1,
    explanation: "Most lithium-ion batteries operate safely between -10°C to 45°C, with optimal performance around 15-25°C."
  },
  {
    id: 116,
    question: "In solar PV systems, what does 'Maximum Power Point Tracking' (MPPT) optimize?",
    options: ["System voltage", "Power extraction from panels", "Battery charging", "Grid synchronization"],
    correct: 1,
    explanation: "MPPT controllers optimize the operating point of solar panels to extract maximum available power under varying conditions."
  },
  {
    id: 117,
    question: "What is the primary advantage of distributed generation over centralized power plants?",
    options: ["Lower costs", "Reduced transmission losses", "Higher efficiency", "Easier maintenance"],
    correct: 1,
    explanation: "Distributed generation reduces transmission losses by generating power closer to where it's consumed."
  },
  {
    id: 118,
    question: "Which type of solar tracking system provides the highest energy gain?",
    options: ["Fixed tilt", "Single-axis tracking", "Dual-axis tracking", "Seasonal adjustment"],
    correct: 2,
    explanation: "Dual-axis tracking systems provide the highest energy gain by following the sun's path throughout the day and seasons."
  },
  {
    id: 119,
    question: "What is the typical lifespan of a wind turbine gearbox?",
    options: ["5-10 years", "10-15 years", "15-20 years", "20-25 years"],
    correct: 2,
    explanation: "Wind turbine gearboxes typically last 15-20 years, though they may require maintenance or replacement during this period."
  },
  {
    id: 120,
    question: "In grid-scale battery storage, what is the primary purpose of the Battery Management System (BMS)?",
    options: ["Power conversion", "Safety monitoring and control", "Grid synchronization", "Energy forecasting"],
    correct: 1,
    explanation: "The BMS monitors cell voltages, temperatures, and currents to ensure safe operation and optimize battery performance."
  },
  {
    id: 121,
    question: "What is the main challenge with integrating high levels of renewable energy into the grid?",
    options: ["High costs", "Environmental impact", "Intermittency and variability", "Technology limitations"],
    correct: 2,
    explanation: "The intermittent and variable nature of renewable sources creates challenges for grid stability and reliability."
  },
  {
    id: 122,
    question: "Which material is commonly used for the absorber layer in thin-film solar cells?",
    options: ["Silicon", "Cadmium telluride", "Gallium arsenide", "Indium phosphide"],
    correct: 1,
    explanation: "Cadmium telluride (CdTe) is one of the most common materials used in commercial thin-film solar cells."
  },
  {
    id: 123,
    question: "What is the primary function of a grid-forming inverter?",
    options: ["Convert DC to AC", "Provide grid stability", "Maximize efficiency", "Monitor performance"],
    correct: 1,
    explanation: "Grid-forming inverters can establish and maintain grid voltage and frequency, providing stability services."
  },
  {
    id: 124,
    question: "In wind energy, what does 'wake effect' refer to?",
    options: ["Turbine startup sequence", "Reduced wind speed behind turbines", "Noise generation", "Visual impact"],
    correct: 1,
    explanation: "Wake effect refers to the reduction in wind speed and increased turbulence downwind of operating turbines."
  },
  {
    id: 125,
    question: "What is the typical efficiency of a modern wind turbine?",
    options: ["25-35%", "35-45%", "45-55%", "55-65%"],
    correct: 1,
    explanation: "Modern wind turbines typically achieve efficiencies of 35-45% of the theoretical maximum (Betz limit)."
  },
  {
    id: 126,
    question: "Which factor determines the cut-in wind speed of a wind turbine?",
    options: ["Blade design", "Generator type", "Tower height", "All of the above"],
    correct: 3,
    explanation: "Cut-in wind speed is determined by blade aerodynamics, generator characteristics, and overall turbine design."
  },
  {
    id: 127,
    question: "What is the primary advantage of perovskite solar cells?",
    options: ["Low cost potential", "High efficiency", "Easy manufacturing", "All of the above"],
    correct: 3,
    explanation: "Perovskite solar cells offer potential for low-cost manufacturing, high efficiency, and simple production processes."
  },
  {
    id: 128,
    question: "In energy storage, what does 'calendar life' refer to?",
    options: ["Daily cycling capability", "Time-based degradation", "Seasonal performance", "Manufacturing date"],
    correct: 1,
    explanation: "Calendar life refers to the degradation of battery performance over time, regardless of usage patterns."
  },
  {
    id: 129,
    question: "What is the main purpose of a solar inverter's anti-islanding protection?",
    options: ["Prevent overcharging", "Ensure grid safety", "Maximize efficiency", "Monitor performance"],
    correct: 1,
    explanation: "Anti-islanding protection prevents the inverter from energizing a disconnected grid section, protecting utility workers."
  },
  {
    id: 130,
    question: "Which renewable energy source has the highest capacity factor globally?",
    options: ["Solar PV", "Onshore wind", "Offshore wind", "Hydroelectric"],
    correct: 3,
    explanation: "Hydroelectric power typically has the highest capacity factor, often exceeding 40-50% due to consistent water flow."
  },
  {
    id: 131,
    question: "What is the primary benefit of using power optimizers in solar PV systems?",
    options: ["Lower cost", "Module-level MPPT", "Simplified wiring", "Higher voltage"],
    correct: 1,
    explanation: "Power optimizers provide module-level MPPT, reducing the impact of shading and module mismatch on system performance."
  },
  {
    id: 132,
    question: "In wind turbine design, what is the purpose of pitch control?",
    options: ["Control rotational speed", "Optimize power output", "Protect against high winds", "All of the above"],
    correct: 3,
    explanation: "Pitch control adjusts blade angle to control speed, optimize power, and protect the turbine in high wind conditions."
  },
  {
    id: 133,
    question: "What is the typical round-trip efficiency of pumped hydro storage?",
    options: ["60-70%", "70-80%", "80-90%", "90-95%"],
    correct: 2,
    explanation: "Pumped hydro storage systems typically achieve round-trip efficiencies of 80-90%."
  },
  {
    id: 134,
    question: "Which solar cell technology currently holds the world record for efficiency?",
    options: ["Crystalline silicon", "Thin-film", "Perovskite", "Multi-junction concentrator"],
    correct: 3,
    explanation: "Multi-junction concentrator cells hold the world record for solar cell efficiency, exceeding 47%."
  },
  {
    id: 135,
    question: "What is the main advantage of vertical axis wind turbines?",
    options: ["Higher efficiency", "Lower cost", "Omnidirectional operation", "Better grid integration"],
    correct: 2,
    explanation: "Vertical axis turbines can capture wind from any direction without needing to orient themselves into the wind."
  },
  {
    id: 136,
    question: "In battery energy storage systems, what does 'C-rate' measure?",
    options: ["Capacity", "Charging/discharging speed", "Cost", "Cycle life"],
    correct: 1,
    explanation: "C-rate indicates how fast a battery charges or discharges relative to its capacity (1C = full capacity in 1 hour)."
  },
  {
    id: 137,
    question: "What is the primary challenge with offshore wind development?",
    options: ["Lower wind speeds", "High installation costs", "Environmental impact", "Grid connection"],
    correct: 1,
    explanation: "Offshore wind installations have significantly higher costs due to marine construction, specialized equipment, and logistics."
  },
  {
    id: 138,
    question: "Which factor most affects the degradation rate of solar panels?",
    options: ["Temperature cycling", "UV exposure", "Humidity", "All of the above"],
    correct: 3,
    explanation: "Solar panel degradation is influenced by temperature cycling, UV exposure, humidity, and other environmental factors."
  },
  {
    id: 139,
    question: "What is the typical degradation rate of crystalline silicon solar panels per year?",
    options: ["0.1-0.3%", "0.3-0.5%", "0.5-0.8%", "0.8-1.0%"],
    correct: 0,
    explanation: "High-quality crystalline silicon panels typically degrade at 0.1-0.3% per year under normal conditions."
  },
  {
    id: 140,
    question: "In grid-connected renewable systems, what does 'firm capacity' refer to?",
    options: ["Maximum output", "Guaranteed available power", "Storage capacity", "Grid connection capacity"],
    correct: 1,
    explanation: "Firm capacity is the amount of power a renewable source can reliably deliver during peak demand periods."
  },
  {
    id: 141,
    question: "What is the main purpose of a solar irradiance forecasting system?",
    options: ["Optimize panel orientation", "Predict maintenance needs", "Enable grid planning", "Calculate ROI"],
    correct: 2,
    explanation: "Irradiance forecasting helps grid operators plan for variable solar output and optimize system operations."
  },
  {
    id: 142,
    question: "Which type of wind measurement is most important for wind resource assessment?",
    options: ["Average wind speed", "Wind speed distribution", "Maximum wind speed", "Wind direction"],
    correct: 1,
    explanation: "Wind speed distribution (Weibull distribution) is crucial for accurately predicting energy production."
  },
  {
    id: 143,
    question: "What is the primary advantage of using silicon heterojunction (HJT) solar cells?",
    options: ["Lower cost", "Higher efficiency and temperature coefficient", "Simpler manufacturing", "Better durability"],
    correct: 1,
    explanation: "HJT cells offer higher efficiency and better temperature coefficients compared to conventional silicon cells."
  },
  {
    id: 144,
    question: "In energy storage economics, what does 'levelized cost of storage' (LCOS) represent?",
    options: ["Installation cost", "Operating cost", "Total lifetime cost per kWh", "Replacement cost"],
    correct: 2,
    explanation: "LCOS represents the total cost of a storage system divided by the total energy delivered over its lifetime."
  },
  {
    id: 145,
    question: "What is the typical hub height for modern utility-scale wind turbines?",
    options: ["50-80 meters", "80-120 meters", "120-160 meters", "160-200 meters"],
    correct: 2,
    explanation: "Modern utility-scale wind turbines typically have hub heights of 120-160 meters to access better wind resources."
  },
  {
    id: 146,
    question: "Which factor is most critical for the economic viability of solar PV projects?",
    options: ["Solar irradiance", "System cost", "Electricity prices", "All of the above"],
    correct: 3,
    explanation: "Solar irradiance, system costs, and electricity prices all significantly impact the economic viability of solar projects."
  },
  {
    id: 147,
    question: "What is the main purpose of reactive power compensation in renewable energy systems?",
    options: ["Increase efficiency", "Improve power quality", "Reduce costs", "Enable storage"],
    correct: 1,
    explanation: "Reactive power compensation helps maintain voltage stability and improves overall power quality in the grid."
  },
  {
    id: 148,
    question: "In wind energy, what does 'power curve' represent?",
    options: ["Electrical output characteristics", "Wind speed vs. power output", "Efficiency over time", "Cost projections"],
    correct: 1,
    explanation: "A power curve shows the relationship between wind speed and the electrical power output of a wind turbine."
  },
  {
    id: 149,
    question: "What is the primary challenge with integrating battery storage at the distribution level?",
    options: ["High costs", "Technical complexity", "Grid stability impacts", "Regulatory barriers"],
    correct: 1,
    explanation: "Distribution-level battery storage requires sophisticated control systems to manage local grid stability and power quality."
  },
  {
    id: 150,
    question: "Which renewable energy technology has shown the steepest cost reduction over the past decade?",
    options: ["Solar PV", "Onshore wind", "Offshore wind", "Battery storage"],
    correct: 0,
    explanation: "Solar PV has experienced the steepest cost reductions, with prices falling by over 80% in the past decade."
  },
  {
    id: 151,
    question: "What is the typical energy density of lithium-ion batteries compared to lead-acid?",
    options: ["2-3 times higher", "3-5 times higher", "5-7 times higher", "7-10 times higher"],
    correct: 1,
    explanation: "Lithium-ion batteries typically have 3-5 times higher energy density than lead-acid batteries."
  },
  {
    id: 152,
    question: "In solar thermal systems, what is the purpose of thermal mass?",
    options: ["Increase efficiency", "Store thermal energy", "Improve durability", "Reduce costs"],
    correct: 1,
    explanation: "Thermal mass stores heat energy, allowing the system to provide heating even when solar input is not available."
  },
  {
    id: 153,
    question: "What is the main benefit of floating solar (floatovoltaics) installations?",
    options: ["Lower costs", "Higher efficiency due to cooling", "Land preservation", "All of the above"],
    correct: 3,
    explanation: "Floating solar offers cost benefits, efficiency gains from water cooling, and preserves valuable land resources."
  },
  {
    id: 154,
    question: "Which grid service can renewable energy systems with storage provide most effectively?",
    options: ["Base load power", "Frequency regulation", "Black start capability", "Voltage support"],
    correct: 1,
    explanation: "Battery storage systems excel at frequency regulation due to their fast response times and precise control."
  },
  {
    id: 155,
    question: "What is the typical capacity factor for solar PV in the UK?",
    options: ["8-12%", "12-16%", "16-20%", "20-25%"],
    correct: 1,
    explanation: "Solar PV systems in the UK typically achieve capacity factors of 12-16% due to the local climate conditions."
  },
  {
    id: 156,
    question: "In wind turbine maintenance, what is the most common cause of unplanned downtime?",
    options: ["Gearbox failure", "Generator issues", "Control system faults", "Blade damage"],
    correct: 2,
    explanation: "Control system faults are the most frequent cause of unplanned downtime, though they're often quickly resolved."
  },
  {
    id: 157,
    question: "What is the primary advantage of using artificial intelligence in renewable energy forecasting?",
    options: ["Lower costs", "Improved accuracy", "Faster processing", "Better visualization"],
    correct: 1,
    explanation: "AI and machine learning can significantly improve the accuracy of renewable energy production forecasts."
  },
  {
    id: 158,
    question: "Which factor most influences the siting of offshore wind farms?",
    options: ["Water depth", "Wind resource", "Grid connection", "All equally important"],
    correct: 3,
    explanation: "Water depth, wind resource quality, and grid connection distance are all critical factors in offshore wind siting."
  },
  {
    id: 159,
    question: "What is the typical efficiency loss due to soiling on solar panels in the UK?",
    options: ["1-3%", "3-5%", "5-8%", "8-12%"],
    correct: 0,
    explanation: "In the UK's relatively clean environment, soiling typically causes 1-3% efficiency loss for solar panels."
  },
  {
    id: 160,
    question: "In battery storage systems, what does 'state of charge' (SOC) indicate?",
    options: ["Charging rate", "Available capacity remaining", "Health status", "Temperature"],
    correct: 1,
    explanation: "State of charge indicates the percentage of available capacity remaining in the battery."
  },
  {
    id: 161,
    question: "What is the main environmental concern with large-scale solar installations?",
    options: ["Water usage", "Land use", "Waste heat", "Electromagnetic fields"],
    correct: 1,
    explanation: "Land use is the primary environmental concern for utility-scale solar installations, though impacts can be minimized."
  },
  {
    id: 162,
    question: "Which wind turbine component typically requires the most frequent maintenance?",
    options: ["Blades", "Gearbox", "Generator", "Yaw system"],
    correct: 3,
    explanation: "The yaw system requires frequent maintenance due to its continuous operation to orient the turbine into the wind."
  },
  {
    id: 163,
    question: "What is the primary purpose of a solar combiner box?",
    options: ["Convert DC to AC", "Combine multiple string circuits", "Provide grounding", "Monitor performance"],
    correct: 1,
    explanation: "Combiner boxes safely combine multiple DC string circuits from solar panels before sending power to the inverter."
  },
  {
    id: 164,
    question: "In energy storage, what does 'depth of discharge' affect most significantly?",
    options: ["Efficiency", "Cycle life", "Power output", "Charging speed"],
    correct: 1,
    explanation: "Depth of discharge significantly affects battery cycle life, with deeper discharges generally reducing lifespan."
  },
  {
    id: 165,
    question: "What is the typical noise level of a modern wind turbine at 500 meters?",
    options: ["25-35 dB", "35-45 dB", "45-55 dB", "55-65 dB"],
    correct: 1,
    explanation: "Modern wind turbines typically produce noise levels of 35-45 dB at 500 meters, similar to a quiet library."
  },
  {
    id: 166,
    question: "Which solar panel technology performs best in low-light conditions?",
    options: ["Monocrystalline silicon", "Polycrystalline silicon", "Thin-film", "Concentrator PV"],
    correct: 2,
    explanation: "Thin-film solar panels typically perform better in low-light and diffuse light conditions."
  },
  {
    id: 167,
    question: "What is the main advantage of DC-coupled battery storage in solar systems?",
    options: ["Lower cost", "Higher efficiency", "Simpler design", "Better grid services"],
    correct: 1,
    explanation: "DC-coupled systems are more efficient because they avoid additional DC-AC-DC conversions."
  },
  {
    id: 168,
    question: "In wind energy economics, what does 'availability factor' measure?",
    options: ["Wind resource quality", "Turbine operational time", "Economic viability", "Grid connection"],
    correct: 1,
    explanation: "Availability factor measures the percentage of time a wind turbine is available for operation."
  },
  {
    id: 169,
    question: "What is the primary challenge with recycling solar panels?",
    options: ["High costs", "Technical complexity", "Hazardous materials", "All of the above"],
    correct: 3,
    explanation: "Solar panel recycling faces challenges from high costs, technical complexity, and handling of some hazardous materials."
  },
  {
    id: 170,
    question: "Which factor most affects the performance ratio of a solar PV system?",
    options: ["System design", "Component quality", "Environmental conditions", "All equally"],
    correct: 3,
    explanation: "System design, component quality, and environmental conditions all significantly impact the performance ratio."
  },
  {
    id: 171,
    question: "What is the typical warranty period for solar panel power output?",
    options: ["10 years", "15 years", "20-25 years", "30 years"],
    correct: 2,
    explanation: "Most solar panels come with 20-25 year power output warranties, guaranteeing performance over time."
  },
  {
    id: 172,
    question: "In wind turbine design, what is the purpose of a nacelle cover?",
    options: ["Aerodynamic efficiency", "Weather protection", "Noise reduction", "All of the above"],
    correct: 3,
    explanation: "The nacelle cover provides weather protection, contributes to aerodynamics, and helps reduce noise."
  },
  {
    id: 173,
    question: "What is the main benefit of using blockchain technology in renewable energy trading?",
    options: ["Lower costs", "Transparent transactions", "Faster processing", "Better security"],
    correct: 1,
    explanation: "Blockchain enables transparent, traceable transactions for renewable energy certificates and peer-to-peer trading."
  },
  {
    id: 174,
    question: "Which battery parameter is most important for grid frequency regulation services?",
    options: ["Energy capacity", "Power rating", "Efficiency", "Cycle life"],
    correct: 1,
    explanation: "Power rating (how fast the battery can respond) is most critical for frequency regulation services."
  },
  {
    id: 175,
    question: "What is the typical blade tip speed of modern wind turbines?",
    options: ["50-70 m/s", "70-90 m/s", "90-110 m/s", "110-130 m/s"],
    correct: 1,
    explanation: "Modern wind turbines typically operate with blade tip speeds of 70-90 m/s for optimal efficiency and noise control."
  },
  {
    id: 176,
    question: "In solar PV systems, what does 'clipping' refer to?",
    options: ["Panel mounting", "Inverter power limiting", "Wire management", "System grounding"],
    correct: 1,
    explanation: "Clipping occurs when solar panel output exceeds inverter capacity, causing the inverter to limit power."
  },
  {
    id: 177,
    question: "What is the primary driver for the growth of energy storage deployments?",
    options: ["Renewable integration", "Grid stability", "Cost reduction", "All of the above"],
    correct: 3,
    explanation: "Renewable integration needs, grid stability requirements, and decreasing costs all drive storage growth."
  },
  {
    id: 178,
    question: "Which wind measurement parameter is most critical for turbine design loads?",
    options: ["Average wind speed", "Turbulence intensity", "Wind shear", "Gust factors"],
    correct: 1,
    explanation: "Turbulence intensity is critical for determining structural loads and fatigue on wind turbine components."
  },
  {
    id: 179,
    question: "What is the main advantage of heterojunction solar cell technology?",
    options: ["Lower cost", "Higher efficiency and better temperature coefficient", "Simpler manufacturing", "Better durability"],
    correct: 1,
    explanation: "Heterojunction technology offers both higher efficiency and superior temperature coefficients."
  },
  {
    id: 180,
    question: "In battery energy storage, what does 'state of health' (SOH) measure?",
    options: ["Current capacity vs. rated capacity", "Temperature status", "Charging efficiency", "Safety condition"],
    correct: 0,
    explanation: "State of health compares the current maximum capacity to the original rated capacity of the battery."
  },
  {
    id: 181,
    question: "What is the typical capacity factor for offshore wind in the UK?",
    options: ["25-35%", "35-45%", "45-55%", "55-65%"],
    correct: 2,
    explanation: "UK offshore wind typically achieves capacity factors of 45-55% due to stronger, more consistent winds at sea."
  },
  {
    id: 182,
    question: "Which grid code requirement is most challenging for solar PV systems?",
    options: ["Voltage regulation", "Frequency response", "Fault ride-through", "Reactive power provision"],
    correct: 2,
    explanation: "Fault ride-through requirements are challenging for PV systems as they must remain connected during grid disturbances."
  },
  {
    id: 183,
    question: "What is the primary purpose of a solar tracker's backtracking feature?",
    options: ["Reduce energy consumption", "Avoid row shading", "Improve durability", "Simplify control"],
    correct: 1,
    explanation: "Backtracking prevents rows of trackers from shading each other during early morning and late afternoon."
  },
  {
    id: 184,
    question: "In wind energy, what does 'wind resource assessment' typically require?",
    options: ["6 months of data", "1 year of data", "2-3 years of data", "5+ years of data"],
    correct: 2,
    explanation: "Accurate wind resource assessment typically requires 2-3 years of on-site measurements to capture variability."
  },
  {
    id: 185,
    question: "What is the main environmental benefit of agrovoltaics (solar farming)?",
    options: ["Increased crop yields", "Reduced water usage", "Dual land use", "All of the above"],
    correct: 3,
    explanation: "Agrovoltaics can increase crop yields, reduce water usage through shading, and maximize land productivity."
  },
  {
    id: 186,
    question: "Which factor most affects the economic performance of battery storage?",
    options: ["Initial cost", "Cycle life", "Round-trip efficiency", "All equally important"],
    correct: 3,
    explanation: "Initial cost, cycle life, and efficiency all significantly impact the economics of battery storage systems."
  },
  {
    id: 187,
    question: "What is the typical response time for battery storage to provide frequency regulation?",
    options: ["Seconds", "Minutes", "Hours", "Days"],
    correct: 0,
    explanation: "Battery storage can respond to frequency regulation signals within seconds, much faster than conventional generators."
  },
  {
    id: 188,
    question: "In wind turbine operation, what is 'curtailment'?",
    options: ["Planned maintenance", "Intentional power reduction", "Emergency shutdown", "Blade adjustment"],
    correct: 1,
    explanation: "Curtailment is the intentional reduction of wind turbine power output for grid management or economic reasons."
  },
  {
    id: 189,
    question: "What is the primary challenge with vehicle-to-grid (V2G) technology?",
    options: ["Technical complexity", "Battery degradation", "Grid integration", "All of the above"],
    correct: 3,
    explanation: "V2G faces challenges from technical complexity, potential battery impacts, and grid integration requirements."
  },
  {
    id: 190,
    question: "Which solar panel mounting system is most common for utility-scale installations?",
    options: ["Fixed tilt", "Single-axis tracking", "Dual-axis tracking", "Roof-mounted"],
    correct: 1,
    explanation: "Single-axis tracking systems offer the best balance of energy gain and cost for utility-scale solar installations."
  },
  {
    id: 191,
    question: "What is the typical energy payback time for modern solar panels?",
    options: ["6 months - 1 year", "1-2 years", "2-4 years", "4-6 years"],
    correct: 1,
    explanation: "Modern solar panels typically have energy payback times of 1-2 years in favorable climates."
  },
  {
    id: 192,
    question: "In wind energy, what does 'wind shear' describe?",
    options: ["Turbulence effects", "Variation of wind speed with height", "Directional changes", "Seasonal patterns"],
    correct: 1,
    explanation: "Wind shear describes how wind speed varies with height above ground, important for turbine design and siting."
  },
  {
    id: 193,
    question: "What is the main advantage of modular battery storage systems?",
    options: ["Lower cost", "Scalability and flexibility", "Higher efficiency", "Better performance"],
    correct: 1,
    explanation: "Modular systems offer scalability and flexibility, allowing capacity to be added incrementally as needed."
  },
  {
    id: 194,
    question: "Which renewable energy forecasting method is most accurate for day-ahead predictions?",
    options: ["Statistical models", "Numerical weather prediction", "Machine learning", "Hybrid approaches"],
    correct: 3,
    explanation: "Hybrid approaches combining multiple forecasting methods typically provide the most accurate day-ahead predictions."
  },
  {
    id: 195,
    question: "What is the primary purpose of a wind turbine's pitch system?",
    options: ["Increase efficiency", "Control power output", "Reduce noise", "All of the above"],
    correct: 3,
    explanation: "Pitch systems control blade angle to optimize efficiency, regulate power, and reduce noise when needed."
  },
  {
    id: 196,
    question: "In solar PV systems, what does 'DC optimizers' technology provide?",
    options: ["Module-level power control", "Improved safety", "Enhanced monitoring", "All of the above"],
    correct: 3,
    explanation: "DC optimizers provide module-level power optimization, safety features, and detailed monitoring capabilities."
  },
  {
    id: 197,
    question: "What is the typical lifetime of a lithium-ion battery in stationary applications?",
    options: ["5-10 years", "10-15 years", "15-20 years", "20-25 years"],
    correct: 1,
    explanation: "Lithium-ion batteries in stationary applications typically last 10-15 years depending on usage and chemistry."
  },
  {
    id: 198,
    question: "Which factor is most important for wind turbine blade design?",
    options: ["Material strength", "Aerodynamic efficiency", "Manufacturing cost", "Weight optimization"],
    correct: 1,
    explanation: "Aerodynamic efficiency is the most critical factor in blade design, directly affecting energy capture."
  },
  {
    id: 199,
    question: "What is the main challenge with seasonal energy storage?",
    options: ["Technical complexity", "Very high costs", "Efficiency losses", "All of the above"],
    correct: 3,
    explanation: "Seasonal storage faces challenges from technical complexity, extremely high costs, and significant efficiency losses."
  },
  {
    id: 200,
    question: "In grid-scale renewable energy integration, what is 'system inertia'?",
    options: ["Resistance to change", "Grid stability characteristic", "Energy storage capacity", "Transmission capacity"],
    correct: 1,
    explanation: "System inertia is the grid's natural resistance to frequency changes, traditionally provided by rotating generators."
  }
];