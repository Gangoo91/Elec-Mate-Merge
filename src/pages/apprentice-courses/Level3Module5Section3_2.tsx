/**
 * Level 3 Module 5 Section 3.2 - Insulation Resistance Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Insulation Resistance Testing - Level 3 Module 5 Section 3.2";
const DESCRIPTION = "Master insulation resistance testing procedures, test voltages, acceptance criteria and interpretation of results according to BS 7671 Table 6.1.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the minimum acceptable insulation resistance for a 230V circuit according to BS 7671?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "10 megohms"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 6.1 specifies a minimum insulation resistance of 1.0 megohms (1 M-ohm) for circuits with a nominal voltage up to and including 500V. Values significantly higher than this are normally expected in healthy installations."
  },
  {
    id: "check-2",
    question: "What test voltage should be applied for insulation resistance testing on a standard 230V installation?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "230V AC"
    ],
    correctIndex: 1,
    explanation: "For circuits with nominal voltage above 50V and up to 500V (which includes standard 230V installations), BS 7671 specifies a test voltage of 500V DC. This voltage stresses the insulation to reveal any weaknesses."
  },
  {
    id: "check-3",
    question: "Before performing an insulation resistance test, which of the following must be done?",
    options: [
      "Turn on all light switches",
      "Disconnect or isolate surge protection devices and electronic equipment",
      "Connect all neutral conductors together",
      "Remove all circuit breakers from the board"
    ],
    correctIndex: 1,
    explanation: "Surge protection devices (SPDs), electronic equipment, and other voltage-sensitive components can be damaged by the 500V DC test voltage. They must be disconnected before testing. Also disconnect lamps and ensure switches are in the 'on' position to include all wiring."
  },
  {
    id: "check-4",
    question: "A circuit shows an insulation resistance reading of 0.7 megohms. What does this indicate?",
    options: [
      "Acceptable - above the minimum requirement",
      "Marginal - acceptable but should be monitored",
      "Unacceptable - below the minimum of 1 megohm",
      "The test was performed incorrectly"
    ],
    correctIndex: 2,
    explanation: "0.7 megohms is below the minimum 1 megohm requirement of BS 7671 Table 6.1. This indicates degraded insulation that requires investigation and remedial action. The circuit should not be energised until the cause is identified and corrected."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671 Table 6.1, what test voltage is required for SELV circuits (below 50V)?",
    options: [
      "50V DC",
      "250V DC",
      "500V DC",
      "No test required"
    ],
    correctAnswer: 1,
    explanation: "SELV and PELV circuits (up to and including 50V) should be tested at 250V DC. The minimum insulation resistance requirement is 0.5 megohms (500 k-ohms) for these lower voltage circuits."
  },
  {
    id: 2,
    question: "When testing insulation resistance between live conductors and earth, what should be connected together?",
    options: [
      "Nothing - test each conductor individually to earth",
      "Line and neutral conductors linked together, then tested to earth",
      "Line and earth together, then tested to neutral",
      "All protective conductors disconnected"
    ],
    correctAnswer: 1,
    explanation: "For the live-to-earth test, line and neutral are connected together at the distribution board, then the insulation resistance is measured between these linked conductors and earth. This tests both L-E and N-E insulation simultaneously."
  },
  {
    id: 3,
    question: "What happens to insulation resistance readings as temperature increases?",
    options: [
      "Readings increase",
      "Readings decrease",
      "Readings remain the same",
      "Temperature has no effect"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance decreases as temperature increases. For every 10C rise in temperature, insulation resistance roughly halves. This is why very low readings on a cold circuit are concerning - they could become unacceptably low when warm."
  },
  {
    id: 4,
    question: "A new installation tests at 200 megohms on every circuit. What does this indicate?",
    options: [
      "The test instrument is faulty",
      "Excellent insulation condition - typical for new cables",
      "The circuit is open - check connections",
      "Too high - there must be an error"
    ],
    correctAnswer: 1,
    explanation: "New cables typically have insulation resistance in the hundreds of megohms. Values of 200 M-ohm or more are normal for new installations and indicate excellent insulation quality. The 1 M-ohm minimum is a threshold below which action is required."
  },
  {
    id: 5,
    question: "Why should two-way lighting circuits have both switches in the same position during IR testing?",
    options: [
      "To protect the switches from high voltage",
      "To include all wiring in the test",
      "To reduce the test current",
      "It doesn't matter for IR testing"
    ],
    correctAnswer: 1,
    explanation: "With two-way switches in different positions, some of the circuit wiring is disconnected and won't be tested. Both switches should be in the same position (both up or both down) to ensure all conductors are included in the insulation resistance measurement."
  },
  {
    id: 6,
    question: "What is the purpose of the insulation resistance test between line and neutral (L-N)?",
    options: [
      "To check for short circuits only",
      "To verify the insulation between live conductors that could cause short circuits or fire",
      "To measure the cable length",
      "This test is not required"
    ],
    correctAnswer: 1,
    explanation: "The L-N insulation test verifies that insulation between line and neutral conductors is adequate. Poor L-N insulation could cause short circuits, overcurrent, and potentially fire. This test must be done with loads disconnected."
  },
  {
    id: 7,
    question: "During IR testing, you get a reading that slowly increases from 0.5 M-ohms towards 2 M-ohms. What does this suggest?",
    options: [
      "Normal behaviour - insulation is charging",
      "Moisture in the insulation that is drying out",
      "A faulty test instrument",
      "An intermittent short circuit"
    ],
    correctAnswer: 1,
    explanation: "A reading that slowly increases during testing often indicates moisture contamination. As the DC test voltage is applied, it 'dries out' the moisture path, increasing resistance. The installation should be properly dried before re-testing."
  },
  {
    id: 8,
    question: "What precaution should be taken when testing insulation resistance on circuits with capacitors?",
    options: [
      "Use a lower test voltage",
      "Discharge capacitors before and after testing",
      "Capacitors do not affect IR testing",
      "Replace all capacitors before testing"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction capacitors, motor capacitors, and other capacitive elements can retain charge from the DC test voltage. They should be discharged before testing (to get accurate readings) and after testing (for safety). Some test instruments have automatic discharge."
  },
  {
    id: 9,
    question: "What would cause an IR reading between live and earth to show zero or very low resistance?",
    options: [
      "Perfectly good insulation",
      "A direct short circuit or complete insulation breakdown to earth",
      "The test leads are open circuit",
      "The circuit is correctly isolated"
    ],
    correctAnswer: 1,
    explanation: "A zero or very low IR reading indicates a direct path between live and earth - either a short circuit (L-E or N-E contact) or complete insulation breakdown. This is a serious fault requiring immediate investigation before the circuit can be used."
  },
  {
    id: 10,
    question: "For a 400V three-phase installation, what test voltage should be used for insulation resistance testing?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "400V DC"
    ],
    correctAnswer: 1,
    explanation: "400V is within the 'above 50V up to and including 500V' category in BS 7671 Table 6.1, so 500V DC test voltage applies. For circuits above 500V (such as 11kV), 1000V DC test voltage would be required."
  },
  {
    id: 11,
    question: "An older installation shows IR readings of 1.5-2 M-ohms on all circuits. How should this be assessed?",
    options: [
      "Acceptable - above minimum, but monitor at next inspection",
      "Unacceptable - must be rewired immediately",
      "Excellent - well above minimum",
      "Inconclusive - retest required"
    ],
    correctAnswer: 0,
    explanation: "While 1.5-2 M-ohms meets the minimum 1 M-ohm requirement, it is relatively low for typical installations. This suggests aging insulation. The circuits are acceptable but should be monitored at subsequent inspections. Note it in the EICR observations as C3."
  },
  {
    id: 12,
    question: "Before testing, the installation is isolated and proved dead. Why must the main switch also be OFF during IR testing?",
    options: [
      "To protect the test instrument",
      "It doesn't need to be off if supply is isolated",
      "To prevent voltage from the supply being present during testing",
      "To include the main switch insulation in the test"
    ],
    correctAnswer: 2,
    explanation: "Even with the supply isolated at the origin, if the main switch is ON and supply is restored unexpectedly, 230V would be present during your 500V DC test. Always turn the main switch OFF as an additional precaution and to prevent damage to the tester if supply is accidentally restored."
  }
];

const faqs = [
  {
    question: "What happens if I apply 500V DC to electronic equipment?",
    answer: "Electronic equipment can be damaged or destroyed by 500V DC. Always disconnect electronic devices (computers, TVs, smart home devices), disconnect or short out SPDs, and remove any connected equipment before testing. Some items like LED drivers and electronic transformers may also be damaged."
  },
  {
    question: "Why are my IR readings on an old installation lower than on new work?",
    answer: "Insulation degrades over time due to heat cycling, moisture, UV exposure, and general aging. Oil-based PVC insulation in older cables tends to dry out and become brittle. Lower readings (but still above 1 M-ohm) are typical in older installations. Very low readings suggest replacement may be needed."
  },
  {
    question: "Can I test a whole installation at once rather than circuit by circuit?",
    answer: "Testing all circuits together (all MCBs on) gives a composite reading but doesn't identify which circuit has a problem if the reading is low. Best practice is to test each circuit individually. You may do an initial whole-installation test for a quick check, but follow up with individual circuit tests."
  },
  {
    question: "What should I do if one reading is just below 1 M-ohm?",
    answer: "A reading just below 1 M-ohm (e.g., 0.8-0.9 M-ohm) is technically non-compliant. Investigate the cause - it could be moisture, contamination, damaged insulation, or connected equipment. Disconnect any loads and retest. If still low, the circuit needs remedial work before being put into service."
  },
  {
    question: "How long should I apply the test voltage before reading the result?",
    answer: "Apply the test voltage for long enough to get a stable reading - typically 5-10 seconds. If the reading is slowly increasing (indicating moisture), wait for it to stabilise or note the final reading. Very large installations with significant cable capacitance may take longer to stabilise."
  },
  {
    question: "Do I need to test between phases on a three-phase installation?",
    answer: "Yes - test all combinations: L1-L2, L2-L3, L1-L3, and each phase to neutral. Then test all live conductors together to earth. This ensures insulation is adequate between all conductors, not just to earth. Record each reading on the schedule of test results."
  }
];

const Level3Module5Section3_2 = () => {
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
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
            <span>Module 5.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insulation Resistance Testing
          </h1>
          <p className="text-white/80">
            Test voltages, procedures, and acceptance criteria for insulation integrity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test voltage:</strong> 500V DC for 230/400V circuits</li>
              <li><strong>Minimum IR:</strong> 1.0 megohm (1 M-ohm)</li>
              <li><strong>New circuits:</strong> Expect 200+ megohms</li>
              <li><strong>Low readings:</strong> Investigate before energising</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Before Testing - Disconnect</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SPDs:</strong> Will be damaged by 500V DC</li>
              <li><strong>Electronics:</strong> Computers, TVs, etc.</li>
              <li><strong>Lamps:</strong> Remove or disconnect</li>
              <li><strong>Switches:</strong> Turn ON to include all wiring</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select correct test voltage for different circuit types",
              "Perform insulation resistance tests safely",
              "Interpret IR readings and identify problems",
              "Prepare circuits for testing without damage",
              "Understand factors affecting IR measurements",
              "Record and report IR test results correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Principles of Insulation Resistance Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies that the insulation between conductors and between conductors and earth provides adequate resistance to prevent dangerous leakage currents. Poor insulation can lead to electric shock, fire, and equipment damage. The test applies a DC voltage and measures the resulting current to calculate resistance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 Table 6.1 - Test voltages and minimum values:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SELV and PELV (up to 50V):</strong> Test at 250V DC, minimum 0.5 M-ohm</li>
                <li><strong>50V to 500V (inc 230V/400V):</strong> Test at 500V DC, minimum 1.0 M-ohm</li>
                <li><strong>Above 500V:</strong> Test at 1000V DC, minimum 1.0 M-ohm</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">New Installation</p>
                <p className="text-white/90 text-xs">Expect 100-500+ megohms - excellent insulation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Aged Installation</p>
                <p className="text-white/90 text-xs">2-50 megohms typical - monitor condition</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Problem Indicated</p>
                <p className="text-white/90 text-xs">Below 2 megohms - investigate cause</p>
              </div>
            </div>

            <p>
              The 1 M-ohm minimum is a threshold for action, not a target. Healthy insulation should be many times this value. Readings close to the minimum suggest degraded insulation that may fail in the future, especially when warm or damp.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> IR testing is a 'dead' test - the circuit must be isolated. Never apply 500V DC to a live circuit or to connected equipment that could be damaged.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Preparation for Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Preparation for Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper preparation is essential for accurate results and to prevent damage to equipment. The 500V DC test voltage can destroy sensitive electronics and must not be applied to connected equipment. Take time to prepare the installation correctly before testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Must Disconnect / Protect</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Surge protection devices (SPDs) - link out or remove</li>
                  <li>Electronic equipment (computers, TVs, etc.)</li>
                  <li>LED drivers and electronic transformers</li>
                  <li>Dimmer switches with electronic components</li>
                  <li>Lamps (especially LED and fluorescent)</li>
                  <li>PIR sensors and photocells</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Preparation Steps</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Isolate supply and prove dead</li>
                  <li>Turn main switch OFF</li>
                  <li>Turn all light switches ON</li>
                  <li>Disconnect sensitive equipment</li>
                  <li>Ensure pilot and indicator lamps removed</li>
                  <li>Check for interconnections with other supplies</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test configurations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Live to Earth:</strong> Link L and N together at DB, test to E</li>
                <li><strong>Line to Neutral:</strong> Test L to N with both disconnected from earth</li>
                <li><strong>Three-phase:</strong> Test L1-L2, L2-L3, L1-L3, and all to N, then all live to E</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> For large installations, you can do an initial 'all circuits' test with all MCBs on. If this gives a good reading (100+ M-ohm), individual circuit tests are less critical. A low reading indicates one or more circuits have problems and must be tested individually.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Performing the Test */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performing the Test
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing requires the multifunction tester set to IR mode with the correct test voltage selected. Connect the test leads and apply the test voltage for sufficient time to get a stable reading - typically 5-10 seconds for most circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test procedure - Live to Earth:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Set instrument to 500V DC insulation resistance</li>
                <li><strong>Step 2:</strong> Connect line and neutral together at the distribution board</li>
                <li><strong>Step 3:</strong> Connect one lead to the linked L+N</li>
                <li><strong>Step 4:</strong> Connect other lead to the earth bar</li>
                <li><strong>Step 5:</strong> Press test button and hold until reading stabilises</li>
                <li><strong>Step 6:</strong> Record the reading (in megohms)</li>
                <li><strong>Step 7:</strong> Allow capacitance to discharge before touching conductors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test procedure - Line to Neutral:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Disconnect all loads - equipment, lamps, etc.</li>
                <li>Connect one lead to line, other to neutral</li>
                <li>Keep switches ON to include all wiring</li>
                <li>A low reading indicates L-N insulation breakdown or connected load</li>
              </ul>
            </div>

            <p>
              If testing individual circuits, record each result on the schedule of test results. If a reading is low, investigate immediately - do not proceed to energise the circuit. Check for moisture, damaged cables, or inadvertently connected equipment.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety:</strong> After testing, capacitance in long cable runs can retain voltage. Allow discharge time or use the instrument's discharge function before handling conductors. Some instruments discharge automatically when the test button is released.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Interpreting Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance readings tell you about the condition of the insulation at the time of testing. Understanding what the readings mean - and what factors affect them - is essential for proper interpretation and appropriate action.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Good Results (No Concern)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New installation: 100+ megohms</li>
                  <li>Older installation: 10+ megohms</li>
                  <li>Reading stable and consistent</li>
                  <li>Similar readings across circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Concerning Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Below 1 M-ohm: Non-compliant - investigate</li>
                  <li>1-2 M-ohm: Marginal - record and monitor</li>
                  <li>Reading climbing slowly: Moisture present</li>
                  <li>One circuit much lower than others: Problem</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors affecting IR readings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> IR decreases as temperature rises (roughly halves per 10C)</li>
                <li><strong>Humidity/moisture:</strong> Significantly reduces IR - may recover when dried</li>
                <li><strong>Cable length:</strong> Longer cables have lower IR due to increased area</li>
                <li><strong>Contamination:</strong> Dust, oil, or chemicals can reduce surface IR</li>
                <li><strong>Age:</strong> Insulation degrades over time, especially with heat cycling</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A circuit reads 0.8 M-ohm (below minimum). Investigation reveals a damp junction box in an outbuilding. After drying and sealing, the reading improves to 50 M-ohm. The moisture was the cause, not permanent insulation damage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Results are Low</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check all equipment is disconnected - retest</li>
                <li>Look for visible damage, moisture, or contamination</li>
                <li>Test sub-sections to locate the problem area</li>
                <li>Check junction boxes and terminations</li>
                <li>Consider environmental factors (recent rain, condensation)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record all readings on the schedule of test results</li>
                <li>Note whether live-earth or line-neutral test</li>
                <li>Record in megohms (M-ohm) to at least one decimal place</li>
                <li>Note any limitations (equipment that couldn't be disconnected)</li>
                <li>For very high readings, record as '&gt;200M' or instrument maximum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing with load connected:</strong> Damages equipment, gives false readings</li>
                <li><strong>Not waiting for stable reading:</strong> Miss moisture or capacitance effects</li>
                <li><strong>Wrong test voltage:</strong> Must match circuit voltage band</li>
                <li><strong>Leaving SPDs connected:</strong> Will be destroyed by 500V DC</li>
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
                <p className="font-medium text-white mb-1">BS 7671 Table 6.1</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV: 250V DC, min 0.5 M-ohm</li>
                  <li>50V-500V: 500V DC, min 1.0 M-ohm</li>
                  <li>Above 500V: 1000V DC, min 1.0 M-ohm</li>
                  <li>Regulation 612.3 - IR testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Expected Values</p>
                <ul className="space-y-0.5">
                  <li>New installation: 100-500+ M-ohm</li>
                  <li>Good aged installation: 10-100 M-ohm</li>
                  <li>Acceptable but monitor: 2-10 M-ohm</li>
                  <li>Investigate: Below 2 M-ohm</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section3-3-3">
              Next: Polarity Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section3_2;
