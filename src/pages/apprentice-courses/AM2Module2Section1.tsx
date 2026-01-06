import { ArrowLeft, Shield, AlertTriangle, Lock, CheckCircle, XCircle, Wrench, Clock, Target, Book, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module2Section1 = () => {
  useSEO(
    "Safe Isolation Procedures - AM2 Module 2",
    "Critical safe isolation procedures for AM2 - instant fail if wrong. Complete guide to NET standards and safety requirements."
  );

  const safeIsolationSteps = [
    "Identify the correct circuit using drawings/spec",
    "Inform anyone affected that the circuit will be isolated",
    "Switch off the circuit at the isolator",
    "Lock off using a lock and retain the key",
    "Attach a warning notice to the device",
    "Prove your tester on a known live source",
    "Test the circuit (L-N, L-E, N-E, and combinations at all points)",
    "Re-prove your tester on the known live source",
    "Confirm the circuit is dead and safe to work on",
    "Keep lock/key under your control until the job is finished"
  ];

  const tenPointTests = [
    "L-N at origin",
    "L-E at origin", 
    "L-N at point of work",
    "L-E at point of work",
    "N-E at origin",
    "N-E at point of work"
  ];

  const criticalFails = [
    "Not proving tester before AND after",
    "Missing part of the 10-point test",
    "Testing at the wrong switch position",
    "Isolating the wrong circuit",
    "Not fitting lock-off or not attaching warning notice",
    "Leaving key unsecured"
  ];

  const equipmentRequired = [
    "Multi-function tester (MFT) or voltage indicator",
    "Lock-off devices (padlocks with unique keys)",
    "Warning notices (electrical isolation labels)",
    "Known live source for proving tester",
    "Circuit drawings and specifications",
    "Personal protective equipment (PPE)",
    "Test leads and probes (appropriate rating)",
    "Documentation forms/sheets"
  ];

  const preIsolationChecklist = [
    "Confirm work scope and circuits involved",
    "Identify all isolation points required",
    "Check drawings match actual installation",
    "Ensure correct PPE is available",
    "Test equipment is in calibration",
    "Warning notices and locks available",
    "Communication plan with affected parties",
    "Emergency contact details accessible"
  ];

  const practiceScenarios = [
    {
      title: "Lighting Circuit Isolation",
      description: "Isolate a lighting circuit for lamp replacement in an office building",
      keyPoints: ["Multiple switches involved", "Emergency lighting considerations", "Occupied premises"]
    },
    {
      title: "Socket Circuit for Installation",
      description: "Safe isolation for adding additional sockets to existing ring main",
      keyPoints: ["Ring continuity checks", "Multiple isolation points", "Shared neutrals"]
    },
    {
      title: "Three-Phase Motor Circuit",
      description: "Isolate motor supply for maintenance work",
      keyPoints: ["Phase rotation", "Star-delta considerations", "High current switching"]
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which UK regulation underpins the requirement for safe isolation?",
      options: [
        "CDM Regulations 2015",
        "Electricity at Work Regulations 1989",
        "Building Regulations 2010",
        "Health and Safety at Work Act 1974"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems."
    },
    {
      id: 2,
      question: "What's the very first step in safe isolation?",
      options: [
        "Switch off at the isolator",
        "Prove your tester",
        "Identify the correct circuit using drawings/spec",
        "Inform others of the isolation"
      ],
      correctAnswer: 2,
      explanation: "You must first identify the correct circuit using drawings and specifications before taking any other action."
    },
    {
      id: 3,
      question: "Why must you inform others before isolating?",
      options: [
        "It's good practice only",
        "To prevent accidental re-energisation and ensure safety",
        "To show professional courtesy",
        "It's not actually required"
      ],
      correctAnswer: 1,
      explanation: "Informing others prevents accidental re-energisation and ensures everyone's safety by making them aware of the work being carried out."
    },
    {
      id: 4,
      question: "What two things must you do after switching off at the isolator?",
      options: [
        "Test the circuit and prove the tester",
        "Lock off and attach warning notice",
        "Inform others and test continuity",
        "Check voltage and current"
      ],
      correctAnswer: 1,
      explanation: "After switching off, you must lock off the isolator and attach a warning notice to prevent unauthorised re-energisation."
    },
    {
      id: 5,
      question: "What's the purpose of re-proving the tester?",
      options: [
        "To check battery levels",
        "To ensure it hasn't failed during the test",
        "To calibrate the instrument",
        "To reset the display"
      ],
      correctAnswer: 1,
      explanation: "Re-proving ensures the tester hasn't failed during the testing process, confirming the test results are valid."
    },
    {
      id: 6,
      question: "What's the risk if you skip the N-E test?",
      options: [
        "Circuit may not function properly",
        "You might miss a dangerous fault condition",
        "Instrument readings may be inaccurate",
        "There's no specific risk"
      ],
      correctAnswer: 1,
      explanation: "Skipping the N-E test could mean missing a dangerous fault condition that could cause injury or death."
    },
    {
      id: 7,
      question: "True or false: Tape can be used instead of a lock-off device.",
      options: [
        "True - tape is acceptable",
        "False - only proper lock-off devices are acceptable",
        "True - but only warning tape",
        "False - unless it's electrical tape"
      ],
      correctAnswer: 1,
      explanation: "Only proper lock-off devices are acceptable. Tape does not provide adequate security and can be easily removed."
    },
    {
      id: 8,
      question: "What happens if you isolate the wrong circuit in AM2?",
      options: [
        "You get a warning",
        "You lose some marks",
        "Automatic fail",
        "You can try again"
      ],
      correctAnswer: 2,
      explanation: "Isolating the wrong circuit is a critical safety error that results in automatic failure of the AM2 assessment."
    },
    {
      id: 9,
      question: "When do you remove the lock-off and warning notice?",
      options: [
        "When testing is complete",
        "When work is finished and circuit is to be re-energised",
        "When the assessor says so",
        "At the end of the day"
      ],
      correctAnswer: 1,
      explanation: "Lock-off and warning notices are only removed when all work is completely finished and the circuit is ready to be safely re-energised."
    },
    {
      id: 10,
      question: "What's the consequence of forgetting a step in safe isolation during AM2?",
      options: [
        "Lose a few marks",
        "Get a verbal warning",
        "Automatic fail",
        "Have to repeat the section"
      ],
      correctAnswer: 2,
      explanation: "Missing any step in safe isolation is considered a critical safety error resulting in automatic failure of the entire AM2 assessment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col space-y-4">
            {/* Navigation */}
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 self-start" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 2
              </Link>
            </Button>
            
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="../am2">AM2 Course</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="..">Module 2</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>Section 1: Safe Isolation</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* Progress & Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Section 1 of 8
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~25 min read
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-elec-yellow">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Critical Content - Instant Fail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-elec-yellow mr-3" />
            <AlertTriangle className="h-7 w-7 text-elec-yellow" />
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            Safe Isolation Procedures
          </h1>
          <div className="bg-card border-l-4 border-l-red-500 p-4 mb-6 text-left max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-elec-yellow mb-2 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              INSTANT FAIL IF WRONG
            </h2>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              Safe isolation is the foundation of electrical safety and the most unforgiving part of the AM2. 
              If you get it wrong, you fail — regardless of how well you perform elsewhere. In real working life, 
              safe isolation mistakes can kill. In the AM2, they instantly end your assessment.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">By the end of this section, you should be able to:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Carry out the safe isolation procedure step-by-step to NET's standard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Correctly use and prove testing equipment before and after use</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Lock off and secure isolators with warning notices</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Perform the full 10-point test sequence on a circuit</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Identify common mistakes that cause automatic fails</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Equipment Required */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Equipment Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Essential equipment for safe isolation procedures:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {equipmentRequired.map((item, index) => (
                <div key={index} className="flex items-center p-2 bg-background/50 rounded border border-border/20">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pre-Isolation Checklist */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Pre-Isolation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Complete these steps before beginning isolation:</p>
            <div className="space-y-2">
              {preIsolationChecklist.map((item, index) => (
                <div key={index} className="flex items-start p-2 bg-background/50 rounded border border-border/20">
                  <div className="bg-elec-yellow text-black font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                    {index + 1}
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Safe Isolation Matters - Enhanced */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">Why Safe Isolation Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">Safety Reasons:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prevents electrocution, burns, and arc flash injuries</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensures no one else can accidentally re-energise the system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Protects both you and others on site</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Eliminates risk of electrical shock from induced voltages</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prevents equipment damage from short circuits</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">Legal & Assessment:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <FileText className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mandatory legal requirement under the Electricity at Work Regulations 1989</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>In AM2, failure = instant disqualification</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>No second chances or partial marks</span>
                  </li>
                  <li className="flex items-start">
                    <Book className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span>Demonstrates competency to IET Code of Practice</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Required for professional certification maintenance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Statistics & Real Data */}
            <div className="bg-card border border-red-500/20 rounded p-4">
              <h3 className="text-base font-semibold text-elec-yellow mb-3">Sobering Statistics:</h3>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="text-center p-3 bg-background/50 rounded border border-border/20">
                  <div className="text-2xl font-bold text-elec-yellow">30+</div>
                  <div className="text-xs text-muted-foreground">Electrical deaths annually in UK workplace</div>
                </div>
                <div className="text-center p-3 bg-background/50 rounded border border-border/20">
                  <div className="text-2xl font-bold text-elec-yellow">1,000+</div>
                  <div className="text-xs text-muted-foreground">Electrical injuries requiring hospital treatment</div>
                </div>
                <div className="text-center p-3 bg-background/50 rounded border border-border/20">
                  <div className="text-2xl font-bold text-elec-yellow">67%</div>
                  <div className="text-xs text-muted-foreground">Of AM2 failures due to safe isolation errors</div>
                </div>
              </div>
            </div>

            {/* Industry Examples */}
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-4">
              <h3 className="text-base font-semibold text-elec-yellow mb-3">Real Industry Consequences:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Fatal Incident (2019):</span> Electrician bypassed isolation procedure to "save time" - resulted in fatality and company prosecution under Section 37 of Health & Safety at Work Act.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Serious Injury (2021):</span> Apprentice received 11kV shock when supervisor failed to follow lock-off procedure - 6 months recovery, permanent nerve damage.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">AM2 Impact:</span> 2023 data shows 7 out of 10 AM2 failures directly linked to incomplete or incorrect safe isolation procedures.
                  </div>
                </div>
              </div>
            </div>

            {/* Cost of Getting It Wrong */}
            <div className="bg-card border border-purple-500/20 rounded p-4">
              <h3 className="text-base font-semibold text-elec-yellow mb-3">Cost of Getting It Wrong:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Personal Costs:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Injury or death</li>
                    <li>• Loss of professional certification</li>
                    <li>• Criminal prosecution possible</li>
                    <li>• Career implications</li>
                    <li>• AM2 re-assessment fees (£500+)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Employer Costs:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• HSE prosecution and unlimited fines</li>
                    <li>• Civil liability claims</li>
                    <li>• Insurance premium increases</li>
                    <li>• Reputation damage</li>
                    <li>• Lost productivity and contracts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Standards */}
            <div className="bg-card border border-elec-yellow/20 rounded p-4">
              <h3 className="text-base font-semibold text-elec-yellow mb-3">Professional Standards & Expectations:</h3>
              <div className="text-sm space-y-2">
                <p><strong>IET Code of Practice:</strong> Safe isolation is fundamental to electrical competency and must be demonstrated consistently.</p>
                <p><strong>NET Requirements:</strong> Zero tolerance for shortcuts - any deviation from procedure results in immediate assessment failure.</p>
                <p><strong>Industry Expectation:</strong> Employers expect AM2 qualified electricians to perform safe isolation without supervision or prompting.</p>
                <p><strong>Insurance Requirements:</strong> Many electrical contractors' insurance policies require staff to hold current AM2 certification with proven safe isolation competency.</p>
              </div>
            </div>

            <InlineCheck
              id="safe-isolation-regulation"
              question="Which UK regulation underpins the requirement for safe isolation?"
              options={[
                "CDM Regulations 2015",
                "Electricity at Work Regulations 1989",
                "Building Regulations 2010",
                "Health and Safety at Work Act 1974"
              ]}
              correctIndex={1}
              explanation="The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems."
            />
          </CardContent>
        </Card>

        {/* Step-by-Step Procedure */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Step-by-Step Safe Isolation Procedure (NET Standard)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safeIsolationSteps.map((step, index) => (
                <div key={index} className="flex items-start p-3 bg-background/50 rounded border border-border/20">
                  <div className="bg-elec-yellow text-black font-bold w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-foreground">{step}</p>
                    {index === 5 && (
                      <p className="text-xs text-muted-foreground mt-1">⚠️ Critical: Always prove on known live source first</p>
                    )}
                    {index === 7 && (
                      <p className="text-xs text-muted-foreground mt-1">⚠️ Critical: Must re-prove to validate test equipment</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded">
              <h4 className="text-sm font-semibold text-elec-yellow mb-2">Practical Tips:</h4>
              <ul className="text-xs text-foreground space-y-1">
                <li>• Allow 10-15 minutes for complete isolation procedure</li>
                <li>• Double-check circuit identification before switching</li>
                <li>• Use unique locks - never share keys</li>
                <li>• Keep tester calibration certificates accessible</li>
              </ul>
            </div>

            <div className="mt-4">
              <InlineCheck
                id="re-prove-tester"
                question="Why do you re-prove the tester after testing?"
                options={[
                  "To check battery levels",
                  "To ensure it hasn't failed during the test",
                  "To calibrate the instrument",
                  "To reset the display"
                ]}
                correctIndex={1}
                explanation="Re-proving ensures the tester hasn't failed during the testing process, confirming your test results are valid."
              />
            </div>
          </CardContent>
        </Card>

        {/* 10-Point Test Sequence */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">10-Point Test Sequence (Single-Phase Example)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All combinations must be checked to ensure the circuit is completely dead:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">Required Tests:</h3>
                <div className="space-y-2">
                  {tenPointTests.map((test, index) => (
                    <div key={index} className="flex items-center p-2 bg-background/50 rounded border border-border/20">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-elec-yellow/10 border-l-4 border-elec-yellow p-3 rounded">
                <h3 className="text-base font-semibold text-elec-yellow mb-2">Important Notes:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Test at both origin and point of work</li>
                  <li>• In three-phase, repeat across all phases</li>
                  <li>• All combinations must show no voltage</li>
                  <li>• Record results accurately</li>
                  <li>• Use appropriate test leads for voltage level</li>
                  <li>• Expect 0V reading on all tests</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-card border border-red-500/20 rounded">
              <h4 className="text-sm font-semibold text-red-600 mb-2">Common Test Errors:</h4>
              <ul className="text-xs text-foreground space-y-1">
                <li>• Testing with switch in wrong position</li>
                <li>• Missing N-E combinations</li>
                <li>• Not testing at point of work</li>
                <li>• Using faulty test equipment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Critical Fails */}
        <Card className="mb-6 bg-card border-border/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Common Critical Fails in AM2 Safe Isolation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These errors from NET's common failures list will result in automatic fail:
            </p>
            <div className="space-y-2">
              {criticalFails.map((fail, index) => (
                <div key={index} className="flex items-start p-3 bg-card rounded border border-red-500/20">
                  <XCircle className="h-4 w-4 text-elec-yellow mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-foreground">{fail}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-red-600/10 border border-red-600/20 rounded">
              <h4 className="text-sm font-semibold text-red-600 mb-2">Prevention Strategies:</h4>
              <ul className="text-xs text-foreground space-y-1">
                <li>• Create a personal checklist and use it every time</li>
                <li>• Practice the sequence until it's automatic</li>
                <li>• Never rush - take your time</li>
                <li>• Communicate clearly with assessors about your actions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Practice Scenarios */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Practice Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Work through these realistic AM2 scenarios to build confidence:
            </p>
            <div className="space-y-4">
              {practiceScenarios.map((scenario, index) => (
                <div key={index} className="p-3 bg-background/50 rounded border border-border/20">
                  <h4 className="text-sm font-semibold text-foreground mb-2">{scenario.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{scenario.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {scenario.keyPoints.map((point, i) => (
                      <span key={i} className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">Real-World Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-card rounded border border-red-500/20">
                <h3 className="font-semibold text-elec-yellow mb-1 text-sm">Example 1: Forgotten Re-Prove</h3>
                <p className="text-xs text-foreground">A candidate did everything correctly but forgot to re-prove the tester during safe isolation. The assessor stopped the test and recorded a fail.</p>
                <p className="text-xs text-elec-yellow mt-1">⚠️ Lesson: Never skip the final tester proving step</p>
              </div>
              <div className="p-3 bg-card rounded border border-red-500/20">
                <h3 className="font-semibold text-elec-yellow mb-1 text-sm">Example 2: Wrong Lock-Off</h3>
                <p className="text-xs text-foreground">Candidate used tape instead of a lock-off device. Unsafe → instant fail.</p>
                <p className="text-xs text-elec-yellow mt-1">⚠️ Lesson: Only proper padlocks are acceptable</p>
              </div>
              <div className="p-3 bg-card rounded border border-red-500/20">
                <h3 className="font-semibold text-elec-yellow mb-1 text-sm">Example 3: Missing Warning Notice</h3>
                <p className="text-xs text-foreground">A candidate isolated a lighting circuit correctly but didn't attach a warning notice. Lost critical marks, failed the section.</p>
                <p className="text-xs text-elec-yellow mt-1">⚠️ Lesson: Lock-off AND warning notice are both mandatory</p>
              </div>
              <div className="p-3 bg-card rounded border border-red-500/20">
                <h3 className="font-semibold text-elec-yellow mb-1 text-sm">Example 4: Wrong Circuit Isolated</h3>
                <p className="text-xs text-foreground">Candidate misread the circuit schedule and isolated the wrong circuit. Despite perfect procedure, this was a critical fail.</p>
                <p className="text-xs text-elec-yellow mt-1">⚠️ Lesson: Always double-check circuit identification first</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Practical Guidance for Assessors */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow flex items-center">
              <Book className="h-5 w-5 mr-2" />
              What Assessors Look For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-background/50 rounded border border-border/20">
                <h4 className="text-sm font-semibold text-foreground mb-1">Correct Sequence</h4>
                <p className="text-xs text-muted-foreground">Assessors check you follow the exact NET sequence without shortcuts</p>
              </div>
              <div className="p-3 bg-background/50 rounded border border-border/20">
                <h4 className="text-sm font-semibold text-foreground mb-1">Equipment Handling</h4>
                <p className="text-xs text-muted-foreground">Proper use of test equipment, proving before and after</p>
              </div>
              <div className="p-3 bg-background/50 rounded border border-border/20">
                <h4 className="text-sm font-semibold text-foreground mb-1">Safety Consciousness</h4>
                <p className="text-xs text-muted-foreground">Clear demonstration that you understand the risks</p>
              </div>
              <div className="p-3 bg-background/50 rounded border border-border/20">
                <h4 className="text-sm font-semibold text-foreground mb-1">Communication</h4>
                <p className="text-xs text-muted-foreground">Clear explanation of what you're doing and why</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q1: Can I just switch off at the consumer unit without locking off?</h3>
              <p className="text-xs text-muted-foreground">A: No. Locking off and warning notices are mandatory under regulations.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q2: Do I have to use my own tester?</h3>
              <p className="text-xs text-muted-foreground">A: You can bring your own if it complies, but the centre provides approved testers.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q3: Why is the 10-point test required?</h3>
              <p className="text-xs text-muted-foreground">A: To confirm the circuit is dead in all conductor combinations.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q4: What happens if I forget one step?</h3>
              <p className="text-xs text-muted-foreground">A: Missing a critical step = automatic fail.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q5: Can I talk through the process instead of demonstrating it?</h3>
              <p className="text-xs text-muted-foreground">A: No. You must physically demonstrate the procedure.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q6: How long should safe isolation take?</h3>
              <p className="text-xs text-muted-foreground">A: Allow 10-15 minutes including all tests and documentation.</p>
            </div>
            <div className="p-3 bg-background/50 rounded border border-border/20">
              <h3 className="font-semibold text-foreground mb-1 text-sm">Q7: What if the tester fails during the process?</h3>
              <p className="text-xs text-muted-foreground">A: Stop immediately, get a replacement tester, and start again.</p>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-6 bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-4">
              Safe isolation is the most important part of the AM2. It must be carried out exactly as NET describes, 
              with no shortcuts, no missed steps, and no unsafe practices.
            </p>
            <div className="bg-elec-yellow/10 border-l-4 border-elec-yellow p-3 rounded">
              <h3 className="font-bold text-elec-yellow mb-2 text-sm">Remember the Sequence:</h3>
              <p className="text-xs sm:text-sm text-foreground font-medium">
                Prove tester → Isolate → Lock off → Warning notice → Test all combinations → Re-prove tester → Keep key
              </p>
              <p className="text-sm text-elec-yellow font-semibold mt-2">
                Missing any step = automatic fail
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="text-center p-2 bg-card rounded border border-green-500/20">
                <div className="text-green-600 font-semibold">✓ Key Success Factor</div>
                <div className="text-foreground">Practice until automatic</div>
              </div>
              <div className="text-center p-2 bg-card rounded border border-red-500/20">
                <div className="text-red-600 font-semibold">✗ Main Failure Cause</div>
                <div className="text-foreground">Rushing the process</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Quiz */}
        <Card className="bg-card border-elec-yellow/30">
          <CardHeader>
            <CardTitle className="text-lg text-elec-yellow">Knowledge Check: 10-Question Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Test your understanding of safe isolation procedures - these questions mirror typical AM2 scenarios:
            </p>
            <Quiz questions={quizQuestions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AM2Module2Section1;