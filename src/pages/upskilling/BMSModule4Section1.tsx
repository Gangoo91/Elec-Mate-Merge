import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule4Section1QuizData } from "@/data/upskilling/bmsModule4Section1QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "dali-flexibility",
    question: "Why is DALI more flexible than traditional on/off lighting control?",
    options: [
      "It uses higher voltage for brighter lights",
      "Individual addressability and digital feedback enable sophisticated control",
      "It requires less wiring than standard systems",
      "It operates without any controller"
    ],
    correctIndex: 1,
    explanation: "DALI allows each lighting fitting to be individually addressed and controlled, enabling sophisticated strategies like automatic daylight compensation, individual dimming, and real-time status monitoring, unlike simple on/off systems that only provide basic switching functionality."
  },
  {
    id: "1-10v-feedback",
    question: "Why can't a 1-10V system provide feedback on lamp failures?",
    options: [
      "The voltage is too low for status signals",
      "Analog signals only flow one direction without digital feedback capability",
      "The protocol doesn't support LEDs",
      "It requires special sensors"
    ],
    correctIndex: 1,
    explanation: "1-10V systems use simple analog voltage control signals that only flow in one direction (from controller to driver). They lack the bidirectional digital communication required to send status information back from individual fittings to the control system."
  },
  {
    id: "smart-lighting-advantage",
    question: "What is one advantage of smart lighting compared to wired protocols like DALI?",
    options: [
      "Lower initial cost",
      "Easily scalable without rewiring",
      "No network infrastructure needed",
      "Simpler commissioning process"
    ],
    correctIndex: 1,
    explanation: "Smart lighting systems use wireless or network-based communication, allowing new fixtures, sensors, and controls to be added without installing additional control wiring, making expansion and reconfiguration much simpler and more cost-effective."
  },
  {
    id: "warehouse-protocol",
    question: "Which lighting protocol would you choose for a small warehouse with simple dimming needs?",
    options: [
      "DALI for individual control",
      "Smart lighting for analytics",
      "1-10V dimming systems for reliability and cost",
      "PoE lighting for data integration"
    ],
    correctIndex: 2,
    explanation: "For a small warehouse with simple dimming requirements, 1-10V systems are ideal because they offer reliable, cost-effective group dimming control with minimal installation complexity and very low maintenance requirements."
  }
];

const faqs = [
  {
    question: "What is the maximum number of devices on a single DALI loop?",
    answer: "A single DALI loop supports up to 64 individual devices, each with a unique address from 0-63. For larger installations, multiple loops can be controlled through DALI gateways."
  },
  {
    question: "Can DALI and 1-10V systems be mixed in the same building?",
    answer: "Yes, different lighting protocols can coexist in the same building using multi-protocol gateways. DALI might control open offices, 1-10V for warehouses, and smart lighting for meeting rooms - all integrated through a central BMS."
  },
  {
    question: "What cable type should be used for 1-10V dimming control?",
    answer: "Screened/shielded low voltage cable should be used, with proper segregation from mains power circuits. The screen should be earthed at one end only to prevent ground loops and EMI interference."
  },
  {
    question: "How do smart lighting systems handle network failures?",
    answer: "Well-designed smart systems include failsafe modes - lights typically default to full brightness or last known state if network communication fails. Local manual override capability is essential for critical areas."
  }
];

