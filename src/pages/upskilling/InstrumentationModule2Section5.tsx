import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Digital vs Analogue Sensor Output - Instrumentation Module 2 Section 5";
const DESCRIPTION = "Understand the differences between digital and analogue sensor outputs, signal processing, and choosing appropriate output types for control systems.";

const quickCheckQuestions = [
  {
    id: "analogue-advantage",
    question: "What is the main advantage of 4-20mA current loop signals?",
    options: [
      "Lower cost than voltage signals",
      "Excellent noise immunity and long transmission distances",
      "Simpler wiring requirements",
      "Higher resolution than digital"
    ],
    correctIndex: 1,
    explanation: "4-20mA current loops provide excellent noise immunity because the signal is independent of cable resistance, and the 4mA 'live zero' allows easy detection of wire breaks."
  },
  {
    id: "digital-output",
    question: "Which application would benefit most from a digital on/off sensor output?",
    options: [
      "Precise temperature control",
      "Safety interlock requiring clear trip state",
      "Flow rate measurement",
      "Pressure trending"
    ],
    correctIndex: 1,
    explanation: "Safety interlocks benefit from digital outputs because they provide unambiguous on/off states for critical safety decisions, with no interpretation required."
  },
  {
    id: "adc-function",
    question: "What does an ADC (Analogue-to-Digital Converter) do?",
    options: [
      "Amplifies digital signals",
      "Converts continuous analogue signals to discrete digital values",
      "Increases signal voltage",
      "Filters electrical noise"
    ],
    correctIndex: 1,
    explanation: "An ADC converts continuous analogue signals into discrete digital values that can be processed by digital systems like PLCs and computers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of output is used to send continuous temperature data?",
    options: [
      "Digital output with discrete states",
      "Analogue output with continuous voltage or current",
      "Binary pulse output",
      "On/off switching output"
    ],
    correctAnswer: 1,
    explanation: "Analogue output is used for continuous temperature data because it can represent the full range of temperature values with a continuous voltage (0-10V) or current signal (4-20mA)."
  },
  {
    id: 2,
    question: "Give an example of a digital output device.",
    options: [
      "Thermocouple with voltage output",
      "4-20mA pressure transmitter",
      "Proximity sensor with on/off output",
      "RTD with resistance output"
    ],
    correctAnswer: 2,
    explanation: "A proximity sensor with on/off output is a classic example of a digital output device - it provides discrete states (object present/absent) rather than continuous values."
  },
  {
    id: 3,
    question: "What is a key advantage of analogue signals?",
    options: [
      "Better noise immunity than digital signals",
      "They provide continuous information and can represent precise values",
      "They require less wiring than digital signals",
      "They consume less power than digital signals"
    ],
    correctAnswer: 1,
    explanation: "Analogue signals provide continuous information and can represent precise values across their full range, making them ideal for applications requiring detailed measurement data."
  },
  {
    id: 4,
    question: "Why use a digital sensor in safety systems?",
    options: [
      "Digital sensors are always more accurate",
      "They provide better noise immunity and definitive on/off states for safety decisions",
      "Digital sensors are cheaper than analogue sensors",
      "They consume less power"
    ],
    correctAnswer: 1,
    explanation: "Digital sensors are preferred in safety systems because they provide excellent noise immunity and clear, definitive on/off states essential for reliable safety decisions."
  },
  {
    id: 5,
    question: "What does an ADC do?",
    options: [
      "Amplifies digital control signals",
      "Converts analogue signals to digital form for processing",
      "Provides automatic device calibration",
      "Adds digital communication to analogue devices"
    ],
    correctAnswer: 1,
    explanation: "An ADC (Analogue-to-Digital Converter) converts continuous analogue signals into digital format so they can be processed by digital systems like computers and PLCs."
  },
  {
    id: 6,
    question: "What is the benefit of HART protocol on 4-20mA signals?",
    options: [
      "It replaces the analogue signal entirely",
      "It superimposes digital communication on the analogue signal",
      "It increases the current range",
      "It reduces wiring costs"
    ],
    correctAnswer: 1,
    explanation: "HART protocol superimposes digital communication on top of the 4-20mA analogue signal, allowing configuration, diagnostics, and additional data without extra wiring."
  },
  {
    id: 7,
    question: "What happens at 4mA in a 4-20mA system?",
    options: [
      "The sensor is faulty",
      "This represents the zero or minimum measurement value",
      "The loop is disconnected",
      "Maximum measurement value"
    ],
    correctAnswer: 1,
    explanation: "In a 4-20mA system, 4mA represents the zero or minimum measurement value. This 'live zero' allows distinguishing between zero reading (4mA) and a broken wire (0mA)."
  },
  {
    id: 8,
    question: "Why might 0-10V signals be problematic over long distances?",
    options: [
      "Voltage signals cannot travel far",
      "Voltage drops and noise pickup affect accuracy",
      "They require special cables",
      "They use too much power"
    ],
    correctAnswer: 1,
    explanation: "0-10V signals are susceptible to voltage drops due to cable resistance and noise pickup from electromagnetic interference, making them less reliable over long cable runs."
  },
  {
    id: 9,
    question: "What is the resolution of a 12-bit ADC?",
    options: [
      "12 discrete levels",
      "4096 discrete levels",
      "1200 discrete levels",
      "120 discrete levels"
    ],
    correctAnswer: 1,
    explanation: "A 12-bit ADC provides 2^12 = 4096 discrete levels. Higher bit counts provide finer resolution for more precise measurements."
  },
  {
    id: 10,
    question: "When would you choose a frequency output sensor?",
    options: [
      "For temperature measurement",
      "For flow totalisation and counting applications",
      "For pressure control",
      "For colour sensing"
    ],
    correctAnswer: 1,
    explanation: "Frequency output is ideal for flow totalisation because pulses can be easily counted to track total volume, and the signal transmits well over long distances with good noise immunity."
  }
];

