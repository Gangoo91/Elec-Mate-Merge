import { ArrowLeft, ArrowRight, ArrowUpDown, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bridging Systems and Legacy Devices";
const DESCRIPTION = "Integrating older systems with modern smart home platforms for seamless operation";

const quickCheckQuestions = [
  {
    question: "What is a 'bridge' in smart home terminology?",
    options: [
      "A physical network cable",
      "A device that translates between different protocols or systems",
      "A type of light switch",
      "A cloud server"
    ],
    correctAnswer: 1,
    explanation: "A bridge is a device that translates between different protocols or systems, allowing devices that cannot communicate directly to work together. For example, a Hue Bridge translates between Zigbee and Wi-Fi."
  },
  {
    question: "What is a common method for integrating IR-controlled devices into a smart home?",
    options: [
      "Replacing the device entirely",
      "Using an IR blaster that receives smart commands and transmits IR signals",
      "Connecting them directly via Wi-Fi",
      "Using Bluetooth"
    ],
    correctAnswer: 1,
    explanation: "IR blasters receive commands from smart home systems (via Wi-Fi or Zigbee) and transmit infrared signals to legacy devices like TVs, air conditioning units, and audio equipment."
  },
  {
    question: "What challenge might arise when integrating legacy devices with smart systems?",
    options: [
      "Legacy devices become too fast",
      "No feedback on device state - the smart system may not know if commands were received",
      "Increased power consumption of 50%",
      "Legacy devices stop working entirely"
    ],
    correctAnswer: 1,
    explanation: "Many legacy integration methods (especially IR blasters) are one-way communication only. The smart system cannot confirm if the command was received or what the current device state is."
  }
];

const quizQuestions = [
  {
    question: "What does an IR blaster do?",
    options: [
      "Blocks infrared signals",
      "Converts smart commands to infrared signals for legacy devices",
      "Connects devices via Ethernet",
      "Provides backup power"
    ],
    correctAnswer: 1,
    explanation: "IR blasters receive smart home commands (via Wi-Fi or hub) and convert them to infrared signals that legacy devices like TVs, air conditioners, and audio equipment can understand."
  },
  {
    question: "Why might you use a smart relay module?",
    options: [
      "To replace Wi-Fi routers",
      "To add smart control to existing wired switches or appliances",
      "To improve internet speed",
      "To reduce electricity bills"
    ],
    correctAnswer: 1,
    explanation: "Smart relay modules fit behind existing switches or in junction boxes, allowing legacy wired lighting and appliances to be controlled via smart home systems without replacing visible hardware."
  },
  {
    question: "What is a potential issue with using multiple bridges from different manufacturers?",
    options: [
      "They always conflict",
      "Increased complexity and potential for configuration conflicts",
      "They cannot coexist",
      "They slow down Wi-Fi significantly"
    ],
    correctAnswer: 1,
    explanation: "Multiple bridges from different manufacturers add complexity to the system. Each may have its own app, update schedule, and potential for conflicts with other systems or the main hub."
  },
  {
    question: "What should be documented when integrating legacy devices?",
    options: [
      "Only the device serial numbers",
      "Integration method, limitations, and any workarounds used",
      "Just the purchase date",
      "Only the manufacturer contact details"
    ],
    correctAnswer: 1,
    explanation: "Documentation should include how each device was integrated, any limitations (like one-way control), workarounds for common issues, and configuration details for future troubleshooting."
  },
  {
    question: "What is the benefit of using a universal hub like Home Assistant for legacy integration?",
    options: [
      "It eliminates all bridges",
      "It can integrate many different protocols and bridges into one interface",
      "It makes legacy devices faster",
      "It requires no configuration"
    ],
    correctAnswer: 1,
    explanation: "Home Assistant can integrate multiple bridges and protocols into a single interface, allowing unified control and automation across devices that would otherwise require separate apps."
  }
];

const faqs = [
  {
    question: "Can all legacy devices be integrated into smart homes?",
    answer: "Most devices with some form of remote control (IR, RF, wired) can be integrated using appropriate bridges or relays. However, some devices may have limited functionality or one-way control only. Always assess each device individually."
  },
  {
    question: "Is it better to replace legacy devices or integrate them?",
    answer: "It depends on the device age, functionality, and cost. Integration is often more cost-effective for high-quality devices like audio systems or air conditioning. Replacement may be better for unreliable older devices or where full smart functionality is required."
  },
  {
    question: "How do I handle devices that have both IR and app control?",
    answer: "Prefer app/cloud integration where available as it usually provides two-way communication and better functionality. Use IR blasters as backup or for functions not available via the app. Document which method is used for each function."
  }
];

const SmartHomeModule6Section4 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 6`,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 4 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <ArrowUpDown className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Voice Control and Hub Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Bridges</h3>
            <p className="text-sm text-white">Protocol translation devices</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">IR Blasters</h3>
            <p className="text-sm text-white">Control IR-based devices</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Smart Relays</h3>
            <p className="text-sm text-white">Retrofit wired systems</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Limitations</h3>
            <p className="text-sm text-white">One-way control challenges</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Understand different methods for integrating legacy devices into smart systems</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Select appropriate bridging solutions for different device types</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify limitations and workarounds for common integration challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Document integration methods for customer handover and future maintenance</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Understanding Bridges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Bridges
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Bridges are devices that translate between different communication protocols or systems, enabling devices that cannot communicate directly to work together in a unified smart home.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Bridge Types</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Protocol Bridges</h4>
                  <p className="text-white text-sm">
                    Translate between Zigbee, Z-Wave, or Thread devices and Wi-Fi/Ethernet networks. Examples: Philips Hue Bridge, IKEA DIRIGERA.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">IR/RF Bridges</h4>
                  <p className="text-white text-sm">
                    Convert smart commands to infrared or radio frequency signals for legacy devices. Examples: Broadlink, Logitech Harmony.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">API Bridges</h4>
                  <p className="text-white text-sm">
                    Software integrations that connect cloud services or local APIs to smart home platforms. May not require physical hardware.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* IR Blasters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IR Blasters for Legacy Devices
          </h2>
          <div className="space-y-4 text-white">
            <p>
              IR blasters enable smart control of devices that use infrared remote controls, such as TVs, air conditioning units, fans, and audio equipment.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">How IR Blasters Work</h3>
              <ol className="space-y-2 text-white text-sm">
                <li>1. Smart home sends command via Wi-Fi to the IR blaster</li>
                <li>2. IR blaster converts command to infrared signal</li>
                <li>3. Infrared signal transmitted to legacy device</li>
                <li>4. Legacy device responds (power on, change channel, adjust temperature)</li>
              </ol>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Installation Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Line of sight:</strong> IR blaster must have clear line of sight to device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Range:</strong> Typically 5-10 metres depending on model</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Learning:</strong> Most require learning existing remote codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Multiple devices:</strong> One blaster can often control multiple devices</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-white">
                <strong>Limitation:</strong> IR control is typically one-way only. The smart system cannot confirm if commands were received or know the current device state.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Smart Relays */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Smart Relay Modules
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart relay modules add remote control capability to existing wired circuits without replacing visible hardware. They fit behind switches, in junction boxes, or in consumer units.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Applications</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Lighting circuits:</strong> Add smart control whilst keeping existing switches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Boiler controls:</strong> Smart enable/disable of heating systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Immersion heaters:</strong> Scheduled control of water heating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Extract fans:</strong> Humidity-triggered or scheduled operation</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Installation Requirements</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Neutral wire typically required for module power</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Adequate space in back box or junction box</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Load rating must match circuit requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Wi-Fi signal adequate at installation location</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integration Challenges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Integration Challenges and Solutions
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">One-Way Control</h3>
              <p className="text-white text-sm mb-2">
                <strong>Challenge:</strong> Many legacy integrations cannot confirm if commands were received.
              </p>
              <p className="text-white text-sm">
                <strong>Solutions:</strong> Use power monitoring where available, implement "assumed state" with periodic resync commands, or add feedback sensors where practical.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Multiple Apps and Platforms</h3>
              <p className="text-white text-sm mb-2">
                <strong>Challenge:</strong> Each bridge may require its own app and account.
              </p>
              <p className="text-white text-sm">
                <strong>Solutions:</strong> Use a universal hub like Home Assistant to consolidate control, or choose bridges with broad voice assistant compatibility.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Reliability Concerns</h3>
              <p className="text-white text-sm mb-2">
                <strong>Challenge:</strong> Additional devices mean more potential failure points.
              </p>
              <p className="text-white text-sm">
                <strong>Solutions:</strong> Choose quality bridges with good track records, maintain manual backup controls, and document recovery procedures.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Best Practices
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Assessment Checklist</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Inventory all devices to be integrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Identify control methods available (IR, RF, API, wired)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Determine required functionality (on/off, dimming, temperature)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Assess whether replacement may be more appropriate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Check hub/platform compatibility for chosen bridges</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Documentation Requirements</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Device and integration method used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Limitations and known issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Account credentials (where customer consents)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Manual override procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Troubleshooting steps for common issues</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Bridging and Legacy Devices Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-6"
            sectionId="section-4"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voice Control Logic
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-5">
              Troubleshooting Conflicts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule6Section4;
