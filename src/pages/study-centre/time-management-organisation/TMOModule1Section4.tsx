import { ArrowLeft, ListOrdered, CheckCircle } from 'lucide-react';
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
    id: 'tmo-1-4-check1',
    question:
      "In Covey's Big Rocks metaphor, what happens if you fill the jar with sand and gravel first?",
    options: [
      'The big rocks still fit because the jar is large enough for everything',
      'The big rocks do not fit — the jar is already full of small stuff',
      'The sand and gravel compact under the weight of the big rocks',
      'The metaphor only works for office work, not trades',
    ],
    correctIndex: 1,
    explanation:
      'This is the central lesson of Covey\'s Big Rocks metaphor (from "First Things First," 1994). If you fill your schedule with small, low-priority tasks first (the sand and gravel), there is no room left for the big, important things (the rocks). But if you schedule the big rocks first — your most important tasks, commitments, and goals — the sand and gravel naturally fill in around them. Applied to an electrician\'s week: if you schedule your highest-value jobs, CPD, and planning time first, the small admin tasks and phone calls will fill the gaps. If you start with the small stuff, the important things get squeezed out.',
  },
  {
    id: 'tmo-1-4-check2',
    question:
      "The 80/20 Rule (Pareto Principle) applied to a self-employed electrician's income suggests that:",
    options: [
      '80% of their work is done correctly and 20% has defects',
      '80% of their income comes from roughly 20% of their activities or clients',
      '80% of their time should be spent on admin and 20% on installation',
      'They should work 80% of the week and rest for 20%',
    ],
    correctIndex: 1,
    explanation:
      'The Pareto Principle, originally observed by Italian economist Vilfredo Pareto in 1896 and later applied to productivity by Joseph Juran, states that roughly 80% of results come from 20% of efforts. For a self-employed electrician, this often means that a small proportion of their activities — perhaps EV charger installations, EICR inspections, or a few key commercial clients — generate the majority of their income. Identifying and prioritising that high-value 20% is one of the most powerful productivity strategies available.',
  },
  {
    id: 'tmo-1-4-check3',
    question: 'What is the primary purpose of a "stop doing" list?',
    options: [
      'To identify tasks you should delegate to an apprentice',
      'To create a list of clients you no longer want to work with',
      'To deliberately identify and eliminate low-value activities that consume time without proportionate return',
      'To record all the tasks you have completed each week',
    ],
    correctIndex: 2,
    explanation:
      'A "stop doing" list is the complement to a to-do list. Instead of adding more tasks, it forces you to identify activities that consume time without generating proportionate value — and consciously decide to stop doing them. Jim Collins popularised this concept, arguing that what you choose NOT to do is as important as what you choose to do. For an electrician, this might include: stop taking on small jobs under a certain value, stop making unplanned merchant trips, stop checking social media during installation work, or stop over-perfecting low-value tasks.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I identify my "Big Rocks" when everything feels important?',
    answer:
      'Start by asking: "If I could only accomplish 3 things this week, which 3 would make the biggest difference to my business, career, or life?" These are your Big Rocks. The key word is "biggest difference" — not "most urgent" or "easiest." Often, the Big Rocks are things like completing a high-value job, sending out 5 quotes, having a conversation with a potential commercial client, or completing a CPD module. If everything genuinely feels equally important, it means you have not thought clearly enough about your priorities. Importance is not about how busy a task makes you feel — it is about the impact it has on your goals.',
  },
  {
    question: 'Does the 80/20 Rule mean I should only do 20% of my current work?',
    answer:
      'No. The 80/20 Rule does not mean you should ignore 80% of your tasks. It means you should identify the 20% that generates the most value and ensure those tasks get your best time, energy, and attention. The remaining 80% still needs to be done — but it should not receive disproportionate time or be allowed to crowd out the high-value 20%. For a self-employed electrician, this might mean prioritising EV charger installations (high margin) over minor socket additions (low margin), or investing time in client relationships that generate repeat business rather than one-off price-sensitive clients.',
  },
  {
    question: 'What if my employer sets my priorities and I have no control?',
    answer:
      'Even in an employed role where your work is directed by others, you still control how you organise your time within that framework. You choose the order in which you tackle tasks. You choose how much time you spend on breaks versus productive work. You choose whether to plan your day or react to it. You choose whether to invest in your skills and development. The MIT framework (pick 3 Most Important Tasks each day) works just as well for an employed electrician as a self-employed one — the only difference is that your MITs might be set by your employer rather than chosen by you. But you still choose to prioritise them over lower-value distractions.',
  },
  {
    question: 'How often should I review my priorities?',
    answer:
      'The recommended rhythm is: daily MIT selection (pick your 3 Most Important Tasks each morning or the evening before), weekly priority review (30 minutes on Sunday evening or Monday morning to plan the week, identify Big Rocks, and schedule key tasks), and quarterly strategic review (a longer session to evaluate whether your priorities are aligned with your longer-term goals). The weekly review is the most important of these three. It is the habit that bridges the gap between daily task management and long-term goal achievement. Without it, weeks blur together and important-but-not-urgent work drifts indefinitely.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "Covey's Big Rocks metaphor teaches that you should:",
    options: [
      'Start with the smallest tasks to build momentum',
      'Schedule your most important commitments first, then let smaller tasks fill the remaining gaps',
      'Eliminate all small tasks so you only have big ones',
      'Work on tasks in the order they arrive, regardless of importance',
    ],
    correctAnswer: 1,
    explanation:
      'The Big Rocks metaphor, from Stephen Covey\'s "First Things First" (1994), demonstrates that if you put the big rocks (most important tasks) into the jar first, the sand and gravel (smaller tasks) will naturally fill the gaps around them. But if you fill the jar with sand first, the big rocks will not fit. Applied to time management: schedule your highest-priority work first, and let less important tasks fill the remaining time.',
  },
  {
    id: 2,
    question: 'The Pareto Principle (80/20 Rule) was originally observed by:',
    options: [
      'Stephen Covey in "The 7 Habits of Highly Effective People" (1989)',
      'Vilfredo Pareto, who noticed that 80% of land in Italy was owned by 20% of the population (1896)',
      'Daniel Kahneman in his research on cognitive biases (1979)',
      'Cyril Northcote Parkinson in his essay on bureaucratic expansion (1955)',
    ],
    correctAnswer: 1,
    explanation:
      'Italian economist Vilfredo Pareto first observed in 1896 that approximately 80% of the land in Italy was owned by 20% of the population. This distribution pattern was later found to apply across many domains — business revenue, software bugs, customer complaints, and productivity. Joseph Juran, the management consultant, applied it to business productivity in the 1940s, coining the phrase "the vital few and the trivial many."',
  },
  {
    id: 3,
    question: 'The MIT (Most Important Tasks) method involves:',
    options: [
      'Completing as many tasks as possible each day to maximise output',
      'Selecting 3 tasks each day that, if completed, would make the day a success',
      'Working only on tasks that take less than 5 minutes',
      'Delegating all tasks except the most complex one',
    ],
    correctAnswer: 1,
    explanation:
      'The MIT method is a daily prioritisation technique. Each morning (or the evening before), you identify 3 tasks that are the Most Important for that day. These are the tasks that, if you accomplished nothing else, would make the day a success. You tackle these first, before checking email, messages, or lower-priority work. The power of MITs is their simplicity: instead of a 20-item to-do list that creates decision fatigue, you have a clear, achievable focus for the day.',
  },
  {
    id: 4,
    question: 'Applied to a self-employed electrician, the 80/20 Rule suggests:',
    options: [
      'They should work only 20% of the week and take 80% off',
      'They should identify the 20% of activities that generate 80% of their income and prioritise those',
      'They should spend 80% of their time on marketing and 20% on installation',
      'They should subcontract 80% of their work to others',
    ],
    correctAnswer: 1,
    explanation:
      'For a self-employed electrician, the 80/20 Rule means identifying the activities, job types, and client relationships that generate the majority of income and prioritising them. This might mean: EV charger installations are 20% of jobs but 40% of income — prioritise them. Three commercial clients provide 60% of work — nurture those relationships. EICR inspections have the highest hourly rate — schedule more of them. The remaining activities still need to be done, but they should not crowd out the high-value 20%.',
  },
  {
    id: 5,
    question: 'A "stop doing" list is:',
    options: [
      'A list of tasks you will stop doing immediately to reduce workload',
      'A deliberate identification of low-value activities that should be eliminated or reduced to free up time for higher-value work',
      'A record of all the mistakes you have made this month',
      'A list of clients you refuse to work for',
    ],
    correctAnswer: 1,
    explanation:
      'A "stop doing" list is the strategic counterpart to a to-do list. Instead of adding tasks, it identifies activities that consume time without proportionate return and marks them for elimination or reduction. Jim Collins emphasised that great organisations (and individuals) are defined as much by what they choose NOT to do as by what they choose to do. For a tradesperson, this might include: stop making unplanned merchant trips, stop accepting jobs below a minimum value, stop checking social media during working hours.',
  },
  {
    id: 6,
    question: 'The key difference between a weekly priority review and a daily to-do list is:',
    options: [
      'A weekly review is longer and therefore better',
      'A to-do list captures everything; a weekly review identifies the few things that matter most and ensures they are scheduled',
      'A to-do list is for employed workers; a weekly review is for the self-employed',
      'There is no meaningful difference — they serve the same purpose',
    ],
    correctAnswer: 1,
    explanation:
      'A daily to-do list captures tasks but does not prioritise them — it treats a phone call and a high-value installation as equally important items to be checked off. A weekly priority review takes a higher-level view: it identifies the Big Rocks for the week, schedules them into the calendar, and ensures that important-but-not-urgent work gets protected time. The to-do list manages tasks; the weekly review manages priorities. Both are useful, but without the weekly review, the to-do list becomes a random collection of activities without strategic direction.',
  },
  {
    id: 7,
    question:
      'An electrician earns most of their income from EV charger installations and EICR inspections, but spends most of their time on small domestic repairs. Applying the 80/20 Rule, they should:',
    options: [
      'Stop doing domestic repairs entirely',
      'Increase their focus on EV installations and EICRs, potentially reducing or delegating lower-value domestic repairs',
      'Charge more for domestic repairs to make them equally profitable',
      'Work longer hours to fit in more of every type of job',
    ],
    correctAnswer: 1,
    explanation:
      'The 80/20 Rule does not necessarily mean eliminating the lower-value 80% entirely, but it does mean recognising where the highest value lies and prioritising accordingly. The electrician should actively seek more EV and EICR work (marketing, client relationships, availability), and consider whether lower-value domestic repairs could be reduced, delegated to a subcontractor or apprentice, or scheduled only when higher-value work is not available. This shifts the business towards its most profitable activities.',
  },
  {
    id: 8,
    question: 'The weekly priority review is best scheduled:',
    options: [
      'On Monday morning at 9am, when the work week starts',
      'On Sunday evening or Friday afternoon — before the work week begins, not during it',
      'On Wednesday, when you are halfway through the week',
      'It does not matter when — just do it whenever you have a spare moment',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly priority review should happen before the work week begins — either Sunday evening or Friday afternoon. This allows you to enter Monday morning with a clear plan, materials checked, routes optimised, and priorities set. If you wait until Monday morning to plan, you have already lost the first hour of the week to planning that should have been done in advance. Friday afternoon is equally effective: you review the week just ended, capture lessons, and plan the week ahead while everything is fresh.',
  },
];

