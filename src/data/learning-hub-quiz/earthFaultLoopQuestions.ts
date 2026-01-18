import { QuizQuestion } from '@/types/quiz';

export const earthFaultLoopQuestions: QuizQuestion[] = [
  {
    id: 'efl-1',
    question: 'What is the formula for calculating total earth fault loop impedance (Zs)?',
    options: ['Zs = Ze × (R1+R2)', 'Zs = Ze + (R1+R2)', 'Zs = Ze - (R1+R2)', 'Zs = Ze / (R1+R2)'],
    correctAnswer: 1,
    explanation: 'Zs = Ze + (R1+R2), where Ze is external earth fault loop impedance and R1+R2 is the circuit resistance from continuity testing.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-2',
    question: 'What is the maximum Zs for a 32A Type B MCB (0.4s disconnection)?',
    options: ['2.73Ω', '1.37Ω', '0.68Ω', '7.28Ω'],
    correctAnswer: 1,
    explanation: 'For a 32A Type B MCB, the maximum Zs is 1.37Ω to ensure disconnection within 0.4 seconds.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-3',
    question: 'When measuring Ze at the origin, what must be disconnected?',
    options: ['All circuit breakers', 'The earthing conductor from the MET', 'The neutral conductor', 'All appliances'],
    correctAnswer: 1,
    explanation: 'The earthing conductor must be disconnected from the MET to remove parallel paths and obtain an accurate Ze measurement.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-4',
    question: 'What does Ze represent?',
    options: ['Total circuit impedance', 'External earth fault loop impedance', 'Equipment impedance', 'Earth electrode resistance'],
    correctAnswer: 1,
    explanation: 'Ze is the external earth fault loop impedance - the impedance of the supply transformer, supply cables, and return path external to the installation.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-5',
    question: 'What is the maximum Zs for a 6A Type B MCB (0.4s)?',
    options: ['1.37Ω', '2.73Ω', '7.28Ω', '14.6Ω'],
    correctAnswer: 2,
    explanation: 'For a 6A Type B MCB, the maximum Zs is 7.28Ω for 0.4 second disconnection time.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-6',
    question: 'What must happen AFTER measuring Ze?',
    options: ['Leave earthing disconnected', 'Reconnect the earthing conductor before re-energising', 'Replace the earthing with bonding', 'Measure insulation resistance'],
    correctAnswer: 1,
    explanation: 'The earthing conductor MUST be reconnected before the installation is re-energised. Failure to do so removes the earth fault path.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-7',
    question: 'Why might EFLI testers trip RCDs during testing?',
    options: ['They use too much current', 'They inject test current through the earth path', 'They are faulty', 'They test at the wrong voltage'],
    correctAnswer: 1,
    explanation: 'EFLI testers inject a test current that flows through the earth path, which can be detected by RCDs as an imbalance causing them to trip.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-8',
    question: 'What type of tester can measure Zs without tripping RCDs?',
    options: ['Standard EFLI tester', 'No-trip tester (below 15mA or DC biased)', 'Insulation tester', 'Continuity tester'],
    correctAnswer: 1,
    explanation: 'No-trip testers use test currents below 15mA or DC biased signals that do not trigger RCDs while still measuring Zs.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-9',
    question: 'What components make up the earth fault loop?',
    options: ['Line conductor only', 'CPC, MET, earthing conductor, return path, transformer winding, line conductor', 'Earth electrode only', 'Main switch and meter'],
    correctAnswer: 1,
    explanation: 'The earth fault loop comprises: CPC, main earthing terminal (MET), earthing conductor, return path to transformer, transformer winding, and line conductor.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-10',
    question: 'What is the maximum Zs for a 16A Type B MCB (0.4s)?',
    options: ['1.09Ω', '2.73Ω', '1.37Ω', '0.68Ω'],
    correctAnswer: 1,
    explanation: 'For a 16A Type B MCB, the maximum Zs is 2.73Ω for 0.4 second disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-11',
    question: 'What factor must be applied to measured Zs values for comparison with maximum values?',
    options: ['No factor needed', 'Temperature correction factor (Cmin 0.95)', 'Voltage correction', 'Length correction'],
    correctAnswer: 1,
    explanation: 'A correction factor (Cmin = 0.95 for UK supply) and temperature correction must be applied as Zs increases at higher operating temperatures.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Appendix A3'
  },
  {
    id: 'efl-12',
    question: 'Which verification method is preferred for final circuits?',
    options: ['Direct Zs measurement only', 'R1+R2 from continuity + Ze calculation', 'Visual inspection only', 'RCD testing'],
    correctAnswer: 1,
    explanation: 'Method 2 (R1+R2 + Ze calculation) is preferred for final circuits as it provides accurate results without needing live testing at every point.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-13',
    question: 'For sub-distribution boards, how is Zs calculated?',
    options: ['Zs = Ze + (R1+R2)', 'Zs = Zdb + (R1+R2)', 'Zs = 2 × Ze', 'Zs = R1+R2 only'],
    correctAnswer: 1,
    explanation: 'For circuits fed from sub-distribution boards, Zs = Zdb + (R1+R2), where Zdb is the earth fault loop impedance at the sub-board.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-14',
    question: 'What is the maximum Zs for a 32A Type C MCB (0.4s)?',
    options: ['1.37Ω', '2.73Ω', '0.68Ω', '0.34Ω'],
    correctAnswer: 2,
    explanation: 'Type C MCBs require higher fault current to trip. For 32A Type C, maximum Zs is 0.68Ω.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.4'
  },
  {
    id: 'efl-15',
    question: 'What is typical maximum Ze for a TN-C-S (PME) supply?',
    options: ['21Ω', '0.8Ω', '0.35Ω', '200Ω'],
    correctAnswer: 2,
    explanation: 'Typical maximum Ze for TN-C-S (PME) supplies is 0.35Ω as specified by DNOs.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-16',
    question: 'What is typical maximum Ze for a TN-S supply?',
    options: ['0.35Ω', '0.8Ω', '21Ω', '100Ω'],
    correctAnswer: 1,
    explanation: 'Typical maximum Ze for TN-S supplies is 0.8Ω.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-17',
    question: 'What is the maximum Zs for a 30mA RCD protecting a TT system?',
    options: ['1667Ω', '200Ω', '100Ω', '50Ω'],
    correctAnswer: 0,
    explanation: 'For 30mA RCD on TT: Zs ≤ 50V/0.03A = 1667Ω (much higher than TN systems due to RCD protection).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table 41.5'
  },
  {
    id: 'efl-18',
    question: 'When is live EFLI testing performed in the test sequence?',
    options: ['First test', 'After all dead tests and PFC measurement', 'Before continuity', 'Only during periodic inspection'],
    correctAnswer: 1,
    explanation: 'EFLI testing is performed after all dead tests are complete and after PFC measurement, as it requires a live supply.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Testing Sequence'
  },
  {
    id: 'efl-19',
    question: 'What does it mean if measured Zs exceeds the maximum tabulated value?',
    options: ['Installation is safe', 'Protective device may not disconnect in required time', 'Only affects 3-phase circuits', 'No significance'],
    correctAnswer: 1,
    explanation: 'If Zs exceeds the maximum, insufficient fault current will flow and the protective device may not disconnect within the required time, creating a shock hazard.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.4.5'
  },
  {
    id: 'efl-20',
    question: 'What is the maximum Zs for a 40A Type B MCB (0.4s)?',
    options: ['1.37Ω', '1.09Ω', '2.73Ω', '0.68Ω'],
    correctAnswer: 1,
    explanation: 'For a 40A Type B MCB, maximum Zs is 1.09Ω for 0.4 second disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-21',
    question: 'Why does Zs increase with cable temperature?',
    options: ['Cables expand', 'Conductor resistance increases with temperature', 'Insulation breaks down', 'Protective devices heat up'],
    correctAnswer: 1,
    explanation: 'Conductor resistance increases with temperature, so Zs measured on a cold circuit will be lower than when operating at full load temperature.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Appendix A3'
  },
  {
    id: 'efl-22',
    question: 'In what table are maximum Zs values for Type B MCBs found?',
    options: ['Table 41.2', 'Table 41.3', 'Table 41.4', 'Table 41.5'],
    correctAnswer: 1,
    explanation: 'BS 7671 Table 41.3 provides maximum Zs values for Type B circuit breakers.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-23',
    question: 'What disconnection time is required for socket outlets up to 32A?',
    options: ['5 seconds', '0.4 seconds', '1 second', '0.2 seconds'],
    correctAnswer: 1,
    explanation: 'Socket outlets up to 32A and mobile equipment require 0.4 second maximum disconnection time.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:411.3.2'
  },
  {
    id: 'efl-24',
    question: 'What disconnection time is permitted for fixed equipment in TN systems?',
    options: ['0.4 seconds', '5 seconds', '1 second', '0.2 seconds'],
    correctAnswer: 1,
    explanation: 'Fixed equipment in TN systems may have up to 5 seconds disconnection time, but 0.4s is required for socket circuits.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.3.2'
  },
  {
    id: 'efl-25',
    question: 'What is R1 in the R1+R2 measurement?',
    options: ['Neutral conductor resistance', 'Line conductor resistance', 'Earth electrode resistance', 'Total circuit resistance'],
    correctAnswer: 1,
    explanation: 'R1 is the resistance of the line conductor from the distribution board to the point of measurement.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-26',
    question: 'What is R2 in the R1+R2 measurement?',
    options: ['Line conductor resistance', 'Circuit protective conductor (CPC) resistance', 'Neutral resistance', 'External earth resistance'],
    correctAnswer: 1,
    explanation: 'R2 is the resistance of the circuit protective conductor (CPC) from the distribution board to the point of measurement.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-27',
    question: 'EFLI testing might trip which MCB rating even with no RCD present?',
    options: ['32A Type B', '6A Type B', '20A Type C', '40A Type D'],
    correctAnswer: 1,
    explanation: 'EFLI testers may inject enough current to trip 6A Type B breakers, which have a lower magnetic trip threshold.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-28',
    question: 'Where should Zs be measured on a radial circuit?',
    options: ['At the distribution board', 'At the furthest point from the board', 'At the midpoint', 'Anywhere on the circuit'],
    correctAnswer: 1,
    explanation: 'Zs should be measured at the furthest point from the distribution board where it will be highest.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-29',
    question: 'What could cause measured Ze to be lower than expected?',
    options: ['High supply voltage', 'Parallel earth paths through bonding or water pipes', 'Long supply cable', 'High ambient temperature'],
    correctAnswer: 1,
    explanation: 'Parallel earth paths through bonding conductors or metallic services can reduce the measured Ze value.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-30',
    question: 'Which BS 7671 regulation requires earth fault loop impedance verification?',
    options: ['Regulation 411.3.3', 'Regulation 643.7.3', 'Regulation 701.1', 'Regulation 512.2'],
    correctAnswer: 1,
    explanation: 'Regulation 643.7.3 requires verification of earth fault loop impedance.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'BS 7671:643.7.3'
  },
  {
    id: 'efl-31',
    question: 'What is the purpose of measuring earth fault loop impedance?',
    options: ['To calculate power consumption', 'To verify protective devices will operate within required time', 'To check cable insulation', 'To measure voltage drop'],
    correctAnswer: 1,
    explanation: 'EFLI measurement verifies that sufficient fault current will flow to operate protective devices within the required disconnection time.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Beginner',
    regulation: 'BS 7671:411.4.5'
  },
  {
    id: 'efl-32',
    question: 'If Zs measured is 1.2Ω for a 32A Type B circuit, what is the result?',
    options: ['Fail - exceeds 1.37Ω', 'Pass - within 1.37Ω limit', 'Retest required', 'Cannot determine'],
    correctAnswer: 1,
    explanation: 'The maximum Zs for 32A Type B is 1.37Ω. Measured value of 1.2Ω is within limits, so it passes.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-33',
    question: 'What two methods can verify earth fault loop impedance?',
    options: ['Visual and insulation tests', 'Direct measurement (live) or calculation from R1+R2 + Ze', 'RCD and PFC tests', 'Continuity and polarity'],
    correctAnswer: 1,
    explanation: 'Zs can be verified by direct live measurement with an EFLI tester, or by calculation: Zs = Ze + (R1+R2).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-34',
    question: 'Typical maximum Ze for a TT system is:',
    options: ['0.35Ω', '21Ω', '0.8Ω', '200Ω (earth electrode dependent)'],
    correctAnswer: 3,
    explanation: 'TT systems rely on earth electrodes, so Ze is determined by electrode resistance and is typically much higher (up to 200Ω is acceptable with 30mA RCD).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:411.5'
  },
  {
    id: 'efl-35',
    question: 'The main switch position during Ze measurement should be:',
    options: ['Closed (ON)', 'Open (OFF)', 'Either position', 'Removed'],
    correctAnswer: 1,
    explanation: 'The main switch must be OPEN during Ze measurement to isolate the installation while the earthing is disconnected.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-36',
    question: 'Which tables in BS 7671 provide maximum Zs values?',
    options: ['Tables 41.1 and 41.2', 'Tables 41.2, 41.3, 41.4', 'Tables 54.2 and 54.3', 'Tables I1 and I2'],
    correctAnswer: 1,
    explanation: 'BS 7671 Tables 41.2 (fuses), 41.3 (Type B MCBs), and 41.4 (Type C and D MCBs) provide maximum Zs values.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Chapter 41'
  },
  {
    id: 'efl-37',
    question: 'What correction is applied using the rule-of-thumb temperature adjustment?',
    options: ['Add 10%', 'Multiply measured value by 0.8', 'Multiply maximum value by 0.8', 'Subtract 0.1Ω'],
    correctAnswer: 2,
    explanation: 'The rule-of-thumb method multiplies maximum tabulated Zs by 0.8 to give a lower target that accounts for temperature rise during operation.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Appendix A3'
  },
  {
    id: 'efl-38',
    question: 'High Zs on a circuit could be caused by:',
    options: ['Short cable run', 'Oversized protective device', 'Poor connections or undersized conductors', 'Low supply voltage'],
    correctAnswer: 2,
    explanation: 'High Zs can result from poor connections (adding resistance), undersized conductors, or long cable runs.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-39',
    question: 'What is the maximum Zs for a 20A Type B MCB (0.4s)?',
    options: ['1.37Ω', '2.19Ω', '2.73Ω', '1.09Ω'],
    correctAnswer: 1,
    explanation: 'For a 20A Type B MCB, maximum Zs is 2.19Ω for 0.4 second disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-40',
    question: 'The earth fault loop includes the return path through:',
    options: ['Only the protective conductor', 'The transformer star point and supply neutral/combined neutral-earth', 'The main switch', 'Air'],
    correctAnswer: 1,
    explanation: 'The loop returns through the transformer star point via the supply neutral (TN-C-S) or separate earth (TN-S) conductor.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-41',
    question: 'What is the maximum Zs for a 50A Type B MCB (0.4s)?',
    options: ['1.09Ω', '0.87Ω', '1.37Ω', '0.68Ω'],
    correctAnswer: 1,
    explanation: 'For a 50A Type B MCB, maximum Zs is 0.87Ω for 0.4 second disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  },
  {
    id: 'efl-42',
    question: 'Which type of MCB requires lower Zs values - Type B or Type C?',
    options: ['Type B', 'Type C', 'Both the same', 'Depends on rating'],
    correctAnswer: 1,
    explanation: 'Type C MCBs require lower Zs values because they have a higher magnetic trip threshold (5-10 × In vs 3-5 × In for Type B).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Tables 41.3/41.4'
  },
  {
    id: 'efl-43',
    question: 'The symbol Zdb represents:',
    options: ['Earth electrode impedance', 'Earth fault loop impedance at a distribution board', 'Double-bonded impedance', 'Database reference'],
    correctAnswer: 1,
    explanation: 'Zdb represents the earth fault loop impedance measured at a distribution board (used for calculating Zs at circuits fed from that board).',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-44',
    question: 'What happens if only Ze + (R1+R2) method is used without verifying Ze is stable?',
    options: ['Results are more accurate', 'Calculated Zs may be invalid if Ze varies seasonally', 'No impact', 'Testing is faster'],
    correctAnswer: 1,
    explanation: 'Ze can vary with supply network changes. If only the calculation method is used, a spot check of actual Zs should verify the calculated value.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-45',
    question: 'For EICR periodic inspection, Zs readings should be:',
    options: ['Compared only to previous readings', 'Verified against maximum values for the protective device', 'Recorded but not evaluated', 'Only measured at the origin'],
    correctAnswer: 1,
    explanation: 'Zs readings must be compared against maximum permitted values to ensure continued compliance with disconnection time requirements.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.7.3'
  },
  {
    id: 'efl-46',
    question: 'What could cause Zs to increase between inspections?',
    options: ['New protective devices', 'Deteriorating connections or added cable length', 'Lower ambient temperature', 'Reduced loads'],
    correctAnswer: 1,
    explanation: 'Deteriorating connections (corrosion, loosening) or circuit extensions adding cable length will increase Zs over time.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-47',
    question: 'What is the maximum Zs for a BS 3036 30A rewirable fuse (0.4s)?',
    options: ['1.09Ω', '1.14Ω', '0.96Ω', '2.73Ω'],
    correctAnswer: 1,
    explanation: 'For a 30A BS 3036 rewirable fuse, maximum Zs is 1.14Ω for 0.4 second disconnection.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'BS 7671 Table 41.2'
  },
  {
    id: 'efl-48',
    question: 'Why is R1+R2 measured rather than just R2?',
    options: ['R1 is not important', 'Both contribute to the fault loop impedance', 'R1 is easier to measure', 'Regulations require it'],
    correctAnswer: 1,
    explanation: 'During an earth fault, current flows through both the line conductor (R1) and CPC (R2), so both contribute to Zs.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.15'
  },
  {
    id: 'efl-49',
    question: 'What is Cmin and what value is used for UK supplies?',
    options: ['Cable minimum size, 1.5mm²', 'Minimum voltage factor, 0.95', 'Circuit minimum rating, 6A', 'Correction minimum, 1.0'],
    correctAnswer: 1,
    explanation: 'Cmin is the minimum voltage factor accounting for supply voltage variation. For UK public supplies, Cmin = 0.95.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Advanced',
    regulation: 'GN3 Appendix A3'
  },
  {
    id: 'efl-50',
    question: 'A measured Zs of 2.8Ω on a 16A Type B circuit would:',
    options: ['Pass - within limits', 'Fail - exceeds 2.73Ω maximum', 'Need temperature correction first', 'Require RCD protection'],
    correctAnswer: 1,
    explanation: 'The maximum Zs for 16A Type B is 2.73Ω. A measured value of 2.8Ω exceeds this, so the circuit fails.',
    category: 'Earth Fault Loop Impedance',
    difficulty: 'Intermediate',
    regulation: 'BS 7671 Table 41.3'
  }
];
