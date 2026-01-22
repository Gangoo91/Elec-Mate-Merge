/**
 * Level 3 Module 6 Section 3.2 - Current-Carrying Capacity
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
const TITLE = "Current-Carrying Capacity - Level 3 Module 6 Section 3.2";
const DESCRIPTION = "Learn about cable current-carrying capacity from BS 7671 Appendix 4 tables. Understand installation methods, reference conditions, and how to use Tables 4D1A to 4E4A.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the current-carrying capacity (Iz) of a cable?",
    options: [
      "The maximum current it can carry indefinitely",
      "The current it can carry continuously without exceeding its temperature limit",
      "The fault current rating",
      "The protective device rating"
    ],
    correctIndex: 1,
    explanation: "Current-carrying capacity is the maximum current a cable can carry continuously without exceeding its maximum permissible operating temperature (70C for PVC, 90C for thermosetting)."
  },
  {
    id: "check-2",
    question: "Which installation method gives 2.5mm2 twin and earth cable the highest It rating?",
    options: [
      "Method A - enclosed in conduit in insulated wall",
      "Method B - enclosed in conduit on wall",
      "Method C - clipped direct",
      "Method 100 - enclosed in thermal insulation"
    ],
    correctIndex: 2,
    explanation: "Method C (clipped direct) allows better heat dissipation than enclosed methods, giving higher ratings. Method 100 (in insulation) has the lowest ratings due to severely restricted cooling."
  },
  {
    id: "check-3",
    question: "What is the tabulated It value for 2.5mm2 twin and earth, Method C, at 30C ambient?",
    options: [
      "20A",
      "24A",
      "27A",
      "32A"
    ],
    correctIndex: 2,
    explanation: "From BS 7671 Table 4D5, 2.5mm2 twin and earth cable clipped direct (Method C) has a tabulated current-carrying capacity of 27A at reference conditions."
  },
  {
    id: "check-4",
    question: "Why do single-core cables in trefoil have different ratings to flat formation?",
    options: [
      "Different copper content",
      "Different insulation type",
      "Different heat dissipation due to cable arrangement",
      "Manufacturing differences"
    ],
    correctIndex: 2,
    explanation: "Single-core cables in trefoil touching formation trap heat between cables, reducing capacity. Flat formation with spacing allows better cooling and higher ratings."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What maximum conductor temperature does the standard current-carrying capacity assume for PVC cables?",
    options: [
      "60C",
      "70C",
      "90C",
      "105C"
    ],
    correctAnswer: 1,
    explanation: "PVC (thermoplastic) cables are rated for a maximum conductor temperature of 70C. Thermosetting (XLPE, EPR) cables are rated for 90C."
  },
  {
    id: 2,
    question: "Table 4D1A in BS 7671 provides ratings for which cable type?",
    options: [
      "SWA cables",
      "Single-core PVC in conduit/trunking",
      "MICC cables",
      "Armoured thermosetting cables"
    ],
    correctAnswer: 1,
    explanation: "Table 4D1A covers single-core 70C thermoplastic (PVC) insulated cables installed in conduit, trunking or ducting (Reference Methods A, B and C)."
  },
  {
    id: 3,
    question: "A 4mm2 cable installed by Method A has what It value?",
    options: [
      "27A",
      "32A",
      "37A",
      "30A"
    ],
    correctAnswer: 0,
    explanation: "From Table 4D5, 4mm2 twin and earth by Method A (enclosed in conduit in thermally insulated wall) has It = 27A."
  },
  {
    id: 4,
    question: "What does 'Reference Method' mean in cable tables?",
    options: [
      "The cheapest installation method",
      "A standardised installation condition used to tabulate ratings",
      "A method reference for ordering",
      "The recommended method"
    ],
    correctAnswer: 1,
    explanation: "Reference Methods are standardised installation conditions (A, B, C, D, E, F, G) used to categorise how cables are installed for the purpose of determining current-carrying capacity."
  },
  {
    id: 5,
    question: "Why does a cable in conduit have lower capacity than the same cable clipped direct?",
    options: [
      "The conduit adds resistance",
      "Air circulation around the cable is restricted",
      "Conduit damages the cable",
      "It doesn't - ratings are the same"
    ],
    correctAnswer: 1,
    explanation: "Conduit restricts air circulation around the cable, limiting heat dissipation. Clipped direct allows heat to radiate freely from the cable surface."
  },
  {
    id: 6,
    question: "At what ambient temperature are the tabulated current ratings (It) valid?",
    options: [
      "20C",
      "25C",
      "30C",
      "35C"
    ],
    correctAnswer: 2,
    explanation: "Tabulated ratings in Appendix 4 are based on an ambient temperature of 30C for cables in air. Ground temperatures are 20C for buried cables."
  },
  {
    id: 7,
    question: "A 6mm2 twin and earth cable clipped direct has what current-carrying capacity?",
    options: [
      "32A",
      "40A",
      "46A",
      "47A"
    ],
    correctAnswer: 3,
    explanation: "From Table 4D5, 6mm2 twin and earth clipped direct (Method C) has It = 47A."
  },
  {
    id: 8,
    question: "Which table would you use for SWA (Steel Wire Armoured) cables?",
    options: [
      "Table 4D1A",
      "Table 4D2A",
      "Table 4E1A or 4E4A",
      "Table 4F1A"
    ],
    correctAnswer: 2,
    explanation: "Tables 4E cover armoured cables. 4E1A is for multicore 70C thermoplastic, 4E4A is for multicore 90C thermosetting armoured cables."
  },
  {
    id: 9,
    question: "What happens to current-carrying capacity if a cable is buried directly in ground?",
    options: [
      "It increases significantly",
      "It remains the same as in air",
      "It decreases compared to air - use ground tables",
      "Cable cannot be buried"
    ],
    correctAnswer: 2,
    explanation: "Buried cables have different thermal characteristics. Use Reference Method D tables. Ground temperature is 20C vs 30C for air, but soil thermal resistivity affects dissipation."
  },
  {
    id: 10,
    question: "A 10mm2 single-core cable in trunking (Method B) has approximately what It value?",
    options: [
      "43A",
      "52A",
      "57A",
      "63A"
    ],
    correctAnswer: 0,
    explanation: "From Table 4D1A, 10mm2 single-core PVC in trunking (Method B) has It approximately 43A (exact value depends on number of cables and specific table)."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Which table do I use for domestic twin and earth cable?",
    answer: "Use Table 4D5 for flat two-core or three-core cables (with or without CPC). This covers 6242Y and 6243Y types commonly used in domestic and commercial installations."
  },
  {
    question: "What if my installation method isn't exactly like the reference methods?",
    answer: "Use the reference method that most closely matches your installation. If in doubt, use a more conservative (lower) rating. For unusual installations, consult manufacturer data or increase cable size."
  },
  {
    question: "Do the tables account for cable bunching?",
    answer: "No. The tabulated values are for single circuits. If cables are grouped, apply grouping correction factor (Cg) from Tables 4C1-4C5 to reduce the effective rating."
  },
  {
    question: "What is the difference between Tables 4D and 4E?",
    answer: "Tables 4D cover cables without metallic covering (PVC/PVC, singles in conduit). Tables 4E cover armoured cables (SWA, concentric). Tables 4F cover mineral insulated cables."
  },
  {
    question: "Can I use manufacturer data instead of BS 7671 tables?",
    answer: "Yes, if manufacturer data is more specific to your cable and installation. However, ensure the data is from a reputable source and includes the same reference conditions or clearly states any differences."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module6Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Max continuous current without overheating</li>
              <li><strong>Reference temp:</strong> 30C ambient for cables in air</li>
              <li><strong>Key tables:</strong> 4D1A-4D5 (non-armoured), 4E (armoured)</li>
              <li><strong>Method matters:</strong> Same cable, different methods = different ratings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable schedules, design calculations, specifications</li>
              <li><strong>Use:</strong> Look up base rating before applying factors</li>
              <li><strong>Apply:</strong> Every cable sizing calculation starts here</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        

        

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Current-Carrying Capacity?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current-carrying capacity (Iz) is the maximum current a cable can carry continuously without exceeding its maximum permissible conductor operating temperature. This is a thermal limit - exceed it and insulation degrades, cable life shortens, and fire risk increases.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Conductor Temperatures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PVC (70C thermoplastic):</strong> 70C continuous</li>
                <li><strong>XLPE/EPR (90C thermosetting):</strong> 90C continuous</li>
                <li><strong>MICC with PVC sheath:</strong> 70C</li>
                <li><strong>MICC bare or LSF sheath:</strong> 105C</li>
              </ul>
            </div>

            <p>
              The tabulated current (It) in BS 7671 assumes standard reference conditions: 30C ambient temperature for cables in air, 20C for buried cables, single circuit (no grouping), and no thermal insulation contact.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The tabulated value (It) becomes the actual capacity (Iz) only after applying correction factors for real installation conditions.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reference Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Installation methods are categorised into Reference Methods (A, B, C, D, E, F, G) that determine which column of the current rating tables to use. The method affects heat dissipation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Reference Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Method A:</strong> Enclosed in conduit in insulated wall</li>
                  <li><strong>Method B:</strong> Enclosed in conduit on wall/ceiling</li>
                  <li><strong>Method C:</strong> Clipped direct to surface</li>
                  <li><strong>Method D:</strong> Direct in ground/duct in ground</li>
                  <li><strong>Method E/F:</strong> In free air (single/trefoil)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effect on Ratings</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Free air (E/F): Highest ratings</li>
                  <li>Clipped direct (C): Good ratings</li>
                  <li>Enclosed on wall (B): Lower ratings</li>
                  <li>Enclosed in insulated wall (A): Lowest</li>
                  <li>Thermal insulation contact: Severely reduced</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> 2.5mm2 twin and earth: Method A = 20A, Method B = 24A, Method C = 27A. Same cable, different installation = different capacity.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Key Tables in BS 7671 Appendix 4
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Appendix 4 contains multiple tables for different cable types. Knowing which table to use is essential for accurate cable sizing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Table Guide:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Table 4D1A:</strong> Single-core PVC cables in conduit/trunking</li>
                <li><strong>Table 4D2A:</strong> Single-core 90C thermosetting in conduit</li>
                <li><strong>Table 4D5:</strong> Flat twin and earth cables (Methods A-C)</li>
                <li><strong>Table 4E1A:</strong> Multicore armoured 70C cables</li>
                <li><strong>Table 4E4A:</strong> Multicore armoured 90C cables</li>
                <li><strong>Table 4F1A/4F2A:</strong> MICC cables</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Values - Table 4D5 (Twin and Earth, Method C):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1.5mm2: 20A</li>
                <li>2.5mm2: 27A</li>
                <li>4mm2: 37A</li>
                <li>6mm2: 47A</li>
                <li>10mm2: 64A</li>
                <li>16mm2: 85A</li>
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
            Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Using the tables requires matching your actual installation to the closest reference method, then reading the appropriate value for your cable size.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Step 1</p>
                <p className="text-white/90 text-xs">Identify cable construction type</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Step 2</p>
                <p className="text-white/90 text-xs">Select correct table</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Step 3</p>
                <p className="text-white/90 text-xs">Determine reference method</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Step 4</p>
                <p className="text-white/90 text-xs">Read It value for cable size</p>
              </div>
            </div>

            <p>
              This tabulated value (It) is then used in the correction factor formula to determine whether the cable size is adequate: It &gt;= In / (Ca x Cg x Ci).
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> Always verify you are using the correct table for your cable type. Using the wrong table could result in significantly over or undersized cables.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Table Selection Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic flat cables (6242Y):</strong> Table 4D5</li>
                <li><strong>Singles in conduit/trunking:</strong> Table 4D1A (70C) or 4D2A (90C)</li>
                <li><strong>SWA cables:</strong> Table 4E1A (70C) or 4E4A (90C)</li>
                <li><strong>MICC cables:</strong> Table 4F1A or 4F2A</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Actual Method Differs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use the reference method that most closely matches</li>
                <li>If in doubt, use a more restrictive (lower rating) method</li>
                <li>Mixed installations: use most restrictive section</li>
                <li>Document the method assumed in design calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong table</strong> - Mixing up armoured and non-armoured tables</li>
                <li><strong>Wrong column</strong> - Using single-phase column for three-phase or vice versa</li>
                <li><strong>Forgetting reference conditions</strong> - Tables assume 30C ambient</li>
                <li><strong>Ignoring installation method changes</strong> - Rating changes if method changes along route</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Cable Current Ratings (Method C)</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Twin and Earth (Table 4D5)</p>
                <ul className="space-y-0.5">
                  <li>1.0mm2: 16A</li>
                  <li>1.5mm2: 20A</li>
                  <li>2.5mm2: 27A</li>
                  <li>4.0mm2: 37A</li>
                  <li>6.0mm2: 47A</li>
                  <li>10mm2: 64A</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Reference Conditions</p>
                <ul className="space-y-0.5">
                  <li>Ambient temperature: 30C (air)</li>
                  <li>Ground temperature: 20C (buried)</li>
                  <li>Single circuit (no grouping)</li>
                  <li>No thermal insulation contact</li>
                  <li>PVC insulation: 70C max</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Cable Selection
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section3-3">
              Next: Correction Factors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section3_2;
