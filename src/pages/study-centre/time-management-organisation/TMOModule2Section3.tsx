import { ArrowLeft, Calculator, CheckCircle } from 'lucide-react';
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
    id: 'tmo-2-3-check1',
    question:
      'An electrician quotes a kitchen rewire at 2 days based on their best-case estimate, then consistently finds these jobs take 3 days. What estimation technique should they adopt to fix this pattern?',
    options: [
      'Continue quoting 2 days but work faster to meet the estimate',
      'Break the job into sub-tasks, assign reference times to each, total them, and add a 10-15% contingency',
      'Ask the client how long they think it should take',
      'Always double every estimate regardless of the job type',
    ],
    correctIndex: 1,
    explanation:
      'Breaking jobs into sub-tasks and assigning reference times is the most reliable estimation method. A kitchen rewire might include: strip out (3 hours), first fix (6 hours), second fix (4 hours), testing and certification (2 hours), making good (2 hours). That totals 17 hours or 2.1 days of productive work. Adding 10-15% contingency (approximately 2 hours) brings the total to 19 hours or 2.4 days — which should be quoted at 2.5 to 3 days. This bottom-up approach replaces guesswork with data.',
  },
  {
    id: 'tmo-2-3-check2',
    question:
      'A client says: "While you\'re here, could you also add a couple of sockets in the conservatory?" This is an example of:',
    options: [
      'Good customer service — always say yes to keep clients happy',
      'Scope creep — additional work requested after the original job was quoted and agreed',
      'Efficient scheduling — combining multiple jobs into one visit',
      'Cross-selling — proactively offering additional services',
    ],
    correctIndex: 1,
    explanation:
      'Scope creep occurs when the scope of work expands beyond what was originally quoted and agreed. The additional sockets were not in the original quote, so they represent unpriced, unscheduled work. Agreeing without adjustment means: (a) you are working for free on the extra sockets, (b) the current job overruns into your buffer or next appointment, and (c) the client learns that they can add work without financial consequence. The professional response is to say yes to the work but clarify the terms: "I can absolutely do that — let me give you a price for the additional sockets and we can schedule them in."',
  },
  {
    id: 'tmo-2-3-check3',
    question:
      'An electrician tracks their actual completion times for CU changes over 10 jobs. The average is 5.8 hours, but they have been quoting 4 hours. Their next quote should be based on:',
    options: [
      '4 hours — because that is what they have always quoted',
      '5.8 hours average + 10-15% contingency = approximately 6.5-7 hours, to reflect reality',
      '8 hours — to be safe, always double the estimate',
      'Whatever the client is willing to pay, regardless of actual time',
    ],
    correctIndex: 1,
    explanation:
      "Using actual historical data (the 5.8-hour average) plus a contingency buffer (10-15%) produces the most accurate and sustainable quote. This is Kahneman's reference class forecasting applied to trade work. Quoting 4 hours when the reality is consistently 5.8 hours means every CU change loses approximately 2 hours of uncompensated time. Over 50 CU changes per year, that is 100 hours of unpaid work — the equivalent of 2.5 full working weeks given away. Data-driven quoting protects both profitability and work-life balance.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I handle clients who say my quote is too expensive?',
    answer:
      'First, ensure your quote is accurate and reflects true costs — materials, labour at a sustainable rate, travel, contingency, and a reasonable profit margin. If it is accurate, do not reduce it. Instead, explain what the quote includes and why it is priced as it is. Many clients have unrealistic expectations based on online estimates or quotes from unqualified workers. A clear, itemised breakdown showing materials, labour hours, testing, certification, and contingency often resolves the objection because it demonstrates transparency and professionalism. If the client still considers it too expensive, that is a signal that this client may not value quality work — and underquoting to win the job will cost you money, time, and stress.',
  },
  {
    question: 'Should I quote a fixed price or an hourly rate?',
    answer:
      'Both have advantages. Fixed-price quotes give clients certainty and protect you if the job goes faster than expected. Hourly rates protect you if the job encounters unforeseen complications, but they make clients nervous about open-ended costs. For most domestic electrical work, a fixed price based on accurate sub-task estimation (with 10-15% contingency) is the professional standard. For fault-finding, where the scope is genuinely unpredictable, an hourly rate with a cap ("I will charge an hourly rate for the first 2 hours of diagnostic work, after which I will provide a fixed quote for the repair") provides a fair balance.',
  },
  {
    question: 'How do I build a reference times database?',
    answer:
      'Start by recording the actual completion time for every job you do, broken down by sub-task where possible. Use a simple spreadsheet or notes app. After 10 instances of the same job type, calculate the average. Common categories for electricians include: consumer unit change, full rewire per room, first fix per point, second fix per point, testing per circuit, fault-find average, EICR per circuit, EV charger installation, socket addition, lighting circuit installation, fire alarm installation. Within 3 to 6 months you will have a reliable personal database. These reference times become the foundation for accurate quoting, replacing guesswork with evidence.',
  },
  {
    question: 'What contingency percentage should I add to quotes?',
    answer:
      'The standard recommendation is 10-15% for routine domestic work and 15-20% for older properties or jobs with higher uncertainty. The contingency covers the statistically inevitable but individually unpredictable complications: unexpected cable routes, concealed junction boxes, older wiring that needs additional work, access difficulties, and client-requested changes during the job. For commercial work, 5-10% is more typical because the scope is usually more precisely defined by a specification. Contingency is not profit padding — it is realistic cost estimation. Track your actual contingency usage over time and adjust: if you consistently use your full contingency, it is not large enough.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The most reliable method for estimating job duration is:',
    options: [
      'Guessing based on experience and gut feel',
      'Asking another electrician how long they think it would take',
      'Breaking the job into sub-tasks, assigning reference times to each, totalling them, and adding contingency',
      "Using the time estimate from the client's previous electrician",
    ],
    correctAnswer: 2,
    explanation:
      'Bottom-up estimation — breaking a job into its component sub-tasks and assigning a reference time to each — produces the most accurate results because it forces you to think through every stage of the work. Gut-feel estimation (option A) is subject to the planning fallacy: you imagine the best case and forget the transitions, complications, and setup time. Sub-task estimation reveals hidden time costs that holistic estimation misses.',
  },
  {
    id: 2,
    question: 'A quoting framework for electrical work should include:',
    options: [
      'Materials cost only — labour should be included as a "favour" to win the job',
      'Materials + labour hours multiplied by hourly rate + travel + contingency (10-15%)',
      'Whatever the competitor charges, minus 10%',
      'A fixed price based on what the client can afford',
    ],
    correctAnswer: 1,
    explanation:
      'A professional quoting framework accounts for all real costs: materials (with a reasonable markup for sourcing, storage, and warranty risk), labour hours (estimated via sub-task breakdown, multiplied by a sustainable hourly rate), travel costs, and a contingency of 10-15% for unforeseen complications. Quoting only materials (option A) means you are working for free. Competitor-based pricing (option C) ignores your actual costs. Client-affordability pricing (option D) is charity, not business.',
  },
  {
    id: 3,
    question: 'The "false economy of underquoting" refers to:',
    options: [
      'Charging too much and losing the job',
      'Winning a job at a price that does not cover your true costs, leading to financial loss, rushed work, and resentment',
      'Quoting accurately but the client choosing a cheaper competitor',
      'Adding too much contingency to a quote',
    ],
    correctAnswer: 1,
    explanation:
      'Underquoting means winning a job at a price that does not reflect the true time and cost involved. You "win" the work but lose money on every hour of the overrun. Additionally, because you are now working for free, you are incentivised to rush, cut corners, or reduce quality to finish faster — leading to callbacks, rework, and reputation damage. The false economy is that you feel like you won (you got the job) but you actually lost (you worked unprofitably). It is better to lose a job to an underquoter than to win it at a loss.',
  },
  {
    id: 4,
    question: 'Scope creep in electrical work typically occurs when:',
    options: [
      'The electrician adds extra work without telling the client',
      'The client requests additional work beyond the original quoted scope, often with the phrase "while you\'re here..."',
      'The job takes less time than expected',
      'The electrician uses higher-quality materials than quoted',
    ],
    correctAnswer: 1,
    explanation:
      'Scope creep is the gradual expansion of project scope beyond what was originally agreed and priced. In domestic electrical work, it typically manifests as "while you\'re here, could you also..." requests — additional sockets, extra lights, moving a switch, adding an outdoor socket. Each individual addition seems small, but collectively they represent significant unpriced time. The professional response is always: "Yes, I can do that — let me give you a price for the additional work."',
  },
  {
    id: 5,
    question: 'Tracking actuals vs estimates means:',
    options: [
      "Comparing your quote to the competitor's quote",
      'Recording how long each job actually took and comparing it to your original estimate, to improve future accuracy',
      'Tracking how many hours you work per week',
      'Asking clients how long they expected the job to take',
    ],
    correctAnswer: 1,
    explanation:
      "Tracking actuals vs estimates is the discipline of recording the real completion time for every job and comparing it to the time you quoted. Over multiple jobs of the same type, patterns emerge: if your CU changes consistently take 5.5 hours but you quote 4 hours, the data tells you to adjust your estimate. This is Kahneman's reference class forecasting in practice — using historical evidence rather than optimistic projection. Without tracking, the planning fallacy persists indefinitely.",
  },
  {
    id: 6,
    question: 'A reference times database is:',
    options: [
      'A national standard published by the IET for how long every job should take',
      'A personal record of how long specific job types actually take you, built from tracking your own completion times',
      'A price list from your materials supplier',
      'A spreadsheet of competitor pricing in your area',
    ],
    correctAnswer: 1,
    explanation:
      'A reference times database is your personal record of actual job durations, built over time by consistently tracking how long specific tasks take. After 10 instances of the same task, the average becomes a reliable reference time. This database is unique to you — it accounts for your working speed, your tools, your geographical area, and your typical job mix. It replaces gut-feel estimation with evidence-based estimation and is the single most effective tool for eliminating chronic underquoting.',
  },
  {
    id: 7,
    question:
      'When a job takes significantly longer than estimated, the most productive response is:',
    options: [
      'Blame the client for causing delays',
      'Absorb the loss silently and quote the same time next time',
      'Record the actual time, analyse why the overrun occurred, and adjust future estimates or processes accordingly',
      'Charge the client extra without prior agreement',
    ],
    correctAnswer: 2,
    explanation:
      'Every overrun is a learning opportunity. Recording the actual time and analysing the cause — was the estimate unrealistic? Was there an unforeseen complication? Did scope creep occur? Did poor preparation cause delays? — produces actionable insights for future improvement. Absorbing the loss silently (option B) means the same mistake is repeated indefinitely. Charging extra without agreement (option D) is unprofessional and damages trust. The data-driven approach builds progressively more accurate estimates over time.',
  },
  {
    id: 8,
    question: 'A 10-15% contingency on a quote is:',
    options: [
      'Unnecessary profit padding that makes your quote uncompetitive',
      'A realistic allowance for the complications that are individually unpredictable but statistically inevitable',
      'Only necessary for very large commercial projects',
      'A way to trick clients into paying more',
    ],
    correctAnswer: 1,
    explanation:
      'Contingency is a realistic cost element, not padding. On any individual job, you might not encounter complications. But across all jobs, complications are inevitable: unexpected wiring, difficult access, additional faults, client changes, material issues. The contingency accounts for this statistical reality. If you track your contingency usage over time, you will almost certainly find that it is fully consumed on average — proving it is a real cost, not a bonus. Electricians who omit contingency are effectively subsidising complications from their own profit margin.',
  },
];

