import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "gateway-translator",
    question: "Why are gateways often compared to translators?",
    options: ["Because they both need electricity", "Because they convert between different protocols/languages", "Because they are expensive"],
    correctIndex: 1,
    explanation: "Gateways convert data between different communication protocols - just like translators convert between human languages. Both enable communication between parties that would otherwise not understand each other."
  },
  {
    id: "modbus-bacnet-gateway",
    question: "When would a Modbus-to-BACnet gateway be used?",
    options: ["Connecting Wi-Fi to Ethernet", "Connecting energy meters (Modbus) to a BMS (BACnet)", "Connecting fire alarms to security"],
    correctIndex: 1,
    explanation: "Energy meters typically communicate via Modbus, while BMS systems often use BACnet. The gateway allows the BMS to read energy consumption data from Modbus meters for centralised monitoring."
  },
  {
    id: "gateway-future-proof",
    question: "Why do gateways make buildings more future-proof?",
    options: ["They eliminate maintenance", "They allow mixing different vendors and protocols", "They reduce electricity consumption"],
    correctIndex: 1,
    explanation: "Gateways enable future-proofing by allowing integration of new devices from different vendors without replacing existing infrastructure. You can upgrade gradually and choose the best products for each application."
  }
];

const faqs = [
  {
    question: "Are gateways a potential single point of failure?",
    answer: "Yes, if the gateway fails, communication between protocols stops. Consider redundant configurations for critical systems and ensure regular backups and maintenance schedules."
  },
  {
    question: "How much delay do gateways add to communication?",
    answer: "Modern gateways add minimal delay (typically <100ms). However, large data volumes or underpowered gateways can increase latency. Size gateways appropriately for peak data periods."
  },
  {
    question: "Who configures gateways - electricians or integrators?",
    answer: "Electricians install and wire gateways. Integrators handle configuration, protocol mapping, and commissioning. Both roles are essential for successful implementation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "What is the primary function of a protocol gateway in a building automation system?",
  options: [
    "To provide backup power during outages",
    "To convert data between different communication protocols",
    "To increase network speed and bandwidth",
    "To store historical building data"
  ],
  correctAnswer: 1,
  explanation: "A protocol gateway's primary function is to convert data between different communication protocols, enabling devices that speak different 'languages' to communicate through a unified BMS."
  }
];

