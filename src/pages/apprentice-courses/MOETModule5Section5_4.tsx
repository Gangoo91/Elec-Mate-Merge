import { ArrowLeft, RotateCcw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional Testing of Loops - MOET Module 5 Section 5.4";
const DESCRIPTION = "End-to-end functional testing of control loops from sensor through controller to final element, verifying correct operation before and during service including dry tests, wet tests, alarm verification and SIF testing per IEC 61511.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What does a loop functional test verify?",
    options: [
      "Only the transmitter accuracy",
      "The correct operation of the entire control loop from sensor to final element",
      "Only the wiring continuity",
      "Only the controller tuning"
    ],
    correctIndex: 1,
    explanation: "A loop functional test verifies that the complete loop operates correctly: the sensor detects the process variable, the transmitter converts it to a signal, the controller processes it, and the final element responds appropriately."
  },
  {
    id: "qc2",
    question: "When is loop testing typically performed?",
    options: [
      "Only during initial commissioning",
      "During commissioning, after maintenance, after instrument replacement, and as part of periodic verification",
      "Only when a fault is reported",
      "Only during annual shutdowns"
    ],
    correctIndex: 1,
    explanation: "Loop testing is performed during initial commissioning, after any work on loop components, when instruments are replaced, and periodically as part of a preventive maintenance programme."
  },
  {
    id: "qc3",
    question: "What is a loop check sheet?",
    options: [
      "A sheet of paper used to wrap cables",
      "A documented form recording the test results for each step of the loop functional test",
      "A drawing showing the loop wiring",
      "A purchase order for loop components"
    ],
    correctIndex: 1,
    explanation: "A loop check sheet is a structured document recording all test results, observations, and sign-offs for each step of the loop functional test, providing evidence of correct operation."
  },
  {
    id: "qc4",
    question: "What is a 'bump test' on a control loop?",
    options: [
      "Physically bumping the instrument to test vibration resistance",
      "Making a small step change to the controller output in manual mode and observing the process response",
      "Testing the control panel door for tightness",
      "Dropping a test weight onto the instrument"
    ],
    correctIndex: 1,
    explanation: "A bump test applies a small step change to the controller output and observes the process variable response, verifying the loop is connected correctly and responding in the expected direction."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the first step in a loop functional test?",
    options: ["Adjusting the controller tuning", "Reviewing the loop drawing, instrument data sheets, and understanding the intended function of the loop", "Disconnecting the transmitter", "Putting the controller in automatic"],
    correctAnswer: 1,
    explanation: "Before testing, review all documentation to understand what the loop should do, what signals are expected, what the controller action should be, and how the final element should respond."
  },
  {
    id: 2,
    question: "Why should the controller be placed in manual mode during loop testing?",
    options: ["To save energy", "To prevent the controller from responding to test signals and causing unintended process changes", "It is not necessary", "To speed up testing"],
    correctAnswer: 1,
    explanation: "Manual mode prevents the controller from automatically adjusting the output in response to test signals, which could cause unintended valve movements or process disturbances."
  },
  {
    id: 3,
    question: "What does verifying the 'loop direction' mean?",
    options: ["Checking the cable routing direction", "Confirming that the controller output moves in the correct direction in response to a change in the process variable", "Checking which way the transmitter faces", "Verifying the data flow direction on the network"],
    correctAnswer: 1,
    explanation: "Loop direction verification ensures that when the process variable increases, the controller output moves in the correct direction (increase or decrease) to bring it back to setpoint."
  },
  {
    id: 4,
    question: "During loop testing, what does simulating the transmitter signal verify?",
    options: ["Only the transmitter itself", "The wiring, input card, controller display, alarming, and any recording/trending functions downstream of the transmitter", "Only the power supply", "Nothing useful"],
    correctAnswer: 1,
    explanation: "Simulating the transmitter signal at the field end verifies everything downstream: wiring integrity, input card operation, controller scaling and display, alarm activation, and historian recording."
  },
  {
    id: 5,
    question: "What should be verified at the final control element during loop testing?",
    options: ["Only that it is installed", "That it moves to the correct position in response to the controller output, with correct fail-safe action and full stroke capability", "Only the nameplate data", "Only the actuator air supply"],
    correctAnswer: 1,
    explanation: "The final element must respond correctly to controller output signals, achieve full travel (0-100%), move in the correct direction, and demonstrate correct fail-safe action on signal/power loss."
  },
  {
    id: 6,
    question: "Why must alarm testing be included in loop functional tests?",
    options: ["Alarms are not important", "To verify that alarms activate at the correct setpoints, display correctly on the operator station, and generate the correct response", "Only for safety-critical loops", "Alarm testing is a separate activity"],
    correctAnswer: 1,
    explanation: "Alarm testing verifies that high, low, high-high, and low-low alarms activate at the configured setpoints, display correctly, annunciate audibly, and are acknowledged/cleared properly."
  },
  {
    id: 7,
    question: "What is a 'wet test' versus a 'dry test' for a control loop?",
    options: ["Testing in rain versus dry weather", "A wet test uses actual process fluid; a dry test uses simulated signals without process fluid", "There is no difference", "A wet test uses water cooling"],
    correctAnswer: 1,
    explanation: "A dry test simulates signals without process fluid to verify instrument and wiring. A wet test introduces actual process fluid (or water/air) to verify the complete system including sensing elements and process connections."
  },
  {
    id: 8,
    question: "What documentation should be completed after a successful loop functional test?",
    options: ["No documentation is required", "Loop check sheet signed by the tester and witnessed, recording all test results, deviations, and corrective actions", "Only a verbal confirmation", "Just an email to the supervisor"],
    correctAnswer: 1,
    explanation: "Completed loop check sheets provide documented evidence of correct loop operation. They are signed by the tester and witness, and form part of the commissioning or maintenance records."
  },
  {
    id: 9,
    question: "When testing a safety instrumented function (SIF), what additional requirements apply?",
    options: ["No additional requirements", "Testing must follow the SIF test procedure, be performed by competent personnel, achieve the required proof test coverage, and be documented per IEC 61511", "Only the SIF needs to be tested annually", "Safety loops do not require functional testing"],
    correctAnswer: 1,
    explanation: "SIF testing must achieve the required proof test coverage (per the SIL verification), follow approved procedures, be performed by competent personnel, and maintain detailed records as required by IEC 61511."
  },
  {
    id: 10,
    question: "What is 'proof test coverage' for a safety instrumented function?",
    options: ["The number of tests performed per year", "The fraction of dangerous undetected failures that the proof test is capable of detecting", "The cost of testing", "The distance between test points"],
    correctAnswer: 1,
    explanation: "Proof test coverage quantifies the effectiveness of the test in detecting dangerous undetected failures. Higher coverage means more dangerous failures can be found. The required coverage is specified during SIL verification."
  },
  {
    id: 11,
    question: "Why should interlocks be managed before starting loop testing?",
    options: ["Interlocks are not relevant to loop testing", "Safety interlocks may trip if test signals reach alarm levels, causing unintended plant shutdowns or equipment damage", "Interlocks automatically disable during testing", "Only electrical interlocks need managing"],
    correctAnswer: 1,
    explanation: "Driving test signals to alarm setpoints may trigger safety interlocks, causing plant trips or equipment shutdowns. Interlocks must be formally bypassed (with approval) or managed as part of the test procedure."
  },
  {
    id: 12,
    question: "What is the purpose of checking the historian/trend recording during loop testing?",
    options: ["To create interesting graphs", "To verify the process variable is being correctly recorded for trend analysis, regulatory compliance, and process optimisation", "It is not important", "Only to test the historian software"],
    correctAnswer: 1,
    explanation: "Historian recording verification ensures the process variable appears correctly with accurate scaling, units, and timestamp. This data is used for process optimisation, regulatory reporting, and fault investigation."
  }
];

