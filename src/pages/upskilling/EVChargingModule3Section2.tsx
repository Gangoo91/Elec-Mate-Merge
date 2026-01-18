import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m3s2-check1",
    question: "What is the maximum voltage drop allowed for EV charging circuits according to BS 7671?",
    options: ["3% of nominal voltage", "5% of nominal voltage", "10% of nominal voltage", "7% of nominal voltage"],
    correctIndex: 1,
    explanation: "BS 7671 permits 5% voltage drop for power circuits including EV charging. For a 230V supply, this equates to 11.5V maximum voltage drop."
  },
  {
    id: "evcharging-m3s2-check2",
    question: "Why might a cable need to be larger than required for current capacity alone?",
    options: [
      "To improve cable aesthetics",
      "To limit voltage drop within regulatory limits",
      "To reduce cable weight",
      "To make installation easier"
    ],
    correctIndex: 1,
    explanation: "For longer cable runs, voltage drop becomes the limiting factor. A cable may have adequate current capacity but still cause excessive voltage drop, requiring upsizing."
  },
  {
    id: "evcharging-m3s2-check3",
    question: "What factors affect cable current-carrying capacity?",
    options: [
      "Cable colour only",
      "Ambient temperature, installation method, and grouping",
      "Manufacturer brand only",
      "The connected load type"
    ],
    correctIndex: 1,
    explanation: "Cable current-carrying capacity is affected by ambient temperature (derating factors), installation method (clipped, in conduit, etc.), and grouping with other cables."
  }
];

const faqs = [
  {
    question: "How do I calculate voltage drop for a single-phase circuit?",
    answer: "Use the formula: Vd = I × R × L, where I is current in amps, R is resistance per metre (from cable tables), and L is cable length in metres. The result must be less than 5% of 230V (11.5V) for power circuits."
  },
  {
    question: "What's the difference between SWA and XLPE cables?",
    answer: "SWA (Steel Wire Armoured) provides mechanical protection and is suitable for direct burial. XLPE (Cross-linked Polyethylene) has a 90°C operating temperature allowing higher current capacity but typically needs additional mechanical protection."
  },
  {
    question: "When should I use LSF cables?",
    answer: "LSF (Low Smoke & Fume) cables are required in enclosed spaces and buildings with high occupancy like car parks, commercial buildings, and public areas where toxic smoke could hinder evacuation."
  },
  {
    question: "How does the continuous load of EV charging affect cable sizing?",
    answer: "EV charging is a continuous load operating at near-maximum current for extended periods. This causes thermal effects that must be considered in cable sizing and may require cables larger than the simple current calculation suggests."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 7kW domestic EV charger has an 80m cable run. The 4mm² cable has 28V voltage drop (12.2%). What cable size should be used?",
  options: [
    "4mm² - it's fine for the current",
    "6mm² - slightly better",
    "10mm² - to meet voltage drop limits",
    "16mm² - for maximum safety"
  ],
  correctAnswer: 2,
  explanation: "While 4mm² has adequate current capacity for 32A, the 12.2% voltage drop exceeds the 5% limit. 10mm² reduces voltage drop to approximately 4.7%, meeting BS 7671 requirements."
  }
];

