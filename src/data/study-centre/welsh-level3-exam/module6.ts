/**
 * Final paper — Module 6: Installation and wiring systems.
 *
 * Sixty questions, the largest category in the paper, covering supply and
 * earthing arrangements, the protective measures, the statutory and standards
 * framework, containment, cables and terminations, and circuit design.
 *
 * Every regulation number and every tabulated value here appears in the
 * course's own RegsCallouts, which were checked against the BS 7671 extract.
 * Where a figure could be confused with a neighbouring one — Table 54.8
 * against Table 54.1, 0.4 s against 5 s, Type B against Type C — that
 * neighbour is the distractor, because that is the confusion worth testing.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Supply systems, earthing arrangements and circuits ───────
  {
    id: 236,
    question:
      'In the designation TN-C-S, what does each part of the code describe?',
    options: [
      'The source earthing, how the installation reaches earth, and whether neutral and protective functions are combined or separated',
      'The number of conductors, the cable type, and the protective device family',
      'The transformer connection, the voltage band, and the disconnection time',
      'The supply capacity, the metering arrangement, and the bonding method',
    ],
    correctAnswer: 0,
    explanation:
      'The letters read systematically: the first says how the source is earthed, the second how the installation gets its earth, and the letters after the hyphen say whether the neutral and protective functions are combined, separated, or combined then separated. Nothing in the designation refers to conductor count, cable type, voltage band, capacity or metering — reading it as a product code rather than a description of the earthing arrangement is what makes the systems hard to tell apart.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'Earthing system designations',
    reference: 'BS 7671 Regulation 312.2.1',
  },
  {
    id: 237,
    question:
      'A property has no distributor earth facility and an installation electrode has been driven. What follows for the protective measures?',
    options: [
      'An overcurrent device alone can provide fault protection, because the electrode completes the loop',
      'An RCD provides fault protection, and Regulation 411.5.3 requires Ra × IΔn ≤ 50 V',
      'Main bonding may be omitted, because there is no imported earth to equalise against',
      'The maximum Zs values in Table 41.3 apply unchanged, because the disconnection time is the same',
    ],
    correctAnswer: 1,
    explanation:
      'This is a TT system, where Ze is typically 20 to 200 Ω — far too high for an overcurrent device to disconnect in time, so an RCD does the fault protection and Regulation 411.5.3 imposes Ra × IΔn ≤ 50 V. Main bonding is still required, because extraneous-conductive-parts can still introduce a potential. And the Table 41.3 values are for overcurrent devices; on TT it is Table 41.5 that applies — 1667 Ω for a 30 mA device at 230 V.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'TT systems',
    reference: 'BS 7671 Regulation 411.5.3 · Table 41.5',
  },
  {
    id: 238,
    question:
      'What is the essential difference between a circuit protective conductor and a main protective bonding conductor?',
    options: [
      'A CPC is green-and-yellow; a bonding conductor may be any colour provided it is sleeved',
      'A CPC carries fault current back to the source; bonding equalises potential between parts',
      'A CPC is required on TN systems; bonding is required on TT systems',
      'A CPC is sized from Table 54.8; bonding is sized from Table 54.7',
    ],
    correctAnswer: 1,
    explanation:
      'They do different jobs and are not interchangeable: the CPC is the return path that lets a protective device operate, and bonding ties extraneous-conductive-parts to the MET so that no dangerous potential difference can appear between things a person can touch at once. Both are green-and-yellow, both are required on every system, and the sizing tables are the other way round — 54.7 for protective conductors, 54.8 for PME bonding.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'CPC and bonding',
    reference: 'BS 7671 Regulations 411.3.1.1, 411.3.1.2 and 544.1',
  },
  {
    id: 239,
    question:
      'A domestic PME supply has a 25 mm² aluminium PEN conductor. What size copper main protective bonding conductor does Table 54.8 require?',
    options: [
      '6 mm²',
      '10 mm²',
      '16 mm²',
      '25 mm²',
    ],
    correctAnswer: 1,
    explanation:
      '25 mm² falls in the "not exceeding 35 mm²" row of Table 54.8, which calls for 10 mm² copper — the routine answer on a domestic 100 A PME supply. 6 mm² is the minimum for the non-PME method, which does not apply where PME conditions exist; 16 mm² is the next row up, for a PEN over 35 mm²; and 25 mm² is the cap on the non-PME method. Note that a local DNO may publish a higher minimum, so cross-check the supplier specification.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'Main bonding sizing',
    reference: 'BS 7671 Regulation 544.1.1 and Table 54.8',
  },
  {
    id: 240,
    question:
      'Where PME conditions do not apply, how is a main protective bonding conductor sized?',
    options: [
      'Half the cross-sectional area required for the earthing conductor, at least 6 mm², and need not exceed 25 mm² in copper',
      'The same cross-sectional area as the earthing conductor, at least 10 mm² in copper',
      'Half the cross-sectional area of the largest circuit protective conductor, at least 4 mm²',
      'From Table 54.8, indexed against the supply neutral conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Half the earthing conductor, with a 6 mm² floor and a 25 mm² copper cap. Table 54.8 indexed against the PEN is the PME method, which the question has excluded. Matching the earthing conductor exactly overstates the requirement, and the largest CPC is not the reference — a CPC and a bonding conductor are sized from different rules because they do different jobs.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'Main bonding sizing',
    reference: 'BS 7671 Regulation 544.1.1',
  },
  {
    id: 241,
    question:
      'An earthing conductor is buried in the ground, protected against corrosion by a sheath but not against mechanical damage. What minimum copper size does Table 54.1 require?',
    options: [
      '2.5 mm²',
      '10 mm²',
      '16 mm²',
      '25 mm²',
    ],
    correctAnswer: 2,
    explanation:
      '16 mm² copper where it is protected against corrosion but not against mechanical damage. 2.5 mm² applies only where it is protected against both, and 25 mm² where it is protected against neither — the three rows are easy to transpose, and the safe habit is to read the table rather than recall it. 10 mm² is the steel figure for the fully protected row.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'Buried earthing conductors',
    reference: 'BS 7671 Table 54.1',
  },
  {
    id: 242,
    question:
      'Regulation 314.1 requires every installation to be divided into circuits. Which of these is one of the stated reasons?',
    options: [
      'To allow each circuit to be metered separately for energy accounting',
      'To reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor currents',
      'To limit the number of accessories connected to any one protective device',
      'To ensure each circuit can be tested without isolating the whole installation at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Limiting nuisance tripping from accumulated protective conductor currents is explicitly one of the reasons listed, alongside avoiding danger, minimising inconvenience, facilitating inspection and testing, taking account of the failure of a single circuit, mitigating electromagnetic disturbance and preventing the indirect energising of a circuit intended to be isolated. Separate metering is not among them, and neither accessory count nor test isolation is stated in those terms.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'Division of installations',
    reference: 'BS 7671 Regulation 314.1',
  },
  {
    id: 243,
    question:
      'Regulation 433.1.204 governs ring final circuits. What minimum conductor size does it require for a ring wired in ordinary copper cable?',
    options: [
      '1.5 mm²',
      '2.5 mm²',
      '4 mm²',
      '6 mm²',
    ],
    correctAnswer: 1,
    explanation:
      '2.5 mm² line and neutral, protected by a 30 A or 32 A device — 32 A works on 2.5 mm² because the load divides between two paths back to the board. 1.5 mm² is the exception for two-core mineral insulated cable to BS EN 60702-1, which is a real figure attached to a different cable. 4 mm² and 6 mm² are radial sizes at that rating.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'Ring final circuits',
    reference: 'BS 7671 Regulation 433.1.204',
  },
  {
    id: 244,
    question:
      'Why does a broken ring final circuit present a risk that a broken radial does not?',
    options: [
      'Because the broken leg can become live at the open end through the connected load',
      'Because it announces itself immediately, so the circuit is left energised while a repair is arranged',
      'Because it hides — the surviving leg keeps everything working while carrying the whole load',
      'Because the protective conductor is broken at the same time, removing fault protection',
    ],
    correctAnswer: 2,
    explanation:
      'A broken radial goes dead beyond the break and gets reported; a broken ring leaves everything working, with one 2.5 mm² leg now carrying a load the design assumed would split — which is why ring continuity is tested at every periodic inspection. The open end is not energised in the way described, nothing about the break is immediately obvious, and the CPC is a separate conductor that may well be intact.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'Ring continuity',
    reference: 'Module 6, Section 1 — Final circuits',
  },
  {
    id: 245,
    question:
      'What does fitting a fused connection unit do to the protective arrangement of a spur from a ring?',
    options: [
      'Nothing — the 32 A device at the board still protects everything downstream',
      'It moves the protective boundary, so the 13 A BS 1362 fuse polices the smaller downstream cable',
      'It converts the spur into a separate final circuit requiring its own entry on the schedule',
      'It provides additional protection, so a 30 mA RCD is not required for the spur',
    ],
    correctAnswer: 1,
    explanation:
      'The fuse in the FCU takes over protection of everything beyond it, which is why 1.5 mm² and any number of fixed outlets are acceptable downstream. Without it, the 32 A device would be protecting a cable that cannot carry 32 A. It does not make the spur a separate circuit for certification purposes, and it does nothing about residual current protection, which is a different measure entirely.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'Fused connection units',
    reference: 'Module 6, Section 1 — Final circuits',
  },
  {
    id: 246,
    question:
      'Regulation 521.5.2 states what about single-core armoured cable?',
    options: [
      'Single-core cables armoured with steel wire or steel tape shall not be used for an a.c. circuit',
      'Single-core armoured cables shall be installed in trefoil formation for a.c. circuits',
      'Single-core armoured cables shall have their armour bonded at one end only',
      'Single-core armoured cables shall not be used where the circuit exceeds 100 A',
    ],
    correctAnswer: 0,
    explanation:
      'They shall not be used for an a.c. circuit at all — the alternating field induces currents in the steel around a single conductor, causing heating and loss. Trefoil formation and single-end bonding are techniques associated with single-core cables generally and neither makes steel armour acceptable on a.c. The prohibition does not depend on the current rating. The companion regulation, 521.5.1, requires all the conductors of an a.c. circuit to be contained in the same ferromagnetic enclosure for the same reason.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'advanced',
    topic: 'Electromagnetic effects',
    reference: 'BS 7671 Regulations 521.5.1 and 521.5.2',
  },
  {
    id: 247,
    question:
      'Where does BS 7671 take over from ESQCR, and who owns what at the intake?',
    options: [
      'At the cut-out — the DNO owns everything up to and including it, and the customer everything after',
      'At the meter outgoing terminals — the DNO owns to the cut-out, the meter operator owns the meter and its tails',
      'At the main switch — everything before it is the supplier’s responsibility',
      'At the main earthing terminal — the earthing arrangement belongs to the DNO in all systems',
    ],
    correctAnswer: 1,
    explanation:
      'The DNO owns the service cable, the cut-out and the supplier earth terminal; the meter operator owns the meter and the tails between cut-out and meter; and the customer owns from the meter outgoing terminals, which is where BS 7671 takes over. Stopping at the cut-out misses the meter operator entirely. The main switch is inside the customer’s installation, and the MET is the customer’s even where the earth is supplied.',
    section: 'Supply systems, earthing arrangements and circuits',
    difficulty: 'intermediate',
    topic: 'The origin of the installation',
    reference: 'BS 7671 Section 132 · ESQCR 2002',
  },

  // ── Section 2 · Protection against shock, overcurrent and overvoltage ────
  {
    id: 248,
    question:
      'Table 41.1 gives maximum disconnection times. What is the figure for a final circuit up to 63 A on a TN system at 230 V a.c.?',
    options: [
      '0.2 s',
      '0.4 s',
      '1 s',
      '5 s',
    ],
    correctAnswer: 1,
    explanation:
      '0.4 s for TN final circuits. 0.2 s is the corresponding TT figure — shorter because the touch voltage persists differently — and 1 s is the TT figure for distribution circuits, where TN allows 5 s. All four numbers are real and each belongs to a different row, so the safe habit is to identify the system and the circuit type before reading the table.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'intermediate',
    topic: 'Disconnection times',
    reference: 'BS 7671 Table 41.1',
  },
  {
    id: 249,
    question:
      'What is the maximum earth fault loop impedance for a Type B 32 A circuit-breaker at 230 V under BS 7671:2018+A4:2026?',
    options: [
      '1.37 Ω',
      '1.44 Ω',
      '0.68 Ω',
      '2.19 Ω',
    ],
    correctAnswer: 0,
    explanation:
      '1.37 Ω in the current edition, with Cmin of 0.95 applied. 1.44 Ω is the figure older editions quoted before Cmin was introduced, which makes it the most dangerous wrong answer — it passes circuits the current edition fails. 0.68 Ω is roughly the Type C 32 A figure, since a higher magnetic threshold demands a lower Zs, and 2.19 Ω is not a value in that row.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'Maximum Zs',
    reference: 'BS 7671 Table 41.3',
  },
  {
    id: 250,
    question:
      'A designer swaps a Type B device for a Type C of the same rating. What happens to the maximum permitted Zs?',
    options: [
      'It increases, because the higher trip threshold tolerates a weaker fault path',
      'It roughly halves, because a higher fault current is needed to trip magnetically',
      'It is unchanged, because the disconnection time requirement has not changed',
      'It depends only on the cable size, not on the device characteristic',
    ],
    correctAnswer: 1,
    explanation:
      'A Type C needs 5 to 10 times rated current to trip magnetically against a Type B’s 3 to 5, so it needs a larger fault current, which means a lower loop impedance — roughly half. That is why a Type D is impractical at the end of a long radial. A higher trip threshold tolerating a weaker fault path has the relationship the wrong way round, and the limit is set by the device characteristic rather than by the cable alone.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'Device type and Zs',
    reference: 'BS 7671 Table 41.3 · BS EN 60898',
  },
  {
    id: 251,
    question:
      'Which magnetic trip range corresponds to a Type C circuit-breaker?',
    options: [
      '3 to 5 times rated current',
      '5 to 10 times rated current',
      '10 to 20 times rated current',
      '2 to 3 times rated current',
    ],
    correctAnswer: 1,
    explanation:
      '5 to 10 times for Type C, which suits moderate inrush — LED arrays, fluorescent banks and small motors. 3 to 5 times is Type B, the residential default; 10 to 20 times is Type D for large transformers, welders and heavy direct-on-line starting; and 2 to 3 times is below any of the standard bands.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'intermediate',
    topic: 'MCB characteristics',
    reference: 'BS EN 60898',
  },
  {
    id: 252,
    question:
      'Regulation 411.3.3 requires 30 mA RCD additional protection for socket-outlets up to 32 A. What exception exists?',
    options: [
      'None — the requirement is absolute in all premises',
      'Outside dwellings, where a documented risk assessment determines RCD protection is not necessary',
      'In dwellings, where the socket is labelled for use by a specific item of equipment',
      'Anywhere the circuit is already protected by an AFDD to BS EN 62606',
    ],
    correctAnswer: 1,
    explanation:
      'The exception is available only outside dwellings, and only where a documented risk assessment determines the protection is not necessary — in a dwelling there is no exception. Labelling a socket for a specific appliance was a route in an earlier edition and no longer is. And an AFDD addresses arc faults, a different hazard, so it is not a substitute for residual current protection.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'RCD protection of socket-outlets',
    reference: 'BS 7671 Regulation 411.3.3',
  },
  {
    id: 253,
    question:
      'What does Regulation 415.1.1 say about the role of a 30 mA RCD?',
    options: [
      'It is recognised as additional protection in the event of failure of basic or fault protection, or carelessness by users',
      'It is recognised as the primary means of fault protection on all a.c. final circuits',
      'It replaces the need for a circuit protective conductor on Class II equipment',
      'It provides overcurrent protection where the loop impedance is too high for an MCB',
    ],
    correctAnswer: 0,
    explanation:
      'Additional protection — a backstop for when basic protection or fault protection has failed, or when somebody has done something careless. It is deliberately not the primary measure: automatic disconnection of supply, with its protective earthing and bonding, is. It never removes the need for a CPC, and an RCD does not provide overcurrent protection at all.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'intermediate',
    topic: 'Additional protection',
    reference: 'BS 7671 Regulation 415.1.1',
  },
  {
    id: 254,
    question:
      'Regulation 411.3.4 concerns lighting circuits in domestic premises. What does it require?',
    options: [
      '30 mA RCD protection, with an exception where the luminaires are Class II',
      '30 mA RCD protection, with no exception',
      'A separate circuit for each floor of the dwelling',
      'A Type A RCD where LED drivers are installed',
    ],
    correctAnswer: 1,
    explanation:
      '30 mA protection on domestic lighting circuits, with no exception — that is the point worth remembering, because several other RCD requirements do carry exceptions and this one does not. Class II luminaires do not exempt the circuit, dividing by floor is a matter for Regulation 314.1 rather than this one, and the device type question is dealt with under 531.3.3.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'RCD protection of lighting',
    reference: 'BS 7671 Regulation 411.3.4',
  },
  {
    id: 255,
    question:
      'What is the status of AFDDs under Regulation 421.1.7 of BS 7671?',
    options: [
      'Mandatory on all final circuits supplying socket-outlets in dwellings',
      'Recommended, to mitigate the fire risk arising from arc fault currents',
      'Mandatory only where the installation has no surge protective device',
      'Permitted as an alternative to 30 mA RCD protection on socket-outlet circuits',
    ],
    correctAnswer: 1,
    explanation:
      'The BS 7671 wording is a recommendation, not a requirement. What hardens it into a requirement comes from elsewhere — the Building Safety Act regime for higher-risk residential buildings, and insurer, client or employer specifications. It is additional protection that sits alongside overcurrent and RCD protection: replacing the RCD function with an AFDD would leave the circuit without earth-fault additional protection, and SPDs address a different hazard again.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'AFDDs',
    reference: 'BS 7671 Regulation 421.1.7 · BS EN 62606',
  },
  {
    id: 256,
    question:
      'An AFDD fails to operate when its test button is pressed at a periodic inspection. How should this be classified?',
    options: [
      'C3, because the AFDD is a recommendation rather than a requirement',
      'C2, where the AFDD function is intended to provide active protection',
      'FI, because further investigation is needed to establish why it did not trip',
      'No code, because the circuit remains protected by its overcurrent device and RCD',
    ],
    correctAnswer: 1,
    explanation:
      'A protective device that is installed and intended to be active, but does not work, is a C2 — the installation is not as it purports to be. Coding it C3 confuses whether the device was required with whether it now functions. FI would be right if you could not determine the condition, but a failed test button has already determined it. And the presence of other protection does not excuse a non-functioning device.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'Coding a failed device',
    reference: 'Module 6, Section 2 — AFDDs',
  },
  {
    id: 257,
    question:
      'Under Regulation 434.5.1, what must be true of a protective device’s breaking capacity?',
    options: [
      'It must equal or exceed the prospective fault current at its point of installation, or be backed up by a coordinated upstream device',
      'It must equal or exceed the design current of the circuit it protects, with a 25 per cent margin',
      'It must be at least ten times the rated current of the device',
      'It must match the breaking capacity of the device at the origin of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Breaking capacity is about interrupting the prospective fault current without destroying itself, so it must meet or exceed the PSCC at that point — or be backed up by a cascade-coordinated upstream device whose let-through energy is within the downstream device’s withstand. Design current governs the rating rather than the breaking capacity, the ten-times rule confuses it with the magnetic trip threshold, and matching the origin device is neither necessary nor sufficient.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'Breaking capacity',
    reference: 'BS 7671 Regulation 434.5.1',
  },
  {
    id: 258,
    question:
      'The adiabatic equation S = √(I²t) ÷ k is used for what, and what value of k applies to a copper protective conductor in 70 °C thermoplastic insulation?',
    options: [
      'To size the line conductor for steady-state current, with k = 115',
      'To check the CPC withstands the fault energy let through, with k = 115',
      'To check the CPC withstands the fault energy let through, with k = 143',
      'To verify the disconnection time for automatic disconnection, with k = 51',
    ],
    correctAnswer: 1,
    explanation:
      'The adiabatic check protects the CPC from the energy let through during a fault, and k is 115 for copper in 70 °C thermoplastic. 143 is the figure for copper in 90 °C thermosetting insulation and 51 for steel, such as SWA armour — both real values for different materials. Steady-state current-carrying capacity and disconnection time are separate checks, and all three must pass independently.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'The adiabatic equation',
    reference: 'BS 7671 Regulation 543.1.3 · Table 43.1',
  },
  {
    id: 259,
    question:
      'When carrying out the adiabatic check, which operating time should be used?',
    options: [
      'The maximum disconnection time from Table 41.1 for that circuit type',
      'The actual device operating time at the actual prospective fault current',
      'One second, as a conservative standard value',
      'Five seconds, as the worst case permitted for distribution circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Read the actual operating time at the actual fault current from the time/current characteristic — using the Table 41.1 maximum instead is a substitution that produces a needlessly large answer, because a modern RCBO clears in 10 to 40 ms rather than 400 ms. A fixed one or five seconds has the same problem, and both are conventions borrowed from a different question.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'The adiabatic check',
    reference: 'BS 7671 Regulation 543.1.3 · Appendix 3',
  },
  {
    id: 260,
    question:
      'Which SPD type handles direct lightning current at the origin of an installation with an external lightning protection system?',
    options: [
      'Type 1 at the origin',
      'Type 2 at the origin',
      'Type 3 at the origin',
      'Type 2 and Type 3 together',
    ],
    correctAnswer: 0,
    explanation:
      'Type 1 handles the 10/350 microsecond direct-lightning waveform and is what an origin with an external LPS or direct-strike supply risk requires. Type 2 handles the 8/20 microsecond induced surges and switching transients and is the standard origin device where there is no LPS. Type 3 is a point-of-use device installed close to sensitive equipment and would fail at the first significant event if used alone.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'SPD types',
    reference: 'BS 7671 Regulation 534.4.1.1',
  },
  {
    id: 261,
    question:
      'Regulation 534.4.10 sets minimum conductor sizes at the origin. What is the minimum copper protective conductor for a Type 2 SPD?',
    options: [
      '2.5 mm²',
      '4 mm²',
      '6 mm²',
      '16 mm²',
    ],
    correctAnswer: 2,
    explanation:
      '6 mm² copper for the protective connection of a Type 2 SPD; 16 mm² is the corresponding figure for a Type 1, and 2.5 mm² is the minimum live connection for a Type 2 — every one of those numbers appears in the same regulation, attached to a different conductor or device, which is why it is read rather than recalled.',
    section: 'Protection against shock, overcurrent and overvoltage',
    difficulty: 'advanced',
    topic: 'SPD conductor sizing',
    reference: 'BS 7671 Regulation 534.4.10',
  },

  // ── Section 3 · Standards, risk assessment and preparing for work ────────
  {
    id: 262,
    question:
      'Which statement correctly describes the relationship between EAWR 1989 and BS 7671?',
    options: [
      'BS 7671 is made under EAWR, so a breach of the standard is automatically a breach of the regulations',
      'BS 7671 is a non-statutory standard that HSE guidance recognises as a means of demonstrating compliance with EAWR',
      'EAWR applies to installation work and BS 7671 applies to maintenance, so the two do not overlap',
      'BS 7671 supersedes EAWR for all work carried out after the current amendment came into force',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is a British Standard, not statute — but HSE guidance recognises compliance with it as a means of demonstrating the EAWR duty has been met, and that recognition is the whole reason the standard governs installation practice. It is not made under EAWR, the two are not divided by work type, and a British Standard cannot supersede regulations made under an Act of Parliament.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'intermediate',
    topic: 'Statute and standard',
    reference: 'EAWR 1989 · HSE guidance HSR25',
  },
  {
    id: 263,
    question:
      'Which Electricity at Work Regulation carries the narrow exception permitting live working?',
    options: [
      'Regulation 4',
      'Regulation 13',
      'Regulation 14',
      'Regulation 16',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 14 sets the three conditions under which live work may be justified. Regulation 13 is the dead-working duty it is an exception to, Regulation 4 covers safe systems of work generally, and Regulation 16 is the competence duty. All four are regulations electricians are prosecuted under, which is why the numbers matter.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'advanced',
    topic: 'EAWR regulations',
    reference: 'Electricity at Work Regulations 1989',
  },
  {
    id: 264,
    question:
      'Which instrument is acceptable for proving dead under HSE GS38?',
    options: [
      'A digital multimeter set to the a.c. voltage range',
      'A GS38-compliant two-pole voltage indicator, proved on a known live source or proving unit',
      'A non-contact voltage detector, held against each conductor in turn',
      'A socket tester with a voltage indication display',
    ],
    correctAnswer: 1,
    explanation:
      'A GS38-compliant two-pole indicator, proved before and after on a known source. A multimeter is explicitly not GS38 — it has a range switch that can be left in the wrong position and no built-in current limiting. A non-contact detector cannot prove absence of voltage, only suggest presence, and a socket tester tells you nothing about a circuit you have isolated at the board.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'basic',
    topic: 'Proving dead',
    reference: 'HSE GS38 · EAWR 1989 Regulation 13',
  },
  {
    id: 265,
    question:
      'On a job with PV, a battery and a generator changeover, what does safe isolation require?',
    options: [
      'Isolating at the main switch, since all sources feed through it',
      'Identifying every source and isolating each one',
      'Isolating the a.c. side only, since the d.c. side cannot deliver a shock at these voltages',
      'Isolating the source with the highest prospective fault current',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source isolation means identifying all of them and isolating each — the main switch does not necessarily interrupt a source that connects downstream of it, and a PV string stays live whenever light reaches the panels. D.C. string voltages of several hundred volts are lethal, and isolating only the largest source leaves the others energised.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'intermediate',
    topic: 'Multi-source isolation',
    reference: 'EAWR 1989 Regulation 13 · BS 7671 Section 462',
  },
  {
    id: 266,
    question:
      'Who may remove a lock fitted to an isolation point as part of a lock-off procedure?',
    options: [
      'The supervisor, once the work has been confirmed complete',
      'Any operative on the same work party, provided the area has been cleared',
      'Only the operative who fitted it',
      'The duty holder for the installation, on production of the permit',
    ],
    correctAnswer: 2,
    explanation:
      'Locks are personal: only the operative who fitted the lock removes it, which is why a shared isolation point uses a multi-lock hasp so each person’s lock stays until they are clear. Allowing a supervisor, a colleague or a duty holder to remove somebody else’s lock removes the entire protection the system provides — the person still working has no way of knowing.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'basic',
    topic: 'Lock-off and tag-out',
    reference: 'Module 6, Section 2 — Safe isolation',
  },
  {
    id: 267,
    question:
      'Which categories of work are notifiable under Part P in England and in Wales?',
    options: [
      'Any work in a dwelling that involves an addition to an existing circuit',
      'A new circuit, a consumer unit replacement, and an addition or alteration in a special location',
      'Any work requiring an Electrical Installation Certificate rather than a Minor Works Certificate',
      'A new circuit and a consumer unit replacement only',
    ],
    correctAnswer: 1,
    explanation:
      'Three categories: a new circuit, a consumer unit replacement, and an addition or alteration in a special location such as a bathroom zone, pool or sauna. An addition to an existing circuit outside a special location is not notifiable, so treating every addition as notifiable is too wide — and leaving special locations out altogether is too narrow. Which certificate you issue under BS 7671 is a separate question from whether the work is notifiable.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'intermediate',
    topic: 'Part P notification',
    reference: 'Building Regulations Approved Document P',
  },
  {
    id: 268,
    question:
      'What is the difference between the two routes to notifying Part P work?',
    options: [
      'Self-certification through a scheme happens after the work; Building Control notification happens before it starts',
      'Self-certification applies to domestic work; Building Control notification applies to commercial work',
      'Self-certification requires an EIC; Building Control notification accepts a Minor Works Certificate',
      'Self-certification is available only for consumer unit replacements',
    ],
    correctAnswer: 0,
    explanation:
      'A registered installer self-certifies through the scheme portal after the work, with the scheme notifying Building Control within 30 days; notifying Building Control directly has to happen before work starts, and is slower and more expensive. Part P applies to dwellings rather than splitting domestic from commercial, the certificate type is not what distinguishes the routes, and self-certification covers all three notifiable categories.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'advanced',
    topic: 'Notification routes',
    reference: 'Building Regulations Approved Document P',
  },
  {
    id: 269,
    question:
      'A building falls within the higher-risk residential building regime. What defines it?',
    options: [
      'Any building over three storeys containing residential units',
      '18 m or seven storeys and above, with at least two residential units',
      'Any building with a communal escape route serving more than ten dwellings',
      'Any residential building constructed after the Building Safety Act came into force',
    ],
    correctAnswer: 1,
    explanation:
      '18 m or seven storeys and above, with at least two residential units. The other thresholds are plausible but none is the definition — and the distinction matters, because it is the HRRB regime rather than BS 7671 that turns the AFDD recommendation into a requirement, and brings the Gateway approvals, the dutyholder regime and the golden thread with it.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'advanced',
    topic: 'The Building Safety Act regime',
    reference: 'Building Safety Act 2022',
  },
  {
    id: 270,
    question:
      'You find a discrepancy between two designer documents in the drawing pack. What is the correct action?',
    options: [
      'Work to the more recent revision, since it supersedes the other',
      'Work to whichever is more onerous, as the safer interpretation',
      'Raise a request for information in writing and wait for the response',
      'Resolve it verbally with the site manager and note it on the as-built',
    ],
    correctAnswer: 2,
    explanation:
      'A discrepancy between two designer documents is an RFI in writing — the cost of asking is an email and the cost of guessing wrong is a strip-out at handover. Picking the later revision assumes they are versions of the same information, which they usually are not. The more onerous reading is a guess dressed as prudence. And a verbal resolution recorded only on the as-built leaves no evidence of who decided what.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'intermediate',
    topic: 'Requests for information',
    reference: 'Module 6, Section 3 — What an RFI actually is',
  },
  {
    id: 271,
    question:
      'A supply lead on a site tool has damaged insulation. What is the correct sequence?',
    options: [
      'Tape the damage, use the tool with care, and report it at the end of the shift',
      'Take it out of service, quarantine-tag it, log the defect, tell the supervisor, and continue with an alternative',
      'Cut the damaged section out and refit the plug to the shortened lead',
      'Check it on an insulation resistance test and return it to service if it passes',
    ],
    correctAnswer: 1,
    explanation:
      'Out of service, tagged, quarantined, logged and reported — and insulating tape is never a repair on a supply lead; the fix is a competent person fitting a new one. Shortening the lead is a repair carried out by the wrong person without the right assessment, and a passing insulation test does not make damaged insulation acceptable. Removing a quarantine tag without authority is itself a HASAWA section 7 breach.',
    section: 'Standards, risk assessment and preparing for work',
    difficulty: 'basic',
    topic: 'Defective equipment',
    reference: 'PUWER 1998 Regulation 5 · EAWR 1989 Regulation 4(2)',
  },

  // ── Section 4 · Selecting and installing enclosures ──────────────────────
  {
    id: 272,
    question:
      'In an IP rating, what do the two digits describe?',
    options: [
      'The first digit is water and the second is solids',
      'The first digit is solids and the second is water',
      'The first digit is impact and the second is ingress',
      'The first digit is the enclosure material and the second is the seal type',
    ],
    correctAnswer: 1,
    explanation:
      'Solids first, water second, each verified against a defined test so the marking means the same whoever made the product. Reversing them turns an IP54 into something it is not. Impact is a separate scale entirely — IK00 to IK10, with IK10 at 20 J — and material and seal type are not encoded in the rating at all.',
    section: 'Selecting and installing enclosures',
    difficulty: 'basic',
    topic: 'IP ratings',
    reference: 'Module 6, Section 4 — Two digits, two different questions',
  },
  {
    id: 273,
    question:
      'What does the X mean in a rating such as IPX8 or IP4X?',
    options: [
      'That the property is not being stated',
      'That the property has been tested and found to offer no protection',
      'That the property is rated to the highest level on that scale',
      'That the rating is provisional pending certification',
    ],
    correctAnswer: 0,
    explanation:
      'An X means that property is simply not claimed — IPX8 is a water-only claim and IP4X an access-only claim, typically used where the risk is contact with a live conductor. A zero, not an X, would mean tested and offering no protection, and an X certainly does not imply the highest level. Nothing about the marking is provisional.',
    section: 'Selecting and installing enclosures',
    difficulty: 'intermediate',
    topic: 'IP ratings',
    reference: 'Module 6, Section 4 — Two digits, two different questions',
  },
  {
    id: 274,
    question:
      'Trunking containing non-sheathed cables must provide what degree of protection?',
    options: [
      'IP20, with a cover removable by hand',
      'At least IPXXD or IP4X, with a cover removable only by a tool or deliberate action',
      'IP55, because singles are vulnerable to moisture ingress',
      'IP65, because non-sheathed cables have no mechanical protection',
    ],
    correctAnswer: 1,
    explanation:
      'At least IPXXD or IP4X, with a tool-removable or deliberate-action cover — because a single carries one layer of insulation and nothing else, so the enclosure has to keep fingers and wires away from it. IP20 is the ordinary indoor level and is not enough here. IP55 and IP65 are water-ingress levels that address a different risk and would be specified by the environment rather than by the cable type.',
    section: 'Selecting and installing enclosures',
    difficulty: 'advanced',
    topic: 'Enclosures for non-sheathed cables',
    reference: 'BS 7671 Regulation 521.10.1',
  },
  {
    id: 275,
    question:
      'What maximum percentage fill does the On-Site Guide set for trunking?',
    options: [
      '35 per cent',
      '45 per cent',
      '55 per cent',
      '65 per cent',
    ],
    correctAnswer: 1,
    explanation:
      '45 per cent, with the check done by the cable-factor method: list the cables, multiply count by cable factor, sum, and compare against the enclosure factor. The other percentages are plausible round numbers and none is the published figure. Note that over-filling busts the grouping factor as well, so the fill calculation and the Cg derate are linked.',
    section: 'Selecting and installing enclosures',
    difficulty: 'advanced',
    topic: 'Containment fill',
    reference: 'IET On-Site Guide Appendix H',
  },
  {
    id: 276,
    question:
      'You add four cables to an existing trunking run. What must be checked?',
    options: [
      'The fill calculation only, since the existing cables were sized when installed',
      'The fill calculation and a re-derate of the existing cables for the new grouping factor',
      'The grouping factor for the new cables only, since the existing ones are unchanged',
      'Nothing, provided the trunking was originally installed with spare capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Both: the fill has to still comply, and every cable in the enclosure — old and new — now sits in a larger group, so the existing cables have to be re-derated against the new Cg. Checking only the fill, or only the new cables, leaves circuits sized against a grouping factor that no longer applies. Spare capacity in the enclosure says nothing about the thermal effect of more cables in it.',
    section: 'Selecting and installing enclosures',
    difficulty: 'advanced',
    topic: 'Adding to existing containment',
    reference: 'IET On-Site Guide Appendix H · BS 7671 Appendix 4',
  },
  {
    id: 277,
    question:
      'What minimum bending radius applies to steel wire armoured cable?',
    options: [
      '4 times the overall diameter',
      '6 times the overall diameter',
      '8 times the overall diameter',
      '12 times the overall diameter',
    ],
    correctAnswer: 2,
    explanation:
      '8 times the overall diameter for SWA. 6 times is the figure for unarmoured cable such as twin and earth, and 12 times is for MICC — three real values for three cable types, and the radius applies during the pull as well as in the finished run. Anything tighter is a failure against the mechanical stress requirements.',
    section: 'Selecting and installing enclosures',
    difficulty: 'intermediate',
    topic: 'Bending radius',
    reference: 'BS 7671 Regulation 522.8.3',
  },
  {
    id: 278,
    question:
      'Why does a long run of steel conduit need expansion couplers, and at roughly what interval?',
    options: [
      'To allow for vibration, at roughly every 10 m',
      'To allow for thermal expansion of about 12 µm per metre per °C, at roughly every 30 m',
      'To maintain earth continuity, at roughly every 20 m',
      'To limit the length of any single cable pull, at roughly every 50 m',
    ],
    correctAnswer: 1,
    explanation:
      'Steel moves about 12 microns per metre per degree, which adds up to real movement over a long run and a hot roof void — hence a coupler around every 30 m. Vibration is addressed by fixing rather than by expansion joints. An expansion coupler is a discontinuity that has to be bridged for earthing, so it works against continuity rather than for it. And pull length is managed with draw-in boxes, not couplers.',
    section: 'Selecting and installing enclosures',
    difficulty: 'advanced',
    topic: 'Steel conduit',
    reference: 'Module 6, Section 4 — Containment',
  },
  {
    id: 279,
    question:
      'Amendment 4 extended Regulation 521.10.202. What does that change in practice?',
    options: [
      'Cable supports must be non-combustible throughout the installation, not only on escape routes',
      'Cables must be supported at closer intervals throughout the installation',
      'Cable supports must be corrosion-resistant in all external locations',
      'Cables must be supported independently of any other service throughout the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Non-combustible supports across the whole installation — which in practice means metal clips and stainless steel ties replacing plastic for primary cable support, not just in escape routes. The concern is cables dropping into the path of firefighters when plastic clips soften. Support intervals, corrosion resistance and separation from other services are all real requirements addressed elsewhere.',
    section: 'Selecting and installing enclosures',
    difficulty: 'advanced',
    topic: 'Non-combustible supports',
    reference: 'BS 7671 Regulation 521.10.202',
  },

  // ── Section 5 · Cables, wiring systems and terminations ─────────────────
  {
    id: 280,
    question:
      'What is a wiring system, as Section 521 of BS 7671 uses the term?',
    options: [
      'The conductors alone, selected for current-carrying capacity',
      'The cable together with its method of installation, support and enclosure',
      'The circuit from the protective device to the load',
      'The combination of protective device, cable and accessory',
    ],
    correctAnswer: 1,
    explanation:
      'A wiring system is the cable plus its support, enclosure and containment, decided as one — which is why the installation method changes the current-carrying capacity and why a cable pulled into insulation is no longer the cable that was designed. Treating it as the conductors alone is exactly the error. The other two definitions describe a circuit and a set of components rather than the system.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'intermediate',
    topic: 'Wiring systems',
    reference: 'BS 7671 Section 521',
  },
  {
    id: 281,
    question:
      'Regulation 433.1.1 sets the relationship between three currents. What is it?',
    options: [
      'In ≤ Ib ≤ Iz',
      'Ib ≤ In ≤ Iz',
      'Iz ≤ In ≤ Ib',
      'Ib ≤ Iz ≤ In',
    ],
    correctAnswer: 1,
    explanation:
      'The design current must not exceed the device rating, and the device rating must not exceed the cable’s current-carrying capacity in its actual installed conditions. Every other ordering breaks the logic: putting In below Ib means the device trips in normal service, and putting Iz below In means the device would let the cable overheat before operating.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'intermediate',
    topic: 'Coordination of conductor and device',
    reference: 'BS 7671 Regulation 433.1.1',
  },
  {
    id: 282,
    question:
      'What is the difference between It and Iz?',
    options: [
      'It is the tabulated laboratory value; Iz is that value after the correction factors are applied',
      'It is the value after correction factors; Iz is the tabulated laboratory value',
      'It is the current at which the cable is damaged; Iz is the current at which the device operates',
      'It is the three-phase rating; Iz is the single-phase rating of the same cable',
    ],
    correctAnswer: 0,
    explanation:
      'It comes out of the Appendix 4 table under reference conditions; Iz is the real capacity in this installation, It multiplied by Ca, Cg, Ci and Cf. Reversing the two is the common error and produces an undersized cable. Neither is a damage threshold or a device characteristic, and the phase arrangement is handled by choosing the right table column rather than by these two symbols.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Current-carrying capacity',
    reference: 'BS 7671 Appendix 4',
  },
  {
    id: 283,
    question:
      'A cable is installed by Reference Method 103. What must you not do when calculating its capacity?',
    options: [
      'Apply the ambient temperature factor Ca',
      'Apply the grouping factor Cg',
      'Apply the thermal insulation factor Ci on top of the method',
      'Apply the BS 3036 factor Cf of 0.725',
    ],
    correctAnswer: 2,
    explanation:
      'Methods 100 to 103 already include the derating for thermal insulation, so applying Ci as well double-counts it and oversizes the cable. Ambient temperature and grouping are separate influences that still apply, and the 0.725 factor applies wherever a BS 3036 rewireable fuse is the protective device, independently of the installation method.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Reference methods',
    reference: 'BS 7671 Appendix 4',
  },
  {
    id: 284,
    question:
      'Where a circuit is protected by a BS 3036 rewireable fuse, what correction factor applies?',
    options: [
      '0.5',
      '0.725',
      '0.9',
      '1.45',
    ],
    correctAnswer: 1,
    explanation:
      '0.725, because a rewireable fuse has a poor fusing factor and needs a substantially larger cable to keep I2 within 1.45 × Iz. 1.45 is the coefficient in that requirement rather than the factor itself — a convincing wrong answer because the number is genuinely part of the same rule. 0.5 and 0.9 are not values in this context.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'The BS 3036 factor',
    reference: 'BS 7671 Regulation 433.1.1 · Appendix 4',
  },
  {
    id: 285,
    question:
      'A route passes through a warm plant room for 2 m and through ordinary ambient conditions for 30 m. Which conditions set the cable size?',
    options: [
      'The conditions over the longest section of the route',
      'The most onerous section of the route',
      'The average of the conditions along the route',
      'The conditions at the point of termination',
    ],
    correctAnswer: 1,
    explanation:
      'The most onerous section sets the reference method and the correction factors for the whole cable, because the cable is only as good as its worst 2 m — that is where it will overheat. Averaging or weighting by length lets a short severe section disappear into the calculation, and the termination is simply one point on the route.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Sizing along a route',
    reference: 'BS 7671 Appendix 4',
  },
  {
    id: 286,
    question:
      'Regulation 526.5 permits a termination to be made in which of the following?',
    options: [
      'Any enclosure, provided the connection is mechanically sound and insulated',
      'A suitable accessory, an equipment enclosure, or an enclosure of material non-combustible when tested to BS 476-4',
      'Any accessible location, provided the joint is marked on the as-built drawing',
      'A suitable accessory only, since equipment enclosures are the manufacturer’s responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'Those three, or a combination of them — the common theme is that the enclosure will contain the heat and any arc if the joint fails. Mechanical soundness and insulation are necessary but they are not what the regulation asks about, accessibility and a drawing note do not make an unenclosed joint acceptable, and equipment enclosures are expressly permitted.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Where a termination may be made',
    reference: 'BS 7671 Regulation 526.5',
  },
  {
    id: 287,
    question:
      'Regulation 526.9 as updated by Amendment 4 addresses conductors in terminals. What does it mean in practice?',
    options: [
      'One terminal, one conductor, unless the terminal is designed and rated for more',
      'No more than two conductors in any terminal, in all cases',
      'Conductors of different sizes may not share a terminal',
      'Stranded and solid conductors may not share a terminal',
    ],
    correctAnswer: 0,
    explanation:
      'One conductor per terminal unless the terminal is designed and rated for more — which is why a looped accessory terminal takes two and a lever block may take three or more. A blanket limit of two ignores what the terminal was designed for, and while mixing sizes or conductor types in one terminal is often poor practice, neither is what this regulation turns on.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Conductors per terminal',
    reference: 'BS 7671 Regulation 526.9',
  },
  {
    id: 288,
    question:
      'When are ferrules mandatory on a conductor entering a cage-clamp terminal?',
    options: [
      'On all stranded conductors',
      'On fine-stranded class 5 and 6 conductors',
      'On solid conductors above 6 mm²',
      'On any conductor where the terminal is not torque-specified',
    ],
    correctAnswer: 1,
    explanation:
      'Fine-stranded class 5 and 6 conductors must be ferruled, because individual strands escape the clamp and the remaining ones carry the whole current. On coarse-stranded conductors a ferrule is good practice rather than mandatory, and on solid conductors a ferrule is never used. Note too that ferrule colour coding differs between standards and repeats at larger sizes, so they are sized to the conductor and confirmed against the chart.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'advanced',
    topic: 'Ferrules',
    reference: 'Module 6, Section 5 — Terminations',
  },
  {
    id: 289,
    question:
      'Why is over-torquing a terminal as damaging as under-torquing it?',
    options: [
      'Because it strips the thread, so the terminal cannot be re-tightened later',
      'Because both produce a hot, high-resistance joint',
      'Because it voids the accessory’s product certification',
      'Because it deforms the enclosure and breaks the IP rating',
    ],
    correctAnswer: 1,
    explanation:
      'Under-torque leaves insufficient contact pressure and over-torque crushes and work-hardens the conductor — both end up as a high-resistance joint that heats, and loose or damaged connections are the leading cause of electrical fires. A stripped thread and a damaged enclosure are real consequences but they are not the electrical failure mode, and certification is not the reason a joint gets hot.',
    section: 'Cables, wiring systems and terminations',
    difficulty: 'intermediate',
    topic: 'Torque',
    reference: 'BS 7671 Regulations 526.1 and 510.3',
  },

  // ── Section 6 · Connected loads, energy efficiency and circuit design ────
  {
    id: 290,
    question:
      'What is the difference between connected load and maximum demand?',
    options: [
      'Connected load is the sum of nameplate ratings; maximum demand is the realistic peak after diversity',
      'Connected load is the peak measured over a year; maximum demand is the design figure',
      'Connected load applies to final circuits; maximum demand applies to the origin',
      'Connected load excludes standby loads; maximum demand includes them',
    ],
    correctAnswer: 0,
    explanation:
      'Connected load adds up every nameplate as though everything ran at once; maximum demand is what the installation will realistically draw, and diversity is the bridge between them. Regulation 311.1 requires the maximum demand to be assessed before anything is sized. The other definitions confuse measurement with design, or attach the terms to a level of the installation — in fact both are assessed at every level.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'intermediate',
    topic: 'Maximum demand',
    reference: 'BS 7671 Regulation 311.1',
  },
  {
    id: 291,
    question:
      'Where do the diversity factors used in a domestic design come from?',
    options: [
      'A table in BS 7671 Chapter 31',
      'The IET On-Site Guide Table A1, IET Guidance Note 1, manufacturer data, or project measurement',
      'The distributor’s connection agreement for that property',
      'Approved Document P, which sets them for notifiable work',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 requires the assessment but does not give a single table of factors — they come from the On-Site Guide Table A1 for a typical dwelling, Guidance Note 1 for broader installations, manufacturer data for special loads, and measurement on an existing installation. That is why the assumptions and their sources are documented on a discrete diversity page in the design pack, and why it is the most-audited part of it.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'advanced',
    topic: 'Sources of diversity factors',
    reference: 'IET On-Site Guide Table A1 · IET Guidance Note 1',
  },
  {
    id: 292,
    question:
      'What diversity should be applied to an EV charge point in a domestic design, and why?',
    options: [
      'Fifty per cent, because charging is usually overnight when other loads are low',
      'One hundred per cent, because charging often coincides with peak domestic demand',
      'Thirty per cent, in line with the factor for a cooker',
      'It depends on the vehicle, so the manufacturer’s figure is used',
    ],
    correctAnswer: 1,
    explanation:
      'No diversity by default, because people plug in when they get home — exactly when the cooking, heating and lighting load peaks. Regulation 722.311.201 permits load curtailment to be taken into account when determining maximum demand, so an OZEV-compliant load-managed charger that throttles as household demand rises can recover some of it — but the regulation is permissive, not a duty, and checking what the charger falls back to if the load management fails is engineering judgement rather than a numbered requirement. The overnight assumption is the one that quietly overloads a supply, and the vehicle is not what determines the charge point’s demand.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'advanced',
    topic: 'EV charger diversity',
    reference: 'BS 7671 Regulations 311.1 and 722.311.201',
  },
  {
    id: 293,
    question:
      'A load-management system throttles an EV charger as household demand rises. How may that be treated when determining maximum demand?',
    options: [
      'It shall be disregarded — maximum demand is assessed with every load at its full rating',
      'It may be taken into account, whether the curtailment is automatic or manual',
      'It may be taken into account only where the curtailment operates automatically',
      'It shall be taken into account wherever a load-management system is fitted',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 722.311.201 says load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining maximum demand of the installation or part thereof. Two words carry the answer: "may", so it is permitted rather than required — which rules out both the outright prohibition and the obligation; and "or manually", which rules out limiting it to automatic systems. Where you do rely on curtailment, Regulation 536.4.202 brings in the coordination between the assembly and the overload protective device.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'advanced',
    topic: 'Load curtailment and maximum demand',
    reference: 'BS 7671 Regulations 722.311.201 and 536.4.202',
  },
  {
    id: 294,
    question:
      'Why does a heat pump generally attract no diversity in a domestic maximum demand assessment?',
    options: [
      'Because its starting current is high relative to its running current',
      'Because it runs for long duty cycles and coincides with the coldest, highest-demand conditions',
      'Because it is a fixed appliance and fixed appliances never attract diversity',
      'Because its nameplate rating already includes a diversity allowance',
    ],
    correctAnswer: 1,
    explanation:
      'A heat pump runs for long periods and does its hardest work exactly when everything else in the house is also running — so the coincidence factor is effectively one. Starting current is a device-selection question rather than a demand one. Plenty of fixed appliances do attract diversity, the cooker being the obvious example, and no nameplate rating includes a diversity allowance.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'intermediate',
    topic: 'Heat pump diversity',
    reference: 'Module 6, Section 6 — Connected load and maximum demand',
  },
  {
    id: 295,
    question:
      'Smart controls are being added to a domestic installation. Which principle governs their use?',
    options: [
      'Safety functions may depend on the smart layer provided the system has a battery backup',
      'Safety may not depend on the smart layer at all, and a hand-operable route to every essential function is kept',
      'Smart devices replace the need for local isolation where they can be operated remotely',
      'The smart layer is exempt from inspection and testing because it is a control system rather than an installation',
    ],
    correctAnswer: 1,
    explanation:
      'Smart technology is a control layer on an ordinary installation: convenience, comfort and security may be delivered by it provided the occupant is told what they lose, but safety may not depend on it, and a building that cannot be worked without a network has a design fault. A battery does not change that. Remote operation is not isolation, and Guidance Note 3 lists smart switches as inspection and testing items where they have a safety-related switching or isolation role.',
    section: 'Connected loads, energy efficiency and circuit design',
    difficulty: 'intermediate',
    topic: 'Smart technology',
    reference: 'Module 6, Section 6 — A control layer, not a different installation',
  },
];

export const MODULE_6_QUESTIONS = bank('Installation & wiring', QUESTIONS);
