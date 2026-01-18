import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commercial EV Charging Systems - Renewable Energy Module 6 Section 3";
const DESCRIPTION = "Master commercial EV charging installations including three-phase systems, load management, network infrastructure, and multi-charger deployments for workplaces and public locations.";

const quickCheckQuestions = [
  {
    id: "com-ev-qc1",
    question: "What is the typical power rating for a commercial three-phase AC charger?",
    options: ["7.4 kW", "11-22 kW", "50 kW", "150 kW"],
    correctIndex: 1,
    explanation: "Commercial three-phase AC chargers typically operate at 11 kW (16A) or 22 kW (32A) per phase, providing faster charging than single-phase whilst avoiding the complexity of DC infrastructure."
  },
  {
    id: "com-ev-qc2",
    question: "What communication protocol is commonly used for commercial charger management?",
    options: ["Modbus", "OCPP", "BACnet", "KNX"],
    correctIndex: 1,
    explanation: "OCPP (Open Charge Point Protocol) is the industry standard for charger-to-backend communication, enabling remote monitoring, load management, and billing integration."
  },
  {
    id: "com-ev-qc3",
    question: "What is the primary purpose of static load management?",
    options: ["Increase charging speed", "Limit total site power consumption", "Reduce equipment costs", "Simplify installation"],
    correctIndex: 1,
    explanation: "Static load management divides available power capacity among chargers to prevent exceeding the site supply limit, ensuring safe operation without triggering supply protection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is dynamic load management in EV charging?",
    options: ["Fixed power allocation to each charger", "Real-time power adjustment based on site demand", "Time-scheduled charging", "User-selected power levels"],
    correctAnswer: 1,
    explanation: "Dynamic load management monitors total site demand in real-time and adjusts charging power to maximise EV charging within available supply headroom."
  },
  {
    id: 2,
    question: "What supply capacity is typically required for a 50 kW DC rapid charger?",
    options: ["Single-phase 32A", "Three-phase 32A", "Three-phase 63A", "Three-phase 100A+"],
    correctAnswer: 3,
    explanation: "A 50 kW DC charger requires approximately 80A three-phase supply (accounting for efficiency losses), meaning 100A or higher supply is typically needed with headroom."
  },
  {
    id: 3,
    question: "What is the purpose of RFID authentication at commercial chargers?",
    options: ["To measure energy consumption", "To control who can access charging and enable billing", "To adjust charging power", "To communicate with the vehicle"],
    correctAnswer: 1,
    explanation: "RFID cards identify users for access control and billing purposes, enabling operators to restrict charging to authorised users and allocate costs appropriately."
  },
  {
    id: 4,
    question: "What cable type is typically used for commercial EV charging submains?",
    options: ["Twin and earth", "SWA (Steel Wire Armoured)", "Flex cable", "Mineral insulated"],
    correctAnswer: 1,
    explanation: "SWA cable is standard for commercial installations, providing mechanical protection for underground and surface routes. It is suitable for indoor and outdoor use."
  },
  {
    id: 5,
    question: "What is a charging cluster in commercial installations?",
    options: ["A single charger with multiple outlets", "A group of chargers sharing power infrastructure", "A charging station design", "A billing arrangement"],
    correctAnswer: 1,
    explanation: "A charging cluster groups multiple chargers that share power distribution and load management, reducing infrastructure costs and simplifying installation."
  },
  {
    id: 6,
    question: "What regulation applies to accessible EV charging installations?",
    options: ["Part P only", "The Equality Act and BS 8300", "Part L only", "No specific regulations"],
    correctAnswer: 1,
    explanation: "The Equality Act requires reasonable adjustments for disabled users, and BS 8300 provides design guidance. Accessible bays with appropriate clearances are required for public charging."
  },
  {
    id: 7,
    question: "What is the typical efficiency of a commercial DC fast charger?",
    options: ["75-80%", "85-90%", "92-95%", "98-99%"],
    correctAnswer: 2,
    explanation: "Modern DC fast chargers achieve 92-95% efficiency under optimal conditions. Losses occur in AC-DC conversion, cable resistance, and cooling systems."
  },
  {
    id: 8,
    question: "What is payment terminal integration in commercial EV charging?",
    options: ["Using RFID cards only", "Enabling contactless card payments at the charger", "Monthly invoicing", "Free charging only"],
    correctAnswer: 1,
    explanation: "Payment terminal integration allows users to pay via contactless bank cards directly at the charger, improving accessibility for non-network users."
  },
  {
    id: 9,
    question: "What consideration is important for depot charging of commercial fleets?",
    options: ["Maximum charging speed", "Sequential charging schedules based on departure times", "Public access", "Payment integration"],
    correctAnswer: 1,
    explanation: "Fleet depot charging benefits from smart scheduling that prioritises vehicles based on departure times, ensuring each vehicle is ready when needed whilst managing power demand."
  },
  {
    id: 10,
    question: "What network connectivity option is most reliable for commercial EV chargers?",
    options: ["WiFi only", "4G cellular only", "Wired Ethernet", "Bluetooth"],
    correctAnswer: 2,
    explanation: "Wired Ethernet provides the most reliable connectivity for commercial installations, avoiding WiFi interference issues and cellular coverage gaps. Cellular backup is often recommended."
  }
];

