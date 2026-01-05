import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, ClipboardList, Building, Clock, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Site Safety Procedures and Protocols - Module 1.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential site safety procedures, emergency protocols, and safety management systems for electrical work environments.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What should be your first action when arriving on a new construction site?",
    options: [
      "Start work immediately",
      "Attend site induction and safety briefing",
      "Find the nearest toilet",
      "Look for the site manager"
    ],
    correctIndex: 1,
    explanation: "Site induction is mandatory and covers site-specific hazards, emergency procedures, and safety requirements before any work begins."
  },
  {
    id: 2,
    question: "What does a red prohibition notice on site equipment mean?",
    options: [
      "Equipment needs maintenance",
      "Equipment is dangerous and must not be used",
      "Equipment is for supervisors only",
      "Equipment is new"
    ],
    correctIndex: 1,
    explanation: "Red prohibition notices indicate dangerous equipment that must not be used until the hazard is resolved and the notice is removed by a competent person."
  },
  {
    id: 3,
    question: "When should you report a near miss incident?",
    options: [
      "Only if someone was injured",
      "Only if equipment was damaged",
      "Immediately, even if no harm occurred",
      "At the end of the week"
    ],
    correctIndex: 2,
    explanation: "Near misses should be reported immediately as they help prevent future accidents and identify hazards before someone gets hurt."
  }
];

