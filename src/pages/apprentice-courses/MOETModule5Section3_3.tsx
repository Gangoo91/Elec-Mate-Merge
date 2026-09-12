/**
 * MOET · Module 5 · Section 3 · Subsection 3 — Safety Relays and Controllers
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. This page is safety-focused (safety relays and controllers), so
 * the statements below are taken verbatim from the brief's Module 1 health-
 * and-safety list rather than the electrical-theory lists used elsewhere in
 * Module 5.
 *   Knowledge  · "Safe systems of work."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Accuracy note: ISO 13849-1 (Performance Level, Category 3), IEC 62061
 * (SIL), IEC 61810-3 (forced-guided contacts) and PUWER 1998 citations are
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safety Relays and Controllers - MOET Module 5 Section 3.3';
const DESCRIPTION =
  'Safety relay modules, configurable safety controllers, dual-channel monitoring, forced-guided contacts and diagnostic capabilities for machine safety circuits. ISO 13849, IEC 62061 compliance. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'forced-guided',
    question: 'What is the primary advantage of a safety relay module over a standard relay?',
    options: [
      'A higher current rating on its output contacts than a standard relay',
      'A faster switching speed that reduces machine cycle times',
      'A lower coil power consumption that saves energy in the control panel',
      'Forced-guided contacts providing fault detection',
    ],
    correctIndex: 3,
    explanation:
      'Safety relays use forced-guided (positively-driven) contacts that mechanically ensure NO and NC contacts cannot both be closed simultaneously, enabling reliable fault detection. If an NO contact welds, the NC monitoring contact physically cannot close.',
  },
  {
    id: 'dual-channel',
    question: 'What does dual-channel monitoring mean in a safety circuit?',
    options: [
      'Two separate machines are monitored by a single safety relay',
      'Two independent signal paths monitor the same safety function',
      'The relay switches between two voltage ranges depending on the load',
      'Two reset buttons must be pressed together to restart the machine',
    ],
    correctIndex: 1,
    explanation:
      'Dual-channel monitoring uses two independent signal paths so that a single fault in one channel does not prevent the safety function from operating. The safety relay checks that both channels agree.',
  },
  {
    id: 'cross-fault',
    question: 'What is cross-fault detection in a dual-channel safety relay?',
    options: [
      'Detecting that an output contactor has welded closed during operation',
      'Detecting an open circuit in the reset button wiring before a restart',
      'Detecting a short circuit between the two input channels that could mask a fault',
      'Detecting electromagnetic interference on the safety relay supply',
    ],
    correctIndex: 2,
    explanation:
      'Cross-fault detection identifies short circuits between the two channels that could prevent detection of an open-circuit fault in one channel. Without cross-fault detection, a short between channels would defeat the redundancy.',
  },
  {
    id: 'edm-purpose',
    question: 'What is the purpose of the EDM (External Device Monitoring) feedback loop?',
    options: [
      'Confirming that external contactors have opened before allowing a reset',
      'Boosting the output current so larger contactors can be driven directly',
      'Synchronising the two input channels so they change state together',
      'Logging the number of operating cycles for maintenance scheduling',
    ],
    correctIndex: 0,
    explanation:
      'The EDM feedback loop monitors the state of external switching devices (contactors). If a contactor welds closed, its feedback contact remains open, and the safety relay detects the fault and prevents a restart. This is essential for detecting welded contactor failures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What standard specifies requirements for safety relay modules used in safety-related control systems?',
    options: [
      'BS 7671 and the IET Wiring Regulations',
      'IEC 62061 and ISO 13849-1',
      'IEC 60947-2 and BS EN 60898 only',
      'ISO 9001 and ISO 14001',
    ],
    correctAnswer: 1,
    explanation:
      'Safety relay modules must meet the requirements of IEC 62061 (Safety Integrity Level) or ISO 13849-1 (Performance Level) for safety-related control systems of machinery.',
  },
  {
    id: 2,
    question: 'What are forced-guided contacts?',
    options: [
      'Contacts held closed by spring pressure until the coil is energised',
      'Gold-plated contacts rated for low-current signal switching duty',
      'Contacts where NO and NC are mechanically linked so they cannot both be in the same state simultaneously',
      'Contacts that reset automatically once a safety function has been triggered',
    ],
    correctAnswer: 2,
    explanation:
      'Forced-guided contacts are mechanically linked so that if an NO contact welds closed, the NC contacts are physically prevented from closing, enabling fault detection. This principle is defined in IEC 61810-3.',
  },
  {
    id: 3,
    question: 'In a Category 3 architecture (ISO 13849-1), what happens if a single fault occurs?',
    options: [
      'The machine operates at reduced speed',
      'The system shuts down immediately',
      'An alarm sounds but operation continues',
      'The safety function is still performed despite the fault',
    ],
    correctAnswer: 3,
    explanation:
      'Category 3 requires that a single fault does not lead to loss of the safety function. The fault is detected at or before the next demand on the safety function. This is achieved through dual-channel redundancy.',
  },
  {
    id: 4,
    question: 'What is the feedback loop on a safety relay used for?',
    options: [
      'Confirming that external contactors have opened before allowing a reset',
      'Boosting the relay output current to drive larger external contactors',
      'Monitoring the supply voltage to the safety relay for dips and surges',
      'Counting the number of E-stop activations for maintenance records',
    ],
    correctAnswer: 0,
    explanation:
      'The feedback loop monitors the state of external contactors. If a contactor welds closed, the feedback loop detects this and prevents the safety relay from resetting, ensuring the fault is addressed before the machine can restart.',
  },
  {
    id: 5,
    question: 'What is the difference between automatic and monitored manual reset?',
    options: [
      'Automatic reset is only permitted on E-stop circuits, not on guards',
      'Monitored manual reset requires a deliberate operator action and detects stuck reset buttons',
      'Automatic reset needs two buttons pressed together, manual reset needs one',
      'Monitored manual reset re-enables outputs as soon as the inputs are satisfied',
    ],
    correctAnswer: 1,
    explanation:
      'Monitored manual reset requires the operator to release and then press the reset button. The relay monitors for a stuck button (permanent signal), preventing automatic restart. Automatic reset re-enables as soon as inputs are satisfied.',
  },
  {
    id: 6,
    question:
      'What advantage does a configurable safety controller have over individual safety relay modules?',
    options: [
      'It removes the need for any external contactors in the safety circuit',
      'It does not require forced-guided contacts or dual-channel monitoring',
      'Can handle multiple safety functions in one device with logic configuration',
      'It can be used as a standard PLC for non-safety machine control',
    ],
    correctAnswer: 2,
    explanation:
      'Configurable safety controllers can monitor multiple safety devices and implement logic (AND, OR, muting, two-hand control) in a single device, reducing wiring complexity and panel space.',
  },
  {
    id: 7,
    question: "What does the term 'safe state' mean for a machine safety system?",
    options: [
      'The state in which the machine runs at its maximum rated speed',
      'The state in which all safety devices have been bypassed for setting',
      'The state in which the machine is fully isolated from its power supply only',
      'The state in which the machine presents no hazard to personnel',
    ],
    correctAnswer: 3,
    explanation:
      'The safe state is the condition where the machine does not present a hazard. This may be stopped, or in some cases running at a safely reduced speed. The safe state is defined during the risk assessment.',
  },
  {
    id: 8,
    question: 'What is the purpose of pulse testing in safety input circuits?',
    options: [
      'Detecting short circuits and cross-faults in the input wiring by sending test pulses',
      'Periodically pulsing the output contactors to test for welded contacts',
      'Sending a reset pulse to clear stored faults at the start of each shift',
      'Pulsing the machine drive to confirm it stops within the safety distance',
    ],
    correctAnswer: 0,
    explanation:
      'Pulse testing sends brief test pulses on the input channels to detect wiring faults such as short circuits between channels or to earth. The pulses are too brief to affect the safety function but long enough for the relay to detect faults.',
  },
  {
    id: 9,
    question: 'Why must safety relay wiring use separate cable runs from power wiring?',
    options: [
      'To allow the safety wiring to use a smaller conductor than the power wiring',
      'To prevent electromagnetic interference causing false safe signals',
      'To make it easier to identify the safety wiring by its separate route',
      'To reduce the volt drop on the long power cables to the motor',
    ],
    correctAnswer: 1,
    explanation:
      'Separating safety wiring from power circuits prevents electromagnetic interference from inducing signals that could mask faults or cause false operation of safety devices.',
  },
  {
    id: 10,
    question: 'What does EDM stand for in the context of safety relays?',
    options: [
      'Electronic Device Management',
      'Enhanced Diagnostic Mode',
      'External Device Monitoring',
      'Emergency Disconnect Module',
    ],
    correctAnswer: 2,
    explanation:
      'EDM (External Device Monitoring) is the feedback circuit that monitors the state of external switching devices (contactors) to detect welded contacts and prevent restart after a fault.',
  },
  {
    id: 11,
    question: 'Which of these is an example of a configurable safety controller?',
    options: [
      'A single-function E-stop monitoring relay with fixed internal wiring',
      'A standard general-purpose PLC running ladder logic',
      'A din-rail mounted contactor with auxiliary feedback contacts',
      'A Pilz PNOZmulti or Sick Flexi Classic programmed with graphical safety logic',
    ],
    correctAnswer: 3,
    explanation:
      'Products such as the Pilz PNOZmulti, Sick Flexi Classic/Soft and Siemens MSS 3RK3 are configurable safety controllers that allow multiple safety functions to be implemented with graphical logic software.',
  },
  {
    id: 12,
    question:
      'A safety relay has locked out and the LED indicates a channel discrepancy fault. What is the most likely cause?',
    options: [
      'The two input channels did not change state within the defined time window, indicating a wiring fault or stuck contact',
      'The supply voltage to the safety relay has dropped below its rated minimum',
      'The output contactor has welded closed and the EDM loop has not reset',
      'The reset button has been pressed before the safety condition was restored',
    ],
    correctAnswer: 0,
    explanation:
      'A channel discrepancy means the two channels did not change state within the detection window. This could be caused by a broken wire, stuck contact or wiring fault on one channel. Investigate both channels and check all connections before resetting.',
  },
];

const faqs = [
  {
    question: 'When should I use a safety relay versus a safety PLC?',
    answer:
      'Safety relays are ideal for simple applications with one or a few safety functions (e.g., single E-stop, one guard interlock). Safety PLCs or configurable controllers are better for complex applications with multiple safety devices, logic requirements (muting, zone control), or where frequent changes to the safety configuration are expected.',
  },
  {
    question: 'Can I series-connect multiple E-stop buttons to one safety relay?',
    answer:
      'Yes, multiple E-stop buttons can be connected in series on each channel of a dual-channel safety relay. However, this means any E-stop activation stops the entire machine. For zone-specific control, separate safety relays or a safety controller with individual monitoring may be required.',
  },
  {
    question: 'How do I verify the safety relay is working correctly?',
    answer:
      'Perform regular proof tests as defined in the safety validation plan. This includes activating each safety device and confirming the machine stops, checking the feedback loop by simulating a welded contactor, verifying LED diagnostic indicators, and documenting test results with dates and findings.',
  },
  {
    question: 'What is the typical response time of a safety relay?',
    answer:
      'Most safety relay modules have response times between 10 ms and 30 ms from input signal change to output contact opening. This must be included in the overall stopping time calculation when determining safety distances per BS EN ISO 13855.',
  },
  {
    question: 'Can a standard PLC be used to control safety functions?',
    answer:
      'No. A standard PLC does not have the redundancy, diagnostics, or certified reliability required for safety functions. Only certified safety PLCs (e.g., Siemens F-CPU, Allen-Bradley GuardLogix) or dedicated safety devices can be used. The standard PLC can monitor safety status for display and logging purposes only.',
  },
];

const MOETModule5Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.3 · Subsection 3"
        title="Safety Relays and Controllers"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Forced-guided contacts, dual-channel monitoring, feedback loops and configurable safety
            controllers — the devices that turn a wired-up guard or E-stop into a certifiable safety
            function.
          </p>

          <TLDR
            points={[
              'Forced-guided contacts: Mechanically linked NO/NC ensure fault detection.',
              'Dual-channel: Two independent paths — single fault does not defeat safety.',
              'EDM feedback: Confirms contactor state before allowing reset.',
              'Response time: Typically 10-30 ms for safety relay modules.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operating principles of safety relay modules with forced-guided contacts',
              'Describe dual-channel monitoring architecture and its fault tolerance',
              'Identify the purpose and operation of the feedback (EDM) loop',
              'Differentiate between automatic reset, manual reset and monitored manual reset',
              'Compare safety relay modules with configurable safety controllers',
              'Apply diagnostic testing procedures to verify safety relay operation',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diagnostics:</strong> LED indicators show channel status and fault codes.
              </li>
              <li>
                <strong>Proof testing:</strong> Verify stop function, feedback loop and reset
                sequence.
              </li>
              <li>
                <strong>Replacement:</strong> Match manufacturer, model and wiring configuration
                exactly.
              </li>
              <li>
                <strong>ST1426:</strong> Test, maintain and document safety relay systems.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Safety relay module fundamentals</ContentEyebrow>

          <ConceptBlock title="Purpose-built for reliable fault detection">
            <p>
              A safety relay module is a purpose-built device that monitors safety inputs (E-stops,
              guard interlocks, light curtains) and controls safety outputs (contactors, valves) in
              accordance with the required safety integrity. Unlike standard control relays, safety
              relays incorporate forced-guided contacts that are mechanically linked to ensure
              reliable fault detection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Forced-guided contacts (IEC 61810-3)">
            <p>
              The fundamental difference between a safety relay and a standard relay lies in the
              contact mechanism:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical linkage:</strong> NO (safety output) and NC (monitoring) contacts
                are mechanically linked — they cannot both be closed simultaneously.
              </li>
              <li>
                <strong>Weld detection:</strong> If an NO contact welds closed, the corresponding NC
                contact is physically prevented from closing. The safety relay detects this
                discrepancy and locks out.
              </li>
              <li>
                <strong>Certified reliability:</strong> Force-guided contacts are manufactured and
                tested to IEC 61810-3, with documented failure mode data for PL/SIL calculations.
              </li>
              <li>
                <strong>No self-repair:</strong> Once a fault is detected, the relay locks out and
                requires investigation — it does not automatically recover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common safety relay manufacturers">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pilz:</strong> PNOZ series — widely used in UK manufacturing, comprehensive
                range for all safety functions.
              </li>
              <li>
                <strong>SICK:</strong> UE400 series — compact modules with integrated diagnostics.
              </li>
              <li>
                <strong>Allen-Bradley:</strong> Guardmaster MSR series — common in automotive and
                process industries.
              </li>
              <li>
                <strong>Siemens:</strong> SIRIUS 3SK series — integrates with Siemens control
                ecosystems.
              </li>
              <li>
                <strong>Schneider:</strong> Preventa XPSA series — used in packaging and general
                manufacturing.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> Safety relays are DIN-rail mounted, typically
              22.5-45 mm wide, with LED diagnostics on the front face. Always check the LED status
              during routine inspections — a flashing or amber LED typically indicates a fault
              condition requiring investigation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Dual-channel architecture</ContentEyebrow>

          <ConceptBlock title="Two independent paths, one safety demand">
            <p>
              Safety relays use dual-channel (redundant) monitoring where two independent signal
              paths monitor the same safety device. Each channel has its own input circuit, and both
              must agree for the safety relay to permit machine operation. If one channel detects a
              fault, the safety outputs are de-energised regardless of the other channel&apos;s
              state.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How dual-channel works">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Two paths:</strong> Each safety device (E-stop, guard switch) has two sets
                of contacts, one feeding each channel of the safety relay.
              </li>
              <li>
                <strong>Fault tolerance:</strong> If Channel 1 develops an open circuit, Channel 2
                still detects the safety demand and triggers the stop.
              </li>
              <li>
                <strong>Discrepancy monitoring:</strong> The relay monitors the time difference
                between channel state changes — if they do not change within a window (typically
                0.5-4 seconds), a discrepancy fault is declared.
              </li>
              <li>
                <strong>Cross-fault detection:</strong> The relay checks for short circuits between
                the two channels using test pulses. A cross-fault would defeat redundancy by making
                both channels appear identical.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Equivalent mode">
            <p>
              Both channels must change state within a defined time window. Used with dual-channel
              safety devices (E-stops with two NC contacts, dual-contact guard switches). The most
              common mode for E-stop and guard interlock monitoring.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Non-equivalent mode">
            <p>
              The channels alternate states — used with single-channel devices where the relay
              provides the second channel internally by alternating the test voltage. Less common,
              used for specific device types.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Routing both channels in the same cable"
            whatHappens={
              <>
                If the cable is damaged (crushed, cut, exposed to heat), a common-mode fault could
                affect both channels simultaneously, defeating the redundancy.
              </>
            }
            doInstead={
              <>
                The two channels must be wired separately — never route both channels in the same
                cable. Route Channel 1 and Channel 2 in separate cables, ideally on different cable
                routes.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Feedback loop (EDM) and reset modes</ContentEyebrow>

          <ConceptBlock title="Confirming the contactors actually opened">
            <p>
              The External Device Monitoring (EDM) feedback loop is a critical feature of safety
              relay circuits. It monitors the actual state of the external switching devices
              (typically contactors) controlled by the safety relay outputs. Without EDM, a welded
              contactor would not be detected, and the machine could restart even though the safety
              output has opened.
            </p>
          </ConceptBlock>

          <ConceptBlock title="EDM operation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wiring:</strong> A normally closed auxiliary contact from each contactor is
                wired back to the safety relay&apos;s feedback input.
              </li>
              <li>
                <strong>Normal operation:</strong> When contactors are energised (running), the NC
                feedback contacts are open. When the safety relay de-energises, the contactors drop
                out and the feedback contacts close, confirming the stop.
              </li>
              <li>
                <strong>Fault detection:</strong> If a contactor welds closed, its feedback contact
                remains open. The safety relay detects this and prevents a restart — the fault must
                be investigated and repaired.
              </li>
              <li>
                <strong>Multiple contactors:</strong> Feedback contacts from multiple contactors can
                be series-connected into the EDM input.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Reset modes">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Automatic reset:</strong> The safety outputs re-enable as soon as the safety
                inputs are satisfied. Used for devices with frequent cycling (light curtains, safety
                mats) where manual reset would impede production.
              </li>
              <li>
                <strong>Manual reset:</strong> The operator must press a reset button after the
                safety condition is restored. Used for E-stops and guard interlocks where deliberate
                acknowledgement is required.
              </li>
              <li>
                <strong>Monitored manual reset:</strong> Requires a rising edge on the reset input —
                the relay checks that the button is not permanently pressed (taped down or stuck).
                ISO 13849-1 specifies which mode is appropriate based on the risk assessment.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Always verify the reset mode setting during commissioning.
              A safety relay configured for automatic reset on an E-stop circuit would be a serious
              non-compliance — E-stops must always use manual or monitored manual reset.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Configurable safety controllers</ContentEyebrow>

          <ConceptBlock title="A compact alternative to banks of relays">
            <p>
              For applications requiring multiple safety functions, configurable safety controllers
              offer a compact alternative to banks of individual safety relay modules. These devices
              combine the monitoring capability of multiple safety relays into a single unit with
              graphical logic programming.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key products">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pilz PNOZmulti:</strong> The industry standard configurable controller —
                drag-and-drop function blocks in PNOZmulti Configurator software.
              </li>
              <li>
                <strong>SICK Flexi Classic/Soft:</strong> Modular system with graphical
                configuration via Flexi Soft Designer.
              </li>
              <li>
                <strong>Siemens MSS 3RK3:</strong> Modular safety system integrated with the SIRIUS
                range.
              </li>
              <li>
                <strong>Allen-Bradley SmartGuard 600:</strong> Compact controller with
                DeviceNet/EtherNet IP integration.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Configuration process">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Function blocks:</strong> Drag-and-drop blocks for E-stop, guard monitoring,
                two-hand control, muting, enabling switches.
              </li>
              <li>
                <strong>Logic connections:</strong> AND, OR, timer and counter blocks link safety
                inputs to outputs.
              </li>
              <li>
                <strong>Verification:</strong> The software compiles and verifies the configuration,
                generating a CRC checksum to prevent unauthorised modification.
              </li>
              <li>
                <strong>Download:</strong> The verified configuration is downloaded to the
                controller and locked.
              </li>
              <li>
                <strong>Modification control:</strong> Any change requires re-verification,
                re-validation and documentation — maintaining safety integrity.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Advantages over individual relays">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Reduced panel space — one controller replaces multiple relays.</li>
              <li>Less wiring — safety devices connect directly to the controller I/O.</li>
              <li>Enhanced diagnostics — network connections for diagnostic data to PLC/SCADA.</li>
              <li>Expandable — additional I/O modules can be added as needed.</li>
              <li>Achieves up to PL e / SIL 3 for safety functions.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Diagnostic testing and maintenance</ContentEyebrow>

          <ConceptBlock title="A legal requirement, verified with a structured proof test">
            <p>
              Safety relays require regular proof testing to verify that all safety functions
              operate correctly. This is a legal requirement under PUWER 1998 and a core competency
              under ST1426. The proof test interval is determined during the safety system design
              and documented in the maintenance schedule.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Proof test procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Check the safety relay LED diagnostics — record the current
                status.
              </li>
              <li>
                <strong>Step 2:</strong> Activate each safety device individually (press each
                E-stop, open each guard) and confirm the machine stops.
              </li>
              <li>
                <strong>Step 3:</strong> Verify restart prevention — confirm the machine does not
                restart when the safety device is reset without pressing start.
              </li>
              <li>
                <strong>Step 4:</strong> Test the feedback loop — simulate a welded contactor (if
                safe to do so) and confirm the relay locks out.
              </li>
              <li>
                <strong>Step 5:</strong> Verify the reset function — confirm monitored manual reset
                requires a rising edge.
              </li>
              <li>
                <strong>Step 6:</strong> Document all results including date, tester, machine ID,
                safety relay serial number and any faults found.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common fault indications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Channel discrepancy: Wiring fault or stuck contact.</li>
              <li>EDM fault: Welded contactor or feedback wiring.</li>
              <li>Cross-fault: Short between input channels.</li>
              <li>No output: Check power supply and input conditions.</li>
              <li>Intermittent: Loose terminals or damaged cable.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Replacement considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Must be like-for-like (same model, same PL/SIL).</li>
              <li>Verify wiring against the circuit diagram.</li>
              <li>Check DIP switch settings match the original.</li>
              <li>Re-test all functions after replacement.</li>
              <li>Update maintenance records with new serial number.</li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians must be able to test safety relay systems,
              interpret diagnostic indicators, carry out like-for-like replacements, and document
              all maintenance actions. Never substitute a safety relay with a standard relay or a
              different model without engineering review and re-validation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Forced-guided (positively-driven) contacts (IEC 61810-3) mechanically prevent NO and NC from both being closed — the mechanism a standard relay does not have.',
              'Dual-channel monitoring means a single fault in one channel does not defeat the safety function; cross-fault detection catches shorts between channels that would otherwise mask that fault.',
              'Route the two safety channels in separate cables — a single damaged cable carrying both channels can defeat the redundancy through a common-mode fault.',
              'The EDM feedback loop confirms external contactors actually opened before allowing reset — without it, a welded contactor goes undetected and the machine can restart unsafely.',
              'Automatic reset suits frequently cycling devices like light curtains; E-stops and guard interlocks always need manual or monitored manual reset, which also detects a stuck button.',
              'Category 3 (ISO 13849-1) requires that a single fault does not lose the safety function — the fault must be detected at or before the next demand.',
              'Configurable safety controllers (Pilz PNOZmulti, SICK Flexi, Siemens MSS, Allen-Bradley SmartGuard) replace banks of relays with one CRC-verified, locked configuration.',
              'Proof testing must exercise every safety device individually, verify restart prevention, test the feedback loop, and be fully documented — a legal requirement under PUWER 1998.',
              'A replacement safety relay must be like-for-like (same model, same PL/SIL) with matching DIP switch settings, fully re-tested before return to service.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Guarding and Interlocking
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Category and Performance Levels
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section3_3;
