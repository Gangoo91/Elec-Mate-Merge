/**
 * Level 3 Module 6 Section 2.6 - Load Assessment Methods
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
const TITLE = "Load Assessment Methods - Level 3 Module 6 Section 2.6";
const DESCRIPTION = "Learn systematic load assessment methods for electrical installations. Covers load categorisation, power factor considerations, harmonic effects, and practical assessment techniques.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main purpose of a load assessment?",
    options: [
      "To determine cable colours",
      "To establish the electrical requirements of equipment for proper system design",
      "To calculate RCD ratings only",
      "To determine earthing arrangements"
    ],
    correctIndex: 1,
    explanation: "Load assessment establishes the electrical requirements (power, current, voltage, frequency) of all equipment to be connected, enabling proper design of circuits, cables, and protective devices."
  },
  {
    id: "check-2",
    question: "A motor nameplate shows 5.5kW, 400V, 3-phase, 0.85 power factor. What is the line current?",
    options: [
      "7.9A",
      "9.3A",
      "13.75A",
      "16.2A"
    ],
    correctIndex: 1,
    explanation: "I = P / (1.732 x V x pf) = 5500 / (1.732 x 400 x 0.85) = 5500 / 588.88 = 9.34A approximately."
  },
  {
    id: "check-3",
    question: "Why must discharge lighting circuits be assessed at 1.8 times lamp wattage?",
    options: [
      "To allow for future lamp upgrades",
      "To account for power factor, harmonics, and controlgear losses",
      "Because discharge lamps are less efficient",
      "It is a safety margin only"
    ],
    correctIndex: 1,
    explanation: "The 1.8 multiplier accounts for: power factor correction equipment, third harmonic currents (especially with electronic ballasts), and losses in controlgear/ballasts."
  },
  {
    id: "check-4",
    question: "What load category typically has the worst (lowest) power factor?",
    options: [
      "Resistive heating elements",
      "Incandescent lighting",
      "Induction motors at light load",
      "Electric showers"
    ],
    correctIndex: 2,
    explanation: "Induction motors have poor power factor at light loads (may be 0.3-0.5). At full load, power factor improves to 0.8-0.85. Motors running lightly loaded waste energy and capacity."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following loads would be classified as continuous?",
    options: [
      "Hand dryer in a washroom",
      "Emergency lighting in maintained mode",
      "Kettle in a kitchen",
      "Photocopier in standby"
    ],
    correctAnswer: 1,
    explanation: "Maintained emergency lighting operates continuously during occupied hours. Hand dryers, kettles, and standby equipment operate intermittently."
  },
  {
    id: 2,
    question: "A motor starting current is typically how many times the full load current?",
    options: [
      "1-2 times",
      "2-4 times",
      "6-8 times",
      "10-12 times"
    ],
    correctAnswer: 2,
    explanation: "Direct-on-line (DOL) motor starters draw 6-8 times full load current during starting. This must be considered when selecting protective devices and assessing voltage drop."
  },
  {
    id: 3,
    question: "What information should be recorded when assessing loads?",
    options: [
      "Only power rating",
      "Power, voltage, current, power factor, operating pattern",
      "Only manufacturer name",
      "Cable size only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive load assessment records: rated power, operating voltage, current draw, power factor, operating pattern (continuous/intermittent), starting characteristics, and any special requirements."
  },
  {
    id: 4,
    question: "How does power factor affect circuit sizing?",
    options: [
      "It has no effect",
      "Lower power factor means higher current for the same power output",
      "Higher power factor means higher current",
      "It only affects voltage drop"
    ],
    correctAnswer: 1,
    explanation: "For the same real power (kW), lower power factor requires higher current. I = P/(V x pf). A 10kW load at pf 0.8 draws 54.3A, but at pf 1.0 would only draw 43.5A."
  },
  {
    id: 5,
    question: "What is the purpose of a load schedule?",
    options: [
      "To list equipment manufacturers",
      "To document all loads and their characteristics systematically",
      "To record test results",
      "To list cable colours"
    ],
    correctAnswer: 1,
    explanation: "A load schedule systematically documents all connected loads, their ratings, supply requirements, circuit references, and other characteristics essential for design and future reference."
  },
  {
    id: 6,
    question: "When assessing motor loads, what additional factor must be considered beyond steady-state current?",
    options: [
      "Motor colour",
      "Starting current and method",
      "Motor age",
      "Manufacturer location"
    ],
    correctAnswer: 1,
    explanation: "Motor starting current (typically 6-8x FLC for DOL starting) affects protective device selection, cable sizing for voltage drop, and may require reduced voltage starting methods."
  },
  {
    id: 7,
    question: "A VSD-controlled motor has what effect on the neutral conductor?",
    options: [
      "No effect",
      "Reduces neutral current to zero",
      "May increase neutral current due to third harmonic",
      "Changes neutral colour requirement"
    ],
    correctAnswer: 2,
    explanation: "Variable speed drives generate significant third harmonic currents which sum in the neutral. The neutral may need to be larger than phase conductors in heavy VSD installations."
  },
  {
    id: 8,
    question: "What power factor would you assume for a resistive heating load?",
    options: [
      "0.8 lagging",
      "0.85 lagging",
      "1.0 (unity)",
      "0.9 leading"
    ],
    correctAnswer: 2,
    explanation: "Resistive loads (heating elements, incandescent lamps, kettles) have unity power factor (1.0) because current and voltage are in phase. No reactive power is drawn."
  },
  {
    id: 9,
    question: "An office floor has 50 computers rated at 350W each. What load would you assess for circuit design?",
    options: [
      "17.5kW (full rating of all)",
      "8.75kW (50% diversity)",
      "Depends on usage pattern - likely 70-80% diversity",
      "3.5kW (10% only)"
    ],
    correctAnswer: 2,
    explanation: "Computer loads require assessment of actual usage. Typically 70-80% diversity is appropriate for office IT equipment, giving 12.25-14kW. Sleep modes and varying work patterns reduce simultaneous demand."
  },
  {
    id: 10,
    question: "Why is it important to identify the operating pattern of loads?",
    options: [
      "For maintenance scheduling only",
      "To determine if loads are continuous, intermittent, or cyclic for proper sizing",
      "For billing purposes",
      "To set the time clock"
    ],
    correctAnswer: 1,
    explanation: "Operating pattern determines how cables heat up. Continuous loads require full cable rating. Intermittent loads may allow smaller cables if rest periods allow cooling. Cyclic loads require careful analysis."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the difference between connected load and assessed load?",
    answer: "Connected load is the nameplate rating of equipment. Assessed load considers actual operating conditions, diversity, power factor, and usage patterns to determine realistic demand."
  },
  {
    question: "How do I assess loads when equipment hasn't been specified yet?",
    answer: "Use standard allowances: 13A per socket outlet, 100W minimum per lighting point, equipment ratings from similar installations. Build in reasonable contingency for unknown factors."
  },
  {
    question: "Should I use power (kW) or apparent power (kVA) for assessments?",
    answer: "Both are important. Real power (kW) determines energy use and heating. Apparent power (kVA) determines current and hence cable/equipment sizing. kVA = kW / power factor."
  },
  {
    question: "How do harmonics affect load assessment?",
    answer: "Harmonics increase RMS current without doing useful work. Non-linear loads (VFDs, LEDs, computers) generate harmonics that increase cable heating and may require larger neutral conductors."
  },
  {
    question: "When should I request equipment data sheets from manufacturers?",
    answer: "Always for significant loads: motors over 3kW, IT rooms, industrial processes, and any equipment where standard assumptions may be inadequate. Accurate data prevents over or under-design."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module6Section2_6 = () => {
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
        

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Identify all loads and their electrical characteristics</li>
              <li><strong>Key data:</strong> Power, voltage, current, power factor, operating pattern</li>
              <li><strong>Discharge lighting:</strong> Use lamp watts x 1.8 for VA</li>
              <li><strong>Motors:</strong> Consider starting current (6-8x FLC)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Equipment nameplates, data sheets, load schedules</li>
              <li><strong>Use:</strong> Create load schedules, size circuits correctly</li>
              <li><strong>Apply:</strong> All design projects from domestic to industrial</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        

        

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Load Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical loads can be categorised by their electrical characteristics and operating patterns. Understanding these categories helps in applying correct assessment methods and design approaches.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">By Electrical Characteristic</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Resistive:</strong> Heating, incandescent lamps (pf = 1.0)</li>
                  <li><strong>Inductive:</strong> Motors, transformers (pf = 0.8-0.9)</li>
                  <li><strong>Capacitive:</strong> Power factor correction (leading pf)</li>
                  <li><strong>Non-linear:</strong> Electronics, VFDs, LEDs (harmonics)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">By Operating Pattern</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Continuous:</strong> Runs constantly (lighting, fans)</li>
                  <li><strong>Intermittent:</strong> On/off cycles (kettles, dryers)</li>
                  <li><strong>Cyclic:</strong> Regular pattern (compressors, pumps)</li>
                  <li><strong>Standby:</strong> Low power until activated</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Load category affects cable sizing, protection selection, and diversity calculations. Continuous loads require full cable capacity; intermittent loads may allow smaller cables.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reading Equipment Data
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment nameplates and data sheets provide essential information for load assessment. Key data includes rated power, voltage, current, frequency, and power factor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Nameplate Information:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rated Power:</strong> kW (real power) or kVA (apparent power)</li>
                <li><strong>Voltage:</strong> Operating voltage (230V, 400V, etc.)</li>
                <li><strong>Current:</strong> Full load current (FLC)</li>
                <li><strong>Frequency:</strong> Usually 50Hz in UK</li>
                <li><strong>Power Factor:</strong> cos phi at rated load</li>
                <li><strong>Efficiency:</strong> Particularly important for motors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculating Current from Power:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single-phase: I = P / (V x pf)</li>
                <li>Three-phase: I = P / (1.732 x VL x pf)</li>
                <li>If only kVA given: I = kVA x 1000 / (1.732 x VL)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Special Load Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain loads require special assessment methods due to their electrical characteristics. The most common are discharge lighting and motors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Discharge Lighting Assessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>VA = Lamp watts x 1.8 (if exact data unavailable)</li>
                <li>Accounts for: Power factor correction, controlgear losses, harmonics</li>
                <li>LED drivers may generate significant third harmonic current</li>
                <li>High-frequency ballasts may have better power factor</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Motor Load Assessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Full load current from nameplate or calculation</li>
                <li>Starting current: 6-8 times FLC for DOL starting</li>
                <li>Power factor: Typically 0.8-0.85 at full load, worse at light load</li>
                <li>Consider motor efficiency when calculating from mechanical output</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 7.5kW motor, 400V, efficiency 88%, pf 0.85: Electrical input = 7.5/0.88 = 8.52kW. Current = 8520/(1.732 x 400 x 0.85) = 14.5A.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Creating Load Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A load schedule is a systematic document recording all connected loads and their characteristics. It forms the basis of design calculations and serves as a reference throughout the project lifecycle.
            </p>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Information to Record</p>
                <p className="text-white/90 text-xs">Load description, circuit ref, rating, current, pf</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Purpose</p>
                <p className="text-white/90 text-xs">Design basis, procurement, commissioning, future reference</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Load Schedule Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuit reference number</li>
                <li>Load description and location</li>
                <li>Rated power (kW) and apparent power (kVA)</li>
                <li>Operating voltage and phases</li>
                <li>Full load current</li>
                <li>Power factor</li>
                <li>Operating pattern (continuous/intermittent)</li>
                <li>Protective device rating</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Point:</strong> Keep load schedules updated throughout the project. They are essential for commissioning checks and future modifications.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain equipment schedules from client/architect</li>
                <li>Review manufacturer data sheets for specific equipment</li>
                <li>Apply standard values where equipment not yet specified</li>
                <li>Consider future expansion requirements</li>
                <li>Document all assumptions clearly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Allowances (When Actual Data Unknown)</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>13A socket outlets: Assume 13A per socket (diversified)</li>
                <li>Lighting points: Minimum 100W per outlet</li>
                <li>Small power: Allow 25-50 W/m2 for offices</li>
                <li>IT equipment: 500W per workstation typical</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring power factor</strong> - Real and apparent power differ significantly for motors</li>
                <li><strong>Forgetting starting currents</strong> - Motors draw 6-8x FLC at startup</li>
                <li><strong>Using old data</strong> - Modern LED lighting differs from fluorescent</li>
                <li><strong>Not documenting assumptions</strong> - Makes future modifications difficult</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Load Assessment</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Typical Power Factors</p>
                <ul className="space-y-0.5">
                  <li>Resistive loads: 1.0 (unity)</li>
                  <li>Motors (full load): 0.8-0.85</li>
                  <li>Motors (light load): 0.3-0.5</li>
                  <li>Discharge lighting: 0.85-0.95</li>
                  <li>Computers/IT: 0.65-0.8</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Standard Allowances</p>
                <ul className="space-y-0.5">
                  <li>Lighting point: min 100W</li>
                  <li>Socket outlet: 13A rated</li>
                  <li>Discharge lighting: watts x 1.8</li>
                  <li>Motor starting: 6-8 x FLC</li>
                  <li>Office small power: 25-50 W/m2</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Maximum Demand
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section2_6;
