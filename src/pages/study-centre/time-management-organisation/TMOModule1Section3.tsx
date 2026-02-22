import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
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
    id: 'tmo-1-3-check1',
    question:
      "Professor Gloria Mark's research at UC Irvine found that after an interruption, it takes an average of how long to fully refocus on the original task?",
    options: [
      'About 2 minutes — the brain recovers quickly',
      'About 8 minutes — roughly the length of a tea break',
      'About 23 minutes — far longer than most people realise',
      'About 45 minutes — almost an hour of lost productivity',
    ],
    correctIndex: 2,
    explanation:
      'Gloria Mark\'s research at the University of California, Irvine, found that it takes an average of 23 minutes and 15 seconds to fully refocus after an interruption. This means every phone notification, WhatsApp message, or colleague interruption does not just cost you the 30 seconds of distraction — it costs you 23 minutes of reduced cognitive performance as your brain works to re-engage with the original task. This phenomenon is related to what Sophie Leroy (2009) called "attention residue" — part of your mind stays attached to the interrupting task even after you return to the original one.',
  },
  {
    id: 'tmo-1-3-check2',
    question:
      'An electrician says yes to every small job that comes in, even when their schedule is already full. What is the most likely long-term consequence?',
    options: [
      'They will earn more money because they never turn down work',
      'They will build a reputation for reliability because they always say yes',
      'They will become overcommitted, deliver lower quality, miss deadlines, and eventually burn out',
      'They will naturally become more efficient because of the pressure',
    ],
    correctIndex: 2,
    explanation:
      'Saying yes to everything is one of the most common time traps in construction. In the short term, it feels productive and client-friendly. In the long term, it leads to overcommitment: jobs get rushed, quality drops, deadlines are missed, stress increases, and the electrician\'s reputation suffers — the exact opposite of the intended effect. The ability to say no (or "not right now") is a critical time management skill. It protects the quality of your existing commitments and preserves your capacity for the work that matters most.',
  },
  {
    id: 'tmo-1-3-check3',
    question: 'Sophie Leroy\'s concept of "attention residue" describes:',
    options: [
      'The physical fatigue that accumulates after a long day of focused work',
      "The tendency to forget details from the previous day's work",
      'The cognitive carry-over where part of your attention remains on a previous task even after you switch to a new one',
      'The improvement in attention that comes from taking regular breaks',
    ],
    correctIndex: 2,
    explanation:
      'Sophie Leroy, in her 2009 research paper "Why is it so hard to do my work?", coined the term "attention residue" to describe the phenomenon where part of your cognitive attention remains stuck on a previous task when you switch to a new one. If you were working on a first fix, get interrupted by a phone call about a quote, and then return to the first fix, part of your mind is still processing the quote conversation. This residue reduces your performance on the task you are supposed to be doing. The effect is cumulative: the more you switch, the more residue builds up, and the worse your performance becomes on each task.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I say no to clients without losing business?',
    answer:
      'The key is to say "not right now" rather than a flat "no." When a client requests work that does not fit your current schedule, offer an alternative: "I cannot fit that in this week, but I have availability on Thursday next week — shall I book you in?" This protects your existing commitments while keeping the client. Most clients respect honest scheduling far more than vague promises of "I will try to squeeze it in." If a client insists on immediate service and you genuinely cannot provide it, it is better to recommend a trusted colleague than to overcommit and deliver poor work. The client remembers the outcome, not the promise.',
  },
  {
    question: 'Is perfectionism always a bad thing for an electrician?',
    answer:
      'No — and this is an important distinction. Perfectionism on high-value, safety-critical work is not perfectionism: it is professionalism. You absolutely should take the time to ensure a consumer unit is correctly installed, circuits are properly tested, and documentation is accurate. The problem is perfectionism on low-value tasks — spending 20 minutes making cable clips perfectly aligned in a ceiling void that will be boarded over, or redoing a label three times when the first version was legible. The test is proportionality: is the additional time and effort proportionate to the value it adds? If the answer is no, you are in the perfectionism trap.',
  },
  {
    question:
      'I work on a busy commercial site where interruptions are constant. How do I protect my focus?',
    answer:
      'On a commercial site, you have less control over interruptions than on a domestic job. However, you can still apply strategies. First, batch your interruptible time: if colleagues or other trades need to coordinate with you, designate specific times (such as tea breaks or before/after lunch) for non-urgent discussions. Second, use physical signals: when you are doing focused work (especially testing or working on live equipment), make it visually clear that you should not be interrupted. Third, when interrupted, write down where you were in your current task before engaging with the interruption — this dramatically reduces the time needed to refocus when you return. Fourth, push back on non-urgent interruptions politely: "I am mid-test right now — can we discuss this at break?"',
  },
  {
    question: 'How much time does the average tradesperson lose to their phone each day?',
    answer:
      'Research varies, but studies consistently show that the average adult spends between 3 and 4 hours per day on their smartphone, with social media accounting for roughly 2 hours of that. For tradespeople during working hours, the figure is typically lower because of the physical nature of the work, but time audits suggest that 60 to 90 minutes per working day is common — split across WhatsApp, Instagram, Facebook, YouTube, and general browsing. This is particularly significant because the impact is not just the screen time itself: it is the attention residue and context-switching cost. A 2-minute Instagram check does not cost 2 minutes of productivity — it costs 2 minutes plus up to 23 minutes of reduced focus when you return to work.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Cal Newport\'s concept of "Deep Work" refers to:',
    options: [
      'Working overtime to complete tasks faster',
      'Professional activities performed in a state of distraction-free concentration that push your cognitive abilities to their limit',
      'Physical labour that requires significant muscular effort',
      'Working on multiple tasks simultaneously to maximise output',
    ],
    correctAnswer: 1,
    explanation:
      'In his 2016 book "Deep Work: Rules for Focused Success in a Distracted World," Cal Newport defines deep work as "professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit." This is the focused, uninterrupted work that produces the highest quality and value. For an electrician, deep work includes complex fault-finding, detailed testing, design calculations, and meticulous installation work — all of which require sustained concentration.',
  },
  {
    id: 2,
    question: 'The "yes to everything" trap is problematic because:',
    options: [
      'It means you never have to turn down a paying job',
      'It leads to overcommitment, reduced quality, missed deadlines, and eventual burnout',
      'It builds your reputation as the most reliable tradesperson in the area',
      'It ensures you always have a full pipeline of work',
    ],
    correctAnswer: 1,
    explanation:
      'Saying yes to everything creates a cycle of overcommitment. Your schedule becomes overpacked, forcing you to rush jobs, cut corners, or work excessive hours. Quality drops, deadlines slip, and stress increases. Clients start experiencing late arrivals, delayed completions, and lower-quality work — which damages the reputation you were trying to build by never saying no. The most respected tradespeople are those who deliver excellent work on time, which requires the discipline to manage capacity honestly.',
  },
  {
    id: 3,
    question:
      "According to Gloria Mark's research, how long does it take on average to fully refocus after an interruption?",
    options: ['About 5 minutes', 'About 10 minutes', 'About 23 minutes', 'About 45 minutes'],
    correctAnswer: 2,
    explanation:
      "Gloria Mark's research at the University of California, Irvine, found that it takes an average of 23 minutes and 15 seconds to return to the same level of focus after an interruption. This finding underscores why constant phone notifications, WhatsApp messages, and workplace interruptions are so damaging to productivity — each one imposes a cognitive tax far greater than the interruption itself.",
  },
  {
    id: 4,
    question: 'Sophie Leroy\'s "attention residue" means:',
    options: [
      'Your ability to pay attention decreases throughout the day',
      'Part of your cognitive attention stays on a previous task even after you switch to a new one',
      'You remember interrupted tasks better than completed ones',
      'Physical fatigue makes it harder to concentrate in the afternoon',
    ],
    correctAnswer: 1,
    explanation:
      'Attention residue (Leroy, 2009) is the phenomenon where part of your mental processing power remains attached to a previous task when you switch to a new one. If you are doing a first fix, check a WhatsApp message about a quote, and then return to the first fix, part of your brain is still processing the quote. This residue reduces performance on your current task. The effect is stronger when the previous task was unfinished or unresolved.',
  },
  {
    id: 5,
    question: 'Perfectionism becomes a time trap when:',
    options: [
      'You spend proportionate time ensuring safety-critical work is correct',
      'You invest extra time on high-value tasks that require precision',
      'You spend disproportionate time refining low-value tasks beyond the point of meaningful improvement',
      'You double-check test results before issuing a certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Perfectionism becomes a time trap when the additional time and effort invested is disproportionate to the value gained. Spending extra time to ensure a consumer unit is safely installed is not perfectionism — it is professional diligence. Spending 20 minutes making cable clips perfectly aligned in a ceiling void that will be covered by plasterboard is perfectionism — the additional effort adds no value because no one will ever see it. The test is always: does this additional effort add proportionate value?',
  },
  {
    id: 6,
    question: 'Context switching is particularly costly because:',
    options: [
      'It requires physically moving between different job sites',
      'Each switch incurs a cognitive penalty — you lose focus, accumulate attention residue, and take time to re-engage with the new task',
      'It means you can only work on one type of job per day',
      'It is only a problem for office workers, not tradespeople',
    ],
    correctAnswer: 1,
    explanation:
      'Context switching imposes a cognitive tax that goes far beyond the time of the switch itself. When you move from one task to another — especially if the tasks are different in nature (switching from installation work to answering a pricing query, for example) — your brain must disengage from one set of mental models and engage a new one. This takes time and energy, and it leaves attention residue. Research shows that people who frequently switch between tasks perform worse on all of them, not just the interrupted one.',
  },
  {
    id: 7,
    question:
      'Which of the following is the best strategy for managing WhatsApp messages during a working day?',
    options: [
      'Keep notifications on and respond to every message immediately',
      'Delete WhatsApp entirely to avoid all distractions',
      'Check and respond to messages in batched time slots (such as tea breaks and lunch) rather than responding to every notification as it arrives',
      'Set an auto-reply that you are unavailable until the end of the week',
    ],
    correctAnswer: 2,
    explanation:
      'Batching message responses is the most effective strategy because it balances responsiveness with focus. Checking messages at set times (break time, lunch, end of day) means you are still responsive — clients and colleagues will receive a reply within a few hours — but you are not constantly interrupted during productive work. This approach eliminates the attention residue and context-switching costs of responding to every notification in real time.',
  },
  {
    id: 8,
    question:
      'An electrician makes an unplanned trip to the merchant twice a week, averaging 45 minutes per trip. Over a 48-week working year, how many hours does this represent?',
    options: [
      'About 36 hours — almost a full working week',
      'About 72 hours — nearly 2 full working weeks',
      'About 96 hours — over 2 full working weeks',
      'About 24 hours — roughly 3 working days',
    ],
    correctAnswer: 1,
    explanation:
      'Two trips per week at 45 minutes each equals 90 minutes per week. Over 48 working weeks, that is 4,320 minutes, which equals 72 hours — nearly 2 full working weeks (assuming 40-hour weeks). This is time that generates zero revenue and could be largely eliminated through better planning: checking material requirements the evening before, keeping common fittings stocked in the van, and using online ordering with next-day delivery for non-urgent items.',
  },
];

