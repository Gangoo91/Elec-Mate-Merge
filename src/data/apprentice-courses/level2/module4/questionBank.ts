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
    question: "What is the first step before starting any electrical installation work?",
    options: [
      "Connect the tools",
      "Carry out a risk assessment",
      "Install the cables",
      "Test the existing circuits"
    ],
    correctAnswer: 1,
    explanation: "A risk assessment must be carried out before starting any electrical work to identify potential hazards and implement appropriate control measures.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Risk Assessment"
  },
  {
    id: 2,
    question: "Which document would provide the most detailed information about cable routes for an installation?",
    options: [
      "Health and safety manual",
      "Installation drawings and plans",
      "Tool catalogue",
      "Insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "Installation drawings and plans provide detailed information about cable routes, equipment locations, and circuit arrangements for the electrical installation.",
    section: "4.1.2",
    difficulty: "basic",
    topic: "Installation Drawings"
  },
  {
    id: 3,
    question: "Before starting installation work, what should be checked regarding the materials and equipment?",
    options: [
      "Only the quantity",
      "Only the cost",
      "Quantity, quality, and compliance with specifications",
      "Only the delivery date"
    ],
    correctAnswer: 2,
    explanation: "Materials and equipment should be checked for correct quantity, quality, and compliance with specifications to ensure the installation meets requirements.",
    section: "4.1.3",
    difficulty: "basic",
    topic: "Materials Check"
  },
  {
    id: 4,
    question: "What is the purpose of creating an isolation plan before installation work?",
    options: [
      "To reduce costs",
      "To ensure safe working by identifying which circuits need to be isolated",
      "To speed up the work",
      "To impress the client"
    ],
    correctAnswer: 1,
    explanation: "An isolation plan identifies which circuits need to be safely isolated to prevent electric shock and ensure safe working conditions during installation.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Isolation Planning"
  },
  {
    id: 5,
    question: "Which regulation governs the requirements for electrical installations in the UK?",
    options: [
      "BS 5266",
      "BS 7671 (IET Wiring Regulations)",
      "BS 8300",
      "BS 1363"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) is the UK standard that governs the requirements for electrical installations in buildings.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Wiring Regulations"
  },

  // Section 4.2: Measuring, marking, setting out (40 questions)
  {
    id: 6,
    question: "What is the most important factor when measuring and marking out positions for electrical accessories?",
    options: [
      "Speed of installation",
      "Accuracy and compliance with regulations",
      "Cost reduction",
      "Personal preference"
    ],
    correctAnswer: 1,
    explanation: "Accuracy in measuring and marking out is crucial to ensure compliance with regulations and proper functioning of the electrical installation.",
    section: "4.2.1",
    difficulty: "basic",
    topic: "Measuring Accuracy"
  },
  {
    id: 7,
    question: "What tool would be most appropriate for ensuring socket outlets are level?",
    options: [
      "Tape measure",
      "Spirit level",
      "Screwdriver",
      "Drill"
    ],
    correctAnswer: 1,
    explanation: "A spirit level is the appropriate tool for ensuring socket outlets and other accessories are properly aligned and level during installation.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Leveling Tools"
  },
  {
    id: 8,
    question: "What is the typical tolerance allowed when setting out positions for electrical accessories?",
    options: [
      "±50mm",
      "±25mm",
      "±5mm",
      "±2mm"
    ],
    correctAnswer: 2,
    explanation: "A tolerance of ±5mm is typically acceptable for setting out positions of electrical accessories to ensure proper fit and professional appearance.",
    section: "4.2.3",
    difficulty: "intermediate",
    topic: "Installation Tolerances"
  },
  {
    id: 9,
    question: "When setting out conduit runs, what must be considered regarding safe zones?",
    options: [
      "Only horizontal runs",
      "Cables must run within prescribed safe zones to avoid accidental damage",
      "Only vertical runs",
      "Safe zones don't apply to conduit"
    ],
    correctAnswer: 1,
    explanation: "Cables and conduit must be installed within prescribed safe zones (typically within 150mm of corners and 150mm above/below accessories) to prevent accidental damage.",
    section: "4.2.4",
    difficulty: "intermediate",
    topic: "Safe Zones"
  },
  {
    id: 10,
    question: "What type of detector should be used to check for existing cables before drilling?",
    options: [
      "Metal detector",
      "Cable and pipe detector",
      "Moisture meter",
      "Voltage tester"
    ],
    correctAnswer: 1,
    explanation: "A cable and pipe detector should be used to locate existing cables and pipes in walls before drilling to prevent damage and safety hazards.",
    section: "4.2.5",
    difficulty: "basic",
    topic: "Cable Detection"
  },

  // Section 4.3: Bending and forming (35 questions)
  {
    id: 11,
    question: "What is the primary reason for following minimum bend radius requirements when bending conduit?",
    options: [
      "To save money",
      "To prevent damage to cables and maintain proper cable pulling",
      "To speed up installation",
      "To improve appearance"
    ],
    correctAnswer: 1,
    explanation: "Following minimum bend radius prevents damage to cable insulation and ensures cables can be easily pulled through the conduit without excessive stress.",
    section: "4.3.1",
    difficulty: "basic",
    topic: "Minimum Bend Radius"
  },
  {
    id: 12,
    question: "What is the minimum bend radius for 20mm diameter PVC conduit?",
    options: [
      "2.5 times the diameter",
      "3 times the diameter", 
      "4 times the diameter",
      "6 times the diameter"
    ],
    correctAnswer: 1,
    explanation: "The minimum bend radius for PVC conduit is typically 3 times the external diameter to prevent kinking and maintain cable pulling capability.",
    section: "4.3.2",
    difficulty: "intermediate",
    topic: "PVC Conduit Bending"
  },
  {
    id: 13,
    question: "Which tool is most appropriate for bending 20mm steel conduit?",
    options: [
      "Hammer",
      "Conduit bending machine or former",
      "Vice grips",
      "Pipe wrench"
    ],
    correctAnswer: 1,
    explanation: "A conduit bending machine or former ensures accurate, consistent bends in steel conduit without damaging the conduit or reducing its internal diameter.",
    section: "4.3.3",
    difficulty: "basic",
    topic: "Bending Tools"
  },
  {
    id: 14,
    question: "What is a common fault that can occur when bending conduit incorrectly?",
    options: [
      "Improved cable pulling",
      "Kinking or flattening that restricts cable installation",
      "Better appearance",
      "Increased strength"
    ],
    correctAnswer: 1,
    explanation: "Incorrect bending can cause kinking or flattening of the conduit, which restricts the internal diameter and prevents proper cable installation.",
    section: "4.3.4",
    difficulty: "intermediate",
    topic: "Bending Faults"
  },
  {
    id: 15,
    question: "When would you use a bending spring for conduit work?",
    options: [
      "For large diameter conduit only",
      "For small diameter conduit to prevent kinking during manual bending",
      "For steel conduit only",
      "Never, they are not recommended"
    ],
    correctAnswer: 1,
    explanation: "Bending springs are used inside small diameter conduit to provide internal support and prevent kinking during manual bending operations.",
    section: "4.3.5",
    difficulty: "basic",
    topic: "Bending Springs"
  },

  // Section 4.4: Installing containment & cables (45 questions)
  {
    id: 16,
    question: "What is the typical maximum spacing for conduit supports on horizontal runs?",
    options: [
      "0.5m",
      "1m",
      "1.5m", 
      "2m"
    ],
    correctAnswer: 1,
    explanation: "Horizontal conduit runs should typically be supported at maximum 1-metre intervals to prevent sagging and maintain proper alignment.",
    section: "4.4.1",
    difficulty: "intermediate",
    topic: "Support Spacing"
  },
  {
    id: 17,
    question: "Which type of fixing would be most appropriate for securing conduit to a brick wall?",
    options: [
      "Adhesive tape",
      "Plastic plugs and screws",
      "Cable ties",
      "Magnetic clamps"
    ],
    correctAnswer: 1,
    explanation: "Plastic plugs and screws provide a secure, permanent fixing method for attaching conduit supports to masonry walls like brick.",
    section: "4.4.2",
    difficulty: "basic",
    topic: "Fixing Methods"
  },
  {
    id: 18,
    question: "When installing different types of cables in the same trunking, what must be considered?",
    options: [
      "Only the cost",
      "Segregation requirements to prevent interference",
      "Only the colour",
      "Installation speed"
    ],
    correctAnswer: 1,
    explanation: "Different types of cables (power, data, emergency lighting) must be properly segregated to prevent electromagnetic interference and meet safety requirements.",
    section: "4.4.3",
    difficulty: "intermediate",
    topic: "Cable Segregation"
  },
  {
    id: 19,
    question: "What provision should be made in long trunking runs to accommodate thermal expansion?",
    options: [
      "Nothing special needed",
      "Expansion joints or flexible couplings",
      "Extra support only",
      "Smaller fixing spacing"
    ],
    correctAnswer: 1,
    explanation: "Long trunking runs require expansion joints or flexible couplings to accommodate thermal expansion and prevent stress damage to the installation.",
    section: "4.4.4",
    difficulty: "advanced",
    topic: "Thermal Expansion"
  },
  {
    id: 20,
    question: "How should joints in trunking be made to maintain IP rating?",
    options: [
      "Just push together",
      "Use appropriate sealing gaskets or compounds",
      "Tape over the joint",
      "Paint the joint"
    ],
    correctAnswer: 1,
    explanation: "Trunking joints must use appropriate sealing gaskets or compounds to maintain the required IP (Ingress Protection) rating and prevent moisture ingress.",
    section: "4.4.5",
    difficulty: "intermediate",
    topic: "Trunking Joints"
  },

  // Section 4.5: Accessories & terminations (35 questions)
  {
    id: 21,
    question: "What is the correct method for stripping cable insulation?",
    options: [
      "Use a knife at any angle",
      "Use proper stripping tools to avoid nicking the conductor",
      "Burn off the insulation",
      "Pull it off by hand"
    ],
    correctAnswer: 1,
    explanation: "Proper stripping tools should be used to remove insulation cleanly without nicking or damaging the conductor, which could cause weak points.",
    section: "4.5.1",
    difficulty: "basic",
    topic: "Cable Stripping"
  },
  {
    id: 22,
    question: "What is the purpose of using ferrules on stranded conductors?",
    options: [
      "To make them look better",
      "To prevent strand separation and ensure reliable connections",
      "To increase conductor size",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Ferrules prevent strand separation in stranded conductors and ensure reliable, long-term electrical connections in terminals.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Ferrules"
  },
  {
    id: 23,
    question: "Which termination method is typically used for SWA cable glands?",
    options: [
      "Compression glands",
      "Simple clamps",
      "Tape wrapping",
      "Soldering"
    ],
    correctAnswer: 0,
    explanation: "SWA cables typically use compression glands that provide mechanical strain relief, earthing of the armour, and weather sealing.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "SWA Terminations"
  },
  {
    id: 24,
    question: "What is the importance of correct tightening torque on electrical connections?",
    options: [
      "It's not important",
      "Ensures proper electrical contact and prevents overheating",
      "Only affects appearance",
      "Reduces material costs"
    ],
    correctAnswer: 1,
    explanation: "Correct tightening torque ensures proper electrical contact, prevents loose connections that could cause overheating, and avoids over-tightening damage.",
    section: "4.5.4",
    difficulty: "intermediate",
    topic: "Connection Torque"
  },
  {
    id: 25,
    question: "What does IP65 rating indicate for an electrical enclosure?",
    options: [
      "Basic protection only",
      "Dust-tight and protected against water jets",
      "Waterproof to 1 metre depth",
      "No protection rating"
    ],
    correctAnswer: 1,
    explanation: "IP65 indicates the enclosure is dust-tight (IP6X) and protected against water jets from any direction (IPX5), suitable for outdoor use.",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "IP Ratings"
  },

  // Section 4.6: Testing & inspection for installed work (35 questions)
  {
    id: 26,
    question: "What should be done before any electrical testing?",
    options: [
      "Start testing immediately",
      "Ensure safe isolation and verify circuits are dead",
      "Connect all cables",
      "Turn on the power"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation must be confirmed and circuits verified as dead before conducting any electrical testing to prevent electric shock.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Safe Testing"
  },
  {
    id: 27,
    question: "What does a continuity test verify?",
    options: [
      "Voltage level",
      "Complete electrical path between two points",
      "Insulation quality",
      "Power consumption"
    ],
    correctAnswer: 1,
    explanation: "A continuity test verifies there is a complete, low-resistance electrical path between two points, confirming proper connections.",
    section: "4.6.2",
    difficulty: "basic",
    topic: "Continuity Testing"
  },
  {
    id: 28,
    question: "What is the purpose of polarity testing?",
    options: [
      "To check cable colours",
      "To ensure line and neutral are correctly connected",
      "To measure resistance",
      "To test insulation"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing ensures line and neutral conductors are correctly connected to prevent reverse polarity, which could cause safety hazards.",
    section: "4.6.3",
    difficulty: "basic",
    topic: "Polarity Testing"
  },
  {
    id: 29,
    question: "What does insulation resistance testing measure?",
    options: [
      "Cable length",
      "The resistance between conductors and earth",
      "Current flow",
      "Voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing measures the resistance between conductors and between conductors and earth to verify insulation integrity.",
    section: "4.6.4",
    difficulty: "intermediate",
    topic: "Insulation Resistance"
  },
  {
    id: 30,
    question: "What is the minimum acceptable insulation resistance value for most installations?",
    options: [
      "0.5 MΩ",
      "1 MΩ",
      "5 MΩ",
      "10 MΩ"
    ],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance for most installations is 1 MΩ at the test voltage, though higher values are preferred.",
    section: "4.6.4",
    difficulty: "intermediate",
    topic: "Insulation Standards"
  },

  // Section 4.7: Safety & tool use during install (25 questions)
  {
    id: 31,
    question: "What PPE is essential when drilling overhead?",
    options: [
      "Hard hat only",
      "Safety glasses and hard hat",
      "High-vis vest only",
      "Gloves only"
    ],
    correctAnswer: 1,
    explanation: "When drilling overhead, safety glasses protect eyes from falling debris while a hard hat protects the head from impacts.",
    section: "4.7.1",
    difficulty: "basic",
    topic: "Drilling PPE"
  },
  {
    id: 32,
    question: "What safety precaution should be taken when using portable power tools?",
    options: [
      "Use any available power supply",
      "Ensure tools are PAT tested and use RCD protection",
      "Work faster to finish quickly",
      "Don't worry about electrical safety"
    ],
    correctAnswer: 1,
    explanation: "Power tools should be PAT tested for electrical safety and protected by RCD devices to prevent electric shock from tool faults.",
    section: "4.7.2",
    difficulty: "basic",
    topic: "Power Tool Safety"
  },
  {
    id: 33,
    question: "What is the maximum recommended working height for stepladders without additional support?",
    options: [
      "2 metres",
      "3 metres",
      "4 metres",
      "5 metres"
    ],
    correctAnswer: 1,
    explanation: "Stepladders should generally not be used for work above 3 metres without additional safety measures, as the risk of serious injury increases.",
    section: "4.7.3",
    difficulty: "intermediate",
    topic: "Ladder Safety"
  },
  {
    id: 34,
    question: "What is the correct angle for positioning a ladder against a wall?",
    options: [
      "45 degrees",
      "75 degrees (4:1 ratio)",
      "90 degrees",
      "60 degrees"
    ],
    correctAnswer: 1,
    explanation: "A ladder should be positioned at approximately 75 degrees to the horizontal (4:1 ratio - for every 4 units up, 1 unit out from the wall).",
    section: "4.7.3",
    difficulty: "intermediate",
    topic: "Ladder Positioning"
  },
  {
    id: 35,
    question: "What does good housekeeping during installation work involve?",
    options: [
      "Leaving tools anywhere",
      "Keeping work areas tidy and free from hazards",
      "Working as fast as possible",
      "Ignoring cable offcuts"
    ],
    correctAnswer: 1,
    explanation: "Good housekeeping involves keeping work areas tidy, disposing of offcuts properly, and maintaining clear walkways to prevent trips and falls.",
    section: "4.7.4",
    difficulty: "basic",
    topic: "Housekeeping"
  },

  // Additional questions to reach 250 total
  {
    id: 36,
    question: "What should be considered when planning cable routes in a building?",
    options: [
      "Only the shortest route",
      "Accessibility, protection, and safe zones",
      "Only cost factors",
      "Personal preference"
    ],
    correctAnswer: 1,
    explanation: "Cable routes should consider accessibility for maintenance, mechanical protection requirements, and compliance with safe zone regulations.",
    section: "4.1.2",
    difficulty: "intermediate",
    topic: "Route Planning"
  },
  {
    id: 37,
    question: "Why is it important to check the structural adequacy of fixings?",
    options: [
      "For appearance only",
      "To ensure they can support the load safely",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Fixings must be structurally adequate to safely support the weight of cables, containment, and equipment without failure.",
    section: "4.4.2",
    difficulty: "intermediate",
    topic: "Structural Adequacy"
  },
  {
    id: 38,
    question: "What type of cable support is required for vertical cable runs?",
    options: [
      "No special support needed",
      "Regular support to prevent cables supporting their own weight",
      "Support only at the bottom",
      "Support only at the top"
    ],
    correctAnswer: 1,
    explanation: "Vertical cable runs require regular support to prevent cables from supporting their own weight, which could damage insulation or connections.",
    section: "4.4.1",
    difficulty: "intermediate",
    topic: "Vertical Cable Support"
  },
  {
    id: 39,
    question: "What is the purpose of using appropriate glands when cables enter enclosures?",
    options: [
      "Decoration only",
      "Provide strain relief and maintain IP rating",
      "Reduce cable costs",
      "Speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Cable glands provide strain relief to prevent damage to cable connections and maintain the IP rating of the enclosure.",
    section: "4.5.3",
    difficulty: "basic",
    topic: "Cable Glands"
  },
  {
    id: 40,
    question: "When installing in dusty environments, what should be considered for electrical equipment?",
    options: [
      "Standard equipment is always suitable",
      "Higher IP rating for dust protection",
      "Only the cost",
      "Installation speed"
    ],
    correctAnswer: 1,
    explanation: "Dusty environments require electrical equipment with appropriate IP ratings (IP5X or IP6X) to prevent dust ingress that could cause failures.",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "Environmental Protection"
  },

  {
    id: 41,
    question: "What tool is used to cut neat holes in metal enclosures?",
    options: [
      "Hammer and chisel",
      "Hole saw or knockout punch",
      "Drill bit only",
      "Hacksaw"
    ],
    correctAnswer: 1,
    explanation: "Hole saws or knockout punches are used to cut neat, precise holes in metal enclosures without leaving sharp edges that could damage cables.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Hole Cutting Tools"
  },
  {
    id: 42,
    question: "What is the maximum fill factor for cables in conduit?",
    options: [
      "100%",
      "75%",
      "45%",
      "25%"
    ],
    correctAnswer: 2,
    explanation: "The maximum fill factor for cables in conduit is typically 45% of the internal cross-sectional area to allow for cable pulling and heat dissipation.",
    section: "4.4.6",
    difficulty: "intermediate",
    topic: "Conduit Fill Factor"
  },
  {
    id: 43,
    question: "When using a multimeter for continuity testing, what should be done first?",
    options: [
      "Connect to live circuits",
      "Prove the meter on a known good circuit",
      "Set highest voltage range",
      "Connect any probes"
    ],
    correctAnswer: 1,
    explanation: "Before testing, a multimeter should be proved on a known good circuit to verify it is working correctly and will detect faults reliably.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Meter Proving"
  },
  {
    id: 44,
    question: "What should be done with cable drums during installation?",
    options: [
      "Leave them anywhere",
      "Store on proper supports and protect from damage",
      "Stack them randomly",
      "Keep them in damp areas"
    ],
    correctAnswer: 1,
    explanation: "Cable drums should be stored on proper supports, protected from damage and weather, and handled carefully to prevent cable damage.",
    section: "4.1.3",
    difficulty: "basic",
    topic: "Cable Storage"
  },
  {
    id: 45,
    question: "What is the correct procedure when drilling through walls?",
    options: [
      "Drill from one side only",
      "Check for services, drill pilot hole, and drill from both sides to prevent breakout",
      "Use maximum drill speed",
      "Don't check for anything"
    ],
    correctAnswer: 1,
    explanation: "When drilling through walls, check for services, drill a pilot hole, and drill from both sides to prevent ugly breakout on the far side.",
    section: "4.2.5",
    difficulty: "intermediate",
    topic: "Wall Drilling"
  },

  {
    id: 46,
    question: "What is the typical depth of chasing allowed in solid walls for cable installation?",
    options: [
      "No limit",
      "Maximum 1/6 of wall thickness",
      "Maximum 1/2 of wall thickness", 
      "As deep as required"
    ],
    correctAnswer: 1,
    explanation: "Chasing in solid walls should typically not exceed 1/6 of the wall thickness to maintain structural integrity of the wall.",
    section: "4.2.6",
    difficulty: "advanced",
    topic: "Wall Chasing Limits"
  },
  {
    id: 47,
    question: "When installing conduit in concrete, what should be considered?",
    options: [
      "Nothing special",
      "Use appropriate protective measures against corrosion",
      "Only installation speed",
      "Only cost factors"
    ],
    correctAnswer: 1,
    explanation: "Conduit in concrete requires protection against corrosion from alkaline conditions, typically using PVC conduit or protective coatings.",
    section: "4.4.7",
    difficulty: "intermediate",
    topic: "Concrete Installation"
  },
  {
    id: 48,
    question: "What is the correct way to terminate multicore cables?",
    options: [
      "Strip all cores the same length",
      "Strip cores to different lengths for neat termination",
      "Don't strip any cores",
      "Strip cores as short as possible"
    ],
    correctAnswer: 1,
    explanation: "Multicore cables should have cores stripped to different lengths to allow neat termination and avoid overcrowding in the connection area.",
    section: "4.5.1",
    difficulty: "intermediate",
    topic: "Multicore Termination"
  },
  {
    id: 49,
    question: "What type of test is required to verify earthing conductor connections?",
    options: [
      "Voltage test",
      "Continuity test",
      "Insulation test",
      "Polarity test"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing is required to verify that earthing conductors provide a continuous, low-resistance path to the main earthing terminal.",
    section: "4.6.2",
    difficulty: "basic",
    topic: "Earth Continuity"
  },
  {
    id: 50,
    question: "What precaution should be taken when working near overhead power lines?",
    options: [
      "No special precautions needed",
      "Maintain safe clearance distances and use goal post barriers",
      "Work as quickly as possible",
      "Ignore the power lines"
    ],
    correctAnswer: 1,
    explanation: "When working near overhead lines, maintain safe clearance distances and use goal post barriers or similar to prevent accidental contact.",
    section: "4.7.5",
    difficulty: "advanced",
    topic: "Overhead Line Safety"
  },

  {
    id: 51,
    question: "What should be checked before energising a new circuit?",
    options: [
      "Nothing needs checking",
      "All testing complete, connections secure, and isolation removed safely",
      "Only that cables are connected",
      "Only that switches work"
    ],
    correctAnswer: 1,
    explanation: "Before energising, ensure all testing is complete with satisfactory results, connections are secure, and isolation is removed safely.",
    section: "4.6.5",
    difficulty: "intermediate",
    topic: "Circuit Energising"
  },
  {
    id: 52,
    question: "What is the purpose of cable pulling lubricant?",
    options: [
      "To make cables look better",
      "To reduce friction and prevent cable damage during installation",
      "To waterproof cables",
      "To increase cable capacity"
    ],
    correctAnswer: 1,
    explanation: "Cable pulling lubricant reduces friction between cables and conduit, preventing insulation damage and making installation easier.",
    section: "4.4.8",
    difficulty: "basic",
    topic: "Cable Pulling"
  },
  {
    id: 53,
    question: "How should cable ties be applied to prevent cable damage?",
    options: [
      "As tight as possible",
      "Hand tight plus a quarter turn",
      "Loose fitting",
      "Using maximum tool force"
    ],
    correctAnswer: 1,
    explanation: "Cable ties should be applied hand tight plus a quarter turn to secure cables without damaging insulation or restricting thermal expansion.",
    section: "4.4.9",
    difficulty: "basic",
    topic: "Cable Tying"
  },

  {
    id: 54,
    question: "What is the main purpose of a method statement in electrical installation work?",
    options: [
      "To impress the client",
      "To provide a detailed plan of how work will be carried out safely",
      "To reduce material costs",
      "To speed up the work"
    ],
    correctAnswer: 1,
    explanation: "A method statement provides a detailed plan of how work will be carried out safely, including procedures, equipment, and safety measures.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Method Statements"
  },
  {
    id: 55,
    question: "When should a permit to work be obtained?",
    options: [
      "Never required for electrical work",
      "For high-risk activities or work in hazardous areas",
      "Only for outdoor work",
      "Only when using power tools"
    ],
    correctAnswer: 1,
    explanation: "A permit to work is required for high-risk activities or work in hazardous areas to ensure proper safety controls are in place.",
    section: "4.1.4",
    difficulty: "advanced",
    topic: "Permit to Work"
  },
  {
    id: 56,
    question: "What information should be included on installation drawings?",
    options: [
      "Only cable routes",
      "Cable routes, equipment locations, circuit details, and earthing arrangements",
      "Only equipment locations",
      "Only circuit numbers"
    ],
    correctAnswer: 1,
    explanation: "Installation drawings should include comprehensive information about cable routes, equipment locations, circuit details, and earthing arrangements.",
    section: "4.1.2",
    difficulty: "intermediate",
    topic: "Drawing Information"
  },
  {
    id: 57,
    question: "What should be done if materials delivered to site don't match the specification?",
    options: [
      "Use them anyway",
      "Report the discrepancy and obtain correct materials",
      "Modify the installation to suit",
      "Ignore the specification"
    ],
    correctAnswer: 1,
    explanation: "Any discrepancy between delivered materials and specification should be reported, and correct materials obtained before proceeding.",
    section: "4.1.3",
    difficulty: "basic",
    topic: "Material Compliance"
  },
  {
    id: 58,
    question: "What is the purpose of a toolbox talk before starting work?",
    options: [
      "To discuss tool maintenance",
      "To brief the team on safety hazards and work procedures",
      "To check tool inventory",
      "To plan lunch breaks"
    ],
    correctAnswer: 1,
    explanation: "A toolbox talk briefs the team on safety hazards, work procedures, and any specific risks associated with the day's activities.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Toolbox Talks"
  },
  {
    id: 59,
    question: "When measuring for socket outlet positions, what reference point should be used?",
    options: [
      "The ceiling",
      "Finished floor level",
      "The nearest wall",
      "Any convenient point"
    ],
    correctAnswer: 1,
    explanation: "Socket outlet positions should be measured from finished floor level to ensure consistent heights and compliance with regulations.",
    section: "4.2.1",
    difficulty: "basic",
    topic: "Reference Points"
  },
  {
    id: 60,
    question: "What is the standard height for socket outlets in domestic installations?",
    options: [
      "150mm from finished floor level",
      "450mm from finished floor level",
      "750mm from finished floor level",
      "1200mm from finished floor level"
    ],
    correctAnswer: 1,
    explanation: "The standard height for socket outlets in domestic installations is 450mm from finished floor level for accessibility and safety.",
    section: "4.2.1",
    difficulty: "basic",
    topic: "Socket Heights"
  },
  {
    id: 61,
    question: "What tool would be most appropriate for marking out positions on concrete walls?",
    options: [
      "Pencil",
      "Chalk or marker pen",
      "Crayon",
      "Felt tip pen"
    ],
    correctAnswer: 1,
    explanation: "Chalk or marker pen is most appropriate for marking concrete walls as it provides good visibility and can be easily removed after installation.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Marking Tools"
  },
  {
    id: 62,
    question: "When setting out cable tray runs, what must be considered for thermal movement?",
    options: [
      "Nothing special needed",
      "Expansion joints and flexible supports",
      "Only extra supports",
      "Tighter fixing spacing"
    ],
    correctAnswer: 1,
    explanation: "Cable tray runs require expansion joints and flexible supports to accommodate thermal movement and prevent stress damage.",
    section: "4.2.4",
    difficulty: "advanced",
    topic: "Thermal Movement"
  },
  {
    id: 63,
    question: "What is the purpose of using a laser level for installation work?",
    options: [
      "To impress clients",
      "To ensure accurate horizontal and vertical alignment over long distances",
      "To reduce material costs",
      "To speed up drilling"
    ],
    correctAnswer: 1,
    explanation: "Laser levels ensure accurate horizontal and vertical alignment over long distances, improving installation quality and efficiency.",
    section: "4.2.2",
    difficulty: "intermediate",
    topic: "Laser Levels"
  },
  {
    id: 64,
    question: "When bending conduit, what should be done to prevent the internal diameter from being reduced?",
    options: [
      "Bend as quickly as possible",
      "Use proper bending tools and follow minimum bend radius",
      "Apply maximum force",
      "Heat the conduit first"
    ],
    correctAnswer: 1,
    explanation: "Using proper bending tools and following minimum bend radius requirements prevents reduction of internal diameter and maintains cable pulling capability.",
    section: "4.3.1",
    difficulty: "intermediate",
    topic: "Bend Quality"
  },
  {
    id: 65,
    question: "What is the typical minimum bend radius for steel conduit?",
    options: [
      "2.5 times the diameter",
      "3.5 times the diameter",
      "4.5 times the diameter",
      "6 times the diameter"
    ],
    correctAnswer: 1,
    explanation: "The typical minimum bend radius for steel conduit is 3.5 times the external diameter to prevent damage and maintain structural integrity.",
    section: "4.3.2",
    difficulty: "intermediate",
    topic: "Steel Conduit Bending"
  },
  {
    id: 66,
    question: "When would you use a hydraulic bender for conduit work?",
    options: [
      "For small diameter conduit only",
      "For large diameter or heavy-wall conduit",
      "Never, they are not suitable",
      "Only for PVC conduit"
    ],
    correctAnswer: 1,
    explanation: "Hydraulic benders are used for large diameter or heavy-wall conduit where manual bending tools would be insufficient.",
    section: "4.3.3",
    difficulty: "advanced",
    topic: "Hydraulic Benders"
  },
  {
    id: 67,
    question: "What should be done to conduit ends after cutting?",
    options: [
      "Leave them as cut",
      "File or ream to remove sharp edges",
      "Paint the ends",
      "Tape the ends"
    ],
    correctAnswer: 1,
    explanation: "Conduit ends should be filed or reamed after cutting to remove sharp edges that could damage cable insulation during installation.",
    section: "4.3.4",
    difficulty: "basic",
    topic: "Conduit Preparation"
  },
  {
    id: 68,
    question: "What is the purpose of using a former when bending conduit?",
    options: [
      "To speed up the work",
      "To achieve consistent, accurate bends without damage",
      "To reduce material costs",
      "To impress supervisors"
    ],
    correctAnswer: 1,
    explanation: "A former ensures consistent, accurate bends are achieved without damaging the conduit or reducing its internal diameter.",
    section: "4.3.3",
    difficulty: "basic",
    topic: "Bending Formers"
  },
  {
    id: 69,
    question: "What is the maximum recommended spacing for cable tray supports?",
    options: [
      "1m",
      "1.5m",
      "2m",
      "3m"
    ],
    correctAnswer: 1,
    explanation: "Cable tray supports should typically be spaced at maximum 1.5m intervals to prevent excessive deflection under load.",
    section: "4.4.1",
    difficulty: "intermediate",
    topic: "Tray Support Spacing"
  },
  {
    id: 70,
    question: "Which type of fixing is most suitable for hollow walls?",
    options: [
      "Plastic plugs",
      "Cavity fixings or toggle bolts",
      "Screws only",
      "Adhesive"
    ],
    correctAnswer: 1,
    explanation: "Cavity fixings or toggle bolts are most suitable for hollow walls as they spread the load behind the wall surface.",
    section: "4.4.2",
    difficulty: "intermediate",
    topic: "Hollow Wall Fixings"
  },
  {
    id: 71,
    question: "What is the purpose of using fire-rated cable trunking?",
    options: [
      "To reduce costs",
      "To maintain circuit integrity during a fire",
      "To improve appearance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Fire-rated cable trunking maintains circuit integrity during a fire, ensuring essential services continue to operate for evacuation.",
    section: "4.4.3",
    difficulty: "advanced",
    topic: "Fire-Rated Systems"
  },
  {
    id: 72,
    question: "When installing cables in trunking, what should be avoided?",
    options: [
      "Using cable ties",
      "Overfilling and creating sharp bends",
      "Labeling cables",
      "Using different cable types"
    ],
    correctAnswer: 1,
    explanation: "Overfilling trunking and creating sharp bends should be avoided as this can damage cables and make future maintenance difficult.",
    section: "4.4.6",
    difficulty: "basic",
    topic: "Cable Installation"
  },
  {
    id: 73,
    question: "What is the purpose of using draw wire in conduit installation?",
    options: [
      "To strengthen the conduit",
      "To assist with cable pulling during installation",
      "To improve appearance",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Draw wire is installed in conduit to assist with cable pulling, making it easier to install cables after the conduit system is complete.",
    section: "4.4.8",
    difficulty: "basic",
    topic: "Draw Wire"
  },
  {
    id: 74,
    question: "What should be considered when routing cables near heat sources?",
    options: [
      "Nothing special needed",
      "Maintain adequate clearance or use heat-resistant cables",
      "Only the installation speed",
      "Only the cost"
    ],
    correctAnswer: 1,
    explanation: "When routing cables near heat sources, maintain adequate clearance or use heat-resistant cables to prevent insulation damage.",
    section: "4.4.4",
    difficulty: "intermediate",
    topic: "Heat Considerations"
  },
  {
    id: 75,
    question: "What is the correct method for connecting cables to terminals?",
    options: [
      "Twist wires together",
      "Ensure clean, tight connections with proper contact area",
      "Use tape to secure",
      "Solder all connections"
    ],
    correctAnswer: 1,
    explanation: "Cables should be connected to terminals with clean, tight connections ensuring proper contact area for reliable electrical connection.",
    section: "4.5.1",
    difficulty: "basic",
    topic: "Terminal Connections"
  },
  {
    id: 76,
    question: "When should crimp connectors be used instead of screw terminals?",
    options: [
      "Never",
      "For stranded conductors or where vibration is present",
      "Only for solid conductors",
      "Only in dry locations"
    ],
    correctAnswer: 1,
    explanation: "Crimp connectors are preferred for stranded conductors or where vibration is present as they provide more reliable connections.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Crimp Connectors"
  },
  {
    id: 77,
    question: "What tool is used to ensure correct crimping of cable lugs?",
    options: [
      "Pliers",
      "Proper crimping tool with correct dies",
      "Hammer",
      "Screwdriver"
    ],
    correctAnswer: 1,
    explanation: "A proper crimping tool with correct dies ensures reliable crimped connections that meet electrical and mechanical requirements.",
    section: "4.5.2",
    difficulty: "basic",
    topic: "Crimping Tools"
  },
  {
    id: 78,
    question: "What is the purpose of using cable gland plates?",
    options: [
      "Decoration only",
      "To provide multiple cable entries while maintaining enclosure integrity",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Cable gland plates provide multiple cable entries while maintaining the enclosure's IP rating and structural integrity.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "Gland Plates"
  },
  {
    id: 79,
    question: "When terminating armoured cables, what must be done with the armour?",
    options: [
      "Cut it off completely",
      "Connect it to earth and provide mechanical protection",
      "Leave it unconnected",
      "Paint it for protection"
    ],
    correctAnswer: 1,
    explanation: "Armoured cable armour must be connected to earth for safety and provided with mechanical protection at the termination point.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "Armoured Cable Termination"
  },
  {
    id: 80,
    question: "What does IP54 rating indicate for an electrical enclosure?",
    options: [
      "No protection",
      "Limited dust ingress protection and splash water protection",
      "Complete dust protection and submersion protection",
      "Only mechanical protection"
    ],
    correctAnswer: 1,
    explanation: "IP54 indicates limited dust ingress protection (IP5X) and protection against splashing water from any direction (IPX4).",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "IP54 Rating"
  },
  {
    id: 81,
    question: "What is the first step in the testing sequence for a new installation?",
    options: [
      "Insulation resistance test",
      "Visual inspection",
      "Polarity test",
      "Earth fault loop impedance test"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection is the first step in testing sequence to identify obvious faults before applying test voltages.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Testing Sequence"
  },
  {
    id: 82,
    question: "What voltage is typically used for insulation resistance testing?",
    options: [
      "12V DC",
      "500V DC",
      "230V AC",
      "1000V AC"
    ],
    correctAnswer: 1,
    explanation: "500V DC is typically used for insulation resistance testing on installations up to 500V to stress test the insulation.",
    section: "4.6.4",
    difficulty: "intermediate",
    topic: "Test Voltages"
  },
  {
    id: 83,
    question: "What should be disconnected before conducting insulation resistance tests?",
    options: [
      "Nothing needs disconnecting",
      "Electronic equipment and surge protection devices",
      "Only light fittings",
      "Only socket outlets"
    ],
    correctAnswer: 1,
    explanation: "Electronic equipment and surge protection devices should be disconnected before insulation resistance testing to prevent damage.",
    section: "4.6.4",
    difficulty: "intermediate",
    topic: "Test Preparation"
  },
  {
    id: 84,
    question: "What does a low insulation resistance reading indicate?",
    options: [
      "Perfect installation",
      "Possible insulation breakdown or moisture ingress",
      "High quality cables",
      "Correct installation"
    ],
    correctAnswer: 1,
    explanation: "Low insulation resistance readings indicate possible insulation breakdown, moisture ingress, or contamination requiring investigation.",
    section: "4.6.4",
    difficulty: "intermediate",
    topic: "Test Interpretation"
  },
  {
    id: 85,
    question: "What is the purpose of earth fault loop impedance testing?",
    options: [
      "To test cable length",
      "To verify protective device operation under fault conditions",
      "To check cable colours",
      "To measure voltage"
    ],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance testing verifies that protective devices will operate quickly enough under earth fault conditions.",
    section: "4.6.5",
    difficulty: "advanced",
    topic: "Earth Fault Loop Testing"
  },
  {
    id: 86,
    question: "What PPE should be worn when using angle grinders?",
    options: [
      "Just safety glasses",
      "Safety glasses, face shield, gloves, and hearing protection",
      "Only gloves",
      "Only hearing protection"
    ],
    correctAnswer: 1,
    explanation: "Angle grinders require comprehensive PPE including safety glasses, face shield, gloves, and hearing protection due to multiple hazards.",
    section: "4.7.1",
    difficulty: "basic",
    topic: "Angle Grinder Safety"
  },
  {
    id: 87,
    question: "What is the maximum recommended extension lead length for power tools?",
    options: [
      "10m",
      "25m",
      "50m",
      "100m"
    ],
    correctAnswer: 1,
    explanation: "Extension leads for power tools should typically not exceed 25m to prevent voltage drop and maintain tool performance.",
    section: "4.7.2",
    difficulty: "intermediate",
    topic: "Extension Lead Limits"
  },
  {
    id: 88,
    question: "What should be done before using a ladder?",
    options: [
      "Just start climbing",
      "Inspect for damage and ensure stable positioning",
      "Only check the height",
      "Only check the weight limit"
    ],
    correctAnswer: 1,
    explanation: "Ladders should be inspected for damage and positioned stably before use to prevent accidents and ensure safe working.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Ladder Inspection"
  },
  {
    id: 89,
    question: "What is the three-point contact rule for ladder use?",
    options: [
      "Use three ladders",
      "Maintain three points of contact (two hands and one foot or two feet and one hand)",
      "Check three times before climbing",
      "Have three people present"
    ],
    correctAnswer: 1,
    explanation: "The three-point contact rule means maintaining three points of contact with the ladder at all times for stability and safety.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Ladder Safety Rules"
  },
  {
    id: 90,
    question: "What should be done with waste materials during installation?",
    options: [
      "Leave them on site",
      "Dispose of properly according to waste regulations",
      "Burn them on site",
      "Bury them on site"
    ],
    correctAnswer: 1,
    explanation: "Waste materials should be disposed of properly according to waste regulations, including separation of different material types.",
    section: "4.7.4",
    difficulty: "basic",
    topic: "Waste Disposal"
  },
  {
    id: 91,
    question: "What information should be included in a risk assessment for electrical installation work?",
    options: [
      "Only the work location",
      "Hazards, risks, control measures, and responsible persons",
      "Only the tools required",
      "Only the time required"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should include identification of hazards, assessment of risks, control measures, and designation of responsible persons.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Risk Assessment Content"
  },
  {
    id: 92,
    question: "When should a risk assessment be reviewed?",
    options: [
      "Never, once done it's permanent",
      "When conditions change or periodically",
      "Only at the end of the job",
      "Only if an accident occurs"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be reviewed when conditions change, periodically, or if new hazards are identified during work.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Risk Assessment Review"
  },
  {
    id: 93,
    question: "What should be done if installation drawings are unclear or contain errors?",
    options: [
      "Guess what was intended",
      "Seek clarification from the designer or client",
      "Ignore the drawings",
      "Make your own interpretation"
    ],
    correctAnswer: 1,
    explanation: "If drawings are unclear or contain errors, clarification should be sought from the designer or client before proceeding.",
    section: "4.1.2",
    difficulty: "basic",
    topic: "Drawing Clarification"
  },
  {
    id: 94,
    question: "What is the purpose of keeping a site diary during installation work?",
    options: [
      "Personal entertainment",
      "Record progress, issues, and decisions for future reference",
      "To impress clients",
      "To reduce paperwork"
    ],
    correctAnswer: 1,
    explanation: "A site diary records progress, issues, decisions, and changes for future reference and potential dispute resolution.",
    section: "4.1.3",
    difficulty: "intermediate",
    topic: "Site Documentation"
  },
  {
    id: 95,
    question: "What should be considered when planning work sequences?",
    options: [
      "Only personal convenience",
      "Safety, efficiency, and coordination with other trades",
      "Only speed of completion",
      "Only material costs"
    ],
    correctAnswer: 1,
    explanation: "Work sequences should consider safety requirements, efficiency, and coordination with other trades to avoid conflicts and delays.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Work Planning"
  },
  {
    id: 96,
    question: "What is the standard height for light switches in domestic installations?",
    options: [
      "900mm from finished floor level",
      "1200mm from finished floor level",
      "1500mm from finished floor level",
      "1800mm from finished floor level"
    ],
    correctAnswer: 1,
    explanation: "The standard height for light switches in domestic installations is 1200mm from finished floor level for accessibility.",
    section: "4.2.1",
    difficulty: "basic",
    topic: "Switch Heights"
  },
  {
    id: 97,
    question: "When marking out positions, what should be used as a datum line?",
    options: [
      "Any convenient line",
      "A level horizontal or vertical reference line",
      "The nearest wall edge",
      "A diagonal line"
    ],
    correctAnswer: 1,
    explanation: "A level horizontal or vertical reference line should be used as a datum to ensure all positions are accurately aligned.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Datum Lines"
  },
  {
    id: 98,
    question: "What tool would be most appropriate for measuring long distances accurately?",
    options: [
      "Ruler",
      "Steel tape measure or laser measure",
      "String line",
      "Folding rule"
    ],
    correctAnswer: 1,
    explanation: "Steel tape measures or laser measures provide the most accurate measurements over long distances for installation work.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Measuring Tools"
  },
  {
    id: 99,
    question: "What should be done before drilling into any surface?",
    options: [
      "Start drilling immediately",
      "Check for hidden services and structural elements",
      "Only check the drill bit",
      "Only check the drill speed"
    ],
    correctAnswer: 1,
    explanation: "Before drilling, check for hidden services (cables, pipes, gas) and structural elements to prevent damage and safety hazards.",
    section: "4.2.5",
    difficulty: "basic",
    topic: "Pre-drilling Checks"
  },
  {
    id: 100,
    question: "What is the purpose of using a template when marking out multiple identical positions?",
    options: [
      "To save money",
      "To ensure consistency and accuracy across multiple installations",
      "To impress clients",
      "To reduce material usage"
    ],
    correctAnswer: 1,
    explanation: "Templates ensure consistency and accuracy when marking out multiple identical positions, improving quality and efficiency.",
    section: "4.2.3",
    difficulty: "intermediate",
    topic: "Templates"
  },
  {
    id: 101,
    question: "What happens if conduit is bent with too small a radius?",
    options: [
      "Nothing problematic",
      "The conduit may kink or collapse, restricting cable installation",
      "It becomes stronger",
      "It looks better"
    ],
    correctAnswer: 1,
    explanation: "Bending conduit with too small a radius can cause kinking or collapse, restricting the internal diameter and preventing cable installation.",
    section: "4.3.1",
    difficulty: "basic",
    topic: "Bend Radius Effects"
  },
  {
    id: 102,
    question: "When bending PVC conduit, what might be required in cold weather?",
    options: [
      "Nothing special",
      "Gentle heating to make the material more flexible",
      "Extra force",
      "Different tools"
    ],
    correctAnswer: 1,
    explanation: "In cold weather, PVC conduit may need gentle heating to make it more flexible and prevent cracking during bending.",
    section: "4.3.2",
    difficulty: "intermediate",
    topic: "Cold Weather Bending"
  },
  {
    id: 103,
    question: "What is the advantage of using a bending machine over manual bending?",
    options: [
      "It's faster only",
      "Provides consistent, accurate bends with less physical effort",
      "It's cheaper",
      "It uses less material"
    ],
    correctAnswer: 1,
    explanation: "Bending machines provide consistent, accurate bends with less physical effort and better quality results than manual bending.",
    section: "4.3.3",
    difficulty: "basic",
    topic: "Machine Bending Advantages"
  },
  {
    id: 104,
    question: "What should be done to prevent conduit from rotating during bending?",
    options: [
      "Apply more force",
      "Use proper clamping or holding techniques",
      "Bend faster",
      "Use lubricant"
    ],
    correctAnswer: 1,
    explanation: "Proper clamping or holding techniques prevent conduit rotation during bending, ensuring accurate bend angles and positions.",
    section: "4.3.4",
    difficulty: "intermediate",
    topic: "Bend Control"
  },
  {
    id: 105,
    question: "When making multiple bends in conduit, what should be considered?",
    options: [
      "Only the final position",
      "The sequence of bends and cumulative effects on cable pulling",
      "Only the appearance",
      "Only the time taken"
    ],
    correctAnswer: 1,
    explanation: "When making multiple bends, consider the sequence and cumulative effects on cable pulling capability and installation difficulty.",
    section: "4.3.5",
    difficulty: "advanced",
    topic: "Multiple Bends"
  },
  {
    id: 106,
    question: "What is the typical maximum spacing for trunking supports on vertical runs?",
    options: [
      "0.5m",
      "1m",
      "2m",
      "3m"
    ],
    correctAnswer: 1,
    explanation: "Vertical trunking runs should typically be supported at maximum 1-metre intervals to prevent sagging and maintain alignment.",
    section: "4.4.1",
    difficulty: "intermediate",
    topic: "Vertical Support Spacing"
  },
  {
    id: 107,
    question: "Which fixing method provides the strongest connection to masonry?",
    options: [
      "Adhesive pads",
      "Chemical anchors or expansion bolts",
      "Plastic plugs",
      "Self-tapping screws"
    ],
    correctAnswer: 1,
    explanation: "Chemical anchors or expansion bolts provide the strongest connection to masonry for heavy-duty applications.",
    section: "4.4.2",
    difficulty: "advanced",
    topic: "Heavy-Duty Fixings"
  },
  {
    id: 108,
    question: "What is the purpose of using different coloured cables in installations?",
    options: [
      "Decoration only",
      "Identification of different circuits and functions",
      "To use up stock",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Different coloured cables help identify different circuits and functions, improving safety and maintenance efficiency.",
    section: "4.4.3",
    difficulty: "basic",
    topic: "Cable Identification"
  },
  {
    id: 109,
    question: "When installing cable tray in corrosive environments, what should be considered?",
    options: [
      "Nothing special needed",
      "Use appropriate protective coatings or materials",
      "Only the installation speed",
      "Only the cost"
    ],
    correctAnswer: 1,
    explanation: "In corrosive environments, cable tray requires appropriate protective coatings or corrosion-resistant materials for longevity.",
    section: "4.4.7",
    difficulty: "intermediate",
    topic: "Corrosion Protection"
  },
  {
    id: 110,
    question: "What is the purpose of using cable markers or labels?",
    options: [
      "Decoration only",
      "Circuit identification for maintenance and safety",
      "To increase costs",
      "To slow down installation"
    ],
    correctAnswer: 1,
    explanation: "Cable markers or labels provide circuit identification essential for maintenance, troubleshooting, and safety during future work.",
    section: "4.4.9",
    difficulty: "basic",
    topic: "Cable Labeling"
  },
  {
    id: 111,
    question: "What is the correct procedure for stripping multicore cables?",
    options: [
      "Strip all cores to the same length",
      "Strip outer sheath first, then individual cores to required lengths",
      "Don't strip the outer sheath",
      "Strip cores before removing outer sheath"
    ],
    correctAnswer: 1,
    explanation: "Strip the outer sheath first to expose individual cores, then strip each core to the required length for neat termination.",
    section: "4.5.1",
    difficulty: "basic",
    topic: "Multicore Stripping"
  },
  {
    id: 112,
    question: "When should heat-shrink tubing be used on connections?",
    options: [
      "Never",
      "For additional insulation and environmental protection",
      "Only on high-voltage connections",
      "Only in dry locations"
    ],
    correctAnswer: 1,
    explanation: "Heat-shrink tubing provides additional insulation and environmental protection for connections in demanding applications.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Heat-Shrink Protection"
  },
  {
    id: 113,
    question: "What is the purpose of using cable boots on gland entries?",
    options: [
      "Decoration only",
      "Additional strain relief and environmental sealing",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Cable boots provide additional strain relief and environmental sealing at gland entries, improving reliability and longevity.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "Cable Boots"
  },
  {
    id: 114,
    question: "When terminating flexible cables, what additional consideration is required?",
    options: [
      "Nothing special",
      "Extra strain relief due to cable flexibility",
      "Only the connection method",
      "Only the cable length"
    ],
    correctAnswer: 1,
    explanation: "Flexible cables require extra strain relief at terminations due to their flexibility and tendency to move under stress.",
    section: "4.5.4",
    difficulty: "intermediate",
    topic: "Flexible Cable Termination"
  },
  {
    id: 115,
    question: "What does IP67 rating indicate for an electrical enclosure?",
    options: [
      "Basic protection only",
      "Dust-tight and protected against temporary immersion",
      "No protection",
      "Only mechanical protection"
    ],
    correctAnswer: 1,
    explanation: "IP67 indicates the enclosure is dust-tight (IP6X) and protected against temporary immersion in water (IPX7).",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "IP67 Rating"
  },
  {
    id: 116,
    question: "What should be checked during visual inspection of an installation?",
    options: [
      "Only cable colours",
      "Connections, support, protection, and compliance with regulations",
      "Only the tools used",
      "Only the installation time"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should check connections, support systems, protection measures, and overall compliance with regulations.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Visual Inspection"
  },
  {
    id: 117,
    question: "What is the purpose of RCD testing?",
    options: [
      "To check cable length",
      "To verify RCD operates within specified time limits",
      "To measure voltage",
      "To check insulation"
    ],
    correctAnswer: 1,
    explanation: "RCD testing verifies that the device operates within specified time limits to provide effective protection against electric shock.",
    section: "4.6.5",
    difficulty: "intermediate",
    topic: "RCD Testing"
  },
  {
    id: 118,
    question: "What test instrument is used for measuring earth fault loop impedance?",
    options: [
      "Multimeter",
      "Loop impedance tester",
      "Insulation tester",
      "Continuity tester"
    ],
    correctAnswer: 1,
    explanation: "A loop impedance tester is specifically designed to measure earth fault loop impedance safely and accurately.",
    section: "4.6.5",
    difficulty: "basic",
    topic: "Test Instruments"
  },
  {
    id: 119,
    question: "What should be done if test results are unsatisfactory?",
    options: [
      "Ignore the results",
      "Investigate, rectify faults, and retest",
      "Change the test method",
      "Reduce test standards"
    ],
    correctAnswer: 1,
    explanation: "Unsatisfactory test results require investigation to identify faults, rectification of problems, and retesting to confirm compliance.",
    section: "4.6.6",
    difficulty: "basic",
    topic: "Test Result Actions"
  },
  {
    id: 120,
    question: "What documentation should accompany completed test results?",
    options: [
      "Nothing required",
      "Installation certificate and schedule of test results",
      "Only a completion note",
      "Only photographs"
    ],
    correctAnswer: 1,
    explanation: "Completed installations require an installation certificate and schedule of test results as evidence of compliance.",
    section: "4.6.6",
    difficulty: "basic",
    topic: "Test Documentation"
  },
  {
    id: 121,
    question: "What should be worn when working in confined spaces?",
    options: [
      "Normal work clothes",
      "Appropriate PPE including breathing apparatus if required",
      "Only hard hat",
      "Only high-vis vest"
    ],
    correctAnswer: 1,
    explanation: "Confined space work requires appropriate PPE including breathing apparatus if atmospheric hazards are present.",
    section: "4.7.1",
    difficulty: "advanced",
    topic: "Confined Space PPE"
  },
  {
    id: 122,
    question: "What is the purpose of using 110V tools on construction sites?",
    options: [
      "They are cheaper",
      "Reduced risk of fatal electric shock",
      "They are more powerful",
      "They are lighter"
    ],
    correctAnswer: 1,
    explanation: "110V tools reduce the risk of fatal electric shock on construction sites where conditions may be harsh and wet.",
    section: "4.7.2",
    difficulty: "basic",
    topic: "110V Tool Safety"
  },
  {
    id: 123,
    question: "What should be done if a ladder shows signs of damage?",
    options: [
      "Use it carefully",
      "Remove from service and arrange repair or replacement",
      "Tape the damage",
      "Ignore minor damage"
    ],
    correctAnswer: 1,
    explanation: "Damaged ladders should be removed from service immediately and repaired or replaced to prevent accidents.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Ladder Maintenance"
  },
  {
    id: 124,
    question: "What is the purpose of using safety harnesses when working at height?",
    options: [
      "To look professional",
      "To prevent falls or arrest falls safely",
      "To carry tools",
      "To reduce fatigue"
    ],
    correctAnswer: 1,
    explanation: "Safety harnesses prevent falls or arrest falls safely when working at height, reducing the risk of serious injury.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Fall Protection"
  },
  {
    id: 125,
    question: "What should be done with electrical waste materials?",
    options: [
      "Put in general waste",
      "Separate and dispose of according to WEEE regulations",
      "Burn on site",
      "Bury on site"
    ],
    correctAnswer: 1,
    explanation: "Electrical waste materials should be separated and disposed of according to WEEE (Waste Electrical and Electronic Equipment) regulations.",
    section: "4.7.4",
    difficulty: "intermediate",
    topic: "WEEE Disposal"
  },
  {
    id: 126,
    question: "What is the purpose of conducting a pre-start safety briefing?",
    options: [
      "To waste time",
      "To ensure all team members understand hazards and safety procedures",
      "To impress clients",
      "To reduce insurance costs"
    ],
    correctAnswer: 1,
    explanation: "Pre-start safety briefings ensure all team members understand the hazards and safety procedures for the day's work.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Safety Briefings"
  },
  {
    id: 127,
    question: "When should emergency procedures be reviewed on site?",
    options: [
      "Never",
      "At the start of work and when conditions change",
      "Only at the end of the job",
      "Only if an emergency occurs"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures should be reviewed at the start of work and whenever site conditions change to ensure effectiveness.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Emergency Procedures"
  },
  {
    id: 128,
    question: "What should be done if site conditions differ from those shown on drawings?",
    options: [
      "Proceed as planned",
      "Stop work and seek clarification from the designer",
      "Make your own modifications",
      "Ignore the differences"
    ],
    correctAnswer: 1,
    explanation: "If site conditions differ from drawings, work should stop and clarification sought from the designer before proceeding.",
    section: "4.1.2",
    difficulty: "basic",
    topic: "Site Variations"
  },
  {
    id: 129,
    question: "What is the purpose of material delivery schedules?",
    options: [
      "To impress suppliers",
      "To ensure materials arrive when needed and in correct quantities",
      "To reduce paperwork",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Material delivery schedules ensure materials arrive when needed and in correct quantities, avoiding delays and storage issues.",
    section: "4.1.3",
    difficulty: "intermediate",
    topic: "Delivery Scheduling"
  },
  {
    id: 130,
    question: "What should be considered when planning temporary electrical supplies?",
    options: [
      "Only the cost",
      "Safety, capacity, and protection requirements",
      "Only the installation speed",
      "Only the appearance"
    ],
    correctAnswer: 1,
    explanation: "Temporary electrical supplies require consideration of safety, capacity, and protection requirements to ensure safe operation.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Temporary Supplies"
  },
  {
    id: 131,
    question: "What is the purpose of using a water level for long-distance leveling?",
    options: [
      "It's cheaper than other methods",
      "Provides accurate level reference over long distances and around obstacles",
      "It's faster to use",
      "It looks more professional"
    ],
    correctAnswer: 1,
    explanation: "Water levels provide accurate level reference over long distances and around obstacles where spirit levels cannot be used.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "Water Levels"
  },
  {
    id: 132,
    question: "When setting out cable routes, what should be avoided?",
    options: [
      "Straight runs",
      "Sharp bends and potential damage points",
      "Accessible routes",
      "Protected routes"
    ],
    correctAnswer: 1,
    explanation: "Cable routes should avoid sharp bends and potential damage points to prevent cable damage and installation difficulties.",
    section: "4.2.4",
    difficulty: "basic",
    topic: "Route Avoidance"
  },
  {
    id: 133,
    question: "What tool would be most appropriate for marking positions on metal surfaces?",
    options: [
      "Pencil",
      "Scriber or marker pen",
      "Chalk",
      "Crayon"
    ],
    correctAnswer: 1,
    explanation: "A scriber or marker pen is most appropriate for marking metal surfaces as it provides clear, permanent marks.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Metal Marking"
  },
  {
    id: 134,
    question: "What should be done when setting out positions in areas with limited access?",
    options: [
      "Guess the positions",
      "Use alternative measuring methods and reference points",
      "Skip those positions",
      "Install elsewhere"
    ],
    correctAnswer: 1,
    explanation: "In areas with limited access, use alternative measuring methods and reference points to maintain accuracy.",
    section: "4.2.3",
    difficulty: "intermediate",
    topic: "Limited Access Measuring"
  },
  {
    id: 135,
    question: "What is the purpose of using a plumb line in installation work?",
    options: [
      "To measure distances",
      "To establish true vertical reference lines",
      "To mark horizontal lines",
      "To measure angles"
    ],
    correctAnswer: 1,
    explanation: "A plumb line establishes true vertical reference lines for accurate positioning of vertical installations.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Plumb Lines"
  },
  {
    id: 136,
    question: "What factor determines the minimum bend radius for different conduit materials?",
    options: [
      "Installation speed",
      "Material properties and wall thickness",
      "Cost considerations",
      "Appearance requirements"
    ],
    correctAnswer: 1,
    explanation: "Minimum bend radius is determined by material properties and wall thickness to prevent damage and maintain structural integrity.",
    section: "4.3.1",
    difficulty: "intermediate",
    topic: "Bend Radius Factors"
  },
  {
    id: 137,
    question: "When bending conduit for a 90-degree change of direction, what should be considered?",
    options: [
      "Only the bend angle",
      "Bend radius, conduit length, and cable pulling requirements",
      "Only the appearance",
      "Only the installation time"
    ],
    correctAnswer: 1,
    explanation: "Consider bend radius, conduit length requirements, and cable pulling capability when making 90-degree bends.",
    section: "4.3.4",
    difficulty: "intermediate",
    topic: "90-Degree Bends"
  },
  {
    id: 138,
    question: "What is the advantage of using pre-formed bends over site-bent conduit?",
    options: [
      "They are cheaper",
      "Consistent quality and reduced installation time",
      "They look different",
      "They use less material"
    ],
    correctAnswer: 1,
    explanation: "Pre-formed bends provide consistent quality and reduce installation time compared to site bending operations.",
    section: "4.3.5",
    difficulty: "intermediate",
    topic: "Pre-formed Bends"
  },
  {
    id: 139,
    question: "What should be done to conduit after bending to ensure smooth cable pulling?",
    options: [
      "Nothing required",
      "Check internal diameter and remove any restrictions",
      "Paint the outside",
      "Apply lubricant to the outside"
    ],
    correctAnswer: 1,
    explanation: "After bending, check the internal diameter and remove any restrictions to ensure smooth cable pulling.",
    section: "4.3.4",
    difficulty: "basic",
    topic: "Post-Bend Checks"
  },
  {
    id: 140,
    question: "When would you use offset bends in conduit installation?",
    options: [
      "Never",
      "To navigate around obstacles while maintaining parallel runs",
      "Only for appearance",
      "Only to save material"
    ],
    correctAnswer: 1,
    explanation: "Offset bends are used to navigate around obstacles while maintaining parallel conduit runs and proper alignment.",
    section: "4.3.5",
    difficulty: "intermediate",
    topic: "Offset Bends"
  },
  {
    id: 141,
    question: "What is the purpose of using spring-loaded supports for cable tray?",
    options: [
      "To reduce costs",
      "To accommodate thermal movement and vibration",
      "To improve appearance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Spring-loaded supports accommodate thermal movement and vibration in cable tray installations, preventing stress damage.",
    section: "4.4.1",
    difficulty: "advanced",
    topic: "Spring Supports"
  },
  {
    id: 142,
    question: "Which type of fixing is most suitable for fixing to steel structures?",
    options: [
      "Plastic plugs",
      "Welded brackets or beam clamps",
      "Adhesive pads",
      "Self-tapping screws"
    ],
    correctAnswer: 1,
    explanation: "Welded brackets or beam clamps provide the most secure fixing method for steel structures in industrial installations.",
    section: "4.4.2",
    difficulty: "intermediate",
    topic: "Steel Structure Fixings"
  },
  {
    id: 143,
    question: "What is the purpose of using fire barriers in cable installations?",
    options: [
      "To improve appearance",
      "To prevent fire spread through cable routes",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Fire barriers prevent fire spread through cable routes, maintaining compartmentation and allowing safe evacuation.",
    section: "4.4.3",
    difficulty: "advanced",
    topic: "Fire Barriers"
  },
  {
    id: 144,
    question: "When installing cables in areas subject to mechanical damage, what protection should be provided?",
    options: [
      "No special protection needed",
      "Appropriate mechanical protection such as conduit or trunking",
      "Only cable ties",
      "Only labels"
    ],
    correctAnswer: 1,
    explanation: "Areas subject to mechanical damage require appropriate protection such as conduit, trunking, or impact-resistant covers.",
    section: "4.4.4",
    difficulty: "basic",
    topic: "Mechanical Protection"
  },
  {
    id: 145,
    question: "What is the purpose of using cable pulling socks?",
    options: [
      "To keep cables clean",
      "To distribute pulling forces evenly along the cable",
      "To identify cables",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Cable pulling socks distribute pulling forces evenly along the cable, preventing damage during installation.",
    section: "4.4.8",
    difficulty: "intermediate",
    topic: "Pulling Socks"
  },
  {
    id: 146,
    question: "What is the correct method for connecting solid conductors to terminals?",
    options: [
      "Twist the wire around the terminal",
      "Form a neat hook and ensure full contact with terminal",
      "Just push into the terminal",
      "Solder to the terminal"
    ],
    correctAnswer: 1,
    explanation: "Solid conductors should be formed into a neat hook ensuring full contact with the terminal for reliable connection.",
    section: "4.5.1",
    difficulty: "basic",
    topic: "Solid Conductor Termination"
  },
  {
    id: 147,
    question: "When should wire nuts be used instead of other connection methods?",
    options: [
      "Always",
      "For temporary connections or where frequent disconnection is required",
      "Never",
      "Only for high-voltage connections"
    ],
    correctAnswer: 1,
    explanation: "Wire nuts are suitable for temporary connections or where frequent disconnection is required, but not for permanent installations.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Wire Nuts"
  },
  {
    id: 148,
    question: "What is the purpose of using cable entry plates in enclosures?",
    options: [
      "Decoration only",
      "To provide multiple organized cable entries while maintaining IP rating",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Cable entry plates provide multiple organized cable entries while maintaining the enclosure's IP rating and appearance.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "Entry Plates"
  },
  {
    id: 149,
    question: "When terminating high-current cables, what additional consideration is required?",
    options: [
      "Nothing special",
      "Adequate terminal size and heat dissipation",
      "Only the cable length",
      "Only the connection method"
    ],
    correctAnswer: 1,
    explanation: "High-current cables require adequate terminal size and consideration of heat dissipation to prevent overheating.",
    section: "4.5.4",
    difficulty: "advanced",
    topic: "High-Current Termination"
  },
  {
    id: 150,
    question: "What does IP68 rating indicate for an electrical enclosure?",
    options: [
      "Basic protection only",
      "Dust-tight and protected against continuous immersion",
      "No protection",
      "Only splash protection"
    ],
    correctAnswer: 1,
    explanation: "IP68 indicates the enclosure is dust-tight (IP6X) and protected against continuous immersion in water (IPX8).",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "IP68 Rating"
  },
  {
    id: 151,
    question: "What should be included in the visual inspection checklist?",
    options: [
      "Only cable colours",
      "Connections, supports, protection, labeling, and general workmanship",
      "Only the installation time",
      "Only material costs"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should include connections, supports, protection, labeling, and general workmanship quality.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Inspection Checklist"
  },
  {
    id: 152,
    question: "What is the purpose of functional testing?",
    options: [
      "To check cable colours",
      "To verify that installed systems operate as intended",
      "To measure cable length",
      "To check material costs"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that installed systems operate as intended and meet the design requirements.",
    section: "4.6.5",
    difficulty: "basic",
    topic: "Functional Testing"
  },
  {
    id: 153,
    question: "When should periodic testing be carried out on installations?",
    options: [
      "Never",
      "At regular intervals as specified in regulations",
      "Only when faults occur",
      "Only when selling property"
    ],
    correctAnswer: 1,
    explanation: "Periodic testing should be carried out at regular intervals as specified in regulations to ensure continued safety.",
    section: "4.6.6",
    difficulty: "intermediate",
    topic: "Periodic Testing"
  },
  {
    id: 154,
    question: "What information should be recorded during testing?",
    options: [
      "Only pass/fail results",
      "Test values, instruments used, environmental conditions, and observations",
      "Only the date",
      "Only the tester's name"
    ],
    correctAnswer: 1,
    explanation: "Testing records should include test values, instruments used, environmental conditions, and any relevant observations.",
    section: "4.6.6",
    difficulty: "intermediate",
    topic: "Test Recording"
  },
  {
    id: 155,
    question: "What should be done if test instruments give inconsistent readings?",
    options: [
      "Use the best reading",
      "Check instrument calibration and prove on known values",
      "Ignore the inconsistency",
      "Average the readings"
    ],
    correctAnswer: 1,
    explanation: "Inconsistent readings require checking instrument calibration and proving on known values before continuing testing.",
    section: "4.6.1",
    difficulty: "intermediate",
    topic: "Instrument Reliability"
  },
  {
    id: 156,
    question: "What respiratory protection might be required when working in dusty environments?",
    options: [
      "None required",
      "Dust masks or respirators appropriate to the dust type",
      "Only safety glasses",
      "Only hard hat"
    ],
    correctAnswer: 1,
    explanation: "Dusty environments require dust masks or respirators appropriate to the specific type of dust present.",
    section: "4.7.1",
    difficulty: "intermediate",
    topic: "Respiratory Protection"
  },
  {
    id: 157,
    question: "What is the purpose of using double-insulated power tools?",
    options: [
      "They are cheaper",
      "Additional protection against electric shock without requiring earthing",
      "They are more powerful",
      "They are lighter"
    ],
    correctAnswer: 1,
    explanation: "Double-insulated tools provide additional protection against electric shock without requiring an earth connection.",
    section: "4.7.2",
    difficulty: "basic",
    topic: "Double Insulation"
  },
  {
    id: 158,
    question: "What should be done before using mobile elevated work platforms (MEWPs)?",
    options: [
      "Just start using them",
      "Ensure operators are trained and equipment is inspected",
      "Only check the fuel level",
      "Only check the height"
    ],
    correctAnswer: 1,
    explanation: "MEWPs require trained operators and thorough equipment inspection before use to ensure safe operation.",
    section: "4.7.3",
    difficulty: "advanced",
    topic: "MEWP Safety"
  },
  {
    id: 159,
    question: "What is the purpose of using safety nets when working at height?",
    options: [
      "To catch tools",
      "To provide collective fall protection for multiple workers",
      "To improve appearance",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "Safety nets provide collective fall protection for multiple workers, reducing the risk of serious injury from falls.",
    section: "4.7.3",
    difficulty: "intermediate",
    topic: "Safety Nets"
  },
  {
    id: 160,
    question: "What should be done with hazardous waste materials?",
    options: [
      "Put in general waste",
      "Identify, segregate, and dispose of according to hazardous waste regulations",
      "Burn on site",
      "Dilute and pour away"
    ],
    correctAnswer: 1,
    explanation: "Hazardous waste must be identified, segregated, and disposed of according to specific hazardous waste regulations.",
    section: "4.7.4",
    difficulty: "intermediate",
    topic: "Hazardous Waste"
  },
  {
    id: 161,
    question: "What is the purpose of conducting regular safety inspections during work?",
    options: [
      "To find fault with workers",
      "To identify and control emerging hazards",
      "To slow down work",
      "To increase costs"
    ],
    correctAnswer: 1,
    explanation: "Regular safety inspections identify and control emerging hazards before they can cause accidents or injuries.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Safety Inspections"
  },
  {
    id: 162,
    question: "When should the original risk assessment be updated?",
    options: [
      "Never",
      "When work methods change or new hazards are identified",
      "Only at project completion",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments should be updated when work methods change or new hazards are identified during the project.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Risk Assessment Updates"
  },
  {
    id: 163,
    question: "What should be done if installation drawings contain conflicting information?",
    options: [
      "Choose the easiest option",
      "Seek clarification from the design team before proceeding",
      "Ignore the conflict",
      "Make your own decision"
    ],
    correctAnswer: 1,
    explanation: "Conflicting information in drawings requires clarification from the design team before work can proceed safely.",
    section: "4.1.2",
    difficulty: "basic",
    topic: "Drawing Conflicts"
  },
  {
    id: 164,
    question: "What is the purpose of material storage plans?",
    options: [
      "To impress clients",
      "To ensure materials are stored safely and remain in good condition",
      "To reduce paperwork",
      "To speed up delivery"
    ],
    correctAnswer: 1,
    explanation: "Material storage plans ensure materials are stored safely, remain in good condition, and are easily accessible when needed.",
    section: "4.1.3",
    difficulty: "intermediate",
    topic: "Storage Planning"
  },
  {
    id: 165,
    question: "What should be considered when coordinating with other trades?",
    options: [
      "Only your own work schedule",
      "Work sequences, shared resources, and safety interactions",
      "Only material deliveries",
      "Only completion dates"
    ],
    correctAnswer: 1,
    explanation: "Coordination with other trades requires consideration of work sequences, shared resources, and safety interactions.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Trade Coordination"
  },
  {
    id: 166,
    question: "What is the standard height for consumer units in domestic installations?",
    options: [
      "1200mm to center",
      "1350mm to center",
      "1500mm to center",
      "1800mm to center"
    ],
    correctAnswer: 1,
    explanation: "Consumer units should typically be installed with their center at 1350mm from finished floor level for accessibility.",
    section: "4.2.1",
    difficulty: "basic",
    topic: "Consumer Unit Height"
  },
  {
    id: 167,
    question: "When using a theodolite for setting out, what is its primary advantage?",
    options: [
      "It's cheaper than other methods",
      "Provides precise angular measurements for complex layouts",
      "It's faster to use",
      "It requires no skill to operate"
    ],
    correctAnswer: 1,
    explanation: "Theodolites provide precise angular measurements essential for complex layouts and long-distance accurate positioning.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "Theodolite Use"
  },
  {
    id: 168,
    question: "What should be done when marking out positions on finished surfaces?",
    options: [
      "Use permanent markers",
      "Use removable marking methods that won't damage the surface",
      "Don't mark at all",
      "Use spray paint"
    ],
    correctAnswer: 1,
    explanation: "Finished surfaces require removable marking methods that won't cause damage or permanent staining.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "Finished Surface Marking"
  },
  {
    id: 169,
    question: "When setting out in areas with restricted headroom, what should be considered?",
    options: [
      "Nothing special",
      "Access for installation and future maintenance",
      "Only the current installation",
      "Only the cost"
    ],
    correctAnswer: 1,
    explanation: "Restricted headroom areas require consideration of access for both current installation and future maintenance activities.",
    section: "4.2.3",
    difficulty: "intermediate",
    topic: "Restricted Access"
  },
  {
    id: 170,
    question: "What is the purpose of using string lines in setting out work?",
    options: [
      "To measure distances",
      "To establish straight reference lines over long distances",
      "To mark individual points",
      "To measure angles"
    ],
    correctAnswer: 1,
    explanation: "String lines establish straight reference lines over long distances where rigid measuring tools cannot be used effectively.",
    section: "4.2.2",
    difficulty: "basic",
    topic: "String Lines"
  },
  {
    id: 171,
    question: "What happens to cable pulling forces when conduit bends are too sharp?",
    options: [
      "Forces decrease",
      "Forces increase significantly",
      "Forces remain the same",
      "Forces become easier to manage"
    ],
    correctAnswer: 1,
    explanation: "Sharp conduit bends significantly increase cable pulling forces, making installation difficult and potentially damaging cables.",
    section: "4.3.1",
    difficulty: "intermediate",
    topic: "Pulling Force Effects"
  },
  {
    id: 172,
    question: "When bending large diameter conduit, what additional equipment might be required?",
    options: [
      "Nothing special",
      "Hydraulic benders or specialised forming equipment",
      "Only manual tools",
      "Only measuring tools"
    ],
    correctAnswer: 1,
    explanation: "Large diameter conduit requires hydraulic benders or specialised forming equipment to achieve proper bends without damage.",
    section: "4.3.3",
    difficulty: "advanced",
    topic: "Large Diameter Bending"
  },
  {
    id: 173,
    question: "What is the purpose of using saddle bends in conduit installation?",
    options: [
      "To save material",
      "To cross over other conduits or obstacles",
      "To improve appearance",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Saddle bends allow conduit to cross over other conduits or obstacles while maintaining proper clearances.",
    section: "4.3.5",
    difficulty: "intermediate",
    topic: "Saddle Bends"
  },
  {
    id: 174,
    question: "When making compound bends in conduit, what must be carefully planned?",
    options: [
      "Only the final position",
      "The sequence and interaction of multiple bend angles",
      "Only the appearance",
      "Only the material usage"
    ],
    correctAnswer: 1,
    explanation: "Compound bends require careful planning of the sequence and interaction of multiple bend angles to achieve the desired result.",
    section: "4.3.5",
    difficulty: "advanced",
    topic: "Compound Bends"
  },
  {
    id: 175,
    question: "What should be checked after completing conduit bending operations?",
    options: [
      "Only the appearance",
      "Internal diameter, alignment, and cable pulling capability",
      "Only the bend angles",
      "Only the material usage"
    ],
    correctAnswer: 1,
    explanation: "After bending, check internal diameter, alignment, and cable pulling capability to ensure the installation will function properly.",
    section: "4.3.4",
    difficulty: "basic",
    topic: "Bend Verification"
  },
  {
    id: 176,
    question: "What is the purpose of using adjustable supports for cable installations?",
    options: [
      "To reduce costs",
      "To accommodate final positioning and thermal movement",
      "To improve appearance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Adjustable supports accommodate final positioning adjustments and thermal movement in cable installations.",
    section: "4.4.1",
    difficulty: "intermediate",
    topic: "Adjustable Supports"
  },
  {
    id: 177,
    question: "Which fixing method is most appropriate for temporary installations?",
    options: [
      "Welding",
      "Clamps or removable fixings",
      "Chemical anchors",
      "Permanent adhesives"
    ],
    correctAnswer: 1,
    explanation: "Temporary installations should use clamps or removable fixings that can be easily removed without damaging structures.",
    section: "4.4.2",
    difficulty: "basic",
    topic: "Temporary Fixings"
  },
  {
    id: 178,
    question: "What is the purpose of using cable separation in installations?",
    options: [
      "To use more materials",
      "To prevent interference between different circuit types",
      "To improve appearance only",
      "To increase installation time"
    ],
    correctAnswer: 1,
    explanation: "Cable separation prevents interference between different circuit types (power, data, control) and meets safety requirements.",
    section: "4.4.3",
    difficulty: "intermediate",
    topic: "Cable Separation"
  },
  {
    id: 179,
    question: "When installing in areas subject to vibration, what should be considered?",
    options: [
      "Nothing special needed",
      "Flexible connections and vibration-resistant supports",
      "Only standard fixings",
      "Only cable selection"
    ],
    correctAnswer: 1,
    explanation: "Areas subject to vibration require flexible connections and vibration-resistant supports to prevent fatigue failures.",
    section: "4.4.4",
    difficulty: "advanced",
    topic: "Vibration Considerations"
  },
  {
    id: 180,
    question: "What is the purpose of using cable management systems?",
    options: [
      "To increase costs",
      "To organize, support, and protect cables systematically",
      "To slow down installation",
      "To use more materials"
    ],
    correctAnswer: 1,
    explanation: "Cable management systems organize, support, and protect cables systematically, improving reliability and maintenance access.",
    section: "4.4.9",
    difficulty: "basic",
    topic: "Cable Management"
  },
  {
    id: 181,
    question: "What is the correct procedure for preparing stranded conductors for termination?",
    options: [
      "Just strip the insulation",
      "Strip insulation, twist strands, and consider using ferrules",
      "Cut individual strands",
      "Separate all strands"
    ],
    correctAnswer: 1,
    explanation: "Stranded conductors should have insulation stripped, strands twisted together, and ferrules considered for reliable termination.",
    section: "4.5.1",
    difficulty: "basic",
    topic: "Stranded Conductor Prep"
  },
  {
    id: 182,
    question: "When should insulation sleeves be used on connections?",
    options: [
      "Never",
      "When additional insulation or identification is required",
      "Only on high-voltage connections",
      "Only in wet locations"
    ],
    correctAnswer: 1,
    explanation: "Insulation sleeves provide additional insulation or identification where required by regulations or good practice.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Insulation Sleeves"
  },
  {
    id: 183,
    question: "What is the purpose of using blanking plugs in unused cable entries?",
    options: [
      "Decoration only",
      "To maintain IP rating and prevent ingress",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Blanking plugs maintain the IP rating of enclosures by preventing ingress through unused cable entries.",
    section: "4.5.3",
    difficulty: "basic",
    topic: "Blanking Plugs"
  },
  {
    id: 184,
    question: "When terminating cables in hazardous areas, what additional requirements apply?",
    options: [
      "No special requirements",
      "Use certified equipment and follow specific installation procedures",
      "Only standard procedures",
      "Only additional labeling"
    ],
    correctAnswer: 1,
    explanation: "Hazardous areas require certified equipment and specific installation procedures to prevent ignition of flammable atmospheres.",
    section: "4.5.4",
    difficulty: "advanced",
    topic: "Hazardous Area Termination"
  },
  {
    id: 185,
    question: "What does NEMA 4X rating indicate for an electrical enclosure?",
    options: [
      "Basic protection only",
      "Weather-resistant and corrosion-resistant",
      "Indoor use only",
      "No special protection"
    ],
    correctAnswer: 1,
    explanation: "NEMA 4X rating indicates the enclosure is weather-resistant and corrosion-resistant, suitable for harsh outdoor environments.",
    section: "4.5.5",
    difficulty: "intermediate",
    topic: "NEMA Ratings"
  },
  {
    id: 186,
    question: "What should be verified during the initial visual inspection?",
    options: [
      "Only cable colors",
      "Compliance with drawings, workmanship quality, and safety requirements",
      "Only connection tightness",
      "Only material types"
    ],
    correctAnswer: 1,
    explanation: "Initial visual inspection should verify compliance with drawings, workmanship quality, and safety requirements before testing.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Initial Inspection"
  },
  {
    id: 187,
    question: "What is the purpose of dead testing before live testing?",
    options: [
      "To save time",
      "To identify obvious faults safely before applying power",
      "To reduce costs",
      "To impress clients"
    ],
    correctAnswer: 1,
    explanation: "Dead testing identifies obvious faults safely before applying power, preventing damage and ensuring safe live testing.",
    section: "4.6.2",
    difficulty: "basic",
    topic: "Dead Testing Purpose"
  },
  {
    id: 188,
    question: "When should calibration certificates for test instruments be checked?",
    options: [
      "Never",
      "Before each testing session",
      "Only annually",
      "Only when instruments fail"
    ],
    correctAnswer: 1,
    explanation: "Calibration certificates should be checked before each testing session to ensure instruments provide accurate, reliable results.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Instrument Calibration"
  },
  {
    id: 189,
    question: "What should be done if test results are borderline or marginal?",
    options: [
      "Accept them as satisfactory",
      "Investigate further and consider remedial action",
      "Ignore the results",
      "Retest with different instruments"
    ],
    correctAnswer: 1,
    explanation: "Borderline or marginal test results require further investigation and consideration of remedial action to ensure safety.",
    section: "4.6.6",
    difficulty: "intermediate",
    topic: "Marginal Results"
  },
  {
    id: 190,
    question: "What is the purpose of issuing electrical installation certificates?",
    options: [
      "To increase paperwork",
      "To provide legal evidence of compliance with regulations",
      "To impress clients",
      "To reduce liability"
    ],
    correctAnswer: 1,
    explanation: "Electrical installation certificates provide legal evidence that work complies with regulations and safety standards.",
    section: "4.6.6",
    difficulty: "basic",
    topic: "Installation Certificates"
  },
  {
    id: 191,
    question: "What hearing protection should be used in high-noise environments?",
    options: [
      "None required",
      "Ear plugs or ear defenders appropriate to noise levels",
      "Only ear plugs",
      "Only ear defenders"
    ],
    correctAnswer: 1,
    explanation: "High-noise environments require ear plugs or ear defenders appropriate to the specific noise levels present.",
    section: "4.7.1",
    difficulty: "basic",
    topic: "Hearing Protection"
  },
  {
    id: 192,
    question: "What is the purpose of using residual current devices (RCDs) with portable tools?",
    options: [
      "To reduce power consumption",
      "To provide additional protection against electric shock",
      "To improve tool performance",
      "To reduce maintenance"
    ],
    correctAnswer: 1,
    explanation: "RCDs provide additional protection against electric shock when using portable tools, especially in harsh environments.",
    section: "4.7.2",
    difficulty: "basic",
    topic: "RCD Protection"
  },
  {
    id: 193,
    question: "What should be considered when selecting access equipment for work at height?",
    options: [
      "Only the cost",
      "Task requirements, duration, weather conditions, and user competence",
      "Only the height required",
      "Only availability"
    ],
    correctAnswer: 1,
    explanation: "Access equipment selection should consider task requirements, duration, weather conditions, and user competence for safety.",
    section: "4.7.3",
    difficulty: "intermediate",
    topic: "Access Equipment Selection"
  },
  {
    id: 194,
    question: "What is the purpose of using edge protection when working at height?",
    options: [
      "To improve appearance",
      "To prevent falls from unprotected edges",
      "To reduce wind effects",
      "To mark work areas"
    ],
    correctAnswer: 1,
    explanation: "Edge protection prevents falls from unprotected edges, providing collective protection for workers at height.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Edge Protection"
  },
  {
    id: 195,
    question: "What should be done with contaminated PPE?",
    options: [
      "Reuse immediately",
      "Clean, inspect, or dispose of according to contamination type",
      "Store with clean PPE",
      "Ignore the contamination"
    ],
    correctAnswer: 1,
    explanation: "Contaminated PPE should be cleaned, inspected, or disposed of according to the type of contamination to maintain protection.",
    section: "4.7.4",
    difficulty: "intermediate",
    topic: "PPE Contamination"
  },
  {
    id: 196,
    question: "What is the purpose of conducting near-miss reporting?",
    options: [
      "To blame workers",
      "To identify and control hazards before accidents occur",
      "To increase paperwork",
      "To satisfy insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Near-miss reporting identifies and controls hazards before they can cause accidents, improving overall safety performance.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Near-Miss Reporting"
  },
  {
    id: 197,
    question: "When should safety data sheets (SDS) be consulted?",
    options: [
      "Never",
      "Before using any chemical products or materials",
      "Only after accidents",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Safety data sheets should be consulted before using any chemical products to understand hazards and safety precautions.",
    section: "4.1.1",
    difficulty: "basic",
    topic: "Safety Data Sheets"
  },
  {
    id: 198,
    question: "What should be done if site conditions make the original installation method unsafe?",
    options: [
      "Proceed anyway",
      "Stop work and develop alternative safe methods",
      "Work faster to finish quickly",
      "Ignore the safety concerns"
    ],
    correctAnswer: 1,
    explanation: "If site conditions make original methods unsafe, work should stop and alternative safe methods developed before proceeding.",
    section: "4.1.4",
    difficulty: "basic",
    topic: "Method Adaptation"
  },
  {
    id: 199,
    question: "What is the purpose of using as-built drawings?",
    options: [
      "To impress clients",
      "To record the actual installation for future reference and maintenance",
      "To reduce costs",
      "To speed up completion"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings record the actual installation as completed, providing essential information for future maintenance and modifications.",
    section: "4.1.2",
    difficulty: "intermediate",
    topic: "As-Built Drawings"
  },
  {
    id: 200,
    question: "What should be considered when planning material handling on site?",
    options: [
      "Only the delivery schedule",
      "Manual handling risks, storage requirements, and access routes",
      "Only the material costs",
      "Only the installation sequence"
    ],
    correctAnswer: 1,
    explanation: "Material handling planning should consider manual handling risks, storage requirements, and access routes to prevent injuries.",
    section: "4.1.3",
    difficulty: "intermediate",
    topic: "Material Handling"
  },
  {
    id: 201,
    question: "What is the minimum clearance required around electrical panels for maintenance access?",
    options: [
      "300mm",
      "600mm",
      "900mm",
      "1200mm"
    ],
    correctAnswer: 1,
    explanation: "A minimum clearance of 600mm is typically required around electrical panels to provide safe maintenance access.",
    section: "4.2.1",
    difficulty: "intermediate",
    topic: "Panel Clearances"
  },
  {
    id: 202,
    question: "When using GPS for setting out large installations, what should be considered?",
    options: [
      "Only the cost",
      "Accuracy requirements, satellite availability, and local coordinate systems",
      "Only the weather",
      "Only the installation speed"
    ],
    correctAnswer: 1,
    explanation: "GPS use requires consideration of accuracy requirements, satellite availability, and local coordinate systems for precise positioning.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "GPS Setting Out"
  },
  {
    id: 203,
    question: "What should be done when setting out positions in areas with existing services?",
    options: [
      "Ignore existing services",
      "Locate and mark existing services before setting out new positions",
      "Guess where services might be",
      "Proceed without checking"
    ],
    correctAnswer: 1,
    explanation: "Existing services must be located and marked before setting out new positions to prevent conflicts and damage.",
    section: "4.2.5",
    difficulty: "basic",
    topic: "Existing Services"
  },
  {
    id: 204,
    question: "When working in areas with limited natural light, what should be provided?",
    options: [
      "Nothing special needed",
      "Adequate temporary lighting for safe working",
      "Only personal torches",
      "Only reflective clothing"
    ],
    correctAnswer: 1,
    explanation: "Areas with limited natural light require adequate temporary lighting to ensure safe working conditions and quality installation.",
    section: "4.2.3",
    difficulty: "basic",
    topic: "Temporary Lighting"
  },
  {
    id: 205,
    question: "What is the purpose of using benchmark points in setting out work?",
    options: [
      "To mark completion",
      "To provide fixed reference points for accurate positioning",
      "To identify hazards",
      "To mark material storage"
    ],
    correctAnswer: 1,
    explanation: "Benchmark points provide fixed reference points that ensure accurate positioning throughout the installation process.",
    section: "4.2.2",
    difficulty: "intermediate",
    topic: "Benchmark Points"
  },
  {
    id: 206,
    question: "What factor most affects the quality of conduit bends?",
    options: [
      "Installation speed",
      "Proper tooling and technique",
      "Material cost",
      "Weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Proper tooling and technique are the most important factors affecting the quality and consistency of conduit bends.",
    section: "4.3.3",
    difficulty: "basic",
    topic: "Bend Quality Factors"
  },
  {
    id: 207,
    question: "When bending conduit in confined spaces, what additional challenges arise?",
    options: [
      "No additional challenges",
      "Limited access for tools and reduced working space",
      "Only material handling",
      "Only safety concerns"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces present challenges of limited access for tools and reduced working space, requiring careful planning.",
    section: "4.3.4",
    difficulty: "intermediate",
    topic: "Confined Space Bending"
  },
  {
    id: 208,
    question: "What is the purpose of using conduit bushings?",
    options: [
      "To improve appearance",
      "To protect cable insulation from sharp edges",
      "To reduce costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Conduit bushings protect cable insulation from sharp edges at conduit terminations, preventing damage during installation and service.",
    section: "4.3.4",
    difficulty: "basic",
    topic: "Conduit Bushings"
  },
  {
    id: 209,
    question: "When planning conduit routes with multiple bends, what should be limited?",
    options: [
      "Nothing needs limiting",
      "Total number of bends and cumulative angle changes",
      "Only the bend radius",
      "Only the conduit length"
    ],
    correctAnswer: 1,
    explanation: "Multiple bend routes should limit the total number of bends and cumulative angle changes to maintain cable pulling capability.",
    section: "4.3.5",
    difficulty: "intermediate",
    topic: "Multiple Bend Limits"
  },
  {
    id: 210,
    question: "What should be considered when bending conduit for future cable additions?",
    options: [
      "Only current cable requirements",
      "Future cable capacity and pulling requirements",
      "Only current installation speed",
      "Only current costs"
    ],
    correctAnswer: 1,
    explanation: "Future cable additions require consideration of additional capacity and pulling requirements when designing conduit bends.",
    section: "4.3.1",
    difficulty: "advanced",
    topic: "Future Capacity"
  },
  {
    id: 211,
    question: "What is the purpose of using anti-vibration mounts for equipment supports?",
    options: [
      "To reduce costs",
      "To prevent vibration transmission and reduce noise",
      "To improve appearance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Anti-vibration mounts prevent vibration transmission from equipment and reduce noise levels in the installation.",
    section: "4.4.1",
    difficulty: "advanced",
    topic: "Anti-Vibration Mounts"
  },
  {
    id: 212,
    question: "Which fixing method is most suitable for overhead installations?",
    options: [
      "Adhesive pads",
      "Through-bolts or heavy-duty anchors",
      "Self-tapping screws",
      "Cable ties"
    ],
    correctAnswer: 1,
    explanation: "Overhead installations require through-bolts or heavy-duty anchors to safely support the weight and prevent falling hazards.",
    section: "4.4.2",
    difficulty: "intermediate",
    topic: "Overhead Fixings"
  },
  {
    id: 213,
    question: "What is the purpose of using fire-stopping materials in cable installations?",
    options: [
      "To improve appearance",
      "To prevent fire spread through cable penetrations",
      "To reduce installation costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Fire-stopping materials prevent fire spread through cable penetrations, maintaining building fire compartmentation.",
    section: "4.4.3",
    difficulty: "advanced",
    topic: "Fire Stopping"
  },
  {
    id: 214,
    question: "When installing in areas subject to chemical exposure, what should be considered?",
    options: [
      "Nothing special needed",
      "Chemical resistance of materials and additional protection",
      "Only standard materials",
      "Only installation speed"
    ],
    correctAnswer: 1,
    explanation: "Chemical exposure areas require materials with appropriate chemical resistance and additional protection measures.",
    section: "4.4.4",
    difficulty: "advanced",
    topic: "Chemical Resistance"
  },
  {
    id: 215,
    question: "What is the purpose of using cable pulling winches?",
    options: [
      "To reduce labor costs",
      "To provide controlled pulling force for long or difficult cable runs",
      "To improve appearance",
      "To speed up all installations"
    ],
    correctAnswer: 1,
    explanation: "Cable pulling winches provide controlled pulling force for long or difficult cable runs, preventing cable damage.",
    section: "4.4.8",
    difficulty: "intermediate",
    topic: "Cable Winches"
  },
  {
    id: 216,
    question: "What is the correct method for connecting aluminum conductors?",
    options: [
      "Same as copper conductors",
      "Use appropriate compounds and connection methods for aluminum",
      "Avoid aluminum connections",
      "Only use soldered connections"
    ],
    correctAnswer: 1,
    explanation: "Aluminum conductors require appropriate compounds and connection methods to prevent corrosion and ensure reliable connections.",
    section: "4.5.1",
    difficulty: "advanced",
    topic: "Aluminum Connections"
  },
  {
    id: 217,
    question: "When should mechanical connectors be used instead of twist-on connectors?",
    options: [
      "Never",
      "For permanent installations and higher current applications",
      "Only for temporary connections",
      "Only in dry locations"
    ],
    correctAnswer: 1,
    explanation: "Mechanical connectors are preferred for permanent installations and higher current applications due to their reliability.",
    section: "4.5.2",
    difficulty: "intermediate",
    topic: "Mechanical Connectors"
  },
  {
    id: 218,
    question: "What is the purpose of using progressive cable glands?",
    options: [
      "To reduce costs",
      "To accommodate different cable diameters in the same gland",
      "To improve appearance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Progressive cable glands accommodate different cable diameters in the same gland, providing flexibility in installations.",
    section: "4.5.3",
    difficulty: "intermediate",
    topic: "Progressive Glands"
  },
  {
    id: 219,
    question: "When terminating cables in explosive atmospheres, what certification is required?",
    options: [
      "No special certification",
      "ATEX or IECEx certification for equipment and installation methods",
      "Only standard electrical certification",
      "Only manufacturer's warranty"
    ],
    correctAnswer: 1,
    explanation: "Explosive atmospheres require ATEX or IECEx certification for equipment and installation methods to prevent ignition.",
    section: "4.5.4",
    difficulty: "advanced",
    topic: "Explosive Atmosphere Certification"
  },
  {
    id: 220,
    question: "What does IP69K rating indicate for an electrical enclosure?",
    options: [
      "Basic protection only",
      "Dust-tight and protected against high-pressure, high-temperature wash-down",
      "Standard outdoor protection",
      "Indoor use only"
    ],
    correctAnswer: 1,
    explanation: "IP69K indicates dust-tight protection and resistance to high-pressure, high-temperature wash-down procedures.",
    section: "4.5.5",
    difficulty: "advanced",
    topic: "IP69K Rating"
  },
  {
    id: 221,
    question: "What should be documented during the visual inspection process?",
    options: [
      "Only major faults",
      "All observations, defects, and compliance issues",
      "Only completion status",
      "Only material usage"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should document all observations, defects, and compliance issues for comprehensive quality records.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Inspection Documentation"
  },
  {
    id: 222,
    question: "What is the purpose of sequence testing in electrical installations?",
    options: [
      "To save time",
      "To verify correct phase rotation and system operation",
      "To reduce costs",
      "To impress clients"
    ],
    correctAnswer: 1,
    explanation: "Sequence testing verifies correct phase rotation and system operation, particularly important for motor installations.",
    section: "4.6.5",
    difficulty: "intermediate",
    topic: "Sequence Testing"
  },
  {
    id: 223,
    question: "When should test instruments be re-calibrated?",
    options: [
      "Never",
      "According to manufacturer's recommendations or when accuracy is questioned",
      "Only when they break",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Test instruments should be re-calibrated according to manufacturer's recommendations or when accuracy is questioned.",
    section: "4.6.1",
    difficulty: "basic",
    topic: "Instrument Re-calibration"
  },
  {
    id: 224,
    question: "What should be done if environmental conditions affect test results?",
    options: [
      "Ignore the conditions",
      "Record conditions and consider their impact on results",
      "Stop all testing",
      "Change test methods"
    ],
    correctAnswer: 1,
    explanation: "Environmental conditions should be recorded and their impact on test results considered for accurate interpretation.",
    section: "4.6.6",
    difficulty: "intermediate",
    topic: "Environmental Effects"
  },
  {
    id: 225,
    question: "What is the purpose of issuing minor works certificates?",
    options: [
      "To increase paperwork",
      "To document small additions or alterations to existing installations",
      "To replace major certificates",
      "To reduce testing requirements"
    ],
    correctAnswer: 1,
    explanation: "Minor works certificates document small additions or alterations to existing installations that don't require full certification.",
    section: "4.6.6",
    difficulty: "basic",
    topic: "Minor Works Certificates"
  },
  {
    id: 226,
    question: "What eye protection should be used when working with chemicals?",
    options: [
      "Standard safety glasses",
      "Chemical-resistant goggles or face shields",
      "No protection needed",
      "Only prescription glasses"
    ],
    correctAnswer: 1,
    explanation: "Chemical work requires chemical-resistant goggles or face shields to protect against splashes and vapors.",
    section: "4.7.1",
    difficulty: "intermediate",
    topic: "Chemical Eye Protection"
  },
  {
    id: 227,
    question: "What is the purpose of using isolation transformers with power tools?",
    options: [
      "To reduce power consumption",
      "To provide electrical isolation and reduce shock risk",
      "To improve tool performance",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "Isolation transformers provide electrical isolation from earth, reducing the risk of electric shock when using power tools.",
    section: "4.7.2",
    difficulty: "intermediate",
    topic: "Isolation Transformers"
  },
  {
    id: 228,
    question: "What should be considered when working near water or in wet conditions?",
    options: [
      "Nothing special needed",
      "Additional electrical protection and slip-resistant surfaces",
      "Only waterproof clothing",
      "Only faster working"
    ],
    correctAnswer: 1,
    explanation: "Wet conditions require additional electrical protection (RCDs, low voltage) and slip-resistant surfaces for safety.",
    section: "4.7.3",
    difficulty: "basic",
    topic: "Wet Condition Safety"
  },
  {
    id: 229,
    question: "What is the purpose of using rescue equipment when working at height?",
    options: [
      "To impress clients",
      "To enable rapid rescue of workers in emergency situations",
      "To reduce insurance costs",
      "To meet minimum requirements only"
    ],
    correctAnswer: 1,
    explanation: "Rescue equipment enables rapid rescue of workers in emergency situations, reducing the consequences of accidents at height.",
    section: "4.7.3",
    difficulty: "advanced",
    topic: "Rescue Equipment"
  },
  {
    id: 230,
    question: "What should be done with damaged or worn PPE?",
    options: [
      "Continue using until replacement arrives",
      "Remove from service immediately and replace",
      "Repair with tape",
      "Use only for light duties"
    ],
    correctAnswer: 1,
    explanation: "Damaged or worn PPE should be removed from service immediately and replaced to maintain protection effectiveness.",
    section: "4.7.4",
    difficulty: "basic",
    topic: "PPE Replacement"
  },
  {
    id: 231,
    question: "What is the purpose of conducting post-installation safety reviews?",
    options: [
      "To find fault with the work",
      "To identify lessons learned and improve future safety performance",
      "To increase project costs",
      "To delay project completion"
    ],
    correctAnswer: 1,
    explanation: "Post-installation safety reviews identify lessons learned and opportunities to improve future safety performance.",
    section: "4.1.1",
    difficulty: "intermediate",
    topic: "Safety Reviews"
  },
  {
    id: 232,
    question: "When should emergency contact information be updated?",
    options: [
      "Never",
      "When personnel or site conditions change",
      "Only at project start",
      "Only at project completion"
    ],
    correctAnswer: 1,
    explanation: "Emergency contact information should be updated whenever personnel or site conditions change to ensure effective response.",
    section: "4.1.4",
    difficulty: "basic",
    topic: "Emergency Contacts"
  },
  {
    id: 233,
    question: "What should be done if installation specifications are unclear or contradictory?",
    options: [
      "Make your best guess",
      "Seek clarification from the specifying engineer or client",
      "Use the cheapest option",
      "Use standard practices only"
    ],
    correctAnswer: 1,
    explanation: "Unclear or contradictory specifications require clarification from the specifying engineer or client before proceeding.",
    section: "4.1.2",
    difficulty: "basic",
    topic: "Specification Clarification"
  },
  {
    id: 234,
    question: "What is the purpose of maintaining material traceability records?",
    options: [
      "To increase paperwork",
      "To track material origins for quality and safety purposes",
      "To impress clients",
      "To reduce costs"
    ],
    correctAnswer: 1,
    explanation: "Material traceability records track material origins for quality assurance, safety, and potential recall purposes.",
    section: "4.1.3",
    difficulty: "intermediate",
    topic: "Material Traceability"
  },
  {
    id: 235,
    question: "What should be considered when planning work in occupied buildings?",
    options: [
      "Only the electrical work",
      "Occupant safety, noise levels, and access disruption",
      "Only completion speed",
      "Only material costs"
    ],
    correctAnswer: 1,
    explanation: "Work in occupied buildings requires consideration of occupant safety, noise levels, and minimizing access disruption.",
    section: "4.1.4",
    difficulty: "intermediate",
    topic: "Occupied Building Work"
  },
  {
    id: 236,
    question: "What is the standard height for emergency lighting in escape routes?",
    options: [
      "1800mm minimum",
      "2000mm minimum",
      "2200mm minimum",
      "2500mm minimum"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting in escape routes should typically be mounted at 2000mm minimum height to prevent tampering and damage.",
    section: "4.2.1",
    difficulty: "intermediate",
    topic: "Emergency Lighting Height"
  },
  {
    id: 237,
    question: "When using total stations for setting out, what is their main advantage?",
    options: [
      "Lower cost than other methods",
      "Combined distance and angle measurement for precise positioning",
      "Faster operation than tape measures",
      "No skill required to operate"
    ],
    correctAnswer: 1,
    explanation: "Total stations combine distance and angle measurement capabilities for highly precise positioning in complex layouts.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "Total Station Advantages"
  },
  {
    id: 238,
    question: "What should be done when marking out positions on heritage or listed buildings?",
    options: [
      "Use standard marking methods",
      "Use non-damaging, removable marking methods and seek conservation advice",
      "Avoid marking altogether",
      "Use permanent markers for clarity"
    ],
    correctAnswer: 1,
    explanation: "Heritage buildings require non-damaging, removable marking methods and conservation advice to protect historical features.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "Heritage Building Marking"
  },
  {
    id: 239,
    question: "When working in areas with electromagnetic interference, what should be considered?",
    options: [
      "Nothing special needed",
      "Shielding requirements and separation from interference sources",
      "Only installation speed",
      "Only material costs"
    ],
    correctAnswer: 1,
    explanation: "Electromagnetic interference areas require consideration of shielding requirements and separation from interference sources.",
    section: "4.2.4",
    difficulty: "advanced",
    topic: "EMI Considerations"
  },
  {
    id: 240,
    question: "What is the purpose of using coordinate systems in large installations?",
    options: [
      "To impress clients",
      "To ensure accurate positioning and facilitate future modifications",
      "To increase costs",
      "To slow down installation"
    ],
    correctAnswer: 1,
    explanation: "Coordinate systems ensure accurate positioning in large installations and facilitate future modifications and maintenance.",
    section: "4.2.2",
    difficulty: "advanced",
    topic: "Coordinate Systems"
  },
  {
    id: 241,
    question: "What environmental factors can affect conduit bending quality?",
    options: [
      "Only temperature",
      "Temperature, humidity, and material storage conditions",
      "Only humidity",
      "Only wind speed"
    ],
    correctAnswer: 1,
    explanation: "Temperature, humidity, and material storage conditions all affect conduit material properties and bending quality.",
    section: "4.3.2",
    difficulty: "intermediate",
    topic: "Environmental Bending Factors"
  },
  {
    id: 242,
    question: "When bending conduit for seismic areas, what additional considerations apply?",
    options: [
      "No additional considerations",
      "Flexible connections and movement accommodation",
      "Only standard bending practices",
      "Only material selection"
    ],
    correctAnswer: 1,
    explanation: "Seismic areas require flexible connections and accommodation for building movement during earthquakes.",
    section: "4.3.5",
    difficulty: "advanced",
    topic: "Seismic Considerations"
  },
  {
    id: 243,
    question: "What is the purpose of using conduit expansion fittings?",
    options: [
      "To save material",
      "To accommodate thermal expansion in long conduit runs",
      "To improve appearance",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Conduit expansion fittings accommodate thermal expansion in long conduit runs, preventing stress damage.",
    section: "4.3.5",
    difficulty: "advanced",
    topic: "Expansion Fittings"
  },
  {
    id: 244,
    question: "When planning conduit routes in corrosive environments, what should be considered?",
    options: [
      "Only standard materials",
      "Corrosion-resistant materials and protective coatings",
      "Only installation speed",
      "Only bend requirements"
    ],
    correctAnswer: 1,
    explanation: "Corrosive environments require corrosion-resistant materials and protective coatings to ensure long-term reliability.",
    section: "4.3.1",
    difficulty: "advanced",
    topic: "Corrosive Environment Bending"
  },
  {
    id: 245,
    question: "What should be verified after completing complex conduit bending operations?",
    options: [
      "Only visual appearance",
      "Dimensional accuracy, internal clearance, and cable pulling capability",
      "Only bend angles",
      "Only material usage"
    ],
    correctAnswer: 1,
    explanation: "Complex bending operations require verification of dimensional accuracy, internal clearance, and cable pulling capability.",
    section: "4.3.4",
    difficulty: "intermediate",
    topic: "Complex Bend Verification"
  },
  {
    id: 246,
    question: "What is the purpose of using seismic bracing for electrical installations?",
    options: [
      "To improve appearance",
      "To prevent damage during earthquakes",
      "To reduce installation costs",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Seismic bracing prevents damage to electrical installations during earthquakes, maintaining system integrity and safety.",
    section: "4.4.1",
    difficulty: "advanced",
    topic: "Seismic Bracing"
  },
  {
    id: 247,
    question: "Which fixing method provides the best performance in high-vibration environments?",
    options: [
      "Standard screws",
      "Vibration-resistant fasteners with thread-locking compounds",
      "Adhesive only",
      "Cable ties"
    ],
    correctAnswer: 1,
    explanation: "High-vibration environments require vibration-resistant fasteners with thread-locking compounds to prevent loosening.",
    section: "4.4.2",
    difficulty: "advanced",
    topic: "Vibration-Resistant Fixings"
  },
  {
    id: 248,
    question: "What is the purpose of using plenum-rated cables in HVAC areas?",
    options: [
      "To reduce costs",
      "To meet fire safety requirements in air-handling spaces",
      "To improve performance",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Plenum-rated cables meet fire safety requirements in air-handling spaces, producing less smoke and toxic gases when burned.",
    section: "4.4.3",
    difficulty: "advanced",
    topic: "Plenum-Rated Cables"
  },
  {
    id: 249,
    question: "When installing in areas subject to flooding, what should be considered?",
    options: [
      "Nothing special needed",
      "Waterproof equipment and elevated installation heights",
      "Only standard installation practices",
      "Only faster installation"
    ],
    correctAnswer: 1,
    explanation: "Flood-prone areas require waterproof equipment and elevated installation heights to prevent damage and maintain safety.",
    section: "4.4.4",
    difficulty: "advanced",
    topic: "Flood Considerations"
  },
  {
    id: 250,
    question: "What documentation should be completed after installation work?",
    options: [
      "No documentation needed",
      "Installation certificates and test results",
      "Only a job completion note",
      "Only customer feedback"
    ],
    correctAnswer: 1,
    explanation: "Installation certificates and test results must be completed to provide evidence of compliance with regulations and safe installation.",
    section: "4.6.6",
    difficulty: "basic",
    topic: "Installation Documentation"
  }
];

// Helper functions to filter questions
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module4QuestionBank.filter(q => q.section.startsWith(section));
};

export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): QuestionBank[] => {
  return module4QuestionBank.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (
  count: number,
  weights: { basic: number; intermediate: number; advanced: number } = { basic: 40, intermediate: 45, advanced: 15 }
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
