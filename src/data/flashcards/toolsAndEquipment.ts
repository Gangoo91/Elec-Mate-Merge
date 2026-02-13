import { FlashcardData } from './types';

export const toolsAndEquipment: FlashcardData[] = [
  // === Hand Tools ===
  {
    id: 'te1',
    question:
      "What does 'VDE' mean on insulated hand tools, and to what standard must they comply?",
    answer:
      'VDE indicates the tool has been independently tested and certified as safe for live working up to 1000 V AC / 1500 V DC. All VDE insulated tools must comply with BS EN 60900, which specifies requirements for insulating material thickness, dielectric strength, and marking. Only VDE-rated tools should be used when working on or near live parts.',
    category: 'Hand Tools',
    difficulty: 'easy',
  },
  {
    id: 'te2',
    question:
      'What are side cutters used for, and what safety consideration applies when cutting live cables?',
    answer:
      'Side cutters (diagonal cutting pliers) are used to cut copper and aluminium conductors cleanly. When there is any possibility of the cable being live, only VDE-insulated side cutters rated to 1000 V should be used. The cutting edges must be kept sharp to ensure a clean cut and avoid deforming the conductor, and the tool should be inspected before each use for damage to the insulation.',
    category: 'Hand Tools',
    difficulty: 'easy',
  },
  {
    id: 'te3',
    question: 'Describe the correct use of long nose pliers in electrical work.',
    answer:
      'Long nose pliers are used for gripping, bending, and shaping conductors in confined spaces such as socket outlets and switch plates. They are ideal for forming loops on conductors for screw terminals. VDE-insulated versions rated to 1000 V must be used if there is any risk of contact with live parts. The jaws should be kept clean and the pivot lubricated to maintain smooth operation.',
    category: 'Hand Tools',
    difficulty: 'easy',
  },
  {
    id: 'te4',
    question:
      'Why is it important to use the correct cable stripping tool, and what damage can occur if the wrong tool is used?',
    answer:
      'Purpose-built cable strippers remove the outer sheath and conductor insulation without nicking or scoring the copper beneath. If a knife or incorrect tool is used, the conductor can be damaged, reducing its cross-sectional area and creating a localised hot spot under load. Damaged insulation may also lead to insulation resistance failures or earth faults over time.',
    category: 'Hand Tools',
    difficulty: 'medium',
  },
  {
    id: 'te5',
    question: 'What is the purpose of a crimping tool, and why must the correct die size be used?',
    answer:
      'A crimping tool compresses a crimp terminal or ferrule onto a conductor to form a gas-tight mechanical and electrical connection. Using the wrong die size results in an under-crimped or over-crimped joint: under-crimping causes high resistance and overheating, while over-crimping can sever conductor strands. The correct die must match the terminal size and conductor cross-sectional area exactly.',
    category: 'Hand Tools',
    difficulty: 'medium',
  },
  {
    id: 'te6',
    question: 'What is a torque screwdriver and why is it essential for terminal tightening?',
    answer:
      "A torque screwdriver applies a precise, pre-set torque value to terminal screws, preventing both under-tightening and over-tightening. Under-tightened terminals cause high-resistance joints that overheat and may cause fires, while over-tightening can strip threads or crack terminal housings. BS 7671 Regulation 526.9 requires connections to be tightened to the manufacturer's specified torque, making a calibrated torque driver an essential tool.",
    category: 'Hand Tools',
    difficulty: 'medium',
  },

  // === Power Tools ===
  {
    id: 'te7',
    question:
      'What does SDS stand for in SDS drill chucks, and why are SDS drills preferred on site?',
    answer:
      'SDS stands for Steck-Dreh-Sitz (German for Insert-Turn-Stay), often referred to as Slotted Drive System. SDS drills use a special shank with slots that lock into the chuck without tightening, allowing quick bit changes. They provide a dedicated hammer action for drilling into masonry, concrete, and brick, making them far more effective than standard chuck drills for first-fix electrical installation work.',
    category: 'Power Tools',
    difficulty: 'medium',
  },
  {
    id: 'te8',
    question: 'What is a chase cutter used for, and what PPE is required when operating one?',
    answer:
      'A chase cutter (wall chaser) cuts parallel channels into masonry or plaster for recessing cables and conduit into walls. It uses twin diamond-tipped blades with an adjustable depth guide. Due to the large volume of fine dust produced, the operator must wear a P3-rated dust mask (or use the tool with a vacuum extraction attachment), safety goggles, ear defenders, and gloves. A 110 V CTE supply should be used on construction sites.',
    category: 'Power Tools',
    difficulty: 'hard',
  },
  {
    id: 'te9',
    question:
      'Name two types of saw commonly used in electrical installation and state a typical use for each.',
    answer:
      'A jigsaw is used for cutting holes and curves in plywood, plasterboard, and plastic trunking lids, making it ideal for consumer unit cut-outs in cupboards. A reciprocating saw is used for cutting metal conduit, cable tray, unistrut, and for demolition work where access is restricted. Both must be used with the correct blade type for the material being cut.',
    category: 'Power Tools',
    difficulty: 'medium',
  },
  {
    id: 'te10',
    question:
      'Why is a 110 V centre-tapped earth (CTE) supply used for power tools on construction sites?',
    answer:
      'A 110 V CTE transformer has its secondary winding centre-tapped to earth, meaning the maximum voltage to earth on any conductor is only 55 V. This greatly reduces the severity of electric shock if a fault occurs, as 55 V is generally considered non-lethal in most conditions. BS 7671 and the Electricity at Work Regulations 1989 require reduced low voltage supplies on construction sites to protect workers using portable equipment.',
    category: 'Power Tools',
    difficulty: 'medium',
  },
  {
    id: 'te11',
    question:
      'What is PAT testing and how often should portable power tools on a construction site be tested?',
    answer:
      'PAT stands for Portable Appliance Testing. It involves a visual inspection and electrical tests (earth continuity, insulation resistance, and functional checks) on portable equipment. On construction sites, the IET Code of Practice for In-Service Inspection and Testing recommends that 110 V portable tools are formally tested at least every 3 months, with user checks before each use. Records of all PAT tests must be kept.',
    category: 'Power Tools',
    difficulty: 'hard',
  },

  // === PPE ===
  {
    id: 'te12',
    question:
      'List five items of PPE that an electrical apprentice should wear on a typical construction site.',
    answer:
      'The five essential items are: (1) safety boots with steel or composite toe caps to BS EN ISO 20345, (2) a hard hat (safety helmet) to BS EN 397, (3) high-visibility vest or jacket to BS EN ISO 20471 Class 2 minimum, (4) safety glasses or goggles to BS EN 166, and (5) work gloves appropriate to the task. Additional PPE such as ear defenders, dust masks, and knee pads may be required depending on the specific activity.',
    category: 'PPE',
    difficulty: 'easy',
  },
  {
    id: 'te13',
    question: 'When must eye protection be worn during electrical installation work?',
    answer:
      'Eye protection to BS EN 166 must be worn whenever there is a risk of flying particles, dust, or chemical splash. Common electrical tasks requiring eye protection include drilling into masonry, chasing walls, cutting metal trunking or conduit, pulling cables through dusty voids, and working above head height where debris may fall. Safety glasses with side shields are the minimum; full goggles are needed for heavy dust or chemical exposure.',
    category: 'PPE',
    difficulty: 'easy',
  },
  {
    id: 'te14',
    question:
      'What class of safety helmet is required on a construction site, and what should you check before wearing one?',
    answer:
      "A safety helmet complying with BS EN 397 is the standard requirement on UK construction sites. Before wearing it, check the shell for cracks, dents, or UV degradation (chalky appearance), check the harness and headband for damage or wear, and confirm the helmet is within its manufacturer's expiry date (typically 5 years from manufacture). Helmets that have suffered an impact must be replaced immediately even if no visible damage is present.",
    category: 'PPE',
    difficulty: 'medium',
  },

  // === Access Equipment ===
  {
    id: 'te15',
    question:
      'What legislation governs working at height, and what is the key hierarchy of control it requires?',
    answer:
      'The Work at Height Regulations 2005 govern all work at height in the UK. The hierarchy of control requires employers to: (1) avoid work at height wherever possible, (2) use work equipment or other measures to prevent falls where height work cannot be avoided, and (3) minimise the distance and consequences of a fall if the risk cannot be eliminated. A risk assessment must be completed before any work at height takes place.',
    category: 'Access Equipment',
    difficulty: 'medium',
  },
  {
    id: 'te16',
    question: 'What angle should a leaning ladder be placed at, and how is this checked on site?',
    answer:
      'A leaning ladder must be placed at a 75-degree angle to the ground, which equates to a ratio of 1 out for every 4 up (the 1:4 rule). On site, this is checked by standing at the base of the ladder with toes touching it and reaching forward with arms outstretched - the hands should comfortably grip the rung at shoulder height. The ladder must extend at least 1 metre (approximately 3 rungs) above the landing point.',
    category: 'Access Equipment',
    difficulty: 'easy',
  },
  {
    id: 'te17',
    question: 'What checks must be carried out on a scaffold before use by an electrician?',
    answer:
      'Before using any scaffold, check that a current scaffold inspection tag is displayed (scaffolds must be inspected every 7 days and after any event likely to affect stability). Verify that all guardrails, toe boards, and mid-rails are in place, the platform is fully boarded with no gaps greater than 25 mm, the scaffold is tied to the structure, and safe access (usually an internal ladder) is provided. Only scaffolds erected by CISRS-trained scaffolders should be used.',
    category: 'Access Equipment',
    difficulty: 'hard',
  },

  // === Tool Safety ===
  {
    id: 'te18',
    question: 'What are cable rods, draw wire, and fish tape used for?',
    answer:
      'Cable rods are flexible fibreglass rods that screw together to form a long, semi-rigid rod for pushing through ceiling voids, wall cavities, and under floors to create a route for cables. Draw wire (or draw cord) is a strong nylon line pulled through conduit or trunking so that cables can be attached and drawn through afterwards. Fish tape is a flat steel or nylon strip on a reel, used to thread through conduit runs to pull cables. All three are essential cable-routing tools for first-fix installation.',
    category: 'Tool Safety',
    difficulty: 'easy',
  },
  {
    id: 'te19',
    question:
      'What is the purpose of cable glands, and what components make up a typical gland kit?',
    answer:
      "Cable glands provide a secure, weatherproof, and mechanically strong entry point for cables passing into enclosures such as consumer units, junction boxes, and motor terminal boxes. A typical gland kit includes the gland body (which compresses onto the cable's armour or outer sheath), a locknut, a shroud (to protect exposed armour wires), and an earth tag for maintaining the earth continuity of steel wire armoured (SWA) cables. The correct gland size must match the cable outer diameter.",
    category: 'Tool Safety',
    difficulty: 'medium',
  },
  {
    id: 'te20',
    question:
      'What is a spirit level used for in electrical installation, and when might a laser level be preferred?',
    answer:
      'A spirit level is used to ensure accessories, trunking runs, cable tray, and distribution boards are installed perfectly horizontal (level) or vertical (plumb). A laser level projects a visible line across a room or along a wall and is preferred for long runs of trunking or cable tray, aligning rows of light fittings, and marking out containment routes, as it frees up both hands and gives a consistent reference over longer distances. A chalk line is used to snap straight guidelines between two marked points on a surface.',
    category: 'Tool Safety',
    difficulty: 'easy',
  },
  {
    id: 'te21',
    question:
      'What basic functions does a multi-function tester (MFT) perform, and why is calibration important?',
    answer:
      'A multi-function tester combines several key electrical tests in one instrument: continuity of protective conductors, insulation resistance, loop impedance (Zs), RCD trip time, and prospective fault current (PSCC/PEFC). Calibration is critical because inaccurate readings could result in a dangerous installation being certified as safe. MFTs should be calibrated annually by an accredited laboratory and carry a valid calibration certificate with the next due date clearly marked.',
    category: 'Tool Safety',
    difficulty: 'hard',
  },
  {
    id: 'te22',
    question: 'What should be included in a routine visual inspection of hand tools before use?',
    answer:
      'Before each use, inspect hand tools for: cracked, split, or damaged insulation on VDE-rated tools; loose or damaged handles; worn or mushroomed heads on chisels and punches; blunt or chipped cutting edges; and any signs of corrosion or contamination. Damaged VDE insulation is particularly dangerous as it compromises protection against electric shock. Any defective tool must be immediately removed from service and either repaired or replaced.',
    category: 'Tool Safety',
    difficulty: 'medium',
  },
  {
    id: 'te23',
    question:
      "What are the employer's legal duties regarding tool inspection and maintenance under PUWER?",
    answer:
      'The Provision and Use of Work Equipment Regulations 1998 (PUWER) require employers to ensure all work equipment is suitable for its intended use, maintained in a safe condition, inspected at regular intervals, and that adequate training is provided. For electrical tools, this means regular visual inspections, PAT testing at appropriate intervals, maintaining inspection records, and ensuring defective equipment is withdrawn from service. Employees also have a duty to report defects.',
    category: 'Tool Safety',
    difficulty: 'hard',
  },
  {
    id: 'te24',
    question:
      'What colour are 110 V plugs, sockets, and extension leads, and why does this matter?',
    answer:
      '110 V plugs, sockets, and extension leads are coloured yellow to distinguish them from 230 V equipment (which uses blue for industrial or white for domestic). This colour coding, specified in BS 4343 / BS EN 60309, is a vital safety measure on construction sites as it allows workers to quickly identify the voltage rating and prevent 230 V equipment from being connected to the wrong supply. The yellow 110 V 16 A connector has a specific keyway that physically prevents cross-connection.',
    category: 'Tool Safety',
    difficulty: 'medium',
  },
  {
    id: 'te25',
    question:
      'Why must an electrician never use a damaged or non-calibrated torque screwdriver, and how are they maintained?',
    answer:
      'A damaged or non-calibrated torque screwdriver may apply incorrect torque to terminals, leading to loose connections that overheat or over-tight connections that damage components. Under BS 7671 Regulation 526.9, all connections must be mechanically and electrically sound, and manufacturers specify exact torque values for their terminals. Torque screwdrivers should be stored with the torque setting wound down to zero to preserve the internal spring, kept clean and dry, and recalibrated at intervals recommended by the manufacturer (typically annually).',
    category: 'Tool Safety',
    difficulty: 'hard',
  },
];