const faqs = [
  {
    question: "Why is 4-20mA preferred over 0-10V in industrial environments?",
    answer: "4-20mA current loops are preferred because the signal is independent of cable resistance (unlike voltage signals), they have excellent noise immunity, can travel long distances without degradation, and the 'live zero' at 4mA allows easy detection of wiring faults (0mA indicates a broken wire)."
  },
  {
    question: "What is the difference between 2-wire and 4-wire transmitters?",
    answer: "2-wire (loop-powered) transmitters draw their operating power from the 4-20mA signal loop, simplifying wiring but limiting features. 4-wire transmitters have separate power supply connections, allowing more features, higher accuracy, and isolated outputs, but require additional wiring."
  },
  {
    question: "How does HART communication work with analogue signals?",
    answer: "HART (Highway Addressable Remote Transducer) superimposes digital communication signals on the 4-20mA analogue signal using frequency-shift keying. The digital data does not affect the analogue measurement, allowing configuration, diagnostics, and additional process variables on existing wiring."
  },
  {
    question: "What resolution ADC do I need for instrumentation?",
    answer: "For most industrial applications, 12-bit (4096 levels) provides adequate resolution. Higher accuracy applications may require 16-bit (65536 levels) or 24-bit for precision measurement. The required resolution depends on your measurement accuracy needs and signal-to-noise ratio."
  },
  {
    question: "When should I use digital fieldbus instead of analogue signals?",
    answer: "Digital fieldbus (Profibus, Foundation Fieldbus, Modbus) is preferred when you need multiple measurements from one device, extensive diagnostics, remote configuration, or when reducing wiring costs on large installations. Traditional 4-20mA remains common for simple, reliable point-to-point connections."
  },
  {
    question: "How do I protect analogue signals from electrical noise?",
    answer: "Use shielded twisted-pair cables with the shield grounded at one end only, route signal cables away from power cables, use signal isolators where needed, ensure proper grounding, and consider current loops (4-20mA) instead of voltage signals for better noise immunity."
  }
];

