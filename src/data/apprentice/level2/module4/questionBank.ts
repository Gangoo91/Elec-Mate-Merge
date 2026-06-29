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
      'The manufacturer data sheet',
      'The site risk assessment',
      'Installation drawings and plans',
      'The schedule of test results',
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
      'Only the total weight for transport',
      'Only the delivery date and supplier',
      'Only whether items are the cheapest available',
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
      'To record the final test results for the certificate',
      'To calculate the total cable lengths required',
      'To schedule deliveries of materials to the site',
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
      'BS 5839 (Fire Detection and Alarm Systems)',
      'BS 7671 (IET Wiring Regulations)',
      'BS EN 60529 (IP Rating Classification)',
      'BS 1363 (Plugs and Socket-Outlets)',
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
      'Working as quickly as possible',
      'Using the most expensive equipment',
      'Accuracy and compliance with regulations',
      'Using the largest possible cable sizes',
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
    question: 'When setting out conduit runs, what must be considered regarding safe zones?',
    options: [
      'Conduit must always run diagonally to save material',
      'Cables must run within prescribed safe zones to avoid accidental damage',
      'Conduit should be routed as close to gas pipes as possible',
      'Runs may be placed anywhere provided they are painted yellow',
    ],
    correctAnswer: 1,
    explanation:
      'Cables and conduit must be installed within prescribed safe zones (within 150mm of the top of the wall or of a corner, or horizontally/vertically from an accessory) to prevent accidental damage.',
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
      'To make the conduit easier to cut to length',
      'To reduce the cost of the conduit fittings',
      'To improve the appearance of the finished run',
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
      'A hacksaw and file',
      'Conduit bending machine or former',
      'An angle grinder',
      'A bending spring alone',
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
      'A permanent improvement in conductivity',
      'Increased internal diameter at the bend',
      'Kinking or flattening that restricts cable installation',
      'Automatic earthing of the conduit run',
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
      'For large diameter conduit that needs a powered bender',
      'For joining two lengths of conduit together',
      'For removing burrs from cut conduit ends',
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
      'That all cables must be the same colour',
      'That data cables must always be on top',
      'Segregation requirements to prevent interference',
      'That cables must be bundled as tightly as possible',
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
      'Additional earth bonding at every joint',
      'Larger cable supports at the mid-point',
      'A second parallel trunking run alongside',
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
      'Leave a deliberate air gap at each joint',
      'Drill drainage holes at every joint',
      'Wrap each joint with insulation tape only',
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
      'Burn the insulation off with a flame',
      'Use proper stripping tools to avoid nicking the conductor',
      'Use side cutters to score around the cable',
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
      'To increase the current rating of the conductor',
      'To provide colour identification of the conductor',
      'To prevent strand separation and ensure reliable connections',
      'To allow the conductor to be soldered more easily',
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
      'Allows the conductor to be removed without tools',
      'Increases the current rating of the cable',
      'Removes the need to use the correct cable size',
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
      'Splash-proof and protected against limited dust',
      'Dust-tight and protected against water jets',
      'Protected against temporary immersion in water',
      'No dust protection but fully waterproof',
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
      'Energise the circuit to confirm it is live',
      'Remove all earthing connections first',
      'Ensure safe isolation and verify circuits are dead',
      'Increase the supply voltage to the circuit',
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
      'The insulation resistance to earth',
      'The maximum demand of the circuit',
      'The operating speed of a protective device',
      'A complete, low-resistance electrical path between two points',
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
      'To measure the resistance of the insulation',
      'To confirm the earth loop impedance value',
      'To verify the RCD trips within its rated time',
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
      'The continuity of the protective conductor',
      'The resistance between conductors and earth',
      'The prospective fault current at the origin',
      'The voltage drop along the circuit',
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
      'High-visibility vest only',
      'Steel toe-cap boots only',
      'Hearing protection only',
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
      'Run tools from the highest available voltage',
      'Coil the lead tightly during use to save space',
      'Remove the earth pin to reduce nuisance tripping',
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
      'Leaving offcuts in place to mark progress',
      'Storing tools on the nearest stepladder',
      'Blocking walkways with material until job end',
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
      'The colour of the surrounding decoration',
      'The brand of accessories being installed',
      'The day of the week work is carried out',
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
      'To improve the appearance of the finished work',
      'To ensure they can support the load safely',
      'To reduce the amount of cable required',
      'To speed up the first-fix stage of the job',
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
      'Support only at the very top of the run',
      'No support, as gravity holds cables in place',
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
      'Increase the current rating of the cable',
      'Allow the cable to be removed without tools',
      'Provide colour identification at the entry point',
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
      'Lower IP rating to allow ventilation',
      'Removal of all enclosure seals',
      'Use of unsealed open terminal boxes',
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
      'Cold chisel and club hammer',
      'Hole saw or knockout punch',
      'Hacksaw and round file',
      'Angle grinder with cutting disc',
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
      'Set it to the highest voltage range',
      'Disconnect the test leads from the meter',
      'Remove the battery to reset the meter',
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
      'Lay them flat on the ground and stack them',
      'Leave them outdoors uncovered until needed',
      'Roll them along the floor to the work area',
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
      'Drill straight through at full speed in one pass',
      'Check for services, drill pilot hole, and drill from both sides to prevent breakout',
      'Drill only from the side that will be hidden',
      'Use the largest bit available to save time',
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
    question: 'What is the typical depth of chasing allowed in solid walls for cable installation?',
    options: [
      'Maximum 1/2 of wall thickness',
      'Maximum 2/3 of wall thickness',
      'Maximum 1/6 of wall thickness',
      'No limit provided cables are protected',
    ],
    correctAnswer: 2,
    explanation:
      'Horizontal chasing in solid walls should typically not exceed 1/6 of the wall thickness to maintain structural integrity of the wall.',
    section: '4.2.6',
    difficulty: 'advanced',
    topic: 'Wall Chasing Limits',
  },
  {
    id: 47,
    question: 'When installing conduit in concrete, what should be considered?',
    options: [
      'Leave conduit ends open to allow drainage',
      'Use only the thinnest-walled conduit available',
      'Position conduit at the surface of the pour',
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
      'Strip all cores to exactly the same length',
      'Twist all cores together into one connection',
      'Leave the outer sheath on at the terminals',
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
      'Work directly beneath the lines at all times',
      'Rely on the line insulation for protection',
      'Maintain safe clearance distances and use goal post barriers',
      'Assume the lines are dead unless told otherwise',
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
      'Only that the consumer unit cover is fitted',
      'Only that the circuit is correctly labelled',
      'Only that the cables are the correct colour',
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
      'To improve the conductivity of the conductors',
      'To seal the conduit against moisture ingress',
      'To increase the fill capacity of the conduit',
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
    question: 'How should cable ties be applied to prevent cable damage?',
    options: [
      'As tight as possible using pliers',
      'Hand tight plus a quarter turn',
      'Left deliberately loose around the cable',
      'Tightened until the insulation deforms',
    ],
    correctAnswer: 1,
    explanation:
      'Cable ties should be applied snug enough to secure cables without cutting into or deforming the insulation or restricting thermal expansion.',
    section: '4.4.9',
    difficulty: 'basic',
    topic: 'Cable Tying',
  },

  {
    id: 54,
    question: 'What is the main purpose of a method statement in electrical installation work?',
    options: [
      'To list the final test results for the certificate',
      'To record the cost of materials used on site',
      'To provide a detailed plan of how work will be carried out safely',
      'To confirm the client has paid the deposit',
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
      'For all routine low-risk maintenance tasks',
      'Only after the work has been completed',
      'Only when working alone on a small job',
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
      'Only the client name and project start date',
      'Only the supplier and cost of each accessory',
      'Only the names of the operatives on site',
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
      'Install them anyway to keep to schedule',
      'Report the discrepancy and obtain correct materials',
      'Return them without informing anyone',
      'Modify them on site to fit the specification',
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
      'To record the final test results for the job',
      'To allocate wages and overtime to the team',
      'To brief the team on safety hazards and work procedures',
      'To order the materials needed for the week',
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
      'Rigid fixing at every support point',
      'Welding all joints together solidly',
      'Expansion joints and flexible supports',
      'Removing all supports between the ends',
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
      'To detect live cables hidden in walls',
      'To measure the resistance of a circuit',
      'To cut openings in plasterboard accurately',
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
      'Heat the conduit until it is fully molten',
      'Bend it as sharply as possible in one movement',
      'Fill the conduit with water before bending',
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
      'For small 16mm PVC conduit in domestic work',
      'For flexible conduit that needs no support',
      'For large diameter or heavy-wall conduit',
      'For cutting conduit to length on site',
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
      'Leave them exactly as cut to save time',
      'Seal them permanently with silicone',
      'Paint them to prevent corrosion',
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
      'To increase the internal diameter at the bend',
      'To earth the conduit at the bend point',
      'To seal the conduit against moisture',
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
      'Standard plastic plugs and woodscrews',
      'Masonry nails driven straight in',
      'Cavity fixings or toggle bolts',
      'Chemical resin anchors',
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
      'To reduce the cost of the installation',
      'To increase the current rating of cables',
      'To make cable pulling easier and faster',
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
      'Using the correct cable colours',
      'Labelling each circuit at both ends',
      'Leaving spare capacity for future cables',
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
      'To earth the conduit along its length',
      'To assist with cable pulling during installation',
      'To seal the conduit against moisture',
      'To act as a spare circuit conductor',
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
      'Route cables as close to the heat source as possible',
      'Use the smallest cable size available',
      'Maintain adequate clearance or use heat-resistant cables',
      'Wrap the cables in additional PVC tape',
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
      'Leave a loose connection to allow movement',
      'Connect conductors without removing insulation',
      'Solder all terminals before tightening',
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
    question: 'When should crimp connectors be used instead of screw terminals?',
    options: [
      'For stranded conductors or where vibration is present',
      'Only for single solid conductors in dry locations',
      'Only where the circuit will never be re-tightened',
      'Only for temporary lighting circuits',
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
      'A pair of pliers and side cutters',
      'Proper crimping tool with correct dies',
      'A torque screwdriver',
      'A soldering iron and flux',
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
      'To earth the cables entering the enclosure',
      'To provide multiple cable entries while maintaining enclosure integrity',
      'To support the weight of the cables internally',
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
      'Cut it back and leave it unconnected',
      'Connect it to the neutral conductor',
      'Insulate it fully and leave it floating',
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
      'Dust-tight and protected against immersion',
      'No dust protection but fully waterproof',
      'Dust-tight and protected against water jets',
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
      'The main earthing conductor and all bonding',
      'The protective devices in the consumer unit',
      'The supply neutral at the main switch',
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
      'Perfect insulation with no faults present',
      'A correctly functioning RCD protective device',
      'An open circuit in the protective conductor',
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
      'To measure the insulation resistance to earth',
      'To verify protective device operation under fault conditions',
      'To confirm correct line and neutral polarity',
      'To measure the continuity of the ring final circuit',
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
      'A high-visibility vest only',
      'A dust mask only',
      'Safety glasses, face shield, gloves, and hearing protection',
      'Safety footwear only',
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
      'Paint it a high-visibility colour',
      'Extend it to its maximum length',
      'Remove the rubber feet to grip better',
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
      'Keep three rungs above the working position at all times',
      'Maintain three points of contact (two hands and one foot or two feet and one hand)',
      'Position the ladder using three separate fixings',
      'Have three people present whenever the ladder is in use',
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
      'Burn it on site to reduce volume',
      'Bury it beneath the floor before screeding',
      'Dispose of properly according to waste regulations',
      'Leave it for the client to remove',
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
      'Only the names of the operatives on site',
      'Only the cost of the materials required',
      'Only the expected completion date',
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
      'Only when a new operative joins the site',
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
      'Make your own assumptions and continue',
      'Seek clarification from the designer or client',
      'Use a previous job\'s drawings instead',
      'Install to whatever seems most convenient',
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
      'To record the final circuit test results only',
      'To list the tools issued to each operative',
      'Record progress, issues, and decisions for future reference',
      'To calculate the wages for the team',
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
      'Only the preferences of the individual installer',
      'Only the cheapest order of operations',
      'Only the weather forecast for the week',
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
      'The nearest existing socket outlet',
      'A level horizontal or vertical reference line',
      'The top edge of the skirting board',
      'Any random point on the wall',
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
      'A folding pocket rule',
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
      'Drill at the highest possible speed',
      'Remove the drill guard for better access',
      'Mark the position with permanent paint',
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
      'To avoid the need for any measuring tools',
      'To increase the spacing between accessories',
      'To make each position deliberately different',
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
      'The conduit becomes stronger at the bend',
      'The conduit may kink or collapse, restricting cable installation',
      'The internal diameter increases at the bend',
      'The conduit gains improved corrosion resistance',
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
      'Chilling the conduit in cold water first',
      'Bending it twice as fast to avoid cracking',
      'Gentle heating to make the material more flexible',
      'Adding extra weight to force the bend',
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
      'It removes the need to deburr the conduit',
      'It allows conduit to be bent without a former',
      'It increases the internal diameter of the conduit',
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
      'Heat the conduit before each bend',
      'Apply lubricant to the outside of the conduit',
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
      'The colour of the conduit being used',
      'The sequence of bends and cumulative effects on cable pulling',
      'The brand of the bending machine',
      'The time of day the work is carried out',
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
      'Standard plastic plugs and screws',
      'Masonry nails driven by hand',
      'Adhesive-backed cable clips',
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
      'Identification of different circuits and functions',
      'To increase the current rating of the cable',
      'To improve the flexibility of the cable',
      'To reduce the cost of the installation',
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
      'Use the thinnest tray available to save cost',
      'Use appropriate protective coatings or materials',
      'Leave the tray unpainted to allow inspection',
      'Increase the support spacing to reduce contact',
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
      'To improve the appearance of the trunking',
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
      'Strip all cores in a single cut with the sheath',
      'Remove only the outer sheath and terminate as one',
      'Strip from the conductor end towards the sheath',
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
      'To increase the conductor cross-sectional area',
      'To make the connection easier to disconnect',
      'To raise the current rating of the joint',
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
      'To increase the current rating at the entry',
      'Additional strain relief and environmental sealing',
      'To earth the cable armour at the gland',
      'To identify the circuit at the entry point',
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
      'No strain relief, as the cable is flexible',
      'A larger terminal than for rigid cables',
      'Extra strain relief due to cable flexibility',
      'Soldering of every core before termination',
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
      'Splash-proof with limited dust protection',
      'Dust-tight and protected against water jets',
      'No dust protection but resistant to immersion',
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
      'Only the colour of the accessories used',
      'Only the manufacturer of the cable',
      'Only the date the work was carried out',
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
      'To confirm the earth loop impedance value',
      'To check the continuity of the protective conductor',
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
      'Repeat the test until a pass is obtained',
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
      'A copy of the original quotation only',
      'The delivery notes for the materials only',
      'The operatives\' timesheets only',
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
      'Only a high-visibility vest and gloves',
      'Appropriate PPE including breathing apparatus if required',
      'Only safety footwear and a hard hat',
      'No PPE beyond normal site clothing',
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
      'Increased power output of the tools',
      'Faster charging of battery tools',
      'Reduced risk of fatal electric shock',
      'Reduced cost of the power tools',
    ],
    correctAnswer: 2,
    explanation:
      '110V site tools use a centre-tapped transformer giving only 55V to earth, reducing the risk of fatal electric shock on harsh, wet construction sites.',
    section: '4.7.2',
    difficulty: 'basic',
    topic: '110V Tool Safety',
  },
  {
    id: 123,
    question: 'What should be done if a ladder shows signs of damage?',
    options: [
      'Continue using it if the damage looks minor',
      'Use it only for short tasks at low height',
      'Repair it temporarily with tape and continue',
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
      'To carry tools and materials hands-free',
      'To provide protection against electric shock',
      'To improve comfort during long tasks',
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
      'Place it all in the general site skip',
      'Separate and dispose of according to WEEE regulations',
      'Burn combustible items on site',
      'Leave it with the client to dispose of',
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
      'To record the final test results for the job',
      'To allocate the day\'s wages to the team',
      'To ensure all team members understand hazards and safety procedures',
      'To order materials needed for the next stage',
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
      'Only after an emergency has occurred',
      'Only at the very end of the project',
      'Only when requested by the client',
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
      'Continue working to the original drawings regardless',
      'Make changes on site without telling anyone',
      'Wait until the job is finished to report it',
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
      'To record the final test results for the job',
      'To ensure materials arrive when needed and in correct quantities',
      'To calculate the labour cost of the project',
      'To list the qualifications of the operatives',
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
      'Only the colour of the cabling used',
      'Only the cost of the equipment hired',
      'Safety, capacity, and protection requirements',
      'Only the appearance of the distribution board',
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
      'To measure vertical drops between floors',
      'To detect hidden services behind walls',
      'To establish true vertical reference lines',
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
      'Gentle sweeping changes of direction',
      'Routing within recognised safe zones',
      'Adequate support at regular intervals',
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
      'Estimate positions by eye to save time',
      'Skip measuring and install where convenient',
      'Use alternative measuring methods and reference points',
      'Wait until better access is provided before any work',
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
      'To establish true horizontal reference lines',
      'To measure long horizontal distances',
      'To detect hidden cables in walls',
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
      'The ambient lighting in the work area',
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
      'The colour of the cables to be installed',
      'Bend radius, conduit length, and cable pulling requirements',
      'The brand of the bending machine used',
      'The cost of the conduit fittings',
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
      'They increase the internal diameter of the conduit',
      'They remove the need to support the conduit',
      'Consistent quality and reduced installation time',
      'They allow a smaller bend radius to be used safely',
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
      'Paint the bend to prevent corrosion',
      'Heat the bend to relieve stress',
      'Earth the conduit at the bend',
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
      'To increase the internal diameter of the conduit',
      'To earth the conduit at a change of direction',
      'To reduce the number of supports needed',
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
      'To identify the circuits within the tray',
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
      'Plastic plugs and woodscrews',
      'Adhesive-backed cable clips',
      'Welded brackets or beam clamps',
      'Cavity toggle bolts',
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
      'To keep cables cool during normal operation',
      'To increase the current rating of cables',
      'To provide mechanical protection to cables',
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
      'A larger cable size to resist impacts',
      'Additional earth bonding along the route',
      'A higher-rated protective device only',
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
      'To seal the cable end against moisture',
      'To distribute pulling forces evenly along the cable',
      'To identify the circuit during pulling',
      'To increase the cable\'s current rating',
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
    question: 'What is the correct method for connecting solid conductors to terminals?',
    options: [
      'Leave the conductor straight and over-length',
      'Twist two conductors together first',
      'Form a neat hook and ensure full contact with terminal',
      'Fold the conductor back on itself twice',
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
    question: 'When should wire nuts be used instead of other connection methods?',
    options: [
      'For all permanent power circuits in dwellings',
      'For high-current industrial connections',
      'For armoured cable terminations',
      'For temporary connections or where frequent disconnection is required',
    ],
    correctAnswer: 3,
    explanation:
      'Wire connectors of this type are suited to low-current or temporary connections; permanent UK installations use enclosed terminals or maintenance-free connectors.',
    section: '4.5.2',
    difficulty: 'intermediate',
    topic: 'Wire Nuts',
  },
  {
    id: 148,
    question: 'What is the purpose of using cable entry plates in enclosures?',
    options: [
      'To provide multiple organized cable entries while maintaining IP rating',
      'To increase the current rating of the enclosure',
      'To support the weight of the cables inside',
      'To earth all cables entering the enclosure',
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
      'Smaller terminals to save space in the enclosure',
      'Adequate terminal size and heat dissipation',
      'Lighter-gauge connecting links to reduce weight',
      'Standard wire connectors regardless of current',
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
      'Splash-proof with limited dust protection',
      'Dust-tight and protected against water jets',
      'Dust-tight and protected against continuous immersion',
      'No dust protection but resistant to temporary immersion',
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
      'Only the cost of the materials used',
      'Only the names of the operatives',
      'Only the manufacturer of the cable',
      'Connections, supports, protection, labelling, and general workmanship',
    ],
    correctAnswer: 3,
    explanation:
      'Visual inspection should include connections, supports, protection, labelling, and general workmanship quality.',
    section: '4.6.1',
    difficulty: 'basic',
    topic: 'Inspection Checklist',
  },
  {
    id: 152,
    question: 'What is the purpose of functional testing?',
    options: [
      'To verify that installed systems operate as intended',
      'To measure the insulation resistance of cables',
      'To confirm the polarity of socket outlets',
      'To record the prospective fault current',
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
      'Only when a fault is reported by the user',
      'At regular intervals as specified in regulations',
      'Only when the property changes ownership',
      'Only once during the life of the installation',
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
      'Only the name of the person testing',
      'Only the date the testing took place',
      'Test values, instruments used, environmental conditions, and observations',
      'Only the address of the installation',
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
      'Record the average of the inconsistent readings',
      'Continue and assume the readings are correct',
      'Increase the test voltage until readings stabilise',
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
      'Hearing protection appropriate to noise levels',
      'A high-visibility vest and hard hat',
      'Chemical-resistant gloves and goggles',
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
    question: 'What is the purpose of using double-insulated power tools?',
    options: [
      'Increased power output without an earth connection',
      'Additional protection against electric shock without requiring earthing',
      'Reduced weight by removing the earth conductor',
      'Faster operation on a single-insulated supply',
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
      'Remove the guard rails for easier access',
      'Use them only without any fall protection',
      'Ensure operators are trained and equipment is inspected',
      'Operate them at maximum speed when raised',
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
      'To catch dropped tools and materials only',
      'To provide shade for workers at height',
      'To support the weight of the workers directly',
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
      'Place it in the general site skip with other waste',
      'Burn it on site to reduce its volume',
      'Leave it for the client to dispose of later',
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
      'To record the daily progress of the work',
      'To identify and control emerging hazards',
      'To allocate wages to the operatives',
      'To order replacement materials',
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
      'Only at the very end of the project',
      'Only if the client requests a copy',
      'When work methods change or new hazards are identified',
      'Only when a new operative joins the team',
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
      'Carry on and resolve the conflict afterwards',
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
      'To record the final test results for the job',
      'To calculate the labour cost of the project',
      'To list the qualifications of the operatives',
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
      'Only the cost of each trade\'s materials',
      'Work sequences, shared resources, and safety interactions',
      'Only the start date of each trade',
      'Only the colour coding used by each trade',
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
      'Consumer units should typically be installed with their center at 1350mm from finished floor level for accessibility.',
    section: '4.2.1',
    difficulty: 'basic',
    topic: 'Consumer Unit Height',
  },
  {
    id: 167,
    question: 'When using a theodolite for setting out, what is its primary advantage?',
    options: [
      'It detects hidden services behind walls',
      'It measures insulation resistance accurately',
      'It provides level reference around obstacles',
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
      "Score the surface deeply so the marks remain permanent",
      "Mark only in pencil regardless of the surface finish",
      "Use spray paint for maximum visibility on every surface",
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
      'The colour of the accessories used',
      'Access for installation and future maintenance',
      'The brand of the containment system',
      'The day of the week work is done',
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
      'To detect hidden cables before drilling',
      'To measure vertical drops between floors',
      'To establish straight reference lines over long distances',
      'To support cables temporarily during pulling',
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
      'A bending spring used by hand',
      'A simple hand-held conduit bender',
      'A heat gun and a length of rope',
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
      'To terminate conduit into an enclosure',
      'To cross over other conduits or obstacles',
      'To join two lengths of conduit end to end',
      'To support conduit on a vertical run',
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
      'The colour of the conduit being bent',
      'The cost of the conduit fittings used',
      'The sequence and interaction of multiple bend angles',
      'The brand of bending machine selected',
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
      'Only the colour of the conduit',
      'Only the cost of the materials used',
      'Only the length of the conduit run',
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
      'To increase the current rating of the cables',
      'To earth the cables along the run',
      'To identify the circuits being supported',
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
      'Chemical resin anchors set into masonry',
      'Clamps or removable fixings',
      'Welded brackets to the structure',
      'Through-bolts fully tightened into concrete',
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
      'To increase the current rating of the cables',
      'To reduce the total cable length required',
      'To prevent interference between different circuit types',
      'To make the installation cheaper to complete',
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
      'Rigid fixing of every joint and support',
      'Removal of all supports to allow movement',
      'Use of the smallest cable size available',
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
      'To remove the need for circuit protection',
      'To reduce the voltage drop along the cables',
    ],
    correctAnswer: 0,
    explanation:
      'Cable management systems organise, support, and protect cables systematically, improving reliability and maintenance access.',
    section: '4.4.9',
    difficulty: 'basic',
    topic: 'Cable Management',
  },
  {
    id: 181,
    question: 'What is the correct procedure for preparing stranded conductors for termination?',
    options: [
      'Cut the strands to different lengths individually',
      'Strip insulation, twist strands, and consider using ferrules',
      'Solder all strands solid before stripping',
      'Leave the insulation on and clamp it directly',
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
      'To increase the current rating of the joint',
      'To remove the need to strip the conductor',
      'When additional insulation or identification is required',
      'To make the connection easier to disconnect',
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
      'To increase the number of usable entries',
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
      'Use only the cheapest available components',
      'Avoid the use of any cable glands',
      'Terminate cables as quickly as possible',
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
      'Indoor use only with no water protection',
      'Weather-resistant and corrosion-resistant',
      'Protected against dust but not water',
      'Suitable for continuous immersion only',
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
      'Only the cost of the materials installed',
      'Only the colour of the accessories',
      'Compliance with drawings, workmanship quality, and safety requirements',
      'Only the date the work was completed',
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
      'To confirm the supply voltage is correct',
      'To verify the RCD trips within its rated time',
      'To measure the earth fault loop impedance',
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
      'Only once when the instrument is bought',
      'Only after a fault has been found',
      'Only when the client requests it',
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
      'Accept them and issue the certificate',
      'Investigate further and consider remedial action',
      'Round them up to the nearest pass value',
      'Ignore them as they are within tolerance',
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
      'To record the cost of the installation',
      'To list the materials used on site',
      'To provide legal evidence of compliance with regulations',
      'To confirm the client has paid in full',
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
      'A dust mask appropriate to the work',
      'Safety glasses and a face shield',
      'A high-visibility vest and hard hat',
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
      'To remove the need for an earth connection',
      'To allow the tool to run on a higher voltage',
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
      'Only the cost of hiring the equipment',
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
      'To support cables run along the edge',
      'To mark the boundary of the work area',
      'To prevent falls from unprotected edges',
      'To provide shade for workers at height',
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
      'Continue using it until the job is finished',
      'Store it with clean PPE for later use',
      'Pass it to another worker on the site',
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
      'To record the cost of any damage caused',
      'To allocate blame to the operative involved',
      'To calculate the time lost during the day',
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
      'Only after a chemical has been spilled',
      'Before using any chemical products or materials',
      'Only when the client requests them',
      'Only at the end of the project',
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
      'Continue with the original method regardless',
      'Carry on but work more quickly to reduce exposure',
      'Stop work and develop alternative safe methods',
      'Ignore the hazard if no one is watching',
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
      'To plan the delivery of materials to site',
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
      'Only the cost of the materials being moved',
      'Only the colour coding of the materials',
      'Only the supplier of the materials',
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
      'Only the cost of the GPS equipment',
      'Only the colour of the marking pegs',
      'Accuracy requirements, satellite availability, and local coordinate systems',
      'Only the brand of the GPS receiver',
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
      'Set out new positions first and adjust later',
      'Assume services run only along the floor',
      'Ignore existing services if the drawings are clear',
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
      'Brighter high-visibility clothing for workers',
      'Additional ventilation to the work area',
      'A higher IP rating on the equipment',
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
      'To detect hidden services before drilling',
      'To provide fixed reference points for accurate positioning',
      'To mark the boundary of the work area',
      'To support cables during installation',
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
      'The ambient temperature only',
      'Proper tooling and technique',
      'The brand of the conduit',
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
      'Conduit bends more easily in confined spaces',
      'No special equipment is ever needed',
      'Cable pulling becomes faster and easier',
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
      'To increase the internal diameter of the conduit',
      'To seal the conduit against moisture ingress',
      'To join two lengths of conduit together',
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
      'The total length of the conduit run',
      'Total number of bends and cumulative angle changes',
      'The number of supports used on the run',
      'The colour of the conduit selected',
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
      'The colour of the future cables',
      'The cost of the future cables',
      'Future cable capacity and pulling requirements',
      'The supplier of the future cables',
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
      'To identify the equipment being supported',
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
      'Adhesive-backed cable clips',
      'Standard plastic plugs and screws',
      'Masonry nails driven by hand',
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
      'To keep cables cool during normal operation',
      'To prevent fire spread through cable penetrations',
      'To provide mechanical protection to cables',
      'To increase the current rating of cables',
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
      'The colour of the cable sheathing',
      'The brand of the containment used',
      'Chemical resistance of materials and additional protection',
      'The cost of the cheapest materials',
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
      'To bend conduit accurately on long runs',
      'To seal cable ends against moisture',
      'To support cables on vertical runs',
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
    question: 'What is the correct method for connecting aluminum conductors?',
    options: [
      'Use appropriate compounds and connection methods for aluminium',
      'Treat them exactly the same as copper conductors',
      'Solder them directly without any preparation',
      'Twist them together with copper conductors',
    ],
    correctAnswer: 0,
    explanation:
      'Aluminium conductors require appropriate compounds and connection methods to prevent corrosion and ensure reliable connections.',
    section: '4.5.1',
    difficulty: 'advanced',
    topic: 'Aluminum Connections',
  },
  {
    id: 217,
    question: 'When should mechanical connectors be used instead of twist-on connectors?',
    options: [
      'Only for very low-current control circuits',
      'For permanent installations and higher current applications',
      'Only where frequent disconnection is needed',
      'Only for temporary site lighting',
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
      'To increase the current rating of the cable',
      'To provide multiple cable entries in one plate',
      'To accommodate different cable diameters in the same gland',
      'To earth the cable armour automatically',
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
      'A standard CE marking on the equipment',
      'A manufacturer warranty certificate',
      'A PAT testing label only',
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
      'Splash-proof with limited dust protection',
      'Protected against temporary immersion only',
      'Indoor use with no water protection',
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
      'Only the date the inspection took place',
      'All observations, defects, and compliance issues',
      'Only the name of the inspector',
      'Only the cost of the installation',
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
    question: 'What is the purpose of sequence testing in electrical installations?',
    options: [
      'To measure the insulation resistance of cables',
      'To confirm the earth fault loop impedance',
      'To verify correct phase rotation and system operation',
      'To check the continuity of protective conductors',
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
      "Only after the instrument has given a failed reading",
      "Only once when the instrument is first purchased",
      "Only if the client specifically asks to see the certificate",
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
      'Ignore conditions as they never affect results',
      'Stop all testing until conditions are perfect',
      'Adjust the readings to the values expected',
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
      'To document a complete new consumer unit installation',
      'To document small additions or alterations to existing installations',
      'To record the periodic inspection of an installation',
      'To certify a full rewire of a property',
    ],
    correctAnswer: 1,
    explanation:
      'Minor works certificates document small additions or alterations to a single circuit that do not extend to a new circuit.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Minor Works Certificates',
  },
  {
    id: 226,
    question: 'What eye protection should be used when working with chemicals?',
    options: [
      'Standard clear safety glasses only',
      'A dust mask worn over the eyes',
      'Chemical-resistant goggles or face shields',
      'No eye protection if working quickly',
    ],
    correctAnswer: 2,
    explanation:
      'Chemical work requires chemical-resistant goggles or face shields to protect against splashes and vapours.',
    section: '4.7.1',
    difficulty: 'intermediate',
    topic: 'Chemical Eye Protection',
  },
  {
    id: 227,
    question: 'What is the purpose of using isolation transformers with power tools?',
    options: [
      'To increase the power output of the tool',
      'To allow the tool to run on a higher voltage',
      'To remove the need to PAT test the tool',
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
      'A higher supply voltage to overcome moisture',
      'Removal of all RCD protection to avoid tripping',
      'Standard 230V tools used as normal',
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
      'To lift tools and materials to the work area',
      'To enable rapid rescue of workers in emergency situations',
      'To support the structure during installation',
      'To provide shade for workers at height',
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
      'Repair it with tape and keep using it',
      'Remove from service immediately and replace',
      'Pass it to another worker on the site',
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
      'To calculate the final cost of the project',
      'To allocate bonuses to the operatives',
      'To order materials for the next project',
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
      'Only at the very start of the project',
      'Only after an emergency has occurred',
      'Only when the client requests an update',
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
      'Choose the cheapest interpretation and continue',
      'Seek clarification from the specifying engineer or client',
      'Use a previous project\'s specification instead',
      'Carry on and resolve it after completion',
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
      'To calculate the labour cost of the project',
      'To plan the delivery schedule of materials',
      'To track material origins for quality and safety purposes',
      'To allocate materials to individual operatives',
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
      'Only the cost of the work being carried out',
      'Only the colour of the new accessories',
      'Only the brand of materials being used',
      'Occupant safety, noise levels, and access disruption',
    ],
    correctAnswer: 3,
    explanation:
      'Work in occupied buildings requires consideration of occupant safety, noise levels, and minimising access disruption.',
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
      'Emergency lighting in escape routes should typically be mounted at 2000mm minimum height to prevent tampering and damage.',
    section: '4.2.1',
    difficulty: 'intermediate',
    topic: 'Emergency Lighting Height',
  },
  {
    id: 237,
    question: 'When using total stations for setting out, what is their main advantage?',
    options: [
      'They detect hidden services behind walls',
      'Combined distance and angle measurement for precise positioning',
      'They measure insulation resistance accurately',
      'They provide level reference around obstacles',
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
      'Use permanent marker on all surfaces for clarity',
      'Chisel reference marks into the masonry',
      'Use non-damaging, removable marking methods and seek conservation advice',
      'Mark positions only on the most visible surfaces',
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
      'A higher supply voltage to overcome interference',
      'Brighter task lighting in the work area',
      'A higher IP rating on all equipment',
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
      'To reduce the cost of the installation materials',
      'To increase the current rating of the circuits',
      'To remove the need for installation drawings',
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
      'The colour of the conduit being bent',
      'Temperature, humidity, and material storage conditions',
      'The brand of the bending machine',
      'The cost of the conduit fittings',
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
      'Rigid fixing of every joint to the structure',
      'Use of the smallest bend radius possible',
      'Flexible connections and movement accommodation',
      'Removal of all supports to allow free movement',
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
      'To increase the internal diameter of the conduit',
      'To earth the conduit along its length',
      'To join conduit of different diameters',
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
      'The colour of the conduit being installed',
      'The brand of the bending machine used',
      'The cost of the cheapest available conduit',
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
      'Only the colour of the conduit used',
      'Dimensional accuracy, internal clearance, and cable pulling capability',
      'Only the cost of the conduit fittings',
      'Only the brand of the bending machine',
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
      'To accommodate thermal expansion in cables',
      'To provide earthing for the containment',
      'To prevent damage during earthquakes',
      'To reduce electromagnetic interference',
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
      'Adhesive-backed cable clips',
      'Hand-tightened bolts without washers',
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
    question: 'What is the purpose of using plenum-rated cables in HVAC areas?',
    options: [
      'To meet fire safety requirements in air-handling spaces',
      'To increase the current rating of the cable',
      'To reduce the cost of the installation',
      'To improve the flexibility of the cable',
    ],
    correctAnswer: 0,
    explanation:
      'Plenum-rated cables meet fire safety requirements in air-handling spaces, producing less smoke and toxic gases when burned.',
    section: '4.4.3',
    difficulty: 'advanced',
    topic: 'Plenum-Rated Cables',
  },
  {
    id: 249,
    question: 'When installing in areas subject to flooding, what should be considered?',
    options: [
      'Lower-rated equipment installed at floor level',
      'Waterproof equipment and elevated installation heights',
      'Standard equipment with no additional measures',
      'Equipment with a reduced IP rating for ventilation',
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
      'Only the original quotation for the work',
      'Only the delivery notes for materials',
      'Installation certificates and test results',
      'Only the operatives\' timesheets',
    ],
    correctAnswer: 2,
    explanation:
      'Installation certificates and test results must be completed to provide evidence of compliance with regulations and safe installation.',
    section: '4.6.6',
    difficulty: 'basic',
    topic: 'Installation Documentation',
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
