import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commercial EV Charging Systems - Renewable Energy Module 6";
const DESCRIPTION =
  "Master commercial EV charging installations including three-phase systems, load management, network infrastructure, and multi-charger deployments for workplaces and public locations.";

const quickCheckQuestions = [
  {
    id: "com-ev-qc1",
    question: "What is the typical power rating for a commercial three-phase AC charger?",
    options: ["7.4 kW", "11-22 kW", "50 kW", "150 kW"],
    correctIndex: 1,
    explanation:
      "Commercial three-phase AC chargers typically operate at 11 kW (16A) or 22 kW (32A) per phase, providing faster charging than single-phase whilst avoiding the complexity of DC infrastructure.",
  },
  {
    id: "com-ev-qc2",
    question: "What communication protocol is commonly used for commercial charger management?",
    options: ["Modbus", "OCPP", "BACnet", "KNX"],
    correctIndex: 1,
    explanation:
      "OCPP (Open Charge Point Protocol) is the industry standard for charger-to-backend communication, enabling remote monitoring, load management, and billing integration.",
  },
  {
    id: "com-ev-qc3",
    question: "What is the primary purpose of static load management?",
    options: [
      "Increase charging speed",
      "Limit total site power consumption",
      "Reduce equipment costs",
      "Simplify installation",
    ],
    correctIndex: 1,
    explanation:
      "Static load management divides available power capacity among chargers to prevent exceeding the site supply limit, ensuring safe operation without triggering supply protection.",
  },
  {
    id: "com-ev-qc4",
    question: "What network connectivity option is most reliable for commercial EV chargers?",
    options: ["WiFi only", "4G cellular only", "Wired Ethernet", "Bluetooth"],
    correctIndex: 2,
    explanation:
      "Wired Ethernet provides the most reliable connectivity for commercial installations, avoiding WiFi interference issues and cellular coverage gaps. Cellular backup is often recommended.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is dynamic load management in EV charging?",
    options: [
      "Fixed power allocation to each charger",
      "Real-time power adjustment based on site demand",
      "Time-scheduled charging",
      "User-selected power levels",
    ],
    correctAnswer: 1,
    explanation:
      "Dynamic load management monitors total site demand in real-time and adjusts charging power to maximise EV charging within available supply headroom.",
  },
  {
    id: 2,
    question: "What supply capacity is typically required for a 50 kW DC rapid charger?",
    options: ["Single-phase 32A", "Three-phase 32A", "Three-phase 63A", "Three-phase 100A+"],
    correctAnswer: 3,
    explanation:
      "A 50 kW DC charger requires approximately 80A three-phase supply (accounting for efficiency losses), meaning 100A or higher supply is typically needed with headroom.",
  },
  {
    id: 3,
    question: "What is the purpose of RFID authentication at commercial chargers?",
    options: [
      "To measure energy consumption",
      "To control who can access charging and enable billing",
      "To adjust charging power",
      "To communicate with the vehicle",
    ],
    correctAnswer: 1,
    explanation:
      "RFID cards identify users for access control and billing purposes, enabling operators to restrict charging to authorised users and allocate costs appropriately.",
  },
  {
    id: 4,
    question: "What cable type is typically used for commercial EV charging submains?",
    options: ["Twin and earth", "SWA (Steel Wire Armoured)", "Flex cable", "Mineral insulated"],
    correctAnswer: 1,
    explanation:
      "SWA cable is standard for commercial installations, providing mechanical protection for underground and surface routes. It is suitable for indoor and outdoor use.",
  },
  {
    id: 5,
    question: "What is a charging cluster in commercial installations?",
    options: [
      "A single charger with multiple outlets",
      "A group of chargers sharing power infrastructure",
      "A charging station design",
      "A billing arrangement",
    ],
    correctAnswer: 1,
    explanation:
      "A charging cluster groups multiple chargers that share power distribution and load management, reducing infrastructure costs and simplifying installation.",
  },
  {
    id: 6,
    question: "What regulation applies to accessible EV charging installations?",
    options: [
      "Part P only",
      "The Equality Act and BS 8300",
      "Part L only",
      "No specific regulations",
    ],
    correctAnswer: 1,
    explanation:
      "The Equality Act requires reasonable adjustments for disabled users, and BS 8300 provides design guidance. Accessible bays with appropriate clearances are required for public charging.",
  },
  {
    id: 7,
    question: "What is the typical efficiency of a commercial DC fast charger?",
    options: ["75-80%", "85-90%", "92-95%", "98-99%"],
    correctAnswer: 2,
    explanation:
      "Modern DC fast chargers achieve 92-95% efficiency under optimal conditions. Losses occur in AC-DC conversion, cable resistance, and cooling systems.",
  },
  {
    id: 8,
    question: "What is payment terminal integration in commercial EV charging?",
    options: [
      "Using RFID cards only",
      "Enabling contactless card payments at the charger",
      "Monthly invoicing",
      "Free charging only",
    ],
    correctAnswer: 1,
    explanation:
      "Payment terminal integration allows users to pay via contactless bank cards directly at the charger, improving accessibility for non-network users.",
  },
  {
    id: 9,
    question: "What consideration is important for depot charging of commercial fleets?",
    options: [
      "Maximum charging speed",
      "Sequential charging schedules based on departure times",
      "Public access",
      "Payment integration",
    ],
    correctAnswer: 1,
    explanation:
      "Fleet depot charging benefits from smart scheduling that prioritises vehicles based on departure times, ensuring each vehicle is ready when needed whilst managing power demand.",
  },
  {
    id: 10,
    question: "What maintenance schedule is typically recommended for commercial EV chargers?",
    options: [
      "No maintenance required",
      "Annual inspection and testing",
      "Monthly full service",
      "Only when faults occur",
    ],
    correctAnswer: 1,
    explanation:
      "Annual inspection and testing is typically recommended, checking connectors, cables, safety devices, and performing electrical testing. More frequent checks may apply for high-use public chargers.",
  },
];

