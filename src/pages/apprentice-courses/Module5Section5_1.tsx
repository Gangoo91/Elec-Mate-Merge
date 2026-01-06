import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Understanding Site Roles and Responsibilities - Module 5.5.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about key site roles, responsibilities, and chain of command on construction sites. Essential knowledge for effective teamwork and communication.";

const quickCheckQuestions = [
  {
    id: "1",
    question: "Who has overall responsibility for safety and coordination on site?",
    options: [
      "Apprentice",
      "Site Manager",
      "Foreman",
      "Client"
    ],
    correctIndex: 1,
    explanation: "The Site Manager has overall responsibility for site safety, progress, and coordination of all activities."
  },
  {
    id: "2",
    question: "What is the role of the foreman?",
    options: [
      "Managing budgets",
      "Daily task allocation and quality checks",
      "Client meetings",
      "Ordering materials"
    ],
    correctIndex: 1,
    explanation: "The foreman manages day-to-day operations, allocates tasks to trades, and conducts quality checks."
  },
  {
    id: "3",
    question: "Why should you follow the chain of command?",
    options: [
      "It's faster",
      "To avoid confusion and delays",
      "It's a legal requirement",
      "To make friends"
    ],
    correctIndex: 1,
    explanation: "Following the chain of command prevents confusion, ensures clear communication, and avoids delays in decision-making."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is responsible for the overall progress of the site?",
    options: [
      "Apprentice",
      "Site Manager",
      "Foreman",
      "Client"
    ],
    correctAnswer: 1,
    explanation: "The Site Manager has overall responsibility for project progress, coordination, and ensuring targets are met."
  },
  {
    id: 2,
    question: "Who allocates daily tasks to tradespeople?",
    options: [
      "Client",
      "Supervisor/Foreman",
      "Apprentice",
      "Health & Safety Officer"
    ],
    correctAnswer: 1,
    explanation: "The Supervisor or Foreman is responsible for allocating daily tasks and managing trades on the ground."
  },
  {
    id: 3,
    question: "True or False: The client's representative gives you your day-to-day tasks.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. The client's representative monitors progress but doesn't give day-to-day tasks - that's the supervisor's role."
  },
  {
    id: 4,
    question: "What is the main role of the Health & Safety Officer?",
    options: [
      "Task allocation",
      "To monitor risks and ensure safety compliance",
      "Quality control",
      "Material ordering"
    ],
    correctAnswer: 1,
    explanation: "The Health & Safety Officer ensures compliance with safety regulations, monitors risks, and delivers safety briefings."
  },
  {
    id: 5,
    question: "If you see a loose scaffold board, who should you report it to first?",
    options: [
      "Client",
      "Your supervisor/foreman",
      "Site Manager",
      "Other trades"
    ],
    correctAnswer: 1,
    explanation: "Always report safety issues to your immediate supervisor first, unless it's an emergency requiring immediate action."
  },
  {
    id: 6,
    question: "Which role is responsible for checking installations meet standards?",
    options: [
      "Client",
      "Site Supervisor/Foreman",
      "Health & Safety Officer",
      "Other trades"
    ],
    correctAnswer: 1,
    explanation: "The Site Supervisor/Foreman conducts quality checks to ensure work meets required standards and specifications."
  },
  {
    id: 7,
    question: "Why is it important to know the chain of command?",
    options: [
      "To make friends",
      "To avoid confusion and keep communication clear",
      "It's not important",
      "To get promoted"
    ],
    correctAnswer: 1,
    explanation: "Knowing the chain of command ensures clear communication, prevents confusion, and maintains efficient workflow."
  },
  {
    id: 8,
    question: "Who is responsible for carrying out electrical work to BS 7671?",
    options: [
      "Site Manager",
      "Electricians and apprentices",
      "Client",
      "Health & Safety Officer"
    ],
    correctAnswer: 1,
    explanation: "Qualified electricians and apprentices under supervision are responsible for carrying out electrical work to BS 7671 standards."
  },
  {
    id: 9,
    question: "If an urgent safety issue arises, what should you do first?",
    options: [
      "Continue working",
      "Stop work and alert others",
      "Report it later",
      "Ask someone else to deal with it"
    ],
    correctAnswer: 1,
    explanation: "For urgent safety issues, immediately stop work and alert others nearby before following normal reporting procedures."
  },
  {
    id: 10,
    question: "Which of these is NOT typically a site role?",
    options: [
      "Site Manager",
      "Apprentice",
      "Safety Officer",
      "Customer Service Agent"
    ],
    correctAnswer: 3,
    explanation: "Customer Service Agents work in offices, not on construction sites. Site roles include managers, supervisors, trades, and safety officers."
  }
];

