import { ArrowLeft, TestTube, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Instruments for Control Systems - MOET Module 5 Section 5.2";
const DESCRIPTION = "Selection and use of test instruments for commissioning, troubleshooting and maintaining industrial control and automation systems including process calibrators, HART communicators, oscilloscopes, data loggers and network analysers.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What is a multifunction process calibrator?",
    options: [
      "A device that only measures voltage",
      "A portable instrument that can source, simulate, and measure process signals including mA, V, resistance, thermocouple, and frequency",
      "A fixed laboratory instrument",
      "A PLC programming tool"
    ],
    correctIndex: 1,
    explanation: "Multifunction calibrators combine multiple signal sourcing and measurement capabilities in a single portable instrument for field calibration and troubleshooting."
  },
  {
    id: "qc2",
    question: "What does a HART communicator allow you to do?",
    options: [
      "Monitor heart rate",
      "Communicate digitally with HART-enabled smart transmitters for configuration, calibration, and diagnostics",
      "Control a PLC program",
      "Measure high voltage"
    ],
    correctIndex: 1,
    explanation: "A HART communicator connects to the 4-20 mA loop and uses the HART digital protocol to access transmitter configuration, calibration functions, and diagnostic data."
  },
  {
    id: "qc3",
    question: "Why is an oscilloscope useful for control system troubleshooting?",
    options: [
      "It measures temperature",
      "It displays time-varying electrical signals, allowing analysis of waveforms, timing, noise, and transient events",
      "It programs PLCs",
      "It measures flow rate"
    ],
    correctIndex: 1,
    explanation: "Oscilloscopes capture and display voltage waveforms over time, essential for analysing signal integrity, timing relationships, noise, and transient events in control circuits."
  },
  {
    id: "qc4",
    question: "What does the CAT III voltage rating indicate?",
    options: [
      "The instrument is suitable for household appliances only",
      "The instrument is rated for distribution-level circuits including fixed wiring, control panels, and switchboards",
      "The instrument can only measure battery circuits",
      "The instrument is waterproof to category 3"
    ],
    correctIndex: 1,
    explanation: "CAT III covers distribution-level circuits: fixed wiring, switchboards, and industrial control panels. Test instruments used in these environments must be rated at least CAT III per IEC 61010-1."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary use of a loop calibrator in the field?",
    options: ["Programming PLCs", "Sourcing and measuring 4-20 mA signals for testing transmitters and control loop components", "Measuring high voltage", "Testing motor windings"],
    correctAnswer: 1,
    explanation: "Loop calibrators source and measure 4-20 mA signals, allowing technicians to test transmitters, verify input cards, check wiring, and simulate process signals."
  },
  {
    id: 2,
    question: "What function does a decade resistance box serve in control system testing?",
    options: ["Measuring loop resistance", "Providing precise, adjustable resistance values to simulate RTD sensors for testing temperature transmitters", "Limiting current flow", "Storing calibration data"],
    correctAnswer: 1,
    explanation: "Decade boxes provide accurately known resistance values, allowing simulation of RTD sensor outputs for testing and calibrating temperature measurement systems."
  },
  {
    id: 3,
    question: "What is a current clamp meter used for in control system work?",
    options: ["Clamping cables in place", "Measuring current flow without breaking the circuit by clamping around a conductor", "Measuring voltage only", "Programming safety relays"],
    correctAnswer: 1,
    explanation: "Current clamp meters measure AC or DC current non-invasively by sensing the magnetic field around a conductor, useful for checking motor currents, actuator loads, and power supply currents."
  },
  {
    id: 4,
    question: "What does an insulation resistance tester (megger) measure?",
    options: ["The resistance of control loop wiring", "The resistance of electrical insulation to detect degradation, moisture ingress, or damage", "Signal voltage levels", "Process variable values"],
    correctAnswer: 1,
    explanation: "Insulation resistance testing applies a high DC voltage (typically 250V, 500V, or 1000V) and measures the resistance of insulation between conductors and earth, detecting degradation before failure."
  },
  {
    id: 5,
    question: "What is a data logger used for in control system testing?",
    options: ["Recording PLC program changes", "Automatically recording measurement data over time for trend analysis and intermittent fault diagnosis", "Logging operator actions", "Measuring pressure"],
    correctAnswer: 1,
    explanation: "Data loggers record multiple channels of measurement data (voltage, current, temperature, etc.) over extended periods, invaluable for capturing intermittent faults and trending process behaviour."
  },
  {
    id: 6,
    question: "What is the advantage of a documenting process calibrator?",
    options: ["It is cheaper than other calibrators", "It automatically records calibration data, calculates errors, and generates calibration certificates electronically", "It only works in laboratories", "It replaces the need for reference standards"],
    correctAnswer: 1,
    explanation: "Documenting calibrators automate the recording process, eliminating transcription errors, calculating errors against tolerance, and generating electronic calibration records that integrate with CMS software."
  },
  {
    id: 7,
    question: "When would you use a network analyser for control system troubleshooting?",
    options: ["To measure process pressure", "To diagnose communication issues on industrial networks (Ethernet, Profibus, Modbus) by analysing traffic, errors, and timing", "To test motor insulation", "To calibrate flow meters"],
    correctAnswer: 1,
    explanation: "Network analysers capture and analyse industrial network traffic, identify communication errors, measure bus timing, detect collisions, and help diagnose intermittent network problems."
  },
  {
    id: 8,
    question: "What safety precaution is essential when using test instruments on live control systems?",
    options: ["No precautions are needed", "Ensure instruments are rated for the voltage category of the circuit, use appropriate PPE, and follow safe isolation procedures", "Only test when the plant is shut down", "Use any available multimeter"],
    correctAnswer: 1,
    explanation: "Test instruments must have appropriate CAT ratings (CAT III or CAT IV for distribution circuits), and technicians must follow safe working practices including isolation procedures, PPE, and risk assessment."
  },
  {
    id: 9,
    question: "What is a milliamp (mA) source used for?",
    options: ["Powering instruments", "Generating a precise 4-20 mA signal to simulate a transmitter output for testing receivers, controllers, and recorders", "Measuring milliampere currents only", "Programming smart transmitters"],
    correctAnswer: 1,
    explanation: "An mA source generates a precise current signal that simulates a transmitter output, allowing the technician to test and verify the receiving end of the loop independently."
  },
  {
    id: 10,
    question: "What is the CAT III voltage rating category?",
    options: ["Household appliances", "Distribution-level circuits including fixed installation wiring, distribution boards, and control panels", "Low-voltage battery circuits", "Outdoor overhead power lines"],
    correctAnswer: 1,
    explanation: "CAT III covers distribution-level circuits: fixed wiring, switchboards, and industrial control panels. Test instruments used in these environments must be rated at least CAT III."
  },
  {
    id: 11,
    question: "Why should test leads be inspected before each use?",
    options: ["To check the lead colour", "Damaged leads can expose the technician to hazardous voltages and compromise measurement accuracy", "It is not necessary for digital instruments", "Only to check the lead length"],
    correctAnswer: 1,
    explanation: "Damaged insulation, cracked probe tips, or degraded connections can create a safety hazard by exposing the user to live voltages. Damaged leads can also introduce measurement errors through poor contact resistance."
  },
  {
    id: 12,
    question: "What is the purpose of a Profibus tester?",
    options: ["Testing instrument air pressure", "Analysing Profibus DP/PA bus quality, signal levels, and communication errors for commissioning and fault diagnosis", "Programming Profibus devices", "Measuring fieldbus cable resistance only"],
    correctAnswer: 1,
    explanation: "Profibus testers (e.g. Softing BC-600-PB) analyse bus signal quality, measure voltage levels, detect communication errors, identify reflections, and diagnose termination problems on Profibus networks."
  }
];

