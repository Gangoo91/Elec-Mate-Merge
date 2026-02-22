import { ArrowLeft, Hourglass, CheckCircle } from 'lucide-react';
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
    id: 'tmo-5-3-emotional',
    question: 'According to Pychyl and Sirois, procrastination is fundamentally a problem of:',
    options: [
      'Poor time management and lack of organisational skills',
      'Laziness and a weak work ethic',
      'Emotional regulation — we avoid tasks because of negative emotions associated with them, not because we cannot manage time',
      'Intelligence — more intelligent people procrastinate less because they plan better',
    ],
    correctIndex: 2,
    explanation:
      'Timothy Pychyl and Fuschia Sirois\'s research has consistently demonstrated that procrastination is an emotional regulation problem, not a time management problem. We procrastinate not because we lack schedules or calendars, but because the task triggers negative emotions — boredom, anxiety, frustration, resentment, fear of failure — and we seek short-term mood repair by doing something more pleasant instead. Understanding this is critical because it changes the solution: the answer is not "get a better diary" but "address the emotional barrier."',
  },
  {
    id: 'tmo-5-3-frog',
    question:
      'Brian Tracy\'s "eat the frog" principle recommends doing your hardest or most dreaded task:',
    options: [
      'At the end of the day when you have built up momentum from easier tasks',
      'First thing in the morning when willpower and mental energy are at their peak',
      'On Friday afternoon when you have the weekend to recover',
      'Only when you feel motivated and ready to tackle it',
    ],
    correctIndex: 1,
    explanation:
      'Tracy\'s principle is based on the well-established finding that willpower and cognitive resources are highest in the morning and decline throughout the day. By tackling the most difficult, most dreaded, or most important task first (the "frog"), you ensure it gets done when you have the most mental energy. If you leave it until the afternoon, decision fatigue and reduced willpower make it far more likely that you will procrastinate. As Tracy says: "If you have to eat a live frog, do not sit and stare at it all morning."',
  },
  {
    id: 'tmo-5-3-admin',
    question:
      'An electrician avoids doing their quarterly VAT return until the deadline day, then spends a stressful evening gathering receipts and invoices. This is an example of:',
    options: [
      'Efficient time management — completing the task just before the deadline minimises wasted effort',
      'Administrative procrastination — avoiding paperwork until external pressure (the deadline) forces action, causing unnecessary stress and risk of errors',
      'Good prioritisation — on-site work should always take priority over paperwork',
      'A normal and healthy approach that most successful business people follow',
    ],
    correctIndex: 1,
    explanation:
      'Administrative procrastination is one of the most common and costly forms of procrastination for tradespeople. The quarterly VAT return is a known, predictable task with a fixed deadline, yet it is repeatedly delayed because the emotional experience of doing it (boring, tedious, anxiety-inducing) triggers avoidance. The cost is significant: last-minute rushes increase error rates, the stress contaminates the evening, and important receipts or invoices may be missing. A 20-minute weekly bookkeeping habit would make the quarterly return a 30-minute formality rather than a 4-hour crisis.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is procrastination really not about laziness?',
    answer:
      "No, and this is one of the most important findings in procrastination research. Timothy Pychyl, one of the world's leading procrastination researchers, is emphatic on this point: procrastination is a failure of emotional regulation, not a failure of effort or character. Lazy people do not want to do the task and do not care about the consequences. Procrastinators want to do the task, intend to do the task, and feel guilty about not doing the task — they avoid it because the task triggers negative emotions (boredom, anxiety, frustration, overwhelm) and they prioritise short-term mood repair over long-term goal completion. This distinction matters because the solutions are different: laziness requires motivation, but procrastination requires emotional management strategies.",
  },
  {
    question: 'Does the "just 5 minutes" rule actually work, or will I just stop after 5 minutes?',
    answer:
      'Research on task initiation consistently shows that starting is the hardest part. Once you begin, the emotional barrier that was preventing action typically dissolves within a few minutes. This is because the negative emotions you were experiencing (dread, overwhelm, anxiety) were about the imagined version of the task, not the actual task. The actual experience of doing the work is rarely as bad as the anticipated experience. Studies show that the majority of people who commit to "just 5 minutes" continue working well beyond the 5-minute mark. And even if you do stop at 5 minutes, you have made progress — which reduces the emotional barrier for the next attempt. The rule works because it lowers the activation threshold to almost nothing.',
  },
  {
    question: 'What if I procrastinate on everything, not just one type of task?',
    answer:
      'If you procrastinate across all task types, the underlying issue is likely to be one of two things: either you are experiencing chronic stress, burnout, or low mood (which depletes the emotional regulation resources needed to overcome procrastination), or you have not yet built the foundational habits that make task initiation automatic (as covered in Sections 1 and 2 of this module). For chronic procrastination, addressing the root cause — stress, sleep quality, mental health — is more effective than adding more productivity techniques on top of an exhausted foundation. If that is not the issue, start with the "eat the frog" method for your single most important task each day, and build from there.',
  },
  {
    question: 'How do I stop procrastinating on quoting and invoicing specifically?',
    answer:
      'Quoting and invoicing are the two most commonly procrastinated admin tasks for tradespeople, and the cost is significant: delayed quotes lose jobs (the client goes elsewhere), and delayed invoices hurt cash flow. The most effective strategy is a combination of habit stacking and environment design. For quotes: "After I complete a site visit, I write the quote in the van before driving to the next job." The habit stack makes it automatic; doing it in the van while the details are fresh makes it easy. For invoicing: schedule a non-negotiable Friday afternoon block, make it attractive by pairing it with a podcast or favourite drink, and use templates to reduce the effort required. The key is removing the decision of "when" — the answer is always the same, so willpower is not required.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'According to research by Timothy Pychyl and Fuschia Sirois, procrastination is primarily:',
    options: [
      'A time management problem caused by poor scheduling',
      'A character flaw indicating laziness or lack of discipline',
      'An emotional regulation problem — avoiding tasks that trigger negative feelings',
      'A rational strategy for managing workload by deferring less important tasks',
    ],
    correctAnswer: 2,
    explanation:
      'Pychyl and Sirois have demonstrated through extensive research that procrastination is fundamentally about emotional regulation. We avoid tasks not because we lack time or skill, but because the task triggers negative emotions — anxiety, boredom, frustration, fear of failure, resentment — and we choose short-term mood repair (doing something pleasant) over long-term goal completion (doing the difficult task). This reframing is essential because it redirects the solution from "get a better planner" to "manage the emotional barriers."',
  },
  {
    id: 2,
    question: 'Which of the following is NOT a common procrastination trigger?',
    options: [
      'The task is boring or tedious',
      'The task is complex and the starting point is unclear',
      'The task is enjoyable and produces immediate visible results',
      'The task generates anxiety or fear of failure',
    ],
    correctAnswer: 2,
    explanation:
      'Enjoyable tasks with immediate visible results are the opposite of procrastination triggers — they are the tasks we gravitate towards to avoid the ones we are procrastinating on. The five common triggers are: the task is boring, the task is frustrating, the task is difficult or complex, the task is ambiguous (unclear starting point), and the task is personally meaningless or resented. All five share a common feature: they produce negative emotions that trigger avoidance behaviour.',
  },
  {
    id: 3,
    question: 'The "just 5 minutes" rule works because:',
    options: [
      'Five minutes is the scientifically proven minimum effective dose for any task',
      'Starting is the hardest part — once begun, the emotional barrier typically dissolves and most people continue well beyond 5 minutes',
      'It tricks the brain into thinking the task is complete after 5 minutes',
      'It creates a sense of urgency similar to a deadline',
    ],
    correctAnswer: 1,
    explanation:
      'The "just 5 minutes" rule exploits a fundamental insight about procrastination: the emotional barrier is highest before starting. The dread, overwhelm, and anxiety we feel are about the anticipated experience of the task, not the actual experience. Once you start, the reality is usually far less unpleasant than the imagination. The 5-minute commitment lowers the activation threshold to almost nothing — anyone can commit to 5 minutes — and research shows that the majority of people who start continue well past the initial commitment.',
  },
  {
    id: 4,
    question: 'Brian Tracy\'s "eat the frog" method recommends:',
    options: [
      'Completing the easiest task first to build momentum and confidence',
      'Delegating the worst task to someone else whenever possible',
      'Doing the hardest, most important, or most dreaded task first thing in the morning when willpower is highest',
      'Breaking every task into frog-sized pieces before starting',
    ],
    correctAnswer: 2,
    explanation:
      'Tracy\'s method is based on the principle that willpower is a depletable resource that is highest at the start of the day. The "frog" is your most important task — the one you are most likely to procrastinate on. By doing it first, you ensure it gets done when your mental resources are strongest. Everything else in the day feels easier by comparison. As Tracy writes: "If it is your job to eat a frog, it is best to do it first thing in the morning. And if it is your job to eat two frogs, it is best to eat the biggest one first."',
  },
  {
    id: 5,
    question:
      'Breaking large tasks into smaller components helps overcome procrastination because:',
    options: [
      'Smaller tasks are always easier and require no skill',
      'Large tasks trigger overwhelm and ambiguity — two of the strongest procrastination triggers — while smaller tasks have clear starting points and manageable scope',
      'It makes the total work take less time',
      'Employers require tasks to be broken down for health and safety compliance',
    ],
    correctAnswer: 1,
    explanation:
      '"Rewire the house" is an overwhelming instruction that triggers procrastination because the starting point is unclear and the scope feels enormous. "First fix the kitchen circuit" is specific, manageable, and has a clear starting point. The total work is identical, but the emotional experience is completely different. Breaking large tasks down removes the ambiguity trigger (you know exactly what to do first) and the overwhelm trigger (each component feels achievable). This is why project managers break projects into phases and sprints — it is not just good planning, it is good psychology.',
  },
  {
    id: 6,
    question: 'Administrative procrastination in construction typically results in:',
    options: [
      'Better quality paperwork because the tradesperson has more time to complete it',
      'No significant consequences — paperwork can always be done later',
      'End-of-quarter crises, cash flow problems from delayed invoicing, compliance risks from overdue certificates, and unnecessary stress',
      'Improved on-site productivity because more time is spent on technical work',
    ],
    correctAnswer: 2,
    explanation:
      'Administrative procrastination is one of the costliest forms for tradespeople. Delayed invoices directly hurt cash flow — if you complete a job on the 1st but do not invoice until the 28th, you have given the client a free month of credit. Overdue certificates risk compliance issues and undermine professional reputation. Deferred VAT returns, self-assessment submissions, and insurance renewals create end-of-quarter emergencies that could have been avoided with regular admin habits. The paradox is that the time "saved" by skipping admin is always repaid with interest — the last-minute rush takes longer, produces more errors, and generates far more stress.',
  },
  {
    id: 7,
    question: 'Accountability as a procrastination-beating strategy works because:',
    options: [
      'It creates fear of punishment, which overrides the desire to procrastinate',
      'It introduces social commitment — telling someone your intention creates external pressure to follow through and makes the cost of inaction visible',
      'It requires hiring a professional coach, which costs money and therefore creates financial motivation',
      'It only works for employed tradespeople, not self-employed ones',
    ],
    correctAnswer: 1,
    explanation:
      'Accountability works through social commitment. When you tell a colleague, partner, or friend that you will complete a specific task by a specific time, you create an external expectation. The social cost of breaking that commitment (embarrassment, loss of trust) provides additional motivation to follow through. This does not require a professional coach — simply telling your partner "I am going to finish those three invoices before dinner" creates enough accountability to overcome the procrastination barrier. For self-employed tradespeople who lack the natural accountability of an employer, finding an accountability partner or group can be transformative.',
  },
  {
    id: 8,
    question:
      'An electrician has been putting off a difficult phone call to a client about additional costs for 3 days. Using the "just 5 minutes" rule, the best approach would be:',
    options: [
      'Wait until the client calls them instead, avoiding the discomfort entirely',
      'Send an email instead of calling, because emails are less stressful',
      'Commit to picking up the phone and dialling the number — just start the call, and the dread will typically dissolve once the conversation begins',
      'Ask a colleague to make the call on their behalf',
    ],
    correctAnswer: 2,
    explanation:
      'The difficult client call is a classic procrastination scenario: the anticipated experience (conflict, awkwardness, rejection) is far worse than the actual experience (most clients are more reasonable than we imagine). The "just 5 minutes" rule applies directly: commit to making the call and speaking for 5 minutes. Once the conversation starts, the emotional barrier dissolves and you deal with the situation professionally. Every day you delay, the call gets harder (the client wonders why they have not heard from you), the problem potentially gets bigger, and the dread accumulates. Starting is the cure.',
  },
];

