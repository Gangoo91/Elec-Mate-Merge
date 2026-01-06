import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Zap, Lock, FileCheck, Wrench, TestTube, Tag, BookOpen, Target, Eye, FileText, XCircle, Users, ClipboardList, Settings, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Isolation Process - Step by Step | Level 2 Electrical Course";
const DESCRIPTION = "Master the complete safe isolation procedure with our detailed step-by-step guide. Learn essential safety checks, testing procedures, and professional best practices for electrical work.";

const Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the first step in the safe isolation process?",
      options: [
        "Lock off the isolator",
        "Identify the correct circuit",
        "Test for dead",
        "Inform others"
      ],
      correctAnswer: 1,
      explanation: "The first step is to identify the correct circuit using the circuit schedule, labelling, or confirmation with colleagues to ensure you're working on the right circuit."
    },
    {
      id: 2,
      question: "Why is it essential to prove your tester both before and after use?",
      options: [
        "To comply with regulations",
        "To check the battery level",
        "To confirm the tester works and didn't fail during testing",
        "To save the tester settings"
      ],
      correctAnswer: 2,
      explanation: "Testing before and after confirms the tester is working correctly and didn't fail during use, which could lead to false readings and potential fatal errors."
    },
    {
      id: 3,
      question: "What tool must be used to test for dead?",
      options: [
        "Multimeter",
        "GS38-compliant two-pole voltage tester",
        "Neon screwdriver",
        "Phase rotation meter"
      ],
      correctAnswer: 1,
      explanation: "A GS38-compliant two-pole voltage tester must be used to test for dead, as it meets the safety requirements for electrical testing."
    },
    {
      id: 4,
      question: "Why should the isolator be locked off?",
      options: [
        "To prevent theft",
        "To comply with building regulations",
        "To prevent accidental re-energising",
        "To mark ownership"
      ],
      correctAnswer: 2,
      explanation: "Locking off prevents others from accidentally or deliberately switching the circuit back on while work is in progress, which could cause serious injury or death."
    },
    {
      id: 5,
      question: "True or False: It's okay to share a lock-off key with a teammate.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Each person working on the circuit must use their own lock and keep their own key. Sharing keys compromises the safety of the isolation system."
    },
    {
      id: 6,
      question: "In what sequence must conductors be tested for dead?",
      options: [
        "Line to neutral only",
        "Line to earth, then neutral to earth",
        "Line to neutral, line to earth, neutral to earth",
        "Any order is acceptable"
      ],
      correctAnswer: 2,
      explanation: "All three combinations must be tested: Line to neutral, line to earth, and neutral to earth. This ensures complete verification that the circuit is dead."
    },
    {
      id: 7,
      question: "What is a potential source of backfeed in electrical installations?",
      options: [
        "Borrowed neutrals from other circuits",
        "Solar PV systems",
        "UPS systems",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "All of these can be sources of backfeed. Borrowed neutrals, solar PV systems, and UPS systems can all energise circuits that appear to be isolated."
    },
    {
      id: 8,
      question: "When using a group lock-off box, what must each electrician do?",
      options: [
        "Share one key between the team",
        "Place their own individual lock on the box",
        "Sign a register only",
        "Take turns with the isolation"
      ],
      correctAnswer: 1,
      explanation: "Each electrician must place their own individual lock on the group lock-off box. This ensures no one can re-energise the circuit until all workers are finished."
    },
    {
      id: 9,
      question: "What information should be recorded in isolation documentation?",
      options: [
        "Circuit reference and isolator location only",
        "Test results and equipment serial numbers only",
        "Circuit details, test results, equipment serials, and signatures",
        "Just the date and time of isolation"
      ],
      correctAnswer: 2,
      explanation: "Complete documentation should include circuit reference, isolator location, test results, equipment serial numbers, signatures, and date/time."
    },
    {
      id: 10,
      question: "What should you do if your lock-off device doesn't fit the isolator?",
      options: [
        "Use tape to secure the isolator",
        "Find an appropriate lock-off device or alternative isolator",
        "Work without locking off if it's quick work",
        "Ask someone else to hold the switch"
      ],
      correctAnswer: 1,
      explanation: "Never compromise on lock-off. Find the correct lock-off device for that isolator type or use an alternative suitable isolator that can be properly secured."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 5.3
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                The Safe Isolation Process – Step by Step
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                A comprehensive guide to the complete safe isolation procedure
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Safe isolation:</strong> 7-step systematic process for electrical safety.</li>
                <li><strong>Sequential steps:</strong> Each builds on the previous for complete protection.</li>
                <li><strong>Testing protocol:</strong> Prove-before and prove-after are critical.</li>
                <li><strong>Documentation:</strong> Record every step and result.</li>
                <li><strong>No shortcuts:</strong> Every step is essential for safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Skipped steps, wrong circuits, missing locks, untested testers.</li>
                <li><strong>Use:</strong> Complete 7-step sequence, proper equipment, full testing.</li>
                <li><strong>Apply:</strong> Systematic approach every time, no exceptions.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Master the complete 7-step safe isolation procedure</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand critical testing requirements and sequences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise backfeed scenarios and special considerations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply proper documentation and permit-to-work procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Develop systematic approaches to prevent common mistakes</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Step-by-Step Procedure */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Complete Safe Isolation Procedure</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                The 7-step safe isolation process must be followed systematically every time. Each step is designed to build on the previous one, creating multiple layers of protection.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-foreground">The Complete 7-Step Process:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Identify the Circuit</h5>
                    <p className="text-muted-foreground text-sm">Use circuit schedules, labels, and confirm with others</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Switch Off and Isolate</h5>
                    <p className="text-muted-foreground text-sm">Turn off the correct isolator or MCB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Secure and Lock Off</h5>
                    <p className="text-muted-foreground text-sm">Apply lock-off device and retain the key</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Post Warning Notices</h5>
                    <p className="text-muted-foreground text-sm">Attach "Do Not Operate" tags at isolation points</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">5</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Prove Tester Before Use</h5>
                    <p className="text-muted-foreground text-sm">Test voltage tester on proving unit or known live supply</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">6</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Test for Dead</h5>
                    <p className="text-muted-foreground text-sm">Test all conductor combinations: L-N, L-E, N-E</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">7</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Re-prove Tester After Use</h5>
                    <p className="text-muted-foreground text-sm">Confirm tester still works on proving unit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check */}
        <div className="mb-8">
          <InlineCheck
            id="isolation-sequence"
            question="What must you do with your voltage tester immediately BEFORE and AFTER testing for dead?"
            options={[
              "Calibrate it using a multimeter",
              "Prove it works using a proving unit or known live supply",
              "Check the battery level",
              "Clean the test probes"
            ]}
            correctIndex={1}
            explanation="You must prove your tester works using a proving unit both before testing (to ensure it will detect voltage) and after testing (to confirm it didn't fail during the test). This is critical for safety."
          />
        </div>

        {/* Section 2: Testing Matrix */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Testing Matrix & Prove-Before/After Protocol</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 border border-elec-yellow/30 border-elec-yellow/20 rounded-lg p-4">
              <p className="font-medium text-elec-yellow dark:text-elec-yellow mb-3">
                Testing for dead requires specific combinations and strict prove-before/prove-after protocol to ensure complete safety.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-foreground">Single-Phase Testing Matrix:</h4>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div className="text-center">
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="font-medium">Line ↔ Neutral</p>
                    <p className="text-sm text-muted-foreground">Test 1</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="font-medium">Line ↔ Earth</p>
                    <p className="text-sm text-muted-foreground">Test 2</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="font-medium">Neutral ↔ Earth</p>
                    <p className="text-sm text-muted-foreground">Test 3</p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Three-Phase Systems:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Test all six phase combinations (L1-L2, L1-L3, L2-L3)</li>
                    <li>• Include neutral where present (L1-N, L2-N, L3-N)</li>
                    <li>• Test each phase to earth (L1-E, L2-E, L3-E)</li>
                    <li>• Include neutral to earth (N-E) if applicable</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Prove Protocol:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prove tester works on known live supply</li>
                    <li>• Perform all required dead tests</li>
                    <li>• Re-prove tester on same known supply</li>
                    <li>• Both proves must confirm voltage presence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Backfeed Scenarios */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Backfeed Scenarios & Special Considerations</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="font-medium text-purple-800 dark:text-purple-200 mb-3">
                Backfeed occurs when circuits receive power from unexpected sources, making them dangerous even when apparently isolated.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Common Backfeed Sources:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Borrowed neutrals from other circuits</li>
                    <li>• Solar PV installations</li>
                    <li>• UPS systems and emergency supplies</li>
                    <li>• Generator changeover systems</li>
                    <li>• Interconnected lighting circuits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Detection Methods:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Test all conductor combinations</li>
                    <li>• Check circuit drawings carefully</li>
                    <li>• Look for emergency supplies</li>
                    <li>• Identify solar/generator systems</li>
                    <li>• Question unusual test readings</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Special Circuit Considerations:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                    <li>• <strong>Capacitive circuits:</strong> May retain charge after isolation</li>
                    <li>• <strong>Motor circuits:</strong> Check for back-EMF generation</li>
                  </ul>
                  <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                    <li>• <strong>Control circuits:</strong> May have multiple supply sources</li>
                    <li>• <strong>Fire alarm systems:</strong> Often have battery backup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Documentation & PTW */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Documentation & Permit-to-Work Systems</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-3">
                Proper documentation protects both the electrician and employer, providing legal evidence of safe working practices.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Essential Documentation:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Circuit reference and description</li>
                    <li>• Isolator location and type</li>
                    <li>• Test results for all conductors</li>
                    <li>• Equipment serial numbers</li>
                    <li>• Date, time, and signatures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Permit-to-Work Content:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Work description and location</li>
                    <li>• Hazards identified and controls</li>
                    <li>• Personnel authorised to work</li>
                    <li>• Start and expected finish times</li>
                    <li>• Handback procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Practical Tips */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Practical On-Site Workflow Tips</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">
                Practical workflow management ensures safe isolation procedures are maintained even in busy, complex work environments.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Work Sequencing:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Plan isolation sequence in advance</li>
                    <li>• Consider impact on other workers</li>
                    <li>• Coordinate with site activities</li>
                    <li>• Allow time for proper procedures</li>
                    <li>• Never rush isolation steps</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Handling Interruptions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Complete isolation before stopping</li>
                    <li>• Secure work area if leaving</li>
                    <li>• Brief replacement personnel</li>
                    <li>• Re-verify isolation on return</li>
                    <li>• Update documentation accordingly</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Group Lock-Off Best Practice:</h4>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm font-medium">Setup Phase:</p>
                    <ul className="text-xs text-muted-foreground">
                      <li>• Appointed person controls box</li>
                      <li>• Each worker adds own lock</li>
                      <li>• Master key secured in box</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">During Work:</p>
                    <ul className="text-xs text-muted-foreground">
                      <li>• No one can remove master key</li>
                      <li>• Individual responsibility maintained</li>
                      <li>• Clear communication essential</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completion:</p>
                    <ul className="text-xs text-muted-foreground">
                      <li>• Each person removes own lock</li>
                      <li>• Last person gets master key</li>
                      <li>• System can be re-energised</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Common Mistakes */}
        <div className="mb-8 border-l-4 border-rose-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Mistakes & How to Fix Them</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
              <p className="font-medium text-rose-800 dark:text-rose-200 mb-3">
                Learning from common mistakes helps prevent dangerous situations and reinforces the importance of systematic procedures.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">❌ Wrong Isolator Selected</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-red-700 dark:text-elec-yellow"><strong>Problem:</strong> Using local switches instead of main isolators</p>
                      <p className="text-sm text-green-700 dark:text-green-300"><strong>Solution:</strong> Always isolate at the source, use circuit drawings</p>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">❌ Skipping Re-Prove Step</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-red-700 dark:text-elec-yellow"><strong>Problem:</strong> Not testing tester after dead tests</p>
                      <p className="text-sm text-green-700 dark:text-green-300"><strong>Solution:</strong> Always re-prove - tester may have failed</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">❌ Incomplete Testing</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-red-700 dark:text-elec-yellow"><strong>Problem:</strong> Testing only line to neutral</p>
                      <p className="text-sm text-green-700 dark:text-green-300"><strong>Solution:</strong> Test all combinations: L-N, L-E, N-E</p>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">❌ Inadequate Lock-Off</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-red-700 dark:text-elec-yellow"><strong>Problem:</strong> Using tape or temporary measures</p>
                      <p className="text-sm text-green-700 dark:text-green-300"><strong>Solution:</strong> Use proper mechanical lock-off devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Case Studies */}
        <div className="mb-8 border-l-4 border-violet-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real-World Case Studies</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
              <p className="font-medium text-violet-800 dark:text-violet-200 mb-3">
                Real incidents demonstrate why each step of the safe isolation process is crucial - shortcuts can have serious consequences.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Case 1: Office Refurbishment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Electrician working on lighting circuit in office building. Circuit schedule showed 
                    simple radial circuit, but emergency lighting shared the same neutral.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">What Went Wrong:</p>
                      <ul className="text-xs text-muted-foreground">
                        <li>• Only tested line to neutral</li>
                        <li>• Didn't test neutral to earth</li>
                        <li>• Emergency supply created neutral voltage</li>
                        <li>• Received shock when touching neutral</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                      <strong className="text-white">Result:</strong> 
                      <span className="text-emerald-50"> Full testing sequence would have detected live neutral from emergency circuit.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Case 2: Factory Maintenance</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Team working on conveyor system. Used group lock-off box but one electrician 
                    removed his lock early to get tools from van.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">What Went Wrong:</p>
                      <ul className="text-xs text-muted-foreground">
                        <li>• Early lock removal compromised system</li>
                        <li>• Another electrician still working</li>
                        <li>• Supervisor re-energised thinking work complete</li>
                        <li>• Working electrician narrowly avoided injury</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                      <strong className="text-white">Result:</strong> 
                      <span className="text-emerald-50"> Lock-off procedures now include mandatory check-out process before removal.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Case 3: Solar PV Installation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Electrician testing consumer unit circuits during solar PV maintenance. 
                    Forgot to isolate DC side of inverter system.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">What Went Wrong:</p>
                      <ul className="text-xs text-muted-foreground">
                        <li>• AC isolator switched off only</li>
                        <li>• DC supply still feeding inverter</li>
                        <li>• Inverter created AC backfeed</li>
                        <li>• Circuit appeared dead but wasn't</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                      <strong className="text-white">Result:</strong> 
                      <span className="text-emerald-50"> Now requires isolation of both AC and DC sides, plus specific PV isolation training.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Summary */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Module Summary</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Takeaways:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Safe isolation is a systematic 7-step process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Every step is critical - no shortcuts allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Testing must include all conductor combinations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Prove-before and prove-after testing is mandatory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Documentation protects both worker and employer</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Remember Always:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Identify circuit correctly using multiple methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Use proper lock-off devices, never temporary measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Watch for backfeed from alternative supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>Keep detailed records of all procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>When in doubt, get help from experienced colleagues</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section5_3;