const BMSModule5Section5 = () => {
  useSEO({
    title: "Gateways and Interoperability | BMS Course",
    description: "Learn about protocol conversion, system integration, and gateway installation for building automation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Gateways and Interoperability
          </h1>
          <p className="text-white">
            Protocol conversion and system integration for building automation
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Gateway:</strong> Protocol translator between systems</li>
              <li><strong>Purpose:</strong> Unify different building systems</li>
              <li><strong>Key benefit:</strong> Vendor independence and flexibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Device with multiple protocol ports</li>
              <li><strong>Use:</strong> Modbus meters to BACnet BMS</li>
              <li><strong>Use:</strong> KNX lighting to central BMS</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand gateway functions and benefits",
              "Identify common gateway applications",
              "Explain interoperability advantages",
              "Apply gateway installation best practices"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is a Gateway? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a Gateway?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A gateway is a device that converts messages from one protocol into another.
              It allows subsystems using different "languages" to share data with the BMS.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-1">Translation</p>
                <p className="text-white text-xs">Converts between protocol formats</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-1">Integration</p>
                <p className="text-white text-xs">Links isolated systems together</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-1">Unity</p>
                <p className="text-white text-xs">Creates one integrated solution</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Example:</p>
              <p className="text-sm text-white">
                A building with BACnet HVAC controllers, Modbus energy meters, and KNX lighting controls.
                A gateway allows the BMS operator to see all data in one place - room temperatures from BACnet,
                power consumption from Modbus, and lighting status from KNX - all displayed together.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Enables multi-vendor solutions</li>
                  <li>Reduces system replacement costs</li>
                  <li>Allows gradual upgrades</li>
                  <li>Maintains existing investments</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Additional device to maintain</li>
                  <li>Potential single point of failure</li>
                  <li>May introduce slight data delays</li>
                  <li>Requires proper configuration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Common Gateway Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Gateway Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Gateways are essential for connecting different building systems. Here are the most common
              applications you'll encounter in practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-blue-400/80 mb-2">Modbus to BACnet Gateway</p>
              <p className="text-sm text-white mb-2">
                Energy meters and power monitoring equipment typically use Modbus, while BMS systems prefer BACnet.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-green-400/80 mb-1">Wiring Requirements:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>RS-485 A/B terminals for Modbus</li>
                    <li>Ethernet/MS-TP for BACnet</li>
                    <li>24V DC power supply</li>
                    <li>Shield connections for noise immunity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-400/80 mb-1">Configuration:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Set Modbus addresses (1-247)</li>
                    <li>Configure BACnet device ID</li>
                    <li>Map registers to BACnet objects</li>
                    <li>Set baud rate and parity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-purple-400/80 mb-2">KNX to BACnet Gateway</p>
              <p className="text-sm text-white mb-2">
                KNX lighting and blind controls integrated into larger BMS systems for unified management.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-green-400/80 mb-1">Installation Points:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Connect to KNX bus via connector</li>
                    <li>Program with ETS software</li>
                    <li>Ethernet for BACnet network</li>
                    <li>DIN-rail mounting</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-400/80 mb-1">Data Points Exposed:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Lighting on/off status per zone</li>
                    <li>Dimming levels (0-100%)</li>
                    <li>Blind position feedback</li>
                    <li>Presence detector states</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI to KNX/BACnet Gateway</p>
              <p className="text-sm text-white mb-2">
                Individual LED luminaire control via DALI integrated into wider building automation.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>DALI bus limited to 64 devices per line</li>
                <li>Maximum cable length 300m</li>
                <li>Gateway provides DALI power supply</li>
                <li>Enables individual fixture monitoring</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Multi-Protocol Controllers:</p>
              <p className="text-sm text-white">
                Some advanced gateways support multiple conversions simultaneously - handling Modbus-to-BACnet,
                KNX-to-BACnet, and DALI-to-BACnet in a single device, reducing panel space and complexity.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Benefits of Gateways */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Benefits of Gateways
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding gateway benefits helps you explain value to clients and make informed system design decisions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-green-400/80 mb-2">System Integration</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Before Gateway:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Separate HVAC workstation</li>
                    <li>Different energy monitoring software</li>
                    <li>Separate lighting control system</li>
                    <li>Multiple alarm interfaces</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">After Gateway:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Single BMS screen for all systems</li>
                    <li>Unified alarm management</li>
                    <li>Coordinated system responses</li>
                    <li>Centralised scheduling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-blue-400/80 mb-2">Future-Proofing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mix best-in-class products from different vendors</li>
                <li>Replace individual systems gradually</li>
                <li>Integrate new technologies easily</li>
                <li>Maintain existing investments</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-1">Capital Savings</p>
                <p className="text-white text-xs">Keep existing controllers, avoid proprietary lock-in</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-orange-400/80 mb-1">Operational Savings</p>
                <p className="text-white text-xs">Single training, unified maintenance</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-green-400/80 mb-1">Energy Savings</p>
                <p className="text-white text-xs">Coordinated HVAC/lighting control</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-purple-400/80 mb-2">Scalability</p>
              <p className="text-sm text-white">
                Simplifies adding new subsystems later without replacing everything.
                Phase 1 might cover basic HVAC and lighting, while Phase 2 adds security,
                expanded energy monitoring, and water meters - all through the same gateway infrastructure.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Important Considerations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Challenges:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Additional device complexity</li>
                    <li>Potential single point of failure</li>
                    <li>Configuration requirements</li>
                    <li>Firmware updates needed</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Mitigation:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Redundant configurations</li>
                    <li>Regular backup procedures</li>
                    <li>Proper documentation</li>
                    <li>Planned maintenance schedules</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
              <p className="font-medium text-white mb-1">Common Gateway Types</p>
              <ul className="space-y-0.5">
                <li>Modbus to BACnet</li>
                <li>KNX to BACnet</li>
                <li>DALI to KNX/BACnet</li>
                <li>Multi-protocol controllers</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Benefits</p>
              <ul className="space-y-0.5">
                <li>Unified system view</li>
                <li>Vendor independence</li>
                <li>Phased upgrades</li>
                <li>Cost savings</li>
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
            <Link to="/study-centre/upskilling/bms-module-5-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: KNX Topology
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-6">
              Next: Network Planning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section5;