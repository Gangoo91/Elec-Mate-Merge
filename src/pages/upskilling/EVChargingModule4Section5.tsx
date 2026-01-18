import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m4s5-check1",
    question: "Which SPD type provides protection against direct lightning strikes?",
    options: ["Type 3", "Type 2", "Type 1", "Type AC"],
    correctIndex: 2,
    explanation: "Type 1 SPDs are designed for direct lightning protection, tested with 10/350μs waveforms. They handle the high energy content of lightning currents and are installed at the service entrance."
  },
  {
    id: "evcharging-m4s5-check2",
    question: "What is the maximum recommended total lead length for SPD connections?",
    options: ["2m", "1m", "0.5m", "0.25m"],
    correctIndex: 2,
    explanation: "SPD connecting leads should be kept as short as possible, ideally less than 0.5m total length (0.25m each way). Longer leads increase inductance and reduce protection effectiveness."
  },
  {
    id: "evcharging-m4s5-check3",
    question: "What is the minimum distance between SPD protection stages without decoupling inductors?",
    options: ["1m", "5m", "10m", "20m"],
    correctIndex: 2,
    explanation: "A minimum of 10m cable length is required between protection stages for proper energy coordination. If this distance cannot be achieved, decoupling inductors (typically 10-15μH) must be used."
  }
];

const faqs = [
  {
    question: "Do all EV chargers need surge protection?",
    answer: "BS 7671 requires SPD protection for circuits supplying equipment with rated impulse withstand voltage less than 2.5kV. Most EV chargers contain sensitive electronics requiring protection, particularly in areas with high lightning activity."
  },
  {
    question: "Can I use domestic SPDs for commercial EV chargers?",
    answer: "Commercial installations typically require higher capacity SPDs due to increased power levels and exposure. Use SPDs rated appropriately for the installation's expected fault levels and energy requirements."
  },
  {
    question: "How do I coordinate SPDs with RCD protection?",
    answer: "SPDs can cause temporary earth leakage during operation. Use Type A or Type B RCDs suitable for EV charging, and ensure SPD leakage characteristics are considered in RCD selection and discrimination."
  },
  {
    question: "What maintenance do SPDs require?",
    answer: "Regular visual inspection for damage, checking status indicators, verifying connection tightness, and testing isolation facilities. Replace SPDs when indicators show degradation or after significant surge events."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A coastal EV charging hub with 150kW rapid chargers requires surge protection. What SPD configuration is most appropriate?",
  options: [
    "Type 2 SPDs at charger supplies only",
    "Type 3 SPDs integrated in each charger",
    "Type 1+2 combined at main panel, Type 2 at charger supplies, Type 3 in chargers",
    "Type 1 at service entrance only"
  ],
  correctAnswer: 2,
  explanation: "Coastal locations with high lightning activity require comprehensive multi-stage protection. Type 1+2 combined devices at the main panel handle direct and indirect lightning, Type 2 at charger supplies provide secondary protection, and Type 3 integrated protection provides final equipment-level protection."
  }
];

