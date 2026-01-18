import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Compatibility Mapping and Bridge Use";
const DESCRIPTION = "Device integration strategies and protocol translation techniques";

const quickCheckQuestions = [
  {
    question: "What does device compatibility mean in smart home context?",
    options: ["All devices use the same power supply", "Devices can communicate and work together", "Devices are from the same manufacturer", "Devices have the same physical size"],
    correctIndex: 1,
    explanation: "Device compatibility refers to the ability of devices to communicate and work together, either natively through shared protocols or via bridges and integration platforms."
  },
  {
    question: "What is the function of a smart home bridge?",
    options: ["Extend Wi-Fi range", "Translate between different protocols", "Provide backup power", "Store device settings"],
    correctIndex: 1,
    explanation: "A smart home bridge translates communication between devices using different protocols, enabling them to work together in a unified system."
  },
  {
    question: "What is a potential latency issue when using bridges?",
    options: ["Bridges use too much power", "Translation adds delay to commands", "Bridges are too expensive", "Bridges only work locally"],
    correctIndex: 1,
    explanation: "Protocol translation through bridges adds processing time, which can introduce noticeable delays in command execution, particularly for time-sensitive automations."
  }
];

const quizQuestions = [
  {
    question: "What does a Philips Hue Bridge primarily do?",
    options: ["Boost Wi-Fi signal", "Connect Zigbee lights to IP networks", "Store lighting scenes", "Provide battery backup"],
    correctIndex: 1,
    explanation: "The Hue Bridge acts as a Zigbee coordinator, connecting Zigbee-based Hue lights to your IP network for control via apps and voice assistants."
  },
  {
    question: "When mapping device compatibility, what should you document first?",
    options: ["Device prices", "Existing protocols and hubs in use", "Warranty information", "Installation dates"],
    correctIndex: 1,
    explanation: "Understanding existing protocols and hubs is essential for determining what new devices will be compatible or what bridges may be needed."
  },
  {
    question: "What is a limitation of using multiple bridges in one installation?",
    options: ["They share the same IP address", "Complex automation across bridges can be unreliable", "They consume too much power", "They are always incompatible"],
    correctIndex: 1,
    explanation: "Automations that span multiple bridges may experience delays or failures as commands must traverse multiple systems, increasing complexity and potential failure points."
  },
  {
    question: "How does Matter aim to reduce bridge requirements?",
    options: ["By eliminating all wireless protocols", "By providing a common application layer", "By using only cloud services", "By requiring specific hardware"],
    correctIndex: 1,
    explanation: "Matter provides a unified application layer that allows devices from different manufacturers to communicate directly, reducing the need for proprietary bridges."
  },
  {
    question: "What should you advise customers about vendor-specific ecosystems?",
    options: ["Always choose the cheapest option", "Consider long-term compatibility and openness", "Avoid all proprietary systems", "Only use one brand"],
    correctIndex: 1,
    explanation: "Advising customers to consider long-term compatibility, ecosystem openness, and potential exit strategies helps them make informed decisions about smart home investments."
  }
];

const faqs = [
  {
    question: "How do I know if two devices are compatible?",
    answer: "Check if they use the same protocol (Zigbee, Z-Wave, Wi-Fi) and ecosystem. Devices with Matter certification will work across ecosystems. For non-matching devices, check if a bridge or multi-protocol hub can integrate them."
  },
  {
    question: "Should I avoid bridges entirely?",
    answer: "Not necessarily. Bridges enable integration of otherwise incompatible devices and can be the most practical solution. However, minimise bridge chains and prefer native protocol compatibility where possible for better reliability."
  },
  {
    question: "What happens if a bridge manufacturer goes out of business?",
    answer: "Devices dependent on proprietary bridges may lose smart functionality. This is a key reason to prefer open standards and Matter-certified devices, which have multiple controller options."
  }
];

