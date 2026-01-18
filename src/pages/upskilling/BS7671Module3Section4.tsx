import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lighting-voltage-drop",
    question: "What is the maximum voltage drop allowed for lighting circuits per BS 7671?",
    options: [
      "5%",
      "3%",
      "2%",
      "7%"
    ],
    correctIndex: 1,
    explanation: "BS 7671 allows maximum 3% voltage drop for lighting circuits to ensure adequate lamp performance and prevent visible dimming. This equates to about 6.9V on a 230V supply."
  },
  {
    id: "main-factor",
    question: "Which factors have the greatest effect on voltage drop?",
    options: [
      "Cable colour and installation method",
      "Ambient temperature only",
      "Cable length and cross-sectional area",
      "Protective device type"
    ],
    correctIndex: 2,
    explanation: "Cable length and cross-sectional area are the main factors affecting voltage drop. Longer runs and smaller cables increase resistance, leading to greater voltage drop. This is why long cable runs often require upsizing."
  },
  {
    id: "voltage-drop-formula",
    question: "What is the basic voltage drop formula for single-phase circuits?",
    options: [
      "Vd = V × I × R",
      "Vd = mV/A/m × Current × Length (×2 for return)",
      "Vd = Power / Voltage",
      "Vd = I² × R"
    ],
    correctIndex: 1,
    explanation: "The formula Vd = mV/A/m × I × L (×2 for single phase) uses the cable's voltage drop factor from manufacturer data, multiplied by current and length. The ×2 accounts for the return path in single-phase circuits."
  }
];

const faqs = [
  {
    question: "Why is voltage drop more critical for lighting than power circuits?",
    answer: "Lighting is more sensitive because lamps produce noticeably less light at reduced voltage—a 5% drop can reduce light output by 15-20%. Additionally, lighting is often at the end of long circuits, accumulating voltage drop throughout the installation. Equipment like motors can tolerate more variation."
  },
  {
    question: "How do I reduce voltage drop in long cable runs?",
    answer: "The most effective methods are: (1) Increase cable cross-sectional area—doubling CSA roughly halves voltage drop; (2) Reduce cable length by repositioning distribution boards closer to loads; (3) Use parallel cables to share the current; (4) Consider higher voltage supply systems for very long runs."
  },
  {
    question: "Does voltage drop affect protective device operation?",
    answer: "Yes. Excessive voltage drop means less fault current flows during a fault, potentially preventing protective devices from tripping within required times. This is why Zs calculations must account for conductor resistance and why cable sizing involves both current rating AND voltage drop."
  },
  {
    question: "Can I exceed the 3%/5% limits with client agreement?",
    answer: "No. The voltage drop limits in BS 7671 are maximum permitted values for compliance. However, BS 7671 allows consideration of 'within the installation' vs 'from the supply' voltage drop. Some additional drop is permitted from the origin of the installation to equipment terminals. Always document your calculations."
  }
];

const quizQuestion = {
  question: "What is the consequence of excessive voltage drop in an installation?",
  options: [
    "Improved efficiency and better performance",
    "Reduced equipment performance, energy waste, and potential non-compliance",
    "Faster protective device operation",
    "Lower installation costs"
  ],
  correctAnswer: 1,
  explanation: "High voltage drop reduces equipment performance (motors run hot, lights dim), wastes energy as heat in cables, can cause equipment malfunction, and results in non-compliance with BS 7671 requirements."
};

