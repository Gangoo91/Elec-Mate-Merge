import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, ClipboardList, Building, Lock, Key, Tag, FileCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lockout/Tagout and Permit-to-Work Systems - Module 1.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master formal safety systems for electrical isolation, including LOTO procedures and permit-to-work systems for safe electrical work practices.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does 'lockout' prevent?",
    options: ["Equipment theft", "Accidental re-energising of equipment", "Unauthorised personnel access", "Damage to tools"],
    correctIndex: 1,
    explanation: "Lockout prevents the accidental re-energising of equipment or circuits by physically securing the isolator in the 'off' position."
  },
  {
    id: 2,
    question: "Why should each worker use their own padlock?",
    options: ["To prevent theft", "Company policy requirement", "To ensure individual control over safety", "To save costs"],
    correctIndex: 2,
    explanation: "Each worker must use their own padlock to ensure they have individual control over the safety of the isolation. This prevents work from continuing if one person hasn't finished."
  },
  {
    id: 3,
    question: "What is a permit-to-work system used for?",
    options: ["Payroll management", "Tool inventory", "Formal safety agreement and authorisation", "Equipment maintenance schedules"],
    correctIndex: 2,
    explanation: "A permit-to-work system is a formal safety agreement between the worker and the person responsible for the site, providing written authorisation and safety confirmation."
  }
];

const Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does 'lockout' prevent?",
      options: [
        "Equipment theft",
        "Accidental re-energising of equipment",
        "Unauthorised personnel access",
        "Damage to tools"
      ],
      correctAnswer: 1,
      explanation: "Lockout prevents the accidental re-energising of equipment or circuits by physically securing the isolator in the 'off' position."
    },
    {
      id: 2,
      question: "Why should each worker use their own padlock?",
      options: [
        "To prevent theft",
        "Company policy requirement",
        "To ensure individual control over safety",
        "To save costs"
      ],
      correctAnswer: 2,
      explanation: "Each worker must use their own padlock to ensure they have individual control over the safety of the isolation. This prevents work from continuing if one person hasn't finished."
    },
    {
      id: 3,
      question: "What information should be included on a tag?",
      options: [
        "Worker's name and contact information",
        "Date and time only",
        "Circuit number only",
        "Company logo"
      ],
      correctAnswer: 0,
      explanation: "Tags should include the worker's name and contact information to identify who applied the lock and how to reach them if needed."
    },
    {
      id: 4,
      question: "What is a permit-to-work system used for?",
      options: [
        "Payroll management",
        "Tool inventory",
        "Formal safety agreement and authorisation",
        "Equipment maintenance schedules"
      ],
      correctAnswer: 2,
      explanation: "A permit-to-work system is a formal safety agreement between the worker and the person responsible for the site, providing written authorisation and safety confirmation."
    },
    {
      id: 5,
      question: "True or False: One padlock is enough for multiple workers on a shared job.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Each worker must use their own padlock. If multiple people are working, multiple locks must be applied to ensure everyone's safety."
    },
    {
      id: 6,
      question: "When using a group lock box, what must each worker do?",
      options: [
        "Share a single key with the team",
        "Place their own individual lock on the box",
        "Only the supervisor needs to lock it",
        "Use a company master key"
      ],
      correctAnswer: 1,
      explanation: "Each worker must place their own individual lock on the group lock box to maintain individual control over the isolation."
    },
    {
      id: 7,
      question: "Which scenarios typically require a permit-to-work?",
      options: [
        "Simple domestic repairs only",
        "High-voltage work and switchgear operations",
        "Tool maintenance only",
        "Office electrical work"
      ],
      correctAnswer: 1,
      explanation: "Permit-to-work systems are typically required for high-voltage work, switchgear operations, confined spaces, and work that affects others on site."
    },
    {
      id: 8,
      question: "What are the essential fields that must be included on a permit-to-work?",
      options: [
        "Only the worker's name",
        "Description of work, isolation confirmation, authorisation, and sign-off",
        "Only the date and time",
        "Just the equipment location"
      ],
      correctAnswer: 1,
      explanation: "A complete permit must include a description of the work, confirmation the system is safely isolated, authorisation to proceed, and sign-off after completion."
    },
    {
      id: 9,
      question: "What should you do if your lock-off device doesn't fit the isolator?",
      options: [
        "Proceed without locking off",
        "Use tape instead",
        "Find an appropriate device or alternative isolation method",
        "Ask someone else to hold the switch"
      ],
      correctAnswer: 2,
      explanation: "You must find an appropriate lock-off device or use an alternative isolation method. Never proceed without proper physical isolation."
    },
    {
      id: 10,
      question: "Who is responsible for maintaining documentation in a permit-to-work system?",
      options: [
        "Only the worker doing the task",
        "Only the site supervisor",
        "Both the authorising person and the worker",
        "The company's admin department"
      ],
      correctAnswer: 2,
      explanation: "Both the person authorising the work and the worker have responsibilities for maintaining proper documentation throughout the permit process."
    }
  ];

  const faqs = [
    {
      question: "What happens if I lose my padlock key during work?",
      answer: "Never break or cut your own lock. Contact your supervisor immediately - they should have procedures for this situation, which may involve specialist lock removal by maintenance personnel with proper documentation."
    },
    {
      question: "Can I use the same lock for multiple isolation points?",
      answer: "No, each isolation point should have its own lock where possible. If one lock must secure multiple points, use a lock box system where your individual lock secures the group key."
    },
    {
      question: "How long is a permit-to-work valid?",
      answer: "Permits have specific time limits stated on the document. They typically expire at the end of a shift or specified time period. Extended work requires permit renewal or extension."
    },
    {
      question: "What should I do if I find equipment that's locked out but no one is around?",
      answer: "Never remove locks that aren't yours. Check with the supervisor, look for contact details on tags, and follow site procedures for abandoned locks. Safety is more important than delays."
    },
    {
      question: "Do I need a permit for simple electrical repairs?",
      answer: "It depends on the work complexity, voltage levels, and site policies. When in doubt, ask your supervisor. It's better to have an unnecessary permit than risk safety without one."
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
              <Lock className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 1.5.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Lockout/Tagout and Permit-to-Work Systems
          </h1>
          <p className="text-muted-foreground">
            Master formal safety systems for electrical isolation, including LOTO procedures and permit-to-work systems.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>LOTO systems prevent accidental re-energising during work.</li>
                <li>Each worker uses their own lock and key.</li>
                <li>Permit-to-work adds formal safety agreements.</li>
                <li>Essential for high-risk and multi-person jobs.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> High-voltage switchgear work, multiple workers on one system.</li>
                <li><strong>Use:</strong> Individual locks, group lock boxes, permit systems.</li>
                <li><strong>Check:</strong> Commercial and industrial sites, work affecting others.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand what Lockout/Tagout (LOTO) means and why it's essential.</li>
            <li>Learn how to apply LOTO systems correctly for individual and group work.</li>
            <li>Understand what a permit-to-work system involves and when it's required.</li>
            <li>Recognise the responsibilities and documentation requirements for safe isolation.</li>
            <li>Apply LOTO and permit systems to prevent electrical accidents and ensure compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Understanding LOTO */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Understanding Lockout/Tagout (LOTO) Systems</h3>
            <p className="text-base text-foreground mb-4">
              LOTO systems provide physical and visual protection against accidental re-energising of electrical systems:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">LOTO Fundamentals and Components</p>
                    <p className="text-base text-foreground mb-2"><strong>Lockout component:</strong> Physical security of isolation points.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Physically securing isolators in the "off" position using padlocks</li>
                      <li>Prevents accidental or unauthorised re-energising of circuits</li>
                      <li>Each worker must use their own unique lock and key</li>
                      <li>Lock removal only by the person who applied it</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Tagout component:</strong> Clear identification and communication.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Warning tags attached to locked isolators</li>
                      <li>Tags include worker's name and contact information</li>
                      <li>Clear "DO NOT OPERATE" or similar warnings</li>
                      <li>Date and time when lock was applied</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>LOTO process steps:</strong> Systematic approach to safe isolation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identify all energy sources and isolation points</li>
                      <li>Apply physical locks to all relevant isolators</li>
                      <li>Attach warning tags with worker identification</li>
                      <li>Test for zero energy state before beginning work</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> LOTO provides both physical barriers and clear communication to prevent accidents
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="loto-understanding-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Group LOTO Systems */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Group LOTO and Lock Box Systems</h3>
            <p className="text-base text-foreground mb-4">
              When multiple workers are involved in electrical work, group LOTO systems ensure every person's safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Multiple Worker Safety Principles</p>
                    <p className="text-base text-foreground mb-2"><strong>Individual control requirement:</strong> Each worker must have personal control.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Each person uses their own padlock - no sharing allowed</li>
                      <li>Individual key ownership ensures personal control over safety</li>
                      <li>Work cannot continue if any worker is absent</li>
                      <li>No worker can be left in a dangerous situation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Group lock box system:</strong> Coordinating multiple locks effectively.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Master isolation key secured inside group lock box</li>
                      <li>Each worker places their own lock on the box</li>
                      <li>Box cannot be opened until all workers remove their locks</li>
                      <li>System prevents re-energising while anyone is still working</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Communication and coordination:</strong> Essential for group safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Clear communication about work scope and timing</li>
                      <li>Designated person to coordinate lock application and removal</li>
                      <li>Regular check-ins and progress updates</li>
                      <li>Formal sign-in/sign-out procedures</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Every worker must have individual control - no exceptions or shortcuts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="group-loto-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Permit to Work Systems */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Permit-to-Work Systems</h3>
            <p className="text-base text-foreground mb-4">
              Permit-to-work systems provide formal documentation and authorisation for high-risk electrical work:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Permit-to-Work Framework and Requirements</p>
                    <p className="text-base text-foreground mb-2"><strong>Purpose and scope:</strong> Formal safety agreement and documentation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Written safety agreement between worker and site authority</li>
                      <li>Formal authorisation to proceed with high-risk work</li>
                      <li>Documentation of safety measures and responsibilities</li>
                      <li>Legal protection through proper documentation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>When permits are required:</strong> High-risk electrical activities.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>High-voltage work and switchgear operations</li>
                      <li>Work affecting multiple systems or other trades</li>
                      <li>Confined space work with electrical hazards</li>
                      <li>Live working where unavoidable</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Essential permit information:</strong> Complete documentation requirements.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Detailed description of work scope and methods</li>
                      <li>Confirmation that system is safely isolated and tested</li>
                      <li>Hazard identification and control measures</li>
                      <li>Authorisation signatures and time validity periods</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Permits ensure all parties understand risks and agree on safety measures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="permit-work-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Building className="w-5 h-5" />
              Real-World Example: Manufacturing Plant Group LOTO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="font-medium">Situation: Electrical maintenance on a production line involving five electricians working simultaneously.</p>
              <p>
                Initially, only the lead electrician applied a single lock, thinking coordination through him would be 
                sufficient. However, when one electrician finished early and left without informing the lead, production 
                management pressured for system re-energising while others were still working.
              </p>
              <p className="font-medium">LOTO system implemented:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Group lock box:</strong> Master isolation key secured in lockable box</li>
                <li><strong>Individual locks:</strong> Each of the five electricians placed their own lock on the box</li>
                <li><strong>Formal permit:</strong> Written authorisation detailing work scope and safety measures</li>
                <li><strong>Sign-in/out system:</strong> Workers logged arrival and departure times</li>
                <li><strong>Communication protocol:</strong> Regular progress updates to control room</li>
              </ul>
              <p className="font-medium text-green-600 dark:text-green-400">
                Result: System could not be re-energised until all five workers had completed their tasks and removed 
                their individual locks, ensuring complete safety accountability and preventing accidents.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-border/20 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <HelpCircle className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-muted-foreground border-t border-border/20 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground mb-4">In this section, you learned about:</p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
                <li>The fundamentals of Lockout/Tagout (LOTO) systems and their importance</li>
                <li>Group LOTO systems and lock box procedures for multiple workers</li>
                <li>Permit-to-work systems for formal safety authorisation</li>
                <li>Essential documentation and communication requirements</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card">
              <p className="font-medium text-foreground mb-2">Key takeaway:</p>
              <p className="text-base text-foreground">
                LOTO and permit-to-work systems are essential safety tools that prevent electrical accidents through 
                physical barriers, clear communication, and formal documentation. Every worker must have individual 
                control over their safety - no shortcuts or exceptions.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../subsection20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Subsection 3
            </Link>
          </Button>
          <Button asChild>
            <Link to="../subsection22">
              Next: Subsection 5
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section5_4;