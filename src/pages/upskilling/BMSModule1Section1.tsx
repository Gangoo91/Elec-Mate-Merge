import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import BMSEmbeddedQuiz from "@/components/upskilling/BMSEmbeddedQuiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Is a BMS and Why It's Used? - BMS Module 1 Section 1";
const DESCRIPTION = "Learn about Building Management Systems (BMS): definition, core functions, components, protocols, and why electricians need BMS knowledge.";

const quickCheckQuestions = [
  {
    id: "bms-definition",
    question: "What is a Building Management System (BMS)?",
    options: [
      "A security camera system",
      "A computer-based control system for monitoring and controlling building equipment",
      "A type of electrical panel",
      "A fire alarm system"
    ],
    correctIndex: 1,
    explanation: "A BMS is a computer-based control system that monitors and controls mechanical and electrical equipment in buildings, including HVAC, lighting, power, fire, and security systems."
  },
  {
    id: "bms-benefit",
    question: "What is a primary benefit of implementing a BMS?",
    options: [
      "Reduced building size",
      "Lower construction costs",
      "10-30% energy savings through intelligent control",
      "Faster internet speeds"
    ],
    correctIndex: 2,
    explanation: "Energy management is one of the primary drivers for BMS implementation, with systems typically achieving 10-30% energy savings through intelligent control and monitoring."
  },
  {
    id: "bms-protocol",
    question: "Which of these is a common BMS communication protocol?",
    options: [
      "HTTP",
      "BACnet",
      "HDMI",
      "USB"
    ],
    correctIndex: 1,
    explanation: "BACnet is an international standard (ISO 16484-5) widely used in commercial buildings for BMS communication."
  }
];

const faqs = [
  {
    question: "Do I need specialised training to work with BMS as an electrician?",
    answer: "While basic electrical knowledge is sufficient for most BMS-related work, additional training in building automation and control systems is beneficial. Many manufacturers offer specific training programs for their systems."
  },
  {
    question: "Can I damage a BMS by working on connected electrical systems?",
    answer: "Yes, improper electrical work can affect BMS operation. Always identify BMS connections before starting work, follow isolation procedures, and coordinate with facilities management when working on integrated systems."
  },
  {
    question: "Are there specific regulations governing BMS installations?",
    answer: "BMS installations must comply with BS 7671 for electrical work, plus specific standards like BS EN ISO 16484 for building automation systems. Local building regulations may also apply."
  },
  {
    question: "How do I know if a building has a BMS?",
    answer: "Look for central control panels, multiple sensors throughout the building, integrated lighting controls, and ask facility managers. Modern commercial buildings typically have some form of building automation."
  }
];

const BMSModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-1">
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
            <span>Module 1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is a BMS and Why It's Used?
          </h1>
          <p className="text-white/80">
            Comprehensive introduction to Building Management Systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Computer-based control system for buildings</li>
              <li><strong>Controls:</strong> HVAC, lighting, power, fire, security</li>
              <li><strong>Benefits:</strong> 10-30% energy savings, improved comfort</li>
              <li><strong>Protocols:</strong> BACnet, Modbus, KNX, LonWorks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Control panels, sensors, integrated systems</li>
              <li><strong>Use:</strong> Installation, troubleshooting, maintenance</li>
              <li><strong>Apply:</strong> Compliance, energy management, safety</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what a Building Management System is",
              "Understand core BMS functions and components",
              "Identify common communication protocols",
              "Recognise why electricians need BMS knowledge",
              "Understand BMS installation considerations",
              "Learn safety and maintenance best practices"
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

        {/* Section 1: Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a Building Management System?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System (BMS), sometimes called a Building Automation System (BAS),
              is a computer-based control system that monitors and controls the mechanical and electrical
              equipment in a building, including HVAC, lighting, power systems, fire systems, and security systems.
            </p>
            <p>
              The BMS acts as the "central nervous system" of modern buildings, collecting data from sensors
              and controlling building services to optimise energy efficiency, occupant comfort, and system
              performance while ensuring safety and regulatory compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key BMS Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Central Processing Unit:</strong> Main controller processing sensor data</li>
                <li><strong>Field Devices:</strong> Sensors, actuators, and local controllers</li>
                <li><strong>User Interface:</strong> Software for monitoring and adjustments</li>
                <li><strong>Communication Network:</strong> Data cables connecting all components</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Core Functions */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Core Functions of a BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring & Control</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Real-time monitoring of building systems</li>
                  <li>Automated control of HVAC equipment</li>
                  <li>Lighting control and scheduling</li>
                  <li>Energy monitoring and management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety & Security</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fire alarm integration</li>
                  <li>Access control systems</li>
                  <li>Emergency lighting control</li>
                  <li>Security system integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Buildings Need a BMS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Buildings Need a BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Automatic scheduling:</strong> Systems operate only when needed</li>
                  <li><strong>Optimisation:</strong> Continuous adjustment based on occupancy</li>
                  <li><strong>Monitoring:</strong> Real-time energy consumption tracking</li>
                  <li><strong>Demand response:</strong> Load shedding during peak periods</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety & Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Emergency systems:</strong> Fire alarms, emergency lighting</li>
                  <li><strong>Regulatory compliance:</strong> Building regulations adherence</li>
                  <li><strong>Safety monitoring:</strong> Continuous system health checks</li>
                  <li><strong>Audit trails:</strong> Comprehensive logging for inspections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: BMS vs Traditional Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BMS vs Traditional Building Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Traditional Systems (1970s-1990s)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Standalone pneumatic and basic electric controls</li>
                  <li>Manual time clocks and thermostats</li>
                  <li>Limited integration between systems</li>
                  <li>Local control only - no remote access</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Modern BMS (2000s-Present)</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Fully integrated digital systems</li>
                  <li>IoT connectivity and cloud-based monitoring</li>
                  <li>Predictive analytics and AI optimisation</li>
                  <li>Mobile and web-based remote access</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white py-2 pr-4">Aspect</th>
                    <th className="text-left text-white py-2 pr-4">Traditional</th>
                    <th className="text-left text-white py-2">Modern BMS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-elec-yellow/80">Control</td>
                    <td className="py-2 pr-4 text-white">Manual switches</td>
                    <td className="py-2 text-white">Automated, sensor-based</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-elec-yellow/80">Integration</td>
                    <td className="py-2 pr-4 text-white">Independent systems</td>
                    <td className="py-2 text-white">Fully integrated platform</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-elec-yellow/80">Data</td>
                    <td className="py-2 pr-4 text-white">Manual readings</td>
                    <td className="py-2 text-white">Real-time monitoring</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-elec-yellow/80">Access</td>
                    <td className="py-2 pr-4 text-white">Local only</td>
                    <td className="py-2 text-white">Remote web/mobile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Communication Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common BMS Communication Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>International standard (ISO 16484-5)</li>
                  <li>Widely used in commercial buildings</li>
                  <li>Supports IP and MS/TP networks</li>
                  <li>Multi-manufacturer interoperability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple, reliable communication</li>
                  <li>Common in industrial applications</li>
                  <li>RS-485 or TCP/IP variants</li>
                  <li>Good for meters and sensors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">KNX/EIB Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>European home automation standard</li>
                  <li>Decentralised architecture</li>
                  <li>Power and data on same cable</li>
                  <li>Excellent for lighting control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LonWorks Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Peer-to-peer networking</li>
                  <li>Self-healing network topology</li>
                  <li>Distributed control systems</li>
                  <li>Common in older installations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Why Electricians Need BMS Knowledge */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Why Electricians Need BMS Knowledge
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern electricians increasingly encounter BMS during installation, maintenance,
              and troubleshooting work. Understanding these systems is essential for today's electrical professionals.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industry Trends</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Growing demand for energy-efficient buildings</li>
                  <li>Increased integration of electrical systems</li>
                  <li>Client expectations for smart building features</li>
                  <li>Regulatory requirements for energy monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation of BMS-compatible devices</li>
                  <li>Troubleshooting integrated lighting systems</li>
                  <li>Maintenance of emergency lighting controls</li>
                  <li>Support for commissioning activities</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing BMS Components</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure stable 24V DC or mains supply for controllers</li>
                <li>Use dedicated data cables (CAT5/6) for communication</li>
                <li>Keep data cables away from power cables to avoid EMI</li>
                <li>Maintain accurate as-built drawings and documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Maintenance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Perform regular system backups of configuration data</li>
                <li>Calibrate sensors periodically (temperature, pressure, flow)</li>
                <li>Test network communication integrity regularly</li>
                <li>Replace UPS and controller backup batteries as needed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>EMI interference</strong> — running data cables alongside power cables</li>
                <li><strong>Voltage drop</strong> — inadequate cable sizing for long distances</li>
                <li><strong>Poor grounding</strong> — improper earthing of BMS components</li>
                <li><strong>Inaccessibility</strong> — controllers installed in hard-to-reach locations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety Warning */}
        <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-10">
          <p className="text-sm text-white">
            <strong className="text-red-400">Safety Warning:</strong> Always isolate electrical supplies before working on BMS components.
            Coordinate with building management to ensure safe shutdown procedures and maintain emergency systems operation during maintenance.
          </p>
        </div>

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Components</p>
                <ul className="space-y-0.5">
                  <li>CPU - Central controller</li>
                  <li>Field devices - Sensors & actuators</li>
                  <li>User interface - Monitoring software</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common Protocols</p>
                <ul className="space-y-0.5">
                  <li>BACnet - Commercial buildings</li>
                  <li>Modbus - Industrial applications</li>
                  <li>KNX - Lighting & home automation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-sm text-white/80 mb-6">
            Complete this comprehensive quiz to test your understanding of BMS fundamentals.
          </p>
          <BMSEmbeddedQuiz />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default BMSModule1Section1;
