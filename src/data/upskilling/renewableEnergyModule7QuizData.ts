import { QuizQuestion } from '@/types/quiz';

// Section 1: Installation Best Practices Quiz
export const section1Questions = [
  {
    id: 1,
    question: 'What is the minimum DC voltage isolation requirement before working on PV systems?',
    options: [
      '0V with visual confirmation',
      '50V or below with proven dead testing',
      '100V maximum with insulated tools',
      '500V is acceptable for experienced workers'
    ],
    correct: 1,
    explanation: 'DC systems must be proven dead and at 50V or below before work commences. Visual confirmation alone is insufficient - electrical testing is required.'
  },
  {
    id: 2,
    question: 'Which cable management practice ensures long-term reliability?',
    options: [
      'Tight cable bends to save space',
      'UV-rated cables with proper strain relief and drip loops',
      'Standard indoor cables are sufficient',
      'Cables can touch the roof surface directly'
    ],
    correct: 1,
    explanation: 'UV-rated cables with proper strain relief, adequate bend radius, and drip loops prevent water ingress and mechanical stress damage.'
  },
  {
    id: 3,
    question: 'What is the primary purpose of earth bonding in renewable energy systems?',
    options: [
      'To increase system efficiency',
      'To provide a low-impedance path for fault currents',
      'To reduce cable costs',
      'To improve solar panel output'
    ],
    correct: 1,
    explanation: 'Earth bonding provides a low-impedance path for fault currents, ensuring protective devices operate quickly to maintain safety.'
  },
  {
    id: 4,
    question: 'When should arc fault circuit interrupters (AFCIs) be installed?',
    options: [
      'Only on commercial installations',
      'Only when required by local planning',
      'On all DC circuits as per BS 7671 requirements',
      'They are optional safety devices'
    ],
    correct: 2,
    explanation: 'BS 7671 requires AFCI protection on DC circuits in PV installations to detect and interrupt dangerous arc faults that could cause fires.'
  },
  {
    id: 5,
    question: 'What is the correct approach to DC cable containment?',
    options: [
      'DC cables can share conduit with AC cables',
      'DC positive and negative must be in separate conduits',
      'DC cables of the same circuit should be run together in appropriate conduit',
      'No containment is required for outdoor installations'
    ],
    correct: 2,
    explanation: 'DC positive and negative conductors of the same circuit should be run together to minimise magnetic fields and ensure proper circuit operation.'
  }
];

// Section 2: Commissioning Checks Quiz
export const section2Questions = [
  {
    id: 6,
    question: 'What is the minimum acceptable insulation resistance for a PV installation?',
    options: [
      '0.5 MΩ',
      '1 MΩ',
      '2 MΩ',
      '10 MΩ'
    ],
    correct: 1,
    explanation: 'BS 7671 requires a minimum insulation resistance of 1 MΩ for PV installations when tested at 500V DC.'
  },
  {
    id: 7,
    question: 'During functional testing, what should be verified first?',
    options: [
      'Maximum power output',
      'System shutdown and isolation procedures',
      'Customer app connectivity',
      'Warranty registration'
    ],
    correct: 1,
    explanation: 'Safety systems including shutdown and isolation procedures must be verified first before any other testing to ensure safe operation.'
  },
  {
    id: 8,
    question: 'What voltage measurement indicates a healthy PV string?',
    options: [
      'Voltage close to the sum of individual panel open-circuit voltages',
      '50% of expected voltage is acceptable',
      'Any measurable voltage confirms operation',
      'Voltage testing is not required for commissioning'
    ],
    correct: 0,
    explanation: 'A healthy string should measure close to the sum of individual panel Voc values under testing conditions, indicating all connections are secure.'
  },
  {
    id: 9,
    question: 'Why is polarity verification critical during commissioning?',
    options: [
      'It only affects efficiency slightly',
      'Incorrect polarity can damage equipment and create safety hazards',
      'Modern equipment is polarity-independent',
      'Polarity only matters for AC connections'
    ],
    correct: 1,
    explanation: 'Incorrect DC polarity can cause serious equipment damage, fire risk, and safety hazards, making verification essential.'
  },
  {
    id: 10,
    question: 'What documentation is required upon commissioning completion?',
    options: [
      'Just the invoice and warranty',
      'Basic installation photos only',
      'Electrical Installation Certificate and commissioning report',
      'Customer satisfaction survey'
    ],
    correct: 2,
    explanation: 'BS 7671 requires an Electrical Installation Certificate along with a detailed commissioning report documenting all tests and measurements.'
  }
];

