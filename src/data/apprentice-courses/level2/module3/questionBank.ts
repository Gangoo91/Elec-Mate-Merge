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
    options: ['Single core cables', 'Twin and earth cable', 'SWA cable', 'Flexible cord'],
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
      'Polyvinyl Chloride',
      'Protected Vinyl Covering',
      'Polymer Vinyl Compound',
    ],
    correctAnswer: 1,
    explanation:
      'PVC stands for Polyvinyl Chloride, which is a thermoplastic polymer commonly used as insulation and sheathing material for electrical cables.',
    section: '3.1.2',
    difficulty: 'basic',
    topic: 'Cable Materials',
  },
  {
    id: 3,
    question: 'In a twin and earth cable, what is the bare conductor used for?',
    options: ['Neutral', 'Line', 'Earth (CPC)', 'Switch wire'],
    correctAnswer: 2,
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
      'Lower cost',
      'Easier installation',
      'Better protection and flexibility for changes',
      'Higher current carrying capacity',
    ],
    correctAnswer: 2,
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
      'Steel Wire Armoured',
      'Single Wire Armoured',
      'Stranded Wire Assembly',
      'Steel Wound Armour',
    ],
    correctAnswer: 0,
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
      'Internal domestic wiring',
      'Underground installations and areas requiring mechanical protection',
      'Temporary installations',
      'Low voltage circuits only',
    ],
    correctAnswer: 1,
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
      'Fixed installation wiring',
      'Underground cables',
      'Connecting portable appliances',
      'High voltage applications',
    ],
    correctAnswer: 2,
    explanation:
      'Flexible cord is designed for connecting portable appliances and equipment that requires movement, with conductors that can withstand repeated flexing.',
    section: '3.1.5',
    difficulty: 'basic',
    topic: 'Flexible Cord',
  },
  {
    id: 8,
    question: 'Which type of cable would be most suitable for a computer network installation?',
    options: ['Twin and earth', 'SWA cable', 'Cat 6 data cable', 'Flexible cord'],
    correctAnswer: 2,
    explanation:
      'Cat 6 data cable is specifically designed for computer networks and data transmission, providing the required performance for network communications.',
    section: '3.1.6',
    difficulty: 'basic',
    topic: 'Data Cable',
  },
  {
    id: 9,
    question: 'What voltage category does ELV (Extra Low Voltage) refer to?',
    options: ['Up to 50V AC or 120V DC', 'Up to 230V AC', 'Up to 400V AC', 'Above 1000V AC'],
    correctAnswer: 0,
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
    options: ['Cost', 'UV resistance and temperature rating', 'Colour', 'Length availability'],
    correctAnswer: 1,
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
      'To reduce installation costs',
      'To provide mechanical protection and support for cables',
      'To improve cable appearance',
      'To increase current carrying capacity',
    ],
    correctAnswer: 1,
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
      'Material type',
      'Cost',
      'Visibility and wall cavity requirements',
      'Current capacity',
    ],
    correctAnswer: 2,
    explanation:
      'Surface conduit is visible and mounted on wall surfaces, whilst recessed conduit is hidden within wall cavities requiring chasing or building in during construction.',
    section: '3.2.2',
    difficulty: 'basic',
    topic: 'Conduit Installation Methods',
  },
  {
    id: 13,
    question: 'Which type of conduit would be most suitable for a damp environment?',
    options: ['PVC conduit', 'Galvanised steel conduit', 'Aluminium conduit', 'Flexible conduit'],
    correctAnswer: 0,
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
      'Lower cost',
      'Better appearance',
      'Larger cable capacity and easier access',
      'Higher protection rating',
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
      'Domestic installations',
      'Industrial and commercial applications with multiple cables',
      'Outdoor installations only',
      'Low voltage circuits only',
    ],
    correctAnswer: 1,
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
      'Material',
      'Support structure - tray has solid/perforated base, ladder has rungs',
      'Installation method',
      'Current capacity',
    ],
    correctAnswer: 1,
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
      'High voltage cables',
      'Power and data cables in office environments',
      'Outdoor installations',
      'Emergency lighting circuits',
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
      'Self-tapping screws',
      'Expansion bolts or chemical anchors',
      'Adhesive',
      'Cable ties',
    ],
    correctAnswer: 1,
    explanation:
      'Expansion bolts or chemical anchors provide the necessary strength and reliability for securing heavy cable tray installations to concrete structures.',
    section: '3.2.6',
    difficulty: 'intermediate',
    topic: 'Fixing Methods',
  },
  {
    id: 19,
    question:
      'What is the maximum spacing typically recommended for supporting horizontal cable tray?',
    options: ['1 metre', '1.5 metres', '2 metres', '3 metres'],
    correctAnswer: 1,
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
      'Cable colour',
      'Expansion joints and flexible connections',
      'Installation speed',
      'Cost',
    ],
    correctAnswer: 1,
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
    options: ['Side cutters', 'Wire strippers', 'Pliers', 'Knife'],
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
      'Speed of operation',
      'PAT testing and electrical safety',
      'Brand preference',
      'Cost',
    ],
    correctAnswer: 1,
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
      'Multimeter',
      'Voltage indicator/tester',
      'Insulation resistance tester',
      'Earth fault loop impedance tester',
    ],
    correctAnswer: 1,
    explanation:
      'A voltage indicator or voltage tester is used to verify that a circuit is dead (no voltage present) before beginning work, following safe isolation procedures.',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'Test Equipment',
  },
  {
    id: 24,
    question: 'How often should hand tools be visually inspected?',
    options: ['Weekly', 'Monthly', 'Before each use', 'Annually'],
    correctAnswer: 2,
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
    options: ['Weekly', '3 months', '6 months', '12 months'],
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
      'Loose in a tool bag',
      'In protective cases',
      'On open shelves',
      'In damp conditions',
    ],
    correctAnswer: 1,
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
      'Hard hat only',
      'Safety glasses and dust mask',
      'High visibility vest',
      'Safety boots only',
    ],
    correctAnswer: 1,
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
      'Any screwdriver',
      'Insulated screwdrivers',
      'Metal handled screwdrivers',
      'Magnetic screwdrivers',
    ],
    correctAnswer: 1,
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
      'Continue working but work faster',
      'Stop immediately and inspect the tool',
      'Reduce the pressure',
      'Ignore it',
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
      'Speed of transport',
      'Secure storage to prevent damage and theft',
      'Cost of transport',
      'Weight distribution',
    ],
    correctAnswer: 1,
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
      'Cost',
      'Visibility - surface wiring is visible, concealed is hidden',
      'Current capacity',
      'Safety',
    ],
    correctAnswer: 1,
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
      'After plastering',
      'Before plastering, during construction phase',
      'After decoration',
      'During commissioning',
    ],
    correctAnswer: 1,
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
      'Installing cables',
      'Installing containment',
      'Fitting accessories, switches, and sockets',
      'Testing circuits',
    ],
    correctAnswer: 2,
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
      'To increase current capacity',
      'To protect conductor ends and provide neat terminations',
      'To reduce cable cost',
      'To change cable colour',
    ],
    correctAnswer: 1,
    explanation:
      'Cable sleeves protect conductor ends from damage and provide neat, professional terminations whilst preventing stray strands from causing short circuits.',
    section: '3.4.3',
    difficulty: 'basic',
    topic: 'Cable Sleeves',
  },
  {
    id: 35,
    question: 'When would you use ferrules on cable terminations?',
    options: [
      'Only on large cables',
      'On stranded conductors to prevent strand separation',
      'Only on single core cables',
      'Never',
    ],
    correctAnswer: 1,
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
      'No support needed',
      'Support at regular intervals to prevent cable weight causing damage',
      'Support only at the top',
      'Support only at the bottom',
    ],
    correctAnswer: 1,
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
      'To join cables together',
      'To provide a sealed entry point for cables into enclosures',
      'To increase cable length',
      'To change cable type',
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
      'Which termination method provides the most reliable connection for high current applications?',
    options: ['Twist and tape', 'Crimped connections', 'Soldered joints', 'Wire nuts'],
    correctAnswer: 1,
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
      'Only the colour',
      'Correct height, level installation, and secure fixing',
      'Only the brand',
      'Installation speed',
    ],
    correctAnswer: 1,
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
      'Screws directly into plasterboard',
      'Plasterboard fixings or back boxes with adjustable lugs',
      'Adhesive only',
      'No fixings needed',
    ],
    correctAnswer: 1,
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
      'No protection',
      'Dust tight and protected against water jets',
      'Basic protection only',
      'Suitable for underwater use',
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
      'AB (Humidity)',
      'AD (Water)',
      'AE (Foreign solid objects)',
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
      'No effect',
      'Improves flexibility',
      'Causes degradation and brittleness',
      'Increases current capacity',
    ],
    correctAnswer: 2,
    explanation:
      'UV radiation causes PVC to degrade over time, becoming brittle and cracking, which is why UV-resistant cables are required for outdoor installations.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'UV Effects',
  },
  {
    id: 44,
    question: 'At what temperature do standard PVC cables typically start to degrade?',
    options: ['Above 50°C', 'Above 70°C', 'Above 90°C', 'Above 120°C'],
    correctAnswer: 1,
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
      'Standard PVC cable',
      'LSOH (Low Smoke Zero Halogen) cable',
      'Paper insulated cable',
      'Rubber cable',
    ],
    correctAnswer: 1,
    explanation:
      'LSOH cables are suitable for corrosive environments as they produce minimal toxic fumes when exposed to chemicals and provide better fire safety.',
    section: '3.5.4',
    difficulty: 'advanced',
    topic: 'Chemical Resistance',
  },
  {
    id: 46,
    question: "What is considered a 'special location' under BS 7671?",
    options: [
      'Any outdoor location',
      'Locations with specific risks requiring additional protection measures',
      'High voltage installations only',
      'Industrial locations only',
    ],
    correctAnswer: 1,
    explanation:
      'Special locations are areas with specific risks (like bathrooms, swimming pools, construction sites) requiring additional protection measures beyond standard installations.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Special Locations',
  },
  {
    id: 47,
    question: 'Which mechanical protection classification indicates resistance to heavy impacts?',
    options: ['IK01', 'IK05', 'IK08', 'IK10'],
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
      'No special considerations',
      'Enhanced corrosion protection and moisture barriers',
      'Higher current ratings only',
      'Different colours only',
    ],
    correctAnswer: 1,
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
      'Wrong colour',
      'Hygiene requirements and chemical cleaning processes',
      'Too expensive',
      'Insufficient current capacity',
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
    options: ['Wind damage', 'Salt corrosion', 'Sand ingress', 'UV exposure'],
    correctAnswer: 1,
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
    options: ['0.5 metres', '1 metre', '1.5 metres', '2 metres'],
    correctAnswer: 1,
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
      'Anywhere in the wall',
      'Only in safe zones - horizontally/vertically from accessories',
      'Only at wall centres',
      'Only at wall edges',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 requires cables in walls to be installed in safe zones - within 150mm horizontally or vertically from accessories, or protected by RCD.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Safe Zones',
  },
  {
    id: 53,
    question: 'What is the minimum depth for cables buried directly in walls?',
    options: ['10mm', '20mm', '50mm', '100mm'],
    correctAnswer: 2,
    explanation:
      'Cables buried directly in walls must be at least 50mm deep to provide adequate protection from nails and screws during future work.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Burial Depth',
  },
  {
    id: 54,
    question: 'What is the purpose of fire stopping in cable installations?',
    options: [
      'To improve appearance',
      'To prevent fire spread through cable penetrations',
      'To reduce installation time',
      'To increase cable capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Fire stopping prevents fire and smoke from spreading through openings where cables pass through fire-rated walls, floors, and ceilings.',
    section: '3.6.3',
    difficulty: 'basic',
    topic: 'Fire Stopping',
  },
  {
    id: 55,
    question: 'Which material is commonly used for fire stopping cable penetrations?',
    options: ['Standard foam', 'Intumescent material', 'Plastic filler', 'Concrete'],
    correctAnswer: 1,
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
      'Nothing special required',
      'Grommets or bushes to protect against sharp edges',
      'Tape only',
      'Cable ties',
    ],
    correctAnswer: 1,
    explanation:
      'Grommets or bushes must be used to protect cable insulation from damage by sharp edges when entering metal enclosures.',
    section: '3.6.4',
    difficulty: 'basic',
    topic: 'Edge Protection',
  },
  {
    id: 57,
    question: 'According to BS 7671, what colour should the earth conductor be?',
    options: ['Red', 'Black', 'Green and Yellow', 'Blue'],
    correctAnswer: 2,
    explanation:
      'The protective conductor (earth) must be identified by green and yellow stripes according to BS 7671 colour coding requirements.',
    section: '3.6.5',
    difficulty: 'basic',
    topic: 'Colour Coding',
  },
  {
    id: 58,
    question: 'What colour is used for the neutral conductor in single-phase installations?',
    options: ['Red', 'Blue', 'Brown', 'Green and Yellow'],
    correctAnswer: 1,
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
      'Legal requirement only',
      'Ensures warranty validity and safe installation',
      'Reduces cost',
      'Speeds up installation',
    ],
    correctAnswer: 1,
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
      'Follow site specifications',
      "Follow manufacturer's instructions",
      'Choose the easier option',
      'Seek clarification and approval for any deviations',
    ],
    correctAnswer: 3,
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
    options: ['PVC', 'XLPE', 'Thermoplastic elastomer', 'Paper'],
    correctAnswer: 2,
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
      'The steel wire armour',
      'A separate earth core',
      'The lead sheath',
      'The outer PVC sheath',
    ],
    correctAnswer: 0,
    explanation:
      'In SWA cables, the steel wire armour acts as the circuit protective conductor (earth) providing the path to earth for fault protection.',
    section: '3.1.4',
    difficulty: 'intermediate',
    topic: 'SWA Earth Continuity',
  },
  {
    id: 63,
    question: 'Which cable type would be most appropriate for a fire alarm system?',
    options: ['Standard PVC cable', 'Fire resistant cable', 'SWA cable', 'Flexible cord'],
    correctAnswer: 1,
    explanation:
      'Fire resistant cables maintain circuit integrity during fire conditions, essential for fire alarm systems that must continue operating during emergencies.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Fire Resistant Cables',
  },
  {
    id: 64,
    question:
      'What is the typical current rating for 2.5mm² twin and earth cable when clipped direct?',
    options: ['16A', '20A', '25A', '32A'],
    correctAnswer: 1,
    explanation:
      '2.5mm² twin and earth cable typically has a current rating of 20A when installed using method C (clipped direct) under standard conditions.',
    section: '3.1.2',
    difficulty: 'intermediate',
    topic: 'Cable Current Ratings',
  },
  {
    id: 65,
    question: 'Which factor does NOT affect cable current carrying capacity?',
    options: [
      'Installation method',
      'Ambient temperature',
      'Cable colour',
      'Grouping with other cables',
    ],
    correctAnswer: 2,
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
      '2.5 times the conduit diameter',
      '3.5 times the conduit diameter',
      '4.5 times the conduit diameter',
      '6 times the conduit diameter',
    ],
    correctAnswer: 0,
    explanation:
      'Steel conduit should be bent with a minimum internal radius of 2.5 times the conduit diameter to prevent damage and maintain cable pulling capability.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Bending',
  },
  {
    id: 67,
    question: 'Which type of cable basket provides the best cable support?',
    options: ['Wire mesh basket', 'Perforated basket', 'Solid basket', 'Ladder type'],
    correctAnswer: 0,
    explanation:
      'Wire mesh baskets provide the best cable support whilst maintaining good ventilation and allowing easy cable access for modifications.',
    section: '3.2.4',
    difficulty: 'intermediate',
    topic: 'Cable Basket Types',
  },
  {
    id: 68,
    question: 'What is the maximum recommended fill ratio for conduit?',
    options: ['25%', '35%', '45%', '55%'],
    correctAnswer: 2,
    explanation:
      'The maximum recommended fill ratio for conduit is 45% of the internal cross-sectional area to allow for cable installation and heat dissipation.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Fill',
  },
  {
    id: 69,
    question: 'Which joining method is most appropriate for PVC trunking?',
    options: ['Welding', 'Mechanical fixings with gaskets', 'Adhesive bonding', 'Tape'],
    correctAnswer: 1,
    explanation:
      'PVC trunking joints use mechanical fixings with gaskets to provide secure, weatherproof connections that can be dismantled if necessary.',
    section: '3.2.3',
    difficulty: 'basic',
    topic: 'Trunking Joints',
  },
  {
    id: 70,
    question: 'What is dado trunking primarily used for?',
    options: [
      'High voltage distribution',
      'Low-level power and data distribution in offices',
      'Outdoor installations',
      'Industrial machinery',
    ],
    correctAnswer: 1,
    explanation:
      'Dado trunking is installed at skirting board level for distributing power and data services in office environments, providing accessible outlets.',
    section: '3.2.5',
    difficulty: 'basic',
    topic: 'Dado Trunking',
  },
  {
    id: 71,
    question: 'Which crimping tool feature is most important for reliable connections?',
    options: [
      'Adjustable pressure',
      'Ratchet mechanism ensuring complete crimp',
      'Plastic handles',
      'Bright colours',
    ],
    correctAnswer: 1,
    explanation:
      'A ratchet mechanism ensures the crimp is completed fully and uniformly, preventing incomplete crimps that could lead to connection failures.',
    section: '3.3.1',
    difficulty: 'intermediate',
    topic: 'Crimping Tools',
  },
  {
    id: 72,
    question: 'What class of PAT testing applies to hand-held power tools?',
    options: ['Class 0', 'Class I', 'Class II', 'Class III'],
    correctAnswer: 1,
    explanation:
      'Hand-held power tools are typically Class I appliances requiring earthed connections and more frequent testing due to higher risk usage.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'PAT Testing Classes',
  },
  {
    id: 73,
    question: 'Which multimeter function would you use to check cable continuity?',
    options: ['AC voltage', 'DC voltage', 'Resistance/ohms', 'Current'],
    correctAnswer: 2,
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
      'More powerful',
      'Increased mobility and reduced trip hazards',
      'Lower cost',
      'Longer lifespan',
    ],
    correctAnswer: 1,
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
      'Continue using with care',
      'Repair immediately on site',
      'Remove from service and tag as defective',
      'Use only for light work',
    ],
    correctAnswer: 2,
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
      'Tools used',
      'Installation is new work, maintenance is on existing systems',
      'Cost',
      'Personnel required',
    ],
    correctAnswer: 1,
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
      'Surface clipping',
      'Concealed in walls',
      'In protective conduit or trunking',
      'Suspended on catenary wire',
    ],
    correctAnswer: 2,
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
      'Surface accessories',
      'Back boxes and mounting points',
      'Light fittings',
      'Consumer units',
    ],
    correctAnswer: 1,
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
      'Loose connections',
      'Clean terminals',
      'Proper conductor preparation',
    ],
    correctAnswer: 1,
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
      'To reduce cost',
      'To prevent stress on electrical connections from cable movement',
      'To improve appearance',
      'To increase current capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Strain relief prevents mechanical stress from cable movement being transmitted to electrical connections, reducing the risk of connection failure.',
    section: '3.4.4',
    difficulty: 'basic',
    topic: 'Strain Relief',
  },
  {
    id: 81,
    question: 'Which external influence classification covers impact resistance?',
    options: ['AG (Mechanical stress)', 'AB (Humidity)', 'AD (Water)', 'AA (Ambient temperature)'],
    correctAnswer: 0,
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
      'Water ingress protection',
      'Temperature resistance',
      'Impact resistance',
    ],
    correctAnswer: 1,
    explanation:
      'The second digit in IP ratings (0-8) indicates the level of protection against water ingress, from no protection (0) to submersion (8).',
    section: '3.5.2',
    difficulty: 'basic',
    topic: 'IP Rating System',
  },
  {
    id: 83,
    question: 'At what temperature might cable insulation become permanently damaged?',
    options: [
      'Above the conductor operating temperature',
      "Above the insulation material's thermal limit",
      'Above 50°C',
      'Above 100°C',
    ],
    correctAnswer: 1,
    explanation:
      'Cable insulation becomes permanently damaged when temperatures exceed the thermal limits of the insulation material, which varies by cable type.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Thermal Damage',
  },
  {
    id: 84,
    question: 'Which cable characteristic is most important in underground installations?',
    options: ['Colour', 'Moisture resistance and mechanical protection', 'Cost', 'Flexibility'],
    correctAnswer: 1,
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
      'No special requirements',
      'Enhanced IP ratings and RCD protection',
      'Different colours only',
      'Lower voltage only',
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
    question: 'What is the maximum spacing for cable supports on vertical runs?',
    options: ['1 metre', '1.5 metres', '2 metres', 'No limit'],
    correctAnswer: 0,
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
      'Centre of walls only',
      'Within 150mm of corners, ceilings, floors, and accessories',
      'Anywhere in the wall',
      'Only behind sockets',
    ],
    correctAnswer: 1,
    explanation:
      'Safe zones are areas within 150mm horizontally or vertically from accessories, corners, ceilings, and floors where cables are expected to be located.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Safe Zone Definition',
  },
  {
    id: 88,
    question: 'What protection is required for cables in walls outside safe zones?',
    options: [
      'No protection needed',
      'RCD protection not exceeding 30mA',
      'Higher current rating',
      'Different cable type',
    ],
    correctAnswer: 1,
    explanation:
      'Cables installed outside safe zones in walls must be protected by an RCD with operating current not exceeding 30mA to prevent electric shock.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'RCD Protection',
  },
  {
    id: 89,
    question: 'Why is fire stopping particularly important in multi-storey buildings?',
    options: [
      'Cost reduction',
      'Prevents vertical fire spread between floors',
      'Improves cable capacity',
      'Reduces installation time',
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
      'Installation date only',
      'Circuit designation, cable type, and destination',
      'Installer name only',
      'Cable cost',
    ],
    correctAnswer: 1,
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
    options: ['Standard PVC cable', 'Screened cable', 'Rubber cable', 'Paper insulated cable'],
    correctAnswer: 1,
    explanation:
      'Screened cables have metallic screens that provide protection against electromagnetic interference, essential in environments with sensitive equipment.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'EMI Protection',
  },
  {
    id: 92,
    question: 'What is the typical voltage drop limit for final circuits in BS 7671?',
    options: ['3%', '5%', '7%', '10%'],
    correctAnswer: 1,
    explanation:
      'BS 7671 typically limits voltage drop to 5% of nominal voltage for final circuits to ensure proper equipment operation and efficiency.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Voltage Drop',
  },
  {
    id: 93,
    question:
      'Which installation method has the highest current carrying capacity for the same cable?',
    options: [
      'Enclosed in conduit',
      'Clipped direct to surface',
      'Buried in wall',
      'In thermal insulation',
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
      'To increase current flow',
      'To provide a path for fault current and enable protective device operation',
      'To reduce installation cost',
      'To improve cable appearance',
    ],
    correctAnswer: 1,
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
      'Stranded conductor cable',
      'Armoured cable',
      'Single core cable',
    ],
    correctAnswer: 1,
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
      'Higher cost',
      'Lower conductivity and connection issues',
      'Heavier weight',
      'Poor appearance',
    ],
    correctAnswer: 1,
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
      'Cable colour',
      'Cable weight and tray loading',
      'Installation speed',
      'Ambient lighting',
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
      'To improve appearance',
      'To accommodate thermal expansion and contraction',
      'To reduce cost',
      'To increase current capacity',
    ],
    correctAnswer: 1,
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
      'PVC conduit',
      'Galvanised steel conduit with appropriate certification',
      'Aluminium conduit',
      'Flexible conduit',
    ],
    correctAnswer: 1,
    explanation:
      'Explosive atmospheres require certified equipment - galvanised steel conduit with appropriate ATEX certification ensures safe operation in hazardous areas.',
    section: '3.2.2',
    difficulty: 'advanced',
    topic: 'Hazardous Areas',
  },
  {
    id: 100,
    question: 'What is the minimum bend radius for SWA cable installation?',
    options: [
      '6 times cable diameter',
      '8 times cable diameter',
      '10 times cable diameter',
      '12 times cable diameter',
    ],
    correctAnswer: 2,
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
    options: ['Wood bit', 'Metal bit', 'Masonry bit with tungsten carbide tip', 'Spade bit'],
    correctAnswer: 2,
    explanation:
      'Masonry bits with tungsten carbide tips are designed to drill efficiently through concrete, brick, and stone without overheating or dulling quickly.',
    section: '3.3.2',
    difficulty: 'basic',
    topic: 'Drill Bits',
  },
  {
    id: 102,
    question: 'When using a multimeter to measure AC voltage, which setting should be selected?',
    options: ['DC voltage', 'AC voltage', 'Resistance', 'Current'],
    correctAnswer: 1,
    explanation:
      'The AC voltage setting must be selected when measuring alternating current voltages to ensure accurate readings and prevent damage to the meter.',
    section: '3.3.3',
    difficulty: 'basic',
    topic: 'Multimeter Settings',
  },
  {
    id: 103,
    question: 'What is the recommended frequency for calibrating precision test equipment?',
    options: ['Monthly', 'Every 6 months', 'Annually', 'Every 2 years'],
    correctAnswer: 2,
    explanation:
      'Precision test equipment should typically be calibrated annually to ensure accuracy and compliance with testing standards and regulations.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'Equipment Calibration',
  },
  {
    id: 104,
    question: 'Which type of saw is most appropriate for cutting cable tray?',
    options: ['Wood saw', 'Hacksaw or metal cutting saw', 'Masonry saw', 'Chain saw'],
    correctAnswer: 1,
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
      'Use immediately',
      'Visual inspection and safety check',
      'Paint them different colours',
      'Reduce working speed',
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
      'Lower cost',
      'Enables cable installation through existing conduit runs',
      'Faster installation',
      'Better cable protection',
    ],
    correctAnswer: 1,
    explanation:
      'Fish tapes allow cables to be pulled through existing conduit runs where direct access is not possible, essential for retrofit installations.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Cable Pulling',
  },
  {
    id: 107,
    question: 'Which phase of electrical work typically includes testing and commissioning?',
    options: ['First fix', 'Second fix', 'After second fix completion', 'Before first fix'],
    correctAnswer: 2,
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
      'To change conductor colour',
      'To bind strands together and ensure reliable connection',
      'To increase conductor size',
      'To reduce installation time',
    ],
    correctAnswer: 1,
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
      'Soldered joints',
      'Screwed terminals only',
      'Welded connections',
    ],
    correctAnswer: 2,
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
      'Connect cores only',
      'Connect cores and earth the armour via appropriate gland',
      'Connect armour to cores',
      'Ignore the armour',
    ],
    correctAnswer: 1,
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
    options: ['IP20', 'IP44', 'IP65', 'IP68'],
    correctAnswer: 2,
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
      'Increases capacity',
      'No effect',
      'Reduces capacity due to heat build-up',
      'Only affects voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Grouping cables together reduces their current carrying capacity due to heat build-up from mutual heating effects, requiring derating factors.',
    section: '3.5.3',
    difficulty: 'intermediate',
    topic: 'Cable Grouping',
  },
  {
    id: 113,
    question: 'Which material provides the best corrosion resistance in marine environments?',
    options: ['Mild steel', 'Aluminium', 'Stainless steel', 'Zinc plated steel'],
    correctAnswer: 2,
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
      'No special requirements',
      'Enhanced mechanical protection due to potential vandalism',
      'Lower voltage only',
      'Different colours required',
    ],
    correctAnswer: 1,
    explanation:
      'Schools require enhanced mechanical protection for electrical installations due to potential impact damage and vandalism by users.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'Educational Buildings',
  },
  {
    id: 115,
    question: 'Which external influence code represents ambient temperature in BS 7671?',
    options: ['AA', 'AB', 'AC', 'AD'],
    correctAnswer: 0,
    explanation:
      'AA represents ambient temperature classification in BS 7671 external influences, ranging from AA1 (-60°C to +5°C) to AA8 (+90°C to +125°C).',
    section: '3.5.1',
    difficulty: 'advanced',
    topic: 'Temperature Classification',
  },
  {
    id: 116,
    question: 'What is the maximum recommended distance between supports for 25mm PVC conduit?',
    options: ['0.75m', '1.0m', '1.25m', '1.5m'],
    correctAnswer: 1,
    explanation:
      '25mm PVC conduit should be supported at maximum 1.0-metre intervals to prevent sagging whilst maintaining proper alignment.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Conduit Support Distance',
  },
  {
    id: 117,
    question:
      'According to BS 7671, what is the minimum distance cables should be from hot water pipes?',
    options: ['25mm', '50mm', '100mm', '150mm'],
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
    options: ['Red', 'Blue', 'Brown', 'Black'],
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
    options: ['Standard foam', 'Intumescent sealant', 'Plastic putty', 'Nothing required'],
    correctAnswer: 1,
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
      'Before starting work',
      'During installation',
      'Immediately upon completion of installation',
      'One month after completion',
    ],
    correctAnswer: 2,
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
    options: ['PVC', 'XLPE (Cross-linked polyethylene)', 'Rubber', 'Paper'],
    correctAnswer: 1,
    explanation:
      'XLPE insulation has superior thermal properties compared to PVC, maintaining its properties at higher temperatures making it suitable for high temperature applications.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'High Temperature Insulation',
  },
  {
    id: 122,
    question:
      'Which installation method provides the best protection against electromagnetic interference?',
    options: [
      'Clipped direct',
      'In steel conduit with proper earthing',
      'In PVC trunking',
      'Surface mounted',
    ],
    correctAnswer: 1,
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
      'Lower power output',
      'Battery charging safety and proper storage',
      'Higher cost',
      'Limited runtime',
    ],
    correctAnswer: 1,
    explanation:
      'Battery charging presents fire and explosion risks if not done properly, and batteries require appropriate storage conditions to prevent degradation and hazards.',
    section: '3.3.2',
    difficulty: 'intermediate',
    topic: 'Battery Tool Safety',
  },
  {
    id: 124,
    question: 'Which test would verify that protective bonding is effective?',
    options: ['Insulation resistance test', 'Earth continuity test', 'Polarity test', 'RCD test'],
    correctAnswer: 1,
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
      'Continue using with caution',
      'Repair immediately',
      'Remove from service until repaired and retested',
      'Use only for light duties',
    ],
    correctAnswer: 2,
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
      'Colour preference',
      'Cable size and installation surface',
      'Cost only',
      'Brand preference',
    ],
    correctAnswer: 1,
    explanation:
      'Cable clips must be selected based on cable diameter and the surface material to ensure secure fixing and appropriate support.',
    section: '3.4.5',
    difficulty: 'basic',
    topic: 'Clip Selection',
  },
  {
    id: 127,
    question: 'What is the recommended spacing for cable clips on vertical runs?',
    options: ['250mm', '400mm', '600mm', '1000mm'],
    correctAnswer: 1,
    explanation:
      'Cable clips on vertical runs should be spaced at approximately 400mm intervals to provide adequate support without cable weight causing stress.',
    section: '3.4.5',
    difficulty: 'intermediate',
    topic: 'Vertical Clip Spacing',
  },
  {
    id: 128,
    question: 'Which type of joint should be avoided in electrical installations?',
    options: [
      'Crimped joints',
      'Soldered joints',
      'Twisted and taped joints',
      'Compression joints',
    ],
    correctAnswer: 2,
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
      'To change cable direction',
      'To distribute cable weight over a larger area',
      'To increase current capacity',
      'To improve appearance',
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
      'Never required',
      'For all socket outlets up to 32A in most locations',
      'Only outdoors',
      'Only in bathrooms',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 requires RCD protection for all socket outlets rated up to 32A in most locations to provide additional protection against electric shock.',
    section: '3.4.6',
    difficulty: 'intermediate',
    topic: 'RCD Requirements',
  },

  // Environmental and external influences continued
  {
    id: 131,
    question: 'Which IP first digit indicates complete protection against dust ingress?',
    options: ['IP4X', 'IP5X', 'IP6X', 'IP7X'],
    correctAnswer: 2,
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
      'No effect',
      'Reduces temperature',
      'Significantly increases temperature requiring derating',
      'Only affects colour',
    ],
    correctAnswer: 2,
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
      'Cold environments',
      'Hot, humid tropical environments',
      'Dry environments',
      'Well-ventilated areas',
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
      'Standard installation methods',
      'Enhanced IP ratings, RCD protection, and bonding',
      'Higher voltages only',
      'No special requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Swimming pool areas require enhanced IP ratings, mandatory RCD protection, and extensive equipotential bonding due to high electric shock risk.',
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
      'AD (Presence of water)',
      'AE (Foreign solid objects)',
    ],
    correctAnswer: 2,
    explanation:
      'AD classification covers the presence of water, from AD1 (negligible) through to AD8 (submerged under water pressure).',
    section: '3.5.1',
    difficulty: 'intermediate',
    topic: 'Water Classification',
  },

  // Standards and best practice continued
  {
    id: 136,
    question: 'What is the maximum recommended length for unsupported cable spans?',
    options: ['200mm', '300mm', '400mm', '500mm'],
    correctAnswer: 1,
    explanation:
      'Unsupported cable spans should not exceed 300mm to prevent sagging and stress on cables between support points.',
    section: '3.6.1',
    difficulty: 'intermediate',
    topic: 'Unsupported Spans',
  },
  {
    id: 137,
    question: 'Which area around electrical panels must be kept clear for safety and access?',
    options: ['500mm', '700mm', '1000mm', '1500mm'],
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
      'Cost information only',
      'Test results, circuit details, and any departures from standards',
      'Installation time only',
      'Materials list only',
    ],
    correctAnswer: 1,
    explanation:
      'Installation certificates must include comprehensive test results, detailed circuit information, and documentation of any departures from British Standards.',
    section: '3.6.6',
    difficulty: 'intermediate',
    topic: 'Certificate Requirements',
  },
  {
    id: 139,
    question: 'Which colour identifies L3 in a three-phase installation?',
    options: ['Brown', 'Black', 'Grey', 'Blue'],
    correctAnswer: 2,
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
      'Proceed with installation',
      'Contact manufacturer or supplier for guidance',
      'Use similar product instructions',
      'Install without instructions',
    ],
    correctAnswer: 1,
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
      'Standard flexible cable',
      'Travelling cable with enhanced flexibility',
      'SWA cable',
      'Fixed wiring cable',
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
      'Lower cost',
      'Fire resistance and ability to maintain circuit integrity',
      'Easier installation',
      'Better appearance',
    ],
    correctAnswer: 1,
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
      'Standard steel trunking',
      'Stainless steel with smooth surfaces',
      'PVC conduit',
      'Cable basket',
    ],
    correctAnswer: 1,
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
      'Multimeter',
      'RCD tester',
      'Insulation resistance tester',
      'Earth fault loop tester',
    ],
    correctAnswer: 1,
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
      'Knee pads',
      'Hard hat and safety glasses',
      'Gloves only',
      'High visibility vest only',
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
      'Tighten as much as possible',
      "Tighten to manufacturer's torque specification",
      'Hand tight only',
      'Use thread locking compound only',
    ],
    correctAnswer: 1,
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
      'Buried direct in walls',
      'In accessible trunking with proper labelling',
      'Clipped to surfaces',
      'In sealed conduit',
    ],
    correctAnswer: 1,
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
      'To increase cable strength',
      'To reduce friction during cable installation',
      'To improve insulation properties',
      'To change cable colour',
    ],
    correctAnswer: 1,
    explanation:
      'Cable pulling compound (lubricant) reduces friction between cables and conduit walls, making cable installation easier and preventing damage.',
    section: '3.4.1',
    difficulty: 'basic',
    topic: 'Cable Pulling',
  },
  {
    id: 149,
    question: 'Which zone system applies to bathroom electrical installations?',
    options: [
      'Zone 0, 1, 2 system',
      'Safe zone system',
      'No special zones',
      'Industrial zone system',
    ],
    correctAnswer: 0,
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
      'Installation certificate only',
      'Installation certificate, test results, and circuit schedules',
      'Test results only',
      'No documentation required',
    ],
    correctAnswer: 1,
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
      'Cable colour',
      'Conductor resistance and current',
      'Installation method only',
      'Cable manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop is calculated using conductor resistance, cable length, and current, making conductor resistance and current the most critical parameters.',
    section: '3.1.7',
    difficulty: 'advanced',
    topic: 'Voltage Drop Calculation',
  },
  {
    id: 152,
    question: 'What is the recommended maximum pulling tension for copper conductors?',
    options: ['50N per mm²', '70N per mm²', '100N per mm²', '150N per mm²'],
    correctAnswer: 1,
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
    options: ['TT system', 'TN-S system', 'TN-C-S system', 'IT system'],
    correctAnswer: 2,
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
    options: ['BS 6351', 'BS 7671', 'BS 7909', 'BS 7430'],
    correctAnswer: 1,
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
      'Current capacity',
      'Cost',
      'Reduced toxic gas emission in fire conditions',
      'Installation method',
    ],
    correctAnswer: 2,
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
      'Standard twin and earth',
      'Fire resistant cable (FP200)',
      'Flexible cord',
      'Cat 5 data cable',
    ],
    correctAnswer: 1,
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
      'Domestic lighting circuits',
      'High temperature and fire resistant applications',
      'Data transmission',
      'Temporary installations',
    ],
    correctAnswer: 1,
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
      'Lower cost and weight',
      'Easier installation',
      'Better corrosion resistance',
    ],
    correctAnswer: 1,
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
      'They conduct electricity faster',
      'Thermal expansion and proper termination techniques',
      "They're harder to cut",
      "They're more flexible",
    ],
    correctAnswer: 1,
    explanation:
      'Aluminium has different thermal expansion properties and requires proper termination techniques to prevent loose connections and potential fire hazards.',
    section: '3.1.2',
    difficulty: 'advanced',
    topic: 'Aluminium Conductor Safety',
  },
  {
    id: 161,
    question: 'Which cable marking indicates compliance with harmonised European standards?',
    options: ['BS 6004', 'HAR designation', 'BASEC approval', 'IEC marking'],
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
      'Increase current capacity',
      'Reduce cost',
      'Provide mechanical protection against damage',
      'Improve flexibility',
    ],
    correctAnswer: 2,
    explanation:
      'Cable armouring provides mechanical protection against impact, crushing, and rodent damage, essential for underground and industrial installations.',
    section: '3.1.4',
    difficulty: 'basic',
    topic: 'Cable Armouring',
  },
  {
    id: 163,
    question:
      'When installing overhead cables, what is the minimum height above a public footpath?',
    options: ['2.5 metres', '3.5 metres', '5.2 metres', '6.0 metres'],
    correctAnswer: 2,
    explanation:
      'Overhead cables must be at least 5.2 metres above public footpaths to ensure safe clearance for pedestrians and vehicles.',
    section: '3.1.7',
    difficulty: 'intermediate',
    topic: 'Overhead Installation',
  },
  {
    id: 164,
    question: 'What determines the current-carrying capacity of a cable?',
    options: [
      'Length only',
      'Cross-sectional area of conductor',
      'Colour of insulation',
      'Installation method only',
    ],
    correctAnswer: 1,
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
      'Installation method',
      'Cable length',
      'Grouping with other cables',
    ],
    correctAnswer: 2,
    explanation:
      'Cable length does not affect current-carrying capacity, though it affects voltage drop. Temperature, installation method, and grouping all impact capacity.',
    section: '3.1.10',
    difficulty: 'intermediate',
    topic: 'Current Capacity Factors',
  },
  {
    id: 166,
    question: 'What is the typical temperature rating for standard PVC insulated cables?',
    options: ['60°C', '70°C', '90°C', '110°C'],
    correctAnswer: 1,
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
      'Standard PVC cable',
      'Chemical resistant cable with appropriate sheath',
      'Twin and earth',
      'Standard flexible cord',
    ],
    correctAnswer: 1,
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
      'Insulation breakdown voltage',
      'Maximum operating voltage',
      'Earth fault voltage',
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
      '3% of nominal voltage',
      '5% of nominal voltage',
      '8% of nominal voltage',
      '10% of nominal voltage',
    ],
    correctAnswer: 0,
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
      'Cables bunched together in conduit',
      'Single cable in free air',
      'Cables buried directly in ground',
      'Cables in a small trunking system',
    ],
    correctAnswer: 1,
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
      'No protection needed',
      'Suitable sleeve or grommet',
      'Additional insulation',
      'Metal casing',
    ],
    correctAnswer: 1,
    explanation:
      'Cables passing through walls or floors require protection via suitable sleeves or grommets to prevent damage from sharp edges.',
    section: '3.1.11',
    difficulty: 'basic',
    topic: 'Cable Protection',
  },
  {
    id: 172,
    question: 'At what depth should underground cables typically be buried?',
    options: ['300mm minimum', '450mm minimum', '600mm minimum', '900mm minimum'],
    correctAnswer: 2,
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
      'No warning required',
      'Warning tape or tiles',
      'Concrete slab',
      'Metal detection system',
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
    options: ['Red', 'Black', 'Green and yellow', 'Blue'],
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
    options: ['Black', 'Blue', 'Brown', 'Grey'],
    correctAnswer: 1,
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
      'Motor colour',
      'Starting current and running current',
      'Motor age',
      'Installation height',
    ],
    correctAnswer: 1,
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
      'Visual inspection only',
      'Insulation resistance test',
      'Load test',
      'Vibration test',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance testing must be performed before energising new installations to verify insulation integrity and safety.',
    section: '3.1.13',
    difficulty: 'intermediate',
    topic: 'Cable Testing',
  },
  {
    id: 178,
    question: 'What is the minimum insulation resistance value for most low voltage installations?',
    options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '5 MΩ'],
    correctAnswer: 1,
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
      'After energising',
      'One week after installation',
      'During and immediately after installation',
      'Only if problems occur',
    ],
    correctAnswer: 2,
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
      'Lower cost',
      'Better ventilation and lighter weight',
      'Higher strength',
      'Better appearance',
    ],
    correctAnswer: 1,
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
      'PVC trunking',
      'Galvanised steel tray with weather protection',
      'Standard steel conduit',
      'Flexible conduit',
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
    question: 'What is the recommended minimum bending radius for cable tray?',
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
    options: ['Galvanised steel', 'PVC', 'Aluminium', 'Stainless steel'],
    correctAnswer: 1,
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
      'Cost',
      'Colour',
      'Adequate support and fall protection during installation',
      'Speed of installation',
    ],
    correctAnswer: 2,
    explanation:
      'Overhead installations require adequate structural support and proper fall protection measures during installation to prevent accidents.',
    section: '3.2.9',
    difficulty: 'intermediate',
    topic: 'Overhead Safety',
  },
  {
    id: 185,
    question: 'What is the maximum recommended fill factor for conduit containing cables?',
    options: ['30%', '40%', '45%', '60%'],
    correctAnswer: 2,
    explanation:
      'The maximum fill factor for conduit is typically 45% of the internal cross-sectional area to allow for heat dissipation and cable installation.',
    section: '3.2.2',
    difficulty: 'intermediate',
    topic: 'Conduit Fill',
  },
  {
    id: 186,
    question: 'Which type of tray joint allows for thermal movement?',
    options: ['Bolted joint', 'Welded joint', 'Expansion joint', 'Compression joint'],
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
      'Improved appearance',
      'Protection from falling objects and weather',
      'Increased current capacity',
      'Reduced installation time',
    ],
    correctAnswer: 1,
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
    options: ['Galvanised steel', 'Stainless steel', 'PVC', 'Aluminium'],
    correctAnswer: 2,
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
      'Lower cost',
      'Suitable for hollow walls where back access is unavailable',
      'Higher strength',
      'Faster installation',
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
      'Cable colour',
      'Total weight of cables and containment',
      'Installation speed',
      'Ambient temperature',
    ],
    correctAnswer: 1,
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
      'Improved appearance',
      'Safety - to prevent dangerous potentials',
      'Increased current capacity',
      'Reduced installation time',
    ],
    correctAnswer: 1,
    explanation:
      'Cable tray systems must be earthed to prevent dangerous potentials that could arise from cable faults or induced voltages.',
    section: '3.2.11',
    difficulty: 'intermediate',
    topic: 'Tray Earthing',
  },
  {
    id: 192,
    question: 'Which containment system would be most appropriate for a clean room environment?',
    options: [
      'Galvanised steel tray',
      'Stainless steel containment',
      'PVC trunking',
      'Standard conduit',
    ],
    correctAnswer: 1,
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
      'Daily cleaning',
      'Regular inspection for corrosion and weathering',
      'Monthly repainting',
      'Constant monitoring',
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
      'Threaded coupling',
      'Compression coupling',
      'Snap-fit coupling',
    ],
    correctAnswer: 1,
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
      'Improved appearance',
      'Prevent fire spread through containment openings',
      'Increased strength',
      'Better ventilation',
    ],
    correctAnswer: 1,
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
      'BS 7671 only',
      "BS EN 61537 and manufacturer's instructions",
      'Local building regulations only',
      'IEC standards only',
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61537 provides specific guidance on cable management systems, along with manufacturer's instructions and BS 7671 requirements.",
    section: '3.2.14',
    difficulty: 'intermediate',
    topic: 'Installation Standards',
  },
  {
    id: 197,
    question: 'What spacing is recommended between cable ties on vertical cable runs?',
    options: ['Every 300mm', 'Every 400mm', 'Every 500mm', 'Every 1000mm'],
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
      'Cost',
      'EMI shielding and separation from power cables',
      'Colour',
      'Installation speed',
    ],
    correctAnswer: 1,
    explanation:
      'Data cables require EMI shielding and separation from power cables to prevent interference that could affect signal quality.',
    section: '3.2.16',
    difficulty: 'advanced',
    topic: 'Data Cable Containment',
  },
  {
    id: 199,
    question: 'What is the main disadvantage of using oversized containment systems?',
    options: [
      'Improved cable access',
      'Unnecessary cost and space usage',
      'Better heat dissipation',
      'Easier installation',
    ],
    correctAnswer: 1,
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
      'Multimeter',
      'Insulation resistance tester',
      'Earth fault loop impedance tester',
      'Voltage indicator',
    ],
    correctAnswer: 2,
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
      'Increase battery life',
      'Verify the voltage indicator is working correctly',
      'Measure higher voltages',
      'Improve accuracy',
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
    options: ['Standard pliers', 'Cable gland spanners', 'Adjustable wrench', 'Screwdriver'],
    correctAnswer: 1,
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
      'Extra insulation',
      '110V supply or battery operation',
      'Plastic housing',
      'Longer cable',
    ],
    correctAnswer: 1,
    explanation:
      'Power tools used in wet conditions should operate at 110V via transformer or be battery operated to reduce shock risk from lower voltage.',
    section: '3.3.2',
    difficulty: 'intermediate',
    topic: 'Wet Condition Safety',
  },
  {
    id: 204,
    question:
      'Which measurement range is most appropriate for testing domestic installation insulation resistance?',
    options: ['0-1 MΩ', '0-100 MΩ', '0-1000 MΩ', '0-10 GΩ'],
    correctAnswer: 2,
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
      'Measure voltage',
      'Verify RCD operation time and trip current',
      'Test insulation resistance',
      'Measure power consumption',
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
      'Safety glasses only',
      'Gloves and safety glasses',
      'Hard hat only',
      'High visibility vest only',
    ],
    correctAnswer: 1,
    explanation:
      'Gloves protect hands from cable tension and pulling compounds, whilst safety glasses protect from flying debris or snapping cables.',
    section: '3.3.6',
    difficulty: 'basic',
    topic: 'Cable Pulling Safety',
  },
  {
    id: 207,
    question: 'What is the maximum force that should typically be applied when pulling cables?',
    options: [
      'As much as possible',
      "Based on cable manufacturer's specifications",
      '100N maximum',
      'Until resistance is felt',
    ],
    correctAnswer: 1,
    explanation:
      "Cable pulling force should not exceed manufacturer's specifications to prevent conductor damage or insulation stress.",
    section: '3.3.7',
    difficulty: 'intermediate',
    topic: 'Cable Pulling Limits',
  },
  {
    id: 208,
    question: 'Which tool would be most appropriate for cutting armoured cable?',
    options: [
      'Standard side cutters',
      'Hacksaw or armoured cable cutter',
      'Knife',
      'Standard pliers',
    ],
    correctAnswer: 1,
    explanation:
      'Armoured cables require special cutting tools like hacksaws or armoured cable cutters designed to handle the steel armouring.',
    section: '3.3.1',
    difficulty: 'basic',
    topic: 'Armoured Cable Tools',
  },
  {
    id: 209,
    question: 'What calibration frequency is typically required for electrical test equipment?',
    options: ['Monthly', '6 months', 'Annually', 'Every 5 years'],
    correctAnswer: 2,
    explanation:
      'Electrical test equipment typically requires annual calibration to ensure accuracy and compliance with testing standards.',
    section: '3.3.4',
    difficulty: 'intermediate',
    topic: 'Equipment Calibration',
  },
  {
    id: 210,
    question: 'Which factor is most important when selecting ladder for electrical work?',
    options: ['Height only', 'Non-conductive material (fibreglass)', 'Weight', 'Colour'],
    correctAnswer: 1,
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
      'Measure voltage',
      'Check correct phase sequence in three-phase systems',
      'Test insulation',
      'Measure power factor',
    ],
    correctAnswer: 1,
    explanation:
      'Phase rotation indicators verify the correct phase sequence in three-phase systems, ensuring motors rotate in the correct direction.',
    section: '3.3.3',
    difficulty: 'intermediate',
    topic: 'Phase Testing',
  },
  {
    id: 212,
    question: 'Which test should be performed first when commissioning a new installation?',
    options: ['Insulation resistance', 'Visual inspection', 'RCD testing', 'Load testing'],
    correctAnswer: 1,
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
      'Results only',
      'Results, test conditions, and equipment details',
      'Time only',
      'Location only',
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
      'Check weather conditions',
      'Verify equipment is calibrated and functioning correctly',
      'Notify management',
      'Wear high visibility clothing',
    ],
    correctAnswer: 1,
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
      'Installing containment systems',
      'Installing accessories and making final connections',
      'Testing only',
      'Cable pulling',
    ],
    correctAnswer: 1,
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
    options: ['Zone 0, 1, and 2', 'Zone 1 only', 'Zone 0 and 1 only', 'No special zones'],
    correctAnswer: 0,
    explanation:
      'Bathroom installations have Zone 0 (inside bath), Zone 1 (above bath), and Zone 2 (surrounding area) requiring specific IP ratings and RCD protection.',
    section: '3.4.8',
    difficulty: 'intermediate',
    topic: 'Bathroom Zones',
  },
  {
    id: 217,
    question: 'What minimum depth should cables be installed when chasing into walls?',
    options: ['10mm', '20mm', '25mm minimum from surface', '50mm'],
    correctAnswer: 2,
    explanation:
      'Cables chased into walls should be at least 25mm from the surface to provide adequate protection and prevent damage from fixing screws.',
    section: '3.4.3',
    difficulty: 'intermediate',
    topic: 'Chasing Depth',
  },
  {
    id: 218,
    question: 'Which direction should cables be run when installed in walls?',
    options: [
      'Any direction',
      'Horizontally or vertically only',
      'Diagonally for shortest route',
      'Following existing services',
    ],
    correctAnswer: 1,
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
      'No protection needed',
      'Oval conduit or suitable protection against nails',
      'Metal casing only',
      'Additional insulation',
    ],
    correctAnswer: 1,
    explanation:
      'Cables in timber frames require protection against nails and screws, typically using oval conduit or protective plates.',
    section: '3.4.4',
    difficulty: 'intermediate',
    topic: 'Timber Frame Protection',
  },
  {
    id: 220,
    question: 'Which installation method provides the best protection against mechanical damage?',
    options: [
      'Surface clipping',
      'Installation in steel conduit',
      'Direct burial',
      'Overhead installation',
    ],
    correctAnswer: 1,
    explanation:
      'Steel conduit provides excellent mechanical protection against impact, crushing, and other physical damage.',
    section: '3.4.5',
    difficulty: 'basic',
    topic: 'Mechanical Protection',
  },
  {
    id: 221,
    question:
      'What is the maximum number of 90° bends allowed in a conduit run without an inspection box?',
    options: ['1', '2', '3', '4'],
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
      'Screw terminals',
      'Crimped lugs with appropriate terminals',
      'Wire nuts',
      'Soldered joints',
    ],
    correctAnswer: 1,
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
      'Improved appearance',
      'Separate different voltage levels and prevent interference',
      'Reduced cost',
      'Easier installation',
    ],
    correctAnswer: 1,
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
      'Installation speed',
      'Cable diameter and manufacturer specifications',
      'Ambient temperature only',
      'Installation cost',
    ],
    correctAnswer: 1,
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
      'Twin and earth cable surface mounted',
      '110V distribution system with robust connectors',
      'Standard 230V extension leads',
      'Buried SWA cable',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary construction sites should use 110V distribution systems with robust weatherproof connectors for safety and durability.',
    section: '3.4.12',
    difficulty: 'intermediate',
    topic: 'Temporary Installations',
  },
  {
    id: 227,
    question: 'What documentation must be provided upon completion of an electrical installation?',
    options: [
      'Installation certificate only',
      'Installation certificate and relevant schedules',
      'Test results only',
      'User manual only',
    ],
    correctAnswer: 1,
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
      'IEC 60364',
      'BS 7671 (18th Edition)',
      'IEEE standards',
      'Local building regulations only',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 (currently 18th Edition) is the UK standard for electrical installations, incorporating IEC 60364 with UK-specific requirements.',
    section: '3.4.14',
    difficulty: 'basic',
    topic: 'UK Regulations',
  },
  {
    id: 229,
    question:
      'What is the maximum length typically recommended for a radial circuit supplying 13A socket outlets?',
    options: ['20 metres', '25 metres', '30 metres', '50 metres'],
    correctAnswer: 2,
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
      'Current decreases',
      'Current remains constant',
      'Current becomes zero',
    ],
    correctAnswer: 1,
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
      'Total resistance decreases',
      'Total resistance remains the same',
      'Total resistance becomes infinite',
    ],
    correctAnswer: 1,
    explanation:
      'In parallel circuits, adding more branches provides additional paths for current, resulting in lower total resistance.',
    section: '3.5.2',
    difficulty: 'basic',
    topic: 'Parallel Circuits',
  },
  {
    id: 232,
    question: 'What is the relationship between power, voltage, and current?',
    options: ['P = V + I', 'P = V - I', 'P = V × I', 'P = V ÷ I'],
    correctAnswer: 2,
    explanation:
      'Electrical power equals voltage multiplied by current (P = V × I), representing the rate of energy consumption or conversion.',
    section: '3.5.3',
    difficulty: 'basic',
    topic: 'Power Calculations',
  },
  {
    id: 233,
    question: 'What unit is used to measure electrical resistance?',
    options: ['Volts', 'Amperes', 'Ohms', 'Watts'],
    correctAnswer: 2,
    explanation:
      'Electrical resistance is measured in ohms (Ω), named after Georg Ohm who discovered the relationship between voltage, current, and resistance.',
    section: '3.5.4',
    difficulty: 'basic',
    topic: 'Units of Measurement',
  },
  {
    id: 234,
    question: 'What is the frequency of the UK mains electricity supply?',
    options: ['25 Hz', '50 Hz', '60 Hz', '100 Hz'],
    correctAnswer: 1,
    explanation:
      'The UK mains electricity supply operates at 50 Hz (cycles per second), which is the standard frequency for European electrical systems.',
    section: '3.5.5',
    difficulty: 'basic',
    topic: 'AC Fundamentals',
  },
  {
    id: 235,
    question: 'What is the RMS value of a 230V AC supply approximately equal to in peak voltage?',
    options: ['230V', '325V', '162V', '460V'],
    correctAnswer: 1,
    explanation:
      'The peak voltage of an AC supply is approximately 1.414 times the RMS value, so 230V RMS equals approximately 325V peak.',
    section: '3.5.5',
    difficulty: 'intermediate',
    topic: 'AC Values',
  },
  {
    id: 236,
    question: 'Which material is the best conductor of electricity?',
    options: ['Aluminium', 'Copper', 'Silver', 'Gold'],
    correctAnswer: 2,
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
      'No effect',
      'Resistance decreases with temperature',
      'Resistance increases with temperature',
      'Resistance becomes zero',
    ],
    correctAnswer: 2,
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
      'Static electricity',
      'Moving magnetic field induces voltage in conductor',
      'Heat generation',
      'Chemical reaction',
    ],
    correctAnswer: 1,
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
      'Voltage only',
      'Current flowing through the conductor',
      'Resistance only',
      'Temperature only',
    ],
    correctAnswer: 1,
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
      'Increase current',
      'Reduce voltage',
      'Provide overcurrent protection',
      'Improve efficiency',
    ],
    correctAnswer: 2,
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
      'Same across all components',
      'Divides proportionally to resistance',
      'Doubles across each component',
      'Becomes zero',
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
    options: ['110V', '230V', '400V', '415V'],
    correctAnswer: 1,
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
    options: ['Fuse', 'Circuit breaker', 'Residual Current Device (RCD)', 'Isolator'],
    correctAnswer: 2,
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
      'Connect test equipment',
      'Visual inspection',
      'Measure insulation resistance',
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
      'What voltage is typically used for insulation resistance testing on low voltage installations?',
    options: ['250V DC', '500V DC', '1000V DC', '230V AC'],
    correctAnswer: 1,
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
      'Disconnect or short out',
      'Increase voltage',
      'Test at higher current',
    ],
    correctAnswer: 1,
    explanation:
      'Electronic equipment should be disconnected or shorted out before insulation testing to prevent damage from the test voltage.',
    section: '3.6.2',
    difficulty: 'intermediate',
    topic: 'Electronic Equipment Protection',
  },
  {
    id: 248,
    question: 'What is the maximum operating time for a 30mA RCD protecting socket outlets?',
    options: ['40ms', '300ms', '1 second', '5 seconds'],
    correctAnswer: 1,
    explanation:
      '30mA RCDs protecting socket outlets must operate within 40ms at their rated current to provide adequate protection against electric shock.',
    section: '3.6.3',
    difficulty: 'intermediate',
    topic: 'RCD Testing',
  },
  {
    id: 249,
    question: 'What documentation must be completed after testing an electrical installation?',
    options: [
      'Test results only',
      'Installation certificate with test results and schedules',
      "Manufacturer's certificate",
      'Permit to work',
    ],
    correctAnswer: 1,
    explanation:
      'After testing, an installation certificate must be completed with comprehensive test results and circuit schedules.',
    section: '3.6.4',
    difficulty: 'basic',
    topic: 'Test Documentation',
  },
  {
    id: 250,
    question: 'Who is qualified to issue an Electrical Installation Certificate?',
    options: [
      'Any electrician',
      'Qualified and competent person responsible for the design and installation',
      'Building inspector',
      'Electrical retailer',
    ],
    correctAnswer: 1,
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
      'BS 7671:2018+A4:2026',
      'IET Guidance Note 3',
      'The Electricity at Work Regulations 1989 (EAWR)',
      'The IET On-Site Guide',
    ],
    correctAnswer: 2,
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
      'No duty — the employer carries all responsibility',
      'A duty only to follow written procedures',
      'A duty to take reasonable care for the health and safety of themselves and others affected by their acts or omissions',
      'A duty only to report accidents',
    ],
    correctAnswer: 2,
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
      'The Building Regulations Approved Document P',
      'BS 7671:2018+A4:2026 (IET Wiring Regulations)',
      'EAWR 1989',
      'CDM Regulations 2015',
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
      'On-Site Guide (OSG)',
      'Guidance Note 3 — Inspection & Testing',
      'Guidance Note 1 — Selection & Erection',
      'BS EN 60617',
    ],
    correctAnswer: 1,
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
      'Only a written warning from the HSE',
      'A civil claim only',
      'Criminal prosecution, including fines and imprisonment',
      'Removal from the JIB grading scheme only',
    ],
    correctAnswer: 2,
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
      'Commercial premises only',
      'Industrial premises only',
      'Dwellings (domestic premises)',
      'Hospitals only',
    ],
    correctAnswer: 2,
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
      'No implication — the work can still be self-certified',
      'The work must be notified to local authority Building Control before commencement and a third-party inspection arranged',
      'The work cannot be carried out at all',
      'Only the customer needs to notify the supplier',
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
      'It is the only document that allows certification',
      'It provides simplified, deemed-to-satisfy guidance for common installations consistent with BS 7671',
      'It overrides BS 7671 in all cases',
      'It is published by the HSE',
    ],
    correctAnswer: 1,
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
      'The schematic diagram',
      'The Risk Assessment & Method Statement (RAMS)',
      'The block diagram',
      'The bill of quantities',
    ],
    correctAnswer: 1,
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
      'The block diagram',
      'The schematic diagram',
      'The layout (general arrangement) drawing',
      'The wiring diagram',
    ],
    correctAnswer: 2,
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
      'Layout drawing',
      'Schematic (single-line) diagram',
      'Block diagram',
      'Detail drawing',
    ],
    correctAnswer: 1,
    explanation:
      'A schematic / single-line diagram uses one line per circuit with BS EN 60617 symbols to show electrical relationships. It is the primary diagram type used for distribution boards and switchgear.',
    section: '203-2.2',
    difficulty: 'basic',
    topic: 'Drawing types',
  },
  {
    id: 262,
    question:
      'What is the primary purpose of a BLOCK diagram in an electrical drawing pack?',
    options: [
      'To show every conductor termination',
      'To show the overall system at a high level — major items and their interconnections — without internal detail',
      'To show wall positions of accessories',
      'To replace the schematic in all cases',
    ],
    correctAnswer: 1,
    explanation:
      'A block diagram shows the system at the top level — e.g. supply intake → meter → main switch → distribution boards — using simple labelled rectangles. Detail is then expanded in schematics and wiring diagrams.',
    section: '203-2.2',
    difficulty: 'intermediate',
    topic: 'Block diagrams',
  },
  {
    id: 263,
    question:
      'BS EN 60617 is the standard that defines what for electrical drawings?',
    options: [
      'The cable colour code',
      'Graphical symbols used in electrical and electronic schematic and wiring diagrams',
      'The format of the Electrical Installation Certificate',
      'Cable current-carrying capacity',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60617 specifies the standard graphical symbols (e.g. resistor, switch, socket, fuse, motor, transformer) used across electrical and electronic schematics so that drawings are interpreted consistently.',
    section: '203-2.3',
    difficulty: 'basic',
    topic: 'BS EN 60617',
  },
  {
    id: 264,
    question:
      'Which BS EN 60617 symbol represents a switched socket-outlet on a layout drawing?',
    options: [
      'A circle bisected by a horizontal diameter line',
      'A semi-circle on a horizontal line, with a short stroke through it (denoting the switch)',
      'A square with a cross inside',
      'A triangle with a line through it',
    ],
    correctAnswer: 1,
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
    options: ['1.6 m', '4.0 m', '40 m', '8 m'],
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
    options: ['0.35 m', '3.5 m', '35 m', '350 mm'],
    correctAnswer: 1,
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
    options: ['16 A', '20 A', '32 A', '40 A'],
    correctAnswer: 2,
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
      'It always carries more current',
      'Simpler fault-finding — a single break interrupts only the outlets downstream of the break, and there is only one route to test',
      'It does not need a CPC',
      'It does not need an RCD',
    ],
    correctAnswer: 1,
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
    options: ['20%', '35%', '45%', '60%'],
    correctAnswer: 2,
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
      'Use the straight-run conduit factor unchanged',
      'Use the appropriate factor from the bends table for the run length and number of bends, which gives a smaller permitted fill',
      'Always use 45%',
      'Bends never affect the calculation',
    ],
    correctAnswer: 1,
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
      'TN-S, TN-C-S (PME), TN-C-S (PNB), TT, IT',
      'TN-S, TN-C, TT, IT, PME',
      'TN, TT, IT, PME, PNB',
      'TN-S, TN-C-S, TT, IT, hybrid',
    ],
    correctAnswer: 0,
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
      'A consumer-installed earth electrode at the property',
      'A separate metallic protective conductor (typically the cable sheath) supplied by the DNO from the substation',
      'The combined PEN conductor of the supply',
      'The neutral terminal of the consumer unit',
    ],
    correctAnswer: 1,
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
      'An RCD, a smoke alarm, and a main switch',
      'Earthing of exposed-conductive-parts, protective equipotential bonding, and a protective device that disconnects in the required time',
      'A surge protective device, an AFDD, and a fuse',
      'A ring main, a radial circuit, and a sub-main',
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
    options: ['0.1 s', '0.4 s', '1.0 s', '5.0 s'],
    correctAnswer: 1,
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
      'A copper water service pipe entering the building',
      'The metal casing of a Class I appliance',
      'A structural steel beam in the loft',
      'The plastic enclosure of a consumer unit',
    ],
    correctAnswer: 1,
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
      'To lower the operating current',
      'To create a low-impedance fault path so that the protective device disconnects within the required time during an L–earth fault',
      'To reduce voltage drop',
      'To improve power factor',
    ],
    correctAnswer: 1,
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
      'A copper-clad fridge',
      'A 22 mm copper incoming water service pipe',
      'A PVC waste pipe',
      'A timber stud wall',
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
    options: ['4 mm²', '6 mm²', '10 mm²', '16 mm²'],
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
      'The line conductor from origin to fault',
      'The CPC from the fault back to the MET',
      'The earthing conductor and the supply transformer winding earth path',
      'The consumer\u2019s incoming neutral conductor',
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
    options: ['0.72 Ω', '1.09 Ω', '1.37 Ω', '2.19 Ω'],
    correctAnswer: 2,
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
      'Combined-cycle gas turbine (CCGT)',
      'Nuclear fission',
      'Offshore wind',
      'Domestic Class 2 double-insulated lighting',
    ],
    correctAnswer: 3,
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
      'To reduce the size of household appliances',
      'To minimise I²R (resistive) losses in the transmission conductors for a given amount of power',
      'To allow direct connection of TT systems',
      'To avoid using transformers',
    ],
    correctAnswer: 1,
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
      'Chemical → thermal → electrical',
      'Kinetic (water) → mechanical (turbine/generator) → electrical',
      'Solar → thermal → electrical',
      'Nuclear → thermal → electrical',
    ],
    correctAnswer: 1,
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
      '11 kV, 33 kV, 132 kV',
      '132 kV, 275 kV, 400 kV',
      '400 V, 11 kV, 33 kV',
      '230 V, 400 V, 11 kV',
    ],
    correctAnswer: 1,
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
      'It eliminates the need for transformers',
      'It produces a constant total power transfer, allows smaller conductors per kW transmitted, and enables efficient rotating-field motors',
      'It uses fewer protective devices',
      'It avoids the need for earthing',
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
    options: ['110 V', '230 V', '400 V', '11 kV'],
    correctAnswer: 1,
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
    options: ['230 V', '400 V', '11 kV or 33 kV', '275 kV'],
    correctAnswer: 2,
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
      'The customer',
      'The electricity supplier (e.g. Octopus, British Gas)',
      'The Distribution Network Operator (DNO)',
      'National Grid ESO only',
    ],
    correctAnswer: 2,
    explanation:
      'The DNO owns and maintains the LV network up to and including the cut-out and supply fuse. The supplier owns the meter (or the MOP does on their behalf). Everything past the meter tails is the customer\u2019s installation.',
    section: '203-5.4',
    difficulty: 'intermediate',
    topic: 'DNO boundary',
  },
  {
    id: 289,
    question:
      'Place these in the correct order from generation to consumer:',
    options: [
      'Generator → distribution substation → grid supply point → transmission lines → consumer',
      'Generator → step-up transformer → transmission lines → grid supply point → primary substation → secondary (11 kV/400 V) substation → consumer',
      'Generator → consumer → transformer → grid',
      'Consumer → secondary substation → primary substation → generator',
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
      'Service cable → cut-out (with DNO fuse) → meter → meter tails → main switch in consumer unit',
      'Meter → cut-out → consumer unit → service cable',
      'Service cable → consumer unit → meter → cut-out',
      'Cut-out → consumer unit → meter → service cable',
    ],
    correctAnswer: 0,
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
      'Heat from the sun',
      'Photons (light) striking a semiconductor junction',
      'Wind passing over the panels',
      'Magnetic flux from the earth',
    ],
    correctAnswer: 1,
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
      'Chemical → electrical',
      'Wind kinetic → mechanical (rotor/generator) → electrical (typically AC, then rectified/inverted as required)',
      'Thermal → electrical',
      'Light → electrical',
    ],
    correctAnswer: 1,
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
      'Generation technology that produces electricity for export',
      'Heat-transfer technology that uses electrical energy to move thermal energy from the ground into the building, with a typical CoP of 3–4',
      'Combustion device that burns ground gas',
      'Photovoltaic device',
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
      'They generate additional electricity from sunlight',
      'They store excess generation for use at times of low generation or high tariff, increasing self-consumption',
      'They replace the need for an earth electrode',
      'They eliminate the need for an isolator',
    ],
    correctAnswer: 1,
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
      'No notification needed',
      'Connect-and-notify under Engineering Recommendation G98',
      'Pre-application under Engineering Recommendation G99',
      'Building Control sign-off only',
    ],
    correctAnswer: 1,
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
      'Section 705',
      'Section 712',
      'Section 722',
      'Section 743',
    ],
    correctAnswer: 1,
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
      'JIB graded only',
      'MCS (Microgeneration Certification Scheme)',
      'CHAS only',
      'NICEIC Approved Contractor only',
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
      'Generation is constant 24 hours a day',
      'Zero-carbon, zero-fuel-cost generation during daylight, with very low maintenance and a typical 25-year module performance warranty',
      'Eliminates the need for a consumer unit',
      'Removes the requirement for any DNO notification',
    ],
    correctAnswer: 1,
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
      'They require gas supplies',
      'They are intermittent — output depends on weather and time of day, so storage or grid backup is needed for continuous supply',
      'They cannot be earthed',
      'They are not allowed in the UK',
    ],
    correctAnswer: 1,
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
      'ASHP always costs less to run regardless of building condition',
      'ASHP delivers 3–4 kWh of heat per 1 kWh electrical input (high efficiency) but works best in well-insulated dwellings with low flow temperatures (~45 °C); a poorly insulated house with high-temperature radiators can negate the running-cost advantage',
      'Gas combi boilers are zero-carbon',
      'ASHP cannot be installed in the UK',
    ],
    correctAnswer: 1,
    explanation:
      'A heat pump\u2019s CoP (typically 3–4) gives a strong efficiency advantage, but only when the building fabric and emitter design (oversized radiators or underfloor heating with low flow temperatures) suit low-temperature heat. Without that, running costs can be comparable to or worse than gas.',
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
