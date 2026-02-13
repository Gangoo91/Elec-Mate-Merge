import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Target, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lead-vs-manage-kotter",
    question: "According to John Kotter, leadership is primarily about coping with which of the following?",
    options: [
      "Complexity — planning, budgeting, organising, and controlling",
      "Change — setting direction, aligning people, motivating, and inspiring",
      "Efficiency — reducing costs, streamlining processes, and eliminating waste",
      "Compliance — enforcing rules, policies, and procedures on site"
    ],
    correctIndex: 1,
    explanation: "John Kotter's influential framework distinguishes leadership from management by stating that management is about coping with complexity (through planning, budgeting, organising, staffing, controlling, and problem-solving), while leadership is about coping with change (through setting direction, aligning people, motivating, and inspiring). Both are essential but fundamentally different."
  },
  {
    id: "lead-vs-manage-bennis",
    question: "Warren Bennis famously stated: 'Managers do things right; leaders do the right thing.' What does this distinction mean in a construction context?",
    options: [
      "Managers should ignore rules if the leader tells them to",
      "Leaders never need to follow procedures because they set the vision",
      "Managers focus on executing tasks correctly; leaders focus on choosing the right direction and priorities",
      "Leaders are always more valuable than managers on a building site"
    ],
    correctIndex: 2,
    explanation: "Bennis's quote highlights a key difference: managers focus on efficiency and executing tasks correctly (doing things right — following procedures, meeting specifications, staying on budget), while leaders focus on effectiveness and ensuring the team is pursuing the right goals (doing the right thing — setting direction, making strategic decisions, challenging the status quo when needed). Both are essential on a construction site."
  },
  {
    id: "lead-vs-manage-site",
    question: "On a construction site, which scenario best illustrates the need for LEADERSHIP rather than management?",
    options: [
      "Ordering materials to arrive on time for the next phase of works",
      "Scheduling subcontractors to avoid clashes in the programme",
      "Rallying a demotivated team after a project setback to refocus on the goal",
      "Checking that installation work meets BS 7671 wiring regulations"
    ],
    correctIndex: 2,
    explanation: "Rallying a demotivated team after a setback requires leadership — it involves inspiring people, communicating a vision, and motivating them to push through difficulty. The other options (ordering materials, scheduling subcontractors, checking compliance) are management activities — they involve planning, organising, controlling, and ensuring tasks are done correctly."
  }
];

