import { ArrowLeft, Target, CheckCircle, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level2Module6Section6_2 = () => {
  useSEO(
    "Interpreting Test Readings - Level 2 Module 6 Section 6.2",
    "Basic interpretation of electrical test results and pass/fail criteria"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does a reading of 0.5 MΩ on an insulation resistance test indicate?",
      options: ["Perfect insulation", "Acceptable reading", "Below minimum requirements", "Equipment malfunction"],
      correctAnswer: 2,
      explanation: "A reading of 0.5 MΩ is below the minimum requirement of 1 MΩ for most installations and indicates a potential problem."
    },
    {
      id: 2,
      question: "If a continuity test shows 'OL' or infinity, what does this mean?",
      options: ["Perfect continuity", "No continuity - open circuit", "Low resistance", "High current"],
      correctAnswer: 1,
      explanation: "'OL' (over limit) or infinity readings indicate no continuity - an open circuit where current cannot flow."
    },
    {
      id: 3,
      question: "What is considered a good insulation resistance reading?",
      options: ["Below 1 MΩ", "Exactly 1 MΩ", "Well above 1 MΩ (typically 10+ MΩ)", "Any reading"],
      correctAnswer: 2,
      explanation: "While 1 MΩ is the minimum, good insulation typically shows readings well above this, often 10 MΩ or higher."
    },
    {
      id: 4,
      question: "A loop impedance reading of 2.5 Ω on a 32A circuit with 1.44 Ω maximum - what action is needed?",
      options: ["Accept the installation", "Investigate and rectify the fault", "Increase the fuse rating", "Ignore the reading"],
      correctAnswer: 1,
      explanation: "The reading exceeds the maximum permitted value, so the fault must be investigated and corrected before the circuit can be energised."
    },
    {
      id: 5,
      question: "What should you do if test readings don't match your expectations?",
      options: ["Ignore them", "Change the readings", "Investigate and retest", "Guess what they should be"],
      correctAnswer: 2,
      explanation: "Unexpected readings should always be investigated and retested to ensure accuracy and identify any potential problems."
    },
    {
      id: 6,
      question: "What does a high continuity reading suggest about circuit protective conductors?",
      options: ["Excellent condition", "Poor connections or damaged conductors", "Perfect earthing", "Low impedance path"],
      correctAnswer: 1,
      explanation: "High continuity readings indicate resistance in the protective conductor path, suggesting loose connections, corrosion, or broken conductors."
    },
    {
      id: 7,
      question: "Why is reversed polarity always considered a fail?",
      options: ["It looks unprofessional", "It can leave live conductors energised when switches are 'off'", "It uses more electricity", "It affects the meter reading"],
      correctAnswer: 1,
      explanation: "Reversed polarity is dangerous because it can leave live conductors energised even when switches are in the 'off' position, creating serious shock hazards."
    },
    {
      id: 8,
      question: "For an RCD test, what indicates a pass result?",
      options: ["The RCD never trips", "The RCD trips within the specified time limits", "The RCD trips immediately", "The reading shows infinity"],
      correctAnswer: 1,
      explanation: "An RCD must trip within specified time limits (typically 30ms for 30mA RCDs) when the correct test current is applied."
    },
    {
      id: 9,
      question: "What should you do if an insulation resistance reading is exactly 1.0 MΩ but you expected much higher?",
      options: ["Record as pass and continue", "Investigate the cause before proceeding", "Increase the test voltage", "Test a different circuit instead"],
      correctAnswer: 1,
      explanation: "While 1.0 MΩ technically meets the minimum, if you expected higher readings, investigate for potential moisture, contamination, or developing faults."
    },
    {
      id: 10,
      question: "According to BS 7671, what is the consequence of energising a circuit that has failed testing?",
      options: ["Nothing if it works initially", "Potential danger to users and breach of regulations", "Just a warning from Building Control", "Reduced equipment lifespan"],
      correctAnswer: 1,
      explanation: "Energising a circuit that has failed testing breaches BS 7671 and EAWR 1989, potentially creating dangerous conditions and legal liability."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <TestTube className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 6.2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Interpreting Test Readings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Basic interpretation of electrical test results and pass/fail criteria
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Compare readings to BS 7671 limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Identify pass/fail criteria for each test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Investigate unexpected readings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Never guess - always verify</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Readings outside normal ranges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> BS 7671 tables and guidance notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> All readings against pass/fail criteria</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Understanding what test readings mean is crucial for electrical safety. Simply recording numbers isn't enough—you must be able to interpret whether readings indicate safe operation or potential danger. This section covers the basic pass/fail criteria for common electrical tests and what to do when readings fall outside acceptable limits.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify basic pass/fail criteria for common electrical tests</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise when test readings indicate potential problems</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand what action to take when readings fail to meet requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply basic interpretation skills to real test scenarios</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Pass/Fail Criteria Basics */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-2 sm:mb-3 text-sm sm:text-base">Pass/Fail Criteria Basics</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Understanding pass/fail criteria is fundamental to electrical safety. BS 7671 establishes specific minimum values that must be met or exceeded for each type of test. These aren't arbitrary numbers—they're based on extensive research and real-world experience of what levels provide adequate safety margins under normal operating conditions.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        For insulation resistance tests, the standard minimum is typically 1 MΩ, but this varies depending on the circuit voltage and type. SELV circuits may require only 0.25 MΩ, while high-voltage installations need much higher values. The key principle is that insulation must be sufficient to prevent dangerous leakage currents under both normal and fault conditions.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Continuity tests work on the opposite principle—low resistance is desired. For protective conductors, readings should typically be below 0.05 Ω to ensure effective fault current paths. Higher readings suggest problems with connections, corrosion, or conductor damage that could prevent protective devices from operating correctly during earth faults.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Loop impedance (Zs) values must not exceed the maximum figures given in BS 7671 tables. These limits ensure that protective devices will disconnect supply within the required disconnection times during earth faults. The relationship between fault current, impedance, and disconnection time is critical for personal protection.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Understanding these principles helps electricians recognise when readings indicate safe operation versus potential danger. Simply memorising pass/fail limits isn't enough—you need to understand what the readings actually mean in terms of electrical safety and system performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="criteria-check"
            question="What is the typical minimum insulation resistance requirement for most electrical installations?"
            options={["0.1 MΩ", "1 MΩ", "10 MΩ", "100 MΩ"]}
            correctIndex={1}
            explanation="The minimum insulation resistance requirement is typically 1 MΩ, though higher readings are expected in practice and indicate better insulation condition."
          />

          {/* 2. Understanding Different Test Types */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">Understanding Different Test Types</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Each electrical test measures different aspects of installation safety and requires different interpretation approaches. Insulation resistance tests measure the ability of cable insulation to prevent current flow between conductors or to earth. High readings (typically 10+ MΩ for new installations) indicate good insulation condition, while low readings suggest moisture ingress, contamination, or insulation deterioration.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Continuity tests verify that protective conductors provide effective paths for fault currents. These tests should produce low resistance readings, typically below 0.05 Ω for main protective conductors. The "R1+R2" test combines line and protective conductor resistance, providing the total resistance of the fault current path.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Polarity testing ensures that single-pole switching devices are connected in the line conductor only, and that socket outlets and lamp holders have correct polarity. This test typically produces "satisfactory" or "requires attention" results rather than numerical values. Any polarity error is an immediate fail requiring correction before energisation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Earth fault loop impedance (Zs) testing measures the complete impedance of the fault current path from the point of the fault back to the source. This determines whether protective devices will operate within required time limits. The reading must not exceed the maximum value given in BS 7671 tables for the specific protective device and circuit rating.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        RCD testing verifies that residual current devices operate within specified parameters. This includes testing at rated residual operating current (typically 30mA) and at higher test currents to verify proper operation and timing. Trip times must fall within specified limits, typically 30ms for general-purpose RCDs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="test-types-check"
            question="For a continuity test, would you expect a HIGH or LOW resistance reading?"
            options={["HIGH resistance", "LOW resistance", "It doesn't matter", "Medium resistance"]}
            correctIndex={1}
            explanation="For continuity tests, you want LOW resistance readings, indicating that current can flow easily through the conductor."
          />

          {/* 3. When Readings Indicate Problems */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3 text-base">When Readings Indicate Problems</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        Recognising problem indicators requires understanding normal reading ranges and common fault patterns. Low insulation resistance readings (below 1 MΩ) can indicate several issues: moisture ingress from leaks or condensation, contamination from dust or chemicals, physical damage to cable insulation, or normal ageing deterioration in older installations.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        High continuity readings suggest faults in the protective conductor system. Common causes include loose terminal connections, corroded joints, broken conductors, or poor earth electrode connections. These faults can prevent protective devices from operating correctly during earth fault conditions, creating serious safety risks.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Polarity errors create immediate dangers. Reversed polarity means that even when switches are in the "off" position, conductors may remain live, creating shock hazards during maintenance or lamp changing. This is particularly dangerous in bathrooms and kitchens where water contact is possible.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Loop impedance readings above BS 7671 limits indicate that fault protection is inadequate. High impedance prevents sufficient fault current from flowing to operate protective devices within required disconnection times. This can result in dangerous voltages persisting during earth faults, potentially causing electrocution.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Borderline readings require careful consideration. A reading that just meets the minimum standard but is lower than expected for the installation type and age may indicate developing problems. Environmental factors such as temperature and humidity can temporarily affect readings, so consider retesting under different conditions.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Multiple test failures on the same circuit often indicate systematic problems such as water ingress, physical damage, or installation errors. Pattern recognition becomes important—isolated failures may be localised faults, while widespread problems suggest fundamental issues requiring comprehensive investigation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="problems-check"
            question="What might cause an insulation resistance reading to be lower than expected?"
            options={["Perfect installation", "Moisture ingress, contamination, or insulation damage", "High-quality cables", "Correct polarity"]}
            correctIndex={1}
            explanation="Low insulation resistance typically indicates moisture ingress, contamination, physical damage to insulation, or normal ageing deterioration."
          />

          {/* 4. Actions When Tests Fail */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3 text-base">Actions When Tests Fail</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-foreground">
                        When test results fail to meet BS 7671 requirements, immediate action is essential. The first and most important rule is: do not energise the circuit. This applies regardless of how close the reading is to the pass limit or how confident you feel about the installation. Failed tests indicate potential safety risks that must be resolved before the circuit can be safely used.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Systematic investigation is required to identify the root cause of test failures. For insulation resistance failures, check for obvious moisture sources, inspect cable routes for damage, examine junction boxes and accessories for contamination, and verify that all equipment is properly disconnected. Document your investigation process and findings.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        For continuity failures, examine all earth conductor connections, check terminal tightness, inspect earth bonding arrangements, and verify earth electrode connections where applicable. Use additional tests such as voltage drop measurements to help locate high-resistance joints or damaged conductors.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Polarity failures require immediate correction of wiring errors. Check that line conductors are correctly identified throughout the installation, verify that single-pole switching devices are wired in the line conductor, and ensure that socket outlets and lamp holders have correct polarity. These corrections often require rewiring sections of the installation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Loop impedance failures typically require investigation of the earth fault path. Check earth electrode resistance, examine main earthing conductor connections, verify bonding arrangements, and consider whether additional earthing measures are needed. Sometimes the solution involves upgrading the earthing system or changing protective device ratings.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        After remedial work is completed, comprehensive retesting is essential. Don't just retest the failed item—verify that the remedial work hasn't affected other circuits or created new problems. Document all remedial actions taken and ensure that final test results demonstrate compliance before energising the installation.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground">
                        Never ignore failed test results or assume they will improve over time. Electrical faults rarely self-repair and often deteriorate further, creating increasingly dangerous conditions. Professional integrity and legal compliance require that all identified defects are properly addressed before installation energisation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="actions-check"
            question="What is the most important rule when a test result fails to meet BS 7671 requirements?"
            options={["Try a different test method", "Do not energise the circuit until problems are resolved", "Reduce the test voltage", "Test again immediately"]}
            correctIndex={1}
            explanation="The most important rule is never to energise a circuit that has failed testing. All problems must be investigated and resolved before the circuit can be safely energised."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground">
            <div className="p-3 sm:p-4 rounded-lg bg-card border border-border/20">
              <p className="font-medium mb-2">Common Test Reading Guidelines:</p>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>• Insulation Resistance: ≥1 MΩ minimum (expect 10+ MΩ for good insulation)</li>
                <li>• Continuity: ≤0.05 Ω for protective conductors (lower is better)</li>
                <li>• Loop Impedance: Must not exceed BS 7671 table values</li>
                <li>• RCD Test: Should trip within specified time (typically 30ms)</li>
                <li>• If unsure, always refer to BS 7671 or seek guidance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Real-World Example</h2>
          <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">!</div>
              <div className="flex-1">
                <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2">The Dangerous Misinterpretation</p>
                <div className="space-y-3 text-xs sm:text-sm text-foreground">
                  <p>
                    <strong>The Situation:</strong> An apprentice electrician was testing a new kitchen installation in a domestic property. The insulation resistance test between line and earth showed 0.8 MΩ. Knowing that "anything around 1 MΩ should be fine," he marked it as acceptable and energised the circuits.
                  </p>
                  <p>
                    <strong>The Hidden Problem:</strong> The low reading was caused by moisture ingress in a junction box behind kitchen units, where a small leak had been developing for weeks. The 0.8 MΩ reading indicated degraded insulation that was on the verge of complete failure.
                  </p>
                  <p>
                    <strong>The Consequences:</strong> Three days later, during normal use of the kitchen appliances, the insulation finally failed completely. A earth fault occurred while the homeowner was washing dishes, resulting in an electric shock that required hospital treatment. The fault current should have tripped the RCD, but the degraded earth path meant insufficient current flowed.
                  </p>
                  <p>
                    <strong>The Investigation:</strong> HSE investigation revealed that the apprentice had misinterpreted the test results. The 0.8 MΩ reading was below the 1.0 MΩ minimum and should have triggered investigation and remedial action. The supervising electrician was prosecuted for inadequate supervision and received a £15,000 fine.
                  </p>
                  <p>
                    <strong>The Lesson:</strong> Pass/fail criteria exist for good reasons. Even small deviations from minimum standards can indicate serious developing problems that require immediate attention.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-card border border-red-500/20 rounded-lg">
              <p className="text-xs sm:text-xs sm:text-sm text-foreground font-medium">
                💡 <strong>Key Takeaway:</strong> Never compromise on pass/fail criteria. If a reading doesn't meet the standard, investigate thoroughly before proceeding. Your interpretation could save lives.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                What should I do if I get an unexpected reading?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Always investigate unexpected readings. Check your test equipment, connections, and method. Retest to confirm. If the reading persists, investigate for faults before proceeding.
              </p>
            </details>
            <Separator />
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                Can I round up a reading that's close to the limit?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                No. Always record the actual reading. If it doesn't meet the requirement, it's a failure regardless of how close it is to the limit.
              </p>
            </details>
            <Separator />
            <details className="group">
              <summary className="cursor-pointer font-medium text-sm sm:text-base text-foreground group-hover:text-primary">
                Where can I find the exact pass/fail criteria?
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                BS 7671 contains all the specific requirements. Guidance Note 3 (Inspection & Testing) also provides helpful interpretation guidance.
              </p>
            </details>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Pocket Guide - Pass/Fail Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <p className="font-medium mb-2 text-foreground">HIGH is Good:</p>
              <ul className="space-y-1 text-foreground">
                <li>✓ Insulation Resistance (≥1 MΩ)</li>
                <li>✓ RCD test should trip (not infinite)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2 text-foreground">LOW is Good:</p>
              <ul className="space-y-1 text-foreground">
                <li>✓ Continuity (≤0.05 Ω protective)</li>
                <li>✓ Loop Impedance (below BS table)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-emerald-500/10 border border-primary/20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Key Learning Points</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Test Interpretation</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Each test type has specific pass/fail criteria based on BS 7671</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Safety First</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Never energise circuits that have failed testing requirements</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Investigation Required</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Failed readings need systematic investigation and remedial action</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/20">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Professional Judgement</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Borderline results require careful consideration and investigation</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-center text-sm sm:text-base font-medium text-foreground">
              💡 Remember: Correct interpretation of test results is crucial for electrical safety—when in doubt, investigate further!
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="module6-section6/1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Recording Test Results
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              Back to Section 6 Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level2Module6Section6_2;