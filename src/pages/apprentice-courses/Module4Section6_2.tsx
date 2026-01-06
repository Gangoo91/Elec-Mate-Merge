import { ArrowLeft, ArrowRight, TestTube, Target, CheckCircle, AlertTriangle, Search, TrendingUp, Shield, Zap, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity and Polarity Checks (Functional, Non-Certified) - Module 4.6.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master functional continuity and polarity testing techniques for electrical installations. Learn to verify circuit integrity and correct conductor connections before formal certification testing.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does \"continuity\" mean in electrical installation?",
    options: ["High voltage capability", "Unbroken electrical path", "Circuit switching ability", "Cable insulation strength"],
    correctIndex: 1,
    explanation: "Continuity refers to an unbroken, consistent electrical path through a conductor, ensuring proper electrical connection from one end to the other."
  },
  {
    id: 2,
    question: "Why is polarity important for safety?",
    options: ["For aesthetic reasons", "To prevent live parts on equipment casings", "To reduce installation costs", "For easier maintenance"],
    correctIndex: 1,
    explanation: "Correct polarity ensures live and neutral conductors are connected to proper terminals, preventing dangerous situations like live metal parts on appliance casings."
  },
  {
    id: 3,
    question: "Name one tool used for checking continuity.",
    options: ["Voltage indicator", "Continuity tester", "Current clamp", "Power analyser"],
    correctIndex: 1,
    explanation: "Continuity testers or low-resistance ohmmeters are used to verify unbroken electrical paths through conductors and protective circuits."
  }
];

