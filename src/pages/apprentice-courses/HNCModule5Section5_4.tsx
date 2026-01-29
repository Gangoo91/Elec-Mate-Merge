import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BMS Commissioning - HNC Module 5 Section 5.4";
const DESCRIPTION = "Master BMS commissioning procedures for building services: point-to-point verification, functional performance testing, graphics testing, alarm testing, trend logging, and system integration checks.";

const quickCheckQuestions = [
  {
    id: "point-to-point-def",
    question: "What is the primary purpose of point-to-point verification in BMS commissioning?",
    options: ["To test network connectivity", "To verify each field device connects to the correct controller address", "To calibrate all sensors", "To test the graphics interface"],
    correctIndex: 1,
    explanation: "Point-to-point verification confirms that each field device (sensor, actuator, switch) is correctly wired to its designated controller input/output address as per the points schedule."
  },
  {
    id: "actuator-stroke",
    question: "What does actuator stroke testing verify?",
    options: ["The speed of actuator movement only", "Full travel from 0-100% and correct direction of operation", "Only the electrical connections", "The firmware version of the actuator"],
    correctIndex: 1,
    explanation: "Actuator stroke testing verifies full travel range (0-100%), correct direction (opening/closing), smooth operation without sticking, and accurate position feedback to the BMS."
  },
  {
    id: "graphics-testing",
    question: "During graphics testing, what must be verified for each displayed value?",
    options: ["Only that it appears on screen", "Correct value, units, and real-time update from field devices", "The colour scheme only", "Only the font size"],
    correctIndex: 1,
    explanation: "Graphics testing must verify that each displayed value shows the correct live data, appropriate engineering units, updates in real-time, and matches the actual field device reading."
  },
  {
    id: "trend-logging",
    question: "What is the typical minimum data retention period for BMS trend logs in commercial buildings?",
    options: ["1 week", "1 month", "3-12 months", "5 years"],
    correctIndex: 2,
    explanation: "Commercial buildings typically require 3-12 months of trend data retention for energy analysis, fault diagnosis, and compliance verification. Critical systems may require longer retention."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document is essential for conducting point-to-point verification?",
    options: [
      "The building floor plans",
      "The points schedule with controller addresses",
      "The electrical schematic only",
      "The architectural drawings"
    ],
    correctAnswer: 1,
    explanation: "The points schedule lists every field device, its controller address, signal type, and engineering range. This is essential for verifying correct wiring and addressing."
  },
  {
    id: 2,
    question: "When testing a temperature sensor during commissioning, what should be verified?",
    options: ["Only that it displays a value", "Reading accuracy, response time, and correct scaling", "Only the wiring connections", "Only the physical mounting"],
    correctAnswer: 1,
    explanation: "Temperature sensor verification includes checking reading accuracy against a reference, verifying correct scaling (e.g., 4-20mA to 0-50°C), response time to changes, and appropriate filtering."
  },
  {
    id: 3,
    question: "A control valve actuator should close when receiving what signal in a fail-safe heating application?",
    options: ["Maximum signal (100%)", "No signal (0%)", "50% signal", "Pulsed signal"],
    correctAnswer: 1,
    explanation: "In fail-safe heating applications, control valves should close on loss of signal (0%) to prevent overheating. This is tested by removing the control signal and verifying the valve closes."
  },
  {
    id: 4,
    question: "During functional performance testing of an AHU, what sequence should be tested first?",
    options: [
      "Cooling sequence",
      "Safety interlocks and fan proving",
      "Humidity control",
      "Scheduling"
    ],
    correctAnswer: 1,
    explanation: "Safety interlocks must be tested first to ensure protective functions work correctly. This includes fire damper proving, filter differential pressure trips, and fan status proving."
  },
  {
    id: 5,
    question: "What is the purpose of alarm testing in BMS commissioning?",
    options: [
      "To annoy the building occupants",
      "To verify alarms activate at correct setpoints and route to appropriate recipients",
      "To test the speakers only",
      "To check the network bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Alarm testing verifies that each alarm activates at the correct setpoint, displays the correct priority and message, routes to appropriate recipients, and can be acknowledged and reset."
  },
  {
    id: 6,
    question: "When integrating a BMS with a fire alarm system, what protocol is commonly used in the UK?",
    options: ["BACnet only", "Modbus only", "Volt-free contacts or BACnet/Modbus", "WiFi"],
    correctAnswer: 2,
    explanation: "Fire alarm integration typically uses volt-free contacts for critical signals (fire mode, damper control) with BACnet or Modbus for monitoring. This ensures fail-safe operation."
  },
  {
    id: 7,
    question: "What should be verified during BMS network commissioning?",
    options: [
      "Only the IP addresses",
      "Network topology, addressing, communication speeds, and redundancy failover",
      "Only the cable colours",
      "Only the patch panel layout"
    ],
    correctAnswer: 1,
    explanation: "Network commissioning verifies correct topology, unique addressing, appropriate communication speeds, segment loading, and redundancy failover where specified."
  },
  {
    id: 8,
    question: "A trend log shows a temperature oscillating rapidly between 18°C and 22°C. This likely indicates:",
    options: [
      "Normal operation",
      "A tuning problem with the PID controller",
      "A faulty trend log",
      "Correct setpoint operation"
    ],
    correctAnswer: 1,
    explanation: "Rapid oscillation around setpoint indicates poor PID tuning - typically too much proportional or integral gain. The controller needs retuning for stable operation."
  },
  {
    id: 9,
    question: "What documentation must be provided at BMS handover?",
    options: [
      "Only the user manual",
      "As-built drawings, points schedule, O&M manuals, and training records",
      "Only the training certificates",
      "Only the warranty information"
    ],
    correctAnswer: 1,
    explanation: "BMS handover requires comprehensive documentation: as-built drawings, points schedule, control strategies, O&M manuals, software backups, training records, and commissioning certificates."
  },
  {
    id: 10,
    question: "During system integration testing, what must be verified between the BMS and lighting control system?",
    options: [
      "Only that lights can be switched",
      "Bi-directional communication, status feedback, and coordinated sequences",
      "Only the dimming levels",
      "Only the switch positions"
    ],
    correctAnswer: 1,
    explanation: "Integration testing verifies bi-directional communication (commands and feedback), correct status reporting, coordinated sequences (e.g., occupancy-based control), and failure mode behaviour."
  }
];

const faqs = [
  {
    question: "What is the difference between static and dynamic commissioning?",
    answer: "Static commissioning verifies individual components in isolation - checking wiring, addressing, and basic function of each device. Dynamic commissioning tests the system under actual operating conditions with varying loads, weather, and occupancy. Both are essential: static commissioning finds installation errors, while dynamic commissioning verifies control performance and system interactions."
  },
  {
    question: "How long should BMS commissioning take for a typical office building?",
    answer: "As a guideline, allow 1-2 days per AHU for full functional testing, plus time for each subsystem (lighting, metering, plant). A 10,000m² office might require 3-4 weeks of dedicated commissioning. Seasonal commissioning (testing heating and cooling modes) requires revisits. Rushing commissioning leads to ongoing operational issues."
  },
  {
    question: "What should I do if a control sequence doesn't work as specified?",
    answer: "First, verify the points are reading correctly (sensor values, actuator feedback). Check the controller programming matches the control strategy document. Review any interlock conditions that might be blocking operation. If hardware is correct, the issue is likely software logic or tuning. Document any deviations and get design engineer approval for changes."
  },
  {
    question: "How do I test BMS integration with third-party systems?",
    answer: "Obtain protocol documentation and points lists from both systems. Verify physical connections (network/serial). Test basic communication first - can systems see each other? Then test individual points for correct mapping and scaling. Finally, test coordinated sequences and failure modes. Document all integration points and their behaviour."
  }
];

const HNCModule5Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BMS Commissioning
          </h1>
          <p className="text-white/80">
            Point-to-point verification, functional performance testing, graphics testing, and system integration checks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Point-to-point:</strong> Verify every field device to controller address</li>
              <li className="pl-1"><strong>Functional testing:</strong> Validate control sequences under load</li>
              <li className="pl-1"><strong>Graphics testing:</strong> Confirm accurate real-time display</li>
              <li className="pl-1"><strong>Integration:</strong> Test all third-party system interfaces</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC systems:</strong> AHU, FCU, chiller, boiler sequences</li>
              <li className="pl-1"><strong>Lighting control:</strong> DALI, KNX integration</li>
              <li className="pl-1"><strong>Metering:</strong> Energy, water, gas sub-metering</li>
              <li className="pl-1"><strong>Fire/security:</strong> Interface and interlock testing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Execute systematic point-to-point verification procedures",
              "Calibrate sensors and verify actuator stroke operation",
              "Conduct functional performance testing of control sequences",
              "Test graphics displays for accuracy and real-time updates",
              "Verify alarm configuration and notification routing",
              "Commission trend logging and data archival systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Point-to-Point Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Point-to-Point Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Point-to-point verification is the foundation of BMS commissioning. This systematic process confirms
              that every field device is correctly wired to its designated controller input or output, with accurate
              signal conditioning and engineering unit scaling.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Point-to-Point Testing Procedure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Obtain the points schedule with controller addresses</li>
                <li className="pl-1"><strong>Step 2:</strong> Verify physical connection at field device and controller</li>
                <li className="pl-1"><strong>Step 3:</strong> Apply known input and verify controller reading</li>
                <li className="pl-1"><strong>Step 4:</strong> Check engineering unit scaling and range</li>
                <li className="pl-1"><strong>Step 5:</strong> Document results and any discrepancies</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Input Types and Verification Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptance Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-20mA analogue</td>
                      <td className="border border-white/10 px-3 py-2">Inject 4mA, 12mA, 20mA with calibrator</td>
                      <td className="border border-white/10 px-3 py-2">Reading within ±2% of full scale</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-10V analogue</td>
                      <td className="border border-white/10 px-3 py-2">Apply 0V, 5V, 10V reference</td>
                      <td className="border border-white/10 px-3 py-2">Reading within ±2% of full scale</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PT100/PT1000 RTD</td>
                      <td className="border border-white/10 px-3 py-2">Use decade box or reference probe</td>
                      <td className="border border-white/10 px-3 py-2">Reading within ±0.5°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Digital input</td>
                      <td className="border border-white/10 px-3 py-2">Force open/closed states</td>
                      <td className="border border-white/10 px-3 py-2">Correct state indication</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pulse counter</td>
                      <td className="border border-white/10 px-3 py-2">Generate known pulse count</td>
                      <td className="border border-white/10 px-3 py-2">Count matches, units correct</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Calibration Checks</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Temperature Sensors</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Compare against calibrated reference thermometer</li>
                    <li className="pl-1">Check at ambient and elevated temperature</li>
                    <li className="pl-1">Verify response time (typically &lt;60 seconds)</li>
                    <li className="pl-1">Confirm correct 2/3/4-wire configuration</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Pressure Sensors</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Check zero offset with isolation valve closed</li>
                    <li className="pl-1">Verify span against calibrated gauge</li>
                    <li className="pl-1">Confirm correct pressure type (gauge/differential)</li>
                    <li className="pl-1">Test at 25%, 50%, 75% of range</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality tip:</strong> Record all point-to-point results on signed test sheets. This documentation is essential for handover and future fault diagnosis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Actuator Stroke Testing and Functional Performance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Actuator Testing and Control Sequence Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Actuator stroke testing confirms that control valves and dampers operate correctly across their full
              range. Functional performance testing then verifies complete control sequences under realistic operating
              conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Stroke Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Full stroke:</strong> Command 0% to 100% and back, verify full travel</li>
                <li className="pl-1"><strong>Direction:</strong> Confirm opening/closing matches design intent</li>
                <li className="pl-1"><strong>Position feedback:</strong> Verify feedback signal matches command</li>
                <li className="pl-1"><strong>Fail position:</strong> Remove signal, confirm correct fail-safe state</li>
                <li className="pl-1"><strong>Smooth operation:</strong> Check for sticking, hunting, or noise</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Actuator Types and Fail Modes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Actuator</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fail-Safe Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW heating valve</td>
                      <td className="border border-white/10 px-3 py-2">Spring return, 0-10V</td>
                      <td className="border border-white/10 px-3 py-2">Closed (prevent overheating)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW cooling valve</td>
                      <td className="border border-white/10 px-3 py-2">Spring return, 0-10V</td>
                      <td className="border border-white/10 px-3 py-2">Closed (prevent undercooling)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fresh air damper</td>
                      <td className="border border-white/10 px-3 py-2">Spring return modulating</td>
                      <td className="border border-white/10 px-3 py-2">Closed (weather protection)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire/smoke damper</td>
                      <td className="border border-white/10 px-3 py-2">Spring return on/off</td>
                      <td className="border border-white/10 px-3 py-2">Closed (fire compartment)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bypass damper</td>
                      <td className="border border-white/10 px-3 py-2">Electric modulating</td>
                      <td className="border border-white/10 px-3 py-2">Application dependent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Performance Test - AHU Example</p>
              <p className="text-sm text-white mb-3">For an air handling unit, test the following sequences in order:</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Safety interlocks:</strong> Fire alarm input, smoke detection, filter DP trip</li>
                <li className="pl-1"><strong>Start/stop sequence:</strong> Damper opening, fan start delay, proving</li>
                <li className="pl-1"><strong>Heating sequence:</strong> Frost protection, pre-heat control, modulation</li>
                <li className="pl-1"><strong>Cooling sequence:</strong> Free cooling, mechanical cooling staging</li>
                <li className="pl-1"><strong>Economy cycle:</strong> Mixed air temperature control, damper modulation</li>
                <li className="pl-1"><strong>Humidity control:</strong> Humidification/dehumidification sequences</li>
                <li className="pl-1"><strong>Setback/unoccupied:</strong> Night setback, weekend operation</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Testing tip:</strong> Use temporary setpoint overrides to force control sequences. Reset to design values after testing and document all changes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Graphics Testing and Alarm Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Graphics Testing and Alarm Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The BMS graphical interface is the operator's primary interaction with building systems. Graphics testing
              ensures accurate display of system status, while alarm testing verifies that abnormal conditions are
              detected and communicated appropriately.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Graphics Test Checklist</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">All points display correct live values</li>
                  <li className="pl-1">Engineering units shown correctly (°C, Pa, l/s)</li>
                  <li className="pl-1">Decimal places appropriate for resolution</li>
                  <li className="pl-1">Update rate acceptable (&lt;5 seconds typical)</li>
                  <li className="pl-1">Equipment status symbols change correctly</li>
                  <li className="pl-1">Colour coding follows site standard</li>
                  <li className="pl-1">Navigation between screens logical</li>
                  <li className="pl-1">All hyperlinks and buttons functional</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operator Controls Testing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Setpoint adjustment within limits works</li>
                  <li className="pl-1">Manual override commands execute</li>
                  <li className="pl-1">Schedule editing saves correctly</li>
                  <li className="pl-1">User access levels correctly restrict functions</li>
                  <li className="pl-1">Trend graph displays historical data</li>
                  <li className="pl-1">Report generation functions work</li>
                  <li className="pl-1">System backup can be created</li>
                  <li className="pl-1">Logout/timeout works correctly</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alarm Testing Methodology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Alarm Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High/low limit</td>
                      <td className="border border-white/10 px-3 py-2">Adjust setpoint or simulate value</td>
                      <td className="border border-white/10 px-3 py-2">Alarm at correct threshold</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment fault</td>
                      <td className="border border-white/10 px-3 py-2">Simulate run command/status mismatch</td>
                      <td className="border border-white/10 px-3 py-2">Fault detected within delay time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communication loss</td>
                      <td className="border border-white/10 px-3 py-2">Disconnect controller network cable</td>
                      <td className="border border-white/10 px-3 py-2">Offline alarm generated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire mode</td>
                      <td className="border border-white/10 px-3 py-2">Trigger fire alarm interface</td>
                      <td className="border border-white/10 px-3 py-2">Correct system response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security breach</td>
                      <td className="border border-white/10 px-3 py-2">Open monitored door/panel</td>
                      <td className="border border-white/10 px-3 py-2">Alarm with correct location</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Alarm Routing and Escalation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Priority 1 (Critical):</strong> Immediate notification - SMS, auto-dialler, on-screen flash</li>
                <li className="pl-1"><strong>Priority 2 (Urgent):</strong> Within 15 minutes - Email, workstation alert</li>
                <li className="pl-1"><strong>Priority 3 (Non-urgent):</strong> Logged for review - Alarm summary, daily report</li>
                <li className="pl-1"><strong>Test each notification path:</strong> Confirm SMS delivery, email receipt, escalation timing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Involve the building operator in graphics testing. Their feedback on usability is invaluable for optimising the interface.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Trend Logging and System Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Trend Logging and System Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trend logging captures historical data essential for energy analysis, fault diagnosis, and performance
              verification. System integration testing ensures the BMS communicates correctly with all connected
              building systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Trend Logging Configuration</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Point Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy meters</td>
                      <td className="border border-white/10 px-3 py-2">15-30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">2-5 years (billing data)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone temperatures</td>
                      <td className="border border-white/10 px-3 py-2">5-15 minutes</td>
                      <td className="border border-white/10 px-3 py-2">3-12 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant status</td>
                      <td className="border border-white/10 px-3 py-2">Change of value</td>
                      <td className="border border-white/10 px-3 py-2">3-12 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control outputs</td>
                      <td className="border border-white/10 px-3 py-2">1-5 minutes (tuning)</td>
                      <td className="border border-white/10 px-3 py-2">1-3 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External conditions</td>
                      <td className="border border-white/10 px-3 py-2">15-30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">12 months+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Trend Logging Verification Tests</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Data capture:</strong> Verify values are being logged at specified intervals</li>
                <li className="pl-1"><strong>Timestamp accuracy:</strong> Confirm time synchronisation across all controllers</li>
                <li className="pl-1"><strong>Storage capacity:</strong> Calculate required storage, verify archival process</li>
                <li className="pl-1"><strong>Data export:</strong> Test CSV/Excel export for external analysis</li>
                <li className="pl-1"><strong>Graph display:</strong> Verify historical trends display correctly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Integration Testing</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Fire Alarm Integration</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Fire mode signal stops AHUs</li>
                    <li className="pl-1">Smoke dampers close on zone alarm</li>
                    <li className="pl-1">Stairwell pressurisation activates</li>
                    <li className="pl-1">Lift recall to ground floor</li>
                    <li className="pl-1">Status displayed on BMS graphics</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Lighting Control Integration</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Occupancy status from DALI/KNX</li>
                    <li className="pl-1">Scene selection commands</li>
                    <li className="pl-1">Daylight dimming feedback</li>
                    <li className="pl-1">Emergency lighting status</li>
                    <li className="pl-1">After-hours override requests</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Integration Protocols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Commissioning Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet IP/MSTP</td>
                      <td className="border border-white/10 px-3 py-2">Primary BMS network</td>
                      <td className="border border-white/10 px-3 py-2">Device discovery, point mapping</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus TCP/RTU</td>
                      <td className="border border-white/10 px-3 py-2">Meters, VFDs, chillers</td>
                      <td className="border border-white/10 px-3 py-2">Register addresses, scaling factors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI</td>
                      <td className="border border-white/10 px-3 py-2">Lighting control</td>
                      <td className="border border-white/10 px-3 py-2">Group addressing, scene recall</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KNX</td>
                      <td className="border border-white/10 px-3 py-2">Lighting, blinds, HVAC terminals</td>
                      <td className="border border-white/10 px-3 py-2">Group addresses, telegram routing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">M-Bus</td>
                      <td className="border border-white/10 px-3 py-2">Heat/water/gas meters</td>
                      <td className="border border-white/10 px-3 py-2">Primary address, data format</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Integration tip:</strong> Always test failure modes. What happens if communication is lost? Verify systems fail to a safe state and generate appropriate alarms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Point-to-Point Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify a duct temperature sensor wired to controller input AI-03, scaled 0-50°C on 4-20mA.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Identify sensor location and verify wiring to AI-03 terminals</p>
                <p>2. Connect 4-20mA calibrator in series with sensor</p>
                <p>3. Inject 4mA → Controller should read 0°C (±1°C)</p>
                <p>4. Inject 12mA → Controller should read 25°C (±1°C)</p>
                <p>5. Inject 20mA → Controller should read 50°C (±1°C)</p>
                <p className="mt-2 text-green-400">Result: All readings within tolerance - PASS</p>
                <p className="text-white/60">Document on test sheet with date, tester, and readings</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Actuator Stroke Test</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Test a heating valve actuator (spring return, fail closed) with 0-10V position feedback.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Command 0% → Valve closes, feedback reads 0V (0%)</p>
                <p>2. Command 50% → Valve opens to mid-position, feedback ~5V</p>
                <p>3. Command 100% → Valve fully open, feedback reads 10V (100%)</p>
                <p>4. Remove control signal → Valve returns to closed (spring return)</p>
                <p className="mt-2">Observations:</p>
                <p>- Full stroke time: 45 seconds (within specification)</p>
                <p>- No sticking or noise during travel</p>
                <p>- Feedback tracks within ±5% of command</p>
                <p className="mt-2 text-green-400">Result: Actuator operation correct - PASS</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Alarm Test Procedure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Test high temperature alarm for server room (setpoint 25°C, alarm at 28°C).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Current room temperature: 22°C (normal operation)</p>
                <p>2. Lower alarm setpoint temporarily to 21°C</p>
                <p>3. Verify alarm generates within 30 seconds:</p>
                <p>   - On-screen: Red flashing indicator, audible alert</p>
                <p>   - Email notification: Received by FM team</p>
                <p>   - SMS: Received by on-call engineer</p>
                <p>4. Acknowledge alarm → Flashing stops, remains red</p>
                <p>5. Reset alarm setpoint to 28°C → Alarm clears</p>
                <p className="mt-2 text-green-400">Result: Alarm routing correct - PASS</p>
                <p className="text-white/60">Note: Reset all setpoints to design values</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Preparation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain latest points schedule and control strategy documents</li>
                <li className="pl-1">Verify all controllers powered and communicating</li>
                <li className="pl-1">Confirm plant is safe to operate (mechanical completion)</li>
                <li className="pl-1">Coordinate with other trades for access and isolation</li>
                <li className="pl-1">Prepare test equipment: calibrator, multimeter, laptop</li>
                <li className="pl-1">Have blank test sheets ready for documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Analogue input accuracy: <strong>±2% of full scale</strong></li>
                <li className="pl-1">Temperature sensor tolerance: <strong>±0.5°C</strong></li>
                <li className="pl-1">Actuator position feedback: <strong>±5% of command</strong></li>
                <li className="pl-1">Graphics update rate: <strong>&lt;5 seconds</strong></li>
                <li className="pl-1">Trend log retention: <strong>3-12 months minimum</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Commissioning Faults</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Swapped wiring:</strong> Sensors connected to wrong controller addresses</li>
                <li className="pl-1"><strong>Incorrect scaling:</strong> 4-20mA range configured as 0-20mA</li>
                <li className="pl-1"><strong>Reversed actuators:</strong> Valve opens when it should close</li>
                <li className="pl-1"><strong>Missing interlocks:</strong> Safety functions not programmed</li>
                <li className="pl-1"><strong>Network conflicts:</strong> Duplicate IP addresses or device IDs</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Testing Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Point-to-point verification (static)</li>
                  <li>2. Sensor calibration checks</li>
                  <li>3. Actuator stroke testing</li>
                  <li>4. Safety interlock testing</li>
                  <li>5. Control sequence verification</li>
                  <li>6. Graphics and alarm testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation Required</p>
                <ul className="space-y-0.5">
                  <li>Signed point-to-point test sheets</li>
                  <li>Functional performance test records</li>
                  <li>Alarm test certificates</li>
                  <li>Integration test results</li>
                  <li>As-built points schedule</li>
                  <li>Software backup and version record</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5-5">
              Next: Handover Documentation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_4;
