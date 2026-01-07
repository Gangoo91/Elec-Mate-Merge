import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Package, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Communicating with Site Supervisors and Foremen - Module 5.5.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn effective communication techniques with site supervisors and foremen. Essential skills for professional interaction and project success on construction sites.";

const quickCheckQuestions = [
  {
    id: "1",
    question: "Who is your first point of contact for instructions on site?",
    options: [
      "Site Manager",
      "Client",
      "Supervisor/Foreman",
      "Another tradesperson"
    ],
    correctIndex: 2,
    explanation: "Supervisors and foremen are your immediate point of contact for daily instructions, task allocation, and guidance on site."
  },
  {
    id: "2", 
    question: "What is the best way to avoid miscommunication with your supervisor?",
    options: [
      "Assume you understand",
      "Repeat back instructions to confirm",
      "Ask another tradesperson",
      "Guess the meaning"
    ],
    correctIndex: 1,
    explanation: "Repeating back instructions ensures both parties understand what is required and helps prevent costly mistakes."
  },
  {
    id: "3",
    question: "If another trade gives you conflicting instructions, what should you do?",
    options: [
      "Follow the most recent instruction",
      "Choose the easiest option",
      "Report it to your supervisor/foreman",
      "Argue with the other tradesperson"
    ],
    correctIndex: 2,
    explanation: "Conflicting instructions should always be resolved through your supervisor/foreman to maintain clear communication chains and prevent disputes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is your first point of contact for instructions on site?",
    options: [
      "Site Manager",
      "Client Representative", 
      "Supervisor/Foreman",
      "Another Apprentice"
    ],
    correctAnswer: 2,
    explanation: "Supervisors and foremen are your immediate point of contact for daily instructions, task allocation, and site guidance."
  },
  {
    id: 2,
    question: "What is the main role of a foreman on a construction site?",
    options: [
      "To manage project budgets",
      "To allocate tasks, oversee work quality, and enforce safety",
      "To handle client communications",
      "To order materials only"
    ],
    correctAnswer: 1,
    explanation: "Foremen are responsible for day-to-day operations including task allocation, quality control, and safety enforcement."
  },
  {
    id: 3,
    question: "True or False: It's acceptable to start a new task without clarifying unclear instructions.",
    options: [
      "True - it shows initiative",
      "False - always clarify first",
      "True - if the deadline is tight",
      "False - but only for complex tasks"
    ],
    correctAnswer: 1,
    explanation: "Never start work with unclear instructions. Always clarify to prevent mistakes, delays, and safety issues."
  },
  {
    id: 4,
    question: "What should you do if you don't understand an instruction?",
    options: [
      "Guess what was meant",
      "Ask a colleague instead",
      "Ask questions and repeat back to confirm",
      "Start work and adjust as needed"
    ],
    correctAnswer: 2,
    explanation: "Always ask questions and repeat back instructions to ensure clear understanding and prevent costly mistakes."
  },
  {
    id: 5,
    question: "Which of these is a good habit for apprentices?",
    options: [
      "Guessing instructions when unsure",
      "Recording key details and instructions", 
      "Arguing with other trades directly",
      "Ignoring toolbox talks"
    ],
    correctAnswer: 1,
    explanation: "Recording key details helps ensure instructions are followed correctly and provides reference for later questions."
  },
  {
    id: 6,
    question: "What is the purpose of toolbox talks?",
    options: [
      "To discuss project budgets",
      "To share safety information and site updates",
      "To plan weekend activities",
      "To order materials"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are brief meetings to share safety information, site updates, and important project communications."
  },
  {
    id: 7,
    question: "If another trade gives you conflicting instructions, what should you do?",
    options: [
      "Follow the most recent instruction",
      "Choose the easiest option",
      "Report it to your supervisor/foreman",
      "Ignore both instructions"
    ],
    correctAnswer: 2,
    explanation: "Conflicting instructions should be resolved through proper channels to maintain clear communication and prevent errors."
  },
  {
    id: 8,
    question: "True or False: Written records are not needed if you have verbal instructions.",
    options: [
      "True - verbal is sufficient",
      "False - written records provide important backup",
      "True - only for simple tasks",
      "False - but only for complex projects"
    ],
    correctAnswer: 1,
    explanation: "Written records provide backup, clarification, and legal protection. They complement verbal instructions."
  },
  {
    id: 9,
    question: "What is a simple technique to avoid miscommunication?",
    options: [
      "Speak louder",
      "Use technical jargon",
      "Repeat back instructions",
      "Assume understanding"
    ],
    correctAnswer: 2,
    explanation: "Repeating back instructions ensures both parties understand what is required and helps identify any misunderstandings immediately."
  },
  {
    id: 10,
    question: "Who enforces safety rules and gives guidance at task level?",
    options: [
      "Client Representative",
      "Supervisor/Foreman",
      "Other Apprentices",
      "Material Suppliers"
    ],
    correctAnswer: 1,
    explanation: "Supervisors and foremen are responsible for enforcing safety rules and providing task-level guidance to ensure safe working practices."
  }
];

const practicalGuidance = [
  "Always check with your supervisor before starting a new task",
  "If unsure about instructions, repeat them back for confirmation", 
  "Keep a small notebook or use your phone (if allowed) to record important details",
  "If there's a conflict with another trade, report it to the foreman instead of arguing directly"
];

const pocketGuide = [
  "Supervisor/Foreman = First point of contact",
  "Always confirm instructions back",
  "Record key details",
  "Report conflicts, don't argue", 
  "Escalate only when necessary"
];

const Module5Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Can I go directly to the site manager with a question?",
      answer: "Not usually — always go to your foreman/supervisor first, unless it's an emergency. This maintains proper communication chains and ensures your immediate supervisor is aware of issues."
    },
    {
      question: "What if my supervisor is unavailable?",
      answer: "Wait if possible, or pass the issue to another foreman from your team. Never guess or make assumptions about instructions — clarity is essential for safety and quality."
    },
    {
      question: "Should I challenge instructions if I think they're unsafe?",
      answer: "Yes — politely raise the concern with your supervisor. If the issue remains unresolved, escalate to the Health & Safety Officer. Safety concerns should never be ignored."
    },
    {
      question: "How should I handle conflicting instructions from different people?",
      answer: "Always report conflicting instructions to your supervisor/foreman rather than trying to resolve them yourself. They have the authority and information to make the correct decision."
    },
    {
      question: "Is it necessary to record verbal instructions?",
      answer: "Yes, particularly for complex or critical tasks. Written records provide backup, prevent misunderstandings, and offer legal protection if issues arise later."
    },
    {
      question: "What's the best way to ask for clarification without seeming incompetent?",
      answer: "Asking questions shows professionalism, not incompetence. Use phrases like 'Just to confirm...' or 'To ensure I understand correctly...' when seeking clarification."
    },
    {
      question: "How often should I update my supervisor on progress?",
      answer: "Follow their preferred schedule, but generally provide updates at key milestones, when problems arise, or at the end of significant work phases. Regular communication prevents surprises."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg ">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.5.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Communicating with Site Supervisors and Foremen
          </h1>
          <p className="text-white">
            Learn effective communication techniques with site supervisors and foremen for professional success on construction sites.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clear communication with supervisors prevents costly mistakes and delays.</li>
                <li>Always confirm instructions by repeating them back.</li>
                <li>Keep written records of important instructions and decisions.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Miscommunication leading to rework, delays, or safety issues.</li>
                <li><strong>Use:</strong> Confirmation techniques and proper reporting channels.</li>
                <li><strong>Check:</strong> Regular progress updates and clarification requests.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Clear and professional communication with site supervisors and foremen is essential for smooth project delivery and workplace safety. As an apprentice electrician, your supervisors and foremen are your direct link to project management, daily work allocation, and critical safety information. They coordinate between trades, manage timelines, and ensure work meets both BS 7671 standards and project specifications.
          </p>
          
          <p className="text-base text-white mb-4">
            Effective communication in the electrical trade involves more than just receiving instructions. It includes understanding technical drawings, confirming electrical specifications, reporting progress on installations, and ensuring compliance with safety procedures. Poor communication can result in incorrect installations, safety hazards, project delays, and costly rework that affects the entire construction programme.
          </p>
          
          <p className="text-base text-white mb-4">
            The construction industry operates under strict hierarchies and communication protocols designed to maintain safety, quality, and efficiency. Understanding your role within this structure and communicating effectively with supervisors ensures projects run smoothly and helps build your professional reputation within the industry.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Effective communication with supervisors reduces project delays by up to 40% and significantly improves safety outcomes through clearer understanding of instructions and procedures.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Projects with excellent supervisor-trades communication show 30% fewer rework incidents and improved team morale.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Professional Standard:</strong> Clear communication skills are essential for career progression and are valued highly by employers across the construction industry.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this subsection, you will be able to:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Communication Knowledge</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Understand the role of supervisors and foremen in communication
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Apply effective communication techniques
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Know when and how to report issues or progress
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Avoid misunderstandings and conflicts on site
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Professional Skills</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Recognise the importance of clear record-keeping and confirmation
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Use proper channels for reporting and escalation
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Build professional relationships with site supervisors
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Maintain clear and accurate work documentation
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Practical Application</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Navigate site communication structures effectively
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Handle conflicting instructions appropriately
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Maintain professional standards in all communications
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Problem Resolution</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Identify and resolve communication breakdowns
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Prevent disputes through clear confirmation processes
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Escalate issues appropriately when required
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs sm:text-sm text-white">
              <strong>Assessment Focus:</strong> This subsection emphasises practical communication skills that directly impact your effectiveness on site and your professional development within the electrical trade.
            </p>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Role of Supervisors and Foremen */}
          <section className="mb-6">
            <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-2 sm:gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3 text-base sm:text-lg">Role of Supervisors and Foremen</h3>
                  
                  <p className="text-sm sm:text-base text-white mb-4">
                    Supervisors and foremen are your key communication link on site. Understanding their role helps you communicate more effectively and get the support you need.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm sm:text-base text-white mb-2 font-semibold">Primary Functions:</p>
                      <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1 sm:space-y-2">
                        <li><strong>Communication Bridge</strong> – Act as the link between site management and tradespeople, ensuring information flows clearly in both directions.</li>
                        <li><strong>Task Management</strong> – Allocate tasks, check work quality, and ensure deadlines are met whilst coordinating between different trades.</li>
                        <li><strong>Safety Leadership</strong> – Provide safety guidance, enforce site rules, conduct toolbox talks, and ensure compliance with health and safety regulations.</li>
                        <li><strong>Quality Control</strong> – Monitor work standards, conduct inspections, and ensure all work meets specifications and regulations.</li>
                      </ul>
                    </div>

                    <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-2 sm:p-3 rounded border border-blue-200 dark:border-blue-800">
                      <p className="font-medium text-blue-700 text-elec-yellow mb-2 text-xs sm:text-sm">Why This Matters</p>
                      <p className="text-xs sm:text-xs sm:text-sm text-white">
                        Supervisors and foremen have the authority to make decisions about your work and are accountable for the outcomes. Building good communication with them directly impacts your daily work experience and career development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="supervisor-role-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Communication Methods */}
          <section className="mb-6">
            <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-2 sm:gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base sm:text-lg">Communication Methods</h3>
                  
                  <p className="text-sm sm:text-base text-white mb-4">
                    Different situations require different communication approaches. Understanding when and how to use each method ensures effective information exchange.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                        <p className="font-medium mb-2 text-xs sm:text-sm text-green-600 dark:text-green-400">Face-to-Face Communication</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Most common method on site</li>
                          <li>Be clear, polite, and concise</li>
                          <li>Ideal for immediate questions or urgent issues</li>
                          <li>Allows for immediate clarification</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                        <p className="font-medium mb-2 text-xs sm:text-sm text-green-600 dark:text-green-400">Toolbox Talks / Briefings</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Listen carefully and actively participate</li>
                          <li>Take notes if needed</li>
                          <li>Ask questions for clarification</li>
                          <li>Essential for safety and project updates</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                        <p className="font-medium mb-2 text-xs sm:text-sm text-green-600 dark:text-green-400">Written Records</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Use job sheets, emails, or site forms</li>
                          <li>Confirm key instructions in writing</li>
                          <li>Provides legal protection and clarity</li>
                          <li>Essential for complex or critical tasks</li>
                        </ul>
                      </div>
                      
                      <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                        <p className="font-medium mb-2 text-xs sm:text-sm text-green-600 dark:text-green-400">Two-Way Communication</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Don't just listen - actively engage</li>
                          <li>Ask questions if anything is unclear</li>
                          <li>Provide feedback and updates</li>
                          <li>Confirm understanding before proceeding</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="communication-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Effective Communication Skills */}
          <section className="mb-6">
            <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-orange-500 ">
              <div className="flex items-start gap-2 sm:gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-600 text-elec-yellow mb-3 text-base sm:text-lg">Effective Communication Skills</h3>
                  
                  <p className="text-sm sm:text-base text-white mb-4">
                    Professional communication involves both verbal and non-verbal elements. These skills help build trust and ensure clear understanding.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm sm:text-base text-white mb-2 font-semibold">Verbal Communication:</p>
                      <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1 sm:space-y-2">
                        <li><strong>Speak clearly and respectfully</strong> – Use appropriate volume and pace, avoid mumbling or speaking too quickly.</li>
                        <li><strong>Use site-appropriate terminology</strong> – Use technical terms correctly but avoid unnecessary jargon that might confuse.</li>
                        <li><strong>Confirm instructions back</strong> – Example: "Just to confirm, you want me to run the conduit along the east wall and terminate at the DB?"</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm sm:text-base text-white mb-2 font-semibold">Non-Verbal Communication:</p>
                      <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1 sm:space-y-2">
                        <li><strong>Maintain appropriate eye contact</strong> – Shows attention and respect without being intimidating.</li>
                        <li><strong>Use positive body language</strong> – Stand or sit upright, face the speaker, avoid crossed arms or defensive postures.</li>
                        <li><strong>Show active listening</strong> – Nod appropriately, ask relevant questions, avoid distractions like phones.</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2 sm:p-3 rounded border border-orange-200 dark:border-orange-800">
                      <p className="font-medium text-orange-700 text-elec-yellow mb-2 text-xs sm:text-sm">Communication Example</p>
                      <p className="text-xs sm:text-xs sm:text-sm text-white italic">
                        "Good morning, John. I've finished the first fix in the office area. Before I start the second fix, could you confirm which circuits need RCD protection? I want to make sure I understand the specification correctly."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflicts-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Communication Issues */}
          <section className="mb-6">
            <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-red-500 ">
              <div className="flex items-start gap-2 sm:gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-600 text-elec-yellow mb-3 text-base sm:text-lg">Common Communication Issues</h3>
                  
                  <p className="text-sm sm:text-base text-white mb-4">
                    Understanding common communication problems helps you avoid them and work more effectively with supervisors and foremen.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2 text-xs sm:text-sm">Making Assumptions</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Assuming you understand without clarification</li>
                          <li>Thinking "it's obvious" what was meant</li>
                          <li>Not asking questions to avoid looking uninformed</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 text-elec-yellow mb-2 text-xs sm:text-sm">Poor Record Keeping</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                          <li>Forgetting instructions due to lack of notes</li>
                          <li>Relying only on memory for complex tasks</li>
                          <li>Not documenting changes or variations</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded border border-red-200 dark:border-red-800">
                      <p className="font-medium text-red-700 text-elec-yellow mb-2 text-xs sm:text-sm">Trade Conflicts</p>
                      <p className="text-xs sm:text-xs sm:text-sm text-white">
                        Misunderstandings between trades leading to conflicts, delays, and tension on site. These often arise from unclear communication about workspace sharing, installation sequences, or responsibilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            {practicalGuidance.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-white">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-amber-800 dark:text-white mb-3">Real-World Example</h2>
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                <p className="text-base text-white leading-relaxed">
                  <strong>The Situation:</strong> On a refurbishment project, an apprentice misheard the instruction to "terminate at DB2" and instead wired into DB1. 
                </p>
                <p className="text-base text-white leading-relaxed mt-3">
                  <strong>The Result:</strong> The mistake caused two days' delay and extra cost for rewiring and testing.
                </p>
                <p className="text-base text-white leading-relaxed mt-3">
                  <strong>The Lesson:</strong> If the apprentice had repeated back the instruction to the supervisor, the issue would have been avoided. A simple "Just to confirm, you want me to terminate at DB2, not DB1?" would have prevented the costly mistake.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-elec-yellow pl-4 py-2">
              <h3 className="font-semibold text-white mb-2">Q: Can I go directly to the site manager with a question?</h3>
              <p className="text-sm sm:text-base text-white">A: Not usually — always go to your foreman/supervisor first, unless it's an emergency situation that requires immediate senior management attention.</p>
            </div>
            <div className="border-l-4 border-l-green-500 pl-4 py-2">
              <h3 className="font-semibold text-white mb-2">Q: What if my supervisor is unavailable?</h3>
              <p className="text-sm sm:text-base text-white">A: Wait if possible, or pass the issue to another foreman from your team. Never guess or make assumptions about what should be done.</p>
            </div>
            <div className="border-l-4 border-l-red-500 pl-4 py-2">
              <h3 className="font-semibold text-white mb-2">Q: Should I challenge instructions if I think they're unsafe?</h3>
              <p className="text-sm sm:text-base text-white">A: Yes — politely raise the safety concern, and if it remains unresolved, escalate to the Health & Safety Officer. Safety always takes priority.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <h2 className="text-lg sm:text-xl font-semibold text-green-800 dark:text-white mb-4">Pocket Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pocketGuide.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-green-200 dark:border-green-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">Recap</h2>
              <p className="text-base text-white leading-relaxed">
                You've learned how to communicate clearly and effectively with supervisors and foremen, why it matters, and how to avoid common mistakes. Good communication reduces errors, improves safety, and keeps projects running smoothly while building your professional reputation.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2" asChild>
            <Link to="../5-1">
              <ArrowLeft className="w-4 h-4" />
              Back: Understanding Site Roles
            </Link>
          </Button>
          
          <Button className="w-full sm:w-auto flex items-center gap-2" asChild>
            <Link to="..">
              Next: Section Overview
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section5_2;