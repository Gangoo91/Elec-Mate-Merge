import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Signal Conditioning - MOET Module 5 Section 1.5";
const DESCRIPTION = "Comprehensive guide to signal conditioning for electrical maintenance technicians: amplification, filtering, linearisation, signal conversion, 4-20 mA loops and noise reduction techniques. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "signal-conditioning-purpose",
    question: "What is the primary purpose of signal conditioning in an instrumentation system?",
    options: [
      "To generate the original sensor signal",
      "To convert, amplify, filter or linearise raw sensor signals into a form suitable for the control system",
      "To supply power to the control room displays",
      "To replace the sensor with a digital device"
    ],
    correctIndex: 1,
    explanation: "Signal conditioning takes the raw, often weak or noisy signal from a sensor and processes it into a standardised, clean signal that the PLC or DCS can accurately read. This may involve amplification, filtering, linearisation, isolation or conversion between signal types."
  },
  {
    id: "4-20ma-live-zero",
    question: "Why does the 4-20 mA standard use 4 mA as the zero point rather than 0 mA?",
    options: [
      "Because sensors cannot produce less than 4 mA",
      "To save energy in the loop",
      "So that a broken wire (0 mA) can be distinguished from a genuine zero reading (4 mA)",
      "Because PLCs cannot read signals below 4 mA"
    ],
    correctIndex: 2,
    explanation: "The 'live zero' at 4 mA means that if the loop current drops to 0 mA, the system knows there is a fault such as a broken wire or failed transmitter. A genuine zero process reading still produces 4 mA. This is a fundamental safety feature of the 4-20 mA standard."
  },
  {
    id: "noise-filtering",
    question: "A low-pass filter in a signal conditioning circuit is used to:",
    options: [
      "Remove the DC component from the signal",
      "Allow only high-frequency signals to pass through",
      "Remove high-frequency electrical noise while preserving the slower process signal",
      "Convert analogue signals to digital"
    ],
    correctIndex: 2,
    explanation: "A low-pass filter attenuates frequencies above a set cut-off point. In instrumentation, the process variable changes slowly compared to electrical noise, so a low-pass filter removes the unwanted high-frequency noise while preserving the genuine measurement signal."
  },
  {
    id: "galvanic-isolation",
    question: "Galvanic isolation in signal conditioning is important because it:",
    options: [
      "Increases the signal amplitude",
      "Prevents earth loops and protects sensitive equipment by electrically separating circuits",
      "Converts AC signals to DC",
      "Reduces the cost of cabling"
    ],
    correctIndex: 1,
    explanation: "Galvanic isolation uses transformers or opto-couplers to electrically separate the field wiring from the control system. This prevents earth loops (which cause measurement errors), protects expensive control equipment from field faults, and blocks hazardous voltages from reaching the control room."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Signal conditioning is best described as:",
    options: [
      "The process of selecting the correct sensor for a measurement",
      "The processing of raw sensor signals to make them suitable for the control system",
      "The programming of a PLC to accept input signals",
      "The calibration of a display instrument"
    ],
    correctAnswer: 1,
    explanation: "Signal conditioning encompasses all the processing steps between the raw sensor output and the control system input. This includes amplification, filtering, linearisation, isolation and signal conversion."
  },
  {
    id: 2,
    question: "In a 4-20 mA current loop, a reading of 12 mA represents:",
    options: [
      "0% of the measured range",
      "25% of the measured range",
      "50% of the measured range",
      "75% of the measured range"
    ],
    correctAnswer: 2,
    explanation: "The 4-20 mA range spans 16 mA (from 4 to 20). 12 mA is 8 mA above the zero point (4 mA), which is 8/16 = 50% of the measured range. The formula is: percentage = (mA - 4) / 16 x 100."
  },
  {
    id: 3,
    question: "A thermocouple produces a signal in the range of:",
    options: [
      "4-20 mA",
      "0-10 V DC",
      "Millivolts (typically 0-50 mV depending on type)",
      "0-5 A AC"
    ],
    correctAnswer: 2,
    explanation: "Thermocouples produce very small DC voltages in the millivolt range, typically 0-50 mV depending on the thermocouple type and temperature range. This weak signal requires amplification and cold junction compensation as part of signal conditioning before it can be used by a control system."
  },
  {
    id: 4,
    question: "What is the purpose of linearisation in signal conditioning?",
    options: [
      "To make the wiring run in straight lines",
      "To correct for non-linear sensor characteristics so the output is proportional to the measured variable",
      "To remove all noise from the signal",
      "To convert digital signals to analogue"
    ],
    correctAnswer: 1,
    explanation: "Many sensors have a non-linear relationship between the measured variable and their output. For example, thermocouple voltage does not change linearly with temperature. Linearisation applies a mathematical correction so the conditioned output is directly proportional to the actual temperature, pressure or flow."
  },
  {
    id: 5,
    question: "An instrumentation amplifier is preferred over a standard op-amp in signal conditioning because:",
    options: [
      "It is cheaper to manufacture",
      "It provides high common-mode rejection, high input impedance and precise differential gain",
      "It can only be used with digital signals",
      "It does not require a power supply"
    ],
    correctAnswer: 1,
    explanation: "Instrumentation amplifiers are specifically designed for measurement applications. They offer very high common-mode rejection ratio (CMRR) to reject noise common to both inputs, very high input impedance so they do not load the sensor, and precise, stable gain set by a single resistor."
  },
  {
    id: 6,
    question: "In a two-wire 4-20 mA transmitter, the signal wire also carries:",
    options: [
      "A separate digital communication signal only",
      "The power supply to the transmitter — the transmitter operates from the loop current",
      "An earth connection",
      "A pneumatic signal"
    ],
    correctAnswer: 1,
    explanation: "A two-wire transmitter is powered by the same 4-20 mA loop current that carries the measurement signal. The transmitter modulates the loop current to represent the measured variable while drawing its operating power from that same current. This is why the minimum is 4 mA — the transmitter needs at least this much to operate."
  },
  {
    id: 7,
    question: "Electromagnetic interference (EMI) in signal cables can be reduced by:",
    options: [
      "Using longer cable runs",
      "Running signal cables parallel to power cables",
      "Using screened/shielded twisted-pair cables with the screen earthed at one end",
      "Using single-core unscreened cables"
    ],
    correctAnswer: 2,
    explanation: "Screened (shielded) twisted-pair cables are the standard method for reducing EMI in instrumentation circuits. The twisting cancels out electromagnetically induced noise, and the screen provides electrostatic shielding. The screen should be earthed at one end only to prevent earth loop currents flowing through it."
  },
  {
    id: 8,
    question: "A signal isolator (barrier) is commonly used in hazardous area installations to:",
    options: [
      "Amplify the signal to overcome long cable distances",
      "Limit the energy that can enter the hazardous area to prevent ignition of flammable atmospheres",
      "Convert the signal from analogue to digital",
      "Filter out high-frequency noise"
    ],
    correctAnswer: 1,
    explanation: "In intrinsically safe (IS) installations, signal isolators or Zener barriers limit the voltage and current that can enter the hazardous zone. This ensures that even under fault conditions, the electrical energy is insufficient to ignite a flammable atmosphere. This is a critical safety function in industries such as oil, gas and chemical processing."
  },
  {
    id: 9,
    question: "Cold junction compensation in a thermocouple circuit is necessary because:",
    options: [
      "Thermocouples only work in cold environments",
      "The reference junction temperature affects the total EMF, so it must be measured and corrected for",
      "The thermocouple wire is too cold to produce a signal",
      "It prevents ice forming on the sensor"
    ],
    correctAnswer: 1,
    explanation: "A thermocouple measures the temperature difference between the hot junction (sensor) and the cold junction (terminal block). If the cold junction temperature varies, the measurement will be inaccurate. Cold junction compensation measures the terminal temperature and adds a correction voltage so the reading reflects only the hot junction temperature."
  },
  {
    id: 10,
    question: "A voltage-to-current converter is used when:",
    options: [
      "The sensor output is in millivolts and the PLC input requires a 4-20 mA signal",
      "The PLC needs a voltage signal and the sensor outputs current",
      "The sensor output needs to be amplified by exactly 10 times",
      "The cable length is less than 1 metre"
    ],
    correctAnswer: 0,
    explanation: "Voltage-to-current (V/I) converters are commonly used to convert a sensor's millivolt or volt output into a 4-20 mA current loop signal. Current loops are preferred for long cable runs in industrial environments because the signal is immune to voltage drops along the cable and less susceptible to electromagnetic interference."
  },
  {
    id: 11,
    question: "The HART protocol allows:",
    options: [
      "Only analogue 4-20 mA communication",
      "Digital communication to be superimposed on a standard 4-20 mA signal without affecting the analogue reading",
      "Wireless communication only",
      "Communication at speeds exceeding 1 Gbit/s"
    ],
    correctAnswer: 1,
    explanation: "HART (Highway Addressable Remote Transducer) uses frequency shift keying (FSK) to superimpose digital data on the existing 4-20 mA analogue signal. Because the digital signal has an average value of zero, it does not affect the 4-20 mA reading. This allows configuration, diagnostics and additional process data to be transmitted on the same two wires."
  },
  {
    id: 12,
    question: "When installing signal conditioning equipment, the maintenance technician should ensure:",
    options: [
      "All signal cables are run alongside power cables for convenience",
      "Correct supply voltage, proper earthing, screened cables separated from power, and calibration verified after installation",
      "The equipment is mounted as far from the sensor as possible",
      "No documentation is required for signal conditioning installations"
    ],
    correctAnswer: 1,
    explanation: "Proper installation of signal conditioning equipment requires: correct supply voltage, proper single-point earthing, screened cables routed away from power cables (minimum 300 mm separation), and verification of calibration after installation. All work should be documented with wiring diagrams, calibration records and equipment data sheets."
  }
];

