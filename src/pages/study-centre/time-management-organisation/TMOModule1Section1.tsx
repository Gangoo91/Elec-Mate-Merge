import { ArrowLeft, Search, CheckCircle } from 'lucide-react';
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
    id: 'tmo-1-1-check1',
    question:
      "An electrician schedules 2 hours for a consumer unit change but has no follow-up job until late afternoon. According to Parkinson's Law, what is the most likely outcome?",
    options: [
      'The job will be completed in under 2 hours because there is no pressure',
      'The job will expand to fill the available time, likely taking most of the afternoon',
      'The electrician will use the spare time to prospect for new clients',
      "Parkinson's Law only applies to office-based work, not trades",
    ],
    correctIndex: 1,
    explanation:
      "Parkinson's Law states that work expands to fill the time available for its completion. Without a firm deadline or a next appointment creating urgency, the consumer unit change will naturally stretch — the electrician might take longer over tidying, additional tea breaks, checking social media, or over-perfecting the labelling. Scheduling a follow-up job or setting a personal deadline creates the constraint that prevents expansion.",
  },
  {
    id: 'tmo-1-1-check2',
    question:
      'A self-employed sparky consistently quotes 1 day for a bathroom rewire but it always takes 1.5 days. According to Kahneman and Tversky, what cognitive bias is at work?',
    options: [
      'Confirmation bias — they only remember the fast jobs',
      'The planning fallacy — systematic underestimation of time required for future tasks',
      'The Dunning-Kruger effect — they overestimate their own competence',
      'Anchoring bias — they are anchored to an arbitrary price rather than time',
    ],
    correctIndex: 1,
    explanation:
      'The planning fallacy, identified by Daniel Kahneman and Amos Tversky in 1979, describes our persistent tendency to underestimate the time, cost, and risk of future actions whilst overestimating their benefits. The electrician focuses on the best-case scenario (smooth run, no complications) rather than the realistic average that includes snagging, unforeseen issues, and interruptions. The fix is to use "reference class forecasting" — basing estimates on how long similar jobs have actually taken in the past, not how long you hope this one will take.',
  },
  {
    id: 'tmo-1-1-check3',
    question:
      'After completing a 3-day time audit, an electrician discovers they spend 90 minutes per day on their phone (social media, WhatsApp, browsing). Over a 5-day working week, how many productive hours is this costing them?',
    options: [
      '5 hours per week',
      '7.5 hours per week — almost a full working day',
      '3 hours per week',
      '10 hours per week',
    ],
    correctIndex: 1,
    explanation:
      '90 minutes per day multiplied by 5 working days equals 450 minutes, which is 7.5 hours — almost an entire working day lost every week to phone use. Over a month, that is approximately 30 hours. Over a year, it is roughly 375 hours — equivalent to more than 9 full working weeks. This is why time auditing is so powerful: most people have no idea how much time these "small" habits actually consume until they measure them objectively.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long should I track my time for a useful audit?',
    answer:
      'A minimum of 3 working days gives you enough data to spot patterns, but 5 days (a full working week) is ideal. The first day of tracking is often unrepresentative because you are conscious of being observed — even by yourself — and tend to behave better than normal. By day 3, you have usually fallen back into your habitual patterns, which is exactly what you need to capture. Track in 30-minute blocks at minimum; 15-minute blocks give finer detail. The key is consistency: log every block honestly, including time spent on your phone, waiting, or doing nothing productive.',
  },
  {
    question: "Is Parkinson's Law really a scientific law?",
    answer:
      'No, it is not a scientific law in the same sense as the laws of physics. Cyril Northcote Parkinson first articulated it in a 1955 essay in The Economist, originally as a satirical observation about bureaucratic expansion in the British Civil Service. However, the principle has been consistently supported by psychological research into goal-setting, deadline effects, and task completion. Studies show that tasks with tighter (but realistic) deadlines are completed faster without a drop in quality, while tasks with excessive time allowances expand through procrastination, over-refinement, and reduced focus. In practical terms, it is one of the most reliable observations about human work behaviour.',
  },
  {
    question: 'What is the difference between the planning fallacy and just being a bad estimator?',
    answer:
      'The planning fallacy is not about individual skill — it is a universal cognitive bias. Kahneman and Tversky demonstrated that even experts systematically underestimate completion times for tasks they have performed many times before. The bias occurs because people plan based on the best-case scenario (an "inside view" of the specific task) rather than on statistical evidence from similar past tasks (an "outside view" or "reference class"). Being a bad estimator implies it is a personal failing that can be fixed with more experience. The planning fallacy shows that experience alone does not fix the problem — you need to actively use historical data and build in contingency buffers.',
  },
  {
    question: 'I am self-employed and my time is my own — does time management still matter?',
    answer:
      "It matters more, not less. When you work for an employer, the structure of the working day is largely imposed from outside — start times, break times, deadlines, and supervision create natural time boundaries. When you are self-employed, all of those boundaries disappear. You have to create them yourself. Without deliberate time management, self-employed tradespeople are particularly vulnerable to Parkinson's Law (no external deadlines), the planning fallacy (no one checking your estimates), and hidden time sinks (no accountability for social media use). The most profitable self-employed electricians are almost always the best time managers — not the best electricians.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "Parkinson's Law, first published in 1955, states that:",
    options: [
      'Work contracts when deadlines are tight, leading to errors',
      'Work expands to fill the time available for its completion',
      'Productivity is highest in the first hour of any task',
      'Complex tasks always take twice as long as simple tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Cyril Northcote Parkinson observed that work expands to fill the time available for its completion. Originally a satirical observation about bureaucracy, it has been consistently validated by research. For tradespeople, this means that a job with no firm end-point (no next appointment, no client deadline) will naturally stretch through procrastination, over-refinement, and reduced urgency.',
  },
  {
    id: 2,
    question: 'The planning fallacy, identified by Kahneman and Tversky (1979), describes:',
    options: [
      'The tendency to overestimate how long tasks will take',
      'The tendency to plan too far in advance',
      'The systematic underestimation of the time, cost, and risk of future tasks',
      'The inability to make plans under pressure',
    ],
    correctAnswer: 2,
    explanation:
      'The planning fallacy is a cognitive bias in which people underestimate the time required to complete future tasks, even when they have experience of similar tasks taking longer than expected. It occurs because we tend to focus on the specific task ahead (the "inside view") and imagine the best-case scenario, rather than consulting base rates from past similar tasks (the "outside view"). The fix is reference class forecasting — using actual historical data rather than optimistic projections.',
  },
  {
    id: 3,
    question: 'A time audit involves:',
    options: [
      'Asking your colleagues how they think you spend your time',
      'Estimating at the end of the week how many hours you worked',
      'Systematically recording how you actually spend each block of your working day over several days',
      'Timing individual tasks with a stopwatch to find the fastest method',
    ],
    correctAnswer: 2,
    explanation:
      'A time audit is a deliberate, systematic record of how you actually spend your time — typically tracked in 30-minute blocks over 3 to 5 working days. The critical word is "actually" — the purpose is to capture reality, not aspiration. Most people discover significant discrepancies between how they think they spend their time and how they actually spend it. Estimation from memory (option B) is unreliable due to recall bias; a real-time log is essential.',
  },
  {
    id: 4,
    question:
      'Which of the following is an example of a "hidden time sink" specific to tradespeople?',
    options: [
      'Completing an EICR that the client has booked and paid for',
      'Driving 45 minutes to a merchant for a single fitting that could have been ordered the day before',
      'Attending a mandatory safety briefing on a commercial site',
      'Testing a circuit after completing an installation',
    ],
    correctAnswer: 1,
    explanation:
      'Hidden time sinks are activities that consume time without adding proportional value. Driving to a merchant for a single fitting is a classic trade-specific time sink — the round trip might cost 90 minutes including parking and queuing, for a part worth a few pounds. Ordering the day before (or keeping common fittings stocked in the van) eliminates this waste. The other options — EICRs, safety briefings, testing — are productive, value-adding activities that are necessary parts of the work.',
  },
  {
    id: 5,
    question:
      'An electrician believes their typical day is: 7 hours on-site working, 30 minutes driving, 30 minutes admin. After a time audit, the reality is: 4.5 hours productive work, 2 hours driving, 1 hour phone/social media, 30 minutes admin. What does this demonstrate?',
    options: [
      'That the electrician is lazy and should work harder',
      'That time audits are unreliable because people change their behaviour when tracking',
      'That there is a significant gap between perceived time use and actual time use, revealing areas for improvement',
      'That 4.5 hours of productive work is the maximum achievable in a day',
    ],
    correctAnswer: 2,
    explanation:
      'This demonstrates the core principle of time auditing: most people have a significant gap between how they believe they spend their time and how they actually spend it. The electrician perceived 7 hours of productive work but the reality was 4.5 hours. This is not about laziness — it is about awareness. The 2 hours of driving and 1 hour of phone use represent actionable improvement areas. Better route planning could save driving time; setting phone boundaries could recover productive hours.',
  },
  {
    id: 6,
    question:
      'According to the concept of "activity vs accomplishment," which of the following is an example of being busy but not productive?',
    options: [
      'Completing and submitting 3 electrical installation certificates',
      'Spending 2 hours reorganising your van when you have 2 quoted jobs waiting',
      'Carrying out a full EICR on a commercial property',
      'Installing a new consumer unit and testing all circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Reorganising the van when revenue-generating work is waiting is a perfect example of being busy but not productive. The van reorganisation feels like work — it is physical, it takes effort, and it produces a visible result. But it is not moving the business forward: the quoted jobs generate income, build client relationships, and create referral opportunities. Activity is about being in motion; accomplishment is about making progress on what actually matters.',
  },
  {
    id: 7,
    question:
      "To counteract Parkinson's Law on a day with only one job booked, the best strategy is:",
    options: [
      'Start the job as late as possible to fill the day',
      'Set an artificial but realistic completion deadline and schedule a productive follow-up activity',
      'Work as slowly as possible to ensure maximum quality',
      'Spend the extra time on social media as a reward',
    ],
    correctAnswer: 1,
    explanation:
      "Setting an artificial deadline creates the constraint that Parkinson's Law requires. If you know the job should take 3 hours, set a target of finishing by noon and schedule a follow-up activity (quoting a new job, restocking, admin, or prospecting) for the afternoon. The deadline creates urgency without pressure, and the follow-up activity ensures the recovered time is spent productively rather than being absorbed by the original task.",
  },
  {
    id: 8,
    question: 'Reference class forecasting, the antidote to the planning fallacy, involves:',
    options: [
      'Asking a colleague how long they think the job will take',
      'Adding 10% to every estimate as a standard buffer',
      'Basing time estimates on how long similar jobs have actually taken in the past, rather than on optimistic projections for the current job',
      'Using software to generate automatic time estimates',
    ],
    correctAnswer: 2,
    explanation:
      'Reference class forecasting was proposed by Daniel Kahneman as the primary corrective for the planning fallacy. Instead of estimating from the "inside view" (imagining the best-case scenario for this specific task), you take the "outside view" — looking at how long a reference class of similar tasks has actually taken in the past. For an electrician, this means checking your records: "The last 5 bathroom rewires took an average of 1.5 days, so this one should be quoted at 1.5 days, not the 1 day I am optimistically imagining."',
  },
];

export default function TMOModule1Section1() {
  useSEO({
    title: 'Where Does Your Time Go? | Time Management & Organisation Module 1.1',
    description:
      "Time audits, Parkinson's Law, the planning fallacy, hidden time sinks for tradespeople, and practical strategies to reclaim lost hours.",
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
            <Search className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Where Does Your Time Go?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Time audits, the busy-but-not-productive trap, Parkinson&rsquo;s Law, hidden time sinks
            for tradespeople, and the planning fallacy
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Time audits</strong> reveal massive gaps between perceived and actual time
                use
              </li>
              <li>
                <strong>Parkinson&rsquo;s Law:</strong> Work expands to fill the time available
              </li>
              <li>
                <strong>Planning fallacy:</strong> We consistently underestimate how long tasks take
              </li>
              <li>
                <strong>Key insight:</strong> Activity is not the same as accomplishment
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Profit:</strong> Lost time is lost income &mdash; especially for
                self-employed tradespeople
              </li>
              <li>
                <strong>Reputation:</strong> Overrunning on jobs damages client trust and referrals
              </li>
              <li>
                <strong>Wellbeing:</strong> Poor time management creates unnecessary stress and long
                hours
              </li>
              <li>
                <strong>Growth:</strong> You cannot improve what you do not measure
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Conduct a time audit by tracking your working day in 30-minute blocks',
              'Explain the difference between activity (being busy) and accomplishment (being productive)',
              "Describe Parkinson's Law and apply it to construction work scenarios",
              'Identify hidden time sinks specific to tradespeople and construction',
              'Explain the planning fallacy and use reference class forecasting to improve estimates',
              'Design a practical time-logging exercise for 3 typical working days',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Time Audit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Time Audit &mdash; Seeing Your Day as It Really Is
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A time audit is the single most powerful first step in improving how you manage your
                time. The concept is simple: for a set period (typically 3 to 5 working days), you
                record how you spend every block of your day &mdash; usually in 30-minute
                increments. You write down what you were actually doing in each block, not what you
                planned to do or what you think you should have been doing. The purpose is to
                capture reality.
              </p>

              <p>
                The reason time audits are so effective is that human beings are remarkably poor at
                estimating how they spend their time. Research consistently shows that people
                overestimate the time they spend on productive work and underestimate the time
                consumed by interruptions, transitions, and low-value activities. A 2019 study by
                RescueTime found that the average worker has only 2 hours and 48 minutes of
                genuinely productive time per 8-hour working day. The remaining 5 hours and 12
                minutes are absorbed by meetings, email, social media, context switching, and other
                non-core activities.
              </p>

              <p>
                For tradespeople, the discrepancy can be even more striking. An electrician might
                believe they spend 7 hours a day on productive, billable work. The time audit often
                reveals a different picture: 4 to 5 hours of actual hands-on work, with the
                remainder consumed by driving, waiting for materials, phone calls, searching for
                tools or fittings in the van, social media, tea breaks that stretch longer than
                intended, and conversations that are not work-related. None of these activities are
                inherently wrong &mdash; but until you measure them, you cannot make informed
                decisions about where to recover time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Example</p>
                <p className="text-sm text-white leading-relaxed">
                  A domestic electrician tracked 3 working days and discovered the following average
                  daily breakdown: 4.5 hours hands-on work, 1.5 hours driving, 45 minutes phone
                  calls and WhatsApp, 30 minutes searching for parts in the van, 20 minutes at the
                  merchant, 25 minutes on social media. The electrician had estimated 6.5 hours of
                  productive work. The real figure was 4.5 hours &mdash; a gap of 2 hours per day,
                  or 10 hours per week. That is more than an entire working day lost every week to
                  activities the electrician was not even aware of.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Activity vs Accomplishment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The &ldquo;Busy but Not Productive&rdquo; Trap
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a crucial distinction between <strong>activity</strong> and{' '}
                <strong>accomplishment</strong>. Activity is motion &mdash; it is doing things,
                staying busy, filling the day with tasks. Accomplishment is progress &mdash; it is
                completing work that moves you towards your goals, generates income, or delivers
                value. The two are not the same, and confusing them is one of the most common
                productivity traps in any profession.
              </p>

              <p>
                In construction, the trap is particularly seductive because physical work{' '}
                <em>feels</em> productive. Reorganising the van, cleaning tools, sorting cable
                offcuts, redoing a label that was already perfectly legible &mdash; all of these
                feel like work. They involve physical effort and produce a visible result. But if
                you spend 2 hours reorganising your van when you have two quoted jobs waiting for
                scheduling, you have been active but not accomplished. The van reorganisation could
                have been done on a Saturday morning; the quoted jobs represent income, client
                relationships, and business growth.
              </p>

              <p>
                Author Tim Ferriss describes this as &ldquo;being busy to avoid doing the important
                but uncomfortable&rdquo; &mdash; and it is a behaviour pattern that most people
                recognise once it is pointed out. The urgent question is not &ldquo;Am I
                busy?&rdquo; but &ldquo;Am I busy doing the right things?&rdquo; A time audit forces
                you to confront this question with data rather than assumption.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Busy Electrician Test</p>
                <p className="text-sm text-white leading-relaxed">
                  Ask yourself: at the end of today, what did I actually <strong>accomplish</strong>
                  ? Not what did I do, but what did I accomplish? If you were busy all day but
                  cannot point to a completed job, a sent quote, a booked appointment, or a tangible
                  deliverable, you may have fallen into the activity trap. Busyness is not a badge
                  of honour &mdash; it is often a symptom of poor prioritisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Parkinson's Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Parkinson&rsquo;s Law &mdash; Why Work Stretches to Fill the Time
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1955, British naval historian <strong>Cyril Northcote Parkinson</strong>{' '}
                published an essay in <em>The Economist</em> that would become one of the most cited
                observations in management science. His opening sentence has become famous:{' '}
                <strong>
                  &ldquo;Work expands so as to fill the time available for its completion.&rdquo;
                </strong>
              </p>

              <p>
                Parkinson was originally satirising the growth of the British Civil Service,
                observing that the number of Admiralty officials increased even as the number of
                ships in the Royal Navy decreased. But the principle he identified applies far
                beyond bureaucracy. It describes a universal tendency in human work behaviour: when
                we have more time available for a task, we unconsciously expand the work to fill
                that time. We do not deliberately choose to work slowly &mdash; instead, we add
                unnecessary steps, over- refine details, procrastinate on starting, take longer
                breaks, and allow distractions in.
              </p>

              <p>
                For tradespeople, Parkinson&rsquo;s Law is visible every day. Consider a first fix
                that should take 2 hours. If the electrician has a second job booked for 11:00, the
                first fix will be completed by 10:30 with time to pack up and drive. But if the
                electrician has no second job and the entire day is free, that same 2-hour first fix
                often stretches to 3 or 4 hours. The work itself has not changed &mdash; the
                available time has. And the work has expanded to fill it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Parkinson&rsquo;s Law Framework
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Work expands so as to fill the time available for its completion.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Cyril Northcote Parkinson, <em>The Economist</em>, 1955
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> If you give a task 4 hours, it will take 4
                  hours. If you give the same task 2 hours, it will take 2 hours. Setting tighter
                  (but realistic) deadlines is one of the simplest and most effective productivity
                  strategies available.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Examples</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Consumer unit change:</strong> Normally takes 3 hours. With a clear
                      afternoon and no follow-up, it takes 5 hours. The additional 2 hours are
                      absorbed by slower working, perfectionist labelling, an extra trip to the van,
                      and a 30-minute phone call that could have waited.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Quoting:</strong> A domestic quote takes 20 minutes to write up. With
                      no deadline, it sits on the dashboard for 3 days. With a self-imposed rule of
                      &ldquo;quotes sent same day,&rdquo; it gets done that evening.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Admin:</strong> End-of-week paperwork takes 45 minutes when done on
                      Friday afternoon with a dinner booking at 7. The same paperwork takes 2.5
                      hours on a quiet Saturday with nothing planned.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Hidden Time Sinks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Hidden Time Sinks for Tradespeople
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every profession has its own particular time sinks &mdash; activities that consume
                disproportionate amounts of time relative to the value they produce. For
                electricians and tradespeople, the most common hidden time sinks are not the ones
                you might expect. They are rarely the big, obvious problems. Instead, they are
                small, habitual behaviours that accumulate silently across the week.
              </p>

              <p>
                <strong>Driving between jobs</strong> is often the single largest time sink for
                domestic electricians. Poor job sequencing &mdash; zigzagging across a city rather
                than grouping jobs by area &mdash; can easily add 60 to 90 minutes of unnecessary
                driving per day. An electrician with two domestic jobs in the same postcode area
                might spend 15 minutes driving between them. An electrician with the same two jobs
                on opposite sides of the city might spend 90 minutes. The work is identical; the
                travel time is six times greater.
              </p>

              <p>
                <strong>Waiting for materials</strong> is another major drain. Making an unplanned
                trip to the merchant mid-job can consume 45 minutes to an hour including the drive,
                parking, queuing, and finding the part. If this happens twice a week, it represents
                nearly 2 hours of lost productive time. Stocking common fittings in the van,
                pre-ordering materials the evening before, and checking the job scope before leaving
                home can eliminate most of these trips.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Hidden Time Sinks</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Phone and social media:</strong> The average person checks their phone
                      150 times per day. Even 2-minute checks add up: 150 checks at 2 minutes each
                      is 5 hours. For tradespeople, WhatsApp groups, trade forums, and Instagram can
                      easily consume 60 to 90 minutes of the working day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Searching for tools and fittings:</strong> A disorganised van costs
                      time every single day. Spending 5 minutes looking for a specific fitting seems
                      trivial, but if it happens 6 times a day, that is 30 minutes &mdash; 2.5 hours
                      per week &mdash; spent rummaging.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Re-work from poor planning:</strong> Starting a job without fully
                      understanding the scope leads to mistakes, incorrect material orders, and
                      return visits. A 15-minute pre-job review can save hours of re-work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Unstructured phone calls:</strong> Client calls that should take 3
                      minutes stretch to 15 because there is no agenda. Calls from suppliers,
                      colleagues, and family during working hours fragment concentration.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Example</p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician drives 45 minutes from a morning job in the north of the city to an
                  afternoon job in the south, passing within 10 minutes of their home on the way.
                  The next day, they have a job back in the north. By grouping the two northern jobs
                  on the same day and the southern job on a different day, they could save 70
                  minutes of driving. Over a month, better route planning like this can recover an
                  entire working day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Planning Fallacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Planning Fallacy &mdash; Why Your Estimates Are Always Wrong
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1979, Nobel Prize-winning psychologist <strong>Daniel Kahneman</strong> and his
                research partner <strong>Amos Tversky</strong> identified a cognitive bias they
                called the <strong>planning fallacy</strong>: the systematic tendency to
                underestimate the time, cost, and risk of future actions, while simultaneously
                overestimating their benefits. This is not occasional poor judgement &mdash; it is a
                consistent, predictable pattern of error that affects everyone, including experts.
              </p>

              <p>
                The planning fallacy occurs because people naturally adopt what Kahneman calls the{' '}
                <strong>&ldquo;inside view&rdquo;</strong> when estimating. They focus on the
                specific task in front of them and imagine the best-case scenario: no interruptions,
                no complications, no missing materials, no difficult access, no callbacks. They
                essentially plan for the perfect run. The problem is that perfect runs are rare.
                Real work involves unforeseen complications, interruptions, forgotten tools,
                difficult clients, and a dozen other factors that extend the actual time required.
              </p>

              <p>
                The corrective is what Kahneman calls the{' '}
                <strong>&ldquo;outside view&rdquo;</strong> or{' '}
                <strong>reference class forecasting</strong>: instead of imagining how this specific
                task will go, you look at how a class of similar tasks has actually gone in the
                past. For an electrician, this means checking your records. If the last 5 full
                rewires you completed each took 4 days (not the 3 days you quoted), then the next
                rewire should be quoted at 4 days. Your optimistic projection of 3 days is
                consistently wrong; the historical average of 4 days is far more reliable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Planning Fallacy Framework
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    People underestimate the time required for tasks even when they have completed
                    identical tasks before and know they took longer than expected.
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Daniel Kahneman &amp; Amos Tversky, 1979
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The fix:</strong> Use reference class forecasting. Base your estimates on
                  actual data from past similar jobs, not on optimistic projections for the current
                  one. Add a contingency buffer of 20&ndash;30% for unexpected complications.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Application: The Quote That Always Overruns
                </p>
                <p className="text-sm text-white leading-relaxed">
                  A self-employed electrician quotes 1 day for every bathroom rewire. Every single
                  bathroom rewire takes 1.5 days. Yet the next quote is still for 1 day. This is the
                  planning fallacy in action: the electrician imagines the best-case scenario (clear
                  access, modern wiring, no surprises) rather than the realistic average (old wiring
                  routes, asbestos checks, unexpected junctions, client changes mid-job). The fix is
                  simple but requires discipline: record actual completion times for every job type,
                  and use that data &mdash; not optimism &mdash; to generate future quotes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Time Logging Exercise */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            The Time Logging Exercise &mdash; Your 3-Day Challenge
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Theory without application is wasted. The most important action you can take after
                reading this section is to complete a personal time audit. This is a 3-day exercise
                that will give you hard data on where your time actually goes. Most people who
                complete this exercise describe it as an eye-opening experience &mdash; and many say
                it was the single most impactful productivity intervention they have ever tried.
              </p>

              <p>
                The method is straightforward. Choose 3 typical working days (not unusually quiet or
                unusually hectic days). From the moment you start work to the moment you finish, log
                every 30-minute block with a brief note of what you were doing. Be ruthlessly
                honest. If you spent 20 minutes scrolling Instagram in the van, write it down. If
                you took a 45-minute tea break, write it down. If you drove 40 minutes to collect a
                single bag of cable clips, write it down. The only person who will see this log is
                you, so there is no value in editing reality.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Time Audit Categories for Tradespeople
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Billable/productive work:</strong> Hands-on installation, testing,
                      inspection, commissioning &mdash; the work you are being paid to do.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Necessary non-billable:</strong> Driving to jobs, collecting
                      materials, admin, quoting, invoicing &mdash; essential but not directly
                      income-generating.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Low-value/waste:</strong> Unnecessary merchant trips, excessive social
                      media, extended breaks, searching for tools, waiting without a backup task,
                      re-work caused by poor planning.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                After 3 days, total the time in each category. Most tradespeople find that billable
                work accounts for 50&ndash;60% of their day, necessary non-billable work accounts
                for 20&ndash;25%, and the remaining 15&ndash;30% falls into the low-value category.
                That last category is your opportunity. Even recovering half of that time &mdash;
                turning just 1 wasted hour per day into productive work &mdash; represents 5
                additional hours per week, 20 hours per month, or roughly 250 hours per year. At an
                average charge-out rate, that is a significant amount of additional revenue.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the foundation for understanding where your time
                actually goes. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Time audits reveal the truth.</strong> Most tradespeople have a
                    significant gap between how they think they spend their time and how they
                    actually spend it. You cannot improve what you do not measure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Activity is not accomplishment.</strong> Being busy all day does not
                    mean you were productive. The question is not &ldquo;Was I busy?&rdquo; but
                    &ldquo;Did I accomplish the right things?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Parkinson&rsquo;s Law</strong> (1955) shows that work expands to fill
                    the time available. Setting tighter, realistic deadlines and scheduling
                    follow-up activities are the primary countermeasures.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Hidden time sinks</strong> &mdash; driving, phone use, van
                    disorganisation, unplanned merchant trips, re-work &mdash; can consume 2 or more
                    hours per day without being noticed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The planning fallacy</strong> (Kahneman &amp; Tversky, 1979) explains
                    why we consistently underestimate how long tasks will take. Reference class
                    forecasting &mdash; using actual past data &mdash; is the corrective.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 3-day time audit</strong> is the essential first action. Track your
                    time in 30-minute blocks, categorise the results, and identify your biggest
                    recovery opportunities.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore the
                  Eisenhower Matrix &mdash; a powerful framework for distinguishing between urgent
                  and important tasks. You will learn why most tradespeople spend their days
                  reacting to urgency rather than acting on importance, and how to shift the
                  balance.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../tmo-module-1-section-2">
              Next: The Eisenhower Matrix
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
