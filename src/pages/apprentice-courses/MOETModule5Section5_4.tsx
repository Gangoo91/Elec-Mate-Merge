/**
 * MOET · Module 5 · Section 5 · Subsection 4 — Functional Testing of Loops
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Electrical. Conduct functional testing."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * placed its four InlineCheck questions out of numeric order (0, 3, 2, 1)
 * because each pairs with the section it follows — that pairing is preserved
 * here rather than renumbered.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Functional Testing of Loops - MOET Module 5 Section 5.4';
const DESCRIPTION =
  'End-to-end functional testing of control loops from sensor through controller to final element, verifying correct operation before and during service including dry tests, wet tests, alarm verification and SIF testing per IEC 61511.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What does a loop functional test verify?',
    options: [
      'The correct operation of the entire control loop from sensor to final element',
      'Only that the transmitter has been calibrated correctly',
      'Only the insulation resistance of the loop wiring',
      'Only that the final element moves to its fail-safe position',
    ],
    correctIndex: 0,
    explanation:
      'A loop functional test verifies that the complete loop operates correctly: the sensor detects the process variable, the transmitter converts it to a signal, the controller processes it, and the final element responds appropriately.',
  },
  {
    id: 'qc2',
    question: 'When is loop testing typically performed?',
    options: [
      'Only when a process fault has already been reported by operations',
      'At commissioning, after maintenance, and as periodic verification',
      'Only once, during the initial works factory acceptance test',
      'Only when the controller application software is being upgraded',
    ],
    correctIndex: 1,
    explanation:
      'Loop testing is performed during initial commissioning, after any work on loop components, when instruments are replaced, and periodically as part of a preventive maintenance programme.',
  },
  {
    id: 'qc3',
    question: 'What is a loop check sheet?',
    options: [
      'A drawing showing the physical routing of all loop cabling',
      'A list of spare parts held for each instrument in the loop',
      'A documented form recording the test results for each step of the loop functional test',
      'A schedule showing when each loop is due for recalibration',
    ],
    correctIndex: 2,
    explanation:
      'A loop check sheet is a structured document recording all test results, observations, and sign-offs for each step of the loop functional test, providing evidence of correct operation.',
  },
  {
    id: 'qc4',
    question: "What is a 'bump test' on a control loop?",
    options: [
      'Tapping the transmitter housing to check for loose internal connections',
      'Driving the loop fully to its high and low alarm setpoints in turn',
      'Disconnecting the loop power to confirm the valve fail-safe position',
      'Making a small step change to the controller output and observing the response',
    ],
    correctIndex: 3,
    explanation:
      'A bump test applies a small step change to the controller output and observes the process variable response, verifying the loop is connected correctly and responding in the expected direction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the first step in a loop functional test?',
    options: [
      'Immediately injecting a 20 mA signal at the transmitter terminals',
      'Reviewing the loop drawings and data sheets to understand its function',
      'Driving the final control element to its fully open position',
      'Placing the controller into automatic mode before testing begins',
    ],
    correctAnswer: 1,
    explanation:
      'Before testing, review all documentation to understand what the loop should do, what signals are expected, what the controller action should be, and how the final element should respond.',
  },
  {
    id: 2,
    question: 'Why should the controller be placed in manual mode during loop testing?',
    options: [
      'To force the controller to log every test result automatically',
      'To increase the speed at which the controller responds to changes',
      'To prevent the controller from responding to test signals and causing unintended process changes',
      'To disable all alarms so they do not activate during testing',
    ],
    correctAnswer: 2,
    explanation:
      'Manual mode prevents the controller from automatically adjusting the output in response to test signals, which could cause unintended valve movements or process disturbances.',
  },
  {
    id: 3,
    question: "What does verifying the 'loop direction' mean?",
    options: [
      'Confirming the field cables run correctly to the control room',
      'Confirming the process fluid flows in the designed direction',
      'Confirming the transmitter terminals are wired with correct polarity',
      'Confirming the controller output moves correctly as the process variable changes',
    ],
    correctAnswer: 3,
    explanation:
      'Loop direction verification ensures that when the process variable increases, the controller output moves in the correct direction (increase or decrease) to bring it back to setpoint.',
  },
  {
    id: 4,
    question: 'During loop testing, what does simulating the transmitter signal verify?',
    options: [
      'The wiring, input card, controller display, alarms and trending functions',
      'Only the mechanical condition of the in-process sensing element',
      'Only the integrity of the process connections and impulse lines',
      'Only the calibration certificate held for the reference standard',
    ],
    correctAnswer: 0,
    explanation:
      'Simulating the transmitter signal at the field end verifies everything downstream of the transmitter: wiring integrity, input card operation, controller scaling and display, alarm activation, and historian recording.',
  },
  {
    id: 5,
    question: 'What should be verified at the final control element during loop testing?',
    options: [
      'That the element is correctly sized for the connected pipe diameter',
      'That it moves to the correct position, with correct fail-safe action and full stroke',
      'That the element has a current calibration certificate held on file',
      'That the element matches the manufacturer named on the data sheet',
    ],
    correctAnswer: 1,
    explanation:
      'The final element must respond correctly to controller output signals, achieve full travel (0-100%), move in the correct direction, and demonstrate correct fail-safe action on signal/power loss.',
  },
  {
    id: 6,
    question: 'Why must alarm testing be included in loop functional tests?',
    options: [
      'Because alarms are the only part of the control loop that can fail',
      'Because alarm testing replaces the need to test the final element',
      'To verify alarms activate at the correct setpoints and display correctly',
      'Because alarms must always be disabled before any other testing begins',
    ],
    correctAnswer: 2,
    explanation:
      'Alarm testing verifies that high, low, high-high, and low-low alarms activate at the configured setpoints, display correctly on the operator station, annunciate audibly, and are acknowledged/cleared properly.',
  },
  {
    id: 7,
    question: "What is a 'wet test' versus a 'dry test' for a control loop?",
    options: [
      'A wet test is done outdoors; a dry test is done inside a workshop',
      'A wet test uses mains AC power; a dry test uses battery power only',
      'A wet test checks the field wiring; a dry test checks the sensor',
      'A wet test uses actual process fluid; a dry test uses simulated signals',
    ],
    correctAnswer: 3,
    explanation:
      'A dry test simulates signals without process fluid to verify instrument and wiring. A wet test introduces actual process fluid (or water/air) to verify the complete system including sensing elements and process connections.',
  },
  {
    id: 8,
    question: 'What documentation should be completed after a successful loop functional test?',
    options: [
      'A signed and witnessed loop check sheet recording all the test results',
      'A purchase order for any replacement loop instruments required',
      'A risk assessment covering the next phase of plant construction',
      'A calibration certificate for the process calibrator that was used',
    ],
    correctAnswer: 0,
    explanation:
      'Completed loop check sheets record all test results, deviations and corrective actions, providing documented evidence of correct loop operation. They are signed by the tester and witness, and form part of the commissioning or maintenance records.',
  },
  {
    id: 9,
    question:
      'When testing a safety instrumented function (SIF), what additional requirements apply?',
    options: [
      'No additional requirements apply beyond those for a standard loop test',
      'It must follow the SIF procedure, achieve proof test coverage and meet IEC 61511',
      'The SIF may only be tested once it has been permanently bypassed',
      'Only the transmitter needs testing, not the logic solver or final element',
    ],
    correctAnswer: 1,
    explanation:
      'SIF testing must achieve the required proof test coverage (per the SIL verification), follow approved procedures, be performed by competent personnel, and maintain detailed records as required by IEC 61511.',
  },
  {
    id: 10,
    question: "What is 'proof test coverage' for a safety instrumented function?",
    options: [
      'The percentage of the plant protected by the safety function',
      'The number of witnesses required to sign off the test',
      'The fraction of dangerous undetected failures that the proof test is capable of detecting',
      'The proportion of the loop that can be tested while running',
    ],
    correctAnswer: 2,
    explanation:
      'Proof test coverage quantifies the effectiveness of the test in detecting dangerous undetected failures. Higher coverage means more dangerous failures can be found. The required coverage is specified during SIL verification.',
  },
  {
    id: 11,
    question: 'Why should interlocks be managed before starting loop testing?',
    options: [
      'Because interlocks must be permanently removed before any test begins',
      'Because active interlocks prevent the controller from entering manual mode',
      'Because active interlocks invalidate the loop check sheet that is produced',
      'Test signals reaching alarm levels may trip interlocks and shut the plant down',
    ],
    correctAnswer: 3,
    explanation:
      'Driving test signals to alarm setpoints may trigger safety interlocks, causing plant trips or equipment shutdowns. Interlocks must be formally bypassed (with approval) or managed as part of the test procedure.',
  },
  {
    id: 12,
    question: 'What is the purpose of checking the historian/trend recording during loop testing?',
    options: [
      'To verify the process variable is being correctly recorded for trend analysis',
      'To confirm that the final element reaches its fail-safe position',
      'To prove the voltage indicator works on a known live source',
      'To check the recommended calibration interval of the transmitter',
    ],
    correctAnswer: 0,
    explanation:
      'Historian recording verification ensures the process variable appears correctly with accurate scaling, units, and timestamp. This data is used for process optimisation, regulatory compliance reporting, and fault investigation.',
  },
];

const faqs = [
  {
    question: 'How long does a typical loop functional test take?',
    answer:
      'A simple single-loop test (transmitter, controller, valve) typically takes 30-60 minutes including documentation. Complex loops with multiple instruments, interlocks, and alarm functions may take several hours. Allow additional time for any adjustments or fault-finding required during testing.',
  },
  {
    question: 'Can I perform loop testing while the process is running?',
    answer:
      "Some loop tests can be performed on-line by using the controller's manual mode and making small test changes. However, this requires careful coordination with operations and risk assessment. Full loop tests involving signal simulation or disconnection typically require the loop to be taken out of service with appropriate isolation and bypass arrangements.",
  },
  {
    question: 'What if the loop test reveals a problem?',
    answer:
      'Document the fault, investigate the root cause, implement the correction (repair, re-wire, recalibrate, etc.), and re-test the loop. Do not sign off the loop check sheet until the loop passes all tests. Record all deficiencies and corrective actions on the loop check sheet or a separate punch list.',
  },
  {
    question: 'Who should witness loop functional tests?',
    answer:
      'During commissioning, tests are typically witnessed by the commissioning engineer, operations representative, and/or quality assurance. During maintenance, the maintenance supervisor or a second competent technician may witness. Safety instrumented function tests may require an independent witness as specified in the safety management system.',
  },
  {
    question: 'What is the difference between a loop test and a point-to-point wiring check?',
    answer:
      'A point-to-point wiring check verifies only that the correct wires are connected to the correct terminals (continuity and polarity). A loop functional test goes further by verifying end-to-end signal flow, correct scaling, alarm operation, fail-safe action, and system response. The wiring check is typically done first, followed by the functional test.',
  },
];

const MOETModule5Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.5 · Subsection 4"
        title="Functional Testing of Loops"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            End-to-end verification from sensor through controller to final element.
          </p>

          <TLDR
            points={[
              'Scope: sensor to transmitter to controller to final element.',
              'Controller mode: manual during testing to prevent auto-response.',
              'Dry test: simulated signals without process fluid.',
              'Wet test: actual process fluid to verify sensing and connections.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the purpose and scope of loop functional testing',
              'Plan and execute end-to-end loop tests from sensor to final element',
              'Verify loop direction, alarm operation, and fail-safe action',
              'Differentiate between dry tests and wet tests',
              'Complete loop check sheets with appropriate documentation',
              'Explain additional requirements for testing safety instrumented functions',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loop direction:</strong> verify the controller responds correctly to PV
                changes.
              </li>
              <li>
                <strong>Alarms:</strong> test activation at correct setpoints with audible
                annunciation.
              </li>
              <li>
                <strong>SIF testing:</strong> IEC 61511 proof test coverage requirements.
              </li>
              <li>
                <strong>Documentation:</strong> signed loop check sheets for every test.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Loop test planning and preparation</ContentEyebrow>

          <ConceptBlock
            title="Loop test planning and preparation"
            onSite="Never start a loop test without reviewing the documentation first. Understanding the loop's intended function, expected signals, and alarm responses prevents unexpected events and makes fault-finding much easier if problems are discovered."
          >
            <p>
              Before starting any loop test, thorough preparation is essential. Review the{' '}
              <strong>loop drawing</strong> (showing all instruments, wiring, junction boxes, and
              terminations), <strong>instrument data sheets</strong> (specifying ranges, types,
              calibration data), <strong>cause and effect diagrams</strong> (defining the expected
              system response), and the <strong>controller configuration</strong> (scaling, alarm
              setpoints, control action).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pre-test prerequisites">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instruments:</strong> installed and individually calibrated.
              </li>
              <li>
                <strong>Wiring:</strong> complete and continuity-tested (point-to-point check
                passed).
              </li>
              <li>
                <strong>Power supplies:</strong> available and correct voltage/polarity.
              </li>
              <li>
                <strong>Instrument air:</strong> available for pneumatic actuators (clean, dry,
                correct pressure).
              </li>
              <li>
                <strong>Controller:</strong> configured with correct scaling, alarm limits, and
                control action.
              </li>
              <li>
                <strong>Operations:</strong> control room operator informed of test activities.
              </li>
              <li>
                <strong>Test equipment:</strong> process calibrator, multimeter, HART communicator
                prepared.
              </li>
            </ul>
            <p>
              Place the controller in <strong>manual mode</strong> before beginning. This prevents
              automatic control action from causing unintended process changes during testing.
              Communicate with operations to ensure they are aware the loop is under test and will
              not respond normally to process changes. If the loop has safety interlocks, ensure
              these are managed appropriately (bypassed with formal approval if necessary, or tested
              as part of the procedure).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Executing the loop test</ContentEyebrow>

          <ConceptBlock
            title="Executing the loop test"
            onSite="When testing alarms, approach the setpoint slowly from below (for high alarms) or above (for low alarms). This verifies the exact activation point and avoids overshooting the alarm level, which could trigger safety interlocks."
          >
            <p>
              The test proceeds systematically from the <strong>sensor end</strong> to the{' '}
              <strong>final element</strong>. Step 1: Simulate or apply a known input at the sensor
              location (e.g. inject a 4-20 mA signal using a calibrator). Step 2: Verify the correct
              reading appears on the controller display with correct engineering units. Step 3:
              Check that the process variable appears correctly on any remote displays, recorders,
              and historian trends.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Systematic test sequence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> simulate transmitter signal at field end (4 mA, 12 mA, 20
                mA).
              </li>
              <li>
                <strong>Step 2:</strong> verify controller display reads correct value in correct
                engineering units.
              </li>
              <li>
                <strong>Step 3:</strong> check remote displays, recorders, and historian trending.
              </li>
              <li>
                <strong>Step 4:</strong> test alarm activation at H, L, HH, LL setpoints.
              </li>
              <li>
                <strong>Step 5:</strong> drive controller output 0-100% and verify final element
                response.
              </li>
              <li>
                <strong>Step 6:</strong> verify loop direction (PV increase causes correct output
                response).
              </li>
              <li>
                <strong>Step 7:</strong> test fail-safe action (remove signal/power, confirm safe
                position).
              </li>
            </ul>
            <p>
              Step 4: Simulate alarm conditions by driving the signal to high, low, high-high, and
              low-low alarm setpoints. Verify each alarm activates at the correct value, displays on
              the operator station with correct priority and message, generates an audible
              annunciation, and can be acknowledged and cleared correctly. Step 5: From the
              controller, drive the output from 0% to 100% and verify the final element (valve,
              damper, VSD) responds correctly across the full range.
            </p>
            <p>
              Step 6: Verify <strong>loop direction</strong> -- when the process variable increases,
              the controller output should move in the correct direction to counteract the change
              (increase or decrease depending on the control action and valve action). Step 7: Test
              fail-safe action by removing the signal or power supply and confirming the final
              element goes to its designated safe position. Record all results on the loop check
              sheet.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Dry tests and wet tests</ContentEyebrow>

          <ConceptBlock
            title="Dry tests and wet tests"
            onSite="A successful dry test does not guarantee the loop will work correctly with actual process fluid. A blocked impulse line, a sensor installed upside down, or a leak at a process connection will only be revealed by wet testing."
          >
            <p>
              A <strong>dry test</strong> uses simulated signals (injected by calibrators) without
              any process fluid in the system. This verifies the instrumentation, wiring, controller
              configuration, and display/alarm functions. Dry testing can be performed before
              process fluids are introduced and is the standard method for initial loop checking
              during construction and commissioning.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Dry test verifies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Wiring integrity and polarity.</li>
              <li>Controller input card operation.</li>
              <li>Scaling, display, and engineering units.</li>
              <li>Alarm activation and annunciation.</li>
              <li>Final element response to controller output.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Wet test verifies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Sensing element correct response.</li>
              <li>Process connections and impulse lines.</li>
              <li>No leaks at fittings and manifolds.</li>
              <li>Correct response to actual process conditions.</li>
              <li>Installation effects (head pressure, orientation).</li>
            </ul>
            <p>
              A <strong>wet test</strong> introduces actual process fluid (or a suitable substitute
              such as water or air) into the system to verify the complete measurement chain
              including the sensing element, process connections, impulse lines, and any in-line
              components. Wet testing confirms that the sensor responds correctly to actual process
              conditions and that there are no leaks, blockages, or installation errors that would
              not be detected by dry testing alone.
            </p>
            <p>
              For a complete commissioning, both dry and wet tests are typically required. The dry
              test verifies the instrumentation and control system, while the wet test confirms the
              process interface. During routine maintenance, a dry test using signal simulation is
              usually sufficient unless the sensor or process connections have been disturbed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety instrumented function testing</ContentEyebrow>

          <ConceptBlock
            title="Safety instrumented function testing"
            onSite="Maintenance technicians working on safety instrumented systems must understand the importance of proof testing, follow approved procedures exactly, and never modify or bypass safety functions without formal authorisation through the management of change process."
          >
            <p>
              Testing <strong>safety instrumented functions (SIFs)</strong> carries additional
              requirements beyond standard loop testing. SIF testing must comply with{' '}
              <strong>IEC 61511</strong> (the process sector standard for functional safety) and the
              specific safety requirements specification (SRS) for each safety function. The test
              procedure must be designed to achieve the required{' '}
              <strong>proof test coverage</strong> -- the fraction of dangerous undetected failures
              that the test can reveal.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SIF testing requirements (IEC 61511)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved procedure:</strong> SIF test procedures must be formally approved
                and version-controlled.
              </li>
              <li>
                <strong>Proof test coverage:</strong> the test must achieve the coverage assumed in
                the SIL calculation.
              </li>
              <li>
                <strong>Competent personnel:</strong> testers must be trained and authorised for SIF
                testing.
              </li>
              <li>
                <strong>Independent witness:</strong> may be required by the safety management
                system.
              </li>
              <li>
                <strong>Bypass management:</strong> formal bypass procedures for any safety
                functions disabled during testing.
              </li>
              <li>
                <strong>Complete documentation:</strong> detailed records maintained for the
                lifetime of the SIF.
              </li>
            </ul>
            <p>
              A SIF proof test typically includes: end-to-end signal injection to verify sensor and
              logic solver response, verification of the final element (valve) trip action and
              timing, confirmation of correct fail-safe position, testing of all voting arrangements
              (e.g. 2oo3), and verification of diagnostic functions. The test frequency is
              determined by the SIL verification calculation and specified in the safety
              requirements specification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Loop check sheet documentation</ContentEyebrow>

          <ConceptBlock
            title="Loop check sheet documentation"
            onSite="Loop check sheets are quality records that may be reviewed during audits, commissioning handover, and regulatory inspections. They demonstrate that the installation has been systematically tested and verified. Incomplete or missing loop check sheets can delay handover and raise questions about the integrity of the installation."
          >
            <p>
              The <strong>loop check sheet</strong> is the formal record of the loop functional
              test. It provides documented evidence that the loop has been tested and is operating
              correctly. The sheet should be a controlled form within the project or site quality
              management system, with specific fields for all test criteria.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Loop check sheet content">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loop identification:</strong> tag number, description, P&amp;ID reference,
                loop drawing number.
              </li>
              <li>
                <strong>Instrument details:</strong> manufacturer, model, serial number, range for
                each instrument in the loop.
              </li>
              <li>
                <strong>Signal verification:</strong> simulated input, expected output, actual
                output at each test point.
              </li>
              <li>
                <strong>Alarm verification:</strong> setpoint, actual activation point, operator
                station display, annunciation.
              </li>
              <li>
                <strong>Final element:</strong> stroke test results, fail-safe action, response time
                if applicable.
              </li>
              <li>
                <strong>Deficiencies:</strong> any problems found, corrective actions taken, re-test
                results.
              </li>
              <li>
                <strong>Sign-off:</strong> tester signature, witness signature, date.
              </li>
            </ul>
            <p>
              All deficiencies discovered during testing must be recorded, including the corrective
              action taken. Do not sign off the loop check sheet until all deficiencies have been
              resolved and the loop passes all tests. Outstanding items that cannot be resolved
              immediately should be recorded on a <strong>punch list</strong> with a clear
              description, priority, and responsibility for closure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A loop check that finds the right reading on the wrong tag"

            situation={
              <>
                <p>
                  Commissioning a new skid, you are loop-checking eight temperature points.
                  Injecting a simulated signal at TT-201 produces a correct response on the HMI —
                  but on the display for TT-202.
                </p>

                <p>
                  Both transmitters are the same model and both loops read plausibly during normal
                  running.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Stop and check the rest before assuming it is a simple pair swap. Two crossed
                  loops are common; three or more rotated round a marshalling strip are not unusual
                  on a new install.
                </p>

                <p>
                  Work from the field end, not the panel. Inject at each transmitter in turn and
                  record which HMI tag responds. That builds the actual map rather than the intended
                  one.
                </p>

                <p>
                  Trace the crossing to a specific point — field junction box, marshalling terminal,
                  or the card-to-tag assignment in the PLC configuration. Which it is decides
                  whether the fix is a wiring change or a configuration change, and they carry very
                  different amounts of retesting.
                </p>

                <p>
                  Re-check every loop on the skid after the correction, not just the two you
                  touched. A swap at a marshalling strip is rarely isolated.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Crossed loops are almost undetectable in normal running, because both readings look
                reasonable. They surface during an upset, when the control system acts on the wrong
                vessel — and that is the worst possible moment to discover it. A loop check exists
                precisely to catch this before the plant is live, which is why proving the tag
                matters as much as proving the signal.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Loop test scope: sensor to transmitter to controller to final element, with the controller in manual mode during the test.',
              'A dry test uses simulated signals with no process fluid; a wet test uses actual fluid to verify sensing.',
              'A bump test is a small step change used to check response.',
              'Verify loop direction, alarm activation at correct setpoints, and fail-safe action on signal/power loss.',
              'SIF testing follows IEC 61511 proof test coverage requirements.',
              'Every test needs a signed loop check sheet.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Zero, Span and Linearity Adjustments
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Documenting Calibration Results
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section5_4;
