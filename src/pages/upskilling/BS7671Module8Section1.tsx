import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m8s1-check1",
    question: "Where would you find maximum Zs values for circuits protected by MCBs?",
    options: [
      "Appendix 1",
      "Appendix 3 (Tables 41.2-41.4)",
      "Appendix 12",
      "Part 7"
    ],
    correctIndex: 1,
    explanation: "Maximum Zs values are found in Appendix 3, specifically Tables 41.2 (Type B MCBs), 41.3 (Type C), and 41.4 (Type D). These ensure disconnection within required times."
  },
  {
    id: "bs7671-m8s1-check2",
    question: "What does the correction factor Cg account for in cable sizing?",
    options: [
      "Temperature",
      "Grouping of cables",
      "Thermal insulation",
      "Voltage drop"
    ],
    correctIndex: 1,
    explanation: "Cg is the grouping correction factor applied when cables are installed together. Grouped cables dissipate heat less effectively, requiring derating of their current-carrying capacity."
  },
  {
    id: "bs7671-m8s1-check3",
    question: "What is the maximum voltage drop allowed for lighting circuits?",
    options: ["3%", "4%", "5%", "6%"],
    correctIndex: 0,
    explanation: "BS 7671 recommends a maximum 3% voltage drop for lighting circuits from origin to load. This limit helps maintain lamp performance and prevents visible flickering."
  }
];

const faqs = [
  {
    question: "How do I use the Zs tables to verify fault protection?",
    answer: "Measure actual Zs, apply temperature correction factor (0.8 for measured values), then compare with maximum tabulated Zs for your protective device type and rating. Measured value must be less than tabulated maximum."
  },
  {
    question: "Why are there different current-carrying capacity tables?",
    answer: "Different tables apply to different installation methods. Appendix 4 has tables for cables in conduit, trunking, clipped direct, buried, etc. Each method affects heat dissipation differently."
  },
  {
    question: "What's the difference between design current (Ib) and rated current (In)?",
    answer: "Design current (Ib) is the actual expected load current. Rated current (In) is the protective device rating. In must be ≥ Ib, and the cable's current-carrying capacity (Iz) must be ≥ In."
  },
  {
    question: "How do I account for thermal insulation contact?",
    answer: "Apply correction factor Ci from Table 52.2. Values range from 0.5 (totally surrounded) to 1.0 (no contact). This significantly reduces cable current-carrying capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A circuit is installed in a 35°C ambient temperature environment. What must you do when selecting cable size?",
  options: [
    "Use the next size up automatically",
    "Apply ambient temperature correction factor from Table 4B1",
    "Ignore temperature as BS 7671 tables are conservative",
    "Use the same size as for 30°C ambient"
  ],
  correctAnswer: 1,
  explanation: "Apply the ambient temperature correction factor from Table 4B1 (or equivalent in Appendix 4). At 35°C, this reduces the cable's current-carrying capacity, potentially requiring a larger cable size."
  }
];

