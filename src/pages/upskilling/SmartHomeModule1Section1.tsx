import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What is a Smart Home? - Smart Home Technology Module 1 Section 1";
const DESCRIPTION = "Learn about smart home technology, communication protocols, benefits, and implementation strategies. Understand Zigbee, Z-Wave, Wi-Fi connectivity and automation systems.";

const quickCheckQuestions = [
  {
    id: "smart-home-definition",
    question: "What is a smart home?",
    options: [
      "A home with expensive appliances",
      "A residence with interconnected devices that automate and control functions",
      "A home with internet access only",
      "A home with voice assistants only"
    ],
    correctIndex: 1,
    explanation: "A smart home integrates interconnected devices and systems to provide automation, monitoring, and control capabilities for lighting, heating, security, and other functions."
  },
  {
    id: "smart-home-protocols",
    question: "Which protocols are commonly used for smart home device communication?",
    options: [
      "HTTP and FTP only",
      "Zigbee, Z-Wave, Wi-Fi, and Bluetooth",
      "TCP/IP exclusively",
      "Ethernet cables only"
    ],
    correctIndex: 1,
    explanation: "Zigbee, Z-Wave, Wi-Fi, and Bluetooth are the most common communication protocols used in smart homes due to their reliability and suitability for different applications."
  },
  {
    id: "smart-home-benefits",
    question: "What are the primary benefits of smart home systems?",
    options: [
      "Higher electricity bills",
      "More complex manual controls",
      "Energy efficiency, enhanced security, convenience, and accessibility",
      "Reduced device functionality"
    ],
    correctIndex: 2,
    explanation: "Smart homes offer energy efficiency through intelligent automation, enhanced security with integrated monitoring, convenience through remote control, and accessibility benefits for all users."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the definition of a smart home according to modern standards?",
    options: [
      "A home with expensive appliances",
      "A residence that uses interconnected devices and systems to automate, monitor, and control functions",
      "A home with internet access only",
      "A home with voice assistants only"
    ],
    correctAnswer: 1,
    explanation: "A smart home integrates interconnected devices and systems to provide automation, monitoring, and control capabilities for lighting, heating, security, and other functions through various communication protocols."
  },
  {
    id: 2,
    question: "Which communication protocol is most commonly used for smart home device interconnection?",
    options: [
      "HTTP only",
      "FTP protocol",
      "Zigbee and Z-Wave mesh networks",
      "TCP/IP exclusively"
    ],
    correctAnswer: 2,
    explanation: "Zigbee and Z-Wave are the most common communication protocols used in smart homes due to their mesh networking capabilities, low power consumption, and reliability for home automation."
  },
  {
    id: 3,
    question: "What are the three core component categories of a smart home system?",
    options: [
      "Devices, protocols, and interfaces",
      "Hardware, software, and internet",
      "Sensors, actuators, and displays",
      "Wi-Fi, Bluetooth, and cellular"
    ],
    correctAnswer: 0,
    explanation: "Smart home systems consist of smart devices (sensors, actuators, hubs), communication protocols (Zigbee, Z-Wave, Wi-Fi), and control interfaces (smartphones, tablets, voice assistants)."
  },
  {
    id: 4,
    question: "What is the primary energy management benefit of smart home systems?",
    options: [
      "Increased energy consumption monitoring",
      "Optimised energy use through intelligent automation and scheduling",
      "Manual control of all electrical devices",
      "Higher electricity consumption tracking"
    ],
    correctAnswer: 1,
    explanation: "Smart homes enable optimised energy use through intelligent controls like smart thermostats, automated lighting schedules, and load management, which can significantly reduce overall energy consumption."
  },
  {
    id: 5,
    question: "Which accessibility feature makes smart homes particularly beneficial for elderly or disabled users?",
    options: [
      "Complex control panel systems",
      "Voice control and automated assistance features",
      "Manual switches and traditional controls",
      "Reduced device functionality"
    ],
    correctAnswer: 1,
    explanation: "Voice control and automated assistance features make smart homes particularly beneficial for elderly or disabled users who may have difficulty with traditional manual controls."
  },
  {
    id: 6,
    question: "What is a significant challenge in smart home adoption?",
    options: [
      "Devices are too simple to use",
      "Interoperability issues between different manufacturer systems",
      "Low initial costs",
      "Unlimited internet connectivity"
    ],
    correctAnswer: 1,
    explanation: "Interoperability issues between different manufacturer systems remain a significant challenge, though new standards like Matter are working to address this problem."
  },
  {
    id: 7,
    question: "What security consideration is most important in smart home implementation?",
    options: [
      "Physical lock mechanisms only",
      "Network security and data privacy protection",
      "Traditional alarm systems",
      "Manual security monitoring"
    ],
    correctAnswer: 1,
    explanation: "Network security and data privacy protection are crucial in smart homes as connected devices can be vulnerable to cyber attacks and data breaches if not properly secured."
  },
  {
    id: 8,
    question: "Which smart home system provides the most immediate safety benefits?",
    options: [
      "Entertainment systems",
      "Smart lighting automation",
      "Integrated security and monitoring systems",
      "Climate control systems"
    ],
    correctAnswer: 2,
    explanation: "Integrated security and monitoring systems provide immediate safety benefits through features like CCTV, smart locks, motion sensors, and emergency alert systems."
  },
  {
    id: 9,
    question: "What is the typical approach for existing homes to become smart homes?",
    options: [
      "Complete electrical system replacement",
      "Gradual retrofit with compatible devices and systems",
      "Building demolition and reconstruction",
      "Installation of single-brand ecosystems only"
    ],
    correctAnswer: 1,
    explanation: "Most existing homes become smart through gradual retrofit approaches, adding compatible devices and systems over time rather than complete system replacement."
  },
  {
    id: 10,
    question: "What role does artificial intelligence play in advanced smart home systems?",
    options: [
      "Only voice recognition functions",
      "Learning user patterns and predictive automation",
      "Basic timer functions only",
      "Manual programming assistance"
    ],
    correctAnswer: 1,
    explanation: "AI in smart homes enables learning user patterns, predictive automation, adaptive climate control, and personalised automation based on habits and preferences."
  }
];

