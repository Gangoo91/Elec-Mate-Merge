/**
 * Module 8 · Section 6 · Subsection 4 — Commissioning Procedures
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   CIBSE Code M, witness testing, seasonal commissioning and performance verification
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

const TITLE = 'Commissioning Procedures - HNC Module 8 Section 6.4';
const DESCRIPTION =
  'Master CIBSE Commissioning Code M requirements, witness testing procedures, seasonal commissioning and performance verification for building services.';

const quickCheckQuestions = [
  {
    id: 'code-m-scope',
    question: 'What is the primary purpose of CIBSE Commissioning Code M?',
    options: [
      'To specify equipment manufacturer requirements',
      'To regulate building construction methods',
      'To define electrical installation standards',
      'To provide a framework for systematic commissioning of building services',
    ],
    correctIndex: 3,
    explanation:
      'CIBSE Commissioning Code M provides a comprehensive framework for the systematic commissioning of building services, ensuring systems operate as designed and meet performance specifications.',
  },
  {
    id: 'static-vs-dynamic',
    question: 'What is the key difference between static and dynamic commissioning?',
    options: [
      'Static commissioning is performed outdoors, dynamic indoors',
      'Static commissioning checks systems at rest, dynamic tests systems under operating conditions',
      'Static commissioning requires witness testing, dynamic does not',
      'Static commissioning is optional, dynamic is mandatory',
    ],
    correctIndex: 1,
    explanation:
      'Static commissioning involves checks and tests on systems at rest (e.g., ductwork pressure tests, valve settings), whilst dynamic commissioning tests systems under actual operating conditions with flows, temperatures and pressures.',
  },
  {
    id: 'witness-testing',
    question: 'Who typically witnesses commissioning tests on major building projects?',
    options: [
      "It allows KNX-controlled devices to appear as BACnet objects for central monitoring",
      "The client's representative, commissioning manager, or independent commissioning specialist",
      "The employer must identify and implement additional control measures immediately to reduce exposure below the WEL",
      "To set out how health and safety will be managed during the construction phase",
    ],
    correctIndex: 1,
    explanation:
      "Witness testing involves the client's representative, commissioning manager or independent commissioning specialist observing and verifying that tests are conducted correctly and results meet specification.",
  },
  {
    id: 'seasonal-commissioning',
    question: 'Why is seasonal commissioning necessary for HVAC systems?',
    options: [
      'Because building regulations require quarterly testing',
      'To allow equipment manufacturers time to visit site',
      'To spread commissioning costs over multiple seasons',
      'To verify system performance under different ambient conditions (heating and cooling modes)',
    ],
    correctIndex: 3,
    explanation:
      'Seasonal commissioning verifies that HVAC systems perform correctly under both heating and cooling conditions, which cannot be fully tested during a single commissioning period regardless of season.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to CIBSE Commissioning Code M, when should commissioning management begin?',
    options: [
      'After practical completion',
      'During the design stage',
      'When installation is 75% complete',
      'At the start of the defects liability period',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Code M emphasises that commissioning management should begin during the design stage to ensure systems are designed for commissioning and that commissioning requirements are integrated into specifications.',
  },
  {
    id: 2,
    question: 'What does the commissioning specification typically include?',
    options: [
      'Chiller performance, cooling coil operation, condenser water temperatures and space cooling capacity',
      'Verifying fan rotational direction, belt tension, damper operation and filter installation',
      'Design criteria, test procedures, acceptance criteria, witnessing requirements and documentation',
      'To schedule commissioning activities in logical sequence, coordinated with construction programme',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive commissioning specification includes design criteria against which to commission, detailed test procedures, acceptance criteria, witnessing requirements, and documentation requirements.',
  },
  {
    id: 3,
    question: 'What is the purpose of a commissioning programme?',
    options: [
      'A record of defects, incomplete items and remedial works required before handover',
      'Demonstrating that systems achieve their design intent under actual operating conditions',
      'Test procedures, blank test sheets, calibration certificates for instruments, and method statements',
      'To schedule commissioning activities in logical sequence, coordinated with construction programme',
    ],
    correctAnswer: 3,
    explanation:
      'The commissioning programme schedules commissioning activities in logical sequence, ensuring prerequisites are complete before dependent activities begin, and coordinates with the overall construction programme.',
  },
  {
    id: 4,
    question:
      'During static commissioning of an air handling unit, which checks would be performed?',
    options: [
      'Verifying fan rotational direction, belt tension, damper operation and filter installation',
      'A record of defects, incomplete items and remedial works required before handover',
      'Chiller performance, cooling coil operation, condenser water temperatures and space cooling capacity',
      'The commissioning manager or commissioning management contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Static commissioning of an AHU includes checking fan rotation direction, belt tension and alignment, damper operation through full travel, filter installation and sealing, and access panel security.',
  },
  {
    id: 5,
    question:
      'What is the typical tolerance for air flow rates at terminal devices according to CIBSE guidelines?',
    options: [
      '+/- 5% of design flow rate',
      '+/- 10% of design flow rate',
      '+/- 20% of design flow rate',
      'Exactly as designed with no tolerance',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE guidelines typically specify +/- 10% tolerance on air flow rates at terminal devices. Tighter tolerances may be specified for critical applications such as operating theatres or cleanrooms.',
  },
  {
    id: 6,
    question: 'What documentation should be prepared for witness testing?',
    options: [
      'Design criteria, test procedures, acceptance criteria, witnessing requirements and documentation',
      'A record of defects, incomplete items and remedial works required before handover',
      'Test procedures, blank test sheets, calibration certificates for instruments, and method statements',
      'To capture system performance data over time for analysis and verification',
    ],
    correctAnswer: 2,
    explanation:
      'Witness testing requires prepared test procedures, blank test sheets for recording results, current calibration certificates for all test instruments, method statements, and risk assessments.',
  },
  {
    id: 7,
    question: "What is a 'snagging list' in the context of commissioning?",
    options: [
      'Verifying fan rotational direction, belt tension, damper operation and filter installation',
      'To schedule commissioning activities in logical sequence, coordinated with construction programme',
      'The commissioning manager or commissioning management contractor',
      'A record of defects, incomplete items and remedial works required before handover',
    ],
    correctAnswer: 3,
    explanation:
      'A snagging list records defects, incomplete works, and items requiring remedial action identified during commissioning, inspections and witness testing that must be resolved before final handover.',
  },
  {
    id: 8,
    question: 'What is the purpose of trend logging during commissioning?',
    options: [
      'To capture system performance data over time for analysis and verification',
      'A record of defects, incomplete items and remedial works required before handover',
      'The commissioning manager or commissioning management contractor',
      'Demonstrating that systems achieve their design intent under actual operating conditions',
    ],
    correctAnswer: 0,
    explanation:
      'Trend logging captures system performance data (temperatures, pressures, flows, energy consumption) over time, enabling analysis of system behaviour, identification of issues, and verification of design performance.',
  },
  {
    id: 9,
    question:
      'During seasonal commissioning in cooling mode, what key parameters should be verified?',
    options: [
      'Demonstrating that systems achieve their design intent under actual operating conditions',
      'Chiller performance, cooling coil operation, condenser water temperatures and space cooling capacity',
      'Design criteria, test procedures, acceptance criteria, witnessing requirements and documentation',
      'To schedule commissioning activities in logical sequence, coordinated with construction programme',
    ],
    correctAnswer: 1,
    explanation:
      'Cooling season commissioning verifies chiller performance and capacity, cooling coil operation, condenser water temperatures and flow rates, space cooling capacity, and dehumidification performance.',
  },
  {
    id: 10,
    question: 'What is performance verification in the context of building services?',
    options: [
      'A record of defects, incomplete items and remedial works required before handover',
      'To schedule commissioning activities in logical sequence, coordinated with construction programme',
      'Demonstrating that systems achieve their design intent under actual operating conditions',
      'Verifying fan rotational direction, belt tension, damper operation and filter installation',
    ],
    correctAnswer: 2,
    explanation:
      'Performance verification demonstrates that building services systems achieve their design intent, delivering required environmental conditions, energy performance and operational efficiency under actual operating conditions.',
  },
  {
    id: 11,
    question: 'What is the recommended duration for extended performance monitoring?',
    options: [
      'IT equipment density and personal devices',
      'Lower magnitude 5th and 7th harmonics',
      'Promptly, before the modifications are put into use',
      'Typically 12 months to capture seasonal variations',
    ],
    correctAnswer: 3,
    explanation:
      'Extended performance monitoring typically continues for 12 months post-handover to capture full seasonal variations, verify energy performance, and identify any issues that only manifest under specific conditions.',
  },
  {
    id: 12,
    question:
      'Who is responsible for coordinating commissioning activities across different trades?',
    options: [
      'The commissioning manager or commissioning management contractor',
      'Typically 12 months to capture seasonal variations',
      'A record of defects, incomplete items and remedial works required before handover',
      'To capture system performance data over time for analysis and verification',
    ],
    correctAnswer: 0,
    explanation:
      'The commissioning manager (or commissioning management contractor on larger projects) coordinates commissioning activities across all trades, ensuring logical sequencing, resolving interface issues and maintaining the commissioning programme.',
  },
];

const faqs = [
  {
    question: 'What is the difference between commissioning and testing?',
    answer:
      'Testing is a component of commissioning that verifies specific parameters meet specification. Commissioning is the broader process of bringing systems from installation through to full operational status, including setting to work, regulation, testing, performance verification and handover documentation. Testing confirms compliance; commissioning ensures systems work as intended.',
  },
  {
    question: 'When should the commissioning manager be appointed?',
    answer:
      'Ideally, the commissioning manager should be appointed during RIBA Stage 3 (Developed Design) or earlier. Early appointment allows input to design for commissioning, development of commissioning specifications, and planning of commissioning activities. Late appointment often results in inadequate commissioning and performance issues.',
  },
  {
    question: 'What happens if seasonal commissioning cannot be completed before handover?',
    answer:
      'If seasonal commissioning cannot be completed before handover, arrangements should be made for the commissioning team to return during the appropriate season. This is typically covered in the defects liability period or through a separate extended commissioning agreement. Results should be documented and any required adjustments made.',
  },
  {
    question: 'How are commissioning results documented?',
    answer:
      'Commissioning results are documented through commissioning records (test sheets with measured values), trend data exports, witness test certificates, snagging lists and closeout reports, commissioning summary reports, and inclusion in O&M manuals. All records should be traceable to specific equipment and test procedures.',
  },
  {
    question: 'What is the role of Building Management System (BMS) in commissioning?',
    answer:
      'The BMS plays a crucial role in commissioning by enabling system monitoring, control point verification, alarm testing, trend logging, and performance data collection. BMS commissioning includes verifying all points, testing control sequences, setting up trends and alarms, and demonstrating functionality to the client.',
  },
  {
    question: 'How do you handle commissioning defects and snagging items?',
    answer:
      'Commissioning defects are recorded on snagging lists with clear descriptions, locations and photographs. Items are categorised by severity and responsibility. Progress is tracked through regular snagging meetings. Critical items preventing handover must be resolved immediately; minor items may be addressed during the defects liability period with agreed timescales.',
  },
];

const HNCModule8Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · Subsection 4"
            title="Commissioning Procedures"
            description="CIBSE Code M, witness testing, seasonal commissioning and performance verification"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply CIBSE Commissioning Code M requirements to building services projects",
              "Distinguish between static and dynamic commissioning activities",
              "Plan and execute witness testing procedures",
              "Understand seasonal commissioning requirements for HVAC systems",
              "Implement performance verification methodologies",
              "Manage snagging and defects resolution processes",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CIBSE Commissioning Code M">
            <p>CIBSE Commissioning Code M provides a comprehensive framework for the systematic commissioning of building services installations. The code establishes best practice procedures that ensure systems are set to work correctly, regulated to design parameters, and demonstrated to meet their specified performance requirements.</p>
            <p><strong>Key Principles of Code M</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Early involvement:</strong> Commissioning management should begin at design stage</li>
              <li><strong>Systematic approach:</strong> Logical progression from pre-commissioning through to handover</li>
              <li><strong>Documentation:</strong> Comprehensive records of all commissioning activities</li>
              <li><strong>Verification:</strong> Independent checking of results against design criteria</li>
              <li><strong>Integration:</strong> Coordination across all building services disciplines</li>
            </ul>
            <p><strong>Commissioning Management Structure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Commissioning Manager:</strong> Overall coordination, programme, quality assurance — RIBA Stage 3</li>
              <li><strong>Commissioning Engineer:</strong> Technical supervision of commissioning activities — RIBA Stage 4</li>
              <li><strong>Commissioning Specialist:</strong> Discipline-specific commissioning (HVAC, electrical, controls) — RIBA Stage 5</li>
              <li><strong>Witness:</strong> Independent verification of test results — As required</li>
            </ul>
            <p><strong>Commissioning Specification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design criteria and performance parameters to be achieved</li>
              <li>Test procedures and methodologies for each system type</li>
              <li>Acceptance criteria and tolerances for measured values</li>
              <li>Witness testing requirements and hold points</li>
              <li>Documentation and record-keeping requirements</li>
              <li>Calibration requirements for test instruments</li>
              <li>Health and safety requirements for commissioning activities</li>
            </ul>
            <p><strong>Best practice:</strong> The commissioning specification should be developed alongside the technical specifications during design, ensuring that systems are designed with commissioning requirements in mind and that adequate access, test points and isolation are provided.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Static and Dynamic Commissioning">
            <p>Commissioning activities are typically divided into static commissioning (pre-commissioning checks on systems at rest) and dynamic commissioning (testing systems under operating conditions). Both phases are essential and must be completed in sequence for successful commissioning.</p>
            <p><strong>Static Commissioning (Pre-commissioning)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Visual inspection of installation quality</li>
              <li>Verification of equipment installation</li>
              <li>Checking mechanical fixings and supports</li>
              <li>Ductwork pressure testing</li>
              <li>Pipework pressure testing</li>
              <li>Valve position and accessibility checks</li>
              <li>Damper operation through full travel</li>
              <li>Electrical installation verification</li>
              <li>Motor rotation direction checks</li>
              <li>Belt tension and alignment</li>
            </ul>
            <p><strong>Dynamic Commissioning</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Setting systems to work</li>
              <li>Air flow measurement and regulation</li>
              <li>Water flow measurement and balancing</li>
              <li>Temperature differential checks</li>
              <li>Pressure readings under load</li>
              <li>Control sequence verification</li>
              <li>BMS point commissioning</li>
              <li>Safety device testing</li>
              <li>Interlock verification</li>
              <li>Performance testing</li>
            </ul>
            <p><strong>Typical Commissioning Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Pre-commissioning:</strong> Static checks, pressure tests, visual inspection — Installation complete, power available</li>
              <li><strong>2. Setting to work:</strong> Initial start-up, direction checks, basic operation — Pre-commissioning signed off</li>
              <li><strong>3. Regulation:</strong> Flow balancing, damper setting, valve adjustment — Systems operational</li>
              <li><strong>4. Controls commissioning:</strong> BMS points, control loops, sequences — Mechanical regulation complete</li>
              <li><strong>5. Performance testing:</strong> Capacity verification, efficiency measurement — Controls commissioned</li>
              <li><strong>6. Witness testing:</strong> Demonstration to client, sign-off — All commissioning complete</li>
            </ul>
            <p><strong>Air System Commissioning Tolerances (CIBSE Code A)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total system air flow: +/- 5% of design</li>
              <li>Individual terminal devices: +/- 10% of design</li>
              <li>Supply air temperature: +/- 1degC of setpoint</li>
              <li>Room temperature: +/- 1degC of design</li>
              <li>Relative humidity: +/- 5% RH of design</li>
            </ul>
            <p><strong>Critical sequence:</strong> Always complete static commissioning before attempting dynamic commissioning. Operating systems with incomplete pre-commissioning risks equipment damage, safety hazards, and invalidates commissioning results.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Witness Testing Procedures">
            <p>Witness testing provides independent verification that commissioning tests have been conducted correctly and that results meet specified requirements. It is a formal process requiring preparation, documentation and sign-off by authorised representatives.</p>
            <p><strong>Witness Testing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hold points:</strong> Activities that cannot proceed without witness sign-off</li>
              <li><strong>Notification points:</strong> Activities requiring advance notice to witnesses</li>
              <li><strong>Review points:</strong> Documentation review and acceptance</li>
            </ul>
            <p><strong>Preparation for Witness Testing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test procedures:</strong> Approved written procedures for each test — Commissioning manager</li>
              <li><strong>Test sheets:</strong> Blank forms ready for recording results — Commissioning specialist</li>
              <li><strong>Calibration certificates:</strong> Current certificates for all test instruments — Commissioning specialist</li>
              <li><strong>Method statements:</strong> Safe systems of work for testing activities — Contractor</li>
              <li><strong>Risk assessments:</strong> Hazard identification and controls — Contractor</li>
              <li><strong>PPE:</strong> Appropriate protective equipment for witnesses — Contractor</li>
            </ul>
            <p><strong>Tests Typically Requiring Witnessing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pressure testing of pipework systems</li>
              <li>Ductwork air tightness testing</li>
              <li>Fire damper operation testing</li>
              <li>Smoke control system testing</li>
              <li>Emergency generator load testing</li>
              <li>UPS system performance testing</li>
              <li>Chiller performance verification</li>
              <li>Boiler efficiency testing</li>
            </ul>
            <p><strong>Witness Test Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Completed test sheets with all readings</li>
              <li>Instrument identification and calibration status</li>
              <li>Names and signatures of witnesses</li>
              <li>Date, time and ambient conditions</li>
              <li>Pass/fail determination with reference</li>
              <li>Snagging items and defects noted</li>
              <li>Photographs where required</li>
              <li>Sign-off or rejection statement</li>
            </ul>
            <p><strong>Witness Test Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Notification:</strong> Give required notice to witnesses (typically 48-72 hours)</li>
              <li><strong>Pre-meeting:</strong> Review procedures and safety requirements</li>
              <li><strong>Instrument check:</strong> Verify calibration of all test equipment</li>
              <li><strong>Test execution:</strong> Conduct tests per approved procedures</li>
              <li><strong>Recording:</strong> Document all readings on test sheets</li>
              <li><strong>Evaluation:</strong> Compare results against acceptance criteria</li>
              <li><strong>Sign-off:</strong> Witness signature confirming acceptance or rejection</li>
              <li><strong>Follow-up:</strong> Address any snagging items identified</li>
            </ul>
            <p><strong>Important:</strong> Tests conducted without proper witness attendance when required may need to be repeated, causing programme delays and additional costs. Always confirm witness availability before scheduling hold point tests.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Seasonal Commissioning and Performance Verification">
            <p>Seasonal commissioning addresses the reality that HVAC systems cannot be fully commissioned during a single period if that period does not include both heating and cooling demands. Performance verification demonstrates that systems achieve their design intent under actual operating conditions over an extended period.</p>
            <p><strong>Seasonal Commissioning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heating Season:</strong> Boilers, heating coils, radiators, underfloor heating — Flow temperatures, heat output, efficiency</li>
              <li><strong>Cooling Season:</strong> Chillers, cooling coils, condensers, free cooling — Cooling capacity, COP, dehumidification</li>
              <li><strong>Intermediate:</strong> Economiser cycles, mixed mode operation — Changeover, free cooling optimisation</li>
            </ul>
            <p><strong>Heating Season Verification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Boiler firing sequence and modulation</li>
              <li>Flow and return temperatures</li>
              <li>Heat output capacity verification</li>
              <li>Heating control response</li>
              <li>Frost protection operation</li>
              <li>Zone temperature control</li>
              <li>Optimum start/stop operation</li>
            </ul>
            <p><strong>Cooling Season Verification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chiller capacity and efficiency (COP)</li>
              <li>Condenser water temperatures</li>
              <li>Cooling coil performance</li>
              <li>Dehumidification effectiveness</li>
              <li>Free cooling changeover</li>
              <li>Cooling tower operation</li>
              <li>Peak load performance</li>
            </ul>
            <p><strong>Performance Verification Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design criteria:</strong> Document target performance parameters from design</li>
              <li><strong>Measurement plan:</strong> Define how each parameter will be measured and verified</li>
              <li><strong>Trend logging:</strong> Configure BMS to capture relevant data over time</li>
              <li><strong>Analysis:</strong> Review data to identify performance gaps</li>
              <li><strong>Optimisation:</strong> Fine-tune systems to improve performance</li>
              <li><strong>Verification report:</strong> Document achieved performance against design</li>
            </ul>
            <p><strong>Extended Performance Monitoring (12 months)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy consumption:</strong> Sub-metering, BMS trends — Monthly</li>
              <li><strong>Space temperatures:</strong> BMS zone sensors — Weekly</li>
              <li><strong>Plant efficiency:</strong> Calculated from flow/energy data — Monthly</li>
              <li><strong>Occupant comfort:</strong> Feedback, complaints log — Ongoing</li>
              <li><strong>Alarm frequency:</strong> BMS alarm logs — Weekly</li>
            </ul>
            <p><strong>Snagging and Defects Management</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Recording:</strong> Log all defects with clear descriptions, locations, photographs</li>
              <li><strong>Categorisation:</strong> Priority 1 (safety/critical), Priority 2 (operational), Priority 3 (minor)</li>
              <li><strong>Responsibility:</strong> Assign each item to responsible party</li>
              <li><strong>Tracking:</strong> Maintain snagging register with status updates</li>
              <li><strong>Close-out:</strong> Verify rectification and sign off completed items</li>
              <li><strong>Escalation:</strong> Process for unresolved items at defects period end</li>
            </ul>
            <p><strong>BREEAM context:</strong> Seasonal commissioning and extended performance monitoring are requirements for achieving higher BREEAM ratings. Credits are available for demonstrating that buildings perform as designed through post-occupancy evaluation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Air Handling Unit Commissioning</strong>
            </p>
            <p><strong>Scenario:</strong> Commission a 5000 l/s supply AHU with heating and cooling coils, HEPA filtration, and variable speed supply and extract fans.</p>
            <p>Static Commissioning:</p>
            <p>1. Check installation: Verify AHU level, ductwork sealed, dampers accessible</p>
            <p>2. Pressure test: Ductwork &lt;5% leakage at 400Pa (Class C)</p>
            <p>3. Motor checks: Rotation direction, belt tension, guards fitted</p>
            <p>4. Damper operation: Full travel, actuators responding</p>
            <p>5. Filter installation: HEPA filters sealed, pre-filters in place</p>
            <p>Dynamic Commissioning:</p>
            <p>1. Set to work: Start fans, check airflow direction</p>
            <p>2. Measure total airflow: Design 5000 l/s, Measured 5120 l/s (+2.4%)</p>
            <p>3. Balance terminals: Adjust each to +/- 10% of design</p>
            <p>4. Coil testing: Verify heating output, cooling capacity</p>
            <p>5. Controls: Commission BMS points, test sequences</p>
            <p>Result: System within tolerance, witness test passed</p>
            <p>
              <strong>Example 2: Chilled Water System Commissioning</strong>
            </p>
            <p><strong>Scenario:</strong> Commission a chilled water system with 500kW chiller, primary/secondary pumping, and 20 fan coil units.</p>
            <p>Static Commissioning:</p>
            <p>1. Pressure test: System at 6 bar, 24hr hold, no pressure drop</p>
            <p>2. Flush and clean: Water quality to BSRIA standard</p>
            <p>3. Valve checks: Isolation valves, balancing valves accessible</p>
            <p>4. Chiller: Refrigerant charge, oil levels, electrical connections</p>
            <p>Dynamic Commissioning:</p>
            <p>1. Pump commissioning: Primary 25 l/s, Secondary 22 l/s</p>
            <p>2. Water balancing: Proportional balance to +/- 10%</p>
            <p>3. FCU commissioning: Each unit flow verified</p>
            <p>Seasonal (Cooling):</p>
            <p>Chiller performance test:</p>
            <p>- Design cooling capacity: 500kW</p>
            <p>- Measured at 32degC ambient: 485kW (97% of design)</p>
            <p>- COP measured: 3.2 (design 3.0) - exceeds specification</p>
            <p>Result: Performance verified, exceeds design COP</p>
            <p>
              <strong>Example 3: Witness Test - Fire Damper Testing</strong>
            </p>
            <p><strong>Scenario:</strong> Witness testing of 45 fire dampers to BS EN 15650 requirements.</p>
            <p>Preparation:</p>
            <p>- Test procedure approved by commissioning manager</p>
            <p>- Blank test sheets for 45 dampers</p>
            <p>- Access equipment arranged (scaffold, MEWP)</p>
            <p>- 48hr notice given to client's witness</p>
            <p>Test Procedure (each damper):</p>
            <p>1. Verify damper location matches drawing</p>
            <p>2. Check accessibility for inspection/testing</p>
            <p>3. Operate thermal release mechanism</p>
            <p>4. Confirm full closure (no visible gaps)</p>
            <p>5. Reset damper to open position</p>
            <p>6. Test actuator operation (if motorised)</p>
            <p>7. Record results on test sheet</p>
            <p>Results:</p>
            <p>- 43 dampers passed first time</p>
            <p>- 2 dampers failed (thermal link not releasing) - replaced</p>
            <p>- Re-test: Both passed</p>
            <p>Witness signed off: All 45 dampers satisfactory</p>
            <p>
              <strong>Example 4: Snagging List Management</strong>
            </p>
            <p><strong>Scenario:</strong> Managing snagging items identified during commissioning of a 5-storey office building.</p>
            <p>Initial Snagging List (142 items):</p>
            <p>Priority 1 (Critical): 8 items</p>
            <p>- Fire damper not closing (Level 3)</p>
            <p>- Emergency lighting failure (stairwell)</p>
            <p>- Smoke detector not connected (server room)</p>
            <p>Priority 2 (Operational): 67 items</p>
            <p>- FCU airflow 15% below design (various)</p>
            <p>- BMS trend logging not configured</p>
            <p>- Valve labels missing</p>
            <p>Priority 3 (Minor): 67 items</p>
            <p>- Ceiling tile marks</p>
            <p>- Grille alignment</p>
            <p>- Documentation formatting</p>
            <p>Resolution Timeline:</p>
            <p>- Priority 1: Resolved within 48 hours (before handover)</p>
            <p>- Priority 2: 80% resolved by practical completion</p>
            <p>- Priority 3: Addressed during defects period</p>
            <p>Final status at DLP end: 142/142 items closed</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Key Documents for Commissioning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Commissioning specification:</strong> Defines requirements and acceptance criteria</li>
              <li><strong>Commissioning programme:</strong> Schedule of activities and dependencies</li>
              <li><strong>Method statements:</strong> Safe procedures for commissioning activities</li>
              <li><strong>Test sheets:</strong> Standard forms for recording results</li>
              <li><strong>Snagging register:</strong> Track defects and resolution</li>
              <li><strong>Commissioning report:</strong> Summary of results and handover</li>
            </ul>
            <p>
              <strong>Common Commissioning Tolerances:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air flow (system):</strong> +/- 5% of design total</li>
              <li><strong>Air flow (terminal):</strong> +/- 10% of design</li>
              <li><strong>Water flow:</strong> +/- 10% of design</li>
              <li><strong>Temperature (supply):</strong> +/- 1degC of setpoint</li>
              <li><strong>Temperature (space):</strong> +/- 1degC of design</li>
              <li><strong>Pressure:</strong> +/- 10% of design</li>
              <li><strong>Humidity:</strong> +/- 5% RH of design</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Inadequate access:</strong> Design should allow for commissioning access</li>
                <li><strong>Missing test points:</strong> Specify during design, not after installation</li>
                <li><strong>Incomplete installation:</strong> Commissioning attempted too early</li>
                <li><strong>Poor documentation:</strong> Ensure specifications include commissioning requirements</li>
                <li><strong>Time pressure:</strong> Allow adequate programme time for commissioning</li>
                <li><strong>Coordination failures:</strong> Ensure all trades are ready before starting</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Interface coordination
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Documentation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section6_4;
