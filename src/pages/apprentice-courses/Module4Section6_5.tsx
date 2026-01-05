import { ArrowLeft, ArrowRight, Search, Target, CheckCircle, AlertTriangle, Wrench, TrendingUp, Shield, Activity, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying and Rectifying Defects - Module 4.6.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn systematic approaches to identify and correct electrical installation defects. Master fault-finding techniques and safe rectification procedures for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one type of mechanical defect and one wiring defect.",
    options: ["Loose fixings and incorrect terminations", "Overloading and moisture", "Wrong cable size and polarity errors", "Poor containment and design errors"],
    correctIndex: 0,
    explanation: "Mechanical defects include loose fixings, damaged accessories, and poor containment support. Wiring defects include incorrect terminations, polarity errors, and broken CPC connections."
  },
  {
    id: 2,
    question: "Why must all rectification work be re-tested?",
    options: ["To comply with regulations", "To confirm the defect has been properly corrected and safety restored", "To satisfy the client", "To complete documentation"],
    correctIndex: 1,
    explanation: "Re-testing after rectification ensures that the defect has been properly corrected, safety has been restored, and the installation still complies with BS 7671 requirements."
  },
  {
    id: 3,
    question: "What regulation places a duty to maintain safe electrical systems?",
    options: ["BS 7671", "Electricity at Work Regulations 1989", "Building Regulations", "Health and Safety at Work Act"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 place a statutory duty to maintain electrical systems in a safe condition and prevent danger from electrical installations."
  }
];

