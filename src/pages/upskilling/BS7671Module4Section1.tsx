import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ads-purpose",
    question: "What is the primary purpose of ADS in electrical systems?",
    options: [
      "To provide surge protection",
      "To automatically disconnect supply during earth faults within safe time limits",
      "To monitor power consumption",
      "To improve power factor"
    ],
    correctIndex: 1,
    explanation: "ADS (Automatic Disconnection of Supply) is designed to automatically disconnect the electrical supply when an earth fault occurs, within time limits that prevent dangerous touch voltages persisting long enough to cause harm."
  },
  {
    id: "selv-characteristic",
    question: "Which protection method provides safety through isolation with no earth reference?",
    options: [
      "PELV",
      "FELV",
      "SELV",
      "ADS"
    ],
    correctIndex: 2,
    explanation: "SELV (Safety Extra-Low Voltage) provides protection through complete isolation from earth and other circuits, with no intentional earth connections. The voltage limitation (≤50V AC) combined with isolation provides inherent safety."
  },
  {
    id: "double-insulation",
    question: "What protection does double insulation provide?",
    options: [
      "Only basic protection",
      "Only fault protection",
      "Both basic and fault protection without requiring earthing",
      "Surge protection only"
    ],
    correctIndex: 2,
    explanation: "Double or reinforced insulation provides both basic and fault protection through two independent insulation layers, eliminating the need for protective earthing. Equipment marked with the Class II symbol (⧈) uses this protection method."
  }
];

const faqs = [
  {
    question: "When should I use SELV instead of PELV?",
    answer: "Use SELV when complete isolation from earth is required for maximum safety—typically in high-risk locations like swimming pools, bathrooms (zone 0/1), and areas accessible to children. PELV is suitable when functional earthing is needed but extra-low voltage safety is still required, such as for EMC purposes in control systems."
  },
  {
    question: "Why isn't FELV recognised as a protective measure?",
    answer: "FELV (Functional Extra-Low Voltage) lacks proper safety isolation from higher voltage circuits. It may be derived from autotransformers or have direct connections to mains, meaning a fault could expose users to dangerous voltages. FELV circuits must be treated as low voltage installations with full basic and fault protection."
  },
  {
    question: "How do I choose between ADS and double insulation?",
    answer: "ADS is the standard approach for most fixed installations where earthing is practical. Double insulation is preferred for portable equipment, situations where earthing is difficult or undesirable, and where equipment is marked Class II. Consider maintenance requirements—double insulation eliminates earth continuity testing."
  },
  {
    question: "What's the relationship between basic and fault protection?",
    answer: "Basic protection prevents contact with live parts during normal operation (insulation, barriers, enclosures). Fault protection activates when basic protection fails, ensuring dangerous voltages are cleared quickly (ADS, double insulation, equipotential bonding). Both must be present for complete shock protection."
  }
];

const quizQuestion = {
  question: "Where is PELV typically more practical than SELV?",
  options: [
    "In bathrooms only",
    "Where functional earthing is required for equipment operation",
    "In outdoor installations",
    "For motor circuits only"
  ],
  correctAnswer: 1,
  explanation: "PELV is used where equipment requires an earth connection for functional purposes (such as EMC screening or reference voltages) but you still want the safety benefits of extra-low voltage. SELV cannot have any earth connections."
};

