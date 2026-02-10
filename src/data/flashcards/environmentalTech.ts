import { FlashcardData } from "./types";

export const environmentalTech: FlashcardData[] = [
  // ── Solar PV ───────────────────────────────────────────────────────────

  {
    id: "et1",
    question: "What type of current does a solar PV panel generate?",
    answer:
      "Direct current (DC). An inverter is required to convert this to alternating current (AC) for use in the property and export to the grid.",
    category: "Solar PV",
    difficulty: "easy",
  },
  {
    id: "et2",
    question:
      "Which section of BS 7671 covers the requirements for solar photovoltaic (PV) power supply systems?",
    answer:
      "Section 712 — Solar photovoltaic (PV) power supply systems.",
    category: "Solar PV",
    difficulty: "easy",
  },
  {
    id: "et3",
    question:
      "Why must all PV DC cables be treated as live even when the inverter is switched off?",
    answer:
      "PV panels generate a voltage whenever exposed to light. Unlike AC circuits, the DC side cannot be de-energised by simply switching off the inverter — the panels remain a live source as long as daylight is present.",
    category: "Solar PV",
    difficulty: "medium",
  },
  {
    id: "et4",
    question:
      "What is the purpose of a DC isolator on a solar PV installation, and where should it be located?",
    answer:
      "A DC isolator allows the inverter to be safely disconnected from the PV array for maintenance. It must be located adjacent to the inverter and be clearly labelled. An additional DC isolator may also be required at roof level depending on the installation.",
    category: "Solar PV",
    difficulty: "medium",
  },
  {
    id: "et5",
    question:
      "Section 712 of BS 7671 requires equipotential bonding of PV panel frames. Why is this necessary?",
    answer:
      "Bonding the metallic frames of PV panels to the earthing system ensures they remain at earth potential, preventing dangerous touch voltages if a fault develops. This is an essential protective measure under Section 712.",
    category: "Solar PV",
    difficulty: "medium",
  },
  {
    id: "et6",
    question:
      "A domestic solar PV system has a total output capacity of 3.6 kW. Under which standard can it be connected to the distribution network without prior approval from the DNO?",
    answer:
      "G98 (formerly G83). Single-phase installations up to 3.68 kW can be connected under the 'notify and connect' process of Engineering Recommendation G98, without requiring prior DNO approval.",
    category: "Solar PV",
    difficulty: "hard",
  },
  {
    id: "et7",
    question:
      "A commercial client wants a 25 kW solar PV array installed. Which grid connection standard applies and what additional step is required compared to a small domestic system?",
    answer:
      "Engineering Recommendation G99 applies to installations exceeding 3.68 kW per phase. Unlike G98, G99 requires a formal application to the Distribution Network Operator (DNO) and written approval before connection.",
    category: "Solar PV",
    difficulty: "hard",
  },

  // ── MCS & Certification ────────────────────────────────────────────────

  {
    id: "et8",
    question: "What is MCS certification and why is it important for renewable energy installations?",
    answer:
      "MCS (Microgeneration Certification Scheme) certifies both products and installers for small-scale renewable technologies. Homeowners need an MCS-certified installation to qualify for government incentives such as the Smart Export Guarantee (SEG).",
    category: "Micro-generation",
    difficulty: "easy",
  },
  {
    id: "et9",
    question:
      "What has replaced the Feed-in Tariff (FiT) scheme for new solar PV installations in the UK?",
    answer:
      "The Smart Export Guarantee (SEG). Licensed electricity suppliers with 150,000+ customers must offer a tariff for exported electricity from small-scale generation (up to 5 MW). The installation must be MCS-certified to qualify.",
    category: "Micro-generation",
    difficulty: "easy",
  },

  // ── EV Charging ────────────────────────────────────────────────────────

  {
    id: "et10",
    question:
      "List the four EV charging modes and give an example of each.",
    answer:
      "Mode 1: Standard socket, no communication (rarely used in UK). Mode 2: Domestic socket with in-cable control box (granny charger). Mode 3: Dedicated wall-mounted charge point with built-in protection (most common domestic). Mode 4: DC rapid charger (commercial, e.g. motorway services).",
    category: "EV Charging",
    difficulty: "medium",
  },
  {
    id: "et11",
    question:
      "Which section of BS 7671 covers the requirements for electric vehicle charging installations?",
    answer:
      "Section 722 — Electric vehicle charging installations.",
    category: "EV Charging",
    difficulty: "easy",
  },
  {
    id: "et12",
    question:
      "What type of circuit is required for an EV charge point under BS 7671 Section 722?",
    answer:
      "A dedicated radial circuit from the consumer unit is required. The circuit must not supply any other equipment. A 32A radial on 6mm\u00B2 twin-and-earth (or equivalent) is typical for a 7 kW single-phase charger.",
    category: "EV Charging",
    difficulty: "medium",
  },
  {
    id: "et13",
    question:
      "A customer with a PME (TN-C-S) supply wants a 7 kW EV charger installed in their detached garage. What earthing consideration must you address?",
    answer:
      "PME earthing must not be used as the sole means of earthing for EV charging in locations where the user is in simultaneous contact with the vehicle and true earth (e.g. outdoors or detached buildings). A TT earth electrode must be installed, or the charger must incorporate protective measures such as an earth monitoring device compliant with BS 7671 Section 722.",
    category: "EV Charging",
    difficulty: "hard",
  },
  {
    id: "et14",
    question:
      "You are asked to install an EV charger at a domestic property. The existing main fuse is 60A and the consumer already has a 40A cooker circuit, 32A shower circuit, and general circuits totalling 30A. What must you assess before proceeding?",
    answer:
      "You must carry out a maximum demand assessment. Adding a 32A EV charger circuit could exceed the 60A supply capacity. Options include applying diversity calculations, requesting a supply upgrade from the DNO, or installing a load management/smart charging device that dynamically limits the EV charger current based on overall household demand.",
    category: "EV Charging",
    difficulty: "hard",
  },

  // ── Heat Pumps ─────────────────────────────────────────────────────────

  {
    id: "et15",
    question:
      "What do COP and SCOP stand for in relation to heat pumps, and what is a typical SCOP for a domestic ASHP?",
    answer:
      "COP = Coefficient of Performance (ratio of heat output to electrical input at a specific condition). SCOP = Seasonal Coefficient of Performance (averaged over a heating season). A typical domestic ASHP achieves an SCOP of 2.5 to 3.5, meaning it produces 2.5 to 3.5 kW of heat for every 1 kW of electricity consumed.",
    category: "Heat Pumps",
    difficulty: "medium",
  },
  {
    id: "et16",
    question:
      "What are the two main types of heat pump used in UK domestic installations?",
    answer:
      "Air Source Heat Pumps (ASHP) — extract heat from outdoor air. Ground Source Heat Pumps (GSHP) — extract heat from the ground via buried loops or boreholes. ASHPs are far more common in domestic retrofits due to lower installation cost and no requirement for extensive groundworks.",
    category: "Heat Pumps",
    difficulty: "easy",
  },
  {
    id: "et17",
    question:
      "A heat pump installer asks you to provide a dedicated 40A supply for an ASHP. What electrical considerations apply?",
    answer:
      "You must assess maximum demand and confirm the existing supply is adequate. The circuit requires appropriate cable sizing for the run length and load, an isolator local to the unit, and RCD protection. The outdoor unit's IP rating must suit its location. MCS certification of the heat pump installation is required for the customer to claim the Boiler Upgrade Scheme grant.",
    category: "Heat Pumps",
    difficulty: "medium",
  },

  // ── Battery Storage ────────────────────────────────────────────────────

  {
    id: "et18",
    question:
      "What are the key safety considerations when installing a domestic battery energy storage system (BESS)?",
    answer:
      "Key considerations include: adequate ventilation to dissipate heat and prevent thermal runaway gases; fire-rated enclosure or location away from escape routes; DC and AC isolation provisions; compliance with manufacturer's installation instructions; and ensuring the system is integrated with the consumer unit and any PV system in accordance with BS 7671.",
    category: "Battery Storage",
    difficulty: "medium",
  },
  {
    id: "et19",
    question:
      "Why is ventilation particularly important for lithium-ion battery storage systems in domestic properties?",
    answer:
      "Lithium-ion cells can experience thermal runaway, releasing flammable and toxic gases. Adequate ventilation ensures heat is dissipated during normal charging/discharging and provides an escape path for gases in a fault condition. Battery storage should not be installed in unventilated cupboards or along escape routes.",
    category: "Battery Storage",
    difficulty: "medium",
  },

  // ── Part P ─────────────────────────────────────────────────────────────

  {
    id: "et20",
    question:
      "Under Part P of the Building Regulations, which types of environmental technology installation are classified as notifiable work?",
    answer:
      "New circuits for solar PV systems, EV chargers, heat pumps, and battery storage are all notifiable under Part P. The work must be carried out by a registered competent person scheme member (e.g. NICEIC, NAPIT) or Building Control must be notified and the work inspected.",
    category: "Part P",
    difficulty: "easy",
  },
  {
    id: "et21",
    question:
      "An electrician who is not a member of a competent person scheme installs a new EV charger circuit. What must they do to comply with Part P?",
    answer:
      "They must notify Building Control before commencing work (or within 30 days in some local authority areas). Building Control will inspect and certify the work. Failure to notify is a criminal offence and can cause problems when the property is sold.",
    category: "Part P",
    difficulty: "medium",
  },

  // ── Smart Meters ───────────────────────────────────────────────────────

  {
    id: "et22",
    question:
      "What is the key difference between SMETS1 and SMETS2 smart meters?",
    answer:
      "SMETS1 meters communicated via the supplier's own network and often lost smart functionality when the customer switched supplier. SMETS2 meters use the national DCC (Data Communications Company) network, maintaining smart functionality regardless of supplier. SMETS2 is the current standard.",
    category: "Smart Meters",
    difficulty: "easy",
  },

  // ── Energy Efficiency ──────────────────────────────────────────────────

  {
    id: "et23",
    question:
      "What is an EPC, what do the ratings mean, and when is one required?",
    answer:
      "An Energy Performance Certificate (EPC) rates a property's energy efficiency from A (most efficient) to G (least efficient). An EPC is required when a property is built, sold, or rented. Installing environmental technologies such as solar PV, heat pumps, and improved insulation can raise a property's EPC rating.",
    category: "Energy Efficiency",
    difficulty: "easy",
  },

  // ── Scenario-based / Practical ─────────────────────────────────────────

  {
    id: "et24",
    question:
      "A customer wants a solar PV system with battery storage and an EV charger installed at their property. What key factors must you consider when planning the electrical installation?",
    answer:
      "Key factors include: maximum demand assessment and potential supply upgrade; dedicated circuits for each system; correct earthing arrangements (especially PME restrictions for the EV charger); DC and AC isolation for PV and battery; G98/G99 grid connection compliance; ventilation for the battery; Part P notification; MCS certification for PV and battery to qualify for SEG payments; and co-ordination of all systems at the consumer unit, potentially requiring a new or upgraded board.",
    category: "Solar PV",
    difficulty: "hard",
  },
  {
    id: "et25",
    question:
      "During a periodic inspection you find a solar PV system with no DC isolator at the inverter, no warning labels, and the PV array frame is not bonded to earth. What codes and actions should be recorded?",
    answer:
      "Missing DC isolator at the inverter: Code C2 (potentially dangerous) — disconnection cannot be safely achieved for maintenance. Missing warning labels (dual supply): Code C3 (improvement recommended) or C2 depending on risk — BS 7671 Section 514 and Regulation 712.514 require labelling at the meter, consumer unit, and inverter. Unbonded PV frames: Code C2 — Section 712 requires equipotential bonding of all metallic frames. Immediate remedial work should be recommended for C2 items.",
    category: "Solar PV",
    difficulty: "hard",
  },
];
