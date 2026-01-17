import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polarity Testing Methods - Module 7 Section 1";
const DESCRIPTION = "Master polarity testing techniques to verify correct connection of line, neutral and protective conductors throughout electrical installations.";

const quickCheckQuestions = [
  {
    id: "polarity-switch",
    question: "Why must single-pole switches be connected in the line conductor?",
    options: [
      "To save cable costs",
      "So the load is dead when switched off",
      "To improve circuit efficiency",
      "For better dimming control"
    ],
    correctIndex: 1,
    explanation: "If the switch was in neutral, the line would remain connected to the load, creating a shock hazard even with the switch off."
  },
  {
    id: "polarity-continuity",
    question: "During a polarity test, continuity is found between the line terminal at the CU and the neutral socket of a socket outlet. What does this indicate?",
    options: [
      "Correct wiring",
      "A broken neutral",
      "Reversed polarity - dangerous condition",
      "Normal for radial circuits"
    ],
    correctIndex: 2,
    explanation: "This indicates reversed polarity - the line conductor at the CU is connected to the neutral terminal at the socket. This is a dangerous condition requiring immediate rectification."
  },
  {
    id: "polarity-eicr",
    question: "What observation code should be assigned on an EICR for reversed polarity at a socket outlet?",
    options: [
      "Code C3 - improvement recommended",
      "Code C2 - potentially dangerous",
      "Code C1 - danger present",
      "Code FI - further investigation"
    ],
    correctIndex: 2,
    explanation: "Code C1 (danger present) - reversed polarity creates immediate risk of electric shock as equipment may remain live when apparently isolated. Immediate remedial action is required."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of polarity testing?",
    options: [
      "To measure voltage levels",
      "To verify line, neutral, and CPC are correctly connected throughout",
      "To test insulation resistance",
      "To verify earth electrode resistance"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing confirms that line, neutral, and circuit protective conductors are correctly connected at all points, ensuring safe operation and proper protective device function."
  },
  {
    id: 2,
    question: "Single-pole switches must be connected in which conductor?",
    options: [
      "Neutral conductor",
      "Line conductor",
      "Circuit protective conductor",
      "Either line or neutral"
    ],
    correctAnswer: 1,
    explanation: "Single-pole switches must always be connected in the line conductor. If connected in neutral, the circuit would remain live when switched off, creating a serious shock hazard."
  },
  {
    id: 3,
    question: "What instrument is commonly used for polarity testing on de-energised circuits?",
    options: [
      "Clamp meter",
      "Low-resistance ohmmeter (continuity tester)",
      "Insulation resistance tester",
      "Power quality analyser"
    ],
    correctAnswer: 1,
    explanation: "A low-resistance ohmmeter (continuity tester) is used on de-energised circuits to verify correct connections between known reference points and circuit conductors."
  },
  {
    id: 4,
    question: "When testing polarity on a lighting circuit with the switch open, continuity between L and the lamp should be:",
    options: [
      "Zero ohms",
      "Open circuit (infinite)",
      "Approximately 1 ohm",
      "High resistance (megohms)"
    ],
    correctAnswer: 1,
    explanation: "With the switch open (off), there should be no continuity between line at the origin and the lamp terminal, proving the switch is correctly connected in the line conductor."
  },
  {
    id: 5,
    question: "At a socket outlet, the line terminal is marked with which letter?",
    options: [
      "N",
      "E",
      "L",
      "P"
    ],
    correctAnswer: 2,
    explanation: "Socket outlet terminals are marked L (line), N (neutral), and E or the earth symbol for the protective conductor."
  },
  {
    id: 6,
    question: "What is the consequence of reversed polarity at a socket outlet?",
    options: [
      "Equipment won't work",
      "The fuse protects the wrong conductor, making disconnection unsafe",
      "Voltage will be doubled",
      "No consequence - polarity doesn't matter for AC"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity means the fuse/switch is in the neutral, so equipment remains live even when the fuse blows or switch is off, creating a serious shock hazard."
  },
  {
    id: 7,
    question: "In a radial circuit, polarity should be verified at:",
    options: [
      "Only the first and last socket",
      "Only the consumer unit",
      "Every socket outlet and switch",
      "Randomly selected points"
    ],
    correctAnswer: 2,
    explanation: "Polarity must be verified at all points in the circuit including every socket outlet, switch, and accessory, as wiring errors can occur at any point."
  },
  {
    id: 8,
    question: "Which conductor should be identified by a BROWN sleeve or marking?",
    options: [
      "Neutral",
      "Line",
      "Circuit protective conductor",
      "Earth"
    ],
    correctAnswer: 1,
    explanation: "Brown identifies the line conductor. Blue is neutral, and green/yellow stripes identify the protective conductor (CPC)."
  },
  {
    id: 9,
    question: "For an Edison screw (ES) lamp holder, correct polarity requires the outer contact to be connected to:",
    options: [
      "Line conductor",
      "Neutral conductor",
      "Earth conductor",
      "Either line or neutral"
    ],
    correctAnswer: 1,
    explanation: "For Edison screw lamp holders, the outer screwed contact must be neutral and the centre contact must be line, reducing shock risk when changing lamps."
  },
  {
    id: 10,
    question: "What does a live polarity tester indicate?",
    options: [
      "Continuity between conductors",
      "Insulation condition",
      "Which conductor is line when circuit is energised",
      "Earth fault loop impedance"
    ],
    correctAnswer: 2,
    explanation: "A live polarity tester (socket tester or voltage indicator with phase indication) identifies which conductor is line when the circuit is energised, without needing to isolate."
  }
];

const faqs = [
  {
    question: "Why is polarity testing so important?",
    answer: "Incorrect polarity creates serious safety hazards. If a single-pole switch is in the neutral conductor, the circuit remains live even when switched off. If socket polarity is reversed, equipment fuses disconnect the neutral, leaving equipment live. These errors can cause fatal electric shocks."
  },
  {
    question: "Can I use a socket tester to verify polarity?",
    answer: "Socket testers provide a quick indication of polarity and common wiring faults on energised circuits. However, they have limitations and can miss certain fault conditions. Full polarity verification during initial verification should use continuity testing from known reference points."
  },
  {
    question: "Does polarity matter for AC circuits?",
    answer: "Yes, absolutely. While AC voltage alternates, correct polarity ensures protective devices (fuses, MCBs) and single-pole switches are in the line conductor. This is essential for safe isolation and protection. Reversed polarity is a serious defect requiring immediate rectification."
  },
  {
    question: "How do I test polarity on a lighting circuit?",
    answer: "With the circuit isolated and switch off, test continuity from the line conductor at the origin to the switch common terminal, then from the switch switched terminal to the lamp holder line terminal. With the switch on, continuity should exist from origin line to lamp line terminal."
  },
  {
    question: "What faults can a socket tester detect?",
    answer: "Most socket testers can detect: line-neutral reversal, line-earth reversal, missing earth, missing neutral, and missing line. However, they cannot detect a bootleg earth (neutral connected to earth terminal) or confirm CPC continuity back to the origin."
  },
  {
    question: "Is polarity testing required at every socket on an EICR?",
    answer: "Yes. Regulation 643.8 requires polarity to be verified at the point of utilisation (every outlet) and at switchgear devices to confirm single-pole devices are in the line conductor. This applies to both initial verification and periodic inspection."
  }
];

const InspectionTestingModule7Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-5">
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
            <span>Module 7 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Polarity Testing Methods
          </h1>
          <p className="text-white/80">
            Verify correct connection of line, neutral and protective conductors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Rule:</strong> Single-pole switches must be in LINE only</li>
              <li><strong>Check:</strong> Verify polarity at EVERY socket and switch</li>
              <li><strong>Danger:</strong> Reversed polarity = C1 dangerous condition</li>
              <li><strong>Method:</strong> Continuity from CU to each outlet terminal</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Brown=Line, Blue=Neutral, G/Y=CPC</li>
              <li><strong>Use:</strong> Long wandering lead for efficient testing</li>
              <li><strong>Apply:</strong> Test L→L, N→N, E→E from CU to outlet</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the importance of correct polarity",
              "Use appropriate instruments for polarity verification",
              "Apply different polarity testing methods",
              "Identify consequences of reversed polarity",
              "Document polarity test results correctly",
              "Verify polarity at all relevant locations"
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

        {/* Section 1: Why Polarity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Polarity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct polarity is fundamental to electrical safety. While AC voltage alternates direction,
              the protection system relies on switches and protective devices being in specific conductors
              to function safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Dangers of Reversed Polarity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment remains live when switched "off"</li>
                <li>Fuses protect the neutral - equipment stays live when fuse blows</li>
                <li>Edison screw lamp holders expose live metal during lamp changes</li>
                <li>Risk of fatal electric shock</li>
              </ul>
            </div>

            <p>
              Reversed polarity is classified as a C1 (danger present) condition on an EICR,
              requiring immediate remedial action before the installation can be safely used.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: What to Verify */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What to Verify
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 643.8 requires verification that polarity is correct at every location.
              This includes:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Points Requiring Polarity Verification</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single-pole devices are in the line conductor</li>
                <li>Centre contact of ES lamp holders is connected to line</li>
                <li>Socket outlets have correct L, N, E connections</li>
                <li>All accessories correctly wired</li>
                <li>CPCs are correctly identified and connected</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Testing Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              There are two main approaches to polarity testing, each suitable for different situations:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. Continuity Method (De-energised)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Uses low-resistance ohmmeter</li>
                  <li>Requires circuit isolation</li>
                  <li>Confirms actual conductor connections</li>
                  <li>Used during initial verification</li>
                  <li>Most thorough method</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Live Testing Method (Energised)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Uses approved voltage indicators or socket testers</li>
                  <li>Quick verification of energised circuits</li>
                  <li>Useful during periodic inspection</li>
                  <li>Socket testers show common faults</li>
                  <li>Has some limitations (see FAQs)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Continuity Test Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Continuity Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The preferred method for initial verification uses continuity testing from known reference points:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Socket Outlet Polarity Test</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 1</p>
                  <p className="text-white/90 text-xs">Isolate circuit at consumer unit, prove dead</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 2</p>
                  <p className="text-white/90 text-xs">Connect long test lead between line terminal at CU and socket line (L)</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 3</p>
                  <p className="text-white/90 text-xs">Verify low resistance (continuity) exists</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 4</p>
                  <p className="text-white/90 text-xs">Repeat for neutral (N) and earth (E) terminals</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 5</p>
                  <p className="text-white/90 text-xs">Confirm no continuity between wrong terminals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Conductor Identification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Conductor Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct identification of conductors using harmonised colours:
            </p>

            <div className="space-y-3 my-6">
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-amber-700 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">BROWN</span>
                  <p className="text-white/60 text-sm">Line conductor (L)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-blue-600 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">BLUE</span>
                  <p className="text-white/60 text-sm">Neutral conductor (N)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 border-2 border-white/20" />
                <div>
                  <span className="text-white font-semibold">GREEN/YELLOW</span>
                  <p className="text-white/60 text-sm">Protective conductor (CPC)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Old colours:</strong> Installations pre-2006 may use Red (L), Black (N).
              The CPC has always been green/yellow.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Recording Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity verification must be recorded on the Schedule of Test Results.
              The result is recorded as either a tick for correct polarity or a cross for incorrect.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Every circuit requires polarity confirmation</li>
                <li>Record for all outlets on each circuit</li>
                <li>EICR: Code C1 for reversed polarity (danger)</li>
                <li>Method of verification should be noted</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Systematically</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work through each circuit methodically</li>
                <li>Don't skip outlets - test every one</li>
                <li>Mark tested sockets to avoid re-testing</li>
                <li>Use a long wandering lead for efficiency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">What to Look For</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Continuity between correct terminals only</li>
                <li>Open circuit between wrong terminals</li>
                <li>Switch open = no continuity to lamp centre</li>
                <li>Switch closed = continuity to lamp centre</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trusting colours alone</strong> - always test, wiring errors happen</li>
                <li><strong>Skipping sockets</strong> - errors can occur at any point</li>
                <li><strong>Not testing switches</strong> - verify they break the line</li>
                <li><strong>Forgetting ES lamp holders</strong> - outer must be neutral</li>
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
                <p className="font-medium text-white mb-1">Conductor Colours</p>
                <ul className="space-y-0.5">
                  <li>Line = Brown (was Red)</li>
                  <li>Neutral = Blue (was Black)</li>
                  <li>CPC = Green/Yellow (unchanged)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Switch in Line only</li>
                  <li>ES centre = Line</li>
                  <li>Test every outlet</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule7Section1;