const faqs = [
  {
    question: "How long does a typical loop functional test take?",
    answer: "A simple single-loop test (transmitter, controller, valve) typically takes 30-60 minutes including documentation. Complex loops with multiple instruments, interlocks, and alarm functions may take several hours. Allow additional time for any adjustments or fault-finding required during testing."
  },
  {
    question: "Can I perform loop testing while the process is running?",
    answer: "Some loop tests can be performed on-line by using the controller's manual mode and making small test changes. However, this requires careful coordination with operations and risk assessment. Full loop tests involving signal simulation or disconnection typically require the loop to be taken out of service with appropriate isolation and bypass arrangements."
  },
  {
    question: "What if the loop test reveals a problem?",
    answer: "Document the fault, investigate the root cause, implement the correction (repair, re-wire, recalibrate, etc.), and re-test the loop. Do not sign off the loop check sheet until the loop passes all tests. Record all deficiencies and corrective actions on the loop check sheet or a separate punch list."
  },
  {
    question: "Who should witness loop functional tests?",
    answer: "During commissioning, tests are typically witnessed by the commissioning engineer, operations representative, and/or quality assurance. During maintenance, the maintenance supervisor or a second competent technician may witness. Safety instrumented function tests may require an independent witness as specified in the safety management system."
  },
  {
    question: "What is the difference between a loop test and a point-to-point wiring check?",
    answer: "A point-to-point wiring check verifies only that the correct wires are connected to the correct terminals (continuity and polarity). A loop functional test goes further by verifying end-to-end signal flow, correct scaling, alarm operation, fail-safe action, and system response. The wiring check is typically done first, followed by the functional test."
  }
];