const BS7671Module4Section1 = () => {
  useSEO({
    title: "Electric Shock Protection Methods | BS 7671 Module 4.1",
    description: "Learn about SELV, PELV, ADS, double insulation and other protection methods against electric shock per BS 7671 requirements."
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
            <Link to="../bs7671-module-4">
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
            <span>Module 4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electric Shock Protection Methods
          </h1>
          <p className="text-white/80">
            SELV, PELV, ADS, and other protection strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Basic protection:</strong> Prevents contact during normal operation</li>
              <li><strong>Fault protection:</strong> Activates when basic protection fails</li>
              <li><strong>ADS:</strong> Most common method—rapid disconnection during faults</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SELV:</strong> High-risk areas (pools, bathrooms zone 0/1)</li>
              <li><strong>PELV:</strong> When functional earthing needed</li>
              <li><strong>Double insulation:</strong> Portable equipment, Class II symbol ⧈</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between basic and fault protection requirements",
              "Apply ADS systems with correct earthing and device coordination",
              "Specify SELV and PELV for special locations",
              "Select double insulation where protective earthing isn't practical",
              "Understand why FELV is NOT a protective measure",
              "Choose appropriate protection methods for different environments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Basic vs Fault Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Basic vs Fault Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 distinguishes between two fundamental types of protection against electric shock. Both must be present for complete safety—basic protection is the first line of defence, fault protection is the backup.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Protection</p>
                <p className="text-xs text-white/70 mb-2">Prevents contact with live parts during normal operation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Insulation:</strong> Cable and equipment insulation</li>
                  <li><strong>Barriers:</strong> Physical prevention of access</li>
                  <li><strong>Enclosures:</strong> IP-rated equipment housings</li>
                  <li><strong>Positioning:</strong> Placing live parts out of reach</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Protection</p>
                <p className="text-xs text-white/70 mb-2">Activates when basic protection fails</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>ADS:</strong> Automatic disconnection during faults</li>
                  <li><strong>Double insulation:</strong> Second layer if first fails</li>
                  <li><strong>Equipotential bonding:</strong> Reducing potential differences</li>
                  <li><strong>Electrical separation:</strong> Isolating circuits from earth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: Automatic Disconnection of Supply */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Automatic Disconnection of Supply (ADS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ADS is the primary fault protection method in most UK installations. It relies on coordinated operation of earthing systems and protective devices to ensure rapid disconnection during earth faults.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">ADS System Requirements</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Essential Elements:</p>
                  <ul className="text-white/90 space-y-1">
                    <li>• Protective earthing of exposed parts</li>
                    <li>• Main equipotential bonding</li>
                    <li>• Protective conductors (CPCs)</li>
                    <li>• Overcurrent devices (MCBs, fuses, RCDs)</li>
                    <li>• Low earth fault loop impedance (Zs)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Disconnection Times:</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Socket outlets:</strong> 0.4s maximum</li>
                    <li><strong>Fixed equipment:</strong> 5s maximum</li>
                    <li><strong>Distribution circuits:</strong> 5s maximum</li>
                    <li><strong>Special locations:</strong> May require faster</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">TN Systems</p>
                <p className="text-white/90 text-xs">Low Zs allows MCBs to provide ADS</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">TT Systems</p>
                <p className="text-white/90 text-xs">High Ra requires RCD protection</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">IT Systems</p>
                <p className="text-white/90 text-xs">First fault monitored, second disconnects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: SELV and PELV */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Extra-Low Voltage Systems (SELV & PELV)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SELV and PELV provide protection through voltage limitation rather than disconnection. Both limit voltage to ≤50V AC or ≤120V DC, but differ in their earthing arrangements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">SELV (Safety Extra-Low Voltage)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Maximum 50V AC / 120V DC</li>
                  <li>• NO connection to earth</li>
                  <li>• Complete isolation from other circuits</li>
                  <li>• Safety isolating transformer required</li>
                  <li><strong>Use:</strong> Bathrooms, pools, children's areas</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PELV (Protective Extra-Low Voltage)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Maximum 50V AC / 120V DC</li>
                  <li>• Earth connection PERMITTED</li>
                  <li>• Safety isolation still required</li>
                  <li>• Functional earthing allowed</li>
                  <li><strong>Use:</strong> Control systems, instrumentation</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">FELV - NOT a Protective Measure</p>
              <p className="text-sm text-white">
                Functional Extra-Low Voltage (FELV) operates at ELV but lacks safety isolation. It may be derived from autotransformers or have direct mains connection. FELV circuits must have full basic AND fault protection—treat as low voltage.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Double Insulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Double or Reinforced Insulation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class II equipment provides both basic and fault protection through two independent insulation layers, eliminating the need for protective earthing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Double Insulation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Basic insulation:</strong> Primary protection layer</li>
                  <li><strong>Supplementary insulation:</strong> Independent second layer</li>
                  <li>• No single point failure</li>
                  <li>• No earth terminal on equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reinforced Insulation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Single enhanced layer</li>
                  <li>• Equivalent to double insulation</li>
                  <li>• Higher voltage withstand</li>
                  <li>• Same protection level</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recognition and Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• Look for Class II symbol ⧈ (double square)</li>
                <li>• No earth terminal on equipment</li>
                <li>• Insulation resistance testing required</li>
                <li>• No earth continuity test needed</li>
                <li>• Visual inspection for insulation damage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-elec-yellow mb-3">Children's Play Centre Lighting Design</h3>
            <p className="text-sm text-white mb-3">
              A new soft play centre requires low-level lighting in areas accessible to young children. Risk assessment identifies potential contact with lighting equipment during play activities.
            </p>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Design Solution:</p>
              <p className="text-sm text-white">
                12V SELV lighting system using safety isolating transformers located outside the play area. Even if a child contacts the lighting circuit, the 12V SELV supply cannot cause electric shock, and complete isolation from 230V mains ensures safety.
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
              <p className="font-medium text-elec-yellow mb-1">Protection Methods</p>
              <ul className="space-y-0.5 text-white/90">
                <li>ADS: Most common, requires low Zs</li>
                <li>SELV: ≤50V AC, no earth, highest safety</li>
                <li>PELV: ≤50V AC, earth permitted</li>
                <li>Double insulation: Class II, no earth needed</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Key Disconnection Times</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Socket outlets: 0.4s (TN systems)</li>
                <li>Fixed equipment: 5s maximum</li>
                <li>Distribution: 5s maximum</li>
                <li>Special locations: Often faster</li>
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
            <Link to="../bs7671-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../bs7671-module-4-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section1;
