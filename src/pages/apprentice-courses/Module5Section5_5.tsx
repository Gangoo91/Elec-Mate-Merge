import { ArrowLeft, ArrowRight, Users, Target, CheckCircle, Shield, MessageSquare, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Attending Briefings, Toolbox Talks, and Site Meetings - Module 5.5.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the importance of attending briefings, toolbox talks, and site meetings. Essential communication skills and responsibilities for electrical professionals.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a toolbox talk?",
    options: ["To discuss project delays", "To provide short, focused safety updates", "To plan lunch breaks", "To check attendance"],
    correctIndex: 1,
    explanation: "Toolbox talks are short sessions focused on safety topics to ensure everyone is aware of current hazards and safety procedures."
  },
  {
    id: 2,
    question: "True or False: Attendance at toolbox talks is optional.",
    options: ["True - they are just suggestions", "False", "True - only for supervisors", "True - if you've heard it before"],
    correctIndex: 1,
    explanation: "False - toolbox talks are mandatory safety briefings that all workers must attend."
  },
  {
    id: 3,
    question: "What should you do if instructions given in a meeting are unclear?",
    options: ["Guess what they mean", "Ask questions or confirm with your supervisor", "Ignore them and continue", "Wait until the next meeting"],
    correctIndex: 1,
    explanation: "You should always ask questions or confirm with your supervisor if instructions are unclear - never guess or assume."
  }
];

