import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing for Polarity and Continuity During Install - Module 4.5.6 | Level 2 Electrical Course";
const DESCRIPTION = "Master polarity and continuity testing techniques during installation. Learn proper procedures, tools, and BS 7671 compliance for safe electrical verification and fault prevention.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a polarity test?",
    options: ["To measure current rating", "To check correct connection of live, neutral, and earth", "To test insulation resistance", "To verify circuit protection"],
    correctIndex: 1,
    explanation: "Polarity testing ensures that live, neutral, and earth conductors are connected to their correct terminals, preventing dangerous cross-connections."
  },
  {
    id: 2,
    question: "Name two instruments suitable for continuity testing.",
    options: ["Multimeter and insulation tester", "Low resistance ohmmeter and multimeter", "Clamp meter and oscilloscope", "RCD tester and PAT tester"],
    correctIndex: 1,
    explanation: "Low resistance ohmmeters and multimeters (set to resistance range) are the standard instruments for accurate continuity testing."
  },
  {
    id: 3,
    question: "Why should you always verify isolation before testing?",
    options: ["To save battery", "To ensure safety and prevent damage to test equipment", "To get accurate readings", "To comply with manufacturer instructions"],
    correctIndex: 1,
    explanation: "Verifying isolation ensures safety for the tester and prevents damage to test equipment from unexpected voltage presence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a polarity test check for?",
    options: [
      "Correct current rating",
      "Correct connection of live, neutral, and earth",
      "Cable insulation integrity",
      "Circuit breaker tripping speed"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing verifies that live, neutral, and earth conductors are connected to their correct terminals."
  },
  {
    id: 2,
    question: "True or False: Continuity testing can be done on a live circuit.",
    options: [
      "True",
      "False",
      "Only with special equipment",
      "Only on low voltage circuits"
    ],
    correctAnswer: 1,
    explanation: "False - Continuity testing must always be performed with the circuit isolated for safety and accuracy."
  },
  {
    id: 3,
    question: "Name one tool used for continuity testing.",
    options: [
      "Low resistance ohmmeter",
      "Multimeter",
      "Continuity tester",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Low resistance ohmmeters, multimeters, and dedicated continuity testers are all suitable for continuity testing."
  },
  {
    id: 4,
    question: "Why is a proving unit used before and after testing?",
    options: [
      "To ensure the tester is functioning correctly",
      "To calibrate the instrument",
      "To verify test lead integrity",
      "To check battery level"
    ],
    correctAnswer: 0,
    explanation: "Proving units verify that test instruments are working correctly before and after testing procedures."
  },
  {
    id: 5,
    question: "Which regulation covers verification during installation?",
    options: [
      "BS 5839",
      "BS 7671",
      "BS EN 61439",
      "BS 5266"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Part 6 covers initial verification requirements including polarity and continuity testing during installation."
  },
  {
    id: 6,
    question: "What should be done if continuity readings are unusually high?",
    options: [
      "Ignore if within tolerance",
      "Investigate for loose connections or damaged cables",
      "Increase test voltage",
      "Record and continue"
    ],
    correctAnswer: 1,
    explanation: "High resistance readings indicate potential problems requiring immediate investigation and correction."
  },
  {
    id: 7,
    question: "Why is it important to label a circuit after testing?",
    options: [
      "To avoid retesting and ensure correct identification",
      "To impress the client",
      "To comply with colour coding",
      "To save time during installation"
    ],
    correctAnswer: 0,
    explanation: "Labelling prevents duplication of testing and ensures correct circuit identification throughout the installation process."
  },
  {
    id: 8,
    question: "When testing polarity at a socket, which two pins should you measure between for phase and neutral verification?",
    options: [
      "Live pin and earth pin",
      "Live pin and neutral pin",
      "Neutral pin and earth pin",
      "All pins together"
    ],
    correctAnswer: 1,
    explanation: "Phase and neutral polarity verification requires testing between the live pin and neutral pin of the socket."
  }
];

const Module4Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Testing for Polarity and Continuity During Install
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master essential testing procedures to ensure electrical systems are connected correctly and safely before energisation.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Polarity testing checks that conductors are connected to correct terminals</li>
                  <li>Continuity testing confirms unbroken electrical paths through conductors</li>
                  <li>Testing before energisation prevents faults and ensures BS 7671 compliance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Wiring connections, test points, circuit identification needs</li>
                  <li><strong>Use:</strong> Proper test instruments, correct procedures, approved methods</li>
                  <li><strong>Check:</strong> Accurate readings, correct polarity, continuity values within limits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 leading-relaxed list-disc pl-6">
              <li>Explain the purpose and importance of polarity and continuity testing in electrical installations</li>
              <li>Identify and correctly use the tools and instruments required for accurate testing procedures</li>
              <li>Perform polarity and continuity tests to industry standards and BS 7671 requirements</li>
              <li>Interpret test results accurately and take appropriate corrective action when faults are discovered</li>
              <li>Apply BS 7671 Part 6 verification requirements correctly during installation and commissioning</li>
            </ul>
          </section>

          {/* Safety and Compliance Benefits */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Critical Importance of Installation Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Testing during installation is fundamental to electrical safety and system reliability:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Prevents Dangerous Cross-connections</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Prevents live conductors connected to neutral terminals</li>
                  <li>Ensures protective conductors maintain earth continuity</li>
                  <li>Eliminates shock risk from incorrectly wired accessories</li>
                  <li>Prevents equipment damage from wrong polarity connections</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">BS 7671 Part 6 Compliance</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Legal requirement for all new electrical installations</li>
                  <li>Required for electrical installation certificates</li>
                  <li>Essential for insurance and warranty validity</li>
                  <li>Demonstrates professional competence and due diligence</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Economic Benefits</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Identifies problems before system commissioning</li>
                  <li>Prevents equipment damage during first energisation</li>
                  <li>Reduces callback visits and warranty claims</li>
                  <li>Maintains project schedules and client confidence</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="purpose-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Testing Tools and Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Professional Testing Tools and Equipment
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Accurate testing requires appropriate instruments and proper calibration:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Low Resistance Ohmmeter</p>
                <p className="text-sm mb-2">Primary instrument for continuity testing:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Test current: Minimum 200mA for accurate readings</li>
                  <li>Resolution: 0.01Ω or better for precise measurements</li>
                  <li>Range: 0-2000Ω typically sufficient for most installations</li>
                  <li>Calibration: Annual calibration certificate required</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Digital Multimeter</p>
                <p className="text-sm mb-2">Versatile instrument for polarity and continuity testing:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Resistance measurement capability to 0.1Ω resolution</li>
                  <li>Voltage measurement for polarity verification</li>
                  <li>Audible continuity indication for quick checks</li>
                  <li>Safety category rating appropriate for electrical work (CAT III minimum)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Proving Unit</p>
                <p className="text-sm mb-2">Essential safety device for instrument verification:</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Known resistance values for instrument verification</li>
                  <li>Battery-powered for independent operation</li>
                  <li>Multiple test points for comprehensive checking</li>
                  <li>Regular calibration to maintain accuracy</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Maintenance requirement:</strong> All test equipment must be regularly calibrated and maintained to ensure accuracy.</p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="tools-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Testing Procedures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Professional Testing Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Systematic procedures ensure accurate results and maintain safety throughout testing:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Polarity Testing Procedure</p>
                <p className="text-sm mb-2"><strong>Pre-test safety checks:</strong></p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Isolate circuit completely from all sources of supply</li>
                  <li>Lock off isolation switches and apply warning notices</li>
                  <li>Verify isolation using approved voltage indicator</li>
                  <li>Check proving unit functionality before and after use</li>
                </ul>
                <p className="text-sm mt-3 mb-2"><strong>Systematic testing approach:</strong></p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Test at distribution board: phase to phase, neutral to neutral, earth to earth</li>
                  <li>Verify correct conductor identification throughout installation</li>
                  <li>Test each outlet point: live terminal to live conductor, neutral to neutral</li>
                  <li>Check switching arrangements: ensure switches operate live conductors only</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Continuity Testing Procedure</p>
                <p className="text-sm mb-2"><strong>Circuit preparation:</strong></p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Verify complete isolation from all supply sources</li>
                  <li>Disconnect all loads and electronic devices</li>
                  <li>Remove any parallel paths that could affect readings</li>
                  <li>Check test instrument calibration and lead resistance</li>
                </ul>
                <p className="text-sm mt-3 mb-2"><strong>R1 + R2 method:</strong></p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Link line and CPC conductors at distribution board</li>
                  <li>Test between line and CPC terminals at each outlet</li>
                  <li>Record readings for earth fault loop impedance calculations</li>
                  <li>Compare results with design values and cable manufacturer data</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="isolation-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Results and Compliance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Recording Results and Ensuring Compliance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-green-400 mb-2">Acceptable Values</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Continuity: Typically &lt;0.05Ω for short runs, calculated for longer circuits</li>
                  <li>Polarity: Correct identification at all connection points</li>
                  <li>R1+R2 values: Must align with earth fault loop impedance requirements</li>
                  <li>Compare all readings with design calculations and manufacturer specifications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Documentation Requirements</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Record all test results on electrical installation certificate</li>
                  <li>Include instrument details, calibration dates, and test conditions</li>
                  <li>Note any deviations from standard procedures or values</li>
                  <li>Provide clear remedial action records for any failures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Fault Investigation Procedures</p>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>High resistance readings: Check connections, joints, and cable integrity</li>
                  <li>Open circuits: Locate breaks using sectional testing methods</li>
                  <li>Incorrect polarity: Trace wiring and correct at source of error</li>
                  <li>Intermittent faults: Check for loose connections and poor terminations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Professional practice:</strong> Never energise circuits until all tests pass and certificates are complete.</p>
              </div>
            </div>
          </section>

          {/* Quality Assurance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Quality Assurance and Best Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Safety Compliance</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Complete isolation verified before testing</li>
                    <li>Lock-off procedures properly applied</li>
                    <li>Warning notices displayed throughout</li>
                    <li>Test instruments verified before and after use</li>
                    <li>All temporary links removed after testing</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Technical Standards</p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>All test results within acceptable limits</li>
                    <li>Documentation complete and accurate</li>
                    <li>Instrument calibration current and valid</li>
                    <li>Test procedures follow BS 7671 requirements</li>
                    <li>Any faults identified and corrected</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm"><strong>Certification requirement:</strong> No circuit should be energised until testing is complete and certificates signed off.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2">Summary</h2>
              <p className="text-white/80 leading-relaxed">
                Polarity and continuity testing ensures that circuits are wired correctly and are electrically sound before energising. Using correct tools, following standard procedures, and recording accurate results are critical for compliance, safety, and professional installation standards. Systematic testing prevents dangerous faults, protects equipment, and demonstrates professional competence in electrical installation work.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
            <p className="text-white/70 mb-6">Test your understanding of polarity and continuity testing procedures.</p>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Dressing Cables Neatly
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-7">
                Next: Making Final Fixes to Accessories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_6;
