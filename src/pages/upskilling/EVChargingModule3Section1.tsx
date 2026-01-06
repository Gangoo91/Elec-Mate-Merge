import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m3s1-check1",
    question: "What is the typical diversity factor for 3 domestic EV chargers?",
    options: ["100% (no diversity)", "85-90%", "70-75%", "50-60%"],
    correctIndex: 1,
    explanation: "Multiple domestic chargers rarely operate at full load simultaneously. For 2-3 chargers, diversity factors of 85-90% are typical as usage patterns vary between households."
  },
  {
    id: "evcharging-m3s1-check2",
    question: "Why do we apply a safety factor to load calculations?",
    options: [
      "To increase installation costs",
      "To ensure cables run hotter",
      "To account for future growth and measurement uncertainties",
      "To reduce the size of protective devices"
    ],
    correctIndex: 2,
    explanation: "Safety factors (typically 10-20%) account for future load growth, measurement uncertainties, and ensure safe operation under all conditions including temperature variations."
  },
  {
    id: "evcharging-m3s1-check3",
    question: "What factors affect diversity in workplace charging?",
    options: [
      "Cable colour and length only",
      "Employee arrival/departure patterns, charging durations, vehicle types",
      "The brand of charging equipment",
      "Weather conditions only"
    ],
    correctIndex: 1,
    explanation: "Workplace diversity is affected by employee arrival/departure patterns, charging durations, vehicle types, and shift patterns - all of which determine simultaneous usage likelihood."
  }
];

const faqs = [
  {
    question: "How do I determine the connected load vs maximum demand?",
    answer: "Connected load is the sum of all individual loads that could potentially operate simultaneously. Maximum demand is the actual maximum load drawn in practice, calculated by applying diversity factors to the connected load based on usage patterns."
  },
  {
    question: "What's the difference between static and dynamic load management?",
    answer: "Static load management allocates fixed power per charger regardless of actual usage. Dynamic load management adjusts power allocation in real-time based on actual demand, optimising use of available supply capacity."
  },
  {
    question: "When should I use higher diversity factors?",
    answer: "Higher diversity factors (lower peak demand) can be applied when smart charging systems actively manage charging schedules, when usage patterns are predictable, or when installations have large numbers of charge points where statistical averaging applies."
  },
  {
    question: "How does temperature affect load calculations?",
    answer: "Higher ambient temperatures reduce cable current-carrying capacity through derating factors. Cold weather increases EV charging times and energy requirements. Both must be considered in comprehensive load calculations."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A workplace is installing 15 EV chargers at 7kW each. With a diversity factor of 70% and 15% safety factor, what is the maximum demand?",
  options: [
    "105kW",
    "84.5kW",
    "73.5kW",
    "121kW"
  ],
  correctAnswer: 1,
  explanation: "Connected load: 15 × 7kW = 105kW. Apply diversity: 105kW × 0.70 = 73.5kW. Apply safety factor: 73.5kW × 1.15 = 84.5kW. This is the calculated maximum demand for infrastructure sizing."
  }
];