const Module5Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a toolbox talk?",
      options: [
        "To discuss project timelines",
        "To provide short, focused safety updates",
        "To plan work schedules",
        "To check material deliveries"
      ],
      correctAnswer: 1,
      explanation: "Toolbox talks are short sessions focused on safety topics to ensure all workers are aware of current hazards and safety procedures."
    },
    {
      id: 2,
      question: "True or False: Attendance at toolbox talks is optional.",
      options: [
        "True - they are voluntary",
        "False",
        "True - only for new workers",
        "True - if you're experienced"
      ],
      correctAnswer: 1,
      explanation: "False - toolbox talks are mandatory safety briefings that all workers must attend as they are legal requirements for site safety."
    },
    {
      id: 3,
      question: "What should you do if instructions given in a meeting are unclear?",
      options: [
        "Guess what they mean and continue",
        "Ask questions or confirm with your supervisor",
        "Ignore unclear instructions",
        "Wait until someone else asks"
      ],
      correctAnswer: 1,
      explanation: "You should always ask questions or confirm with your supervisor if instructions are unclear - never guess or assume what is meant."
    },
    {
      id: 4,
      question: "Name one responsibility when attending a site meeting.",
      options: [
        "Bring your own refreshments",
        "Arrive on time and be prepared",
        "Take photos of the presentation",
        "Sit at the back"
      ],
      correctAnswer: 1,
      explanation: "Key responsibilities include arriving on time, being prepared, listening carefully, taking notes, and following up on actions."
    },
    {
      id: 5,
      question: "What is a common mistake to avoid in meetings?",
      options: [
        "Taking notes",
        "Not paying attention or ignoring instructions",
        "Asking questions",
        "Sitting near the front"
      ],
      correctAnswer: 1,
      explanation: "Not paying attention and missing key safety points or instructions is a serious mistake that can lead to accidents and delays."
    },
    {
      id: 6,
      question: "Who is responsible for acting on instructions from a briefing?",
      options: [
        "Only the supervisor",
        "Each individual worker",
        "Only senior tradespeople",
        "The safety officer"
      ],
      correctAnswer: 1,
      explanation: "Each individual worker is responsible for understanding and acting on instructions given in briefings and meetings."
    },
    {
      id: 7,
      question: "What might happen if you miss a toolbox talk?",
      options: [
        "Nothing - they're not important",
        "You could miss critical safety information and risk accidents",
        "You'll get a longer lunch break",
        "Someone will tell you later"
      ],
      correctAnswer: 1,
      explanation: "Missing toolbox talks means you could miss critical safety information about new hazards, procedures, or exclusion zones."
    },
    {
      id: 8,
      question: "Why are safety topics often repeated in meetings?",
      options: [
        "Supervisors forget what they've said",
        "To reinforce safe habits and update new workers",
        "To fill time in meetings",
        "Because workers don't listen"
      ],
      correctAnswer: 1,
      explanation: "Repetition reinforces safe habits and ensures new workers are updated on all safety procedures and requirements."
    },
    {
      id: 9,
      question: "What should you bring to a meeting to record details?",
      options: [
        "Your phone camera only",
        "Notebook or phone (if permitted)",
        "Voice recorder",
        "Nothing - just remember"
      ],
      correctAnswer: 1,
      explanation: "You should bring a notebook or use your phone (if permitted) to record key points and action items from meetings."
    },
    {
      id: 10,
      question: "Which type of meeting covers wider project progress and coordination?",
      options: [
        "Daily briefings",
        "Formal site meetings",
        "Toolbox talks",
        "Safety briefings"
      ],
      correctAnswer: 1,
      explanation: "Formal site meetings cover wider project progress, coordination between trades, and future planning beyond daily activities."
    }
  ];

  const faqs = [
    {
      question: "Are toolbox talks optional?",
      answer: "No — toolbox talks are mandatory safety briefings that all workers must attend. They are legal requirements for site safety and ensure everyone is informed about current hazards and procedures."
    },
    {
      question: "What if I don't understand something in the meeting?",
      answer: "Ask your supervisor or raise it during the session. Never guess or assume what instructions mean - always seek clarification to ensure you understand your responsibilities completely."
    },
    {
      question: "Why do meetings often repeat the same safety topics?",
      answer: "Repetition reinforces safe habits and ensures new workers are updated. Safety messages need constant reinforcement to maintain awareness and prevent complacency."
    },
    {
      question: "What should I do if I arrive late to a briefing?",
      answer: "Speak to your supervisor immediately after the meeting to get the key information you missed. Never assume you can catch up by asking colleagues - get official confirmation of what was discussed."
    },
    {
      question: "How should I follow up on actions given in meetings?",
      answer: "Note down your specific actions with deadlines, confirm understanding with your supervisor if needed, and complete tasks promptly. Report back when actions are completed or if you encounter problems."
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
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.5.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Attending Briefings, Toolbox Talks, and Site Meetings
          </h1>
          <p className="text-muted-foreground">
            Essential communication and safety practices for professional electrical work on construction sites.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Briefings keep everyone informed about site rules and safety.</li>
                <li>Toolbox talks are mandatory safety sessions focusing on current hazards.</li>
                <li>Active participation demonstrates professionalism and prevents accidents.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Meeting schedules, safety notices, briefing areas.</li>
                <li><strong>Use:</strong> Listen actively, take notes, ask questions, follow instructions.</li>
                <li><strong>Check:</strong> Attendance recorded, actions understood, deadlines noted.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the purpose of briefings, toolbox talks, and site meetings.</li>
            <li>Recognise the importance of active participation.</li>
            <li>Apply communication and listening skills during meetings.</li>
            <li>Identify your responsibilities when attending.</li>
            <li>Use information from meetings to plan and carry out tasks effectively.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Purpose of Site Meetings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Purpose of Site Meetings</h3>
            <p className="text-base text-foreground mb-4">
              Different types of meetings serve specific purposes in maintaining site coordination and safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Types of Site Communications</p>
                    <p className="text-base text-foreground mb-2"><strong>Briefings:</strong> Provide daily updates on site activities, progress, and immediate concerns.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Daily work priorities and task allocation</li>
                      <li>Site access changes and restrictions</li>
                      <li>Weather-related work adjustments</li>
                      <li>Material deliveries and equipment availability</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Toolbox Talks:</strong> Short sessions focused on safety topics (e.g., working at height, manual handling).</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Specific safety hazards and prevention measures</li>
                      <li>New safety procedures and equipment</li>
                      <li>Recent incidents and lessons learned</li>
                      <li>Personal protective equipment requirements</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Formal Site Meetings:</strong> Cover wider project progress, coordination between trades, and future planning.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Overall project timeline and milestones</li>
                      <li>Inter-trade coordination and sequencing</li>
                      <li>Quality standards and inspection schedules</li>
                      <li>Problem resolution and decision making</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Each meeting type serves a specific purpose - understanding this helps you prepare and participate effectively
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="meeting-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Why Attendance Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Why Attendance Matters</h3>
            <p className="text-base text-foreground mb-4">
              Regular attendance at briefings and meetings is crucial for safety, efficiency, and professionalism:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Critical Benefits of Attendance</p>
                    <p className="text-base text-foreground mb-2"><strong>Keeps you informed about site rules and hazards:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>New hazards and exclusion zones</li>
                      <li>Updated safety procedures and requirements</li>
                      <li>Site access changes and restrictions</li>
                      <li>Emergency procedures and assembly points</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Ensures you understand your tasks and responsibilities:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Daily work priorities and deadlines</li>
                      <li>Quality standards and specification requirements</li>
                      <li>Coordination with other trades</li>
                      <li>Resource allocation and material availability</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Promotes team awareness and coordination:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Understanding of overall project progress</li>
                      <li>Awareness of other trades' activities</li>
                      <li>Shared problem-solving and solutions</li>
                      <li>Collective responsibility for site safety</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Demonstrates professionalism and compliance:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Shows commitment to safety and quality</li>
                      <li>Meets legal and contractual obligations</li>
                      <li>Builds trust with supervisors and colleagues</li>
                      <li>Supports career development and reputation</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Remember:</strong> Missing meetings can lead to accidents, mistakes, and missed opportunities - attendance is not optional
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="attendance-importance-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Responsibilities When Attending */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Responsibilities When Attending</h3>
            <p className="text-base text-foreground mb-4">
              Active and professional participation requires understanding your responsibilities:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Professional Meeting Behaviour</p>
                    <p className="text-base text-foreground mb-2"><strong>Arrive on time and prepared:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Check meeting times and locations daily</li>
                      <li>Bring notebook and pen for taking notes</li>
                      <li>Review previous day's actions and progress</li>
                      <li>Have questions ready about unclear instructions</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Listen carefully and take notes if needed:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Focus on safety information and new hazards</li>
                      <li>Record specific tasks and deadlines</li>
                      <li>Note any changes to procedures or requirements</li>
                      <li>Write down contact details for coordination</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Ask questions if instructions are unclear:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Seek clarification immediately during the meeting</li>
                      <li>Don't assume or guess what instructions mean</li>
                      <li>Ask for specific examples if needed</li>
                      <li>Confirm understanding by repeating back key points</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Follow up on any actions you are given:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Understand deadlines and priorities</li>
                      <li>Report progress and any problems encountered</li>
                      <li>Coordinate with other trades as required</li>
                      <li>Confirm completion of tasks with supervisor</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Active participation shows respect for colleagues and commitment to project success
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="responsibilities-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Mistakes to Avoid */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Common Mistakes to Avoid</h3>
            <p className="text-base text-foreground mb-4">
              Understanding common pitfalls helps ensure professional behaviour and effective communication:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Behaviours That Undermine Safety and Professionalism</p>
                    <p className="text-base text-foreground mb-2"><strong>Not paying attention and missing key safety points:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Using phone or having side conversations</li>
                      <li>Arriving late and disrupting proceedings</li>
                      <li>Assuming you know what will be said</li>
                      <li>Failing to make eye contact with speaker</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Talking over others and causing distractions:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Interrupting speakers or other participants</li>
                      <li>Having loud side conversations</li>
                      <li>Making jokes during serious safety discussions</li>
                      <li>Creating noise with tools or equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Failing to act on what was agreed:</strong></p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Not following through on assigned tasks</li>
                      <li>Ignoring new safety procedures</li>
                      <li>Forgetting deadlines and commitments</li>
                      <li>Not communicating problems or delays</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Warning:</strong> These behaviours can lead to accidents, disciplinary action, and damage to professional reputation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          <div className="grid gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">📝 Meeting Preparation</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Keep a small notebook or use your phone (if permitted) to record key points</li>
                <li>Review previous meeting notes before attending</li>
                <li>Prepare any questions about ongoing work or safety concerns</li>
                <li>Know the meeting location and arrive 5 minutes early</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">🤝 Professional Conduct</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Show respect by being punctual and attentive</li>
                <li>Make eye contact with speakers and avoid distractions</li>
                <li>Ask questions respectfully if something is unclear</li>
                <li>Thank organisers and speakers for their time</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-purple-600 dark:text-emerald-400 mb-2">⚠️ Safety Priority</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Treat toolbox talks seriously — they are legal requirements for site safety</li>
                <li>Pay special attention to new hazards and exclusion zones</li>
                <li>Understand emergency procedures and assembly points</li>
                <li>Report any safety concerns immediately after meetings</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-orange-600 dark:text-emerald-400 mb-2">✅ Follow-Through</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Always act on instructions promptly to avoid delays</li>
                <li>Set reminders for deadlines and action items</li>
                <li>Coordinate with other trades as instructed</li>
                <li>Report completion of tasks to your supervisor</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Communication Skills Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Effective Communication During Meetings</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Active Listening Skills</p>
                  <p className="text-base text-foreground mb-2"><strong>Listen with intent:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Focus completely on the speaker without distractions</li>
                    <li>Avoid planning your response whilst others are talking</li>
                    <li>Watch for non-verbal cues and emphasis</li>
                    <li>Ask clarifying questions if you're unsure</li>
                  </ul>
                  <p className="text-base text-foreground mb-2"><strong>Note-taking strategies:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Record key action points with deadlines</li>
                    <li>Note safety alerts and new procedures</li>
                    <li>Write down contact information for follow-ups</li>
                    <li>Use abbreviations and symbols for speed</li>
                  </ul>
                  <p className="text-base text-foreground mb-2"><strong>Asking effective questions:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Be specific about what you need clarification on</li>
                    <li>Ask open-ended questions to gain understanding</li>
                    <li>Confirm your understanding by paraphrasing</li>
                    <li>Don't hesitate to ask - it shows engagement</li>
                  </ul>
                  <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                    <strong>Professional tip:</strong> Good communication skills in meetings demonstrate competence and build trust with supervisors and colleagues
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Legal and Compliance Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Legal Requirements and Compliance</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Health and Safety Legal Framework</p>
                  <p className="text-base text-foreground mb-2"><strong>Health and Safety at Work Act 1974:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Employers must provide information, instruction, training and supervision</li>
                    <li>Employees have a duty to take care of their own and others' safety</li>
                    <li>Toolbox talks fulfil the legal requirement for ongoing safety training</li>
                    <li>Non-attendance can be grounds for disciplinary action</li>
                  </ul>
                  <p className="text-base text-foreground mb-2"><strong>Construction (Design and Management) Regulations 2015:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Principal contractors must ensure worker competence and training</li>
                    <li>Workers must report unsafe conditions and practices</li>
                    <li>Induction and ongoing briefings are legal requirements</li>
                    <li>Failure to attend safety briefings can result in site exclusion</li>
                  </ul>
                  <p className="text-base text-foreground mb-2"><strong>Your legal obligations:</strong></p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                    <li>Attend all mandatory safety briefings and toolbox talks</li>
                    <li>Follow instructions given during briefings</li>
                    <li>Report concerns raised during meetings to supervisors</li>
                    <li>Maintain competence through ongoing training</li>
                  </ul>
                  <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                    <strong>Legal warning:</strong> Failure to attend mandatory safety briefings or follow instructions can result in prosecution under health and safety legislation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Meeting Scenarios Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Common Meeting Scenarios and Responses</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-indigo-500 bg-indigo-500/5">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Scenario-Based Learning</p>
                  
                  <div className="mb-4 p-3 bg-background/50 rounded border">
                    <p className="font-medium text-foreground mb-2">Scenario 1: Emergency Procedure Changes</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Situation:</strong> Fire assembly point has been moved due to site layout changes.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Your response:</strong></p>
                    <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                      <li>Note the new location and route clearly</li>
                      <li>Ask questions about evacuation procedures if unclear</li>
                      <li>Inform your immediate work team of the changes</li>
                      <li>Practice the new route during your next break</li>
                    </ul>
                  </div>

                  <div className="mb-4 p-3 bg-background/50 rounded border">
                    <p className="font-medium text-foreground mb-2">Scenario 2: New Hazard Identification</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Situation:</strong> Asbestos has been discovered in an area where you need to work.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Your response:</strong></p>
                    <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                      <li>Understand the exact location and boundaries of the hazard</li>
                      <li>Confirm what PPE or procedures are now required</li>
                      <li>Ask about alternative access routes or work methods</li>
                      <li>Never enter the area until given clear permission</li>
                    </ul>
                  </div>

                  <div className="mb-4 p-3 bg-background/50 rounded border">
                    <p className="font-medium text-foreground mb-2">Scenario 3: Work Sequence Changes</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Situation:</strong> Your electrical work must be delayed to allow plumbing installation.</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Your response:</strong></p>
                    <ul className="text-xs text-foreground ml-4 list-disc space-y-1">
                      <li>Confirm the new timeline and start date</li>
                      <li>Understand what alternative work you can do</li>
                      <li>Ask about material storage and site access</li>
                      <li>Coordinate with your supervisor on resource allocation</li>
                    </ul>
                  </div>

                  <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                    <strong>Key principle:</strong> Every meeting scenario requires active listening, clear understanding, and appropriate follow-up action
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-card border border-amber-400/30">
            <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-2">⚠️ Case Study: The Importance of Attending Briefings</h3>
            <p className="text-base text-foreground mb-3">
              <strong>Situation:</strong> At a refurbishment site, a toolbox talk highlighted a new exclusion zone due to overhead work. An electrician who missed the briefing entered the area and risked serious injury.
            </p>
            <p className="text-base text-foreground mb-3">
              <strong>Consequence:</strong> The near-miss required incident reporting, work stoppage for investigation, and additional safety training for all trades.
            </p>
            <p className="text-base text-foreground">
              <strong>Lesson:</strong> Attendance would have prevented the near-miss. This incident shows how missing briefings can lead to serious safety risks and project delays.
            </p>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-card border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Clipboard className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Pocket Guide</h2>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg p-4 bg-background/50 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">📋 Meeting Essentials</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li><strong>Always attend</strong> — safety and updates depend on it</li>
                <li><strong>Arrive on time</strong> and prepared with notebook</li>
                <li><strong>Listen carefully</strong> and take notes on key points</li>
                <li><strong>Ask questions</strong> if anything is unclear</li>
                <li><strong>Follow up</strong> on all agreed actions promptly</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-background/50 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">🎯 Professional Behaviour</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Respect others by avoiding distractions</li>
                <li>Participate actively and constructively</li>
                <li>Take toolbox talks seriously</li>
                <li>Demonstrate commitment to safety and quality</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-6 bg-card border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recap</h2>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg p-4 bg-background/50 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">📚 Key Learning Points</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Briefings, toolbox talks, and site meetings are vital for communication and safety</li>
                <li>Different meeting types serve specific purposes and all require attendance</li>
                <li>Active participation demonstrates professionalism and prevents accidents</li>
                <li>Your responsibilities include punctuality, attention, and follow-through</li>
                <li>Avoiding common mistakes protects safety and your professional reputation</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-background/50 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">💡 Professional Development</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc ml-6">
                <li>Attending and participating builds trust with supervisors</li>
                <li>Good communication skills enhance career prospects</li>
                <li>Understanding project coordination improves work quality</li>
                <li>Safety awareness protects you and your colleagues</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Bottom Navigation */}
        <div className="flex justify-start">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </main>

      {/* Structured data for FAQs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq, index) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </div>
  );
};

export default Module5Section5_5;