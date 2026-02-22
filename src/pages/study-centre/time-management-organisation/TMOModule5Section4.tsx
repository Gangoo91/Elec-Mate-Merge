import { ArrowLeft, ClipboardCheck, CheckCircle } from 'lucide-react';
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
    id: 'tmo-5-4-smart',
    question:
      'An electrician writes the following action plan commitment: "I will be more organised." According to the SMART framework, what is wrong with this goal?',
    options: [
      'Nothing — it is a clear and motivating goal',
      'It lacks specificity, measurability, and a time frame — it is an aspiration, not an actionable commitment',
      'It is too specific — goals should be kept vague to allow flexibility',
      'It should be written as a question rather than a statement',
    ],
    correctIndex: 1,
    explanation:
      '"I will be more organised" fails three of the five SMART criteria. It is not Specific (organised in what way? which area of your work?), not Measurable (how will you know when you are "more organised"?), and not Time-bound (by when?). A SMART version might be: "I will implement a 10-minute end-of-day planning routine every working day for the next 8 weeks, starting Monday." This is specific (end-of-day planning), measurable (did you do it or not?), achievable (10 minutes), relevant (directly improves organisation), and time-bound (8 weeks).',
  },
  {
    id: 'tmo-5-4-nonneg',
    question: 'Why should your "non-negotiable routines" be limited to 3 habits rather than 10?',
    options: [
      'Because 3 is a lucky number in productivity research',
      'Because implementing too many habits simultaneously overwhelms the behaviour-change system — willpower is finite and habit formation requires sustained repetition over weeks',
      'Because tradespeople do not have time for more than 3 habits',
      'Because the number 3 is easier to remember',
    ],
    correctIndex: 1,
    explanation:
      'Behaviour change research consistently shows that attempting to change too many habits simultaneously leads to failure across all of them. Each new habit requires conscious effort and willpower during the formation period (approximately 66 days on average). Attempting 10 new habits means 10 competing demands on a limited willpower budget. Starting with 3 non-negotiables allows you to focus your behaviour-change resources, establish those habits to automaticity, and then add more. This is James Clear\'s "master the habit of showing up" principle: get the small number right first, then expand.',
  },
  {
    id: 'tmo-5-4-review',
    question: 'A monthly 10-minute productivity self-check is recommended because:',
    options: [
      'It satisfies CPD requirements for electrical registration',
      'Without regular review, habits drift, routines erode, and you gradually revert to old patterns without noticing',
      'Monthly reviews are required by law for self-employed tradespeople',
      'It replaces the need for daily and weekly routines',
    ],
    correctIndex: 1,
    explanation:
      'Habits and routines are not permanent once established — they require maintenance. Without periodic review, small deviations accumulate: the morning routine gets skipped occasionally, the Friday invoicing block gets pushed to next week, the end-of-day plan gets abandoned when you are tired. A monthly 10-minute self-check catches these drifts early and course-corrects before the erosion becomes significant. The review asks simple questions: "Am I still doing my 3 non-negotiables? What slipped this month? What worked well? What needs adjusting?"',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I create an action plan when I do not know where to start?',
    answer:
      'Start with the time audit from Module 1. If you have completed a 3-day time audit, you already have the data you need: you know where your time goes, where the biggest waste is, and which habits are costing you the most hours. Your action plan should target the top 2 or 3 areas of waste identified in the audit. If you have not done a time audit yet, that is your first action item — nothing else in the plan will be as effective without the data to guide it. Once you have the audit, the action plan writes itself: the biggest time sink becomes your first target.',
  },
  {
    question: 'What if my action plan is not working after a month?',
    answer:
      'If specific commitments are not sticking after 4 weeks, the issue is almost certainly one of three things: (1) the habit is too big — scale it down to a 2-minute version and rebuild from there; (2) the cue is unreliable — change the trigger to something more consistent; or (3) the environment is working against you — redesign the context to make the habit easier. Do not abandon the plan; adjust it. The monthly review is specifically designed to catch and correct these issues. Behaviour change is iterative: the first version of any plan is a hypothesis, not a guarantee. Refine based on what you learn.',
  },
  {
    question: 'Should I share my action plan with anyone?',
    answer:
      'Yes, and research on accountability strongly supports this. Sharing your commitments with a trusted colleague, partner, or friend creates social pressure to follow through. The American Society of Training and Development found that people who made a specific commitment to someone had a 65% probability of completing a goal, compared to 10% for those who merely had an idea. If you also scheduled regular check-ins with that accountability partner, the probability rose to 95%. You do not need a formal coach — simply telling your partner "I am doing my invoicing every Friday at 4pm" creates meaningful accountability.',
  },
  {
    question: 'How often should I update my action plan?',
    answer:
      'The recommended cadence is: monthly mini-review (10 minutes — are the habits sticking? what needs adjusting?), quarterly deep review (30 minutes — are the original goals still relevant? are there new areas to address? should any habits be retired or replaced?), and annual reset (60 minutes — reflect on the year, set new goals, design a new action plan incorporating everything learned). The action plan is a living document, not a static one. Your needs, workload, and circumstances change — the plan should evolve to match. The most effective plans are reviewed regularly and adjusted frequently.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'A personal productivity action plan should be based primarily on:',
    options: [
      'General productivity advice from books and podcasts',
      'What other tradespeople say works for them',
      'Your own time audit data, identifying your specific areas of greatest waste and highest opportunity',
      'The recommendations of your employer or supervisor',
    ],
    correctAnswer: 2,
    explanation:
      "While general advice and others' experiences have value, the most effective action plan is rooted in your own data. A time audit reveals your specific patterns, waste areas, and habits — which may be very different from someone else's. An electrician who wastes 90 minutes a day on social media needs a different plan from one who wastes 90 minutes on unnecessary merchant trips. The action plan must be personalised to be effective, and personalisation requires data.",
  },
  {
    id: 2,
    question:
      'According to the SMART framework, which of the following is a well-formed action plan commitment?',
    options: [
      '"I will be more productive this year"',
      '"I will implement a 10-minute end-of-day planning routine every working day for the next 8 weeks, starting Monday"',
      '"I will try to do my invoicing more regularly"',
      '"I want to stop wasting time on my phone"',
    ],
    correctAnswer: 1,
    explanation:
      'Option B is Specific (10-minute end-of-day planning routine), Measurable (did you do it today or not?), Achievable (10 minutes is realistic), Relevant (directly improves organisation and planning), and Time-bound (8 weeks starting Monday). The other options fail multiple criteria: "be more productive" is vague, "try to do invoicing" lacks specificity and measurement, and "want to stop" is a wish, not a commitment. SMART goals convert aspirations into actionable commitments.',
  },
  {
    id: 3,
    question:
      'The Eisenhower Matrix, when applied to a personal productivity action plan, helps you:',
    options: [
      'Eliminate all tasks that are not urgent',
      'Distinguish between urgent and important tasks, ensuring that important-but-not-urgent work (Quadrant 2) receives scheduled time rather than being perpetually deferred',
      'Complete all tasks in order of urgency, from most urgent to least urgent',
      'Delegate all tasks that you find boring or unpleasant',
    ],
    correctAnswer: 1,
    explanation:
      "The Eisenhower Matrix's greatest value is highlighting Quadrant 2 — tasks that are important but not urgent. These include planning, professional development, relationship building, system improvement, and preventive maintenance. Because they lack urgency, they are easily displaced by Quadrant 1 (urgent and important) and Quadrant 3 (urgent but not important) tasks. The action plan should specifically schedule Quadrant 2 activities, because without a scheduled time, they will never compete successfully against the tyranny of the urgent.",
  },
  {
    id: 4,
    question: 'Why should the action plan limit "non-negotiable routines" to 3 habits initially?',
    options: [
      'Because 3 habits take exactly 21 days to form, fitting neatly into a monthly cycle',
      'Because attempting too many simultaneous behaviour changes overwhelms willpower and increases the risk of failing at all of them',
      'Because research shows that tradespeople can only remember 3 things at a time',
      'Because 3 is the maximum number of habits any person can maintain long-term',
    ],
    correctAnswer: 1,
    explanation:
      'Behaviour change research is clear: the probability of successfully forming a new habit decreases as the number of simultaneous new habits increases. Each habit in the formation phase requires conscious effort, willpower, and repetition. Attempting 10 new habits simultaneously divides limited willpower resources across too many fronts. Starting with 3 allows focused investment in a small number of high-impact changes. Once those 3 are automatic (typically after 8 to 10 weeks), you free up willpower capacity to add more. This is strategic, not limiting.',
  },
  {
    id: 5,
    question: '"Quick wins" in the action plan serve the purpose of:',
    options: [
      'Replacing long-term goals with short-term ones that are easier to achieve',
      'Providing immediate, visible progress that builds momentum and confidence for tackling the harder commitments',
      'Distracting from the more important but more difficult changes',
      'Filling time while waiting for the bigger habits to form',
    ],
    correctAnswer: 1,
    explanation:
      'Quick wins are not substitutes for deep change — they are catalysts for it. By identifying 3 things you can change this week (putting the phone on silent during testing, sending quotes same-day, batching material orders to Sunday evenings), you create immediate visible progress. This progress builds confidence ("I can actually change my behaviour"), provides evidence for identity change ("I am someone who sends quotes promptly"), and generates momentum that makes the harder, longer-term commitments feel more achievable.',
  },
  {
    id: 6,
    question: 'A monthly 10-minute productivity self-check should include:',
    options: [
      'A complete re-design of all daily and weekly routines',
      'An honest assessment of which habits are sticking, which have slipped, what worked well, and what needs adjusting',
      'A financial audit of all income and expenditure',
      'A comparison of your productivity to other tradespeople in your area',
    ],
    correctAnswer: 1,
    explanation:
      'The monthly self-check is a brief, honest review — not a comprehensive overhaul. It asks four simple questions: (1) Am I still doing my 3 non-negotiables? (2) What slipped this month, and why? (3) What worked particularly well? (4) What one thing should I adjust for next month? This takes 10 minutes and catches habit drift before it becomes habit abandonment. The key word is "honest" — the review has no value if you tell yourself everything is fine when it is not.',
  },
  {
    id: 7,
    question:
      'The recommended tools and resources for implementing a personal productivity action plan include:',
    options: [
      'Only digital apps — paper-based systems are outdated and ineffective',
      'A combination of whatever works for you: digital calendars, physical notebooks, apps, or simple checklists — the best system is the one you will actually use consistently',
      'Only expensive professional project management software',
      'No tools — productivity should come from willpower and discipline alone',
    ],
    correctAnswer: 1,
    explanation:
      'The most effective productivity system is the one you will actually use. For some people, that is a sophisticated digital app with notifications and integrations. For others, it is a physical notebook and a pen. For many tradespeople, it is a simple laminated checklist on the van dashboard. The tool matters far less than the consistency. A perfect app that you stop using after 2 weeks is worth nothing. A basic notepad that you check every morning for 5 years is priceless. Choose the simplest system that covers your needs, and commit to using it.',
  },
  {
    id: 8,
    question:
      'Bringing together all 5 modules of this course, the single most important principle of time management and organisation for tradespeople is:',
    options: [
      'Using the most advanced digital tools and apps available',
      'Working longer hours to compensate for inefficiency',
      'Building consistent daily systems and habits that automate good decisions, freeing mental energy for the work that matters most',
      'Eliminating all non-billable activities from the working day',
    ],
    correctAnswer: 2,
    explanation:
      'The throughline of this entire course is that systems beat willpower. Time audits reveal where you are. The Eisenhower Matrix and prioritisation frameworks show you what to focus on. Planning and scheduling tools give you structure. Communication and delegation free up capacity. And habits and routines make it all sustainable without requiring constant conscious effort. The goal is not to work harder or longer — it is to build systems that automate the right decisions so that your finite mental energy is spent on the high-value work that only you can do.',
  },
];

