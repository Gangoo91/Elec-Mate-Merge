import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m2s3-check1",
    question: "What does OCPP stand for and what is its purpose?",
    options: ["Open Charge Point Protocol - standard for EVSE-to-backend communication", "Operational Charging Power Protocol - regulates charging speeds", "Online Connection Point Protocol - manages internet connectivity", "Optimised Charging Power Performance - battery management"],
    correctIndex: 0,
    explanation: "OCPP (Open Charge Point Protocol) is an open standard communication protocol between charging stations and central management systems, ensuring interoperability and preventing vendor lock-in."
  },
  {
    id: "evcharging-m2s3-check2",
    question: "Which connectivity option provides the highest reliability for EV chargers?",
    options: ["Wi-Fi 2.4GHz", "4G cellular", "Ethernet/hardwired", "Power Line Communication"],
    correctIndex: 2,
    explanation: "Ethernet/hardwired connections offer the highest stability with no wireless interference, making them ideal for commercial installations and critical infrastructure where reliability is paramount."
  },
  {
    id: "evcharging-m2s3-check3",
    question: "In dynamic load management, what happens when total demand exceeds supply capacity?",
    options: ["Charging stops completely", "The system reduces power to each charger proportionally", "Only the last connected vehicle charges", "The main breaker trips"],
    correctIndex: 1,
    explanation: "Dynamic load management automatically reduces power allocation to each charging point to stay within the available supply capacity, allowing all vehicles to continue charging at reduced rates rather than stopping completely."
  }
];

const faqs = [
  {
    question: "What's the difference between OCPP 1.6 and OCPP 2.0.1?",
    answer: "OCPP 2.0.1 offers enhanced security (device model framework), ISO 15118 support for Plug & Charge, display messaging, and 80+ message types vs 44 in version 1.6. Most new installations should specify OCPP 2.0.1 for future-proofing."
  },
  {
    question: "Can I use Wi-Fi in a commercial car park installation?",
    answer: "Wi-Fi can work but has limitations - range (30-100m), interference, and network congestion. For commercial installations, consider Ethernet for reliability or 4G/5G cellular as backup. A hybrid approach provides redundancy."
  },
  {
    question: "What cybersecurity measures should smart chargers have?",
    answer: "Essential measures include TLS 1.3 encryption, certificate-based authentication (PKI), secure firmware updates, network segmentation, and regular security patches. OCPP 2.0.1 includes enhanced security features as standard."
  },
  {
    question: "How does solar integration work with smart chargers?",
    answer: "Smart chargers with solar integration monitor PV generation and adjust charging power to maximise self-consumption. When solar output is high, charging power increases; when low, it reduces or pauses, optimising for lowest cost or greenest energy."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A workplace with 20 charging bays on a 100A supply needs to manage charging. What system feature is most critical?",
  options: [
    "RFID card authentication",
    "Dynamic load management with OCPP",
    "Individual energy metering",
    "Mobile app payment processing"
  ],
  correctAnswer: 1,
  explanation: "With 20 bays potentially demanding 640A (32A × 20), dynamic load management via OCPP is essential to distribute the 100A supply across active sessions without overloading. Authentication and payment are important but secondary to managing the electrical capacity."
  }
];