const practicalGuidance = [
  "Step 1: On your first day, introduce yourself to the site supervisor or foreman. Ask for clarification about reporting structures and daily briefing times.",
  "Step 2: Identify who is responsible for different aspects of the project - safety checks, material deliveries, quality sign-offs, and emergency procedures.",
  "Step 3: Keep a note of key personnel contact details and their specific areas of responsibility. This prevents confusion when issues arise.",
  "Step 4: Always report issues to your immediate supervisor first, unless it's an emergency requiring immediate action to prevent harm.",
  "Step 5: Attend all briefings, toolbox talks, and site meetings. These provide essential updates on safety, progress, and coordination requirements.",
  "Step 6: Respect the chain of command - avoid bypassing supervisors unless there's an emergency. This maintains clear communication lines.",
  "Step 7: If you receive conflicting instructions from different people, clarify through your immediate supervisor to avoid confusion and potential safety issues."
];

const pocketGuideItems = [
  "Site Manager = Overall responsibility and coordination.",
  "Supervisor/Foreman = Daily tasks, quality checks, direct liaison.",
  "H&S Officer = Safety compliance, risk monitoring, briefings.",
  "Electrician/Apprentice = Carry out tasks safely to standards.",
  "Other Trades = Specific trade responsibilities, coordination needed.",
  "Client Representative = Progress monitoring, requirements checking.",
  "Always follow chain of command unless emergency.",
  "Report safety issues immediately to supervisor.",
  "Attend all briefings and site meetings."
];

