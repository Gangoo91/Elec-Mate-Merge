import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, ClipboardList, Clock, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lead-plan-programme",
    question: "What is the primary purpose of a look-ahead programme on a construction site?",
    options: [
      "To replace the master programme entirely with a simpler version",
      "To break the master programme into manageable weekly or fortnightly chunks for day-to-day planning",
      "To create a record of work completed for invoicing purposes only",
      "To give the project manager a document to present to the client"
    ],
    correctIndex: 1,
    explanation: "The look-ahead programme breaks the master programme into manageable weekly or fortnightly chunks. It allows supervisors to plan daily activities, identify resource needs, check progress, and adjust in real time. It is the supervisor's primary planning tool for translating the overall programme into daily reality."
  },
  {
    id: "lead-plan-resources",
    question: "Which three types of resource must a supervisor manage effectively on site?",
    options: [
      "Finance, marketing, and administration",
      "People, materials, and plant/equipment",
      "Drawings, specifications, and regulations",
      "Clients, architects, and quantity surveyors"
    ],
    correctIndex: 1,
    explanation: "The three types of resource a supervisor manages are people (labour), materials (everything from cable to fixings), and plant/equipment (cherry pickers, power tools, hoists). Effective management means matching skills to tasks, ordering materials with correct lead times, and ensuring plant is booked, checked, and operated by certified personnel."
  },
  {
    id: "lead-plan-ooda",
    question: "What does the OODA loop stand for?",
    options: [
      "Order, Organise, Direct, Assess",
      "Observe, Orient, Decide, Act",
      "Outline, Operate, Deliver, Adjust",
      "Oversee, Optimise, Delegate, Analyse"
    ],
    correctIndex: 1,
    explanation: "The OODA loop stands for Observe, Orient, Decide, Act. Originally developed for military decision-making, it is a powerful framework for supervisors when plans go wrong. Observe the situation, orient yourself to the new reality, decide on the best response, and act quickly. Then repeat the cycle as conditions continue to change."
  }
];

