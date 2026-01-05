export const circuitSegregationQuizQuestions = [
  {
    id: 1,
    question: "Why must emergency lighting circuits be segregated from normal power circuits?",
    options: [
      "To reduce installation costs and simplify wiring",
      "To prevent faults in normal circuits from disabling emergency lighting and ensure fire integrity",
      "To comply with aesthetic design requirements",
      "To allow emergency circuits to share distribution boards with general lighting"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting circuits must be segregated to prevent faults in normal circuits from affecting emergency operation, ensure circuit integrity during fire conditions, and maintain clear identification for safe maintenance. This segregation is fundamental to life-safety system reliability."
  },
  {
    id: 2,
    question: "What is the minimum survival time requirement for enhanced fire-resistant cables (Category F1) under BS EN 50200?",
    options: [
      "30 minutes at 650°C",
      "60 minutes at 750°C",
      "120 minutes at 842°C",
      "180 minutes at 950°C"
    ],
    correctAnswer: 2,
    explanation: "Enhanced fire-resistant cables (Category F1) must survive up to 120 minutes at 842°C under BS EN 50200 test conditions. They must also withstand mechanical shock and water spray during fire exposure to maintain circuit integrity throughout the emergency duration."
  },
  {
    id: 3,
    question: "Which BS 7671 regulation specifically requires escape route circuits to be protected against premature collapse and prohibits plastic-only cable fixings?",
    options: [
      "Regulation 314.1",
      "Regulation 433.1.1",
      "Regulation 521.10.202",
      "Regulation 537.4.2.5"
    ],
    correctAnswer: 2,
    explanation: "Regulation 521.10.202 requires escape route circuits to be protected against premature collapse during fire conditions. This includes using non-combustible fixings (metal clips or saddles), enhanced fire-resistant cables, and adequate mechanical protection throughout the installation."
  },
  {
    id: 4,
    question: "Which method provides the BEST segregation for emergency lighting circuits?",
    options: [
      "Running emergency cables alongside general lighting in the same cable tray with cable ties",
      "Using dedicated conduits, trunking, or trays exclusively for emergency circuits",
      "Installing emergency circuits in plastic trunking separate from other services",
      "Sharing distribution boards between emergency and general lighting with separate sections"
    ],
    correctAnswer: 1,
    explanation: "Dedicated containment (separate conduits, trunking, or trays exclusively for emergency circuits) is the preferred and most effective segregation method. This provides complete physical separation, prevents any cross-connection, and ensures maximum protection against fire spread from other circuits."
  },
  {
    id: 5,
    question: "Why is it important to label emergency lighting circuits clearly throughout the installation?",
    options: [
      "To comply with aesthetic design standards and improve appearance",
      "To reduce material costs by using fewer cables",
      "To ensure safe testing, maintenance, and prevent unauthorised connections",
      "To allow emergency circuits to be easily disconnected during normal operation"
    ],
    correctAnswer: 2,
    explanation: "Clear labelling (every 3 metres and at all access points) ensures safe testing and fault-finding, prevents unauthorised connections to emergency circuits, allows quick identification during maintenance, and confirms segregation is maintained throughout the installation's operational life."
  },
  {
    id: 6,
    question: "What are the primary benefits of using LSZH (Low Smoke Zero Halogen) cables in emergency lighting installations?",
    options: [
      "They are cheaper than standard PVC cables and easier to install",
      "They reduce smoke production and eliminate toxic halogen gases during fire",
      "They require less mechanical protection than other cable types",
      "They can be installed using plastic fixings instead of metal clips"
    ],
    correctAnswer: 1,
    explanation: "LSZH cables reduce smoke production by up to 80% compared to PVC and eliminate toxic halogen gases (chlorine, fluorine). This improves visibility during evacuation, reduces respiratory hazards, and complies with building regulations for public and high-occupancy buildings."
  },
  {
    id: 7,
    question: "Where should emergency lighting circuits ideally NOT be routed, even with enhanced protection?",
    options: [
      "Protected fire-rated shafts and dedicated risers",
      "Ceiling voids with adequate fire stopping",
      "Commercial kitchens, boiler rooms, and chemical storage areas",
      "Accessible corridors with metal conduit protection"
    ],
    correctAnswer: 2,
    explanation: "Emergency lighting circuits should avoid high-risk areas such as commercial kitchens, boiler and plant rooms, chemical storage areas, and locations with high-temperature processes or flammable materials. Where unavoidable, enhanced protection (MICC cable, steel conduit, fire-rated enclosures) is essential."
  },
  {
    id: 8,
    question: "What is the main risk of using plastic trunking alone for emergency lighting circuits?",
    options: [
      "Plastic trunking is more expensive than metal alternatives",
      "Plastic trunking will fail under fire conditions, compromising circuit integrity",
      "Plastic trunking cannot accommodate LSZH cables",
      "Plastic trunking requires more frequent maintenance inspections"
    ],
    correctAnswer: 1,
    explanation: "Plastic trunking will melt and collapse under fire conditions, destroying the emergency lighting circuits it contains. This violates BS 7671 Regulation 521.10.202 and BS 5266-1 requirements for circuit integrity. Only metal containment (steel conduit, trunking, or trays) is acceptable for emergency circuits."
  },
  {
    id: 9,
    question: "Why are dedicated distribution boards recommended for emergency lighting systems?",
    options: [
      "To reduce the number of circuit breakers required in the installation",
      "To ensure complete segregation, independent protection, and prevent cross-connection with normal circuits",
      "To allow emergency lighting to be easily disconnected when not needed",
      "To share neutral conductors between emergency and normal lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "Dedicated distribution boards (or clearly marked dedicated sections) ensure complete segregation, provide independent overcurrent and earth fault protection, allow clear identification for maintenance, and prevent any accidental cross-connection with normal power circuits. This is best practice for larger and high-risk installations."
  },
  {
    id: 10,
    question: "In the London office refurbishment case study, what was the main compliance problem that caused the installation to fail inspection?",
    options: [
      "The emergency lighting luminaires were installed at incorrect mounting heights",
      "Emergency lighting cables were run in plastic trunking shared with data and general power cables",
      "The emergency duration testing was not conducted properly",
      "The building had insufficient emergency lighting coverage in escape routes"
    ],
    correctAnswer: 1,
    explanation: "The critical failure was running emergency lighting cables in plastic trunking shared with data and general power cables. This violated BS 7671 Regulation 521.10.202 and BS 5266-1 because the plastic trunking would fail under fire, compromising circuit integrity. The installation required complete re-routing with dedicated steel containment, LSZH cables, and metal fixings at a cost exceeding £94,000."
  }
];
