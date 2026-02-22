import { ArrowLeft, Puzzle, CheckCircle } from 'lucide-react';
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
    id: 'gs-5-1-check1',
    question:
      'According to the FranklinCovey 4 Disciplines of Execution (4DX), what is a &ldquo;Wildly Important Goal&rdquo; (WIG)?',
    options: [
      'A goal that is extremely ambitious and therefore unlikely to be achieved',
      'A single high-impact goal that receives focused effort, distinct from the &ldquo;whirlwind&rdquo; of day-to-day work',
      'A goal that requires at least one year to complete',
      'A goal that must be shared publicly to create accountability',
    ],
    correctIndex: 1,
    explanation:
      'In the 4DX framework, a Wildly Important Goal (WIG) is not about wild ambition but about focus. It is the ONE goal that will make the biggest difference, receiving concentrated effort separate from the &ldquo;whirlwind&rdquo; (urgent day-to-day demands). For electricians, this might be &ldquo;pass AM2 by June&rdquo; or &ldquo;acquire 3 new commercial clients by Q4&rdquo;. The WIG receives deliberate weekly time allocation, whereas the whirlwind (reactive jobs, admin, emergencies) consumes most available time. The discipline is in protecting WIG time from the whirlwind.',
  },
  {
    id: 'gs-5-1-check2',
    question:
      'Daniel Pink&rsquo;s &ldquo;Drive&rdquo; framework identifies three intrinsic motivators for sustained performance. Which of the following is NOT one of them?',
    options: [
      'Autonomy &mdash; the desire to direct your own work',
      'Mastery &mdash; the desire to improve at something that matters',
      'Purpose &mdash; the desire to serve something larger than yourself',
      'Reward &mdash; the desire to maximise external compensation',
    ],
    correctIndex: 3,
    explanation:
      'Pink&rsquo;s intrinsic motivation framework is built on Autonomy, Mastery, and Purpose. External rewards (money, bonuses, recognition) provide short-term motivation but do not sustain long-term engagement. For electricians, intrinsic motivation looks like: Autonomy = choosing your projects, clients, or learning path; Mastery = getting better at fault-finding, design, or a specialised area; Purpose = quality work that keeps people safe, building a legacy, or training the next generation. When your growth goals connect to all three, motivation becomes self-renewing rather than dependent on external validation.',
  },
  {
    id: 'gs-5-1-check3',
    question:
      'What is the &ldquo;minimum viable growth system&rdquo; recommended for electricians who are overwhelmed by trying to implement too many changes at once?',
    options: [
      'Five goals, five habits, and daily tracking across all areas of life',
      'One goal, one habit, one weekly review, and one accountability mechanism',
      'A complete personal mission statement, vision board, and annual plan',
      'Reading one personal development book per month and attending quarterly seminars',
    ],
    correctIndex: 1,
    explanation:
      'The minimum viable growth system strips away complexity and focuses on what actually works: ONE goal (your current priority, not five competing ambitions), ONE keystone habit that supports that goal (e.g., 30 minutes of AM2 practice every evening), ONE weekly review (10 minutes to check progress and plan the week ahead), and ONE accountability mechanism (a mate, online group, or even a calendar commitment). This system is sustainable because it does not create overwhelm. Once it becomes automatic, you can add more. Most electricians who try to overhaul their entire life simultaneously abandon the effort within weeks. Start small, build the system, then expand.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I&rsquo;ve tried goal-setting before and it never sticks. What makes this approach different?',
    answer:
      'Most goal-setting failures happen because the system is too complex, disconnected from daily work, or purely aspirational without a behaviour change mechanism. This approach integrates four building blocks: growth mindset (how you think about effort and failure), SMART goals with intrinsic motivation (what you aim for and why it matters to YOU), keystone habits (daily actions that make progress automatic), and tracking with accountability (the feedback loop that keeps you honest). The 4DX framework separates your growth goal from the whirlwind of daily work, protecting it from being crowded out. The 90-day planning cycle creates urgency without overwhelm. And the minimum viable system means you start with one goal, one habit, one review &mdash; sustainable from day one.',
  },
  {
    question:
      'How do I balance growth goals with the unpredictable demands of electrical work (call-outs, urgent jobs, seasonal fluctuations)?',
    answer:
      'This is the core challenge addressed by the 4DX &ldquo;whirlwind&rdquo; concept. The whirlwind is everything urgent: emergency call-outs, customer queries, invoicing, van maintenance, stock orders. It will always consume 80&ndash;90% of your time. The discipline is protecting 10&ndash;20% for your WIG (Wildly Important Goal). For most electricians, this means time-blocking: &ldquo;Every Tuesday and Thursday evening, 7&ndash;8pm, AM2 practice&rdquo; or &ldquo;Every Saturday morning, 9&ndash;11am, design study&rdquo;. During busy periods, the time shrinks but never disappears entirely &mdash; even 15 minutes holds the habit. During quiet periods, you expand it. The key is consistency of the slot, not perfection of the output. If you wait for a &ldquo;good time&rdquo; with no distractions, you will never start.',
  },
  {
    question:
      'Should I share my goals publicly or keep them private? I&rsquo;ve heard conflicting advice.',
    answer:
      'The research is nuanced. Sharing goals can create accountability and social support, but it can also create a false sense of achievement (the dopamine hit of announcing an intention feels like progress even when no action has been taken). The balanced approach: share your goal with one or two people who will hold you accountable (a trusted mate, a mentor, or an online study group), but avoid broadcasting it widely on social media. The ideal accountability partner is someone who will ask &ldquo;How did this week&rsquo;s practice go?&rdquo; rather than just &ldquo;liking&rdquo; your announcement. For electricians, peer accountability works well: find someone preparing for the same qualification or building a similar skillset, commit to weekly check-ins (even just a 5-minute call or WhatsApp voice note), and report progress honestly. The accountability should feel supportive, not judgmental.',
  },
  {
    question:
      'What if my &ldquo;why&rdquo; is just money? Is that shallow or is it a legitimate motivator?',
    answer:
      'Money is a legitimate and necessary motivator &mdash; we all have bills to pay and families to support. But research shows that purely extrinsic (money-focused) goals are less sustaining than goals with intrinsic meaning. The solution is not to pretend money does not matter but to dig one level deeper: WHY do you want more money? Financial security for your family? Freedom to choose your projects? Early retirement? Funding your kids&rsquo; education? Once you identify the deeper purpose behind the money goal, you unlock stronger motivation. For example, &ldquo;Increase my day rate by &pound;50&rdquo; is extrinsic. &ldquo;Increase my day rate by &pound;50 so I can work four days a week and spend Fridays with my kids&rdquo; connects to autonomy and purpose, which are far more motivating. The money is the mechanism, not the meaning.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'In the 4 Disciplines of Execution (4DX) framework, what is a &ldquo;lead measure&rdquo;?',
    options: [
      'The ultimate outcome you are trying to achieve (e.g., passing AM2)',
      'A predictive, influenceable action you can take NOW that drives the lag measure (e.g., hours of practice per week)',
      'A measurement taken by the lead electrician on a project',
      'The financial profit generated by a project',
    ],
    correctAnswer: 1,
    explanation:
      'Lead measures are the activities you control that predict success on the lag measure (the ultimate goal). For an electrician preparing for AM2, the lag measure is &ldquo;pass AM2&rdquo;. Lead measures might be &ldquo;practice 5 hours of conduit bending per week&rdquo; or &ldquo;complete 3 mock fault-finding scenarios per week&rdquo;. Lead measures are predictive (more practice = higher pass likelihood) and influenceable (you can decide to practice tonight). Lag measures (exam results, new clients acquired, revenue) are the outcome, which you cannot directly control. Focusing on lead measures creates a sense of control and daily progress, which sustains motivation far better than fixating on distant lag measures.',
  },
  {
    id: 2,
    question:
      'According to Stephen Covey&rsquo;s &ldquo;Big Rocks&rdquo; analogy, what is the correct order for scheduling your time?',
    options: [
      'Small tasks first (emails, admin), then medium tasks, then big priorities if time allows',
      'Big priorities first (important but not urgent), then fill remaining time with smaller tasks',
      'Urgent tasks first (whatever is on fire today), then important tasks if there is time left',
      'Work on whatever feels easiest or most enjoyable in the moment',
    ],
    correctAnswer: 1,
    explanation:
      'Covey&rsquo;s Big Rocks principle states that if you fill your day with small tasks (sand and pebbles), there is no room left for big priorities (rocks). But if you schedule the big rocks first &mdash; the high-impact, important-but-not-urgent activities like studying for a qualification, business development, strategic planning &mdash; the small tasks fit around them. For electricians, this means blocking time for your WIG (e.g., &ldquo;Tuesday evenings: AM2 practice&rdquo;) BEFORE filling your diary with reactive work. If you wait until you have &ldquo;finished everything else&rdquo;, the big rocks never happen because there is always more sand. The discipline is prioritising importance over urgency.',
  },
  {
    id: 3,
    question:
      'Daniel Pink argues that traditional &ldquo;if-then&rdquo; rewards (if you do X, then you get Y) are effective for:',
    options: [
      'All types of work, because everyone is motivated by external rewards',
      'Simple, algorithmic tasks with a clear path to completion, but they undermine intrinsic motivation for creative or complex work',
      'Creative work only, because creative people respond well to financial incentives',
      'Long-term goals but not short-term tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Pink&rsquo;s research (drawing on Deci, Ryan, and others) shows that &ldquo;if-then&rdquo; rewards work for straightforward, mechanical tasks (if you dig this trench, you get &pound;X) but actively harm performance on tasks requiring creativity, problem-solving, or intrinsic engagement. For example, offering a bonus for &ldquo;learning circuit design&rdquo; can reduce genuine interest and lead to surface-level learning focused on the reward rather than mastery. Electrical work contains both types: routine installation tasks respond fine to transactional motivation, but fault-finding, design, customer relationship-building, and career development require intrinsic motivation (autonomy, mastery, purpose). The implication for goal-setting is that your most meaningful growth goals should be connected to internal drivers, not just external rewards.',
  },
  {
    id: 4,
    question:
      'What is the primary reason the 90-day planning cycle is more effective than annual planning for most electricians?',
    options: [
      '90 days is long enough to make meaningful progress but short enough to maintain urgency and adapt to changing circumstances',
      '90 days aligns with the tax year and financial reporting cycles',
      'Most electrical qualifications take exactly 90 days to complete',
      'Research shows humans can only focus on a goal for a maximum of 90 days',
    ],
    correctAnswer: 0,
    explanation:
      '90 days (approximately one quarter) is the sweet spot for focused execution. It is long enough to achieve a meaningful milestone (complete a CPD course, finish an AM2 practice programme, acquire 3 new clients, implement a new system) but short enough that the deadline feels real and you can maintain focus. Annual goals often lack urgency until the final quarter, by which point they are abandoned. Monthly goals can feel rushed and do not allow for complex projects. 90 days also allows for quarterly adaptation: if a strategy is not working, you pivot in Q2 rather than wasting the entire year. For electricians whose work fluctuates seasonally, 90-day cycles allow you to set different priorities for different quarters (e.g., Q1 = study, Q2 = business growth, Q3 = summer lull recharge, Q4 = implementation).',
  },
  {
    id: 5,
    question: 'In Covey&rsquo;s framework, a personal mission statement is best described as:',
    options: [
      'A list of goals you want to achieve in the next 12 months',
      'A written declaration of your core values, principles, and what you want to stand for across all areas of life',
      'A business plan for your electrical contracting company',
      'A daily to-do list of tasks prioritised by importance',
    ],
    correctAnswer: 1,
    explanation:
      'A personal mission statement is a foundational document that defines who you are, what you stand for, and how you want to live across all roles (electrician, parent, partner, friend, citizen). It is not a goal list but a guiding philosophy. Example for an electrician: &ldquo;I am committed to delivering the highest standard of electrical work, treating every customer with respect and honesty, continuously developing my technical knowledge, and building a business that allows me to provide for my family while maintaining work-life balance.&rdquo; The mission statement becomes the filter for decision-making: does this opportunity/goal/action align with my mission? Covey argues that most people live reactively, driven by others&rsquo; demands. A mission statement creates proactive intentionality. For electricians, it provides clarity during difficult decisions (take the high-paying job with poor safety culture, or decline it based on your values?).',
  },
  {
    id: 6,
    question:
      'According to the 4DX &ldquo;Cadence of Accountability&rdquo;, how often should you review progress on your Wildly Important Goal?',
    options: [
      'Daily, first thing every morning',
      'Weekly, in a short structured review session',
      'Monthly, as part of a broader business review',
      'Only when you feel you are falling behind',
    ],
    correctAnswer: 1,
    explanation:
      'The 4DX Cadence of Accountability is a weekly rhythm (ideally the same day and time each week) where you review your scoreboard (lead and lag measures), assess what worked and what did not, and commit to specific actions for the coming week. For a solo electrician, this might be a 10-minute session every Sunday evening: &ldquo;Target: 5 hours AM2 practice. Actual: 3.5 hours. Why? Emergency call-out on Wednesday. Next week commitment: protect Tuesday and Thursday evenings, and add 1 hour Saturday morning to catch up.&rdquo; The weekly cadence is frequent enough to catch drift before it becomes a crisis but not so frequent that it creates admin burden. Monthly reviews are too infrequent (you lose 4 weeks before correcting course). Daily reviews can become performative rather than substantive. Weekly is the rhythm that maintains momentum.',
  },
  {
    id: 7,
    question:
      'What is a &ldquo;keystone habit&rdquo; in the context of a growth system for electricians?',
    options: [
      'The most difficult habit, which should be tackled first',
      'A small habit that creates a cascade of other positive behaviours and supports your primary goal',
      'A habit you only do once a month but has high impact',
      'A habit related to the Keystone electrical module of the apprenticeship',
    ],
    correctAnswer: 1,
    explanation:
      'A keystone habit (a concept from Charles Duhigg&rsquo;s &ldquo;The Power of Habit&rdquo;) is a single behaviour change that triggers a chain reaction of other improvements. For an electrician preparing for an assessment, the keystone habit might be &ldquo;lay out my practice rig every evening after dinner&rdquo;. This small action (2 minutes) removes the friction from starting practice, which increases the likelihood of actually practising, which builds competence and confidence, which reinforces identity as &ldquo;someone who is serious about this&rdquo;. Keystone habits work because they create momentum. Other examples: &ldquo;every morning, review today&rsquo;s plan before starting work&rdquo; (leads to better time management, fewer forgotten tasks, more intentional days) or &ldquo;every job, take one photo for the portfolio&rdquo; (builds a professional showcase over time).',
  },
  {
    id: 8,
    question:
      'Which of the following is the most common reason growth systems fail for tradespeople?',
    options: [
      'Lack of ambition or desire to improve',
      'The system is too complex, disconnected from daily work, or abandoned at the first obstacle (the whirlwind takes over)',
      'Electrical work is too demanding to allow time for personal development',
      'Goals are set too low and therefore not motivating',
    ],
    correctAnswer: 1,
    explanation:
      'The most common failure mode is not lack of desire but system failure. The electrician sets five goals across different life areas, downloads three habit-tracking apps, buys a stack of books, and feels motivated for a week. Then a busy job comes in, a van breaks down, a family commitment arises, and the system is abandoned because it requires too much willpower to maintain. The solution is a minimum viable system: one goal, one habit, one weekly review, one accountability check. This system survives the whirlwind because it requires minimal daily effort (the habit is small and linked to an existing routine) and minimal weekly overhead (10-minute review). Once this baseline system is automatic, you can add complexity. Start lean, build the infrastructure, then scale. The electricians who succeed long-term are not the most ambitious &mdash; they are the most consistent.',
  },
];