export default function TMOModule2Section3() {
  useSEO({
    title: 'Quoting, Estimating & Time Allocation | Time Management & Organisation Module 2.3',
    description:
      'Accurate time estimation, reference times, quoting frameworks, scope creep, and tracking actuals vs estimates for electricians.',
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
            <Calculator className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Quoting, Estimating &amp; Time Allocation
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Accurate time estimation, reference times, quoting frameworks, scope creep, and tracking
            actuals vs estimates
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Sub-task estimation:</strong> Break every job into components and time each
                one
              </li>
              <li>
                <strong>Reference times:</strong> Build your personal database from tracked actuals
              </li>
              <li>
                <strong>Quote formula:</strong> Materials + labour + travel + contingency
                (10&ndash;15%)
              </li>
              <li>
                <strong>Track everything:</strong> Compare actual times to estimates on every job
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Profitability:</strong> Underquoting means working for free on every overrun
              </li>
              <li>
                <strong>Trust:</strong> Accurate estimates build client confidence and repeat
                business
              </li>
              <li>
                <strong>Work-life balance:</strong> Realistic quoting prevents chronic evening and
                weekend work
              </li>
              <li>
                <strong>Growth:</strong> Data-driven pricing supports sustainable business scaling
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Break complex jobs into sub-tasks and assign reference times to each component',
              'Build a personal reference times database from tracked actual completion times',
              'Apply the quoting framework: materials + labour + travel + contingency',
              'Identify and manage scope creep using professional boundary-setting language',
              'Track actual vs estimated times to progressively improve accuracy',
              'Explain the false economy of underquoting and its impact on profitability and quality',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Breaking Jobs into Sub-Tasks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Breaking Jobs into Sub-Tasks
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most common estimation error in trade work is treating a complex job as a single
                block. When an electrician says &ldquo;a rewire takes 5 days,&rdquo; they are making
                a holistic estimate &mdash; a single number for a job that actually consists of
                dozens of discrete sub-tasks, each with its own time profile. This holistic approach
                is directly vulnerable to the planning fallacy because it relies on best-case
                imagining rather than component-level analysis. The corrective is{' '}
                <strong>sub-task estimation</strong>: breaking every job into its constituent parts
                and estimating each one individually.
              </p>

              <p>
                Consider a 3-bedroom semi-detached house rewire. A holistic estimate might be
                &ldquo;5 days.&rdquo; A sub-task breakdown reveals the true picture: strip out of
                existing installation (4&ndash;6 hours depending on age and complexity), first fix
                &mdash; running cables, cutting chases, fitting back boxes (8&ndash;12 hours across
                all rooms), consumer unit installation (2&ndash;3 hours), second fix &mdash; fitting
                accessories, light fittings, connecting all points (6&ndash;8 hours), testing and
                inspection of all circuits (3&ndash;4 hours), certification and documentation
                (1&ndash;2 hours), making good &mdash; filling chases, patching, basic decoration
                touch-up (2&ndash;4 hours), client walk-through and handover (30 minutes&ndash;1
                hour). The total ranges from 26.5 to 40 hours &mdash; that is 3.3 to 5 working days
                of productive time, plus setup, cleanup, and transitions each day.
              </p>

              <p>
                The sub-task approach exposes time that holistic estimation hides. Setup and cleanup
                each day (loading/unloading the van, laying dust sheets, tidying at the end) adds
                approximately 30 minutes per day. Transitions between sub-tasks (packing up testing
                equipment, setting up for second fix) add time. Client conversations add time. Tea
                breaks add time. None of these are individually significant, but collectively they
                represent 1 to 2 hours per day that holistic estimation ignores. A 5-day holistic
                estimate for 40 hours of sub-task work is unrealistic because the actual available
                productive time in a 5-day period is approximately 35 to 37 hours, not 40.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: CU Change Sub-Task Breakdown
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Preparation and isolation:</strong> 30 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Remove old board and assess cables:</strong> 45 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Install new board, connect circuits:</strong> 1.5&ndash;2 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Testing all circuits:</strong> 1&ndash;1.5 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Labelling, tidying, client walk-through:</strong> 30 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Certification and documentation:</strong> 30 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sub-task total:</strong> 4.75&ndash;5.75 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>+ 10&ndash;15% contingency:</strong> 5.25&ndash;6.6 hours &mdash;
                      quote as a full day
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Reference Times */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Building Your Reference Times Database
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>reference times database</strong> is your personal record of how long
                specific job types and sub-tasks actually take you to complete. It is the single
                most powerful tool for eliminating chronic underquoting and achieving accurate time
                allocation. Unlike generic industry standards (which may not reflect your working
                speed, tools, geographic area, or typical job mix), your reference times are based
                on your own real-world data &mdash; making them uniquely accurate for your business.
              </p>

              <p>
                Building the database is simple but requires discipline. After every job, record two
                things: the job type (CU change, rewire, fault-find, etc.) and the actual total time
                from arrival to completion including testing and documentation. If possible, record
                sub-task times as well. Store this data in a spreadsheet, a notes app, or even a
                dedicated column in your job management system. After 10 instances of the same job
                type, calculate the average. That average becomes your reference time &mdash; the
                empirical foundation for all future quotes of that type. Kahneman would call this
                your personal &ldquo;reference class.&rdquo;
              </p>

              <p>
                The database evolves over time. As you invest in better tools, refine your
                techniques, or develop more efficient workflows, your reference times should
                decrease. As you take on more complex properties (older buildings, listed
                properties, commercial work), new categories emerge. The key is to keep recording.
                Most electricians who build a reference times database report two surprises: first,
                that some jobs take significantly longer than they thought (CU changes are the
                classic example — many electricians quote 4 hours but average 5.5 to 6 hours); and
                second, that some jobs take less time than they thought, allowing them to schedule
                more confidently.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Sample Reference Times (Indicative Only)
                </p>
                <p className="text-xs text-white mb-3">
                  These are examples only. Your personal reference times will differ based on your
                  speed, tools, and typical job complexity. Build your own from tracked actuals.
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li>
                    &bull; <strong>Consumer unit change:</strong> 5&ndash;6 hours (including testing
                    and certification)
                  </li>
                  <li>
                    &bull; <strong>Full rewire per room:</strong> 4&ndash;6 hours (first fix +
                    second fix)
                  </li>
                  <li>
                    &bull; <strong>First fix per point:</strong> 15&ndash;25 minutes (depending on
                    cable run length)
                  </li>
                  <li>
                    &bull; <strong>Second fix per point:</strong> 10&ndash;15 minutes
                  </li>
                  <li>
                    &bull; <strong>Testing per circuit:</strong> 15&ndash;20 minutes (full suite of
                    tests)
                  </li>
                  <li>
                    &bull; <strong>Fault-find:</strong> 1&ndash;4 hours (highly variable &mdash;
                    track your median)
                  </li>
                  <li>
                    &bull; <strong>EICR per circuit:</strong> 15&ndash;25 minutes (domestic)
                  </li>
                  <li>
                    &bull; <strong>EV charger installation:</strong> 4&ndash;6 hours (including
                    certification)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Quoting Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Quoting Framework
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A professional quote is not a guess &mdash; it is a structured calculation that
                accounts for all real costs of delivering the work. The framework is
                straightforward:{' '}
                <strong>
                  Materials + (Labour Hours x Hourly Rate) + Travel + Contingency (10&ndash;15%) =
                  Quote Price
                </strong>
                . Each element requires honest, data-driven input. The materials cost should include
                a reasonable markup for sourcing time, storage, wastage, and the warranty risk you
                carry. Labour hours should come from your reference times database, not from
                optimistic guessing. The hourly rate must be sustainable &mdash; covering not just
                your take-home pay but also van costs, insurance, tools, training, accountancy fees,
                holidays, sick days, and pension contributions.
              </p>

              <p>
                Many self-employed electricians set their hourly rate too low because they compare
                it to employed rates without accounting for the overhead. An employed electrician
                earning 18 pounds per hour has their van, fuel, insurance, tools, holiday pay, sick
                pay, pension, and training all covered by the employer. A self-employed electrician
                needs to cover all of these from their charge-out rate. When you add up the true
                costs of self-employment, a sustainable charge-out rate is typically 2 to 3 times
                the equivalent employed rate. Charging less means you are subsidising your clients
                from your own savings &mdash; which is not a business model, it is a slow path to
                burnout.
              </p>

              <p>
                The contingency element (10&ndash;15% for routine domestic work, 15&ndash;20% for
                older or more complex properties) accounts for the complications that are
                statistically inevitable but individually unpredictable. On any single job, the
                contingency might not be needed. Over 20 jobs, it will be fully consumed on average.
                If you track your contingency usage and find it is consistently unused, your base
                estimates are too generous and the contingency can be reduced. If it is consistently
                exceeded, your base estimates are too optimistic and need adjustment. Contingency is
                a living element of the quote, refined by data over time.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Quoting Formula</p>
                <p className="text-base text-white leading-relaxed font-semibold">
                  Quote = Materials + (Labour Hours x Hourly Rate) + Travel + Contingency
                </p>
                <ul className="text-sm text-white space-y-1.5 mt-3">
                  <li>
                    &bull; <strong>Materials:</strong> Wholesale cost + markup (10&ndash;20%) for
                    sourcing, wastage, warranty
                  </li>
                  <li>
                    &bull; <strong>Labour hours:</strong> From reference times database, not gut
                    feel
                  </li>
                  <li>
                    &bull; <strong>Hourly rate:</strong> Must cover all self-employment costs, not
                    just take-home
                  </li>
                  <li>
                    &bull; <strong>Travel:</strong> Fuel + time to/from site (especially for distant
                    jobs)
                  </li>
                  <li>
                    &bull; <strong>Contingency:</strong> 10&ndash;15% domestic, 15&ndash;20%
                    older/complex properties
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The False Economy of Underquoting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The False Economy of Underquoting
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Underquoting is one of the most damaging habits in self-employed trade work, and it
                is remarkably common. The pattern is predictable: an electrician quotes a low price
                to win the job, the job takes longer than quoted, and the electrician ends up
                working at a loss for the additional hours. The electrician &ldquo;wins&rdquo; the
                work but loses money doing it. This is the false economy: the short-term gain of
                winning a job is outweighed by the long-term cost of delivering it at a loss.
              </p>

              <p>
                The consequences extend beyond the immediate financial loss. When you are working
                for free (on the unquoted overrun), you are incentivised &mdash; consciously or not
                &mdash; to cut corners, rush, and reduce quality. You skip testing shortcuts, you do
                not take photographs, you rush the certification. This leads to callbacks, rework,
                and potential non-compliance &mdash; all of which cost more time and money. The
                reputational damage from poor-quality work is far more expensive than the revenue
                lost by pricing correctly and occasionally losing a job to a cheaper competitor.
              </p>

              <p>
                Underquoting also creates a toxic emotional dynamic. When a job overruns an
                unrealistic quote, the electrician feels resentful towards the client (who did
                nothing wrong), angry with themselves (for underquoting again), and stressed about
                the cascade effect on other jobs. Over time, this erodes job satisfaction,
                contributes to burnout, and creates a negative association with work itself.
                Accurate quoting, by contrast, means every job is fairly compensated, every overrun
                is absorbed by contingency, and the emotional experience of work is sustainable
                rather than corrosive.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Real Cost of Underquoting
                </p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician quotes a 3-bedroom rewire at 5 days (based on optimistic gut feel).
                  The job actually takes 7 days due to unforeseen issues &mdash; old cable routes
                  through unexpected plaster, additional junctions discovered behind a false
                  ceiling, and the client changing their mind about socket positions mid-job. At a
                  charge-out rate of 40 pounds per hour, those 2 extra days represent 640 pounds of
                  uncompensated labour. If this happens on 10 rewires per year, the electrician
                  gives away 6,400 pounds annually &mdash; enough for a family holiday, a tool
                  upgrade, or 2 months of van payments. Sub-task estimation with contingency would
                  have produced a 6.5&ndash;7 day quote and eliminated the loss entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Managing Scope Creep */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Scope Creep &mdash; &ldquo;While You&rsquo;re Here&hellip;&rdquo;
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scope creep is the gradual expansion of a project beyond its original agreed scope.
                In domestic electrical work, it is epidemic, and it almost always manifests in the
                same phrase:{' '}
                <strong>&ldquo;While you&rsquo;re here, could you also&hellip;&rdquo;</strong>
                Add a socket in the garage. Move that switch. Put an outside light by the back door.
                Each individual request seems small and reasonable. But collectively, they represent
                significant unpriced, unscheduled work that erodes profitability and disrupts the
                day.
              </p>

              <p>
                The root cause of scope creep is a failure to establish clear boundaries at the
                quoting stage. If the quote says &ldquo;rewire kitchen&rdquo; without specifying
                exactly which points, the client understandably assumes that anything in the kitchen
                is included. If the quote itemises every socket, switch, and light, the boundary is
                clear: anything not on the list is additional work at additional cost. Detailed,
                itemised quotes do not just protect you financially &mdash; they protect the client
                relationship, because both parties have the same expectations from the start.
              </p>

              <p>
                When scope creep occurs on site (and it will), the professional response is to say
                yes to the work while clarifying the terms. The language matters. Not: &ldquo;That
                is not in my quote, I am not doing it.&rdquo; Instead: &ldquo;I can absolutely do
                that for you &mdash; let me give you a price for the additional work and we can
                schedule it in. Do you want me to add it to today if time allows, or shall I come
                back for it?&rdquo; This response is positive (you are willing to do the work),
                professional (you are transparent about pricing), and client-friendly (you are
                offering options). It maintains the relationship while protecting your time and
                profitability.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Professional Scope Management Language
                </p>
                <ul className="text-sm text-white space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      &ldquo;I can absolutely do that &mdash; let me give you a price for the
                      additional work.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      &ldquo;That is outside the original scope, but I would be happy to quote for
                      it separately.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      &ldquo;Shall I add it to today if time allows, or would you prefer I come back
                      for it?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Avoid:</strong> &ldquo;That is not in my quote&rdquo; (defensive,
                      relationship-damaging)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Avoid:</strong> Silently doing extra work for free (unsustainable,
                      breeds resentment)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Tracking Actuals vs Estimates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Tracking Actuals vs Estimates
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Tracking actuals vs estimates is the feedback loop that transforms quoting from an
                art into a science. Without it, the planning fallacy persists indefinitely &mdash;
                you continue quoting optimistically because you never confront the data that shows
                you are consistently wrong. With it, every job becomes a learning opportunity that
                improves your next quote. The principle is Kahneman&rsquo;s reference class
                forecasting applied systematically: use historical evidence, not hopeful projection,
                as the basis for future estimates.
              </p>

              <p>
                The tracking method is simple. For every job, record three data points: (1) the time
                you estimated when quoting, (2) the time the job actually took, and (3) a brief note
                explaining any significant variance (&ldquo;extra 2 hours due to concealed junction
                box in ceiling void&rdquo; or &ldquo;finished 1 hour early, straightforward install,
                new-build wiring&rdquo;). Over time, patterns emerge that no amount of experience
                alone would reveal. You might discover that your CU change estimates are
                consistently 1.5 hours under reality, that your rewire estimates are accurate for
                new-builds but 30% under for pre-1960s properties, or that your fault-find estimates
                are wildly variable (which tells you to use a capped hourly rate rather than a fixed
                quote for that job type).
              </p>

              <p>
                The data also reveals seasonal and property-type patterns. Jobs in older properties
                take longer due to harder chasing, unexpected wiring, and asbestos considerations.
                Jobs during winter are slower due to shorter daylight hours, cold affecting
                dexterity, and wet weather affecting outdoor work. Jobs with engaged, present
                homeowners take longer due to conversations and decisions. None of these factors are
                captured in a simple &ldquo;a rewire takes 5 days&rdquo; estimate &mdash; but your
                tracking data reveals them, allowing you to adjust quotes by property age, season,
                and client type.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Data-Driven Improvement
                </p>
                <p className="text-sm text-white leading-relaxed">
                  After tracking 15 consumer unit changes over 6 months, an electrician discovers
                  their average actual time is 5.8 hours. They had been quoting 4 hours
                  consistently. The variance notes reveal: 3 jobs had concealed junction boxes
                  requiring additional work (average +1.5 hours each), 4 jobs required cable
                  extensions to reach the new board position (+45 minutes each), and 2 jobs had
                  asbestos flash plates requiring removal by a specialist (+wait time). The
                  electrician adjusts their standard CU change quote to 6 hours base + 1 hour
                  contingency = 7 hours. For the first time, their quotes consistently match
                  reality. Client satisfaction increases (no more rushed finishes), profitability
                  improves (no more uncompensated hours), and stress decreases (the schedule is
                  realistic).
                </p>
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
                This section has provided practical frameworks for accurate quoting, realistic
                estimation, and effective scope management. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Sub-task estimation</strong> replaces holistic guessing with
                    component-level analysis, exposing hidden time costs that gut-feel estimates
                    miss.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Reference times</strong> are your personal database of actual job
                    durations, built from tracked data over time. They are the foundation of
                    accurate quoting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The quoting formula</strong> (materials + labour + travel + contingency)
                    ensures every real cost is captured and compensated.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Underquoting</strong> is a false economy that costs money, quality, and
                    emotional wellbeing. Accurate pricing is always more sustainable than cheap
                    pricing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Scope creep</strong> is managed by itemised quotes and professional
                    boundary-setting language: &ldquo;I can do that &mdash; let me give you a
                    price.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Tracking actuals vs estimates</strong> closes the feedback loop,
                    progressively improving accuracy through real-world data.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will explore
                  managing multiple jobs simultaneously &mdash; pipeline stages, tracking systems,
                  managing client expectations, and work-in-progress limits.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../tmo-module-2-section-4">
              Next: Managing Multiple Jobs
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