const faqs = [
  {
    question: "What is the minimum set of test equipment for a control system technician?",
    answer: "A well-equipped technician typically carries: a multifunction process calibrator (mA/V/RTD/TC), a digital multimeter (CAT III/IV rated), a HART communicator or equivalent, an insulation resistance tester, a current clamp meter, and basic hand tools. Additional equipment depends on the specific systems maintained (e.g. network analysers for fieldbus systems, oscilloscopes for high-speed signals)."
  },
  {
    question: "How often should test instruments be calibrated?",
    answer: "Test instruments should be calibrated at intervals determined by the manufacturer's recommendation, the instrument's stability, and the criticality of the measurements it supports. Typically, multifunction calibrators and reference standards are calibrated annually by a UKAS-accredited laboratory. Frequently used instruments may need shorter intervals."
  },
  {
    question: "Can I use a standard multimeter for 4-20 mA loop testing?",
    answer: "A standard multimeter can measure the loop current, but it cannot source a current signal. For full loop testing (sourcing and measuring), a dedicated loop calibrator or multifunction calibrator is needed. When measuring, ensure the multimeter is in series with the loop and rated for the circuit voltage."
  },
  {
    question: "What is the difference between CAT II, III, and IV ratings?",
    answer: "CAT II covers local-level circuits (appliance outlets). CAT III covers distribution-level circuits (fixed wiring, panels, control cabinets). CAT IV covers origin of installation (incoming supply, meters). Higher categories have greater fault current capability. Always use instruments rated for the environment -- industrial control panels require CAT III minimum."
  },
  {
    question: "What are the advantages of tablet-based calibration tools?",
    answer: "Tablet-based tools connected via Bluetooth to field devices or calibrators provide several advantages: paperless documentation, direct access to calibration management software, real-time work order management, digital signatures, photographic evidence capture, and integration with enterprise asset management platforms. They streamline the workflow from field to database."
  }
];