// Section 3: Maintenance Schedules Quiz
export const section3Questions = [
  {
    id: 11,
    question: 'What is the recommended frequency for basic visual inspections of PV systems?',
    options: [
      'Weekly',
      'Monthly',
      'Annually',
      'Only when faults occur'
    ],
    correct: 1,
    explanation: 'Monthly visual inspections help identify issues early before they affect performance or create safety hazards.'
  },
  {
    id: 12,
    question: 'Which maintenance activity requires electrical testing?',
    options: [
      'Cleaning solar panels',
      'Checking for bird nests',
      'Annual insulation resistance testing',
      'Reading the generation meter'
    ],
    correct: 2,
    explanation: 'Annual insulation resistance testing is essential to verify the electrical integrity of the system and detect deterioration.'
  },
  {
    id: 13,
    question: 'What indicates the need for firmware updates?',
    options: [
      'Lower electricity bills',
      'Manufacturer notifications or system performance issues',
      'Visual damage to equipment',
      'Seasonal weather changes'
    ],
    correct: 1,
    explanation: 'Manufacturer notifications about security patches, bug fixes, or performance improvements indicate when firmware updates are needed.'
  },
  {
    id: 14,
    question: 'What is the target performance ratio (PR) for a well-maintained PV system?',
    options: [
      'Greater than 50%',
      'Greater than 65%',
      'Greater than 80%',
      'Greater than 95%'
    ],
    correct: 2,
    explanation: 'A well-maintained PV system should achieve a performance ratio greater than 80%, indicating good system health and minimal losses.'
  },
  {
    id: 15,
    question: 'When should thermal imaging be used in PV maintenance?',
    options: [
      'Only during winter months',
      'To identify hotspots and failing components',
      'Never - it can damage panels',
      'Only on new installations'
    ],
    correct: 1,
    explanation: 'Thermal imaging identifies hotspots, failing diodes, and poor connections that may not be visible during normal inspections.'
  }
];

// Section 4: Fault-Finding Quiz
export const section4Questions = [
  {
    id: 16,
    question: 'What is the first step in systematic PV fault-finding?',
    options: [
      'Replace suspected faulty components',
      'Check monitoring system data and error codes',
      'Start dismantling the system',
      'Contact the manufacturer immediately'
    ],
    correct: 1,
    explanation: 'Always start with monitoring data and error codes to understand the fault symptoms before physical investigation.'
  },
  {
    id: 17,
    question: 'A string showing zero current but normal voltage indicates:',
    options: [
      'Normal operation',
      'Open circuit fault in the string',
      'Short circuit fault',
      'Inverter failure'
    ],
    correct: 1,
    explanation: 'Normal voltage with zero current typically indicates an open circuit fault, such as a broken connector or cable.'
  },
  {
    id: 18,
    question: 'What causes ground fault indicators to trigger in PV systems?',
    options: [
      'High solar irradiance',
      'Insulation breakdown allowing current to earth',
      'Normal system operation',
      'Low battery voltage'
    ],
    correct: 1,
    explanation: 'Ground fault detection indicates insulation breakdown, allowing DC current to flow to earth, creating a safety hazard.'
  },
  {
    id: 19,
    question: 'How should battery system faults be approached?',
    options: [
      'Always work on live battery systems',
      'Follow manufacturer isolation procedures and use appropriate PPE',
      'Batteries are safe to work on without precautions',
      'Ignore battery faults as they self-correct'
    ],
    correct: 1,
    explanation: 'Battery systems store significant energy and require specific isolation procedures and PPE to work safely on fault conditions.'
  },
  {
    id: 20,
    question: 'What indicates an inverter communication fault?',
    options: [
      'High energy generation',
      'Loss of monitoring data and remote access',
      'Perfect system operation',
      'Increased efficiency'
    ],
    correct: 1,
    explanation: 'Communication faults present as loss of monitoring data, inability to access inverter remotely, and missing performance data.'
  }
];