const Module1Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What should be your first action when arriving on a new construction site?",
      options: [
        "Start work immediately",
        "Attend site induction and safety briefing",
        "Find the nearest toilet",
        "Look for the site manager"
      ],
      correctAnswer: 1,
      explanation: "Site induction is mandatory and covers site-specific hazards, emergency procedures, and safety requirements."
    },
    {
      id: 2,
      question: "What does a red prohibition notice on site equipment mean?",
      options: [
        "Equipment needs maintenance",
        "Equipment is dangerous and must not be used",
        "Equipment is for supervisors only",
        "Equipment is new"
      ],
      correctAnswer: 1,
      explanation: "Red prohibition notices indicate dangerous equipment that must not be used until resolved."
    },
    {
      id: 3,
      question: "When should you report a near miss incident?",
      options: [
        "Only if someone was injured",
        "Only if equipment was damaged",
        "Immediately, even if no harm occurred",
        "At the end of the week"
      ],
      correctAnswer: 2,
      explanation: "Near misses should be reported immediately to prevent future accidents."
    },
    {
      id: 4,
      question: "What information must be included in a site safety briefing?",
      options: [
        "Only emergency exits",
        "Site-specific hazards, emergency procedures, and PPE requirements",
        "Only the weather forecast",
        "Lunch arrangements"
      ],
      correctAnswer: 1,
      explanation: "Safety briefings must cover all site-specific hazards, emergency procedures, and required safety measures."
    },
    {
      id: 5,
      question: "Who can remove a prohibition notice from equipment?",
      options: [
        "Anyone who finds it",
        "The person who put it there",
        "Only a competent person after resolving the hazard",
        "The site cleaner"
      ],
      correctAnswer: 2,
      explanation: "Only a competent person can remove prohibition notices after properly resolving the safety hazard."
    },
    {
      id: 6,
      question: "What should you do if you discover unsafe working conditions?",
      options: [
        "Ignore it if it's not your responsibility",
        "Stop work, make safe, and report to supervisor immediately",
        "Continue working but more carefully",
        "Wait until break time to mention it"
      ],
      correctAnswer: 1,
      explanation: "Unsafe conditions require immediate action - stop work, make safe, and report to prevent accidents."
    },
    {
      id: 7,
      question: "How often should site safety procedures be reviewed?",
      options: [
        "Never - they're permanent",
        "Only when accidents happen",
        "Regularly and when conditions change",
        "Once per year only"
      ],
      correctAnswer: 2,
      explanation: "Safety procedures must be reviewed regularly and updated when site conditions or activities change."
    },
    {
      id: 8,
      question: "What is the purpose of a permit to work system?",
      options: [
        "To slow down work",
        "To control high-risk activities with formal procedures",
        "To create paperwork",
        "To identify workers"
      ],
      correctAnswer: 1,
      explanation: "Permit to work systems ensure high-risk activities are properly planned, controlled, and supervised."
    }
  ];

  const faqs = [
    {
      question: "What if I miss the site induction due to urgent work?",
      answer: "You cannot work on site without completing induction first. This is a legal requirement and essential for your safety. The work must wait until proper induction is completed."
    },
    {
      question: "Can I remove safety barriers if they're in my way?",
      answer: "No, safety barriers are there for protection. If they genuinely obstruct essential work, report to your supervisor who can assess and relocate them safely if appropriate."
    },
    {
      question: "What should I do if I disagree with a safety procedure?",
      answer: "Follow the procedure but raise your concerns with your supervisor. Safety procedures are based on risk assessment and legal requirements, but legitimate concerns should be discussed."
    },
    {
      question: "How do I know if I need a permit to work?",
      answer: "Your supervisor or the method statement will identify when permits are required. Generally needed for hot work, confined spaces, work at height, live electrical work, and excavations."
    },
    {
      question: "What happens if I don't follow safety procedures?",
      answer: "Consequences can include disciplinary action, removal from site, prosecution for serious breaches, and most importantly, risk of injury to yourself or others."
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
              <HardHat className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 1.5.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Site Safety Procedures and Protocols
          </h1>
          <p className="text-muted-foreground">
            Master essential site safety procedures, emergency protocols, and safety management systems for electrical work environments.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Site safety procedures are mandatory systems that protect all workers on construction sites.</li>
                <li>Include induction training, emergency protocols, and hazard management systems.</li>
                <li>Understanding and following procedures prevents accidents and ensures legal compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Safety notices, prohibition signs, emergency assembly points, first aid stations.</li>
                <li><strong>Use:</strong> Induction procedures, incident reporting systems, permit to work systems.</li>
                <li><strong>Check:</strong> PPE requirements, emergency contacts, site-specific hazards.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand the importance and legal requirements for site safety procedures.</li>
            <li>Identify key components of site induction and safety briefing systems.</li>
            <li>Recognise different types of safety notices and their meanings.</li>
            <li>Apply emergency procedures and incident reporting protocols correctly.</li>
            <li>Understand permit to work systems and when they are required.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Site Induction Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Site Induction and Safety Briefings</h3>
            <p className="text-base text-foreground mb-4">
              Site induction is a legal requirement that ensures all workers understand site-specific hazards and safety procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Mandatory Induction Requirements</p>
                    <p className="text-base text-foreground mb-2"><strong>Legal requirement:</strong> No one can work on site without proper induction.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Must be completed before any work activities begin</li>
                      <li>Covers site-specific hazards and control measures</li>
                      <li>Explains emergency procedures and assembly points</li>
                      <li>Details PPE requirements and welfare facilities</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Key induction topics:</strong> Essential information for safe working.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Site layout, access routes, and restricted areas</li>
                      <li>Emergency procedures, first aid, and fire safety</li>
                      <li>Permit to work systems and high-risk activities</li>
                      <li>Environmental hazards and protection measures</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Documentation and records:</strong> Proof of competence and compliance.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Induction certificates must be carried on site</li>
                      <li>Records kept of all personnel inducted</li>
                      <li>Refresher training required for extended absences</li>
                      <li>Site-specific competency cards may be issued</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Induction protects workers by ensuring everyone understands site-specific risks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="induction-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Safety Notices Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Safety Notices and Warning Systems</h3>
            <p className="text-base text-foreground mb-4">
              Construction sites use various notice and warning systems to communicate hazards and safety requirements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Types of Safety Notices and Their Meanings</p>
                    <p className="text-base text-foreground mb-2"><strong>Prohibition notices (Red):</strong> Activities that are forbidden.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Equipment that must not be used due to safety defects</li>
                      <li>Areas that are out of bounds or dangerous</li>
                      <li>Activities that are temporarily prohibited</li>
                      <li>Can only be removed by competent persons after hazard resolution</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Warning notices (Yellow/Orange):</strong> Alert to hazards present.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Indicate specific hazards like overhead lines, excavations</li>
                      <li>Warn of temporary dangers during work activities</li>
                      <li>Highlight areas requiring special precautions</li>
                      <li>Must be clearly visible and regularly maintained</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Mandatory notices (Blue):</strong> Required actions or equipment.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>PPE requirements for specific areas or activities</li>
                      <li>Mandatory safety procedures that must be followed</li>
                      <li>Required qualifications or competencies for work areas</li>
                      <li>Safety equipment that must be used</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Information notices (Green):</strong> Safety guidance and emergency information.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Emergency assembly points and evacuation routes</li>
                      <li>First aid stations and emergency contact numbers</li>
                      <li>Safety equipment locations and instructions</li>
                      <li>General safety reminders and best practices</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Safety notices provide critical information - always read and follow them
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="notices-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Emergency Procedures Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Emergency Procedures and Incident Management</h3>
            <p className="text-base text-foreground mb-4">
              Effective emergency procedures and incident management are essential for workplace safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Emergency Response and Incident Reporting</p>
                    <p className="text-base text-foreground mb-2"><strong>Emergency procedures:</strong> Clear actions for different emergency types.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Fire emergency - raise alarm, evacuate, assemble at designated point</li>
                      <li>Medical emergency - secure area, call first aider, contact emergency services</li>
                      <li>Electrical emergency - isolate supply if safe, evacuate danger area</li>
                      <li>Structural collapse - evacuate immediately, call emergency services</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Incident reporting:</strong> Legal requirement to report accidents and near misses.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>All accidents must be recorded in accident book immediately</li>
                      <li>Near misses help prevent future accidents and should be reported</li>
                      <li>Serious incidents must be reported to HSE within specified timeframes</li>
                      <li>Investigation required to identify causes and prevent recurrence</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>First aid arrangements:</strong> Ensuring adequate emergency care.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Qualified first aiders must be available during all working hours</li>
                      <li>First aid equipment maintained and easily accessible</li>
                      <li>Emergency contact numbers clearly displayed</li>
                      <li>Arrangements for remote or high-risk locations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Quick, appropriate emergency response can save lives and prevent serious injuries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="emergency-check"
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
              Real-World Example: Hospital Extension Project Safety Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="font-medium">Situation: Electrical installation in a new hospital wing adjacent to operating areas.</p>
              <p>
                This project required extensive safety procedures due to the sensitive healthcare environment and 
                potential impact on life-critical systems.
              </p>
              <p className="font-medium">Safety procedures implemented:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Enhanced induction:</strong> Additional training on healthcare facility hazards and infection control</li>
                <li><strong>Special permits:</strong> Hot work permits near oxygen supplies, confined space permits for service tunnels</li>
                <li><strong>Noise management:</strong> Time restrictions and sound barriers to protect patient areas</li>
                <li><strong>Emergency coordination:</strong> Direct links with hospital security and emergency response teams</li>
                <li><strong>Continuous monitoring:</strong> 24/7 safety officer presence during critical phases</li>
              </ul>
              <p className="font-medium text-green-600 dark:text-green-400">
                Result: Zero incidents affecting hospital operations, project completed safely without disrupting 
                patient care, demonstrating the effectiveness of comprehensive safety procedures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Permit to Work Systems */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Permit to Work Systems</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Understanding Permit to Work Systems</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base text-foreground mb-2"><strong>Purpose and scope:</strong> Formal control of high-risk activities.</p>
                      <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                        <li>Legal document authorising specific high-risk work</li>
                        <li>Ensures proper planning, risk assessment, and control measures</li>
                        <li>Defines responsibilities, competence requirements, and supervision</li>
                        <li>Provides clear start/stop authority for dangerous work</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-foreground mb-2"><strong>When permits are required:</strong> High-risk electrical activities.</p>
                      <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                        <li>Live working on electrical systems above certain voltages</li>
                        <li>Work in confined spaces with electrical hazards</li>
                        <li>Hot work (welding, cutting) near electrical equipment</li>
                        <li>Excavation work near underground electrical cables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-foreground mb-2"><strong>Permit process:</strong> Systematic approach to risk control.</p>
                      <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                        <li>Application by competent person details work scope and hazards</li>
                        <li>Assessment by authorised person confirms control measures</li>
                        <li>Issue of permit with specific conditions and time limits</li>
                        <li>Close-out process when work is completed safely</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                    <strong>Key principle:</strong> Permits ensure high-risk work is properly planned, controlled, and supervised
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-border/20 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <AlertTriangle className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
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
                <li>The importance and legal requirements for site safety procedures</li>
                <li>Site induction requirements and key safety briefing topics</li>
                <li>Different types of safety notices and their meanings</li>
                <li>Emergency procedures and incident reporting protocols</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card">
              <p className="font-medium text-foreground mb-2">Key takeaway:</p>
              <p className="text-base text-foreground">
                Site safety procedures are not just paperwork - they are essential systems that protect lives and 
                ensure legal compliance. Following procedures prevents accidents and creates a safer working 
                environment for everyone on site.
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

export default Module1Section5_4;