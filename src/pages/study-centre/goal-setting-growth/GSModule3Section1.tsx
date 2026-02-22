import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
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
    id: 'gs-3-1-check1',
    question:
      'An electrician wants to develop the habit of checking their test instruments at the start of every job. According to research by Phillippa Lally at University College London, how many days on average does it take for a new behaviour to become automatic?',
    options: ['21 days', '30 days', '66 days', '90 days'],
    correctIndex: 2,
    explanation:
      'Phillippa Lally&rsquo;s 2009 UCL study, published in the European Journal of Social Psychology, found that it takes an average of 66 days for a new behaviour to become automatic &mdash; not the widely cited but scientifically unsupported &ldquo;21 days&rdquo;. The study tracked 96 participants and found a range from 18 to 254 days depending on the complexity of the habit and the individual. For electricians building professional habits like daily tool checks or end-of-day admin, this means committing to consistency for at least two months before the behaviour feels effortless. Missing a single day had no significant impact on long-term habit formation, which is reassuring for tradespeople working unpredictable schedules.',
  },
  {
    id: 'gs-3-1-check2',
    question:
      'According to BJ Fogg&rsquo;s Behavior Model (B=MAP), three elements must converge at the same moment for a behaviour to occur. Which of the following is NOT one of these three elements?',
    options: [
      'Motivation &mdash; the desire to perform the behaviour',
      'Ability &mdash; the capacity to perform the behaviour',
      'Awareness &mdash; conscious attention to the behaviour',
      'Prompt &mdash; a cue that triggers the behaviour',
    ],
    correctIndex: 2,
    explanation:
      'BJ Fogg&rsquo;s Behavior Model states that Behavior = Motivation &times; Ability &times; Prompt. All three must be present simultaneously. Awareness is not part of the model &mdash; in fact, the goal of habit formation is to move behaviours from conscious awareness into automatic execution. For electricians, this explains why good intentions (&ldquo;I&rsquo;ll start filing my invoices properly&rdquo;) fail without a clear prompt (a calendar reminder) and sufficient ability (a simple system that takes less than five minutes). The model is particularly useful for identifying why professional habits fail: usually it&rsquo;s not a motivation problem, it&rsquo;s an ability problem (the task is too complex or time-consuming) or a prompt problem (there&rsquo;s no reliable cue).',
  },
  {
    id: 'gs-3-1-check3',
    question:
      'James Clear&rsquo;s book Atomic Habits describes the &ldquo;compound effect&rdquo; of small improvements. If you improve by just 1% every day for a year, by how much will you have improved by the end of the year?',
    options: [
      '3.65 times better (365%)',
      '37 times better (3,700%)',
      '100 times better (10,000%)',
      'There is no compounding effect &mdash; you improve by exactly 365%',
    ],
    correctIndex: 1,
    explanation:
      'The mathematics of compounding mean that 1.01^365 = 37.78. A 1% daily improvement compounds to make you 37 times better over a year, while a 1% daily decline (0.99^365) reduces you to nearly zero (0.03). This is not literal for most real-world skills, but the principle is powerful: small, consistent improvements in professional habits &mdash; spending an extra two minutes organising your van, adding one line to your job notes, reading one page of BS 7671 &mdash; accumulate into transformational results over months and years. For electricians, this reframes habit formation away from dramatic overnight changes towards sustainable micro-improvements in daily systems.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I&rsquo;ve tried to build good habits before and failed. Does that mean I lack willpower or discipline?',
    answer:
      'No. Modern habit science (particularly the work of Wendy Wood and Roy Baumeister) shows that willpower is a limited resource that depletes throughout the day &mdash; a phenomenon called ego depletion. Relying on willpower alone is a losing strategy. Successful habit formation is about designing systems that make the desired behaviour easier than the undesired behaviour, so you don&rsquo;t need willpower in the first place. For electricians, this might mean leaving your test instruments on the driver&rsquo;s seat of your van so you can&rsquo;t start the day without seeing them, or setting up automatic invoice reminders so you don&rsquo;t have to remember. If a habit has failed in the past, it&rsquo;s usually a system design problem, not a character flaw.',
  },
  {
    question: 'How do I stay consistent with a new habit when my work schedule is unpredictable?',
    answer:
      'The key is to anchor the habit to something that happens every day regardless of your schedule, rather than to a specific time. For example, &ldquo;after I park my van at the end of the day&rdquo; is a more reliable anchor than &ldquo;at 5pm&rdquo; because you always park your van, but you don&rsquo;t always finish at 5pm. BJ Fogg calls this &ldquo;anchoring&rdquo; and James Clear calls it &ldquo;habit stacking&rdquo;. The formula is: &ldquo;After [EXISTING HABIT], I will [NEW HABIT]&rdquo;. For electricians with variable schedules, existing anchors might include: after I start the van, after I park the van, after I eat lunch, after I lock the van at night, after I plug my phone in to charge. Build your professional habits around these consistent daily moments rather than fixed clock times.',
  },
  {
    question:
      'I missed three days of my new habit because of a big job. Have I broken the habit and do I need to start again from day one?',
    answer:
      'No. Phillippa Lally&rsquo;s research found that missing a single day had no detectable impact on long-term habit formation, and missing a few days is unlikely to derail the process as long as you resume the behaviour. The &ldquo;never miss twice&rdquo; rule from James Clear is helpful here: missing once is an accident, missing twice is the start of a new (bad) habit. If you miss your habit for unavoidable reasons (a three-day emergency callout, a family crisis), just pick it back up the next day without guilt or self-criticism. The goal is long-term consistency, not perfection. This is especially relevant for electricians whose work can involve intense periods followed by quieter periods &mdash; the habit must be resilient enough to survive disruption.',
  },
  {
    question:
      'Is it better to focus on building one habit at a time or can I work on several simultaneously?',
    answer:
      'The research and expert consensus strongly favour focusing on one habit at a time, particularly if you are new to deliberate habit formation. Charles Duhigg, BJ Fogg, and James Clear all recommend starting with one &ldquo;keystone habit&rdquo; that has a cascading positive effect on other areas of your life. For electricians, a morning routine (wake at the same time, review the day&rsquo;s jobs, check the weather, prepare your van) is often a powerful keystone habit because it sets the tone for the entire day and naturally leads to other good habits. Once the first habit is established (genuinely automatic, requiring no willpower), you can stack a second habit onto it. Trying to overhaul your entire life simultaneously usually results in early motivation followed by complete collapse within two weeks.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'According to Charles Duhigg&rsquo;s habit loop model, every habit consists of three components. Which of the following correctly describes these three components?',
    options: [
      'Intention &rarr; Action &rarr; Reflection',
      'Cue &rarr; Routine &rarr; Reward',
      'Motivation &rarr; Ability &rarr; Prompt',
      'Desire &rarr; Execution &rarr; Satisfaction',
    ],
    correctAnswer: 1,
    explanation:
      'Charles Duhigg&rsquo;s habit loop model, described in his book The Power of Habit, identifies three components: the Cue (the trigger that initiates the behaviour), the Routine (the behaviour itself), and the Reward (the benefit you gain from the behaviour). Understanding this loop is essential for both building new habits and breaking old ones. For electricians, a professional habit might look like: Cue (parking the van at the end of the day) &rarr; Routine (spending five minutes updating job notes and filing receipts) &rarr; Reward (the satisfaction of a tidy admin system and avoiding a weekend catch-up session). The reward reinforces the loop, making the behaviour more likely to repeat.',
  },
  {
    id: 2,
    question:
      'Wendy Wood&rsquo;s research suggests that approximately what percentage of our daily actions are habitual rather than consciously decided?',
    options: ['10%', '25%', '43%', '75%'],
    correctAnswer: 2,
    explanation:
      'Wendy Wood, a psychology professor at the University of Southern California and a leading researcher in habit formation, estimates that approximately 43% of what we do each day is habitual &mdash; performed automatically without conscious decision-making. This has profound implications for electricians: nearly half of your professional behaviour (how you organise your tools, how you approach a job, how you communicate with clients, how you handle paperwork) is driven by habit rather than intention. This means that improving your professional performance is less about &ldquo;trying harder&rdquo; and more about systematically replacing poor habits with effective ones. Once a good habit is established, it runs on autopilot, freeing up mental energy for complex problem-solving.',
  },
  {
    id: 3,
    question:
      'James Clear&rsquo;s &ldquo;Four Laws of Behavior Change&rdquo; provide a framework for building good habits. Which of the following is NOT one of the Four Laws?',
    options: ['Make it obvious', 'Make it attractive', 'Make it expensive', 'Make it easy'],
    correctAnswer: 2,
    explanation:
      'The Four Laws are: (1) Make it obvious, (2) Make it attractive, (3) Make it easy, and (4) Make it satisfying. &ldquo;Make it expensive&rdquo; is not part of the framework. Each law addresses a different stage of the habit loop. For electricians building a habit of daily tool calibration checks: (1) Make it obvious &mdash; leave your test instruments on the passenger seat overnight so you see them first thing; (2) Make it attractive &mdash; pair the check with your morning coffee; (3) Make it easy &mdash; create a one-page checklist rather than consulting the full manual; (4) Make it satisfying &mdash; tick off the check on a visible chart and feel the dopamine hit of progress. These laws are also inverted to break bad habits: make it invisible, unattractive, difficult, and unsatisfying.',
  },
  {
    id: 4,
    question:
      'Roy Baumeister&rsquo;s research on willpower and self-control introduced the concept of &ldquo;ego depletion&rdquo;. What does this concept suggest?',
    options: [
      'Willpower is unlimited and can be strengthened through practice alone',
      'Willpower is a finite resource that depletes throughout the day as you make decisions and resist temptations',
      'Willpower is genetically determined and cannot be improved',
      'Willpower is entirely dependent on motivation and has no physical component',
    ],
    correctAnswer: 1,
    explanation:
      'Roy Baumeister&rsquo;s ego depletion theory suggests that willpower is a limited resource that gets used up throughout the day. Every decision you make, every temptation you resist, and every act of self-control draws from the same reservoir. This is why it&rsquo;s harder to resist the pub on Friday evening than it is to wake up early on Monday morning &mdash; you&rsquo;ve spent the entire week depleting your willpower. For electricians, this has practical implications: don&rsquo;t rely on willpower to maintain professional habits. Instead, design systems that make good behaviours the default option. For example, if you struggle to file invoices at the end of the day when you&rsquo;re tired, do it first thing in the morning when your willpower tank is full, or automate the process entirely so willpower isn&rsquo;t required.',
  },
  {
    id: 5,
    question:
      'BJ Fogg&rsquo;s Behavior Model (B=MAP) suggests that if a desired behaviour is not occurring, you should focus on which element first?',
    options: [
      'Increase motivation, because people usually know what to do but lack the drive to do it',
      'Increase ability by making the behaviour easier, because motivation is unreliable and ability is the most controllable factor',
      'Add more prompts, because people usually forget to perform the behaviour',
      'All three elements are equally important and should be addressed simultaneously',
    ],
    correctAnswer: 1,
    explanation:
      'BJ Fogg recommends focusing on ability (making the behaviour easier) first, because motivation is unreliable and fluctuates throughout the day and week, while ability is directly within your control. His mantra is &ldquo;make it tiny&rdquo; &mdash; if a behaviour isn&rsquo;t happening, make it so easy that you can do it even when motivation is low. For electricians, this might mean: instead of &ldquo;I will update my job records every evening&rdquo; (high motivation required), try &ldquo;I will write one sentence about today&rsquo;s job before I start the van to go home&rdquo; (tiny, easy, requires almost no motivation). Once the tiny behaviour is consistent, you can gradually expand it. This approach is far more effective than trying to psych yourself up with motivational speeches.',
  },
  {
    id: 6,
    question:
      'According to habit formation research, which of the following statements about missing a day of a new habit is most accurate?',
    options: [
      'Missing a single day completely resets the habit formation process and you must start again from day one',
      'Missing a single day has no significant impact on long-term habit formation as long as you resume the behaviour',
      'Missing a single day is beneficial because it prevents the habit from becoming too rigid',
      'Missing a single day doubles the time required for the habit to become automatic',
    ],
    correctAnswer: 1,
    explanation:
      'Phillippa Lally&rsquo;s UCL research found that missing a single occurrence of a behaviour had no detectable impact on the long-term automaticity curve. The habit formation process is resilient to occasional misses, which is good news for electricians whose schedules can be unpredictable. However, James Clear&rsquo;s &ldquo;never miss twice&rdquo; rule is still important: missing once is an accident or exception, but missing twice begins to establish a new pattern of not doing the behaviour. The practical takeaway is that you should not feel guilty or defeated if you miss your new habit due to an emergency job or illness &mdash; just resume it the next day without self-criticism. Perfectionism is the enemy of habit formation.',
  },
  {
    id: 7,
    question:
      'Charles Duhigg identifies &ldquo;keystone habits&rdquo; as habits that trigger a chain reaction of other positive behaviours. For an electrician, which of the following would most likely function as a keystone habit?',
    options: [
      'Buying expensive new tools every month',
      'A consistent morning routine that includes van preparation and job review',
      'Watching educational videos about electrical theory during lunch breaks',
      'Attending one networking event per quarter',
    ],
    correctAnswer: 1,
    explanation:
      'A morning routine is a classic keystone habit because it sets the tone for the entire day and naturally cascades into other positive behaviours. An electrician with a consistent morning routine (wake at the same time, review the day&rsquo;s jobs, prepare tools and materials, check weather, plan the route) is more likely to arrive on time, have the correct equipment, work efficiently, and finish on schedule &mdash; all without requiring additional willpower. Keystone habits have a disproportionate positive impact on other areas of life. Other potential keystone habits for electricians include: end-of-day van organisation (leads to faster morning starts and professional appearance), weekly accounts review (leads to better pricing and fewer bad debts), or a daily exercise habit (leads to better energy, focus, and long-term health).',
  },
  {
    id: 8,
    question:
      'What does James Clear mean by the &ldquo;plateau of latent potential&rdquo; in habit formation?',
    options: [
      'Habits become easier to maintain after you reach a certain skill level',
      'There is often a frustrating gap between the effort you put in and the results you see, until you cross a critical threshold',
      'Habits should be practised on a plateau (flat surface) to ensure stability',
      'You can only form one new habit at a time before reaching a plateau',
    ],
    correctAnswer: 1,
    explanation:
      'The plateau of latent potential (also called the &ldquo;valley of disappointment&rdquo;) describes the frustrating period where you are putting in consistent effort but not yet seeing significant results. Imagine an ice cube sitting in a room at -1&deg;C. You heat the room to 0&deg;C &mdash; nothing happens. You heat it to 1&deg;C, 2&deg;C, 3&deg;C &mdash; still nothing. Then at 4&deg;C the ice suddenly melts. All the heat from 0&deg;C to 3&deg;C wasn&rsquo;t wasted &mdash; it was accumulating latent potential. For electricians building professional habits, this explains why it might feel like daily study isn&rsquo;t working, until suddenly you pass your 2391 exam with ease. The key is to maintain consistency through the plateau, trusting that the results will appear once you cross the threshold.',
  },
];

