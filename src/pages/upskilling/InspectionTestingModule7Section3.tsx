import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Three-Phase Rotation Testing - Module 7 Section 3";
const DESCRIPTION = "Learn to verify correct phase sequence (rotation) on three-phase supplies to ensure motors and equipment rotate in the correct direction.";

const quickCheckQuestions = [
  {
    id: "pump-no-flow",
    question: "A centrifugal pump motor runs but produces no water flow. Could phase rotation be the cause?",
    options: [
      "No - if the motor runs, rotation is correct",
      "Yes - the pump impeller may be spinning backwards",
      "Only if the pump is new",
      "Phase rotation doesn't affect pumps"
    ],
    correctIndex: 1,
    explanation: "Yes. If the phase rotation is reversed, the pump impeller spins backwards, unable to create the centrifugal force needed to move water. The pump appears to run but produces no flow or very low pressure."
  },
  {
    id: "motor-correction",
    question: "If phase rotation is wrong at a single motor but correct at the main board, where should the correction be made?",
    options: [
      "At the main distribution board",
      "At the DNO supply",
      "At the motor terminals or local isolator",
      "No correction is possible"
    ],
    correctIndex: 2,
    explanation: "At the motor terminals or the local isolator. The fault is in the final wiring to that motor, so correcting at the motor/isolator fixes it without affecting other equipment on the correct supply."
  },
  {
    id: "eicr-rotation",
    question: "During an EICR, phase rotation is found to be reversed at the main intake. What observation code applies?",
    options: [
      "Code C3 - improvement recommended",
      "Code C2 - potentially dangerous",
      "Code C1 - danger present",
      "No code - not an EICR item"
    ],
    correctIndex: 1,
    explanation: "Code C2 (potentially dangerous). Reversed phase rotation at the intake affects all three-phase equipment downstream. This requires urgent attention to prevent damage to motors and machinery."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is phase rotation (phase sequence)?",
    options: [
      "The speed at which AC voltage alternates",
      "The order in which the three phases reach their peak voltage",
      "The angle between voltage and current",
      "The number of phases in a supply"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation refers to the sequence (order) in which the three phases (L1, L2, L3) reach their positive peak voltage - typically measured as clockwise (positive) or anti-clockwise (negative)."
  },
  {
    id: 2,
    question: "What is the standard (correct) phase sequence in the UK?",
    options: [
      "L3, L2, L1 (anti-clockwise)",
      "L1, L2, L3 (clockwise)",
      "L1, L3, L2",
      "Phase sequence varies by region"
    ],
    correctAnswer: 1,
    explanation: "The standard phase sequence in the UK is L1, L2, L3 in clockwise rotation. This is the 'positive' sequence that three-phase motors and equipment are designed for."
  },
  {
    id: 3,
    question: "What is the primary consequence of incorrect phase rotation on a three-phase motor?",
    options: [
      "The motor runs slower",
      "The motor runs in reverse direction",
      "The motor draws more current",
      "The motor won't start"
    ],
    correctAnswer: 1,
    explanation: "Incorrect phase rotation causes three-phase induction motors to run in the opposite (reverse) direction. This can be dangerous for machinery like fans, pumps, or conveyors."
  },
  {
    id: 4,
    question: "A phase rotation tester shows 'negative' or 'reverse' sequence. What does this indicate?",
    options: [
      "Two phases have been swapped",
      "The supply voltage is too low",
      "There is a phase-to-earth fault",
      "The neutral is disconnected"
    ],
    correctAnswer: 0,
    explanation: "A negative/reverse sequence indicates two of the three phases have been swapped somewhere in the installation, reversing the rotation direction from the standard L1-L2-L3 sequence."
  },
  {
    id: 5,
    question: "How do you correct reverse phase rotation?",
    options: [
      "Reconnect all three phases in reverse order",
      "Swap any two of the three phases",
      "Add a phase rotation relay",
      "Install a larger motor"
    ],
    correctAnswer: 1,
    explanation: "Swapping any two phases will reverse the rotation direction. If the sequence is wrong, swapping any pair (e.g., L1 with L2) will correct it to the proper sequence."
  },
  {
    id: 6,
    question: "Where should phase rotation be verified?",
    options: [
      "Only at the main switchboard",
      "At the main incoming supply and at three-phase outlets/equipment",
      "Only at motor terminals",
      "Phase rotation doesn't need verification"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation should be verified at the incoming supply and at three-phase outlets or equipment terminals, as wiring errors can occur at any point in the distribution system."
  },
  {
    id: 7,
    question: "What type of equipment could be damaged by reverse rotation?",
    options: [
      "Lighting circuits",
      "Single-phase heating elements",
      "Centrifugal pumps and compressors",
      "Resistive loads"
    ],
    correctAnswer: 2,
    explanation: "Centrifugal pumps, compressors, fans, and similar rotating equipment can be damaged if run in reverse. Pumps may lose prime, and some machinery has direction-specific lubrication systems."
  },
  {
    id: 8,
    question: "A phase rotation indicator has connections labelled L1, L2, L3. How should it be connected?",
    options: [
      "Connect to any phases in any order",
      "Connect L1 to L1, L2 to L2, L3 to L3 of the supply",
      "Only connect L1 and L3",
      "Connect through CTs"
    ],
    correctAnswer: 1,
    explanation: "Connect the tester's L1, L2, L3 terminals to the corresponding supply phases. The tester then indicates whether the sequence matches the correct L1-L2-L3 rotation."
  },
  {
    id: 9,
    question: "Phase rotation testing is part of which category of tests in BS 7671?",
    options: [
      "Dead testing",
      "Live testing",
      "Functional testing",
      "Insulation testing"
    ],
    correctAnswer: 2,
    explanation: "Phase rotation testing is a functional test as it verifies the correct operation of the three-phase supply. It requires the supply to be energised."
  },
  {
    id: 10,
    question: "What safety precaution is essential during phase rotation testing?",
    options: [
      "Wear hearing protection",
      "Test equipment must be rated for the voltage and proved functional",
      "Circuit must be isolated",
      "All loads must be connected"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation testing is performed live, so the test equipment must be rated for the system voltage and proved functional before and after use using a proving unit."
  }
];

const faqs = [
  {
    question: "Why does phase rotation matter for motors?",
    answer: "Three-phase induction motors develop a rotating magnetic field based on the phase sequence. The direction of this field determines motor rotation. Incorrect sequence reverses the field direction, making the motor run backwards - potentially dangerous for connected machinery."
  },
  {
    question: "Can phase rotation be wrong at individual outlets but correct at the main board?",
    answer: "Yes. Wiring errors at any point (sub-mains, distribution boards, final connections) can cause phase reversal at specific locations while the main supply sequence remains correct. This is why testing at multiple points is important."
  },
  {
    question: "Do all three-phase loads require correct phase rotation?",
    answer: "Motors and direction-sensitive equipment require correct rotation. However, resistive loads (heaters) and some electronic equipment with internal rectification are not affected by phase sequence - they work regardless of rotation direction."
  },
  {
    question: "What does a phase rotation relay do?",
    answer: "A phase rotation relay monitors phase sequence and prevents equipment starting if rotation is incorrect. It's a protective device used on critical machinery. However, it should not be used as a substitute for correct installation - the wiring should be corrected."
  },
  {
    question: "How often should phase rotation be checked?",
    answer: "Phase rotation should be verified during initial verification of any three-phase installation and after any work that involves disconnecting and reconnecting three-phase supplies. During periodic inspection, it should be checked at outlets and equipment terminals."
  },
  {
    question: "Can single-phase loads be affected by phase rotation issues?",
    answer: "No. Single-phase loads only use one phase and neutral, so phase rotation is irrelevant. However, if phase identification is incorrect (wrong phase marked as L1), this can cause issues with load balancing and monitoring systems."
  }
];

const InspectionTestingModule7Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Three-Phase Rotation Testing
          </h1>
          <p className="text-white/80">
            Verify correct phase sequence for motors and equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Correct:</strong> L1-L2-L3 (clockwise rotation)</li>
              <li><strong>Wrong:</strong> Causes motors to run backwards</li>
              <li><strong>Fix:</strong> Swap any two phases to correct</li>
              <li><strong>Test:</strong> Live functional test at 400V</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Motor running wrong direction, pump no flow</li>
              <li><strong>Use:</strong> Phase rotation tester (proved functional)</li>
              <li><strong>Apply:</strong> Test at intake AND at equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the importance of correct phase rotation",
              "Use phase rotation testers correctly",
              "Identify consequences of incorrect rotation",
              "Apply testing to motor installations",
              "Verify rotation at three-phase outlets",
              "Document phase sequence results"
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

        {/* Section 1: Understanding Phase Rotation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Phase Rotation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a three-phase supply, the three phases (L1, L2, L3) each carry alternating current
              that peaks at different times, 120 degrees apart. Phase rotation (or phase sequence) describes
              the order in which these peaks occur.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400 mb-2">Clockwise (Positive) - CORRECT</p>
                <p className="text-sm text-white/90">L1 then L2 then L3 then L1...</p>
                <p className="text-xs text-white/60 mt-1">Standard UK sequence</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400 mb-2">Anti-clockwise (Negative) - REVERSED</p>
                <p className="text-sm text-white/90">L1 then L3 then L2 then L1...</p>
                <p className="text-xs text-white/60 mt-1">Two phases have been swapped</p>
              </div>
            </div>

            <p>
              Three-phase induction motors create a rotating magnetic field based on this sequence.
              The field rotation direction determines which way the motor shaft rotates.
            </p>
          </div>
        </section>

        {/* Section 2: Consequences of Wrong Rotation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Consequences of Wrong Rotation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Incorrect phase rotation can have serious consequences for motor-driven equipment:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Hazards</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Pumps:</strong> Run dry, lose prime, cavitation damage</li>
                <li><strong>Fans:</strong> Incorrect airflow direction, reduced efficiency</li>
                <li><strong>Compressors:</strong> Damage to valves and bearings</li>
                <li><strong>Conveyors:</strong> Material moves wrong direction</li>
                <li><strong>Lifts:</strong> Direction indicator mismatch (safety hazard)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Phase Rotation Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Phase Rotation Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A phase rotation tester (phase sequence indicator) is used to verify correct rotation.
              This is a live test requiring appropriate safety precautions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 1</p>
                  <p className="text-white/90 text-xs">Verify tester is rated for system voltage (400V+)</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 2</p>
                  <p className="text-white/90 text-xs">Prove tester functional using proving unit</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 3</p>
                  <p className="text-white/90 text-xs">Connect L1, L2, L3 leads to corresponding phases</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 4</p>
                  <p className="text-white/90 text-xs">Read indication (clockwise/anti-clockwise or +/-)</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 5</p>
                  <p className="text-white/90 text-xs">Re-prove tester after use</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Safety:</strong> This is live testing at 400V. Use appropriate PPE,
              follow safe working procedures, and ensure adequate clearances.
            </p>
          </div>
        </section>

        {/* Section 4: Correcting Phase Rotation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Correcting Phase Rotation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              If phase rotation is incorrect, the solution is simple: swap any two phases.
              This reverses the rotation direction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400 mb-2">Before (Wrong)</p>
                <p className="text-sm font-mono text-white/90">L1 - L3 - L2 (anti-clockwise)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400 mb-2">After (Correct)</p>
                <p className="text-sm font-mono text-white/90">L1 - L2 - L3 (clockwise)</p>
                <p className="text-xs text-white/60 mt-1">Swapped L2 and L3</p>
              </div>
            </div>

            <p>
              The correction should be made at the most appropriate point - either at the main
              distribution board or at the specific outlet/equipment affected, depending on
              where the error originated.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Phase Identification (UK Colours) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Phase Identification (UK Colours)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UK harmonised cable colours for three-phase installations:
            </p>

            <div className="space-y-3 my-6">
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-amber-700 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">BROWN - L1</span>
                  <p className="text-white/60 text-sm">Phase 1 (was Red)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gray-900 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">BLACK - L2</span>
                  <p className="text-white/60 text-sm">Phase 2 (was Yellow)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gray-500 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">GREY - L3</span>
                  <p className="text-white/60 text-sm">Phase 3 (was Blue)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-blue-600 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">BLUE - N</span>
                  <p className="text-white/60 text-sm">Neutral (was Black)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Recording and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phase rotation verification should be documented on electrical installation
              certificates and inspection reports:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record phase rotation at incoming supply</li>
                <li>Note rotation at three-phase outlets/equipment</li>
                <li>Confirm clockwise/positive sequence</li>
                <li>Record any corrections made</li>
              </ul>
            </div>

            <p>
              The Schedule of Inspections includes a check for phase sequence.
              Mark as satisfactory if correct L1-L2-L3 sequence, or as requiring
              attention if reversed.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check at Multiple Points</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test rotation at incoming AND at critical equipment</li>
                <li>Don't assume - errors can occur at any distribution point</li>
                <li>Verify after any three-phase reconnection work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Direction Arrow</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Many motors have a direction arrow on the shaft or fan cover</li>
                <li>Verify it matches intended operation</li>
                <li>Check manufacturer's documentation for required direction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Running motors backward briefly</strong> - damage can occur instantly</li>
                <li><strong>Assuming DNO supply is always correct</strong> - verify it</li>
                <li><strong>Forgetting to re-prove the tester</strong> - essential safety step</li>
                <li><strong>Working live without proper PPE</strong> - 400V is lethal</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Three-Phase Colours</p>
                <ul className="space-y-0.5">
                  <li>L1 = Brown (was Red)</li>
                  <li>L2 = Black (was Yellow)</li>
                  <li>L3 = Grey (was Blue)</li>
                  <li>N = Blue (was Black)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Phase-neutral = 230V</li>
                  <li>Phase-phase = 400V</li>
                  <li>Correct sequence = L1-L2-L3</li>
                  <li>Fix = Swap any 2 phases</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule7Section3;
