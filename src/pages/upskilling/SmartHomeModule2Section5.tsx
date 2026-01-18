import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hub vs Hubless Ecosystems";
const DESCRIPTION = "Understanding centralised and distributed smart home architectures";

const quickCheckQuestions = [
  {
    question: "What is the main function of a smart home hub?",
    options: ["Provide internet access", "Act as a central controller for devices", "Boost Wi-Fi signal", "Store video recordings"],
    correctIndex: 1,
    explanation: "A smart home hub acts as a central controller, translating between different protocols and enabling devices to work together through a unified interface."
  },
  {
    question: "What is a key advantage of hubless Wi-Fi devices?",
    options: ["Lower power consumption", "Better security", "Simpler installation", "Longer range"],
    correctIndex: 2,
    explanation: "Hubless Wi-Fi devices connect directly to the home router, requiring no additional hardware purchase or configuration, making installation simpler for basic setups."
  },
  {
    question: "Which emerging standard aims to reduce the need for protocol-specific hubs?",
    options: ["Zigbee 3.0", "Z-Wave Plus", "Matter", "Bluetooth 5.0"],
    correctIndex: 2,
    explanation: "Matter provides a unified application layer that works across multiple protocols and ecosystems, reducing the need for proprietary hubs and bridges."
  }
];

const quizQuestions = [
  {
    question: "What happens to Zigbee devices if the hub loses power?",
    options: ["They continue working independently", "They stop responding to commands", "They switch to Wi-Fi automatically", "They maintain local automation only"],
    correctIndex: 1,
    explanation: "Zigbee devices require the hub (coordinator) to process commands. Without the hub, devices cannot receive instructions or report status."
  },
  {
    question: "Which type of system offers the best local processing capability?",
    options: ["Cloud-only hubless systems", "Hub-based systems with local processing", "Wi-Fi direct devices", "Bluetooth-only devices"],
    correctIndex: 1,
    explanation: "Hub-based systems with local processing can run automations and respond to events without internet connectivity, providing the most reliable local operation."
  },
  {
    question: "What is a disadvantage of cloud-dependent hubless devices?",
    options: ["Higher upfront cost", "Complex installation", "Dependency on internet and vendor servers", "Limited device compatibility"],
    correctIndex: 2,
    explanation: "Cloud-dependent devices require constant internet connectivity and rely on vendor servers. If the vendor discontinues service, devices may become unusable."
  },
  {
    question: "Which hub supports both Zigbee and Z-Wave natively?",
    options: ["Philips Hue Bridge", "Amazon Echo Dot", "SmartThings Hub", "Google Nest Hub"],
    correctIndex: 2,
    explanation: "SmartThings Hub includes both Zigbee and Z-Wave radios, allowing it to communicate with devices using either protocol without additional bridges."
  },
  {
    question: "What is the recommended approach for a customer with mixed protocol preferences?",
    options: ["Choose one protocol only", "Use a multi-protocol hub", "Install separate systems", "Wait for Matter"],
    correctIndex: 1,
    explanation: "A multi-protocol hub allows mixing devices from different protocols under one control system, providing flexibility while maintaining unified automation."
  }
];

const faqs = [
  {
    question: "Should I recommend a hub-based or hubless system?",
    answer: "For basic setups (under 10 devices, single ecosystem), hubless Wi-Fi devices are simpler. For larger installations, multi-protocol needs, or advanced automation, hub-based systems offer more capability and reliability."
  },
  {
    question: "What happens if my smart home vendor goes out of business?",
    answer: "Cloud-dependent hubless devices may become unusable. Hub-based systems with local processing continue working. Open-source hubs like Home Assistant provide the most protection against vendor lock-in."
  },
  {
    question: "Can I start hubless and add a hub later?",
    answer: "Yes. Many Wi-Fi devices can be integrated into hub systems. However, some cloud-only devices cannot be moved to local control. Check compatibility before purchasing."
  }
];