const faqs = [
  {
    question: "How far ahead should a supervisor plan?",
    answer: "Most experienced supervisors work with a rolling two-week look-ahead programme. Each Monday, review the coming fortnight: what tasks are due, what materials are needed, what access is required, what permits must be arranged, and what coordination with other trades is necessary. The further ahead you plan, the more time you have to resolve problems before they become crises. Some supervisors also maintain a four-to-six-week horizon for ordering materials with longer lead times (switchgear, specialist fittings, bespoke panels). The key is to plan at multiple levels: daily, weekly, fortnightly, and monthly."
  },
  {
    question: "What should I do if materials arrive late and delay the programme?",
    answer: "First, record the delay and its cause in writing (email to your manager, site diary entry). This protects you and your employer in any contractual dispute. Second, assess the impact: can you resequence other work to keep the team productive? Are there areas you can bring forward? Can you split the team to work on unaffected zones? Third, communicate immediately with the site manager and other affected trades. Never bury bad news. Fourth, update your look-ahead programme. Finally, investigate the cause: was the order placed late, did the supplier fail, or was the specification unclear? Learn from it to prevent recurrence."
  },
  {
    question: "How do I read a Gantt chart if I have never been taught?",
    answer: "A Gantt chart shows tasks as horizontal bars on a timeline. Each bar represents an activity; its length shows the duration; its position shows when it starts and finishes. Bars that overlap are activities happening at the same time. Arrows between bars show dependencies (one task must finish before another can start). The critical path is the longest chain of dependent tasks that determines the overall project duration. Ask your project manager to walk you through the programme for your section of work. Understanding even the basics will transform your ability to plan your team's work effectively."
  },
  {
    question: "What records should a supervisor keep related to planning?",
    answer: "Keep a daily site diary recording: weather conditions, labour on site (numbers and names), materials delivered, plant on site, work completed, variations or changes instructed, delays and their causes, visitors, incidents, and any instructions received. Take photographs of completed work and any issues. Keep copies of delivery notes and check them against orders. Save all emails related to programme changes, delays, or instructions. These records are invaluable for resolving disputes, supporting payment applications, and demonstrating competent site management. The supervisor's diary is a legal document."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the supervisor's primary role in site planning?",
    options: [
      "Creating the master programme from scratch",
      "Translating the programme into daily reality for their team",
      "Deciding the overall project completion date",
      "Negotiating contracts with the client"
    ],
    correctAnswer: 1,
    explanation: "The supervisor's primary planning role is translating the master programme into daily reality — ensuring the right people are in the right place with the right materials at the right time. The master programme is created by the project manager; the supervisor makes it happen on the ground."
  },
  {
    id: 2,
    question: "A Gantt chart shows which of the following?",
    options: [
      "Only the cost of each activity on the project",
      "Tasks as horizontal bars on a timeline, showing duration, sequence, and dependencies",
      "A list of all workers on site and their qualifications",
      "The health and safety risk assessments for each task"
    ],
    correctAnswer: 1,
    explanation: "A Gantt chart (also called a bar chart programme) displays tasks as horizontal bars on a timeline. Each bar's length represents the activity's duration. Arrows or links between bars show dependencies. Overlapping bars indicate concurrent activities. The critical path can be identified as the longest chain of dependent tasks."
  },
  {
    id: 3,
    question: "What does a 'critical path' on a programme represent?",
    options: [
      "The path that site vehicles must follow for deliveries",
      "The sequence of health and safety critical tasks",
      "The longest chain of dependent tasks that determines the overall project duration",
      "The emergency evacuation route for the site"
    ],
    correctAnswer: 2,
    explanation: "The critical path is the longest chain of dependent activities that determines the minimum project duration. Any delay to a task on the critical path directly delays the project completion date. Understanding whether your work is on the critical path helps you prioritise and communicate the impact of delays."
  },
  {
    id: 4,
    question: "When planning resources, what does 'lead time' refer to?",
    options: [
      "The time it takes to train a new apprentice",
      "The time between ordering materials and their delivery to site",
      "The amount of time a supervisor has been in their role",
      "The distance between the site entrance and the work area"
    ],
    correctAnswer: 1,
    explanation: "Lead time is the period between placing an order for materials and their arrival on site. Lead times vary widely: standard cable might be a few days, but switchgear or bespoke distribution boards can be 8-12 weeks or more. Supervisors must understand lead times to order materials in advance and avoid programme delays."
  },
  {
    id: 5,
    question: "The OODA loop is used by supervisors when:",
    options: [
      "Writing a new project programme from scratch",
      "Plans go wrong and rapid adaptation is needed",
      "Completing end-of-project documentation",
      "Conducting annual performance reviews"
    ],
    correctAnswer: 1,
    explanation: "The OODA loop (Observe, Orient, Decide, Act) is a decision-making framework used when plans go wrong and rapid adaptation is needed. It helps supervisors assess the new situation, understand the implications, decide on the best response, and act quickly — then repeat the cycle as conditions change."
  },
  {
    id: 6,
    question: "What should a supervisor do FIRST when they identify a delay that will affect the master programme?",
    options: [
      "Wait to see if the delay resolves itself over the next few days",
      "Tell the team to work overtime without informing management",
      "Raise it with the site manager immediately and record it in writing",
      "Adjust the master programme themselves without telling anyone"
    ],
    correctAnswer: 2,
    explanation: "When a delay will affect the master programme, the supervisor should raise it immediately with the site manager and record it in writing. Never bury bad news — early warning allows the project team to develop mitigation strategies. Waiting makes the problem worse and damages your credibility as a supervisor."
  },
  {
    id: 7,
    question: "Which of the following is NOT one of the three resource types a supervisor manages?",
    options: [
      "People (labour)",
      "Materials",
      "Plant and equipment",
      "Corporate finance"
    ],
    correctAnswer: 3,
    explanation: "The three resource types a supervisor manages are people (labour), materials, and plant/equipment. Corporate finance is managed at company level, not by site supervisors. However, supervisors must be cost-aware and avoid waste of the resources they do control."
  },
  {
    id: 8,
    question: "Why is a supervisor's daily site diary considered a legal document?",
    options: [
      "Because it is filed with the local council",
      "Because it provides contemporaneous evidence that can be used in contractual disputes and legal proceedings",
      "Because the HSE requires it to be submitted monthly",
      "Because it must be signed by a solicitor"
    ],
    correctAnswer: 1,
    explanation: "A supervisor's daily site diary is a contemporaneous record — written at the time events occurred. This makes it valuable evidence in contractual disputes, delay claims, accident investigations, and legal proceedings. Courts give significant weight to contemporaneous records over statements written after the fact."
  }
];

