import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What is task batching?',
    options: [
      'Completing all tasks in the order they arrive, regardless of type',
      'Grouping similar tasks together and completing them in a single dedicated session to reduce context-switching overhead',
      'Working on multiple different tasks simultaneously',
      'Delegating batches of work to subcontractors',
    ],
    correctAnswer: 1,
    explanation:
      'Task batching involves grouping similar tasks together and completing them in a dedicated session. This reduces the cognitive cost of switching between different types of work and allows you to build momentum within a single task category.',
  },
  {
    id: 2,
    question: 'Who originally observed the 80/20 distribution, and in what context?',
    options: [
      'Peter Drucker, in management theory in the 1950s',
      'Vilfredo Pareto, studying wealth distribution in Italy in 1896',
      'Cal Newport, researching deep work in 2016',
      'Frederick Taylor, studying factory efficiency in 1911',
    ],
    correctAnswer: 1,
    explanation:
      "Italian economist Vilfredo Pareto observed in 1896 that approximately 80% of Italy's land was owned by 20% of the population. Joseph Juran later applied this principle broadly to quality management and productivity, naming it the Pareto Principle.",
  },
  {
    id: 3,
    question: 'Why does context switching reduce productivity?',
    options: [
      'Because it takes physical effort to move between tasks',
      'Because each switch requires your brain to reload the rules, tools, and mental context of the new task, creating cognitive overhead',
      'Because switching tasks is against most employment contracts',
      'Because you can only switch tasks a maximum of 5 times per day',
    ],
    correctAnswer: 1,
    explanation:
      'Every time you switch between different types of tasks, your brain must disengage from the previous context and load the new one. This includes remembering different processes, accessing different tools or systems, and establishing a different mindset. This cognitive overhead is invisible but significant.',
  },
  {
    id: 4,
    question: "Applied to an electrician's business, what might the 80/20 Rule reveal?",
    options: [
      'That 80% of their tools are stored in 20% of their van space',
      'That 80% of their income comes from approximately 20% of their clients or job types',
      'That they should only work 20% of the week and rest for 80%',
      'That 80% of regulations apply to only 20% of installations',
    ],
    correctAnswer: 1,
    explanation:
      'The 80/20 Rule typically reveals that a small proportion of clients, job types, or activities generate the majority of income. Identifying this allows you to focus more energy on high-value activities and reduce time spent on low-return work.',
  },
  {
    id: 5,
    question: 'What is the recommended approach to batch processing communication?',
    options: [
      'Check and respond to emails and messages continuously throughout the day',
      'Check messages once per day, at the end of the day only',
      'Process emails and messages at 3 fixed times per day (e.g., 8:00, 12:00, 17:00)',
      'Hire a virtual assistant to handle all communication',
    ],
    correctAnswer: 2,
    explanation:
      'Checking messages at 3 fixed times per day provides a balance between responsiveness and focused work. This approach batch-processes communication rather than allowing it to fragment your entire day with constant interruptions.',
  },
  {
    id: 6,
    question:
      'An electrician makes 4 separate trips to the merchants in a week for different jobs. How would batching improve this?',
    options: [
      'It would not improve anything \u2014 each job needs its own materials',
      'Combine material lists and make 1\u20132 larger trips per week, saving travel time and fuel costs',
      'Order everything online instead of visiting merchants',
      'Send an apprentice to collect materials individually',
    ],
    correctAnswer: 1,
    explanation:
      'Errands batching means combining multiple merchant trips into fewer, larger runs. If each trip takes 45 minutes including travel, 4 trips consume 3 hours. Two combined trips might take 2 hours total, saving 1 hour per week \u2014 over 48 hours per year.',
  },
  {
    id: 7,
    question: 'What is the primary risk of NOT applying the 80/20 Rule to your work?',
    options: [
      'You will run out of work entirely',
      'You will spend disproportionate time on low-value activities while neglecting the high-value 20% that generates most of your income',
      'Your clients will notice and complain about inconsistent service',
      'You will violate tax regulations by not tracking high-value clients',
    ],
    correctAnswer: 1,
    explanation:
      'Without consciously applying the 80/20 principle, it is easy to give equal time and attention to all tasks and clients. This means high-value activities that drive your business forward receive the same priority as low-value ones, limiting your overall productivity and income.',
  },
  {
    id: 8,
    question: 'What is the best time to conduct a weekly admin batch session?',
    options: [
      'Monday morning, to start the week with paperwork',
      'Friday afternoon, to end the week \u2014 but this often gets skipped due to fatigue',
      'Sunday evening, when the week ahead can be planned, invoices prepared, and materials ordered without site interruptions',
      'There is no best time \u2014 do admin whenever you feel like it',
    ],
    correctAnswer: 2,
    explanation:
      'Sunday evening is favoured by many successful tradespeople because it allows planning for the week ahead without the interruptions of an active work day. Invoices, quotes, material orders, and schedule reviews can all be batched into a focused 1\u20132 hour session.',
  },
];

