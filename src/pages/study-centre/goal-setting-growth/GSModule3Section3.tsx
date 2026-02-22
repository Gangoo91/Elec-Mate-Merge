import { ArrowLeft, XCircle, CheckCircle } from 'lucide-react';
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
    id: 'gs-3-3-check1',
    question:
      'An electrician knows they should always test dead before working on a circuit, but they frequently skip this step on &ldquo;quick jobs&rdquo; because it saves a few minutes. According to James Clear&rsquo;s inversion of the 4 Laws of Behaviour Change, which strategy would be MOST effective for breaking this dangerous habit?',
    options: [
      'Telling themselves they will do better next time and relying on willpower',
      'Making it difficult &mdash; integrating the voltage tester into a formal lock-off kit so that proceeding without testing requires actively bypassing a physical system',
      'Writing a motivational note on their van dashboard about safety',
      'Watching a safety training video once a year during CPD',
    ],
    correctIndex: 1,
    explanation:
      'Clear&rsquo;s third law inverted says: make the bad habit difficult by increasing friction. If skipping the dead test means you have to actively override a physical system (such as a lock-off kit that requires test results before the lock is removed, or a voltage tester physically clipped to your isolation kit so you encounter it every single time), you are far less likely to skip it. This works because it moves the decision from the willpower level to the systems level. Willpower alone (option A) is unreliable because it depletes under stress and fatigue &mdash; exactly the conditions on a busy job site. A motivational note (option C) and an annual video (option D) are too weak and too infrequent to override a deeply embedded automatic behaviour. The most effective combined strategy would layer multiple inverted laws: make the bad habit difficult (integrate testing into the physical workflow), make it unattractive (read HSE fatality reports of electricians who died from not testing dead), and make it unsatisfying (implement a buddy system where your colleague witnesses and signs off on dead testing, creating social cost for skipping).',
  },
  {
    id: 'gs-3-3-check2',
    question:
      'Katherine Milkman&rsquo;s research on temptation bundling at the Wharton School suggests that pairing a task you need to do with something you enjoy increases adherence. Which of the following is the best example of temptation bundling for an electrician who avoids paperwork?',
    options: [
      'Only listening to your favourite podcast while completing paperwork and filing certificates',
      'Rewarding yourself with a takeaway after every job, regardless of whether you completed the admin',
      'Scrolling social media while waiting for a customer to answer the door',
      'Watching television in the evening after a long day on site as a general reward',
    ],
    correctIndex: 0,
    explanation:
      'Temptation bundling, developed by Katherine Milkman at the Wharton School, University of Pennsylvania, works by linking a behaviour you need to do (but tend to avoid) with a behaviour you want to do (but don&rsquo;t need). The critical constraint is that the enjoyable activity is ONLY available during the less enjoyable task, creating a genuine incentive. Option A is a textbook example: the electrician needs to do paperwork (filing certificates, invoicing) but dislikes it, and they enjoy listening to their favourite podcast. By making the rule that they can only listen to that specific podcast while doing admin, the admin becomes associated with pleasure rather than drudgery. Over time, the electrician starts looking forward to admin time because it means podcast time. Option B is not temptation bundling &mdash; it is a general reward that is disconnected from the specific behaviour and does not pair the activities simultaneously. Option C is procrastination, not bundling. Option D is simply relaxation, not a strategic pairing. The key distinction is simultaneity and exclusivity: the enjoyable activity happens at the same time as the required task and is not available at any other time.',
  },
  {
    id: 'gs-3-3-check3',
    question:
      'James Clear&rsquo;s &ldquo;never miss twice&rdquo; rule states that if you break a habit streak, the most important thing is to:',
    options: [
      'Start the entire habit-building process again from scratch with a new system',
      'Accept that you are not disciplined enough and lower your expectations permanently',
      'Get back on track immediately the next day &mdash; one missed day is an accident, two missed days is the start of a new (bad) habit',
      'Punish yourself severely so you remember not to miss again',
    ],
    correctIndex: 2,
    explanation:
      'The &ldquo;never miss twice&rdquo; rule is one of the most practical and psychologically sound principles in Atomic Habits. Clear argues that missing one day of a habit is inevitable &mdash; life intervenes, energy fluctuates, unexpected events occur. Missing one day has virtually no impact on your long-term progress. Phillippa Lally&rsquo;s research at University College London confirmed that a single missed day had no detectable effect on long-term habit automaticity. But missing two days in a row is dangerous because it begins to form a new pattern. The second miss makes the third easier, and before long you have abandoned the habit entirely. The rule is simple: if you miss once, your only job is to show up the next day, even in a reduced form. If you missed your evening study session, do just 10 minutes the next night. If you skipped your morning planning routine, do a shortened version tomorrow. The goal is to maintain the identity of someone who does this habit, not to achieve perfection. Option A is unnecessarily extreme and wastes the progress already made. Option B is a fixed mindset response that attributes the miss to a permanent character trait rather than a temporary circumstance. Option D relies on punishment, which research consistently shows is less effective than positive reinforcement for habit formation and can create anxiety-based avoidance of the habit itself.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I know my bad habits are harmful, but I just can&rsquo;t seem to stop. Is willpower the problem?',
    answer:
      'Almost certainly not. One of the most important insights from modern behavioural science is that willpower is a limited and unreliable resource. Roy Baumeister&rsquo;s research on ego depletion showed that self-control depletes throughout the day, particularly under stress, fatigue, and decision overload &mdash; all of which are common on a building site. If you are relying on willpower alone to break a bad habit, you are setting yourself up to fail. The far more effective approach is environmental design: change your surroundings so that the bad habit is harder to perform and the good habit is easier. If you want to stop reaching for energy drinks, don&rsquo;t keep them in the van &mdash; keep a refillable water bottle in the cup holder instead. If you want to stop scrolling social media during breaks, leave your phone in the van and bring a pocket-sized study book to site. If you want to stop procrastinating on invoices, use software that auto-generates invoices from your job log. The less you rely on willpower and the more you rely on systems, the more sustainable your behaviour change will be. Systems work when you are tired, stressed, and depleted. Willpower does not.',
  },
  {
    question: 'How long does it actually take to break a bad habit?',
    answer:
      'The popular claim that it takes 21 days to break a habit is a myth &mdash; it comes from a misinterpretation of Dr Maxwell Maltz&rsquo;s observations about patients adjusting to plastic surgery in the 1960s, not from rigorous behavioural research. The most cited academic study on habit formation, conducted by Phillippa Lally and colleagues at University College London (2009), found that on average it takes 66 days for a new behaviour to become automatic, with a range from 18 to 254 days depending on the person, the complexity of the behaviour, and the consistency of practice. Breaking a bad habit is generally harder than forming a new one because you are working against established neural pathways that have been reinforced over months or years. The honest answer is: it varies enormously and depends on the depth of the habit, the strength of the cues, and the quality of your replacement system. A simple habit like switching from sugar in your tea to no sugar might take a few weeks. A deeply entrenched habit like skipping PPE or procrastinating on paperwork might take several months of consistent effort and environmental redesign. The key is to focus on the system, not the timeline &mdash; if the system is good, the timeline takes care of itself.',
  },
  {
    question:
      'What if my bad habit is actually caused by my work environment and I can&rsquo;t change the environment?',
    answer:
      'This is a common and valid concern, particularly for employed electricians who do not control their work environment. If your bad habits are triggered by site culture (for example, a site where nobody wears PPE and you feel social pressure to conform, or a company that does not allocate time for admin), you face a genuine environmental challenge. In these cases, you have several options. First, focus on what you can control: your personal toolkit, your van setup, your morning routine, your break-time activities, your phone configuration. Second, use identity-based habit change: reframe your self-image so that the good behaviour is part of who you are, not just something you do. &ldquo;I am the kind of electrician who always tests dead&rdquo; is harder to override under social pressure than &ldquo;I should test dead.&rdquo; Third, find or create micro-environments within the larger environment: your van, your tool bag, your break area can all be designed to support good habits even if the wider site does not. Fourth, if the environment is genuinely unsafe and encouraging dangerous habits (such as pressure to skip isolation procedures or work on live circuits), this is a reportable safety concern under the Health and Safety at Work etc. Act 1974, and you have a legal right and duty to refuse unsafe work.',
  },
  {
    question:
      'I&rsquo;ve tried to break the same bad habit multiple times and always relapse. Should I just accept it?',
    answer:
      'No &mdash; and the fact that you have tried multiple times is actually evidence of resilience, not weakness. Research on behaviour change consistently shows that most people require multiple attempts before successfully breaking a deeply entrenched habit. The average smoker attempts to quit 30 times before succeeding permanently. Each &ldquo;failed&rdquo; attempt provides valuable information about your triggers, your environment, and which strategies do and do not work for you. The mistake most people make is trying the same approach each time and expecting a different result. If willpower-based cold turkey has failed three times, it will probably fail a fourth time. Instead, analyse your previous attempts with genuine curiosity: When did you relapse? What triggered it? What was different about the times you lasted longest? What need was the bad habit fulfilling that your replacement was not meeting? Use this information to redesign your approach. Try environmental changes (remove cues), substitution (replace the bad habit with a better one that meets the same need), accountability (tell someone about your commitment and set up regular check-ins), temptation bundling (pair the desired behaviour with something enjoyable), or the 20-second rule (reduce friction for the good habit, increase friction for the bad one). The goal is not to try harder &mdash; it is to try differently.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'James Clear describes four laws of behaviour change for building good habits. When inverted for breaking bad habits, the first law becomes:',
    options: [
      'Make it invisible &mdash; remove the cues that trigger the bad habit from your environment',
      'Make it painful &mdash; punish yourself every time you perform the bad habit',
      'Make it boring &mdash; repeat the bad habit until you no longer enjoy it',
      'Make it public &mdash; tell everyone about your bad habit so you feel ashamed',
    ],
    correctAnswer: 0,
    explanation:
      'The first law of behaviour change for building good habits is &ldquo;make it obvious&rdquo; &mdash; ensure the cues for the desired behaviour are visible and prominent in your environment. When inverted for breaking bad habits, this becomes &ldquo;make it invisible&rdquo; &mdash; remove or reduce the cues that trigger the unwanted behaviour. Every habit begins with a cue: a visual, auditory, emotional, or situational trigger that initiates the behaviour loop. If you want to stop scrolling social media during breaks, remove the app from your phone&rsquo;s home screen or leave your phone in the van. If you want to stop buying energy drinks, change your route so you don&rsquo;t pass the shop. If you want to stop snacking on biscuits in the van, don&rsquo;t keep biscuits in the van. The most powerful way to eliminate a bad habit is to eliminate the cue that triggers it. This requires far less willpower than seeing the cue and then trying to resist it.',
  },
  {
    id: 2,
    question:
      'Shawn Achor&rsquo;s &ldquo;20-second rule&rdquo; is based on the principle that reducing friction by just 20 seconds can make a behaviour significantly more likely. How would you apply this rule to break the habit of not filing electrical certificates promptly?',
    options: [
      'Set a 20-second timer and try to complete the certificate within that time',
      'Wait 20 seconds before deciding whether to file the certificate',
      'Make filing immediate and frictionless &mdash; use a digital template that auto-fills common fields, keep it open on your tablet, and complete it on site before leaving',
      'File certificates only on the 20th of each month to create a routine',
    ],
    correctAnswer: 2,
    explanation:
      'Shawn Achor&rsquo;s 20-second rule, described in The Happiness Advantage, states that if you can reduce the activation energy (the effort required to start) of a desired behaviour by as little as 20 seconds, you dramatically increase the likelihood of performing it. Conversely, if you increase the activation energy of an undesired behaviour by 20 seconds, you dramatically decrease its likelihood. For certificate filing, the problem is usually friction: finding the template, filling in repetitive information, locating customer details, remembering test results. By using a digital system with auto-fill, keeping the template open and ready, and completing certificates on site while the information is fresh, you reduce the activation energy to near zero. The 20-second rule is not about literal timing &mdash; it is about the principle that tiny reductions in effort produce disproportionately large changes in behaviour because humans default to the path of least resistance.',
  },
  {
    id: 3,
    question: 'The substitution strategy for breaking bad habits works because:',
    options: [
      'It eliminates the underlying need that the bad habit was fulfilling',
      'It replaces the bad habit with a better behaviour that fulfils the same underlying need, making the transition sustainable',
      'It uses punishment to associate the bad habit with negative consequences',
      'It requires complete abstinence from the behaviour, which strengthens willpower over time',
    ],
    correctAnswer: 1,
    explanation:
      'The substitution strategy is one of the most effective approaches to breaking bad habits because it recognises a fundamental truth about human behaviour: every habit exists because it serves a function. Bad habits persist because they meet a genuine need &mdash; stress relief, boredom reduction, social connection, energy, comfort, or distraction. Simply removing the bad habit without addressing the underlying need creates a vacuum that willpower alone cannot sustain. The substitution strategy fills that vacuum by providing an alternative behaviour that meets the same need in a healthier way. For example, if an electrician drinks energy drinks on site because they need an energy boost, simply removing energy drinks leaves the fatigue unaddressed. Substituting with a thermos of strong coffee, adequate breakfast, and a mid-morning snack addresses the same energy need through better means. If social media scrolling during breaks provides mental rest, substituting with a short podcast episode provides the same mental break without the addictive scroll cycle.',
  },
  {
    id: 4,
    question:
      'An electrician has developed a habit of procrastinating on quotes and follow-ups. They often think about doing them in the evening but end up watching television instead. According to environmental design principles, which intervention is most likely to succeed?',
    options: [
      'Setting a firm mental commitment to do quotes every evening at 7pm',
      'Asking their partner to remind them to do quotes every evening',
      'Creating a dedicated &ldquo;quotes station&rdquo; &mdash; laptop open, pricing book out, template loaded &mdash; in a specific location separate from the television, with the television unplugged or remote placed in another room',
      'Downloading a productivity app that sends motivational notifications',
    ],
    correctAnswer: 2,
    explanation:
      'Environmental design is the most powerful lever for behaviour change because it works regardless of motivation, willpower, or mood. Option C applies multiple principles simultaneously. First, it creates a dedicated space associated with the desired behaviour (quoting), which serves as a visual cue. Second, it reduces friction for the good habit by having all materials ready (laptop open, pricing book out, template loaded) &mdash; this is Shawn Achor&rsquo;s 20-second rule in action. Third, it increases friction for the competing bad habit (watching television) by making the television harder to access (unplugged, remote in another room). This combination of reducing friction for the desired behaviour and increasing friction for the competing behaviour is far more effective than mental commitments (option A), external reminders (option B), or digital tools (option D). The environment does the work, so willpower does not have to.',
  },
  {
    id: 5,
    question:
      'The resistance cycle describes why behaviour change feels difficult in the early stages. Which of the following best explains the concept of homeostasis in the context of habit breaking?',
    options: [
      'Homeostasis is the brain&rsquo;s reward system that makes bad habits feel pleasurable',
      'Homeostasis is a state of extreme motivation that drives people to change their behaviour quickly',
      'Homeostasis is the body and mind&rsquo;s tendency to maintain the current state &mdash; any change from the established norm triggers resistance, discomfort, and a pull back towards familiar patterns',
      'Homeostasis is a medical condition caused by excessive stress at work',
    ],
    correctAnswer: 2,
    explanation:
      'Homeostasis is a fundamental biological and psychological principle: systems (including the human body and mind) resist change and actively work to maintain their current equilibrium. This is why the first days and weeks of breaking a bad habit feel so uncomfortable &mdash; your system is literally fighting to return to its established patterns. When you stop drinking energy drinks, your body craves the sugar and caffeine it has adapted to. When you start filing paperwork immediately instead of procrastinating, your mind generates resistance because the new behaviour requires more conscious effort than the old automatic pattern. Understanding homeostasis is liberating because it normalises the discomfort of change: feeling resistance does not mean you are doing something wrong &mdash; it means you are doing something different. The discomfort is temporary. As new neural pathways strengthen through repetition (neuroplasticity), the new behaviour gradually becomes the new normal, and the resistance fades.',
  },
  {
    id: 6,
    question:
      'An apprentice electrician wants to break the habit of scrolling social media during tea breaks and replace it with studying for their AM2. Which combination of strategies would be most effective?',
    options: [
      'Willpower alone &mdash; simply decide to study instead of scrolling and stick to it',
      'Make it invisible (delete social media apps from phone) + make it easy (keep a pocket study guide in their site bag) + temptation bundling (only listen to favourite music while studying)',
      'Set a financial penalty for every time they are caught scrolling social media on site',
      'Ask their supervisor to confiscate their phone at the start of each shift',
    ],
    correctAnswer: 1,
    explanation:
      'Option B combines three evidence-based strategies that work together to create a powerful system for behaviour change. First, making the bad habit invisible (deleting social media apps) removes the cue that triggers scrolling &mdash; if the app is not on your phone, you cannot mindlessly open it. This is the first inverted law of behaviour change. Second, making the good habit easy (keeping study materials accessible in the site bag) reduces the friction for studying &mdash; the 20-second rule means that if the study guide is right there in your bag, you are far more likely to open it than if you have to go to the van to find it. Third, temptation bundling (pairing study with favourite music) makes the study session more enjoyable by linking it to an activity you already look forward to. This combination addresses the problem at the environmental level (removing cues, reducing friction) and the motivational level (making the desired behaviour more attractive), which is far more reliable than willpower alone.',
  },
  {
    id: 7,
    question:
      'An experienced electrician recognises that stress is triggering their bad habit of eating fast food on site every day. According to the substitution strategy, what should they do?',
    options: [
      'Simply stop eating fast food and eat nothing during the work day instead',
      'Identify that the underlying need is convenience and comfort during a stressful day, then find a substitute that meets the same needs &mdash; such as meal prepping on Sunday evening, keeping healthy snacks in the van, and filling a thermos with soup or coffee',
      'Use punishment by calculating the annual cost of fast food and putting that number on the van dashboard',
      'Ignore the stress and focus purely on changing the eating habit in isolation',
    ],
    correctAnswer: 1,
    explanation:
      'The substitution strategy requires understanding the function of the bad habit before attempting to replace it. Fast food on site typically serves multiple functions: it is convenient (no preparation required), it provides comfort (warm, tasty, satisfying), it is fast (minimal break time used), and it may serve a social function (going to the shop with colleagues). Simply removing the fast food without addressing these underlying needs will fail because the needs remain unmet. Option B works because it substitutes a healthier behaviour that meets the same needs: meal prepping provides convenience (food is ready to eat), healthy snacks provide comfort and energy, a thermos provides warmth. Critically, option B also addresses the stress trigger by acknowledging it and building the alternative around it &mdash; meal prep on a low-stress day (Sunday evening) ensures the healthy option is available when the high-stress work week makes willpower-based decisions unreliable.',
  },
  {
    id: 8,
    question:
      'Accountability research shows that sharing your commitment with someone else increases your likelihood of following through. Which type of accountability arrangement is most effective for breaking a bad habit?',
    options: [
      'Posting your commitment on social media where hundreds of people can see it',
      'Making a specific, measurable commitment to one trusted person who will check in with you regularly and with whom you have a genuine relationship',
      'Telling as many people as possible about your goal so that social pressure prevents you from failing',
      'Hiring a professional coach, regardless of whether you have a genuine relationship with them',
    ],
    correctAnswer: 1,
    explanation:
      'Research on accountability consistently shows that the quality of the accountability relationship matters far more than the quantity of people who know about your goal. In fact, some research (notably by Peter Gollwitzer at New York University) suggests that publicly announcing goals to a large audience can actually reduce follow-through because the social recognition of the announcement provides a premature sense of accomplishment. The most effective accountability arrangement involves one or two trusted individuals with whom you have a genuine relationship, making a specific and measurable commitment (not vague &ldquo;I&rsquo;m going to be healthier&rdquo; but concrete &ldquo;I will meal prep every Sunday and bring lunch to site five days a week&rdquo;), and regular check-ins (weekly is usually effective). For electricians, an accountability partner might be a colleague, a mate in the trade, a partner, or a study group member. The key is that you care about what this person thinks of you, and that they will actually follow up.',
  },
];

