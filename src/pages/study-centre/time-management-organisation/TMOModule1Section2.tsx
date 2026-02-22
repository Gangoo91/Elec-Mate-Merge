import { ArrowLeft, Grid3X3, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'tmo-1-2-check1',
    question:
      'A supplier rings you mid-job to offer a promotional deal on cable that expires today. Using the Eisenhower Matrix, which quadrant does this belong in?',
    options: [
      'Q1 — Urgent and Important: you must act now or lose the deal',
      'Q2 — Not Urgent but Important: it could save money long-term',
      'Q3 — Urgent but Not Important: it feels urgent because of the deadline, but it is not important to your current priorities',
      'Q4 — Neither Urgent nor Important: ignore it completely',
    ],
    correctIndex: 2,
    explanation:
      'This is a classic Q3 task — Urgent but Not Important. The supplier has created artificial urgency with a "today only" deadline, which triggers a feeling that you must act immediately. However, the task is not important to your core work priorities. You are mid-job, your focus should be on the installation, and the promotional deal (even if genuine) does not require your immediate attention. The Eisenhower Matrix teaches you to delegate or decline Q3 tasks. You could ask the supplier to email the details and review them during your admin time.',
  },
  {
    id: 'tmo-1-2-check2',
    question:
      'Stephen Covey argued that highly effective people spend most of their time in which quadrant of the Eisenhower Matrix?',
    options: [
      'Q1 — Urgent and Important: constantly fighting fires and dealing with crises',
      'Q2 — Not Urgent but Important: planning, preparation, relationship building, and professional development',
      'Q3 — Urgent but Not Important: responding quickly to every request from others',
      'Q4 — Neither Urgent nor Important: taking regular breaks and avoiding stress',
    ],
    correctIndex: 1,
    explanation:
      'Covey\'s central argument in "The 7 Habits of Highly Effective People" (1989) is that Q2 is where the highest-value work happens. Q2 activities — planning, preparation, skill development, relationship building, systems improvement — are not urgent, so they are easy to postpone. But they are profoundly important because they prevent crises (reducing Q1), build capability, and create long-term results. People who live in Q1 are always reacting; people who invest in Q2 are proactively building a life and business that requires less crisis management over time.',
  },
  {
    id: 'tmo-1-2-check3',
    question:
      'An electrician spends 2 hours every evening browsing trade forums and watching YouTube installation videos. They enjoy it but it rarely leads to actionable learning. Which quadrant is this?',
    options: [
      'Q1 — Urgent and Important: staying up to date is critical',
      'Q2 — Not Urgent but Important: it is professional development',
      'Q3 — Urgent but Not Important: others are posting so you feel pressure to engage',
      'Q4 — Neither Urgent nor Important: it is entertainment disguised as learning',
    ],
    correctIndex: 3,
    explanation:
      'This is Q4 — neither urgent nor important. The key phrase is "rarely leads to actionable learning." Genuine CPD and professional development is Q2 activity: structured, intentional, and outcome-focused. Browsing forums and watching random YouTube videos for 2 hours without a specific learning goal is entertainment that feels productive. This is a subtle but important distinction: the medium (trade content) makes it feel like work, but the lack of structure and outcome makes it leisure. Recognising this distinction is essential for honest time management.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Did Eisenhower actually use this matrix?',
    answer:
      'The attribution is somewhat indirect. Dwight D. Eisenhower, the 34th President of the United States and Supreme Allied Commander during World War II, is widely quoted as saying: "What is important is seldom urgent and what is urgent is seldom important." However, there is no evidence that Eisenhower himself used a four-quadrant matrix. The matrix format was popularised by Stephen Covey in "The 7 Habits of Highly Effective People" (1989) and further developed in "First Things First" (1994, co-authored with A. Roger Merrill and Rebecca R. Merrill). Covey used Eisenhower\'s principle as the foundation and built the quadrant framework around it. So the principle is Eisenhower\'s; the matrix tool is Covey\'s.',
  },
  {
    question: 'How do I tell the difference between urgent and important?',
    answer:
      'Urgent tasks demand immediate attention — they are in your face, they press on you, they insist on action now. A ringing phone is urgent. A client standing in front of you is urgent. A deadline that expires today is urgent. Important tasks contribute to your long-term goals, values, and mission — but they rarely shout for attention. Planning your schedule for next week is important. Keeping your certifications up to date is important. Building relationships with new clients is important. The trap is that urgency feels important. When something is urgent, your brain treats it as important by default. The Eisenhower Matrix forces you to separate the two and evaluate each dimension independently.',
  },
  {
    question: 'Is it realistic to eliminate Q1 tasks entirely?',
    answer:
      'No, and that is not the goal. Genuine emergencies and crises will always occur — a dangerous electrical fault that must be addressed immediately, a client emergency, a safety issue on site. These are legitimately Q1: both urgent and important. The goal is not to eliminate Q1 but to reduce it. Many tasks that feel like Q1 crises are actually the result of poor Q2 planning. The emergency call-out to fix a failed circuit might have been prevented by a thorough inspection. The last-minute scramble for materials might have been avoided by checking the job scope the day before. Investing time in Q2 (planning, preparation, prevention) systematically reduces the number of Q1 crises you face.',
  },
  {
    question:
      'How do I apply the Eisenhower Matrix when I am employed and my tasks are set by my employer?',
    answer:
      'The matrix still applies, but your scope of control is different. You may not choose which jobs to take, but you still control how you organise your day within those constraints. Q2 activities for an employed electrician include: preparing your tools and materials the evening before, reviewing the job scope before arriving on site, maintaining your CPD and training, building good relationships with colleagues and supervisors, and organising your van so you can work efficiently. These are the activities that make you more effective, more promotable, and less stressed — even within a structured employment environment.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The Eisenhower principle states that:',
    options: [
      'Important tasks should always be done before urgent tasks',
      'What is important is seldom urgent and what is urgent is seldom important',
      'All urgent tasks are also important and should be prioritised',
      'Delegation is always better than doing a task yourself',
    ],
    correctAnswer: 1,
    explanation:
      'The Eisenhower principle — attributed to President Dwight D. Eisenhower — recognises that urgency and importance are two separate dimensions. Tasks that demand immediate action (urgent) are often not the ones that contribute most to your long-term goals (important), and vice versa. This insight is the foundation of the four-quadrant matrix: it forces you to evaluate each task on both dimensions independently.',
  },
  {
    id: 2,
    question: 'In the Eisenhower Matrix, Quadrant 2 (Q2) contains tasks that are:',
    options: [
      'Urgent and Important — crises and emergencies',
      'Not Urgent but Important — planning, preparation, and growth activities',
      "Urgent but Not Important — interruptions and other people's priorities",
      'Neither Urgent nor Important — time wasters and distractions',
    ],
    correctAnswer: 1,
    explanation:
      'Q2 is the quadrant of planning, preparation, relationship building, professional development, and strategic thinking. These activities are profoundly important but not urgent — they do not demand immediate action, so they are easy to postpone. Covey argued that Q2 is where the highest-value work happens, and that effective people deliberately schedule Q2 time rather than waiting for it to become urgent (at which point it moves to Q1).',
  },
  {
    id: 3,
    question:
      "An emergency call-out to isolate a dangerous electrical fault at a client's property belongs in which quadrant?",
    options: [
      'Q1 — Urgent and Important',
      'Q2 — Not Urgent but Important',
      'Q3 — Urgent but Not Important',
      'Q4 — Neither Urgent nor Important',
    ],
    correctAnswer: 0,
    explanation:
      'This is a genuine Q1 task — both urgent (requires immediate action for safety) and important (directly affects client safety and your professional responsibility). Q1 tasks cannot be delegated or postponed; they must be dealt with now. The goal is not to eliminate Q1 entirely but to reduce it by investing in Q2 activities (planning, maintenance, prevention) that prevent emergencies from arising.',
  },
  {
    id: 4,
    question:
      'According to Covey, most people spend the majority of their time in which quadrants?',
    options: [
      'Q1 and Q2 — dealing with important tasks',
      'Q1 and Q3 — reacting to anything that feels urgent',
      'Q2 and Q4 — balancing planning with rest',
      'Q3 and Q4 — avoiding important work entirely',
    ],
    correctAnswer: 1,
    explanation:
      "Covey observed that most people oscillate between Q1 (genuine crises) and Q3 (things that feel urgent but are not truly important). The common pattern is: deal with a crisis (Q1), then get pulled into someone else's priority or an interruption (Q3), then another crisis (Q1), and so on. Q2 gets squeezed out because it never shouts for attention. Breaking this cycle requires deliberately scheduling and protecting Q2 time.",
  },
  {
    id: 5,
    question:
      'Weekly job scheduling and route planning for the week ahead is an example of which quadrant?',
    options: [
      'Q1 — it is urgent because jobs need to be done',
      'Q2 — it is important for efficiency but not urgent today',
      'Q3 — it is urgent because clients are waiting',
      'Q4 — it is optional admin that can be skipped',
    ],
    correctAnswer: 1,
    explanation:
      'Planning the week ahead — scheduling jobs, optimising routes, pre-ordering materials — is a classic Q2 activity. It is not urgent right now (you could skip it and figure things out day-by-day), but it is highly important because it saves time, reduces stress, prevents crises, and increases efficiency. An hour of planning on Sunday evening can save several hours of reactive scrambling during the week.',
  },
  {
    id: 6,
    question:
      'A colleague texts asking you to help them move furniture this weekend. It is not related to work and you have other plans. This is:',
    options: [
      'Q1 — Urgent and Important: helping colleagues builds relationships',
      'Q2 — Not Urgent but Important: investing in your professional network',
      'Q3 — Urgent but Not Important: it may feel pressing because of social obligation, but it does not align with your priorities',
      'Q4 — Neither Urgent nor Important',
    ],
    correctAnswer: 2,
    explanation:
      'This is a Q3 task. It feels urgent because of the social pressure and the specific timing (this weekend). However, it is not important to your goals or priorities — you have other plans that take precedence. Q3 is characterised by tasks that other people consider urgent but that do not align with your own priorities. The appropriate response is to decline politely or suggest an alternative. Learning to say no to Q3 requests is one of the most important time management skills.',
  },
  {
    id: 7,
    question:
      'Why does Covey argue that investing time in Q2 reduces the amount of time spent in Q1?',
    options: [
      'Because Q2 activities are more enjoyable, so you stop worrying about crises',
      'Because Q2 activities (planning, prevention, preparation) prevent many Q1 crises from occurring in the first place',
      'Because Q1 tasks can always be delegated to someone else',
      'Because spending time in Q2 means there are fewer hours left in the day for Q1',
    ],
    correctAnswer: 1,
    explanation:
      "Covey's central argument is that Q2 activities are preventive. Planning your week in advance (Q2) prevents the last-minute scramble to find work (Q1). Maintaining your tools and van (Q2) prevents breakdowns and delays (Q1). Keeping certifications up to date (Q2) prevents the crisis of an expired qualification (Q1). Pre-ordering materials (Q2) prevents the emergency merchant trip (Q1). Every hour invested in Q2 planning and prevention eliminates multiple hours of Q1 crisis management.",
  },
  {
    id: 8,
    question: 'Moving from a "reactive" to a "proactive" working style means:',
    options: [
      'Working faster so you can respond to emergencies more quickly',
      'Shifting from responding to events as they happen (Q1/Q3) to planning ahead and preventing problems (Q2)',
      'Saying no to all client requests that were not pre-scheduled',
      'Delegating all urgent tasks to colleagues or subcontractors',
    ],
    correctAnswer: 1,
    explanation:
      'A reactive working style means spending your day responding to whatever comes at you — calls, texts, problems, requests. You are constantly in Q1 and Q3, firefighting and reacting. A proactive working style means investing time in Q2: planning your week, preparing materials in advance, building systems that prevent problems, and making deliberate decisions about where your time goes. You still respond to genuine emergencies, but you have fewer of them because your planning has prevented many of them.',
  },
];

