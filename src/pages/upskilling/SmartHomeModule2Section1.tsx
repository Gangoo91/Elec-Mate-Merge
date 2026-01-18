import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wireless Protocol Overview";
const DESCRIPTION = "Communication standards and device connectivity in smart home installations";

const quickCheckQuestions = [
  {
    question: "What frequency band does Zigbee typically operate on?",
    options: ["868 MHz", "2.4 GHz", "5 GHz", "433 MHz"],
    correctIndex: 1,
    explanation: "Zigbee primarily operates on the 2.4 GHz band globally, though it can also use 868 MHz in Europe and 915 MHz in North America for specific applications."
  },
  {
    question: "Which protocol uses mesh networking to extend range?",
    options: ["Bluetooth Classic", "Wi-Fi Direct", "Both Zigbee and Z-Wave", "Infrared"],
    correctIndex: 2,
    explanation: "Both Zigbee and Z-Wave use mesh networking, where devices relay signals to each other, extending the effective range of the network."
  },
  {
    question: "What is the primary advantage of Z-Wave over Zigbee?",
    options: ["Faster data speeds", "Less interference from Wi-Fi", "Lower cost", "More device support"],
    correctIndex: 1,
    explanation: "Z-Wave operates on sub-GHz frequencies (around 868-908 MHz), which means it experiences less interference from Wi-Fi networks that use 2.4 GHz."
  }
];

const quizQuestions = [
  {
    question: "Which wireless protocol operates in the sub-GHz frequency range to avoid Wi-Fi interference?",
    options: ["Zigbee", "Z-Wave", "Thread", "Bluetooth LE"],
    correctIndex: 1,
    explanation: "Z-Wave operates at 868 MHz (Europe) or 908 MHz (US/Canada), avoiding the crowded 2.4 GHz band used by Wi-Fi."
  },
  {
    question: "What is a key characteristic of mesh networking in smart homes?",
    options: ["Requires direct line of sight", "Each device can only connect to the hub", "Devices relay signals to extend range", "Uses infrared signals"],
    correctIndex: 2,
    explanation: "Mesh networking allows devices to relay signals to each other, extending the effective range and improving reliability."
  },
  {
    question: "Which protocol was specifically designed for smart home automation?",
    options: ["Wi-Fi", "Bluetooth", "Z-Wave", "NFC"],
    correctIndex: 2,
    explanation: "Z-Wave was specifically designed for smart home automation, while Wi-Fi and Bluetooth were developed for general data transfer."
  },
  {
    question: "What is the maximum number of devices supported by a single Z-Wave network?",
    options: ["32", "64", "128", "232"],
    correctIndex: 3,
    explanation: "Z-Wave supports up to 232 devices per network, which is suitable for most residential smart home installations."
  },
  {
    question: "Which statement about Zigbee is correct?",
    options: ["It requires a proprietary hub from a single manufacturer", "It operates only on battery power", "It supports thousands of devices per network", "It cannot use mesh networking"],
    correctIndex: 2,
    explanation: "Zigbee can support over 65,000 devices per network theoretically, making it highly scalable for large installations."
  }
];

const faqs = [
  {
    question: "Can Zigbee and Z-Wave devices work together?",
    answer: "Not directly, as they use different protocols and frequencies. However, smart home hubs like SmartThings or Hubitat can support both protocols, allowing you to control all devices from a single interface."
  },
  {
    question: "Which protocol should I recommend for a new installation?",
    answer: "Consider Matter-compatible devices for future-proofing. For existing ecosystems, match the protocol to the customer's hub. Z-Wave is excellent for reliability, while Zigbee offers more device variety at lower cost."
  },
  {
    question: "Do wireless protocols interfere with each other?",
    answer: "Zigbee can experience interference with Wi-Fi since both use 2.4 GHz. Z-Wave avoids this by using sub-GHz frequencies. Proper channel selection and device placement minimise interference issues."
  }
];

