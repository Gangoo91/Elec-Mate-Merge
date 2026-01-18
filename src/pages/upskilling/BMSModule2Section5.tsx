import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section5QuizData } from "@/data/upskilling/bmsModule2Section5QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "io-modules-check1",
    question: "Why would an I/O module be added to a BMS?",
    options: [
      "To replace a faulty main controller",
      "To provide additional connection points when controller capacity is exceeded",
      "To convert all signals from analog to digital",
      "To reduce the system's power consumption"
    ],
    correctIndex: 1,
    explanation: "I/O modules are added to provide additional connection points for sensors and actuators when the main controller's capacity is exceeded, allowing system expansion without replacing the controller."
  },
  {
    id: "io-modules-check2",
    question: "Give one example of a device connected via an analog output module.",
    options: [
      "A door contact switch",
      "A fire alarm sounder",
      "A modulating valve actuator",
      "A pump status indicator"
    ],
    correctIndex: 2,
    explanation: "Analog output modules connect to devices requiring variable control signals, such as modulating valve actuators that need precise positioning control."
  },
  {
    id: "io-modules-check3",
    question: "What must be configured so the BMS recognises an expansion module?",
    options: [
      "The module's power consumption rating",
      "The module's communication address and point mapping",
      "The module's physical dimensions",
      "The module's colour coding scheme"
    ],
    correctIndex: 1,
    explanation: "Each expansion module must have a unique communication address configured and its input/output points properly mapped in the BMS software so the controller can recognise and communicate with it."
  },
  {
    id: "io-modules-check4",
    question: "Why is labelling important when installing I/O expansion modules?",
    options: [
      "To meet fire safety regulations",
      "For easy identification, maintenance, and troubleshooting",
      "To improve the system's energy efficiency",
      "To reduce electromagnetic interference"
    ],
    correctIndex: 1,
    explanation: "Clear labelling is essential for easy identification, maintenance, and troubleshooting, especially in I/O panels that contain many modules and terminations. It helps technicians quickly locate and work on specific points."
  }
];

const faqs = [
  {
    question: "When should I use I/O expansion modules instead of upgrading the controller?",
    answer: "Use expansion modules when you need additional I/O capacity, when equipment is far from the main controller (distributed architecture), or for future-proofing. They're more cost-effective than controller upgrades for moderate capacity increases."
  },
  {
    question: "What's the difference between local and central module installation?",
    answer: "Local installation places modules near the equipment they serve, reducing cable runs and improving signal quality. Central installation keeps modules in main panels for easier maintenance access and better environmental protection."
  },
  {
    question: "How do I set a unique address on an expansion module?",
    answer: "Most modules use DIP switches or rotary switches for physical addressing. Each module on the same network must have a unique address. Check the manufacturer's documentation for the specific addressing range and method."
  },
  {
    question: "What communication protocols do expansion modules use?",
    answer: "Common protocols include BACnet (BACnet/IP or MS/TP), Modbus (RTU or TCP), LonWorks, and manufacturer-specific proprietary protocols. The protocol must match your main controller's capabilities."
  }
];

