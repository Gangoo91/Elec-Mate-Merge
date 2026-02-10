import { FlashcardData } from "./types";

export const wiringSystems: FlashcardData[] = [
  // ── Conduit ────────────────────────────────────────────────────────────

  {
    id: "ws1",
    question: "What is the space factor for cables drawn into conduit?",
    answer:
      "40%. This means cables should occupy no more than 40% of the internal cross-sectional area of the conduit, allowing room to draw cables through without damage.",
    category: "Conduit",
    difficulty: "easy",
  },
  {
    id: "ws2",
    question:
      "What are the two gauges of PVC conduit and when would you use each?",
    answer:
      "Light gauge (LG) — for surface mounting indoors in dry, non-mechanical-risk areas. Heavy gauge (HG) — for concealed work (buried in plaster or concrete) and areas where impact or compression is likely.",
    category: "Conduit",
    difficulty: "medium",
  },
  {
    id: "ws3",
    question:
      "Steel conduit is commonly galvanised. Can it be used as a circuit protective conductor (CPC)?",
    answer:
      "Yes. Provided all joints are mechanically and electrically sound and the conduit satisfies the requirements of BS 7671 Regulation 543.2 for CPC sizing, galvanised steel conduit may serve as the CPC.",
    category: "Conduit",
    difficulty: "medium",
  },
  {
    id: "ws4",
    question:
      "What is the maximum number of 90° bends permitted between draw-in points in a conduit run?",
    answer:
      "Two 90° bends (equivalent to 180° total) between draw-in points. Exceeding this makes cable pulling excessively difficult and risks damaging the insulation.",
    category: "Conduit",
    difficulty: "easy",
  },
  {
    id: "ws5",
    question:
      "Name three common conduit fittings used to provide access for drawing in cables.",
    answer:
      "Inspection bends (inspection elbows), through boxes (straight-through adaptable boxes), and tee pieces. These provide draw-in points to keep cable runs manageable.",
    category: "Conduit",
    difficulty: "easy",
  },
  {
    id: "ws6",
    question:
      "Scenario: You are installing a conduit run on a surface in a warehouse where fork-lift trucks operate nearby. Should you choose PVC or steel conduit, and why?",
    answer:
      "Steel conduit. It offers far greater mechanical protection against impact and crushing. PVC conduit would crack or shatter under impact from a fork-lift truck or other heavy equipment.",
    category: "Conduit",
    difficulty: "medium",
  },
  {
    id: "ws7",
    question:
      "What is the minimum bending radius for a conduit to avoid kinking or restricting cable entry?",
    answer:
      "The internal radius of the bend should be not less than 2.5 times the outside diameter of the conduit. This prevents deformation and ensures cables can be drawn through without damage.",
    category: "Conduit",
    difficulty: "medium",
  },

  // ── Trunking ───────────────────────────────────────────────────────────

  {
    id: "ws8",
    question:
      "What is the space factor (cable capacity factor) for cables laid into trunking?",
    answer:
      "45%. Because cables are laid in rather than pulled through, a slightly higher fill ratio than conduit (40%) is permitted.",
    category: "Trunking",
    difficulty: "easy",
  },
  {
    id: "ws9",
    question: "Name four types of trunking commonly used in electrical installations.",
    answer:
      "PVC trunking, steel trunking, dado trunking (fitted at desk height in offices), skirting trunking (replaces skirting boards), and floor trunking (recessed into or laid on the floor). Mini-trunking is also common for surface wiring.",
    category: "Trunking",
    difficulty: "easy",
  },
  {
    id: "ws10",
    question:
      "Scenario: An architect specifies that power and data cabling must run together around the perimeter of an open-plan office at desk height. What trunking type would you recommend and how must the cables be separated?",
    answer:
      "Dado trunking with internal compartments (segregation barriers). Band I (data/telecom) and Band II (mains power) circuits must be physically separated by a rigid partition within the trunking, per BS 7671 Regulation 528.1.",
    category: "Trunking",
    difficulty: "hard",
  },

  // ── SWA Cable ──────────────────────────────────────────────────────────

  {
    id: "ws11",
    question:
      "Describe the construction layers of a typical SWA (Steel Wire Armoured) cable from the inside out.",
    answer:
      "Copper (or aluminium) conductors → XLPE or PVC insulation → bedding (inner sheath) → steel wire armour → PVC outer sheath (oversheath). The armour provides mechanical protection.",
    category: "SWA Cable",
    difficulty: "medium",
  },
  {
    id: "ws12",
    question:
      "Can the steel wire armour of an SWA cable be used as a CPC?",
    answer:
      "Yes, provided the armour cross-sectional area satisfies the adiabatic equation in BS 7671 Regulation 543.1.3 and is correctly terminated with the appropriate glands to maintain earth continuity.",
    category: "SWA Cable",
    difficulty: "medium",
  },
  {
    id: "ws13",
    question:
      "What are the two main types of cable gland used with SWA cable, and when is each used?",
    answer:
      "CW glands — for indoor use where no weatherproofing is needed. BW glands — for outdoor or weatherproof applications, providing a seal against moisture ingress. Both types must earth the armour correctly.",
    category: "SWA Cable",
    difficulty: "medium",
  },
  {
    id: "ws14",
    question:
      "Scenario: You are running an SWA cable underground from a distribution board to an outbuilding. What minimum burial depth and additional protection does BS 7671 recommend?",
    answer:
      "A minimum depth of 500 mm (600 mm under roads). The cable should be laid on a bed of sand or fine soil, covered with protective tiles or tape, and a marker tape placed above to warn of buried cables. Route markers should be provided at changes of direction.",
    category: "SWA Cable",
    difficulty: "hard",
  },

  // ── MICC Cable ─────────────────────────────────────────────────────────

  {
    id: "ws15",
    question:
      "What does MICC stand for and what gives this cable its fire-resistant properties?",
    answer:
      "Mineral Insulated Copper Clad. The insulation is compressed magnesium oxide (MgO) powder, which is completely inorganic and non-combustible — it cannot burn or produce toxic fumes, giving it inherent fire resistance.",
    category: "MICC Cable",
    difficulty: "easy",
  },
  {
    id: "ws16",
    question:
      "Why must MICC cable ends be sealed immediately after cutting, and what is used to seal them?",
    answer:
      "Magnesium oxide insulation is highly hygroscopic — it absorbs moisture from the air, which drastically reduces its insulation resistance. A proprietary pot seal (compression seal) with a disc and sealing compound is fitted to each termination to prevent moisture ingress.",
    category: "MICC Cable",
    difficulty: "medium",
  },
  {
    id: "ws17",
    question:
      "Scenario: A fire alarm system must maintain circuit integrity for at least two hours during a fire. Which cable type would you specify and why?",
    answer:
      "MICC (mineral insulated) cable. Its copper sheath and magnesium oxide insulation can withstand fire exposure well beyond two hours, maintaining circuit integrity. It is commonly specified to meet BS 5839 fire alarm standards and BS 8519 for fire-resistant cable selection.",
    category: "MICC Cable",
    difficulty: "hard",
  },

  // ── Cable Tray ─────────────────────────────────────────────────────────

  {
    id: "ws18",
    question:
      "What is the difference between cable tray and cable ladder, and when would you use each?",
    answer:
      "Cable tray is a flat perforated or mesh platform suited for lighter cables and smaller installations. Cable ladder has side rails with rungs and is used for heavier, larger-diameter cables (e.g. SWA) and long horizontal or vertical runs where greater support and ventilation are needed.",
    category: "Cable Tray",
    difficulty: "easy",
  },
  {
    id: "ws19",
    question:
      "What is the general rule for minimum bending radius when installing power cables on tray or ladder?",
    answer:
      "Typically six times the overall cable diameter for unarmoured cables and eight times for armoured cables, though manufacturers' specific data should always be consulted. Insufficient bending radius damages insulation and conductors.",
    category: "Cable Tray",
    difficulty: "medium",
  },

  // ── IP Ratings ─────────────────────────────────────────────────────────

  {
    id: "ws20",
    question:
      "In the IP rating system (e.g. IP65), what does each digit represent?",
    answer:
      "The first digit (0–6) indicates protection against ingress of solid objects (dust, fingers, tools). The second digit (0–9) indicates protection against ingress of water (drips, jets, immersion). Higher numbers mean greater protection.",
    category: "IP Ratings",
    difficulty: "easy",
  },
  {
    id: "ws21",
    question:
      "State the meaning of the following IP ratings: IP20, IP44, IP65, and IP68.",
    answer:
      "IP20 — protected against solid objects >12 mm (fingers), no water protection (indoor dry use). IP44 — protected against objects >1 mm and splashing water from any direction. IP65 — dust-tight and protected against water jets. IP68 — dust-tight and protected against continuous immersion beyond 1 m depth.",
    category: "IP Ratings",
    difficulty: "medium",
  },

  // ── Installation Methods ───────────────────────────────────────────────

  {
    id: "ws22",
    question:
      "What are the maximum spacing requirements for cable clips supporting flat twin-and-earth cable run horizontally?",
    answer:
      "For 1.0 mm² and 1.5 mm² flat twin-and-earth cable run horizontally, clips should be spaced at no more than 250 mm intervals. For 2.5 mm² and above, spacing can be up to 300 mm. Vertical runs require clips at 400 mm intervals.",
    category: "Installation Methods",
    difficulty: "medium",
  },
  {
    id: "ws23",
    question:
      "Scenario: You need to run cables through a fire-rated wall in a commercial building. What must you do to maintain the fire rating?",
    answer:
      "Every penetration through a fire-rated wall or floor must be fire-stopped using approved intumescent sealant, mortar, or proprietary fire-stop devices to restore the original fire rating. This is a requirement of BS 7671 Regulation 527.2 and the Building Regulations Approved Document B.",
    category: "Installation Methods",
    difficulty: "hard",
  },
  {
    id: "ws24",
    question:
      "What is meant by segregation of Band I and Band II circuits, and why is it required?",
    answer:
      "Band I covers extra-low voltage circuits (e.g. data, telecom, fire alarm) and Band II covers low voltage mains circuits (230/400 V). BS 7671 Regulation 528.1 requires physical separation (barriers, partitions, or separate enclosures) to prevent induced voltages from Band II circuits interfering with or damaging Band I equipment.",
    category: "Installation Methods",
    difficulty: "hard",
  },
  {
    id: "ws25",
    question:
      "Scenario: You are installing a consumer unit in a domestic property. The cables enter through the top of the enclosure. What IP rating must the consumer unit achieve when installed, and what step must you take with unused knockouts?",
    answer:
      "The consumer unit must achieve at least IP2X (or IPXXB) when installed, per BS 7671 Amendment 3 Regulation 132.12. All unused cable entry knockouts must be blanked off with appropriate blanking plates to prevent finger access to live parts and to maintain the required IP rating.",
    category: "Installation Methods",
    difficulty: "hard",
  },
];
