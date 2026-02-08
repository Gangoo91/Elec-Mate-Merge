import { ArrowLeft, Cable, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Input/Output Devices - MOET Module 5 Section 2.2";
const DESCRIPTION = "Comprehensive guide to PLC input and output devices for electrical maintenance technicians: digital and analogue I/O modules, wiring methods, signal conditioning, sink/source configurations and fault diagnosis. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "io-digital-vs-analogue",
    question: "What is the key difference between a digital input and an analogue input on a PLC?",
    options: [
      "Digital inputs are faster than analogue inputs",
      "A digital input reads only ON or OFF states; an analogue input reads a continuously variable signal",
      "Analogue inputs can only be used with temperature sensors",
      "Digital inputs require shielded cable; analogue inputs do not"
    ],
    correctIndex: 1,
    explanation: "A digital (discrete) input recognises only two states — ON (1) or OFF (0), typically detecting switch contacts, proximity sensors or push buttons. An analogue input reads a continuously variable signal (e.g., 0-10 V or 4-20 mA) representing a measured value such as temperature, pressure or flow."
  },
  {
    id: "io-4-20ma",
    question: "Why is the 4-20 mA current loop preferred over 0-10 V for industrial analogue signals?",
    options: [
      "It is cheaper to implement",
      "Current signals are less affected by cable resistance and electrical noise over long distances",
      "Voltage signals cannot be used with PLCs",
      "4-20 mA signals do not need any wiring"
    ],
    correctIndex: 1,
    explanation: "A current loop signal (4-20 mA) is preferred in industrial environments because the current remains constant regardless of cable length and resistance (within limits). Additionally, the live zero at 4 mA allows the system to distinguish between a genuine 0% signal and a broken wire (which would read 0 mA), providing built-in fault detection."
  },
  {
    id: "io-sink-source",
    question: "In a PLC digital input circuit, what does 'sourcing' mean?",
    options: [
      "The input module provides (sources) current to the field device",
      "The input module receives (sinks) current from the field device",
      "The input module generates its own signal",
      "The input module requires an external relay"
    ],
    correctIndex: 0,
    explanation: "In a sourcing configuration, the PLC I/O module provides current to the field device. In a sinking configuration, the PLC receives current from the field device. The choice between sink and source depends on the sensor type and the regional wiring convention. European practice often uses sourcing inputs (PNP sensors), while some legacy systems use sinking inputs (NPN sensors)."
  },
  {
    id: "io-isolation",
    question: "What is the purpose of optical isolation (opto-coupling) in PLC I/O modules?",
    options: [
      "To increase the switching speed of the outputs",
      "To electrically separate the field wiring from the PLC internal circuitry, protecting against voltage spikes",
      "To convert digital signals to analogue",
      "To reduce the cost of the I/O module"
    ],
    correctIndex: 1,
    explanation: "Optical isolation uses an LED and phototransistor to transfer the signal across an air gap, providing complete electrical separation between the field wiring and the PLC backplane. This protects the CPU and other modules from voltage transients, ground loops and electrical noise that are common in industrial environments."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A digital input module on a PLC typically operates at which voltage level?",
    options: [
      "240 V AC only",
      "24 V DC or 110/240 V AC depending on the module type",
      "5 V DC only",
      "48 V DC only"
    ],
    correctAnswer: 1,
    explanation: "Digital input modules are available in various voltage ratings. The most common for industrial use is 24 V DC. AC versions at 110 V or 240 V are also available for interfacing with older equipment. The module specification must match the field device voltage."
  },
  {
    id: 2,
    question: "What does a 4 mA reading on a 4-20 mA analogue input represent?",
    options: [
      "A fault condition",
      "The maximum measured value (100%)",
      "The minimum measured value (0%)",
      "The sensor is disconnected"
    ],
    correctAnswer: 2,
    explanation: "In a 4-20 mA loop, 4 mA represents 0% of the measured range and 20 mA represents 100%. The 'live zero' at 4 mA is a key advantage — if the signal drops to 0 mA, the system knows the wire is broken or the transmitter has failed, rather than reading a false zero."
  },
  {
    id: 3,
    question: "Which type of output module would be most suitable for controlling a 3-phase motor contactor?",
    options: [
      "Analogue output module (4-20 mA)",
      "Digital relay output module",
      "High-speed counter module",
      "Thermocouple input module"
    ],
    correctAnswer: 1,
    explanation: "A motor contactor coil is a simple ON/OFF device, requiring a digital output. A relay output module is ideal because it provides electrical isolation and can switch the AC voltage required by the contactor coil. Relay outputs are also suitable for higher-current loads compared to transistor outputs."
  },
  {
    id: 4,
    question: "What is the resolution of a 12-bit analogue input module?",
    options: [
      "256 steps",
      "1024 steps",
      "4096 steps",
      "65536 steps"
    ],
    correctAnswer: 2,
    explanation: "A 12-bit analogue-to-digital converter provides 2^12 = 4096 discrete steps across the input range. For a 0-10 V input, this gives a resolution of approximately 2.4 mV per step. Higher resolution (16-bit = 65536 steps) is available for applications requiring greater precision."
  },
  {
    id: 5,
    question: "When wiring a PNP (sourcing) proximity sensor to a PLC digital input, the sensor output connects to:",
    options: [
      "The PLC input terminal and common (0 V) rail",
      "The PLC input terminal, with the sensor sourcing current into the input",
      "The PLC analogue input channel",
      "The PLC output module"
    ],
    correctAnswer: 1,
    explanation: "A PNP sensor is a sourcing device — when activated, it connects its output to the positive supply (+24 V), sourcing current into the PLC input. The PLC input module sinks this current to the common (0 V) rail. This is the standard configuration for European industrial wiring."
  },
  {
    id: 6,
    question: "What causes 'signal aliasing' on a PLC analogue input?",
    options: [
      "Using too long a cable run",
      "Sampling the analogue signal at a rate lower than twice the signal frequency",
      "Using a 4-20 mA signal instead of 0-10 V",
      "Having too many I/O modules on the rack"
    ],
    correctAnswer: 1,
    explanation: "Aliasing occurs when the sampling rate of the analogue-to-digital converter is less than twice the frequency of the input signal (Nyquist theorem). This produces false readings. In practice, input filters and adequate scan rates prevent aliasing in most industrial applications."
  },
  {
    id: 7,
    question: "A transistor (solid-state) output module differs from a relay output module in that it:",
    options: [
      "Can switch both AC and DC loads",
      "Switches faster, has no mechanical wear, but can only switch DC loads (for NPN/PNP types)",
      "Is cheaper but less reliable",
      "Does not require a power supply"
    ],
    correctAnswer: 1,
    explanation: "Transistor outputs (NPN or PNP) switch much faster than relays (microseconds vs milliseconds) and have no moving parts, so there is no mechanical wear. However, standard transistor outputs can only switch DC loads. For AC loads, triac outputs or relay outputs are required."
  },
  {
    id: 8,
    question: "What is the purpose of a 'surge suppressor' across a PLC relay output controlling an inductive load?",
    options: [
      "To increase the switching speed",
      "To suppress the voltage spike (back-EMF) generated when the inductive load is de-energised",
      "To reduce the current consumption of the load",
      "To improve the accuracy of the output signal"
    ],
    correctAnswer: 1,
    explanation: "Inductive loads (contactors, solenoid valves, relay coils) generate a high-voltage back-EMF spike when de-energised. Without suppression, this spike can damage the relay contacts and cause electrical noise. A suitable suppressor (RC snubber for AC, flyback diode for DC) clamps the spike to a safe level."
  },
  {
    id: 9,
    question: "In a PLC system, the term 'I/O addressing' refers to:",
    options: [
      "The physical location of the PLC in the plant",
      "The unique software address assigned to each input and output point for use in the program",
      "The IP address of the PLC communication port",
      "The postal address of the PLC manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Every physical input and output point on a PLC is assigned a unique software address (e.g., I0.0 for input 0 on module 0, Q2.3 for output 3 on module 2). The program uses these addresses to read inputs and control outputs. The addressing scheme varies between PLC manufacturers."
  },
  {
    id: 10,
    question: "What is the typical current rating per point of a PLC digital output relay module?",
    options: [
      "10 mA",
      "100 mA",
      "2 A",
      "30 A"
    ],
    correctAnswer: 2,
    explanation: "Most PLC relay output modules are rated at approximately 2 A per point for resistive loads. For inductive loads the rating is typically lower (0.5-1 A). Loads requiring higher currents must be switched via an interposing relay or contactor controlled by the PLC output."
  },
  {
    id: 11,
    question: "When commissioning a new PLC analogue input, the first check should be:",
    options: [
      "Writing the program first",
      "Verifying the correct module type is installed and the input range matches the field transmitter output",
      "Connecting all field wiring before checking the module",
      "Setting the output to maximum"
    ],
    correctAnswer: 1,
    explanation: "Before any wiring, confirm the analogue input module matches the transmitter signal type (4-20 mA, 0-10 V, thermocouple type, RTD type). A mismatch will produce incorrect readings or could damage the module or transmitter. Check the module configuration in the PLC hardware setup software."
  },
  {
    id: 12,
    question: "Under ST1426, a maintenance technician working with PLC I/O devices must be able to:",
    options: [
      "Design new PLC programs from scratch",
      "Identify, test and replace faulty I/O modules and verify correct operation",
      "Manufacture replacement I/O modules",
      "Write the PLC hardware specification"
    ],
    correctAnswer: 1,
    explanation: "The ST1426 standard requires maintenance technicians to identify faults, carry out replacements and verify correct operation of control system components including PLC I/O modules. While programming knowledge is beneficial, the primary maintenance role focuses on hardware diagnosis, replacement and functional verification."
  }
];

