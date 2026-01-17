import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cpc-function",
    question: "What is the main function of a CPC (Circuit Protective Conductor)?",
    options: [
      "To carry normal load current",
      "To provide a path for fault current to enable automatic disconnection",
      "To reduce electromagnetic interference",
      "To provide neutral return path"
    ],
    correctIndex: 1,
    explanation: "The CPC provides a path for fault current back to the source, allowing protective devices to operate and disconnect the supply automatically."
  },
  {
    id: "selv-vs-pelv",
    question: "How does SELV differ from PELV?",
    options: [
      "SELV allows higher voltages",
      "PELV allows earth connection, SELV does not",
      "SELV is for AC only, PELV for DC",
      "There is no difference"
    ],
    correctIndex: 1,
    explanation: "SELV (Separated Extra Low Voltage) requires complete isolation from earth, while PELV (Protective Extra Low Voltage) allows earthing."
  },
  {
    id: "rcd-detection",
    question: "What does an RCD (Residual Current Device) detect?",
    options: [
      "Overcurrent conditions",
      "Voltage fluctuations",
      "Imbalance between line and neutral currents",
      "Power factor changes"
    ],
    correctIndex: 2,
    explanation: "An RCD detects the imbalance between line and neutral currents, which indicates current leaking to earth (residual current)."
  }
];

const faqs = [
  {
    question: "Where is ADS typically applied?",
    answer: "ADS is the most commonly used protective measure in most electrical installations, providing both basic and fault protection."
  },
  {
    question: "Which system allows earth connection — SELV or PELV?",
    answer: "PELV (Protective Extra Low Voltage) allows earth connection, while SELV (Separated Extra Low Voltage) must be completely isolated from earth."
  },
  {
    question: "What are the maximum disconnection times for final circuits ≤32A?",
    answer: "0.4 seconds maximum disconnection time for final circuits ≤32A in TN systems."
  },
  {
    question: "When would you use SELV instead of normal mains voltage?",
    answer: "SELV is used in wet locations like bathrooms and swimming pools, medical areas, and other environments where the risk of electric shock is increased."
  }
];

const quizQuestion = {
  question: "In a swimming pool installation (Zone 1), why would SELV be chosen over PELV?",
  options: [
    "SELV is cheaper to install",
    "SELV provides higher safety through complete separation from earth in wet conditions",
    "PELV is not suitable for lighting",
    "SELV allows higher current capacity"
  ],
  correctAnswer: 1,
  explanation: "SELV provides the highest level of safety through complete separation from earth, which is essential in wet conditions where the risk of electric shock is significantly increased."
};

