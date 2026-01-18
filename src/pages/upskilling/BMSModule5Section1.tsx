import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule5Section1QuizData } from "@/data/upskilling/bmsModule5Section1QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "protocol-purpose",
    question: "What is the primary purpose of communication protocols in a BMS?",
    options: [
      "To increase the cost of the system",
      "To enable different devices and systems to communicate and share data",
      "To replace sensors with software",
      "To eliminate the need for wiring"
    ],
    correctIndex: 1,
    explanation: "Communication protocols provide standardised rules that enable diverse devices from different manufacturers to communicate and share data effectively, creating an integrated building automation system."
  },
  {
    id: "open-vs-proprietary",
    question: "What is the main advantage of open protocols like BACnet over proprietary protocols?",
    options: [
      "Lower initial hardware costs",
      "Multi-vendor interoperability without lock-in",
      "Faster communication speeds",
      "Simpler installation requirements"
    ],
    correctIndex: 1,
    explanation: "Open protocols like BACnet allow equipment from different manufacturers to work together, giving building owners freedom to choose products based on performance and cost rather than being locked to a single vendor's ecosystem."
  },
  {
    id: "osi-layers",
    question: "At which OSI layer do BACnet and Modbus primarily operate?",
    options: [
      "Physical layer",
      "Data link layer",
      "Application layer",
      "Transport layer"
    ],
    correctIndex: 2,
    explanation: "BACnet and Modbus are application layer protocols. They define how data is structured and exchanged between applications, while relying on lower layers (Ethernet, RS-485) for physical transmission."
  },
  {
    id: "electrician-role",
    question: "What is the electrician's primary role in BMS protocol implementation?",
    options: [
      "Programming control logic",
      "Designing network architecture",
      "Proper physical installation and cabling",
      "Selecting which protocol to use"
    ],
    correctIndex: 2,
    explanation: "While commissioning engineers handle programming and network design, electricians are responsible for proper physical installation including cabling, terminations, shielding, and ensuring the physical infrastructure supports reliable protocol communication."
  }
];

const faqs = [
  {
    question: "What is the difference between BACnet and Modbus?",
    answer: "BACnet is specifically designed for building automation with rich object models and is typically used for HVAC, lighting, and fire systems. Modbus is simpler and more generic, often used for industrial equipment, power meters, and plant machinery. Both can coexist in the same building."
  },
  {
    question: "Why do some buildings use multiple protocols?",
    answer: "Different systems may use different protocols - HVAC might use BACnet, power metering uses Modbus, lighting uses DALI. Protocol gateways translate between them, allowing all data to be visible through a central BMS interface."
  },
  {
    question: "What happens if I wire RS-485 incorrectly?",
    answer: "Incorrect wiring (swapped A/B, missing termination, broken shield) causes communication failures, intermittent operation, or data corruption. Always verify polarity, use proper termination resistors, and maintain shield continuity."
  },
  {
    question: "Can I use CAT6 cable for RS-485 Modbus?",
    answer: "Yes, but use a twisted pair for the data signals (A/B) and ensure proper shielding. Many installers use dedicated RS-485 cable because it's designed for the application, but CAT6 can work for shorter runs with proper practices."
  }
];

