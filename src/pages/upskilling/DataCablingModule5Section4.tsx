import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m5s4-check1",
    question: "What is the maximum power delivery for IEEE 802.3bt Type 4 (PoE++)?",
    options: ["30W", "60W", "90W", "120W"],
    correctIndex: 2,
    explanation: "IEEE 802.3bt Type 4 can deliver up to 90W at the PSE (Power Sourcing Equipment), with approximately 71W available at the powered device after cable losses."
  },
  {
    id: "datacabling-m5s4-check2",
    question: "How many pairs are used for power delivery in IEEE 802.3bt (4-pair PoE)?",
    options: ["1 pair", "2 pairs", "3 pairs", "All 4 pairs"],
    correctIndex: 3,
    explanation: "IEEE 802.3bt uses all four pairs for power delivery, distributing current across more conductors to manage heat generation and enable higher power levels."
  },
  {
    id: "datacabling-m5s4-check3",
    question: "What is the primary cable consideration for high-power PoE in bundled installations?",
    options: ["Cable colour", "Temperature rise and derating", "Connector type", "Cable length only"],
    correctIndex: 1,
    explanation: "High-power PoE causes temperature rise in cables. When multiple PoE cables are bundled together, power derating may be required to prevent overheating and ensure safe operation."
  }
];

const faqs = [
  {
    question: "Can I use existing Cat 5e cabling for PoE?",
    answer: "Yes, standard PoE (802.3af, 15.4W) and PoE+ (802.3at, 25.5W) work on Cat 5e. However, for high-power PoE++ (802.3bt), Cat 6A is recommended due to better thermal performance and lower resistance in bundled installations."
  },
  {
    question: "Why does PoE++ need all four pairs?",
    answer: "Using all four pairs distributes the current across more conductors, reducing heat generation per pair. This enables the higher power levels (60-90W) without exceeding safe cable temperatures, especially important in bundled cable runs."
  },
  {
    question: "What happens if my PSE doesn't have enough power budget?",
    answer: "The PSE will prioritise based on port settings or refuse to power lower-priority devices. Always calculate total power requirements plus 20% headroom when sizing PoE switches or midspan injectors."
  },
  {
    question: "Do I need special patch cords for PoE?",
    answer: "Standard patch cords work for most PoE applications. However, for PoE++ (60-90W) ensure patch cords meet category specifications and have quality connectors. Poor connections increase resistance and heat generation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A building has 48 wireless access points requiring 25W each. The infrastructure uses Cat 6A with cables bundled in groups of 12. What power delivery consideration is most important?",
  options: [
    "Total switch power budget only",
    "Cable derating for bundled high-power PoE",
    "Using the shortest patch cords possible",
    "Selecting the right colour cables"
  ],
  correctAnswer: 1,
  explanation: "With 12 cables bundled carrying 25W each, cable derating for thermal management is critical. Bundles of 7+ PoE cables require power derating (typically 15-20% for Cat 6A) to prevent overheating and maintain safe operation."
  }
];

