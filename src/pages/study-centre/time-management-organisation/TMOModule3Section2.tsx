import { ArrowLeft, Timer, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'Who developed the Pomodoro Technique and when was it first published?',
    options: [
      'Cal Newport in 2016',
      'Francesco Cirillo, developed in the 1980s and published in 2006',
      'David Allen in 2001',
      'Peter Drucker in 1954',
    ],
    correctAnswer: 1,
    explanation:
      'Francesco Cirillo developed the Pomodoro Technique as a university student in the late 1980s, using a tomato-shaped kitchen timer. He formally published the method in 2006.',
  },
  {
    id: 2,
    question: 'What is the standard length of a single Pomodoro sprint?',
    options: [
      '15 minutes of work, 3 minutes rest',
      '25 minutes of work, 5 minutes rest',
      '45 minutes of work, 15 minutes rest',
      '60 minutes of work, 10 minutes rest',
    ],
    correctAnswer: 1,
    explanation:
      'A standard Pomodoro is 25 minutes of focused work followed by a 5-minute break. After four Pomodoros (approximately 2 hours), a longer break of 15-30 minutes is recommended.',
  },
  {
    id: 3,
    question: "What is Parkinson's Law?",
    options: [
      'Every task has an optimal time of day for completion',
      'Work expands to fill the time available for its completion',
      'Productivity decreases by 50% after lunch',
      'The more people involved in a task, the longer it takes',
    ],
    correctAnswer: 1,
    explanation:
      "Parkinson's Law, articulated by Cyril Northcote Parkinson in 1955, states that work expands to fill the time available for its completion. If you give yourself all day to write a quote, it will take all day. If you give yourself 20 minutes, you will often complete it in 20 minutes.",
  },
  {
    id: 4,
    question: 'How should the Pomodoro Technique be adapted for physical trade work?',
    options: [
      'It should not be used for physical work at all',
      'The 25-minute sprint works perfectly for all physical tasks without modification',
      'The break principle applies to physical work, but sprint lengths should match the natural rhythm of the task',
      'Physical work should use 60-minute sprints with no breaks',
    ],
    correctAnswer: 2,
    explanation:
      'While you cannot always stop wiring mid-circuit after exactly 25 minutes, the underlying principle of scheduled breaks applies strongly to physical work. Adapt sprint lengths to match natural task breakpoints, and use breaks to prevent fatigue-related errors.',
  },
  {
    id: 5,
    question: 'What is time-boxing?',
    options: [
      'Working overtime to complete a task regardless of how long it takes',
      'Allocating a fixed amount of time to a task and stopping when the time expires',
      'Boxing up completed tasks for storage',
      'Scheduling tasks into specific calendar slots without time limits',
    ],
    correctAnswer: 1,
    explanation:
      'Time-boxing means allocating a predetermined, fixed amount of time to a task and stopping when that time expires, regardless of whether the task is fully complete. This prevents perfectionism, creates urgency, and ensures no single task consumes disproportionate time.',
  },
  {
    id: 6,
    question: 'Why does the Pomodoro Technique work psychologically?',
    options: [
      'Because 25 minutes is the exact length of human attention span',
      'Because it creates artificial urgency, provides recovery periods, and makes large tasks feel manageable by breaking them into small commitments',
      'Because it tricks the brain into thinking work is play',
      'Because the tomato shape of the timer releases calming hormones',
    ],
    correctAnswer: 1,
    explanation:
      'The Pomodoro Technique works because it creates urgency through a countdown (leveraging Parkinson\'s Law), provides scheduled recovery to prevent fatigue, and breaks overwhelming tasks into small 25-minute commitments that feel achievable. The psychology of "just 25 minutes" makes starting much easier.',
  },
  {
    id: 7,
    question:
      'An electrician has 6 quotes to prepare. Using time-boxing, what is the best approach?',
    options: [
      'Spend as long as needed on each quote until it is perfect',
      'Allocate 20 minutes per quote with a timer, completing all 6 in a 2-hour batch',
      'Work on all 6 simultaneously, switching between them as ideas come',
      'Delegate all quoting to an admin assistant',
    ],
    correctAnswer: 1,
    explanation:
      'Time-boxing each quote to 20 minutes creates urgency, prevents overthinking, and ensures all 6 are completed in a predictable 2-hour window. Without time-boxing, many tradespeople spend 45-60 minutes per quote, turning a 2-hour task into a 5-hour one with diminishing returns on quality.',
  },
  {
    id: 8,
    question: 'After completing 4 Pomodoro sprints (approximately 2 hours), what should you do?',
    options: [
      'Continue immediately with the next sprint to maintain momentum',
      'Take a longer break of 15-30 minutes before starting another cycle',
      'Stop working for the rest of the day',
      'Switch to a completely different type of work permanently',
    ],
    correctAnswer: 1,
    explanation:
      'After 4 Pomodoros (about 2 hours), Cirillo recommends a longer break of 15-30 minutes. This extended recovery prevents cumulative fatigue, allows your brain to consolidate what you have learned or accomplished, and resets your capacity for the next cycle of focused work.',
  },
];

