import { ArrowLeft, CalendarRange, CheckCircle } from 'lucide-react';
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
    id: 'tmo-2-2-check1',
    question:
      'An electrician quotes a consumer unit change at 4 hours but does not add buffer time. The job encounters an unexpected asbestos flash plate behind the old board. What scheduling principle was violated?',
    options: [
      'The Pareto Principle — they should have focused on the 20% that matters most',
      'The 20% buffer rule — always add at least 20% to estimated job duration to account for unforeseen complications',
      'The Eisenhower Matrix — they should have classified the job as urgent-important',
      "Parkinson's Law — the job expanded to fill the available time",
    ],
    correctIndex: 1,
    explanation:
      'The 20% buffer rule states that you should always add at least 20% to your estimated job duration to account for unforeseen complications. A 4-hour CU change should be scheduled as a 5-hour block (4 hours + 48 minutes buffer, rounded up). The asbestos flash plate is exactly the kind of complication that is unpredictable on any individual job but statistically inevitable across all jobs. Without buffer time, every unexpected issue causes a cascade: the current job overruns, the next job starts late, the client is kept waiting, and the day ends with stress and incomplete work.',
  },
  {
    id: 'tmo-2-2-check2',
    question:
      'A sole-trader electrician says: "I don\'t need to block out admin time — I just do paperwork whenever I get a spare moment." According to scheduling best practice, why is this approach problematic?',
    options: [
      'Admin work is not important enough to schedule',
      'Spare moments rarely materialise, and when they do, the electrician is usually too tired for focused admin work — treating admin as a real appointment ensures it actually gets done',
      'Paperwork should only be done at weekends',
      'Admin time should be delegated to a bookkeeper',
    ],
    correctIndex: 1,
    explanation:
      'Stephen Covey\'s principle of "scheduling your priorities rather than prioritising your schedule" applies directly here. Admin — invoicing, certificates, quoting, bookkeeping — is essential business work. When it is left to "spare moments," two things happen: spare moments are rarer than expected (see Parkinson\'s Law), and when they do occur, the electrician is often physically tired from on-site work and mentally drained, leading to poor-quality admin or deferral. Blocking a specific recurring slot (e.g., Monday 7-8am or Friday 2-4pm) treats admin as a genuine commitment that gets done consistently.',
  },
  {
    id: 'tmo-2-2-check3',
    question:
      'An electrician plans their week on a Sunday evening and discovers they have 5 confirmed domestic jobs, 2 hours of admin, and an evening training session across the 5-day week. What should they do first?',
    options: [
      'Cancel the training session to make room for more jobs',
      'Map all fixed commitments (jobs with specific times, training session) onto the calendar first, then fit flexible items (admin, material collection) into the remaining gaps',
      'Work Saturday to fit everything in',
      'Reduce admin time to 30 minutes',
    ],
    correctIndex: 1,
    explanation:
      'Covey\'s "Big Rocks" principle applies: place your fixed, non-negotiable commitments onto the calendar first, then fit smaller, flexible items around them. The training session has a fixed time. Confirmed jobs with agreed start times are fixed. Admin, material collection, and travel planning are flexible — they can go into any available gap. Starting with flexible items and trying to squeeze fixed items in afterwards leads to double-booking and missed commitments.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Should I plan my week on Sunday evening or Friday afternoon?',
    answer:
      'Both work well — the choice depends on your personal rhythm. Friday afternoon has the advantage of immediacy: the current week is fresh in your mind, you can identify unfinished items, and you close out the week with a clear plan for Monday. Sunday evening works for people who prefer to start the week with a fresh perspective, and it allows weekend reflection time. The key is consistency — pick one time and protect it every week. Many tradespeople find Friday at 3pm ideal because it doubles as the GTD weekly review, covering both reflection and planning in a single 30-minute session.',
  },
  {
    question: 'How many domestic jobs can I realistically fit in a day?',
    answer:
      'For most domestic electricians, 2 substantive jobs per day is a realistic maximum if quality, travel time, and admin are factored in. A "substantive" job is anything taking 2 or more hours — a consumer unit change, a bathroom rewire, a fault-find. Smaller jobs (socket additions, light fitting changes, smoke alarm installations) can be batched more densely. The common mistake is scheduling 3 large jobs and expecting to complete all of them: travel time between jobs, client conversations, unexpected complications, and the 20% buffer mean the third job almost always overruns into the evening or gets postponed.',
  },
  {
    question: 'What if a job overruns and disrupts the rest of my week?',
    answer:
      'This is precisely why buffer time exists. If you have added 20% buffer to each job and built flex time into the week (a half-day slot that is scheduled but not committed to a specific client), an overrun on Monday can be absorbed by the flex slot on Wednesday. Without buffer and flex time, a single overrun creates a domino effect that disrupts every subsequent job. When an overrun does happen despite your buffers, communicate immediately with affected clients — a proactive call saying "I am running 2 hours behind, can we adjust?" builds trust far more than a last-minute cancellation.',
  },
  {
    question: 'Is a physical diary better than a phone calendar?',
    answer:
      'Neither is inherently better — the best tool is the one you will actually use consistently. Physical diaries have the advantage of being fast to write in, easy to visualise a full week at a glance, and not dependent on battery life. Phone calendars have the advantage of reminders, portability (always in your pocket), the ability to share with family or a business partner, and integration with job management apps. Many tradespeople use a hybrid: phone calendar for appointments and reminders, whiteboard at home for the weekly overview. The critical point is that you use one system consistently, not three systems inconsistently.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Stephen Covey\'s principle "organise weekly, adapt daily" suggests that:',
    options: [
      'You should rewrite your entire plan every day',
      'Weekly planning provides the strategic framework, while daily adjustments handle the tactical reality of changing circumstances',
      'Daily planning is unnecessary if you have a weekly plan',
      'Weekly planning is too infrequent — daily planning is always better',
    ],
    correctAnswer: 1,
    explanation:
      'Covey argued in "First Things First" (1994) that the week is the ideal planning horizon: long enough to accommodate varied commitments (work, admin, personal, learning) but short enough to feel concrete and actionable. The weekly plan sets the framework — which jobs are confirmed, which admin blocks are protected, which personal commitments are fixed. The daily adaptation handles real-world changes: a job that overruns, a cancellation, an emergency callout. The weekly plan provides direction; daily flexibility ensures responsiveness.',
  },
  {
    id: 2,
    question: 'The 20% buffer rule means:',
    options: [
      'You should leave 20% of your week completely unscheduled',
      'You should add 20% to every estimated job duration to account for unforeseen complications',
      'You should charge 20% more than your competitors',
      'You should allocate 20% of your time to learning and development',
    ],
    correctAnswer: 1,
    explanation:
      'The 20% buffer rule is a scheduling discipline: if you estimate a job will take 4 hours, schedule 4 hours 48 minutes (or round to 5 hours). This buffer absorbs the complications that are individually unpredictable but statistically inevitable: unexpected wiring routes, difficult access, additional faults discovered during work, client conversations, and material issues. Without buffer, every complication causes the schedule to cascade, creating stress and late arrivals at subsequent jobs.',
  },
  {
    id: 3,
    question: 'Blocking admin time means:',
    options: [
      'Doing admin only when you feel like it',
      'Delegating all admin to someone else',
      'Scheduling specific, recurring time slots for administrative work and treating them as real, non-negotiable appointments',
      'Completing admin at weekends only',
    ],
    correctAnswer: 2,
    explanation:
      'Blocking admin time means creating a specific, recurring calendar entry for administrative tasks — invoicing, certificate writing, quoting, bookkeeping, phone calls — and treating it with the same commitment as a client appointment. You would not cancel a paying job to do nothing; you should not cancel admin time either. Common blocks include Monday 7-8am (clearing the weekend inbox and preparing the week), Friday 2-4pm (invoicing, certificate completion, weekly review), or a daily 30-minute slot after the last job.',
  },
  {
    id: 4,
    question:
      'A sole-trader electrician has 5 confirmed jobs for the week but no travel time or admin time scheduled. This schedule is:',
    options: [
      'Efficient — every hour is billable',
      'Unrealistic — it ignores essential non-billable activities that are necessary for the business to function',
      'Ideal — admin and travel should not be scheduled, they just happen',
      'Only problematic if the jobs are far apart geographically',
    ],
    correctAnswer: 1,
    explanation:
      'A schedule with no travel time, no admin blocks, no buffer time, and no material collection time is a fantasy, not a plan. Travel between jobs, invoicing, certificate writing, quoting, material ordering, van restocking, and communication with clients are all essential business activities. Ignoring them does not make them disappear — it means they either get done at evenings and weekends (creating burnout) or they do not get done at all (creating cash flow problems, legal risk from missing certificates, and lost clients from unresponded quotes).',
  },
  {
    id: 5,
    question:
      'Which of the following is the best use of a Monday morning admin block (7:00-8:00am)?',
    options: [
      'Scrolling trade forums and social media',
      "Reviewing the weekly plan, sending overdue invoices, confirming Monday and Tuesday job details with clients, and ordering materials for Wednesday's jobs",
      'Doing a full van clean and restock',
      'Calling potential new clients for sales prospecting',
    ],
    correctAnswer: 1,
    explanation:
      'A Monday morning admin block is most productive when it focuses on setting up the week for success: confirming imminent jobs with clients (reducing no-access surprises), sending overdue invoices (protecting cash flow), ordering materials in advance (preventing mid-job merchant trips), and reviewing the weekly plan (maintaining the strategic overview). Van restocking and prospecting are important but better suited to other time slots. Social media scrolling is not admin.',
  },
  {
    id: 6,
    question: 'Visual scheduling tools (diary, whiteboard, app) are effective because:',
    options: [
      'They look professional when clients visit your home office',
      'They make abstract commitments concrete and visible, reducing the cognitive load of holding the schedule in your head',
      'They are required by law for self-employed electricians',
      'They replace the need for a weekly planning session',
    ],
    correctAnswer: 1,
    explanation:
      'Visual scheduling externalises the weekly plan, making it concrete and visible rather than abstract and mental. A whiteboard showing the week at a glance, a diary open on the desk, or a calendar app on the phone screen — all serve the same purpose: you can see your commitments without having to recall them. This reduces cognitive load (consistent with the GTD principle of external capture) and makes gaps, conflicts, and opportunities immediately apparent.',
  },
  {
    id: 7,
    question:
      'The recommended maximum number of substantive domestic jobs per day for a sole trader is:',
    options: [
      '1 job per day — anything more is overwork',
      '2 substantive jobs per day, with travel, buffer, and admin time factored in',
      '4 jobs per day — tradespeople should maximise billable hours',
      '3 jobs per day minimum to cover business costs',
    ],
    correctAnswer: 1,
    explanation:
      'Two substantive domestic jobs per day is a realistic maximum when travel time (30-60 minutes between jobs), buffer time (20% per job), client conversations, setup and cleanup, and end-of-day admin are factored in. A "substantive" job is one taking 2+ hours — a CU change, a rewire, a fault-find. Attempting 3 or more substantive jobs per day leads to rushing, late arrivals, skipped testing, and missed quality standards. Smaller jobs (socket additions, smoke alarms) can be batched more densely, but even then, 4+ stops per day creates significant travel overhead.',
  },
  {
    id: 8,
    question: 'Covey\'s "Big Rocks" principle, applied to weekly planning, means:',
    options: [
      'Focus on the biggest, most expensive jobs first and ignore small ones',
      'Place your most important, fixed commitments onto the calendar first, then fit smaller and flexible items around them',
      'Only work on large commercial projects because they pay more',
      'Prioritise physical labour over administrative tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Covey\'s "Big Rocks" analogy comes from "First Things First" (1994): if you have a jar and need to fit in big rocks, pebbles, and sand, you must put the big rocks in first — if you fill the jar with sand and pebbles first, the big rocks will not fit. In weekly planning, the "big rocks" are fixed, non-negotiable commitments: confirmed jobs with specific times, training sessions, family obligations, admin blocks. Once these are placed on the calendar, flexible items (material collection, phone calls, van maintenance) fill the remaining gaps naturally.',
  },
];