// Section 5: Testing Equipment Quiz
export const section5Questions = [
  {
    id: 21,
    question: 'What is essential when using a multimeter on PV systems?',
    options: [
      'Any basic multimeter is sufficient',
      'Must be rated for DC voltage and current with appropriate safety category',
      'Only AC measurements are needed',
      'Voltage measurements are unnecessary'
    ],
    correct: 1,
    explanation: 'PV systems require meters rated for high DC voltages with appropriate safety categories (CAT III or IV) for the measurement environment.'
  },
  {
    id: 22,
    question: 'Why is irradiance measurement important during testing?',
    options: [
      'It is not important for electrical testing',
      'To correlate electrical measurements with solar conditions',
      'Only needed for performance guarantees',
      'To determine weather conditions only'
    ],
    correct: 1,
    explanation: 'Irradiance measurements allow correlation of electrical performance with solar conditions, enabling accurate assessment of system health.'
  },
  {
    id: 23,
    question: 'What does I-V curve testing reveal about PV panels?',
    options: [
      'Only the installation date',
      'Panel health, degradation, and fault conditions',
      'Just the manufacturer information',
      'Only warranty status'
    ],
    correct: 1,
    explanation: 'I-V curve testing reveals panel health, degradation levels, shading effects, and various fault conditions affecting performance.'
  },
  {
    id: 24,
    question: 'When should a PV analyser be used instead of a basic multimeter?',
    options: [
      'Never - multimeters are always sufficient',
      'For detailed performance analysis and fault diagnosis',
      'Only during initial installation',
      'Only for warranty claims'
    ],
    correct: 1,
    explanation: 'PV analysers provide detailed performance analysis, I-V curves, and advanced fault diagnosis capabilities beyond basic multimeter measurements.'
  },
  {
    id: 25,
    question: 'What safety precaution is essential when using test equipment on live PV systems?',
    options: [
      'No precautions needed - systems are safe',
      'Use appropriate PPE and follow safe working procedures',
      'Only work during nighttime',
      'Disconnect all equipment first'
    ],
    correct: 1,
    explanation: 'PV systems remain live during daylight hours, requiring appropriate PPE, safe working procedures, and equipment rated for the voltage levels present.'
  }
];

// Section 6: Safety and Isolation Quiz
export const section6Questions = [
  {
    id: 26,
    question: 'What is unique about DC isolation compared to AC isolation?',
    options: [
      'DC and AC isolation are identical',
      'DC can maintain arcs more easily and requires different isolation techniques',
      'DC is always safer than AC',
      'DC isolation is not necessary'
    ],
    correct: 1,
    explanation: 'DC current can sustain arcs more easily than AC, requiring different isolation techniques and specifically rated DC switching devices.'
  },
  {
    id: 27,
    question: 'When is it acceptable to work on live PV systems?',
    options: [
      'Never - always isolate first',
      'Only for testing and fault-finding with appropriate safety measures',
      'Anytime with basic hand tools',
      'Only during cloudy weather'
    ],
    correct: 1,
    explanation: 'Live working is only acceptable for essential testing and fault-finding activities using appropriate safety procedures, PPE, and qualified personnel.'
  },
  {
    id: 28,
    question: 'What PPE is required when working near energised PV systems?',
    options: [
      'No special PPE required',
      'Arc-rated clothing, insulated gloves, and safety glasses',
      'Just safety glasses',
      'Only hard hat required'
    ],
    correct: 1,
    explanation: 'Working near energised PV systems requires arc-rated clothing, insulated gloves rated for the voltage, safety glasses, and other appropriate PPE.'
  },
  {
    id: 29,
    question: 'How should emergency shutdown procedures be designed?',
    options: [
      'Complex multi-step procedures',
      'Simple, clearly marked, and accessible to emergency services',
      'Only accessible to qualified technicians',
      'Hidden to prevent tampering'
    ],
    correct: 1,
    explanation: 'Emergency shutdown must be simple, clearly marked, and accessible to emergency services to ensure rapid system isolation during emergencies.'
  },
  {
    id: 30,
    question: 'What is the purpose of rapid shutdown devices in PV systems?',
    options: [
      'To increase system efficiency',
      'To reduce DC voltages to safe levels within the array area',
      'To improve monitoring capabilities',
      'To reduce installation costs'
    ],
    correct: 1,
    explanation: 'Rapid shutdown devices reduce DC voltages to safe levels (typically below 30V) within the PV array area, protecting emergency responders and maintenance personnel.'
  }
];