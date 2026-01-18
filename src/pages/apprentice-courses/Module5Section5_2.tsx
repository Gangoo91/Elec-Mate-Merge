import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, MessageSquare, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Communicating with Site Supervisors and Foremen - Module 5.5.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn effective communication techniques with site supervisors and foremen. Essential skills for professional interaction and project success on construction sites.";

const quickCheckQuestions = [
  {
    id: "1",
    question: "Who is your first point of contact for instructions on site?",
    options: ["Site Manager", "Client", "Supervisor/Foreman", "Another tradesperson"],
    correctIndex: 2,
    explanation: "Supervisors and foremen are your immediate point of contact for daily instructions, task allocation, and guidance on site."
  },
  {
    id: "2",
    question: "What is the best way to avoid miscommunication with your supervisor?",
    options: ["Assume you understand", "Repeat back instructions to confirm", "Ask another tradesperson", "Guess the meaning"],
    correctIndex: 1,
    explanation: "Repeating back instructions ensures both parties understand what is required and helps prevent costly mistakes."
  },
  {
    id: "3",
    question: "If another trade gives you conflicting instructions, what should you do?",
    options: ["Follow the most recent instruction", "Choose the easiest option", "Report it to your supervisor/foreman", "Argue with the other tradesperson"],
    correctIndex: 2,
    explanation: "Conflicting instructions should always be resolved through your supervisor/foreman to maintain clear communication chains and prevent disputes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is your first point of contact for instructions on site?",
    options: ["Site Manager", "Client Representative", "Supervisor/Foreman", "Another Apprentice"],
    correctAnswer: 2,
    explanation: "Supervisors and foremen are your immediate point of contact for daily instructions, task allocation, and site guidance."
  },
  {
    id: 2,
    question: "What is the main role of a foreman on a construction site?",
    options: ["To manage project budgets", "To allocate tasks, oversee work quality, and enforce safety", "To handle client communications", "To order materials only"],
    correctAnswer: 1,
    explanation: "Foremen are responsible for day-to-day operations including task allocation, quality control, and safety enforcement."
  },
  {
    id: 3,
    question: "True or False: It's acceptable to start a new task without clarifying unclear instructions.",
    options: ["True - it shows initiative", "False - always clarify first", "True - if the deadline is tight", "False - but only for complex tasks"],
    correctAnswer: 1,
    explanation: "Never start work with unclear instructions. Always clarify to prevent mistakes, delays, and safety issues."
  },
  {
    id: 4,
    question: "What should you do if you don't understand an instruction?",
    options: ["Guess what was meant", "Ask a colleague instead", "Ask questions and repeat back to confirm", "Start work and adjust as needed"],
    correctAnswer: 2,
    explanation: "Always ask questions and repeat back instructions to ensure clear understanding and prevent costly mistakes."
  },
  {
    id: 5,
    question: "Which of these is a good habit for apprentices?",
    options: ["Guessing instructions when unsure", "Recording key details and instructions", "Arguing with other trades directly", "Ignoring toolbox talks"],
    correctAnswer: 1,
    explanation: "Recording key details helps ensure instructions are followed correctly and provides reference for later questions."
  },
  {
    id: 6,
    question: "What is the purpose of toolbox talks?",
    options: ["To discuss project budgets", "To share safety information and site updates", "To plan weekend activities", "To order materials"],
    correctAnswer: 1,
    explanation: "Toolbox talks are brief meetings to share safety information, site updates, and important project communications."
  },
  {
    id: 7,
    question: "If another trade gives you conflicting instructions, what should you do?",
    options: ["Follow the most recent instruction", "Choose the easiest option", "Report it to your supervisor/foreman", "Ignore both instructions"],
    correctAnswer: 2,
    explanation: "Conflicting instructions should be resolved through proper channels to maintain clear communication and prevent errors."
  },
  {
    id: 8,
    question: "True or False: Written records are not needed if you have verbal instructions.",
    options: ["True - verbal is sufficient", "False - written records provide important backup", "True - only for simple tasks", "False - but only for complex projects"],
    correctAnswer: 1,
    explanation: "Written records provide backup, clarification, and legal protection. They complement verbal instructions."
  },
  {
    id: 9,
    question: "What is a simple technique to avoid miscommunication?",
    options: ["Speak louder", "Use technical jargon", "Repeat back instructions", "Assume understanding"],
    correctAnswer: 2,
    explanation: "Repeating back instructions ensures both parties understand what is required and helps identify any misunderstandings immediately."
  },
  {
    id: 10,
    question: "Who enforces safety rules and gives guidance at task level?",
    options: ["Client Representative", "Supervisor/Foreman", "Other Apprentices", "Material Suppliers"],
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
              <span className="text-white/60">Section 5.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Communicating with Site Supervisors and Foremen
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn effective communication techniques with site supervisors and foremen for professional success on construction sites.
            </p>
          </header>

          {/* In 30 Seconds / Spot it */}
          <section className="mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li>Clear communication with supervisors prevents costly mistakes and delays.</li>
                  <li>Always confirm instructions by repeating them back.</li>
                  <li>Keep written records of important instructions and decisions.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li><strong>Spot:</strong> Miscommunication leading to rework, delays, or safety issues.</li>
                  <li><strong>Use:</strong> Confirmation techniques and proper reporting channels.</li>
                  <li><strong>Check:</strong> Regular progress updates and clarification requests.</li>
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
                Clear and professional communication with site supervisors and foremen is essential for smooth project delivery and workplace safety. As an apprentice electrician, your supervisors and foremen are your direct link to project management, daily work allocation, and critical safety information.
              </p>
              <p>
                Effective communication in the electrical trade involves more than just receiving instructions. It includes understanding technical drawings, confirming electrical specifications, reporting progress on installations, and ensuring compliance with safety procedures. Poor communication can result in incorrect installations, safety hazards, project delays, and costly rework.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Why This Matters</p>
                    <p className="text-sm text-white/70">
                      Effective communication with supervisors reduces project delays by up to 40% and significantly improves safety outcomes through clearer understanding of instructions and procedures.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <strong>Real Impact:</strong> Projects with excellent supervisor-trades communication show 30% fewer rework incidents and improved team morale.
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
                <h4 className="font-medium text-white mb-2">Communication Knowledge</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Understand the role of supervisors and foremen in communication</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Apply effective communication techniques</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Know when and how to report issues or progress</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Avoid misunderstandings and conflicts on site</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Professional Skills</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Recognise the importance of clear record-keeping and confirmation</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Use proper channels for reporting and escalation</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Build professional relationships with site supervisors</li>
                  <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Maintain clear and accurate work documentation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Role of Supervisors and Foremen */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Role of Supervisors and Foremen
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Supervisors and foremen are your key communication link on site. Understanding their role helps you communicate more effectively:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-3">Primary Functions</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Communication Bridge</strong> – Act as the link between site management and tradespeople, ensuring information flows clearly in both directions.</li>
                  <li><strong>Task Management</strong> – Allocate tasks, check work quality, and ensure deadlines are met whilst coordinating between different trades.</li>
                  <li><strong>Safety Leadership</strong> – Provide safety guidance, enforce site rules, conduct toolbox talks, and ensure compliance with health and safety regulations.</li>
                  <li><strong>Quality Control</strong> – Monitor work standards, conduct inspections, and ensure all work meets specifications and regulations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">
                  <strong>Why This Matters:</strong> Supervisors and foremen have the authority to make decisions about your work and are accountable for the outcomes. Building good communication with them directly impacts your daily work experience and career development.
                </p>
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

          {/* Communication Methods */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Communication Methods
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Different situations require different communication approaches:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Face-to-Face Communication</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Most common method on site</li>
                    <li>Be clear, polite, and concise</li>
                    <li>Ideal for immediate questions or urgent issues</li>
                    <li>Allows for immediate clarification</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Toolbox Talks / Briefings</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Listen carefully and actively participate</li>
                    <li>Take notes if needed</li>
                    <li>Ask questions for clarification</li>
                    <li>Essential for safety and project updates</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Written Records</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Use job sheets, emails, or site forms</li>
                    <li>Confirm key instructions in writing</li>
                    <li>Provides legal protection and clarity</li>
                    <li>Essential for complex or critical tasks</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Two-Way Communication</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Don't just listen - actively engage</li>
                    <li>Ask questions if anything is unclear</li>
                    <li>Provide feedback and updates</li>
                    <li>Confirm understanding before proceeding</li>
                  </ul>
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

          {/* Effective Communication Skills */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Effective Communication Skills
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Professional communication involves both verbal and non-verbal elements:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-3">Verbal Communication</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Speak clearly and respectfully</strong> – Use appropriate volume and pace, avoid mumbling or speaking too quickly.</li>
                  <li><strong>Use site-appropriate terminology</strong> – Use technical terms correctly but avoid unnecessary jargon that might confuse.</li>
                  <li><strong>Confirm instructions back</strong> – Example: "Just to confirm, you want me to run the conduit along the east wall and terminate at the DB?"</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-3">Non-Verbal Communication</p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li><strong>Maintain appropriate eye contact</strong> – Shows attention and respect without being intimidating.</li>
                  <li><strong>Use positive body language</strong> – Stand or sit upright, face the speaker, avoid crossed arms or defensive postures.</li>
                  <li><strong>Show active listening</strong> – Nod appropriately, ask relevant questions, avoid distractions like phones.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-medium text-amber-400 mb-2">Communication Example</p>
                <p className="text-sm text-white/70 italic">
                  "Good morning, John. I've finished the first fix in the office area. Before I start the second fix, could you confirm which circuits need RCD protection? I want to make sure I understand the specification correctly."
                </p>
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

          {/* Common Communication Issues */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Common Communication Issues
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding common communication problems helps you avoid them:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Making Assumptions</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Assuming you understand without clarification</li>
                    <li>Thinking "it's obvious" what was meant</li>
                    <li>Not asking questions to avoid looking uninformed</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Poor Record Keeping</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Forgetting instructions due to lack of notes</li>
                    <li>Relying only on memory for complex tasks</li>
                    <li>Not documenting changes or variations</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Trade Conflicts</p>
                <p className="text-sm text-white/70">
                  Misunderstandings between trades leading to conflicts, delays, and tension on site. These often arise from unclear communication about workspace sharing, installation sequences, or responsibilities.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
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
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 mb-3">
                    <strong>The Situation:</strong> On a refurbishment project, an apprentice misheard the instruction to "terminate at DB2" and instead wired into DB1.
                  </p>
                  <p className="text-white/80 mb-3">
                    <strong>The Result:</strong> The mistake caused two days' delay and extra cost for rewiring and testing.
                  </p>
                  <p className="text-white/80">
                    <strong>The Lesson:</strong> If the apprentice had repeated back the instruction to the supervisor, the issue would have been avoided. A simple "Just to confirm, you want me to terminate at DB2, not DB1?" would have prevented the costly mistake.
                  </p>
                </div>
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
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-white mb-2">Q: Can I go directly to the site manager with a question?</h3>
                <p className="text-sm text-white/70">A: Not usually — always go to your foreman/supervisor first, unless it's an emergency situation that requires immediate senior management attention.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-white mb-2">Q: What if my supervisor is unavailable?</h3>
                <p className="text-sm text-white/70">A: Wait if possible, or pass the issue to another foreman from your team. Never guess or make assumptions about what should be done.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <h3 className="font-semibold text-white mb-2">Q: Should I challenge instructions if I think they're unsafe?</h3>
                <p className="text-sm text-white/70">A: Yes — politely raise the safety concern, and if it remains unresolved, escalate to the Health & Safety Officer. Safety always takes priority.</p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {pocketGuide.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0" />
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
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-white/80">
                  You've learned how to communicate clearly and effectively with supervisors and foremen, why it matters, and how to avoid common mistakes. Good communication reduces errors, improves safety, and keeps projects running smoothly while building your professional reputation.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Knowledge Check
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
              <Link to="../5-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Understanding Site Roles
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                Next: Coordinating with Other Trades
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section5_2;
