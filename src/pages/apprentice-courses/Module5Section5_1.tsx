import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
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
    options: ["Apprentice", "Site Manager", "Foreman", "Client"],
    correctAnswer: 1,
    explanation: "The Site Manager has overall responsibility for project progress, coordination, and ensuring targets are met."
  },
  {
    id: 2,
    question: "Who allocates daily tasks to tradespeople?",
    options: ["Client", "Supervisor/Foreman", "Apprentice", "Health & Safety Officer"],
    correctAnswer: 1,
    explanation: "The Supervisor or Foreman is responsible for allocating daily tasks and managing trades on the ground."
  },
  {
    id: 3,
    question: "True or False: The client's representative gives you your day-to-day tasks.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. The client's representative monitors progress but doesn't give day-to-day tasks - that's the supervisor's role."
  },
  {
    id: 4,
    question: "What is the main role of the Health & Safety Officer?",
    options: ["Task allocation", "To monitor risks and ensure safety compliance", "Quality control", "Material ordering"],
    correctAnswer: 1,
    explanation: "The Health & Safety Officer ensures compliance with safety regulations, monitors risks, and delivers safety briefings."
  },
  {
    id: 5,
    question: "If you see a loose scaffold board, who should you report it to first?",
    options: ["Client", "Your supervisor/foreman", "Site Manager", "Other trades"],
    correctAnswer: 1,
    explanation: "Always report safety issues to your immediate supervisor first, unless it's an emergency requiring immediate action."
  },
  {
    id: 6,
    question: "Which role is responsible for checking installations meet standards?",
    options: ["Client", "Site Supervisor/Foreman", "Health & Safety Officer", "Other trades"],
    correctAnswer: 1,
    explanation: "The Site Supervisor/Foreman conducts quality checks to ensure work meets required standards and specifications."
  },
  {
    id: 7,
    question: "Why is it important to know the chain of command?",
    options: ["To make friends", "To avoid confusion and keep communication clear", "It's not important", "To get promoted"],
    correctAnswer: 1,
    explanation: "Knowing the chain of command ensures clear communication, prevents confusion, and maintains efficient workflow."
  },
  {
    id: 8,
    question: "Who is responsible for carrying out electrical work to BS 7671?",
    options: ["Site Manager", "Electricians and apprentices", "Client", "Health & Safety Officer"],
    correctAnswer: 1,
    explanation: "Qualified electricians and apprentices under supervision are responsible for carrying out electrical work to BS 7671 standards."
  },
  {
    id: 9,
    question: "If an urgent safety issue arises, what should you do first?",
    options: ["Continue working", "Stop work and alert others", "Report it later", "Ask someone else to deal with it"],
    correctAnswer: 1,
    explanation: "For urgent safety issues, immediately stop work and alert others nearby before following normal reporting procedures."
  },
  {
    id: 10,
    question: "Which of these is NOT typically a site role?",
    options: ["Site Manager", "Apprentice", "Safety Officer", "Customer Service Agent"],
    correctAnswer: 3,
    explanation: "Customer Service Agents work in offices, not on construction sites. Site roles include managers, supervisors, trades, and safety officers."
  }
];

