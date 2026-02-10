import { FlashcardData } from "./types";

export const bs7671Regulations: FlashcardData[] = [
  // ── Preserved cards bs1–bs5 ──────────────────────────────────────────
  {
    id: "bs1",
    question: "What is the current edition of BS 7671?",
    answer: "18th Edition (2018) with Amendment 2 (2022)",
    category: "Parts & Structure",
    difficulty: "easy",
  },
  {
    id: "bs2",
    question: "What does SELV stand for?",
    answer: "Separated Extra Low Voltage",
    category: "Definitions",
    difficulty: "medium",
  },
  {
    id: "bs3",
    question:
      "What is the maximum disconnection time for a 32A circuit in a TN system?",
    answer: "0.4 seconds",
    category: "Disconnection Times",
    difficulty: "hard",
  },
  {
    id: "bs4",
    question:
      "What is the minimum cross-sectional area for a main earthing conductor in copper?",
    answer: "16mm\u00B2",
    category: "Protection",
    difficulty: "medium",
  },
  {
    id: "bs5",
    question: "What is the purpose of RCD protection?",
    answer:
      "Protection against electric shock and fire caused by earth faults",
    category: "Protection",
    difficulty: "easy",
  },

  // ── New cards bs6–bs25 ───────────────────────────────────────────────

  // Parts & Structure
  {
    id: "bs6",
    question:
      "What does Part 1 of BS 7671 cover?",
    answer:
      "Scope, object and fundamental principles — it sets out the rules' applicability and the basic safety objectives.",
    category: "Parts & Structure",
    difficulty: "easy",
  },
  {
    id: "bs7",
    question:
      "Which part of BS 7671 deals with the selection and erection of equipment?",
    answer:
      "Part 5 — it covers wiring systems, switching devices, earthing arrangements and other equipment.",
    category: "Parts & Structure",
    difficulty: "medium",
  },
  {
    id: "bs8",
    question:
      "Part 6 of BS 7671 covers which critical stage of an electrical installation?",
    answer:
      "Inspection, testing and certification — including initial verification and periodic inspection.",
    category: "Parts & Structure",
    difficulty: "easy",
  },
  {
    id: "bs9",
    question:
      "Part 7 of BS 7671 addresses special installations or locations. Name three examples covered.",
    answer:
      "Bathrooms (Section 701), swimming pools (Section 702), and construction sites (Section 704). Others include agricultural premises, marinas, and solar PV installations.",
    category: "Parts & Structure",
    difficulty: "medium",
  },

  // Disconnection Times
  {
    id: "bs10",
    question:
      "In a TT system, what is the maximum disconnection time for a final circuit not exceeding 32A?",
    answer:
      "0.2 seconds (Table 41.1 of BS 7671).",
    category: "Disconnection Times",
    difficulty: "hard",
  },
  {
    id: "bs11",
    question:
      "What is the maximum disconnection time for a distribution circuit in a TN system?",
    answer:
      "5 seconds (Regulation 411.3.2.3).",
    category: "Disconnection Times",
    difficulty: "medium",
  },
  {
    id: "bs12",
    question:
      "A 20A socket-outlet circuit is installed in a TN-S system. What maximum Zs value would you expect for a Type B MCB at 20A to achieve disconnection within 0.4 seconds?",
    answer:
      "1.15 ohms (from Table 41.3 in BS 7671, for a 20A Type B MCB in a TN system).",
    category: "Disconnection Times",
    difficulty: "hard",
  },

  // IP Ratings
  {
    id: "bs13",
    question:
      "In an IP rating such as IP44, what do the first and second digits represent?",
    answer:
      "The first digit indicates protection against solid objects (4 = objects greater than 1 mm). The second digit indicates protection against water ingress (4 = splashing water from all directions).",
    category: "IP Ratings",
    difficulty: "easy",
  },
  {
    id: "bs14",
    question:
      "What minimum IP rating is generally required for equipment installed in Zone 1 of a bathroom?",
    answer:
      "IPX4 minimum (protection against splashing water). If water jets are likely to be used for cleaning, IPX5 is required.",
    category: "IP Ratings",
    difficulty: "medium",
  },

  // Special Locations
  {
    id: "bs15",
    question:
      "In a bathroom installation under Section 701 of BS 7671, what voltage limit applies to equipment in Zone 0?",
    answer:
      "Only SELV at a maximum of 12V AC or 30V DC ripple-free is permitted in Zone 0.",
    category: "Special Locations",
    difficulty: "medium",
  },
  {
    id: "bs16",
    question:
      "You are wiring a swimming pool area. According to Section 702, what is the extent of Zone 0?",
    answer:
      "Zone 0 is the interior of the pool basin, including any recesses in its walls or floor, and the water volume up to the rim.",
    category: "Special Locations",
    difficulty: "hard",
  },
  {
    id: "bs17",
    question:
      "Section 708 of BS 7671 covers electrical installations on which type of site?",
    answer:
      "Caravan parks and camping parks — covering the supply to each caravan or tent pitch.",
    category: "Special Locations",
    difficulty: "easy",
  },
  {
    id: "bs18",
    question:
      "A client asks you to install a sauna heater. Under which section of Part 7 would you find the specific requirements?",
    answer:
      "Section 703 — Rooms and cabins containing sauna heaters.",
    category: "Special Locations",
    difficulty: "medium",
  },

  // Amendment 2 Key Changes
  {
    id: "bs19",
    question:
      "Amendment 2 (2022) introduced requirements for prosumer's installations. What is a prosumer's installation?",
    answer:
      "An electrical installation that can both consume and generate (or store) electrical energy — for example a domestic property with solar PV and battery storage.",
    category: "Parts & Structure",
    difficulty: "medium",
  },
  {
    id: "bs20",
    question:
      "What key change did Amendment 2 make regarding Arc Fault Detection Devices (AFDDs)?",
    answer:
      "Amendment 2 added a recommendation (not a mandatory requirement) to install AFDDs for final circuits in certain higher-risk locations such as premises with sleeping accommodation and locations with combustible construction materials (Regulation 421.1.7).",
    category: "Protection",
    difficulty: "hard",
  },

  // ADS & Protection
  {
    id: "bs21",
    question:
      "What does ADS stand for and what are its two essential requirements?",
    answer:
      "Automatic Disconnection of Supply. It requires: (1) a protective earthing conductor connecting exposed-conductive-parts to the main earthing terminal, and (2) an overcurrent or RCD protective device that disconnects within the required time.",
    category: "Protection",
    difficulty: "medium",
  },
  {
    id: "bs22",
    question:
      "Explain the difference between basic protection and fault protection under BS 7671.",
    answer:
      "Basic protection prevents contact with live parts under normal conditions (e.g. insulation, barriers, enclosures). Fault protection prevents danger when a fault makes exposed-conductive-parts live (e.g. earthing combined with automatic disconnection of supply).",
    category: "Protection",
    difficulty: "easy",
  },

  // Definitions
  {
    id: "bs23",
    question:
      "What is the definition of an 'extraneous-conductive-part' in BS 7671?",
    answer:
      "A conductive part liable to introduce a potential, generally Earth potential, and not forming part of the electrical installation — for example metal water pipes, structural steelwork, or gas pipes.",
    category: "Definitions",
    difficulty: "medium",
  },
  {
    id: "bs24",
    question:
      "What does PELV stand for, and how does it differ from SELV?",
    answer:
      "Protective Extra Low Voltage. Unlike SELV, PELV permits one connection to Earth. Both operate at extra-low voltage (not exceeding 50V AC or 120V DC), but SELV must be electrically separated from Earth.",
    category: "Definitions",
    difficulty: "hard",
  },

  // Regulation Numbers / Exam-style
  {
    id: "bs25",
    question:
      "Regulation 411.3.3 requires that, in a TT system, the product of RA and I\u0394n must not exceed which value?",
    answer:
      "50V. The earth fault loop impedance (RA) multiplied by the rated residual operating current (I\u0394n) of the RCD must not exceed 50V to ensure automatic disconnection provides adequate shock protection.",
    category: "Protection",
    difficulty: "hard",
  },
];
