import { QuizQuestion } from '@/types/quiz';

export const prospectiveFaultQuestions: QuizQuestion[] = [
  {
    id: 'pfc-1',
    question: 'What does Ipf represent?',
    options: ['Internal power factor', 'Prospective fault current', 'Insulation protection factor', 'Impedance protection factor'],
    correctAnswer: 1,
    explanation: 'Ipf is the prospective fault current - the maximum current that could flow during a fault at that point in the installation.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.7.3.201'
  },
  {
    id: 'pfc-2',
    question: 'Why must prospective fault current be determined?',
    options: ['To calculate voltage drop', 'To ensure protective device breaking capacity is adequate', 'To select cable colours', 'To measure power consumption'],
    correctAnswer: 1,
    explanation: 'Ipf must be determined to ensure the breaking capacity of protective devices is not less than the prospective fault current at their installation point.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'BS 7671:434.5.1'
  },
  {
    id: 'pfc-3',
    question: 'What two fault conditions must Ipf be determined for?',
    options: ['Line-earth and neutral-earth', 'Short-circuit AND earth fault conditions', 'Overload and short-circuit', 'Single-phase and three-phase'],
    correctAnswer: 1,
    explanation: 'Ipf must be determined under both short-circuit (L-N) and earth fault (L-E) conditions.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.7.3.201'
  },
  {
    id: 'pfc-4',
    question: 'Which value of Ipf should be recorded - PSCC or earth fault current?',
    options: ['The lower value', 'The higher (greater) of the two', 'Always PSCC', 'Always earth fault'],
    correctAnswer: 1,
    explanation: 'Record the GREATER of prospective short-circuit current (PSCC) and prospective earth fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-5',
    question: 'How can Ipf be determined?',
    options: ['Visual inspection only', 'Calculation, enquiry to DNO, or direct measurement', 'RCD testing', 'Continuity testing'],
    correctAnswer: 1,
    explanation: 'Ipf may be determined by calculation, enquiry to the DNO (Distribution Network Operator), or direct measurement with a suitable instrument.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-6',
    question: 'Where must prospective fault current be determined?',
    options: ['At the origin only', 'At every relevant point where protective devices operate', 'Only at socket outlets', 'Only at the main switch'],
    correctAnswer: 1,
    explanation: 'Ipf must be determined at every relevant point - each location where a protective device may need to interrupt fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.7.3.201'
  },
  {
    id: 'pfc-7',
    question: 'What happens to Ipf as you move downstream from the origin?',
    options: ['It increases', 'It decreases', 'It stays the same', 'It fluctuates randomly'],
    correctAnswer: 1,
    explanation: 'Ipf decreases with increasing distance from the origin due to added cable impedance (unless another supply source is connected).',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-8',
    question: 'What is the rated breaking capacity of BS EN 60898 MCBs marked "Icn 6"?',
    options: ['6A', '6kA', '60kA', '0.6kA'],
    correctAnswer: 1,
    explanation: 'Icn 6 means the rated breaking capacity is 6kA (6000 amps).',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-9',
    question: 'What breaking capacity do domestic consumer units typically require?',
    options: ['6kA', 'Up to 16kA', '25kA', '50kA'],
    correctAnswer: 1,
    explanation: 'Domestic consumer units typically require up to 16kA breaking capacity. If DNO declares Ipf ≤16kA, no measurement is needed.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-10',
    question: 'What is the difference between Icn and Ics for MCBs?',
    options: ['No difference', 'Icn = max interrupt (may damage), Ics = max without loss of performance', 'Ics is always higher', 'Icn is for AC, Ics is for DC'],
    correctAnswer: 1,
    explanation: 'Icn is the maximum breaking capacity (device may be altered). Ics is the service breaking capacity - maximum interrupt without loss of performance.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-11',
    question: 'For MCB marked "Icn 10", what is the Ics value?',
    options: ['10kA', '5kA', '7.5kA', '15kA'],
    correctAnswer: 2,
    explanation: 'For Icn 10, the service breaking capacity Ics is 7.5kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-12',
    question: 'What is the breaking capacity of BS 3036 rewirable fuses (S2A)?',
    options: ['1kA', '2kA', '4kA', '6kA'],
    correctAnswer: 1,
    explanation: 'BS 3036 S2A rewirable fuses have a rated breaking capacity of 2kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-13',
    question: 'What protection does regulation 434.5.1 require?',
    options: ['RCD protection', 'Breaking capacity ≥ Ipf at installation point', 'Surge protection', 'Fire barriers'],
    correctAnswer: 1,
    explanation: 'Regulation 434.5.1 requires that the breaking capacity of each protective device is not less than the prospective fault current at its point of installation.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:434.5.1'
  },
  {
    id: 'pfc-14',
    question: 'Where should Ipf be measured using an instrument?',
    options: ['Between live conductors downstream of suitable protection', 'Only at the consumer unit', 'At earth electrode', 'Between phases only'],
    correctAnswer: 0,
    explanation: 'Measure between live conductors at the protective device, downstream of a device rated for anticipated Ipf.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-15',
    question: 'For three-phase systems, balanced PSCC is approximately:',
    options: ['Same as single-phase', '2× single-phase value (rule of thumb)', '3× single-phase', 'Half of single-phase'],
    correctAnswer: 1,
    explanation: 'Maximum balanced three-phase PSCC is approximately 2× single-phase value (this rule of thumb errs on the safe side).',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-16',
    question: 'A more accurate three-phase PSCC can be found by:',
    options: ['Adding single-phase values', 'Dividing L-L fault current by 0.87', 'Multiplying by 3', 'Measuring at neutral'],
    correctAnswer: 1,
    explanation: 'For more accuracy, measure L-L fault current and divide by 0.87 to obtain the three-phase fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-17',
    question: 'Why are fused test leads alone not suitable for Ipf measurement?',
    options: ['They are not accurate', 'The fuses cannot protect against high fault currents', 'They cannot measure DC', 'They are too long'],
    correctAnswer: 1,
    explanation: 'Fused test leads alone do not provide adequate protection at high fault levels. A temporary protective device should be fitted if needed.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-18',
    question: 'What instrument measures Ipf?',
    options: ['Insulation tester', 'Prospective fault current function of EFLI/MFT', 'RCD tester', 'Clamp meter'],
    correctAnswer: 1,
    explanation: 'The prospective fault current range of a suitable earth fault loop impedance tester or multifunction tester is used.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 4.5'
  },
  {
    id: 'pfc-19',
    question: 'BS 88-2 System E fuses have a breaking capacity of:',
    options: ['6kA', '16kA', '50kA', '80kA at 400V'],
    correctAnswer: 3,
    explanation: 'BS 88-2 System E fuses have a breaking capacity of 80kA at 400V.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-20',
    question: 'If switchgear at the origin is suitably rated, what applies downstream?',
    options: ['All downstream needs checking', 'Downstream devices of similar rating need no further checks', 'Higher ratings required', 'Lower ratings required'],
    correctAnswer: 1,
    explanation: 'If switchgear at the origin is suitably rated for Ipf, downstream devices of similar or lower rating need no further verification (Ipf only decreases downstream).',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-21',
    question: 'Where is Ipf recorded on certification?',
    options: ['Not recorded', 'On EIC/EICR and Schedule of Test Results', 'Only on quotations', 'Minor works only'],
    correctAnswer: 1,
    explanation: 'The greater of PSCC and earth fault current is recorded on the EIC/EICR and Schedule of Test Results.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-22',
    question: 'What equipment may affect Ipf reading accuracy?',
    options: ['Normal loads', 'Grid-connected or island-mode inverters (PV systems)', 'Lighting circuits', 'Heating circuits'],
    correctAnswer: 1,
    explanation: 'PV systems with grid-connected or island-mode inverters can affect Ipf readings. See GN3 Section 2.6.24 for guidance.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.24'
  },
  {
    id: 'pfc-23',
    question: 'Which BS 7671 regulation covers prospective fault current requirements?',
    options: ['Regulation 411.3.3', 'Regulation 643.7.3.201', 'Regulation 701.1', 'Regulation 522.8'],
    correctAnswer: 1,
    explanation: 'Regulation 643.7.3.201 specifically requires determination of prospective fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.7.3.201'
  },
  {
    id: 'pfc-24',
    question: 'In the test sequence, when is Ipf measured?',
    options: ['First, before any other tests', 'After all dead tests, during live testing', 'Last, after functional tests', 'Only during periodic inspection'],
    correctAnswer: 1,
    explanation: 'Ipf is measured during live testing, after all dead tests have been completed.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Testing Sequence'
  },
  {
    id: 'pfc-25',
    question: 'What breaking capacity do BS 3036 S4A fuses have?',
    options: ['1kA', '2kA', '4kA', '6kA'],
    correctAnswer: 2,
    explanation: 'BS 3036 S4A rewirable fuses have a rated breaking capacity of 4kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-26',
    question: 'MCBs to BS EN 60898 with Icn 25 have what Ics?',
    options: ['25kA', '12.5kA', '6kA', '10kA'],
    correctAnswer: 1,
    explanation: 'For Icn 25, the service breaking capacity Ics is 12.5kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-27',
    question: 'Regulation 434.1 relates to:',
    options: ['RCD protection', 'Protection against fault current', 'Earthing arrangements', 'Cable installation'],
    correctAnswer: 1,
    explanation: 'Regulation 434.1 covers the requirement for protection against fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:434.1'
  },
  {
    id: 'pfc-28',
    question: 'What Ics applies to MCBs marked Icn 15?',
    options: ['15kA', '7.5kA', '10kA', '6kA'],
    correctAnswer: 1,
    explanation: 'For Icn 15, the service breaking capacity Ics is 7.5kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-29',
    question: 'BS EN 61439-3 consumer units are rated for Ipf up to:',
    options: ['6kA', '10kA', '16kA', '25kA'],
    correctAnswer: 2,
    explanation: 'Consumer units to BS EN 61439-3 are typically rated for up to 16kA prospective fault current.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-30',
    question: 'What happens if Ipf exceeds the breaking capacity of a protective device?',
    options: ['Device operates faster', 'Device may fail to interrupt the fault safely', 'Nothing - device is overrated', 'Fuse blows instead'],
    correctAnswer: 1,
    explanation: 'If Ipf exceeds breaking capacity, the device may fail catastrophically, potentially causing fire or further damage.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:434.5.1'
  },
  {
    id: 'pfc-31',
    question: 'GN3 Appendix 14 provides:',
    options: ['Cable sizing tables', 'Further guidance on Ipf requirements', 'RCD testing procedures', 'Insulation resistance limits'],
    correctAnswer: 1,
    explanation: 'GN3 Appendix 14 provides further guidance on prospective fault current requirements.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Appendix 14'
  },
  {
    id: 'pfc-32',
    question: 'PSCC stands for:',
    options: ['Power Supply Circuit Current', 'Prospective Short-Circuit Current', 'Protective System Circuit Capacity', 'Primary Supply Connection Current'],
    correctAnswer: 1,
    explanation: 'PSCC is Prospective Short-Circuit Current - the current that would flow during a line-to-neutral fault.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-33',
    question: 'What unit is Ipf measured in?',
    options: ['Ohms', 'Volts', 'kA (kiloamps)', 'MΩ'],
    correctAnswer: 2,
    explanation: 'Prospective fault current is measured in kiloamps (kA).',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-34',
    question: 'What must be done ALWAYS before measuring Ipf?',
    options: ['Turn off all loads', 'Measure downstream of suitable protection', 'Disconnect the earth', 'Turn off main switch'],
    correctAnswer: 1,
    explanation: 'Always measure downstream of a protective device rated for the anticipated Ipf to ensure safety during measurement.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-35',
    question: 'What breaking capacity do BS 3036 S1A fuses have?',
    options: ['1kA', '2kA', '4kA', '0.5kA'],
    correctAnswer: 0,
    explanation: 'BS 3036 S1A rewirable fuses have a rated breaking capacity of 1kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-36',
    question: 'For domestic properties, DNO typically declares Ipf as:',
    options: ['Not provided', 'Up to 16kA', 'Always 6kA', '25kA minimum'],
    correctAnswer: 1,
    explanation: 'DNOs typically declare maximum Ipf up to 16kA for domestic properties.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-37',
    question: 'What could cause Ipf to be higher than expected?',
    options: ['Long cable runs', 'Close proximity to distribution transformer', 'High ambient temperature', 'Low voltage supply'],
    correctAnswer: 1,
    explanation: 'Properties close to distribution transformers have lower supply impedance, resulting in higher prospective fault currents.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-38',
    question: 'MCBs to BS EN 60898 with Icn 20 have what Ics?',
    options: ['20kA', '10kA', '15kA', '6kA'],
    correctAnswer: 1,
    explanation: 'For Icn 20, the service breaking capacity Ics is 10kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-39',
    question: 'What is the relationship between supply impedance and Ipf?',
    options: ['Higher impedance = higher Ipf', 'Lower impedance = higher Ipf', 'No relationship', 'Impedance only affects voltage'],
    correctAnswer: 1,
    explanation: 'Lower supply impedance allows more fault current to flow, resulting in higher Ipf. This is why properties near transformers have higher Ipf.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-40',
    question: 'BS 88-2 System G fuses at 230V have breaking capacity of:',
    options: ['16kA', '50kA', '80kA', '100kA'],
    correctAnswer: 1,
    explanation: 'BS 88-2 System G fuses have 50kA breaking capacity at 230V (or 80kA at 400V).',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-41',
    question: 'What does an Ipf reading of 2.5kA at a domestic consumer unit indicate?',
    options: ['Device replacement needed', 'Within typical 16kA rating', 'Too high for installation', 'Measurement error'],
    correctAnswer: 1,
    explanation: '2.5kA is well within the 16kA rating of typical domestic consumer units - this is normal.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-42',
    question: 'If measured Ipf is 18kA at origin with 16kA rated equipment:',
    options: ['Acceptable - close enough', 'Unacceptable - exceeds breaking capacity', 'Only affects three-phase', 'Requires RCD addition'],
    correctAnswer: 1,
    explanation: '18kA exceeds 16kA rated breaking capacity - equipment upgrade required or supply impedance must be increased.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:434.5.1'
  },
  {
    id: 'pfc-43',
    question: 'What is the formula relating Ipf to impedance?',
    options: ['Ipf = V/Z', 'Ipf = V × Z', 'Ipf = Z/V', 'Ipf = V + Z'],
    correctAnswer: 0,
    explanation: 'Ipf = V/Z (Ohm\'s law). The prospective fault current equals supply voltage divided by total fault path impedance.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-44',
    question: 'What documentation should include the Ipf value?',
    options: ['Quotation only', 'EIC/EICR certificate', 'Building regulations only', 'Invoice only'],
    correctAnswer: 1,
    explanation: 'The Ipf value must be recorded on the Electrical Installation Certificate (EIC) or EICR.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-45',
    question: 'On a TT system, earth fault current is typically:',
    options: ['Higher than PSCC', 'Lower than PSCC due to earth electrode resistance', 'Same as PSCC', 'Not applicable'],
    correctAnswer: 1,
    explanation: 'On TT systems, earth fault current is typically much lower than PSCC due to the high resistance of the earth electrode path.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-46',
    question: 'What Ics applies to MCBs marked Icn 6?',
    options: ['3kA', '6kA', '10kA', '4.5kA'],
    correctAnswer: 1,
    explanation: 'For Icn 6, the service breaking capacity Ics equals Icn at 6kA.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Table 2.16'
  },
  {
    id: 'pfc-47',
    question: 'A backup protection arrangement allows:',
    options: ['Lower rated downstream devices', 'Downstream device protected by upstream device for faults above its rating', 'Higher Ipf ratings', 'Elimination of fuses'],
    correctAnswer: 1,
    explanation: 'Backup protection allows a downstream device with lower breaking capacity to be protected by an upstream device for fault levels above its rating.',
    category: 'Prospective Fault Current',
    difficulty: 'Advanced',
    regulation: 'BS 7671:434.5.2'
  },
  {
    id: 'pfc-48',
    question: 'What should be done if Ipf cannot be measured?',
    options: ['Estimate the value', 'Enquire from DNO or calculate', 'Skip the test', 'Use maximum published value'],
    correctAnswer: 1,
    explanation: 'If measurement is not possible, enquire from the DNO or calculate from known supply characteristics.',
    category: 'Prospective Fault Current',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-49',
    question: 'At what point in the installation is Ipf highest?',
    options: ['At the furthest socket', 'At the origin (supply intake)', 'At sub-distribution boards', 'In lighting circuits'],
    correctAnswer: 1,
    explanation: 'Ipf is highest at the origin where supply impedance is lowest and decreases as you move downstream.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.16'
  },
  {
    id: 'pfc-50',
    question: 'A measured Ipf of 8kA with a 10kA rated MCB is:',
    options: ['Inadequate protection', 'Adequate - Ipf is within breaking capacity', 'Borderline - needs verification', 'Requires immediate replacement'],
    correctAnswer: 1,
    explanation: '8kA is within the 10kA breaking capacity, so the protection is adequate.',
    category: 'Prospective Fault Current',
    difficulty: 'Beginner',
    regulation: 'BS 7671:434.5.1'
  }
];