const SmartHomeModule2Section5 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 2`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="/electrician/upskilling/smart-home-module-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 5 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Hub-Based</p>
            <p className="text-white text-sm">Centralised control, multi-protocol support, local processing</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Hubless</p>
            <p className="text-white text-sm">Simpler setup, direct Wi-Fi connection, cloud-dependent</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Understand the role and function of smart home hubs",
              "Compare hub-based and hubless system architectures",
              "Identify appropriate scenarios for each approach",
              "Explain the impact of Matter on hub requirements"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What is a Smart Home Hub */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What is a Smart Home Hub?
          </h2>
          <p className="text-white mb-4">
            A smart home hub is a dedicated device that acts as the central brain of a smart home system. It communicates with individual devices using their native protocols and provides a unified interface for control and automation.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Protocol Translation</p>
              <p className="text-white text-sm">Hubs translate between protocols (Zigbee, Z-Wave, Wi-Fi) enabling devices from different technologies to work together.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Automation Engine</p>
              <p className="text-white text-sm">Hubs process automation rules locally, triggering actions based on sensor inputs, schedules, or conditions without cloud dependency.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Unified Interface</p>
              <p className="text-white text-sm">A single app controls all devices regardless of manufacturer, simplifying the user experience.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Point</p>
            <p className="text-white text-sm">The hub is a single point of failure. If it loses power or fails, all connected devices lose their smart functionality until it is restored.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Hub-Based Ecosystems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hub-Based Ecosystems
          </h2>
          <p className="text-white mb-4">
            Hub-based systems use a central device that communicates with smart devices and manages the overall system. This approach has been the traditional model for comprehensive smart home installations.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Advantages</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Multi-protocol support</li>
                <li>Local processing capability</li>
                <li>Advanced automation options</li>
                <li>Unified device management</li>
                <li>Works offline (local hubs)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Disadvantages</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Additional hardware cost</li>
                <li>Single point of failure</li>
                <li>Setup complexity</li>
                <li>Hub selection affects ecosystem</li>
                <li>May require technical knowledge</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">SmartThings</p>
              <p className="text-white text-sm">Samsung hub supporting Zigbee, Z-Wave, and Wi-Fi. Strong ecosystem with good third-party support.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Hubitat Elevation</p>
              <p className="text-white text-sm">Local-first processing with advanced automation. Popular with enthusiasts wanting maximum control.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Home Assistant</p>
              <p className="text-white text-sm">Open-source platform supporting thousands of integrations. Requires more technical setup but offers maximum flexibility.</p>
            </div>
          </div>
        </section>

        {/* Hubless Ecosystems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Hubless Ecosystems
          </h2>
          <p className="text-white mb-4">
            Hubless systems use Wi-Fi devices that connect directly to the home router and are controlled via cloud services. Each device connects individually without a central coordinator.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Advantages</h3>
              <ul className="text-white text-sm space-y-2">
                <li>No hub purchase required</li>
                <li>Simple plug-and-play setup</li>
                <li>Works immediately with voice assistants</li>
                <li>Easy for non-technical users</li>
                <li>Individual device apps available</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Disadvantages</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Cloud and internet dependent</li>
                <li>Can overload Wi-Fi networks</li>
                <li>Limited cross-device automation</li>
                <li>Vendor lock-in risk</li>
                <li>Multiple apps may be needed</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Installation Consideration</p>
            <p className="text-white text-sm">Wi-Fi-only devices are suitable for customers wanting simple solutions with a few devices. Beyond 10-15 devices, hub-based systems typically provide better performance and reliability.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Hybrid Approaches */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Hybrid Approaches
          </h2>
          <p className="text-white mb-4">
            Many modern installations use a hybrid approach, combining hub-based control for certain devices with standalone Wi-Fi devices for others. Voice assistants like Alexa and Google Home often serve as the unifying control layer.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Voice Assistant as Hub</p>
              <p className="text-white text-sm">Amazon Echo and Google Nest devices can control both native Wi-Fi devices and hub-connected devices, providing a unified voice interface.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Selective Protocol Use</p>
              <p className="text-white text-sm">Use Zigbee/Z-Wave for sensors and switches where reliability matters, Wi-Fi for cameras and high-bandwidth devices.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Matter as Unifier</p>
              <p className="text-white text-sm">Matter-certified devices can work across ecosystems, reducing the need for protocol-specific hubs while maintaining local operation.</p>
            </div>
          </div>
        </section>

        {/* Choosing the Right Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Choosing the Right Approach
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Choose Hubless When:</h3>
              <ul className="text-white text-sm space-y-1">
                <li>Customer wants simple, quick setup</li>
                <li>Installing fewer than 10 devices</li>
                <li>Devices are within one ecosystem (all Alexa, all Google)</li>
                <li>Budget is limited</li>
                <li>No advanced automation required</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Choose Hub-Based When:</h3>
              <ul className="text-white text-sm space-y-1">
                <li>Installing many devices (15+)</li>
                <li>Mixing protocols (Zigbee, Z-Wave, Wi-Fi)</li>
                <li>Complex automation is required</li>
                <li>Reliability is critical</li>
                <li>Local operation without internet is needed</li>
                <li>Customer values privacy and local control</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Future Trends */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Future Trends
          </h2>
          <p className="text-white mb-4">
            The smart home landscape is evolving rapidly. Matter and Thread are changing how devices communicate and reducing traditional hub requirements.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Matter Controllers</p>
              <p className="text-white text-sm">Apple HomePod, Google Nest, and Amazon Echo devices can act as Matter controllers, reducing the need for separate hubs.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Thread Border Routers</p>
              <p className="text-white text-sm">Many smart speakers now include Thread Border Router functionality, providing mesh networking without dedicated hardware.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Local-First Trend</p>
              <p className="text-white text-sm">Privacy concerns are driving demand for local processing. Matter's emphasis on local control aligns with this trend.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5">
                <p className="text-white font-medium mb-2">{faq.question}</p>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="../section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-6">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section5;