const Module4Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is continuity?",
      options: [
        "The ability of a cable to carry high voltage",
        "An unbroken path in an electrical circuit",
        "The switching of polarity in a circuit",
        "The insulation resistance of a conductor"
      ],
      correctAnswer: 1,
      explanation: "Continuity refers to an unbroken electrical path in a circuit, ensuring proper electrical connection throughout the conductor."
    },
    {
      id: 2,
      question: "True or False: Polarity checks confirm that conductors are connected to the correct terminals.",
      options: [
        "True",
        "False",
        "Only for domestic installations",
        "Only for industrial installations"
      ],
      correctAnswer: 0,
      explanation: "True - Polarity checks verify that live, neutral, and earth conductors are connected to their designated terminals."
    },
    {
      id: 3,
      question: "Name one common fault discovered during a polarity check.",
      options: [
        "Reversed line and neutral conductors",
        "High insulation resistance",
        "Low current capacity",
        "Excessive voltage drop"
      ],
      correctAnswer: 0,
      explanation: "Reversed or swapped line and neutral conductors are commonly discovered during polarity checks and create serious safety hazards."
    },
    {
      id: 4,
      question: "What reading would you expect on a continuity tester for a good connection?",
      options: [
        "High resistance (mega-ohms)",
        "Close to zero ohms",
        "Infinite resistance",
        "Variable resistance"
      ],
      correctAnswer: 1,
      explanation: "A good continuous connection should show close to zero ohms resistance, indicating an unbroken electrical path."
    },
    {
      id: 5,
      question: "Which BS 7671 section covers inspection and testing?",
      options: [
        "Part 4",
        "Part 6",
        "Part 7",
        "Part 1"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Part 6 covers inspection and testing requirements for electrical installations."
    },
    {
      id: 6,
      question: "Why is sleeving used on switched live conductors?",
      options: [
        "To identify the conductor as live when switched on",
        "To improve insulation properties",
        "To reduce installation costs",
        "For aesthetic purposes only"
      ],
      correctAnswer: 0,
      explanation: "Sleeving (typically brown) identifies switched live conductors, making it clear which conductor becomes live when the switch is operated."
    },
    {
      id: 7,
      question: "What should you do before carrying out a continuity test?",
      options: [
        "Energise the circuit",
        "Isolate the circuit and verify isolation",
        "Connect test equipment only",
        "Check circuit ratings first"
      ],
      correctAnswer: 1,
      explanation: "Always isolate the circuit using appropriate switching and verify isolation with an approved voltage indicator before testing."
    },
    {
      id: 8,
      question: "True or False: Functional checks replace the need for full certification testing.",
      options: [
        "True",
        "False",
        "Only for simple circuits",
        "Only for experienced electricians"
      ],
      correctAnswer: 1,
      explanation: "False - Functional checks are preliminary tests that supplement but do not replace formal certification testing required under BS 7671."
    }
  ];

  const faqs = [
    {
      question: "Can I do polarity checks with the power on?",
      answer: "No — these are performed with the circuit safely isolated. Never attempt polarity or continuity checks on energised circuits as this creates serious safety hazards."
    },
    {
      question: "Are continuity and polarity checks recorded on the installation certificate?",
      answer: "Formal test results are recorded on certificates; basic functional checks are usually noted in site records for quality assurance and fault tracking purposes."
    },
    {
      question: "If I find a break in continuity, what's the next step?",
      answer: "Locate and repair the fault before progressing to formal testing. Document the fault location and corrective action taken for site records."
    },
    {
      question: "How often should functional checks be performed during installation?",
      answer: "Best practice is to test each circuit and accessory as it is installed, rather than waiting until the end of the job. This makes fault finding much easier."
    },
    {
      question: "What's the difference between functional and certification testing?",
      answer: "Functional checks are preliminary verification tests during installation, while certification testing follows formal BS 7671 procedures with calibrated instruments and documented results."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
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
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <TestTube className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.6.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Continuity and Polarity Checks (Functional, Non-Certified)
          </h1>
          <p className="text-white">
            Master functional testing techniques to verify circuit integrity and correct conductor connections before formal certification testing.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Functional checks verify continuity and polarity before formal testing begins.</li>
                <li>These preliminary tests identify wiring faults early in the installation process.</li>
                <li>Proper checks prevent equipment damage and ensure safety before energisation.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Conductor breaks, incorrect connections, polarity errors.</li>
                <li><strong>Use:</strong> Continuity testers, systematic checking methods, isolation procedures.</li>
                <li><strong>Check:</strong> Zero resistance paths, correct terminal connections, safety compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Define continuity and polarity in the context of electrical circuits and understand their safety implications.</li>
            <li>Perform basic functional continuity tests on conductors and circuit protective conductors (CPCs).</li>
            <li>Verify polarity of outlets, switches, and light fittings using appropriate testing methods.</li>
            <li>Recognise common faults found during functional checks and understand their potential consequences.</li>
            <li>Understand when to escalate from basic functional checks to formal certification testing procedures.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Understanding Continuity */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding Continuity and Its Critical Importance</h3>
            <p className="text-base text-white mb-4">
              Continuity testing verifies the integrity of electrical connections throughout circuits, ensuring safe and reliable operation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Continuity Fundamentals and Testing Principles</p>
                    <p className="text-base text-white mb-2"><strong>Definition and importance:</strong> Continuity ensures unbroken electrical paths through conductors.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Unbroken, consistent electrical path through conductors from origin to termination point</li>
                      <li>Essential for proper current flow and protection system operation</li>
                      <li>Critical for circuit protective conductor (CPC) effectiveness in fault conditions</li>
                      <li>Fundamental requirement for safe equipment operation and personnel protection</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Testing methodology:</strong> Low-resistance measurement techniques for accurate assessment.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Low-resistance ohmmeters provide accurate continuity measurements</li>
                      <li>Continuity testers offer simple pass/fail indication for basic checks</li>
                      <li>Test current typically 200mA or greater to overcome contact resistance</li>
                      <li>Resistance readings should be close to zero ohms for good continuity</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Circuit protective conductor priority:</strong> CPC continuity is critical for safety systems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ensures effective fault current path for protective device operation</li>
                      <li>Maintains equipotential bonding throughout installation</li>
                      <li>Prevents dangerous voltages on exposed conductive parts</li>
                      <li>Required for automatic disconnection of supply in fault conditions</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety critical:</strong> CPC continuity failures can result in dangerous touch voltages during fault conditions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Understanding Polarity */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding Polarity and Connection Verification</h3>
            <p className="text-base text-white mb-4">
              Polarity verification ensures conductors are connected to their designated terminals, preventing safety hazards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Polarity Verification and Safety Requirements</p>
                    <p className="text-base text-white mb-2"><strong>Polarity definition and significance:</strong> Correct conductor-to-terminal relationships for safe operation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Live (line) conductors connected to designated live terminals</li>
                      <li>Neutral conductors connected to designated neutral terminals</li>
                      <li>Circuit protective conductors connected to earth terminals</li>
                      <li>Switched live conductors properly identified and connected</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety implications of polarity errors:</strong> Incorrect connections create serious hazards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Live metal parts on equipment casings creating shock risk</li>
                      <li>Protective devices may not operate correctly in fault conditions</li>
                      <li>Equipment damage due to incorrect voltage application</li>
                      <li>Fire risk from overheating caused by incorrect connections</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Common polarity error scenarios:</strong> Typical mistakes requiring verification.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Swapped line and neutral at socket outlets or accessories</li>
                      <li>Reversed connections at distribution board terminals</li>
                      <li>Incorrect switch connections in lighting circuits</li>
                      <li>Mixed up earth and neutral conductors during installation</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical verification:</strong> All conductor connections must be verified before energisation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="polarity-safety-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Testing Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Systematic Testing Procedures and Best Practices</h3>
            <p className="text-base text-white mb-4">
              Following structured procedures ensures comprehensive verification while maintaining safety throughout testing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Professional Testing Procedures and Safety Protocols</p>
                    <p className="text-base text-white mb-2"><strong>Continuity testing procedure:</strong> Systematic approach for reliable results.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Isolate circuit using main switch or appropriate protective device</li>
                      <li>Verify isolation using approved voltage indicator and proving unit</li>
                      <li>Connect continuity tester between both ends of conductor under test</li>
                      <li>Record resistance readings - should be near zero ohms for good continuity</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Polarity verification procedure:</strong> Confirming correct conductor connections.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>With circuit safely isolated, identify conductors at each accessory</li>
                      <li>Verify line conductor connection to live terminal (typically L or phase)</li>
                      <li>Confirm neutral conductor connection to neutral terminal (typically N)</li>
                      <li>Check CPC connection to earth terminal (typically E or earth symbol)</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Lighting circuit special considerations:</strong> Additional verification requirements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ensure switched live is correctly identified with brown sleeving</li>
                      <li>Verify switch connections for proper control of live conductor</li>
                      <li>Check that neutral remains unswitched throughout circuit</li>
                      <li>Confirm earth continuity to all metallic light fittings</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Documentation and recording:</strong> Maintaining accurate test records.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Record all test results with circuit identification details</li>
                      <li>Document any faults found and corrective actions taken</li>
                      <li>Note test equipment used and calibration status</li>
                      <li>Maintain site records for quality assurance and future reference</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety first:</strong> Never attempt testing on energised circuits - always isolate and verify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-tools-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Issues and Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Issues and Fault Identification</h3>
            <p className="text-base text-white mb-4">
              Understanding typical faults helps rapid identification and efficient resolution during functional testing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Typical Installation Faults and Resolution Strategies</p>
                    <p className="text-base text-white mb-2"><strong>Continuity-related faults:</strong> Common breaks and connection issues.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Broken CPC connections in socket ring final circuits affecting protection</li>
                      <li>Damaged conductors due to poor installation techniques or subsequent damage</li>
                      <li>Loose terminations causing high resistance connections</li>
                      <li>Incorrect conductor routing leading to stress and breakage</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Polarity-related faults:</strong> Incorrect conductor connections and identification.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Swapped neutral and earth conductors creating dangerous conditions</li>
                      <li>Reversed line and neutral at accessories compromising safety</li>
                      <li>Missing identification sleeving on switched live conductors</li>
                      <li>Incorrect terminal connections at distribution boards</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Installation quality issues:</strong> Workmanship-related problems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Poor termination techniques leading to unreliable connections</li>
                      <li>Inadequate conductor preparation causing connection problems</li>
                      <li>Incorrect use of terminals or connection methods</li>
                      <li>Damage during installation or subsequent building work</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Early detection:</strong> Functional testing identifies problems before they become safety hazards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          {/* Tools and Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Essential Tools and Equipment for Effective Testing</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Required Testing Equipment</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Continuity tester or low-resistance ohmmeter for accurate resistance measurement</li>
                  <li>Multimeter with continuity function for versatile testing capabilities</li>
                  <li>Approved voltage indicator for safe isolation verification</li>
                  <li>Proving unit to verify voltage indicator operation</li>
                  <li>Insulated test leads rated for the voltage levels involved</li>
                  <li>Test probe with appropriate safety rating and sharp points for good contact</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-white mb-2">Professional Testing Techniques</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Label conductors before disconnection during installation to speed up testing</li>
                  <li>Test each accessory as it is installed rather than waiting until project completion</li>
                  <li>Use systematic approach working from distribution board to final points</li>
                  <li>Document all test results immediately to avoid errors and omissions</li>
                  <li>Verify test equipment operation before and after use</li>
                  <li>Maintain clean, good contact points for accurate readings</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium text-white mb-2">Field Testing Best Practices</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Always isolate circuits completely before attempting any testing</li>
                  <li>Use lock-off procedures to prevent accidental re-energisation</li>
                  <li>Start with visual inspection before applying test equipment</li>
                  <li>Work systematically to avoid missing circuits or connections</li>
                  <li>Re-test after making any corrections or repairs</li>
                  <li>Keep detailed records for troubleshooting and quality assurance</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What this means on site</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-white mb-2">Immediate Implementation</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Integrate functional testing into installation workflow</li>
                  <li>Test circuits progressively as installation proceeds</li>
                  <li>Use appropriate isolation and verification procedures</li>
                  <li>Document findings and corrective actions taken</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <h3 className="font-medium text-white mb-2">Quality Assurance</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Establish systematic testing procedures for consistency</li>
                  <li>Train team members in proper functional testing techniques</li>
                  <li>Maintain calibrated test equipment in good working order</li>
                  <li>Review and analyse fault patterns for process improvement</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <h3 className="font-medium text-white mb-2">Project Scheduling</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Allocate time for functional testing in project schedules</li>
                  <li>Plan testing stages to align with installation milestones</li>
                  <li>Schedule fault correction work to minimise project delays</li>
                  <li>Coordinate with formal testing and certification requirements</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-white mb-2">Communication</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Report functional test results to project management</li>
                  <li>Communicate fault findings to installation team promptly</li>
                  <li>Document lessons learned for future project improvement</li>
                  <li>Coordinate with certification testing requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Installation Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Installation Practices</h2>
          <div className="space-y-6">
            <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Best Practice Implementation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Progressive Testing Strategy</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Test circuits as installation progresses</li>
                    <li>Verify each accessory before moving to the next</li>
                    <li>Check distribution board connections systematically</li>
                    <li>Re-test after any modifications or repairs</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Fault Prevention Methods</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Use proper conductor identification throughout</li>
                    <li>Apply correct termination techniques consistently</li>
                    <li>Protect cables during subsequent building work</li>
                    <li>Maintain clean, secure connections at all times</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
              <h3 className="font-medium text-elec-yellow text-elec-yellow mb-3">Professional Standards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Testing Documentation</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Record all test results with circuit identification</li>
                    <li>Document equipment used and calibration status</li>
                    <li>Note any faults found and corrective actions</li>
                    <li>Maintain records for quality assurance purposes</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Safety Procedures</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Always isolate circuits before testing</li>
                    <li>Use appropriate personal protective equipment</li>
                    <li>Verify isolation with approved voltage indicators</li>
                    <li>Follow lock-off procedures to prevent re-energisation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-red-600 text-elec-yellow mb-3">Testing Procedure Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">❌ Avoid These Mistakes:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Testing circuits without proper isolation</li>
                    <li>Using uncalibrated or damaged test equipment</li>
                    <li>Skipping continuity checks on protective conductors</li>
                    <li>Ignoring high resistance readings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">✅ Do This Instead:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Always isolate and verify before testing</li>
                    <li>Use properly calibrated test equipment</li>
                    <li>Test all protective conductors thoroughly</li>
                    <li>Investigate and resolve any unusual readings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">Installation and Documentation Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">❌ Poor Practices:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Leaving conductor identification until the end</li>
                    <li>Poor recording of test results and findings</li>
                    <li>Rushing through testing to meet deadlines</li>
                    <li>Not re-testing after making corrections</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">✅ Professional Approach:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Label conductors during installation process</li>
                    <li>Document all results clearly and immediately</li>
                    <li>Allow adequate time for thorough testing</li>
                    <li>Always verify repairs with re-testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-medium text-white mb-2">Regulatory Framework</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-4">
                <li><strong>Part 6:</strong> Inspection and Testing requirements including continuity and polarity verification</li>
                <li><strong>Regulation 612.2:</strong> Continuity of protective conductors including main and supplementary bonding</li>
                <li><strong>Regulation 612.3:</strong> Continuity of ring final circuit conductors</li>
                <li><strong>Regulation 612.4:</strong> Insulation resistance testing requirements</li>
                <li><strong>Regulation 612.5:</strong> Polarity testing for all circuits and accessories</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Testing Standards and Procedures</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-4">
                <li>IET Guidance Note 3 provides detailed testing procedures and acceptable values</li>
                <li>Minimum test current of 200mA for continuity testing to overcome contact resistance</li>
                <li>Maximum acceptable resistance values for different conductor sizes and lengths</li>
                <li>Documentation requirements for test results and certification</li>
                <li>Remedial action requirements when test results exceed acceptable limits</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-world Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world Scenario</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">School Refurbishment Project - Critical Continuity Fault Discovery</h3>
              <div className="space-y-3">
                <p className="text-base text-white">
                  <strong>Situation:</strong> During a comprehensive school refurbishment project, functional continuity testing was performed on each circuit as installation progressed. The project involved rewiring multiple classrooms with new socket circuits and updated lighting systems.
                </p>
                <p className="text-base text-white">
                  <strong>Discovery:</strong> A continuity check on the classroom socket ring circuit revealed a break in the circuit protective conductor (CPC) between two sockets. The initial reading showed infinite resistance instead of the expected near-zero value.
                </p>
                <p className="text-base text-white">
                  <strong>Investigation:</strong> Systematic testing traced the fault to a poorly crimped earth connection inside a junction box that had been hidden behind a wall panel. The crimp had failed, leaving the protective conductor open circuit.
                </p>
                <p className="text-base text-white">
                  <strong>Resolution:</strong> The junction box was accessed, and the faulty crimp connection was remade properly. Continuity testing confirmed the repair, and the circuit was fully functional before the formal testing phase.
                </p>
                <p className="text-base text-white">
                  <strong>Additional Case:</strong> On a domestic rewire, polarity checking revealed line and neutral conductors swapped at a kitchen socket. This fault would have created live chassis on appliances, posing serious shock risk. Early detection prevented a dangerous situation.
                </p>
                <div className="rounded-lg p-3 border border-green-400/30 mt-3">
                  <p className="text-xs sm:text-sm text-white font-medium">
                    💡 Key Learning: Functional testing during installation saves time and money by identifying faults when they are easier to access and repair, before final installation is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-muted/30 border border-white/10">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-xs sm:text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-4">
            <p className="text-base text-white">
              Functional continuity and polarity checks are essential preliminary tests that verify circuit integrity and correct conductor connections before formal certification testing. These checks identify installation faults early when they are easier and less expensive to correct.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-elec-yellow text-elec-yellow mb-2">Safety Benefits</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Early fault identification</li>
                  <li>Prevention of safety hazards</li>
                  <li>Equipment protection</li>
                  <li>Reduced shock risk</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Quality Assurance</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Progressive quality control</li>
                  <li>Systematic fault detection</li>
                  <li>Installation verification</li>
                  <li>Professional standards</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-purple-600 text-elec-yellow mb-2">Project Efficiency</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Reduced rework costs</li>
                  <li>Faster fault resolution</li>
                  <li>Improved project timelines</li>
                  <li>Enhanced reliability</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600 dark:text-green-400">✅ DO</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Always isolate circuits completely before attempting any testing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use proper test equipment and verify its operation before use
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Test each circuit and accessory as installation progresses
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Document all test results and findings immediately
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Re-test after making any corrections or repairs
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-red-600 text-elec-yellow">❌ DON'T</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Attempt testing on energised circuits - always isolate first
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Ignore unusual readings or assume they will resolve themselves
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Rush through testing to meet project deadlines
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Rely on visual inspection alone - always verify with testing
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Assume functional checks replace formal certification testing
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card Quick Reference */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Card Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-medium text-white mb-3">Functional Testing Checklist</h3>
              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                <li>✓ Circuit isolated and isolation verified</li>
                <li>✓ Continuity check: Line, Neutral, CPC</li>
                <li>✓ Resistance readings near zero ohms</li>
                <li>✓ Polarity check: Correct terminal connections</li>
                <li>✓ CPC continuity throughout circuit</li>
                <li>✓ Switched live properly identified</li>
                <li>✓ All test results documented</li>
                <li>✓ Any faults corrected and re-tested</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Test Equipment Essentials</h3>
              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                <li>🔧 Continuity tester or low-resistance ohmmeter</li>
                <li>📊 Multimeter with continuity function</li>
                <li>⚡ Approved voltage indicator</li>
                <li>✅ Proving unit for voltage indicator</li>
                <li>🔌 Insulated test leads (appropriate rating)</li>
                <li>📝 Test result recording sheets</li>
                <li>🔒 Lock-off devices for isolation</li>
                <li>🏷️ Conductor identification labels</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key References</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-white mb-2">Regulatory Standards</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                <li>BS 7671:2018+A2:2022 - Part 6 Inspection and Testing</li>
                <li>IET Guidance Note 3 - Inspection & Testing</li>
                <li>IET On-Site Guide - Testing procedures</li>
                <li>Electricity at Work Regulations 1989</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Technical Guidance</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                <li>IET Guidance Note 1 - Selection & Erection</li>
                <li>City & Guilds 2391 Testing Course Materials</li>
                <li>NICEIC Technical Bulletins</li>
                <li>ECA Best Practice Guides</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-white/10">
          <Button asChild variant="outline">
            <Link to="../6-1" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-3" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_2;