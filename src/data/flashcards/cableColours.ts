import { FlashcardData } from "./types";

export const cableColours: FlashcardData[] = [
  // ── Existing cards cc1–cc5 (preserved exactly) ──────────────────────
  {
    id: "cc1",
    question: "What colour is the live wire in a UK domestic installation?",
    answer: "Brown",
    category: "Domestic Colours",
    difficulty: "easy",
  },
  {
    id: "cc2",
    question: "What colour is the neutral wire in a UK domestic installation?",
    answer: "Blue",
    category: "Domestic Colours",
    difficulty: "easy",
  },
  {
    id: "cc3",
    question: "What colour is the earth wire in a UK domestic installation?",
    answer: "Green and Yellow (striped)",
    category: "Domestic Colours",
    difficulty: "easy",
  },
  {
    id: "cc4",
    question:
      "In a three-phase system, what are the three line colours?",
    answer: "Brown (L1), Black (L2), Grey (L3)",
    category: "Three-Phase",
    difficulty: "medium",
  },
  {
    id: "cc5",
    question:
      "What colour was the old live wire before harmonisation?",
    answer: "Red",
    category: "Harmonisation",
    difficulty: "medium",
  },

  // ── New cards cc6–cc25 ──────────────────────────────────────────────

  // cc6 – Harmonisation / easy
  {
    id: "cc6",
    question:
      "What colour was the neutral conductor before the harmonisation changes?",
    answer:
      "Black. Under the old BS 7671 colours, neutral was black. It changed to blue to align with European CENELEC harmonised standards.",
    category: "Harmonisation",
    difficulty: "easy",
  },

  // cc7 – Harmonisation / easy
  {
    id: "cc7",
    question:
      "What colour was the earth (CPC) before harmonisation?",
    answer:
      "Green only. The green-and-yellow striped identification was introduced by the harmonised colour standard; previously the CPC was plain green.",
    category: "Harmonisation",
    difficulty: "easy",
  },

  // cc8 – Harmonisation / medium
  {
    id: "cc8",
    question:
      "In which year did the new harmonised cable colours become permitted for new UK installations, and when did they become mandatory?",
    answer:
      "New colours were permitted from 31 March 2004 (Amendment 2 to BS 7671:2001). They became mandatory for all new installations from 1 April 2006. Existing installations could retain old colours.",
    category: "Harmonisation",
    difficulty: "medium",
  },

  // cc9 – Harmonisation / hard
  {
    id: "cc9",
    question:
      "Under BS 7671, what must be done if old and new cable colours exist in the same installation?",
    answer:
      "A warning label must be fixed at or near the appropriate distribution board stating that the installation contains wiring with two different colour codes. This is required by Regulation 514.14 to prevent confusion and potential danger.",
    category: "Harmonisation",
    difficulty: "hard",
  },

  // cc10 – Three-Phase / medium
  {
    id: "cc10",
    question:
      "What were the three line colours in an old (pre-harmonisation) three-phase system?",
    answer:
      "Red (L1), Yellow (L2), Blue (L3). These were replaced by Brown, Black, and Grey respectively under the harmonised standard.",
    category: "Three-Phase",
    difficulty: "medium",
  },

  // cc11 – Three-Phase / medium
  {
    id: "cc11",
    question:
      "A three-phase SWA cable has brown, black, and grey cores. How do you identify the neutral?",
    answer:
      "The neutral is blue. In a four-core three-phase cable the cores are Brown (L1), Black (L2), Grey (L3), and Blue (N). The CPC is usually the steel wire armour itself or a separate green-and-yellow conductor.",
    category: "Three-Phase",
    difficulty: "medium",
  },

  // cc12 – SWA / medium
  {
    id: "cc12",
    question:
      "You strip back a two-core SWA cable and find brown and blue cores. What are their functions?",
    answer:
      "Brown is the line (live) conductor and blue is the neutral, matching standard harmonised single-phase colours. The steel wire armour can serve as the CPC if properly terminated and the circuit design permits it under BS 7671.",
    category: "SWA",
    difficulty: "medium",
  },

  // cc13 – SWA / hard
  {
    id: "cc13",
    question:
      "In a three-core SWA cable used for a single-phase supply with a separate CPC core, what colours will you find and what does each do?",
    answer:
      "Brown (line), blue (neutral), and green-and-yellow (CPC). The three-core variant is used when the armour alone is not relied upon as the CPC, giving a dedicated protective conductor within the cable.",
    category: "SWA",
    difficulty: "hard",
  },

  // cc14 – Domestic Colours / easy
  {
    id: "cc14",
    question:
      "You are replacing a light switch and find a blue conductor with brown sleeving at each end. What does this indicate?",
    answer:
      "The blue conductor is being used as a switched-live (line) conductor. Brown sleeving is applied at each termination to indicate it is not a neutral, as required by BS 7671 Regulation 514.4.1.",
    category: "Domestic Colours",
    difficulty: "easy",
  },

  // cc15 – Flex Colours / easy
  {
    id: "cc15",
    question:
      "What are the standard core colours in a three-core flexible cable (flex) for a domestic appliance in the UK?",
    answer:
      "Brown (live), blue (neutral), green-and-yellow (earth). These are the same harmonised colours used throughout the BS 7671 wiring system.",
    category: "Flex Colours",
    difficulty: "easy",
  },

  // cc16 – Flex Colours / medium
  {
    id: "cc16",
    question:
      "A two-core flex has no earth conductor. What colours are present and where would you typically find this type of cable?",
    answer:
      "Brown and blue only. Two-core flex is used for double-insulated (Class II) appliances such as phone chargers, lamps, and power tools that do not require an earth connection.",
    category: "Flex Colours",
    difficulty: "medium",
  },

  // cc17 – Data & Fire Cables / medium
  {
    id: "cc17",
    question:
      "What colour sheath is typically used for standard fire alarm cable in the UK?",
    answer:
      "Red. Fire alarm cables are sheathed in red so they are instantly recognisable and not confused with general power or data cabling. Fire-resistant types (e.g. FP200 Gold) also use a red sheath.",
    category: "Data & Fire Cables",
    difficulty: "medium",
  },

  // cc18 – Data & Fire Cables / medium
  {
    id: "cc18",
    question:
      "What colour sheath is commonly used for intruder alarm cable in the UK?",
    answer:
      "White. Standard intruder alarm cable (e.g. six-core alarm cable) is typically white-sheathed, distinguishing it from red fire alarm cable and grey data cable.",
    category: "Data & Fire Cables",
    difficulty: "medium",
  },

  // cc19 – Data & Fire Cables / hard
  {
    id: "cc19",
    question:
      "What colour is Category 5e/6 data cable sheathing in a typical UK commercial installation, and why might you see different colours?",
    answer:
      "Most commonly grey or blue for general data runs. Different colours (e.g. yellow for PoE, green for crossover, orange for fibre patch leads) are used to distinguish circuit purposes. Colour choice is not regulated by BS 7671 but follows site-specific or manufacturer conventions.",
    category: "Data & Fire Cables",
    difficulty: "hard",
  },

  // cc20 – Domestic Colours / medium
  {
    id: "cc20",
    question:
      "In a twin-and-earth cable, the bare CPC has no factory-applied colour. What must you do at every termination?",
    answer:
      "You must sleeve the bare CPC with green-and-yellow sleeving at every termination point. This is a requirement of BS 7671 (Regulation 514.4.2) to clearly identify the conductor as a protective earth.",
    category: "Domestic Colours",
    difficulty: "medium",
  },

  // cc21 – Harmonisation / hard
  {
    id: "cc21",
    question:
      "You open a consumer unit and find red and black wires feeding the circuits, but the new main switch has been wired with brown and blue tails. Is this acceptable and what action must you take?",
    answer:
      "This is acceptable provided a warning notice is fitted at the consumer unit stating that wiring with two different colour codes exists. Under BS 7671 Regulation 514.14 the label must be present wherever both old and new colours co-exist. No rewire is required for the existing red/black circuits.",
    category: "Harmonisation",
    difficulty: "hard",
  },

  // cc22 – Three-Phase / hard
  {
    id: "cc22",
    question:
      "You are tracing a fault in a three-phase distribution board and find red, yellow, and blue phase conductors alongside brown, black, and grey conductors. What does this tell you and what are the risks?",
    answer:
      "The installation contains both pre- and post-harmonisation wiring. The main risk is confusing old-neutral (black) with new-L2 (black), which could lead to a dangerous cross-connection or live working on what is assumed to be neutral. A dual-colour warning label must be present, and extra care with testing and identification is essential.",
    category: "Three-Phase",
    difficulty: "hard",
  },

  // cc23 – SWA / medium
  {
    id: "cc23",
    question:
      "When terminating a multi-core SWA cable that has grey and black cores intended as line conductors in a single-phase circuit, how must you identify them?",
    answer:
      "You must apply brown sleeving or brown tape to the grey and/or black cores being used as line conductors at each termination. BS 7671 Regulation 514.4.1 requires that every conductor is correctly identified by colour at its terminations.",
    category: "SWA",
    difficulty: "medium",
  },

  // cc24 – Flex Colours / medium
  {
    id: "cc24",
    question:
      "An older flex cable on a site has red, black, and green cores. Can you reconnect it as-is?",
    answer:
      "You can reconnect it, but only if the appliance is not being modified or replaced and it remains safe. If the flex is being renewed or the appliance re-wired, you should use a flex with current harmonised colours (brown, blue, green-and-yellow). The old colours (red = live, black = neutral, green = earth) are not permitted on new work.",
    category: "Flex Colours",
    difficulty: "hard",
  },

  // cc25 – Domestic Colours / easy
  {
    id: "cc25",
    question:
      "What is the purpose of using brown sleeving on a blue conductor in a lighting circuit switch wire?",
    answer:
      "It identifies the blue conductor as a line (live) conductor rather than a neutral. In a switch loop the blue core carries switched-live current, so brown sleeving warns anyone working on the circuit that the conductor is live when the switch is on.",
    category: "Domestic Colours",
    difficulty: "easy",
  },
];