const InstrumentationModule2Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Digital vs Analogue Sensor Output
          </h1>
          <p className="text-white/80">
            Understanding output types for signal processing and system integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Analogue:</strong> 4-20mA, 0-10V, continuous values</li>
              <li><strong>Digital:</strong> On/off, pulse, serial communication</li>
              <li><strong>ADC/DAC:</strong> Convert between analogue and digital</li>
              <li><strong>Selection:</strong> Based on application and control system</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 4-20mA wiring, digital fieldbus connectors</li>
              <li><strong>Use:</strong> Match output to PLC input type</li>
              <li><strong>Apply:</strong> Signal conditioning, noise reduction</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the difference between analogue and digital outputs",
              "Know typical signal formats and their applications",
              "Choose appropriate output types for different needs",
              "Understand signal conversion and processing methods",
              "Apply noise reduction techniques for analogue signals",
              "Recognise when to use digital communication protocols"
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

        {/* Section 1: Analogue Output */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Analogue Output Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analogue outputs provide continuous signals that can represent any value within their specified range. They are ideal for applications requiring precise measurement data and smooth control responses.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">4-20mA Current Loop</p>
              <p className="text-sm text-white mb-2">Industry standard for long-distance signal transmission with excellent noise immunity.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Excellent noise immunity</li>
                    <li>Long transmission distances (km)</li>
                    <li>Two-wire operation possible</li>
                    <li>4mA live zero for fault detection</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Process control systems</li>
                    <li>Industrial transmitters</li>
                    <li>SCADA systems</li>
                    <li>Remote monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">0-10V DC Voltage</p>
              <p className="text-sm text-white mb-2">Common voltage signal for local measurements and control applications.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Simple to interface</li>
                    <li>High input impedance</li>
                    <li>Low power consumption</li>
                    <li>Direct ADC interface</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Limitations</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Susceptible to noise pickup</li>
                    <li>Limited transmission distance</li>
                    <li>Voltage drop in long cables</li>
                    <li>Ground loop problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Millivolt Sensor Outputs</p>
              <p className="text-sm text-white mb-2">Low-level signals from sensors like thermocouples and strain gauges.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Characteristics</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Very low signal levels (mV)</li>
                    <li>High sensitivity to noise</li>
                    <li>Requires amplification</li>
                    <li>Temperature compensation needed</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Thermocouple inputs</li>
                    <li>Strain gauge bridges</li>
                    <li>pH measurement</li>
                    <li>Precision weighing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Digital Output */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Digital Output Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital outputs provide discrete states or data packets, offering excellent noise immunity and direct compatibility with digital control systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">On/Off (Binary) Signals</p>
              <p className="text-sm text-white mb-2">Simple two-state outputs for presence detection and switching applications.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Characteristics</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Two states: HIGH/LOW</li>
                    <li>Typically 24VDC or 5VDC logic</li>
                    <li>Simple interface circuits</li>
                    <li>Immediate response</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Proximity detection</li>
                    <li>Limit switches</li>
                    <li>Safety interlocks</li>
                    <li>Alarm contacts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pulse/Frequency Outputs</p>
              <p className="text-sm text-white mb-2">Variable frequency signals proportional to measured values.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Excellent transmission capability</li>
                    <li>Simple totalising function</li>
                    <li>Good noise immunity</li>
                    <li>No signal degradation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Applications</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Flow totalisation</li>
                    <li>Speed measurement</li>
                    <li>Position encoding</li>
                    <li>Energy metering</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Serial Data Communication</p>
              <p className="text-sm text-white mb-2">Structured data packets containing measurement values and status information.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Protocols</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>HART (4-20mA + digital)</li>
                    <li>Modbus RTU/TCP</li>
                    <li>Profibus/Profinet</li>
                    <li>Foundation Fieldbus</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Benefits</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Multiple parameters per device</li>
                    <li>Diagnostic information</li>
                    <li>Remote configuration</li>
                    <li>Network integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Signal Conversion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Signal Conversion and Processing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern control systems often require conversion between analogue and digital signals, along with various signal processing functions to ensure optimal performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analogue-to-Digital Conversion (ADC)</p>
                <p className="text-sm text-white mb-2">Converts continuous analogue signals into discrete digital values.</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white mb-1">Key Parameters</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Resolution: Number of bits (8, 12, 16, 24-bit)</li>
                    <li>Sampling rate: Conversions per second</li>
                    <li>Accuracy: How close to true value</li>
                    <li>Input range: Voltage/current limits</li>
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital-to-Analogue Conversion (DAC)</p>
                <p className="text-sm text-white mb-2">Converts digital control signals into analogue outputs for actuators.</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white mb-1">Key Parameters</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Resolution: Number of output steps</li>
                    <li>Settling time: Response speed</li>
                    <li>Linearity: Output accuracy</li>
                    <li>Output range: Voltage/current limits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Resolution Examples:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-1">8-bit</p>
                  <p className="text-white text-xs">256 levels</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-1">12-bit</p>
                  <p className="text-white text-xs">4,096 levels</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-1">16-bit</p>
                  <p className="text-white text-xs">65,536 levels</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-1">24-bit</p>
                  <p className="text-white text-xs">16.7M levels</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Choosing Output Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Choosing the Right Output Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the appropriate output type depends on application requirements, control system compatibility, and environmental factors.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2">Use Analogue When:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuous measurement needed</li>
                  <li>Precise control required</li>
                  <li>Simple, proven technology wanted</li>
                  <li>Long cable runs required (4-20mA)</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2">Use Digital When:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>On/off state is sufficient</li>
                  <li>Multiple data points needed</li>
                  <li>Diagnostics required</li>
                  <li>Safety-critical decisions</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-white mb-2">Use Fieldbus When:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Many devices on one network</li>
                  <li>Wiring cost is critical</li>
                  <li>Advanced diagnostics needed</li>
                  <li>Remote configuration required</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Signals</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match sensor output to PLC/DCS input card type</li>
                <li>Consider cable length and route for signal type selection</li>
                <li>Specify 4-20mA for long runs or noisy environments</li>
                <li>Document signal ranges and scaling factors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use shielded cables for analogue signals</li>
                <li>Separate signal cables from power cables</li>
                <li>Ground shields at one end only to prevent loops</li>
                <li>Verify loop resistance is within transmitter capability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mismatched signal types</strong> — connecting 4-20mA to voltage input damages equipment</li>
                <li><strong>Ignoring loop resistance</strong> — long cables can exceed transmitter drive capability</li>
                <li><strong>Poor cable routing</strong> — running signal cables near VFDs causes interference</li>
                <li><strong>Ground loops</strong> — multiple ground connections cause measurement errors</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule2Section5;
