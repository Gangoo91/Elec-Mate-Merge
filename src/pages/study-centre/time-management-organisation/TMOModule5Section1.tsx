import { ArrowLeft, Brain, CheckCircle } from 'lucide-react';
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
    id: 'tmo-5-1-habit-loop',
    question:
      "An electrician wants to build the habit of photographing every completed job before leaving site. Using James Clear's habit loop, which of the following correctly identifies the four stages?",
    options: [
      'Cue: alarm on phone; Craving: wanting a good portfolio; Response: take photo; Reward: updated job file',
      'Cue: finishing the job; Craving: motivation; Response: remember to photograph; Reward: client satisfaction',
      'Cue: seeing the camera app; Craving: social media likes; Response: take photo; Reward: Instagram followers',
      'Cue: colleague reminder; Craving: avoiding a fine; Response: reluctant photo; Reward: compliance achieved',
    ],
    correctIndex: 0,
    explanation:
      "James Clear's four-step habit loop requires a clear cue (the alarm triggers the behaviour), a craving (the desire for a professional portfolio and organised records), a response (the actual behaviour of taking the photograph), and a reward (the satisfaction of an updated, well-documented job file). The cue must be obvious and automatic — an alarm or a habit stack is far more reliable than relying on memory after a tiring job.",
  },
  {
    id: 'tmo-5-1-identity',
    question:
      'According to James Clear, identity-based habits focus on "I am someone who..." rather than "I want to..." Why is this distinction important?',
    options: [
      'It sounds more professional when speaking to clients',
      'Identity-based habits are easier to remember because they are shorter sentences',
      'When a behaviour becomes part of your identity, you are motivated by who you are rather than by external outcomes — making the habit more resilient',
      'There is no meaningful difference; both approaches produce identical results',
    ],
    correctIndex: 2,
    explanation:
      'Clear argues that the most durable habits are those tied to identity rather than outcomes. "I want to be more organised" is an outcome-based goal that depends on willpower. "I am someone who plans tomorrow before leaving site" is an identity statement — every time you do it, you reinforce your self-image as an organised professional. Identity-based habits survive bad days, setbacks, and low motivation because they are about who you are, not just what you want.',
  },
  {
    id: 'tmo-5-1-compound',
    question:
      'The 1% rule states that improving by 1% every day leads to being approximately how much better after one year?',
    options: [
      '3.65 times better (365%)',
      '12 times better',
      '37 times better (1.01 raised to the power of 365)',
      '100 times better',
    ],
    correctIndex: 2,
    explanation:
      "The mathematics of compound improvement: 1.01 raised to the power of 365 equals approximately 37.78. This is James Clear's core insight — tiny improvements are not dramatic on any given day, but compounded over a year they produce extraordinary results. Equally, getting 1% worse every day (0.99 to the power of 365) reduces you to approximately 0.03 — almost nothing. The direction of your daily habits matters far more than the magnitude of any single effort.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long does it actually take to form a new habit?',
    answer:
      "The commonly cited figure of 21 days is a myth based on a misinterpretation of plastic surgeon Maxwell Maltz's 1960 book Psycho-Cybernetics, where he observed that patients took a minimum of 21 days to adjust to a new appearance. The most rigorous study was conducted by Phillippa Lally and colleagues at University College London in 2010. They tracked 96 participants forming new habits and found the average time to automaticity was 66 days, with a range of 18 to 254 days depending on the complexity of the behaviour and the individual. Simple habits (drinking a glass of water with lunch) formed faster; complex habits (going for a run before dinner) took much longer. The key takeaway: expect 2 to 3 months, not 3 weeks, and do not judge your progress by the 21-day myth.",
  },
  {
    question: "What is the difference between Duhigg's habit loop and Clear's model?",
    answer:
      'Charles Duhigg\'s original model in The Power of Habit (2012) describes a three-step loop: cue, routine, reward. James Clear expanded this to a four-step model in Atomic Habits (2018): cue, craving, response, reward. The key addition is "craving" — Clear argues that it is the craving (the motivational force) that drives the response, not the cue alone. A cue without craving produces no action. For practical purposes, Clear\'s model gives you more leverage points for building or breaking habits: you can manipulate the cue, the craving, the response, or the reward independently.',
  },
  {
    question: 'Can habit stacking work for complex professional routines?',
    answer:
      'Absolutely, and it is particularly effective for tradespeople because the working day already contains many reliable anchor habits. The key is to choose an anchor habit that happens at the same time, in the same context, every day. "After I start the van engine" is a near-perfect anchor because it happens daily without fail and marks a clear transition point. "After I finish the last job of the day" works for end-of-day habits. The new habit you stack on top should be small enough to complete in under 5 minutes initially — you can expand it later once the trigger-response pattern is established.',
  },
  {
    question: 'What should I do if I miss a day — does it reset my progress?',
    answer:
      'No. James Clear emphasises the "never miss twice" rule. Missing one day has virtually no measurable impact on long-term habit formation. Missing two days in a row is where the danger lies, because it begins to establish a new pattern of non-compliance. Lally\'s 2010 research confirmed that missing a single day did not significantly affect the habit formation process. The critical insight is that perfection is not required — consistency is. If you miss your end-of-day planning session on Tuesday, the priority is to do it on Wednesday without guilt or self-criticism. The goal is not a perfect streak; it is a strong overall trend.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "James Clear's four-step habit loop, as described in Atomic Habits (2018), consists of:",
    options: [
      'Trigger, action, outcome, reflection',
      'Cue, craving, response, reward',
      'Stimulus, behaviour, reinforcement, repetition',
      'Awareness, intention, execution, evaluation',
    ],
    correctAnswer: 1,
    explanation:
      "Clear's model expands Charles Duhigg's three-step loop (cue, routine, reward) into four stages: cue (the trigger that initiates the behaviour), craving (the motivational force behind it), response (the actual habit you perform), and reward (the benefit you gain). Each stage maps to one of the 4 Laws of Behaviour Change, giving you a specific lever to pull when building or breaking any habit.",
  },
  {
    id: 2,
    question:
      'The 4 Laws of Behaviour Change, which map to the four stages of the habit loop, are:',
    options: [
      'Make it visible, make it desirable, make it simple, make it rewarding',
      'Make it obvious, make it attractive, make it easy, make it satisfying',
      'Make it clear, make it fun, make it quick, make it profitable',
      'Make it memorable, make it exciting, make it habitual, make it measurable',
    ],
    correctAnswer: 1,
    explanation:
      'The 4 Laws map directly to the habit loop: (1) Make it obvious = improve the cue, (2) Make it attractive = enhance the craving, (3) Make it easy = simplify the response, (4) Make it satisfying = increase the reward. To break a bad habit, you invert each law: make it invisible, unattractive, difficult, and unsatisfying. This framework gives you a systematic approach to engineering any behaviour change.',
  },
  {
    id: 3,
    question:
      'An electrician uses habit stacking to build a new routine: "After I park the van at home, I spend 10 minutes planning tomorrow." This technique works because:',
    options: [
      'Parking the van is the most relaxing part of the day, so the electrician is in a good mood',
      'It links the new behaviour to an existing, reliable habit, leveraging the neural pathways already established for the anchor behaviour',
      'It forces the electrician to stay in the van, reducing distractions',
      'Habit stacking only works in the evening, not at other times of the day',
    ],
    correctAnswer: 1,
    explanation:
      'Habit stacking, a concept popularised by BJ Fogg and refined by James Clear, works by pairing a new desired behaviour with an existing automatic behaviour. The existing behaviour (parking the van) acts as a reliable cue because it already has strong neural pathways. The new behaviour (planning tomorrow) piggybacks on those pathways rather than requiring a brand new trigger. The key is choosing an anchor habit that is 100% reliable and occurs at a natural transition point in the day.',
  },
  {
    id: 4,
    question:
      'According to identity-based habit formation, which statement is most likely to produce lasting change?',
    options: [
      '"I want to be more organised this year"',
      '"I am someone who plans every day before leaving site"',
      '"My boss told me I need to be better at paperwork"',
      '"I will try to do my admin more regularly"',
    ],
    correctAnswer: 1,
    explanation:
      'Identity-based habits are at the core of Clear\'s approach. "I am someone who plans every day before leaving site" is an identity statement — each time you perform the behaviour, you cast a vote for the type of person you are becoming. Over time, the accumulation of evidence changes your self-image. The other options are outcome-based ("I want to"), externally motivated ("my boss told me"), or non-committal ("I will try"). Identity-based habits are more resilient because they tap into intrinsic motivation rather than external pressure or vague intention.',
  },
  {
    id: 5,
    question:
      "Phillippa Lally's 2010 study at University College London found that the average time to form a new habit (reach automaticity) was:",
    options: [
      '21 days, confirming the popular belief',
      '7 days for simple habits, 30 days for complex ones',
      '66 days on average, with a range of 18 to 254 days',
      'Exactly 90 days regardless of habit complexity',
    ],
    correctAnswer: 2,
    explanation:
      'Lally et al. tracked 96 participants and found the average time to automaticity was 66 days, with enormous variation (18 to 254 days) depending on the individual and the complexity of the behaviour. The popular "21 days" myth comes from a misinterpretation of Maxwell Maltz\'s 1960 observations about plastic surgery patients. The practical implication is clear: give new habits at least 2 months before judging whether they have "stuck," and do not be discouraged if progress feels slow in the first few weeks.',
  },
  {
    id: 6,
    question:
      'The 1% rule demonstrates the power of compound improvement. If you improve by 1% every day for a year, you will be approximately:',
    options: [
      '3.65 times better (1% multiplied by 365 days)',
      '12 times better',
      '37 times better (1.01 to the power of 365)',
      '365 times better',
    ],
    correctAnswer: 2,
    explanation:
      "The mathematical formula is 1.01 raised to the power of 365, which equals approximately 37.78. This is not addition (which would give 4.65); it is compounding. Each 1% improvement builds on the previous day's improved baseline, creating exponential growth. The inverse is equally powerful: 0.99 to the power of 365 equals approximately 0.03 — getting 1% worse each day effectively reduces you to near-zero. This is why James Clear argues that habits are the compound interest of self-improvement.",
  },
  {
    id: 7,
    question:
      'An electrician wants to break the habit of checking social media during testing. Using the inversion of the 4 Laws, which strategy directly addresses "make it difficult" (the third law inverted)?',
    options: [
      'Putting the phone on silent and placing it in the van during testing',
      'Setting the phone background to a motivational quote about productivity',
      'Promising a colleague they will stop checking social media',
      'Rewarding themselves with 10 minutes of social media after completing the test',
    ],
    correctAnswer: 0,
    explanation:
      'The third law of behaviour change is "make it easy" — its inversion for breaking bad habits is "make it difficult." Physically removing the phone from the immediate environment increases the friction required to perform the unwanted behaviour. You would have to stop testing, walk to the van, retrieve the phone, and then open social media — far too many steps for a casual impulse check. This is environmental design, one of the most powerful and underused strategies in behaviour change.',
  },
  {
    id: 8,
    question:
      'BJ Fogg\'s concept of "Tiny Habits" suggests that when starting a new habit, you should:',
    options: [
      'Set ambitious targets to maximise motivation and push yourself',
      'Make the initial version of the habit so small it takes less than 2 minutes, then scale up gradually',
      'Only practise the habit on days when you feel motivated',
      'Wait until you have a full week free to dedicate to building the habit properly',
    ],
    correctAnswer: 1,
    explanation:
      'BJ Fogg, a behaviour scientist at Stanford University, argues that the biggest mistake people make is starting too big. His "Tiny Habits" method prescribes making the initial version of any new habit absurdly small — so small that it is almost impossible to fail. Want to plan your day? Start by writing one task on a sticky note. Want to photograph every job? Start by taking one photo of the final result. The tiny version establishes the neural pathway and the identity ("I am someone who..."). Once the habit is automatic, you naturally expand it. Motivation is unreliable; making it tiny removes the need for motivation.',
  },
];