const faqs = [
  {
    question: "How do I test a suspect digital input on a PLC?",
    answer: "First, check the input status LED on the module — it should illuminate when the field device is activated. If the LED is off, check the field wiring and sensor with a multimeter. If the LED is on but the program does not respond, check the input address in the PLC software using the monitoring/online mode. A forced input test (with appropriate safety precautions) can verify the program logic independently of the field device."
  },
  {
    question: "What is the difference between single-ended and differential analogue inputs?",
    answer: "A single-ended input measures voltage between the signal wire and a common ground shared with other channels. A differential input measures the voltage between two dedicated signal wires (+ and -), rejecting common-mode noise. Differential inputs are preferred for long cable runs or electrically noisy environments as they provide much better noise rejection."
  },
  {
    question: "Can I hot-swap a PLC I/O module (replace it with power on)?",
    answer: "This depends on the PLC manufacturer and model. Some modern PLCs support hot-swapping of I/O modules on remote racks, but many do not. Always consult the manufacturer's documentation. If hot-swapping is not supported, the PLC must be powered down or placed in STOP mode, and a risk assessment must be carried out before removing any module."
  },
  {
    question: "Why do some analogue inputs require 'scaling' in the PLC program?",
    answer: "The raw value from the analogue-to-digital converter is a number (e.g., 0-4095 for 12-bit). Scaling converts this raw count into engineering units (e.g., 0-100 degrees C, 0-10 bar). Without scaling, the program would have to work with meaningless raw numbers, making the logic difficult to understand and maintain."
  },
  {
    question: "What cable type should I use for 4-20 mA analogue signals?",
    answer: "Use twisted-pair, screened (shielded) cable for all analogue signals. The twisted pair reduces magnetic interference and the screen rejects electrostatic noise. The screen should be earthed at one end only (usually the PLC end) to avoid ground loops. Keep analogue cables physically separated from power cables and variable-speed drive outputs."
  }
];

