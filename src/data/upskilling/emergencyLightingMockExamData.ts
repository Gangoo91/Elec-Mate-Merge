import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingMockExamQuestions: QuizQuestion[] = [
  // MODULE 1: Introduction to Emergency Lighting (50 questions)
  {
    id: 1,
    question: "What is the primary purpose of emergency lighting?",
    options: [
      "To provide general illumination during power outages",
      "To enable safe evacuation of premises in the event of failure of the normal supply",
      "To reduce energy costs",
      "To enhance building aesthetics"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting is specifically designed to enable safe evacuation when the normal lighting supply fails, as required by BS 5266-1."
  },
  {
    id: 2,
    question: "Which UK legislation requires emergency lighting in non-domestic premises?",
    options: [
      "Building Regulations Part B",
      "The Regulatory Reform (Fire Safety) Order 2005",
      "Both Building Regulations and Fire Safety Order",
      "Health and Safety at Work Act only"
    ],
    correctAnswer: 2,
    explanation: "Both the Building Regulations (Approved Document B) and the Regulatory Reform (Fire Safety) Order 2005 mandate emergency lighting requirements."
  },
  {
    id: 3,
    question: "What is the role of the 'responsible person' under the Fire Safety Order?",
    options: [
      "To design the emergency lighting system",
      "To carry out risk assessments and ensure adequate emergency lighting",
      "To install luminaires personally",
      "To conduct monthly testing only"
    ],
    correctAnswer: 1,
    explanation: "The responsible person (usually the building owner or employer) must conduct fire risk assessments and ensure adequate emergency lighting provision."
  },
  {
    id: 4,
    question: "What does BS 5266-1 provide guidance on?",
    options: [
      "Exit sign colours only",
      "Comprehensive code of practice for emergency lighting design, installation, and maintenance",
      "Battery specifications only",
      "Cable sizing only"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 is the primary UK standard providing comprehensive guidance for emergency lighting systems throughout their lifecycle."
  },
  {
    id: 5,
    question: "What are the three main categories of emergency lighting?",
    options: [
      "Internal, external, and underground",
      "Escape route, open area (anti-panic), and high-risk task area",
      "LED, fluorescent, and halogen",
      "Central battery, self-contained, and hybrid"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting is categorised by function: escape route lighting, open area (anti-panic) lighting, and high-risk task area lighting."
  },
  {
    id: 6,
    question: "What is 'maintained' emergency lighting?",
    options: [
      "Lights that are regularly serviced",
      "Lights energised continuously, operating from normal and emergency supplies",
      "Lights with extended battery life",
      "Lights installed only in maintained areas"
    ],
    correctAnswer: 1,
    explanation: "Maintained emergency lighting operates continuously from the normal supply and switches to battery when the normal supply fails."
  },
  {
    id: 7,
    question: "What is 'non-maintained' emergency lighting?",
    options: [
      "Lights that don't require maintenance",
      "Lights that operate only when the normal supply fails",
      "Lights with inferior performance",
      "Lights installed temporarily"
    ],
    correctAnswer: 1,
    explanation: "Non-maintained emergency lighting remains off during normal conditions and illuminates only when the normal supply fails."
  },
  {
    id: 8,
    question: "Which mode is typically used for exit signs in public buildings?",
    options: [
      "Non-maintained mode",
      "Maintained mode for constant visibility",
      "Sustained mode only",
      "Standby mode"
    ],
    correctAnswer: 1,
    explanation: "Exit signs in public buildings typically operate in maintained mode to ensure they are always visible to occupants."
  },
  {
    id: 9,
    question: "What does 'sustained' emergency lighting mean?",
    options: [
      "High-quality luminaires",
      "Lights that can be switched between maintained and non-maintained modes",
      "Lights powered by renewable energy",
      "Lights with extended warranty"
    ],
    correctAnswer: 1,
    explanation: "Sustained emergency lighting can operate in either maintained or non-maintained mode, offering operational flexibility."
  },
  {
    id: 10,
    question: "What is the typical battery autonomy period required in most premises?",
    options: [
      "30 minutes",
      "1 hour minimum (3 hours where occupants sleep)",
      "45 minutes",
      "2 hours in all cases"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 requires minimum 1-hour duration for standard premises, extending to 3 hours where occupants sleep or evacuation is complex."
  },
  {
    id: 11,
    question: "Why is a 3-hour duration required in premises where people sleep?",
    options: [
      "Building regulations preference",
      "To allow time for discovery, alarm, and safe evacuation during sleeping hours",
      "To reduce maintenance frequency",
      "For energy efficiency"
    ],
    correctAnswer: 1,
    explanation: "The 3-hour requirement accounts for the time needed to discover a fire, raise the alarm, and evacuate sleeping occupants safely."
  },
  {
    id: 12,
    question: "What is a self-contained emergency luminaire?",
    options: [
      "A luminaire that installs itself",
      "A luminaire containing its own battery, lamp, control gear, and test facility",
      "A luminaire without external wiring",
      "A luminaire requiring no maintenance"
    ],
    correctAnswer: 1,
    explanation: "Self-contained luminaires have integral batteries, control circuits, and testing facilities, requiring only mains connection."
  },
  {
    id: 13,
    question: "What is a central battery system?",
    options: [
      "A system with batteries in each luminaire",
      "A system where all luminaires are powered from a central battery bank",
      "A system using vehicle batteries",
      "A system with distributed power supplies"
    ],
    correctAnswer: 1,
    explanation: "Central battery systems supply all emergency luminaires from a centralised battery bank, typically located in a dedicated battery room."
  },
  {
    id: 14,
    question: "What are the main advantages of self-contained systems?",
    options: [
      "Lower initial cost and simpler installation",
      "Better performance and longer life",
      "Centralized monitoring only",
      "No testing requirements"
    ],
    correctAnswer: 0,
    explanation: "Self-contained systems offer lower initial costs, simpler installation, and no single point of failure, making them popular for smaller premises."
  },
  {
    id: 15,
    question: "What are the main advantages of central battery systems?",
    options: [
      "Cheaper installation costs",
      "Centralized monitoring, easier maintenance, and consistent performance",
      "No cable requirements",
      "Unlimited luminaire capacity"
    ],
    correctAnswer: 1,
    explanation: "Central battery systems provide centralised monitoring, easier battery maintenance, and consistent performance across all luminaires."
  },
  {
    id: 16,
    question: "Which premises typically require central battery systems?",
    options: [
      "Small retail shops",
      "Large commercial buildings, hospitals, high-rise buildings",
      "Domestic dwellings",
      "Garden sheds"
    ],
    correctAnswer: 1,
    explanation: "Large complex buildings benefit from central battery systems due to easier maintenance coordination and centralized monitoring capabilities."
  },
  {
    id: 17,
    question: "What is the purpose of 'slave' luminaires in central battery systems?",
    options: [
      "Backup luminaires that are rarely used",
      "Luminaires powered by the central battery without their own battery",
      "Low-quality emergency lights",
      "Decorative lighting only"
    ],
    correctAnswer: 1,
    explanation: "Slave luminaires contain no battery and are entirely dependent on the central battery supply via fire-resistant cabling."
  },
  {
    id: 18,
    question: "What does LED technology offer for emergency lighting?",
    options: [
      "Higher power consumption",
      "Lower efficacy, longer battery life, reduced maintenance, and better performance",
      "Shorter lifespan",
      "Higher heat output"
    ],
    correctAnswer: 1,
    explanation: "LED emergency lighting provides superior efficacy, extended battery life, reduced maintenance, and improved photometric performance."
  },
  {
    id: 19,
    question: "What is the typical lifespan of modern LED emergency luminaires?",
    options: [
      "1,000 hours",
      "5,000 hours",
      "25,000 hours",
      "50,000+ hours"
    ],
    correctAnswer: 3,
    explanation: "Quality LED emergency luminaires typically achieve 50,000+ hours operational life, significantly exceeding traditional lamp technologies."
  },
  {
    id: 20,
    question: "What is the consequence of non-compliance with emergency lighting regulations?",
    options: [
      "Small fine only",
      "Prohibition notice, prosecution, unlimited fines, and potential imprisonment",
      "Verbal warning only",
      "No consequences"
    ],
    correctAnswer: 1,
    explanation: "The Fire Safety Order carries serious penalties including prohibition notices, prosecution, unlimited fines, and up to 2 years imprisonment."
  },
  {
    id: 21,
    question: "What is 'standby lighting'?",
    options: [
      "Lighting that is never used",
      "Emergency lighting to enable normal activities to continue in the event of supply failure",
      "Temporary lighting during construction",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Standby lighting enables normal activities to continue during supply failure, distinct from emergency escape lighting which facilitates evacuation."
  },
  {
    id: 22,
    question: "Why is emergency lighting required in stairwells?",
    options: [
      "For aesthetic purposes",
      "Stairwells are key escape routes requiring continuous illumination",
      "To reduce electricity costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Stairwells are critical escape routes that must remain illuminated to prevent falls and enable safe evacuation during emergencies."
  },
  {
    id: 23,
    question: "What is the purpose of emergency lighting in corridors?",
    options: [
      "To create ambiance",
      "To guide occupants safely along escape routes to exits",
      "To highlight artwork",
      "To reduce heating costs"
    ],
    correctAnswer: 1,
    explanation: "Corridor emergency lighting guides occupants along escape routes, illuminating direction changes, obstructions, and path to final exits."
  },
  {
    id: 24,
    question: "Why must emergency lighting operate automatically?",
    options: [
      "To save manual effort",
      "To ensure immediate activation when normal lighting fails, without requiring human intervention",
      "To reduce maintenance",
      "For aesthetic reasons"
    ],
    correctAnswer: 1,
    explanation: "Automatic operation ensures emergency lighting activates instantly when needed, without relying on potentially panicked or absent personnel."
  },
  {
    id: 25,
    question: "What is the '50% rule' in emergency lighting duration testing?",
    options: [
      "Test only 50% of lights",
      "Battery capacity must not fall below 50% at end of rated duration",
      "Test once every 50 days",
      "Illuminate 50% of premises"
    ],
    correctAnswer: 1,
    explanation: "After full duration discharge, battery voltage must not fall below 50% of nominal to ensure sufficient capacity for multiple discharge cycles."
  },
  {
    id: 26,
    question: "What component detects normal supply failure in self-contained luminaires?",
    options: [
      "Battery charger",
      "Control circuit with voltage monitoring",
      "Manual switch",
      "Timer circuit"
    ],
    correctAnswer: 1,
    explanation: "Self-contained luminaires contain control circuits that continuously monitor mains voltage and automatically switch to battery on failure."
  },
  {
    id: 27,
    question: "What is the purpose of trickle charging in emergency lighting?",
    options: [
      "To save electricity",
      "To maintain battery charge when normal supply is present",
      "To power the lamp continuously",
      "To test the system"
    ],
    correctAnswer: 1,
    explanation: "Trickle charging continuously recharges the battery from the mains supply, ensuring it's always ready for emergency use."
  },
  {
    id: 28,
    question: "What battery chemistry is most common in modern self-contained luminaires?",
    options: [
      "Lead-acid",
      "Lithium Iron Phosphate (LiFePO4)",
      "Alkaline",
      "Zinc-carbon"
    ],
    correctAnswer: 1,
    explanation: "Lithium Iron Phosphate batteries offer superior performance, longer life, lighter weight, and better temperature tolerance than traditional chemistries."
  },
  {
    id: 29,
    question: "What is the typical recharge time required after full discharge?",
    options: [
      "1 hour",
      "12 hours",
      "24 hours maximum as per BS 5266-1",
      "72 hours"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires emergency lighting batteries to fully recharge within 24 hours following a complete discharge cycle."
  },
  {
    id: 30,
    question: "Why must emergency lighting be maintained even in unoccupied buildings?",
    options: [
      "It is not required when unoccupied",
      "Fire service, maintenance personnel, and security staff still require safe escape routes",
      "For insurance purposes only",
      "To prevent theft"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting remains essential for emergency services, maintenance personnel, and security staff accessing unoccupied premises."
  },
  {
    id: 31,
    question: "What is the difference between emergency escape lighting and escape route lighting?",
    options: [
      "No difference—they are synonymous",
      "Emergency escape lighting is the overall category; escape route lighting is a specific type",
      "Escape route lighting is cheaper",
      "Emergency escape lighting is for outdoor use only"
    ],
    correctAnswer: 1,
    explanation: "Emergency escape lighting encompasses escape route lighting, open area (anti-panic) lighting, and high-risk task area lighting."
  },
  {
    id: 32,
    question: "What are the consequences of inadequate emergency lighting design?",
    options: [
      "Slightly reduced illumination",
      "Impaired evacuation, increased injury risk, regulatory non-compliance, and potential fatalities",
      "Higher electricity bills",
      "No significant consequences"
    ],
    correctAnswer: 1,
    explanation: "Inadequate emergency lighting can lead to panic, falls, impaired evacuation, serious injuries, and tragically, preventable fatalities."
  },
  {
    id: 33,
    question: "What should be included in emergency lighting documentation?",
    options: [
      "Purchase receipts only",
      "Design calculations, layout drawings, certificates, and maintenance records",
      "Photographs only",
      "Manufacturer warranties only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation including design calculations, as-built drawings, commissioning certificates, and maintenance logs is mandatory."
  },
  {
    id: 34,
    question: "Why is emergency lighting required at changes of level?",
    options: [
      "For aesthetic reasons",
      "Changes of level present trip hazards requiring adequate illumination",
      "To comply with building codes unrelated to safety",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Steps, ramps, and level changes are significant trip hazards that must be clearly illuminated to prevent falls during evacuation."
  },
  {
    id: 35,
    question: "What is the purpose of emergency lighting near fire alarm call points?",
    options: [
      "To make them look attractive",
      "To ensure call points are visible and can be operated during emergencies",
      "To warm the area",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting near fire alarm call points ensures they remain visible and operable during power failures."
  },
  {
    id: 36,
    question: "What is the minimum ceiling height typically requiring emergency lighting?",
    options: [
      "1 metre",
      "Emergency lighting is required regardless of ceiling height in occupied spaces",
      "5 metres",
      "10 metres"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting requirements are based on function and occupancy, not ceiling height, though mounting height affects design."
  },
  {
    id: 37,
    question: "Why must exit doors be illuminated by emergency lighting?",
    options: [
      "To highlight door colour",
      "To ensure exits are clearly visible and accessible during evacuation",
      "For decorative purposes",
      "To prevent theft"
    ],
    correctAnswer: 1,
    explanation: "Exit doors must be clearly illuminated to ensure they can be located and operated quickly during emergency evacuation."
  },
  {
    id: 38,
    question: "What is the difference between internal and external emergency lighting?",
    options: [
      "External lighting is brighter",
      "External lighting uses weather-resistant luminaires and covers external escape routes",
      "Internal lighting is optional",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "External emergency lighting uses IP-rated luminaires suitable for outdoor conditions and illuminates external escape routes and assembly points."
  },
  {
    id: 39,
    question: "What is the role of emergency lighting in reducing panic?",
    options: [
      "It has no psychological effect",
      "Adequate illumination reduces fear, maintains orientation, and enables rational evacuation",
      "It increases panic",
      "It is irrelevant to panic"
    ],
    correctAnswer: 1,
    explanation: "Proper emergency lighting significantly reduces panic by providing reassurance, maintaining visibility, and enabling occupants to navigate confidently."
  },
  {
    id: 40,
    question: "Why is emergency lighting required in toilets exceeding a certain size?",
    options: [
      "For comfort only",
      "Toilets represent potential entrapment areas requiring illuminated escape routes",
      "To save water",
      "It is never required in toilets"
    ],
    correctAnswer: 1,
    explanation: "Toilets without natural light, particularly those exceeding 8m² or with multiple cubicles, require emergency lighting for safe evacuation."
  },
  {
    id: 41,
    question: "What is the significance of BS EN 1838?",
    options: [
      "It covers installation methods",
      "It specifies photometric performance requirements for emergency lighting",
      "It deals with fire alarms",
      "It covers building structures"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 defines specific photometric requirements including illuminance levels, uniformity, and colour rendering for emergency lighting."
  },
  {
    id: 42,
    question: "Why must emergency lighting be included in fire risk assessments?",
    options: [
      "It is not required in risk assessments",
      "Emergency lighting is a critical fire safety measure that must be assessed for adequacy",
      "For insurance purposes only",
      "To increase costs"
    ],
    correctAnswer: 1,
    explanation: "The Fire Safety Order requires fire risk assessments to evaluate emergency lighting adequacy as a critical life safety system."
  },
  {
    id: 43,
    question: "What is the purpose of emergency lighting in lift lobbies?",
    options: [
      "To illuminate lift advertisements",
      "To provide safe holding areas and guide occupants to staircases during lift failures",
      "For aesthetic purposes",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Lift lobbies serve as safe holding areas where emergency lighting guides occupants to alternative escape routes during lift failures."
  },
  {
    id: 44,
    question: "What training should building occupants receive regarding emergency lighting?",
    options: [
      "No training is necessary",
      "Awareness of emergency lighting purpose, exit routes, and assembly points",
      "How to repair luminaires",
      "How to design systems"
    ],
    correctAnswer: 1,
    explanation: "Occupants should understand the purpose of emergency lighting, know their nearest exits, and understand evacuation procedures."
  },
  {
    id: 45,
    question: "Why is emergency lighting required near first aid points?",
    options: [
      "It is optional",
      "To ensure medical equipment and procedures can continue during power failures",
      "For decoration",
      "To reduce insurance costs"
    ],
    correctAnswer: 1,
    explanation: "First aid points require emergency lighting to enable treatment to continue safely during power failures."
  },
  {
    id: 46,
    question: "What is the relationship between emergency lighting and fire detection systems?",
    options: [
      "They are completely independent",
      "Emergency lighting should activate when fire alarms are triggered, regardless of power status",
      "They cannot operate together",
      "Emergency lighting replaces fire alarms"
    ],
    correctAnswer: 1,
    explanation: "Advanced systems integrate fire alarm activation with emergency lighting to provide immediate illumination when alarms activate."
  },
  {
    id: 47,
    question: "Why must emergency lighting designs be reviewed when premises are refurbished?",
    options: [
      "To generate work for contractors",
      "Changes to layout, occupancy, or use may affect emergency lighting requirements",
      "It is not necessary to review",
      "For aesthetic updates"
    ],
    correctAnswer: 1,
    explanation: "Refurbishment can alter escape routes, occupancy levels, and risk profiles, necessitating emergency lighting review and potential modification."
  },
  {
    id: 48,
    question: "What is the significance of 'final exit' in emergency lighting design?",
    options: [
      "The last luminaire to be installed",
      "The point where escape routes terminate at a place of ultimate safety",
      "The most expensive component",
      "The exit used by staff only"
    ],
    correctAnswer: 1,
    explanation: "Final exits mark the termination of escape routes where occupants reach open air or a place of ultimate safety outside the building."
  },
  {
    id: 49,
    question: "What is the purpose of emergency lighting above fire safety equipment?",
    options: [
      "To heat the equipment",
      "To ensure fire extinguishers, hoses, and equipment remain visible and accessible",
      "For decorative purposes",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting above fire fighting equipment ensures it remains visible and accessible for use during emergencies."
  },
  {
    id: 50,
    question: "Why do disabled refuge areas require emergency lighting?",
    options: [
      "They do not require emergency lighting",
      "Refuge areas must be illuminated to provide safety and communication while awaiting rescue",
      "For aesthetic reasons",
      "To save costs"
    ],
    correctAnswer: 1,
    explanation: "Disabled refuge areas require emergency lighting to provide safety, reassurance, and visibility while occupants await assisted evacuation."
  },

  // MODULE 2: System Categories and Lighting Types (50 questions)
  {
    id: 51,
    question: "What is the primary function of escape route lighting?",
    options: [
      "To provide general illumination",
      "To enable safe and effective identification of escape routes leading to final exits",
      "To highlight building features",
      "To save energy"
    ],
    correctAnswer: 1,
    explanation: "Escape route lighting ensures escape routes remain clearly visible and navigable from any location to the final exit."
  },
  {
    id: 52,
    question: "What minimum illuminance is required on the centre line of an escape route?",
    options: [
      "0.5 lux",
      "1 lux along the centre line",
      "2 lux",
      "5 lux"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires a minimum of 1 lux along the centre line of escape routes to ensure safe navigation."
  },
  {
    id: 53,
    question: "What is the maximum permitted ratio between maximum and minimum illuminance on escape routes?",
    options: [
      "10:1",
      "20:1",
      "40:1",
      "100:1"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1838 specifies a maximum uniformity ratio of 40:1 to prevent dangerous variations between bright and dark areas."
  },
  {
    id: 54,
    question: "Why is uniformity important on escape routes?",
    options: [
      "For aesthetic reasons",
      "To prevent dark spots that could impair vision and cause disorientation",
      "To save electricity",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Good uniformity prevents dangerous dark spots and bright areas that could impair vision adaptation and cause disorientation."
  },
  {
    id: 55,
    question: "At what points along escape routes must emergency lighting be positioned?",
    options: [
      "Random locations",
      "Near exits, corridor intersections, changes of direction, changes of level, and every 2m throughout",
      "Only at exits",
      "Only at staircases"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must be positioned at all critical decision points, hazards, and at regular intervals to maintain adequate illumination."
  },
  {
    id: 56,
    question: "What is the purpose of open area (anti-panic) lighting?",
    options: [
      "To provide outdoor illumination",
      "To reduce panic in larger open areas by providing sufficient light for occupants to reach escape routes",
      "To highlight decorations",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Anti-panic lighting provides sufficient illumination in large open areas to reduce panic and enable occupants to move safely to escape routes."
  },
  {
    id: 57,
    question: "What minimum illuminance is required for open area (anti-panic) lighting?",
    options: [
      "0.1 lux",
      "0.5 lux on the floor area",
      "1 lux",
      "2 lux"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires a minimum of 0.5 lux on the floor area for open area (anti-panic) lighting."
  },
  {
    id: 58,
    question: "What uniformity ratio is required for open area (anti-panic) lighting?",
    options: [
      "10:1",
      "20:1",
      "40:1 maximum",
      "No requirement"
    ],
    correctAnswer: 2,
    explanation: "Open area anti-panic lighting requires the same 40:1 maximum uniformity ratio as escape route lighting."
  },
  {
    id: 59,
    question: "What is high-risk task area lighting?",
    options: [
      "Extra bright lighting for difficult work",
      "Emergency lighting to allow potentially dangerous processes to be shut down safely",
      "Lighting for security purposes",
      "Decorative accent lighting"
    ],
    correctAnswer: 1,
    explanation: "High-risk task area lighting enables personnel to safely shut down dangerous processes or operations during supply failure."
  },
  {
    id: 60,
    question: "What minimum illuminance is required for high-risk task area lighting?",
    options: [
      "1 lux",
      "5 lux",
      "10% of normal illuminance with a minimum of 15 lux",
      "50 lux"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1838 requires high-risk task area lighting to provide a minimum 10% of normal illuminance but not less than 15 lux."
  },
  {
    id: 61,
    question: "What uniformity is required for high-risk task area lighting?",
    options: [
      "10:1 maximum",
      "20:1 maximum",
      "40:1 maximum",
      "No uniformity requirement"
    ],
    correctAnswer: 0,
    explanation: "High-risk task areas require better uniformity (10:1 maximum) than escape routes to facilitate precise work during shutdown."
  },
  {
    id: 62,
    question: "Which areas typically require high-risk task area lighting?",
    options: [
      "Offices and retail",
      "Plant rooms, laboratories, industrial processes, operating theatres",
      "Car parks",
      "All areas equally"
    ],
    correctAnswer: 1,
    explanation: "High-risk areas include plant rooms with moving machinery, chemical laboratories, industrial processes, and operating theatres."
  },
  {
    id: 63,
    question: "What is the purpose of exit signs in emergency lighting?",
    options: [
      "Building decoration",
      "To clearly indicate the location and direction of escape routes and final exits",
      "To advertise premises",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Exit signs provide clear, unambiguous indication of escape route direction and exit locations, particularly important in unfamiliar premises."
  },
  {
    id: 64,
    question: "What pictogram standard must be used for exit signs?",
    options: [
      "Any design is acceptable",
      "ISO 7010 (green running man pictogram)",
      "Company logo",
      "Local council specifications"
    ],
    correctAnswer: 1,
    explanation: "ISO 7010 standardises exit sign pictograms (green running man with arrow) for universal recognition across all countries."
  },
  {
    id: 65,
    question: "What are the two main types of exit signs?",
    options: [
      "Large and small",
      "Internally illuminated and externally illuminated",
      "Expensive and cheap",
      "Digital and analogue"
    ],
    correctAnswer: 1,
    explanation: "Exit signs are either internally illuminated (edge-lit or back-lit) or externally illuminated by spotlights."
  },
  {
    id: 66,
    question: "What minimum luminance is required for internally illuminated exit signs?",
    options: [
      "1 cd/m²",
      "2 cd/m² minimum",
      "5 cd/m²",
      "50 cd/m²"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires internally illuminated exit signs to maintain a minimum luminance of 2 cd/m²."
  },
  {
    id: 67,
    question: "What is the advantage of LED exit signs over traditional fluorescent types?",
    options: [
      "They are cheaper initially",
      "Lower power consumption, longer life, better reliability, and reduced maintenance",
      "They are heavier",
      "They require more frequent testing"
    ],
    correctAnswer: 1,
    explanation: "LED exit signs offer dramatically lower power consumption (often 90% reduction), 10+ year life, better reliability, and minimal maintenance."
  },
  {
    id: 68,
    question: "Where should exit signs be positioned?",
    options: [
      "Randomly throughout premises",
      "At every exit, and at points where direction must be indicated along escape routes",
      "Only at main entrances",
      "Only in corridors"
    ],
    correctAnswer: 1,
    explanation: "Exit signs must be positioned at all exits and decision points where directional guidance is needed to lead occupants to safety."
  },
  {
    id: 69,
    question: "What is the maximum viewing distance for exit signs?",
    options: [
      "5 metres",
      "Distance depends on sign size: typically 200 x sign height in metres",
      "Unlimited distance",
      "10 metres fixed"
    ],
    correctAnswer: 1,
    explanation: "Viewing distance is calculated as approximately 200 times the sign height (e.g., 0.2m high sign = 40m maximum viewing distance)."
  },
  {
    id: 70,
    question: "What is 'way guidance' signage?",
    options: [
      "Tourist information",
      "Directional signs indicating route to follow to reach final exits",
      "Building blueprints",
      "Advertising signage"
    ],
    correctAnswer: 1,
    explanation: "Way guidance signage provides directional information along escape routes, particularly important in complex or unfamiliar buildings."
  },
  {
    id: 71,
    question: "Why must exit signs operate in maintained mode in public buildings?",
    options: [
      "To save electricity",
      "To ensure they are continuously visible to occupants unfamiliar with premises",
      "For aesthetic reasons",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Maintained operation ensures exit signs are always visible, particularly important in public buildings where occupants are unfamiliar with layout."
  },
  {
    id: 72,
    question: "What is the purpose of emergency lighting in staircases?",
    options: [
      "To provide ambient lighting",
      "To illuminate all steps, handrails, and landings to prevent falls during evacuation",
      "For decorative effect",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Staircase emergency lighting must illuminate every step, handrail, and landing to prevent dangerous falls during evacuation."
  },
  {
    id: 73,
    question: "What minimum illuminance is required on staircases?",
    options: [
      "0.5 lux",
      "1 lux on the centre line of travel",
      "5 lux",
      "10 lux"
    ],
    correctAnswer: 1,
    explanation: "Staircases require minimum 1 lux on the centre line of travel as they are classified as escape routes."
  },
  {
    id: 74,
    question: "Why are photoluminescent (glow-in-the-dark) signs not suitable as primary exit signs?",
    options: [
      "They are too expensive",
      "They require prior charge from light source and gradually fade, providing inadequate duration",
      "They are too bright",
      "They meet all requirements"
    ],
    correctAnswer: 1,
    explanation: "Photoluminescent signs require charging by light and fade over time, making them unsuitable as primary exit signs per BS 5266-1."
  },
  {
    id: 75,
    question: "What is the purpose of emergency lighting in corridors exceeding a certain length?",
    options: [
      "To save energy",
      "To provide continuous guidance along extended escape routes preventing disorientation",
      "For aesthetic purposes",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Long corridors require regular emergency lighting to maintain orientation and ensure occupants can navigate the entire length safely."
  },
  {
    id: 76,
    question: "What spacing is typically used for emergency luminaires along corridors?",
    options: [
      "One at each end only",
      "Spacing should not exceed twice the mounting height, typically every 2-3 metres",
      "Every 10 metres",
      "Random spacing"
    ],
    correctAnswer: 1,
    explanation: "Luminaire spacing typically should not exceed twice the mounting height to maintain adequate illuminance and uniformity."
  },
  {
    id: 77,
    question: "Why must emergency lighting be provided at changes of direction?",
    options: [
      "For decoration",
      "Direction changes are critical decision points requiring clear visibility",
      "To save costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Changes of direction represent key decision points where occupants must identify the correct escape route requiring adequate illumination."
  },
  {
    id: 78,
    question: "What is the purpose of emergency lighting at external doors?",
    options: [
      "To highlight door colour",
      "To ensure doors can be located, identified, and operated during evacuation",
      "For aesthetic reasons",
      "To warm the area"
    ],
    correctAnswer: 1,
    explanation: "External doors must be clearly illuminated to ensure they can be located, recognised as exits, and operated safely during evacuation."
  },
  {
    id: 79,
    question: "What minimum illuminance is required at floor level near final exits?",
    options: [
      "0.5 lux",
      "1 lux",
      "5 lux minimum",
      "10 lux"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1838 requires 5 lux minimum illuminance at floor level in the immediate vicinity of final exits."
  },
  {
    id: 80,
    question: "Why is emergency lighting required in lift lobbies when lifts cannot be used during fires?",
    options: [
      "For decoration",
      "Lobbies serve as holding areas and access routes to staircases during lift failures",
      "To operate the lifts",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Lift lobbies provide safe holding areas and access to staircase alternatives, requiring emergency lighting when lifts are unavailable."
  },
  {
    id: 81,
    question: "What is the purpose of emergency lighting above final exit doors?",
    options: [
      "To indicate the door handle location",
      "To ensure exits are visible from a distance and confirm they lead outside",
      "For security purposes",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting above final exit doors ensures they are identifiable from a distance and confirms they lead to safety."
  },
  {
    id: 82,
    question: "What colour temperature is recommended for emergency lighting?",
    options: [
      "2700K (warm white) only",
      "6500K (daylight white) for better visibility and colour rendering",
      "1800K (amber)",
      "Any colour"
    ],
    correctAnswer: 1,
    explanation: "Cool white (4000-6500K) provides better visibility, colour rendering, and perception of safety in emergency situations."
  },
  {
    id: 83,
    question: "Why must emergency lighting cover the full width of escape routes?",
    options: [
      "For aesthetic reasons",
      "To prevent dark edges that could conceal obstacles or cause disorientation",
      "To increase costs",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Full-width coverage prevents dangerous dark edges where obstacles could be hidden and ensures occupants can use the full escape route width."
  },
  {
    id: 84,
    question: "What is the purpose of emergency lighting in accessible toilet facilities?",
    options: [
      "It is not required in toilets",
      "To ensure disabled users can safely evacuate and operate emergency assistance alarms",
      "For comfort only",
      "To save water"
    ],
    correctAnswer: 1,
    explanation: "Accessible toilets require emergency lighting to enable disabled users to evacuate safely and operate emergency alarm systems if needed."
  },
  {
    id: 85,
    question: "What is the minimum colour rendering index (CRI) for emergency lighting?",
    options: [
      "CRI 40 minimum",
      "CRI 60 minimum",
      "CRI 80 minimum",
      "No requirement"
    ],
    correctAnswer: 0,
    explanation: "BS EN 1838 requires a minimum CRI of 40 for emergency lighting, though higher values (60-80+) provide better colour recognition."
  },
  {
    id: 86,
    question: "Why is emergency lighting required near fire alarm call points?",
    options: [
      "To highlight them for aesthetic reasons",
      "To ensure call points remain visible and can be operated during power failures",
      "To warm the equipment",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting ensures fire alarm call points remain visible and operable, enabling occupants to raise alarms during power failures."
  },
  {
    id: 87,
    question: "What is the purpose of emergency lighting above fire fighting equipment?",
    options: [
      "To heat the equipment",
      "To ensure fire extinguishers, hoses, and alarms remain visible and accessible",
      "For decorative purposes",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting above fire fighting equipment ensures it remains clearly visible and accessible for use during emergencies."
  },
  {
    id: 88,
    question: "What is the typical mounting height for corridor emergency lighting?",
    options: [
      "1 metre",
      "2-3 metres for optimal coverage",
      "5 metres minimum",
      "At floor level"
    ],
    correctAnswer: 1,
    explanation: "Mounting heights of 2-3 metres typically provide optimal coverage for corridor widths while maintaining adequate illuminance at floor level."
  },
  {
    id: 89,
    question: "Why should emergency luminaires not be positioned directly above occupant head height in corridors?",
    options: [
      "It looks unattractive",
      "It can create shadows and hot spots affecting uniformity",
      "It saves costs",
      "It is the preferred position"
    ],
    correctAnswer: 1,
    explanation: "Direct overhead mounting can create shadows and glare; offset or staggered mounting often provides better uniformity."
  },
  {
    id: 90,
    question: "What is the purpose of emergency lighting in plant rooms?",
    options: [
      "For aesthetic purposes",
      "To enable safe shutdown of potentially dangerous equipment and safe evacuation",
      "To heat the room",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Plant rooms typically require both high-risk task area lighting for equipment shutdown and escape route lighting for evacuation."
  },
  {
    id: 91,
    question: "What is the minimum emergency lighting requirement for electrical intake rooms?",
    options: [
      "No emergency lighting required",
      "Escape route lighting plus high-risk task area lighting near switchgear",
      "One luminaire minimum",
      "Natural light only"
    ],
    correctAnswer: 1,
    explanation: "Electrical rooms require escape route lighting and high-risk task area lighting to safely isolate equipment during emergencies."
  },
  {
    id: 92,
    question: "Why must emergency lighting be provided at both ends of long corridors?",
    options: [
      "For symmetry",
      "To ensure illumination from both directions regardless of which end occupants enter from",
      "To increase costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Illumination from both ends ensures adequate visibility regardless of which direction occupants travel during evacuation."
  },
  {
    id: 93,
    question: "What is the purpose of emergency lighting in server rooms and data centres?",
    options: [
      "To cool the equipment",
      "To enable safe shutdown of critical systems and safe evacuation during power failures",
      "For decoration",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Server rooms require high-risk task area lighting to safely shut down critical systems and escape route lighting for evacuation."
  },
  {
    id: 94,
    question: "What type of emergency lighting is most appropriate for large open-plan offices?",
    options: [
      "Escape route lighting only",
      "Combination of escape route and open area (anti-panic) lighting",
      "Exit signs only",
      "None required"
    ],
    correctAnswer: 1,
    explanation: "Large open-plan offices require both escape route lighting to exits and anti-panic lighting to prevent disorientation in open areas."
  },
  {
    id: 95,
    question: "Why is emergency lighting required in windowless rooms exceeding 8m²?",
    options: [
      "For aesthetic reasons",
      "Windowless rooms represent potential entrapment areas requiring illuminated escape routes",
      "To save energy",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Windowless rooms lack natural light for orientation, requiring emergency lighting to ensure occupants can locate exits safely."
  },
  {
    id: 96,
    question: "What is the purpose of emergency lighting in disabled refuge areas?",
    options: [
      "For decoration",
      "To provide safety, visibility, and reassurance while occupants await assisted evacuation",
      "To heat the area",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Refuge areas require adequate emergency lighting to provide safety and visibility while disabled occupants await assistance."
  },
  {
    id: 97,
    question: "What type of emergency lighting is required in car parks?",
    options: [
      "No emergency lighting required",
      "Escape route lighting at ped walkways, exits, and stair access",
      "General illumination only",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Car parks require emergency lighting along pedestrian walkways, at exit points, and staircase access to enable safe evacuation."
  },
  {
    id: 98,
    question: "Why must emergency lighting be provided at the top and bottom of every staircase?",
    options: [
      "For symmetry",
      "To ensure clear visibility when entering/exiting staircases preventing falls",
      "To save costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Illumination at stair entry/exit points is critical for preventing falls and ensuring safe transition between levels."
  },
  {
    id: 99,
    question: "What is the purpose of emergency lighting in storage areas?",
    options: [
      "To see stored items better",
      "To provide escape route lighting if occupied, or none if unoccupied and secured",
      "For inventory purposes",
      "Always required regardless of use"
    ],
    correctAnswer: 1,
    explanation: "Storage areas require emergency lighting only if regularly occupied; secured unoccupied storage may not require emergency lighting."
  },
  {
    id: 100,
    question: "What illuminance uniformity prevents 'cave effect' at escape route exits?",
    options: [
      "Uniform illumination with 40:1 maximum ratio",
      "Bright spots at exits only",
      "Uniform illumination with 40:1 maximum ratio prevents dark areas appearing as barriers",
      "No requirement"
    ],
    correctAnswer: 2,
    explanation: "Good uniformity prevents the 'cave effect' where bright exits appear as barriers due to contrast with dark approaches."
  },

  // MODULE 3: Design Requirements and Placement (50 questions)
  {
    id: 101,
    question: "What is the minimum maintained illuminance level required on escape routes according to BS 5266-1?",
    options: [
      "0.2 lux",
      "1 lux",
      "5 lux",
      "10 lux"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 requires a minimum maintained illuminance of 1 lux on the centre line of escape routes."
  },
  {
    id: 102,
    question: "Where should emergency lighting be positioned in relation to changes of direction?",
    options: [
      "Only at the start of the corridor",
      "At every change of direction to ensure visibility",
      "Only at the end of the corridor",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must be positioned at every change of direction to ensure occupants can clearly see the escape route."
  },
  {
    id: 103,
    question: "What is the recommended spacing between emergency luminaires in corridors?",
    options: [
      "No more than twice the mounting height",
      "Every 10 meters",
      "Every 5 meters",
      "No specific recommendation"
    ],
    correctAnswer: 0,
    explanation: "Spacing should not exceed twice the mounting height to maintain adequate illuminance and uniformity."
  },
  {
    id: 104,
    question: "Why is it important to avoid dark spots in emergency lighting design?",
    options: [
      "To save energy",
      "To prevent disorientation and ensure safe evacuation",
      "For aesthetic reasons",
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "Dark spots can cause disorientation and increase the risk of accidents during evacuation."
  },
  {
    id: 105,
    question: "What is the minimum illuminance required for open area (anti-panic) lighting?",
    options: [
      "0.1 lux",
      "0.5 lux",
      "1 lux",
      "5 lux"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires a minimum of 0.5 lux for open area (anti-panic) lighting."
  },
  {
    id: 106,
    question: "What is the purpose of high-risk task area lighting?",
    options: [
      "To provide decorative lighting",
      "To allow safe shutdown of dangerous processes",
      "To illuminate parking areas",
      "To provide general lighting"
    ],
    correctAnswer: 1,
    explanation: "High-risk task area lighting enables safe shutdown of dangerous processes during power failure."
  },
  {
    id: 107,
    question: "What is the minimum illuminance required for high-risk task area lighting?",
    options: [
      "1 lux",
      "5 lux",
      "10% of normal lighting with a minimum of 15 lux",
      "50 lux"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1838 requires 10% of normal lighting with a minimum of 15 lux for high-risk task areas."
  },
  {
    id: 108,
    question: "Why must emergency lighting cover the full width of escape routes?",
    options: [
      "To prevent dark edges that could hide obstacles",
      "For aesthetic reasons",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Full width coverage prevents dark edges that could conceal obstacles and cause accidents."
  },
  {
    id: 109,
    question: "What is the recommended mounting height for emergency luminaires in corridors?",
    options: [
      "1 meter",
      "2-3 meters",
      "5 meters",
      "At floor level"
    ],
    correctAnswer: 1,
    explanation: "Mounting at 2-3 meters provides optimal coverage and uniformity."
  },
  {
    id: 110,
    question: "Why should emergency luminaires not be mounted directly above occupant head height?",
    options: [
      "It causes shadows and glare",
      "It is more expensive",
      "It is aesthetically unpleasing",
      "It is preferred"
    ],
    correctAnswer: 0,
    explanation: "Direct overhead mounting can create shadows and glare, reducing uniformity."
  },
  {
    id: 111,
    question: "What is the minimum luminance required for internally illuminated exit signs?",
    options: [
      "1 cd/m²",
      "2 cd/m²",
      "5 cd/m²",
      "10 cd/m²"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires a minimum luminance of 2 cd/m² for internally illuminated exit signs."
  },
  {
    id: 112,
    question: "What is the maximum uniformity ratio allowed on escape routes?",
    options: [
      "10:1",
      "20:1",
      "40:1",
      "100:1"
    ],
    correctAnswer: 2,
    explanation: "BS EN 1838 specifies a maximum uniformity ratio of 40:1 to prevent dangerous contrasts."
  },
  {
    id: 113,
    question: "What is the purpose of way guidance signage?",
    options: [
      "To provide tourist information",
      "To indicate the route to final exits",
      "To display building blueprints",
      "To advertise"
    ],
    correctAnswer: 1,
    explanation: "Way guidance signage directs occupants along escape routes to final exits."
  },
  {
    id: 114,
    question: "Why must exit signs operate in maintained mode in public buildings?",
    options: [
      "To save energy",
      "To ensure continuous visibility",
      "For aesthetic reasons",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Maintained mode ensures exit signs are always visible, especially to unfamiliar occupants."
  },
  {
    id: 115,
    question: "What is the minimum colour rendering index (CRI) for emergency lighting?",
    options: [
      "CRI 20",
      "CRI 40",
      "CRI 60",
      "CRI 80"
    ],
    correctAnswer: 1,
    explanation: "BS EN 1838 requires a minimum CRI of 40 for emergency lighting."
  },
  {
    id: 116,
    question: "What is the typical recharge time for emergency lighting batteries after full discharge?",
    options: [
      "6 hours",
      "12 hours",
      "24 hours",
      "48 hours"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires batteries to recharge fully within 24 hours after full discharge."
  },
  {
    id: 117,
    question: "Why is emergency lighting required in lift lobbies?",
    options: [
      "To illuminate advertisements",
      "To provide safe holding areas and guide occupants to staircases",
      "For decoration",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Lift lobbies serve as safe holding areas and access points to staircases during lift failures."
  },
  {
    id: 118,
    question: "What is the purpose of emergency lighting near fire alarm call points?",
    options: [
      "To highlight them for decoration",
      "To ensure visibility and operability during power failures",
      "To warm the area",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting ensures fire alarm call points remain visible and operable during power failures."
  },
  {
    id: 119,
    question: "Why must emergency lighting be reviewed after building refurbishment?",
    options: [
      "To generate work for contractors",
      "Because changes may affect escape routes and lighting requirements",
      "It is not necessary",
      "For aesthetic updates"
    ],
    correctAnswer: 1,
    explanation: "Refurbishment can alter escape routes and occupancy, requiring emergency lighting review."
  },
  {
    id: 120,
    question: "What is the significance of the 'final exit' in emergency lighting design?",
    options: [
      "The last luminaire installed",
      "The point where escape routes terminate at a place of safety",
      "The most expensive component",
      "The exit used by staff only"
    ],
    correctAnswer: 1,
    explanation: "Final exits lead occupants to a place of ultimate safety outside the building."
  },
  {
    id: 121,
    question: "What is the purpose of emergency lighting above fire safety equipment?",
    options: [
      "To heat the equipment",
      "To ensure visibility and accessibility during emergencies",
      "For decoration",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting ensures fire safety equipment is visible and accessible during emergencies."
  },
  {
    id: 122,
    question: "Why is emergency lighting required in disabled refuge areas?",
    options: [
      "For decoration",
      "To provide safety and visibility while awaiting rescue",
      "To heat the area",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Refuge areas require lighting to provide safety and reassurance for disabled occupants."
  },
  {
    id: 123,
    question: "What is the purpose of emergency lighting in car parks?",
    options: [
      "No emergency lighting required",
      "Escape route lighting at pedestrian walkways, exits, and stairs",
      "General illumination only",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Car parks require emergency lighting to enable safe evacuation along pedestrian routes."
  },
  {
    id: 124,
    question: "Why must emergency lighting be provided at the top and bottom of staircases?",
    options: [
      "For symmetry",
      "To ensure visibility and prevent falls",
      "To save costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Illumination at stair entry and exit points prevents falls and ensures safe transitions."
  },
  {
    id: 125,
    question: "What is the purpose of emergency lighting in storage areas?",
    options: [
      "To see stored items better",
      "To provide escape route lighting if occupied",
      "For inventory purposes",
      "Always required"
    ],
    correctAnswer: 1,
    explanation: "Storage areas require emergency lighting only if regularly occupied."
  },
  {
    id: 126,
    question: "What is the maximum viewing distance for exit signs?",
    options: [
      "5 meters",
      "200 times the sign height",
      "Unlimited",
      "10 meters fixed"
    ],
    correctAnswer: 1,
    explanation: "Viewing distance is approximately 200 times the sign height."
  },
  {
    id: 127,
    question: "What is the purpose of standby lighting?",
    options: [
      "Lighting that is never used",
      "Lighting to enable normal activities during supply failure",
      "Temporary lighting during construction",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Standby lighting allows normal activities to continue during power failure."
  },
  {
    id: 128,
    question: "What is the '50% rule' in emergency lighting battery testing?",
    options: [
      "Test only 50% of lights",
      "Battery voltage must not fall below 50% at end of rated duration",
      "Test once every 50 days",
      "Illuminate 50% of premises"
    ],
    correctAnswer: 1,
    explanation: "Battery voltage must remain above 50% after full duration discharge to ensure capacity."
  },
  {
    id: 129,
    question: "What is the role of the control circuit in self-contained luminaires?",
    options: [
      "Battery charger",
      "Voltage monitoring and automatic switching to battery",
      "Manual switch",
      "Timer circuit"
    ],
    correctAnswer: 1,
    explanation: "Control circuits monitor mains voltage and switch to battery on failure."
  },
  {
    id: 130,
    question: "What battery chemistry is most common in modern emergency lighting?",
    options: [
      "Lead-acid",
      "Lithium Iron Phosphate (LiFePO4)",
      "Alkaline",
      "Zinc-carbon"
    ],
    correctAnswer: 1,
    explanation: "LiFePO4 batteries offer superior performance and longevity."
  },
  {
    id: 131,
    question: "Why is emergency lighting required in stairwells?",
    options: [
      "For aesthetics",
      "To prevent falls and enable safe evacuation",
      "To reduce electricity costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Stairwells are critical escape routes requiring illumination."
  },
  {
    id: 132,
    question: "What is the typical battery autonomy for emergency lighting in sleeping accommodation?",
    options: [
      "30 minutes",
      "1 hour",
      "3 hours",
      "5 hours"
    ],
    correctAnswer: 2,
    explanation: "3 hours autonomy is required where occupants sleep."
  },
  {
    id: 133,
    question: "What is the purpose of emergency lighting in corridors?",
    options: [
      "To create ambiance",
      "To guide occupants safely to exits",
      "To highlight artwork",
      "To reduce heating costs"
    ],
    correctAnswer: 1,
    explanation: "Corridor lighting guides occupants along escape routes."
  },
  {
    id: 134,
    question: "What is the minimum illuminance required on staircases?",
    options: [
      "0.5 lux",
      "1 lux",
      "5 lux",
      "10 lux"
    ],
    correctAnswer: 1,
    explanation: "Minimum 1 lux on centre line of travel is required."
  },
  {
    id: 135,
    question: "What is the purpose of emergency lighting near fire alarm call points?",
    options: [
      "To highlight them",
      "To ensure visibility and operability during power failure",
      "To warm the area",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting ensures call points are visible and operable."
  },
  {
    id: 136,
    question: "What is the typical lifespan of LED emergency luminaires?",
    options: [
      "5,000 hours",
      "25,000 hours",
      "50,000+ hours",
      "100,000 hours"
    ],
    correctAnswer: 2,
    explanation: "LED luminaires typically last over 50,000 hours."
  },
  {
    id: 137,
    question: "What is the purpose of emergency lighting in plant rooms?",
    options: [
      "For aesthetics",
      "To enable safe shutdown and evacuation",
      "To heat the room",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Plant rooms require lighting for safe shutdown and evacuation."
  },
  {
    id: 138,
    question: "What is the minimum colour rendering index (CRI) for emergency lighting?",
    options: [
      "CRI 20",
      "CRI 40",
      "CRI 60",
      "CRI 80"
    ],
    correctAnswer: 1,
    explanation: "Minimum CRI of 40 is required."
  },
  {
    id: 139,
    question: "Why must emergency lighting be maintained in unoccupied buildings?",
    options: [
      "It is not required",
      "For fire service and security staff safety",
      "For insurance purposes",
      "To prevent theft"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting is essential for emergency services and staff."
  },
  {
    id: 140,
    question: "What is the purpose of emergency lighting in disabled refuge areas?",
    options: [
      "For decoration",
      "To provide safety and visibility while awaiting rescue",
      "To heat the area",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Refuge areas require lighting for safety and reassurance."
  },
  {
    id: 141,
    question: "What is the purpose of emergency lighting above fire safety equipment?",
    options: [
      "To heat the equipment",
      "To ensure visibility and accessibility",
      "For decoration",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting ensures fire safety equipment is visible and accessible."
  },
  {
    id: 142,
    question: "What is the typical recharge time for emergency lighting batteries?",
    options: [
      "6 hours",
      "12 hours",
      "24 hours",
      "48 hours"
    ],
    correctAnswer: 2,
    explanation: "Batteries must recharge within 24 hours after full discharge."
  },
  {
    id: 143,
    question: "What is the purpose of emergency lighting in lift lobbies?",
    options: [
      "To illuminate advertisements",
      "To provide safe holding areas and guide occupants to staircases",
      "For decoration",
      "It is not required"
    ],
    correctAnswer: 1,
    explanation: "Lift lobbies serve as safe holding areas during lift failures."
  },
  {
    id: 144,
    question: "What is the purpose of emergency lighting in car parks?",
    options: [
      "No emergency lighting required",
      "Escape route lighting at pedestrian walkways and exits",
      "General illumination only",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Car parks require emergency lighting for safe evacuation."
  },
  {
    id: 145,
    question: "Why must emergency lighting be provided at the top and bottom of staircases?",
    options: [
      "For symmetry",
      "To ensure visibility and prevent falls",
      "To save costs",
      "It is optional"
    ],
    correctAnswer: 1,
    explanation: "Illumination prevents falls and ensures safe transitions."
  },
  {
    id: 146,
    question: "What is the purpose of emergency lighting in storage areas?",
    options: [
      "To see stored items better",
      "To provide escape route lighting if occupied",
      "For inventory purposes",
      "Always required"
    ],
    correctAnswer: 1,
    explanation: "Storage areas require lighting only if regularly occupied."
  },
  {
    id: 147,
    question: "What is the maximum viewing distance for exit signs?",
    options: [
      "5 meters",
      "200 times the sign height",
      "Unlimited",
      "10 meters fixed"
    ],
    correctAnswer: 1,
    explanation: "Viewing distance is approximately 200 times the sign height."
  },
  {
    id: 148,
    question: "What is the purpose of standby lighting?",
    options: [
      "Lighting that is never used",
      "Lighting to enable normal activities during supply failure",
      "Temporary lighting during construction",
      "Decorative lighting"
    ],
    correctAnswer: 1,
    explanation: "Standby lighting allows normal activities during power failure."
  },
  {
    id: 149,
    question: "What is the '50% rule' in emergency lighting battery testing?",
    options: [
      "Test only 50% of lights",
      "Battery voltage must not fall below 50% at end of rated duration",
      "Test once every 50 days",
      "Illuminate 50% of premises"
    ],
    correctAnswer: 1,
    explanation: "Battery voltage must remain above 50% after full discharge."
  },
  {
    id: 150,
    question: "What is the role of the control circuit in self-contained luminaires?",
    options: [
      "Battery charger",
      "Voltage monitoring and automatic switching to battery",
      "Manual switch",
      "Timer circuit"
    ],
    correctAnswer: 1,
    explanation: "Control circuits monitor mains voltage and switch to battery on failure."
  },

  // MODULE 4: Cabling, Battery Backup, and Circuiting (50 questions)
  {
    id: 151,
    question: "What type of cable is typically used for central battery emergency lighting systems?",
    options: [
      "Standard PVC cable",
      "Fire-resistant cable",
      "Aluminium cable",
      "Coaxial cable"
    ],
    correctAnswer: 1,
    explanation: "Fire-resistant cables are used to ensure circuit integrity during fire conditions."
  },
  {
    id: 152,
    question: "What is the minimum fire resistance period required for emergency lighting cables?",
    options: [
      "15 minutes",
      "30 minutes",
      "60 minutes",
      "90 minutes"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting cables must maintain circuit integrity for at least 30 minutes during fire."
  },
  {
    id: 153,
    question: "Why is circuit segregation important in emergency lighting systems?",
    options: [
      "To reduce installation costs",
      "To prevent a single fault from disabling all emergency lighting",
      "To simplify wiring",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Segregation ensures faults do not affect the entire emergency lighting system."
  },
  {
    id: 154,
    question: "What is the purpose of battery backup in emergency lighting?",
    options: [
      "To provide power during normal operation",
      "To supply power during mains failure",
      "To reduce energy consumption",
      "To increase brightness"
    ],
    correctAnswer: 1,
    explanation: "Battery backup supplies power when the mains supply fails."
  },
  {
    id: 155,
    question: "What is the typical voltage of emergency lighting batteries?",
    options: [
      "12V",
      "24V",
      "48V",
      "110V"
    ],
    correctAnswer: 0,
    explanation: "12V batteries are common in self-contained emergency luminaires."
  },
  {
    id: 156,
    question: "What is the function of a battery charger in emergency lighting?",
    options: [
      "To discharge the battery",
      "To maintain battery charge during normal operation",
      "To power the lamp directly",
      "To test the battery"
    ],
    correctAnswer: 1,
    explanation: "Battery chargers keep the battery fully charged during normal supply."
  },
  {
    id: 157,
    question: "What is the maximum allowed voltage drop in emergency lighting circuits?",
    options: [
      "5%",
      "10%",
      "15%",
      "20%"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop should not exceed 5% to ensure proper operation."
  },
  {
    id: 158,
    question: "Why must emergency lighting circuits be clearly identified in electrical drawings?",
    options: [
      "For aesthetic reasons",
      "To facilitate maintenance and testing",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Clear identification aids maintenance and fault finding."
  },
  {
    id: 159,
    question: "What is the purpose of a test switch in self-contained emergency luminaires?",
    options: [
      "To switch off the luminaire",
      "To simulate mains failure for testing",
      "To adjust brightness",
      "To reset the battery"
    ],
    correctAnswer: 1,
    explanation: "Test switches allow simulation of mains failure to verify operation."
  },
  {
    id: 160,
    question: "What is the typical duration of a monthly functional test for emergency lighting?",
    options: [
      "10 seconds",
      "30 seconds",
      "1 minute",
      "5 minutes"
    ],
    correctAnswer: 1,
    explanation: "Monthly tests typically last 30 seconds to verify operation."
  },
  {
    id: 161,
    question: "What is the purpose of a full duration discharge test?",
    options: [
      "To check battery capacity and autonomy",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },
  {
    id: 162,
    question: "How often should full duration discharge tests be conducted?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Full duration tests are typically conducted annually."
  },
  {
    id: 163,
    question: "What is the purpose of a central monitoring system in emergency lighting?",
    options: [
      "To control lighting levels",
      "To monitor system status and faults remotely",
      "To reduce energy consumption",
      "To provide decorative effects"
    ],
    correctAnswer: 1,
    explanation: "Central monitoring allows remote status and fault detection."
  },
  {
    id: 164,
    question: "What is the typical battery type used in central battery systems?",
    options: [
      "Lead-acid",
      "Nickel-cadmium",
      "Lithium-ion",
      "Alkaline"
    ],
    correctAnswer: 0,
    explanation: "Lead-acid batteries are commonly used in central battery systems."
  },
  {
    id: 165,
    question: "Why is fire resistance important for emergency lighting cables?",
    options: [
      "To reduce costs",
      "To maintain circuit integrity during fire",
      "To improve aesthetics",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Fire resistance ensures emergency lighting remains operational during fire."
  },
  {
    id: 166,
    question: "What is the maximum allowed ambient temperature for emergency lighting batteries?",
    options: [
      "20°C",
      "25°C",
      "30°C",
      "40°C"
    ],
    correctAnswer: 2,
    explanation: "Batteries typically operate optimally up to 30°C."
  },
  {
    id: 167,
    question: "What is the purpose of circuit segregation in emergency lighting?",
    options: [
      "To reduce installation complexity",
      "To prevent total system failure from a single fault",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Segregation prevents a single fault from disabling all emergency lighting."
  },
  {
    id: 168,
    question: "What is the typical voltage of self-contained emergency lighting batteries?",
    options: [
      "6V",
      "12V",
      "24V",
      "48V"
    ],
    correctAnswer: 1,
    explanation: "12V batteries are common in self-contained luminaires."
  },
  {
    id: 169,
    question: "What is the function of a battery charger in emergency lighting?",
    options: [
      "To discharge the battery",
      "To maintain battery charge",
      "To power the lamp directly",
      "To test the battery"
    ],
    correctAnswer: 1,
    explanation: "Battery chargers maintain the battery charge during normal operation."
  },
  {
    id: 170,
    question: "What is the maximum allowed voltage drop in emergency lighting circuits?",
    options: [
      "3%",
      "5%",
      "10%",
      "15%"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop should not exceed 5% to ensure proper operation."
  },
  {
    id: 171,
    question: "Why must emergency lighting circuits be clearly identified?",
    options: [
      "For aesthetic reasons",
      "To facilitate maintenance and testing",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Clear identification aids maintenance and fault finding."
  },
  {
    id: 172,
    question: "What is the purpose of a test switch in self-contained luminaires?",
    options: [
      "To switch off the luminaire",
      "To simulate mains failure for testing",
      "To adjust brightness",
      "To reset the battery"
    ],
    correctAnswer: 1,
    explanation: "Test switches allow simulation of mains failure to verify operation."
  },
  {
    id: 173,
    question: "What is the typical duration of a monthly functional test?",
    options: [
      "10 seconds",
      "30 seconds",
      "1 minute",
      "5 minutes"
    ],
    correctAnswer: 1,
    explanation: "Monthly tests typically last 30 seconds."
  },
  {
    id: 174,
    question: "What is the purpose of a full duration discharge test?",
    options: [
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },
  {
    id: 175,
    question: "How often should full duration discharge tests be conducted?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Full duration tests are typically conducted annually."
  },
  {
    id: 176,
    question: "What is the purpose of a central monitoring system?",
    options: [
      "To control lighting levels",
      "To monitor system status and faults remotely",
      "To reduce energy consumption",
      "To provide decorative effects"
    ],
    correctAnswer: 1,
    explanation: "Central monitoring allows remote status and fault detection."
  },
  {
    id: 177,
    question: "What is the typical battery type used in central battery systems?",
    options: [
      "Lead-acid",
      "Nickel-cadmium",
      "Lithium-ion",
      "Alkaline"
    ],
    correctAnswer: 0,
    explanation: "Lead-acid batteries are commonly used in central battery systems."
  },
  {
    id: 178,
    question: "Why is fire resistance important for emergency lighting cables?",
    options: [
      "To reduce costs",
      "To maintain circuit integrity during fire",
      "To improve aesthetics",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Fire resistance ensures emergency lighting remains operational during fire."
  },
  {
    id: 179,
    question: "What is the maximum allowed ambient temperature for emergency lighting batteries?",
    options: [
      "20°C",
      "25°C",
      "30°C",
      "40°C"
    ],
    correctAnswer: 2,
    explanation: "Batteries typically operate optimally up to 30°C."
  },
  {
    id: 180,
    question: "What is the purpose of circuit segregation in emergency lighting?",
    options: [
      "To reduce installation complexity",
      "To prevent total system failure from a single fault",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Segregation prevents a single fault from disabling all emergency lighting."
  },
  {
    id: 181,
    question: "What is the typical voltage of self-contained emergency lighting batteries?",
    options: [
      "6V",
      "12V",
      "24V",
      "48V"
    ],
    correctAnswer: 1,
    explanation: "12V batteries are common in self-contained luminaires."
  },
  {
    id: 182,
    question: "What is the function of a battery charger in emergency lighting?",
    options: [
      "To discharge the battery",
      "To maintain battery charge",
      "To power the lamp directly",
      "To test the battery"
    ],
    correctAnswer: 1,
    explanation: "Battery chargers maintain the battery charge during normal operation."
  },
  {
    id: 183,
    question: "What is the maximum allowed voltage drop in emergency lighting circuits?",
    options: [
      "3%",
      "5%",
      "10%",
      "15%"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop should not exceed 5% to ensure proper operation."
  },
  {
    id: 184,
    question: "Why must emergency lighting circuits be clearly identified?",
    options: [
      "For aesthetic reasons",
      "To facilitate maintenance and testing",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Clear identification aids maintenance and fault finding."
  },
  {
    id: 185,
    question: "What is the purpose of a test switch in self-contained luminaires?",
    options: [
      "To switch off the luminaire",
      "To simulate mains failure for testing",
      "To adjust brightness",
      "To reset the battery"
    ],
    correctAnswer: 1,
    explanation: "Test switches allow simulation of mains failure to verify operation."
  },
  {
    id: 186,
    question: "What is the typical duration of a monthly functional test?",
    options: [
      "10 seconds",
      "30 seconds",
      "1 minute",
      "5 minutes"
    ],
    correctAnswer: 1,
    explanation: "Monthly tests typically last 30 seconds."
  },
  {
    id: 187,
    question: "What is the purpose of a full duration discharge test?",
    options: [
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },
  {
    id: 188,
    question: "How often should full duration discharge tests be conducted?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Full duration tests are typically conducted annually."
  },
  {
    id: 189,
    question: "What is the purpose of a central monitoring system?",
    options: [
      "To control lighting levels",
      "To monitor system status and faults remotely",
      "To reduce energy consumption",
      "To provide decorative effects"
    ],
    correctAnswer: 1,
    explanation: "Central monitoring allows remote status and fault detection."
  },
  {
    id: 190,
    question: "What is the typical battery type used in central battery systems?",
    options: [
      "Lead-acid",
      "Nickel-cadmium",
      "Lithium-ion",
      "Alkaline"
    ],
    correctAnswer: 0,
    explanation: "Lead-acid batteries are commonly used in central battery systems."
  },
  {
    id: 191,
    question: "Why is fire resistance important for emergency lighting cables?",
    options: [
      "To reduce costs",
      "To maintain circuit integrity during fire",
      "To improve aesthetics",
      "It is not important"
    ],
    correctAnswer: 1,
    explanation: "Fire resistance ensures emergency lighting remains operational during fire."
  },
  {
    id: 192,
    question: "What is the maximum allowed ambient temperature for emergency lighting batteries?",
    options: [
      "20°C",
      "25°C",
      "30°C",
      "40°C"
    ],
    correctAnswer: 2,
    explanation: "Batteries typically operate optimally up to 30°C."
  },
  {
    id: 193,
    question: "What is the purpose of circuit segregation in emergency lighting?",
    options: [
      "To reduce installation complexity",
      "To prevent total system failure from a single fault",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Segregation prevents a single fault from disabling all emergency lighting."
  },
  {
    id: 194,
    question: "What is the typical voltage of self-contained emergency lighting batteries?",
    options: [
      "6V",
      "12V",
      "24V",
      "48V"
    ],
    correctAnswer: 1,
    explanation: "12V batteries are common in self-contained luminaires."
  },
  {
    id: 195,
    question: "What is the function of a battery charger in emergency lighting?",
    options: [
      "To discharge the battery",
      "To maintain battery charge",
      "To power the lamp directly",
      "To test the battery"
    ],
    correctAnswer: 1,
    explanation: "Battery chargers maintain the battery charge during normal operation."
  },
  {
    id: 196,
    question: "What is the maximum allowed voltage drop in emergency lighting circuits?",
    options: [
      "3%",
      "5%",
      "10%",
      "15%"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop should not exceed 5% to ensure proper operation."
  },
  {
    id: 197,
    question: "Why must emergency lighting circuits be clearly identified?",
    options: [
      "For aesthetic reasons",
      "To facilitate maintenance and testing",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Clear identification aids maintenance and fault finding."
  },
  {
    id: 198,
    question: "What is the purpose of a test switch in self-contained luminaires?",
    options: [
      "To switch off the luminaire",
      "To simulate mains failure for testing",
      "To adjust brightness",
      "To reset the battery"
    ],
    correctAnswer: 1,
    explanation: "Test switches allow simulation of mains failure to verify operation."
  },
  {
    id: 199,
    question: "What is the typical duration of a monthly functional test?",
    options: [
      "10 seconds",
      "30 seconds",
      "1 minute",
      "5 minutes"
    ],
    correctAnswer: 1,
    explanation: "Monthly tests typically last 30 seconds."
  },
  {
    id: 200,
    question: "What is the purpose of a full duration discharge test?",
    options: [
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },

  // MODULE 5: Installation, Testing, and Maintenance (50 questions)
  {
    id: 201,
    question: "How often should emergency lighting systems be tested according to BS 5266-1?",
    options: [
      "Monthly functional tests and annual full duration tests",
      "Weekly tests only",
      "Annual tests only",
      "No testing required"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests and annual full duration tests are required."
  },
  {
    id: 202,
    question: "What is the purpose of monthly functional tests?",
    options: [
      "To check battery capacity",
      "To verify operation of emergency lighting for a short period",
      "To test wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 1,
    explanation: "Monthly tests verify operation for a short duration."
  },
  {
    id: 203,
    question: "What is the purpose of annual full duration tests?",
    options: [
      "To check battery capacity and autonomy",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Annual tests verify battery capacity and autonomy."
  },
  {
    id: 204,
    question: "Who is responsible for maintaining emergency lighting systems?",
    options: [
      "The building owner or responsible person",
      "The fire brigade",
      "The local council",
      "The occupants"
    ],
    correctAnswer: 0,
    explanation: "The responsible person must ensure maintenance."
  },
  {
    id: 205,
    question: "What records must be kept for emergency lighting maintenance?",
    options: [
      "Test results, faults, repairs, and replacements",
      "Purchase receipts only",
      "No records required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive records of tests and maintenance must be kept."
  },
  {
    id: 206,
    question: "What is the recommended action if an emergency luminaire fails a test?",
    options: [
      "Ignore and continue use",
      "Repair or replace promptly",
      "Turn off the luminaire",
      "Reduce testing frequency"
    ],
    correctAnswer: 1,
    explanation: "Faulty luminaires must be repaired or replaced promptly."
  },
  {
    id: 207,
    question: "What is the purpose of commissioning emergency lighting?",
    options: [
      "To verify correct installation and operation",
      "To decorate the building",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning ensures the system meets design and regulatory requirements."
  },
  {
    id: 208,
    question: "What is the typical duration of a commissioning test?",
    options: [
      "30 seconds",
      "1 hour",
      "3 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "Commissioning includes full duration tests, often 3 hours where required."
  },
  {
    id: 209,
    question: "What is the purpose of visual inspections during maintenance?",
    options: [
      "To check for physical damage and cleanliness",
      "To test battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Visual inspections identify physical issues affecting performance."
  },
  {
    id: 210,
    question: "What is the recommended frequency for visual inspections?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Quarterly visual inspections are recommended."
  },
  {
    id: 211,
    question: "What is the purpose of functional testing?",
    options: [
      "To verify operation under simulated failure",
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Functional tests simulate mains failure to verify operation."
  },
  {
    id: 212,
    question: "What is the recommended frequency for functional testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests are required."
  },
  {
    id: 213,
    question: "What is the purpose of full duration testing?",
    options: [
      "To verify battery capacity and autonomy",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },
  {
    id: 214,
    question: "What is the recommended frequency for full duration testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual full duration tests are required."
  },
  {
    id: 215,
    question: "What is the purpose of battery replacement in emergency lighting?",
    options: [
      "To maintain autonomy and reliability",
      "To increase brightness",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Batteries degrade and must be replaced to maintain performance."
  },
  {
    id: 216,
    question: "What is the typical battery life in emergency lighting?",
    options: [
      "1-2 years",
      "3-5 years",
      "10 years",
      "20 years"
    ],
    correctAnswer: 1,
    explanation: "Batteries typically last 3-5 years depending on type and usage."
  },
  {
    id: 217,
    question: "What is the purpose of lamp replacement in emergency lighting?",
    options: [
      "To maintain required illumination levels",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Lamps degrade and must be replaced to maintain illumination."
  },
  {
    id: 218,
    question: "What is the typical lamp life in emergency lighting?",
    options: [
      "1,000 hours",
      "5,000 hours",
      "10,000 hours",
      "50,000 hours"
    ],
    correctAnswer: 2,
    explanation: "Emergency lamps typically last around 10,000 hours."
  },
  {
    id: 219,
    question: "What is the purpose of cleaning emergency luminaires?",
    options: [
      "To improve aesthetics",
      "To maintain light output and performance",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Cleaning removes dust and dirt that reduce light output."
  },
  {
    id: 220,
    question: "What is the recommended frequency for cleaning emergency luminaires?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual cleaning is typically recommended."
  },
  {
    id: 221,
    question: "What is the purpose of documentation in emergency lighting maintenance?",
    options: [
      "To provide evidence of compliance",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Documentation provides evidence of compliance and maintenance history."
  },
  {
    id: 222,
    question: "What should be included in emergency lighting maintenance records?",
    options: [
      "Test results, faults, repairs, replacements, and inspections",
      "Purchase receipts only",
      "No records required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive records are required for compliance."
  },
  {
    id: 223,
    question: "Who should perform emergency lighting maintenance?",
    options: [
      "Qualified personnel",
      "Building occupants",
      "Fire brigade",
      "Local council"
    ],
    correctAnswer: 0,
    explanation: "Maintenance should be performed by qualified personnel."
  },
  {
    id: 224,
    question: "What is the purpose of commissioning emergency lighting?",
    options: [
      "To verify correct installation and operation",
      "To decorate the building",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning ensures the system meets design and regulatory requirements."
  },
  {
    id: 225,
    question: "What is the typical duration of commissioning tests?",
    options: [
      "30 seconds",
      "1 hour",
      "3 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "Commissioning includes full duration tests, often 3 hours where required."
  },
  {
    id: 226,
    question: "What is the purpose of visual inspections during maintenance?",
    options: [
      "To check for physical damage and cleanliness",
      "To test battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Visual inspections identify physical issues affecting performance."
  },
  {
    id: 227,
    question: "What is the recommended frequency for visual inspections?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Quarterly visual inspections are recommended."
  },
  {
    id: 228,
    question: "What is the purpose of functional testing?",
    options: [
      "To verify operation under simulated failure",
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Functional tests simulate mains failure to verify operation."
  },
  {
    id: 229,
    question: "What is the recommended frequency for functional testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests are required."
  },
  {
    id: 230,
    question: "What is the purpose of full duration testing?",
    options: [
      "To verify battery capacity and autonomy",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity and autonomy."
  },
  {
    id: 231,
    question: "What is the recommended frequency for full duration testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual full duration tests are required."
  },
  {
    id: 232,
    question: "What is the purpose of battery replacement in emergency lighting?",
    options: [
      "To maintain autonomy and reliability",
      "To increase brightness",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Batteries degrade and must be replaced to maintain performance."
  },
  {
    id: 233,
    question: "What is the typical battery life in emergency lighting?",
    options: [
      "1-2 years",
      "3-5 years",
      "10 years",
      "20 years"
    ],
    correctAnswer: 1,
    explanation: "Batteries typically last 3-5 years depending on type and usage."
  },
  {
    id: 234,
    question: "What is the purpose of lamp replacement in emergency lighting?",
    options: [
      "To maintain required illumination levels",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Lamps degrade and must be replaced to maintain illumination."
  },
  {
    id: 235,
    question: "What is the typical lamp life in emergency lighting?",
    options: [
      "1,000 hours",
      "5,000 hours",
      "10,000 hours",
      "50,000 hours"
    ],
    correctAnswer: 2,
    explanation: "Emergency lamps typically last around 10,000 hours."
  },
  {
    id: 236,
    question: "What is the purpose of cleaning emergency luminaires?",
    options: [
      "To improve aesthetics",
      "To maintain light output and performance",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Cleaning removes dust and dirt that reduce light output."
  },
  {
    id: 237,
    question: "What is the recommended frequency for cleaning emergency luminaires?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual cleaning is typically recommended."
  },
  {
    id: 238,
    question: "What is the purpose of documentation in emergency lighting maintenance?",
    options: [
      "To provide evidence of compliance",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Documentation provides evidence of compliance and maintenance history."
  },
  {
    id: 239,
    question: "What should be included in emergency lighting maintenance records?",
    options: [
      "Test results, faults, repairs, replacements, and inspections",
      "Purchase receipts only",
      "No records required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive records are required for compliance."
  },
  {
    id: 240,
    question: "Who should perform emergency lighting maintenance?",
    options: [
      "Qualified personnel",
      "Building occupants",
      "Fire brigade",
      "Local council"
    ],
    correctAnswer: 0,
    explanation: "Maintenance should be performed by qualified personnel."
  },

  // MODULE 6: Regulatory Compliance and BS 5266 (50 questions)
  {
    id: 241,
    question: "What is the primary UK standard for emergency lighting?",
    options: [
      "BS 5266-1",
      "BS 7671",
      "BS EN 1838",
      "BS 5839"
    ],
    correctAnswer: 0,
    explanation: "BS 5266-1 is the primary UK standard for emergency lighting."
  },
  {
    id: 242,
    question: "What does BS EN 1838 specify?",
    options: [
      "Photometric requirements for emergency lighting",
      "Electrical installation requirements",
      "Fire alarm system requirements",
      "Building regulations"
    ],
    correctAnswer: 0,
    explanation: "BS EN 1838 specifies photometric performance requirements."
  },
  {
    id: 243,
    question: "What is the Regulatory Reform (Fire Safety) Order 2005?",
    options: [
      "UK legislation mandating fire safety including emergency lighting",
      "A building code",
      "An electrical standard",
      "A fire alarm standard"
    ],
    correctAnswer: 0,
    explanation: "The Fire Safety Order mandates fire safety including emergency lighting."
  },
  {
    id: 244,
    question: "Who is the 'responsible person' under the Fire Safety Order?",
    options: [
      "Building owner or employer",
      "Fire brigade",
      "Local council",
      "Occupants"
    ],
    correctAnswer: 0,
    explanation: "The responsible person ensures fire safety compliance."
  },
  {
    id: 245,
    question: "What are the consequences of non-compliance with emergency lighting regulations?",
    options: [
      "Fines, prohibition notices, and imprisonment",
      "No consequences",
      "Verbal warnings only",
      "Small fines only"
    ],
    correctAnswer: 0,
    explanation: "Non-compliance can lead to serious legal penalties."
  },
  {
    id: 246,
    question: "What is the purpose of fire risk assessments?",
    options: [
      "To evaluate fire safety measures including emergency lighting",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Risk assessments evaluate adequacy of fire safety measures."
  },
  {
    id: 247,
    question: "What documentation is required for emergency lighting compliance?",
    options: [
      "Design calculations, drawings, certificates, and maintenance records",
      "Purchase receipts only",
      "No documentation required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive documentation is required for compliance."
  },
  {
    id: 248,
    question: "What is the purpose of commissioning certificates?",
    options: [
      "To confirm system meets design and regulatory requirements",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning certificates confirm compliance."
  },
  {
    id: 249,
    question: "What is the role of the local fire authority in emergency lighting?",
    options: [
      "To enforce fire safety regulations",
      "To install emergency lighting",
      "To maintain emergency lighting",
      "To design emergency lighting"
    ],
    correctAnswer: 0,
    explanation: "Fire authorities enforce compliance with fire safety laws."
  },
  {
    id: 250,
    question: "What is the minimum duration for emergency lighting in sleeping accommodation?",
    options: [
      "1 hour",
      "2 hours",
      "3 hours",
      "4 hours"
    ],
    correctAnswer: 2,
    explanation: "3 hours minimum duration is required where occupants sleep."
  },
  {
    id: 251,
    question: "What is the minimum duration for emergency lighting in other premises?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours"
    ],
    correctAnswer: 1,
    explanation: "1 hour minimum duration is required in most premises."
  },
  {
    id: 252,
    question: "What is the purpose of BS 5266-1?",
    options: [
      "To provide guidance on emergency lighting design, installation, and maintenance",
      "To specify fire alarm systems",
      "To regulate electrical installations",
      "To provide building codes"
    ],
    correctAnswer: 0,
    explanation: "BS 5266-1 covers emergency lighting throughout its lifecycle."
  },
  {
    id: 253,
    question: "What is the role of BS 7671 in emergency lighting?",
    options: [
      "Electrical installation requirements",
      "Photometric requirements",
      "Fire safety regulations",
      "Building codes"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 covers electrical installation standards."
  },
  {
    id: 254,
    question: "What is the purpose of BS 5839?",
    options: [
      "Fire alarm system requirements",
      "Emergency lighting design",
      "Electrical installation",
      "Building regulations"
    ],
    correctAnswer: 0,
    explanation: "BS 5839 covers fire alarm systems."
  },
  {
    id: 255,
    question: "What is the purpose of the Building Regulations Approved Document B?",
    options: [
      "Fire safety including emergency lighting requirements",
      "Electrical installation",
      "Structural design",
      "Energy efficiency"
    ],
    correctAnswer: 0,
    explanation: "Approved Document B covers fire safety including emergency lighting."
  },
  {
    id: 256,
    question: "What is the role of the Health and Safety at Work Act in emergency lighting?",
    options: [
      "To ensure safe working environments including emergency lighting",
      "To regulate building design",
      "To specify electrical standards",
      "To provide fire alarm requirements"
    ],
    correctAnswer: 0,
    explanation: "The Act requires safe workplaces including emergency lighting."
  },
  {
    id: 257,
    question: "What is the purpose of emergency lighting in fire risk assessments?",
    options: [
      "To evaluate adequacy and compliance",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Emergency lighting adequacy must be assessed in risk assessments."
  },
  {
    id: 258,
    question: "What is the purpose of emergency lighting maintenance records?",
    options: [
      "To provide evidence of compliance",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Records provide evidence of compliance and maintenance."
  },
  {
    id: 259,
    question: "Who is responsible for emergency lighting compliance?",
    options: [
      "The responsible person",
      "The fire brigade",
      "The local council",
      "The occupants"
    ],
    correctAnswer: 0,
    explanation: "The responsible person ensures compliance."
  },
  {
    id: 260,
    question: "What is the consequence of failing to maintain emergency lighting?",
    options: [
      "Increased risk of injury and legal penalties",
      "No consequences",
      "Verbal warnings only",
      "Small fines only"
    ],
    correctAnswer: 0,
    explanation: "Failure to maintain can lead to serious risks and penalties."
  },
  {
    id: 261,
    question: "What is the purpose of emergency lighting commissioning?",
    options: [
      "To verify correct installation and operation",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning ensures compliance and functionality."
  },
  {
    id: 262,
    question: "What is the typical duration of commissioning tests?",
    options: [
      "30 seconds",
      "1 hour",
      "3 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "Commissioning includes full duration tests."
  },
  {
    id: 263,
    question: "What is the purpose of emergency lighting visual inspections?",
    options: [
      "To check for physical damage and cleanliness",
      "To test battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Visual inspections identify physical issues."
  },
  {
    id: 264,
    question: "What is the recommended frequency for visual inspections?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Quarterly inspections are recommended."
  },
  {
    id: 265,
    question: "What is the purpose of emergency lighting functional testing?",
    options: [
      "To verify operation under simulated failure",
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring integrity"
    ],
    correctAnswer: 0,
    explanation: "Functional tests simulate mains failure."
  },
  {
    id: 266,
    question: "What is the recommended frequency for functional testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests are required."
  },
  {
    id: 267,
    question: "What is the purpose of full duration testing?",
    options: [
      "To verify battery capacity and autonomy",
      "To test lamp brightness",
      "To check wiring integrity",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity."
  },
  {
    id: 268,
    question: "What is the recommended frequency for full duration testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual full duration tests are required."
  },
  {
    id: 269,
    question: "What is the purpose of battery replacement?",
    options: [
      "To maintain autonomy and reliability",
      "To increase brightness",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Batteries degrade and must be replaced."
  },
  {
    id: 270,
    question: "What is the typical battery life?",
    options: [
      "1-2 years",
      "3-5 years",
      "10 years",
      "20 years"
    ],
    correctAnswer: 1,
    explanation: "Batteries typically last 3-5 years."
  },
  {
    id: 271,
    question: "What is the purpose of lamp replacement?",
    options: [
      "To maintain illumination levels",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Lamps degrade and must be replaced."
  },
  {
    id: 272,
    question: "What is the typical lamp life?",
    options: [
      "1,000 hours",
      "5,000 hours",
      "10,000 hours",
      "50,000 hours"
    ],
    correctAnswer: 2,
    explanation: "Emergency lamps last around 10,000 hours."
  },
  {
    id: 273,
    question: "What is the purpose of cleaning emergency luminaires?",
    options: [
      "To improve aesthetics",
      "To maintain light output",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Cleaning maintains light output."
  },
  {
    id: 274,
    question: "What is the recommended frequency for cleaning?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual cleaning is recommended."
  },
  {
    id: 275,
    question: "What is the purpose of documentation?",
    options: [
      "To provide evidence of compliance",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Documentation provides evidence of compliance."
  },
  {
    id: 276,
    question: "What should be included in maintenance records?",
    options: [
      "Test results, faults, repairs, replacements",
      "Purchase receipts only",
      "No records required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive records are required."
  },
  {
    id: 277,
    question: "Who should perform maintenance?",
    options: [
      "Qualified personnel",
      "Building occupants",
      "Fire brigade",
      "Local council"
    ],
    correctAnswer: 0,
    explanation: "Qualified personnel should perform maintenance."
  },
  {
    id: 278,
    question: "What is the purpose of commissioning?",
    options: [
      "To verify installation and operation",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning ensures compliance."
  },
  {
    id: 279,
    question: "What is the typical duration of commissioning tests?",
    options: [
      "30 seconds",
      "1 hour",
      "3 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "Commissioning includes full duration tests."
  },
  {
    id: 280,
    question: "What is the purpose of visual inspections?",
    options: [
      "To check for damage and cleanliness",
      "To test battery capacity",
      "To test lamp brightness",
      "To check wiring"
    ],
    correctAnswer: 0,
    explanation: "Visual inspections identify physical issues."
  },
  {
    id: 281,
    question: "What is the recommended frequency for visual inspections?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Quarterly inspections are recommended."
  },
  {
    id: 282,
    question: "What is the purpose of functional testing?",
    options: [
      "To verify operation under failure",
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring"
    ],
    correctAnswer: 0,
    explanation: "Functional tests simulate failure."
  },
  {
    id: 283,
    question: "What is the recommended frequency for functional testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests are required."
  },
  {
    id: 284,
    question: "What is the purpose of full duration testing?",
    options: [
      "To verify battery capacity",
      "To test lamp brightness",
      "To check wiring",
      "To test control circuits"
    ],
    correctAnswer: 0,
    explanation: "Full duration tests verify battery capacity."
  },
  {
    id: 285,
    question: "What is the recommended frequency for full duration testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual full duration tests are required."
  },
  {
    id: 286,
    question: "What is the purpose of battery replacement?",
    options: [
      "To maintain autonomy",
      "To increase brightness",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Batteries degrade and must be replaced."
  },
  {
    id: 287,
    question: "What is the typical battery life?",
    options: [
      "1-2 years",
      "3-5 years",
      "10 years",
      "20 years"
    ],
    correctAnswer: 1,
    explanation: "Batteries last 3-5 years."
  },
  {
    id: 288,
    question: "What is the purpose of lamp replacement?",
    options: [
      "To maintain illumination",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Lamps degrade and must be replaced."
  },
  {
    id: 289,
    question: "What is the typical lamp life?",
    options: [
      "1,000 hours",
      "5,000 hours",
      "10,000 hours",
      "50,000 hours"
    ],
    correctAnswer: 2,
    explanation: "Lamps last around 10,000 hours."
  },
  {
    id: 290,
    question: "What is the purpose of cleaning?",
    options: [
      "To improve aesthetics",
      "To maintain light output",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Cleaning maintains light output."
  },
  {
    id: 291,
    question: "What is the recommended frequency for cleaning?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "Annual cleaning is recommended."
  },
  {
    id: 292,
    question: "What is the purpose of documentation?",
    options: [
      "To provide evidence of compliance",
      "To reduce costs",
      "To improve aesthetics",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Documentation provides evidence of compliance."
  },
  {
    id: 293,
    question: "What should be included in records?",
    options: [
      "Test results, faults, repairs, replacements",
      "Purchase receipts only",
      "No records required",
      "Photographs only"
    ],
    correctAnswer: 0,
    explanation: "Comprehensive records are required."
  },
  {
    id: 294,
    question: "Who should perform maintenance?",
    options: [
      "Qualified personnel",
      "Building occupants",
      "Fire brigade",
      "Local council"
    ],
    correctAnswer: 0,
    explanation: "Qualified personnel should perform maintenance."
  },
  {
    id: 295,
    question: "What is the purpose of commissioning?",
    options: [
      "To verify installation and operation",
      "To decorate buildings",
      "To reduce costs",
      "It is not necessary"
    ],
    correctAnswer: 0,
    explanation: "Commissioning ensures compliance."
  },
  {
    id: 296,
    question: "What is the typical duration of commissioning tests?",
    options: [
      "30 seconds",
      "1 hour",
      "3 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "Commissioning includes full duration tests."
  },
  {
    id: 297,
    question: "What is the purpose of visual inspections?",
    options: [
      "To check for damage and cleanliness",
      "To test battery capacity",
      "To test lamp brightness",
      "To check wiring"
    ],
    correctAnswer: 0,
    explanation: "Visual inspections identify physical issues."
  },
  {
    id: 298,
    question: "What is the recommended frequency for visual inspections?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Quarterly inspections are recommended."
  },
  {
    id: 299,
    question: "What is the purpose of functional testing?",
    options: [
      "To verify operation under failure",
      "To check battery capacity",
      "To test lamp brightness",
      "To check wiring"
    ],
    correctAnswer: 0,
    explanation: "Functional tests simulate failure."
  },
  {
    id: 300,
    question: "What is the recommended frequency for functional testing?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually",
      "Every 5 years"
    ],
    correctAnswer: 0,
    explanation: "Monthly functional tests are required."
  }
];

// Function to get random questions for mock exam
export const getRandomEmergencyLightingMockExamQuestions = (questionCount: number = 30): QuizQuestion[] => {
  // Add moduleId to each question based on id (50 questions per module)
  const questionsWithModuleId = emergencyLightingMockExamQuestions.map(q => ({
    ...q,
    moduleId: Math.ceil(q.id / 50)
  }));
  
  const shuffled = [...questionsWithModuleId].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, questionCount);
};
