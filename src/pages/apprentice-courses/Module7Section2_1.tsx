import { ArrowLeft, ArrowRight, Search, Lightbulb, AlertTriangle, CheckCircle, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_1 = () => {
  useSEO(
    "Open Circuit Faults - Level 2 Module 7 Section 2.1",
    "Understanding detection, causes, and rectification of open circuit faults"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is an open circuit fault?",
      options: [
        "When two conductors touch each other",
        "When a conductor is broken or disconnected, preventing current flow",
        "When current flows to earth",
        "When voltage is too high"
      ],
      correctAnswer: 1,
      explanation: "An open circuit fault occurs when the intended path of current is broken, preventing electricity from flowing properly."
    },
    {
      id: 2,
      question: "What happens to current flow when a conductor is broken?",
      options: [
        "Current increases dramatically",
        "Current flows to earth",
        "Current cannot complete its path",
        "Current flows backwards"
      ],
      correctAnswer: 2,
      explanation: "When a conductor is broken or disconnected, current cannot complete its circuit path, so no current flows."
    },
    {
      id: 3,
      question: "Which of these is a common cause of open circuit faults?",
      options: [
        "Too much insulation",
        "Loose or poorly tightened connections",
        "Excessive earthing",
        "High voltage"
      ],
      correctAnswer: 1,
      explanation: "Loose or poorly tightened connections at terminals are one of the most common causes of open circuit faults."
    },
    {
      id: 4,
      question: "Why might a lighting point stop working due to an open circuit fault?",
      options: [
        "The circuit breaker has tripped",
        "There's too much current flowing",
        "A conductor in the lighting circuit is broken",
        "The earth connection is faulty"
      ],
      correctAnswer: 2,
      explanation: "If a conductor in the lighting circuit is broken, the circuit cannot complete and the light will not work."
    },
    {
      id: 5,
      question: "What risk occurs if a CPC (earth wire) suffers an open circuit fault?",
      options: [
        "The lights will not work",
        "The protective conductor will not function when needed",
        "The circuit breaker will trip immediately",
        "Voltage will increase"
      ],
      correctAnswer: 1,
      explanation: "If the CPC has an open circuit, it cannot provide protection during earth faults, creating a safety risk."
    },
    {
      id: 6,
      question: "What test is commonly used to detect open circuits in conductors?",
      options: [
        "Insulation resistance test",
        "Continuity test",
        "Earth fault loop impedance test",
        "Polarity test"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing checks that conductors are complete and can carry current, detecting open circuits."
    },
    {
      id: 7,
      question: "True or False: Open circuit faults always cause circuit breakers to trip.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Open circuits usually stop current flow altogether, so there's no overcurrent to cause tripping."
    },
    {
      id: 8,
      question: "Why might insulation resistance tests still pass even with an open CPC?",
      options: [
        "The test doesn't check earth conductors",
        "Insulation resistance testing doesn't detect breaks in conductors",
        "The readings are always misleading",
        "Open circuits improve insulation"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance testing measures resistance between conductors, not continuity within them, so it won't detect a broken CPC."
    },
    {
      id: 9,
      question: "How should an open circuit fault be corrected?",
      options: [
        "Increase the voltage",
        "Replace the circuit breaker",
        "Repair or replace the damaged conductor and retest",
        "Add more insulation"
      ],
      correctAnswer: 2,
      explanation: "Open circuits are corrected by repairing or replacing the damaged conductor, tightening connections, or re-terminating, followed by retesting."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake caused the socket to fail?",
      options: [
        "Wrong cable size was used",
        "The neutral conductor was not tightened properly",
        "Too much current was flowing",
        "The earth was disconnected"
      ],
      correctAnswer: 1,
      explanation: "The apprentice failed to tighten the neutral conductor properly at the terminal, causing it to come loose and create an open circuit."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-2 rounded-lg bg-card self-start">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 sm:mb-3 border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 7.2.1
            </Badge>
            <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              2.1 Open Circuit Faults
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
              Understanding detection, causes, and rectification of open circuit faults
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <ul className="list-disc pl-4 space-y-1 sm:space-y-2">
                  <li>An <strong>open circuit fault</strong> occurs when there is a break in the electrical path</li>
                  <li>Prevents current from flowing through the circuit</li>
                  <li>Can happen at any point in the electrical installation</li>
                  <li>One of the most common faults in electrical systems</li>
                  <li>Often easier to locate than short circuits due to complete loss of function</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
                <h3 className="font-medium text-foreground mb-2">Spot / Use / Check</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> No voltage readings, equipment not functioning</li>
                  <li><strong>Use:</strong> Multimeter for continuity testing</li>
                  <li><strong>Check:</strong> All connections and junction points</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Identify the characteristics and symptoms of open circuit faults</li>
              <li>Understand the common causes of open circuits in electrical installations</li>
              <li>Apply systematic testing methods to locate open circuit faults</li>
              <li>Implement safe and effective repair procedures</li>
              <li>Recognise the safety implications of open circuit faults in protective conductors</li>
              <li>Apply relevant BS 7671 requirements for fault investigation and rectification</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Content</h2>
            
            {/* Section 1: Definition and Characteristics */}
            <div className="border-l-4 border-l-emerald-500 bg-card p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Definition and Characteristics</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                An open circuit fault occurs when the electrical path becomes incomplete, preventing current from flowing. This can happen when a conductor is physically broken, disconnected, or when a connection becomes loose enough to break the circuit.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2">Key Characteristics</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Complete interruption of current flow in the affected circuit</li>
                    <li>• No voltage present at load terminals</li>
                    <li>• Equipment downstream of the fault will not operate</li>
                    <li>• No tripping of protective devices (unless safety systems are affected)</li>
                    <li>• High resistance measurement across the break point</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2">Types of Open Circuit Faults</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Complete break:</strong> Physical separation of conductor</li>
                    <li>• <strong>Loose connection:</strong> High resistance joint that eventually fails</li>
                    <li>• <strong>Component failure:</strong> Blown fuse, failed switch contacts</li>
                    <li>• <strong>Corrosion:</strong> Oxidation causing loss of conductivity</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="open-circuit-current"
                question="What happens to current flow when a conductor is broken or disconnected?"
                options={[
                  "Current increases dramatically",
                  "Current flows to earth instead",
                  "Current cannot complete its path",
                  "Current flows backwards through the circuit"
                ]}
                correctIndex={2}
                explanation="When a conductor is broken or disconnected, the circuit path is incomplete, so current cannot flow at all."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 2: Common Causes */}
            <div className="border-l-4 border-l-green-500 bg-card p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Common Causes</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Open circuit faults can arise from various factors throughout the lifecycle of an electrical installation:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-emerald-400">Installation Issues</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Insufficient tightening of terminal screws</li>
                    <li>• Poor quality connections during installation</li>
                    <li>• Inadequate cable preparation (stripped lengths)</li>
                    <li>• Missing connections at accessories</li>
                    <li>• Incorrect use of connectors or junction boxes</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-orange-600 dark:text-emerald-400">Physical Damage</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Mechanical damage from drilling or nailing</li>
                    <li>• Cable crushing during construction work</li>
                    <li>• Rodent damage to cable insulation and conductors</li>
                    <li>• Vibration causing connections to work loose</li>
                    <li>• Thermal cycling causing expansion/contraction</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-purple-600 dark:text-emerald-400">Component Failures</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Blown fuses due to overload or fault conditions</li>
                    <li>• Switch or breaker contact failure</li>
                    <li>• Lamp filament failure in series circuits</li>
                    <li>• Control relay contact deterioration</li>
                    <li>• Connection corrosion in damp environments</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-emerald-400 dark:text-emerald-400">Environmental Factors</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Corrosion due to moisture ingress</li>
                    <li>• Thermal damage from overheating</li>
                    <li>• UV degradation of cable insulation</li>
                    <li>• Chemical attack in industrial environments</li>
                    <li>• Age-related deterioration of materials</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="open-circuit-causes"
                question="Give two common causes of open circuit faults in electrical installations."
                options={[
                  "High voltage and low current",
                  "Loose connections and mechanical damage",
                  "Too much insulation and earthing",
                  "Circuit breakers and fuses"
                ]}
                correctIndex={1}
                explanation="Loose or poorly tightened connections and mechanical damage to cables are among the most common causes of open circuit faults."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 3: Effects and Safety Implications */}
            <div className="border-l-4 border-l-orange-500 bg-card p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Effects and Safety Implications</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                While open circuits may seem less dangerous than short circuits, they can have serious safety and operational consequences:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-emerald-400">Immediate Effects</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Complete loss of function in affected circuits</li>
                    <li>• Lighting circuits leaving areas without illumination</li>
                    <li>• Power circuits causing equipment shutdown</li>
                    <li>• Partial failure in ring circuits (sockets may still work on one leg)</li>
                    <li>• Control circuits causing system malfunction</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-amber-600 dark:text-amber-400">Critical Safety Implications</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>CPC failure:</strong> Loss of earth fault protection</li>
                    <li>• <strong>Emergency systems:</strong> Fire alarms, emergency lighting failure</li>
                    <li>• <strong>Security systems:</strong> Intruder alarms, access control</li>
                    <li>• <strong>Safety equipment:</strong> Ventilation, smoke extraction</li>
                    <li>• <strong>Medical equipment:</strong> Life support systems in healthcare</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-emerald-400 dark:text-emerald-400">Secondary Effects</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Business disruption and financial losses</li>
                    <li>• Data loss in computer systems</li>
                    <li>• Food spoilage in refrigeration systems</li>
                    <li>• Process interruption in industrial applications</li>
                    <li>• Inconvenience and potential accidents due to loss of lighting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-red-700 dark:text-emerald-400 mb-1">Critical Safety Note</h4>
                    <p className="text-xs text-red-600 dark:text-emerald-400">
                      Open circuit faults in protective conductors (CPC) are particularly dangerous as they remove earth fault protection while equipment may continue to operate normally. This creates a hidden danger that could result in electric shock or fire.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Section 4: Detection Methods */}
            <div className="border-l-4 border-l-purple-500 bg-card p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Detection and Testing Methods</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Systematic testing approaches are essential for locating open circuit faults efficiently and safely:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-emerald-400 dark:text-emerald-400">Primary Testing Methods</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Continuity testing:</strong> Using multimeter or dedicated continuity tester</li>
                    <li>• <strong>Visual inspection:</strong> Checking for obvious breaks or loose connections</li>
                    <li>• <strong>Voltage testing:</strong> Measuring voltage presence at various points</li>
                    <li>• <strong>Resistance measurement:</strong> Checking conductor resistance values</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">Testing Sequence</h4>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li><strong>Isolate</strong> the circuit and verify isolation</li>
                    <li><strong>Visual inspection</strong> of accessible connections</li>
                    <li><strong>Continuity test</strong> from supply to load</li>
                    <li><strong>Section testing</strong> to narrow down fault location</li>
                    <li><strong>Point-to-point testing</strong> to identify exact fault position</li>
                  </ol>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-orange-600 dark:text-emerald-400">Safety Considerations</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Always isolate before testing - never test live circuits for continuity</li>
                    <li>• Use appropriate test instruments for the voltage level</li>
                    <li>• Verify test equipment operation before and after use</li>
                    <li>• Follow safe isolation procedures (secure isolation)</li>
                    <li>• Use appropriate PPE for the environment</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="open-circuit-testing"
                question="What is the first step when testing for open circuit faults?"
                options={[
                  "Start continuity testing immediately",
                  "Check the circuit breaker position",
                  "Isolate the circuit and verify isolation",
                  "Measure the voltage at the load"
                ]}
                correctIndex={2}
                explanation="Safety requires that the circuit is properly isolated and isolation verified before any testing begins."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 5: Repair and Prevention */}
            <div className="border-l-4 border-l-teal-500 bg-teal-500/5 p-4 sm:p-6 rounded-r-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">5</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Repair and Prevention</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Effective repair requires proper techniques and consideration of prevention measures:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-emerald-400 dark:text-emerald-400">Repair Procedures</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Reconnection:</strong> Clean and properly terminate loose connections</li>
                    <li>• <strong>Cable repair:</strong> Use appropriate junction boxes or replacement sections</li>
                    <li>• <strong>Component replacement:</strong> Replace blown fuses, failed switches</li>
                    <li>• <strong>Re-termination:</strong> Strip and re-terminate damaged cable ends</li>
                    <li>• <strong>Testing:</strong> Verify repair with continuity and function tests</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">Prevention Measures</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use correct torque settings for terminal connections</li>
                    <li>• Provide adequate cable protection in vulnerable areas</li>
                    <li>• Regular inspection and maintenance schedules</li>
                    <li>• Quality installation practices and workmanship</li>
                    <li>• Environmental protection for exposed connections</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 p-3 rounded border border-border/20">
                  <h4 className="font-medium text-sm mb-2 text-purple-600 dark:text-emerald-400">BS 7671 Requirements</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Continuity testing must be performed during installation</li>
                    <li>• Protective conductor continuity is critical for safety</li>
                    <li>• All connections must be accessible for inspection</li>
                    <li>• Appropriate cable selection for environmental conditions</li>
                    <li>• Documentation of test results and any faults found</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">Real World Example</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-4 border-l-amber-400 bg-amber-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-300 mb-2">Case Study: Office Socket Circuit Failure</h3>
                    <p className="text-xs sm:text-sm text-foreground">
                      During a routine office refurbishment, an apprentice electrician installed new socket outlets. Two weeks later, several sockets on the circuit stopped working, causing disruption to the office operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-red-400 bg-red-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 mb-2">The Problem:</p>
                    <p className="text-xs sm:text-sm text-foreground">
                      Multiple socket outlets on a ring final circuit suddenly lost power. Initial checks showed the MCB had not tripped, and other sockets on the circuit were still working normally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-emerald-400 bg-emerald-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Search className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 mb-2">The Investigation:</p>
                    <p className="text-xs sm:text-sm text-foreground">
                      An experienced electrician performed continuity testing and discovered an open circuit in the neutral conductor at one of the newly installed sockets. The socket itself appeared to be properly connected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-orange-400 bg-orange-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Wrench className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 mb-2">The Root Cause:</p>
                    <p className="text-xs sm:text-sm text-foreground">
                      Upon closer inspection, it was found that the neutral conductor terminal screw had not been properly tightened during installation. Vibration from normal office activity had caused the connection to gradually work loose until it made insufficient contact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-purple-400 bg-purple-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 mb-2">The Solution:</p>
                    <p className="text-xs sm:text-sm text-foreground">
                      The loose connection was properly re-terminated with the correct torque applied. All other new sockets were checked and several more loose connections were found and corrected. The circuit was then fully tested for continuity and functionality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-green-400 bg-green-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-300 mb-2">Lessons Learned:</p>
                    <ul className="text-xs sm:text-sm text-foreground space-y-1">
                      <li>• Always use the correct torque settings for terminal connections</li>
                      <li>• Perform thorough testing after installation completion</li>
                      <li>• Quality control checks should verify all connections</li>
                      <li>• Proper supervision of apprentice work is essential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-6">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2 text-sm">What's the difference between an open circuit and a short circuit?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">An open circuit has a break in the path preventing current flow, while a short circuit creates an unintended low-resistance path allowing excessive current flow.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-foreground mb-2 text-sm">Can an open circuit be dangerous?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">While open circuits don't cause overcurrent, they can be dangerous if they affect safety systems like emergency lighting or protective devices.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-foreground mb-2 text-sm">How do I test for continuity safely?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Always isolate the circuit first, verify isolation, then use a multimeter set to continuity mode. Never test continuity on live circuits.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-foreground mb-2 text-sm">What tools do I need for open circuit fault finding?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Essential tools include a multimeter, continuity tester, voltage indicator, and basic hand tools for accessing connections.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-foreground">
              Open circuit faults represent one of the most common electrical problems, characterised by a complete break in the electrical path that prevents current flow. These faults can occur due to loose connections, mechanical damage, component failures, and environmental factors. While they may not immediately cause protective device operation, they can have serious safety implications, particularly when affecting protective conductors or safety-critical systems. Effective detection requires systematic testing with proper isolation procedures, and understanding their behaviour is fundamental for electrical technicians.
            </p>
          </CardContent>
        </Card>

        <Quiz questions={quizQuestions} title="Test your knowledge of open circuit faults" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mt-6 sm:mt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous: Section 2</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../2-2">
              <span className="hidden sm:inline">Next: Short Circuits</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_1;