export default function TMOModule2Section2() {
  useSEO({
    title: 'Weekly Planning & Job Scheduling | Time Management & Organisation Module 2.2',
    description:
      'The weekly plan as the cornerstone of time management, buffer time, blocking admin time, and visual scheduling for tradespeople.',
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
            <Link to="../tmo-module-2">
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
            <CalendarRange className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Weekly Planning &amp; Job Scheduling
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The weekly plan as the cornerstone of time management, buffer time, blocking admin time,
            and visual scheduling
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Weekly planning</strong> is the single most effective scheduling discipline
              </li>
              <li>
                <strong>Buffer time:</strong> Always add 20% to estimated job duration
              </li>
              <li>
                <strong>Admin blocks:</strong> Treat paperwork as a real appointment
              </li>
              <li>
                <strong>2 jobs/day:</strong> Realistic maximum for substantive domestic work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Predictability:</strong> Clients trust electricians who arrive on time,
                every time
              </li>
              <li>
                <strong>Sustainability:</strong> Preventing burnout from chronic overcommitment
              </li>
              <li>
                <strong>Cash flow:</strong> Scheduled admin time means invoices go out promptly
              </li>
              <li>
                <strong>Quality:</strong> Rushing to catch up leads to mistakes and callbacks
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why the week is the optimal planning horizon for tradespeople',
              'Create a weekly scheduling session using the Sunday/Friday planning framework',
              'Apply the 20% buffer rule to job time estimates',
              'Design effective admin blocks that protect essential business activities',
              'Identify realistic daily job limits based on job type, travel, and buffer time',
              'Choose and implement a visual scheduling tool suited to your working style',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Weekly Plan as Cornerstone */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Weekly Plan as Cornerstone
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In <em>First Things First</em> (1994), <strong>Stephen Covey</strong> argued that
                the week is the ideal planning horizon for personal effectiveness. A day is too
                short &mdash; it does not accommodate the full range of life&rsquo;s roles and
                commitments. A month is too long &mdash; it feels abstract and invites
                procrastination. The week sits in the productive middle: long enough to include
                varied activities (client work, admin, personal time, learning, rest) but short
                enough to feel concrete and actionable. Covey&rsquo;s principle was simple:{' '}
                <strong>&ldquo;Organise weekly, adapt daily.&rdquo;</strong>
              </p>

              <p>
                For self-employed tradespeople, the weekly plan is not a luxury &mdash; it is the
                difference between running your business and your business running you. Without a
                weekly plan, each day is reactive: you wake up, check your phone, respond to whoever
                shouted loudest, and the day unfolds without strategic direction. With a weekly
                plan, you start Monday knowing exactly which jobs are confirmed, when admin will get
                done, which materials need ordering, and where the flex time is to absorb the
                unexpected. The weekly plan transforms you from a firefighter into a strategist.
              </p>

              <p>
                The evidence supports this approach. A Harvard Business School study by Whillans et
                al. (2017) found that workers who engaged in proactive time planning reported
                significantly higher productivity, lower stress, and greater job satisfaction than
                those who worked reactively. The planning itself took minimal time &mdash; typically
                20 to 30 minutes per week &mdash; but the return on that investment was substantial.
                For tradespeople, the return is even more direct: a well-planned week means more
                jobs completed, more invoices sent, fewer callbacks, and less time wasted on
                avoidable problems.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Covey&rsquo;s Weekly Planning Principle
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;The key is not to prioritise what is on your schedule, but to schedule
                    your priorities.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Stephen Covey, <em>First Things First</em> (1994)
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> Do not fill your diary with whatever comes along
                  and then try to squeeze in what matters. Instead, place your priorities on the
                  calendar first &mdash; confirmed jobs, admin blocks, personal time &mdash; and let
                  less important items fill the gaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Scheduling Session */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Weekly Scheduling Session
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The weekly planning session is a dedicated 20 to 30 minute block where you step back
                from the doing and survey the week ahead. It should happen at the same time every
                week &mdash; consistency is more important than the specific time you choose. Two
                options dominate: <strong>Sunday evening</strong> (7&ndash;8pm, preparing for the
                week ahead with a clear mind) or <strong>Friday afternoon</strong> (2&ndash;4pm,
                while the current week is fresh, combining it with the GTD weekly review). Both work
                well; the key is choosing one and protecting it.
              </p>

              <p>
                The session follows a structured sequence. First, review the current state: what is
                confirmed for next week? Which clients have been contacted and locked in? What is
                tentative? Second, map all fixed commitments onto the calendar: jobs with agreed
                start times, training sessions, personal appointments, school runs, any commitment
                that has a non-negotiable time slot. These are Covey&rsquo;s &ldquo;Big
                Rocks.&rdquo; Third, add the essential supporting activities: travel time between
                jobs (be realistic &mdash; check actual driving times, not optimistic estimates),
                admin blocks, material collection runs. Fourth, identify gaps and decide how to use
                them: flex time for overruns, prospecting calls, quoting, or rest.
              </p>

              <p>
                The most common mistake in weekly planning is optimism: filling every hour with
                productive work and leaving no space for the inevitable. Jobs overrun. Clients
                cancel. The merchant does not have the part you need. Traffic adds 20 minutes to a
                journey. A well-constructed weekly plan is not a perfect grid of back-to-back
                appointments &mdash; it is a realistic framework with built-in flex that can absorb
                disruption without cascading. The goal is not to plan every minute but to ensure
                that every important activity has a home on the calendar.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Weekly Planning Session Checklist
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> Review confirmed jobs &mdash; who, where, what, when
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Map fixed commitments onto the calendar (Big Rocks
                      first)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Add travel time between jobs (realistic, not
                      optimistic)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 4:</strong> Block admin time (invoicing, certificates, quoting)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 5:</strong> Schedule material collection/ordering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 6:</strong> Identify flex time for overruns, prospecting, or rest
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Buffer Time */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Buffer Time &mdash; The 20% Rule
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Buffer time is the single most important scheduling concept for tradespeople, yet it
                is the one most commonly ignored. The principle is simple:{' '}
                <strong>always add at least 20% to your estimated job duration</strong>. If you
                estimate a job will take 4 hours, schedule 5 hours. If a rewire should take 3 days,
                schedule 3.5 to 4 days. The 20% buffer absorbs the complications that are
                individually unpredictable but statistically inevitable: unexpected wiring routes,
                difficult access, additional faults, client conversations that run long, and
                material issues.
              </p>

              <p>
                The psychology behind buffer time connects directly to the planning fallacy
                discussed in Module 1. Kahneman and Tversky showed that people systematically
                underestimate task durations because they imagine the best-case scenario. Buffer
                time is the structural corrective: it forces realism into the schedule regardless of
                your natural optimism. Think of it as insurance. You do not buy van insurance
                because you expect to crash every day &mdash; you buy it because the occasional
                crash is inevitable over a long enough period. Buffer time is insurance against the
                inevitable complications that accompany real-world trade work.
              </p>

              <p>
                When jobs finish ahead of schedule (the buffer was not needed), you gain a gift of
                free time. This is not wasted time &mdash; it is recoverable time that can be used
                for admin, phone calls, material ordering, or early arrival at the next job. When
                jobs overrun (the buffer was needed), the schedule absorbs the impact without
                cascading into subsequent commitments. Over the course of a month, the buffers
                average out: some days you gain time, other days you use the buffer, and the net
                result is a sustainable, realistic schedule that clients can rely on.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Buffer Time in Action
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Consumer unit change:</strong> Estimated 4 hours. Scheduled 5 hours.
                      Actual: 4.5 hours (old cable routes required additional work). Buffer absorbed
                      30 minutes; arrived at the next job on time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Full rewire (3-bed semi):</strong> Estimated 4 days. Scheduled 5 days.
                      Actual: 4.5 days (plaster damage required additional making good). Used 0.5
                      days of buffer; completed on time and avoided the stress of overrunning into
                      the next job.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Fault-find:</strong> Estimated 2 hours. Scheduled 2.5 hours. Actual:
                      1.5 hours (straightforward fault). Gained 1 hour of flex time &mdash; used it
                      to write up two overdue certificates.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Blocking Admin Time */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Blocking Admin Time &mdash; Treating Paperwork as a Real Appointment
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Administrative work &mdash; invoicing, certificate writing, quoting, bookkeeping,
                client communication, material ordering &mdash; is essential business work. Without
                it, invoices are not sent (cash flow dries up), certificates are not completed
                (legal liability increases), quotes are not responded to (clients go elsewhere), and
                books are not maintained (tax returns become a crisis). Yet most self-employed
                tradespeople treat admin as an afterthought &mdash; something to be done
                &ldquo;whenever there is a spare moment.&rdquo;
              </p>

              <p>
                The problem, as Covey identified, is that spare moments rarely materialise. And when
                they do, the tradesperson is usually physically tired from site work, mentally
                drained, and not in the right state for focused administrative tasks. The result is
                a growing backlog of unsent invoices, incomplete certificates, and unresponded
                quotes &mdash; all of which have direct financial consequences. The solution is to
                treat admin as a real appointment. Block it on the calendar. Give it a specific,
                recurring time slot. Protect it the same way you would protect a client booking
                &mdash; because it is just as important to your business.
              </p>

              <p>
                Effective admin blocks are specific, time-bounded, and recurring. Rather than a
                vague &ldquo;do admin this week,&rdquo; schedule &ldquo;Monday 7:00&ndash;8:00am:
                clear inbox, confirm today&rsquo;s and tomorrow&rsquo;s jobs, send any overdue
                invoices.&rdquo; Or: &ldquo;Friday 2:00&ndash;4:00pm: write up EICRs from the week,
                send invoices for completed jobs, respond to all outstanding quote requests,
                complete weekly review.&rdquo; The specificity creates accountability; the recurring
                schedule creates habit; and the time-bounding prevents admin from expanding into the
                evening (Parkinson&rsquo;s Law again).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Recommended Admin Blocks for Sole Traders
                </p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li>
                    &bull; <strong>Monday 7:00&ndash;8:00am:</strong> Weekly kick-off &mdash; review
                    plan, confirm jobs, send overdue invoices
                  </li>
                  <li>
                    &bull; <strong>Daily 5:00&ndash;5:30pm:</strong> End-of-day wrap &mdash; photo
                    documentation, quick notes, update job tracker
                  </li>
                  <li>
                    &bull; <strong>Friday 2:00&ndash;4:00pm:</strong> Weekly close &mdash; EICR
                    write-ups, invoicing, weekly review, plan next week
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Visual Scheduling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Visual Scheduling &mdash; Diary, Whiteboard, or App
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A weekly plan that exists only in your head is not a plan &mdash; it is a hope.
                Visual scheduling means externalising your plan so you can see it, refer to it, and
                share it if necessary. The format matters far less than the habit. A paper diary, a
                whiteboard on the kitchen wall, a phone calendar app, a spreadsheet, or a dedicated
                job management application &mdash; any of these work, provided you use it
                consistently. The purpose is the same: to make abstract commitments concrete and
                visible, reducing the cognitive load of holding the entire schedule in your head.
              </p>

              <p>
                <strong>Paper diaries</strong> remain popular with tradespeople for good reason:
                they are fast, tactile, never run out of battery, and provide an at-a-glance weekly
                view that is difficult to replicate on a phone screen. A week-to-view diary lets you
                see Monday through Friday in one spread, with each day divided into time blocks. The
                disadvantage is that paper diaries cannot send reminders, cannot be shared, and are
                lost if the diary is lost. <strong>Phone calendar apps</strong> offer reminders,
                portability, and the ability to share with a partner or business colleague. The
                disadvantage is the small screen, which makes it harder to see the full week at
                once.
                <strong>Whiteboards</strong> provide the ultimate at-a-glance visibility &mdash;
                many tradespeople keep a weekly whiteboard in their home office or kitchen, updating
                it on Sunday evening. The disadvantage is that the whiteboard stays at home; you
                need a complementary mobile tool for on-the-go reference.
              </p>

              <p>
                The most effective approach for many sole traders is a{' '}
                <strong>hybrid system</strong>: a whiteboard at home for the strategic weekly view
                (visible every morning and evening), combined with a phone calendar for day-to-day
                reference and reminders. The whiteboard answers the question &ldquo;What does my
                week look like?&rdquo; while the phone calendar answers &ldquo;Where am I supposed
                to be in 2 hours?&rdquo; Together, they provide complete coverage without
                complexity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: A Well-Planned Week
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Monday: 7:00&ndash;8:00am admin block (invoicing, confirmations).
                  8:30am&ndash;1:00pm domestic rewire second fix (Henderson). 1:30&ndash;5:00pm
                  consumer unit change (Peterson, 3 hours + 1.5 hours buffer). Tuesday:
                  8:00am&ndash;4:00pm commercial containment job (day 2 of 3). Wednesday:
                  8:00&ndash;11:30am domestic fault-find (2 hours + buffer). 12:00&ndash;1:00pm
                  merchant run. 1:30&ndash;4:00pm flex time (available for overrun, quoting, or
                  small callback). Thursday: 8:00am&ndash;4:30pm commercial containment day 3.
                  Friday: 8:00am&ndash;12:00pm domestic EV charger installation. 2:00&ndash;4:00pm
                  admin block (EICR write-ups, invoicing, weekly review &amp; next week planning).
                  Two domestic jobs per day maximum, buffer on every job, admin protected, flex time
                  built in.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Daily Adaptation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Daily Adaptation &mdash; Responding to the Real World
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                No weekly plan survives contact with reality unchanged. Jobs overrun, clients
                cancel, emergencies arise, and weather disrupts outdoor work. The purpose of the
                weekly plan is not to create a rigid schedule that breaks under pressure &mdash; it
                is to create a framework that can bend without breaking. Covey&rsquo;s formula is{' '}
                <strong>&ldquo;organise weekly, adapt daily&rdquo;</strong> &mdash; the weekly plan
                provides direction, and daily adaptation provides flexibility.
              </p>

              <p>
                Daily adaptation means spending 5 minutes each morning reviewing the day ahead:
                confirming that today&rsquo;s jobs are still on track, checking for messages that
                affect the schedule, and making any necessary adjustments. If yesterday&rsquo;s job
                overran and this morning&rsquo;s job needs to be pushed back by an hour, that
                decision is made proactively at 6:30am rather than reactively at 8:15am when you are
                already late. Proactive communication &mdash; calling the client to adjust the
                arrival time before they start waiting &mdash; builds trust, even when the news is
                not ideal.
              </p>

              <p>
                The daily adaptation also captures learning for future planning. If a consumer unit
                change took 5 hours instead of the estimated 4 (even with buffer), record that data.
                Over time, your estimates become more accurate because they are based on reality
                rather than optimism. This connects directly to Kahneman&rsquo;s reference class
                forecasting: your future weekly plans become progressively more realistic because
                they are built on actual historical data rather than hopeful projections.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">5-Minute Morning Review</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Check messages:</strong> Any cancellations, changes, or new requests
                      overnight?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Confirm the plan:</strong> Are today&rsquo;s jobs still on track? Any
                      adjustments needed?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Materials check:</strong> Is everything loaded for today&rsquo;s jobs?
                      Anything missing?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Communicate:</strong> If anything has changed, contact affected
                      clients now, not later.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established weekly planning and job scheduling as the practical
                backbone of time management for tradespeople. The key points are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The week is the optimal planning horizon</strong> (Covey, 1994). It
                    balances strategic breadth with tactical specificity. Organise weekly, adapt
                    daily.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>20&ndash;30 minutes per week</strong> for the scheduling session &mdash;
                    Sunday evening or Friday afternoon, at the same time every week.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Buffer time (20% minimum)</strong> on every job absorbs the inevitable
                    complications without cascading into subsequent commitments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Admin blocks</strong> are real appointments. Without them, invoices,
                    certificates, and quotes accumulate into a stressful, costly backlog.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>2 substantive domestic jobs per day</strong> is a realistic maximum when
                    travel, buffer, and admin are factored in.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Visual scheduling</strong> (diary, whiteboard, app, or hybrid) makes
                    abstract commitments concrete, visible, and manageable.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Reference:</strong> Stephen Covey,{' '}
                  <em>First Things First</em> (1994). Whillans, Dunn, Smeets, Bekkers &amp; Norton,
                  &ldquo;Buying Time Promotes Happiness,&rdquo;{' '}
                  <em>Proceedings of the National Academy of Sciences</em>, 2017.
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
            <Link to="../tmo-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-2-section-3">
              Next: Quoting, Estimating &amp; Time Allocation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
