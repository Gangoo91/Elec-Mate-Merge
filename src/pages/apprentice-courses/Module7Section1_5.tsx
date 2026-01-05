import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Scale, Shield, Zap, BookOpen, Clipboard, Clock, FileText, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Legal and Safety Responsibilities - Module 7.1.5 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the legal duties and safety responsibilities when dealing with electrical faults under EAWR 1989 and BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary legislation governing electrical safety in the workplace?",
    options: ["Health and Safety at Work Act 1974", "Electricity at Work Regulations 1989", "Management of Health and Safety at Work Regulations", "BS 7671 Wiring Regulations"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 (EAWR) is the primary legislation specifically governing electrical safety in UK workplaces."
  },
  {
    id: 2,
    question: "What must you do immediately upon discovering a dangerous electrical fault?",
    options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Wait for instructions"],
    correctIndex: 1,
    explanation: "EAWR 1989 requires immediate isolation of dangerous conditions and reporting to prevent harm to persons."
  },
  {
    id: 3,
    question: "Who can be held personally liable under EAWR 1989?",
    options: ["Only company directors", "Only qualified electricians", "Any employee with electrical duties", "Only safety officers"],
    correctIndex: 2,
    explanation: "EAWR 1989 places duties on all employees who work with electrical systems, making them personally liable for safety breaches."
  },
  {
    id: 4,
    question: "Why is proper documentation of electrical faults legally important?",
    options: ["Not legally required", "Provides evidence of due diligence and compliance", "Only for insurance", "Just good practice"],
    correctIndex: 1,
    explanation: "Proper documentation provides essential evidence of due diligence and compliance with legal duties under EAWR 1989."
  }
];