const Module4Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is a common insulation defect?",
      options: [
        "Loose fixing",
        "Damaged sheathing",
        "Wrong accessory type",
        "Overloading"
      ],
      correctAnswer: 1,
      explanation: "Damaged sheathing is a common insulation defect that can expose conductors and create safety hazards including electric shock and short circuit risks."
    },
    {
      id: 2,
      question: "True or False: Defects that don't affect safety can be left uncorrected.",
      options: [
        "True",
        "False",
        "Only minor defects",
        "Only cosmetic issues"
      ],
      correctAnswer: 1,
      explanation: "False - all defects must be rectified before energisation to ensure long-term safety, compliance, and professional standards, regardless of their immediate impact."
    },
    {
      id: 3,
      question: "What is the first step before rectifying a wiring defect?",
      options: [
        "Test the circuit",
        "Isolate and lock off the circuit",
        "Document the defect",
        "Gather replacement parts"
      ],
      correctAnswer: 1,
      explanation: "The first step is always to isolate and lock off the circuit to ensure safe working conditions before beginning any rectification work."
    },
    {
      id: 4,
      question: "Name two tools that may assist in defect identification.",
      options: [
        "Hammer and chisel",
        "Continuity tester and insulation resistance tester",
        "Tape measure and pencil",
        "Drill and screwdriver"
      ],
      correctAnswer: 1,
      explanation: "Continuity testers and insulation resistance testers are essential tools for identifying electrical defects through systematic testing of circuit integrity and insulation properties."
    },
    {
      id: 5,
      question: "Which regulation requires installations to be maintained in a safe condition?",
      options: [
        "BS 7671",
        "Electricity at Work Regulations 1989",
        "BS EN 61439",
        "Building Regulations Part M"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 place a statutory duty on employers and employees to maintain electrical systems in a safe condition."
    },
    {
      id: 6,
      question: "Why should replacement cables cover the full damaged section?",
      options: [
        "To save money",
        "To ensure reliability and avoid unsafe splices",
        "To improve appearance",
        "To reduce installation time"
      ],
      correctAnswer: 1,
      explanation: "Replacing the full damaged section ensures reliability and avoids potentially unsafe splices that could create future failure points or safety hazards."
    },
    {
      id: 7,
      question: "What is one way to prevent recurrence of polarity defects?",
      options: [
        "Use different cable colours",
        "Double-check conductor connections before final fix",
        "Install additional protection",
        "Use higher rated components"
      ],
      correctAnswer: 1,
      explanation: "Double-checking conductor connections before final fixing helps prevent polarity errors by ensuring line, neutral, and earth connections are correctly identified and terminated."
    },
    {
      id: 8,
      question: "Why should you address only one fault at a time during rectification?",
      options: [
        "To save time",
        "To confirm each fault is resolved before moving on",
        "To reduce costs",
        "To satisfy regulations"
      ],
      correctAnswer: 1,
      explanation: "Addressing one fault at a time allows you to confirm each issue is properly resolved and re-tested before moving to the next, ensuring systematic and thorough fault correction."
    },
    {
      id: 9,
      question: "Give one reason why photographs should be taken before and after defect correction.",
      options: [
        "For training purposes",
        "To provide a clear record and proof of corrective action",
        "For insurance claims",
        "To show the client"
      ],
      correctAnswer: 1,
      explanation: "Photographs provide clear documentation of the defect and its correction, creating a permanent record for certification purposes and demonstrating professional standards."
    },
    {
      id: 10,
      question: "True or False: Minor cosmetic defects (like a crooked switch) never need rectification.",
      options: [
        "True",
        "False",
        "Only if the client complains",
        "Only on commercial jobs"
      ],
      correctAnswer: 1,
      explanation: "False - cosmetic defects still need rectification as they affect client satisfaction, indicate poor workmanship, and reflect on professional standards."
    }
  ];

  const faqs = [
    {
      question: "Can defects be ignored if they don't affect immediate circuit operation?",
      answer: "No — all defects must be rectified before energisation to ensure long-term safety and compliance. Even minor defects can develop into serious problems over time."
    },
    {
      question: "Do minor cosmetic issues count as defects?",
      answer: "Yes, if they affect client satisfaction or indicate poor workmanship (e.g., crooked accessories). Professional standards require all aspects of the installation to be completed properly."
    },
    {
      question: "What should I do if I can't locate the cause of a fault?",
      answer: "Escalate to a supervisor or use advanced test methods (e.g., insulation fault location). Don't guess or ignore difficult faults - they often indicate serious underlying problems."
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
            <div className="p-2 rounded-lg bg-card">
              <Search className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.6.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Identifying and Rectifying Defects
          </h1>
          <p className="text-muted-foreground">
            Master systematic approaches to identify and correct electrical installation defects before energisation.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>No electrical installation is perfect on the first attempt.</li>
                <li>Defects can appear during installation or be revealed during inspection and testing.</li>
                <li>Identifying and correcting defects is vital before energisation for BS 7671 compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Loose connections, damaged cables, incorrect terminations.</li>
                <li><strong>Use:</strong> Systematic checking, test instruments, safe correction methods.</li>
                <li><strong>Check:</strong> Visual inspection, functional tests, operational verification.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise common electrical installation defects.</li>
            <li>Apply systematic inspection and testing methods to identify faults.</li>
            <li>Safely rectify defects without causing further issues.</li>
            <li>Record corrective actions as part of site documentation.</li>
            <li>Apply preventative measures to reduce recurrence of defects.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Types of Defects */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Types of Defects</h3>
            <p className="text-base text-foreground mb-4">
              Understanding common defect categories helps with systematic identification and correction:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Common Defect Categories</p>
                    <p className="text-base text-foreground mb-2"><strong>Mechanical defects:</strong> Issues with physical installation components.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Loose fixings on accessories or containment systems</li>
                      <li>Damaged accessories with cracks or missing parts</li>
                      <li>Poor containment support with inadequate bracket spacing</li>
                      <li>Misaligned or poorly fitted components</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Wiring defects:</strong> Problems with conductor connections and routing.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Incorrect terminations with wrong polarity or loose connections</li>
                      <li>Polarity errors affecting safety and equipment operation</li>
                      <li>Broken CPC connections compromising earth continuity</li>
                      <li>Inadequate conductor lengths or poor stripping</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Insulation defects:</strong> Damage to cable protection and insulation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Damaged sheathing exposing inner conductors</li>
                      <li>Nicks in insulation from poor handling or sharp edges</li>
                      <li>Moisture ingress in damp or wet locations</li>
                      <li>Contamination from building materials or chemicals</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Design/installation errors:</strong> Incorrect component selection or application.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Wrong cable size for the intended load or circuit length</li>
                      <li>Overloading of circuits beyond their designed capacity</li>
                      <li>Incorrect accessory type for the environment or application</li>
                      <li>Non-compliance with BS 7671 requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="defect-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* How to Identify Defects */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. How to Identify Defects</h3>
            <p className="text-base text-foreground mb-4">
              Systematic defect identification combines visual inspection with functional testing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Identification Methods</p>
                    <p className="text-base text-foreground mb-2"><strong>Visual inspection:</strong> First step in defect identification.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Check for visible issues such as exposed copper conductors</li>
                      <li>Look for missing grommets or protective sleeves</li>
                      <li>Inspect for physical damage to cables or accessories</li>
                      <li>Verify correct component selection and installation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Basic functional tests:</strong> Essential electrical verification.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Polarity testing to confirm correct connections</li>
                      <li>Continuity testing for earth and circuit paths</li>
                      <li>Insulation resistance testing to identify insulation breakdown</li>
                      <li>RCD testing where applicable</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Operational checks:</strong> Verify correct function after safe energisation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Test switching operations and control functions</li>
                      <li>Verify accessories and circuits function correctly</li>
                      <li>Check for abnormal heating or noise</li>
                      <li>Confirm protective device coordination</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Customer feedback:</strong> Clients may notice practical defects such as misaligned fittings or operational issues
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="retesting-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Systematic Fault-Finding */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Systematic Fault-Finding</h3>
            <p className="text-base text-foreground mb-4">
              Methodical approach ensures all defects are identified and addressed efficiently:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Methodical Approach</p>
                    <p className="text-base text-foreground mb-2"><strong>Work methodically:</strong> Start at the origin of supply and progress circuit by circuit.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Begin at the consumer unit or distribution board</li>
                      <li>Follow each circuit from origin to final outlets</li>
                      <li>Check junction boxes and connection points systematically</li>
                      <li>Don't skip sections even if they appear correct</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Use drawings and schedules:</strong> Documentation aids systematic inspection.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Refer to circuit diagrams to trace connections</li>
                      <li>Use cable schedules to verify cable types and routes</li>
                      <li>Check installation drawings for compliance with design</li>
                      <li>Update documentation with any changes found</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Record all observations:</strong> Document everything, even minor defects.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Note location and nature of each defect found</li>
                      <li>Record test results and measurements</li>
                      <li>Photograph defects for clear documentation</li>
                      <li>Maintain records for sign-off and certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulations-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Rectification of Defects */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Rectification of Defects</h3>
            <p className="text-base text-foreground mb-4">
              Safe and effective correction of identified defects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Safe Correction Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Safety first:</strong> Always isolate the affected circuit before beginning work.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Switch off and lock off the circuit at the consumer unit</li>
                      <li>Test the circuit is dead using approved voltage indicator</li>
                      <li>Apply warning notices to prevent inadvertent re-energisation</li>
                      <li>Use appropriate PPE for the work being undertaken</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Correction techniques:</strong> Apply appropriate methods for each defect type.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Correct loose terminations by re-stripping and re-securing conductors</li>
                      <li>Replace damaged cables or accessories rather than attempting unsafe repairs</li>
                      <li>Apply correct protective measures (e.g., IP-rated glands in wet areas)</li>
                      <li>Ensure proper cable support and containment throughout the circuit</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Verification:</strong> Re-test all corrected work to confirm compliance.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Repeat relevant tests after each correction</li>
                      <li>Verify continuity and insulation resistance meet requirements</li>
                      <li>Check polarity and earth fault loop impedance</li>
                      <li>Test RCD operation where applicable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-medium text-foreground">Safety Procedures</h3>
              </div>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li>• Always isolate and lock off circuits before rectifying defects</li>
                <li>• Photograph defects before and after rectification to maintain a clear record</li>
                <li>• Keep spare accessories and replacement cable lengths on hand to minimise delays</li>
                <li>• When replacing damaged cable, always replace the full section — do not splice unless an appropriate enclosure and connectors are used</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="font-medium text-foreground">Documentation</h3>
              </div>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li>• Document rectification on the Electrical Installation Certificate to demonstrate compliance</li>
                <li>• Record the nature of each defect and the corrective action taken</li>
                <li>• Include test results before and after correction</li>
                <li>• Maintain photographic evidence for quality assurance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real-World Example</h2>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border/20">
            <p className="text-base text-foreground mb-3">
              <strong>Commercial Fit-Out Defect:</strong>
            </p>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              During a commercial fit-out, an insulation resistance test showed a low reading on a power circuit. Investigation revealed that a cable had been damaged by a sharp edge when pulled through trunking without a grommet. The damaged section was replaced, retested, and passed. The incident highlighted the importance of correct mechanical protection during installation.
            </p>
            <div className="bg-emerald-500/10 rounded p-3 border-l-4 border-l-emerald-500">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Key Learning:</strong> This example demonstrates how a single oversight (missing grommet) can cause significant defects that require complete cable replacement. Prevention through proper installation techniques is always more cost-effective than rectification.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-card/10 to-emerald-500/5 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Wrench className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Pocket Guide – Identifying & Rectifying Defects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Isolate and prove dead before fault-finding.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Inspect for mechanical damage: cracked accessories, missing fixings.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Check wiring: correct terminations, no exposed copper, polarity correct.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Test continuity, insulation resistance, and polarity after corrections.</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Replace damaged cables/accessories — never "make do".</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Record defect and corrective action for certification.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Re-test after every repair.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-foreground">Prevent recurrence: double-check, use proper tools, and follow BS 7671.</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Summary - Comprehensive Recap */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/10 border-green-400/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recap - What You've Learned</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Defect Recognition</h3>
                  <p className="text-sm text-muted-foreground">You can now identify common mechanical, wiring, insulation, and design defects that compromise installation safety and compliance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Identification Methods</h3>
                  <p className="text-sm text-muted-foreground">You understand how to apply visual checks and tests to spot faults using systematic inspection procedures.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Fault-Finding Skills</h3>
                  <p className="text-sm text-muted-foreground">You know how to systematically fault-find and rectify issues using methodical approaches and proper documentation.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Safe Rectification</h3>
                  <p className="text-sm text-muted-foreground">You can ensure corrective work is documented, retested, and compliant with BS 7671 and safety regulations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Prevention Strategies</h3>
                  <p className="text-sm text-muted-foreground">You've learned preventative strategies to avoid repeat defects and maintain high installation standards.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Professional Standards</h3>
                  <p className="text-sm text-muted-foreground">By mastering this, you ensure installations are safe, professional, and inspection-ready for energisation and certification.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium text-foreground">Key Compliance Point</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground">
              Remember: All defects must be identified and rectified before energisation. This ensures compliance with BS 7671, prevents safety hazards, and maintains professional installation standards throughout the system's operational life.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="../6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-6">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_5;