const MOETModule5Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <RotateCcw className="h-4 w-4" />
            <span>Module 5.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Testing of Loops
          </h1>
          <p className="text-white/80">
            End-to-end verification from sensor through controller to final element
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Scope:</strong> Sensor to transmitter to controller to final element</li>
              <li className="pl-1"><strong>Controller mode:</strong> Manual during testing to prevent auto-response</li>
              <li className="pl-1"><strong>Dry test:</strong> Simulated signals without process fluid</li>
              <li className="pl-1"><strong>Wet test:</strong> Actual process fluid to verify sensing and connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Loop direction:</strong> Verify controller responds correctly to PV changes</li>
              <li className="pl-1"><strong>Alarms:</strong> Test activation at correct setpoints with audible annunciation</li>
              <li className="pl-1"><strong>SIF testing:</strong> IEC 61511 proof test coverage requirements</li>
              <li className="pl-1"><strong>Documentation:</strong> Signed loop check sheets for every test</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the purpose and scope of loop functional testing",
              "Plan and execute end-to-end loop tests from sensor to final element",
              "Verify loop direction, alarm operation, and fail-safe action",
              "Differentiate between dry tests and wet tests",
              "Complete loop check sheets with appropriate documentation",
              "Explain additional requirements for testing safety instrumented functions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Loop Test Planning and Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before starting any loop test, thorough preparation is essential. Review the <strong>loop
              drawing</strong> (showing all instruments, wiring, junction boxes, and terminations),
              <strong> instrument data sheets</strong> (specifying ranges, types, calibration data),
              <strong> cause and effect diagrams</strong> (defining the expected system response), and the
              <strong> controller configuration</strong> (scaling, alarm setpoints, control action).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Prerequisites</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Instruments:</strong> Installed and individually calibrated</li>
                <li className="pl-1"><strong>Wiring:</strong> Complete and continuity-tested (point-to-point check passed)</li>
                <li className="pl-1"><strong>Power supplies:</strong> Available and correct voltage/polarity</li>
                <li className="pl-1"><strong>Instrument air:</strong> Available for pneumatic actuators (clean, dry, correct pressure)</li>
                <li className="pl-1"><strong>Controller:</strong> Configured with correct scaling, alarm limits, and control action</li>
                <li className="pl-1"><strong>Operations:</strong> Control room operator informed of test activities</li>
                <li className="pl-1"><strong>Test equipment:</strong> Process calibrator, multimeter, HART communicator prepared</li>
              </ul>
            </div>

            <p>
              Place the controller in <strong>manual mode</strong> before beginning. This prevents automatic
              control action from causing unintended process changes during testing. Communicate with operations
              to ensure they are aware the loop is under test and will not respond normally to process changes.
              If the loop has safety interlocks, ensure these are managed appropriately (bypassed with formal
              approval if necessary, or tested as part of the procedure).
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never start a loop test without reviewing the documentation first.
              Understanding the loop's intended function, expected signals, and alarm responses prevents
              unexpected events and makes fault-finding much easier if problems are discovered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Executing the Loop Test
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The test proceeds systematically from the <strong>sensor end</strong> to the <strong>final
              element</strong>. Step 1: Simulate or apply a known input at the sensor location (e.g. inject
              a 4-20 mA signal using a calibrator). Step 2: Verify the correct reading appears on the
              controller display with correct engineering units. Step 3: Check that the process variable
              appears correctly on any remote displays, recorders, and historian trends.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Test Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Simulate transmitter signal at field end (4 mA, 12 mA, 20 mA)</li>
                <li className="pl-1"><strong>Step 2:</strong> Verify controller display reads correct value in correct engineering units</li>
                <li className="pl-1"><strong>Step 3:</strong> Check remote displays, recorders, and historian trending</li>
                <li className="pl-1"><strong>Step 4:</strong> Test alarm activation at H, L, HH, LL setpoints</li>
                <li className="pl-1"><strong>Step 5:</strong> Drive controller output 0-100% and verify final element response</li>
                <li className="pl-1"><strong>Step 6:</strong> Verify loop direction (PV increase causes correct output response)</li>
                <li className="pl-1"><strong>Step 7:</strong> Test fail-safe action (remove signal/power, confirm safe position)</li>
              </ul>
            </div>

            <p>
              Step 4: Simulate alarm conditions by driving the signal to high, low, high-high, and low-low
              alarm setpoints. Verify each alarm activates at the correct value, displays on the operator
              station with correct priority and message, generates an audible annunciation, and can be
              acknowledged and cleared correctly. Step 5: From the controller, drive the output from 0% to
              100% and verify the final element (valve, damper, VSD) responds correctly across the full range.
            </p>

            <p>
              Step 6: Verify <strong>loop direction</strong> -- when the process variable increases, the
              controller output should move in the correct direction to counteract the change (increase or
              decrease depending on the control action and valve action). Step 7: Test fail-safe action by
              removing the signal or power supply and confirming the final element goes to its designated
              safe position. Record all results on the loop check sheet.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When testing alarms, approach the setpoint slowly from below (for
              high alarms) or above (for low alarms). This verifies the exact activation point and avoids
              overshooting the alarm level, which could trigger safety interlocks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dry Tests and Wet Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>dry test</strong> uses simulated signals (injected by calibrators) without any process
              fluid in the system. This verifies the instrumentation, wiring, controller configuration, and
              display/alarm functions. Dry testing can be performed before process fluids are introduced and
              is the standard method for initial loop checking during construction and commissioning.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Dry Test Verifies</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Wiring integrity and polarity</li>
                  <li className="pl-1">Controller input card operation</li>
                  <li className="pl-1">Scaling, display, and engineering units</li>
                  <li className="pl-1">Alarm activation and annunciation</li>
                  <li className="pl-1">Final element response to controller output</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wet Test Verifies</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Sensing element correct response</li>
                  <li className="pl-1">Process connections and impulse lines</li>
                  <li className="pl-1">No leaks at fittings and manifolds</li>
                  <li className="pl-1">Correct response to actual process conditions</li>
                  <li className="pl-1">Installation effects (head pressure, orientation)</li>
                </ul>
              </div>
            </div>

            <p>
              A <strong>wet test</strong> introduces actual process fluid (or a suitable substitute such as
              water or air) into the system to verify the complete measurement chain including the sensing
              element, process connections, impulse lines, and any in-line components. Wet testing confirms
              that the sensor responds correctly to actual process conditions and that there are no leaks,
              blockages, or installation errors that would not be detected by dry testing alone.
            </p>

            <p>
              For a complete commissioning, both dry and wet tests are typically required. The dry test
              verifies the instrumentation and control system, while the wet test confirms the process
              interface. During routine maintenance, a dry test using signal simulation is usually sufficient
              unless the sensor or process connections have been disturbed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A successful dry test does not guarantee the loop will work correctly
              with actual process fluid. A blocked impulse line, a sensor installed upside down, or a leak
              at a process connection will only be revealed by wet testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Instrumented Function Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing <strong>safety instrumented functions (SIFs)</strong> carries additional requirements
              beyond standard loop testing. SIF testing must comply with <strong>IEC 61511</strong> (the
              process sector standard for functional safety) and the specific safety requirements specification
              (SRS) for each safety function. The test procedure must be designed to achieve the required
              <strong> proof test coverage</strong> -- the fraction of dangerous undetected failures that the
              test can reveal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">SIF Testing Requirements (IEC 61511)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Approved procedure:</strong> SIF test procedures must be formally approved and version-controlled</li>
                <li className="pl-1"><strong>Proof test coverage:</strong> The test must achieve the coverage assumed in the SIL calculation</li>
                <li className="pl-1"><strong>Competent personnel:</strong> Testers must be trained and authorised for SIF testing</li>
                <li className="pl-1"><strong>Independent witness:</strong> May be required by the safety management system</li>
                <li className="pl-1"><strong>Bypass management:</strong> Formal bypass procedures for any safety functions disabled during testing</li>
                <li className="pl-1"><strong>Complete documentation:</strong> Detailed records maintained for the lifetime of the SIF</li>
              </ul>
            </div>

            <p>
              A SIF proof test typically includes: end-to-end signal injection to verify sensor and logic
              solver response, verification of the final element (valve) trip action and timing, confirmation
              of correct fail-safe position, testing of all voting arrangements (e.g. 2oo3), and
              verification of diagnostic functions. The test frequency is determined by the SIL verification
              calculation and specified in the safety requirements specification.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Maintenance technicians working on safety instrumented systems must
              understand the importance of proof testing, follow approved procedures exactly, and never modify
              or bypass safety functions without formal authorisation through the management of change process.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Loop Check Sheet Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>loop check sheet</strong> is the formal record of the loop functional test. It
              provides documented evidence that the loop has been tested and is operating correctly. The
              sheet should be a controlled form within the project or site quality management system, with
              specific fields for all test criteria.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loop Check Sheet Content</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Loop identification:</strong> Tag number, description, P&ID reference, loop drawing number</li>
                <li className="pl-1"><strong>Instrument details:</strong> Manufacturer, model, serial number, range for each instrument in the loop</li>
                <li className="pl-1"><strong>Signal verification:</strong> Simulated input, expected output, actual output at each test point</li>
                <li className="pl-1"><strong>Alarm verification:</strong> Setpoint, actual activation point, operator station display, annunciation</li>
                <li className="pl-1"><strong>Final element:</strong> Stroke test results, fail-safe action, response time if applicable</li>
                <li className="pl-1"><strong>Deficiencies:</strong> Any problems found, corrective actions taken, re-test results</li>
                <li className="pl-1"><strong>Sign-off:</strong> Tester signature, witness signature, date</li>
              </ul>
            </div>

            <p>
              All deficiencies discovered during testing must be recorded, including the corrective action
              taken. Do not sign off the loop check sheet until all deficiencies have been resolved and the
              loop passes all tests. Outstanding items that cannot be resolved immediately should be recorded
              on a <strong>punch list</strong> with a clear description, priority, and responsibility for closure.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Loop check sheets are quality records that may be reviewed during audits,
              commissioning handover, and regulatory inspections. They demonstrate that the installation has
              been systematically tested and verified. Incomplete or missing loop check sheets can delay
              handover and raise questions about the integrity of the installation.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Loop Test Scope</p>
                <ul className="space-y-0.5">
                  <li>Sensor to transmitter to controller to final element</li>
                  <li>Controller in manual mode during test</li>
                  <li>Dry test -- simulated signals, no process fluid</li>
                  <li>Wet test -- actual fluid to verify sensing</li>
                  <li>Bump test -- small step change to check response</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Verifications</p>
                <ul className="space-y-0.5">
                  <li>Loop direction -- correct controller response</li>
                  <li>Alarm activation at correct setpoints</li>
                  <li>Fail-safe action on signal/power loss</li>
                  <li>SIF testing per IEC 61511 proof test coverage</li>
                  <li>Signed loop check sheet for every test</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-5">
              Next: Documenting Calibration Results
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section5_4;
