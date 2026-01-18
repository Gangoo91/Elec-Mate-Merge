import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "socket-diversity",
    question: "What is the typical diversity factor for domestic socket outlets?",
    options: [
      "100% (no diversity)",
      "66% for first 10A, 40% for remainder",
      "50% for all sockets",
      "75% throughout"
    ],
    correctIndex: 1,
    explanation: "BS 7671 recommends 66% diversity for the first 10A of socket outlets, then 40% for the remainder in domestic installations. This reflects the reality that not all sockets are used simultaneously at full load."
  },
  {
    id: "no-diversity-loads",
    question: "Which load type should have NO diversity applied?",
    options: [
      "Lighting circuits",
      "Socket outlet circuits",
      "Emergency lighting",
      "Cooker circuits"
    ],
    correctIndex: 2,
    explanation: "Emergency lighting and other safety-critical loads should always be calculated at 100% demand with no diversity applied. These systems must function fully when needed."
  },
  {
    id: "motor-diversity",
    question: "What must be considered when applying diversity to motor loads?",
    options: [
      "Starting current only",
      "Running current only",
      "Both starting and running currents",
      "Power factor only"
    ],
    correctIndex: 2,
    explanation: "Motor diversity must consider both starting currents (which are typically 6-8x running current and may not be diverse) and running currents (which may have diversity applied based on simultaneous operation)."
  }
];

const faqs = [
  {
    question: "Why can't I just design for 100% of connected load?",
    answer: "Designing for 100% of all connected loads would result in significantly oversized cables, switchgear, and supply capacity. This wastes materials and increases costs by 30-50% without improving safety—since normal operation never reaches these levels. Proper diversity application balances economy with safety."
  },
  {
    question: "How do I know which diversity factors to use for commercial installations?",
    answer: "Commercial installations require careful load analysis. BS 7671 provides domestic guidance, but commercial diversity depends on specific usage patterns, operating hours, and process requirements. Use load monitoring data where available, or apply conservative factors and document your assumptions."
  },
  {
    question: "What happens if I apply too much diversity?",
    answer: "Excessive diversity results in undersized installations that experience cable overheating, excessive voltage drop, nuisance tripping, and potential fire hazards. In worst cases, this leads to equipment damage, production downtime, and costly remedial work."
  },
  {
    question: "Should I include future expansion in my maximum demand calculation?",
    answer: "Yes. Good practice includes 10-20% spare capacity for future growth, plus consideration of known planned loads like EV charging or heat pumps. This prevents expensive upgrades later while maintaining economic initial installation."
  }
];

const quizQuestion = {
  question: "For space heating installations, what diversity factor does BS 7671 recommend?",
  options: [
    "100% for first 10kW, then 50% for remainder",
    "75% for all heating loads",
    "100% throughout (no diversity)",
    "50% for all loads"
  ],
  correctAnswer: 0,
  explanation: "BS 7671 recommends 100% for the first 10kW of fixed heating appliances, then 50% for the remainder. This accounts for thermostat control while ensuring adequate capacity for initial heating demand."
};