const EVChargingModule2Section3 = () => {
  useSEO({
    title: "Smart Chargers, App Control & APIs | EV Charging Module 2.3",
    description: "Learn about connected EV charging systems including OCPP protocol, mobile app features, API integration, and dynamic load management."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/ev-charging-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Chargers, App Control & APIs
          </h1>
          <p className="text-white/80">
            Connected charging systems and remote management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Smart charging:</strong> Remote control, scheduling, load management</li>
              <li><strong>OCPP:</strong> Industry standard for charger-to-backend communication</li>
              <li><strong>APIs:</strong> Enable integration with apps and energy systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wi-Fi antenna, Ethernet port, SIM slot on EVSE</li>
              <li><strong>Use:</strong> Load management on multi-bay installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand smart charger connectivity options",
              "Explain OCPP protocol versions and messages",
              "Configure dynamic load management",
              "Integrate chargers with mobile applications",
              "Implement cybersecurity best practices",
              "Design scalable charging infrastructure"
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
            Connectivity Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart chargers require network connectivity for remote management, load balancing,
              payment processing, and user authentication. The choice of connectivity affects
              reliability, cost, and installation complexity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wi-Fi (802.11)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Range:</strong> 30-100m depending on environment</li>
                  <li><strong>Speed:</strong> Up to 1.3Gbps (802.11ac)</li>
                  <li><strong>Pros:</strong> No ongoing costs, easy setup</li>
                  <li><strong>Cons:</strong> Interference, range limitations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">4G/5G Cellular</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Coverage:</strong> 99.9% network availability</li>
                  <li><strong>Latency:</strong> 4G: 50ms, 5G: &lt;10ms</li>
                  <li><strong>Pros:</strong> Works anywhere with signal</li>
                  <li><strong>Cons:</strong> Ongoing data charges, SIM management</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ethernet (Hardwired)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Speed:</strong> 100Mbps to 10Gbps</li>
                  <li><strong>Reliability:</strong> Highest - no interference</li>
                  <li><strong>Pros:</strong> Most stable, no signal issues</li>
                  <li><strong>Cons:</strong> Requires structured cabling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Line Communication</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Range:</strong> Up to 300m on LV networks</li>
                  <li><strong>Technology:</strong> 2-30MHz over power cables</li>
                  <li><strong>Pros:</strong> No additional cabling needed</li>
                  <li><strong>Cons:</strong> Noise susceptibility, variable speed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            OCPP Protocol
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Open Charge Point Protocol (OCPP) is the industry standard for communication
              between charging stations and central management systems. It ensures interoperability
              and prevents vendor lock-in.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OCPP 1.6J (2015)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>44 message types</li>
                  <li>WebSocket over TLS transport</li>
                  <li>Smart charging profiles</li>
                  <li>Local authorisation lists</li>
                  <li>Firmware management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OCPP 2.0.1 (2020)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>80+ message types</li>
                  <li>Device model framework</li>
                  <li>ISO 15118 Plug & Charge support</li>
                  <li>Enhanced security features</li>
                  <li>Display message support</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core OCPP Messages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Authorize:</strong> Validate user credentials (RFID, app)</li>
                <li><strong>StartTransaction:</strong> Begin charging session</li>
                <li><strong>MeterValues:</strong> Report energy consumption</li>
                <li><strong>StatusNotification:</strong> Report charger status</li>
                <li><strong>StopTransaction:</strong> End session and finalise billing</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dynamic Load Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dynamic load management (DLM) automatically distributes available electrical
              capacity across multiple charging points, preventing supply overload while
              maximising charging utilisation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Balancing Algorithms</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Equal distribution:</strong> Available power divided equally among active sessions</li>
                <li><strong>Priority-based:</strong> Allocation based on user tier or payment level</li>
                <li><strong>First-come-first-served:</strong> Earlier connections get priority</li>
                <li><strong>Adaptive scheduling:</strong> ML-based prediction of patterns</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">100A Supply</p>
                <p className="text-white/90 text-xs">Total available</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">4 × 32A</p>
                <p className="text-white/90 text-xs">Max per charger</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">25A each</p>
                <p className="text-white/90 text-xs">When all active</p>
              </div>
            </div>

            <p>
              Example: A 100A supply with 4 chargers each rated 32A. When all four are active,
              DLM reduces each to 25A (100A ÷ 4). As vehicles complete charging, remaining
              sessions can increase power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Specify OCPP 2.0.1 for new installations</li>
                <li>Provide redundant connectivity (Wi-Fi + cellular backup)</li>
                <li>Install CT clamps for dynamic load monitoring</li>
                <li>Configure appropriate load management algorithm for use case</li>
                <li>Test communication before handover</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Vendor lock-in:</strong> — Always insist on OCPP compliance</li>
                <li><strong>Single connectivity:</strong> — Wi-Fi alone often unreliable in car parks</li>
                <li><strong>No load management:</strong> — Essential for multi-bay installations</li>
                <li><strong>Weak security:</strong> — Change default passwords, enable TLS</li>
              </ul>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Smart Features</p>
              <ul className="space-y-0.5">
                <li>Remote start/stop</li>
                <li>Scheduled charging</li>
                <li>Energy monitoring</li>
                <li>Load management</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Connectivity Options</p>
              <ul className="space-y-0.5">
                <li>Wi-Fi: Easy, low cost</li>
                <li>Cellular: Reliable, ongoing cost</li>
                <li>Ethernet: Most stable</li>
                <li>PLC: No extra cabling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule2Section3;