import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  // =============== INSPECTION PROCEDURES ===============
  
  // Visual Inspection - Beginner
  {
    id: 'inspect-visual-1',
    question: 'During initial visual inspection, what should be checked first?',
    options: [
      'Cable condition and routing',
      'Adequacy of earthing and bonding',
      'Presence of danger notices and labels',
      'Condition of protective devices'
    ],
    correctAnswer: 2,
    explanation: 'Before any detailed inspection, ensure proper warning labels, danger notices, and identification are present and legible for safety.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-2',
    question: 'What indicates inadequate IP rating during visual inspection?',
    options: [
      'Rust on metal enclosures',
      'Water ingress marks or corrosion around cable entries',
      'Loose cable terminations',
      'Faded equipment labels'
    ],
    correctAnswer: 1,
    explanation: 'Water ingress marks, corrosion around cable entries, or visible moisture damage indicates the IP rating is inadequate for the environment.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-3',
    question: 'During cable inspection, what indicates potential thermal damage?',
    options: [
      'Cable installed in conduit',
      'Discolouration, hardening, or cracking of insulation',
      'Cable supported at regular intervals',
      'Use of different cable manufacturers'
    ],
    correctAnswer: 1,
    explanation: 'Thermal damage manifests as discolouration, hardening, cracking, or embrittlement of cable insulation indicating overheating.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-4',
    question: 'What should be checked when inspecting socket outlets visually?',
    options: [
      'Brand compatibility only',
      'Correct orientation and secure fixing',
      'Electrical testing results',
      'Load connected to each outlet'
    ],
    correctAnswer: 1,
    explanation: 'Visual inspection includes checking socket outlets are correctly oriented, securely fixed, undamaged, and appropriate for their location.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-5',
    question: 'During inspection of distribution boards, what indicates poor workmanship?',
    options: [
      'Use of different MCB manufacturers',
      'Unterminated cores not sleeved, poor cable dressing, missing labels',
      'Presence of RCD protection',
      'Use of modular components'
    ],
    correctAnswer: 1,
    explanation: 'Poor workmanship is evident through unterminated cores without protective sleeving, poor cable management, and missing circuit identification.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-6',
    question: 'What visual signs indicate overloaded circuits?',
    options: [
      'Multiple cable types in use',
      'Discoloured or burnt connections, excessive heat damage',
      'Use of extension leads',
      'Different switch types'
    ],
    correctAnswer: 1,
    explanation: 'Overloaded circuits show signs of overheating such as discoloured connections, burnt terminals, or heat damage to surrounding materials.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-7',
    question: 'During visual inspection of earthing arrangements, what should be verified?',
    options: [
      'Earth electrode resistance value',
      'Proper connections, labels, and accessibility of earthing conductors',
      'Soil conditions around earth electrode',
      'Earthing conductor colour only'
    ],
    correctAnswer: 1,
    explanation: 'Visual inspection must verify earthing conductors are properly connected, labelled, accessible, and show no signs of corrosion or damage.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '611.2'
  },
  {
    id: 'inspect-visual-8',
    question: 'What indicates inadequate IP protection in outdoor installations?',
    options: [
      'Use of galvanised steel conduit',
      'Corrosion, water ingress, or damaged seals at cable entries',
      'Metal enclosures instead of plastic',
      'Standard indoor-rated equipment'
    ],
    correctAnswer: 1,
    explanation: 'Outdoor installations showing corrosion, water ingress, or damaged seals indicate inadequate IP rating for the environment.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '611.2'
  },

  // Testing Procedures - Intermediate
  {
    id: 'test-procedures-1',
    question: 'Before commencing electrical testing, what must be verified?',
    options: [
      'All circuits are energised',
      'Test equipment is calibrated and proved on known supply',
      'Installation is fully loaded',
      'Weather conditions are suitable'
    ],
    correctAnswer: 1,
    explanation: 'Test equipment must be verified as working correctly on a known source before and after testing to ensure reliable results.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.1'
  },
  {
    id: 'test-procedures-2',
    question: 'Why must insulation resistance testing be performed with the installation de-energised?',
    options: [
      'To protect test equipment from damage',
      'To prevent false readings from applied voltages and protect against shock',
      'To comply with health and safety regulations only',
      'To prevent nuisance RCD operation'
    ],
    correctAnswer: 1,
    explanation: 'De-energising prevents false readings from applied voltages and protects against electric shock during high-voltage insulation testing.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.3.1'
  },
  {
    id: 'test-procedures-3',
    question: 'When testing RCD operation, what safety precaution is essential?',
    options: [
      'Test at maximum load current',
      'Ensure no load is connected to RCD protected circuits',
      'Test only during daylight hours',
      'Use only battery-powered test equipment'
    ],
    correctAnswer: 1,
    explanation: 'RCD testing must be performed with no load connected to prevent equipment damage and ensure accurate trip time measurements.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'test-procedures-4',
    question: 'What is the correct sequence for continuity testing of a ring final circuit?',
    options: [
      'Test live to neutral, then live to earth',
      'Test end-to-end resistance of each conductor, then cross-connect and test R1+R2',
      'Test R1+R2 at each socket outlet only',
      'Test with circuit energised to verify continuity'
    ],
    correctAnswer: 1,
    explanation: 'Ring circuit testing requires end-to-end resistance measurement of each conductor, followed by cross-connection method to verify ring integrity.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'test-procedures-5',
    question: 'Why should earth fault loop impedance testing be performed last in the test sequence?',
    options: [
      'It requires the highest test voltage',
      'It requires the circuit to be energised, posing safety risks',
      'It is the most complex test to perform',
      'It may damage sensitive equipment if performed first'
    ],
    correctAnswer: 1,
    explanation: 'Zs testing requires energised circuits, so it should be performed last to minimise safety risks during the testing sequence.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'test-procedures-6',
    question: 'What documentation should accompany test equipment?',
    options: [
      'Purchase receipt only',
      'Current calibration certificate and instruction manual',
      'Warranty information',
      'Previous test results'
    ],
    correctAnswer: 1,
    explanation: 'Test equipment must have current calibration certificates and proper documentation to ensure accuracy and traceability.',
    category: 'Testing Procedures',
    difficulty: 'Intermediate',
    regulation: '612.1'
  },

  // =============== TESTING METHODS & INTERPRETATION ===============
  
  // Continuity Testing - Intermediate  
  {
    id: 'continuity-1',
    question: 'What does a continuity reading of infinite resistance indicate?',
    options: [
      'Perfect continuity',
      'Open circuit or disconnection',
      'Low resistance connection',
      'Test equipment malfunction'
    ],
    correctAnswer: 1,
    explanation: 'Infinite resistance indicates an open circuit, broken conductor, or disconnected joint preventing current flow.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'continuity-2',
    question: 'In a 32A ring final circuit using 2.5mm² cable, what would be typical R1+R2 reading at the origin?',
    options: [
      '0.1Ω to 0.2Ω',
      '0.3Ω to 0.6Ω',
      '1.0Ω to 1.5Ω',
      '2.0Ω to 3.0Ω'
    ],
    correctAnswer: 1,
    explanation: 'A typical 32A ring using 2.5mm² cable would show R1+R2 readings of approximately 0.3Ω to 0.6Ω depending on circuit length.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-3',
    question: 'What indicates a broken ring final circuit during continuity testing?',
    options: [
      'Zero resistance between live and neutral',
      'R1+R2 values that are significantly higher than expected',
      'Perfect continuity at all outlets',
      'RCD operation during testing'
    ],
    correctAnswer: 1,
    explanation: 'A broken ring will show as a radial circuit with much higher R1+R2 values than expected for a complete ring.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-4',
    question: 'How should protective conductor continuity be verified for a radial circuit?',
    options: [
      'Test between phase and protective conductor',
      'Test between origin and furthest point of protective conductor',
      'Test only at the origin of the circuit',
      'Visual inspection is sufficient'
    ],
    correctAnswer: 1,
    explanation: 'Protective conductor continuity requires testing between the earthing terminal at the origin and the furthest point on the circuit.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-5',
    question: 'What compensation should be applied to continuity measurements?',
    options: [
      'No compensation required',
      'Add test lead resistance to all readings',
      'Subtract test lead resistance from all readings',
      'Apply temperature correction only'
    ],
    correctAnswer: 2,
    explanation: 'Test lead resistance must be subtracted from continuity measurements to obtain accurate conductor resistance values.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'continuity-6',
    question: 'What current should be used for continuity testing?',
    options: [
      'Maximum available from test instrument',
      'Between 4mA and 24mA DC',
      '100mA minimum',
      'Any DC current is acceptable'
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 specifies continuity testing should use current between 4mA and 24mA DC to avoid damage to electronic components.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'continuity-7',
    question: 'When testing ring final circuits, what indicates correct wiring?',
    options: [
      'Same resistance reading at all outlets',
      'R1+R2 at midpoint approximately (R1+R2 origin)/4',
      'Infinite resistance between conductors',
      'Zero resistance throughout'
    ],
    correctAnswer: 1,
    explanation: 'In a correctly wired ring, the R1+R2 reading at the midpoint should be approximately one quarter of the reading at the origin.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },

  // Insulation Resistance Testing - Intermediate
  {
    id: 'insulation-1',
    question: 'Why might insulation resistance be lower on a damp day?',
    options: [
      'Test equipment malfunction',
      'Moisture reduces insulation effectiveness',
      'Temperature affects cable resistance',
      'Voltage drop in supply'
    ],
    correctAnswer: 1,
    explanation: 'Moisture and humidity can penetrate insulation, providing leakage paths that reduce insulation resistance readings.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3'
  },
  {
    id: 'insulation-2',
    question: 'What equipment should be disconnected before insulation resistance testing?',
    options: [
      'All socket outlets',
      'Electronic equipment, surge protectors, and sensitive devices',
      'Only faulty equipment',
      'Protective devices only'
    ],
    correctAnswer: 1,
    explanation: 'Electronic equipment, surge protection devices, and equipment with filters must be disconnected to prevent damage and false readings.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.1'
  },
  {
    id: 'insulation-3',
    question: 'A circuit shows 0.3MΩ insulation resistance. What action is required?',
    options: [
      'Accept as satisfactory',
      'Investigate cause and rectify before energising',
      'Apply voltage reduction',
      'Install additional RCD protection'
    ],
    correctAnswer: 1,
    explanation: 'Any reading below 1.0MΩ for 230V circuits indicates inadequate insulation requiring investigation and rectification.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'insulation-4',
    question: 'How long should test voltage be applied during insulation resistance testing?',
    options: [
      'Instantaneous reading',
      'Until reading stabilises, typically 60 seconds',
      '5 minutes minimum',
      '10 seconds maximum'
    ],
    correctAnswer: 1,
    explanation: 'Test voltage should be applied until the reading stabilises, typically 60 seconds, to allow for capacitive charging effects.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'insulation-5',
    question: 'What test voltage is used for insulation testing of 400V three-phase circuits?',
    options: [
      '500V DC',
      '1000V DC',
      '1500V DC',
      '2500V DC'
    ],
    correctAnswer: 1,
    explanation: 'For circuits with nominal voltage between 500V and 1000V, the test voltage is 1000V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'insulation-6',
    question: 'What is the minimum insulation resistance for SELV circuits?',
    options: [
      '0.25MΩ',
      '0.5MΩ',
      '1.0MΩ',
      '2.0MΩ'
    ],
    correctAnswer: 0,
    explanation: 'SELV circuits operating at voltages up to 50V AC require minimum insulation resistance of 0.25MΩ.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'insulation-7',
    question: 'Why should electronic equipment be disconnected during insulation testing?',
    options: [
      'To prevent equipment operation',
      'Electronic components provide alternative current paths causing low readings',
      'To reduce test current requirements',
      'Electronic equipment is not relevant to insulation'
    ],
    correctAnswer: 1,
    explanation: 'Electronic components contain capacitors and filters that provide current paths, resulting in artificially low insulation readings.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.1'
  },

  // Earth Fault Loop Impedance - Advanced
  {
    id: 'efli-1',
    question: 'Why does earth fault loop impedance increase with temperature?',
    options: [
      'Conductor resistance increases with temperature',
      'Test equipment becomes less accurate',
      'Earth resistance changes',
      'Protective devices operate differently'
    ],
    correctAnswer: 0,
    explanation: 'Conductor resistance increases with temperature, so Zs readings taken at ambient temperature must be corrected to operating temperature.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-2',
    question: 'A 16A Type B MCB protects a circuit with Zs of 2.8Ω. Is this acceptable?',
    options: [
      'Yes, well within limits',
      'No, exceeds maximum Zs of 2.75Ω',
      'Acceptable with RCD protection',
      'Depends on cable length'
    ],
    correctAnswer: 1,
    explanation: 'For 16A Type B MCB, maximum Zs is 2.75Ω. At 2.8Ω, the circuit exceeds this limit and requires rectification.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-3',
    question: 'What affects the external earth fault loop impedance (Ze)?',
    options: [
      'Installation wiring only',
      'Supply authority earthing system and transformer impedance',
      'Load connected to installation',
      'Ambient temperature only'
    ],
    correctAnswer: 1,
    explanation: 'Ze is determined by the supply authority\'s earthing system, transformer impedance, and supply network characteristics.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-4',
    question: 'How should high Zs readings be corrected?',
    options: [
      'Install larger protective devices',
      'Use longer cables to reduce impedance',
      'Improve earthing connections or upgrade cables',
      'Add RCD protection only'
    ],
    correctAnswer: 2,
    explanation: 'High Zs is corrected by improving earthing connections, increasing cable sizes, or reducing circuit length to lower impedance.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-5',
    question: 'When testing Zs on RCD-protected circuits, what precaution is necessary?',
    options: [
      'Test at maximum current',
      'Test with RCD bypassed or use no-trip setting',
      'Test only when circuit is fully loaded',
      'Use DC test voltage'
    ],
    correctAnswer: 1,
    explanation: 'RCD-protected circuits require the RCD to be bypassed or no-trip test methods used to prevent operation during testing.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-6',
    question: 'What is the formula for calculating temperature-corrected Zs?',
    options: [
      'Zs × (230 + 20) / (230 + operating temp)',
      'Zs × (230 + operating temp) / (230 + 20)',
      'Zs × 1.2 for copper, 1.38 for aluminium',
      'No correction required for modern cables'
    ],
    correctAnswer: 1,
    explanation: 'Temperature correction multiplies measured Zs by (230 + operating temp) / (230 + 20) to account for increased resistance at operating temperature.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },

  // =============== RCD & PROTECTIVE DEVICE TESTING ===============
  
  // RCD Testing - Advanced
  {
    id: 'rcd-1',
    question: 'An RCD rated at 30mA trips at 28mA during testing. Is this acceptable?',
    options: [
      'No, should trip exactly at 30mA',
      'Yes, within acceptable range of 15mA to 30mA',
      'No, indicates RCD is faulty',
      'Yes, but only if trip time is correct'
    ],
    correctAnswer: 1,
    explanation: 'RCDs should not trip below 50% (15mA) but must trip by 100% (30mA) of rated current. 28mA is acceptable.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-2',
    question: 'What is the maximum trip time for an RCD at 5× rated current?',
    options: [
      '300ms',
      '40ms',
      '200ms',
      '100ms'
    ],
    correctAnswer: 1,
    explanation: 'At 5× rated current, RCDs must trip within 40ms to provide adequate protection against electric shock.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-3',
    question: 'Why is RCD testing performed at different multiples of rated current?',
    options: [
      'To verify sensitivity and ensure adequate protection speed',
      'To calibrate the RCD',
      'To test at different voltages',
      'To check mechanical operation only'
    ],
    correctAnswer: 0,
    explanation: 'Testing at ½×, 1×, and 5× rated current verifies the RCD won\'t trip below threshold but will operate quickly enough for protection.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-4',
    question: 'What indicates RCD deterioration during testing?',
    options: [
      'Consistent trip times',
      'Increasing trip times or decreasing sensitivity',
      'Normal operation at rated current',
      'Immediate tripping'
    ],
    correctAnswer: 1,
    explanation: 'RCD deterioration is indicated by increasing trip times, reduced sensitivity, or failure to operate within specified parameters.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-5',
    question: 'How should Type A RCDs be tested compared to Type AC?',
    options: [
      'Identical test procedures',
      'Type A requires AC and pulsating DC tests',
      'Type A needs higher test currents',
      'Type A testing is not required'
    ],
    correctAnswer: 1,
    explanation: 'Type A RCDs must be tested with both AC and pulsating DC currents to verify operation with different fault types.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-6',
    question: 'What is the maximum non-operation current for a 30mA RCD?',
    options: [
      '10mA',
      '15mA',
      '20mA',
      '25mA'
    ],
    correctAnswer: 1,
    explanation: 'RCDs must not operate at 50% of rated current, so a 30mA RCD should not trip at 15mA or below.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-7',
    question: 'Why should RCD ramp testing be performed?',
    options: [
      'To find exact trip current and verify it\'s within acceptable limits',
      'To calibrate the RCD',
      'To test mechanical operation',
      'To check installation wiring'
    ],
    correctAnswer: 0,
    explanation: 'Ramp testing determines the exact trip current, verifying it falls between 50% and 100% of the rated residual current.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },

  // =============== PRACTICAL SCENARIOS & FAULT FINDING ===============
  
  // Scenario-Based Testing - Advanced
  {
    id: 'scenario-1',
    question: 'During testing, a kitchen ring circuit shows R1+R2 of 1.2Ω at the origin but 2.1Ω at socket outlets. What is indicated?',
    options: [
      'Normal readings for a long ring',
      'Possible interconnection between rings',
      'Broken ring or spur connected as ring',
      'Incorrect test procedure'
    ],
    correctAnswer: 2,
    explanation: 'Significantly higher R1+R2 at outlets suggests a broken ring operating as a radial, or spurs incorrectly connected as part of the ring.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'scenario-2',
    question: 'A bathroom circuit passes all tests except Zs which reads 3.2Ω. The MCB is 6A Type B. What action is required?',
    options: [
      'Accept as RCD protected',
      'Install supplementary bonding only',
      'Reduce Zs below 7.67Ω maximum',
      'Change to higher rated MCB'
    ],
    correctAnswer: 2,
    explanation: 'Even with RCD protection, the circuit must meet basic protection requirements. 6A Type B MCB requires Zs ≤ 7.67Ω, so 3.2Ω is acceptable.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '411.3.2'
  },
  {
    id: 'scenario-3',
    question: 'An office lighting circuit shows insulation resistance of 0.8MΩ between live and neutral. Investigation reveals several computers connected. What should be done?',
    options: [
      'Accept reading as adequate',
      'Disconnect computers and retest circuit insulation',
      'Install RCD protection',
      'Replace all cables'
    ],
    correctAnswer: 1,
    explanation: 'Electronic equipment can cause low insulation readings. Disconnect equipment and retest to verify actual cable insulation.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '612.3.1'
  },
  {
    id: 'scenario-4',
    question: 'During RCD testing, the device trips correctly at 1× but fails to trip at 5× rated current. What is the likely cause?',
    options: [
      'RCD is functioning normally',
      'RCD internal contacts are welded or mechanism jammed',
      'Test equipment fault',
      'Circuit overload'
    ],
    correctAnswer: 1,
    explanation: 'Failure to trip at high current while operating at low current suggests mechanical failure such as welded contacts or jammed mechanism.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'scenario-5',
    question: 'A new installation shows Ze of 0.8Ω but individual circuit Zs readings are all above maximum values. What should be investigated?',
    options: [
      'Supply authority earthing',
      'Main earthing conductor connections and installation earthing',
      'Individual circuit cables only',
      'Protective device settings'
    ],
    correctAnswer: 1,
    explanation: 'Good Ze but high Zs suggests problems with installation earthing, main earthing conductor, or equipotential bonding connections.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'scenario-6',
    question: 'A workshop circuit shows normal insulation resistance but very high Zs readings. All connections appear tight. What should be checked?',
    options: [
      'Cable size adequacy',
      'Protective conductor continuity and main earthing conductor integrity',
      'Supply voltage stability',
      'Load current only'
    ],
    correctAnswer: 1,
    explanation: 'High Zs with good insulation suggests protective conductor continuity issues or problems with main earthing connections.',
    category: 'Practical Testing',
    difficulty: 'Advanced',
    regulation: '612.9'
  },

  // =============== CERTIFICATION & DOCUMENTATION ===============
  
  // Test Results & Certification - Intermediate
  {
    id: 'cert-1',
    question: 'What determines whether an Electrical Installation Certificate or Minor Works Certificate is required?',
    options: [
      'Value of work carried out',
      'Extent of work - new installation vs minor additions/alterations',
      'Client preference',
      'Type of building'
    ],
    correctAnswer: 1,
    explanation: 'EIC is required for new installations or major alterations. MWC is for minor work that doesn\'t affect existing test results.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },
  {
    id: 'cert-2',
    question: 'Who can sign the "Design" section of an Electrical Installation Certificate?',
    options: [
      'Any qualified electrician',
      'The person responsible for the design',
      'Building control inspector',
      'Installation company director'
    ],
    correctAnswer: 1,
    explanation: 'Only the person responsible for the design of the installation can sign the design section, demonstrating accountability.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },
  {
    id: 'cert-3',
    question: 'What limitation should be recorded if insulation testing is not possible on all circuits?',
    options: [
      'No limitation required',
      'Record specific circuits not tested and reasons',
      'General statement about limitations',
      'Note equipment was connected'
    ],
    correctAnswer: 1,
    explanation: 'Specific limitations must be clearly recorded, identifying untested circuits and reasons to inform future inspectors.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },
  {
    id: 'cert-4',
    question: 'How long should test certificates be retained?',
    options: [
      'Until next inspection',
      'Indefinitely for building records',
      '5 years minimum',
      '10 years only'
    ],
    correctAnswer: 1,
    explanation: 'Certificates should be retained indefinitely as they form part of the building\'s electrical installation records.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },
  {
    id: 'cert-5',
    question: 'What must be provided with every Electrical Installation Certificate?',
    options: [
      'Schedule of test results only',
      'Schedule of test results and schedule of inspections',
      'Site plans and drawings',
      'Material certificates'
    ],
    correctAnswer: 1,
    explanation: 'EIC must be accompanied by schedules of both test results and inspections to provide complete documentation.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },
  {
    id: 'cert-6',
    question: 'What information must be recorded on the Schedule of Test Results?',
    options: [
      'Test results only',
      'Circuit details, test results, and maximum permitted values',
      'Equipment serial numbers',
      'Installation costs'
    ],
    correctAnswer: 1,
    explanation: 'The schedule must include circuit identification, test results obtained, and maximum permitted values for comparison.',
    category: 'Certification',
    difficulty: 'Intermediate',
    regulation: '633'
  },

  // =============== REGULATORY COMPLIANCE ===============
  
  // BS7671 Regulations - Beginner to Advanced
  {
    id: 'reg-1',
    question: 'According to BS 7671, what is the purpose of initial verification?',
    options: [
      'To test electrical equipment',
      'To verify the installation complies with BS 7671',
      'To check building regulations compliance',
      'To test protective devices only'
    ],
    correctAnswer: 1,
    explanation: 'Initial verification confirms the installation has been designed, constructed, and installed in accordance with BS 7671.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '610'
  },
  {
    id: 'reg-2',
    question: 'What information must be provided before commencing initial verification?',
    options: [
      'Material certificates',
      'Charts, diagrams, and schedules for the installation',
      'Previous test results',
      'Building control approval'
    ],
    correctAnswer: 1,
    explanation: 'Relevant charts, diagrams, schedules, and installation details must be provided to enable proper verification.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '610.1'
  },
  {
    id: 'reg-3',
    question: 'Which regulation covers the requirements for periodic inspection and testing?',
    options: [
      'Part 6 - Verification',
      'Part 7 - Special installations',
      'Section 621 - Initial verification',
      'Section 622 - Periodic inspection'
    ],
    correctAnswer: 3,
    explanation: 'Section 622 specifically covers requirements for periodic inspection and testing of electrical installations.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '622'
  },
  {
    id: 'reg-4',
    question: 'What does regulation 134.1.1 require regarding compliance?',
    options: [
      'Installations must use specific cable types',
      'Every installation shall comply with BS 7671 requirements',
      'Only new installations need comply',
      'Compliance is optional for domestic premises'
    ],
    correctAnswer: 1,
    explanation: 'Regulation 134.1.1 establishes that every electrical installation shall comply with the requirements of BS 7671.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '134.1.1'
  },
  {
    id: 'reg-5',
    question: 'Which regulation addresses safety during verification work?',
    options: [
      'Regulation 610.1',
      'Regulation 611.1',
      'Regulation 612.1',
      'All verification regulations include safety requirements'
    ],
    correctAnswer: 3,
    explanation: 'Safety requirements are integrated throughout Part 6, with specific safety measures required for each type of verification activity.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '610-630'
  },

  // =============== SAFETY & PROCEDURES ===============
  
  // Safety & Risk Assessment - Beginner
  {
    id: 'safety-1',
    question: 'What is the first step in safe isolation procedure?',
    options: [
      'Switch off the circuit',
      'Identify the circuit to be worked on',
      'Test the voltage indicator',
      'Lock off the isolation point'
    ],
    correctAnswer: 1,
    explanation: 'The first step is to correctly identify the circuit or equipment to be worked on to ensure the right circuit is isolated.',
    category: 'Safety',
    difficulty: 'Beginner'
  },
  {
    id: 'safety-2',
    question: 'What PPE is essential when carrying out electrical testing?',
    options: [
      'Safety boots only',
      'Insulated gloves and safety boots',
      'Safety glasses and hard hat',
      'High-visibility jacket'
    ],
    correctAnswer: 1,
    explanation: 'Insulated gloves and safety boots provide protection against electric shock during testing procedures.',
    category: 'Safety',
    difficulty: 'Beginner'
  },
  {
    id: 'safety-3',
    question: 'What does GS 38 provide guidance on?',
    options: [
      'Cable installation methods',
      'Electrical test equipment for electricians',
      'Earthing arrangements',
      'Lighting calculations'
    ],
    correctAnswer: 1,
    explanation: 'GS 38 provides guidance on electrical test equipment for electricians, covering safety requirements for test instruments.',
    category: 'Safety',
    difficulty: 'Beginner'
  },
  {
    id: 'safety-4',
    question: 'What is the maximum voltage that test probe tips should be exposed when testing live circuits?',
    options: ['2mm', '4mm', '10mm', '15mm'],
    correctAnswer: 0,
    explanation: 'According to GS 38, test probe tips should have no more than 2mm of exposed metal to minimise risk of short circuits.',
    category: 'Safety',
    difficulty: 'Beginner'
  },
  {
    id: 'safety-5',
    question: 'When should you prove your voltage indicator before use?',
    options: [
      'Once per day',
      'Before and after each use',
      'Weekly',
      'Only when it appears damaged'
    ],
    correctAnswer: 1,
    explanation: 'Voltage indicators should be proved on a known source before and after each use to ensure they are functioning correctly.',
    category: 'Safety',
    difficulty: 'Beginner'
  },

  // =============== SPECIAL INSTALLATIONS ===============
  
  // Special Locations - Intermediate
  {
    id: 'special-1',
    question: 'In a bathroom, what is the minimum IP rating required for equipment in Zone 1?',
    options: ['IPX1', 'IPX4', 'IPX5', 'IPX7'],
    correctAnswer: 3,
    explanation: 'Equipment in bathroom Zone 1 requires a minimum rating of IPX7 (protected against immersion in water).',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '701.512.2'
  },
  {
    id: 'special-2',
    question: 'What is the maximum height of Zone 1 in a bathroom with a shower?',
    options: ['2.0m', '2.25m', '2.5m', '3.0m'],
    correctAnswer: 1,
    explanation: 'Zone 1 in a bathroom extends to 2.25m above the floor level, or the highest fixed shower head if higher.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '701.32'
  },
  {
    id: 'special-3',
    question: 'In agricultural premises, what is the maximum earth fault loop impedance for a 230V circuit?',
    options: ['0.37Ω', '0.55Ω', '1.37Ω', '1.84Ω'],
    correctAnswer: 0,
    explanation: 'Agricultural premises require enhanced protection with maximum Zs of 0.37Ω for 230V circuits due to increased shock risk.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '705.411.1'
  },

  // =============== PERIODIC INSPECTION & TESTING ===============
  
  // Periodic Testing - Advanced
  {
    id: 'periodic-1',
    question: 'What factors determine the frequency of periodic inspection and testing?',
    options: [
      'Age of installation only',
      'Type of installation, environment, usage, and maintenance quality',
      'Client budget availability',
      'Local authority requirements'
    ],
    correctAnswer: 1,
    explanation: 'Inspection frequency depends on installation type, environmental conditions, usage patterns, and quality of maintenance.',
    category: 'Periodic Testing',
    difficulty: 'Advanced',
    regulation: '622'
  },
  {
    id: 'periodic-2',
    question: 'During periodic inspection, what deterioration should be specifically looked for?',
    options: [
      'Equipment age only',
      'Thermal damage, mechanical damage, corrosion, and wear',
      'Aesthetic appearance',
      'Brand compatibility'
    ],
    correctAnswer: 1,
    explanation: 'Periodic inspection focuses on deterioration from thermal effects, mechanical stress, corrosion, and normal wear and tear.',
    category: 'Periodic Testing',
    difficulty: 'Advanced',
    regulation: '622'
  },

  // =============== MEASUREMENT ACCURACY & INTERPRETATION ===============
  
  // Measurement Accuracy - Advanced  
  {
    id: 'accuracy-1',
    question: 'Why is test equipment accuracy critical for regulatory compliance?',
    options: [
      'To impress clients',
      'Inaccurate readings may indicate compliance when installation is actually unsafe',
      'Legal requirements only',
      'Equipment manufacturer requirements'
    ],
    correctAnswer: 1,
    explanation: 'Inaccurate test equipment could give false compliance readings, potentially leaving unsafe installations energised.',
    category: 'Test Equipment',
    difficulty: 'Advanced',
    regulation: '612.1'
  },
  {
    id: 'accuracy-2',
    question: 'What calibration interval is typically required for electrical test equipment?',
    options: [
      '6 months',
      '12 months',
      '24 months',
      'When it appears to malfunction'
    ],
    correctAnswer: 1,
    explanation: 'Annual calibration is typically required to maintain accuracy and ensure reliable test results for safety verification.',
    category: 'Test Equipment',
    difficulty: 'Advanced',
    regulation: '612.1'
  },

  // Historical BS7671 fundamentals for comprehensive coverage
  {
    id: 'bs7671-fund-1',
    question: 'What does BS 7671 define as "live parts"?',
    options: [
      'Parts that are normally energised',
      'Parts that may become live under fault conditions',
      'Conductors and conductive parts intended to be energised in normal use',
      'Any metallic parts of electrical equipment'
    ],
    correctAnswer: 2,
    explanation: 'BS 7671 defines live parts as conductors and conductive parts intended to be energised in normal use, including neutral conductors but excluding PEN conductors.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '100.2'
  },
  {
    id: 'bs7671-fund-2',
    question: 'What is the standard voltage for single-phase domestic supply in the UK?',
    options: ['220V', '230V', '240V', '250V'],
    correctAnswer: 1,
    explanation: 'The standard voltage for single-phase domestic supply in the UK is 230V ±10% (207V to 253V).',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '312.2'
  },
  {
    id: 'bs7671-fund-3',
    question: 'What is the purpose of earthing according to BS 7671?',
    options: [
      'To provide a return path for current',
      'To limit voltage between exposed-conductive-parts and earth',
      'To reduce electromagnetic interference',
      'To improve power factor'
    ],
    correctAnswer: 1,
    explanation: 'The fundamental purpose of earthing is to limit the voltage that may appear between exposed-conductive-parts and earth.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '411.3.1'
  },

  // =============== PHASE 1 EXPANSION - 100 NEW QUESTIONS ===============
  
  // Visual Inspection - Additional Questions
  {
    id: 'inspect-visual-new-1',
    question: 'What is the minimum IP rating required for a socket outlet installed in a domestic bathroom zone 2?',
    options: [
      'IP20',
      'IP44',
      'IPX4',
      'IPX7'
    ],
    correctAnswer: 2,
    explanation: 'Socket outlets in bathroom zone 2 must have a minimum rating of IPX4 to protect against water splashing from any direction.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '701.512.3'
  },
  {
    id: 'inspect-visual-new-2',
    question: 'During visual inspection, you notice cables buried in walls without mechanical protection. At what depth must cables be installed to comply with BS 7671?',
    options: [
      'Minimum 50mm from surface in safe zones',
      'Minimum 25mm from surface anywhere',
      'No minimum depth if RCD protected',
      'Minimum 100mm from surface'
    ],
    correctAnswer: 0,
    explanation: 'Cables buried in walls must be installed at a minimum depth of 50mm from the surface when in designated safe zones, or have additional protection.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '522.6.202'
  },
  {
    id: 'inspect-visual-new-3',
    question: 'What must be provided at the origin of every installation?',
    options: [
      'RCD protection only',
      'Surge protection device',
      'Means of isolation and switching off for mechanical maintenance',
      'Emergency lighting'
    ],
    correctAnswer: 2,
    explanation: 'Every installation must have a readily accessible means of isolation at the origin, capable of cutting off the supply to the entire installation.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '537.1.2'
  },
  {
    id: 'inspect-visual-new-4',
    question: 'During inspection of an outdoor installation, what maximum voltage should be used for socket outlets?',
    options: [
      '400V three-phase',
      '230V single-phase with 30mA RCD',
      '110V centre-tapped transformer',
      '12V extra-low voltage'
    ],
    correctAnswer: 1,
    explanation: 'Outdoor socket outlets up to 32A must be protected by a 30mA RCD. Reduced voltage systems (110V) are preferred for construction sites.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '411.3.3'
  },
  {
    id: 'inspect-visual-new-5',
    question: 'What colour must the insulation of a protective conductor be?',
    options: [
      'Green only',
      'Yellow only',
      'Green-and-yellow stripes',
      'Bare copper acceptable in all cases'
    ],
    correctAnswer: 2,
    explanation: 'Protective conductors must be identified by green-and-yellow stripes (bicolour combination). This combination must not be used for any other purpose.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '514.3.1'
  },
  {
    id: 'inspect-visual-new-6',
    question: 'You inspect a consumer unit and find an RCBO protecting a lighting circuit. What is the maximum rated residual operating current for this device?',
    options: [
      '10mA',
      '30mA',
      '100mA',
      '300mA'
    ],
    correctAnswer: 1,
    explanation: 'For final circuits not exceeding 32A, RCD protection must not exceed 30mA residual operating current for additional protection against electric shock.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '415.1.1'
  },
  {
    id: 'inspect-visual-new-7',
    question: 'During visual inspection, what indicates a cable is suitable for direct burial underground?',
    options: [
      'PVC insulation only',
      'Steel wire armoured (SWA) cable',
      'Standard T&E cable in conduit',
      'Any cable over 10mm²'
    ],
    correctAnswer: 1,
    explanation: 'Cables for direct burial must have appropriate construction, typically steel wire armoured (SWA) cables which provide mechanical protection.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '522.8.10'
  },
  {
    id: 'inspect-visual-new-8',
    question: 'What must be installed for every circuit to enable identification?',
    options: [
      'Colour-coded cables',
      'Durable circuit labelling at distribution boards',
      'Written instructions only',
      'Photographic record'
    ],
    correctAnswer: 1,
    explanation: 'Durable, legible circuit identification labels must be provided at distribution boards to enable circuits to be easily identified.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '514.1.1'
  },
  {
    id: 'inspect-visual-new-9',
    question: 'You notice a shower circuit protected by a 32A MCB with 4mm² cable. What is wrong with this installation?',
    options: [
      'Nothing, this is acceptable',
      'Cable undersized for protective device rating',
      'MCB rating too low',
      'Should use RCBO instead'
    ],
    correctAnswer: 1,
    explanation: '4mm² cable has a maximum current-carrying capacity of approximately 27A (depending on installation method). A 32A MCB could allow overload without disconnection.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '433.1.1'
  },
  {
    id: 'inspect-visual-new-10',
    question: 'What is the purpose of main equipotential bonding?',
    options: [
      'To provide circuit protection',
      'To reduce earth loop impedance',
      'To connect extraneous-conductive-parts to the main earthing terminal',
      'To improve power quality'
    ],
    correctAnswer: 2,
    explanation: 'Main equipotential bonding connects extraneous-conductive-parts (gas, water, structural steel) to the main earthing terminal to prevent dangerous voltages.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '411.3.1.2'
  },
  {
    id: 'inspect-visual-new-11',
    question: 'During inspection, what minimum cross-sectional area should main equipotential bonding conductors be?',
    options: [
      '2.5mm² copper',
      '6mm² copper minimum, half the earthing conductor but not less than 6mm²',
      '10mm² copper minimum',
      'Same size as the largest circuit conductor'
    ],
    correctAnswer: 1,
    explanation: 'Main bonding conductors must be at least half the cross-sectional area of the earthing conductor, with a minimum of 6mm² and need not exceed 25mm².',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '544.1.1'
  },
  {
    id: 'inspect-visual-new-12',
    question: 'You inspect a garage consumer unit and notice no surge protection device (SPD). When is SPD required?',
    options: [
      'Always required in all installations',
      'Only in commercial buildings',
      'Where consequences of overvoltage could result in serious injury or loss of life',
      'Never required in domestic installations'
    ],
    correctAnswer: 2,
    explanation: 'SPDs are required where the installation serves areas with risk of injury/loss of life, or where loss of service would cause significant public safety concerns.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '443.4'
  },
  {
    id: 'inspect-visual-new-13',
    question: 'What indicates adequate provision for isolation of an installation?',
    options: [
      'Circuit breakers only',
      'Accessible main switch capable of cutting off full load current',
      'Pull-cord switches',
      'RCD as sole means of isolation'
    ],
    correctAnswer: 1,
    explanation: 'A readily accessible main switch capable of interrupting full load current must be provided at the origin for isolation purposes.',
    category: 'Visual Inspection',
    difficulty: 'Beginner',
    regulation: '537.2.1'
  },

  // Continuity Testing - Additional Questions
  {
    id: 'continuity-new-1',
    question: 'You measure R1+R2 for a 25m radial circuit and get 0.85Ω. If the circuit uses 2.5mm² live conductors and 1.5mm² CPC, is this acceptable?',
    options: [
      'Yes, within expected range',
      'No, reading too high',
      'Yes, but requires temperature correction',
      'No, indicates broken conductor'
    ],
    correctAnswer: 0,
    explanation: '2.5mm² copper = 7.41mΩ/m, 1.5mm² copper = 12.1mΩ/m. Expected R1+R2 = (7.41 + 12.1) × 25 = 0.49Ω × 1.2 multiplier = 0.59Ω. 0.85Ω is within acceptable range considering connections.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-2',
    question: 'When testing ring final circuit continuity, what should be the relationship between the measured values?',
    options: [
      'All readings should be identical',
      'r1 + r2 should equal R1 + R2 ÷ 4',
      'R1 and R2 should be half of r1 and r2',
      'r1 should be twice r2'
    ],
    correctAnswer: 1,
    explanation: 'For a ring circuit, the resistance measured at each socket (r1+r2) should equal approximately (R1+R2)÷4, confirming ring integrity.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-new-3',
    question: 'What is the purpose of measuring continuity of protective conductors?',
    options: [
      'To verify circuit integrity',
      'To ensure a low-resistance path exists for fault current',
      'To measure insulation resistance',
      'To calculate voltage drop'
    ],
    correctAnswer: 1,
    explanation: 'Continuity testing ensures protective conductors provide a low-resistance path for fault current, enabling rapid disconnection of supply.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-4',
    question: 'You are testing a ring final circuit and one leg shows significantly higher resistance. What does this indicate?',
    options: [
      'Normal reading due to cable length variations',
      'Possible loose connection or partial break in ring',
      'Incorrect cable size used',
      'RCD interference'
    ],
    correctAnswer: 1,
    explanation: 'Significantly different resistance in ring circuit legs indicates a loose connection, high-resistance joint, or partial conductor break.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-new-5',
    question: 'What test voltage is typically used for continuity testing?',
    options: [
      '230V AC',
      '500V DC',
      '4-24V DC from test instrument',
      '400V AC'
    ],
    correctAnswer: 2,
    explanation: 'Continuity testing uses low voltage (typically 4-24V DC) and measures resistance, not high voltage like insulation resistance tests.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-6',
    question: 'When testing supplementary bonding, what maximum resistance value is acceptable?',
    options: [
      '0.05Ω',
      '0.5Ω if not incorporating exposed-conductive-parts',
      '1.0Ω',
      '5.0Ω'
    ],
    correctAnswer: 1,
    explanation: 'Supplementary bonding resistance should not exceed 0.05Ω when incorporating exposed-conductive-parts, or calculated value based on RCD rating if not.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '415.2.2'
  },
  {
    id: 'continuity-new-7',
    question: 'Before conducting continuity tests, what must you ensure?',
    options: [
      'All loads are connected',
      'Supply is isolated and proven dead',
      'RCDs are in test mode',
      'All circuits are energised'
    ],
    correctAnswer: 1,
    explanation: 'Safe isolation and proving dead is essential before any testing. Continuity tests are conducted with the installation de-energised.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.1'
  },
  {
    id: 'continuity-new-8',
    question: 'You measure 0.15Ω for R2 on a lighting circuit. If R1 (phase conductor) is also 0.15Ω, what can you deduce?',
    options: [
      'Both conductors are the same CSA',
      'This is incorrect, R2 should be higher',
      'Installation is faulty',
      'Test leads not zeroed'
    ],
    correctAnswer: 0,
    explanation: 'Equal R1 and R2 values indicate both conductors have the same cross-sectional area, which is common in twin and earth cable.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-9',
    question: 'What does a very low or zero reading during ring circuit continuity testing indicate?',
    options: [
      'Perfect installation',
      'Possible cross-connection or short circuit',
      'Correct ring formation',
      'Temperature compensation needed'
    ],
    correctAnswer: 1,
    explanation: 'Unexpectedly low or zero readings may indicate crossed conductors or a short circuit between phase and neutral.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-new-10',
    question: 'When should test leads be nulled (zeroed)?',
    options: [
      'Once per day',
      'Before each test sequence',
      'Only if readings seem incorrect',
      'Never necessary with digital meters'
    ],
    correctAnswer: 1,
    explanation: 'Test leads should be nulled before each test sequence to eliminate lead resistance from measurements, ensuring accuracy.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-11',
    question: 'A 40m circuit has R1=0.30Ω and R2=0.50Ω. What is the combined R1+R2 value?',
    options: [
      '0.20Ω',
      '0.80Ω',
      '0.40Ω',
      '1.50Ω'
    ],
    correctAnswer: 1,
    explanation: 'R1+R2 is the sum of the phase and protective conductor resistances: 0.30Ω + 0.50Ω = 0.80Ω.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-new-12',
    question: 'Why might you use the R2 method instead of R1+R2 method for continuity testing?',
    options: [
      'R2 method is always more accurate',
      'When circuit is inaccessible at far end',
      'When phase conductor cannot be isolated',
      'R2 method is no longer permitted'
    ],
    correctAnswer: 1,
    explanation: 'The R2 method is used when access to the far end is not possible, measuring only the protective conductor resistance.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.1'
  },

  // Insulation Resistance - Additional Questions
  {
    id: 'ir-new-1',
    question: 'You test IR at 500V DC and get 150MΩ. What is the verdict?',
    options: [
      'Fail - below minimum',
      'Pass - above 1MΩ minimum',
      'Retest required',
      'Borderline - needs investigation'
    ],
    correctAnswer: 1,
    explanation: 'For SELV and PELV circuits, minimum IR is 0.5MΩ. For circuits up to 500V, minimum is 1MΩ. 150MΩ is an excellent pass.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-2',
    question: 'What test voltage should be used for a 230V single-phase installation?',
    options: [
      '250V DC',
      '500V DC',
      '1000V DC',
      '230V AC'
    ],
    correctAnswer: 1,
    explanation: 'For installations with nominal voltage up to and including 500V AC, the test voltage should be 500V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-3',
    question: 'Before insulation resistance testing, what must be disconnected?',
    options: [
      'All earthing conductors',
      'Electronic equipment, surge protectors, and devices that could be damaged',
      'All protective devices',
      'Nothing - test with everything connected'
    ],
    correctAnswer: 1,
    explanation: 'Sensitive electronic equipment, surge protection devices, and equipment that could be damaged by test voltage must be disconnected or removed.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-4',
    question: 'You test IR between live conductors and earth, getting 0.8MΩ. What action is required?',
    options: [
      'Pass and issue certificate',
      'Fail - investigate and rectify fault',
      'Acceptable if RCD protected',
      'Retest at higher voltage'
    ],
    correctAnswer: 1,
    explanation: 'The minimum acceptable IR for circuits up to 500V is 1MΩ. A reading of 0.8MΩ is below minimum and requires investigation.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-5',
    question: 'What three insulation resistance tests should be conducted on a single-phase installation?',
    options: [
      'Only phase to earth',
      'Phase to earth, neutral to earth only',
      'Phase to neutral, phase to earth, neutral to earth',
      'Phase to neutral only'
    ],
    correctAnswer: 2,
    explanation: 'Three tests are required: between phase and neutral, phase and earth, and neutral and earth, to verify complete insulation integrity.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-6',
    question: 'An IR test gives fluctuating readings. What is the most likely cause?',
    options: [
      'Faulty test instrument',
      'Moisture or contamination affecting insulation',
      'Incorrect test voltage',
      'Cable too long'
    ],
    correctAnswer: 1,
    explanation: 'Fluctuating IR readings typically indicate moisture, contamination, or deteriorating insulation that cannot maintain stable resistance.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-7',
    question: 'What minimum IR value is required for SELV and PELV circuits?',
    options: [
      '0.25MΩ',
      '0.5MΩ',
      '1.0MΩ',
      '2.0MΩ'
    ],
    correctAnswer: 1,
    explanation: 'SELV (Separated Extra Low Voltage) and PELV circuits require a minimum insulation resistance of 0.5MΩ when tested at 250V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-8',
    question: 'Why should IR tests be conducted with all switches and circuit breakers closed?',
    options: [
      'To test the protective devices',
      'To test complete circuit including switchgear',
      'This is incorrect - switches must be open',
      'To prevent damage to equipment'
    ],
    correctAnswer: 1,
    explanation: 'Testing with switches closed ensures the entire circuit, including switchgear and control equipment, is tested for insulation integrity.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-9',
    question: 'What voltage should be used to test IR on circuits containing equipment rated at 1000V?',
    options: [
      '500V DC',
      '1000V DC',
      '1500V DC',
      '2500V DC'
    ],
    correctAnswer: 1,
    explanation: 'For circuits with nominal voltage above 500V up to 1000V, test voltage should be 1000V DC.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-10',
    question: 'You obtain an IR reading of 300MΩ. How should this be recorded?',
    options: [
      'Exactly as 300MΩ',
      '>299MΩ',
      '>200MΩ',
      '>100MΩ'
    ],
    correctAnswer: 2,
    explanation: 'Very high readings above 200MΩ are typically recorded as >200MΩ as precise values above this threshold are not significant for compliance.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-11',
    question: 'What precaution must be taken after completing IR tests?',
    options: [
      'Test equipment at higher voltage',
      'Discharge capacitance to earth before handling conductors',
      'Immediately re-energise the circuit',
      'Test earth loop impedance'
    ],
    correctAnswer: 1,
    explanation: 'Cables act as capacitors during high-voltage testing. After IR tests, discharge stored energy to earth before handling conductors.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: '612.3.2'
  },
  {
    id: 'ir-new-12',
    question: 'During periodic inspection, you find IR has dropped from 150MΩ to 2MΩ. What does this indicate?',
    options: [
      'Still acceptable - above 1MΩ minimum',
      'Deterioration - investigate and monitor',
      'Normal aging of installation',
      'Test error - retest only'
    ],
    correctAnswer: 1,
    explanation: 'While 2MΩ passes minimum requirements, a significant drop from previous readings indicates deterioration requiring investigation.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },

  // Earth Fault Loop Impedance - Additional Questions
  {
    id: 'efli-new-1',
    question: 'A circuit has Ze=0.35Ω and R1+R2=0.45Ω. What is the Zs value?',
    options: [
      '0.10Ω',
      '0.80Ω',
      '0.45Ω',
      '0.35Ω'
    ],
    correctAnswer: 1,
    explanation: 'Zs = Ze + R1 + R2. Therefore Zs = 0.35Ω + 0.45Ω = 0.80Ω.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '612.9'
  },
  {
    id: 'efli-new-2',
    question: 'You measure Zs as 1.20Ω for a 32A Type B MCB circuit. The maximum permitted Zs is 1.44Ω. Is this acceptable?',
    options: [
      'Pass - below maximum limit',
      'Fail - too close to limit',
      'Pass but investigate',
      'Retest required'
    ],
    correctAnswer: 0,
    explanation: 'At 1.20Ω, the circuit is below the 1.44Ω maximum (80% rule) for a 32A Type B MCB, therefore acceptable.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.9'
  },
  {
    id: 'efli-new-3',
    question: 'Why is the 80% multiplier applied to maximum Zs values from BS 7671?',
    options: [
      'To account for measurement uncertainty',
      'To account for conductor temperature rise under fault conditions',
      'To provide additional safety margin',
      'Required by test instrument manufacturers'
    ],
    correctAnswer: 1,
    explanation: 'The 80% rule accounts for the increase in conductor resistance as temperature rises from ambient (20°C) to fault temperature (~70°C).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.9'
  },
  {
    id: 'efli-new-4',
    question: 'What is the maximum disconnection time for a final circuit not exceeding 32A in a TN system?',
    options: [
      '0.1 seconds',
      '0.4 seconds',
      '5 seconds',
      '1 second'
    ],
    correctAnswer: 1,
    explanation: 'For final circuits up to 32A in TN systems, the maximum disconnection time is 0.4 seconds for automatic disconnection of supply.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.3.2.2'
  },
  {
    id: 'efli-new-5',
    question: 'You test a circuit protected by a 40A Type C MCB and get Zs=1.10Ω. Is this acceptable if maximum Zs (80% rule) is 0.91Ω?',
    options: [
      'Pass - measurement uncertainty applies',
      'Fail - exceeds maximum permitted value',
      'Pass if RCD protected',
      'Retest at different time'
    ],
    correctAnswer: 1,
    explanation: 'The measured value of 1.10Ω exceeds the maximum permitted 0.91Ω (80% rule). This is a fail and requires investigation.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.9'
  },
  {
    id: 'efli-new-6',
    question: 'What is the relationship between Zs and fault current?',
    options: [
      'Higher Zs = higher fault current',
      'Lower Zs = higher fault current',
      'Zs does not affect fault current',
      'Zs only affects normal load current'
    ],
    correctAnswer: 1,
    explanation: 'Fault current If = Uo/Zs. Lower earth fault loop impedance results in higher fault current, enabling faster disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.4'
  },
  {
    id: 'efli-new-7',
    question: 'When should Zs testing be conducted during commissioning?',
    options: [
      'Before any other tests',
      'After continuity and IR testing, with circuit energised',
      'Only during periodic inspection',
      'Before continuity testing'
    ],
    correctAnswer: 1,
    explanation: 'Zs testing requires the circuit to be energised and should be conducted after dead tests (continuity and IR) are completed satisfactorily.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '612.9'
  },
  {
    id: 'efli-new-8',
    question: 'A circuit is protected by a 30mA RCD. What is the maximum Zs permitted?',
    options: [
      '1667Ω',
      '230Ω',
      '50Ω',
      'No specific limit'
    ],
    correctAnswer: 0,
    explanation: 'For RCD protection, Zs × Ia ≤ 50V. With 30mA RCD: Zs ≤ 50V ÷ 0.03A = 1667Ω. However, protective device must still operate within required time.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.5.3'
  },
  {
    id: 'efli-new-9',
    question: 'What is Ze in the context of earth fault loop impedance?',
    options: [
      'Impedance of the installation',
      'External earth fault loop impedance (supply authority)',
      'Circuit protective conductor resistance',
      'Total earth fault loop impedance'
    ],
    correctAnswer: 1,
    explanation: 'Ze is the external earth fault loop impedance, measured at the origin before any installation conductors are connected.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '612.9'
  },
  {
    id: 'efli-new-10',
    question: 'You measure Ze=0.25Ω. Is this typical for a TN-C-S (PME) system?',
    options: [
      'No, too low for TN-C-S',
      'Yes, typical value for TN-C-S',
      'No, indicates TT system',
      'Yes, but only for TN-S'
    ],
    correctAnswer: 1,
    explanation: 'TN-C-S (PME) systems typically have Ze values of 0.35Ω or lower due to the combined neutral-earth conductor.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'efli-new-11',
    question: 'What happens to Zs when conductor temperature increases during a fault?',
    options: [
      'Zs decreases',
      'Zs increases',
      'Zs remains constant',
      'Zs becomes zero'
    ],
    correctAnswer: 1,
    explanation: 'Conductor resistance increases with temperature. During a fault, conductors heat up, causing Zs to increase.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.9'
  },
  {
    id: 'efli-new-12',
    question: 'For a 20A Type B MCB, what is the maximum Zs at ambient temperature (80% rule)?',
    options: [
      '1.80Ω',
      '2.30Ω',
      '2.87Ω',
      '3.59Ω'
    ],
    correctAnswer: 1,
    explanation: 'For a 20A Type B MCB, the maximum Zs at ambient temperature (80% rule) is 2.30Ω.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'Appendix 3'
  },

  // RCD Testing - Additional Questions
  {
    id: 'rcd-new-1',
    question: 'You test a 30mA RCD at ×1 rated current (30mA). What is the maximum permitted disconnection time?',
    options: [
      '40ms',
      '300ms',
      '2 seconds',
      'Should not trip at ×1'
    ],
    correctAnswer: 3,
    explanation: 'At ×1 rated current (IΔn), the RCD should not trip. This confirms it will not nuisance trip under normal leakage conditions.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-2',
    question: 'At what test current must a 30mA RCD trip within 40ms?',
    options: [
      '×1 (30mA)',
      '×5 (150mA)',
      '×10 (300mA)',
      '×0.5 (15mA)'
    ],
    correctAnswer: 1,
    explanation: 'At ×5 rated current, an RCD must disconnect within 40ms to provide additional protection for direct contact.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '411.4.9'
  },
  {
    id: 'rcd-new-3',
    question: 'What is the purpose of testing RCDs at both ×1 and ×5 rated current?',
    options: [
      'To calibrate the device',
      'To verify it will not nuisance trip (×1) and will provide shock protection (×5)',
      'To measure insulation resistance',
      'To test the mechanical function only'
    ],
    correctAnswer: 1,
    explanation: '×1 test ensures no nuisance tripping under normal leakage. ×5 test confirms rapid disconnection for shock protection.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-4',
    question: 'A 30mA RCD trips in 25ms at ×5 current. What is the verdict?',
    options: [
      'Fail - too fast',
      'Pass - within 40ms limit',
      'Retest required',
      'Replace RCD'
    ],
    correctAnswer: 1,
    explanation: 'The RCD must trip within 40ms at ×5 rated current. A trip time of 25ms is well within limits and passes.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: '411.4.9'
  },
  {
    id: 'rcd-new-5',
    question: 'What is the difference between Type AC and Type A RCDs?',
    options: [
      'No difference',
      'Type A detects pulsating DC and AC, Type AC only AC',
      'Type AC is faster',
      'Type A has higher sensitivity'
    ],
    correctAnswer: 1,
    explanation: 'Type A RCDs detect both sinusoidal AC and pulsating DC residual currents. Type AC only detects sinusoidal AC.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '531.3.3'
  },
  {
    id: 'rcd-new-6',
    question: 'You test an RCD and it fails to trip at ×5 current. What action is required?',
    options: [
      'Increase test current',
      'Replace or repair RCD - it is faulty',
      'Test again tomorrow',
      'Acceptable if protected by MCB'
    ],
    correctAnswer: 1,
    explanation: 'Failure to trip at ×5 rated current indicates a faulty RCD that cannot provide shock protection. It must be replaced.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-7',
    question: 'When should the RCD mechanical test button be operated?',
    options: [
      'Never - only electronic testing allowed',
      'After electrical testing to verify mechanical operation',
      'Instead of electrical testing',
      'Only during installation'
    ],
    correctAnswer: 1,
    explanation: 'After electrical testing, operate the mechanical test button to verify the tripping mechanism and reset function work correctly.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-8',
    question: 'What residual current sensitivity is required for additional protection in final circuits up to 32A?',
    options: [
      '10mA',
      '30mA',
      '100mA',
      '300mA'
    ],
    correctAnswer: 1,
    explanation: 'For additional protection in final circuits not exceeding 32A, RCDs must have a rated residual operating current (IΔn) not exceeding 30mA.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: '415.1.1'
  },
  {
    id: 'rcd-new-9',
    question: 'An RCD protecting a socket outlet circuit trips at ×1 rated current. What does this indicate?',
    options: [
      'RCD is too sensitive - investigate for high earth leakage or faulty RCD',
      'Normal operation',
      'Excellent safety margin',
      'Temperature affecting operation'
    ],
    correctAnswer: 0,
    explanation: 'Tripping at ×1 indicates the RCD is too sensitive, there is excessive earth leakage, or the RCD is faulty.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-10',
    question: 'What is the maximum disconnection time for a 100mA RCD at ×5 rated current?',
    options: [
      '40ms',
      '300ms',
      '40ms for Type S',
      'Same as 30mA RCD'
    ],
    correctAnswer: 0,
    explanation: '100mA and 300mA RCDs must also disconnect within 40ms at ×5 rated current when providing additional protection.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '411.4.9'
  },
  {
    id: 'rcd-new-11',
    question: 'Why must test equipment for RCD testing be appropriate for the type of RCD?',
    options: [
      'All test equipment works on all RCDs',
      'Type A and Type B RCDs require appropriate test waveforms',
      'Only affects accuracy',
      'Manufacturer preference'
    ],
    correctAnswer: 1,
    explanation: 'Type A RCDs respond to pulsating DC currents, Type B to smooth DC. Test equipment must generate appropriate waveforms.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.10'
  },
  {
    id: 'rcd-new-12',
    question: 'What is the purpose of a Time Delayed (Type S) RCD?',
    options: [
      'Faster protection',
      'Discrimination with downstream RCDs to prevent unwanted tripping',
      'Lower sensitivity',
      'For outdoor use only'
    ],
    correctAnswer: 1,
    explanation: 'Type S (Selective) RCDs have a time delay to allow downstream RCDs to operate first, providing discrimination.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '531.2.9'
  },

  // Polarity Testing - Additional Questions
  {
    id: 'polarity-new-1',
    question: 'Why is correct polarity critical in lighting circuits?',
    options: [
      'Only affects brightness',
      'Ensures switches are in phase conductor and centre contact of Edison screw lampholders is not live when lamp removed',
      'Not important in modern installations',
      'Only matters for LED lighting'
    ],
    correctAnswer: 1,
    explanation: 'Correct polarity ensures switches disconnect the phase conductor and the centre contact of ES lampholders is not live, preventing shock risk.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-2',
    question: 'During polarity testing, you find a socket outlet wired with phase and neutral reversed. What is the hazard?',
    options: [
      'No hazard - socket will still work',
      'Equipment may be live when switched off if switch is in neutral',
      'Higher electricity bills',
      'RCD will not operate'
    ],
    correctAnswer: 1,
    explanation: 'Reversed polarity means switches may disconnect neutral instead of phase, leaving equipment live when apparently switched off.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-3',
    question: 'What must be verified during polarity testing of single-pole devices?',
    options: [
      'Colour of wires',
      'That single-pole devices are connected in the phase conductor only',
      'Voltage level',
      'Current rating'
    ],
    correctAnswer: 1,
    explanation: 'Single-pole switching devices (switches, MCBs, fuses) must be connected in the phase conductor to ensure the circuit is dead when switched off.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '132.14.1'
  },
  {
    id: 'polarity-new-4',
    question: 'You test polarity at a socket outlet and find phase on the right pin instead of the left. What is the issue?',
    options: [
      'Acceptable variation',
      'Incorrect polarity - phase must be on left (looking at socket)',
      'Temperature dependent',
      'Only critical for 3-phase'
    ],
    correctAnswer: 1,
    explanation: 'BS 1363 sockets must have phase on the right pin (left when viewed from front), neutral left, and earth at top.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-5',
    question: 'When must polarity testing be carried out?',
    options: [
      'Only on new installations',
      'During initial verification and after any circuit alterations',
      'Only if faults are suspected',
      'Every 5 years only'
    ],
    correctAnswer: 1,
    explanation: 'Polarity must be verified during initial commissioning and after any alterations that could affect polarity.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-6',
    question: 'What is the consequence of incorrect polarity in an Edison screw (ES) lampholder?',
    options: [
      'Lamp will not illuminate',
      'Centre contact remains live when lamp removed, creating shock risk',
      'Increased energy consumption',
      'No consequence'
    ],
    correctAnswer: 1,
    explanation: 'Incorrect polarity leaves the centre contact live when the lamp is removed, creating a significant shock risk when changing bulbs.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-7',
    question: 'In a three-phase installation, what must be verified during polarity testing?',
    options: [
      'Only phase rotation',
      'Correct connection of phases and phase rotation',
      'Voltage balance only',
      'Earth conductor continuity'
    ],
    correctAnswer: 1,
    explanation: 'Three-phase polarity testing verifies correct phase sequence (rotation) and that each phase is correctly connected.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-8',
    question: 'How can polarity be verified on a lighting circuit?',
    options: [
      'Visual inspection only',
      'Continuity testing with phase and neutral linked at distribution board',
      'IR testing',
      'Cannot be tested'
    ],
    correctAnswer: 1,
    explanation: 'Polarity is verified by linking phase and neutral at the board and testing continuity to confirm correct connections at accessories.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-9',
    question: 'What must be checked regarding polarity in a consumer unit?',
    options: [
      'Only main switch operation',
      'MCBs and single-pole devices connected in phase conductors, correct busbar arrangement',
      'Colour of wires only',
      'Earth bar connections'
    ],
    correctAnswer: 1,
    explanation: 'Verify all protective devices are in phase conductors, busbar phases are correct, and neutral connections are properly separated from earth.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-10',
    question: 'Why is it dangerous to have a switch in the neutral conductor?',
    options: [
      'Increases electricity costs',
      'Equipment remains live when switched off',
      'Causes voltage drop',
      'Affects power factor'
    ],
    correctAnswer: 1,
    explanation: 'A switch in the neutral leaves the phase conductor and equipment live when "switched off", creating a shock hazard.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '132.14.1'
  },
  {
    id: 'polarity-new-11',
    question: 'During polarity testing of a ring final circuit, what confirms correct polarity?',
    options: [
      'Equal resistance readings',
      'Continuity confirmed at all socket outlets with phase and neutral correctly identified',
      'RCD operation',
      'IR test results'
    ],
    correctAnswer: 1,
    explanation: 'Polarity testing confirms phase and neutral are correctly identified and connected at every socket outlet around the ring.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-new-12',
    question: 'What test method confirms polarity without de-energising the circuit?',
    options: [
      'IR testing',
      'Voltage indicator or proving unit to verify phase conductor',
      'Continuity testing',
      'Cannot test live'
    ],
    correctAnswer: 1,
    explanation: 'A voltage indicator can verify which conductor is the phase on an energised circuit, though dead testing is preferred for initial verification.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },

  // Prospective Fault Current (PFC) - Additional Questions
  {
    id: 'pfc-new-1',
    question: 'What is prospective fault current (PFC)?',
    options: [
      'Normal operating current',
      'Maximum current that would flow during a short circuit fault',
      'Earth leakage current',
      'Voltage drop under load'
    ],
    correctAnswer: 1,
    explanation: 'PFC is the maximum current that would flow in the event of a negligible impedance fault (short circuit) between phase and neutral or phase and earth.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-2',
    question: 'You measure prospective short circuit current (PSCC) as 4.5kA. The protective device has a breaking capacity of 6kA. Is this acceptable?',
    options: [
      'Yes - breaking capacity exceeds PFC',
      'No - insufficient margin',
      'Yes but needs upgrading',
      'No - use higher rated cable'
    ],
    correctAnswer: 0,
    explanation: 'The protective device breaking capacity (6kA) must exceed the prospective fault current (4.5kA), so this is acceptable.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-new-3',
    question: 'Why must PFC be measured at the origin of an installation?',
    options: [
      'To verify supply authority connection',
      'To ensure protective devices have adequate breaking capacity',
      'To calculate voltage drop',
      'For earth electrode testing'
    ],
    correctAnswer: 1,
    explanation: 'PFC measurement verifies that protective devices can safely interrupt the maximum possible fault current without damage.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-new-4',
    question: 'What is the relationship between Ze and prospective earth fault current (PEFC)?',
    options: [
      'PEFC = Uo × Ze',
      'PEFC = Uo ÷ Ze',
      'PEFC = Ze ÷ Uo',
      'No relationship'
    ],
    correctAnswer: 1,
    explanation: 'Prospective earth fault current is calculated as PEFC = Uo ÷ Ze, where Uo is nominal voltage to earth (230V).',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-5',
    question: 'A consumer unit has MCBs rated at 6kA breaking capacity. The measured PSCC is 7kA. What action is required?',
    options: [
      'Acceptable as close to rating',
      'Replace with higher rated devices (e.g., 10kA)',
      'Increase cable sizes',
      'Install RCD protection'
    ],
    correctAnswer: 1,
    explanation: 'Protective devices with insufficient breaking capacity are extremely dangerous and must be replaced with adequately rated devices.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-new-6',
    question: 'When should PFC testing be carried out?',
    options: [
      'Only on new installations',
      'During initial verification and periodic inspection',
      'Only if faults occur',
      'Every 10 years'
    ],
    correctAnswer: 1,
    explanation: 'PFC must be verified during initial commissioning and subsequent periodic inspections to ensure continued adequacy of protective devices.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-7',
    question: 'What does the "kA" rating on an MCB represent?',
    options: [
      'Rated current',
      'Maximum breaking capacity (short circuit current)',
      'Trip sensitivity',
      'Normal operating current'
    ],
    correctAnswer: 1,
    explanation: 'The kA rating indicates the maximum short circuit current the MCB can safely interrupt without damage.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-new-8',
    question: 'How is prospective short circuit current (PSCC) between phase and neutral calculated?',
    options: [
      'PSCC = Uo ÷ Ze',
      'PSCC = U0 ÷ (Z1 + Z2)',
      'PSCC = 230 ÷ Zs',
      'PSCC = U ÷ R1'
    ],
    correctAnswer: 1,
    explanation: 'PSCC is calculated using the voltage between conductors (usually 230V) divided by the impedance of phase and neutral conductors (Z1+Z2).',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-9',
    question: 'You measure PSCC as 2.3kA at a distribution board. If you measure further down a circuit, what would you expect?',
    options: [
      'Higher PFC due to cable resistance',
      'Lower PFC due to additional circuit impedance',
      'Same value',
      'Cannot predict'
    ],
    correctAnswer: 1,
    explanation: 'PFC decreases further from the source as circuit impedance increases, reducing the available fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-10',
    question: 'What is typically the highest PFC location in an installation?',
    options: [
      'At the furthest socket outlet',
      'At the origin (main consumer unit)',
      'At light fittings',
      'Equal throughout'
    ],
    correctAnswer: 1,
    explanation: 'PFC is highest at the origin where impedance is lowest, and decreases further along circuits as impedance increases.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-new-11',
    question: 'BS 88 fuses typically have what breaking capacity?',
    options: [
      '6kA',
      '10kA',
      '80kA',
      '1kA'
    ],
    correctAnswer: 2,
    explanation: 'BS 88 fuses have very high breaking capacity, typically 80kA, making them suitable for installations with high prospective fault currents.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-new-12',
    question: 'What could cause PFC to increase over time at an installation?',
    options: [
      'Cable deterioration',
      'Supply authority network improvements reducing source impedance',
      'Addition of more circuits',
      'PFC always decreases over time'
    ],
    correctAnswer: 1,
    explanation: 'Improvements to the supply network (upgraded transformers, larger cables) reduce source impedance, potentially increasing PFC.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },

  // Functional Testing - Additional Questions
  {
    id: 'functional-new-1',
    question: 'What is the purpose of functional testing?',
    options: [
      'To measure electrical values',
      'To verify correct operation of switchgear, controls, and interlocks',
      'To test cable continuity',
      'To measure power consumption'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies that switchgear, control equipment, interlocks, and protective devices operate correctly under normal conditions.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-2',
    question: 'During functional testing of a two-way lighting circuit, what should be verified?',
    options: [
      'Voltage level only',
      'Lights can be controlled from both switch positions correctly',
      'Cable size',
      'IR values'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing must verify that two-way (and intermediate) switches correctly control lighting from all positions.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-3',
    question: 'You test an emergency stop button. What must be verified?',
    options: [
      'Button colour only',
      'Button latches when pressed, immediately cuts power, requires manual reset',
      'Button makes noise',
      'Voltage at terminals'
    ],
    correctAnswer: 1,
    explanation: 'Emergency stop devices must latch when operated, immediately interrupt power, and require manual reset before restart is possible.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-4',
    question: 'When testing RCD mechanical test buttons during functional testing, what should happen?',
    options: [
      'Nothing happens',
      'RCD should trip and require manual reset',
      'LED indicator lights up',
      'Alarm sounds'
    ],
    correctAnswer: 1,
    explanation: 'Operating the RCD test button should cause the RCD to trip immediately and require manual reset to restore supply.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-5',
    question: 'During functional testing of a contactor, what must be verified?',
    options: [
      'Coil resistance value',
      'Clean contact operation, correct control voltage, smooth engagement/disengagement',
      'Current consumption only',
      'Physical size'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies contactors operate smoothly at correct voltage, engage and disengage cleanly without arcing or sticking.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-6',
    question: 'What should be checked during functional testing of a time delay relay?',
    options: [
      'Operates at correct time delay and returns to normal state',
      'Physical appearance only',
      'Mounting position',
      'Cannot be tested'
    ],
    correctAnswer: 0,
    explanation: 'Time delay relays must operate at the correct delay setting and return to their normal state when power is removed.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-7',
    question: 'During functional testing of a motor starter with overload protection, what must operate correctly?',
    options: [
      'Start/stop controls, overload trip, and reset functions',
      'Motor speed only',
      'Colour of buttons',
      'Noise level'
    ],
    correctAnswer: 0,
    explanation: 'Verify start and stop controls work correctly, overload protection trips at the correct setting, and reset functions properly.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-8',
    question: 'You test a bathroom pull-cord light switch. What must be verified functionally?',
    options: [
      'Cord material only',
      'Switch operates correctly, cord is secure, appropriate IP rating',
      'Cord length only',
      'Colour of cord'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies the switch operates correctly from the cord, cord is securely attached, and IP rating is appropriate for the zone.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-9',
    question: 'What should be tested during functional testing of interlocked socket outlets?',
    options: [
      'Voltage level',
      'Interlock prevents access to live parts, correct operation sequence',
      'Socket colour',
      'Current rating'
    ],
    correctAnswer: 1,
    explanation: 'Interlocks must prevent access to live parts in the correct sequence and operate smoothly without mechanical faults.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-10',
    question: 'During functional testing of a PIR (motion sensor) lighting control, what should be verified?',
    options: [
      'Sensor detects motion correctly and operates light, time and sensitivity settings work',
      'Sensor appearance only',
      'Installation height',
      'Cable connections only'
    ],
    correctAnswer: 0,
    explanation: 'Functional testing verifies the PIR detects motion in the intended coverage area, operates the lighting, and adjustable settings function correctly.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-new-11',
    question: 'What must be verified during functional testing of a dimmer switch?',
    options: [
      'Full range of dimming operates smoothly without flickering or buzzing',
      'Switch colour',
      'Cable size',
      'IR values'
    ],
    correctAnswer: 0,
    explanation: 'Dimmer switches must provide smooth dimming across the full range without excessive noise, flickering, or overheating.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-12',
    question: 'During functional testing of a shower isolation pull switch, what must be confirmed?',
    options: [
      'Switch operates correctly, clearly indicates on/off position, accessible',
      'Switch is red colour',
      'Cord is exactly 1m long',
      'Neon indicator brightness'
    ],
    correctAnswer: 0,
    explanation: 'Isolation switches must operate correctly, clearly indicate on/off position, and be accessible within the correct zone.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-new-13',
    question: 'What should be tested on AFDDs (Arc Fault Detection Devices) during functional testing?',
    options: [
      'Only test button operation',
      'Test button operates device and causes trip, manual reset required',
      'Cannot be tested',
      'Visual inspection only'
    ],
    correctAnswer: 1,
    explanation: 'AFDD functional testing includes operating the test button to verify the device trips and requires manual reset.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },

  // =============== QUESTION BANK EXPANSION TO 50 PER CATEGORY ===============

  // Continuity Testing - Additional Questions (19 needed)
  {
    id: 'cont-exp-1',
    question: 'When testing ring circuit continuity, all readings at socket outlets should be within what percentage of each other?',
    options: [
      '±5%',
      '±10%',
      '±20%',
      '±50%'
    ],
    correctAnswer: 0,
    explanation: 'Socket outlet readings should be within ±0.05Ω of each other, indicating a properly connected ring with no breaks or interconnections.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-2',
    question: 'What is the purpose of measuring end-to-end resistance before the cross-connection test?',
    options: [
      'To calculate cable length',
      'To verify individual conductor continuity and identify any breaks',
      'To test insulation',
      'To measure earth resistance'
    ],
    correctAnswer: 1,
    explanation: 'End-to-end testing verifies each conductor is continuous before performing cross-connection tests to detect ring configuration.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-3',
    question: 'A radial lighting circuit is 35m long using 1.5mm² twin and CPC. What would be typical R1+R2?',
    options: [
      '0.1Ω to 0.2Ω',
      '0.5Ω to 1.0Ω',
      '1.5Ω to 2.5Ω',
      '3.0Ω to 4.0Ω'
    ],
    correctAnswer: 1,
    explanation: 'For 1.5mm² with 1.0mm² CPC over 35m, expect R1+R2 approximately 0.7Ω to 0.9Ω depending on temperature and exact cable specification.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-4',
    question: 'Why must continuity tests be performed before energising a new installation?',
    options: [
      'To comply with regulations only',
      'To verify protective conductor integrity before live testing',
      'To measure cable resistance',
      'To test RCD operation'
    ],
    correctAnswer: 1,
    explanation: 'Continuity testing confirms protective conductors are continuous and correctly connected before applying voltage, ensuring safety.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2'
  },
  {
    id: 'cont-exp-5',
    question: 'When performing R1+R2 test on a radial circuit, where should the link be made?',
    options: [
      'At any socket outlet',
      'At the distribution board between phase and CPC',
      'At the midpoint of the circuit',
      'At the furthest point of the circuit'
    ],
    correctAnswer: 1,
    explanation: 'Phase and CPC are linked at the distribution board, then tested at the furthest point to measure total circuit resistance.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-6',
    question: 'A ring circuit test shows end-to-end resistances of 0.6Ω, 0.6Ω, and 0.6Ω for L, N, and CPC. What can be concluded?',
    options: [
      'Ring is broken',
      'Normal readings indicating equal conductor lengths',
      'Interconnection between rings',
      'Test equipment fault'
    ],
    correctAnswer: 1,
    explanation: 'Equal end-to-end resistances indicate all three conductors are the same length and continuous, as expected in a properly installed ring.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-7',
    question: 'What is the maximum acceptable resistance for main protective bonding conductors?',
    options: [
      '0.05Ω',
      '0.1Ω',
      '0.5Ω',
      '1.0Ω'
    ],
    correctAnswer: 0,
    explanation: 'Main protective bonding conductors should have resistance not exceeding 0.05Ω to ensure effective equipotential bonding.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-8',
    question: 'During ring circuit testing, one leg shows much higher resistance than the other. What does this indicate?',
    options: [
      'Normal due to cable routing differences',
      'Possible high-resistance joint or partial break in that leg',
      'Acceptable variation',
      'Test lead error'
    ],
    correctAnswer: 1,
    explanation: 'Significantly different leg resistances indicate a fault such as a poor connection or partially damaged conductor in the higher-resistance leg.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-9',
    question: 'Why is it important to use the same type of cable throughout a ring circuit?',
    options: [
      'For aesthetic reasons only',
      'To ensure consistent conductor resistance and prevent imbalance',
      'Not important - any cable can be used',
      'To comply with colour coding'
    ],
    correctAnswer: 1,
    explanation: 'Using the same cable type ensures both legs have similar resistance, properly sharing the load and preventing overload of one leg.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-10',
    question: 'What connection method is used for the R1+R2 test at socket outlets?',
    options: [
      'Phase to earth',
      'Phase to neutral',
      'Neutral to earth',
      'All three conductors together'
    ],
    correctAnswer: 0,
    explanation: 'R1+R2 test measures resistance between phase (R1) and protective conductor (R2) at each point to verify earthing effectiveness.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-11',
    question: 'You test a socket ring and find R1+R2 values decreasing towards the midpoint then increasing. What does this confirm?',
    options: [
      'Ring is broken',
      'Ring is correctly wired with no breaks',
      'Interconnection present',
      'Incorrect cable size used'
    ],
    correctAnswer: 1,
    explanation: 'R1+R2 values lowest at the midpoint (approximately 1/4 of origin value) and increasing towards the ends confirms a properly connected ring.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-12',
    question: 'What is the significance of nulling test leads before continuity testing?',
    options: [
      'It calibrates the meter',
      'It removes test lead resistance from subsequent measurements',
      'It tests battery condition',
      'It is not necessary'
    ],
    correctAnswer: 1,
    explanation: 'Nulling (zeroing) test leads compensates for their resistance, ensuring accurate measurements of actual circuit resistance.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'cont-exp-13',
    question: 'When testing supplementary bonding, what is the maximum acceptable resistance?',
    options: [
      '0.01Ω',
      '0.05Ω',
      '0.1Ω',
      '0.5Ω'
    ],
    correctAnswer: 1,
    explanation: 'Supplementary bonding connections should not exceed 0.05Ω to ensure effective equipotential zone in special locations.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '415.2'
  },
  {
    id: 'cont-exp-14',
    question: 'A newly installed ring shows correct end-to-end values, but all socket R1+R2 readings are identical. What is the likely fault?',
    options: [
      'Perfect installation',
      'Ring interconnected or spur wired as ring extension',
      'Cable size incorrect',
      'Test equipment malfunction'
    ],
    correctAnswer: 1,
    explanation: 'Identical R1+R2 readings at all points suggest incorrect wiring, possibly a spur connected as a ring continuation rather than a true ring.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'cont-exp-15',
    question: 'What formula is used to calculate expected R1+R2 value for a radial circuit?',
    options: [
      'R1+R2 = (mV/A + mΩ/m) × L',
      'R1+R2 = (R1 × R2) ÷ (R1 + R2)',
      'R1+R2 = (mΩ/m for R1 + mΩ/m for R2) × L ÷ 1000',
      'R1+R2 = Total length ÷ conductor CSA'
    ],
    correctAnswer: 2,
    explanation: 'R1+R2 = (resistance per meter of phase conductor + resistance per meter of CPC) × circuit length in meters ÷ 1000.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-16',
    question: 'Why might continuity readings vary slightly between tests on the same circuit?',
    options: [
      'Test equipment is faulty',
      'Temperature changes affecting conductor resistance',
      'Circuit has developed a fault',
      'Voltage fluctuation'
    ],
    correctAnswer: 1,
    explanation: 'Conductor resistance varies with temperature. Small variations between tests are normal due to ambient or conductor temperature changes.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'cont-exp-17',
    question: 'What is the recommended test current range for low-resistance ohmmeters used in continuity testing?',
    options: [
      '0.1mA to 1mA',
      '4mA to 24mA',
      '200mA minimum',
      '1A to 10A'
    ],
    correctAnswer: 1,
    explanation: 'GS38 and BS 7671 require continuity testing using current between 4mA and 24mA to avoid damage to electronic components.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612.2'
  },
  {
    id: 'cont-exp-18',
    question: 'During protective conductor continuity testing, what indicates a satisfactory result?',
    options: [
      'Infinite resistance',
      'Low resistance reading (typically < 0.5Ω for most circuits)',
      'Reading above 1.0Ω',
      'Zero resistance'
    ],
    correctAnswer: 1,
    explanation: 'Protective conductors should show low but measurable resistance, typically well below 0.5Ω, confirming continuity without short circuits.',
    category: 'Continuity Testing',
    difficulty: 'Beginner',
    regulation: '612.2.1'
  },
  {
    id: 'cont-exp-19',
    question: 'A ring circuit shows end-to-end phase resistance of 0.8Ω but CPC resistance of 1.2Ω. What does this indicate?',
    options: [
      'Acceptable - CPC is smaller CSA than phase',
      'Ring fault - all conductors should be identical',
      'Depends on cable type used',
      'Test error - retest required'
    ],
    correctAnswer: 0,
    explanation: 'CPC in twin and earth cable is typically smaller CSA than phase conductor, so higher CPC resistance is normal and acceptable.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },

  // Insulation Resistance - Additional Questions (27 needed)
  {
    id: 'ir-exp-1',
    question: 'Why must lamps be removed or switches closed during insulation resistance testing?',
    options: [
      'To save energy',
      'To test the complete circuit wiring including switched conductors',
      'To prevent lamp damage',
      'Not necessary - lamps can remain'
    ],
    correctAnswer: 1,
    explanation: 'Closing switches or removing lamps ensures all wiring, including switched conductors, is included in the insulation test.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-2',
    question: 'What action is required if insulation resistance falls to 0.5MΩ during a periodic inspection?',
    options: [
      'Pass - above SELV minimum',
      'Investigate fault immediately - circuit unsafe',
      'Add RCD protection',
      'Acceptable for older installations'
    ],
    correctAnswer: 1,
    explanation: 'For 230V circuits, minimum is 1MΩ. A reading of 0.5MΩ indicates serious insulation deterioration requiring immediate investigation.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-3',
    question: 'When testing IR on a three-phase distribution board, how many tests are typically required?',
    options: [
      '3 tests',
      '6 tests',
      '9 tests',
      '12 tests'
    ],
    correctAnswer: 1,
    explanation: 'Six tests: L1-L2, L1-L3, L2-L3, L1-E, L2-E, L3-E to fully verify insulation between all conductors and earth.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-4',
    question: 'An IR test on a heating circuit gives 2MΩ when cold but drops to 0.8MΩ when warm. What does this indicate?',
    options: [
      'Normal behaviour',
      'Element insulation breakdown under heat - investigate and replace',
      'Test equipment error',
      'Acceptable for heating circuits'
    ],
    correctAnswer: 1,
    explanation: 'Insulation resistance should not significantly decrease with heat. Falling below 1MΩ when warm indicates deteriorating insulation.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-5',
    question: 'What is the purpose of testing between neutral and earth during IR testing?',
    options: [
      'Not required by BS 7671',
      'To verify neutral is not connected to earth in the circuit',
      'To test neutral conductor insulation',
      'Only required for TT systems'
    ],
    correctAnswer: 2,
    explanation: 'Testing neutral-earth verifies neutral conductor insulation integrity and detects any insulation faults on the neutral.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-6',
    question: 'PIR testing shows all circuits above 50MΩ except one at 1.5MΩ. What action is appropriate?',
    options: [
      'Pass all circuits - all above minimum',
      'Investigate the 1.5MΩ circuit for potential deterioration',
      'Fail entire installation',
      'No action required'
    ],
    correctAnswer: 1,
    explanation: 'While 1.5MΩ passes minimum requirements, it is significantly lower than other circuits and warrants investigation for early fault detection.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-7',
    question: 'What voltage should be used for IR testing on 110V reduced voltage site equipment?',
    options: [
      '250V DC',
      '500V DC',
      '1000V DC',
      '110V DC'
    ],
    correctAnswer: 1,
    explanation: '110V equipment falls under the up to 500V category, requiring 500V DC test voltage per BS 7671:2018+A2:2022.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-8',
    question: 'Why is 500V DC used for IR testing rather than 230V AC?',
    options: [
      'DC is safer',
      'DC applies higher stress to insulation, revealing weaknesses',
      'AC cannot be measured accurately',
      'BS 7671 preference only'
    ],
    correctAnswer: 1,
    explanation: 'DC test voltage higher than nominal voltage stresses insulation to reveal deterioration that might not appear under normal operating voltage.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-9',
    question: 'An outdoor lighting circuit shows IR of 0.9MΩ in wet weather but 25MΩ when dry. What is the problem?',
    options: [
      'Acceptable variation',
      'Moisture ingress through damaged seals or cable entries',
      'Normal for outdoor circuits',
      'Test equipment fault'
    ],
    correctAnswer: 1,
    explanation: 'Significant IR reduction in wet conditions indicates water ingress through compromised cable glands, damaged fittings, or inadequate IP rating.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-10',
    question: 'When can circuits be tested collectively for IR rather than individually?',
    options: [
      'Never - must always test individually',
      'During initial verification if no electronic equipment present',
      'Only on domestic installations',
      'Any time to save time'
    ],
    correctAnswer: 1,
    explanation: 'Collective testing is permitted during initial verification when no sensitive equipment is connected. Individual testing helps locate faults.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-11',
    question: 'What minimum IR is required for circuits exceeding 1000V nominal voltage?',
    options: [
      '0.5MΩ',
      '1.0MΩ',
      '5.0MΩ',
      '10MΩ'
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 Table 61 specifies minimum 1.0MΩ for all circuits above 500V, though higher values are typically expected for HV.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-12',
    question: 'Why should pilot lamps and indicator lights be disconnected before IR testing?',
    options: [
      'They consume power',
      'They provide leakage paths giving false low readings',
      'They might blow',
      'Not necessary to disconnect'
    ],
    correctAnswer: 1,
    explanation: 'Pilot lamps and indicators contain neon lamps or LEDs with resistors that provide current paths, artificially lowering IR readings.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-13',
    question: 'What is the effect of long cable lengths on insulation resistance readings?',
    options: [
      'No effect',
      'Longer cables show lower IR due to increased surface area',
      'Longer cables show higher IR',
      'Only affects continuity, not IR'
    ],
    correctAnswer: 1,
    explanation: 'Longer cables have more insulation surface area, providing more potential leakage paths, typically resulting in slightly lower IR readings.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-14',
    question: 'A socket circuit shows 0.7MΩ phase-earth. You disconnect a computer and retest getting 150MΩ. What does this confirm?',
    options: [
      'Computer is faulty',
      'Computer filter capacitors were providing leakage path',
      'Initial test was incorrect',
      'Socket circuit has a fault'
    ],
    correctAnswer: 1,
    explanation: 'Computers contain EMI filter capacitors connected between phase/neutral and earth, providing legitimate leakage paths during IR testing.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.1'
  },
  {
    id: 'ir-exp-15',
    question: 'What is the minimum IR for a 24V DC SELV circuit tested at 250V DC?',
    options: [
      '0.25MΩ',
      '0.5MΩ',
      '1.0MΩ',
      '2.0MΩ'
    ],
    correctAnswer: 1,
    explanation: 'SELV circuits require minimum 0.5MΩ when tested at 250V DC according to BS 7671:2018+A2:2022 Table 61.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-16',
    question: 'How long should the test button be held when proving an IR tester before use?',
    options: [
      'Momentary press',
      'Until reading stabilises, typically 5-10 seconds',
      '30 seconds minimum',
      'Not necessary to hold'
    ],
    correctAnswer: 1,
    explanation: 'Proving the tester on a known source requires holding until reading stabilises to verify the tester is functioning correctly.',
    category: 'Insulation Resistance',
    difficulty: 'Beginner',
    regulation: '612.1'
  },
  {
    id: 'ir-exp-17',
    question: 'An installation has multiple identical circuits. One shows IR of 80MΩ while others show >200MΩ. Is further investigation needed?',
    options: [
      'No - all pass minimum requirements',
      'Yes - investigate why one circuit differs from others',
      'Only if it drops below 10MΩ',
      'Retest only'
    ],
    correctAnswer: 1,
    explanation: 'Significant variation between identical circuits suggests potential early deterioration or differences in installation quality requiring investigation.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-18',
    question: 'What safety precaution must be observed after completing IR tests on long cable runs?',
    options: [
      'Immediately re-energise',
      'Discharge cable capacitance to earth before touching',
      'Test again at lower voltage',
      'No special precautions needed'
    ],
    correctAnswer: 1,
    explanation: 'Long cables store charge during high-voltage IR testing. Always discharge to earth before handling to prevent electric shock.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-19',
    question: 'During IR testing, the reading climbs slowly from 0.5MΩ to 1.2MΩ over 60 seconds. What does this indicate?',
    options: [
      'Test equipment fault',
      'Capacitive charging effect - normal for long circuits',
      'Circuit failure',
      'Incorrect test voltage'
    ],
    correctAnswer: 1,
    explanation: 'Slowly rising readings indicate capacitive charging of long cable runs. Always wait for reading to stabilise before recording.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-20',
    question: 'What is the recommended minimum IR for new installations, even though 1MΩ is the regulatory minimum?',
    options: [
      '2MΩ',
      '10MΩ',
      '50MΩ',
      '100MΩ'
    ],
    correctAnswer: 2,
    explanation: 'New installations should typically achieve >50MΩ. Readings just above 1MΩ suggest potential workmanship issues even if compliant.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-21',
    question: 'An IR test between phase and neutral reads 0.2MΩ. What is the most likely cause?',
    options: [
      'Acceptable for phase-neutral test',
      'Neon indicator or equipment left connected across phase-neutral',
      'Cable too long',
      'Test equipment malfunction'
    ],
    correctAnswer: 1,
    explanation: 'Very low phase-neutral IR typically indicates equipment or indicators left connected, as cable insulation alone should give much higher values.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-22',
    question: 'What temperature correction factor should be applied to IR test results?',
    options: [
      'Correct all results to 20°C',
      'No temperature correction for IR - record at ambient',
      'Correct to operating temperature',
      'Only correct if below 0°C'
    ],
    correctAnswer: 1,
    explanation: 'Unlike earth fault loop impedance, insulation resistance is recorded at ambient temperature without correction factors applied.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-23',
    question: 'Why might an IR reading appear to fall after the test voltage is first applied?',
    options: [
      'Insulation is failing',
      'Dielectric absorption effect - normal initially',
      'Test equipment fault',
      'Voltage drop'
    ],
    correctAnswer: 1,
    explanation: 'Initial IR readings may fall due to dielectric absorption as insulation polarises. Readings should stabilise after 15-60 seconds.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-24',
    question: 'Can RCDs remain connected during IR testing?',
    options: [
      'Yes - they must remain in circuit',
      'No - RCDs must be short-circuited or removed to prevent damage',
      'Only on TT systems',
      'Only Type AC RCDs'
    ],
    correctAnswer: 1,
    explanation: 'RCDs must be short-circuited or bypassed during IR testing as the test voltage can damage the RCD electronics and cause false low readings.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-25',
    question: 'A circuit IR test shows >200MΩ phase-earth but only 5MΩ neutral-earth. What is indicated?',
    options: [
      'Pass - both above minimum',
      'Neutral insulation fault or neutral-earth connection downstream',
      'Normal variation',
      'Test error'
    ],
    correctAnswer: 1,
    explanation: 'Low neutral-earth reading suggests insulation fault on neutral or an inadvertent neutral-earth connection in the circuit.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-26',
    question: 'What is the minimum IR required for fire alarm cables tested at 500V DC?',
    options: [
      '0.5MΩ',
      '1.0MΩ',
      '5.0MΩ',
      '50MΩ'
    ],
    correctAnswer: 0,
    explanation: 'Fire alarm systems often use SELV or separated circuits. BS 5839 specifies minimum 0.5MΩ for alarm system circuits.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-exp-27',
    question: 'When testing a new installation, you get IR readings of 1.2MΩ. What action should be taken?',
    options: [
      'Pass and certify - above minimum',
      'Investigate cause of low readings before certification',
      'Fail installation',
      'Add RCD protection'
    ],
    correctAnswer: 1,
    explanation: 'New installations should achieve >50MΩ. Readings barely above minimum suggest workmanship issues, moisture, or equipment left connected.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },

  // RCD Testing - Additional Questions (14 needed)
  {
    id: 'rcd-exp-1',
    question: 'A 30mA RCD trips at 27mA during ramp testing. Is this acceptable?',
    options: [
      'Fail - below minimum 30mA',
      'Pass - within 50% to 100% of rated current',
      'Borderline - retest required',
      'Fail - must trip at exactly 30mA'
    ],
    correctAnswer: 1,
    explanation: 'RCDs must trip between 50% (15mA) and 100% (30mA) of rated current. 27mA is within acceptable limits.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-2',
    question: 'What is the maximum disconnection time for a 30mA RCD at × 1 rated current?',
    options: [
      '40ms',
      '300ms',
      '500ms',
      '1000ms'
    ],
    correctAnswer: 1,
    explanation: 'At ×1 rated current (30mA), standard RCDs should disconnect within 300ms. At ×5 (150mA), limit is 40ms.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-3',
    question: 'What angle (0° or 180°) should be tested when verifying RCD operation?',
    options: [
      'Only 0°',
      'Only 180°',
      'Both 0° and 180°',
      'Angle is not relevant'
    ],
    correctAnswer: 2,
    explanation: 'RCDs must be tested at both 0° and 180° phase angles as tripping time can vary depending on the waveform position.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-4',
    question: 'An S-type (time-delayed) RCD shows 130ms disconnection time at ×1. Is this acceptable?',
    options: [
      'Fail - too slow',
      'Pass - S-type designed for selective coordination',
      'Borderline',
      'Test error'
    ],
    correctAnswer: 1,
    explanation: 'S-type (selective/time-delayed) RCDs have intentional delay for discrimination. 130-500ms at ×1 is typical and acceptable.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-5',
    question: 'Why should RCD testing be performed with no load connected?',
    options: [
      'To save energy',
      'Load current affects RCD trip time and may damage equipment',
      'Load prevents RCD operation',
      'Not necessary - can test under load'
    ],
    correctAnswer: 1,
    explanation: 'Load current adds to test current, affecting trip time. Unexpected disconnection under test could damage equipment or cause data loss.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'rcd-exp-6',
    question: 'A Type A RCD is installed protecting an EV charging point. The test button operates correctly. Is any further testing required?',
    options: [
      'No - test button confirms function',
      'Yes - must perform half-cycle and full electrical testing',
      'Only during initial verification',
      'Only if it fails to trip'
    ],
    correctAnswer: 1,
    explanation: 'Test button only confirms basic mechanical function. Full electrical testing at ×1/2, ×1, and ×5 with trip time measurement is required.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'rcd-exp-7',
    question: 'What is the purpose of the ×1/2 rated current (15mA for 30mA RCD) test?',
    options: [
      'To verify RCD trips at low current',
      'To verify RCD does NOT trip at this current',
      'To measure trip time',
      'Not a required test'
    ],
    correctAnswer: 1,
    explanation: 'The ×1/2 test confirms the RCD does NOT trip below its rated sensitivity, avoiding nuisance tripping while ensuring proper margin.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-8',
    question: 'A 100mA RCD protecting a fire alarm circuit takes 250ms to trip at ×1. Is this compliant?',
    options: [
      'Pass - within 300ms limit',
      'Fail - too slow for fire protection',
      'Depends on type of RCD',
      'Borderline - retest'
    ],
    correctAnswer: 0,
    explanation: 'For general purpose RCDs, 300ms at ×1 rated current is the maximum. 250ms is acceptable for this 100mA device.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-9',
    question: 'What does it indicate if an RCD fails to trip during ×5 testing but operates correctly at ×1?',
    options: [
      'Normal operation',
      'RCD malfunction - investigate and replace',
      'Test equipment fault',
      'Acceptable variation'
    ],
    correctAnswer: 1,
    explanation: 'RCD should trip faster at higher currents. Failure at ×5 but operation at ×1 indicates a fault in the RCD mechanism.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-10',
    question: 'Can multiple RCDs in series both be tested using the same test procedure?',
    options: [
      'Yes - test both simultaneously',
      'Yes - but test downstream RCD first, then upstream',
      'No - can only test one at a time',
      'Not permitted to have RCDs in series'
    ],
    correctAnswer: 1,
    explanation: 'Test downstream (load side) RCDs first to verify they trip before upstream devices, confirming proper discrimination.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'rcd-exp-11',
    question: 'A Type AC RCD is protecting a heat pump. Is this compliant with BS 7671:2018+A2:2022?',
    options: [
      'Yes - Type AC suitable for all applications',
      'No - Type A or Type F required for electronic loads',
      'Yes if under 30mA',
      'Depends on heat pump manufacturer'
    ],
    correctAnswer: 1,
    explanation: 'Electronic equipment like heat pumps can produce DC residual current. Type A minimum (or Type F/B) is required for such loads.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '531.3.3'
  },
  {
    id: 'rcd-exp-12',
    question: 'During periodic inspection, an RCD that previously tripped at 25ms now trips at 35ms at ×5. What action is required?',
    options: [
      'Pass - still within 40ms limit',
      'Monitor and note deterioration - consider replacement',
      'Fail and replace immediately',
      'No action - normal aging'
    ],
    correctAnswer: 1,
    explanation: 'While still compliant, increasing trip time indicates mechanical wear. Note the trend and consider replacement to prevent future failure.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.13.2'
  },
  {
    id: 'rcd-exp-13',
    question: 'What minimum number of RCD tests are required during periodic inspection?',
    options: [
      'Test button only',
      '×1/2 and test button',
      '×1 and ×5 with trip times, plus test button',
      'All tests including ×1/2, ×1, ×5, and test button'
    ],
    correctAnswer: 2,
    explanation: 'Periodic inspection requires ×1 and ×5 tests with trip time measurement, plus operation of test button. ×1/2 optional but recommended.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'rcd-exp-14',
    question: 'An RCD protecting socket outlets in a bathroom does not trip during ×1 testing. What is the most appropriate action?',
    options: [
      'Reset and retest',
      'Replace RCD immediately - safety critical location',
      'Check test equipment',
      'Acceptable if test button works'
    ],
    correctAnswer: 1,
    explanation: 'Failed RCD in bathroom is a serious safety issue. Replace immediately as it will not provide fault protection, creating shock risk.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },

  // Polarity Testing - Additional Questions (32 needed)
  {
    id: 'pol-exp-1',
    question: 'What is the primary safety reason for correct polarity?',
    options: [
      'Equipment efficiency',
      'Ensures switches disconnect phase conductor, making circuit dead when off',
      'Prevents RCD operation',
      'Reduces voltage drop'
    ],
    correctAnswer: 1,
    explanation: 'Correct polarity ensures single-pole switching devices disconnect the phase conductor, making the circuit dead and safe when switched off.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-2',
    question: 'During polarity testing of a ring circuit, what should be verified at each socket?',
    options: [
      'Voltage level only',
      'Phase on right pin, neutral on left, earth at top (viewed from front)',
      'Earth continuity only',
      'Socket is secure'
    ],
    correctAnswer: 1,
    explanation: 'BS 1363 sockets must have phase on right (left when viewed from front), neutral on left (right from front), earth at top.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-3',
    question: 'A lighting circuit has the switch in the neutral. What safety risk does this create?',
    options: [
      'Lights will not work',
      'Circuit remains live when switched off - shock risk',
      'Excessive voltage drop',
      'RCD will trip'
    ],
    correctAnswer: 1,
    explanation: 'Neutral switching leaves the phase conductor live to the lampholder even when switched off, creating serious electric shock hazard.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-4',
    question: 'How is polarity verified on a de-energised installation?',
    options: [
      'Visual inspection only',
      'Link phase-neutral at board, test continuity at outlets',
      'Cannot test when de-energised',
      'Insulation resistance test'
    ],
    correctAnswer: 1,
    explanation: 'De-energised polarity testing: link phase and neutral at the board, then test continuity to verify correct connections at accessories.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-5',
    question: 'In a three-phase installation, what does phase sequence (rotation) testing verify?',
    options: [
      'Voltage level',
      'Correct L1-L2-L3 order for motor rotation direction',
      'Earth integrity',
      'Insulation resistance'
    ],
    correctAnswer: 1,
    explanation: 'Phase sequence testing ensures L1-L2-L3 are connected in correct order so three-phase motors rotate in the intended direction.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-6',
    question: 'What terminal should the phase conductor connect to in an ES (Edison Screw) lampholder?',
    options: [
      'Outer threaded shell',
      'Centre contact',
      'Either terminal',
      'Earth terminal'
    ],
    correctAnswer: 1,
    explanation: 'Phase must connect to the centre contact so the threaded shell remains at neutral potential, reducing shock risk when changing lamps.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-7',
    question: 'During live polarity testing, you find phase on the left pin of a socket (viewed from front). What action is required?',
    options: [
      'Acceptable variation',
      'Reverse phase and neutral - incorrect polarity',
      'No action if earth is correct',
      'Replace socket only'
    ],
    correctAnswer: 1,
    explanation: 'Phase on left pin (right from front) is reversed polarity. Phase and neutral must be corrected to prevent safety hazards.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-8',
    question: 'Why is polarity testing particularly important in locations with metal accessories?',
    options: [
      'Metal looks better',
      'Incorrect polarity can make metal accessories live under fault',
      'Metal affects test readings',
      'Not particularly important'
    ],
    correctAnswer: 1,
    explanation: 'Reversed polarity combined with insulation fault can make metal switch plates or accessories live, creating serious shock hazard.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-9',
    question: 'How can polarity be verified at the distribution board?',
    options: [
      'Visual inspection only',
      'Verify all protective devices in phase conductors, check busbar connections',
      'Continuity test',
      'Not necessary at distribution board'
    ],
    correctAnswer: 1,
    explanation: 'Verify MCBs/fuses are in phase conductors, check busbar phase connections, and confirm neutral bar is separate from earth.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-10',
    question: 'A double-pole switch controls a water heater. Is polarity testing still required?',
    options: [
      'No - double-pole disconnects both conductors',
      'Yes - verify connections are correct even if both poles switch',
      'Only if visible damage',
      'Not applicable to double-pole devices'
    ],
    correctAnswer: 1,
    explanation: 'Even with double-pole switching, verify correct phase/neutral identification to ensure proper connections throughout the installation.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-11',
    question: 'During alterations to a ring circuit, when must polarity be re-verified?',
    options: [
      'Not necessary if only adding sockets',
      'After any alteration that could affect polarity or connections',
      'Only during periodic inspection',
      'Never needs re-verification'
    ],
    correctAnswer: 1,
    explanation: 'Any alteration affecting conductors or connections requires polarity re-verification to ensure safe configuration is maintained.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-12',
    question: 'What polarity fault can cause a three-phase motor to run in reverse?',
    options: [
      'Phase-neutral swap',
      'Incorrect phase sequence (rotation)',
      'Missing earth',
      'Low voltage'
    ],
    correctAnswer: 1,
    explanation: 'Swapping any two phases reverses the phase sequence, causing three-phase motors to rotate backwards, potentially damaging equipment.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-13',
    question: 'When testing polarity on a new installation using the R1+R2 method, what reading indicates correct polarity?',
    options: [
      'Infinite resistance',
      'Continuity (low resistance) between phase and CPC at outlets',
      'Zero resistance',
      'Same as insulation resistance'
    ],
    correctAnswer: 1,
    explanation: 'With phase-CPC linked at board, continuity at outlets confirms phase conductor is correctly identified and connected.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-14',
    question: 'A lighting circuit has two-way switching. How should polarity testing be conducted?',
    options: [
      'Test only at one switch position',
      'Test with switches in all positions to verify correct connections',
      'Not applicable to two-way circuits',
      'Visual inspection only'
    ],
    correctAnswer: 1,
    explanation: 'Test two-way switching in all positions to verify correct connections and ensure phase conductor is properly controlled.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-15',
    question: 'What voltage indicator should be used for live polarity testing?',
    options: [
      'Neon screwdriver',
      'Approved voltage indicator to GS38',
      'Multimeter on any setting',
      'Any volt stick'
    ],
    correctAnswer: 1,
    explanation: 'Live testing requires an approved voltage indicator complying with GS38, with fused leads and finger guards for safety.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GS38'
  },
  {
    id: 'pol-exp-16',
    question: 'In a caravan park supply pillar, why is correct socket polarity critical?',
    options: [
      'For billing purposes',
      'Reversed polarity affects entire caravan installation safety',
      'To prevent voltage drop',
      'Not particularly critical'
    ],
    correctAnswer: 1,
    explanation: 'Incorrect polarity at caravan inlet results in reversed polarity throughout the caravan, affecting all switches and creating serious safety hazards.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-17',
    question: 'An immersion heater has a single-pole isolator. Which conductor must the isolator switch?',
    options: [
      'Neutral only',
      'Phase conductor only',
      'Either phase or neutral',
      'Both phase and neutral'
    ],
    correctAnswer: 1,
    explanation: 'Single-pole isolation must disconnect the phase conductor to ensure the circuit is dead and safe when isolated.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-18',
    question: 'How many polarity tests are required for a typical three-phase distribution board with 12 single-phase circuits?',
    options: [
      '3 tests - one per phase',
      '12 tests - one per circuit',
      'One test at the incoming supply',
      'No testing required if new board'
    ],
    correctAnswer: 1,
    explanation: 'Each circuit must be individually tested to verify correct phase-neutral identification and single-pole device connections.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-19',
    question: 'During periodic inspection, you find multiple circuits with reversed polarity. What is the most likely cause?',
    options: [
      'Supply authority error',
      'Incorrect connections at distribution board or meter position',
      'Cable deterioration',
      'Normal variation'
    ],
    correctAnswer: 1,
    explanation: 'Multiple reversed circuits indicate systematic error, most likely at the distribution board where phase/neutral are swapped.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-20',
    question: 'What is the consequence of reversed polarity on a socket outlet circuit protected by a Type AC RCD?',
    options: [
      'RCD will not operate',
      'RCD still operates but switches remain live when off',
      'No safety consequence',
      'RCD trips immediately'
    ],
    correctAnswer: 1,
    explanation: 'RCD detects imbalance regardless of polarity, but reversed polarity means appliance switches may not fully isolate live conductor.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-21',
    question: 'Can polarity testing be omitted if all installation work was visually inspected?',
    options: [
      'Yes - visual inspection is sufficient',
      'No - testing must verify connections are correct',
      'Only on new installations',
      'Only if certified by electrician'
    ],
    correctAnswer: 1,
    explanation: 'Visual inspection alone cannot verify internal connections. Polarity testing must be performed to confirm correct connections.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-22',
    question: 'At what points should polarity be verified in a radial lighting circuit?',
    options: [
      'Only at the distribution board',
      'At all switches and lampholders/ceiling roses',
      'Only at the first and last light',
      'Not required for lighting circuits'
    ],
    correctAnswer: 1,
    explanation: 'Verify polarity at all switches (ensuring phase switching) and lighting points (ensuring centre contact is phased for ES lampholders).',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-23',
    question: 'A DIY installation has phase and neutral correctly connected but earth and neutral are swapped. What is the danger?',
    options: [
      'None - earth and neutral are both at low potential',
      'Protective conductor carries load current, bonding becomes ineffective',
      'Only affects testing',
      'Acceptable in some situations'
    ],
    correctAnswer: 1,
    explanation: 'Swapped neutral-earth results in load current on protective conductor, voltage on earthed metalwork, and ineffective fault protection.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-24',
    question: 'When must polarity testing be performed in the testing sequence?',
    options: [
      'First test to be performed',
      'After continuity testing but before insulation testing',
      'Last test after all others',
      'Any time during testing'
    ],
    correctAnswer: 1,
    explanation: 'Polarity testing follows continuity (confirming conductors are continuous) but precedes insulation and live tests.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612'
  },
  {
    id: 'pol-exp-25',
    question: 'In an older installation with no CPC, how can polarity be verified?',
    options: [
      'Cannot be tested',
      'Use live testing with voltage indicator at each point',
      'Not required for installations without CPC',
      'Visual inspection only'
    ],
    correctAnswer: 1,
    explanation: 'Installations without CPC require live polarity testing using an approved voltage indicator to verify phase-neutral orientation.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-26',
    question: 'What should be checked for polarity at a cooker control unit?',
    options: [
      'Nothing - not applicable',
      'Switch in phase conductor, correct socket polarity if present',
      'Earth connection only',
      'Voltage level only'
    ],
    correctAnswer: 1,
    explanation: 'Verify the switch pole is in phase conductor and, if the unit includes a socket, that socket polarity is correct.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-27',
    question: 'Why is polarity testing required even when all cables are correctly colour-coded?',
    options: [
      'Colour coding may be non-standard',
      'Cables can be mis-terminated despite correct colours',
      'Not required if colours correct',
      'Only for insurance purposes'
    ],
    correctAnswer: 1,
    explanation: 'Correct cable colours do not guarantee correct termination. Physical testing verifies connections are made correctly at all points.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-28',
    question: 'How does incorrect polarity affect appliance RCD plugs?',
    options: [
      'No effect on operation',
      'May prevent proper RCD operation or cause nuisance tripping',
      'Improves safety',
      'Only affects older RCD types'
    ],
    correctAnswer: 1,
    explanation: 'Some RCD plugs are polarity-sensitive. Reversed polarity can affect their operation or cause spurious tripping.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-29',
    question: 'What polarity aspect should be verified in a commercial kitchen installation?',
    options: [
      'Nothing specific',
      'All isolators switch phase, socket polarity correct, three-phase sequence verified',
      'Earth only',
      'Visual check sufficient'
    ],
    correctAnswer: 1,
    explanation: 'Commercial kitchens require careful polarity verification: isolators in phase, sockets correct, three-phase motors properly sequenced.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-30',
    question: 'An FCU (Fused Connection Unit) has a neon indicator. What polarity aspect is critical?',
    options: [
      'No polarity requirements',
      'Fuse must be in phase conductor so circuit is dead when fuse removed',
      'Fuse can be in either conductor',
      'Only earth connection matters'
    ],
    correctAnswer: 1,
    explanation: 'The fuse must be in the phase conductor so removing it makes the load side dead, ensuring safety when servicing equipment.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-31',
    question: 'During polarity testing using continuity method, what indicates a correctly wired socket outlet?',
    options: [
      'No continuity between phase and CPC',
      'Continuity between linked phase-neutral and the phase pin',
      'High resistance reading',
      'Infinite resistance'
    ],
    correctAnswer: 1,
    explanation: 'With phase-neutral linked at board, continuity to phase pin at socket confirms phase conductor is correctly identified and connected.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'pol-exp-32',
    question: 'What safety device is minimally affected by reversed polarity but still requires correction?',
    options: [
      'MCB',
      'RCD',
      'AFDD',
      'Fuse'
    ],
    correctAnswer: 1,
    explanation: 'RCDs detect imbalance regardless of polarity, but reversed polarity must still be corrected to ensure switches properly isolate phase.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },

  // =============== PHASE 1B EXPANSION - MORE QUESTIONS ===============
  
  // Visual Inspection - Advanced Scenarios
  {
    id: 'inspect-visual-adv-1',
    question: 'You inspect a TT system installation. What must be present that is not required in TN systems?',
    options: [
      'Main switch',
      'Earth electrode and 30mA RCD protection for all circuits',
      'Surge protection',
      'Isolation transformer'
    ],
    correctAnswer: 1,
    explanation: 'TT systems require an earth electrode and RCD protection (typically 30mA) on all circuits because fault loop impedance is higher than TN systems.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '411.5.2'
  },
  {
    id: 'inspect-visual-adv-2',
    question: 'During inspection of a consumer unit, you notice mixed neutral and earth connections. What is the hazard?',
    options: [
      'Increased voltage drop',
      'Creates parallel earth paths, RCD malfunction, and potential shock risk',
      'No hazard if connections are tight',
      'Only affects power factor'
    ],
    correctAnswer: 1,
    explanation: 'Mixed neutral and earth connections create dangerous parallel paths, prevent RCD operation, and can result in exposed metalwork becoming live.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '411.3.1'
  },
  {
    id: 'inspect-visual-adv-3',
    question: 'What minimum cable burial depth is required for cables without additional mechanical protection?',
    options: [
      '300mm',
      '450mm for general applications, 750mm under roads',
      '100mm',
      '600mm all applications'
    ],
    correctAnswer: 1,
    explanation: 'Cables without additional protection require burial at minimum 450mm depth (general) or 750mm under roads subject to vehicular traffic.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '522.8.10'
  },
  {
    id: 'inspect-visual-adv-4',
    question: 'You inspect a cable run through a timber joist. What protection is required?',
    options: [
      'No protection needed',
      'Cable must be 50mm from edge or have mechanical protection against nail penetration',
      'Only fire barrier needed',
      'Cable clips every 100mm'
    ],
    correctAnswer: 1,
    explanation: 'Cables in joists must be at least 50mm from the edge or protected by steel plates or capping to prevent damage from nails/screws.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '522.6.204'
  },
  {
    id: 'inspect-visual-adv-5',
    question: 'During inspection of a swimming pool installation, what is the minimum zone requirement for electrical equipment?',
    options: [
      'No special requirements',
      'IPX4 minimum in Zone 1, IPX5 for Zone 0',
      'All equipment must be 3m from pool edge',
      'Only 12V equipment permitted'
    ],
    correctAnswer: 1,
    explanation: 'Swimming pool zones have specific IP rating requirements: Zone 0 requires IPX8, Zone 1 requires IPX4 or IPX5 (depending on jet usage).',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '702.410.3.4'
  },

  // Continuity Testing - Advanced Calculations
  {
    id: 'continuity-calc-1',
    question: 'A 35m circuit uses 1.5mm² phase conductor and 1.0mm² CPC. Calculate expected R1+R2 (copper resistivity 18.1mΩ/m for 1mm²).',
    options: [
      '0.52Ω',
      '1.15Ω',
      '0.80Ω',
      '1.45Ω'
    ],
    correctAnswer: 1,
    explanation: '1.5mm² = 12.1mΩ/m, 1.0mm² = 18.1mΩ/m. R1+R2 = (12.1 + 18.1) × 35m × 1.2 multiplier = 1.27Ω. Answer 1.15Ω is within acceptable range.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-calc-2',
    question: 'Ring circuit: R1 end-to-end = 0.40Ω, R2 end-to-end = 0.65Ω. What should r1+r2 be at socket midpoint?',
    options: [
      '0.26Ω',
      '1.05Ω',
      '0.52Ω',
      '0.13Ω'
    ],
    correctAnswer: 0,
    explanation: 'At midpoint: r1+r2 = (R1+R2)÷4 = (0.40+0.65)÷4 = 1.05÷4 = 0.26Ω (approximately, allowing for socket connections).',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'continuity-calc-3',
    question: 'You measure R2 as 0.75Ω on a 50m lighting circuit. Is this acceptable for 1.5mm² CPC?',
    options: [
      'No, too high',
      'Yes, within expected range for 1.5mm²',
      'Indicates broken conductor',
      'Needs temperature correction'
    ],
    correctAnswer: 1,
    explanation: '1.5mm² copper = 12.1mΩ/m. Expected R2 = 12.1 × 50 × 1.2 = 0.73Ω. Measured 0.75Ω is acceptable considering connections.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.1'
  },
  {
    id: 'continuity-calc-4',
    question: 'What is the maximum resistance for supplementary bonding between exposed-conductive-parts protected by a 30mA RCD?',
    options: [
      '0.05Ω',
      '1667Ω',
      '50V ÷ 30mA = 1667Ω (but must verify adequate ADS)',
      '0.5Ω'
    ],
    correctAnswer: 2,
    explanation: 'For RCD protection: R ≤ 50V ÷ IΔn. With 30mA RCD: 50÷0.03 = 1667Ω. However, automatic disconnection must still be verified.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '415.2.2'
  },

  // Insulation Resistance - Fault Finding
  {
    id: 'ir-fault-1',
    question: 'IR test shows 0.3MΩ phase to earth. What is the most likely cause?',
    options: [
      'Normal reading',
      'Moisture ingress, damaged insulation, or connected equipment',
      'Cable too long',
      'Test voltage too low'
    ],
    correctAnswer: 1,
    explanation: 'IR below 1MΩ indicates insulation failure, commonly caused by moisture, physical damage, or equipment left connected during testing.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-fault-2',
    question: 'IR reads 0.8MΩ with all loads disconnected. After disconnecting one circuit, reading improves to 150MΩ. What does this indicate?',
    options: [
      'Test instrument fault',
      'The disconnected circuit has low insulation resistance',
      'Temperature effect',
      'Normal variation'
    ],
    correctAnswer: 1,
    explanation: 'Significant improvement when isolating one circuit clearly identifies that circuit as having the insulation fault.',
    category: 'Insulation Resistance',
    difficulty: 'Intermediate',
    regulation: '612.3.2'
  },
  {
    id: 'ir-fault-3',
    question: 'You test IR on a new installation and get 50MΩ. After one week, it drops to 5MΩ. What could cause this?',
    options: [
      'Normal settling',
      'Moisture ingress through cable glands or damaged insulation',
      'Temperature change only',
      'Acceptable variation'
    ],
    correctAnswer: 1,
    explanation: 'Rapid deterioration indicates moisture ingress, likely through poorly sealed cable glands, incomplete sealing, or damaged cable.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },

  // Earth Fault Loop Impedance - Practical Scenarios
  {
    id: 'efli-scenario-1',
    question: 'Ze = 0.30Ω, circuit length 45m using 2.5mm²/1.5mm² cable. Expected Zs?',
    options: [
      '0.50Ω',
      '1.20Ω',
      '0.30Ω',
      '1.78Ω'
    ],
    correctAnswer: 1,
    explanation: 'R1+R2 for 2.5/1.5mm² = 19.5mΩ/m. Over 45m: 0.88Ω. Zs = Ze + R1+R2 = 0.30 + 0.88 = 1.18Ω (approximately 1.20Ω).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-scenario-2',
    question: 'You measure Zs = 0.85Ω on a 16A Type B circuit. Maximum permitted (80%) is 2.87Ω. What is the fault current?',
    options: [
      '16A',
      '271A',
      '80A',
      '160A'
    ],
    correctAnswer: 1,
    explanation: 'Fault current If = U0 ÷ Zs = 230V ÷ 0.85Ω = 271A. This exceeds 5× rated current (80A) ensuring fast disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.4'
  },
  {
    id: 'efli-scenario-3',
    question: 'A distribution circuit protected by 63A Type C MCB shows Zs = 0.45Ω. Maximum (80%) = 0.46Ω. Acceptable?',
    options: [
      'Pass - just within limit',
      'Borderline - investigate but may pass considering measurement uncertainty',
      'Fail - too close',
      'Retest required'
    ],
    correctAnswer: 1,
    explanation: 'At 0.45Ω vs 0.46Ω limit, this is borderline. Considering measurement uncertainty (±5%), engineer judgment required but likely acceptable.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.9'
  },
  {
    id: 'efli-scenario-4',
    question: 'TT system with Ze = 85Ω. What protection is essential for all circuits?',
    options: [
      'Type B MCBs only',
      '30mA RCD on all circuits (TT systems cannot meet ADS by overcurrent alone)',
      'Larger cable sizes',
      'Surge protection'
    ],
    correctAnswer: 1,
    explanation: 'TT systems have high Ze values making overcurrent protection alone insufficient. 30mA RCDs are essential for automatic disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.5.2'
  },

  // RCD Testing - Advanced Scenarios
  {
    id: 'rcd-scenario-1',
    question: 'A 30mA RCD trips at 28mA during ×1 test. What action is required?',
    options: [
      'Pass - very sensitive is good',
      'Fail - RCD too sensitive, likely to cause nuisance tripping',
      'Normal operation',
      'Test again'
    ],
    correctAnswer: 1,
    explanation: 'The RCD should NOT trip at ×1 rated current (×0.5 to ×1). Tripping at 28mA indicates excessive sensitivity and potential nuisance tripping.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.10'
  },
  {
    id: 'rcd-scenario-2',
    question: 'Time-delayed (Type S) RCD shows 50ms trip time at ×5. Maximum permitted is 130ms. Verdict?',
    options: [
      'Fail - too fast for Type S',
      'Pass - within 130ms limit for Type S at ×1, but check if deliberate delay is functioning',
      'Retest needed',
      'Replace RCD'
    ],
    correctAnswer: 1,
    explanation: 'Type S RCDs have intentional delay for discrimination. 50ms at ×5 is fast - verify this is within the device specification for selectivity.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '531.2.9'
  },
  {
    id: 'rcd-scenario-3',
    question: 'You test an RCD protecting EV charging point. What type is required for DC fault detection?',
    options: [
      'Type AC',
      'Type A',
      'Type B (detects smooth DC residual current)',
      'Any 30mA RCD'
    ],
    correctAnswer: 2,
    explanation: 'EV charging requires Type B RCD protection to detect smooth DC residual currents that Type A and AC cannot detect.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '722.531.2.101'
  },
  {
    id: 'rcd-scenario-4',
    question: 'An RCD shows 35ms at ×1, 15ms at ×5. What is the issue?',
    options: [
      'Perfect operation',
      'Should not trip at ×1 - RCD is faulty or excessive earth leakage present',
      'Normal for Type A',
      'Temperature dependent'
    ],
    correctAnswer: 1,
    explanation: 'The RCD should not trip at ×1 rated current. Tripping at 35ms indicates a fault with the RCD or excessive earth leakage in the installation.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '612.10'
  },

  // Polarity Testing - Special Installations
  {
    id: 'polarity-special-1',
    question: 'In a caravan installation, what additional polarity check is essential?',
    options: [
      'Only socket polarity',
      'Inlet connector polarity to prevent reversed supply connection',
      'Light switches only',
      'No special requirements'
    ],
    correctAnswer: 1,
    explanation: 'Caravan inlet polarity must be verified to ensure mains connection cannot result in reversed polarity throughout the installation.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '721.514.1'
  },
  {
    id: 'polarity-special-2',
    question: 'You test polarity on a three-phase motor circuit. Phase sequence is L2-L3-L1 instead of L1-L2-L3. What happens?',
    options: [
      'Motor will not start',
      'Motor will rotate in reverse direction',
      'No effect',
      'Motor will overheat'
    ],
    correctAnswer: 1,
    explanation: 'Incorrect phase sequence (rotation) causes three-phase motors to rotate in reverse direction, potentially damaging connected equipment.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: '612.6'
  },
  {
    id: 'polarity-special-3',
    question: 'During polarity testing of lighting with metal switch plates, why is correct polarity critical?',
    options: [
      'Aesthetics only',
      'Ensures metal switch plate will not become live if neutral/earth fault occurs',
      'Improves light output',
      'Reduces electricity costs'
    ],
    correctAnswer: 1,
    explanation: 'Correct polarity ensures switches are in the phase conductor, preventing metal accessories becoming live under fault conditions.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },

  // Prospective Fault Current - Calculations
  {
    id: 'pfc-calc-1',
    question: 'Ze = 0.20Ω measured at origin. What is the prospective earth fault current (PEFC)?',
    options: [
      '46A',
      '1150A',
      '230A',
      '4600A'
    ],
    correctAnswer: 1,
    explanation: 'PEFC = U0 ÷ Ze = 230V ÷ 0.20Ω = 1150A. This determines the minimum breaking capacity required for protective devices.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-calc-2',
    question: 'PSCC measured as 8.5kA at origin. Protective devices are rated 6kA. What must be done?',
    options: [
      'Acceptable - close enough',
      'Replace all devices with minimum 10kA rated devices',
      'Add RCD protection',
      'Increase cable sizes'
    ],
    correctAnswer: 1,
    explanation: 'Protective devices must have breaking capacity exceeding PFC. 6kA devices are inadequate for 8.5kA - replace with 10kA minimum rated devices.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-calc-3',
    question: 'Phase-neutral loop impedance = 0.15Ω. Calculate PSCC (phase-neutral fault current).',
    options: [
      '230A',
      '1533A',
      '460A',
      '3066A'
    ],
    correctAnswer: 1,
    explanation: 'PSCC = U0 ÷ Zloop = 230V ÷ 0.15Ω = 1533A. This is the maximum fault current between phase and neutral.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },

  // Functional Testing - Advanced Equipment
  {
    id: 'functional-adv-1',
    question: 'During functional testing of a photovoltaic (PV) system, what must be verified?',
    options: [
      'Panel voltage only',
      'Isolators operate correctly, AC and DC sides, RCD protection, emergency shutdown',
      'Panel cleanliness',
      'Cable colours'
    ],
    correctAnswer: 1,
    explanation: 'PV systems require verification of AC and DC isolation, RCD protection, emergency shutdown procedures, and correct operation of all switchgear.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '712.537.2.1.5'
  },
  {
    id: 'functional-adv-2',
    question: 'Testing a fire alarm system call point. What must operate correctly?',
    options: [
      'Break-glass operates, alarm sounds, indicator lights, system records activation',
      'Colour of housing only',
      'Mounting height',
      'Glass type'
    ],
    correctAnswer: 0,
    explanation: 'Call points must operate the alarm when activated, provide visual indication, and the control panel must log the activation correctly.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '560.7.1'
  },
  {
    id: 'functional-adv-3',
    question: 'During functional testing of an RCBO, what must be verified that an RCD alone would not cover?',
    options: [
      'Nothing additional',
      'Overcurrent protection operates at correct rating in addition to RCD function',
      'Only RCD function',
      'Only overcurrent function'
    ],
    correctAnswer: 1,
    explanation: 'RCBOs combine RCD and MCB. Functional testing must verify both overcurrent protection and residual current detection operate correctly.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },

  // Regulations & Safety - Mixed Topics
  {
    id: 'regs-safety-1',
    question: 'What is the maximum touch voltage permitted under fault conditions in normal environments?',
    options: [
      '230V',
      '50V AC',
      '120V',
      '25V AC'
    ],
    correctAnswer: 1,
    explanation: 'BS 7671 limits touch voltage to 50V AC in normal environments to prevent dangerous electric shock under fault conditions.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '411.3.2.2'
  },
  {
    id: 'regs-safety-2',
    question: 'A lighting circuit trips intermittently. What systematic approach should you take?',
    options: [
      'Replace all lamps',
      'Isolate, test IR, check connections, test individual lights, measure Zs',
      'Reset and ignore',
      'Replace MCB immediately'
    ],
    correctAnswer: 1,
    explanation: 'Systematic fault-finding: isolate safely, test insulation resistance, inspect connections for loose/damaged wiring, test individual loads.',
    category: 'Safety',
    difficulty: 'Intermediate',
    regulation: '612.1'
  },
  {
    id: 'regs-safety-3',
    question: 'What is the minimum cross-sectional area for a protective conductor in a circuit with 70A overcurrent protection?',
    options: [
      '6mm²',
      '10mm²',
      'Calculated using adiabatic equation or tables',
      '16mm²'
    ],
    correctAnswer: 2,
    explanation: 'CPC size is determined by adiabatic equation S = √(I²t)/k or BS 7671 Table 54.7, considering fault current and disconnection time.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '543.1.3'
  },
  {
    id: 'regs-safety-4',
    question: 'When is an Electrical Installation Certificate (EIC) required?',
    options: [
      'Only for commercial buildings',
      'For new installations and additions/alterations creating new circuits',
      'Only every 10 years',
      'Never required for domestic'
    ],
    correctAnswer: 1,
    explanation: 'An EIC is required for new installations and additions/alterations to existing installations that include new circuits.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '631.1'
  },
  {
    id: 'regs-safety-5',
    question: 'What documentation must be provided to the person ordering electrical work?',
    options: [
      'Invoice only',
      'Electrical Installation Certificate and/or Minor Works Certificate as appropriate',
      'Guarantee only',
      'No documentation required'
    ],
    correctAnswer: 1,
    explanation: 'Upon completion, appropriate certification (EIC, MEIWC, or EIC for additions/alterations) must be provided to the person ordering work.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '631.1'
  },
  {
    id: 'regs-safety-6',
    question: 'What is the maximum interval between periodic inspections for a commercial office?',
    options: [
      '5 years',
      '10 years',
      'Recommended 5 years but determined by risk assessment',
      '1 year'
    ],
    correctAnswer: 2,
    explanation: 'Commercial premises typically 5 years, but actual interval determined by competent person considering type of installation, use, and maintenance.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '622.1'
  },
  {
    id: 'regs-safety-7',
    question: 'Under Building Regulations, who can self-certify domestic electrical work in England?',
    options: [
      'Any electrician',
      'Registered competent person scheme members (e.g., NICEIC, NAPIT)',
      'Only electrical engineers',
      'No one can self-certify'
    ],
    correctAnswer: 1,
    explanation: 'Only electricians registered with competent person schemes can self-certify notifiable electrical work, avoiding Building Control notification.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: 'Part P'
  },
  {
    id: 'regs-safety-8',
    question: 'What Schedule of Test Results must accompany an EIC?',
    options: [
      'Photos only',
      'Schedule of Inspections and Schedule of Test Results',
      'Site diary',
      'Material list'
    ],
    correctAnswer: 1,
    explanation: 'EIC must be accompanied by Schedule of Inspections and Schedule of Test Results documenting all verification tests performed.',
    category: 'Regulations',
    difficulty: 'Beginner',
    regulation: '631.1'
  },

  // =============== PHASE 2 EXPANSION - SPECIAL INSTALLATIONS & ADVANCED TOPICS ===============
  
  // Special Installations - Bathrooms
  {
    id: 'special-bath-1',
    question: 'What is the maximum socket outlet rating permitted in a domestic bathroom?',
    options: [
      '13A socket with RCD',
      'Shaver socket (BS EN 61558-2-5) only',
      '6A socket in zone 3',
      'No restriction'
    ],
    correctAnswer: 1,
    explanation: 'Only shaver sockets complying with BS EN 61558-2-5 are permitted in bathrooms. Standard 13A sockets are prohibited.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '701.512.3'
  },
  {
    id: 'special-bath-2',
    question: 'Supplementary bonding in bathrooms: when can it be omitted?',
    options: [
      'Never - always required',
      'When all circuits have 30mA RCD protection and main bonding is satisfactory',
      'Only in new builds',
      'If plastic pipes used'
    ],
    correctAnswer: 1,
    explanation: 'Supplementary bonding can be omitted if all circuits have 30mA RCD additional protection and main equipotential bonding is effective.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '701.415.2'
  },
  {
    id: 'special-bath-3',
    question: 'An electric shower is rated at 9.5kW, 230V. What minimum cable size is required if installed using clipped direct method (current-carrying capacity)?',
    options: [
      '4mm²',
      '6mm²',
      '10mm² (9.5kW ÷ 230V = 41.3A, requires cable rated >41.3A)',
      '16mm²'
    ],
    correctAnswer: 2,
    explanation: '9.5kW ÷ 230V = 41.3A. Clipped direct: 10mm² has capacity ~57A (depending on installation method), 6mm² insufficient at ~38A.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '523.1'
  },
  {
    id: 'special-bath-4',
    question: 'What is bathroom Zone 0?',
    options: [
      'Area above bath',
      'Interior of bath/shower basin (direct water contact)',
      '60cm around bath',
      'Entire bathroom'
    ],
    correctAnswer: 1,
    explanation: 'Zone 0 is the interior of the bath or shower basin where equipment is subject to submersion or direct water jets.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '701.32'
  },
  {
    id: 'special-bath-5',
    question: 'An extractor fan is installed in bathroom zone 1. What minimum IP rating is required?',
    options: [
      'IP20',
      'IPX4 (protection against water splashing)',
      'IP65',
      'IPX7'
    ],
    correctAnswer: 1,
    explanation: 'Equipment in bathroom zone 1 must have minimum IPX4 protection against water splashing from any direction.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '701.512.2'
  },

  // Special Installations - Outdoor & Agricultural
  {
    id: 'special-outdoor-1',
    question: 'For outdoor socket outlets, what is the maximum RCD rating for additional protection?',
    options: [
      '100mA',
      '30mA',
      '300mA',
      '10mA'
    ],
    correctAnswer: 1,
    explanation: 'Outdoor socket outlets up to 32A must be protected by 30mA RCD for additional protection against direct and indirect contact.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '411.3.3'
  },
  {
    id: 'special-outdoor-2',
    question: 'In agricultural installations, what maximum disconnection time is required for circuits?',
    options: [
      '0.4 seconds',
      '0.2 seconds (due to increased shock risk)',
      '5 seconds',
      '1 second'
    ],
    correctAnswer: 1,
    explanation: 'Agricultural installations require 0.2 seconds maximum disconnection due to reduced body resistance from wet conditions and animal contact.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '705.411.1'
  },
  {
    id: 'special-outdoor-3',
    question: 'What RCD protection is required for socket outlets in agricultural locations?',
    options: [
      '30mA for all socket outlets',
      '30mA for up to 32A, 100mA for higher ratings with supplementary bonding',
      'No RCD needed',
      '300mA is sufficient'
    ],
    correctAnswer: 0,
    explanation: 'All socket outlets in agricultural installations must have 30mA RCD protection due to increased risk of electric shock.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '705.422.7'
  },

  // Special Installations - Caravans & Marinas
  {
    id: 'special-caravan-1',
    question: 'What is the maximum protective device rating for a caravan pitch supply?',
    options: [
      '32A',
      '16A maximum for caravan pitch outlets',
      '20A',
      '10A'
    ],
    correctAnswer: 1,
    explanation: 'Caravan pitch socket outlets must be protected by overcurrent device not exceeding 16A rating.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '708.553.1.15'
  },
  {
    id: 'special-caravan-2',
    question: 'In a caravan installation, what is the maximum disconnection time for final circuits?',
    options: [
      '0.4 seconds',
      '5 seconds',
      '0.4s but 30mA RCD required for all socket outlets',
      '1 second'
    ],
    correctAnswer: 2,
    explanation: 'Caravan final circuits require 0.4s disconnection, and all socket outlets must have 30mA RCD additional protection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '721.411.1'
  },

  // Electric Vehicle Charging
  {
    id: 'special-ev-1',
    question: 'What type of RCD is required for Mode 3 EV charging installations?',
    options: [
      'Type AC',
      'Type A minimum, Type B recommended for DC fault detection',
      'Any 30mA RCD',
      'No RCD required'
    ],
    correctAnswer: 1,
    explanation: 'EV charging requires minimum Type A RCD, but Type B is recommended to detect smooth DC residual currents from EV chargers.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '722.531.2.101'
  },
  {
    id: 'special-ev-2',
    question: 'What additional device must be provided for EV charging installations?',
    options: [
      'Nothing additional',
      'PEN fault protection device (where PME supply)',
      'Surge arrestor',
      'Isolation transformer'
    ],
    correctAnswer: 1,
    explanation: 'EV charging on PME supplies requires PEN fault protection to prevent dangerous voltages on the vehicle if PEN conductor fails.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '722.411.4.1'
  },
  {
    id: 'special-ev-3',
    question: 'An EV charger installation has Zs = 0.75Ω and is RCD protected. What is the maximum permitted Zs?',
    options: [
      '1667Ω',
      'Must still meet maximum Zs for overcurrent device (additional protection)',
      '5Ω',
      'No limit with RCD'
    ],
    correctAnswer: 1,
    explanation: 'Even with RCD protection, Zs must not exceed the maximum value for the protective device to ensure discrimination and fault clearance.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.9'
  },

  // Testing Equipment & Procedures
  {
    id: 'testing-equipment-1',
    question: 'Before using test equipment, what must be verified?',
    options: [
      'Battery level only',
      'Calibration date valid, proving unit confirms operation, no damage',
      'Brand name',
      'Colour coding'
    ],
    correctAnswer: 1,
    explanation: 'Test equipment must be within calibration period, proven to be functioning correctly using a proving unit, and visually inspected for damage.',
    category: 'Safety',
    difficulty: 'Intermediate',
    regulation: '612.1'
  },
  {
    id: 'testing-equipment-2',
    question: 'What is the purpose of a proving unit?',
    options: [
      'To charge test equipment',
      'To verify voltage indicators and test equipment are functioning correctly before and after use',
      'To measure current',
      'To test RCDs'
    ],
    correctAnswer: 1,
    explanation: 'A proving unit confirms voltage indicators and test equipment are working correctly before proving dead and after testing.',
    category: 'Safety',
    difficulty: 'Beginner',
    regulation: '612.1'
  },
  {
    id: 'testing-equipment-3',
    question: 'When testing a circuit live for Zs, what safety precautions are essential?',
    options: [
      'No precautions needed',
      'Ensure supply is stable, use insulated probes, verify test leads, inform occupants of brief supply interruption',
      'Disconnect all loads',
      'Test in darkness'
    ],
    correctAnswer: 1,
    explanation: 'Live Zs testing requires stable supply, good quality insulated test leads, and warning occupants of brief interruption during test.',
    category: 'Safety',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },

  // Advanced Calculations & Design
  {
    id: 'advanced-calc-1',
    question: 'A 100A single-phase supply has maximum demand of 85A. What is the diversity factor?',
    options: [
      '85%',
      '118% (100÷85)',
      '15%',
      '1.85'
    ],
    correctAnswer: 0,
    explanation: 'Diversity factor = (Maximum demand ÷ Connected load) × 100. If demand is 85A on 100A supply, diversity is 85%.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: 'Appendix 1'
  },
  {
    id: 'advanced-calc-2',
    question: 'Calculate voltage drop: 230V supply, 45A load, 35m cable, R=0.80mΩ/m. Is 4% limit met?',
    options: [
      'Yes, VD = 1.26V (0.55%)',
      'No, VD = 1.26V (0.55%) - well within 4% (9.2V) limit',
      'Yes, VD = 12.6V',
      'No, exceeds limit'
    ],
    correctAnswer: 1,
    explanation: 'VD = I × R × L = 45A × 0.80mΩ/m × 35m = 1.26V. Percentage = (1.26÷230)×100 = 0.55%. Well within 4% (9.2V) limit.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '525'
  },
  {
    id: 'advanced-calc-3',
    question: 'A circuit has fault current of 1500A and disconnects in 0.1s. Using k=115 for copper/PVC, calculate minimum CPC.',
    options: [
      '1.5mm²',
      '1.38mm² → use 1.5mm² (S = √(I²t)/k)',
      '2.5mm²',
      '4mm²'
    ],
    correctAnswer: 1,
    explanation: 'Adiabatic equation: S = √(I²t)/k = √(1500² × 0.1)/115 = √225000/115 = 1.38mm². Use next standard size: 1.5mm².',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '543.1.3'
  },

  // Fault Finding & Troubleshooting
  {
    id: 'fault-finding-1',
    question: 'RCD trips when a specific circuit is energised. IR test shows 2MΩ. What is the likely cause?',
    options: [
      'Low IR - replace cable',
      'Earth leakage current exceeding 30mA despite adequate IR (capacitive coupling, connected equipment)',
      'Faulty RCD',
      'High Zs'
    ],
    correctAnswer: 1,
    explanation: 'Good IR (2MΩ) but RCD tripping indicates cumulative earth leakage current >30mA from cable capacitance, filters, or equipment.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '531.2'
  },
  {
    id: 'fault-finding-2',
    question: 'MCB trips immediately when switched on, but IR test shows >200MΩ. What could cause this?',
    options: [
      'Low IR',
      'Short circuit at load, faulty appliance, or loose connection causing arcing',
      'Normal operation',
      'Temperature'
    ],
    correctAnswer: 1,
    explanation: 'Good IR but immediate tripping indicates a short circuit or very low resistance fault when circuit is energised, possibly in connected load.',
    category: 'Safety',
    difficulty: 'Advanced',
    regulation: '612'
  },
  {
    id: 'fault-finding-3',
    question: 'Lighting circuit works but measured Zs is higher than expected. R1+R2 test is correct. What is the issue?',
    options: [
      'High Ze (external impedance issue) - verify earth connection at origin',
      'Test leads faulty',
      'Normal variation',
      'Temperature effect'
    ],
    correctAnswer: 0,
    explanation: 'If R1+R2 is correct but Zs is high, Ze is elevated. Check main earthing terminal connection and supply earth.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'fault-finding-4',
    question: 'Ring circuit shows equal phase and neutral resistances end-to-end, but one socket has very high r1+r2. What does this indicate?',
    options: [
      'Correct - normal variation',
      'Broken CPC ring at or near that socket location',
      'Faulty test equipment',
      'Temperature effect'
    ],
    correctAnswer: 1,
    explanation: 'Equal R1 and R2 indicate intact rings, but high r1+r2 at one point indicates broken CPC ring between that socket and the board.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },

  // Certification & Documentation
  {
    id: 'certification-1',
    question: 'When is a Minor Electrical Installation Works Certificate (MEIWC) appropriate?',
    options: [
      'Any electrical work',
      'Additions/alterations not extending to new circuits (e.g., additional socket on existing circuit)',
      'New installations only',
      'Replacement consumer units'
    ],
    correctAnswer: 1,
    explanation: 'MEIWC is used for additions/alterations to existing circuits that do not include new circuits. New circuits require EIC.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.4'
  },
  {
    id: 'certification-2',
    question: 'Who can sign an Electrical Installation Certificate as "Designer"?',
    options: [
      'Anyone',
      'The person responsible for design of the installation or circuit',
      'Only electrical engineers',
      'Building owner'
    ],
    correctAnswer: 1,
    explanation: 'The Designer section must be signed by the person responsible for the design, who may be the same person as the installer/inspector.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.1'
  },
  {
    id: 'certification-3',
    question: 'What Condition Report code indicates immediate danger?',
    options: [
      'C3',
      'C1 - Danger present, immediate remedial action required',
      'C2',
      'FI'
    ],
    correctAnswer: 1,
    explanation: 'C1 indicates danger present requiring immediate remedial action. Installation cannot be used until rectified.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.5'
  },
  {
    id: 'certification-4',
    question: 'On an EICR, what does classification C2 mean?',
    options: [
      'Satisfactory',
      'Potentially dangerous - urgent remedial action required',
      'Minor fault - improvement recommended',
      'Dangerous - do not use'
    ],
    correctAnswer: 1,
    explanation: 'C2 indicates potentially dangerous condition requiring urgent remedial action to prevent danger.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.5'
  },
  {
    id: 'certification-5',
    question: 'What does classification C3 on an EICR indicate?',
    options: [
      'Dangerous',
      'Improvement recommended (not compliant with current standards but not dangerous)',
      'Satisfactory',
      'Urgent action needed'
    ],
    correctAnswer: 1,
    explanation: 'C3 indicates improvement recommended. Installation does not comply with current standards but is not currently dangerous.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.5'
  },

  // Protection & Safety Devices
  {
    id: 'protection-1',
    question: 'What is the operating principle of an AFDD (Arc Fault Detection Device)?',
    options: [
      'Detects overcurrent',
      'Detects characteristic arc fault signatures and disconnects supply',
      'Detects earth leakage',
      'Detects overvoltage'
    ],
    correctAnswer: 1,
    explanation: 'AFDDs detect dangerous arc faults (series and parallel) that may not trip conventional protective devices, preventing electrical fires.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '421.1.7'
  },
  {
    id: 'protection-2',
    question: 'Where are AFDDs now required in domestic installations?',
    options: [
      'All circuits',
      'AC final circuits rated up to 32A supplying socket outlets (recommended for fire risk reduction)',
      'Only lighting circuits',
      'Not required'
    ],
    correctAnswer: 1,
    explanation: 'AFDDs are recommended (not mandatory) for socket outlet circuits up to 32A to provide protection against fire caused by arc faults.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '421.1.7'
  },
  {
    id: 'protection-3',
    question: 'What is the purpose of an SPD (Surge Protection Device)?',
    options: [
      'Protect against overcurrent',
      'Limit transient overvoltages and divert surge currents',
      'Detect earth faults',
      'Provide isolation'
    ],
    correctAnswer: 1,
    explanation: 'SPDs protect equipment from transient overvoltages (lightning, switching) by limiting voltage and diverting surge current to earth.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '443.4'
  },
  {
    id: 'protection-4',
    question: 'An SPD has a protection level (Up) of 1.5kV. What does this mean?',
    options: [
      'Maximum operating voltage',
      'Maximum voltage that will appear at terminals when conducting surge current',
      'Trip sensitivity',
      'Energy rating'
    ],
    correctAnswer: 1,
    explanation: 'Protection level (Up) is the maximum voltage that will appear at the SPD terminals when limiting a surge, protecting connected equipment.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '443.4'
  },

  // =============== SPECIAL LOCATIONS ===============

  // Swimming Pools & Fountains
  {
    id: 'special-pool-1',
    question: 'What is Zone 0 in a swimming pool location?',
    options: [
      'Area outside the pool',
      'Interior of the pool basin',
      'Area within 2m of the pool edge',
      'Changing room area'
    ],
    correctAnswer: 1,
    explanation: 'Zone 0 is the interior of the pool basin where water is normally present. Only specific SELV equipment (max 12V AC) can be installed.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '702.410.3.4.1'
  },
  {
    id: 'special-pool-2',
    question: 'What is the maximum voltage allowed for equipment in Zone 0 of a swimming pool?',
    options: [
      '25V AC',
      '12V AC',
      '50V AC',
      '110V AC'
    ],
    correctAnswer: 1,
    explanation: 'Zone 0 permits only SELV equipment with a maximum of 12V AC rms or 30V ripple-free DC, with the safety source located outside zones 0, 1, and 2.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '702.410.3.4.1'
  },
  {
    id: 'special-pool-3',
    question: 'What is the extent of Zone 1 in a swimming pool installation?',
    options: [
      'Limited to pool basin only',
      'From floor to 2.5m above floor, within 2m from edge of Zone 0',
      'Entire pool hall',
      'Changing rooms only'
    ],
    correctAnswer: 1,
    explanation: 'Zone 1 extends from the floor to 2.5m above, within a horizontal distance of 2m from the edge of Zone 0.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '702.32'
  },
  {
    id: 'special-pool-4',
    question: 'What type of RCD protection is required for socket outlets in Zone 2 of a pool installation?',
    options: [
      'No RCD required',
      '300mA RCD',
      '30mA RCD',
      'RCD protection not permitted'
    ],
    correctAnswer: 2,
    explanation: 'All socket outlets in Zone 2 must be protected by a 30mA RCD and be at least 1.25m from Zone 1.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '702.53'
  },
  {
    id: 'special-pool-5',
    question: 'Can a standard 230V socket outlet be installed in Zone 1 of a pool?',
    options: [
      'Yes, with 30mA RCD',
      'Yes, if IP rating is adequate',
      'No, not permitted in Zone 1',
      'Yes, if RCBO protected'
    ],
    correctAnswer: 2,
    explanation: 'Socket outlets are not permitted in Zone 0 or Zone 1. They may only be installed in Zone 2 or outside the zones.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '702.53'
  },

  // Medical Locations
  {
    id: 'special-medical-1',
    question: 'What defines a Group 2 medical location?',
    options: [
      'Ordinary patient treatment rooms',
      'Locations where loss of supply could cause danger to life',
      'Storage areas',
      'Staff facilities'
    ],
    correctAnswer: 1,
    explanation: 'Group 2 medical locations are where loss of supply could cause danger to life, such as operating theatres, intensive care units.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '710.1'
  },
  {
    id: 'special-medical-2',
    question: 'What is the purpose of a medical IT system in Group 2 medical locations?',
    options: [
      'To provide internet connectivity',
      'To ensure continuity of supply during a first fault to earth',
      'To reduce energy costs',
      'To power medical computers'
    ],
    correctAnswer: 1,
    explanation: 'Medical IT systems provide unearthed supply allowing continuation of treatment during a first earth fault, protecting patients from electric shock.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '710.411.6'
  },
  {
    id: 'special-medical-3',
    question: 'What is the maximum earth leakage current for a socket outlet in a Group 2 medical location patient environment?',
    options: [
      '0.5mA',
      '3.5mA',
      '10mA',
      '30mA'
    ],
    correctAnswer: 0,
    explanation: 'Socket outlets in the patient environment of Group 2 locations must have earth leakage current not exceeding 0.5mA to protect cardiac patients.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '710.413.1.5'
  },

  // Photovoltaic Installations
  {
    id: 'special-pv-1',
    question: 'Why is DC isolation required for photovoltaic installations?',
    options: [
      'To reduce energy costs',
      'To allow safe maintenance and firefighting by disconnecting DC side',
      'To improve efficiency',
      'Not required'
    ],
    correctAnswer: 1,
    explanation: 'DC isolation allows safe disconnection of the PV array from the inverter for maintenance and provides firefighter safety.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '712.537.2.1'
  },
  {
    id: 'special-pv-2',
    question: 'Where must DC cables from PV arrays to inverters be installed?',
    options: [
      'Any convenient route',
      'As short as practicable, avoiding living areas, minimising fire risk',
      'Underground only',
      'In metal conduit'
    ],
    correctAnswer: 1,
    explanation: 'DC cables should be as short as practicable, avoiding living areas where possible to minimise fire risk from DC arc faults.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '712.522.8.3'
  },
  {
    id: 'special-pv-3',
    question: 'What type of RCD protection is NOT suitable for PV installations?',
    options: [
      'Type B RCD',
      'Type AC RCD',
      'Type A RCD',
      'Type F RCD'
    ],
    correctAnswer: 1,
    explanation: 'Type AC RCDs are unsuitable as inverters produce DC residual currents. Type A minimum required, Type B preferred for smooth DC component.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '712.531.2'
  },
  {
    id: 'special-pv-4',
    question: 'At what voltage do PV DC circuits pose a direct contact shock risk?',
    options: [
      '12V DC',
      '50V DC',
      '120V DC and above',
      '1000V DC'
    ],
    correctAnswer: 2,
    explanation: 'PV DC circuits at 120V DC and above pose direct contact electric shock risk and require appropriate protection measures.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '712.410.3.6'
  },
  {
    id: 'special-pv-5',
    question: 'Why are overvoltage protection devices (SPDs) recommended for PV installations?',
    options: [
      'To reduce electricity bills',
      'To protect against lightning-induced surges to DC and AC sides',
      'To improve efficiency',
      'To comply with warranty requirements only'
    ],
    correctAnswer: 1,
    explanation: 'SPDs protect against lightning and switching overvoltages on both DC (PV side) and AC (grid connection) sides of the system.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '712.443'
  },

  // Agricultural & Horticultural Premises
  {
    id: 'special-ag-1',
    question: 'Why are agricultural premises considered high-risk locations?',
    options: [
      'High energy costs',
      'Presence of livestock, conductive surfaces, moisture, corrosive substances',
      'Remote locations only',
      'Large power requirements'
    ],
    correctAnswer: 1,
    explanation: 'Agricultural premises present increased risks due to livestock, conductive surfaces (metal structures), moisture, dust, and corrosive substances.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '705.1'
  },
  {
    id: 'special-ag-2',
    question: 'What is the maximum disconnection time for socket outlets in agricultural locations?',
    options: [
      '5 seconds',
      '0.4 seconds',
      '0.2 seconds',
      '1 second'
    ],
    correctAnswer: 1,
    explanation: 'Socket outlets up to 32A in agricultural premises require 30mA RCD protection and 0.4 second maximum disconnection time.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '705.411.1'
  },
  {
    id: 'special-ag-3',
    question: 'What supplementary equipotential bonding is required in livestock areas?',
    options: [
      'None required',
      'Bonding of exposed and extraneous conductive parts accessible to livestock',
      'Main bonding only',
      'Bonding of metal structures only'
    ],
    correctAnswer: 1,
    explanation: 'All exposed and extraneous conductive parts accessible to livestock must be bonded to reduce shock risk from lower body resistance of animals.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '705.415.2.1'
  },

  // Caravans & Motor Caravans
  {
    id: 'special-caravan-1',
    question: 'What is the maximum rating of overcurrent protective device for a caravan pitch socket?',
    options: [
      '6A',
      '16A',
      '32A',
      '63A'
    ],
    correctAnswer: 1,
    explanation: 'Caravan pitch socket outlets must be rated at 16A maximum and protected by individual 30mA RCD.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '708.553.1.13'
  },
  {
    id: 'special-caravan-2',
    question: 'What type of cable must be used for the connection between caravan pitch socket and caravan?',
    options: [
      'Standard flex',
      'H07RN-F flexible cable minimum',
      'PVC twin and earth',
      'Any outdoor cable'
    ],
    correctAnswer: 1,
    explanation: 'Connections must use flexible cable type H07RN-F or equivalent to withstand outdoor conditions, movement, and mechanical stress.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '721.521.2'
  },
  {
    id: 'special-caravan-3',
    question: 'What protective measures must be provided for caravan pitch supplies?',
    options: [
      'MCB protection only',
      '30mA RCD and overcurrent protection',
      'Main switch only',
      'Isolator only'
    ],
    correctAnswer: 1,
    explanation: 'Each caravan pitch supply must have individual 30mA RCD protection and appropriate overcurrent protection (typically 16A MCB).',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '708.415.1'
  },

  // EV Charging Installations
  {
    id: 'special-ev-1',
    question: 'What type of RCD is required for electric vehicle charging points?',
    options: [
      'Type AC',
      'Type A or Type B',
      'Type S',
      'No RCD required'
    ],
    correctAnswer: 1,
    explanation: 'EV charging requires Type A RCD minimum (Type B preferred) due to DC leakage currents from vehicle charging systems.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '722.531.2'
  },
  {
    id: 'special-ev-2',
    question: 'What is the minimum rating for a domestic EV charging point circuit?',
    options: [
      '16A',
      '20A',
      '32A',
      '40A'
    ],
    correctAnswer: 2,
    explanation: 'Domestic EV charging points typically require 32A dedicated circuit for Mode 3 charging (7.4kW single-phase).',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '722.311'
  },
  {
    id: 'special-ev-3',
    question: 'Why must EV charging points have their own dedicated circuit?',
    options: [
      'To reduce costs',
      'To prevent prolonged high loads affecting other circuits and ensure safe operation',
      'Not required',
      'For aesthetic reasons'
    ],
    correctAnswer: 1,
    explanation: 'Dedicated circuits prevent prolonged high loads affecting other circuits and ensure proper cable sizing for continuous current demand.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '722.311'
  },
  {
    id: 'special-ev-4',
    question: 'What earthing arrangement check is essential for EV charging installations?',
    options: [
      'No earth required',
      'Verify TN-S or TN-C-S system and Ze; TT systems require special consideration',
      'Visual check only',
      'Earth electrode resistance only'
    ],
    correctAnswer: 1,
    explanation: 'TN-S or TN-C-S preferred. TT systems require careful assessment. PME earth may require additional protection due to lost neutral risks.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '722.411'
  },

  // =============== ADVANCED CALCULATIONS ===============

  {
    id: 'calc-advanced-1',
    question: 'A 100m three-phase circuit uses 10mm² copper cable. With mV/A/m of 4.4, what is voltage drop at 40A per phase?',
    options: [
      '8.8V',
      '17.6V',
      '35.2V',
      '44V'
    ],
    correctAnswer: 1,
    explanation: 'Voltage drop = mV/A/m × Load × Length / 1000 = 4.4 × 40 × 100 / 1000 = 17.6V. Must not exceed 5% of 400V (20V).',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '525'
  },
  {
    id: 'calc-advanced-2',
    question: 'A circuit has R1 = 0.8Ω and R2 = 1.3Ω at 20°C. What is R1+R2 at 70°C conductor temperature?',
    options: [
      '2.1Ω',
      '2.52Ω',
      '2.73Ω',
      '3.15Ω'
    ],
    correctAnswer: 1,
    explanation: 'Apply correction factor: (230 + 70) / (230 + 20) = 1.2. R1+R2 at 70°C = 2.1 × 1.2 = 2.52Ω for copper conductors.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'calc-advanced-3',
    question: 'A 16mm² cable carries 60A. With grouped in conduit (0.7) and 35°C ambient (0.94), what is effective capacity?',
    options: [
      '73A',
      '91A',
      '65.8A',
      '58A'
    ],
    correctAnswer: 2,
    explanation: 'Nominal capacity 100A × 0.7 (grouping) × 0.94 (temperature) = 65.8A. This exceeds 60A load, so acceptable.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '523'
  },
  {
    id: 'calc-advanced-4',
    question: 'Calculate the design current for a 15kW three-phase motor at 400V with 0.85 power factor and 90% efficiency:',
    options: [
      '25.3A',
      '28.3A',
      '30.6A',
      '35A'
    ],
    correctAnswer: 1,
    explanation: 'Ib = P / (√3 × U × pf × efficiency) = 15000 / (√3 × 400 × 0.85 × 0.9) = 28.3A per phase.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '311'
  },
  {
    id: 'calc-advanced-5',
    question: 'A TN-S system has Ze = 0.35Ω. Circuit R1+R2 = 0.85Ω. What is maximum Zs value?',
    options: [
      '0.35Ω',
      '0.85Ω',
      '1.20Ω',
      '2.40Ω'
    ],
    correctAnswer: 2,
    explanation: 'Zs = Ze + (R1 + R2) = 0.35 + 0.85 = 1.20Ω. This must not exceed the maximum Zs for the protective device.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'calc-advanced-6',
    question: 'A 50m ring final circuit uses 2.5/1.5mm² cable. R1 end-to-end = 1.48Ω, Rn = 1.48Ω, R2 = 2.46Ω. Is ring intact?',
    options: [
      'No, values too high',
      'Yes, values indicate complete ring',
      'Cannot determine',
      'No, R2 should equal R1'
    ],
    correctAnswer: 1,
    explanation: 'End-to-end readings approximately correct for 100m total length. R1+R2 at origin should be (1.48+2.46)/4 = 0.985Ω indicating intact ring.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'calc-advanced-7',
    question: 'Calculate minimum CSA for a 12kW shower, 45m run, max 5% drop on 230V, copper conductors (18mV/A/m):',
    options: [
      '6mm²',
      '10mm²',
      '16mm²',
      '25mm²'
    ],
    correctAnswer: 1,
    explanation: 'I = 12000/230 = 52.2A. Max drop = 11.5V. CSA = mV/A/m × I × L / drop = 18 × 52.2 × 45 / 11.5 = 3667, so 10mm² minimum.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '525'
  },

  // =============== COMPLEX FAULT-FINDING SCENARIOS ===============

  {
    id: 'fault-complex-1',
    question: 'An RCD trips only when a specific appliance is used. All others work. What is the likely fault?',
    options: [
      'RCD is faulty',
      'Earth fault in the specific appliance or its supply flex',
      'Circuit overload',
      'Main earthing fault'
    ],
    correctAnswer: 1,
    explanation: 'If RCD trips only with one appliance, the fault is in that appliance (earth leakage to exposed conductive parts or flex damage).',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'fault-complex-2',
    question: 'Lights dim when large load switches on. Circuit breakers do not trip. What is probable cause?',
    options: [
      'Inadequate earthing',
      'Excessive voltage drop due to undersized cables or loose connections',
      'RCD fault',
      'Overload'
    ],
    correctAnswer: 1,
    explanation: 'Dimming without tripping indicates excessive voltage drop from undersized cables, loose connections, or high Ze causing voltage drop.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '525'
  },
  {
    id: 'fault-complex-3',
    question: 'MCB trips immediately on closing. Insulation test shows >200MΩ. What should be investigated?',
    options: [
      'Insulation resistance',
      'Short circuit between live conductors (L-N fault)',
      'Earth fault',
      'Overload'
    ],
    correctAnswer: 1,
    explanation: 'High insulation but immediate MCB trip indicates L-N short circuit. Insulation test between L-N would not detect this.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612'
  },
  {
    id: 'fault-complex-4',
    question: 'A socket ring shows R1+R2 at midpoint is same as at origin. What fault exists?',
    options: [
      'Perfect ring circuit',
      'Broken ring - operating as radial circuit',
      'Excellent conductivity',
      'No fault detected'
    ],
    correctAnswer: 1,
    explanation: 'In intact ring, midpoint R1+R2 should be approximately 1/4 of origin value. Equal readings indicate broken ring.',
    category: 'Continuity Testing',
    difficulty: 'Advanced',
    regulation: '612.2.2'
  },
  {
    id: 'fault-complex-5',
    question: 'Measured Zs = 1.8Ω, Ze = 0.4Ω. Circuit R1+R2 = 0.6Ω. What is indicated?',
    options: [
      'All values correct',
      'High resistance in circuit protective conductor (poor connection)',
      'Test equipment fault',
      'Normal readings'
    ],
    correctAnswer: 1,
    explanation: 'Zs should equal Ze + (R1+R2) = 1.0Ω. Measured 1.8Ω indicates additional resistance (poor connection) in protective conductor.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'fault-complex-6',
    question: 'Insulation test reads 0.5MΩ on one circuit. After disconnecting loads, reads >200MΩ. What was the issue?',
    options: [
      'Cable fault',
      'Connected equipment with filters/capacitors affecting reading',
      'Moisture ingress',
      'Test equipment error'
    ],
    correctAnswer: 1,
    explanation: 'Equipment containing filters, capacitors, or surge protectors create alternative current paths giving false low readings.',
    category: 'Insulation Testing',
    difficulty: 'Intermediate',
    regulation: '612.3.1'
  },
  {
    id: 'fault-complex-7',
    question: 'Socket outlets on one circuit show no voltage. MCB has not tripped. Test between L-N at board shows 230V. Fault location?',
    options: [
      'Supply fault',
      'Open circuit in live conductor between board and sockets',
      'Earth fault',
      'Neutral fault'
    ],
    correctAnswer: 1,
    explanation: 'Voltage at board but not at outlets with MCB closed indicates open circuit (broken conductor or loose connection) in live conductor.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '612'
  },
  {
    id: 'fault-complex-8',
    question: 'RCD trips randomly, especially in wet weather. What is most likely cause?',
    options: [
      'Overload',
      'Moisture ingress causing earth leakage in cables or equipment',
      'MCB fault',
      'Voltage fluctuation'
    ],
    correctAnswer: 1,
    explanation: 'Random RCD trips worsening in wet weather indicate moisture ingress causing earth leakage current exceeding RCD threshold.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },

  // =============== AMENDMENT 2:2022 SPECIFIC ===============

  {
    id: 'amd2-1',
    question: 'Under Amendment 2:2022, what is required for consumer units in escape routes?',
    options: [
      'Metal construction',
      'Metal construction or enclosed in cabinet/enclosure constructed of non-combustible material',
      'Plastic acceptable',
      'Fire alarm integration'
    ],
    correctAnswer: 1,
    explanation: 'Consumer units in escape routes must be metal or enclosed in non-combustible material to prevent fire spread.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '421.1.201'
  },
  {
    id: 'amd2-2',
    question: 'What does Amendment 2:2022 require regarding arc fault protection in new domestic installations?',
    options: [
      'Mandatory for all circuits',
      'AFDDs recommended (not mandatory) for socket outlet circuits',
      'Not mentioned',
      'Required for lighting only'
    ],
    correctAnswer: 1,
    explanation: 'AFDDs are recommended for AC final circuits ≤32A supplying socket outlets in domestic premises to reduce fire risk.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '421.1.7'
  },
  {
    id: 'amd2-3',
    question: 'Under Amendment 2:2022, when are SPDs required in buildings?',
    options: [
      'All installations',
      'Where consequences of overvoltage could result in serious injury, loss of life, or public service disruption',
      'Domestic only',
      'Commercial only'
    ],
    correctAnswer: 1,
    explanation: 'SPDs required when overvoltage consequences are serious. Risk assessment determines necessity based on building and supply characteristics.',
    category: 'Visual Inspection',
    difficulty: 'Advanced',
    regulation: '443.4'
  },
  {
    id: 'amd2-4',
    question: 'What update does Amendment 2:2022 make to socket outlet circuits in TT systems?',
    options: [
      'No changes',
      '30mA RCD protection now mandatory for all socket outlets',
      'RCD not required',
      'Applies to outdoor sockets only'
    ],
    correctAnswer: 1,
    explanation: 'All socket outlets rated up to 32A in TT systems must have 30mA RCD protection for enhanced shock protection.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: '411.3.3'
  },

  // =============== PRACTICAL SCENARIOS ===============

  {
    id: 'practical-1',
    question: 'Customer reports electric shock from washing machine. What immediate action should you take?',
    options: [
      'Test the machine',
      'Disconnect machine, test RCD operation, inspect earthing arrangements',
      'Replace machine',
      'Check water supply'
    ],
    correctAnswer: 1,
    explanation: 'Immediate safety priority: disconnect appliance, verify RCD protection works, check earthing and bonding before any repairs.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '131.3'
  },
  {
    id: 'practical-2',
    question: 'During EICR, you find aluminium cables terminated in brass terminals. What code?',
    options: [
      'C1 - Danger present',
      'C2 - Potentially dangerous',
      'C3 - Improvement recommended',
      'Satisfactory'
    ],
    correctAnswer: 1,
    explanation: 'Dissimilar metals create galvanic corrosion, increasing resistance and fire risk. Code C2 requires remedial action.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '526.2'
  },
  {
    id: 'practical-3',
    question: 'You discover no main protective bonding to gas or water. Property has TN-C-S supply. What code?',
    options: [
      'C3',
      'C2',
      'C1 - Danger present, requires immediate action',
      'Satisfactory'
    ],
    correctAnswer: 2,
    explanation: 'Missing main protective bonding in TN-C-S system presents immediate danger of electric shock and must be coded C1.',
    category: 'Continuity Testing',
    difficulty: 'Intermediate',
    regulation: '411.3.1.2'
  },
  {
    id: 'practical-4',
    question: 'Installing shower circuit. Customer wants to use existing 6mm² cable run. Shower is 9.5kW. Is this acceptable?',
    options: [
      'Yes, 6mm² suitable',
      'No, requires minimum 10mm² depending on installation method and length',
      'Yes with RCD',
      'No, minimum 16mm² required'
    ],
    correctAnswer: 1,
    explanation: '9.5kW = 41.3A. Depending on installation method, 6mm² may be inadequate. Must check current-carrying capacity and voltage drop.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '523'
  },
  {
    id: 'practical-5',
    question: 'Testing new bathroom installation. Socket outlet discovered 1.8m from bath edge. What action?',
    options: [
      'Acceptable',
      'Remove socket immediately - not permitted within 3m of bath/shower',
      'Add RCD protection',
      'Install IP rated socket'
    ],
    correctAnswer: 1,
    explanation: 'Socket outlets not permitted within 3m horizontal distance of Zone 1 boundary (bath/shower) in bathrooms.',
    category: 'Visual Inspection',
    difficulty: 'Intermediate',
    regulation: '701.512.3'
  },
  {
    id: 'practical-6',
    question: 'Customer wants socket outlet in garage. Existing circuit has 20A Type B MCB. Is socket addition acceptable?',
    options: [
      'Yes, if diversity allows',
      'Must check circuit load, cable capacity, Zs, and voltage drop before adding',
      'No, needs dedicated circuit',
      'Yes, always acceptable'
    ],
    correctAnswer: 1,
    explanation: 'Must verify circuit capacity, cable sizing, earth fault loop impedance, and voltage drop meet requirements for additional load.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '134.1.1'
  },
  {
    id: 'practical-7',
    question: 'Installing outdoor lighting. Customer does not want RCD protection as it "keeps tripping". What is your response?',
    options: [
      'Install without RCD as requested',
      'Explain RCD is mandatory for outdoor circuits; investigate tripping cause',
      'Use higher rated RCD',
      'Install MCB only'
    ],
    correctAnswer: 1,
    explanation: 'RCD protection mandatory for outdoor circuits. Must educate customer and investigate root cause of tripping rather than remove safety feature.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '411.3.3'
  },
  {
    id: 'practical-8',
    question: 'EICR reveals kitchen sockets not RCD protected. Installation pre-dates 17th Edition. What code?',
    options: [
      'Satisfactory - complied when installed',
      'C3 - Improvement recommended',
      'C2 - Potentially dangerous, recommend upgrade',
      'C1 - Danger present'
    ],
    correctAnswer: 2,
    explanation: 'While compliant when installed, lack of RCD protection presents increased risk. Code C2 appropriate for potentially dangerous situation.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: '411.3.3'
  },

  // =============== POLARITY TESTING ===============

  {
    id: 'polarity-advanced-1',
    question: 'During polarity testing, you find phase connected to neutral terminal at socket. What are the safety implications?',
    options: [
      'None - circuit still works',
      'Serious shock risk - appliances energised even when switched off',
      'Minor issue',
      'Only affects efficiency'
    ],
    correctAnswer: 1,
    explanation: 'Reversed polarity means appliances remain live when switched off, presenting serious electric shock and fire risk.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-advanced-2',
    question: 'What is the correct method to verify polarity of a lighting circuit?',
    options: [
      'Visual inspection only',
      'Test between phase and CPC at each point, verify switching in phase conductor',
      'Check voltage at switches',
      'Continuity test only'
    ],
    correctAnswer: 1,
    explanation: 'Polarity verified by testing phase-CPC continuity and confirming all single-pole devices break phase conductor only.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'polarity-advanced-3',
    question: 'Why must polarity testing verify centre contact of ES lampholders connects to phase?',
    options: [
      'For efficiency',
      'To minimise shock risk during lamp changes',
      'For aesthetics',
      'Not required'
    ],
    correctAnswer: 1,
    explanation: 'Centre contact must be phase so it is isolated when lamp removed, reducing shock risk. Outer thread remains earthed.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },

  // =============== PROSPECTIVE FAULT CURRENT (PFC) ===============

  {
    id: 'pfc-advanced-1',
    question: 'Why must prospective fault current (PFC) be measured during testing?',
    options: [
      'To calculate energy bills',
      'To verify protective devices can safely interrupt maximum fault current',
      'To set RCD sensitivity',
      'Not required for domestic'
    ],
    correctAnswer: 1,
    explanation: 'PFC determines maximum current during short circuit. Protective devices must have adequate breaking capacity (kA rating) to interrupt safely.',
    category: 'PFC Testing',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-advanced-2',
    question: 'PFC measured at 8kA. Consumer unit has 6kA rated MCBs. What action required?',
    options: [
      'Acceptable',
      'Replace MCBs with minimum 10kA rated devices',
      'Add RCD protection',
      'Reduce supply current'
    ],
    correctAnswer: 1,
    explanation: 'MCB breaking capacity must exceed maximum PFC. 6kA MCBs inadequate for 8kA PFC - immediate replacement required.',
    category: 'PFC Testing',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-advanced-3',
    question: 'What is typical PFC range for TN-S supply in domestic installation?',
    options: [
      '0.1kA to 0.5kA',
      '1kA to 3kA',
      '10kA to 16kA',
      '20kA to 30kA'
    ],
    correctAnswer: 1,
    explanation: 'TN-S supplies typically provide 1-3kA PFC. TN-C-S generally higher. Important for selecting adequate protective device ratings.',
    category: 'PFC Testing',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-advanced-4',
    question: 'Where should PFC be measured in an installation?',
    options: [
      'At consumer unit main switch only',
      'At origin (consumer unit) and at furthest points of circuits',
      'Not required',
      'At socket outlets only'
    ],
    correctAnswer: 1,
    explanation: 'Measure PFC at origin for main protective device rating, and at circuit ends to verify adequate fault current for ADS.',
    category: 'PFC Testing',
    difficulty: 'Advanced',
    regulation: '612.11'
  },

  // =============== FUNCTIONAL TESTING ===============

  {
    id: 'functional-advanced-1',
    question: 'What must be verified during functional testing of a three-phase motor control circuit?',
    options: [
      'Motor runs only',
      'Correct rotation, overload operation, emergency stop, interlocks',
      'Voltage only',
      'Current draw'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing must verify correct rotation direction, overload protection, emergency stops, and safety interlock operation.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '612.13.1'
  },
  {
    id: 'functional-advanced-2',
    question: 'During functional testing, an isolator is found to be stiff. What action?',
    options: [
      'Leave as is',
      'Record as defect requiring maintenance/replacement',
      'Apply lubricant',
      'Not relevant to testing'
    ],
    correctAnswer: 1,
    explanation: 'Stiff operation indicates wear or fault affecting isolation function. Must be recorded and addressed for safe operation.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.2'
  },
  {
    id: 'functional-advanced-3',
    question: 'What should be verified during functional testing of socket outlets?',
    options: [
      'Voltage present only',
      'Correct polarity, secure fixing, earth continuity, shutter operation',
      'Colour of faceplate',
      'Brand compatibility'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies polarity, mechanical security, earth continuity, protective shutter operation, and switch function.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.1'
  },
  {
    id: 'functional-advanced-4',
    question: 'Why must emergency lighting systems be functionally tested?',
    options: [
      'Not required',
      'To verify operation on mains failure and adequate battery duration',
      'For aesthetics',
      'Once per year only'
    ],
    correctAnswer: 1,
    explanation: 'Emergency lighting must be tested to ensure automatic operation on supply failure and adequate battery backup for safe evacuation.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13.1'
  },

  // =============== CERTIFICATION & DOCUMENTATION ===============

  {
    id: 'cert-advanced-1',
    question: 'What is the maximum time period for periodic inspection of a commercial installation?',
    options: [
      '1 year',
      '5 years',
      '10 years',
      'No maximum - risk-based'
    ],
    correctAnswer: 1,
    explanation: 'Commercial/industrial installations typically require inspection every 5 years, though higher-risk environments may need more frequent inspection.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '621.1'
  },
  {
    id: 'cert-advanced-2',
    question: 'An EICR is required for property rental. Who can issue this document?',
    options: [
      'Any electrician',
      'Qualified and competent person (typically 2391 or equivalent qualified)',
      'Property owner',
      'Letting agent'
    ],
    correctAnswer: 1,
    explanation: 'EICR must be completed by qualified, competent persons with appropriate inspection and testing qualifications (typically 2391 level).',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '621.2'
  },
  {
    id: 'cert-advanced-3',
    question: 'What must be provided to the client upon completion of electrical installation work?',
    options: [
      'Invoice only',
      'Electrical Installation Certificate, minor works certificate, or EICR as appropriate',
      'Verbal confirmation',
      'Photograph of work'
    ],
    correctAnswer: 1,
    explanation: 'Appropriate certification (EIC for new work, MWC for minor works, EICR for inspections) must be provided to demonstrate compliance.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.1'
  },
  {
    id: 'cert-advanced-4',
    question: 'When is a Minor Electrical Installation Works Certificate appropriate?',
    options: [
      'All work',
      'Additions/alterations not requiring design calculations (e.g., socket addition to existing circuit)',
      'New installations only',
      'Never required'
    ],
    correctAnswer: 1,
    explanation: 'Minor Works Certificates cover simple additions/alterations to existing circuits not requiring design work or new circuits.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.4'
  },
  {
    id: 'cert-advanced-5',
    question: 'What must be recorded on Schedule of Test Results for each circuit?',
    options: [
      'Voltage only',
      'All relevant test results: continuity, insulation, polarity, Zs, RCD operation',
      'Visual observations only',
      'Cable colour'
    ],
    correctAnswer: 1,
    explanation: 'Schedule of Test Results must record all applicable test results for each circuit to demonstrate compliance with BS 7671.',
    category: 'Regulations',
    difficulty: 'Intermediate',
    regulation: '631.2'
  },

  // =============== ADDITIONAL ADVANCED TOPICS ===============
  
  {
    id: 'advanced-calc-1',
    question: 'A 3-phase 400V motor with 0.8 power factor draws 50A per phase. What is the total real power consumption?',
    options: [
      '20 kW',
      '27.7 kW',
      '34.6 kW',
      '40 kW'
    ],
    correctAnswer: 1,
    explanation: 'P = √3 × V × I × PF = 1.732 × 400 × 50 × 0.8 = 27,712W = 27.7kW',
    category: 'Calculations',
    difficulty: 'Advanced',
    regulation: 'Appendix 4'
  },
  {
    id: 'advanced-calc-2',
    question: 'Cable run: 45m, voltage drop limit 3%, load 32A at 230V. Maximum resistance per metre?',
    options: [
      '0.076 Ω/m',
      '0.038 Ω/m',
      '0.108 Ω/m',
      '0.054 Ω/m'
    ],
    correctAnswer: 1,
    explanation: 'Max VD = 230V × 0.03 = 6.9V. Total R = 6.9V ÷ 32A = 0.216Ω. R per metre = 0.216Ω ÷ (45m × 2) = 0.0024Ω/m × 2 conductors = 0.038Ω/m',
    category: 'Calculations',
    difficulty: 'Advanced',
    regulation: '525'
  },
  {
    id: 'medical-1',
    question: 'In medical locations Group 2 (operating theatres), what is the maximum touch voltage limit?',
    options: [
      '50V AC',
      '25V AC',
      '12V AC',
      '6V AC'
    ],
    correctAnswer: 1,
    explanation: 'Medical locations Group 2 require reduced touch voltage limit of 25V AC due to increased patient vulnerability during procedures.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '710.411.3.2.2'
  },
  {
    id: 'medical-2',
    question: 'Medical IT systems for Group 2 locations must incorporate what device?',
    options: [
      'RCD with 10mA sensitivity',
      'Insulation Monitoring Device (IMD)',
      'AFDD protection',
      'RCBO on all circuits'
    ],
    correctAnswer: 1,
    explanation: 'Medical IT systems use Insulation Monitoring Devices to continuously monitor insulation resistance without disconnecting supply, critical for life-support equipment.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '710.411.6'
  },
  {
    id: 'solar-1',
    question: 'PV system DC isolator must be positioned where in relation to the inverter?',
    options: [
      'At the inverter DC input only',
      'On both DC and AC sides, accessible without going near PV array',
      'Adjacent to the PV array only',
      'Inside the consumer unit'
    ],
    correctAnswer: 1,
    explanation: 'DC isolators required on both sides for safety, positioned to allow isolation without approaching energised PV array.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '712.537.2.1.5'
  },
  {
    id: 'solar-2',
    question: 'What is the minimum DC insulation resistance for a PV installation at 500V test?',
    options: [
      '0.25 MΩ',
      '0.5 MΩ',
      '1.0 MΩ',
      '2.0 MΩ'
    ],
    correctAnswer: 2,
    explanation: 'PV systems require minimum 1.0 MΩ insulation resistance when tested at 500V DC for safety and proper operation.',
    category: 'Testing',
    difficulty: 'Advanced',
    regulation: '712.612.2'
  },
  {
    id: 'ev-charging-1',
    question: 'EV charging point installed outdoors requires what RCD protection?',
    options: [
      'Type AC 30mA',
      'Type A 30mA',
      'Type B or Type A with 6mA DC protection',
      'No RCD required if Type 2 socket'
    ],
    correctAnswer: 2,
    explanation: 'EV chargers can produce DC fault current. Type B RCD or Type A with additional 6mA DC protection required per Amendment 2.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '722.531.2'
  },
  {
    id: 'ev-charging-2',
    question: 'Mode 3 EV charging point must have what minimum supply rating?',
    options: [
      '13A single phase',
      '16A single phase',
      '32A single or three phase',
      '63A three phase'
    ],
    correctAnswer: 2,
    explanation: 'Mode 3 charging typically requires 32A minimum for effective fast charging, available in single or three-phase configurations.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '722.311'
  },
  {
    id: 'swimming-pool-1',
    question: 'In swimming pool Zone 0, what is the maximum voltage permitted?',
    options: [
      '230V AC',
      '50V AC',
      '25V AC',
      '12V AC SELV only'
    ],
    correctAnswer: 3,
    explanation: 'Zone 0 (inside pool basin) permits only 12V AC SELV with transformer outside zones 0, 1, and 2.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '702.410.3.4'
  },
  {
    id: 'swimming-pool-2',
    question: 'Supplementary bonding in Zone 1 of swimming pools must connect which items?',
    options: [
      'Only metal pool structure',
      'All extraneous-conductive-parts and exposed-conductive-parts',
      'Just the main earthing terminal',
      'Pool lighting only'
    ],
    correctAnswer: 1,
    explanation: 'Zone 1 requires supplementary bonding of all extraneous and exposed conductive parts to minimise potential differences in wet conditions.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '702.415.2'
  },
  {
    id: 'testing-advanced-1',
    question: 'When testing RCD with test button does not trip the device, what should you do?',
    options: [
      'Replace RCD immediately and inform customer',
      'Test using RCD tester at rated current and half-rated current',
      'Increase test current until it trips',
      'Record as fail and move to next circuit'
    ],
    correctAnswer: 0,
    explanation: 'Mechanical test button failure indicates serious RCD fault. Replace immediately as electronic testing cannot verify mechanical integrity.',
    category: 'Testing',
    difficulty: 'Advanced',
    regulation: '643.10'
  },
  {
    id: 'testing-advanced-2',
    question: 'Earth fault loop impedance increases significantly when measured at full operating temperature. What does this indicate?',
    options: [
      'Normal behaviour due to conductor resistance change',
      'Possible high resistance joint or poor connection',
      'Excessive cable length',
      'Incorrect MCB rating'
    ],
    correctAnswer: 1,
    explanation: 'While some increase is normal, significant increase suggests high resistance connection that worsens with heat, posing fire risk.',
    category: 'Testing',
    difficulty: 'Advanced',
    regulation: '643.7'
  },
  {
    id: 'fault-finding-adv-1',
    question: 'RCD trips only when specific 230V appliance is used on multiple different circuits. Most likely cause?',
    options: [
      'Faulty RCD',
      'Appliance has earth leakage fault',
      'Circuit overload',
      'Incorrect wiring'
    ],
    correctAnswer: 1,
    explanation: 'If same appliance trips RCD on multiple circuits, appliance has earth leakage current exceeding RCD rating (typically >30mA).',
    category: 'Fault Finding',
    difficulty: 'Advanced',
    regulation: '531.2'
  },
  {
    id: 'fault-finding-adv-2',
    question: 'Voltage measured between neutral and earth at socket outlet is 8V with no load. What is the most likely cause?',
    options: [
      'Normal voltage drop',
      'Broken neutral conductor',
      'Parallel neutral earth paths',
      'TT system normal operation'
    ],
    correctAnswer: 1,
    explanation: '8V between N-E with no load suggests broken neutral upstream causing supply voltage to appear via earth path. Dangerous fault requiring immediate attention.',
    category: 'Fault Finding',
    difficulty: 'Advanced',
    regulation: '411.4'
  },
  {
    id: 'design-1',
    question: 'Office building with 200 × 18W LED fittings. Applying diversity, what is the design current?',
    options: [
      '15.7A (100% of load)',
      '11.7A (75% diversity)',
      '9.4A (60% diversity)',
      '7.8A (50% diversity)'
    ],
    correctAnswer: 1,
    explanation: 'Lighting circuits typically apply 75% diversity for commercial installations. Total load = 3,600W ÷ 230V = 15.7A × 0.75 = 11.7A',
    category: 'Design',
    difficulty: 'Advanced',
    regulation: 'Appendix 4'
  },
  {
    id: 'design-2',
    question: 'Industrial workshop requires 12 × 16A socket outlets. What minimum size radial circuit breaker is required?',
    options: [
      '32A MCB Type B',
      '50A MCB Type B',
      '63A MCB Type C',
      '80A MCB Type C'
    ],
    correctAnswer: 1,
    explanation: 'Industrial sockets: first 10 at 100% + remainder at 40%. (10 × 16A) + (2 × 16A × 0.4) = 160 + 12.8 = 172.8A diversity applied = 50A adequate.',
    category: 'Design',
    difficulty: 'Advanced',
    regulation: 'Appendix 4'
  },
  {
    id: 'cables-advanced-1',
    question: 'Cable installed in loft space with insulation touching: 70mm thermal insulation, 30°C ambient. What derating factors apply?',
    options: [
      'Ca × Cg only',
      'Ca × Cg × Ci',
      'Cg × Ci only',
      'No derating required'
    ],
    correctAnswer: 1,
    explanation: 'Must apply all relevant factors: Ca (ambient), Cg (grouping if applicable), and Ci (thermal insulation), multiplied together.',
    category: 'Cable Selection',
    difficulty: 'Advanced',
    regulation: '523.9'
  },
  {
    id: 'cables-advanced-2',
    question: '10mm² twin and earth cable clipped direct has current-carrying capacity of 63A at 30°C. What is capacity at 45°C ambient?',
    options: [
      '63A (unchanged)',
      '52A',
      '48A',
      '44A'
    ],
    correctAnswer: 2,
    explanation: 'Correction factor for 45°C ambient = 0.76. New capacity = 63A × 0.76 = 47.88A ≈ 48A',
    category: 'Cable Selection',
    difficulty: 'Advanced',
    regulation: '523.1'
  },
  {
    id: 'protection-advanced-1',
    question: 'AFDD (Arc Fault Detection Device) is mandatory for which circuit types under Amendment 2?',
    options: [
      'All final circuits',
      'Single-phase AC final circuits ≤32A in certain premises',
      'Only lighting circuits',
      'Three-phase circuits only'
    ],
    correctAnswer: 1,
    explanation: 'Amendment 2:2022 requires AFDDs for single-phase AC final circuits up to 32A in houses (HMOs), student accommodation, and care homes.',
    category: 'Protection',
    difficulty: 'Advanced',
    regulation: '421.1.7'
  },
  {
    id: 'protection-advanced-2',
    question: 'SPD (Surge Protection Device) Type 2 must be installed when building has what risk factor?',
    options: [
      'All buildings require SPDs',
      'Buildings in high lightning areas or with sensitive equipment',
      'Only commercial buildings',
      'Agricultural buildings only'
    ],
    correctAnswer: 1,
    explanation: 'SPD Type 2 required where risk assessment identifies: high lightning activity (AQ > 25), sensitive equipment, or external incoming services from overhead lines.',
    category: 'Protection',
    difficulty: 'Advanced',
    regulation: '443.4'
  },
  {
    id: 'earthing-advanced-1',
    question: 'TT system with Ra = 85Ω and RCD rated 30mA. What is maximum earth fault current?',
    options: [
      '230V ÷ 85Ω = 2.7A',
      '50V ÷ 85Ω = 0.59A',
      '150V ÷ 85Ω = 1.76A',
      'Depends on load current'
    ],
    correctAnswer: 0,
    explanation: 'Maximum earth fault current = supply voltage ÷ Ra = 230V ÷ 85Ω = 2.7A, well above RCD rating ensuring operation.',
    category: 'Earthing',
    difficulty: 'Advanced',
    regulation: '411.5'
  },
  {
    id: 'earthing-advanced-2',
    question: 'PME (TN-C-S) supply prohibited for what installation types?',
    options: [
      'Any domestic installation',
      'Caravans, boats, petrol stations, mobile structures',
      'Commercial buildings only',
      'Industrial installations'
    ],
    correctAnswer: 1,
    explanation: 'PME prohibited where lost neutral could create dangerous potential on exposed metalwork: caravans, boats, petrol stations, and certain mobile installations.',
    category: 'Earthing',
    difficulty: 'Advanced',
    regulation: '411.4'
  },
  {
    id: 'amendment2-1',
    question: 'Under Amendment 2, consumer units in domestic premises must meet what fire resistance standard?',
    options: [
      'Non-combustible or enclosed in cabinet meeting BS EN 61439-3',
      'Metal enclosure only',
      'Any material acceptable',
      'Fire-resistant plastic to BS 5839'
    ],
    correctAnswer: 0,
    explanation: 'Amendment 2 requires consumer units to be non-combustible or enclosed in cabinet/enclosure complying with BS EN 61439-3 for fire safety.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '421.1.201'
  },
  {
    id: 'amendment2-2',
    question: 'Amendment 2 requirements for AFDD protection apply to which new installations?',
    options: [
      'All installations from 2022',
      'New or altered dwellings, HMOs, student accommodation, care homes',
      'Commercial buildings only',
      'Agricultural installations'
    ],
    correctAnswer: 1,
    explanation: 'AFDD requirements apply specifically to: single-phase AC final circuits ≤32A in dwellings, HMOs, student accommodation, and care homes.',
    category: 'Regulations',
    difficulty: 'Advanced',
    regulation: '421.1.7'
  },
  {
    id: 'practical-scenario-1',
    question: 'Customer requests outdoor hot tub installation. Main concerns from BS 7671 perspective?',
    options: [
      'Circuit capacity only',
      'Zone classification, RCD protection, bonding, IP rating',
      'Cable size only',
      'Consumer unit location'
    ],
    correctAnswer: 1,
    explanation: 'Hot tubs create special location requiring: zone classification (similar to bathrooms), 30mA RCD, supplementary bonding, appropriate IP ratings for equipment.',
    category: 'Special Locations',
    difficulty: 'Advanced',
    regulation: '702'
  },
  {
    id: 'practical-scenario-2',
    question: 'EICR reveals mixed RCD types protecting circuits with EV charger. What action required?',
    options: [
      'No action if RCDs test correctly',
      'Replace Type AC RCDs with Type A or B',
      'Add additional Type AC RCD',
      'Remove RCD protection'
    ],
    correctAnswer: 1,
    explanation: 'EV chargers produce DC fault current. Must use Type B RCD or Type A with additional 6mA DC protection. Type AC RCDs ineffective for DC faults.',
    category: 'Testing',
    difficulty: 'Advanced',
    regulation: '722.531.2'
  },
  {
    id: 'domestic-circuits-1',
    question: 'Cooker circuit protected by 32A MCB Type B. Maximum floor area the circuit can serve per diversity?',
    options: [
      'Unlimited - based on load only',
      '100m²',
      '50m²',
      'Diversity does not apply to cooker circuits'
    ],
    correctAnswer: 0,
    explanation: 'Cooker circuit sizing based on load diversity calculation: first 10A + 30% remainder + 5A if socket outlet, not floor area.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: 'Appendix 4'
  },
  {
    id: 'domestic-circuits-2',
    question: 'Kitchen with 5 × 13A double socket outlets on 32A ring. Customer wants to add 3 more doubles. Acceptable?',
    options: [
      'Yes, ring can support unlimited sockets',
      'No, exceeds socket limit per ring',
      'Assess floor area and load - likely acceptable if within 100m²',
      'Yes, if RCD protected'
    ],
    correctAnswer: 2,
    explanation: 'Ring circuits limited to 100m² floor area, unlimited sockets. Assess whether 8 doubles likely to exceed 32A with diversity applied. Usually acceptable in domestic kitchen.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: 'Appendix 15'
  },
  {
    id: 'cables-fire-1',
    question: 'Fire alarm cable in escape route must meet what standard?',
    options: [
      'Standard PVC cable acceptable',
      'LSF cable (Low Smoke and Fume)',
      'FP200 or equivalent fire-resistant cable',
      'Any red-coloured cable'
    ],
    correctAnswer: 2,
    explanation: 'Fire alarm circuits in escape routes require fire-resistant cables (FP200, FP400, or equivalent) to maintain circuit integrity during fire.',
    category: 'Cable Selection',
    difficulty: 'Advanced',
    regulation: '560.8'
  },
  {
    id: 'cables-fire-2',
    question: 'Emergency lighting circuit requires cable with what fire performance?',
    options: [
      'Standard twin and earth',
      'Fire-resistant cable maintaining integrity for specified duration',
      'LSF cable only',
      'Armoured cable'
    ],
    correctAnswer: 1,
    explanation: 'Emergency lighting must operate during fire evacuation, requiring fire-resistant cables maintaining circuit integrity (typically 1-3 hours).',
    category: 'Cable Selection',
    difficulty: 'Advanced',
    regulation: '560.8'
  },
  {
    id: 'harmonics-1',
    question: 'Excessive harmonic currents in installation primarily affect which conductor?',
    options: [
      'Phase conductors',
      'Earth conductor',
      'Neutral conductor',
      'CPC'
    ],
    correctAnswer: 2,
    explanation: 'Third harmonic and multiples (triplen harmonics) from non-linear loads add arithmetically in neutral, potentially overloading it even when phase currents balanced.',
    category: 'Design',
    difficulty: 'Advanced',
    regulation: '523.6.3'
  },
  {
    id: 'harmonics-2',
    question: 'Office with many computer workstations (>50% harmonic-producing loads). What neutral conductor sizing required?',
    options: [
      'Same size as phase conductors',
      'Neutral may be reduced',
      'Neutral must be same size or larger than phase',
      'Neutral not required'
    ],
    correctAnswer: 2,
    explanation: 'Where harmonic-producing loads exceed 35% of total, neutral may carry more current than phases due to triplen harmonics. Neutral must not be reduced.',
    category: 'Design',
    difficulty: 'Advanced',
    regulation: '523.6.3'
  },
  {
    id: 'voltage-drop-1',
    question: '50m cable run, 32A load. Voltage drop = 9V. Does this comply for lighting circuit?',
    options: [
      'Yes, within 3% limit (6.9V)',
      'No, exceeds 3% limit (6.9V)',
      'Yes, within 5% limit (11.5V)',
      'Acceptable if RCD protected'
    ],
    correctAnswer: 1,
    explanation: 'Lighting circuits limited to 3% = 6.9V. Measured 9V exceeds limit. However, if this is not lighting, 5% (11.5V) may apply.',
    category: 'Calculations',
    difficulty: 'Intermediate',
    regulation: '525'
  },
  {
    id: 'voltage-drop-2',
    question: 'How is voltage drop measured during periodic inspection?',
    options: [
      'Calculate from cable data',
      'Measure at origin and end of circuit under load',
      'Use earth fault loop impedance tester',
      'Not required during EICR'
    ],
    correctAnswer: 1,
    explanation: 'Voltage drop verified by measuring voltage at origin and circuit endpoint simultaneously with circuit under normal load. Difference must not exceed limits.',
    category: 'Testing',
    difficulty: 'Intermediate',
    regulation: '643.11'
  },
  {
    id: 'busbar-systems-1',
    question: 'Busbar trunking system for industrial installation requires what protection?',
    options: [
      'No protection needed - self-protected',
      'Overcurrent and short-circuit protection at origin',
      'RCD protection only',
      'Fuses in each busbar tap-off'
    ],
    correctAnswer: 1,
    explanation: 'Busbar systems require overcurrent protection at origin. Tap-off points may have additional protection depending on connected load.',
    category: 'Protection',
    difficulty: 'Advanced',
    regulation: '521.4'
  },
  {
    id: 'data-cables-1',
    question: 'Data cables (Cat 6) installed in same trunking as 230V power cables. Acceptable?',
    options: [
      'Yes, no segregation required',
      'No, requires minimum separation or physical barrier',
      'Yes, if screened data cables used',
      'Yes, if power cables RCD protected'
    ],
    correctAnswer: 1,
    explanation: 'Band I (telecoms/data) and Band II (LV power) circuits require segregation: separate enclosure, minimum spacing, or fixed partition per BS 7671.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: '528.1'
  },
  {
    id: 'data-cables-2',
    question: 'Minimum separation distance when data and power cables run parallel without barrier?',
    options: [
      '50mm',
      '100mm',
      '150mm',
      '300mm'
    ],
    correctAnswer: 3,
    explanation: 'Band I and Band II cables require 300mm separation when run in parallel without physical barrier to prevent interference and maintain safety.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: '528.1'
  },
  {
    id: 'maintenance-1',
    question: 'Installation supplies life-support equipment. Maximum EICR interval?',
    options: [
      '10 years',
      '5 years',
      '1 year or as recommended by competent person',
      '6 months'
    ],
    correctAnswer: 2,
    explanation: 'Critical installations (life-support, safety systems) require inspection at intervals determined by risk assessment, typically annually or more frequently.',
    category: 'Testing',
    difficulty: 'Intermediate',
    regulation: '621.1'
  },
  {
    id: 'maintenance-2',
    question: 'Industrial installation with harsh environment (chemicals, heat, moisture). Recommended EICR interval?',
    options: [
      '10 years (standard)',
      '5 years',
      '3 years or less based on risk assessment',
      '1 year'
    ],
    correctAnswer: 2,
    explanation: 'Harsh environments accelerate deterioration. Risk assessment typically recommends 1-3 year intervals for inspection and testing.',
    category: 'Testing',
    difficulty: 'Intermediate',
    regulation: '621.1'
  },
  {
    id: 'lighting-design-1',
    question: 'LED lighting circuit requires what special consideration for MCB selection?',
    options: [
      'Higher rated MCB needed',
      'Type D MCB recommended',
      'Consider inrush current; Type B usually adequate',
      'No special consideration'
    ],
    correctAnswer: 2,
    explanation: 'LED drivers may have higher inrush current at switch-on. Consider total inrush of multiple fittings, but Type B typically adequate for most installations.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: '533.2'
  },
  {
    id: 'lighting-design-2',
    question: 'External lighting circuit controlled by photocell. Additional protection requirements?',
    options: [
      'None beyond standard circuit protection',
      '30mA RCD as outdoor circuit',
      'AFDD protection',
      'Reduced MCB rating'
    ],
    correctAnswer: 1,
    explanation: 'Outdoor circuits require 30mA RCD protection regardless of control method. Photocell does not eliminate this requirement.',
    category: 'Design',
    difficulty: 'Intermediate',
    regulation: '411.3.3'
  },
  {
    id: 'generators-1',
    question: 'Standby generator installation requires what earthing arrangement when connected to TN-S system?',
    options: [
      'Use existing DNO earth',
      'Separate TT earth electrode for generator',
      'PME earthing',
      'No earth required for standby supply'
    ],
    correctAnswer: 1,
    explanation: 'Standby generators require independent earth electrode (TT system) to ensure safe operation when mains supply lost. Cannot rely on DNO earth.',
    category: 'Earthing',
    difficulty: 'Advanced',
    regulation: '551.6'
  },
  {
    id: 'generators-2',
    question: 'Changeover switch between mains and generator must prevent what scenario?',
    options: [
      'Generator overload',
      'Parallel operation (both sources connected)',
      'Voltage drop',
      'Neutral current'
    ],
    correctAnswer: 1,
    explanation: 'Changeover must be break-before-make to prevent paralleling generator with mains supply, which could cause damage, instability, or safety hazards.',
    category: 'Design',
    difficulty: 'Advanced',
    regulation: '551.6'
  },
  {
    id: 'isolation-1',
    question: 'Motor control circuit requires how many isolation points?',
    options: [
      'One at motor',
      'One at motor, one at control panel',
      'Isolation at motor sufficient if locally controlled',
      'No isolation required'
    ],
    correctAnswer: 1,
    explanation: 'Motors require isolation at both motor location and control position for safe maintenance, preventing unexpected re-energisation.',
    category: 'Protection',
    difficulty: 'Intermediate',
    regulation: '537.2'
  },
  {
    id: 'parallel-cables-1',
    question: 'Two 10mm² cables in parallel to increase current capacity. What factors must be considered?',
    options: [
      'Simply double the capacity',
      'Equal length, equal impedance, appropriate termination',
      'Different cable routes acceptable',
      'One cable can be smaller CSA'
    ],
    correctAnswer: 1,
    explanation: 'Parallel cables must have equal length, equal impedance, same installation method, and proper terminations to ensure balanced current sharing.',
    category: 'Cable Selection',
    difficulty: 'Advanced',
    regulation: '523.7'
  },
  {
    id: 'agricultural-1',
    question: 'Agricultural installation socket outlets require what RCD rating?',
    options: [
      '100mA',
      '30mA',
      '300mA',
      'No RCD required'
    ],
    correctAnswer: 1,
    explanation: 'Agricultural installations are high-risk environments. Socket outlets require 30mA RCD protection due to increased shock risk from moisture and livestock.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '705.411.1'
  },
  {
    id: 'agricultural-2',
    question: 'Supplementary bonding in agricultural buildings must include which items?',
    options: [
      'Only electrical equipment',
      'All metal structural parts, equipment, and extraneous parts',
      'Just water pipes',
      'Animal housing only'
    ],
    correctAnswer: 1,
    explanation: 'Agricultural locations require extensive supplementary bonding of all accessible metalwork, structural parts, and equipment to protect livestock and personnel.',
    category: 'Special Locations',
    difficulty: 'Intermediate',
    regulation: '705.415.2.1'
  },
  {
    id: 'discrimination-1',
    question: 'Consumer unit has 80A main switch, 32A MCB for ring final, 6A MCB for lighting. MCB characteristics for discrimination?',
    options: [
      'All Type B acceptable',
      'Main Type C, circuits Type B',
      'All same type - discrimination by rating',
      'Lighting Type D to prevent nuisance tripping'
    ],
    correctAnswer: 2,
    explanation: 'Discrimination achieved primarily through different ratings with same MCB type. Type B typical for domestic. Main switch rating coordinates with circuit MCBs.',
    category: 'Protection',
    difficulty: 'Intermediate',
    regulation: '536'
  },
  {
    id: 'low-voltage-1',
    question: 'SELV circuit maximum voltage under fault conditions?',
    options: [
      '50V AC',
      '120V AC',
      '25V AC',
      'Must not exceed ELV limits'
    ],
    correctAnswer: 3,
    explanation: 'SELV (Separated Extra Low Voltage) must not exceed ELV limits (50V AC / 120V DC) even under single fault condition, ensuring safety.',
    category: 'Protection',
    difficulty: 'Intermediate',
    regulation: '414.1'
  },
  {
    id: 'temporary-installations-1',
    question: 'Temporary electrical installation for construction site requires EICR interval of?',
    options: [
      '10 years',
      '5 years',
      '3 months',
      '1 month or after modification'
    ],
    correctAnswer: 2,
    explanation: 'Construction sites are harsh, high-risk environments. Installations require inspection every 3 months minimum due to rapid deterioration and frequent changes.',
    category: 'Testing',
    difficulty: 'Intermediate',
    regulation: '621.1'
  },
  {
    id: 'bathroom-zones-1',
    question: 'IP rating required for light fitting in Zone 1 (above bath/shower)?',
    options: [
      'IPX4 (splash-proof)',
      'IPX5 (jet-proof)',
      'IPX7 (immersion-proof)',
      'IP20 (standard)'
    ],
    correctAnswer: 0,
    explanation: 'Zone 1 requires minimum IPX4 (splash-proof) due to exposure to water splashing from showering/bathing.',
    category: 'Special Locations',
    difficulty: 'Beginner',
    regulation: '701.512.2'
  },
  {
    id: 'functional-switching-1',
    question: 'Functional switching device must be rated for what duty?',
    options: [
      'Normal load current only',
      'Isolation duty',
      'Emergency switching',
      'Fault current interruption'
    ],
    correctAnswer: 0,
    explanation: 'Functional switches (standard light switches, etc.) rated only for normal load switching, not isolation or fault interruption.',
    category: 'Protection',
    difficulty: 'Beginner',
    regulation: '537.5'
  },

  // =============== ADDITIONAL INSULATION RESISTANCE QUESTIONS ===============
  {
    id: 'insulation-res-50',
    question: 'When testing insulation resistance on circuits with SPDs, what precaution must be taken?',
    options: [
      'Test at 250V DC only',
      'Disconnect or short out SPDs before testing',
      'Increase test voltage to 1000V',
      'No precautions necessary'
    ],
    correctAnswer: 1,
    explanation: 'Surge Protection Devices (SPDs) can be damaged by insulation resistance test voltages. They must be disconnected or shorted out before testing.',
    category: 'Insulation Resistance',
    difficulty: 'Advanced',
    regulation: '612.3.2'
  },

  // =============== ADDITIONAL EARTH FAULT LOOP IMPEDANCE QUESTIONS ===============
  {
    id: 'efli-30',
    question: 'What is the main purpose of measuring Zs (earth fault loop impedance)?',
    options: [
      'To check cable quality',
      'To verify automatic disconnection of supply will occur within required time',
      'To measure voltage drop',
      'To test RCD operation'
    ],
    correctAnswer: 1,
    explanation: 'Zs measurement verifies that under fault conditions, sufficient current will flow to operate the protective device within the disconnection time required by BS 7671.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '411.4.4'
  },
  {
    id: 'efli-31',
    question: 'Maximum Zs for a 32A Type B MCB protecting a socket circuit is?',
    options: [
      '1.44Ω',
      '0.87Ω',
      '1.09Ω',
      '2.30Ω'
    ],
    correctAnswer: 0,
    explanation: 'For 32A Type B MCB, maximum Zs is 1.44Ω to ensure 5-second disconnection for socket circuits (0.4s for fixed equipment).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'Appendix 3'
  },
  {
    id: 'efli-32',
    question: 'If measured Zs exceeds maximum permitted value, what actions should be taken?',
    options: [
      'Accept and note on certificate',
      'Investigate cause - check connections, bonding, supply Ze',
      'Increase MCB rating',
      'Install RCD protection only'
    ],
    correctAnswer: 1,
    explanation: 'High Zs must be investigated. Check all connections, bonding, and measure Ze. Poor connections or inadequate earthing must be corrected.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.4'
  },
  {
    id: 'efli-33',
    question: 'What is the relationship between Zs and fault current (If)?',
    options: [
      'If = Zs × Uo',
      'If = Uo ÷ Zs',
      'If = Zs ÷ Uo',
      'No relationship'
    ],
    correctAnswer: 1,
    explanation: 'Fault current If = Uo ÷ Zs. Lower impedance results in higher fault current, which operates protective devices faster.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.4'
  },
  {
    id: 'efli-34',
    question: 'Why must Zs testing be carried out with bonding connected?',
    options: [
      'To protect the tester',
      'To simulate actual fault conditions with parallel earth paths',
      'To avoid RCD tripping',
      'It is not necessary'
    ],
    correctAnswer: 1,
    explanation: 'Bonding creates parallel earth paths which reduce overall impedance. Testing with bonding connected gives the true Zs value under fault conditions.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.2'
  },
  {
    id: 'efli-35',
    question: 'When testing Zs on RCD-protected circuits, which method should be used?',
    options: [
      'Standard high-current test',
      'No-trip or low-current test',
      'Insulation resistance test',
      'Continuity test only'
    ],
    correctAnswer: 1,
    explanation: 'RCD-protected circuits require no-trip or low-current Zs testing to prevent the RCD operating during the test.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'efli-36',
    question: 'What correction factor is applied to measured Zs for conductor temperature?',
    options: [
      'Measured value × 1.5',
      'Measured value × 0.8',
      'No correction needed',
      'Depends on ambient temperature'
    ],
    correctAnswer: 1,
    explanation: 'Conductors at ambient temperature have lower resistance than at operating temperature. Apply 0.8 correction factor (or measure at operating temperature).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-37',
    question: 'A circuit has measured Zs of 1.2Ω. After applying 0.8 multiplier, maximum permitted is 1.15Ω. Result is?',
    options: [
      'Pass - 1.2Ω is acceptable',
      'Fail - 0.96Ω exceeds limit',
      'Fail - corrected value 1.5Ω exceeds limit',
      'Pass after temperature correction'
    ],
    correctAnswer: 0,
    explanation: 'Measured Zs (1.2Ω) is compared to maximum permitted (1.15Ω). The 1.2Ω exceeds 1.15Ω slightly, but if conductors are cold, actual Zs when hot would be higher. However, typically measured values are compared directly to published limits which include the 0.8 factor already. This is a borderline case requiring investigation.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '612.9'
  },
  {
    id: 'efli-38',
    question: 'What does Ze represent in earth fault loop impedance?',
    options: [
      'Circuit protective conductor resistance',
      'External earth fault loop impedance (supply network)',
      'Total earth fault loop impedance',
      'Phase conductor resistance'
    ],
    correctAnswer: 1,
    explanation: 'Ze is the external earth fault loop impedance from the installation origin back through the supply network to the source.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '612.6'
  },
  {
    id: 'efli-39',
    question: 'Typical maximum Ze for TN-S supply system is?',
    options: [
      '200Ω',
      '0.8Ω',
      '21Ω',
      '1667Ω'
    ],
    correctAnswer: 1,
    explanation: 'TN-S systems typically have Ze not exceeding 0.8Ω. Values higher than this may indicate supply network problems.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'efli-40',
    question: 'If Ze is measured at 0.5Ω and R1+R2 for a circuit is 0.3Ω, what is the expected Zs?',
    options: [
      '0.2Ω',
      '0.8Ω',
      '0.15Ω',
      '1.5Ω'
    ],
    correctAnswer: 1,
    explanation: 'Zs = Ze + R1 + R2. Therefore Zs = 0.5Ω + 0.3Ω = 0.8Ω. This is the calculated value to compare with measured Zs.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'efli-41',
    question: 'What safety precaution is essential before conducting Zs tests?',
    options: [
      'Isolate all circuits',
      'Wear insulated gloves',
      'Inform occupants - test creates temporary earth fault',
      'Disconnect main earth'
    ],
    correctAnswer: 2,
    explanation: 'Zs testing creates a deliberate earth fault causing high current flow momentarily. Inform occupants, ensure RCDs may trip, and be prepared for circuit interruption.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: '612.9'
  },
  {
    id: 'efli-42',
    question: 'Maximum permitted Zs for a 6A Type B MCB protecting lighting circuit is?',
    options: [
      '9.58Ω',
      '7.67Ω',
      '6.14Ω',
      '4.37Ω'
    ],
    correctAnswer: 1,
    explanation: 'For 6A Type B MCB, maximum Zs is 7.67Ω to ensure 5-second disconnection time (BS 7671 Appendix 3).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'Appendix 3'
  },
  {
    id: 'efli-43',
    question: 'When is R1+R2 testing preferred over direct Zs measurement?',
    options: [
      'Never',
      'On new installations before energisation',
      'Only for lighting circuits',
      'When RCDs are present'
    ],
    correctAnswer: 1,
    explanation: 'R1+R2 testing (continuity) is performed on new installations before energisation. Ze is measured separately and Zs calculated (Ze + R1+R2).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'efli-44',
    question: 'A 40A Type B MCB has maximum Zs of 1.15Ω. Measured value is 1.18Ω. What action is required?',
    options: [
      'Accept - within tolerance',
      'Fail - investigate and remedy',
      'Change to Type C MCB',
      'Install RCD'
    ],
    correctAnswer: 1,
    explanation: 'Measured Zs (1.18Ω) exceeds maximum permitted (1.15Ω). This must be investigated and remedied - check connections, bonding, and Ze.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.4'
  },
  {
    id: 'efli-45',
    question: 'What is the typical Zs value considered excellent for a TN system?',
    options: [
      'Below 0.5Ω',
      '1.0Ω to 2.0Ω',
      'Below 2.0Ω',
      'Any value below maximum permitted'
    ],
    correctAnswer: 0,
    explanation: 'Zs values below 0.5Ω are considered excellent in TN systems, ensuring rapid fault clearance and robust earth fault protection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '411.4.4'
  },
  {
    id: 'efli-46',
    question: 'Why might measured Zs be lower than calculated (Ze + R1+R2)?',
    options: [
      'Test equipment error',
      'Parallel earth paths from bonding',
      'Incorrect Ze measurement',
      'Faulty protective device'
    ],
    correctAnswer: 1,
    explanation: 'Measured Zs is often lower than calculated due to parallel earth paths created by bonding to services (gas, water). This is beneficial for fault clearance.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.2'
  },
  {
    id: 'efli-47',
    question: 'For a Type C 20A MCB, maximum Zs for 0.4s disconnection is?',
    options: [
      '2.30Ω',
      '1.15Ω',
      '1.84Ω',
      '2.76Ω'
    ],
    correctAnswer: 1,
    explanation: 'Type C 20A MCB has maximum Zs of 1.15Ω for 0.4s disconnection (socket circuits, fixed equipment). For 5s disconnection: 2.30Ω.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'Appendix 3'
  },
  {
    id: 'efli-48',
    question: 'What indicates a deteriorating earth fault loop path?',
    options: [
      'Increasing Zs readings over successive tests',
      'Decreasing Zs readings',
      'Constant Zs readings',
      'No change in readings'
    ],
    correctAnswer: 0,
    explanation: 'Increasing Zs values over time indicate deteriorating connections, corrosion, or problems in the earth fault path requiring investigation.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.9'
  },
  {
    id: 'efli-49',
    question: 'When performing Zs test at the origin, what value is actually measured?',
    options: [
      'R1+R2',
      'Ze (external impedance)',
      'Zs of entire installation',
      'Loop impedance of supply only'
    ],
    correctAnswer: 1,
    explanation: 'Zs test at the origin (before any circuit protective conductors) measures Ze - the external earth fault loop impedance from the supply network.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: '612.6'
  },
  {
    id: 'efli-50',
    question: 'What is the consequence of excessive Zs on circuit protection?',
    options: [
      'Faster disconnection times',
      'Insufficient fault current to operate protective device within required time',
      'Improved protection',
      'No effect on protection'
    ],
    correctAnswer: 1,
    explanation: 'High Zs limits fault current (If = Uo÷Zs), potentially preventing the protective device from operating within required disconnection time - dangerous fault.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: '411.4.4'
  },

  // =============== ADDITIONAL PROSPECTIVE FAULT CURRENT QUESTIONS ===============
  {
    id: 'pfc-16',
    question: 'What is the minimum acceptable breaking capacity for domestic MCBs?',
    options: [
      '3kA',
      '6kA',
      '10kA',
      '16kA'
    ],
    correctAnswer: 1,
    explanation: 'Domestic MCBs typically have minimum 6kA breaking capacity (6000A), suitable for most UK domestic installations.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-17',
    question: 'Where should PFC be measured in an installation?',
    options: [
      'Only at the origin',
      'At the origin and at the furthest point of each circuit',
      'Every socket outlet',
      'Distribution boards only'
    ],
    correctAnswer: 1,
    explanation: 'PFC should be measured at the origin (highest) and furthest points of circuits to verify protective device breaking capacity is adequate.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-18',
    question: 'A protective device has 4.5kA breaking capacity. Measured PEFC is 5.2kA. What action is required?',
    options: [
      'No action - acceptable',
      'Replace with device rated at least 6kA',
      'Install RCD',
      'Reduce circuit length'
    ],
    correctAnswer: 1,
    explanation: 'Protective device breaking capacity must exceed PFC. 4.5kA device is inadequate for 5.2kA fault current - replace with 6kA minimum rated device.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-19',
    question: 'What does PSCC stand for in electrical testing?',
    options: [
      'Protective Short Circuit Current',
      'Prospective Short Circuit Current',
      'Primary Supply Circuit Current',
      'Phase Single Circuit Current'
    ],
    correctAnswer: 1,
    explanation: 'PSCC is Prospective Short Circuit Current - the maximum current that would flow in a phase-to-neutral or phase-to-phase fault.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-20',
    question: 'What does PEFC stand for in electrical testing?',
    options: [
      'Phase Earth Fault Current',
      'Protective Equipment Fault Current',
      'Prospective Earth Fault Current',
      'Primary Earthing Fault Calculation'
    ],
    correctAnswer: 2,
    explanation: 'PEFC is Prospective Earth Fault Current - the maximum current that would flow in a phase-to-earth fault.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-21',
    question: 'Measured Ze = 0.25Ω, supply voltage = 230V. Calculate PEFC.',
    options: [
      '57.5A',
      '920A',
      '575A',
      '9200A'
    ],
    correctAnswer: 1,
    explanation: 'PEFC = U0 ÷ Ze = 230V ÷ 0.25Ω = 920A. This is the prospective earth fault current at the origin.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-22',
    question: 'A TN-C-S supply typically has higher or lower PFC than TN-S?',
    options: [
      'Significantly higher',
      'Significantly lower',
      'Similar values',
      'Cannot be compared'
    ],
    correctAnswer: 2,
    explanation: 'TN-C-S and TN-S supplies typically have similar PFC values, both dependent on transformer rating and supply cable impedance.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-23',
    question: 'Why is PFC typically lower at distribution boards compared to the origin?',
    options: [
      'Protective devices reduce it',
      'Cable impedance between origin and board increases total impedance',
      'RCDs limit fault current',
      'Voltage drop effects'
    ],
    correctAnswer: 1,
    explanation: 'Cable impedance between the origin and distribution boards adds to total circuit impedance, reducing the prospective fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-24',
    question: 'What is the typical PFC range at the origin of a UK domestic installation?',
    options: [
      '100A to 500A',
      '1kA to 3kA',
      '5kA to 16kA',
      '20kA to 50kA'
    ],
    correctAnswer: 1,
    explanation: 'Typical UK domestic installations have PFC at origin of 1kA to 3kA, though this varies with supply characteristics.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-25',
    question: 'An installation has Ze = 0.15Ω. Supply is upgraded with lower impedance. New Ze = 0.10Ω. Effect on PEFC?',
    options: [
      'PEFC decreases',
      'PEFC increases by 50%',
      'No change',
      'PEFC increases by 33%'
    ],
    correctAnswer: 1,
    explanation: 'Lower Ze means higher fault current. PEFC = 230V÷0.15Ω = 1533A. New PEFC = 230V÷0.10Ω = 2300A. This is a 50% increase.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-26',
    question: 'Which type of protective device has the highest breaking capacity?',
    options: [
      'MCB Type B 6kA',
      'BS 88 Fuse 80kA',
      'RCBO 6kA',
      'MCB Type C 10kA'
    ],
    correctAnswer: 1,
    explanation: 'BS 88 fuses have the highest breaking capacity, typically 80kA, making them suitable for industrial installations with very high PFC.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-27',
    question: 'When testing PFC, which probe configuration is used for PEFC measurement?',
    options: [
      'Phase to neutral',
      'Phase to phase',
      'Phase to earth',
      'Neutral to earth'
    ],
    correctAnswer: 2,
    explanation: 'PEFC (Prospective Earth Fault Current) is measured between phase and earth conductors.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-28',
    question: 'When testing PFC, which probe configuration is used for PSCC measurement?',
    options: [
      'Phase to earth',
      'Phase to neutral',
      'Neutral to earth',
      'Any two conductors'
    ],
    correctAnswer: 1,
    explanation: 'PSCC (Prospective Short Circuit Current) is measured between phase and neutral conductors (single phase).',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-29',
    question: 'In a three-phase system, where is the highest PFC typically measured?',
    options: [
      'Neutral to earth',
      'Phase to phase',
      'Phase to neutral',
      'All equal'
    ],
    correctAnswer: 1,
    explanation: 'Phase-to-phase faults typically produce the highest fault current in three-phase systems due to higher voltage (400V vs 230V) and lower impedance path.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-30',
    question: 'What safety precaution is essential during PFC testing?',
    options: [
      'Isolate all circuits',
      'Ensure test leads rated for high current',
      'Disconnect main earth',
      'Test at reduced voltage'
    ],
    correctAnswer: 1,
    explanation: 'PFC testing involves very high currents momentarily. Test leads, probes, and connections must be rated for high current to prevent burns or equipment damage.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '612.11'
  },
  {
    id: 'pfc-31',
    question: 'An MCB is marked with "6000" on its front. What does this indicate?',
    options: [
      'Maximum load current 6000A',
      'Breaking capacity 6000A (6kA)',
      'Voltage rating',
      'Resistance value'
    ],
    correctAnswer: 1,
    explanation: 'The marking indicates breaking capacity in amperes. 6000A = 6kA - the maximum fault current the MCB can safely interrupt.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-32',
    question: 'If PFC at origin is 2.5kA and at end of a circuit is 1.8kA, what does this indicate?',
    options: [
      'Fault in the circuit',
      'Normal - cable impedance reduces PFC along circuit length',
      'Test equipment error',
      'Inadequate protection'
    ],
    correctAnswer: 1,
    explanation: 'This is normal. Cable impedance increases along the circuit length, reducing prospective fault current further from the source.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-33',
    question: 'Why must PFC be recorded on electrical certificates?',
    options: [
      'Insurance purposes only',
      'To verify protective devices have adequate breaking capacity',
      'For voltage drop calculations',
      'Building regulations requirement only'
    ],
    correctAnswer: 1,
    explanation: 'Recording PFC verifies protective devices can safely interrupt maximum fault current, ensuring protection adequacy now and for future comparisons.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-34',
    question: 'A consumer unit has mixed MCBs: some 6kA, some 10kA. PFC at origin is 7kA. What action is required?',
    options: [
      'No action - 10kA devices protect 6kA devices',
      'Replace all 6kA devices with 10kA minimum',
      'Install current limiting devices',
      'Acceptable if backed up by main fuse'
    ],
    correctAnswer: 1,
    explanation: 'All protective devices must individually have breaking capacity exceeding PFC. 6kA devices are inadequate for 7kA fault current - replace with 10kA devices.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-35',
    question: 'What happens if a protective device operates under fault current exceeding its breaking capacity?',
    options: [
      'Device operates normally',
      'Device may fail to clear fault, risk of fire or explosion',
      'Device trips but can be reset',
      'Only aesthetic damage'
    ],
    correctAnswer: 1,
    explanation: 'If fault current exceeds breaking capacity, the device may fail catastrophically - unable to clear the fault, with risk of fire, explosion, or equipment destruction.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-36',
    question: 'In a TT system, why is PFC typically lower than TN systems?',
    options: [
      'Lower supply voltage',
      'Higher earth electrode resistance increases impedance',
      'Protective devices limit current',
      'Longer cable runs'
    ],
    correctAnswer: 1,
    explanation: 'TT systems rely on earth electrodes which have much higher resistance (typically >20Ω) than TN earthing, significantly reducing PFC.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-37',
    question: 'How often should PFC be tested during periodic inspection?',
    options: [
      'Not required',
      'Every inspection - to verify protective device adequacy',
      'Only on initial verification',
      'Only if devices are changed'
    ],
    correctAnswer: 1,
    explanation: 'PFC must be measured during every periodic inspection to verify protective devices remain adequate and to detect changes in supply characteristics.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-38',
    question: 'Measured PSCC = 3.2kA, PEFC = 2.8kA. Which value determines required breaking capacity?',
    options: [
      'PEFC only',
      'PSCC only',
      'Higher value (PSCC)',
      'Average of both'
    ],
    correctAnswer: 2,
    explanation: 'The higher PFC value (PSCC at 3.2kA) determines the minimum required breaking capacity, as this represents the worst-case fault scenario.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-39',
    question: 'A supply is changed from overhead lines to underground cables. Expected effect on PFC?',
    options: [
      'PFC decreases significantly',
      'PFC increases due to lower cable impedance',
      'No change',
      'Depends on cable length only'
    ],
    correctAnswer: 1,
    explanation: 'Underground cables typically have lower impedance than overhead lines, potentially increasing PFC. Protective device breaking capacity must be verified.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-40',
    question: 'Ze = 0.20Ω, R1+R2 = 0.30Ω. What is the PEFC at the circuit endpoint?',
    options: [
      '460A',
      '767A',
      '1150A',
      '230A'
    ],
    correctAnswer: 0,
    explanation: 'PEFC = U0 ÷ (Ze + R1+R2) = 230V ÷ (0.20Ω + 0.30Ω) = 230V ÷ 0.50Ω = 460A at circuit endpoint.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-41',
    question: 'What is "let-through energy" (I²t) in relation to protective devices?',
    options: [
      'Operating time of device',
      'Energy passed through device during fault clearance',
      'Device rating',
      'Load current capacity'
    ],
    correctAnswer: 1,
    explanation: 'Let-through energy (I²t) is the energy passed through a protective device before it clears a fault. Lower I²t means better protection for cables and equipment.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.2'
  },
  {
    id: 'pfc-42',
    question: 'Which device type typically provides the fastest fault current limitation?',
    options: [
      'MCB',
      'BS 88 HRC fuse',
      'MCCB',
      'Rewireable fuse'
    ],
    correctAnswer: 1,
    explanation: 'BS 88 HRC (High Rupturing Capacity) fuses provide excellent current limitation and very low let-through energy, offering superior protection.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-43',
    question: 'Origin has PFC of 12kA. All MCBs are 6kA rated. What is the most appropriate solution?',
    options: [
      'Install 16kA MCBs',
      'Install energy-limiting device (e.g. BS88 fuse) before consumer unit',
      'Accept as satisfactory',
      'Install RCDs'
    ],
    correctAnswer: 1,
    explanation: 'Install current-limiting device such as BS88 fuse at origin to reduce downstream PFC to within MCB breaking capacity (below 6kA).',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-44',
    question: 'What is "back-up protection" in relation to PFC?',
    options: [
      'Redundant protective devices',
      'Upstream device with higher breaking capacity protecting downstream devices',
      'RCD protection',
      'Emergency backup supply'
    ],
    correctAnswer: 1,
    explanation: 'Back-up protection occurs when an upstream device with high breaking capacity (e.g. BS88 fuse) provides fault clearance if downstream device cannot interrupt fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '536.1'
  },
  {
    id: 'pfc-45',
    question: 'PFC testing involves passing what level of current through the circuit?',
    options: [
      'Full fault current',
      'Very low test current (no actual fault created)',
      'Half rated current',
      '100A test current'
    ],
    correctAnswer: 1,
    explanation: 'Modern PFC testers use very low test currents and calculate PFC from impedance measurements - no actual high fault current flows.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-46',
    question: 'Why is PFC highest at the origin of the installation?',
    options: [
      'Most devices located there',
      'Lowest total impedance - shortest path to supply',
      'Highest voltage',
      'Main earth connection located there'
    ],
    correctAnswer: 1,
    explanation: 'PFC is highest at origin because total impedance is lowest - shortest electrical path back to supply source.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-47',
    question: 'An installation has Ze = 0.12Ω. Supply authority upgrades local transformer. New Ze = 0.08Ω. Recommended action?',
    options: [
      'No action needed',
      'Remeasure PFC and verify breaking capacity remains adequate',
      'Reduce circuit lengths',
      'Install RCDs'
    ],
    correctAnswer: 1,
    explanation: 'Lower Ze means higher PFC. Must remeasure PFC and verify all protective devices still have adequate breaking capacity for new higher fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },
  {
    id: 'pfc-48',
    question: 'Industrial installation has PFC of 35kA at origin. Most appropriate main protective device?',
    options: [
      'MCB Type C 10kA',
      'BS 88 fuse 80kA or higher',
      'RCBO 6kA',
      'MCB Type D 16kA'
    ],
    correctAnswer: 1,
    explanation: 'Very high PFC (35kA) requires BS 88 HRC fuses with 80kA+ breaking capacity. Standard MCBs are inadequate.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '434.5.1'
  },
  {
    id: 'pfc-49',
    question: 'What is the consequence of not measuring PFC during initial verification?',
    options: [
      'No consequence - not essential',
      'Cannot verify protective device breaking capacity is adequate',
      'Affects only warranty',
      'Only required for commercial installations'
    ],
    correctAnswer: 1,
    explanation: 'Without PFC measurement, cannot verify protective devices can safely interrupt maximum fault current - potentially dangerous and non-compliant installation.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: '612.11'
  },
  {
    id: 'pfc-50',
    question: 'Calculate PSCC if phase-neutral loop impedance is 0.18Ω and supply voltage is 230V.',
    options: [
      '41.4A',
      '414A',
      '1278A',
      '12,780A'
    ],
    correctAnswer: 2,
    explanation: 'PSCC = U0 ÷ Zloop(L-N) = 230V ÷ 0.18Ω = 1278A. This is the prospective short circuit current between phase and neutral.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: '612.11'
  },

  // =============== ADDITIONAL FUNCTIONAL TESTING QUESTIONS ===============
  {
    id: 'functional-21',
    question: 'When functionally testing a two-way lighting circuit, what must be verified?',
    options: [
      'Lighting operates from switch position only',
      'Lighting can be controlled independently from both switch positions',
      'Both switches must be operated simultaneously',
      'Only one switch controls the light'
    ],
    correctAnswer: 1,
    explanation: 'Two-way switching must allow independent control from both switch positions - light can be turned on or off from either location.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-22',
    question: 'What must be checked during functional testing of isolators in bathrooms?',
    options: [
      'Only operation',
      'Accessible from outside zones, clear on/off indication, secure mounting',
      'RCD protection',
      'Voltage rating only'
    ],
    correctAnswer: 1,
    explanation: 'Bathroom isolators must be accessible from outside zones, provide clear on/off indication, operate correctly, and be securely mounted.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '701.55.1'
  },
  {
    id: 'functional-23',
    question: 'During functional testing of a cooker control unit, what should be verified?',
    options: [
      'Switch operates, socket outlet functions, secure mounting, correct rating',
      'Colour only',
      'Socket outlet only',
      'Switch operation only'
    ],
    correctAnswer: 0,
    explanation: 'Functional testing of cooker control unit verifies switch operation, socket outlet function, secure mounting, correct rating, and appropriate connection.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-24',
    question: 'What must be functionally tested on a distribution board?',
    options: [
      'Colour coding only',
      'All MCBs/RCBOs operate, main switch functions, RCDs trip on test, labels present',
      'Only main switch',
      'Visual appearance'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing includes verifying all protective devices operate correctly, main switch functions, RCD test buttons work, and proper labelling present.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-25',
    question: 'When testing an immersion heater switch, what specific check is important?',
    options: [
      'Colour of faceplate',
      'Neon indicator illuminates when on, switch operates correctly',
      'Cable size only',
      'Position on wall'
    ],
    correctAnswer: 1,
    explanation: 'Immersion heater switches should have working neon indicators showing on/off status, with positive switching action verified during functional test.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-26',
    question: 'What must be tested when verifying operation of undervoltage protection devices?',
    options: [
      'Device prevents restart after voltage loss without manual reset',
      'Voltage measurement only',
      'Current rating',
      'Visual inspection only'
    ],
    correctAnswer: 0,
    explanation: 'Undervoltage protection must prevent automatic restart after supply loss, requiring manual reset for safety - this must be functionally verified.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '536.3'
  },
  {
    id: 'functional-27',
    question: 'During functional testing of door entry systems, what must be verified?',
    options: [
      'Audio quality only',
      'Call functions, door release operates, audio communication clear, lock mechanism secure',
      'Video quality only',
      'Power supply only'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies call operation, door release function, clear audio, secure lock mechanism, and proper integration of all components.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-28',
    question: 'What must be checked during functional testing of socket outlets?',
    options: [
      'Colour only',
      'Polarity correct, earth present, secure fixing, protective shutters operate',
      'Brand name',
      'Age of socket'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies correct polarity, earth continuity, secure mounting, protective shutter operation, and switch function (if switched).',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-29',
    question: 'When functionally testing photocell-controlled lighting, what must be verified?',
    options: [
      'Lighting colour temperature',
      'Photocell correctly responds to light levels, appropriate time delay, override function',
      'Brand of photocell',
      'Mounting height only'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies photocell responds correctly to changing light levels, appropriate delay prevents rapid switching, and manual override works.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-30',
    question: 'What is the purpose of functional testing as distinct from other verification tests?',
    options: [
      'Measure electrical values',
      'Verify that installed equipment and accessories operate correctly as designed',
      'Test cable insulation',
      'Measure earth resistance'
    ],
    correctAnswer: 1,
    explanation: 'Functional testing verifies that all electrical equipment, accessories, and controls operate correctly, safely, and as intended under normal conditions.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-31',
    question: 'When testing a changeover switch for generator backup, what must be verified?',
    options: [
      'Switch rating only',
      'Positive changeover, interlocking prevents parallel operation, clear position indication',
      'Cable size',
      'Generator fuel level'
    ],
    correctAnswer: 1,
    explanation: 'Changeover switches must provide positive changeover, mechanical interlocking to prevent mains/generator paralleling, and clear position indication.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '551.1'
  },
  {
    id: 'functional-32',
    question: 'During functional testing of thermostatic controls, what should be checked?',
    options: [
      'Colour of unit',
      'Correct temperature range, accurate operation, fail-safe operation',
      'Brand name',
      'Installation date'
    ],
    correctAnswer: 1,
    explanation: 'Thermostatic controls must operate within correct temperature range, respond accurately, and fail-safe (typically open circuit on failure).',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-33',
    question: 'What must be tested on electric vehicle charging points during functional testing?',
    options: [
      'Charging port fits vehicles',
      'Operation of charging functions, RCD protection, emergency isolation, status indicators',
      'Cable length only',
      'Mounting height'
    ],
    correctAnswer: 1,
    explanation: 'EV charging points require verification of charging operation, RCD protection (Type B/F), emergency stop, isolation, and status indication.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '722'
  },
  {
    id: 'functional-34',
    question: 'When functionally testing key-operated switches, what must be verified?',
    options: [
      'Key type only',
      'Switch operates only with correct key, secure mounting, clear labelling',
      'Key availability',
      'Switch colour'
    ],
    correctAnswer: 1,
    explanation: 'Key-operated switches must operate only with correct key, be securely mounted, clearly labelled, and provide positive on/off indication.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-35',
    question: 'What must be checked during functional testing of neon indicators on switches?',
    options: [
      'Brightness only',
      'Illuminates when circuit is live, adequate brightness, correct polarity',
      'Colour of neon',
      'Brand of indicator'
    ],
    correctAnswer: 1,
    explanation: 'Neon indicators must illuminate when circuit is energised, provide adequate brightness for visibility, and be correctly wired.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-36',
    question: 'During functional testing of mechanical interlocks, what is essential to verify?',
    options: [
      'Visual appearance',
      'Interlock prevents unsafe operation sequence, operates smoothly, cannot be bypassed',
      'Material type',
      'Age of interlock'
    ],
    correctAnswer: 1,
    explanation: 'Mechanical interlocks must physically prevent unsafe operation sequences, operate reliably, and be designed so they cannot be easily defeated or bypassed.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '536.4'
  },
  {
    id: 'functional-37',
    question: 'What must be functionally tested on solar PV systems in addition to standard tests?',
    options: [
      'Panel efficiency',
      'DC and AC isolators, RCD protection, emergency shutdown, generation meter',
      'Panel cleanliness',
      'Inverter brand'
    ],
    correctAnswer: 1,
    explanation: 'PV systems require functional testing of DC/AC isolation, RCD operation, emergency shutdown procedures, and generation metering.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '712'
  },
  {
    id: 'functional-38',
    question: 'When functionally testing socket outlets with USB charging ports, what additional check is required?',
    options: [
      'USB port colour',
      'USB ports provide correct voltage (5V), adequate current, standard outlets function',
      'Number of USB ports',
      'Brand compatibility'
    ],
    correctAnswer: 1,
    explanation: 'USB charging sockets require verification that USB ports provide correct voltage (~5V DC), adequate current output, and standard sockets function normally.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-39',
    question: 'What must be tested on residual current monitoring devices (RCMs)?',
    options: [
      'Display only',
      'Accurate earth leakage current measurement, alarm settings, data logging functions',
      'Colour of display',
      'Size of unit'
    ],
    correctAnswer: 1,
    explanation: 'RCMs must accurately measure and display earth leakage current, alarm at set thresholds, and log data (if equipped) for analysis.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '531.2.6'
  },
  {
    id: 'functional-40',
    question: 'During functional testing of lighting control modules, what should be verified?',
    options: [
      'Module brand',
      'Scenes operate correctly, dimming functions smooth, timing accurate, override works',
      'Installation location',
      'Cable colour'
    ],
    correctAnswer: 1,
    explanation: 'Lighting control systems require verification of scene operation, smooth dimming, accurate timing functions, and manual override capability.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'functional-41',
    question: 'What must be functionally tested on ceiling rose installations?',
    options: [
      'Style of rose',
      'Secure fixing, earth continuity, switch control, correct connection of pendant',
      'Age of fitting',
      'Colour match to ceiling'
    ],
    correctAnswer: 1,
    explanation: 'Ceiling roses require verification of secure fixing, earth continuity (if metal), correct switch operation, and proper pendant connection.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: '612.13'
  },
  {
    id: 'functional-42',
    question: 'When testing emergency stop buttons, what is the most critical functional requirement?',
    options: [
      'Button colour (red)',
      'Latching action, immediate power interruption, requires deliberate reset',
      'Size of button',
      'Mounting height'
    ],
    correctAnswer: 1,
    explanation: 'Emergency stops must latch when pressed, immediately interrupt all power, and require deliberate manual reset before equipment can restart.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '537.4'
  },
  {
    id: 'functional-43',
    question: 'What must be checked during functional testing of IT equipment socket outlets?',
    options: [
      'Socket brand compatibility',
      'Clean power supply, RCD protection appropriate, surge protection present',
      'Desk height',
      'Cable management only'
    ],
    correctAnswer: 1,
    explanation: 'IT equipment outlets require verification of clean power, appropriate RCD protection (delayed if necessary), and surge protection for sensitive equipment.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '612.13'
  },
  {
    id: 'functional-44',
    question: 'During functional testing of outdoor lighting with PIR control, what additional check is important?',
    options: [
      'Light colour',
      'Detection zone coverage, adjustable time delay, daylight override, weatherproofing',
      'Lamp brand',
      'Mounting height only'
    ],
    correctAnswer: 1,
    explanation: 'Outdoor PIR lighting requires verification of detection coverage, appropriate time delays, daylight override function, and adequate weatherproofing (IP rating).',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-45',
    question: 'What must be tested on electrical installations with programmable timers?',
    options: [
      'Timer brand',
      'Correct time setting, programme operates accurately, manual override, battery backup',
      'Display size',
      'Button colour'
    ],
    correctAnswer: 1,
    explanation: 'Programmable timers require verification of correct time, accurate programme execution, manual override function, and battery backup (if fitted).',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-46',
    question: 'When functionally testing SPDs (Surge Protection Devices), what should be checked?',
    options: [
      'Brand name',
      'Status indicator shows healthy, correct connection, appropriate rating for location',
      'Colour of device',
      'Installation date only'
    ],
    correctAnswer: 1,
    explanation: 'SPD functional testing verifies status indicators show device health, correct installation (phase, neutral, earth), and appropriate rating for installation.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '534.4'
  },
  {
    id: 'functional-47',
    question: 'What must be verified during functional testing of emergency lighting test facilities?',
    options: [
      'Key switch aesthetics',
      'Test button/switch initiates lamp test, duration test operates, results logged',
      'Lamp colour temperature',
      'Fitting brand'
    ],
    correctAnswer: 1,
    explanation: 'Emergency lighting test facilities must initiate function test (lamp operation) and duration test, with results logged for compliance records.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '560.8'
  },
  {
    id: 'functional-48',
    question: 'During functional testing of socket outlets on ring finals, what specific check is important?',
    options: [
      'All sockets live from both directions of ring',
      'Socket colour',
      'Brand consistency',
      'Age of sockets'
    ],
    correctAnswer: 0,
    explanation: 'Ring final sockets should be supplied from both legs of the ring. Testing verifies ring continuity and each socket receives supply from both directions.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  },
  {
    id: 'functional-49',
    question: 'What must be functionally tested on installations with automatic transfer switches (ATS)?',
    options: [
      'Switch brand',
      'Automatic changeover on power loss, transfer time, return to normal, status indication',
      'Cabinet colour',
      'Installation location'
    ],
    correctAnswer: 1,
    explanation: 'ATS systems require verification of automatic changeover on mains failure, appropriate transfer time, return to normal supply, and clear status indication.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: '551.1'
  },
  {
    id: 'functional-50',
    question: 'When testing final circuits, what confirms proper functional testing has been completed?',
    options: [
      'All accessories operate correctly as designed with proper safety features',
      'Visual inspection only',
      'Measurement of voltage',
      'Cable colours noted'
    ],
    correctAnswer: 0,
    explanation: 'Functional testing is complete when all equipment, accessories, controls, and safety features operate correctly as designed under normal conditions.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: '612.13'
  }
];

export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  return quizQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): QuizQuestion[] => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number, categories?: string[], difficulty?: string): QuizQuestion[] => {
  let filteredQuestions = [...quizQuestions];
  
  if (categories && categories.length > 0) {
    filteredQuestions = filteredQuestions.filter(q => categories.includes(q.category));
  }
  
  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
  }
  
  // Enhanced shuffle using Fisher-Yates algorithm for better randomisation
  const shuffled = [...filteredQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // If we don't have enough questions, log a warning and return what we have
  if (shuffled.length < count) {
    console.warn(`Only ${shuffled.length} questions available for category ${categories?.join(', ')} and difficulty ${difficulty}. Requested ${count}.`);
    return shuffled;
  }
  
  return shuffled.slice(0, count);
};

// Helper function to get question counts by category and difficulty
export const getQuestionCounts = () => {
  const counts: Record<string, Record<string, number>> = {};
  
  quizQuestions.forEach(q => {
    if (!counts[q.category]) {
      counts[q.category] = {};
    }
    if (!counts[q.category][q.difficulty]) {
      counts[q.category][q.difficulty] = 0;
    }
    counts[q.category][q.difficulty]++;
  });
  
  return counts;
};