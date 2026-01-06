/**
 * Level 3 Module 5 Section 3.3 - Polarity Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polarity Testing - Level 3 Module 5 Section 3.3";
const DESCRIPTION = "Learn polarity verification procedures to ensure correct connection of line, neutral and protective conductors throughout electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is correct polarity essential in electrical installations?",
    options: [
      "Only for equipment warranty purposes",
      "To ensure single-pole devices break the line conductor and protective devices function correctly",
      "It's only important for three-phase systems",
      "Polarity only matters for socket outlets"
    ],
    correctIndex: 1,
    explanation: "Correct polarity ensures that single-pole switches and fuses break the line (live) conductor - the one at dangerous potential. If neutral is switched instead, the equipment could remain live even with the switch off, creating an electric shock hazard."
  },
  {
    id: "check-2",
    question: "During a polarity test on a socket outlet, which connection should be verified?",
    options: [
      "Only that earth is connected",
      "That L is top right, N is top left, and E is bottom centre",
      "That line is correctly connected to the switched terminal",
      "Only that neutral is connected"
    ],
    correctIndex: 2,
    explanation: "For BS 1363 socket outlets, the critical polarity check is that line is connected to the terminal that is controlled by the protective device - the bottom right position (when viewed from the front). This ensures the socket can be safely isolated by the circuit MCB."
  },
  {
    id: "check-3",
    question: "At a ceiling rose, which terminal should the line conductor be connected to?",
    options: [
      "Any terminal is acceptable",
      "The loop-in terminal that feeds through to the switch",
      "The neutral terminal",
      "The earth terminal"
    ],
    correctIndex: 1,
    explanation: "At a ceiling rose, line should be connected to the loop-in terminal. From there, the switch wire takes live to the switch and returns on the switch return. This arrangement ensures the switch breaks the line conductor, not neutral."
  },
  {
    id: "check-4",
    question: "What test instrument reading indicates correct polarity between line and neutral?",
    options: [
      "0 volts",
      "Approximately 230V AC",
      "500V DC",
      "Infinity"
    ],
    correctIndex: 1,
    explanation: "A voltage reading of approximately 230V AC between line and neutral confirms the supply is connected with correct polarity. No voltage would indicate either reversed polarity, no supply, or an open circuit. This is a 'live' polarity test."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, polarity must be verified at which points?",
    options: [
      "Only at socket outlets",
      "At the origin and at all points of utilisation",
      "Only at the distribution board",
      "At every junction box"
    ],
    correctAnswer: 1,
    explanation: "Regulation 612.6 requires polarity to be verified at the origin of the installation and at each point of utilisation. This includes socket outlets, light fittings, fixed appliance connections, and any other point where equipment connects to the supply."
  },
  {
    id: 2,
    question: "If a two-way lighting circuit is wired with incorrect polarity, what is the potential hazard?",
    options: [
      "The lights won't work",
      "The lamp holder may remain live when the switch is off",
      "The circuit breaker will trip",
      "No hazard - two-way circuits don't need polarity checking"
    ],
    correctAnswer: 1,
    explanation: "If polarity is reversed on a two-way lighting circuit, the switch may break the neutral conductor instead of line. The lamp holder would then remain live even with the switch off, creating an electric shock hazard when changing bulbs."
  },
  {
    id: 3,
    question: "During dead testing, how can polarity be verified at a socket outlet?",
    options: [
      "It cannot - polarity must be tested live",
      "Using a continuity test from the distribution board",
      "By visual inspection only",
      "Using insulation resistance testing"
    ],
    correctAnswer: 1,
    explanation: "Polarity can be verified dead by using continuity testing. With the circuit isolated, link line to earth at the DB, then test at the socket - a low reading between L and E terminals confirms correct polarity. The wandering lead method can also confirm CPC continuity."
  },
  {
    id: 4,
    question: "What is the purpose of the Edison screw (ES) lamp holder regulation regarding polarity?",
    options: [
      "To ensure efficient lamp operation",
      "To ensure the outer screw contact is connected to neutral, reducing shock risk",
      "To prevent lamp failure",
      "Edison screw holders don't require polarity consideration"
    ],
    correctAnswer: 1,
    explanation: "Regulation 559.4.1 requires that for Edison screw (E14, E27) lamp holders, the outer screw contact must be connected to neutral. This is because the outer contact is more accessible and connecting it to neutral reduces the risk of shock when handling the lamp."
  },
  {
    id: 5,
    question: "At a fused connection unit (FCU), correct polarity means:",
    options: [
      "The fuse can be in either line or neutral",
      "The fuse is in the line conductor",
      "The fuse is in the neutral conductor",
      "Polarity doesn't apply to FCUs"
    ],
    correctAnswer: 1,
    explanation: "At an FCU, the internal fuse must be in the line conductor to provide overcurrent protection. If wired with reversed polarity, the fuse would be in neutral - the equipment would not be properly protected and could remain live even if the fuse blows."
  },
  {
    id: 6,
    question: "When testing polarity at a lighting point with the supply on, what reading between line (switch return) and earth indicates correct polarity?",
    options: [
      "0V with switch off, 230V with switch on",
      "230V with switch off, 0V with switch on",
      "230V regardless of switch position",
      "0V regardless of switch position"
    ],
    correctAnswer: 0,
    explanation: "With correct polarity and switch OFF, the switch return (going to the lamp) should show 0V. With switch ON, it should show 230V (or close to it under load). This confirms the switch is breaking the line conductor."
  },
  {
    id: 7,
    question: "A three-phase installation requires polarity verification. What additional check is needed compared to single-phase?",
    options: [
      "No additional checks needed",
      "Phase rotation (phase sequence) must also be verified",
      "Only the neutral polarity needs checking",
      "Three-phase doesn't require polarity testing"
    ],
    correctAnswer: 1,
    explanation: "For three-phase installations, in addition to checking that each phase is correctly connected, phase rotation (sequence L1-L2-L3) must be verified. Incorrect phase rotation can cause three-phase motors to run backwards and other equipment to malfunction."
  },
  {
    id: 8,
    question: "What could cause a socket outlet polarity test to show line and neutral reversed?",
    options: [
      "A tripped RCD",
      "Conductor transposition at termination points",
      "Low insulation resistance",
      "A blown fuse"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity is caused by transposition (swapping) of line and neutral conductors at one or more termination points. This could occur at the socket itself, at a junction box, or even at the distribution board. Careful termination and checking prevents this."
  },
  {
    id: 9,
    question: "The 'wander lead' method for polarity testing involves:",
    options: [
      "Moving a single test lead around the installation",
      "Connecting line to CPC at DB and testing at each point",
      "Testing with the supply energised",
      "Using a high voltage test"
    ],
    correctAnswer: 1,
    explanation: "The wander lead method links line and CPC together at the distribution board with the circuit isolated. A long lead connects to the earth bar. At each outlet, testing between L terminal and the wander lead gives R1+R2 and simultaneously confirms correct polarity if a low reading is obtained."
  },
  {
    id: 10,
    question: "If polarity is found to be reversed at one socket on a ring final circuit, what is the likely cause?",
    options: [
      "The whole ring is incorrectly wired",
      "A wiring error at that specific socket",
      "A fault at the distribution board",
      "The socket is faulty and needs replacing"
    ],
    correctAnswer: 1,
    explanation: "If only one socket shows reversed polarity while others are correct, the error is localised to that socket. The line and neutral conductors have been transposed at that termination point. The socket needs to be rewired correctly, not replaced."
  },
  {
    id: 11,
    question: "An approved voltage indicator can be used for polarity testing. What should be checked before use?",
    options: [
      "Only that the batteries are charged",
      "Prove it works on a known live source before and after testing",
      "Nothing - approved indicators are always reliable",
      "Only the calibration date"
    ],
    correctAnswer: 1,
    explanation: "Before and after using a voltage indicator, you must prove it on a known live source (proving unit). This confirms the indicator is functioning correctly. A faulty indicator could give false readings, leading to incorrect polarity assessment or dangerous assumptions about isolation."
  },
  {
    id: 12,
    question: "According to BS 7671, which conductor should single-pole switching devices be connected in?",
    options: [
      "The neutral conductor",
      "The protective conductor",
      "The line conductor only",
      "Either line or neutral"
    ],
    correctAnswer: 2,
    explanation: "Regulation 537.2.2.1 requires that single-pole switching devices must be connected in the line conductor only. This ensures that when the switch is open, the load side of the circuit is at neutral potential rather than remaining at line voltage."
  }
];

const faqs = [
  {
    question: "Can polarity be tested as part of the R1+R2 continuity test?",
    answer: "Yes - the long lead method for R1+R2 testing simultaneously verifies polarity. By linking line and CPC at the DB and testing at each point, you confirm both continuity of the protective conductor AND that line is correctly connected to the L terminal."
  },
  {
    question: "What if live polarity testing shows line and neutral are both live to earth?",
    answer: "This is normal - both line and neutral will show voltage to earth (line approximately 230V, neutral typically 0-5V due to load and N-E link at origin). What matters is that line shows significantly higher voltage than neutral, and they are in their correct positions."
  },
  {
    question: "Do I need to test polarity at every socket on a ring circuit?",
    answer: "Yes - polarity should be verified at every point of utilisation. A wiring error at any individual socket would not be detected by testing only at selected points. The R1+R2 ring circuit test at each socket confirms polarity if using the cross-connection method."
  },
  {
    question: "How do I identify line and neutral conductors in older installations?",
    answer: "In older installations, colours may be red/black (pre-2006). Red is line, black is neutral. In older flex, brown/blue is the same as current harmonised colours. For three-phase pre-2006: red L1, yellow L2, blue L3. Always verify by testing - never assume based on colour alone."
  },
  {
    question: "What if a lighting circuit has old wiring colours and I can't identify which is line?",
    answer: "Test with supply on using a voltage indicator. The conductor showing 230V to earth is line. With supply off, continuity from DB line terminal will confirm. Remember older switch wires may be black with a line sleeve - this is a switched line return."
  },
  {
    question: "Is polarity testing required for equipment with double insulation?",
    answer: "Yes - polarity testing is still required. Even Class II (double insulated) equipment benefits from correct polarity for switched single-pole devices within the equipment. Additionally, the socket or connection point must have correct polarity regardless of what's plugged into it."
  }
];

const Level3Module5Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Polarity Testing
          </h1>
          <p className="text-white/80">
            Verifying correct connection of line, neutral and protective conductors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Switches must break line, not neutral</li>
              <li><strong>Method:</strong> Dead test via continuity, or live voltage</li>
              <li><strong>Socket outlets:</strong> L = bottom right, N = bottom left</li>
              <li><strong>Edison screw:</strong> Outer contact must be neutral</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Regulation</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reg 612.6:</strong> Polarity verification required</li>
              <li><strong>Reg 537.2.2.1:</strong> Single-pole in line only</li>
              <li><strong>Reg 559.4.1:</strong> ES lamp holder polarity</li>
              <li><strong>Where:</strong> Origin and every point of use</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand why correct polarity is essential for safety",
              "Perform dead polarity tests using continuity methods",
              "Verify polarity with live testing where appropriate",
              "Identify polarity requirements for different accessories",
              "Detect and diagnose reversed polarity faults",
              "Apply polarity requirements to lighting and socket circuits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Polarity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Polarity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity refers to the correct connection of line, neutral, and protective conductors throughout an installation. Getting polarity wrong can create serious hazards - equipment may appear to be switched off while remaining live, or protective devices may fail to function correctly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Critical polarity requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single-pole switches:</strong> Must break the line conductor only (Reg 537.2.2.1)</li>
                <li><strong>Fuses and MCBs:</strong> Must be in the line conductor to provide protection</li>
                <li><strong>Socket outlets:</strong> Line to correct terminal (switched, protected side)</li>
                <li><strong>Edison screw lamp holders:</strong> Outer contact to neutral (Reg 559.4.1)</li>
                <li><strong>Fused spurs/FCUs:</strong> Fuse in line conductor</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Correct Polarity</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Switch off = circuit dead</li>
                  <li>Fuse blows = load isolated</li>
                  <li>MCB trips = circuit safe</li>
                  <li>Lamp change = safe if switched off</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Reversed Polarity</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Switch off = still live!</li>
                  <li>Fuse in neutral = no protection</li>
                  <li>Live equipment = shock hazard</li>
                  <li>Lamp holder = live when changing</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Reversed polarity is a serious defect. Even if equipment 'works', the installation is unsafe. This is typically classified as C2 on an EICR - potentially dangerous.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Dead Testing Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dead Testing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity can be verified as part of continuity testing with the supply isolated. This is the preferred method during initial verification as it's done before the installation is energised. The wander lead method is particularly effective as it simultaneously tests R1+R2 continuity and polarity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wander lead method for polarity:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Isolate supply and prove dead</li>
                <li><strong>Step 2:</strong> Link line and CPC together at distribution board</li>
                <li><strong>Step 3:</strong> Connect long test lead to the earth bar</li>
                <li><strong>Step 4:</strong> At each socket/outlet, test between L terminal and wander lead</li>
                <li><strong>Step 5:</strong> A low reading confirms continuity AND correct polarity</li>
                <li><strong>Step 6:</strong> No reading or high reading = polarity fault or continuity issue</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alternative dead test methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Direct continuity:</strong> Test from DB line terminal to each outlet L terminal</li>
                <li><strong>As part of ring test:</strong> Figure-of-eight method verifies polarity at each socket</li>
                <li><strong>Point-to-point:</strong> Trace conductors with continuity from origin to outlet</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> For lighting circuits, you can temporarily link the switch to the 'on' position to include the lamp holder in dead testing. Don't forget to reset switches afterwards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Live Testing Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Live Testing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live polarity testing uses a voltage indicator or socket tester with the supply energised. This method is commonly used for periodic inspection or to verify polarity after energisation. Always use approved test instruments and prove them before and after use.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Socket Testers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Plug-in devices show L-N-E status</li>
                  <li>LED patterns indicate faults</li>
                  <li>Quick check for reversed polarity</li>
                  <li>Does NOT verify earth continuity fully</li>
                  <li>Use as indication, not definitive test</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test L-N should show ~230V</li>
                  <li>Test L-E should show ~230V</li>
                  <li>Test N-E typically less than 5V</li>
                  <li>Prove before and after with known source</li>
                  <li>Use GS38 compliant probes</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Live polarity test at lighting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Remove lamp and test at lamp holder terminals</li>
                <li>With switch OFF: L terminal to earth should read ~0V</li>
                <li>With switch ON: L terminal to earth should read ~230V</li>
                <li>This confirms switch is breaking line, not neutral</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety:</strong> Live testing requires extra care. Use one hand where possible. Stand on insulating material. Use approved voltage indicators with GS38 compliant leads. Never assume dead based on a switch position.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Specific Polarity Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Specific Polarity Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different accessories and circuits have specific polarity requirements. Understanding these ensures correct installation and verification. Pay particular attention to Edison screw lamp holders and any accessories with internal fuses.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Socket outlets (BS 1363):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Line:</strong> Bottom right (viewed from front)</li>
                <li><strong>Neutral:</strong> Bottom left (viewed from front)</li>
                <li><strong>Earth:</strong> Top centre (longest pin position)</li>
                <li>Shutters on L and N open by earth pin insertion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lighting circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ceiling rose:</strong> Loop in terminal for line, switch wire arrangement</li>
                <li><strong>Edison screw (ES):</strong> Outer contact = neutral, centre contact = line (after switch)</li>
                <li><strong>Bayonet cap (BC):</strong> No specific polarity requirement (both contacts similar)</li>
                <li><strong>Two-way switching:</strong> Common terminal takes permanent line</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fused connection units:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Internal fuse MUST be in line conductor</li>
                <li>Switched FCU - switch in line, load side</li>
                <li>Check both supply (IN) and load (OUT) terminals</li>
                <li>Reversed polarity = fuse in neutral = no protection</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> For three-phase installations, verify phase rotation in addition to polarity. Incorrect phase rotation causes motors to run backwards. Use a phase rotation tester.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Socket Outlets</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dead test: L-CPC link at DB, test L terminal at socket</li>
                <li>Live test: Approved socket tester or voltage indicator</li>
                <li>Check all sockets - one error is common</li>
                <li>Remember socket testers give indication only</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Lighting Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check both ceiling rose and lamp holder</li>
                <li>Verify switch wire arrangement at ceiling rose</li>
                <li>For ES holders, check outer contact is to neutral</li>
                <li>Two-way circuits - test in both switch positions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Polarity Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>L-N transposed at socket:</strong> Live on wrong terminal</li>
                <li><strong>Switch in neutral:</strong> Lamp holder remains live</li>
                <li><strong>FCU reversed:</strong> Fuse in neutral conductor</li>
                <li><strong>ES holder reversed:</strong> Live outer contact</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Requirements</p>
                <ul className="space-y-0.5">
                  <li>Reg 612.6 - Polarity verification</li>
                  <li>Reg 537.2.2.1 - Single-pole in line only</li>
                  <li>Reg 559.4.1 - ES lamp holder polarity</li>
                  <li>Test at origin and all utilisation points</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 1363 Socket Orientation</p>
                <ul className="space-y-0.5">
                  <li>Earth: Top centre (longest pin)</li>
                  <li>Line: Bottom right (looking at front)</li>
                  <li>Neutral: Bottom left (looking at front)</li>
                  <li>All shuttered with earth opening shutter</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section3-3-4">
              Next: Earth Fault Loop Impedance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section3_3;