const BS7671Module8Section1 = () => {
  useSEO({
    title: "Navigating Key Appendices | BS7671 Module 8.1",
    description: "Master BS 7671 appendices including Zs tables, conductor sizing tables, and voltage drop calculations for electrical installations."
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
            <Link to="/study-centre/upskilling/bs7671-module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Navigating Key Appendices
          </h1>
          <p className="text-white/80">
            Zs tables, conductor sizing, and voltage drop calculations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Appendix 3:</strong> Zs values for fault protection</li>
              <li><strong>Appendix 4:</strong> Current-carrying capacities</li>
              <li><strong>Appendix 12:</strong> Voltage drop data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Every design calculation, every test verification</li>
              <li><strong>Use:</strong> Cross-reference tables systematically</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Navigating BS 7671 appendix structure",
              "Using Zs tables for protection verification",
              "Cable sizing using current-carrying capacity tables",
              "Applying correction factors correctly",
              "Calculating voltage drop",
              "Selecting cables for thermal constraints"
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
            Appendix Structure Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 appendices contain essential reference data for design and verification.
              Understanding where to find specific information is as important as the calculations
              themselves.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commonly Used Appendices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Appendix 1:</strong> British Standards referenced</li>
                  <li><strong>Appendix 3:</strong> Time/current characteristics</li>
                  <li><strong>Appendix 4:</strong> Current-carrying capacities</li>
                  <li><strong>Appendix 12:</strong> Voltage drop</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Key Appendices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Appendix 5:</strong> Classification of influences</li>
                  <li><strong>Appendix 6:</strong> Model forms</li>
                  <li><strong>Appendix 14:</strong> Methods of measurement</li>
                  <li><strong>Appendix 15:</strong> Ring final circuits</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">App 3</p>
                <p className="text-white/90 text-xs">Zs tables</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">App 4</p>
                <p className="text-white/90 text-xs">Cable sizing</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">App 12</p>
                <p className="text-white/90 text-xs">Volt drop</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Using Zs Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum Zs values ensure automatic disconnection within required times. Different
              tables apply to different protective device types.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Zs Table Selection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Table 41.2:</strong> Type B MCBs (3-5× In trip)</li>
                <li><strong>Table 41.3:</strong> Type C MCBs (5-10× In trip)</li>
                <li><strong>Table 41.4:</strong> Type D MCBs (10-20× In trip)</li>
                <li><strong>Table 41.5:</strong> BS 3036 fuses (rewirable)</li>
                <li><strong>Table 41.6:</strong> BS 88 fuses (HRC)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Measure actual Zs at furthest point</li>
                <li>2. Apply 0.8 correction for temperature</li>
                <li>3. Find maximum Zs from appropriate table</li>
                <li>4. Verify: Measured × 0.8 &lt; Tabulated max</li>
              </ul>
            </div>

            <p>
              The 0.8 factor accounts for cables being tested cold when tables assume maximum
              operating temperature. This ensures disconnection times are met under worst-case
              conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Current-Carrying Capacity Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Appendix 4 contains tables for selecting cable sizes based on installation method,
              cable type, and applied correction factors.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Method A:</strong> In conduit in insulated wall</li>
                  <li><strong>Method B:</strong> In conduit on wall</li>
                  <li><strong>Method C:</strong> Clipped direct</li>
                  <li><strong>Method D:</strong> In ground</li>
                  <li><strong>Method E:</strong> Free air (perforated tray)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correction Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ca:</strong> Ambient temperature</li>
                  <li><strong>Cg:</strong> Grouping of cables</li>
                  <li><strong>Ci:</strong> Thermal insulation</li>
                  <li><strong>Cc:</strong> Semi-enclosed fuse factor</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Selection Formula:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>It ≥ In / (Ca × Cg × Ci × Cc)</li>
                <li>Where It = tabulated current-carrying capacity</li>
                <li>In = protective device rated current</li>
                <li>Select cable with It ≥ calculated value</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Voltage Drop Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage drop must be limited to ensure equipment operates correctly. Appendix 12
              provides mV/A/m values for different cable types and sizes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lighting:</strong> 3% maximum</li>
                  <li><strong>Other circuits:</strong> 5% maximum</li>
                  <li><strong>From origin:</strong> Total to point of use</li>
                  <li><strong>Public supply:</strong> -6% to +10%</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Steps</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Find mV/A/m from Appendix 12</li>
                  <li>2. VD = (mV/A/m × Ib × L) / 1000</li>
                  <li>3. Convert to percentage: VD / 230 × 100</li>
                  <li>4. Compare with limit</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>2.5mm² cable, 20A load, 25m length</li>
                <li>mV/A/m = 18 (from table)</li>
                <li>VD = (18 × 20 × 25) / 1000 = 9V</li>
                <li>Percentage = 9 / 230 × 100 = 3.9%</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Determine design current (Ib) from load calculation</li>
                <li>Select protective device rating (In ≥ Ib)</li>
                <li>Calculate correction factors for installation</li>
                <li>Select cable for current-carrying capacity</li>
                <li>Verify voltage drop within limits</li>
                <li>Check Zs for fault protection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong table:</strong> — Using wrong installation method table</li>
                <li><strong>Missing factors:</strong> — Forgetting grouping or temperature correction</li>
                <li><strong>Zs confusion:</strong> — Using wrong MCB type table</li>
                <li><strong>Unit errors:</strong> — mV/A/m requires careful unit conversion</li>
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
              <p className="font-medium text-white mb-1">Key Tables</p>
              <ul className="space-y-0.5">
                <li>Table 41.2-41.6: Zs values</li>
                <li>Table 4D1A-4E4A: Cable Iz</li>
                <li>Table 4Ab: mV/A/m values</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Limits</p>
              <ul className="space-y-0.5">
                <li>Lighting VD: 3%</li>
                <li>Other VD: 5%</li>
                <li>Zs correction: ×0.8</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-8-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module8Section1;