const BS7671Module3Section2 = () => {
  useSEO({
    title: "Maximum Demand & Diversity | BS 7671 Module 3.2",
    description: "Learn to calculate maximum demand using diversity factors per BS 7671 Appendix 1 for economic and safe electrical installation design."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maximum Demand & Diversity
          </h1>
          <p className="text-white/80">
            Calculating realistic electrical loads for efficient design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Diversity:</strong> Not all loads operate at 100% simultaneously</li>
              <li><strong>Benefit:</strong> Reduced cable sizes, switchgear, and supply costs</li>
              <li><strong>Key:</strong> Balance economy with safety—too much diversity = undersized installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> Sizing cables, switchgear, and supply capacity</li>
              <li><strong>Where:</strong> BS 7671 Appendix 1 provides diversity tables</li>
              <li><strong>Critical:</strong> Safety systems = 100% demand (no diversity)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define diversity factors and explain their statistical basis",
              "Interpret BS 7671 Appendix 1 diversity tables accurately",
              "Calculate maximum demand for complex installations",
              "Balance safety margins against economic constraints",
              "Identify loads that require 100% demand (no diversity)",
              "Apply diversity to both domestic and commercial installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Understanding Diversity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Electrical Diversity?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity (or demand factor) recognises that connected load rarely equals maximum demand. Not all circuits operate simultaneously at full load, allowing for reduced cable sizes, switchgear ratings, and supply capacity.
            </p>
            <p>
              Consider a home with a 10kW cooker, 3kW kettle, 2kW toaster, and 1kW microwave. The connected load is 16kW, but you'd never operate all four at maximum simultaneously. Diversity acknowledges this reality.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Correct Diversity</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Reduced cable sizes:</strong> Material savings of 20-40%</li>
                  <li><strong>Lower switchgear ratings:</strong> MCBs, RCDs correctly sized</li>
                  <li><strong>Optimised supply:</strong> Avoid expensive over-specification</li>
                  <li><strong>Future capacity:</strong> Built-in appropriately, not excessively</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Risks of Incorrect Diversity</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Undersized installation:</strong> Overloading, overheating</li>
                  <li><strong>Nuisance tripping:</strong> Frequent MCB operation</li>
                  <li><strong>Voltage drop:</strong> Equipment underperformance</li>
                  <li><strong>No expansion capacity:</strong> Costly upgrades later</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: BS 7671 Diversity Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Standard Diversity Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 1 provides guidance on diversity factors for typical domestic installations. These factors are based on extensive load surveys and provide reliable starting points for calculations.
            </p>

            {/* Diversity Table */}
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3 text-elec-yellow font-medium">Load Type</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Diversity Factor</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Lighting</td>
                    <td className="p-3">66% for circuits &gt;5A</td>
                    <td className="p-3 text-white/70 text-xs">Minimum 5A per circuit</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Socket Outlets</td>
                    <td className="p-3">66% first 10A + 40% remainder</td>
                    <td className="p-3 text-white/70 text-xs">Per room or area</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Cooker/Hob</td>
                    <td className="p-3">100% first 10A + 30% + 5A</td>
                    <td className="p-3 text-white/70 text-xs">Socket outlet allowance</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Water Heating</td>
                    <td className="p-3">100% or time control</td>
                    <td className="p-3 text-white/70 text-xs">Consider off-peak</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Space Heating</td>
                    <td className="p-3">100% first 10kW + 50%</td>
                    <td className="p-3 text-white/70 text-xs">Thermostat assumed</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Motors</td>
                    <td className="p-3">100% largest + 50% others</td>
                    <td className="p-3 text-white/70 text-xs">Consider starting currents</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Diversity Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Office buildings:</strong> Socket outlets 75-90%, lighting depends on controls</li>
                <li><strong>Retail premises:</strong> Higher diversity due to display lighting and equipment rotation</li>
                <li><strong>Industrial facilities:</strong> Process-dependent, often minimal diversity</li>
                <li><strong>Educational buildings:</strong> Consider term-time vs holiday operation patterns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Calculation Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Step-by-Step Maximum Demand Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A systematic approach ensures accuracy and provides clear documentation for design decisions and future modifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Calculation Process:</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Load Inventory:</strong> List all circuits with connected loads and operating characteristics</li>
                <li><strong>2. Load Categorisation:</strong> Group similar loads and identify appropriate diversity factors</li>
                <li><strong>3. Diversity Application:</strong> Apply BS 7671 or appropriate factors to each category</li>
                <li><strong>4. Load Summation:</strong> Sum diversified loads to determine maximum demand</li>
                <li><strong>5. Safety Margins:</strong> Add appropriate safety margins and future expansion allowances</li>
              </ol>
            </div>

            {/* Worked Example */}
            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-4">Worked Example: Small Office</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Connected Loads:</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Lighting: 5kW</li>
                    <li>• Socket outlets: 15kW</li>
                    <li>• Air conditioning: 8kW</li>
                    <li>• Server room: 3kW (constant)</li>
                    <li>• Kitchen: 2kW</li>
                    <li><strong>Total connected: 33kW</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Diversity Applied:</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Lighting: 5 × 90% = 4.5kW</li>
                    <li>• Sockets: 15 × 75% = 11.25kW</li>
                    <li>• A/C: 8 × 80% = 6.4kW</li>
                    <li>• Servers: 3 × 100% = 3kW</li>
                    <li>• Kitchen: 2 × 66% = 1.32kW</li>
                    <li><strong>Max demand: 26.47kW</strong></li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-3">Plus 10% safety margin = 29.1kW design capacity (vs 33kW connected)</p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Mistakes and Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Typical Errors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Applying excessive diversity without justification</li>
                  <li>• Ignoring motor starting currents</li>
                  <li>• Using domestic factors for commercial work</li>
                  <li>• Not accounting for future load growth</li>
                  <li>• Applying diversity to safety-critical loads</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Best Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Use conservative factors for critical applications</li>
                  <li>• Document all assumptions clearly</li>
                  <li>• Validate with operational data where available</li>
                  <li>• Consider worst-case operational scenarios</li>
                  <li>• Include 10-20% future expansion allowance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-medium text-red-400 mb-3">Call Centre Supply Failure</h3>
            <p className="text-sm text-white mb-3">
              A contractor applies 50% diversity to all loads in a 24/7 call centre, not considering that most equipment operates continuously. During peak operation, the supply overloads, causing equipment shutdowns and business interruption costing £50,000 per hour.
            </p>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Correct Approach:</p>
              <p className="text-sm text-white">
                Load analysis reveals 24/7 operation with minimal diversity. Design uses 95% diversity with load monitoring systems. Installation handles peak demands safely with capacity for planned expansion.
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
              <p className="font-medium text-elec-yellow mb-1">Key Domestic Factors</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Lighting: 66% for &gt;5A circuits</li>
                <li>Sockets: 66% first 10A, 40% remainder</li>
                <li>Heating: 100% first 10kW, 50% remainder</li>
                <li>Motors: 100% largest, 50% others</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">No Diversity (100%)</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Emergency lighting</li>
                <li>Fire alarm systems</li>
                <li>Life safety equipment</li>
                <li>Critical process loads</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module3Section2;