export default function TMOModule5Section1() {
  useSEO({
    title: 'The Science of Habit Formation | Time Management & Organisation Module 5.1',
    description:
      "James Clear's Atomic Habits, the habit loop, the 4 Laws of Behaviour Change, identity-based habits, the 1% rule, and habit stacking for tradespeople.",
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
            <Brain className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Science of Habit Formation
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            James Clear&rsquo;s Atomic Habits, the habit loop, the 4 Laws of Behaviour Change,
            identity-based habits, the 1% rule, and habit stacking for tradespeople
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Habits</strong> are the compound interest of self-improvement (James Clear)
              </li>
              <li>
                <strong>The habit loop:</strong> cue &rarr; craving &rarr; response &rarr; reward
              </li>
              <li>
                <strong>4 Laws:</strong> make it obvious, attractive, easy, and satisfying
              </li>
              <li>
                <strong>Key insight:</strong> 1% better every day = 37x better in a year
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Consistency:</strong> Small daily habits compound into extraordinary
                professional results
              </li>
              <li>
                <strong>Willpower is finite:</strong> Systems beat motivation every time
              </li>
              <li>
                <strong>Trade-specific:</strong> Habit stacking transforms van routines, job
                documentation, and planning
              </li>
              <li>
                <strong>Identity:</strong> &ldquo;I am someone who...&rdquo; is more powerful than
                &ldquo;I want to...&rdquo;
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain the four stages of James Clear's habit loop and how each stage drives behaviour",
              'Apply the 4 Laws of Behaviour Change to build new professional habits and break unproductive ones',
              'Describe the difference between identity-based and outcome-based habits and why identity change is more durable',
              'Use habit stacking to link new behaviours to existing reliable routines in the working day',
              'Calculate the compound effect of small daily improvements using the 1% rule',
              'Design a practical habit-building plan using construction-specific cues and rewards',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Atomic Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Atomic Habits &mdash; The Compound Interest of Self-Improvement
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2018, James Clear published <em>Atomic Habits</em>, a book that has since sold
                over 15 million copies and fundamentally changed how people think about behaviour
                change. Clear&rsquo;s central argument is deceptively simple:{' '}
                <strong>habits are the compound interest of self-improvement.</strong> Just as money
                multiplies through compound interest, the effects of your habits multiply as you
                repeat them. A single 1% improvement is barely noticeable on any given day, but
                compounded over months and years, it produces results that are nothing short of
                remarkable.
              </p>

              <p>
                The mathematics are striking. If you get 1% better each day for one year, you will
                end up approximately 37 times better by the end (1.01 raised to the power of 365
                equals 37.78). Conversely, if you get 1% worse each day &mdash; slipping slightly,
                cutting corners, skipping the small things &mdash; you decline to nearly zero (0.99
                to the power of 365 equals 0.03). This is why Clear argues that your outcomes are a
                lagging measure of your habits. Your net worth is a lagging measure of your
                financial habits. Your weight is a lagging measure of your eating habits. Your
                knowledge is a lagging measure of your learning habits. And your professional
                reputation is a lagging measure of your daily work habits.
              </p>

              <p>
                For tradespeople, this insight has profound practical implications. The electrician
                who photographs every completed job, updates their job file the same day, and spends
                10 minutes each evening planning tomorrow is not making dramatic changes on any
                single day. But after 6 months, they have a professional portfolio of hundreds of
                documented jobs, a complete record of every installation, and a reputation for
                reliability that generates referrals. The electrician who skips the photograph
                because they are tired, leaves the paperwork until the weekend, and wings it each
                morning is equally not making dramatic changes on any single day. But after 6
                months, they have no portfolio, incomplete records, a stack of overdue paperwork,
                and a growing feeling of being overwhelmed. Same profession, same skills &mdash;
                radically different outcomes driven by tiny daily habits.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 1% Rule</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Habits are the compound interest of self-improvement. The same way that
                    money multiplies through compound interest, the effects of your habits multiply
                    as you repeat them.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; James Clear, <em>Atomic Habits</em> (2018)
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> You do not need to transform your entire working
                  life overnight. You need to get 1% better at one thing today, and then do it again
                  tomorrow. The compounding takes care of the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Habit Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Habit Loop &mdash; Cue, Craving, Response, Reward
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding how habits form requires understanding the mechanism that drives them.
                Charles Duhigg, in <em>The Power of Habit</em> (2012), introduced the three-step
                habit loop: cue, routine, reward. James Clear refined this into a four-step model
                that provides additional leverage for behaviour change:{' '}
                <strong>cue, craving, response, reward.</strong> The addition of
                &ldquo;craving&rdquo; is crucial because it explains <em>why</em> we act on cues
                rather than merely <em>that</em> we act.
              </p>

              <p>
                The <strong>cue</strong> is the trigger that initiates the behaviour. It is a piece
                of information that predicts a reward &mdash; a time of day, a location, an
                emotional state, a preceding action, or the presence of other people. For
                tradespeople, common cues include arriving at a job site, finishing a task, starting
                the van, receiving a phone notification, or feeling bored between tasks. The{' '}
                <strong>craving</strong> is the motivational force behind the habit. It is not the
                habit itself you crave, but the change in state it delivers. You do not crave
                scrolling Instagram; you crave the relief from boredom. You do not crave a cup of
                tea; you crave the warmth and the break from concentration. Without craving, there
                is no reason to act.
              </p>

              <p>
                The <strong>response</strong> is the actual habit you perform &mdash; the behaviour
                itself. Whether the response occurs depends on how much friction is involved and how
                motivated you are. If the habit requires significant effort (driving across town to
                get materials), you need a stronger craving to execute it. If it requires minimal
                effort (tapping an app to log a completed job), even a mild craving will suffice.
                Finally, the <strong>reward</strong> is the end goal of every habit. Rewards satisfy
                cravings (the boredom is relieved, the tea provides warmth) and teach your brain
                which actions are worth remembering. Over time, the brain learns to associate the
                cue with the reward, and the entire loop becomes automatic &mdash; which is what we
                mean when we say a behaviour has become a &ldquo;habit.&rdquo;
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Building a Job Documentation Habit
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cue:</strong> Finishing the final test on a job (a natural transition
                      point that already exists in every electrician&rsquo;s day)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Craving:</strong> The desire for a complete, professional record and
                      the satisfaction of a job properly closed out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Response:</strong> Photograph the completed work, update the job file,
                      note any observations for the certificate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reward:</strong> The satisfaction of a fully documented job, a growing
                      professional portfolio, and the knowledge that the certificate will be easy to
                      complete
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The 4 Laws of Behaviour Change */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The 4 Laws of Behaviour Change
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                James Clear maps each stage of the habit loop to a practical &ldquo;law&rdquo; for
                building good habits. These are not abstract theories &mdash; they are actionable
                design principles that you can apply immediately to any behaviour you want to
                establish or eliminate. The beauty of the framework is its symmetry: to build a good
                habit, you apply the law; to break a bad one, you invert it.
              </p>

              <p>
                <strong>Law 1: Make it obvious</strong> (improving the cue). The most effective way
                to trigger a new habit is to make its cue unmissable. Use implementation intentions
                (&ldquo;I will [behaviour] at [time] in [location]&rdquo;) and environment design
                (place the tool where you will see it). An electrician who wants to plan tomorrow
                each evening could place a planning notebook on the van dashboard &mdash; the cue is
                impossible to miss when starting the drive home.{' '}
                <strong>Law 2: Make it attractive</strong> (enhancing the craving). Bundle the new
                habit with something you enjoy. Temptation bundling pairs a behaviour you need to do
                with one you want to do. Listen to your favourite podcast only while doing your
                end-of-day admin. The admin becomes attractive because it is paired with something
                enjoyable.
              </p>

              <p>
                <strong>Law 3: Make it easy</strong> (simplifying the response). Reduce friction for
                good habits. The Two-Minute Rule says: when you start a new habit, it should take
                less than two minutes to complete. &ldquo;Plan tomorrow&rdquo; becomes &ldquo;write
                down one task for tomorrow.&rdquo; &ldquo;Photograph every job&rdquo; becomes
                &ldquo;take one photo of the finished work.&rdquo; Once the behaviour is
                established, you naturally expand it. <strong>Law 4: Make it satisfying</strong>{' '}
                (increasing the reward). We repeat behaviours that feel good. Use habit tracking (a
                visual record of your streak), immediate rewards (a small treat after completing the
                admin), and never-miss-twice (if you skip one day, make it your priority to get back
                on track the next).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 4 Laws Framework</p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <p>
                    <strong>To build a good habit:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>1. Make it obvious (design your environment so the cue is unmissable)</li>
                    <li>2. Make it attractive (pair it with something you enjoy)</li>
                    <li>3. Make it easy (reduce friction; start with 2 minutes or less)</li>
                    <li>4. Make it satisfying (track your streak; reward completion)</li>
                  </ul>
                  <p className="mt-3">
                    <strong>To break a bad habit (invert the laws):</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>1. Make it invisible (remove cues from your environment)</li>
                    <li>2. Make it unattractive (reframe the behaviour negatively)</li>
                    <li>3. Make it difficult (increase friction; add steps)</li>
                    <li>4. Make it unsatisfying (add an immediate cost to the behaviour)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Trade-Specific Applications</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Make it obvious:</strong> Keep a laminated pre-work checklist on the
                      van dashboard. You see it every morning before driving to the first job.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Make it attractive:</strong> Listen to an audiobook or podcast only
                      during your Friday admin session. The admin becomes the gateway to something
                      enjoyable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Make it easy:</strong> Pre-load the camera app shortcut on your phone
                      home screen. Taking a job photo requires one tap, not five.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Make it satisfying:</strong> Use a habit tracker app and aim for a
                      visual streak. The simple act of marking &ldquo;done&rdquo; provides immediate
                      satisfaction.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Identity-Based Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Identity-Based Habits &mdash; &ldquo;I Am Someone Who...&rdquo;
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Most people approach habit change from the outside in. They start with outcomes
                (&ldquo;I want to send quotes faster&rdquo;), then try to change their processes
                (&ldquo;I will write quotes in the van after each site visit&rdquo;). James Clear
                argues that lasting change works from the inside out, starting with{' '}
                <strong>identity</strong>. The most powerful question is not &ldquo;What do I want
                to achieve?&rdquo; but &ldquo;Who do I want to become?&rdquo; Every action you take
                is a vote for the type of person you wish to be. No single instance transforms your
                identity, but as the votes accumulate, the evidence builds, and your self-image
                shifts.
              </p>

              <p>
                Consider the difference between two electricians. Electrician A says: &ldquo;I want
                to get better at paperwork.&rdquo; This is an outcome-based goal. It depends on
                willpower, which fluctuates daily. On a Friday afternoon after a long week,
                willpower is low, and the paperwork does not get done. Electrician B says: &ldquo;I
                am someone who completes every certificate on the day of the job.&rdquo; This is an
                identity statement. It is not about wanting a result; it is about being a type of
                person. When Friday afternoon comes and the temptation to skip the paperwork arises,
                Electrician B has a different internal dialogue: &ldquo;This is what I do. I am
                someone who closes out every job properly.&rdquo; The identity provides the
                motivation that willpower cannot sustain.
              </p>

              <p>
                The practical mechanism is straightforward. First, decide the type of person you
                want to be. Second, prove it to yourself with small wins. You do not start with a
                grand transformation; you start with the smallest action that is consistent with the
                identity. &ldquo;I am someone who plans tomorrow&rdquo; starts with writing one task
                on a piece of paper. &ldquo;I am someone who keeps an organised van&rdquo; starts
                with tidying one shelf at the end of the day. Each small action is a vote. Over
                weeks and months, the votes accumulate, and the identity becomes self-reinforcing:
                you do it because it is who you are, not because you are forcing yourself.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Identity Statements for Tradespeople
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      &ldquo;I am someone who plans tomorrow before leaving site today&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>&ldquo;I am someone who photographs every completed job&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      &ldquo;I am someone who sends quotes within 24 hours of a site visit&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>&ldquo;I am someone who keeps the van stocked and organised&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      &ldquo;I am someone who completes every certificate on the day of the
                      job&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Habit Stacking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Habit Stacking &mdash; Linking New Habits to Existing Ones
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most practical techniques in behaviour science is{' '}
                <strong>habit stacking</strong>, a concept refined by BJ Fogg in{' '}
                <em>Tiny Habits</em> (2019) and popularised further by James Clear. The formula is
                simple: <strong>&ldquo;After I [current habit], I will [new habit].&rdquo;</strong>{' '}
                The existing habit acts as the cue for the new one. Because the existing habit
                already has strong neural pathways &mdash; you do it automatically, without thinking
                &mdash; the new behaviour piggybacks on that established pattern rather than
                requiring a brand new trigger from scratch.
              </p>

              <p>
                The key to effective habit stacking is choosing anchor habits that are 100% reliable
                and occur at natural transition points in your day. For tradespeople, the working
                day is full of excellent anchor points: starting the van in the morning, arriving at
                a job site, finishing a test, packing up tools, parking the van at home. These
                events happen every working day without fail, making them ideal triggers. The new
                habit you stack on top should initially be small &mdash; small enough that it takes
                under two minutes. You can expand it later once the trigger-response pattern is
                automatic.
              </p>

              <p>
                Habit stacking can be chained to create entire routines. &ldquo;After I start the
                van, I review today&rsquo;s schedule&rdquo; (30 seconds). &ldquo;After I review
                today&rsquo;s schedule, I confirm the first appointment&rdquo; (1 minute).
                &ldquo;After I confirm the first appointment, I check I have the right materials for
                the first job&rdquo; (2 minutes). Each link in the chain triggers the next. Over
                time, the entire sequence becomes a single automatic routine that takes under 5
                minutes and eliminates the most common morning time sinks: forgetting to confirm,
                arriving without the right materials, and spending the drive wondering what the day
                looks like.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Habit Stacking for Electricians
                </p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <p>
                    <strong>Morning stack:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>&ldquo;After I start the van, I review today&rsquo;s schedule&rdquo;</li>
                    <li>
                      &ldquo;After I review the schedule, I confirm the first appointment&rdquo;
                    </li>
                    <li>&ldquo;After I confirm, I check materials for the first job&rdquo;</li>
                  </ul>
                  <p className="mt-3">
                    <strong>End-of-job stack:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>&ldquo;After I finish each job, I photograph the completed work&rdquo;</li>
                    <li>&ldquo;After I photograph, I update the job file with notes&rdquo;</li>
                    <li>&ldquo;After I update the job file, I tidy the work area&rdquo;</li>
                  </ul>
                  <p className="mt-3">
                    <strong>End-of-day stack:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      &ldquo;After I park the van at home, I spend 10 minutes planning
                      tomorrow&rdquo;
                    </li>
                    <li>
                      &ldquo;After I plan tomorrow, I check material needs for the next day&rdquo;
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: How Long to Form a Habit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            How Long Does It Really Take? &mdash; The 66-Day Truth
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most persistent myths in self-improvement is that it takes 21 days to
                form a habit. This figure traces back to <strong>Maxwell Maltz</strong>, a plastic
                surgeon who noted in his 1960 book <em>Psycho-Cybernetics</em> that patients seemed
                to take a minimum of about 21 days to adjust to a new appearance (such as a nose job
                or an amputation). Over the decades, &ldquo;a minimum of 21 days&rdquo; was
                shortened and distorted in popular culture into &ldquo;it takes 21 days to form a
                habit&rdquo; &mdash; a claim Maltz never made and that research has consistently
                failed to support.
              </p>

              <p>
                The most rigorous study on habit formation was conducted by{' '}
                <strong>Phillippa Lally</strong> and colleagues at{' '}
                <strong>University College London</strong> in 2010. They recruited 96 participants
                who each chose a new health-related behaviour (such as eating a piece of fruit with
                lunch or doing 50 sit-ups after morning coffee) and tracked them over 84 days,
                measuring how automatic the behaviour felt. The results showed that the average time
                to reach automaticity was <strong>66 days</strong>, with an enormous range of{' '}
                <strong>18 to 254 days</strong>. Simple behaviours (drinking a glass of water)
                reached automaticity much faster than complex ones (running for 15 minutes).
                Crucially, missing a single day did not significantly derail the process &mdash;
                consistency mattered more than perfection.
              </p>

              <p>
                The practical takeaway for tradespeople is clear: give any new habit at least 2 to 3
                months before judging whether it has &ldquo;stuck.&rdquo; The first 2 to 3 weeks are
                the hardest because the behaviour still requires conscious effort and willpower. By
                week 4 or 5, most people notice it becoming easier. By week 8 to 10, it starts to
                feel automatic &mdash; like something you just do, not something you have to
                remember to do. If you give up after 3 weeks because &ldquo;it should be a habit by
                now,&rdquo; you are abandoning the process at exactly the point where the hard work
                is about to pay off.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Research: Habit Formation Timeline
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>21-day myth:</strong> Based on a misinterpretation of Maltz (1960). No
                      scientific evidence supports this as a general rule.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>66-day average:</strong> Lally et al. (2010), University College
                      London. Range of 18 to 254 days depending on complexity and individual.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Missing a day:</strong> Did not significantly affect long-term
                      automaticity. Consistency, not perfection, is what matters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Practical advice:</strong> Commit to at least 10 weeks. The behaviour
                      that feels forced in week 2 will feel automatic by week 10.
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
                This section has established the scientific foundation for understanding how habits
                form, why they persist, and how to engineer them deliberately. The key points to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habits are compound interest.</strong> Tiny daily improvements &mdash;
                    1% better each day &mdash; compound into extraordinary results over months and
                    years. Direction matters more than magnitude.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The habit loop has four stages:</strong> cue, craving, response, reward.
                    Each stage offers a lever for building or breaking habits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 4 Laws of Behaviour Change</strong> &mdash; make it obvious,
                    attractive, easy, and satisfying &mdash; provide a systematic framework for
                    engineering any habit. Invert them to break bad habits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Identity-based habits</strong> are more durable than outcome-based
                    goals. &ldquo;I am someone who...&rdquo; creates intrinsic motivation that
                    survives bad days and low willpower.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habit stacking</strong> links new behaviours to existing ones,
                    leveraging established neural pathways. The working day is full of natural
                    anchor points.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habit formation takes an average of 66 days</strong> (Lally et al.,
                    2010), not 21 days. Commit to at least 10 weeks and focus on consistency over
                    perfection.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">References:</strong> James Clear,{' '}
                  <em>Atomic Habits</em> (2018); Charles Duhigg, <em>The Power of Habit</em> (2012);
                  BJ Fogg, <em>Tiny Habits</em> (2019); Phillippa Lally et al., University College
                  London (2010).
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
            <Link to="../tmo-module-5-section-2">
              Next: Creating Routines That Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
