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

export const module4QuestionBank: QuestionBank[] = [
  // Section 4.1: Preparing to install wiring systems (35 questions)
  {
    id: 1,
    question: 'What is the first step before starting any electrical installation work?',
    options: [
      'Test the existing circuits',
      'Carry out a risk assessment',
      'Connect the tools',
      'Install the cables',
    ],
    correctAnswer: 1,
    explanation:
      'A risk assessment must be carried out before starting any electrical work to identify potential hazards and implement appropriate control measures.',
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Risk Assessment',
  },
  {
    id: 2,
    question:
      'Which document would provide the most detailed information about cable routes for an installation?',
    options: [
      'The manufacturer\'s data sheet for the consumer unit',
      'The electrical installation certificate',
      'Installation drawings and plans',
      'The site health and safety policy',
    ],
    correctAnswer: 2,
    explanation:
      'Installation drawings and plans provide detailed information about cable routes, equipment locations, and circuit arrangements for the electrical installation.',
    section: '4.1.2',
    difficulty: 'basic',
    topic: 'Installation Drawings',
  },
  {
    id: 3,
    question:
      'Before starting installation work, what should be checked regarding the materials and equipment?',
    options: [
      'Only the colour of the cable insulation supplied',
      'Whether the delivery driver has the correct paperwork',
      'The retail price compared with other suppliers',
      'Quantity, quality, and compliance with specifications',
    ],
    correctAnswer: 3,
    explanation:
      'Materials and equipment should be checked for correct quantity, quality, and compliance with specifications to ensure the installation meets requirements.',
    section: '4.1.3',
    difficulty: 'basic',
    topic: 'Materials Check',
  },
  {
    id: 4,
    question: 'What is the purpose of creating an isolation plan before installation work?',
    options: [
      'To ensure safe working by identifying which circuits need to be isolated',
      'To confirm the correct cable colours have been ordered for the job',
      'To record the resistance of every protective conductor on site',
      'To schedule deliveries so materials arrive in the right sequence',
    ],
    correctAnswer: 0,
    explanation:
      'An isolation plan identifies which circuits need to be safely isolated to prevent electric shock and ensure safe working conditions during installation.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Isolation Planning',
  },
  {
    id: 5,
    question: 'Which regulation governs the requirements for electrical installations in the UK?',
    options: [
      'BS 1363 (13 A plugs and socket-outlets)',
      'BS 7671 (IET Wiring Regulations)',
      'BS EN 60898 (circuit-breakers)',
      'BS 5839 (fire detection and alarm systems)',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 (IET Wiring Regulations) is the UK standard that governs the requirements for electrical installations in buildings.',
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Wiring Regulations',
  },

  // Section 4.2: Measuring, marking, setting out (40 questions)
  {
    id: 6,
    question:
      'What is the most important factor when measuring and marking out positions for electrical accessories?',
    options: [
      'Working as quickly as possible to save labour time',
      'Using the most expensive marking tools available',
      'Accuracy and compliance with regulations',
      'Matching the colour of the marks to the wall finish',
    ],
    correctAnswer: 2,
    explanation:
      'Accuracy in measuring and marking out is crucial to ensure compliance with regulations and proper functioning of the electrical installation.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Measuring Accuracy',
  },
  {
    id: 7,
    question: 'What tool would be most appropriate for ensuring socket outlets are level?',
    options: [
      'Screwdriver',
      'Tape measure',
      'Drill',
      'Spirit level',
    ],
    correctAnswer: 3,
    explanation:
      'A spirit level is the appropriate tool for ensuring socket outlets and other accessories are properly aligned and level during installation.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Leveling Tools',
  },
  {
    id: 8,
    question:
      'What is the typical tolerance allowed when setting out positions for electrical accessories?',
    options: [
      '±5mm',
      '±25mm',
      '±50mm',
      '±2mm',
    ],
    correctAnswer: 0,
    explanation:
      'A tolerance of ±5mm is typically acceptable for setting out positions of electrical accessories to ensure proper fit and professional appearance.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Installation Tolerances',
  },
  {
    id: 9,
    question: 'When setting out concealed cable runs, what must be considered regarding safe zones?',
    options: [
      'Cables may be run diagonally to save on cable length',
      'Cables must run within prescribed safe zones to avoid accidental damage',
      'Cables only need protection where they enter a metal box',
      'Safe zones only apply to cables buried deeper than 50 mm',
    ],
    correctAnswer: 1,
    explanation:
      'Cables and conduit must be installed within prescribed safe zones (typically within 150mm of corners and 150mm above/below accessories) to prevent accidental damage.',
    section: '4.2.4',
    difficulty: 'intermediate',
    topic: 'Safe Zones',
  },
  {
    id: 10,
    question: 'What type of detector should be used to check for existing cables before drilling?',
    options: [
      'Metal detector',
      'Moisture meter',
      'Cable and pipe detector',
      'Voltage tester',
    ],
    correctAnswer: 2,
    explanation:
      'A cable and pipe detector should be used to locate existing cables and pipes in walls before drilling to prevent damage and safety hazards.',
    section: '4.2.5',
    difficulty: 'basic',
    topic: 'Cable Detection',
  },

  // Section 4.3: Bending and forming (35 questions)
  {
    id: 11,
    question:
      'What is the primary reason for following minimum bend radius requirements when bending conduit?',
    options: [
      'To make the conduit run look neater on the wall',
      'To use less conduit material on each run',
      'To allow the conduit to be painted more easily',
      'To prevent damage to cables and maintain proper cable pulling',
    ],
    correctAnswer: 3,
    explanation:
      'Following minimum bend radius prevents damage to cable insulation and ensures cables can be easily pulled through the conduit without excessive stress.',
    section: '4.3.1',
    difficulty: 'basic',
    topic: 'Minimum Bend Radius',
  },
  {
    id: 12,
    question: 'What is the minimum bend radius for 20mm diameter PVC conduit?',
    options: [
      '3 times the diameter',
      '2.5 times the diameter',
      '4 times the diameter',
      '6 times the diameter',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum bend radius for PVC conduit is typically 3 times the external diameter to prevent kinking and maintain cable pulling capability.',
    section: '4.3.2',
    difficulty: 'intermediate',
    topic: 'PVC Conduit Bending',
  },
  {
    id: 13,
    question: 'Which tool is most appropriate for bending 20mm steel conduit?',
    options: [
      'A pipe wrench and vice',
      'Conduit bending machine or former',
      'A hacksaw and round file',
      'An adjustable spanner',
    ],
    correctAnswer: 1,
    explanation:
      'A conduit bending machine or former ensures accurate, consistent bends in steel conduit without damaging the conduit or reducing its internal diameter.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Bending Tools',
  },
  {
    id: 14,
    question: 'What is a common fault that can occur when bending conduit incorrectly?',
    options: [
      'The conduit changes colour at the bend',
      'The conduit becomes electrically live',
      'Kinking or flattening that restricts cable installation',
      'The conduit thread loosens at the coupling',
    ],
    correctAnswer: 2,
    explanation:
      'Incorrect bending can cause kinking or flattening of the conduit, which restricts the internal diameter and prevents proper cable installation.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: 'Bending Faults',
  },
  {
    id: 15,
    question: 'When would you use a bending spring for conduit work?',
    options: [
      'To earth the conduit at each bend',
      'To pull cables through completed conduit',
      'To cut conduit cleanly to length',
      'For small diameter conduit to prevent kinking during manual bending',
    ],
    correctAnswer: 3,
    explanation:
      'Bending springs are used inside small diameter conduit to provide internal support and prevent kinking during manual bending operations.',
    section: '4.3.5',
    difficulty: 'basic',
    topic: 'Bending Springs',
  },

  // Section 4.4: Installing containment & cables (45 questions)
  {
    id: 16,
    question: 'What is the typical maximum spacing for conduit supports on horizontal runs?',
    options: [
      '1m',
      '2m',
      '0.5m',
      '1.5m',
    ],
    correctAnswer: 0,
    explanation:
      'Horizontal conduit runs should typically be supported at maximum 1-metre intervals to prevent sagging and maintain proper alignment.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Support Spacing',
  },
  {
    id: 17,
    question:
      'Which type of fixing would be most appropriate for securing conduit to a brick wall?',
    options: [
      'Magnetic clamps',
      'Plastic plugs and screws',
      'Adhesive tape',
      'Cable ties',
    ],
    correctAnswer: 1,
    explanation:
      'Plastic plugs and screws provide a secure, permanent fixing method for attaching conduit supports to masonry walls like brick.',
    section: '4.4.2',
    difficulty: 'basic',
    topic: 'Fixing Methods',
  },
  {
    id: 18,
    question:
      'When installing different types of cables in the same trunking, what must be considered?',
    options: [
      'All cables must be the same colour',
      'Cables must be installed in alphabetical order',
      'Segregation requirements to prevent interference',
      'Only one cable is allowed per compartment',
    ],
    correctAnswer: 2,
    explanation:
      'Different types of cables (power, data, emergency lighting) must be properly segregated to prevent electromagnetic interference and meet safety requirements.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Cable Segregation',
  },
  {
    id: 19,
    question:
      'What provision should be made in long trunking runs to accommodate thermal expansion?',
    options: [
      'Additional earthing straps at every joint',
      'A larger trunking size throughout the run',
      'Extra cable ties along the full length',
      'Expansion joints or flexible couplings',
    ],
    correctAnswer: 3,
    explanation:
      'Long trunking runs require expansion joints or flexible couplings to accommodate thermal expansion and prevent stress damage to the installation.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Thermal Expansion',
  },
  {
    id: 20,
    question: 'How should joints in trunking be made to maintain IP rating?',
    options: [
      'Use appropriate sealing gaskets or compounds',
      'Leave a small gap to allow air circulation',
      'Wrap the joint in standard PVC insulating tape',
      'Drill weep holes at each joint',
    ],
    correctAnswer: 0,
    explanation:
      'Trunking joints must use appropriate sealing gaskets or compounds to maintain the required IP (Ingress Protection) rating and prevent moisture ingress.',
    section: '4.4.5',
    difficulty: 'intermediate',
    topic: 'Trunking Joints',
  },

  // Section 4.5: Accessories & terminations (35 questions)
  {
    id: 21,
    question: 'What is the correct method for stripping cable insulation?',
    options: [
      'Burn off the insulation with a heat gun',
      'Use proper stripping tools to avoid nicking the conductor',
      'Score deeply all round with a sharp knife',
      'Pull the insulation off with pliers',
    ],
    correctAnswer: 1,
    explanation:
      'Proper stripping tools should be used to remove insulation cleanly without nicking or damaging the conductor, which could cause weak points.',
    section: '4.5.1',
    difficulty: 'basic',
    topic: 'Cable Stripping',
  },
  {
    id: 22,
    question: 'What is the purpose of using ferrules on stranded conductors?',
    options: [
      'To colour-code the conductor for identification',
      'To increase the current rating of the conductor',
      'To prevent strand separation and ensure reliable connections',
      'To provide additional insulation along the cable',
    ],
    correctAnswer: 2,
    explanation:
      'Ferrules prevent strand separation in stranded conductors and ensure reliable, long-term electrical connections in terminals.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Ferrules',
  },
  {
    id: 23,
    question: 'Which termination method is typically used for SWA cable glands?',
    options: [
      'Tape wrapping',
      'Simple clamps',
      'Soldering',
      'Compression glands',
    ],
    correctAnswer: 3,
    explanation:
      'SWA cables typically use compression glands that provide mechanical strain relief, earthing of the armour, and weather sealing.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'SWA Terminations',
  },
  {
    id: 24,
    question: 'What is the importance of correct tightening torque on electrical connections?',
    options: [
      'Ensures proper electrical contact and prevents overheating',
      'Allows the connection to be undone more easily later',
      'Reduces the cost of the terminals used',
      'Makes the connection waterproof',
    ],
    correctAnswer: 0,
    explanation:
      'Correct tightening torque ensures proper electrical contact, prevents loose connections that could cause overheating, and avoids over-tightening damage.',
    section: '4.5.4',
    difficulty: 'intermediate',
    topic: 'Connection Torque',
  },
  {
    id: 25,
    question: 'What does IP65 rating indicate for an electrical enclosure?',
    options: [
      'Limited dust protection and resistance to splashing water',
      'Dust-tight and protected against water jets',
      'Partial dust protection and protection against vertical drips',
      'Dust-tight and protected against temporary immersion',
    ],
    correctAnswer: 1,
    explanation:
      'IP65 indicates the enclosure is dust-tight (IP6X) and protected against water jets from any direction (IPX5), suitable for outdoor use.',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'IP Ratings',
  },

  // Section 4.6: Testing & inspection for installed work (35 questions)
  {
    id: 26,
    question: 'What should be done before any electrical testing?',
    options: [
      'Energise every circuit and measure under normal load',
      'Connect all test instruments in parallel with the supply',
      'Ensure safe isolation and verify circuits are dead',
      'Remove the protective conductors to isolate each circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Safe isolation must be confirmed and circuits verified as dead before conducting any electrical testing to prevent electric shock.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Safe Testing',
  },
  {
    id: 27,
    question: 'What does a continuity test verify?',
    options: [
      'The insulation resistance between live conductors and earth',
      'The earth fault loop impedance at the furthest point',
      'The maximum current the conductor can safely carry',
      'Complete electrical path between two points',
    ],
    correctAnswer: 3,
    explanation:
      'A continuity test verifies there is a complete, low-resistance electrical path between two points, confirming proper connections.',
    section: '4.6.2',
    difficulty: 'basic',
    topic: 'Continuity Testing',
  },
  {
    id: 28,
    question: 'What is the purpose of polarity testing?',
    options: [
      'To ensure line and neutral are correctly connected',
      'To measure the insulation resistance of the circuit',
      'To check the earth fault loop impedance',
      'To confirm the cable current rating is adequate',
    ],
    correctAnswer: 0,
    explanation:
      'Polarity testing ensures line and neutral conductors are correctly connected to prevent reverse polarity, which could cause safety hazards.',
    section: '4.6.3',
    difficulty: 'basic',
    topic: 'Polarity Testing',
  },
  {
    id: 29,
    question: 'What does insulation resistance testing measure?',
    options: [
      'The earth fault loop impedance of the circuit',
      'The resistance between conductors and earth',
      'The continuity of the protective conductor',
      'The prospective fault current at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation resistance testing measures the resistance between conductors and between conductors and earth to verify insulation integrity.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Insulation Resistance',
  },
  {
    id: 30,
    question: 'What is the minimum acceptable insulation resistance value for most installations?',
    options: [
      '0.5 MΩ',
      '5 MΩ',
      '1 MΩ',
      '10 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum acceptable insulation resistance for most installations is 1 MΩ at the test voltage, though higher values are preferred.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Insulation Standards',
  },

  // Section 4.7: Safety & tool use during install (25 questions)
  {
    id: 31,
    question: 'What PPE is essential when drilling overhead?',
    options: [
      'High-visibility vest and steel-toe boots only',
      'A dust mask and gloves only',
      'Hearing protection and a barrier cream',
      'Safety glasses and hard hat',
    ],
    correctAnswer: 3,
    explanation:
      'When drilling overhead, safety glasses protect eyes from falling debris while a hard hat protects the head from impacts.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Drilling PPE',
  },
  {
    id: 32,
    question: 'What safety precaution should be taken when using portable power tools?',
    options: [
      'Ensure tools are PAT tested and use RCD protection',
      'Use any available power supply',
      'Work faster to finish quickly',
      "Don't worry about electrical safety",
    ],
    correctAnswer: 0,
    explanation:
      'Power tools should be PAT tested for electrical safety and protected by RCD devices to prevent electric shock from tool faults.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: 'Power Tool Safety',
  },
  {
    id: 33,
    question:
      'What is the maximum recommended working height for stepladders without additional support?',
    options: [
      '2 metres',
      '3 metres',
      '4 metres',
      '5 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Stepladders should generally not be used for work above 3 metres without additional safety measures, as the risk of serious injury increases.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'Ladder Safety',
  },
  {
    id: 34,
    question: 'What is the correct angle for positioning a ladder against a wall?',
    options: [
      '45 degrees',
      '90 degrees',
      '75 degrees (4:1 ratio)',
      '60 degrees',
    ],
    correctAnswer: 2,
    explanation:
      'A ladder should be positioned at approximately 75 degrees to the horizontal (4:1 ratio - for every 4 units up, 1 unit out from the wall).',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'Ladder Positioning',
  },
  {
    id: 35,
    question: 'What does good housekeeping during installation work involve?',
    options: [
      'Storing all tools in a single locked container',
      'Completing the job as fast as possible',
      'Leaving offcuts in place until the end of the job',
      'Keeping work areas tidy and free from hazards',
    ],
    correctAnswer: 3,
    explanation:
      'Good housekeeping involves keeping work areas tidy, disposing of offcuts properly, and maintaining clear walkways to prevent trips and falls.',
    section: '4.7.4',
    difficulty: 'basic',
    topic: 'Housekeeping',
  },

  // Additional questions to reach 250 total
  {
    id: 36,
    question: 'What should be considered when planning cable routes in a building?',
    options: [
      'Accessibility, protection, and safe zones',
      'Only the shortest possible distance',
      'The preference of the building occupier alone',
      'The colour scheme of the finished rooms',
    ],
    correctAnswer: 0,
    explanation:
      'Cable routes should consider accessibility for maintenance, mechanical protection requirements, and compliance with safe zone regulations.',
    section: '4.1.2',
    difficulty: 'intermediate',
    topic: 'Route Planning',
  },
  {
    id: 37,
    question: 'Why is it important to check the structural adequacy of fixings?',
    options: [
      'To reduce the cost of the supports used',
      'To ensure they can support the load safely',
      'To make the installation easier to dismantle',
      'To improve the appearance of the finished work',
    ],
    correctAnswer: 1,
    explanation:
      'Fixings must be structurally adequate to safely support the weight of cables, containment, and equipment without failure.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Structural Adequacy',
  },
  {
    id: 38,
    question: 'What type of cable support is required for vertical cable runs?',
    options: [
      'No support is needed on vertical runs',
      'A single fixing at the top of the run only',
      'Regular support to prevent cables supporting their own weight',
      'Support only where the cable changes direction',
    ],
    correctAnswer: 2,
    explanation:
      'Vertical cable runs require regular support to prevent cables from supporting their own weight, which could damage insulation or connections.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Vertical Cable Support',
  },
  {
    id: 39,
    question: 'What is the purpose of using appropriate glands when cables enter enclosures?',
    options: [
      'To increase the current rating of the cable',
      'To colour-code the cable at the entry point',
      'To allow the cable to be removed without tools',
      'Provide strain relief and maintain IP rating',
    ],
    correctAnswer: 3,
    explanation:
      'Cable glands provide strain relief to prevent damage to cable connections and maintain the IP rating of the enclosure.',
    section: '4.5.3',
    difficulty: 'basic',
    topic: 'Cable Glands',
  },
  {
    id: 40,
    question:
      'When installing in dusty environments, what should be considered for electrical equipment?',
    options: [
      'Higher IP rating for dust protection',
      'A lower IP rating to allow ventilation',
      'Equipment with no enclosure at all',
      'Equipment rated only for water protection',
    ],
    correctAnswer: 0,
    explanation:
      'Dusty environments require electrical equipment with appropriate IP ratings (IP5X or IP6X) to prevent dust ingress that could cause failures.',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'Environmental Protection',
  },

  {
    id: 41,
    question: 'What tool is used to cut neat holes in metal enclosures?',
    options: [
      'A cold chisel and hammer',
      'Hole saw or knockout punch',
      'An angle grinder with a cutting disc',
      'A wood spade bit',
    ],
    correctAnswer: 1,
    explanation:
      'Hole saws or knockout punches are used to cut neat, precise holes in metal enclosures without leaving sharp edges that could damage cables.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Hole Cutting Tools',
  },
  {
    id: 42,
    question: 'What is the maximum fill factor for cables in conduit?',
    options: [
      '100%',
      '25%',
      '45%',
      '75%',
    ],
    correctAnswer: 2,
    explanation:
      'The maximum fill factor for cables in conduit is typically 45% of the internal cross-sectional area to allow for cable pulling and heat dissipation.',
    section: '4.4.6',
    difficulty: 'intermediate',
    topic: 'Conduit Fill Factor',
  },
  {
    id: 43,
    question: 'When using a multimeter for continuity testing, what should be done first?',
    options: [
      'Set the meter to the highest voltage range',
      'Connect the meter to the supply to charge it',
      'Disconnect the meter leads from the meter body',
      'Prove the meter on a known good circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Before testing, a multimeter should be proved on a known good circuit to verify it is working correctly and will detect faults reliably.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Meter Proving',
  },
  {
    id: 44,
    question: 'What should be done with cable drums during installation?',
    options: [
      'Store on proper supports and protect from damage',
      'Lay them flat directly on wet ground',
      'Stack them on top of one another to save space',
      'Leave them uncovered in direct sunlight',
    ],
    correctAnswer: 0,
    explanation:
      'Cable drums should be stored on proper supports, protected from damage and weather, and handled carefully to prevent cable damage.',
    section: '4.1.3',
    difficulty: 'basic',
    topic: 'Cable Storage',
  },
  {
    id: 45,
    question: 'What is the correct procedure when drilling through walls?',
    options: [
      'Drill quickly from one side using maximum speed',
      'Check for services, drill pilot hole, and drill from both sides to prevent breakout',
      'Drill at an angle to clear any hidden pipes',
      'Use the largest bit first, then reduce the hole size',
    ],
    correctAnswer: 1,
    explanation:
      'When drilling through walls, check for services, drill a pilot hole, and drill from both sides to prevent ugly breakout on the far side.',
    section: '4.2.5',
    difficulty: 'intermediate',
    topic: 'Wall Drilling',
  },

  {
    id: 46,
    question: 'What is the typical maximum depth of a horizontal chase allowed in a solid wall for cable installation?',
    options: [
      'Maximum 1/2 of the wall thickness',
      'Maximum 1/3 of the wall thickness',
      'Maximum 1/6 of the wall thickness',
      'There is no limit on chase depth',
    ],
    correctAnswer: 2,
    explanation:
      'Horizontal chases in solid walls should typically not exceed 1/6 of the wall thickness (vertical chases up to 1/3) to maintain the structural integrity of the wall.',
    section: '4.2.6',
    difficulty: 'advanced',
    topic: 'Wall Chasing Limits',
  },
  {
    id: 47,
    question: 'When installing conduit in concrete, what should be considered?',
    options: [
      'The conduit must be left partly exposed for inspection',
      'Only flexible conduit may be cast into concrete',
      'Conduit in concrete never requires any earthing',
      'Use appropriate protective measures against corrosion',
    ],
    correctAnswer: 3,
    explanation:
      'Conduit in concrete requires protection against corrosion from alkaline conditions, typically using PVC conduit or protective coatings.',
    section: '4.4.7',
    difficulty: 'intermediate',
    topic: 'Concrete Installation',
  },
  {
    id: 48,
    question: 'What is the correct way to terminate multicore cables?',
    options: [
      'Strip cores to different lengths for neat termination',
      'Twist all cores together into a single connection',
      'Strip every core to exactly the same length',
      'Leave the outer sheath in place over the cores',
    ],
    correctAnswer: 0,
    explanation:
      'Multicore cables should have cores stripped to different lengths to allow neat termination and avoid overcrowding in the connection area.',
    section: '4.5.1',
    difficulty: 'intermediate',
    topic: 'Multicore Termination',
  },
  {
    id: 49,
    question: 'What type of test is required to verify earthing conductor connections?',
    options: [
      'Voltage test',
      'Continuity test',
      'Polarity test',
      'Insulation test',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity testing is required to verify that earthing conductors provide a continuous, low-resistance path to the main earthing terminal.',
    section: '4.6.2',
    difficulty: 'basic',
    topic: 'Earth Continuity',
  },
  {
    id: 50,
    question: 'What precaution should be taken when working near overhead power lines?',
    options: [
      'Work only during daylight hours',
      'Wear high-visibility clothing at all times',
      'Maintain safe clearance distances and use goal post barriers',
      'Keep a fire extinguisher on the vehicle',
    ],
    correctAnswer: 2,
    explanation:
      'When working near overhead lines, maintain safe clearance distances and use goal post barriers or similar to prevent accidental contact.',
    section: '4.7.5',
    difficulty: 'advanced',
    topic: 'Overhead Line Safety',
  },

  {
    id: 51,
    question: 'What should be checked before energising a new circuit?',
    options: [
      'That the customer is happy with the appearance',
      'That the heaviest cable has been used throughout',
      'That the circuit has been left de-energised for 24 hours',
      'All testing complete, connections secure, and isolation removed safely',
    ],
    correctAnswer: 3,
    explanation:
      'Before energising, ensure all testing is complete with satisfactory results, connections are secure, and isolation is removed safely.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Circuit Energising',
  },
  {
    id: 52,
    question: 'What is the purpose of cable pulling lubricant?',
    options: [
      'To reduce friction and prevent cable damage during installation',
      'To improve the electrical contact at terminations',
      'To seal the conduit against moisture ingress',
      'To increase the current rating of the cable',
    ],
    correctAnswer: 0,
    explanation:
      'Cable pulling lubricant reduces friction between cables and conduit, preventing insulation damage and making installation easier.',
    section: '4.4.8',
    difficulty: 'basic',
    topic: 'Cable Pulling',
  },
  {
    id: 53,
    question: 'How should cable ties be tensioned to avoid damaging the cable?',
    options: [
      'As tight as the tool will allow',
      'Hand tight plus a quarter turn',
      'Loosely, so the cable can slide freely',
      'Tightened until the insulation deforms',
    ],
    correctAnswer: 1,
    explanation:
      'Cable ties should be applied hand tight plus a quarter turn to secure cables without damaging insulation or restricting thermal expansion.',
    section: '4.4.9',
    difficulty: 'basic',
    topic: 'Cable Tying',
  },

  {
    id: 54,
    question: 'What is the main purpose of a method statement in electrical installation work?',
    options: [
      'To list the cost of materials for the job',
      'To record the test results after completion',
      'To provide a detailed plan of how work will be carried out safely',
      'To confirm the qualifications of the design engineer',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement provides a detailed plan of how work will be carried out safely, including procedures, equipment, and safety measures.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Method Statements',
  },
  {
    id: 55,
    question: 'When should a permit to work be obtained?',
    options: [
      'For every routine task on a domestic property',
      'Only after the work has been completed',
      'Whenever more than one person is on site',
      'For high-risk activities or work in hazardous areas',
    ],
    correctAnswer: 3,
    explanation:
      'A permit to work is required for high-risk activities or work in hazardous areas to ensure proper safety controls are in place.',
    section: '4.1.4',
    difficulty: 'advanced',
    topic: 'Permit to Work',
  },
  {
    id: 56,
    question: 'What information should be included on installation drawings?',
    options: [
      'Cable routes, equipment locations, circuit details, and earthing arrangements',
      'The names of all operatives working on site',
      'The daily weather forecast for the work period',
      'The supplier prices for each item of equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Installation drawings should include comprehensive information about cable routes, equipment locations, circuit details, and earthing arrangements.',
    section: '4.1.2',
    difficulty: 'intermediate',
    topic: 'Drawing Information',
  },
  {
    id: 57,
    question: "What should be done if materials delivered to site don't match the specification?",
    options: [
      'Use them anyway to avoid delaying the job',
      'Report the discrepancy and obtain correct materials',
      'Return them without informing the supervisor',
      'Modify them on site to suit the specification',
    ],
    correctAnswer: 1,
    explanation:
      'Any discrepancy between delivered materials and specification should be reported, and correct materials obtained before proceeding.',
    section: '4.1.3',
    difficulty: 'basic',
    topic: 'Material Compliance',
  },
  {
    id: 58,
    question: 'What is the purpose of a toolbox talk before starting work?',
    options: [
      'To allocate tools to each member of the team',
      'To record the hours worked by each operative',
      'To brief the team on safety hazards and work procedures',
      'To check that all tools have been PAT tested',
    ],
    correctAnswer: 2,
    explanation:
      "A toolbox talk briefs the team on safety hazards, work procedures, and any specific risks associated with the day's activities.",
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Toolbox Talks',
  },
  {
    id: 59,
    question: 'When measuring for socket outlet positions, what reference point should be used?',
    options: [
      'The ceiling',
      'Any convenient point',
      'The nearest wall',
      'Finished floor level',
    ],
    correctAnswer: 3,
    explanation:
      'Socket outlet positions should be measured from finished floor level to ensure consistent heights and compliance with regulations.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Reference Points',
  },
  {
    id: 60,
    question: 'What is the standard height for socket outlets in domestic installations?',
    options: [
      '450mm from finished floor level',
      '150mm from finished floor level',
      '750mm from finished floor level',
      '1200mm from finished floor level',
    ],
    correctAnswer: 0,
    explanation:
      'The standard height for socket outlets in domestic installations is 450mm from finished floor level for accessibility and safety.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Socket Heights',
  },
  {
    id: 61,
    question: 'What tool would be most appropriate for marking out positions on concrete walls?',
    options: [
      'Pencil',
      'Chalk or marker pen',
      'Crayon',
      'Felt tip pen',
    ],
    correctAnswer: 1,
    explanation:
      'Chalk or marker pen is most appropriate for marking concrete walls as it provides good visibility and can be easily removed after installation.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Marking Tools',
  },
  {
    id: 62,
    question: 'When setting out cable tray runs, what must be considered for thermal movement?',
    options: [
      'Fixing every support absolutely rigidly',
      'Using the shortest lengths of tray possible',
      'Expansion joints and flexible supports',
      'Painting the tray a light colour to reflect heat',
    ],
    correctAnswer: 2,
    explanation:
      'Cable tray runs require expansion joints and flexible supports to accommodate thermal movement and prevent stress damage.',
    section: '4.2.4',
    difficulty: 'advanced',
    topic: 'Thermal Movement',
  },
  {
    id: 63,
    question: 'What is the purpose of using a laser level for installation work?',
    options: [
      'To detect live cables hidden behind a wall',
      'To measure the resistance of a circuit',
      'To cut conduit accurately to length',
      'To ensure accurate horizontal and vertical alignment over long distances',
    ],
    correctAnswer: 3,
    explanation:
      'Laser levels ensure accurate horizontal and vertical alignment over long distances, improving installation quality and efficiency.',
    section: '4.2.2',
    difficulty: 'intermediate',
    topic: 'Laser Levels',
  },
  {
    id: 64,
    question:
      'When bending conduit, what should be done to prevent the internal diameter from being reduced?',
    options: [
      'Use proper bending tools and follow minimum bend radius',
      'Bend the conduit as tightly as possible',
      'Heat the conduit until it glows before bending',
      'Make several small bends close together',
    ],
    correctAnswer: 0,
    explanation:
      'Using proper bending tools and following minimum bend radius requirements prevents reduction of internal diameter and maintains cable pulling capability.',
    section: '4.3.1',
    difficulty: 'intermediate',
    topic: 'Bend Quality',
  },
  {
    id: 65,
    question: 'What is the typical minimum bend radius for steel conduit?',
    options: [
      '2.5 times the diameter',
      '3.5 times the diameter',
      '4.5 times the diameter',
      '6 times the diameter',
    ],
    correctAnswer: 1,
    explanation:
      'The typical minimum bend radius for steel conduit is 3.5 times the external diameter to prevent damage and maintain structural integrity.',
    section: '4.3.2',
    difficulty: 'intermediate',
    topic: 'Steel Conduit Bending',
  },
  {
    id: 66,
    question: 'When would you use a hydraulic bender for conduit work?',
    options: [
      'For small-diameter PVC conduit only',
      'Only when no bending machine is available',
      'For large diameter or heavy-wall conduit',
      'Only for cutting conduit to length',
    ],
    correctAnswer: 2,
    explanation:
      'Hydraulic benders are used for large diameter or heavy-wall conduit where manual bending tools would be insufficient.',
    section: '4.3.3',
    difficulty: 'advanced',
    topic: 'Hydraulic Benders',
  },
  {
    id: 67,
    question: 'What should be done to conduit ends after cutting?',
    options: [
      'Leave the cut edge as it is to save time',
      'Heat the end until it glows to seal it',
      'Flatten the end slightly with a hammer',
      'File or ream to remove sharp edges',
    ],
    correctAnswer: 3,
    explanation:
      'Conduit ends should be filed or reamed after cutting to remove sharp edges that could damage cable insulation during installation.',
    section: '4.3.4',
    difficulty: 'basic',
    topic: 'Conduit Preparation',
  },
  {
    id: 68,
    question: 'What is the purpose of using a former when bending conduit?',
    options: [
      'To achieve consistent, accurate bends without damage',
      'To cut the conduit to the required length',
      'To thread the ends of the conduit',
      'To remove burrs from the cut conduit',
    ],
    correctAnswer: 0,
    explanation:
      'A former ensures consistent, accurate bends are achieved without damaging the conduit or reducing its internal diameter.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Bending Formers',
  },
  {
    id: 69,
    question: 'What is the maximum recommended spacing for cable tray supports?',
    options: [
      '1m',
      '1.5m',
      '2m',
      '3m',
    ],
    correctAnswer: 1,
    explanation:
      'Cable tray supports should typically be spaced at maximum 1.5m intervals to prevent excessive deflection under load.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Tray Support Spacing',
  },
  {
    id: 70,
    question: 'Which type of fixing is most suitable for hollow walls?',
    options: [
      'Plastic plugs and wood screws',
      'Expansion bolts driven into the cavity',
      'Cavity fixings or toggle bolts',
      'Masonry nails fired with a nail gun',
    ],
    correctAnswer: 2,
    explanation:
      'Cavity fixings or toggle bolts are most suitable for hollow walls as they spread the load behind the wall surface.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Hollow Wall Fixings',
  },
  {
    id: 71,
    question: 'What is the purpose of using fire-rated cable trunking?',
    options: [
      'To increase the current rating of the cables',
      'To reduce electromagnetic interference',
      'To allow cables to be installed more quickly',
      'To maintain circuit integrity during a fire',
    ],
    correctAnswer: 3,
    explanation:
      'Fire-rated cable trunking maintains circuit integrity during a fire, ensuring essential services continue to operate for evacuation.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Fire-Rated Systems',
  },
  {
    id: 72,
    question: 'When installing cables in trunking, what should be avoided?',
    options: [
      'Overfilling and creating sharp bends',
      'Fitting the trunking lid after the cables',
      'Labelling each cable at both ends',
      'Leaving a draw string in the trunking',
    ],
    correctAnswer: 0,
    explanation:
      'Overfilling trunking and creating sharp bends should be avoided as this can damage cables and make future maintenance difficult.',
    section: '4.4.6',
    difficulty: 'basic',
    topic: 'Cable Installation',
  },
  {
    id: 73,
    question: 'What is the purpose of using draw wire in conduit installation?',
    options: [
      'To earth the conduit to the structure',
      'To assist with cable pulling during installation',
      'To seal the conduit against moisture',
      'To support the conduit on long runs',
    ],
    correctAnswer: 1,
    explanation:
      'Draw wire is installed in conduit to assist with cable pulling, making it easier to install cables after the conduit system is complete.',
    section: '4.4.8',
    difficulty: 'basic',
    topic: 'Draw Wire',
  },
  {
    id: 74,
    question: 'What should be considered when routing cables near heat sources?',
    options: [
      'Route the cables as close as possible to share warmth',
      'Use a smaller cable size near the heat source',
      'Maintain adequate clearance or use heat-resistant cables',
      'Remove the insulation from cables near heat',
    ],
    correctAnswer: 2,
    explanation:
      'When routing cables near heat sources, maintain adequate clearance or use heat-resistant cables to prevent insulation damage.',
    section: '4.4.4',
    difficulty: 'intermediate',
    topic: 'Heat Considerations',
  },
  {
    id: 75,
    question: 'What is the correct method for connecting cables to terminals?',
    options: [
      'Leave the conductor slightly loose to allow movement',
      'Wrap the conductor in tape before inserting it',
      'Solder the conductor before inserting it into a screw terminal',
      'Ensure clean, tight connections with proper contact area',
    ],
    correctAnswer: 3,
    explanation:
      'Cables should be connected to terminals with clean, tight connections ensuring proper contact area for reliable electrical connection.',
    section: '4.5.1',
    difficulty: 'basic',
    topic: 'Terminal Connections',
  },
  {
    id: 76,
    question: 'When are crimp connectors particularly suitable compared with screw terminals?',
    options: [
      'For stranded conductors or where vibration is present',
      'Only for single-core solid conductors',
      'Where the connection must be undone frequently',
      'Only on circuits operating below 50 V',
    ],
    correctAnswer: 0,
    explanation:
      'Crimp connectors are preferred for stranded conductors or where vibration is present as they provide more reliable connections.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Crimp Connectors',
  },
  {
    id: 77,
    question: 'What tool is used to ensure correct crimping of cable lugs?',
    options: [
      'A pair of pliers',
      'Proper crimping tool with correct dies',
      'A soldering iron',
      'An adjustable spanner',
    ],
    correctAnswer: 1,
    explanation:
      'A proper crimping tool with correct dies ensures reliable crimped connections that meet electrical and mechanical requirements.',
    section: '4.5.2',
    difficulty: 'basic',
    topic: 'Crimping Tools',
  },
  {
    id: 78,
    question: 'What is the purpose of using cable gland plates?',
    options: [
      'To increase the current rating of the enclosure',
      'To support the weight of heavy cables externally',
      'To provide multiple cable entries while maintaining enclosure integrity',
      'To earth every cable that enters the enclosure',
    ],
    correctAnswer: 2,
    explanation:
      "Cable gland plates provide multiple cable entries while maintaining the enclosure's IP rating and structural integrity.",
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Gland Plates',
  },
  {
    id: 79,
    question: 'When terminating armoured cables, what must be done with the armour?',
    options: [
      'Cut it flush and leave it unconnected',
      'Insulate it fully so it carries no current',
      'Fold it back over the outer sheath',
      'Connect it to earth and provide mechanical protection',
    ],
    correctAnswer: 3,
    explanation:
      'Armoured cable armour must be connected to earth for safety and provided with mechanical protection at the termination point.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Armoured Cable Termination',
  },
  {
    id: 80,
    question: 'What does IP54 rating indicate for an electrical enclosure?',
    options: [
      'Limited dust ingress protection and splash water protection',
      'Dust-tight protection and resistance to powerful water jets',
      'Complete dust exclusion and protection against immersion',
      'No dust protection and protection against vertical drips only',
    ],
    correctAnswer: 0,
    explanation:
      'IP54 indicates limited dust ingress protection (IP5X) and protection against splashing water from any direction (IPX4).',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'IP54 Rating',
  },
  {
    id: 81,
    question: 'What is the first step in the testing sequence for a new installation?',
    options: [
      'Polarity test',
      'Visual inspection',
      'Insulation resistance test',
      'Earth fault loop impedance test',
    ],
    correctAnswer: 1,
    explanation:
      'Visual inspection is the first step in testing sequence to identify obvious faults before applying test voltages.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Testing Sequence',
  },
  {
    id: 82,
    question: 'What voltage is typically used for insulation resistance testing?',
    options: [
      '12V DC',
      '230V AC',
      '500V DC',
      '1000V AC',
    ],
    correctAnswer: 2,
    explanation:
      '500V DC is typically used for insulation resistance testing on installations up to 500V to stress test the insulation.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Test Voltages',
  },
  {
    id: 83,
    question: 'What should be disconnected before conducting insulation resistance tests?',
    options: [
      'The main earthing conductor',
      'All circuit protective conductors',
      'The supply neutral at the origin',
      'Electronic equipment and surge protection devices',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic equipment and surge protection devices should be disconnected before insulation resistance testing to prevent damage.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Test Preparation',
  },
  {
    id: 84,
    question: 'What does a low insulation resistance reading indicate?',
    options: [
      'Possible insulation breakdown or moisture ingress',
      'A perfectly healthy circuit with no faults',
      'That the test voltage was set too high',
      'A loose mechanical fixing on the containment',
    ],
    correctAnswer: 0,
    explanation:
      'Low insulation resistance readings indicate possible insulation breakdown, moisture ingress, or contamination requiring investigation.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Test Interpretation',
  },
  {
    id: 85,
    question: 'What is the purpose of earth fault loop impedance testing?',
    options: [
      'To measure the insulation resistance of the cable',
      'To verify protective device operation under fault conditions',
      'To confirm the correct cable colours have been used',
      'To check the mechanical strength of the connections',
    ],
    correctAnswer: 1,
    explanation:
      'Earth fault loop impedance testing verifies that protective devices will operate quickly enough under earth fault conditions.',
    section: '4.6.5',
    difficulty: 'advanced',
    topic: 'Earth Fault Loop Testing',
  },
  {
    id: 86,
    question: 'What PPE should be worn when using angle grinders?',
    options: [
      'A dust mask only',
      'Gloves and a high-visibility vest only',
      'Safety glasses, face shield, gloves, and hearing protection',
      'Steel-toe boots only',
    ],
    correctAnswer: 2,
    explanation:
      'Angle grinders require comprehensive PPE including safety glasses, face shield, gloves, and hearing protection due to multiple hazards.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Angle Grinder Safety',
  },
  {
    id: 87,
    question: 'What is the maximum recommended extension lead length for power tools?',
    options: [
      '10m',
      '100m',
      '50m',
      '25m',
    ],
    correctAnswer: 3,
    explanation:
      'Extension leads for power tools should typically not exceed 25m to prevent voltage drop and maintain tool performance.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Extension Lead Limits',
  },
  {
    id: 88,
    question: 'What should be done before using a ladder?',
    options: [
      'Inspect for damage and ensure stable positioning',
      'Paint the stiles a high-visibility colour',
      'Remove the rubber feet to improve grip',
      'Extend it to its maximum length regardless of the task',
    ],
    correctAnswer: 0,
    explanation:
      'Ladders should be inspected for damage and positioned stably before use to prevent accidents and ensure safe working.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Ladder Inspection',
  },
  {
    id: 89,
    question: 'What is the three-point contact rule for ladder use?',
    options: [
      'Three operatives must be present whenever a ladder is used',
      'Maintain three points of contact (two hands and one foot or two feet and one hand)',
      'A ladder must have at least three securing points',
      'The ladder must be inspected at three-monthly intervals',
    ],
    correctAnswer: 1,
    explanation:
      'The three-point contact rule means maintaining three points of contact with the ladder at all times for stability and safety.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Ladder Safety Rules',
  },
  {
    id: 90,
    question: 'What should be done with waste materials during installation?',
    options: [
      'Burn it on site to reduce the volume',
      'Leave it in walkways until the job is finished',
      'Dispose of properly according to waste regulations',
      'Bury any metal offcuts in the ground',
    ],
    correctAnswer: 2,
    explanation:
      'Waste materials should be disposed of properly according to waste regulations, including separation of different material types.',
    section: '4.7.4',
    difficulty: 'basic',
    topic: 'Waste Disposal',
  },
  {
    id: 91,
    question:
      'What information should be included in a risk assessment for electrical installation work?',
    options: [
      'A full list of the tools to be used on site',
      'The retail cost of all materials required',
      'The names of the client and the supplier',
      'Hazards, risks, control measures, and responsible persons',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should include identification of hazards, assessment of risks, control measures, and designation of responsible persons.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Risk Assessment Content',
  },
  {
    id: 92,
    question: 'When should a risk assessment be reviewed?',
    options: [
      'When conditions change or periodically',
      'Only at the end of the job',
      'Only if an accident occurs',
      "Never, once done it's permanent",
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments should be reviewed when conditions change, periodically, or if new hazards are identified during work.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Risk Assessment Review',
  },
  {
    id: 93,
    question: 'What should be done if installation drawings are unclear or contain errors?',
    options: [
      'Carry on and interpret the drawings as best you can',
      'Seek clarification from the designer or client',
      'Make the corrections yourself on the drawing',
      'Stop the job permanently until new drawings are issued',
    ],
    correctAnswer: 1,
    explanation:
      'If drawings are unclear or contain errors, clarification should be sought from the designer or client before proceeding.',
    section: '4.1.2',
    difficulty: 'basic',
    topic: 'Drawing Clarification',
  },
  {
    id: 94,
    question: 'What is the purpose of keeping a site diary during installation work?',
    options: [
      'To list the personal expenses of each operative',
      'To replace the formal risk assessment',
      'Record progress, issues, and decisions for future reference',
      'To record the supplier prices of materials',
    ],
    correctAnswer: 2,
    explanation:
      'A site diary records progress, issues, decisions, and changes for future reference and potential dispute resolution.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Site Documentation',
  },
  {
    id: 95,
    question: 'What should be considered when planning work sequences?',
    options: [
      'Only the preferences of the most senior operative',
      'The cheapest order regardless of practicality',
      'Completing the most visible work first for appearance',
      'Safety, efficiency, and coordination with other trades',
    ],
    correctAnswer: 3,
    explanation:
      'Work sequences should consider safety requirements, efficiency, and coordination with other trades to avoid conflicts and delays.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Work Planning',
  },
  {
    id: 96,
    question: 'What is the standard height for light switches in domestic installations?',
    options: [
      '1200mm from finished floor level',
      '900mm from finished floor level',
      '1500mm from finished floor level',
      '1800mm from finished floor level',
    ],
    correctAnswer: 0,
    explanation:
      'The standard height for light switches in domestic installations is 1200mm from finished floor level for accessibility.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Switch Heights',
  },
  {
    id: 97,
    question: 'When marking out positions, what should be used as a datum line?',
    options: [
      'The nearest skirting board regardless of its level',
      'A level horizontal or vertical reference line',
      'Any sloping line that follows the wall surface',
      'A line measured down from the ceiling',
    ],
    correctAnswer: 1,
    explanation:
      'A level horizontal or vertical reference line should be used as a datum to ensure all positions are accurately aligned.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Datum Lines',
  },
  {
    id: 98,
    question: 'What tool would be most appropriate for measuring long distances accurately?',
    options: [
      'A folding rule',
      'A spirit level',
      'Steel tape measure or laser measure',
      'A pair of dividers',
    ],
    correctAnswer: 2,
    explanation:
      'Steel tape measures or laser measures provide the most accurate measurements over long distances for installation work.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Measuring Tools',
  },
  {
    id: 99,
    question: 'What should be done before drilling into any surface?',
    options: [
      'Set the drill to its highest speed setting',
      'Mark the position with a permanent marker',
      'Apply lubricant to the drill bit',
      'Check for hidden services and structural elements',
    ],
    correctAnswer: 3,
    explanation:
      'Before drilling, check for hidden services (cables, pipes, gas) and structural elements to prevent damage and safety hazards.',
    section: '4.2.5',
    difficulty: 'basic',
    topic: 'Pre-drilling Checks',
  },
  {
    id: 100,
    question:
      'What is the purpose of using a template when marking out multiple identical positions?',
    options: [
      'To ensure consistency and accuracy across multiple installations',
      'To reduce the number of fixings required',
      'To avoid the need for a spirit level',
      'To increase the height of each accessory',
    ],
    correctAnswer: 0,
    explanation:
      'Templates ensure consistency and accuracy when marking out multiple identical positions, improving quality and efficiency.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Templates',
  },
  {
    id: 101,
    question: 'What happens if conduit is bent with too small a radius?',
    options: [
      'The conduit becomes electrically live',
      'The conduit may kink or collapse, restricting cable installation',
      'The cable current rating increases',
      'The conduit becomes easier to thread',
    ],
    correctAnswer: 1,
    explanation:
      'Bending conduit with too small a radius can cause kinking or collapse, restricting the internal diameter and preventing cable installation.',
    section: '4.3.1',
    difficulty: 'basic',
    topic: 'Bend Radius Effects',
  },
  {
    id: 102,
    question: 'When bending PVC conduit, what might be required in cold weather?',
    options: [
      'Chilling the conduit further to make it bend cleanly',
      'A much larger bend radius than the manufacturer states',
      'Gentle heating to make the material more flexible',
      'Wetting the conduit to lubricate the bend',
    ],
    correctAnswer: 2,
    explanation:
      'In cold weather, PVC conduit may need gentle heating to make it more flexible and prevent cracking during bending.',
    section: '4.3.2',
    difficulty: 'intermediate',
    topic: 'Cold Weather Bending',
  },
  {
    id: 103,
    question: 'What is the advantage of using a bending machine over manual bending?',
    options: [
      'It removes the need to follow minimum bend radius',
      'It allows a smaller conduit size to be used',
      'It earths the conduit automatically at each bend',
      'Provides consistent, accurate bends with less physical effort',
    ],
    correctAnswer: 3,
    explanation:
      'Bending machines provide consistent, accurate bends with less physical effort and better quality results than manual bending.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Machine Bending Advantages',
  },
  {
    id: 104,
    question: 'What should be done to prevent conduit from rotating during bending?',
    options: [
      'Use proper clamping or holding techniques',
      'Heat the conduit before bending it',
      'Apply lubricant to the conduit ends',
      'Bend the conduit as quickly as possible',
    ],
    correctAnswer: 0,
    explanation:
      'Proper clamping or holding techniques prevent conduit rotation during bending, ensuring accurate bend angles and positions.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: 'Bend Control',
  },
  {
    id: 105,
    question: 'When making multiple bends in conduit, what should be considered?',
    options: [
      'Each bend should be made at the same fixed angle',
      'The sequence of bends and cumulative effects on cable pulling',
      'The colour of the conduit at each bend',
      'The cost of the conduit used for each bend',
    ],
    correctAnswer: 1,
    explanation:
      'When making multiple bends, consider the sequence and cumulative effects on cable pulling capability and installation difficulty.',
    section: '4.3.5',
    difficulty: 'advanced',
    topic: 'Multiple Bends',
  },
  {
    id: 106,
    question: 'What is the typical maximum spacing for trunking supports on vertical runs?',
    options: [
      '0.5m',
      '2m',
      '1m',
      '3m',
    ],
    correctAnswer: 2,
    explanation:
      'Vertical trunking runs should typically be supported at maximum 1-metre intervals to prevent sagging and maintain alignment.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Vertical Support Spacing',
  },
  {
    id: 107,
    question: 'Which fixing method provides the strongest connection to masonry?',
    options: [
      'Adhesive pads',
      'Single cable ties',
      'Plastic plugs in plasterboard',
      'Chemical anchors or expansion bolts',
    ],
    correctAnswer: 3,
    explanation:
      'Chemical anchors or expansion bolts provide the strongest connection to masonry for heavy-duty applications.',
    section: '4.4.2',
    difficulty: 'advanced',
    topic: 'Heavy-Duty Fixings',
  },
  {
    id: 108,
    question: 'What is the purpose of using different coloured cables in installations?',
    options: [
      'Identification of different conductors and functions',
      'To increase the current rating of the cable',
      'To improve the flexibility of the cable',
      'To provide additional insulation thickness',
    ],
    correctAnswer: 0,
    explanation:
      'Different coloured cables help identify different circuits and functions, improving safety and maintenance efficiency.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'Cable Identification',
  },
  {
    id: 109,
    question: 'When installing cable tray in corrosive environments, what should be considered?',
    options: [
      'Using the thinnest gauge of tray available',
      'Use appropriate protective coatings or materials',
      'Spacing the supports as far apart as possible',
      'Leaving the tray unpainted to allow inspection',
    ],
    correctAnswer: 1,
    explanation:
      'In corrosive environments, cable tray requires appropriate protective coatings or corrosion-resistant materials for longevity.',
    section: '4.4.7',
    difficulty: 'intermediate',
    topic: 'Corrosion Protection',
  },
  {
    id: 110,
    question: 'What is the purpose of using cable markers or labels?',
    options: [
      'To increase the current rating of the cable',
      'To provide additional mechanical protection',
      'Circuit identification for maintenance and safety',
      'To improve the appearance of the installation only',
    ],
    correctAnswer: 2,
    explanation:
      'Cable markers or labels provide circuit identification essential for maintenance, troubleshooting, and safety during future work.',
    section: '4.4.9',
    difficulty: 'basic',
    topic: 'Cable Labeling',
  },
  {
    id: 111,
    question: 'What is the correct procedure for stripping multicore cables?',
    options: [
      'Strip all cores together in a single cut',
      'Remove the outer sheath only and leave cores covered',
      'Strip the cores first, then the outer sheath',
      'Strip outer sheath first, then individual cores to required lengths',
    ],
    correctAnswer: 3,
    explanation:
      'Strip the outer sheath first to expose individual cores, then strip each core to the required length for neat termination.',
    section: '4.5.1',
    difficulty: 'basic',
    topic: 'Multicore Stripping',
  },
  {
    id: 112,
    question: 'When should heat-shrink tubing be used on connections?',
    options: [
      'For additional insulation and environmental protection',
      'To increase the current rating of the joint',
      'To make the joint easier to undo later',
      'To colour-code the supply phases only',
    ],
    correctAnswer: 0,
    explanation:
      'Heat-shrink tubing provides additional insulation and environmental protection for connections in demanding applications.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Heat-Shrink Protection',
  },
  {
    id: 113,
    question: 'What is the purpose of using cable boots on gland entries?',
    options: [
      'To increase the cable current rating',
      'Additional strain relief and environmental sealing',
      'To allow the gland to be removed without tools',
      'To earth the cable armour to the enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'Cable boots provide additional strain relief and environmental sealing at gland entries, improving reliability and longevity.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Cable Boots',
  },
  {
    id: 114,
    question: 'When terminating flexible cables, what additional consideration is required?',
    options: [
      'The cores must always be soldered first',
      'A larger gland than the cable diameter must be used',
      'Extra strain relief due to cable flexibility',
      'The flexible cable must be earthed at both ends',
    ],
    correctAnswer: 2,
    explanation:
      'Flexible cables require extra strain relief at terminations due to their flexibility and tendency to move under stress.',
    section: '4.5.4',
    difficulty: 'intermediate',
    topic: 'Flexible Cable Termination',
  },
  {
    id: 115,
    question: 'What does IP67 rating indicate for an electrical enclosure?',
    options: [
      'Limited dust protection and protection against splashing water',
      'No dust protection and protection against water jets',
      'Partial dust protection and protection against vertical drips',
      'Dust-tight and protected against temporary immersion',
    ],
    correctAnswer: 3,
    explanation:
      'IP67 indicates the enclosure is dust-tight (IP6X) and protected against temporary immersion in water (IPX7).',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'IP67 Rating',
  },
  {
    id: 116,
    question: 'What should be checked during visual inspection of an installation?',
    options: [
      'Connections, support, protection, and compliance with regulations',
      'Only the appearance of the front plates',
      'The retail value of the installed equipment',
      'The supply voltage at the incoming terminals only',
    ],
    correctAnswer: 0,
    explanation:
      'Visual inspection should check connections, support systems, protection measures, and overall compliance with regulations.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Visual Inspection',
  },
  {
    id: 117,
    question: 'What is the purpose of RCD testing?',
    options: [
      'To measure the insulation resistance of the circuit',
      'To verify RCD operates within specified time limits',
      'To confirm the correct cable size has been used',
      'To check the earth fault loop impedance at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'RCD testing verifies that the device operates within specified time limits to provide effective protection against electric shock.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'RCD Testing',
  },
  {
    id: 118,
    question: 'What test instrument is used for measuring earth fault loop impedance?',
    options: [
      'Multimeter',
      'Insulation tester',
      'Loop impedance tester',
      'Continuity tester',
    ],
    correctAnswer: 2,
    explanation:
      'A loop impedance tester is specifically designed to measure earth fault loop impedance safely and accurately.',
    section: '4.6.5',
    difficulty: 'basic',
    topic: 'Test Instruments',
  },
  {
    id: 119,
    question: 'What should be done if test results are unsatisfactory?',
    options: [
      'Energise the circuit and monitor it in service',
      'Record the result and issue the certificate anyway',
      'Repeat the test until a passing reading is obtained',
      'Investigate, rectify faults, and retest',
    ],
    correctAnswer: 3,
    explanation:
      'Unsatisfactory test results require investigation to identify faults, rectification of problems, and retesting to confirm compliance.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Test Result Actions',
  },
  {
    id: 120,
    question: 'What documentation should accompany completed test results?',
    options: [
      'Installation certificate and schedule of test results',
      'A copy of the site risk assessment only',
      'The supplier delivery notes for the materials',
      'The method statement for the installation only',
    ],
    correctAnswer: 0,
    explanation:
      'Completed installations require an installation certificate and schedule of test results as evidence of compliance.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Test Documentation',
  },
  {
    id: 121,
    question: 'What should be worn when working in confined spaces?',
    options: [
      'Standard overalls and safety boots only',
      'Appropriate PPE including breathing apparatus if required',
      'High-visibility clothing only',
      'No special PPE is required in confined spaces',
    ],
    correctAnswer: 1,
    explanation:
      'Confined space work requires appropriate PPE including breathing apparatus if atmospheric hazards are present.',
    section: '4.7.1',
    difficulty: 'advanced',
    topic: 'Confined Space PPE',
  },
  {
    id: 122,
    question: 'What is the purpose of using 110V tools on construction sites?',
    options: [
      'Increased power output for heavy-duty tasks',
      'Reduced cable size needed for the supply',
      'Reduced risk of fatal electric shock',
      'Elimination of the need for RCD protection',
    ],
    correctAnswer: 2,
    explanation:
      '110V tools reduce the risk of fatal electric shock on construction sites where conditions may be harsh and wet.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: '110V Tool Safety',
  },
  {
    id: 123,
    question: 'What should be done if a ladder shows signs of damage?',
    options: [
      'Continue using it carefully until the job is finished',
      'Repair it with tape and return it to use',
      'Use it only for short tasks at low height',
      'Remove from service and arrange repair or replacement',
    ],
    correctAnswer: 3,
    explanation:
      'Damaged ladders should be removed from service immediately and repaired or replaced to prevent accidents.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Ladder Maintenance',
  },
  {
    id: 124,
    question: 'What is the purpose of using safety harnesses when working at height?',
    options: [
      'To prevent falls or arrest falls safely',
      'To carry tools and materials up to height',
      'To provide a comfortable working position',
      'To identify the operative working at height',
    ],
    correctAnswer: 0,
    explanation:
      'Safety harnesses prevent falls or arrest falls safely when working at height, reducing the risk of serious injury.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Fall Protection',
  },
  {
    id: 125,
    question: 'What should be done with electrical waste materials?',
    options: [
      'Place all waste in general site skips',
      'Separate and dispose of according to WEEE regulations',
      'Burn any plastic components on site',
      'Return all waste to the wholesaler for credit',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical waste materials should be separated and disposed of according to WEEE (Waste Electrical and Electronic Equipment) regulations.',
    section: '4.7.4',
    difficulty: 'intermediate',
    topic: 'WEEE Disposal',
  },
  {
    id: 126,
    question: 'What is the purpose of conducting a pre-start safety briefing?',
    options: [
      'To allocate the day\'s tools to each operative',
      'To record the hours worked by the team',
      'To ensure all team members understand hazards and safety procedures',
      'To confirm the cost of the day\'s materials',
    ],
    correctAnswer: 2,
    explanation:
      "Pre-start safety briefings ensure all team members understand the hazards and safety procedures for the day's work.",
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Safety Briefings',
  },
  {
    id: 127,
    question: 'When should emergency procedures be reviewed on site?',
    options: [
      'Only after an incident has occurred',
      'Only at the end of the project',
      'Never, once they have been agreed',
      'At the start of work and when conditions change',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency procedures should be reviewed at the start of work and whenever site conditions change to ensure effectiveness.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Emergency Procedures',
  },
  {
    id: 128,
    question: 'What should be done if site conditions differ from those shown on drawings?',
    options: [
      'Stop work and seek clarification from the designer',
      'Carry on and adjust the design as you see fit',
      'Ignore the difference if the change is small',
      'Complete the work and note the change afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'If site conditions differ from drawings, work should stop and clarification sought from the designer before proceeding.',
    section: '4.1.2',
    difficulty: 'basic',
    topic: 'Site Variations',
  },
  {
    id: 129,
    question: 'What is the purpose of material delivery schedules?',
    options: [
      'To record the test results for each circuit',
      'To ensure materials arrive when needed and in correct quantities',
      'To list the qualifications of site operatives',
      'To document alterations to existing installations',
    ],
    correctAnswer: 1,
    explanation:
      'Material delivery schedules ensure materials arrive when needed and in correct quantities, avoiding delays and storage issues.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Delivery Scheduling',
  },
  {
    id: 130,
    question: 'What should be considered when planning temporary electrical supplies?',
    options: [
      'Only the lowest installation cost',
      'The appearance of the temporary cabling',
      'Safety, capacity, and protection requirements',
      'The colour of the temporary distribution units',
    ],
    correctAnswer: 2,
    explanation:
      'Temporary electrical supplies require consideration of safety, capacity, and protection requirements to ensure safe operation.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Temporary Supplies',
  },
  {
    id: 131,
    question: 'What is the purpose of using a water level for long-distance leveling?',
    options: [
      'To detect concealed cables behind the wall surface',
      'To measure vertical drops down a stairwell only',
      'To check the depth of cable chases in a wall',
      'Provides accurate level reference over long distances and around obstacles',
    ],
    correctAnswer: 3,
    explanation:
      'Water levels provide accurate level reference over long distances and around obstacles where spirit levels cannot be used.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Water Levels',
  },
  {
    id: 132,
    question: 'When setting out cable routes, what should be avoided?',
    options: [
      'Sharp bends and potential damage points',
      'Routes that follow safe zones',
      'Routes that allow future access for maintenance',
      'Routes that keep cables clear of heat sources',
    ],
    correctAnswer: 0,
    explanation:
      'Cable routes should avoid sharp bends and potential damage points to prevent cable damage and installation difficulties.',
    section: '4.2.4',
    difficulty: 'basic',
    topic: 'Route Avoidance',
  },
  {
    id: 133,
    question: 'What tool would be most appropriate for marking positions on metal surfaces?',
    options: [
      'Pencil',
      'Scriber or marker pen',
      'Chalk',
      'Crayon',
    ],
    correctAnswer: 1,
    explanation:
      'A scriber or marker pen is most appropriate for marking metal surfaces as it provides clear, permanent marks.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Metal Marking',
  },
  {
    id: 134,
    question: 'What should be done when setting out positions in areas with limited access?',
    options: [
      'Estimate the positions by eye to save time',
      'Skip the setting-out stage entirely',
      'Use alternative measuring methods and reference points',
      'Mark positions only once the access improves',
    ],
    correctAnswer: 2,
    explanation:
      'In areas with limited access, use alternative measuring methods and reference points to maintain accuracy.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Limited Access Measuring',
  },
  {
    id: 135,
    question: 'What is the purpose of using a plumb line in installation work?',
    options: [
      'To establish a level horizontal reference line',
      'To measure long horizontal distances accurately',
      'To locate buried services before drilling',
      'To establish true vertical reference lines',
    ],
    correctAnswer: 3,
    explanation:
      'A plumb line establishes true vertical reference lines for accurate positioning of vertical installations.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Plumb Lines',
  },
  {
    id: 136,
    question: 'What factor determines the minimum bend radius for different conduit materials?',
    options: [
      'Material properties and wall thickness',
      'The colour of the conduit',
      'The length of the conduit run',
      'The number of cables to be drawn in',
    ],
    correctAnswer: 0,
    explanation:
      'Minimum bend radius is determined by material properties and wall thickness to prevent damage and maintain structural integrity.',
    section: '4.3.1',
    difficulty: 'intermediate',
    topic: 'Bend Radius Factors',
  },
  {
    id: 137,
    question:
      'When bending conduit for a 90-degree change of direction, what should be considered?',
    options: [
      'The colour-coding of the conduit only',
      'Bend radius, conduit length, and cable pulling requirements',
      'The cost of the conduit per metre only',
      'The brand of bending machine used only',
    ],
    correctAnswer: 1,
    explanation:
      'Consider bend radius, conduit length requirements, and cable pulling capability when making 90-degree bends.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: '90-Degree Bends',
  },
  {
    id: 138,
    question: 'What is the advantage of using pre-formed bends over site-bent conduit?',
    options: [
      'They are always cheaper than site bending',
      'They remove the need for any conduit supports',
      'Consistent quality and reduced installation time',
      'They allow a smaller conduit size to be used',
    ],
    correctAnswer: 2,
    explanation:
      'Pre-formed bends provide consistent quality and reduce installation time compared to site bending operations.',
    section: '4.3.5',
    difficulty: 'intermediate',
    topic: 'Pre-formed Bends',
  },
  {
    id: 139,
    question: 'What should be done to conduit after bending to ensure smooth cable pulling?',
    options: [
      'Apply a coat of paint to the inside of the bend',
      'Heat the bend again to relieve stress',
      'Fit an additional coupling at the bend',
      'Check internal diameter and remove any restrictions',
    ],
    correctAnswer: 3,
    explanation:
      'After bending, check the internal diameter and remove any restrictions to ensure smooth cable pulling.',
    section: '4.3.4',
    difficulty: 'basic',
    topic: 'Post-Bend Checks',
  },
  {
    id: 140,
    question: 'When would you use offset bends in conduit installation?',
    options: [
      'To navigate around obstacles while maintaining parallel runs',
      'To increase the current rating of the cables',
      'To earth the conduit at each fixing point',
      'To reduce the number of cables in the conduit',
    ],
    correctAnswer: 0,
    explanation:
      'Offset bends are used to navigate around obstacles while maintaining parallel conduit runs and proper alignment.',
    section: '4.3.5',
    difficulty: 'intermediate',
    topic: 'Offset Bends',
  },
  {
    id: 141,
    question: 'What is the purpose of using spring-loaded supports for cable tray?',
    options: [
      'To increase the load capacity of the tray',
      'To accommodate thermal movement and vibration',
      'To earth the cable tray to the structure',
      'To reduce the cost of the support system',
    ],
    correctAnswer: 1,
    explanation:
      'Spring-loaded supports accommodate thermal movement and vibration in cable tray installations, preventing stress damage.',
    section: '4.4.1',
    difficulty: 'advanced',
    topic: 'Spring Supports',
  },
  {
    id: 142,
    question: 'Which type of fixing is most suitable for fixing to steel structures?',
    options: [
      'Plastic plugs and wood screws',
      'Cavity fixings or toggle bolts',
      'Welded brackets or beam clamps',
      'Adhesive pads or double-sided tape',
    ],
    correctAnswer: 2,
    explanation:
      'Welded brackets or beam clamps provide the most secure fixing method for steel structures in industrial installations.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Steel Structure Fixings',
  },
  {
    id: 143,
    question: 'What is the purpose of using fire barriers in cable installations?',
    options: [
      'To support the weight of the cables',
      'To provide strain relief at terminations',
      'To improve the current rating of the cables',
      'To prevent fire spread through cable routes',
    ],
    correctAnswer: 3,
    explanation:
      'Fire barriers prevent fire spread through cable routes, maintaining compartmentation and allowing safe evacuation.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Fire Barriers',
  },
  {
    id: 144,
    question:
      'When installing cables in areas subject to mechanical damage, what protection should be provided?',
    options: [
      'Appropriate mechanical protection such as conduit or trunking',
      'A higher current rating for the cable',
      'Additional RCD protection for the circuit',
      'A warning label fixed near the cable',
    ],
    correctAnswer: 0,
    explanation:
      'Areas subject to mechanical damage require appropriate protection such as conduit, trunking, or impact-resistant covers.',
    section: '4.4.4',
    difficulty: 'basic',
    topic: 'Mechanical Protection',
  },
  {
    id: 145,
    question: 'What is the purpose of using cable pulling socks?',
    options: [
      'To provide additional insulation to the cable',
      'To distribute pulling forces evenly along the cable',
      'To earth the cable during installation',
      'To mark the cable for identification',
    ],
    correctAnswer: 1,
    explanation:
      'Cable pulling socks distribute pulling forces evenly along the cable, preventing damage during installation.',
    section: '4.4.8',
    difficulty: 'intermediate',
    topic: 'Pulling Socks',
  },
  {
    id: 146,
    question: 'What is the correct method for connecting a solid conductor to a pillar terminal?',
    options: [
      'Twist the conductor with the adjacent core first',
      'Tin the conductor with solder before inserting it',
      'Form a neat hook and ensure full contact with terminal',
      'Leave the conductor straight with no preparation',
    ],
    correctAnswer: 2,
    explanation:
      'Solid conductors should be formed into a neat hook ensuring full contact with the terminal for reliable connection.',
    section: '4.5.1',
    difficulty: 'basic',
    topic: 'Solid Conductor Termination',
  },
  {
    id: 147,
    question: 'When are reusable lever (push-fit) connectors particularly useful in UK installations?',
    options: [
      'For terminating steel-wire armour to an enclosure',
      'For connecting cable armour to the main earth',
      'For high-current busbar connections only',
      'For quick, tool-free joints where conductors may later need disconnecting',
    ],
    correctAnswer: 3,
    explanation:
      'Lever (push-fit) connectors such as the WAGO type give a fast, tool-free, reusable connection that maintains good contact and is convenient where conductors may need to be disconnected and remade. They must be used within their rated current and conductor range.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Wire Nuts',
  },
  {
    id: 148,
    question: 'What is the purpose of using cable entry plates in enclosures?',
    options: [
      'To provide multiple organised cable entries while maintaining IP rating',
      'To support the weight of the enclosure',
      'To earth every cable that enters the enclosure',
      'To increase the current rating of the enclosure',
    ],
    correctAnswer: 0,
    explanation:
      "Cable entry plates provide multiple organized cable entries while maintaining the enclosure's IP rating and appearance.",
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Entry Plates',
  },
  {
    id: 149,
    question: 'When terminating high-current cables, what additional consideration is required?',
    options: [
      'Segregation from data and control cables',
      'Adequate terminal size and heat dissipation',
      'A higher IP rating for the enclosure',
      'Additional RCD protection for the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'High-current cables require adequate terminal size and consideration of heat dissipation to prevent overheating.',
    section: '4.5.4',
    difficulty: 'advanced',
    topic: 'High-Current Termination',
  },
  {
    id: 150,
    question: 'What does IP68 rating indicate for an electrical enclosure?',
    options: [
      'Limited dust protection and protection against splashing water',
      'No dust protection and protection against water jets',
      'Dust-tight and protected against continuous immersion',
      'Partial dust protection and protection against vertical drips',
    ],
    correctAnswer: 2,
    explanation:
      'IP68 indicates the enclosure is dust-tight (IP6X) and protected against continuous immersion in water (IPX8).',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'IP68 Rating',
  },
  {
    id: 151,
    question: 'What should be included in the visual inspection checklist?',
    options: [
      'The retail cost of each installed item',
      'The delivery dates of all materials',
      'The names of all site operatives',
      'Connections, supports, protection, labelling, and general workmanship',
    ],
    correctAnswer: 3,
    explanation:
      'Visual inspection should include connections, supports, protection, labeling, and general workmanship quality.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Inspection Checklist',
  },
  {
    id: 152,
    question: 'What is the purpose of functional testing?',
    options: [
      'To verify that installed systems operate as intended',
      'To measure the insulation resistance of circuits',
      'To confirm the correct cable colours were used',
      'To record the prospective fault current at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'Functional testing verifies that installed systems operate as intended and meet the design requirements.',
    section: '4.6.5',
    difficulty: 'basic',
    topic: 'Functional Testing',
  },
  {
    id: 153,
    question: 'When should periodic testing be carried out on installations?',
    options: [
      'Only when a fault has been reported',
      'At regular intervals as specified in regulations',
      'Only when the property changes ownership',
      'Never, once the installation certificate is issued',
    ],
    correctAnswer: 1,
    explanation:
      'Periodic testing should be carried out at regular intervals as specified in regulations to ensure continued safety.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Periodic Testing',
  },
  {
    id: 154,
    question: 'What information should be recorded during testing?',
    options: [
      'Only the final pass or fail result',
      'The names of everyone present on site',
      'Test values, instruments used, environmental conditions, and observations',
      'The cost of the test instruments used',
    ],
    correctAnswer: 2,
    explanation:
      'Testing records should include test values, instruments used, environmental conditions, and any relevant observations.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Test Recording',
  },
  {
    id: 155,
    question: 'What should be done if test instruments give inconsistent readings?',
    options: [
      'Record the average of the readings obtained',
      'Use the lowest reading as the result',
      'Ignore the readings and energise the circuit',
      'Check instrument calibration and prove on known values',
    ],
    correctAnswer: 3,
    explanation:
      'Inconsistent readings require checking instrument calibration and proving on known values before continuing testing.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Instrument Reliability',
  },
  {
    id: 156,
    question: 'What respiratory protection might be required when working in dusty environments?',
    options: [
      'Dust masks or respirators appropriate to the dust type',
      'Safety glasses and a face shield',
      'Ear defenders rated for the noise level',
      'Cut-resistant gloves for the task',
    ],
    correctAnswer: 0,
    explanation:
      'Dusty environments require dust masks or respirators appropriate to the specific type of dust present.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'Respiratory Protection',
  },
  {
    id: 157,
    question: 'What is the purpose of using double-insulated (Class II) power tools?',
    options: [
      'To allow the tool to run at a higher voltage',
      'Additional protection against electric shock without requiring earthing',
      'To increase the power output of the tool',
      'To make the tool waterproof for outdoor use',
    ],
    correctAnswer: 1,
    explanation:
      'Double-insulated tools provide additional protection against electric shock without requiring an earth connection.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: 'Double Insulation',
  },
  {
    id: 158,
    question: 'What should be done before using mobile elevated work platforms (MEWPs)?',
    options: [
      'Remove the guard rails to improve access',
      'Operate it on any available ground surface',
      'Ensure operators are trained and equipment is inspected',
      'Exceed the rated load to save a second lift',
    ],
    correctAnswer: 2,
    explanation:
      'MEWPs require trained operators and thorough equipment inspection before use to ensure safe operation.',
    section: '4.7.3',
    difficulty: 'advanced',
    topic: 'MEWP Safety',
  },
  {
    id: 159,
    question: 'What is the purpose of using safety nets when working at height?',
    options: [
      'To catch dropped tools and offcuts only',
      'To support the weight of access equipment',
      'To provide shade for operatives working below',
      'To provide collective fall protection for multiple workers',
    ],
    correctAnswer: 3,
    explanation:
      'Safety nets provide collective fall protection for multiple workers, reducing the risk of serious injury from falls.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'Safety Nets',
  },
  {
    id: 160,
    question: 'What should be done with hazardous waste materials?',
    options: [
      'Identify, segregate, and dispose of according to hazardous waste regulations',
      'Place it in the general site waste skip',
      'Bury it on site away from buildings',
      'Store it indefinitely in the site store',
    ],
    correctAnswer: 0,
    explanation:
      'Hazardous waste must be identified, segregated, and disposed of according to specific hazardous waste regulations.',
    section: '4.7.4',
    difficulty: 'intermediate',
    topic: 'Hazardous Waste',
  },
  {
    id: 161,
    question: 'What is the purpose of conducting regular safety inspections during work?',
    options: [
      'To record the hours worked by each operative',
      'To identify and control emerging hazards',
      'To check the cost of materials used',
      'To confirm the appearance of completed work',
    ],
    correctAnswer: 1,
    explanation:
      'Regular safety inspections identify and control emerging hazards before they can cause accidents or injuries.',
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Safety Inspections',
  },
  {
    id: 162,
    question: 'When should the original risk assessment be updated?',
    options: [
      'Only at the end of the project',
      'Only if an accident has occurred',
      'When work methods change or new hazards are identified',
      'Never, once it has been signed off',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessments should be updated when work methods change or new hazards are identified during the project.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Risk Assessment Updates',
  },
  {
    id: 163,
    question: 'What should be done if installation drawings contain conflicting information?',
    options: [
      'Use whichever drawing was issued most recently',
      'Choose the option that is cheapest to install',
      'Proceed using your own judgement',
      'Seek clarification from the design team before proceeding',
    ],
    correctAnswer: 3,
    explanation:
      'Conflicting information in drawings requires clarification from the design team before work can proceed safely.',
    section: '4.1.2',
    difficulty: 'basic',
    topic: 'Drawing Conflicts',
  },
  {
    id: 164,
    question: 'What is the purpose of material storage plans?',
    options: [
      'To ensure materials are stored safely and remain in good condition',
      'To record the retail price of stored materials',
      'To list the suppliers of each material',
      'To schedule the testing of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Material storage plans ensure materials are stored safely, remain in good condition, and are easily accessible when needed.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Storage Planning',
  },
  {
    id: 165,
    question: 'What should be considered when coordinating with other trades?',
    options: [
      'Only the electrical work programme',
      'Work sequences, shared resources, and safety interactions',
      'The cost of each trade\'s materials',
      'The qualifications held by each trade',
    ],
    correctAnswer: 1,
    explanation:
      'Coordination with other trades requires consideration of work sequences, shared resources, and safety interactions.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Trade Coordination',
  },
  {
    id: 166,
    question: 'What is the standard height for consumer units in domestic installations?',
    options: [
      '1200mm to center',
      '1500mm to center',
      '1350mm to center',
      '1800mm to center',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 only requires a consumer unit to be readily accessible (no fixed height). As good practice, units are typically mounted with their centre around 1350mm so that the main switch and protective devices sit within the Building Regulations Part M accessible band (450–1200mm).',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Consumer Unit Height',
  },
  {
    id: 167,
    question: 'When using a theodolite for setting out, what is its primary advantage?',
    options: [
      'It measures insulation resistance accurately',
      'It detects buried cables and pipes',
      'It checks the level of socket outlets',
      'Provides precise angular measurements for complex layouts',
    ],
    correctAnswer: 3,
    explanation:
      'Theodolites provide precise angular measurements essential for complex layouts and long-distance accurate positioning.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Theodolite Use',
  },
  {
    id: 168,
    question: 'What should be done when marking out positions on finished surfaces?',
    options: [
      "Use removable marking methods that won't damage the surface",
      "Score the marks deeply with a sharp scriber for visibility",
      "Use permanent paint so the marks remain after installation",
      "Drill the fixing holes first and mark around them",
    ],
    correctAnswer: 0,
    explanation:
      "Finished surfaces require removable marking methods that won't cause damage or permanent staining.",
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Finished Surface Marking',
  },
  {
    id: 169,
    question: 'When setting out in areas with restricted headroom, what should be considered?',
    options: [
      'Only the appearance of the finished work',
      'Access for installation and future maintenance',
      'The cost of the access equipment only',
      'The colour of the containment used',
    ],
    correctAnswer: 1,
    explanation:
      'Restricted headroom areas require consideration of access for both current installation and future maintenance activities.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Restricted Access',
  },
  {
    id: 170,
    question: 'What is the purpose of using string lines in setting out work?',
    options: [
      'To detect buried services before drilling',
      'To pull cables through long conduit runs',
      'To establish straight reference lines over long distances',
      'To measure the resistance of a circuit',
    ],
    correctAnswer: 2,
    explanation:
      'String lines establish straight reference lines over long distances where rigid measuring tools cannot be used effectively.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'String Lines',
  },
  {
    id: 171,
    question: 'What happens to cable pulling forces when conduit bends are too sharp?',
    options: [
      'Forces decrease',
      'Forces become easier to manage',
      'Forces remain the same',
      'Forces increase significantly',
    ],
    correctAnswer: 3,
    explanation:
      'Sharp conduit bends significantly increase cable pulling forces, making installation difficult and potentially damaging cables.',
    section: '4.3.1',
    difficulty: 'intermediate',
    topic: 'Pulling Force Effects',
  },
  {
    id: 172,
    question: 'When bending large diameter conduit, what additional equipment might be required?',
    options: [
      'Hydraulic benders or specialised forming equipment',
      'A standard hand bending spring',
      'A pair of long-nose pliers',
      'An insulation resistance tester',
    ],
    correctAnswer: 0,
    explanation:
      'Large diameter conduit requires hydraulic benders or specialised forming equipment to achieve proper bends without damage.',
    section: '4.3.3',
    difficulty: 'advanced',
    topic: 'Large Diameter Bending',
  },
  {
    id: 173,
    question: 'What is the purpose of using saddle bends in conduit installation?',
    options: [
      'To terminate the conduit at an enclosure',
      'To cross over other conduits or obstacles',
      'To earth the conduit to the structure',
      'To reduce the diameter of the conduit run',
    ],
    correctAnswer: 1,
    explanation:
      'Saddle bends allow conduit to cross over other conduits or obstacles while maintaining proper clearances.',
    section: '4.3.5',
    difficulty: 'intermediate',
    topic: 'Saddle Bends',
  },
  {
    id: 174,
    question: 'When making compound bends in conduit, what must be carefully planned?',
    options: [
      'The colour-coding of the conduit',
      'The cost of the conduit per metre',
      'The sequence and interaction of multiple bend angles',
      'The brand of the bending machine',
    ],
    correctAnswer: 2,
    explanation:
      'Compound bends require careful planning of the sequence and interaction of multiple bend angles to achieve the desired result.',
    section: '4.3.5',
    difficulty: 'advanced',
    topic: 'Compound Bends',
  },
  {
    id: 175,
    question: 'What should be checked after completing conduit bending operations?',
    options: [
      'The colour of the conduit at the bend',
      'The market price of the conduit used',
      'The brand of the bending tool',
      'Internal diameter, alignment, and cable pulling capability',
    ],
    correctAnswer: 3,
    explanation:
      'After bending, check internal diameter, alignment, and cable pulling capability to ensure the installation will function properly.',
    section: '4.3.4',
    difficulty: 'basic',
    topic: 'Bend Verification',
  },
  {
    id: 176,
    question: 'What is the purpose of using adjustable supports for cable installations?',
    options: [
      'To accommodate final positioning and thermal movement',
      'To increase the current rating of the cable',
      'To earth the support to the structure',
      'To reduce the number of fixings required',
    ],
    correctAnswer: 0,
    explanation:
      'Adjustable supports accommodate final positioning adjustments and thermal movement in cable installations.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Adjustable Supports',
  },
  {
    id: 177,
    question: 'Which fixing method is most appropriate for temporary installations?',
    options: [
      'Chemical resin anchors',
      'Clamps or removable fixings',
      'Cast-in fixing channels',
      'Welded brackets',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary installations should use clamps or removable fixings that can be easily removed without damaging structures.',
    section: '4.4.2',
    difficulty: 'basic',
    topic: 'Temporary Fixings',
  },
  {
    id: 178,
    question: 'What is the purpose of using cable separation in installations?',
    options: [
      'To reduce the total length of cable required',
      'To increase the current rating of each cable',
      'To prevent interference between different circuit types',
      'To improve the appearance of the containment',
    ],
    correctAnswer: 2,
    explanation:
      'Cable separation prevents interference between different circuit types (power, data, control) and meets safety requirements.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Cable Separation',
  },
  {
    id: 179,
    question: 'When installing in areas subject to vibration, what should be considered?',
    options: [
      'Rigid fixings at every support point',
      'A larger cable size throughout',
      'Fewer supports to allow movement',
      'Flexible connections and vibration-resistant supports',
    ],
    correctAnswer: 3,
    explanation:
      'Areas subject to vibration require flexible connections and vibration-resistant supports to prevent fatigue failures.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Vibration Considerations',
  },
  {
    id: 180,
    question: 'What is the purpose of using cable management systems?',
    options: [
      'To organise, support, and protect cables systematically',
      'To increase the current rating of the cables',
      'To remove the need for circuit identification',
      'To reduce the cost of the cables used',
    ],
    correctAnswer: 0,
    explanation:
      'Cable management systems organize, support, and protect cables systematically, improving reliability and maintenance access.',
    section: '4.4.9',
    difficulty: 'basic',
    topic: 'Cable Management',
  },
  {
    id: 181,
    question: 'What is the correct procedure for preparing stranded conductors for termination?',
    options: [
      'Solder all the strands solid before inserting',
      'Strip insulation, twist strands, and consider using ferrules',
      'Cut away half the strands to fit the terminal',
      'Leave the insulation in place and pierce it',
    ],
    correctAnswer: 1,
    explanation:
      'Stranded conductors should have insulation stripped, strands twisted together, and ferrules considered for reliable termination.',
    section: '4.5.1',
    difficulty: 'basic',
    topic: 'Stranded Conductor Prep',
  },
  {
    id: 182,
    question: 'When should insulation sleeves be used on connections?',
    options: [
      'Only on circuits operating above 1000 V',
      'Only where the connection carries no current',
      'When additional insulation or identification is required',
      'Only on connections inside sealed enclosures',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation sleeves provide additional insulation or identification where required by regulations or good practice.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Insulation Sleeves',
  },
  {
    id: 183,
    question: 'What is the purpose of using blanking plugs in unused cable entries?',
    options: [
      'To increase the current rating of the enclosure',
      'To earth the enclosure to the structure',
      'To support the weight of the cables',
      'To maintain IP rating and prevent ingress',
    ],
    correctAnswer: 3,
    explanation:
      'Blanking plugs maintain the IP rating of enclosures by preventing ingress through unused cable entries.',
    section: '4.5.3',
    difficulty: 'basic',
    topic: 'Blanking Plugs',
  },
  {
    id: 184,
    question: 'When terminating cables in hazardous areas, what additional requirements apply?',
    options: [
      'Use certified equipment and follow specific installation procedures',
      'Use standard accessories sealed with extra tape',
      'Use a higher current rating than normal',
      'Use only single-core cables throughout',
    ],
    correctAnswer: 0,
    explanation:
      'Hazardous areas require certified equipment and specific installation procedures to prevent ignition of flammable atmospheres.',
    section: '4.5.4',
    difficulty: 'advanced',
    topic: 'Hazardous Area Termination',
  },
  {
    id: 185,
    question: 'What does NEMA 4X rating indicate for an electrical enclosure?',
    options: [
      'Indoor use only with protection against falling dirt',
      'Weather-resistant and corrosion-resistant',
      'Protection against incidental contact and light dust only',
      'Suitable for hazardous gas atmospheres without further measures',
    ],
    correctAnswer: 1,
    explanation:
      'NEMA 4X rating indicates the enclosure is weather-resistant and corrosion-resistant, suitable for harsh outdoor environments.',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'NEMA Ratings',
  },
  {
    id: 186,
    question: 'What should be verified during the initial visual inspection?',
    options: [
      'The retail cost of the installed equipment',
      'The earth fault loop impedance at every point',
      'Compliance with drawings, workmanship quality, and safety requirements',
      'The insulation resistance of every circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Initial visual inspection should verify compliance with drawings, workmanship quality, and safety requirements before testing.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Initial Inspection',
  },
  {
    id: 187,
    question: 'What is the purpose of dead testing before live testing?',
    options: [
      'To save time by skipping the live tests',
      'To check that systems operate when energised',
      'To warm up the test instruments',
      'To identify obvious faults safely before applying power',
    ],
    correctAnswer: 3,
    explanation:
      'Dead testing identifies obvious faults safely before applying power, preventing damage and ensuring safe live testing.',
    section: '4.6.2',
    difficulty: 'basic',
    topic: 'Dead Testing Purpose',
  },
  {
    id: 188,
    question: 'When should calibration certificates for test instruments be checked?',
    options: [
      'Before each testing session',
      'Only when the instrument is first purchased',
      'Only after a failed test result',
      'Once every ten years',
    ],
    correctAnswer: 0,
    explanation:
      'Calibration certificates should be checked before each testing session to ensure instruments provide accurate, reliable results.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Instrument Calibration',
  },
  {
    id: 189,
    question: 'What should be done if test results are borderline or marginal?',
    options: [
      'Accept the result and issue the certificate',
      'Investigate further and consider remedial action',
      'Energise the circuit and monitor it in service',
      'Record the result as a pass without comment',
    ],
    correctAnswer: 1,
    explanation:
      'Borderline or marginal test results require further investigation and consideration of remedial action to ensure safety.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Marginal Results',
  },
  {
    id: 190,
    question: 'What is the purpose of issuing electrical installation certificates?',
    options: [
      'To record the cost of the installation work',
      'To list the materials supplied to site',
      'To provide legal evidence of compliance with regulations',
      'To schedule the next periodic inspection only',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical installation certificates provide legal evidence that work complies with regulations and safety standards.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Installation Certificates',
  },
  {
    id: 191,
    question: 'What hearing protection should be used in high-noise environments?',
    options: [
      'A standard dust mask',
      'Safety glasses with side shields',
      'A hard hat with a chin strap',
      'Ear plugs or ear defenders appropriate to noise levels',
    ],
    correctAnswer: 3,
    explanation:
      'High-noise environments require ear plugs or ear defenders appropriate to the specific noise levels present.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Hearing Protection',
  },
  {
    id: 192,
    question: 'What is the purpose of using residual current devices (RCDs) with portable tools?',
    options: [
      'To provide additional protection against electric shock',
      'To increase the power output of the tool',
      'To reduce the noise produced by the tool',
      'To allow the tool to run at a higher voltage',
    ],
    correctAnswer: 0,
    explanation:
      'RCDs provide additional protection against electric shock when using portable tools, especially in harsh environments.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: 'RCD Protection',
  },
  {
    id: 193,
    question: 'What should be considered when selecting access equipment for work at height?',
    options: [
      'Only the purchase cost of the equipment',
      'Task requirements, duration, weather conditions, and user competence',
      'Only the colour of the equipment',
      'Only the brand of the equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Access equipment selection should consider task requirements, duration, weather conditions, and user competence for safety.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'Access Equipment Selection',
  },
  {
    id: 194,
    question: 'What is the purpose of using edge protection when working at height?',
    options: [
      'To support the weight of materials at height',
      'To provide shade for operatives below',
      'To prevent falls from unprotected edges',
      'To mark the boundary of the work area only',
    ],
    correctAnswer: 2,
    explanation:
      'Edge protection prevents falls from unprotected edges, providing collective protection for workers at height.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Edge Protection',
  },
  {
    id: 195,
    question: 'What should be done with contaminated PPE?',
    options: [
      'Continue using it until the job is complete',
      'Share it with other operatives on site',
      'Store it with clean PPE in the same container',
      'Clean, inspect, or dispose of according to contamination type',
    ],
    correctAnswer: 3,
    explanation:
      'Contaminated PPE should be cleaned, inspected, or disposed of according to the type of contamination to maintain protection.',
    section: '4.7.4',
    difficulty: 'intermediate',
    topic: 'PPE Contamination',
  },
  {
    id: 196,
    question: 'What is the purpose of conducting near-miss reporting?',
    options: [
      'To identify and control hazards before accidents occur',
      'To record the hours worked by the team',
      'To assign blame for minor incidents',
      'To track the cost of damaged materials',
    ],
    correctAnswer: 0,
    explanation:
      'Near-miss reporting identifies and controls hazards before they can cause accidents, improving overall safety performance.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Near-Miss Reporting',
  },
  {
    id: 197,
    question: 'When should safety data sheets (SDS) be consulted?',
    options: [
      'Only after a chemical spillage has occurred',
      'Before using any chemical products or materials',
      'Only at the end of the project',
      'Only when ordering replacement materials',
    ],
    correctAnswer: 1,
    explanation:
      'Safety data sheets should be consulted before using any chemical products to understand hazards and safety precautions.',
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'Safety Data Sheets',
  },
  {
    id: 198,
    question:
      'What should be done if site conditions make the original installation method unsafe?',
    options: [
      'Continue using the original method carefully',
      'Speed up the work to finish before conditions worsen',
      'Stop work and develop alternative safe methods',
      'Reduce the number of operatives on the task',
    ],
    correctAnswer: 2,
    explanation:
      'If site conditions make original methods unsafe, work should stop and alternative safe methods developed before proceeding.',
    section: '4.1.4',
    difficulty: 'basic',
    topic: 'Method Adaptation',
  },
  {
    id: 199,
    question: 'What is the purpose of using as-built drawings?',
    options: [
      'To estimate the cost of the installation',
      'To brief the team on the day\'s hazards',
      'To order materials before work begins',
      'To record the actual installation for future reference and maintenance',
    ],
    correctAnswer: 3,
    explanation:
      'As-built drawings record the actual installation as completed, providing essential information for future maintenance and modifications.',
    section: '4.1.2',
    difficulty: 'intermediate',
    topic: 'As-Built Drawings',
  },
  {
    id: 200,
    question: 'What should be considered when planning material handling on site?',
    options: [
      'Manual handling risks, storage requirements, and access routes',
      'Only the retail cost of the materials',
      'Only the colour-coding of the cables',
      'Only the brand of the materials supplied',
    ],
    correctAnswer: 0,
    explanation:
      'Material handling planning should consider manual handling risks, storage requirements, and access routes to prevent injuries.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Material Handling',
  },
  {
    id: 201,
    question:
      'What is the minimum clearance required around electrical panels for maintenance access?',
    options: [
      '300mm',
      '600mm',
      '900mm',
      '1200mm',
    ],
    correctAnswer: 1,
    explanation:
      'A minimum clearance of 600mm is typically required around electrical panels to provide safe maintenance access.',
    section: '4.2.1',
    difficulty: 'intermediate',
    topic: 'Panel Clearances',
  },
  {
    id: 202,
    question: 'When using GPS for setting out large installations, what should be considered?',
    options: [
      'The colour of the marking equipment',
      'The cost of the materials being installed',
      'Accuracy requirements, satellite availability, and local coordinate systems',
      'The brand of the GPS receiver only',
    ],
    correctAnswer: 2,
    explanation:
      'GPS use requires consideration of accuracy requirements, satellite availability, and local coordinate systems for precise positioning.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'GPS Setting Out',
  },
  {
    id: 203,
    question: 'What should be done when setting out positions in areas with existing services?',
    options: [
      'Assume the existing services are not live',
      'Set out new positions first, then check for services',
      'Ignore existing services if they are concealed',
      'Locate and mark existing services before setting out new positions',
    ],
    correctAnswer: 3,
    explanation:
      'Existing services must be located and marked before setting out new positions to prevent conflicts and damage.',
    section: '4.2.5',
    difficulty: 'basic',
    topic: 'Existing Services',
  },
  {
    id: 204,
    question: 'When working in areas with limited natural light, what should be provided?',
    options: [
      'Adequate temporary lighting for safe working',
      'Additional hearing protection for operatives',
      'A higher IP rating on all equipment',
      'A larger cable size for the circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Areas with limited natural light require adequate temporary lighting to ensure safe working conditions and quality installation.',
    section: '4.2.3',
    difficulty: 'basic',
    topic: 'Temporary Lighting',
  },
  {
    id: 205,
    question: 'What is the purpose of using benchmark points in setting out work?',
    options: [
      'To record the cost of the installation',
      'To provide fixed reference points for accurate positioning',
      'To document alterations to existing installations',
      'To detect buried services before drilling',
    ],
    correctAnswer: 1,
    explanation:
      'Benchmark points provide fixed reference points that ensure accurate positioning throughout the installation process.',
    section: '4.2.2',
    difficulty: 'intermediate',
    topic: 'Benchmark Points',
  },
  {
    id: 206,
    question: 'What factor most affects the quality of conduit bends?',
    options: [
      'The colour of the conduit',
      'The cost of the conduit per metre',
      'Proper tooling and technique',
      'The number of cables to be drawn in',
    ],
    correctAnswer: 2,
    explanation:
      'Proper tooling and technique are the most important factors affecting the quality and consistency of conduit bends.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Bend Quality Factors',
  },
  {
    id: 207,
    question: 'When bending conduit in confined spaces, what additional challenges arise?',
    options: [
      'The conduit becomes electrically live',
      'The conduit changes colour as it bends',
      'A larger bend radius is always required',
      'Limited access for tools and reduced working space',
    ],
    correctAnswer: 3,
    explanation:
      'Confined spaces present challenges of limited access for tools and reduced working space, requiring careful planning.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: 'Confined Space Bending',
  },
  {
    id: 208,
    question: 'What is the purpose of using conduit bushings?',
    options: [
      'To protect cable insulation from sharp edges',
      'To increase the current rating of the cable',
      'To accommodate thermal movement in the conduit',
      'To make the conduit waterproof',
    ],
    correctAnswer: 0,
    explanation:
      'Conduit bushings protect cable insulation from sharp edges at conduit terminations, preventing damage during installation and service.',
    section: '4.3.4',
    difficulty: 'basic',
    topic: 'Conduit Bushings',
  },
  {
    id: 209,
    question: 'When planning conduit routes with multiple bends, what should be limited?',
    options: [
      'The colour-coding of the conduit',
      'Total number of bends and cumulative angle changes',
      'The length of the draw wire used',
      'The number of supports per metre',
    ],
    correctAnswer: 1,
    explanation:
      'Multiple bend routes should limit the total number of bends and cumulative angle changes to maintain cable pulling capability.',
    section: '4.3.5',
    difficulty: 'intermediate',
    topic: 'Multiple Bend Limits',
  },
  {
    id: 210,
    question: 'What should be considered when bending conduit for future cable additions?',
    options: [
      'The colour of the additional cables',
      'The cost of the future cables',
      'Future cable capacity and pulling requirements',
      'The brand of the future cables',
    ],
    correctAnswer: 2,
    explanation:
      'Future cable additions require consideration of additional capacity and pulling requirements when designing conduit bends.',
    section: '4.3.1',
    difficulty: 'advanced',
    topic: 'Future Capacity',
  },
  {
    id: 211,
    question: 'What is the purpose of using anti-vibration mounts for equipment supports?',
    options: [
      'To increase the load capacity of the support',
      'To earth the equipment to the structure',
      'To reduce the cost of the support system',
      'To prevent vibration transmission and reduce noise',
    ],
    correctAnswer: 3,
    explanation:
      'Anti-vibration mounts prevent vibration transmission from equipment and reduce noise levels in the installation.',
    section: '4.4.1',
    difficulty: 'advanced',
    topic: 'Anti-Vibration Mounts',
  },
  {
    id: 212,
    question: 'Which fixing method is most suitable for overhead installations?',
    options: [
      'Through-bolts or heavy-duty anchors',
      'Adhesive pads',
      'Cable ties only',
      'Plastic plugs in plasterboard',
    ],
    correctAnswer: 0,
    explanation:
      'Overhead installations require through-bolts or heavy-duty anchors to safely support the weight and prevent falling hazards.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Overhead Fixings',
  },
  {
    id: 213,
    question: 'What is the purpose of using fire-stopping materials in cable installations?',
    options: [
      'To support the weight of the cables',
      'To prevent fire spread through cable penetrations',
      'To increase the current rating of the cables',
      'To provide strain relief at terminations',
    ],
    correctAnswer: 1,
    explanation:
      'Fire-stopping materials prevent fire spread through cable penetrations, maintaining building fire compartmentation.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Fire Stopping',
  },
  {
    id: 214,
    question: 'When installing in areas subject to chemical exposure, what should be considered?',
    options: [
      'Using the smallest cable size available',
      'Spacing the supports as far apart as possible',
      'Chemical resistance of materials and additional protection',
      'Leaving the containment unpainted for inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Chemical exposure areas require materials with appropriate chemical resistance and additional protection measures.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Chemical Resistance',
  },
  {
    id: 215,
    question: 'What is the purpose of using cable pulling winches?',
    options: [
      'To support the cable on vertical runs',
      'To earth the cable during installation',
      'To strip the cable insulation automatically',
      'To provide controlled pulling force for long or difficult cable runs',
    ],
    correctAnswer: 3,
    explanation:
      'Cable pulling winches provide controlled pulling force for long or difficult cable runs, preventing cable damage.',
    section: '4.4.8',
    difficulty: 'intermediate',
    topic: 'Cable Winches',
  },
  {
    id: 216,
    question: 'What is the correct method for connecting aluminium conductors?',
    options: [
      'Use appropriate compounds and connection methods for aluminium',
      'Use ordinary brass screw terminals without preparation',
      'Solder the aluminium directly to the terminal',
      'Twist aluminium and copper conductors together',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium conductors require appropriate jointing compounds and connection methods to prevent oxidation and corrosion and to ensure reliable connections.',
    section: '4.5.1',
    difficulty: 'advanced',
    topic: 'Aluminium Connections',
  },
  {
    id: 217,
    question: 'When are mechanical (screw or compression) connectors preferred for a connection?',
    options: [
      'Only on circuits operating below 50 V',
      'For permanent installations and higher current applications',
      'Only where the connection will never carry current',
      'Only for single-strand bell wire',
    ],
    correctAnswer: 1,
    explanation:
      'Mechanical connectors are preferred for permanent installations and higher current applications due to their reliability.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Mechanical Connectors',
  },
  {
    id: 218,
    question: 'What is the purpose of using progressive cable glands?',
    options: [
      'To earth the cable armour to the enclosure',
      'To increase the current rating of the cable',
      'To accommodate different cable diameters in the same gland',
      'To support the weight of the cable externally',
    ],
    correctAnswer: 2,
    explanation:
      'Progressive cable glands accommodate different cable diameters in the same gland, providing flexibility in installations.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Progressive Glands',
  },
  {
    id: 219,
    question: 'When terminating cables in explosive atmospheres, what certification is required?',
    options: [
      'A standard CE marking on the cable gland is sufficient',
      'BS 7671 compliance alone covers explosive atmospheres',
      'An IP68 rating on the enclosure is all that is needed',
      'ATEX or IECEx certification for equipment and installation methods',
    ],
    correctAnswer: 3,
    explanation:
      'Explosive atmospheres require ATEX or IECEx certification for equipment and installation methods to prevent ignition.',
    section: '4.5.4',
    difficulty: 'advanced',
    topic: 'Explosive Atmosphere Certification',
  },
  {
    id: 220,
    question: 'What does IP69K rating indicate for an electrical enclosure?',
    options: [
      'Dust-tight and protected against high-pressure, high-temperature wash-down',
      'Limited dust protection and protection against splashing water',
      'No dust protection and protection against vertical drips only',
      'Dust-tight and protected against temporary immersion only',
    ],
    correctAnswer: 0,
    explanation:
      'IP69K indicates dust-tight protection and resistance to high-pressure, high-temperature wash-down procedures.',
    section: '4.5.5',
    difficulty: 'advanced',
    topic: 'IP69K Rating',
  },
  {
    id: 221,
    question: 'What should be documented during the visual inspection process?',
    options: [
      'The cost of the installed equipment',
      'All observations, defects, and compliance issues',
      'The names of the material suppliers',
      'The hours worked by each operative',
    ],
    correctAnswer: 1,
    explanation:
      'Visual inspection should document all observations, defects, and compliance issues for comprehensive quality records.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Inspection Documentation',
  },
  {
    id: 222,
    question: 'What is the purpose of phase sequence testing in three-phase installations?',
    options: [
      'To measure the insulation resistance of each phase',
      'To confirm the correct cable colours have been used',
      'To verify correct phase rotation and system operation',
      'To check the mechanical strength of the connections',
    ],
    correctAnswer: 2,
    explanation:
      'Sequence testing verifies correct phase rotation and system operation, particularly important for motor installations.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Sequence Testing',
  },
  {
    id: 223,
    question: 'When should test instruments be re-calibrated?',
    options: [
      "Only when the instrument is first purchased",
      "Only after the instrument has given a failed reading",
      "Never, once the instrument has been proved on site",
      "According to manufacturer's recommendations or when accuracy is questioned",
    ],
    correctAnswer: 3,
    explanation:
      "Test instruments should be re-calibrated according to manufacturer's recommendations or when accuracy is questioned.",
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Instrument Re-calibration',
  },
  {
    id: 224,
    question: 'What should be done if environmental conditions affect test results?',
    options: [
      'Record conditions and consider their impact on results',
      'Ignore the conditions and record the raw reading',
      'Postpone all testing until conditions are perfect',
      'Adjust the result by a fixed correction factor',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental conditions should be recorded and their impact on test results considered for accurate interpretation.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Environmental Effects',
  },
  {
    id: 225,
    question: 'What is the purpose of issuing minor works certificates?',
    options: [
      'To certify a complete new installation',
      'To document small additions or alterations to existing installations',
      'To record a periodic inspection of an installation',
      'To order materials for a new circuit',
    ],
    correctAnswer: 1,
    explanation:
      "Minor works certificates document small additions or alterations to existing installations that don't require full certification.",
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Minor Works Certificates',
  },
  {
    id: 226,
    question: 'What eye protection should be used when working with chemicals?',
    options: [
      'Standard clear safety glasses',
      'Tinted welding goggles',
      'Chemical-resistant goggles or face shields',
      'No eye protection is needed for chemicals',
    ],
    correctAnswer: 2,
    explanation:
      'Chemical work requires chemical-resistant goggles or face shields to protect against splashes and vapors.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'Chemical Eye Protection',
  },
  {
    id: 227,
    question: 'What is the purpose of using isolation transformers with power tools?',
    options: [
      'To increase the power output of the tool',
      'To allow the tool to run at a higher voltage',
      'To reduce the noise produced by the tool',
      'To provide electrical isolation and reduce shock risk',
    ],
    correctAnswer: 3,
    explanation:
      'Isolation transformers provide electrical isolation from earth, reducing the risk of electric shock when using power tools.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Isolation Transformers',
  },
  {
    id: 228,
    question: 'What should be considered when working near water or in wet conditions?',
    options: [
      'Additional electrical protection and slip-resistant surfaces',
      'A higher cable current rating throughout',
      'Removing all RCD protection to avoid nuisance tripping',
      'Using mains-voltage tools without RCDs',
    ],
    correctAnswer: 0,
    explanation:
      'Wet conditions require additional electrical protection (RCDs, low voltage) and slip-resistant surfaces for safety.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Wet Condition Safety',
  },
  {
    id: 229,
    question: 'What is the purpose of using rescue equipment when working at height?',
    options: [
      'To carry tools and materials up to height',
      'To enable rapid rescue of workers in emergency situations',
      'To support the access platform',
      'To mark the boundary of the work area',
    ],
    correctAnswer: 1,
    explanation:
      'Rescue equipment enables rapid rescue of workers in emergency situations, reducing the consequences of accidents at height.',
    section: '4.7.3',
    difficulty: 'advanced',
    topic: 'Rescue Equipment',
  },
  {
    id: 230,
    question: 'What should be done with damaged or worn PPE?',
    options: [
      'Continue using it until the job is finished',
      'Repair it with tape and return it to use',
      'Remove from service immediately and replace',
      'Pass it on to another operative',
    ],
    correctAnswer: 2,
    explanation:
      'Damaged or worn PPE should be removed from service immediately and replaced to maintain protection effectiveness.',
    section: '4.7.4',
    difficulty: 'basic',
    topic: 'PPE Replacement',
  },
  {
    id: 231,
    question: 'What is the purpose of conducting post-installation safety reviews?',
    options: [
      'To calculate the final cost of the job',
      'To record the materials used on site',
      'To check the test instruments are calibrated',
      'To identify lessons learned and improve future safety performance',
    ],
    correctAnswer: 3,
    explanation:
      'Post-installation safety reviews identify lessons learned and opportunities to improve future safety performance.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Safety Reviews',
  },
  {
    id: 232,
    question: 'When should emergency contact information be updated?',
    options: [
      'When personnel or site conditions change',
      'Only after an incident has occurred',
      'Only at the end of the project',
      'Never, once it has been displayed',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency contact information should be updated whenever personnel or site conditions change to ensure effective response.',
    section: '4.1.4',
    difficulty: 'basic',
    topic: 'Emergency Contacts',
  },
  {
    id: 233,
    question: 'What should be done if installation specifications are unclear or contradictory?',
    options: [
      'Choose the cheapest interpretation',
      'Seek clarification from the specifying engineer or client',
      'Proceed using your own judgement',
      'Use whichever specification was issued first',
    ],
    correctAnswer: 1,
    explanation:
      'Unclear or contradictory specifications require clarification from the specifying engineer or client before proceeding.',
    section: '4.1.2',
    difficulty: 'basic',
    topic: 'Specification Clarification',
  },
  {
    id: 234,
    question: 'What is the purpose of maintaining material traceability records?',
    options: [
      'To calculate the total cost of the job',
      'To schedule the testing of the installation',
      'To track material origins for quality and safety purposes',
      'To record the hours worked by operatives',
    ],
    correctAnswer: 2,
    explanation:
      'Material traceability records track material origins for quality assurance, safety, and potential recall purposes.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Material Traceability',
  },
  {
    id: 235,
    question: 'What should be considered when planning work in occupied buildings?',
    options: [
      'Only the speed of completing the work',
      'Only the appearance of the finished work',
      'Only the cost of the materials used',
      'Occupant safety, noise levels, and access disruption',
    ],
    correctAnswer: 3,
    explanation:
      'Work in occupied buildings requires consideration of occupant safety, noise levels, and minimizing access disruption.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Occupied Building Work',
  },
  {
    id: 236,
    question: 'What is the standard height for emergency lighting in escape routes?',
    options: [
      '2000mm minimum',
      '1800mm minimum',
      '2200mm minimum',
      '2500mm minimum',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1 / BS EN 1838 recommend escape-route emergency luminaires be mounted at least 2m (2000mm) above floor level so they illuminate the route effectively and resist tampering and damage.',
    section: '4.2.1',
    difficulty: 'intermediate',
    topic: 'Emergency Lighting Height',
  },
  {
    id: 237,
    question: 'When using total stations for setting out, what is their main advantage?',
    options: [
      'They detect buried cables and pipes',
      'Combined distance and angle measurement for precise positioning',
      'They measure insulation resistance accurately',
      'They check the level of socket outlets',
    ],
    correctAnswer: 1,
    explanation:
      'Total stations combine distance and angle measurement capabilities for highly precise positioning in complex layouts.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Total Station Advantages',
  },
  {
    id: 238,
    question: 'What should be done when marking out positions on heritage or listed buildings?',
    options: [
      'Use permanent paint for clear, lasting marks',
      'Mark directly into the surface with a chisel',
      'Use non-damaging, removable marking methods and seek conservation advice',
      'Avoid marking out and work entirely by eye',
    ],
    correctAnswer: 2,
    explanation:
      'Heritage buildings require non-damaging, removable marking methods and conservation advice to protect historical features.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Heritage Building Marking',
  },
  {
    id: 239,
    question: 'When working in areas with electromagnetic interference, what should be considered?',
    options: [
      'Using a smaller cable size to reduce emissions',
      'Increasing the supply voltage to overcome interference',
      'Removing all earthing from the affected circuits',
      'Shielding requirements and separation from interference sources',
    ],
    correctAnswer: 3,
    explanation:
      'Electromagnetic interference areas require consideration of shielding requirements and separation from interference sources.',
    section: '4.2.4',
    difficulty: 'advanced',
    topic: 'EMI Considerations',
  },
  {
    id: 240,
    question: 'What is the purpose of using coordinate systems in large installations?',
    options: [
      'To ensure accurate positioning and facilitate future modifications',
      'To record the cost of the installation',
      'To track the suppliers of the materials',
      'To schedule the testing of each circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Coordinate systems ensure accurate positioning in large installations and facilitate future modifications and maintenance.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Coordinate Systems',
  },
  {
    id: 241,
    question: 'What environmental factors can affect conduit bending quality?',
    options: [
      'The colour of the conduit only',
      'Temperature, humidity, and material storage conditions',
      'The cost of the conduit per metre',
      'The brand of the bending machine',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature, humidity, and material storage conditions all affect conduit material properties and bending quality.',
    section: '4.3.2',
    difficulty: 'intermediate',
    topic: 'Environmental Bending Factors',
  },
  {
    id: 242,
    question: 'When bending conduit for seismic areas, what additional considerations apply?',
    options: [
      'Rigid connections fixed solidly at every point',
      'A smaller conduit size throughout',
      'Flexible connections and movement accommodation',
      'Fewer supports to allow free movement',
    ],
    correctAnswer: 2,
    explanation:
      'Seismic areas require flexible connections and accommodation for building movement during earthquakes.',
    section: '4.3.5',
    difficulty: 'advanced',
    topic: 'Seismic Considerations',
  },
  {
    id: 243,
    question: 'What is the purpose of using conduit expansion fittings?',
    options: [
      'To increase the current rating of the cables',
      'To earth the conduit to the structure',
      'To protect the conduit against corrosion',
      'To accommodate thermal expansion in long conduit runs',
    ],
    correctAnswer: 3,
    explanation:
      'Conduit expansion fittings accommodate thermal expansion in long conduit runs, preventing stress damage.',
    section: '4.3.5',
    difficulty: 'advanced',
    topic: 'Expansion Fittings',
  },
  {
    id: 244,
    question: 'When planning conduit routes in corrosive environments, what should be considered?',
    options: [
      'Corrosion-resistant materials and protective coatings',
      'Using the thinnest gauge of conduit available',
      'Spacing the supports as far apart as possible',
      'Leaving the conduit unpainted for inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Corrosive environments require corrosion-resistant materials and protective coatings to ensure long-term reliability.',
    section: '4.3.1',
    difficulty: 'advanced',
    topic: 'Corrosive Environment Bending',
  },
  {
    id: 245,
    question: 'What should be verified after completing complex conduit bending operations?',
    options: [
      'The colour-coding of the conduit',
      'Dimensional accuracy, internal clearance, and cable pulling capability',
      'The cost of the conduit used',
      'The brand of the bending machine',
    ],
    correctAnswer: 1,
    explanation:
      'Complex bending operations require verification of dimensional accuracy, internal clearance, and cable pulling capability.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: 'Complex Bend Verification',
  },
  {
    id: 246,
    question: 'What is the purpose of using seismic bracing for electrical installations?',
    options: [
      'To improve appearance',
      'To reduce installation costs',
      'To prevent damage during earthquakes',
      'To speed up installation',
    ],
    correctAnswer: 2,
    explanation:
      'Seismic bracing prevents damage to electrical installations during earthquakes, maintaining system integrity and safety.',
    section: '4.4.1',
    difficulty: 'advanced',
    topic: 'Seismic Bracing',
  },
  {
    id: 247,
    question: 'Which fixing method provides the best performance in high-vibration environments?',
    options: [
      'Standard plastic plugs and screws',
      'Adhesive pads',
      'Single cable ties at each point',
      'Vibration-resistant fasteners with thread-locking compounds',
    ],
    correctAnswer: 3,
    explanation:
      'High-vibration environments require vibration-resistant fasteners with thread-locking compounds to prevent loosening.',
    section: '4.4.2',
    difficulty: 'advanced',
    topic: 'Vibration-Resistant Fixings',
  },
  {
    id: 248,
    question: 'What is the purpose of using low-smoke fire-performance cables in air-handling spaces?',
    options: [
      'To meet fire safety requirements in air-handling spaces',
      'To increase the current rating of the cable',
      'To protect the cable against corrosion',
      'To reduce the cost of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Low-smoke, fire-performance cables in air-handling (plenum) spaces meet fire safety requirements by producing less smoke and fewer toxic gases when exposed to fire, protecting escape routes.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Plenum-Rated Cables',
  },
  {
    id: 249,
    question: 'When installing in areas subject to flooding, what should be considered?',
    options: [
      'Using the cheapest available equipment',
      'Waterproof equipment and elevated installation heights',
      'Mounting equipment as low as possible',
      'Removing RCD protection from the circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Flood-prone areas require waterproof equipment and elevated installation heights to prevent damage and maintain safety.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Flood Considerations',
  },
  {
    id: 250,
    question: 'What documentation should be completed after installation work?',
    options: [
      'Only the site risk assessment',
      'Only the method statement',
      'Installation certificates and test results',
      'Only the material delivery notes',
    ],
    correctAnswer: 2,
    explanation:
      'Installation certificates and test results must be completed to provide evidence of compliance with regulations and safe installation.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Installation Documentation',
  },

  // ===== A4:2026 expansion (questions 251-300) =====
  // Brings bank to 300 questions. Weighted to LO5/LO6 (verification & testing),
  // LO3.7 (JIB safe isolation), and bonding/cable-size topics.
  {
    id: 251,
    question:
      'Under BS 7671:2018+A4:2026, what is the status of AFDDs for AC final circuits supplying socket-outlets rated up to 32 A in dwellings?',
    options: [
      'Prohibited on all socket-outlet circuits in dwellings',
      'Mandatory on every final circuit regardless of building type',
      'Required only where the supply is a TT earthing system',
      'Recommended, becoming a requirement in higher-risk residential buildings',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 421.1.7 of BS 7671:2018+A4:2026 recommends AFDDs for AC final circuits to mitigate the risk of fire. The recommendation becomes a requirement in higher-risk residential buildings under the Building Safety Act 2022 framework, not within 421.1.7 itself.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'AFDD A4:2026',
  },
  {
    id: 252,
    question:
      'Which version of the IET Wiring Regulations should you be working to on a new domestic installation in 2026?',
    options: [
      'BS 7671:2018+A4:2026',
      'BS 7671:1992',
      'BS 7671:2018+A2:2022',
      'BS 7671:2008',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671:2018 incorporating Amendment 4:2026 is the current edition. A4 introduces new provisions including the AFDD recommendation in 421.1.7 and revised cable retention requirements for escape routes (522.8.5).',
    section: '4.1.1',
    difficulty: 'basic',
    topic: 'BS 7671 Currency',
  },
  {
    id: 253,
    question:
      'Regulation 522.8.5 in BS 7671:2018+A4:2026 requires cables to be supported so they are not exposed to undue mechanical strain. Which additional consideration does this regulation specifically include?',
    options: [
      'The electromagnetic interference between adjacent circuits',
      'Mechanical strain from the supported weight of the cable, including meter tails',
      'The earth fault loop impedance at the far end of the cable',
      'The ambient temperature correction factor for the cable',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 522.8.5 requires that cables and conductors are supported to avoid undue mechanical strain, taking account of the supported weight of the cable. The accompanying note confirms that consumer-unit meter tails are within scope.',
    section: '4.1.2',
    difficulty: 'intermediate',
    topic: 'Reg 522.8.5',
  },
  {
    id: 254,
    question:
      'What is the correct numerical order for the JIB safe isolation procedure as published by the Joint Industry Board?',
    options: [
      'Isolate, identify, lock off, prove dead, notify, re-prove, record',
      'Test for dead, isolate, notify, lock off, prove indicator, record',
      'Identify, notify, prove indicator, isolate, lock and label, test for dead, re-prove indicator, polarity, record',
      'Notify, isolate, test for dead, lock off, identify, polarity, record',
    ],
    correctAnswer: 2,
    explanation:
      'The JIB nine-step safe isolation procedure runs: (1) identify circuit, (2) notify affected persons, (3) prove voltage indicator on a known live source, (4) isolate, (5) lock off and label, (6) test for dead at the point of work, (7) re-prove the voltage indicator, (8) confirm polarity, (9) record the isolation. All nine steps must be followed in sequence.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'JIB Safe Isolation',
  },
  {
    id: 255,
    question:
      'Which voltage indicator standard should the device used for proving dead during safe isolation comply with?',
    options: [
      'BS EN 60898',
      'BS 1363',
      'BS 88',
      'GS38 (HSE Guidance Note)',
    ],
    correctAnswer: 3,
    explanation:
      'The voltage indicator used to prove dead must comply with HSE Guidance Note GS38, which specifies probe design (finger barriers, exposed metal limited to ~4 mm), shrouded leads, and current limitation to reduce arc-flash risk.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'GS38 Voltage Indicator',
  },
  {
    id: 256,
    question:
      'During safe isolation, why must the voltage indicator be re-proved on a known live source after testing the circuit for dead?',
    options: [
      'To confirm the indicator was still working when it showed the circuit dead, ruling out a false-safe reading',
      'To verify that the circuit-breaker has tripped correctly',
      'To check the polarity of the supply before isolation',
      'To measure the prospective fault current at the point of work',
    ],
    correctAnswer: 0,
    explanation:
      'Re-proving the voltage indicator on a known live source (proving unit or known live circuit) confirms it was functional throughout the test. A failed indicator could otherwise give a false-safe reading, leading to working live by mistake.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'JIB Re-prove',
  },
  {
    id: 257,
    question:
      'On a TN-C-S (PME) supply with meter tails of 25 mm², what minimum cross-sectional area of copper main protective bonding conductor is required by Table 54.8 of BS 7671?',
    options: [
      '6 mm²',
      '10 mm²',
      '25 mm²',
      '4 mm²',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 requires a minimum 10 mm² copper main protective bonding conductor on a PME supply where the line conductor (meter tails) is up to and including 35 mm² copper equivalent. Above 35 mm², 16 mm² is required.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 258,
    question:
      'On a TN-C-S (PME) supply with 50 mm² meter tails, what minimum copper main protective bonding conductor cross-sectional area is required?',
    options: [
      '6 mm²',
      '10 mm²',
      '16 mm²',
      '25 mm²',
    ],
    correctAnswer: 2,
    explanation:
      'Per Table 54.8, where the line conductor exceeds 35 mm² copper equivalent on a PME supply, the minimum main protective bonding conductor is 16 mm² copper.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 259,
    question:
      'What is the minimum cross-sectional area of a supplementary equipotential bonding conductor in a location containing a bath or shower where the conductor is mechanically protected?',
    options: [
      '6 mm²',
      '4 mm²',
      '1.5 mm²',
      '2.5 mm²',
    ],
    correctAnswer: 3,
    explanation:
      'A supplementary bonding conductor that is mechanically protected (e.g. enclosed in conduit or trunking) may be 2.5 mm² copper. Where unprotected, the minimum is 4 mm². Note that in a bathroom, supplementary bonding may be omitted under Regulation 701.415.2 if all the conditions for whole-circuit RCD protection and main bonding are met.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Supplementary Bonding',
  },
  {
    id: 260,
    question:
      'A BS 951 earth clamp is fitted to an extraneous-conductive-part. What wording must appear on the durably fixed warning notice required by Regulation 514.13.1?',
    options: [
      '"Safety Electrical Connection — Do Not Remove"',
      '"Danger — High Voltage"',
      '"Earth Electrode — Test Annually"',
      '"Main Earthing Terminal — Authorised Persons Only"',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 514.13.1 requires a permanent, durable warning notice marked "Safety Electrical Connection — Do Not Remove" to be securely fixed in a visible position at or near every earth electrode connection, every main earthing terminal where separated from the consumer unit, and every bonding conductor connection.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'BS 951 Warning Notice',
  },
  {
    id: 261,
    question:
      'When testing continuity of a circuit protective conductor (cpc) using the R1 + R2 method, what does the reading represent?',
    options: [
      'The resistance of the line conductor alone from origin to the furthest point',
      'The combined resistance of the line conductor and circuit protective conductor from origin to the furthest point',
      'The insulation resistance between line and the circuit protective conductor',
      'The earth fault loop impedance external to the installation',
    ],
    correctAnswer: 1,
    explanation:
      'R1 + R2 is the sum of the line conductor resistance (R1) and the circuit protective conductor resistance (R2) from the origin of the circuit to the furthest accessory. It is used to verify cpc continuity (Reg 643.2.1) and to calculate Zs at design stage (Zs = Ze + (R1 + R2)).',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'R1+R2 Continuity',
  },
  {
    id: 262,
    question:
      'Which test instrument setting and lead arrangement is correct for the R1 + R2 continuity test on a radial circuit?',
    options: [
      'Insulation tester at 500 V DC, measured between line and the cpc at the board',
      'Loop impedance tester, measured live between line and earth at the furthest socket',
      'Low-resistance ohmmeter with line and cpc linked at the board, measured at the furthest accessory',
      'Earth electrode tester, measured between the cpc and a temporary spike',
    ],
    correctAnswer: 2,
    explanation:
      'The R1 + R2 test uses a low-resistance ohmmeter (≥200 mA test current, open-circuit voltage 4–24 V) with the line and cpc temporarily linked together at the distribution board. Measurement is taken between L and cpc at the furthest point of the circuit.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'R1+R2 Method',
  },
  {
    id: 263,
    question:
      'What test method does Regulation 643.2.2 of BS 7671:2018+A4:2026 set out for verifying the continuity of a ring final circuit?',
    options: [
      'A single insulation resistance test between line and neutral at the board',
      'A live earth fault loop impedance reading taken at one socket only',
      'A polarity check at each socket with the circuit energised',
      'A three-step end-to-end measurement of r1, rn and r2, then cross-connection, with readings at each socket about (r1 + rn)/4',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.2.2 requires the three-step ring final continuity test: measure end-to-end resistances r1, rn and r2, then cross-connect L1–N2/L2–N1 and L1–cpc2/L2–cpc1 and measure at each socket. Readings around the ring should be approximately constant and equal to (r1 + rn)/4 for the L–N loop and (r1 + r2)/4 for the L–cpc loop, confirming a complete ring with no interconnections.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Test',
  },
  {
    id: 264,
    question:
      'During the third step of the ring final test (line linked to cpc), what would a reading at one socket significantly higher than the others indicate?',
    options: [
      'A possible high-resistance joint or break in the cpc at or near that socket',
      'A perfectly balanced, healthy ring final circuit',
      'A short circuit between line and neutral at the board',
      'Excessive insulation resistance on that section of the ring',
    ],
    correctAnswer: 0,
    explanation:
      'In a healthy ring, the L–cpc readings at every socket should be approximately equal to (r1 + r2)/4. A reading noticeably higher at one socket indicates a high-resistance joint or break in the cpc loop close to that socket and must be investigated before energising.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Diagnosis',
  },
  {
    id: 265,
    question:
      'According to Table 64 of BS 7671, what minimum insulation resistance is acceptable for a 230 V lighting circuit tested at 500 V DC?',
    options: [
      '0.25 MΩ',
      '1.0 MΩ',
      '0.5 MΩ',
      '10 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 specifies that for nominal circuit voltages over 50 V up to and including 500 V (other than SELV/PELV), insulation resistance is tested at 500 V DC and must be at least 1.0 MΩ to be considered satisfactory.',
    section: '4.6.3',
    difficulty: 'intermediate',
    topic: 'Table 64 IR',
  },
  {
    id: 266,
    question:
      'What test voltage and minimum insulation resistance value applies to a SELV or PELV circuit per Table 64?',
    options: [
      '500 V DC and 1.0 MΩ',
      '1000 V DC and 1.0 MΩ',
      '250 V DC and 0.5 MΩ',
      '50 V DC and 0.1 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'Table 64 requires SELV and PELV circuits to be tested at 250 V DC with a minimum insulation resistance of 0.5 MΩ.',
    section: '4.6.3',
    difficulty: 'intermediate',
    topic: 'Table 64 SELV',
  },
  {
    id: 267,
    question:
      'What test voltage and minimum insulation resistance value applies to a circuit operating above 500 V (e.g. 690 V) per Table 64?',
    options: [
      '250 V DC and 0.5 MΩ',
      '500 V DC and 1.0 MΩ',
      '1000 V DC and 10 MΩ',
      '1000 V DC and 1.0 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 specifies that circuits with a nominal voltage above 500 V are tested at 1000 V DC with a minimum insulation resistance of 1.0 MΩ.',
    section: '4.6.3',
    difficulty: 'intermediate',
    topic: 'Table 64 HV',
  },
  {
    id: 268,
    question:
      'Before carrying out an insulation resistance test on a final circuit, which of the following must be done to avoid damage to connected equipment?',
    options: [
      'Disconnect or short out voltage-sensitive items and link line to neutral where instructed',
      'Increase the test voltage to 1000 V DC to stress the insulation',
      'Energise the circuit and measure under normal load conditions',
      'Remove all circuit protective conductors before testing',
    ],
    correctAnswer: 0,
    explanation:
      'Voltage-sensitive equipment (electronic dimmers, electronic ballasts, RCDs/RCBOs with electronic components, smoke alarms, surge protective devices) must be disconnected, unplugged or short-circuited L–N before applying 500 V DC test voltage. Where line and neutral cannot be tested separately, they may be linked together and tested to earth.',
    section: '4.6.3',
    difficulty: 'intermediate',
    topic: 'IR Test Precautions',
  },
  {
    id: 269,
    question:
      'A 30 mA RCD on a final circuit is tested at rated residual operating current (1 × IΔn) using an alternating current test under BS 7671:2018+A4:2026. What is the maximum permitted disconnection time for a general non-delay type RCD?',
    options: [
      '40 ms',
      '300 ms',
      '150 ms',
      '500 ms',
    ],
    correctAnswer: 1,
    explanation:
      'Per BS 7671:2018+A4:2026, effectiveness of a general non-delay RCD is verified where the device disconnects within 300 ms when tested at rated residual operating current (IΔn) using an AC test. The previous 5 × IΔn / Table 3A timings have been superseded.',
    section: '4.6.4',
    difficulty: 'advanced',
    topic: 'RCD Trip Time',
  },
  {
    id: 270,
    question:
      'For a Type S (selective, time-delayed) RCD tested at rated residual operating current, what disconnection time band is acceptable?',
    options: [
      '0–40 ms',
      '500–1000 ms',
      '130–500 ms',
      '1000–2000 ms',
    ],
    correctAnswer: 2,
    explanation:
      'A Type S (selective) RCD has an intentional time delay so it can discriminate with downstream non-delay RCDs. Per the product standard BS EN 61008-1, at rated residual operating current it has a minimum non-actuating (delay) time of 130 ms and a maximum break time of 500 ms, giving an acceptable band of 130–500 ms.',
    section: '4.6.4',
    difficulty: 'advanced',
    topic: 'Type S RCD',
  },
  {
    id: 271,
    question:
      'Why is a polarity test (Regulation 643.6) required at every accessory before energising an installation?',
    options: [
      'To measure the insulation resistance between line and neutral at each accessory',
      'To verify the earth fault loop impedance at every socket-outlet',
      'To confirm the prospective fault current is within the device rating',
      'To confirm single-pole devices are in the line conductor and socket polarity is correct',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 643.6 requires polarity verification to confirm single-pole protective devices and switches are connected in the line conductor, that centre-contact lampholder centre pins are connected to the line conductor, and that socket-outlet wiring is correct. Reverse polarity leaves equipment energised when "switched off" and is a significant shock and fire risk.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Polarity Test',
  },
  {
    id: 272,
    question:
      'Which of the following correctly describes a functional test under Regulation 643.10?',
    options: [
      'Verifying that switchgear, controls and interlocks operate correctly when energised',
      'Measuring the insulation resistance of every final circuit',
      'Confirming the earth fault loop impedance at the origin',
      'Recording the prospective fault current at the distribution board',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.10 functional testing verifies that assemblies such as switchgear, controls, interlocks, motor controllers and similar equipment operate correctly when the installation is energised — confirming mounting, adjustment and installation are satisfactory.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Functional Test',
  },
  {
    id: 273,
    question:
      'In what order should the dead tests on a new installation normally be carried out, per BS 7671 Section 643?',
    options: [
      'Insulation resistance, polarity, continuity of protective conductors, ring continuity',
      'Continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity',
      'Polarity, insulation resistance, ring continuity, continuity of protective conductors',
      'Earth fault loop impedance, insulation resistance, polarity, continuity',
    ],
    correctAnswer: 1,
    explanation:
      'Section 643 lists the dead test sequence as: continuity of protective conductors (including main and supplementary bonding), continuity of ring final circuit conductors, insulation resistance, polarity (dead). Sequence matters because, for example, IR cannot be safely interpreted without knowing the cpc is continuous.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Test Sequence',
  },
  {
    id: 274,
    question:
      'Following the dead tests, which live tests are required before issuing the Electrical Installation Certificate?',
    options: [
      'Insulation resistance, continuity of protective conductors, polarity (dead)',
      'Ring final continuity and insulation resistance only',
      'Earth fault loop impedance (Ze and Zs), prospective fault current, RCD operation, functional tests',
      'Continuity of protective conductors and main bonding only',
    ],
    correctAnswer: 2,
    explanation:
      'Live tests required before certification include: earth electrode resistance where applicable; earth fault loop impedance Ze at the origin and Zs at every relevant point; prospective fault current at the origin; RCD operation; and functional testing of switchgear and controlgear.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Live Test Sequence',
  },
  {
    id: 275,
    question:
      'For a 32 A Type B circuit-breaker complying with BS EN 60898, what is the maximum permitted Zs value at the standard ambient temperature given in Table 41.3 of BS 7671:2018+A4:2026?',
    options: [
      '1.50 Ω',
      '1.44 Ω',
      '1.10 Ω',
      '1.37 Ω',
    ],
    correctAnswer: 3,
    explanation:
      'Table 41.3 of BS 7671:2018+A4:2026 gives a maximum Zs of 1.37 Ω for a 32 A Type B circuit-breaker. The previously published 1.44 Ω value (under earlier amendments) has been superseded; always work to the current A4 value.',
    section: '4.6.6',
    difficulty: 'advanced',
    topic: 'Table 41.3 Zs',
  },
  {
    id: 276,
    question:
      'Which document is the primary source for completion certification of a new installation under BS 7671?',
    options: [
      'The Electrical Installation Certificate with its Schedule of Inspections and Schedule of Test Results',
      'A Minor Electrical Installation Works Certificate alone',
      'An Electrical Installation Condition Report (EICR)',
      'The manufacturer\'s declaration of conformity for the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.1.1 requires that on completion of a new installation or addition/alteration, an Electrical Installation Certificate (EIC) is issued together with a Schedule of Inspections and a Schedule of Test Results. The EIC is signed by competent persons for design, construction and inspection/testing.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'EIC Reg 644.1.1',
  },
  {
    id: 277,
    question:
      'Which BS 7671 regulation requires that information on the design, construction, inspection and testing of an installation be provided to the person ordering the work?',
    options: [
      'Regulation 522.6',
      'Regulation 132.13',
      'Regulation 132.12',
      'Regulation 411.1',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 132.13 of BS 7671:2018+A4:2026 requires that documentation including drawings, diagrams, charts and information on installed equipment is provided. (Note: 132.12 covers a different chapter scope; the documentation reference is 132.13.)',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Reg 132.13 Documentation',
  },
  {
    id: 278,
    question:
      'After installing the cpc and main bonding, which test is performed first as part of initial verification?',
    options: [
      'Insulation resistance between all live conductors and earth',
      'Earth fault loop impedance at the origin of the installation',
      'Continuity of protective conductors, including main and supplementary bonding',
      'Polarity of every socket-outlet on the installation',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 643.2.1 requires continuity of every protective conductor (including main and supplementary bonding) to be verified by an electrical test using a low-resistance ohmmeter. This is the first dead test in the sequence because subsequent tests rely on a verified earth path.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Reg 643.2.1',
  },
  {
    id: 279,
    question:
      'A low-resistance ohmmeter used for continuity testing should provide what minimum short-circuit test current and what no-load voltage range?',
    options: [
      'At least 1 mA test current with a no-load voltage of 500 V DC',
      'At least 25 mA test current with a no-load voltage of 50 V AC',
      'At least 1 A test current with a no-load voltage of 230 V AC',
      'At least 200 mA short-circuit test current with a no-load voltage of 4 V to 24 V AC or DC',
    ],
    correctAnswer: 3,
    explanation:
      'A low-resistance ohmmeter for continuity testing must deliver a short-circuit test current of at least 200 mA with a no-load voltage between 4 V and 24 V (AC or DC). This is sufficient to detect high-resistance joints in protective conductors.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Continuity Tester Spec',
  },
  {
    id: 280,
    question:
      'What is the recommended maximum pulling tension for stranded copper cables drawn into conduit using a stocking grip, per the IET Electrical Installation Design Guide?',
    options: [
      'About 50 N/mm² of conductor cross-section (≈ 5 kg/mm²)',
      'About 5 N/mm² of conductor cross-section',
      'About 500 N/mm² of conductor cross-section',
      'There is no recommended limit on pulling tension',
    ],
    correctAnswer: 0,
    explanation:
      'The IET Electrical Installation Design Guide recommends a maximum pulling tension of approximately 50 N/mm² (≈ 5 kg/mm²) of conductor cross-sectional area for copper cables pulled with a stocking grip. Excessive tension stretches the conductor and damages insulation.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Pulling Tension',
  },
  {
    id: 281,
    question:
      'What is the typical minimum bend radius for steel-wire armoured (SWA) cable?',
    options: [
      '4 × overall diameter',
      '8 × overall diameter',
      '6 × overall diameter',
      '20 × overall diameter',
    ],
    correctAnswer: 1,
    explanation:
      'Steel-wire armoured (SWA) cable typically has a minimum bend radius of 8 × the overall diameter to avoid damaging the armour and insulation. Mineral-insulated copper-clad (MICC) is typically 6× and unarmoured cables are typically 6×. Always check the manufacturer\'s data sheet.',
    section: '4.3.1',
    difficulty: 'intermediate',
    topic: 'SWA Bend Radius',
  },
  {
    id: 282,
    question:
      'Under BS 7671:2018+A4:2026 Regulation 522.8.5, cables installed along an emergency escape route must be supported in a way that:',
    options: [
      'Allows the cable to be removed easily for maintenance',
      'Increases the current-carrying capacity of the cable',
      'Prevents premature collapse of the cable in a fire by using metallic fixings rather than plastic clips alone',
      'Reduces electromagnetic interference along the escape route',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 522.8.5 (escape route cable retention, A4:2026) requires that wiring systems on escape routes are supported so that they will not be liable to premature collapse in a fire. In practice this means using metallic clips, saddles, cleats or supports rather than relying on plastic cable clips, ties or trunking that would soften and release the cable.',
    section: '4.4.1',
    difficulty: 'advanced',
    topic: 'Escape Route Retention',
  },
  {
    id: 283,
    question:
      'Which HSE document, alongside the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th edition), provides guidance on PAT/in-service inspection on construction sites?',
    options: [
      'HSG47 — Avoiding danger from underground services',
      'HSG150 — Health and safety in construction',
      'INDG236 — Maintaining portable electrical equipment in low-risk environments',
      'HSG107 — Maintaining portable electric equipment',
    ],
    correctAnswer: 3,
    explanation:
      'HSG107 "Maintaining portable electric equipment" — used together with the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th edition) — is the appropriate HSE guidance for higher-risk environments such as construction sites. INDG236 is the lighter-touch leaflet aimed at low-risk office settings.',
    section: '4.7.3',
    difficulty: 'advanced',
    topic: 'HSG107 vs INDG236',
  },
  {
    id: 284,
    question:
      'When selecting cable sizes from drawings (LO 4.1), which factor must be considered alongside the design current Ib?',
    options: [
      'Rating factors for ambient temperature, grouping and thermal insulation, so that Iz ≥ In ≥ Ib',
      'Only the colour-coding scheme used for the conductors',
      'Only the length of the cable run from the board',
      'Only the cost per metre of the chosen cable',
    ],
    correctAnswer: 0,
    explanation:
      'Cable selection must apply rating factors for ambient temperature (Ca), thermal insulation (Ci), grouping (Cg) and, where used, rewireable fuses (Cf), so that the corrected tabulated capacity It × product of factors gives Iz ≥ In ≥ Ib. Voltage drop and earth fault loop impedance must also be checked.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Cable Sizing',
  },
  {
    id: 285,
    question:
      'When fixing a BS 951 earth clamp to a metallic water service pipe for main protective bonding, where should the connection be made?',
    options: [
      'On the street side of the insulating section, before the incoming stopcock',
      'On the consumer\'s side of any insulating section, within 600 mm of the meter outlet union or as near as practicable to the point of entry',
      'At the highest accessible point of the internal pipework',
      'At any convenient point along the pipe inside the building',
    ],
    correctAnswer: 1,
    explanation:
      'The main protective bonding connection to a metallic water installation pipe must be made on the consumer\'s side of any insulating section, within 600 mm of the meter outlet union, or as near as practicable to the point of entry of the pipe into the building (Regulation 544.1.2).',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'BS 951 Position',
  },
  {
    id: 286,
    question:
      'During termination of conductors at a busbar or terminal, which BS 7671 regulation requires that the connection has appropriate mechanical strength and electrical continuity, with no appreciable mechanical strain on the conductor?',
    options: [
      'Regulation 643.7.3',
      'Regulation 411.3.1.1',
      'Regulation 526.1 and 526.5',
      'Regulation 132.13',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 526.1 requires every connection between conductors, and between conductors and equipment, to provide durable electrical continuity and adequate mechanical strength. Regulation 526.5 specifies that terminations must be enclosed (e.g. in an accessory, equipment enclosure or junction box of suitable material) and accessible for inspection unless the joint is maintenance-free per 526.3.',
    section: '4.5.1',
    difficulty: 'intermediate',
    topic: 'Reg 526 Terminations',
  },
  {
    id: 287,
    question:
      'A maintenance-free connection (e.g. a crimped or compression joint complying with the relevant standard) may be installed in an inaccessible position only if which of the following applies?',
    options: [
      'It is wrapped in insulating tape and labelled for future access',
      'It is recorded on the Schedule of Test Results',
      'It is positioned within 600 mm of the consumer unit',
      'It is made in accordance with Regulation 526.3 (e.g. a compression, brazed or welded joint, or part of compliant equipment)',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 526.3 lists the categories of joint that may be inaccessible, including compression joints made to the manufacturer\'s instructions, brazed/welded/soldered joints, joints in cables in the ground (with appropriate sheathing), and joints forming part of equipment complying with its product standard.',
    section: '4.5.1',
    difficulty: 'advanced',
    topic: 'Reg 526.3 Maintenance-Free',
  },
  {
    id: 288,
    question:
      'When stripping the insulation from a single-core 2.5 mm² conductor for termination at a 13 A socket-outlet, which is the most important quality criterion?',
    options: [
      'Removing only the insulation needed so no bare conductor shows outside the terminal, with no strands nicked or broken',
      'Stripping back as much insulation as possible for a secure grip',
      'Leaving a short length of bare conductor visible for inspection',
      'Twisting the conductor with the adjacent core before terminating',
    ],
    correctAnswer: 0,
    explanation:
      'A good termination removes the minimum insulation required so that no bare conductor protrudes from the terminal, with no strands nicked, severed or splayed outside the terminal. Nicked strands reduce cross-sectional area and create a high-resistance joint that can overheat under load.',
    section: '4.5.2',
    difficulty: 'basic',
    topic: 'Termination Quality',
  },
  {
    id: 289,
    question:
      'Why must the line, neutral and cpc terminations at a 13 A socket-outlet be tightened to the manufacturer\'s specified torque?',
    options: [
      'To make the terminal easier to undo during future maintenance',
      'To ensure low-resistance connections that will not loosen and overheat, without over-tightening that shears strands',
      'To increase the current-carrying capacity of the conductor',
      'To compensate for using an undersized conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer-specified torque values produce a reliable low-resistance connection. Under-tightening causes loose joints that arc and overheat; over-tightening can crush stranded conductors or strip the terminal. A calibrated torque screwdriver should be used wherever a torque value is specified.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Termination Torque',
  },
  {
    id: 290,
    question:
      'What is the correct sequence for terminating an SWA cable at a steel gland?',
    options: [
      'Terminate cores, fit gland, trim armour, strip sheath, cut to length',
      'Fit shroud, fit gland, cut to length, strip sheath, terminate cores',
      'Cut to length, strip outer sheath, trim armour to gland length, fit gland and lock-nut, terminate cores, fit shroud',
      'Strip sheath, terminate cores, cut to length, trim armour, fit gland',
    ],
    correctAnswer: 2,
    explanation:
      'SWA termination procedure: cut to length, strip the outer LSF/PVC sheath to the required dimension, trim the steel-wire armour to the gland\'s armour cone length, fit the gland body and lock-nut to the enclosure (with earth tag where required), terminate the cores at the equipment, and fit the protective shroud. The armour itself provides the cpc and must be terminated correctly to maintain continuity.',
    section: '4.5.3',
    difficulty: 'advanced',
    topic: 'SWA Termination',
  },
  {
    id: 291,
    question:
      'When using OSG Appendix C / Table H1 to size a conduit run for cables, what method is used?',
    options: [
      'Calculate the geometric cross-sectional area of the cables and the conduit directly',
      'Allow a fixed 45% fill regardless of run length or number of bends',
      'Use one cable per conduit and ignore any factors',
      'Sum the cable factors and check the total does not exceed the conduit factor',
    ],
    correctAnswer: 3,
    explanation:
      'The On-Site Guide Appendix C / Table H1 method assigns a "cable factor" to each conductor and a "conduit factor" to each size of conduit (taking length and number of bends into account). The sum of cable factors must not exceed the conduit factor. The raw geometric area calculation does not account for cable jam, friction or pulling effort.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'OSG Cable Factor',
  },
  {
    id: 292,
    question:
      'Why does the OSG conduit factor table reduce the allowable fill as the run length and number of bends increase?',
    options: [
      'Because friction and the risk of cable jamming rise with length and bends, so a lower fill keeps pulling tensions safe',
      'Because longer runs carry more current and need more space for heat',
      'Because longer runs require thicker conduit walls for strength',
      'Because the regulations cap conduit length at a fixed maximum',
    ],
    correctAnswer: 0,
    explanation:
      'Pulling friction increases with run length and the number of bends. The OSG factors reduce permissible fill so that pulling tensions stay within safe limits and cables are not damaged. A short straight run permits a higher fill than a long run with multiple bends.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'OSG Run Length',
  },
  {
    id: 293,
    question:
      'Which Regulation states that the protective measure "automatic disconnection of supply" requires (a) a protective earthing arrangement and (b) main protective bonding of extraneous-conductive-parts?',
    options: [
      'Regulations 522.6.1 and 522.6.2',
      'Regulations 411.3.1.1 and 411.3.1.2',
      'Regulations 643.2.1 and 643.2.2',
      'Regulations 514.13.1 and 514.13.2',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.1.1 requires a protective equipotential earthing arrangement, and Regulation 411.3.1.2 requires main protective bonding of extraneous-conductive-parts (such as metallic gas, water and structural pipework entering the building) as part of the protective measure ADS.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Reg 411.3.1.1/.2',
  },
  {
    id: 294,
    question:
      'When testing functionality of an RCBO that has both overcurrent and residual-current protection, which two checks should be performed?',
    options: [
      'Measure insulation resistance and earth fault loop impedance only',
      'Press the test button only and record it as a pass',
      'Operate the integral test button and verify trip time with an RCD tester (Reg 643.8)',
      'Confirm polarity and prospective fault current only',
    ],
    correctAnswer: 2,
    explanation:
      'The integral test button confirms the device operates mechanically but does not verify that disconnection occurs within the BS 7671 disconnection-time limit. Under Regulation 643.8, the effectiveness of additional protection by an RCD is verified using suitable test equipment (an instrument RCD test at the rated residual operating current) — a general non-delay RCD must disconnect within 300 ms.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'RCBO Functional Test',
  },
  {
    id: 295,
    question:
      'When recording test results on the Schedule of Test Results, which of the following must be included for each circuit?',
    options: [
      'Only the overall pass or fail result for the installation',
      'Only the insulation resistance reading for each circuit',
      'Only the names of the persons who carried out the work',
      'Circuit reference, conductor sizes, device details, continuity, IR, polarity, Zs and RCD time where applicable',
    ],
    correctAnswer: 3,
    explanation:
      'A complete Schedule of Test Results entry per circuit includes: circuit reference and description, conductor csa, protective device type/rating/breaking capacity, continuity readings (R1+R2 or rn, r2, ring values), IR readings (L–N, L–E, N–E or all conductors to earth), polarity, measured Zs, and RCD trip time where the circuit is RCD-protected.',
    section: '4.6.6',
    difficulty: 'intermediate',
    topic: 'Schedule of Test Results',
  },
  {
    id: 296,
    question:
      'During safe isolation, after locking off the isolator, which item should be attached to indicate the isolation and identify the responsible person?',
    options: [
      'A durable caution notice or tag identifying who applied the lock and the reason for isolation',
      'A copy of the circuit schedule for the distribution board',
      'A label stating the prospective fault current at that point',
      'A record of the insulation resistance for the isolated circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Step 5 of the JIB safe isolation procedure (lock and label) requires both a lock-off device and a durable caution notice or tag identifying who carried out the isolation, the date/time and the reason. This prevents anyone else re-energising the circuit and supports the chain of responsibility.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Lock and Label',
  },
  {
    id: 297,
    question:
      'A proving unit (e.g. compliant with the manufacturer\'s GS38-aligned design) is used to:',
    options: [
      'Measure the earth fault loop impedance at the point of work',
      'Verify a voltage indicator is working before and after testing for dead, without using a live source',
      'Confirm the circuit-breaker has tripped under fault conditions',
      'Measure the insulation resistance of the isolated circuit',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit provides a known, intrinsically safe voltage source so the operator can confirm the voltage indicator is working both before testing the circuit for dead and afterwards. This avoids the need to find a known live source on site, which carries its own risks.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Proving Unit',
  },
  {
    id: 298,
    question:
      'What is the recommended approach when working on an installation where multiple circuits could be live in the same enclosure (e.g. a distribution board)?',
    options: [
      'Isolate only the circuit being worked on and leave the rest live',
      'Work live throughout to avoid disrupting other circuits',
      'Isolate the whole board where practicable, lock off circuits within reach, and barrier off remaining live parts (EAWR Reg 14)',
      'Rely on the RCD to provide protection while working live',
    ],
    correctAnswer: 2,
    explanation:
      'Where possible the entire board should be isolated. If only part can be isolated, every other circuit within reach should be locked off or live parts must be barriered/insulated to prevent inadvertent contact. Working live is permitted only where strict criteria of Electricity at Work Regulation 14 are met (unreasonable to work dead, reasonable to work live, suitable precautions).',
    section: '4.7.4',
    difficulty: 'advanced',
    topic: 'EAWR Reg 14',
  },
  {
    id: 299,
    question:
      'A risk assessment for installation work in an occupied office identifies vulnerable persons (members of the public). Which control should be prioritised?',
    options: [
      'Issuing PPE to members of the public in the area',
      'Relying on a verbal warning to occupants at the start of the day',
      'Completing the work as quickly as possible to reduce exposure',
      'Segregating the work area with barriers and signage, scheduling disruptive tasks out of hours, and using 110 V or RCD-protected tools',
    ],
    correctAnswer: 3,
    explanation:
      'Where vulnerable persons are present, the hierarchy of controls applies: eliminate or substitute hazards (work out of hours), engineering controls (barriers, dust extraction, 110 V CTE tooling or RCD protection), administrative controls (signage, briefings), then PPE. Segregation of the work area and protection of the public take priority over convenience.',
    section: '4.7.5',
    difficulty: 'intermediate',
    topic: 'Risk Controls',
  },
  {
    id: 300,
    question:
      'After completing the dead and live tests on a new installation, which of the following must be issued before the installation is put into service under BS 7671:2018+A4:2026?',
    options: [
      'An EIC signed for design, construction and inspection/testing, with the Schedules of Inspections and Test Results',
      'A Minor Works Certificate covering the whole installation',
      'An Electrical Installation Condition Report for the new work',
      'Only a verbal confirmation that the tests have passed',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.1.1 requires the EIC, Schedule of Inspections and Schedule of Test Results to be issued on completion of a new installation or addition/alteration. Regulation 132.13 also requires that documentation, drawings and information are provided to the person ordering the work so the installation can be operated and maintained safely.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'EIC Handover',
  },
];

// Helper functions to filter questions
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module4QuestionBank.filter((q) => q.section.startsWith(section));
};

export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuestionBank[] => {
  return module4QuestionBank.filter((q) => q.difficulty === difficulty);
};

export const getRandomQuestions = (
  count: number,
  weights: { basic: number; intermediate: number; advanced: number } = {
    basic: 40,
    intermediate: 45,
    advanced: 15,
  }
): QuestionBank[] => {
  const totalWeight = weights.basic + weights.intermediate + weights.advanced;
  const basicCount = Math.round((weights.basic / totalWeight) * count);
  const intermediateCount = Math.round((weights.intermediate / totalWeight) * count);
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
