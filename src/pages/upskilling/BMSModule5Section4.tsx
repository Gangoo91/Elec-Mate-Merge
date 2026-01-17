import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "knx-vendor-neutral",
    question: "Why is KNX considered vendor-neutral?",
    options: ["It's free to use", "Hundreds of manufacturers produce compatible devices", "It only works with one brand"],
    correctIndex: 1,
    explanation: "KNX is vendor-neutral because hundreds of manufacturers produce KNX-compatible devices that work together seamlessly, ensuring competition, choice, and long-term availability."
  },
  {
    id: "knx-line-devices",
    question: "How many devices can typically be supported on a KNX line?",
    options: ["Up to 32 devices", "Up to 64 devices", "Up to 127 devices"],
    correctIndex: 1,
    explanation: "A KNX line can support up to 64 devices (including couplers), though the total current consumption must not exceed the power supply capacity."
  },
  {
    id: "knx-line-coupler",
    question: "What type of KNX device is used to link two lines together?",
    options: ["Gateway", "Line coupler", "USB interface"],
    correctIndex: 1,
    explanation: "Line couplers are used to connect lines within areas, allowing expansion beyond the 64-device limit per line while maintaining system integrity."
  },
  {
    id: "knx-no-loops",
    question: "Why are loops not allowed in KNX topology?",
    options: ["They use too much power", "They cause signal reflections and communication errors", "They're too expensive"],
    correctIndex: 1,
    explanation: "Loops cause signal reflections and communication errors because telegrams would travel both directions and interfere with each other. Always maintain tree or star structure."
  }
];

const faqs = [
  {
    question: "Do electricians program KNX systems?",
    answer: "No, KNX programming requires ETS software and specialist training. Electricians install the bus cabling, devices, and power supplies, while integrators handle commissioning and programming."
  },
  {
    question: "What cable is used for KNX bus wiring?",
    answer: "KNX uses dedicated two-wire twisted pair cable (typically green sheathed) that carries both 24V DC power and data. Standard KNX cable is EIB-Y(ST)Y 2x2x0.8mm."
  },
  {
    question: "Can KNX work without a central controller?",
    answer: "Yes, KNX is a distributed system. Basic functions work peer-to-peer between devices without requiring a central controller. Central systems add advanced features and visualisation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "What is the maximum total cable length allowed on a single KNX line?",
  options: [
    "500 metres",
    "700 metres",
    "1000 metres",
    "1200 metres"
  ],
  correctAnswer: 2,
  explanation: "The maximum bus cable length on a KNX line is 1000m. The distance between power supply and the furthest device must not exceed 700m."
  }
];

