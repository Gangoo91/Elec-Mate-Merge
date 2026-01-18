import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule1Section2QuizData } from "@/data/upskilling/bmsModule1Section2QuizData";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Systems Integrated with BMS - BMS Module 1 Section 2";
const DESCRIPTION = "Learn about HVAC, lighting, and access control integration with Building Management Systems. Communication protocols, energy management, and installation best practices.";

const quickCheckQuestions = [
  {
    id: "hvac-trigger",
    question: "What type of sensor might trigger a BMS to adjust ventilation in a meeting room?",
    options: [
      "Light sensor",
      "CO₂ sensor",
      "Door sensor",
      "Water sensor"
    ],
    correctIndex: 1,
    explanation: "A CO₂ sensor monitors air quality and occupancy levels. When CO₂ rises in a meeting room, the BMS automatically increases ventilation to maintain healthy indoor air quality."
  },
  {
    id: "lighting-savings",
    question: "How does daylight harvesting reduce energy consumption?",
    options: [
      "By turning off all lights at night",
      "By dimming or switching off lights when natural light is sufficient",
      "By using only LED bulbs",
      "By reducing building size"
    ],
    correctIndex: 1,
    explanation: "Daylight harvesting automatically dims or switches off lights when natural daylight is sufficient, reducing energy consumption by up to 40% in perimeter areas."
  },
  {
    id: "fire-safety",
    question: "How can BMS integration improve safety during a fire alarm event?",
    options: [
      "By increasing HVAC output",
      "By locking all doors",
      "By shutting down HVAC to prevent smoke spread and unlocking doors",
      "By turning on all lights"
    ],
    correctIndex: 2,
    explanation: "BMS integration allows automatic shutdown of HVAC to prevent smoke spread and unlocks doors for safe evacuation during fire events."
  },
  {
    id: "modern-integration",
    question: "Give one example of a modern system (outside HVAC/lighting) that can be integrated with a BMS.",
    options: [
      "Manual switches only",
      "Solar PV, battery storage, or EV charging",
      "Pneumatic controls",
      "Basic time clocks"
    ],
    correctIndex: 1,
    explanation: "Modern BMS increasingly integrates with IoT devices, solar PV systems, battery storage, and EV charging to create future-proof, sustainable buildings."
  }
];

const faqs = [
  {
    question: "What is the minimum cable separation between power and data cables?",
    answer: "Power and data cables should be separated by a minimum of 300mm to prevent electromagnetic interference and ensure reliable BMS communication."
  },
  {
    question: "Which protocol is the international standard for BMS (ISO 16484-5)?",
    answer: "BACnet is the ISO 16484-5 compliant international standard for building automation and control networking, widely used in commercial buildings."
  },
  {
    question: "What is the typical payback period for BMS investment in office buildings?",
    answer: "Office buildings typically see a payback period of 3-5 years, with energy savings of 15-30% and maintenance cost reductions of 10-20%."
  }
];

const BMSModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Systems Integrated with BMS
          </h1>
          <p className="text-white/80">
            HVAC, Lighting, and Access Control Integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>HVAC:</strong> Temperature, humidity, CO₂, air quality control</li>
              <li><strong>Lighting:</strong> Scheduling, occupancy, daylight harvesting</li>
              <li><strong>Security:</strong> Access control, CCTV, fire alarm integration</li>
              <li><strong>Protocols:</strong> BACnet, Modbus, LonWorks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sensors, control panels, data cables</li>
              <li><strong>Use:</strong> Integration, troubleshooting, commissioning</li>
              <li><strong>Apply:</strong> Energy savings 15-30%, 3-5 year payback</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify main systems integrated with a BMS",
              "Describe how HVAC, lighting, and access control operate under BMS",
              "Explain benefits of integration for efficiency and safety",
              "Recognise the electrician's role in wiring and connecting systems",
              "Understand communication protocols (BACnet, Modbus, LonWorks)",
              "Apply cost-benefit analysis and ROI calculations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: HVAC Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HVAC Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>HVAC is the largest energy user in most buildings.</strong> BMS connects to sensors
              (temperature, humidity, CO₂) and controls boilers, chillers, fans, and dampers for optimal
              performance and energy efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Control Points</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature control:</strong> Maintaining comfort zones automatically</li>
                  <li><strong>Humidity management:</strong> Preventing condensation and ensuring comfort</li>
                  <li><strong>Air quality monitoring:</strong> CO₂ and indoor air quality sensors</li>
                  <li><strong>Equipment scheduling:</strong> Time-based and occupancy-based operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Example</p>
                <p className="text-sm text-white">
                  <strong>Meeting Room Scenario:</strong> If CO₂ levels rise in a meeting room, the BMS
                  automatically increases ventilation to bring in fresh outside air, maintaining healthy
                  indoor air quality without manual intervention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Lighting Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Systems Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Lighting accounts for a significant share of building energy use.</strong> BMS can
              control lights via schedules, occupancy sensors, and daylight sensors to minimise waste
              whilst ensuring adequate illumination.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Time scheduling:</strong> Automatic on/off based on occupancy patterns</li>
                  <li><strong>Occupancy detection:</strong> Motion sensors trigger lighting activation</li>
                  <li><strong>Daylight harvesting:</strong> Dimming based on natural light levels</li>
                  <li><strong>Emergency lighting:</strong> Monitoring and compliance management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Benefits</p>
                <p className="text-sm text-white">
                  <strong>Daylight Integration:</strong> Automatically dimming or switching off lights
                  when natural daylight is sufficient, reducing energy consumption by up to 40% in
                  perimeter areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Access and Security */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Access and Security Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Integration with door access, CCTV, and alarms enhances safety.</strong> BMS
              coordination provides comprehensive security management and emergency response capabilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Access logging:</strong> Complete audit trail of entry/exit events</li>
                  <li><strong>Automated lighting:</strong> Lights activate with access card use</li>
                  <li><strong>CCTV integration:</strong> Camera activation triggered by access events</li>
                  <li><strong>Alarm coordination:</strong> Integrated response to security breaches</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Fire Safety Integration</p>
                <p className="text-sm text-white">
                  <strong>Emergency Response:</strong> Fire alarm integration allows the BMS to shut down
                  HVAC to prevent smoke spread and unlock doors automatically for safe evacuation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Expanding Integrations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Expanding Integrations (IoT and Renewables)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Modern BMS increasingly integrates with IoT devices and renewable systems.</strong>
              This creates opportunities for future-proofing buildings and achieving sustainability goals.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IoT Integration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Wireless sensors:</strong> Easy retrofit and expansion</li>
                  <li><strong>Smart meters:</strong> Real-time energy monitoring</li>
                  <li><strong>Cloud connectivity:</strong> Remote monitoring and predictive maintenance</li>
                  <li><strong>Mobile interfaces:</strong> Smartphone and tablet control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Renewable Integration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Solar PV:</strong> Energy generation monitoring and optimisation</li>
                  <li><strong>Battery storage:</strong> Load balancing and peak shaving</li>
                  <li><strong>EV charging:</strong> Smart charging based on energy availability</li>
                  <li><strong>Heat pumps:</strong> Efficient heating/cooling integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Communication Protocols */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communication Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BMS systems rely on standardised communication protocols to connect diverse building services.
              Understanding these protocols is essential for proper installation and troubleshooting.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BACnet</p>
                <ul className="text-sm text-white space-y-1">
                  <li>ISO 16484-5 standard</li>
                  <li>Vendor-independent</li>
                  <li>Ethernet, MS/TP, LonTalk</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modbus</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple and robust</li>
                  <li>RS-485 or TCP/IP</li>
                  <li>Master-slave hierarchy</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LonWorks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Peer-to-peer networking</li>
                  <li>Self-healing topology</li>
                  <li>Distributed intelligence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Cost-Benefit Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Cost-Benefit Analysis and ROI
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Investment Costs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>HVAC: £15-25/m²</li>
                  <li>Lighting: £8-15/m²</li>
                  <li>Access: £200-500/door</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Savings</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Energy: 15-30% reduction</li>
                  <li>Maintenance: 10-20% reduction</li>
                  <li>Productivity: 2-5% improvement</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Payback Period</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Offices: 3-5 years</li>
                  <li>Retail: 2-4 years</li>
                  <li>Industrial: 1-3 years</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Business Case Example:</strong> 10,000 m² office building: £200,000 investment,
                £65,000 annual savings, 3.1 year payback, 15-year NPV of £485,000.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Read and understand system wiring diagrams</li>
                <li>Be mindful of low-voltage control and communication cabling</li>
                <li>Ensure correct sensor placement for accurate feedback</li>
                <li>Keep data cables away from power cables (min 300mm separation)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Procedures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify all hardware before software configuration</li>
                <li>Test every I/O point individually</li>
                <li>Verify system interactions and sequences</li>
                <li>Confirm system meets design specifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor cable segregation</strong> — causes EMI interference</li>
                <li><strong>Wrong sensor placement</strong> — leads to inaccurate control</li>
                <li><strong>Missing documentation</strong> — makes troubleshooting difficult</li>
                <li><strong>Skipping point-to-point testing</strong> — hidden faults cause failures later</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety Warning */}
        <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50 mb-10">
          <p className="text-sm text-white">
            <strong className="text-red-400">Legal Requirement:</strong> All BMS electrical work must be
            certified by a competent person. Non-compliance can result in insurance claims being voided
            and legal liability for accidents. BS 7671 compliance is mandatory.
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Core Systems</p>
                <ul className="space-y-0.5">
                  <li>HVAC - Temperature, humidity, air quality</li>
                  <li>Lighting - Scheduling, occupancy, daylight</li>
                  <li>Security - Access, CCTV, fire alarms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 - Electrical safety</li>
                  <li>ISO 16484-5 - BACnet protocol</li>
                  <li>Part L - Energy conservation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-sm text-white/80 mb-6">
            Complete this assessment to test your understanding of BMS system integration concepts.
          </p>
          <SingleQuestionQuiz
            questions={bmsModule1Section2QuizData}
            title="Section 2 Assessment"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default BMSModule1Section2;
