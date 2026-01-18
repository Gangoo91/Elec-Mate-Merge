import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bacnet-device-link",
    question: "What type of BACnet device links two different network types together?",
    options: ["Controller", "Router or Gateway", "Sensor"],
    correctIndex: 1,
    explanation: "Routers and gateways link different BACnet networks together or connect BACnet to other protocols, enabling system integration across different network types."
  },
  {
    id: "bacnet-ip-coordination",
    question: "Why does BACnet/IP require coordination with IT departments?",
    options: ["It runs faster than other protocols", "It uses IP networks requiring addressing and VLAN planning", "It is more expensive than other options"],
    correctIndex: 1,
    explanation: "BACnet/IP uses standard Ethernet infrastructure and requires IP addressing, VLAN setup, and network segregation planning to avoid conflicts with corporate IT systems."
  },
  {
    id: "bacnet-multiple-buildings",
    question: "Which BACnet network type is best for connecting hundreds of devices across multiple buildings?",
    options: ["BACnet MSTP (RS-485)", "BACnet/IP", "Both work equally well"],
    correctIndex: 1,
    explanation: "BACnet/IP is ideal for large-scale installations across multiple buildings because it's scalable, high-speed, and can leverage existing Ethernet infrastructure for long-distance communication."
  },
  {
    id: "rs485-topology",
    question: "Why should RS-485 networks be wired as daisy chains rather than stars?",
    options: ["Star wiring is more expensive", "Star wiring causes signal reflections and communication errors", "Daisy chains work faster"],
    correctIndex: 1,
    explanation: "Star wiring creates multiple unterminated branches which cause signal reflections, leading to communication errors and network instability. Daisy-chain topology maintains proper impedance matching."
  }
];

const faqs = [
  {
    question: "How do I choose between MSTP and BACnet/IP?",
    answer: "Use MSTP for local device-level control where cost is a factor (HVAC field controllers). Use BACnet/IP for large buildings, campus systems, or when integrating with IT infrastructure."
  },
  {
    question: "What's the maximum cable length for MSTP?",
    answer: "The maximum segment length is 1200m (4000ft) using proper shielded twisted pair cable with 120Ω impedance."
  },
  {
    question: "Do I need special training to install BACnet systems?",
    answer: "Basic electrical knowledge covers cabling, but understanding device addressing, termination, and commissioning requires BMS-specific training or close coordination with integrators."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "What is the MOST common cause of BACnet MSTP communication failures?",
  options: [
    "Using Cat5e cable instead of Cat6",
    "Missing or incorrect termination resistors and wrong topology",
    "Installing too many devices on the network",
    "Using shielded cable in noisy environments"
  ],
  correctAnswer: 1,
  explanation: "Missing termination resistors and using star topology instead of daisy-chain are the most common installation errors that cause MSTP failures."
  }
];