export default function LeadershipModule5Section1() {
  useSEO({
    title: "Planning and Organising the Work | Leadership Module 5.1",
    description: "How to plan and organise construction work as a supervisor — programmes, look-ahead planning, resource management, and adapting when plans change.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ClipboardList className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Planning and Organising the Work
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How effective planning separates competent supervisors from the rest &mdash; programmes, look-ahead planning, resource management, and adapting when reality changes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Core skill:</strong> Translating the programme into daily reality</li>
              <li><strong>Tool:</strong> Weekly/fortnightly look-ahead programme</li>
              <li><strong>Resources:</strong> People, materials, and plant/equipment</li>
              <li><strong>Key fact:</strong> Plans always change &mdash; adaptability is everything</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Supervisors</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Gantt chart:</strong> Your tool, not just the PM's tool</li>
              <li><strong>Lead times:</strong> Order early or face delays</li>
              <li><strong>OODA loop:</strong> Observe, Orient, Decide, Act</li>
              <li><strong>Records:</strong> Your site diary is a legal document</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why planning is a core leadership skill for supervisors",
              "Describe how to read and use a Gantt chart programme",
              "Create a weekly look-ahead programme for your team's work",
              "Manage the three types of site resource: people, materials, and plant",
              "Apply the OODA loop when plans change and rapid decisions are needed",
              "Keep accurate site records that protect you and your employer"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Planning Is a Leadership Skill */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Planning Is a Leadership Skill
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                &ldquo;Failing to plan is planning to fail.&rdquo; This phrase is repeated so often it has
                become a clich&eacute; &mdash; but on a construction site, it is literally true. The
                difference between a smooth-running site and total chaos is almost always the quality of
                the planning behind it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Supervisor&rsquo;s Planning Role</p>
                <p className="text-base text-white leading-relaxed">
                  As a supervisor, you are responsible for translating the programme into <strong>daily
                  reality</strong> &mdash; making sure the right people are in the right place, with the
                  right materials, at the right time. This is not the project manager&rsquo;s job. It is
                  yours.
                </p>
              </div>

              <p>
                Good planning is what separates a competent supervisor from someone who is merely
                &ldquo;in charge.&rdquo; Without planning, you are reactive &mdash; constantly firefighting,
                chasing materials, apologising to other trades, and explaining delays. With planning, you are
                proactive &mdash; anticipating problems before they arise, coordinating smoothly with others,
                and keeping your team productive.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Signs of Good vs Poor Planning</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Well-Planned Site</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Team knows what they are doing each morning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Materials arrive before they are needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Other trades are coordinated and sequenced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Problems are anticipated and resolved early</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Poorly Planned Site</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Team standing around waiting for instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Materials not ordered or delivered to wrong area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Constant clashes and arguments with other trades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Supervisor always firefighting and chasing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Planning is not paperwork. It is a <strong>leadership skill</strong> that directly impacts
                your team&rsquo;s productivity, morale, and safety. Workers who know what they are doing,
                have the materials they need, and can see the plan coming together are more motivated,
                more efficient, and safer than workers left in the dark.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Cost of Poor Planning</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Wasted labour</strong> &mdash; electricians standing idle because materials have not arrived or areas are not ready costs your employer hundreds of pounds per day per person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Rework</strong> &mdash; work installed in the wrong sequence, in the wrong area, or to the wrong specification must be stripped out and redone at double the cost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Programme delays</strong> &mdash; missed milestones can trigger contractual penalties (liquidated damages) that run into thousands of pounds per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Damaged reputation</strong> &mdash; a supervisor who consistently fails to plan loses the confidence of their team, their management, and other trades on site</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Understanding the Programme */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Understanding the Programme
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The overall project programme &mdash; usually presented as a <strong>Gantt chart</strong>
                (also called a bar chart) &mdash; shows how all trades interrelate across the entire project.
                Too many supervisors see this as &ldquo;the project manager&rsquo;s tool&rdquo; and never
                engage with it. This is a mistake. The programme is <strong>your</strong> tool.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What a Supervisor Must Understand From the Programme</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Your critical dates and milestones</strong> &mdash; when must first fix be complete? When is the testing and commissioning window? What is the handover date for each zone?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Which trades come before and after you</strong> &mdash; you cannot start second fix until the plasterers have finished. The painters cannot start until you have completed your fittings. Understanding these dependencies is essential.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Lead times for materials</strong> &mdash; switchgear might take 8&ndash;12 weeks. Standard cable might take 3&ndash;5 days. Specialist luminaires might take 16 weeks. If you do not order in time, the programme slips.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Inspection and sign-off points</strong> &mdash; when are containment inspections due? When must first-fix pre-plaster checks happen? When are the building control inspections?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Pro Tip</p>
                </div>
                <p className="text-sm text-white/80">
                  Ask your project manager to spend 30 minutes walking you through the master programme.
                  Get a printed copy (or PDF) and highlight your sections. Mark your key dates with a
                  highlighter. Keep it visible &mdash; pinned up in your site cabin or saved on your phone.
                  The supervisors who engage with the programme are the ones who deliver on time.
                </p>
              </div>

              <p>
                Understanding the programme also means understanding the <strong>critical path</strong>
                &mdash; the longest chain of dependent tasks that determines the overall project duration.
                If your electrical work is on the critical path, any delay you cause directly delays the
                entire project. This carries enormous contractual and financial implications. Know whether
                you are on the critical path and plan accordingly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Programme Terms Every Supervisor Should Know</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Float / Slack</p>
                    <p>The amount of time an activity can be delayed without affecting the overall
                      project completion date. Activities on the critical path have zero float.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Milestone</p>
                    <p>A key date marking the completion of a significant phase of work. Milestones
                      are often linked to payment applications and contractual obligations.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Lead Time</p>
                    <p>The time between placing an order for materials and their delivery to site.
                      Switchgear can be 8&ndash;12 weeks; specialist luminaires can be 16+ weeks.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Dependencies</p>
                    <p>Relationships between tasks. Finish-to-Start is the most common: Task B cannot
                      start until Task A finishes (e.g. second fix after plastering).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Short-Term Planning — Look-Ahead Programmes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Short-Term Planning &mdash; Look-Ahead Programmes
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The master programme tells you where you need to be in six months. The <strong>look-ahead
                programme</strong> tells you what you need to do <strong>this week</strong>. This is where
                the real planning happens &mdash; breaking the master programme into manageable
                weekly or fortnightly chunks that drive daily work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Monday Morning Planning Routine</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Every Monday morning, before your team starts work, spend 30 minutes planning the week.
                  Ask yourself these questions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">What Needs Doing?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Which areas are you working in this week?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>What stage of work (first fix, second fix, testing)?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Are there any inspections or sign-offs due?</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Who Is Doing It?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Match skills to tasks (apprentices need supervision)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Who is off this week (holiday, training, sickness)?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Do you need additional labour from the office?</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">What Materials Are Needed?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Is everything on site or does anything need ordering?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>When are deliveries expected and where will they go?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Are storage areas prepared and secure?</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">What Else Is Required?</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Do you need scaffolding, cherry pickers, or access?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Are permits required (hot works, confined space, isolation)?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Is coordination with other trades needed?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Check progress <strong>daily</strong> against your plan. At the end of each day, ask: did
                we achieve what we set out to? If not, why not? Adjust the plan for the rest of the week.
                Conditions change constantly on a construction site &mdash; weather, design changes,
                other trades overrunning, material delays. The look-ahead is a living document, not
                something you write on Monday and forget about.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Planning Mistakes</p>
                </div>
                <p className="text-sm text-white/80">
                  The most common mistakes supervisors make with short-term planning: (1) not planning at
                  all and &ldquo;winging it&rdquo; each day, (2) planning but not communicating the plan
                  to the team, (3) failing to check progress during the week and only discovering problems
                  on Friday, (4) not adjusting the plan when circumstances change, and (5) not recording
                  what actually happened versus what was planned. Avoid all five and you will be ahead of
                  most supervisors in the industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Managing Resources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Managing Resources
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A supervisor manages three types of resource: <strong>people</strong>,
                <strong> materials</strong>, and <strong>plant/equipment</strong>. Getting all three right
                at the same time is the hallmark of effective site management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Resource Types</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">People</p>
                    <p className="text-white/80 text-xs">Match skill to task. Do not put an apprentice on complex terminations unsupervised. Do not waste a qualified electrician on labouring tasks. Ensure nobody is overloaded or underutilised. Monitor fatigue and rotate demanding tasks.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Materials</p>
                    <p className="text-white/80 text-xs">Order in advance &mdash; lead times matter. Check deliveries against orders (quantity, specification, condition). Store properly (dry, secure, accessible). Track usage and reorder before you run out. Damaged or incorrect materials cause programme delays.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Plant &amp; Equipment</p>
                    <p className="text-white/80 text-xs">Book in advance (MEWPs, hoists, generators). Check condition before use. Ensure operators hold valid certification (CPCS, IPAF, PASMA). Report defects immediately. Return on time &mdash; hire charges add up quickly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Certifications to Check</p>
                </div>
                <p className="text-sm text-white/80">
                  Before allowing anyone to operate plant or equipment, verify their certification:
                  <strong className="text-white"> CPCS</strong> (Construction Plant Competence Scheme) for
                  plant such as excavators and cranes; <strong className="text-white">IPAF</strong>
                  (International Powered Access Federation) for cherry pickers and scissor lifts;
                  <strong className="text-white"> PASMA</strong> (Prefabricated Access Suppliers&rsquo; and
                  Manufacturers&rsquo; Association) for mobile tower scaffolds. Check cards are in date
                  and cover the specific category of equipment being used.
                </p>
              </div>

              <p>
                The most common resource failure is <strong>materials not being on site when needed</strong>.
                This is almost always a planning failure, not a supplier failure. If you know you need
                switchgear in week 20 and the lead time is 10 weeks, you must order by week 10 at the
                latest. Build a materials schedule from the programme and track it actively. A team standing
                idle because materials have not arrived is the most expensive waste on any construction site.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: When Plans Go Wrong */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            When Plans Go Wrong
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Plans always go wrong. Weather stops external work. Deliveries arrive late or damaged.
                Key workers go off sick. Designs change mid-installation. Services clash in the ceiling
                void. The question is not <strong>whether</strong> your plans will be disrupted, but
                <strong> how quickly you adapt</strong> when they are.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The OODA Loop &mdash; Rapid Decision-Making</p>
                <p className="text-sm text-white/80 mb-3">
                  Originally developed by military strategist Colonel John Boyd, the OODA loop is a
                  powerful framework for making rapid decisions when conditions change:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">O</p>
                    <p className="text-white font-medium text-xs mt-1">Observe</p>
                    <p className="text-white/80 text-xs mt-1">What has changed? What is the new situation?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">O</p>
                    <p className="text-white font-medium text-xs mt-1">Orient</p>
                    <p className="text-white/80 text-xs mt-1">What does it mean? What are the implications?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">D</p>
                    <p className="text-white font-medium text-xs mt-1">Decide</p>
                    <p className="text-white/80 text-xs mt-1">What is the best course of action?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">A</p>
                    <p className="text-white font-medium text-xs mt-1">Act</p>
                    <p className="text-white/80 text-xs mt-1">Implement and then repeat the cycle</p>
                  </div>
                </div>
              </div>

              <p>
                When disruption occurs, communicate changes to your team <strong>immediately</strong>. Do
                not let your team discover problems themselves &mdash; brief them, explain the new plan,
                and keep them informed. If the disruption affects the master programme, escalate it to the
                site manager straight away. <strong>Never bury bad news</strong> &mdash; raise it early
                when there is still time to mitigate.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Protect Yourself &mdash; Keep Records</p>
                </div>
                <p className="text-sm text-white/80">
                  Always keep records of delays and their causes. Note the date, what happened, who was
                  informed, and what the impact was. Take photographs. Send confirmation emails. This
                  protects you and your employer in contractual disputes and delay claims. A verbal
                  conversation is not a record &mdash; put it in writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective planning is a core leadership skill that directly impacts your team&rsquo;s
                productivity, safety, and morale. The key points from this section are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Planning is leadership:</strong> Good planning is the difference between a smooth-running site and chaos. It is a core supervisor responsibility, not just project management admin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Know the programme:</strong> Understand your critical dates, dependencies, lead times, and inspection points. The Gantt chart is your tool, not just the PM&rsquo;s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Plan weekly:</strong> Use a rolling look-ahead programme. Plan every Monday. Check progress daily. Adjust as conditions change.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Manage resources:</strong> Match people to tasks, order materials early, and ensure plant is booked and operators are certified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Adapt fast:</strong> Use the OODA loop when plans change. Communicate immediately. Escalate programme-affecting delays. Never bury bad news.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Keep records:</strong> Your site diary is a legal document. Record delays, causes, instructions, and communications every day.</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Planning Checklist &mdash; Use Every Monday</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Review master programme &mdash; are you on track?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Update look-ahead programme for the coming week/fortnight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Allocate team members to tasks based on skill and availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Check materials are on site or deliveries are confirmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Book plant/equipment and verify operator certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Arrange permits and coordinate with other trades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Identify risks and have contingency plans ready</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 2, we will examine how to
                  manage subcontractors and other trades &mdash; coordination, sequencing, setting
                  expectations, and building the professional relationships that make multi-trade sites
                  work smoothly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-5-section-2">
              Next: Managing Subcontractors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
