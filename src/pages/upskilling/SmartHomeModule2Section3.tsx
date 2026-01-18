import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wi-Fi, Bluetooth, Thread and Matter";
const DESCRIPTION = "Modern protocols and emerging standards for smart home connectivity";

const quickCheckQuestions = [
  {
    question: "What is the main limitation of Wi-Fi for battery-powered smart home devices?",
    options: ["Limited range", "High power consumption", "Low data rate", "Poor security"],
    correctIndex: 1,
    explanation: "Wi-Fi's high power consumption makes it unsuitable for battery-powered devices, which would need frequent battery changes or larger batteries."
  },
  {
    question: "What does Thread provide that Bluetooth LE traditionally lacks?",
    options: ["Lower power consumption", "Mesh networking capability", "Smartphone compatibility", "Audio streaming"],
    correctIndex: 1,
    explanation: "Thread provides native mesh networking capability, allowing devices to relay messages and extend network range. Traditional Bluetooth LE was point-to-point only (though Bluetooth Mesh now exists)."
  },
  {
    question: "What is the primary purpose of Matter?",
    options: ["Replace all existing protocols", "Provide faster data transfer", "Enable cross-platform compatibility", "Reduce device costs"],
    correctIndex: 2,
    explanation: "Matter is an application layer standard that enables devices from different manufacturers and ecosystems (Apple, Google, Amazon) to work together seamlessly."
  }
];

const quizQuestions = [
  {
    question: "Which protocol is best suited for streaming video from a smart doorbell?",
    options: ["Zigbee", "Z-Wave", "Wi-Fi", "Thread"],
    correctIndex: 2,
    explanation: "Wi-Fi provides the high bandwidth needed for video streaming, which low-power protocols like Zigbee, Z-Wave, and Thread cannot match."
  },
  {
    question: "What technology does Thread use as its foundation?",
    options: ["Bluetooth", "IPv6 over 802.15.4", "Z-Wave mesh", "Wi-Fi Direct"],
    correctIndex: 1,
    explanation: "Thread uses IPv6 over IEEE 802.15.4, giving each device a unique IP address and enabling internet-style routing."
  },
  {
    question: "Which companies are founding members of the Matter standard?",
    options: ["Apple only", "Google and Amazon only", "Apple, Google, Amazon, and Samsung", "Microsoft and Intel"],
    correctIndex: 2,
    explanation: "Matter was developed by the Connectivity Standards Alliance with Apple, Google, Amazon, and Samsung as key founding members."
  },
  {
    question: "What transport layers can Matter operate over?",
    options: ["Only Wi-Fi", "Only Thread", "Wi-Fi, Thread, and Ethernet", "Zigbee and Z-Wave"],
    correctIndex: 2,
    explanation: "Matter can operate over Wi-Fi, Thread, and Ethernet, providing flexibility in how devices connect to the network."
  },
  {
    question: "What is a Border Router in a Thread network?",
    options: ["A device that blocks external traffic", "A device connecting Thread to IP networks", "A range extender", "The primary controller"],
    correctIndex: 1,
    explanation: "A Thread Border Router connects the Thread mesh network to IP-based networks like Wi-Fi or Ethernet, enabling internet connectivity and control."
  }
];

const faqs = [
  {
    question: "Will Matter replace Zigbee and Z-Wave?",
    answer: "Not immediately. Matter is an application layer that can work alongside existing protocols. Many existing Zigbee devices can be upgraded to support Matter through hub firmware updates. Z-Wave devices require a bridge."
  },
  {
    question: "Do I need a Thread Border Router for Matter devices?",
    answer: "Only for Thread-based Matter devices. Matter over Wi-Fi or Ethernet does not require a Thread Border Router. Apple HomePod Mini, Google Nest Hub, and Amazon Echo (4th gen) include Thread Border Router functionality."
  },
  {
    question: "Is Bluetooth being replaced by Thread?",
    answer: "Bluetooth remains essential for device setup and configuration, even with Thread devices. Many Matter devices use Bluetooth for initial pairing before joining the Thread or Wi-Fi network."
  }
];