const DataCablingModule5Section4 = () => {
  useSEO({
    title: "Power over Ethernet (PoE) Applications | Data Cabling Module 5.4",
    description: "Understanding PoE standards, power delivery systems, and cable infrastructure requirements for power and data integration."
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
            <Link to="/study-centre/upskilling/data-cabling-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power over Ethernet (PoE) Applications
          </h1>
          <p className="text-white/80">
            Power delivery systems and cable infrastructure requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>PoE:</strong> 15.4W (802.3af) - IP phones, basic cameras</li>
              <li><strong>PoE+:</strong> 25.5W (802.3at) - PTZ cameras, access points</li>
              <li><strong>PoE++:</strong> 60-90W (802.3bt) - LED lights, laptops</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Device wattage label, PSE power budget</li>
              <li><strong>Use:</strong> Cat 6A for high-power, calculate bundle derating</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand PoE standards and power levels",
              "Select appropriate cable for PoE applications",
              "Calculate power budgets for installations",
              "Apply cable derating for bundled runs",
              "Design thermal management strategies",
              "Troubleshoot PoE connectivity issues"
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
            PoE Standards Evolution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power over Ethernet has evolved through multiple IEEE standards to support increasingly
              demanding applications whilst maintaining backward compatibility.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Original Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>802.3af (2003):</strong> 15.4W at PSE, 12.95W at PD</li>
                  <li><strong>Voltage:</strong> 44-57V DC, nominal 48V</li>
                  <li><strong>Current:</strong> 350mA max per pair</li>
                  <li><strong>Pairs used:</strong> 2 pairs (Alternative A or B)</li>
                  <li><strong>Applications:</strong> IP phones, basic cameras</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>802.3at (2009):</strong> 25.5W (PoE+)</li>
                  <li><strong>802.3bt Type 3:</strong> 60W (4-pair PoE)</li>
                  <li><strong>802.3bt Type 4:</strong> 90W (PoE++)</li>
                  <li><strong>4-pair benefit:</strong> Current distributed across all conductors</li>
                  <li><strong>Applications:</strong> Wi-Fi 6 APs, LED lighting, laptops</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PoE (af)</p>
                <p className="text-white/90 text-xs">15.4W - Phones</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PoE+ (at)</p>
                <p className="text-white/90 text-xs">25.5W - Cameras</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PoE++ (bt)</p>
                <p className="text-white/90 text-xs">60-90W - Lighting</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Delivery and Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PoE systems use sophisticated detection and classification to ensure safe power
              delivery and prevent damage to non-PoE equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Delivery Methods:</p>
              <div className="grid sm:grid-cols-3 gap-4 mt-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Alternative A</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Uses pins 1,2 and 3,6</li>
                    <li>Phantom power on data pairs</li>
                    <li>Most common method</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Alternative B</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Uses pins 4,5 and 7,8</li>
                    <li>Dedicated power pairs</li>
                    <li>Midspan injectors</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">4-Pair (802.3bt)</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>All four pairs carry power</li>
                    <li>Doubled capacity</li>
                    <li>Reduced heating</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Detection sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Detection:</strong> PSE applies 2.8-10V, checks for 25kΩ signature</li>
                <li><strong>2. Classification:</strong> Measures current draw to determine class</li>
                <li><strong>3. Power enable:</strong> Ramps to 48V with inrush limiting</li>
                <li><strong>4. Monitoring:</strong> Continuous current checking for disconnect</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable and Thermal Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Higher power PoE creates thermal management challenges, particularly in bundled
              cable runs where heat accumulation can affect performance and safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Temperature Rise</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat 5e (24 AWG):</strong> ~15°C at full PoE+</li>
                  <li><strong>Cat 6 (23 AWG):</strong> ~12°C at full PoE+</li>
                  <li><strong>Cat 6A (23 AWG):</strong> ~10°C at full PoE+</li>
                  <li><strong>Bundle effect:</strong> Multiply by derating factor</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bundle Derating Guidelines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1-6 cables:</strong> No derating required</li>
                  <li><strong>7-12 cables:</strong> 20% power reduction</li>
                  <li><strong>13-24 cables:</strong> 30% power reduction</li>
                  <li><strong>25+ cables:</strong> 40% power reduction</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal management best practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use Cat 6A for high-power PoE applications</li>
                <li>Maintain cable separation where possible</li>
                <li>Use ventilated cable trays, not enclosed conduit</li>
                <li>Monitor ambient temperature in cable routes</li>
                <li>Document power allocation per cable run</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate total power budget including 20% headroom</li>
                <li>Consider device startup inrush currents</li>
                <li>Plan UPS capacity for PoE load requirements</li>
                <li>Use higher category cable for future power upgrades</li>
                <li>Document power per port for troubleshooting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underestimating power:</strong> — Not accounting for all devices</li>
                <li><strong>Ignoring bundles:</strong> — No derating for grouped cables</li>
                <li><strong>Wrong cable:</strong> — Cat 5e for high-power applications</li>
                <li><strong>Poor connections:</strong> — High resistance causes overheating</li>
                <li><strong>No UPS planning:</strong> — PoE devices lose power in outage</li>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">PoE Power Levels</p>
              <ul className="space-y-0.5">
                <li>802.3af: 15.4W (phones)</li>
                <li>802.3at: 25.5W (cameras)</li>
                <li>802.3bt T3: 60W (APs)</li>
                <li>802.3bt T4: 90W (lighting)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Cable Selection</p>
              <ul className="space-y-0.5">
                <li>Standard PoE: Cat 5e OK</li>
                <li>PoE+: Cat 6 recommended</li>
                <li>PoE++: Cat 6A required</li>
                <li>Always derate bundles</li>
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
            <Link to="/study-centre/upskilling/data-cabling-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-5-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule5Section4;