const faqs = [
  {
    question: "What is the difference between a transmitter and a transducer?",
    answer: "A transducer converts one form of energy to another (e.g., a thermocouple converts heat to voltage). A transmitter is a complete signal conditioning device that takes the transducer output and produces a standardised signal (typically 4-20 mA) suitable for transmission to the control system. Many modern instruments combine both functions in a single device — a 'smart transmitter' that includes the sensor, signal conditioning, linearisation and communication in one housing."
  },
  {
    question: "Why is 4-20 mA preferred over 0-10 V in industrial environments?",
    answer: "Current signals are preferred because they are immune to voltage drops caused by cable resistance over long distances. A 4-20 mA signal reads the same regardless of cable length, whereas a 0-10 V signal would lose accuracy due to IR drop. Current loops also have better noise immunity in electrically noisy industrial environments and provide built-in fault detection through the live zero at 4 mA."
  },
  {
    question: "What is a HART communicator and when would I use one?",
    answer: "A HART communicator is a handheld device that connects to a 4-20 mA loop and communicates digitally with HART-enabled transmitters. It allows you to configure the transmitter (range, damping, units), read diagnostic information, perform calibration and access additional process variables — all without disconnecting the loop. As a maintenance technician, you would use it during commissioning, calibration and fault-finding on HART-enabled instruments."
  },
  {
    question: "How do I choose the correct signal conditioning module?",
    answer: "Select based on: (1) the sensor type and its output signal (mV, resistance, frequency, etc.), (2) the required output signal for your control system (4-20 mA, 0-10 V, digital), (3) environmental conditions (temperature, humidity, hazardous area classification), (4) isolation requirements (galvanic isolation needed if earth loops are likely), and (5) accuracy and response time requirements. Always check the manufacturer's datasheet for compatibility with your specific sensor and control system."
  },
  {
    question: "What is an earth loop and how does it affect measurements?",
    answer: "An earth loop occurs when there are multiple earth connections in a signal circuit, creating a closed loop through which unwanted currents can flow. These currents add to the measurement signal, causing errors — often seen as a fluctuating or offset reading. Prevention methods include: using galvanically isolated signal conditioners, earthing cable screens at one end only, using differential inputs on the PLC, and ensuring a single-point earthing strategy for the instrumentation system."
  }
];

