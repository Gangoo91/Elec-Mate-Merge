import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "The Health and Safety at Work etc. Act 1974 (HASAWA) - Module 1.1.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master the legal framework for health, safety and welfare in UK workplaces. Understand employer and employee duties under HASAWA for electrical work.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of HASAWA 1974?",
    options: ["Technical wiring rules", "General duties for health, safety and welfare", "Electrical testing standards", "Setting electricity prices"],
    correctIndex: 1,
    explanation: "HASAWA sets out general duties to protect the health, safety and welfare of employees and others across all industries, providing the legal framework for workplace safety."
  },
  {
    id: 2,
    question: "Which is an employer duty under HASAWA?",
    options: ["Only supervise qualified workers", "Provide safe systems of work", "Only employ electricians", "Report to HSE daily"],
    correctIndex: 1,
    explanation: "Employers must provide safe plant, equipment, safe systems of work, information, instruction, training and supervision as required under HASAWA."
  },
  {
    id: 3,
    question: "What is an employee's key duty under HASAWA?",
    options: ["Set safety policy", "Carry out risk assessments", "Take reasonable care for safety", "Supervise other workers"],
    correctIndex: 2,
    explanation: "Employees must take reasonable care for their own and others' safety, use PPE correctly, and cooperate with safety procedures and training."
  }
];

const Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of the Health and Safety at Work etc. Act 1974?",
      options: [
        "To provide technical wiring rules for electricians",
        "To set out general duties to protect the health, safety and welfare of employees and others",
        "To specify electrical testing instruments",
        "To set electricity prices"
      ],
      correctAnswer: 1,
      explanation: "HASAWA sets general duties on employers, employees and others to ensure health, safety and welfare at work across all industries."
    },
    {
      id: 2,
      question: "Which of the following is an employer duty under HASAWA?",
      options: [
        "Work only when supervised",
        "Provide a safe place of work and safe systems of work",
        "Only employ qualified electricians",
        "Report all defects directly to the HSE"
      ],
      correctAnswer: 1,
      explanation: "Employers must provide safe plant, safe systems of work, information, instruction, training and supervision as needed."
    },
    {
      id: 3,
      question: "What is an employee's duty under HASAWA?",
      options: [
        "Set the company health and safety policy",
        "Ensure all work is carried out dead",
        "Take reasonable care for their own and others' safety and cooperate with the employer",
        "Carry out all risk assessments"
      ],
      correctAnswer: 2,
      explanation: "Employees must take reasonable care, use provided PPE correctly, and cooperate with safety procedures."
    },
    {
      id: 4,
      question: "Who enforces HASAWA in the UK?",
      options: ["The Health and Safety Executive (HSE)", "NICEIC", "Ofgem", "BSI"],
      correctAnswer: 0,
      explanation: "HSE and local authorities enforce health and safety law, including HASAWA."
    },
    {
      id: 5,
      question: "How does HASAWA relate to BS 7671?",
      options: [
        "They are the same document",
        "HASAWA is the legal framework; BS 7671 provides technical requirements to achieve safety",
        "BS 7671 is law and HASAWA is guidance only",
        "There is no relation"
      ],
      correctAnswer: 1,
      explanation: "HASAWA sets legal duties; compliance with BS 7671 helps demonstrate safe systems and installations."
    },
    {
      id: 6,
      question: "What does 'reasonably practicable' mean in HASAWA?",
      options: [
        "Any measure possible regardless of cost",
        "Balance risk against time, trouble and cost of control measures",
        "Only the cheapest safety measures",
        "Measures that are convenient"
      ],
      correctAnswer: 1,
      explanation: "Reasonably practicable means balancing the risk against the time, trouble, and cost of implementing control measures."
    },
    {
      id: 7,
      question: "What should an apprentice do if asked to perform unsafe work?",
      options: [
        "Perform the work quickly",
        "Stop, make safe, and raise concerns",
        "Only work if supervised",
        "Complete the task and report later"
      ],
      correctAnswer: 1,
      explanation: "Apprentices must stop work, make the area safe, and raise concerns when asked to perform unsafe work. They are protected when raising genuine safety issues."
    },
    {
      id: 8,
      question: "Which document typically contains safe systems of work on site?",
      options: [
        "BS 7671",
        "HASAWA itself",
        "Risk Assessments and Method Statements (RAMS)",
        "Electrical Installation Certificate"
      ],
      correctAnswer: 2,
      explanation: "RAMS (Risk Assessments and Method Statements) contain safe systems of work and must be followed on site to comply with HASAWA."
    }
  ];

  const faqs = [
    {
      question: "Does HASAWA apply to apprentices and students?",
      answer: "Yes - HASAWA applies to all employees including apprentices. You have duties to take reasonable care for your own and others' safety, and to cooperate with your employer's safety procedures."
    },
    {
      question: "What happens if I refuse to do unsafe work?",
      answer: "You are protected under HASAWA when raising genuine safety concerns. Employers cannot discipline you for refusing to perform genuinely unsafe work or for reporting safety issues."
    },
    {
      question: "How does HASAWA relate to other electrical regulations?",
      answer: "HASAWA provides the legal framework for workplace safety. Other regulations like BS 7671 provide specific technical requirements that help employers meet their HASAWA duties."
    },
    {
      question: "Who can prosecute under HASAWA?",
      answer: "The Health and Safety Executive (HSE) and local authorities can investigate incidents and prosecute serious breaches. Penalties can include unlimited fines and imprisonment."
    },
    {
      question: "Do I need to know HASAWA word-for-word?",
      answer: "No - you need to understand the key principles and duties. Focus on practical application: safe systems of work, cooperation with procedures, and raising safety concerns."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
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
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 1.1.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            The Health and Safety at Work etc. Act 1974 (HASAWA)
          </h1>
          <p className="text-white/80">
            Master the legal framework for health, safety and welfare in UK workplaces. Essential knowledge for electrical apprentices.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground">
                <li>HASAWA is the main UK law covering workplace health, safety and welfare.</li>
                <li>Sets out duties for employers, employees and others to prevent harm at work.</li>
                <li>Provides the legal framework that underpins all workplace safety measures.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground">
                <li><strong>Spot:</strong> RAMS, safety briefings, PPE requirements, risk assessments.</li>
                <li><strong>Use:</strong> Safe systems of work, cooperation with procedures, reporting hazards.</li>
                <li><strong>Check:</strong> Your duties, employer obligations, safety compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the purpose and scope of HASAWA for electrical work and workplace safety.</li>
            <li>Outline employer and employee duties relevant to site activities and daily operations.</li>
            <li>Describe how HASAWA underpins BS 7671 compliance and safe systems of work.</li>
            <li>Understand the enforcement framework and consequences of non-compliance.</li>
            <li>Apply HASAWA principles in practical electrical work situations and scenarios.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Understanding HASAWA */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Understanding HASAWA Fundamentals</h3>
            <p className="text-base text-foreground mb-4">
              The Health and Safety at Work etc. Act 1974 provides the legal foundation for workplace safety across all UK industries:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Purpose and Scope of HASAWA</p>
                    <p className="text-base text-foreground mb-2"><strong>Legislative framework:</strong> HASAWA sets the legal foundation for workplace safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Applies to all workplaces, employers, employees and others affected by work activities</li>
                      <li>Sets general duties rather than specific technical requirements</li>
                      <li>Covers health, safety and welfare of people at work and members of the public</li>
                      <li>Provides framework for more specific safety regulations and standards</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Key principles:</strong> Prevention, cooperation and reasonableness underpin the Act.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Prevention is better than cure - proactive safety measures required</li>
                      <li>Cooperation between employers and employees essential for safety</li>
                      <li>Reasonably practicable - balance risk against cost and effort of controls</li>
                      <li>Continuous improvement through consultation and risk management</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Electrical industry relevance:</strong> HASAWA directly impacts electrical work practices.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Electrical work involves significant risks requiring careful management</li>
                      <li>Compliance with electrical standards like BS 7671 helps meet HASAWA duties</li>
                      <li>Safe systems of work, training and competence are HASAWA requirements</li>
                      <li>Risk assessments and method statements implement HASAWA principles</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal foundation:</strong> HASAWA makes workplace safety a legal requirement, not just good practice
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="hasawa-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Employer Duties */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Employer Duties and Responsibilities</h3>
            <p className="text-base text-foreground mb-4">
              HASAWA places specific duties on employers to ensure the health, safety and welfare of their employees:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Core Employer Obligations Under HASAWA</p>
                    <p className="text-base text-foreground mb-2"><strong>Safe plant and equipment:</strong> Providing and maintaining safe working equipment.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>All tools, machinery and equipment must be safe and properly maintained</li>
                      <li>Regular inspection, testing and maintenance schedules must be implemented</li>
                      <li>Defective equipment must be removed from service immediately</li>
                      <li>Suitable personal protective equipment (PPE) must be provided free of charge</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safe systems of work:</strong> Establishing and maintaining safe working procedures.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Risk assessments must identify hazards and control measures</li>
                      <li>Method statements detail safe procedures for specific tasks</li>
                      <li>Permit to work systems for high-risk activities like electrical work</li>
                      <li>Emergency procedures and first aid arrangements must be in place</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Information, instruction, training and supervision:</strong> Ensuring employee competence.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Induction training covering site-specific hazards and procedures</li>
                      <li>Ongoing training to maintain and develop competence levels</li>
                      <li>Clear information about risks and control measures for tasks</li>
                      <li>Adequate supervision, especially for apprentices and new employees</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safe workplace and welfare facilities:</strong> Maintaining suitable working conditions.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Safe access and egress routes maintained at all times</li>
                      <li>Adequate lighting, ventilation and temperature control</li>
                      <li>Welfare facilities including toilets, washing facilities and rest areas</li>
                      <li>First aid facilities and arrangements proportionate to workplace risks</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Employer responsibility:</strong> Employers must provide everything needed for safe working
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="employer-duties-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Employee Duties */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Employee Duties and Responsibilities</h3>
            <p className="text-base text-foreground mb-4">
              HASAWA also places important duties on employees to take responsibility for their own and others' safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Employee Responsibilities and Cooperation</p>
                    <p className="text-base text-foreground mb-2"><strong>Take reasonable care:</strong> Personal responsibility for safety at work.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Take reasonable care for your own health and safety during work activities</li>
                      <li>Consider how your actions might affect the safety of others</li>
                      <li>Follow safe systems of work and risk assessment requirements</li>
                      <li>Do not take shortcuts that compromise safety for yourself or others</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Use safety equipment correctly:</strong> Proper use of provided safety measures.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Use personal protective equipment (PPE) as instructed and trained</li>
                      <li>Use tools and equipment safely and for their intended purpose</li>
                      <li>Follow manufacturer instructions and site-specific procedures</li>
                      <li>Report damaged or defective equipment immediately</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Cooperate with safety measures:</strong> Active participation in safety systems.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Attend safety briefings, toolbox talks and training sessions</li>
                      <li>Follow method statements and risk assessment control measures</li>
                      <li>Participate in safety consultations and provide feedback</li>
                      <li>Report hazards, near misses and safety concerns promptly</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Competence and learning:</strong> Recognising limits and developing skills.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Work within your level of competence and training</li>
                      <li>Ask for help or clarification when unsure about procedures</li>
                      <li>Engage actively with training and development opportunities</li>
                      <li>Stop work if conditions change or become unsafe</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Shared responsibility:</strong> Safety is everyone's responsibility, not just the employer's
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="employee-duties-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Practical Application */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Practical Application for Electrical Apprentices</h3>
            <p className="text-base text-foreground mb-4">
              Understanding how HASAWA applies in practice helps apprentices work safely and professionally:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Daily Application of HASAWA Principles</p>
                    <p className="text-base text-foreground mb-2"><strong>Site induction and briefings:</strong> Starting work safely and informed.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Attend all site inductions covering site-specific hazards and procedures</li>
                      <li>Participate in daily toolbox talks and safety briefings</li>
                      <li>Understand emergency procedures, evacuation routes and first aid arrangements</li>
                      <li>Know who to contact for safety advice and in emergency situations</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Following RAMS and procedures:</strong> Implementing safe systems of work.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Read and understand Risk Assessments and Method Statements (RAMS)</li>
                      <li>Follow permit to work procedures for electrical isolation and testing</li>
                      <li>Use correct PPE for specific tasks and environmental conditions</li>
                      <li>Implement control measures and safety barriers as specified</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Recognising and reporting hazards:</strong> Active hazard management.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identify potential electrical hazards before starting work</li>
                      <li>Report defective equipment, unsafe conditions or near misses</li>
                      <li>Stop work if conditions change or become unsafe</li>
                      <li>Use proper channels to raise safety concerns without fear of reprisal</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Daily practice:</strong> HASAWA principles guide every aspect of electrical work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world examples</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-foreground mb-2">Scenario 1: Site Induction Safety</h3>
              <p className="text-base text-foreground mb-2">
                <strong>Situation:</strong> You arrive at a new construction site for electrical installation work.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>HASAWA Application:</strong> Attend site induction covering hazards, emergency procedures, and welfare facilities. Review RAMS for your specific tasks. Ensure you have appropriate PPE and understand isolation procedures.
              </p>
              <p className="text-sm text-white/80">
                This demonstrates employer duties (providing information and training) and employee duties (cooperating with safety procedures).
              </p>
            </div>

            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <h3 className="font-medium text-foreground mb-2">Scenario 2: Unsafe Work Request</h3>
              <p className="text-base text-foreground mb-2">
                <strong>Situation:</strong> Your supervisor asks you to work on a circuit that hasn't been properly isolated and tested.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>HASAWA Application:</strong> Refuse to perform unsafe work. Explain the need for proper isolation. Request that correct procedures be followed. Document your concerns if necessary.
              </p>
              <p className="text-sm text-white/80">
                HASAWA protects employees who raise genuine safety concerns and refuse to perform unsafe work.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-card border border-amber-400/30">
              <h3 className="font-medium text-foreground mb-2">Scenario 3: Equipment Defect Discovery</h3>
              <p className="text-base text-foreground mb-2">
                <strong>Situation:</strong> You discover that a portable electrical tool has damaged casing and exposed conductors.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>HASAWA Application:</strong> Immediately stop using the equipment. Remove it from service and mark as defective. Report the defect to your supervisor. Complete an incident report if required.
              </p>
              <p className="text-sm text-white/80">
                This demonstrates taking reasonable care for safety and cooperating with employer safety systems.
              </p>
            </div>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-3">Essential Tools and Documentation</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Site-specific RAMS and method statements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Company health and safety policy documents
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Personal training records and competence certificates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Emergency contact details and procedures
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3">Best Practice Tips</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Always attend briefings and ask questions if unclear
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Keep safety training and competence records up to date
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Report hazards and near misses promptly and honestly
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Never bypass safety systems or take shortcuts
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-muted pl-4">
                <h3 className="font-medium text-foreground mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-white/80">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-base text-foreground mb-4">
            The Health and Safety at Work etc. Act 1974 provides the legal foundation for workplace safety in the UK. It places duties on both employers and employees to ensure health, safety and welfare at work.
          </p>
          <ul className="text-xs sm:text-sm text-foreground space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              HASAWA applies to all workplaces including electrical installation sites
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Employers must provide safe systems, equipment, training and supervision
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Employees must take reasonable care and cooperate with safety measures
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Electrical standards like BS 7671 help demonstrate HASAWA compliance
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Apprentices are protected when raising genuine safety concerns
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz title="HASAWA 1974 Knowledge Check" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="../subsection2">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section1_1;