const faqs = [
  {
    question: "How many chargers can I install on a 100A three-phase supply?",
    answer: "With static load management, approximately 6-8 x 22kW chargers could share a 100A supply, with power divided equally. With dynamic load management, more chargers can be installed as power adjusts based on actual usage. Always calculate based on diversity factors and other site loads."
  },
  {
    question: "What network infrastructure do commercial chargers need?",
    answer: "Commercial chargers typically require Ethernet connectivity for reliability, with 4G cellular backup recommended. A managed network switch should connect to the site network or dedicated internet connection. Consider VLAN separation for security. WiFi-only installations may experience reliability issues."
  },
  {
    question: "Do commercial installations require DNO approval?",
    answer: "Installations above 16A per phase require DNO notification at minimum. Larger installations may require formal application and potentially network reinforcement. For DC rapid chargers or multiple AC chargers, engage with the DNO early in the project planning phase."
  },
  {
    question: "What are the Building Regulations requirements for workplace charging?",
    answer: "Part S requires new non-residential buildings with 10+ parking spaces to have charging infrastructure, with one charger installed and cable routes for future chargers. Major renovations trigger similar requirements. Scotland and Wales have equivalent regulations."
  },
  {
    question: "How do I size the supply for a car park with 20 charging bays?",
    answer: "Calculate maximum simultaneous demand using realistic diversity factors (typically 50-70% for workplace charging). With dynamic load management, you might size for 10-14 simultaneous charges at full power. Consider future expansion and allow headroom for additional chargers."
  },
  {
    question: "What ongoing costs should clients expect for commercial charging?",
    answer: "Ongoing costs include electricity supply, network/backend service fees (typically per charger per month), maintenance contracts, payment processing fees if applicable, and potentially demand charges from the DNO. Help clients budget appropriately."
  }
];

