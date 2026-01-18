import { ArrowLeft, ArrowRight, Wifi, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wi-Fi and RF Signal Verification";
const DESCRIPTION = "Master the techniques for testing and optimising wireless connectivity in smart home installations for reliable system performance.";

const quickCheckQuestions = [
  {
    question: "What is the typical acceptable Wi-Fi signal strength for smart home devices?",
    options: ["-80 dBm or weaker", "-70 dBm or stronger", "-90 dBm", "Signal strength does not matter"],
    correctIndex: 1,
    explanation: "A signal strength of -70 dBm or stronger (closer to 0) provides reliable connectivity. Signals weaker than -80 dBm often cause intermittent issues."
  },
  {
    question: "Which Wi-Fi frequency band offers better range but lower bandwidth?",
    options: ["5 GHz", "2.4 GHz", "6 GHz", "Both have equal range"],
    correctIndex: 1,
    explanation: "2.4 GHz offers better range and penetration through walls but has lower bandwidth and is more susceptible to interference. Most smart home devices use 2.4 GHz."
  },
  {
    question: "What tool is commonly used for professional Wi-Fi site surveys?",
    options: ["Multimeter", "Wi-Fi analyser app or dedicated survey tool", "Oscilloscope", "Cable tester"],
    correctIndex: 1,
    explanation: "Wi-Fi analyser apps or dedicated survey tools like Ekahau or NetSpot measure signal strength, identify interference, and map coverage areas."
  }
];

const quizQuestions = [
  {
    question: "Why is channel selection important for 2.4 GHz Wi-Fi networks?",
    options: [
      "It affects the colour of the LED on the router",
      "To avoid interference from overlapping channels used by neighbours",
      "It determines the maximum number of devices",
      "It has no significant impact on performance"
    ],
    correctIndex: 1,
    explanation: "In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping. Using these channels prevents interference from neighbouring networks on overlapping channels."
  },
  {
    question: "What is the primary purpose of a mesh Wi-Fi system in a smart home installation?",
    options: [
      "To reduce internet costs",
      "To provide consistent coverage throughout the property",
      "To increase internet speed",
      "To connect wired devices only"
    ],
    correctIndex: 1,
    explanation: "Mesh systems use multiple access points that work together to provide seamless, consistent Wi-Fi coverage throughout larger properties, eliminating dead zones."
  },
  {
    question: "When testing Z-Wave or Zigbee signal strength, what indicates a healthy mesh network?",
    options: [
      "All devices connecting directly to the hub",
      "Devices routing through multiple hops with acceptable latency",
      "Only battery-powered devices present",
      "Maximum number of devices connected"
    ],
    correctIndex: 1,
    explanation: "A healthy mesh network has devices routing through intermediate nodes (hops) where direct hub connection is not possible, while maintaining acceptable response times."
  },
  {
    question: "What common household item can cause interference with 2.4 GHz Wi-Fi and Zigbee signals?",
    options: [
      "LED light bulbs",
      "Microwave ovens",
      "Refrigerators",
      "Television sets"
    ],
    correctIndex: 1,
    explanation: "Microwave ovens operate at approximately 2.45 GHz, which can cause significant interference with 2.4 GHz Wi-Fi and Zigbee networks when in use."
  },
  {
    question: "What is the recommended minimum signal level for Z-Wave devices from the hub?",
    options: [
      "Any signal level is acceptable",
      "-100 dBm or stronger",
      "-90 dBm or stronger with good hop count",
      "Exactly -50 dBm"
    ],
    correctIndex: 2,
    explanation: "Z-Wave devices should have signals of -90 dBm or stronger, with reasonable hop counts (typically 4 or fewer). Weaker signals may cause unreliable operation."
  }
];

const faqs = [
  {
    question: "Should I recommend mesh Wi-Fi for every smart home installation?",
    answer: "Not always. Mesh systems are beneficial for larger properties (typically over 150 square metres) or those with challenging construction (thick walls, multiple floors). Smaller properties with good router placement often perform well with a single quality router. Assess coverage during site survey before recommending expensive upgrades."
  },
  {
    question: "How do I test Zigbee signal strength without expensive equipment?",
    answer: "Many Zigbee hubs and coordinators provide signal quality indicators in their software (often shown as LQI - Link Quality Indicator). Home Assistant with a Zigbee integration shows network maps and signal quality. For basic testing, observe response times and reliability during commissioning tests."
  },
  {
    question: "What should I do if a customer has many Wi-Fi networks visible from neighbours?",
    answer: "Use a Wi-Fi analyser to identify the least congested channel, particularly 1, 6, or 11 for 2.4 GHz. Consider using 5 GHz for devices that support it. If severe congestion exists, Z-Wave operates on different frequencies and may be a better choice for critical devices."
  }
];

const SmartHomeModule7Section3 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 7`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Wifi className="h-10 w-10 text-elec-yellow" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {TITLE}
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            {DESCRIPTION}
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Critical Factor</h3>
            <p className="text-white text-sm">Wireless reliability directly impacts customer satisfaction</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Professional Approach</h3>
            <p className="text-white text-sm">Document signal surveys to demonstrate system capability</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Conduct professional Wi-Fi site surveys for smart home installations",
              "Understand RF signal characteristics for different protocols (Wi-Fi, Z-Wave, Zigbee)",
              "Identify and resolve common wireless interference issues",
              "Optimise network coverage for reliable device communication"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Understanding Signal Strength */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Signal Strength
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Signal strength is measured in decibels relative to one milliwatt (dBm). Understanding
              these measurements helps identify coverage issues and optimise device placement.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Wi-Fi Signal Strength Guide</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">-30 to -50 dBm</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">-50 to -60 dBm</span>
                  <span className="text-green-400">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">-60 to -70 dBm</span>
                  <span className="text-elec-yellow">Fair</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">-70 to -80 dBm</span>
                  <span className="text-orange-400">Weak</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Below -80 dBm</span>
                  <span className="text-red-400">Unreliable</span>
                </div>
              </div>
            </div>
            <p>
              Remember that dBm is a logarithmic scale. A 3 dB change represents a doubling or
              halving of signal power. Aim for -70 dBm or stronger for reliable smart device
              operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Wi-Fi Survey Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wi-Fi Site Survey Techniques
          </h2>
          <div className="space-y-4 text-white">
            <p>
              A proper Wi-Fi survey identifies coverage gaps and interference sources before
              installation, preventing issues that are harder to resolve after devices are commissioned.
            </p>
            <h4 className="font-semibold text-white">Survey Tools</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Smartphone Apps (Basic)</h5>
                <p className="text-white text-sm">
                  Free apps like Wi-Fi Analyzer (Android) or Airport Utility (iOS) provide
                  signal strength readings and channel analysis. Suitable for smaller installations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Professional Survey Tools</h5>
                <p className="text-white text-sm">
                  Tools like Ekahau, NetSpot, or AirMagnet provide detailed heat maps, interference
                  analysis, and predictive modelling. Essential for commercial or complex residential work.
                </p>
              </div>
            </div>
            <h4 className="font-semibold text-white">Survey Procedure</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Walk through property noting planned device locations</li>
              <li>Measure signal strength at each location</li>
              <li>Identify dead zones or weak areas</li>
              <li>Document neighbouring networks and their channels</li>
              <li>Note potential interference sources (microwaves, cordless phones)</li>
              <li>Record findings in survey report for customer</li>
            </ol>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Frequency Bands and Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequency Bands and Smart Home Protocols
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Different smart home protocols operate on different frequencies, each with
              distinct characteristics affecting range, interference, and bandwidth.
            </p>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">2.4 GHz (Wi-Fi, Zigbee)</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Better range and wall penetration</li>
                  <li>More susceptible to interference (microwaves, Bluetooth)</li>
                  <li>Only 3 non-overlapping channels (1, 6, 11)</li>
                  <li>Used by most smart home Wi-Fi devices and Zigbee</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">5 GHz (Wi-Fi)</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Higher bandwidth for cameras and streaming</li>
                  <li>Shorter range, poorer wall penetration</li>
                  <li>Many more non-overlapping channels</li>
                  <li>Not supported by most basic smart devices</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Sub-GHz (Z-Wave: 868 MHz UK)</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Excellent range and penetration</li>
                  <li>Less interference from household devices</li>
                  <li>Lower bandwidth (suitable for control, not video)</li>
                  <li>Dedicated smart home frequency band</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Interference and Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Identifying and Resolving Interference
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Interference degrades wireless performance and causes intermittent device failures.
              Understanding common interference sources enables effective troubleshooting.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Common Interference Sources</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Microwave ovens (2.45 GHz - affects Wi-Fi and Zigbee)</li>
                <li>Cordless phones (various bands including 2.4 GHz)</li>
                <li>Baby monitors (often 2.4 GHz)</li>
                <li>Bluetooth devices (2.4 GHz)</li>
                <li>Neighbouring Wi-Fi networks</li>
                <li>USB 3.0 ports (can emit 2.4 GHz interference)</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Resolution Strategies</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Change Wi-Fi channel to avoid interference (use channels 1, 6, or 11)</li>
              <li>Position router away from interference sources</li>
              <li>Use 5 GHz for high-bandwidth devices where possible</li>
              <li>Consider Z-Wave for devices in high-interference areas</li>
              <li>Add mesh nodes or access points to improve coverage</li>
              <li>Use wired backhaul for mesh systems where possible</li>
            </ul>
          </div>
        </section>

        {/* Optimising Coverage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Optimising Network Coverage
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Good coverage planning prevents connectivity issues and reduces support calls.
              Consider both Wi-Fi and mesh protocol (Z-Wave/Zigbee) coverage requirements.
            </p>
            <h4 className="font-semibold text-white">Router/Hub Placement</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Position centrally in the property where possible</li>
              <li>Elevate off the floor (shelf or wall-mounted)</li>
              <li>Avoid placement near metal objects or mirrors</li>
              <li>Keep away from large electrical appliances</li>
              <li>Ensure adequate ventilation to prevent overheating</li>
            </ul>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <h5 className="font-medium text-elec-yellow mb-2">Mesh Network Considerations</h5>
              <p className="text-white text-sm">
                For Z-Wave and Zigbee mesh networks, commission mains-powered devices first as
                these act as signal repeaters. Ensure at least 2-3 mains-powered devices between
                the hub and any battery-powered sensors at the network edge.
              </p>
            </div>
            <h4 className="font-semibold text-white">When to Recommend Network Upgrades</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Signal strength below -70 dBm in device locations</li>
              <li>Property larger than router's effective coverage</li>
              <li>Multiple floors or thick construction walls</li>
              <li>More than 30 Wi-Fi devices planned</li>
              <li>Outdoor device requirements (garden lighting, cameras)</li>
            </ul>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Commissioning
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-4">
              Next: Electrical Safety
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section3;