const faqs = [
  {
    question: "What is the difference between a smart home and a connected home?",
    answer: "A connected home simply has devices that can connect to the internet, while a smart home has interconnected devices that can communicate with each other and be automated to work together as an integrated system. Smart homes feature automation, learning capabilities, and centralised control."
  },
  {
    question: "Do I need to rewire my entire house to make it smart?",
    answer: "No, most smart home devices can be retrofitted into existing homes using wireless protocols like Zigbee, Z-Wave, or Wi-Fi. Basic smart home functionality can be achieved without any rewiring. However, some advanced features may require additional wiring in specific areas."
  },
  {
    question: "Are smart homes secure from cyber attacks?",
    answer: "Smart homes can be secure when properly configured with strong, unique passwords, regular firmware updates, and network segmentation. Best practices include using WPA3 Wi-Fi encryption, enabling two-factor authentication, keeping devices updated, and creating a separate network for IoT devices."
  },
  {
    question: "What happens to my smart home if the internet goes down?",
    answer: "Many smart home systems have local processing capabilities and can continue basic functions during internet outages. Systems using Zigbee, Z-Wave, or local hubs can maintain automation between connected devices. However, remote access and cloud-dependent features will be unavailable."
  },
  {
    question: "How much does it cost to convert a home to a smart home?",
    answer: "Costs vary widely depending on the scope. Basic smart lighting and thermostat installations can start from around 500 pounds, while comprehensive whole-home automation systems can cost 5000 to 15000 pounds or more. A phased approach allows spreading costs over time."
  },
  {
    question: "Which smart home protocol should I choose?",
    answer: "The choice depends on your specific needs: Zigbee is excellent for battery-powered sensors with its low power consumption. Z-Wave offers good range and less interference with Wi-Fi. Wi-Fi provides high bandwidth and easy setup. For future compatibility, look for devices supporting Matter/Thread standards."
  }
];

const SmartHomeModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/smart-home-module-1">
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
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What is a Smart Home?
          </h1>
          <p className="text-white/80">
            Introduction to smart home technology, protocols, and intelligent automation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Interconnected devices automating home functions</li>
              <li><strong>Protocols:</strong> Zigbee, Z-Wave, Wi-Fi, Bluetooth</li>
              <li><strong>Benefits:</strong> Energy savings, security, convenience</li>
              <li><strong>Control:</strong> Apps, voice assistants, automation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Smart hubs, sensors, connected devices</li>
              <li><strong>Use:</strong> System design, device selection, integration</li>
              <li><strong>Apply:</strong> Retrofit planning, new build specifications</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what constitutes a smart home and identify its core components",
              "Explain key communication protocols (Zigbee, Z-Wave, Wi-Fi, Bluetooth)",
              "Analyse the benefits of smart homes for energy efficiency and convenience",
              "Evaluate security and accessibility advantages of smart home systems",
              "Identify common challenges and limitations in smart home implementation",
              "Assess compatibility and interoperability considerations for devices"
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

        {/* Section 1: Smart Home Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a Smart Home?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A smart home is a residence equipped with interconnected devices and systems that use internet
              connectivity, sensors, and automation to monitor, control, and optimise various household functions
              including lighting, heating, ventilation, security, and entertainment systems.
            </p>

            <p>
              These systems can be controlled remotely via smartphones, tablets, or voice commands, and can
              learn from user behaviour to automatically adjust settings for optimal comfort, security, and energy efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of smart homes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Interconnected devices that communicate with each other</li>
                <li>Centralised or distributed control systems</li>
                <li>Remote access and monitoring capabilities</li>
                <li>Automation based on schedules, sensors, or AI</li>
                <li>Integration with voice assistants and mobile apps</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Traditional vs Smart Homes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Traditional vs Smart Homes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Traditional Homes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Manual control of all systems</li>
                  <li>Individual device operation</li>
                  <li>No central coordination</li>
                  <li>Limited automation capabilities</li>
                  <li>Higher energy waste potential</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Homes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automated system control</li>
                  <li>Integrated device communication</li>
                  <li>Centralised management</li>
                  <li>Advanced automation and AI</li>
                  <li>Optimised energy efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Communication Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Communication Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart home devices communicate using various wireless protocols, each with specific advantages
              for different applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zigbee</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Low power mesh network</li>
                  <li>2.4GHz frequency band</li>
                  <li>Excellent for battery-powered sensors</li>
                  <li>Self-healing network capability</li>
                  <li>Range: 10-20 metres indoors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Z-Wave</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sub-1GHz frequency (less interference)</li>
                  <li>Mesh networking topology</li>
                  <li>Maximum 232 devices per network</li>
                  <li>Excellent wall penetration</li>
                  <li>Range: 30+ metres outdoors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wi-Fi</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High bandwidth capability</li>
                  <li>Direct internet connectivity</li>
                  <li>Uses existing infrastructure</li>
                  <li>Higher power consumption</li>
                  <li>Range: 30-50 metres indoors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bluetooth/Thread</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Low energy protocols</li>
                  <li>Direct device pairing</li>
                  <li>Emerging standards (Matter)</li>
                  <li>Good for personal devices</li>
                  <li>Range: 5-10 metres typically</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Benefits and Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benefits and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency</p>
                <p className="text-sm text-white">
                  Automated lighting, heating, and cooling systems can reduce energy consumption by 20-30%
                  through intelligent scheduling and occupancy detection.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enhanced Security</p>
                <p className="text-sm text-white">
                  Integrated CCTV, smart locks, motion sensors, and alarm systems provide comprehensive
                  security monitoring and remote access control.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Convenience and Comfort</p>
                <p className="text-sm text-white">
                  Voice control, automated routines, and predictive adjustments create personalised
                  living environments that adapt to user preferences.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accessibility Support</p>
                <p className="text-sm text-white">
                  Voice control, automated assistance, and remote monitoring capabilities particularly
                  benefit elderly or disabled users.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Application Areas:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Climate Control:</strong> Smart thermostats, zone control, automated ventilation</li>
                <li><strong>Lighting Systems:</strong> Automated dimming, colour control, occupancy sensing</li>
                <li><strong>Security and Access:</strong> Smart locks, video doorbells, CCTV integration</li>
                <li><strong>Entertainment:</strong> Multi-room audio, smart TVs, streaming integration</li>
                <li><strong>Appliance Control:</strong> Smart kitchen appliances, washing machines, robot vacuums</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Challenges and Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Challenges and Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Challenges:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Interoperability Issues:</strong> Different manufacturers often use incompatible protocols</li>
                <li><strong>Security Vulnerabilities:</strong> Connected devices can be entry points for cyber attacks</li>
                <li><strong>High Initial Costs:</strong> Smart devices and installation require significant investment</li>
                <li><strong>Complexity:</strong> Multiple apps and configuration can overwhelm non-technical users</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Phased Approach:</strong> Start with core systems and gradually expand</li>
                <li><strong>Protocol Standardisation:</strong> Choose devices supporting Matter/Thread for compatibility</li>
                <li><strong>Professional Installation:</strong> Consider professional setup for complex systems</li>
                <li><strong>Security First:</strong> Implement strong passwords, updates, and network segmentation</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Smart Home Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess client needs and budget before recommending systems</li>
                <li>Consider existing infrastructure and retrofit requirements</li>
                <li>Evaluate protocol compatibility for future expansion</li>
                <li>Plan network infrastructure for reliable connectivity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document all device locations and network configurations</li>
                <li>Test mesh network coverage throughout the property</li>
                <li>Configure security settings before handover</li>
                <li>Provide user training on system operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing incompatible protocols</strong> - causes integration headaches</li>
                <li><strong>Poor Wi-Fi planning</strong> - results in unreliable device connections</li>
                <li><strong>Ignoring security</strong> - leaves systems vulnerable to attacks</li>
                <li><strong>Over-complicating systems</strong> - frustrates users and reduces adoption</li>
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

        {/* Reference Card */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Protocol Comparison</p>
                <ul className="space-y-0.5">
                  <li>Zigbee: Low power, mesh, sensors</li>
                  <li>Z-Wave: Long range, less interference</li>
                  <li>Wi-Fi: High bandwidth, existing infrastructure</li>
                  <li>Thread/Matter: Future standard, interoperability</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Benefits</p>
                <ul className="space-y-0.5">
                  <li>20-30% energy savings potential</li>
                  <li>Enhanced security monitoring</li>
                  <li>Improved accessibility</li>
                  <li>Remote control and automation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="/electrician/upskilling/smart-home-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default SmartHomeModule1Section1;