const SmartHomeModule2Section6 = () => {
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
          <span className="text-sm text-white">Section 6 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Compatibility Mapping</p>
            <p className="text-white text-sm">Document protocols, ecosystems, and integration requirements</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Bridge Strategy</p>
            <p className="text-white text-sm">Connect incompatible devices while minimising complexity</p>
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
              "Create compatibility maps for smart home installations",
              "Understand the role and limitations of bridges",
              "Identify when bridges are necessary versus avoidable",
              "Plan integration strategies for multi-protocol environments"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What is Compatibility Mapping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Compatibility
          </h2>
          <p className="text-white mb-4">
            Device compatibility in smart homes refers to the ability of different devices to communicate, share data, and work together in automations. True compatibility goes beyond simply connecting to the same app.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Protocol Compatibility</p>
              <p className="text-white text-sm">Devices using the same protocol (Zigbee, Z-Wave, Wi-Fi) can potentially communicate directly without translation.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Ecosystem Compatibility</p>
              <p className="text-white text-sm">Devices may use the same protocol but be restricted to specific ecosystems (e.g., Zigbee devices that only work with Philips Hue).</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Automation Compatibility</p>
              <p className="text-white text-sm">The ability to include devices in automations and scenes, triggered by events from other devices.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Tip</p>
            <p className="text-white text-sm">Before purchasing devices, verify they work with the customer's existing hub or ecosystem. "Works with Alexa" does not guarantee integration with other smart home platforms.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Compatibility Mapping Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Compatibility Mapping Process
          </h2>
          <p className="text-white mb-4">
            Creating a compatibility map helps identify integration requirements before installation, preventing issues and ensuring customer expectations are met.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Step 1: Inventory Existing Devices</h3>
              <p className="text-white text-sm">List all current smart devices, their protocols, hubs, and control apps. Note any known limitations or issues.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Step 2: Document Desired Features</h3>
              <p className="text-white text-sm">Record what the customer wants to achieve: voice control platforms, automation requirements, remote access needs.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Step 3: Map Protocol Requirements</h3>
              <p className="text-white text-sm">Identify which protocols are needed for new devices and whether existing infrastructure supports them.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Step 4: Identify Integration Gaps</h3>
              <p className="text-white text-sm">Determine where bridges, new hubs, or alternative devices are needed to achieve full compatibility.</p>
            </div>
          </div>
        </section>

        {/* Understanding Bridges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Understanding Smart Home Bridges
          </h2>
          <p className="text-white mb-4">
            A bridge is a device that translates communication between different protocols or ecosystems, enabling devices that would not normally work together to be integrated into a unified system.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Protocol Bridges</p>
              <p className="text-white text-sm">Convert between protocols (e.g., Zigbee to IP). The Philips Hue Bridge converts Zigbee commands to IP for app and voice control.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Ecosystem Bridges</p>
              <p className="text-white text-sm">Connect closed ecosystems to broader platforms. Homebridge, for example, exposes non-HomeKit devices to Apple Home.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Cloud-to-Cloud Integration</p>
              <p className="text-white text-sm">Services like IFTTT or manufacturer partnerships enable cross-platform automation without physical bridges.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Common Bridges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Bridges and Their Uses
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Philips Hue Bridge</h3>
              <p className="text-white text-sm mb-2">Connects Zigbee-based Hue lights and accessories to your network. Required for Hue ecosystem but now supports Matter for broader compatibility.</p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Use case:</span> Existing Hue installation needing Matter integration</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">IKEA DIRIGERA Hub</h3>
              <p className="text-white text-sm mb-2">IKEA's smart home hub supporting Zigbee and Matter. Controls IKEA smart products and provides Matter controller functionality.</p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Use case:</span> Budget-friendly Matter hub with IKEA device integration</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Homebridge (Software)</h3>
              <p className="text-white text-sm mb-2">Open-source software bridge that exposes non-HomeKit devices to Apple Home. Runs on Raspberry Pi or similar.</p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Use case:</span> Apple Home users with non-HomeKit devices</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Z-Wave to Matter Bridges</h3>
              <p className="text-white text-sm mb-2">Emerging products that expose Z-Wave devices to Matter ecosystems. Essential for protecting Z-Wave investments as Matter grows.</p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Use case:</span> Existing Z-Wave installations migrating to Matter</p>
            </div>
          </div>
        </section>

        {/* Bridge Challenges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Bridge Challenges and Limitations
          </h2>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Added Latency</p>
              <p className="text-white text-sm">Each bridge in the command path adds processing time. Multiple bridges can result in noticeable delays.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Single Points of Failure</p>
              <p className="text-white text-sm">If a bridge fails or loses power, all devices behind it become unavailable until the bridge is restored.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Feature Translation Loss</p>
              <p className="text-white text-sm">Not all features translate across protocols. Advanced device capabilities may be unavailable through bridges.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Maintenance Complexity</p>
              <p className="text-white text-sm">More bridges mean more firmware updates, more potential compatibility issues, and more troubleshooting complexity.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Best Practice</p>
            <p className="text-white text-sm">Minimise the number of bridges in any installation. Where possible, choose devices that work natively with the customer's primary hub or ecosystem.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Future of Compatibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            The Future of Compatibility
          </h2>
          <p className="text-white mb-4">
            Matter is fundamentally changing the smart home compatibility landscape. By providing a common application layer, it reduces the need for protocol-specific bridges and ecosystem lock-in.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Matter Bridge Functionality</p>
              <p className="text-white text-sm">Existing hubs (Hue, SmartThings, Aqara) can expose their devices to Matter, providing a migration path for legacy installations.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Multi-Admin Support</p>
              <p className="text-white text-sm">Matter devices can be controlled by multiple ecosystems simultaneously, eliminating the need to choose a single platform.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Thread Foundation</p>
              <p className="text-white text-sm">Thread-based Matter devices benefit from IP-native communication, eliminating protocol translation for many use cases.</p>
            </div>
          </div>
        </section>

        {/* Practical Implementation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Practical Implementation Guide
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-3">Integration Planning Checklist</p>
            <ol className="text-white text-sm space-y-2">
              <li><span className="text-elec-yellow font-semibold">1.</span> Document all existing smart devices and their protocols</li>
              <li><span className="text-elec-yellow font-semibold">2.</span> Identify the primary control ecosystem (Alexa, Google, Apple, etc.)</li>
              <li><span className="text-elec-yellow font-semibold">3.</span> List required automations and their device dependencies</li>
              <li><span className="text-elec-yellow font-semibold">4.</span> Check native compatibility of new devices with existing hub</li>
              <li><span className="text-elec-yellow font-semibold">5.</span> Identify bridge requirements for incompatible devices</li>
              <li><span className="text-elec-yellow font-semibold">6.</span> Consider Matter-certified alternatives to reduce bridge needs</li>
              <li><span className="text-elec-yellow font-semibold">7.</span> Plan for future expansion and ecosystem flexibility</li>
            </ol>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
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

        {/* Module Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Module 2 Summary
          </h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
            <p className="text-white mb-3">Throughout Module 2, you have learned about:</p>
            <ul className="text-white text-sm space-y-2">
              <li>Wireless protocols (Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread, Matter)</li>
              <li>Mesh networking principles and protocol comparison</li>
              <li>Interference management and channel allocation</li>
              <li>Hub-based versus hubless system architectures</li>
              <li>Compatibility mapping and bridge integration strategies</li>
            </ul>
            <p className="text-white text-sm mt-3">These foundational concepts prepare you for practical installation work covered in the following modules.</p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="../section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="/electrician/upskilling/smart-home-module-3">
              Next Module
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section6;
