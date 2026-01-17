import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD Types and Applications - Module 6 Section 1";
const DESCRIPTION = "Understanding different RCD types (AC, A, F, B), ratings, and their appropriate applications for electrical inspection and testing.";

const quickCheckQuestions = [
  {
    id: "rcd-type-a",
    question: "Type A RCDs detect:",
    options: [
      "Only sinusoidal AC fault currents",
      "Sinusoidal AC and pulsating DC fault currents",
      "Only smooth DC fault currents",
      "Only overcurrents"
    ],
    correctIndex: 1,
    explanation: "Type A detects both sinusoidal AC and pulsating DC faults, suitable for electronic equipment."
  },
  {
    id: "rcd-30ma",
    question: "A 30mA RCD is designed to provide:",
    options: [
      "Fire protection only",
      "Overload protection",
      "Additional protection against electric shock",
      "Short circuit protection"
    ],
    correctIndex: 2,
    explanation: "30mA RCDs provide additional protection against electric shock - the 30mA level is below ventricular fibrillation threshold."
  },
  {
    id: "rcd-limitation",
    question: "RCDs do NOT protect against:",
    options: [
      "Earth faults",
      "Line-neutral shocks",
      "Leakage to earth",
      "Faults via the CPC"
    ],
    correctIndex: 1,
    explanation: "RCDs don't protect against L-N shocks (in series with load) as no current leaks to earth."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "RCDs detect faults by measuring:",
    options: [
      "Voltage between line and earth",
      "Current imbalance between line and neutral",
      "Cable temperature",
      "Insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "RCDs detect the difference between current in line and neutral. During an earth fault, some current returns via earth, creating detectable imbalance."
  },
  {
    id: 2,
    question: "A 30mA RCD is designed to provide:",
    options: [
      "Fire protection only",
      "Overload protection",
      "Additional protection against electric shock",
      "Short circuit protection"
    ],
    correctAnswer: 2,
    explanation: "30mA RCDs provide additional protection against electric shock. The 30mA level is below the threshold for ventricular fibrillation."
  },
  {
    id: 3,
    question: "Type A RCDs detect:",
    options: [
      "Only sinusoidal AC fault currents",
      "Sinusoidal AC and pulsating DC fault currents",
      "Only smooth DC fault currents",
      "Only overcurrents"
    ],
    correctAnswer: 1,
    explanation: "Type A detects both sinusoidal AC and pulsating DC faults, making it suitable for equipment with electronic power supplies."
  },
  {
    id: 4,
    question: "Type AC RCDs are suitable for:",
    options: [
      "EV charging circuits",
      "Simple resistive loads with sinusoidal faults only",
      "Variable speed drives",
      "Solar PV systems"
    ],
    correctAnswer: 1,
    explanation: "Type AC only detects sinusoidal AC faults. It's suitable for simple loads but not for electronic equipment that may produce DC faults."
  },
  {
    id: 5,
    question: "An RCBO combines:",
    options: [
      "RCD and fuse",
      "RCD and MCB functions",
      "Two RCDs",
      "RCD and surge protection"
    ],
    correctAnswer: 1,
    explanation: "RCBO = Residual Current Breaker with Overcurrent protection. It combines RCD (earth fault) and MCB (overcurrent) in one device."
  },
  {
    id: 6,
    question: "100mA and 300mA RCDs are primarily for:",
    options: [
      "Personal shock protection",
      "Fire protection",
      "Lighting circuits only",
      "TT systems only"
    ],
    correctAnswer: 1,
    explanation: "Higher rated RCDs (100mA, 300mA) provide fire protection by detecting earth leakage before it becomes dangerous, but don't provide personal shock protection."
  },
  {
    id: 7,
    question: "RCDs do NOT protect against:",
    options: [
      "Earth faults",
      "Line-neutral shocks (touching L and N)",
      "Leakage to earth",
      "Faults via the CPC"
    ],
    correctAnswer: 1,
    explanation: "RCDs don't protect against shocks between line and neutral (series with load) as no current leaks to earth in this scenario."
  },
  {
    id: 8,
    question: "Type B RCDs are required for:",
    options: [
      "Standard socket outlets",
      "Lighting circuits",
      "Equipment producing smooth DC fault currents",
      "Simple resistive heaters"
    ],
    correctAnswer: 2,
    explanation: "Type B detects all fault types including smooth DC. Required for some EV chargers, medical equipment, and industrial drives."
  },
  {
    id: 9,
    question: "The symbol for Type A RCD includes:",
    options: [
      "A sine wave only",
      "A sine wave with half-wave rectified pulse",
      "Smooth DC symbol",
      "No symbol"
    ],
    correctAnswer: 1,
    explanation: "Type A is marked with both a sine wave (AC) and a half-wave rectified pulse (pulsating DC) symbol."
  },
  {
    id: 10,
    question: "30mA was chosen as a shock protection threshold because:",
    options: [
      "It's a round number",
      "Below ventricular fibrillation threshold",
      "Required by EU law",
      "It's the minimum detectable"
    ],
    correctAnswer: 1,
    explanation: "30mA is below the level likely to cause ventricular fibrillation. Most people can let go at this level, and brief exposure is survivable."
  }
];

const faqs = [
  {
    question: "How does an RCD work?",
    answer: "An RCD has a toroidal core through which line and neutral pass. Under normal conditions, currents are equal and opposite, creating no net magnetic field. During an earth fault, current returns via earth instead of neutral, creating imbalance that is detected and triggers disconnection."
  },
  {
    question: "Why 30mA rating?",
    answer: "30mA is chosen because it's below the threshold likely to cause ventricular fibrillation (the most dangerous cardiac arrhythmia). Tests show most people can let go of a conductor carrying 30mA, and exposure for the few milliseconds before RCD trips is survivable."
  },
  {
    question: "When is Type A required instead of Type AC?",
    answer: "Type A is required for equipment that may produce pulsating DC fault currents - typically anything with electronic power supplies, rectifiers, or inverters. This includes EV chargers, variable speed drives, and modern electronic equipment."
  },
  {
    question: "What's the difference between RCCB and RCBO?",
    answer: "RCCB (Residual Current Circuit Breaker) provides only earth leakage protection. RCBO (Residual Current Breaker with Overcurrent) combines RCD and MCB functions in one device, providing both earth fault and overcurrent protection."
  },
  {
    question: "Can RCDs prevent all electric shocks?",
    answer: "No. RCDs don't protect against line-neutral shocks (where you're in series with the load), or shocks between two live conductors. They protect against line-earth faults where current leaks to earth via a person or equipment."
  },
  {
    question: "Why use 100mA or 300mA RCDs?",
    answer: "Higher rated RCDs (100mA, 300mA) provide fire protection rather than personal shock protection. They're used for circuits where 30mA would cause nuisance tripping but where earth fault detection is still needed."
  }
];

const InspectionTestingModule6Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD Types and Applications
          </h1>
          <p className="text-white/80">
            Understanding different RCD types, ratings, and their appropriate applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Principle:</strong> Detects imbalance between L and N</li>
              <li><strong>30mA:</strong> Additional shock protection</li>
              <li><strong>100/300mA:</strong> Fire protection</li>
              <li><strong>Types:</strong> AC, A, F, B for different faults</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RCD type marking on device</li>
              <li><strong>Use:</strong> Match type to equipment</li>
              <li><strong>Apply:</strong> Correct rating for application</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How RCDs detect and respond to faults",
              "Type classifications: AC, A, F, B differences",
              "Rating applications: 30mA, 100mA, 300mA uses",
              "BS 7671 requirements for RCD protection",
              "Limitations of RCD protection",
              "Selecting the correct RCD type for applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: How RCDs Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How RCDs Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under normal conditions, all current flowing out on the line returns via neutral.
              During an earth fault, some current takes an alternative path to earth.
              The RCD detects this imbalance and trips.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core Principle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Line and neutral pass through a toroidal core</li>
                <li>Equal and opposite currents cancel out</li>
                <li>Earth fault creates detectable imbalance</li>
                <li>Imbalance triggers trip mechanism</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example:</p>
              <p className="text-sm text-white/90 italic">
                If 10A flows out on line but only 9.97A returns via neutral, the 30mA difference
                is detected and triggers disconnection.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: RCD Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different RCD types are designed to detect different types of fault currents:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type AC</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects sinusoidal AC faults only</li>
                  <li>Basic type for simple resistive loads</li>
                  <li>Not suitable for electronic equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type A</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects sinusoidal AC and pulsating DC</li>
                  <li>Required for electronic equipment</li>
                  <li>Standard for most modern installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type F</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type A plus high frequency detection</li>
                  <li>For VFDs and similar equipment</li>
                  <li>Mixed frequency fault detection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type B</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects all fault types including smooth DC</li>
                  <li>Required for some EV chargers</li>
                  <li>Medical and industrial applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Ratings and Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ratings and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD ratings determine their sensitivity and intended application:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Rating</th>
                    <th className="text-left py-2 text-white/60">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-cyan-400">10mA</td>
                    <td className="py-2">High-risk areas (medical, special)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-elec-yellow">30mA</td>
                    <td className="py-2">Additional shock protection (standard)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-semibold text-amber-400">100mA</td>
                    <td className="py-2">Fire protection, time-delayed</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-red-400">300mA</td>
                    <td className="py-2">Fire protection, main switch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: BS 7671 Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              30mA RCD protection is required for:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li>Socket outlets rated 32A or less (with exceptions)</li>
                <li>Mobile equipment outdoors up to 32A</li>
                <li>Cables in walls without mechanical protection</li>
                <li>Circuits in bathrooms</li>
                <li>TT system fault protection</li>
              </ul>
            </div>

            <p className="text-sm text-amber-300/80">
              <strong>Note:</strong> Some exceptions exist for labelled sockets, monitored industrial
              installations, and specific applications. Always check current regulations.
            </p>
          </div>
        </section>

        {/* Section 5: RCD Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            RCD Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs do NOT protect against:
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Line-Neutral Shocks</p>
                <p className="text-white/70 text-sm">Touching L and N simultaneously - you're in series with load, no earth leakage.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Overcurrent</p>
                <p className="text-white/70 text-sm">RCDs don't provide overload or short circuit protection (unless RCBO).</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Overvoltage</p>
                <p className="text-white/70 text-sm">Voltage surges or transients are not detected by RCDs.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Type Marking</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Type A RCDs show sine wave + half-wave symbol</li>
                <li>Verify correct type for application</li>
                <li>Check manufacturer specifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EV Chargers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Many require Type A minimum</li>
                <li>Some require Type B</li>
                <li>Check manufacturer requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using Type AC for electronic loads</strong> - may not detect DC faults</li>
                <li><strong>Ignoring nuisance tripping</strong> - may indicate excessive leakage</li>
                <li><strong>Wrong rating selection</strong> - 30mA for personal, 100/300mA for fire</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">RCD Types Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">RCD Types</p>
                <ul className="space-y-0.5">
                  <li>Type AC = Sinusoidal AC only</li>
                  <li>Type A = AC + pulsating DC</li>
                  <li>Type F = AC + mixed frequency</li>
                  <li>Type B = All fault types inc. DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Ratings</p>
                <ul className="space-y-0.5">
                  <li>30mA = Shock protection</li>
                  <li>100mA/300mA = Fire protection</li>
                  <li>RCBO = RCD + MCB combined</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule6Section1;
