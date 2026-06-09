/**
 * Module 7 · Section 6 · Subsection 5 — Commissioning Procedures
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Pre-commissioning checks, initial verification, functional testing, and handover documentation
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Commissioning Procedures - HNC Module 7 Section 6.5';
const DESCRIPTION =
  'Master commissioning procedures for electrical installations: pre-commissioning checks, initial verification per BS 7671, insulation resistance testing, continuity testing, RCD testing, polarity verification, functional testing, and EICR completion.';

const quickCheckQuestions = [
  {
    id: 'pre-commissioning',
    question: 'What is the primary purpose of pre-commissioning checks?',
    options: [
      'To verify installation completeness and identify defects before energisation',
      'Testing systems under both heating and cooling conditions',
      'Gravity causes the load to shift downwards, so the lower person naturally takes more weight',
      'Plan key points, practise what you will say, choose the right time and place, execute with empathy',
    ],
    correctIndex: 0,
    explanation:
      'Pre-commissioning checks verify that the installation is complete, correctly installed, and free from obvious defects before any electrical testing or energisation takes place.',
  },
  {
    id: 'dead-testing',
    question: 'Which tests must be completed before the installation is energised?',
    options: [
      'Missing grommets and exposed copper conductors',
      'Adjusting activity timing to avoid resource overallocation',
      'Continuity, insulation resistance, and polarity verification',
      'Building services engineer or ventilation specialist',
    ],
    correctIndex: 2,
    explanation:
      'Continuity of protective conductors, insulation resistance testing, and polarity verification are dead tests that must be completed before energisation to ensure safety.',
  },
  {
    id: 'insulation-resistance',
    question:
      'What is the minimum acceptable insulation resistance value for a 230V circuit per BS 7671?',
    options: [
      '0.5 MΩ',
      '10 MΩ',
      '2.0 MΩ',
      '1.0 MΩ',
    ],
    correctIndex: 3,
    explanation:
      'For circuits operating at nominal voltages up to and including 500V AC, the minimum insulation resistance value is 1.0 MΩ per Regulation 643.3.2 of BS 7671.',
  },
  {
    id: 'eicr-purpose',
    question: 'What is the purpose of the Electrical Installation Certificate (EIC)?',
    options: [
      'Accessible trunking and containment systems with mechanical fixings',
      'To certify that the installation complies with BS 7671 and is safe for use',
      'The ratio of real power to apparent power at the fundamental frequency',
      'Infrared radiation emitted by objects, which correlates to their surface temperature',
    ],
    correctIndex: 1,
    explanation:
      'The EIC certifies that the new installation, or alteration/addition, has been designed, constructed, inspected, and tested in accordance with BS 7671 and is safe to use.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What document should be completed first during visual inspection before any testing?',
    options: [
      'To translate between different protocols and connect to the internet',
      'Pre-commissioning checklist verifying installation completeness',
      'Imposter syndrome as described by Clance and Imes (1978)',
      'Building user surveys, energy analysis, and environmental monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'A pre-commissioning checklist should be completed first to verify installation completeness, correct component installation, and absence of obvious defects before any electrical testing begins.',
  },
  {
    id: 2,
    question:
      'According to BS 7671, at what test voltage should insulation resistance testing be performed on a 230V circuit?',
    options: [
      '1000V DC',
      '250V DC',
      '500V DC',
      '230V AC',
    ],
    correctAnswer: 2,
    explanation:
      'For circuits with nominal voltage up to and including 500V AC (which includes 230V circuits), insulation resistance testing must be performed at 500V DC per Table 64 of BS 7671.',
  },
  {
    id: 3,
    question:
      'When testing continuity of protective conductors, what is the purpose of comparing R1+R2 values?',
    options: [
      'After all safety tests are complete and the installation is energised',
      'All dead tests are satisfactory and the supply characteristics are known',
      'Schedule of Inspections and Schedule of Test Results',
      'To verify earth fault loop impedance will be within limits',
    ],
    correctAnswer: 3,
    explanation:
      'The measured R1+R2 value, when added to the external earth fault loop impedance (Ze), gives the total earth fault loop impedance (Zs), which must be within the limits stated in BS 7671 to ensure protective devices operate within the required disconnection time.',
  },
  {
    id: 4,
    question:
      'What is the maximum disconnection time for a 32A final circuit in a TN system per BS 7671?',
    options: [
      '0.4 seconds',
      '0.2 seconds',
      '0.1 seconds',
      '5 seconds',
    ],
    correctAnswer: 0,
    explanation:
      'For final circuits not exceeding 63A in TN systems, the maximum disconnection time is 0.4 seconds per Regulation 411.3.2.2. This ensures rapid disconnection under earth fault conditions.',
  },
  {
    id: 5,
    question: 'During polarity testing, which connections must be verified as correct?',
    options: [
      'Assertive communication respects both your own rights and the rights of others; aggressive communication disregards others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' rights',
      'Single-pole switches in line conductor, centre contact of ES lampholders to line, and correct phase rotation',
      'Pulseless electrical activity (PEA) — treated with high-quality CPR and addressing reversible causes',
      'It ensures consistent, accurate data that can be used in calculations and comparisons',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity testing verifies that single-pole switches are in the line conductor only, centre contacts of ES lampholders are connected to line, and phase rotation is correct for three-phase equipment.',
  },
  {
    id: 6,
    question: 'What is the maximum trip time for a 30mA RCD at 150mA test current?',
    options: [
      '300ms',
      '200ms',
      '40ms',
      '1 second',
    ],
    correctAnswer: 2,
    explanation:
      'When tested at 5 times rated residual current (5 x 30mA = 150mA), the RCD must trip within 40ms per BS EN 61008/61009. This verifies the RCD will provide fast disconnection under high fault currents.',
  },
  {
    id: 7,
    question: 'What test equipment is used to measure prospective fault current (PFC)?',
    options: [
      'The rate of flow of charge past a point',
      'Store safely for future reference',
      'Isolate the affected circuit and clearly inform the client',
      'Earth loop impedance tester with PFC function',
    ],
    correctAnswer: 3,
    explanation:
      'Earth loop impedance testers typically include a PFC measurement function. PFC must be measured at the origin and at various points to verify protective devices have adequate breaking capacity.',
  },
  {
    id: 8,
    question: 'When should functional testing of emergency lighting be performed?',
    options: [
      'After all safety tests are complete and the installation is energised',
      'To verify earth fault loop impedance will be within limits',
      'To report on the condition of an existing installation and identify defects',
      'All dead tests are satisfactory and the supply characteristics are known',
    ],
    correctAnswer: 0,
    explanation:
      'Functional testing of emergency lighting and other systems must be performed after the installation is safely energised and all safety verification tests have confirmed compliance.',
  },
  {
    id: 9,
    question: 'What document must accompany the EIC to record all test results?',
    options: [
      'Only if the terminal is designed to accommodate them safely',
      'Schedule of Inspections and Schedule of Test Results',
      'Match the phasing of building occupation',
      'Lower magnitude 5th and 7th harmonics',
    ],
    correctAnswer: 1,
    explanation:
      'The EIC must be accompanied by a Schedule of Inspections (confirming visual checks) and Schedule of Test Results (recording all measured values) to provide complete verification evidence.',
  },
  {
    id: 10,
    question: 'What is the purpose of an EICR (Electrical Installation Condition Report)?',
    options: [
      'To verify earth fault loop impedance will be within limits',
      'All dead tests are satisfactory and the supply characteristics are known',
      'To report on the condition of an existing installation and identify defects',
      'After all safety tests are complete and the installation is energised',
    ],
    correctAnswer: 2,
    explanation:
      'An EICR reports on the condition of an existing installation, identifying any damage, deterioration, defects, dangerous conditions, or non-compliance with current standards.',
  },
  {
    id: 11,
    question: 'Before energising an installation, which of the following must be confirmed?',
    options: [
      'To verify earth fault loop impedance will be within limits',
      'Schedule of Inspections and Schedule of Test Results',
      'After all safety tests are complete and the installation is energised',
      'All dead tests are satisfactory and the supply characteristics are known',
    ],
    correctAnswer: 3,
    explanation:
      'Before energisation, all dead tests (continuity, insulation resistance, polarity) must return satisfactory results, and the supply characteristics (voltage, frequency, PFC, Ze) must be known and recorded.',
  },
  {
    id: 12,
    question:
      'What classification code indicates a dangerous condition requiring immediate action on an EICR?',
    options: [
      'C1',
      'FI',
      'C3',
      'C2',
    ],
    correctAnswer: 0,
    explanation:
      "C1 indicates 'Danger present - risk of injury. Immediate remedial action required.' This classification requires the danger to be addressed before the installation continues in use.",
  },
];

const faqs = [
  {
    question: 'What is the correct sequence for initial verification testing?',
    answer:
      'The testing sequence per BS 7671 Regulation 643 is: (1) Continuity of protective conductors including main and supplementary bonding, (2) Continuity of ring final circuit conductors, (3) Insulation resistance, (4) Protection by SELV and PELV or electrical separation, (5) Basic protection by barriers and enclosures, (6) Insulation resistance/impedance of floors and walls, (7) Polarity, (8) Protection by automatic disconnection of supply. Steps 1-7 are dead tests; step 8 includes live testing.',
  },
  {
    question: 'How do I determine acceptable earth fault loop impedance values?',
    answer:
      'Maximum Zs values are found in BS 7671:2018+A4:2026 Tables 41.2-41.5 for different protective device types and ratings. The measured value must be less than 80% of the tabulated value to allow for temperature rise during fault conditions. For example, a 32A Type B MCB has a maximum Zs of 1.37Ω (A4:2026 Table 41.3, Cmin = 0.95 applied), so the measured value should not exceed 1.10Ω (1.37 × 0.8).',
  },
  {
    question: 'What should I do if insulation resistance test results are below the minimum?',
    answer:
      'If IR is below 1.0 MΩ: (1) Disconnect all loads and accessories, (2) Re-test individual circuits to identify the fault, (3) Subdivide cables by disconnecting at junction boxes, (4) Check for moisture ingress, damaged cables, or faulty accessories, (5) Repair faults and re-test until satisfactory. Never energise circuits with IR below minimum values.',
  },
  {
    question: 'When is a Minor Works Certificate appropriate instead of an EIC?',
    answer:
      'A Minor Works Certificate is appropriate for additions or alterations to an existing installation that do not include a new circuit - for example, adding a socket outlet to an existing circuit or replacing a consumer unit. If work involves a new circuit, an EIC is required with full Schedule of Test Results for that circuit.',
  },
  {
    question: 'How often should periodic inspection and testing be carried out?',
    answer:
      'Recommended intervals vary by installation type: domestic premises every 10 years (or change of occupancy), commercial every 5 years, industrial every 3 years, swimming pools annually. However, the duty holder should assess risk and may require more frequent inspection. The previous EICR will recommend the next inspection date.',
  },
  {
    question: 'What handover documentation must be provided to the client?',
    answer:
      "The contractor must provide: (1) Electrical Installation Certificate or Minor Works Certificate with schedules, (2) As-built drawings showing final installation, (3) Operation and Maintenance manual including manufacturers' literature, (4) Test equipment calibration certificates if requested, (5) Building Regulations Part P notification confirmation where applicable, (6) Any warranties or guarantees.",
  },
];

const HNCModule7Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Subsection 5"
            title="Commissioning Procedures"
            description="Pre-commissioning checks, initial verification, functional testing, and handover documentation"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Conduct systematic pre-commissioning checks per BS 7671",
              "Perform dead tests: continuity, insulation resistance, polarity",
              "Execute live tests: Zs, PFC, and RCD operation testing",
              "Apply correct test sequences and interpret results",
              "Complete EIC and EICR documentation accurately",
              "Prepare comprehensive handover packages for clients",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Pre-Commissioning Checks">
            <p>Pre-commissioning checks form the essential first stage of verification, conducted before any electrical testing begins. This systematic visual inspection identifies installation defects, ensures completeness, and confirms the installation is ready for safe testing.</p>
            <p><strong>Pre-Commissioning Checklist Items:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Connection integrity:</strong> All terminations tight, cables correctly identified</li>
              <li><strong>Cable installation:</strong> Correct support, bend radii, segregation maintained</li>
              <li><strong>Enclosure security:</strong> All covers fitted, IP ratings maintained, knockouts sealed</li>
              <li><strong>Earthing system:</strong> All earth connections made, bonding conductors installed</li>
              <li><strong>Labelling:</strong> Circuit identification, warning notices, safety signs in place</li>
            </ul>
            <p><strong>Visual Inspection Requirements per BS 7671 Regulation 643.1</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Conductor selection:</strong> CSA for current and voltage drop — Undersized cables, incorrect type</li>
              <li><strong>Connection of conductors:</strong> Correct method, accessibility — Loose terminals, inaccessible joints</li>
              <li><strong>Protective devices:</strong> Type and rating correct — Wrong MCB type, oversized fuses</li>
              <li><strong>Basic protection:</strong> Insulation, barriers, enclosures — Exposed live parts, damaged insulation</li>
              <li><strong>Presence of diagrams:</strong> Wiring diagrams at DB, circuit charts — Missing or incomplete documentation</li>
            </ul>
            <p><strong>Critical requirement:</strong> Visual inspection must be completed and any defects rectified before proceeding to electrical testing. Never test an installation with visible defects.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Initial Verification - Dead Tests">
            <p>Dead tests are performed with the supply isolated and the installation de-energised. These tests verify the fundamental safety of the installation before any live testing or energisation takes place.</p>
            <p><strong>Continuity Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Protective conductors (CPC)</li>
              <li>Main bonding conductors</li>
              <li>Supplementary bonding</li>
              <li>Ring final circuit conductors</li>
              <li>Record R1+R2 values</li>
            </ul>
            <p><strong>Insulation Resistance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L-N, L-E, N-E testing</li>
              <li>500V DC test voltage</li>
              <li>Minimum 1.0 MΩ required</li>
              <li>Disconnect sensitive equipment</li>
              <li>Test with switches on</li>
            </ul>
            <p><strong>Polarity Verification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-pole switches in line</li>
              <li>ES lampholder centre contacts</li>
              <li>Socket outlet connections</li>
              <li>Phase rotation (3-phase)</li>
              <li>Use approved voltage indicator</li>
            </ul>
            <p><strong>Insulation Resistance Test Requirements per BS 7671</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SELV and PELV:</strong> 250V — &gt;0.5 MΩ</li>
              <li><strong>Up to and including 500V (except SELV/PELV):</strong> 500V — &gt;1.0 MΩ</li>
              <li><strong>Above 500V up to 1000V:</strong> 1000V — &gt;1.0 MΩ</li>
            </ul>
            <p><strong>Ring Final Circuit Continuity Test Procedure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1:</strong> Measure end-to-end resistance of L conductors (r1)</li>
              <li><strong>Step 2:</strong> Measure end-to-end resistance of N conductors (rn)</li>
              <li><strong>Step 3:</strong> Measure end-to-end resistance of CPC (r2)</li>
              <li><strong>Step 4:</strong> Cross-connect L1 to L2 and N1 to N2, test each socket (should equal r1/4 + rn/4)</li>
              <li><strong>Step 5:</strong> Cross-connect L1 to CPC2, test L-CPC at each socket to obtain R1+R2</li>
              <li><strong>Result:</strong> All readings should be consistent; significant deviation indicates spurs or faults</li>
            </ul>
            <p><strong>Test instrument requirement:</strong> All test equipment must be calibrated and comply with GS38 for electrical test equipment used by electricians.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Live Testing and RCD Verification">
            <p>Live testing is performed after all dead tests return satisfactory results and the installation is safely energised. These tests verify the effectiveness of the protective measures under actual operating conditions.</p>
            <p><strong>Earth Fault Loop Impedance (Zs) Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Purpose:</strong> Verify protective devices will disconnect within required time</li>
              <li><strong>Formula:</strong> Zs = Ze + (R1+R2)</li>
              <li><strong>Measurement:</strong> Use earth loop impedance tester at furthest point of circuit</li>
              <li><strong>Temperature correction:</strong> Measured value must not exceed 80% of maximum tabulated value</li>
            </ul>
            <p><strong>Maximum Earth Fault Loop Impedance Values (BS 7671 Table 41.3)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>6A:</strong> 7.28 — 3.64 — 1.82</li>
              <li><strong>16A:</strong> 2.73 — 1.37 — 0.68</li>
              <li><strong>32A:</strong> 1.37 — 0.68 — 0.34</li>
              <li><strong>63A:</strong> 0.69 — 0.35 — 0.17</li>
            </ul>
            <p>Values from BS 7671:2018+A4:2026 Table 41.3 (Cmin = 0.95 applied). Apply 0.8 multiplier to account for conductor temperature rise during fault conditions.</p>
            <p><strong>RCD Testing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No-trip test:</strong> 50% IΔn (15mA for 30mA RCD) — N/A — Must NOT trip</li>
              <li><strong>Full test (AC):</strong> 100% IΔn (30mA) — 300ms — Must trip ≤300ms</li>
              <li><strong>5× test (pre-A4 only):</strong> 5× IΔn (150mA) — 40ms — No longer required by BS 7671 — A4:2026 deleted Table 3A and verifies at IΔn only (Reg 643.3)</li>
              <li><strong>Ramp test:</strong> Rising current — N/A — Record actual trip current</li>
            </ul>
            <p><strong>Safety note:</strong> RCD testing causes earth leakage that will trip the device. Ensure connected equipment can tolerate sudden disconnection and reset all RCDs after testing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Functional Testing and Handover Documentation">
            <p>Functional testing verifies that all systems operate as intended after successful completion of safety verification tests. This includes testing controls, interlocks, and operational sequences, followed by comprehensive documentation and formal handover.</p>
            <p><strong>Functional Testing Requirements</strong></p>
            <p><strong>Lighting Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• All luminaires illuminate correctly</li>
              <li>• Switching operates as designed</li>
              <li>• Dimming controls function smoothly</li>
              <li>• Emergency lighting duration test</li>
              <li>• PIR/daylight sensors respond</li>
            </ul>
            <p><strong>Power Distribution</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Load balancing across phases</li>
              <li>• Metering reads correctly</li>
              <li>• Changeover switches operate</li>
              <li>• Generator start/transfer sequence</li>
              <li>• UPS battery backup duration</li>
            </ul>
            <p><strong>Certification Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electrical Installation Certificate (EIC):</strong> New installations, new circuits — Schedule of Inspections, Schedule of Test Results</li>
              <li><strong>Minor Works Certificate:</strong> Additions/alterations without new circuits — Test results on certificate form</li>
              <li><strong>Electrical Installation Condition Report (EICR):</strong> Periodic inspection of existing installation — Condition report, observations, schedules</li>
            </ul>
            <p><strong>EICR Classification Codes</strong></p>
            <p><strong>C1 - Danger present:</strong> Risk of injury exists. Immediate remedial action required.</p>
            <p><strong>C2 - Potentially dangerous:</strong> Urgent remedial action required.</p>
            <p><strong>C3 - Improvement recommended:</strong> Not compliant with current standards but no immediate danger.</p>
            <p><strong>FI - Further investigation:</strong> Cannot determine condition without further investigation.</p>
            <p><strong>Handover Documentation Package</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC/Minor Works/EICR:</strong> Completed and signed by competent person</li>
              <li><strong>Schedule of Test Results:</strong> All circuits with measured values</li>
              <li><strong>As-built drawings:</strong> Final installation layout, distribution schematics</li>
              <li><strong>O&amp;M manual:</strong> Manufacturers' literature, maintenance schedules</li>
              <li><strong>Part P notification:</strong> Building Control notification where applicable</li>
              <li><strong>Warranties:</strong> Equipment guarantees and installer warranties</li>
            </ul>
            <p><strong>Professional requirement:</strong> Certificates must only be issued by persons competent in electrical installation testing and able to verify the work meets BS 7671 requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Verifying Earth Fault Loop Impedance</strong>
            </p>
            <p><strong>Scenario:</strong> A 32A Type B MCB protects a ring final circuit. Ze measured at origin = 0.35Ω. Verify the circuit is compliant.</p>
            <p>Given information:</p>
            <p>MCB: 32A Type B</p>
            <p>Ze (measured at origin): 0.35Ω</p>
            <p>R1+R2 (measured at furthest socket): 0.72Ω</p>
            <p>Step 1: Calculate total Zs</p>
            <p>Zs = Ze + (R1+R2)</p>
            <p>Zs = 0.35 + 0.72 = 1.07Ω</p>
            <p>Step 2: Check against BS 7671:2018+A4:2026 Table 41.3</p>
            <p>Maximum Zs for 32A Type B = 1.37Ω (Cmin = 0.95 applied)</p>
            <p>Apply 0.8 correction: 1.37 × 0.8 = 1.10Ω</p>
            <p>Result: 1.07Ω &lt; 1.10Ω - COMPLIANT</p>
            <p>
              <strong>Example 2: Troubleshooting Low Insulation Resistance</strong>
            </p>
            <p><strong>Scenario:</strong> A lighting circuit shows 0.4 MΩ insulation resistance. Identify and locate the fault.</p>
            <p>Initial test result:</p>
            <p>Circuit 3 (Lighting) IR: 0.4 MΩ - FAIL (minimum 1.0 MΩ)</p>
            <p>Fault-finding procedure:</p>
            <p>Step 1: Disconnect all luminaires at their terminals</p>
            <p>Step 2: Re-test IR = 1.5 MΩ (cable is OK)</p>
            <p>Step 3: Reconnect luminaires one at a time</p>
            <p>Step 4: After reconnecting luminaire 5: IR = 0.4 MΩ</p>
            <p>Fault identified: Luminaire 5 has internal insulation breakdown</p>
            <p>Action: Replace luminaire and re-test entire circuit</p>
            <p>Final IR: 1.8 MΩ - COMPLIANT</p>
            <p>
              <strong>Example 3: RCD Test Sequence</strong>
            </p>
            <p><strong>Scenario:</strong> Complete RCD testing on a 30mA Type A RCBO protecting a socket circuit.</p>
            <p>Test equipment: Calibrated multifunction tester</p>
            <p>Device: 30mA Type A RCBO</p>
            <p>Test 1: 50% IΔn (15mA) - No trip test</p>
            <p>Result: Device did not trip ✓</p>
            <p>Test 2: 100% IΔn (30mA) - Full load test</p>
            <p>Result: Tripped in 28ms ✓ (must be ≤300ms)</p>
            <p>Test 3: Ramp test (informational, manufacturer guidance)</p>
            <p>Result: Tripped at 24mA (within 50-100% of IΔn) ✓</p>
            <p>Note: BS 7671:2018+A4:2026 (Reg 643.3) verifies at IΔn only — the older 5×IΔn shot and Appendix 3 Table 3A have been deleted.</p>
            <p>All RCD tests PASS - Record results on schedule</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning Sequence Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete visual inspection and pre-commissioning checks</li>
              <li>Perform continuity tests on all protective conductors</li>
              <li>Complete ring final circuit continuity tests where applicable</li>
              <li>Test insulation resistance on all circuits</li>
              <li>Verify polarity throughout the installation</li>
              <li>Energise installation and measure supply characteristics</li>
              <li>Test earth fault loop impedance and prospective fault current</li>
              <li>Test all RCDs and RCBOs</li>
              <li>Conduct functional testing of all systems</li>
              <li>Complete and issue certification</li>
            </ul>
            <p>
              <strong>Key Test Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum IR for 230V circuits: <strong>1.0 MΩ</strong> at 500V DC</li>
              <li>RCD trip time at IΔn (BS 7671:2018+A4:2026 Reg 643.3, single AC test): <strong>≤300ms</strong></li>
              <li>TN disconnection time ≤63A: <strong>0.4 seconds</strong></li>
              <li>Temperature correction factor: <strong>0.8</strong> (multiply max Zs)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Testing before visual inspection</strong> - Always inspect first, test second</li>
                <li><strong>Energising with failed IR</strong> - Never energise circuits below 1.0 MΩ</li>
                <li><strong>Forgetting temperature correction</strong> - Apply 0.8 factor to tabulated Zs values</li>
                <li><strong>Incomplete documentation</strong> - All test results must be recorded</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Coordination studies
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Documentation requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_5;