export default function TMOModule1Section3() {
  useSEO({
    title: 'Common Time Traps in Construction | Time Management & Organisation Module 1.3',
    description:
      'The yes trap, perfectionism, context switching, attention residue, underquoting, the WhatsApp trap, and travel inefficiency in construction.',
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
            <AlertTriangle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Time Traps in Construction
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Saying yes to everything, perfectionism, context switching, underquoting, the WhatsApp
            trap, and travel inefficiency &mdash; the habits that silently steal hours from your
            week
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>The yes trap:</strong> Overcommitting destroys quality and reputation
              </li>
              <li>
                <strong>Context switching:</strong> Each interruption costs up to 23 minutes of
                focus
              </li>
              <li>
                <strong>Attention residue:</strong> Your brain stays on the previous task after
                switching
              </li>
              <li>
                <strong>Key insight:</strong> Most time traps are invisible until measured
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Revenue:</strong> Unplanned merchant trips alone can waste 72 hours per year
              </li>
              <li>
                <strong>Quality:</strong> Fragmented focus leads to mistakes and callbacks
              </li>
              <li>
                <strong>Stress:</strong> Overcommitment is a direct path to burnout
              </li>
              <li>
                <strong>Control:</strong> Identifying traps is the first step to avoiding them
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify the 7 most common time traps that affect construction workers',
              "Explain the cognitive cost of context switching using Gloria Mark's research",
              "Describe Sophie Leroy's concept of attention residue and its effect on work quality",
              'Distinguish between healthy professional standards and counterproductive perfectionism',
              'Develop practical strategies to manage phone and social media use during working hours',
              'Calculate the annual cost of common time traps such as unplanned merchant trips',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Yes Trap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The &ldquo;Yes to Everything&rdquo; Problem
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For most tradespeople, especially those who are self-employed or relatively new in
                business, saying yes to every enquiry feels like the right thing to do. Every job is
                income. Every client is a potential referral. Turning work away feels
                counterintuitive and financially risky. The fear is always the same: &ldquo;What if
                there is no work next month?&rdquo;
              </p>

              <p>
                The problem is that saying yes to everything eventually undermines the very thing
                you are trying to build. When your schedule is overpacked, jobs get rushed. When
                jobs are rushed, quality drops. When quality drops, clients notice &mdash; and they
                do not leave the glowing reviews or make the referrals that build a sustainable
                business. Instead, they quietly go elsewhere. Meanwhile, you are working longer
                hours, earning less per hour (because rushed work requires more snagging and
                callbacks), and heading towards burnout.
              </p>

              <p>
                The most successful tradespeople &mdash; the ones who are fully booked months in
                advance, who command premium rates, and who have waiting lists &mdash; are almost
                always the ones who learned to say no. They protect their capacity so that they can
                deliver excellent work on every job they accept. They turn down low-value jobs to
                preserve capacity for high-value ones. They recommend competitors for work they
                cannot fit in, building goodwill that comes back as referrals. Saying no is not a
                failure of ambition &mdash; it is a sign of strategic thinking.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Strategies for Saying No
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Offer an alternative date:</strong> &ldquo;I cannot fit that in this
                      week, but I have availability next Wednesday &mdash; shall I pencil you
                      in?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Refer a colleague:</strong> &ldquo;I am fully booked, but my mate Dave
                      does great work and might be available &mdash; would you like his
                      number?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Set a capacity rule:</strong> Never book more than 80% of your
                      available hours. The remaining 20% is buffer for overruns, emergencies, and
                      admin.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Perfectionism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Perfectionism on Low-Value Tasks
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is an important distinction between <strong>professional standards</strong>{' '}
                and <strong>perfectionism</strong>. Professional standards mean doing the job
                correctly, safely, and to a high quality. This is non-negotiable for an electrician:
                connections must be secure, circuits must be tested, documentation must be accurate,
                and safety must be maintained throughout. Taking the time to get these things right
                is not perfectionism &mdash; it is competence.
              </p>

              <p>
                Perfectionism, by contrast, is spending disproportionate time on tasks where the
                additional effort adds no meaningful value. It is the electrician who spends 15
                minutes aligning cable clips at perfectly equal intervals in a ceiling void that
                will be boarded over and never seen again. It is the tradesperson who re-writes a
                quote three times because the first version was &ldquo;not formatted nicely
                enough&rdquo; &mdash; when the client only cares about the price and scope. It is
                the apprentice who spends 30 minutes making their van label printer output perfectly
                aligned when the labels were already legible.
              </p>

              <p>
                Perfectionism is often driven by anxiety rather than quality standards. The
                perfectionist is not pursuing excellence &mdash; they are avoiding the discomfort of
                &ldquo;good enough.&rdquo; The antidote is to ask a simple question before investing
                extra time on any task:{' '}
                <strong>
                  &ldquo;Is this additional effort proportionate to the value it adds?&rdquo;
                </strong>{' '}
                If the answer is no, stop. Move on. Redirect that time towards something that
                matters.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Context Switching and Attention Residue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Context Switching &mdash; The Hidden Productivity Killer
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Cal Newport</strong>, in his 2016 book{' '}
                <em>Deep Work: Rules for Focused Success in a Distracted World</em>, argued that the
                ability to perform deep, focused work without distraction is becoming one of the
                most valuable skills in the modern economy &mdash; and also one of the rarest.
                Newport drew on decades of research showing that human beings are not designed for
                multitasking. When we switch between tasks, we do not seamlessly transfer our
                attention. Instead, we pay a <strong>switching cost</strong>: a period of reduced
                cognitive performance as the brain disengages from one task and engages with
                another.
              </p>

              <p>
                <strong>Sophie Leroy</strong>, in her influential 2009 paper &ldquo;Why is it so
                hard to do my work?&rdquo;, gave this phenomenon a name:{' '}
                <strong>attention residue</strong>. When you switch from Task A to Task B, part of
                your cognitive processing power remains &ldquo;stuck&rdquo; on Task A. You are
                physically working on Task B, but mentally, a portion of your brain is still
                processing Task A. This residue reduces your performance on Task B. The effect is
                stronger when Task A was unfinished or emotionally engaging (such as a stressful
                phone call from a client).
              </p>

              <p>
                <strong>Professor Gloria Mark</strong> at the University of California, Irvine,
                quantified this cost. Her research found that it takes an average of{' '}
                <strong>23 minutes and 15 seconds</strong> to fully return to a task after an
                interruption. This means that a 30-second phone notification does not cost you 30
                seconds &mdash; it costs you up to 23 minutes of degraded performance. If you are
                interrupted 10 times during a working day, the cumulative cost is staggering: nearly
                4 hours of reduced productivity from interruptions that individually seemed trivial.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Application</p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician is carrying out a complex consumer unit change. They are mid-way
                  through labelling circuits when their phone buzzes with a WhatsApp message from a
                  client asking for a quote. They pick up the phone, read the message, think about
                  the quote for a moment, type a brief reply, and put the phone down. Total
                  interruption time: 2 minutes. But now their mind is partly on the quote &mdash;
                  what price to charge, when they could fit it in, whether they have the materials.
                  They return to the labelling but make an error &mdash; they mislabel a circuit.
                  They catch it later during testing, but it costs an extra 15 minutes to trace and
                  correct. The 2-minute phone check has now cost 17 minutes plus reduced accuracy
                  for the next 20 minutes of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Underquoting Time */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Underquoting Time &mdash; The Self-Inflicted Time Trap
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Underquoting is closely related to the planning fallacy (covered in Section 1) but
                deserves its own focus because it creates a specific, recurring time trap for
                tradespeople. When you quote a job at fewer hours than it will actually take, you
                create a problem that ripples through your entire schedule. The job overruns,
                pushing the next job back. The next job starts late, which either means working late
                to catch up or rescheduling &mdash; which inconveniences the client and damages your
                reputation.
              </p>

              <p>
                The root cause is usually a combination of the planning fallacy (imagining the best-
                case scenario) and competitive pressure (fear that a realistic quote will lose the
                job). Many tradespeople unconsciously trim their estimates to make the quote more
                attractive, reasoning that they will &ldquo;find a way to make it work.&rdquo; The
                problem is that the laws of physics do not negotiate. A consumer unit change takes
                as long as it takes. A rewire requires the hours it requires. No amount of optimism
                in the quoting stage changes the reality of the work.
              </p>

              <p>
                The fix is to build accurate time data from historical records. Track how long each
                type of job actually takes &mdash; not how long you think it should take, but how
                long it does take. Use that data for future quotes. Add a contingency buffer of
                15&ndash;20% for the unexpected (old wiring, difficult access, client changes). It
                is better to finish early and impress the client with ahead-of-schedule delivery
                than to overrun and create a cascade of delays.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Cascade Effect</p>
                <p className="text-sm text-white leading-relaxed">
                  Monday: Quote says consumer unit change will take 4 hours. It takes 6 hours.
                  Tuesday morning job starts 2 hours behind schedule. Tuesday afternoon job is
                  rescheduled to Wednesday. Wednesday&rsquo;s existing job is pushed to Thursday. By
                  Friday, the entire week is disrupted, the electrician has worked 3 extra hours,
                  and two clients have had to be rescheduled &mdash; all because Monday&rsquo;s job
                  was underquoted by 2 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The WhatsApp and Social Media Trap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The WhatsApp &amp; Social Media Trap
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                WhatsApp has become the de facto communication tool for the UK construction
                industry. Clients message through it, colleagues coordinate on it, suppliers send
                quotes through it, and trade groups share information on it. The problem is not
                WhatsApp itself &mdash; it is a genuinely useful communication tool. The problem is
                that it creates a state of <strong>continuous partial attention</strong> throughout
                the working day.
              </p>

              <p>
                Every notification is a potential interruption. Every vibration or screen flash
                pulls a fragment of attention away from the task at hand. Even if you do not pick up
                the phone, the knowledge that a message is waiting creates a subtle cognitive load
                &mdash; part of your brain is wondering what the message says. Research by the
                University of Texas at Austin found that the mere <em>presence</em> of a smartphone
                on the desk reduced cognitive performance, even when the phone was face down and
                silent. The brain allocates resources to resisting the temptation to check it.
              </p>

              <p>
                Social media compounds the issue. Instagram, Facebook, TikTok, and YouTube are
                designed by teams of behavioural psychologists to be maximally engaging. They use
                variable reward schedules (the same mechanism that makes slot machines addictive) to
                keep you scrolling. A quick 30-second check easily becomes a 10-minute scroll, and
                the attention residue lingers for minutes after you put the phone down. Over a
                working day, these &ldquo;quick checks&rdquo; can consume 60 to 90 minutes of
                productive time.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Practical Phone Management Strategies
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Batch checking:</strong> Check messages at set times &mdash; morning
                      break, lunch, afternoon break, end of day. Respond in batches rather than
                      individually throughout the day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Silent mode during installation:</strong> Put your phone on silent
                      (not vibrate) during focused work. If you need to be reachable for
                      emergencies, set favourite contacts to bypass silent mode.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>App time limits:</strong> Use your phone&rsquo;s built-in screen time
                      controls to set daily limits on social media apps during working hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Phone in the van:</strong> During focused installation work, leave
                      your phone in the van. The physical distance removes the temptation entirely.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Travel Inefficiency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Travel Inefficiency &mdash; Poor Job Sequencing and Merchant Trips
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For domestic electricians, driving is often the second-largest time consumer after
                hands-on work. The difference between efficient and inefficient routing can be
                dramatic. An electrician with three domestic jobs might complete them in 8 hours
                with good routing or 10.5 hours with poor routing &mdash; the same work, but 2.5
                hours difference in total time, entirely driven by the order of jobs and the routes
                between them.
              </p>

              <p>
                The most common travel inefficiency is <strong>random scheduling</strong> &mdash;
                booking jobs in the order they come in rather than grouping them by geographical
                area. Monday might have a job in the north, then the south, then the east. Grouping
                all northern jobs on Monday and all southern jobs on Tuesday would save significant
                driving time. This requires slightly more planning effort (a Q2 investment) but the
                return is substantial.
              </p>

              <p>
                <strong>Unnecessary merchant trips</strong> are the other major travel drain. Each
                unplanned visit to the merchant costs 30 to 60 minutes including driving, parking,
                queuing, and finding the part. Two unplanned trips per week, at 45 minutes each,
                totals 72 hours over a 48-week working year &mdash; nearly 2 full working weeks
                spent in merchant car parks. The fix is a combination of better pre-job preparation
                (checking the scope and ordering materials the day before), keeping common fittings
                stocked in the van, and using online ordering with next-day delivery for non-urgent
                items.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Example</p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician has two domestic jobs: one in the north of the city (postcode area
                  1) and one in the south (postcode area 2). The jobs are booked north in the
                  morning, south in the afternoon. Driving between them takes 45 minutes each way.
                  If the electrician had a third job in the north scheduled for the following day,
                  swapping the sequence &mdash; both northern jobs on one day, the southern job on
                  another &mdash; would save 40 minutes of driving. Over a month of similar
                  optimisations, the electrician recovers an entire working day. That is a day that
                  can be used for an additional job, admin, CPD, or simply finishing earlier.
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
                This section has identified the most common time traps that affect construction
                workers and tradespeople. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The yes trap</strong> leads to overcommitment, reduced quality, missed
                    deadlines, and burnout. Learning to say &ldquo;not right now&rdquo; protects
                    your capacity and reputation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Perfectionism on low-value tasks</strong> wastes time without adding
                    proportionate value. Apply the test: is this additional effort proportionate to
                    the value it adds?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Context switching</strong> costs far more than the interruption itself.
                    Gloria Mark&rsquo;s research shows 23 minutes to refocus; Sophie Leroy&rsquo;s
                    attention residue explains why performance drops after every switch.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Underquoting time</strong> creates cascade effects that disrupt the
                    entire week. Use historical data, not optimism, for time estimates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The WhatsApp and social media trap</strong> fragments focus throughout
                    the day. Batch checking at set times eliminates the attention residue cost.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Travel inefficiency</strong> &mdash; poor job sequencing and unplanned
                    merchant trips &mdash; can waste nearly 2 full working weeks per year.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will move from
                  identifying problems to building solutions. You will learn Covey&rsquo;s Big Rocks
                  method, the 80/20 Rule, Most Important Tasks (MITs), and how to build a weekly
                  priority system that sticks.
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
            <Link to="../tmo-module-1-section-4">
              Next: Setting Priorities That Stick
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
