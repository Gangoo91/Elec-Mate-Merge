import { ArrowLeft, CalendarDays, CheckCircle } from 'lucide-react';
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
    id: 'gs-5-2-check1',
    question:
      'According to Peter Gollwitzer&rsquo;s research on implementation intentions, what is the most effective way to increase follow-through on a planned action?',
    options: [
      'Write the action down on a to-do list and hope you remember to do it',
      'Tell as many people as possible about the action to create social pressure',
      'Specify the exact when, where, and how using an &ldquo;if-then&rdquo; or &ldquo;when-then&rdquo; statement',
      'Visualise the outcome you want to achieve and use positive affirmations',
    ],
    correctIndex: 2,
    explanation:
      'Gollwitzer&rsquo;s research shows that implementation intentions &mdash; specific if-then or when-then statements &mdash; dramatically increase the likelihood of follow-through. For example, &ldquo;If it is Tuesday evening at 7pm, then I will practise conduit bending in the garage for 45 minutes&rdquo; is far more effective than the vague intention &ldquo;I will practise this week&rdquo;. The specificity removes decision-making in the moment (when willpower is low) and creates an automatic trigger. For electricians, this means: &ldquo;When I finish my last job on Thursday, then I will drive straight to the wholesaler to collect practice materials&rdquo; or &ldquo;If I sit down for lunch, then I will review one design calculation worked example&rdquo;.',
  },
  {
    id: 'gs-5-2-check2',
    question:
      'In a 90-day plan, what is the difference between a &ldquo;milestone&rdquo; and a &ldquo;daily habit&rdquo;?',
    options: [
      'There is no difference &mdash; they are the same thing',
      'A milestone is a specific outcome or checkpoint achieved at a point in time; a daily habit is a recurring action performed consistently',
      'A milestone is something you do every day; a daily habit is something you do once',
      'Milestones are for business goals; daily habits are for personal development goals',
    ],
    correctIndex: 1,
    explanation:
      'Milestones are interim checkpoints that mark progress toward the final outcome. For example, in a 90-day AM2 preparation plan, milestones might be: &ldquo;Week 4: Complete all conduit bending practice scenarios&rdquo;, &ldquo;Week 8: Pass mock fault-finding assessment&rdquo;, &ldquo;Week 12: Sit AM2 exam&rdquo;. Daily habits are the recurring behaviours that drive progress toward those milestones: &ldquo;Every evening, 30 minutes installation practice&rdquo;. Milestones provide structure and urgency (deadlines create focus). Habits provide the mechanism (consistent small actions compound into big results). A good 90-day plan has both.',
  },
  {
    id: 'gs-5-2-check3',
    question: 'Why is Sunday evening recommended as the ideal time for the weekly planning ritual?',
    options: [
      'Because Sunday is a religious day and therefore more meaningful',
      'Because it is the end of the weekend and allows you to mentally transition into the working week with clarity and intention',
      'Because research shows the brain is more creative on Sunday evenings',
      'Because HMRC requires tax planning to be done on Sundays',
    ],
    correctIndex: 1,
    explanation:
      'Sunday evening (or late Sunday afternoon) is psychologically optimal for weekly planning because it sits at the boundary between rest and work. You have had the weekend to recharge, you are not yet in the whirlwind of Monday morning, and you can approach the week proactively rather than reactively. The 10&ndash;15 minute planning session reviews last week (what went well, what did not, what got in the way), updates the scoreboard, and commits to next week&rsquo;s specific actions (when, where, how). Starting Monday with a clear plan reduces decision fatigue and increases the likelihood of protecting time for your WIG. For electricians whose weeks are unpredictable, this Sunday ritual provides the only consistent moment of strategic clarity.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if my work schedule is too unpredictable to commit to fixed time blocks?',
    answer:
      'Unpredictability is the norm in electrical work, not the exception. The solution is flexible time-blocking: instead of &ldquo;Tuesday 7pm, Thursday 7pm&rdquo; (which assumes you finish work at a predictable time), use contingency blocks. For example: &ldquo;Two practice sessions this week, each 45 minutes. If I finish work before 6pm, I do it that evening. If not, I do it Saturday morning or Sunday afternoon.&rdquo; The commitment is to the volume (two sessions) and minimum duration (45 minutes), not the exact slot. You review on Sunday and pre-commit to likely slots, but you allow flexibility within the week. The key discipline is: if you miss a planned session, you must reschedule it within the same week. This prevents drift while accommodating the whirlwind.',
  },
  {
    question:
      'How do I choose which goal to focus on when I have multiple areas that need development?',
    answer:
      'Use the 4DX principle: focus on the wildly important. Ask yourself: &ldquo;Which single goal, if achieved in the next 90 days, would have the biggest impact on my career or business?&rdquo; This might be passing a qualification that unlocks new work, acquiring new clients that increase revenue, or developing a skill that differentiates you from competitors. Everything else is either whirlwind (necessary daily work) or secondary (can wait until the next 90-day cycle). The power of a 90-day focus is that you are not abandoning other goals forever &mdash; you are deferring them for one quarter. In Q1, you focus on AM2 preparation. In Q2, you focus on business growth. In Q3, you focus on a new specialism. Trying to do all three simultaneously dilutes effort and reduces the likelihood of success on any of them.',
  },
  {
    question: 'Should I share my 90-day plan with anyone, or keep it private?',
    answer:
      'Share it with at least one person who will hold you accountable, but you do not need to broadcast it publicly. The ideal accountability partner is someone who understands your context (another electrician, a mentor, a business peer) and will ask direct questions: &ldquo;How is the AM2 prep going? Are you on track?&rdquo; This could be a weekly 5-minute call, a WhatsApp check-in, or a fortnightly coffee. The accountability should feel supportive, not judgmental. Avoid sharing your plan with people who will be sceptical, dismissive, or who will create pressure without support. Research shows that private commitment to an accountability partner is more effective than public announcement, which can create a false sense of achievement (the dopamine hit of announcing the plan feels like progress even when no action has been taken).',
  },
  {
    question: 'What if I reach the end of 90 days and I have not achieved the outcome I planned?',
    answer:
      'First, distinguish between outcome failure and process failure. If you committed to the lead measures (you did the practice hours, the study sessions, the client outreach) but did not achieve the lag measure (pass the exam, acquire the clients), this is valuable data. It tells you the goal was too ambitious for the timeframe, or the lead measures were insufficient. Adjust and run another 90-day cycle. If you did NOT commit to the lead measures (you missed most of your practice sessions, you did not do the weekly reviews), this is a system failure. The goal may have been fine, but the system (habit design, time protection, accountability) was not strong enough. Fix the system, not the goal. Either way, 90 days is short enough that &ldquo;failure&rdquo; is just one quarter &mdash; you course-correct in Q2. Annual goals trap you in failure for 12 months. Quarterly goals allow rapid iteration.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What are the five components of a structured 90-day plan?',
    options: [
      'Vision, mission, values, strategy, tactics',
      'Goal, deadline, budget, resources, team',
      'Theme, outcomes, milestones, weekly actions, daily habits',
      'Strengths, weaknesses, opportunities, threats, actions',
    ],
    correctAnswer: 2,
    explanation:
      'The five-step 90-day plan structure used in this course is: (1) Theme &mdash; a one-sentence focus for the quarter (e.g., &ldquo;AM2 Mastery Quarter&rdquo;), (2) Outcomes &mdash; specific measurable results you will achieve by day 90, (3) Milestones &mdash; interim checkpoints at 30, 60, and 90 days, (4) Weekly actions &mdash; recurring tasks that move you toward the milestones, (5) Daily habits &mdash; small consistent behaviours that compound. This structure provides clarity (theme), direction (outcomes), urgency (milestones), process discipline (weekly actions), and automaticity (daily habits). It is comprehensive but simple enough to fit on one page.',
  },
  {
    id: 2,
    question:
      'In the worked example of an apprentice preparing for AM2, what were the two lead measures identified?',
    options: [
      'Number of hours worked on site, and number of college assignments completed',
      'Hours of hands-on installation practice per week, and number of timed fault-finding scenarios completed per week',
      'Number of mock exams passed, and number of study books read',
      'Amount of money saved for the exam fee, and number of practice rigs purchased',
    ],
    correctAnswer: 1,
    explanation:
      'The lead measures for AM2 preparation were: (1) 6 hours of hands-on installation practice per week (conduit bending, trunking, wiring, terminations, testing), and (2) 2 timed fault-finding scenarios per week. These are predictive (more practice increases pass likelihood) and influenceable (the apprentice controls whether they practise). The lag measure (the outcome) is &ldquo;pass AM2&rdquo;, which cannot be directly controlled but is highly likely if the lead measures are consistently met. This distinction &mdash; focusing on controllable inputs rather than anxiously fixating on the outcome &mdash; is one of the most powerful aspects of the 4DX framework.',
  },
  {
    id: 3,
    question:
      'What is the purpose of &ldquo;obstacles planning&rdquo; in a 90-day plan, and when should it be done?',
    options: [
      'Obstacles planning is done after the 90 days to analyse what went wrong',
      'Obstacles planning is done at the start of the 90 days to pre-identify likely barriers and create contingency strategies before they derail progress',
      'Obstacles planning is only necessary for business goals, not personal development goals',
      'Obstacles planning is a weekly ritual where you list everything that went wrong that week',
    ],
    correctAnswer: 1,
    explanation:
      'Obstacles planning (also called &ldquo;pre-mortem&rdquo; or &ldquo;failure mode analysis&rdquo;) is done at the START of the 90-day cycle, not at the end. You ask: &ldquo;What are the most likely obstacles that will prevent me achieving this goal?&rdquo; For an electrician, common obstacles include: busy work periods crowding out study time, emergency call-outs disrupting the schedule, family commitments, van breakdown, seasonal lulls affecting income (and therefore ability to pay for courses), loss of motivation in the middle phase. For each obstacle, you create a contingency plan BEFORE it happens. Example: &ldquo;If I have a busy week and miss both practice sessions, I will do a single 90-minute session on Sunday morning to maintain momentum.&rdquo; This pre-planning dramatically increases resilience.',
  },
  {
    id: 4,
    question:
      'In Covey&rsquo;s &ldquo;Big Rocks&rdquo; analogy, what does the &ldquo;sand&rdquo; represent?',
    options: [
      'The most important strategic priorities that should be scheduled first',
      'Small, low-value tasks (emails, minor admin, interruptions) that fill time if you let them',
      'Beach holidays and rest periods',
      'Financial savings that accumulate over time',
    ],
    correctAnswer: 1,
    explanation:
      'In Covey&rsquo;s metaphor, the jar represents your available time. Big rocks are your most important priorities (the WIG, strategic work, health, relationships). Pebbles are moderately important tasks. Sand is the low-value filler (checking emails, scrolling social media, minor admin, reactive interruptions). If you fill the jar with sand first, there is no room for the big rocks. But if you place the big rocks first, the sand fits around them. For electricians, this means: time-block your WIG sessions FIRST (Tuesday 7&ndash;8pm, Thursday 7&ndash;8pm), then fit reactive work, admin, and low-priority tasks around them. If you wait until you have &ldquo;finished everything else&rdquo; before working on your development goal, you will never start, because there is always more sand.',
  },
  {
    id: 5,
    question:
      'What is the recommended structure for the weekly planning ritual at the end of each week?',
    options: [
      'Spend 2 hours creating a detailed minute-by-minute schedule for every day of the coming week',
      'A 10&ndash;15 minute session reviewing last week (what worked, what did not, scoreboard update) and committing to next week&rsquo;s specific actions (when, where, how)',
      'Write a journal entry about your feelings and emotions related to the goal',
      'Only review progress if you are behind on your target',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly planning ritual is deliberately short (10&ndash;15 minutes) to ensure it is sustainable. The structure is: (1) Review last week&rsquo;s commitments &mdash; did you do them? If not, why not? (2) Update the scoreboard &mdash; record your lead measure data (hours practised, sessions completed). Are you on track? (3) Identify obstacles and adjust &mdash; what got in the way? How will you protect time next week? (4) Commit to specific actions using implementation intentions &mdash; &ldquo;On Tuesday at 7pm, I will practise conduit bending in the garage for 45 minutes.&rdquo; This is your Cadence of Accountability. It transforms the goal from an abstract aspiration into a weekly operating rhythm. The ritual should feel energising, not burdensome.',
  },
  {
    id: 6,
    question:
      'In the worked example for a self-employed electrician aiming to grow their business, what was identified as the keystone habit?',
    options: [
      'Send 5 cold emails to potential clients every day',
      'Every Monday morning, before starting jobs, spend 30 minutes on client relationship and business development tasks',
      'Attend one networking event per month',
      'Post daily updates on social media to attract new customers',
    ],
    correctAnswer: 1,
    explanation:
      'The keystone habit was: &ldquo;Every Monday morning, 8&ndash;8:30am, before starting jobs: review current quotes, follow up 3 prospects, update CRM.&rdquo; This habit is small (30 minutes), linked to an existing routine (Monday morning), and creates a cascade effect. The consistent weekly focus on client relationships prevents the common failure mode where self-employed electricians get busy with current work and neglect pipeline development, leading to feast-famine cycles. The Monday slot works because it is the start of the week (high mental energy, proactive rather than reactive), and the time-boxing (30 minutes) prevents the task expanding to consume the entire morning. This is a classic keystone habit: small, strategic, and triggering multiple positive downstream effects.',
  },
  {
    id: 7,
    question:
      'Why is the 90-day timeframe considered optimal for tradespeople, compared to annual or monthly planning cycles?',
    options: [
      'Because the tax year is divided into 90-day quarters',
      'Because 90 days is long enough to achieve meaningful progress but short enough to maintain urgency and adapt to changing circumstances',
      'Because most qualifications take exactly 90 days to complete',
      'Because research shows human attention span peaks at 90 days',
    ],
    correctAnswer: 1,
    explanation:
      '90 days (one quarter) is the sweet spot for focused execution. It is long enough to complete a significant project (a CPD course, an AM2 preparation programme, a client acquisition campaign, a new system implementation) but short enough that the deadline feels real and maintains urgency. Annual goals often lack urgency until Q4, by which point they are rushed or abandoned. Monthly goals feel too short for complex projects and create pressure without allowing time for compounding. 90 days also allows for quarterly adaptation: if a strategy is not working in Q1, you pivot in Q2 rather than wasting the full year. For electricians whose work is seasonal or project-based, 90-day cycles allow different priorities each quarter (Q1 = study during quiet period, Q2 = business growth, Q3 = operational improvements, Q4 = financial review and tax planning).',
  },
  {
    id: 8,
    question:
      'What is an &ldquo;implementation intention&rdquo;, and why is it more effective than a general goal statement?',
    options: [
      'An implementation intention is a detailed business plan with financial projections',
      'An implementation intention is a specific if-then or when-then statement that pre-commits you to an action in a particular context, removing the need for in-the-moment willpower',
      'An implementation intention is a motivational affirmation you repeat daily',
      'An implementation intention is the same as a SMART goal',
    ],
    correctAnswer: 1,
    explanation:
      'Implementation intentions, researched extensively by Peter Gollwitzer, are if-then or when-then statements that specify exactly when, where, and how you will act. Example: &ldquo;If it is Tuesday evening at 7pm, then I will go to the garage and practise conduit bending for 45 minutes.&rdquo; This is far more effective than the vague intention &ldquo;I will practise conduit bending this week&rdquo; because it removes decision-making in the moment. When Tuesday 7pm arrives, you do not need to muster willpower or make a fresh decision &mdash; the action is pre-loaded. The specificity also creates an automatic trigger (the context cues the behaviour). For electricians, this means: &ldquo;When I finish my last job on Thursday, then I will drive directly to the college to attend the evening class&rdquo; (not &ldquo;I will try to attend classes this term&rdquo;).',
  },
];