const faqs = [
  {
    question: "How many chargers can I install on a 100A three-phase supply?",
    answer:
      "With static load management, approximately 6-8 x 22kW chargers could share a 100A supply, with power divided equally. With dynamic load management, more chargers can be installed as power adjusts based on actual usage. Always calculate based on diversity factors and other site loads.",
  },
  {
    question: "What network infrastructure do commercial chargers need?",
    answer:
      "Commercial chargers typically require Ethernet connectivity for reliability, with 4G cellular backup recommended. A managed network switch should connect to the site network or dedicated internet connection. Consider VLAN separation for security. WiFi-only installations may experience reliability issues.",
  },
  {
    question: "Do commercial installations require DNO approval?",
    answer:
      "Installations above 16A per phase require DNO notification at minimum. Larger installations may require formal application and potentially network reinforcement. For DC rapid chargers or multiple AC chargers, engage with the DNO early in the project planning phase.",
  },
  {
    question: "What are the Building Regulations requirements for workplace charging?",
    answer:
      "Part S requires new non-residential buildings with 10+ parking spaces to have charging infrastructure, with one charger installed and cable routes for future chargers. Major renovations trigger similar requirements. Scotland and Wales have equivalent regulations.",
  },
  {
    question: "How do I size the supply for a car park with 20 charging bays?",
    answer:
      "Calculate maximum simultaneous demand using realistic diversity factors (typically 50-70% for workplace charging). With dynamic load management, you might size for 10-14 simultaneous charges at full power. Consider future expansion and allow headroom for additional chargers.",
  },
  {
    question: "What ongoing costs should clients expect for commercial charging?",
    answer:
      "Ongoing costs include electricity supply, network/backend service fees (typically per charger per month), maintenance contracts, payment processing fees if applicable, and potentially demand charges from the DNO. Help clients budget appropriately.",
  },
];