export default function TMOModule1Section4() {
  useSEO({
    title: 'Setting Priorities That Stick | Time Management & Organisation Module 1.4',
    description:
      "Covey's Big Rocks, the 80/20 Rule, Most Important Tasks, the stop-doing list, and building a weekly priority system for tradespeople.",
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
            <ListOrdered className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Setting Priorities That Stick
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Covey&rsquo;s Big Rocks, the 80/20 Rule, Most Important Tasks, the stop-doing list, and
            building a weekly priority system that actually works
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Big Rocks first:</strong> Schedule important things before small things fill
                the gaps
              </li>
              <li>
                <strong>80/20 Rule:</strong> 20% of your activities generate 80% of your results
              </li>
              <li>
                <strong>MITs:</strong> Pick 3 Most Important Tasks each day and do them first
              </li>
              <li>
                <strong>Key insight:</strong> A stop-doing list is as powerful as a to-do list
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Focus:</strong> Knowing your priorities eliminates decision fatigue
              </li>
              <li>
                <strong>Income:</strong> Prioritising high-value work directly increases earnings
              </li>
              <li>
                <strong>Control:</strong> A weekly system replaces daily chaos with deliberate
                action
              </li>
              <li>
                <strong>Balance:</strong> Priorities include rest and personal time, not just work
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain Covey's Big Rocks metaphor and apply it to weekly scheduling",
              'Describe the Pareto Principle (80/20 Rule) and identify your highest-value activities',
              'Use the MIT (Most Important Tasks) method for daily prioritisation',
              'Explain the difference between being busy and being effective',
              'Create a personal stop-doing list of low-value activities to eliminate',
              'Build a weekly priority review habit that bridges daily tasks and long-term goals',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Big Rocks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Covey&rsquo;s Big Rocks &mdash; First Things First
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Stephen Covey</strong>, in <em>First Things First</em> (1994), introduced
                one of the most memorable metaphors in time management literature: the Big Rocks.
                Imagine a glass jar. You have a collection of big rocks, small pebbles, gravel, and
                sand. If you put the sand in first (small, trivial tasks), then the gravel (medium
                tasks), then the pebbles (moderately important tasks), the big rocks will not fit.
                The jar is already full.
              </p>

              <p>
                But if you put the big rocks in first &mdash; your most important commitments, your
                highest-value work, your non-negotiable priorities &mdash; and then add the pebbles,
                gravel, and sand, everything fits. The smaller items fill the gaps around the big
                rocks. The metaphor is simple but the lesson is profound:{' '}
                <strong>
                  if you do not schedule your most important work first, the trivial will expand to
                  fill all available time (Parkinson&rsquo;s Law) and the important will be squeezed
                  out.
                </strong>
              </p>

              <p>
                For an electrician, your Big Rocks might include: the high-value job that generates
                significant income, the 30-minute weekly planning session that organises the entire
                week, the CPD training that keeps your qualifications current, the client follow-ups
                that generate repeat business. These need to be in the calendar first &mdash; with
                protected time that cannot be given away to incoming requests or trivial tasks. The
                sand (admin, minor phone calls, tidying) fills the gaps around them.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Big Rocks Framework</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;The key is not to prioritise what&rsquo;s on your schedule, but to
                    schedule your priorities.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Stephen Covey, <em>First Things First</em> (1994)
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: A Sparky&rsquo;s Big Rocks for the Week
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Rock 1:</strong> Complete the commercial rewire phase 2 (highest-value
                      job, scheduled Monday to Wednesday)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Rock 2:</strong> Send 4 outstanding quotes (income pipeline, scheduled
                      Thursday morning)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Rock 3:</strong> Complete the EV charger CPD module (professional
                      development, scheduled Thursday afternoon)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sand:</strong> Admin, invoicing, van restocking, minor phone calls
                      &mdash; these fill Friday and the gaps between rocks
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 80/20 Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 80/20 Rule &mdash; The Pareto Principle
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1896, Italian economist <strong>Vilfredo Pareto</strong> observed that
                approximately 80% of the land in Italy was owned by 20% of the population. This
                observation turned out to be a pattern that appears across an extraordinary range of
                domains. <strong>Joseph Juran</strong>, the management consultant, applied it to
                business productivity in the 1940s and named it the &ldquo;Pareto Principle.&rdquo;
                In its general form: <strong>roughly 80% of effects come from 20% of causes</strong>
                .
              </p>

              <p>
                Applied to your working life, the 80/20 Rule suggests that approximately 20% of your
                activities generate approximately 80% of your results &mdash; your income, your
                client satisfaction, your professional reputation. The remaining 80% of activities
                generate only about 20% of the results. The numbers are not always exactly 80/20
                &mdash; the point is the principle of asymmetry. Not all activities are equal. A
                small proportion of what you do generates a disproportionate share of your results.
              </p>

              <p>
                The strategic implication is powerful: if you can identify the vital 20% and
                prioritise it, you dramatically increase your effectiveness without working more
                hours. Conversely, if you spread your time equally across all activities, you are
                giving the same attention to low-value tasks as to high-value ones &mdash; which
                means your highest-value work is being underserved.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  80/20 Applied to a Self-Employed Electrician
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>High-value 20%:</strong> EV charger installations (high margin,
                      growing demand), EICR inspections (high hourly rate, repeat business),
                      commercial maintenance contracts (reliable recurring income), key client
                      relationships that generate referrals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Low-value 80%:</strong> Single socket additions (low margin, high
                      travel cost relative to job value), small repairs for price-sensitive one-off
                      clients, admin tasks that could be batched or automated, time spent on social
                      media marketing with no measurable return
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 80/20 Question</p>
                <p className="text-sm text-white leading-relaxed">
                  Ask yourself:{' '}
                  <strong>
                    &ldquo;If I could only do 20% of the things on my list this week, which 20%
                    would generate the most value?&rdquo;
                  </strong>{' '}
                  The answer to that question is your priority list. Everything else is secondary.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Most Important Tasks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            MIT &mdash; Most Important Tasks
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The MIT method is one of the simplest and most effective daily prioritisation
                techniques. Each morning (or the evening before), you identify{' '}
                <strong>3 tasks that are the Most Important for that day</strong>. These are the
                tasks that, if you accomplished nothing else, would make the day a success. You
                write them down. And you tackle them first &mdash; before checking email, before
                responding to messages, before doing any of the small administrative tasks that
                typically consume the start of the day.
              </p>

              <p>
                The power of MITs lies in their simplicity and constraint. A typical to-do list
                might contain 15 or 20 items. Looking at a list that long creates decision fatigue:
                where do you start? Which item is most important? The result is often that you start
                with the easiest or most urgent item rather than the most important one. MITs
                eliminate this problem by forcing you to choose just 3. The constraint itself
                creates clarity.
              </p>

              <p>
                For an electrician, your 3 MITs might be: (1) Complete the consumer unit change at
                the Johnson property, (2) Send the quote for the commercial fit-out, and (3) Order
                materials for next week&rsquo;s rewire. If you accomplish these three things, the
                day has been productive regardless of whatever else happens. If a client calls with
                a non-urgent request, it can wait. If a colleague texts about something trivial, it
                can wait. Your MITs are your priority and they get your best energy, which is
                typically in the first 2 to 4 hours of the working day.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The MIT Rules</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Maximum 3:</strong> More than 3 and the focus benefit is lost. If you
                      have 6 &ldquo;most important&rdquo; tasks, none of them are most important.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Do them first:</strong> Tackle MITs before email, messages, and admin.
                      Your energy and focus are highest at the start of the day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Define &ldquo;done&rdquo;:</strong> Each MIT should have a clear
                      completion point. Not &ldquo;work on the rewire&rdquo; but &ldquo;complete
                      first fix on the upstairs circuits.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Set them the night before:</strong> Choosing MITs the evening before
                      means you start the morning with a clear plan instead of decision fatigue.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Busy vs Effective */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Busy vs Effective &mdash; The Critical Distinction
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                We touched on the distinction between activity and accomplishment in Section 1.
                Here, we expand it into a broader principle: the difference between being{' '}
                <strong>busy</strong> and being <strong>effective</strong>. Busyness is about volume
                &mdash; how many tasks you complete, how many hours you work, how full your schedule
                is. Effectiveness is about impact &mdash; whether the tasks you complete move you
                towards your goals and generate meaningful results.
              </p>

              <p>
                A busy electrician might work 50 hours a week, answer every call immediately, say
                yes to every job, and never turn down a request. They are perpetually active, always
                in motion, never idle. But at the end of the month, their income is no higher than
                it was a year ago, their stress levels are through the roof, and they have not
                completed a single CPD module or followed up with a high-value client.
              </p>

              <p>
                An effective electrician might work 40 hours a week. They prioritise high-margin
                work, schedule their week in advance, protect focused work time, batch their admin,
                and invest time in client relationships and professional development. They say no to
                low-value requests. They are not always in motion &mdash; but every hour is directed
                towards a purpose. At the end of the month, their income is higher, their stress is
                lower, and their business is growing. The difference is not talent or luck &mdash;
                it is prioritisation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Effectiveness Test</p>
                <p className="text-sm text-white leading-relaxed">
                  At the end of each day, ask yourself two questions.{' '}
                  <strong>First: &ldquo;Was I busy today?&rdquo;</strong> (This will almost always
                  be yes.) <strong>Second: &ldquo;Was I effective today?&rdquo;</strong> (This
                  requires honest reflection.) If the answer to the first is yes and the second is
                  no, you have a prioritisation problem, not a work ethic problem. You are working
                  hard on the wrong things.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Stop-Doing List */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Stop-Doing List
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Jim Collins</strong>, author of <em>Good to Great</em>, argued that what
                defines great organisations &mdash; and great individuals &mdash; is not just what
                they choose to do, but what they choose to <strong>stop doing</strong>. Most
                productivity advice focuses on adding new habits, new tools, new systems. The
                stop-doing list takes the opposite approach: it identifies activities that should be
                eliminated.
              </p>

              <p>
                A stop-doing list is not about being lazy or cutting corners. It is about being
                honest with yourself about which activities are consuming time without generating
                proportionate value. It is the counterpart to the to-do list. Where a to-do list
                says &ldquo;here is what I should do,&rdquo; a stop-doing list says &ldquo;here is
                what I should stop doing &mdash; and here is what I will do with the recovered
                time.&rdquo;
              </p>

              <p>
                The exercise is straightforward. Review your time audit data (from Section 1) and
                your Eisenhower Matrix categorisation (from Section 2). Identify Q4 activities that
                should be eliminated entirely. Identify Q3 activities that can be delegated or
                batched. Identify low-value habits that have crept in without conscious decision.
                Write them down. Commit to stopping. And critically: decide what you will do{' '}
                <em>instead</em> with the time you recover. A stop-doing list without a replacement
                plan simply creates a vacuum that fills with new time-wasting activities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Example Stop-Doing List for an Electrician
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Stop:</strong> Checking social media during working hours.{' '}
                      <strong>Instead:</strong> Check during lunch break only.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Stop:</strong> Making unplanned merchant trips.{' '}
                      <strong>Instead:</strong> Check materials the evening before and pre-order
                      online.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Stop:</strong> Accepting jobs below a minimum value of &pound;150.{' '}
                      <strong>Instead:</strong> Refer small jobs to a trusted colleague.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Stop:</strong> Responding to every WhatsApp message immediately.{' '}
                      <strong>Instead:</strong> Batch responses at break times.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Stop:</strong> Over-perfecting cable management in hidden voids.{' '}
                      <strong>Instead:</strong> Apply professional standards without cosmetic
                      excess.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Weekly Priority System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Building a Weekly Priority System
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daily to-do lists manage tasks. Weekly priority reviews manage direction. Without
                the weekly review, your to-do list becomes a random collection of items with no
                strategic coherence &mdash; you are checking things off but not necessarily moving
                towards anything meaningful. The weekly priority review is the habit that bridges
                daily task management and long-term goal achievement.
              </p>

              <p>
                The ideal time for a weekly review is Sunday evening or Friday afternoon &mdash;
                before the work week begins, not during it. The process takes 20 to 30 minutes and
                follows a consistent structure. First, review the week just ended: what went well,
                what did not, what lessons can be carried forward. Second, identify your Big Rocks
                for the coming week &mdash; the 3 to 5 most important things that must happen.
                Third, schedule those Big Rocks into specific time slots in your calendar. Fourth,
                check materials and preparation: do you have everything you need for Monday&rsquo;s
                first job? Is your route planned? Are quotes ready to send?
              </p>

              <p>
                The weekly review creates a compounding effect over time. Each week builds on the
                last. Priorities become clearer. Planning becomes faster. The gap between intention
                and action narrows. After a month of consistent weekly reviews, most people report
                that their working week feels significantly calmer, more productive, and more
                controlled &mdash; not because the volume of work has decreased, but because the
                direction of effort has become deliberate rather than random.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Weekly Priority Review Template
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1 &mdash; Review:</strong> What were last week&rsquo;s Big Rocks?
                      Did I complete them? What got in the way? What will I do differently?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2 &mdash; Identify:</strong> What are my 3&ndash;5 Big Rocks for
                      this week? Which tasks will make the biggest difference to my business,
                      career, or life?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3 &mdash; Schedule:</strong> Put each Big Rock into a specific
                      time slot in the calendar. If it is not in the calendar, it will not happen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 4 &mdash; Prepare:</strong> Check materials, plan routes,
                      pre-order supplies, resolve any scope questions before Monday morning.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 5 &mdash; Set MITs:</strong> Identify your 3 Most Important Tasks
                      for Monday. Start the week with immediate clarity.
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
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided practical frameworks for setting priorities that actually
                stick. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Big Rocks first</strong> (Covey, 1994): Schedule your most important
                    commitments before smaller tasks fill the available time. If the big rocks are
                    not in the calendar, they will not happen.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 80/20 Rule</strong> (Pareto, 1896; Juran, 1940s): Approximately 20%
                    of your activities generate 80% of your results. Identify and prioritise the
                    vital 20%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>MITs:</strong> Pick 3 Most Important Tasks each day and do them first.
                    The constraint of 3 creates focus and eliminates decision fatigue.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Busy is not effective.</strong> Volume of activity is not the same as
                    quality of results. The question is not &ldquo;Was I busy?&rdquo; but &ldquo;Was
                    I effective?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The stop-doing list</strong> is as important as the to-do list. Identify
                    low-value activities to eliminate and decide what to do with the recovered time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The weekly priority review</strong> (20&ndash;30 minutes on Sunday or
                    Friday) is the single habit that bridges daily task management and long-term
                    goal achievement.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Module 1 Complete:</strong> You have now covered
                  the foundations of time management &mdash; understanding where your time goes,
                  distinguishing urgent from important, identifying common time traps, and building
                  a prioritisation system. In Module 2, we move from understanding to action:
                  Planning &amp; Scheduling for the real working week.
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
            <Link to="../tmo-module-2">
              Next: Planning &amp; Scheduling
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