const BMSModule4Section1 = () => {
  useSEO({
    title: "DALI, 1-10V, and Smart Lighting Integration | BMS Module 4.1",
    description: "Master DALI, 1-10V dimming, and smart lighting integration with BMS. Learn lighting control protocols, wiring techniques, and commissioning procedures for optimal energy efficiency."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integration with DALI, 1-10V, and Smart Lighting
          </h1>
          <p className="text-white/80">
            Intelligent lighting control protocols and BMS integration methods
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>DALI:</strong> Digital, 64 devices/loop, bidirectional</li>
              <li><strong>1-10V:</strong> Analog, group control, no feedback</li>
              <li><strong>Smart:</strong> Wireless/IP, scalable, IoT integration</li>
              <li><strong>Selection:</strong> Match protocol to application needs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> DALI gateways, control cables, wireless nodes</li>
              <li><strong>Use:</strong> Energy efficiency, occupant comfort, fault monitoring</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "DALI, 1-10V, and smart lighting principles",
              "Integration methods for each protocol",
              "Wiring and commissioning techniques",
              "Protocol advantages and limitations",
              "Selection criteria for projects",
              "Troubleshooting common issues",
              "BMS integration architecture",
              "Hybrid system design approaches"
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
            DALI Systems and Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI (Digital Addressable Lighting Interface) represents the gold standard for intelligent lighting control.
              As an international standard (IEC 62386), DALI enables sophisticated control strategies through its digital
              communication protocol with bidirectional feedback capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Technical Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Device Capacity:</strong> 64 devices per loop, individual control</li>
                <li><strong>Wiring:</strong> Two-wire bus, polarity-free, simple installation</li>
                <li><strong>Communication:</strong> Bidirectional digital, status feedback</li>
                <li><strong>Dimming:</strong> 254 levels, logarithmic for smooth perception</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Individual addressability</li>
                  <li>Flexible overlapping groups</li>
                  <li>Fault monitoring and reporting</li>
                  <li>Scene control capability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li>DALI Gateway with BMS protocol</li>
                  <li>16V DC Bus Power Supply</li>
                  <li>DALI-compatible LED drivers</li>
                  <li>Commissioning software</li>
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
            1-10V Dimming Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 1-10V dimming standard provides a cost-effective, reliable method for lighting control using analog
              voltage signals. While less sophisticated than DALI, 1-10V systems offer excellent reliability and wide
              industry compatibility for applications requiring simple, robust dimming.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">1-10V Technical Parameters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signal Range:</strong> 1V (minimum) to 10V (maximum brightness)</li>
                <li><strong>Wiring:</strong> Separate control and mains circuits required</li>
                <li><strong>Current:</strong> Typically 100μA maximum control current</li>
                <li><strong>Cable:</strong> Screened/shielded low voltage cable required</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple, proven technology</li>
                  <li>Cost-effective implementation</li>
                  <li>Wide industry compatibility</li>
                  <li>Minimal commissioning needed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>No individual fitting control</li>
                  <li>No status feedback capability</li>
                  <li>Group-based control only</li>
                  <li>Susceptible to EMI</li>
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
            Smart Lighting Integration Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart lighting represents the cutting edge of lighting control, utilising wireless communication protocols
              and IP networking for highly flexible, scalable systems. These solutions eliminate traditional control
              wiring whilst providing unprecedented integration capabilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wireless Protocols</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Zigbee 3.0:</strong> Mesh network, 10-100m, self-healing</li>
                  <li><strong>Bluetooth Mesh:</strong> Smartphone integration, fast setup</li>
                  <li><strong>Wi-Fi 6:</strong> High bandwidth, existing infrastructure</li>
                  <li><strong>PoE:</strong> Power + data single cable, 100m</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wireless commissioning via apps</li>
                  <li>Real-time energy analytics</li>
                  <li>Predictive maintenance</li>
                  <li>Cloud-based management</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Security and Infrastructure Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Network vulnerability to cyber attacks</li>
                <li>Encryption key management complexity</li>
                <li>IT department coordination essential</li>
                <li>Backup power systems for network equipment</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protocol Selection and Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the appropriate lighting control protocol requires careful consideration of project requirements,
              budget constraints, functionality needs, and long-term maintenance implications.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Office Buildings</p>
                <p className="text-white/90 text-xs">DALI + Smart hybrid</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Industrial</p>
                <p className="text-white/90 text-xs">1-10V for reliability</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Retail</p>
                <p className="text-white/90 text-xs">Smart for flexibility</p>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: London Office Hybrid Integration</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Challenge:</strong> Prestigious London office requiring sophisticated lighting control for diverse
                workspace requirements whilst achieving aggressive energy efficiency targets. Multiple protocol integration needed.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Implementation</p>
                <ul className="space-y-1">
                  <li>DALI: 6 loops, 240 panels open-plan</li>
                  <li>1-10V: Corridors, storage, plant rooms</li>
                  <li>Bluetooth Mesh: 18 meeting rooms</li>
                  <li>Multi-protocol gateway integration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Results</p>
                <ul className="space-y-1">
                  <li>30% energy reduction achieved</li>
                  <li>25% improved satisfaction scores</li>
                  <li>40% fewer service calls</li>
                  <li>Seamless BMS integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">DALI</p>
              <ul className="space-y-0.5">
                <li>64 devices/loop</li>
                <li>Bidirectional comms</li>
                <li>Individual control</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">1-10V</p>
              <ul className="space-y-0.5">
                <li>Group control only</li>
                <li>Screened cable</li>
                <li>Low cost/reliable</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Smart</p>
              <ul className="space-y-0.5">
                <li>Wireless/IP based</li>
                <li>Scalable</li>
                <li>IT integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule4Section1QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule4Section1;
