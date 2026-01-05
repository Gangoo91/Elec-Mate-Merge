import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maintaining Work Logs and Handover Sheets - Module 5.7.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the importance of work logs and handover sheets for safety, accountability, and efficient project management in electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of work logs?",
    options: ["To record tasks, progress, and responsibility", "To decorate the site office", "To reduce paperwork", "To replace verbal communication"],
    correctIndex: 0,
    explanation: "Work logs are essential for recording tasks, progress, and responsibility to ensure accountability and traceability."
  },
  {
    id: 2,
    question: "Which of the following should NOT be included in a work log?",
    options: ["Materials used", "Completed tasks", "Lunch break details", "Safety observations"],
    correctIndex: 2,
    explanation: "Work logs should focus on work-related activities, safety observations, and project progress, not personal break details."
  },
  {
    id: 3,
    question: "What key information must a handover sheet contain?",
    options: ["Outstanding tasks and safety notes", "Weather conditions", "Delivery schedules only", "Personal contact numbers"],
    correctIndex: 0,
    explanation: "Handover sheets must contain outstanding tasks and safety notes to ensure continuity and safety for the next team."
  }
];

export default function Module5Section7_3() {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of work logs?",
      options: [
        "To record tasks, progress, and responsibility",
        "To decorate the site office",
        "To reduce paperwork",
        "To replace verbal communication"
      ],
      correctAnswer: 0,
      explanation: "Work logs are essential for recording tasks, progress, and responsibility to ensure accountability and traceability."
    },
    {
      id: 2,
      question: "Which of the following should NOT be included in a work log?",
      options: [
        "Materials used",
        "Completed tasks",
        "Lunch break details",
        "Safety observations"
      ],
      correctAnswer: 2,
      explanation: "Work logs should focus on work-related activities, safety observations, and project progress, not personal break details."
    },
    {
      id: 3,
      question: "What key information must a handover sheet contain?",
      options: [
        "Outstanding tasks and safety notes",
        "Weather conditions",
        "Delivery schedules only",
        "Personal contact numbers"
      ],
      correctAnswer: 0,
      explanation: "Handover sheets must contain outstanding tasks and safety notes to ensure continuity and safety for the next team."
    },
    {
      id: 4,
      question: "Why are handover sheets important for safety?",
      options: [
        "They identify isolations and hazards for the next team",
        "They reduce the amount of writing needed",
        "They are optional under regulations",
        "They improve team morale"
      ],
      correctAnswer: 0,
      explanation: "Handover sheets are crucial for safety as they identify isolations and hazards for the incoming team to prevent accidents."
    },
    {
      id: 5,
      question: "In the real-world scenario, what caused the electrical fault?",
      options: [
        "Poor installation materials",
        "No handover notes left for the night shift",
        "Incorrect testing procedure",
        "Equipment failure"
      ],
      correctAnswer: 1,
      explanation: "The electrical fault was caused by lack of proper handover documentation between shifts."
    },
    {
      id: 6,
      question: "What risk can arise from poor record keeping?",
      options: [
        "Missed hazards and duplicated work",
        "Increased energy efficiency",
        "Fewer site inspections",
        "Better team coordination"
      ],
      correctAnswer: 0,
      explanation: "Poor record keeping can lead to missed hazards and duplicated work, causing safety risks and inefficiency."
    },
    {
      id: 7,
      question: "When should work logs and handovers be completed?",
      options: [
        "At the end of each week",
        "At the end of every shift",
        "Only at project completion",
        "When the supervisor asks"
      ],
      correctAnswer: 1,
      explanation: "Work logs and handovers should be completed at the end of every shift to maintain continuity."
    },
    {
      id: 8,
      question: "Why should standardised forms be used for logs and handovers?",
      options: [
        "To save money on printing",
        "To ensure consistency and clarity",
        "To reduce the number of supervisors needed",
        "To make filing easier"
      ],
      correctAnswer: 1,
      explanation: "Standardised forms ensure consistency and clarity across all documentation and team communications."
    },
    {
      id: 9,
      question: "Where should work logs and handover sheets be stored?",
      options: [
        "In a safe, accessible location (physical or digital)",
        "Thrown away after use",
        "Kept in personal tool bags",
        "Left on the work bench"
      ],
      correctAnswer: 0,
      explanation: "Work logs and handover sheets must be stored in safe, accessible locations for future reference and compliance."
    },
    {
      id: 10,
      question: "Who should be made aware of handover details?",
      options: [
        "The next team, via toolbox talks or briefings",
        "Only the site manager",
        "Nobody, as long as it's written down",
        "Just the apprentices"
      ],
      correctAnswer: 0,
      explanation: "Handover details should be communicated to the next team through toolbox talks or briefings to ensure awareness."
    }
  ];

  const faqs = [
    {
      question: "What information should be included in work logs?",
      answer: "Work logs should include date and time, worker names, tasks completed, materials used, problems encountered, and health and safety observations."
    },
    {
      question: "How often should handover sheets be completed?",
      answer: "Handover sheets should be completed at the end of every shift to ensure continuity and safety for the incoming team."
    },
    {
      question: "What are the consequences of poor record keeping?",
      answer: "Poor record keeping can lead to missed safety hazards, duplicated work, disputes over progress or responsibility, and failed audits or inspections."
    },
    {
      question: "Can digital systems be used for work logs and handovers?",
      answer: "Yes, digital systems can be used as long as they provide secure storage, easy access for authorised personnel, and maintain proper backup procedures."
    },
    {
      question: "What should I do if I find incomplete handover information?",
      answer: "Contact the previous shift or responsible person immediately to clarify any missing or unclear information before starting work."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <FileText className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.7.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Maintaining Work Logs and Handover Sheets
          </h1>
          <p className="text-muted-foreground">
            Understanding the importance of work logs and handover sheets for safety, accountability, and efficient project management.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Work logs and handover sheets track progress and ensure accountability.</li>
                <li>They provide critical safety information for incoming teams.</li>
                <li>Poor record keeping can lead to accidents and costly delays.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Work log books, handover sheets, shift briefings, safety notices.</li>
                <li><strong>Use:</strong> Complete logs daily, note safety concerns, list outstanding tasks.</li>
                <li><strong>Check:</strong> Information is clear, complete, and accessible to next shift.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the importance of work logs and handover sheets.</li>
            <li>Identify key information that must be included in logs.</li>
            <li>Understand how handover sheets improve safety and efficiency.</li>
            <li>Apply best practices for maintaining accurate records.</li>
            <li>Recognise how poor record keeping affects projects.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Why Work Logs and Handover Sheets Matter */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Why Work Logs and Handover Sheets Matter</h3>
            <p className="text-base text-foreground mb-4">
              Work logs and handover sheets are essential documents that ensure continuity, safety, and accountability on electrical projects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Safety and Communication</p>
                    <p className="text-base text-foreground mb-2"><strong>Safety:</strong> Ensures critical safety information is passed between teams.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identifies circuits that are isolated or energised</li>
                      <li>Records location of hazards or incomplete work</li>
                      <li>Documents safety concerns for incoming teams</li>
                      <li>Prevents accidents from miscommunication</li>
                      <li>Supports emergency response procedures</li>
                      <li>Maintains continuity during shift changes</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Accountability:</strong> Records who did what work and when.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Tracks individual and team responsibilities</li>
                      <li>Provides evidence of work completion</li>
                      <li>Supports quality control processes</li>
                      <li>Assists with progress monitoring</li>
                      <li>Helps resolve disputes or queries</li>
                      <li>Supports performance reviews and training needs</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Efficiency:</strong> Prevents duplication and ensures smooth project flow.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Avoids repeating completed tasks</li>
                      <li>Identifies materials already used or needed</li>
                      <li>Highlights problems requiring attention</li>
                      <li>Facilitates better planning and scheduling</li>
                      <li>Reduces time spent on status updates</li>
                      <li>Improves coordination between trades</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Proper documentation supports health and safety compliance and contractual obligations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="work-logs-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* What to Include */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">What to Include in Work Logs and Handover Sheets</h3>
            <p className="text-base text-foreground mb-4">
              Comprehensive documentation requires specific information to be effective and useful:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Work Log Content</p>
                    <p className="text-base text-foreground mb-2"><strong>Basic Information:</strong> Date, time, and personnel details.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Date and time of work performed</li>
                      <li>Names of all operatives involved</li>
                      <li>Supervisor or responsible person</li>
                      <li>Work location or area reference</li>
                      <li>Weather conditions if relevant (outdoor work)</li>
                      <li>Shift information (day, night, weekend)</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Work Details:</strong> Tasks completed and materials used.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Detailed description of tasks completed</li>
                      <li>Materials and equipment used</li>
                      <li>Progress percentage or milestones achieved</li>
                      <li>Testing or inspection results</li>
                      <li>Problems encountered and solutions applied</li>
                      <li>Quality checks performed</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety Observations:</strong> Hazards and safety measures.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Safety concerns identified</li>
                      <li>Near misses or incidents</li>
                      <li>PPE used and condition</li>
                      <li>Environmental hazards noted</li>
                      <li>Safety briefings conducted</li>
                      <li>First aid incidents or requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="work-log-content-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Handover Sheet Information */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Handover Sheet Information</h3>
            <p className="text-base text-foreground mb-4">
              Handover sheets bridge the gap between shifts and teams, ensuring critical information is not lost:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Critical Handover Content</p>
                    <p className="text-base text-foreground mb-2"><strong>Outstanding Tasks:</strong> Work that needs completion.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Tasks started but not completed</li>
                      <li>Priority order for outstanding work</li>
                      <li>Estimated time to complete tasks</li>
                      <li>Required materials or tools</li>
                      <li>Dependencies on other trades or activities</li>
                      <li>Quality checks needed</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety Information:</strong> Isolations and hazards.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Circuits isolated and locked off</li>
                      <li>Location of isolation points and keys</li>
                      <li>Live circuits or equipment in area</li>
                      <li>Temporary safety measures in place</li>
                      <li>Access restrictions or permits required</li>
                      <li>Environmental hazards (confined spaces, heights)</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Communication:</strong> Contact details and updates.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Responsible person contact details</li>
                      <li>Client or site manager updates needed</li>
                      <li>Coordination with other trades</li>
                      <li>Delivery schedules or material requirements</li>
                      <li>Inspection or testing appointments</li>
                      <li>Any changes to original plans or specifications</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Remember:</strong> Handover information must be communicated verbally as well as in writing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="handover-content-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Risks of Poor Record Keeping */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Risks of Poor Record Keeping</h3>
            <p className="text-base text-foreground mb-4">
              Inadequate documentation can have serious consequences for safety, efficiency, and project success:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Consequences of Poor Documentation</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-3 list-disc space-y-1">
                          <li>Missed safety hazards leading to accidents</li>
                          <li>Unaware of circuit isolations</li>
                          <li>Working on live circuits unknowingly</li>
                          <li>Inadequate risk assessments</li>
                        </ul>
                        <p className="text-base text-foreground mb-2"><strong>Project Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>Work duplicated or left incomplete</li>
                          <li>Materials wasted or lost</li>
                          <li>Delays in project completion</li>
                          <li>Failed quality inspections</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Business Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-3 list-disc space-y-1">
                          <li>Disputes over progress or responsibility</li>
                          <li>Failed audits or inspections</li>
                          <li>Legal liability issues</li>
                          <li>Reputation damage</li>
                        </ul>
                        <p className="text-base text-foreground mb-2"><strong>Financial Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>Increased labour costs</li>
                          <li>Equipment damage</li>
                          <li>Insurance claims</li>
                          <li>Penalty clauses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Scenario</h2>
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">
              Case Study: The Missing Handover
            </h3>
            <p className="text-foreground mb-4">
              On a commercial installation, the day shift completed containment and partially wired lighting circuits but failed to record which circuits were live and which were still isolated. The night shift, unaware of this, attempted to energise a circuit that was incomplete, causing an electrical fault and damaging equipment.
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Consequences:</p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 list-disc pl-5 space-y-1">
                <li>£15,000 equipment damage</li>
                <li>12-hour project delay</li>
                <li>Safety investigation required</li>
                <li>Client relationship damage</li>
              </ul>
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="font-medium text-green-800 dark:text-green-200 mb-2">Lesson Learned:</p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Proper handover notes identifying circuit status would have prevented the fault and ensured a safe, smooth transition between shifts.
              </p>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-3">Best Practices</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Always complete logs and handovers at the end of a shift
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Be specific – vague notes create confusion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Use standard forms where possible for consistency
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Include sketches or photos when helpful
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Communication Tips</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Share handover sheets during toolbox talks or briefings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Store documents securely, either in physical folders or digital systems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Ensure incoming team understands all handover points
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Follow up on critical safety information
                </li>
              </ul>
            </div>
          </div>
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

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm">Work Log Essentials</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Date, time, personnel</li>
                <li>• Tasks completed</li>
                <li>• Materials used</li>
                <li>• Problems encountered</li>
                <li>• Safety observations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm">Handover Must-Haves</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Outstanding tasks</li>
                <li>• Safety concerns</li>
                <li>• Isolations in place</li>
                <li>• Contact details</li>
                <li>• Access issues</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm">Key Reminders</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Complete at shift end</li>
                <li>• Be specific and clear</li>
                <li>• Communicate verbally too</li>
                <li>• Store securely</li>
                <li>• Follow up on critical items</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned why maintaining work logs and handover sheets is critical for safety, accountability, and efficiency. You also saw how poor documentation can cause accidents, delays, and disputes. Remember: good documentation protects everyone and keeps projects running smoothly.
          </p>
        </Card>

        <Separator className="my-8" />

        {/* Quiz */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Knowledge Check</h2>
          <Quiz 
            questions={quizQuestions}
            title="Work Logs and Handover Sheets"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../7-2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Cable and Circuit Labelling
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Back to Section 7
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
