/**
 * MOET · Module 5 · Section 3 · Subsection 1 — Emergency Stop Circuits
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. This page is safety-focused (E-stop circuits), so the
 * statements below are taken verbatim from the brief's Module 1 health-and-
 * safety list rather than the electrical-theory lists used elsewhere in
 * Module 5.
 *   Knowledge  · "Safe systems of work."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is the
 * first subsection of Section 5.3, so the masthead and left nav button both
 * point back to the section overview, matching the original page.
 *
 * Accuracy note: BS EN ISO 13850, IEC 60204-1 (stop categories 0/1/2), PUWER
 * 1998, HASAWA 1974 and the Machinery Directive 2006/42/EC citations are
 * standard, uncontested machinery-safety references and are kept exactly as
 * written. No GS38, thermography, test-interval or C&G-qualification claims
 * appear on this page.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Emergency Stop Circuits - MOET Module 5 Section 3.1';
const DESCRIPTION =
  'E-stop requirements, wiring methods and testing procedures for electrical maintenance technicians. BS EN ISO 13850, IEC 60204-1 compliance and safety circuit design. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'estop-colour',
    question: 'What colour and shape must an emergency stop actuator be?',
    options: [
      'Green flush push-button on a black background',
      'Yellow flat-faced button on a red background',
      'Black mushroom-head on a grey background',
      'Red mushroom-head on a yellow background',
    ],
    correctIndex: 3,
    explanation:
      'BS EN ISO 13850 requires E-stop actuators to be red mushroom-head type on a yellow background. This ensures immediate recognition in an emergency. The actuator must be self-latching (stays engaged until manually reset).',
  },
  {
    id: 'estop-nc',
    question: 'Why must E-stop circuits use normally closed (NC) contacts?',
    options: [
      'NC contacts provide fail-safe operation — a broken wire or contact failure causes the circuit to open and stop the machine',
      'NC contacts draw less current than NO contacts, reducing heat in the control panel',
      'NC contacts switch faster than NO contacts, giving a quicker stop time',
      'NC contacts are colour-coded to match the red actuator for easy identification',
    ],
    correctIndex: 0,
    explanation:
      'NC contacts ensure fail-safe behaviour. If a wire breaks, a connection fails, or a contact welds open, the safety circuit opens and the machine stops. NO contacts would fail dangerously — the machine would continue running despite a fault.',
  },
  {
    id: 'estop-cat',
    question: 'Under IEC 60204-1, a Category 0 stop is:',
    options: [
      'A controlled deceleration with power maintained until the machine halts',
      'An uncontrolled stop by immediately removing power to machine actuators',
      'A controlled stop with power retained on the actuators after halting',
      'A programmed soft stop sequenced by the standard PLC',
    ],
    correctIndex: 1,
    explanation:
      'Category 0 is an uncontrolled stop — power is removed immediately from the machine actuators. This is the most common E-stop type. Category 1 provides controlled deceleration followed by power removal. Category 2 is a controlled stop with power maintained.',
  },
  {
    id: 'estop-reset',
    question: 'What must happen when an E-stop button is reset?',
    options: [
      'The machine restarts automatically as soon as the button is released',
      'All other E-stops on the machine reset at the same time',
      'The safety circuit is re-enabled but a separate start command is needed to restart the machine',
      'The safety relay clears its fault log and resumes the interrupted cycle',
    ],
    correctIndex: 2,
    explanation:
      'Resetting an E-stop must only re-enable the safety circuit — it must not restart the machine. A separate and deliberate start command is required to restart. This prevents unexpected restart and complies with IEC 60204-1 Section 9.2.5.4.5.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN ISO 13850 specifies that an E-stop must:',
    options: [
      'Complete the current machine cycle before stopping',
      'Override all other functions and halt the machine immediately',
      'Operate only when the guard interlock is also opened',
      'Be reset automatically once the hazard has cleared',
    ],
    correctAnswer: 1,
    explanation:
      'The E-stop must override all operating modes and bring the machine to the safest possible stop as quickly as possible. No other command should be able to prevent or delay the E-stop function.',
  },
  {
    id: 2,
    question: 'An E-stop actuator must be:',
    options: [
      'Spring-return — it releases automatically when let go',
      'Key-operated so only authorised staff can use it',
      'Self-latching — it stays engaged until manually reset',
      'Recessed behind a guard to prevent accidental operation',
    ],
    correctAnswer: 2,
    explanation:
      'Self-latching ensures the machine remains stopped until a deliberate reset action. Automatic reset would allow the machine to restart unexpectedly, creating a serious hazard. Reset must require a separate deliberate action.',
  },
  {
    id: 3,
    question: 'E-stop circuits in series (daisy-chained) means:',
    options: [
      'Only the last E-stop in the chain can stop the machine',
      'Each E-stop must be reset in turn before the machine can restart',
      'The machine stops only when every E-stop is pressed together',
      'Any E-stop in the chain can stop the machine — pressing any one opens the circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Series wiring means all NC contacts must be closed for the circuit to be complete. Pressing any single E-stop opens its contact, breaking the circuit and stopping the machine.',
  },
  {
    id: 4,
    question: 'The reset of an E-stop must:',
    options: [
      'Only re-enable the safety circuit — a separate start command is needed to restart the machine',
      'Immediately restart the machine from where it stopped',
      'Be possible from the HMI screen without touching the button',
      'Clear all stored alarms and resume the production cycle',
    ],
    correctAnswer: 0,
    explanation:
      'Reset must only re-enable the safety circuit, not restart the machine. A separate and deliberate start command must be required. This prevents unexpected restart and complies with IEC 60204-1.',
  },
  {
    id: 5,
    question: 'Where should E-stops be positioned?',
    options: [
      'Only inside the main control panel, away from operators',
      'At every operator position and at points of access/egress to danger zones',
      'At a single central location for the whole production line',
      'At least three metres from any moving part of the machine',
    ],
    correctAnswer: 1,
    explanation:
      'E-stops must be readily accessible at every operator position and at all access/egress points to danger zones. The operator must be able to reach an E-stop without having to move past a hazard.',
  },
  {
    id: 6,
    question: 'IEC 60204-1 requires E-stop wiring to be:',
    options: [
      'Run alongside the power cables to save on containment',
      'Routed entirely through the standard PLC inputs and outputs',
      'Separate from control wiring and clearly identified, with no possibility of being bypassed',
      'Colour-coded green to match the start circuit conductors',
    ],
    correctAnswer: 2,
    explanation:
      'E-stop wiring must be separate from normal control wiring, clearly identified, and routed to prevent damage. The circuit design must ensure it cannot be inadvertently bypassed or defeated.',
  },
  {
    id: 7,
    question: 'A dual-channel E-stop circuit provides:',
    options: [
      'A faster stop time by switching twice the current',
      'A backup supply so the machine keeps running during a fault',
      'A second start button for convenience at remote positions',
      'Redundancy — two independent channels monitor the E-stop, detecting single faults',
    ],
    correctAnswer: 3,
    explanation:
      'Dual-channel (redundant) circuits use two independent paths. If one channel fails (e.g., welded contact), the other still functions. A monitoring safety relay detects the discrepancy and prevents restart.',
  },
  {
    id: 8,
    question: 'Testing an E-stop circuit should be performed:',
    options: [
      'At regular intervals as specified in the maintenance schedule, verifying both the stop function and the reset/restart sequence',
      'Only once at initial commissioning of the machine',
      'Only after a reported fault or an actual emergency stop',
      'Annually by the DNO during the periodic supply inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Regular testing verifies the E-stop functions correctly. Test both the stop function (does it stop the machine?) and the restart prevention (does reset alone not restart the machine?). Record test results.',
  },
  {
    id: 9,
    question: 'A cable-pull (rope-pull) emergency stop is used:',
    options: [
      'Only on overhead cranes and lifting equipment',
      'Along extended machinery where an E-stop button cannot be reached quickly',
      'As a replacement for guarding on rotating machinery',
      'Where the machine has no mains supply to monitor',
    ],
    correctAnswer: 1,
    explanation:
      'Cable-pull E-stops are used along conveyor lines, long machines and production lines where operators may be at any point along the length. Pulling the cable at any point activates the E-stop.',
  },
  {
    id: 10,
    question: 'The safety relay in an E-stop circuit:',
    options: [
      'Steps the control voltage down from 230 V to 24 V DC',
      'Provides the start signal once the operator presses reset',
      'Monitors the E-stop circuit, provides force-guided contacts, and prevents restart if a fault is detected',
      'Limits the motor current during start-up to prevent nuisance trips',
    ],
    correctAnswer: 2,
    explanation:
      'Safety relays (e.g., Pilz PNOZ, Allen-Bradley MSR, Siemens 3SK) monitor the E-stop circuit with redundancy and self-checking. Force-guided contacts ensure that a welded contact is detected. They comply with the required performance level.',
  },
  {
    id: 11,
    question: 'Under the Machinery Directive 2006/42/EC, E-stop provision is:',
    options: [
      'Required only on machinery rated above 11 kW',
      'Optional where the machine has a guard interlock fitted',
      'Required only on machinery sold before 2006',
      'Mandatory for all machinery unless the E-stop would not reduce risk',
    ],
    correctAnswer: 3,
    explanation:
      'The Machinery Directive requires E-stops on all machinery unless they would not reduce risk (e.g., hand-held power tools where release stops the machine). Exemptions are rare and must be justified by risk assessment.',
  },
  {
    id: 12,
    question: 'Under ST1426, a maintenance technician must be able to:',
    options: [
      'Test, maintain and verify the correct operation of E-stop circuits and document results',
      'Design new safety circuits from first principles for any machine',
      'Bypass a safety circuit temporarily to keep production running',
      'Certify machinery as CE-marked on behalf of the manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires technicians to test safety systems, verify correct operation, maintain them in working order, and document all test results and maintenance actions. Overriding safety circuits is never acceptable.',
  },
];

const faqs = [
  {
    question: 'Can I use a standard relay instead of a safety relay for E-stop circuits?',
    answer:
      'No. Standard relays do not have force-guided contacts and cannot detect internal faults. Safety relays are specifically designed and certified for safety functions, with redundant monitoring and fault detection. Using a standard relay would not meet the required performance level under ISO 13849.',
  },
  {
    question: 'How often should E-stops be tested?',
    answer:
      "Testing frequency depends on the risk assessment and the manufacturer's recommendations. Typical intervals range from weekly (high-risk machines) to monthly or quarterly. Some standards require testing at every shift change. The important thing is to establish a schedule, follow it consistently, and record all test results.",
  },
  {
    question: 'What do I do if an E-stop button feels stiff or does not latch properly?',
    answer:
      'Report it immediately and take the machine out of service until the E-stop is repaired or replaced. A malfunctioning E-stop is a critical safety defect. Do not attempt to lubricate or adjust the mechanism — replace the complete unit with a like-for-like part.',
  },
  {
    question: 'Can E-stop circuits be connected to the PLC?',
    answer:
      'The E-stop circuit must function independently of the PLC — it must be hardwired through safety-rated devices. However, the E-stop status can be monitored by the PLC (via an additional contact) for display, logging and interlocking purposes. The PLC must not be the sole means of achieving the E-stop function.',
  },
  {
    question: 'What is the difference between an E-stop and a normal stop?',
    answer:
      'An E-stop is a safety function that overrides all other commands and brings the machine to the safest possible stop as quickly as possible. A normal stop is an operational command that may complete the current cycle, decelerate smoothly, or maintain holding torque. E-stops must use hardwired safety-rated circuits; normal stops can be PLC-controlled.',
  },
];

const MOETModule5Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.3 · Subsection 1"
        title="Emergency Stop Circuits"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            E-stop requirements, wiring methods and testing procedures for safety-critical
            installations — the last line of defence when everything else has failed.
          </p>

          <TLDR
            points={[
              'Colour: Red mushroom-head on yellow background (BS EN ISO 13850).',
              'Contacts: Normally closed (NC) for fail-safe operation — wire break stops the machine.',
              'Self-latching: Stays engaged until manually reset; reset does not restart.',
              'Stop categories: Cat 0 (immediate), Cat 1 (controlled), Cat 2 (maintained).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify E-stop requirements under BS EN ISO 13850 and IEC 60204-1',
              'Explain the purpose of NC contacts and fail-safe wiring principles',
              'Describe Category 0, 1 and 2 stop functions and their applications',
              'Design and verify dual-channel E-stop circuits with safety relays',
              'Perform E-stop testing and document results to ST1426 standards',
              'Apply E-stop principles to maintenance activities on industrial machinery',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Testing:</strong> Regular verification of stop function and restart
                prevention.
              </li>
              <li>
                <strong>Dual-channel:</strong> Redundant monitoring via safety relay with feedback
                loop.
              </li>
              <li>
                <strong>Documentation:</strong> Record all test results with date, name and
                findings.
              </li>
              <li>
                <strong>ST1426:</strong> Test, maintain and verify safety circuit operation.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>E-stop standards and requirements</ContentEyebrow>

          <ConceptBlock title="The last line of defence, not a substitute for guarding">
            <p>
              Emergency stop devices are the last line of defence when all other safety measures
              have failed. They are not a substitute for proper guarding, interlocking or
              safe-by-design principles — they are the final resort when something goes wrong
              unexpectedly. Two key standards define the requirements: BS EN ISO 13850 specifies the
              design principles and IEC 60204-1 specifies the electrical implementation for
              machinery.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key requirements (BS EN ISO 13850)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Appearance:</strong> Red mushroom-head actuator on a yellow background —
                universally recognised.
              </li>
              <li>
                <strong>Override:</strong> Must override all other functions and operating modes
                without exception.
              </li>
              <li>
                <strong>Self-latching:</strong> Must remain engaged until a deliberate manual reset
                action.
              </li>
              <li>
                <strong>No restart on reset:</strong> Reset must only re-enable the safety circuit,
                not restart the machine.
              </li>
              <li>
                <strong>Accessible:</strong> Positioned at every operator position and at all danger
                zone access/egress points.
              </li>
              <li>
                <strong>Hardwired:</strong> Must function independently of the PLC, SCADA or any
                software-based control.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Stop categories (IEC 60204-1)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Category</th>
                    <th className="py-2 pr-4 font-medium text-white">Description</th>
                    <th className="py-2 font-medium text-white">Application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Category 0</td>
                    <td className="py-2 pr-4">Immediate power removal — uncontrolled stop</td>
                    <td className="py-2">Most common E-stop type for general machinery</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Category 1</td>
                    <td className="py-2 pr-4">Controlled deceleration then power removal</td>
                    <td className="py-2">High-inertia machines, robots, servo drives</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Category 2</td>
                    <td className="py-2 pr-4">Controlled stop with power maintained</td>
                    <td className="py-2">Vertical axes, hoists (prevent dropping loads)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Maintenance tip:</strong> The risk assessment determines which stop category
              is required. Most E-stops are Category 0, but always check the machine documentation.
              A Category 1 stop requires a controlled drive to manage deceleration before power
              removal, adding complexity to the circuit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fail-safe wiring principles</ContentEyebrow>

          <ConceptBlock title="Any single fault must lead to a safe state">
            <p>
              E-stop circuits must be designed so that any single fault leads to a safe state — the
              machine stops. This fundamental principle is achieved by using normally closed (NC)
              contacts, series wiring, and monitoring by safety-rated devices. A properly designed
              E-stop circuit fails safe under every foreseeable fault condition.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Core wiring principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NC contacts:</strong> The E-stop contact is closed during normal operation
                and opens when pressed. A broken wire, loose terminal or contact failure also opens
                the circuit — fail-safe.
              </li>
              <li>
                <strong>Series chain:</strong> Multiple E-stops are wired in series on each channel.
                Any single button press opens the circuit and stops the machine.
              </li>
              <li>
                <strong>Dual-channel redundancy:</strong> Two independent wiring paths from each
                E-stop to the safety relay. A fault in one channel is detected.
              </li>
              <li>
                <strong>Cross-monitoring:</strong> The safety relay checks that both channels switch
                within a defined time window (typically 0.5 to 4 seconds).
              </li>
              <li>
                <strong>Force-guided contacts:</strong> Mechanically linked NO and NC contacts in
                the safety relay ensure a welded contact is always detected.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Wire break detection">
            <p>
              The use of NC contacts provides inherent wire break detection. Consider the failure
              modes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wire break:</strong> Circuit opens — machine stops (safe).
              </li>
              <li>
                <strong>Contact failure (spring broken):</strong> Contact opens — machine stops
                (safe).
              </li>
              <li>
                <strong>Terminal loose:</strong> Connection lost — circuit opens — machine stops
                (safe).
              </li>
              <li>
                <strong>Contact weld:</strong> Detected by the dual-channel safety relay at next
                demand — prevents restart.
              </li>
              <li>
                <strong>Short circuit between channels:</strong> Detected by cross-fault monitoring
                — relay locks out.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Bypassing an E-stop to stop a nuisance trip"
            whatHappens={
              <>
                Bridging, bypassing or defeating an E-stop circuit is a criminal offence under the
                Health and Safety at Work Act 1974, the Provision and Use of Work Equipment
                Regulations (PUWER) 1998, and the Electricity at Work Regulations 1989.
              </>
            }
            doInstead={
              <>
                If an E-stop is causing nuisance trips, investigate and fix the root cause — do not
                bypass it. Report any bypassed safety circuits immediately to the responsible
                person.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Safety relays and dual-channel circuits</ContentEyebrow>

          <ConceptBlock title="What a standard relay cannot do">
            <p>
              Safety relays are the monitoring devices at the heart of E-stop circuits. They provide
              redundant switching, cross-fault detection and restart prevention — functions that
              standard control relays cannot achieve. A standard relay has no mechanism to detect
              its own contact failure; a safety relay does.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety relay functions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dual-channel input monitoring:</strong> Both channels must open within a
                detection window for a valid stop signal.
              </li>
              <li>
                <strong>Cross-fault detection:</strong> Detects short circuits between the two input
                channels that could mask faults.
              </li>
              <li>
                <strong>Force-guided contacts:</strong> NO safety outputs and NC monitoring contacts
                are mechanically linked.
              </li>
              <li>
                <strong>Monitored manual reset:</strong> Requires a deliberate rising-edge reset
                signal — detects stuck buttons.
              </li>
              <li>
                <strong>Feedback monitoring (EDM):</strong> Checks that external contactors have
                opened before allowing reset.
              </li>
              <li>
                <strong>LED diagnostics:</strong> Indicate channel status, output state and fault
                conditions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common safety relay manufacturers">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pilz:</strong> PNOZ series — widely used in UK manufacturing.
              </li>
              <li>
                <strong>Allen-Bradley:</strong> MSR series (Guardmaster).
              </li>
              <li>
                <strong>Siemens:</strong> 3SK1 series (SIRIUS).
              </li>
              <li>
                <strong>Schneider:</strong> Preventa XPSA series.
              </li>
              <li>
                <strong>SICK:</strong> UE400 series.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Typical circuit operation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>E-stop released: Both channels closed.</li>
              <li>Safety relay energised: Safety outputs closed.</li>
              <li>Contactors energised: Machine can run.</li>
              <li>E-stop pressed: Channels open.</li>
              <li>Safety relay de-energises: Outputs open.</li>
              <li>Contactors drop out: Machine stops.</li>
            </ul>
            <p>
              <strong>Key point:</strong> The feedback (EDM) loop is critical. Without it, a welded
              contactor would not be detected, and the machine could restart even though the main
              contactor has failed to open. Always verify that the feedback loop is correctly wired
              during commissioning and maintenance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Testing and maintenance procedures</ContentEyebrow>

          <ConceptBlock title="A legal requirement, not a discretionary check">
            <p>
              Regular testing of E-stop circuits is a legal requirement under PUWER 1998 Regulation
              5 (maintenance) and Regulation 11 (dangerous parts of machinery). It is also a core
              maintenance competency under the ST1426 apprenticeship standard. Testing must verify
              both the stop function and the restart prevention sequence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="E-stop test procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Verify the machine is in a safe test condition with no
                personnel in the danger zone.
              </li>
              <li>
                <strong>Step 2:</strong> Start the machine and confirm normal operation.
              </li>
              <li>
                <strong>Step 3:</strong> Press the E-stop — confirm the machine stops immediately
                (or within the Category 1 deceleration time).
              </li>
              <li>
                <strong>Step 4:</strong> Attempt to restart without resetting the E-stop — confirm
                restart is prevented.
              </li>
              <li>
                <strong>Step 5:</strong> Reset the E-stop button — confirm the circuit is re-enabled
                but the machine does not restart.
              </li>
              <li>
                <strong>Step 6:</strong> Press the start button — confirm normal restart occurs.
              </li>
              <li>
                <strong>Step 7:</strong> Repeat for every E-stop on the machine, testing each
                individually.
              </li>
              <li>
                <strong>Step 8:</strong> Record results including date, tester name, machine ID, and
                any faults found.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cable-pull (rope-pull) E-stops">
            <p>
              Cable-pull emergency stops are used along extended machinery such as conveyor lines,
              production lines and long processing machines. They provide continuous E-stop access
              along the entire length of the machine.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>A tensioned wire rope runs along the machine, supported by guide pulleys.</li>
              <li>Pulling or deflecting the rope at any point activates the switch unit.</li>
              <li>The switch detects both pull and slack (broken rope) — fail-safe design.</li>
              <li>Testing must verify operation from multiple points along the rope.</li>
              <li>Rope tension and guide pulleys require periodic inspection and adjustment.</li>
            </ul>
            <p>
              <strong>ST1426:</strong> Testing and documenting safety circuit function is a core
              maintenance competency. Always use the correct test procedure, work to a
              permit-to-work where required, and record your findings in the maintenance management
              system. Never sign off a test that you have not personally witnessed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Legal framework and key standards</ContentEyebrow>

          <ConceptBlock title="A framework you must understand, even if you do not design it">
            <p>
              E-stop requirements sit within a comprehensive legal and standards framework. As a
              maintenance technician, you do not need to design E-stop systems from scratch, but you
              must understand the standards that govern their installation, testing and maintenance
              so that you can verify compliance and identify deficiencies.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Standards and regulations">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Standard / Regulation</th>
                    <th className="py-2 font-medium text-white">Scope</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BS EN ISO 13850</td>
                    <td className="py-2">E-stop design principles — appearance, function, reset</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IEC 60204-1 / BS EN 60204-1</td>
                    <td className="py-2">
                      Electrical safety of machinery — stop categories, wiring
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">ISO 13849-1</td>
                    <td className="py-2">Safety-related control systems — Performance Levels</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Machinery Directive 2006/42/EC</td>
                    <td className="py-2">
                      Essential requirements — E-stop mandatory (with exceptions)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PUWER 1998</td>
                    <td className="py-2">Maintenance, inspection and testing requirements</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">HASAWA 1974</td>
                    <td className="py-2">General duty of care — bypassing safety is an offence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="E-stop and PLC integration">
            <p>
              A common question is whether E-stop circuits can be connected to the PLC. The answer
              is nuanced:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary circuit:</strong> Must be hardwired through safety-rated devices
                (safety relay or safety PLC). The standard PLC must not be the sole means of
                achieving the E-stop function.
              </li>
              <li>
                <strong>Monitoring:</strong> The E-stop status can be fed to the standard PLC via
                additional auxiliary contacts for HMI display, alarm logging and interlocking.
              </li>
              <li>
                <strong>Safety PLC:</strong> A certified safety PLC (e.g. Siemens F-CPU,
                Allen-Bradley GuardLogix) can replace hardwired safety relays for complex
                applications, but it must meet ISO 13849 / IEC 62061 requirements.
              </li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians are expected to understand the legal and
              regulatory framework for machine safety, test and maintain safety systems, and
              document all findings. You must be able to recognise non-compliant installations and
              report them through the correct channels.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="An E-stop that stops the machine but leaves the drive live"

            situation={
              <>
                <p>
                  During a routine check you press the E-stop on a mixer. The motor coasts to a halt
                  and the HMI shows the machine stopped. The main contactor, though, stays closed
                  and the VFD output stage remains enabled.
                </p>

                <p>
                  The machine has been in service for three years and nobody has reported a problem.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Establish which stop category the machine is supposed to achieve, because the
                  behaviour you are looking at is correct for one and dangerous for the other. A
                  Category 0 stop removes power immediately. A Category 1 stop brings the drive to a
                  controlled halt and then removes power. Coasting to a stop with power still
                  applied is neither.
                </p>

                <p>
                  Trace the E-stop circuit to the contactor coil. A common cause is an E-stop wired
                  only into the drive’s own enable input, with the contactor left permanently
                  energised — the drive stops the motor, but nothing removes the supply.
                </p>

                <p>
                  Check the safety relay if one is fitted: whether the E-stop contacts are actually
                  in its input circuit, whether both channels are monitored, and whether the relay’s
                  output contacts are in the contactor coil circuit rather than in a signalling
                  circuit only.
                </p>

                <p>
                  Treat this as a defect and report it before the machine runs again. Do not adjust
                  it on the spot — a safety function change needs verifying against the risk
                  assessment and the machine’s original conformity, not a field fix.
                </p>
              </>
            }

            whyItMatters={
              <p>
                An E-stop that appears to work is more dangerous than one that plainly does not,
                because people trust it. Someone reaching into a coasting mixer after pressing
                E-stop has every reason to believe the machine is safe, and the contactor is still
                closed behind them. This is exactly why functional testing of a safety circuit means
                proving what it actually removes, not just observing that the machine stopped.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'An E-stop is red mushroom-head on yellow (BS EN ISO 13850), self-latching, and must override every other function without exception.',
              'NC contacts, series wiring and dual-channel redundancy make an E-stop circuit fail safe: a broken wire, loose terminal or single contact failure stops the machine rather than hiding the fault.',
              'A safety relay adds cross-fault detection, force-guided contacts and monitored reset — capabilities a standard control relay does not have.',
              'Category 0 (IEC 60204-1) is an immediate, uncontrolled power removal; Category 1 decelerates under control before removing power; Category 2 maintains power in a controlled stop.',
              'Reset only re-enables the safety circuit — a separate, deliberate start command is always required to restart the machine.',
              'Bridging or bypassing an E-stop circuit is a criminal offence under HASAWA 1974, PUWER 1998 and EAWR 1989 — fix the root cause of a nuisance trip, never defeat the circuit.',
              'The feedback (EDM) loop confirms the contactors actually opened before allowing reset — without it a welded contactor goes undetected and the machine can restart unsafely.',
              'Test both halves of the function every time: that the E-stop stops the machine, and that reset alone never restarts it — record every test with date, tester and findings.',
              'The E-stop circuit itself must be hardwired through safety-rated devices; the standard PLC may only monitor its status, never be the sole means of achieving the stop.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 5.3 overview
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Guarding and Interlocking Devices
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section3_1;