export default function TMOModule5Section3() {
  useSEO({
    title: 'Overcoming Procrastination | Time Management & Organisation Module 5.3',
    description:
      'Why we procrastinate, common triggers, the just-5-minutes rule, eating the frog, breaking large tasks down, and beating administrative procrastination.',
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
            <Hourglass className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overcoming Procrastination
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why we procrastinate, common triggers, the just-5-minutes rule, eating the frog,
            breaking tasks down, and tackling administrative procrastination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Procrastination</strong> is an emotional regulation problem, not laziness
                (Pychyl &amp; Sirois)
              </li>
              <li>
                <strong>5 triggers:</strong> boring, complex, ambiguous, resented, anxiety-inducing
              </li>
              <li>
                <strong>Just 5 minutes:</strong> Starting is the hardest part &mdash; commit to 5
                minutes
              </li>
              <li>
                <strong>Eat the frog:</strong> Do the hardest task first when willpower is highest
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cash flow:</strong> Procrastinated invoices mean delayed payments
              </li>
              <li>
                <strong>Compliance:</strong> Deferred certificates and paperwork create legal risk
              </li>
              <li>
                <strong>Reputation:</strong> Unreturned calls and delayed quotes lose clients
              </li>
              <li>
                <strong>Wellbeing:</strong> Avoidance creates guilt, stress, and a growing backlog
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why procrastination is an emotional regulation problem rather than a time management or character failing',
              'Identify the five common procrastination triggers and recognise which ones affect your own work',
              'Apply the "just 5 minutes" rule to overcome task-initiation barriers',
              'Use the "eat the frog" method to tackle high-priority tasks when willpower is strongest',
              'Break large, overwhelming tasks into manageable components with clear starting points',
              'Recognise and address administrative procrastination before it creates compliance and cash flow crises',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why We Procrastinate */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why We Procrastinate &mdash; It Is Not What You Think
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The popular narrative about procrastination is that it is caused by laziness, poor
                discipline, or bad time management. The research tells a completely different story.
                <strong> Timothy Pychyl</strong>, a professor at Carleton University and one of the
                world&rsquo;s leading procrastination researchers, and{' '}
                <strong>Fuschia Sirois</strong>, a professor at Durham University, have demonstrated
                through decades of work that procrastination is fundamentally a problem of{' '}
                <strong>emotional regulation</strong>, not time management.
              </p>

              <p>
                When we procrastinate, we are not choosing to do nothing. We are choosing to do
                something else &mdash; something that provides immediate emotional relief from the
                negative feelings associated with the task we are avoiding. The task might make us
                feel bored (writing up certificates), anxious (calling a difficult client),
                frustrated (wrestling with a complex fault), overwhelmed (tackling a full rewire
                quote), or resentful (doing paperwork we feel should not be our responsibility). In
                each case, the brain seeks short-term mood repair: we open Instagram, make a cup of
                tea, reorganise something that does not need reorganising, or start an easier and
                more pleasant task instead.
              </p>

              <p>
                This matters because the solution to procrastination is not &ldquo;try harder&rdquo;
                or &ldquo;be more disciplined.&rdquo; Those approaches treat it as a character flaw,
                which it is not. The solution is to address the emotional barrier directly: make the
                task less emotionally aversive (break it down, pair it with something pleasant),
                lower the activation threshold (the &ldquo;just 5 minutes&rdquo; rule), tackle it
                when emotional resources are strongest (eat the frog in the morning), or create
                external accountability (tell someone you will do it by a specific time). These
                strategies work because they target the actual cause &mdash; emotional avoidance
                &mdash; rather than the symptom.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Procrastination Equation
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Procrastination is not a time management problem. It is an emotion
                    management problem. We give in to feel good now at the cost of feeling worse
                    later.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Timothy Pychyl, <em>Solving the Procrastination Puzzle</em> (2013)
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> Stop asking &ldquo;Why can I not manage my
                  time?&rdquo; and start asking &ldquo;What emotion is this task triggering that
                  makes me want to avoid it?&rdquo; Once you identify the emotion, you can address
                  it directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Common Triggers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Five Procrastination Triggers
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Research has identified five primary triggers that make a task likely to be
                procrastinated. The more triggers a single task activates, the more likely it is to
                be avoided. Understanding which triggers affect you personally is the first step
                towards neutralising them. Most tradespeople find that two or three triggers
                dominate their procrastination patterns, and once identified, they can be addressed
                systematically rather than fought with willpower alone.
              </p>

              <p>
                <strong>Boring tasks</strong> lack intrinsic interest or stimulation. Writing up
                certificates, updating spreadsheets, filing receipts &mdash; these tasks offer no
                intellectual challenge and no sense of achievement. The brain craves novelty and
                stimulation, and boring tasks provide neither. <strong>Complex tasks</strong> feel
                overwhelming because the path from start to finish is unclear. Quoting a large
                commercial job, planning a rewire route, or diagnosing an intermittent fault can
                trigger procrastination not because they are hard, but because the starting point is
                ambiguous. <strong>Ambiguous tasks</strong> &mdash; those where the first step is
                unclear &mdash; are closely related. &ldquo;Sort out the paperwork&rdquo; is
                ambiguous; &ldquo;File the three certificates from this week&rdquo; is specific.
              </p>

              <p>
                <strong>Resented tasks</strong> are those you feel you should not have to do. Many
                tradespeople resent administrative work: &ldquo;I trained as an electrician, not a
                secretary.&rdquo; This resentment creates an emotional barrier that makes the task
                feel worse than it actually is. Finally, <strong>anxiety-inducing tasks</strong>
                &mdash; those that carry a risk of failure, conflict, or judgement &mdash; trigger
                avoidance because doing nothing feels safer than doing something that might go
                wrong. Calling a client about additional costs, chasing an overdue payment, or
                submitting work for inspection can all trigger this response.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The 5 Triggers Applied to Electrical Work
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Boring:</strong> Writing up EICRs, filing receipts, updating the
                      accounts spreadsheet, labelling photos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Complex:</strong> Quoting a full rewire, diagnosing an intermittent
                      RCD trip, planning a complicated containment route
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Ambiguous:</strong> &ldquo;Sort out the paperwork,&rdquo; &ldquo;get
                      the accounts in order,&rdquo; &ldquo;tidy up the van&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Resented:</strong> Admin, tax returns, compliance paperwork, health
                      and safety documentation that feels bureaucratic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Anxiety-inducing:</strong> Calling clients about cost overruns,
                      chasing unpaid invoices, submitting work for third-party inspection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Just 5 Minutes Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The &ldquo;Just 5 Minutes&rdquo; Rule &mdash; Starting Is the Hardest Part
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most effective technique for overcoming procrastination is also the
                simplest: <strong>commit to working on the task for just 5 minutes.</strong> Not
                finishing it. Not even making significant progress. Just 5 minutes. If after 5
                minutes you genuinely want to stop, you stop. No guilt, no self-criticism. But here
                is what the research consistently shows: the vast majority of people who start
                continue well beyond 5 minutes. Starting is the barrier. Once you are in motion, the
                emotional resistance dissolves.
              </p>

              <p>
                This technique works because of a fundamental asymmetry in how we experience tasks.
                Before starting, the task exists in our imagination &mdash; and our imagination
                amplifies the negative emotions. The EICR report feels like a mountain of tedious
                work. The difficult phone call feels like a guaranteed conflict. The rewire quote
                feels impossibly complex. But once you start &mdash; once you type the first line of
                the report, dial the first digit of the phone number, open the floor plan for the
                quote &mdash; the imagined version is replaced by the actual version, which is
                almost always less unpleasant than the imagination predicted.
              </p>

              <p>
                For tradespeople, the &ldquo;just 5 minutes&rdquo; rule has immediate practical
                applications. Dreading the EICR write-up? Open the form and fill in the address
                details &mdash; just 5 minutes. Putting off the difficult client call? Pick up the
                phone and dial &mdash; just start talking. Avoiding the quote for a complex job?
                Open a blank document and list the rooms &mdash; just 5 minutes. In each case, the
                5-minute commitment transforms the task from an abstract source of dread into a
                concrete activity that is already underway. And once it is underway, momentum takes
                over.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Dreaded EICR Report
                </p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician has been putting off writing an EICR report for 4 days. The
                  anticipated experience: 2 hours of tedious form-filling with no reward. Using the
                  &ldquo;just 5 minutes&rdquo; rule, they open the report template at 7pm and commit
                  to filling in the property details and supply characteristics &mdash; nothing
                  more. Five minutes in, they have momentum. They continue to the circuit schedule.
                  Then the observations. Forty-five minutes later, the report is complete. The
                  actual experience was far less painful than 4 days of dread. The report took 45
                  minutes; the procrastination cost 4 days of background anxiety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Eat the Frog */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Eat the Frog &mdash; Do the Worst Thing First
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Brian Tracy</strong>, in his 2001 book <em>Eat That Frog!</em>, popularised
                a principle that has become one of the most widely used productivity strategies in
                the world. The principle is based on a quote often attributed to Mark Twain:{' '}
                <strong>
                  &ldquo;If the first thing you do each morning is eat a live frog, you can go
                  through the rest of the day with the satisfaction of knowing that is probably the
                  worst thing that is going to happen to you all day long.&rdquo;
                </strong>{' '}
                The &ldquo;frog&rdquo; is your most important task &mdash; the one you are most
                likely to procrastinate on and the one that will have the greatest positive impact
                when completed.
              </p>

              <p>
                The neurological basis for eating the frog is well-established. Willpower, as
                demonstrated by Roy Baumeister&rsquo;s ego depletion research, is a finite resource
                that is highest at the start of the day and declines with use. Every decision you
                make, every temptation you resist, every difficult interaction you navigate depletes
                the pool. By the afternoon, your willpower reserves are significantly reduced. If
                you have left your hardest task until the afternoon, you face it at your weakest
                point &mdash; which is precisely why it gets deferred to tomorrow, and the cycle
                repeats.
              </p>

              <p>
                By contrast, tackling the frog first thing in the morning leverages your peak
                willpower. The task gets done when you are strongest, and everything else in the day
                feels easier by comparison. There is also a powerful psychological reward: the sense
                of accomplishment from completing your hardest task before 10am creates momentum and
                confidence that carries through the rest of the day. You have already won the most
                important battle; everything else is a bonus.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Eat the Frog Framework</p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <p>
                    <strong>Each evening, identify tomorrow&rsquo;s frog:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>1. What is the most important task I need to complete tomorrow?</li>
                    <li>2. What am I most likely to procrastinate on?</li>
                    <li>3. What will have the biggest positive impact when done?</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Each morning, eat the frog first:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>&bull; Do not check email, social media, or WhatsApp first</li>
                    <li>&bull; Do not start with easy, pleasant tasks to &ldquo;warm up&rdquo;</li>
                    <li>&bull; Go directly to the frog and complete it before anything else</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Frog That Would Not Go Away
                </p>
                <p className="text-sm text-white leading-relaxed">
                  A self-employed electrician has been avoiding a phone call to a client about
                  unexpected additional costs on a rewire. Each morning, they start with easier
                  tasks &mdash; checking emails, driving to a small job, organising the van. By
                  afternoon, they are tired, the call feels even more daunting, and they defer it
                  again. After 3 days, they try eating the frog: at 8:30am, before anything else,
                  they make the call. The conversation takes 8 minutes. The client is understanding
                  and agrees to the additional cost. Three days of dread resolved in 8 minutes
                  &mdash; because the actual experience was nothing like the imagined one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Breaking Tasks Down */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Breaking Large Tasks Down &mdash; From Overwhelm to Action
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common procrastination triggers is overwhelm &mdash; the feeling
                that a task is so large, so complex, or so ambiguous that you do not know where to
                start. The solution is to break the task into smaller, specific, actionable
                components until each component has a clear first step and a manageable scope. This
                is not a new idea &mdash; project managers have used work breakdown structures for
                decades &mdash; but applying it to personal productivity and procrastination is
                remarkably effective.
              </p>

              <p>
                Consider the difference between &ldquo;rewire the house&rdquo; and &ldquo;first fix
                the kitchen circuit.&rdquo; The first instruction triggers overwhelm: a full rewire
                involves dozens of tasks, multiple rooms, extensive planning, material ordering,
                coordination with other trades, and several days of work. Where do you even start?
                The second instruction is specific, manageable, and has a clear starting point: go
                to the kitchen, identify the existing circuit, plan the cable route, and begin the
                first fix. The total work is identical, but the emotional experience is completely
                different. One triggers procrastination; the other triggers action.
              </p>

              <p>
                The same principle applies to administrative tasks. &ldquo;Sort out the
                accounts&rdquo; is a procrastination magnet. But &ldquo;collect this week&rsquo;s
                receipts from the van&rdquo; is a 5-minute task with a clear outcome. &ldquo;File
                last week&rsquo;s certificates&rdquo; is another 5-minute task. &ldquo;Send 3
                outstanding invoices&rdquo; is another 15-minute task. The large, ambiguous,
                overwhelming &ldquo;sort out the accounts&rdquo; has been decomposed into three
                concrete actions, each with a clear starting point and an achievable scope. The
                total work is the same; the likelihood of actually doing it is dramatically higher.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Breaking Down a Rewire Quote</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Overwhelming version:</strong> &ldquo;Write the quote for the 3-bed
                      rewire&rdquo; (triggers procrastination)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> List the rooms and circuits needed (5 mins)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Calculate the cable and material quantities per room
                      (15 mins)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Price the materials using merchant accounts (10 mins)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Step 4:</strong> Estimate labour days based on past similar jobs (5
                      mins)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Step 5:</strong> Write up the quote and send to client (10 mins)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total: 45 minutes in 5 manageable steps.</strong> Each step has a clear
                  starting point and a defined output. The entire quote that felt overwhelming as a
                  single task becomes achievable as a sequence of small ones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Administrative Procrastination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Administrative Procrastination &mdash; The Tradesperson&rsquo;s Achilles Heel
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If there is one form of procrastination that affects tradespeople more than any
                other, it is <strong>administrative procrastination</strong> &mdash; the systematic
                avoidance of paperwork, invoicing, certificates, tax returns, and compliance
                documentation. The pattern is devastatingly common: on-site work gets done because
                it is tangible, varied, and socially reinforced (clients see the results, colleagues
                respect the skills). Administrative work gets deferred because it is boring,
                solitary, and invisible (no one applauds you for filing a receipt).
              </p>

              <p>
                The consequences of administrative procrastination are severe and cumulative.
                Delayed invoices directly damage cash flow &mdash; completing work on the 1st of the
                month but not invoicing until the 28th effectively gives the client a free month of
                credit. Deferred certificates create compliance risk and undermine professional
                reputation. Tax return procrastination creates end-of-January crises with penalties
                for late filing. Insurance renewal procrastination risks working without valid
                cover. Certification renewal procrastination risks working without valid
                registration. Each of these is a predictable, preventable crisis caused not by
                ignorance but by emotional avoidance.
              </p>

              <p>
                The solution is to apply the strategies from this section systematically to
                administrative tasks. Make admin <strong>obvious</strong> (schedule a non-negotiable
                weekly block). Make it <strong>attractive</strong> (pair it with a podcast, coffee,
                or favourite music). Make it <strong>easy</strong> (use templates, pre-filled forms,
                and digital tools that reduce friction). Make it <strong>satisfying</strong> (track
                your streak of on-time invoices; celebrate when the VAT return is submitted early).
                And use <strong>accountability</strong>: tell your partner that invoicing happens
                every Friday at 4pm, and let the social commitment do what willpower cannot.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Q1 Admin Crisis
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Every January, a self-employed electrician faces the same crisis: the
                  self-assessment tax return is due on the 31st, and they have not reconciled any
                  receipts, checked any bank statements, or organised any records since October.
                  They spend 3 evenings in a panic, a Saturday morning at the kitchen table
                  surrounded by shoeboxes of receipts, and eventually submit the return at 11pm on
                  the 30th, praying there are no errors. The same electrician, with a 20-minute
                  weekly bookkeeping habit (receipts photographed and filed, income logged, expenses
                  categorised), would complete the tax return in under an hour with no stress. The
                  weekly habit costs 20 minutes; the annual crisis costs 20 hours of panic.
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
                This section has reframed procrastination from a character flaw to a solvable
                emotional regulation problem, and provided practical strategies that can be applied
                immediately. The key points are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Procrastination is emotional regulation, not laziness.</strong> We avoid
                    tasks because of the negative feelings they trigger, not because we cannot
                    manage time (Pychyl &amp; Sirois).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Five triggers:</strong> boring, complex, ambiguous, resented, and
                    anxiety-inducing. Identify which triggers affect you most and address them
                    directly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The &ldquo;just 5 minutes&rdquo; rule</strong> exploits the fact that
                    starting is the hardest part. Once in motion, most people continue well past the
                    5-minute mark.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Eat the frog</strong> (Brian Tracy): do the hardest, most important task
                    first thing in the morning when willpower is at its peak.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Break large tasks down</strong> until each component has a clear
                    starting point and manageable scope. &ldquo;Rewire the house&rdquo; becomes
                    &ldquo;first fix the kitchen circuit.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Administrative procrastination</strong> is the tradesperson&rsquo;s
                    Achilles heel. Scheduled weekly admin habits prevent the end-of-quarter crises
                    that cost hours of panic and risk compliance failures.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">References:</strong> Timothy Pychyl,{' '}
                  <em>Solving the Procrastination Puzzle</em> (2013); Fuschia Sirois, Durham
                  University procrastination research; Brian Tracy, <em>Eat That Frog!</em> (2001);
                  Roy Baumeister, ego depletion and willpower research.
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
            <Link to="../tmo-module-5-section-4">
              Next: Your Personal Productivity Action Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
