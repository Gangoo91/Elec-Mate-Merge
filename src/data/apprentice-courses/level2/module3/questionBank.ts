export interface QuestionBank {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
}

export const module3QuestionBank: QuestionBank[] = [
  // Section 3.1: Types of Wiring Systems and Cable Types (45 questions)
  {
    id: 1,
    question: 'What is the most common type of cable used for fixed domestic wiring in the UK?',
    options: [
      'Three-core flexible cord',
      'Twin and earth cable',
      'Single core cables',
      'Coaxial cable',
    ],
    correctAnswer: 1,
    explanation:
      'Twin and earth cable (flat PVC) is the most commonly used cable for fixed domestic installations in the UK due to its ease of installation and cost-effectiveness.',
    section: '3.1.2',
    difficulty: 'basic',
    topic: 'Twin & Earth Cable',
  },
  {
    id: 2,
    question: "What does 'PVC' stand for in cable terminology?",
    options: [
      'Plastic Vinyl Cable',
      'Protected Vinyl Covering',
      'Polyvinyl Chloride',
      'Polymer Vinyl Compound',
    ],
    correctAnswer: 2,
    explanation:
      'PVC stands for Polyvinyl Chloride, which is a thermoplastic polymer commonly used as insulation and sheathing material for electrical cables.',
    section: '3.1.2',
    difficulty: 'basic',
    topic: 'Cable Materials',
  },
  {
    id: 3,
    question: 'In a twin and earth cable, what is the bare conductor used for?',
    options: [
      'Neutral',
      'Line',
      'Switch wire',
      'Earth (CPC)',
    ],
    correctAnswer: 3,
    explanation:
      'The bare conductor in twin and earth cable is the circuit protective conductor (CPC) or earth conductor, providing a path to earth for fault protection.',
    section: '3.1.2',
    difficulty: 'basic',
    topic: 'Twin & Earth Cable',
  },
  {
    id: 4,
    question: 'What is the main advantage of using singles in conduit over twin and earth cable?',
    options: [
      'Better mechanical protection and easier rewiring or alterations',
      'A lower material cost than the equivalent twin and earth run',
      'No requirement for a separate circuit protective conductor',
      'A higher current-carrying capacity for the same conductor size',
    ],
    correctAnswer: 0,
    explanation:
      'Singles in conduit provide better mechanical protection and allow for easier modifications, additions, and rewiring compared to twin and earth cable.',
    section: '3.1.3',
    difficulty: 'intermediate',
    topic: 'Singles in Conduit',
  },
  {
    id: 5,
    question: 'What does SWA stand for in cable terminology?',
    options: [
      'Single Wire Armoured',
      'Steel Wire Armoured',
      'Stranded Wire Assembly',
      'Steel Wound Armour',
    ],
    correctAnswer: 1,
    explanation:
      'SWA stands for Steel Wire Armoured cable, which has steel wire armouring between the cores and outer sheath for mechanical protection.',
    section: '3.1.4',
    difficulty: 'basic',
    topic: 'SWA Cable',
  },
  {
    id: 6,
    question: 'When would you typically use SWA cable?',
    options: [
      'Final lighting circuits run in the ceiling void of a domestic dwelling',
      'Flexible connections to portable hand tools fed from a 110 V transformer',
      'Underground installations and areas requiring mechanical protection',
      'Data and telecommunications cabling within a commercial office floor',
    ],
    correctAnswer: 2,
    explanation:
      'SWA cable is used for underground installations, outdoor applications, and areas where mechanical protection is required due to its steel wire armouring.',
    section: '3.1.4',
    difficulty: 'intermediate',
    topic: 'SWA Cable Applications',
  },
  {
    id: 7,
    question: 'What is the primary purpose of flexible cord?',
    options: [
      'Fixed installation wiring in walls',
      'Underground supply cables',
      'High voltage overhead lines',
      'Connecting portable appliances',
    ],
    correctAnswer: 3,
    explanation:
      'Flexible cord is designed for connecting portable appliances and equipment that requires movement, with conductors that can withstand repeated flexing.',
    section: '3.1.5',
    difficulty: 'basic',
    topic: 'Flexible Cord',
  },
  {
    id: 8,
    question: 'Which type of cable would be most suitable for a computer network installation?',
    options: [
      'Cat 6 data cable',
      'Steel wire armoured cable',
      'Twin and earth cable',
      'Flexible cord',
    ],
    correctAnswer: 0,
    explanation:
      'Cat 6 data cable is specifically designed for computer networks and data transmission, providing the required performance for network communications.',
    section: '3.1.6',
    difficulty: 'basic',
    topic: 'Data Cable',
  },
  {
    id: 9,
    question: 'What voltage category does ELV (Extra Low Voltage) refer to?',
    options: [
      'Up to 230V AC',
      'Up to 50V AC or 120V DC',
      'Up to 400V AC',
      'Above 1000V AC',
    ],
    correctAnswer: 1,
    explanation:
      'ELV (Extra Low Voltage) refers to voltages up to 50V AC or 120V DC, which are considered safer for general use and reduce shock risk.',
    section: '3.1.6',
    difficulty: 'intermediate',
    topic: 'Voltage Categories',
  },
  {
    id: 10,
    question:
      'Which environmental factor would most influence cable selection for an outdoor installation?',
    options: [
      'The colour of the cable outer sheath',
      'The brand of the cable manufacturer',
      'UV resistance and temperature rating',
      'The voltage drop along the cable length',
    ],
    correctAnswer: 2,
    explanation:
      'UV resistance and temperature rating are critical for outdoor installations to prevent degradation from sunlight and temperature variations.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Environmental Considerations',
  },

  // Section 3.2: Cable Containment Systems (45 questions)
  {
    id: 11,
    question: 'What is the primary purpose of cable containment systems?',
    options: [
      'To increase the current-carrying capacity of grouped cables',
      'To dispense with the circuit protective conductor entirely',
      'To remove the need for periodic inspection and testing later',
      'To provide mechanical protection and support for cables',
    ],
    correctAnswer: 3,
    explanation:
      'Cable containment systems provide mechanical protection, support, and organisation for cables whilst allowing for safe installation and maintenance access.',
    section: '3.2.1',
    difficulty: 'basic',
    topic: 'Purpose of Containment',
  },
  {
    id: 12,
    question: 'What is the main difference between surface and recessed conduit installation?',
    options: [
      'Surface conduit is visible and mounted on the wall; recessed conduit is concealed within it',
      'Surface conduit must always be made of steel, whereas recessed conduit must be plastic',
      'Surface conduit carries only data cables, whereas recessed conduit carries power',
      'Surface conduit needs no fixings at all, whereas recessed conduit is screwed back',
    ],
    correctAnswer: 0,
    explanation:
      'Surface conduit is visible and mounted on wall surfaces, whilst recessed conduit is hidden within wall cavities requiring chasing or building in during construction.',
    section: '3.2.2',
    difficulty: 'basic',
    topic: 'Conduit Installation Methods',
  },
  {
    id: 13,
    question: 'Which type of conduit would be most suitable for a damp environment?',
    options: [
      'Galvanised steel conduit',
      'PVC conduit',
      'Aluminium conduit',
      'Flexible conduit',
    ],
    correctAnswer: 1,
    explanation:
      'PVC conduit is most suitable for damp environments as it is corrosion-resistant, unlike metal conduits which can rust in damp conditions.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Selection',
  },
  {
    id: 14,
    question: 'What is the main advantage of trunking over conduit?',
    options: [
      'It provides better electromagnetic shielding than conduit',
      'It is always cheaper to install than conduit',
      'Larger cable capacity and easier access',
      'It removes the need to support the cables inside it',
    ],
    correctAnswer: 2,
    explanation:
      'Trunking provides larger cable capacity than conduit and allows easier access for maintenance, modifications, and additional cables.',
    section: '3.2.3',
    difficulty: 'intermediate',
    topic: 'Trunking vs Conduit',
  },
  {
    id: 15,
    question: 'Where would cable tray typically be used?',
    options: [
      'Concealed within the plaster of domestic dwelling walls',
      'As a substitute for the circuit protective conductor of a circuit',
      'For flexible final connections to portable appliances',
      'Industrial and commercial applications with multiple cables',
    ],
    correctAnswer: 3,
    explanation:
      'Cable tray is typically used in industrial and commercial applications where multiple cables need to be supported and organised over long runs.',
    section: '3.2.4',
    difficulty: 'basic',
    topic: 'Cable Tray Applications',
  },
  {
    id: 16,
    question: 'What is the main difference between cable tray and cable ladder?',
    options: [
      'Support structure - tray has solid/perforated base, ladder has rungs',
      'Tray carries only data cables, whereas ladder carries power cables',
      'Tray must always be earthed, whereas ladder must never be earthed',
      'Tray is always moulded in PVC, whereas ladder is made of steel',
    ],
    correctAnswer: 0,
    explanation:
      'Cable tray has a solid or perforated base for continuous support, whilst cable ladder has rungs with gaps, providing ventilation but less continuous support.',
    section: '3.2.4',
    difficulty: 'intermediate',
    topic: 'Tray vs Ladder',
  },
  {
    id: 17,
    question: 'What is underfloor trunking primarily used for?',
    options: [
      'Supporting overhead cables in industrial roof spaces',
      'Power and data cables in office environments',
      'Carrying SWA cables directly buried in the ground',
      'Final connections to ceiling-mounted luminaires',
    ],
    correctAnswer: 1,
    explanation:
      'Underfloor trunking is primarily used in office environments to distribute power and data cables beneath raised floors, providing flexible access points.',
    section: '3.2.5',
    difficulty: 'basic',
    topic: 'Underfloor Trunking',
  },
  {
    id: 18,
    question:
      'Which fixing method would be most appropriate for securing cable tray to a concrete ceiling?',
    options: [
      'Plastic wall plugs with brass woodscrews',
      'Self-adhesive plastic cable clips',
      'Expansion bolts or chemical anchors',
      'Spring toggle (cavity) fixings',
    ],
    correctAnswer: 2,
    explanation:
      'Expansion bolts or chemical anchors provide the necessary strength and reliability for securing heavy cable tray installations to concrete structures.',
    section: '3.2.6',
    difficulty: 'intermediate',
    topic: 'Fixing Methods',
  },
  {
    id: 19,
    question:
      'What is the maximum spacing between supports normally recommended for a horizontal run of cable tray carrying its rated load?',
    options: [
      '1 metre',
      '3 metres',
      '2 metres',
      '1.5 metres',
    ],
    correctAnswer: 3,
    explanation:
      'Horizontal cable tray supports are typically spaced at maximum 1.5-metre intervals to prevent excessive sagging and ensure adequate support.',
    section: '3.2.7',
    difficulty: 'intermediate',
    topic: 'Support Spacing',
  },
  {
    id: 20,
    question:
      'When installing containment systems, what should be considered to allow for thermal expansion?',
    options: [
      'Expansion joints and flexible connections',
      'Closer support spacing along the entire run',
      'A larger cross-sectional area of conductor',
      'Additional earthing connections at each end',
    ],
    correctAnswer: 0,
    explanation:
      'Expansion joints and flexible connections must be incorporated in long runs of containment to accommodate thermal expansion and prevent stress damage.',
    section: '3.2.7',
    difficulty: 'advanced',
    topic: 'Thermal Expansion',
  },

  // Section 3.3: Electrical Tools and Equipment (40 questions)
  {
    id: 21,
    question: 'Which hand tool is specifically designed for stripping cable insulation?',
    options: [
      'Insulated side cutters',
      'Wire strippers',
      'Combination pliers',
      'Craft knife',
    ],
    correctAnswer: 1,
    explanation:
      'Wire strippers are specifically designed to remove insulation from cables without damaging the conductor, with adjustable settings for different cable sizes.',
    section: '3.3.1',
    difficulty: 'basic',
    topic: 'Hand Tools',
  },
  {
    id: 22,
    question: 'What is the primary safety consideration when using power tools?',
    options: [
      'The purchase price and brand of the tool',
      'The colour of the tool casing and lead',
      'PAT testing and electrical safety',
      'The weight of the tool carrying case',
    ],
    correctAnswer: 2,
    explanation:
      "PAT testing and electrical safety are primary considerations for power tools to ensure they are safe to use and won't cause electric shock or other hazards.",
    section: '3.3.2',
    difficulty: 'basic',
    topic: 'Power Tool Safety',
  },
  {
    id: 23,
    question:
      'Which test instrument would you use to verify that a circuit is dead before working on it?',
    options: [
      'Insulation resistance tester',
      'Multimeter',
      'Earth fault loop impedance tester',
      'Voltage indicator/tester',
    ],
    correctAnswer: 3,
    explanation:
      'A voltage indicator or voltage tester is used to verify that a circuit is dead (no voltage present) before beginning work, following safe isolation procedures.',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'Test Equipment',
  },
  {
    id: 24,
    question: 'How often should hand tools be visually inspected?',
    options: [
      'Before each use',
      'Once every fortnight',
      'Once a month',
      'Once a year',
    ],
    correctAnswer: 0,
    explanation:
      'Hand tools should be visually inspected before each use to check for damage, wear, or defects that could make them unsafe or ineffective.',
    section: '3.3.4',
    difficulty: 'basic',
    topic: 'Tool Inspection',
  },
  {
    id: 25,
    question:
      'What is the recommended frequency for PAT testing portable power tools in a construction environment?',
    options: [
      'Weekly',
      '3 months',
      '6 months',
      '12 months',
    ],
    correctAnswer: 1,
    explanation:
      'In harsh environments like construction sites, portable power tools should be PAT tested every 3 months due to the increased risk of damage.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'PAT Testing Frequency',
  },
  {
    id: 26,
    question: 'Which storage method is most appropriate for precision tools like multimeters?',
    options: [
      'Loose in an open tool bag',
      'On open shelving in the van',
      'In protective cases',
      'In damp conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Precision instruments like multimeters should be stored in protective cases to prevent damage from impacts, moisture, and environmental conditions.',
    section: '3.3.5',
    difficulty: 'basic',
    topic: 'Tool Storage',
  },
  {
    id: 27,
    question: 'What type of PPE is essential when using power tools that create dust or debris?',
    options: [
      'A hi-visibility vest on its own',
      'Steel toe-capped boots on their own',
      'Hearing protection on its own',
      'Safety glasses and dust mask',
    ],
    correctAnswer: 3,
    explanation:
      'Safety glasses protect eyes from flying debris whilst dust masks prevent inhalation of harmful particles when using power tools that create dust.',
    section: '3.3.6',
    difficulty: 'basic',
    topic: 'PPE for Tools',
  },
  {
    id: 28,
    question: 'Which type of screwdriver should be used for electrical work?',
    options: [
      'Insulated screwdrivers',
      'Any screwdriver',
      'Metal handled screwdrivers',
      'Magnetic screwdrivers',
    ],
    correctAnswer: 0,
    explanation:
      'Insulated screwdrivers should be used for electrical work to provide protection against electric shock if contact is made with live conductors.',
    section: '3.3.1',
    difficulty: 'basic',
    topic: 'Insulated Tools',
  },
  {
    id: 29,
    question: 'What should you do if a power tool starts to vibrate excessively during use?',
    options: [
      'Increase the speed to work through it',
      'Stop immediately and inspect the tool',
      'Continue but wear anti-vibration gloves',
      'Reduce the pressure and carry on working',
    ],
    correctAnswer: 1,
    explanation:
      'Excessive vibration indicates a potential fault or damage. The tool should be stopped immediately and inspected to prevent injury or further damage.',
    section: '3.3.2',
    difficulty: 'intermediate',
    topic: 'Tool Safety',
  },
  {
    id: 30,
    question: 'When transporting tools to site, what is the most important consideration?',
    options: [
      'The total purchase value of the tools',
      'The colour coding of the tool handles',
      'Secure storage to prevent damage and theft',
      'The order in which the tools were first purchased',
    ],
    correctAnswer: 2,
    explanation:
      'Tools should be securely stored during transport to prevent damage from movement and to reduce the risk of theft, ensuring they remain in good working condition.',
    section: '3.3.5',
    difficulty: 'basic',
    topic: 'Tool Transport',
  },

  // Section 3.4: Installation Methods and Techniques (45 questions)
  {
    id: 31,
    question: 'What is the main difference between surface and concealed wiring?',
    options: [
      'Surface wiring always uses larger cables than concealed wiring',
      'Surface wiring needs no circuit protective conductor at all',
      'Concealed wiring can be installed in new build properties only',
      'Visibility - surface wiring is visible, concealed is hidden',
    ],
    correctAnswer: 3,
    explanation:
      'Surface wiring is installed on wall surfaces and remains visible, whilst concealed wiring is hidden within walls, floors, or ceilings for aesthetic reasons.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Surface vs Concealed',
  },
  {
    id: 32,
    question: "When does 'first fix' electrical work typically take place?",
    options: [
      'Before plastering, during construction phase',
      'After decoration is complete and the building is occupied',
      'Only once final testing and certification is finished',
      'At the same time as the accessories are fitted',
    ],
    correctAnswer: 0,
    explanation:
      'First fix electrical work takes place before plastering during the construction phase, involving installation of cables, back boxes, and containment systems.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'First Fix',
  },
  {
    id: 33,
    question: "What does 'second fix' electrical work involve?",
    options: [
      'Installing back boxes and pulling in cables',
      'Fitting accessories, switches, and sockets',
      'Chasing walls and laying floor containment',
      'Drawing up the design and circuit schedules',
    ],
    correctAnswer: 1,
    explanation:
      'Second fix involves installing visible accessories like switches, sockets, light fittings, and consumer units after plastering and decoration are complete.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'Second Fix',
  },
  {
    id: 34,
    question: 'What is the purpose of cable sleeves?',
    options: [
      'To increase the current-carrying capacity of the conductors terminated',
      'To remove the need for a separate circuit protective conductor entirely',
      'To identify and protect conductor ends and provide neat terminations',
      'To improve the flexibility of a solid conductor at its termination point',
    ],
    correctAnswer: 2,
    explanation:
      'Sleeving (e.g. green/yellow over a bare CPC) identifies and protects conductor ends and provides neat, professional terminations whilst preventing stray strands from causing short circuits.',
    section: '3.4.3',
    difficulty: 'basic',
    topic: 'Cable Sleeves',
  },
  {
    id: 35,
    question: 'When would you use ferrules on cable terminations?',
    options: [
      'On solid conductors to increase their overall diameter',
      'On bare protective conductors as earth marking',
      'On the outer sheath to provide strain relief',
      'On stranded conductors to prevent strand separation',
    ],
    correctAnswer: 3,
    explanation:
      'Ferrules are used on stranded conductors to bind the strands together, preventing separation and ensuring reliable terminations in terminal blocks.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Ferrules',
  },
  {
    id: 36,
    question: 'What is the correct method for supporting vertical cable runs?',
    options: [
      'Support at regular intervals to prevent cable weight causing damage',
      'Leave the cable unsupported so that it can move freely inside the void',
      'Support it only at the top of the run so that the cable hangs straight',
      'Coil all the excess cable neatly at the base of the vertical run',
    ],
    correctAnswer: 0,
    explanation:
      "Vertical cable runs must be supported at regular intervals to prevent the cable's own weight from causing damage to terminations or the cable itself.",
    section: '3.4.5',
    difficulty: 'intermediate',
    topic: 'Cable Support',
  },
  {
    id: 37,
    question: 'What is the purpose of cable glands?',
    options: [
      'To increase the permitted bending radius of the cable at entry',
      'To provide a sealed entry point for cables into enclosures',
      'To join two lengths of cable together end to end inside a duct',
      'To act as the circuit protective conductor for the enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'Cable glands provide a sealed, secure entry point for cables into enclosures whilst maintaining IP ratings and providing strain relief.',
    section: '3.4.4',
    difficulty: 'basic',
    topic: 'Cable Glands',
  },
  {
    id: 38,
    question:
      'Which termination method gives the most reliable connection at a high current busbar landing?',
    options: [
      'Twisted and taped joints',
      'Soldered joints',
      'Crimped connections',
      'Push-in connectors',
    ],
    correctAnswer: 2,
    explanation:
      'Crimped connections provide the most reliable terminations for high current applications as they create a gas-tight, mechanically strong connection.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Termination Methods',
  },
  {
    id: 39,
    question: 'What should be checked when installing socket outlets?',
    options: [
      'The brand name printed on the front of the moulded faceplate',
      'The colour of the mounting screws supplied with it',
      'The packaging that the accessory was supplied to site in',
      'Correct height, level installation, and secure fixing',
    ],
    correctAnswer: 3,
    explanation:
      'Socket outlets must be installed at the correct height, perfectly level, and securely fixed to ensure safety, functionality, and professional appearance.',
    section: '3.4.6',
    difficulty: 'basic',
    topic: 'Socket Installation',
  },
  {
    id: 40,
    question:
      'When installing accessories in dry lining walls, what fixing method is most appropriate?',
    options: [
      'Plasterboard fixings or back boxes with adjustable lugs',
      'Chemical anchors resin-set into the face of the plasterboard',
      'Self-adhesive pads stuck directly onto the wall surface finish',
      'Expansion bolts driven straight through the plasterboard',
    ],
    correctAnswer: 0,
    explanation:
      'Dry lining walls require appropriate plasterboard fixings or back boxes with adjustable lugs to provide secure mounting for electrical accessories.',
    section: '3.4.6',
    difficulty: 'intermediate',
    topic: 'Dry Lining Installation',
  },

  // Section 3.5: Environmental Considerations and External Influences (35 questions)
  {
    id: 41,
    question: 'What does IP65 rating indicate?',
    options: [
      'Dust protected and protected against dripping water',
      'Dust tight and protected against water jets',
      'Dust tight and protected against temporary immersion',
      'No dust protection but protected against splashing water',
    ],
    correctAnswer: 1,
    explanation:
      'IP65 indicates complete protection against dust ingress (6) and protection against water jets from any direction (5), suitable for outdoor use.',
    section: '3.5.2',
    difficulty: 'intermediate',
    topic: 'IP Ratings',
  },
  {
    id: 42,
    question: 'Which external influence code represents water and moisture conditions in BS 7671?',
    options: [
      'AA (Ambient temperature)',
      'AE (Foreign solid objects)',
      'AD (Water)',
      'AB (Humidity)',
    ],
    correctAnswer: 2,
    explanation:
      'AD represents water and moisture conditions in BS 7671 external influences classification, ranging from AD1 (negligible) to AD8 (submersion).',
    section: '3.5.1',
    difficulty: 'advanced',
    topic: 'BS 7671 External Influences',
  },
  {
    id: 43,
    question: 'What effect does UV radiation have on PVC cables?',
    options: [
      'Increases the current-carrying capacity',
      'Improves the flexibility of the sheath',
      'Has no measurable effect on PVC',
      'Causes degradation and brittleness',
    ],
    correctAnswer: 3,
    explanation:
      'UV radiation causes PVC to degrade over time, becoming brittle and cracking, which is why UV-resistant cables are required for outdoor installations.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'UV Effects',
  },
  {
    id: 44,
    question: 'What is the maximum conductor operating temperature of a standard thermoplastic (PVC) insulated cable?',
    options: [
      'Above 70°C',
      'Above 90°C',
      'Above 50°C',
      'Above 120°C',
    ],
    correctAnswer: 0,
    explanation:
      'Standard PVC cables are typically rated for continuous operation up to 70°C, above which the insulation begins to soften and degrade.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Temperature Ratings',
  },
  {
    id: 45,
    question:
      'Which type of cable would be most suitable for installation in a chemical processing plant?',
    options: [
      'Standard PVC twin and earth cable',
      'LSOH (Low Smoke Zero Halogen) cable',
      'General-purpose flexible cord to BS 6500',
      'Bare overhead line conductors',
    ],
    correctAnswer: 1,
    explanation:
      'LSOH (low smoke zero halogen) cable is specified in process plants because, unlike PVC, it releases no corrosive halogen acids and little toxic smoke if involved in a fire — important where people and sensitive plant are present.',
    section: '3.5.4',
    difficulty: 'advanced',
    topic: 'Chemical Resistance',
  },
  {
    id: 46,
    question: 'Which of the following is a special location covered by Part 7 of BS 7671?',
    options: [
      'Any room in a dwelling that holds the consumer unit',
      'A location where only a single-phase supply is available to the building',
      'Locations with specific risks requiring additional protection measures',
      'Any installation that is completed and certified by a registered firm',
    ],
    correctAnswer: 2,
    explanation:
      'Special locations are areas with specific risks (like bathrooms, swimming pools, construction sites) requiring additional protection measures beyond standard installations.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Special Locations',
  },
  {
    id: 47,
    question: 'Which mechanical protection classification indicates resistance to heavy impacts?',
    options: [
      'IK01',
      'IK05',
      'IK08',
      'IK10',
    ],
    correctAnswer: 3,
    explanation:
      'IK10 provides the highest level of mechanical protection, indicating resistance to 20 joule impacts equivalent to heavy hammer blows.',
    section: '3.5.3',
    difficulty: 'advanced',
    topic: 'Mechanical Protection',
  },
  {
    id: 48,
    question:
      'What additional considerations apply to cables installed in areas with high humidity?',
    options: [
      'Enhanced corrosion protection and moisture barriers',
      'A reduction in the circuit protective conductor size',
      'Removal of any RCD protection on the circuit',
      'Use of bare conductors to dissipate moisture',
    ],
    correctAnswer: 0,
    explanation:
      'High humidity environments require enhanced corrosion protection for metallic components and moisture barriers to prevent insulation degradation.',
    section: '3.5.2',
    difficulty: 'intermediate',
    topic: 'Humidity Effects',
  },
  {
    id: 49,
    question: 'Why might standard cables be unsuitable for food processing environments?',
    options: [
      'They cannot be used to carry any three-phase supply circuits',
      'Hygiene requirements and chemical cleaning processes',
      'They are limited to a maximum run length of thirty metres',
      'They produce excessive electromagnetic interference in use',
    ],
    correctAnswer: 1,
    explanation:
      'Food processing environments require cables that can withstand frequent cleaning with chemicals and meet strict hygiene standards to prevent contamination.',
    section: '3.5.4',
    difficulty: 'intermediate',
    topic: 'Hygiene Considerations',
  },
  {
    id: 50,
    question: 'What is the primary concern when installing electrical equipment in coastal areas?',
    options: [
      'Wind damage',
      'Sand ingress',
      'Salt corrosion',
      'Ultraviolet exposure',
    ],
    correctAnswer: 2,
    explanation:
      'Salt corrosion is the primary concern in coastal areas, requiring enhanced protection for metallic components and appropriate material selection.',
    section: '3.5.4',
    difficulty: 'intermediate',
    topic: 'Corrosive Environments',
  },

  // Section 3.6: Installation Standards and Best Practice (40 questions)
  {
    id: 51,
    question: 'What is the maximum spacing for supporting horizontal PVC conduit?',
    options: [
      '0.5 metres',
      '2 metres',
      '1.5 metres',
      '1 metre',
    ],
    correctAnswer: 3,
    explanation:
      'Horizontal PVC conduit should be supported at maximum 1-metre intervals to prevent sagging and maintain proper alignment.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Support Distances',
  },
  {
    id: 52,
    question: 'According to BS 7671, cables buried in walls should be installed in which zones?',
    options: [
      'Only in safe zones - horizontally/vertically from accessories',
      'Diagonally between the accessories to give the shortest route',
      'Anywhere in the wall, provided that the cable is twin and earth',
      'In whichever zone the customer has marked out',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 requires cables in walls to be installed in prescribed (safe) zones - within 150mm horizontally or vertically from accessories - otherwise 30 mA RCD protection or mechanical protection is required (Reg 522.6.202).',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Safe Zones',
  },
  {
    id: 53,
    question: 'Below what depth from the finished wall surface does Table 52.1 impose additional requirements on a concealed cable?',
    options: [
      '20mm',
      '50mm',
      '100mm',
      '10mm',
    ],
    correctAnswer: 1,
    explanation:
      'Under BS 7671 Reg 522.6.202, a cable concealed in a wall at a depth of less than 50mm (outside a prescribed zone) must have 30 mA RCD protection or equivalent mechanical protection; 50mm is the key threshold.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Burial Depth',
  },
  {
    id: 54,
    question: 'What is the purpose of fire stopping in cable installations?',
    options: [
      'To support the weight of the cables passing through',
      'To improve the current rating of grouped cables',
      'To prevent fire spread through cable penetrations',
      'To provide a path to earth for the containment',
    ],
    correctAnswer: 2,
    explanation:
      'Fire stopping prevents fire and smoke from spreading through openings where cables pass through fire-rated walls, floors, and ceilings.',
    section: '3.6.3',
    difficulty: 'basic',
    topic: 'Fire Stopping',
  },
  {
    id: 55,
    question: 'Which material is commonly used for fire stopping cable penetrations?',
    options: [
      'Standard expanding foam',
      'Sand and cement mortar',
      'Plastic filler compound',
      'Intumescent material',
    ],
    correctAnswer: 3,
    explanation:
      'Intumescent materials expand when heated to seal openings and maintain fire resistance ratings in cable penetrations.',
    section: '3.6.3',
    difficulty: 'intermediate',
    topic: 'Fire Stopping Materials',
  },
  {
    id: 56,
    question: 'What should be used when cables enter metal enclosures?',
    options: [
      'Grommets or bushes to protect against sharp edges',
      'Insulating tape wound around the enclosure',
      'A larger conductor to carry the extra current',
      'A second earth electrode fitted at the enclosure body',
    ],
    correctAnswer: 0,
    explanation:
      'Grommets or bushes must be used to protect cable insulation from damage by sharp edges when entering metal enclosures.',
    section: '3.6.4',
    difficulty: 'basic',
    topic: 'Edge Protection',
  },
  {
    id: 57,
    question: 'According to BS 7671, what colour should the earth conductor be?',
    options: [
      'Red',
      'Green and Yellow',
      'Black',
      'Blue',
    ],
    correctAnswer: 1,
    explanation:
      'The protective conductor (earth) must be identified by green and yellow stripes according to BS 7671 colour coding requirements.',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Colour Coding',
  },
  {
    id: 58,
    question: 'What colour is used for the neutral conductor in single-phase installations?',
    options: [
      'Red',
      'Brown',
      'Blue',
      'Green and Yellow',
    ],
    correctAnswer: 2,
    explanation:
      'The neutral conductor is identified by blue colour in single-phase installations according to harmonised European colour codes.',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Neutral Identification',
  },
  {
    id: 59,
    question: "Why is it important to follow manufacturer's installation instructions?",
    options: [
      'It allows the product cost to be reduced',
      'It removes the need for inspection and testing',
      'It permits the installation to skip certification',
      'Ensures warranty validity and safe installation',
    ],
    correctAnswer: 3,
    explanation:
      "Following manufacturer's instructions ensures safe installation, maintains warranty validity, and compliance with product specifications and standards.",
    section: '3.6.6',
    difficulty: 'basic',
    topic: 'Manufacturer Instructions',
  },
  {
    id: 60,
    question:
      "What should be done if site specifications conflict with manufacturer's instructions?",
    options: [
      'Seek clarification and approval for any deviations',
      'Always follow the site specification regardless of safety',
      'Proceed using whichever option is quickest to install',
      'Follow the manufacturer\'s instructions and say nothing',
    ],
    correctAnswer: 0,
    explanation:
      'When conflicts arise, clarification must be sought from appropriate authorities to ensure safety requirements are met before proceeding.',
    section: '3.6.6',
    difficulty: 'intermediate',
    topic: 'Specification Conflicts',
  },

  // Additional questions to reach 250 total - expanding each section
  {
    id: 61,
    question: 'What type of cable sheath provides the best resistance to oils and chemicals?',
    options: [
      'Unplasticised PVC sheath',
      'Thermoplastic elastomer',
      'Cross-linked polyethylene',
      'Impregnated paper',
    ],
    correctAnswer: 1,
    explanation:
      'Thermoplastic elastomer sheaths provide excellent resistance to oils, chemicals, and environmental stress compared to standard PVC.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Chemical Resistant Cables',
  },
  {
    id: 62,
    question: 'In a three-core SWA cable, what provides the earth continuity?',
    options: [
      'An outer lead sheath layer',
      'A separate earth core inside',
      'The steel wire armour',
      'The outer PVC oversheath',
    ],
    correctAnswer: 2,
    explanation:
      'In SWA cables, the steel wire armour acts as the circuit protective conductor (earth) providing the path to earth for fault protection.',
    section: '3.1.4',
    difficulty: 'intermediate',
    topic: 'SWA Earth Continuity',
  },
  {
    id: 63,
    question: 'Which cable type would be most appropriate for a fire alarm system?',
    options: [
      'Standard PVC cable',
      'Flexible cord',
      'Steel wire armoured cable',
      'Fire resistant cable',
    ],
    correctAnswer: 3,
    explanation:
      'Fire resistant cables maintain circuit integrity during fire conditions, essential for fire alarm systems that must continue operating during emergencies.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Fire Resistant Cables',
  },
  {
    id: 64,
    question:
      'What is the tabulated current-carrying capacity (Iz) of 2.5mm² flat twin and earth cable when clipped direct (Method C)?',
    options: [
      '27A',
      '16A',
      '20A',
      '32A',
    ],
    correctAnswer: 0,
    explanation:
      'For 2.5mm² flat twin and earth (70°C thermoplastic, two loaded conductors) the tabulated Iz for Method C (clipped direct) is 27A per BS 7671 Table 4D5, before any correction factors.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Cable Current Ratings',
  },
  {
    id: 65,
    question: 'Which of the following has no effect on the current-carrying capacity of a cable?',
    options: [
      'Installation method',
      'Cable colour',
      'Ambient temperature',
      'Grouping with other cables',
    ],
    correctAnswer: 1,
    explanation:
      'Cable colour does not affect current carrying capacity. Installation method, temperature, and grouping all require derating factors to be applied.',
    section: '3.1.7',
    difficulty: 'basic',
    topic: 'Current Capacity Factors',
  },
  {
    id: 66,
    question: 'What is the minimum internal radius for bending steel conduit?',
    options: [
      '4.5 times the conduit diameter',
      '3.5 times the conduit diameter',
      '2.5 times the conduit diameter',
      '6 times the conduit diameter',
    ],
    correctAnswer: 2,
    explanation:
      'Steel conduit should be bent with a minimum internal radius of 2.5 times the conduit diameter to prevent damage and maintain cable pulling capability.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Bending',
  },
  {
    id: 67,
    question: 'Which type of cable basket provides the best cable support?',
    options: [
      'Ladder type',
      'Perforated basket',
      'Solid basket',
      'Wire mesh basket',
    ],
    correctAnswer: 3,
    explanation:
      'Wire mesh baskets provide the best cable support whilst maintaining good ventilation and allowing easy cable access for modifications.',
    section: '3.2.4',
    difficulty: 'intermediate',
    topic: 'Cable Basket Types',
  },
  {
    id: 68,
    question:
      'How does the IET On-Site Guide require the number of cables permitted in a conduit to be determined?',
    options: [
      'By comparing the sum of the cable factors with the conduit factor from the OSG tables',
      'By limiting the total cross-sectional area of the cables to half the bore',
      'By weighing the cables and comparing the total with the mass of the conduit',
      'By matching the conduit size to the largest cable diameter in the run',
    ],
    correctAnswer: 0,
    explanation:
      'OSG Appendix E uses a cable factor / conduit factor method: add the factor for each cable and compare with the conduit factor for the run length and number of bends, rather than a single fixed percentage.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Fill',
  },
  {
    id: 69,
    question: 'Which joining method is most appropriate for PVC trunking?',
    options: [
      'Soldered seams run along the whole length',
      'Mechanical fixings with coupling pieces',
      'Welded joints formed at every junction box',
      'Brass compression glands at each cut end',
    ],
    correctAnswer: 1,
    explanation:
      'PVC trunking joints use proprietary coupling pieces and mechanical fixings to provide secure connections that can be dismantled if necessary; PVC cannot be soldered or welded.',
    section: '3.2.3',
    difficulty: 'basic',
    topic: 'Trunking Joints',
  },
  {
    id: 70,
    question: 'What is dado trunking primarily used for?',
    options: [
      'Supporting heavy SWA cables in plant rooms',
      'Carrying cables buried directly in the ground',
      'Low-level power and data distribution in offices',
      'Routing cables across a suspended ceiling void space',
    ],
    correctAnswer: 2,
    explanation:
      'Dado trunking is installed at skirting/desk level for distributing power and data services in office environments, providing accessible outlets.',
    section: '3.2.5',
    difficulty: 'basic',
    topic: 'Dado Trunking',
  },
  {
    id: 71,
    question: 'Which crimping tool feature is most important for reliable connections?',
    options: [
      'A brightly coloured handle for easy visibility',
      'A built-in mains voltage indicator',
      'A magnetic tip to hold the terminal in place',
      'Ratchet mechanism ensuring complete crimp',
    ],
    correctAnswer: 3,
    explanation:
      'A ratchet mechanism ensures the crimp is completed fully and uniformly, preventing incomplete crimps that could lead to connection failures.',
    section: '3.3.1',
    difficulty: 'intermediate',
    topic: 'Crimping Tools',
  },
  {
    id: 72,
    question: 'What class of PAT testing applies to hand-held power tools?',
    options: [
      'Class I',
      'Class 0',
      'Class II',
      'Class III',
    ],
    correctAnswer: 0,
    explanation:
      'Hand-held power tools are typically Class I appliances requiring earthed connections and more frequent testing due to higher risk usage.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'PAT Testing Classes',
  },
  {
    id: 73,
    question: 'Which multimeter function would you use to check cable continuity?',
    options: [
      'AC voltage range',
      'Resistance/ohms',
      'DC millivolts range',
      'AC current clamp',
    ],
    correctAnswer: 1,
    explanation:
      'The resistance/ohms function is used to check continuity - a continuous path will show very low resistance (near zero ohms).',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'Continuity Testing',
  },
  {
    id: 74,
    question: 'What is the main advantage of cordless tools over corded tools?',
    options: [
      'They never require maintenance or inspection',
      'They are always more powerful than corded tools',
      'Increased mobility and reduced trip hazards',
      'They are exempt from PAT testing requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Cordless tools provide increased mobility without trailing leads, reducing trip hazards and allowing work in areas without convenient power sources.',
    section: '3.3.2',
    difficulty: 'basic',
    topic: 'Cordless vs Corded',
  },
  {
    id: 75,
    question: 'How should damaged tools be handled?',
    options: [
      'Continue using them with extra care',
      'Repair them on site and carry on using them',
      'Set them aside for lighter jobs only',
      'Remove from service and tag as defective',
    ],
    correctAnswer: 3,
    explanation:
      'Damaged tools must be immediately removed from service and clearly tagged as defective to prevent others from using unsafe equipment.',
    section: '3.3.4',
    difficulty: 'basic',
    topic: 'Damaged Tools',
  },
  {
    id: 76,
    question: 'What is the main difference between installation and maintenance work phases?',
    options: [
      'Installation is new work, maintenance is on existing systems',
      'Installation needs no certification, maintenance always does',
      'Installation is done by labourers, maintenance by electricians',
      'Installation is indoors only, maintenance is outdoors only',
    ],
    correctAnswer: 0,
    explanation:
      'Installation involves new electrical work on new systems, whilst maintenance involves working on existing, potentially live electrical systems requiring additional precautions.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Installation vs Maintenance',
  },
  {
    id: 77,
    question: 'Which installation method provides the best protection for cables?',
    options: [
      'Clipped directly to the wall surface',
      'In protective conduit or trunking',
      'Loosely laid across a ceiling void',
      'Buried directly without any sleeve',
    ],
    correctAnswer: 1,
    explanation:
      'Protective conduit or trunking provides the best mechanical protection whilst allowing access for maintenance and future modifications.',
    section: '3.4.1',
    difficulty: 'intermediate',
    topic: 'Cable Protection',
  },
  {
    id: 78,
    question: 'What should be installed during first fix to allow for plasterboard mounting?',
    options: [
      'Switches and socket faceplates',
      'The consumer unit and main switch',
      'Back boxes and mounting points',
      'Light fittings and ceiling roses',
    ],
    correctAnswer: 2,
    explanation:
      'Back boxes and mounting points must be installed during first fix to provide secure fixing points before plasterboard installation.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'First Fix Requirements',
  },
  {
    id: 79,
    question: 'Which termination fault is most likely to cause overheating?',
    options: [
      'Correct tightness',
      'Proper conductor preparation',
      'Clean terminals',
      'Loose connections',
    ],
    correctAnswer: 3,
    explanation:
      'Loose connections create high resistance joints that generate heat due to I²R losses, potentially causing fires and equipment damage.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Connection Faults',
  },
  {
    id: 80,
    question: 'What is the purpose of strain relief in cable connections?',
    options: [
      'To prevent stress on electrical connections from cable movement',
      'To increase the cable current-carrying capacity',
      'To improve the appearance of the finished joint',
      'To provide a second earth fault path back to the board',
    ],
    correctAnswer: 0,
    explanation:
      'Strain relief prevents mechanical stress from cable movement being transmitted to electrical connections, reducing the risk of connection failure.',
    section: '3.4.4',
    difficulty: 'basic',
    topic: 'Strain Relief',
  },
  {
    id: 81,
    question: 'Which external influence classification covers impact resistance?',
    options: [
      'AB (Humidity)',
      'AG (Mechanical stress)',
      'AD (Water)',
      'AA (Ambient temperature)',
    ],
    correctAnswer: 1,
    explanation:
      'AG classification in BS 7671 covers mechanical stress including impact, vibration, and other mechanical influences on electrical installations.',
    section: '3.5.1',
    difficulty: 'advanced',
    topic: 'Mechanical Impact Classification',
  },
  {
    id: 82,
    question: 'What does the second digit in an IP rating represent?',
    options: [
      'Solid particle protection',
      'Temperature resistance',
      'Water ingress protection',
      'Impact resistance',
    ],
    correctAnswer: 2,
    explanation:
      'The second digit in IP ratings (0-8) indicates the level of protection against water ingress, from no protection (0) to submersion (8).',
    section: '3.5.2',
    difficulty: 'basic',
    topic: 'IP Rating System',
  },
  {
    id: 83,
    question: 'Above what conductor temperature is the insulation of a standard thermoplastic cable permanently damaged?',
    options: [
      'At any temperature above 0°C',
      'Only when the cable is de-energised',
      'When the ambient humidity rises sharply',
      "Above the insulation material's thermal limit",
    ],
    correctAnswer: 3,
    explanation:
      'Cable insulation becomes permanently damaged when temperatures exceed the thermal limits of the insulation material, which varies by cable type.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Thermal Damage',
  },
  {
    id: 84,
    question: 'Which cable characteristic is most important in underground installations?',
    options: [
      'Moisture resistance and mechanical protection',
      'A bright colour for easy identification',
      'The lowest possible purchase cost',
      'Maximum flexibility for repeated bending',
    ],
    correctAnswer: 0,
    explanation:
      'Underground cables must resist moisture ingress and provide mechanical protection against ground movement and potential excavation damage.',
    section: '3.5.4',
    difficulty: 'intermediate',
    topic: 'Underground Installation',
  },
  {
    id: 85,
    question: 'What additional protection is required in bathroom installations?',
    options: [
      'Larger cable sizes than other rooms',
      'Enhanced IP ratings and RCD protection',
      'A separate earth electrode for the room',
      'Three-phase supply to all accessories',
    ],
    correctAnswer: 1,
    explanation:
      'Bathrooms require enhanced IP ratings for water protection and RCD protection due to the increased risk of electric shock in wet conditions.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Bathroom Requirements',
  },
  {
    id: 86,
    question: 'For a 2.5 mm squared flat thermoplastic cable clipped direct, what is the maximum support spacing on a vertical run?',
    options: [
      '2 metres',
      '1.5 metres',
      '1 metre',
      'No limit',
    ],
    correctAnswer: 2,
    explanation:
      'Vertical cable runs should be supported at maximum 1-metre intervals to prevent the cable weight from causing damage or stress on terminations.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Vertical Support Spacing',
  },
  {
    id: 87,
    question: "Which zones are considered 'safe zones' for cable routing in walls?",
    options: [
      'Within 50mm of any electrical accessory',
      'Anywhere below the mid-height of the finished wall',
      'Within 300mm of the consumer unit only',
      'Within 150mm of corners, ceilings, floors, and accessories',
    ],
    correctAnswer: 3,
    explanation:
      'Prescribed (safe) zones are areas within 150mm of the top of the wall, of an internal corner, or horizontally/vertically from an accessory (Reg 522.6.202).',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Safe Zone Definition',
  },
  {
    id: 88,
    question: 'What protection is required for cables in walls outside safe zones?',
    options: [
      'RCD protection not exceeding 30mA',
      'A minimum conductor size of 4mm²',
      'A green-and-yellow outer sheath',
      'Double the normal support spacing',
    ],
    correctAnswer: 0,
    explanation:
      'Cables installed outside prescribed zones (at depth <50mm) must be protected by a 30mA RCD, or have mechanical protection / earthed metallic covering (Reg 522.6.202/.203).',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'RCD Protection',
  },
  {
    id: 89,
    question: 'Why is fire stopping particularly important in multi-storey buildings?',
    options: [
      'It reduces the cost of the cable installation',
      'Prevents vertical fire spread between floors',
      'It improves the current rating of the cables',
      'It removes the need for smoke alarms',
    ],
    correctAnswer: 1,
    explanation:
      'Fire stopping prevents fire and smoke from spreading vertically between floors through cable penetrations, maintaining compartmentation in buildings.',
    section: '3.6.3',
    difficulty: 'intermediate',
    topic: 'Vertical Fire Spread',
  },
  {
    id: 90,
    question: 'What information should be included on cable labels?',
    options: [
      'The installer name and date of birth',
      'The cable manufacturer advertising slogan',
      'Circuit designation, cable type, and destination',
      'The purchase price of the cable',
    ],
    correctAnswer: 2,
    explanation:
      'Cable labels should include circuit designation, cable type, and destination to enable easy identification for maintenance and future modifications.',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Cable Labelling',
  },

  // Additional advanced questions to complete the 250
  {
    id: 91,
    question:
      'Which type of cable is most suitable for installation in areas with high electromagnetic interference?',
    options: [
      'Paper insulated cable',
      'Rubber cable',
      'Standard PVC cable',
      'Screened cable',
    ],
    correctAnswer: 3,
    explanation:
      'Screened cables have metallic screens that provide protection against electromagnetic interference, essential in environments with sensitive equipment.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'EMI Protection',
  },
  {
    id: 92,
    question: 'What is the typical voltage drop limit for final circuits in BS 7671?',
    options: [
      '5%',
      '7%',
      '10%',
      '3%',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 typically limits voltage drop to 5% of nominal voltage for final circuits to ensure proper equipment operation and efficiency.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Voltage Drop',
  },
  {
    id: 93,
    question:
      'For the same cable, which reference method gives the highest tabulated current-carrying capacity?',
    options: [
      'Enclosed in conduit',
      'Clipped direct to surface',
      'In thermal insulation',
      'Buried in wall',
    ],
    correctAnswer: 1,
    explanation:
      'Clipped direct installation (Method C) typically provides the highest current carrying capacity due to better heat dissipation compared to enclosed methods.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Installation Methods',
  },
  {
    id: 94,
    question: 'What is the primary purpose of earthing in electrical installations?',
    options: [
      'Adequate support and fall protection during installation',
      'To prevent stress on electrical connections from cable movement',
      'To provide a path for fault current and enable protective device operation',
      'Significantly increases temperature requiring derating',
    ],
    correctAnswer: 2,
    explanation:
      'Earthing provides a low impedance path for fault current, ensuring protective devices operate quickly to disconnect faulty circuits for safety.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Earthing Purpose',
  },
  {
    id: 95,
    question: 'Which cable construction provides the best flexibility for moving machinery?',
    options: [
      'Solid conductor cable',
      'Single core cable',
      'Armoured cable',
      'Stranded conductor cable',
    ],
    correctAnswer: 3,
    explanation:
      'Stranded conductor cables are more flexible than solid conductors, making them suitable for applications requiring movement such as moving machinery.',
    section: '3.1.5',
    difficulty: 'basic',
    topic: 'Cable Flexibility',
  },
  {
    id: 96,
    question: 'What is the main disadvantage of aluminium conductors compared to copper?',
    options: [
      'Lower conductivity and connection issues',
      'Much heavier weight for the same length',
      'A higher purchase cost than copper',
      'It cannot be used outdoors at all',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium has lower conductivity than copper and is prone to oxidation at connections, requiring special termination techniques and regular maintenance.',
    section: '3.1.1',
    difficulty: 'intermediate',
    topic: 'Conductor Materials',
  },
  {
    id: 97,
    question: 'Which factor most affects the spacing of cable tray supports?',
    options: [
      'The colour of the cable sheaths',
      'Cable weight and tray loading',
      'The supply voltage of the circuits',
      'The brand of the cable tray',
    ],
    correctAnswer: 1,
    explanation:
      'Support spacing depends on the total weight of cables and the structural capacity of the tray system to prevent excessive deflection.',
    section: '3.2.4',
    difficulty: 'intermediate',
    topic: 'Support Loading',
  },
  {
    id: 98,
    question: 'What is the purpose of expansion loops in long cable runs?',
    options: [
      'To increase the current rating of the cable',
      'To shorten the overall length of the run',
      'To accommodate thermal expansion and contraction',
      'To provide an additional earth connection',
    ],
    correctAnswer: 2,
    explanation:
      'Expansion loops accommodate thermal expansion and contraction of cables in long runs, preventing stress damage to cables and terminations.',
    section: '3.2.7',
    difficulty: 'advanced',
    topic: 'Thermal Expansion',
  },
  {
    id: 99,
    question: 'Which conduit material is most suitable for explosive atmospheres?',
    options: [
      'Standard heavy-gauge PVC conduit with solvent-welded joints',
      'Flexible plastic conduit with a separate cpc drawn in',
      'Unsheathed singles clipped direct to the structure',
      'Galvanised steel conduit with appropriate certification',
    ],
    correctAnswer: 3,
    explanation:
      'Explosive atmospheres require certified equipment - galvanised steel conduit with appropriate ATEX certification ensures safe operation in hazardous areas.',
    section: '3.2.2',
    difficulty: 'advanced',
    topic: 'Hazardous Areas',
  },
  {
    id: 100,
    question: 'What is the minimum internal bend radius for steel wire armoured cable, expressed as a multiple of its overall diameter?',
    options: [
      '10 times cable diameter',
      '8 times cable diameter',
      '12 times cable diameter',
      '6 times cable diameter',
    ],
    correctAnswer: 0,
    explanation:
      'SWA cables require a minimum bend radius of 10 times the cable diameter to prevent damage to the steel wire armour and internal cores.',
    section: '3.1.4',
    difficulty: 'intermediate',
    topic: 'SWA Bending',
  },

  // Continue with more questions for remaining sections...
  {
    id: 101,
    question:
      'What type of drill bit is most appropriate for drilling holes in masonry for cable installation?',
    options: [
      'A high-speed steel (HSS) twist bit',
      'Masonry bit with tungsten carbide tip',
      'A flat wood-boring (spade) bit',
      'A countersink bit',
    ],
    correctAnswer: 1,
    explanation:
      'Masonry bits with tungsten carbide tips are designed to drill efficiently through concrete, brick, and stone without overheating or dulling quickly.',
    section: '3.3.2',
    difficulty: 'basic',
    topic: 'Drill Bits',
  },
  {
    id: 102,
    question: 'When using a multimeter to measure AC voltage, which setting should be selected?',
    options: [
      'DC voltage',
      'Current',
      'AC voltage',
      'Resistance',
    ],
    correctAnswer: 2,
    explanation:
      'The AC voltage setting must be selected when measuring alternating current voltages to ensure accurate readings and prevent damage to the meter.',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'Multimeter Settings',
  },
  {
    id: 103,
    question: 'What is the recommended frequency for calibrating precision test equipment?',
    options: [
      'Every 2 years',
      'Monthly',
      'Every 6 months',
      'Annually',
    ],
    correctAnswer: 3,
    explanation:
      'Precision test equipment should typically be calibrated annually to ensure accuracy and compliance with testing standards and regulations.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'Equipment Calibration',
  },
  {
    id: 104,
    question: 'Which type of saw is most appropriate for cutting cable tray?',
    options: [
      'Hacksaw or metal cutting saw',
      'A tenon (wood) saw',
      'A coping saw',
      'A plasterboard pad saw',
    ],
    correctAnswer: 0,
    explanation:
      'Hacksaws or metal cutting saws with appropriate blades are designed to cut through the steel or aluminium materials used in cable tray construction.',
    section: '3.3.2',
    difficulty: 'basic',
    topic: 'Cutting Tools',
  },
  {
    id: 105,
    question: 'What should be done before using any borrowed or hired tools?',
    options: [
      'Repaint them in the company colours',
      'Visual inspection and safety check',
      'Use them only at reduced speed',
      'Return them without using them',
    ],
    correctAnswer: 1,
    explanation:
      'Borrowed or hired tools should be visually inspected and safety checked before use as their maintenance history and current condition may be unknown.',
    section: '3.3.4',
    difficulty: 'basic',
    topic: 'Tool Safety Checks',
  },
  {
    id: 106,
    question: 'What is the main advantage of using a fish tape for cable pulling?',
    options: [
      'It strips insulation from the conductor',
      'It measures the length of the cable run',
      'Enables cable installation through existing conduit runs',
      'It tests the continuity of the installed conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Fish tapes allow cables to be pulled through existing conduit runs where direct access is not possible, essential for retrofit installations.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Cable Pulling',
  },
  {
    id: 107,
    question: 'Which phase of electrical work typically includes testing and commissioning?',
    options: [
      'Before any cables are installed',
      'During first fix, before plastering',
      'Halfway through the first fix stage',
      'After second fix completion',
    ],
    correctAnswer: 3,
    explanation:
      'Testing and commissioning occurs after second fix completion when all electrical work is finished and the installation can be verified for safety and function.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'Testing Phase',
  },
  {
    id: 108,
    question: 'What is the purpose of using bootlace ferrules on stranded conductors?',
    options: [
      'To bind strands together and ensure reliable connection',
      'To increase the current rating of the conductor',
      'To identify the conductor as the earth',
      'To allow a solid conductor to be made flexible',
    ],
    correctAnswer: 0,
    explanation:
      'Bootlace ferrules bind the strands of flexible conductors together, preventing strand separation and ensuring reliable connections in terminals.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Bootlace Ferrules',
  },
  {
    id: 109,
    question: 'Which termination method should be avoided for high vibration environments?',
    options: [
      'Crimped connections',
      'Screwed terminals only',
      'Soldered joints',
      'Welded connections',
    ],
    correctAnswer: 1,
    explanation:
      'Screwed terminals alone may loosen due to vibration; additional measures like spring washers or thread-locking compounds are needed in vibration environments.',
    section: '3.4.3',
    difficulty: 'advanced',
    topic: 'Vibration Resistance',
  },
  {
    id: 110,
    question: 'What is the correct procedure for connecting SWA cable to equipment?',
    options: [
      'Connect the cores and leave the armour unterminated',
      'Cut back the armour and tape over the cut end',
      'Connect cores and earth the armour via appropriate gland',
      'Connect the armour to the line conductor',
    ],
    correctAnswer: 2,
    explanation:
      'SWA cable cores are connected normally whilst the steel wire armour must be properly earthed through an appropriate cable gland to maintain earth continuity.',
    section: '3.4.4',
    difficulty: 'intermediate',
    topic: 'SWA Termination',
  },

  // Continue with environmental and standards questions...
  {
    id: 111,
    question: 'Which IP rating would be most appropriate for outdoor lighting installations?',
    options: [
      'IP20',
      'IP44',
      'IP68',
      'IP65',
    ],
    correctAnswer: 3,
    explanation:
      'IP65 provides complete dust protection and protection against water jets from any direction, suitable for most outdoor lighting applications.',
    section: '3.5.2',
    difficulty: 'intermediate',
    topic: 'Outdoor IP Ratings',
  },
  {
    id: 112,
    question: 'What is the effect of grouping cables together on their current carrying capacity?',
    options: [
      'Reduces capacity due to heat build-up',
      'Increases capacity due to shared cooling',
      'Has no effect on current-carrying capacity',
      'Only affects the voltage drop, not the rating',
    ],
    correctAnswer: 0,
    explanation:
      'Grouping cables together reduces their current carrying capacity due to heat build-up from mutual heating effects, requiring derating factors.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Cable Grouping',
  },
  {
    id: 113,
    question: 'Which material provides the best corrosion resistance in marine environments?',
    options: [
      'Mild steel',
      'Stainless steel',
      'Aluminium',
      'Zinc plated steel',
    ],
    correctAnswer: 1,
    explanation:
      'Stainless steel provides excellent corrosion resistance in marine environments with high salt content compared to other metal options.',
    section: '3.5.4',
    difficulty: 'intermediate',
    topic: 'Marine Corrosion',
  },
  {
    id: 114,
    question: 'What additional consideration applies to electrical installations in schools?',
    options: [
      'Larger cable sizes than in dwellings',
      'A dedicated earth electrode per classroom',
      'Enhanced mechanical protection due to potential vandalism',
      'A three-phase supply to every socket-outlet fitted',
    ],
    correctAnswer: 2,
    explanation:
      'Schools require enhanced mechanical protection for electrical installations due to potential impact damage and vandalism by users.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Educational Buildings',
  },
  {
    id: 115,
    question: 'Which external influence code represents ambient temperature in BS 7671?',
    options: [
      'AD',
      'AB',
      'AC',
      'AA',
    ],
    correctAnswer: 3,
    explanation:
      'AA represents ambient temperature classification in BS 7671 external influences, ranging from AA1 (-60°C to +5°C) to AA8 (+90°C to +125°C).',
    section: '3.5.1',
    difficulty: 'advanced',
    topic: 'Temperature Classification',
  },
  {
    id: 116,
    question: 'What is the maximum distance between supports for a horizontal run of 25 mm PVC conduit?',
    options: [
      '1.0m',
      '0.75m',
      '1.25m',
      '1.5m',
    ],
    correctAnswer: 0,
    explanation:
      '25mm PVC conduit should be supported at maximum 1.0-metre intervals to prevent sagging whilst maintaining proper alignment.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Conduit Support Distance',
  },
  {
    id: 117,
    question:
      'What does BS 7671 require where a cable is run close to a hot water pipe?',
    options: [
      '25mm',
      '50mm',
      '100mm',
      '150mm',
    ],
    correctAnswer: 1,
    explanation:
      'Cables should be separated from hot water pipes by at least 50mm or thermal insulation to prevent heat damage to cable insulation.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Thermal Separation',
  },
  {
    id: 118,
    question: 'Which colour coding applies to the line conductor in single-phase installations?',
    options: [
      'Red',
      'Blue',
      'Brown',
      'Black',
    ],
    correctAnswer: 2,
    explanation:
      'Brown identifies the line conductor in single-phase installations according to harmonised European colour codes adopted in BS 7671.',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Line Conductor Colour',
  },
  {
    id: 119,
    question: 'What should be used to seal cable entries in fire-rated walls?',
    options: [
      'Standard expanding foam',
      'Silicone bathroom sealant',
      'Plastic grommet strip',
      'Intumescent sealant',
    ],
    correctAnswer: 3,
    explanation:
      'Intumescent sealants maintain fire resistance ratings by expanding when heated to seal gaps and prevent fire spread through cable penetrations.',
    section: '3.6.3',
    difficulty: 'intermediate',
    topic: 'Fire Sealing',
  },
  {
    id: 120,
    question: 'When should installation certificates be completed?',
    options: [
      'Immediately upon completion of installation',
      'Only if the client specifically requests one',
      'Several months after the work is finished',
      'Before any cables have been installed',
    ],
    correctAnswer: 0,
    explanation:
      'Installation certificates must be completed immediately upon completion whilst all installation details are fresh and test results are current.',
    section: '3.6.6',
    difficulty: 'basic',
    topic: 'Certification Timing',
  },

  // Additional questions continuing the pattern to reach 250
  {
    id: 121,
    question: 'What type of cable insulation is most suitable for high temperature applications?',
    options: [
      'Standard PVC (thermoplastic)',
      'XLPE (Cross-linked polyethylene)',
      'Natural rubber insulation',
      'Paper-insulated lead-covered',
    ],
    correctAnswer: 1,
    explanation:
      'XLPE (90°C thermosetting) insulation has superior thermal properties compared to 70°C PVC, maintaining its properties at higher temperatures.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'High Temperature Insulation',
  },
  {
    id: 122,
    question:
      'Which installation method provides the best protection against electromagnetic interference?',
    options: [
      'Clipped direct to a timber surface',
      'In open PVC trunking',
      'In steel conduit with proper earthing',
      'On an open wire-mesh basket',
    ],
    correctAnswer: 2,
    explanation:
      'Steel conduit acts as a Faraday cage when properly earthed, providing excellent electromagnetic shielding for enclosed cables.',
    section: '3.2.2',
    difficulty: 'advanced',
    topic: 'EMI Shielding',
  },
  {
    id: 123,
    question: 'What is the primary safety concern when using battery-powered tools?',
    options: [
      'The brand of the battery cells',
      'The colour of the battery casing',
      'The weight of the spare batteries',
      'Battery charging safety and proper storage',
    ],
    correctAnswer: 3,
    explanation:
      'Battery charging presents fire and explosion risks if not done properly, and batteries require appropriate storage conditions to prevent degradation and hazards.',
    section: '3.3.2',
    difficulty: 'intermediate',
    topic: 'Battery Tool Safety',
  },
  {
    id: 124,
    question: 'Which test would verify that protective bonding is effective?',
    options: [
      'Earth continuity test',
      'Polarity test',
      'Insulation resistance test',
      'RCD test',
    ],
    correctAnswer: 0,
    explanation:
      'Earth continuity testing verifies that protective bonding connections provide a continuous low-resistance path to earth for safety.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Bonding Tests',
  },
  {
    id: 125,
    question: 'What should be done with tools that fail PAT testing?',
    options: [
      'Continue using them but test more often',
      'Remove from service until repaired and retested',
      'Use them only for low-risk light work',
      'Pass them on to a less experienced worker',
    ],
    correctAnswer: 1,
    explanation:
      'Tools failing PAT tests must be immediately removed from service and not used until properly repaired and successfully retested.',
    section: '3.3.4',
    difficulty: 'basic',
    topic: 'PAT Test Failures',
  },
  {
    id: 126,
    question: 'Which factor determines the selection of appropriate cable clips?',
    options: [
      'The supply voltage of the circuit',
      'The colour of the cable sheath',
      'Cable size and installation surface',
      'The length of the cable run',
    ],
    correctAnswer: 2,
    explanation:
      'Cable clips must be selected based on cable diameter and the surface material to ensure secure fixing and appropriate support.',
    section: '3.4.5',
    difficulty: 'basic',
    topic: 'Clip Selection',
  },
  {
    id: 127,
    question: 'What clip spacing does the On-Site Guide give for a 1.0 mm squared to 2.5 mm squared flat thermoplastic cable run vertically?',
    options: [
      '250mm',
      '1000mm',
      '600mm',
      '400mm',
    ],
    correctAnswer: 3,
    explanation:
      'Cable clips on vertical runs should be spaced at approximately 400mm intervals to provide adequate support without cable weight causing stress.',
    section: '3.4.5',
    difficulty: 'intermediate',
    topic: 'Vertical Clip Spacing',
  },
  {
    id: 128,
    question: 'Which type of joint is not permitted in a fixed electrical installation?',
    options: [
      'Twisted and taped joints',
      'Soldered cable joints',
      'Crimped ferrule joints',
      'Screwed compression joints',
    ],
    correctAnswer: 0,
    explanation:
      'Twisted and taped joints are unreliable and prohibited in permanent installations as they can loosen over time and create high resistance connections.',
    section: '3.4.3',
    difficulty: 'basic',
    topic: 'Prohibited Joints',
  },
  {
    id: 129,
    question: 'What is the purpose of using saddles for cable support?',
    options: [
      'To strip the insulation from the cable end',
      'To distribute cable weight over a larger area',
      'To provide a sealed entry point into an enclosure',
      'To act as the circuit protective conductor for the run',
    ],
    correctAnswer: 1,
    explanation:
      'Cable saddles distribute the weight of heavy cables over a larger area, preventing damage to cable sheaths and providing better support.',
    section: '3.4.5',
    difficulty: 'basic',
    topic: 'Cable Saddles',
  },
  {
    id: 130,
    question: 'When is RCD protection mandatory for socket outlets?',
    options: [
      'For outdoor socket outlets and those in bathrooms',
      'Only for sockets supplying portable equipment outdoors',
      'For all socket outlets up to 32A in most locations',
      'For sockets rated above 32A in commercial premises',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 (Reg 411.3.3) requires 30mA RCD additional protection for socket outlets rated up to 32A for use by ordinary persons in most locations.',
    section: '3.4.6',
    difficulty: 'intermediate',
    topic: 'RCD Requirements',
  },

  // Environmental and external influences continued
  {
    id: 131,
    question: 'Which IP first digit indicates complete protection against dust ingress?',
    options: [
      'IP5X',
      'IP7X',
      'IP4X',
      'IP6X',
    ],
    correctAnswer: 3,
    explanation:
      'IP6X indicates complete protection against dust ingress - no dust can enter the enclosure under test conditions.',
    section: '3.5.2',
    difficulty: 'intermediate',
    topic: 'Dust Protection',
  },
  {
    id: 132,
    question: 'What effect does direct sunlight have on cable temperature?',
    options: [
      'Significantly increases temperature requiring derating',
      'Lowers the cable temperature through surface evaporation',
      'Has no measurable effect at all on the temperature of the cable',
      'Increases the current-carrying capacity of the cable in air',
    ],
    correctAnswer: 0,
    explanation:
      'Direct sunlight can significantly increase cable temperature, requiring derating factors to be applied to prevent overheating and insulation damage.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Solar Heating',
  },
  {
    id: 133,
    question:
      'Which type of environment requires special consideration for fungal growth on cables?',
    options: [
      'Cold, dry desert environments',
      'Hot, humid tropical environments',
      'Sealed, air-conditioned offices',
      'Dry, freezing cold-store environments',
    ],
    correctAnswer: 1,
    explanation:
      'Hot, humid tropical environments promote fungal growth which can degrade cable materials, requiring fungus-resistant cable types or treatments.',
    section: '3.5.4',
    difficulty: 'advanced',
    topic: 'Fungal Resistance',
  },
  {
    id: 134,
    question:
      'What additional protection is required for electrical installations in swimming pool areas?',
    options: [
      'Larger cable sizes throughout the building',
      'A dedicated three-phase supply to the pool plant room',
      'Enhanced IP ratings, RCD protection, and bonding',
      'Removal of all metallic parts from the whole pool area',
    ],
    correctAnswer: 2,
    explanation:
      'Swimming pool areas require enhanced IP ratings, mandatory RCD protection, and extensive supplementary equipotential bonding due to high electric shock risk.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Swimming Pool Safety',
  },
  {
    id: 135,
    question: 'Which external influence classification covers the presence of water?',
    options: [
      'AB (Humidity)',
      'AC (Altitude)',
      'AE (Foreign solid objects)',
      'AD (Presence of water)',
    ],
    correctAnswer: 3,
    explanation:
      'AD classification covers the presence of water, from AD1 (negligible) through to AD8 (submerged under water pressure).',
    section: '3.5.1',
    difficulty: 'intermediate',
    topic: 'Water Classification',
  },

  // Standards and best practice continued
  {
    id: 136,
    question: 'What is the maximum length of an unsupported span for a cable installed between two fixed points indoors?',
    options: [
      '300mm',
      '200mm',
      '400mm',
      '500mm',
    ],
    correctAnswer: 0,
    explanation:
      'Unsupported cable spans should not exceed 300mm to prevent sagging and stress on cables between support points.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Unsupported Spans',
  },
  {
    id: 137,
    question: 'Which area around electrical panels must be kept clear for safety and access?',
    options: [
      '500mm',
      '700mm',
      '1000mm',
      '1500mm',
    ],
    correctAnswer: 1,
    explanation:
      'A minimum of 700mm clear space should be maintained in front of electrical panels for safe operation and emergency access.',
    section: '3.6.2',
    difficulty: 'basic',
    topic: 'Panel Access',
  },
  {
    id: 138,
    question: 'What information must be provided with electrical installation certificates?',
    options: [
      'The retail price of every accessory and cable used on the whole job',
      'The names of everyone who visited the site during the course of works',
      'Test results, circuit details, and any departures from standards',
      'A photograph of the completed installation and of the consumer unit board',
    ],
    correctAnswer: 2,
    explanation:
      'Installation certificates must include comprehensive test results, detailed circuit information, and documentation of any departures from British Standards.',
    section: '3.6.6',
    difficulty: 'intermediate',
    topic: 'Certificate Requirements',
  },
  {
    id: 139,
    question: 'Which colour identifies L3 in a three-phase installation?',
    options: [
      'Brown',
      'Black',
      'Blue',
      'Grey',
    ],
    correctAnswer: 3,
    explanation:
      'Grey identifies the L3 line conductor in three-phase installations according to harmonised European colour codes (Brown-L1, Black-L2, Grey-L3).',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Three-phase Colours',
  },
  {
    id: 140,
    question: "What should be done if manufacturer's instructions are not available?",
    options: [
      'Contact manufacturer or supplier for guidance',
      'Proceed with the installation regardless',
      'Use the instructions from a similar product',
      'Install it without any instructions and test after',
    ],
    correctAnswer: 0,
    explanation:
      "If manufacturer's instructions are unavailable, contact the manufacturer or supplier for proper installation guidance to ensure safety and warranty compliance.",
    section: '3.6.6',
    difficulty: 'basic',
    topic: 'Missing Instructions',
  },

  // Final advanced questions to complete 250
  {
    id: 141,
    question: 'Which cable type is specifically designed for use in lift shafts?',
    options: [
      'Standard flat twin and earth PVC cable',
      'Travelling cable with enhanced flexibility',
      'Steel wire armoured cable to BS 5467 standard',
      'Mineral insulated copper clad cable to BS EN 60702',
    ],
    correctAnswer: 1,
    explanation:
      'Lift travelling cables are specially designed with enhanced flexibility to withstand constant movement and are often flat in construction for space efficiency.',
    section: '3.1.5',
    difficulty: 'advanced',
    topic: 'Travelling Cables',
  },
  {
    id: 142,
    question: 'What is the primary advantage of using mineral insulated cables?',
    options: [
      'The lowest purchase cost of any cable type available to buy',
      'The greatest flexibility of any cable for moving machinery',
      'Fire resistance and ability to maintain circuit integrity',
      'No need for any form of mechanical protection of the cable',
    ],
    correctAnswer: 2,
    explanation:
      'Mineral insulated cables can maintain circuit integrity during fires as the mineral insulation is non-combustible and the copper sheath provides excellent protection.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Mineral Insulated Cables',
  },
  {
    id: 143,
    question: 'Which containment system is most appropriate for clean room environments?',
    options: [
      'Galvanised steel ladder rack',
      'Open galvanised wire-mesh basket',
      'Standard PVC trunking with a clip-on lid',
      'Stainless steel with smooth surfaces',
    ],
    correctAnswer: 3,
    explanation:
      "Clean rooms require stainless steel containment with smooth surfaces that can be easily cleaned and won't harbour contaminants or bacteria.",
    section: '3.2.3',
    difficulty: 'advanced',
    topic: 'Clean Room Containment',
  },
  {
    id: 144,
    question: 'What type of test equipment is specifically designed for testing RCD operation?',
    options: [
      'RCD tester',
      'Multimeter',
      'Insulation resistance tester',
      'Earth fault loop tester',
    ],
    correctAnswer: 0,
    explanation:
      'RCD testers are specifically designed to inject controlled test currents to verify RCD operation times and trip current settings accurately.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'RCD Testing',
  },
  {
    id: 145,
    question:
      'Which type of personal protective equipment is essential when working with power tools in overhead areas?',
    options: [
      'A hi-visibility vest on its own',
      'Hard hat and safety glasses',
      'Steel toe-capped boots on their own',
      'Ear defenders on their own',
    ],
    correctAnswer: 1,
    explanation:
      'Hard hats protect against falling debris whilst safety glasses protect eyes from particles when working overhead with power tools.',
    section: '3.3.6',
    difficulty: 'basic',
    topic: 'Overhead Work PPE',
  },
  {
    id: 146,
    question: 'What is the correct procedure for making off SWA cable glands?',
    options: [
      'Tighten until the thread strips so that it locks',
      'Hand-tighten only and leave the locknut off entirely',
      "Tighten to manufacturer's torque specification",
      'Wrap the gland threads with insulating tape and tighten',
    ],
    correctAnswer: 2,
    explanation:
      "SWA glands must be tightened to the manufacturer's specified torque to ensure proper sealing, earth continuity, and cable retention without damage.",
    section: '3.4.4',
    difficulty: 'intermediate',
    topic: 'Gland Installation',
  },
  {
    id: 147,
    question: 'Which installation method provides the best cable identification and future access?',
    options: [
      'Cables buried directly in solid plaster',
      'Cables chased into concrete and screeded over',
      'Cables clipped behind permanent fixed panelling',
      'In accessible trunking with proper labelling',
    ],
    correctAnswer: 3,
    explanation:
      'Accessible trunking with proper labelling allows easy cable identification and provides access for future modifications without destructive work.',
    section: '3.4.1',
    difficulty: 'intermediate',
    topic: 'Future Access',
  },
  {
    id: 148,
    question: 'What is the main purpose of cable pulling compound?',
    options: [
      'To reduce friction during cable installation',
      'To improve the conductivity of the cores',
      'To seal the conduit against moisture',
      'To identify the cable for later maintenance work',
    ],
    correctAnswer: 0,
    explanation:
      'Cable pulling compound (lubricant) reduces friction between cables and conduit walls, making cable installation easier and preventing damage.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Cable Pulling',
  },
  {
    id: 149,
    question: 'Which section of BS 7671 sets out the zones for a location containing a bath or shower?',
    options: [
      'No special zones',
      'Zone 0, 1, 2 system',
      'Industrial zone system',
      'Safe zone system',
    ],
    correctAnswer: 1,
    explanation:
      'Bathrooms use the Zone 0, 1, 2 system where different zones have varying levels of water exposure requiring appropriate IP ratings and restrictions.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
  },
  {
    id: 150,
    question: 'What documentation should accompany electrical installations?',
    options: [
      'A verbal confirmation to the client that all the work is complete',
      'A receipt for the materials purchased from the wholesaler',
      'Installation certificate, test results, and circuit schedules',
      'A photograph of the consumer unit showing the full circuit chart',
    ],
    correctAnswer: 2,
    explanation:
      'Complete documentation including installation certificates, test results, and detailed circuit schedules must be provided for all electrical installations.',
    section: '3.6.6',
    difficulty: 'basic',
    topic: 'Installation Documentation',
  },

  // Continue adding more questions in similar format to reach exactly 250 questions
  {
    id: 151,
    question: 'Which cable parameter is most critical when calculating voltage drop?',
    options: [
      'The colour of the cable insulation',
      'The IP rating of the enclosure',
      'The ambient humidity of the room',
      'Conductor resistance and current',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage drop is calculated using conductor resistance, cable length, and current, making conductor resistance and current the most critical parameters.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Voltage Drop Calculation',
  },
  {
    id: 152,
    question: 'What is the recommended maximum pulling tension for copper conductors?',
    options: [
      '70N per mm²',
      '50N per mm²',
      '100N per mm²',
      '150N per mm²',
    ],
    correctAnswer: 0,
    explanation:
      'The recommended maximum pulling tension for copper conductors is approximately 70N per mm² of conductor cross-sectional area to prevent damage.',
    section: '3.1.1',
    difficulty: 'advanced',
    topic: 'Cable Pulling Limits',
  },

  // Continue with remaining questions to reach exactly 250...
  // [Questions 153-250 would continue following the same pattern across all sections]
  // For brevity, I'll add a representative sample to show the continued structure:

  {
    id: 301,
    question: 'What type of earthing system is most common in UK domestic installations?',
    options: [
      'TT system',
      'TN-C-S system',
      'TN-S system',
      'IT system',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S (PME) earthing system is most common in UK domestic installations where the neutral and earth are combined in the supply network.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Earthing Systems',
  },

  {
    id: 302,
    question:
      'Which standard specifically covers the selection and erection of electrical equipment?',
    options: [
      'BS 6351',
      'BS 7909',
      'BS 7671',
      'BS 7430',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 (Requirements for Electrical Installations - IET Wiring Regulations) specifically covers the selection and erection of electrical equipment in the UK.',
    section: '3.6.6',
    difficulty: 'basic',
    topic: 'British Standards',
  },

  // Additional questions to reach 250 total (Questions 155-250)
  // Section 3.1: Additional Types of Wiring Systems and Cable Types (25 more questions)
  {
    id: 155,
    question:
      'What is the main difference between LSF (Low Smoke and Fume) and standard PVC cables?',
    options: [
      'A higher current-carrying capacity for the same conductor size',
      'A higher conductor operating temperature rating',
      'Greater flexibility for repeated bending and movement',
      'Reduced toxic gas emission in fire conditions',
    ],
    correctAnswer: 3,
    explanation:
      'LSF cables emit fewer toxic gases and less smoke when exposed to fire, making them safer for use in public buildings and escape routes.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'LSF Cables',
  },
  {
    id: 156,
    question: 'Which cable type would be most appropriate for a fire alarm circuit?',
    options: [
      'Fire resistant cable (FP200)',
      'Twin and earth cable',
      'Standard PVC singles in conduit',
      'Steel wire armoured (SWA) cable',
    ],
    correctAnswer: 0,
    explanation:
      'Fire resistant cables like FP200 maintain circuit integrity during fire conditions, essential for fire alarm systems that must continue operating during emergencies.',
    section: '3.1.8',
    difficulty: 'intermediate',
    topic: 'Fire Resistant Cables',
  },
  {
    id: 157,
    question: 'What does XLPE stand for in cable insulation?',
    options: [
      'Extra Low Polymer Ethernet',
      'Cross-Linked Polyethylene',
      'Extended Life Plastic Enclosure',
      'Extreme Load Polymer Element',
    ],
    correctAnswer: 1,
    explanation:
      'XLPE stands for Cross-Linked Polyethylene, an insulation material with superior thermal and electrical properties compared to standard PVC.',
    section: '3.1.2',
    difficulty: 'advanced',
    topic: 'Cable Insulation Materials',
  },
  {
    id: 158,
    question: 'In which situations would you use MICC (Mineral Insulated Copper Clad) cable?',
    options: [
      'Flexible final connections to portable hand tools',
      'Underfloor data distribution in commercial office areas',
      'High temperature and fire resistant applications',
      'Temporary supplies to hand tools on construction sites',
    ],
    correctAnswer: 2,
    explanation:
      'MICC cable is used in high temperature applications and where fire resistance is critical, such as emergency lighting and fire alarm systems.',
    section: '3.1.8',
    difficulty: 'advanced',
    topic: 'MICC Cable',
  },
  {
    id: 159,
    question: 'What is the main advantage of aluminium conductors over copper?',
    options: [
      'Better conductivity',
      'Better corrosion resistance',
      'Easier installation',
      'Lower cost and weight',
    ],
    correctAnswer: 3,
    explanation:
      'Aluminium conductors are lighter and less expensive than copper, though they have slightly lower conductivity and require special termination techniques.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Conductor Materials',
  },
  {
    id: 160,
    question: 'What safety consideration is important when working with aluminium conductors?',
    options: [
      'Thermal expansion and proper termination techniques',
      'It must never be earthed at the supply intake',
      'It can only be installed in dry indoor locations',
      'It requires double the support spacing needed for copper',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium has different thermal expansion properties and oxidises readily, so it requires proper termination techniques to prevent loose connections and potential fire hazards.',
    section: '3.1.2',
    difficulty: 'advanced',
    topic: 'Aluminium Conductor Safety',
  },
  {
    id: 161,
    question: 'Which cable marking indicates compliance with harmonised European standards?',
    options: [
      'Approval to BS 6004',
      'HAR designation',
      'BASEC approval marking',
      'IEC marking',
    ],
    correctAnswer: 1,
    explanation:
      'HAR (Harmonised Approval and Recognition) designation indicates the cable meets harmonised European standards for construction and performance.',
    section: '3.1.9',
    difficulty: 'intermediate',
    topic: 'Cable Standards',
  },
  {
    id: 162,
    question: 'What is the purpose of cable armouring in SWA cables?',
    options: [
      'Increase the current-carrying capacity of the cable',
      'Improve the flexibility of the cable when pulling',
      'Provide mechanical protection against damage',
      'Reduce the voltage drop along the length of the run',
    ],
    correctAnswer: 2,
    explanation:
      'Cable armouring provides mechanical protection against impact, crushing, and rodent damage, and can also serve as the circuit protective conductor.',
    section: '3.1.4',
    difficulty: 'basic',
    topic: 'Cable Armouring',
  },
  {
    id: 163,
    question:
      'When installing insulated overhead cables across a position accessible to pedestrians only, what is the minimum height above ground?',
    options: [
      '6.0 metres',
      '2.5 metres',
      '3.5 metres',
      '5.2 metres',
    ],
    correctAnswer: 2,
    explanation:
      'IET On-Site Guide Table D2 gives a minimum height of 3.5 metres for insulated overhead lines in positions accessible to pedestrians; 5.2 metres applies where the span is accessible to vehicles.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Overhead Installation',
  },
  {
    id: 164,
    question: 'What determines the current-carrying capacity of a cable?',
    options: [
      'Cross-sectional area of conductor',
      'The colour of the cable insulation',
      'The length of the cable run',
      'The brand of the cable manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'The cross-sectional area of the conductor is the primary factor determining current-carrying capacity, along with installation method and ambient temperature.',
    section: '3.1.10',
    difficulty: 'basic',
    topic: 'Current Capacity',
  },
  {
    id: 165,
    question: 'Which factor does NOT affect cable current-carrying capacity?',
    options: [
      'Ambient temperature',
      'Cable length',
      'Installation method',
      'Grouping with other cables',
    ],
    correctAnswer: 1,
    explanation:
      'Cable length does not affect current-carrying capacity, though it affects voltage drop. Temperature, installation method, and grouping all impact capacity.',
    section: '3.1.10',
    difficulty: 'intermediate',
    topic: 'Current Capacity Factors',
  },
  {
    id: 166,
    question: 'What is the typical temperature rating for standard PVC insulated cables?',
    options: [
      '60°C',
      '90°C',
      '70°C',
      '110°C',
    ],
    correctAnswer: 2,
    explanation:
      'Standard PVC insulated cables are typically rated for continuous operation at 70°C conductor temperature.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Temperature Ratings',
  },
  {
    id: 167,
    question: 'Which cable type would be most suitable for installation in a chemical plant?',
    options: [
      'Standard PVC twin and earth cable in trunking',
      'Lightweight flexible cord with a PVC sheath',
      'Unsheathed single conductors run in plastic trunking',
      'Chemical resistant cable with appropriate sheath',
    ],
    correctAnswer: 3,
    explanation:
      'Chemical plants require cables with chemical resistant sheaths to prevent degradation from exposure to corrosive substances.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Chemical Resistance',
  },
  {
    id: 168,
    question: "What does the term 'volt drop' refer to in cable selection?",
    options: [
      'Voltage reduction along cable length due to resistance',
      'The sudden loss of the supply that follows when a fuse blows',
      'The difference between the line and neutral colours',
      'The voltage induced in one cable by another cable nearby',
    ],
    correctAnswer: 0,
    explanation:
      'Volt drop is the reduction in voltage along a cable due to the resistance of the conductors, which must be limited to ensure proper equipment operation.',
    section: '3.1.10',
    difficulty: 'basic',
    topic: 'Voltage Drop',
  },
  {
    id: 169,
    question: 'What is the maximum permitted voltage drop for lighting circuits under BS 7671?',
    options: [
      '5% of nominal voltage',
      '3% of nominal voltage',
      '8% of nominal voltage',
      '10% of nominal voltage',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 limits voltage drop to 3% of nominal voltage for lighting circuits to ensure adequate illumination levels.',
    section: '3.1.10',
    difficulty: 'intermediate',
    topic: 'Voltage Drop Limits',
  },
  {
    id: 170,
    question: 'Which installation method would result in the highest current-carrying capacity?',
    options: [
      'Cables buried directly in ground',
      'Cables bunched together in conduit',
      'Single cable in free air',
      'Cables in a small trunking system',
    ],
    correctAnswer: 2,
    explanation:
      'Single cable in free air has the best heat dissipation, resulting in the highest current-carrying capacity compared to enclosed or grouped installations.',
    section: '3.1.10',
    difficulty: 'intermediate',
    topic: 'Installation Methods',
  },
  {
    id: 171,
    question: 'What protection is required when cables pass through walls or floors?',
    options: [
      'A larger conductor cross-sectional area',
      'A second circuit protective conductor',
      'A green-and-yellow identification sleeve',
      'Suitable sleeve or grommet',
    ],
    correctAnswer: 3,
    explanation:
      'Cables passing through walls or floors require protection via suitable sleeves or grommets to prevent damage from sharp edges.',
    section: '3.1.11',
    difficulty: 'basic',
    topic: 'Cable Protection',
  },
  {
    id: 172,
    question: 'What does BS 7671 require of the depth at which a cable is buried directly in the ground?',
    options: [
      '600mm minimum',
      '450mm minimum',
      '900mm minimum',
      '300mm minimum',
    ],
    correctAnswer: 0,
    explanation:
      'Underground cables should be buried at a minimum depth of 600mm to provide adequate protection from mechanical damage.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Underground Installation',
  },
  {
    id: 173,
    question: 'What warning method is required above buried cables?',
    options: [
      'Metal detection system',
      'Warning tape or tiles',
      'Concrete slab',
      'No warning required',
    ],
    correctAnswer: 1,
    explanation:
      'Warning tape or tiles should be placed above buried cables to alert future excavators to the presence of electrical services.',
    section: '3.1.7',
    difficulty: 'basic',
    topic: 'Cable Marking',
  },
  {
    id: 174,
    question: 'Which colour is used for the protective conductor in UK installations?',
    options: [
      'Red',
      'Black',
      'Green and yellow',
      'Blue',
    ],
    correctAnswer: 2,
    explanation:
      'Green and yellow is the standard colour for protective conductors (earth) in UK electrical installations according to BS 7671.',
    section: '3.1.12',
    difficulty: 'basic',
    topic: 'Conductor Colours',
  },
  {
    id: 175,
    question: 'What is the neutral conductor colour in single-phase UK installations?',
    options: [
      'Black',
      'Grey',
      'Brown',
      'Blue',
    ],
    correctAnswer: 3,
    explanation:
      'Blue is the standard colour for neutral conductors in UK single-phase installations according to harmonised European standards.',
    section: '3.1.12',
    difficulty: 'basic',
    topic: 'Conductor Colours',
  },
  {
    id: 176,
    question: 'What factor should be considered when selecting cable size for motor circuits?',
    options: [
      'Starting current and running current',
      'The colour of the motor casing and cover',
      'The number of bends in the whole cable run',
      'The brand name of the motor manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Motor circuits must be sized considering both starting current (which can be 6-8 times running current) and continuous running current.',
    section: '3.1.10',
    difficulty: 'advanced',
    topic: 'Motor Circuits',
  },
  {
    id: 177,
    question: 'Which test should be performed before energising a new cable installation?',
    options: [
      'A load test under full demand',
      'Insulation resistance test',
      'An earth fault loop impedance test',
      'An RCD trip-time test',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance testing (a dead test) must be performed before energising new installations to verify insulation integrity and safety.',
    section: '3.1.13',
    difficulty: 'intermediate',
    topic: 'Cable Testing',
  },
  {
    id: 178,
    question: 'What minimum insulation resistance does Table 64 of BS 7671 require for a 230 V circuit tested at 500 V DC?',
    options: [
      '0.5 MΩ',
      '2 MΩ',
      '1 MΩ',
      '5 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum insulation resistance for most low voltage installations is 1 MΩ, measured between conductors and between conductors and earth.',
    section: '3.1.13',
    difficulty: 'intermediate',
    topic: 'Insulation Resistance',
  },
  {
    id: 179,
    question: 'When should cable installation records be completed?',
    options: [
      'Only when a fault is later reported',
      'Several years after the work is done',
      'Before any of the design work has been started',
      'During and immediately after installation',
    ],
    correctAnswer: 3,
    explanation:
      'Installation records should be completed during and immediately after installation to ensure accurate documentation whilst details are fresh.',
    section: '3.1.14',
    difficulty: 'basic',
    topic: 'Documentation',
  },

  // Section 3.2: Additional Cable Containment Systems (20 more questions)
  {
    id: 180,
    question: 'What is the main purpose of using cable basket instead of solid tray?',
    options: [
      'Better ventilation and lighter weight',
      'Greater protection from falling objects',
      'A continuous solid surface for the cables',
      'Higher resistance to electromagnetic interference',
    ],
    correctAnswer: 0,
    explanation:
      'Cable basket provides better ventilation for heat dissipation and is lighter than solid tray whilst still providing adequate support.',
    section: '3.2.4',
    difficulty: 'intermediate',
    topic: 'Cable Basket',
  },
  {
    id: 181,
    question: 'Which type of containment would be most suitable for outdoor installations?',
    options: [
      'Standard PVC trunking with a clip-on lid',
      'Galvanised steel tray with weather protection',
      'Untreated mild steel basket fixed on wall brackets',
      'Cardboard cable management ducting with taped joints',
    ],
    correctAnswer: 1,
    explanation:
      'Galvanised steel tray with appropriate weather protection provides durability and corrosion resistance for outdoor installations.',
    section: '3.2.8',
    difficulty: 'intermediate',
    topic: 'Outdoor Containment',
  },
  {
    id: 182,
    question: 'What determines the minimum radius at which cables may change direction on a cable tray?',
    options: [
      'Equal to tray width',
      '1.5 times tray width',
      '3 times tray width',
      '6 times tray width',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum bending radius for cable tray should be 3 times the tray width to prevent cable damage and maintain proper support.',
    section: '3.2.7',
    difficulty: 'advanced',
    topic: 'Bending Radius',
  },
  {
    id: 183,
    question: 'Which material is most commonly used for internal cable trunking?',
    options: [
      'Galvanised steel',
      'Stainless steel',
      'Aluminium',
      'PVC',
    ],
    correctAnswer: 3,
    explanation:
      'PVC is most commonly used for internal cable trunking due to its cost-effectiveness, corrosion resistance, and ease of installation.',
    section: '3.2.3',
    difficulty: 'basic',
    topic: 'Trunking Materials',
  },
  {
    id: 184,
    question:
      'What safety consideration is important when installing overhead containment systems?',
    options: [
      'Adequate support and fall protection during installation',
      'Using only PVC containment systems when working at height',
      'Painting the containment a bright colour before it is fixed',
      'Installing all the cables before fitting any of the supports',
    ],
    correctAnswer: 0,
    explanation:
      'Overhead installations require adequate structural support and proper fall protection measures during installation to prevent accidents.',
    section: '3.2.9',
    difficulty: 'intermediate',
    topic: 'Overhead Safety',
  },
  {
    id: 185,
    question:
      'What is the maximum recommended space factor for cables in a straight run of trunking, per the IET On-Site Guide?',
    options: [
      '30%',
      '45%',
      '40%',
      '60%',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Appendix E gives a maximum 45% space factor for cables in straight runs of trunking, allowing for heat dissipation, ease of installation and future additions.',
    section: '3.2.3',
    difficulty: 'intermediate',
    topic: 'Trunking Space Factor',
  },
  {
    id: 186,
    question: 'Which type of tray joint allows for thermal movement?',
    options: [
      'Bolted joint',
      'Compression joint',
      'Expansion joint',
      'Welded joint',
    ],
    correctAnswer: 2,
    explanation:
      'Expansion joints in cable tray systems accommodate thermal movement, preventing stress and damage to the installation.',
    section: '3.2.7',
    difficulty: 'advanced',
    topic: 'Expansion Joints',
  },
  {
    id: 187,
    question: 'What is the purpose of cable tray covers?',
    options: [
      'To increase the current rating of the cables',
      'To act as the circuit protective conductor',
      'To reduce the weight of the installation',
      'Protection from falling objects and weather',
    ],
    correctAnswer: 3,
    explanation:
      'Cable tray covers protect cables from falling objects, weather, and unauthorised access whilst maintaining ventilation.',
    section: '3.2.4',
    difficulty: 'basic',
    topic: 'Tray Covers',
  },
  {
    id: 188,
    question:
      'When installing containment in areas with high electromagnetic interference, which material should be avoided?',
    options: [
      'PVC',
      'Aluminium',
      'Stainless steel',
      'Galvanised steel',
    ],
    correctAnswer: 0,
    explanation:
      'PVC should be avoided in high EMI areas as it provides no electromagnetic shielding, unlike metallic containment systems.',
    section: '3.2.10',
    difficulty: 'advanced',
    topic: 'EMI Considerations',
  },
  {
    id: 189,
    question: 'What is the main advantage of using spring toggle fixings?',
    options: [
      'They are the cheapest fixing available on the market',
      'Suitable for hollow walls where back access is unavailable',
      'They are the best fixing to use in solid masonry walls',
      'They require no drilling of the wall surface before fitting',
    ],
    correctAnswer: 1,
    explanation:
      'Spring toggle fixings expand behind hollow walls, providing secure fixing where back access is not available for through-bolts.',
    section: '3.2.6',
    difficulty: 'intermediate',
    topic: 'Fixing Methods',
  },
  {
    id: 190,
    question: 'Which factor determines the required strength of containment system supports?',
    options: [
      'The colour of the containment system used',
      'The supply voltage of the circuits carried',
      'Total weight of cables and containment',
      'The number of cores in each cable',
    ],
    correctAnswer: 2,
    explanation:
      'Support strength must be calculated based on the total weight of cables and containment system, including safety factors.',
    section: '3.2.6',
    difficulty: 'intermediate',
    topic: 'Support Calculations',
  },
  {
    id: 191,
    question: 'What is the purpose of earthing cable tray systems?',
    options: [
      'To increase the current rating of the cables',
      'To reduce the weight of the installation',
      'To improve the appearance of the tray',
      'Safety - to prevent dangerous potentials',
    ],
    correctAnswer: 3,
    explanation:
      'Metallic cable tray systems must be earthed to prevent dangerous potentials that could arise from cable faults or induced voltages.',
    section: '3.2.11',
    difficulty: 'intermediate',
    topic: 'Tray Earthing',
  },
  {
    id: 192,
    question: 'Which containment system would be most appropriate for a clean room environment?',
    options: [
      'Stainless steel containment',
      'Open galvanised wire-mesh basket',
      'Untreated mild steel cable tray',
      'Standard PVC trunking and fittings',
    ],
    correctAnswer: 0,
    explanation:
      'Stainless steel containment is most appropriate for clean rooms due to its corrosion resistance and ease of cleaning and sterilisation.',
    section: '3.2.12',
    difficulty: 'advanced',
    topic: 'Specialist Environments',
  },
  {
    id: 193,
    question: 'What maintenance consideration is important for external containment systems?',
    options: [
      'Repainting it to match the building each year',
      'Regular inspection for corrosion and weathering',
      'Replacing it completely every twelve months',
      'Removing all of the covers to improve the ventilation',
    ],
    correctAnswer: 1,
    explanation:
      'External containment systems require regular inspection for corrosion, weathering, and structural integrity to ensure continued safe operation.',
    section: '3.2.8',
    difficulty: 'basic',
    topic: 'Containment Maintenance',
  },
  {
    id: 194,
    question: 'Which type of conduit coupling provides the best mechanical protection?',
    options: [
      'Push-fit coupling',
      'Compression coupling',
      'Threaded coupling',
      'Snap-fit coupling',
    ],
    correctAnswer: 2,
    explanation:
      'Threaded couplings provide the most secure mechanical connection and best protection against separation under stress.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Couplings',
  },
  {
    id: 195,
    question: 'What is the purpose of fire barriers in containment systems?',
    options: [
      'Support the whole weight of the cables carried',
      'Improve the current rating of all the cables carried',
      'Provide a path to earth for the whole containment system',
      'Prevent fire spread through containment openings',
    ],
    correctAnswer: 3,
    explanation:
      'Fire barriers prevent fire and smoke from spreading through containment system openings between fire compartments.',
    section: '3.2.13',
    difficulty: 'advanced',
    topic: 'Fire Protection',
  },
  {
    id: 196,
    question: 'Which document provides guidance on cable containment installation?',
    options: [
      "BS EN 61537 and manufacturer's instructions",
      'BS 1363 (plugs, socket-outlets and adaptors)',
      'BS EN 60898 (circuit-breakers for household use)',
      'BS 5839 (fire detection and fire alarm systems)',
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 61537 provides specific guidance on cable management (tray and ladder) systems, along with manufacturer's instructions and BS 7671 requirements.",
    section: '3.2.14',
    difficulty: 'intermediate',
    topic: 'Installation Standards',
  },
  {
    id: 197,
    question: 'What spacing between fixings is recommended for cables run vertically on a cable tray?',
    options: [
      'Every 500mm',
      'Every 400mm',
      'Every 1000mm',
      'Every 300mm',
    ],
    correctAnswer: 1,
    explanation:
      'Cable ties on vertical runs should typically be spaced every 400mm to provide adequate support against gravitational forces.',
    section: '3.2.15',
    difficulty: 'intermediate',
    topic: 'Cable Support',
  },
  {
    id: 198,
    question: 'Which factor is most important when selecting containment for data cables?',
    options: [
      'The colour of the containment system used',
      'The weight of the data cables carried',
      'EMI shielding and separation from power cables',
      'The supply voltage of the circuits running nearby',
    ],
    correctAnswer: 2,
    explanation:
      'Data cables require EMI shielding and separation from power cables to prevent interference that could affect signal quality.',
    section: '3.2.16',
    difficulty: 'advanced',
    topic: 'Data Cable Containment',
  },
  {
    id: 199,
    question: 'What is the main drawback of installing containment significantly larger than the calculated size?',
    options: [
      'Improved access to the cables',
      'Easier installation of all the cables',
      'Better heat dissipation from the cables',
      'Unnecessary cost and space usage',
    ],
    correctAnswer: 3,
    explanation:
      'Oversized containment systems result in unnecessary cost and space usage without providing proportional benefits to the installation.',
    section: '3.2.1',
    difficulty: 'basic',
    topic: 'Containment Sizing',
  },

  // Section 3.3: Additional Electrical Tools and Equipment (15 more questions)
  {
    id: 200,
    question: 'Which test equipment would you use to measure earth fault loop impedance?',
    options: [
      'Earth fault loop impedance tester',
      'Insulation resistance test instrument',
      'Three-phase rotation indicator lamp',
      'Approved voltage indicator and prover',
    ],
    correctAnswer: 0,
    explanation:
      'Earth fault loop impedance testers are specifically designed to measure the impedance of the earth fault path for protection device operation verification.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Loop Impedance Testing',
  },
  {
    id: 201,
    question: 'What is the purpose of a proving unit when using voltage indicators?',
    options: [
      'Measure the earth fault loop impedance at the origin',
      'Verify the voltage indicator is working correctly',
      'Test the operation of an RCD at full load',
      'Measure the insulation resistance of a circuit',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit verifies that voltage indicators are functioning correctly before and after use, ensuring safe isolation procedures.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Proving Units',
  },
  {
    id: 202,
    question: 'Which tool would be most suitable for terminating SWA cable glands?',
    options: [
      'Adjustable wrench',
      'Flat-blade screwdriver',
      'Cable gland spanners',
      'Standard engineer\'s pliers',
    ],
    correctAnswer: 2,
    explanation:
      'Cable gland spanners are specifically designed for terminating cable glands, providing the correct grip and torque without damage.',
    section: '3.3.1',
    difficulty: 'basic',
    topic: 'Specialist Tools',
  },
  {
    id: 203,
    question: 'What safety feature should be present on power tools used in wet conditions?',
    options: [
      'A brightly coloured plastic casing',
      'A larger motor than usual for the tool',
      'A built-in voltage warning indicator',
      '110V supply or battery operation',
    ],
    correctAnswer: 3,
    explanation:
      'Power tools used in wet conditions should operate at reduced low voltage (110V centre-tapped to earth) via a transformer, or be battery operated, to reduce shock risk.',
    section: '3.3.2',
    difficulty: 'intermediate',
    topic: 'Wet Condition Safety',
  },
  {
    id: 204,
    question:
      'Which measurement range is most appropriate for testing domestic installation insulation resistance?',
    options: [
      '0-1000 MΩ',
      '0-100 MΩ',
      '0-1 MΩ',
      '0-10 GΩ',
    ],
    correctAnswer: 0,
    explanation:
      'A range of 0-1000 MΩ is appropriate for domestic installations, providing adequate resolution for the 1 MΩ minimum requirement.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Test Equipment Ranges',
  },
  {
    id: 205,
    question: 'What is the main purpose of RCD testing equipment?',
    options: [
      'Measure the earth fault loop impedance',
      'Verify RCD operation time and trip current',
      'Measure the insulation resistance value',
      'Check the phase sequence of the incoming supply',
    ],
    correctAnswer: 1,
    explanation:
      'RCD testers verify that residual current devices operate within specified time and current parameters for safety protection.',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'RCD Testing',
  },
  {
    id: 206,
    question:
      'Which personal protective equipment is essential when using cable pulling equipment?',
    options: [
      'Safety glasses on their own',
      'A hard hat on its own',
      'Gloves and safety glasses',
      'A high-visibility vest on its own',
    ],
    correctAnswer: 2,
    explanation:
      'Gloves protect hands from cable tension and pulling compounds, whilst safety glasses protect from flying debris or snapping cables.',
    section: '3.3.6',
    difficulty: 'basic',
    topic: 'Cable Pulling Safety',
  },
  {
    id: 207,
    question: 'What limits the maximum pulling tension that may be applied to a copper conductor drawn into conduit?',
    options: [
      'As much force as the cable puller is able to apply',
      'A fixed limit of 1000 N for every type of cable',
      'Whatever force is needed to free a cable that sticks',
      "Based on cable manufacturer's specifications",
    ],
    correctAnswer: 3,
    explanation:
      "Cable pulling force should not exceed the manufacturer's specifications (related to conductor csa) to prevent conductor damage or insulation stress.",
    section: '3.3.7',
    difficulty: 'intermediate',
    topic: 'Cable Pulling Limits',
  },
  {
    id: 208,
    question: 'Which tool would be most appropriate for cutting armoured cable?',
    options: [
      'Hacksaw or armoured cable cutter',
      'Standard wire strippers',
      'A pair of small side cutters',
      'A retractable-blade trimming knife',
    ],
    correctAnswer: 0,
    explanation:
      'Armoured cables require special cutting tools like hacksaws or armoured cable cutters designed to handle the steel armouring.',
    section: '3.3.1',
    difficulty: 'basic',
    topic: 'Armoured Cable Tools',
  },
  {
    id: 209,
    question: 'What calibration frequency is typically required for electrical test equipment?',
    options: [
      'Monthly',
      'Annually',
      '6 months',
      'Every 5 years',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical test equipment typically requires annual calibration to ensure accuracy and compliance with testing standards.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'Equipment Calibration',
  },
  {
    id: 210,
    question: 'Which factor is most important when selecting ladder for electrical work?',
    options: [
      'The lightest possible aluminium frame',
      'The lowest purchase cost',
      'Non-conductive material (fibreglass)',
      'A bright colour for visibility',
    ],
    correctAnswer: 2,
    explanation:
      'Ladders for electrical work should be made from non-conductive materials like fibreglass to prevent electric shock hazards.',
    section: '3.3.8',
    difficulty: 'basic',
    topic: 'Access Equipment',
  },
  {
    id: 211,
    question: 'What is the purpose of a phase rotation indicator?',
    options: [
      'Measure the insulation resistance of a circuit',
      'Verify a circuit is dead before working on it',
      'Measure the earth fault loop impedance',
      'Check correct phase sequence in three-phase systems',
    ],
    correctAnswer: 3,
    explanation:
      'Phase rotation indicators verify the correct phase sequence in three-phase systems, ensuring motors rotate in the correct direction.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Phase Testing',
  },
  {
    id: 212,
    question: 'Which test should be performed first when commissioning a new installation?',
    options: [
      'Visual inspection',
      'Insulation resistance',
      'RCD testing',
      'Load testing',
    ],
    correctAnswer: 0,
    explanation:
      'Visual inspection should always be performed first to identify obvious defects before applying test voltages or energising circuits.',
    section: '3.3.9',
    difficulty: 'basic',
    topic: 'Testing Sequence',
  },
  {
    id: 213,
    question: 'What information should be recorded when using test equipment?',
    options: [
      'Only a pass or fail tick',
      'Results, test conditions, and equipment details',
      'The retail price of the test instrument',
      'The name of the building architect',
    ],
    correctAnswer: 1,
    explanation:
      'Test records should include results, test conditions (temperature, humidity), equipment used, and calibration status for complete documentation.',
    section: '3.3.10',
    difficulty: 'intermediate',
    topic: 'Test Documentation',
  },
  {
    id: 214,
    question: 'Which safety precaution is essential before using electrical test equipment?',
    options: [
      'Paint the instrument the company colour',
      'Remove the fused test leads to save the fuse',
      'Verify equipment is calibrated and functioning correctly',
      'Set the instrument to its highest range only',
    ],
    correctAnswer: 2,
    explanation:
      'Test equipment must be verified as calibrated and functioning correctly before use to ensure accurate and safe testing procedures.',
    section: '3.3.4',
    difficulty: 'basic',
    topic: 'Pre-Test Safety',
  },

  // Section 3.4: Additional Installation Methods and Techniques (15 more questions)
  {
    id: 215,
    question: "What is the main purpose of 'second fix' electrical work?",
    options: [
      'Installing back boxes and pulling in cables',
      'Chasing the walls and laying containment',
      'Producing the circuit design and schedules',
      'Installing accessories and making final connections',
    ],
    correctAnswer: 3,
    explanation:
      'Second fix involves installing accessories (switches, sockets), making final connections, and completing the installation after plastering.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'Second Fix',
  },
  {
    id: 216,
    question:
      'Which zones around a bath are designated as special locations requiring additional protection?',
    options: [
      'Zone 0, 1, and 2',
      'Zone 1 only',
      'Zone 0 and 1 only',
      'No special zones',
    ],
    correctAnswer: 0,
    explanation:
      'Bathroom installations have Zone 0 (inside bath), Zone 1 (above bath), and Zone 2 (surrounding area) requiring specific IP ratings and RCD protection.',
    section: '3.4.8',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
  },
  {
    id: 217,
    question: 'At what depth in a chase does a concealed cable stop needing additional protection under Table 52.1?',
    options: [
      '5mm minimum from surface',
      '25mm minimum from surface',
      '75mm minimum from surface',
      '150mm minimum from surface',
    ],
    correctAnswer: 1,
    explanation:
      'A common guideline is for chased cables to sit at least 25mm from the finished surface; cables concealed at under 50mm depth (outside a prescribed zone) also require 30 mA RCD protection.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Chasing Depth',
  },
  {
    id: 218,
    question: 'In which directions may a concealed cable be run in a wall so that it stays within a prescribed zone?',
    options: [
      'Any direction',
      'Diagonally for shortest route',
      'Horizontally or vertically only',
      'Following existing services',
    ],
    correctAnswer: 2,
    explanation:
      'Cables in walls should run horizontally or vertically only, making their routes predictable and reducing the risk of accidental damage.',
    section: '3.4.3',
    difficulty: 'basic',
    topic: 'Cable Routes',
  },
  {
    id: 219,
    question:
      'What protection method is required for cables installed in timber frame construction?',
    options: [
      'No protection is needed in timber',
      'A green-and-yellow identification sleeve',
      'A larger conductor cross-sectional area',
      'Oval conduit or suitable protection against nails',
    ],
    correctAnswer: 3,
    explanation:
      'Cables in timber frames require protection against nails and screws (where less than 50mm from the surface), typically using steel protective plates or by 30 mA RCD protection.',
    section: '3.4.4',
    difficulty: 'intermediate',
    topic: 'Timber Frame Protection',
  },
  {
    id: 220,
    question: 'Which installation method provides the best protection against mechanical damage?',
    options: [
      'Installation in steel conduit',
      'Cables clipped direct to a surface',
      'Cables laid loose in a ceiling void',
      'Cables run on an open wire basket',
    ],
    correctAnswer: 0,
    explanation:
      'Steel conduit provides excellent mechanical protection against impact, crushing, and other physical damage.',
    section: '3.4.5',
    difficulty: 'basic',
    topic: 'Mechanical Protection',
  },
  {
    id: 221,
    question:
      'Beyond how many 90 degree bends does the On-Site Guide method require a draw-in box in a conduit run?',
    options: [
      '1',
      '2',
      '3',
      '4',
    ],
    correctAnswer: 1,
    explanation:
      'A maximum of two 90° bends is allowed in a conduit run without an inspection box to ensure cables can be drawn in and withdrawn safely.',
    section: '3.4.6',
    difficulty: 'intermediate',
    topic: 'Conduit Bends',
  },
  {
    id: 222,
    question:
      'Which termination method provides the most reliable connection for high current applications?',
    options: [
      'Twisted and taped joints',
      'A simple screwed connector block',
      'Crimped lugs with appropriate terminals',
      'Push-fit lever connectors',
    ],
    correctAnswer: 2,
    explanation:
      'Crimped lugs with appropriate terminals provide the most reliable, low-resistance connections for high current applications.',
    section: '3.4.7',
    difficulty: 'advanced',
    topic: 'High Current Terminations',
  },
  {
    id: 223,
    question: 'What is the purpose of segregation in electrical installations?',
    options: [
      'To increase the current rating of grouped cables',
      'To reduce the cost of the installation',
      'To remove the need for a protective conductor',
      'Separate different voltage levels and prevent interference',
    ],
    correctAnswer: 3,
    explanation:
      'Segregation separates different voltage levels and signal types to prevent dangerous cross-connections and electromagnetic interference.',
    section: '3.4.9',
    difficulty: 'intermediate',
    topic: 'Circuit Segregation',
  },
  {
    id: 224,
    question: 'Which factor determines the minimum bending radius for cables during installation?',
    options: [
      'Cable diameter and manufacturer specifications',
      'The colour of the cable sheath',
      'The supply voltage of the circuit',
      'The ambient temperature of the room',
    ],
    correctAnswer: 0,
    explanation:
      'Minimum bending radius is determined by cable diameter and manufacturer specifications to prevent conductor or insulation damage.',
    section: '3.4.10',
    difficulty: 'intermediate',
    topic: 'Cable Bending',
  },
  {
    id: 225,
    question: 'What earthing arrangement is required for Class II (double insulated) equipment?',
    options: [
      'Standard earthing',
      'No earthing required',
      'Enhanced earthing',
      'Separate earth electrode',
    ],
    correctAnswer: 1,
    explanation:
      'Class II equipment has double insulation and does not require earthing, as it provides protection through insulation rather than earthing.',
    section: '3.4.11',
    difficulty: 'intermediate',
    topic: 'Equipment Classes',
  },
  {
    id: 226,
    question:
      'Which installation method would be most appropriate for a temporary construction site distribution?',
    options: [
      'A 230V system with domestic socket outlets',
      'Bare overhead conductors on insulators',
      '110V distribution system with robust connectors',
      'A 400V three-phase supply to all tools',
    ],
    correctAnswer: 2,
    explanation:
      'Temporary construction sites should use 110V (centre-tapped to earth) distribution systems with robust weatherproof connectors for safety and durability.',
    section: '3.4.12',
    difficulty: 'intermediate',
    topic: 'Temporary Installations',
  },
  {
    id: 227,
    question: 'What documentation must be provided upon completion of an electrical installation?',
    options: [
      'Only a verbal handover to the client',
      'A receipt for the materials used',
      'A photograph of the consumer unit',
      'Installation certificate and relevant schedules',
    ],
    correctAnswer: 3,
    explanation:
      'Upon completion, an installation certificate must be provided along with relevant schedules including test results and circuit details.',
    section: '3.4.13',
    difficulty: 'basic',
    topic: 'Installation Certification',
  },
  {
    id: 228,
    question: 'Which regulation governs the electrical installation requirements in the UK?',
    options: [
      'BS 7671 (18th Edition)',
      'IEC 60364',
      'IEEE standards',
      'Local building regulations only',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 (currently 18th Edition) is the UK standard for electrical installations, incorporating IEC 60364 with UK-specific requirements.',
    section: '3.4.14',
    difficulty: 'basic',
    topic: 'UK Regulations',
  },
  {
    id: 229,
    question:
      'What is the maximum floor area served by a 20 A radial circuit in 2.5 mm squared supplying socket-outlets, per the On-Site Guide?',
    options: [
      '20 metres',
      '30 metres',
      '25 metres',
      '50 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Radial circuits supplying 13A socket outlets are typically limited to 30 metres to ensure adequate protection and voltage regulation.',
    section: '3.4.15',
    difficulty: 'intermediate',
    topic: 'Circuit Design',
  },

  // Section 3.5: Additional Basic Electrical Theory (15 more questions)
  {
    id: 230,
    question: 'What happens to current in a series circuit when resistance increases?',
    options: [
      'Current increases',
      'Current remains constant',
      'Current decreases',
      'Current becomes zero',
    ],
    correctAnswer: 2,
    explanation:
      "In a series circuit, when resistance increases while voltage remains constant, current decreases according to Ohm's law (I = V/R).",
    section: '3.5.1',
    difficulty: 'basic',
    topic: 'Series Circuits',
  },
  {
    id: 231,
    question:
      'In a parallel circuit, what happens to total resistance when more branches are added?',
    options: [
      'Total resistance increases',
      'Total resistance becomes infinite',
      'Total resistance remains the same',
      'Total resistance decreases',
    ],
    correctAnswer: 3,
    explanation:
      'In parallel circuits, adding more branches provides additional paths for current, resulting in lower total resistance.',
    section: '3.5.2',
    difficulty: 'basic',
    topic: 'Parallel Circuits',
  },
  {
    id: 232,
    question: 'What is the relationship between power, voltage, and current?',
    options: [
      'P = V × I',
      'P = V - I',
      'P = V + I',
      'P = V ÷ I',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical power equals voltage multiplied by current (P = V × I), representing the rate of energy consumption or conversion.',
    section: '3.5.3',
    difficulty: 'basic',
    topic: 'Power Calculations',
  },
  {
    id: 233,
    question: 'What unit is used to measure electrical resistance?',
    options: [
      'Volts',
      'Ohms',
      'Amperes',
      'Watts',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical resistance is measured in ohms (Ω), named after Georg Ohm who discovered the relationship between voltage, current, and resistance.',
    section: '3.5.4',
    difficulty: 'basic',
    topic: 'Units of Measurement',
  },
  {
    id: 234,
    question: 'What is the frequency of the UK mains electricity supply?',
    options: [
      '25 Hz',
      '60 Hz',
      '50 Hz',
      '100 Hz',
    ],
    correctAnswer: 2,
    explanation:
      'The UK mains electricity supply operates at 50 Hz (cycles per second), which is the standard frequency for European electrical systems.',
    section: '3.5.5',
    difficulty: 'basic',
    topic: 'AC Fundamentals',
  },
  {
    id: 235,
    question: 'For a 230 V RMS sinusoidal supply, what is the approximate peak voltage?',
    options: [
      '230V',
      '162V',
      '460V',
      '325V',
    ],
    correctAnswer: 3,
    explanation:
      'The peak voltage of an AC supply is approximately 1.414 times the RMS value, so 230V RMS equals approximately 325V peak.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'AC Values',
  },
  {
    id: 236,
    question: 'Which material is the best conductor of electricity?',
    options: [
      'Silver',
      'Copper',
      'Aluminium',
      'Gold',
    ],
    correctAnswer: 0,
    explanation:
      'Silver is the best conductor of electricity, though copper is more commonly used due to cost considerations and good conductivity.',
    section: '3.5.6',
    difficulty: 'basic',
    topic: 'Conductor Materials',
  },
  {
    id: 237,
    question: 'What effect does temperature have on the resistance of copper conductors?',
    options: [
      'Resistance decreases with temperature',
      'Resistance increases with temperature',
      'Resistance is unaffected by temperature',
      'Resistance falls to zero when heated',
    ],
    correctAnswer: 1,
    explanation:
      'For copper conductors, resistance increases with temperature due to increased atomic vibration interfering with electron flow.',
    section: '3.5.7',
    difficulty: 'intermediate',
    topic: 'Temperature Effects',
  },
  {
    id: 238,
    question: 'What is the principle behind electromagnetic induction?',
    options: [
      'Heating a conductor produces a current',
      'A static charge attracts a nearby conductor',
      'Moving magnetic field induces voltage in conductor',
      'Light striking a conductor produces a voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Electromagnetic induction occurs when a changing magnetic field induces a voltage in a conductor, fundamental to transformer and generator operation.',
    section: '3.5.8',
    difficulty: 'intermediate',
    topic: 'Electromagnetic Induction',
  },
  {
    id: 239,
    question: 'What determines the strength of an electromagnetic field around a conductor?',
    options: [
      'The colour of the conductor insulation',
      'The length of the conductor only',
      'The ambient temperature of the room',
      'Current flowing through the conductor',
    ],
    correctAnswer: 3,
    explanation:
      'The strength of the electromagnetic field around a conductor is directly proportional to the current flowing through it.',
    section: '3.5.9',
    difficulty: 'basic',
    topic: 'Electromagnetic Fields',
  },
  {
    id: 240,
    question: 'What is the purpose of a fuse in an electrical circuit?',
    options: [
      'Provide overcurrent protection',
      'Increase the supply voltage to the load',
      'Provide additional protection against shock',
      'Reduce the voltage drop along the cable',
    ],
    correctAnswer: 0,
    explanation:
      'A fuse provides overcurrent protection by melting and breaking the circuit when current exceeds its rated value, preventing damage or fire.',
    section: '3.5.10',
    difficulty: 'basic',
    topic: 'Circuit Protection',
  },
  {
    id: 241,
    question: 'What happens to voltage across components in a series circuit?',
    options: [
      'It is the same across every component',
      'Divides proportionally to resistance',
      'It is zero across every component',
      'It doubles across each successive component',
    ],
    correctAnswer: 1,
    explanation:
      'In series circuits, voltage divides across components proportionally to their resistance values, with the sum equalling supply voltage.',
    section: '3.5.1',
    difficulty: 'intermediate',
    topic: 'Voltage Division',
  },
  {
    id: 242,
    question:
      'What is the relationship between voltage and current in a purely resistive AC circuit?',
    options: [
      'Voltage leads current by 90°',
      'Current leads voltage by 90°',
      'Voltage and current are in phase',
      'No relationship exists',
    ],
    correctAnswer: 2,
    explanation:
      'In purely resistive AC circuits, voltage and current are in phase, meaning they reach their peak values at the same time.',
    section: '3.5.11',
    difficulty: 'intermediate',
    topic: 'AC Phase Relationships',
  },
  {
    id: 243,
    question: 'What is the typical voltage between line and neutral in UK single-phase supplies?',
    options: [
      '400V',
      '110V',
      '415V',
      '230V',
    ],
    correctAnswer: 3,
    explanation:
      'UK single-phase supplies provide 230V between line and neutral, which is the standard domestic supply voltage.',
    section: '3.5.12',
    difficulty: 'basic',
    topic: 'UK Supply Voltages',
  },
  {
    id: 244,
    question:
      'What safety device operates by detecting imbalance between line and neutral currents?',
    options: [
      'Residual Current Device (RCD)',
      'Miniature Circuit Breaker (MCB)',
      'Rewireable fuse (BS 3036)',
      'Surge Protection Device (SPD)',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs detect imbalance between line and neutral currents, indicating current leakage to earth, and trip to prevent electric shock.',
    section: '3.5.13',
    difficulty: 'basic',
    topic: 'RCD Operation',
  },

  // Section 3.6: Additional Inspection and Testing (6 more questions)
  {
    id: 245,
    question: 'What is the first step in any electrical testing procedure?',
    options: [
      'Measure insulation resistance',
      'Visual inspection',
      'Connect test equipment',
      'Test RCD operation',
    ],
    correctAnswer: 1,
    explanation:
      'Visual inspection is always the first step in testing procedures to identify obvious defects before applying test voltages.',
    section: '3.6.1',
    difficulty: 'basic',
    topic: 'Testing Procedures',
  },
  {
    id: 246,
    question:
      'What DC test voltage does Table 64 of BS 7671 specify for a 230 V circuit?',
    options: [
      '250V DC',
      '1000V DC',
      '500V DC',
      '230V AC',
    ],
    correctAnswer: 2,
    explanation:
      '500V DC is typically used for insulation resistance testing on low voltage installations to verify insulation integrity.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Insulation Testing',
  },
  {
    id: 247,
    question: 'What should be done with electronic equipment before insulation resistance testing?',
    options: [
      'Leave connected',
      'Test at higher current',
      'Increase voltage',
      'Disconnect or short out',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic equipment should be disconnected or shorted out before insulation testing to prevent damage from the test voltage.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Electronic Equipment Protection',
  },
  {
    id: 248,
    question: 'Under BS EN 61008/61009, what is the maximum operating time for a general (non-delay) 30mA RCD at five times its rated residual current (5 × IΔn)?',
    options: [
      '300ms',
      '40ms',
      '1 second',
      '5 seconds',
    ],
    correctAnswer: 1,
    explanation:
      '40ms is the figure given in the product standards BS EN 61008/61009 for a general non-delay device at 5 × IΔn. Note where it comes from: it is a characteristic of the device, not a BS 7671 test requirement. BS 7671:2018+A4:2026 deleted Table 3A of Appendix 3, and Regulation 643.8 now calls for a single alternating current test at IΔn to verify effectiveness, whatever the RCD type — so the 5 × IΔn test is no longer part of the required verification sequence.',
    section: '3.6.3',
    difficulty: 'intermediate',
    topic: 'RCD Testing',
  },
  {
    id: 249,
    question: 'What documentation must be completed after testing an electrical installation?',
    options: [
      'Only a verbal report to the client',
      'Installation certificate with test results and schedules',
      'A receipt for the test instrument hire',
      'A photograph of the consumer unit and its chart',
    ],
    correctAnswer: 1,
    explanation:
      'After testing, an installation certificate (or condition report) must be completed with comprehensive test results and circuit schedules.',
    section: '3.6.4',
    difficulty: 'basic',
    topic: 'Test Documentation',
  },
  {
    id: 250,
    question: 'Who is qualified to issue an Electrical Installation Certificate?',
    options: [
      'Any operative who carried out part of the installation work on site',
      'The client who commissioned and paid for the installation work',
      'Qualified and competent person responsible for the design and installation',
      'The wholesaler who supplied the cables and the consumer unit',
    ],
    correctAnswer: 2,
    explanation:
      'Only qualified and competent persons who are responsible for the design, construction, and inspection of the installation can issue installation certificates.',
    section: '3.6.5',
    difficulty: 'intermediate',
    topic: 'Certification Authority',
  },

  // ============================================================
  // 50 ADDITIONAL QUESTIONS — Unit 203 LO/AC alignment (A4:2026)
  // Tagged with Unit 203 LO/AC codes: '203-<LO>.<AC>'
  // ============================================================

  // ---- LO1: Industry regulations (8 questions) ----
  {
    id: 251,
    question:
      'Which of the following is a STATUTORY regulation that applies to electrical work in the UK?',
    options: [
      'BS 7671 (the IET Wiring Regulations)',
      'The IET On-Site Guide',
      'IET Guidance Note 3',
      'The Electricity at Work Regulations 1989 (EAWR)',
    ],
    correctAnswer: 3,
    explanation:
      'EAWR 1989 is statutory law made under the Health and Safety at Work etc. Act 1974 — breach is a criminal offence. BS 7671, GN3 and OSG are non-statutory guidance documents.',
    section: '203-1.1',
    difficulty: 'basic',
    topic: 'Statutory regulations',
  },
  {
    id: 252,
    question:
      'Under the Health and Safety at Work etc. Act 1974, what duty does an employee owe whilst at work?',
    options: [
      'A duty to take reasonable care for the health and safety of themselves and others affected by their acts or omissions',
      'A duty to provide, maintain and pay for all the personal protective equipment used by the workforce on site',
      'A duty to carry out and record every site risk assessment personally before any work begins each day',
      'A duty to report the employer to the enforcing authority for any breach of health and safety law',
    ],
    correctAnswer: 0,
    explanation:
      'Section 7 of HASAWA places a duty on every employee to take reasonable care for the health and safety of themselves and others, and to co-operate with the employer on health and safety matters.',
    section: '203-1.1',
    difficulty: 'intermediate',
    topic: 'HASAWA employee duties',
  },
  {
    id: 253,
    question:
      'Which non-statutory document is the recognised UK national standard for electrical installation design and erection?',
    options: [
      'BS 1363 (plugs and socket-outlets)',
      'BS 7671:2018+A4:2026 (IET Wiring Regulations)',
      'BS 5839 (fire detection and alarm systems)',
      'BS EN 60898 (circuit-breakers)',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018+A4:2026 is the UK national standard for low-voltage electrical installation. It is non-statutory but compliance is the recognised method of meeting EAWR Regulation 4(1) for installation safety.',
    section: '203-1.2',
    difficulty: 'basic',
    topic: 'BS 7671',
  },
  {
    id: 254,
    question:
      'Which IET publication gives practical guidance on inspection, testing and certification of installations?',
    options: [
      'Guidance Note 1 — Selection & Erection',
      'Guidance Note 8 — Earthing & Bonding',
      'Guidance Note 3 — Inspection & Testing',
      'Guidance Note 5 — Protection Against Electric Shock',
    ],
    correctAnswer: 2,
    explanation:
      'Guidance Note 3 (GN3) covers initial verification, periodic inspection and the test sequence. The OSG is a simplified design and installation guide; GN1 covers selection & erection of equipment.',
    section: '203-1.2',
    difficulty: 'basic',
    topic: 'IET Guidance Notes',
  },
  {
    id: 255,
    question:
      'A breach of the Electricity at Work Regulations 1989 can result in which of the following?',
    options: [
      'A written warning only, with no legal force',
      'Loss of warranty on the installation',
      'A requirement to re-sit the qualification',
      'Criminal prosecution, including fines and imprisonment',
    ],
    correctAnswer: 3,
    explanation:
      'EAWR 1989 is statutory law. Breach is a criminal offence prosecuted by the HSE — penalties include unlimited fines and, for serious breaches, imprisonment.',
    section: '203-1.3',
    difficulty: 'intermediate',
    topic: 'EAWR enforcement',
  },
  {
    id: 256,
    question:
      'The Building Regulations Approved Document P applies to fixed electrical work in which type of premises in England?',
    options: [
      'Dwellings (domestic premises)',
      'Industrial factories and warehouses',
      'Commercial offices and shops',
      'Agricultural and horticultural premises',
    ],
    correctAnswer: 0,
    explanation:
      'Approved Document P of the Building Regulations applies to fixed electrical installations in dwellings in England. Notifiable work must either be carried out by a registered Competent Person or notified to building control.',
    section: '203-1.3',
    difficulty: 'basic',
    topic: 'Building Regs Part P',
  },
  {
    id: 257,
    question:
      'What is the practical implication for an electrician who is NOT registered with a Competent Person Scheme (e.g. NICEIC, NAPIT, ELECSA) when undertaking notifiable Part P work?',
    options: [
      'The work is exempt from any notification requirement provided a certificate is issued to the client',
      'The work must be notified to local authority Building Control before commencement and a third-party inspection arranged',
      'The work can be self-certified and notified retrospectively in exactly the same way as a registered installer',
      'The work may only be carried out under another registered firm\'s scheme membership and certificates',
    ],
    correctAnswer: 1,
    explanation:
      'A non-registered installer must notify Building Control in advance of notifiable work; Building Control will charge for inspection and a third-party Electrical Installation Certificate may be required. Registered Competent Persons can self-certify.',
    section: '203-1.4',
    difficulty: 'intermediate',
    topic: 'Competent Person Schemes',
  },
  {
    id: 258,
    question:
      'Why is following the IET On-Site Guide considered good industry practice even though it is non-statutory?',
    options: [
      'It overrides BS 7671 wherever the two documents disagree, because it is the more recent publication',
      'It is statutory law enforced directly by the Health and Safety Executive and local authority inspectors',
      'It provides simplified, deemed-to-satisfy guidance for common installations consistent with BS 7671',
      'It replaces the need for inspection and testing on small domestic jobs covered by its standard circuits',
    ],
    correctAnswer: 2,
    explanation:
      'The OSG provides deemed-to-satisfy tables and guidance for typical small installations that comply with BS 7671. Following it gives a defensible audit trail; BS 7671 itself remains the underlying standard.',
    section: '203-1.4',
    difficulty: 'intermediate',
    topic: 'OSG deemed-to-satisfy',
  },

  // ---- LO2: Technical information and drawings (8 questions) ----
  {
    id: 259,
    question:
      'Which document on a construction site sets out the safe systems of work, hazards and control measures for a specific task?',
    options: [
      'The Electrical Installation Certificate and schedules',
      'The general arrangement (layout) drawing',
      'The schedule of inspection and test results',
      'The Risk Assessment & Method Statement (RAMS)',
    ],
    correctAnswer: 3,
    explanation:
      'RAMS combine the risk assessment (hazards, who is at risk, controls) with the method statement (the agreed sequence of work). They are required under the Management of Health and Safety at Work Regulations 1999.',
    section: '203-2.1',
    difficulty: 'basic',
    topic: 'Sources of technical information',
  },
  {
    id: 260,
    question:
      'On a construction project, which document shows the architect-specified positions of accessories such as socket-outlets, switches and luminaires?',
    options: [
      'The layout (general arrangement) drawing',
      'The single-line schematic distribution diagram',
      'The block diagram of the whole system',
      'The schedule of inspection and test results',
    ],
    correctAnswer: 0,
    explanation:
      'Layout drawings (general arrangement) show the physical positions of accessories overlaid on the building plan. Schematics show how circuits are connected logically; wiring diagrams show actual conductor connections.',
    section: '203-2.1',
    difficulty: 'intermediate',
    topic: 'Drawing pack purpose',
  },
  {
    id: 261,
    question:
      'A drawing that uses single lines and standard symbols to show how circuits and equipment are connected logically — without showing physical positions — is called a:',
    options: [
      'Layout (general arrangement) drawing',
      'Schematic (single-line) diagram',
      'As-built record drawing',
      'Block diagram',
    ],
    correctAnswer: 1,
    explanation:
      'A schematic / single-line diagram uses one line per circuit with IEC 60617 symbols to show electrical relationships. It is the primary diagram type used for distribution boards and switchgear.',
    section: '203-2.2',
    difficulty: 'basic',
    topic: 'Drawing types',
  },
  {
    id: 262,
    question:
      'What is the primary purpose of a BLOCK diagram in an electrical drawing pack?',
    options: [
      'To show the exact physical position of every accessory and the route of every cable on the building floor plan',
      'To show every individual conductor and terminal connection in enough detail for an operative to wire it up on site',
      'To show the overall system at a high level — major items and their interconnections — without internal detail',
      'To record the measured test results for each circuit alongside the protective device type and its current rating',
    ],
    correctAnswer: 2,
    explanation:
      'A block diagram shows the system at the top level — e.g. supply intake → meter → main switch → distribution boards — using simple labelled rectangles. Detail is then expanded in schematics and wiring diagrams.',
    section: '203-2.2',
    difficulty: 'intermediate',
    topic: 'Block diagrams',
  },
  {
    id: 263,
    question:
      'IEC 60617 is the standard that defines what for electrical drawings?',
    options: [
      'The maximum disconnection times required for automatic disconnection of supply',
      'The colour coding required for fixed-wiring and flexible-cable conductors',
      'The minimum conductor sizes that are permitted for domestic final circuits and submains',
      'Graphical symbols used in electrical and electronic schematic and wiring diagrams',
    ],
    correctAnswer: 3,
    explanation:
      'IEC 60617 specifies the standard graphical symbols (e.g. resistor, switch, socket, fuse, motor, transformer) used across electrical and electronic schematics so that drawings are interpreted consistently.',
    section: '203-2.3',
    difficulty: 'basic',
    topic: 'IEC 60617',
  },
  {
    id: 264,
    question:
      'Which IEC 60617 symbol represents a switched socket-outlet on a layout drawing?',
    options: [
      'A semi-circle on a horizontal line, with a short stroke through it (denoting the switch)',
      'A circle with a cross drawn inside it and a short tail running out to one side of it',
      'A rectangle divided into three equal sections with a single diagonal line drawn across it',
      'A triangle pointing towards a horizontal line with a dot marked at the apex',
    ],
    correctAnswer: 0,
    explanation:
      'The standard symbol for a socket-outlet is a semi-circle sitting on a horizontal line; an additional short stroke through it indicates a switched (controlled) socket-outlet. Multiple short strokes denote multi-gang.',
    section: '203-2.3',
    difficulty: 'intermediate',
    topic: 'Drawing symbols',
  },
  {
    id: 265,
    question:
      'A drawing is produced at a scale of 1:50. A wall measures 80 mm on the drawing. What is the actual length of the wall?',
    options: [
      '1.6 m',
      '4.0 m',
      '40 m',
      '8 m',
    ],
    correctAnswer: 1,
    explanation:
      'At 1:50, every 1 mm on the drawing represents 50 mm on site. 80 mm × 50 = 4,000 mm = 4.0 m.',
    section: '203-2.4',
    difficulty: 'intermediate',
    topic: 'Scale conversion',
  },
  {
    id: 266,
    question:
      'On a 1:100 scale layout drawing, you measure the distance between two socket-outlets as 35 mm. How far apart are they on site?',
    options: [
      '0.35 m',
      '35 m',
      '3.5 m',
      '350 mm',
    ],
    correctAnswer: 2,
    explanation:
      'At 1:100, each 1 mm on paper = 100 mm on site. 35 mm × 100 = 3,500 mm = 3.5 m.',
    section: '203-2.4',
    difficulty: 'basic',
    topic: 'Scale conversion',
  },

  // ---- LO3: Wiring systems theory — under-served ACs (4 questions) ----
  {
    id: 267,
    question:
      'In a RING final circuit wired in 2.5 mm² twin & earth, the line, neutral and CPC conductors each form a complete loop back to the consumer unit. What is the maximum standard rating of the protective device for a 32 A ring final circuit serving socket-outlets in a domestic dwelling?',
    options: [
      '16 A',
      '20 A',
      '40 A',
      '32 A',
    ],
    correctAnswer: 3,
    explanation:
      'The standard A2 ring final circuit uses a 32 A overcurrent device (typically Type B MCB) with 2.5 mm² T&E and 1.5 mm² CPC. This is the OSG Table 7.1 / Appendix 15 of BS 7671 standard arrangement.',
    section: '203-3.1',
    difficulty: 'basic',
    topic: 'Ring final circuit',
  },
  {
    id: 268,
    question:
      'What is the principal advantage of a RADIAL final circuit over a ring final circuit for socket-outlets?',
    options: [
      'Simpler fault-finding — a single break interrupts only the outlets downstream of the break, and there is only one route to test',
      'It can serve a much larger floor area than a ring final circuit wired in the same size of cable, so fewer circuits are needed overall',
      'It needs no overcurrent protective device at the origin because the load is spread evenly along the whole length of the circuit run',
      'It does not require RCD additional protection, because there is only one route back to the board for any fault current to take',
    ],
    correctAnswer: 0,
    explanation:
      'A radial circuit has a single feed and end — easier to test and fault-find than a ring (which can mask a break in continuity until tested at end-to-end and r1+r2). Both still require RCD additional protection per Reg 411.3.3.',
    section: '203-3.1',
    difficulty: 'intermediate',
    topic: 'Radial vs ring',
  },
  {
    id: 269,
    question:
      'The space factor (cable percentage fill) for a STRAIGHT run of trunking, per the IET On-Site Guide, should not exceed:',
    options: [
      '20%',
      '45%',
      '35%',
      '60%',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Appendix E gives a maximum 45% space factor for cables in straight runs of trunking. This allows for heat dissipation, future additions, and ease of cable installation.',
    section: '203-3.6',
    difficulty: 'intermediate',
    topic: 'Trunking space factor',
  },
  {
    id: 270,
    question:
      'Using the IET On-Site Guide cable factor / conduit factor method, what is the rule for a conduit run that contains BENDS or sets and is longer than ~3 m?',
    options: [
      'Use the straight-run table and ignore the bends entirely, since those tabulated factors already include an allowance for them',
      'Apply a flat 45% space factor regardless of the number of bends in the run or its overall length from box to box',
      'Use the appropriate factor from the bends table for the run length and number of bends, which gives a smaller permitted fill',
      'Double the number of cables permitted in a straight run of the same size, to allow for the extra pulling effort needed',
    ],
    correctAnswer: 2,
    explanation:
      'OSG Appendix E gives separate cable and conduit factor tables for runs containing bends. The tabulated factors reduce as length and number of bends increase, reflecting the increased pulling tension required.',
    section: '203-3.6',
    difficulty: 'advanced',
    topic: 'Conduit fill — bends',
  },

  // ---- LO4: Earthing systems and ADS (10 questions) ----
  {
    id: 271,
    question:
      'BS 7671:2018+A4:2026 Regulation 312.2.1 recognises five UK earthing arrangements. Which of the following lists is correct?',
    options: [
      'TN-A, TN-B, TN-C, TT, IT',
      'TT, IT, PME, PNB, SELV',
      'TN-S, TN-R, TN-X, TT, IT',
      'TN-S, TN-C-S (PME), TN-C-S (PNB), TT, IT',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 312.2.1 of A4:2026 recognises TN-S, TN-C-S in its PME variant, TN-C-S in its PNB sub-arrangement (newly figured at 312.2.1.1), TT and IT. PNB is a TN-C-S where the N-E link is made within the consumer\u2019s installation.',
    section: '203-4.1',
    difficulty: 'intermediate',
    topic: 'Earthing arrangements',
  },
  {
    id: 272,
    question:
      'In a TN-S system, where does the protective conductor (earth) originate?',
    options: [
      'A separate metallic protective conductor (typically the cable sheath) supplied by the DNO from the substation',
      'An earth electrode installed by the consumer at the property and connected to the main earthing terminal',
      'The combined PEN conductor of the supply, split into neutral and earth at the DNO service cut-out',
      'The incoming metallic water service pipe, bonded to the main earthing terminal at the intake position',
    ],
    correctAnswer: 0,
    explanation:
      'TN-S has a SEPARATE earth provided by the DNO — historically the lead sheath of the supply cable. The earth and neutral are separate throughout. PME (TN-C-S) combines them in the supply (PEN) and splits at the cut-out.',
    section: '203-4.1',
    difficulty: 'intermediate',
    topic: 'TN-S vs TN-C-S',
  },
  {
    id: 273,
    question:
      'Automatic Disconnection of Supply (ADS) under Reg 411 requires which three coordinated elements to function correctly?',
    options: [
      'Double insulation of all connected equipment, an isolating transformer at the origin of the installation, and a residual current device',
      'Earthing of exposed-conductive-parts, protective equipotential bonding, and a protective device that disconnects in the required time',
      'Surge protection at the origin, arc fault detection on every final circuit, and overload protection at the distribution board',
      'A separate earth electrode at the property, a lockable main switch on the consumer unit, and a smart meter at the intake',
    ],
    correctAnswer: 1,
    explanation:
      'ADS relies on (1) reliable earthing of exposed-conductive-parts (Reg 411.3.1.1), (2) main protective equipotential bonding (Reg 411.3.1.2) and (3) an overcurrent device or RCD that disconnects within the time limits of Reg 411.3.2 (e.g. 0.4 s for final circuits ≤ 32 A on TN systems).',
    section: '203-4.2',
    difficulty: 'intermediate',
    topic: 'ADS components',
  },
  {
    id: 274,
    question:
      'On a TN system, what is the maximum disconnection time required by Reg 411.3.2.2 for a final circuit of nominal voltage 230 V AC and rating not exceeding 32 A?',
    options: [
      '0.1 s',
      '1.0 s',
      '0.4 s',
      '5.0 s',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 411.3.2.2 of BS 7671:2018+A4:2026 sets a maximum disconnection time of 0.4 s for TN final circuits ≤ 32 A at 230 V AC. Distribution circuits may have up to 5 s (Reg 411.3.2.3).',
    section: '203-4.2',
    difficulty: 'basic',
    topic: 'Disconnection time',
  },
  {
    id: 275,
    question:
      'Which of the following is an EXPOSED conductive part as defined in BS 7671?',
    options: [
      'The plastic enclosure of a consumer unit',
      'A structural steel beam in the loft',
      'A copper water service pipe entering the building',
      'The metal casing of a Class I appliance',
    ],
    correctAnswer: 3,
    explanation:
      'An exposed-conductive-part is a conductive part of equipment that can be touched and which is NOT normally live but may become live under fault conditions — e.g. the metal case of a Class I appliance or a metal switchgear enclosure.',
    section: '203-4.3',
    difficulty: 'basic',
    topic: 'Exposed conductive parts',
  },
  {
    id: 276,
    question:
      'Why are EXPOSED conductive parts of a Class I appliance required to be connected to the protective earthing system?',
    options: [
      'To create a low-impedance fault path so that the protective device disconnects within the required time during an L–earth fault',
      'To reduce the voltage drop along the final circuit conductors so that the appliance gets its full rated voltage',
      'To increase the current-carrying capacity of the circuit conductors supplying the appliance and of its flexible cord',
      'To prevent electromagnetic interference between the appliance and other sensitive electronic equipment sited nearby',
    ],
    correctAnswer: 0,
    explanation:
      'Earthing exposed-conductive-parts creates the low-impedance loop required by ADS (Reg 411). On an L-to-case fault, sufficient current flows for the overcurrent device or RCD to disconnect within the time limits of Reg 411.3.2.',
    section: '203-4.3',
    difficulty: 'intermediate',
    topic: 'Earthing of exposed parts',
  },
  {
    id: 277,
    question:
      'Which of the following is most likely to be an EXTRANEOUS conductive part in a domestic dwelling?',
    options: [
      'The metal casing of a Class I portable appliance',
      'A 22 mm copper incoming water service pipe',
      'The earthing terminal of a socket-outlet faceplate',
      'A length of plastic waste pipe under the sink',
    ],
    correctAnswer: 1,
    explanation:
      'An extraneous-conductive-part is a conductive part NOT forming part of the electrical installation but liable to introduce a potential, generally earth potential — typically a metallic incoming water or gas service. It is connected by main protective bonding (Reg 411.3.1.2).',
    section: '203-4.4',
    difficulty: 'basic',
    topic: 'Extraneous conductive parts',
  },
  {
    id: 278,
    question:
      'What is the minimum cross-sectional area of a copper main protective bonding conductor in a typical TN-C-S (PME) installation with a 25 mm² supply neutral?',
    options: [
      '4 mm²',
      '6 mm²',
      '10 mm²',
      '16 mm²',
    ],
    correctAnswer: 2,
    explanation:
      'For PME/TN-C-S, BS 7671 Table 54.8 sizes the main protective bonding conductor against the supply neutral. For a 25 mm² neutral, the minimum copper main bonding csa is 10 mm².',
    section: '203-4.4',
    difficulty: 'advanced',
    topic: 'Main bonding sizing',
  },
  {
    id: 279,
    question:
      'In a TN-S system, which of the following is NOT part of the earth fault loop impedance (Zs) path?',
    options: [
      'The external earth fault loop impedance (Ze)',
      'The line conductor resistance (R1)',
      'The circuit protective conductor resistance (R2)',
      'The consumer’s incoming neutral conductor',
    ],
    correctAnswer: 3,
    explanation:
      'In TN-S, the fault current returns via the SEPARATE PE (sheath) — NOT via the neutral. So Zs = Ze (external) + R1 (line) + R2 (CPC). In TN-C-S the PEN combines the return path until the cut-out, but the consumer\u2019s neutral inside the installation is still not part of the fault loop.',
    section: '203-4.5',
    difficulty: 'advanced',
    topic: 'Earth fault loop path',
  },
  {
    id: 280,
    question:
      'A 32 A Type B MCB protects a final circuit on a TN system. Per BS 7671:2018+A4:2026 Table 41.3, what is the maximum permitted measured Zs (corrected for conductor temperature) to satisfy the 0.4 s disconnection requirement?',
    options: [
      '1.37 Ω',
      '1.09 Ω',
      '0.72 Ω',
      '2.19 Ω',
    ],
    correctAnswer: 0,
    explanation:
      'Table 41.3 of A4:2026 gives 1.37 Ω for a 32 A Type B MCB at 230 V (Note: this REPLACES the older A2 figure of 1.44 Ω). Other Type B values: B6=7.28, B10=4.37, B16=2.73, B20=2.19, B40=1.09 Ω.',
    section: '203-4.5',
    difficulty: 'advanced',
    topic: 'Table 41.3 — B32 Zs',
  },

  // ---- LO5: Supply network (10 questions) ----
  {
    id: 281,
    question:
      'Which of the following is NOT a method of large-scale electricity generation supplying the UK National Grid?',
    options: [
      'Combined-cycle gas turbine (CCGT) plant',
      'Domestic Class 2 double-insulated lighting',
      'Nuclear fission in a pressurised reactor',
      'Large offshore wind farms connected to the grid',
    ],
    correctAnswer: 1,
    explanation:
      'CCGT, nuclear and offshore wind are all major UK grid generation methods. Class 2 double-insulated lighting is a method of shock protection on a final circuit — it is not a generation method.',
    section: '203-5.1',
    difficulty: 'basic',
    topic: 'Generation methods',
  },
  {
    id: 282,
    question:
      'Why is electricity transmitted across the National Grid at very high voltages (e.g. 400 kV / 275 kV) rather than at 230 V?',
    options: [
      'To make the overhead conductors safer to touch if a line falls to the ground',
      'To allow much thinner insulation to be used on the overhead line conductors',
      'To minimise I²R (resistive) losses in the transmission conductors for a given amount of power',
      'To increase the frequency of the supply that is delivered to consumers',
    ],
    correctAnswer: 2,
    explanation:
      'For a fixed power P = V × I, raising V drops I. Resistive losses are proportional to I², so transmitting at high voltage and low current dramatically reduces line losses. Voltage is then stepped down at substations.',
    section: '203-5.1',
    difficulty: 'intermediate',
    topic: 'Transmission losses',
  },
  {
    id: 283,
    question:
      'A small hydroelectric scheme uses which energy conversion sequence?',
    options: [
      'Chemical (fuel) → thermal (boiler/steam) → mechanical → electrical',
      'Light (photons) → electrical directly, with no moving parts involved',
      'Thermal (combustion of gas) → mechanical (turbine) → electrical',
      'Kinetic (water) → mechanical (turbine/generator) → electrical',
    ],
    correctAnswer: 3,
    explanation:
      'Hydro converts the kinetic/potential energy of falling or flowing water into mechanical rotation of a turbine coupled to a generator, producing electricity. No combustion is involved.',
    section: '203-5.1',
    difficulty: 'basic',
    topic: 'Hydro generation',
  },
  {
    id: 284,
    question:
      'What are the three principal AC TRANSMISSION voltages used on the UK Grid (above the 132 kV distribution level)?',
    options: [
      '132 kV, 275 kV, 400 kV',
      '11 kV, 33 kV, 132 kV',
      '400 V, 11 kV, 33 kV',
      '230 V, 400 V, 11 kV',
    ],
    correctAnswer: 0,
    explanation:
      'UK transmission is at 132 kV, 275 kV and 400 kV (the 400 kV "Supergrid" being the highest). 33 kV and 11 kV are sub-transmission/distribution voltages; 400/230 V is the final LV distribution.',
    section: '203-5.2',
    difficulty: 'basic',
    topic: 'Transmission voltages',
  },
  {
    id: 285,
    question:
      'What is the purpose of operating long-distance transmission as 3-phase AC rather than single-phase?',
    options: [
      'It removes the need for any earthing of the whole transmission network, because the three phases balance each other out',
      'It produces a constant total power transfer, allows smaller conductors per kW transmitted, and enables efficient rotating-field motors',
      'It allows the supply frequency to be doubled, so that the transformers and the switchgear can be made physically smaller',
      'It eliminates all resistive losses in the line conductors, because the three phase currents cancel out in the neutral',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase AC delivers near-constant instantaneous power, requires less conductor mass per unit power than equivalent single-phase, and naturally drives 3-phase induction motors via a rotating magnetic field.',
    section: '203-5.2',
    difficulty: 'intermediate',
    topic: 'Three-phase transmission',
  },
  {
    id: 286,
    question:
      'In the UK, what is the standard nominal LV DISTRIBUTION voltage delivered to the consumer (single-phase line-to-neutral)?',
    options: [
      '400 V',
      '110 V',
      '230 V',
      '11 kV',
    ],
    correctAnswer: 2,
    explanation:
      'UK nominal single-phase LV is 230 V (line-to-neutral), with the corresponding 3-phase line-to-line at 400 V. Tolerance is +10 % / −6 % per ESQCR. 11 kV is a primary distribution voltage at the substation side.',
    section: '203-5.3',
    difficulty: 'basic',
    topic: 'LV distribution voltage',
  },
  {
    id: 287,
    question:
      'Primary distribution from a Bulk Supply Point to a primary substation in an urban area is typically operated at which voltage?',
    options: [
      '230 V',
      '400 V',
      '275 kV',
      '11 kV or 33 kV',
    ],
    correctAnswer: 3,
    explanation:
      'Primary distribution is typically 33 kV (rural/urban backbone) stepped down to 11 kV for local distribution. 11 kV/400 V transformers at the secondary substation feed the LV network to consumers.',
    section: '203-5.3',
    difficulty: 'intermediate',
    topic: 'Distribution voltage',
  },
  {
    id: 288,
    question:
      'Which body OWNS and OPERATES the local LV cables, the cut-out and the supply fuse on the customer side of the meter boundary?',
    options: [
      'The Distribution Network Operator (DNO)',
      'The electricity supplier (e.g. Octopus, British Gas)',
      'The customer',
      'National Grid ESO only',
    ],
    correctAnswer: 0,
    explanation:
      'The DNO owns and maintains the LV network up to and including the cut-out and supply fuse. The supplier owns the meter (or the MOP does on their behalf). Everything past the meter tails is the customer\u2019s installation.',
    section: '203-5.4',
    difficulty: 'intermediate',
    topic: 'DNO boundary',
  },
  {
    id: 289,
    question:
      'Which sequence places the parts of the supply network in the correct order from generation to consumer?',
    options: [
      'Consumer → meter → secondary substation → primary substation → grid supply point → transmission lines → step-up transformer → generator',
      'Generator → step-up transformer → transmission lines → grid supply point → primary substation → secondary (11 kV/400 V) substation → consumer',
      'Generator → consumer → step-down transformer → transmission lines → grid supply point → primary substation → secondary substation → meter',
      'Transmission lines → generator → grid supply point → consumer → secondary substation → primary substation → step-up transformer → meter',
    ],
    correctAnswer: 1,
    explanation:
      'Power flow is: generation → step-up transformer (to 275/400 kV) → transmission → grid supply point (down to 132 kV / 33 kV) → primary substation (11 kV) → secondary substation (400 V LV) → consumer service cable → cut-out → meter → consumer unit.',
    section: '203-5.4',
    difficulty: 'intermediate',
    topic: 'Network end-to-end',
  },
  {
    id: 290,
    question:
      'On the consumer side of a typical UK domestic LV supply, in what order does the supply pass from the street into the consumer unit?',
    options: [
      'Meter → service cable → meter tails → cut-out (with DNO fuse) → main switch in consumer unit',
      'Consumer unit → meter → meter tails → cut-out (with DNO fuse) → service cable from the street',
      'Service cable → cut-out (with DNO fuse) → meter → meter tails → main switch in consumer unit',
      'Cut-out (with DNO fuse) → consumer unit → main switch → meter tails → meter → service cable',
    ],
    correctAnswer: 2,
    explanation:
      'The DNO service cable terminates at the cut-out (containing the DNO\u2019s service-protection fuse). Meter tails connect cut-out → meter → main switch of the consumer unit. The MET is bonded near the cut-out.',
    section: '203-5.4',
    difficulty: 'basic',
    topic: 'Domestic intake order',
  },

  // ---- LO6: Micro-renewable energy (10 questions) ----
  {
    id: 291,
    question:
      'A solar photovoltaic (PV) array converts which form of energy directly into DC electricity?',
    options: [
      'Wind kinetic energy captured by a turbine rotor blade',
      'Chemical energy stored inside a rechargeable battery',
      'Heat drawn from the ground via a buried collector loop',
      'Photons (light) striking a semiconductor junction',
    ],
    correctAnswer: 3,
    explanation:
      'PV cells use the photovoltaic effect: photons striking a doped semiconductor (typically silicon) excite electrons across the p–n junction, producing a DC voltage. Cells are wired into modules and arrays, then converted to AC by an inverter.',
    section: '203-6.1',
    difficulty: 'basic',
    topic: 'Solar PV principle',
  },
  {
    id: 292,
    question:
      'A small domestic micro-wind turbine converts which energy sequence?',
    options: [
      'Wind kinetic → mechanical (rotor/generator) → electrical (typically AC, then rectified/inverted as required)',
      'Light photons → electrical directly through a semiconductor, with no moving parts in the conversion at all',
      'Chemical → thermal → mechanical → electrical, by burning a fuel to drive a generator set',
      'Heat from the ground → mechanical compression → electrical, through a sealed refrigerant circuit',
    ],
    correctAnswer: 0,
    explanation:
      'A micro-wind turbine uses aerofoil blades to convert wind kinetic energy into rotational mechanical energy, driving a generator (often a permanent-magnet alternator). Output is conditioned by an inverter for grid-tie or battery use.',
    section: '203-6.1',
    difficulty: 'basic',
    topic: 'Micro-wind',
  },
  {
    id: 293,
    question:
      'A ground source heat pump (GSHP) is best described as a:',
    options: [
      'A generating technology that converts low-grade heat drawn from deep underground directly into electricity for the dwelling',
      'Heat-transfer technology that uses electrical energy to move thermal energy from the ground into the building, with a typical CoP of 3–4',
      'A high-efficiency condensing boiler that burns mains gas to heat the water for the radiators and the hot water cylinder',
      'A storage technology that holds surplus solar generation in an underground vessel for release during the evening peak',
    ],
    correctAnswer: 1,
    explanation:
      'A heat pump moves heat rather than generating electricity. A GSHP uses a refrigeration cycle to transfer low-grade heat from the ground (via a buried collector loop) into the building. Coefficient of Performance (CoP) is typically 3–4 — i.e. 3–4 kW of heat per 1 kW of electricity.',
    section: '203-6.1',
    difficulty: 'intermediate',
    topic: 'Heat pumps',
  },
  {
    id: 294,
    question:
      'Battery Energy Storage Systems (BESS) installed alongside domestic PV provide which primary benefit?',
    options: [
      'They generate additional electricity from the waste heat given off by the PV modules during the day',
      'They increase the output of the PV array directly by raising the voltage at the module terminals',
      'They store excess generation for use at times of low generation or high tariff, increasing self-consumption',
      'They convert the DC output of the array into AC, removing the need for a separate inverter unit',
    ],
    correctAnswer: 2,
    explanation:
      'BESS stores DC energy (typically Li-ion) so that excess PV generation in the day can be discharged at night or during peak tariff periods, raising self-consumption from ~30 % to ~70 %+. They do not generate energy themselves.',
    section: '203-6.1',
    difficulty: 'intermediate',
    topic: 'Battery storage',
  },
  {
    id: 295,
    question:
      'A grid-connected PV inverter rated up to 16 A per phase (single-phase) requires which type of connection agreement with the DNO?',
    options: [
      'No connection agreement is needed for any size of inverter',
      'A full pre-application assessment under G99 instead',
      'Building Control notification under Part P only',
      'Connect-and-notify under Engineering Recommendation G98',
    ],
    correctAnswer: 3,
    explanation:
      'EREC G98 covers connect-and-notify for fully type-tested generation up to 16 A per phase per inverter (single- or three-phase). Larger or non-type-tested generation requires G99 (pre-application). MCS sign-off is also required for FiT/SEG eligibility.',
    section: '203-6.2',
    difficulty: 'intermediate',
    topic: 'G98 / G99',
  },
  {
    id: 296,
    question:
      'Which BS 7671 section gives the specific requirements for solar PV power supply systems?',
    options: [
      'Section 712',
      'Section 705',
      'Section 722',
      'Section 743',
    ],
    correctAnswer: 0,
    explanation:
      'Section 712 of BS 7671 covers solar photovoltaic (PV) power supply systems. Section 705 covers agricultural premises, 722 covers EV charging, and 743 covers PV string isolation and rapid shutdown additions (newer A4:2026 work).',
    section: '203-6.2',
    difficulty: 'basic',
    topic: 'BS 7671 Section 712',
  },
  {
    id: 297,
    question:
      'For a PV installation to qualify for the Smart Export Guarantee (SEG) and other consumer protections, the installer and product must typically be certified under which UK scheme?',
    options: [
      'PAT testing certification of the array',
      'MCS (Microgeneration Certification Scheme)',
      'CHAS health and safety contractor accreditation',
      'Gas Safe registration of the installing firm',
    ],
    correctAnswer: 1,
    explanation:
      'MCS certification of both the installer and the product is the standard route to SEG eligibility and consumer protections. NICEIC/NAPIT registration covers electrical competence; MCS adds the renewables-specific scheme.',
    section: '203-6.2',
    difficulty: 'intermediate',
    topic: 'MCS certification',
  },
  {
    id: 298,
    question:
      'Which of the following is a well-recognised ADVANTAGE of solar PV for a domestic customer?',
    options: [
      'It produces a constant output over the full 24 hours of the day, regardless of the weather or the season of the year',
      'It requires neither an inverter nor any connection agreement with the distribution network operator before it is used',
      'Zero-carbon, zero-fuel-cost generation during daylight, with very low maintenance and a typical 25-year module performance warranty',
      'It generates the greatest output on overcast winter nights, which is exactly when the household demand is at its highest',
    ],
    correctAnswer: 2,
    explanation:
      'PV produces zero-carbon electricity at zero fuel cost while the sun shines, with no moving parts, very low maintenance, and module performance warranties typically 25 years (~80 % output retained). It is intermittent, not 24/7.',
    section: '203-6.3',
    difficulty: 'basic',
    topic: 'PV advantages',
  },
  {
    id: 299,
    question:
      'Which of the following is a common DISADVANTAGE shared by both micro-wind and solar PV?',
    options: [
      'They both produce hazardous combustion gases that must be flued to outside air away from any window',
      'They both require a constant supply of purchased fuel, so the running cost rises when fuel prices go up',
      'They both generate only DC, which cannot be used by a domestic installation without fitting a rotary converter set',
      'They are intermittent — output depends on weather and time of day, so storage or grid backup is needed for continuous supply',
    ],
    correctAnswer: 3,
    explanation:
      'Both PV and wind are weather-dependent and intermittent. Continuity of supply requires either grid back-up or local storage (BESS). This is why design has shifted toward hybrid PV + battery systems.',
    section: '203-6.3',
    difficulty: 'intermediate',
    topic: 'Renewables intermittency',
  },
  {
    id: 300,
    question:
      'A homeowner is considering air source heat pump (ASHP) versus a gas combi boiler for heating. Which statement best summarises the trade-off?',
    options: [
      'ASHP delivers 3–4 kWh of heat per 1 kWh electrical input (high efficiency) but works best in well-insulated dwellings with low flow temperatures (~45 °C); a poorly insulated house with high-temperature radiators can negate the running-cost advantage',
      'ASHP runs at its best efficiency with a flow temperature of about 70 °C, so it is ideally suited to poorly insulated homes with small existing radiators; a well-insulated dwelling with underfloor heating would gain nothing at all from fitting one',
      'A gas combi boiler has a higher seasonal efficiency than any ASHP because it burns its fuel on the site rather than moving heat around, so it is always the cheaper of the two to run whatever the insulation standard of the dwelling may be',
      'An ASHP and a gas boiler produce identical carbon emissions per kWh of heat delivered to the rooms, so the choice between the two depends only on the installation cost and on the space available outside the property itself',
    ],
    correctAnswer: 0,
    explanation:
      'A heat pump\u2019s CoP (typically 3–4) gives a strong efficiency advantage, but only when the building fabric and emitter design (oversized radiators or underfloor heating with low flow temperatures) suit low-temperature heat. Without that, running costs can be comparable to or worse than gas.',
    section: '203-6.3',
    difficulty: 'advanced',
    topic: 'Heat pump trade-offs',
  },
  {
    id: 303,
    question:
      'A length of flat twin and earth cable is terminated into a socket outlet back box. What must be done with its circuit protective conductor?',
    options: [
      'It is insulated green and therefore needs no sleeve',
      'It is insulated blue and therefore needs no sleeving',
      'It is bare and must be sleeved blue at each end of it',
      'It is bare and must be sleeved green-and-yellow',
    ],
    correctAnswer: 3,
    explanation:
      'In 6242Y flat twin and earth the cpc is supplied bare, so green-and-yellow sleeving must be applied wherever the sheath is removed, in line with the identification requirements of Chapter 51. The tempting wrong answer is that it is already insulated green: single-colour green has not been a permitted identification for many years, and in any case the conductor in this cable leaves the factory with no covering at all.',
    section: '3.1.1',
    difficulty: 'basic',
    topic: 'Cable Types and Selection',
  },
  {
    id: 304,
    question:
      'BS 7671 Appendix 4 describes Reference Method C. What installation condition does that code represent?',
    options: [
      'Buried direct in the ground at 0.5 m or deeper',
      'Enclosed in conduit in a thermally insulated wall',
      'Clipped direct to a surface and open to the air',
      'Installed in free air on a perforated cable tray',
    ],
    correctAnswer: 2,
    explanation:
      'Reference Method C is the cable clipped direct to a surface and open, and it is the baseline BS 7671 uses when it tells you to take 0.5 times the tabulated capacity for a cable totally surrounded by thermal insulation for 0.5 m or more. Perforated tray is a separate method code, so choosing it confuses an open tray run with a cable fixed straight to the building fabric.',
    section: '3.1.2',
    difficulty: 'basic',
    topic: 'Cable Types and Selection',
  },
  {
    id: 305,
    question:
      'How does BS 7671 define one of the prescribed zones for a cable concealed in a wall or partition?',
    options: [
      'Within 250 mm of the top of the wall surface',
      'Within 150 mm of the top of the wall or partition',
      'Within 100 mm of the top of any wall or partition',
      'Within 500 mm of the top of the wall or the partition',
    ],
    correctAnswer: 1,
    explanation:
      'A prescribed zone runs within 150 mm from the top of a wall or partition, and equally within 150 mm of an angle formed by two adjoining walls; zones are also formed horizontally and vertically from any accessory or item of switchgear on the wall. The 100 mm answer is the common misremembering: it would place a legitimately routed cable outside the zone and lead you to condemn compliant work.',
    section: '3.1.3',
    difficulty: 'intermediate',
    topic: 'Cable Types and Selection',
  },
  {
    id: 306,
    question:
      'A twin and earth cable is chased vertically down a plasterboard stud wall to a new socket, at a depth under 50 mm and inside a prescribed zone. The partition contains no metallic parts. What else does BS 7671 require?',
    options: [
      'Chase the cable deeper, to at least 40 mm',
      'Provide additional protection by a 30 mA RCD',
      'Fit a timber batten over the chase before plaster',
      'Provide a 100 mA time-delayed RCD at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Table 52.1 and Regulation 522.6.202 require a cable concealed at less than 50 mm depth to be in a prescribed zone and to have additional protection by an RCD with the characteristics of Regulation 415.1.1, which means 30 mA. A 100 mA delayed device is attractive because it is still an RCD, but it does not meet the additional-protection characteristic and will not disconnect fast enough if a nail or screw penetrates a live core.',
    section: '3.1.4',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 307,
    question:
      'A designer wants to conceal a cable in a wall at shallow depth without relying on 30 mA RCD additional protection. Which option satisfies Regulation 522.6.204?',
    options: [
      'PVC oval conduit chased into the wall and plastered',
      'SWA to BS 5467 with the armour used as the cpc',
      'Flexible metallic conduit bonded at both of its ends',
      'Flat twin and earth clipped behind plasterboard',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 522.6.204(a) accepts a cable to BS 5467, BS 6724, BS 7846, BS 8436 or BS EN 60702-1 incorporating an earthed metallic covering that complies with the requirements for a protective conductor of that circuit, so armoured cable with the armour as cpc is a valid alternative route. Oval PVC conduit looks protective but gives no earthed metallic covering and no resistance to a driven nail, so the RCD requirement would still stand.',
    section: '3.1.5',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 308,
    question:
      'Which of the following must never be selected to serve as a circuit protective conductor?',
    options: [
      'Steel conduit electrically continuous throughout',
      'A metal trunking system bonded at the board',
      'Flexible or pliable conduit acting as the cpc',
      'A bare copper conductor drawn in with the cores',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 543.2.3 expressly bars flexible or pliable conduit, support wires, gas or oil pipes and stressed constructional parts from being used as a protective conductor, because their continuity cannot be relied upon in service. Rigid steel conduit is the trap here: it is permitted under 543.2.1(f) provided it is electrically continuous and meets the cross-sectional and connection requirements, so it is the flexible form of conduit that is banned, not steel conduit itself.',
    section: '3.2.1',
    difficulty: 'intermediate',
    topic: 'Conduit Systems',
  },
  {
    id: 309,
    question:
      'A cable is to pass through holes drilled in floor joists. Where must the holes be positioned if no additional mechanical protection is provided?',
    options: [
      'At least 50 mm measured vertically from the joist top',
      'At least 150 mm measured vertically from the joist top',
      'At least 50 mm measured along the length of the joist',
      'At least 25 mm measured vertically from the joist top',
    ],
    correctAnswer: 0,
    explanation:
      'The cable must sit at least 50 mm measured vertically from the top, or bottom as appropriate, of the joist or batten, which keeps it in the central band of the timber where floor nails and screws do not reach. Measuring 50 mm along the length of the joist is the classic misreading: horizontal distance does nothing to protect the cable, because the threat comes from fixings driven down through the boards.',
    section: '3.1.6',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 310,
    question:
      'Under Regulation 527.2.3, when need a conduit, trunking or ducting system not be internally sealed where it passes through a fire-resisting element?',
    options: [
      'Metallic and of no more than 2000 mm² of internal cross-section',
      'Non-flame propagating and no more than 300 mm² of internal area',
      'Metallic and of no more than 710 mm² of internal area',
      'Non-flame propagating and no more than 710 mm² internal area',
    ],
    correctAnswer: 3,
    explanation:
      'The exemption applies to a conduit, trunking or ducting system classified as non-flame propagating to its product standard with a maximum internal cross-sectional area of 710 mm², provided the further conditions of 527.2.3 are met; external sealing under 527.2.1 is still required. Choosing the metallic option misses the point, because it is the non-flame-propagating classification, not the material, that earns the concession.',
    section: '3.7.1',
    difficulty: 'advanced',
    topic: 'Segregation and Fire Sealing',
  },
  {
    id: 311,
    question:
      'Joints and terminations must normally be accessible for inspection, testing and maintenance. Which arrangement is exempt from that requirement?',
    options: [
      'A crimped connection covered with insulating tape',
      'A maintenance-free accessory marked MF to BS 5733',
      'A terminal block housed inside a plastic back box',
      'A junction box with screw terminals in a ceiling void',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 526.3(f) exempts equipment complying with BS 5733 as a maintenance-free accessory, marked accordingly and installed to the manufacturer instructions, alongside compound-filled and encapsulated joints. A screw-terminal junction box is the tempting answer because it is common in ceiling voids, but screw terminals can loosen, which is exactly why that type must remain accessible for future inspection.',
    section: '3.5.1',
    difficulty: 'intermediate',
    topic: 'Terminations and Connections',
  },
  {
    id: 312,
    question:
      'What does BS 7671 say about using plastic cable clips or cable ties as the means of support for cables clipped direct or run under a cable tray?',
    options: [
      'Non-metallic clips are permitted at a reduced spacing only',
      'Non-metallic trunking may support its own cables if screwed',
      'Non-metallic cable ties are acceptable underneath cable tray',
      'Non-metallic clips must not be the sole means of support',
    ],
    correctAnswer: 3,
    explanation:
      'The note to Regulation 521.10.202 precludes non-metallic clips or ties as the sole means of support for cables clipped direct or suspended beneath tray, and equally precludes non-metallic trunking as the sole support of the cables within it, because plastic softens and releases the cables when heated. Halving the spacing does not fix this: the failure mode is loss of the fixing material itself, not the load it carries.',
    section: '3.6.1',
    difficulty: 'advanced',
    topic: 'Cable Support and Fixing',
  },
  {
    id: 313,
    question:
      'A submain is wired in standard steel wire armoured cable to BS 5467. What insulation type and conductor operating temperature does that cable have?',
    options: [
      'Thermoplastic insulation rated 90 °C at the core',
      'Thermosetting insulation rated 90 °C at the conductor',
      'Thermosetting insulation rated 70 °C at the core',
      'Thermoplastic insulation rated at 70 °C at the conductor',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5467:2016 covers thermosetting insulated armoured cables, and Table 52.2 gives thermosetting insulation a limit of 90 °C at the conductor, against 70 °C for thermoplastic. Assuming 70 °C PVC is the usual site error, because it comes from familiarity with twin and earth and it sends you to the wrong Appendix 4 tables for both rating and voltage drop.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 314,
    question:
      'An armoured submain to BS 5467 is being rated and checked at its 90 °C conductor temperature. Which Appendix 4 voltage drop figures apply?',
    options: [
      'The 90 °C thermosetting values for that cable type',
      'The 70 °C thermoplastic values, which are more onerous',
      'Either set, because voltage drop does not vary with heat',
      'The thermoplastic values, since the armour cools the cable',
    ],
    correctAnswer: 0,
    explanation:
      'Conductor resistance rises with temperature, so the millivolt-per-amp-per-metre figures tabulated for 90 °C thermosetting cable are higher than the 70 °C thermoplastic ones; taking the 70 °C column understates the drop and can make a long run look compliant when it is not. Appendix 4 does allow the 70 °C tables to be used for 90 °C thermosetting cable, but only where the current rating is deliberately being based on 70 °C, for example to respect a terminal temperature limit.',
    section: '3.1.8',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 315,
    question:
      'A contractor needs to run trunking through a structural beam. What does Regulation 522.8.14 permit?',
    options: [
      'It is allowed if the opening is under 25 mm in diameter',
      'It is allowed if the cables are enclosed in steel conduit',
      'It is allowed where structural integrity can be assured',
      'It is allowed where an RCD protects the affected circuit',
    ],
    correctAnswer: 2,
    explanation:
      'No wiring system may penetrate an element of building construction intended to be load-bearing unless the integrity of that element can be assured after the penetration, which in practice means the structural engineer or building designer signs off the opening. Wrapping the cables in steel conduit is the attractive answer because it improves cable protection, but it does nothing for the strength of the beam, which is what the regulation is protecting.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixing',
  },
  {
    id: 316,
    question:
      'A steel conduit system is relied upon as the circuit protective conductor. Which of these features would invalidate that arrangement?',
    options: [
      'A section joined using a flexible conduit connector',
      'A run terminated with a brass male bush and locknut',
      'A run using solid elbows instead of inspection bends',
      'A run with more than two bends between draw-in boxes',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 543.2.3 forbids flexible or pliable conduit from serving as a protective conductor, so inserting a flexible section breaks the earth path that 543.2.1(f) allows a metallic enclosure to provide, and a separate cpc must then be drawn in. Solid elbows and multiple bends are poor practice for drawing cables in and may breach installation guidance, but neither affects the electrical continuity that makes the conduit a valid cpc.',
    section: '3.2.2',
    difficulty: 'advanced',
    topic: 'Conduit Systems',
  },
  {
    id: 317,
    question:
      'Thermoplastic insulated cable is being installed on a very cold winter morning. What does Regulation 522.1.2 require?',
    options: [
      'Warm every drum with a hot air gun before uncoiling it',
      'Handle it only within the manufacturer temperature limits',
      'Handle it freely, as cold weather affects only the ratings',
      'Postpone all cable work until the ambient exceeds 15 °C',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 522.1.2 requires wiring system components to be installed and handled within the temperature limits given in the product standard or the manufacturer instructions, and handling covers uncoiling, routing, fixing and site storage as well as final erection. The idea that cold only matters for current ratings is the trap: thermoplastic insulation becomes brittle when cold and can crack while being pulled, creating a fault that is invisible until testing.',
    section: '3.1.9',
    difficulty: 'intermediate',
    topic: 'Cable Types and Selection',
  },
  {
    id: 318,
    question:
      'A Band I extra-low voltage alarm circuit and Band II mains circuits are to share one trunking. Which method satisfies Regulation 528.1?',
    options: [
      'Insulate every conductor for the highest voltage present',
      'Run the Band I cores in the lid section of the trunking',
      'Space the two groups at least 50 mm apart in the trunking',
      'Identify the Band I cores with distinctive marker sleeves',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 528.1 permits mixed bands in one wiring system where every cable or conductor is insulated for the highest voltage present, or where the bands are physically separated by a partition, for example a partitioned trunking or tray. Simply spacing the groups apart is not one of the permitted methods, because cables move when the lid goes on and a fault could impress mains voltage onto the extra-low voltage circuit.',
    section: '3.7.2',
    difficulty: 'intermediate',
    topic: 'Segregation and Fire Sealing',
  },
  {
    id: 319,
    question:
      'A partitioned metal cable tray is proposed to keep Band I control cables away from Band II power cables. Is that acceptable?',
    options: [
      'No, the two bands may never share a common support',
      'No, unless the control cables are screened throughout',
      'Yes, but only where each circuit also has an RCD fitted',
      'Yes, a partition is a recognised separation method',
    ],
    correctAnswer: 3,
    explanation:
      'Method (d) of Regulation 528.1 expressly permits cables on a cable tray system where physical separation is provided by a partition, so a partitioned tray is a compliant alternative to insulating everything for the highest voltage present. The absolute answer that the bands may never share a support is wrong: 528.1 sets conditions for sharing, it does not ban it.',
    section: '3.3.1',
    difficulty: 'advanced',
    topic: 'Trunking and Tray Systems',
  },
  {
    id: 320,
    question:
      'A readily accessible enclosure has a horizontal top surface. What minimum degree of protection must that surface provide?',
    options: [
      'At least IP44 rating applied to the top surface',
      'At least IP4X or IPXXD to the top surface',
      'At least IP65 rating applied to the top surface',
      'At least IP2X or IPXXB to the top surface',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 416.2.2 requires a readily accessible horizontal top surface of a barrier or enclosure to provide at least IPXXD or IP4X, which keeps out solid objects of 1.0 mm and greater such as screws and offcuts dropped from above. IP2X or IPXXB is the general requirement for other surfaces, so applying it to a horizontal top would leave openings big enough for small debris to fall onto live parts.',
    section: '3.4.1',
    difficulty: 'advanced',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 321,
    question:
      'In an IP code such as IP4X, what does the first numeral describe?',
    options: [
      'Protection against ingress of solid foreign objects',
      'Protection against ingress of water and moisture',
      'Protection against mechanical impact and heavy knocks',
      'Protection against corrosion of the enclosure body itself',
    ],
    correctAnswer: 0,
    explanation:
      'The first IP numeral covers solid foreign objects and access to hazardous parts, so a 4 means protection against objects of 1.0 mm diameter and greater; the second numeral covers water, which is why an X in that position means no water rating is claimed. Impact resistance is not part of the IP code at all, it is expressed separately as an IK rating.',
    section: '3.4.2',
    difficulty: 'basic',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 322,
    question:
      'What are the two main functions of the gland fitted where a steel wire armoured cable enters an enclosure?',
    options: [
      'It seals the enclosure and insulates the outer sheath end',
      'It seals the enclosure and shortens the cable tails inside',
      'It anchors the cable and earths the armour to the box',
      'It anchors the cable and insulates the armour from the gland',
    ],
    correctAnswer: 2,
    explanation:
      'The gland grips the cable so that no appreciable mechanical strain reaches the terminations, as Regulation 522.8.5 demands, and it makes the metallic armour electrically continuous with the enclosure, which is what allows that armour to act as the protective conductor under Regulation 543.2.1. Insulating the armour is the appealing wrong answer for anyone thinking about avoiding stray currents, but it would destroy the earth path the cable design relies on.',
    section: '3.5.2',
    difficulty: 'basic',
    topic: 'Terminations and Connections',
  },
  {
    id: 323,
    question:
      'A cable is concealed at 40 mm depth in a metal stud partition and is routed inside a prescribed zone. What does Table 52.1 require in addition?',
    options: [
      '30 mA RCD protection, or compliance with 522.6.204',
      'Nothing further, as the prescribed zone is satisfied',
      'Earth bonding of the metal studs on both wall faces',
      'Re-routing the cable outside any prescribed zone',
    ],
    correctAnswer: 0,
    explanation:
      'Table 52.1 treats a wall or partition containing metallic parts more strictly: the cable needs additional protection by an RCD to the characteristics of Regulation 415.1.1, or it must satisfy one of the alternatives in 522.6.204, and being inside a prescribed zone does not remove that duty. Assuming the zone alone is enough is the classic error, because that concession belongs to walls without metallic parts.',
    section: '3.1.10',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 324,
    question:
      'A fine stranded flexible lead feeds a machine that moves in service. Why does BS 7671 restrict tinning the strand ends with solder before terminating?',
    options: [
      'Solder greatly raises the resistance of the strands',
      'Solder prevents safe use of any screw type terminal',
      'Relative movement in service can loosen the joint',
      'Tinned strands cannot be identified during testing',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 526.9.3 bars soldered or tinned conductor ends at connection points where relative movement occurs in service between the soldered portion and the rest of the conductor, because the stiff soldered section works against the flexible strands and the joint slackens. The resistance answer is plausible sounding but wrong: solder does not meaningfully raise conductor resistance, it is the mechanical behaviour of the joint that is the hazard.',
    section: '3.5.3',
    difficulty: 'advanced',
    topic: 'Terminations and Connections',
  },
  {
    id: 325,
    question:
      'What does Regulation 526.1 require of conductor connections at a distribution board?',
    options: [
      'Every connection must be correctly located, tight and secure',
      'Connections rated above 32 A alone require a torque check',
      'Busbar connections are exempt from the tightness check',
      'Screw terminals need retightening at every periodic inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 526.1 requires all conductor connections, expressly including connections to busbars, to be correctly located in their terminals and to be tight and secure, with manufacturer torque figures applied where given. Treating busbar connections as exempt is the tempting shortcut on a board changeover, yet a loose busbar connection carries the whole board current and is a prime source of overheating.',
    section: '3.5.4',
    difficulty: 'intermediate',
    topic: 'Terminations and Connections',
  },
  {
    id: 326,
    question:
      'Joints are to be made inside an enclosure in a plant room with a corrosive atmosphere. What does Regulation 526.7 drive you to do?',
    options: [
      'Select a non-metallic enclosure of any IP rating',
      'Select the smallest enclosure the joints will fit in',
      'Select an enclosure with a removable gland plate',
      'Select corrosion-resistant enclosures and materials',
    ],
    correctAnswer: 3,
    explanation:
      'Where connections are made inside an enclosure, the enclosure must keep them from being degraded, so corrosive conditions call for corrosion-resistant materials, protective coatings, or relocation away from the source. Picking any non-metallic box is not the answer: plastics vary widely in chemical resistance and the enclosure still has to suit the IP and mechanical duty of its position.',
    section: '3.4.4',
    difficulty: 'advanced',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 327,
    question:
      'A steel trunking run passes through a fire-resisting wall. What sealing does Section 527 require?',
    options: [
      'Seal it internally only, inside the trunking void',
      'Seal it with silicone foam at both of the wall surfaces',
      'Seal it internally and externally to the same rating',
      'Seal it externally only, around the outside faces of the wall',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 527.2.2 requires internal sealing of the wiring system to the fire resistance of the element penetrated, and Regulation 527.2.1 separately requires external sealing around the penetration, so both are needed. Doing only the outside is the common site shortfall, because fire and smoke will simply travel along the inside of the trunking and defeat the compartment.',
    section: '3.7.3',
    difficulty: 'intermediate',
    topic: 'Segregation and Fire Sealing',
  },
  {
    id: 328,
    question:
      'A cable is totally surrounded by loft insulation for about 0.8 m and no manufacturer data is available. How is its current-carrying capacity taken?',
    options: [
      'Take the full tabulated capacity with no derating used',
      'Take 0.5 times the free air, Method E, capacity value',
      'Take 0.7 times the clipped direct, Method C, capacity',
      'Take 0.5 times the clipped direct, Method C, capacity',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 523.9 says that a cable totally surrounded by thermally insulating material for 0.5 m or more is taken, in the absence of better information, as 0.5 times its capacity clipped direct to a surface and open, which is Reference Method C. Using free air Method E as the starting point inflates the answer, because free air already assumes far better cooling than the clipped baseline the regulation names.',
    section: '3.1.11',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 329,
    question:
      'A lighting circuit is wired in singles inside PVC conduit. How is the circuit protective conductor provided?',
    options: [
      'A separate protective conductor is drawn in with them',
      'An earth clamp is fitted at each coupler and at each bend',
      'A bonding conductor links each of the nearest metal boxes',
      'Nothing is needed, because the conduit itself acts as the cpc',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 543.2.1(f) only allows a metal conduit or metallic cable management system to serve as the protective conductor, so a PVC system provides no earth path and a separate cpc must be drawn in with the live conductors. Clamping earths onto couplers is a distraction: plastic fittings are not conductive, so there is nothing for the clamp to make continuity with.',
    section: '3.2.3',
    difficulty: 'intermediate',
    topic: 'Conduit Systems',
  },
  {
    id: 330,
    question:
      'Meter tails run about 1.5 m from the meter to the consumer unit. What does BS 7671 say about supporting them?',
    options: [
      'They must be clipped at 300 mm centres throughout',
      'They must be supported so terminations take no strain',
      'They need no support, being short, stiff and rigid',
      'They must be enclosed in trunking along their whole length',
    ],
    correctAnswer: 1,
    explanation:
      'The note to Regulation 522.8.5 confirms that consumer unit meter tails are covered by the support requirements, so they must be arranged so that no appreciable mechanical strain, including the weight of the tails themselves, reaches the terminations. Assuming large tails support themselves is the frequent misjudgement, and the resulting strain works terminal screws loose at the very point carrying the whole installation current.',
    section: '3.6.3',
    difficulty: 'advanced',
    topic: 'Cable Support and Fixing',
  },
  {
    id: 331,
    question:
      'Why are inspection boxes or draw-in boxes fitted along a steel conduit run?',
    options: [
      'To act as the earthing point for the whole system',
      'To let the conduit expand and contract in heat',
      'To let cables be drawn in and later withdrawn',
      'To give a means of isolating that circuit locally',
    ],
    correctAnswer: 2,
    explanation:
      'Conduit is a containment system installed first and wired second, so access boxes are positioned to keep pulling tension low and to allow cables to be withdrawn or added later, which supports the general duty in Regulation 522.8.5 to avoid undue mechanical strain on cables. They are not isolation points: isolation is a switching function provided by devices in the circuit, not by an opening in the containment.',
    section: '3.2.4',
    difficulty: 'basic',
    topic: 'Conduit Systems',
  },
  {
    id: 332,
    question:
      'Which cable standard named in Regulation 522.6.204(a) covers mineral insulated cable and its terminations?',
    options: [
      'BS 5467, for thermosetting armoured cables',
      'BS 6724, for low smoke zero halogen armoured cables',
      'BS 8436, for cables buried in walls and partitions',
      'BS EN 60702-1, for cables not exceeding 750 V',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 522.6.204(a) lists BS 5467, BS 6724, BS 7846, BS 8436 and BS EN 60702-1, and it is BS EN 60702-1 that covers mineral insulated cables and their terminations at rated voltages up to 750 V. BS 5467 is the plausible distractor because it is also on that list, but it is the standard for thermosetting insulated armoured cable, not mineral insulated.',
    section: '3.1.12',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 333,
    question:
      'A supply is to be taken to a detached garage by a cable buried directly in the ground. What does BS 7671 require of that cable?',
    options: [
      'A separate earth electrode at the garage building',
      'An outer sheath of black thermoplastic material',
      'A conductor size at least one step above the design',
      'An earthed armour or metal sheath usable as a cpc',
    ],
    correctAnswer: 3,
    explanation:
      'Unless it is run in a conduit or duct giving equivalent protection against mechanical damage, a cable buried in the ground must incorporate an earthed armour or metal sheath, or both, suitable for use as a protective conductor. Fitting an electrode at the garage is a different subject entirely: it concerns the earthing arrangement, and it does nothing about the risk of a spade or digger striking the buried cable.',
    section: '3.1.13',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 334,
    question:
      'How deep must a buried cable be laid, and how must its route be recorded on site, according to BS 7671?',
    options: [
      'Any depth is acceptable provided the cable is armoured throughout',
      'At least 600 mm in every case, with a warning notice fitted above it',
      'Sufficient depth for the ground use, with covers or marker tape',
      'At least 450 mm in every case, with covers or marker tape above it',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 sets a performance requirement rather than a number: buried cables, conduits and ducts must be at sufficient depth to avoid damage from any reasonably foreseeable disturbance of the ground, and the route must be marked by cable covers or a suitable marker tape. Quoting 450 mm as a rule is the standard misremembering, because that kind of figure comes from other guidance and does not appear as a fixed BS 7671 depth.',
    section: '3.1.14',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 335,
    question:
      'Cables are to pass through knockouts punched in a steel enclosure. What does Regulation 522.8.11 require?',
    options: [
      'Fit a compression gland to each individual knockout',
      'Line the whole enclosure with insulating material',
      'Deburr the edges or fit grommets before pulling in',
      'Enlarge the knockouts to twice the cable diameter',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 522.8.11 states that cable supports and enclosures must not have sharp edges liable to damage the wiring system, and the accepted remedies are deburring or rounding the edge, or fitting grommets, bushes or edge protection. Fitting a gland to every hole sounds thorough but is the wrong tool for the job: glands are for retaining and sealing a cable, whereas the hazard here is the punched edge cutting into the insulation.',
    section: '3.4.5',
    difficulty: 'intermediate',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 336,
    question:
      'A consumer unit is being replaced in a house. What does BS 7671 require of the enclosure of the new unit?',
    options: [
      'A metal enclosure with an IP rating of at least IP4X',
      'A sealed enclosure with intumescent strip at the entries',
      'An enclosure with a lockable door in every dwelling type',
      'Non-combustible enclosure, or a non-combustible cabinet',
    ],
    correctAnswer: 3,
    explanation:
      'Within domestic premises, a consumer unit or similar switchgear assembly must comply with BS EN 61439-3 and either have its enclosure manufactured from non-combustible material or be enclosed in a cabinet of non-combustible material complying with Regulation 132.12. The IP4X answer is tempting because IP4X does appear in BS 7671, but it belongs to the requirement for readily accessible horizontal top surfaces, not to the fire performance of the enclosure material.',
    section: '3.4.6',
    difficulty: 'advanced',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 337,
    question:
      'A run of ducting is buried across a site to carry a future submain. What does BS 7671 require regarding the buried ducting?',
    options: [
      'It must be filled with sand before the trench is closed',
      'It must be laid to a fall so that water drains away',
      'It must be suitably identified for future ground works',
      'It must be bonded to the main earthing terminal of the site',
    ],
    correctAnswer: 2,
    explanation:
      'Buried conduits and ducts must be suitably identified, complementing the requirement for cable covers or marker tape over buried cables, so that anyone excavating later knows what is below the surface. Bonding is the plausible sounding distractor, but a plastic duct cannot be bonded and identification, not earthing, is what protects the next person with a spade.',
    section: '3.6.4',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixing',
  },
  {
    id: 338,
    question:
      'Six circuits are to be bunched together along a single trunking run. What must the designer do when sizing the cables?',
    options: [
      'Apply a factor only where the trunking exceeds ten metres',
      'Apply a grouping correction factor to the tabulated rating',
      'Apply the tabulated rating, since trunking is ventilated',
      'Apply the next larger conductor size as a general rule of thumb',
    ],
    correctAnswer: 1,
    explanation:
      'Current-carrying capacity has to be assessed for the actual installation conditions, and grouping cables together reduces each cable ability to shed heat, so the Appendix 4 grouping factor is applied along with any ambient temperature and thermal insulation factors. Simply stepping up one conductor size feels safe but is not a calculation: it can under-provide with heavy grouping and waste copper where the grouping is light.',
    section: '3.3.2',
    difficulty: 'advanced',
    topic: 'Trunking and Tray Systems',
  },
  {
    id: 339,
    question:
      'Cable tray is being specified for a busy engineering workshop with vehicle movements and vibration. What governs the selection?',
    options: [
      'The mechanical influences likely at that location',
      'The distance to the nearest distribution board',
      'The number of spare ways left for any future circuits',
      'The colour coding scheme adopted for the whole building',
    ],
    correctAnswer: 0,
    explanation:
      'Wiring systems must be selected and erected so that mechanical influences likely at the location, such as impact, abrasion and vibration, are taken into account, with additional protection by tray, trunking, conduit or armour where needed. Spare capacity is good design practice and worth planning for, but it is a convenience issue and has no bearing on whether the system survives being struck by a forklift.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Trunking and Tray Systems',
  },
  {
    id: 340,
    question:
      'A data cable insulated only for extra-low voltage is proposed to share unpartitioned trunking with 230 V circuits. Is that arrangement acceptable?',
    options: [
      'Clipped flat twin and earth, protected by a 30 mA RCD device',
      'PVC mini-trunking, which is quick to install and easy to extend',
      'Steel conduit or armoured cable, protecting against impact',
      'Plastic oval conduit buried under the wall surface plasterwork',
    ],
    correctAnswer: 2,
    explanation:
      'Selection must account for the mechanical influences at the location, so an area with vehicle traffic calls for a system that can take impact and abrasion, such as steel conduit or armoured cable. Relying on a 30 mA RCD is the seductive answer because it addresses the shock risk after a strike, but BS 7671 asks you to prevent the damage in the first place rather than manage its consequences.',
    section: '3.3.4',
    difficulty: 'advanced',
    topic: 'Trunking and Tray Systems',
  },
  {
    id: 341,
    question:
      'A joint is needed in a ceiling void that will be sealed by plasterboard with no hatch. What is the compliant approach?',
    options: [
      'Use a screw terminal box, fitted with a labelled lid',
      'Use a maintenance-free accessory, or relocate the joint',
      'Use a crimped joint wrapped in self-amalgamating tape',
      'Use a connector block inside a plastic box, then seal it',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 526.3 requires joints and terminations to remain accessible for inspection, testing and maintenance, with exemptions for compound-filled or encapsulated joints and for maintenance-free accessories to BS 5733 installed per the manufacturer instructions. A labelled screw terminal box is the trap: labelling does not create access once the ceiling is boarded over, and screw terminals are precisely the type that must stay reachable.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Terminations and Connections',
  },
  {
    id: 342,
    question:
      'A data cable insulated only for extra-low voltage is proposed to share unpartitioned trunking with 230 V circuits. What is the correct judgement?',
    options: [
      'Acceptable, provided the cables are tied into groups',
      'Not acceptable, as the bands may never share a route',
      'Not acceptable, unless a partition separates the bands',
      'Acceptable, provided the data cable is screened overall',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 528.1 allows mixed bands in one wiring system only where every conductor is insulated for the highest voltage present or where the bands are physically separated, for example by a partition in the trunking or on the tray. Screening is the attractive answer because it deals with electrical interference, but a screen is not insulation rated for 230 V and would not withstand contact with a damaged mains core.',
    section: '3.7.4',
    difficulty: 'advanced',
    topic: 'Segregation and Fire Sealing',
  },
  {
    id: 343,
    question:
      'A steel conduit system runs outdoors and condensation is expected inside it. What does BS 7671 require?',
    options: [
      'Provide an insulated bush at every conduit entry point',
      'Provide a bonding conductor across every conduit joint',
      'Provide extra saddles at the lowest part of the run',
      'Provide a drainage point at the lowest part of the run',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 522.3.2 requires that where water may collect or condensation may form in a wiring system, provision is made for its escape, which for conduit means drainage holes at low points. Extra saddles improve support but trap the water exactly where it does the damage, corroding the conduit from inside and eventually attacking the cable sheath.',
    section: '3.2.5',
    difficulty: 'advanced',
    topic: 'Conduit Systems',
  },
  {
    id: 344,
    question:
      'An enclosure outdoors carries an IP rating and cables enter through glands. What must the installer ensure at those entries?',
    options: [
      'Entries are made only in the base of the enclosure',
      'Entries are kept to one cable per gland at all times',
      'Entries are fitted with rubber grommets for support',
      'Entries are sealed so the IP rating is maintained',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 522.3.1 requires cable entries and gland fittings to be sealed as necessary so that water or condensation ingress cannot cause damage, using IP-rated glands and sealing compounds consistent with the enclosure rating. Grommets are the wrong choice here: they protect against sharp edges, but they do not seal, so a high IP enclosure fitted with grommets is effectively open to the weather.',
    section: '3.4.7',
    difficulty: 'intermediate',
    topic: 'Enclosures and IP Ratings',
  },
  {
    id: 345,
    question:
      'A final connection to a vibrating motor is made in flexible metallic conduit. What must accompany that arrangement?',
    options: [
      'A separate protective conductor run with the circuit',
      'An earthing clamp on the flexible conduit at each end',
      'A double locknut at the motor terminal box entry point',
      'A vibration mount fitted under the conduit saddles',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 522.7 requires vibration to be taken into account, which is why a flexible connection is used, but Regulation 543.2.3 forbids flexible or pliable conduit from acting as the protective conductor, so a separate cpc must be run through it. Clamping an earth to each end of the flex is the plausible workaround, yet the regulation excludes the flexible conduit itself from the earth path regardless of how it is clamped.',
    section: '3.2.6',
    difficulty: 'advanced',
    topic: 'Conduit Systems',
  },
  {
    id: 346,
    question:
      'When may a steel conduit or trunking system be regarded as the circuit protective conductor for the circuits within it?',
    options: [
      'When it is fitted with earth tags at every draw-in box',
      'When it is continuous and contains all circuit conductors',
      'When it is clipped at the spacings given by the maker',
      'When it is continuous and painted for corrosion protection',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 543.2.1(f) permits a metal conduit or metallic cable management system to be the protective conductor where the continuity, cross-sectional area and connection requirements are met, and the associated guidance expects the enclosure to contain the circuit conductors and be connected to the earthing terminal at the origin. Earth tags at boxes help maintain continuity but are not on their own the qualifying condition, since a system can be well tagged and still be broken by a flexible section or a poor joint.',
    section: '3.2.7',
    difficulty: 'intermediate',
    topic: 'Conduit Systems',
  },
  {
    id: 347,
    question:
      'An armoured cable must be jointed below ground where the joint can never be reached again. What makes this acceptable?',
    options: [
      'A screw connector inside a weatherproof box is acceptable',
      'A crimped joint taped and buried is acceptable if recorded',
      'A compound-filled or encapsulated joint is exempt from access',
      'A joint is acceptable wherever the circuit has RCD cover',
    ],
    correctAnswer: 2,
    explanation:
      'The general rule in Regulation 526.3 that joints stay accessible for inspection, testing and maintenance does not apply to compound-filled or encapsulated joints, which is exactly why resin joint kits exist for underground work. Recording the position of a taped crimp does not help: the joint would still be an inaccessible screw or crimp connection with no exemption available to it.',
    section: '3.5.6',
    difficulty: 'advanced',
    topic: 'Terminations and Connections',
  },
  {
    id: 348,
    question:
      'Cables drop vertically down a long trunking riser between floors. What must the support arrangement achieve?',
    options: [
      'The cables must be supported only at the riser top end',
      'The cables must be tied at every 300 mm of the riser',
      'The cables must be laid in one flat layer in the riser',
      'The cable self-weight must not strain the terminations',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 522.8.5 requires cables to be supported so they are not subject to undue mechanical strain and so that no appreciable strain reaches their terminations, and it expressly says the supported weight of the cable itself must be taken into account, which matters most on a vertical riser. Supporting only at the top is the arrangement that fails this test, because the entire hanging weight then pulls on that single point and on the terminations below.',
    section: '3.6.5',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixing',
  },
  {
    id: 349,
    question:
      'A 20 mm non-flame propagating PVC conduit, well under 710 mm² internally, passes through a fire-resisting wall. What sealing is needed?',
    options: [
      'Internal sealing at the wall, external sealing not needed',
      'External sealing at the wall, internal sealing not needed',
      'Neither, since the conduit is non-flame propagating',
      'Both internal and external sealing to the wall rating',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 527.2.3 releases a non-flame propagating conduit, trunking or ducting system of no more than 710 mm² internal cross-sectional area from internal sealing, provided its further conditions are met, but the external sealing duty of Regulation 527.2.1 around the penetration still stands. Answering neither is the trap, because the concession is limited to what happens inside the conduit and never to the hole through the wall.',
    section: '3.7.5',
    difficulty: 'advanced',
    topic: 'Segregation and Fire Sealing',
  },
  {
    id: 350,
    question:
      'Besides an earthed metallic covering, which alternative in Regulation 522.6.204 suits a cable concealed in a wall?',
    options: [
      'Enclosure in oval PVC conduit chased into the wall',
      'Enclosure in flexible conduit taken to each accessory',
      'Enclosure in earthed conduit or earthed trunking',
      'Enclosure in mini-trunking fixed to the wall surface',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 522.6.204 lists earthed metallic covering, earthed conduit, earthed trunking, mechanical protection sufficient to prevent penetration by nails and screws, and SELV or PELV supply as the alternatives available where Table 52.1 stipulates them. Surface mini-trunking does not qualify because the regulation deals with cables concealed in the wall, and the plastic offers neither an earthed covering nor resistance to a driven fixing.',
    section: '3.1.15',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 351,
    question:
      'Under what condition may a cable without armour or an earthed metal sheath be installed underground?',
    options: [
      'Where a conduit or duct gives equivalent mechanical protection',
      'Where the trench is backfilled with sifted soft sand',
      'Where the circuit is protected by a 30 mA RCD device',
      'Where the run is shorter than five metres end to end',
    ],
    correctAnswer: 0,
    explanation:
      'The requirement for a buried cable to incorporate an earthed armour or metal sheath usable as a protective conductor is disapplied where the cable is installed in a conduit or duct providing equivalent protection against mechanical damage. Sand surround is genuinely good practice for protecting a cable from stones, but it is not the stated exception and would not stop a pick or auger reaching the cable.',
    section: '3.1.16',
    difficulty: 'intermediate',
    topic: 'Cable Types and Selection',
  },
  {
    id: 352,
    question:
      'A wiring system is required in a food factory washdown area that is hosed daily with hot detergent. What should drive the selection?',
    options: [
      'Standard PVC trunking, with drain holes drilled on site',
      'Sealed entries, corrosion-resistant materials and drainage',
      'Sealed entries, with cable capacity increased one size',
      'Standard steel conduit, repainted at each yearly service',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 522.3.1 requires entries and glands to be sealed so water ingress cannot cause damage, 522.3.2 requires provision for water or condensation to escape, and the enclosure and containment materials must resist the corrosive conditions so connections are not degraded. Painting a standard steel system yearly is the tempting economy, but the coating is broken at every thread and fixing, and corrosion then attacks the very continuity that a steel system depends on.',
    section: '3.3.5',
    difficulty: 'advanced',
    topic: 'Trunking and Tray Systems',
  },
  {
    id: 353,
    question: 'Which document places legal duties on both employers and employees for electrical work carried out at a place of work?',
    options: [
      'The IET Code of Practice on EV charging',
      'The Electricity at Work Regulations 1989',
      'The IET On-Site Guide to BS 7671',
      'The IET Wiring Regulations BS 7671',
    ],
    correctAnswer: 1,
    explanation: 'The Electricity at Work Regulations 1989 are made under the Health and Safety at Work etc. Act 1974 and impose duties on employers, employees and the self-employed. BS 7671 is the tempting answer because everyone works to it, but it is a British Standard, not legislation: it carries no duty of its own and is used as evidence that the statutory duty was met.',
    section: '203-1.1',
    difficulty: 'basic',
    topic: 'Statutory regulations',
  },
  {
    id: 354,
    question: 'Which publication gives an electrician the site-ready tables and methods for selecting and erecting a domestic installation to BS 7671?',
    options: [
      'The IET On-Site Guide to BS 7671',
      'The Electrical Safety Standards Regulations',
      'The Electricity at Work Regulations 1989',
      'The Building Regulations Approved Document P',
    ],
    correctAnswer: 0,
    explanation: 'The On-Site Guide condenses BS 7671 into standard circuit arrangements, cable factor tables and support spacings for domestic work. Approved Document P is the tempting choice because it applies to dwellings in England, but it only sets out when work is notifiable and the standard it must reach; it contains no selection and erection data.',
    section: '203-1.2',
    difficulty: 'basic',
    topic: 'IET Guidance Notes',
  },
  {
    id: 355,
    question: 'An electrician is prosecuted after a fatal shock traced to a missing circuit protective conductor. What is the legal standing of BS 7671 in that prosecution?',
    options: [
      'It has no standing because it is a British Standard',
      'It is evidence that the statutory duty was met',
      'It is the statutory duty that was breached',
      'It replaces the statutory duty where it is followed',
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 is non-statutory, so it cannot itself be breached in law; a court treats compliance with it as evidence that the duties in the Electricity at Work Regulations were discharged. Option C is the common misunderstanding: the duty that was breached is the statutory one, and BS 7671 is the yardstick used to judge it.',
    section: '203-1.3',
    difficulty: 'intermediate',
    topic: 'EAWR enforcement',
  },
  {
    id: 356,
    question: 'A client asks why a contractor works to the IET On-Site Guide when it is not law. Which answer is correct?',
    options: [
      'Following it removes the need to certify the work',
      'Following it transfers liability to the IET',
      'Following it is compulsory under Building Regulations',
      'Following it demonstrates the statutory duty was met',
    ],
    correctAnswer: 3,
    explanation: 'Guidance is deemed to satisfy the statutory duty: an installation built to it is presumed safe unless shown otherwise. Option C is tempting because Approved Document P does point at BS 7671, but it points at the standard, not at the guide, and the guide itself is never compulsory.',
    section: '203-1.4',
    difficulty: 'intermediate',
    topic: 'OSG deemed-to-satisfy',
  },
  {
    id: 357,
    question: 'An apprentice is told to remove the guard from a bench grinder to speed up a job. Under the Health and Safety at Work etc. Act 1974, what is the apprentice\'s own legal position?',
    options: [
      'They carry a duty only once they are time-served',
      'They must obey since a supervisor gave the instruction',
      'They must not interfere with anything provided for safety',
      'They carry no duty because they are still in training',
    ],
    correctAnswer: 2,
    explanation: 'Section 7 of the Act places duties on every employee to take care of themselves and others, and section 8 forbids interfering with anything provided in the interests of safety. Option B is the trap an apprentice falls into on site: an unlawful instruction from a supervisor does not transfer the apprentice\'s own duty away.',
    section: '203-1.1',
    difficulty: 'intermediate',
    topic: 'HASAWA employee duties',
  },
  {
    id: 358,
    question: 'A new circuit is added to a domestic kitchen in England by a contractor who is not registered with a competent person scheme. What must happen for the work to be lawful?',
    options: [
      'It must be inspected by the DNO before it is energised',
      'It must be certified by the contractor and nothing more',
      'It must be notified to building control beforehand',
      'It must be signed off by the client on a minor works form',
    ],
    correctAnswer: 2,
    explanation: 'A new circuit in a kitchen is notifiable work in England, and an unregistered contractor has no self-certification route, so a building notice must be given before work starts. Option B is the trap: issuing an installation certificate satisfies BS 7671 but does nothing at all about the Building Regulations notification.',
    section: '203-1.3',
    difficulty: 'advanced',
    topic: 'Building Regs Part P',
  },
  {
    id: 359,
    question: 'Two contractors quote for a consumer unit replacement in a dwelling in England. One is scheme-registered and one is not. Which statement about notification is correct?',
    options: [
      'Both must notify because the work is a full rewire',
      'The registered firm self-certifies, the other notifies',
      'Neither notifies because it is a like-for-like swap',
      'The registered firm notifies and the other self-certifies',
    ],
    correctAnswer: 1,
    explanation: 'Scheme registration exists precisely so members can self-certify notifiable work and have it registered on their behalf; a non-member must serve a building notice instead. Option C is the trap heard most often on site: replacing a consumer unit is notifiable regardless of it being a swap, because it is work on the origin of the installation.',
    section: '203-1.4',
    difficulty: 'advanced',
    topic: 'Competent Person Schemes',
  },
  {
    id: 360,
    question: 'A specification calls for a submain cable to BS 5467 and the wholesaler offers one to a different standard with the same conductor size. Why does the substitution matter?',
    options: [
      'The standard fixes the construction and insulation',
      'The standard fixes the colour of the outer sheath',
      'The standard fixes the price the wholesaler may charge',
      'The standard fixes only the conductor material used',
    ],
    correctAnswer: 0,
    explanation: 'BS 5467 defines an armoured cable with thermosetting insulation rated for a 90 degrees C conductor operating temperature, so the standard controls the rating, the armour and the terminations. Option D is tempting because conductor size was matched, but two cables of the same size to different standards can have quite different current-carrying capacities.',
    section: '203-1.2',
    difficulty: 'advanced',
    topic: 'British Standards',
  },
  {
    id: 361,
    question: 'During a rewire the only isolation point is the distributor\'s cut-out fuse at the service head. What does the electrician\'s statutory duty require?',
    options: [
      'Arrange for the distributor to withdraw the fuse',
      'Withdraw the cut-out fuse and refit the seal',
      'Withdraw the fuse and note it on the certificate',
      'Work live using insulated tools and a mat',
    ],
    correctAnswer: 0,
    explanation: 'The cut-out belongs to the distributor and is sealed; breaking that seal is unlawful, so the distributor or supplier must be asked to isolate. Option B is what many are tempted to do because the fuse pulls out easily, but replacing the seal afterwards does not make the interference lawful and leaves the electrician liable.',
    section: '203-1.3',
    difficulty: 'advanced',
    topic: 'Statutory regulations',
  },
  {
    id: 362,
    question: 'A luminaire manufacturer\'s instructions demand a 90 degrees C rated flexible cord, but the project specification names a 70 degrees C cord. How should the electrician proceed?',
    options: [
      'Fit the 70 degrees C cord and note it on the certificate',
      'Fit the 70 degrees C cord because the specification wins',
      'Fit either cord since both are rated at 300/500 volts',
      'Fit the 90 degrees C cord and record the conflict',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires equipment to be installed in accordance with the manufacturer\'s instructions, and the higher temperature rating is there because of the heat at the lamp terminals. Option B is the trap: a specification cannot override a manufacturer\'s instruction, and following it would leave a cord degrading in service.',
    section: '203-1.4',
    difficulty: 'advanced',
    topic: 'Specification Conflicts',
  },
  {
    id: 363,
    question: 'Which document tells the electrician the terminal tightening torque for a particular consumer unit?',
    options: [
      'The building control completion notice',
      'The electrical installation certificate',
      'The manufacturer\'s installation instructions',
      'The architect\'s general arrangement drawing set',
    ],
    correctAnswer: 2,
    explanation: 'Torque figures are product-specific and are published only by the maker of the equipment. Option B is a common guess because the certificate records what was done, but a certificate reports results after the event and carries no torque data.',
    section: '203-2.1',
    difficulty: 'basic',
    topic: 'Sources of technical information',
  },
  {
    id: 364,
    question: 'Which drawing shows accessories in their true relative positions, drawn to scale on a floor plan?',
    options: [
      'A wiring diagram of the board',
      'A block diagram of the whole system',
      'A schematic circuit diagram',
      'A layout drawing of the floor',
    ],
    correctAnswer: 3,
    explanation: 'A layout drawing places every item where it will physically be, which is what lets you measure a run from it. A schematic is the tempting alternative because it also shows the same accessories, but it shows only how they connect logically, with no relationship to distance or position.',
    section: '203-2.2',
    difficulty: 'basic',
    topic: 'Drawing types',
  },
  {
    id: 365,
    question: 'A specification, a layout drawing and a schedule of accessories disagree on the number of sockets in one room. Which should the electrician treat as controlling?',
    options: [
      'The layout drawing because it is drawn to scale',
      'The schedule because it lists items to order',
      'The specification because it is written down',
      'The designer\'s written confirmation of the count',
    ],
    correctAnswer: 3,
    explanation: 'Where contract documents conflict, none of them wins by default; the designer resolves it and issues written confirmation, which then becomes the record. Option A tempts because the drawing looks the most concrete, but installing from it and being wrong leaves the electrician carrying the cost of the rework.',
    section: '203-2.1',
    difficulty: 'intermediate',
    topic: 'Drawing pack purpose',
  },
  {
    id: 366,
    question: 'What does a block diagram of a fire alarm system give an installer that a layout drawing does not?',
    options: [
      'The relationship between the main items of plant',
      'The scale used for setting out the detector spacing',
      'The cable size required for each detector circuit',
      'The exact position of each sounder on the floor plan',
    ],
    correctAnswer: 0,
    explanation: 'A block diagram strips out position and shows how panel, loops, sounders and interfaces relate to each other, which is how you understand the system before you wire it. Option D is exactly what a block diagram does not give, and is the reason both drawings are issued together.',
    section: '203-2.2',
    difficulty: 'intermediate',
    topic: 'Block diagrams',
  },
  {
    id: 367,
    question: 'Two contractors from different countries read the same layout drawing without confusion. Which standard makes that possible?',
    options: [
      'BS EN 60529 for IP ratings',
      'IEC 60617 for graphical symbols',
      'BS 7671 for installation requirements',
      'BS 5467 for armoured cables',
    ],
    correctAnswer: 1,
    explanation: 'IEC 60617 is the international library of graphical symbols for diagrams, so a switched socket drawn in one country reads the same in another. BS 7671 is the tempting answer because it governs the installation, but it sets requirements for the work, not the symbols used to draw it.',
    section: '203-2.3',
    difficulty: 'intermediate',
    topic: 'IEC 60617',
  },
  {
    id: 368,
    question: 'On a 1:20 drawing a run of trunking measures 265 mm between two supports. What length must be ordered for that run?',
    options: [
      '5.3 m',
      '0.53 m',
      '53 m',
      '13.25 m',
    ],
    correctAnswer: 0,
    explanation: 'At 1:20 every millimetre on paper is 20 mm on site, so 265 x 20 = 5300 mm, or 5.3 m. Option D is what you get by applying 1:50 instead of 1:20, which is the single most common scaling mistake because 1:50 is the more familiar layout scale.',
    section: '203-2.4',
    difficulty: 'intermediate',
    topic: 'Scale conversion',
  },
  {
    id: 369,
    question: 'A room measures 4.5 m along its longer wall on site. At what length will that wall be drawn on a 1:50 layout?',
    options: [
      '9 mm',
      '45 mm',
      '90 mm',
      '225 mm',
    ],
    correctAnswer: 2,
    explanation: 'Dividing gives 4500 mm / 50 = 90 mm. Option D is the result of multiplying by the scale rather than dividing, which is the error made when converting from site to paper rather than paper to site.',
    section: '203-2.4',
    difficulty: 'intermediate',
    topic: 'Scale conversion',
  },
  {
    id: 370,
    question: 'A drawing produced overseas marks a socket-outlet with a symbol that does not appear in the UK symbol set. What is the correct action before first fix?',
    options: [
      'Fit a 16 A industrial socket to be on the safe side',
      'Ask the designer to confirm the item and its rating',
      'Leave a back box and decide at second fix stage',
      'Fit a 13 A twin socket as the nearest equivalent item',
    ],
    correctAnswer: 1,
    explanation: 'An unrecognised symbol is a query for the designer, and resolving it at first fix costs nothing. Option D is tempting because a 13 A twin is the usual UK default, but guessing the rating decides the circuit design, the cable and the protective device before anyone has confirmed the load.',
    section: '203-2.3',
    difficulty: 'advanced',
    topic: 'Drawing symbols',
  },
  {
    id: 371,
    question: 'Before altering a distribution board the electrician can find no record of the existing circuits. Which document should be sought first?',
    options: [
      'The last electrical installation condition report',
      'The client\'s list of appliances used in the property',
      'The original building control completion notice',
      'The manufacturer\'s data sheet for the old board',
    ],
    correctAnswer: 0,
    explanation: 'A condition report carries a schedule of circuit details and test results, which is the nearest thing to a survey of what is actually there. Option D tempts because the board maker is known, but a data sheet describes the enclosure and devices, not what has been wired into them over the years.',
    section: '203-2.1',
    difficulty: 'advanced',
    topic: 'Documentation',
  },
  {
    id: 372,
    question: 'An as-fitted drawing is issued at the end of a project. What makes it different from the tender drawing issued at the start?',
    options: [
      'It replaces the need for a schedule of test results',
      'It records where the work was actually installed',
      'It shows only circuits that were tested live',
      'It is drawn at a larger scale to show more detail',
    ],
    correctAnswer: 1,
    explanation: 'As-fitted drawings capture the route and position changes made on site so that future work does not start from a fiction. Option D is a plausible guess because as-fitted drawings often do look more detailed, but the scale is usually unchanged and it is the accuracy, not the scale, that matters.',
    section: '203-2.2',
    difficulty: 'advanced',
    topic: 'Drawing types',
  },
  {
    id: 373,
    question: 'A 32 A ring final circuit wired in 2.5 mm squared is to be replaced by a radial circuit covering the same area, keeping the 32 A device. What must change?',
    options: [
      'The sockets must be reduced to two in number',
      'The cable must be increased in cross-sectional area',
      'The device must be changed to a Type C device',
      'The cable may stay at 2.5 mm squared throughout',
    ],
    correctAnswer: 1,
    explanation: 'A ring shares load between two legs, so 2.5 mm squared is adequate; a radial carries the whole 32 A in one conductor and needs a larger cable. Option D is the trap: reusing the existing cable as a radial leaves it protected by a device rated above its capacity, and the circuit could overload without ever tripping.',
    section: '203-3.1',
    difficulty: 'intermediate',
    topic: 'Radial vs ring',
  },
  {
    id: 374,
    question: 'A ring final circuit is found to have been broken and reconnected as two radial legs from the same 32 A device, each in 2.5 mm squared. Why is that a fault?',
    options: [
      'The sockets furthest from the board lose their polarity',
      'The circuit protective conductor is no longer earthed',
      'The device can no longer be tested for disconnection times',
      'Each leg can carry more current than it is rated for',
    ],
    correctAnswer: 3,
    explanation: 'Two 2.5 mm squared legs on one 32 A device are two radials that are each undersized, and the device cannot see which leg is overloaded. Option B is a natural worry but wrong: the cpc in each leg is still connected back to the earth bar, so the earthing is intact while the overload risk is not.',
    section: '203-3.1',
    difficulty: 'advanced',
    topic: 'Ring final circuit',
  },
  {
    id: 375,
    question: 'In a three-plate ceiling rose the conductor going to the switch and back is sleeved brown at the switch. Why is that sleeving required?',
    options: [
      'A green core is being used as a line conductor',
      'A blue core is being used as a line conductor',
      'A brown core must be identified as a neutral',
      'A blue core must be identified as an earth',
    ],
    correctAnswer: 1,
    explanation: 'In a twin and earth switch drop the blue core carries the switched line, so it must be identified brown at both ends. Option C reverses the situation and is the mistake made when the sleeving is applied without thinking about which core is doing which job.',
    section: '203-3.1',
    difficulty: 'advanced',
    topic: 'Circuit Design',
  },
  {
    id: 376,
    question: 'A 6 A Type B device on a lighting circuit trips as a bank of LED luminaires is switched on, but holds once they are running. What is the most likely cause?',
    options: [
      'An earth fault in the switch drop cable',
      'Overload from too many lamps on the circuit',
      'Inrush current from the luminaire drivers',
      'A short circuit between line and neutral',
    ],
    correctAnswer: 2,
    explanation: 'LED drivers draw a very short, very high charging current at switch-on, which can exceed the magnetic trip threshold of a Type B device even though the running load is tiny. Option B is the obvious guess but does not fit the evidence: an overload would trip the device while running, not only at the instant of switching.',
    section: '203-3.1',
    difficulty: 'advanced',
    topic: 'Circuit Protection',
  },
  {
    id: 377,
    question: 'A submain must cross an open yard at low level along a wall where forklift trucks turn. Which wiring system should be selected?',
    options: [
      'Flexible cord on a catenary above the yard',
      'Flat twin and earth clipped to the wall',
      'Armoured cable clipped to the wall on cleats',
      'Singles in PVC conduit on the wall face',
    ],
    correctAnswer: 2,
    explanation: 'Armoured cable carries its own mechanical protection and its armour serves as the protective conductor, which is what a vehicle area demands. Option D is the tempting compromise because conduit looks like protection, but PVC conduit shatters under vehicle impact and offers no earthed metallic covering behind it.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Cable Types and Selection',
  },
  {
    id: 378,
    question: 'A dairy washdown area is hosed daily with hot detergent. What should drive the choice of wiring system and accessories there?',
    options: [
      'Resistance to dust ingress above every other factor',
      'Resistance to impact from the cleaning equipment used',
      'Resistance to water jets and to the chemicals used',
      'Resistance to splashing water at the ambient temperature',
    ],
    correctAnswer: 2,
    explanation: 'Hosing means jets, not splashing, and detergent is a chemical attack on sheaths and gaskets, so both must be designed for. Option D is the classic underspecification: IP44 protects against splashing water only and will let a hose jet straight past the seal.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Chemical Resistance',
  },
  {
    id: 379,
    question: 'Galvanised steel trunking is fixed on a pier using stainless steel bolts and left in constant salt spray. Which problem should be expected first?',
    options: [
      'Failure of the trunking to carry its load',
      'Loss of earth continuity across the lid',
      'Corrosion where the two dissimilar metals touch',
      'Softening of the trunking under solar heating',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires that dissimilar metals liable to start electrolytic action are not placed in contact, and stainless against galvanised steel in salt spray is exactly that couple. Option B is a real consequence, but it happens later and only because the joint has already corroded away.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Marine Corrosion',
  },
  {
    id: 380,
    question: 'Data cables must run 30 m alongside a 400 V busbar rising main. Which arrangement best limits interference?',
    options: [
      'Separate plastic trunking fixed alongside the busbar',
      'The same tray with the cables tied together',
      'The same trunking with a plastic divider strip',
      'Separate steel containment earthed at both ends',
    ],
    correctAnswer: 3,
    explanation: 'Earthed steel containment gives a screen as well as physical separation, which is what reduces induced interference. Option C looks like it meets the segregation rule, and it does separate the bands, but a plastic divider gives no screening at all against the magnetic field from the busbar.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'EMI Protection',
  },
  {
    id: 381,
    question: 'A wiring system is required in a paint spray booth where flammable vapour is present in normal running. What governs the selection of the equipment?',
    options: [
      'An IP rating of at least IP65 on every item',
      'An RCD rated at 30 mA on every final circuit',
      'The use of steel conduit throughout the booth',
      'Certification for the zone the equipment sits in',
    ],
    correctAnswer: 3,
    explanation: 'In an explosive atmosphere the classified zone dictates the protection concept, and only equipment certified for that zone may be used. Option A is a common half-answer: a high IP rating keeps vapour out of an enclosure but says nothing about whether the equipment could ignite the atmosphere around it.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Hazardous Areas',
  },
  {
    id: 382,
    question: 'A fire alarm sounder circuit runs across a warehouse on cable tray. Why is a standard thermoplastic cable rejected for that duty?',
    options: [
      'It cannot keep the circuit alive during a fire',
      'It cannot be run in the same building as the tray',
      'It cannot be supported along a metal cable tray',
      'It cannot carry the current that the sounders draw',
    ],
    correctAnswer: 0,
    explanation: 'Alarm circuits must continue to operate while the building is being evacuated, which needs a fire-resistant cable rather than a general purpose one. Option D is tempting because sounder circuits are often long, but volt drop is a design calculation, not the reason the cable type is ruled out.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Fire Resistant Cables',
  },
  {
    id: 383,
    question: 'A designer picks a cable straight from the tabulated current-carrying capacity for six circuits bunched together in one trunking. What has been missed?',
    options: [
      'The rating factor for the device breaking time',
      'The rating factor for grouping the circuits',
      'The rating factor for the circuit length used',
      'The rating factor for conductor material',
    ],
    correctAnswer: 1,
    explanation: 'Bunched circuits heat one another, so a grouping factor must be applied before the tabulated value can be used. Option C is the plausible-sounding distractor: length matters, but it drives volt drop, not the current-carrying capacity of the conductor.',
    section: '3.1.10',
    difficulty: 'advanced',
    topic: 'Cable Grouping',
  },
  {
    id: 384,
    question: 'A 2.5 mm squared thermoplastic cable clipped direct is later completely buried by loft insulation over about 1 m of its length, with no manufacturer data available. How is its current-carrying capacity taken?',
    options: [
      'A quarter of the clipped direct value used',
      'The same as the clipped direct value used',
      'The value for a cable in a thermally insulated wall',
      'Half the clipped direct value for that cable',
    ],
    correctAnswer: 3,
    explanation: 'Where a single cable is totally surrounded by thermal insulation over 0.5 m or more, and better information is not available, BS 7671 takes the capacity as 0.5 times the clipped direct value. Option C is the near miss: the insulated wall figures apply when the cable touches a thermally conductive surface on one side, which is not the case when it is buried on all sides.',
    section: '3.1.10',
    difficulty: 'advanced',
    topic: 'Installation Methods',
  },
  {
    id: 385,
    question: 'Two identical circuits run side by side, one through a boiler room at 45 degrees C ambient and one along a corridor at 30 degrees C. What must the designer do for the boiler room circuit?',
    options: [
      'Apply a volt drop factor for the run',
      'Apply an ambient temperature rating factor',
      'Apply a grouping factor for both circuits',
      'Apply a thermal insulation factor',
    ],
    correctAnswer: 1,
    explanation: 'Tabulated capacities assume a reference ambient, and a hotter room leaves the conductor less margin, so an ambient temperature factor reduces the usable rating. Option C is wrong here because the two circuits are separate runs, not bunched, so grouping does not arise.',
    section: '3.1.10',
    difficulty: 'advanced',
    topic: 'Current Capacity Factors',
  },
  {
    id: 386,
    question: 'What does the rated breaking capacity marked on a circuit-breaker tell the installer?',
    options: [
      'The largest fault current it can safely interrupt',
      'The largest load current it will carry continuously',
      'The current at which it will trip within 0.4 seconds',
      'The voltage at which it has been designed to operate',
    ],
    correctAnswer: 0,
    explanation: 'Breaking capacity is the prospective fault current the device can clear without being destroyed, which is why it is compared with the fault level at that point. Option B is the everyday confusion with the rated current In, which is the load figure printed alongside it.',
    section: '3.5.10',
    difficulty: 'basic',
    topic: 'Circuit Protection',
  },
  {
    id: 387,
    question: 'A workshop lathe with a direct-on-line motor repeatedly trips its Type B device on starting, although the running current is well within the rating. Which change is appropriate?',
    options: [
      'Fit a 30 mA RCD ahead of the device',
      'Fit a rewirable fuse of the same rating',
      'Fit a Type C device of the same rating',
      'Fit a Type B device of a larger rating',
    ],
    correctAnswer: 2,
    explanation: 'A Type C tolerates a higher magnetic trip threshold, which accommodates motor starting current without raising the rated current. Option D is the shortcut many reach for, but increasing In leaves the cable protected by a device above its capacity, which is an overload risk that lasts for the life of the circuit.',
    section: '3.5.10',
    difficulty: 'intermediate',
    topic: 'Circuit Protection',
  },
  {
    id: 388,
    question: 'An office refurbishment adds 13 A socket-outlets in an open plan first floor area. What does BS 7671 require for those socket-outlets?',
    options: [
      'A documented risk assessment in every case',
      'A circuit for each socket-outlet',
      'Additional protection by a 30 mA RCD',
      'Additional protection by a 100 mA RCD',
    ],
    correctAnswer: 2,
    explanation: 'Socket-outlets rated up to 32 A require additional protection by a 30 mA RCD, and that is the default position. Option A is the near miss: outside dwellings a documented risk assessment may justify omitting the RCD, but that is an exception that has to be argued and recorded, not a requirement in its own right.',
    section: '3.4.6',
    difficulty: 'intermediate',
    topic: 'RCD Requirements',
  },
  {
    id: 389,
    question: 'A 30 mA RCD protecting a ring final circuit trips intermittently and no insulation fault can be found. Which cause best fits that pattern?',
    options: [
      'Protective conductor currents from many appliances',
      'An open circuit in the ring protective conductor',
      'A loose connection at the circuit-breaker',
      'A short circuit between line and neutral',
    ],
    correctAnswer: 0,
    explanation: 'Filters in modern electronic equipment each pass a small standing current to earth, and enough of them on one RCD will drift the device towards its trip threshold with no single fault present. Option D does not fit: a short circuit between line and neutral produces no earth imbalance, so the RCD would not see it at all.',
    section: '3.5.13',
    difficulty: 'advanced',
    topic: 'RCD Operation',
  },
  {
    id: 390,
    question: 'Why must the device protecting a circuit have a breaking capacity at least equal to the prospective fault current at its point of installation?',
    options: [
      'So the device coordinates with the one upstream of it',
      'So the device carries the design current continuously',
      'So the device clears the fault without destruction',
      'So the device trips within the required 0.4 seconds',
    ],
    correctAnswer: 2,
    explanation: 'If the fault current exceeds the breaking capacity the device can weld, arc over or rupture instead of interrupting, leaving the fault flowing. Option D is a genuine requirement but a different one: disconnection time is set by the loop impedance and the device characteristic, not by its breaking capacity.',
    section: '3.5.10',
    difficulty: 'advanced',
    topic: 'Circuit Protection',
  },
  {
    id: 391,
    question: 'A TT installation supplies a detached workshop. Why is an RCD essential at the origin rather than optional?',
    options: [
      'The earth electrode resistance is too high for a fuse',
      'The main earthing conductor is smaller than in a TN',
      'The prospective fault current exceeds the device rating',
      'The supply neutral is combined with the earth path',
    ],
    correctAnswer: 0,
    explanation: 'On TT the earth return is through the ground, so the loop impedance is far too high for an overcurrent device to reach its disconnection time; the RCD provides the disconnection instead. Option D describes a PME arrangement, which is the opposite of TT and is why the two systems are so often mixed up.',
    section: '3.4.6',
    difficulty: 'advanced',
    topic: 'RCD Protection',
  },
  {
    id: 392,
    question: 'Why does the On-Site Guide limit how full a trunking run may be packed with cables?',
    options: [
      'To limit the heat building up between the cables',
      'To limit the length of the run between supports',
      'To keep the trunking within its IP rating in use',
      'To limit the weight the trunking lid has to carry',
    ],
    correctAnswer: 0,
    explanation: 'Cables packed together cannot lose heat, so the fill limit protects the insulation and keeps the tabulated capacities valid. Option D sounds sensible because a full trunking is heavy, but the lid carries no cable weight and the limit exists for thermal reasons.',
    section: '203-3.6',
    difficulty: 'basic',
    topic: 'Trunking Space Factor',
  },
  {
    id: 393,
    question: 'How does the On-Site Guide method decide how many cables a given conduit will take?',
    options: [
      'By counting bends and halving the cable number',
      'By limiting cables to a fixed percentage of area',
      'By dividing conduit area by the cable area used',
      'By comparing cable factors with the conduit factor',
    ],
    correctAnswer: 3,
    explanation: 'Each cable size has a factor, the factors are added, and the total is compared with the factor for the conduit size, length and number of bends. Option B is the trunking rule being applied to conduit: trunking uses a percentage space factor, conduit does not.',
    section: '203-3.6',
    difficulty: 'intermediate',
    topic: 'Conduit Fill',
  },
  {
    id: 394,
    question: 'Two conduit runs carry the same cables. One is a 2 m straight drop and one is 8 m with two bends. What does the On-Site Guide method do to the second run?',
    options: [
      'It leaves the number unchanged for the same size',
      'It reduces the number of cables permitted',
      'It requires the conduit to be one size smaller',
      'It increases the number of cables the conduit takes',
    ],
    correctAnswer: 1,
    explanation: 'The conduit factor falls as the run gets longer and as bends are added, because the pulling force needed rises steeply. Option A is what an installer assumes when working from conduit diameter alone, and it is how runs end up impossible to pull.',
    section: '203-3.6',
    difficulty: 'intermediate',
    topic: 'Containment Sizing',
  },
  {
    id: 395,
    question: 'A 20 mm conduit run of 10 m with three bends is at its calculated capacity, yet the cables will not pull through. What is the correct remedy?',
    options: [
      'Remove one cable and pull the rest through again',
      'Fit a draw-in box to break the run into sections',
      'Apply more lubricant and increase the pulling force',
      'Heat the conduit at the bends to ease the pull',
    ],
    correctAnswer: 1,
    explanation: 'Breaking a long, heavily bent run into shorter sections with a draw-in box is the designed solution and is why those boxes exist. Option C is what happens under time pressure, and it stretches conductors and strips insulation against the bends.',
    section: '203-3.6',
    difficulty: 'advanced',
    topic: 'Conduit fill — bends',
  },
  {
    id: 396,
    question: 'A trunking run is filled to its permitted space factor with single-core cables when a designer asks for six more circuits in the same trunking. What must be checked as well as the space factor?',
    options: [
      'The grouping rating factor for the added circuits',
      'The bending radius of the cables at each corner',
      'The IP rating of the trunking lid after filling',
      'The colour identification of every added conductor',
    ],
    correctAnswer: 0,
    explanation: 'More circuits in the same enclosure means a heavier grouping factor, so existing cables may no longer be adequate even if a larger trunking solves the space problem. Option B matters when installing, but it does not change with the number of circuits and is not what makes the addition unsafe.',
    section: '203-3.6',
    difficulty: 'advanced',
    topic: 'Trunking space factor',
  },
  {
    id: 397,
    question: 'In which earthing arrangement does the consumer provide an earth electrode because the distributor supplies no earth terminal?',
    options: [
      'TN-C',
      'TN-C-S',
      'TN-S',
      'TT',
    ],
    correctAnswer: 3,
    explanation: 'In a TT system the installation earth is entirely the consumer\'s own electrode, with no earth from the distributor. TN-S is the tempting answer because it also has a separate earth conductor, but that earth is provided by the distributor through the supply cable sheath.',
    section: '203-4.1',
    difficulty: 'basic',
    topic: 'Earthing arrangements',
  },
  {
    id: 398,
    question: 'Which of these is an exposed-conductive-part in a domestic installation?',
    options: [
      'The metal casing of a Class I washing machine',
      'The plastic enclosure of a Class II light fitting',
      'The copper pipework of the water main',
      'The steel lintel above the kitchen window opening',
    ],
    correctAnswer: 0,
    explanation: 'An exposed-conductive-part is metalwork of the electrical installation that is not live but could become live under fault, which is exactly the casing of Class I equipment. Option C is the classic mix-up: incoming pipework is an extraneous-conductive-part, because it is not part of the electrical installation at all.',
    section: '203-4.3',
    difficulty: 'basic',
    topic: 'Exposed conductive parts',
  },
  {
    id: 399,
    question: 'A metal gas installation pipe enters a dwelling underground. Why is it treated as an extraneous-conductive-part?',
    options: [
      'It forms part of the circuit protective conductor',
      'It is connected to the earthing terminal already',
      'It can introduce earth potential into the building',
      'It carries fault current back to the source',
    ],
    correctAnswer: 2,
    explanation: 'Extraneous parts are those liable to introduce a potential, generally earth potential, from outside the installation, which is why they are bonded. Option A is expressly forbidden: BS 7671 states that a gas pipe shall not be selected as a protective conductor.',
    section: '203-4.4',
    difficulty: 'intermediate',
    topic: 'Extraneous conductive parts',
  },
  {
    id: 400,
    question: 'Automatic disconnection of supply relies on a protective earthing arrangement, main protective bonding and one further element. What is it?',
    options: [
      'A device that disconnects within the required time',
      'A supplementary bonding conductor at each point',
      'A residual current device on every final circuit used',
      'An earth electrode at the origin of the supply',
    ],
    correctAnswer: 0,
    explanation: 'The three parts are the earthing arrangement, the main bonding and a protective device that opens fast enough for the type of circuit. Option C is a near miss: an RCD is one way of achieving disconnection, but on TN systems the overcurrent device usually does it, so an RCD is not a component of the measure itself.',
    section: '203-4.2',
    difficulty: 'intermediate',
    topic: 'ADS components',
  },
  {
    id: 401,
    question: 'On a TN-C-S supply, which part of the earth fault loop lies outside the consumer\'s installation?',
    options: [
      'The main earthing conductor at the consumer unit',
      'The line conductor of the circuit to the fault',
      'The supply transformer winding and the PEN conductor',
      'The circuit protective conductor of that circuit',
    ],
    correctAnswer: 2,
    explanation: 'The external portion, measured as Ze, runs from the origin back through the distributor\'s PEN conductor and the transformer winding. Option A is inside the installation by definition: the main earthing conductor starts at the consumer\'s main earthing terminal.',
    section: '203-4.5',
    difficulty: 'intermediate',
    topic: 'Earth fault loop path',
  },
  {
    id: 402,
    question: 'How can an electrician tell a TN-S supply from a TN-C-S supply at the intake position?',
    options: [
      'The earth comes from the meter tails at the cut-out',
      'The earth comes from the cable sheath, not neutral',
      'The earth comes from an electrode driven into the ground',
      'The earth comes from the incoming water service pipe',
    ],
    correctAnswer: 1,
    explanation: 'On TN-S the earthing conductor is clamped to the lead sheath or armour of the service cable, whereas on TN-C-S it is taken from the distributor\'s combined neutral and earth terminal. Option C describes a TT installation and is what an electrician assumes when an electrode is found alongside a distributor earth.',
    section: '203-4.1',
    difficulty: 'intermediate',
    topic: 'TN-S vs TN-C-S',
  },
  {
    id: 403,
    question: 'A PME supply feeds a dwelling. Which services must be connected to the main earthing terminal by main protective bonding?',
    options: [
      'Metallic water, gas and oil services on entry',
      'The metallic water service alone where it enters',
      'Every metal pipe inside the building, no exception',
      'The gas service alone, as it carries fuel',
    ],
    correctAnswer: 0,
    explanation: 'Main bonding connects the metallic services that enter the building and could introduce a potential, taken as near as practicable to their point of entry. Option C is the overcautious error: internal pipework fed from a bonded service is not extraneous and does not need its own main bonding conductor.',
    section: '203-4.4',
    difficulty: 'advanced',
    topic: 'Main bonding sizing',
  },
  {
    id: 404,
    question: 'A metal light switch plate is fitted to a plastic back box on a circuit wired in flat twin and earth. What must the installer provide?',
    options: [
      'A supplementary bonding conductor to the nearest pipe',
      'An insulating pad behind the metal switch plate',
      'An RCD on the lighting circuit feeding that switch',
      'A protective conductor tail to the plate terminal',
    ],
    correctAnswer: 3,
    explanation: 'A plastic box has no earth terminal, so the circuit protective conductor must be taken directly to the earth terminal on the metal plate, which is an exposed-conductive-part. Option B is what gets improvised on site when the cpc is short, and it leaves accessible metalwork with no fault path at all.',
    section: '203-4.3',
    difficulty: 'advanced',
    topic: 'Earthing of exposed parts',
  },
  {
    id: 405,
    question: 'Measured Zs at the furthest socket of a ring final circuit is higher than the tabulated maximum. Which of these would raise it in that way?',
    options: [
      'A poor connection in the protective conductor',
      'An earth electrode at the consumer unit',
      'A Type C device instead of a Type B',
      'A cable of larger cross-sectional area',
    ],
    correctAnswer: 0,
    explanation: 'Zs is the sum of the resistances around the loop, so a high resistance joint anywhere in the cpc pushes the measured figure up. Option C changes the maximum permitted value rather than the measured one, and confusing the two is why circuits get signed off against the wrong limit.',
    section: '203-4.5',
    difficulty: 'advanced',
    topic: 'Earth fault loop path',
  },
  {
    id: 406,
    question: 'A 32 A final circuit on a TN system fails to meet the 0.4 s disconnection time when measured. Which remedy is the most appropriate first step?',
    options: [
      'Add a supplementary bonding conductor at the load',
      'Shorten the run or increase the conductor size',
      'Change the device for one of a higher rated current',
      'Change the device for a Type D of the same rating',
    ],
    correctAnswer: 1,
    explanation: 'Reducing the loop impedance by shortening the run or enlarging the conductor attacks the actual cause. Option D goes the wrong way entirely: a Type D needs a much lower Zs to trip in time, so it would make a marginal circuit fail by a wider margin.',
    section: '203-4.2',
    difficulty: 'advanced',
    topic: 'Disconnection time',
  },
  {
    id: 407,
    question: 'Why does BS 7671 restrict the use of a PME earth terminal for a caravan pitch supply?',
    options: [
      'A PME earth needs a larger earthing conductor',
      'A PME earth cannot give a low enough loop impedance',
      'A broken PEN conductor can make metalwork live',
      'A PME earth cannot be measured with a loop tester',
    ],
    correctAnswer: 2,
    explanation: 'If the distributor\'s PEN conductor opens, the caravan bodywork rises towards line potential while the occupant stands on the ground, so the risk is severe outdoors. Option B is the opposite of the truth: PME normally gives a very low loop impedance, which is exactly why it is used elsewhere.',
    section: '203-4.1',
    difficulty: 'advanced',
    topic: 'Earthing Systems',
  },
  {
    id: 408,
    question: 'A plastic water main enters a house and changes to copper pipework inside. What does that mean for main protective bonding of the water service?',
    options: [
      'It must be bonded because copper is a conductor',
      'It must still be bonded at the point the plastic ends',
      'It is not extraneous, so main bonding is not needed',
      'It must be bonded to the nearest radiator pipework run',
    ],
    correctAnswer: 2,
    explanation: 'A metallic pipe with an insulating section at its point of entry cannot introduce a potential from outside, so it is not an extraneous-conductive-part and BS 7671 does not require it to be bonded. Option B is the habit most electricians fall into, bonding the copper anyway because it is there, when the plastic entry has already broken the path.',
    section: '203-4.4',
    difficulty: 'advanced',
    topic: 'Extraneous conductive parts',
  },
  {
    id: 409,
    question: 'Which item sits between the distributor\'s service cable and the consumer\'s meter?',
    options: [
      'The main earthing terminal indoors',
      'The main protective bonding conductor',
      'The main switch in the consumer unit',
      'The cut-out containing the supply fuse',
    ],
    correctAnswer: 3,
    explanation: 'The service cable lands in the cut-out, which holds the distributor\'s fuse, and the meter tails run from there to the meter. Option C is the next item along, but it sits after the meter and is the consumer\'s equipment, not the distributor\'s.',
    section: '203-5.4',
    difficulty: 'basic',
    topic: 'Domestic intake order',
  },
  {
    id: 410,
    question: 'In a gas-fired power station, what does the turbine drive in order to produce electricity?',
    options: [
      'A rectifier',
      'An alternator',
      'A transformer',
      'A capacitor bank',
    ],
    correctAnswer: 1,
    explanation: 'The turbine turns an alternator, which converts mechanical energy into alternating current. Option C is the item that comes next in the chain: a transformer raises the generated voltage for transmission but generates nothing itself.',
    section: '203-5.1',
    difficulty: 'basic',
    topic: 'Generation methods',
  },
  {
    id: 411,
    question: 'Why does raising the transmission voltage reduce losses in a given overhead line?',
    options: [
      'The power factor improves with voltage',
      'The resistance of the conductor falls with voltage',
      'The frequency of the supply rises with the voltage',
      'The current falls for the same power transmitted',
    ],
    correctAnswer: 3,
    explanation: 'Power is voltage times current, so a higher voltage carries the same power at a lower current, and losses depend on the square of the current. Option B is the popular misconception: conductor resistance is fixed by the material and size and does not change with the applied voltage.',
    section: '203-5.2',
    difficulty: 'intermediate',
    topic: 'Transmission losses',
  },
  {
    id: 412,
    question: 'A local substation supplies a housing estate. Which conversion does its transformer perform?',
    options: [
      '400 kV down to 132 kV for the grid',
      '33 kV down to 275 kV for the supply',
      '230 V up to 11 kV for the estate',
      '11 kV down to 400 V three-phase',
    ],
    correctAnswer: 3,
    explanation: 'The last transformer in the chain steps 11 kV down to 400 V between lines, giving 230 V from each line to neutral. Option A describes a transmission-level substation far upstream and is the level people picture when they hear the word substation.',
    section: '203-5.3',
    difficulty: 'intermediate',
    topic: 'Distribution voltage',
  },
  {
    id: 413,
    question: 'A consumer\'s meter tails are found to be undersized. Who is responsible for putting that right?',
    options: [
      'The consumer, as the tails are theirs',
      'The supplier, who bills the energy',
      'The meter operator, who fits it',
      'The distributor, who owns it',
    ],
    correctAnswer: 0,
    explanation: 'Ownership changes at the outgoing terminals of the meter, so the tails from the meter onward belong to the consumer. Option D is where the confusion sits: the distributor owns the service cable and the cut-out, and the tails between cut-out and meter are handled by the meter operator, but the consumer\'s installation begins after the meter.',
    section: '203-5.4',
    difficulty: 'intermediate',
    topic: 'DNO boundary',
  },
  {
    id: 414,
    question: 'Following the supply from a power station to a domestic socket, at which point does the voltage first drop below 1000 V?',
    options: [
      'At the local distribution substation transformer',
      'At the cut-out fuse inside the consumer\'s meter box',
      'At the grid supply point transformer for the town',
      'At the main switch inside the consumer unit itself',
    ],
    correctAnswer: 0,
    explanation: 'Everything upstream of the final 11 kV to 400 V transformer is at high voltage; that transformer is where low voltage begins. Option B is where many place the change because it is the first item they meet, but the cut-out is already on the low voltage side and changes nothing about the voltage.',
    section: '203-5.4',
    difficulty: 'advanced',
    topic: 'Network end-to-end',
  },
  {
    id: 415,
    question: 'Why is a three-phase four-wire distribution network preferred to three separate single-phase networks?',
    options: [
      'The frequency can be raised on each phase',
      'Fault current is prevented from reaching earth',
      'Less conductor is needed for the same power',
      'Each phase can run at a different voltage',
    ],
    correctAnswer: 2,
    explanation: 'Three balanced phases share one neutral, so far less copper carries the same power, and the load can be spread across the phases. Option B is simply untrue: a three-phase system has the same earth fault paths as any other and relies on the same protective measures.',
    section: '203-5.2',
    difficulty: 'advanced',
    topic: 'Three-phase transmission',
  },
  {
    id: 416,
    question: 'What does the inverter in a domestic solar photovoltaic system do?',
    options: [
      'Measures the energy exported to the network',
      'Converts AC from the home into DC for the array cabling',
      'Stores surplus energy until the evening peak',
      'Converts DC from the array into AC for the home',
    ],
    correctAnswer: 3,
    explanation: 'The array produces DC and the installation runs on AC, so the inverter performs that conversion and synchronises with the supply. Option C is the job of a battery storage system, which is separate equipment even though it is often fitted alongside the inverter.',
    section: '203-6.1',
    difficulty: 'basic',
    topic: 'Solar PV principle',
  },
  {
    id: 417,
    question: 'Which of these is a genuine drawback of a domestic solar photovoltaic array?',
    options: [
      'Output cannot be used in the home',
      'Output damages the consumer unit',
      'Output must be exported in full',
      'Output falls to nothing after dark',
    ],
    correctAnswer: 3,
    explanation: 'PV output depends entirely on daylight, so generation and household demand rarely line up without storage. Option C is the opposite of how a domestic system works: generation is used in the house first and only the surplus is exported.',
    section: '203-6.3',
    difficulty: 'basic',
    topic: 'PV advantages',
  },
  {
    id: 418,
    question: 'A homeowner has a 3.68 kW single-phase photovoltaic inverter rated at 16 A connected to the public supply. What is required of the installer?',
    options: [
      'No notification is needed as the inverter is under 4 kW',
      'Apply to the distributor and wait for its approval first',
      'Notify the energy supplier rather than the distributor',
      'Notify the distributor after commissioning the system',
    ],
    correctAnswer: 3,
    explanation: 'At 16 A per phase or less the connect and notify route applies, so the distributor is informed after the work. Option B is the route for larger systems, where the distributor must assess the network capacity before any connection is made.',
    section: '203-6.2',
    difficulty: 'intermediate',
    topic: 'G98 / G99',
  },
  {
    id: 419,
    question: 'An air source heat pump delivers 3.5 kW of heat for every 1 kW of electrical input. What is that ratio called?',
    options: [
      'The diversity factor applied',
      'The coefficient of performance',
      'The rated efficiency in percent',
      'The power factor of the unit',
    ],
    correctAnswer: 1,
    explanation: 'Coefficient of performance is heat output divided by electrical input, and it exceeds one because the pump moves existing heat rather than creating it. Option C is the trap: quoting it as an efficiency suggests more energy out than in, which is why the industry uses a different term.',
    section: '203-6.1',
    difficulty: 'intermediate',
    topic: 'Heat pumps',
  },
  {
    id: 420,
    question: 'A photovoltaic array is roof mounted and its DC cables run down inside the building to an inverter in the loft. Which risk does BS 7671 target in that DC section?',
    options: [
      'It interferes with the television aerial nearby',
      'It stays live in daylight and cannot be isolated',
      'It carries more current than the inverter AC side',
      'It cannot be tested for insulation resistance',
    ],
    correctAnswer: 1,
    explanation: 'The array is a source that cannot be turned off while the sun is on it, so the DC cabling inside the building is treated as live at all times during daylight. Option D is untrue and is a habit carried over from AC work: PV DC circuits are tested, but with array-specific precautions.',
    section: '203-6.2',
    difficulty: 'advanced',
    topic: 'BS 7671 Section 712',
  },
  {
    id: 421,
    question: 'A customer wants to claim the Smart Export Guarantee for a new photovoltaic installation. What does that require of the installation?',
    options: [
      'Notification to the building control department',
      'A separate export meter fitted by the distributor',
      'Certification of the installer and the products used',
      'An inverter rated at no more than 16 A per phase',
    ],
    correctAnswer: 2,
    explanation: 'Export payment schemes are tied to a recognised certification of both the installing business and the products, which is what gives the supplier confidence in the declared output. Option D confuses the connection route with the payment scheme: inverter rating decides how the distributor is approached, not whether export can be claimed.',
    section: '203-6.2',
    difficulty: 'advanced',
    topic: 'MCS certification',
  },
  {
    id: 422,
    question: 'A 1930s solid wall house with existing high temperature radiators is proposed for an air source heat pump. What is the main technical obstacle?',
    options: [
      'The heat pump cannot be connected to a PME supply here',
      'The emitters are too small for low flow temperatures',
      'The heat pump requires a three-phase supply to operate',
      'The radiators cannot be filled with water at that age',
    ],
    correctAnswer: 1,
    explanation: 'A heat pump works efficiently at a much lower flow temperature than a boiler, so radiators sized for hot water will not release enough heat and usually have to be enlarged. Option C is a common assumption because heat pumps are seen as large loads, but domestic units are routinely single-phase.',
    section: '203-6.3',
    difficulty: 'advanced',
    topic: 'Heat pump trade-offs',
  },
];

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module3QuestionBank.filter((q) => q.section.startsWith(section));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuestionBank[] => {
  return module3QuestionBank.filter((q) => q.difficulty === difficulty);
};

// Helper function to get random questions with weighted distribution
export const getRandomQuestions = (
  count: number,
  weights?: { basic: number; intermediate: number; advanced: number }
): QuestionBank[] => {
  const defaultWeights = { basic: 40, intermediate: 45, advanced: 15 }; // Percentages
  const actualWeights = weights || defaultWeights;

  const basicCount = Math.round((count * actualWeights.basic) / 100);
  const intermediateCount = Math.round((count * actualWeights.intermediate) / 100);
  const advancedCount = count - basicCount - intermediateCount;

  const basicQuestions = getQuestionsByDifficulty('basic');
  const intermediateQuestions = getQuestionsByDifficulty('intermediate');
  const advancedQuestions = getQuestionsByDifficulty('advanced');

  const selectedQuestions: QuestionBank[] = [];

  // Randomly select from each difficulty level
  selectedQuestions.push(...getRandomFromArray(basicQuestions, basicCount));
  selectedQuestions.push(...getRandomFromArray(intermediateQuestions, intermediateCount));
  selectedQuestions.push(...getRandomFromArray(advancedQuestions, advancedCount));

  // Backfill. getRandomFromArray slices with Math.min, so a difficulty band
  // holding fewer questions than its weight demands would otherwise return a
  // paper SHORTER than `count` with no error and no warning. Margins are
  // comfortable today, but raising an advanced weight is all it would take.
  if (selectedQuestions.length < count) {
    const chosen = new Set(selectedQuestions.map((q) => q.id));
    selectedQuestions.push(
      ...getRandomFromArray(
        module3QuestionBank.filter((q) => !chosen.has(q.id)),
        count - selectedQuestions.length
      )
    );
  }

  // Shuffle the final array
  return shuffleArray(selectedQuestions);
};

// Helper function to randomly select items from array
function getRandomFromArray<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
