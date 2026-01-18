import { QuizQuestion } from '@/types/quiz';

export const functionalTestingQuestions: QuizQuestion[] = [
  {
    id: 'ft-1',
    question: 'What is the purpose of functional testing?',
    options: ['To measure resistance', 'To confirm equipment operates correctly as intended', 'To check cable sizes', 'To measure voltage'],
    correctAnswer: 1,
    explanation: 'Functional testing confirms that switchgear, controls, and interlocks operate correctly as designed and intended.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.10'
  },
  {
    id: 'ft-2',
    question: 'Which devices should be functionally tested?',
    options: ['Cables only', 'Switchgear, controls, and interlocks', 'Earthing conductors', 'Circuit breakers only'],
    correctAnswer: 1,
    explanation: 'Switchgear, controls, and interlocks should all be functionally tested to confirm correct operation.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-3',
    question: 'How is an RCD functionally tested?',
    options: ['By measuring its resistance', 'By pressing the test button to see that it trips', 'By checking the label', 'By measuring voltage across it'],
    correctAnswer: 1,
    explanation: 'RCDs are functionally tested by pressing the test button to confirm the trip mechanism operates.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-4',
    question: 'Can circuit breakers be used as regular lighting switches?',
    options: ['Yes, always', 'Only if approved by manufacturer for switching duty', 'Never', 'Only for outdoor lighting'],
    correctAnswer: 1,
    explanation: 'Circuit breakers should NOT be used as regular lighting switches unless the manufacturer has approved them for switching duty.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-5',
    question: 'What must be checked on adjustable protective devices?',
    options: ['Colour', 'That settings match designer\'s requirements', 'Physical size', 'Brand name'],
    correctAnswer: 1,
    explanation: 'Settings on adjustable relays and controls must be checked to ensure they align with the designer\'s requirements.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-6',
    question: 'How often does BS 7671 recommend pressing the RCD test button?',
    options: ['Weekly', 'Monthly', 'At least every 6 months', 'Annually'],
    correctAnswer: 2,
    explanation: 'BS 7671 Regulation 514.12.2 recommends the RCD test button be pressed at least every 6 months.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.12.2'
  },
  {
    id: 'ft-7',
    question: 'How are AFDDs with test buttons functionally tested?',
    options: ['With special test equipment', 'By pressing the test button only', 'By creating an arc fault', 'They cannot be tested'],
    correctAnswer: 1,
    explanation: 'AFDDs with test buttons are functionally tested by pressing the test button - no other field test method is available.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-8',
    question: 'AFDDs without test buttons:',
    options: ['Must be tested annually', 'Cannot be functionally tested in the field', 'Are tested with voltage', 'Require special instruments'],
    correctAnswer: 1,
    explanation: 'AFDDs without test buttons have no means of functional testing available in the field.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-9',
    question: 'What should be verified about equipment mounting during functional testing?',
    options: ['Colour matching', 'Properly installed, mounted, and adjusted', 'Serial numbers', 'Manufacturing date'],
    correctAnswer: 1,
    explanation: 'Confirm equipment is properly installed, mounted, and adjusted for correct operation.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-10',
    question: 'Which regulation covers functional testing requirements?',
    options: ['Regulation 411.3.3', 'Regulation 643.10', 'Regulation 701.1', 'Regulation 434.5.1'],
    correctAnswer: 1,
    explanation: 'Regulation 643.10 covers the requirements for functional testing.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.10'
  },
  {
    id: 'ft-11',
    question: 'When testing interlocks, what must be verified?',
    options: ['Colour coding', 'They prevent operation when conditions are unsafe', 'Physical size', 'Manufacturer'],
    correctAnswer: 1,
    explanation: 'Interlocks must be tested to verify they prevent operation when safety conditions are not met.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-12',
    question: 'Functional testing of energy storage systems (EESS) should refer to:',
    options: ['Only BS 7671', 'IET Code of Practice for EESS and manufacturer documentation', 'Visual inspection only', 'No testing required'],
    correctAnswer: 1,
    explanation: 'EESS testing can be complex - refer to the IET Code of Practice for Electrical Energy Storage Systems and manufacturer documentation.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-13',
    question: 'For dwellings with PV systems, what documentation should be provided?',
    options: ['Only the EIC', 'Suitable commissioning records and maintenance information', 'Just an invoice', 'No documentation required'],
    correctAnswer: 1,
    explanation: 'Dwellings with EESS or PV systems should have suitable commissioning records and maintenance information provided.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-14',
    question: 'What is tested during switch functional testing?',
    options: ['Voltage only', 'That the switch operates and makes/breaks the circuit', 'Cable colours', 'Fuse ratings'],
    correctAnswer: 1,
    explanation: 'Switch functional testing confirms the switch operates correctly, making and breaking the circuit as intended.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-15',
    question: 'Emergency stop buttons should be tested to verify:',
    options: ['They are the correct colour', 'They immediately disconnect the supply when operated', 'They are at the correct height', 'They have labels'],
    correctAnswer: 1,
    explanation: 'Emergency stops must be tested to confirm they immediately disconnect the supply when operated.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:537.4'
  },
  {
    id: 'ft-16',
    question: 'What is the purpose of testing time delay relays?',
    options: ['To check colour', 'To verify they operate at the correct time settings', 'To measure resistance', 'To check voltage'],
    correctAnswer: 1,
    explanation: 'Time delay relays are tested to verify they operate at the correct programmed time settings.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-17',
    question: 'Which GN3 section covers functional testing?',
    options: ['Section 2.6.5', 'Section 2.6.19', 'Section 2.6.7', 'Section 2.6.15'],
    correctAnswer: 1,
    explanation: 'GN3 Section 2.6.19 covers "Other functional testing".',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-18',
    question: 'Two-way switching should be tested:',
    options: ['At one switch only', 'From both switch positions', 'Only when load is connected', 'Never - visual check sufficient'],
    correctAnswer: 1,
    explanation: 'Two-way switching must be tested from both switch positions to verify correct operation.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-19',
    question: 'Dimmer switches should be tested for:',
    options: ['Colour only', 'Smooth operation throughout range', 'Maximum brightness only', 'Minimum brightness only'],
    correctAnswer: 1,
    explanation: 'Dimmer switches should be tested for smooth operation throughout their full dimming range.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-20',
    question: 'Contactor functional testing includes:',
    options: ['Measuring resistance', 'Verifying correct pull-in and drop-out operation', 'Checking colour', 'Measuring voltage'],
    correctAnswer: 1,
    explanation: 'Contactors should be tested to verify correct pull-in (energised) and drop-out (de-energised) operation.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-21',
    question: 'Timer switches should be verified for:',
    options: ['Physical size', 'Correct on/off times as programmed', 'Brand name', 'Colour'],
    correctAnswer: 1,
    explanation: 'Timer switches must be verified to operate at the correct programmed on and off times.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-22',
    question: 'PIR (motion sensor) switches should be tested for:',
    options: ['Colour only', 'Detection range, sensitivity, and time delay settings', 'Physical size', 'Manufacturer'],
    correctAnswer: 1,
    explanation: 'PIR switches should be tested for correct detection range, sensitivity, and time delay operation.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-23',
    question: 'When testing an isolator, what must be confirmed?',
    options: ['It is the correct colour', 'It provides complete isolation when operated', 'It matches other equipment', 'The brand is correct'],
    correctAnswer: 1,
    explanation: 'Isolators must be confirmed to provide complete isolation of all poles when operated.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:537.2'
  },
  {
    id: 'ft-24',
    question: 'Regulation 532.6 relates to:',
    options: ['RCD testing', 'AFDD requirements', 'Earthing', 'Bonding'],
    correctAnswer: 1,
    explanation: 'Regulation 532.6 covers Arc Fault Detection Device (AFDD) requirements.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:532.6'
  },
  {
    id: 'ft-25',
    question: 'A thermostatic control should be tested to verify:',
    options: ['Its colour', 'It operates at the correct temperature setting', 'Physical dimensions', 'Cable connections only'],
    correctAnswer: 1,
    explanation: 'Thermostatic controls should be tested to verify they operate at or near the set temperature.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-26',
    question: 'Residual current monitors should be tested:',
    options: ['Never', 'According to manufacturer instructions', 'Only annually', 'Only with special equipment'],
    correctAnswer: 1,
    explanation: 'Residual current monitors should be tested according to the manufacturer\'s instructions.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-27',
    question: 'Key-operated switches must be tested to confirm:',
    options: ['Key colour matches', 'They only operate with the correct key', 'Key size is correct', 'They are lockable'],
    correctAnswer: 1,
    explanation: 'Key-operated switches must be tested to confirm they only operate with the correct key.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-28',
    question: 'What should be checked on motor starter interlocks?',
    options: ['Cable colours', 'They prevent motor operation in unsafe conditions', 'Physical size', 'Manufacturer brand'],
    correctAnswer: 1,
    explanation: 'Motor starter interlocks must be tested to verify they prevent motor operation when conditions are unsafe.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-29',
    question: 'Automatic changeover switches should be tested for:',
    options: ['Colour matching', 'Correct operation between supply sources', 'Physical alignment', 'Cable terminations only'],
    correctAnswer: 1,
    explanation: 'Automatic changeover switches must be tested for correct changeover between normal and alternative supplies.',
    category: 'Functional Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-30',
    question: 'Ventilation interlock switches should verify:',
    options: ['Fan colour', 'Equipment cannot operate without adequate ventilation', 'Duct size', 'Cable size'],
    correctAnswer: 1,
    explanation: 'Ventilation interlocks must confirm that equipment cannot operate unless adequate ventilation is proven.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-31',
    question: 'At what stage of testing is functional testing performed?',
    options: ['First, before all tests', 'Last, after all other verification', 'During dead testing', 'Before polarity testing'],
    correctAnswer: 1,
    explanation: 'Functional testing is typically performed last, after all other verification tests are complete.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Testing Sequence'
  },
  {
    id: 'ft-32',
    question: 'Fire alarm panel functional testing should:',
    options: ['Be done by the electrician', 'Be performed by competent fire alarm specialist', 'Only check power supply', 'Not be documented'],
    correctAnswer: 1,
    explanation: 'Fire alarm panel testing should be performed by a competent fire alarm specialist to appropriate standards.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 5839'
  },
  {
    id: 'ft-33',
    question: 'What documentation should accompany complex control systems?',
    options: ['Invoice only', 'Operating and maintenance instructions', 'EIC only', 'No documentation required'],
    correctAnswer: 1,
    explanation: 'Complex control systems should be provided with operating and maintenance instructions for the user.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-34',
    question: 'Push-button stations should be tested to confirm:',
    options: ['Button colour', 'Correct start/stop function and latching', 'Button size', 'Label text'],
    correctAnswer: 1,
    explanation: 'Push-button stations must be tested for correct start/stop function and proper latching operation where applicable.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-35',
    question: 'Overcurrent relay settings should be:',
    options: ['Set to maximum', 'Verified against designer\'s specification', 'Set to minimum', 'Left at factory default'],
    correctAnswer: 1,
    explanation: 'Overcurrent relay settings must be verified against the designer\'s specification to ensure correct protection.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-36',
    question: 'Safety interlocks on access doors should:',
    options: ['Allow door to open anytime', 'Prevent access while equipment is energised', 'Only lock from outside', 'Be disabled during testing'],
    correctAnswer: 1,
    explanation: 'Safety interlocks must prevent access to dangerous parts while equipment is energised or operating.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-37',
    question: 'Reversing starter contactors should be tested for:',
    options: ['Colour coding', 'Correct direction change and mechanical/electrical interlock', 'Physical size', 'Cable connections only'],
    correctAnswer: 1,
    explanation: 'Reversing starters must be tested for correct direction change and proper mechanical/electrical interlock operation.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-38',
    question: 'Undervoltage releases should be verified to:',
    options: ['Increase voltage', 'Trip the circuit when voltage falls below set level', 'Measure current', 'Check colours'],
    correctAnswer: 1,
    explanation: 'Undervoltage releases must be tested to verify they trip the circuit when voltage falls below the set threshold.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-39',
    question: 'Pilot lights and indicators should be tested for:',
    options: ['Brightness measurement', 'Correct indication of equipment status', 'Colour accuracy', 'Physical position'],
    correctAnswer: 1,
    explanation: 'Pilot lights must be tested to verify they correctly indicate the status of the equipment they monitor.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-40',
    question: 'Earth fault indicators should be tested to:',
    options: ['Check mounting', 'Verify they correctly detect and indicate earth faults', 'Measure resistance', 'Check colours'],
    correctAnswer: 1,
    explanation: 'Earth fault indicators must be tested to verify correct detection and indication of earth fault conditions.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-41',
    question: 'Pressure switches (for pumps) should be tested for:',
    options: ['Physical size', 'Correct cut-in and cut-out pressure settings', 'Colour matching', 'Cable size'],
    correctAnswer: 1,
    explanation: 'Pressure switches must be tested to verify they operate at the correct cut-in and cut-out pressure settings.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-42',
    question: 'Float switches should be tested to verify:',
    options: ['Float colour', 'Correct operation at set liquid levels', 'Float size', 'Cable length'],
    correctAnswer: 1,
    explanation: 'Float switches must be tested to verify correct operation at the designed liquid level settings.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-43',
    question: 'Limit switches on machinery should be tested to confirm:',
    options: ['Physical position', 'They stop movement at the correct position', 'Switch colour', 'Cable routing'],
    correctAnswer: 1,
    explanation: 'Limit switches must be tested to confirm they correctly stop machinery movement at the designed positions.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-44',
    question: 'Photoelectric switches should be tested for:',
    options: ['Light colour', 'Correct response to light level changes', 'Physical size', 'Mounting height'],
    correctAnswer: 1,
    explanation: 'Photoelectric switches must be tested to verify correct response to the designed light level thresholds.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-45',
    question: 'What must be available before functional testing?',
    options: ['Only tools', 'Design documentation and operating sequences', 'Only test instruments', 'Nothing specific'],
    correctAnswer: 1,
    explanation: 'Design documentation and operating sequences must be available to verify equipment operates as designed.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-46',
    question: 'Sequence controls should be tested to verify:',
    options: ['Equipment colour', 'Correct operation sequence is followed', 'Physical layout', 'Cable colours'],
    correctAnswer: 1,
    explanation: 'Sequence controls must be tested to verify the designed operation sequence is correctly followed.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-47',
    question: 'Alarm systems connected to the electrical installation should:',
    options: ['Not be tested', 'Be tested by appropriate specialists', 'Only have power checked', 'Be ignored'],
    correctAnswer: 1,
    explanation: 'Alarm systems should be tested by appropriate specialists according to relevant standards (e.g., BS 5839 for fire alarms).',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-48',
    question: 'Remote start/stop controls should be tested:',
    options: ['At the main panel only', 'At both remote and local positions', 'Only remotely', 'Only locally'],
    correctAnswer: 1,
    explanation: 'Remote controls must be tested at both remote and local positions to verify correct operation from all locations.',
    category: 'Functional Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-49',
    question: 'What should be recorded after functional testing?',
    options: ['Nothing', 'Confirmation that all devices operate correctly', 'Only failures', 'Time taken only'],
    correctAnswer: 1,
    explanation: 'Record confirmation that all tested devices operate correctly, noting any issues found.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'ft-50',
    question: 'If functional testing reveals a fault, what action is required?',
    options: ['Ignore minor faults', 'Investigate, rectify, and retest before certification', 'Only note on certificate', 'Leave for user to fix'],
    correctAnswer: 1,
    explanation: 'Any faults found must be investigated, rectified, and retested before the installation can be certified as satisfactory.',
    category: 'Functional Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.10'
  }
];
