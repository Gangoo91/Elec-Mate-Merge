import { ArrowLeft, Inbox, CheckCircle } from 'lucide-react';
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
    id: 'tmo-2-1-check1',
    question:
      'A self-employed electrician keeps forgetting to order MCBs for upcoming jobs. According to GTD, what is the root cause of this problem?',
    options: [
      'The electrician has a bad memory and should try harder to remember things',
      'The electrician has not captured the commitment into a trusted external system',
      'The electrician needs to write longer to-do lists',
      'The electrician should hire an assistant to manage orders',
    ],
    correctIndex: 1,
    explanation:
      'David Allen\'s core principle is that the mind is for having ideas, not holding them. When a commitment like "order MCBs for Thursday\'s job" stays in your head rather than being captured into a trusted external system (a notebook, an app, a whiteboard), it is subject to being forgotten because the brain is unreliable as a storage device. The fix is not to try harder to remember — it is to capture every commitment immediately into your inbox and process it during your next review.',
  },
  {
    id: 'tmo-2-1-check2',
    question:
      'During a GTD weekly review, an electrician discovers an unsent EICR report from 10 days ago. What GTD step does the weekly review primarily belong to?',
    options: [
      'Capture — because the review captures new tasks',
      'Clarify — because the review defines next actions',
      'Reflect — because the review involves stepping back to assess all commitments and ensure nothing has slipped',
      'Engage — because the review is about doing the work',
    ],
    correctIndex: 2,
    explanation:
      'The weekly review belongs to the Reflect step of GTD. Allen describes the weekly review as "the critical success factor for the GTD methodology" because it is the moment you step back from the doing and survey the entire landscape of your commitments. The unsent EICR report was captured and clarified at some point but slipped through the cracks — the weekly review catches exactly these kinds of oversight by systematically reviewing every project and next-action list.',
  },
  {
    id: 'tmo-2-1-check3',
    question:
      'An electrician on site receives a text asking them to call back a supplier about a delayed delivery. The call will take about 90 seconds. According to the GTD 2-minute rule, what should they do?',
    options: [
      'Add it to their task list and do it during admin time',
      'Do it immediately — it will take less than 2 minutes, so processing it takes longer than doing it',
      'Ignore it until the end of the day',
      'Delegate it to someone else',
    ],
    correctIndex: 1,
    explanation:
      'The GTD 2-minute rule states that if a next action will take less than 2 minutes to complete, you should do it immediately rather than capturing, organising, and tracking it. The overhead of recording, filing, reviewing, and then executing a 90-second phone call far exceeds the time required to simply make the call now. This rule prevents your task lists from being clogged with trivial items and ensures small actions do not accumulate into a backlog.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do I need to buy the Getting Things Done book to use the system?',
    answer:
      'You do not need to read the book to apply the core principles, but it is highly recommended for a deeper understanding. David Allen\'s "Getting Things Done: The Art of Stress-Free Productivity" was first published in 2001 and revised in 2015. The revised edition updates the methodology for digital tools and modern workflows. The five steps — capture, clarify, organise, reflect, engage — are the framework. This section gives you the essentials adapted for tradespeople, but the book provides the full depth including handling complex multi-step projects, delegation, and advanced reference filing.',
  },
  {
    question: 'Is GTD too complicated for a sole trader? I just need a simple to-do list.',
    answer:
      'GTD is often perceived as complex because the book covers every possible scenario including large organisations and multi-team projects. For a sole trader, you only need the core workflow: one inbox (a notes app, a small notebook), a next-actions list, a waiting-for list, a someday/maybe list, and a weekly review. That is five things. Many tradespeople find that GTD is actually simpler than the chaos of trying to remember everything, because it moves everything out of your head into a system you can trust. The simplicity comes from having a single, consistent process rather than many ad-hoc methods.',
  },
  {
    question: 'What tools do I need for GTD as an electrician?',
    answer:
      'The minimum viable GTD setup for a tradesperson is: (1) a capture tool you always have with you — a notes app on your phone is ideal because it is always in your pocket; (2) a next-actions list — this can be the same app, a spreadsheet, or a whiteboard at home; (3) a calendar for time-specific commitments; (4) a 30-minute weekly review slot. That is it. You do not need expensive software, project management tools, or complex systems. The tool matters far less than the habit. The best GTD tool is the one you will actually use consistently.',
  },
  {
    question: 'How long does the weekly review actually take?',
    answer:
      'For a sole trader electrician, a thorough weekly review typically takes 20 to 30 minutes once the habit is established. The first few weekly reviews may take 45 minutes to an hour because you are building the system from scratch and have a backlog of uncaptured commitments. After 3 to 4 weeks, the process becomes faster because you are maintaining the system rather than building it. Allen recommends scheduling the review at the same time each week — many tradespeople find Friday afternoon (winding down from the working week) or Sunday evening (preparing for the week ahead) works best.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "David Allen's GTD methodology is built on the principle that:",
    options: [
      'You should keep all commitments in your head to stay mentally sharp',
      'The mind is for having ideas, not holding them — external capture frees cognitive bandwidth',
      'Multi-tasking is the most productive way to work',
      'Planning is unnecessary if you are experienced enough',
    ],
    correctAnswer: 1,
    explanation:
      'Allen\'s foundational insight is that using your brain as a storage device for commitments, reminders, and open loops creates stress and reduces cognitive performance. When you capture everything into a trusted external system, your mind is freed to focus on the task at hand — what Allen calls "mind like water," a state of calm responsiveness rather than anxious reactivity.',
  },
  {
    id: 2,
    question: 'The five steps of the GTD workflow, in order, are:',
    options: [
      'Plan, Execute, Review, Adjust, Complete',
      'Capture, Clarify, Organise, Reflect, Engage',
      'List, Prioritise, Schedule, Do, Review',
      'Collect, Sort, File, Act, Archive',
    ],
    correctAnswer: 1,
    explanation:
      'The five steps are: Capture (collect everything that has your attention into an inbox), Clarify (determine what each item means and what the next action is), Organise (put items into the appropriate lists — next actions, waiting for, calendar, someday/maybe), Reflect (review the whole system regularly, especially in the weekly review), and Engage (do the work with confidence that you are working on the right thing).',
  },
  {
    id: 3,
    question:
      'According to the GTD 2-minute rule, if a next action will take less than 2 minutes you should:',
    options: [
      'Add it to your next-actions list for later',
      'Delegate it to someone else',
      'Do it immediately — the overhead of tracking it exceeds the time to complete it',
      'Batch it with other small tasks for efficiency',
    ],
    correctAnswer: 2,
    explanation:
      'The 2-minute rule is a processing heuristic: when you clarify an item and determine the next action, if that action takes less than 2 minutes, do it right away. Recording it, filing it, reviewing it, and then doing it later would take more total time and effort than simply completing it now. This prevents task lists from being clogged with trivial items.',
  },
  {
    id: 4,
    question: 'Allen describes the weekly review as:',
    options: [
      'An optional extra for people who enjoy planning',
      'Something only managers need to do',
      'The critical success factor for the entire GTD methodology',
      'A monthly activity that takes about 2 hours',
    ],
    correctAnswer: 2,
    explanation:
      'Allen calls the weekly review "the critical success factor" because it is the habit that keeps the system trustworthy. Without regular review, lists go stale, items are forgotten, and the system loses the trust that makes it work. A system you do not trust is a system you stop using. The weekly review — typically 20 to 30 minutes — ensures every commitment is current, every project has a defined next action, and nothing has slipped through the cracks.',
  },
  {
    id: 5,
    question: 'In GTD, a "trusted system" means:',
    options: [
      'An expensive digital tool with cloud backup',
      'A system you review regularly enough that you trust it contains everything — so your brain can let go',
      'A fireproof filing cabinet for paper records',
      'A system recommended by a professional productivity consultant',
    ],
    correctAnswer: 1,
    explanation:
      'A trusted system is any external system — paper, digital, or hybrid — that you capture everything into and review regularly enough that you genuinely trust it contains all your commitments. The format does not matter; the trust does. If you trust your system, your brain will stop trying to hold everything, reducing stress and improving focus. If the system is unreliable or unreviewed, your brain reverts to anxious internal tracking.',
  },
  {
    id: 6,
    question: 'For a sole-trader electrician adapting GTD, which contexts are most practical?',
    options: [
      'Home, Office, Computer, Phone, Errands — the standard GTD contexts',
      'Van, Site, Office/Home, Phone, Merchant — contexts that match how a tradesperson actually works',
      'Urgent, Important, Delegate, Delete — the Eisenhower Matrix categories',
      'Morning, Afternoon, Evening — time-based contexts only',
    ],
    correctAnswer: 1,
    explanation:
      'Allen recommends organising next actions by context — the tool, location, or condition required to do them. For tradespeople, the standard office-based contexts (Computer, Office, Errands) do not fit well. Practical trade contexts might include: Van (tasks you can do from the van — calls, ordering), Site (tasks requiring you to be on a specific job), Office/Home (admin, paperwork, invoicing), Phone (calls to make when you have signal and time), and Merchant (items to collect next time you visit). This ensures you see only the actions you can actually do right now.',
  },
  {
    id: 7,
    question:
      'An electrician finishes a job and has 15 minutes before their next appointment. According to GTD, the best approach is:',
    options: [
      'Scroll social media to relax',
      'Check their context-based next-actions list for tasks that can be done in 15 minutes with the tools currently available',
      'Start driving to the next job early and wait outside',
      'Call a friend to fill the time',
    ],
    correctAnswer: 1,
    explanation:
      'GTD provides a framework for these exact situations. By maintaining context-based lists, you always know what you can do right now with the time and tools available. In 15 minutes from the van, you might: make a quick phone call, send a quote, order materials, capture notes from the job just completed, or update your job tracking. These small windows add up — five 15-minute windows per week is over an hour of recovered productivity.',
  },
  {
    id: 8,
    question: 'The concept of "mind like water" in GTD refers to:',
    options: [
      'A meditation technique performed before each workday',
      'The ability to drink lots of water for better concentration',
      'A state of calm readiness where you respond appropriately to inputs because nothing is forgotten or nagging at you',
      'A technique for memorising long task lists',
    ],
    correctAnswer: 2,
    explanation:
      'Allen borrows "mind like water" from martial arts: when you throw a stone into water, the water responds proportionately — not over-reacting, not under-reacting. When your system captures everything and you trust it completely, your mind achieves this state. You respond to incoming demands calmly and proportionately because nothing is lurking in the back of your mind creating anxiety. The opposite state — where forgotten commitments and uncaptured ideas create a background hum of stress — is what most people experience before implementing GTD.',
  },
];

