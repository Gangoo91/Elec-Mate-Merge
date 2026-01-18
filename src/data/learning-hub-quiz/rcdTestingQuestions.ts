import { QuizQuestion } from '@/types/quiz';

export const rcdTestingQuestions: QuizQuestion[] = [
  {
    id: 'rcd-1',
    question: 'What is the maximum trip time for a 30mA RCD at 1×IΔn (rated current)?',
    options: ['40ms', '150ms', '300ms', '500ms'],
    correctAnswer: 2,
    explanation: 'At 1×IΔn (30mA), a non-delay RCD must trip within 300ms maximum.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-2',
    question: 'What should you do BEFORE using an RCD test instrument?',
    options: ['Measure Zs', 'Press the RCD test button first', 'Disconnect all loads', 'Check polarity'],
    correctAnswer: 1,
    explanation: 'Press the RCD test button first as a basic functional check to confirm the device trips mechanically.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-3',
    question: 'At what test current should an RCD NOT trip?',
    options: ['1×IΔn', '5×IΔn', '½×IΔn', '2×IΔn'],
    correctAnswer: 2,
    explanation: 'An RCD should NOT trip at ½×IΔn (15mA for a 30mA RCD). If it trips at this level, it is over-sensitive.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-4',
    question: 'Is the 5×IΔn test mandatory per BS 7671:2018+A2:2022?',
    options: ['Yes, always required', 'No, it is optional (for fault-finding)', 'Only for 30mA RCDs', 'Only for TT systems'],
    correctAnswer: 1,
    explanation: 'The 5×IΔn test is OPTIONAL per BS 7671:2018+A2:2022 and is intended for fault-finding purposes only.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.17 Note 7'
  },
  {
    id: 'rcd-5',
    question: 'What is the maximum trip time for the 5×IΔn test on a non-delay RCD?',
    options: ['300ms', '150ms', '40ms', '500ms'],
    correctAnswer: 2,
    explanation: 'At 5×IΔn (150mA for 30mA RCD), a non-delay RCD must trip within 40ms.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-6',
    question: 'Why must RCDs be tested at both 0° and 180° phase angles?',
    options: ['To check both live and neutral', 'RCD sensitivity varies with AC waveform phase', 'To test faster', 'It is optional'],
    correctAnswer: 1,
    explanation: 'RCD sensitivity varies with the phase angle. Testing at both 0° and 180° ensures the device operates correctly on both halves of the AC waveform.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-7',
    question: 'Which trip time should be recorded when testing at 0° and 180°?',
    options: ['The shorter time', 'The longer time', 'The average', 'Only the 0° result'],
    correctAnswer: 1,
    explanation: 'Record the LONGER of the two trip times (worst case) to ensure the RCD meets requirements under all conditions.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-8',
    question: 'What essential test must be performed BEFORE RCD testing?',
    options: ['Continuity test', 'Earth fault loop impedance (EFLI)', 'Polarity test', 'Insulation resistance'],
    correctAnswer: 1,
    explanation: 'EFLI must be tested first to ensure safety - if Zs is too high, the RCD test could be unsafe.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-9',
    question: 'What does IΔn represent?',
    options: ['Test current', 'Rated residual operating current', 'Maximum load current', 'Neutral current'],
    correctAnswer: 1,
    explanation: 'IΔn is the rated residual operating current - the specified current at which the RCD is designed to trip (e.g., 30mA).',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-10',
    question: 'What is the maximum trip time for an S-type (time-delayed) RCD at 1×IΔn?',
    options: ['300ms', '40ms', '500ms', '150ms'],
    correctAnswer: 2,
    explanation: 'S-type (time-delayed) RCDs have a maximum trip time of 500ms at 1×IΔn.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-11',
    question: 'What should happen if an RCD trips during the ½×IΔn test?',
    options: ['Record the time and pass', 'The RCD is over-sensitive and should be replaced', 'Repeat the test', 'This is normal operation'],
    correctAnswer: 1,
    explanation: 'If an RCD trips at ½×IΔn, it is over-sensitive and may cause nuisance tripping in service. It should be replaced.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-12',
    question: 'For three-phase RCDs, how should testing be performed?',
    options: ['Test one phase only', 'Test each line to neutral separately', 'Test all phases simultaneously', 'Only test between phases'],
    correctAnswer: 1,
    explanation: 'Each line conductor must be tested to neutral separately to ensure balanced protection across all phases.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-13',
    question: 'What is the ½×IΔn test current for a 30mA RCD?',
    options: ['30mA', '15mA', '60mA', '150mA'],
    correctAnswer: 1,
    explanation: '½×IΔn for a 30mA RCD is 15mA (half of the rated current).',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-14',
    question: 'Where should RCD testing ideally be performed?',
    options: ['At the distribution board', 'At the RCD device itself', 'At the furthest practical point from the RCD', 'At any socket outlet'],
    correctAnswer: 2,
    explanation: 'Testing should be from the furthest practical point to prove circuit integrity and protection coverage throughout.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-15',
    question: 'How often does BS 7671 recommend pressing the RCD test button?',
    options: ['Monthly', 'Every 6 months', 'Annually', 'Only during electrical inspections'],
    correctAnswer: 1,
    explanation: 'BS 7671 Regulation 514.12.2 recommends the RCD test button be pressed at least every 6 months.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.12.2'
  },
  {
    id: 'rcd-16',
    question: 'What is the 5×IΔn test current for a 30mA RCD?',
    options: ['30mA', '150mA', '300mA', '15mA'],
    correctAnswer: 1,
    explanation: '5×IΔn for a 30mA RCD is 150mA (five times the rated current).',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-17',
    question: 'What maximum trip time applies at 5×IΔn for an S-type RCD?',
    options: ['40ms', '150ms', '300ms', '500ms'],
    correctAnswer: 1,
    explanation: 'S-type RCDs must trip within 150ms at 5×IΔn.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-18',
    question: 'Type AC RCDs detect:',
    options: ['Pulsating DC only', 'Sinusoidal AC residual current only', 'All types of residual current', 'Smooth DC only'],
    correctAnswer: 1,
    explanation: 'Type AC RCDs detect sinusoidal AC residual currents only. They may not detect DC components.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS EN 61008/61009'
  },
  {
    id: 'rcd-19',
    question: 'Type A RCDs detect:',
    options: ['AC only', 'Sinusoidal AC and pulsating DC', 'Smooth DC only', 'High frequency AC'],
    correctAnswer: 1,
    explanation: 'Type A RCDs detect sinusoidal AC and pulsating DC residual currents.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS EN 61008/61009'
  },
  {
    id: 'rcd-20',
    question: 'What additional test is required for Type A RCDs?',
    options: ['Insulation test', 'Pulsating DC test', 'Three-phase test', 'Voltage test'],
    correctAnswer: 1,
    explanation: 'Type A RCDs require additional pulsating DC tests to verify they detect DC residual currents.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-21',
    question: 'Type F RCDs are suitable for protecting:',
    options: ['Lighting circuits only', 'Equipment with variable frequency drives', 'Outdoor circuits only', 'Three-phase motors only'],
    correctAnswer: 1,
    explanation: 'Type F RCDs are designed for equipment with frequency inverters/variable speed drives which produce high-frequency residual currents.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'BS EN 62423'
  },
  {
    id: 'rcd-22',
    question: 'Type B RCDs detect:',
    options: ['AC only', 'Pulsating DC only', 'AC, pulsating DC, and smooth DC', 'High frequency only'],
    correctAnswer: 2,
    explanation: 'Type B RCDs detect all types: sinusoidal AC, pulsating DC, and smooth DC residual currents.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'BS EN 62423'
  },
  {
    id: 'rcd-23',
    question: 'Which column of the Schedule of Test Results records RCD trip times?',
    options: ['Column 24', 'Column 28', 'Column 12', 'Column 16'],
    correctAnswer: 1,
    explanation: 'Column 28 of the Schedule of Test Results is used to record RCD test results including trip times.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-24',
    question: 'What does an RCBO combine?',
    options: ['RCD and timer', 'RCD and MCB functions', 'Two RCDs', 'RCD and surge protection'],
    correctAnswer: 1,
    explanation: 'An RCBO (Residual Current Breaker with Overcurrent protection) combines RCD and MCB functions in one device.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'BS EN 61009'
  },
  {
    id: 'rcd-25',
    question: 'Can the test button prove an RCD will trip at the correct current?',
    options: ['Yes, it fully tests the RCD', 'No, it only proves the mechanical trip mechanism', 'Only on 30mA RCDs', 'Only on Type B RCDs'],
    correctAnswer: 1,
    explanation: 'The test button only proves the trip mechanism works. Proper testing with measured currents and timed responses is required for full verification.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-26',
    question: 'What rating RCD is required for socket outlets up to 32A per BS 7671?',
    options: ['100mA', '300mA', '30mA', '10mA'],
    correctAnswer: 2,
    explanation: '30mA RCD protection is required for socket outlets up to 32A for additional protection against electric shock.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:411.3.3'
  },
  {
    id: 'rcd-27',
    question: 'What regulation requires 30mA RCD protection for socket outlets?',
    options: ['Regulation 701.1', 'Regulation 411.3.3', 'Regulation 643.7', 'Regulation 521.1'],
    correctAnswer: 1,
    explanation: 'Regulation 411.3.3 requires additional protection by 30mA RCD for socket outlets up to 32A.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.3.3'
  },
  {
    id: 'rcd-28',
    question: 'The S-type RCD has an intentional:',
    options: ['Lower sensitivity', 'Time delay', 'Higher current rating', 'Faster response'],
    correctAnswer: 1,
    explanation: 'S-type RCDs have an intentional time delay to provide discrimination with downstream non-delay RCDs.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS EN 61008/61009'
  },
  {
    id: 'rcd-29',
    question: 'What is the purpose of RCD discrimination?',
    options: ['To save energy', 'To ensure only the RCD nearest the fault trips', 'To increase fault current', 'To test RCDs faster'],
    correctAnswer: 1,
    explanation: 'Discrimination ensures only the RCD nearest to the fault trips, maintaining supply to unaffected circuits.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:536.4'
  },
  {
    id: 'rcd-30',
    question: 'An RCD will NOT provide protection against:',
    options: ['Earth faults', 'Line-neutral faults where current is balanced', 'Indirect contact', 'Residual currents above IΔn'],
    correctAnswer: 1,
    explanation: 'RCDs detect current imbalance. A line-neutral fault has no current flowing to earth, so the RCD sees no imbalance.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:415.1'
  },
  {
    id: 'rcd-31',
    question: 'What test configuration shows the RCD type on the device?',
    options: ['Voltage rating', 'Type marking (AC, A, F, B)', 'Manufacturer logo', 'Installation date'],
    correctAnswer: 1,
    explanation: 'The RCD type is marked on the device (Type AC, A, F, or B) and determines which test modes to use.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-32',
    question: 'Some manufacturers use 250mA instead of 5×IΔn for 30mA RCDs because:',
    options: ['It is more accurate', 'Equipment limitations for high current pulses', 'Regulations require it', '250mA is safer to test'],
    correctAnswer: 1,
    explanation: 'Some RCD types have limitations on high current pulse testing, so 250mA is used as an alternative to 5×IΔn (150mA).',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-33',
    question: 'For a 100mA RCD, what is the 1×IΔn test current?',
    options: ['50mA', '100mA', '500mA', '200mA'],
    correctAnswer: 1,
    explanation: '1×IΔn is the rated current, so for a 100mA RCD, the test current is 100mA.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-34',
    question: 'RCDs marked with the wave symbol ~ detect:',
    options: ['DC only', 'AC sinusoidal currents (Type AC)', 'Pulsating DC', 'All current types'],
    correctAnswer: 1,
    explanation: 'The ~ symbol indicates Type AC RCDs which detect sinusoidal AC residual currents only.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS EN 61008'
  },
  {
    id: 'rcd-35',
    question: 'What indicates an RCD has become unreliable and needs replacement?',
    options: ['Trip times consistently at maximum limit', 'Failure to trip at ½×IΔn', 'Trips at ½×IΔn or fails to trip at 1×IΔn', 'Normal operation'],
    correctAnswer: 2,
    explanation: 'An RCD that trips at ½×IΔn (over-sensitive) or fails to trip at 1×IΔn within limits needs replacement.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-36',
    question: 'What does "non-delay" mean for RCD trip times?',
    options: ['Instant trip with no delay', 'Standard trip times without intentional delay', 'Maximum 10ms', 'No testing required'],
    correctAnswer: 1,
    explanation: 'Non-delay RCDs have no intentional delay - they trip as fast as the mechanism allows, within standard time limits.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-37',
    question: 'How long must an RCD be allowed to reset between tests?',
    options: ['No wait needed', 'Until the device has mechanically reset', '10 minutes', '1 hour'],
    correctAnswer: 1,
    explanation: 'Allow the RCD to fully reset mechanically before the next test to obtain accurate results.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-38',
    question: 'What determines whether 0° or 180° phase angle gives the longest trip time?',
    options: ['Cable length', 'RCD internal design and construction', 'Ambient temperature', 'Supply voltage'],
    correctAnswer: 1,
    explanation: 'The internal design of the RCD determines which phase angle produces the longest trip time.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-39',
    question: 'RCD testing on a TT system is particularly important because:',
    options: ['TT systems have lower voltages', 'The earth fault path has high impedance, relying on RCD operation', 'TT systems do not need RCDs', 'Testing is simpler on TT'],
    correctAnswer: 1,
    explanation: 'TT systems rely on RCDs for earth fault protection as the earth electrode path has high impedance and cannot guarantee fast MCB operation.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.5'
  },
  {
    id: 'rcd-40',
    question: 'After RCD testing, what must be done before leaving the installation?',
    options: ['Record test times only', 'Ensure all RCDs are reset and circuits are energised', 'Disconnect all RCDs', 'Leave RCDs in tripped state'],
    correctAnswer: 1,
    explanation: 'All RCDs must be reset and circuits re-energised before leaving to restore normal operation.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.18'
  },
  {
    id: 'rcd-41',
    question: 'What is the minimum trip time an RCD should achieve?',
    options: ['No minimum - faster is always better', 'There is no specified minimum', '10ms', '25ms for discrimination'],
    correctAnswer: 1,
    explanation: 'There is no specified minimum trip time - only maximum limits. Faster trips are acceptable.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-42',
    question: 'The BS 7671 requirement for 30mA RCD protection applies to:',
    options: ['All circuits in all installations', 'Socket outlets ≤32A and mobile equipment outdoors', 'Lighting circuits only', 'Three-phase circuits only'],
    correctAnswer: 1,
    explanation: 'BS 7671 requires 30mA RCD protection for socket outlets up to 32A and mobile equipment used outdoors.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.3.3'
  },
  {
    id: 'rcd-43',
    question: 'An AFDD (Arc Fault Detection Device) is tested by:',
    options: ['Applying test current like an RCD', 'Pressing the test button (if fitted)', 'Measuring insulation resistance', 'Cannot be field tested'],
    correctAnswer: 1,
    explanation: 'AFDDs with test buttons are tested by pressing the button. Those without cannot be functionally tested in the field.',
    category: 'RCD Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.19'
  },
  {
    id: 'rcd-44',
    question: 'What factor could cause nuisance tripping of RCDs?',
    options: ['Circuit overload', 'Accumulated earth leakage from multiple appliances', 'Short cable runs', 'Low ambient temperature'],
    correctAnswer: 1,
    explanation: 'Multiple appliances each with small earth leakage currents can accumulate to trip the RCD even without a fault.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:531.3.2'
  },
  {
    id: 'rcd-45',
    question: 'For a 300mA RCD, what is the ½×IΔn test current?',
    options: ['150mA', '300mA', '600mA', '75mA'],
    correctAnswer: 0,
    explanation: '½×IΔn for a 300mA RCD is 150mA.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-46',
    question: 'Why might 300mA RCDs be used instead of 30mA?',
    options: ['They are cheaper', 'For circuits where 30mA would nuisance trip', 'They provide better shock protection', '300mA is the new standard'],
    correctAnswer: 1,
    explanation: '300mA RCDs are used where accumulated leakage currents would cause nuisance tripping with 30mA (though they provide less personal protection).',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:531.3.2'
  },
  {
    id: 'rcd-47',
    question: 'The trip current of a 30mA RCD must operate between:',
    options: ['15mA and 30mA', 'Exactly 30mA', '30mA and 60mA', '20mA and 40mA'],
    correctAnswer: 0,
    explanation: 'RCDs must trip between ½×IΔn (15mA) and 1×IΔn (30mA). They must not trip below ½×IΔn.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.17'
  },
  {
    id: 'rcd-48',
    question: 'What symbol indicates a Type A RCD?',
    options: ['~', 'Sinusoidal wave over pulsating DC wave', 'B in a box', 'S in a box'],
    correctAnswer: 1,
    explanation: 'Type A RCDs are marked with a sinusoidal wave symbol above a pulsating DC wave symbol.',
    category: 'RCD Testing',
    difficulty: 'Intermediate',
    regulation: 'BS EN 61008'
  },
  {
    id: 'rcd-49',
    question: 'RCDs provide protection by detecting:',
    options: ['Overcurrent', 'Overvoltage', 'Imbalance between line and neutral currents', 'High frequency noise'],
    correctAnswer: 2,
    explanation: 'RCDs detect the difference (imbalance) between line and neutral currents. Any difference indicates current flowing via another path (earth).',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:415.1'
  },
  {
    id: 'rcd-50',
    question: 'A measured trip time of 28ms at 1×IΔn for a non-delay RCD is:',
    options: ['A failure - too slow', 'Acceptable - within 300ms limit', 'Borderline - needs retest', 'Over-sensitive'],
    correctAnswer: 1,
    explanation: '28ms is well within the 300ms maximum, so this is an acceptable pass.',
    category: 'RCD Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Table 2.17'
  }
];
