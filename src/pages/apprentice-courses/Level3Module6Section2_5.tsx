/**
 * Level 3 Module 6 Section 2.5 - Maximum Demand
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
const TITLE = "Maximum Demand Calculations - Level 3 Module 6 Section 2.5";
const DESCRIPTION = "Learn to calculate maximum demand for electrical installations using BS 7671 methods. Includes worked examples for domestic, commercial and industrial applications.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is maximum demand?",
    options: [
      "The total connected load of all equipment",
      "The maximum current the cables can safely carry",
      "The greatest load expected to be drawn at any one time",
      "The peak voltage of the supply"
    ],
    correctIndex: 2,
    explanation: "Maximum demand is the greatest electrical load expected to be drawn from the supply at any one time, taking into account diversity and operational patterns."
  },
  {
    id: "check-2",
    question: "When calculating maximum demand for a domestic installation, what information is needed from the DNO?",
    options: [
      "Cable specifications only",
      "Ze, prospective fault current, and supply capacity",
      "Only the meter type",
      "Installation age"
    ],
    correctIndex: 1,
    explanation: "The DNO must provide the external earth fault loop impedance (Ze), prospective fault current (Ipf), and the maximum available supply capacity for design purposes."
  },
  {
    id: "check-3",
    question: "A domestic installation has a 100A main fuse. The calculated maximum demand is 85A. Is this acceptable?",
    options: [
      "Yes, there is 15A spare capacity",
      "No, maximum demand must equal the fuse rating",
      "Yes, but only if diversity has been correctly applied",
      "No, maximum demand must be at least 100A"
    ],
    correctIndex: 2,
    explanation: "This is acceptable provided diversity has been correctly applied. The 85A maximum demand is within the 100A supply capacity, leaving some margin for future additions."
  },
  {
    id: "check-4",
    question: "Why must you consider future expansion when calculating maximum demand?",
    options: [
      "It is a legal requirement",
      "To avoid costly upgrades when additional loads are added later",
      "The DNO requires it",
      "To increase the cable sizes"
    ],
    correctIndex: 1,
    explanation: "Considering future expansion avoids costly upgrades. Adding circuits later without spare capacity may require upgrading the main supply, cables, and distribution equipment."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "A small office has: Lighting 15A, Socket outlets 40A (diversified), Air conditioning 20A, IT equipment 25A. Calculate the maximum demand.",
    options: [
      "100A",
      "85A (applying 15% reduction)",
      "100A (no diversity on final figure)",
      "75A"
    ],
    correctAnswer: 2,
    explanation: "Maximum demand = 15A + 40A + 20A + 25A = 100A. The socket outlet figure is already diversified, and individual load types should be summed. Further diversity may be applied depending on usage patterns."
  },
  {
    id: 2,
    question: "What must be confirmed before finalising a maximum demand calculation?",
    options: [
      "Cable colours",
      "That the supply capacity from the DNO is adequate",
      "The age of the building",
      "The type of meter installed"
    ],
    correctAnswer: 1,
    explanation: "Before finalising the design, you must confirm the DNO can provide adequate supply capacity. If maximum demand exceeds available supply, either the design must change or a larger supply must be requested."
  },
  {
    id: 3,
    question: "A three-phase supply to a workshop has maximum demand of 60A per phase. What is the total kVA?",
    options: [
      "41.4 kVA",
      "13.8 kVA",
      "24 kVA",
      "72 kVA"
    ],
    correctAnswer: 0,
    explanation: "For three-phase: kVA = (3 x V x I) / 1000 = (1.732 x 400 x 60) / 1000 = 41.57 kVA, approximately 41.4 kVA."
  },
  {
    id: 4,
    question: "When should maximum demand calculations be documented?",
    options: [
      "Only for commercial installations",
      "Never - they are only for planning purposes",
      "Always - as part of the design documentation",
      "Only if requested by the client"
    ],
    correctAnswer: 2,
    explanation: "Maximum demand calculations should always be documented as part of the design documentation. This provides evidence of compliance and helps with future modifications."
  },
  {
    id: 5,
    question: "A domestic installation has: Ring circuit 32A, Cooker 30A (diversified), Lighting 6A (diversified), Shower 40A. What diversity applies to calculate total maximum demand?",
    options: [
      "Add all values = 108A",
      "100% largest + 40% others = 40 + 27.2 = 67.2A",
      "50% of total = 54A",
      "Use largest value only = 40A"
    ],
    correctAnswer: 1,
    explanation: "For domestic standard circuits: 100% of largest circuit (shower 40A) + 40% of others (32+30+6) x 0.4 = 40 + 27.2 = 67.2A maximum demand."
  },
  {
    id: 6,
    question: "What formula relates power, voltage and current for single-phase AC?",
    options: [
      "P = V x I x pf",
      "P = V / I",
      "P = I squared x R",
      "P = V x pf"
    ],
    correctAnswer: 0,
    explanation: "For single-phase AC: P = V x I x power factor (pf). At unity power factor, P = V x I. For resistive loads, power factor is 1. For inductive loads (motors), pf may be 0.8-0.85."
  },
  {
    id: 7,
    question: "A 9.5kW electric shower at 230V draws approximately what current?",
    options: [
      "35A",
      "41A",
      "45A",
      "50A"
    ],
    correctAnswer: 1,
    explanation: "I = P / V = 9500 / 230 = 41.3A. Electric showers are resistive loads with unity power factor, so P = V x I directly applies."
  },
  {
    id: 8,
    question: "Why might actual demand be lower than calculated maximum demand?",
    options: [
      "Calculation errors",
      "Diversity factors are conservative estimates",
      "Equipment is faulty",
      "The supply is insufficient"
    ],
    correctAnswer: 1,
    explanation: "Diversity factors are conservative (safe) estimates. In practice, even fewer loads may operate simultaneously than the factors assume, so actual demand is often lower than calculated."
  },
  {
    id: 9,
    question: "A commercial premises requires 150A maximum demand but only 100A supply is available. What options exist?",
    options: [
      "Proceed with design - it will be fine",
      "Request supply upgrade, implement load management, or reduce connected load",
      "Use thicker cables",
      "Install a larger consumer unit"
    ],
    correctAnswer: 1,
    explanation: "Options include: (1) Request DNO supply upgrade, (2) Implement load management/shedding systems, (3) Reduce connected load or phase loads differently, (4) Install on-site generation for peak lopping."
  },
  {
    id: 10,
    question: "What is the relationship between maximum demand and cable sizing?",
    options: [
      "No relationship - they are calculated separately",
      "Maximum demand determines the minimum size of main cables and supply equipment",
      "Cable sizing determines maximum demand",
      "Only protective devices are affected by maximum demand"
    ],
    correctAnswer: 1,
    explanation: "Maximum demand directly determines the minimum size of main intake cables, main switch, and distribution equipment. These must all be rated to carry the maximum demand continuously."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the difference between connected load and maximum demand?",
    answer: "Connected load is the total rating of all equipment that could be connected. Maximum demand is the greatest load actually expected at any time, which is always less than or equal to connected load due to diversity."
  },
  {
    question: "How do I get supply information from the DNO?",
    answer: "Contact the local Distribution Network Operator (DNO) with the property address. They will provide Ze (external earth fault loop impedance), prospective fault current, and confirm available supply capacity. Allow several weeks for response."
  },
  {
    question: "Can maximum demand change after installation?",
    answer: "Yes. Adding new circuits, installing higher-rated equipment, or changing usage patterns can increase maximum demand. Major additions may require recalculation and potentially a supply upgrade."
  },
  {
    question: "What happens if actual demand exceeds the calculated maximum?",
    answer: "The main protective device (fuse or MCB) will trip, or in severe cases, the DNO's cutout fuse will blow. This interrupts supply and indicates the installation is overloaded."
  },
  {
    question: "Do I need to calculate maximum demand for every installation?",
    answer: "Yes, for all but the simplest additions. Maximum demand assessment is required by BS 7671 Regulation 311.1 and is essential for proper design of supplies, cables, and protective equipment."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module6Section2_5 = () => {
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
            <Link to="/study-centre/apprentice/level3-module6-section2">
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
            <span>Module 6.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maximum Demand
          </h1>
          <p className="text-white/80">
            Calculating the greatest load expected from an electrical installation
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Greatest load expected at any one time</li>
              <li><strong>Purpose:</strong> Size main cables, switches, and request adequate supply</li>
              <li><strong>Formula (1ph):</strong> I = P / (V x pf) for current from power</li>
              <li><strong>Document:</strong> Always record calculations in design documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Main switch ratings, DNO cutout fuse size, cable sizes at origin</li>
              <li><strong>Use:</strong> Size intake equipment, verify supply adequacy</li>
              <li><strong>Apply:</strong> Supply applications, new installations, major additions</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define maximum demand and explain its importance in design",
              "Calculate maximum demand for domestic installations",
              "Calculate maximum demand for commercial and industrial premises",
              "Convert between power (kW), voltage (V), and current (A)",
              "Verify supply adequacy for calculated demands",
              "Document maximum demand calculations correctly"
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
            Understanding Maximum Demand
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand is the greatest electrical load expected to be drawn from a supply at any one time. It determines the size of main cables, main switch, meter, and the supply capacity required from the Distribution Network Operator (DNO).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Demand vs Connected Load:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connected Load:</strong> Total rating of all equipment - everything added together</li>
                <li><strong>Maximum Demand:</strong> Realistic peak load after applying diversity factors</li>
                <li>Maximum demand is always equal to or less than connected load</li>
                <li>The difference reflects that not all loads operate simultaneously</li>
              </ul>
            </div>

            <p>
              BS 7671 Regulation 311.1 requires that maximum demand be determined for economic and reliable design within thermal limits and admissible voltage drop.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Underestimating maximum demand leads to overloaded circuits and supply trips. Overestimating leads to unnecessarily expensive installation costs.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand calculations require converting equipment ratings to current, applying diversity factors, and summing the results. The basic electrical relationships are essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Formulas</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power: P = V x I x pf (watts)</li>
                  <li>Current: I = P / (V x pf) (amps)</li>
                  <li>At unity pf: I = P / V</li>
                  <li>Example: 3kW at 230V = 13A</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Formulas</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power: P = 1.732 x VL x I x pf</li>
                  <li>Current: I = P / (1.732 x VL x pf)</li>
                  <li>VL = 400V line-to-line</li>
                  <li>Example: 20kW at 400V, pf 0.8 = 36A per phase</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A domestic installation with 9.5kW shower: I = 9500/230 = 41.3A. This single appliance determines minimum cable and protective device rating for that circuit.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Worked Example - Domestic Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculate maximum demand for a 3-bedroom house with the following circuits:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connected Circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>2 x Ring final circuits (32A each)</li>
                <li>1 x Cooker circuit (12kW cooker = 52A, with socket)</li>
                <li>1 x Electric shower (9.5kW = 41A)</li>
                <li>1 x Immersion heater (3kW = 13A)</li>
                <li>Lighting circuits (total 1.2kW = 5.2A)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Applying Diversity (Domestic):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cooker: 10A + 30% of 42A + 5A = 10 + 12.6 + 5 = 27.6A</li>
                <li>Shower: 41A (no diversity - single appliance)</li>
                <li>Immersion: 13A (no diversity - thermostatic)</li>
                <li>Lighting: 5.2A x 66% = 3.4A</li>
                <li>Ring circuits: Standard circuit allowance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Using Standard Circuit Method:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Largest circuit: Shower 41A at 100%</li>
                <li>Other circuits at 40%: (32+32+27.6+13+3.4) x 0.4 = 43.2A</li>
                <li>Total Maximum Demand: 41 + 43.2 = 84.2A</li>
                <li>A 100A supply would be adequate with margin for expansion</li>
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
            Verifying Supply Adequacy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once maximum demand is calculated, verify that the available supply from the DNO is adequate. Contact the DNO early in the design process to avoid delays.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Standard Domestic</p>
                <p className="text-white/90 text-xs">60A or 100A single-phase</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Larger Domestic</p>
                <p className="text-white/90 text-xs">100A single-phase or 3-phase</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Commercial/Industrial</p>
                <p className="text-white/90 text-xs">Three-phase up to several hundred amps</p>
              </div>
            </div>

            <p>
              If maximum demand exceeds available supply, options include: requesting a supply upgrade (may involve network reinforcement costs), implementing load management systems, installing on-site generation, or redesigning to reduce demand.
            </p>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> Allow sufficient time for DNO supply upgrades - these can take weeks or months and may require significant civil works.
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
                <li>List all circuits with their protective device ratings</li>
                <li>Calculate actual equipment loads where known</li>
                <li>Apply appropriate diversity factors by premises type</li>
                <li>Sum diversified loads to find maximum demand</li>
                <li>Compare with available supply capacity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Information Required from DNO</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>External earth fault loop impedance (Ze)</li>
                <li>Prospective fault current at the origin</li>
                <li>Type of earthing system (TN-C-S, TN-S, or TT)</li>
                <li>Available supply capacity and upgrade options</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting high-power appliances</strong> - Electric showers, cookers, EV chargers significantly affect demand</li>
                <li><strong>Applying excessive diversity</strong> - Some loads (thermal storage, water heaters) need full rating</li>
                <li><strong>Not checking supply capacity</strong> - Design is worthless if supply cannot deliver</li>
                <li><strong>Ignoring future expansion</strong> - Especially EV chargers, heat pumps becoming common</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Maximum Demand</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: I = P / (V x pf)</li>
                  <li>Three-phase: I = P / (1.732 x V x pf)</li>
                  <li>At unity pf: I = P / V</li>
                  <li>9kW shower at 230V = 39A</li>
                  <li>3kW heater at 230V = 13A</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Supply Capacities</p>
                <ul className="space-y-0.5">
                  <li>Small domestic: 60A single-phase</li>
                  <li>Standard domestic: 100A single-phase</li>
                  <li>Larger domestic: 100A 3-phase</li>
                  <li>Small commercial: Up to 200A 3-phase</li>
                  <li>Industrial: Assessed individually</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Diversity
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2-6">
              Next: Load Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section2_5;
