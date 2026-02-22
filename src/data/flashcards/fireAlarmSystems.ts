import { FlashcardData } from './types';

export const fireAlarmSystems: FlashcardData[] = [
  // ── System Types ────────────────────────────────────────────────────

  {
    id: 'fa1',
    question: 'What are the three main fire alarm system categories defined in BS 5839-1:2025?',
    answer:
      'The three main categories are L (Life protection), P (Property protection), and M (Manual). L systems are designed to protect life by giving early warning, P systems protect the building and its contents, and M systems rely solely on manual call points with no automatic detection.',
    category: 'System Types',
    difficulty: 'easy',
  },
  {
    id: 'fa2',
    question:
      'What does a Category L1 fire alarm system provide and where is it typically required?',
    answer:
      'Category L1 provides the highest level of life protection with automatic detectors installed throughout all areas of the building, including roof voids and floor voids. It is typically specified for high-risk premises such as care homes, hospitals, and buildings where occupants may have difficulty evacuating. BS 5839-1:2025 considers L1 as full coverage.',
    category: 'System Types',
    difficulty: 'easy',
  },
  {
    id: 'fa3',
    question: 'What is the difference between Category L2 and Category L3 fire alarm systems?',
    answer:
      'Category L2 covers all escape routes plus rooms that open onto escape routes and high-risk areas such as kitchens and plant rooms. Category L3 only covers escape routes themselves, such as corridors, stairwells, and landings. L2 therefore offers earlier warning by detecting fires in high-risk rooms before smoke reaches the escape route.',
    category: 'System Types',
    difficulty: 'medium',
  },
  {
    id: 'fa4',
    question:
      'Explain the difference between Category P1 and Category P2 property protection systems.',
    answer:
      'Category P1 provides automatic detection throughout all areas of the building to give the earliest possible warning of fire for property protection purposes. Category P2 only covers defined high-risk areas where a fire is most likely to start or where property damage would be most severe. P2 is a more targeted and cost-effective approach when full coverage is not justified.',
    category: 'System Types',
    difficulty: 'medium',
  },
  {
    id: 'fa5',
    question: 'What is the difference between a conventional and an addressable fire alarm system?',
    answer:
      'A conventional system divides the building into zones, with all devices on a zone connected to the same circuit. The panel identifies which zone has activated but not the individual device. An addressable system assigns a unique address to every device, so the control panel can identify the exact detector or call point that has triggered, enabling much faster location of the fire.',
    category: 'System Types',
    difficulty: 'medium',
  },
  {
    id: 'fa6',
    question:
      'What advantage does an analogue addressable system have over a standard addressable system?',
    answer:
      'An analogue addressable system continuously reports the actual measured value (such as smoke density or temperature) from each detector back to the control panel, rather than just a triggered or normal state. This allows the panel to monitor trends, set dynamic thresholds, compensate for detector contamination, and make intelligent decisions to reduce false alarms while maintaining sensitivity.',
    category: 'System Types',
    difficulty: 'hard',
  },

  // ── Detection ───────────────────────────────────────────────────────

  {
    id: 'fa7',
    question:
      'How does an optical (photoelectric) smoke detector work and what types of fire is it best suited for?',
    answer:
      'An optical smoke detector uses an LED light source and a photodiode sensor arranged so that light does not normally reach the sensor. When smoke particles enter the chamber, they scatter the light onto the sensor, triggering the alarm. Optical detectors are best suited for slow-smouldering fires that produce large visible smoke particles, such as overheating wiring or smouldering fabrics.',
    category: 'Detection',
    difficulty: 'easy',
  },
  {
    id: 'fa8',
    question:
      'What is the difference between a fixed-temperature heat detector and a rate-of-rise heat detector?',
    answer:
      'A fixed-temperature heat detector triggers when the ambient temperature reaches a predetermined threshold, typically 57°C or 90°C. A rate-of-rise detector triggers when the temperature increases rapidly, typically faster than 8-10°C per minute, regardless of the actual temperature. Many modern heat detectors combine both methods for improved reliability.',
    category: 'Detection',
    difficulty: 'easy',
  },
  {
    id: 'fa9',
    question: 'Why are ionisation smoke detectors rarely installed in new UK systems?',
    answer:
      'Ionisation detectors contain a small amount of radioactive material (Americium-241) which raises disposal and environmental concerns. They are also highly prone to false alarms from cooking fumes, steam, and dust, making them unsuitable for many environments. While still permitted, BS 5839-1:2025 notes that optical or multi-sensor detectors are generally preferred for new installations.',
    category: 'Detection',
    difficulty: 'medium',
  },
  {
    id: 'fa10',
    question: 'What is a multi-sensor detector and why is it effective at reducing false alarms?',
    answer:
      "A multi-sensor detector combines two or more sensing elements, typically optical smoke and heat, within a single unit. The detector's algorithm analyses signals from both sensors to distinguish between a real fire and a nuisance source such as steam or cooking fumes. This combined analysis significantly reduces false alarms while maintaining high sensitivity to genuine fires.",
    category: 'Detection',
    difficulty: 'medium',
  },
  {
    id: 'fa11',
    question: 'Where must manual call points (MCPs) be located according to BS 5839-1:2025?',
    answer:
      'Manual call points must be located on exit routes at each storey exit, at each final exit to outside, and at any point where travel distance to reach a call point would exceed 45 metres. They should be mounted at approximately 1.4 metres above floor level and must be clearly visible, unobstructed, and readily accessible. Additional MCPs should be provided adjacent to particularly high-risk areas.',
    category: 'Detection',
    difficulty: 'easy',
  },
  {
    id: 'fa12',
    question:
      'What is the minimum sound level requirement for fire alarm sounders under BS 5839-1:2025?',
    answer:
      'Fire alarm sounders must achieve a minimum of 65 dB(A) throughout all accessible areas, or 5 dB above any ambient noise likely to persist for more than 30 seconds, whichever is greater. In sleeping areas, the minimum at the bedhead is 75 dB(A). Where occupants may have hearing impairments, visual alarm devices (VADs) in the form of flashing beacons should supplement the audible warning.',
    category: 'Detection',
    difficulty: 'medium',
  },
  {
    id: 'fa13',
    question: 'What are carbon monoxide fire detectors and when might they be specified?',
    answer:
      'Carbon monoxide (CO) fire detectors sense the presence of CO gas produced by combustion, rather than detecting smoke particles or heat. They are particularly useful in environments prone to false alarms from dust, steam, or fumes because CO detection is highly specific to actual combustion. They are often used as part of multi-criteria detection alongside optical or heat sensors to improve reliability.',
    category: 'Detection',
    difficulty: 'hard',
  },

  // ── Wiring ──────────────────────────────────────────────────────────

  {
    id: 'fa14',
    question: 'What types of cable are acceptable for fire alarm system wiring?',
    answer:
      'BS 5839-1:2025 requires fire alarm cables to be fire-resistant, maintaining circuit integrity during a fire. Acceptable types include FP200 (enhanced fire-resistant cable with a low-smoke zero-halogen sheath), mineral-insulated copper-clad (MICC) cable, and other cables meeting the enhanced fire resistance category of BS 8434-2. Standard PVC cables are not acceptable for fire alarm circuits.',
    category: 'Wiring',
    difficulty: 'easy',
  },
  {
    id: 'fa15',
    question: 'Why must fire alarm cables be segregated from other electrical circuits?',
    answer:
      'Segregation prevents electrical interference, cross-faults, and fire damage from other circuits affecting the fire alarm system. BS 5839-1:2025 requires fire alarm cables to be segregated from all cables that are not fire alarm cables. They should run in separate trunking, conduit, or tray compartments, or maintain a minimum separation distance of 300 mm from other power cables where they run in parallel.',
    category: 'Wiring',
    difficulty: 'medium',
  },
  {
    id: 'fa16',
    question: 'What is the difference between loop wiring and radial wiring in fire alarm systems?',
    answer:
      'Loop wiring connects devices in a ring from and back to the control panel, providing two communication paths to each device so the system continues to operate if a single cable break occurs. Radial wiring runs a single cable out to devices with no return path. Addressable systems typically use loop wiring for resilience, while conventional systems traditionally use radial circuits for each zone.',
    category: 'Wiring',
    difficulty: 'medium',
  },
  {
    id: 'fa17',
    question: 'What is the maximum floor area for a single fire alarm zone under BS 5839-1:2025?',
    answer:
      'A single fire alarm zone should not exceed 2,000 m² in floor area. Additionally, the search distance within a zone (the distance a person would need to walk to locate the activated device) should not exceed 60 metres. Zones should generally not extend across more than one fire compartment, and each zone should be confined to a single storey unless the total floor area is less than 300 m².',
    category: 'Wiring',
    difficulty: 'hard',
  },
  {
    id: 'fa18',
    question: 'What fire resistance standard must fire alarm cables meet and for how long?',
    answer:
      'Fire alarm cables must meet the enhanced category of BS 8434-2, which requires the cable to maintain circuit integrity for at least 120 minutes under standard fire conditions. This ensures the fire alarm system can continue to operate during a developing fire, allowing sufficient time for evacuation and fire service response. FP200 and MICC cables are specifically designed to achieve this rating.',
    category: 'Wiring',
    difficulty: 'hard',
  },

  // ── Standards ────────────────────────────────────────────────────────

  {
    id: 'fa19',
    question: 'What is the scope of BS 5839-6:2019 and how does it differ from BS 5839-1:2025?',
    answer:
      'BS 5839-6:2019 covers the design, installation, commissioning, and maintenance of fire detection and alarm systems in domestic premises (dwellings). BS 5839-1:2025 covers non-domestic (commercial and industrial) premises. The domestic standard uses a simplified grading system (Grades A to F) and category system (LD1 to LD3) tailored to residential buildings.',
    category: 'Standards',
    difficulty: 'easy',
  },
  {
    id: 'fa20',
    question: 'What are the domestic fire alarm Grades A through F under BS 5839-6:2019?',
    answer:
      'Grade A is a full addressable or conventional system with control panel. Grade B uses mains-powered detectors connected to a common control unit. Grade C uses mains-powered detectors with no central panel. Grade D uses mains-powered interlinked detectors with integral battery backup (Grade D1 includes a built-in sounder, Grade D2 does not). Grade E is mains-powered standalone detectors. Grade F is battery-only standalone detectors.',
    category: 'Standards',
    difficulty: 'medium',
  },
  {
    id: 'fa21',
    question: 'What are the domestic fire alarm Categories LD1, LD2, and LD3 under BS 5839-6:2019?',
    answer:
      'LD1 provides automatic detection throughout the dwelling, including all rooms, hallways, landings, and roof spaces. LD2 covers escape routes plus high-risk rooms such as the kitchen and the principal living room. LD3 covers escape routes only, meaning hallways, landings, and the storey containing the principal entrance. LD3 with Grade D1 detectors is the most common minimum standard for new-build housing in the UK.',
    category: 'Standards',
    difficulty: 'medium',
  },
  {
    id: 'fa22',
    question:
      'What does Grade D1 mean in the context of domestic fire detection under BS 5839-6:2019?',
    answer:
      'Grade D1 specifies mains-powered detectors that are interlinked (so when one activates, all units sound) and include an integral standby battery to provide continued protection during a mains power failure. The detectors have a built-in sounder. Grade D1 with Category LD3 is the Building Regulations minimum for most new-build dwellings in England, providing interlinked detection on escape routes.',
    category: 'Standards',
    difficulty: 'easy',
  },
  {
    id: 'fa23',
    question: 'What is cause and effect programming in a fire alarm system?',
    answer:
      'Cause and effect programming defines the specific actions that occur in response to each fire alarm trigger. For example, a detector activating on the second floor might trigger sounders on all floors, release fire door holders on that floor, shut down air handling units, recall lifts to ground, and activate stairwell pressurisation. This logic is documented in a cause and effect matrix and programmed into the control panel during commissioning.',
    category: 'Standards',
    difficulty: 'hard',
  },

  // ── Commissioning ───────────────────────────────────────────────────

  {
    id: 'fa24',
    question: 'What is the weekly testing requirement for a fire alarm system?',
    answer:
      'BS 5839-1:2025 requires the fire alarm system to be tested at least once every seven days using a manual call point. A different call point should be used each week in rotation so that every call point is tested over the course of a year. The test should confirm that the panel receives the signal, the sounders activate throughout the building, and any cause and effect outputs operate correctly.',
    category: 'Commissioning',
    difficulty: 'easy',
  },
  {
    id: 'fa25',
    question: 'What maintenance is required on a fire alarm system annually under BS 5839-1:2025?',
    answer:
      'An annual service by a competent fire alarm engineer must include functional testing of every detector and call point, checking all sounders and visual alarm devices, testing battery standby capacity, verifying all wiring connections, checking cause and effect programming, and confirming that the log book is up to date. Detectors should also be checked for contamination and replaced if necessary.',
    category: 'Commissioning',
    difficulty: 'medium',
  },
  {
    id: 'fa26',
    question: 'Name three common strategies for managing false alarms in fire alarm systems.',
    answer:
      'Common strategies include using multi-sensor detectors that cross-reference different sensing technologies to distinguish nuisance sources from real fires, implementing verification periods (alarm confirmation or coincidence detection) where the panel waits for a second activation before triggering a full alarm, and installing detector types appropriate to the environment, such as heat detectors in kitchens instead of smoke detectors.',
    category: 'Commissioning',
    difficulty: 'hard',
  },
  {
    id: 'fa27',
    question: 'What ancillary systems should a fire alarm system interface with?',
    answer:
      'A fire alarm system commonly interfaces with automatic fire door holders (releasing doors on alarm), fire and smoke dampers in ductwork, gas shut-off valves, fire suppression systems (sprinklers, gas suppression), stairwell pressurisation fans, lift recall systems, access control systems (releasing magnetic locks), and emergency lighting. All interfaces must be documented in the cause and effect matrix.',
    category: 'Commissioning',
    difficulty: 'hard',
  },
  {
    id: 'fa28',
    question:
      'What checks must be carried out when commissioning a new fire alarm system before handover?',
    answer:
      'Commissioning includes verifying every detector and call point responds correctly at the control panel, confirming sound levels meet the minimum 65 dB(A) requirement throughout the building (75 dB(A) at bedheads in sleeping areas), testing all cause and effect programming, checking battery standby operation, confirming cable installations comply with fire resistance and segregation requirements, testing all ancillary interfaces, and completing the commissioning certificate with a full set of as-built drawings and documentation for the log book.',
    category: 'Commissioning',
    difficulty: 'hard',
  },
];