const BMSModule2Section5 = () => {
  useSEO({
    title: "I/O Modules and Expansion Devices | BMS Module 2.5",
    description: "Learn about I/O modules and expansion devices in Building Management Systems. Understand system expansion, digital/analog modules, and installation requirements."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-2">
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
            <span>Module 2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            I/O Modules and Expansion Devices
          </h1>
          <p className="text-white">
            Expanding BMS controller capacity with additional input/output modules
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Extend controller capacity cost-effectively</li>
              <li><strong>Types:</strong> DI, DO, AI, AO modules for different signals</li>
              <li><strong>Protocols:</strong> BACnet, Modbus, LonWorks, proprietary</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> When controller runs out of I/O points</li>
              <li><strong>Use:</strong> Local installation near equipment</li>
              <li><strong>Configure:</strong> Unique address and point mapping</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Purpose of I/O modules and expansion devices in BMS",
              "When expansion modules are needed",
              "How digital and analog signals are extended",
              "Electrician's role in installing and wiring I/O modules"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose of I/O Modules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of I/O Modules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A BMS controller can only handle a limited number of inputs and outputs (I/O). To manage larger or more
              complex systems, additional I/O modules and expansion devices are used to extend capacity without
              replacing the main controller.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacity extension:</strong> Add connection points when controller I/O is exceeded</li>
                <li><strong>Distributed architecture:</strong> Install locally to reduce cable runs</li>
                <li><strong>Cost-effective:</strong> More economical than replacing the main controller</li>
                <li><strong>System flexibility:</strong> Allow future expansion without major changes</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Local Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Near equipment being controlled</li>
                  <li>Reduces cable runs and costs</li>
                  <li>Improves signal quality and reliability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>In main control panels</li>
                  <li>Easier maintenance and access</li>
                  <li>Better environmental protection</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Expansion is Needed:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Controller capacity exceeded:</strong> Insufficient I/O points for project requirements</li>
                <li><strong>Future-proofing:</strong> Anticipating system growth</li>
                <li><strong>Distributed control:</strong> Equipment far from main controller</li>
                <li><strong>Retrofit projects:</strong> Adding to existing systems</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Types of Expansion Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Expansion Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of I/O modules handle specific signal types and control functions. Understanding each
              type helps in selecting the correct module for specific applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Input Modules</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Applications:</strong> Door contacts, pump status, alarms</li>
                  <li><strong>Signals:</strong> Dry contacts, 24V DC/AC, voltage-free</li>
                  <li><strong>Capacity:</strong> 8, 16, or 32 inputs per module</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Output Modules</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Functions:</strong> Pump starters, fan contactors, lighting</li>
                  <li><strong>Types:</strong> Relay, transistor (24V), triac (240V)</li>
                  <li><strong>Ratings:</strong> Typically 2A to 10A per channel</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analog Input Modules</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Sensors:</strong> Temperature (NTC, RTD), humidity, CO₂</li>
                  <li><strong>Signals:</strong> 0-10V DC, 4-20mA, resistance</li>
                  <li><strong>Resolution:</strong> 12-bit to 16-bit conversion</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analog Output Modules</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Applications:</strong> Modulating valves, dampers, VSDs</li>
                  <li><strong>Signals:</strong> 0-10V DC, 4-20mA current loop</li>
                  <li><strong>Control:</strong> 0-100% modulation with high resolution</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Communication and Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Communication and Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Expansion modules must communicate effectively with the main BMS controller using standardised
              protocols and proper addressing schemes for reliable system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BACnet:</strong> Open standard for commercial buildings (IP or MS/TP over RS-485)</li>
                <li><strong>Modbus:</strong> Simple, robust protocol (RTU serial or TCP Ethernet)</li>
                <li><strong>LonWorks:</strong> ISO/IEC standard with built-in networking</li>
                <li><strong>Proprietary:</strong> Manufacturer-specific, optimised but limited interoperability</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Addressing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>DIP switches or rotary switches on module</li>
                  <li>Each module needs unique address</li>
                  <li>Address range defined by protocol</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Software Configuration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Point mapping in BMS software</li>
                  <li>Signal type and range configuration</li>
                  <li>Alarm and trending setup</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Network Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable requirements:</strong> Cat5e for Ethernet, screened twisted pair for RS-485</li>
                <li><strong>Network topology:</strong> Follow protocol requirements (daisy-chain, star, ring)</li>
                <li><strong>Termination:</strong> Proper line termination essential for serial communication</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: Installation and Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation and Electrician's Role
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper installation of I/O modules requires careful attention to power supply, wiring practices,
              and system integration to ensure reliable operation and ease of maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power supply:</strong> Confirm correct voltage (typically 24V DC/AC) and adequate current</li>
                <li><strong>Wiring segregation:</strong> Keep power and signal wiring separate</li>
                <li><strong>Environmental protection:</strong> Appropriate IP rating for location</li>
                <li><strong>Earthing and screening:</strong> Proper earthing and signal cable screening</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Critical Installation Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wire according to manufacturer datasheets</li>
                  <li>Set unique communication addresses</li>
                  <li>Use correct cable types and sizes</li>
                  <li>Verify output load ratings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling and Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clear module identification labels</li>
                  <li>Terminal marking with point numbers</li>
                  <li>Comprehensive cable schedules</li>
                  <li>As-built documentation for maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning and Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Communication testing:</strong> Verify all modules are recognised by controller</li>
                <li><strong>I/O point testing:</strong> Test all inputs and outputs individually</li>
                <li><strong>Signal quality:</strong> Measure analog signals are within expected ranges</li>
                <li><strong>Integration:</strong> Work with commissioning engineers for system integration</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check if the system design requires extra I/O before starting work</li>
                <li>Install expansion modules close to the equipment they serve</li>
                <li>Work closely with commissioning engineers to verify all points</li>
                <li>Keep wiring tidy and well-labelled — clarity is vital</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Duplicate addresses</strong> — each module must have a unique address</li>
                <li><strong>Overloading outputs</strong> — always check current ratings</li>
                <li><strong>Poor labelling</strong> — makes future maintenance difficult</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">University Campus Expansion</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Problem:</strong> Main BMS controller ran out of analog inputs when extra CO₂ sensors were added to more classrooms during construction.</p>
              <p><strong>Solution:</strong> An analog input expansion module was installed in the plant room panel, configured with a unique BACnet address and connected via the existing RS-485 network.</p>
              <p><strong>Result:</strong> The BMS could monitor all classrooms without replacing the main controller. The 16 additional analog inputs cost a fraction of a controller upgrade, and installation was completed on schedule.</p>
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
              <p className="font-medium text-elec-yellow/80 mb-1">Module Types</p>
              <ul className="space-y-0.5">
                <li>DI: Door contacts, status signals</li>
                <li>DO: Starters, contactors, lighting</li>
                <li>AI: Temperature, humidity, CO₂</li>
                <li>AO: Modulating valves, dampers, VSDs</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Common Protocols</p>
              <ul className="space-y-0.5">
                <li>BACnet: IP or MS/TP (RS-485)</li>
                <li>Modbus: RTU (serial) or TCP (Ethernet)</li>
                <li>LonWorks: ISO/IEC standard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section5QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-2-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section5;
