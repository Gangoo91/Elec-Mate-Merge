import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Single-Phase Polarity Verification - Module 7 Section 2";
const DESCRIPTION = "Learn detailed techniques for verifying polarity on single-phase circuits including sockets, lighting, and switches in domestic and commercial installations.";

const quickCheckQuestions = [
  {
    id: "switch-off-test",
    question: "With the light switch OFF, you test from CU line to the lamp holder centre contact and find continuity. What does this indicate?",
    options: [
      "Correct wiring - the lamp is ready",
      "The bulb is faulty",
      "The switch is incorrectly wired in the neutral conductor",
      "Normal for two-way switching"
    ],
    correctIndex: 2,
    explanation: "The switch is incorrectly wired in the neutral conductor. The lamp holder remains live when switched off - this is a dangerous condition requiring immediate rectification."
  },
  {
    id: "fcu-switch-off",
    question: "At a switched FCU with the switch OFF, should there be continuity between the supply line and the load line terminals?",
    options: [
      "Yes, always",
      "Only if the fuse is fitted",
      "No - the switch should break the line path",
      "Depends on the load type"
    ],
    correctIndex: 2,
    explanation: "With the switch OFF, the internal switch (in series with the fuse) should break the line path, so there should be no continuity between supply and load line terminals."
  },
  {
    id: "radial-fault",
    question: "Three socket outlets on a radial circuit all show reversed polarity, but sockets nearer the CU are correct. Where is the fault likely to be?",
    options: [
      "At the consumer unit",
      "In each individual socket",
      "In a junction box or last correct socket",
      "At the main isolator"
    ],
    correctIndex: 2,
    explanation: "The fault is likely in a junction box or the last correctly wired socket, where all cables for the affected section join. The L and N conductors have been crossed at that point, affecting all downstream outlets."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When testing socket outlet polarity with a continuity tester, which terminals should show continuity to their respective CU terminals?",
    options: [
      "Only line and neutral",
      "Only line and earth",
      "Line, neutral, and earth to their respective terminals",
      "Any terminals - they're interchangeable"
    ],
    correctAnswer: 2,
    explanation: "Each socket terminal (L, N, E) must show continuity only to its corresponding terminal at the consumer unit, confirming correct wiring throughout."
  },
  {
    id: 2,
    question: "On a lighting circuit with the switch OFF, testing between line at CU and the lamp holder centre contact should show:",
    options: [
      "Continuity (low resistance)",
      "Open circuit (no continuity)",
      "High resistance (megohms)",
      "Voltage present"
    ],
    correctAnswer: 1,
    explanation: "With the switch off, the circuit is broken, so no continuity should exist between line at CU and the lamp holder. This proves the switch is in the line conductor."
  },
  {
    id: 3,
    question: "A two-way lighting circuit has polarity correct when:",
    options: [
      "Either switch can control the light",
      "The common terminal of each switch is in the line or switched live respectively",
      "Both switches are in the neutral",
      "Only one switch works at a time"
    ],
    correctAnswer: 1,
    explanation: "For correct two-way polarity, the line feeds the common terminal of one switch, and the common terminal of the second switch feeds the lamp. Strappers connect the L1 and L2 terminals."
  },
  {
    id: 4,
    question: "Testing polarity at a switched fused connection unit (FCU), the switch should break:",
    options: [
      "The neutral conductor only",
      "The line conductor only",
      "Both line and neutral",
      "The earth conductor"
    ],
    correctAnswer: 1,
    explanation: "Like all single-pole switches, the switch in an FCU must break the line conductor only. The neutral passes straight through."
  },
  {
    id: 5,
    question: "At a cooker control unit with socket, correct polarity means:",
    options: [
      "The neon indicator lights when switched on",
      "Both socket and cooker outlet have correct L, N, E, and switch is in line",
      "The socket works independently of the switch",
      "The cooker can be isolated"
    ],
    correctAnswer: 1,
    explanation: "Correct polarity requires the socket and cooker outlet both have correct L, N, and E connections, with the switch controlling the line to the cooker circuit."
  },
  {
    id: 6,
    question: "When using a socket tester, a typical indication for correct wiring is:",
    options: [
      "All three LEDs lit",
      "Specific LED pattern as per manufacturer's chart",
      "No LEDs lit",
      "Buzzer sounds"
    ],
    correctAnswer: 1,
    explanation: "Socket testers use LED patterns to indicate wiring status. The correct pattern varies by manufacturer but typically shows two LEDs for correct wiring. Always refer to the device's indication chart."
  },
  {
    id: 7,
    question: "Testing polarity at a ceiling rose for a pendant lamp, the line should connect to:",
    options: [
      "The outer sleeve contact of the lamp holder",
      "The centre contact of the lamp holder (via switch)",
      "Directly to the lamp holder earth terminal",
      "The neutral terminal of the ceiling rose"
    ],
    correctAnswer: 1,
    explanation: "The switched line should connect to the centre contact of the lamp holder (the safest contact when changing lamps), while neutral connects to the outer sleeve."
  },
  {
    id: 8,
    question: "A ring final circuit has 12 socket outlets. Polarity testing requires checking:",
    options: [
      "Just the first and last sockets",
      "Random selection of 3 sockets",
      "All 12 socket outlets",
      "Only sockets near the consumer unit"
    ],
    correctAnswer: 2,
    explanation: "Polarity must be verified at every point of utilisation. All 12 sockets must be tested as wiring errors can occur at any point in the circuit."
  },
  {
    id: 9,
    question: "Which test should be performed BEFORE polarity testing on a circuit?",
    options: [
      "Insulation resistance",
      "RCD testing",
      "Safe isolation and proving dead",
      "Earth fault loop impedance"
    ],
    correctAnswer: 2,
    explanation: "Safe isolation must be performed and the circuit proved dead before any continuity-based polarity testing. This is a fundamental safety requirement."
  },
  {
    id: 10,
    question: "A bathroom shaver socket has isolation transformer. Correct polarity means:",
    options: [
      "Line connects to the primary winding",
      "The socket is earthed",
      "Both outlets show 240V",
      "There is no polarity requirement due to isolation"
    ],
    correctAnswer: 0,
    explanation: "Even with an isolation transformer, the supply-side polarity must be correct with line feeding the primary through any switch, ensuring proper isolation when switched off."
  }
];

