import { FlashcardData } from "./types";

export const firstAndSecondFix: FlashcardData[] = [
  // === FIRST FIX (fsf1–fsf8) ===
  {
    id: "fsf1",
    question: "What does 'first fix' mean in electrical installation?",
    answer:
      "First fix covers all electrical work carried out before plastering and decoration. This includes running cables, fitting back boxes, installing containment (trunking, conduit), mounting consumer units, and any work that will be hidden behind finished surfaces.",
    category: "First Fix",
    difficulty: "easy",
  },
  {
    id: "fsf2",
    question: "What does 'second fix' mean in electrical installation?",
    answer:
      "Second fix covers all electrical work carried out after plastering and decoration. This includes fitting faceplates, socket outlets, light fittings, switches, terminating conductors, labelling circuits, and carrying out inspection and testing.",
    category: "Second Fix",
    difficulty: "easy",
  },
  {
    id: "fsf3",
    question:
      "What are the three common back box depths, and when would you use each?",
    answer:
      "25 mm — used for single switches and faceplates with minimal wiring. 35 mm — standard depth for most socket outlets and switches. 47 mm — used where extra conductor space is needed, such as double sockets on ring finals, dimmer switches, or where multiple cables enter the same box.",
    category: "Back Boxes",
    difficulty: "easy",
  },
  {
    id: "fsf4",
    question:
      "According to BS 7671 Regulation 522.6.101, what are the 'safe zones' for cable routes in walls?",
    answer:
      "Cables must run in prescribed safe zones: horizontally within 150 mm of the top of the wall or ceiling, horizontally within 150 mm of a finished floor, vertically within 150 mm of the edge of a wall or partition, and horizontally or vertically to an accessory within 150 mm of that accessory. Cables outside safe zones must be protected by 30 mA RCD or earthed metal covering.",
    category: "Cable Routes",
    difficulty: "medium",
  },
  {
    id: "fsf5",
    question:
      "What are the depth limits for chasing walls to install cables, and what structural considerations apply?",
    answer:
      "For standard masonry walls, horizontal chases should be no deeper than one-sixth of the wall thickness, and vertical chases no deeper than one-third. Chases should not be positioned back-to-back on opposite sides of a wall. On load-bearing walls, always consult the structural engineer. Chases in concrete lintels, beams, or structural columns are not permitted.",
    category: "Cable Routes",
    difficulty: "medium",
  },
  {
    id: "fsf6",
    question:
      "What are the rules for notching and drilling timber joists to run cables?",
    answer:
      "Notches must be cut in the top of the joist, within the first quarter of the span from each support, to a maximum depth of one-eighth of the joist depth. Holes must be drilled on the centre line (neutral axis) of the joist, positioned between one-quarter and three-quarters of the span, with a maximum diameter of one-quarter of the joist depth. Holes must be at least three diameters apart (centre to centre).",
    category: "Cable Routes",
    difficulty: "medium",
  },
  {
    id: "fsf7",
    question:
      "What are the typical clipping distances for flat twin and earth cable (6241Y/6242Y) when installed on a surface?",
    answer:
      "For 1.0 mm² and 1.5 mm² twin and earth cable, clips should be spaced at 250 mm intervals on horizontal runs and 400 mm on vertical runs. For 2.5 mm² and above, clips should be at 300 mm horizontal and 400 mm vertical. At bends, additional clips should be placed within 150 mm of each side of the bend to prevent the cable pulling away.",
    category: "First Fix",
    difficulty: "easy",
  },
  {
    id: "fsf8",
    question:
      "Scenario: You are carrying out first fix on a new-build kitchen. List the key tasks you would complete before the plasterers arrive.",
    answer:
      "Install back boxes for all socket outlets, switches, and spurs. Run cable routes in safe zones for ring final, lighting, cooker circuit, and any dedicated appliance circuits (dishwasher, fridge). Install conduit or trunking where required. Fit the consumer unit enclosure. Pull cables into the consumer unit location but do not terminate. Run cables for extractor fan, outside light, and any smart home cabling. Install fire-rated back boxes where required. Take photographs of all concealed cable routes before plastering for records.",
    category: "First Fix",
    difficulty: "medium",
  },

  // === CONSUMER UNITS & MAIN SWITCH (fsf9–fsf12) ===
  {
    id: "fsf9",
    question:
      "Since January 2016, what requirement applies to consumer units in domestic premises, and which amendment introduced it?",
    answer:
      "Amendment 3 (AMD3) to BS 7671:2008 requires that all consumer units and similar switchgear assemblies in domestic premises must be constructed of non-combustible material, which in practice means a metal enclosure. This was introduced to reduce the risk of fire spreading from a faulty consumer unit. The requirement is now carried forward in BS 7671:2018+A2:2022.",
    category: "Consumer Units",
    difficulty: "medium",
  },
  {
    id: "fsf10",
    question:
      "What is the typical main switch rating for a domestic consumer unit, and what standard applies?",
    answer:
      "The typical domestic main switch is rated at 100 A, double-pole (DP), and must be capable of isolating all line and neutral conductors simultaneously. It must comply with BS EN 60947-3 or BS EN 61009 (for RCCB type). The main switch must be suitable for isolation as defined in BS 7671 Regulation 537.1.",
    category: "Consumer Units",
    difficulty: "easy",
  },
  {
    id: "fsf11",
    question:
      "What precautions must be taken when cables enter a metal consumer unit?",
    answer:
      "All cable entries into a metal consumer unit must use rubber grommets or proprietary cable entry plates to prevent the cable sheath from being damaged by sharp metal edges. The earth conductor of each circuit must be securely terminated in the consumer unit earth bar. Cable management within the enclosure must ensure conductors are neatly dressed and do not obstruct operation of MCBs, RCBOs, or the main switch.",
    category: "Consumer Units",
    difficulty: "medium",
  },
  {
    id: "fsf12",
    question:
      "Explain the requirements for circuit identification and labelling at a consumer unit under BS 7671.",
    answer:
      "Regulation 514.8.1 requires a durable label at or near each distribution board identifying every circuit. The label must state the circuit number, the purpose of the circuit (e.g. 'Kitchen sockets'), the protective device type and rating, and the design current. A circuit chart must be fixed inside or adjacent to the consumer unit. Labels must be durable and legible for the life of the installation.",
    category: "Consumer Units",
    difficulty: "medium",
  },

  // === SECOND FIX & TERMINATION (fsf13–fsf17) ===
  {
    id: "fsf13",
    question:
      "What is the correct technique for stripping and terminating conductors at socket outlets and switches?",
    answer:
      "Strip the outer sheath using a cable knife or sheath stripper, taking care not to nick the inner insulation. Strip individual conductor insulation to the correct length — typically 8–10 mm for screw terminals, or as marked on push-fit connectors. Ensure no bare conductor is visible outside the terminal. Apply the correct torque to terminal screws using a torque screwdriver (typically 1.2 Nm for standard accessories). Sleeve the earth conductor with green/yellow sleeving.",
    category: "Termination",
    difficulty: "medium",
  },
  {
    id: "fsf14",
    question:
      "Why are torque settings important when terminating conductors, and what happens if they are incorrect?",
    answer:
      "Under-tightening causes a loose connection, which leads to increased resistance, localised heating, arcing, and potentially fire. Over-tightening can damage the conductor, break the terminal screw, or crack the accessory. BS 7671 Regulation 526.1 requires connections to be made in a manner that ensures a durable electrical continuity and adequate mechanical strength. Manufacturers' recommended torque values must always be followed.",
    category: "Termination",
    difficulty: "hard",
  },
  {
    id: "fsf15",
    question:
      "What is the recommended mounting height range for socket outlets under Approved Document M of the Building Regulations?",
    answer:
      "Approved Document M recommends socket outlets be mounted between 450 mm and 1200 mm from finished floor level in habitable rooms. BS 7671 itself does not specify mounting heights — the requirements come from Part M of the Building Regulations, which deals with access and use of buildings. Light switches should be between 900 mm and 1100 mm from floor level. These heights ensure accessibility for people with reduced mobility.",
    category: "Second Fix",
    difficulty: "easy",
  },
  {
    id: "fsf16",
    question:
      "Scenario: During second fix, you find that a back box has been set too deep by the plasterer. What are your options?",
    answer:
      "Options include: fitting a spacer or packing piece behind the faceplate to bring it forward to the finished wall surface; using a deeper faceplate designed for recessed boxes; or, if the gap is excessive, carefully cutting back the plaster and refitting the back box at the correct depth. The faceplate must sit flush with or slightly proud of the finished surface to comply with good workmanship standards. Gaps should not exceed 1–2 mm to prevent entry of foreign objects.",
    category: "Second Fix",
    difficulty: "easy",
  },
  {
    id: "fsf17",
    question:
      "Scenario: You are terminating circuits at a metal consumer unit and notice the tails are aluminium. What considerations apply?",
    answer:
      "Aluminium tails require anti-oxidant compound on the stripped conductor before termination to prevent oxide build-up and high-resistance joints. The terminal must be rated for aluminium conductors. Due to aluminium's higher coefficient of expansion, connections may loosen over time and should be re-torqued. Consider recommending replacement with copper tails to the client. If aluminium tails are retained, ensure they are adequately sized — typically 25 mm² aluminium is equivalent to 16 mm² copper.",
    category: "Consumer Units",
    difficulty: "hard",
  },

  // === TESTING & CERTIFICATION (fsf18–fsf22) ===
  {
    id: "fsf18",
    question:
      "What is the correct sequence for testing a new installation after first and second fix are complete?",
    answer:
      "Dead tests first, then live tests. The sequence is: (1) Continuity of protective conductors (including main and supplementary bonding), (2) Continuity of ring final circuit conductors, (3) Insulation resistance, (4) Polarity (dead test), (5) Earth fault loop impedance (live test), (6) RCD operation times (live test), (7) Prospective fault current (live test), (8) Functional testing of all switchgear, controls, and interlocks. This sequence is set out in BS 7671 Chapter 64 and IET Guidance Note 3.",
    category: "Testing Sequence",
    difficulty: "medium",
  },
  {
    id: "fsf19",
    question:
      "Why must dead tests be carried out before live tests on a new installation?",
    answer:
      "Dead tests verify the safety of the installation before any supply is connected. Continuity tests confirm that protective conductors are correctly connected and will operate under fault conditions. Insulation resistance tests confirm there are no short circuits, faults to earth, or cross-polarity issues. If live tests were carried out first on a faulty installation, there would be a risk of electric shock, equipment damage, or fire. Safe working practice and BS 7671 require dead tests to be satisfactory before energisation.",
    category: "Testing Sequence",
    difficulty: "easy",
  },
  {
    id: "fsf20",
    question:
      "What certificate or form is required for adding a single socket outlet to an existing circuit?",
    answer:
      "A Minor Electrical Installation Works Certificate (MEIWC) is required. This covers additions and alterations to an existing circuit that do not involve the provision of a new circuit. The MEIWC must record the description of the work, the method of protection against electric shock, details of the existing circuit (including protective device rating and earth fault loop impedance), and the results of essential tests — at minimum, insulation resistance, earth continuity, polarity, and RCD operation if applicable.",
    category: "Testing Sequence",
    difficulty: "medium",
  },
  {
    id: "fsf21",
    question:
      "Under Part P of the Building Regulations, which types of domestic electrical work are notifiable?",
    answer:
      "Notifiable work includes: installation of a new circuit, replacement of a consumer unit, work in special locations (bathrooms, swimming pools, saunas), and any addition or alteration to existing circuits in special locations. Non-notifiable work includes like-for-like replacements of accessories (sockets, switches, light fittings), and additions or alterations to existing circuits outside special locations, provided the work does not involve a new circuit. Notifiable work must be certified by a registered competent person scheme or via Building Control notification.",
    category: "First Fix",
    difficulty: "hard",
  },
  {
    id: "fsf22",
    question:
      "Scenario: You have completed a full domestic rewire. Which certificate must you issue, and what key information must it contain?",
    answer:
      "An Electrical Installation Certificate (EIC) must be issued, along with a Schedule of Inspections and a Schedule of Test Results for every circuit. The EIC must include: the designer's, installer's, and inspector's details and signatures; a description of the installation and extent of work covered; the supply characteristics (voltage, fault level, earthing arrangement); details of the means of earthing; confirmation that the installation complies with BS 7671; and any departures from the standard with justification.",
    category: "Testing Sequence",
    difficulty: "hard",
  },

  // === PRACTICAL & SCENARIO CARDS (fsf23–fsf25) ===
  {
    id: "fsf23",
    question:
      "What containment options are available during first fix, and what factors influence the choice?",
    answer:
      "Options include: PVC oval conduit (for cables in walls before plastering), PVC round conduit (surface or concealed), steel conduit (where mechanical protection is needed), PVC trunking (surface-mounted for multiple cables), steel trunking (fire-rated or industrial environments), and cable tray (commercial ceiling voids). Factors include: the number of cables, the environment (moisture, temperature, mechanical risk), fire rating requirements, accessibility for future maintenance, cost, and client specification.",
    category: "First Fix",
    difficulty: "medium",
  },
  {
    id: "fsf24",
    question:
      "Scenario: During first fix in a timber-frame house, the builder asks you to run cables through steel noggins. What considerations apply?",
    answer:
      "Where cables pass through steel noggins or metal studs, rubber grommets or proprietary cable bushings must be fitted to protect the cable sheath from abrasion and damage by sharp metal edges. The cable must be fully enclosed where it passes through the metal, with no bare sheath exposed to the edge. Consider the thermal effects of the steel on cable current-carrying capacity. Ensure the cable route still follows safe zones. In timber-frame construction, fire stopping at every penetration through fire barriers is also required under the Building Regulations.",
    category: "Cable Routes",
    difficulty: "hard",
  },
  {
    id: "fsf25",
    question:
      "Scenario: A homeowner asks why you cannot simply connect a new cooker circuit to a spare MCB way in the existing consumer unit. What should you explain?",
    answer:
      "You must first confirm the existing consumer unit has adequate spare capacity and that the main switch and incoming supply can handle the additional load. The existing earth fault loop impedance and prospective fault current must be verified. The spare MCB way must accept a device of the correct type and rating for the cooker circuit (typically 32 A Type B). If the consumer unit is an older plastic type, it may need replacing with a metal unit to comply with current regulations. The new circuit is notifiable under Part P of the Building Regulations, so it must be certified through a competent person scheme or Building Control. A full Electrical Installation Certificate is required for the new circuit.",
    category: "Second Fix",
    difficulty: "hard",
  },
];
