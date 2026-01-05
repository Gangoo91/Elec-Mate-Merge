import { ArrowLeft, ArrowRight, AlertTriangle, Target, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "Why is it important to report faults immediately?",
    options: [
      "To prevent unsafe conditions and ensure they are addressed before work continues",
      "To impress supervisors",
      "To avoid paperwork later",
      "It's not always necessary"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Name two common electrical faults that must be reported.",
    options: [
      "Dirty tools and missing lunch",
      "Damaged cables and reversed polarity",
      "Late delivery and bad weather",
      "Expensive materials and tight deadlines"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What three key details should always be included when reporting?",
    options: [
      "Time, date, weather",
      "Who found it, what the fault/risk is, and where it is located",
      "Cost, duration, materials",
      "Client, contractor, supplier"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Give two examples of communication methods for reporting risks.",
    options: [
      "Email and social media",
      "Verbal reports and written reports",
      "Texting and phone calls",
      "Drawing and sketching"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Why is tagging equipment with 'Do Not Use' important?",
    options: [
      "It looks professional",
      "It prevents unsafe equipment from being accidentally used",
      "It's required by law",
      "It saves time"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the risk of not updating progress reports?",
    options: [
      "Nothing serious happens",
      "Leads to confusion, duplication of work, or project delays",
      "Only affects paperwork",
      "Saves time overall"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What type of report is best for urgent hazards?",
    options: [
      "Written report filed later",
      "Verbal report to the supervisor/foreman",
      "Email to head office",
      "Wait until the end of shift"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Why should vague phrases like 'nearly done' be avoided in progress updates?",
    options: [
      "They sound unprofessional",
      "They don't give clear, measurable information about what has been completed",
      "They take too long to say",
      "They're not allowed on site"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What can poor communication lead to between team members?",
    options: [
      "Better relationships",
      "Reduced trust, confusion, and mistakes",
      "Faster work completion",
      "Lower costs"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is better: over-reporting or under-reporting issues?",
    options: [
      "Under-reporting saves time",
      "Over-reporting — it's safer to raise issues than ignore them",
      "Both are equally good",
      "Neither is necessary"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "faults1",
    question: "What should you do if you discover a damaged cable on site?",
    options: [
      "Continue working around it",
      "Report it immediately to your supervisor",
      "Fix it yourself if possible",
      "Wait until the end of the shift to mention it"
    ],
    correctIndex: 1,
    explanation: "Damaged cables present immediate safety risks and must be reported immediately to prevent accidents and ensure they are addressed before work continues."
  },
  {
    id: "faults2", 
    question: "Which method is best for reporting urgent safety hazards?",
    options: [
      "Send an email at the end of the day",
      "Verbal report immediately to supervisor/foreman",
      "Write a note and leave it on the desk",
      "Wait for the weekly safety meeting"
    ],
    correctIndex: 1,
    explanation: "Urgent safety hazards require immediate verbal reporting to the supervisor or foreman so they can take immediate action to prevent accidents."
  },
  {
    id: "faults3",
    question: "What key information should be included when reporting a fault?",
    options: [
      "Just the location",
      "Who found it, what the fault/risk is, and where it is located",
      "Only what the problem is",
      "Just your name and the time"
    ],
    correctIndex: 1,
    explanation: "The 'who, what, where' method ensures complete information: who discovered it, what the specific fault or risk is, and exactly where it's located."
  },
  {
    id: "faults4",
    question: "Why should progress updates be specific rather than vague?",
    options: [
      "To use more words",
      "To provide clear, measurable information about completion status",
      "To impress supervisors",
      "To fill out reports properly"
    ],
    correctIndex: 1,
    explanation: "Specific progress updates like '2 out of 3 lighting circuits tested' give clear, measurable information that helps with planning and prevents misunderstandings."
  }
];

const Module5Section6_3 = () => {
  useSEO(
    "Communicating Faults, Risks, and Task Progress | Electrical Training",
    "Learn how to effectively communicate faults, risks, and task progress in electrical work to prevent accidents and ensure project success."
  );

  const faqs = [
    {
      question: "What if I'm not sure whether something is a fault or just wear and tear?",
      answer: "Always report it. Supervisors will decide whether action is required. It's better to be cautious when it comes to safety."
    },
    {
      question: "Who do I report faults to?",
      answer: "Typically your supervisor, foreman, or the responsible site manager. Follow your site's specific reporting chain."
    },
    {
      question: "Do I need to give progress updates even if there are no problems?",
      answer: "Yes — regular updates keep the project on track and avoid confusion. Good communication prevents problems before they occur."
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
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded bg-card">
              <AlertTriangle className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-2">
                Section 5.6.3
              </Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Communicating Faults, Risks, and Task Progress
              </h1>
              <p className="text-muted-foreground mt-2">
                Essential reporting skills for electrical work safety and efficiency
              </p>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Report hazards and faults immediately to prevent accidents</li>
                <li>Use clear details: Who, What, Where when reporting</li>
                <li>Give specific progress updates, not vague comments</li>
                <li>Tag unsafe equipment with "Do Not Use" labels</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Damaged equipment or unsafe conditions</li>
                <li><strong>Use:</strong> Immediate verbal reports for urgent issues</li>
                <li><strong>Check:</strong> All reports include who, what, where details</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Learning Outcomes</h2>
          <p className="text-base text-muted-foreground mb-4">
            By the end of this subsection, you will be able to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify when and how to report faults and risks</li>
            <li>Use clear, professional methods to communicate task progress</li>
            <li>Recognise the consequences of poor reporting</li>
            <li>Apply effective systems of communication in real site conditions</li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Content / Learning</h2>
          
          {/* Section 1 - Blue */}
          <div className="border-l-4 border-l-emerald-500 bg-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                  Importance of Fault and Risk Communication
                </h3>
                <p className="text-base text-foreground mb-3">
                  On-site electrical work often involves identifying faults, highlighting risks, and reporting progress. Clear communication in these areas is critical for safety and project success:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Safety implications:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Prevents unsafe conditions from escalating into serious accidents</li>
                      <li>Ensures hazards are addressed before work continues</li>
                      <li>Protects all team members from potential dangers</li>
                      <li>Maintains a safe working environment for everyone</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Project management benefits:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Allows supervisors to make informed decisions about work priorities</li>
                      <li>Prevents delays caused by unreported issues</li>
                      <li>Ensures resources are allocated effectively</li>
                      <li>Maintains project timeline and quality standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Green */}
          <div className="border-l-4 border-l-green-500 bg-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">
                  Typical Faults and Risks to Communicate
                </h3>
                <p className="text-base text-foreground mb-3">
                  Recognising what needs to be reported is the first step in effective communication:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Equipment and Installation Faults:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Damaged cables, connectors, or electrical accessories</li>
                      <li>Faulty tools or testing equipment</li>
                      <li>Incorrect installations (e.g., reversed polarity, wrong ratings)</li>
                      <li>Missing or inadequate earthing connections</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Safety Hazards:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Exposed live conductors or damaged insulation</li>
                      <li>Water ingress or moisture in electrical equipment</li>
                      <li>Inadequate isolation or lockout procedures</li>
                      <li>Missing or insufficient PPE for the task</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Environmental and Access Issues:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Unsafe working platforms or access routes</li>
                      <li>Inadequate lighting in work areas</li>
                      <li>Presence of other hazards (asbestos, chemical spillages)</li>
                      <li>Changes in site conditions affecting safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Section 3 - Purple */}
          <div className="border-l-4 border-l-purple-500 bg-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3">
                  Methods of Communicating Faults and Risks
                </h3>
                <p className="text-base text-foreground mb-3">
                  Different situations require different communication methods. Choose the most appropriate for the urgency and nature of the issue:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Verbal Reports</strong> – For immediate issues requiring urgent attention</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Direct face-to-face communication with supervisor or foreman</li>
                      <li>Use for safety hazards that need immediate action</li>
                      <li>Follow up with written confirmation if required</li>
                      <li>Ensure the message is received and understood</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Written Reports</strong> – For logging hazards or long-term issues</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Use site logbooks, incident report forms, or digital systems</li>
                      <li>Include date, time, location, and detailed description</li>
                      <li>Provide permanent record for future reference</li>
                      <li>Attach photographs if available and appropriate</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Tagging Equipment/Areas</strong> – Visual warnings for immediate identification</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>"Do Not Use" tags on faulty tools or unsafe circuits</li>
                      <li>Barrier tape for hazardous areas</li>
                      <li>Clear, durable labels that won't be easily removed</li>
                      <li>Follow site-specific tagging procedures</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Digital Platforms</strong> – Modern reporting systems</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Site apps or digital reporting systems where available</li>
                      <li>QR code-based incident reporting</li>
                      <li>Photo and GPS location capture capabilities</li>
                      <li>Real-time notifications to relevant personnel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Section 4 - Orange */}
          <div className="border-l-4 border-l-orange-500 bg-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-3">
                  Communicating Task Progress
                </h3>
                <p className="text-base text-foreground mb-3">
                  Clear progress communication keeps projects on track and prevents misunderstandings:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Break work into clear stages:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Started, in progress, completed, awaiting test</li>
                      <li>Use specific milestones rather than vague descriptions</li>
                      <li>Include percentage completion where appropriate</li>
                      <li>Identify any dependencies or waiting periods</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Record details accurately:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Use handover sheets, site logs, or progress boards</li>
                      <li>Include specific quantities and measurements</li>
                      <li>Note any deviations from original plans</li>
                      <li>Record material usage and waste</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Provide regular updates to supervisors:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Schedule regular check-ins rather than waiting to be asked</li>
                      <li>Report delays as soon as they become apparent</li>
                      <li>Explain reasons for any changes to schedule</li>
                      <li>Suggest solutions where possible</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Use specific rather than vague language:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Say "2 out of 3 lighting circuits tested and signed off" instead of "nearly done"</li>
                      <li>Use "will be complete by 3 PM" instead of "soon"</li>
                      <li>State "requires 2 more hours" instead of "almost finished"</li>
                      <li>Be precise about quantities, times, and completion status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Section 5 - Red */}
          <div className="border-l-4 border-l-red-500 bg-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-3">
                  Consequences of Poor Communication
                </h3>
                <p className="text-base text-foreground mb-3">
                  Understanding the potential consequences emphasises why effective communication is essential:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Safety consequences:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Unreported faults leading to accidents and injuries</li>
                      <li>Escalation of minor issues into major hazards</li>
                      <li>Use of unsafe equipment or working practices</li>
                      <li>Inadequate isolation leading to electrical incidents</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Project impact:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Repeated work due to misunderstood progress</li>
                      <li>Project delays and cost overruns</li>
                      <li>Inefficient resource allocation</li>
                      <li>Quality issues from incomplete information</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-foreground mb-2"><strong>Professional relationships:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                      <li>Reduced trust between team members</li>
                      <li>Breakdown in working relationships</li>
                      <li>Loss of confidence from supervisors and clients</li>
                      <li>Damage to professional reputation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600 mb-3">Immediate Hazard Reporting</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Always report hazards immediately to the correct person (supervisor, foreman, site manager)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Use the "who, what, where" method: Who found it, What is the fault/risk, Where is it located</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Make the area safe immediately if possible (isolate, tag, barrier off)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Follow up verbal reports with written documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">Effective Progress Updates</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Avoid vague phrases like "nearly done" — use specific details: "2 out of 3 lighting circuits tested and signed off"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Include actual vs planned progress: "Running 30 minutes behind due to cable routing issues"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Report problems early rather than hoping to catch up</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Always suggest solutions when reporting problems</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-green-400/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-3">When in Doubt</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>If unsure whether to report something, err on the side of caution — it's better to over-report than under-report</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ask supervisors for guidance on reporting procedures if unclear</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Document everything: photos, measurements, observations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep written and verbal records consistent</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Real World Example</h2>
          
          <div className="bg-card border border-border/30 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">The Hidden Fault</h3>
                <p className="text-base text-foreground mb-4">
                  On a commercial project, an apprentice notices a cracked socket faceplate but assumes it will be replaced later. 
                  No report is made, and another worker installs it thinking it's acceptable. Weeks later, the socket sparks during use, 
                  damaging equipment and causing a safety incident.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-600/10 border border-border/30 rounded-lg p-4">
                <h4 className="text-base font-semibold text-red-600 mb-2">Consequences:</h4>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• £5,000 worth of computer equipment damaged by electrical surge</li>
                  <li>• Client's business operations disrupted for half a day</li>
                  <li>• HSE investigation due to electrical incident</li>
                  <li>• Company reputation damaged with the client</li>
                  <li>• Insurance claim affecting future premiums</li>
                  <li>• Mandatory additional safety training for all site personnel</li>
                </ul>
              </div>
              
              <div className="bg-card border border-green-400/30 rounded-lg p-4">
                <h4 className="text-base font-semibold text-green-600 mb-2">Prevention:</h4>
                <p className="text-xs sm:text-sm text-foreground">
                  A simple fault report stating <em>"Cracked socket faceplate found in Room 203 - potential safety hazard - requires replacement before installation"</em> 
                  would have prevented this expensive and dangerous incident. The cost of a replacement faceplate (£5) versus the total cost of the incident (£5,000+) demonstrates the value of proper reporting.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-muted-foreground/20 pl-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-base text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-foreground">Pocket Guide</h2>
          </div>
          <p className="text-muted-foreground mb-4">Quick reference for fault and progress reporting</p>
          <div className="bg-background/50 rounded-lg p-4">
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Report hazards and faults immediately to prevent escalation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Use clear details: Who found it, What the fault is, Where it's located</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Mark unsafe equipment with "Do Not Use" tags immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Give specific progress updates, not vague comments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Always keep written and verbal records consistent</span>
              </li>
            </ul>
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Recap</h2>
          <p className="text-base text-muted-foreground mb-4">In this subsection, you've learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Why fault, risk, and progress communication is essential for safety and efficiency</li>
            <li>Common electrical issues that must be reported immediately</li>
            <li>Different methods of communication: verbal, written, tagging, and digital systems</li>
            <li>How clear, specific updates keep projects on time and prevent confusion</li>
          </ul>
        </Card>

        <Separator className="my-8" />

        {/* Quiz */}
        <Quiz 
          title="Faults, Risks, and Progress Communication Knowledge Check"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button variant="outline" asChild>
            <Link to="../6-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Written Instructions
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-4">
              Next: Digital Communication
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section6_3;