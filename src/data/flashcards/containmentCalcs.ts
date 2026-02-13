import { FlashcardData } from './types';

export const containmentCalcs: FlashcardData[] = [
  // ── Trunking ────────────────────────────────────────────────────────────

  {
    id: 'cc_cont1',
    question:
      'What is the maximum space factor (percentage fill) permitted for cables installed in trunking according to BS 7671?',
    answer:
      'The maximum space factor for trunking is 45%, as stated in BS 7671 Regulation 522.8.1. This means that cables must not occupy more than 45% of the internal cross-sectional area of the trunking. The remaining 55% allows for heat dissipation, ease of installation, and future additions.',
    category: 'Trunking',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont2',
    question: 'Name four common types of trunking used in electrical installations.',
    answer:
      'Common types include PVC trunking (lightweight, non-corrosive), steel trunking (robust, provides CPC continuity), dado trunking (wall-mounted at desk height for offices), and mini trunking (small profile for surface wiring in domestic or commercial settings). Other types include skirting trunking and floor trunking for specific applications.',
    category: 'Trunking',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont3',
    question: 'How do you calculate the correct trunking size for a group of cables?',
    answer:
      'First, look up the cable factor (in mm²) for each cable type and size from the appropriate table (e.g., Table 4C1 of the IET On-Site Guide). Multiply each cable factor by the number of that cable type, then add all the totals together. Finally, select a trunking size whose usable space (at 45% fill) is equal to or greater than the total cable factor sum.',
    category: 'Trunking',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont4',
    question: 'What is the purpose of dado trunking and where is it typically installed?',
    answer:
      'Dado trunking is a multi-compartment trunking system installed at desk height (typically around 1 metre from floor level) in offices and commercial premises. It provides segregated compartments for power, data, and telecommunications cabling, allowing easy access for moves and changes without disrupting other services.',
    category: 'Trunking',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont5',
    question: 'What are the advantages of steel trunking over PVC trunking?',
    answer:
      'Steel trunking offers superior mechanical protection, can withstand higher temperatures without deformation, and provides inherent electromagnetic screening. Importantly, when correctly installed with proper joints and earth continuity, steel trunking can serve as a circuit protective conductor (CPC). It also has better fire resistance compared to PVC trunking.',
    category: 'Trunking',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont6',
    question: 'Where would you use floor trunking and what special consideration applies?',
    answer:
      'Floor trunking is installed within or beneath floor structures to provide power and data outlets in open-plan areas where wall-mounted containment is impractical. Special considerations include ensuring adequate IP rating (typically IP4X minimum) to prevent ingress of debris, ensuring lids are flush and load-bearing to withstand foot traffic and furniture, and maintaining accessibility for future maintenance.',
    category: 'Trunking',
    difficulty: 'medium',
  },

  // ── Conduit ─────────────────────────────────────────────────────────────

  {
    id: 'cc_cont7',
    question: 'What is the maximum space factor (percentage fill) for cables drawn into conduit?',
    answer:
      'The maximum space factor for conduit is 40%. This is lower than the 45% allowed for trunking because cables must be pulled through conduit rather than laid in, making installation more difficult. The 40% limit ensures cables can be drawn in without damage and allows adequate heat dissipation.',
    category: 'Conduit',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont8',
    question: 'What is the difference between heavy gauge and light gauge steel conduit?',
    answer:
      'Heavy gauge steel conduit has thicker walls (typically 1.6 mm or greater) and uses screwed fittings with BS threads, making it suitable for industrial environments and outdoor use. Light gauge conduit has thinner walls and uses slip or grip fittings. Heavy gauge conduit can serve as a CPC when joints are correctly made, whereas light gauge generally cannot be relied upon as a CPC.',
    category: 'Conduit',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont9',
    question: 'How do you calculate conduit size for a given set of cables?',
    answer:
      'Look up the cable factor for each conductor size from the conduit cable factor tables (e.g., Table 4B1 of the IET On-Site Guide). Multiply each factor by the number of cables of that size, then sum the totals. Choose a conduit size whose capacity factor (at 40% fill) equals or exceeds the total cable factor. The conduit capacity must also account for any bends in the run, which reduce effective capacity.',
    category: 'Conduit',
    difficulty: 'hard',
  },
  {
    id: 'cc_cont10',
    question: 'Why does the number of bends in a conduit run affect cable capacity?',
    answer:
      'Each bend increases friction when drawing cables through the conduit, making installation harder and increasing the risk of cable damage. Tables in the IET On-Site Guide provide conduit factors for different numbers of bends (typically one, two, or three bends in a run). More bends mean a larger conduit size is needed for the same number of cables. Where possible, draw-in boxes should be fitted to reduce long runs with multiple bends.',
    category: 'Conduit',
    difficulty: 'hard',
  },
  {
    id: 'cc_cont11',
    question: 'What are the main advantages of PVC conduit compared to steel conduit?',
    answer:
      'PVC conduit is lightweight, inexpensive, easy to cut and bend (using a heat source), and resistant to corrosion and most chemicals. It is non-conductive, so it will not contribute to earth faults. However, it cannot be used as a CPC, it softens at high temperatures (above approximately 60°C), and it has lower mechanical strength than steel conduit.',
    category: 'Conduit',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont12',
    question: 'When would you use flexible conduit and what limitation must you be aware of?',
    answer:
      'Flexible conduit is used where a rigid connection is impractical, such as connections to motors, vibrating equipment, or across building expansion joints. It allows movement without damaging the cables inside. The key limitation is that flexible conduit must not be relied upon as a CPC — a separate protective conductor must be installed within or alongside it to maintain earth continuity.',
    category: 'Conduit',
    difficulty: 'medium',
  },

  // ── Cable Tray & Basket ─────────────────────────────────────────────────

  {
    id: 'cc_cont13',
    question: 'What is cable tray and where is it typically used?',
    answer:
      'Cable tray is an open metal or mesh support system used to carry cables over long horizontal or vertical runs, typically in commercial and industrial installations. It is commonly found in risers, plant rooms, and ceiling voids. Cable tray provides good ventilation for cables (aiding heat dissipation) and allows easy addition or removal of cables without disconnection of others.',
    category: 'Cable Tray',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont14',
    question: 'What are the key differences between cable tray and cable basket?',
    answer:
      'Cable tray is a solid or perforated metal channel offering greater mechanical protection and load-bearing capacity, suitable for heavier cables. Cable basket is a lighter wire mesh system that is quicker to install, provides excellent ventilation, and is more cost-effective for lighter cables such as data and fibre optic. Cable basket is often used in commercial IT installations, while cable tray is preferred for power cables in industrial settings.',
    category: 'Cable Tray',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont15',
    question: 'What is cable ladder and when would you use it instead of cable tray?',
    answer:
      'Cable ladder consists of two parallel side rails with rungs at regular intervals, forming a ladder-like structure. It is used for heavy, large-diameter cables (such as SWA or MICC) that are too heavy for standard cable tray. Cable ladder provides excellent ventilation and high load-bearing capacity, and is commonly found in substations, industrial plants, and large commercial risers where multiple heavy power cables must be supported.',
    category: 'Cable Tray',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont16',
    question: 'What is the minimum internal bending radius for cables on cable tray?',
    answer:
      'The minimum bending radius depends on the cable type and diameter. As a general rule, for fixed wiring cables the minimum internal bending radius is typically 3 to 6 times the overall cable diameter. For armoured cables (SWA), BS 7671 Table 4E1 specifies at least 6 times the overall diameter. Bending too tightly can damage insulation, deform conductors, or crack the armouring.',
    category: 'Cable Tray',
    difficulty: 'hard',
  },

  // ── Space Factors ───────────────────────────────────────────────────────

  {
    id: 'cc_cont17',
    question: "What is a 'cable factor' in the context of containment calculations?",
    answer:
      "A cable factor is a numerical value representing the effective cross-sectional area (in mm²) that a particular cable occupies within containment. Cable factors are listed in tables published in the IET On-Site Guide and take into account the cable's overall diameter including insulation and sheath. They are used to calculate total fill when selecting trunking or conduit sizes.",
    category: 'Space Factors',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont18',
    question: 'Why is the space factor for conduit (40%) lower than for trunking (45%)?',
    answer:
      'Conduit has a lower space factor because cables must be drawn or pulled through a fully enclosed tube, which creates friction and makes installation more difficult. Trunking has removable lids, allowing cables to be laid directly into the channel with far less friction. The extra 5% allowance for trunking reflects this easier installation method and better access for future cable additions.',
    category: 'Space Factors',
    difficulty: 'medium',
  },
  {
    id: 'cc_cont19',
    question:
      'A trunking run needs to carry 10 × 2.5 mm² singles (factor 11.9 each) and 6 × 1.5 mm² singles (factor 8.6 each). What is the minimum trunking size needed?',
    answer:
      "Total cable factor = (10 × 11.9) + (6 × 8.6) = 119 + 51.6 = 170.6 mm². You would then consult the trunking capacity table and select the smallest trunking whose 45% capacity equals or exceeds 170.6 mm². For example, 50 mm × 50 mm trunking has a capacity of approximately 767 mm² at 45% fill, which is more than adequate. Always check the manufacturer's data for the exact trunking you intend to use.",
    category: 'Space Factors',
    difficulty: 'hard',
  },

  // ── Fixings & Supports ──────────────────────────────────────────────────

  {
    id: 'cc_cont20',
    question: 'What types of fixings are used to secure conduit and what are saddles used for?',
    answer:
      'Conduit is secured using saddles (also called spacer bar saddles or half saddles) which clip around the conduit and are screwed to the mounting surface. Distance saddles hold the conduit away from the wall to allow air circulation. Hospital saddles provide a hygienic gap for cleaning. Crampets are U-shaped clips used for lighter-duty PVC conduit fixings in less demanding environments.',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cc_cont21',
    question:
      'According to Table 4A of the IET On-Site Guide, what determines the maximum spacing between fixings for cables and containment?',
    answer:
      'The maximum spacing depends on the type of containment or cable, its size, and whether the run is horizontal or vertical. For example, PVC conduit clips are typically spaced at 750 mm for horizontal runs and 1000 mm for vertical runs. Trunking supports are typically at 750 mm to 1200 mm intervals depending on size. These spacings ensure the containment is adequately supported and does not sag, which could damage cables.',
    category: 'Installation',
    difficulty: 'medium',
  },

  // ── Fire Stopping & Barriers ────────────────────────────────────────────

  {
    id: 'cc_cont22',
    question:
      'What is fire stopping and why is it required where trunking or conduit passes through walls and floors?',
    answer:
      'Fire stopping involves sealing any opening where containment penetrates a fire-rated wall, floor, or ceiling to maintain the fire resistance of that element. Without proper fire barriers, trunking and conduit runs create pathways for fire and smoke to spread between compartments. BS 7671 Regulation 527.2 requires that penetrations are sealed to the same fire rating as the element they pass through, using intumescent material, fire-rated pillows, or proprietary fire stop systems.',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'cc_cont23',
    question: 'What must be fitted inside trunking where it passes through a fire barrier?',
    answer:
      'An internal fire barrier must be fitted within the trunking at the point where it passes through each fire-rated wall or floor. These barriers are typically intumescent blocks or pads that expand when exposed to heat, sealing the trunking and preventing fire and smoke from spreading through the containment system. The barrier must restore the full fire rating of the building element being penetrated.',
    category: 'Installation',
    difficulty: 'hard',
  },

  // ── IP Ratings ──────────────────────────────────────────────────────────

  {
    id: 'cc_cont24',
    question: 'What do IP ratings mean and give examples of IP20, IP44, and IP65?',
    answer:
      'IP (Ingress Protection) ratings indicate the degree of protection an enclosure provides against solid objects (first digit, 0–6) and water (second digit, 0–9). IP20 protects against objects larger than 12.5 mm but offers no water protection (typical for indoor trunking). IP44 protects against objects over 1 mm and splashing water from any direction (suitable for sheltered outdoor use). IP65 is dust-tight and protected against water jets (suitable for exposed outdoor or washdown environments).',
    category: 'Installation',
    difficulty: 'medium',
  },

  // ── Segregation ─────────────────────────────────────────────────────────

  {
    id: 'cc_cont25',
    question:
      'What does BS 7671 Regulation 528 require regarding segregation of circuits in common containment?',
    answer:
      'Regulation 528 requires that cables of different voltage bands or circuit types are segregated to prevent electromagnetic interference and reduce fire risk. Band I circuits (extra-low voltage, data, telecoms) must be separated from Band II circuits (230 V mains) either by a physical barrier, separate compartments within the same trunking, or by maintaining a specified minimum separation distance. This is why multi-compartment trunking (such as dado trunking) is used in commercial installations where power and data share the same route.',
    category: 'Installation',
    difficulty: 'hard',
  },
];