const EVChargingModule3Section2 = () => {
  useSEO({
    title: "Voltage Drop and Cable Sizing | EV Charging Module 3.2",
    description: "Calculate voltage drop and select appropriate cable sizes for EV charging installations according to BS 7671 requirements."
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
            <Link to="..">
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
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Voltage Drop and Cable Sizing
          </h1>
          <p className="text-white/80">
            Selecting cables for EV charging installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671 Limit:</strong> 5% voltage drop for power circuits</li>
              <li><strong>230V:</strong> Maximum 11.5V drop allowed</li>
              <li><strong>Formula:</strong> Vd = I × R × L (single-phase)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Long cable runs to remote charge points</li>
              <li><strong>Use:</strong> Check Vd before finalising cable size</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate voltage drop per BS 7671",
              "Select cables based on current and Vd",
              "Apply correction factors for installation",
              "Understand cable/current/resistance relationships",
              "Identify when voltage drop compensation needed",
              "Size cables for continuous EV loads"
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
            BS 7671 Voltage Drop Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671:2018+A2:2022 sets specific voltage drop limits for different circuit types.
              For EV charging, these limits ensure efficient charging and protect equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lighting:</strong> 3% (6.9V for 230V)</li>
                  <li><strong>Power/EV:</strong> 5% (11.5V for 230V)</li>
                  <li><strong>Combined:</strong> 4% maximum total</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Causes Voltage Drop?</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Conductor resistance</li>
                  <li>Cable length</li>
                  <li>Current magnitude</li>
                  <li>Temperature effects</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Voltage Drop Formulas</p>
              <p className="font-mono text-white text-sm mb-1">Single-phase: Vd = I × R × L</p>
              <p className="font-mono text-white text-sm">Three-phase: Vd = √3 × I × R × L</p>
              <p className="text-xs text-white/70 mt-2">Where I = current, R = resistance/metre, L = length</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Sizing Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection involves two checks: current-carrying capacity and voltage drop.
              The final cable size must satisfy both requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-Step Cable Selection:</p>
              <ol className="text-sm text-white space-y-2 ml-4 list-decimal list-inside">
                <li><strong>Calculate design current (Ib):</strong> Based on load and diversity</li>
                <li><strong>Select protective device (In):</strong> Ensure In ≥ Ib</li>
                <li><strong>Apply correction factors:</strong> Temperature, grouping, installation</li>
                <li><strong>Find minimum cable for current:</strong> Using BS 7671 tables</li>
                <li><strong>Check voltage drop:</strong> Calculate and verify against limits</li>
                <li><strong>Select final size:</strong> Larger of current or Vd requirement</li>
              </ol>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ca</p>
                <p className="text-white text-xs">Temperature factor</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Cg</p>
                <p className="text-white text-xs">Grouping factor</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ci</p>
                <p className="text-white text-xs">Installation factor</p>
              </div>
            </div>

            <div className="p-3 rounded bg-transparent border border-red-400/30">
              <p className="text-sm font-medium text-red-400/80 mb-1">Continuous Loading</p>
              <p className="text-sm text-white">EV charging operates at high current for extended periods. This sustained thermal load affects both cable sizing and protective device selection.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Types for EV Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">SWA Cable</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Mechanical protection</li>
                  <li>• Direct burial suitable</li>
                  <li>• Higher cost, very durable</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">LSF Cable</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Low smoke emission</li>
                  <li>• Required in car parks</li>
                  <li>• Enclosed spaces</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">XLPE Cable</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 90°C operating temp</li>
                  <li>• Higher current capacity</li>
                  <li>• Cost-effective</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Size Quick Reference:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-sm text-white">
                  <p><strong>3.5kW Single-phase:</strong> 2.5-4mm²</p>
                  <p><strong>7kW Single-phase:</strong> 4-6mm²</p>
                </div>
                <div className="text-sm text-white">
                  <p><strong>11kW Three-phase:</strong> 2.5-4mm²</p>
                  <p><strong>22kW Three-phase:</strong> 4-10mm²</p>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-2">Sizes depend on cable run length and installation method</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Worked Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Example 1: Domestic 7kW</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Scenario: 25m cable run, conduit</li>
                  <li>Design current: 30.4A</li>
                  <li>Cable for current: 4mm²</li>
                  <li>Vd check: 8.7V (3.8%)</li>
                  <li className="text-elec-yellow">Result: 4mm² suitable</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Example 2: Commercial 22kW</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Scenario: 50m SWA, 3-phase</li>
                  <li>Design current: 31.8A</li>
                  <li>Cable for current: 6mm²</li>
                  <li>Vd check: 11.6V (2.9%)</li>
                  <li className="text-elec-yellow">Result: 6mm² suitable</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded bg-transparent border border-red-400/30">
              <p className="text-sm font-medium text-white mb-2">Example 3: Long Run Problem</p>
              <ul className="text-xs text-white space-y-1">
                <li>Scenario: 7kW charger, 80m cable run</li>
                <li>4mm² Vd: 28V (12.2%) — too high!</li>
                <li>10mm² Vd: 10.7V (4.7%) — acceptable</li>
                <li className="text-elec-yellow font-medium">Result: 10mm² required for voltage drop</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Sizing Cables</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check both current capacity AND voltage drop</li>
                <li>Use the larger cable size if Vd requires upsizing</li>
                <li>Consider future load growth when selecting cable</li>
                <li>Account for continuous load thermal effects</li>
                <li>Apply all relevant correction factors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring voltage drop:</strong> — Leads to reduced charging performance</li>
                <li><strong>Wrong cable type:</strong> — LSF required in car parks</li>
                <li><strong>No correction factors:</strong> — Undersized cables overheat</li>
                <li><strong>Undersized for long runs:</strong> — Vd exceeds limits</li>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Voltage Drop Limits</p>
              <ul className="space-y-0.5">
                <li>Lighting: 3% (6.9V)</li>
                <li>Power/EV: 5% (11.5V)</li>
                <li>Combined: 4% max</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Cable Types</p>
              <ul className="space-y-0.5">
                <li>SWA: Underground/mechanical</li>
                <li>LSF: Car parks/enclosed</li>
                <li>XLPE: Higher temp rating</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule3Section2;