const MOETModule5Section5_2 = () => {
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
            <TestTube className="h-4 w-4" />
            <span>Module 5.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Instruments for Control Systems
          </h1>
          <p className="text-white/80">
            Selection, use and safety of test equipment for industrial control systems
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Process calibrator:</strong> Source, simulate and measure mA, V, RTD, TC signals</li>
              <li className="pl-1"><strong>HART communicator:</strong> Digital access to smart transmitter configuration</li>
              <li className="pl-1"><strong>Data loggers:</strong> Multi-channel recording for intermittent faults</li>
              <li className="pl-1"><strong>CAT III minimum:</strong> Required rating for industrial control panels</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Oscilloscope:</strong> Waveform analysis for noise, timing and signal integrity</li>
              <li className="pl-1"><strong>Network analyser:</strong> Profibus, Ethernet/IP, Modbus troubleshooting</li>
              <li className="pl-1"><strong>Documenting calibrator:</strong> Automatic records and error calculations</li>
              <li className="pl-1"><strong>IEC 61010-1:</strong> Safety standard for measurement equipment</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate test instruments for different control system testing tasks",
              "Use multifunction process calibrators for sourcing, simulating, and measuring process signals",
              "Explain the capabilities of HART communicators for smart transmitter access",
              "Apply data loggers and oscilloscopes for intermittent fault diagnosis",
              "Understand voltage category ratings and safety requirements for test equipment",
              "Describe network analysers for industrial communication troubleshooting"
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
            Multifunction Process Calibrators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The multifunction process calibrator is the primary tool for control system technicians. Instruments
              such as the Beamex MC6, Fluke 754, and Druck DPI 620 can <strong>source</strong> (generate signals),
              <strong> simulate</strong> (mimic sensor outputs), and <strong>measure</strong> (read signals) across a
              wide range of process signals including 4-20 mA, 0-10 V DC, resistance (RTD simulation), thermocouple
              millivolts, frequency, and pulse signals.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibrator Operating Modes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Source mode:</strong> The calibrator generates a precise signal (e.g. 12.00 mA) to test the receiving end of the loop -- controller input, recorder, indicator</li>
                <li className="pl-1"><strong>Simulate mode:</strong> The calibrator mimics a sensor output (e.g. RTD resistance for 150 degrees C) to test the transmitter's conversion accuracy</li>
                <li className="pl-1"><strong>Measure mode:</strong> The calibrator reads the actual loop signal to verify transmitter output or controller output</li>
                <li className="pl-1"><strong>Simultaneous:</strong> Many calibrators can source one signal type and measure another simultaneously, enabling complete loop testing from a single device</li>
              </ul>
            </div>

            <p>
              Advanced calibrators include <strong>documenting capability</strong> -- they automatically record
              test data, calculate errors against tolerance, and store results that can be downloaded to calibration
              management software. This eliminates manual data entry, reduces transcription errors, and creates a
              fully electronic calibration trail. The Beamex MC6, for example, can store thousands of calibration
              records and transfer them directly to Beamex CMX calibration management software.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When sourcing a 4-20 mA signal, always check whether the loop
              requires an externally powered source (active) or uses the loop's own power supply (passive/read mode).
              Connecting in the wrong mode can damage the calibrator or the loop components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            HART Communicators and Digital Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>HART communicator</strong> (e.g. Emerson Trex, Beamex MC6 with HART) connects to
              the 4-20 mA loop and communicates digitally with HART-enabled smart transmitters. It provides
              access to configuration parameters (range, damping, units), calibration functions (sensor trim
              and output trim commands), diagnostic data (sensor status, electronics temperature, configuration
              change count), and device identification (tag, serial number, manufacturer).
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HART Functions</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Configure range, damping, and engineering units</li>
                  <li className="pl-1">Perform sensor trim and output trim calibration</li>
                  <li className="pl-1">Read diagnostic data and device health status</li>
                  <li className="pl-1">View configuration change logs and alerts</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fieldbus Tools</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Profibus testers analyse bus signal quality</li>
                  <li className="pl-1">Foundation Fieldbus diagnostics monitor token passing</li>
                  <li className="pl-1">Tablet apps provide mobile device management</li>
                  <li className="pl-1">AMS/PDM platforms centralise device configuration</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Tablet-based tools</strong> and apps are increasingly used alongside traditional instruments.
              Mobile apps connected via Bluetooth to field devices or calibrators provide configuration, calibration
              records, and work order management directly from the field. Asset management platforms (Emerson AMS,
              Siemens PDM) provide centralised device management across the plant, maintaining a database of all
              device configurations and enabling remote access to field instrument data.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> HART communication occurs simultaneously with the 4-20 mA analogue
              signal, using frequency-shift keying (FSK) superimposed on the current loop. No additional wiring
              is required -- the communicator simply clips onto the existing loop wiring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Oscilloscopes and Data Loggers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Portable digital oscilloscopes</strong> (such as Fluke ScopeMeter or Tektronix TBS series)
              display time-varying electrical signals as waveforms. In control system work, they are essential for
              analysing PWM drive outputs, checking encoder signals, diagnosing communication waveforms, identifying
              noise and interference, and measuring timing relationships between signals. Bandwidth of 100-200 MHz
              is sufficient for most industrial applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oscilloscope Applications in Control Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>VSD output:</strong> Verify PWM waveform quality and switching frequency</li>
                <li className="pl-1"><strong>Encoder signals:</strong> Check pulse shape, frequency, and quadrature phase</li>
                <li className="pl-1"><strong>Communication:</strong> Analyse RS-485, Profibus, or HART signal levels and timing</li>
                <li className="pl-1"><strong>Noise investigation:</strong> Identify interference sources, measure signal-to-noise ratio</li>
                <li className="pl-1"><strong>Transient capture:</strong> Record intermittent glitches using single-shot trigger mode</li>
              </ul>
            </div>

            <p>
              <strong>Data loggers</strong> record multiple channels of data over extended periods (hours, days,
              or weeks). They are invaluable for capturing intermittent faults that occur randomly, trending process
              variables to identify slow drift, and recording environmental conditions during calibration. Modern
              data loggers offer wireless connectivity, cloud storage, and remote monitoring via web browsers.
              Multi-channel loggers can record voltage, current, temperature, humidity, and digital events simultaneously.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When investigating intermittent faults, set up a data logger to
              record the suspect signal continuously with trigger conditions. This captures the fault event and
              the surrounding context, even when no technician is present. Review the recorded data to correlate
              faults with time of day, process conditions, or other events.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Network Analysers and Specialist Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Network analysers</strong> for industrial communications capture and decode network traffic
              on protocols including Ethernet/IP, Profinet, Modbus TCP, and Profibus DP. They identify communication
              errors, measure response times, detect duplicate addresses, and help diagnose intermittent network
              problems. Wireshark (free software) with appropriate capture hardware is widely used for Ethernet-based
              protocol analysis.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Network Diagnostic Capabilities</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Protocol decode and traffic analysis</li>
                  <li className="pl-1">Response time measurement</li>
                  <li className="pl-1">Error rate and collision detection</li>
                  <li className="pl-1">Duplicate address identification</li>
                  <li className="pl-1">Bus topology and termination verification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Specialist Test Equipment</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Decade resistance box (RTD simulation)</li>
                  <li className="pl-1">Current clamp meter (non-invasive)</li>
                  <li className="pl-1">Insulation resistance tester (megger)</li>
                  <li className="pl-1">Earth loop impedance tester</li>
                  <li className="pl-1">Thermal imaging camera</li>
                </ul>
              </div>
            </div>

            <p>
              Additional specialist tools include <strong>decade resistance boxes</strong> for precise RTD
              simulation, <strong>current clamp meters</strong> for non-invasive current measurement, and
              <strong> insulation resistance testers (meggers)</strong> for checking cable and winding insulation
              integrity. Thermal imaging cameras are increasingly used for identifying hot spots in control
              panels, detecting loose connections, and checking motor and transformer temperatures without
              physical contact.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For Profibus DP networks, dedicated testers (e.g. Softing BC-600-PB)
              are essential. They analyse the physical bus signal quality, measure voltage levels and rise times,
              check bus termination, and detect reflections that generic test equipment cannot identify.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Safety and Voltage Category Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All test instruments used on electrical systems must be rated for the voltage category of the
              circuit being tested, as defined by <strong>IEC 61010-1</strong>. The measurement category
              system classifies circuits by their distance from the supply origin: <strong>CAT II</strong>
              covers local-level circuits (appliance sockets); <strong>CAT III</strong> covers distribution-level
              circuits including fixed wiring, distribution boards, and control panels; <strong>CAT IV</strong>
              covers the origin of installation (incoming supply, utility meters).
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Safety Critical Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Industrial control panels:</strong> Require CAT III rated instruments as a minimum</li>
                <li className="pl-1"><strong>Transient withstand:</strong> CAT III 600V has higher capability than CAT II 600V</li>
                <li className="pl-1"><strong>Test leads:</strong> Must be rated to the same CAT/voltage as the instrument</li>
                <li className="pl-1"><strong>Visual inspection:</strong> Check probes, leads, and case for damage before each use</li>
                <li className="pl-1"><strong>PPE:</strong> Insulated gloves and safety glasses when testing on live systems</li>
                <li className="pl-1"><strong>One-hand rule:</strong> Use one hand where possible to minimise current path through body</li>
              </ul>
            </div>

            <p>
              The CAT rating combined with the voltage rating determines the instrument's ability to withstand
              transient overvoltages. A CAT III 600V instrument can withstand higher transients than a CAT II 600V
              instrument. Using an instrument below the required CAT rating creates a serious safety hazard -- the
              instrument may not survive a transient and could expose the technician to dangerous voltages. Before
              use, test instruments must be visually inspected for damage to probes, leads, and case.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Electricians and instrumentation technicians must understand CAT
              ratings and always select instruments appropriate for the measurement environment. Using a CAT II
              rated instrument in a CAT III environment is a potentially lethal mistake.
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
                <p className="font-medium text-white mb-1">Core Test Instruments</p>
                <ul className="space-y-0.5">
                  <li>Multifunction calibrator -- source, simulate, measure</li>
                  <li>HART communicator -- smart transmitter access</li>
                  <li>Digital multimeter -- voltage, current, resistance</li>
                  <li>Loop calibrator -- 4-20 mA sourcing and reading</li>
                  <li>Insulation resistance tester -- cable and winding checks</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety and Standards</p>
                <ul className="space-y-0.5">
                  <li>CAT III -- minimum for industrial control panels</li>
                  <li>IEC 61010-1 -- safety requirements for test equipment</li>
                  <li>Visual inspection before each use</li>
                  <li>Test leads rated to same CAT as instrument</li>
                  <li>Data loggers -- intermittent fault capture</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-3">
              Next: Zero, Span and Linearity
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section5_2;