export default function TMOModule2Section1() {
  useSEO({
    title: 'The GTD Method for Tradespeople | Time Management & Organisation Module 2.1',
    description:
      "David Allen's Getting Things Done adapted for sole traders and electricians: capture, clarify, organise, reflect, engage.",
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
            <Inbox className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The GTD Method for Tradespeople
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            David Allen&rsquo;s Getting Things Done: capture, clarify, organise, reflect, engage
            &mdash; adapted for sole traders and electricians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>GTD principle:</strong> Your mind is for having ideas, not holding them
              </li>
              <li>
                <strong>5 steps:</strong> Capture, Clarify, Organise, Reflect, Engage
              </li>
              <li>
                <strong>2-minute rule:</strong> If it takes under 2 minutes, do it now
              </li>
              <li>
                <strong>Weekly review:</strong> 30 minutes that makes the whole system work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reliability:</strong> Nothing falls through the cracks &mdash; no forgotten
                orders, no unsent certificates
              </li>
              <li>
                <strong>Stress reduction:</strong> A trusted system stops the background hum of
                &ldquo;what am I forgetting?&rdquo;
              </li>
              <li>
                <strong>Professionalism:</strong> Clients notice when you follow through on every
                commitment
              </li>
              <li>
                <strong>Capacity:</strong> Free mental bandwidth means better decisions on site
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the core principle of GTD and why external capture reduces cognitive load',
              'List and describe the five steps of the GTD workflow: Capture, Clarify, Organise, Reflect, Engage',
              'Apply the 2-minute rule to real-world trade scenarios',
              'Design a simple trusted system using tools available to any tradesperson',
              'Conduct a weekly review adapted for a sole-trader electrician',
              'Identify practical GTD contexts for construction and electrical work',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Core Principle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Core Principle &mdash; Mind Like Water
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2001, productivity consultant <strong>David Allen</strong> published{' '}
                <em>Getting Things Done: The Art of Stress-Free Productivity</em>, a book that would
                go on to sell over 2 million copies and fundamentally reshape how knowledge workers
                think about personal organisation. The revised 2015 edition updated the methodology
                for the digital age, but the core insight remained unchanged:{' '}
                <strong>your mind is for having ideas, not holding them.</strong>
              </p>

              <p>
                Allen observed that most people carry dozens &mdash; sometimes hundreds &mdash; of
                uncaptured commitments in their heads. Every &ldquo;I need to remember
                to&hellip;&rdquo; occupies a slice of cognitive bandwidth. Psychologists call these{' '}
                <strong>open loops</strong>: incomplete tasks or commitments that your subconscious
                mind continually tracks, even when you are not consciously thinking about them.
                Research by Baumeister and Masicampo (2011) at Florida State University confirmed
                that unfinished tasks cause intrusive thoughts that impair concentration on current
                work &mdash; but crucially, the act of making a plan to complete the task (capturing
                it and defining a next action) eliminates the intrusive thoughts almost entirely,
                even before the task is done.
              </p>

              <p>
                For tradespeople, this is particularly relevant. An electrician on site might be
                simultaneously holding: &ldquo;I need to order MCBs for Thursday&rsquo;s job,&rdquo;
                &ldquo;I haven&rsquo;t sent that EICR report yet,&rdquo; &ldquo;The van needs an MOT
                next month,&rdquo; &ldquo;I promised Mrs. Chen a quote by Friday,&rdquo; &ldquo;I
                should chase that invoice from three weeks ago.&rdquo; Each of these open loops
                consumes mental energy, creating a background hum of anxiety that Allen calls the
                opposite of &ldquo;mind like water&rdquo; &mdash; a martial arts concept describing
                calm, proportionate responsiveness. When water is disturbed, it responds exactly in
                proportion to the input and then returns to calm. GTD aims to create that state in
                your working life by moving every commitment out of your head and into a trusted
                external system.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The GTD Core Principle</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Your mind is for having ideas, not holding them.&rdquo;</strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; David Allen, <em>Getting Things Done</em> (2001, revised 2015)
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> Every commitment that stays in your head rather
                  than in a trusted external system creates cognitive load, reduces focus, and
                  increases the risk of things being forgotten. Capture everything. Trust nothing to
                  memory alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 5 Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Five Steps of GTD
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                GTD is built on a five-step workflow that transforms chaotic inputs &mdash; phone
                calls, texts, emails, verbal requests, your own ideas &mdash; into organised,
                actionable commitments. The power of the system lies in the consistency of the
                process: every single input, regardless of source or complexity, passes through the
                same five steps. This eliminates the cognitive overhead of deciding <em>how</em> to
                handle each input, because the process is always the same.
              </p>

              <p>
                <strong>Step 1: Capture.</strong> Collect everything that has your attention into a
                single inbox. Allen stresses the word &ldquo;everything&rdquo; &mdash; not just work
                tasks, but personal commitments, ideas, things you need to buy, people you need to
                call, problems you have noticed, opportunities you want to explore. The inbox can be
                a notes app on your phone, a small notebook in your pocket, a voice recorder, or
                even a dedicated email address. The only requirement is that you always have it with
                you and that you trust yourself to process it regularly. For an electrician on site,
                a phone app is ideal: when you notice &ldquo;the silicone gun in the van is nearly
                empty,&rdquo; you capture it immediately rather than hoping you will remember later.
              </p>

              <p>
                <strong>Step 2: Clarify.</strong> Process each item in your inbox by asking two
                questions. First: &ldquo;What is this?&rdquo; Second: &ldquo;What is the next
                physical, visible action required to move it forward?&rdquo; The next action must be
                concrete and specific &mdash; not &ldquo;sort out the Smith job&rdquo; but
                &ldquo;call Mr. Smith to confirm access arrangements for Monday.&rdquo; If there is
                no action required, the item is either reference material (file it), a someday/maybe
                idea (park it), or rubbish (delete it). If the next action takes less than 2
                minutes, do it immediately &mdash; this is Allen&rsquo;s famous{' '}
                <strong>2-minute rule</strong>, which prevents trivial items from clogging your
                system.
              </p>

              <p>
                <strong>Step 3: Organise.</strong> Place clarified items into the appropriate
                bucket. Allen defines four main destinations: a <strong>Next Actions list</strong>{' '}
                (organised by context &mdash; where or with what tool you need to do it), a{' '}
                <strong>Waiting For list</strong> (things you have delegated or are waiting on
                others for), a <strong>Calendar</strong> (only for items with a hard date or time
                &mdash; appointments, deadlines, meetings), and a{' '}
                <strong>Someday/Maybe list</strong> (ideas and projects you might want to do but not
                now). Multi-step outcomes become <strong>Projects</strong>, each with its own
                defined next action.
              </p>

              <p>
                <strong>Step 4: Reflect.</strong> Review the entire system regularly. The
                cornerstone is the <strong>weekly review</strong> &mdash; Allen calls it the
                &ldquo;critical success factor for the entire methodology.&rdquo; During the weekly
                review (typically 20&ndash;30 minutes once the habit is established), you: clear
                your inbox completely, review every active project to ensure each has a defined next
                action, scan your calendar for upcoming commitments, review your Waiting For list to
                chase anything overdue, and scan your Someday/Maybe list for items ready to
                activate.
              </p>

              <p>
                <strong>Step 5: Engage.</strong> Do the work. When you sit down (or stand up, or
                climb a ladder) to work, you choose what to do based on four criteria: context (what
                can you do right now given your tools and location?), time available (do you have 5
                minutes or 2 hours?), energy level (are you sharp enough for complex calculations or
                better suited to routine tasks?), and priority (of the options that pass the first
                three filters, which matters most?). Because your system is trusted and current, you
                can make this choice confidently rather than anxiously.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The GTD Workflow</p>
                <ul className="text-sm text-white space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-rose-400 flex-shrink-0">1.</span>
                    <span>
                      <strong>Capture</strong> &mdash; Collect everything into one inbox
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-rose-400 flex-shrink-0">2.</span>
                    <span>
                      <strong>Clarify</strong> &mdash; Define the next physical action for each item
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-rose-400 flex-shrink-0">3.</span>
                    <span>
                      <strong>Organise</strong> &mdash; Sort into Next Actions, Waiting For,
                      Calendar, Someday/Maybe, or Reference
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-rose-400 flex-shrink-0">4.</span>
                    <span>
                      <strong>Reflect</strong> &mdash; Weekly review to keep the system current and
                      trustworthy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-rose-400 flex-shrink-0">5.</span>
                    <span>
                      <strong>Engage</strong> &mdash; Do the work, choosing based on context, time,
                      energy, and priority
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The 2-Minute Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The 2-Minute Rule &mdash; Small Actions, Immediate Execution
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most immediately practical elements of GTD is the{' '}
                <strong>2-minute rule</strong>. During the Clarify step, when you determine the next
                action for an item, you ask: &ldquo;Will this take less than 2 minutes?&rdquo; If
                yes, do it right now. Do not add it to a list, do not schedule it, do not file it
                for later. The rationale is straightforward: the total time required to capture,
                organise, review, and eventually execute a 2-minute task far exceeds the time
                required to simply do it immediately. Processing overhead should never exceed
                execution time.
              </p>

              <p>
                For tradespeople, 2-minute actions are everywhere. Replying to a one-line text from
                a client: 30 seconds. Saving a photo of a completed job to the project folder: 45
                seconds. Adding a part to an order list: 20 seconds. Sending a quick &ldquo;running
                10 minutes late&rdquo; message: 15 seconds. Checking the expiry date on your
                multi-function tester calibration certificate: 1 minute. Each of these is trivial in
                isolation, but when they accumulate on a to-do list they create clutter and
                cognitive weight. The 2-minute rule keeps the system clean by eliminating items at
                the point of entry.
              </p>

              <p>
                There is an important caveat: the 2-minute rule applies during{' '}
                <em>processing time</em>, not during <em>focused work</em>. If you are halfway
                through wiring a consumer unit, you should not stop every time a 2-minute task
                appears. Instead, capture it (a quick note on your phone) and apply the 2-minute
                rule when you next process your inbox &mdash; during a break, between jobs, or at
                the end of the day. The rule is a processing heuristic, not a licence to be
                constantly interrupted.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Examples: The 2-Minute Rule in Action
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Text reply to a client:</strong> &ldquo;Confirmed for Thursday
                      8am&rdquo; &mdash; 20 seconds. Do it now.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Add MCBs to the merchant order list:</strong> Open the notes app, type
                      &ldquo;6x B32 MCBs&rdquo; &mdash; 15 seconds. Do it now.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Call the supplier about a delivery:</strong> 90-second phone call. Do
                      it now.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Write up a full EICR report:</strong> 45 minutes. Do NOT do it now
                      &mdash; add it to your next-actions list under the &ldquo;Office/Home&rdquo;
                      context.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Weekly Review */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Weekly Review &mdash; The Habit That Makes GTD Work
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Allen is emphatic that the weekly review is not optional &mdash; it is the single
                habit that determines whether GTD succeeds or fails. Without regular review, your
                lists go stale, you lose trust in the system, and your brain reverts to anxious
                internal tracking. The weekly review is the moment you step back from doing and
                survey the complete landscape of your commitments. It takes 20 to 30 minutes once
                the habit is established, and many practitioners report it is the most valuable 30
                minutes of their week.
              </p>

              <p>
                The weekly review has a specific structure. First, you <strong>get clear</strong>:
                empty your inbox completely, process every item, and collect any loose notes,
                receipts, or scribbles from the week. Second, you <strong>get current</strong>:
                review every active project to ensure each has a defined next action, scan your
                calendar for the previous and upcoming weeks to catch anything triggered by dates,
                and review your Waiting For list to chase anything overdue. Third, you{' '}
                <strong>get creative</strong>: scan your Someday/Maybe list for items you want to
                activate, brainstorm new ideas or opportunities, and consider whether your current
                projects still align with your goals.
              </p>

              <p>
                For a sole-trader electrician, the weekly review might look like this. Friday
                afternoon at 3:30pm, with a cup of tea, you sit down for 25 minutes. You clear your
                phone notes inbox &mdash; processing each captured item into next actions, calendar
                entries, or delete. You review your active projects: the Smith rewire (next action:
                order trunking before Monday), the Johnson EV charger (next action: chase DNO
                application, 8 days and counting), the Henderson kitchen (next action: schedule
                second fix for next Wednesday). You scan your Waiting For list: still waiting on the
                EICR from the subcontractor for the commercial job, still waiting on a quote
                response from the Petersons. You check next week&rsquo;s calendar: three confirmed
                jobs, an MOT appointment on Wednesday afternoon, and a training session Thursday
                evening. You notice a gap on Friday &mdash; perfect for catching up on two overdue
                quotes. The review is complete. You have full visibility of everything, and nothing
                is lurking in the back of your mind.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Weekly Review Checklist for Tradespeople
                </p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li>&bull; Empty your capture inbox completely &mdash; process every item</li>
                  <li>
                    &bull; Review every active job/project &mdash; does each have a clear next
                    action?
                  </li>
                  <li>&bull; Check your Waiting For list &mdash; chase anything overdue</li>
                  <li>&bull; Scan last week&rsquo;s calendar for follow-ups or missed items</li>
                  <li>&bull; Preview next week&rsquo;s calendar for preparation needed</li>
                  <li>&bull; Review Someday/Maybe for items ready to activate</li>
                  <li>&bull; Check materials orders needed for next week&rsquo;s jobs</li>
                  <li>&bull; Update any outstanding certificates, reports, or invoices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Adapting GTD for Sole Traders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Adapting GTD for Sole Traders &amp; Electricians
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The original GTD book was written primarily for corporate knowledge workers &mdash;
                people in offices with email inboxes, filing cabinets, and meeting schedules.
                Adapting the methodology for tradespeople requires rethinking some of the
                implementation details while keeping the principles intact. The good news is that a
                sole trader&rsquo;s GTD system is actually <em>simpler</em> than a corporate one,
                because you have fewer stakeholders, fewer meeting-driven commitments, and more
                direct control over your schedule.
              </p>

              <p>
                <strong>Contexts for tradespeople.</strong> Allen recommends organising next actions
                by context &mdash; the location, tool, or condition required to perform them. The
                standard GTD contexts (Computer, Office, Calls, Errands, Home, Anywhere) do not map
                well to trade work. More practical contexts for an electrician might be:{' '}
                <strong>Van</strong> (tasks you can do from the van &mdash; phone calls, ordering
                materials online, reviewing notes), <strong>Site</strong> (tasks requiring physical
                presence at a specific job), <strong>Office/Home</strong> (admin, invoicing, EICR
                write-ups, quoting), <strong>Phone</strong> (calls to make when you have good signal
                and a few minutes), and <strong>Merchant</strong> (items to collect or check next
                time you visit the wholesaler). When you are sitting in the van with 10 minutes
                before the next job, you check your &ldquo;Van&rdquo; context list and immediately
                see what you can do right now.
              </p>

              <p>
                <strong>The brain dump.</strong> If you have never used GTD before, Allen recommends
                starting with a comprehensive brain dump: sit down with a blank page and write down
                every single commitment, task, idea, concern, and open loop you can think of. Do not
                organise, do not prioritise, do not judge &mdash; just dump. Most people generate
                100 to 300 items in their first brain dump. For a tradesperson, this might include:
                unfinished jobs, unsent quotes, unchased invoices, materials to order, van
                maintenance, tool calibrations, training courses to book, certificates to renew,
                personal errands, family commitments, and business ideas. The act of dumping
                everything onto paper produces an immediate and often dramatic sense of relief
                &mdash; because for the first time, your brain knows that nothing is being
                forgotten.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: GTD in a Working Week
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Monday morning, on site at the Henderson kitchen rewire. While running cables, the
                  electrician notices the silicone gun is nearly empty &mdash; captures &ldquo;buy
                  silicone&rdquo; into the phone notes app (5 seconds). At lunchtime, processes the
                  inbox: silicone goes to the &ldquo;Merchant&rdquo; context list. A text from Mrs.
                  Chen asking for a quote response is a 2-minute action &mdash; replies immediately.
                  A voicemail from the DNO about the EV charger application needs a 10-minute call
                  &mdash; goes to the &ldquo;Phone&rdquo; context list. On Wednesday afternoon,
                  waiting for an access arrangement at a commercial site, checks the
                  &ldquo;Phone&rdquo; list and makes the DNO call. Friday afternoon at 3:30pm, sits
                  down for the weekly review: discovers the Henderson EICR has not been written up,
                  adds it to &ldquo;Office/Home&rdquo; with a target of Sunday evening. Nothing
                  slipped. Nothing forgotten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Trusted System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Building a Trusted System
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The entire GTD methodology rests on one word: <strong>trust</strong>. A trusted
                system is one that you believe contains every commitment you have made. If you trust
                it, your brain lets go &mdash; it stops the anxious background scanning because it
                knows the system has everything covered. If you do not trust it (because it is
                incomplete, outdated, or unreliable), your brain will not let go, and you are back
                to mental juggling. Trust is earned through consistent capture and regular review.
                It is not about the tool &mdash; a paper notebook can be trusted just as much as a
                sophisticated app, provided you use it consistently.
              </p>

              <p>
                For tradespeople who are sceptical of &ldquo;systems,&rdquo; it helps to reframe GTD
                as insurance against the most common professional failures: forgotten commitments.
                Think about the consequences of forgetting to order materials for a job (day
                wasted), forgetting to send a certificate (legal liability), forgetting to chase an
                invoice (cash flow problem), or forgetting a client callback (lost reputation). Each
                of these is a real business cost. GTD does not add complexity to your life &mdash;
                it replaces the unreliable system you are already using (your memory) with one that
                does not forget.
              </p>

              <p>
                The minimum viable GTD system for a sole trader requires four components: (1) a
                capture tool you always carry &mdash; a notes app on your phone is the simplest
                option; (2) a next-actions list, ideally organised by context &mdash; this can be in
                the same app or on a whiteboard at home; (3) a calendar for time-specific
                commitments &mdash; your phone calendar works perfectly; and (4) a weekly review
                habit &mdash; 25 minutes at the same time each week. That is it. You do not need
                specialised software, complex folder structures, or expensive tools. The best system
                is the one you will actually use, and simplicity is the strongest predictor of
                sustained use.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Minimum Viable GTD Setup</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Capture tool:</strong> Phone notes app (always in your pocket on site)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Next-actions list:</strong> Organised by context (Van, Site, Office,
                      Phone, Merchant)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Calendar:</strong> Phone calendar for time-specific commitments only
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Weekly review:</strong> 25 minutes, same time every week (Friday
                      3:30pm or Sunday 7pm)
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
                This section has introduced David Allen&rsquo;s GTD methodology and adapted it for
                the realities of trade work. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Your mind is for having ideas, not holding them.</strong> External
                    capture frees cognitive bandwidth and reduces stress. Research confirms that
                    making a plan to complete a task eliminates intrusive thoughts about it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 5 steps</strong> &mdash; Capture, Clarify, Organise, Reflect, Engage
                    &mdash; provide a consistent workflow for handling every input, from a text
                    message to a major project.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 2-minute rule</strong> prevents trivial tasks from clogging your
                    system. If a next action takes less than 2 minutes, do it now.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The weekly review</strong> (20&ndash;30 minutes) is the habit that makes
                    the entire system trustworthy. Without it, lists go stale and the brain reverts
                    to anxious internal tracking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Trade-specific contexts</strong> (Van, Site, Office/Home, Phone,
                    Merchant) make GTD practical for electricians by organising actions around how
                    you actually work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Trust is everything.</strong> The system only works if you trust it
                    contains all your commitments. Trust is built through consistent capture and
                    regular review.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Reference:</strong> David Allen,{' '}
                  <em>Getting Things Done: The Art of Stress-Free Productivity</em> (2001, revised
                  2015). Baumeister &amp; Masicampo, &ldquo;Consider It Done! Plan Making Can
                  Eliminate the Cognitive Effects of Unfulfilled Goals,&rdquo;{' '}
                  <em>Journal of Personality and Social Psychology</em>, 2011.
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
            <Link to="../tmo-module-2-section-2">
              Next: Weekly Planning &amp; Job Scheduling
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