const faqs = [
  {
    question: "Can one person be both a leader and a manager?",
    answer: "Absolutely — and in construction, this is the ideal. The best site supervisors, foremen, and project managers blend both skill sets. They can plan a programme, control a budget, and organise resources (management) while also inspiring their team, setting a positive direction, and motivating people through challenges (leadership). The key is recognising which skill set is needed in any given moment. When materials need ordering and schedules need updating, you need your management hat. When the team is struggling and morale is low, you need your leadership hat."
  },
  {
    question: "Is leadership only for people in senior positions?",
    answer: "No. One of the most important insights from modern leadership research is that leadership is not tied to a job title or position in the hierarchy. An apprentice can show leadership by flagging a safety concern that everyone else has been ignoring. A second-year electrician can show leadership by helping a struggling colleague learn a new skill. Leadership is about influence, initiative, and setting a positive example — and anyone at any level can do this. In construction, some of the most effective leaders are people who have no formal authority but command respect through their actions."
  },
  {
    question: "Why do some great electricians struggle when they become supervisors?",
    answer: "Because the skills that make someone an excellent electrician (technical knowledge, hands-on ability, speed, precision) are fundamentally different from the skills needed to lead and manage a team. This transition — from doing the work yourself to getting the best out of others — is one of the hardest in any career. Many new supervisors try to keep doing the technical work they love while also managing the team, and end up doing neither well. The key is recognising that your role has changed: your job is no longer to be the best electrician on site — it is to create the conditions for your team to do their best work."
  },
  {
    question: "Which is more important on a construction site — leadership or management?",
    answer: "Neither is more important — both are essential, and the consequences of lacking either are severe. A site that is well-managed but poorly led will have detailed programmes, controlled budgets, and compliant installations — but the team will be demotivated, initiative will be absent, good people will leave, and the workplace culture will be poor. A site that is well-led but poorly managed will have an inspired, motivated team — but jobs will run over budget, materials will be missing, programmes will slip, and quality may suffer. The goal is always to develop both capabilities."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "John C. Maxwell defined leadership as:",
    options: [
      "The ability to control people and ensure compliance with rules",
      "Knowing the way, going the way, and showing the way",
      "Having the highest position of authority on a project",
      "Being the most technically skilled person on the team"
    ],
    correctAnswer: 1,
    explanation: "John C. Maxwell's widely quoted definition states: 'A leader is one who knows the way, goes the way, and shows the way.' This emphasises that leadership is about vision (knowing), personal example (going), and guiding others (showing) — not about titles, authority, or technical skill alone."
  },
  {
    id: 2,
    question: "Henry Fayol identified five core functions of management. Which of the following is NOT one of them?",
    options: [
      "Planning",
      "Organising",
      "Inspiring",
      "Controlling"
    ],
    correctAnswer: 2,
    explanation: "Henry Fayol's five functions of management are: planning, organising, commanding (directing), coordinating, and controlling. 'Inspiring' is not one of Fayol's management functions — it is more closely associated with leadership. This distinction highlights how management focuses on systems and processes, while leadership focuses on people and motivation."
  },
  {
    id: 3,
    question: "According to John Kotter's framework, which pair of activities represents MANAGEMENT rather than leadership?",
    options: [
      "Setting direction and aligning people",
      "Planning and budgeting, organising and staffing",
      "Motivating and inspiring the workforce",
      "Challenging the status quo and creating a vision for change"
    ],
    correctAnswer: 1,
    explanation: "Kotter's framework states that management is about coping with complexity through planning and budgeting, organising and staffing, controlling and problem-solving. Leadership is about coping with change through setting direction, aligning people, and motivating and inspiring. Both are needed, but they are distinct functions."
  },
  {
    id: 4,
    question: "Warren Bennis stated: 'Managers do things right; leaders do the right thing.' In a construction context, which scenario best illustrates 'doing the right thing'?",
    options: [
      "Following the method statement exactly as written for a cable installation",
      "Stopping work to address a safety concern even though it will delay the programme",
      "Completing the daily site diary with accurate records of progress",
      "Ordering materials in line with the approved bill of quantities"
    ],
    correctAnswer: 1,
    explanation: "Stopping work to address a safety concern — even when it causes a programme delay — is an example of 'doing the right thing' (leadership). It requires judgement, courage, and prioritising the right outcome over procedural efficiency. The other options are examples of 'doing things right' (management) — following procedures correctly, maintaining records, and executing tasks as planned."
  },
  {
    id: 5,
    question: "A construction site is well-managed but poorly led. Which of the following is MOST likely to be true?",
    options: [
      "The programme is behind schedule and the budget is overspent",
      "Tasks are completed to specification but team morale is low and staff turnover is high",
      "The team is highly motivated but materials are frequently missing",
      "Safety incidents are common because nobody follows procedures"
    ],
    correctAnswer: 1,
    explanation: "A well-managed but poorly led site will have good systems, controlled budgets, and compliant work — but without leadership, the team will be demotivated, there will be no sense of purpose or direction, people will not feel valued, initiative will be absent, and good workers will leave. Management keeps things running; leadership gives people a reason to care."
  },
  {
    id: 6,
    question: "Which of the following best describes the relationship between leadership and management?",
    options: [
      "Leadership is superior to management and should replace it",
      "Management is more practical than leadership, making leadership unnecessary on site",
      "They are complementary — both are needed, and the best supervisors blend both",
      "Leadership applies to senior roles; management applies to junior roles"
    ],
    correctAnswer: 2,
    explanation: "Leadership and management are complementary, not competing. Construction sites need both: management to handle complexity (planning, budgeting, organising, controlling) and leadership to handle change and people (setting direction, motivating, inspiring). The most effective site supervisors develop strength in both areas and know when to apply each."
  },
  {
    id: 7,
    question: "A new site supervisor was promoted because they were the best electrician on the team. They are now struggling because:",
    options: [
      "They are not intelligent enough to be a supervisor",
      "The technical skills that made them excellent at their trade are different from the leadership and management skills needed to run a team",
      "They should have refused the promotion and stayed as an electrician",
      "Only people with formal management qualifications can be effective supervisors"
    ],
    correctAnswer: 1,
    explanation: "This is one of the most common transitions in construction. Technical excellence does not automatically translate into leadership or management capability. The skills needed to install a complex electrical system (technical knowledge, precision, speed) are fundamentally different from the skills needed to lead a team (communication, motivation, delegation, conflict resolution). The good news is that leadership and management skills can be learned and developed."
  },
  {
    id: 8,
    question: "Which statement about leadership in construction is MOST accurate?",
    options: [
      "Leadership only matters for people with the word 'manager' in their job title",
      "Leadership is a natural talent — you either have it or you do not",
      "Anyone at any level can demonstrate leadership through influence, initiative, and example",
      "Leadership is only needed during crises; day-to-day work only requires management"
    ],
    correctAnswer: 2,
    explanation: "Leadership is not tied to a job title, a natural-born trait, or limited to crisis situations. Anyone at any level — from apprentice to project director — can demonstrate leadership by taking initiative, influencing others positively, flagging concerns, helping colleagues, and setting a good example. Modern leadership research consistently shows that leadership is a set of behaviours and skills that can be learned and developed by anyone."
  }
];