const SmartHomeModule2Section3 = () => {
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
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Current Standards</p>
            <p className="text-white text-sm">Wi-Fi for bandwidth, Bluetooth for setup and proximity</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Future Standards</p>
            <p className="text-white text-sm">Thread for mesh, Matter for universal compatibility</p>
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
              "Understand Wi-Fi's role and limitations in smart homes",
              "Explain Bluetooth and BLE applications",
              "Describe Thread protocol architecture and benefits",
              "Understand Matter and its impact on interoperability"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Wi-Fi in Smart Homes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wi-Fi in Smart Homes
          </h2>
          <p className="text-white mb-4">
            Wi-Fi is the most familiar wireless technology, already present in nearly every home. Smart devices using Wi-Fi connect directly to the home router without requiring an additional hub.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Advantages</p>
              <p className="text-white text-sm">No hub required, high bandwidth for cameras and displays, familiar technology for customers, easy remote access.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Limitations</p>
              <p className="text-white text-sm">High power consumption, can overload home routers with many devices, no mesh capability in standard Wi-Fi devices.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Best Applications</p>
              <p className="text-white text-sm">Video doorbells, security cameras, smart displays, streaming devices, smart speakers.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Installation Consideration</p>
            <p className="text-white text-sm">Check router capacity before specifying many Wi-Fi smart devices. Budget routers may struggle with 20+ connected devices. Consider recommending a mesh Wi-Fi system for larger installations.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Bluetooth Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bluetooth and BLE
          </h2>
          <p className="text-white mb-4">
            Bluetooth Low Energy (BLE) provides short-range, low-power wireless communication. While not typically used for whole-home automation, it plays important roles in smart home ecosystems.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Device Setup</p>
              <p className="text-white text-sm">Most smart devices use Bluetooth for initial configuration and pairing with smartphone apps before joining Wi-Fi or Thread networks.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Proximity Control</p>
              <p className="text-white text-sm">Bluetooth beacons enable presence detection and location-based automation within rooms or zones.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Bluetooth Mesh</p>
              <p className="text-white text-sm">A newer standard enabling mesh networking for lighting and other applications, though adoption remains limited compared to Zigbee.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Note</p>
            <p className="text-white text-sm">BLE range is typically 10-30 metres. For devices relying solely on Bluetooth control, ensure the customer understands they must be in range of their smartphone.</p>
          </div>
        </section>

        {/* Thread Protocol */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Thread Protocol
          </h2>
          <p className="text-white mb-4">
            Thread is a relatively new protocol designed specifically for IoT devices. Built on IPv6, it combines the low-power benefits of Zigbee with internet-style addressing and routing.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">IP-Based Architecture</p>
              <p className="text-white text-sm">Every Thread device has a unique IPv6 address, enabling direct addressing and eliminating the need for protocol translation.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Self-Healing Mesh</p>
              <p className="text-white text-sm">Like Zigbee and Z-Wave, Thread uses mesh networking with automatic route discovery and self-healing capabilities.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">No Single Point of Failure</p>
              <p className="text-white text-sm">Thread networks can have multiple Border Routers. If one fails, others maintain connectivity automatically.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Border Router</p>
              <p className="text-white text-sm">Connects Thread mesh to IP networks (Wi-Fi/Ethernet). Modern smart speakers often include Border Router functionality.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Matter Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Matter Standard
          </h2>
          <p className="text-white mb-4">
            Matter is an application layer protocol that sits on top of existing transport technologies (Wi-Fi, Thread, Ethernet). Developed by the Connectivity Standards Alliance with backing from Apple, Google, Amazon, and Samsung, it aims to solve the smart home compatibility problem.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Benefit</p>
            <p className="text-white text-sm">A Matter-certified device will work with Apple HomeKit, Google Home, Amazon Alexa, and Samsung SmartThings without needing separate certifications or apps.</p>
          </div>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Universal Compatibility</p>
              <p className="text-white text-sm">Devices certified for Matter work across all major ecosystems. Customers are no longer locked into single-vendor solutions.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Local Control</p>
              <p className="text-white text-sm">Matter emphasises local operation. Devices can function even if internet connectivity is lost.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Multi-Admin</p>
              <p className="text-white text-sm">A single device can be controlled by multiple ecosystems simultaneously. For example, the same light can be in HomeKit and Google Home.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Device Categories</p>
              <p className="text-white text-sm">Initial Matter support covers lighting, switches, sensors, thermostats, door locks, and media devices. More categories are being added.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Protocol Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Protocol Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 text-white font-semibold">Feature</th>
                  <th className="text-left py-2 text-white font-semibold">Wi-Fi</th>
                  <th className="text-left py-2 text-white font-semibold">BLE</th>
                  <th className="text-left py-2 text-white font-semibold">Thread</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-2">Bandwidth</td>
                  <td className="py-2">High</td>
                  <td className="py-2">Low</td>
                  <td className="py-2">Low</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Power Use</td>
                  <td className="py-2">High</td>
                  <td className="py-2">Very Low</td>
                  <td className="py-2">Low</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Mesh</td>
                  <td className="py-2">No</td>
                  <td className="py-2">Optional</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Hub Required</td>
                  <td className="py-2">No</td>
                  <td className="py-2">Optional</td>
                  <td className="py-2">Border Router</td>
                </tr>
                <tr>
                  <td className="py-2">IP-Based</td>
                  <td className="py-2">Yes</td>
                  <td className="py-2">No</td>
                  <td className="py-2">Yes (IPv6)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Future-Proofing a New Build</p>
            <p className="text-white text-sm mb-3">
              A customer building a new home wants a smart home system that will remain compatible with future devices and platforms. They use iPhones but may switch to Android in future.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Recommendation:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li>Specify Matter-certified devices wherever possible</li>
              <li>Install a Thread Border Router (HomePod Mini or equivalent)</li>
              <li>Use Wi-Fi only for cameras and high-bandwidth devices</li>
              <li>Ensure robust Wi-Fi coverage with a mesh system</li>
              <li>Choose a hub that supports Matter for non-Matter legacy devices</li>
            </ul>
            <p className="text-white text-sm mt-3"><span className="text-elec-yellow">Result:</span> The customer can use any ecosystem now and switch freely in future without replacing devices.</p>
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
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-4">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section3;