const BMSModule5Section4 = () => {
  useSEO({
    title: "KNX Topology and Bus Devices | BMS Course",
    description: "Learn KNX bus system configuration, device addressing, and installation practices for building automation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            KNX Topology and Bus Devices
          </h1>
          <p className="text-white/80">
            Understanding KNX bus system configuration and installation practices
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>KNX:</strong> Distributed peer-to-peer bus system</li>
              <li><strong>Topology:</strong> Max 64 devices/line, 1000m cable</li>
              <li><strong>Key rule:</strong> Never create loops in the bus</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Green 2-wire twisted pair cable = KNX bus</li>
              <li><strong>Spot:</strong> 29V DC on bus terminals = KNX power</li>
              <li><strong>Use:</strong> Lighting, blinds, HVAC automation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand KNX distributed architecture",
              "Design proper KNX bus topology",
              "Identify KNX device types and functions",
              "Apply installation best practices"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is KNX? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is KNX?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              KNX is a distributed bus system where each device (sensor, switch, actuator) can communicate directly
              with others on the same bus. This peer-to-peer communication eliminates the need for a central controller
              for basic building automation functions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vendor Neutrality</p>
                <p className="text-sm text-white">
                  Hundreds of manufacturers produce KNX-compatible devices, ensuring competition,
                  choice, and long-term availability of components.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Media Support</p>
                <p className="text-sm text-white">
                  Supports twisted-pair bus (most common), Ethernet/IP (KNXnet/IP),
                  and wireless communication (KNX RF).
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distributed Intelligence</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Devices communicate peer-to-peer</li>
                <li>No single point of failure</li>
                <li>Basic functions work independently</li>
                <li>Scalable from simple to complex systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Example:</p>
              <p className="text-sm text-white/90">
                A KNX wall switch can directly control a lighting actuator and a blind motor without requiring
                a central controller. The switch sends a telegram on the bus, and any device programmed to
                respond to that address will act accordingly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">KNX Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>True interoperability between manufacturers</li>
                  <li>Distributed intelligence</li>
                  <li>Purpose-built for buildings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-400/80 mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Requires specialist programming (ETS)</li>
                  <li>Higher initial device costs</li>
                  <li>More complex installation requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: KNX Topology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            KNX Topology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              KNX uses a bus topology where all devices connect to a two-wire twisted-pair bus.
              The topology is flexible, supporting line, tree, and star layouts, but loops are strictly prohibited
              as they cause signal reflections and communication errors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bus Structure</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1">
                  <li>Two-wire twisted pair bus (typically green-sheathed)</li>
                  <li>24V DC power and data on same pair</li>
                  <li>Polarity-sensitive connections</li>
                </ul>
                <ul className="text-sm text-white space-y-1">
                  <li>Maximum 1000m bus cable length</li>
                  <li>Maximum 700m between PSU and furthest device</li>
                  <li>Built-in bus termination in devices</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line Capacity</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Up to 64 devices per line (including couplers)</li>
                <li>Devices consume different amounts of bus current</li>
                <li>Total current consumption must not exceed PSU capacity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Expansion</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Lines linked with line couplers for larger systems</li>
                <li>Up to 15 lines per area (plus main line)</li>
                <li>Up to 15 areas per system</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-green-400/80 mb-1">Line Topology</p>
                <p className="text-white/90 text-xs">Devices in sequence along bus</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-blue-400/80 mb-1">Tree Topology</p>
                <p className="text-white/90 text-xs">Main bus with branches</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-purple-400/80 mb-1">Star Topology</p>
                <p className="text-white/90 text-xs">Central junction box</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Topology Rules</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never create loops</strong> - cause signal reflections</li>
                <li><strong>Polarity matters</strong> - red to red, black to black</li>
                <li>Use couplers to connect separate lines, not loops</li>
                <li>Incorrect polarity prevents device communication</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: KNX Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            KNX Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              KNX devices fall into several categories, each serving specific functions in the building automation system.
              Understanding device types and their applications is essential for proper system design and installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensors (Input Devices)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Wall switches and push buttons</li>
                <li>PIR occupancy detectors</li>
                <li>Light level sensors</li>
                <li>Temperature and humidity sensors</li>
                <li>Window/door contact sensors</li>
                <li>Weather stations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuators (Output Devices)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Lighting Control:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Switch actuators (on/off)</li>
                    <li>Dimming actuators (0-10V, DALI)</li>
                    <li>LED drivers with KNX interface</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Motor Control:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Blind/shutter actuators</li>
                    <li>Valve actuators for HVAC</li>
                    <li>Fan speed controllers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Devices</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Couplers:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Line couplers (connect lines)</li>
                    <li>Area couplers (connect areas)</li>
                    <li>Media couplers (TP to IP)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Power Supplies:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>160mA, 320mA, 640mA capacities</li>
                    <li>Integrated choke for filtering</li>
                    <li>Multiple PSUs for large lines</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-green-400/80 mb-1">Low Current</p>
                <p className="text-white/90 text-xs">2-10mA: buttons, sensors</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-1">Medium Current</p>
                <p className="text-white/90 text-xs">10-20mA: actuators</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-red-400/80 mb-1">High Current</p>
                <p className="text-white/90 text-xs">20mA+: couplers, gateways</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Configuration & Performance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Configuration & Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While electricians don't typically program KNX systems, understanding addressing, performance characteristics,
              and system limitations is crucial for proper installation and troubleshooting.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Address</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Format: Area.Line.Device (e.g., 1.2.15)</li>
                  <li>Unique identifier for each device</li>
                  <li>Set during commissioning with ETS</li>
                  <li>Cannot be duplicated within system</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Group Address</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Format: Main/Middle/Sub (e.g., 1/2/3)</li>
                  <li>Functional addressing for communication</li>
                  <li>Multiple devices can share addresses</li>
                  <li>Up to 65,536 group addresses</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Characteristics</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Bus speed: 9600 bits per second</li>
                <li>Telegram transmission: ~20-50ms typical</li>
                <li>Maximum 57,600 devices per complete system</li>
                <li>Practical installations: 100-1000 devices</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Good Installation Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reliable communication</li>
                  <li>Fast response times</li>
                  <li>Easy troubleshooting</li>
                  <li>System longevity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Poor Installation Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Intermittent communication</li>
                  <li>Slow or failed commands</li>
                  <li>Difficult fault diagnosis</li>
                  <li>Premature failures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* FAQ Section */}
        <section className="mb-10 mt-10">
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Line Limits</p>
              <ul className="space-y-0.5">
                <li>64 devices max per line</li>
                <li>1000m max cable length</li>
                <li>700m max PSU to device</li>
                <li>No loops allowed</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">System Capacity</p>
              <ul className="space-y-0.5">
                <li>15 lines per area</li>
                <li>15 areas per system</li>
                <li>57,600 devices max</li>
                <li>65,536 group addresses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Modbus Protocol
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-5">
              Next: Gateways
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section4;