export default function TMOModule3Section3() {
  useSEO({
    title: 'Batching & the 80/20 Rule | Module 3 Section 3 | Time Management & Organisation',
    description:
      "Task batching to reduce context switching, Pareto's 80/20 principle, batch processing communication, and errands batching for tradespeople.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <Package className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 3</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Batching &amp; the 80/20 Rule
            </h1>
            <p className="text-white text-sm sm:text-base">
              Group similar tasks, eliminate low-value activities, and focus your effort where it
              generates the greatest return
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                Task batching groups similar activities together to reduce the cognitive cost of
                switching between different types of work. The 80/20 Rule (Pareto Principle) reveals
                that approximately 20% of your activities generate 80% of your results. Together,
                these principles help you work on the right things in the most efficient way.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                Tradespeople frequently scatter similar tasks throughout the week &mdash; a quote
                here, a call there, a trip to the merchants, then back to site, then another call.
                Each switch carries hidden costs. Batching and the 80/20 Rule help you identify what
                truly matters, group similar work together, and eliminate activities that consume
                time without producing proportionate value.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Explain task batching and how it reduces context-switching overhead in daily work',
                'Identify common task categories suitable for batching in a trade business',
                'Apply the Pareto Principle (80/20 Rule) to identify high-value activities in your work',
                'Design a batch-processing approach for communication that balances responsiveness with focus',
                'Implement errands batching to reduce wasted travel time and fuel costs',
                'Create a weekly admin batch session that consolidates invoicing, quoting, and planning',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Task Batching */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">1. What Is Task Batching?</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Task batching is the practice of grouping similar tasks together and completing them
                in a single, dedicated session rather than scattering them throughout the day or
                week. The principle is grounded in cognitive science: every time you switch between
                different types of tasks, your brain must disengage from one context and load
                another. This switching has a real cost in terms of time, mental energy, and error
                rate. By batching similar tasks, you minimise these transitions and allow yourself
                to build momentum within a single type of activity.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Consider the difference between these two approaches to handling phone calls.
                Approach A: you answer every call as it comes in throughout the day, interrupting
                whatever you are working on each time. Approach B: you batch all calls into two
                dedicated 20-minute windows (say, 10:00 and 14:00), returning missed calls and
                making outbound calls during these periods. In Approach A, each call creates a
                context switch that costs you an average of 23 minutes of refocusing time (as Gloria
                Mark&rsquo;s research demonstrated). In Approach B, you make the same calls but with
                a single context switch at the start and end of each window. The time saved is
                substantial.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The concept applies equally to physical tasks. Instead of making three separate
                trips to the merchants throughout the week for different jobs, batch your material
                needs and make one comprehensive trip. Instead of writing quotes one at a time as
                enquiries arrive, collect them and write all your quotes in a single evening
                session. Instead of invoicing each job as it completes, process all invoices
                together on a Friday afternoon or Sunday evening. Each of these batches eliminates
                multiple context switches and the overhead that comes with them.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Common Batching Categories for Tradespeople
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Communication batch:</strong> All phone calls,
                emails, and WhatsApp replies in 2&ndash;3 fixed windows per day
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Quoting batch:</strong> All quotes written in a
                single session (e.g., Tuesday and Thursday evenings)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Invoicing batch:</strong> All invoices processed in
                one sitting (e.g., Friday afternoon or Sunday evening)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Materials batch:</strong> All material orders
                combined into 1&ndash;2 merchant trips per week
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Certification batch:</strong> All EICR reports, EICs,
                and MWCs completed in a dedicated paperwork session
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Planning batch:</strong> All scheduling, diary
                management, and job sequencing done in one weekly session
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-3-3-context-switching"
            question="An electrician answers 8 phone calls spread throughout the day, each interrupting a different task. If each interruption costs an average of 23 minutes of refocusing time, how much total time is lost to context switching alone?"
            options={[
              'About 30 minutes',
              'About 1 hour',
              'About 3 hours (184 minutes)',
              'About 8 minutes (1 minute per call)',
            ]}
            correctIndex={2}
            explanation="8 calls x 23 minutes of refocusing = 184 minutes, or just over 3 hours. This does not include the duration of the calls themselves. By batching all 8 calls into two dedicated windows, the refocusing cost drops to approximately 46 minutes (2 switches x 23 minutes) \u2014 saving over 2 hours per day."
          />

          {/* Section 2: The 80/20 Rule */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. The 80/20 Rule (Pareto Principle)
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                In 1896, Italian economist Vilfredo Pareto observed that approximately 80% of
                Italy&rsquo;s land was owned by 20% of the population. This unequal distribution
                pattern has since been observed across thousands of different domains, from business
                revenue to software bugs to personal productivity. In the 1940s, management
                consultant Joseph Juran applied Pareto&rsquo;s observation to quality management,
                naming it the &ldquo;Pareto Principle&rdquo; or the &ldquo;80/20 Rule&rdquo; and
                demonstrating that a &ldquo;vital few&rdquo; causes typically account for the
                majority of effects.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Applied to a tradesperson&rsquo;s business, the 80/20 Rule typically reveals
                striking patterns. Roughly 80% of your income may come from 20% of your clients.
                Roughly 80% of your stress may come from 20% of your jobs. Roughly 80% of your
                wasted time may come from 20% of your activities. The exact ratio varies, but the
                principle holds: a small number of inputs drive a disproportionate share of outputs.
                The power of this insight lies in what you do with it.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Once you identify the vital 20%, you can make strategic decisions. If 3 regular
                commercial clients generate 80% of your income, those relationships deserve
                disproportionate attention and care. If small domestic jobs that take all day to
                quote, complete, and invoice generate only 20% of your income, you might raise your
                minimum charge, streamline your process for these jobs, or focus your marketing on
                attracting more of the high-value work. The 80/20 Rule does not tell you to ignore
                80% of your work &mdash; it tells you to invest your limited time and energy where
                the returns are greatest.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Applying 80/20 to Your Business
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              To find your vital 20%, ask yourself these questions:
            </p>
            <div className="space-y-1">
              <p className="text-white text-sm leading-relaxed">
                &bull; Which 20% of my clients generate 80% of my revenue?
              </p>
              <p className="text-white text-sm leading-relaxed">
                &bull; Which 20% of my job types are the most profitable per hour?
              </p>
              <p className="text-white text-sm leading-relaxed">
                &bull; Which 20% of my marketing efforts generate 80% of my enquiries?
              </p>
              <p className="text-white text-sm leading-relaxed">
                &bull; Which 20% of my daily activities produce 80% of my progress?
              </p>
              <p className="text-white text-sm leading-relaxed">
                &bull; Which 20% of my problems cause 80% of my stress?
              </p>
            </div>
          </div>

          {/* Section 3: Batch Processing Communication */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                3. Batch Processing Communication
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For most tradespeople, communication is the single biggest source of
                context-switching throughout the day. Phone calls, WhatsApp messages, emails, and
                text messages arrive continuously, each one creating a micro-interruption that
                fragments your focus. The batch-processing approach to communication transforms this
                chaotic stream into structured, predictable windows that you control rather than
                react to.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The recommended approach is to check and process communications at three fixed times
                per day. A common schedule is 08:00 (before starting site work), 12:00&ndash;12:30
                (during lunch), and 17:00 (after finishing on site). During these windows, you
                process everything: return missed calls, reply to messages, respond to emails, and
                send any outbound communications. Outside these windows, your phone is on silent.
                This does not mean you are unreachable &mdash; genuine emergencies will result in
                multiple calls or someone physically finding you. It means you are not constantly
                reactive to non-urgent communication.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The psychological benefit of batch-processing communication is significant. Instead
                of carrying a constant low-level anxiety about unread messages and missed calls
                throughout the day, you know exactly when you will deal with them. This frees your
                working memory for the task at hand. Many tradespeople who adopt this approach
                report feeling calmer during working hours because they have a plan for
                communication rather than being at the mercy of their phone&rsquo;s notification
                sounds.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-3-3-pareto-clients"
            question="An electrician reviews their accounts and discovers that 3 regular commercial clients generate 78% of their annual income, while 15 domestic clients generate 22%. What does the 80/20 Rule suggest they should do?"
            options={[
              'Drop all domestic clients immediately and only serve the 3 commercial clients',
              'Give disproportionate attention to the 3 commercial relationships while streamlining processes for domestic work',
              'Charge the commercial clients more because they are the most profitable',
              'Treat all 18 clients identically regardless of revenue contribution',
            ]}
            correctIndex={1}
            explanation="The 80/20 Rule does not suggest dropping the 80% \u2014 it suggests investing your limited time and energy where returns are greatest. Prioritise the commercial relationships, ensure they receive excellent service, and streamline your domestic work processes so they are efficient without consuming disproportionate time."
          />

          {/* Section 4: Errands Batching */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Errands Batching &amp; Geographic Grouping
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Errands batching applies the same principle to physical tasks that require travel.
                Every trip to the merchants, every visit to a supplier, every journey to collect a
                tool or material has a fixed travel cost in time and fuel. By combining multiple
                errands into fewer trips, you reduce this overhead substantially. A tradesperson
                making 4 separate merchant trips per week at 45 minutes each spends 3 hours per week
                just travelling to and from the wholesaler. Combining those into 2 trips saves 1.5
                hours per week &mdash; that is 72 hours per year, equivalent to nearly 2 full
                working weeks.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Geographic batching extends this principle to job scheduling. When possible, group
                jobs by area rather than scheduling them in the order they arrive. If you have two
                jobs in the same town, schedule them on the same day rather than making two separate
                journeys. If you have a job near your regular wholesaler, schedule any material
                collection for that day. This requires slightly more planning effort but can save
                significant travel time across a week.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The key to effective errands batching is forward planning. On Sunday evening or
                Friday afternoon, review the week ahead and identify all material needs, tool
                requirements, and errands. Create a consolidated list and plan one or two merchant
                trips for the week, ideally at the start and midpoint. This approach requires
                discipline &mdash; it means resisting the urge to &ldquo;just pop to the
                merchants&rdquo; every time you need a single item. Instead, note the item on your
                list and collect it during your next planned trip unless it is genuinely urgent and
                blocking your current work.
              </p>
            </div>
          </div>

          {/* Section 5: The Sunday Evening Batch */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">5. The Sunday Evening Batch</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Many of the most organised tradespeople share a common habit: a weekly admin batch
                session, typically on Sunday evening. This 1&ndash;2 hour session consolidates all
                the administrative tasks that would otherwise fragment the working week. The session
                includes reviewing and sending invoices for completed jobs, preparing quotes for new
                enquiries, ordering materials for the week ahead, reviewing the diary and schedule,
                chasing any overdue payments, and planning the most efficient route between jobs.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The Sunday evening batch works well for several reasons. First, it happens outside
                of working hours, so there are no site-related interruptions. Second, it creates a
                clean start to Monday morning &mdash; you arrive on site knowing exactly what you
                are doing, with materials ordered and the schedule confirmed. Third, it batches all
                administrative tasks into a single context, avoiding the constant mental switching
                between &ldquo;doing electrical work&rdquo; and &ldquo;doing admin&rdquo; that
                plagues many tradespeople during the week.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The objection to working on Sunday evenings is understandable, but the trade-off is
                significant. Spending 90 minutes on Sunday evening typically saves 3&ndash;4 hours
                during the working week by eliminating scattered admin tasks, reducing forgotten
                invoices, and preventing the Monday morning scramble to work out what you are doing.
                Many tradespeople who adopt this practice report that it reduces their overall
                stress because they feel in control of their business rather than constantly chasing
                their tail.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Sunday Evening Batch Checklist
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">1. Invoices (20 min):</strong> Send invoices for all
                jobs completed this week
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">2. Quotes (20 min):</strong> Write and send quotes
                for all enquiries received
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">3. Materials (15 min):</strong> Review next
                week&rsquo;s jobs and create a consolidated materials list
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">4. Schedule (10 min):</strong> Confirm diary, check
                for clashes, plan travel routes
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5. Chase (10 min):</strong> Follow up on any overdue
                payments
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">6. Certificates (15 min):</strong> Complete any
                outstanding certification paperwork
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-3-3-errands-saving"
            question="A tradesperson makes 4 trips to the merchants per week, each taking 45 minutes. If they batch materials into 2 trips instead, how many hours do they save over a 48-week working year?"
            options={[
              '24 hours (about 3 working days)',
              '48 hours (about 6 working days)',
              '72 hours (about 9 working days)',
              '96 hours (about 12 working days)',
            ]}
            correctIndex={2}
            explanation="4 trips x 45 min = 180 min/week. 2 trips x 45 min = 90 min/week. Saving = 90 min/week. Over 48 weeks: 90 x 48 = 4,320 minutes = 72 hours = approximately 9 working days saved per year \u2014 simply by consolidating merchant trips."
          />

          {/* Section 6: Eliminating Low-Value Tasks */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. Eliminating, Automating &amp; Delegating Low-Value Tasks
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The 80/20 Rule does not just help you identify high-value activities &mdash; it also
                reveals the low-value tasks that consume your time without producing proportionate
                returns. Once identified, these tasks should be subjected to a simple three-step
                filter: can it be eliminated entirely? Can it be automated? Can it be delegated?
                Only if it fails all three tests should you continue doing it yourself.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Elimination is the most powerful option. Many tasks that feel necessary are actually
                habits or traditions that no longer serve a purpose. Do you really need to visit
                three wholesalers to compare prices on standard cable, or could you establish an
                account with one reliable supplier and accept their pricing? Do you need to write
                detailed covering letters with every quote, or would a professional template with a
                personalised line suffice? Challenge every recurring task by asking: &ldquo;What
                would happen if I simply stopped doing this?&rdquo; You may be surprised how many
                tasks can be eliminated with no negative consequence.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Automation covers tasks that must be done but can be handled by technology.
                Invoicing software can generate and send invoices automatically. Accounting software
                can reconcile bank transactions. Calendar apps can send appointment reminders to
                clients. Online ordering can replace physical merchant visits for standard
                materials. Each automation removes a recurring task from your to-do list
                permanently. Delegation covers tasks that require a human but do not require your
                specific expertise &mdash; bookkeeping, van cleaning, social media posting, or
                answering routine enquiry calls can all be delegated to a part-time administrator or
                virtual assistant.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">The Elimination Test</h3>
            <p className="text-white text-sm leading-relaxed">
              For every recurring task, ask: <strong className="text-white">1)</strong> What would
              happen if I stopped doing this entirely? <strong className="text-white">2)</strong>{' '}
              Can technology do this for me? <strong className="text-white">3)</strong> Can someone
              else do this more cost-effectively than me? If your hourly rate is &pound;45 and a
              task could be delegated to a virtual assistant at &pound;15/hour, every hour you spend
              on that task costs you &pound;30 in lost productive capacity.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Task batching groups similar activities together, reducing the cognitive cost of context switching between different types of work',
                'The 80/20 Rule (Pareto, 1896; Juran, 1940s) reveals that approximately 20% of activities generate 80% of results \u2014 invest time accordingly',
                'Batch-processing communication at 3 fixed times daily eliminates constant reactive interruptions while maintaining responsiveness',
                'Errands batching (consolidating merchant trips, geographic job grouping) can save over 70 hours per year',
                'The Sunday evening batch session consolidates all admin into a focused 90-minute window, freeing the working week for productive site work',
                'Low-value tasks should be eliminated, automated, or delegated before accepting them as part of your routine',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Does the 80/20 ratio have to be exactly 80/20?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  No. The numbers are approximate and illustrative. The actual ratio might be 70/30,
                  90/10, or any other unequal distribution. The principle is that inputs and outputs
                  are rarely distributed equally &mdash; a small proportion of causes typically
                  produces a disproportionate share of effects. The exact numbers matter less than
                  the insight that not all activities are equally valuable.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if clients complain about not being able to reach me immediately?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Set expectations proactively. A voicemail message or auto-reply saying
                  &ldquo;I&rsquo;m currently on site and return all calls between 12:00&ndash;12:30
                  and 17:00&ndash;17:30&rdquo; is professional and clear. Most clients respect this
                  &mdash; they deal with solicitors, accountants, and doctors who all operate the
                  same way. The key is reliability: if you say you will call back at 12, call back
                  at 12.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is batching suitable for emergency/reactive electrical work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Emergency call-outs are inherently unplannable and should be treated as exceptions
                  to the batching system. However, the admin that follows emergency work (invoicing,
                  certification, parts ordering) can and should still be batched. The batching
                  approach works best for the predictable, recurring elements of your business.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How do I start if I currently do everything reactively?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Start with one batch. Choose the task category that causes you the most stress
                  (often invoicing or quoting) and commit to batching it for one week. Do all your
                  invoicing in one sitting rather than individually. Once you experience the time
                  saving and reduced stress, add another batch category. Most tradespeople have
                  their full batching system in place within 3&ndash;4 weeks.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Section 3 Quiz: Batching & the 80/20 Rule" />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3-section-4">
                Next: Energy Management vs Time Management
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