export default function GSModule5Section1() {
  useSEO({
    title: 'Pulling It All Together | Goal Setting & Growth Module 5.1',
    description:
      'Review the 4 building blocks, system thinking, 4DX for tradespeople, intrinsic motivation, and connecting to your deeper why.',
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
            <Link to="../gs-module-5">
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
            <Puzzle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pulling It All Together
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Review the 4 building blocks, how they work as a system, 4DX adapted for tradespeople,
            intrinsic motivation, and connecting to your deeper why
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Four building blocks:</strong> growth mindset, SMART goals, keystone habits,
                tracking with accountability
              </li>
              <li>
                <strong>4DX framework:</strong> Wildly Important Goal, lead measures, compelling
                scoreboard, cadence of accountability
              </li>
              <li>
                <strong>Intrinsic motivation:</strong> autonomy, mastery, purpose (Daniel Pink)
              </li>
              <li>
                <strong>Minimum viable system:</strong> one goal, one habit, one review, one
                accountability mechanism
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Systems beat goals:</strong> A good system delivers results even when
                motivation wanes
              </li>
              <li>
                <strong>Complexity kills:</strong> Most growth plans fail because they are too
                elaborate to sustain alongside trade work
              </li>
              <li>
                <strong>Whirlwind protection:</strong> Urgent work will always crowd out important
                work unless you actively protect it
              </li>
              <li>
                <strong>Intrinsic &gt; extrinsic:</strong> Long-term motivation comes from inside,
                not from external rewards
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain how the four building blocks (mindset, goals, habits, tracking) work together as a unified growth system',
              'Apply the 4 Disciplines of Execution framework to separate your growth goal from the whirlwind of daily trade work',
              'Identify lead measures and lag measures for a typical electrician growth goal and explain the difference',
              'Describe Daniel Pink&rsquo;s three intrinsic motivators and connect them to your own development goals',
              'Design a minimum viable growth system with one goal, one habit, one review, and one accountability mechanism',
              'Connect your professional goals to a deeper personal &ldquo;why&rdquo; using Covey&rsquo;s mission statement approach',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Four Building Blocks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Four Building Blocks of a Growth System
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Over the previous four modules, you have been introduced to four foundational
                components that, individually, each contribute to personal and professional
                development. But the real power emerges when they function together as an integrated
                system. These are the four building blocks:
              </p>

              <p>
                <strong>1. Growth Mindset</strong> &mdash; Your foundational belief system about
                ability, effort, and failure. A fixed mindset sees ability as innate and effort as a
                sign of inadequacy; a growth mindset sees ability as developable through deliberate
                practice and views failure as information. This is the psychological substrate upon
                which everything else rests. If you believe you &ldquo;can&rsquo;t learn
                design&rdquo; or &ldquo;aren&rsquo;t good with theory&rdquo;, you will not invest
                the effort required for improvement. Growth mindset says: not yet.
              </p>

              <p>
                <strong>2. SMART Goals with Intrinsic Motivation</strong> &mdash; A well-defined
                target (Specific, Measurable, Achievable, Relevant, Time-bound) that is connected to
                internal drivers rather than purely external rewards. The goal provides direction
                and a finish line. The intrinsic motivation (autonomy, mastery, purpose) provides
                the fuel to sustain effort when the initial enthusiasm fades. A goal without
                intrinsic meaning becomes a burden. A desire without a concrete goal becomes a
                daydream.
              </p>

              <p>
                <strong>3. Keystone Habits and Behaviour Design</strong> &mdash; Daily or weekly
                actions that make progress automatic rather than reliant on willpower. Goals tell
                you where you are going; habits are the vehicle. The keystone habit creates a
                cascade effect: one small behaviour triggers other positive changes. For example,
                the habit &ldquo;every evening after dinner, lay out tomorrow&rsquo;s practice
                rig&rdquo; removes friction, increases follow-through, builds identity as
                &ldquo;someone who does this&rdquo;, and creates visible momentum. Without habits,
                you rely on daily motivation, which is unreliable.
              </p>

              <p>
                <strong>4. Tracking, Feedback, and Accountability</strong> &mdash; The measurement
                and review mechanisms that create awareness, highlight drift, and reinforce
                commitment. Tracking (whether on a simple calendar, a spreadsheet, or a habit app)
                provides the scoreboard. Feedback loops (weekly reviews, progress photos, test
                scores) tell you whether your actions are working. Accountability (to a peer, a
                mentor, or even a public commitment) adds a layer of social reinforcement that
                increases follow-through.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why System Thinking Matters
                </p>
                <p className="text-base text-white leading-relaxed">
                  Most personal development advice focuses on isolated tactics: &ldquo;set a
                  goal&rdquo;, &ldquo;build a habit&rdquo;, &ldquo;track your progress&rdquo;. But
                  these tactics only work reliably when they are part of an integrated system. A
                  goal without the mindset to persist through setbacks becomes abandoned at the
                  first failure. A habit without tracking becomes invisible (you think you are doing
                  it more than you are). Tracking without accountability becomes performative (you
                  tick the box but do not engage with the data). The system approach says: all four
                  components, working together, create something far more powerful than any one
                  component alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: 4DX for Tradespeople */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 4 Disciplines of Execution (4DX) Adapted for Electricians
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 4 Disciplines of Execution (4DX), developed by Chris McChesney, Sean Covey, and
                Jim Huling at FranklinCovey, is a framework for achieving important goals in the
                face of the &ldquo;whirlwind&rdquo; &mdash; the relentless tide of urgent daily
                demands. For electricians, the whirlwind is everything that fills your working day:
                customer calls, quote requests, job scheduling, material orders, invoicing,
                unexpected faults, traffic, admin. The whirlwind is not bad &mdash; it is the engine
                of your business &mdash; but it is all-consuming. Without a deliberate
                counter-strategy, the whirlwind will crowd out anything that is important but not
                urgent, including your professional development.
              </p>

              <p>
                <strong>Discipline 1: Focus on the Wildly Important</strong> &mdash; Identify the
                ONE goal that will make the biggest difference and give it disproportionate focus.
                This is your Wildly Important Goal (WIG). Not five goals, not a balanced scorecard
                across every life area &mdash; one. For an apprentice, the WIG might be &ldquo;Pass
                AM2 by 30 June&rdquo;. For a self-employed spark, it might be &ldquo;Acquire 3 new
                commercial clients by end of Q2&rdquo;. For an experienced electrician, it might be
                &ldquo;Achieve IEng registration by December&rdquo;. The WIG receives protected
                time, deliberate effort, and weekly tracking. Everything else is either whirlwind
                (necessary but not strategic) or dropped.
              </p>

              <p>
                <strong>Discipline 2: Act on the Lead Measures</strong> &mdash; Identify the
                specific, controllable actions that predict success on the lag measure (the WIG
                outcome). The lag measure is the result you want (pass the exam, acquire the
                clients, achieve the registration). The lead measures are the inputs you can control
                (hours of practice, number of client meetings, CPD hours logged). Lead measures are
                predictive (more of X correlates with Y) and influenceable (you can decide to do
                more X today). For AM2 preparation, lead measures might be: &ldquo;5 hours of
                practical installation practice per week&rdquo; and &ldquo;complete 3 mock scenarios
                per week&rdquo;. You track these religiously because they are the activities that
                drive the outcome.
              </p>

              <p>
                <strong>Discipline 3: Keep a Compelling Scoreboard</strong> &mdash; Make your lead
                and lag measures visible and engaging. For a solo electrician, this does not require
                expensive software &mdash; a simple wall chart, a spreadsheet, or even a physical
                calendar with ticks works. The scoreboard must answer one question at a glance:
                &ldquo;Are we winning or losing?&rdquo; For example, a weekly scoreboard might show:
                Target practice hours = 5. Actual = 3.5. Status = behind. The visibility creates
                urgency. The act of updating it creates a moment of reflection. A compelling
                scoreboard is not buried in a notebook &mdash; it is in a place you see daily.
              </p>

              <p>
                <strong>Discipline 4: Create a Cadence of Accountability</strong> &mdash; Establish
                a regular rhythm (weekly is ideal) where you review the scoreboard, identify what
                worked and what did not, and commit to specific actions for the coming week. For a
                solo electrician, this might be a 10-minute session every Sunday evening. Sample
                structure: (1) Review last week&rsquo;s commitments &mdash; did I do them? (2)
                Review the scoreboard &mdash; are we on track? (3) Identify obstacles and adjust
                &mdash; what got in the way, and how do I protect the time next week? (4) Commit to
                next week&rsquo;s lead measures &mdash; what will I do, when, and how? This cadence
                transforms the goal from an abstract aspiration into a weekly operating rhythm.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  4DX Example: Apprentice Preparing for AM2
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>WIG (lag measure):</strong> Pass AM2 practical assessment by 30 June
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lead measure 1:</strong> 6 hours of hands-on installation practice per
                      week (conduit, trunking, wiring, testing)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Lead measure 2:</strong> Complete 2 timed fault-finding scenarios per
                      week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Scoreboard:</strong> Wall chart with weekly boxes for practice hours
                      and fault scenarios (tick when complete)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cadence:</strong> Every Sunday, 8pm, review the week and commit to
                      next week&rsquo;s schedule (Tuesday 6&ndash;8pm practice, Thursday 6&ndash;8pm
                      practice, Saturday 10am&ndash;12pm fault scenarios)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Intrinsic Motivation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Intrinsic Motivation &mdash; Autonomy, Mastery, Purpose
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In his book &ldquo;Drive: The Surprising Truth About What Motivates Us&rdquo;,
                Daniel Pink synthesises decades of research from Edward Deci, Richard Ryan, and
                others to argue that traditional &ldquo;carrot and stick&rdquo; motivation (external
                rewards and punishments) is effective for simple, algorithmic tasks but actively
                undermines performance on complex, creative work. For tasks requiring
                problem-solving, learning, and sustained engagement &mdash; which describes much of
                an electrician&rsquo;s professional development &mdash; intrinsic motivation is far
                more powerful. Pink identifies three intrinsic motivators:
              </p>

              <p>
                <strong>1. Autonomy</strong> &mdash; The desire to direct your own life and work. In
                the context of electrical work, autonomy might mean choosing which qualifications to
                pursue, which specialisms to develop, which clients to work with, or how to
                structure your working week. Even employed electricians have some autonomy (choosing
                to specialise in data cabling, to take on mentoring responsibilities, or to lead on
                H&amp;S compliance). Autonomy is motivating because it satisfies the human need for
                self-direction. When your growth goals are imposed externally (&ldquo;the company
                says I must get this ticket&rdquo;) without internal buy-in, motivation is fragile.
                When you choose your direction, even within constraints, engagement increases.
              </p>

              <p>
                <strong>2. Mastery</strong> &mdash; The desire to get better at something that
                matters. Mastery is the craftsperson&rsquo;s core driver. For electricians, this
                might be mastery of fault-finding, of circuit design, of conduit bending, of
                customer communication, of running a profitable business. Mastery is asymptotic
                &mdash; you never fully arrive, there is always another level. This is motivating
                because it provides an endless supply of challenge and growth. The opposite of
                mastery is stagnation: doing the same tasks at the same level year after year,
                feeling competent but not progressing. Pink argues that the pursuit of mastery
                requires a growth mindset (you must believe improvement is possible), deliberate
                practice (not just repetition), and patience (mastery is a horizon, not a
                destination).
              </p>

              <p>
                <strong>3. Purpose</strong> &mdash; The desire to contribute to something larger
                than yourself. For electricians, purpose might be: keeping people safe through
                quality work, training the next generation of apprentices, building a business that
                supports your family and provides good employment for others, contributing to the
                energy transition through renewable installations, or simply taking pride in work
                done to the highest standard. Purpose is the &ldquo;why&rdquo; beneath the
                &ldquo;what&rdquo;. External rewards (money, status) are necessary but not
                sufficient. Research shows that people who connect their work to a larger purpose
                report higher job satisfaction, lower burnout, and greater resilience in the face of
                setbacks.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Connecting Your Goals to Autonomy, Mastery, and Purpose
                </p>
                <p className="text-base text-white leading-relaxed">
                  When setting your next professional development goal, test it against Pink&rsquo;s
                  three drivers. Does this goal increase your autonomy (more control over your work,
                  your schedule, or your career direction)? Does it develop mastery in an area you
                  care about? Does it connect to a larger purpose beyond immediate financial gain?
                  If the answer to all three is yes, you have a goal with deep intrinsic motivation,
                  which will sustain you through the difficult middle period when initial enthusiasm
                  fades. If the answer to all three is no, the goal may still be necessary (e.g.,
                  mandatory CPD to maintain your registration) but expect to need external
                  accountability to maintain effort.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Common Failure Patterns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Common Failure Patterns &amp; How to Avoid Them
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding why growth systems fail is as important as understanding what makes
                them succeed. The following patterns appear repeatedly among electricians who
                struggle to sustain development efforts:
              </p>

              <p>
                <strong>Pattern 1: The Over-Ambitious Launch</strong> &mdash; Setting five goals
                across different life areas (career, fitness, finance, relationships, hobbies),
                downloading multiple habit-tracking apps, buying a stack of books, and committing to
                a complete lifestyle overhaul. This creates unsustainable cognitive load. Within two
                weeks, a busy job comes in, and the entire system collapses. The solution: start
                with ONE goal. Build the habit of the system (weekly review, tracking,
                accountability) with a single priority. Once that is automatic, add more.
              </p>

              <p>
                <strong>Pattern 2: The Whirlwind Takeover</strong> &mdash; Starting with good
                intentions but failing to protect time for the goal from the relentless demands of
                urgent work. The electrician genuinely intends to study in the evenings but gets a
                late call-out, or the weekend practice session is cancelled because a job overruns
                on Friday. This happens repeatedly until the goal is quietly abandoned. The
                solution: time-blocking with sacred boundaries. &ldquo;Tuesday and Thursday,
                7&ndash;8pm, non-negotiable&rdquo;. Treat it like a customer appointment. The
                whirlwind will always expand to fill available time unless you actively fence off
                protected time.
              </p>

              <p>
                <strong>Pattern 3: Outcome Fixation Without Process Discipline</strong> &mdash;
                Obsessing over the lag measure (&ldquo;I must pass this exam&rdquo;) without
                tracking or improving the lead measures (hours of study, quality of practice). This
                creates anxiety without agency. You feel the pressure of the goal but lack the daily
                actions that move you toward it. The solution: shift focus to lead measures. You
                cannot control whether you pass the exam (lag measure) but you can control whether
                you practise 5 hours this week (lead measure). Paradoxically, focusing on the
                process rather than the outcome often improves the outcome.
              </p>

              <p>
                <strong>Pattern 4: No Accountability, No Consequence</strong> &mdash; Setting a goal
                privately, with no external commitment and no one to report progress to. When life
                gets busy, the goal is quietly dropped with no consequence other than private
                disappointment. The solution: accountability to another person. This could be a mate
                preparing for the same qualification (weekly check-in call), an online study group,
                a mentor, or even a public commitment (&ldquo;I&rsquo;ve told my family I&rsquo;m
                doing this&rdquo;). The accountability does not need to be heavy-handed, but it must
                exist. Knowing someone will ask &ldquo;how did this week go?&rdquo; significantly
                increases follow-through.
              </p>

              <p>
                <strong>Pattern 5: Abandonment at the First Setback</strong> &mdash; Missing one
                week of practice and interpreting it as total failure (&ldquo;I&rsquo;ve
                failed&rdquo;), which triggers an all-or-nothing abandonment of the goal. This is a
                fixed mindset response: one slip is evidence of inability. The solution: build in
                resilience mechanisms. Expect setbacks. The rule: &ldquo;Never miss twice.&rdquo; If
                you miss your Tuesday practice session, protect Thursday at all costs. One miss is a
                blip. Two consecutive misses starts a pattern. Three means the system is broken and
                needs redesign.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Failure Recovery Protocol: What to Do When You Fall Off Track
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> Acknowledge the drift without self-judgment. &ldquo;I
                      have not practised for 10 days&rdquo; is a fact, not a character flaw.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Identify the obstacle. What caused the drift? Busy
                      period? Lack of clarity? System too complex? Obstacle too daunting?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Adjust the system, not the goal. If the evening slot
                      keeps getting disrupted, move to mornings. If 5 hours/week is unrealistic,
                      reduce to 3. The system should fit your life, not the other way around.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step 4:</strong> Restart with the smallest viable action. Do not wait
                      for Monday or the start of the month. Do one small session today. Momentum
                      restarts momentum.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step 5:</strong> Double down on accountability. If you drifted, your
                      accountability was insufficient. Add a check-in, make a public commitment, or
                      increase the visibility of your scoreboard.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Minimum Viable Growth System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Minimum Viable Growth System
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The concept of a &ldquo;minimum viable product&rdquo; from the startup world applies
                perfectly to personal development. Instead of building an elaborate, feature-rich
                growth system that requires significant time and willpower to maintain, build the
                smallest system that can produce results. Once that baseline is automatic, you can
                add complexity. For electricians balancing trade work with development goals, the
                minimum viable growth system has four components:
              </p>

              <p>
                <strong>1. One Goal</strong> &mdash; Your current Wildly Important Goal. Not five
                goals, not a balanced wheel-of-life approach &mdash; one. This is the single highest
                priority for your professional development over the next 90 days. Write it down in
                SMART format (Specific, Measurable, Achievable, Relevant, Time-bound). Examples:
                &ldquo;Pass 2396 Design exam by 30 September&rdquo;, &ldquo;Complete Inspection
                &amp; Testing course and achieve C&amp;G 2391-52 by December&rdquo;, &ldquo;Acquire
                5 new domestic clients by end of Q2&rdquo;.
              </p>

              <p>
                <strong>2. One Keystone Habit</strong> &mdash; A single daily or weekly behaviour
                that supports your goal and can be sustained even during busy periods. The habit
                should be small enough that you can do it on your worst day but meaningful enough to
                create progress. Examples: &ldquo;Every evening after dinner, 30 minutes of design
                calculations practice&rdquo;, &ldquo;Every Tuesday and Thursday, 7&ndash;8pm,
                inspection scenario practice&rdquo;, &ldquo;Every Monday morning, send 3 quote
                follow-ups to potential clients&rdquo;. The habit is linked to an existing routine
                (after dinner, Tuesday evening) to reduce friction.
              </p>

              <p>
                <strong>3. One Weekly Review</strong> &mdash; A 10-minute session, same time every
                week, where you review your scoreboard (did I do the habit this week? how many
                times? am I on track toward the goal?), identify obstacles, and commit to next
                week&rsquo;s actions. This is your Cadence of Accountability. Without the weekly
                review, you lose awareness and drift without realising it. The review does not need
                to be elaborate: a simple template works. &ldquo;Target: 5 practice sessions.
                Actual: 3. Obstacle: emergency job Wednesday. Next week: protect Tuesday/Thursday,
                add Saturday morning.&rdquo;
              </p>

              <p>
                <strong>4. One Accountability Mechanism</strong> &mdash; An external commitment that
                increases the cost of not following through. This could be: a weekly check-in with a
                mate who is also studying, posting weekly progress in an online group, a regular
                session with a mentor, or even a family commitment (&ldquo;I&rsquo;ve told my
                partner I&rsquo;m practising Tuesday and Thursday evenings&rdquo;). The
                accountability should feel supportive, not punitive. Its purpose is to make the goal
                slightly more public so that quietly abandoning it has a social cost.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why &ldquo;Minimum Viable&rdquo; is Powerful
                </p>
                <p className="text-base text-white leading-relaxed">
                  The minimum viable system succeeds because it survives contact with real life. It
                  does not require heroic willpower, perfect conditions, or total life overhaul. It
                  requires 30 minutes a day (or 3 hours a week) and 10 minutes on Sunday. This is
                  sustainable alongside a full-time trade job, family commitments, and the whirlwind
                  of daily demands. Once this system is embedded (usually takes 4&ndash;8 weeks to
                  feel automatic), you can add a second goal, a second habit, or more sophisticated
                  tracking. But start here. Lean, focused, sustainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Connecting to Your Why */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Connecting to Your Deeper &ldquo;Why&rdquo;
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goals rooted purely in external outcomes (&ldquo;I want to earn &pound;60k&rdquo;,
                &ldquo;I want the Approved Electrician card&rdquo;) are less sustaining than goals
                connected to deeper personal values and purpose. Stephen Covey, in &ldquo;The 7
                Habits of Highly Effective People&rdquo;, argues that the most effective individuals
                begin with the end in mind &mdash; they clarify their core values and vision for
                their life, then align their goals and daily actions with that vision. For
                electricians, this means asking not just &ldquo;What do I want to achieve?&rdquo;
                but &ldquo;Why does this matter to me? What kind of electrician, business owner,
                parent, and person do I want to be?&rdquo;
              </p>

              <p>
                Covey recommends writing a personal mission statement &mdash; a declaration of your
                principles, values, and what you want to stand for across all areas of life. This is
                not a business plan or a goal list but a philosophical foundation. A sample personal
                mission statement for an electrician might include commitments such as:
                &ldquo;Deliver the highest standard of electrical work, treating every installation
                as if it were in my own home. Continuously develop my technical knowledge and stay
                current with regulations and best practice. Build a business that provides financial
                security for my family while allowing time for the things that matter most. Treat
                customers, suppliers, and colleagues with honesty and respect. Contribute to the
                trade by mentoring apprentices and sharing knowledge with peers.&rdquo;
              </p>

              <p>
                Once you have clarity on your mission and values, your specific goals become
                expressions of that larger purpose. For example, the goal &ldquo;Achieve Approved
                Electrician status by passing AM2&rdquo; is not just about a card &mdash; it is
                about professional credibility, mastery of the craft, and being recognised as
                competent. The goal &ldquo;Grow my business revenue by 20%&rdquo; is not just about
                money &mdash; it is about providing security for your family, creating employment
                for others, or gaining the autonomy to choose your projects. The goal &ldquo;Learn
                circuit design&rdquo; is not just about qualifications &mdash; it is about
                intellectual challenge, career progression, or contributing higher-value work.
              </p>

              <p>
                Connecting your goals to your &ldquo;why&rdquo; has a practical motivational
                benefit. When the goal becomes difficult (and it will), the external reward
                (&ldquo;I&rsquo;ll earn more&rdquo;) may not be sufficient to sustain effort. But if
                the goal is tied to identity (&ldquo;This is the kind of electrician I am&rdquo;),
                values (&ldquo;I am committed to mastery&rdquo;), or purpose (&ldquo;This allows me
                to provide for my family&rdquo;), you access a deeper fuel source. Daniel
                Pink&rsquo;s research supports this: purpose-driven goals generate more resilience,
                higher satisfaction, and greater long-term persistence than purely transactional
                goals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reflection Exercise: Your Personal &ldquo;Why&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Take 10 minutes to answer the following questions. You do not need to write a
                  formal mission statement, but clarity on these questions will strengthen your
                  motivation for any development goal:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What kind of electrician do I want to be known as in 10 years&rsquo; time?
                      (technical expert, trusted adviser, business owner, mentor, generalist,
                      specialist?)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What aspects of electrical work give me the most satisfaction?
                      (problem-solving, precision, customer relationships, variety, autonomy,
                      technical challenge?)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What do I want my career to provide beyond money? (security, autonomy,
                      mastery, status, legacy, work-life balance, pride in craft?)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      If I could work on any type of electrical project without financial
                      constraint, what would I choose? (this reveals intrinsic interest)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      What would I regret NOT doing if I looked back at my career in 20 years&rsquo;
                      time? (this reveals hidden priorities)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has shown how the four building blocks (growth mindset, SMART goals,
                keystone habits, tracking with accountability) integrate into a unified system, and
                how the 4 Disciplines of Execution framework helps electricians protect their growth
                goals from the whirlwind of daily work. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Systems beat goals.</strong> A well-designed system produces results
                    even when motivation wanes. The system is: mindset + goals + habits + tracking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>4DX framework for electricians:</strong> Focus on one Wildly Important
                    Goal. Act on lead measures (controllable inputs). Keep a compelling scoreboard
                    (visible progress). Create a weekly cadence of accountability (review and
                    commit).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Intrinsic &gt; extrinsic.</strong> Long-term motivation comes from
                    autonomy (control), mastery (getting better), and purpose (serving something
                    larger). External rewards are necessary but not sufficient.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Start lean.</strong> The minimum viable growth system is: one goal, one
                    habit, one weekly review, one accountability mechanism. Build this first. Add
                    complexity later.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Connect to your why.</strong> Goals tied to personal values, identity,
                    and purpose are more resilient than goals focused purely on external outcomes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Failure is a system problem, not a character flaw.</strong> When you
                    drift, adjust the system (make it simpler, add accountability, protect the
                    time). Never miss twice.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, you will create
                  your first 90-day plan using a structured 5-step process, with worked examples for
                  apprentices, self-employed electricians, and experienced professionals pursuing
                  career progression.
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
            <Link to="../gs-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-5-section-2">
              Next: Creating Your 90-Day Plan
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
