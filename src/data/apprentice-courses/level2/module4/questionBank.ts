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
      'Connect the power tools',
      'Install the containment first',
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
      'The consumer unit manufacturer\'s data sheet',
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
      'Insulation colour, sheath colour, and drum labelling',
      'The delivery driver\'s name, paperwork, and vehicle registration',
      'The retail price, the discount given, and the supplier\'s payment terms',
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
      'To confirm that the correct cable colours have been ordered for each circuit',
      'To record the resistance of every protective conductor shown on the drawings',
      'To schedule deliveries so that materials arrive in the correct order on site',
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
      'Torque screwdriver',
      'Steel rule',
      'Claw hammer',
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
      'What setting-out tolerance is normally specified for the position of electrical accessories on a construction drawing?',
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
      'Cables may be run diagonally across a wall provided they are clipped direct',
      'Cables must run within prescribed safe zones to avoid accidental damage',
      'Cables only need extra protection where they enter a metal accessory box',
      'Safe zones only apply to cables buried deeper than 50 mm in plaster',
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
      'Digital moisture meter probe',
      'Ultrasonic distance meter',
      'Cable and pipe detector',
      'Two-pole voltage indicator',
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
      'To make the conduit run look neater along the wall surface',
      'To use less conduit material and fewer couplings per run',
      'To allow the conduit to be painted more easily after installation',
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
    question: 'What is the minimum bend radius for 20 mm PVC conduit, expressed as a multiple of its outside diameter?',
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
      'A pipe wrench and an engineer\'s vice',
      'Conduit bending machine or former',
      'A hacksaw and a round second-cut file',
      'An adjustable spanner and grips',
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
      'The conduit changes colour along the outside of the bend',
      'The conduit becomes electrically live along its whole length',
      'Kinking or flattening that restricts cable installation',
      'The conduit thread loosens at the coupling nearest the bend',
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
      'For bonding conduit to an enclosure to maintain earth continuity',
      'For drawing cables through a completed run using a leader tape',
      'For holding the conduit round while it is cut with a hacksaw and reamed',
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
    question: 'What is the maximum spacing for supports on a horizontal run of 20 mm conduit?',
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
      'Double-sided adhesive pads',
      'Plastic plugs and screws',
      'Softwood wedges and nails',
      'Nylon cable ties',
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
      'Colour matching of all cables in the same compartment',
      'Installation of the cables in alphabetical order of circuit',
      'Segregation requirements to prevent interference',
      'A separate compartment for every individual cable run',
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
    difficulty: 'basic',
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
      'Burn the insulation off the cores with a hot air gun',
      'Use proper stripping tools to avoid nicking the conductor',
      'Score deeply all round the sheath with a sharp trimming knife',
      'Pull the insulation off using a pair of long-nose pliers',
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
      'To colour-code the conductor so it can be identified at both ends',
      'To increase the current-carrying capacity of the conductor',
      'To prevent strand separation and ensure reliable connections',
      'To provide additional insulation along the length of the cable',
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
      'Self-amalgamating tape',
      'Plastic saddle clamps',
      'Soldered end fittings',
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
      'Allows the connection to be undone more easily at a later date',
      'Reduces the cost of the terminals used on the contract',
      'Makes the connection waterproof and dust-tight in use',
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
    question: 'What is the minimum acceptable insulation resistance for a 230 V circuit tested at 500 V DC?',
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
      'Use whichever socket outlet is nearest to the work area',
      'Work at a faster pace so the task is finished sooner',
      'Rely on the double insulation marked on the case',
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
      'What determines whether a stepladder is suitable for a given task at height?',
    options: [
      '2.5 metres',
      '3 metres',
      '4.5 metres',
      '1.5 metres',
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
      '45 degrees (1:1)',
      '60 degrees (1.7:1 ratio)',
      '75 degrees (4:1 ratio)',
      '90 degrees (1:0)',
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
      'The shortest possible route, and nothing else',
      'The preference of the building occupier, whatever route that means',
      'Room colour scheme, carpet finish, and furniture layout',
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
      'A single fixing at the top of the run so the cable hangs freely',
      'Support only where the cable passes through a floor or a ceiling',
      'Regular support to prevent cables supporting their own weight',
      'Closer support on horizontal runs than on vertical runs',
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
      'To bond the cable sheath to the earthing conductor',
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
    question: 'Which method does the On-Site Guide use to decide how many cables a conduit will take?',
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
      'Lay them flat on the ground and roll cable off the top',
      'Stack them on top of one another to save storage space',
      'Leave them uncovered outside in direct sunlight and rain',
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
      'Drill straight through from one side, at maximum speed, to keep the dust down',
      'Check for services, drill pilot hole, and drill from both sides to prevent breakout',
      'Drill at a shallow angle, from one side only, so that hidden pipes are pushed aside',
      'Start with the largest bit, then step down through smaller bits to the finished size',
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
    question: 'What is the maximum depth of a horizontal chase in a solid wall, expressed as a proportion of the wall thickness?',
    options: [
      'Maximum 1/2 of the total wall thickness',
      'Maximum 1/3 of the finished wall thickness',
      'Maximum 1/6 of the wall thickness',
      'Maximum 1/5 of the wall depth',
    ],
    correctAnswer: 2,
    explanation:
      'Horizontal chases in solid walls should typically not exceed 1/6 of the wall thickness (vertical chases up to 1/3) to maintain the structural integrity of the wall.',
    section: '4.2.6',
    difficulty: 'intermediate',
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
      'Twist all the cores together to form a single connection',
      'Strip every core to exactly the same length before fitting',
      'Leave the outer sheath in place over the cores in the box',
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
      'Insulation resistance test',
      'Continuity test',
      'Polarity test',
      'Voltage test',
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
      'Work only during daylight hours with a trained banksman present',
      'Wear high-visibility clothing and insulating gloves at all times',
      'Maintain safe clearance distances and use goal post barriers',
      'Keep a dry powder extinguisher in the site vehicle cab',
    ],
    correctAnswer: 2,
    explanation:
      'When working near overhead lines, maintain safe clearance distances and use goal post barriers or similar to prevent accidental contact.',
    section: '4.7.5',
    difficulty: 'intermediate',
    topic: 'Overhead Line Safety',
  },

  {
    id: 51,
    question: 'What should be checked before energising a new circuit?',
    options: [
      'That the client has seen the work, is satisfied with it, and has signed it off',
      'That the heaviest cable available, rather than the calculated size, has been used',
      'That the circuit has stood de-energised for at least 24 hours, letting the insulation settle',
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
      'To improve the electrical contact at each cable termination',
      'To seal the conduit against moisture ingress at the ends',
      'To make the cable sheath easier to strip at each end of the cable run',
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
      'To list the cost of all the materials required for the job',
      'To record the test results obtained after the installation is complete',
      'To provide a detailed plan of how work will be carried out safely',
      'To confirm the qualifications of the design engineer for the contract',
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
      'For every routine task carried out on a domestic property',
      'For work that has already been completed and handed over',
      'For any job where more than one operative is on the site',
      'For high-risk activities or work in hazardous areas',
    ],
    correctAnswer: 3,
    explanation:
      'A permit to work is required for high-risk activities or work in hazardous areas to ensure proper safety controls are in place.',
    section: '4.1.4',
    difficulty: 'basic',
    topic: 'Permit to Work',
  },
  {
    id: 56,
    question: 'What information should be included on installation drawings?',
    options: [
      'Cable routes, equipment locations, circuit details, and earthing arrangements',
      'The names, trades, and qualifications of every operative on the contract',
      'The programme dates for each trade, and the weather expected on site',
      'Supplier part numbers, unit prices, and delivery dates for each item',
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
      'Use them anyway to avoid delaying the job further',
      'Report the discrepancy and obtain correct materials',
      'Return them to the supplier without informing the supervisor',
      'Modify them on site so that they suit the specification',
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
      'To allocate tools and plant to each member of the site team',
      'To record the hours worked by each operative during the shift',
      'To brief the team on safety hazards and work procedures',
      'To check that all portable tools on site have been PAT tested',
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
      'The finished ceiling line',
      'Any convenient mark',
      'The nearest corner',
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
    question: 'Within what height band above finished floor level should socket-outlets be positioned in a dwelling?',
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
      'Sharp carpenter\'s pencil',
      'Chalk or marker pen',
      'Soft wax crayon stick',
      'Engineer\'s scriber',
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
    difficulty: 'basic',
    topic: 'Thermal Movement',
  },
  {
    id: 63,
    question: 'What is the purpose of using a laser level for installation work?',
    options: [
      'To trace the route of concealed cables and pipework before chasing a wall',
      'To measure the resistance of a circuit without disconnecting conductors',
      'To mark and cut lengths of conduit squarely before threading and reaming',
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
      'Bend the conduit as tightly as the bending machine will allow',
      'Heat the conduit with a blowlamp until it glows before bending',
      'Make several small bends close together along the conduit run',
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
    question: 'What is the minimum internal bend radius for steel conduit, expressed as a multiple of its outside diameter?',
    options: [
      '2.5 times the outside diameter',
      '3.5 times the diameter',
      '4.5 times the outside diameter',
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
      'For 20 mm PVC conduit bent cold by hand',
      'Where a bending spring would be quicker',
      'For large diameter or heavy-wall conduit',
      'For cutting and reaming conduit to length',
    ],
    correctAnswer: 2,
    explanation:
      'Hydraulic benders are used for large diameter or heavy-wall conduit where manual bending tools would be insufficient.',
    section: '4.3.3',
    difficulty: 'basic',
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
      'To cut the conduit cleanly, square to its axis',
      'To cut a clean, straight thread on the conduit end',
      'To remove sharp, raised burrs from inside the cut end',
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
    question: 'What is the maximum spacing between supports for a horizontal cable tray carrying its rated load?',
    options: [
      '1.25m',
      '1.5m',
      '2.25m',
      '3.25m',
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
      'To remove the need for fire-stopping at wall penetrations',
      'To reduce electromagnetic interference',
      'To allow cables to be installed more quickly',
      'To maintain circuit integrity during a fire',
    ],
    correctAnswer: 3,
    explanation:
      'Fire-rated cable trunking maintains circuit integrity during a fire, ensuring essential services continue to operate for evacuation.',
    section: '4.4.3',
    difficulty: 'basic',
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
      'To earth the conduit back to the main earthing terminal',
      'To assist with cable pulling during installation',
      'To seal the conduit against moisture ingress',
      'To support the conduit on long horizontal runs',
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
      'Route the cables as close as possible to share the warmth',
      'Use a smaller cable size close to the heat source',
      'Maintain adequate clearance or use heat-resistant cables',
      'Remove the insulation from any cable near the heat source',
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
      'Leave the conductor slightly loose, allowing for thermal movement',
      'Wrap the conductor in tape, then insert it into the terminal',
      'Solder the conductor solid, then insert it into a screw terminal',
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
      'For solid single-core conductors in fixed domestic wiring',
      'For connections that must be undone and remade frequently',
      'For extra-low voltage lighting circuits operating below 50 V',
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
      'A pair of side cutters and a bench vice',
      'Proper crimping tool with correct dies',
      'A soldering iron and heat shrink',
      'An adjustable spanner and grips',
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
      'To raise the current-carrying capacity of the busbars inside the enclosure',
      'To carry the weight of heavy cables so that the glands are not loaded',
      'To provide multiple cable entries while maintaining enclosure integrity',
      'To bond every cable gland to the enclosure in place of an earth tag',
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
      'Cut it flush and leave it unconnected in the box',
      'Insulate it fully so that it can carry no current at all',
      'Fold it back over the outer sheath and tape it in place',
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
      'The main earthing conductor at the earthing terminal',
      'All circuit protective conductors within the board',
      'The supply neutral conductor at the origin of the installation',
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
    question: 'What does an insulation resistance reading below the Table 64 minimum indicate?',
    options: [
      'Possible insulation breakdown or moisture ingress',
      'A perfectly healthy circuit with no faults',
      'That the test voltage was set too high for the circuit',
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
      'To measure the insulation resistance of the cable to earth',
      'To verify protective device operation under fault conditions',
      'To confirm that the correct cable colours have been used throughout',
      'To check the mechanical strength of every terminal connection made',
    ],
    correctAnswer: 1,
    explanation:
      'Earth fault loop impedance testing verifies that protective devices will operate quickly enough under earth fault conditions.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Earth Fault Loop Testing',
  },
  {
    id: 86,
    question: 'What PPE should be worn when using angle grinders?',
    options: [
      'A dust mask and gloves, as the guard contains the sparks',
      'Gloves and a high-visibility vest, plus a standard dust mask',
      'Safety glasses, face shield, gloves, and hearing protection',
      'Steel-toe boots and a hard hat, as for general site work',
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
    question: 'What limits the length of an extension lead supplying a power tool on site?',
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
      'Three operatives must be present (one footing the ladder and two working above)',
      'Maintain three points of contact (two hands and one foot or two feet and one hand)',
      'The ladder must be secured at three points (the top, the bottom and a mid-stile)',
      'The ladder must be formally inspected at three-monthly intervals (then tagged for use)',
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
      'Burn it on site to reduce the collection volume',
      'Leave it in the walkways until the job is done',
      'Dispose of properly according to waste regulations',
      'Bury any metal offcuts in the ground before backfilling',
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
      'Hand tools, power tools, and access equipment to be used on site',
      'Material cost, plant hire, and the labour allowance for the contract',
      'The names of the client, the supplier and the main contractor',
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
      'Once the job has been completed and signed off',
      'After a reportable accident has occurred',
      'Never, once it has been signed by the manager',
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
      'List the expenses, mileage, and overtime claimed by each operative',
      'Replace the risk assessment, the method statement, and the permit to work',
      'Record progress, issues, and decisions for future reference',
      'Record the supplier prices, discounts, and delivery dates for materials',
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
      'The preference of the most senior operative, whatever the programme says',
      'The cheapest order of work, whether or not it is practical',
      'The most visible work first, so the client sees progress early',
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
    question: 'Within what height band above finished floor level should light switches be positioned in a dwelling?',
    options: [
      '1200mm from finished floor level',
      '900mm above the finished floor level',
      '1500mm from the finished floor level',
      '1800mm above the finished floor level',
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
      'A folding rule or a set square',
      'A spirit level or a plumb line',
      'Steel tape measure or laser measure',
      'A pair of dividers or callipers',
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
      'To reduce the number of fixings needed to hold each accessory',
      'To remove the need to check each height with a spirit level',
      'To allow the boxes to be fixed before the walls are plastered',
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
      'The conduit loses earth continuity, so it must be re-bonded at the bend',
      'The conduit may kink or collapse, restricting cable installation',
      'The enclosed cables gain capacity, as the tighter bend improves heat transfer',
      'The conduit becomes easier to thread, though harder to cut squarely',
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
      'It removes the need to follow a minimum bend radius, whatever the size',
      'It allows a smaller conduit size, since the bends come out tighter',
      'It earths the conduit at each bend, through the machine\'s former',
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
    difficulty: 'basic',
    topic: 'Multiple Bends',
  },
  {
    id: 106,
    question: 'What is the maximum spacing for supports on a vertical run of 50 mm by 50 mm trunking?',
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
    difficulty: 'basic',
    topic: 'Heavy-Duty Fixings',
  },
  {
    id: 108,
    question: 'What is the purpose of using different coloured cables in installations?',
    options: [
      'Identification of different conductors and functions',
      'To indicate the current rating of each conductor',
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
      'To satisfy the requirement for durable warning notices',
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
      'Strip all of the cores together, in a single cut, using a knife',
      'Remove the outer sheath only, leaving the cores covered',
      'Strip the individual cores first, then the outer sheath',
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
      'Front plate appearance, accessory finish, and colour match only',
      'Equipment retail value, cable value, and the total spend on site',
      'Supply voltage, frequency, and phase rotation at the incoming terminals',
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
      'Energise the circuit, then monitor it in service',
      'Record the result, and issue the certificate',
      'Retest, average the readings, and record the best',
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
    difficulty: 'basic',
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
      'To allocate tools and plant to each operative for the day\'s work',
      'To record the hours worked so that timesheets can be completed',
      'To ensure all team members understand hazards and safety procedures',
      'To confirm the cost of materials to be drawn from the site store',
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
      'After an incident has been reported to the HSE',
      'At the end of the project during handover',
      'Never, once they have been agreed with the client',
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
      'Follow the drawing exactly and make the site fit it',
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
      'To record the test results obtained for each final circuit',
      'To ensure materials arrive when needed and in correct quantities',
      'To list the qualifications held by each site operative',
      'To document alterations made to the existing installation',
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
      'Lowest installation cost, shortest cable runs, and least labour',
      'Cable appearance, colour, and how tidy the runs look',
      'Safety, capacity, and protection requirements',
      'Distribution unit colour, make, and enclosure style',
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
      'Detects concealed cables and pipes behind a plastered wall surface',
      'Measures vertical drops between floors where a plumb line will not hang',
      'Checks that cable chases are cut to a consistent depth along a wall',
      'Provides accurate level reference over long distances and around obstacles',
    ],
    correctAnswer: 3,
    explanation:
      'Water levels provide accurate level reference over long distances and around obstacles where spirit levels cannot be used.',
    section: '4.2.2',
    difficulty: 'basic',
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
      'Pencil or biro',
      'Scriber or marker pen',
      'Chalk or crayon',
      'Charcoal or crayon',
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
      'Conduit colour-coding, saddle size, and box lid finish',
      'Bend radius, conduit length, and cable pulling requirements',
      'Cost per metre, labour rate, and the margin allowed in the tender',
      'Machine make, former size, and the age of the bending tool',
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
      'To increase the space factor allowed in the conduit',
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
    difficulty: 'basic',
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
    difficulty: 'basic',
    topic: 'Fire Barriers',
  },
  {
    id: 144,
    question:
      'When installing cables in areas subject to mechanical damage, what protection should be provided?',
    options: [
      'Appropriate mechanical protection such as conduit or trunking',
      'A higher current rating for the cable in that section',
      'Additional RCD protection for the circuit concerned',
      'A warning label fixed to the wall near the cable run',
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
    question: 'When is a reusable lever connector particularly useful in a UK installation?',
    options: [
      'For terminating steel-wire armour, where a gland cannot be fitted',
      'For bonding cable armour to the main earthing terminal, at the intake position',
      'For high-current busbar connections, inside a distribution board',
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
      'To carry the weight of the enclosure where wall fixings are shallow',
      'To bond every cable that enters the enclosure back to the earth bar',
      'To raise the current rating of the busbars inside the enclosure',
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
      'Segregation of the cable from data cabling',
      'Adequate terminal size and heat dissipation',
      'A higher IP rating for the enclosure',
      'Additional RCD protection for the final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'High-current cables require adequate terminal size and consideration of heat dissipation to prevent overheating.',
    section: '4.5.4',
    difficulty: 'intermediate',
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
      'Purchase order references, invoice numbers, and the cost of every accessory',
      'Delivery dates, batch numbers, and drum lengths for every reel of cable',
      'Operative names, trades, and CSCS card numbers',
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
      'Whenever a fault is reported by the occupier',
      'At regular intervals as specified in regulations',
      'Each time the property changes ownership',
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
      'The overall pass or fail result, together with the date of every site visit',
      'The names, trades and signatures of every operative present on site that day',
      'Test values, instruments used, environmental conditions, and observations',
      'Instrument purchase cost, age, and serial number',
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
      'Record the average of the readings and note the spread',
      'Use the lowest reading obtained as the recorded result',
      'Repeat the test on a different circuit and use that result',
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
      'Safety glasses fitted with moulded side shields and a visor',
      'Ear defenders rated for the measured noise level',
      'Cut-resistant gloves and steel toe-capped boots',
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
      'Permission to run the tool from a 400 V three-phase supply through an adaptor',
      'Additional protection against electric shock without requiring earthing',
      'Increased power output from the motor for heavy-duty drilling work',
      'Weatherproofing that allows the tool to be used in wet conditions outdoors',
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
      'Remove the guard rails so materials can be loaded more easily',
      'Operate the platform on soft ground without using the outriggers',
      'Ensure operators are trained and equipment is inspected',
      'Exceed the rated basket load to avoid making a second lift',
    ],
    correctAnswer: 2,
    explanation:
      'MEWPs require trained operators and thorough equipment inspection before use to ensure safe operation.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'MEWP Safety',
  },
  {
    id: 159,
    question: 'What is the purpose of using safety nets when working at height?',
    options: [
      'To catch dropped tools and offcuts falling from the platform',
      'To support the weight of the mobile access equipment',
      'To provide shade for operatives working at ground level',
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
      'Place it in the general site skip, together with all the other construction waste',
      'Bury it on site, well away from any building or watercourse, and backfill',
      'Store it in the site container, and leave it for the demolition contractor',
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
      'Once the project has been completed and handed over to the client',
      'At the annual company safety meeting and at no other time',
      'When work methods change or new hazards are identified',
      'Never, once it has been signed off by the project manager',
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
      'Use whichever drawing carries the most recent revision date',
      'Choose the option that is cheapest to install on site',
      'Proceed using your own judgement and record it later',
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
      'To record the retail price of every item delivered to the site store',
      'To list the suppliers used for each material and their lead times',
      'To schedule the testing of the installation once the work is complete',
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
      'The electrical programme, and nothing else happening on site',
      'Work sequences, shared resources, and safety interactions',
      'Material costs, discounts, and margins carried by the other trades',
      'Qualifications, card grades, and pay rates held by each other trade',
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
    question: 'What governs the height at which a consumer unit is mounted in a new dwelling?',
    options: [
      '1200mm to top edge',
      '1500mm to base',
      '1350mm to centre',
      '1800mm to top',
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
    question: 'When setting out angles over a long distance, what is the advantage of an optical instrument over a tape?',
    options: [
      'Measures insulation resistance between conductors accurately',
      'Detects buried cables and pipes before drilling into a wall',
      'Checks the level of socket outlets along a finished wall',
      'Provides precise angular measurements for complex layouts',
    ],
    correctAnswer: 3,
    explanation:
      'Theodolites provide precise angular measurements essential for complex layouts and long-distance accurate positioning.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Theodolite Use',
  },
  {
    id: 168,
    question: 'What should be done when marking out positions on finished surfaces?',
    options: [
      "Use removable marking methods that won't damage the surface",
      'Score the marks deeply with a sharp scriber so they stay visible',
      'Use permanent paint so the marks remain visible after installation',
      'Drill the fixing holes first and mark around them afterwards',
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
      'Appearance of the finished work above the ceiling',
      'Access for installation and future maintenance',
      'Hire cost of the access equipment for a week',
      'Colour of the containment and its fixings',
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
      'To detect buried services before drilling into a floor slab',
      'To pull cables through long conduit runs between draw boxes',
      'To establish straight reference lines over long distances',
      'To measure the resistance of a circuit conductor',
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
      'A hand bending spring inserted inside the conduit run',
      'A pair of long-nose pliers and an adjustable spanner',
      'An insulation resistance tester and a continuity lead',
    ],
    correctAnswer: 0,
    explanation:
      'Large diameter conduit requires hydraulic benders or specialised forming equipment to achieve proper bends without damage.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Large Diameter Bending',
  },
  {
    id: 173,
    question: 'What is the purpose of using saddle bends in conduit installation?',
    options: [
      'To terminate the conduit run at an enclosure',
      'To cross over other conduits or obstacles',
      'To bond the conduit to the structure',
      'To reduce the diameter of the run',
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
      'The colour-coding applied to the finished conduit run',
      'The cost of the conduit per metre and of the saddles used',
      'The sequence and interaction of multiple bend angles',
      'The make of the bending machine and its formers',
    ],
    correctAnswer: 2,
    explanation:
      'Compound bends require careful planning of the sequence and interaction of multiple bend angles to achieve the desired result.',
    section: '4.3.5',
    difficulty: 'basic',
    topic: 'Compound Bends',
  },
  {
    id: 175,
    question: 'What should be checked after completing conduit bending operations?',
    options: [
      'Conduit colour, paint finish, and general appearance',
      'Conduit price, saddle price, and the waste allowance',
      'Bending tool make, former size, and the machine\'s serial number',
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
      'To increase the spacing allowed between adjacent saddles',
      'To bond the support back to the building structure',
      'To reduce the number of fixings needed per run',
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
      'Chemical resin anchors and studs',
      'Clamps or removable fixings',
      'Cast-in fixing channel inserts',
      'Welded steel brackets',
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
      'To reduce the total length of cable pulled into the trunking',
      'To increase the current-carrying capacity of each conductor',
      'To prevent interference between different circuit types',
      'To improve the appearance of the finished containment run',
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
      'Rigid fixings bolted at every support position',
      'A larger cable size used throughout the whole run',
      'Fewer supports spaced widely apart to allow free movement',
      'Flexible connections and vibration-resistant supports',
    ],
    correctAnswer: 3,
    explanation:
      'Areas subject to vibration require flexible connections and vibration-resistant supports to prevent fatigue failures.',
    section: '4.4.4',
    difficulty: 'basic',
    topic: 'Vibration Considerations',
  },
  {
    id: 180,
    question: 'What is the purpose of using cable management systems?',
    options: [
      'To organise, support, and protect cables systematically',
      'To remove the need for grouping factors, whatever the number of circuits',
      'To remove the need for circuit labels, since the routes are obvious',
      'To reduce cable cost, labour cost, and the time spent clipping',
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
      'Solder all the strands solid, then insert them into the terminal',
      'Strip insulation, twist strands, and consider using ferrules',
      'Cut away half of the strands, so the conductor fits the terminal',
      'Leave the insulation in place, and pierce it with the terminal screw',
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
      'On circuits operating above 1000 V AC to earth',
      'Where the connection carries no current at all',
      'When additional insulation or identification is required',
      'On connections made inside a sealed and gasketed enclosure',
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
      'Use standard accessories sealed over with extra self-amalgamating tape',
      'Use a higher current rating than normal on every final circuit',
      'Use single-core cables run throughout in heavy-gauge galvanised conduit',
    ],
    correctAnswer: 0,
    explanation:
      'Hazardous areas require certified equipment and specific installation procedures to prevent ignition of flammable atmospheres.',
    section: '4.5.4',
    difficulty: 'basic',
    topic: 'Hazardous Area Termination',
  },
  {
    id: 185,
    question: 'Which BS EN 60529 IP rating gives protection against water jets and against corrosion for an outdoor enclosure?',
    options: [
      'Indoor use only, with protection against falling dirt',
      'Weather-resistant and corrosion-resistant',
      'Protection against light dust and incidental contact',
      'Suitable for hazardous gas atmospheres',
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
      'The purchase cost of every installed item, checked against the tender',
      'The earth fault loop impedance, measured at every point of use',
      'Compliance with drawings, workmanship quality, and safety requirements',
      'The insulation resistance of every final circuit, measured at the consumer unit',
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
      'To save time by skipping the live tests altogether',
      'To check that the systems operate correctly when energised',
      'To warm the test instruments up before they are used',
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
      'When the instrument is first purchased',
      'After a test result has failed',
      'Once every ten years of service',
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
      'Accept the result and issue the certificate anyway',
      'Investigate further and consider remedial action',
      'Energise the circuit and monitor it while in service',
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
      'To record the cost of the installation work for the client',
      'To list every material supplied to the site by the wholesaler',
      'To provide legal evidence of compliance with regulations',
      'To schedule the date of the next periodic inspection and test',
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
      'A standard disposable dust mask and safety glasses',
      'Safety glasses fitted with moulded side shields',
      'A hard hat with a chin strap worn with a full-face visor',
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
      'To increase the power output available at the tool socket',
      'To reduce the noise produced by the tool motor',
      'To allow the tool to be run at a higher voltage than rated',
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
      'Hire cost, delivery date, and the length of the hire period',
      'Task requirements, duration, weather conditions, and user competence',
      'Equipment colour, van storage space, and how heavy it is to lift',
      'Equipment brand, warranty length, and the dealer\'s after-sales cover',
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
      'Continue using it, at least until the current job is finished',
      'Share it with the other operatives, so that nothing goes to waste',
      'Store it alongside the clean PPE, in the same site cupboard',
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
      'To record the hours worked by every member of the site team',
      'To assign blame for minor incidents reported on site',
      'To track the cost of the materials damaged during the works',
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
      'After a chemical spillage has been cleaned up on site',
      'Before using any chemical products or materials',
      'After all the materials have been used up on site',
      'When ordering replacement materials from the stores',
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
      'To estimate the cost of the installation before the tender is submitted',
      'To brief the site team on the hazards expected during the shift',
      'To order the materials required before the work commences on site',
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
      'Retail cost, supplier discount, and payment terms',
      'Cable colour-coding, drum labels, and reel sizes',
      'Material brand, warranty length, and packaging quality',
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
      'What does BS 7671 require of the working space around a distribution board?',
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
    question: 'When setting out over a large site using a coordinate grid, what should be considered?',
    options: [
      'Marking spray colour, peg size, and the string line used',
      'Material cost, labour rate, and the margin allowed in the tender',
      'Accuracy requirements, satellite availability, and local coordinate systems',
      'Receiver make, battery running time, and the carrying case supplied',
    ],
    correctAnswer: 2,
    explanation:
      'GPS use requires consideration of accuracy requirements, satellite availability, and local coordinate systems for precise positioning.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'GPS Setting Out',
  },
  {
    id: 203,
    question: 'What should be done when setting out positions in areas with existing services?',
    options: [
      'Assume the existing services are dead and record them afterwards',
      'Set out the new positions first, then check for services when chasing',
      'Work from the record drawings alone without a cable-avoidance tool',
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
      'Additional hearing protection for all operatives',
      'A higher IP rating on all site equipment',
      'A larger cable size for the final circuits',
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
      'To record the cost of the installation for the valuation',
      'To provide fixed reference points for accurate positioning',
      'To document any alterations made to the existing installation',
      'To detect buried services before drilling into the structure',
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
      'The conduit becomes electrically live while being bent',
      'The conduit changes colour as the bend is being formed',
      'A larger bend radius is always required in a confined space',
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
      'To provide earth continuity between conduit lengths',
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
      'The colour-coding applied to the conduit run',
      'Total number of bends and cumulative angle changes',
      'The length of the draw wire used at each draw box',
      'The number of saddles fitted along each metre of the run',
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
      'The colour of the cables to be added at a later date',
      'The cost of the cables to be added in the future',
      'Future cable capacity and pulling requirements',
      'The brand of the cables to be added later',
    ],
    correctAnswer: 2,
    explanation:
      'Future cable additions require consideration of additional capacity and pulling requirements when designing conduit bends.',
    section: '4.3.1',
    difficulty: 'basic',
    topic: 'Future Capacity',
  },
  {
    id: 211,
    question: 'What is the purpose of using anti-vibration mounts for equipment supports?',
    options: [
      'To increase the load capacity of the support steelwork',
      'To bond the equipment back to the building structure',
      'To reduce the cost of the whole support system on site',
      'To prevent vibration transmission and reduce noise',
    ],
    correctAnswer: 3,
    explanation:
      'Anti-vibration mounts prevent vibration transmission from equipment and reduce noise levels in the installation.',
    section: '4.4.1',
    difficulty: 'basic',
    topic: 'Anti-Vibration Mounts',
  },
  {
    id: 212,
    question: 'Which fixing method is most suitable for overhead installations?',
    options: [
      'Through-bolts or heavy-duty anchors',
      'Adhesive pads on the ceiling',
      'Cable ties looped over pipework',
      'Plastic plugs in plasterboard sheets',
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
      'To support the weight of the cables at the wall',
      'To prevent fire spread through cable penetrations',
      'To seal the cable entry against dust and driven rain',
      'To provide strain relief at the cable terminations',
    ],
    correctAnswer: 1,
    explanation:
      'Fire-stopping materials prevent fire spread through cable penetrations, maintaining building fire compartmentation.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'Fire Stopping',
  },
  {
    id: 214,
    question: 'When installing in areas subject to chemical exposure, what should be considered?',
    options: [
      'Use of the smallest cable size available from the wholesaler',
      'Spacing of the supports as far apart as the cable run allows',
      'Chemical resistance of materials and additional protection',
      'Omission of paint from the containment so it can be inspected',
    ],
    correctAnswer: 2,
    explanation:
      'Chemical exposure areas require materials with appropriate chemical resistance and additional protection measures.',
    section: '4.4.4',
    difficulty: 'basic',
    topic: 'Chemical Resistance',
  },
  {
    id: 215,
    question: 'What is the purpose of using cable pulling winches?',
    options: [
      'To support the weight of the cable on long vertical risers',
      'To bond the cable armour to the earth bar during installation',
      'To strip the outer sheath from the cable as it is drawn into the duct',
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
      'Use ordinary brass screw terminals without any further preparation',
      'Solder the aluminium conductor directly into the terminal',
      'Twist the aluminium and copper conductors together in a connector',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium conductors require appropriate jointing compounds and connection methods to prevent oxidation and corrosion and to ensure reliable connections.',
    section: '4.5.1',
    difficulty: 'intermediate',
    topic: 'Aluminium Connections',
  },
  {
    id: 217,
    question: 'When are mechanical (screw or compression) connectors preferred for a connection?',
    options: [
      'On extra-low voltage circuits operating below 50 V',
      'For permanent installations and higher current applications',
      'Where the connection will be remade frequently',
      'On single-strand bell wire and alarm cabling',
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
      'To seal the gland against water in outdoor positions',
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
    difficulty: 'intermediate',
    topic: 'Explosive Atmosphere Certification',
  },
  {
    id: 220,
    question: 'What does an IP rating of IPX9 indicate about an enclosure?',
    options: [
      'Dust-tight and protected against high-pressure, high-temperature wash-down',
      'Limited dust protection, with protection against splashing water only',
      'No dust protection, with protection against vertical drips only',
      'Dust-tight, with protection against temporary immersion only',
    ],
    correctAnswer: 0,
    explanation:
      'IP69K indicates dust-tight protection and resistance to high-pressure, high-temperature wash-down procedures.',
    section: '4.5.5',
    difficulty: 'intermediate',
    topic: 'IP69K Rating',
  },
  {
    id: 221,
    question: 'What should be documented during the visual inspection process?',
    options: [
      'The cost of the cable, accessories, and equipment installed',
      'All observations, defects, and compliance issues',
      'Supplier names, addresses, and account numbers',
      'Hours worked, overtime claimed, and travel time by each operative',
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
      'When the instrument is first purchased and never again afterwards',
      'After the instrument has given a reading that failed a circuit',
      'Never, provided the instrument is proved on a known value on site',
      'According to manufacturer\'s recommendations or when accuracy is questioned',
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
      'Record only the raw reading, as conditions do not affect it',
      'Postpone all testing until the conditions have improved',
      'Apply a fixed correction factor of 10% to every reading',
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
      'To certify a complete new installation and its final circuits',
      'To document small additions or alterations to existing installations',
      'To record a periodic inspection of an existing installation',
      'To order the materials needed for a new lighting circuit',
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
      'To carry tools and materials up to the working platform',
      'To enable rapid rescue of workers in emergency situations',
      'To support the access platform against the structure',
      'To mark out the boundary of the work area below',
    ],
    correctAnswer: 1,
    explanation:
      'Rescue equipment enables rapid rescue of workers in emergency situations, reducing the consequences of accidents at height.',
    section: '4.7.3',
    difficulty: 'basic',
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
      'To calculate the final cost of the job for the valuation',
      'To record the materials used so the store can be restocked',
      'To confirm the test instruments are still within calibration',
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
      'After an incident has been reported to the HSE',
      'When the contract reaches practical completion',
      'Never, once the notice has been displayed',
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
      'Speed of completion, labour cost, and the programme float available',
      'Appearance of the finished work, its cost, and the paint colour',
      'Material cost, supplier terms, and the discount available',
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
    question: 'What determines where an emergency escape luminaire is positioned on an escape route?',
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
    question: 'When setting out a large installation, what is the advantage of recording positions against a fixed reference point?',
    options: [
      'Detection of buried cables and pipes along the route',
      'Combined distance and angle measurement for precise positioning',
      'Accurate measurement of the insulation resistance of cables',
      'Confirmation of the level of the socket outlets fitted',
    ],
    correctAnswer: 1,
    explanation:
      'Total stations combine distance and angle measurement capabilities for highly precise positioning in complex layouts.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Total Station Advantages',
  },
  {
    id: 238,
    question: 'What should be done when marking out positions on heritage or listed buildings?',
    options: [
      'Use permanent marker paint, so the marks stay visible during the work',
      'Cut the marks lightly into the surface, using a bolster and chisel',
      'Use non-damaging, removable marking methods and seek conservation advice',
      'Avoid marking out altogether, and set the positions out by eye',
    ],
    correctAnswer: 2,
    explanation:
      'Heritage buildings require non-damaging, removable marking methods and conservation advice to protect historical features.',
    section: '4.2.2',
    difficulty: 'basic',
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
    difficulty: 'basic',
    topic: 'EMI Considerations',
  },
  {
    id: 240,
    question: 'What is the purpose of using coordinate systems in large installations?',
    options: [
      'To ensure accurate positioning and facilitate future modifications',
      'To record the cost of the installation against each cost centre',
      'To track which supplier provided each item of material used',
      'To schedule the testing of each circuit in the correct order',
    ],
    correctAnswer: 0,
    explanation:
      'Coordinate systems ensure accurate positioning in large installations and facilitate future modifications and maintenance.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Coordinate Systems',
  },
  {
    id: 241,
    question: 'What environmental factors can affect conduit bending quality?',
    options: [
      'Conduit colour, saddle type, and box lid finish',
      'Temperature, humidity, and material storage conditions',
      'Cost per metre, labour rate, and the tender margin',
      'Machine make, former size, and the tool\'s service history',
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
    question: 'When bending conduit in a building subject to vibration or structural movement, what additional considerations apply?',
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
    difficulty: 'basic',
    topic: 'Seismic Considerations',
  },
  {
    id: 243,
    question: 'What is the purpose of using conduit expansion fittings?',
    options: [
      'To allow the conduit to be bent without a former',
      'To earth the conduit to the structure',
      'To protect the conduit against corrosion',
      'To accommodate thermal expansion in long conduit runs',
    ],
    correctAnswer: 3,
    explanation:
      'Conduit expansion fittings accommodate thermal expansion in long conduit runs, preventing stress damage.',
    section: '4.3.5',
    difficulty: 'basic',
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
    difficulty: 'basic',
    topic: 'Corrosive Environment Bending',
  },
  {
    id: 245,
    question: 'What should be verified after completing complex conduit bending operations?',
    options: [
      'Colour-coding, end labelling, and the finish of the paintwork',
      'Dimensional accuracy, internal clearance, and cable pulling capability',
      'Conduit cost, waste generated, and the skip charges on site',
      'Machine make, former sizes, and the hire period booked',
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
    question: 'What is the purpose of bracing containment against movement in a building structure?',
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
    difficulty: 'basic',
    topic: 'Seismic Bracing',
  },
  {
    id: 247,
    question: 'Which fixing method provides the best performance in high-vibration environments?',
    options: [
      'Standard plastic wall plugs with countersunk woodscrews',
      'Adhesive pads bonded to a cleaned and primed surface',
      'Single cable ties fitted at each fixing centre along the run',
      'Vibration-resistant fasteners with thread-locking compounds',
    ],
    correctAnswer: 3,
    explanation:
      'High-vibration environments require vibration-resistant fasteners with thread-locking compounds to prevent loosening.',
    section: '4.4.2',
    difficulty: 'basic',
    topic: 'Vibration-Resistant Fixings',
  },
  {
    id: 248,
    question: 'What is the purpose of using low-smoke fire-performance cables in air-handling spaces?',
    options: [
      'To meet fire safety requirements in air-handling spaces',
      'To improve the flexibility of the cable in tight bends',
      'To protect the cable against corrosion',
      'To reduce the cost of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Low-smoke, fire-performance cables in air-handling (plenum) spaces meet fire safety requirements by producing less smoke and fewer toxic gases when exposed to fire, protecting escape routes.',
    section: '4.4.3',
    difficulty: 'basic',
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
    difficulty: 'basic',
    topic: 'Flood Considerations',
  },
  {
    id: 250,
    question: 'What documentation should be completed after installation work?',
    options: [
      'The site risk assessment and method statement',
      'The method statement and permit to work',
      'Installation certificates and test results',
      'The material delivery notes and waste transfer notes',
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
      'Prohibited on socket-outlet circuits in dwellings, because of nuisance tripping',
      'Mandatory on every final circuit, whatever the type of building',
      'Required only where the supply is a TT earthing system, whatever the premises',
      'Recommended, becoming a requirement in higher-risk residential buildings',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 421.1.7 recommends AFDDs for AC final circuits to mitigate the risk of fire, and makes them a requirement — within the regulation itself, not by a separate framework — for final circuits supplying socket-outlets rated up to 32 A in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes. That redraft came at Amendment 2:2022; Amendment 4:2026 changed item (a) to read High rise residential buildings.',
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
      'Electromagnetic interference between adjacent circuits, where they share a route',
      'Mechanical strain from the supported weight of the cable, including meter tails',
      'The earth fault loop impedance, measured at the far end of the run',
      'The ambient temperature correction factor, applied to the tabulated rating',
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
      'Isolate, identify, lock and label, prove indicator, test for dead, re-prove indicator, notify, polarity, record',
      'Notify, isolate, test for dead, prove indicator, lock and label, identify, re-prove indicator, polarity, record',
      'Identify, notify, prove indicator, isolate, lock and label, test for dead, re-prove indicator, polarity, record',
      'Prove indicator, isolate, test for dead, lock and label, identify, notify, re-prove indicator, polarity, record',
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
      'BS EN 60898 (circuit-breakers)',
      'BS 1363 (13 A plugs and socket-outlets)',
      'BS 88 (low-voltage fuses)',
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
      'To verify that the protective device has tripped, and that nobody else on site can reset it',
      'To check that the polarity of the supply is correct, before the isolator is locked off and labelled',
      'To measure the prospective fault current at the point of work, before any live conductors are exposed',
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
      '2.5 mm²',
      '10 mm²',
      '25 mm²',
      '1.5 mm²',
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
      '2.5 mm²',
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
      'The resistance of the line conductor on its own, measured from the origin of the circuit to the furthest point of use',
      'The combined resistance of the line conductor and circuit protective conductor from origin to the furthest point',
      'The insulation resistance between the line conductor and the circuit protective conductor at a test voltage of 500 V DC',
      'The earth fault loop impedance external to the installation, measured at the origin of the supply before the main switch',
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
      'Insulation tester at 500 V DC, measured between line and cpc at the furthest accessory on the circuit',
      'Loop impedance tester, measured live between line and earth at the furthest socket-outlet on the circuit',
      'Low-resistance ohmmeter with line and cpc linked at the board, measured at the furthest accessory',
      'Earth electrode tester, measured between the cpc and a temporary spike outside the building',
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
      'A single insulation resistance test between line/neutral at the board (min 1.0 MΩ at 500 V DC), with the circuit isolated and locked off',
      'A live line/earth fault loop impedance reading taken at one socket, compared with the tabulated maximum Zs (1.37 Ω for a 32 A Type B device)',
      'A polarity check at each socket with the circuit energised, confirming the line/neutral pair (brown and blue) is not reversed',
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
      'A perfectly balanced ring final circuit with all of the readings in agreement',
      'A short circuit between the line and neutral conductors at the distribution board',
      'An excessively high insulation resistance on that section of the ring conductors',
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
      'Increase the test voltage to 1000 V DC so that any weak insulation breaks down and is found',
      'Energise the circuit and take the measurement under normal load conditions at the distribution board',
      'Remove every circuit protective conductor from the earth bar before the test is applied',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
    topic: 'Type S RCD',
  },
  {
    id: 271,
    question:
      'Why is a polarity test (Regulation 643.6) required at every accessory before energising an installation?',
    options: [
      'To measure the insulation resistance between line and neutral at every accessory',
      'To verify the earth fault loop impedance at every socket-outlet on the final circuit',
      'To confirm the prospective fault current at each accessory is within the rating of the device',
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
      'Measuring the insulation resistance of every final circuit at 500 V DC, with the supply off',
      'Confirming that the earth fault loop impedance at the origin, Ze, is low enough',
      'Recording the prospective fault current, measured at every distribution board on site',
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
      'Insulation resistance, polarity, continuity of protective conductors, then continuity of ring final conductors',
      'Continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity',
      'Polarity, insulation resistance, continuity of ring final conductors, continuity of all protective conductors',
      'Earth fault loop impedance, insulation resistance, polarity, then continuity of protective conductors',
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
      'Insulation resistance, continuity of protective conductors and polarity (all dead tests), with the supply isolated',
      'Ring final circuit continuity, and insulation resistance (500 V DC), on each of the final circuits',
      'Earth fault loop impedance (Ze and Zs), prospective fault current, RCD operation, functional tests',
      'Continuity of protective conductors and of the main protective bonding to each service (gas, water)',
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
    difficulty: 'intermediate',
    topic: 'Table 41.3 Zs',
  },
  {
    id: 276,
    question:
      'Which document is the primary source for completion certification of a new installation under BS 7671?',
    options: [
      'The Electrical Installation Certificate with its Schedule of Inspections and Schedule of Test Results',
      'A Minor Electrical Installation Works Certificate covering each circuit that has been added or altered on site',
      'An Electrical Installation Condition Report with a Schedule of Test Results and all its observation codes',
      'A declaration of conformity supplied by the maker of the consumer unit and all of its protective devices',
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
      'Regulation 514.13.1',
      'Regulation 132.13',
      'Regulation 522.8.12',
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
      'Insulation resistance between all live conductors and earth, at 500 V DC',
      'Earth fault loop impedance, measured at the origin and at the end of every circuit',
      'Continuity of protective conductors, including main and supplementary bonding',
      'Polarity at every socket-outlet, switch, and lighting point in the installation',
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
      'At least 1 mA short-circuit test current with a no-load voltage of 500 V DC applied to the circuit',
      'At least 25 mA short-circuit test current with a no-load voltage of 50 V AC or DC at the leads',
      'At least 1 A short-circuit test current with a no-load voltage of 230 V AC taken from the supply',
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
      'What is the recommended maximum pulling tension per square millimetre of stranded copper conductor when drawing cable into conduit with a stocking grip?',
    options: [
      'About 50 N/mm² of conductor cross-section (≈ 5 kg/mm²)',
      'About 5 N/mm² of conductor cross-section (≈ 0.5 kg/mm²)',
      'About 500 N/mm² of conductor cross-section (≈ 50 kg/mm²)',
      'About 50 N/mm² of the overall cable diameter (≈ 5 kg/mm²)',
    ],
    correctAnswer: 0,
    explanation:
      'The IET Electrical Installation Design Guide recommends a maximum pulling tension of approximately 50 N/mm² (≈ 5 kg/mm²) of conductor cross-sectional area for copper cables pulled with a stocking grip. Excessive tension stretches the conductor and damages insulation.',
    section: '4.4.4',
    difficulty: 'intermediate',
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
      'Under BS 7671, how must cables installed along an emergency escape route be supported?',
    options: [
      'Allows the cable to be withdrawn easily for maintenance without disturbing the escape route or its lighting',
      'Increases the current-carrying capacity of the cable by holding it clear of the wall surface along the whole route',
      'Prevents premature collapse of the cable in a fire by using metallic fixings rather than plastic clips alone',
      'Reduces electromagnetic interference where the fire alarm cabling is run alongside it on the escape route',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 522.8.5 (escape route cable retention, A4:2026) requires that wiring systems on escape routes are supported so that they will not be liable to premature collapse in a fire. In practice this means using metallic clips, saddles, cleats or supports rather than relying on plastic cable clips, ties or trunking that would soften and release the cable.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Escape Route Retention',
  },
  {
    id: 283,
    question:
      'Which HSE document, alongside the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th edition), provides guidance on PAT/in-service inspection on construction sites?',
    options: [
      'HSG47 — Avoiding danger from underground services',
      'HSG150 — Health and safety in construction',
      'INDG236 — Maintaining portable electrical equipment',
      'HSG107 — Maintaining portable electric equipment',
    ],
    correctAnswer: 3,
    explanation:
      'HSG107 "Maintaining portable electric equipment" — used together with the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th edition) — is the appropriate HSE guidance for higher-risk environments such as construction sites. INDG236 is the lighter-touch leaflet aimed at low-risk office settings.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'HSG107 vs INDG236',
  },
  {
    id: 284,
    question:
      'When selecting cable sizes from drawings (LO 4.1), which factor must be considered alongside the design current Ib?',
    options: [
      'Rating factors for ambient temperature, grouping and thermal insulation, so that Iz ≥ In ≥ Ib',
      'The colour-coding scheme used for the conductors, and the labelling applied at each termination',
      'Only the length of the cable run from the distribution board, since volt drop governs the size',
      'The cost per metre of the chosen cable, and the labour rate allowed for pulling it into the conduit',
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
      'On the street side of any insulating section, before the incoming stopcock, so that the whole length of the buried service pipe is bonded as well',
      'On the consumer\'s side of any insulating section, within 600 mm of the meter outlet union or as near as practicable to the point of entry',
      'At the highest accessible point of the internal pipework, above the meter, so that moisture drains away from the clamp and its label',
      'At any convenient accessible point along the pipe inside the building, provided the clamp and its warning label remain readable from floor level',
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
      'Regulation 643.2.1 and 643.2.2',
      'Regulation 411.3.1.1 and 411.3.1.2',
      'Regulation 526.1 and 526.5',
      'Regulation 514.13.1 and 514.13.2',
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
      'It is wrapped in self-amalgamating tape, and its position recorded on the certificate (Regulation 526.1), so that it can be found again later',
      'It is recorded on the Schedule of Test Results (Regulation 643.2.1), together with the depth and position of the joint in the cable run',
      'It is positioned within 600 mm of the consumer unit (Regulation 526.9.3), so that it can be found again without lifting the floorboards',
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
      'Stripping back as much insulation as possible, so that the terminal screw has the longest possible grip',
      'Leaving a short length of bare conductor outside the terminal, so that the connection can be inspected later',
      'Twisting the stripped conductor together with the core of the adjacent cable, then inserting both into one terminal',
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
      'To make the terminal screws easier to release during future maintenance, without damaging the accessory or its faceplate',
      'To ensure low-resistance connections that will not loosen and overheat, without over-tightening that shears strands',
      'To increase the current-carrying capacity of the conductor, by compressing all of its strands tightly in the terminal',
      'To compensate for a conductor one size smaller, where the design calculation called for a larger one',
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
      'Terminate the cores, fit the gland and lock-nut, trim the armour, strip the outer sheath, then cut to length',
      'Fit the shroud, fit the gland, cut to length, strip the outer sheath, trim the armour, then terminate the cores',
      'Cut to length, strip outer sheath, trim armour to gland length, fit gland and lock-nut, terminate cores, fit shroud',
      'Strip the outer sheath, terminate the cores, cut to length, trim the armour, fit the gland and lock-nut, fit the shroud',
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
      'Because a longer run carries more current, so the cables then need extra space in which to shed the heat generated',
      'Because a longer run needs a conduit with a thicker wall for strength, leaving less space inside for the cables to be drawn in',
      'Because the regulations cap the length of any conduit run, and the fill factor is what enforces that maximum',
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
      'Measure the insulation resistance and the earth fault loop impedance of that circuit only (Reg 643.2.1)',
      'Press the integral test button only and record the result as a pass on the schedule (Reg 643.6)',
      'Operate the integral test button and verify trip time with an RCD tester (Reg 643.8)',
      'Confirm the polarity and the prospective fault current at the outgoing terminals of the device (Reg 643.3)',
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
      'The overall pass or fail result for the installation, together with the date and the certificate number',
      'The insulation resistance reading for each circuit, and the test voltage that was used for the measurement',
      'The names, addresses and signatures of the persons responsible for the design, construction and testing of the works',
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
      'A copy of the circuit schedule for the distribution board, with the isolated way marked up on it',
      'A label stating the prospective fault current measured at that point of the installation in kA',
      'A record of the insulation resistance readings taken on the isolated circuit before work began',
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
      'What is a proving unit used for during safe isolation?',
    options: [
      'Measure the earth fault loop impedance at the point of work, before the circuit has been isolated',
      'Verify a voltage indicator is working before and after testing for dead, without using a live source',
      'Confirm that the circuit-breaker has tripped correctly, under simulated earth fault conditions at the board',
      'Measure the insulation resistance of the isolated circuit at 500 V DC, before any work is started on it',
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
      'Isolate only the circuit being worked on and leave the remaining ways live, since they sit behind the board cover (EAWR Reg 7)',
      'Work live throughout using insulated tools and a rubber mat, so that the occupier\'s other circuits are not disrupted (EAWR Reg 4(4))',
      'Isolate the whole board where practicable, lock off circuits within reach, and barrier off remaining live parts (EAWR Reg 14)',
      'Rely on the RCD to disconnect quickly enough to give protection, while working on the live conductors in the board (EAWR Reg 13)',
    ],
    correctAnswer: 2,
    explanation:
      'Where possible the entire board should be isolated. If only part can be isolated, every other circuit within reach should be locked off or live parts must be barriered/insulated to prevent inadvertent contact. Working live is permitted only where strict criteria of Electricity at Work Regulation 14 are met (unreasonable to work dead, reasonable to work live, suitable precautions).',
    section: '4.7.4',
    difficulty: 'intermediate',
    topic: 'EAWR Reg 14',
  },
  {
    id: 299,
    question:
      'A risk assessment for installation work in an occupied office identifies vulnerable persons (members of the public). Which control should be prioritised?',
    options: [
      'Issuing safety glasses and gloves to any members of the public who need to pass through or work near the area, and briefing them on the work',
      'Relying on a verbal warning given to all of the occupants at the start of each day, which is recorded in the site diary by the supervisor',
      'Completing the work as quickly as possible, so that the period during which the public are exposed to the hazard is kept to an absolute minimum',
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
      'A Minor Electrical Installation Works Certificate, covering the whole installation and all of its final/distribution circuits',
      'An Electrical Installation Condition Report, describing all of the new work and any C1/C2 observations made by the tester',
      'A written confirmation from the person who carried out the dead/live testing, stating that all readings were within limits',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.1.1 requires the EIC, Schedule of Inspections and Schedule of Test Results to be issued on completion of a new installation or addition/alteration. Regulation 132.13 also requires that documentation, drawings and information are provided to the person ordering the work so the installation can be operated and maintained safely.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'EIC Handover',
  },
  {
    id: 301,
    question:
      'A cable is to be run in a plasterboard partition about 20 mm below the surface to feed a new switch. Where must it sit to be in a prescribed zone?',
    options: [
      'Within 150 mm of the top of the partition, or vertically in line with the switch',
      'Within 300 mm of the top of the partition, or diagonally between the two accessories',
      'Within 50 mm of the finished surface, at any point across the partition face',
      'Within 150 mm of the floor, provided the run is kept clear of any noggins',
    ],
    correctAnswer: 0,
    explanation:
      'A prescribed zone is within 150 mm of the top of a wall or partition, within 150 mm of an angle formed by two adjoining walls, or running horizontally and vertically from an accessory, point or switchgear on the wall. A 300 mm zone and diagonal runs do not exist in BS 7671 — a diagonal drop is one of the most common reasons a cable is struck by a later fixing.',
    section: '4.2.1',
    difficulty: 'advanced',
    topic: 'Prescribed Zones',
  },
  {
    id: 302,
    question:
      'A socket-outlet is fixed on one face of a 90 mm thick stud partition. What does BS 7671 say about the prescribed zone on the opposite face?',
    options: [
      'It does not carry through; on the far face, no zone is formed by that socket',
      'It extends to the reverse side, because the partition is 100 mm thick or less',
      'It extends to the reverse side only where the partition contains metallic parts, such as steel studs',
      'It forms a separate zone on the far face, measured 150 mm up from the floor',
    ],
    correctAnswer: 1,
    explanation:
      'Where the position of an accessory can be determined from the reverse side, the zone it forms on a wall or partition of 100 mm thickness or less extends through to the reverse side. At 90 mm this partition qualifies, so a cable in the matching zone on the far face is also in a prescribed zone. The metallic-parts condition is a separate matter — it changes what protection is required, not where the zone is.',
    section: '4.2.1',
    difficulty: 'advanced',
    topic: 'Prescribed Zones',
  },
  {
    id: 303,
    question:
      'A twin and earth cable is chased into a masonry wall 30 mm below the finished plaster and lies within a prescribed zone. Under Table 52.1, what else is needed?',
    options: [
      'Nothing further, as installation within a prescribed zone is enough on its own',
      'Additional protection by a 30 mA RCD, or compliance with Regulation 522.6.204',
      'Plastic capping over the cable, which removes the need for any RCD protection',
      'A warning notice at the consumer unit, stating the depth of the buried cable',
    ],
    correctAnswer: 1,
    explanation:
      'For a cable less than 50 mm deep in a wall without metallic parts, Table 52.1 requires the cable to be in a prescribed zone AND either to have additional protection by a 30 mA RCD to Regulation 415.1.1, or to comply with 522.6.204. Plastic capping is not one of the accepted options — it keeps plaster off the cable but offers no protection against a nail or screw.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Table 52.1',
  },
  {
    id: 304,
    question:
      'A cable is concealed inside a metal-framed stud partition. What does Table 52.1 require in this situation?',
    options: [
      'That the cable is run only horizontally, so that it stays well clear of the metal studs',
      'That the cable is double-insulated, and clipped away from every metal member of the frame',
      'That additional protection by a 30 mA RCD is given, or 522.6.204 is complied with',
      'That the cable is enclosed in plastic capping, along the whole length of its concealed run',
    ],
    correctAnswer: 2,
    explanation:
      'Where a wall or partition contains metallic parts, Table 52.1 requires additional protection by a 30 mA RCD or compliance with Regulation 522.6.204, irrespective of the depth of the cable. Being in a prescribed zone alone is not sufficient here, because the metal framing itself can become live if the cable is penetrated.',
    section: '4.2.2',
    difficulty: 'advanced',
    topic: 'Metallic Partitions',
  },
  {
    id: 305,
    question:
      'A cable is run through holes drilled in floor joists beneath floorboards. How should the holes be positioned?',
    options: [
      'At least 50 mm from the top and bottom of the joist, or the cable protected',
      'At least 150 mm from the top of the joist, with no limit needed at the bottom',
      'As close to the top of the joist as possible, so that the cable can be inspected',
      'At any height, provided the cable is clipped to the side of each joist',
    ],
    correctAnswer: 0,
    explanation:
      'A cable under a floor or above a ceiling must be at least 50 mm from the top or bottom of a joist, or else be given mechanical protection such as steel conduit, because floorboard nails and screws routinely reach that depth. The 150 mm figure belongs to prescribed zones in walls, not to joists, and is a very common mix-up.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Cables in Floors',
  },
  {
    id: 306,
    question:
      'Where a joint must be made in a cable without using a connector to a recognised standard, what does BS 7671 require of the joint?',
    options: [
      'made in an enclosure with a degree of protection of at least IPXXD or IP4X',
      'wrapped in three layers of PVC tape and left accessible for later inspection',
      'soldered and sleeved, then buried in the plaster of the finished wall face',
      'made in any plastic box provided the circuit has 30 mA RCD protection fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Joints must either use connectors to the relevant standard or be made in an enclosure affording at least IPXXD or IP4X, and cable anchorage must be provided where strain could reach the terminals. RCD protection is about shock risk if a fault occurs; it does nothing to keep a joint enclosed and mechanically sound, so it cannot substitute for the enclosure.',
    section: '4.3.1',
    difficulty: 'intermediate',
    topic: 'Cable Joints',
  },
  {
    id: 307,
    question:
      'Why does BS 7671 prohibit soldered (tinned) conductor ends on fine stranded conductors at a termination?',
    options: [
      'Solder raises the resistance of the joint and overheats the terminal',
      'The rigid soldered section can move relative to the conductor and fracture',
      'Soldered joints are not permitted anywhere in a fixed installation by Part 5',
      'Tinning changes the conductor colour and prevents correct identification',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 526.9.3 addresses the "solder bite": tinning creates a stiff section that flexes against the soft stranded conductor behind it, and relative movement in service fatigues and breaks the strands. The correct method is a crimped ferrule sized for the conductor, which keeps the strands together without creating a rigid transition.',
    section: '4.3.2',
    difficulty: 'advanced',
    topic: 'Terminations',
  },
  {
    id: 308,
    question:
      'A steel wire armoured cable is terminated into a metal enclosure. Which requirement applies to that termination?',
    options: [
      'It must be soundly made and placed under no undue strain at the terminals',
      'It must have the armour cut back and left unconnected inside the gland plate',
      'It must include a short length of flexible conduit between the gland and enclosure',
      'It must be re-tightened at three-monthly intervals throughout its working life',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 526.6 requires terminations at enclosures to be soundly made and free from undue strain, which is what the gland and its locknut or banjo achieve — they anchor the cable so its weight is carried by the enclosure, not the terminals. Cutting the armour back and leaving it unconnected would also lose the armour as a protective conductor.',
    section: '4.3.2',
    difficulty: 'intermediate',
    topic: 'SWA Termination',
  },
  {
    id: 309,
    question:
      'A steel back box has a burred edge on the knockout where the cable enters. What is the correct action?',
    options: [
      'Fit a grommet or deburr the edge so the cable sheath cannot be damaged',
      'Wrap the cable in insulating tape and pull it through the opening quickly',
      'Turn the box around so the burr faces away from the wall behind it',
      'File the wall opening wider so the cable does not touch the box edge',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 requires that no sharp edge on an enclosure or support is liable to damage the wiring; the remedy is to deburr or round the edge, or to fit a grommet, bush or edge protector. Tape is a temporary dressing that abrades away against steel and will eventually let the sharp edge reach the conductor insulation.',
    section: '4.3.3',
    difficulty: 'basic',
    topic: 'Sharp Edges',
  },
  {
    id: 310,
    question:
      'Why must a conduit system buried in the building fabric be completely erected before any cable is drawn in?',
    options: [
      'So the cable can be pulled in before the couplings and bends are finally fixed',
      'So the installed cable does not have to be withdrawn to complete the run',
      'So the conduit can be pressure tested once the cables are in place',
      'So the plaster can be applied to the wall while the cables are being drawn in',
    ],
    correctAnswer: 1,
    explanation:
      'Confirm by inspection that the conduit is continuous between access points, with all bends, couplings and support fixings in place, before drawing cable. If a section is missing once the conduit is embedded, the cable has to be withdrawn and the wall opened up again, and cable pulled through an unfinished run is easily damaged at open ends.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Conduit Installation',
  },
  {
    id: 311,
    question:
      'Steel trunking passes through a wall having a specified fire resistance. What does Regulation 527.2.2 require?',
    options: [
      'Internal sealing to the fire resistance of the wall, as well as external sealing',
      'External sealing only, since the trunking itself is made of steel throughout',
      'Internal sealing only, because the outside of the wall is made good in plaster',
      'A fire damper fitted inside the trunking, on each side of the wall it passes through',
    ],
    correctAnswer: 0,
    explanation:
      'A conduit, ducting, trunking or busbar system penetrating a fire-resisting element must be sealed internally to the same degree of fire resistance as that element, and also sealed externally around the penetration. Sealing only the outside leaves the inside of the trunking as an open flue through which fire and smoke pass into the next compartment.',
    section: '4.4.2',
    difficulty: 'advanced',
    topic: 'Fire Sealing',
  },
  {
    id: 312,
    question:
      'A trunking run through a fire compartment wall will not be finished for another two weeks. What does BS 7671 require in the meantime?',
    options: [
      'Temporary sealing arrangements are provided as appropriate during erection',
      'The opening is left clear so that the remaining cables can be pulled through it',
      'A written record is made and the final seal is applied at handover of the works',
      'The compartment is taken out of service until the permanent seal is completed',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 527.2.1.1 requires temporary sealing arrangements during erection of a wiring system, because a building under construction still has to contain a fire. Leaving the hole open until the cables are finished is the usual practice on site and is exactly what the regulation prohibits.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Fire Sealing',
  },
  {
    id: 313,
    question:
      'Under Regulation 527.2.3, in what circumstances need a conduit or trunking system not be internally sealed?',
    options: [
      'non-flame propagating, of internal area up to 710 mm², and satisfies IP33',
      'non-flame propagating, of internal area up to 2000 mm², and satisfies IP54',
      'made of steel, of any internal area, and painted with an intumescent coating',
      'fitted with fire pillows at each end, whatever its internal area may be',
    ],
    correctAnswer: 0,
    explanation:
      'The exemption from internal sealing applies to a non-flame propagating system with a maximum internal cross-sectional area of 710 mm² that satisfies the BS EN 60529 test for IP33, subject to the further conditions in 527.2.3. Above 710 mm² the internal void is large enough to carry fire, so internal sealing is required whatever the material.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Fire Sealing',
  },
  {
    id: 314,
    question:
      'During alteration work a contractor breaks through an existing fire seal around a cable route. What does BS 7671 require?',
    options: [
      'That the sealing which has been disturbed is reinstated as soon as practicable',
      'That the sealing is left open until the final inspection and test is carried out',
      'That the client is told in writing and the seal renewed at the next service',
      'That the affected cables are replaced with a fire-resisting cable type instead',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 527.2.1.2 requires sealing disturbed during alteration work to be reinstated as soon as practicable, restoring the original degree of fire resistance. Deferring the repair to a later visit leaves a breach in a compartment wall that nobody on site is aware of.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Fire Sealing',
  },
  {
    id: 315,
    question:
      'A multicore cable is to carry both a Band I and a Band II circuit. Which arrangement does Regulation 528.1 permit?',
    options: [
      'Separating the cores with an earthed metal screen of adequate current capacity',
      'Separating the cores with a coloured PVC sleeve fitted over each of the Band I cores',
      'Twisting the Band I cores together in pairs so that the induced voltages cancel out',
      'Terminating the Band I cores in a separate part of the same accessory box',
    ],
    correctAnswer: 0,
    explanation:
      'Method (f) of Regulation 528.1 permits Band I and Band II cores in one multicore cable to be separated by an earthed metal screen having a current-carrying capacity equivalent to the largest Band II core, so that a fault reaches earth rather than the Band I circuit. A sleeve is identification only and gives no fault path or screening.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Segregation',
  },
  {
    id: 316,
    question:
      'Extra-low voltage data cables and 230 V power cables are to share one cable tray. Which method satisfies Regulation 528.1?',
    options: [
      'Installing a physical partition on the tray to separate the two categories',
      'Installing the two categories in alternate bundles along the same tray',
      'Installing the data cables directly below the power cables on the tray',
      'Installing both categories loose so that air circulates freely between them',
    ],
    correctAnswer: 0,
    explanation:
      'Where Band I and Band II cables share a tray, a physical partition providing separation is one of the permitted methods. Spacing, bundling or stacking gives no barrier: if the Band II insulation fails, the fault reaches the extra-low voltage cabling and puts mains voltage on equipment never designed to withstand it.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Segregation',
  },
  {
    id: 317,
    question:
      'A lighting circuit is to be run through a loft that will later be topped up with mineral wool. What does Regulation 523.9 require?',
    options: [
      'Fixing the cable, wherever practicable, so it will not be covered by insulation',
      'Fixing the cable to the ceiling plasterboard, beneath the layer of insulation',
      'Fixing the cable within the thermal insulation, then derating it by a factor of two',
      'Fixing the cable to the sides of the joists, then doubling its cross-sectional area',
    ],
    correctAnswer: 0,
    explanation:
      'A cable should preferably not be run where it is liable to be covered by thermal insulation, and where the space will be insulated it must wherever practicable be fixed clear of it. Insulation traps the heat the cable generates, so current-carrying capacity falls sharply; running it on top of the joists and clipping it above the finished insulation level is the practical answer.',
    section: '4.4.4',
    difficulty: 'intermediate',
    topic: 'Thermal Insulation',
  },
  {
    id: 318,
    question:
      'Which of the following may NOT be selected as a protective conductor under Regulation 543.2.3?',
    options: [
      'The steel wire armour of a cable that is properly glanded into the metal enclosure',
      'A separate green-and-yellow single core run alongside the line conductor',
      'A length of flexible or pliable conduit between a machine and its isolator',
      'The metal trunking carrying the circuits, where its continuity is maintained',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 543.2.3 prohibits gas pipes, oil pipes, flexible or pliable conduit, support wires, other flexible metallic parts and constructional parts subject to mechanical stress from being selected as protective conductors. Flexible conduit relies on a wound or interlocked construction whose continuity cannot be relied on after flexing, so a separate protective conductor must be run inside or alongside it.',
    section: '4.4.5',
    difficulty: 'advanced',
    topic: 'Protective Conductors',
  },
  {
    id: 319,
    question:
      'Under what condition may a steel conduit system serve as the circuit protective conductor?',
    options: [
      'Where it meets the continuity, cross-sectional area and connection requirements',
      'Where every circuit that it contains is protected by a 30 mA RCD, fitted at the origin',
      'Where a separate copper conductor is also drawn in, and left disconnected at both ends',
      'Where the conduit has been painted at each of its joints, to prevent corrosion',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 543.2.1(f) permits a metal conduit or other electrically continuous enclosure or support system to be a protective conductor provided the continuity, cross-sectional area and connection requirements of 543.2 are met — which in practice means tight, clean, unpainted joints and earth tails to every box. Paint at a joint is a barrier to continuity, not an aid to it.',
    section: '4.4.5',
    difficulty: 'intermediate',
    topic: 'Protective Conductors',
  },
  {
    id: 320,
    question:
      'In which situation may RCD protection be omitted from a socket-outlet rated at 32 A or less?',
    options: [
      'In a dwelling, where the socket-outlet is labelled for use by one item of equipment only',
      'Other than in a dwelling, where a documented risk assessment shows it is not needed',
      'Anywhere, where the socket-outlet is mounted more than 1.2 m above finished floor level',
      'In a dwelling, where the circuit is wired in steel conduit throughout its whole length',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.3 applies to socket-outlets with a rated current not exceeding 32 A, and the only exception permits omission where, other than for a dwelling, a documented risk assessment determines RCD protection is not necessary. The labelled-socket exemption that older editions allowed no longer applies, and there is no exception at all for dwellings.',
    section: '4.4.6',
    difficulty: 'advanced',
    topic: 'RCD Protection',
  },
  {
    id: 321,
    question:
      'A prescribed cable zone runs horizontally along the top of a wall. How far down the wall does that zone extend?',
    options: [
      'A band 100 mm deep measured from the top of the wall',
      'A band 250 mm deep measured from the top of the wall',
      'A band 150 mm deep measured from the top of the wall',
      'A band 300 mm deep measured from the top of the wall',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 defines a prescribed zone as within 150 mm from the top of a wall or partition, and equally within 150 mm of an angle formed by two adjoining walls. Cables run in that zone are still subject to the protections set out in Table 52.1 and Regulation 522.6.202. Learners often pick a figure taken from depth rules instead, but the depth a cable is buried into the wall and the width of the surface zone are two separate measurements and are not interchangeable.',
    section: '4.1.1',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 322,
    question:
      'A thermoplastic twin and earth cable is chased into a plastered wall at a depth of 30 mm and run in a prescribed zone. What further measure does BS 7671 require?',
    options: [
      'Additional protection by an RCD rated at not more than 30 mA',
      'Overload protection by a circuit-breaker rated at not more than 30 A',
      'A supplementary bonding conductor run alongside the buried cable',
      'A durable warning notice fixed beside the accessory served',
    ],
    correctAnswer: 0,
    explanation:
      'Table 52.1 and Regulation 522.6.202 call for additional protection by a 30 mA RCD where a cable is concealed in a wall at a depth of less than 50 mm and does not have one of the alternative protections of Regulation 522.6.204. Reducing the protective device rating does nothing here, because the hazard is a nail or screw penetrating the cable and making an exposed metal part live, which only a residual current device can address quickly enough.',
    section: '4.1.2',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 323,
    question:
      'A cable is drilled through floor joists to feed a socket circuit under floorboards. Where must the hole be positioned?',
    options: [
      'At least 25 mm measured vertically from the top or bottom of the joist',
      'At least 75 mm measured vertically from the top or bottom of the joist',
      'At least 100 mm measured vertically from the top or bottom of the joist',
      'At least 50 mm measured vertically from the top or bottom of the joist',
    ],
    correctAnswer: 3,
    explanation:
      'Where a cable passes through a joist in a floor or ceiling construction, or through a ceiling support, it shall be at least 50 mm measured vertically from the top or the bottom of the joist or batten as appropriate. The measurement is taken perpendicular to the horizontal plane of the joist, so for cables under floorboards it is taken from the top. Where 50 mm cannot be achieved the regulation offers an alternative route to compliance rather than allowing a shallower hole to stand on its own.',
    section: '4.1.3',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 324,
    question:
      'What does BS 7671 state about the radius of every bend formed in a wiring system?',
    options: [
      'It must be at least six times the overall diameter of the finished cable',
      'It must avoid damage to the cable and stress on its terminations',
      'It must be at least twice the overall diameter of a single core',
      'It must match the radius of the bending spring used to form it',
    ],
    correctAnswer: 1,
    explanation:
      'The regulation is written as a performance requirement, not a fixed number: the radius of every bend shall be such that conductors and cables do not suffer damage and terminations are not stressed. Fixed multiples of cable diameter are published by cable makers and are useful working figures, but quoting one as the BS 7671 rule is wrong because the standard deliberately leaves the value to the cable construction and the manufacturer data.',
    section: '4.1.4',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 325,
    question:
      'A luminaire is fed through a short length of flexible metallic conduit. How must that final connection be earthed?',
    options: [
      'The conduit itself may serve as the circuit protective conductor',
      'A separate protective conductor must be run within the flexible conduit',
      'The conduit may serve as the protective conductor if bonded at both ends',
      'The conduit may serve as the protective conductor on runs under two metres',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 543.2.3 bars flexible or pliable conduit from being selected as a protective conductor, alongside gas pipes, oil pipes, support wires and structural parts subject to mechanical stress. Bonding the ends does not rescue it, because the objection is that a flexible metallic sheath cannot be relied on to hold a low and stable impedance for the life of the installation, so the green and yellow conductor of the circuit must do the job.',
    section: '4.2.1',
    difficulty: 'advanced',
    topic: 'Containment Systems',
  },
  {
    id: 326,
    question:
      'Under what conditions may a steel trunking system be regarded as the circuit protective conductor for the circuits it carries?',
    options: [
      'When it is electrically continuous and contains all conductors of those circuits',
      'When it has been painted at every joint and coupler to prevent corrosion of the steel',
      'When it is at least 50 mm square in section and carries no more than six final circuits',
      'When it is supported on brackets spaced at no more than one metre apart along the run',
    ],
    correctAnswer: 0,
    explanation:
      'A steel conduit or trunking system may form the protective conductor where it is electrically continuous, bonded to the earthing terminal at the origin, and encloses all the line, neutral and protective conductors of the circuits concerned. Support spacing and section size matter for mechanical reasons but neither creates the earth path. Paint at joints works against the requirement, since it raises joint resistance and threatens the electrical continuity the arrangement depends on.',
    section: '4.2.2',
    difficulty: 'intermediate',
    topic: 'Containment Systems',
  },
  {
    id: 327,
    question:
      'Cables pass through a fire-resisting compartment wall. What does Regulation 527.2.1 require of the opening left around them?',
    options: [
      'It shall be packed with mineral wool and left open for any future cables to pass',
      'It shall be sealed to the degree of fire resistance of the element pierced',
      'It shall be sealed only where the wall separates two separate dwellings',
      'It shall be filled with expanding foam once all of the cables are energised',
    ],
    correctAnswer: 1,
    explanation:
      'Where a wiring system passes through a floor, wall, ceiling, partition or cavity barrier, the opening left after its passage shall be sealed to the degree of fire resistance prescribed for that element. Sealing is not restricted to walls between dwellings, and during erection a temporary seal must be provided, while any sealing disturbed by alteration work has to be reinstated as soon as practicable rather than left until the job is finished.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Containment Systems',
  },
  {
    id: 328,
    question:
      'A conduit classified as non-flame propagating passes through a fire-resisting wall. Up to what internal cross-sectional area may internal sealing be omitted?',
    options: [
      '310 square millimetres',
      '1000 square millimetres',
      '500 square millimetres',
      '710 square millimetres',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 527.2.3 allows a conduit, trunking or ducting system classified as non-flame propagating to the relevant product standard, with a maximum internal cross-sectional area of 710 square millimetres, to go without internal sealing provided its further conditions are met. The concession applies to the internal seal alone, so the opening around the outside of the containment must still be sealed to the fire resistance of the element it penetrates.',
    section: '4.2.4',
    difficulty: 'intermediate',
    topic: 'Containment Systems',
  },
  {
    id: 329,
    question:
      'When checking a completed distribution board, what does Regulation 526.1 require of every conductor connection?',
    options: [
      'Each conductor shall be sleeved in green and yellow at the terminal',
      'Each conductor shall be looped at the terminal to allow later re-use',
      'Each conductor shall be correctly located in its terminal and secure',
      'Each conductor shall be cut so that no slack remains in the enclosure',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 526.1 requires every conductor connection, including connections to busbars, to be correctly located in its terminal and to be tight and secure, with manufacturer torque figures applied where given. Green and yellow sleeving identifies protective conductors only, so it is not a general rule for every conductor, and cutting conductors so short that no slack remains removes the ability to remake a termination later and risks strain being carried by the terminal.',
    section: '4.3.1',
    difficulty: 'basic',
    topic: 'Cable Terminations',
  },
  {
    id: 330,
    question:
      'Every connection must be accessible for inspection, testing and maintenance. Which of these is listed as an exception to that requirement?',
    options: [
      'A junction box fixed on a joist above a plasterboard ceiling',
      'A compound-filled or encapsulated joint made off in the cable run',
      'A connection made inside a sealed metal adaptable box on the trunking',
      'A joint made with insulated crimps taped inside a floor void',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 526.3 lists the exceptions, which include joints designed to be buried in the ground, compound-filled or encapsulated joints, cold tail connections to heating elements, and joints made by welding, soldering, brazing or an appropriate compression tool. A taped crimp in a floor void is not one of them, and neither is a junction box hidden above a ceiling, because both remain ordinary connections that the standard expects to be reachable without destructive work.',
    section: '4.3.2',
    difficulty: 'advanced',
    topic: 'Cable Terminations',
  },
  {
    id: 331,
    question:
      'A multicore cable enters a metal enclosure and lands on a terminal block. What must be provided so that movement of the cable cannot reach the terminals?',
    options: [
      'A short service loop of cable coiled neatly inside the enclosure',
      'A grommet fitted in the entry to protect the sheath from the edge',
      'A separate earth tag bonding the enclosure lid to its back box',
      'A cable anchorage such as a gland or clamp taking any strain',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires an anchorage, for example a gland, clamp or dedicated fixing point, so that tension or movement in the cable is taken by the anchorage and never transmitted to the terminal. A grommet is worth fitting because it protects the sheath from a sharp knockout edge, but it grips nothing, so any pull on the cable still passes straight through to the terminations and can loosen a connection over time.',
    section: '4.3.3',
    difficulty: 'intermediate',
    topic: 'Cable Terminations',
  },
  {
    id: 332,
    question:
      'Cables are clipped direct to a wall along a corridor. What does NOTE 3 to Regulation 521.10.202 rule out?',
    options: [
      'Non-metallic clips or cable ties used as the sole means of support',
      'Cables clipped direct where a cable tray could have been installed',
      'Steel clips fixed with plugs into blockwork rather than into timber',
      'Cables run in a vertical drop without a mid-height fixing bracket',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 521.10.202 requires wiring systems to be supported so that they cannot fall away prematurely, and its NOTE 3 precludes non-metallic clips or cable ties as the sole means of support where cables are clipped direct or suspended under a cable tray, and non-metallic trunking as the sole means of support. Clipping direct is not itself banned, so the fix is metallic support at suitable intervals rather than abandoning the method.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixings',
  },
  {
    id: 333,
    question:
      'What does Regulation 522.8.5 require to be taken into account when deciding support spacing for a heavy cable?',
    options: [
      'The number of circuits sharing the same containment as the cable',
      'The rated current of the protective device at the origin of the run',
      'The mechanical strain imposed by the weight of the cable itself',
      'The maximum ambient temperature expected along the cable route',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 522.8.5 makes the supported weight of the cable or conductor the deciding factor, so longer or heavier spans need closer or additional supports to avoid undue strain being carried by the cable or passed on to its terminations. Ambient temperature and grouping matter greatly, but they change the current-carrying capacity of the cable rather than how far apart its fixings can safely be placed.',
    section: '4.4.2',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixings',
  },
  {
    id: 334,
    question:
      'A single cable is totally surrounded by thermal insulation for a length of 0.8 m. In the absence of more precise information, what rating applies?',
    options: [
      'Two thirds of its capacity when clipped direct to a surface',
      'Half of its capacity when clipped direct to a surface in free air',
      'The same capacity as when it is clipped direct to a surface',
      'One quarter of its capacity when clipped direct to a surface',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 523.9 states that for a single cable likely to be totally surrounded by thermally insulating material over a length of 0.5 m or more, the current-carrying capacity shall be taken as 0.5 times the value for that cable clipped direct to a surface and open to the air. The 0.8 m run exceeds the 0.5 m trigger, so the full derating applies rather than any intermediate allowance, and no reduction at all would leave the conductor running hotter than its insulation permits.',
    section: '4.7.1',
    difficulty: 'advanced',
    topic: 'Installation Methods',
  },
  {
    id: 335,
    question:
      'What is the correct order of the main steps when isolating a final circuit before work begins?',
    options: [
      'Identify, prove dead, isolate, then secure the isolator against reconnection',
      'Isolate, identify, prove dead, then secure the isolator against reconnection',
      'Identify, prove dead, secure the isolator, then isolate the circuit at source',
      'Identify, isolate, secure against reconnection, then prove the circuit dead',
    ],
    correctAnswer: 3,
    explanation:
      'The circuit is identified, isolated, secured with a lock and unique key plus a caution notice, and only then proved dead. Securing must come before proving because a circuit proved dead and left unlocked can be switched back on by someone else while work is under way, which makes the proving worthless. Proving dead last is what confirms the isolation you have already locked off is the correct one.',
    section: '4.5.1',
    difficulty: 'advanced',
    topic: 'Safe Isolation',
  },
  {
    id: 336,
    question:
      'A two-pole voltage indicator is used to prove a circuit dead. What sequence must be followed with it?',
    options: [
      'Prove the indicator on a known source, test the circuit, then prove it again',
      'Test the circuit, then prove the indicator on a known source once only',
      'Prove the indicator on a known source, then test the circuit and record it',
      'Test the circuit twice, using two different indicators of the same type',
    ],
    correctAnswer: 0,
    explanation:
      'The prove, test, prove sequence uses a proving unit or other known live source before and after the test on the circuit. The final proving is the step people drop, yet it is the one that matters, because an indicator that failed between the first check and the test would have shown no voltage on a live circuit and the second proving is what exposes that failure before anyone touches conductors.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Safe Isolation',
  },
  {
    id: 337,
    question:
      'Why must a semiconductor device not be relied on to provide isolation before work is carried out?',
    options: [
      'Because it will always fail short circuit as soon as load current flows',
      'Because its rating falls once the ambient temperature exceeds 30 degrees C',
      'Because it cannot give the secure separation an isolating device must achieve',
      'Because it needs a separate control supply to hold its contacts held apart',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 537.2.2 requires a mechanical isolating device rather than a semiconductor device, because a solid state switch can pass leakage current and can fail in a conducting state, so it cannot guarantee separation between the working area and the supply. Thermal derating is a genuine property of semiconductors but it is a rating issue, not the reason the standard refuses them the isolation role.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'Safe Isolation',
  },
  {
    id: 338,
    question:
      'An installation is fed by the public supply and a standby generator. What does BS 7671 require in addition to a main switch for each source?',
    options: [
      'A single main switch, disconnecting both sources in one operation',
      'A durable warning notice, or alternatively a suitable interlock system',
      'A label giving the generator rating, fixed to the consumer unit cover',
      'A separate earth electrode, dedicated to the generator neutral point',
    ],
    correctAnswer: 1,
    explanation:
      'Where an installation is supplied from more than one source, each source needs a main switch suitable for isolation, plus either a durable warning notice telling the operator that all such switches must be opened or a suitable interlock system that prevents the sources being paralleled. The danger addressed is someone opening one switch, believing the whole installation is dead, and then working on conductors still energised by the second source.',
    section: '4.5.4',
    difficulty: 'intermediate',
    topic: 'Safe Isolation',
  },
  {
    id: 339,
    question:
      'A two-core steel wire armoured cable to BS 5467 is being installed. Which statement about its insulation is correct?',
    options: [
      'It is thermoplastic PVC insulation with a conductor limit of 70 degrees C',
      'It is mineral insulation with a bare sheath limit of 70 degrees C in reach',
      'It is thermosetting XLPE insulation with a conductor limit of 90 degrees C',
      'It is thermosetting rubber insulation with a limit of 60 degrees C in air',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5467 covers thermosetting insulated armoured cables, so the insulation is cross-linked polyethylene and Table 52.2 gives thermosetting insulation a conductor limit of 90 degrees C. Calling it PVC at 70 degrees C is the usual error, and it also matters for earthing, because the armour of a cable to BS 5467 is one of the earthed metallic coverings Regulation 522.6.204 accepts where Table 52.1 stipulates one.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Cable Selection',
  },
  {
    id: 340,
    question:
      'Why is a 90 degrees C thermosetting cable sometimes rated using the 70 degrees C current-carrying capacity columns?',
    options: [
      'Because thermosetting cable loses its rating once glanded into steel',
      'Because Appendix 4 forbids thermosetting cable in domestic premises',
      'Because the tables for 90 degrees C cable were withdrawn from Part 4',
      'Because the rating has to be based on the lower 70 degrees C figure',
    ],
    correctAnswer: 3,
    explanation:
      'Appendix 4 notes that where the current rating is to be based on 70 degrees C, the capacities in Tables 4D1 to 4D5 or 4H1 to 4H4 may be used for 90 degrees C thermosetting insulated cables. It is a permission that applies only in that circumstance, not a withdrawal of the thermosetting tables, and thermosetting cable is not barred from any type of premises. Glanding into steel does not alter the insulation rating of the cable.',
    section: '4.6.2',
    difficulty: 'intermediate',
    topic: 'Cable Selection',
  },
  {
    id: 341,
    question:
      'What information does Table 4A2 of Appendix 4 give the installer?',
    options: [
      'Examples of installation methods with the reference method for ratings',
      'Correction factors for groups of circuits enclosed in a common conduit',
      'Maximum permitted lengths of final circuits for each protective device',
      'Minimum bending radii for each size of thermosetting insulated cable',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 521.3 explains that Table 4A2 gives examples of installation methods together with the reference method to be used for obtaining current-carrying capacity, where the same capacities can safely be applied, while Table 4A3 points to the correct rating table for each cable construction. BS 7671 tabulates no bending radii at all, which is why that option cannot be right however plausible it looks.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Installation Methods',
  },
  {
    id: 342,
    question:
      'Which of these must be taken into account when determining the cross-sectional area of a circuit conductor?',
    options: [
      'The colour of the outer sheath chosen for the cable',
      'The method by which the cable is to be installed',
      'The make of accessory fitted at the end of the run',
      'The order in which the circuits will later be tested',
    ],
    correctAnswer: 1,
    explanation:
      'The method of installation has to be taken into account because it changes how readily heat escapes from the conductor. A cable in conduit, buried, clipped direct, grouped with others or surrounded by thermal insulation all carry different current-carrying capacities, so the same load can demand a larger conductor in one situation than another. Sheath colour, accessory brand and test order have no bearing on conductor heating.',
    section: '4.7.3',
    difficulty: 'basic',
    topic: 'Installation Methods',
  },
  {
    id: 343,
    question:
      'How far above the surface on which a person stands does arm\'s reach extend?',
    options: [
      '2.00 m, ignoring obstacles giving less than IP2X protection',
      '1.75 m, ignoring obstacles giving less than IP2X protection',
      '2.50 m, ignoring obstacles giving less than IP2X protection',
      '3.00 m, ignoring obstacles giving less than IP2X protection',
    ],
    correctAnswer: 2,
    explanation:
      'Arms reach in the overhead direction is 2.50 m measured from the surface a person occupies, and that figure is not reduced by any intermediate obstacle affording less than IPXXB or IP2X. Where a horizontal restriction such as a handrail or mesh screen gives less than that degree of protection, arms reach is measured from the obstacle itself, so a flimsy barrier moves the starting point rather than removing the risk.',
    section: '4.8.1',
    difficulty: 'intermediate',
    topic: 'Safe Working Practice',
  },
  {
    id: 344,
    question:
      'What is required in respect of the periodic examination of ladders and stepladders used on site?',
    options: [
      'They must be replaced every three years whether or not damage is found',
      'They must be examined by the user before the start of every working week',
      'They must be examined only after a fall or a reported incident on site',
      'They must be examined annually by a competent person and results recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Ladders and stepladders should be tested and examined annually by a competent person, with the results recorded and the item marked to show it has been examined. That formal examination sits alongside, and is not replaced by, the users own check before use for cracked stiles, missing or weakened rungs, and grease or mud on the rungs. Waiting for an incident before examining equipment reverses the whole purpose of inspection.',
    section: '4.8.2',
    difficulty: 'intermediate',
    topic: 'Safe Working Practice',
  },
  {
    id: 345,
    question: 'How should the foot of a leaning ladder be positioned on site?',
    options: [
      'On firm level ground, never packed up on bricks or loose blocks',
      'On any surface, provided a second worker holds the stiles throughout',
      'On bricks or blocks, where the ground falls away from the wall face',
      'On soft ground, so that the stiles bed in and cannot slide outwards',
    ],
    correctAnswer: 0,
    explanation:
      'A ladder must stand on firm, level ground, and bricks or blocks must not be used to make up a level. Packing under one stile gives a base that can rock or crumble under load at the very moment the climber is least able to react. Footing the ladder by hand is a recognised measure against slipping, but it stabilises the base and does nothing about ground that cannot carry the load in the first place.',
    section: '4.8.3',
    difficulty: 'basic',
    topic: 'Safe Working Practice',
  },
  {
    id: 346,
    question:
      'What is the first control measure in the hierarchy for a hazardous substance at work?',
    options: [
      'Enclose the process, so that the substance cannot escape',
      'Provide local exhaust ventilation, close to the work position',
      'Eliminate the need for the substance, for example by redesign',
      'Issue respiratory protective equipment, face-fit tested, to those exposed',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy runs eliminate the need for the substance, substitute something less hazardous, isolate or enclose the process, then local exhaust ventilation, with personal protective equipment last. Enclosure and extraction are genuine controls but they sit below elimination, and choosing them first leaves the hazard present on site. Protective equipment ranks last because it protects only the wearer and only while it is worn correctly.',
    section: '4.8.4',
    difficulty: 'intermediate',
    topic: 'Safe Working Practice',
  },
  {
    id: 347,
    question:
      'What does Regulation 522.8.12 require of the means of fixing selected for a cable run?',
    options: [
      'That every fixing is made from a metal compatible with the cable sheath',
      'That fixings are torqued to the value stated by the fixing manufacturer',
      'That fixings are spaced evenly at whatever interval suits the surface',
      'That fixings neither crush the cable nor force a sharper bend than allowed',
    ],
    correctAnswer: 3,
    explanation:
      'Fixings must be positioned and designed so that the required minimum bending radius is maintained and not made more severe by the fixing itself, and spaced to suit the cable type and weight so that spans do not sag while individual fixings do not crush the cable. Even spacing sounds tidy but is not the test, because the correct interval follows from the weight and construction of the cable rather than from the look of the run.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Cable Support and Fixings',
  },
  {
    id: 348,
    question:
      'A fire seal around a trunking penetration is broken open to add cables during alteration work. What does BS 7671 require?',
    options: [
      'The seal may be left open until the final inspection of the works',
      'The seal shall be reinstated as soon as practicable after the work',
      'The seal need only be replaced where the trunking is metallic',
      'The seal must be renewed by the builder rather than the installer',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 527.2.1.2 requires sealing that has been disturbed to be reinstated as soon as practicable, and 527.2.1.1 requires temporary sealing during erection, so an opening is never simply left until handover. The material of the containment makes no difference either, since conduit, trunking and ducting penetrating a fire-resisting element must be sealed internally as well as around the outside.',
    section: '4.2.5',
    difficulty: 'basic',
    topic: 'Containment Systems',
  },
  {
    id: 349,
    question:
      'Cable terminations are housed in an outdoor pit where water can collect around them. What does BS 7671 expect?',
    options: [
      'Provision for the escape of water, such as drainage from the pit',
      'A desiccant sachet inside the enclosure, changed once a year',
      'The terminations raised above the pit floor, clear of the flood level',
      'A heater fitted in the pit, holding the terminations above dew point',
    ],
    correctAnswer: 0,
    explanation:
      'Where water may collect in ducts or pits around terminations, provision shall be made for its escape, for example a sump with a drainage outlet or a conduit run falling to an accessible drainage point, with any test plugs removable so drainage stays possible. The approach assumes water will get in and gives it a way out, whereas measures that only try to keep the enclosure dry fail as soon as the first seal is disturbed.',
    section: '4.3.4',
    difficulty: 'intermediate',
    topic: 'Cable Terminations',
  },
  {
    id: 350,
    question:
      'A cable is concealed in a partition built with metal studs. When is additional protection by a 30 mA RCD required?',
    options: [
      'Only where the cable lies shallower than 50 mm, measured from the surface',
      'Only where the cable crosses a metal stud, rather than running beside it',
      'Only where the circuit supplies socket-outlets, whatever the cable depth',
      'At any depth, because the partition contains metallic parts',
    ],
    correctAnswer: 3,
    explanation:
      'Table 52.1 calls for additional protection by a residual current device not exceeding 30 mA for cables concealed in a wall or partition containing metallic parts, whatever the depth of concealment, because a fixing driven into the construction can make the metalwork live. The depth of less than 50 mm is the separate trigger that applies to walls without metal parts, so applying it here would leave a deeper cable in a metal-framed partition unprotected.',
    section: '4.1.5',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 351,
    question: 'Which hand tool gives the truest line when marking a long horizontal run of trunking on a plastered wall?',
    options: [
      'A torpedo level held on the wall',
      'A steel rule laid along the wall',
      'A tape measure held at both ends',
      'A chalk line pulled between two marks',
    ],
    correctAnswer: 3,
    explanation: 'A chalk line snaps a single straight line over the full length in one operation, so no cumulative error builds up. Option A is what gets used in practice, but stepping a short level along a long wall carries every small error forward and the run ends up visibly out.',
    section: '4.2.2',
    difficulty: 'basic',
    topic: 'Measuring Tools',
  },
  {
    id: 352,
    question: 'Why is a ratchet crimping tool preferred to a plier-type crimper for terminating bootlace ferrules?',
    options: [
      'It will not release until the full crimp is made',
      'It measures the resistance of the completed crimp',
      'It strips the insulation while the crimp is formed',
      'It cuts the conductor to length before each crimp',
    ],
    correctAnswer: 0,
    explanation: 'The ratchet mechanism holds until the jaws have travelled their full stroke, so every crimp gets the same compression regardless of hand strength. Option B is the one that sounds most reassuring, but no crimper tests the joint; that is what a continuity test is for.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Crimping Tools',
  },
  {
    id: 353,
    question: 'A bender produces bends that are consistently slightly under 90 degrees on 20 mm steel conduit. What is the usual cause?',
    options: [
      'The former fitted to the bender is oversized',
      'The conduit was cut before it was measured',
      'Springback in the conduit after bending',
      'The conduit was reamed after cutting',
    ],
    correctAnswer: 2,
    explanation: 'Steel conduit relaxes slightly when the pressure comes off, so the bend must be pulled past the target angle to finish square. Option A would change the radius rather than the angle, which is the distinction that separates a bending fault from a tooling fault.',
    section: '4.3.3',
    difficulty: 'advanced',
    topic: 'Bending Tools',
  },
  {
    id: 354,
    question: 'Why is an SDS hammer drill chosen over a standard percussion drill for fixing cable tray to a concrete soffit?',
    options: [
      'It does not need an RCD fitted to the supply',
      'It transmits the hammer action through the bit',
      'It removes the need to check for buried services',
      'It runs at a lower voltage than a percussion drill',
    ],
    correctAnswer: 1,
    explanation: 'An SDS mechanism strikes the shank of the bit directly, so it drills concrete with far less feed pressure, which matters when working overhead. Option A is dangerous nonsense: the tool type has no bearing on the need for RCD protection on a site supply.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Power Tool Safety',
  },
  {
    id: 355,
    question: 'A 110 V site transformer is centre-tapped to earth. What does that arrangement achieve for the operator?',
    options: [
      'It doubles the current the tool draws',
      'It limits the voltage to earth to 55 V',
      'It converts the supply from AC to DC',
      'It removes the need for a tool RCD',
    ],
    correctAnswer: 1,
    explanation: 'With the winding centre-tapped to earth, each line sits at half the output voltage relative to earth, so contact with one conductor exposes the operator to 55 V rather than 110 V. Option D is a widespread and dangerous belief: reducing the shock voltage does not remove the need for fault protection.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: '110V Tool Safety',
  },
  {
    id: 356,
    question: 'What should be done first when a power tool is taken from the van at the start of a shift?',
    options: [
      'Run the tool up to speed, unloaded, to warm the motor',
      'Inspect the lead, plug and casing for damage',
      'Record the tool serial number, date and time in the site diary',
      'Fit a fresh bit, blade or disc to the chuck',
    ],
    correctAnswer: 1,
    explanation: 'A user check for damaged leads, cracked casings and loose plugs catches most faults before the tool is energised. Option C is administratively useful but does nothing about a damaged lead, and the checking of paperwork often crowds out the physical inspection.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: 'Power Tool Safety',
  },
  {
    id: 357,
    question: 'An angle grinder is found with a hairline crack in its guard. What is the correct action?',
    options: [
      'Report it at the end of the working week',
      'Tape the crack and finish the current task',
      'Continue using it with a full face shield fitted',
      'Withdraw it from use and label it as faulty',
    ],
    correctAnswer: 3,
    explanation: 'A damaged guard is the last barrier between the operator and a bursting disc, so the tool is taken out of service and marked so nobody else picks it up. Option C is the tempting compromise, but PPE is the last line of defence and never a substitute for a working guard.',
    section: '4.7.2',
    difficulty: 'intermediate',
    topic: 'Power Tool Safety',
  },
  {
    id: 358,
    question: 'A multifunction tester is due for calibration next month but has been dropped. What should happen before it is used again?',
    options: [
      'It should be checked against a known resistance',
      'It should have new leads fitted and then be used',
      'It should be used until the calibration expires',
      'It should be sent back only if it reads zero',
    ],
    correctAnswer: 0,
    explanation: 'A verification check against a known value shows whether the impact has shifted the readings, and it can be done immediately on site. Option C relies on the calibration certificate, which only states the instrument was accurate on the day it was tested and says nothing about what has happened since.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Instrument Calibration',
  },
  {
    id: 359,
    question: 'A site supply at 230 V feeds portable tools through a 30 mA RCD. Why is a 110 V centre-tapped supply still preferred?',
    options: [
      'It removes the need to inspect leads, plugs and casings',
      'It stops the RCD tripping, even on motor inrush',
      'It allows longer leads, with less volt drop',
      'It limits the shock voltage, not the shock time',
    ],
    correctAnswer: 3,
    explanation: 'An RCD limits how long a shock lasts but does nothing about how hard it is; reducing the voltage to earth reduces the current through the body in the first place. Option C is the opposite of the truth: at 110 V the current is higher for the same power, so volt drop over a long lead is worse.',
    section: '4.7.2',
    difficulty: 'advanced',
    topic: 'RCD Protection',
  },
  {
    id: 360,
    question: 'A low resistance ohmmeter gives readings that drift during a continuity test. Which check comes first?',
    options: [
      'Increase the test voltage on the instrument range',
      'Record the highest reading seen on the instrument',
      'Null the leads and repeat with the leads shorted',
      'Change the instrument over to the insulation range',
    ],
    correctAnswer: 2,
    explanation: 'Shorting the leads together should give a stable zero once nulled, which separates an instrument or lead fault from a genuine circuit fault. Option B is the shortcut that gets taken under time pressure, and it records a lead problem as though it were a circuit defect.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Instrument Reliability',
  },
  {
    id: 361,
    question: 'Which item of PPE addresses the specific hazard of drilling overhead into concrete?',
    options: [
      'Gloves rated for cut resistance at the palm',
      'Eye protection to a recognised impact standard',
      'Boots with a steel midsole and steel toe cap',
      'A high visibility vest over the work clothing worn',
    ],
    correctAnswer: 1,
    explanation: 'Drilling overhead drops dust and fragments directly into the face, so impact-rated eye protection is the item matched to that hazard. Option C protects against a real site hazard but an entirely different one, and swapping general site PPE for task PPE is how eye injuries happen.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Drilling PPE',
  },
  {
    id: 362,
    question: 'Chasing a masonry wall with a wall chaser produces silica dust. Which control comes before issuing a respirator?',
    options: [
      'A face fit test for the operative wearing it',
      'A dust mask issued at the tool store',
      'On-tool extraction fitted to the chaser',
      'A warning sign at the entrance to the room',
    ],
    correctAnswer: 2,
    explanation: 'Controlling the dust at source sits above personal protection in the hierarchy, and on-tool extraction removes most of it before it reaches anyone. Option A is a genuine requirement, but it applies to the respirator, which is the control you fall back on once extraction has done its job.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'Respiratory Protection',
  },
  {
    id: 363,
    question: 'Two operatives must shout to be heard at two metres apart while a breaker runs nearby. What does that indicate?',
    options: [
      'Hearing protection is needed after a survey',
      'Hearing protection is needed by both operatives',
      'Hearing protection is needed by the operator',
      'Hearing protection is not needed for brief work',
    ],
    correctAnswer: 1,
    explanation: 'Needing to shout at two metres is the standard rule of thumb that noise has reached a level requiring action, and it applies to anyone in that area. Option C is the everyday mistake: noise does not stop at the person holding the tool.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'Hearing Protection',
  },
  {
    id: 364,
    question: 'Gloves used to handle a two-part resin compound are put back in the toolbox at the end of the job. Why is that wrong?',
    options: [
      'The gloves must be washed out before every reuse',
      'The gloves lose their electrical insulation value',
      'The resin makes the gloves far too stiff to work in',
      'The residue can transfer to the hands next time',
    ],
    correctAnswer: 3,
    explanation: 'Contaminated PPE carries the hazard with it, so the exposure happens the next time the gloves are pulled on rather than during the original task. Option C describes an inconvenience rather than the health risk, and it is the reason contaminated gloves get kept rather than disposed of.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'PPE Contamination',
  },
  {
    id: 365,
    question: 'Cable is to be pulled into a duct from a deep chamber in a car park. Which control is fundamental before anyone enters?',
    options: [
      'Marking the chamber lid position on the drawing',
      'Testing the atmosphere and planning a rescue',
      'Issuing gloves and eye protection to the entrant',
      'Fitting a 110 V lamp inside the chamber',
    ],
    correctAnswer: 1,
    explanation: 'A deep chamber can hold a hazardous or oxygen-deficient atmosphere, and anyone overcome inside cannot self-rescue, so testing and a rescue arrangement come before entry. Option C is the reflex answer, but PPE does nothing about an atmosphere that will not support life.',
    section: '4.7.1',
    difficulty: 'basic',
    topic: 'Confined Space PPE',
  },
  {
    id: 366,
    question: 'Second fix luminaires are to be fitted along a 40 m corridor at 3 m height, with many separate stops. Which access equipment is most suitable?',
    options: [
      'A mobile tower built at the mid point',
      'A pair of trestles with a scaffold board laid',
      'A podium step moved along the corridor',
      'A leaning ladder repositioned at each point',
    ],
    correctAnswer: 2,
    explanation: 'A podium gives a guarded platform with both hands free and is quick to reposition, which suits many short stops along a run. Option A is the trap: a tower is excellent for one position but cannot serve a 40 m corridor without repeated dismantling.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'Access Equipment Selection',
  },
  {
    id: 367,
    question: 'A scissor lift is to be used on a concrete slab over a basement car park. Which check is essential before it is driven on?',
    options: [
      'The colour code on the inspection tag',
      'The slab capacity against the machine weight',
      'The machine battery charge at the start',
      'The height of the lift below the ceiling',
    ],
    correctAnswer: 1,
    explanation: 'A loaded scissor lift concentrates several tonnes onto small wheels, and a suspended slab may not be designed for it. Option C is a genuine pre-use check but a trivial one by comparison, and it is the one people remember while the structural question goes unasked.',
    section: '4.7.3',
    difficulty: 'intermediate',
    topic: 'MEWP Safety',
  },
  {
    id: 368,
    question: 'From which datum is the mounting height of a socket-outlet in a dwelling measured?',
    options: [
      'The top of the floor joist',
      'The screed before flooring',
      'The top of the skirting board',
      'Finished floor level',
    ],
    correctAnswer: 3,
    explanation: 'Heights for switches and socket-outlets are taken from finished floor level, so the covering thickness is already accounted for. Option B is what happens at first fix when the floor finish is not yet down, and every accessory ends up low by the depth of the finish.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Socket Heights',
  },
  {
    id: 369,
    question: 'Within which band should switches and socket-outlets be positioned in a dwelling, measured from finished floor level?',
    options: [
      '450 mm to 1200 mm',
      '1200 mm to 1800 mm',
      '300 mm to 900 mm',
      '150 mm to 450 mm',
    ],
    correctAnswer: 0,
    explanation: 'The accessible band runs from 450 mm to 1200 mm, which keeps controls reachable by seated and standing users alike. Option D is the older domestic habit of setting sockets just above the skirting, which falls below the accessible band.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Switch Heights',
  },
  {
    id: 370,
    question: 'A row of six sockets is to be set out along a wall that is 20 mm out of level over its length. How should the heights be taken?',
    options: [
      'From the ceiling downward at each position',
      'From a single level line struck across the wall',
      'From the skirting board top at each position',
      'From the floor at each individual socket position',
    ],
    correctAnswer: 1,
    explanation: 'Working from one struck level line puts every box on the same plane, so the row reads straight even though the floor is not. Option D is the instinctive method and reproduces the 20 mm error across the finished sockets, where the eye picks it up immediately.',
    section: '4.2.1',
    difficulty: 'intermediate',
    topic: 'Reference Points',
  },
  {
    id: 371,
    question: 'Forty identical twin socket boxes are to be set into a dry lined wall. What does a template give the installer?',
    options: [
      'A means of finding the studs behind the board',
      'Repeatable cut-outs without measuring each one',
      'Protection for the board while cutting out',
      'A record of the positions for the drawing',
    ],
    correctAnswer: 1,
    explanation: 'A template removes the measuring and marking step from each box, which is where variation and error creep in over forty repeats. Option A is a separate job entirely: the studs still have to be found before the template can be positioned.',
    section: '4.2.3',
    difficulty: 'intermediate',
    topic: 'Templates',
  },
  {
    id: 372,
    question: 'A consumer unit is being installed in a new dwelling. What governs the height at which its main switch is set?',
    options: [
      'The height of the nearest run of socket-outlets',
      'The length of the meter tails from the cut-out',
      'The reach of the electrician fitting the unit',
      'Accessibility requirements for the occupants',
    ],
    correctAnswer: 3,
    explanation: 'The main switch must be operable by the people who live there, so accessibility drives the mounting height. Option B is the practical constraint that usually gets argued on site, but tails are cut to suit the position, not the other way round.',
    section: '4.2.1',
    difficulty: 'intermediate',
    topic: 'Consumer Unit Height',
  },
  {
    id: 373,
    question: 'An emergency escape luminaire is to be sited at a change of level on a stair. What determines where it is placed?',
    options: [
      'A fixed height above the finished floor level',
      'The position of the nearest normal luminaire',
      'The point of emphasis it must illuminate',
      'The centre of the stairwell ceiling',
    ],
    correctAnswer: 2,
    explanation: 'Emergency luminaires are positioned to light specific points of emphasis such as stairs, level changes, exits and firefighting equipment. Option A is the assumption carried over from switch and socket work, and it produces evenly spaced fittings that leave the hazard itself in shadow.',
    section: '4.2.1',
    difficulty: 'advanced',
    topic: 'Emergency Lighting Height',
  },
  {
    id: 374,
    question: 'A drawing calls for a socket 300 mm from a door architrave, but a stud sits exactly on that line. What is the correct action?',
    options: [
      'Agree a revised position with the designer',
      'Fit the socket to the face of the stud itself',
      'Move the socket to the far side of the door',
      'Cut the stud to let the box be fitted',
    ],
    correctAnswer: 0,
    explanation: 'A dimensional clash is resolved by the designer, who can see whether the position is critical and can record the change. Option D is the one that gets done quietly and it damages the structure of the partition, which is not the electrician\'s to alter.',
    section: '4.2.3',
    difficulty: 'basic',
    topic: 'Installation Tolerances',
  },
  {
    id: 375,
    question: 'What is the purpose of supporting a cable at regular intervals along its run?',
    options: [
      'To increase the current the cable can carry',
      'To stop the cable weight straining terminations',
      'To keep the cable insulation resistance high',
      'To reduce the voltage drop along the run',
    ],
    correctAnswer: 1,
    explanation: 'Unsupported cable hangs from whatever holds it, and that is usually the terminals at each end. Option A is a common muddle: support method does affect the installation reference method, but adding clips to a run does not raise its rating.',
    section: '4.4.1',
    difficulty: 'basic',
    topic: 'Support Spacing',
  },
  {
    id: 376,
    question: 'Which fixing suits securing a conduit saddle to a solid brick wall?',
    options: [
      'A plugged and screwed fixing',
      'A cavity fixing set in the joint',
      'A self-adhesive pad on the face',
      'A spring toggle through the wall',
    ],
    correctAnswer: 0,
    explanation: 'Solid masonry takes a plug and screw, which grips the full depth of the drilled hole. Option D is designed for hollow board where there is a void behind, and in solid brick the toggle has nothing to open into.',
    section: '4.4.2',
    difficulty: 'basic',
    topic: 'Fixing Methods',
  },
  {
    id: 377,
    question: 'A heavy submain drops 12 m down a riser. What must the support arrangement achieve beyond holding the cable in place?',
    options: [
      'Keep the cable clear of the riser wall',
      'Allow the cable to move as the building settles',
      'Provide earth continuity along the length of run',
      'Take the cable weight off the terminations',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires cables to be supported so they are not exposed to undue mechanical strain, and on a long vertical drop the accumulated weight lands on the terminals unless it is intercepted. Option C is a real requirement for containment used as a cpc, but it is a separate matter from carrying the cable weight.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Vertical Cable Support',
  },
  {
    id: 378,
    question: 'A cable must be chased into a masonry wall at 25 mm depth, running vertically down to a switch within the prescribed zone. What else does BS 7671 require?',
    options: [
      'Additional protection by a 30 mA RCD',
      'A depth of not less than 50 mm at all points',
      'A warning label beside the switch',
      'A run in plastic conduit for the whole drop',
    ],
    correctAnswer: 0,
    explanation: 'Below 50 mm depth the cable needs additional protection by a 30 mA RCD, unless one of the alternatives such as an earthed metallic covering is used instead. Option D is the false comfort: plastic conduit gives no earthed metallic covering and does not stop a screw reaching the conductors.',
    section: '4.4.1',
    difficulty: 'intermediate',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 379,
    question: 'A cable is concealed in a partition built with metal studs, at 60 mm depth and within a prescribed zone. What does BS 7671 require?',
    options: [
      'A cable rated 300/500 V for the run',
      'Nothing more as depth exceeds 50 mm',
      'Additional protection by a 30 mA RCD',
      'A run outside the prescribed zone',
    ],
    correctAnswer: 2,
    explanation: 'Where a wall or partition contains metallic parts the RCD requirement applies regardless of depth, because the metal itself can become live if the cable is penetrated. Option B applies the masonry rule to a metal stud partition, which is the single most common error on modern commercial fit-outs.',
    section: '4.1.1',
    difficulty: 'advanced',
    topic: 'Cable Routes and Safe Zones',
  },
  {
    id: 380,
    question: 'A 1.5 mm squared lighting cable clipped to a loft joist is later buried by 300 mm of mineral wool over 2 m of its length. What must the designer allow for?',
    options: [
      'The full clipped direct current-carrying capacity used',
      'Half the clipped direct current-carrying capacity',
      'A quarter of the clipped direct current-carrying value',
      'The capacity for a cable buried in a plastered wall',
    ],
    correctAnswer: 1,
    explanation: 'A single cable totally surrounded by thermal insulation over 0.5 m or more is taken at 0.5 times the clipped direct value when better information is not available. Option A is what happens when a loft is topped up after the wiring was designed, and the circuit quietly ends up under-rated.',
    section: '4.4.4',
    difficulty: 'advanced',
    topic: 'Thermal Insulation',
  },
  {
    id: 381,
    question: 'Steel trunking crosses a compartment wall with a one hour fire rating, and the cables will not be pulled for another two weeks. What does BS 7671 require in the meantime?',
    options: [
      'The opening is covered by a temporary board',
      'The opening is noted on the schedule of results',
      'The opening is sealed to the fire rating now',
      'The opening may be left until the cables are in',
    ],
    correctAnswer: 2,
    explanation: 'Sealing must be provided as soon as practicable, so a penetration is not left open across a fire compartment while other work goes on. Option D is the normal site assumption, and it leaves a route for fire and smoke through a rated wall for a fortnight.',
    section: '4.4.2',
    difficulty: 'advanced',
    topic: 'Fire Sealing',
  },
  {
    id: 382,
    question: 'A final connection to a vibrating pump is made in flexible metallic conduit taken off a steel conduit system that serves as the circuit protective conductor. What must be added?',
    options: [
      'A larger flexible conduit to cut the movement',
      'A separate protective conductor across it',
      'An earthing clamp fitted to the pump casing',
      'A local isolator next to the pump',
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 states that flexible or pliable conduit shall not be selected as a protective conductor, so the earth path must be carried across it by a separate conductor. Option D is required for other reasons entirely and is the answer given when the question is read as being about maintenance rather than earthing.',
    section: '4.4.5',
    difficulty: 'intermediate',
    topic: 'Protective Conductors',
  },
  {
    id: 383,
    question: 'What must be provided where a thermoplastic cable enters a steel back box through a knockout?',
    options: [
      'A gland fitted into the knockout hole',
      'A ferrule fitted on each conductor end',
      'A grommet fitted into the knockout hole',
      'A sleeve fitted over the outer sheath',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires that enclosures have no sharp edges liable to damage the wiring system, and a grommet lines the punched edge. Option A would be right for an armoured cable, but a gland on flat twin and earth into a back box neither fits nor addresses the burr.',
    section: '4.3.1',
    difficulty: 'basic',
    topic: 'Cable Terminations',
  },
  {
    id: 384,
    question: 'A 4 mm squared stranded conductor is to land in a pillar terminal on a circuit-breaker. What preparation is correct?',
    options: [
      'Fold the conductor over double and clamp the loop',
      'Tin the strand ends with solder before insertion',
      'Twist the strands and insert the full conductor',
      'Cut back two strands so the conductor will fit in',
    ],
    correctAnswer: 2,
    explanation: 'Every strand must be inside the terminal so the full cross-section carries the current, and twisting keeps them together during insertion. Option D is a shortcut used when a terminal feels tight, and it reduces the conductor size at the very point where the connection is already hottest.',
    section: '4.5.1',
    difficulty: 'intermediate',
    topic: 'Stranded Conductor Prep',
  },
  {
    id: 385,
    question: 'A fine stranded flexible lead feeds a machine that vibrates in service. Why is a bootlace ferrule fitted rather than tinning the strands?',
    options: [
      'Solder prevents the conductor from being identified',
      'Solder makes the conductor far too stiff to bend at all',
      'Solder creeps under pressure and the joint slackens',
      'Solder cannot carry the current the machine draws',
    ],
    correctAnswer: 2,
    explanation: 'Solder deforms slowly under a clamping screw, so a tinned end loses its grip over time and the connection heats up. Option D is untrue and is why tinning still looks acceptable to many: the joint conducts perfectly well on the day it is made.',
    section: '4.3.2',
    difficulty: 'advanced',
    topic: 'Terminations',
  },
  {
    id: 386,
    question: 'An armoured cable is glanded into a steel enclosure. Which detail confirms the armour is doing its protective conductor job?',
    options: [
      'The armour is clamped by the cone and earthed',
      'The armour is cut back flush and taped at the gland',
      'The armour is bunched and taken to the neutral bar',
      'The armour is folded back inside the box',
    ],
    correctAnswer: 0,
    explanation: 'The cone traps the armour wires against the gland body, and the gland is earthed to the enclosure, which is what puts the armour into the earth path. Option C creates a direct connection between the armour and the neutral, which will make the armour live in normal use.',
    section: '4.5.3',
    difficulty: 'intermediate',
    topic: 'SWA Termination',
  },
  {
    id: 387,
    question: 'A joint must be made in a cable inside a sealed ceiling void with no access hatch. Which arrangement complies?',
    options: [
      'A maintenance-free connection to a standard',
      'A screw terminal block in a plastic box',
      'A soldered joint covered with tape',
      'A connector block in a metal adaptable box',
    ],
    correctAnswer: 0,
    explanation: 'Connections must be accessible unless they fall within a listed exception, and a maintenance-free connection to the relevant standard is one of those exceptions. Option B is what usually gets installed, and screw terminals in an inaccessible void will never be inspected or retightened again.',
    section: '4.3.2',
    difficulty: 'advanced',
    topic: 'Cable Terminations',
  },
  {
    id: 388,
    question: 'Which conductor connects a metallic water service to the main earthing terminal?',
    options: [
      'The earthing conductor from the electrode',
      'The supplementary bonding conductor at the bath',
      'The circuit protective conductor of the ring',
      'The main protective bonding conductor',
    ],
    correctAnswer: 3,
    explanation: 'Main protective bonding conductors tie incoming metallic services to the main earthing terminal so that everything sits at a common potential. Option A runs the other way, from the main earthing terminal out to an electrode, and mixing the two is why bonding conductors get sized from the wrong table.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 389,
    question: 'Which figure must the installer know before selecting a main protective bonding conductor on a PME supply?',
    options: [
      'The cross-sectional area of the supply PEN',
      'The rating of the largest final circuit',
      'The measured earth fault loop impedance at origin',
      'The length of the run from the terminal to pipe',
    ],
    correctAnswer: 0,
    explanation: 'On PME the bonding conductor is selected against the cross-sectional area of the distributor\'s PEN conductor. Option B is the instinctive answer because circuit protective conductors are sized from the circuit they protect, but main bonding is not sized that way.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 390,
    question: 'A PME supply has 16 mm squared meter tails and the main protective bonding conductor found in place is 6 mm squared. What should be reported?',
    options: [
      'It is acceptable as it matches the circuit cpc',
      'It is oversized, 4 mm squared would do',
      'It is undersized for PME and must be replaced',
      'It is acceptable, the tails are only 16 mm squared',
    ],
    correctAnswer: 2,
    explanation: 'PME conditions set a minimum copper bonding size that 6 mm squared does not reach, whatever the tail size happens to be. Option D is the trap: bonding on PME is selected against the distributor\'s PEN conductor, and the consumer\'s tails are not the deciding figure.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 391,
    question: 'A shower room has metal pipework, every circuit meets its disconnection time, every circuit has 30 mA RCD protection and the extraneous parts are connected to the main earthing terminal. What is the position on supplementary bonding?',
    options: [
      'It may be omitted where the pipework is plastic',
      'It is required regardless of the RCD being fitted',
      'It is required unless the pipework is earthed',
      'It may be omitted where those conditions are all met',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 allows supplementary bonding to be omitted in a location containing a bath or shower once all of those conditions are satisfied together. Option B is the cautious default many still work to, and it adds conductors that the standard no longer requires when the conditions are met.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Supplementary Bonding',
  },
  {
    id: 392,
    question: 'Where should a bonding clamp be fitted on an incoming metallic water service?',
    options: [
      'As near as practicable to the point of entry',
      'At the furthest point from the earthing terminal',
      'On the plastic section past the main stop valve',
      'After the first branch tee inside the property',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 requires the main bonding connection to be made as near as practicable to the point at which the service enters the premises, so the whole of the internal pipework sits behind the bond. Option D leaves part of the incoming pipe unbonded, which defeats the purpose of the connection.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'BS 951 Position',
  },
  {
    id: 393,
    question: 'A bonding clamp is fitted to a gas installation pipe. What must be attached at that connection?',
    options: [
      'A notice showing the conductor size that was used',
      'A notice naming the contractor who installed it',
      'A notice giving the last inspection date',
      'A notice reading Safety Electrical Connection',
    ],
    correctAnswer: 3,
    explanation: 'A durable label warning against removal of the safety electrical connection must be fixed at every bonding clamp. Option B appears on plenty of clamps in practice, but a contractor\'s name does not tell the next person that the conductor must stay in place.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'BS 951 Warning Notice',
  },
  {
    id: 394,
    question: 'A water service enters through a plastic pipe and changes to copper at a stop valve just inside the wall. Where does the bonding clamp go, if at all?',
    options: [
      'On the plastic pipe, upstream of the stop valve',
      'On the copper, immediately after the stop valve',
      'On the copper, at the furthest point from the valve',
      'No bonding is needed, the pipe is not extraneous',
    ],
    correctAnswer: 3,
    explanation: 'A metallic pipe with an insulating section at its point of entry cannot introduce a potential from outside, so it is not extraneous and needs no main bonding. Option B is what most electricians do out of habit, bonding the copper because it is metal and it is there.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'BS 951 Position',
  },
  {
    id: 395,
    question: 'What must be done to a painted pipe before a bonding clamp is fitted?',
    options: [
      'Clean the surface back to bright metal',
      'Wrap the surface in amalgamating tape',
      'Sleeve the surface in heat-shrink',
      'Prime the surface with an inhibitor',
    ],
    correctAnswer: 0,
    explanation: 'Paint is an insulator, so the clamp must bear on bare metal for the connection to conduct. Option D is done afterwards on some installations to protect the joint, but applying it first would simply replace one insulating layer with another.',
    section: '4.4.3',
    difficulty: 'basic',
    topic: 'BS 951 Warning Notice',
  },
  {
    id: 396,
    question: 'A bonding clamp is fitted over a painted pipe and a continuity test across it reads open circuit. What is the most likely cause?',
    options: [
      'The clamp is a BS 951 type rather than a ring lug',
      'The paint is insulating the clamp from the pipe',
      'The test instrument is on the wrong voltage range',
      'The bonding conductor is too small for this duty',
    ],
    correctAnswer: 1,
    explanation: 'An open circuit means no metal to metal contact, and paint under the clamp jaws is by far the commonest reason. Option D would give a measurable but slightly higher reading rather than an open circuit, which is how conductor size problems and contact problems are told apart.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Main Bonding Sizing',
  },
  {
    id: 397,
    question: 'A stainless steel bonding clamp is fitted directly onto a galvanised steel pipe in a damp plant room. What problem should be expected?',
    options: [
      'Loss of the clamp\'s mechanical grip on the pipework',
      'An increase in the resistance of the conductor',
      'Corrosion at the contact between the two metals',
      'Overheating of the clamp under fault conditions',
    ],
    correctAnswer: 2,
    explanation: 'Dissimilar metals in contact with moisture present set up electrolytic action, which BS 7671 requires to be avoided, and the galvanising is what corrodes away. Option A follows later as a consequence, which is why the joint is often blamed on a loose clamp rather than the metals chosen.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'Supplementary Bonding',
  },
  {
    id: 398,
    question: 'A water meter is fitted in the incoming service and the bonding clamp sits on the consumer side of it. What else is required?',
    options: [
      'A larger conductor on the meter side',
      'A label on the meter naming the installer',
      'A bonding link across the meter itself',
      'A second earth electrode outside the property',
    ],
    correctAnswer: 2,
    explanation: 'A meter can be removed or fitted with insulating unions, so continuity across it must be maintained by a link. Option A is the answer given when the problem is read as one of conductor sizing, but no increase in size restores a path that has been broken by the meter body.',
    section: '4.4.3',
    difficulty: 'intermediate',
    topic: 'BS 951 Position',
  },
  {
    id: 399,
    question: 'Which instrument setting is used to test the continuity of a circuit protective conductor?',
    options: [
      'Earth loop ohms',
      'AC volts range',
      'Insulation megohms',
      'Low resistance ohms',
    ],
    correctAnswer: 3,
    explanation: 'Continuity of a protective conductor is a low resistance measurement, typically fractions of an ohm. Option A also produces an ohms reading and is the one confused with it most often, but it measures the whole fault loop including the supply, not the conductor alone.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Continuity Testing',
  },
  {
    id: 400,
    question: 'Before an R1 plus R2 test is carried out, what must be done with the instrument leads?',
    options: [
      'Fuse them to a current rating below 500 mA',
      'Check them on the insulation range beforehand',
      'Extend them to reach the furthest test point',
      'Null them so their resistance is excluded',
    ],
    correctAnswer: 3,
    explanation: 'Lead resistance is a significant part of a reading measured in tenths of an ohm, so it is nulled out before testing. Option C describes the wander lead method, which is a different technique and brings its own long-lead error.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'R1+R2 Continuity',
  },
  {
    id: 401,
    question: 'Why must a continuity instrument be able to deliver a short circuit current of not less than 200 mA?',
    options: [
      'To protect the instrument from a live circuit',
      'To break down a poor contact and reveal it',
      'To limit the voltage applied to the circuit',
      'To allow the reading to be taken in ohms',
    ],
    correctAnswer: 1,
    explanation: 'A meaningful test current pushes through films of dirt or oxide that a low current meter would read straight past, so genuine high resistance joints show up. Option C has it backwards: the no-load voltage sits between 4 V and 24 V and is a separate part of the specification.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Continuity Tester Spec',
  },
  {
    id: 402,
    question: 'An R1 plus R2 test on a radial lighting circuit gives a much higher value at the last point than the calculated figure. Which cause fits best?',
    options: [
      'The cable installed is larger than that designed',
      'The circuit was tested with the switch off',
      'The instrument leads were nulled before testing',
      'A loose cpc connection at an intermediate point',
    ],
    correctAnswer: 3,
    explanation: 'A high resistance joint anywhere along the circuit adds directly to the reading at every point beyond it. Option A would lower the reading, not raise it, and is worth ruling out first because oversized cable is a common site substitution.',
    section: '4.6.1',
    difficulty: 'advanced',
    topic: 'R1+R2 Method',
  },
  {
    id: 403,
    question: 'Why is the R1 plus R2 method preferred to the wander lead method on a domestic rewire?',
    options: [
      'It proves the cpc is in the same cable as the line',
      'It can be carried out with the supply left on',
      'It gives a lower reading than a wander lead',
      'It removes the need to test insulation resistance',
    ],
    correctAnswer: 0,
    explanation: 'Linking line to cpc at the board and measuring at each point proves that the two conductors belong to the same circuit, and it confirms polarity at the same time. Option B is dangerously wrong: this is a dead test and the circuit must be isolated throughout.',
    section: '4.6.1',
    difficulty: 'advanced',
    topic: 'Earth Continuity',
  },
  {
    id: 404,
    question: 'A continuity test on the main bonding to a gas pipe reads 0.02 ohms, while the same test to the water pipe reads open circuit. What should be checked first?',
    options: [
      'That the water clamp is on clean bare metal',
      'That the instrument leads have all been nulled',
      'That the water pipe is made of copper throughout',
      'That the gas clamp has not been fitted reversed',
    ],
    correctAnswer: 0,
    explanation: 'One good reading and one open circuit points at the connection that failed, and paint or corrosion under the clamp is the usual reason. Option B cannot explain the difference, because a lead problem would have spoiled the gas reading in exactly the same way.',
    section: '4.6.1',
    difficulty: 'advanced',
    topic: 'Protective Conductors',
  },
  {
    id: 405,
    question: 'On a ring final circuit, why can an R1 plus R2 figure measured at a socket be lower than that of the same length of radial circuit?',
    options: [
      'The two legs of the ring are in parallel',
      'The ring uses a larger conductor throughout',
      'The ring is protected by an RCD as well',
      'The ring carries less current at each socket',
    ],
    correctAnswer: 0,
    explanation: 'Current can reach any socket by either leg, so the two paths sit in parallel and the effective resistance falls. Option B is a reasonable guess given that ring circuits carry 32 A, but the conductor size is normally the same 2.5 mm squared used for smaller radials.',
    section: '4.6.1',
    difficulty: 'advanced',
    topic: 'R1+R2 Continuity',
  },
  {
    id: 406,
    question: 'What is measured in the first step of the ring final circuit continuity test?',
    options: [
      'Loop impedance at the furthest socket',
      'End to end resistance of each conductor loop',
      'Insulation resistance between line and neutral',
      'Resistance between line and the earth at once',
    ],
    correctAnswer: 1,
    explanation: 'Each of the three conductors is measured end to end with the legs disconnected, which proves the ring is complete before anything else is done. Option A is a live test carried out much later and cannot be part of a dead continuity sequence.',
    section: '4.6.2',
    difficulty: 'intermediate',
    topic: 'Ring Final Test',
  },
  {
    id: 407,
    question: 'In the ring final test, why are the line and neutral ends cross-connected for the second step?',
    options: [
      'To find the length of the ring conductors',
      'To confirm the polarity at each ring point',
      'To measure insulation between the conductors',
      'To put the two legs in parallel at each socket',
    ],
    correctAnswer: 3,
    explanation: 'Cross-connecting makes the two legs form a parallel path at every socket, so each outlet should read about the same value. Option B is a genuine benefit of the third step, where line is linked to cpc, but not of the line to neutral step.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Test',
  },
  {
    id: 408,
    question: 'End to end readings for a ring final circuit are r1 = 0.52 ohms, rn = 0.52 ohms and r2 = 0.86 ohms. What do those values confirm?',
    options: [
      'The circuit has been wired as two radial legs',
      'The cpc is smaller than the line and neutral',
      'The line and neutral have been crossed at a socket',
      'The ring has been broken in the cpc conductor',
    ],
    correctAnswer: 1,
    explanation: 'In flat twin and earth the cpc is a smaller cross-section, so r2 is expected to be roughly 1.67 times r1, which is what these figures show. Option D would give an open circuit rather than a measurable value, and reading a higher r2 as a fault is a common misinterpretation.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Test',
  },
  {
    id: 409,
    question: 'An end to end continuity test on the line conductor of a ring final circuit reads open circuit. What should be suspected before testing further?',
    options: [
      'A break in the ring at a socket-outlet terminal',
      'An insulation fault between line and neutral',
      'A cpc left off at the consumer unit earth bar',
      'A reversed polarity at one of the socket-outlets',
    ],
    correctAnswer: 0,
    explanation: 'An open circuit on one conductor means the loop is not continuous, and a terminal missed at a socket is the usual place to find it. Option B would show as a low insulation resistance rather than an open continuity reading, and the two tests answer different questions.',
    section: '4.6.2',
    difficulty: 'intermediate',
    topic: 'Ring Final Test',
  },
  {
    id: 410,
    question: 'Why must both legs of a ring final circuit be disconnected from the consumer unit before the end to end test?',
    options: [
      'So the neutral bar carries no current then',
      'So the circuit-breaker is not damaged by the test',
      'So each conductor loop is measured on its own',
      'So the RCD does not trip during the measurement',
    ],
    correctAnswer: 2,
    explanation: 'Left connected, the busbar and neutral bar bridge the two legs and the instrument sees a path that is not the cable. Option D is a real nuisance on live testing but is irrelevant here, because the installation is dead throughout this test.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Test',
  },
  {
    id: 411,
    question: 'A ring final circuit passes its continuity tests but a bedroom socket is later found dead. What is the most likely explanation?',
    options: [
      'The ring conductors are crossed at the board',
      'It is a spur whose connection has come loose',
      'The cpc is left off at that socket-outlet',
      'The circuit-breaker rating is too small',
    ],
    correctAnswer: 1,
    explanation: 'A spur hangs off the ring and is not proved by the ring tests, so a loose connection there passes unnoticed. Option C would leave the socket working while unearthed, which is a serious defect but not one that makes it dead.',
    section: '4.6.2',
    difficulty: 'advanced',
    topic: 'Ring Final Diagnosis',
  },
  {
    id: 412,
    question: 'What does a polarity test on a lighting circuit confirm about the switch?',
    options: [
      'It is connected to the circuit protective conductor',
      'It carries the current that the luminaires will draw',
      'It breaks the neutral conductor rather than the line',
      'It breaks the line conductor and not the neutral',
    ],
    correctAnswer: 3,
    explanation: 'Single pole switching devices must be in the line conductor, so that operating the switch removes the danger at the fitting. Option C describes exactly the fault the test exists to find, and a lamp will work perfectly either way.',
    section: '4.6.5',
    difficulty: 'basic',
    topic: 'Polarity Test',
  },
  {
    id: 413,
    question: 'At which point in the testing sequence is polarity confirmed before the installation is energised?',
    options: [
      'Before continuity of protective conductors',
      'As a dead test after insulation resistance',
      'Only at the final functional test stage',
      'As a live test once the supply is connected',
    ],
    correctAnswer: 1,
    explanation: 'Polarity sits within the dead test sequence and is completed before energising, so a reversed connection is found while everything is still isolated. Option D describes the confirmation carried out afterwards at the origin, which supplements rather than replaces the dead test.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Polarity Test',
  },
  {
    id: 414,
    question: 'How is polarity proved at an Edison screw lampholder during dead testing?',
    options: [
      'The neutral connects to the centre contact',
      'The line connects to the outer screw shell',
      'The line connects to the centre contact',
      'The cpc connects to the centre contact',
    ],
    correctAnswer: 2,
    explanation: 'The centre contact must be the line so that the accessible screw shell is not live when a lamp is being changed. Option B is the reversal that leaves a person changing a lamp holding the live part in their fingers.',
    section: '4.6.4',
    difficulty: 'intermediate',
    topic: 'Polarity Testing',
  },
  {
    id: 415,
    question: 'A socket-outlet is found with line and neutral reversed. Why is that dangerous even though appliances still work?',
    options: [
      'The socket then draws more current than usual',
      'The circuit-breaker cannot then be operated',
      'The circuit protective conductor becomes live',
      'A single pole switch then breaks the neutral only',
    ],
    correctAnswer: 3,
    explanation: 'With the conductors swapped, switching an appliance off leaves its internal parts connected to line through the neutral pin. Option C is a more dramatic fault but a different one, caused by a line to earth reversal rather than line to neutral.',
    section: '4.6.5',
    difficulty: 'advanced',
    topic: 'Polarity Test',
  },
  {
    id: 416,
    question: 'Why must polarity be checked at the origin as well as at every accessory?',
    options: [
      'The tails at the cut-out may be crossed over',
      'The meter may have been fitted the wrong way round',
      'The earthing conductor may be of the wrong size',
      'The main switch may be a single pole isolator',
    ],
    correctAnswer: 0,
    explanation: 'If the incoming tails are transposed the whole installation is reversed, and every accessory downstream will still test correct against itself. Option C is a genuine defect but has nothing to do with which conductor is which.',
    section: '4.6.5',
    difficulty: 'intermediate',
    topic: 'Polarity Test',
  },
  {
    id: 417,
    question: 'During inspection of a new installation, cables on a tray are held only by plastic cable ties. Why is that a defect?',
    options: [
      'The ties squeeze the cables and derate the circuit',
      'The ties are not listed in BS 7671 at all',
      'The ties can fail in a fire and drop the cables',
      'The ties do not carry the earth along the tray',
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 requires cables to be supported so that they do not collapse prematurely in a fire, and plastic ties soften and release long before the cable does. Option A describes a different fault caused by overtightening, and it is the reason the real issue often gets overlooked.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Visual Inspection',
  },
  {
    id: 418,
    question: 'An inspection finds a metal consumer unit with a readily accessible horizontal top surface and a knockout left open. Why is that a defect?',
    options: [
      'The top surface no longer meets its IP rating',
      'The open knockout reduces the enclosure fire rating',
      'The open knockout prevents proper labelling',
      'The top surface must be insulated from the enclosure',
    ],
    correctAnswer: 0,
    explanation: 'A readily accessible horizontal top surface must give at least IP4X or IPXXD, and an open knockout lets a wire or small object drop straight in. Option B sounds plausible on a metal consumer unit, but the requirement being broken here is the degree of protection, not the fire performance.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Inspection Checklist',
  },
  {
    id: 419,
    question: 'An armoured cable buried across a garden has been jointed using a screw connector block inside a plastic box, buried directly in the soil. What is the correct finding?',
    options: [
      'The joint is not suitable for burial underground',
      'The joint is acceptable if the box is sealed',
      'The joint is acceptable if recorded on plan',
      'The joint is acceptable if marker tape is laid',
    ],
    correctAnswer: 0,
    explanation: 'Connections must be accessible unless they are of a type designed to be buried, and a screw block in a plastic box is not such a joint. Option B is the reasoning that leads to these being installed: watertightness addresses moisture, but it does nothing about a connection that can never be inspected or retightened.',
    section: '4.6.1',
    difficulty: 'intermediate',
    topic: 'Visual Inspection',
  },
  {
    id: 420,
    question: 'A steel conduit installation relies on the conduit as the circuit protective conductor. Every accessory box has an earth terminal with nothing landed on it. What is the finding?',
    options: [
      'The boxes must be bonded together with 4 mm squared',
      'The conduit must be replaced with a separate conductor',
      'Each accessory needs a tail to the box terminal',
      'The arrangement is acceptable as the conduit is the cpc',
    ],
    correctAnswer: 2,
    explanation: 'Where containment forms the protective conductor, BS 7671 still requires the earth terminal of each accessory to be connected by a separate conductor to the terminal in its box. Option D is the assumption that leaves metal accessory plates relying on the fixing screws alone for their earth path.',
    section: '4.6.1',
    difficulty: 'advanced',
    topic: 'Initial Inspection',
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

  // Backfill. getRandomFromArray slices with Math.min, so a difficulty band
  // holding fewer questions than its weight demands would otherwise return a
  // paper SHORTER than `count` with no error and no warning. Margins are
  // comfortable today, but raising an advanced weight is all it would take.
  if (selectedQuestions.length < count) {
    const chosen = new Set(selectedQuestions.map((q) => q.id));
    selectedQuestions.push(
      ...getRandomFromArray(
        module4QuestionBank.filter((q) => !chosen.has(q.id)),
        count - selectedQuestions.length
      )
    );
  }

  // Shuffle the final array
  return shuffleArray(selectedQuestions);
};

// Helper function to randomly select items from array
function getRandomFromArray<T>(array: T[], count: number): T[] {
  // Fisher-Yates. `sort(() => 0.5 - Math.random())` is not a uniform
  // permutation — an inconsistent comparator, so some positions are
  // systematically favoured and slicing the front biases which questions
  // get examined.
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
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