export default function LeadershipModule1Section1() {
  useSEO({
    title: "Leadership vs Management — What's the Difference? | Leadership Module 1.1",
    description: "Understand the fundamental differences between leadership and management in a construction context, using frameworks from Kotter, Bennis, and Maxwell.",
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
            <Link to="../leadership-module-1">
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
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Leadership vs Management &mdash; What&rsquo;s the Difference?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why the distinction matters, how the best site supervisors blend both, and where you fit on the spectrum
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Leadership:</strong> Setting direction, inspiring people, driving change</li>
              <li><strong>Management:</strong> Planning, organising, controlling, problem-solving</li>
              <li><strong>Key insight:</strong> Construction sites need BOTH to succeed</li>
              <li><strong>Your goal:</strong> Develop strength in both skill sets</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On a Construction Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Leadership:</strong> Rallying the team after a setback</li>
              <li><strong>Management:</strong> Keeping the programme on track</li>
              <li><strong>Both:</strong> Running a safe, productive, and motivated site</li>
              <li><strong>Reality:</strong> Every supervisor needs both capabilities</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Define leadership and management in a construction context",
              "Explain John Kotter's distinction between leadership and management",
              "Apply Warren Bennis's insight to real site scenarios",
              "Describe why a construction site needs both leadership and management",
              "Identify whether you naturally lean towards leadership or management",
              "Recognise that both skill sets can be learned and developed"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Leadership? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Is Leadership?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Leadership is not a job title. It is not something that is automatically conferred when
                you are promoted to supervisor, foreman, or site manager. Leadership is the ability to
                <strong> influence, guide, and inspire others</strong> towards a shared goal. It is about
                people, direction, and purpose.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">John C. Maxwell&rsquo;s Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;A leader is one who knows the way, goes the way, and shows the way.&rdquo;</strong>
                </p>
                <p className="text-sm text-white/80 mt-2">
                  This captures the three essential elements of leadership: <strong className="text-white">vision</strong> (knowing
                  the way), <strong className="text-white">personal example</strong> (going the way), and
                  <strong className="text-white"> guidance</strong> (showing the way).
                </p>
              </div>

              <p>
                On a construction site, leadership looks like the supervisor who takes five minutes at the
                start of the day to explain <em>why</em> the work matters, not just <em>what</em> needs to
                be done. It looks like the foreman who notices a team member struggling and steps in to
                help — not to do the job for them, but to build their confidence and competence. It looks
                like the project manager who, after a major setback, rallies the team around a new plan
                instead of assigning blame.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Characteristics of Leadership</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Vision</strong> &mdash; seeing where things need to go, even when the path is unclear. On site, this means understanding the bigger picture beyond today&rsquo;s task list.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Influence</strong> &mdash; the ability to affect the behaviour, attitudes, and actions of others without relying solely on authority. Real influence comes from trust and respect, not from your position on the organisational chart.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Motivation</strong> &mdash; helping people find their own reasons to do excellent work. A leader does not just tell people what to do — they help people want to do it well.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Courage</strong> &mdash; making difficult decisions, having hard conversations, and standing by your principles even when it is uncomfortable. On a construction site, this includes stopping unsafe work, addressing poor performance, and challenging the status quo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Empathy</strong> &mdash; understanding the perspectives, concerns, and needs of the people you work with. This is not about being soft — it is about being aware.</span>
                  </li>
                </ul>
              </div>

              <p>
                A critical point is that <strong>leadership can come from anyone at any level</strong>. An
                apprentice who speaks up about a safety concern is demonstrating leadership. A second-year
                electrician who mentors a struggling colleague is showing leadership. You do not need a title
                or a position of authority to lead — you need the willingness to step forward, set an
                example, and positively influence the people around you.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: What Is Management? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            What Is Management?
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Management is the process of <strong>planning, organising, directing, coordinating, and
                controlling</strong> resources to achieve specific objectives. Where leadership is about
                people and direction, management is about systems, processes, and execution. It is the
                engine that turns plans into reality.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Henry Fayol&rsquo;s Five Functions of Management</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  French industrialist Henri Fayol (1841&ndash;1925) identified five core functions that
                  define the work of management. These remain the foundation of management theory today:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Planning</p>
                    <p>Looking ahead, anticipating what needs to happen, and creating a roadmap. On site: creating the programme, scheduling deliveries, planning resource allocation, anticipating risks.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Organising</p>
                    <p>Arranging resources (people, materials, equipment) so that the plan can be executed. On site: allocating teams to tasks, ensuring materials are on hand, booking plant and access equipment.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Commanding (Directing)</p>
                    <p>Giving clear instructions and direction so that people know what to do. On site: issuing task briefings, giving clear work instructions, ensuring everyone understands their role for the day.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Coordinating</p>
                    <p>Ensuring that all the different parts of the operation work together harmoniously. On site: coordinating with other trades, sequencing work to avoid clashes, managing interfaces between systems.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg col-span-1 sm:col-span-2">
                    <p className="text-white font-medium mb-1">5. Controlling</p>
                    <p>Monitoring progress, comparing it to the plan, and taking corrective action when things deviate. On site: tracking programme progress, monitoring budget spend, checking quality of installations against specifications, reviewing safety compliance. Controlling is the feedback loop that keeps the project on track.</p>
                  </div>
                </div>
              </div>

              <p>
                Without management, even the most inspired and motivated team will fail. Materials will not
                arrive on time. Tasks will clash. Budgets will be overspent. Quality will be inconsistent.
                Programmes will slip. Management provides the <strong>structure, discipline, and control</strong> that
                turns good intentions into completed projects.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Misconception</p>
                </div>
                <p className="text-sm text-white/80">
                  Management is sometimes seen as less glamorous or less important than leadership. This is
                  wrong. On a construction site, poor management kills projects. A brilliant visionary leader
                  who cannot plan a programme, control a budget, or organise materials will deliver nothing.
                  <strong className="text-white"> Management is not bureaucracy &mdash; it is the discipline
                  that makes delivery possible.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Key Differences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Key Differences
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Harvard Business School professor <strong>John Kotter</strong> produced one of the most
                influential frameworks for understanding the difference between leadership and management.
                His core insight is simple but powerful: <strong>management is about coping with complexity;
                leadership is about coping with change.</strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Kotter&rsquo;s Framework &mdash; Management vs Leadership</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-3">Management: Coping with Complexity</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">Planning &amp; Budgeting</strong> &mdash; setting targets, establishing detailed steps, allocating resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">Organising &amp; Staffing</strong> &mdash; creating structures, assigning roles, establishing rules and procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span><strong className="text-white">Controlling &amp; Problem-Solving</strong> &mdash; monitoring results, identifying deviations, implementing corrections</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-blue-400 font-semibold text-sm mb-3">Leadership: Coping with Change</p>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong className="text-white">Setting Direction</strong> &mdash; developing a vision for the future, creating strategies for producing the changes needed to achieve that vision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong className="text-white">Aligning People</strong> &mdash; communicating the direction to those whose cooperation is needed, building coalitions of support and shared understanding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong className="text-white">Motivating &amp; Inspiring</strong> &mdash; keeping people moving in the right direction despite obstacles, by appealing to basic needs, values, and emotions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Warren Bennis&rsquo;s Distinction</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Managers do things right; leaders do the right thing.&rdquo;</strong>
                </p>
                <p className="text-sm text-white/80 mt-2">
                  This elegantly captures the difference between <strong className="text-white">efficiency</strong> (doing
                  things right &mdash; executing tasks correctly, following procedures, staying within parameters) and
                  <strong className="text-white"> effectiveness</strong> (doing the right thing &mdash; choosing the right direction,
                  making the right strategic decisions, prioritising what truly matters).
                </p>
              </div>

              <p>
                Kotter emphasised that both are needed. An organisation that is over-managed but under-led
                will have excellent systems and processes but will stagnate, fail to adapt to change, and
                lose its best people. An organisation that is over-led but under-managed will have a
                compelling vision but will be chaotic, undisciplined, and unable to deliver consistently.
                The challenge is to develop <strong>both capabilities and know when to apply each</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Additional Distinctions</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white/5 p-2 rounded text-white text-center font-medium">Management</div>
                  <div className="bg-white/5 p-2 rounded text-white text-center font-medium">Leadership</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Focuses on systems</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Focuses on people</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Relies on control</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Relies on trust</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Asks &ldquo;how?&rdquo; and &ldquo;when?&rdquo;</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Asks &ldquo;why?&rdquo; and &ldquo;what if?&rdquo;</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Maintains the status quo</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Challenges the status quo</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Short-term focus</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Long-term focus</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Administers</div>
                  <div className="bg-white/5 p-2 rounded text-white/80">Innovates</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Why Both Matter on a Construction Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Why Both Matter on a Construction Site
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is one of the industries where the need for <strong>both leadership and
                management</strong> is most acute. Sites are complex, dynamic, and high-risk environments
                where the consequences of deficiency in either area are immediate and visible.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Well-Managed but Poorly Led</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Tasks completed to specification and on programme</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Budget is controlled, materials arrive on time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>BUT: Team is demotivated, no one shows initiative</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Good people leave, culture is toxic or flat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Problems are hidden rather than reported</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                    <p className="text-amber-400 font-semibold text-sm mb-2">Well-Led but Poorly Managed</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Team is inspired, morale is high, people care</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>People feel valued and want to do good work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>BUT: Jobs run over budget, programme slips</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Materials are missing, logistics are chaotic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Quality is inconsistent, documentation is poor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The best site supervisors, foremen, and project managers understand that they need
                <strong> both skill sets working together</strong>. They can switch between leadership and
                management mode depending on what the situation demands. During a Monday morning toolbox
                talk, they are leading &mdash; setting the tone, communicating the vision for the week,
                motivating the team. During the afternoon, they are managing &mdash; checking progress
                against the programme, ordering materials for next week, reviewing quality.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Construction Reality</p>
                </div>
                <p className="text-sm text-white/80">
                  Construction is a people business delivered through systems. You need leadership to get
                  the best out of people &mdash; to build trust, to motivate through difficulty, to develop
                  talent, to create a culture where people want to do their best work. And you need management
                  to get the best out of systems &mdash; to plan effectively, to control costs, to coordinate
                  trades, to ensure quality. <strong className="text-white">Neither alone is enough. Together,
                  they are unstoppable.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Where Do You Fit? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Where Do You Fit?
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everyone has a natural tendency towards either leadership or management. Neither is
                better or worse &mdash; construction needs people at every point on the spectrum. The
                important thing is to <strong>understand where you naturally sit</strong> so that you
                can build on your strengths and develop the areas where you are weaker.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reflection Questions</p>
                <p className="text-sm text-white/80 mb-3">
                  Consider the following questions honestly. There are no right or wrong answers &mdash;
                  they are designed to help you understand your natural tendencies.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">When something goes wrong on site,</strong> is your first instinct to fix the system that allowed it to happen (management) or to rally the team and keep morale up (leadership)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Do you prefer</strong> creating detailed plans and checklists (management) or painting a picture of what success looks like and getting people excited about it (leadership)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">When a new team member joins,</strong> do you focus on explaining procedures and standards (management) or on making them feel welcome and helping them understand the team culture (leadership)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">When you think about your best day at work,</strong> does it involve ticking off every item on a perfectly planned list (management) or having a breakthrough moment with your team where everyone was pulling together (leadership)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Are you more comfortable</strong> dealing with numbers, data, and processes (management) or dealing with people, emotions, and relationships (leadership)?</span>
                  </li>
                </ul>
              </div>

              <p>
                If you found yourself leaning heavily towards one side, that is perfectly normal. Most
                people do. The goal is not to become equally strong in both &mdash; that is rare. The
                goal is to <strong>develop enough capability in your weaker area</strong> that you can
                function effectively, while continuing to leverage your natural strengths. A naturally
                strong leader might need to develop better planning and organisational habits. A natural
                manager might need to work on their communication and motivational skills.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key insight:</strong> The best leaders in construction
                  are not born &mdash; they are made. Both leadership and management are <strong>learnable
                  skills</strong>. Research consistently shows that with deliberate practice, self-awareness,
                  and feedback, anyone can develop their capability in both areas. That is exactly what this
                  course is designed to help you do.
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
                This section has established the foundational understanding of what leadership and
                management are, how they differ, and why construction sites need both. The key points
                to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Leadership</strong> is about influence, direction, and inspiring people. It is not tied to a title or position &mdash; anyone can lead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Management</strong> is about planning, organising, controlling, and problem-solving. It provides the structure that turns plans into reality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Kotter&rsquo;s framework:</strong> Management copes with complexity; leadership copes with change. Both are essential.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Bennis&rsquo;s insight:</strong> Managers do things right; leaders do the right thing. Efficiency vs effectiveness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Construction needs both:</strong> A well-managed but poorly led site loses people. A well-led but poorly managed site loses projects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Both are learnable:</strong> With self-awareness, practice, and feedback, anyone can develop strength in both areas.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore different
                  leadership styles &mdash; from Daniel Goleman&rsquo;s six styles to situational leadership.
                  You will learn how to adapt your approach depending on the situation, the team, and the
                  challenge you are facing.
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
            <Link to="../leadership-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-1-section-2">
              Next: Leadership Styles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