const SmartHomeModule2Section1 = () => {
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
          <span className="text-sm text-white">Section 1 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Protocols</p>
            <p className="text-white text-sm">Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread, Matter</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Focus</p>
            <p className="text-white text-sm">Selecting the right protocol for each installation</p>
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
              "Understand the purpose and function of wireless protocols",
              "Compare Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread, and Matter",
              "Identify the best protocol for different installation scenarios",
              "Explain mesh networking and its benefits for smart homes"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What is a Wireless Protocol */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What is a Wireless Protocol?
          </h2>
          <p className="text-white mb-4">
            A wireless protocol is a standardised set of rules that defines how devices communicate without physical connections. In smart homes, protocols determine how sensors, controllers, and actuators exchange data to create automated systems.
          </p>
          <p className="text-white mb-4">
            Each protocol has specific characteristics affecting range, power consumption, data throughput, and security. Understanding these differences is essential for selecting the right technology for each installation.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Electrician Insight</p>
            <p className="text-white text-sm">Protocol selection often determines the hub requirements, device compatibility, and long-term expandability of a smart home system.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Why Protocols Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Protocols Matter
          </h2>
          <p className="text-white mb-4">
            The choice of wireless protocol affects every aspect of a smart home installation. Different protocols excel in different situations, and mismatching protocols to applications can lead to poor performance, reliability issues, and unhappy customers.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Interoperability</p>
              <p className="text-white text-sm">Devices must speak the same language to communicate. Mixing incompatible protocols requires bridges or limits functionality.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Range and Coverage</p>
              <p className="text-white text-sm">Protocols have different effective ranges. Mesh protocols extend coverage while point-to-point protocols may need repeaters.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Power Consumption</p>
              <p className="text-white text-sm">Battery-powered devices need low-power protocols. Mains-powered devices can use higher-bandwidth options.</p>
            </div>
          </div>
        </section>

        {/* Common Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Smart Home Protocols
          </h2>

          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Zigbee</h3>
              <p className="text-white text-sm mb-2">
                An open standard operating on 2.4 GHz with mesh networking support. Zigbee devices are widely available and relatively affordable. Supports over 65,000 devices per network.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Large installations, battery-powered sensors, cost-effective deployments</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Z-Wave</h3>
              <p className="text-white text-sm mb-2">
                A proprietary protocol using sub-GHz frequencies (868 MHz in UK/EU). Excellent for avoiding Wi-Fi interference and penetrating walls. Limited to 232 devices per network.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Reliability-critical applications, areas with Wi-Fi congestion, security systems</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Wi-Fi</h3>
              <p className="text-white text-sm mb-2">
                Uses existing home networks, no hub required. High bandwidth suitable for cameras and streaming devices. Higher power consumption limits battery-powered applications.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Smart displays, cameras, devices near power outlets, simple installations</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Bluetooth/BLE</h3>
              <p className="text-white text-sm mb-2">
                Bluetooth Low Energy offers short-range, low-power communication. Often used for device setup and direct smartphone control. Limited range without mesh support.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Wearables, smartphone-controlled devices, proximity-based triggers</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Thread</h3>
              <p className="text-white text-sm mb-2">
                A newer IP-based mesh protocol designed for IoT. Low power, secure, and IPv6 addressable. Foundation for the Matter standard.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Future-proof installations, Matter-compatible ecosystems</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Matter</h3>
              <p className="text-white text-sm mb-2">
                A unifying application layer standard backed by Apple, Google, Amazon, and Samsung. Works over Wi-Fi, Thread, and Ethernet to provide cross-platform compatibility.
              </p>
              <p className="text-white text-sm"><span className="text-elec-yellow">Best for:</span> Multi-ecosystem homes, maximum compatibility, new installations</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Protocol Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Protocol Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 text-white font-semibold">Protocol</th>
                  <th className="text-left py-2 text-white font-semibold">Frequency</th>
                  <th className="text-left py-2 text-white font-semibold">Range</th>
                  <th className="text-left py-2 text-white font-semibold">Power</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-2">Zigbee</td>
                  <td className="py-2">2.4 GHz</td>
                  <td className="py-2">10-100m</td>
                  <td className="py-2">Low</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Z-Wave</td>
                  <td className="py-2">868 MHz</td>
                  <td className="py-2">30-100m</td>
                  <td className="py-2">Low</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Wi-Fi</td>
                  <td className="py-2">2.4/5 GHz</td>
                  <td className="py-2">50m</td>
                  <td className="py-2">High</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">BLE</td>
                  <td className="py-2">2.4 GHz</td>
                  <td className="py-2">10m</td>
                  <td className="py-2">Very Low</td>
                </tr>
                <tr>
                  <td className="py-2">Thread</td>
                  <td className="py-2">2.4 GHz</td>
                  <td className="py-2">10-100m</td>
                  <td className="py-2">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Choosing the Right Protocol */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Choosing the Right Protocol
          </h2>
          <p className="text-white mb-4">
            When advising customers or specifying smart home systems, consider these factors:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Existing Ecosystem</p>
              <p className="text-white text-sm">Match the protocol to devices the customer already owns. Switching ecosystems is expensive and disruptive.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Building Construction</p>
              <p className="text-white text-sm">Thick walls and metal structures favour sub-GHz protocols like Z-Wave. Open-plan spaces work well with any protocol.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Network Size</p>
              <p className="text-white text-sm">Large installations with many devices benefit from Zigbee's scalability. Small systems can use simpler Wi-Fi devices.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Future Expansion</p>
              <p className="text-white text-sm">Matter-compatible devices offer the best future-proofing as the ecosystem grows and standards mature.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Multi-Protocol Home Installation</p>
            <p className="text-white text-sm mb-3">
              A customer wants smart lighting throughout their home, a video doorbell, and battery-powered window sensors. They use Amazon Alexa for voice control.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Recommended Solution:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li>Lighting: Zigbee bulbs with a compatible hub for mesh coverage</li>
              <li>Doorbell: Wi-Fi for high-bandwidth video streaming</li>
              <li>Sensors: Z-Wave for long battery life and reliable RF penetration</li>
              <li>Hub: SmartThings or Hubitat supporting all three protocols</li>
            </ul>
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
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-2">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section1;