const practicalGuidance = [
  "On your first day, introduce yourself to the site supervisor or foreman. Ask for clarification about reporting structures and daily briefing times.",
  "Identify who is responsible for different aspects of the project - safety checks, material deliveries, quality sign-offs, and emergency procedures.",
  "Keep a note of key personnel contact details and their specific areas of responsibility. This prevents confusion when issues arise.",
  "Always report issues to your immediate supervisor first, unless it's an emergency requiring immediate action to prevent harm.",
  "Attend all briefings, toolbox talks, and site meetings. These provide essential updates on safety, progress, and coordination requirements.",
  "Respect the chain of command - avoid bypassing supervisors unless there's an emergency. This maintains clear communication lines.",
  "If you receive conflicting instructions from different people, clarify through your immediate supervisor to avoid confusion and potential safety issues."
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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Understanding Site Roles and Responsibilities
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn about key site personnel, their responsibilities, and the chain of command for effective teamwork.
            </p>
          </header>

          {/* In 30 Seconds / Spot it */}
          <section className="mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li>Every person on site has a defined role and responsibilities.</li>
                  <li>Always follow the chain of command for reporting.</li>
                  <li>Know who to approach for different types of issues.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li><strong>Spot:</strong> Confusion about who gives instructions or handles issues.</li>
                  <li><strong>Use:</strong> Clear reporting structures and communication chains.</li>
                  <li><strong>Check:</strong> Always confirm reporting procedures on new sites.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                On any construction site, knowing who is responsible for what is essential to keeping the project organised, safe, and on schedule. Clear understanding of roles ensures that electricians can work effectively with supervisors, other trades, and site personnel. Misunderstanding roles can cause delays, duplication of work, or safety hazards.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Why This Matters</p>
                    <p className="text-sm text-white/70">
                      Clear understanding of site roles reduces miscommunication by up to 60% and significantly improves project coordination and safety outcomes.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <strong>Real Impact:</strong> Sites with clearly defined roles and responsibilities show 35% fewer delays and improved safety performance compared to poorly organised projects.
              </p>
              <p className="text-sm text-white/60 p-3 bg-white/5 rounded border border-white/10">
                <strong>Industry Standard:</strong> CDM 2015 regulations require clear definition of roles and responsibilities to ensure effective health and safety management on construction sites.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you will be able to:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Site Personnel Knowledge</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Identify the main roles of personnel on a construction site</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Understand the responsibilities of each role</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Recognise the chain of command and reporting structure</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Know who to approach for specific site-related issues</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Communication Skills</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Work more effectively as part of a multi-trade team</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Follow proper reporting procedures and communication chains</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Resolve conflicts and issues through appropriate channels</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Maintain professional relationships with all site personnel</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Site Roles */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Key Site Roles
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding the main roles and responsibilities on construction sites ensures effective communication and workflow:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-3">Management Hierarchy</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Site Manager / Project Manager</strong> – Overall responsibility for site safety, progress, coordination, budgets, and client liaison.</li>
                  <li><strong>Site Supervisor / Foreman</strong> – Day-to-day management of trades, allocation of tasks, quality checks. Your main point of contact.</li>
                  <li><strong>Health & Safety Officer</strong> – Ensures compliance with safety regulations, monitors risks, delivers safety briefings.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-3">Operational Personnel</p>
                <ul className="text-sm space-y-2 text-white/70">
                  <li><strong>Electricians / Apprentices</strong> – Carry out installation, testing, and maintenance tasks according to BS 7671.</li>
                  <li><strong>Other Trades</strong> – Joiners, plumbers, HVAC - responsible for their specific trade tasks, coordination needed.</li>
                  <li><strong>Client / Client Representative</strong> – May attend site to check progress and approve variations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-3">Specialist Roles</p>
                <ul className="text-sm space-y-1 text-white/70">
                  <li><strong>Quantity Surveyor:</strong> Manages project costs, variations, and material orders</li>
                  <li><strong>Site Engineer:</strong> Provides technical support and sets out work positions</li>
                  <li><strong>CDM Coordinator:</strong> Ensures health and safety compliance under CDM regulations</li>
                  <li><strong>Building Control Inspector:</strong> Conducts statutory inspections and approvals</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Responsibilities of Each Role */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Responsibilities of Each Role
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Each role has specific responsibilities that contribute to project success and site safety:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Electricians</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Install electrical systems to BS 7671</li>
                    <li>Complete testing and certification</li>
                    <li>Maintain accurate records</li>
                    <li>Ensure safe working practices</li>
                    <li>Supervise apprentices</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Apprentices</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Follow instructions from qualified personnel</li>
                    <li>Work safely and ask questions when unsure</li>
                    <li>Develop skills through practical experience</li>
                    <li>Complete required training and assessments</li>
                    <li>Take responsibility for learning</li>
                  </ul>
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

          {/* Chain of Command */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Chain of Command
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Following the correct chain of command ensures clear communication and prevents confusion:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-3">Reporting Structure</p>
                <p className="text-sm mb-3"><strong>Apprentice → Qualified Electrician → Site Supervisor → Site Manager → Client</strong></p>
                <ul className="text-sm space-y-1">
                  <li>• Always report issues to your immediate supervisor first</li>
                  <li>• Use the correct communication routes</li>
                  <li>• Document important communications</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Standard Issues</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Report to immediate supervisor</li>
                    <li>Supervisor escalates if needed</li>
                    <li>Site Manager makes final decisions</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Emergency Situations</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Stop work immediately</li>
                    <li>Alert everyone nearby</li>
                    <li>Follow emergency procedures</li>
                  </ul>
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

          {/* Why Understanding Roles Matters */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Why Understanding Roles Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Clear understanding of roles creates a more efficient and safer working environment:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Immediate Benefits</p>
                <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                  <li><strong>Helps avoid conflict and confusion</strong> – Clear roles prevent overlapping responsibilities</li>
                  <li><strong>Keeps workflow smooth and efficient</strong> – Everyone knows their tasks and dependencies</li>
                  <li><strong>Enhances safety</strong> – Ensures the right person deals with the right problem</li>
                  <li><strong>Improves decision-making speed</strong> – Issues reach the appropriate authority faster</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Professional Development</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Understanding hierarchy aids career progression</li>
                    <li>Builds professional credibility and respect</li>
                    <li>Develops leadership and communication skills</li>
                    <li>Prepares you for supervisory roles</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-400 mb-2">Operational Benefits</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Faster problem resolution</li>
                    <li>Improved safety through clear escalation paths</li>
                    <li>Better coordination and reduced trade conflicts</li>
                    <li>Enhanced project quality</li>
                  </ul>
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

          {/* Practical Guidance */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>
            <div className="space-y-3">
              {practicalGuidance.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-elec-yellow">{index + 1}</span>
                  </div>
                  <p className="text-sm text-white/80">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-400 mb-1">Remember</p>
                  <p className="text-sm text-white/70">
                    Never bypass the chain of command unless it's an emergency requiring immediate action to prevent harm.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="font-medium text-white mb-3">Commercial Project Communication Breakdown</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p><strong>Situation:</strong> On a large commercial project, an apprentice reported a damaged cable directly to the client's representative instead of the site supervisor.</p>
                <p><strong>Problem:</strong> The issue was not dealt with properly, causing a delay in inspection and affecting the project timeline.</p>
                <p><strong>Solution:</strong> This could have been avoided by following the correct reporting chain - supervisor first, then escalation if needed.</p>
                <p><strong>Learning:</strong> Always use proper communication channels, even when it seems faster to go direct to the client.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/70">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {pocketGuideItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80">
                You've learned that every person on site has a defined role and responsibility. Knowing who to report to and understanding the chain of command avoids confusion, reduces conflict, and ensures the project runs smoothly and safely.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Quiz (10 Questions)
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 5
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                Next: Communicating with Site Supervisors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section5_1;
