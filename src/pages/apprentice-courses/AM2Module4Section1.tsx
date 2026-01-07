import { Zap, CheckCircle, AlertTriangle, Target, Settings, BookOpen, Lightbulb, Shield, Eye } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section1 = () => {
  useSEO(
    "Full Test Sequence and Order of Tests | AM2 Module 4 Section 1",
    "Master the correct testing sequence for AM2 electrical assessment as per IET Guidance Note 3 and BS 7671 Part 6"
  );

  const learningOutcomes = [
    "Execute the complete testing sequence in correct GN3 order",
    "Understand the safety rationale behind each test sequence step",
    "Perform comprehensive dead testing before any live work",
    "Apply correct test voltages and interpret results accurately",
    "Document test results systematically throughout the process",
    "Demonstrate professional competence in electrical testing procedures"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "first-test",
      question: "What is the first electrical test that must be carried out before any live testing?",
      options: [
        "Insulation resistance",
        "Continuity of protective conductors",
        "Earth fault loop impedance",
        "RCD testing"
      ],
      correctIndex: 1,
      explanation: "Continuity of protective conductors must be tested first to ensure safety before any live testing is undertaken."
    },
    {
      id: "insulation-voltage",
      question: "At what voltage should insulation resistance be tested for circuits up to 500V?",
      options: [
        "250V DC",
        "500V DC",
        "1000V DC",
        "100V DC"
      ],
      correctIndex: 1,
      explanation: "BS 7671 requires insulation resistance testing at 500V DC for circuits operating up to 500V."
    },
    {
      id: "live-testing-rule",
      question: "When can live testing commence during AM2 assessment?",
      options: [
        "Immediately after isolation verification",
        "Only after all dead tests are complete and satisfactory",
        "Any time during the assessment",
        "Before polarity testing"
      ],
      correctIndex: 1,
      explanation: "Live testing must ONLY commence after all dead tests are complete and satisfactory. This is critical for safety and assessment success."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum acceptable insulation resistance value for most circuits?",
      options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"],
      correctAnswer: 1,
      explanation: "The minimum insulation resistance is 1.0 MΩ for most installations, though some specific circuits may require higher values."
    },
    {
      id: 2,
      question: "During AM2 assessment, which aspect is most critical for assessor evaluation?",
      options: [
        "Speed of testing",
        "Expensive equipment use",
        "Following GN3 sequence methodically and safely",
        "Perfect numerical results"
      ],
      correctAnswer: 2,
      explanation: "Assessors primarily look for methodical adherence to GN3 sequence with safe working practices and realistic results."
    },
    {
      id: 3,
      question: "What happens if you perform live tests before completing dead tests?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Automatic failure for unsafe practice",
        "No consequence"
      ],
      correctAnswer: 2,
      explanation: "Performing live tests before completing dead tests is considered unsafe practice and results in automatic failure."
    },
    {
      id: 4,
      question: "Which test must be performed to verify ring circuit integrity?",
      options: [
        "Earth fault loop impedance",
        "Continuity of ring final circuit conductors",
        "RCD testing",
        "Voltage drop"
      ],
      correctAnswer: 1,
      explanation: "Continuity of ring final circuit conductors verifies the ring is complete and identifies any breaks or parallel paths."
    },
    {
      id: 5,
      question: "What is the correct sequence for insulation resistance testing?",
      options: [
        "Test all conductors to earth first",
        "Test line to neutral, then line to earth, then neutral to earth",
        "Test randomly",
        "Test only line to earth"
      ],
      correctAnswer: 1,
      explanation: "Correct sequence is L-N, L-E, then N-E to ensure comprehensive insulation testing between all conductors."
    },
    {
      id: 6,
      question: "What is the maximum earth fault loop impedance for a 32A Type B MCB?",
      options: ["0.72Ω", "1.44Ω", "2.30Ω", "2.87Ω"],
      correctAnswer: 1,
      explanation: "BS 7671 specifies maximum Zs of 1.44Ω for 32A Type B MCB (applying 80% rule for disconnection times)."
    },
    {
      id: 7,
      question: "At what test current should an RCD trip within 300ms?",
      options: ["50% of rated current", "100% of rated current", "150% of rated current", "500% of rated current"],
      correctAnswer: 1,
      explanation: "RCD must trip within 300ms at 100% of its rated current (IΔn). At 50% it should not trip."
    },
    {
      id: 8,
      question: "Which test voltage is used for insulation resistance on 230V circuits?",
      options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
      correctAnswer: 1,
      explanation: "BS 7671 requires 500V DC test voltage for circuits with nominal voltage up to 500V."
    },
    {
      id: 9,
      question: "What must be disconnected before insulation resistance testing?",
      options: [
        "Only fluorescent lamps",
        "Electronic equipment and surge protective devices",
        "All switches",
        "Nothing needs disconnecting"
      ],
      correctAnswer: 1,
      explanation: "Electronic equipment, surge protective devices, and capacitors must be disconnected to avoid damage and false readings."
    },
    {
      id: 10,
      question: "What is the acceptable voltage range for 230V single-phase supply?",
      options: ["220V - 240V", "207V - 253V", "200V - 250V", "225V - 235V"],
      correctAnswer: 1,
      explanation: "BS 7671 accepts ±10% of nominal voltage: 230V ±10% = 207V to 253V range."
    }
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 4", "Section 1"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Zap}
        title="Full Test Sequence and Order of Tests"
        description="Master the correct testing sequence for AM2 electrical assessment as per IET Guidance Note 3 and BS 7671 Part 6 - ensure safety and compliance through systematic testing procedures."
        badge="Module 4 • Section 1"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Test Sequence Determines AM2 Success">
        <p className="text-ios-callout text-white/80 mb-2">
          The test sequence follows IET Guidance Note 3 and BS 7671 Part 6 exactly. Deviation from this order will result in assessment failure. Live testing must ONLY be carried out after all dead tests are complete and satisfactory.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Assessors observe whether you can follow safe working practices and systematic procedures. Any unsafe practice results in immediate failure.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* NET AM2 GN3 Testing Sequence */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          1. NET AM2 GN3 Testing Sequence
        </h2>

        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4 mb-4">
          <h4 className="font-medium text-amber-200 mb-3">DEAD TESTS FIRST - MANDATORY SEQUENCE</h4>
          <p className="text-ios-callout text-amber-300 mb-4">
            All dead tests must be completed and satisfactory before ANY live testing commences. This sequence is non-negotiable for AM2 assessment success.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Continuity of Protective Conductors (R1 + R2)</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Test CPC continuity from consumer unit to all points. Use low resistance ohmmeter.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>AM2 Requirement:</strong> Record readings for each circuit. Demonstrate safe test lead connection.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Continuity of Ring Final Circuit Conductors</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Test ring continuity for line, neutral and CPC. Calculate (R1 + R2) values.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>AM2 Requirement:</strong> Show cross-connection method and record end-to-end resistance values.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Insulation Resistance</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Test at 500V DC minimum for circuits up to 500V. Test between all conductors and to earth.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote space-y-1">
                  <div><strong>Test Sequence:</strong> Line to Neutral, Line to Earth, Neutral to Earth</div>
                  <div><strong>Minimum Values:</strong> 1.0 MΩ for most circuits, 0.5 MΩ for fire alarm/SELV</div>
                  <div><strong>AM2 Critical:</strong> Disconnect electronic equipment, remove lamps where practical</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Polarity</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Verify correct polarity at all single-pole devices, lampholders and socket outlets.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>AM2 Requirement:</strong> Test using continuity tester. Verify line conductor connects to correct terminals.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Earth Electrode Resistance (where applicable)</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  For TT systems only. Test electrode resistance using appropriate earth tester.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>Maximum Values:</strong> Typically 200Ω for TT systems with 30mA RCD protection
                </div>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[0].id}
        question={quickCheckQuestions[0].question}
        options={quickCheckQuestions[0].options}
        correctIndex={quickCheckQuestions[0].correctIndex}
        explanation={quickCheckQuestions[0].explanation}
      />

      {/* Live Testing Phase */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          2. Live Testing Phase - Only After Dead Tests Complete
        </h2>

        <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
          <h4 className="font-medium text-red-200 mb-3">LIVE TESTS - STRICT SEQUENCE REQUIRED</h4>
          <p className="text-ios-callout text-elec-yellow mb-4">
            Live testing ONLY after ALL dead tests are satisfactory. Performing live tests prematurely = automatic AM2 failure.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Earth Fault Loop Impedance (Zs)</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Measure Zs at furthest point of each circuit. Compare against BS 7671 maximum values.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote space-y-1">
                  <div><strong>BS 7671 Maximum Values:</strong></div>
                  <div>Type B MCB: 32A = 1.44Ω, 20A = 2.3Ω, 16A = 2.87Ω, 6A = 7.67Ω</div>
                  <div>Type C MCB: Values x 0.5</div>
                  <div><strong>AM2 Critical:</strong> Account for 80% rule for protective device operation</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">7</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">RCD Operation and Timing</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Test RCD trip current and time at rated current and 5x rated current.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote space-y-1">
                  <div><strong>Test Requirements:</strong></div>
                  <div>Trip at 50% rated current: Should NOT trip</div>
                  <div>Trip at 100% rated current: Must trip within 300ms</div>
                  <div>Trip at 5x rated current: Must trip within 40ms</div>
                  <div><strong>AM2 Critical:</strong> Test both positive and negative half cycles</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">8</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Voltage Measurements</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Verify supply voltage at consumer unit and at extremities of circuits.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote space-y-1">
                  <div><strong>Acceptable Range:</strong> 230V +/-10% (207V - 253V)</div>
                  <div><strong>3-Phase:</strong> 400V +/-10% (360V - 440V)</div>
                  <div><strong>AM2 Requirement:</strong> Record voltage drop calculations where significant</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">9</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Phase Sequence (3-Phase Only)</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Verify correct phase rotation for 3-phase installations.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>Standard Sequence:</strong> L1-L2-L3 clockwise rotation
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">10</div>
              <div className="flex-1">
                <h5 className="font-medium text-white mb-1">Functional Testing</h5>
                <p className="text-ios-footnote text-white/80 mb-2">
                  Test operation of switches, controls, and protective devices.
                </p>
                <div className="bg-white/5 rounded p-2 text-ios-footnote">
                  <strong>AM2 Requirement:</strong> Demonstrate safe switching procedures and verify correct operation
                </div>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Critical Test Values and Procedures */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          3. Critical Test Values and Procedures
        </h2>

        <div className="space-y-4">
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">Insulation Resistance Testing</h5>
              <span className="text-sm font-medium text-elec-yellow">500V DC</span>
            </div>
            <ul className="space-y-1 text-ios-footnote text-white/80">
              <li>Test voltage: 500V DC for circuits up to 500V</li>
              <li>Minimum acceptable value: 1.0 MΩ (most circuits)</li>
              <li>Test sequence: L-N, L-E, N-E</li>
              <li>Remove/disconnect electronic equipment before testing</li>
            </ul>
          </div>

          <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">Continuity Testing</h5>
              <span className="text-sm font-medium text-green-400">Low Resistance</span>
            </div>
            <ul className="space-y-1 text-ios-footnote text-white/80">
              <li>Use low-resistance ohmmeter or continuity tester</li>
              <li>Nullify test leads before measurement</li>
              <li>Record R1+R2 values for each circuit</li>
              <li>Verify ring circuit integrity (end-to-end method)</li>
            </ul>
          </div>

          <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">RCD Testing</h5>
              <span className="text-sm font-medium text-elec-yellow">Trip Time</span>
            </div>
            <ul className="space-y-1 text-ios-footnote text-white/80">
              <li>Test at 1/2 x IΔn (should not trip)</li>
              <li>Test at 1 x IΔn (must trip within 300ms)</li>
              <li>Test at 5 x IΔn (must trip within 40ms)</li>
              <li>Test all RCD devices individually</li>
            </ul>
          </div>

          <div className="bg-purple-950/20 border border-purple-800/30 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">Earth Fault Loop Impedance</h5>
              <span className="text-sm font-medium text-elec-yellow">Zs Values</span>
            </div>
            <ul className="space-y-1 text-ios-footnote text-white/80">
              <li>Measure Ze (external loop impedance) first</li>
              <li>Measure Zs at furthest points on each circuit</li>
              <li>Verify Zs is less than or equal to maximum values in BS 7671</li>
              <li>Account for temperature correction factors</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[2].id}
        question={quickCheckQuestions[2].question}
        options={quickCheckQuestions[2].options}
        correctIndex={quickCheckQuestions[2].correctIndex}
        explanation={quickCheckQuestions[2].explanation}
      />

      {/* Assessment Success Factors */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          4. Assessment Success Factors
        </h2>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="font-medium text-elec-yellow mb-2">What Assessors Evaluate</h4>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">&#10003;</span>
                <div>
                  <strong className="text-white">Strict adherence to GN3 test sequence</strong>
                  <p className="text-ios-footnote mt-1">No deviation from prescribed order - this demonstrates professional competence</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">&#10003;</span>
                <div>
                  <strong className="text-white">Safe working practices throughout</strong>
                  <p className="text-ios-footnote mt-1">Proper isolation verification, appropriate PPE, safe test procedures</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">&#10003;</span>
                <div>
                  <strong className="text-white">Competent use of test equipment</strong>
                  <p className="text-ios-footnote mt-1">Correct instrument selection, proper lead connections, accurate readings</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">&#10003;</span>
                <div>
                  <strong className="text-white">Understanding of test results</strong>
                  <p className="text-ios-footnote mt-1">Ability to interpret readings and identify potential issues</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-950/20 border border-orange-800/30 rounded-xl p-4">
            <h4 className="font-medium text-orange-200 mb-2">Common Failure Points</h4>
            <ul className="space-y-1 text-ios-callout text-elec-yellow">
              <li><strong>Testing live before dead tests complete</strong> - Automatic failure</li>
              <li><strong>Inadequate isolation verification</strong> - Safety breach</li>
              <li><strong>Poor test lead technique</strong> - Unreliable results</li>
              <li><strong>Misunderstanding of test results</strong> - Lacks competence demonstration</li>
              <li><strong>Incomplete documentation</strong> - Professional standards not met</li>
              <li><strong>Rushing through procedures</strong> - Mistakes and missed steps</li>
            </ul>
          </div>

          <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-4">
            <h4 className="font-medium text-blue-200 mb-2">Professional Standards Expected</h4>
            <ul className="space-y-1 text-ios-callout text-elec-yellow">
              <li>Methodical approach matching industry standards</li>
              <li>Clear understanding of safety implications</li>
              <li>Accurate documentation as work progresses</li>
              <li>Professional communication with assessors</li>
              <li>Realistic timeframes for each test procedure</li>
              <li>Appropriate response to unexpected results</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* What the Assessor is Looking For */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          What the Assessor is Looking For
        </h2>

        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
            <h4 className="font-medium text-amber-200 mb-3">Assessment Criteria - NET AM2</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">Safe Working Practices</h5>
                  <p className="text-ios-footnote text-white/80">
                    Demonstrating isolation, proving dead, appropriate PPE, and risk assessment procedures consistently throughout the assessment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">Methodical Test Sequence</h5>
                  <p className="text-ios-footnote text-white/80">
                    Following GN3 sequence exactly - dead tests completely finished before ANY live testing commences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">Correct Equipment Use</h5>
                  <p className="text-ios-footnote text-white/80">
                    Appropriate test instruments, correct settings, proper lead connections, and understanding equipment limitations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">Accurate Documentation</h5>
                  <p className="text-ios-footnote text-white/80">
                    Recording results systematically, understanding what values mean, and identifying when results require investigation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-white mb-1">Professional Communication</h5>
                  <p className="text-ios-footnote text-white/80">
                    Explaining procedures, discussing findings, and demonstrating understanding of regulations and standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
            <h4 className="font-medium text-red-200 mb-3">Common Failure Points</h4>
            <ul className="space-y-2 text-ios-callout text-elec-yellow">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow text-xs mt-1">&#9679;</span>
                <span>Attempting live tests before completing all dead tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow text-xs mt-1">&#9679;</span>
                <span>Inadequate isolation procedures or failing to prove dead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow text-xs mt-1">&#9679;</span>
                <span>Using incorrect test voltages or equipment settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow text-xs mt-1">&#9679;</span>
                <span>Poor documentation or inability to interpret results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow text-xs mt-1">&#9679;</span>
                <span>Unsafe practices or inadequate risk assessment</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary Section */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Section Summary
        </h2>

        <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4 mb-4">
          <h4 className="font-medium text-green-200 mb-3">Key Takeaways</h4>
          <ul className="space-y-2 text-ios-callout text-green-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>NET AM2 success depends on following the exact GN3 testing sequence without deviation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>Dead tests must be 100% complete and satisfactory before any live testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>BS 7671 test values and procedures must be applied correctly and consistently</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>Safe working practices are paramount - unsafe practice results in automatic failure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>Professional documentation and result interpretation demonstrate competence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xs mt-1">&#10003;</span>
              <span>Assessors evaluate methodology and safety awareness, not just numerical results</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="font-medium text-elec-yellow mb-3">Next Steps</h4>
          <p className="text-ios-callout text-white/80 mb-3">
            Having mastered the testing sequence, you should now focus on practical application and timing.
            The next section covers specific test procedures and common scenarios you will encounter during your AM2 assessment.
          </p>
          <div className="flex items-center gap-2 text-ios-callout text-elec-yellow">
            <Lightbulb className="w-4 h-4" />
            <span>Practice the complete sequence until it becomes second nature</span>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz questions={quizQuestions} title="Testing Sequence Assessment" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section6"
        prevLabel="Time Management"
        nextHref="../section2"
        nextLabel="Safe Use of Test Instruments"
        currentSection={1}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module4Section1;
