import { FlashcardData } from './types';

export const advancedInspection: FlashcardData[] = [
  // === Dead Tests ===
  {
    id: 'ai1',
    question:
      'What is the safe isolation procedure that must be completed before any dead testing begins?',
    answer:
      'Per GN3 9th Edition and BS 7671:2018+A2:2022, safe isolation requires: identify the circuit, switch off and lock off the supply with a unique personal lock, prove a voltage indicator on a known live source, test between all conductors and earth to confirm dead, then re-prove the voltage indicator on the known live source. This prove-test-prove sequence ensures the instrument is functioning correctly and the circuit is genuinely de-energised before any dead testing proceeds.',
    category: 'Dead Tests',
    difficulty: 'easy',
  },
  {
    id: 'ai2',
    question: 'Describe the R1+R2 method for testing continuity of protective conductors.',
    answer:
      'The R1+R2 method involves connecting a low-resistance ohmmeter between the line conductor and the circuit protective conductor (cpc) at the distribution board, then measuring the resistance at each point (socket outlet, light fitting, etc.) along the circuit. Per BS 7671:2018+A2:2022 and GN3, each reading gives the combined resistance of the line conductor (R1) and the cpc (R2) from the board to that point. The highest R1+R2 value is used to verify that the measured earth fault loop impedance (Zs) does not exceed the tabulated maximum for the protective device.',
    category: 'Dead Tests',
    difficulty: 'medium',
  },
  {
    id: 'ai3',
    question: 'What are the three steps of the ring final circuit continuity test?',
    answer:
      'Step 1: Measure the end-to-end resistance of each conductor (L-L, N-N, cpc-cpc) with the ring broken at the board, giving r1, rn, and r2 respectively. Step 2: Cross-connect the line and neutral conductors (L to opposite N) and measure at every socket — each reading should be approximately (r1 + rn) / 4. Step 3: Cross-connect the line and cpc conductors (L to opposite cpc) and measure at every socket — each reading should be approximately (r1 + r2) / 4 and this gives R1+R2 at each point. Per GN3, any socket reading substantially higher than the expected value indicates a break or interconnection fault in the ring.',
    category: 'Dead Tests',
    difficulty: 'hard',
  },
  {
    id: 'ai4',
    question:
      'What test voltage and minimum acceptable insulation resistance value apply to a 230V AC circuit?',
    answer:
      'Per Table 6.2 of GN3 (9th Edition) and BS 7671:2018+A2:2022, circuits rated up to and including 500V AC (which includes standard 230V single-phase circuits) must be tested at 500V DC. The minimum acceptable insulation resistance is 1 MΩ. In practice, readings well above 2 MΩ are expected on healthy circuits; anything approaching the 1 MΩ minimum warrants investigation for deterioration or moisture ingress.',
    category: 'Dead Tests',
    difficulty: 'easy',
  },
  {
    id: 'ai5',
    question:
      'Why must all electronic equipment and sensitive devices be disconnected before insulation resistance testing?',
    answer:
      'Insulation resistance testing applies 500V DC (or 250V/1000V DC depending on circuit voltage) between conductors, which can damage or destroy electronic components such as LED drivers, dimmer switches, PIR sensors, RCBOs, and smart controls. GN3 advises that all such equipment must be disconnected or isolated before testing, and that the test should be conducted between all live conductors connected together and earth, then between line and neutral where required. Failure to disconnect sensitive equipment is a common cause of damage during periodic inspection.',
    category: 'Dead Tests',
    difficulty: 'medium',
  },
  {
    id: 'ai6',
    question:
      'How is polarity verified at each point during dead testing, and why is it important?',
    answer:
      'Polarity is verified using a low-resistance ohmmeter or continuity tester to confirm that single-pole switching devices are connected in the line conductor only, that the centre contact of Edison-screw lampholders is connected to the line conductor, and that socket outlets are correctly wired (line, neutral, and earth in the correct terminals). Per BS 7671:2018+A2:2022 Regulation 612.6, incorrect polarity can result in parts remaining live when a switch is turned off, creating a serious electric shock risk.',
    category: 'Dead Tests',
    difficulty: 'easy',
  },
  {
    id: 'ai7',
    question:
      'How do you test continuity of main protective bonding conductors and supplementary bonding conductors?',
    answer:
      'Using a low-resistance ohmmeter, measure from the main earthing terminal to each bonding clamp on the extraneous-conductive-parts (gas, water, oil, structural steelwork) for main bonding. For supplementary bonding (e.g., in bathrooms), measure between simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts. Per GN3 and BS 7671:2018+A2:2022 Regulation 612.2, the readings should be very low (typically below 0.05 Ω for main bonding) and must demonstrate a continuous, sound connection throughout the protective conductor path.',
    category: 'Dead Tests',
    difficulty: 'medium',
  },
  // === Live Tests ===
  {
    id: 'ai8',
    question:
      'How is earth fault loop impedance (Zs) measured, and how is the result verified against tables?',
    answer:
      'Zs is measured using a loop impedance tester connected at the furthest point of the circuit whilst the supply is live. The instrument injects a brief test current and measures the total impedance of the fault loop (supply transformer, line conductor, cpc, and earth path). Per BS 7671:2018+A2:2022 Table 41.2–41.4, the measured Zs must not exceed 80% of the tabulated maximum (to account for conductor temperature rise under fault conditions). Alternatively, Zs can be verified by calculation: Zs = Ze + (R1+R2), where Ze is measured at the origin and R1+R2 is the value from dead testing.',
    category: 'Live Tests',
    difficulty: 'medium',
  },
  {
    id: 'ai9',
    question: 'What is prospective fault current (PFC) and why must it be measured?',
    answer:
      'Prospective fault current is the maximum current that would flow under a fault condition (both line-earth and line-neutral) at any point in the installation, most critically at the origin. Per BS 7671:2018+A2:2022 Regulation 612.11, PFC must be measured or determined to confirm that all protective devices have an adequate breaking capacity (rated short-circuit capacity) to safely interrupt the fault. If the PFC exceeds the breaking capacity of a device, the device could fail to clear the fault, leading to fire or explosion. PFC is measured using a loop impedance tester set to the PFC/PSCC function.',
    category: 'Live Tests',
    difficulty: 'medium',
  },
  {
    id: 'ai10',
    question: 'Describe the full RCD test sequence including x1, x5, ramp, and phase angle tests.',
    answer:
      'Per GN3 and BS 7671:2018+A2:2022 Regulation 612.13, the full RCD test sequence for a 30mA general-type RCD is: (1) at rated residual current (x1 or 30mA), the RCD must trip within 300ms; (2) at five times rated residual current (x5 or 150mA), the RCD must trip within 40ms; (3) a ramp test gradually increases the current to determine the actual tripping current, which must be between 50% and 100% of IΔn (15–30mA for a 30mA device). All tests should be carried out at both 0° and 180° phase angle to check operation on both positive and negative half-cycles of the waveform, as the RCD must operate reliably regardless of fault inception point.',
    category: 'Live Tests',
    difficulty: 'hard',
  },
  {
    id: 'ai11',
    question:
      'How is earth electrode resistance tested on a TT system, and what is an acceptable value?',
    answer:
      'Earth electrode resistance (RA) can be measured using a dedicated earth electrode resistance tester employing the fall-of-potential method with temporary test spikes, or by calculation from Zs and Ze readings. Per BS 7671:2018+A2:2022 Regulation 411.5.3, for TT systems protected by a 30mA RCD, the product RA × IΔn must not exceed 50V (i.e., RA must not exceed 1667 Ω). However, GN3 recommends a maximum RA of 200 Ω for reliable RCD operation. If the electrode resistance is too high, the RCD may not operate quickly enough to provide automatic disconnection within the required time.',
    category: 'Live Tests',
    difficulty: 'hard',
  },
  {
    id: 'ai12',
    question: 'How do you verify R1+R2 dead-test values against measured Zs live-test values?',
    answer:
      'The measured Zs at any point should approximately equal Ze + (R1+R2), where Ze is the external earth fault loop impedance measured at the origin and R1+R2 is the highest dead-test value for that circuit. Per GN3, if the live Zs reading differs significantly from the calculated value (Ze + R1+R2), this indicates a potential fault such as a poor connection, parallel earth path, or instrument error. The comparison acts as a cross-check to validate both the dead and live test results and ensures confidence in the overall Zs figure used to verify disconnection times.',
    category: 'Live Tests',
    difficulty: 'medium',
  },
  {
    id: 'ai13',
    question: 'What is the purpose of testing phase sequence on a three-phase system?',
    answer:
      'Phase sequence (also called phase rotation) testing confirms that the three phases (L1, L2, L3) are connected in the correct order — typically a clockwise rotation. Per BS 7671:2018+A2:2022 Regulation 612.12, incorrect phase sequence can cause three-phase motors to run in reverse, damage equipment, and create safety hazards. A phase rotation meter is connected to the three phases to verify the direction. This test is essential at the origin and at any three-phase distribution equipment or motor connection point.',
    category: 'Live Tests',
    difficulty: 'easy',
  },
  {
    id: 'ai14',
    question:
      'What functional tests must be carried out during initial verification and periodic inspection?',
    answer:
      'Per BS 7671:2018+A2:2022 Regulation 612.13, functional testing includes operating all switchgear and protective devices to confirm they function correctly, testing RCDs via their built-in test button, verifying interlocks (e.g., isolator interlocks on panels), testing controls and switches for correct operation, and checking that drives, contactors, and relays operate as intended. All assemblies must be checked for proper operation under normal service conditions. For periodic inspection, GN3 states that functional testing is also required on fire alarm circuits, emergency lighting, and any other safety systems present.',
    category: 'Live Tests',
    difficulty: 'easy',
  },
  // === EICR Process ===
  {
    id: 'ai15',
    question: "What is the purpose of defining the 'extent and limitations' on an EICR?",
    answer:
      'The extent and limitations section of the EICR defines exactly what was and was not inspected and tested during the periodic inspection. Per BS 7671:2018+A2:2022 and GN3, this includes any circuits not tested, any parts of the installation that were inaccessible, and any agreed limitations (e.g., no floor voids lifted, sampling only on lighting circuits). This is essential because it protects both the inspector and the client by clearly recording the scope of the inspection, ensuring that nobody assumes areas not examined have been assessed as satisfactory.',
    category: 'EICR Process',
    difficulty: 'easy',
  },
  {
    id: 'ai16',
    question: 'Explain the EICR observation codes C1, C2, C3, and FI in detail.',
    answer:
      'C1 (Danger Present) means an immediate risk of injury exists and requires urgent remedial action — the person ordering the work should be advised to take immediate action. C2 (Potentially Dangerous) means the observation is not immediately dangerous but could become so, and remedial action is required urgently. C3 (Improvement Recommended) means the installation does not comply with the current edition of BS 7671 but did comply when originally installed, and improvement is recommended but not required. FI (Further Investigation) means that a potential issue has been identified but further investigation is needed to determine its nature and extent, which was outside the scope of the current inspection. Per GN3, FI should not be used to avoid making a judgement where sufficient evidence exists.',
    category: 'EICR Process',
    difficulty: 'medium',
  },
  {
    id: 'ai17',
    question: 'How is the overall condition of an installation determined on an EICR?',
    answer:
      "Per GN3 and the model forms in BS 7671:2018+A2:2022 Appendix 6, the overall condition is assessed as either 'Satisfactory' (the installation is safe to continue in use) or 'Unsatisfactory' (remedial action is required). An installation must be recorded as Unsatisfactory if any C1 or C2 observations are noted. An installation with only C3 observations may be recorded as Satisfactory, since these indicate non-compliance with the current standard rather than an existing danger. The inspector must use professional judgement and consider the cumulative effect of multiple C3 observations.",
    category: 'EICR Process',
    difficulty: 'medium',
  },
  {
    id: 'ai18',
    question: 'What sampling strategy is acceptable during periodic inspection, according to GN3?',
    answer:
      "GN3 (Guidance Note 3, 9th Edition) permits sampling during periodic inspection where it is impractical to test every circuit or every point. Typically, at least 10% of points on lighting circuits are tested, with the sample increased or the entire circuit tested if defects are found. For ring final circuits, all sockets on a ring should be tested (all three steps of the ring test) rather than sampled. The sampling extent must be recorded in the 'extent and limitations' section of the EICR. If any sample test reveals a defect, the sample size must be increased to determine the full extent of the problem.",
    category: 'EICR Process',
    difficulty: 'hard',
  },
  {
    id: 'ai19',
    question:
      'What recommended frequencies for periodic inspection does IET guidance suggest for different types of installation?',
    answer:
      "Per IET guidance and Table 3.2 in GN3 (9th Edition), recommended maximum intervals include: domestic dwellings every 10 years (or on change of occupancy), commercial premises every 5 years, industrial installations every 3 years, places of public entertainment annually, swimming pools and special installations annually, caravan parks annually, and agricultural premises every 3 years. These are guidance intervals and may be shortened based on the inspector's assessment of the installation's condition, environmental factors, or the use of the premises. The recommended date for the next inspection must be stated on the EICR.",
    category: 'EICR Process',
    difficulty: 'easy',
  },
  {
    id: 'ai20',
    question:
      'How should test results be recorded and interpreted on the schedule of test results?',
    answer:
      "Per BS 7671:2018+A2:2022 Appendix 6 and GN3, all measured values must be recorded on the schedule of test results in the correct columns: continuity (R1+R2 and R2 where applicable), insulation resistance (in MΩ), polarity (tick or cross), earth fault loop impedance Zs (in Ω), PFC (in kA), and RCD operating times (in ms). Results should be compared against the relevant maximum permissible values from BS 7671 tables. Any reading that approaches or exceeds the maximum must trigger further investigation. Where no test is carried out (due to agreed limitations), the cell should be marked with an 'LIM' notation rather than left blank.",
    category: 'EICR Process',
    difficulty: 'hard',
  },
  // === Special Locations ===
  {
    id: 'ai21',
    question:
      'What additional testing requirements apply in bathrooms (Section 701 special locations)?',
    answer:
      'Per BS 7671:2018+A2:2022 Section 701, bathrooms are divided into Zones 0, 1, and 2, each with specific requirements for IP rating, equipment type, and protective measures. During inspection, the tester must verify: all circuits are protected by a 30mA RCD (Regulation 701.411.3.3), supplementary bonding is in place where required (or verified as unnecessary if all circuits are RCD protected), the correct IP ratings are present for each zone (IPX7 in Zone 0, IPX4 in Zone 1 and 2), and that no socket outlets are installed within 3 metres of Zone 1 (except shaver supply units to BS EN 61558-2-5). All circuits must be tested for insulation resistance and earth fault loop impedance.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'ai22',
    question:
      'What special testing considerations apply to swimming pool installations under Section 702?',
    answer:
      'Per BS 7671:2018+A2:2022 Section 702, swimming pool and paddling pool locations require SELV (Separated Extra-Low Voltage) in Zone 0 and Zone 1, with the SELV source located outside Zones 0, 1, and 2. During testing, the inspector must verify: supplementary equipotential bonding connects all extraneous-conductive-parts within Zones 0, 1, and 2; all equipment meets the required IP ratings (IPX8 in Zone 0, IPX4 or IPX5 in Zones 1 and 2); RCD protection at 30mA is fitted for all circuits; and that electrical equipment in Zone 0 is rated at no more than 12V AC or 30V DC SELV.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'ai23',
    question:
      'What are the additional testing requirements for agricultural and horticultural premises under Section 705?',
    answer:
      'Per BS 7671:2018+A2:2022 Section 705, agricultural premises present increased risks due to livestock, moisture, dust, and corrosive environments. Testing must confirm: supplementary equipotential bonding in livestock locations connects all exposed and extraneous-conductive-parts accessible to livestock (Regulation 705.415.2); RCD protection at 30mA is used for socket outlet circuits and 300mA for other circuits; all equipment has adequate IP ratings for the environment; and earth electrode resistance is satisfactory where TT systems are common. Periodic inspection is recommended every 3 years due to the harsh environmental conditions that accelerate deterioration.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  // === Instrument Use ===
  {
    id: 'ai24',
    question:
      'What calibration requirements apply to test instruments used for electrical inspection?',
    answer:
      'Per GN3 (9th Edition), all test instruments should be calibrated at regular intervals, typically every 12 months, by a UKAS-accredited calibration laboratory or equivalent. The calibration certificate must confirm the instrument meets the accuracy requirements of BS EN 61557 for the relevant measurement functions. The instrument must display a valid calibration label showing the calibration date and due date. Using an instrument beyond its calibration date may invalidate test results and any certificates issued. Additionally, instruments should be checked against known values (e.g., a calibration check box) before each period of use.',
    category: 'Instrument Use',
    difficulty: 'easy',
  },
  {
    id: 'ai25',
    question: 'What is the purpose of a calibration check box, and when should it be used?',
    answer:
      'A calibration check box (also called a test resistance box) contains precision resistors of known values that allow the tester to verify their instrument is reading accurately before commencing testing. Per GN3, the instrument should be checked against the calibration check box at the start of each working day or period of testing, and whenever there is doubt about the accuracy of a reading. This is not a substitute for annual calibration but provides a field verification that the instrument is functioning within acceptable tolerances. It is particularly important for low-resistance ohmmeters used in continuity testing.',
    category: 'Instrument Use',
    difficulty: 'easy',
  },
  {
    id: 'ai26',
    question:
      'What type of instrument is required for insulation resistance testing, and what standard must it comply with?',
    answer:
      'Per BS 7671:2018+A2:2022 Regulation 612.3 and GN3, insulation resistance must be measured using an insulation resistance tester that outputs DC voltage at the prescribed test level (250V, 500V, or 1000V depending on circuit voltage). The instrument must comply with BS EN 61557-2 and be capable of delivering the test voltage with a minimum load current of 1mA. The instrument must display the result in megohms (MΩ). Using an instrument with insufficient output current or incorrect test voltage will produce unreliable results and may fail to detect insulation defects.',
    category: 'Instrument Use',
    difficulty: 'medium',
  },
  {
    id: 'ai27',
    question: 'What instrument features are essential for earth fault loop impedance testing?',
    answer:
      'Per BS EN 61557-3 and GN3, a loop impedance tester must be capable of measuring both line-earth and line-neutral loop impedance, and should include a PFC/PSCC (prospective fault current/prospective short-circuit current) function. The instrument should have a two-wire connection (line and earth/neutral) and inject a brief test current to determine the impedance. Many modern instruments include a high-current, no-trip mode and an RCD-compatible mode that does not trip 30mA RCDs during testing. The resolution should be at least 0.01 Ω to accurately assess whether Zs values meet the 80% rule applied to BS 7671 tabulated maxima.',
    category: 'Instrument Use',
    difficulty: 'medium',
  },
  // === Common Faults and Troubleshooting ===
  {
    id: 'ai28',
    question: 'What are the most common faults discovered during ring final circuit testing?',
    answer:
      'The most common faults found during ring final circuit testing include: bridged rings (a spur connected between two points on the ring, masking a break), broken rings (an open circuit on one leg causing the ring to operate as two radials), crossed polarity (line and neutral transposed at a socket), and borrowed neutrals or earths from adjacent circuits. Per GN3, the three-step ring test is specifically designed to detect these faults — uneven readings during Step 2 or Step 3 indicate interconnections or breaks. A reading significantly above or below the expected quarter-value is the primary diagnostic indicator.',
    category: 'Dead Tests',
    difficulty: 'hard',
  },
  {
    id: 'ai29',
    question:
      'What should an inspector do if an insulation resistance reading is below 1 MΩ but the circuit appears visually sound?',
    answer:
      'Per GN3, if a circuit gives an insulation resistance reading below the minimum 1 MΩ at 500V DC, the inspector should first confirm all loads, electronic devices, and surge protection devices are disconnected, as these are the most common cause of apparently low readings. If the reading remains low, the circuit should be split at distribution points and each section re-tested to isolate the faulty section. Common causes include moisture ingress (especially in external or underground cables), aged or heat-damaged insulation, rodent damage, and nail or screw penetration. The fault location can be narrowed down progressively by disconnecting sections until the healthy reading is restored.',
    category: 'Dead Tests',
    difficulty: 'hard',
  },
  {
    id: 'ai30',
    question:
      'How should an inspector deal with a Zs reading that exceeds the tabulated maximum for the protective device?',
    answer:
      'Per BS 7671:2018+A2:2022 and GN3, if the measured Zs exceeds the tabulated maximum (after applying the 0.8 correction factor for conductor temperature), the protective device cannot guarantee disconnection within the required time under fault conditions. The inspector should first re-test to rule out instrument error or poor probe contact. If confirmed, the inspector should check for high-resistance joints, undersized conductors, or excessive cable length. On an EICR, this would typically receive a C2 (Potentially Dangerous) code, as automatic disconnection times cannot be met. Remedial options include reducing circuit length, increasing conductor size, upgrading the protective device, or installing supplementary RCD protection.',
    category: 'Live Tests',
    difficulty: 'hard',
  },
];
