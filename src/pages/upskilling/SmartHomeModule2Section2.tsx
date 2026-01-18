import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Zigbee vs Z-Wave";
const DESCRIPTION = "Range, mesh networking, and power consumption comparison";

const quickCheckQuestions = [
  {
    question: "In a mesh network, what happens when a device fails?",
    options: ["The entire network stops working", "Only devices directly connected to it fail", "Traffic reroutes through other devices", "A manual reset is required"],
    correctIndex: 2,
    explanation: "Mesh networks are self-healing - when a device fails or loses power, traffic automatically reroutes through other devices in the network, maintaining connectivity."
  },
  {
    question: "What is the main advantage of Zigbee over Z-Wave for large installations?",
    options: ["Better wall penetration", "Higher device limit per network", "Lower frequency interference", "Proprietary security"],
    correctIndex: 1,
    explanation: "Zigbee supports over 65,000 devices per network compared to Z-Wave's 232-device limit, making it better suited for large commercial or residential installations."
  },
  {
    question: "Which protocol has better wall penetration in typical UK construction?",
    options: ["Zigbee", "Z-Wave", "They are identical", "Neither penetrates walls"],
    correctIndex: 1,
    explanation: "Z-Wave's sub-GHz frequency (868 MHz in UK) penetrates solid walls and obstacles better than Zigbee's 2.4 GHz signal, which is more easily absorbed by building materials."
  }
];

const quizQuestions = [
  {
    question: "What type of network topology do both Zigbee and Z-Wave use?",
    options: ["Star topology", "Ring topology", "Mesh topology", "Bus topology"],
    correctIndex: 2,
    explanation: "Both protocols use mesh topology where devices can relay messages to extend range and provide redundant paths."
  },
  {
    question: "Which frequency does Z-Wave use in the UK and Europe?",
    options: ["2.4 GHz", "868 MHz", "915 MHz", "433 MHz"],
    correctIndex: 1,
    explanation: "Z-Wave uses 868 MHz in the UK and Europe, while 908 MHz is used in North America."
  },
  {
    question: "What is the typical battery life advantage of Zigbee and Z-Wave over Wi-Fi?",
    options: ["No difference", "50% longer", "2-3 times longer", "10+ times longer"],
    correctIndex: 3,
    explanation: "Zigbee and Z-Wave sensors can last 2-5 years on a single battery compared to months for Wi-Fi devices due to their low-power design."
  },
  {
    question: "In a Zigbee network, which device type can route messages?",
    options: ["Only the coordinator", "End devices", "Routers and the coordinator", "All devices equally"],
    correctIndex: 2,
    explanation: "In Zigbee networks, routers (typically mains-powered devices) and the coordinator can route messages. End devices (often battery-powered) cannot route."
  },
  {
    question: "What happens when you add more devices to a mesh network?",
    options: ["Performance decreases", "Range typically increases", "Power consumption doubles", "The network becomes unstable"],
    correctIndex: 1,
    explanation: "Adding more routing-capable devices to a mesh network typically increases coverage and reliability as there are more paths for signals to travel."
  }
];

const faqs = [
  {
    question: "Should I use Zigbee or Z-Wave for a new installation?",
    answer: "Consider Z-Wave for reliability-critical applications like security systems, especially in buildings with thick walls. Choose Zigbee for cost-sensitive projects with many devices. For maximum flexibility, select a hub that supports both protocols."
  },
  {
    question: "Can I mix Zigbee and Z-Wave devices in one smart home?",
    answer: "Yes, with a multi-protocol hub like SmartThings, Hubitat, or Home Assistant with appropriate radios. The devices will not communicate directly with each other, but the hub unifies control and automation."
  },
  {
    question: "How many devices should I have before choosing mesh over Wi-Fi?",
    answer: "Consider mesh protocols (Zigbee/Z-Wave) when installing more than 10-15 smart devices, or when using battery-powered sensors. Wi-Fi devices can overload home networks and drain batteries quickly."
  }
];

