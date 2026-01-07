/**
 * Level 3 Module 6 Section 2.4 - Diversity Calculations
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Diversity Calculations - Level 3 Module 6 Section 2.4";
const DESCRIPTION = "Master diversity calculations for electrical installations. Learn BS 7671 diversity factors, current demand assessment, and practical application for domestic, commercial and industrial premises.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What diversity factor would you apply to lighting circuits in a small shop?",
    options: [
      "66% of total current demand",
      "90% of total current demand",
      "75% of total current demand",
      "100% of total current demand"
    ],
    correctIndex: 1,
    explanation: "For small shops, stores, offices and business premises, lighting diversity is 90% of the total current demand according to Table A2 of the On-Site Guide."
  },
  {
    id: "check-2",
    question: "A domestic cooking appliance is rated at 12 kW (52A at 230V). What current demand should be assumed?",
    options: [
      "52A (full rated current)",
      "10A + 30% of 42A = 22.6A",
      "26A (50% of rated current)",
      "10A + 30% of 52A = 25.6A"
    ],
    correctIndex: 1,
    explanation: "For cooking appliances: first 10A at 100%, plus 30% of the remainder. So 10A + (0.3 x 42A) = 10A + 12.6A = 22.6A."
  },
  {
    id: "check-3",
    question: "Why is no diversity allowable for thermostatically controlled water heaters?",
    options: [
      "They use very little power",
      "They may all operate simultaneously during recovery periods",
      "They are always on standby",
      "Regulations prohibit diversity for safety"
    ],
    correctIndex: 1,
    explanation: "Thermostatically controlled water heaters may all switch on together during recovery periods (e.g., after morning peak usage), so assuming diversity could lead to undersized cables and equipment."
  },
  {
    id: "check-4",
    question: "What is the diversity factor for the largest motor in a small hotel installation?",
    options: [
      "50% of full load",
      "80% of full load",
      "100% of full load",
      "60% of full load"
    ],
    correctIndex: 2,
    explanation: "The largest motor is always taken at 100% full load. Diversity (50% f.l. of remaining motors) is only applied to subsequent motors."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of applying diversity to an electrical installation?",
    options: [
      "To increase cable sizes for safety",
      "To reduce installation costs by recognising that not all loads operate simultaneously",
      "To comply with fire regulations",
      "To simplify circuit calculations"
    ],
    correctAnswer: 1,
    explanation: "Diversity recognises that in practice, not all connected loads will operate at the same time, allowing more economical sizing of supply equipment and distribution cables while maintaining safety."
  },
  {
    id: 2,
    question: "A domestic installation has lighting with a total connected load of 30A. What current demand should be assumed after applying diversity?",
    options: [
      "30A",
      "27A",
      "20A",
      "22.5A"
    ],
    correctAnswer: 2,
    explanation: "For individual household installations, lighting diversity is 66% of total current demand. 30A x 0.66 = 19.8A, rounded to 20A."
  },
  {
    id: 3,
    question: "Which loads should NEVER have diversity applied?",
    options: [
      "Lighting and heating",
      "Socket outlets and motors",
      "Thermal storage heating, floor warming, and thermostatically controlled water heaters",
      "Cooking appliances and instantaneous water heaters"
    ],
    correctAnswer: 2,
    explanation: "No diversity is allowable for thermal storage space heating, floor warming installations, or thermostatically controlled water heaters as these may all operate simultaneously."
  },
  {
    id: 4,
    question: "A small office has three 3kW electric heaters. Calculate the assumed current demand using diversity factors.",
    options: [
      "39A (all at 100%)",
      "29.3A (100% of largest + 75% of remainder)",
      "19.5A (50% of total)",
      "13A (one heater only)"
    ],
    correctAnswer: 1,
    explanation: "For small shops/offices: 100% of largest appliance (13A) + 75% of remaining. Each heater is 3000W/230V = 13A. Total = 13A + (0.75 x 13A) + (0.75 x 13A) = 13 + 9.75 + 9.75 = 32.5A approximately."
  },
  {
    id: 5,
    question: "What diversity factor applies to the second largest cooking appliance in a small hotel?",
    options: [
      "100% full load",
      "80% full load",
      "60% full load",
      "30% full load"
    ],
    correctAnswer: 1,
    explanation: "For small hotels: cooking appliances use 100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances."
  },
  {
    id: 6,
    question: "BS 7671 Regulation 311.1 states that diversity may be taken into account when determining:",
    options: [
      "Cable voltage drop only",
      "Earth fault loop impedance",
      "Maximum demand of an installation",
      "RCD sensitivity"
    ],
    correctAnswer: 2,
    explanation: "Regulation 311.1 states: 'For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined. In determining the maximum demand, diversity may be taken into account.'"
  },
  {
    id: 7,
    question: "A discharge lighting circuit has lamps totalling 2000W. What VA rating should be assumed if exact data is unavailable?",
    options: [
      "2000 VA",
      "2400 VA",
      "3600 VA",
      "4000 VA"
    ],
    correctAnswer: 2,
    explanation: "For discharge lighting, if exact information is unavailable, the demand in VA is taken as rated lamp watts x 1.8. So 2000W x 1.8 = 3600 VA. This accounts for power factor correction, controlgear losses, and harmonic currents."
  },
  {
    id: 8,
    question: "What current demand is assumed for a 2A socket outlet?",
    options: [
      "2A",
      "At least 0.5A",
      "0A (may be neglected)",
      "1A"
    ],
    correctAnswer: 1,
    explanation: "According to Table A1 of the On-Site Guide, 2A socket outlets should assume a current demand of at least 0.5A."
  },
  {
    id: 9,
    question: "When using standard circuit arrangements from Appendix H, what diversity applies to calculate total installation demand?",
    options: [
      "No diversity - use full circuit ratings",
      "100% of largest circuit + 40% of others (domestic)",
      "50% of all circuits",
      "75% of all circuits"
    ],
    correctAnswer: 1,
    explanation: "For standard circuit arrangements in domestic installations: 100% current demand of largest circuit + 40% current demand of every other circuit."
  },
  {
    id: 10,
    question: "Why should diversity factors be used with caution?",
    options: [
      "They are no longer valid in BS 7671:2018",
      "They require special knowledge and may need adjustment for specific installations",
      "They always underestimate demand",
      "They only apply to three-phase installations"
    ],
    correctAnswer: 1,
    explanation: "The On-Site Guide states diversity factors are for guidance only and 'call for special knowledge and experience.' Values may need to be increased or decreased based on the installation designer's assessment of the specific situation."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I always apply diversity to reduce cable sizes?",
    answer: "No. Diversity should only be applied where there is genuine evidence that loads will not operate simultaneously. For critical installations, 24-hour operations, or loads with thermostatic control (which may all switch on together), diversity should be reduced or eliminated."
  },
  {
    question: "Do diversity factors apply to final circuits as well as distribution?",
    answer: "Diversity is primarily applied when calculating the total demand of an installation or sizing distribution equipment and main cables. Individual final circuit cables are usually sized for the protective device rating, not diversified load."
  },
  {
    question: "How do I handle mixed domestic and commercial loads?",
    answer: "Each type of premises has different diversity factors. For mixed-use buildings, assess each section using appropriate factors, then consider further diversity only if usage patterns genuinely differ (e.g., residential peak evening, commercial peak daytime)."
  },
  {
    question: "What if my calculated maximum demand exceeds the supply capacity?",
    answer: "You may need to: (1) Review your diversity assumptions - are they realistic? (2) Consider load management systems, (3) Request a larger supply from the DNO, or (4) Install generation/storage to manage peak demands."
  },
  {
    question: "Are diversity tables in BS 7671 mandatory?",
    answer: "No. The On-Site Guide diversity tables are informative (guidance). The designer has responsibility for selecting appropriate diversity based on knowledge of the installation and usage patterns."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module6Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Diversity Calculations
          </h1>
          <p className="text-white/80">
            Applying diversity factors to determine maximum demand economically
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Not all loads operate at once - diversity allows economical sizing</li>
              <li><strong>Domestic lighting:</strong> 66% of total current demand</li>
              <li><strong>Cooking:</strong> First 10A + 30% of remainder + 5A if socket fitted</li>
              <li><strong>No diversity:</strong> Thermal storage, floor warming, thermostatic water heaters</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Consumer unit ratings, main switch sizes, DNO supply capacity</li>
              <li><strong>Use:</strong> Calculate realistic maximum demand for supply applications</li>
              <li><strong>Apply:</strong> Size main cables, distribution boards, and supply equipment</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the concept and purpose of diversity in electrical design",
              "Apply diversity factors from BS 7671 and the On-Site Guide correctly",
              "Calculate assumed current demand for various types of equipment",
              "Determine appropriate diversity for different types of premises",
              "Recognise loads where diversity should not be applied",
              "Calculate maximum demand for complete installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Diversity?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity is the recognition that not all electrical loads in an installation will operate at full capacity simultaneously. By applying diversity factors, designers can size supply equipment, distribution boards, and main cables economically while still ensuring safety and adequate capacity for normal operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Diversity Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reduces installation costs by avoiding oversized equipment</li>
                <li>Allows more efficient use of supply capacity</li>
                <li>Matches real-world usage patterns</li>
                <li>Enables economic design within BS 7671 requirements</li>
              </ul>
            </div>

            <p>
              BS 7671 Regulation 311.1 states: "For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined. In determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Diversity factors are guidance values requiring professional judgement. The designer must assess whether the factors are appropriate for the specific installation.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current Demand for Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before applying diversity, you must determine the current demand for each type of load. The On-Site Guide Table A1 provides standard values for common equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Current Demands</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Socket outlets: Rated current (e.g., 13A for BS 1363)</li>
                  <li>2A socket outlets: At least 0.5A</li>
                  <li>Lighting: Connected load, minimum 100W per lampholder</li>
                  <li>Stationary equipment: BS rated current</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Cases</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cooking appliances: 10A + 30% of remainder (+ 5A if socket)</li>
                  <li>Discharge lighting: Lamp watts x 1.8</li>
                  <li>Shaver outlets, clocks under 5VA: May be neglected</li>
                  <li>Motors: Rated full load current</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 10kW (43.5A) cooker with an integral socket: 10A + 30% of 33.5A + 5A = 10 + 10.05 + 5 = 25.05A assumed demand.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Diversity Factors by Premises Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of premises have different usage patterns, so diversity factors vary. The On-Site Guide Table A2 provides factors for three main categories.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Individual Household Installations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting:</strong> 66% of total current demand</li>
                <li><strong>Heating/Power:</strong> 100% up to 10A + 50% of excess</li>
                <li><strong>Cooking:</strong> 10A + 30% of excess + 5A for socket</li>
                <li><strong>Standard circuits (Appendix H):</strong> 100% largest + 40% others</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Small Shops, Offices, Business Premises:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting:</strong> 90% of total current demand</li>
                <li><strong>Heating/Power:</strong> 100% largest + 75% remaining</li>
                <li><strong>Cooking:</strong> 100% largest + 80% second + 60% others</li>
                <li><strong>Motors:</strong> 100% largest + 80% second + 60% others</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Small Hotels, Guest Houses:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting:</strong> 75% of total current demand</li>
                <li><strong>Heating/Power:</strong> 100% largest + 80% second + 60% others</li>
                <li><strong>Motors:</strong> 100% largest + 50% remaining</li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Loads Without Diversity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain loads must be taken at 100% because they may all operate simultaneously, regardless of user behaviour. Applying diversity to these loads would result in undersized equipment and potential overloading.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Thermal Storage Heating</p>
                <p className="text-white/90 text-xs">Charges overnight - all units together</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Floor Warming</p>
                <p className="text-white/90 text-xs">All zones may demand heat simultaneously</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Thermostatic Water Heaters</p>
                <p className="text-white/90 text-xs">All may switch on after peak usage</p>
              </div>
            </div>

            <p>
              For instantaneous water heaters, some diversity is permitted: 100% of largest + 100% of second largest + 25% of remaining. This recognises that instantaneous heaters only operate while taps are running.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> Distribution boards and consumer units must be rated for the total connected load WITHOUT diversity. Diversity only applies to upstream cables and supply equipment.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Calculating Maximum Demand</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>List all connected loads with their rated currents</li>
                <li>Apply individual equipment demand factors (e.g., cooker calculation)</li>
                <li>Group loads by type and apply diversity factors</li>
                <li>Sum diversified loads to find maximum demand</li>
                <li>Allow margin for future expansion if specified</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Reduce Diversity</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>24-hour operations where all loads may run continuously</li>
                <li>Process-critical installations requiring guaranteed capacity</li>
                <li>High-security premises with backup systems</li>
                <li>Data centres with intensive, continuous loads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Applying diversity to final circuits</strong> - Final circuit cables are sized for the protective device, not diversified load</li>
                <li><strong>Using domestic factors for commercial</strong> - Different premises types have different usage patterns</li>
                <li><strong>Ignoring future loads</strong> - Discuss expansion plans before finalising design</li>
                <li><strong>Applying diversity to safety circuits</strong> - Emergency lighting, fire alarms must have guaranteed capacity</li>
              </ul>
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

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Diversity Factors</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Domestic Premises</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 66%</li>
                  <li>Heating: 100% to 10A + 50% excess</li>
                  <li>Cooker: 10A + 30% excess (+ 5A socket)</li>
                  <li>Standard circuits: 100% largest + 40% others</li>
                  <li>Socket outlets: 100% largest + 40% others</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">No Diversity Allowed</p>
                <ul className="space-y-0.5">
                  <li>Thermal storage space heating</li>
                  <li>Floor warming installations</li>
                  <li>Thermostatically controlled water heaters</li>
                  <li>Safety services (emergency lighting, fire alarms)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6-section2-5">
              Next: Maximum Demand
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section2_4;