const MOETModule5Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2">
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
            <Cable className="h-4 w-4" />
            <span>Module 5.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Input/Output Devices
          </h1>
          <p className="text-white/80">
            Digital and analogue I/O modules, wiring methods and interfacing for PLC systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Digital I/O:</strong> ON/OFF signals — switches, sensors, contactors</li>
              <li className="pl-1"><strong>Analogue I/O:</strong> Variable signals — 4-20 mA, 0-10 V, thermocouples</li>
              <li className="pl-1"><strong>Sink/Source:</strong> Current direction convention for wiring sensors</li>
              <li className="pl-1"><strong>Isolation:</strong> Opto-couplers protect PLC from field transients</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault finding:</strong> Check LED status, measure field signals</li>
              <li className="pl-1"><strong>Replacement:</strong> Match module type, address and configuration</li>
              <li className="pl-1"><strong>Commissioning:</strong> Verify scaling, range and signal integrity</li>
              <li className="pl-1"><strong>ST1426:</strong> I/O diagnosis is a core maintenance competency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between digital and analogue I/O modules and their applications",
              "Explain sink and source wiring configurations for PNP and NPN sensors",
              "Describe the 4-20 mA current loop and its advantages over voltage signalling",
              "Identify the role of optical isolation in protecting PLC circuitry",
              "Select appropriate output types (relay, transistor, triac) for different loads",
              "Apply fault-finding techniques to diagnose I/O module problems"
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
            Digital Inputs and Outputs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital (discrete) I/O is the most common type in any PLC system. A digital input reads a simple
              ON or OFF state from a field device, while a digital output switches a load ON or OFF. Despite
              their simplicity, correct wiring and configuration of digital I/O is critical for safe and reliable
              operation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Digital Input Devices</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Push buttons:</strong> Start, stop, acknowledge — momentary or maintained contact</li>
                <li className="pl-1"><strong>Limit switches:</strong> Detect mechanical position of machine components</li>
                <li className="pl-1"><strong>Proximity sensors:</strong> Inductive (metal), capacitive (non-metal), photoelectric (beam)</li>
                <li className="pl-1"><strong>Pressure switches:</strong> Detect threshold pressure in pneumatic or hydraulic systems</li>
                <li className="pl-1"><strong>Level switches:</strong> Float switches, conductivity probes for tank levels</li>
                <li className="pl-1"><strong>Safety devices:</strong> E-stops, guard switches, light curtains (to safety relay/PLC)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Digital Output Devices</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contactors:</strong> Switching motors, heaters and other high-power loads</li>
                <li className="pl-1"><strong>Solenoid valves:</strong> Pneumatic and hydraulic directional control</li>
                <li className="pl-1"><strong>Indicator lamps:</strong> Status indication on control panels</li>
                <li className="pl-1"><strong>Audible alarms:</strong> Sirens, horns and buzzers</li>
                <li className="pl-1"><strong>Interposing relays:</strong> Switching loads beyond the module current rating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Output Module Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Output Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Switching Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Relay</td>
                      <td className="border border-white/10 px-3 py-2">AC or DC</td>
                      <td className="border border-white/10 px-3 py-2">~10 ms</td>
                      <td className="border border-white/10 px-3 py-2">2 A per point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transistor (PNP/NPN)</td>
                      <td className="border border-white/10 px-3 py-2">DC only</td>
                      <td className="border border-white/10 px-3 py-2">~1 ms</td>
                      <td className="border border-white/10 px-3 py-2">0.5 A per point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triac</td>
                      <td className="border border-white/10 px-3 py-2">AC only</td>
                      <td className="border border-white/10 px-3 py-2">~1 ms</td>
                      <td className="border border-white/10 px-3 py-2">1 A per point</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Analogue Inputs and Outputs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analogue I/O allows the PLC to interface with continuously variable process signals. Analogue inputs
              convert real-world measurements (temperature, pressure, flow, level) into digital values the PLC can
              process. Analogue outputs convert PLC digital values back into variable signals to control devices
              such as variable-speed drives, control valves and chart recorders.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Analogue Signal Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>4-20 mA:</strong> Industry standard current loop; live zero at 4 mA provides wire-break detection</li>
                <li className="pl-1"><strong>0-10 V DC:</strong> Voltage signal; simpler wiring but more susceptible to cable losses</li>
                <li className="pl-1"><strong>0-20 mA:</strong> Current loop without live zero; less common in new installations</li>
                <li className="pl-1"><strong>Thermocouple:</strong> Millivolt signal from temperature-dependent junction; requires specialised input</li>
                <li className="pl-1"><strong>RTD (Pt100/Pt1000):</strong> Resistance change with temperature; requires excitation current from module</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Live Zero: The 4 mA Advantage</p>
              <p className="text-sm text-white">
                The 4-20 mA standard uses 4 mA to represent 0% and 20 mA to represent 100% of the measured range.
                This 'live zero' is a critical safety feature: if the signal drops below 4 mA (typically below
                3.6 mA), the PLC can detect a fault condition — a broken wire, failed transmitter or disconnected
                sensor. A 0-20 mA or 0-10 V signal cannot distinguish between a genuine zero reading and a fault.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analogue Input Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Resolution:</strong> Number of bits in the ADC — 12-bit (4096 steps), 16-bit (65536 steps)</li>
                <li className="pl-1"><strong>Accuracy:</strong> How close the reading is to the true value, expressed as percentage of span</li>
                <li className="pl-1"><strong>Conversion time:</strong> Time to convert one analogue sample to digital — affects scan time</li>
                <li className="pl-1"><strong>Input impedance:</strong> Must be appropriate for the signal type (high for voltage, low for current)</li>
                <li className="pl-1"><strong>Common mode rejection:</strong> Ability to reject noise common to both input wires</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Scaling example:</strong> A pressure transmitter outputs 4-20 mA for 0-10 bar. On a 12-bit
              input (0-4095 raw counts), 4 mA = 819 counts and 20 mA = 4095 counts. The PLC program scales this:
              Pressure = (Raw - 819) x 10 / (4095 - 819) bar.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sink and Source Wiring Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding sink and source wiring is essential for correctly connecting sensors and actuators to
              PLC I/O modules. The terms describe the direction of current flow relative to the I/O module and
              determine which type of sensor (PNP or NPN) is compatible.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sourcing (PNP) Configuration</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">PNP sensor provides current to the PLC input</li>
                  <li className="pl-1">Current flows from +24 V through the sensor to the PLC input</li>
                  <li className="pl-1">PLC input module sinks current to the 0 V rail</li>
                  <li className="pl-1">European standard practice for new installations</li>
                  <li className="pl-1">Wire colours: brown (+24 V), blue (0 V), black (signal)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sinking (NPN) Configuration</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">NPN sensor sinks current from the PLC input to 0 V</li>
                  <li className="pl-1">Current flows from the PLC input through the sensor to 0 V</li>
                  <li className="pl-1">PLC input module sources current from the +24 V supply</li>
                  <li className="pl-1">Common in Asian and some legacy installations</li>
                  <li className="pl-1">Requires sourcing-type input module</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Wiring Mistake</p>
              <p className="text-sm text-white">
                Connecting a PNP sensor to an NPN (sourcing) input module — or vice versa — will result in the
                input not functioning or, worse, damage to the sensor or module. Always check the sensor data
                sheet and the I/O module specification to confirm compatibility before wiring. Many modern PLC
                input modules are configurable for either sink or source operation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Optical Isolation and Signal Conditioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial environments subject PLC I/O to harsh electrical conditions: voltage transients from
              motor switching, electromagnetic interference from variable-speed drives, and ground potential
              differences between field devices and the PLC rack. Optical isolation and signal conditioning
              are the primary defences against these hazards.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optical Isolation (Opto-coupling)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>How it works:</strong> An LED inside the module converts the electrical input signal to light; a phototransistor on the other side converts it back to an electrical signal for the PLC backplane</li>
                <li className="pl-1"><strong>Isolation voltage:</strong> Typically 1500-2500 V AC between field side and backplane</li>
                <li className="pl-1"><strong>Protection:</strong> Prevents voltage spikes, ground loops and noise on field wiring from reaching the CPU</li>
                <li className="pl-1"><strong>Present in:</strong> Virtually all modern digital I/O modules as standard</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Conditioning for Analogue Inputs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Filtering:</strong> Low-pass filters remove high-frequency noise from the analogue signal</li>
                <li className="pl-1"><strong>Amplification:</strong> Weak signals (millivolt thermocouples) are amplified to the ADC input range</li>
                <li className="pl-1"><strong>Linearisation:</strong> Non-linear sensor outputs (e.g., thermocouples) are corrected to produce a linear reading</li>
                <li className="pl-1"><strong>Cold junction compensation:</strong> Thermocouple modules compensate for the reference junction temperature</li>
                <li className="pl-1"><strong>Excitation:</strong> RTD modules provide a constant excitation current and measure the resulting voltage</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When replacing an analogue input module, always check that the module
              configuration (signal type, range, filtering) matches the original. Incorrect configuration can produce
              wildly inaccurate readings without any obvious fault indication on the module LEDs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            I/O Fault Diagnosis and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diagnosing I/O faults is one of the most frequent tasks for a maintenance technician working with
              PLC systems. A systematic approach — working from the field device through the wiring to the module
              and into the PLC program — will identify the fault location efficiently.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic I/O Fault-Finding</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — LED check:</strong> Observe the module status LEDs. Input LED on = signal present at module</li>
                <li className="pl-1"><strong>Step 2 — Software check:</strong> Monitor the I/O address online. Does the PLC see the signal?</li>
                <li className="pl-1"><strong>Step 3 — Field measurement:</strong> Use a multimeter to verify the signal at the module terminals</li>
                <li className="pl-1"><strong>Step 4 — Wiring check:</strong> Trace the signal from the field device to the module terminals</li>
                <li className="pl-1"><strong>Step 5 — Device check:</strong> Test or substitute the field device to confirm it is functioning</li>
                <li className="pl-1"><strong>Step 6 — Module check:</strong> Swap the suspect module with a known good spare (same type)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Input Faults</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Broken wire to field device</li>
                  <li className="pl-1">Failed sensor or switch</li>
                  <li className="pl-1">Loose terminal connection</li>
                  <li className="pl-1">Incorrect wiring (sink/source mismatch)</li>
                  <li className="pl-1">Failed input channel on module</li>
                  <li className="pl-1">Fuse blown on input group</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Output Faults</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Welded relay contacts (stuck ON)</li>
                  <li className="pl-1">Worn relay contacts (intermittent)</li>
                  <li className="pl-1">Blown output fuse</li>
                  <li className="pl-1">Failed load device (e.g., coil open-circuit)</li>
                  <li className="pl-1">Short circuit on output wiring</li>
                  <li className="pl-1">Transistor output destroyed by over-current</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate the ability to systematically
              diagnose faults in control systems. Always record your findings and the corrective action taken in the
              maintenance log. This supports both continuous improvement and compliance with quality management systems.
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Analogue Signal Ranges</p>
                <ul className="space-y-0.5">
                  <li>4-20 mA — Standard current loop (live zero)</li>
                  <li>0-10 V DC — Common voltage signal</li>
                  <li>Pt100 RTD — 100 ohms at 0 degrees C</li>
                  <li>Type K thermocouple — -200 to +1372 degrees C</li>
                  <li>12-bit ADC = 4096 steps resolution</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">I/O Fault-Finding Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Check module status LEDs</li>
                  <li>2. Monitor address in PLC software</li>
                  <li>3. Measure signal at terminals</li>
                  <li>4. Trace and test field wiring</li>
                  <li>5. Test or substitute field device</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: PLC Hardware and Architecture
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section2-3">
              Next: Ladder Logic Basics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section2_2;