const BS7671Module3Section4 = () => {
  useSEO({
    title: "Voltage Drop & System Design Limits | BS 7671 Module 3.4",
    description: "Learn to calculate voltage drop using BS 7671 methods and design installations within the 3%/5% limits for lighting and power circuits."
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
            <Link to="/electrician/upskilling/bs7671-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Voltage Drop & System Design Limits
          </h1>
          <p className="text-white/80">
            Calculating and managing voltage drop within BS 7671 limits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Lighting:</strong> Maximum 3% voltage drop (~6.9V on 230V)</li>
              <li><strong>Other circuits:</strong> Maximum 5% voltage drop (~11.5V)</li>
              <li><strong>Key factors:</strong> Cable length × current ÷ CSA</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> Cable sizing, long runs, EV chargers, outbuildings</li>
              <li><strong>Formula:</strong> Vd = mV/A/m × I × L (×2 single-phase)</li>
              <li><strong>Solution:</strong> Larger cable CSA or shorter cable run</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Analyse voltage drop effects on equipment performance",
              "Calculate voltage drop for single-phase and three-phase circuits",
              "Apply BS 7671 limits (3% lighting, 5% other circuits)",
              "Use mV/A/m values from cable manufacturer data",
              "Size cables to maintain acceptable voltage drop",
              "Recommend practical solutions for long cable runs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Why Voltage Drop Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Voltage Drop Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage drop is a critical design parameter that directly impacts equipment performance, energy efficiency, and regulatory compliance. When voltage drops below acceptable levels, motors run inefficiently, lights dim noticeably, and electronic equipment may malfunction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Effects of Excessive Voltage Drop</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Motors run hot and draw excess current</li>
                  <li>• Lighting output reduced (5% drop = ~15% less light)</li>
                  <li>• Electronic equipment malfunctions or resets</li>
                  <li>• Energy wasted as heat in cables</li>
                  <li>• EV chargers may not operate correctly</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lighting circuits:</strong> 3% maximum</li>
                  <li><strong>Other circuits:</strong> 5% maximum</li>
                  <li><strong>At 230V single-phase:</strong></li>
                  <li className="ml-4">3% = 6.9V drop</li>
                  <li className="ml-4">5% = 11.5V drop</li>
                </ul>
              </div>
            </div>

            <p>
              These limits ensure equipment receives adequate voltage throughout the installation. For installations supplied via private LV supply (not public network), the total permissible drop may be up to 8%.
            </p>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: Calculation Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voltage Drop Calculation Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The voltage drop in a cable depends on its resistance (related to length and CSA), the current flowing, and whether the circuit is single-phase or three-phase.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">The Formula</h3>
              <div className="text-center mb-4">
                <p className="text-lg font-mono text-white">Vd = (mV/A/m) × I × L ÷ 1000</p>
                <p className="text-sm text-white/70 mt-2">For single-phase: multiply by 2 (accounts for return conductor)</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Where:</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Vd:</strong> Voltage drop in volts</li>
                    <li><strong>mV/A/m:</strong> Cable voltage drop factor</li>
                    <li><strong>I:</strong> Design current in amps</li>
                    <li><strong>L:</strong> Cable length in metres</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">mV/A/m Values (typical):</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>1.5mm²:</strong> 29 mV/A/m</li>
                    <li><strong>2.5mm²:</strong> 18 mV/A/m</li>
                    <li><strong>4mm²:</strong> 11 mV/A/m</li>
                    <li><strong>6mm²:</strong> 7.3 mV/A/m</li>
                    <li><strong>10mm²:</strong> 4.4 mV/A/m</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Lighting Circuit</p>
              <div className="p-4 rounded bg-white/5 text-sm">
                <p className="mb-2"><strong>Given:</strong> 30m run, 1.5mm² cable, 8A design current</p>
                <p className="mb-2"><strong>Calculation:</strong> Vd = 29 × 8 × 30 × 2 ÷ 1000 = 13.9V</p>
                <p className="mb-2"><strong>As percentage:</strong> 13.9 ÷ 230 × 100 = 6.0%</p>
                <p className="text-red-400"><strong>Result:</strong> Exceeds 3% limit—cable must be upsized to 2.5mm²</p>
                <p className="text-green-400 mt-2"><strong>With 2.5mm²:</strong> 18 × 8 × 30 × 2 ÷ 1000 = 8.6V (3.7%)—still too high, try 4mm²</p>
                <p className="text-green-400"><strong>With 4mm²:</strong> 11 × 8 × 30 × 2 ÷ 1000 = 5.3V (2.3%)—acceptable</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Three-Phase Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Three-Phase Voltage Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase circuits have lower voltage drop per metre because the return current is carried by the other phases rather than a dedicated neutral. The formula is simplified—no ×2 multiplier needed.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Three-Phase Formula</h3>
              <div className="text-center mb-4">
                <p className="text-lg font-mono text-white">Vd = (mV/A/m) × I × L ÷ 1000</p>
                <p className="text-sm text-white/70 mt-2">No ×2 multiplier for balanced three-phase loads</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Lower voltage drop per unit length</li>
                  <li>• Smaller cable sizes for same power</li>
                  <li>• More efficient for heavy loads</li>
                  <li>• Better suited for long cable runs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Three-Phase</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Large motors (typically &gt;3kW)</li>
                  <li>• Commercial/industrial supplies</li>
                  <li>• Long submain cables</li>
                  <li>• Multiple single-phase loads to balance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Practical Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Solutions for Voltage Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Solutions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Increase CSA:</strong> Doubling CSA halves voltage drop</li>
                  <li><strong>Relocate DB:</strong> Shorter runs to loads</li>
                  <li><strong>Sub-distribution:</strong> Local DBs near load centres</li>
                  <li><strong>Parallel cables:</strong> Share current, reduce drop</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Problem Areas</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>EV chargers:</strong> 32A over long garden runs</li>
                  <li><strong>Outbuildings:</strong> Garden offices, workshops</li>
                  <li><strong>Agricultural:</strong> Farm buildings far from supply</li>
                  <li><strong>Exterior lighting:</strong> Long perimeter runs</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Cable Selection Process:</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Size for current-carrying capacity (In ≤ Iz)</li>
                <li><strong>2.</strong> Check voltage drop is within limits</li>
                <li><strong>3.</strong> Verify earth fault loop impedance (Zs)</li>
                <li><strong>4.</strong> If any check fails, upsize cable and repeat</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-medium text-red-400 mb-3">EV Charger Installation Problem</h3>
            <p className="text-sm text-white mb-3">
              An EV charger is installed 40 metres from the main panel using 6mm² cable. At 32A charging current, voltage drop exceeds 6%, causing erratic charger behaviour and charging failures. The charger repeatedly faults and resets.
            </p>
            <div className="p-3 rounded bg-white/5 text-sm mb-3">
              <p><strong>Calculation:</strong> Vd = 7.3 × 32 × 40 × 2 ÷ 1000 = 18.7V (8.1%)</p>
            </div>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Correct Approach:</p>
              <p className="text-sm text-white">
                Recalculation shows 10mm² cable is needed. Vd = 4.4 × 32 × 40 × 2 ÷ 1000 = 11.3V (4.9%)—within 5% limit. The contractor had to rewire the entire run at significant additional cost.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow mb-1">BS 7671 Limits</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Lighting: 3% max (6.9V at 230V)</li>
                <li>Other circuits: 5% max (11.5V)</li>
                <li>Private supply: up to 8% total</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Typical mV/A/m Values</p>
              <ul className="space-y-0.5 text-white/90">
                <li>1.5mm²: 29 | 2.5mm²: 18</li>
                <li>4mm²: 11 | 6mm²: 7.3</li>
                <li>10mm²: 4.4 | 16mm²: 2.8</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-3-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module3Section4;