const EVChargingModule4Section5 = () => {
  useSEO({
    title: "Surge and Lightning Protection SPD | EV Charging Module 4.5",
    description: "Learn to protect EV charging systems from electrical surges and lightning strikes. Covers SPD selection, installation, coordination, and BS 7671 requirements."
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
            <Link to="/electrician/upskilling/ev-charging-module-4">
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
            <span>Module 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Surge and Lightning Protection (SPD)
          </h1>
          <p className="text-white/80">
            Protecting EV charging systems from transient overvoltages
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Type 1:</strong> Direct lightning (10/350μs test)</li>
              <li><strong>Type 2:</strong> Indirect surges (8/20μs test)</li>
              <li><strong>Lead length:</strong> &lt;0.5m total for effectiveness</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> DIN rail SPD with green/red indicator</li>
              <li><strong>Use:</strong> Multi-stage coordination for full protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify surge protection requirements for EV charging",
              "Select appropriate SPD types and ratings",
              "Design coordinated surge protection schemes",
              "Install SPDs per BS 7671 requirements",
              "Verify protection effectiveness",
              "Implement lightning protection zone concepts"
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
            SPD Types and Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SPDs are classified by their ability to handle different surge characteristics.
              Selection depends on the protection zone and expected threat level.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 1</p>
                <p className="text-white text-xs">Direct lightning</p>
                <p className="text-white/70 text-xs">10/350μs test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 2</p>
                <p className="text-white text-xs">Indirect surges</p>
                <p className="text-white/70 text-xs">8/20μs test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type 3</p>
                <p className="text-white text-xs">Local equipment</p>
                <p className="text-white/70 text-xs">Combination wave</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 1 SPDs</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Iimp:</strong> 12.5kA to 25kA typical</li>
                  <li><strong>Location:</strong> Service entrance</li>
                  <li><strong>Technology:</strong> Spark gap, gas discharge</li>
                  <li><strong>Use:</strong> Buildings with external LPS</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2 SPDs</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>In:</strong> 5kA to 40kA typical</li>
                  <li><strong>Location:</strong> Distribution boards</li>
                  <li><strong>Technology:</strong> Metal oxide varistor</li>
                  <li><strong>Response:</strong> &lt;25ns fast response</li>
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
            Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SPD effectiveness depends critically on installation quality. Short lead lengths
              and proper earthing are essential for adequate protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lead length:</strong> &lt;0.5m total</li>
                  <li><strong>Cable routing:</strong> Avoid loops</li>
                  <li><strong>Type 1 cable:</strong> Minimum 16mm²</li>
                  <li><strong>Type 2 cable:</strong> Minimum 2.5mm²</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Coordination</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Stage spacing:</strong> Minimum 10m</li>
                  <li><strong>Alternative:</strong> Decoupling inductors</li>
                  <li><strong>Backup:</strong> MCB for each SPD</li>
                  <li><strong>Monitoring:</strong> Status indication</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EV Charging Protection Schemes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single charger:</strong> Type 2 at DB + integrated Type 3</li>
                <li><strong>Multiple chargers:</strong> Type 1+2 at incomer + Type 2 at sub-DB</li>
                <li><strong>Rapid charging:</strong> Enhanced Type 1 + DC SPDs + signal protection</li>
                <li><strong>Exposed location:</strong> Multi-stage with comprehensive earthing</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular inspection and testing ensures SPD systems remain effective.
              SPDs degrade over time and must be replaced when indicators show failure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Initial Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Insulation:</strong> Between terminals and earth</li>
                  <li><strong>Continuity:</strong> All earth connections</li>
                  <li><strong>Backup:</strong> MCB operation verified</li>
                  <li><strong>Indication:</strong> Status display tested</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Schedule</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Monthly:</strong> Visual inspection</li>
                  <li><strong>Quarterly:</strong> Connection checks</li>
                  <li><strong>Annually:</strong> Full testing, thermal imaging</li>
                  <li><strong>Post-storm:</strong> Immediate inspection</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SPD Status Monitoring:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Local indicators:</strong> LED displays, mechanical flags</li>
                <li><strong>Remote monitoring:</strong> Dry contacts for BMS integration</li>
                <li><strong>Smart SPDs:</strong> Digital communication interfaces</li>
                <li><strong>Trending:</strong> Monitor leakage current for degradation</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install SPDs as close as possible to protected equipment</li>
                <li>Use dedicated MCBs for SPD protection, not combined circuits</li>
                <li>Ensure good earth connections with low impedance paths</li>
                <li>Label SPDs clearly with maintenance instructions</li>
                <li>Consider environmental conditions (temperature, humidity)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Long leads:</strong> — Reduces protection effectiveness</li>
                <li><strong>No backup MCB:</strong> — SPD failure could cause fire</li>
                <li><strong>Wrong rating:</strong> — Under-rated SPDs fail prematurely</li>
                <li><strong>Ignoring indicators:</strong> — Failed SPDs provide no protection</li>
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
              <p className="font-medium text-white mb-1">SPD Selection</p>
              <ul className="space-y-0.5">
                <li>Type 1: Direct lightning, LPZ 0A</li>
                <li>Type 2: Indirect, distribution boards</li>
                <li>Type 3: Local equipment protection</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Installation Limits</p>
              <ul className="space-y-0.5">
                <li>Lead length: &lt;0.5m total</li>
                <li>Stage spacing: 10m minimum</li>
                <li>Cable: 16mm² (T1), 2.5mm² (T2)</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule4Section5;