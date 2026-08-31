/**
 * AM2 — the synoptic end-point assessment.
 *
 * Source: `~/Desktop/hav/IfATE-ST0152-Install-Maintenance-Electrician-standard.pdf`,
 * the Installation and Maintenance Electrician apprenticeship standard
 * (Crown copyright, Open Government Licence). Read from the PDF text, not
 * recalled — the section breakdown, the timings, the cable types and the fault
 * count are all quoted from it.
 *
 * ⚠️ This is NOT in `bs7671_facets` — AM2 is an assessment specification, not a
 * standard, so the usual RAG does not cover it. Anything added here later needs
 * the standard or the current AM2 specification in front of you.
 *
 * ⚠️ The source document dates from 2015 and says "IEE Guidance Note 3"; the
 * body is now the IET. Cards say "Guidance Note 3" to avoid propagating a
 * superseded name while staying faithful to what is examined. Timings and
 * content should be re-checked against the current AM2 spec before anyone
 * treats these as gospel for an assessment they are booked onto.
 */
import { FlashcardData } from './types';

export const am2Preparation: FlashcardData[] = [
  // ── Format ──────────────────────────────────────────────────────────────
  {
    id: 'am1',
    question: 'What is the AM2, in one line?',
    answer:
      'The synoptic end-point assessment for the electrician apprenticeship — externally set and marked by an independent body, and the industry benchmark of occupational competence for the last 30 years.',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'am2',
    question: 'How long is the AM2 and how is it split?',
    answer:
      'Typically 16.5 hours over two and a half days — a practical assessment in sections plus a theory paper of 40 multiple-choice questions.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am3',
    question: 'What are the four sections of the AM2?',
    answer:
      'A — Composite Installation. B — Inspection and Testing of the completed composite installation. C — Fault Diagnosis and Correction. D — Assessment of Applied Knowledge.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am4',
    question: 'What does AM2 stand for in full?',
    answer:
      'The Electrotechnical Assessment of Occupational Competence. Achieving it demonstrates the level of competence the industry expects.',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'am5',
    question: 'Does passing the AM2 alone complete the apprenticeship?',
    answer:
      'No — the AM2 is the synoptic end-point assessment. It is taken together with the rest of the standard, and it is the combination that leads to the apprenticeship certificate.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── Section A ───────────────────────────────────────────────────────────
  {
    id: 'am6',
    question: 'Name the cable types you must install and terminate in AM2 Section A.',
    answer:
      'PVC singles; PVC/PVC multi-core and cpc; SY multi-flex; heat-resistant flex; XLPE SWA; data cable; and FP200 type. Seven different terminations.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am7',
    question: 'Which lighting circuit must you install in AM2 Section A, and in what cable?',
    answer:
      'A two-way and intermediate lighting circuit, in PVC/PVC multi-core cable.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am8',
    question: 'What socket circuit must you install in AM2, and in what cable?',
    answer:
      'A BS 1363 13 A socket-outlet ring circuit, wired in PVC singles.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am9',
    question: 'Which safety service circuit features in AM2, and in what cable?',
    answer:
      'A carbon monoxide detector safety service circuit, in FP200 type cable.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am10',
    question: 'What three-phase work is in AM2 Section A?',
    answer:
      'Protective devices in a TP&N distribution board, and a three-phase direct-on-line motor/starter circuit wired in SY cable.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am11',
    question: 'Which industrial socket must be installed in AM2, and on what cable?',
    answer:
      'A BS EN 60309 16 A socket-outlet, wired in XLPE SWA.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am12',
    question: 'What heating system must you install in AM2?',
    answer:
      'An S Plan central heating and hot water system with a solar thermal sustainable-energy element, using heat-resistant flexible cable and PVC singles.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am13',
    question: 'What bonding is required in AM2 Section A?',
    answer:
      'Protective equipotential bonding to the gas and water services.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am14',
    question: 'What data work is in AM2?',
    answer:
      'A data outlets circuit in Cat. 5 cable — installed and terminated.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am15',
    question: 'What are the first two things assessed in AM2 Section A, before any cable goes up?',
    answer:
      'Risk assessment and safe isolation, then interpretation of the specification and technical data. Competence starts before the installing does.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── Section B ───────────────────────────────────────────────────────────
  {
    id: 'am16',
    question: 'List the tests required in AM2 Section B.',
    answer:
      'Continuity of protective conductors; continuity of ring final circuit conductors; insulation resistance; polarity; earth fault loop impedance; prospective fault current; and functional testing.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am17',
    question: 'What must you do before starting the inspection and test activity in Section B?',
    answer:
      'Assess the risk and work to best practice per health and safety legislation, and ensure the installation is correctly isolated before you begin.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am18',
    question: 'Which documents must you complete in AM2 Section B?',
    answer:
      'An electrical installation certificate, a schedule of inspections and a schedule of test results — using the model forms in Appendix 6 of BS 7671.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am19',
    question: 'What two documents govern the visual inspection in AM2 Section B?',
    answer:
      'BS 7671 and Guidance Note 3. The inspection is carried out in accordance with both, not just the regs.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── Section C ───────────────────────────────────────────────────────────
  {
    id: 'am20',
    question: 'How many faults must you find in AM2 Section C?',
    answer:
      'Seven — identified from "fault symptom" information given by the examiner. You must also state and record how each identified fault can be rectified.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am21',
    question: 'What must you do before starting fault diagnosis in AM2 Section C?',
    answer:
      'Undertake a risk assessment, select tools/equipment/instruments that are fit for purpose, carry out the required pre-diagnosis checks and preparations, and perform safe isolation in the correct sequence.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am22',
    question: 'Is finding the fault enough to pass Section C?',
    answer:
      'No — you must state AND record how each identified fault can be rectified. The recording is part of the assessed competence.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── Section D and the wider standard ────────────────────────────────────
  {
    id: 'am23',
    question: 'What three subject areas does AM2 Section D examine?',
    answer:
      'Health and Safety; BS 7671 Requirements for Electrical Installations; and the Building Regulations. Delivered as a computerised multiple-choice exam.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am24',
    question: 'What kinds of premises does the AM2 expect you to be competent in?',
    answer:
      'Commercial and industrial premises as well as dwellings — the tasks are those a full-scope electrical operative might face across all three.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'am25',
    question: 'Name the key occupational areas the AM2 confirms competence in.',
    answer:
      'Interpreting specifications, drawings and diagrams; risk assessment and health and safety; safe isolation; planning, installing, terminating and connecting wiring systems; inspection, testing and certification; and fault diagnosis and correction.',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'am26',
    question: 'What three things must your AM2 work comply with?',
    answer:
      'BS 7671, the relevant health and safety legislation, and current industry practices and procedures. All three are assessed, not just the wiring regs.',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
];