const BMSModule5Section1 = () => {
  useSEO({
    title: "Overview of BMS Protocols | BMS Module 5.1",
    description: "Master BMS communication protocols including BACnet, Modbus, LonWorks, and KNX. Learn protocol selection, physical requirements, and electrician responsibilities for reliable building automation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of BMS Protocols
          </h1>
          <p className="text-white">
            Communication protocol fundamentals for building automation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Protocol:</strong> Standardised communication rules</li>
              <li><strong>BACnet:</strong> Building-specific, most common</li>
              <li><strong>Modbus:</strong> Simple, industrial applications</li>
              <li><strong>Open vs Proprietary:</strong> Interoperability matters</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RS-485 cables, Ethernet networks, gateways</li>
              <li><strong>Use:</strong> System integration, data exchange, monitoring</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Communication protocol fundamentals",
              "BACnet, Modbus, LonWorks, KNX overview",
              "Open vs proprietary protocol benefits",
              "Physical layer requirements",
              "Protocol selection criteria",
              "Electrician responsibilities",
              "Common installation pitfalls",
              "Troubleshooting approaches"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Communication Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Communication protocols are standardised sets of rules that enable different devices to exchange
              data. In building automation, protocols allow sensors, controllers, actuators, and management
              systems from various manufacturers to work together as an integrated system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protocol Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Syntax:</strong> Data format and structure rules</li>
                <li><strong>Semantics:</strong> Meaning of data and commands</li>
                <li><strong>Timing:</strong> When and how fast data is sent</li>
                <li><strong>Error Handling:</strong> Detection and correction methods</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OSI Model Relevance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Layer 1:</strong> Physical (RS-485, Ethernet)</li>
                  <li><strong>Layer 2:</strong> Data Link (MSTP, IP)</li>
                  <li><strong>Layer 7:</strong> Application (BACnet, Modbus)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why It Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct physical installation</li>
                  <li>Proper cable selection</li>
                  <li>Appropriate termination</li>
                  <li>Troubleshooting approach</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Open vs Proprietary Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between open and proprietary protocols significantly impacts long-term system
              flexibility, maintenance costs, and vendor relationships. Understanding this distinction
              helps inform installation decisions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Protocols</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>BACnet:</strong> ASHRAE standard</li>
                  <li><strong>Modbus:</strong> Industry standard</li>
                  <li><strong>KNX:</strong> European standard</li>
                  <li>Multi-vendor interoperability</li>
                  <li>Competitive pricing</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-red-400/80 mb-2">Proprietary Protocols</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Vendor-specific systems</li>
                  <li>Single-source dependency</li>
                  <li>Potential feature advantages</li>
                  <li>Lock-in risk</li>
                  <li>Higher long-term costs</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Major BMS Protocols Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several protocols dominate the building automation industry, each with specific strengths
              and typical applications. Understanding their characteristics helps in system design and installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6 text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-2">BACnet</p>
                <ul className="text-white space-y-1">
                  <li>Building automation standard</li>
                  <li>HVAC, fire, lighting primary</li>
                  <li>MSTP (RS-485) and IP</li>
                  <li>Rich object model</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-2">Modbus</p>
                <ul className="text-white space-y-1">
                  <li>Simple register-based</li>
                  <li>Power meters, VFDs</li>
                  <li>RTU (RS-485) and TCP/IP</li>
                  <li>Master-slave architecture</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-2">LonWorks</p>
                <ul className="text-white space-y-1">
                  <li>Distributed control</li>
                  <li>Peer-to-peer capable</li>
                  <li>TP/FT-10 or IP</li>
                  <li>Self-healing network</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 mb-2">KNX</p>
                <ul className="text-white space-y-1">
                  <li>European standard</li>
                  <li>Lighting, HVAC, blinds</li>
                  <li>Twisted pair or IP</li>
                  <li>Residential + commercial</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrician's Role in Protocol Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While commissioning engineers handle protocol configuration and programming, electricians
              are responsible for the physical infrastructure that makes reliable communication possible.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable Selection:</strong> RS-485, CAT6, fibre as specified</li>
                <li><strong>Termination:</strong> Proper polarity, shield grounding</li>
                <li><strong>Routing:</strong> Segregation from power cables</li>
                <li><strong>Labelling:</strong> Clear network and address marking</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Swapped RS-485 A/B connections</li>
                <li>Missing or incorrect termination resistors</li>
                <li>Shield grounded at multiple points</li>
                <li>Data cable run near VFD power cables</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
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
              <p className="font-medium text-white mb-1">Protocol Selection</p>
              <ul className="space-y-0.5">
                <li>HVAC/Fire: BACnet</li>
                <li>Power/Industrial: Modbus</li>
                <li>European/Lighting: KNX</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Physical Media</p>
              <ul className="space-y-0.5">
                <li>RS-485: 1200m max, twisted pair</li>
                <li>Ethernet: CAT6, 100m segments</li>
                <li>Fibre: Long distance, EMI immune</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule5Section1QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section1;
