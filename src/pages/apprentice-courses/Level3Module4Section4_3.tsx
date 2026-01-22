/**
 * Level 3 Module 4 Section 4.3 - Polarity Checks
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polarity Checks - Level 3 Module 4 Section 4.3";
const DESCRIPTION = "Learn essential polarity verification techniques per BS 7671:2018, including testing methods for socket outlets, lighting circuits, and single-pole devices.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why must single-pole switches, fuses, and circuit breakers be installed in the line conductor only?",
    options: [
      "To comply with colour coding requirements",
      "To ensure the circuit can be safely isolated and equipment is dead when switched off",
      "To reduce cable costs",
      "To allow easier testing"
    ],
    correctIndex: 1,
    explanation: "Single-pole devices must be in the line conductor so that when switched off, the equipment is truly isolated from the dangerous live supply. If installed in the neutral, the equipment would remain live even when switched off, creating a serious shock hazard."
  },
  {
    id: "check-2",
    question: "For Edison screw (ES) lampholders, which part must be connected to the line conductor?",
    options: [
      "The outer threaded metal shell",
      "The centre contact only",
      "Either connection is acceptable",
      "The metal fixing bracket"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 559.4.3 requires the centre contact of ES lampholders to be connected to the line conductor, and the outer threaded shell to neutral. This minimises shock risk when changing lamps, as the exposed screw thread remains at neutral potential."
  },
  {
    id: "check-3",
    question: "What is the consequence of reversed polarity at a BS 1363 socket outlet?",
    options: [
      "Equipment will not work",
      "The fuse in a plug will not protect the appliance correctly",
      "Equipment will work but may be dangerous - live and neutral are swapped",
      "The socket will overheat"
    ],
    correctIndex: 2,
    explanation: "With reversed polarity, equipment may appear to work normally, but the single-pole switch in the appliance (if present) will be in the neutral instead of the line. The appliance internal components remain live even when switched off. This is a serious hazard requiring immediate correction."
  },
  {
    id: "check-4",
    question: "During polarity testing using the R1+R2 method, what are you actually measuring?",
    options: [
      "The voltage between line and earth",
      "The resistance between line and CPC at the test point",
      "The insulation resistance",
      "The current flow through the circuit"
    ],
    correctIndex: 1,
    explanation: "The R1+R2 test (from the ring circuit Figure 8 test or wander lead method) measures resistance between line and CPC. If this reading is correct and consistent, it confirms the line conductor is connected to the correct terminal and the CPC is properly connected - thus verifying polarity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A socket outlet tester shows correct polarity, but when you open the socket you find the brown wire connected to the neutral terminal. What has happened?",
    options: [
      "The tester is faulty",
      "Someone has used the wrong colour cable for the circuit",
      "The polarity error is actually upstream of the socket",
      "This is acceptable as long as it is documented"
    ],
    correctAnswer: 2,
    explanation: "If the tester shows correct but colours are wrong at the socket, the polarity error is likely at the origin (consumer unit or junction box) where the conductors were incorrectly connected. The entire circuit must be investigated to find where the error occurred."
  },
  {
    id: 2,
    question: "When checking polarity at a lighting point, you find the switch is in the neutral conductor. What classification does this receive on an EICR?",
    options: [
      "C3 - Improvement recommended",
      "C2 - Potentially dangerous",
      "C1 - Danger present, risk of injury",
      "FI - Further investigation required"
    ],
    correctAnswer: 1,
    explanation: "A switch in the neutral is a C2 (potentially dangerous) defect. While there is no immediate danger if nothing is touched, someone changing a lamp could receive a shock because the lampholder remains live. This requires urgent remedial action."
  },
  {
    id: 3,
    question: "What is the correct polarity for a BS 1363 socket outlet when looking at the face?",
    options: [
      "Line on left, neutral on right, earth at top",
      "Line on right, neutral on left, earth at top",
      "Line at top, neutral on left, earth on right",
      "Any arrangement is acceptable"
    ],
    correctAnswer: 1,
    explanation: "BS 1363 specifies line (L) on the right, neutral (N) on the left, and earth (E) at the top when looking at the socket face. This standardisation ensures plug-in equipment operates safely and consistently."
  },
  {
    id: 4,
    question: "You are testing polarity on a two-way lighting circuit. At what points should polarity be verified?",
    options: [
      "Only at the consumer unit",
      "At the consumer unit and each lampholder",
      "Only at the lampholders",
      "Only at the light switch"
    ],
    correctAnswer: 1,
    explanation: "Polarity must be correct at both the origin (consumer unit) and each lampholder. The strapper wires between two-way switches may transpose colours, so checking at the consumer unit alone does not guarantee correct lampholder polarity."
  },
  {
    id: 5,
    question: "A simple socket tester shows all three indicator lights green. Can you certify the polarity as correct?",
    options: [
      "Yes - three green lights confirms correct polarity",
      "No - socket testers only indicate probable polarity and have limitations",
      "Yes - if the tester is certified and calibrated",
      "No - only visual inspection can confirm polarity"
    ],
    correctAnswer: 1,
    explanation: "Socket testers have limitations - they cannot detect all wiring faults (e.g., reversed L and N with E connected to both, or some cross-wiring configurations). BS 7671 requires polarity verification by testing - socket testers are indicative only and should not replace proper instrument testing."
  },
  {
    id: 6,
    question: "Why is polarity particularly important for RCD-protected circuits?",
    options: [
      "RCDs only work with correct polarity",
      "Reversed polarity can cause nuisance tripping",
      "RCDs work regardless of polarity, but connected equipment may be unsafe",
      "Reversed polarity will damage the RCD"
    ],
    correctAnswer: 2,
    explanation: "RCDs detect current imbalance between L and N regardless of which is which - they will still provide earth fault protection. However, equipment downstream with single-pole switching would have switches in the neutral, leaving equipment live when switched off."
  },
  {
    id: 7,
    question: "When testing a radial circuit using the wander lead method, what test confirms correct polarity?",
    options: [
      "Testing voltage between L and N",
      "Testing continuity between the line at the origin and the line terminal at each point",
      "Testing insulation resistance between L and E",
      "Testing the trip time of the MCB"
    ],
    correctAnswer: 1,
    explanation: "The wander lead method involves linking the line and CPC at the consumer unit, then testing continuity at each point between line and earth terminals. If continuity exists, it confirms the line conductor runs correctly from origin to the line terminal at the test point - verifying polarity."
  },
  {
    id: 8,
    question: "During initial verification, you find a double-pole switch correctly interrupts both line and neutral. Is polarity still important?",
    options: [
      "No - double-pole switching makes polarity irrelevant",
      "Yes - correct polarity is still required for fuses and other single-pole devices in the circuit",
      "No - both conductors are equally dangerous",
      "Yes - but only for three-phase installations"
    ],
    correctAnswer: 1,
    explanation: "Even with double-pole switching at the local control point, the circuit will have single-pole protection (MCB or fuse) at the consumer unit. This must be in the line conductor. Polarity remains essential for safe circuit protection and isolation."
  },
  {
    id: 9,
    question: "A three-phase motor has been connected with two phases transposed. What effect does this have?",
    options: [
      "The motor will not run",
      "The motor will run in the reverse direction",
      "The motor will overheat immediately",
      "There will be no noticeable effect"
    ],
    correctAnswer: 1,
    explanation: "Swapping any two phases on a three-phase motor reverses the rotating magnetic field direction, causing the motor to run backwards. This is dangerous for some machinery. Phase sequence must be checked on three-phase installations - separate from single-phase polarity testing."
  },
  {
    id: 10,
    question: "You find an installation where the supply intake has L and N transposed by the DNO. How should this be addressed?",
    options: [
      "Transpose the conductors at the consumer unit to compensate",
      "Contact the DNO to correct the supply polarity",
      "Accept it and document the non-standard arrangement",
      "Install a double-pole main switch and ignore it"
    ],
    correctAnswer: 1,
    explanation: "Supply polarity errors are the DNO's responsibility and must be reported to them for correction. Never compensate for supply polarity errors within the installation - this creates confusion and could be dangerous if the supply is later corrected."
  },
  {
    id: 11,
    question: "What additional polarity consideration applies to shaver supply units?",
    options: [
      "They are SELV so polarity does not apply",
      "The isolation transformer secondary has no polarity requirement",
      "The primary (mains) side must have correct polarity with line through the switch",
      "They must have double-pole isolation"
    ],
    correctAnswer: 2,
    explanation: "Shaver supply units contain an isolation transformer. The primary (mains input) side must have correct polarity with any switch in the line conductor. The secondary (shaver outlet) is isolated and has no defined polarity. The switch requirement protects anyone working on the unit."
  },
  {
    id: 12,
    question: "During polarity verification of a ring final circuit using the Figure 8 test, what result indicates a polarity error?",
    options: [
      "All sockets showing the same R1+R2 value",
      "One socket showing a much higher R1+R2 value than others",
      "The end-to-end readings for L and N being different",
      "Unable to obtain a reading between L and E at a socket"
    ],
    correctAnswer: 3,
    explanation: "If you cannot measure R1+R2 (L-E) at a socket during the Figure 8 test, but can measure L-N, this indicates the CPC is not connected to the earth terminal - potentially a polarity error where conductors are on wrong terminals. Investigate and correct before proceeding."
  }
];

const faqs = [
  {
    question: "Can reversed polarity damage equipment?",
    answer: "Most modern equipment is designed to work regardless of polarity at the plug, but safety is compromised. Equipment with single-pole switches will have the switch in neutral, leaving internal components live when 'off'. Some electronic equipment may malfunction or behave unexpectedly. The main risk is to persons, not equipment."
  },
  {
    question: "How do I test polarity on a circuit where I cannot access the consumer unit?",
    answer: "You can use a voltage tester to identify live conductors, or test between known earth points (bonded metalwork) and circuit conductors. However, for proper certification you need access to the origin to perform continuity tests that definitively confirm polarity. Restricted access should be recorded as a limitation."
  },
  {
    question: "Does the ring circuit test automatically verify polarity?",
    answer: "Yes - the Figure 8 ring circuit test verifies polarity at each test point. When you measure R1+R2 between L and E terminals after cross-connecting at the consumer unit, obtaining the expected reading confirms the line conductor reaches the line terminal and CPC reaches the earth terminal at that point."
  },
  {
    question: "Why do some plug-in socket testers show 'correct' when there is actually a fault?",
    answer: "Socket testers work by energising indicator lamps between different terminals. Certain fault combinations can produce the same lamp indications as correct wiring. For example, if neutral and earth are both connected to neutral, some testers will show correct. They are screening tools, not definitive test instruments."
  },
  {
    question: "Is polarity testing required on SELV circuits?",
    answer: "SELV circuits by definition have no earth reference, so the concept of polarity (live vs neutral) does not apply in the same way. However, where SELV circuits have specific positive and negative supplies, or where equipment requires correct connection orientation, this should be verified as part of functional testing."
  },
  {
    question: "What about polarity in DC installations like solar PV?",
    answer: "DC polarity (positive and negative) is critical in PV and other DC installations. Reversed DC polarity can damage inverters, batteries, and other components. DC polarity must be verified before commissioning using appropriate DC-rated test equipment. This is separate from AC polarity testing."
  }
];

const Level3Module4Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Requirement:</strong> Single-pole devices in line only</li>
              <li><strong>Socket:</strong> L=right, N=left, E=top (looking at face)</li>
              <li><strong>ES lampholder:</strong> Centre contact = Line</li>
              <li><strong>Method:</strong> Continuity testing confirms polarity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wrong colour at terminal = investigate upstream</li>
              <li><strong>Spot:</strong> No L-E reading = check terminations</li>
              <li><strong>Use:</strong> Figure 8 test confirms ring polarity</li>
              <li><strong>Use:</strong> Wander lead method for radials</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Why Polarity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Polarity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity verification ensures that line and neutral conductors are connected to the correct terminals throughout an installation. This is not merely a matter of convention - it is fundamental to electrical safety. The line conductor is the dangerous one, carrying the full supply voltage. Neutral is connected to earth at the supply transformer, so under normal conditions should be at or near earth potential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Regulation 132.14.1 requires polarity verification to confirm:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single-pole switching devices are in the line conductor only</li>
                <li>Socket outlets are correctly wired (L, N, E in correct positions)</li>
                <li>Centre contacts of ES lampholders are connected to line</li>
                <li>All protective devices (fuses, MCBs) are in the line conductor</li>
              </ul>
            </div>

            <p>
              When a single-pole switch is in the neutral instead of the line, the equipment appears to switch off but remains connected to the dangerous live supply. Anyone touching internal components (when changing a lamp, for example) could receive a fatal shock even though the switch is "off". This is why polarity errors are classified as dangerous defects.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Reversed polarity allows equipment to work but creates a hidden danger. The circuit appears normal until someone is shocked. This makes polarity verification during inspection and testing essential - the danger is not obvious in everyday use.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Testing Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Polarity Testing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity is verified using continuity testing, not voltage testing. While voltage tests can indicate which conductor is live, continuity tests provide definitive proof that the correct conductor from the origin reaches the correct terminal at each point.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Circuit (Figure 8 Method)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cross-connect L1-N2 and N1-L2 at origin</li>
                  <li>Cross-connect E1-E2 at origin</li>
                  <li>Measure L-E at each socket outlet</li>
                  <li>Reading confirms L reaches L terminal</li>
                  <li>Reading confirms E reaches E terminal</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radial Circuit (Wander Lead Method)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Link L and CPC at consumer unit</li>
                  <li>Use long lead to reach test points</li>
                  <li>Measure between L and E at each point</li>
                  <li>Reading = R1+R2, confirms polarity</li>
                  <li>No reading = incorrect termination</li>
                </ul>
              </div>
            </div>

            <p>
              Both methods work on the same principle: by connecting line and earth at the origin, continuity between L and E terminals at any point confirms both conductors are correctly connected. The measured value should match expected R1+R2 based on conductor length and size.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a radial socket circuit with wander lead. At the consumer unit, you link the line conductor to the CPC. At each socket, you test between line and earth terminals. If the reading is consistent with R1+R2, polarity is confirmed. If no reading, check the terminations at that socket.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Specific Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Specific Polarity Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of equipment and accessories have specific polarity requirements. Understanding these ensures correct verification at each type of outlet or termination point.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Socket outlets (BS 1363):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Line (brown) - Right terminal (looking at face)</li>
                <li>Neutral (blue) - Left terminal (looking at face)</li>
                <li>Earth (green/yellow) - Top terminal (earth pin is longest)</li>
                <li>This arrangement is mandatory - no exceptions</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">ES Lampholders</p>
                <p className="text-white/90 text-xs">Centre contact = Line, Outer shell = Neutral (Reg 559.4.3)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Single-pole Switches</p>
                <p className="text-white/90 text-xs">Must be in line conductor, never in neutral (Reg 132.14.1)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Fused Spurs</p>
                <p className="text-white/90 text-xs">Fuse must be in line conductor to protect correctly</p>
              </div>
            </div>

            <p>
              For Edison screw lampholders, the requirement to connect line to the centre contact and neutral to the outer shell is specifically to protect against shock when changing lamps. The outer threaded shell, which is touched when screwing in a lamp, should be at neutral (near earth) potential.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> BS lampholders (bayonet cap, UK standard) do not have the same exposed metal contact issue as ES, but correct polarity is still required at the switched live to ensure the switch is in the line conductor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Consequences and Classification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Consequences and EICR Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity errors are serious safety defects that require immediate attention. The classification on an EICR depends on the specific location and nature of the error, but reversed polarity is never acceptable and always requires correction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EICR Classification of polarity defects:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>C1 (Danger present):</strong> Immediate risk - e.g., exposed live parts due to polarity error, or ES lampholder with shell live</li>
                <li><strong>C2 (Potentially dangerous):</strong> Most polarity errors - switches in neutral, reversed socket outlet polarity, incorrect lampholder wiring</li>
                <li><strong>FI (Further investigation):</strong> Where polarity testing was not possible, or results are inconclusive</li>
              </ul>
            </div>

            <p>
              The key consideration is the level of risk to users. A reversed socket outlet is C2 because equipment will work but with safety compromised - someone servicing plugged-in equipment could be at risk. An ES lampholder with live shell might be C1 if the risk of touching it during lamp replacement is imminent.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> During periodic inspection, you find a socket outlet with reversed polarity. A computer is plugged in and working normally. You classify this as C2 - potentially dangerous. The homeowner is advised that the socket must be corrected urgently as any servicing of connected equipment with the socket left on could result in shock.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Socket Tester Limitations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Socket testers are indicative only - they cannot detect all fault conditions</li>
                <li>They work by illuminating lamps between terminals - some fault combinations produce false correct indications</li>
                <li>Use as a screening tool only - do not rely on them for certification</li>
                <li>Always verify polarity using proper continuity testing methods</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Colours Do Not Match</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If conductor colours at a point do not match expected colours, trace the error upstream</li>
                <li>The error may be at the consumer unit, junction box, or previous accessory</li>
                <li>Document where the error was found and where it was corrected</li>
                <li>Re-test the entire circuit after correction to confirm correct polarity throughout</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Relying on socket testers</strong> - They are screening tools only, not definitive test instruments</li>
                <li><strong>Assuming colour = polarity</strong> - Check the origin; cables could be cross-connected at a junction</li>
                <li><strong>Ignoring two-way circuits</strong> - Strappers may transpose colours; check at lampholders specifically</li>
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
                <p className="font-medium text-white mb-1">Socket Outlet (looking at face)</p>
                <ul className="space-y-0.5">
                  <li>Right terminal = Line (brown)</li>
                  <li>Left terminal = Neutral (blue)</li>
                  <li>Top terminal = Earth (green/yellow)</li>
                  <li>BS 1363 - no variation permitted</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>132.14.1 - Single-pole in line only</li>
                  <li>559.4.3 - ES lampholder requirements</li>
                  <li>643.6 - Polarity verification required</li>
                  <li>Appendix 6 - Test result recording</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Continuity and Insulation Resistance Testing
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section4-4">
              Next: Earth Fault Loop Impedance Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section4_3;