export default function TMOModule1Section2() {
  useSEO({
    title: 'The Eisenhower Matrix | Time Management & Organisation Module 1.2',
    description:
      'Urgent vs important, the 4 quadrants, moving from reactive to proactive, and practical prioritisation for electricians and tradespeople.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-1">
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
            <Grid3X3 className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Eisenhower Matrix
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Urgent vs important, the 4 quadrants, moving from reactive to proactive, and practical
            prioritisation for tradespeople
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Urgent:</strong> Demands immediate attention &mdash; it screams
                &ldquo;now!&rdquo;
              </li>
              <li>
                <strong>Important:</strong> Contributes to long-term goals, values, and growth
              </li>
              <li>
                <strong>The matrix:</strong> 4 quadrants based on urgency and importance
              </li>
              <li>
                <strong>Key insight:</strong> Q2 (important but not urgent) is where growth happens
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Most tradespeople</strong> live in Q1 and Q3 &mdash; always reacting
              </li>
              <li>
                <strong>Q2 investment</strong> prevents crises and reduces stress over time
              </li>
              <li>
                <strong>Saying no to Q3</strong> protects your most valuable resource: time
              </li>
              <li>
                <strong>Proactive beats reactive</strong> every time for profitability and wellbeing
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the difference between urgent and important using specific examples',
              'Describe the four quadrants of the Eisenhower Matrix and their characteristics',
              'Categorise real construction tasks into the correct quadrant',
              'Explain why Q2 investment reduces Q1 crises over time',
              'Identify the difference between reactive and proactive working styles',
              'Apply the Eisenhower Matrix to your own current task list',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Eisenhower Principle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Eisenhower Principle &mdash; Urgent Is Not the Same as Important
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dwight D. Eisenhower, the 34th President of the United States and the Supreme Allied
                Commander who oversaw the D-Day invasion, was one of the most productive leaders in
                modern history. He ran a global military campaign, served two terms as President,
                and somehow managed both without being consumed by the chaos around him. His secret,
                as he described it, was a simple but powerful distinction:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;What is important is seldom urgent and what is urgent is seldom
                    important.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Attributed to Dwight D. Eisenhower
                </p>
              </div>

              <p>
                This single observation cuts to the heart of why so many tradespeople feel busy all
                day but never seem to get ahead. The problem is not a lack of effort &mdash; it is a
                confusion between urgency and importance. <strong>Urgent</strong> tasks demand
                immediate attention. They are loud, insistent, and in your face. A ringing phone is
                urgent. A text from a client asking &ldquo;Where are you?&rdquo; is urgent. A
                supplier saying a deal expires today is urgent. <strong>Important</strong> tasks
                contribute to your long-term goals, values, and mission. Planning your schedule for
                the week is important. Keeping your certifications current is important. Building
                relationships with reliable clients is important.
              </p>

              <p>
                The critical insight is that these two qualities are independent. A task can be
                urgent without being important (a sales call from a supplier), important without
                being urgent (updating your CPD record), both (an emergency call-out for a dangerous
                fault), or neither (scrolling Instagram). Most people, however, treat urgency as a
                proxy for importance. If it feels urgent, they assume it must be important &mdash;
                and they drop everything to deal with it. This is how entire days get consumed by
                other people&rsquo;s priorities while your own important work never gets done.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Four Quadrants */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Four Quadrants &mdash; Covey&rsquo;s Framework
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Stephen Covey</strong> took Eisenhower&rsquo;s principle and built it into a
                practical tool in his landmark book <em>The 7 Habits of Highly Effective People</em>{' '}
                (1989), later expanded in <em>First Things First</em> (1994). Covey created a
                2&times;2 matrix with urgency on one axis and importance on the other, producing
                four quadrants that categorise every possible task or demand on your time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">The Four Quadrants</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">
                      Q1: Urgent + Important
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Action:</strong> Do it now
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Emergency call-out for a dangerous fault</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Client deadline that must be met today</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Safety incident on site requiring immediate action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Equipment failure that stops a job mid-progress</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">
                      Q2: Not Urgent + Important
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Action:</strong> Schedule it
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Weekly job scheduling and route planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>CPD and professional development training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Building client relationships and seeking referrals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Maintaining tools, van organisation, and stock levels</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                    <p className="text-amber-400 font-semibold text-sm mb-2">
                      Q3: Urgent + Not Important
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Action:</strong> Delegate or decline
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Supplier calling to upsell a product</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Non-essential WhatsApp messages mid-job</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Colleague asking a non-urgent question that interrupts your work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          A client changing a minor detail that could wait until the end of the job
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-semibold text-sm mb-2">
                      Q4: Not Urgent + Not Important
                    </p>
                    <p className="text-sm text-white mb-2">
                      <strong>Action:</strong> Eliminate
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Scrolling social media during working hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Browsing trade forums without a specific purpose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Watching random YouTube videos between jobs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Extended tea breaks beyond what is needed for rest</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Q2 — Where Growth Happens */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Quadrant 2 &mdash; Where Growth Happens
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Covey&rsquo;s most important insight is that{' '}
                <strong>Q2 is the quadrant of effectiveness</strong>. It contains the activities
                that have the highest long-term value but the lowest urgency. Planning. Preparation.
                Prevention. Professional development. Relationship building. Systems improvement.
                None of these activities will ever ring your phone or send you a text message
                demanding attention. They sit quietly, waiting to be chosen. And because they never
                shout, they are the first things to be squeezed out when the day gets busy.
              </p>

              <p>
                The paradox is that Q2 is also the quadrant that <strong>reduces Q1</strong>. Every
                hour you invest in planning (Q2) prevents crises (Q1). Every hour spent maintaining
                your tools and van (Q2) prevents breakdowns and delays (Q1). Every hour invested in
                training and skill development (Q2) means fewer mistakes and callbacks (Q1). This
                creates a virtuous cycle: the more time you spend in Q2, the less time you need to
                spend in Q1.
              </p>

              <p>
                Conversely, people who neglect Q2 find themselves trapped in an escalating cycle of
                Q1 crises. They do not plan, so they constantly scramble. They do not maintain, so
                things break. They do not prepare, so they make mistakes. They do not develop, so
                they fall behind. The result is a working life that feels permanently out of control
                &mdash; always firefighting, always reacting, always one step behind. This is the
                reactive trap, and breaking free from it requires a deliberate, scheduled commitment
                to Q2 activities.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Q2 Activities for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sunday evening planning:</strong> Review next week&rsquo;s jobs, plan
                      routes, pre-order materials, identify any access or scope questions to resolve
                      before arriving on site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly tool and van audit:</strong> Check calibration dates on test
                      equipment, restock common fittings, ensure the van is organised for efficient
                      access.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Quarterly CPD review:</strong> Identify skills gaps, book training,
                      review regulation updates (such as BS 7671 amendments), and plan career
                      development.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Client relationship management:</strong> Follow up with past clients,
                      request reviews, ask for referrals &mdash; activities that build the pipeline
                      of future work.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Reactive vs Proactive */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Reactive vs Proactive &mdash; Two Ways of Working
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Eisenhower Matrix reveals two fundamentally different approaches to work.{' '}
                <strong>Reactive</strong> workers spend their days responding to whatever comes at
                them. The phone rings and they answer. A text arrives and they reply. A problem
                emerges and they scramble. They live in Q1 and Q3, bouncing between crises and
                interruptions. At the end of the day, they are exhausted but cannot identify what
                they actually accomplished &mdash; they were busy reacting to other people&rsquo;s
                agendas.
              </p>

              <p>
                <strong>Proactive</strong> workers make deliberate decisions about where their time
                goes. They plan their week in advance (Q2). They batch similar tasks together for
                efficiency. They set boundaries &mdash; specific times for answering calls and
                messages, rather than responding instantly to every notification. They say no to Q3
                requests that do not align with their priorities. They still handle genuine
                emergencies (Q1), but because their Q2 planning has prevented many potential crises,
                there are fewer emergencies to deal with.
              </p>

              <p>
                Most tradespeople start their careers in reactive mode because the work structure
                encourages it. You are given tasks, you respond to call-outs, you react to what the
                day brings. The shift to proactive working usually happens when a tradesperson
                starts running their own business or takes on a leadership role &mdash; and suddenly
                discovers that reacting to everything is unsustainable. The Eisenhower Matrix
                provides the framework for making that shift consciously and deliberately, rather
                than waiting for burnout to force it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reactive vs Proactive: A Typical Monday
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Reactive Monday</p>
                    <p className="text-sm text-white">
                      Wakes up, checks phone, sees 6 messages. Responds to all of them. Drives to
                      first job without checking materials &mdash; arrives and realises the consumer
                      unit is the wrong type. Drives to merchant (45 mins). Gets a call mid-job from
                      another client wanting an emergency &mdash; agrees to squeeze it in. Finishes
                      late, stressed, and still has admin to do. The week has barely started and
                      already feels out of control.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Proactive Monday</p>
                    <p className="text-sm text-white">
                      Planned the week on Sunday evening. Materials checked and loaded. Route
                      optimised. First job starts on time with everything needed. Phone on silent
                      during installation &mdash; checks messages at break time. Returns calls in a
                      batched 15-minute slot. Emergency request from client assessed calmly: not a
                      genuine emergency, scheduled for Thursday. Finishes on time, admin done by
                      5pm. Controlled and efficient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Practical Application &mdash; Categorising Your Task List
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Eisenhower Matrix is only useful if you actually apply it to your own work. The
                exercise is straightforward: take your current task list (or everything on your mind
                that needs doing) and assign each item to a quadrant. Be honest &mdash; the value of
                this exercise comes from accurate categorisation, not from making everything look
                important.
              </p>

              <p>
                Most people discover two things when they first do this exercise. First, they have
                far more Q3 and Q4 items than they expected. Tasks they thought were important turn
                out to be merely urgent (or not even that). Second, their Q2 list &mdash; the
                activities that would make the biggest long-term difference &mdash; has been
                chronically neglected. The CPD they have been meaning to do, the van reorganisation
                they keep postponing, the client follow-up emails they never send. These are the
                items with the highest return on time investment, and they are the ones getting
                none.
              </p>

              <p>
                The practical rule is simple. Once you have categorised everything, take action in
                this order: <strong>Do</strong> Q1 items immediately (genuine crises cannot wait).{' '}
                <strong>Schedule</strong> Q2 items into your calendar with a specific time and date
                &mdash; if it is not in the calendar, it will not happen.{' '}
                <strong>Delegate or decline</strong> Q3 items &mdash; if someone else can handle it,
                let them; if no one can, batch it into a low-priority time slot.{' '}
                <strong>Eliminate</strong> Q4 items &mdash; stop doing them, or at least stop doing
                them during working hours.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Examples by Quadrant
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-400">Q1:</strong> RCD has tripped and the client
                      has no power to the kitchen — needs fixing today. A Part P notification
                      deadline expires tomorrow. Your test instrument calibration has expired and
                      you have an EICR booked.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">Q2:</strong> Planning next week&rsquo;s
                      schedule. Renewing your ECS card. Reading up on the latest BS 7671 amendment.
                      Building a relationship with a letting agent who could provide regular work.
                      Organising your van for faster access.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Q3:</strong> A supplier calling to offer a
                      limited deal. A mate asking you to quote a job you do not really want. A
                      non-urgent WhatsApp message from a client about paint colours for the room you
                      are wiring.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                    <span>
                      <strong>Q4:</strong> Scrolling Instagram between jobs. Watching a 20-minute
                      YouTube argument about cable sizes. Reading forum threads about topics you
                      will never encounter. Extended van-seat napping on a quiet afternoon.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Eisenhower Matrix provides a clear, actionable framework for deciding where your
                time should go. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Urgent and important are different dimensions.</strong> A task can be
                    one, both, or neither. Treating urgency as a proxy for importance leads to a
                    reactive, exhausting working style.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Q2 is the quadrant of effectiveness.</strong> Planning, preparation,
                    prevention, and development activities have the highest long-term value but the
                    lowest urgency. They must be deliberately scheduled.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Q2 reduces Q1.</strong> Investing time in planning and prevention
                    systematically reduces the number of crises and emergencies you face.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Q3 is the deception quadrant.</strong> Tasks that feel urgent but are
                    not truly important steal time from what matters. Learning to delegate or
                    decline Q3 requests is essential.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Proactive beats reactive.</strong> Shifting from reacting to everything
                    to planning deliberately is the single biggest change you can make to your
                    working life.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore the
                  common time traps that specifically affect construction workers and tradespeople
                  &mdash; from saying yes to everything, to perfectionism on low-value tasks, to the
                  WhatsApp trap that fragments your focus throughout the day.
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-1-section-3">
              Next: Common Time Traps in Construction
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