const BMSModule5Section2 = () => {
  useSEO({
    title: "BACnet Devices and Network Types | BMS Course",
    description: "Learn about BACnet device types, MSTP and BACnet/IP network installation for building automation systems."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-5">
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
            <span>Module 5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BACnet Devices and Network Types
          </h1>
          <p className="text-white">
            Understanding BACnet architecture and proper installation practices
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MSTP:</strong> RS-485 twisted pair, 127 devices max, daisy-chain only</li>
              <li><strong>BACnet/IP:</strong> Ethernet, scalable, needs IT coordination</li>
              <li><strong>Key rule:</strong> Always terminate RS-485 at both ends</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 3-wire connections (A+, B-, REF) = RS-485 MSTP</li>
              <li><strong>Spot:</strong> RJ45 Ethernet ports = BACnet/IP</li>
              <li><strong>Use:</strong> Match cabling to protocol requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the four main BACnet device types",
              "Compare MSTP vs BACnet/IP networks",
              "Install RS-485 MSTP cabling correctly",
              "Coordinate BACnet/IP with IT departments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: BACnet Device Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BACnet Device Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BACnet defines devices by their role within the network. Understanding these device types helps
              electricians plan cable runs and ensure proper power supply to each device category.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Controllers</p>
                <p className="text-sm text-white">
                  Local devices that directly control equipment (e.g., AHU controllers, VAV controllers).
                  These are the "brains" of local systems.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensors & Actuators</p>
                <p className="text-sm text-white">
                  Input/output devices like temperature sensors, CO2 detectors, and damper motors.
                  Often powered by 24V DC.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operator Workstations (OWS)</p>
                <p className="text-sm text-white">
                  Software interfaces that let facility managers monitor and control the system.
                  Usually connected via BACnet/IP.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routers & Gateways</p>
                <p className="text-sm text-white">
                  Link different BACnet networks together or connect BACnet to other protocols
                  (e.g., Modbus). Critical for system integration.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example:</p>
              <p className="text-sm text-white">
                A VAV box may have a BACnet controller that talks to the central BMS workstation,
                adjusting damper position based on occupancy and temperature readings from connected sensors.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BACnet Network Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BACnet Network Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BACnet supports several types of communication media. The two most common for electricians are
              MSTP (RS-485) and BACnet/IP (Ethernet). Each has distinct installation requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet MSTP (Master-Slave/Token Passing)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Runs on RS-485 twisted-pair cabling</li>
                <li>Supports up to 127 devices per segment</li>
                <li>Requires correct termination resistors at both ends</li>
                <li>Common in HVAC field controllers</li>
                <li>Lower cost but slower communication speeds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet/IP</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Uses standard Ethernet cabling and IP networks</li>
                <li>Scalable for large buildings and campuses</li>
                <li>Requires coordination with IT departments for addressing</li>
                <li>High speed and flexible</li>
                <li>Ideal for supervisory control and large installations</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MSTP Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cheaper cabling, simpler setup</li>
                  <li>Device-level control</li>
                  <li>Single building installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet/IP Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Advanced IT infrastructure available</li>
                  <li>Integration across multiple systems</li>
                  <li>Campus-wide installations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: MSTP Installation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            MSTP Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BACnet MSTP (RS-485) installation requires specific cable types, termination, and wiring topology
              to ensure reliable communication. Poor installation practices are the leading cause of MSTP failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use shielded twisted pair cable, 120Ω impedance</li>
                <li>Belden 9842 or equivalent (22 AWG, foil + braid shield)</li>
                <li>Maximum segment length: 1200m (4000ft)</li>
                <li>Keep away from mains power cables</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Termination & Topology</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fit 120Ω termination resistors at both ends of each segment</li>
                <li>Always daisy-chain devices - never use star wiring</li>
                <li>Maximum 127 devices per RS-485 segment</li>
                <li>Connect cable shields to earth at one end only</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Star wiring</strong> - instead of daisy-chain topology</li>
                <li><strong>Missing termination</strong> - or incorrect resistor values</li>
                <li><strong>Wrong cable</strong> - unshielded or wrong impedance</li>
                <li><strong>Polarity reversal</strong> - on RS-485 connections</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Label each device with its network address</li>
                <li>Provide clear as-built drawings showing cable routes</li>
                <li>Test continuity and polarity before energising</li>
                <li>Leave spare capacity in cable trays for future expansion</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: BACnet/IP Implementation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BACnet/IP Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BACnet/IP uses standard Ethernet infrastructure, making it scalable and fast. However, it requires
              coordination with IT departments and careful network planning to avoid conflicts with corporate systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cabling & Infrastructure</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use Cat5e or higher Ethernet cable</li>
                <li>Follow standard Ethernet installation practices</li>
                <li>Ensure adequate switch ports and PoE if required</li>
                <li>Plan cable routes to avoid electromagnetic interference</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Segregation</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep BMS traffic separate from corporate IT traffic</li>
                <li>Use VLANs to isolate BMS network segments</li>
                <li>Implement appropriate firewall rules</li>
                <li>Consider dedicated BMS network infrastructure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IT Department Coordination</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Coordinate IP address ranges and subnets</li>
                <li>Agree on network security policies</li>
                <li>Plan for network monitoring and maintenance</li>
                <li>Establish clear labelling for BMS network ports</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Tips:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Label Ethernet drops clearly as "BMS" to avoid confusion</li>
                <li>Verify IP addresses, ping devices during commissioning</li>
                <li>Document network topology and addressing scheme</li>
                <li>Test bandwidth and latency for critical control loops</li>
              </ul>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">MSTP (RS-485)</p>
              <ul className="space-y-0.5">
                <li>120Ω shielded twisted pair</li>
                <li>Max 1200m, 127 devices</li>
                <li>Daisy-chain only</li>
                <li>Terminate both ends</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">BACnet/IP</p>
              <ul className="space-y-0.5">
                <li>Cat5e or better Ethernet</li>
                <li>Scalable to campus size</li>
                <li>VLAN separation recommended</li>
                <li>Coordinate with IT</li>
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
            <Link to="/study-centre/upskilling/bms-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BMS Protocols
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-3">
              Next: Modbus RTU/TCP
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section2;