const MOETModule5Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
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
            <Settings className="h-4 w-4" />
            <span>Module 5.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signal Conditioning
          </h1>
          <p className="text-white/80">
            Amplification, filtering, linearisation and signal conversion for industrial instrumentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Convert raw sensor signals into clean, standardised outputs</li>
              <li className="pl-1"><strong>Key functions:</strong> Amplification, filtering, linearisation, isolation</li>
              <li className="pl-1"><strong>Standard signal:</strong> 4-20 mA (live zero at 4 mA for fault detection)</li>
              <li className="pl-1"><strong>Noise control:</strong> Screened cables, twisted pairs, galvanic isolation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Check loop current, supply voltage, isolation integrity</li>
              <li className="pl-1"><strong>Calibration:</strong> Zero, span and linearity adjustments at the conditioner</li>
              <li className="pl-1"><strong>HART:</strong> Digital communication on existing 4-20 mA wiring</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to instrumentation and control system KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and functions of signal conditioning in instrumentation systems",
              "Describe the 4-20 mA standard including live zero and two-wire loop operation",
              "Identify amplification, filtering and linearisation techniques for common sensors",
              "Explain galvanic isolation and its role in preventing earth loops",
              "Describe noise reduction methods including screened cables and proper earthing",
              "Outline the HART protocol and its use in modern instrument maintenance"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is Signal Conditioning?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In any instrumentation and control system, the raw signal produced by a sensor is rarely in a form that
              a PLC, DCS or indicator can directly use. Thermocouples produce millivolts, RTDs change resistance,
              strain gauges produce microvolts, and capacitive sensors produce tiny changes in capacitance. Signal
              conditioning is the collective term for all the processing applied to convert these raw signals into
              standardised, reliable outputs suitable for measurement, control and recording.
            </p>
            <p>
              For the maintenance technician, understanding signal conditioning is essential because most instrument
              faults present as signal problems. A drifting reading, an intermittent signal, an offset error or a
              noisy display — all of these may originate in the signal conditioning chain rather than in the sensor
              itself. Systematic fault-finding requires understanding each stage of the signal path from sensor to
              control system.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Signal Conditioning Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Amplification:</strong> Increasing signal strength from millivolts/microvolts to a usable level (typically 1-10 V or 4-20 mA)</li>
                <li className="pl-1"><strong>Filtering:</strong> Removing unwanted noise and interference from the signal</li>
                <li className="pl-1"><strong>Linearisation:</strong> Correcting for non-linear sensor characteristics (e.g., thermocouple voltage vs temperature)</li>
                <li className="pl-1"><strong>Isolation:</strong> Electrically separating field circuits from control circuits to prevent earth loops and protect equipment</li>
                <li className="pl-1"><strong>Conversion:</strong> Changing signal type (e.g., voltage to current, resistance to voltage, analogue to digital)</li>
                <li className="pl-1"><strong>Excitation:</strong> Providing the power supply or reference signal needed by passive sensors (e.g., bridge excitation for strain gauges)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Conditioning in the Measurement Chain</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Sensing</td>
                      <td className="border border-white/10 px-3 py-2">Sensor/transducer</td>
                      <td className="border border-white/10 px-3 py-2">Thermocouple produces 0-50 mV</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Conditioning</td>
                      <td className="border border-white/10 px-3 py-2">Transmitter / signal conditioner</td>
                      <td className="border border-white/10 px-3 py-2">Amplifies, linearises, converts to 4-20 mA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Transmission</td>
                      <td className="border border-white/10 px-3 py-2">Cable / network</td>
                      <td className="border border-white/10 px-3 py-2">Screened twisted pair cable to marshalling cabinet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Input</td>
                      <td className="border border-white/10 px-3 py-2">PLC/DCS analogue input card</td>
                      <td className="border border-white/10 px-3 py-2">Converts 4-20 mA to digital value</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Processing</td>
                      <td className="border border-white/10 px-3 py-2">PLC/DCS program</td>
                      <td className="border border-white/10 px-3 py-2">Scales, alarms, control calculations</td>
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
            The 4-20 mA Current Loop Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 4-20 mA current loop is the dominant analogue signal standard in industrial instrumentation. It
              was developed to address the limitations of voltage-based signals over long distances and in
              electrically noisy environments. Understanding this standard is fundamental for any maintenance
              technician working with process instruments.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Why 4-20 mA?</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Immunity to cable resistance:</strong> Current is the same at every point in a series loop, so cable length and resistance do not affect accuracy</li>
                  <li className="pl-1"><strong>Live zero (4 mA):</strong> A broken wire or failed transmitter produces 0 mA, which is clearly distinguishable from a genuine 0% reading (4 mA)</li>
                  <li className="pl-1"><strong>Two-wire operation:</strong> The transmitter draws its operating power from the same two wires that carry the signal, reducing cabling costs</li>
                  <li className="pl-1"><strong>Noise immunity:</strong> Current signals are less affected by electromagnetic interference than voltage signals</li>
                  <li className="pl-1"><strong>Long distance:</strong> Signal integrity maintained over cable runs of 1,000 m or more with adequate loop supply voltage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Loop Calculations</h3>
                <p className="text-sm text-white mb-3">
                  Converting between milliamps and percentage of range is a core maintenance skill. The formulas are:
                </p>
                <div className="bg-white/5 p-3 rounded text-sm font-mono text-elec-yellow/90 mb-3">
                  <p>Percentage = (mA - 4) / 16 x 100</p>
                  <p>mA = (Percentage / 100 x 16) + 4</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Percentage</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Current (mA)</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-white/10 px-3 py-2">0%</td><td className="border border-white/10 px-3 py-2">4.00</td><td className="border border-white/10 px-3 py-2">Bottom of range (live zero)</td></tr>
                      <tr><td className="border border-white/10 px-3 py-2">25%</td><td className="border border-white/10 px-3 py-2">8.00</td><td className="border border-white/10 px-3 py-2">Quarter scale</td></tr>
                      <tr><td className="border border-white/10 px-3 py-2">50%</td><td className="border border-white/10 px-3 py-2">12.00</td><td className="border border-white/10 px-3 py-2">Mid scale</td></tr>
                      <tr><td className="border border-white/10 px-3 py-2">75%</td><td className="border border-white/10 px-3 py-2">16.00</td><td className="border border-white/10 px-3 py-2">Three-quarter scale</td></tr>
                      <tr><td className="border border-white/10 px-3 py-2">100%</td><td className="border border-white/10 px-3 py-2">20.00</td><td className="border border-white/10 px-3 py-2">Full scale</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Wire vs Four-Wire Transmitters</h3>
                <p className="text-sm text-white mb-2">
                  <strong>Two-wire:</strong> The transmitter is powered by the loop current. It modulates the current
                  between 4 and 20 mA to represent the process variable. Only two wires are needed. Most modern
                  process transmitters are two-wire.
                </p>
                <p className="text-sm text-white">
                  <strong>Four-wire:</strong> The transmitter has a separate power supply (typically 24 V DC or
                  230 V AC). The 4-20 mA output is isolated from the power supply. Four-wire transmitters can
                  source current independently and are used where higher power is needed (e.g., for valve positioners
                  or complex analysers).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Amplification, Filtering and Linearisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The three most common signal conditioning operations are amplification (increasing signal strength),
              filtering (removing noise) and linearisation (correcting non-linear sensor characteristics). Each
              serves a distinct purpose in producing an accurate, clean measurement.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Amplification</h3>
                <p className="text-sm text-white mb-2">
                  Most sensors produce very small signals. A thermocouple typically outputs 0-50 mV, a strain gauge
                  bridge may produce only 0-30 mV, and a pH electrode generates high-impedance millivolt signals.
                  These must be amplified to a usable level before transmission.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Instrumentation amplifiers:</strong> High CMRR, differential input, precise gain — the standard for measurement applications</li>
                  <li className="pl-1"><strong>Operational amplifiers (op-amps):</strong> Used in simpler circuits for buffering, scaling and offset adjustment</li>
                  <li className="pl-1"><strong>Programmable gain amplifiers:</strong> Gain can be changed by the control system to accommodate different sensor ranges</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Filtering</h3>
                <p className="text-sm text-white mb-2">
                  Electrical noise is the enemy of accurate measurement. Industrial environments are filled with
                  sources of electromagnetic interference: variable speed drives, contactors, welding equipment,
                  power cables and radio transmitters. Filters remove unwanted frequency components from the signal.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Low-pass filters:</strong> Pass low frequencies (the process signal), block high frequencies (noise) — most common in instrumentation</li>
                  <li className="pl-1"><strong>High-pass filters:</strong> Pass high frequencies, block low frequencies — used for vibration analysis and AC coupling</li>
                  <li className="pl-1"><strong>Band-pass filters:</strong> Pass a specific frequency range — used in flow meters and ultrasonic applications</li>
                  <li className="pl-1"><strong>Notch filters:</strong> Block a specific frequency — commonly used to reject 50 Hz mains interference</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Linearisation</h3>
                <p className="text-sm text-white mb-2">
                  Many sensors have inherently non-linear output characteristics. Without linearisation, the
                  displayed reading would not be proportional to the actual process variable.
                </p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Sensor</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Non-Linearity</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Linearisation Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Thermocouple</td>
                        <td className="border border-white/10 px-3 py-2">Voltage vs temperature is non-linear</td>
                        <td className="border border-white/10 px-3 py-2">Lookup table or polynomial correction in the transmitter</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Orifice plate</td>
                        <td className="border border-white/10 px-3 py-2">Flow is proportional to square root of DP</td>
                        <td className="border border-white/10 px-3 py-2">Square root extraction in the transmitter or PLC</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Thermistor (NTC)</td>
                        <td className="border border-white/10 px-3 py-2">Resistance decreases exponentially with temperature</td>
                        <td className="border border-white/10 px-3 py-2">Steinhart-Hart equation in software</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Galvanic Isolation and Noise Reduction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In industrial installations, signal circuits can be exposed to significant electrical interference,
              ground potential differences and fault voltages. Galvanic isolation and proper noise reduction
              techniques are essential for reliable measurement.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Galvanic Isolation</h3>
                <p className="text-sm text-white mb-2">
                  Galvanic isolation creates a complete electrical break between two circuits while still allowing
                  the signal to pass through. Common isolation methods include:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Opto-couplers:</strong> An LED illuminates a phototransistor across an insulating gap — widely used in digital signal isolation</li>
                  <li className="pl-1"><strong>Isolation transformers:</strong> Magnetic coupling transfers the signal across an insulating barrier — used for analogue and power isolation</li>
                  <li className="pl-1"><strong>Capacitive isolation:</strong> High-frequency signal capacitively coupled across a barrier — used in some modern digital isolators</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cabling Best Practice for Noise Reduction</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Screened twisted-pair cable:</strong> Standard for all analogue instrument signals — twisting rejects magnetic interference, screening rejects electrostatic interference</li>
                  <li className="pl-1"><strong>Single-point screen earthing:</strong> Earth the cable screen at the control room end only to prevent earth loop currents through the screen</li>
                  <li className="pl-1"><strong>Separation from power cables:</strong> Minimum 300 mm separation; cross at right angles where crossings are unavoidable</li>
                  <li className="pl-1"><strong>Dedicated cable containment:</strong> Instrument cables in separate trunking or tray from power cables</li>
                  <li className="pl-1"><strong>Ferrite cores:</strong> Can be fitted around cables to suppress high-frequency conducted interference</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Common Earth Loop Problems</p>
                <p className="text-sm text-white">
                  Earth loops are one of the most frequent causes of erratic instrument readings in industrial
                  installations. They occur when the instrument circuit has more than one connection to earth,
                  creating a loop through which 50 Hz mains-frequency currents can flow. The resulting voltage
                  drop adds to the measurement signal, causing offset errors or fluctuating readings. Prevention
                  is always better than cure — design the earthing scheme correctly from the start and use
                  isolated signal conditioners where multiple earth connections are unavoidable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            HART Protocol and Smart Transmitters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The HART (Highway Addressable Remote Transducer) protocol represents a significant advance in
              signal conditioning technology. It allows digital communication to be superimposed on a standard
              4-20 mA analogue signal, enabling configuration, diagnostics and additional data transfer without
              additional wiring.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">How HART Works</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>FSK modulation:</strong> Digital data is transmitted as two frequencies (1,200 Hz for logic 1, 2,200 Hz for logic 0) superimposed on the 4-20 mA signal</li>
                  <li className="pl-1"><strong>Zero average:</strong> The FSK signal has an average value of zero, so it does not affect the analogue reading</li>
                  <li className="pl-1"><strong>Simultaneous operation:</strong> The 4-20 mA analogue signal carries the primary process variable while HART carries configuration, diagnostics and additional variables</li>
                  <li className="pl-1"><strong>Multi-drop capable:</strong> Up to 15 devices on one pair of wires (in digital-only mode, where the analogue signal is fixed at 4 mA)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Transmitter Capabilities</h3>
                <p className="text-sm text-white mb-2">
                  Modern smart transmitters combine the sensor, signal conditioning and digital communication in
                  a single device. They offer significant advantages for maintenance:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Remote configuration:</strong> Range, damping, units and alarm levels can be changed from the control room or with a handheld communicator</li>
                  <li className="pl-1"><strong>Self-diagnostics:</strong> The transmitter continuously monitors its own health and reports faults</li>
                  <li className="pl-1"><strong>Multi-variable:</strong> A single pressure transmitter can report pressure, temperature and calculated flow rate</li>
                  <li className="pl-1"><strong>Digital calibration:</strong> Sensor trim and output trim can be performed through the HART interface</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires knowledge of instrumentation
              principles including signal conditioning, current loops and digital communication protocols. Practical
              skills include the ability to check, calibrate and troubleshoot instrument loops using appropriate test
              equipment and communicators.
            </p>
          </div>
        </section>

        {/* Divider */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">4-20 mA Quick Conversions</p>
                <ul className="space-y-0.5">
                  <li>4 mA = 0% (live zero)</li>
                  <li>8 mA = 25%</li>
                  <li>12 mA = 50%</li>
                  <li>16 mA = 75%</li>
                  <li>20 mA = 100%</li>
                  <li>0 mA = Fault (broken wire)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Noise Reduction Checklist</p>
                <ul className="space-y-0.5">
                  <li>Use screened twisted-pair cable</li>
                  <li>Earth screen at one end only</li>
                  <li>300 mm min separation from power cables</li>
                  <li>Cross power cables at 90 degrees</li>
                  <li>Use galvanic isolation where needed</li>
                  <li>Separate instrument and power trunking</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Flow and Level Measurement
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section1_5;