export default function GSModule3Section1() {
  useSEO({
    title: 'The Science of Habit Formation | Goal Setting & Growth Module 3.1',
    description:
      'Habit loop, 66-day research, Fogg Behavior Model, Four Laws of Behavior Change, compound effect, and the neuroscience of habits.',
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
            <Link to="../gs-module-3">
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
            <Zap className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Science of Habit Formation
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The habit loop, 66-day research, Fogg Behavior Model, Four Laws of Behavior Change, the
            compound effect, and why willpower is not the answer
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Habits are automatic behaviours</strong> triggered by cues, requiring
                minimal conscious effort or willpower
              </li>
              <li>
                <strong>66 days on average</strong> for a new behaviour to become automatic (not 21
                days)
              </li>
              <li>
                <strong>B=MAP:</strong> Behavior requires Motivation, Ability, and Prompt at the
                same moment
              </li>
              <li>
                <strong>1% daily improvement</strong> compounds to 37x improvement over a year
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Professional excellence:</strong> 43% of your daily behaviour is habitual
                &mdash; upgrade your habits, upgrade your career
              </li>
              <li>
                <strong>Sustainable change:</strong> Willpower is limited; habits run on autopilot
                forever
              </li>
              <li>
                <strong>Compound effect:</strong> Small daily habits create transformational
                long-term results
              </li>
              <li>
                <strong>Energy preservation:</strong> Automate routine tasks to free mental energy
                for complex work
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the three-component habit loop (cue, routine, reward) and apply it to trade-specific examples',
              'Describe the 66-day habit formation timeline and explain why missing one day does not reset progress',
              'Apply the Fogg Behavior Model (B=MAP) to diagnose why desired behaviours are not occurring',
              'Use the Four Laws of Behavior Change to design effective professional habits',
              'Calculate and explain the compound effect of 1% daily improvements over time',
              'Explain why willpower is unreliable and describe how to design systems that do not depend on it',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Habit? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What Is a Habit?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A habit is an automatic behaviour &mdash; a routine that your brain executes with
                minimal conscious thought or decision-making. Neuroscientist Ann Graybiel&rsquo;s
                research at MIT showed that when a behaviour becomes habitual, activity in the
                decision-making parts of the brain (the prefrontal cortex) decreases, while activity
                in the basal ganglia (the brain&rsquo;s autopilot system) increases. This
                neurological shift is why habits feel effortless: you are literally using less brain
                power to execute them. For electricians, this matters because professional tasks
                like checking your test instruments, isolating supplies correctly, or updating job
                notes can either require constant willpower (exhausting and unreliable) or become
                automatic habits (effortless and consistent).
              </p>

              <p>
                Habits operate below the level of conscious awareness. You do not decide to brush
                your teeth every morning &mdash; you just do it. You do not debate whether to put
                your seatbelt on when you get in the van &mdash; your hand reaches for it
                automatically. This is the power and the danger of habits. Good habits (checking
                isolation before starting work, photographing every job for records, daily van
                organisation) compound into professional excellence. Bad habits (skipping PPE
                because &ldquo;it&rsquo;s just a quick job&rdquo;, procrastinating on invoices,
                avoiding calibration checks) compound into career-limiting patterns and potentially
                dangerous situations.
              </p>

              <p>
                The distinction between a habit and a goal is critical. A goal is something you want
                to achieve: &ldquo;I want to pass my 2391 exam.&rdquo; A habit is a behaviour you
                repeat regularly that moves you towards that goal: &ldquo;I study BS 7671 for 15
                minutes every morning.&rdquo; Goals provide direction, but habits provide progress.
                Many electricians set goals (&ldquo;I want to earn &pound;60,000 this year&rdquo;)
                without establishing the habits that make the goal achievable (daily client
                follow-up, weekly accounts review, systematic marketing). The result is frustration
                and failure. This section will teach you how to reverse-engineer your goals into
                daily habits.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Habit Iceberg</p>
                <p className="text-base text-white leading-relaxed">
                  What you see: an electrician who always has the right tools, finishes jobs on
                  time, has no bad debts, and has a spotless professional reputation. What you
                  don&rsquo;t see: the daily habits that create that outcome. Morning van checks.
                  End of-day tool counts. Friday invoice discipline. Weekly CRM review. Monthly
                  accounts analysis. These invisible habits are the 90% of the iceberg below the
                  waterline. Excellence is not an accident &mdash; it is the inevitable result of
                  excellent habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Habit Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Habit Loop &mdash; Cue, Routine, Reward
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Charles Duhigg&rsquo;s book <em>The Power of Habit</em> (2012) popularised the
                three-component habit loop based on decades of neuroscience research. Every habit,
                whether good or bad, follows the same pattern:{' '}
                <strong>Cue &rarr; Routine &rarr; Reward</strong>. The Cue is the trigger that tells
                your brain to go into automatic mode and execute the behaviour. The Routine is the
                behaviour itself (physical, mental, or emotional). The Reward is the benefit you
                gain, which helps your brain remember this loop for the future. Understanding this
                loop is essential because you cannot change what you do not understand.
              </p>

              <p>
                For electricians, a professional habit might look like this: <strong>Cue:</strong>{' '}
                parking your van at the end of the day (a consistent, unavoidable daily event).
                <strong> Routine:</strong> spending five minutes updating your job sheet,
                photographing the completed work, and filing the invoice. <strong>Reward:</strong>{' '}
                the immediate satisfaction of ticking off the task and the long-term benefit of
                having organised records and no Friday afternoon admin panic. The cue must be
                obvious and consistent (parking the van happens every day). The routine must be
                simple enough to complete even when you are tired. The reward must be immediate
                enough to reinforce the loop.
              </p>

              <p>
                Bad habits follow exactly the same loop, which is why they are so persistent.
                <strong> Cue:</strong> feeling bored or frustrated on a job.{' '}
                <strong>Routine:</strong> picking up your phone and scrolling social media for 20
                minutes. <strong>Reward:</strong> temporary distraction and dopamine hit. Your brain
                learns this loop and will repeat it automatically whenever the cue appears. Breaking
                a bad habit requires either eliminating the cue (if possible), replacing the routine
                with a better behaviour that provides a similar reward, or removing the reward
                entirely. We will cover this in detail in Section 3.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Trade Example: Tool Management Habit Loop
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Cue:</strong> Packing up tools at the end of the job (unavoidable
                      daily event)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Routine:</strong> Count tools against checklist, wipe down test
                      instruments, return everything to designated van location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Reward:</strong> Immediate &mdash; visual satisfaction of organised
                      van. Long-term &mdash; never arrive on site without the right tool, no time
                      wasted searching, no money wasted replacing lost equipment
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This loop, repeated daily for 66 days, becomes automatic. You will eventually feel
                  uncomfortable leaving a job without completing the routine &mdash; that is when
                  you know the habit is established.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The 66-Day Research */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            How Long Does It Really Take? The 66-Day Research
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The widely quoted claim that it takes 21 days to form a habit is a myth with no
                scientific basis. The number originated from a 1960 book by plastic surgeon Maxwell
                Maltz, who observed that amputees took about 21 days to adjust to the loss of a
                limb. This observation &mdash; which was never about habit formation and was never
                based on rigorous research &mdash; was misinterpreted and spread as fact. The real
                science paints a very different picture.
              </p>

              <p>
                In 2009, health psychology researcher Phillippa Lally and colleagues at University
                College London published a study in the{' '}
                <em>European Journal of Social Psychology</em> that tracked 96 participants as they
                attempted to form a new habit over 12 weeks. The participants chose a simple daily
                behaviour (drinking a glass of water at breakfast, doing a 10-minute walk after
                dinner, eating fruit at lunch) and reported each day whether they performed it.
                Lally&rsquo;s team measured automaticity &mdash; the degree to which the behaviour
                felt effortless and habitual &mdash; using a validated self-report scale.
              </p>

              <p>
                The results: on average, it took <strong>66 days</strong> for the new behaviour to
                reach peak automaticity. However, there was substantial variation: the range was
                from 18 days for the simplest habits (drinking water) to 254 days for more complex
                behaviours (a 50-sit-up routine before breakfast). The complexity of the habit, the
                person&rsquo;s baseline self-discipline, and environmental factors all influenced
                the timeline. Crucially, the study found that{' '}
                <strong>missing a single day had no significant impact</strong> on the long-term
                habit formation curve &mdash; the brain was resilient to occasional lapses as long
                as the behaviour resumed the next day.
              </p>

              <p>
                For electricians, this research has important implications. If you are building a
                professional habit (daily study, end-of-day admin, weekly accounts review), commit
                to at least two months of consistent repetition before expecting it to feel
                automatic. Do not be discouraged if it still requires willpower on day 30 &mdash;
                that is normal. And do not catastrophise if you miss a day due to an emergency
                callout or illness &mdash; just resume the next day without guilt. The goal is
                long-term consistency, not short-term perfection.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Habit Formation Timeline (Average)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Days 1&ndash;10:</strong> High motivation, high willpower requirement.
                      The behaviour feels effortful and you must consciously remember to do it. This
                      is the danger zone for quitting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Days 11&ndash;30:</strong> Motivation starts to wane, but the
                      behaviour is becoming more familiar. You still need reminders and prompts.
                      Consistency is more important than intensity during this phase.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Days 31&ndash;66:</strong> The behaviour is becoming automatic. You
                      start to feel uncomfortable if you miss it. Willpower requirement decreases
                      significantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Day 66+:</strong> The habit is established. It runs on autopilot and
                      requires minimal conscious effort. You can now stack a second habit on top of
                      this one.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: BJ Fogg's Behavior Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            BJ Fogg&rsquo;s Behavior Model &mdash; B=MAP
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BJ Fogg, a behaviour scientist at Stanford University and founder of the Behavior
                Design Lab, developed one of the most practical models for understanding why
                behaviours do and do not happen. The Fogg Behavior Model states that{' '}
                <strong>B = MAP</strong>: for a Behavior to occur, three elements must converge at
                the same moment &mdash; Motivation (the desire to do the behaviour), Ability (the
                capacity to do it), and Prompt (a cue that triggers it). If any one of these three
                is missing, the behaviour will not occur.
              </p>

              <p>
                Most people assume that behaviour change is primarily a motivation problem: &ldquo;I
                just need to want it more.&rdquo; Fogg&rsquo;s research shows this is wrong.
                Motivation is the least reliable of the three elements because it fluctuates wildly
                based on mood, energy levels, external circumstances, and time of day. Fogg&rsquo;s
                advice: <strong>focus on ability first</strong>. Make the behaviour so easy that you
                can do it even when motivation is at rock bottom. His mantra is &ldquo;make it
                tiny&rdquo; &mdash; shrink the behaviour until it is laughably small and requires
                almost no effort.
              </p>

              <p>
                For electricians, this model is a diagnostic tool. If a desired professional habit
                is not happening, ask three questions: (1) <strong>Do I want to do this?</strong> If
                the answer is genuinely no, you need to redesign the habit or find a better reward.
                (2)
                <strong> Can I do this easily?</strong> If the answer is no, simplify the behaviour
                until it takes less than two minutes. (3) <strong>Is there a reliable cue?</strong>{' '}
                If the answer is no, anchor the behaviour to an existing daily event. Most failed
                habits are ability problems disguised as motivation problems.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Applying B=MAP to Trade Habits
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Desired habit: &ldquo;I want to study for my 2391 qualification every day.&rdquo;
                  Why it&rsquo;s failing:
                </p>
                <ul className="text-sm text-white space-y-2 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Motivation:</strong> Present (you do want to pass the exam)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Ability:</strong> Low (you&rsquo;re tired at the end of the day,
                      studying feels overwhelming, the material is dense)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Prompt:</strong> None (there&rsquo;s no reliable daily cue)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white leading-relaxed">
                  <strong>Redesigned habit:</strong> &ldquo;After I pour my first coffee in the
                  morning, I will read one page of BS 7671.&rdquo; Motivation: same. Ability: very
                  high (one page takes 90 seconds). Prompt: clear and reliable (pouring coffee).
                  This tiny habit will succeed where the original version failed, and once
                  it&rsquo;s established you can gradually expand it to two pages, then five, then a
                  full study session.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Four Laws of Behavior Change */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            James Clear&rsquo;s Four Laws of Behavior Change
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                James Clear&rsquo;s book <em>Atomic Habits</em> (2018) synthesises decades of
                behaviour science into four simple laws for building good habits: (1) Make it
                obvious, (2) Make it attractive, (3) Make it easy, (4) Make it satisfying. These
                laws map onto the stages of the habit loop and provide a practical framework for
                designing effective habits. Critically, the laws can also be inverted to break bad
                habits: make it invisible, make it unattractive, make it difficult, make it
                unsatisfying.
              </p>

              <p>
                <strong>Law 1: Make it obvious.</strong> You cannot build a habit if you do not
                remember to do it. The cue must be visible and unavoidable. For electricians, this
                might mean leaving your test instruments on the driver&rsquo;s seat overnight so you
                see them first thing in the morning, putting your study materials on the kitchen
                table where you eat breakfast, or setting a phone alarm for daily tasks. The
                environment should remind you of the behaviour without requiring you to remember.
              </p>

              <p>
                <strong>Law 2: Make it attractive.</strong> You are more likely to repeat a
                behaviour if it is enjoyable or paired with something you already like. Temptation
                bundling is a powerful technique here: pair a habit you need to do with a habit you
                want to do. For example, listen to your favourite podcast only while organising your
                van, or allow yourself a coffee only after completing your morning job review. This
                creates positive associations with behaviours that might otherwise feel like chores.
              </p>

              <p>
                <strong>Law 3: Make it easy.</strong> The easier a behaviour is, the more likely you
                are to do it. This aligns with BJ Fogg&rsquo;s emphasis on ability. Reduce friction
                by preparing in advance: lay out your study materials the night before, pre-fill
                your van stock list template, automate repetitive admin tasks. The two-minute rule
                is powerful: a new habit should take less than two minutes to complete. Once the
                two-minute version is automatic, you can expand it.
              </p>

              <p>
                <strong>Law 4: Make it satisfying.</strong> We are more likely to repeat a behaviour
                if the reward is immediate. This is a challenge for professional habits where the
                real reward (a passed exam, a profitable year, a strong reputation) is months or
                years away. The solution is to add an immediate reward: tick off the habit on a
                visible chart, transfer £5 to a &ldquo;holiday fund&rdquo; every time you complete
                your daily study, or use a habit tracker app that gives you a dopamine hit of visual
                progress. The immediate satisfaction reinforces the behaviour.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Four Laws Applied: Daily Tool Calibration Check
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Obvious:</strong> Leave test instruments on the passenger seat every
                      night. You cannot miss them.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Attractive:</strong> Pair the calibration check with your morning
                      coffee. The reward is built in.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Easy:</strong> Create a one-page laminated checklist. The check takes
                      90 seconds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Satisfying:</strong> Use a wall chart with a box for each day. Tick it
                      off and feel the satisfaction. After 30 consecutive days, reward yourself with
                      something meaningful.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Compound Effect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            The Compound Effect &mdash; 1% Better Every Day
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most powerful concepts in <em>Atomic Habits</em> is the compound effect
                of marginal gains. If you get 1% better at something every day for a year, the
                mathematics of compounding mean you end up 37 times better by the end of the year
                (1.01^365 = 37.78). Conversely, if you get 1% worse every day, you decline to nearly
                zero (0.99^365 = 0.03). This is not literal for most real-world skills, but the
                principle is profound: small improvements, repeated consistently, create
                transformational results. Small declines, ignored or rationalised, create
                catastrophic failure.
              </p>

              <p>
                For electricians, the compound effect explains why two apprentices who start with
                identical qualifications can end up in completely different places five years later.
                One develops the habit of reading one regulation per day, asking one question per
                day, and improving one process per week. The other does not. After a year, the
                difference is noticeable. After five years, the difference is a completely different
                career trajectory. The daily improvements are almost invisible &mdash; no single day
                makes a dramatic difference &mdash; but the cumulative effect is everything.
              </p>

              <p>
                The compound effect also explains why it is hard to see progress in the early stages
                of habit formation. James Clear calls this the &ldquo;plateau of latent
                potential&rdquo; or the &ldquo;valley of disappointment&rdquo;. You expect linear
                progress (if I put in X effort, I should see X results), but habits produce delayed,
                non-linear results. You put in effort every day and see almost nothing. Then,
                suddenly, you cross a critical threshold and the results become visible. The ice
                cube analogy is useful: heat a room from -5&deg;C to 0&deg;C, and the ice cube sits
                there unchanged. Heat it from 0&deg;C to +5&deg;C, and it still sits there. Then at
                +6&deg;C it suddenly melts. All the earlier heat was not wasted &mdash; it was
                accumulating latent potential.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Trade Example: The Compound Effect in Action
                </p>
                <p className="text-base text-white leading-relaxed">
                  Electrician A ends every job by spending two minutes photographing the work,
                  writing one sentence in their job log, and filing the invoice. Electrician B
                  intends to do this but usually forgets until Friday, then spends two hours trying
                  to remember what happened on Monday. After one week, the difference is trivial.
                  After one month, Electrician A has a perfect record and Electrician B has a messy
                  backlog. After one year, Electrician A has 250+ jobs documented, zero bad debts,
                  and a reputation for professionalism. Electrician B has missing invoices, disputed
                  payments, and a nagging sense of being out of control. Same qualification. Same
                  skills. Different habits. Different life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Why Willpower Is Not the Answer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Why Willpower Is Not the Answer
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Psychologist Roy Baumeister&rsquo;s research on self-control introduced the concept
                of &ldquo;ego depletion&rdquo; &mdash; the idea that willpower is a finite resource
                that gets used up throughout the day. Every decision you make, every temptation you
                resist, and every act of self-discipline draws from the same limited tank. This is
                why it&rsquo;s easy to stick to your diet at breakfast but hard to resist the pub on
                Friday evening. It&rsquo;s why you can wake up early and go for a run on Monday
                morning but struggle to do it on Friday after a long week. Your willpower has been
                depleted.
              </p>

              <p>
                For electricians, this has critical implications. If your professional habits depend
                on willpower, they will fail under pressure. The busier and more stressful your
                week, the more likely you are to abandon good habits and revert to bad ones. This is
                why New Year&rsquo;s resolutions fail: they rely on high motivation and high
                willpower in January, but by March both are exhausted and the old patterns return.
                The solution is not to develop &ldquo;more willpower&rdquo; (though willpower can be
                strengthened to some extent through practice). The solution is to design systems
                that do not require willpower.
              </p>

              <p>
                Wendy Wood&rsquo;s research on habit and automaticity emphasises that the hallmark
                of a true habit is that it requires minimal willpower. If you are using willpower to
                maintain a behaviour, it is not yet a habit &mdash; it is still an intentional
                action. The goal of the 66-day process is to shift the behaviour from the
                willpower-dependent prefrontal cortex to the automatic basal ganglia. Once this
                shift occurs, the behaviour runs on autopilot regardless of how tired, stressed, or
                unmotivated you feel.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Designing Systems, Not Relying on Willpower
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Willpower-dependent approach: &ldquo;I will force myself to update my accounts
                  every Friday evening even though I&rsquo;m exhausted.&rdquo; Success rate: low.
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  System-dependent approach: &ldquo;I will spend five minutes updating accounts
                  immediately after my first job of the day on Fridays, before I start the second
                  job. I will set a recurring phone alarm for 9am every Friday as a prompt.&rdquo;
                  Success rate: high.
                </p>
                <p className="text-sm text-white leading-relaxed">
                  The second approach does not require willpower. The system (the alarm prompt and
                  the specific timing) does the work. You are designing your environment for success
                  rather than relying on your depleted Friday-evening self-discipline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the scientific foundations of habit formation. The key
                points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habits are automatic behaviours</strong> that use less brain power than
                    conscious decision-making. Approximately 43% of daily behaviour is habitual.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The habit loop</strong> (Cue &rarr; Routine &rarr; Reward) governs all
                    habits. Understanding this loop allows you to design new habits and break old
                    ones.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>66 days on average</strong> for a behaviour to become automatic (not 21
                    days). Missing one day does not reset progress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>B=MAP:</strong> Behavior requires Motivation, Ability, and Prompt. Focus
                    on making the behaviour easy rather than trying to increase motivation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Four Laws:</strong> Make it obvious, attractive, easy, and satisfying.
                    These laws map onto the habit loop stages and provide a design framework.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Compound effect:</strong> 1% daily improvement = 37x improvement over a
                    year. Small habits create transformational long-term results.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Willpower is unreliable.</strong> Design systems that do not depend on
                    willpower. True habits run on autopilot.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will apply these
                  principles to building professional habits specifically for electricians working
                  on site &mdash; morning routines, tool management, safety habits, admin
                  discipline, CPD habits, and health habits.
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
            <Link to="../gs-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-3-section-2">
              Next: Building Professional Habits on Site
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
