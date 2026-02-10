import { FlashcardData } from "./types";

export const earthingAndBonding: FlashcardData[] = [
  // ── Earthing Systems ──────────────────────────────────────────────────

  {
    id: "eb1",
    question: "What does TN-S stand for and how is the earth provided?",
    answer:
      "Terre-Neutre-Séparé. The supply has separate neutral and protective earth conductors throughout. The earth path is typically provided by the lead sheath or steel wire armour of the supply cable.",
    category: "Earthing Systems",
    difficulty: "easy",
  },
  {
    id: "eb2",
    question:
      "In a TN-C-S (PME) system, what is the PEN conductor and how does it function?",
    answer:
      "PEN stands for Protective Earth and Neutral. A single conductor serves as both the neutral and the earth in the supply network. At the consumer's installation, it is split into separate neutral and earth conductors at the cut-out.",
    category: "Earthing Systems",
    difficulty: "medium",
  },
  {
    id: "eb3",
    question:
      "In a TT earthing system, how is the means of earthing provided and what additional protection is always required?",
    answer:
      "The consumer provides their own earth connection via an earth electrode (typically a driven rod). An RCD (residual current device) is always required because the earth fault loop impedance is generally much higher than in TN systems, making overcurrent devices alone unreliable for disconnection within the required time.",
    category: "Earthing Systems",
    difficulty: "medium",
  },
  {
    id: "eb4",
    question:
      "What is an IT earthing system and where is it typically used in the UK?",
    answer:
      "In an IT system the supply source is either isolated from earth or connected through a high impedance. It is rarely used for public supplies in the UK but is found in specialist applications such as operating theatres and some industrial processes where continuity of supply during a first fault is critical.",
    category: "Earthing Systems",
    difficulty: "hard",
  },
  {
    id: "eb5",
    question:
      "Describe the earth fault loop path in a TN-S system, starting from the point of fault.",
    answer:
      "From the fault → circuit protective conductor (CPC) → main earthing terminal (MET) → earthing conductor → supply earth (cable sheath) → star point of the distribution transformer → line conductor back to the point of fault. The entire path is metallic with no reliance on general mass of earth.",
    category: "Earthing Systems",
    difficulty: "medium",
  },
  {
    id: "eb6",
    question:
      "Describe the earth fault loop path in a TT system and explain why it differs from TN systems.",
    answer:
      "From the fault → CPC → MET → earthing conductor → earth electrode → general mass of earth → supply transformer earth electrode → star point → line conductor back to the fault. Part of the path goes through the general mass of earth, which has much higher impedance than the metallic return in TN systems. This is why an RCD is required.",
    category: "Earthing Systems",
    difficulty: "hard",
  },

  // ── Main Earthing Terminal (MET) ──────────────────────────────────────

  {
    id: "eb7",
    question:
      "What is the purpose of the main earthing terminal (MET) and where should it be located?",
    answer:
      "The MET is the central connection point for all protective conductors in the installation: the earthing conductor, main protective bonding conductors, and circuit protective conductors. It should be located as close as practicable to the consumer's main intake position and must be accessible for inspection and testing.",
    category: "MET",
    difficulty: "easy",
  },
  {
    id: "eb8",
    question:
      "A client asks why there is a brass bar with multiple green/yellow cables connected near the meter. What is it and why must it remain accessible?",
    answer:
      "It is the main earthing terminal (MET). It must remain accessible so that the earthing conductor can be disconnected for testing the earth fault loop impedance and the resistance of the earthing arrangement, as required by BS 7671 Regulation 542.4.2.",
    category: "MET",
    difficulty: "easy",
  },

  // ── Main Bonding ──────────────────────────────────────────────────────

  {
    id: "eb9",
    question:
      "According to BS 7671 Regulation 411.3.1.2, what extraneous-conductive-parts must be connected to the MET by main protective bonding conductors?",
    answer:
      "Main protective bonding conductors must be connected to: metal water service pipes, metal gas installation pipes, other metal service pipes and ducting, metal central heating and air-conditioning systems, exposed metallic structural parts of the building, and the lightning protection system where applicable.",
    category: "Main Bonding",
    difficulty: "medium",
  },
  {
    id: "eb10",
    question:
      "What is the minimum cross-sectional area of a copper main protective bonding conductor for supplies up to 35mm² and what regulation governs this?",
    answer:
      "10mm² copper, as specified in BS 7671 Table 54.8. For supply neutral conductors exceeding 35mm², the minimum main bonding conductor size is 6mm² copper with a maximum of 25mm² copper (or the size must be not less than half the cross-sectional area of the supply neutral).",
    category: "Main Bonding",
    difficulty: "medium",
  },
  {
    id: "eb11",
    question:
      "You arrive at an older property and find the gas meter has been moved but the main bonding connection is still on the old pipe run, now on the consumer's side of the meter. Is this acceptable?",
    answer:
      "No. The main protective bonding conductor must connect to the metal pipe on the consumer's side, within 600mm of the meter or point of entry into the building. If the bonding connection is no longer within 600mm of the meter, it must be repositioned. Bonding after the meter ensures the installation is protected even if the incoming supply pipe is replaced with plastic.",
    category: "Main Bonding",
    difficulty: "medium",
  },
  {
    id: "eb12",
    question:
      "When is main protective bonding required at the origin of an electrical installation?",
    answer:
      "Main protective bonding is required at every installation where extraneous-conductive-parts are present. It must be carried out at the origin of the installation regardless of the earthing system (TN-S, TN-C-S, or TT). It is a fundamental requirement of Regulation 411.3.1.2 for automatic disconnection of supply (ADS) to operate correctly.",
    category: "Main Bonding",
    difficulty: "easy",
  },

  // ── Supplementary Bonding ─────────────────────────────────────────────

  {
    id: "eb13",
    question:
      "What is the minimum cross-sectional area for a supplementary bonding conductor connecting two extraneous-conductive-parts?",
    answer:
      "4mm² copper (or 2.5mm² copper if mechanically protected, e.g. enclosed in trunking or conduit). This is specified in Regulation 544.2.3 and Table 54.8 of BS 7671.",
    category: "Supplementary Bonding",
    difficulty: "easy",
  },
  {
    id: "eb14",
    question:
      "You are installing a bathroom. Under what conditions can supplementary bonding in the bathroom be omitted according to BS 7671 Regulation 701.415.2?",
    answer:
      "Supplementary bonding in a bathroom may be omitted where ALL of the following conditions are met: (1) all final circuits in the location comply with the requirements for automatic disconnection per Regulation 411.3.2, (2) all final circuits are protected by a 30mA RCD, and (3) all extraneous-conductive-parts are connected to the protective equipotential bonding (main bonding) at the origin.",
    category: "Supplementary Bonding",
    difficulty: "medium",
  },
  {
    id: "eb15",
    question:
      "A bathroom has metal pipework for the basin and bath, and a metal towel radiator. If supplementary bonding is required, what exactly must be bonded together?",
    answer:
      "All simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts must be connected together. This includes: the CPCs of all circuits in the room, metal hot and cold water pipework, metal waste pipework, the metal towel radiator (including its pipework), and any other metallic services such as a metal bath if not fully isolated from earth.",
    category: "Supplementary Bonding",
    difficulty: "medium",
  },

  // ── PME (Protective Multiple Earthing) ────────────────────────────────

  {
    id: "eb16",
    question:
      "What specific danger arises if the PEN conductor breaks in a TN-C-S (PME) supply?",
    answer:
      "If the PEN conductor breaks between the transformer and the installation, the installation loses its earth reference. All extraneous-conductive-parts connected to the MET could rise to a dangerous potential (up to full line voltage) via the neutral load current seeking a return path through the earthing arrangement. This is the primary risk of PME systems.",
    category: "PME",
    difficulty: "hard",
  },
  {
    id: "eb17",
    question:
      "Name three locations or situations where a PME earth must NOT be used, according to BS 7671 and the ESQCR.",
    answer:
      "PME earthing must not be used for: (1) supplies to caravans and caravan parks (BS 7671 Section 708), (2) supplies to boats and marinas (Section 709), (3) construction site supplies (Section 704). Additional restrictions apply to petrol filling stations, livestock locations, and highway power supplies. The DNO may also restrict PME for swimming pools and hot tubs.",
    category: "PME",
    difficulty: "hard",
  },
  {
    id: "eb18",
    question:
      "Why are the main bonding conductor sizes larger in a PME (TN-C-S) installation compared to a TN-S installation?",
    answer:
      "In a PME installation, if the PEN conductor is lost, the bonding conductors may have to carry significant neutral return current through the earthing system. Larger bonding conductors are required to handle this current safely and to keep touch voltages within tolerable limits. Table 54.8 of BS 7671 specifies the increased sizes for PME supplies.",
    category: "PME",
    difficulty: "medium",
  },

  // ── Earth Electrodes ──────────────────────────────────────────────────

  {
    id: "eb19",
    question:
      "Describe the three-terminal (fall of potential) method for testing an earth electrode resistance.",
    answer:
      "Three stakes are used: the electrode under test (X), a current spike (Y) placed typically 30m away, and a potential spike (P) placed at 62% of the distance between X and Y (approximately 18.6m from X). A known current is passed between X and Y, and the voltage is measured between X and P. Resistance = V/I. The test is repeated with P at different positions to check the result is within the resistance area plateau.",
    category: "Earth Electrodes",
    difficulty: "hard",
  },
  {
    id: "eb20",
    question:
      "In a TT system, what maximum earth electrode resistance (RA) is typically needed to satisfy Regulation 411.5.1 when using a 30mA RCD?",
    answer:
      "Using the formula RA × IΔn ≤ 50V: RA = 50 / 0.03 = 1667 ohms maximum. In practice, an earth electrode resistance of 200 ohms or less is considered desirable for reliable operation. An RA above 200 ohms should prompt investigation into improving the electrode installation.",
    category: "Earth Electrodes",
    difficulty: "medium",
  },

  // ── Definitions & Concepts ────────────────────────────────────────────

  {
    id: "eb21",
    question:
      "What is the difference between an exposed-conductive-part and an extraneous-conductive-part?",
    answer:
      "An exposed-conductive-part is a conductive part of equipment which can be touched and is not normally live but may become live under fault conditions (e.g. a metal light fitting enclosure). An extraneous-conductive-part is a conductive part not forming part of the electrical installation but liable to introduce a potential, generally earth potential (e.g. metal water pipes, gas pipes, structural steelwork).",
    category: "Earthing Systems",
    difficulty: "easy",
  },
  {
    id: "eb22",
    question:
      "A plastic water main enters a property but the internal pipework is copper. Are the internal copper pipes considered extraneous-conductive-parts?",
    answer:
      "It depends. If the copper pipework is connected to earth via contact with the ground or other earthed metalwork, it could introduce an earth potential and would be an extraneous-conductive-part requiring bonding. If the copper pipes are completely isolated from earth (e.g. the plastic main provides full isolation and there is no other earth path), they may not be extraneous-conductive-parts. A test of continuity to earth should be carried out to determine this.",
    category: "Main Bonding",
    difficulty: "hard",
  },

  // ── Exam-style & Scenario Cards ───────────────────────────────────────

  {
    id: "eb23",
    question:
      "During an EICR you measure an external earth fault loop impedance (Ze) of 0.8 ohms and note the supply is TN-S. Is this reading consistent with the earthing system?",
    answer:
      "A Ze of 0.8 ohms is consistent with a TN-S supply. Typical Ze values: TN-S = 0.8 ohms or less (often around 0.35–0.8 ohms); TN-C-S (PME) = 0.35 ohms or less; TT = typically 21 ohms or higher (often much higher). If the reading were 0.35 ohms or below, you should investigate whether the supply is actually TN-C-S.",
    category: "Earthing Systems",
    difficulty: "easy",
  },
  {
    id: "eb24",
    question:
      "You are carrying out a periodic inspection and discover that the main bonding to the gas pipe is missing. The installation has a TN-C-S (PME) supply. What action should you take and what code would you assign?",
    answer:
      "Missing main bonding on a PME supply is extremely dangerous — if the PEN conductor were to break, the gas pipe could become live at full mains potential. You should record a C1 code (Danger present — risk of injury. Immediate remedial action required) on the EICR. The client must be informed immediately and the defect should be rectified as a matter of urgency, or the supply isolated if immediate repair is not possible.",
    category: "Main Bonding",
    difficulty: "medium",
  },
  {
    id: "eb25",
    question:
      "A homeowner has had a new plastic gas meter box installed externally and the gas supply pipe entering the property is now plastic up to a short copper section at the boiler. Is main bonding to the gas still required?",
    answer:
      "If the gas pipe entering the building is entirely plastic with no metallic connection to earth, the internal copper section may not be an extraneous-conductive-part and bonding may not be required. However, best practice and guidance from the IET (Guidance Note 8) recommends that bonding should still be provided where any metallic gas pipework exists within the installation, as future alterations could re-introduce an earth path. Always verify by testing continuity to earth before making a final decision.",
    category: "Main Bonding",
    difficulty: "easy",
  },
];
