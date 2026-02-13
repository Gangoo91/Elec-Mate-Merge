import { FlashcardData } from './types';

export const solarPvDesign: FlashcardData[] = [
  // ── PV Fundamentals ──────────────────────────────────────────────────────

  {
    id: 'spv1',
    question: 'What are the three main types of photovoltaic cell technology used in solar panels?',
    answer:
      'Monocrystalline (cut from a single silicon crystal, highest efficiency ~20–22%, dark appearance), polycrystalline (cast from multiple silicon crystals, slightly lower efficiency ~15–17%, blue speckled appearance), and thin-film (amorphous silicon or cadmium telluride deposited on a substrate, lowest efficiency ~10–12% but lightweight and flexible). Monocrystalline is the most common choice for UK domestic installations due to its superior performance in lower light conditions.',
    category: 'PV Fundamentals',
    difficulty: 'easy',
  },
  {
    id: 'spv2',
    question: 'What do the following PV module parameters represent: Voc, Isc, Vmp, Imp, and Pmax?',
    answer:
      'Voc (open-circuit voltage) is the maximum voltage when no current flows. Isc (short-circuit current) is the maximum current when voltage is zero. Vmp (voltage at maximum power) and Imp (current at maximum power) are the operating voltage and current at peak output. Pmax is the maximum power output in watts, calculated as Vmp multiplied by Imp, and is measured under Standard Test Conditions (STC: 1000 W/m² irradiance, 25°C cell temperature, AM1.5 spectrum).',
    category: 'PV Fundamentals',
    difficulty: 'medium',
  },
  {
    id: 'spv3',
    question: 'What is the fill factor of a PV module and why is it important?',
    answer:
      'The fill factor (FF) is the ratio of the actual maximum power (Pmax) to the theoretical maximum power (Voc × Isc). It is expressed as FF = Pmax / (Voc × Isc) and is typically between 0.7 and 0.85 for crystalline silicon modules. A higher fill factor indicates a more efficient cell with lower internal losses. It is a key quality indicator used to compare modules from different manufacturers.',
    category: 'PV Fundamentals',
    difficulty: 'hard',
  },
  {
    id: 'spv4',
    question: 'How does temperature affect the output of a crystalline silicon PV module?',
    answer:
      "As cell temperature increases above STC (25°C), voltage decreases significantly while current increases only slightly, resulting in an overall reduction in power output. A typical temperature coefficient for power is around −0.3% to −0.5% per degree Celsius above 25°C. This means on a hot summer day with cell temperatures of 60°C, a module could lose approximately 10–17% of its rated power. This must be accounted for when calculating string voltages to ensure they remain within the inverter's MPPT window.",
    category: 'PV Fundamentals',
    difficulty: 'medium',
  },

  // ── System Design ────────────────────────────────────────────────────────

  {
    id: 'spv5',
    question:
      'What is the difference between connecting PV modules in series (a string) and in parallel?',
    answer:
      "Modules connected in series form a string — their voltages add together while the current remains that of a single module. Modules connected in parallel combine their currents while voltage stays the same. Most domestic systems use series strings to reach the inverter's minimum input voltage. Parallel connections are used when multiple strings feed a single inverter, requiring string fuses or combiner boxes to protect against reverse current flow.",
    category: 'System Design',
    difficulty: 'easy',
  },
  {
    id: 'spv6',
    question: 'What is MPPT and why is it essential in a solar PV system?',
    answer:
      'MPPT (Maximum Power Point Tracking) is an algorithm used by inverters to continuously adjust the operating voltage and current to extract the maximum possible power from the PV array. The maximum power point shifts with changes in irradiance and temperature throughout the day. Without MPPT, the system would operate at a sub-optimal point on the I-V curve, significantly reducing energy harvest. Modern string inverters typically have one or two MPPT inputs, allowing independent optimisation of different roof faces or string configurations.',
    category: 'System Design',
    difficulty: 'medium',
  },
  {
    id: 'spv7',
    question: 'What does kWp mean and how is annual yield (kWh/kWp) used in system sizing?',
    answer:
      "kWp (kilowatt-peak) is the rated output of a PV system under Standard Test Conditions (STC). Annual yield, expressed in kWh/kWp, indicates how many kilowatt-hours each kilowatt-peak of installed capacity is expected to generate per year at a given location. In the UK, a well-oriented system in southern England typically achieves 850–950 kWh/kWp per year, while in Scotland this drops to around 750–850 kWh/kWp. This figure is used alongside the customer's annual electricity consumption to size the system appropriately.",
    category: 'System Design',
    difficulty: 'easy',
  },
  {
    id: 'spv8',
    question: 'How do roof orientation and tilt angle affect PV system performance in the UK?',
    answer:
      'The optimum orientation in the UK is due south (azimuth 180°) with a tilt of approximately 30–35° from horizontal, which maximises annual energy capture. A south-east or south-west facing roof loses only around 5% compared to due south. An east–west split installation (modules on both roof faces) produces a broader generation curve throughout the day but around 15% less total annual yield. North-facing installations are generally not recommended as they can lose 50% or more of potential output.',
    category: 'System Design',
    difficulty: 'easy',
  },
  {
    id: 'spv9',
    question:
      'Why is shading analysis critical for PV system design, and what is its effect on a series string?',
    answer:
      "In a series-connected string, every module must pass the same current. If one module is shaded, its current output drops and it becomes a bottleneck, limiting the entire string's output to the level of the weakest module. Shading on even one cell can cause 'hot spots' where the shaded cell dissipates power as heat, potentially causing damage. Bypass diodes within modules help mitigate partial shading by allowing current to skip shaded cell groups, but string-level losses can still be significant. A thorough shading analysis using tools such as the Solar Pathfinder or software horizon surveys is required for MCS compliance.",
    category: 'System Design',
    difficulty: 'medium',
  },
  {
    id: 'spv10',
    question:
      'What are the four main types of inverter used in PV installations, and when would each be specified?',
    answer:
      'String inverters are the most common for domestic use — one inverter handles one or more series strings and is cost-effective for unshaded, uniformly oriented arrays. Microinverters are fitted to each individual module, providing module-level MPPT and monitoring — ideal for complex roofs with partial shading or multiple orientations. Hybrid inverters combine a PV inverter with a battery charger/inverter in one unit, simplifying battery storage installations. Battery-ready inverters are standard string inverters designed to accept a battery interface later without replacing the inverter. The choice depends on roof layout, shading, budget, and whether battery storage is required now or in future.',
    category: 'System Design',
    difficulty: 'medium',
  },

  // ── Installation ─────────────────────────────────────────────────────────

  {
    id: 'spv11',
    question: 'What factors determine the correct DC cable size for PV strings?',
    answer:
      'DC cable sizing for PV strings must account for the string short-circuit current (Isc) multiplied by a safety factor (typically 1.25 for continuous generation), the cable run length from the array to the inverter, the acceptable voltage drop (generally no more than 3% on the DC side), and the installation method and ambient temperature derating factors. Solar DC cables must be double-insulated, UV-resistant, and rated for the maximum system voltage. BS 7671 Section 712 and the IET Code of Practice for Grid Connected Solar Photovoltaic Systems provide detailed guidance on DC cable selection.',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'spv12',
    question:
      'What are the DC isolator requirements for a domestic PV installation, and who needs access?',
    answer:
      'A DC isolator must be installed adjacent to the inverter to allow safe disconnection of the PV array for inverter maintenance. It must be rated for DC use (not an AC isolator repurposed) and capable of breaking the full load current under voltage. An additional rooftop DC isolator may be required depending on the installation design. The inverter-side DC isolator must be accessible to the Distribution Network Operator (DNO) so they can safely de-energise the system. All DC isolators must be clearly labelled with appropriate warning signs as required by Section 712.514 of BS 7671.',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'spv13',
    question:
      'How is the AC output of a PV inverter typically connected to the consumer unit in a domestic installation?',
    answer:
      "The inverter's AC output is connected to a dedicated circuit in the consumer unit via appropriately sized cable (typically 2.5 mm² or 4 mm² depending on the inverter output current and cable run). The circuit must be protected by an appropriately rated MCB or RCBO. Under BS 7671 Regulation 712.411.3.2.1.2, the PV supply circuit should be connected to the load side of the main switch. Warning labels indicating the presence of a dual supply must be fitted at the consumer unit, the meter position, and the inverter location as required by Regulation 712.514.",
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'spv14',
    question:
      'What earthing arrangements are required for PV module frames and mounting structures?',
    answer:
      'All exposed-conductive-parts of the PV installation, including module frames, mounting rails, and any metallic components, must be connected to the main earthing terminal of the installation via a protective conductor. This equipotential bonding prevents dangerous touch voltages in the event of a fault. Section 712 of BS 7671 requires this bonding, and the protective conductor must be sized in accordance with Table 54.7 or calculated using the adiabatic equation. Where the system is installed on a building with a lightning protection system, the PV framework must be bonded to it in accordance with BS EN 62305.',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'spv15',
    question: 'What fire safety labelling requirements apply to buildings with rooftop PV systems?',
    answer:
      "Fire safety labels must be displayed to warn firefighters of the presence of a PV system and DC voltages that cannot be isolated by simply turning off the mains supply. Labels must be placed at the meter position, the consumer unit, and the inverter location, clearly indicating 'SOLAR PV — DUAL SUPPLY' and warning of DC shock risk. The IET Code of Practice for Grid Connected Solar Photovoltaic Systems also recommends labelling at the point of entry of DC cables into the building. Some fire services additionally request external signage near the main entrance or electricity meter to alert emergency responders before they enter the building.",
    category: 'Installation',
    difficulty: 'easy',
  },

  // ── Grid Connection ──────────────────────────────────────────────────────

  {
    id: 'spv16',
    question:
      'What is the difference between Engineering Recommendation G98 and G99 for grid-connected PV systems?',
    answer:
      'G98 applies to small-scale generation up to 16A per phase (3.68 kW single-phase, 11.04 kW three-phase). Under G98, the installer simply notifies the DNO using the standard notification form — no prior approval is needed, and connection can proceed immediately after notification. G99 applies to larger installations exceeding the G98 threshold and requires a formal application to the DNO, including technical studies, before connection is permitted. G99 approval can take several weeks and the DNO may impose conditions or require network reinforcement. The older G83 and G59 standards have been superseded and must not be referenced.',
    category: 'Grid Connection',
    difficulty: 'easy',
  },
  {
    id: 'spv17',
    question:
      'What is the Smart Export Guarantee (SEG) and what conditions must be met for a PV system to qualify?',
    answer:
      'The Smart Export Guarantee (SEG) is a scheme requiring licensed electricity suppliers with 150,000 or more customers to offer a tariff for exported electricity from small-scale generation up to 5 MW. To qualify, the PV installation must be MCS-certified and fitted with a smart meter or export meter capable of recording half-hourly export data. The SEG replaced the Feed-in Tariff (FiT) scheme, which closed to new applicants in March 2019. SEG tariffs vary by supplier and are not regulated, so customers should compare rates.',
    category: 'Grid Connection',
    difficulty: 'easy',
  },
  {
    id: 'spv18',
    question:
      'What is MCS certification and why is it a requirement for domestic PV installations?',
    answer:
      'MCS (Microgeneration Certification Scheme) certifies both renewable energy products and the installers who fit them. An MCS-certified installation confirms that the system has been designed and installed to recognised standards, including the MCS Installation Standard MIS 3002 for solar PV. MCS certification is mandatory for the homeowner to claim Smart Export Guarantee (SEG) payments and was also required under the now-closed Feed-in Tariff scheme. The installer must carry out a shading analysis, system design calculations, and commissioning tests, all documented on the MCS certificate.',
    category: 'Grid Connection',
    difficulty: 'easy',
  },

  // ── Regulations ──────────────────────────────────────────────────────────

  {
    id: 'spv19',
    question:
      'Which section of BS 7671:2018+A2:2022 covers solar photovoltaic power supply systems, and what are its key requirements?',
    answer:
      'Section 712 covers solar photovoltaic (PV) power supply systems. Key requirements include: selection and installation of equipment rated for the maximum voltage and current of the PV array; DC cable protection and isolation; equipotential bonding of all exposed-conductive-parts (module frames and mounting structures); labelling at the consumer unit, meter, and inverter warning of dual supply; and appropriate overcurrent and fault protection. Section 712 also addresses the specific risks of PV installations, including the fact that DC circuits remain live whenever the modules are exposed to light.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'spv20',
    question:
      'What does Regulation 530.3.201, introduced by Amendment A3:2024 of BS 7671, require for prosumer installations?',
    answer:
      'Regulation 530.3.201, introduced in BS 7671:2018+A3:2024, addresses installations where energy can flow in both directions — known as prosumer installations. This includes properties with solar PV, battery storage, or EV vehicle-to-grid (V2G) systems that export power. The regulation requires that all switching and protective devices in the energy flow path are suitable for bidirectional current, or where unidirectional devices are used, that they are correctly oriented and additional measures are in place to prevent reverse energy flow through devices not rated for it. This is critical because standard MCBs and RCDs may not function correctly when current flows in the reverse direction.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'spv21',
    question:
      'A domestic property has solar PV and battery storage. Under Regulation 530.3.201 (A3:2024), what must be verified about the protective devices in the consumer unit?',
    answer:
      "You must verify that all overcurrent protective devices (MCBs or RCBOs) and residual current devices (RCDs) in the path of energy flow are rated for bidirectional operation, or that unidirectional devices are correctly installed with their feed direction matching the primary direction of current flow. If unidirectional devices are used, additional measures such as directional relays or export limitation must prevent reverse current exceeding the device's rating in the non-rated direction. This is particularly important in prosumer installations where solar PV or battery storage can feed energy back through the consumer unit towards the meter and grid.",
    category: 'Regulations',
    difficulty: 'hard',
  },

  // ── Battery Storage Integration ──────────────────────────────────────────

  {
    id: 'spv22',
    question:
      'What is the difference between AC-coupled and DC-coupled battery storage in a PV system?',
    answer:
      'In a DC-coupled system, the battery is connected on the DC side of the inverter (between the PV array and the inverter) using a hybrid inverter or DC-DC converter. PV energy charges the battery directly without an intermediate DC-to-AC conversion, resulting in slightly higher efficiency. In an AC-coupled system, the battery has its own separate inverter/charger connected on the AC side, alongside the existing PV inverter. AC coupling is more flexible for retrofitting batteries to existing PV systems as the original inverter is retained. DC coupling is generally preferred for new-build installations where a hybrid inverter is specified from the outset.',
    category: 'System Design',
    difficulty: 'medium',
  },
  {
    id: 'spv23',
    question:
      'When integrating battery storage with a PV system, what additional regulatory considerations apply under BS 7671?',
    answer:
      'Battery storage introduces bidirectional energy flow, bringing the installation within the scope of Regulation 530.3.201 (A3:2024) requiring bidirectional-rated or correctly oriented switching and protective devices. The battery system must have its own DC and AC isolation provisions. Ventilation must be adequate to dissipate heat and manage any gases from the battery chemistry (particularly lithium-ion thermal runaway risk). The battery must not be installed along escape routes. If the combined PV and battery export exceeds the G98 threshold (3.68 kW single-phase), a G99 application to the DNO is required. The entire system must be commissioned as an integrated installation.',
    category: 'Regulations',
    difficulty: 'hard',
  },

  // ── Commissioning & Testing ──────────────────────────────────────────────

  {
    id: 'spv24',
    question:
      'What commissioning tests must be carried out on a newly installed grid-connected PV system?',
    answer:
      'Commissioning tests include: open-circuit voltage (Voc) measurement of each string to verify correct series configuration; short-circuit current (Isc) measurement to confirm module performance; polarity checks on all DC connections; insulation resistance testing of the DC side (positive-to-earth and negative-to-earth); continuity of protective conductors and equipotential bonding; functional testing of DC and AC isolators; verification of inverter settings (voltage, frequency, and anti-islanding protection); and a run test to confirm the system is generating and exporting correctly. All results must be recorded on the commissioning certificate and MCS documentation.',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'spv25',
    question:
      'During commissioning, you measure the Voc of a 10-module string and the reading is approximately 90% of the expected value. What could cause this?',
    answer:
      "A Voc reading at approximately 90% of the expected value for a 10-module string suggests one module may be bypassed or faulty, since 9 out of 10 modules equals 90% of the expected string voltage. Other possible causes include a high cell temperature reducing voltage (check the temperature coefficient), a poor or high-resistance connection at one module's MC4 connectors, or partial shading activating bypass diodes within one or more modules. You should check all connections, inspect each module for visible damage, and re-measure under consistent irradiance conditions to isolate the fault.",
    category: 'Installation',
    difficulty: 'hard',
  },

  // ── EV & PV Integration ──────────────────────────────────────────────────

  {
    id: 'spv26',
    question:
      'What are the key considerations when integrating an EV charger with a domestic solar PV system?',
    answer:
      'Key considerations include: maximum demand assessment to ensure the supply can handle both PV export and EV charging load simultaneously; use of a smart EV charger capable of solar divert mode (excess PV generation is diverted to charge the EV rather than being exported); dedicated circuits for both the PV system and the EV charger from the consumer unit; correct earthing arrangements for the EV charger (PME restrictions apply under Section 722 of BS 7671); and consideration of Regulation 530.3.201 (A3:2024) where the combined system involves bidirectional energy flow. If battery storage is also present, load management becomes essential to balance generation, storage, and consumption.',
    category: 'System Design',
    difficulty: 'hard',
  },

  // ── Additional Design & Practical ────────────────────────────────────────

  {
    id: 'spv27',
    question: 'What is anti-islanding protection on a PV inverter and why is it required?',
    answer:
      "Anti-islanding protection is a safety feature that automatically disconnects the PV inverter from the grid if the mains supply is lost. Without it, the PV system could continue energising the local network (creating an 'island'), which poses a lethal shock risk to DNO engineers working on what they believe to be a de-energised line. Under G98 and G99, all grid-connected inverters must incorporate loss-of-mains (LoM) protection that detects grid failure within a specified time (typically under 5 seconds) and shuts down. The inverter must also have rate-of-change-of-frequency (RoCoF) and vector shift protection settings compliant with the latest ENA requirements.",
    category: 'Grid Connection',
    difficulty: 'hard',
  },
  {
    id: 'spv28',
    question:
      'A customer asks whether a 4 kWp PV system can be connected to their single-phase supply without DNO approval. What is your answer?',
    answer:
      'No, a 4 kWp system exceeds the G98 threshold of 3.68 kW (16A per phase at 230V) for single-phase connections. G98 allows connection by notification only for systems up to 3.68 kW single-phase. Since 4 kWp exceeds this limit, a G99 application must be submitted to the Distribution Network Operator (DNO) and written approval obtained before the system can be connected to the grid. Alternatively, the system could be export-limited to 3.68 kW using inverter settings, which may allow it to be connected under G98 — but this must be confirmed with the specific DNO as policies vary.',
    category: 'Grid Connection',
    difficulty: 'medium',
  },
];
