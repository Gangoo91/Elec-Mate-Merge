import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing for Polarity and Continuity During Install - Module 4.5.6 | Level 2 Electrical Course";
const DESCRIPTION = "Master polarity and continuity testing techniques during installation. Learn proper procedures, tools, and BS 7671 compliance for safe electrical verification and fault prevention.";

// Inline check questions
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

const Module4Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.5.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Testing for Polarity and Continuity During Install
          </h1>
          <p className="text-muted-foreground">
            Master essential testing procedures to ensure electrical systems are connected correctly and safely before energisation.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Polarity testing checks that conductors are connected to correct terminals.</li>
                <li>Continuity testing confirms unbroken electrical paths through conductors.</li>
                <li>Testing before energisation prevents faults and ensures BS 7671 compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Wiring connections, test points, circuit identification needs.</li>
                <li><strong>Use:</strong> Proper test instruments, correct procedures, approved methods.</li>
                <li><strong>Check:</strong> Accurate readings, correct polarity, continuity values within limits.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain the purpose and importance of polarity and continuity testing in electrical installations.</li>
            <li>Identify and correctly use the tools and instruments required for accurate testing procedures.</li>
            <li>Perform polarity and continuity tests to industry standards and BS 7671 requirements.</li>
            <li>Interpret test results accurately and take appropriate corrective action when faults are discovered.</li>
            <li>Apply BS 7671 Part 6 verification requirements correctly during installation and commissioning.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Importance of Testing */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Critical Importance of Installation Testing</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Testing during installation is fundamental to electrical safety and system reliability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Safety and Compliance Benefits</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Prevents dangerous cross-connections:</strong> Identifies reversed polarity before energisation.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Prevents live conductors connected to neutral terminals</li>
                      <li>Ensures protective conductors maintain earth continuity</li>
                      <li>Eliminates shock risk from incorrectly wired accessories</li>
                      <li>Prevents equipment damage from wrong polarity connections</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>BS 7671 Part 6 compliance:</strong> Mandatory initial verification requirements.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Legal requirement for all new electrical installations</li>
                      <li>Required for electrical installation certificates</li>
                      <li>Essential for insurance and warranty validity</li>
                      <li>Demonstrates professional competence and due diligence</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Economic benefits:</strong> Early fault detection prevents costly rework.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identifies problems before system commissioning</li>
                      <li>Prevents equipment damage during first energisation</li>
                      <li>Reduces callback visits and warranty claims</li>
                      <li>Maintains project schedules and client confidence</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional standard:</strong> Systematic testing demonstrates competence and builds client trust
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Testing Tools and Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Professional Testing Tools and Equipment</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Accurate testing requires appropriate instruments and proper calibration:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Essential Testing Instruments</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Low resistance ohmmeter:</strong> Primary instrument for continuity testing.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Test current: Minimum 200mA for accurate readings</li>
                      <li>Resolution: 0.01Ω or better for precise measurements</li>
                      <li>Range: 0-2000Ω typically sufficient for most installations</li>
                      <li>Calibration: Annual calibration certificate required</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Digital multimeter:</strong> Versatile instrument for polarity and continuity testing.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Resistance measurement capability to 0.1Ω resolution</li>
                      <li>Voltage measurement for polarity verification</li>
                      <li>Audible continuity indication for quick checks</li>
                      <li>Safety category rating appropriate for electrical work (CAT III minimum)</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Proving unit:</strong> Essential safety device for instrument verification.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Known resistance values for instrument verification</li>
                      <li>Battery-powered for independent operation</li>
                      <li>Multiple test points for comprehensive checking</li>
                      <li>Regular calibration to maintain accuracy</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Test leads and accessories:</strong> High-quality connections for reliable testing.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Low-resistance test leads with known resistance values</li>
                      <li>Insulated crocodile clips rated for working voltage</li>
                      <li>Sharp probes for secure connections to terminals</li>
                      <li>Temporary links for continuity testing procedures</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Maintenance requirement:</strong> All test equipment must be regularly calibrated and maintained to ensure accuracy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="tools-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Testing Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Professional Testing Procedures</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Systematic procedures ensure accurate results and maintain safety throughout testing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Polarity Testing Procedure</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Pre-test safety checks:</strong> Essential preparation before testing begins.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Isolate circuit completely from all sources of supply</li>
                      <li>Lock off isolation switches and apply warning notices</li>
                      <li>Verify isolation using approved voltage indicator</li>
                      <li>Check proving unit functionality before and after use</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Systematic testing approach:</strong> Methodical verification of all connections.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Test at distribution board: phase to phase, neutral to neutral, earth to earth</li>
                      <li>Verify correct conductor identification throughout installation</li>
                      <li>Test each outlet point: live terminal to live conductor, neutral to neutral</li>
                      <li>Check switching arrangements: ensure switches operate live conductors only</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Special considerations:</strong> Address specific installation requirements.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Two-way switching: verify correct common and strappers</li>
                      <li>Multi-gang accessories: test each gang independently</li>
                      <li>Three-phase installations: verify phase sequence and identification</li>
                      <li>Emergency lighting: check maintained and non-maintained circuits</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Documentation:</strong> Record all test results on appropriate certificates and retain for future reference
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Continuity Testing Procedure</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Circuit preparation:</strong> Ensure safe and accurate testing conditions.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Verify complete isolation from all supply sources</li>
                      <li>Disconnect all loads and electronic devices</li>
                      <li>Remove any parallel paths that could affect readings</li>
                      <li>Check test instrument calibration and lead resistance</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>R1 + R2 method:</strong> Combined testing of line and CPC conductors.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Link line and CPC conductors at distribution board</li>
                      <li>Test between line and CPC terminals at each outlet</li>
                      <li>Record readings for earth fault loop impedance calculations</li>
                      <li>Compare results with design values and cable manufacturer data</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Individual conductor testing:</strong> Verification of each conductor integrity.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Test each conductor separately from end to end</li>
                      <li>Use temporary links to complete circuit under test</li>
                      <li>Account for connector resistances in final calculations</li>
                      <li>Verify readings against expected values based on cable specifications</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Quality assurance:</strong> Double-check any unusual readings and investigate discrepancies immediately
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="isolation-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Results and Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Recording Results and Ensuring Compliance</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Proper documentation and interpretation ensure regulatory compliance and system safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Result Interpretation and Documentation</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Acceptable values:</strong> Establish criteria for pass/fail decisions.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity: Typically &lt;0.05Ω for short runs, calculated for longer circuits</li>
                      <li>Polarity: Correct identification at all connection points</li>
                      <li>R1+R2 values: Must align with earth fault loop impedance requirements</li>
                      <li>Compare all readings with design calculations and manufacturer specifications</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Documentation requirements:</strong> Complete and accurate record keeping.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Record all test results on electrical installation certificate</li>
                      <li>Include instrument details, calibration dates, and test conditions</li>
                      <li>Note any deviations from standard procedures or values</li>
                      <li>Provide clear remedial action records for any failures</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Fault investigation procedures:</strong> Systematic approach to problem solving.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>High resistance readings: Check connections, joints, and cable integrity</li>
                      <li>Open circuits: Locate breaks using sectional testing methods</li>
                      <li>Incorrect polarity: Trace wiring and correct at source of error</li>
                      <li>Intermittent faults: Check for loose connections and poor terminations</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional practice:</strong> Never energise circuits until all tests pass and certificates are complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          {/* Testing Strategy and Planning */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Strategic Testing Approach and Planning</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Pre-Testing Preparation</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Complete visual inspection before any testing to identify obvious errors</li>
                  <li>Verify all circuit documentation and labelling is accurate and up-to-date</li>
                  <li>Ensure test instruments are calibrated and proving unit is functional</li>
                  <li>Plan testing sequence to minimise circuit disruption and maximise efficiency</li>
                  <li>Coordinate with other trades to avoid interference during testing periods</li>
                  <li>Prepare all necessary certificates and documentation templates</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-foreground mb-2">Efficient Testing Techniques</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Use approved temporary links for continuity testing to ensure accurate connections</li>
                  <li>Keep test leads as short as possible to reduce measurement errors</li>
                  <li>Test both ends of long cable runs to confirm no hidden breaks or high resistance joints</li>
                  <li>Remove temporary links immediately after testing to prevent accidental energisation</li>
                  <li>Label circuits clearly once tested to avoid duplication and ensure proper identification</li>
                  <li>Double-check any unusual readings with alternative test methods</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Specialised Testing Considerations</p>
                <ul className="text-xs text-foreground space-y-1 list-disc pl-4">
                  <li>Socket testing: Use dedicated socket testers for initial checks but confirm with multimeter</li>
                  <li>Multi-way switching: Verify correct operation in all switch positions</li>
                  <li>Emergency lighting: Test both maintained and non-maintained circuits separately</li>
                  <li>Data cables: Check continuity and pairing but avoid applying excessive voltage</li>
                  <li>Fire alarm circuits: Follow manufacturer-specific testing procedures</li>
                  <li>Three-phase systems: Verify phase sequence and rotation direction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-Step Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Detailed Step-by-Step Procedures</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium text-foreground mb-2">Standard Polarity Testing Sequence</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Isolate circuit at distribution board and apply lock-off procedures</li>
                  <li>Display warning notices and inform all personnel of testing activities</li>
                  <li>Verify isolation using approved voltage indicator and proving unit</li>
                  <li>Check test instrument functionality using proving unit</li>
                  <li>Test polarity at distribution board: phase-phase, neutral-neutral, earth-earth</li>
                  <li>Work systematically through each outlet point testing appropriate terminals</li>
                  <li>Verify switching arrangements operate live conductors only</li>
                  <li>Check polarity at all accessories including light fittings and control gear</li>
                  <li>Record all results immediately and investigate any discrepancies</li>
                  <li>Re-verify test instrument functionality using proving unit</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-card border border-cyan-400/30">
                <p className="font-medium text-foreground mb-2">Comprehensive Continuity Testing Process</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Ensure complete isolation and remove all loads from circuit</li>
                  <li>Identify start and end points of each conductor to be tested</li>
                  <li>Measure and record test lead resistance for later calculation correction</li>
                  <li>Apply temporary links at distribution board (line to CPC for R1+R2 method)</li>
                  <li>Test between linked conductors at each outlet point in sequence</li>
                  <li>Record readings and calculate actual conductor resistance (subtract lead resistance)</li>
                  <li>Remove temporary links and test individual conductors if required</li>
                  <li>Compare all results with design values and cable specifications</li>
                  <li>Investigate any readings outside acceptable tolerances immediately</li>
                  <li>Complete documentation and prepare for next phase of testing</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-foreground mb-2">Fault Investigation and Resolution</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Identify nature of fault: high resistance, open circuit, or incorrect polarity</li>
                  <li>Use sectional testing to isolate fault location within the circuit</li>
                  <li>Check all accessible connection points for loose or corroded terminals</li>
                  <li>Inspect cable for physical damage, especially at bend points and joints</li>
                  <li>Verify correct conductor identification and termination points</li>
                  <li>Correct fault using appropriate methods and materials</li>
                  <li>Re-test affected circuit section to confirm fault resolution</li>
                  <li>Document fault details and remedial action taken</li>
                  <li>Consider preventive measures to avoid similar faults in future</li>
                  <li>Complete full verification testing before final energisation</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Quality Assurance Framework */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Quality Assurance and Best Practices</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-xs sm:text-sm text-foreground mb-3"><strong>Professional testing standards checklist:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-foreground">
                <div>
                  <p className="font-medium mb-2">Safety Compliance:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ Complete isolation verified before testing</li>
                    <li>□ Lock-off procedures properly applied</li>
                    <li>□ Warning notices displayed throughout</li>
                    <li>□ Test instruments verified before and after use</li>
                    <li>□ All temporary links removed after testing</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Technical Standards:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ All test results within acceptable limits</li>
                    <li>□ Documentation complete and accurate</li>
                    <li>□ Instrument calibration current and valid</li>
                    <li>□ Test procedures follow BS 7671 requirements</li>
                    <li>□ Any faults identified and corrected</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 bg-background/50 rounded border">
                <p className="text-xs text-foreground"><strong>Certification requirement:</strong> No circuit should be energised until testing is complete and certificates signed off.</p>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-card border border-amber-400/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 1: Commercial Socket Circuit Polarity Error</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                On a commercial site, a run of sockets was wired with reversed polarity due to a wiring error at a junction box. The error occurred when cables were extended and the electrician incorrectly identified the conductors. Because systematic polarity testing was performed before energising, the fault was found immediately during the verification process. The resistance readings were correct, but the polarity test revealed live and neutral conductors were swapped. The fault was corrected in minutes by rewiring the junction box connections, avoiding a potential safety hazard and costly rework after energisation.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 2: High Resistance Connection Discovery</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                During continuity testing of a lighting circuit in an office building, one circuit showed unusually high R1+R2 readings (0.8Ω compared to expected 0.3Ω). Investigation revealed a loose connection in a ceiling void where a junction had been poorly made during cable pulling. The high resistance would have caused voltage drop issues and potential overheating once energised. The connection was remade properly and re-tested, showing correct values. This early detection prevented service calls and potential fire hazards.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Case Study 3: Complex Three-Phase Installation Success</strong>
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                A manufacturing facility installation involved 40 three-phase circuits with complex switching arrangements. Systematic polarity and continuity testing identified three phase sequence errors and two earth continuity issues before energisation. The methodical approach, using proper documentation and sequential testing, ensured all circuits were correctly wired. When the facility was commissioned, all equipment operated correctly from day one, with no protection device nuisance tripping or equipment damage. The systematic testing approach saved weeks of fault-finding time.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Can I use a socket tester as my only polarity check?</h4>
              <p className="text-sm text-muted-foreground">A: No — while socket testers are useful for quick checks, BS 7671 requires more detailed testing with calibrated multimeters or approved test instruments for certification purposes.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Do I need to disconnect all loads before testing continuity?</h4>
              <p className="text-sm text-muted-foreground">A: Yes — loads can create parallel paths that affect readings and give false results. All equipment, electronic devices, and accessories should be disconnected before continuity testing.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Is it safe to test continuity on a live circuit?</h4>
              <p className="text-sm text-muted-foreground">A: No — continuity testing must always be performed with the circuit completely isolated. Live circuit testing can damage instruments and create serious safety hazards.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: What should I do if I get inconsistent continuity readings?</h4>
              <p className="text-sm text-muted-foreground">A: Check test lead connections, verify instrument calibration, ensure all parallel paths are disconnected, and investigate for intermittent connections or damaged cables. Inconsistent readings always indicate a problem requiring investigation.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-foreground">
            Polarity and continuity testing ensures that circuits are wired correctly and are electrically sound before energising. Using correct tools, following standard procedures, and recording accurate results are critical for compliance, safety, and professional installation standards. Systematic testing prevents dangerous faults, protects equipment, and demonstrates professional competence in electrical installation work.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (8 Questions)</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Test your understanding of polarity and continuity testing procedures
          </p>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="../5-5" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Dressing Cables Neatly Within Boxes and Enclosures
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-7" className="flex items-center gap-2">
              Next: Making Final Fixes to Accessories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_6;