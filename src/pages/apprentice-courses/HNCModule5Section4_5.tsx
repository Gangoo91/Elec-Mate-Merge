/**
 * Module 5 · Section 4 · Subsection 5 — Testing and Verification
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Test procedures, acceptance criteria and compliance demonstration — proving the installation meets the specification, the standard and the contract.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Testing and Verification - HNC Module 5 Section 4.5';
const DESCRIPTION =
  'Master testing and verification procedures for building services: pre-commissioning tests, acceptance criteria, performance verification, test certificates, and compliance demonstration for HVAC, electrical, and mechanical systems.';

const quickCheckQuestions = [
  {
    id: 'pre-commission-purpose',
    question: 'What is the primary purpose of pre-commissioning tests?',
    options: [
      'To train operatives',
      'To verify systems are safe to energise/start',
      'To measure energy consumption',
      'To calculate maintenance costs',
    ],
    correctIndex: 1,
    explanation:
      'Pre-commissioning tests verify that systems are correctly installed and safe to energise or start. This includes continuity checks, insulation resistance, pressure tests, and visual inspections before any system is made live.',
  },
  {
    id: 'acceptance-criteria',
    question: 'Acceptance criteria for building services should be:',
    options: [
      'Defined after testing is complete',
      'Agreed before installation begins',
      "Left to the contractor's discretion",
      'Based solely on manufacturer data',
    ],
    correctIndex: 1,
    explanation:
      'Acceptance criteria must be defined and agreed with all parties before installation begins. This ensures everyone understands the required performance standards and how compliance will be measured.',
  },
  {
    id: 'witness-testing',
    question: 'Why is witnessed testing important in building services?',
    options: [
      'It is a legal requirement',
      'It provides independent verification of results',
      'It reduces the number of tests needed',
      'It speeds up the commissioning process',
    ],
    correctIndex: 1,
    explanation:
      'Witnessed testing provides independent verification that tests were conducted correctly and results are accurate. This is particularly important for critical systems and contractual handover.',
  },
  {
    id: 'compliance-demo',
    question: 'Compliance demonstration typically includes:',
    options: [
      'Only test certificates',
      'Test results, certificates, O&M manuals, and as-built drawings',
      'Verbal confirmation from contractors',
      'Energy performance data only',
    ],
    correctIndex: 1,
    explanation:
      'Compliance demonstration requires comprehensive documentation including test certificates, results with acceptance criteria comparison, operation and maintenance manuals, as-built drawings, and warranty information.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What document defines the required test procedures and acceptance criteria for a building services project?',
    options: [
      'The building regulations',
      'The commissioning specification',
      "The contractor's quality plan",
      'The health and safety file',
    ],
    correctAnswer: 1,
    explanation:
      'The commissioning specification defines all test procedures, acceptance criteria, and verification requirements. It is developed during design and forms part of the contract documentation.',
  },
  {
    id: 2,
    question:
      'An HVAC system pressure test reveals a 10% pressure drop over 30 minutes. What action should be taken?',
    options: [
      'Accept as minor leakage is normal',
      'Record and proceed to commissioning',
      'Locate and repair leaks, then retest',
      'Increase system pressure to compensate',
    ],
    correctAnswer: 2,
    explanation:
      'A 10% pressure drop indicates significant leakage. All leaks must be located, repaired, and the system retested until it achieves the specified pressure retention criteria (typically less than 1-2% drop).',
  },
  {
    id: 3,
    question: 'Which electrical test must be performed before energising a new distribution board?',
    options: [
      'Load test at 110% capacity',
      'Thermal imaging survey',
      'Insulation resistance between all circuits and earth',
      'Power factor measurement',
    ],
    correctAnswer: 2,
    explanation:
      'Insulation resistance testing between all circuits and earth must be performed before energising. This verifies there are no short circuits or insulation failures that could cause faults or fires when power is applied.',
  },
  {
    id: 4,
    question: 'Performance verification of an air handling unit should include:',
    options: [
      'Only measuring airflow rates',
      'Airflow, temperature, humidity, noise levels, and energy consumption',
      'Visual inspection only',
      "Checking the manufacturer's label",
    ],
    correctAnswer: 1,
    explanation:
      'Performance verification must cover all specified parameters: airflow rates at each outlet, supply/extract temperatures, humidity control accuracy, noise levels, and energy consumption against design criteria.',
  },
  {
    id: 5,
    question: 'What is a snagging list in the context of building services handover?',
    options: [
      'A list of all installed equipment',
      'A schedule of maintenance tasks',
      'A record of defects requiring rectification',
      'A training programme for operatives',
    ],
    correctAnswer: 2,
    explanation:
      'A snagging list records all defects, incomplete works, and items not meeting specification discovered during inspection and testing. These must be rectified before practical completion.',
  },
  {
    id: 6,
    question: 'The Building Regulations require that fixed building services:',
    options: [
      'Are installed by registered contractors only',
      'Achieve minimum energy efficiency standards',
      'Are tested by independent bodies',
      'Use only British-manufactured equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Part L of the Building Regulations requires fixed building services (heating, cooling, ventilation, lighting) to achieve minimum energy efficiency standards, with compliance demonstrated through testing and commissioning.',
  },
  {
    id: 7,
    question: 'A commissioning certificate should be signed by:',
    options: [
      'The client only',
      'The commissioning engineer who conducted the tests',
      'The building control officer',
      "The main contractor's project manager",
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning certificates must be signed by the commissioning engineer who conducted or witnessed the tests. This provides accountability and professional certification that tests were properly performed.',
  },
  {
    id: 8,
    question: "What is the purpose of a 'burn-in' period for building services?",
    options: [
      'To test fire alarm systems',
      'To operate systems under load to identify early failures',
      'To heat the building before occupation',
      'To calibrate temperature sensors',
    ],
    correctAnswer: 1,
    explanation:
      'A burn-in period operates systems under realistic load conditions to identify early failures (infant mortality) before handover. This typically runs for 2-4 weeks and allows fine-tuning of controls.',
  },
  {
    id: 9,
    question: 'Seasonal commissioning is required because:',
    options: [
      'Contractors prefer to work in certain seasons',
      'Some systems can only be tested under specific ambient conditions',
      'Building regulations specify testing dates',
      'Equipment warranties require it',
    ],
    correctAnswer: 1,
    explanation:
      'Seasonal commissioning is needed because heating systems require cold weather and cooling systems require warm weather for meaningful performance testing. Initial handover may include provision for seasonal revisits.',
  },
  {
    id: 10,
    question: 'What standard governs the commissioning of air distribution systems in the UK?',
    options: [
      'BS 7671',
      'CIBSE Commissioning Codes',
      'Building Regulations Part F only',
      'BSRIA BG 49',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Commissioning Codes (particularly Code A for air systems) provide detailed guidance on commissioning procedures, test methods, and acceptance criteria for building services in the UK.',
  },
  {
    id: 11,
    question:
      'During electrical testing, an RCD fails to trip within 40ms at rated current. The appropriate action is:',
    options: [
      'Increase the test current',
      'Replace the RCD and retest',
      'Record as acceptable with a note',
      'Adjust the trip time setting',
    ],
    correctAnswer: 1,
    explanation:
      'RCDs must trip within their specified time (typically 40ms for Type A at rated residual current). Failure to meet this requirement means the device must be replaced and retested - there is no adjustment option.',
  },
  {
    id: 12,
    question: 'Test certificates for building services should be retained:',
    options: [
      'Until practical completion',
      'For the duration of the defects liability period',
      'For the life of the building',
      'For 12 months after handover',
    ],
    correctAnswer: 2,
    explanation:
      'Test certificates should be retained for the life of the building as part of the health and safety file. They demonstrate original compliance and provide essential information for future modifications or investigations.',
  },
];

const faqs = [
  {
    question: 'What is the difference between commissioning and testing?',
    answer:
      'Testing is the process of measuring system parameters against specified criteria - it produces data. Commissioning is the broader process of setting systems to work correctly, which includes testing but also balancing, adjustment, optimization, and demonstration. Testing verifies installation; commissioning verifies performance.',
  },
  {
    question: 'Who should witness commissioning tests?',
    answer:
      "Critical tests should be witnessed by the client's representative, commissioning management agent, or building control officer. The witnessing party verifies test methodology, observes results, and countersigns certificates. For major systems, specialist consultants or independent commissioning agents may be required.",
  },
  {
    question: 'What happens if systems cannot meet the specified acceptance criteria?',
    answer:
      'If systems genuinely cannot meet specification (not due to installation error), this triggers a formal variation process. The design team reviews whether criteria can be relaxed, whether remedial measures are needed, or whether commercial resolution (cost reduction) is appropriate. All variations must be documented and agreed.',
  },
  {
    question: 'How do seasonal commissioning requirements affect project handover?',
    answer:
      'Projects completing in summer cannot fully commission heating systems, and vice versa for cooling. Practical completion proceeds with a contractual commitment to return for seasonal commissioning, typically within 12 months. Retention money may be held until seasonal tests are complete. Clear documentation of outstanding items is essential.',
  },
  {
    question: 'What documentation is required for building control sign-off?',
    answer:
      'Building control requires evidence of compliance with all relevant Building Regulations. For services, this typically includes: Part L compliance calculations, commissioning certificates for heating/cooling/ventilation, electrical installation certificates (BS 7671), pressure test certificates, and air tightness test results. Requirements vary by local authority.',
  },
  {
    question: 'How should test failures be documented and managed?',
    answer:
      'Test failures must be recorded on the test sheet with the actual result, the required result, and the proposed corrective action. After rectification, the test is repeated and both the original failure and successful retest are retained in the project records. This audit trail demonstrates due diligence.',
  },
];

const HNCModule5Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 5"
            title="Testing and Verification"
            description="Test procedures, acceptance criteria, and compliance demonstration for building services systems."
            tone="purple"
          />

          <TLDR
            points={[
              "Testing = measurement against acceptance criteria. Verification = formal confirmation the installation conforms to design and standard.",
              "For electrical, BS 7671 Part 6 sequence: continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, functional testing.",
              "Test instruments calibrated to UKAS-traceable standard; calibration certificates available on site.",
              "Test results recorded contemporaneously on the schedule of test results — never reconstructed retrospectively.",
              "Acceptance criteria from the standard (BS 7671 limits), the specification (designer’s tighter limits), and the contract — all three must be met.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.1 (Testing — General)"
            clause="Testing shall be carried out, where relevant, in the following sequence — continuity of conductors, insulation resistance, protection by SELV, PELV or by electrical separation, basic protection by a barrier or enclosure provided during erection, insulation resistance/impedance of floors and walls, polarity, earth electrode resistance, protection by automatic disconnection of supply, additional protection, phase sequence, functional testing, and voltage drop where deemed necessary."
            meaning={
              <>
                BS 7671 prescribes the test sequence — and the sequence matters. Insulation resistance before energisation; polarity before connection of single-pole devices; earth fault loop impedance after the supply is energised. Out-of-sequence testing risks safety incidents and invalid results. Embed the sequence as a non-negotiable procedure.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 643.1."
          />


          <LearningOutcomes
            outcomes={[
              'Plan and conduct pre-commissioning tests for building services',
              'Define appropriate acceptance criteria for different system types',
              'Implement systematic test procedures and documentation',
              'Verify system performance against design specifications',
              'Prepare test certificates and compliance documentation',
              'Manage test failures and remedial actions',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Pre-Commissioning Tests">
            <p>
              Pre-commissioning tests verify that systems are correctly installed and safe to
              energise or start. These tests must be completed and documented before any system is
              made operational, protecting both personnel and equipment from potential damage.
            </p>
            <p>
              <strong>Pre-commissioning test categories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection:</strong> Checking installation quality and compliance
                with drawings
              </li>
              <li>
                <strong>Continuity tests:</strong> Verifying electrical connections and earthing
              </li>
              <li>
                <strong>Insulation tests:</strong> Confirming no short circuits or earth faults
              </li>
              <li>
                <strong>Pressure tests:</strong> Checking pipework integrity for HVAC and plumbing
              </li>
              <li>
                <strong>Ductwork tests:</strong> Air leakage testing to DW/144 standards
              </li>
            </ul>
            <p>
              <strong>Electrical pre-commissioning tests (BS 7671):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity of protective conductors:</strong> Verify earth path integrity —
                R1+R2 within expected range
              </li>
              <li>
                <strong>Insulation resistance:</strong> Detect insulation failures — &gt;1 MΩ at
                500V d.c.
              </li>
              <li>
                <strong>Polarity:</strong> Confirm correct wiring — Phase on switched contacts
              </li>
              <li>
                <strong>Earth fault loop impedance:</strong> Verify fault current path — Zs ≤
                tabulated maximum
              </li>
              <li>
                <strong>RCD operation:</strong> Confirm protection function — Trip ≤40ms at IΔn
              </li>
            </ul>
            <p>
              <strong>HVAC pressure testing requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LTHW heating:</strong> 1.5 × working pressure — 2 hours minimum — No visible
                drop
              </li>
              <li>
                <strong>Chilled water:</strong> 1.5 × working pressure — 2 hours minimum — No
                visible drop
              </li>
              <li>
                <strong>Refrigerant pipework:</strong> Per F-gas regulations — 24 hours — &lt;1%
                pressure loss
              </li>
              <li>
                <strong>Natural gas:</strong> Per IGE/UP/1 — Varies by volume — Specific criteria
              </li>
            </ul>
            <p>
              <strong>Critical principle:</strong> Never energise or start any system until all
              pre-commissioning tests are complete and documented with satisfactory results.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="System Testing Procedures">
            <p>
              System testing verifies that installed equipment and systems perform as designed. This
              follows pre-commissioning and involves operating systems under controlled conditions
              to measure actual performance against specified requirements.
            </p>
            <p>
              <strong>Electrical system tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Functional testing of switchgear</li>
              <li>Protection relay settings verification</li>
              <li>Generator load bank testing</li>
              <li>UPS autonomy verification</li>
              <li>Lighting level measurements</li>
              <li>Emergency lighting duration tests</li>
            </ul>
            <p>
              <strong>HVAC system tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air flow measurement and balancing</li>
              <li>Water flow regulation</li>
              <li>Temperature control verification</li>
              <li>Humidity control testing</li>
              <li>Noise level measurements</li>
              <li>Vibration assessment</li>
            </ul>
            <p>
              <strong>Test procedure structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope:</strong> Define exactly what will be tested and what is excluded
              </li>
              <li>
                <strong>Prerequisites:</strong> List conditions that must be met before testing
              </li>
              <li>
                <strong>Equipment:</strong> Specify calibrated instruments required
              </li>
              <li>
                <strong>Method:</strong> Step-by-step testing process
              </li>
              <li>
                <strong>Acceptance criteria:</strong> Specific pass/fail values
              </li>
              <li>
                <strong>Recording:</strong> Data capture requirements and format
              </li>
            </ul>
            <p>
              <strong>Example: AHU performance test procedure — Prerequisites:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ductwork pressure tested and passed</li>
              <li>Filters installed and grilles/diffusers fitted</li>
              <li>BMS controls commissioned</li>
              <li>Electrical supply verified</li>
            </ul>
            <p>
              <strong>Test method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start AHU and allow to stabilise (15 minutes minimum)</li>
              <li>Measure supply air volume at each diffuser using calibrated hood</li>
              <li>Record supply and extract temperatures</li>
              <li>Measure external static pressure</li>
              <li>Check fan speed against design</li>
              <li>
                <strong>Acceptance:</strong> ±10% of design air volume, temperature within 0.5°C of
                setpoint
              </li>
            </ul>
            <p>
              <strong>BMS point-to-point verification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature sensor:</strong> Compare with calibrated reference — ±0.5°C
                accuracy
              </li>
              <li>
                <strong>Digital input:</strong> Force input state change — Correct status displayed
              </li>
              <li>
                <strong>Analogue output:</strong> Command 0%, 50%, 100% — Actuator responds
                correctly
              </li>
              <li>
                <strong>Digital output:</strong> Command on/off — Equipment starts/stops
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Use standardised test sheets for consistency and
              ensure all instruments are within calibration date.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Acceptance Criteria and Performance Verification">
            <p>
              Acceptance criteria define the specific performance standards that systems must
              achieve. These must be measurable, achievable, and agreed by all parties before
              installation begins. Clear criteria prevent disputes and ensure objective assessment
              of system performance.
            </p>
            <p>
              <strong>Essential elements of acceptance criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specific:</strong> Exact numerical values, not vague descriptions
              </li>
              <li>
                <strong>Measurable:</strong> Can be verified with available test equipment
              </li>
              <li>
                <strong>Achievable:</strong> Realistic given equipment specifications
              </li>
              <li>
                <strong>Documented:</strong> Written in commissioning specification before tender
              </li>
              <li>
                <strong>Tolerances:</strong> Acceptable range around target values
              </li>
            </ul>
            <p>
              <strong>Typical acceptance criteria by system:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air distribution — Volume flow rate:</strong> ±10% of design
              </li>
              <li>
                <strong>Air distribution — Noise level (NR rating):</strong> ≤ specified NR value
              </li>
              <li>
                <strong>Heating system — Temperature control:</strong> ±1°C of setpoint
              </li>
              <li>
                <strong>Chilled water — Flow rate:</strong> ±5% of design
              </li>
              <li>
                <strong>Lighting — Illuminance:</strong> ≥ specified lux level
              </li>
              <li>
                <strong>Generator — Start time:</strong> &lt;15 seconds to full load
              </li>
              <li>
                <strong>UPS — Autonomy:</strong> ≥ specified minutes at full load
              </li>
            </ul>
            <p>
              <strong>Performance verification process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 - Static tests:</strong> Component checks before operation
              </li>
              <li>
                <strong>Stage 2 - Dynamic tests:</strong> System operation under controlled
                conditions
              </li>
              <li>
                <strong>Stage 3 - Integrated tests:</strong> Multiple systems operating together
              </li>
              <li>
                <strong>Stage 4 - Witnessed tests:</strong> Key tests observed by client/consultant
              </li>
              <li>
                <strong>Stage 5 - Extended operation:</strong> Burn-in period under realistic loads
              </li>
            </ul>
            <p>
              <strong>Real-world example — data centre cooling verification:</strong> A 500kW data
              centre cooling system requires comprehensive performance verification.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design criteria:</strong> 20°C ±1°C supply temperature, 45% ±5% RH
              </li>
              <li>
                <strong>Test method:</strong> Operate at 25%, 50%, 75%, 100% load using load banks
              </li>
              <li>
                <strong>Measurement:</strong> Temperature at 12 points per room, humidity at 4
                points
              </li>
              <li>
                <strong>Duration:</strong> 4 hours stable operation at each load point
              </li>
              <li>
                <strong>Acceptance:</strong> All readings within tolerance, N+1 redundancy proven
              </li>
            </ul>
            <p>
              <strong>Industry guidance:</strong> CIBSE Commissioning Codes and BSRIA guides provide
              detailed acceptance criteria templates for common building services systems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Test Certificates and Compliance Demonstration">
            <p>
              Test certificates provide formal documentation that systems have been tested and meet
              specified requirements. They form part of the building's permanent records and
              demonstrate compliance with Building Regulations, British Standards, and contractual
              obligations.
            </p>
            <p>
              <strong>Key certification documents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate:</strong> BS 7671 compliance — Competent
                electrician
              </li>
              <li>
                <strong>HVAC Commissioning Certificate:</strong> System performance verified —
                Commissioning engineer
              </li>
              <li>
                <strong>Pressure Test Certificate:</strong> Pipework integrity — Mechanical
                contractor
              </li>
              <li>
                <strong>F-Gas Certificate:</strong> Refrigerant system compliance — F-Gas certified
                engineer
              </li>
              <li>
                <strong>Fire Alarm Certificate:</strong> BS 5839 compliance — Fire alarm installer
              </li>
              <li>
                <strong>Gas Safe Certificate:</strong> Gas installation safety — Gas Safe registered
                engineer
              </li>
            </ul>
            <p>
              <strong>Building Regulations compliance documentation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part L:</strong> Energy efficiency calculations, commissioning certificates,
                EPC
              </li>
              <li>
                <strong>Part F:</strong> Ventilation system commissioning, air flow test results
              </li>
              <li>
                <strong>Part B:</strong> Fire alarm certificates, emergency lighting tests
              </li>
              <li>
                <strong>Part P:</strong> Electrical installation certificates
              </li>
              <li>
                <strong>Part G:</strong> Hot water safety device certification
              </li>
            </ul>
            <p>
              <strong>O&M manual contents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System descriptions and schematics</li>
              <li>Equipment data sheets</li>
              <li>Commissioning records and certificates</li>
              <li>As-built drawings</li>
              <li>Maintenance schedules</li>
              <li>Spare parts lists</li>
              <li>Warranty information</li>
            </ul>
            <p>
              <strong>Health and safety file:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design risk assessments</li>
              <li>Hazardous materials register</li>
              <li>Safe isolation procedures</li>
              <li>Access requirements for maintenance</li>
              <li>Emergency procedures</li>
              <li>Key contact information</li>
              <li>Residual risks register</li>
            </ul>
            <p>
              <strong>Handover documentation — before practical completion:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All test certificates issued</li>
              <li>Snagging lists cleared</li>
              <li>Building control sign-off</li>
              <li>Training completed</li>
            </ul>
            <p>
              <strong>At handover:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>O&M manuals delivered</li>
              <li>As-built drawings issued</li>
              <li>Keys and access cards</li>
              <li>Warranty documents</li>
            </ul>
            <p>
              <strong>Legal requirement:</strong> Under CDM Regulations, the health and safety file
              must be handed to the client and maintained for the life of the building.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Electrical testing programme:</strong> Plan the testing programme
              for a new office building distribution system.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase 1 - Pre-energisation:</strong> Visual inspection of all switchgear and
                cabling
              </li>
              <li>Continuity of protective conductors</li>
              <li>Insulation resistance (all circuits isolated)</li>
              <li>Polarity checks</li>
              <li>
                <strong>Phase 2 - Energisation:</strong> Phase rotation verification
              </li>
              <li>Voltage measurements at all distribution boards</li>
              <li>Earth fault loop impedance</li>
              <li>RCD functional tests</li>
              <li>
                <strong>Phase 3 - Functional:</strong> Protective device discrimination tests
              </li>
              <li>Generator changeover tests</li>
              <li>Emergency lighting duration (3-hour test)</li>
            </ul>
            <p>
              <strong>Example 2 — HVAC acceptance test failure:</strong> An AHU delivers 4,200 l/s
              against design requirement of 5,000 l/s. How should this be managed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shortfall = 5,000 - 4,200 = 800 l/s (16% below design)</li>
              <li>Acceptance tolerance = ±10% = 4,500 - 5,500 l/s</li>
              <li>
                <strong>Result:</strong> FAIL - outside tolerance
              </li>
              <li>Check fan running at correct speed</li>
              <li>Verify filter condition (pressure drop)</li>
              <li>Check damper positions (fully open)</li>
              <li>Measure system static pressure</li>
              <li>Review ductwork for restrictions</li>
              <li>
                <strong>Resolution:</strong> Found partially closed fire damper
              </li>
              <li>After correction, retest achieved 4,950 l/s = PASS</li>
            </ul>
            <p>
              <strong>Example 3 — Witness test documentation:</strong> Document a witnessed
              generator load test.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TEST RECORD:</strong> Generator Load Bank Test
              </li>
              <li>Date: 15/01/2026 | Project: Office Block A</li>
              <li>Equipment: 500kVA standby generator</li>
              <li>Start within 15 seconds of mains failure</li>
              <li>Accept 100% load within 10 seconds</li>
              <li>Maintain voltage ±2.5% at all loads</li>
              <li>Maintain frequency ±0.5Hz</li>
              <li>Start time: 11.2 seconds — PASS</li>
              <li>Load acceptance: 8.5 seconds — PASS</li>
              <li>Voltage at 100%: 398V (±0.5%) — PASS</li>
              <li>Frequency at 100%: 50.1Hz — PASS</li>
              <li>Witnessed by: J. Smith (Client) / M. Jones (Consultant)</li>
              <li>Tested by: A. Brown (Commissioning Engineer)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Testing programme checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review commissioning specification for all test requirements</li>
              <li>Prepare test procedures and record sheets in advance</li>
              <li>Verify all test instruments are calibrated and in date</li>
              <li>Confirm prerequisites are complete before each test</li>
              <li>Schedule witnessed tests with appropriate notice</li>
              <li>Document all results, including failures and retests</li>
            </ul>
            <p>
              <strong>Key standards to know:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:</strong> Electrical installation testing
              </li>
              <li>
                <strong>CIBSE Commissioning Codes:</strong> HVAC systems (A, B, C, M, R, W)
              </li>
              <li>
                <strong>BSRIA BG 8:</strong> Model commissioning specification
              </li>
              <li>
                <strong>DW/144:</strong> Ductwork air leakage testing
              </li>
              <li>
                <strong>BS 5839:</strong> Fire detection and alarm systems
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common testing mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Skipping pre-commissioning:</strong> Risks equipment damage and safety
                </li>
                <li>
                  <strong>Vague acceptance criteria:</strong> Leads to disputes at handover
                </li>
                <li>
                  <strong>Incomplete documentation:</strong> Affects building control sign-off
                </li>
                <li>
                  <strong>Out-of-calibration instruments:</strong> Invalidates test results
                </li>
                <li>
                  <strong>Not recording failures:</strong> Loses audit trail for due diligence
                </li>
              </ul>
            }
            doInstead="Run every pre-commissioning test before energisation, lock numerical acceptance criteria into the spec, log failures alongside successful retests, and keep instrument calibration certs on file."
          />

          <SectionRule />

          <Scenario
            title="Insulation resistance test skipped — fault discovered at energisation"
            situation={
              <>
                At handover, the electrical sub energises a distribution board for the first time. A fault to earth on a circuit causes the upstream RCD to trip immediately. Investigation reveals a damaged cable on a circuit installed two months earlier. The IR test on this DB had been skipped due to time pressure; the schedule of test results was being completed retrospectively.
              </>
            }
            whatToDo={
              <>
                De-energise. Locate and rectify the cable damage. Repeat full IR testing on every circuit on the DB. Issue NCR for the skipped test and reconstructed records. Re-brief the test team on the BS 7671 sequence and the requirement for contemporaneous records. Audit other DBs on the project for similar shortcuts. Update the ITP to require sign-off of test results as each circuit is tested, by the operative doing the test — not by office staff after the fact.
              </>
            }
            whyItMatters={
              <>
                Testing is the safety-critical verification step. Skipped tests can mean energising onto a fault — risk of injury, fire, equipment damage. Reconstructed test results are also a regulatory and contractual breach: the EIC says the test was carried out in compliance with the regulations; if it was not, the certificate is invalid.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Testing = measurement against acceptance criteria. Verification = formal compliance confirmation.",
              "BS 7671 Reg 643.1 sequence: continuity → IR → polarity → Zs → RCD → functional.",
              "Test instruments calibrated UKAS-traceable; certificates available on site.",
              "Results recorded contemporaneously on schedule of test results — never reconstructed.",
              "Acceptance criteria: standard + specification + contract — all three must be met.",
              "Out-of-sequence testing risks safety incidents and invalid results.",
              "Test certificates (EIC, EICR, MWC) signed by competent persons.",
              "Functional testing verifies the system as a whole performs its intended function.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Defects and snagging
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_5;