const faqs = [
  {
    question: "How do I test polarity on a two-way switched lighting circuit?",
    answer: "Test that the line at CU connects to the common terminal of the first switch. With both switches in one position, verify continuity from the second switch common terminal to the lamp centre contact. The strappers (L1 and L2) should interconnect both switches regardless of switch positions."
  },
  {
    question: "Can I use the R1+R2 test to verify polarity?",
    answer: "Yes, the R1+R2 test inherently verifies polarity if performed correctly. By testing continuity between line at the origin and the line terminal at each socket (with a link at the CU), you confirm the line conductor runs to the correct terminal throughout."
  },
  {
    question: "What if I find reversed polarity at a single socket on a ring circuit?",
    answer: "This indicates incorrect wiring at that specific socket - the line and neutral conductors have been swapped at that accessory. The socket must be rewired correctly. Check how the fault occurred to identify if other points need verification."
  },
  {
    question: "Do I need to test polarity at junction boxes?",
    answer: "Junction boxes themselves don't have polarity requirements, but any switches or outlets fed from them do. You must verify that line conductors continue correctly through junction boxes to their destinations."
  },
  {
    question: "How should polarity be tested on a circuit with intermediate switches?",
    answer: "Verify the line at CU connects to one two-way switch common. With all switches in the correct positions, there should be continuity through the strappers, intermediates, to the second two-way switch common, and to the lamp centre contact."
  },
  {
    question: "What's the most common cause of polarity errors?",
    answer: "Incorrect termination at accessories - connecting brown to N terminal and blue to L terminal. This often happens due to rushing, poor lighting, or confusion with old colour codes. Always double-check connections before replacing faceplates."
  }
];