const Module5Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "If I notice a safety hazard, do I always go to my supervisor first?",
      answer: "Yes, unless it is an immediate danger — in which case you should stop work and alert everyone nearby straight away. For immediate dangers, personal safety and the safety of others takes priority over reporting procedures."
    },
    {
      question: "What if two trades give me conflicting instructions?",
      answer: "Always follow your supervisor's instructions and clarify the situation through them. Different trades may have different priorities, but your supervisor coordinates the overall workflow and safety requirements."
    },
    {
      question: "Do apprentices have specific responsibilities?",
      answer: "Yes — apprentices must work safely, follow instructions from qualified personnel, ask questions when unsure, and take responsibility for their own learning and development within the workplace."
    },
    {
      question: "How do I know who to report different types of issues to?",
      answer: "Create a simple reference: Safety issues → Supervisor/H&S Officer, Quality problems → Supervisor/Foreman, Material shortages → Supervisor, Client queries → Site Manager through supervisor."
    },
    {
      question: "What happens if I bypass the chain of command?",
      answer: "Bypassing can cause confusion, duplicate work, conflicting instructions, and undermine site coordination. It can also damage working relationships and affect your professional reputation."
    },
    {
      question: "Should I introduce myself to other trades on site?",
      answer: "Yes, brief introductions help with coordination and cooperation. However, remember that work instructions still come through your supervisor, not directly from other trades."
    },
    {
      question: "How often do site roles change during a project?",
      answer: "Key roles like Site Manager usually remain constant, but supervisors and trades may change depending on project phases. Always confirm current reporting structures when personnel change."
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.5.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Understanding Site Roles and Responsibilities
          </h1>
          <p className="text-white">
            Learn about key site personnel, their responsibilities, and the chain of command for effective teamwork.
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
                <li>Every person on site has a defined role and responsibilities.</li>
                <li>Always follow the chain of command for reporting.</li>
                <li>Know who to approach for different types of issues.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Confusion about who gives instructions or handles issues.</li>
                <li><strong>Use:</strong> Clear reporting structures and communication chains.</li>
                <li><strong>Check:</strong> Always confirm reporting procedures on new sites.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            On any construction site, knowing who is responsible for what is essential to keeping the project organised, safe, and on schedule. Clear understanding of roles ensures that electricians can work effectively with supervisors, other trades, and site personnel. Misunderstanding roles can cause delays, duplication of work, or safety hazards.
          </p>
          
          <div className="rounded-lg p-4 bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-white">
                  Clear understanding of site roles reduces miscommunication by up to 60% and significantly improves project coordination and safety outcomes.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-white">
              <strong>Real Impact:</strong> Sites with clearly defined roles and responsibilities show 35% fewer delays and improved safety performance compared to poorly organised projects.
            </p>
            
            <div className="bg-elec-yellow/5 bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30 border-elec-yellow/20">
              <p className="text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> CDM 2015 regulations require clear definition of roles and responsibilities to ensure effective health and safety management on construction sites.
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
              <h4 className="font-medium text-white">Site Personnel Knowledge</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Identify the main roles of personnel on a construction site
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Understand the responsibilities of each role
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Recognise the chain of command and reporting structure
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Know who to approach for specific site-related issues
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Communication Skills</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Work more effectively as part of a multi-trade team
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Follow proper reporting procedures and communication chains
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Resolve conflicts and issues through appropriate channels
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Maintain professional relationships with all site personnel
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
                  Navigate site hierarchies and reporting structures effectively
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Coordinate work activities with other trades and supervisors
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Participate effectively in site meetings and briefings
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Safety & Compliance</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Report safety issues through correct channels
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Understand emergency procedures and contact points
                </li>
                <li className="flex items-start">
                  <span className="text-elec-yellow mr-2 font-bold">•</span>
                  Maintain accountability and professional standards
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Key Site Roles */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Key Site Roles</h3>
            <p className="text-base text-white mb-4">
              Understanding the main roles and responsibilities on construction sites ensures effective communication and workflow. Each role has specific functions that contribute to project success and safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3 text-sm sm:text-base">Primary Site Personnel and Their Functions</p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Management Hierarchy:</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1 sm:space-y-2">
                          <li><strong>Site Manager / Project Manager</strong> – Overall responsibility for site safety, progress, coordination, budgets, and client liaison. Makes strategic decisions and handles contract issues.</li>
                          <li><strong>Site Supervisor / Foreman</strong> – Day-to-day management of trades, allocation of tasks, quality checks, and direct worker supervision. Your main point of contact for daily operations.</li>
                          <li><strong>Health & Safety Officer</strong> – Ensures compliance with safety regulations, monitors risks, delivers safety briefings, conducts site inspections, and investigates incidents.</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Operational Personnel:</p>
                        <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1 sm:space-y-2">
                          <li><strong>Electricians / Apprentices</strong> – Carry out installation, testing, and maintenance tasks according to BS 7671 and project specifications. Responsible for quality workmanship and safety compliance.</li>
                          <li><strong>Other Trades (Joiners, Plumbers, HVAC, etc.)</strong> – Responsible for their specific trade tasks, often working alongside electricians. Coordination with these trades is essential for efficient workflow.</li>
                          <li><strong>Client / Client Representative</strong> – May attend site to check progress, ensure requirements are being met, approve variations, and sign off completed work phases.</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Specialist Roles:</p>
                        <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border mb-2">
                          <ul className="list-disc ml-3 sm:ml-4 space-y-1 text-xs sm:text-xs sm:text-sm text-white">
                            <li><strong>Quantity Surveyor:</strong> Manages project costs, variations, and material orders</li>
                            <li><strong>Site Engineer:</strong> Provides technical support and sets out work positions</li>
                            <li><strong>CDM Coordinator:</strong> Ensures health and safety compliance under CDM regulations</li>
                            <li><strong>Building Control Inspector:</strong> Conducts statutory inspections and approvals</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2 text-xs sm:text-sm">Professional Impact</p>
                        <p className="text-xs sm:text-xs sm:text-sm text-white">
                          Understanding site roles improves your professional credibility and helps you navigate complex project environments more effectively.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsibilities of Each Role */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Responsibilities of Each Role</h3>
            <p className="text-base text-white mb-4">
              Each role has specific responsibilities that contribute to project success and site safety. Understanding these helps you know who to approach for different issues:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-sm sm:text-base">Detailed Role Responsibilities</p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Management Responsibilities:</p>
                        <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border mb-2">
                          <ul className="list-disc ml-3 sm:ml-4 space-y-1 text-xs sm:text-xs sm:text-sm text-white">
                            <li><strong>Site Managers:</strong> Ensure project deadlines, budgets, and safety compliance. Handle contract disputes, client relations, and strategic planning.</li>
                            <li><strong>Supervisors/Foremen:</strong> Direct daily tasks, coordinate between trades, conduct quality checks, manage workforce, and act as communication bridge between workers and management.</li>
                            <li><strong>Health & Safety Officers:</strong> Monitor compliance with safety regulations, conduct risk assessments, deliver toolbox talks, investigate accidents, and ensure PPE compliance.</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Trade Responsibilities:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                            <p className="font-medium mb-2 text-xs sm:text-sm">Electricians</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Install electrical systems to BS 7671</li>
                              <li>Complete testing and certification</li>
                              <li>Maintain accurate records</li>
                              <li>Ensure safe working practices</li>
                              <li>Supervise apprentices</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border">
                            <p className="font-medium mb-2 text-xs sm:text-sm">Apprentices</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Follow instructions from qualified personnel</li>
                              <li>Work safely and ask questions when unsure</li>
                              <li>Develop skills through practical experience</li>
                              <li>Complete required training and assessments</li>
                              <li>Take responsibility for learning</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Coordination Requirements:</p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 sm:p-3 rounded border border-yellow-200 dark:border-yellow-800">
                          <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                            <li><strong>Client Representatives:</strong> Monitor progress against specifications, approve variations, sign off completed phases</li>
                            <li><strong>Other Trades:</strong> Coordinate installation sequences, share workspace safely, communicate potential conflicts</li>
                            <li><strong>Delivery Personnel:</strong> Coordinate material deliveries, ensure safe storage, verify quantities and specifications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="roles-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Chain of Command */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Chain of Command</h3>
            <p className="text-base text-white mb-4">
              Following the correct chain of command ensures clear communication, prevents confusion, and maintains efficient workflow. Understanding reporting structures is essential for professional conduct:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3 text-sm sm:text-base">Communication Hierarchy and Procedures</p>
                    
                    <div className="bg-[#121212] rounded-lg p-3 sm:p-4 mb-4">
                      <p className="text-white font-semibold mb-3 text-sm sm:text-base">Reporting Structure:</p>
                      
                      <div className="space-y-3">
                        <div className="text-white text-xs sm:text-sm">
                          <span className="text-elec-yellow mr-2">•</span>
                          <strong>Always report issues to your immediate supervisor first</strong> – This maintains clear communication lines and ensures proper documentation.
                        </div>
                        
                        <div className="text-white text-xs sm:text-sm">
                          <span className="text-elec-yellow mr-2">•</span>
                          <strong>Use the correct communication routes</strong> – Avoid confusion or delays by following established procedures.
                        </div>
                        
                        <div className="text-white text-xs sm:text-sm">
                          <span className="text-elec-yellow mr-2">•</span>
                          <strong>Document important communications</strong> – Keep records of instructions, changes, and decisions for future reference.
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Typical reporting hierarchy:</p>
                        <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-2 sm:p-3 rounded border border-blue-200 dark:border-blue-800 mb-3">
                          <div className="text-xs sm:text-xs sm:text-sm text-white space-y-2">
                            <p><strong>Apprentice → Qualified Electrician → Site Supervisor → Site Manager → Client</strong></p>
                            <p className="text-xs">Each level has authority to make decisions within their scope of responsibility</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Communication flow:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-2 sm:p-3 rounded border border-blue-200 dark:border-blue-800">
                            <p className="font-medium text-blue-700 text-elec-yellow mb-2 text-xs sm:text-sm">Standard Issues</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Report to immediate supervisor</li>
                              <li>Supervisor escalates if needed</li>
                              <li>Site Manager makes final decisions</li>
                              <li>Client informed through proper channels</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded border border-red-200 dark:border-red-800">
                            <p className="font-medium text-red-700 text-elec-yellow mb-2 text-xs sm:text-sm">Emergency Situations</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Stop work immediately</li>
                              <li>Alert everyone nearby</li>
                              <li>Follow emergency procedures</li>
                              <li>Report to supervisor after ensuring safety</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="command-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Why Understanding Roles Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Why Understanding Roles Matters</h3>
            <p className="text-base text-white mb-4">
              Clear understanding of roles and responsibilities creates a more efficient and safer working environment. It directly impacts project success, personal development, and workplace relationships:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3 text-sm sm:text-base">Impact on Project Success and Personal Development</p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Immediate Benefits:</p>
                        <div className="bg-[#121212]/50 p-2 sm:p-3 rounded border mb-3">
                          <ul className="text-xs sm:text-xs sm:text-sm text-white ml-3 sm:ml-4 list-disc space-y-1">
                            <li><strong>Helps avoid conflict and confusion</strong> – Clear roles prevent overlapping responsibilities and disputes.</li>
                            <li><strong>Keeps workflow smooth and efficient</strong> – Everyone knows their tasks and dependencies.</li>
                            <li><strong>Enhances safety</strong> – Ensures the right person deals with the right problem quickly and correctly.</li>
                            <li><strong>Improves decision-making speed</strong> – Issues reach the appropriate authority faster.</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Long-term advantages:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded border border-green-200 dark:border-green-800">
                            <p className="font-medium text-green-700 dark:text-green-400 mb-2 text-xs sm:text-sm">Professional Development</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Understanding hierarchy aids career progression</li>
                              <li>Builds professional credibility and respect</li>
                              <li>Develops leadership and communication skills</li>
                              <li>Prepares you for supervisory roles</li>
                            </ul>
                          </div>
                          <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-2 sm:p-3 rounded border border-blue-200 dark:border-blue-800">
                            <p className="font-medium text-blue-700 text-elec-yellow mb-2 text-xs sm:text-sm">Operational Benefits</p>
                            <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                              <li>Faster problem resolution and decision-making</li>
                              <li>Improved safety through clear escalation paths</li>
                              <li>Better coordination and reduced trade conflicts</li>
                              <li>Enhanced project quality and client satisfaction</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base text-white mb-2 font-semibold">Real-world impact on electrical installations:</p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-3 rounded border border-amber-200 dark:border-amber-800">
                          <ul className="text-xs sm:text-xs sm:text-sm text-white list-disc ml-3 sm:ml-4 space-y-1">
                            <li><strong>Quality assurance:</strong> Proper reporting ensures work is checked and approved at appropriate levels</li>
                            <li><strong>Safety compliance:</strong> Clear responsibilities ensure safety requirements are met and maintained</li>
                            <li><strong>Problem resolution:</strong> Issues with design, materials, or access are resolved efficiently through correct channels</li>
                            <li><strong>Change management:</strong> Variations and modifications are properly authorized and documented</li>
                            <li><strong>Professional reputation:</strong> Understanding site structure demonstrates competence and reliability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="roles-benefits-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            {practicalGuidance.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-white">{index + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-white">{step}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Remember</p>
                <p className="text-xs sm:text-sm text-white">
                  Never bypass the chain of command unless it's an emergency requiring immediate action to prevent harm.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-slate-50 dark:bg-[#121212]/50 border border-slate-200 dark:border-slate-800">
            <h3 className="font-medium text-white mb-3">Commercial Project Communication Breakdown</h3>
            <div className="space-y-3 text-xs sm:text-sm text-white">
              <p>
                <strong>Situation:</strong> On a large commercial project, an apprentice reported a damaged cable directly to the client's representative instead of the site supervisor.
              </p>
              <p>
                <strong>Problem:</strong> The issue was not dealt with properly, causing a delay in inspection and affecting the project timeline.
              </p>
              <p>
                <strong>Solution:</strong> This could have been avoided by following the correct reporting chain - supervisor first, then escalation if needed.
              </p>
              <p>
                <strong>Learning:</strong> Always use proper communication channels, even when it seems faster to go direct to the client.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">FAQs</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pocketGuideItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              You've learned that every person on site has a defined role and responsibility. Knowing who to report to and understanding the chain of command avoids confusion, reduces conflict, and ensures the project runs smoothly and safely.
            </p>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4" />
              Back to Section 5
            </Link>
          </Button>
          
          <Button className="w-full sm:w-auto flex items-center gap-2" asChild>
            <Link to="../5-2">
              Next: Communicating with Site Supervisors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section5_1;