export default function GSModule3Section3() {
  useSEO({
    title: 'Breaking Bad Habits & Overcoming Resistance | Goal Setting & Growth Module 3.3',
    description:
      'James Clear&rsquo;s inversion of the 4 Laws of Behaviour Change, common bad habits in the electrical trade, temptation bundling, the 20-second rule, and strategies for overcoming resistance to change.',
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
            <XCircle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Breaking Bad Habits &amp; Overcoming Resistance
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            James Clear&rsquo;s inversion of the 4 Laws of Behaviour Change, common bad habits in
            the electrical trade, temptation bundling, the 20-second rule, and strategies for
            lasting change
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Invert the 4 Laws:</strong> Make bad habits invisible, unattractive,
                difficult, and unsatisfying
              </li>
              <li>
                <strong>Environment beats willpower:</strong> Redesign your surroundings to
                eliminate triggers and reduce friction
              </li>
              <li>
                <strong>Substitution:</strong> Replace the bad habit with a better one that fulfils
                the same underlying need
              </li>
              <li>
                <strong>Never miss twice:</strong> One slip is human &mdash; two in a row is the
                start of a new bad pattern
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Bad habits in the electrical trade can be fatal &mdash;
                skipping PPE and not testing dead cost lives every year
              </li>
              <li>
                <strong>Career:</strong> Procrastination on quotes and admin directly costs you
                money and professional reputation
              </li>
              <li>
                <strong>Health:</strong> Poor diet, energy drink dependence, and chronic stress
                shorten careers and lives
              </li>
              <li>
                <strong>Growth:</strong> Time wasted on social media scrolling is time not spent
                building skills and qualifications
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Apply James Clear&rsquo;s inverted 4 Laws of Behaviour Change to break specific bad habits',
              'Identify and analyse common bad habits in the electrical trade and their underlying triggers',
              'Explain the resistance cycle, homeostasis, and ego depletion and how they affect behaviour change',
              'Implement temptation bundling (Katherine Milkman) to make desired behaviours more attractive',
              'Apply the 20-second rule (Shawn Achor) to reduce friction for good habits and increase friction for bad ones',
              'Use the substitution strategy to replace bad habits with better alternatives that serve the same function',
              'Design environmental changes that eliminate habit cues and reduce reliance on willpower',
              'Apply the &ldquo;never miss twice&rdquo; rule to recover from habit relapses without abandoning the system',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Inversion — Breaking Bad Habits with the 4 Laws */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Inversion &mdash; Breaking Bad Habits with the 4 Laws
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Atomic Habits, James Clear presents the 4 Laws of Behaviour Change as a framework
                for building good habits: make it obvious, make it attractive, make it easy, and
                make it satisfying. But Clear also recognises that habit formation is only half the
                picture. For every good habit you want to build, there is usually a bad habit you
                need to break. And breaking bad habits requires the exact opposite approach &mdash;
                an inversion of each law.
              </p>

              <p>
                The inverted laws are: <strong>make it invisible</strong> (remove the cues),{' '}
                <strong>make it unattractive</strong> (reframe the reward),{' '}
                <strong>make it difficult</strong> (increase friction), and{' '}
                <strong>make it unsatisfying</strong> (add consequences). Together, these four
                inversions provide a systematic framework for dismantling unwanted behaviours at
                every stage of the habit loop. This is not about willpower or self-discipline
                &mdash; it is about intelligent system design that makes the bad behaviour
                progressively harder, less appealing, and less rewarding. Let us examine each law in
                detail, with specific applications to the electrical trade.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The 4 Inverted Laws of Behaviour Change
                </p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>1st Law (Inverted): Make It Invisible.</strong> Every habit starts
                      with a cue &mdash; a trigger that initiates the behaviour. To break a bad
                      habit, you must remove or reduce exposure to the cue. If you want to stop
                      scrolling social media on site, delete the apps from your phone or move them
                      off the home screen into a buried folder. If you want to stop buying energy
                      drinks, change your driving route so you don&rsquo;t pass the petrol station.
                      If you want to stop reaching for biscuits in the van, don&rsquo;t put biscuits
                      in the van. You cannot rely on willpower to resist a cue that is constantly in
                      front of you &mdash; you must make the cue invisible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>2nd Law (Inverted): Make It Unattractive.</strong> Bad habits persist
                      because we associate them with a reward &mdash; pleasure, relief, comfort,
                      belonging. To break a bad habit, you must reframe the reward so that the
                      behaviour loses its appeal. Instead of thinking &ldquo;I deserve a break,
                      I&rsquo;ll scroll my phone&rdquo;, reframe it as &ldquo;Scrolling my phone
                      makes me feel worse, not better &mdash; I always regret the wasted time
                      afterwards.&rdquo; Instead of thinking &ldquo;Skipping the test saves
                      time&rdquo;, reframe it as &ldquo;Skipping the test risks my life, my career,
                      and my family&rsquo;s future.&rdquo; Highlight the true costs. Make the hidden
                      consequences of the bad habit vivid and personal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>3rd Law (Inverted): Make It Difficult.</strong> The easier a behaviour
                      is to perform, the more likely you are to do it &mdash; this applies equally
                      to good and bad habits. To break a bad habit, increase the friction. If you
                      want to stop watching television in the evening instead of doing quotes,
                      unplug the television after each use and put the remote in another room. If
                      you want to stop buying takeaway food on the way home, leave your bank card at
                      home and bring only enough cash for emergencies. If you want to stop
                      procrastinating on paperwork, set up a commitment device: tell a colleague you
                      will send them the completed certificate by 5pm, creating an external deadline
                      and social cost for missing it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>4th Law (Inverted): Make It Unsatisfying.</strong> We repeat
                      behaviours that are rewarded and avoid behaviours that are punished. To break
                      a bad habit, attach an immediate negative consequence. This is the role of
                      accountability partners, habit contracts, and financial penalties. If you
                      commit to a mate that you will file every certificate within 24 hours and
                      agree to pay them &pound;20 for every missed deadline, the immediate cost of
                      procrastination becomes tangible. If you track your habit streaks visually (a
                      calendar on the van dashboard with crossed-off days), breaking the streak
                      becomes a visible loss that your brain wants to avoid.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The power of this framework is that it works at the system level, not the willpower
                level. You are not relying on self-discipline to overcome a bad habit &mdash; you
                are redesigning the environment, the associations, the friction, and the
                consequences so that the bad habit becomes harder, less attractive, and less
                rewarding. This is a fundamentally different approach from the traditional
                &ldquo;just try harder&rdquo; mentality that dominates much of the trades. The
                electrician who redesigns their van, their phone, their evening routine, and their
                accountability structures is not trying harder &mdash; they are trying smarter.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Common Bad Habits in the Electrical Trade */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Common Bad Habits in the Electrical Trade
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you can break a bad habit, you must first identify it clearly and understand
                the function it serves. The electrical trade has a number of particularly common and
                particularly damaging bad habits that affect safety, career progression, health, and
                income. Let us examine each one in detail, understanding not just what the habit is
                but why it persists and what strategies can break it.
              </p>

              <p>
                <strong>1. Skipping PPE (&ldquo;It&rsquo;ll only take a minute&rdquo;).</strong>{' '}
                This is one of the most dangerous bad habits in the electrical trade and one of the
                most common. The reasoning is always the same: the job is quick, the risk seems low,
                and putting on PPE takes time and effort. The habit persists because (a) the
                consequence of not wearing PPE is probabilistic, not certain &mdash; you get away
                with it most of the time, which reinforces the behaviour; (b) site culture often
                normalises not wearing PPE, creating social pressure to conform; and (c) PPE is
                genuinely uncomfortable, particularly in hot or cramped conditions. The inverted
                laws approach: make PPE non-negotiable by keeping it on your person at all times
                (make skipping it invisible as an option), reframe the reward (&ldquo;I&rsquo;m not
                saving time, I&rsquo;m gambling with my eyesight and my hands&rdquo;), make skipping
                difficult (pair PPE with your tools so that you physically cannot access your tools
                without first putting on your PPE), and make skipping unsatisfying (agree with a
                mate that if either of you is caught without PPE, you buy the other one lunch).
              </p>

              <p>
                <strong>2. Not testing dead before working.</strong> This is not just a bad habit
                &mdash; it is a direct violation of Regulation 14 of the Electricity at Work
                Regulations 1989 and the single most common cause of fatal electrical accidents in
                the UK. The habit persists because: experienced electricians develop a false sense
                of confidence (&ldquo;I isolated it at the board, it must be dead&rdquo;), time
                pressure on site makes it feel like an unnecessary step, and the consequence
                (electrocution) is rare enough that the brain discounts it. This is a textbook
                example of what sociologists call
                <strong> normalisation of deviance</strong> &mdash; the gradual process where
                behaviours that were initially recognised as unsafe become normalised through
                repeated use without immediate negative consequence. The first time you skip the
                test, you feel anxious. Nothing bad happens. By the tenth time, it feels normal.
                Then one day the circuit is live when you expected it to be dead. Breaking this
                habit requires all four inverted laws plus identity-level change: make the cue to
                skip invisible by integrating the voltage tester into your lock-off kit, make
                skipping unattractive by reading HSE fatality reports, make skipping difficult by
                adopting a formal lock-off/tag-out procedure, and make skipping unsatisfying by
                implementing a buddy system. Most importantly, shift your identity: &ldquo;I am the
                kind of electrician who always tests dead, no exceptions.&rdquo;
              </p>

              <p>
                <strong>
                  3. Poor admin: not filing certificates, late invoicing, messy paperwork.
                </strong>{' '}
                This is arguably the most financially damaging bad habit in the trade. Electricians
                who are brilliant on the tools but terrible at admin lose thousands of pounds per
                year through late invoicing (or not invoicing at all), unclaimed expenses, lost
                certificates that need to be redone, and missed tax deadlines that result in fines.
                The habit persists because admin is boring compared to practical work, there is no
                immediate consequence for putting it off, and many electricians entered the trade
                specifically because they did not want to do &ldquo;office work&rdquo;. Breaking the
                admin habit requires making it easy (digital templates, auto-fill, cloud-based
                systems that work on your phone), making procrastination difficult (set up automatic
                payment reminders, use invoicing software that sends follow-ups for you), making
                good admin attractive (temptation bundling &mdash; only listen to your favourite
                podcast while doing paperwork), and making poor admin unsatisfying (calculate
                exactly how much money you lost last year through late invoicing and stick that
                number on your office wall).
              </p>

              <p>
                <strong>4. Procrastinating on quotes and follow-ups.</strong> Every electrician
                knows the pattern: a potential customer calls, you agree to do a quote, and then you
                put it off for days or weeks because you are busy on site. By the time you send the
                quote, the customer has already found someone else. The financial cost is enormous
                &mdash; a single lost domestic rewire because of a late quote could cost you
                &pound;3,000&ndash;&pound;5,000 in revenue. The habit persists because quoting feels
                like unpaid work, site work always feels more urgent, and there is no immediate
                penalty for delay (the customer simply goes elsewhere quietly). Environmental design
                is the most effective solution: create a quoting system that reduces friction to
                near zero. Use a pricing template, keep a quoting app on your phone, do a rough
                quote on site while you are there (while the information is fresh), and set a rule
                that no quote leaves your desk more than 24 hours after the site visit.
              </p>

              <p>
                <strong>5. Social media scrolling during downtime instead of study.</strong> The
                average UK adult spends over 3 hours per day on their smartphone, with a significant
                portion of that on social media. For apprentices and electricians studying for
                qualifications (AM2, 2391, 2400, Level 3, HNC), this represents an enormous
                opportunity cost. The habit persists because social media platforms are engineered
                by teams of behavioural scientists to be maximally addictive &mdash; variable reward
                schedules, infinite scroll, social validation loops. You are not weak for finding it
                difficult to resist; you are fighting against billion-pound engineering. Breaking
                this habit requires making it invisible (delete apps, use website blockers during
                study hours, turn phone to greyscale mode which removes the visual dopamine
                triggers), making studying attractive (temptation bundling with music or a favourite
                drink), making scrolling difficult (log out after each use so you have to re-enter
                your password, use app timers), and making study satisfying (track your study
                streaks, reward milestones).
              </p>

              <p>
                <strong>6. Poor diet on site (energy drinks, fast food, no water).</strong> The
                physical demands of electrical work require good nutrition and hydration, yet the
                trade culture often normalises energy drinks for breakfast, fast food for lunch, and
                no water throughout the day. The consequences are cumulative: weight gain, fatigue,
                poor concentration (which is a safety risk), long-term health problems (type 2
                diabetes, cardiovascular disease), and shortened career span. The habit persists
                because healthy food requires preparation (friction), unhealthy food is immediately
                available and requires no effort, energy drinks provide an instant (if temporary)
                energy boost, and site culture reinforces the behaviour (&ldquo;everyone does
                it&rdquo;). Breaking this requires environmental redesign: meal prep on Sunday
                evening (reduce friction for healthy eating), don&rsquo;t carry cash for vending
                machines (increase friction for unhealthy eating), keep a large refillable water
                bottle in the van (make hydration easy), and substitute rather than eliminate (swap
                energy drinks for strong coffee in a thermos, swap fast food for pre-made sandwiches
                or wraps).
              </p>

              <p>
                <strong>7. Not keeping up with regulation changes.</strong> BS 7671 is amended
                regularly (Amendment 2 in 2022, Amendment 3 in 2024, Amendment 4 expected 2026), and
                electricians are required to maintain competence under the Electricity at Work
                Regulations. Yet many qualified electricians stop learning the moment they pass
                their last exam. The habit of not keeping up persists because regulation documents
                are dry and technical, CPD is not always enforced, and the consequences of ignorance
                are delayed (until an inspector finds non-compliant work or an accident occurs).
                Breaking this requires making regulation study easy (subscribe to email summaries,
                follow reputable trade accounts, attend short webinars), making ignorance
                unattractive (understand that non-compliance can result in prosecution under the
                Building Regulations and the CDM Regulations), and making learning satisfying (track
                your CPD hours, set annual learning goals, share knowledge with colleagues).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Hidden Cost of Bad Habits &mdash; A Calculation
                </p>
                <p className="text-base text-white leading-relaxed">
                  Consider an electrician who loses just one domestic rewire per year due to late
                  quoting (&pound;4,000), wastes &pound;5 per day on energy drinks and fast food
                  instead of packed lunches (&pound;1,300/year), and spends 90 minutes per day
                  scrolling social media instead of studying or doing admin (547 hours/year &mdash;
                  equivalent to 68 eight-hour working days). The combined annual cost in lost
                  revenue, wasted money, and lost productive time is staggering. Bad habits are not
                  free &mdash; they have a compound cost that grows every year. Over a 30-year
                  career, these &ldquo;small&rdquo; habits represent hundreds of thousands of pounds
                  in lost income and opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Resistance Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Resistance Cycle &mdash; Why Change Feels Hard
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you have ever tried to break a bad habit and felt an almost physical pull back
                towards the old behaviour, you have experienced the resistance cycle. Understanding
                why this happens is essential for managing it, because most people interpret the
                resistance as evidence that they are not strong enough or disciplined enough to
                change. In reality, the resistance is a normal, predictable, biological and
                psychological response to change that every human being experiences.
              </p>

              <p>
                <strong>Homeostasis</strong> is the body and mind&rsquo;s tendency to maintain a
                stable internal state. Your body regulates temperature, blood sugar, heart rate, and
                dozens of other parameters to keep them within a narrow range. Your mind does the
                same with behaviour: it defaults to established patterns because they are efficient,
                predictable, and require minimal cognitive effort. When you attempt to change a
                habit, you are disrupting the equilibrium. Your system resists. You feel
                uncomfortable, irritable, distracted, and strongly drawn back to the familiar
                behaviour. This is not weakness &mdash; it is homeostasis doing its job. The
                critical insight is that this discomfort is temporary. If you persist through the
                initial resistance, a new equilibrium forms around the new behaviour, and the
                resistance fades. The old habit gradually loses its pull as the new neural pathways
                strengthen and the old ones weaken through disuse.
              </p>

              <p>
                <strong>Ego depletion</strong> is a concept developed by psychologist Roy Baumeister
                that describes the phenomenon of willpower as a finite resource that depletes with
                use. Baumeister&rsquo;s research showed that people who exerted self-control on one
                task subsequently showed reduced self-control on a second, unrelated task &mdash; as
                though they had used up a limited supply. While the extent of ego depletion has been
                debated in recent literature (some replication studies have produced mixed results),
                the practical observation remains clear: willpower is less reliable after a long,
                stressful, or decision-heavy day. For electricians, this has direct implications.
                After a demanding day on site &mdash; dealing with difficult customers, solving
                unexpected problems, working in uncomfortable conditions, making safety-critical
                decisions &mdash; your self-control is at its lowest. This is exactly when bad
                habits are most likely to reassert themselves: the fast food on the way home, the
                skipped admin, the television instead of study, the extra drink in the evening. The
                solution is not to develop superhuman willpower but to design systems that do not
                require willpower, especially in the evening when your reserves are depleted.
              </p>

              <p>
                <strong>The resistance cycle has a predictable pattern.</strong> In the first few
                days of breaking a habit, resistance is moderate &mdash; you are motivated and the
                novelty of change provides energy. Around days 3 to 7, resistance peaks &mdash; the
                novelty has worn off, the discomfort of change is fully present, and your system is
                pushing hard to return to the old pattern. This is where most people quit. They
                interpret the peak resistance as evidence that the change is not working or that
                they are not capable of it, when in fact they are at the exact point where
                persistence matters most. If you can push through this peak resistance period (often
                called the &ldquo;valley of despair&rdquo; in behaviour change literature),
                resistance gradually decreases as the new behaviour becomes more automatic. By
                approximately 2 to 3 months (consistent with Phillippa Lally&rsquo;s 66-day average
                for habit automaticity), the new behaviour feels relatively normal and the old habit
                has lost much of its pull. Understanding this timeline helps you anticipate and
                prepare for the hardest period rather than being blindsided by it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Strategies for the Peak Resistance Period (Days 3&ndash;14)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lower the bar dramatically:</strong> During peak resistance, your only
                      job is to show up, not to perform perfectly. If you are building a study habit
                      and resistance is intense, open the book for 5 minutes. If you are building a
                      meal prep habit, prepare just one day&rsquo;s lunch, not a full week. Tiny
                      wins maintain the identity without overwhelming the system.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Expect the resistance:</strong> Knowing that days 3 to 7 will be the
                      hardest removes the surprise. Write yourself a note on day 1: &ldquo;On day 5
                      I will feel like quitting. This is normal. I will not quit.&rdquo; This is a
                      form of implementation intention &mdash; pre-planning your response to a
                      predictable challenge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Increase environmental support:</strong> Double down on removing cues
                      for the bad habit and adding cues for the good habit during this critical
                      period. This is the time to be most aggressive with environmental redesign.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use accountability:</strong> Check in with your accountability partner
                      daily during the first two weeks, not weekly. The social cost of missing is a
                      powerful counterweight to the internal pull of the old habit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Remind yourself it is temporary:</strong> The discomfort you feel is
                      your system adjusting to a new equilibrium. It will pass. Every day you
                      persist, the resistance weakens slightly as new neural pathways form and
                      strengthen.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Temptation Bundling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Temptation Bundling &mdash; Katherine Milkman&rsquo;s Research
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Temptation bundling is a strategy developed by Katherine Milkman, a professor at the
                Wharton School, University of Pennsylvania. The concept is elegant in its
                simplicity: pair a behaviour you need to do (but tend to avoid) with a behaviour you
                want to do (but don&rsquo;t need). The key constraint is that the enjoyable activity
                is only available during the less enjoyable task, creating a genuine incentive to
                perform the desired behaviour.
              </p>

              <p>
                Milkman&rsquo;s original research demonstrated this with exercise. Participants were
                given access to addictive audiobooks (page-turning thrillers they could not put
                down) but were only allowed to listen to them while at the gym. The result was a
                significant increase in gym attendance &mdash; participants were 51% more likely to
                exercise than those without the bundling arrangement. The desire to find out what
                happened next in the audiobook drove people to exercise more frequently. The
                audiobook was the &ldquo;temptation&rdquo;; the exercise was the
                &ldquo;bundle&rdquo;. By linking them, the unpleasant activity (exercise) became
                associated with pleasure (the audiobook), and the overall experience became
                something people looked forward to rather than dreaded.
              </p>

              <p>
                For electricians, temptation bundling has enormous practical potential because so
                many of the important-but-avoided tasks in the trade are relatively passive or
                monotonous, making them perfect candidates for pairing with enjoyable activities.
                Here are specific examples:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Paperwork + favourite podcast:</strong> Only listen to your favourite
                    podcast (or a specific audiobook, or a specific playlist) while doing
                    certificates, invoicing, or other admin. The rule must be absolute: you cannot
                    listen to it at any other time. This transforms admin from a dreaded chore into
                    podcast time. Over time, you may find yourself looking forward to doing your
                    paperwork.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Regulation study + favourite coffee shop:</strong> Only visit your
                    favourite coffee shop when you are studying regulations or preparing for an
                    exam. The environment, the good coffee, and the treat become associated with
                    study, making the activity more attractive and creating a positive ritual around
                    it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Tool maintenance + sport on the radio:</strong> Only listen to live
                    sport coverage (football, cricket, whatever you enjoy) while cleaning,
                    organising, and maintaining your tools and van. This turns a neglected chore
                    into an enjoyable routine that you actually anticipate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Quoting + favourite drink:</strong> Make yourself a really good cup of
                    tea or coffee (the fancy one you save for special occasions) and only drink it
                    while doing quotes. The ritual of making the drink becomes the cue, and the
                    taste becomes the reward associated with the quoting process.
                  </span>
                </li>
              </ul>

              <p>
                The beauty of temptation bundling is that it does not rely on willpower, guilt, or
                self-discipline. It works by restructuring your incentives so that the desired
                behaviour is genuinely more attractive. Over time, the association strengthens:
                admin stops feeling like punishment and starts feeling like podcast time. This is a
                fundamental shift in the emotional experience of the task, not just a cognitive
                trick. The brain learns to associate the previously avoided task with genuine
                pleasure.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Rules for Effective Temptation Bundling
                </p>
                <p className="text-base text-white leading-relaxed">
                  1. The temptation (enjoyable activity) must be genuinely appealing to you &mdash;
                  not something you are lukewarm about. It needs to pull you towards the task. 2.
                  The temptation must be exclusively available during the bundled task &mdash; if
                  you listen to the podcast at other times too, the incentive disappears entirely.
                  3. The two activities must be compatible (you cannot watch television while doing
                  cable calculations, but you can listen to an audiobook while doing them). 4. Start
                  with your most avoided task &mdash; that is where the incentive is most needed and
                  most effective.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The 20-Second Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The 20-Second Rule &mdash; Shawn Achor&rsquo;s Friction Principle
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Shawn Achor, a positive psychology researcher and author of The Happiness Advantage,
                identified a principle he calls the 20-second rule. The concept is based on a simple
                but powerful observation: human beings default to the path of least resistance. If a
                behaviour requires even a small amount of additional effort to initiate (as little
                as 20 seconds of setup time), the probability of performing that behaviour drops
                dramatically. Conversely, if you reduce the effort required to start a behaviour by
                just 20 seconds, you dramatically increase the probability of doing it.
              </p>

              <p>
                Achor demonstrated this personally by wanting to learn guitar. He kept the guitar in
                a cupboard, which meant it took about 20 seconds to retrieve it before he could
                start practising. Despite genuinely wanting to learn, he found himself defaulting to
                watching television (which required zero effort &mdash; the remote was on the coffee
                table) instead of practising guitar. His solution was to put the guitar on a stand
                in the middle of the living room (reducing friction to near zero) and take the
                batteries out of the television remote and put them in a drawer in another room
                (increasing friction by about 20 seconds). The result was immediate and dramatic: he
                started practising guitar regularly and watching television less, with no change in
                motivation or willpower &mdash; only a change in friction.
              </p>

              <p>
                For electricians, the 20-second rule has powerful applications for both breaking bad
                habits (increasing friction) and building good ones (reducing friction). Consider
                these examples:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Reduce friction for filing certificates:</strong> Use a digital template
                    on your tablet with auto-populated fields (customer name, address, installation
                    type). Keep the app open and ready. Complete the certificate on site, while you
                    are still there and the information is fresh. The difference between &ldquo;open
                    laptop, find template, type customer details, recall test results from
                    memory&rdquo; (high friction) and &ldquo;tap app, confirm auto-filled details,
                    enter test results from the instrument in your hand&rdquo; (low friction) is the
                    difference between doing it and putting it off for a week.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Increase friction for social media:</strong> Delete the apps from your
                    phone. If you must use social media, access it through the browser (slower, less
                    engaging, no push notifications). Log out after each session so you have to
                    re-enter your password every time. Turn off all notifications. Move the browser
                    icon off the home screen into a folder on the last page. Enable greyscale mode
                    during work hours to remove the colour-based dopamine triggers. Each friction
                    point makes mindless scrolling less likely.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Reduce friction for healthy eating:</strong> Meal prep on Sunday evening
                    and put labelled containers in the fridge. In the morning, all you have to do is
                    grab the container &mdash; zero friction. Compare this with the friction of
                    making lunch from scratch each morning (finding ingredients, preparing food,
                    packing it, cleaning up) and the appeal of the drive-through (zero friction, hot
                    food, instant gratification) becomes entirely understandable. You are not lazy
                    &mdash; you are human.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Reduce friction for study:</strong> Keep a pocket-sized study book or
                    flashcards in your site bag, not in the van. When you have a 10-minute break,
                    the study material is right there &mdash; no walk to the van, no searching for
                    the book, no decision about what to study. The difference between &ldquo;already
                    in my bag&rdquo; and &ldquo;in the van&rdquo; is enough to determine whether you
                    study or scroll.
                  </span>
                </li>
              </ul>

              <p>
                The 20-second rule works because it acknowledges a truth about human behaviour that
                most people resist: we are not rational decision-makers who carefully weigh costs
                and benefits before each action. We are creatures of path-of-least-resistance who
                default to whatever is easiest in the moment. By engineering your environment so
                that the easiest path is also the best path, you align your automatic behaviour with
                your long-term goals. This is not cheating &mdash; it is intelligent system design,
                and it is how every successful person and organisation manages behaviour at scale.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: The "Never Miss Twice" Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Dealing with Relapse &mdash; The &ldquo;Never Miss Twice&rdquo; Rule
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most psychologically destructive aspects of habit breaking is the
                all-or-nothing mentality: the belief that a single slip means total failure. This
                perfectionist thinking destroys more habits than lack of willpower, poor planning,
                or difficult circumstances combined. James Clear addresses this directly with what
                he calls the &ldquo;never miss twice&rdquo; rule. The principle is simple but
                profoundly important: missing one day of a habit is inevitable and virtually
                harmless. Missing two days in a row is dangerous because it starts to form a new
                pattern. Your only job after a slip is to get back on track immediately.
              </p>

              <p>
                This rule works because it redefines success. Instead of aiming for perfection
                (which is impossible and demoralising), you aim for resilience. You are not trying
                to never fail &mdash; you are trying to recover quickly. A perfect record is less
                important than a pattern of consistent recovery. Phillippa Lally&rsquo;s research at
                University College London supports this: her study on habit formation found that
                occasional misses had negligible impact on long-term habit strength, provided the
                overall pattern was maintained. What matters is the ratio of adherence to
                non-adherence over months, not whether every single day is perfect.
              </p>

              <p>
                For electricians, this reframe is particularly important because trade life is
                unpredictable. Some days you will finish a job at 7pm, exhausted, and the last thing
                you want to do is admin or study. Some weeks you will be on a high-pressure project
                with no time for anything except work and sleep. Emergency callouts, family
                commitments, illness &mdash; life will intervene. Missing a day of your habit during
                these periods is not failure &mdash; it is reality. The danger is not the miss
                itself but the story you tell yourself about the miss. If you think &ldquo;I missed
                yesterday, so I&rsquo;ve already failed, I might as well give up&rdquo;, one miss
                becomes permanent abandonment. If you think &ldquo;I missed yesterday, so today I
                need to show up even for just 5 minutes to maintain the pattern&rdquo;, one miss
                becomes an insignificant blip in a long-term trend of improvement.
              </p>

              <p>
                The &ldquo;never miss twice&rdquo; rule also protects against the
                <strong> &ldquo;what the hell&rdquo; effect</strong>, a well-documented
                psychological phenomenon where a single lapse triggers a binge of the bad behaviour.
                A dieter eats one biscuit and thinks &ldquo;I&rsquo;ve already ruined today, so I
                might as well eat the whole packet.&rdquo; An electrician misses one evening of
                study and thinks &ldquo;I&rsquo;ve broken my streak, what&rsquo;s the point of
                continuing.&rdquo; The rule short-circuits this thinking by establishing a clear,
                non-negotiable boundary: one miss is allowed, two is not. This gives you permission
                to be human while preventing the spiral into complete abandonment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How to Apply &ldquo;Never Miss Twice&rdquo; in Practice
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Day after a miss &mdash; reduce the bar:</strong> If you missed your
                      30-minute study session, do just 5 minutes the next day. The goal is to show
                      up, not to compensate. Showing up maintains the identity of &ldquo;someone who
                      studies&rdquo;.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>No guilt, no self-criticism:</strong> Guilt is counterproductive.
                      Research on self-compassion by Kristin Neff at the University of Texas shows
                      that people who treat themselves with compassion after a lapse recover faster
                      than those who beat themselves up. Self-criticism creates shame, which
                      triggers avoidance, which leads to more missed days.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Analyse, don&rsquo;t agonise:</strong> After a miss, briefly ask: what
                      caused it? Was it fatigue, stress, a specific trigger, or poor planning? Use
                      the information to adjust your system, then move on. This takes 2 minutes, not
                      2 hours of rumination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Track recovery, not perfection:</strong> Instead of counting
                      consecutive days, count how quickly you recovered from each miss. Getting
                      better at recovery is more valuable than getting better at streaks, because
                      recovery is the skill you will need most over a lifetime of habit maintenance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: The Substitution Strategy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            The Substitution Strategy
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common mistakes people make when trying to break a bad habit is
                attempting to simply eliminate it without replacing it. This creates a vacuum
                &mdash; a gap in your routine and a need that is no longer being met &mdash; which
                almost always gets filled by the old habit returning or by a new habit that is
                equally problematic. The substitution strategy avoids this by identifying the
                underlying need that the bad habit serves and deliberately replacing the habit with
                a healthier alternative that fulfils the same need.
              </p>

              <p>
                Every bad habit serves a function. If it did not, it would not persist. The function
                might be stress relief, boredom reduction, social connection, energy, comfort,
                distraction, a sense of control, or a reward after effort. To break the habit
                sustainably, you must first understand which need it is meeting and then find an
                alternative way to meet that need. This is why cold turkey rarely works for complex,
                deeply embedded habits &mdash; it removes the behaviour without addressing the
                cause, leaving the underlying need to reassert itself.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Bad Habits and Their Substitutions
                </p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Energy drinks on site</strong> (need: energy, alertness).
                      Substitution: strong coffee in a thermos, adequate breakfast with slow-release
                      carbohydrates (porridge, wholemeal toast), mid-morning snack (nuts, fruit,
                      protein bar). The need for energy is real and legitimate; the method of
                      meeting it can be changed without leaving the need unmet.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Social media scrolling during breaks</strong> (need: mental rest,
                      stimulation, social connection). Substitution: short podcast episode, a few
                      pages of a book or trade magazine, brief conversation with a colleague, or a
                      5-minute walk outside. The need for a mental break is legitimate; the medium
                      can be improved dramatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Procrastinating on quotes</strong> (need: avoidance of boring or
                      stressful tasks, preservation of mental energy). Substitution: create a
                      streamlined quoting system that reduces the boring parts (templates,
                      auto-fill, pricing databases), pair quoting with temptation bundling
                      (favourite podcast or music), and apply the 2-minute rule (just start the
                      quote for 2 minutes &mdash; starting is the hardest part, and momentum usually
                      carries you through).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fast food for lunch</strong> (need: convenience, comfort, warmth,
                      social norm). Substitution: Sunday meal prep with containers labelled by day,
                      a slow cooker meal started in the morning, or a simple reliable recipe you can
                      prepare in 10 minutes the night before. The need for convenient, tasty, warm
                      food is valid; the source can be redirected.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Watching television instead of studying</strong> (need: relaxation,
                      entertainment, mental switch-off after a hard day). Substitution: study first
                      for a fixed, short period (25&ndash;30 minutes), then watch television
                      guilt-free as the reward. Or use temptation bundling: only watch your
                      favourite programme while reviewing flashcards. The need for evening
                      relaxation is genuine and should not be eliminated entirely &mdash; that is
                      unsustainable.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The key principle of substitution is{' '}
                <strong>respect for the underlying need</strong>. You are not trying to become a
                machine that never rests, never seeks comfort, and never needs stimulation. You are
                trying to meet those very real human needs in ways that support your long-term goals
                rather than undermine them. This distinction &mdash; between eliminating the need
                (impossible and unhealthy) and redirecting the method (practical and sustainable)
                &mdash; is what separates effective behaviour change from the kind of white-knuckle
                discipline that always eventually collapses.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Accountability for Habit Breaking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Accountability for Habit Breaking
          </h2>
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accountability is one of the most powerful accelerators of behaviour change. When
                you make a commitment to yourself alone, the cost of breaking it is private and
                easily rationalised away (&ldquo;I&rsquo;ll start again tomorrow&rdquo;, &ldquo;it
                doesn&rsquo;t really matter&rdquo;). When you make the same commitment to another
                person, the cost of breaking it includes social consequences &mdash; letting someone
                down, being seen as unreliable, damaging a relationship you value. This social cost
                is a far stronger motivator than private guilt for most people.
              </p>

              <p>
                Research on accountability in behaviour change has identified several principles
                that determine whether accountability is effective or ineffective. First, the
                accountability partner must be someone whose opinion you genuinely care about. A
                stranger or a distant acquaintance has little motivational power. A close colleague,
                a trusted mate, a partner, or a respected mentor has significant influence because
                the social relationship creates genuine stakes. Second, the commitment must be
                specific and measurable. &ldquo;I will be healthier&rdquo; is too vague to hold
                anyone accountable. &ldquo;I will bring a packed lunch to site every day this week
                and send you a photo of it&rdquo; is specific, measurable, and verifiable. Third,
                there must be regular check-ins &mdash; not a single announcement followed by
                silence. Weekly check-ins are effective for most habits; daily check-ins are better
                during the critical first two weeks.
              </p>

              <p>
                A powerful form of accountability is the <strong>habit contract</strong> &mdash; a
                written agreement between you and your accountability partner that specifies the
                habit you are committing to, the time frame, and the consequences of not following
                through. The consequences should be real but not catastrophic: paying your mate
                &pound;10 for every missed day, doing an extra task for a colleague, donating to a
                cause you disagree with (this last option, called an &ldquo;anti-charity&rdquo;
                pledge, is particularly effective because it creates genuine aversion to missing).
                The physical act of writing and signing the contract increases commitment through
                what psychologists call the &ldquo;consistency principle&rdquo; &mdash; once we have
                publicly committed to something in writing, we feel a strong drive to act
                consistently with that commitment because our self-image is now tied to it.
              </p>

              <p>
                For electricians, accountability works well within existing social structures. You
                already work alongside colleagues, you have mates in the trade, you may have a study
                group or a training cohort. Use these relationships strategically. If you and a
                colleague both want to stop buying fast food on site, make a pact: both of you bring
                packed lunches every day for a month, and whoever breaks first buys the other one a
                round. If you want to file certificates within 24 hours of completing a job, tell
                your office manager or partner and ask them to check in weekly. The social dimension
                transforms a private struggle into a shared endeavour, which is both more effective
                and more enjoyable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Caution: The Gollwitzer Effect
                </p>
                <p className="text-base text-white leading-relaxed">
                  Peter Gollwitzer&rsquo;s research at New York University found that publicly
                  announcing your goals to a large, general audience (such as posting on social
                  media) can actually
                  <strong> reduce</strong> follow-through. This is because the social recognition
                  from the announcement provides a premature sense of accomplishment &mdash; your
                  brain registers the positive feedback from &ldquo;likes&rdquo; and comments as a
                  reward, reducing the drive to actually do the work. Effective accountability is
                  private and specific: one or two trusted people, concrete commitments, regular
                  check-ins. It is not a public performance for validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Environmental Redesign */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Environmental Redesign to Eliminate Triggers
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Of all the strategies for breaking bad habits, environmental redesign is the most
                powerful because it operates at the level of the system, not the individual. When
                you change your environment, you change the cues, the friction, and the default
                behaviours for everyone in that environment, including your future self who will be
                tired, stressed, and low on willpower. A well-designed environment makes good
                behaviour easy and bad behaviour hard, regardless of how motivated you are on any
                given day.
              </p>

              <p>
                The principle is rooted in a large body of research on{' '}
                <strong>choice architecture</strong>, popularised by Richard Thaler and Cass
                Sunstein in their book Nudge. The core insight is that human decisions are heavily
                influenced by how options are presented and how easy each option is to select.
                People do not make choices in a vacuum &mdash; they make choices within an
                environment, and the design of that environment predicts behaviour far more reliably
                than intentions, motivation, or character. A cafeteria that puts fruit at eye level
                and crisps on a low shelf sells more fruit and fewer crisps &mdash; not because the
                customers have changed, but because the environment has changed.
              </p>

              <p>
                For electricians, the key environments to redesign are: your van, your home
                workspace, your phone, and your daily routine. Each of these environments contains
                cues that either support or undermine your goals, and each can be modified with
                relatively little effort.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The van:</strong> Your van is where many bad habits play out during the
                    work day. Redesign it deliberately: remove energy drinks and junk food, replace
                    with a refillable water bottle and healthy snacks in a designated container.
                    Keep a pocket study guide in the door pocket. Keep your voltage tester clipped
                    to the outside of your tool bag (visible, accessible, impossible to ignore). Put
                    a small habit tracker on the dashboard. The van becomes a cue-rich environment
                    for good habits rather than bad ones.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The home workspace:</strong> If you do admin, quotes, or study at home,
                    create a dedicated space that is set up and ready to go at all times. Laptop
                    open, templates loaded, pricing book out, pen ready. The television should be in
                    a different room or at least not visible from the workspace. The phone should be
                    face down or in another room during work periods. This space should feel like a
                    workspace, not a living room with a laptop in it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The phone:</strong> Your phone is the most potent source of bad habit
                    cues in your life. Redesign it aggressively: home screen should contain only
                    tools you use for work and self-improvement (email, calendar, invoicing app,
                    study app, calculator). Social media apps should be deleted entirely or moved to
                    a folder on the last page. Notifications should be off for everything except
                    calls and messages from contacts. Enable greyscale mode during work hours
                    (removes the colour-based dopamine triggers that make apps visually addictive).
                    Set app timers for any remaining time-consuming apps.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>The daily routine:</strong> Structure your day so that
                    important-but-avoided tasks happen at predictable times when your energy and
                    willpower are highest (usually first thing in the morning or immediately after
                    arriving home, before you sit down). Once you sit on the sofa, the probability
                    of doing admin drops by an order of magnitude. Do the important thing first,
                    then relax. This sequencing costs nothing but changes everything.
                  </span>
                </li>
              </ul>

              <p>
                Environmental redesign is not a one-time activity. It requires ongoing attention and
                adjustment as new cues, new habits, and new challenges emerge. But the initial
                investment of time and thought pays enormous dividends because every improvement to
                your environment works automatically, every day, without any additional effort or
                willpower from you. You set it up once, and it works a thousand times.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: The Role of Stress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            The Role of Stress in Triggering Bad Habits
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stress is the number one trigger for bad habit relapse. When you are stressed, your
                brain prioritises short-term relief over long-term goals. This is not a character
                flaw &mdash; it is a neurological response. Under stress, the prefrontal cortex
                (responsible for long-term planning, impulse control, and rational decision-making)
                is suppressed, while the limbic system (responsible for emotion, survival, and
                immediate reward-seeking) takes over. This is why you reach for the energy drink,
                the junk food, the social media scroll, or the cigarette when you are stressed, even
                when you &ldquo;know better&rdquo;. In the moment of stress, you are not operating
                from your rational brain &mdash; you are operating from your survival brain, which
                wants immediate comfort at any cost.
              </p>

              <p>
                Electrical work is inherently stressful. You deal with dangerous energy sources,
                time pressure from clients and main contractors, physically demanding conditions,
                unpredictable problems, difficult customers, weather exposure, and the constant need
                to make safety-critical decisions. Add to this the business stress of running your
                own operation (cash flow, quoting, marketing, competition, tax deadlines), the study
                stress of ongoing qualifications, and the personal stress of maintaining
                relationships and health while working long hours, and you have a recipe for chronic
                stress that continuously triggers bad habits.
              </p>

              <p>
                The solution is not to eliminate stress (impossible in a trade career) but to
                develop healthier coping mechanisms so that stress does not automatically route you
                to destructive behaviours. This requires building alternative stress responses
                before you need them &mdash; in other words, preparing the substitution in advance
                so that when stress hits, there is already a better option available and rehearsed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Healthier Stress Responses for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Physical movement:</strong> Even a 5-minute walk between jobs or
                      during a tea break reduces cortisol (the stress hormone) and improves mood.
                      You do not need a gym &mdash; just move. Walk around the site, stretch in the
                      van, do a few press-ups behind the van. Physical activity is one of the most
                      effective immediate stress reducers available, and it is free.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Controlled breathing:</strong> The physiological sigh (a double inhale
                      through the nose followed by a long exhale through the mouth) has been shown
                      by Andrew Huberman at Stanford to reduce stress in real time within a single
                      breath cycle. It takes 30 seconds and can be done silently on site without
                      anyone noticing. Three to five cycles can shift your nervous system from
                      sympathetic (fight or flight) to parasympathetic (rest and digest).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Social connection:</strong> Talking to a colleague, a mate, or a
                      family member about stress is one of the most effective buffers against its
                      harmful effects. The trade culture often discourages vulnerability (&ldquo;man
                      up&rdquo;, &ldquo;get on with it&rdquo;), but research consistently shows that
                      social support is one of the strongest predictors of resilience under stress
                      and one of the strongest protectors against mental health problems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Adequate sleep:</strong> Sleep deprivation amplifies stress reactivity
                      and reduces impulse control. Electricians who start early and finish late
                      often sacrifice sleep, which then makes every bad habit harder to resist the
                      following day. Prioritising 7&ndash;8 hours of sleep is not a luxury &mdash;
                      it is a foundational habit that supports every other habit in your system.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Journalling or brain-dumping:</strong> Writing down your stressors for
                      5 minutes at the end of the day has been shown to reduce anxiety, improve
                      sleep quality, and provide clarity on problems. It does not need to be
                      literary or polished &mdash; a bullet list of &ldquo;what stressed me
                      today&rdquo; and &ldquo;what I will do about it tomorrow&rdquo; is enough to
                      externalise the stress and stop it from cycling endlessly in your head.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The critical principle here is <strong>pre-commitment</strong>. Decide in advance
                what you will do when stress hits, before the stress arrives. Write it down:
                &ldquo;When I feel stressed on site, I will take a 5-minute walk and do three
                physiological sighs, then return to the task.&rdquo; This pre-commitment creates an
                &ldquo;if-then&rdquo; plan (called an <strong>implementation intention</strong> in
                the research literature, pioneered by Peter Gollwitzer) that gives your brain a
                script to follow instead of defaulting to the old bad habit. Without a
                pre-commitment, your stressed brain will always choose the easiest, most familiar
                option &mdash; which is usually the bad habit it already knows and has practised
                thousands of times.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided a comprehensive framework for breaking bad habits and
                overcoming the resistance that makes change feel so difficult. The key principles to
                carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Invert the 4 Laws:</strong> Make bad habits invisible (remove cues),
                    unattractive (reframe the reward), difficult (increase friction), and
                    unsatisfying (add immediate consequences). This is systems design, not
                    willpower.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Common trade bad habits</strong> include skipping PPE, not testing dead,
                    poor admin, procrastinating on quotes, social media scrolling, poor diet, and
                    not keeping up with regulations. Each persists because it provides immediate
                    reward while consequences are delayed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Resistance is biological:</strong> Homeostasis and ego depletion explain
                    why change feels hard. The discomfort is temporary and peaks around days
                    3&ndash;7 before gradually decreasing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Temptation bundling</strong> (Katherine Milkman, Wharton) pairs tasks
                    you need to do with activities you enjoy, making the desired behaviour genuinely
                    attractive rather than relying on discipline.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 20-second rule</strong> (Shawn Achor) demonstrates that tiny changes
                    in friction produce large changes in behaviour because humans default to the
                    path of least resistance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Never miss twice:</strong> One slip is human and harmless. Two in a row
                    is the start of a new pattern. Recovery speed matters more than perfection.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Substitution:</strong> Replace bad habits with better alternatives that
                    serve the same underlying need. Eliminating the need is impossible; redirecting
                    it is sustainable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Accountability</strong> works best with one or two trusted people,
                    specific commitments, and regular check-ins &mdash; not public announcements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Environmental redesign</strong> is the most powerful lever because it
                    works automatically, without requiring willpower or motivation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Stress is the primary trigger</strong> for bad habit relapse. Pre-commit
                    to healthier coping strategies (movement, breathing, social connection, sleep)
                    before the stress arrives.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will explore
                  habit stacking and environment design in greater depth. You will learn how to
                  chain new habits onto existing routines, design your physical and digital
                  environments for maximum productivity, and create systems that make good behaviour
                  your default &mdash; not something you have to force.
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
            <Link to="../gs-module-3-section-4">
              Next: Habit Stacking &amp; Environment Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
