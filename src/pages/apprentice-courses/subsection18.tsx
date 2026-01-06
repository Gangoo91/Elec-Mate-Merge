import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Zap, Lock, FileCheck, UserX, XCircle, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Why Safe Isolation is Essential - Section 5.1 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the critical importance of safe isolation procedures for electrical safety and legal compliance.";

const Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What are the three core steps of safe isolation?",
      options: [
        "Turn off, check, and restart",
        "Isolate, lock off, and prove dead",
        "Switch off, test, and continue",
        "Disconnect, inspect, and reconnect"
      ],
      correctAnswer: 1,
      explanation: "The three core steps are: 1) Isolate the supply, 2) Lock off to prevent re-energising, and 3) Prove the circuit is dead using an approved tester."
    },
    {
      id: 2,
      question: "Why is locking off the supply necessary?",
      options: [
        "To prevent theft of equipment",
        "To prevent accidental re-energising by others",
        "To comply with building regulations",
        "To save energy costs"
      ],
      correctAnswer: 1,
      explanation: "Locking off prevents others from accidentally switching the circuit back on while work is in progress, which could cause serious injury or death."
    },
    {
      id: 3,
      question: "What law makes isolation a legal requirement?",
      options: [
        "Health and Safety at Work Act 1974",
        "Electricity at Work Regulations 1989",
        "Building Regulations 2010",
        "Construction Design and Management Regulations"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989, specifically Regulation 13, makes safe isolation a legal requirement before working on electrical systems."
    },
    {
      id: 4,
      question: "Name one reason isolation procedures fail.",
      options: [
        "Using the wrong colour cables",
        "Forgetting to test the circuit after switching off",
        "Installing the wrong MCB rating",
        "Using metric measurements"
      ],
      correctAnswer: 1,
      explanation: "Common failures include forgetting to test circuits after isolation, not using proper test equipment, or failing to lock off the isolator."
    },
    {
      id: 5,
      question: "True or False: You can rely on light switches to confirm isolation.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Light switches and visual indicators alone cannot confirm isolation. You must always use proper test equipment to prove a circuit is dead."
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
            <Shield className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 5.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Why Safe Isolation is Essential
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Understanding the critical importance of safe isolation procedures
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
                <li><strong>Isolation:</strong> Make electrical systems completely dead before work.</li>
                <li><strong>Lock-off:</strong> Prevent accidental re-energising by others.</li>
                <li><strong>Prove dead:</strong> Use approved test equipment to confirm.</li>
                <li><strong>Legal duty:</strong> Required under EAWR 1989.</li>
                <li><strong>Lives saved:</strong> Prevents electric shock, burns, and death.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Live working, no lock-off, visual checks only, untested circuits.</li>
                <li><strong>Use:</strong> Isolation procedures, approved testers, lock-off devices.</li>
                <li><strong>Apply:</strong> Isolate-Lock-Prove sequence every time.</li>
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
              <span>Understand what safe isolation means and its four critical steps</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain why safe isolation is essential for electrical safety</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise common reasons why isolation procedures fail</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Know the legal requirements under EAWR 1989</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply safe isolation principles in practical situations</span>
            </li>
          </ul>
        </Card>

        {/* What Is Safe Isolation */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">What Is Safe Isolation?</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-elec-yellow/5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                Safe isolation is the process of making an electrical system completely dead, locking it off to prevent re-energising, and proving that no voltage is present before starting work.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-foreground">The Four Critical Steps:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Isolating the supply</h5>
                    <p className="text-muted-foreground text-sm">Turn off the circuit using the appropriate isolator or MCB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Locking off the supply</h5>
                    <p className="text-muted-foreground text-sm">Prevent re-energising by others using locks and warning labels</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Testing the circuit</h5>
                    <p className="text-muted-foreground text-sm">Prove it is dead using an approved voltage tester</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Displaying warning signage</h5>
                    <p className="text-muted-foreground text-sm">Place warning labels or signs to inform others</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="isolation-steps"
          question="What are the three core steps of safe isolation?"
          options={[
            "Turn off, check, and restart",
            "Isolate, lock off, and prove dead",
            "Switch off, test, and continue",
            "Disconnect, inspect, and reconnect"
          ]}
          correctIndex={1}
          explanation="The three core steps are: 1) Isolate the supply, 2) Lock off to prevent re-energising, and 3) Prove the circuit is dead using an approved tester."
        />

        {/* Why Is It Essential */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Why Is It Essential?</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <UserX className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Electricity is Invisible</h4>
                    <p className="text-muted-foreground text-sm mt-1">You can't tell by looking if something is live - there are no visible signs of danger</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Severe Consequences</h4>
                    <p className="text-muted-foreground text-sm mt-1">Touching live parts can cause electric shock, severe burns, or death</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <XCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Accidental Re-energising</h4>
                    <p className="text-muted-foreground text-sm mt-1">Without proper lock-off, someone could switch the circuit back on while you're working</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <FileCheck className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Legal Requirement</h4>
                    <p className="text-muted-foreground text-sm mt-1">Mandated under the Electricity at Work Regulations 1989</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="font-medium text-red-800 dark:text-red-200">
                  You must never assume a circuit is dead. Always isolate and prove it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Reasons Isolation Fails */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Reasons Isolation Fails</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="font-medium text-purple-800 dark:text-purple-200 mb-3">
                Understanding why isolation procedures fail helps prevent accidents:
              </p>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Forgetting to test the circuit</strong> after switching off</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Not locking off the isolator</strong> properly or at all</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Using incorrect test equipment</strong> or faulty testers</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Allowing others to switch</strong> the circuit back on during work</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Relying on visual indicators</strong> (like lamps) alone without proper testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal and Industry Requirements */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Legal and Industry Requirements</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">EAWR Regulation 13</h4>
              <p className="text-amber-700 dark:text-amber-300 italic text-sm">
                "No person shall be engaged in any work activity on or so near any live conductor... unless it is unreasonable to be dead and suitable precautions are taken."
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-foreground">Training Requirements</h4>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• City & Guilds Level 2 & 3 courses</li>
                  <li>• EAL electrical qualifications</li>
                  <li>• ECS card schemes</li>
                  <li>• Regular refresher training</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-foreground">Industry Standards</h4>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• BS 7671 Wiring Regulations</li>
                  <li>• IET Guidance Note 3</li>
                  <li>• HSE guidance HSG85</li>
                  <li>• GS38 test equipment standards</li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground">
              Safe isolation is taught and assessed as a core competency in all electrical training programmes, and competence must be demonstrated for certification.
            </p>
          </div>
        </div>

        {/* Real World Example */}
        <div className="mb-8 border-l-4 border-rose-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real World Example</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-rose-800 dark:text-rose-200">Case Study: Office Lighting Circuit Maintenance</h4>
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-red-800 dark:text-red-200 font-medium mb-2">Apprentice Electric Shock Incident</h5>
                    <p className="text-red-700 dark:text-elec-yellow text-sm leading-relaxed">
                      An apprentice believed a lighting circuit was off because the switch was down. He began removing a fitting and received a full electric shock. The MCB had not been isolated and proved dead. The apprentice was hospitalised, and the employer was fined for lack of supervision and training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">What Went Wrong:</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Assumption that the switch position indicated isolation</li>
                <li>• No proper isolation at the MCB or fuse</li>
                <li>• No testing to prove the circuit was dead</li>
                <li>• Lack of supervision for the apprentice</li>
                <li>• No lock-off procedures followed</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">How It Could Have Been Prevented:</h4>
              <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                <li>• Proper isolation at the distribution board</li>
                <li>• Lock-off device applied to the MCB</li>
                <li>• Voltage testing to prove dead</li>
                <li>• Warning notice displayed</li>
                <li>• Adequate supervision and training</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border-b border-border/20 pb-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Can I rely on a circuit breaker being "off" to confirm isolation?</h4>
              <p className="text-muted-foreground text-sm">No. Circuit breakers can fail or be switched back on by others. Always use proper test equipment to prove dead and apply lock-off procedures.</p>
            </div>
            <div className="border-b border-border/20 pb-4">
              <h4 className="font-semibold text-elec-yellow mb-2">What if I'm only doing a quick job?</h4>
              <p className="text-muted-foreground text-sm">There are no exceptions. Safe isolation must be followed for every job, regardless of duration. Most accidents happen during 'quick jobs'.</p>
            </div>
            <div className="border-b border-border/20 pb-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Who can remove my lock-off?</h4>
              <p className="text-muted-foreground text-sm">Only the person who applied it, except in genuine emergencies with proper authorisation procedures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">What test equipment should I use?</h4>
              <p className="text-muted-foreground text-sm">Use approved voltage testers to GS38 standards. Always prove the tester is working before and after use.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-4">
            <p className="text-foreground">
              Safe isolation protects lives. No matter how routine the job is, always follow the correct process — never work on a circuit unless it is isolated, locked off, and proven dead.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Lock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">ISOLATE</h4>
                <p className="text-muted-foreground text-xs">Switch off at source</p>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Shield className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">LOCK OFF</h4>
                <p className="text-muted-foreground text-xs">Prevent re-energising</p>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">PROVE DEAD</h4>
                <p className="text-muted-foreground text-xs">Test with approved equipment</p>
              </div>
            </div>
          </div>
        </Card>

        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section5_1;