const SmartHomeModule2Section2 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 2`,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="/electrician/upskilling/smart-home-module-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 2 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Zigbee Strength</p>
            <p className="text-white text-sm">High device count, low cost, 2.4 GHz operation</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Z-Wave Strength</p>
            <p className="text-white text-sm">Better wall penetration, no Wi-Fi interference</p>
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
              "Explain the fundamentals of mesh networking",
              "Compare Zigbee and Z-Wave specifications and capabilities",
              "Identify optimal use cases for each protocol",
              "Understand power consumption and battery life considerations"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mesh Networking Basics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mesh Networking Fundamentals
          </h2>
          <p className="text-white mb-4">
            Both Zigbee and Z-Wave use mesh networking, where devices communicate not just with a central hub but also with each other. This creates multiple pathways for data, improving reliability and extending range beyond what any single device could achieve.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Concept</p>
            <p className="text-white text-sm">In a mesh network, every mains-powered device acts as a signal repeater. The more devices you install, the stronger and more reliable your network becomes.</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Self-Healing</p>
              <p className="text-white text-sm">If a device fails or is removed, the network automatically finds alternative routes for communication.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Range Extension</p>
              <p className="text-white text-sm">Each device extends the network range, allowing coverage of large properties without dedicated range extenders.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Redundancy</p>
              <p className="text-white text-sm">Multiple paths mean that interference or obstacles blocking one route do not affect overall communication.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Zigbee Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Zigbee Protocol Overview
          </h2>
          <p className="text-white mb-4">
            Zigbee is an open standard developed by the Zigbee Alliance (now the Connectivity Standards Alliance). Operating on the 2.4 GHz band globally, it offers excellent scalability and a wide range of compatible devices from many manufacturers.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Network Capacity</p>
              <p className="text-white text-sm">Supports over 65,000 devices per network, far exceeding residential requirements and suitable for commercial applications.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Device Types</p>
              <p className="text-white text-sm">Coordinator (hub), Routers (mains-powered devices that repeat signals), and End Devices (battery-powered sensors that do not repeat).</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Power Consumption</p>
              <p className="text-white text-sm">Designed for low power operation. Battery-powered sensors typically last 2-5 years on a single coin cell battery.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Data Rate</p>
              <p className="text-white text-sm">250 kbps maximum, sufficient for control signals and sensor data but not for video or large file transfers.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Consideration</p>
            <p className="text-white text-sm">Zigbee 3.0 unified previous versions (ZHA, ZLL, etc.) ensuring better cross-manufacturer compatibility. Always verify Zigbee 3.0 certification for new devices.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Z-Wave Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Z-Wave Protocol Overview
          </h2>
          <p className="text-white mb-4">
            Z-Wave is a proprietary protocol originally developed by Zensys (now Silicon Labs). Operating on sub-GHz frequencies, it provides excellent RF penetration through walls and avoids interference with Wi-Fi networks.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Frequency Bands</p>
              <p className="text-white text-sm">868 MHz in UK/Europe, 908 MHz in North America. Regional variants are not interchangeable.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Network Capacity</p>
              <p className="text-white text-sm">Maximum 232 devices per network. Sufficient for most residential installations but can limit large projects.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Interoperability</p>
              <p className="text-white text-sm">All Z-Wave devices are certified for interoperability, ensuring any Z-Wave device works with any Z-Wave hub.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Range</p>
              <p className="text-white text-sm">Up to 100 metres in open air, 30+ metres through walls. Sub-GHz signals penetrate building materials better than 2.4 GHz.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Installation Tip</p>
            <p className="text-white text-sm">Z-Wave Plus (Gen5) and Z-Wave 700/800 series offer improved range and battery life. Specify newer chipsets for better performance.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Direct Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 text-white font-semibold">Feature</th>
                  <th className="text-left py-2 text-white font-semibold">Zigbee</th>
                  <th className="text-left py-2 text-white font-semibold">Z-Wave</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-2">Frequency</td>
                  <td className="py-2">2.4 GHz</td>
                  <td className="py-2">868 MHz (UK)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Max Devices</td>
                  <td className="py-2">65,000+</td>
                  <td className="py-2">232</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Data Rate</td>
                  <td className="py-2">250 kbps</td>
                  <td className="py-2">100 kbps</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Wall Penetration</td>
                  <td className="py-2">Moderate</td>
                  <td className="py-2">Excellent</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Wi-Fi Interference</td>
                  <td className="py-2">Possible</td>
                  <td className="py-2">None</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">Standard Type</td>
                  <td className="py-2">Open</td>
                  <td className="py-2">Proprietary</td>
                </tr>
                <tr>
                  <td className="py-2">Device Cost</td>
                  <td className="py-2">Lower</td>
                  <td className="py-2">Higher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Use Cases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Best Use Cases
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Choose Zigbee When:</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Installing many devices (50+)</li>
                <li>Budget is a primary concern</li>
                <li>Using Phillips Hue or IKEA ecosystem</li>
                <li>Commercial or large residential projects</li>
                <li>Wi-Fi congestion is not severe</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Choose Z-Wave When:</h3>
              <ul className="text-white text-sm space-y-2">
                <li>Reliability is critical (security systems)</li>
                <li>Building has thick walls or metal construction</li>
                <li>Heavy Wi-Fi usage in the property</li>
                <li>Guaranteed interoperability required</li>
                <li>Moderate device count (under 100)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Victorian Terrace with Thick Walls</p>
            <p className="text-white text-sm mb-3">
              A customer in a Victorian terrace property reports that their Zigbee motion sensors frequently disconnect in rooms away from the hub. The property has solid brick internal walls and a busy Wi-Fi environment with neighbours.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Diagnosis:</span></p>
            <p className="text-white text-sm mb-3">
              The 2.4 GHz Zigbee signal struggles to penetrate the dense brick walls, and neighbouring Wi-Fi networks cause additional interference.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Solution:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li>Replace problematic sensors with Z-Wave equivalents</li>
              <li>Add Z-Wave plug-in modules as mesh repeaters in each room</li>
              <li>Use a multi-protocol hub to maintain existing Zigbee devices</li>
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
            <Link to="../section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-3">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section2;