const Module7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary legislation governing electrical safety in the workplace?",
      options: ["Health and Safety at Work Act 1974", "Electricity at Work Regulations 1989", "Management of Health and Safety at Work Regulations", "BS 7671 Wiring Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 (EAWR) is the primary legislation specifically governing electrical safety in UK workplaces."
    },
    {
      id: 2,
      question: "Under EAWR 1989, who has duties regarding electrical safety?",
      options: ["Only employers", "Only electricians", "Both employers and employees", "Only safety officers"],
      correctAnswer: 2,
      explanation: "EAWR 1989 places legal duties on both employers and employees, making everyone with electrical responsibilities accountable."
    },
    {
      id: 3,
      question: "What must you do immediately upon discovering a dangerous electrical fault?",
      options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Wait for instructions"],
      correctAnswer: 1,
      explanation: "EAWR 1989 requires immediate isolation of dangerous conditions and reporting to prevent harm to persons."
    },
    {
      id: 4,
      question: "What is the maximum penalty for serious breaches of EAWR 1989?",
      options: ["£5,000 fine", "£50,000 fine", "Unlimited fine and up to 2 years imprisonment", "Verbal warning"],
      correctAnswer: 2,
      explanation: "Serious breaches of EAWR 1989 can result in unlimited fines and up to 2 years imprisonment for individuals."
    },
    {
      id: 5,
      question: "Who can be held personally liable under EAWR 1989?",
      options: ["Only company directors", "Only qualified electricians", "Any employee with electrical duties", "Only safety officers"],
      correctAnswer: 2,
      explanation: "EAWR 1989 places duties on all employees who work with electrical systems, making them personally liable for safety breaches."
    },
    {
      id: 6,
      question: "What does 'so far as is reasonably practicable' mean in EAWR 1989?",
      options: ["Do whatever is convenient", "Balance risk against cost and effort", "Only do the minimum", "Ignore if too expensive"],
      correctAnswer: 1,
      explanation: "This phrase requires balancing the level of risk against the cost and effort needed to reduce it, with bias toward safety."
    },
    {
      id: 7,
      question: "Why is proper documentation of electrical faults legally important?",
      options: ["Not legally required", "Provides evidence of due diligence and compliance", "Only for insurance", "Just good practice"],
      correctAnswer: 1,
      explanation: "Proper documentation provides essential evidence of due diligence and compliance with legal duties under EAWR 1989."
    },
    {
      id: 8,
      question: "What must be done before working on faulty electrical equipment?",
      options: ["Work more carefully", "Isolate, lock off, and prove dead", "Wear more PPE", "Get permission"],
      correctAnswer: 1,
      explanation: "EAWR 1989 requires electrical equipment to be made dead and proved dead before work begins, with secure isolation."
    },
    {
      id: 9,
      question: "How do courts typically view electrical safety cases?",
      options: ["Very leniently", "With serious concern and strict application of law", "Only consider financial impact", "Rarely prosecute"],
      correctAnswer: 1,
      explanation: "Courts take electrical safety very seriously due to the potential for serious harm, and apply the law strictly."
    },
    {
      id: 10,
      question: "What happens if someone is injured due to an electrical fault that wasn't properly addressed?",
      options: ["Nothing if it was an accident", "Criminal and civil liability possible", "Only insurance matters", "Just an unfortunate incident"],
      correctAnswer: 1,
      explanation: "Failure to properly address electrical faults can result in both criminal prosecution under EAWR 1989 and civil liability for damages."
    }
  ];

  const faqs = [
    {
      question: "Does EAWR 1989 apply to all electrical work?",
      answer: "Yes, EAWR 1989 applies to all electrical systems and work activities in workplaces, regardless of voltage level or system size."
    },
    {
      question: "Can an employee refuse to work on a faulty electrical system?",
      answer: "Yes, employees have the right to refuse work that they reasonably believe presents serious and immediate danger, and are protected from dismissal for doing so."
    },
    {
      question: "What is the difference between EAWR 1989 and BS 7671?",
      answer: "EAWR 1989 is law with criminal penalties, while BS 7671 is a British Standard. However, compliance with BS 7671 is often used as evidence of EAWR compliance."
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
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8">
        {/* Header */}
        <header className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 rounded-lg bg-card">
              <Scale className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs md:text-sm">
              Section 7.1.5
            </Badge>
          </div>
          <h1 className="text-lg md:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
            Legal and Safety Responsibilities
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-3xl">
            Understanding legal duties and safety responsibilities when dealing with electrical faults.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 text-sm md:text-base text-foreground">
            <div className="rounded-lg p-3 md:p-4 bg-card border border-border/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>EAWR 1989 creates legal duties for electrical safety.</li>
                <li>Immediate action required for dangerous faults.</li>
                <li>Personal liability applies to all electrical workers.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Dangerous conditions, immediate risks, compliance gaps.</li>
                <li><strong>Use:</strong> Safe isolation, proper documentation, immediate reporting.</li>
                <li><strong>Check:</strong> Legal compliance, safety procedures, record keeping.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Discovering an electrical fault creates immediate legal and professional responsibilities that cannot be ignored. The Electricity at Work Regulations 1989 (EAWR) place specific duties on anyone who works with electrical systems, making them personally accountable for electrical safety. Understanding these responsibilities is essential for every electrician, as non-compliance can result in prosecution, unlimited fines, and imprisonment.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  EAWR 1989 is criminal law with serious penalties. HSE prosecutions for electrical safety breaches result in average fines of £200,000+ and can include imprisonment. Personal liability means individuals face direct consequences for their decisions and actions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Legal Reality:</strong> Courts take electrical safety seriously because of the potential for serious harm. Even well-intentioned electricians can face prosecution if they fail to follow proper procedures when dealing with faults.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Professional Standard:</strong> BS 7671 provides the technical standards, but EAWR 1989 makes compliance a legal requirement. Following proper procedures protects both safety and legal standing.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Key Principle:</strong> "So far as is reasonably practicable" means balancing risk against cost/effort, but with a strong bias toward safety. In most cases, this means taking immediate action when faults are discovered.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand the legal responsibilities under EAWR 1989 when faults are identified.</li>
            <li>Explain the safety procedures required when dealing with faulty circuits.</li>
            <li>Recognise the importance of reporting and documenting faults properly.</li>
            <li>Appreciate the professional consequences of failing to act responsibly when faults are discovered.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Legal Duties Under EAWR 1989 */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Legal Duties Under EAWR 1989</h3>
            <p className="text-base text-foreground mb-4">
              EAWR 1989 creates specific legal duties that apply to everyone who works with electrical systems:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Legal Framework and Duties</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm md:text-base text-foreground mb-2"><strong>Key Legal Requirements:</strong></p>
                        <div className="grid gap-3 sm:grid-cols-2 mb-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Regulation 4(1)</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">All electrical systems must be constructed, maintained, and used safely</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Regulation 14</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">No person shall work on live electrical equipment</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Regulation 13</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Adequate precautions must be taken to prevent danger</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Regulation 3</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Duties apply to both employers and employees</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Personal Liability:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li>Individual employees can be prosecuted for safety breaches</li>
                            <li>Maximum penalty: unlimited fine and 2 years imprisonment</li>
                            <li>"I was following orders" is not a valid defence</li>
                            <li>Competence and training are legal requirements, not just preferences</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Immediate Duties When Faults Are Found:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li>Isolate dangerous circuits immediately</li>
                            <li>Prevent access to hazardous areas</li>
                            <li>Report findings to appropriate persons</li>
                            <li>Ensure no one is exposed to danger</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Critical Understanding</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          EAWR 1989 is criminal law, not just guidance. Failure to comply when faults are discovered can result in prosecution even if no actual harm occurs. The law requires proactive safety management, not reactive responses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-duties-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Safety First – Isolating Faulty Circuits */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Safety First – Isolating Faulty Circuits</h3>
            <p className="text-base text-foreground mb-4">
              Safe isolation procedures are legally required and must be followed whenever electrical faults are discovered:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Safe Isolation Procedures</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Mandatory Isolation Steps:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Before Investigation</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Isolate the circuit at the source</li>
                                <li>Secure isolation (lock off if possible)</li>
                                <li>Test voltage indicator on known live source</li>
                                <li>Test circuit is dead at multiple points</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">During Work</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Apply warning notices</li>
                                <li>Prevent unauthorised re-energisation</li>
                                <li>Re-test before touching conductors</li>
                                <li>Treat all conductors as live until proven dead</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Legal Requirements:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li><strong>Regulation 14:</strong> Work on dead equipment only (with limited exceptions)</li>
                            <li><strong>Regulation 13:</strong> Adequate precautions to prevent electrical danger</li>
                            <li><strong>Regulation 12:</strong> Suitable means of cutting off supply and for isolation</li>
                            <li>Failure to isolate properly can result in prosecution even without injury</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Documentation Requirements:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">Permit to Work</p>
                            <p className="text-xs sm:text-sm text-foreground">Required for complex or high-risk isolation procedures</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">Isolation Certificates</p>
                            <p className="text-xs sm:text-sm text-foreground">Record of isolation procedures and safety checks</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Legal Consequence</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Working on live equipment when it could reasonably be made dead is a serious breach of EAWR 1989. Even experienced electricians have been prosecuted and imprisoned for failing to follow proper isolation procedures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-procedures-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Reporting and Documentation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Reporting and Documentation</h3>
            <p className="text-base text-foreground mb-4">
              Proper reporting and documentation are legal requirements that provide essential protection:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Documentation and Reporting Requirements</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Immediate Reporting</p>
                          <p className="text-xs sm:text-sm text-foreground">Dangerous faults must be reported immediately to supervisors and duty holders</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Detailed Records</p>
                          <p className="text-xs sm:text-sm text-foreground">Complete documentation of faults, actions taken, and test results</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Legal Evidence</p>
                          <p className="text-xs sm:text-sm text-foreground">Records provide evidence of due diligence and legal compliance</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Professional Protection</p>
                          <p className="text-xs sm:text-sm text-foreground">Proper documentation protects against future liability claims</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Required Documentation Elements:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Precise description of the fault discovered</li>
                          <li>Date, time, and location of discovery</li>
                          <li>Immediate actions taken to secure safety</li>
                          <li>Test results and measurements taken</li>
                          <li>Corrective actions performed</li>
                          <li>Re-test results confirming safe operation</li>
                          <li>Name and signature of responsible person</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Legal Protection</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Proper documentation demonstrates that you acted responsibly and followed correct procedures. In legal proceedings, good records can be the difference between prosecution and exoneration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Professional and Legal Consequences */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Professional and Legal Consequences of Negligence</h3>
            <p className="text-base text-foreground mb-4">
              Failing to meet legal and safety responsibilities can have severe personal and professional consequences:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">Consequences of Non-Compliance</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Criminal Penalties</p>
                          <p className="text-xs sm:text-sm text-foreground">Unlimited fines and up to 2 years imprisonment under EAWR 1989</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Civil Liability</p>
                          <p className="text-xs sm:text-sm text-foreground">Personal compensation claims for injury and damage</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Professional Impact</p>
                          <p className="text-xs sm:text-sm text-foreground">Loss of competency cards and professional registration</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Career Damage</p>
                          <p className="text-xs sm:text-sm text-foreground">Difficulty obtaining future employment and insurance</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Real Consequences:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>HSE prosecutions result in average fines of £200,000+ for serious cases</li>
                          <li>Individual electricians have received prison sentences for safety breaches</li>
                          <li>Professional body sanctions can end electrical careers</li>
                          <li>Civil claims can reach millions for serious injury cases</li>
                          <li>Criminal records affect future employment and travel</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Reality</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Courts increasingly impose severe penalties for electrical safety breaches because of the potential for serious harm. "I didn't know" or "I thought it would be OK" are not acceptable defences when dealing with electrical faults.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Legal Compliance Procedures:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Always follow safe isolation procedures before investigating or working on faulty circuits.</li>
                <li>Report dangerous conditions immediately to supervisors and duty holders.</li>
                <li>Document all findings, actions, and test results with complete accuracy.</li>
                <li>Never energise circuits that have failed testing or have unresolved faults.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Professional Protection:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Maintain competency through regular training and updates to regulations.</li>
                <li>Keep detailed records of all electrical work and fault investigations.</li>
                <li>Ensure appropriate professional indemnity insurance coverage.</li>
                <li>Seek guidance from supervisors when dealing with complex or unusual faults.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Emergency Procedures:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Establish clear procedures for reporting dangerous electrical conditions.</li>
                <li>Ensure 24/7 contact methods for emergency fault situations.</li>
                <li>Maintain emergency isolation procedures and equipment access.</li>
                <li>Train all personnel in their legal duties and emergency procedures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-foreground mb-3">Case Study: HSE Prosecution for Ignored Earth Fault</h3>
              <p className="text-base text-foreground mb-4">
                During a commercial refurbishment, an electrician discovered a loose earth connection in a distribution board but failed to report it, assuming it "would be fine until the job was finished." Three weeks later, an earth fault occurred and the faulty connection prevented proper protective device operation. An employee received a severe electric shock requiring hospital treatment.
              </p>
              <p className="text-base text-foreground mb-4">
                <strong>HSE Investigation:</strong> The investigation revealed that the electrician had identified the fault but failed to isolate the circuit, report the condition, or rectify the problem immediately. The fault was documented in his personal notes but not reported to supervisors or the client.
              </p>
              <p className="text-base text-foreground mb-4">
                <strong>Legal Consequences:</strong>
              </p>
              <ul className="text-base text-foreground ml-6 list-disc space-y-1">
                <li>The electrician was prosecuted individually under EAWR 1989 Regulation 3</li>
                <li>He received a £15,000 fine and 6 months suspended prison sentence</li>
                <li>His JIB card was suspended and he lost his job</li>
                <li>The company faced additional prosecution and a £180,000 fine</li>
                <li>The injured employee sued for £85,000 compensation</li>
              </ul>
              <p className="text-base text-foreground mt-4">
                <strong>Key Learning:</strong> Finding a fault creates a legal duty to act immediately. Personal knowledge of a dangerous condition that you fail to address properly can result in personal prosecution, even if you're not directly responsible for the accident.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-base font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>EAWR 1989 creates personal legal duties for all electrical workers with serious criminal penalties for non-compliance.</li>
            <li>Safe isolation procedures are mandatory before investigating or working on faulty electrical equipment.</li>
            <li>Immediate reporting and detailed documentation of faults are legal requirements that provide essential protection.</li>
            <li>Professional and legal consequences of negligence include prosecution, fines, imprisonment, and career-ending sanctions.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Legal and Safety Responsibilities" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous: Fault Categories</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="..">
              <span className="hidden sm:inline">Back to Section 1</span>
              <span className="sm:hidden">Section 1</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section1_5;