export default function GSModule5Section2() {
  useSEO({
    title: 'Creating Your 90-Day Plan | Goal Setting & Growth Module 5.2',
    description:
      'Why 90 days is ideal, 5-step plan structure, worked examples for apprentices and experienced electricians, weekly planning ritual, and obstacles planning.',
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
            <CalendarDays className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Creating Your 90-Day Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why 90 days is ideal, 5-step plan structure, worked examples for apprentices and
            experienced electricians, weekly planning ritual, and obstacles planning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>90-day sweet spot:</strong> long enough for meaningful progress, short
                enough to maintain urgency
              </li>
              <li>
                <strong>5-step structure:</strong> theme, outcomes, milestones, weekly actions,
                daily habits
              </li>
              <li>
                <strong>Weekly ritual:</strong> 10&ndash;15 minutes every Sunday to review, adjust,
                and commit
              </li>
              <li>
                <strong>Pre-plan obstacles:</strong> identify likely barriers before they derail you
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Urgency without overwhelm:</strong> 90 days feels real, annual goals feel
                distant
              </li>
              <li>
                <strong>Rapid iteration:</strong> if something is not working, you course-correct in
                weeks, not months
              </li>
              <li>
                <strong>Fits trade work:</strong> quarterly cycles allow different priorities for
                different seasons
              </li>
              <li>
                <strong>Concrete over abstract:</strong> specific milestones and actions remove
                ambiguity
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain why 90-day planning cycles are more effective than annual or monthly cycles for electricians',
              'Apply the 5-step structure (theme, outcomes, milestones, weekly actions, daily habits) to create a 90-day plan',
              'Identify appropriate lead measures and lag measures for common electrician development goals',
              'Design implementation intentions using when-then statements to increase follow-through',
              'Conduct a weekly planning ritual to review progress and commit to next week&rsquo;s actions',
              'Pre-identify obstacles and create contingency strategies before they derail your plan',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why 90 Days */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why 90 Days is the Ideal Planning Horizon
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 90-day planning cycle (one quarter) has become the standard in high-performance
                business environments because it balances ambition with realism. For electricians,
                this timeframe is particularly well-suited to the realities of trade work:
              </p>

              <p>
                <strong>Long enough to achieve meaningful progress.</strong> 90 days allows you to
                complete a substantial project: finish a CPD course and sit the exam, prepare for
                and pass AM2, acquire 3&ndash;5 new clients, implement a new business system, or
                build a new technical skill to a functional level. Monthly goals feel rushed and do
                not allow time for compounding (the cumulative effect of daily habits). 90 days
                gives habits time to embed and results time to emerge.
              </p>

              <p>
                <strong>Short enough to maintain urgency.</strong> Annual goals suffer from the
                planning fallacy: January feels distant from December, so the goal lacks urgency
                until Q4, by which point it is either rushed or abandoned. With a 90-day goal, the
                deadline is always visible. Week 1 of 12 feels different from Week 1 of 52. The
                proximity of the deadline creates productive pressure without panic.
              </p>

              <p>
                <strong>Allows rapid course-correction.</strong> If you discover in Week 4 that your
                strategy is not working (the study method is ineffective, the client acquisition
                approach is not generating leads, the habit design is unsustainable), you have 8
                weeks to adjust. With annual planning, discovering a flaw in Month 4 means you have
                already lost a third of the year. Quarterly cycles allow agile iteration: test,
                learn, adjust, repeat.
              </p>

              <p>
                <strong>Aligns with the seasonal rhythms of electrical work.</strong> Many
                electricians experience seasonal fluctuations: winter is busy with heating and
                lighting work, summer may have a lull (school holidays reduce commercial work, good
                weather reduces domestic emergency call-outs), autumn is often peak for new projects
                before the Christmas slowdown. A 90-day cycle allows you to set different priorities
                for different quarters. Q1 (Jan&ndash;Mar): study during the post-Christmas lull. Q2
                (Apr&ndash;Jun): business development and client acquisition. Q3 (Jul&ndash;Sep):
                operational improvements and systems. Q4 (Oct&ndash;Dec): financial review and tax
                planning.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Psychological Advantage of 90 Days
                </p>
                <p className="text-base text-white leading-relaxed">
                  12 weeks is short enough that you can sustain high focus. Research on willpower
                  and goal pursuit shows that motivation naturally wanes over time, but most people
                  can maintain concentrated effort for 8&ndash;12 weeks if the goal is clear and the
                  endpoint is visible. After 12 weeks, you take a brief reset (review, celebrate,
                  rest), then start a new 90-day cycle with renewed energy. This creates a rhythm of
                  sprint &rarr; rest &rarr; sprint, which is far more sustainable than a 12-month
                  marathon with no structured breaks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: 5-Step Plan Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The 5-Step 90-Day Plan Structure
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A well-structured 90-day plan fits on a single page and contains five elements. This
                structure provides clarity without complexity:
              </p>

              <p>
                <strong>Step 1: Theme</strong> &mdash; A one-sentence focus for the quarter that
                captures the spirit of what you are working toward. The theme is not the detailed
                goal but the headline. Examples: &ldquo;AM2 Mastery Quarter&rdquo;, &ldquo;Business
                Growth Sprint&rdquo;, &ldquo;Design Qualification Quarter&rdquo;, &ldquo;IEng
                Application Period&rdquo;. The theme serves as a mental anchor: when you face a
                decision about how to spend discretionary time, you ask &ldquo;Does this align with
                my theme for this quarter?&rdquo;
              </p>

              <p>
                <strong>Step 2: Outcomes</strong> &mdash; Specific, measurable results you will
                achieve by Day 90. These are your lag measures, written in SMART format. Examples:
                &ldquo;Pass AM2 practical assessment by 30 June&rdquo;, &ldquo;Acquire 5 new
                commercial clients generating minimum &pound;15,000 combined project value by end of
                Q2&rdquo;, &ldquo;Complete C&amp;G 2396 Design course and pass exam by 30
                September&rdquo;, &ldquo;Submit IEng application to IET with all supporting evidence
                by 15 December&rdquo;. You should have 1&ndash;3 outcomes maximum. More than three
                dilutes focus.
              </p>

              <p>
                <strong>Step 3: Milestones</strong> &mdash; Interim checkpoints at 30-day intervals
                that mark progress toward the outcome. Milestones create urgency and structure.
                Example for AM2 preparation: Week 4 (Day 30) = &ldquo;Complete all conduit and
                trunking practice scenarios to competent standard&rdquo;; Week 8 (Day 60) =
                &ldquo;Pass mock AM2 assessment (conduit, trunking, wiring, testing) with 80%+
                score&rdquo;; Week 12 (Day 90) = &ldquo;Sit and pass live AM2 exam&rdquo;.
                Milestones allow you to assess whether you are on track. If you reach Day 30 and
                have not hit the first milestone, you know you must accelerate or adjust.
              </p>

              <p>
                <strong>Step 4: Weekly Actions</strong> &mdash; Recurring tasks that move you toward
                the milestones. These are your lead measures. Example: &ldquo;6 hours of hands-on
                installation practice per week (Tuesday 6&ndash;8pm, Thursday 6&ndash;8pm, Saturday
                10am&ndash;12pm)&rdquo; and &ldquo;2 timed fault-finding scenarios per week (Sunday
                2&ndash;3pm)&rdquo;. Weekly actions are what you track on your scoreboard. They are
                predictive (more practice = higher pass likelihood) and influenceable (you control
                whether you do them).
              </p>

              <p>
                <strong>Step 5: Daily Habits</strong> &mdash; Small, consistent behaviours that
                support the weekly actions and make progress feel automatic. Example: &ldquo;Every
                evening after dinner, lay out tomorrow&rsquo;s practice rig (5 minutes)&rdquo;,
                &ldquo;Every morning during breakfast, review one worked design example (10
                minutes)&rdquo;, &ldquo;Every time I finish a job, take one portfolio photo (2
                minutes)&rdquo;. Daily habits are the compound interest of personal development:
                tiny, but exponential over time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Template: One-Page 90-Day Plan
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Theme:</strong> [One sentence &mdash; what is this quarter about?]
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Outcomes:</strong> [1&ndash;3 SMART goals &mdash; what will you
                      achieve by Day 90?]
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Milestones:</strong> [Day 30, Day 60, Day 90 checkpoints]
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Weekly Actions:</strong> [Lead measures &mdash; what will you do every
                      week?]
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Daily Habits:</strong> [Small behaviours that support the weekly
                      actions]
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Worked Example 1 - Apprentice AM2 Prep */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Worked Example 1: Apprentice Preparing for AM2
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Context:</strong> Liam is a third-year apprentice electrician. He completed
                his Level 3 Diploma in May and is booked to sit his AM2 practical assessment on 25
                June (12 weeks away). He works full-time Monday to Friday, attends college one
                evening per week, and has limited time for additional practice. His college tutor
                has told him his conduit bending needs significant improvement, and his
                fault-finding is inconsistent. He is anxious about the assessment and wants a
                structured preparation plan.
              </p>

              <p>
                <strong>Theme:</strong> &ldquo;AM2 Mastery Quarter &mdash; Become Assessment
                Ready&rdquo;
              </p>

              <p>
                <strong>Outcomes (Day 90, 25 June):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Pass AM2 practical assessment with competent performance across all elements
                    (conduit, trunking, wiring, testing, fault-finding)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Achieve 90%+ accuracy on timed fault-finding scenarios under exam conditions
                  </span>
                </li>
              </ul>

              <p>
                <strong>Milestones:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Week 4 (Day 30):</strong> Complete 20 conduit bends (saddles, sets,
                    offsets) to competent standard with minimal rework. Complete 10 trunking
                    installations including internal and external bends.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Week 8 (Day 60):</strong> Pass full mock AM2 assessment (conducted by
                    college or mentor) with 80%+ score. Identify and rectify 8/10 faults correctly
                    within the time limit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Week 12 (Day 90):</strong> Sit and pass live AM2 assessment.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Weekly Actions (Lead Measures):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    6 hours of hands-on installation practice per week (Tuesday 6&ndash;8pm in
                    college workshop, Thursday 6&ndash;8pm at home practice rig, Saturday
                    10am&ndash;12pm in garage). Focus: conduit bending, trunking, wiring, testing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    2 timed fault-finding scenarios per week (Sunday 2&ndash;3pm). Use college fault
                    rig or online fault-finding app. Record time and accuracy.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Daily Habits:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Every evening after dinner, lay out tomorrow&rsquo;s practice materials
                    (conduit, tools, diagrams) on the garage workbench &mdash; 5 minutes. This
                    removes friction and makes starting practice automatic.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    Every morning during breakfast, review one fault-finding worked example from the
                    AM2 prep booklet &mdash; 10 minutes. Builds pattern recognition.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Accountability:</strong> Weekly WhatsApp check-in with Jake (mate also
                preparing for AM2 in July). Every Sunday evening, exchange progress updates:
                &ldquo;This week I did X hours practice, completed X scenarios, struggled with Y,
                next week I will focus on Z.&rdquo;
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why This Plan Works for Liam
                </p>
                <p className="text-base text-white leading-relaxed">
                  The plan focuses on the two areas where Liam is weakest (conduit and
                  fault-finding) and allocates concentrated weekly practice. The milestones create
                  checkpoints to assess readiness. The daily habit (laying out materials) removes
                  the biggest barrier to practice (the mental effort of getting started). The
                  accountability with Jake provides peer support and prevents quiet abandonment. The
                  plan is demanding (6 hours practice + 2 hours fault-finding per week) but
                  achievable alongside full-time work because it is time-blocked and non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Worked Example 2 - Self-Employed Growth */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Worked Example 2: Self-Employed Electrician Growing Business
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Context:</strong> Sarah has been self-employed for 3 years, doing domestic
                and small commercial work. Her income is inconsistent (feast-famine cycles), and she
                relies too heavily on word-of-mouth referrals. She wants to build a more stable
                client base by acquiring 5 new commercial clients over the next 90 days. She is
                technically competent but has never done structured business development.
              </p>

              <p>
                <strong>Theme:</strong> &ldquo;Commercial Client Acquisition Sprint&rdquo;
              </p>

              <p>
                <strong>Outcomes (Day 90):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Acquire 5 new commercial clients (offices, retail, light industrial) generating
                    minimum &pound;15,000 combined project value
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Build a pipeline of 20 qualified prospects (businesses that have expressed
                    interest or requested quotes)
                  </span>
                </li>
              </ul>

              <p>
                <strong>Milestones:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Week 4:</strong> Attend 2 local business networking events. Collect 30
                    business cards. Follow up with 15 prospects. Send 10 quotes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Week 8:</strong> Secure 2 commercial clients (contracts signed). Have 10
                    active quotes in the pipeline. Refine pitch based on feedback.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Week 12:</strong> Achieve 5 new clients. Review what worked, scale
                    successful approaches into Q2 plan.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Weekly Actions (Lead Measures):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Make 10 new business contacts per week (networking events, LinkedIn outreach,
                    referrals from existing clients, local trade groups)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Follow up 5 prospects per week (phone call, email, in-person visit, quote
                    submission)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Attend 1 networking event or trade association meeting every 2 weeks (BNI,
                    Chamber of Commerce, ECA regional group)
                  </span>
                </li>
              </ul>

              <p>
                <strong>Daily Habits:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Every Monday morning, 8&ndash;8:30am, before starting jobs: review current
                    quotes, follow up 3 prospects, update CRM (or spreadsheet). This prevents
                    pipeline neglect.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    Every time I complete a job, ask the client: &ldquo;Do you know any other
                    businesses that might need an electrician?&rdquo; (30 seconds). Referrals are
                    the highest-converting leads.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Accountability:</strong> Fortnightly 30-minute call with mentor (experienced
                electrician who has built a successful commercial client base). Review pipeline,
                discuss challenges, refine approach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why This Plan Works for Sarah</p>
                <p className="text-sm text-white leading-relaxed">
                  The plan addresses Sarah&rsquo;s core problem: inconsistent pipeline. By
                  committing to 10 new contacts and 5 follow-ups per week, she ensures a steady flow
                  of opportunities. The Monday morning habit prevents the common failure mode where
                  self-employed electricians get busy with current work and neglect business
                  development. The milestones create urgency (2 clients by Week 8 means she must
                  accelerate if she is behind). The mentor accountability provides experienced
                  guidance and prevents her giving up when initial approaches do not convert.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Worked Example 3 - EngTech */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Worked Example 3: Experienced Electrician Pursuing EngTech
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Context:</strong> Marcus has 12 years&rsquo; experience as an electrician,
                including 5 years in a senior role with design and project management
                responsibilities. He wants to achieve Engineering Technician (EngTech) registration
                with the IET to improve his professional credibility and salary prospects. He has
                never formally documented his competences and finds the application process
                daunting.
              </p>

              <p>
                <strong>Theme:</strong> &ldquo;EngTech Application Quarter &mdash; Professional
                Recognition&rdquo;
              </p>

              <p>
                <strong>Outcomes (Day 90):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    Submit complete EngTech application to IET including competence statement,
                    supporting evidence, CPD log, and references
                  </span>
                </li>
              </ul>

              <p>
                <strong>Milestones:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Week 4:</strong> Complete competence self-assessment against UK-SPEC.
                    Identify evidence for all competence areas. Compile CPD log for last 3 years.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Week 8:</strong> Draft competence statement (2,000 words). Gather
                    supporting documents (certificates, project examples, testimonials). Secure 2
                    professional references.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Week 12:</strong> Submit final application via IET portal. Book
                    professional review interview (if required).
                  </span>
                </li>
              </ul>

              <p>
                <strong>Weekly Actions (Lead Measures):</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    3 hours per week on application tasks (Sunday 9am&ndash;12pm). Focus: competence
                    mapping, evidence gathering, statement drafting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    1 consultation per fortnight with IET mentor or experienced EngTech colleague to
                    review progress and get feedback on draft statement
                  </span>
                </li>
              </ul>

              <p>
                <strong>Daily Habits:</strong>
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    Every time I complete a significant project or task, spend 5 minutes documenting
                    it in my CPD log (what I did, what I learned, what competences it demonstrates).
                    This builds evidence in real-time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>
                    Every Friday afternoon, review this week&rsquo;s work and identify one example
                    of where I applied technical judgment, solved a problem, or demonstrated
                    professionalism &mdash; add to evidence bank.
                  </span>
                </li>
              </ul>

              <p>
                <strong>Accountability:</strong> Monthly progress review with line manager (who
                supports the EngTech application and has agreed to provide a reference). Commitment
                to submit application by end of Q1.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Why This Plan Works for Marcus
                </p>
                <p className="text-base text-white leading-relaxed">
                  The plan breaks down the intimidating EngTech application into structured weekly
                  tasks. The Sunday 3-hour block provides focused time without work distractions.
                  The daily habit of documenting evidence prevents the common problem where
                  experienced electricians struggle to recall and articulate their competences. The
                  fortnightly mentor review provides expert feedback and prevents Marcus wasting
                  time on misdirected effort. The 90-day deadline creates urgency (without it, the
                  application could drift for years).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Weekly Planning Ritual */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            The Weekly Planning Ritual
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The weekly planning ritual is the operational heartbeat of your 90-day plan. Without
                it, the plan remains abstract and you drift without realising it. With it, you
                maintain awareness, adjust course rapidly, and build momentum through consistent
                small wins. The ritual takes 10&ndash;15 minutes and should happen at the same time
                every week (Sunday evening is ideal for most electricians).
              </p>

              <p>
                <strong>Step 1: Review Last Week&rsquo;s Commitments</strong> &mdash; Look at what
                you committed to do last week. Did you do it? If yes, acknowledge the win (this
                builds confidence). If no, identify the obstacle without self-judgment: &ldquo;I
                committed to 6 hours practice but only did 3 hours. Why? Emergency call-out on
                Wednesday ate into Tuesday evening slot, and I was too tired Thursday.&rdquo; The
                purpose is awareness, not shame.
              </p>

              <p>
                <strong>Step 2: Update the Scoreboard</strong> &mdash; Record your lead measure data
                for the week. If your lead measure is &ldquo;6 hours of practice per week&rdquo;,
                record the actual hours. If it is &ldquo;10 new business contacts per week&rdquo;,
                record the actual number. Update your cumulative progress chart. Are you on track
                toward your milestones? If you are behind, how far behind? This creates visibility.
              </p>

              <p>
                <strong>Step 3: Identify Obstacles and Adjust</strong> &mdash; What got in the way
                this week? Was it a one-off event (emergency job, family crisis) or a recurring
                pattern (always too tired on Thursday evenings)? If it is recurring, adjust the
                system: move Thursday practice to Saturday morning, or reduce the target from 6
                hours to 4 hours. The system should fit your life, not vice versa. If you keep
                missing the target, the target is wrong or the time slot is wrong &mdash; fix it.
              </p>

              <p>
                <strong>Step 4: Commit to Next Week&rsquo;s Actions</strong> &mdash; Using
                implementation intentions (when-then statements), commit to specific actions for the
                coming week. Examples: &ldquo;On Tuesday at 7pm, I will practise conduit bending in
                the garage for 45 minutes.&rdquo; &ldquo;On Thursday at 6pm, I will complete one
                fault-finding scenario using the college rig.&rdquo; &ldquo;On Saturday at 10am, I
                will attend the ECA regional meeting.&rdquo; The specificity removes in-the-moment
                decision-making (when willpower is low) and creates an automatic trigger.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sample Weekly Review Template (10 Minutes)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Last week&rsquo;s commitment:</strong> Did I do it? Yes/No. If no,
                      what was the obstacle?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Lead measure score:</strong> Target vs Actual. (e.g., &ldquo;Target: 6
                      hours practice. Actual: 4 hours.&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Milestone check:</strong> Am I on track for the next milestone? (e.g.,
                      &ldquo;Week 4 milestone is next week &mdash; need to accelerate&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>One adjustment:</strong> What will I change next week? (e.g.,
                      &ldquo;Move Thursday session to Saturday morning&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Next week&rsquo;s commitment:</strong> When-then statements. (e.g.,
                      &ldquo;When it is Tuesday 7pm, I will practise for 45 minutes.&rdquo;)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Obstacles Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Obstacles Planning &mdash; Pre-Empting Failure Modes
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most effective but underused planning techniques is the pre-mortem (also
                called obstacles planning). Instead of waiting for obstacles to derail your plan,
                you identify likely barriers at the START of the 90 days and create contingency
                strategies before they happen. This dramatically increases resilience.
              </p>

              <p>
                <strong>How to Conduct a Pre-Mortem:</strong> Sit down with your 90-day plan and
                ask: &ldquo;It is now Day 90. I did not achieve my goal. What were the most likely
                reasons?&rdquo; Brainstorm 5&ndash;10 obstacles. For each one, create a contingency
                plan. Example:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Obstacle:</strong> Busy work period means I have no time for practice.{' '}
                    <strong>Contingency:</strong> If I miss both planned practice sessions in a
                    week, I will do one 90-minute session on Sunday morning to prevent total drift.
                    I will also reduce the target from 6 hours to 4 hours during peak periods
                    (acceptable because some progress is better than zero).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Obstacle:</strong> I lose motivation in the middle phase (Weeks
                    5&ndash;8) when initial enthusiasm wears off. <strong>Contingency:</strong> I
                    will schedule a mid-point review in Week 6 with my accountability partner to
                    re-energise. I will also revisit my &ldquo;why&rdquo; (the reason this goal
                    matters to me) and write it on a card I see daily.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Obstacle:</strong> Emergency family commitment or illness disrupts the
                    plan. <strong>Contingency:</strong> I accept that life happens. If I lose a full
                    week, I will extend the 90-day plan by one week rather than abandoning it. I
                    will also front-load effort in Weeks 1&ndash;4 to build a buffer.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Obstacle:</strong> I realise my study method is not effective (not
                    retaining information, practice is not translating to competence).{' '}
                    <strong>Contingency:</strong> At the Week 4 milestone, I will assess whether the
                    approach is working. If not, I will seek advice from mentor, tutor, or
                    experienced colleague and adjust method for Weeks 5&ndash;12.
                  </span>
                </li>
              </ul>

              <p>
                The power of the pre-mortem is that it removes surprise. When the busy period
                arrives (and it will), you do not panic or abandon the plan &mdash; you activate the
                contingency you already designed. This transforms obstacles from plan-killers into
                expected challenges with pre-built solutions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Common Obstacles for Electricians (and Contingencies)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Whirlwind takeover:</strong> Reactive work crowds out proactive goals.
                      Contingency: Time-block sacred WIG slots, treat them like customer
                      appointments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Motivation dip:</strong> Initial enthusiasm fades. Contingency: Week 6
                      accountability check-in, revisit intrinsic motivation
                      (autonomy/mastery/purpose).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Inconsistent schedule:</strong> Unpredictable finish times prevent
                      fixed time-blocks. Contingency: Flexible volume-based commitment (e.g.,
                      &ldquo;two 45-minute sessions this week, whenever I can fit them&rdquo;).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Financial pressure:</strong> Course fee or reduced income affects
                      ability to invest in development. Contingency: Build course cost into budget
                      at start of quarter, or seek employer sponsorship / grant funding.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Isolation:</strong> Solo learning with no peer support. Contingency:
                      Join online study group, find accountability partner, attend local IET / ECA
                      meetups.
                    </span>
                  </li>
                </ul>
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
                This section has provided a complete framework for creating and executing a 90-day
                plan. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>90 days is optimal:</strong> Long enough for meaningful progress, short
                    enough for urgency, allows rapid iteration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>5-step structure:</strong> Theme (focus), Outcomes (SMART goals),
                    Milestones (checkpoints), Weekly Actions (lead measures), Daily Habits (small
                    behaviours).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Implementation intentions work:</strong> When-then statements
                    (&ldquo;When it is Tuesday 7pm, I will practise...&rdquo;) remove in-the-moment
                    decision-making and increase follow-through.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Weekly ritual is non-negotiable:</strong> 10&ndash;15 minutes every
                    Sunday to review, update scoreboard, identify obstacles, and commit to next
                    week&rsquo;s actions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Pre-plan obstacles:</strong> Identify likely barriers at the start and
                    create contingencies before they derail you. Obstacles are expected, not
                    surprising.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Focus on lead measures:</strong> You cannot control the outcome (lag
                    measure) but you can control the inputs (lead measures). Track and improve the
                    inputs.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, you will learn how
                  to conduct an annual review to assess the full year, reset goals for the coming
                  year, and align your quarterly plans with long-term career progression milestones
                  including ECS renewal, IET CPD, NICEIC assessments, and tax deadlines.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../gs-module-5-section-3">
              Next: Annual Review &amp; Goal Resetting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