export default function TMOModule3Section2() {
  useSEO({
    title:
      'The Pomodoro Technique & Time-Boxing | Module 3 Section 2 | Time Management & Organisation',
    description:
      "Francesco Cirillo's Pomodoro Technique, time-boxing for admin tasks, Parkinson's Law, and creating artificial deadlines for tradespeople.",
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
                <Timer className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 2</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The Pomodoro Technique &amp; Time-Boxing
            </h1>
            <p className="text-white text-sm sm:text-base">
              Using structured sprints and artificial deadlines to dramatically increase focus and
              output
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                The Pomodoro Technique uses 25-minute focused sprints separated by 5-minute breaks
                to maintain high concentration. Time-boxing extends this principle by allocating
                fixed time to any task and stopping when time expires. Both techniques combat
                procrastination, prevent perfectionism, and make large tasks feel manageable.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                Most tradespeople struggle with admin tasks &mdash; quotes, invoices, and paperwork
                &mdash; not because the tasks are difficult, but because they expand to fill
                whatever time is available. Parkinson&rsquo;s Law means a 20-minute quote can easily
                take 90 minutes without structure. The Pomodoro Technique and time-boxing provide
                that structure.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Explain the Pomodoro Technique and its origins with Francesco Cirillo',
                'Apply the 25/5 sprint-and-break cycle to administrative and paperwork tasks',
                "Understand Parkinson's Law and how artificial deadlines improve productivity",
                'Adapt the Pomodoro principle for physical construction work where rigid 25-minute intervals may not apply',
                'Use time-boxing to prevent perfectionism and ensure predictable task completion',
                'Design a Pomodoro-based schedule for common tradesperson admin tasks like quotes, invoices, and reports',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: The Pomodoro Technique */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                1. The Pomodoro Technique: Origins &amp; Method
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                In the late 1980s, Italian university student Francesco Cirillo was struggling to
                concentrate on his studies. Frustrated by his inability to focus, he challenged
                himself to commit to just 10 minutes of focused study using a tomato-shaped kitchen
                timer (&ldquo;pomodoro&rdquo; is Italian for tomato). That simple experiment evolved
                into one of the most widely adopted time management techniques in the world,
                formally published in 2006. The method works because it replaces vague intentions
                (&ldquo;I&rsquo;ll work on this for a while&rdquo;) with precise commitments
                (&ldquo;I will focus on this for exactly 25 minutes&rdquo;).
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The standard Pomodoro cycle is straightforward: work with complete focus for 25
                minutes, then take a 5-minute break. This constitutes one &ldquo;Pomodoro.&rdquo;
                After completing four Pomodoros (approximately 2 hours of focused work), take a
                longer break of 15&ndash;30 minutes. During the 25-minute sprint, the rules are
                absolute: no checking your phone, no responding to messages, no switching tasks. If
                an interruption occurs that you cannot ignore, you must abandon the Pomodoro and
                start a fresh one. This strict approach forces you to take interruption management
                seriously.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The genius of the technique lies in its psychological mechanisms. First, 25 minutes
                feels achievable &mdash; even for tasks you are dreading. The commitment is not
                &ldquo;write all your invoices&rdquo; but &ldquo;work on invoices for 25
                minutes.&rdquo; This dramatically lowers the barrier to starting, which is often the
                hardest part of any task. Second, the countdown creates urgency. Knowing that the
                timer is running makes you naturally more focused and efficient. Third, the
                scheduled break provides a reward and recovery period, preventing the fatigue that
                leads to procrastination.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">The Pomodoro Cycle</h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Step 1:</strong> Choose a single task to work on
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Step 2:</strong> Set a timer for 25 minutes
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Step 3:</strong> Work with complete focus until the
                timer rings &mdash; no exceptions
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Step 4:</strong> Take a 5-minute break (stand up,
                stretch, make a drink)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Step 5:</strong> Repeat. After 4 Pomodoros, take a
                15&ndash;30 minute break
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-3-2-pomodoro-rules"
            question="During a 25-minute Pomodoro sprint, your phone rings with a non-urgent call. According to the strict Pomodoro rules, what should you do?"
            options={[
              'Answer quickly and resume the sprint where you left off',
              'Let it ring and return the call during your next 5-minute break',
              'Abandon the current Pomodoro and start a fresh 25-minute sprint after the call',
              'Pause the timer, take the call, then resume the timer',
            ]}
            correctIndex={1}
            explanation="During a Pomodoro sprint, non-urgent interruptions should be deferred. Let the call go to voicemail and return it during your 5-minute break. If you must take the call, the strict rule says you should abandon the current Pomodoro and start fresh, which incentivises you to protect your focus time."
          />

          {/* Section 2: Parkinson's Law */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. Parkinson&rsquo;s Law &amp; the Power of Deadlines
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                In 1955, British naval historian Cyril Northcote Parkinson wrote a humorous essay
                for <em>The Economist</em> that contained a profound observation: &ldquo;Work
                expands so as to fill the time available for its completion.&rdquo; This became
                known as Parkinson&rsquo;s Law, and it explains why tasks that could take 20 minutes
                often take 2 hours when no deadline is imposed. Without a constraint, you naturally
                add complexity, second-guess yourself, take detours, and extend the task far beyond
                what is necessary.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Parkinson&rsquo;s Law is particularly relevant for tradespeople&rsquo;s
                administrative tasks. Writing a quote for a straightforward rewire might take
                15&ndash;20 minutes if you sit down with a timer and focus. But without that
                constraint, the same quote can consume an hour or more: you check material prices
                three times, rewrite the covering email twice, research the client&rsquo;s area on
                Google Maps, check your calendar in excessive detail, and generally find ways to
                expand a simple task. The quality difference between the 20-minute quote and the
                60-minute quote is usually negligible &mdash; but you have lost 40 minutes.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The Pomodoro Technique directly counteracts Parkinson&rsquo;s Law by imposing
                artificial deadlines. When you tell yourself &ldquo;I have 25 minutes to draft this
                quote,&rdquo; you naturally focus on what matters and skip unnecessary elaboration.
                The deadline creates a productive constraint that channels your effort efficiently.
                This is why students often produce their best work the night before a deadline
                &mdash; not because they work better under stress, but because the deadline
                eliminates the expansion that Parkinson described. The Pomodoro Technique gives you
                that deadline benefit without the stress of a genuine last-minute rush.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Parkinson&rsquo;s Law in Practice
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Consider two electricians preparing quotes. Electrician A sets a 20-minute time-box
              per quote and completes 6 quotes in 2 hours. Electrician B works without time
              constraints and spends the same 2 hours on just 2 quotes. The quality of the quotes is
              virtually identical, but Electrician A has freed up time for 4 additional quotes
              &mdash; or for other productive work. Over a month, this difference compounds
              dramatically.
            </p>
          </div>

          {/* Section 3: Adapting for Construction */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                3. Adapting the Pomodoro for Physical Trade Work
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A common criticism of the Pomodoro Technique is that rigid 25-minute intervals do
                not suit physical work. You cannot stop wiring a circuit halfway through just
                because a timer rings. This is a valid point, but it misses the underlying
                principle. The Pomodoro Technique is not about slavishly following a 25-minute rule
                &mdash; it is about structuring work into focused sprints with planned recovery. For
                trade work, the adaptation is straightforward: use the natural breakpoints of your
                tasks as sprint boundaries, and ensure you take genuine recovery breaks between
                them.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For example, if you are first-fixing a house, each room is a natural sprint.
                Complete the first bedroom, take a 5-minute break (drink water, stretch your back,
                check your phone briefly), then move to the second bedroom. This approach provides
                the same benefits as a strict Pomodoro: you get scheduled recovery, you create a
                sense of completion at each stage, and you maintain awareness of how your time is
                being spent. The key adaptation is replacing the rigid timer with task-based
                intervals while keeping the structured break principle.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Where the Pomodoro Technique works brilliantly for tradespeople without modification
                is in administrative work. Quotes, invoices, EICR report writing, certification
                paperwork, email responses, material ordering &mdash; all of these tasks are
                perfectly suited to 25-minute sprints. The technique is most powerful when applied
                to the tasks that tradespeople tend to procrastinate on most. Setting a timer and
                committing to &ldquo;just 25 minutes of paperwork&rdquo; is far more achievable than
                the vague intention of &ldquo;I need to do my admin tonight.&rdquo;
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-3-2-physical-adaptation"
            question="How should the Pomodoro Technique be adapted for a first-fix wiring task?"
            options={[
              'Stop wiring at exactly 25 minutes regardless of where you are in the circuit',
              'Do not use the Pomodoro Technique at all for physical work',
              'Use natural task breakpoints (e.g., completing each room) as sprint boundaries, keeping scheduled breaks between them',
              'Double the sprint length to 50 minutes for all physical tasks',
            ]}
            correctIndex={2}
            explanation="The Pomodoro principle of structured sprints with recovery breaks adapts well to physical work when you use natural task breakpoints (completing a room, finishing a circuit) instead of rigid 25-minute intervals. The core benefit of planned recovery between focused efforts still applies."
          />

          {/* Section 4: Time-Boxing */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Time-Boxing: Fixed Time, Not Fixed Scope
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Time-boxing is a broader technique than the Pomodoro that involves allocating a
                fixed, predetermined amount of time to a task and then{' '}
                <em>stopping when the time expires</em>, regardless of whether the task is fully
                complete. This represents a fundamental shift in thinking: instead of asking
                &ldquo;How long will this take?&rdquo; you ask &ldquo;How much time am I willing to
                invest in this?&rdquo; The distinction is critical because it puts you in control of
                your schedule rather than letting tasks dictate your time.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Time-boxing is particularly effective for tasks that tend to expand without clear
                boundaries. Quote preparation is a prime example. Many tradespeople agonise over
                quotes, refining pricing, rewriting descriptions, and second-guessing their rates. A
                time-boxed approach says: &ldquo;I will spend 20 minutes on this quote. At 20
                minutes, I send it.&rdquo; This eliminates perfectionism and forces you to focus on
                the essential elements. The quote that takes 20 minutes is almost always as
                effective as the one that takes 60 minutes &mdash; the additional 40 minutes
                typically produces diminishing returns.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Time-boxing also works well for research and decision-making. If you need to choose
                a supplier for a particular material, time-box the research to 15 minutes. This
                prevents the common trap of spending an hour comparing prices across six websites
                for a &pound;30 difference on a &pound;500 order &mdash; an hour of your time that
                could have been spent earning &pound;45. By constraining the time investment, you
                ensure that the effort remains proportionate to the potential benefit.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Pomodoro Admin Session for Electricians
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Pomodoro 1 (25 min):</strong> Write and send 2 quotes
                (time-boxed to 12 minutes each)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Break (5 min):</strong> Stand up, stretch, make a
                drink
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Pomodoro 2 (25 min):</strong> Complete EICR report
                write-up for today&rsquo;s inspection
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Break (5 min):</strong> Check and respond to messages
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Pomodoro 3 (25 min):</strong> Process 3 invoices and
                chase 1 overdue payment
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Break (5 min):</strong> Quick walk, fresh air
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Pomodoro 4 (25 min):</strong> Order materials for
                next week&rsquo;s jobs
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Long break (15&ndash;30 min):</strong> All admin
                complete in under 2.5 hours
              </p>
            </div>
          </div>

          {/* Section 5: Overcoming Procrastination */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                5. Overcoming Procrastination with the Pomodoro
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Procrastination is rarely about laziness. Research in behavioural psychology shows
                that procrastination is primarily an emotional regulation problem &mdash; people
                avoid tasks that trigger negative emotions such as boredom, anxiety, or frustration.
                For tradespeople, the tasks most commonly procrastinated on are administrative:
                writing quotes, completing certification paperwork, filing tax returns, chasing
                overdue invoices, and updating records. These tasks feel tedious and are easily
                deferred because the consequences of delay are not immediately visible.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The Pomodoro Technique is remarkably effective against procrastination because it
                reframes the commitment. Instead of &ldquo;I need to complete all my
                paperwork&rdquo; (overwhelming), the commitment becomes &ldquo;I will do 25 minutes
                of paperwork&rdquo; (achievable). This subtle reframing lowers the emotional barrier
                to starting. Once you start, momentum often carries you further than the initial 25
                minutes &mdash; but even if it does not, you have made progress. Four Pomodoro
                sessions of dreaded admin spread across a week is far more productive than one
                procrastinated marathon session at the end of the month.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The technique also provides a built-in reward mechanism. Completing each Pomodoro
                provides a small sense of accomplishment, and the 5-minute break serves as an
                immediate reward. This creates a positive feedback loop: work, reward, work, reward.
                Over time, the dreaded admin tasks become less aversive because they are associated
                with manageable chunks and regular breaks rather than endless, unstructured slogs.
                Many tradespeople who adopt this approach report that they actually look forward to
                their Pomodoro admin sessions because the structure makes the work feel controlled
                and finite.
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-3-2-time-boxing-quotes"
            question="An electrician normally spends 45-60 minutes per quote. They decide to time-box quotes to 20 minutes each. What is the most likely outcome?"
            options={[
              'The quotes will be significantly lower quality and lose jobs',
              'The quotes will be roughly the same quality, completed three times faster, with the extra time saved for other productive work',
              'The electrician will be unable to complete any quote in just 20 minutes',
              'Clients will notice the reduced effort and complain',
            ]}
            correctIndex={1}
            explanation="Research on Parkinson's Law consistently shows that time-boxed tasks are completed at roughly the same quality as unconstrained ones. The extra 25-40 minutes typically goes to unnecessary refinement, second-guessing, and distraction rather than genuinely improving the quote. Clients respond to price, scope, and professionalism — not the time spent drafting."
          />

          {/* Section 6: Common Mistakes */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. Common Mistakes &amp; How to Avoid Them
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The most common mistake when starting with the Pomodoro Technique is being too rigid
                about the 25-minute interval. If you are 2 minutes from finishing a task when the
                timer rings, it is counterproductive to stop and take a break just to restart for 2
                minutes. Use the timer as a guide, not a straitjacket. If you are close to
                completion, finish the task, then take a slightly longer break to compensate. The
                spirit of the technique &mdash; focused sprints with recovery &mdash; matters more
                than the exact timing.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Another common mistake is skipping the breaks. Many people feel guilty about
                stopping when they are &ldquo;on a roll,&rdquo; so they push through multiple
                sprints without rest. This initially feels productive but leads to declining
                performance over time. The breaks are not a luxury &mdash; they are a structural
                requirement. Your brain needs recovery to maintain the intensity of focus that makes
                Pomodoro sessions effective. Skipping breaks turns the technique into ordinary
                continuous work, losing the primary benefit.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A third mistake is using Pomodoro time for multitasking. The entire point is
                single-task focus. If you spend your 25 minutes alternating between writing a quote
                and checking your messages, you are not doing a Pomodoro &mdash; you are doing
                fragmented work with a timer running. Each sprint must be dedicated to one task or
                one closely related group of tasks. This single-task commitment is what generates
                the concentration benefits that make the technique valuable.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Tools for Pomodoro &amp; Time-Boxing
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You do not need special equipment. Your phone&rsquo;s built-in timer works perfectly.
              However, placing your phone face-down across the room with only the timer running (all
              notifications silenced) is more effective than keeping it in your hand. For those who
              prefer a physical timer, inexpensive kitchen timers or dedicated Pomodoro timers are
              available for under &pound;10. The physical act of twisting a timer dial can create a
              stronger psychological commitment than tapping a phone screen.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'The Pomodoro Technique uses 25-minute focused sprints with 5-minute breaks, developed by Francesco Cirillo in the 1980s',
                "Parkinson's Law (1955) states that work expands to fill the time available \u2014 artificial deadlines counteract this expansion",
                'For physical trade work, adapt sprint lengths to natural task breakpoints while keeping the structured break principle',
                'Time-boxing allocates fixed time to tasks and stops when time expires, preventing perfectionism and expansion',
                'The technique combats procrastination by reframing overwhelming tasks as manageable 25-minute commitments',
                'Common mistakes include being too rigid with timing, skipping breaks, and attempting to multitask within sprints',
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
                  Can I change the sprint length from 25 minutes?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. While Cirillo recommends 25 minutes as the default, many practitioners use
                  30, 45, or even 50-minute sprints. The key is choosing a duration long enough to
                  achieve meaningful focus but short enough to maintain intensity. Start with 25
                  minutes and experiment. For deep work tasks, longer sprints (45&ndash;50 minutes)
                  often work better.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What should I do during the 5-minute break?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Physically move: stand up, stretch, walk to the kitchen, get a drink of water.
                  Avoid screens during breaks if possible &mdash; scrolling social media is not
                  genuine recovery. For tradespeople, breaks are also a good time to check your
                  phone briefly, respond to urgent messages, and then put it back down before the
                  next sprint.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if a task takes less than one Pomodoro?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Group small tasks together into a single Pomodoro. For example, &ldquo;process 3
                  invoices, reply to 2 emails, and order cable&rdquo; might all fit within one
                  25-minute sprint. This is particularly effective for the small administrative
                  tasks that accumulate throughout a working week.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is time-boxing the same as the Pomodoro Technique?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  They are related but distinct. The Pomodoro Technique is a specific system with
                  fixed 25/5 intervals. Time-boxing is a broader principle of allocating any fixed
                  amount of time to any task. You might time-box a supplier phone call to 10
                  minutes, or time-box material research to 15 minutes. Both leverage
                  Parkinson&rsquo;s Law, but time-boxing is more flexible in its application.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Section 2 Quiz: The Pomodoro Technique & Time-Boxing"
          />

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
              <Link to="../tmo-module-3-section-3">
                Next: Batching &amp; the 80/20 Rule
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
