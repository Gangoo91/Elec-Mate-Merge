import { QuizQuestion } from '@/types/quiz';

export const visualInspectionQuestions: QuizQuestion[] = [
  {
    id: 'vi-1',
    question: 'What is the primary purpose of visual inspection before testing?',
    options: [
      'To save time on testing',
      'To identify obvious defects and safety hazards before energising',
      'To check the colour of cables',
      'To count the number of circuits'
    ],
    correctAnswer: 1,
    explanation: 'Visual inspection identifies obvious defects, damage, and safety hazards before any testing is carried out, preventing dangerous situations when the installation is energised.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'vi-2',
    question: 'During visual inspection, what must be verified regarding cable selection?',
    options: [
      'Cable colour only',
      'Current-carrying capacity and correct type for the environment',
      'Cable length only',
      'Number of cores only'
    ],
    correctAnswer: 1,
    explanation: 'Cable selection must be verified for current-carrying capacity appropriate to the protective device rating and correct type for the installation environment (e.g., thermoplastic, thermosetting, fire-resistant).',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522'
  },
  {
    id: 'vi-3',
    question: 'What should be checked regarding protective devices during visual inspection?',
    options: [
      'Colour of the device',
      'Correct type and rating for circuit protection',
      'Manufacturer name only',
      'Date of manufacture'
    ],
    correctAnswer: 1,
    explanation: 'Protective devices must be checked for correct type (MCB, RCBO, fuse), rating appropriate for the circuit, and correct characteristics (Type B, C, or D for MCBs).',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:411.3'
  },
  {
    id: 'vi-4',
    question: 'What IP rating is typically required for socket outlets in Zone 2 of a bathroom?',
    options: [
      'IP20',
      'IP44 minimum',
      'IP65',
      'No socket outlets permitted'
    ],
    correctAnswer: 3,
    explanation: 'Socket outlets are generally not permitted in Zone 2 of bathrooms. Only shaver supply units to BS EN 61558-2-5 are permitted in Zone 2.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:701.512.3'
  },
  {
    id: 'vi-5',
    question: 'What must be verified regarding the connection of conductors?',
    options: [
      'Cable colour matches the terminal',
      'Connections are secure and correctly made',
      'All connections use the same terminal type',
      'Connections are soldered'
    ],
    correctAnswer: 1,
    explanation: 'All connections must be verified as secure, correctly made, with no exposed live conductors, and appropriate for the type of conductor (solid or stranded).',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:526'
  },
  {
    id: 'vi-6',
    question: 'What should be checked regarding accessible equipotential bonding?',
    options: [
      'Bond cable colour only',
      'Presence, correct size, and secure connections',
      'That bonding is painted green/yellow',
      'Bond length measurement'
    ],
    correctAnswer: 1,
    explanation: 'Equipotential bonding conductors must be present where required, correctly sized (minimum 10mm² main bonding for TN systems), and have secure connections to extraneous-conductive-parts.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.3.1.2'
  },
  {
    id: 'vi-7',
    question: 'During visual inspection of a consumer unit, what enclosure requirement must be verified?',
    options: [
      'The colour is grey or white',
      'Non-combustible material for domestic installations',
      'Minimum depth of 100mm',
      'Contains at least 10 ways'
    ],
    correctAnswer: 1,
    explanation: 'Since Amendment 3 to BS 7671:2018, consumer units in domestic premises must be manufactured from non-combustible material to reduce fire risk.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:421.1.201'
  },
  {
    id: 'vi-8',
    question: 'What must be checked regarding fire barriers where cables pass through walls or floors?',
    options: [
      'Cable colours are consistent',
      'Fire stopping is present and appropriate',
      'Minimum of 3 cables per penetration',
      'Barriers are painted red'
    ],
    correctAnswer: 1,
    explanation: 'Where cables pass through fire barriers (walls, floors, ceilings), appropriate fire stopping must be installed to maintain the fire resistance rating of the barrier.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:527.2'
  },
  {
    id: 'vi-9',
    question: 'What documentation must be available for inspection?',
    options: [
      'Electrician\'s business card',
      'Diagrams, schedules, and manufacturer documentation',
      'Original invoice only',
      'Building plans from the architect'
    ],
    correctAnswer: 1,
    explanation: 'Circuit diagrams, distribution board schedules, and relevant manufacturer documentation must be available to verify the installation and for future reference.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.9'
  },
  {
    id: 'vi-10',
    question: 'What must be verified regarding single-pole switching devices?',
    options: [
      'They are installed in the neutral conductor',
      'They are installed in the line conductor only',
      'They can be in either line or neutral',
      'They must be double-pole only'
    ],
    correctAnswer: 1,
    explanation: 'Single-pole switching devices must be installed in the line conductor only to ensure safe isolation. This is a critical polarity requirement.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'vi-11',
    question: 'What should be verified regarding the labelling of circuits?',
    options: [
      'Labels are handwritten',
      'Durable labels identifying each circuit clearly',
      'Labels are colour-coded only',
      'No labelling is required'
    ],
    correctAnswer: 1,
    explanation: 'Every circuit must be identified with a durable label at the distribution board, clearly indicating the circuit purpose/location.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.8'
  },
  {
    id: 'vi-12',
    question: 'What enclosure rating is required for electrical equipment installed outdoors?',
    options: [
      'IP20',
      'IP2X minimum',
      'IP44 minimum or suitable for the location',
      'IPX4 maximum'
    ],
    correctAnswer: 2,
    explanation: 'Equipment installed outdoors must have at least IP44 protection, or higher depending on the specific environmental conditions and exposure to weather.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.3'
  },
  {
    id: 'vi-13',
    question: 'What must be checked for cables installed in thermal insulation?',
    options: [
      'Cable colour is white',
      'Appropriate derating or cable positioning',
      'Cables pass through insulation quickly',
      'Maximum 2 cables per route'
    ],
    correctAnswer: 1,
    explanation: 'Cables surrounded by thermal insulation must be appropriately derated or positioned to prevent overheating. The installation method affects the current-carrying capacity.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:523.9'
  },
  {
    id: 'vi-14',
    question: 'What must be verified for accessibility of equipment requiring operation or maintenance?',
    options: [
      'Equipment is hidden from view',
      'Adequate access for operation, inspection, and maintenance',
      'Equipment is installed at maximum height',
      'Only trained persons can access'
    ],
    correctAnswer: 1,
    explanation: 'All equipment that may require operation, inspection, testing, or maintenance must be accessible for these purposes.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:513.1'
  },
  {
    id: 'vi-15',
    question: 'What should be verified regarding RCD protection for socket outlets?',
    options: [
      'RCDs are optional for all sockets',
      '30mA RCD protection for socket outlets up to 32A',
      'RCDs only required outdoors',
      '100mA RCDs are acceptable for all sockets'
    ],
    correctAnswer: 1,
    explanation: 'Socket outlets with rated current not exceeding 32A must have additional protection by a 30mA RCD in most installations.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.3.3'
  },
  {
    id: 'vi-16',
    question: 'What check should be made for cables in areas subject to mechanical damage?',
    options: [
      'Cable jacketing is a bright colour',
      'Appropriate mechanical protection is provided',
      'Cables are twisted together',
      'Warning labels are attached to cables'
    ],
    correctAnswer: 1,
    explanation: 'Cables in locations exposed to mechanical damage must have appropriate protection such as conduit, trunking, armoured cable, or other suitable enclosure.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.6'
  },
  {
    id: 'vi-17',
    question: 'What must be inspected regarding earthing arrangements?',
    options: [
      'Earth cable is green colour only',
      'Earthing conductor size, routing, and connection to MET',
      'Earth electrode is painted',
      'Earthing is through the neutral only'
    ],
    correctAnswer: 1,
    explanation: 'The earthing conductor must be verified for correct size (based on line conductor size), secure connection to the MET, and appropriate routing/protection.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:542'
  },
  {
    id: 'vi-18',
    question: 'What visual check is required for surge protective devices (SPDs)?',
    options: [
      'SPD colour matches consumer unit',
      'Correct type, rating, and indicator status',
      'SPD is the largest device installed',
      'SPD has no connections'
    ],
    correctAnswer: 1,
    explanation: 'Where SPDs are installed, verify correct Type (1, 2, or 3), appropriate rating for the installation, and check status indicators show the device is functional.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:534'
  },
  {
    id: 'vi-19',
    question: 'What must be verified for emergency switching devices?',
    options: [
      'They are painted red',
      'Correct identification, location, and accessibility',
      'They are installed in locked enclosures',
      'They operate slowly'
    ],
    correctAnswer: 1,
    explanation: 'Emergency switching devices must be clearly identified, readily accessible, and positioned where they can be operated quickly in an emergency.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:537.4'
  },
  {
    id: 'vi-20',
    question: 'When inspecting a TT system, what specific item must be verified?',
    options: [
      'Connection to water pipe',
      'Earth electrode installation and connection',
      'PME connection',
      'Supplier\'s earth terminal'
    ],
    correctAnswer: 1,
    explanation: 'In TT systems, the earth electrode must be inspected for correct installation, secure connection to the earthing conductor, and suitability for the soil conditions.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:542.2'
  },
  {
    id: 'vi-21',
    question: 'What should be inspected at the intake position?',
    options: [
      'Colour of the meter',
      'Supplier\'s equipment, earthing arrangement, and isolation point',
      'Number of supplier fuses',
      'Age of the installation'
    ],
    correctAnswer: 1,
    explanation: 'At the intake, verify the supplier\'s cutout, metering equipment, earthing arrangement (TN-C-S, TN-S, or TT), and main isolation point.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.4'
  },
  {
    id: 'vi-22',
    question: 'What must be checked for cables running in close proximity to other services?',
    options: [
      'All services are the same colour',
      'Adequate separation or protection from non-electrical services',
      'Cables touch other services for support',
      'No requirement for separation'
    ],
    correctAnswer: 1,
    explanation: 'Electrical cables must have adequate separation from other services (gas, water) or appropriate protection/insulation to prevent damage and interference.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:528.3'
  },
  {
    id: 'vi-23',
    question: 'What visual inspection is required for luminaires?',
    options: [
      'Light output measurement',
      'Appropriate type, mounting, and cable connections',
      'Bulb wattage only',
      'Luminaire age'
    ],
    correctAnswer: 1,
    explanation: 'Luminaires must be checked for suitability for the location (IP rating, fire rating), secure mounting, correct heat-resisting cable where needed, and safe terminations.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:559'
  },
  {
    id: 'vi-24',
    question: 'What must be verified for installations in locations containing a bath or shower?',
    options: [
      'Only waterproof lights are used',
      'Zone classification and equipment suitability for each zone',
      'All equipment is portable',
      'Heating is turned off'
    ],
    correctAnswer: 1,
    explanation: 'Verify the zone boundaries (0, 1, 2) are understood and that all equipment installed meets the IP rating and other requirements for its zone.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:701'
  },
  {
    id: 'vi-25',
    question: 'What should be checked regarding cable support and fixings?',
    options: [
      'Cables are loose for flexibility',
      'Appropriate support at correct intervals',
      'All fixings are plastic',
      'Minimum one fixing per circuit'
    ],
    correctAnswer: 1,
    explanation: 'Cables must be adequately supported at intervals appropriate to the cable type and installation method, preventing strain on terminations and maintaining cable integrity.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:522.8'
  },
  {
    id: 'vi-26',
    question: 'What is the minimum height for a consumer unit in a domestic dwelling?',
    options: [
      'Any height is acceptable',
      'Between 450mm and 1200mm from finished floor level',
      'Maximum 500mm from ceiling',
      'At eye level only'
    ],
    correctAnswer: 1,
    explanation: 'Consumer units should be mounted so that the switches are between 450mm and 1200mm from finished floor level for accessibility. This requirement is from Part M of the Building Regulations.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.12'
  },
  {
    id: 'vi-27',
    question: 'What must be verified regarding the identification of protective conductors?',
    options: [
      'They can be any colour',
      'Green/yellow bi-colour throughout their length',
      'Only green is acceptable',
      'Yellow only at terminations'
    ],
    correctAnswer: 1,
    explanation: 'Protective conductors must be identified by the bi-colour combination green/yellow throughout their length. This is the internationally recognised colour for protective conductors.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3.1'
  },
  {
    id: 'vi-28',
    question: 'What should be checked regarding basic insulation of live parts?',
    options: [
      'Insulation colour is consistent',
      'Insulation is complete, undamaged, and appropriate for the environment',
      'Insulation is the minimum thickness available',
      'Only factory-applied insulation counts'
    ],
    correctAnswer: 1,
    explanation: 'Basic insulation must completely cover live parts, be undamaged, and be suitable for the voltage and environmental conditions where installed.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:416'
  },
  {
    id: 'vi-29',
    question: 'What is verified during inspection of a distribution board cover?',
    options: [
      'Cover colour matches wall',
      'Secure fitting, all knockouts blanked, and IP rating maintained',
      'Cover is removable by hand',
      'Cover has manufacturer logo'
    ],
    correctAnswer: 1,
    explanation: 'Distribution board covers must be securely fitted, have all unused cable entries blanked off, and maintain the required IP rating for protection against ingress.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:526.3'
  },
  {
    id: 'vi-30',
    question: 'What must be inspected for socket outlets on ring final circuits?',
    options: [
      'Sockets are evenly spaced',
      'Each socket is correctly connected with ring continuity possible',
      'Maximum 10 sockets per ring',
      'All sockets face the same direction'
    ],
    correctAnswer: 1,
    explanation: 'Ring final circuit sockets must be connected so that ring continuity can be achieved. Spurs and their outlets must comply with the requirements for ring circuits.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:Appendix 15'
  },
  {
    id: 'vi-31',
    question: 'What check is required for cables passing through metal enclosures?',
    options: [
      'Cables are loosely fitted',
      'Bushings or grommets protect cables from damage by sharp edges',
      'Maximum two cables per hole',
      'Metal enclosures must be earthed twice'
    ],
    correctAnswer: 1,
    explanation: 'Where cables pass through metal enclosures or panels, bushings, grommets, or smooth-bore entries must protect the cable sheath from damage by sharp edges.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.8.1'
  },
  {
    id: 'vi-32',
    question: 'What visual inspection is required for equipotential bonding connections?',
    options: [
      'Bonds are painted the same colour as pipes',
      'Clamps are correct type, tight, and on clean metal surfaces',
      'Bonds loop around pipes twice',
      'All bonds use the same clamp type'
    ],
    correctAnswer: 1,
    explanation: 'Bonding clamps must be the correct type for the service, securely tightened, and attached to clean metal surfaces to ensure good electrical contact.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:544.1'
  },
  {
    id: 'vi-33',
    question: 'What is checked regarding the earthing conductor connection to the MET?',
    options: [
      'Connection can be hand-tightened',
      'Secure connection, correct size, and labelled with safety warning',
      'Connection is inside the consumer unit',
      'MET is painted green'
    ],
    correctAnswer: 1,
    explanation: 'The earthing conductor connection to the MET must be secure, correctly sized, and carry a permanent label warning: "Safety Electrical Connection - Do Not Remove".',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:514.13.1'
  },
  {
    id: 'vi-34',
    question: 'What must be verified for an AFDD (Arc Fault Detection Device) installation?',
    options: [
      'AFDD is the largest device in the board',
      'Correct rating, test button present, and indicator functional',
      'AFDD replaces all RCDs',
      'AFDD is optional for all circuits'
    ],
    correctAnswer: 1,
    explanation: 'AFDDs must be correctly rated for the circuit, have a functional test button, and visual indicators showing operational status.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:421.1.7'
  },
  {
    id: 'vi-35',
    question: 'What visual check applies to cables in escape routes?',
    options: [
      'Cables must be concealed',
      'Cables must not pose a fire hazard and meet fire resistance requirements',
      'Standard PVC cables are always acceptable',
      'Cables must be painted to match walls'
    ],
    correctAnswer: 1,
    explanation: 'Cables in escape routes must be selected and installed so they do not pose a fire hazard. This may require low smoke, fire-resistant cables depending on the route.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:422.2'
  },
  {
    id: 'vi-36',
    question: 'What should be inspected regarding isolation devices?',
    options: [
      'All isolation devices are the same colour',
      'Clearly identified, accessible, and capable of being secured in the OFF position',
      'Isolation devices are hidden from view',
      'Only main switch needs inspection'
    ],
    correctAnswer: 1,
    explanation: 'Isolation devices must be clearly identified for the circuit they control, readily accessible, and capable of being secured in the OFF position for safe working.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:537.2'
  },
  {
    id: 'vi-37',
    question: 'What is verified for cables installed in walls at depths less than 50mm?',
    options: [
      'Cables follow any convenient route',
      'Cables are in prescribed zones or have RCD protection',
      'Cables are always in conduit',
      'No special requirements apply'
    ],
    correctAnswer: 1,
    explanation: 'Cables at less than 50mm depth must either be installed in prescribed safe zones (horizontal or vertical from accessories) or be protected by a 30mA RCD.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.6.101'
  },
  {
    id: 'vi-38',
    question: 'What must be checked for luminaires installed in fire-rated ceilings?',
    options: [
      'Luminaire wattage only',
      'Fire hood or intumescent cover fitted where required',
      'Luminaires are all the same type',
      'Minimum two luminaires per room'
    ],
    correctAnswer: 1,
    explanation: 'Luminaires installed in fire-rated ceilings must maintain the fire rating, typically requiring fire hoods or intumescent covers unless the luminaire is specifically fire-rated.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:422.4.2'
  },
  {
    id: 'vi-39',
    question: 'What inspection is required for cables subject to vibration?',
    options: [
      'Cables are strapped tightly at all points',
      'Flexible cables used and connections suitable for vibration',
      'Only armoured cables permitted',
      'Vibration has no effect on cables'
    ],
    correctAnswer: 1,
    explanation: 'Where cables are subject to vibration, flexible conductors should be used, and connections must be suitable for the conditions to prevent loosening or fatigue failure.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:522.7'
  },
  {
    id: 'vi-40',
    question: 'What should be verified regarding the presence of appropriate warning notices?',
    options: [
      'Notices are handwritten',
      'Durable notices at appropriate locations (voltage, RCD test, isolation)',
      'One notice per installation is sufficient',
      'Notices are optional'
    ],
    correctAnswer: 1,
    explanation: 'Durable warning notices must be provided at appropriate locations such as voltage warnings, RCD test reminders, and isolation procedures.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514'
  },
  {
    id: 'vi-41',
    question: 'What inspection is needed for electrical equipment in dusty environments?',
    options: [
      'Equipment is cleaned weekly',
      'Appropriate IP rating for dust protection (IP5X or IP6X)',
      'Standard equipment with dust covers',
      'Dust has no effect on equipment'
    ],
    correctAnswer: 1,
    explanation: 'Equipment in dusty environments must have appropriate IP ratings: IP5X for dust-protected or IP6X for dust-tight installations.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.3'
  },
  {
    id: 'vi-42',
    question: 'What must be verified for PEN conductor connections in TN-C-S systems?',
    options: [
      'PEN conductor is the smallest cable',
      'Connection at origin with separate earth and neutral terminals',
      'PEN conductor runs throughout the installation',
      'No earthing required for TN-C-S'
    ],
    correctAnswer: 1,
    explanation: 'At the origin of a TN-C-S installation, the PEN conductor separates into separate earth and neutral conductors with proper terminal connections.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:543.4'
  },
  {
    id: 'vi-43',
    question: 'What check is required for socket outlet circuits in kitchens?',
    options: [
      'All sockets are at worktop height',
      '30mA RCD protection provided',
      'Maximum 4 sockets per circuit',
      'Sockets are waterproof rated'
    ],
    correctAnswer: 1,
    explanation: 'Kitchen socket outlets up to 32A must have 30mA RCD protection for additional safety against electric shock.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:411.3.3'
  },
  {
    id: 'vi-44',
    question: 'What should be inspected at a change of conductor size?',
    options: [
      'Colours match throughout',
      'Appropriate protection or location for the reduced conductor',
      'Change is made mid-cable',
      'No inspection required'
    ],
    correctAnswer: 1,
    explanation: 'Where conductor size reduces, the smaller conductor must be appropriately protected by the upstream device or located so as not to exceed its capacity.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:433'
  },
  {
    id: 'vi-45',
    question: 'What visual inspection applies to EV charging installations?',
    options: [
      'Charger colour matches vehicle',
      'Appropriate protective measures, earthing, and dedicated circuit',
      'Any socket can be used',
      'Standard extension leads acceptable'
    ],
    correctAnswer: 1,
    explanation: 'EV charging points must have appropriate protective measures (typically PME earthing considerations), proper earthing arrangements, and dedicated circuits.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:722'
  },
  {
    id: 'vi-46',
    question: 'What must be checked for cables installed underground?',
    options: [
      'Cables are laid loose in soil',
      'Appropriate cable type, depth, and route marking',
      'Standard PVC cables are suitable',
      'Depth is not important'
    ],
    correctAnswer: 1,
    explanation: 'Underground cables must be suitable for direct burial (armoured or in ducts), laid at appropriate depth (typically 450mm minimum), with route marking where required.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:522.8.10'
  },
  {
    id: 'vi-47',
    question: 'What inspection is required for functional switching devices?',
    options: [
      'All switches are the same type',
      'Correct rating and suitable for the intended purpose',
      'Switches operate at any voltage',
      'Only double-pole switches permitted'
    ],
    correctAnswer: 1,
    explanation: 'Functional switches must be correctly rated for the circuit and suitable for the intended purpose (lighting, appliance control, etc.).',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: 'BS 7671:537.5'
  },
  {
    id: 'vi-48',
    question: 'What should be verified for installations in agricultural premises?',
    options: [
      'Standard domestic equipment is suitable',
      'Equipment suitable for environment including livestock protection',
      'Lower voltage equipment only',
      'No special requirements'
    ],
    correctAnswer: 1,
    explanation: 'Agricultural installations require equipment suitable for the environment including dust, moisture, corrosive atmospheres, and measures to protect livestock from electric shock.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:705'
  },
  {
    id: 'vi-49',
    question: 'What visual check is needed for generator installations?',
    options: [
      'Generator colour is specified',
      'Isolation arrangements to prevent parallel operation with supply',
      'Any connection method is acceptable',
      'Generators need no special inspection'
    ],
    correctAnswer: 1,
    explanation: 'Generator installations must have appropriate isolation arrangements to prevent the generator operating in parallel with the supply unless specifically designed for this.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:551.7'
  },
  {
    id: 'vi-50',
    question: 'What must be inspected for photovoltaic (PV) system installations?',
    options: [
      'Panel angles only',
      'DC isolator, labelling, and cable segregation from AC circuits',
      'Only AC side needs inspection',
      'PV systems use standard domestic wiring'
    ],
    correctAnswer: 1,
    explanation: 'PV installations require inspection of DC isolators, appropriate warning labels for DC voltage, and proper segregation of DC cables from AC circuits.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: 'BS 7671:712'
  }
];
