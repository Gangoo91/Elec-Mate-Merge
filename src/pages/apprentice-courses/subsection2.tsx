import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, Lock, Zap, BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electricity at Work Regulations 1989 (EAWR) - Module 1.1.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master the essential UK legal requirements for electrical safety. Learn safe isolation, live working, and EAWR compliance for electrical apprentices.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which EAWR regulation requires systems to be constructed and maintained to prevent danger?",
    options: ["Regulation 4", "Regulation 14", "Regulation 16", "Regulation 29"],
    correctIndex: 0,
    explanation: "Regulation 4 covers the need for systems to be of such construction, maintained so as to prevent danger."
  },
  {
    id: 2,
    question: "Under EAWR, when may work be carried out on or near live conductors?",
    options: [
      "Always, if wearing gloves",
      "Only when it is unreasonable to work dead and suitable precautions are taken",
      "Never under any circumstances",
      "Only by apprentices"
    ],
    correctIndex: 1,
    explanation: "Regulation 14 permits live work only when strictly justified and with precautions."
  },
  {
    id: 3,
    question: "Which of the following is part of a safe isolation process?",
    options: [
      "Relying on signage only",
      "Proving dead with an approved tester before work begins",
      "Using a multimeter on resistance range",
      "Assuming the circuit is off if the switch is down"
    ],
    correctIndex: 1,
    explanation: "Safe isolation includes proving the instrument, isolating, locking off, labelling and proving dead at the point of work."
  },
  {
    id: 4,
    question: "Which regulation specifically covers competence requirements?",
    options: ["Regulation 12", "Regulation 13", "Regulation 16", "Regulation 29"],
    correctIndex: 2,
    explanation: "Regulation 16 requires that no person shall undertake electrical work unless competent or under supervision of a competent person."
  }
];

const Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which EAWR regulation requires systems to be constructed and maintained to prevent danger?",
      options: ["Regulation 4", "Regulation 14", "Regulation 16", "Regulation 29"],
      correctAnswer: 0,
      explanation: "Regulation 4 covers the need for systems to be of such construction, maintained so as to prevent danger."
    },
    {
      id: 2,
      question: "Under EAWR, when may work be carried out on or near live conductors?",
      options: [
        "Always, if wearing gloves",
        "Only when it is unreasonable to work dead and suitable precautions are taken",
        "Never under any circumstances",
        "Only by apprentices"
      ],
      correctAnswer: 1,
      explanation: "Regulation 14 permits live work only when strictly justified and with precautions."
    },
    {
      id: 3,
      question: "Which of the following is part of a safe isolation process?",
      options: [
        "Relying on signage only",
        "Proving dead with an approved tester before work begins",
        "Using a multimeter on resistance range",
        "Assuming the circuit is off if the switch is down"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation includes proving the instrument, isolating, locking off, labelling and proving dead at the point of work."
    },
    {
      id: 4,
      question: "Regulation 16 relates to:",
      options: ["Protective devices", "Competence and authorisation", "Portable appliances", "Earthing arrangements"],
      correctAnswer: 1,
      explanation: "Reg 16 requires persons to be competent or under suitable supervision for the work."
    },
    {
      id: 5,
      question: "How does EAWR link to BS 7671?",
      options: [
        "EAWR provides detailed circuit designs",
        "Compliance with BS 7671 helps demonstrate that work prevents danger as required by EAWR",
        "There is no link",
        "BS 7671 replaces EAWR"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is widely used to demonstrate compliance with EAWR's general duties."
    },
    {
      id: 6,
      question: "Which agency primarily enforces EAWR in the UK?",
      options: ["Local Council", "Health and Safety Executive (HSE)", "NICEIC", "IET"],
      correctAnswer: 1,
      explanation: "The HSE enforces EAWR in most workplaces, with local authorities enforcing in some commercial premises."
    },
    {
      id: 7,
      question: "What is the main difference between EAWR and BS 7671?",
      options: [
        "EAWR is law, BS 7671 is technical guidance",
        "They are identical documents",
        "BS 7671 is mandatory, EAWR is guidance",
        "EAWR only applies to apprentices"
      ],
      correctAnswer: 0,
      explanation: "EAWR is statutory law requiring prevention of danger, while BS 7671 provides technical methods to achieve this."
    },
    {
      id: 8,
      question: "As an apprentice, what should you do if asked to perform work beyond your competence?",
      options: [
        "Attempt it anyway",
        "Refuse completely",
        "Seek supervision or guidance",
        "Look it up online"
      ],
      correctAnswer: 2,
      explanation: "Regulation 16 requires competence or supervision - apprentices should seek guidance when work exceeds their current competence level."
    }
  ];

  const faqs = [
    {
      question: "Does EAWR apply to apprentices?",
      answer: "Yes - EAWR applies to all electrical work regardless of who performs it. Apprentices must follow safe isolation procedures and work under supervision as required by Regulation 16."
    },
    {
      question: "When is live working permitted?",
      answer: "Only when it's unreasonable to work dead (Reg 14). Examples include fault finding, testing where the system must be energised, or maintaining life-support systems. Suitable precautions must always be taken."
    },
    {
      question: "What's the difference between EAWR and HASAWA?",
      answer: "HASAWA sets general workplace safety duties. EAWR provides specific electrical safety requirements. Both work together - HASAWA provides the framework, EAWR provides electrical detail."
    },
    {
      question: "Who enforces EAWR?",
      answer: "The Health and Safety Executive (HSE) enforces EAWR in most workplaces. Local authorities may enforce in some commercial premises. Penalties include fines and imprisonment for serious breaches."
    },
    {
      question: "How do I prove competence under Regulation 16?",
      answer: "Competence is demonstrated through training, qualifications, experience, and knowledge. Apprentices develop competence through structured training and supervision. Employers must assess and ensure competence."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 1.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Electricity at Work Regulations 1989 (EAWR)
          </h1>
          <p className="text-muted-foreground text-lg">
            Master the essential UK legal requirements for electrical safety. Learn safe isolation, live working, and EAWR compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>EAWR is UK law requiring all electrical systems and work to prevent danger.</li>
                <li>Covers system construction, safe isolation, live working, and competence requirements.</li>
                <li>Applies to all electrical work regardless of who performs it.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Safe isolation procedures, competence checks, danger prevention measures.</li>
                <li><strong>Use:</strong> Proper isolation techniques, live work justification, supervision protocols.</li>
                <li><strong>Check:</strong> Regulation compliance, safety procedures, competence verification.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-base text-foreground">
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Identify key EAWR regulations and their practical application in electrical work</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Understand when live working may be justified and required precautions</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Execute safe isolation procedures in compliance with EAWR and BS 7671</span>
              </li>
            </ul>
            <ul className="space-y-3 text-base text-foreground">
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Recognise competence requirements and when supervision is needed</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Apply EAWR principles to prevent danger in electrical installations</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Demonstrate compliance with legal electrical safety requirements</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Content Sections */}
        {/* Section 1: EAWR Framework */}
        <div className="space-y-6 mb-8">
          <div className="rounded-lg p-6 border-l-4 border-l-emerald-500 bg-card">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-400 dark:text-emerald-400 mb-3">EAWR Legal Framework and Principles</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Legislative Purpose</h4>
                    <p className="text-base text-foreground mb-2">EAWR sets specific legal duties for electrical safety in all workplaces.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                      <li>Applies to all electrical systems, equipment and work activities</li>
                      <li>Sets legal duties rather than technical guidance (unlike BS 7671)</li>
                      <li>Requires prevention of danger from electrical systems and work</li>
                      <li>Covers construction, maintenance, use and work on electrical systems</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Principles</h4>
                    <p className="text-base text-foreground mb-2">Danger prevention, competence and proper procedures are fundamental.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                      <li>Systems must be constructed and maintained to prevent danger</li>
                      <li>Work must be planned and executed to prevent danger</li>
                      <li>Only competent persons should undertake electrical work</li>
                      <li>Live working only permitted when justified with precautions</li>
                    </ul>
                  </div>

                  <div className="bg-background/50 p-3 rounded border">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Legal Foundation:</strong> EAWR makes electrical safety a specific legal requirement with clear duties for all electrical work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck
            id="eawr-framework"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 2: Key EAWR Regulations for Apprentices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
              <CardTitle className="text-base">Key EAWR Regulations for Apprentices</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              While EAWR contains 33 regulations, certain ones are particularly relevant to apprentice electricians and day-to-day electrical work.
            </p>

            <div className="grid gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-emerald-400 mb-2">Regulation 4 - Construction & Maintenance</h4>
                <p className="text-sm text-muted-foreground">Systems must be constructed and maintained to prevent danger. This covers design, installation, and ongoing maintenance.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-green-600 mb-2">Regulation 12 - Means of Cutting Off Supply</h4>
                <p className="text-sm text-muted-foreground">Suitable means must be available for cutting off electrical supply and isolation where necessary.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-orange-600 mb-2">Regulation 13 - Precautions for Work on Dead Systems</h4>
                <p className="text-sm text-muted-foreground">Adequate precautions must be taken to prevent electrical equipment becoming live while work is carried out.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-red-600 mb-2">Regulation 14 - Work on or Near Live Conductors</h4>
                <p className="text-sm text-muted-foreground">No work on or near live conductors unless it's unreasonable to work dead and suitable precautions are taken.</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-purple-600 mb-2">Regulation 16 - Persons to be Competent</h4>
                <p className="text-sm text-muted-foreground">No person shall undertake electrical work unless competent or under supervision of a competent person.</p>
              </div>
            </div>

            <InlineCheck
              id="reg-14"
              question="Under Regulation 14, when is live working permitted?"
              options={[
                "Whenever it's more convenient",
                "Only when unreasonable to work dead and with precautions",
                "Never under any circumstances",
                "Only with rubber gloves"
              ]}
              correctIndex={1}
              explanation="Regulation 14 permits live work only when it's unreasonable to work dead AND suitable precautions are taken."
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Section 3: Safe Isolation Procedures */}
        <Card className="border-l-4 border-l-orange-500 mb-8 p-6 bg-card border-border/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
              <CardTitle className="text-base">Safe Isolation Procedures</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              Safe isolation is fundamental to electrical safety and required by EAWR. It ensures electrical equipment cannot become live while work is carried out.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2 text-sm">The 5-Step Safe Isolation Process:</h4>
              <ol className="space-y-2 text-sm text-yellow-700">
                <li><strong>1.</strong> Prove your tester on a known live source or proving unit</li>
                <li><strong>2.</strong> Identify the correct circuit and isolate using proper isolation device</li>
                <li><strong>3.</strong> Lock off the isolation and apply warning labels/permits</li>
                <li><strong>4.</strong> Prove dead at the point of work using approved tester</li>
                <li><strong>5.</strong> Re-prove your tester on the known live source</li>
              </ol>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Safety Points
              </h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Never rely on functional switches for isolation</li>
                <li>• Always use two-pole testers to prove dead</li>
                <li>• Maintain control of isolation keys</li>
                <li>• Re-check isolation after any breaks in work</li>
              </ul>
            </div>

            <InlineCheck
              id="isolation-steps"
              question="What should you do immediately after isolating a circuit?"
              options={[
                "Start work immediately",
                "Lock off and apply warning labels",
                "Tell everyone the power is off",
                "Test with a multimeter"
              ]}
              correctIndex={1}
              explanation="After isolation, you must lock off and apply warning labels before proving dead at the point of work."
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Section 4: Live Working Decisions */}
        <Card className="border-l-4 border-l-red-500 mb-8 p-6 bg-card border-border/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
              <CardTitle className="text-base">Live Working Decisions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              EAWR Regulation 14 permits live working only under specific circumstances. As an apprentice, you must understand when this might be justified and what precautions are required.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">Live Work Decision Process:</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li><strong>1.</strong> Default position: Plan to work dead</li>
                <li><strong>2.</strong> Is it unreasonable to work dead? (Consider disruption, safety, etc.)</li>
                <li><strong>3.</strong> If yes, identify all risks and select appropriate precautions</li>
                <li><strong>4.</strong> Ensure competent persons and supervision (Reg 16)</li>
                <li><strong>5.</strong> Implement controls: barriers, PPE, emergency procedures</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2 text-sm">Acceptable Justifications:</h4>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Testing/fault finding requiring live systems</li>
                  <li>• Hospital life support systems</li>
                  <li>• Process control where shutdown risks are greater</li>
                  <li>• Emergency services and essential services</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2 text-sm">Not Acceptable:</h4>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>• Convenience or time pressure</li>
                  <li>• Lack of planning</li>
                  <li>• Cost savings</li>
                  <li>• "We always do it this way"</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id="live-work"
              question="Which scenario would justify live working?"
              options={[
                "The client wants the job done quickly",
                "Testing requires the system to be energised",
                "Isolation keys are lost",
                "It's Friday afternoon"
              ]}
              correctIndex={1}
              explanation="Live working is only justified when it's unreasonable to work dead - testing that requires live systems is a valid technical justification."
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Section 5: Competence and Supervision */}
        <Card className="border-l-4 border-l-purple-500 mb-8 p-6 bg-card border-border/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</div>
              <CardTitle className="text-base">Competence and Supervision</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              EAWR Regulation 16 requires that electrical work is only undertaken by competent persons or those under supervision. Understanding what constitutes competence is crucial for apprentices.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">Elements of Competence:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Knowledge:</strong> Understanding of electrical principles, hazards, and safety procedures</li>
                <li><strong>Skills:</strong> Practical ability to carry out the work safely and correctly</li>
                <li><strong>Experience:</strong> Sufficient exposure to similar work and situations</li>
                <li><strong>Awareness:</strong> Recognition of limitations and when to seek help</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 text-sm">As an Apprentice:</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Work under supervision when required</li>
                  <li>• Know your limitations and ask for guidance</li>
                  <li>• Build competence progressively</li>
                  <li>• Keep records of training and experience</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2 text-sm">Supervision Requirements:</h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Must be by a competent person</li>
                  <li>• Level depends on task complexity and risk</li>
                  <li>• Can be direct observation or available guidance</li>
                  <li>• Should reduce as competence develops</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id="competence"
              question="What should an apprentice do when faced with unfamiliar electrical work?"
              options={[
                "Attempt it anyway",
                "Seek supervision or guidance",
                "Look it up online",
                "Ask another apprentice"
              ]}
              correctIndex={1}
              explanation="Apprentices should seek supervision or guidance when faced with work beyond their current competence level."
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Section 6: EAWR and BS 7671 Relationship */}
        <Card className="border-l-4 border-l-teal-500 mb-8 p-6 bg-card border-border/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">6</div>
              <CardTitle className="text-base">EAWR and BS 7671 Relationship</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              Understanding how EAWR relates to BS 7671 is essential. EAWR sets legal duties, while BS 7671 provides technical methods to achieve compliance.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">The Relationship:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>EAWR:</strong> Legal statute requiring prevention of danger</li>
                <li><strong>BS 7671:</strong> Technical standard providing methods to prevent danger</li>
                <li><strong>Compliance:</strong> Following BS 7671 helps demonstrate EAWR compliance</li>
                <li><strong>Alternatives:</strong> Other standards may be used if they prevent danger</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 text-sm">Practical Application:</h4>
              <p className="text-sm text-blue-700 mb-2">
                When designing or installing electrical systems, following BS 7671 provides a recognised method of meeting EAWR's requirement to prevent danger. However, EAWR is the legal requirement - BS 7671 is the technical means.
              </p>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• BS 7671 compliance supports EAWR defence (Reg 29)</li>
                <li>• Departures from BS 7671 must still prevent danger</li>
                <li>• Both apply to all electrical work in the UK</li>
              </ul>
            </div>

            <InlineCheck
              id="eawr-bs7671"
              question="How does BS 7671 relate to EAWR?"
              options={[
                "BS 7671 replaces EAWR",
                "They are completely separate",
                "BS 7671 provides technical methods to meet EAWR requirements",
                "EAWR only applies to industrial installations"
              ]}
              correctIndex={2}
              explanation="BS 7671 provides widely accepted technical methods to meet EAWR's legal requirement to prevent danger."
            />
          </CardContent>
        </Card>

        {/* Real-world Scenario */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Briefcase className="w-5 h-5" />
              Real-world Scenario: Office Socket Replacement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="font-medium">Situation: Replacing a damaged socket outlet in an occupied office during working hours.</p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-2">EAWR Application:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Reg 13:</strong> Plan to work dead - isolate at distribution board</li>
                    <li>• <strong>Reg 16:</strong> Ensure competent person or supervision</li>
                    <li>• <strong>Reg 4:</strong> Maintain system safety throughout</li>
                    <li>• <strong>Safe isolation:</strong> Follow 5-step process completely</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Practical Steps:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Identify circuit and isolate at DB</li>
                    <li>• Lock off and apply warning notices</li>
                    <li>• Prove dead at socket location</li>
                    <li>• Complete work safely with barriers</li>
                    <li>• Test and verify before re-energising</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-3 text-base text-foreground">
            <p>EAWR provides the legal framework for electrical safety in the UK, setting clear duties for danger prevention.</p>
            <p>Key regulations cover system construction, safe isolation, live working limitations, and competence requirements.</p>
            <p>As apprentices, you must understand when supervision is required and follow safe isolation procedures religiously.</p>
            <p>The relationship between EAWR and BS 7671 ensures legal compliance through recognised technical standards.</p>
          </div>
        </Card>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Do's for Apprentices
            </h2>
            <ul className="space-y-2 text-sm text-green-700">
              <li>✓ Always follow safe isolation procedures completely</li>
              <li>✓ Seek supervision when work exceeds your competence</li>
              <li>✓ Use proper test equipment and prove dead before work</li>
              <li>✓ Document any departures from standard procedures</li>
              <li>✓ Understand the legal requirements before starting work</li>
              <li>✓ Keep isolation keys under your control</li>
            </ul>
          </Card>

          <Card className="p-6 bg-red-50 border-red-200">
            <h2 className="text-lg sm:text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Don'ts for Apprentices
            </h2>
            <ul className="space-y-2 text-sm text-red-700">
              <li>✗ Never assume a circuit is dead without proving</li>
              <li>✗ Don't work live unless absolutely justified</li>
              <li>✗ Never rely on functional switches for isolation</li>
              <li>✗ Don't work beyond your competence level</li>
              <li>✗ Never remove isolation without proper authority</li>
              <li>✗ Don't ignore company safety procedures</li>
            </ul>
          </Card>
        </div>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            EAWR Quick Reference - Pocket Card
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-2">Key Regulations:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Reg 4: Systems prevent danger</li>
                <li>• Reg 12: Isolation means available</li>
                <li>• Reg 13: Work dead precautions</li>
                <li>• Reg 14: Live work justified only</li>
                <li>• Reg 16: Competence required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Safe Isolation Steps:</h3>
              <ol className="space-y-1 text-muted-foreground">
                <li>1. Prove tester on known source</li>
                <li>2. Isolate correct circuit</li>
                <li>3. Lock off and label</li>
                <li>4. Prove dead at work point</li>
                <li>5. Re-prove tester</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz title="EAWR Knowledge Check" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../subsection1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="../subsection3">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section1_2;
