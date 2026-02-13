import { FlashcardData } from './types';

export const cableSelection: FlashcardData[] = [
  // === Current Capacity (cs1–cs6) ===
  {
    id: 'cs1',
    question: 'What do the symbols Ib, In, and It represent in cable selection under BS 7671?',
    answer:
      'Ib is the design current of the circuit — the actual current the load is expected to draw. In is the rated current of the protective device selected for the circuit. It is the tabulated current-carrying capacity of the cable under the specific installation conditions. The fundamental rule is Ib <= In <= It.',
    category: 'Current Capacity',
    difficulty: 'easy',
  },
  {
    id: 'cs2',
    question:
      'State the cable selection inequality from BS 7671 that ensures a cable is adequately rated for a circuit.',
    answer:
      'The cable must satisfy It >= In / (Ca x Cg x Ci x Cc), where Ca is the ambient temperature correction factor, Cg is the grouping correction factor, Ci is the thermal insulation correction factor, and Cc is the semi-enclosed fuse factor (0.725 for BS 3036 fuses). This ensures the cable can carry the required current even after all derating factors are applied.',
    category: 'Current Capacity',
    difficulty: 'medium',
  },
  {
    id: 'cs3',
    question:
      'A 32 A Type B MCB protects a ring final circuit. The ambient temperature is 35°C (Ca = 0.94), two circuits are grouped together (Cg = 0.80), and there is no thermal insulation. What minimum tabulated current-carrying capacity (It) is required?',
    answer:
      'It >= In / (Ca x Cg x Ci x Cc). With In = 32 A, Ca = 0.94, Cg = 0.80, Ci = 1.0, and Cc = 1.0 (MCB, not semi-enclosed fuse), the calculation is It >= 32 / (0.94 x 0.80 x 1.0 x 1.0) = 32 / 0.752 = 42.55 A. The cable must have a tabulated current-carrying capacity of at least 42.55 A under the relevant installation method.',
    category: 'Current Capacity',
    difficulty: 'hard',
  },
  {
    id: 'cs4',
    question:
      'What is the purpose of Appendix 4 in BS 7671 and what key information does it contain?',
    answer:
      'Appendix 4 of BS 7671 provides the current-carrying capacity and voltage drop data for cables. It contains tables for different cable types, conductor materials (copper and aluminium), insulation types (thermoplastic/PVC and thermosetting/XLPE), and installation methods (reference methods A to G). It is the primary reference used when sizing cables.',
    category: 'Current Capacity',
    difficulty: 'easy',
  },
  {
    id: 'cs5',
    question: 'What is the difference between Iz and It in cable selection terminology?',
    answer:
      'It is the tabulated current-carrying capacity of the cable taken directly from the Appendix 4 tables for a specific installation method and cable type. Iz is the effective current-carrying capacity of the cable after all correction factors have been applied, i.e. Iz = It x Ca x Cg x Ci x Cc. The protective device rating In must not exceed Iz, so that the cable is always protected against overload.',
    category: 'Current Capacity',
    difficulty: 'medium',
  },
  {
    id: 'cs6',
    question:
      'Which table in BS 7671 Appendix 4 would you use to find the current-carrying capacity of twin and earth (flat) thermoplastic (PVC) cables?',
    answer:
      'Table 4D5 in Appendix 4 of BS 7671 provides the current-carrying capacity for twin and earth flat thermoplastic (PVC) cables with a protective conductor, which is the most common domestic cable type. You select the column that matches the relevant installation reference method (e.g. Method C for clipped direct, Method A for enclosed in conduit in an insulated wall).',
    category: 'Current Capacity',
    difficulty: 'easy',
  },

  // === Correction Factors (cs7–cs12) ===
  {
    id: 'cs7',
    question:
      'What is the ambient temperature correction factor (Ca) and where do you find its values?',
    answer:
      'Ca is the correction factor applied when the ambient temperature differs from the reference temperature assumed in the cable rating tables (30°C for PVC insulated cables, 40°C for XLPE cables). Values are found in Table 4B1 of BS 7671 Appendix 4. As temperature increases above the reference, Ca decreases below 1.0, meaning the cable must be derated.',
    category: 'Correction Factors',
    difficulty: 'easy',
  },
  {
    id: 'cs8',
    question: 'What is the grouping correction factor (Cg) and why is it necessary?',
    answer:
      'Cg accounts for the reduced ability of cables to dissipate heat when they are installed close together in groups or bundles. When multiple circuits share the same cable route, each cable heats its neighbours, reducing overall cooling efficiency. Values are found in Table 4C1 of BS 7671 Appendix 4. For example, three circuits clipped together in a single layer on a wall have a Cg of approximately 0.70.',
    category: 'Correction Factors',
    difficulty: 'medium',
  },
  {
    id: 'cs9',
    question: 'What is the thermal insulation correction factor (Ci) and when does it apply?',
    answer:
      "Ci applies when a cable is surrounded by or in contact with thermal insulation, which restricts heat dissipation. If a cable is totally surrounded by thermal insulation for more than 0.5 m, Ci = 0.5, meaning the cable's capacity is halved. For cables touching insulation on one side only, Ci = 0.75. Values are given in Table 4A2 of BS 7671 Appendix 4. This is a significant derating and often results in needing a larger cable size.",
    category: 'Correction Factors',
    difficulty: 'medium',
  },
  {
    id: 'cs10',
    question: 'What is the Cc factor and when must it be applied?',
    answer:
      'Cc is the correction factor for circuits protected by semi-enclosed (rewirable) fuses to BS 3036. Its value is 0.725. It must be applied because BS 3036 fuses have less precise operating characteristics than cartridge fuses or MCBs, so the cable must be oversized to ensure it is not damaged before the fuse blows. If the circuit uses an MCB, RCBO, or BS 88 fuse, Cc = 1.0 and can be ignored.',
    category: 'Correction Factors',
    difficulty: 'medium',
  },
  {
    id: 'cs11',
    question:
      'A 20 A BS 3036 rewirable fuse protects a circuit installed in an ambient temperature of 40°C (Ca = 0.87). The cable passes through thermal insulation for 200 mm. What minimum It is required?',
    answer:
      'Since the cable passes through insulation for only 200 mm (less than 0.5 m), Ci = 1.0 (the full derating of Ci = 0.5 only applies when totally surrounded for more than 0.5 m — however, you would still check Table 4A2 for partial contact). With a BS 3036 fuse, Cc = 0.725. Assuming no grouping (Cg = 1.0), It >= 20 / (0.87 x 1.0 x 1.0 x 0.725) = 20 / 0.631 = 31.7 A minimum.',
    category: 'Correction Factors',
    difficulty: 'hard',
  },
  {
    id: 'cs12',
    question:
      'Scenario: You are sizing a cable for a cooker circuit in a kitchen where the ambient temperature is 45°C and three other circuits share the same cable route. Explain the impact on cable size.',
    answer:
      'Both the elevated ambient temperature (Ca will be significantly below 1.0, approximately 0.79 for PVC at 45°C from Table 4B1) and the grouping of four circuits together (Cg approximately 0.65 from Table 4C1) will substantially derate the cable. These factors multiply together, so the combined derating is roughly 0.79 x 0.65 = 0.51, meaning the cable needs almost double the It compared to an ungrouped cable at 30°C. This will likely push the cable size up by one or two sizes.',
    category: 'Correction Factors',
    difficulty: 'hard',
  },

  // === Voltage Drop (cs13–cs18) ===
  {
    id: 'cs13',
    question:
      'What are the maximum permitted voltage drop limits for a low voltage installation under BS 7671?',
    answer:
      'BS 7671 Appendix 12 states that voltage drop between the origin of the installation and the load should not exceed 3% of the nominal supply voltage for lighting circuits and 5% for all other circuits. For a 230 V single-phase supply, this equates to a maximum of 6.9 V for lighting and 11.5 V for other uses such as socket outlets, cookers, and showers.',
    category: 'Voltage Drop',
    difficulty: 'easy',
  },
  {
    id: 'cs14',
    question:
      'How do you calculate voltage drop using the mV/A/m values from BS 7671 Appendix 4 tables?',
    answer:
      'The formula for single-phase voltage drop is: VD = (mV/A/m x Ib x L) / 1000, where mV/A/m is the voltage drop per ampere per metre from the relevant Appendix 4 table, Ib is the design current in amperes, and L is the cable route length in metres. The result is in volts. For three-phase circuits, the same formula applies but using the three-phase mV/A/m values from the tables.',
    category: 'Voltage Drop',
    difficulty: 'medium',
  },
  {
    id: 'cs15',
    question:
      'A 2.5 mm² twin and earth cable supplies a 20 A socket outlet circuit with a cable run of 28 m. The mV/A/m value from Table 4D5 is 18 mV/A/m. Does the voltage drop comply?',
    answer:
      'VD = (mV/A/m x Ib x L) / 1000 = (18 x 20 x 28) / 1000 = 10,080 / 1000 = 10.08 V. The maximum allowed for a non-lighting circuit is 5% of 230 V = 11.5 V. Since 10.08 V is less than 11.5 V, the voltage drop complies. However, it is close to the limit, so if the cable run were much longer or the load higher, a larger cable size would be needed.',
    category: 'Voltage Drop',
    difficulty: 'medium',
  },
  {
    id: 'cs16',
    question:
      'Why might voltage drop be the deciding factor in cable selection rather than current-carrying capacity?',
    answer:
      'On long cable runs, even though a smaller cable may have adequate current-carrying capacity for the load, the resistance of the cable over the distance causes excessive voltage drop. This is common on farm installations, outbuildings, garden offices, and large commercial premises. In such cases, you must increase the cable cross-sectional area to reduce resistance and bring the voltage drop within the permitted limits, even though the smaller cable could safely carry the current.',
    category: 'Voltage Drop',
    difficulty: 'medium',
  },
  {
    id: 'cs17',
    question:
      'Which tables in BS 7671 Appendix 4 provide voltage drop data for thermoplastic (PVC) and thermosetting (XLPE) cables?',
    answer:
      'Table 4D1B provides voltage drop data for single-core non-armoured thermoplastic (PVC) cables. Table 4D2B covers single-core armoured thermoplastic cables. Table 4D5 (columns for mV/A/m) covers flat twin and earth thermoplastic cables. For thermosetting (XLPE) cables, Table 4E1B and 4E2B provide the equivalent voltage drop figures. Always use the table that matches both the cable type and insulation material.',
    category: 'Voltage Drop',
    difficulty: 'hard',
  },
  {
    id: 'cs18',
    question:
      'A 6 mm² twin and earth cable (mV/A/m = 7.3) feeds a 9.5 kW electric shower from a consumer unit 18 m away. Calculate the voltage drop and state whether it complies.',
    answer:
      'First, find Ib: P = V x I, so I = 9500 / 230 = 41.3 A. VD = (7.3 x 41.3 x 18) / 1000 = 5428.62 / 1000 = 5.43 V. The maximum allowed for a non-lighting circuit is 5% of 230 V = 11.5 V. Since 5.43 V is well within 11.5 V, the voltage drop complies. However, you would also need to verify that 6 mm² cable has adequate current-carrying capacity (It) for 41.3 A under the relevant installation conditions and correction factors.',
    category: 'Voltage Drop',
    difficulty: 'hard',
  },

  // === Cable Types (cs19–cs24) ===
  {
    id: 'cs19',
    question:
      'What does T&E stand for and what are its common sizes and uses in domestic installations?',
    answer:
      'T&E stands for Twin and Earth — a flat thermoplastic (PVC) sheathed cable with two insulated conductors (line and neutral) and a bare circuit protective conductor (CPC). Common sizes include 1.0 mm² for lighting, 2.5 mm² for socket outlets, 6 mm² for cookers and showers, and 10 mm² for high-power showers or electric vehicle chargers. It is the standard cable for domestic installations, typically installed using reference methods C (clipped direct) or A (in conduit in a wall).',
    category: 'Cable Types',
    difficulty: 'easy',
  },
  {
    id: 'cs20',
    question: 'What is SWA cable and where is it typically used?',
    answer:
      'SWA stands for Steel Wire Armoured cable. It has an inner PVC or XLPE insulation, a layer of galvanised steel wire armour for mechanical protection, and an outer PVC sheath. It is used for underground supplies, external circuits, outdoor lighting, outbuildings, and anywhere cables need protection from mechanical damage. The steel armour can also serve as the circuit protective conductor (CPC), though a separate CPC is often included. It is referenced under installation method D (direct in ground) in Appendix 4.',
    category: 'Cable Types',
    difficulty: 'easy',
  },
  {
    id: 'cs21',
    question: 'What is MICC cable and what are its advantages?',
    answer:
      'MICC stands for Mineral Insulated Copper Clad cable (also known by the brand name Pyro). It uses magnesium oxide powder as insulation between copper conductors, all enclosed in a seamless copper sheath. Its key advantages are exceptional fire resistance (it can maintain circuit integrity at over 1000°C), waterproofing, small diameter for its rating, and extremely long lifespan. It is used in fire alarm circuits, emergency lighting, and safety-critical systems where circuit integrity during a fire is essential.',
    category: 'Cable Types',
    difficulty: 'medium',
  },
  {
    id: 'cs22',
    question: 'What does LSF stand for and why is it specified in certain installations?',
    answer:
      'LSF stands for Low Smoke and Fume (also referred to as LSOH — Low Smoke Zero Halogen). Standard PVC cables produce dense, toxic, halogen-containing smoke when burning, which is dangerous in enclosed spaces and damages electronic equipment. LSF cables use special compounds that produce minimal smoke and no toxic halogen gases. They are specified in public buildings, hospitals, underground railways, high-rise buildings, and other locations where smoke and toxic fumes would hinder escape or cause serious harm.',
    category: 'Cable Types',
    difficulty: 'medium',
  },
  {
    id: 'cs23',
    question: 'What is FP200 cable and how does it differ from standard T&E?',
    answer:
      'FP200 (also called FP200 Gold) is a fire-resistant cable manufactured by Prysmian. Unlike standard T&E which uses PVC insulation, FP200 uses a specially formulated insulation that maintains circuit integrity during a fire. It is used for fire alarm systems, emergency lighting, and smoke ventilation systems where the circuit must continue to function during a fire. It is easier to install than MICC cable while still providing enhanced fire performance to BS 8434-2 and BS 8519.',
    category: 'Cable Types',
    difficulty: 'medium',
  },
  {
    id: 'cs24',
    question:
      'What is the difference between a flexible cord and a flexible cable, and what are common uses of each?',
    answer:
      'A flexible cord (flex) has a cross-sectional area up to and including 4 mm² and is used to connect portable appliances to socket outlets, pendant lamp holders, and other moveable equipment. A flexible cable has a cross-sectional area above 4 mm² and is used for heavier applications such as submersible pumps, temporary site supplies, and industrial moveable equipment. Both use stranded conductors for flexibility. Common flex types include 3183Y (round PVC), 3182Y (flat PVC), and 3183TQ (rubber/tough). Selection must consider the current rating, mechanical stress, and environmental conditions.',
    category: 'Cable Types',
    difficulty: 'easy',
  },

  // === Installation Methods (cs25–cs28) ===
  {
    id: 'cs25',
    question:
      'What are the reference installation methods A, B, and C from BS 7671 Appendix 4, and give an example of each?',
    answer:
      'Reference Method A covers cables enclosed in conduit in a thermally insulating wall — for example, PVC twin and earth in plastic conduit chased into a plastered brick wall. Reference Method B covers cables enclosed in conduit on a wall or in trunking — for example, singles in steel conduit surface-mounted on a wall. Reference Method C covers cables clipped direct to a non-metallic surface — for example, twin and earth clipped to a joist in a loft. Each method has different current-carrying capacity values because of differing heat dissipation characteristics.',
    category: 'Installation Methods',
    difficulty: 'medium',
  },
  {
    id: 'cs26',
    question:
      'What is reference installation method D and which cable type is most commonly associated with it?',
    answer:
      'Reference Method D applies to cables installed directly in the ground, either with or without mechanical protection (ducting or cable tiles). The most commonly associated cable type is SWA (Steel Wire Armoured) cable. When installed using Method D, cables must be buried at a minimum depth of 500 mm (or 600 mm under roads). The current-carrying capacity for Method D differs from surface methods because the ground temperature and thermal resistivity of the soil affect heat dissipation.',
    category: 'Installation Methods',
    difficulty: 'easy',
  },
  {
    id: 'cs27',
    question:
      "Why does the installation method significantly affect a cable's current-carrying capacity?",
    answer:
      'The installation method determines how effectively a cable can dissipate the heat generated by the current flowing through it. A cable clipped to an open surface (Method C) can radiate heat freely and therefore has a higher current rating than the same cable enclosed in conduit in an insulated wall (Method A), where heat is trapped. Similarly, cables on a perforated cable tray (Method E) with air circulating around them have the highest ratings. Selecting the wrong installation method from the tables could lead to an undersized cable overheating.',
    category: 'Installation Methods',
    difficulty: 'medium',
  },
  {
    id: 'cs28',
    question:
      'What are reference installation methods E, F, and G, and where would you encounter them?',
    answer:
      'Reference Method E applies to cables run on a perforated horizontal cable tray — common in commercial and industrial installations where multiple circuits are run on open metalwork. Reference Method F applies to cables clipped to a vertical surface or on a non-perforated cable tray. Reference Method G applies to cables spaced from a surface, such as cables supported by catenary wire or on ladder racking. Methods E and G generally offer the highest current-carrying capacities because cables have maximum air circulation for cooling.',
    category: 'Installation Methods',
    difficulty: 'hard',
  },

  // === CPC Sizing & Thermal Constraints (cs29–cs30) ===
  {
    id: 'cs29',
    question:
      'How is the minimum cross-sectional area of a circuit protective conductor (CPC) determined using Table 54.7 of BS 7671?',
    answer:
      'Table 54.7 provides a simplified method for selecting the minimum CPC size based on the line conductor size. If the line conductor is up to and including 16 mm², the CPC must be at least the same size. If the line conductor is between 16 mm² and 35 mm², the CPC must be at least 16 mm². If the line conductor exceeds 35 mm², the CPC must be at least half the line conductor size. This is the simplified method — alternatively, the adiabatic equation can be used for a more precise calculation.',
    category: 'Installation Methods',
    difficulty: 'medium',
  },
  {
    id: 'cs30',
    question: 'What is the adiabatic equation for CPC sizing and what does each symbol represent?',
    answer:
      'The adiabatic equation is S = sqrt(I² x t) / k, where S is the minimum cross-sectional area of the CPC in mm², I is the fault current in amperes, t is the disconnection time of the protective device in seconds, and k is a factor depending on the conductor material, insulation type, and initial/final temperatures (values given in Tables 54.2 to 54.6 of BS 7671). This equation ensures the CPC can withstand the thermal energy released during a fault without its insulation exceeding its maximum permissible temperature.',
    category: 'Installation Methods',
    difficulty: 'hard',
  },
];