const RenewableEnergyModule6Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 6 • Section 3</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              EV Charging Infrastructure
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Commercial EV Charging Systems
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Designing and installing multi-charger systems for workplaces, car parks, and commercial premises.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Load Management</h3>
              <p className="text-sm text-white">
                Static and dynamic load management enable multiple chargers to share limited supply capacity, optimising infrastructure investment whilst meeting charging needs.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Network Infrastructure</h3>
              <p className="text-sm text-white">
                Commercial chargers require robust network connectivity for OCPP communication, enabling remote management, billing, and smart charging orchestration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Design multi-charger installations with appropriate load management",
                "Size electrical infrastructure for commercial charging demands",
                "Specify network and communication requirements",
                "Understand OCPP and backend integration",
                "Apply accessibility requirements for public charging",
                "Plan maintenance and support arrangements",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Commercial Charging Applications</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Commercial EV charging encompasses various applications, each with different requirements for power levels, user management, and operational considerations.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Workplace Charging</h4>
                <p className="mb-2">
                  Employees charge during working hours, typically 6-8 hour dwell times. This suits lower power levels (7-22 kW) with smart scheduling. Key considerations include:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>User authentication for cost allocation</li>
                  <li>Time-of-use tariff integration</li>
                  <li>Solar integration for daytime charging</li>
                  <li>Salary sacrifice scheme integration</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Public Destination Charging</h4>
                <p className="mb-2">
                  Retail, leisure, and hospitality venues offer charging to attract customers. Medium dwell times (1-4 hours) suit 7-22 kW chargers. Requirements include:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Public payment options (contactless, app)</li>
                  <li>Accessible bays for disabled users</li>
                  <li>Clear signage and wayfinding</li>
                  <li>Revenue sharing or free charging models</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Fleet Depot Charging</h4>
                <p className="mb-2">
                  Commercial vehicle fleets return to base for overnight charging. Requirements differ from public charging:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Scheduled charging based on departure times</li>
                  <li>Higher power for shorter dwell times where needed</li>
                  <li>Integration with fleet management systems</li>
                  <li>Cost allocation to vehicles/departments</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Load Management Strategies</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Load management enables multiple chargers to operate within limited supply capacity, maximising charging provision without expensive infrastructure upgrades.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Static Load Management</h4>
                <p className="mb-2">
                  Available power is divided equally among connected chargers. Simple to implement but may under-utilise capacity when not all chargers are in use.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Fixed allocation: e.g., 100A / 4 chargers = 25A each</li>
                  <li>Configured in charger settings or backend</li>
                  <li>No real-time monitoring required</li>
                  <li>Suitable for simple installations</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Dynamic Load Management</h4>
                <p className="mb-2">
                  Real-time monitoring adjusts charging power based on actual site demand. Maximises charging within available headroom.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>CT clamps monitor total site consumption</li>
                  <li>Chargers adjust power to use available capacity</li>
                  <li>Priority settings can favour certain chargers</li>
                  <li>Enables more chargers on limited supply</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Smart Charging Orchestration</h4>
                <p className="mb-2">
                  Advanced systems incorporate additional factors beyond immediate power availability:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Time-of-use tariffs - charge during cheaper periods</li>
                  <li>Demand response - reduce load on grid signals</li>
                  <li>Solar integration - maximise renewable usage</li>
                  <li>Vehicle departure times - ensure readiness</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Electrical Infrastructure Design</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Commercial installations require careful electrical design to ensure adequate capacity, appropriate protection, and cost-effective distribution architecture.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Supply Assessment and DNO Engagement</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Review existing supply capacity and maximum demand</li>
                  <li>Calculate EV charging demand with diversity factors</li>
                  <li>Contact DNO early for large installations</li>
                  <li>Consider dedicated EV supply for larger projects</li>
                  <li>Allow 12-24 months for network reinforcement if needed</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Distribution Architecture</h4>
                <p className="mb-2">
                  Options for distributing power to multiple chargers include:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Radial feeds:</strong> Individual cables to each charger from distribution board</li>
                  <li><strong>Feeder pillar:</strong> Local distribution point reducing cable runs</li>
                  <li><strong>Busbar system:</strong> Flexible tap-off for charger connections</li>
                  <li><strong>Power unit:</strong> Centralised conversion sharing power to multiple outputs</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Cable Sizing Considerations</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Current carrying capacity with grouping factors</li>
                  <li>Voltage drop over cable length</li>
                  <li>Earth fault loop impedance for protection</li>
                  <li>Future expansion - consider oversizing</li>
                  <li>Three-phase balance where applicable</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Network and Backend Systems</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Commercial chargers require robust network connectivity for management, billing, and smart charging features. Understanding the communication architecture is essential for reliable installations.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">OCPP Communication</h4>
                <p className="mb-2">
                  Open Charge Point Protocol connects chargers to central management systems:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li><strong>OCPP 1.6:</strong> Widely supported, JSON or SOAP messaging</li>
                  <li><strong>OCPP 2.0.1:</strong> Enhanced security, smart charging features</li>
                  <li>Enables remote monitoring, configuration, and firmware updates</li>
                  <li>Supports multiple backend providers for flexibility</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Network Infrastructure Requirements</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Ethernet (preferred):</strong> Cat6 cabling to each charger location</li>
                  <li><strong>Managed switch:</strong> PoE if chargers support it, VLAN capability</li>
                  <li><strong>Internet connection:</strong> Dedicated or site shared with QoS</li>
                  <li><strong>Cellular backup:</strong> 4G router for redundancy</li>
                  <li><strong>Firewall considerations:</strong> Outbound HTTPS to backend servers</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Backend Platform Features</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Real-time charger status monitoring</li>
                  <li>User authentication and access control</li>
                  <li>Billing and payment processing</li>
                  <li>Load management orchestration</li>
                  <li>Energy reporting and analytics</li>
                  <li>Maintenance alerts and diagnostics</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">User Experience and Accessibility</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Public and workplace charging must be accessible to all users. Design considerations extend beyond electrical requirements to encompass physical layout and user interaction.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Accessible Charging Bays</h4>
                <p className="mb-2">
                  The Equality Act requires reasonable adjustments. BS 8300 provides guidance:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Minimum 3.6m wide bays for wheelchair access</li>
                  <li>Level access to charger controls</li>
                  <li>Controls at accessible height (750-1200mm)</li>
                  <li>Clear space for cable management</li>
                  <li>Tactile and visual indicators</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Payment and Authentication Options</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>RFID cards:</strong> Network membership cards for regular users</li>
                  <li><strong>Contactless payment:</strong> Bank card terminals for ad-hoc users</li>
                  <li><strong>Mobile apps:</strong> QR code scanning to initiate sessions</li>
                  <li><strong>Plug & Charge:</strong> Automatic authentication (vehicle-dependent)</li>
                  <li><strong>Free vend:</strong> Complimentary charging for customers/employees</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Signage and Wayfinding</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Clear bay markings indicating EV only</li>
                  <li>Directional signage from car park entrances</li>
                  <li>Charger identification numbers</li>
                  <li>Tariff and payment information displayed</li>
                  <li>Support contact details</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Project Planning Essentials</h4>
                  <p className="mt-1 text-sm">
                    Engage with the DNO early, confirm network connectivity options, and understand the client's operational requirements before finalising designs. Build in contingency for supply delays and equipment lead times.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Future-Proofing Considerations</h4>
                  <p className="mt-1 text-sm">
                    Install larger cable sizes and spare ducting for future expansion. Select equipment that supports over-the-air updates. Consider how the installation might scale as EV adoption increases.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Maintenance Planning</h4>
                  <p className="mt-1 text-sm">
                    Commercial chargers require ongoing maintenance. Establish service agreements before handover, including response times for faults. Remote monitoring enables proactive maintenance and reduces downtime.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Commercial EV Charging Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-6/section-2">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-6/section-4">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section3;
