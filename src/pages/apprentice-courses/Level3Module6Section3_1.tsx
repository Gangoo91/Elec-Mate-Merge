/**
 * Level 3 Module 6 Section 3.1 - Cable Selection Principles
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
const TITLE = "Cable Selection Principles - Level 3 Module 6 Section 3.1";
const DESCRIPTION = "Learn cable selection principles for electrical installations per BS 7671. Covers design current, installation methods, correction factors, and the cable sizing process.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the first step in the cable selection process?",
    options: [
      "Choose the cheapest cable",
      "Determine the design current (Ib)",
      "Select the installation method",
      "Calculate voltage drop"
    ],
    correctIndex: 1,
    explanation: "The first step is always to determine the design current (Ib) - the current the circuit is expected to carry in normal service. All other selections follow from this."
  },
  {
    id: "check-2",
    question: "What relationship must exist between Ib, In, and Iz?",
    options: [
      "Ib = In = Iz",
      "Ib > In > Iz",
      "Ib <= In <= Iz",
      "Iz <= In <= Ib"
    ],
    correctIndex: 2,
    explanation: "The fundamental relationship is Ib <= In <= Iz: Design current must not exceed protective device rating, which must not exceed cable current-carrying capacity."
  },
  {
    id: "check-3",
    question: "Which BS 7671 tables provide current-carrying capacities for cables?",
    options: [
      "Tables 4A to 4F in Appendix 4",
      "Tables 41.1 to 41.4",
      "Tables 54.1 to 54.7",
      "Tables B1 to B6"
    ],
    correctIndex: 0,
    explanation: "BS 7671 Appendix 4, Tables 4A1 to 4F3 provide current-carrying capacities (It) for various cable types and installation methods."
  },
  {
    id: "check-4",
    question: "Why are multiple factors considered when selecting cables?",
    options: [
      "To increase profit margins",
      "To ensure cables can carry required current safely under all expected conditions",
      "To make calculations more complex",
      "To use more copper"
    ],
    correctIndex: 1,
    explanation: "Multiple factors (ambient temperature, grouping, thermal insulation) reduce a cable's ability to dissipate heat. All must be considered to ensure safe operation under actual installed conditions."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does the symbol 'Ib' represent in cable sizing?",
    options: [
      "Cable current-carrying capacity",
      "Design current of the circuit",
      "Protective device rating",
      "Fault current"
    ],
    correctAnswer: 1,
    explanation: "Ib is the design current - the current intended to flow in the circuit during normal operation. It is the starting point for all cable sizing calculations."
  },
  {
    id: 2,
    question: "A circuit has design current of 28A. Which MCB rating would be most appropriate?",
    options: [
      "25A",
      "32A",
      "40A",
      "20A"
    ],
    correctAnswer: 1,
    explanation: "The protective device (In) must be equal to or greater than design current (Ib). A 32A MCB is the smallest standard rating that exceeds 28A. Using 25A would cause nuisance tripping."
  },
  {
    id: 3,
    question: "What is the purpose of the formula It >= In / (Ca x Cg x Ci)?",
    options: [
      "To calculate voltage drop",
      "To determine the minimum tabulated current rating needed",
      "To calculate fault current",
      "To determine cable length"
    ],
    correctAnswer: 1,
    explanation: "This formula calculates the minimum tabulated current (It) required from the cable tables. The correction factors reduce the effective cable capacity, so you need a higher tabulated value to compensate."
  },
  {
    id: 4,
    question: "Which installation method typically gives the highest current-carrying capacity?",
    options: [
      "Enclosed in thermal insulation",
      "Clipped direct to a ceiling",
      "Free air (spaced from surface)",
      "In conduit in a wall"
    ],
    correctAnswer: 2,
    explanation: "Free air installation (Reference Method E/F) allows maximum heat dissipation from all cable surfaces, giving the highest current-carrying capacity. Enclosed methods restrict cooling."
  },
  {
    id: 5,
    question: "A cable is selected for 32A circuit protection. What is the minimum required Iz?",
    options: [
      "32A",
      "30A",
      "28A",
      "40A"
    ],
    correctAnswer: 0,
    explanation: "The cable's current-carrying capacity (Iz) must be at least equal to the protective device rating (In). For a 32A device, Iz must be at least 32A."
  },
  {
    id: 6,
    question: "Why must voltage drop be checked after selecting cable size?",
    options: [
      "It is a regulatory requirement only",
      "To ensure equipment operates correctly at the intended voltage",
      "To calculate cable cost",
      "To determine cable colour"
    ],
    correctAnswer: 1,
    explanation: "Excessive voltage drop can cause equipment malfunction, reduced efficiency, or failure to start motors. BS 7671 limits voltage drop to 3% (lighting) or 5% (other) of nominal voltage."
  },
  {
    id: 7,
    question: "What does 'Reference Method C' describe?",
    options: [
      "Cable in free air",
      "Cable direct in ground",
      "Single-core cables in conduit/trunking",
      "Cable on cable tray perforated"
    ],
    correctAnswer: 2,
    explanation: "Reference Method C covers single-core cables enclosed in conduit or trunking. Different reference methods have different current-carrying capacities due to varying heat dissipation."
  },
  {
    id: 8,
    question: "When selecting cables, what must you verify about earth fault loop impedance?",
    options: [
      "That it is as high as possible",
      "That it allows the protective device to operate within required time",
      "That it exceeds 10 ohms",
      "That it equals zero"
    ],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance (Zs) must be low enough for the protective device to disconnect within 0.4s (final circuits <32A) or 5s (distribution circuits) per BS 7671 Chapter 41."
  },
  {
    id: 9,
    question: "Which cable type is most commonly used for fixed wiring in domestic installations?",
    options: [
      "SWA (Steel Wire Armoured)",
      "MICC (Mineral Insulated)",
      "Twin and earth PVC (6242Y)",
      "SY flexible cable"
    ],
    correctAnswer: 2,
    explanation: "PVC insulated and sheathed flat cable with CPC (6242Y/6243Y) is the most common cable for domestic fixed wiring due to cost, ease of installation, and suitability for the environment."
  },
  {
    id: 10,
    question: "What additional consideration applies when selecting cables for fire alarm circuits?",
    options: [
      "Cable colour only",
      "Fire resistance or survival ratings",
      "Lower cost requirements",
      "Aesthetic appearance"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm and emergency lighting circuits may require cables that maintain circuit integrity during a fire (fire resistant or survival cables per BS 8519 or BS 5839)."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the difference between It and Iz?",
    answer: "It is the tabulated current from BS 7671 tables for reference conditions. Iz is the actual current-carrying capacity after applying correction factors: Iz = It x Ca x Cg x Ci (or Iz = It x correction factors)."
  },
  {
    question: "Can I use a cable with higher capacity than needed?",
    answer: "Yes. Using a larger cable than minimum required improves voltage drop, reduces energy losses, and provides margin for future load increases. However, it increases cost and may require larger containment."
  },
  {
    question: "What if my cable passes through insulation for only part of its length?",
    answer: "If cable passes through thermal insulation for less than 400mm, the derating may be reduced. For 50mm or less, no derating may be needed. Refer to BS 7671 Regulation 523.9 for specific guidance."
  },
  {
    question: "Do I need to check both current capacity AND voltage drop?",
    answer: "Yes, always check both. A cable may have adequate current capacity but excessive voltage drop on long runs. Voltage drop may require increasing cable size above the minimum for current capacity."
  },
  {
    question: "What about cables for EV chargers?",
    answer: "EV charger circuits are typically treated as continuous loads. The cable must be rated for continuous operation at the charger's maximum output. Special consideration may be needed for multiple chargers."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module6Section3_1 = () => {
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Selection Principles
          </h1>
          <p className="text-white/80">
            Understanding the systematic approach to selecting cables for electrical circuits
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key rule:</strong> Ib &lt;= In &lt;= Iz</li>
              <li><strong>Process:</strong> Design current, then protection, then cable</li>
              <li><strong>Factors:</strong> Temperature, grouping, insulation affect capacity</li>
              <li><strong>Check:</strong> Current capacity AND voltage drop</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable sizes on drawings, schedules, cable labels</li>
              <li><strong>Use:</strong> Select cables for new circuits and alterations</li>
              <li><strong>Apply:</strong> Every circuit design from domestic to industrial</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the fundamental relationship Ib <= In <= Iz",
              "List the key stages of the cable selection process",
              "Identify cable types suitable for different applications",
              "Explain the purpose of correction factors in cable sizing",
              "Understand why both current capacity and voltage drop must be checked",
              "Apply cable selection principles to practical circuit design"
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
            The Fundamental Relationship
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection is governed by one fundamental relationship that must always be satisfied:
            </p>

            <div className="my-6 p-4 bg-elec-yellow/10 border-l-4 border-elec-yellow rounded text-center">
              <p className="text-lg font-mono text-white">Ib &lt;= In &lt;= Iz</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Where:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ib</strong> = Design current (the current the circuit will carry)</li>
                <li><strong>In</strong> = Rated current of the protective device</li>
                <li><strong>Iz</strong> = Current-carrying capacity of the cable</li>
              </ul>
            </div>

            <p>
              This relationship ensures: (1) the protective device won't trip under normal load, and (2) the cable won't overheat because the device will trip before the cable reaches its limit.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The protective device protects the cable, not the load. The cable must be able to carry at least the protective device rating indefinitely.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Cable Selection Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection follows a systematic process to ensure all requirements are met:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-Step Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Determine design current (Ib)</strong> from load assessment</li>
                <li><strong>2. Select protective device (In)</strong> - must be &gt;= Ib</li>
                <li><strong>3. Identify installation method</strong> - determines reference method</li>
                <li><strong>4. Determine correction factors</strong> - Ca, Cg, Ci, etc.</li>
                <li><strong>5. Calculate minimum It</strong> = In / (Ca x Cg x Ci)</li>
                <li><strong>6. Select cable from tables</strong> - must have It &gt;= calculated minimum</li>
                <li><strong>7. Check voltage drop</strong> - increase size if necessary</li>
                <li><strong>8. Verify earth fault loop impedance</strong> - confirm disconnection time</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 25A radial circuit for a workshop: Ib = 22A, select 25A MCB (In), determine installation factors, find cable with Iz &gt;= 25A under installed conditions.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different cable types suit different applications. Selection depends on installation environment, mechanical protection needs, and fire performance requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Cable Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>6242Y:</strong> Twin and earth - domestic/commercial</li>
                  <li><strong>6491X:</strong> Single-core - in conduit/trunking</li>
                  <li><strong>SWA:</strong> Steel wire armoured - underground/external</li>
                  <li><strong>MICC:</strong> Mineral insulated - fire resistance</li>
                  <li><strong>FP cables:</strong> Fire performance - alarms, emergency</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Environmental conditions (wet, dry, corrosive)</li>
                  <li>Mechanical protection requirements</li>
                  <li>Fire performance requirements</li>
                  <li>UV exposure (outdoor installations)</li>
                  <li>Installation method constraints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Correction Factors Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The tabulated current ratings in BS 7671 assume specific reference conditions. When actual conditions differ, correction factors must be applied to reduce the effective capacity.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ca - Ambient Temperature</p>
                <p className="text-white/90 text-xs">Reduces capacity at higher temperatures</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Cg - Grouping</p>
                <p className="text-white/90 text-xs">Reduces capacity when cables grouped</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ci - Thermal Insulation</p>
                <p className="text-white/90 text-xs">Reduces capacity in insulated areas</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Cc - Semi-enclosed Fuse</p>
                <p className="text-white/90 text-xs">Factor of 0.725 for BS 3036 fuses</p>
              </div>
            </div>

            <p>
              The formula It &gt;= In / (Ca x Cg x Ci) calculates the minimum tabulated rating needed. The more factors that apply and the lower their values, the larger the cable needed.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> All applicable correction factors must be applied. Missing any factor could result in cable overheating under actual operating conditions.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Checks After Selection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify Iz &gt;= In under all installed conditions</li>
                <li>Calculate actual voltage drop at design current</li>
                <li>Confirm earth fault loop impedance meets disconnection time</li>
                <li>Check cable fits in proposed containment</li>
                <li>Ensure cable route avoids incompatible services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Increase Cable Size</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Voltage drop exceeds 3% (lighting) or 5% (other)</li>
                <li>Earth fault loop impedance too high for disconnection time</li>
                <li>Future load increase anticipated</li>
                <li>Economic cable size calculation indicates benefit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting correction factors</strong> - Cable overheats in actual conditions</li>
                <li><strong>Not checking voltage drop</strong> - Equipment malfunction on long runs</li>
                <li><strong>Wrong installation method</strong> - Using wrong table column</li>
                <li><strong>Ignoring Zs verification</strong> - Protection may not operate fast enough</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Cable Selection</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Relationships</p>
                <ul className="space-y-0.5">
                  <li>Ib &lt;= In &lt;= Iz (fundamental rule)</li>
                  <li>It &gt;= In / (Ca x Cg x Ci)</li>
                  <li>Iz = It x Ca x Cg x Ci</li>
                  <li>Max VD: 3% lighting, 5% other</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Selection Process</p>
                <ul className="space-y-0.5">
                  <li>1. Determine Ib (design current)</li>
                  <li>2. Select In (protective device)</li>
                  <li>3. Identify installation method</li>
                  <li>4. Apply correction factors</li>
                  <li>5. Select cable from tables</li>
                  <li>6. Check VD and Zs</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section3-2">
              Next: Current-Carrying Capacity
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section3_1;