const EVChargingModule3Section1 = () => {
  useSEO({
    title: "Load Estimation and Diversity | EV Charging Module 3.1",
    description: "Calculate electrical loads and apply diversity factors for EV charging installations according to BS 7671 and IET guidance."
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
            <Link to="../ev-charging-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Load Estimation and Diversity
          </h1>
          <p className="text-white/80">
            Calculating electrical loads for EV charging installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Connected Load:</strong> Sum of all potential loads</li>
              <li><strong>Diversity Factor:</strong> Reduces peak demand (50-100%)</li>
              <li><strong>Formula:</strong> Max Demand = Connected × Diversity × Safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Multiple EV chargers on single supply</li>
              <li><strong>Use:</strong> Apply diversity to reduce infrastructure costs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate maximum demand for EV charging",
              "Apply diversity factors per BS 7671",
              "Determine cable sizing from load calculations",
              "Assess existing supply capacity",
              "Apply load estimation to commercial sites",
              "Understand load management systems"
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
            Connected Load vs Maximum Demand
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>connected load</strong> is the sum of all individual loads that could potentially
              operate simultaneously. However, the <strong>maximum demand</strong> is the actual maximum
              load that will be drawn in practice, taking diversity factors into account.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Regulation 722:</strong> EV charging equipment</li>
                  <li><strong>Appendix 15:</strong> Energy storage and EV</li>
                  <li><strong>Section 528:</strong> Caravan/motor caravan parks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Diversity Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Prevents oversized installations</li>
                  <li>Reduces infrastructure costs</li>
                  <li>Real-world usage rarely equals connected load</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Load Calculation Formula</p>
              <p className="font-mono text-white">Maximum Demand = (Connected Load × Diversity Factor) × Safety Factor</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Diversity Factors for EV Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity factors depend on installation type, number of charging points, and user patterns.
              IET guidance provides recommended factors based on extensive research.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Installations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single charger:</strong> 100% (no diversity)</li>
                  <li><strong>2-3 chargers:</strong> 85-90%</li>
                  <li><strong>4-5 chargers:</strong> 80-85%</li>
                  <li><strong>6+ chargers:</strong> 75-80%</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Installations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>2-5 workplace:</strong> 80-85%</li>
                  <li><strong>6-10 workplace:</strong> 70-80%</li>
                  <li><strong>11-20 public:</strong> 60-70%</li>
                  <li><strong>20+ rapid:</strong> 50-60%</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors Affecting Diversity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• Number of charging points and installation type</li>
                <li>• Charging speeds and typical session durations</li>
                <li>• Time of use patterns (commuter vs destination)</li>
                <li>• Load management system capabilities</li>
                <li>• Future expansion requirements</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Management Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart charging systems can significantly affect diversity calculations by actively managing
              charging schedules and preventing simultaneous full-power charging events.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Static</p>
                <p className="text-white/90 text-xs">Fixed power allocation</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Dynamic</p>
                <p className="text-white/90 text-xs">Real-time adjustment</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Predictive</p>
                <p className="text-white/90 text-xs">AI-based optimisation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Factors</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable derating:</strong> Higher temperatures reduce current capacity</li>
                <li><strong>Seasonal variations:</strong> Winter heating adds to electrical demand</li>
                <li><strong>Battery performance:</strong> Cold weather increases charging times</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Calculation Methodology */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Step-by-Step Calculation Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <ol className="text-sm text-white space-y-2 ml-4 list-decimal list-inside">
              <li><strong>Identify all loads:</strong> List existing and new EV charging loads</li>
              <li><strong>Determine individual ratings:</strong> Note power ratings for each charger</li>
              <li><strong>Calculate connected load:</strong> Sum all individual loads</li>
              <li><strong>Apply diversity factor:</strong> Multiply by appropriate factor</li>
              <li><strong>Add safety margin:</strong> Include 10-20% safety factor</li>
              <li><strong>Check supply capacity:</strong> Verify existing supply can handle load</li>
            </ol>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Example: 10-House Development</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Connected: 10 × 7kW = 70kW</li>
                  <li>Diversity: 75%</li>
                  <li>Safety: 15%</li>
                  <li className="text-elec-yellow">Max Demand: 60.4kW</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Example: Office Car Park</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Connected: 20 × 22kW = 440kW</li>
                  <li>Diversity: 70%</li>
                  <li>Safety: 20%</li>
                  <li className="text-elec-yellow">Max Demand: 369.6kW</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Calculating Loads</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always distinguish between connected load and maximum demand</li>
                <li>Apply diversity factors appropriate to installation type</li>
                <li>Include safety factors for future growth (10-20%)</li>
                <li>Verify existing supply capacity before adding EV loads</li>
                <li>Document all assumptions for future reference</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No diversity applied:</strong> — Leads to oversized, expensive installations</li>
                <li><strong>Ignoring existing loads:</strong> — May overload the supply</li>
                <li><strong>No safety factor:</strong> — No room for growth or variations</li>
                <li><strong>Wrong diversity factor:</strong> — Different for domestic vs commercial</li>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Domestic Diversity</p>
              <ul className="space-y-0.5">
                <li>1 charger: 100%</li>
                <li>2-3 chargers: 85-90%</li>
                <li>6+ chargers: 75-80%</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Commercial Diversity</p>
              <ul className="space-y-0.5">
                <li>2-5 workplace: 80-85%</li>
                <li>11-20 public: 60-70%</li>
                <li>20+ rapid: 50-60%</li>
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
            <Link to="../ev-charging-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-3-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule3Section1;