const RenewableEnergyModule6Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-6">
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
            <span>Module 6 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commercial EV Charging Systems
          </h1>
          <p className="text-white/80">
            Multi-Charger Installations &amp; Load Management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Power:</strong> 11-22 kW three-phase AC typical</li>
              <li><strong>Load Management:</strong> Static or dynamic power sharing</li>
              <li><strong>Connectivity:</strong> OCPP via Ethernet, cellular backup</li>
              <li><strong>Accessibility:</strong> BS 8300 compliant bays required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Available supply capacity, network infrastructure</li>
              <li><strong>Use:</strong> Load management calculations, OCPP configuration</li>
              <li><strong>Apply:</strong> Design scalable commercial charging solutions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design multi-charger installations with appropriate load management",
              "Size electrical infrastructure for commercial charging demands",
              "Specify network and communication requirements",
              "Understand OCPP and backend integration",
              "Apply accessibility requirements for public charging",
              "Plan maintenance and support arrangements"
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

        {/* Section 1: Commercial Charging Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Commercial Charging Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial EV charging encompasses various applications, each with different requirements for power levels, user management, and operational considerations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>6-8 hour dwell times suit 7-22 kW</li>
                  <li>User authentication for cost allocation</li>
                  <li>Solar integration for daytime charging</li>
                  <li>Salary sacrifice scheme integration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Public Destination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1-4 hour dwell times suit 7-22 kW</li>
                  <li>Public payment options required</li>
                  <li>Accessible bays for disabled users</li>
                  <li>Clear signage and wayfinding</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fleet Depot Charging</p>
              <p className="text-sm text-white">
                Commercial vehicle fleets return to base for overnight charging. Requirements include scheduled charging based on departure times, integration with fleet management systems, and cost allocation to vehicles/departments.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Load Management Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Management Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load management enables multiple chargers to operate within limited supply capacity, maximising charging provision without expensive infrastructure upgrades.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Static Load Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fixed allocation: 100A / 4 chargers = 25A each</li>
                  <li>Configured in charger settings</li>
                  <li>No real-time monitoring required</li>
                  <li>Suitable for simple installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Load Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li>CT clamps monitor site consumption</li>
                  <li>Chargers adjust to available capacity</li>
                  <li>Priority settings for key chargers</li>
                  <li>Enables more chargers on limited supply</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Electrical Infrastructure Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Infrastructure Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial installations require careful electrical design to ensure adequate capacity, appropriate protection, and cost-effective distribution architecture.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Architecture Options</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Radial feeds:</strong> Individual cables to each charger from distribution board</li>
                <li><strong>Feeder pillar:</strong> Local distribution point reducing cable runs</li>
                <li><strong>Busbar system:</strong> Flexible tap-off for charger connections</li>
                <li><strong>Power unit:</strong> Centralised conversion sharing power to multiple outputs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Engagement</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review existing supply capacity and maximum demand</li>
                <li>Contact DNO early for large installations</li>
                <li>Consider dedicated EV supply for larger projects</li>
                <li>Allow 12-24 months for network reinforcement if needed</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Network and Backend Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Network and Backend Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial chargers require robust network connectivity for management, billing, and smart charging features.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OCPP Communication</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OCPP 1.6:</strong> Widely supported, JSON or SOAP messaging</li>
                <li><strong>OCPP 2.0.1:</strong> Enhanced security, smart charging features</li>
                <li>Enables remote monitoring, configuration, firmware updates</li>
                <li>Supports multiple backend providers for flexibility</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Infrastructure Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ethernet (preferred): Cat6 cabling to each charger</li>
                <li>Managed switch with VLAN capability</li>
                <li>Dedicated or shared internet with QoS</li>
                <li>4G cellular backup for redundancy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: User Experience and Accessibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            User Experience and Accessibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Public and workplace charging must be accessible to all users. Design considerations extend beyond electrical requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accessible Charging Bays (BS 8300)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Minimum 3.6m wide bays for wheelchair access</li>
                <li>Level access to charger controls</li>
                <li>Controls at accessible height (750-1200mm)</li>
                <li>Clear space for cable management</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Payment and Authentication Options</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>RFID cards:</strong> Network membership for regular users</li>
                <li><strong>Contactless payment:</strong> Bank card terminals for ad-hoc users</li>
                <li><strong>Mobile apps:</strong> QR code scanning to initiate sessions</li>
                <li><strong>Plug &amp; Charge:</strong> Automatic authentication (vehicle-dependent)</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Project Planning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Engage with DNO early in the process</li>
                <li>Confirm network connectivity options</li>
                <li>Understand client operational requirements</li>
                <li>Build in contingency for supply delays</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Future-Proofing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install larger cable sizes for potential upgrades</li>
                <li>Include spare ducting for expansion</li>
                <li>Select OCPP-compliant equipment for flexibility</li>
                <li>Consider how installation might scale</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Late DNO engagement</strong> - can cause major delays</li>
                <li><strong>Ignoring accessibility</strong> - legal requirement for public sites</li>
                <li><strong>WiFi-only connectivity</strong> - reliability issues common</li>
                <li><strong>No maintenance plan</strong> - commercial chargers need support</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default RenewableEnergyModule6Section3;