const InspectionTestingModule7Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 7 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Single-Phase Polarity Verification
          </h1>
          <p className="text-white/80">
            Detailed techniques for socket outlets, lighting circuits, and switches
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sockets:</strong> Test every socket - L to L, N to N, E to E</li>
              <li><strong>Switch OFF:</strong> No continuity from CU line to lamp centre</li>
              <li><strong>Switch ON:</strong> Continuity from CU line to lamp centre</li>
              <li><strong>Always:</strong> Isolate and prove dead before testing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wrong terminal connections at accessories</li>
              <li><strong>Use:</strong> Long wandering lead from CU</li>
              <li><strong>Apply:</strong> Combine with R1+R2 testing for efficiency</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Verify polarity at socket outlet circuits",
              "Test polarity on lighting circuits with switches",
              "Apply testing to domestic installations",
              "Extend techniques to commercial environments",
              "Use correct test equipment and methods",
              "Troubleshoot polarity faults"
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

        {/* Section 1: Socket Outlet Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Socket Outlet Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Socket outlets require verification that each terminal is connected to the correct conductor
              throughout the circuit. Using a long wandering lead from the consumer unit:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Socket Polarity Test Steps</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 1</p>
                  <p className="text-white/90 text-xs">Isolate circuit, prove dead at each socket</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 2</p>
                  <p className="text-white/90 text-xs">Connect long lead to LINE terminal at CU outgoing</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 3</p>
                  <p className="text-white/90 text-xs">At socket: test to L terminal - should show continuity</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 4</p>
                  <p className="text-white/90 text-xs">Test to N and E - should show NO continuity (open circuit)</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Step 5</p>
                  <p className="text-white/90 text-xs">Repeat for N and E from their respective CU terminals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Lighting Circuit Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lighting Circuit Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting circuits must verify that the switch is in the line conductor,
              ensuring the lamp holder is dead when switched off:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switch OFF</p>
                <p className="text-sm text-white/90">CU Line to Lamp centre = OPEN (no continuity)</p>
                <p className="text-xs text-white/60 mt-1">Proves switch is breaking the line</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switch ON</p>
                <p className="text-sm text-white/90">CU Line to Lamp centre = CONTINUITY</p>
                <p className="text-xs text-white/60 mt-1">Complete path through switch to lamp</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Continuity</p>
              <p className="text-sm text-white/90">
                CU Neutral to Lamp outer sleeve = CONTINUITY (always, regardless of switch position)
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Two-Way Switching */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Two-Way Switching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two-way lighting circuits require careful polarity verification to ensure
              the line feeds through both switches correctly:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Way Circuit Polarity</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switch 1 COM:</strong> Receives permanent line from CU</li>
                <li><strong>Switch 1 L1 and L2:</strong> Connect to switch 2 L1 and L2 (strappers)</li>
                <li><strong>Switch 2 COM:</strong> Supplies switched line to lamp</li>
                <li><strong>Neutral:</strong> Direct to lamp (not through switches)</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Testing tip:</strong> When testing two-way circuits, you may need to operate
              switches to different positions to verify all connections.
            </p>
          </div>
        </section>

        {/* Section 4: Switched FCUs and Cooker Outlets */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Switched FCUs and Cooker Outlets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fused connection units and cooker control outlets have internal switches
              that must be verified for correct polarity:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switched FCU Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Supply L to L IN terminal</li>
                  <li>L OUT to load (through fuse and switch)</li>
                  <li>N passes straight through to load</li>
                  <li>E continuous through to load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooker Control Unit</p>
                <p className="text-sm text-white/90">
                  Verify the cooker switch breaks the line conductor to both the cooker outlet
                  and any integrated socket. The socket should have correct individual polarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Ring Final Circuit Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Ring Final Circuit Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits require polarity verification at every socket outlet,
              as errors can occur at any point in the ring:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Circuit Polarity Test Strategy</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test every socket on the ring</li>
                <li>Include all spurs and their outlets</li>
                <li>R1+R2 test inherently checks polarity if done correctly</li>
                <li>Cross-reference with ring continuity test results</li>
              </ul>
            </div>

            <p>
              Remember that a broken ring can still have correct polarity at individual sockets.
              Polarity testing and ring continuity testing are separate verifications.
            </p>
          </div>
        </section>

        {/* Section 6: Troubleshooting Polarity Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Troubleshooting Polarity Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When polarity faults are found, systematic investigation identifies the cause:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-amber-400/80 mb-2">Common Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>L and N reversed at individual accessory</li>
                  <li>Crossed conductors in junction box</li>
                  <li>Wrong connections at CU (rare)</li>
                  <li>Confusion with old/new colour codes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Investigation Steps</p>
                <ol className="text-sm text-white space-y-1 list-decimal list-inside">
                  <li>Check if fault affects single or multiple points</li>
                  <li>If multiple, trace back to common junction</li>
                  <li>Inspect terminations at affected points</li>
                  <li>Check junction boxes upstream</li>
                  <li>Verify CU connections if widespread</li>
                </ol>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Combine with R1+R2</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Perform polarity verification as part of R1+R2 testing for efficiency</li>
                <li>Both tests use the same wandering lead setup</li>
                <li>Records both measurements in one visit to each outlet</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Label As You Go</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mark tested sockets to avoid missing any or re-testing</li>
                <li>Use removable stickers or chalk marks</li>
                <li>Remove marks after testing complete</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming new = correct</strong> - even new installations can have wiring errors</li>
                <li><strong>Testing only a sample</strong> - polarity must be verified at every outlet</li>
                <li><strong>Forgetting the switch test</strong> - verify lighting switches break line</li>
                <li><strong>Not checking FCU outputs</strong> - verify load side polarity too</li>
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
                <p className="font-medium text-white mb-1">Socket Testing</p>
                <ul className="space-y-0.5">
                  <li>L terminal = Brown from CU L</li>
                  <li>N terminal = Blue from CU N</li>
                  <li>E terminal = CPC from CU E</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lighting Testing</p>
                <ul className="space-y-0.5">
                  <li>Switch COM = Line in</li>
                  <li>ES centre = Switched line</li>
                  <li>ES outer = Neutral</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule7Section2;