export default function TMOModule5Section4() {
  useSEO({
    title: 'Your Personal Productivity Action Plan | Time Management & Organisation Module 5.4',
    description:
      'Bringing it all together: time audit results, SMART action planning, non-negotiable routines, quick wins, the Eisenhower Matrix, and your monthly review schedule.',
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
            <Link to="../tmo-module-5">
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
            <ClipboardCheck className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Your Personal Productivity Action Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Bringing it all together: time audit results, SMART commitments, non-negotiable
            routines, quick wins, and your monthly review schedule
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Time audit data</strong> reveals your biggest opportunities for improvement
              </li>
              <li>
                <strong>3 SMART commitments</strong> turn aspirations into measurable action
              </li>
              <li>
                <strong>3 non-negotiable routines</strong> form the bedrock of lasting change
              </li>
              <li>
                <strong>Monthly review</strong> prevents habit drift and keeps you on course
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Integration:</strong> Knowledge without action is wasted &mdash; the plan
                converts learning into doing
              </li>
              <li>
                <strong>Personalisation:</strong> Your plan targets your specific patterns, not
                generic advice
              </li>
              <li>
                <strong>Sustainability:</strong> Quick wins build momentum; non-negotiables build
                permanence
              </li>
              <li>
                <strong>Accountability:</strong> Written commitments with review dates hold you to
                your own standards
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Interpret your personal time audit results to identify the 2 to 3 areas of greatest waste and highest improvement potential',
              'Write 3 SMART action commitments that are specific, measurable, achievable, relevant, and time-bound',
              'Select 3 non-negotiable routines to implement regardless of workload or circumstance',
              'Apply the Eisenhower Matrix to your current commitments, ensuring Quadrant 2 work has scheduled time',
              'Identify 3 quick wins that can be implemented this week to build immediate momentum',
              'Establish a monthly 10-minute productivity self-check to catch habit drift and course-correct',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Bringing It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Bringing It All Together &mdash; What You Have Learned
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Across the five modules of this course, you have built a comprehensive understanding
                of time management and organisation specifically tailored to the realities of
                construction and electrical work. Module 1 showed you where your time actually goes
                &mdash; the gap between perceived and actual time use, the power of time audits,
                Parkinson&rsquo;s Law, and the planning fallacy. Module 2 gave you frameworks for
                prioritisation &mdash; the Eisenhower Matrix, the Pareto Principle, Covey&rsquo;s
                Big Rocks, and the art of saying no. Module 3 provided planning and scheduling tools
                &mdash; time blocking, batching, digital calendars, and the weekly planning session.
                Module 4 addressed communication and delegation &mdash; managing client
                expectations, protecting focused work time, and leveraging other people&rsquo;s
                strengths.
              </p>

              <p>
                Module 5, this module, has added the critical final layer: the science of making
                these changes permanent. You now understand how habits form (the habit loop and the
                4 Laws of Behaviour Change), how to build routines that survive the chaos of
                real-world construction work, how to overcome the procrastination that derails even
                the best intentions, and &mdash; in this final section &mdash; how to create a
                personalised action plan that turns knowledge into lasting change.
              </p>

              <p>
                The difference between someone who reads about time management and someone who
                actually becomes a better time manager is not knowledge &mdash; it is
                implementation. This section is about implementation. You will create a written,
                specific, time-bound plan that targets your personal patterns, leverages the
                frameworks and techniques from the entire course, and includes a built-in review
                mechanism to ensure the changes stick. This is the plan that transforms what you
                have learned into what you do.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 5-Module Framework</p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <ul className="space-y-1">
                    <li>
                      <strong>Module 1:</strong> Understanding time &mdash; where it goes, how we
                      misjudge it
                    </li>
                    <li>
                      <strong>Module 2:</strong> Prioritisation &mdash; frameworks for choosing what
                      matters
                    </li>
                    <li>
                      <strong>Module 3:</strong> Planning &amp; scheduling &mdash; tools for
                      organising the work
                    </li>
                    <li>
                      <strong>Module 4:</strong> Communication &amp; delegation &mdash; protecting
                      and leveraging time
                    </li>
                    <li>
                      <strong>Module 5:</strong> Habits &amp; routines &mdash; making the changes
                      permanent
                    </li>
                  </ul>
                  <p className="mt-3 text-white">
                    <strong>This section:</strong> Your personal action plan that integrates all
                    five modules into a practical, sustainable system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Time Audit Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Your Time Audit Results &mdash; Where to Focus
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The foundation of any effective action plan is data. If you completed the 3-day time
                audit from Module 1, you already have the most important data set: a record of how
                you actually spend your working day, categorised into billable/productive work,
                necessary non-billable work, and low-value/waste time. The action plan starts by
                reviewing this data and asking three questions: What are my top 2 to 3 areas of time
                waste? Which of these would recover the most hours if addressed? Which would be the
                easiest to change?
              </p>

              <p>
                For most tradespeople, the time audit reveals one or two dominant patterns. The most
                common are: excessive phone and social media use during the working day (typically
                60 to 90 minutes per day), poor route planning leading to unnecessary driving
                (typically 30 to 60 minutes per day), unplanned merchant trips for materials that
                could have been pre-ordered (typically 45 to 90 minutes per occurrence), and
                administrative procrastination causing end-of-week or end-of-month crises. Your
                specific pattern may include all of these, some of these, or something entirely
                different. The point is that the plan targets <em>your</em> data, not someone
                else&rsquo;s assumptions.
              </p>

              <p>
                If you have not yet completed a time audit, that becomes the first item on your
                action plan &mdash; and nothing else matters until it is done. Without data, you are
                guessing. You might invest weeks building a system to solve a problem that is not
                your actual problem. The time audit takes 3 to 5 working days of honest tracking and
                represents the highest-return investment you can make in your personal productivity.
                Everything else in this section builds on the insights it provides.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Time Audit Review Questions</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      What percentage of my day is genuinely billable/productive work? Is it above
                      or below 60%?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      What is my single biggest time sink? How many hours per week does it consume?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Which waste area would be easiest to reduce with a simple habit or routine
                      change?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      If I could recover just 1 hour per day from waste, what would I do with it?
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: SMART Action Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            SMART Action Planning &mdash; 3 Specific Commitments
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SMART framework &mdash; Specific, Measurable, Achievable, Relevant, Time-bound
                &mdash; has been a cornerstone of goal-setting research since George Doran
                introduced it in 1981. Its enduring value lies in its ability to convert vague
                aspirations into concrete, actionable commitments. &ldquo;I want to be more
                productive&rdquo; is an aspiration. &ldquo;I will implement a 10-minute end-of-day
                planning routine every working day for the next 8 weeks, starting Monday&rdquo; is a
                SMART commitment. The difference is accountability: you can objectively measure
                whether you did or did not do the second one. The first is unmeasurable and
                therefore unfalsifiable &mdash; which means it creates no pressure to actually
                change.
              </p>

              <p>
                Your action plan should include exactly 3 SMART commitments &mdash; no more. Three
                is enough to create meaningful change without overwhelming the behaviour-change
                system. Each commitment should target a different area identified in your time
                audit. If your audit revealed excessive phone use, poor planning, and delayed
                invoicing, your three SMART commitments might be: (1) &ldquo;I will place my phone
                on silent and in the van during all on-site testing, starting tomorrow, for the next
                8 weeks&rdquo;; (2) &ldquo;I will spend 10 minutes planning tomorrow&rsquo;s
                schedule every evening before leaving the last job, starting Monday, for the next 8
                weeks&rdquo;; (3) &ldquo;I will send all outstanding invoices every Friday at 4pm,
                starting this Friday, for the next 8 weeks.&rdquo;
              </p>

              <p>
                Notice that each commitment specifies <em>what</em> (the behaviour), <em>when</em>
                (the trigger or schedule), <em>how long</em> (8 weeks), and <em>starting when</em>{' '}
                (immediately). The 8-week timeframe is deliberate: it aligns with the research on
                habit formation (average 66 days to automaticity, per Lally et al.) and provides a
                clear endpoint for evaluation. At the end of 8 weeks, you review: Did the habit
                stick? Should it continue? Should it be adjusted? Should it be replaced with a new
                commitment? This creates a cycle of continuous improvement rather than a one-off
                effort.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">SMART Commitment Template</p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <p>
                    <strong>I will</strong> [specific behaviour]
                    <strong> at/during</strong> [specific time or trigger]
                    <strong> starting</strong> [specific date]
                    <strong> for</strong> [specific duration].
                  </p>
                  <p className="mt-3">
                    <strong>Example commitments for a self-employed electrician:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      1. &ldquo;I will place my phone on silent in the van during all on-site work,
                      starting Monday, for 8 weeks&rdquo;
                    </li>
                    <li>
                      2. &ldquo;I will spend 10 minutes planning tomorrow before leaving the last
                      job, starting Monday, for 8 weeks&rdquo;
                    </li>
                    <li>
                      3. &ldquo;I will send all outstanding invoices every Friday at 4pm, starting
                      this Friday, for 8 weeks&rdquo;
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Non-Negotiable Routines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Your Non-Negotiable Routines &mdash; 3 Habits That Always Happen
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-negotiable routines are the habits you commit to performing regardless of
                workload, mood, energy level, or circumstance. They are the bedrock of your
                productivity system &mdash; the things that happen even on your worst day. The power
                of non-negotiables is that they remove the decision. You do not decide whether to do
                your morning schedule review on a given day; you just do it. The decision was made
                once, in advance, and it applies to every working day without exception.
              </p>

              <p>
                Choosing your 3 non-negotiables requires honest self-assessment. Which habits, if
                performed consistently, would have the greatest positive impact on your
                productivity, income, and professional reputation? For most tradespeople, the
                strongest candidates are: a morning schedule and materials check (prevents the most
                common daily time wasters), end-of-job documentation (prevents the open-loop
                accumulation that creates certificate backlogs), and end-of-day planning (prevents
                the disorganised start that cascades into a chaotic day). But your non-negotiables
                should reflect your specific needs &mdash; if your biggest issue is phone use, then
                &ldquo;phone on silent during all on-site work&rdquo; might be your most impactful
                non-negotiable.
              </p>

              <p>
                The critical feature of a non-negotiable is the word &ldquo;non.&rdquo; It means the
                habit happens even when you are tired. Even when you have had a terrible day. Even
                when a job overruns. Even when you just want to go home. James Clear&rsquo;s
                &ldquo;never miss twice&rdquo; rule applies here: if for some extraordinary reason
                you miss a non-negotiable once, you do it the next day without fail. Missing once is
                an accident; missing twice is the start of a new (bad) pattern. Protect the streak.
                The streak is the habit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Example Non-Negotiables for an Electrician
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Non-negotiable 1:</strong> 10-minute morning routine &mdash; review
                      schedule, confirm first appointment, check van materials. Every working day,
                      before leaving the house.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Non-negotiable 2:</strong> Photograph and document every completed job
                      before leaving the site. Every job, every day, no exceptions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Non-negotiable 3:</strong> 10-minute end-of-day plan &mdash; review
                      tomorrow&rsquo;s schedule, check material needs, close all open loops. Every
                      working day, before finishing work.
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total daily time investment: 25 minutes.</strong> These three habits
                  prevent cancelled-job arrivals, missing-material trips, certificate backlogs, and
                  disorganised starts &mdash; saving an estimated 45 to 90 minutes per day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Quick Wins and Eisenhower Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Quick Wins &amp; the Eisenhower Matrix for Your Commitments
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before the longer-term habits take root, you need <strong>quick wins</strong>{' '}
                &mdash; changes you can implement this week that produce immediate, visible results.
                Quick wins serve three purposes: they build confidence (&ldquo;I can actually change
                my behaviour&rdquo;), they provide evidence for identity change (&ldquo;I am
                becoming someone who manages their time well&rdquo;), and they generate momentum
                that makes the harder commitments feel more achievable. The best quick wins are
                high-impact but low-effort changes that do not require habit formation &mdash; they
                are one-time environment adjustments or simple rule changes.
              </p>

              <p>
                Apply the <strong>Eisenhower Matrix</strong> from Module 2 to your current
                commitments. List everything on your plate &mdash; jobs, admin tasks, personal
                commitments, business tasks &mdash; and categorise each one. Quadrant 1 (urgent and
                important) items need immediate attention: overdue invoices, a job starting tomorrow
                with missing materials, a compliance deadline. Quadrant 2 (important but not urgent)
                items need scheduled time: professional development, business planning, system
                improvement, relationship building. Quadrant 3 (urgent but not important) items
                should be minimised or delegated: most phone interruptions, non-essential meetings,
                other people&rsquo;s priorities dressed as urgency. Quadrant 4 (neither urgent nor
                important) items should be eliminated: mindless social media, unnecessary travel,
                and tasks that produce no meaningful outcome.
              </p>

              <p>
                The Eisenhower Matrix often reveals a sobering pattern: most tradespeople spend the
                majority of their day in Quadrants 1 and 3 &mdash; reacting to what is urgent rather
                than investing in what is important. Quadrant 2, which contains the activities that
                build long-term success (planning, learning, system improvement, relationship
                building), receives whatever time is left over &mdash; which is usually none. The
                action plan must explicitly schedule Quadrant 2 time, because it will never happen
                spontaneously. This is the weekly planning session, the monthly financial review,
                the CPD time, and the business strategy thinking that separate professionals who
                merely survive from professionals who thrive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  3 Quick Wins to Implement This Week
                </p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <ul className="space-y-1">
                    <li>
                      <strong>1. Phone on silent during testing.</strong> One setting change, zero
                      willpower required, immediate reduction in interruptions and improved
                      concentration during safety-critical work.
                    </li>
                    <li>
                      <strong>2. Same-day quotes.</strong> Write and send every quote on the same
                      day as the site visit, while the details are fresh. Eliminates the
                      procrastination cycle and improves conversion rates.
                    </li>
                    <li>
                      <strong>3. Batch material orders to Sunday evening.</strong> Review the coming
                      week&rsquo;s jobs, order everything needed for Monday to Wednesday in one go.
                      Eliminates mid-week merchant trips and the associated time waste.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Review Schedule and Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Review Schedule &amp; Tools Recap
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most common reason that productivity improvements do not last is the absence of
                a <strong>review mechanism</strong>. Habits drift, routines erode, and without
                periodic assessment, you gradually revert to old patterns without even noticing. The
                antidote is a scheduled review at three intervals: a{' '}
                <strong>monthly mini-review</strong> (10 minutes), a{' '}
                <strong>quarterly deep review</strong> (30 minutes), and an{' '}
                <strong>annual reset</strong> (60 minutes). Each serves a different purpose, and
                together they create a closed-loop system that self-corrects.
              </p>

              <p>
                The <strong>monthly mini-review</strong> takes 10 minutes and answers four
                questions: Am I still doing my 3 non-negotiables consistently? What slipped this
                month, and why? What worked particularly well that I should continue? What one
                adjustment should I make for next month? This is not a comprehensive audit &mdash;
                it is a quick pulse check that catches drift early. The{' '}
                <strong>quarterly deep review</strong>
                (30 minutes) asks bigger questions: Are my original SMART commitments still
                relevant, or have my needs changed? Have any habits reached automaticity and can be
                replaced with new ones? Are there new areas of waste that have emerged? The{' '}
                <strong>annual reset</strong> (60 minutes) is a full reflection: What did I
                accomplish this year? What are my goals for next year? What does my ideal working
                week look like, and what habits and routines do I need to support it?
              </p>

              <p>
                Finally, a word on <strong>tools and resources</strong>. The best productivity tool
                is the one you will actually use consistently. For some tradespeople, this is a
                sophisticated app like Todoist, Notion, or Google Calendar. For others, it is a
                physical notebook and pen. For many, it is a laminated checklist on the van
                dashboard. The tool does not matter nearly as much as the consistency. A basic
                notepad that you check every morning for years is worth infinitely more than a
                premium app that you abandon after a fortnight. Recommended resources from across
                this course include:
                <em> Atomic Habits</em> by James Clear, <em>Eat That Frog!</em> by Brian Tracy,
                <em> The 7 Habits of Highly Effective People</em> by Stephen Covey,{' '}
                <em>Deep Work</em> by Cal Newport, and <em>Getting Things Done</em> by David Allen.
                Each offers a different perspective on the same fundamental challenge: how to spend
                your finite time on the things that matter most.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: A Complete Personal Plan
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Monday morning (15 mins):</strong> Review the week, confirm all
                      appointments, order any outstanding materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Every morning (10 mins):</strong> Schedule review, first job
                      confirmation, van materials check
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Every job completion:</strong> Photograph the work, update the job
                      file, note any observations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Every evening (10 mins):</strong> Plan tomorrow, check material needs,
                      close all open loops
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Friday afternoon (60 mins):</strong> Send all invoices, complete all
                      certificates, plan next week, batch material orders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Sunday evening (15 mins):</strong> Quick review of Monday&rsquo;s
                      jobs, check the van is stocked
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Phone silent:</strong> During all testing and safety-critical work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly (10 mins):</strong> Productivity self-check on the 1st of each
                      month
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
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary &amp; Course Conclusion
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section &mdash; and this course &mdash; has equipped you with a complete
                framework for taking control of your time and productivity. The final action plan is
                the bridge between knowing and doing. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Start with your time audit data.</strong> Target the specific areas
                    where you personally waste the most time. Do not guess &mdash; measure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Write 3 SMART commitments.</strong> Specific, measurable, achievable,
                    relevant, and time-bound. Vague aspirations produce no change.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Choose 3 non-negotiable routines.</strong> These happen every day
                    regardless of workload, mood, or energy. They are the habits that form the
                    bedrock of your system.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Apply the Eisenhower Matrix.</strong> Ensure Quadrant 2 (important but
                    not urgent) work has scheduled, protected time in your weekly calendar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Identify 3 quick wins</strong> for this week. Build momentum before the
                    longer-term habits require sustained effort.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Schedule your monthly review.</strong> 10 minutes on the 1st of each
                    month catches habit drift before it becomes habit abandonment.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Course Summary:</strong> Time management is not
                  about working harder or longer. It is about building systems that automate good
                  decisions, protect your focus for high-value work, and compound small daily
                  improvements into extraordinary long-term results. The tools and frameworks from
                  this course &mdash; time audits, the Eisenhower Matrix, time blocking, the habit
                  loop, the 4 Laws of Behaviour Change, eating the frog, and SMART goal-setting
                  &mdash; are not theoretical concepts. They are practical, proven strategies used
                  by the most successful professionals in every field. Your action plan makes them
                  yours.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