const BS7671Module2Section2 = () => {
  useSEO({
    title: "Key Terms - CPC, ADS, SELV, PELV | BS 7671 Module 2.2",
    description: "Learn essential BS 7671 terminology including CPC, ADS, SELV, PELV and protective devices. Understanding key terms for electrical safety and protection systems."
  });

  const outcomes = [
    "Understand and differentiate CPC, ADS, SELV, and PELV",
    "Identify correct applications for each protective measure",
    "Learn the role of protective devices in ensuring safety",
    "Apply these concepts in practical installation scenarios"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Terms – CPC, ADS, SELV, PELV, Protective Devices
          </h1>
          <p className="text-white/80">
            Essential terminology for electrical safety and protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>CPC:</strong> Carries fault current for automatic disconnection</li>
              <li><strong>ADS:</strong> Most common protective measure</li>
              <li><strong>SELV/PELV:</strong> Extra low voltage systems ≤50V AC</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Green/yellow conductor = CPC</li>
              <li><strong>Use:</strong> SELV in wet locations, ADS elsewhere</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: CPC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CPC - Circuit Protective Conductor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Circuit Protective Conductor (CPC) is fundamental to electrical safety. It provides the path for fault current to return to the source, enabling automatic disconnection when dangerous faults occur.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Primary function:</strong> Carries fault current safely back to source</li>
                  <li><strong>Identification:</strong> Green and yellow insulation</li>
                  <li><strong>Sizing:</strong> Based on fault current and disconnection time</li>
                  <li><strong>Continuity:</strong> Must be continuous throughout circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Connection:</strong> Links all exposed metalwork</li>
                  <li><strong>Testing:</strong> Requires continuity verification</li>
                  <li><strong>Protection:</strong> Cannot be switched or fused</li>
                  <li><strong>Materials:</strong> Copper or appropriate conductor</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white text-sm mb-1">CPC Functions</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Provides fault current return path</li>
                  <li>• Enables automatic disconnection</li>
                  <li>• Maintains safe potential on metalwork</li>
                  <li>• Facilitates protective device operation</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white text-sm mb-1">Minimum Sizes</p>
                <ul className="text-xs space-y-0.5">
                  <li>• 1.5mm² for fixed wiring</li>
                  <li>• Cross-sectional area calculations required</li>
                  <li>• Must withstand fault current without damage</li>
                  <li>• Proper termination at all points</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: ADS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            ADS - Automatic Disconnection of Supply
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic Disconnection of Supply (ADS) is the most common protective measure used in electrical installations. It combines basic protection (preventing contact with live parts) and fault protection (protection during fault conditions).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">How ADS Works</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">1. Normal Operation</p>
                  <p className="text-white/90 text-xs">Basic protection prevents contact with live parts</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-orange-500/30">
                  <p className="font-medium text-white mb-1">2. Fault Occurs</p>
                  <p className="text-white/90 text-xs">Current flows through CPC creating fault loop</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-green-500/30">
                  <p className="font-medium text-white mb-1">3. Auto Disconnection</p>
                  <p className="text-white/90 text-xs">Protective device operates within required time</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">ADS Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Basic protection:</strong> Insulation, barriers, enclosures</li>
                  <li><strong>Fault protection:</strong> Automatic disconnection when fault occurs</li>
                  <li><strong>Protective devices:</strong> MCBs, RCDs, or fuses</li>
                  <li><strong>Earthing system:</strong> Provides fault current return path</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Disconnection Times</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Final circuits ≤32A:</strong> 0.4 seconds maximum</li>
                  <li><strong>Distribution circuits:</strong> 5 seconds maximum</li>
                  <li><strong>Special locations:</strong> Reduced times (e.g., 0.04s)</li>
                  <li><strong>TT systems:</strong> RCD required, typically 30mA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: SELV and PELV */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SELV and PELV - Extra Low Voltage Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SELV (Separated Extra Low Voltage) and PELV (Protective Extra Low Voltage) are special protective measures using extra low voltage (typically not exceeding 50V AC or 120V DC) to provide safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-3">SELV - Separated Extra Low Voltage</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Key Characteristics:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Complete electrical separation from earth</li>
                      <li>• No part may be connected to earth</li>
                      <li>• Maximum 50V AC / 120V DC</li>
                      <li>• Requires isolation transformer or battery</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Typical Applications:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Bathroom shaver sockets</li>
                      <li>• Swimming pool lighting</li>
                      <li>• Portable tools in hazardous areas</li>
                      <li>• Medical equipment in patient areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-3">PELV - Protective Extra Low Voltage</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Key Characteristics:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Earthing is permitted</li>
                      <li>• May be connected to earth or CPC</li>
                      <li>• Maximum 50V AC / 120V DC</li>
                      <li>• More flexible installation requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Typical Applications:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Fire alarm systems</li>
                      <li>• Security systems</li>
                      <li>• Telecommunications equipment</li>
                      <li>• Garden lighting installations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-3">SELV vs PELV Comparison</p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">Earthing</p>
                  <p>SELV: No earth connection allowed</p>
                  <p>PELV: Earth connection permitted</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">Flexibility</p>
                  <p>SELV: More restrictive installation</p>
                  <p>PELV: More flexible requirements</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">Safety Level</p>
                  <p>SELV: Highest level of safety</p>
                  <p>PELV: Equivalent safety level</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Protective Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protective Devices - MCBs, RCDs, Fuses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective devices are essential components that detect abnormal conditions and automatically disconnect circuits to prevent danger. Each type serves specific protective functions.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">MCBs</p>
                <p className="text-xs text-white/80 mb-2">Miniature Circuit Breakers</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Functions:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Overcurrent protection</li>
                      <li>• Short circuit protection</li>
                      <li>• Manual isolation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Types:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Type B, C, D curves</li>
                      <li>• 6A to 125A ratings</li>
                      <li>• Reusable after tripping</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-green-400 mb-2">RCDs</p>
                <p className="text-xs text-white/80 mb-2">Residual Current Devices</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Functions:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Earth leakage detection</li>
                      <li>• Additional shock protection</li>
                      <li>• Fire protection (300mA)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Ratings:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• 30mA, 100mA, 300mA</li>
                      <li>• Types: AC, A, F, B</li>
                      <li>• Test button for checks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-orange-400 mb-2">Fuses</p>
                <p className="text-xs text-white/80 mb-2">Cartridge and Rewirable</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Functions:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• Overcurrent protection</li>
                      <li>• Short circuit protection</li>
                      <li>• High breaking capacity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Types:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• BS 88, BS 1361, BS 3036</li>
                      <li>• Single use - must replace</li>
                      <li>• Excellent current limiting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-transparent border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-3">Swimming Pool Installation Challenge</p>
              <div className="text-sm space-y-3">
                <p><strong>Situation:</strong> An electrician needs to install lighting around a swimming pool. The area is classified as Zone 1 (area likely to be wet) and requires special consideration for electrical safety.</p>

                <p><strong>Challenge:</strong> Normal mains voltage (230V) cannot be used in Zone 1 due to the increased risk of electric shock in wet conditions.</p>

                <div>
                  <p className="font-medium mb-1">Solution Applied:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• SELV system chosen for maximum safety</li>
                    <li>• 12V LED lighting installed</li>
                    <li>• Safety isolating transformer located outside zones</li>
                    <li>• No earthing of SELV circuit (complete separation)</li>
                    <li>• IP67 rated luminaires for water protection</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">Why This Works:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• 12V cannot cause dangerous shock even when wet</li>
                    <li>• Complete separation prevents earth fault currents</li>
                    <li>• No protective devices needed for SELV circuit</li>
                    <li>• Compliance with BS 7671 Section 702 (Swimming Pools)</li>
                  </ul>
                </div>

                <p><strong>Alternative Considered:</strong> PELV could be used with earthing, but SELV provides higher level of safety in this wet environment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
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
              <p className="font-medium text-elec-yellow/80 mb-1">Key Protective Measures</p>
              <ul className="space-y-0.5">
                <li>CPC – fault current path (green/yellow)</li>
                <li>ADS – most common protective measure</li>
                <li>SELV – ≤50V AC, no earth connection</li>
                <li>PELV – ≤50V AC, earth permitted</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Device Selection</p>
              <ul className="space-y-0.5">
                <li>MCB – overcurrent and short circuit</li>
                <li>RCD – earth leakage detection</li>
                <li>Fuse – overcurrent with high breaking capacity</li>
                <li>RCBO – combined MCB and RCD</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2-section-3">
              Next: Amendment 2 & 3 Definitions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module2Section2;
