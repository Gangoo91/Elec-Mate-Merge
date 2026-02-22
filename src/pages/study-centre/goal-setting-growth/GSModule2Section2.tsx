import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
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
    id: 'gs-2-2-check1',
    question:
      'An apprentice electrician creates the following goal structure: Long-term (5 years): &ldquo;Become a self-employed electrical contractor earning &pound;55,000+.&rdquo; Medium-term (1 year): &ldquo;Complete City &amp; Guilds 2365 Level 3 and AM2 assessment.&rdquo; Short-term (3 months): &ldquo;Achieve 95%+ on all BS 7671 cable selection tests.&rdquo; What is the primary strength of this structure?',
    options: [
      'All three goals have the same deadline, ensuring focused effort',
      'Each shorter-term goal is a necessary step towards the longer-term goal, creating a cascading pathway',
      'The goals are all equally difficult, ensuring consistent motivation',
      'The short-term goal is more specific than the long-term goal',
    ],
    correctIndex: 1,
    explanation:
      'This goal structure demonstrates effective goal cascading. The short-term goal (BS 7671 cable selection competence) contributes to the medium-term goal (Level 3 qualification and AM2 assessment, both of which require cable selection skills), which in turn contributes to the long-term goal (self-employed contractor, which requires full electrical competence including qualification completion). Each tier builds on the previous tier, creating a coherent pathway rather than a collection of unrelated goals. This is the essence of the three horizons framework: short-term goals feed into medium-term goals, which feed into long-term goals, ensuring that daily effort compounds towards a meaningful destination.',
  },
  {
    id: 'gs-2-2-check2',
    question:
      'A qualified electrician sets a goal to complete the City &amp; Guilds 2391-52 Inspection and Testing qualification in three months. Historically, most electricians require 6&ndash;9 months to complete this qualification while working full-time. The electrician believes they can do it faster because they are &ldquo;highly motivated&rdquo;. What cognitive bias is most likely affecting this timeline estimate?',
    options: [
      'Confirmation bias &mdash; seeking information that supports their belief',
      'Planning fallacy &mdash; underestimating the time required despite evidence to the contrary',
      'Anchoring bias &mdash; fixating on the first number they heard',
      'Availability heuristic &mdash; overweighting recent examples',
    ],
    correctIndex: 1,
    explanation:
      'This is a textbook example of the planning fallacy, identified by Daniel Kahneman and Amos Tversky. The planning fallacy is the systematic tendency to underestimate how long a task will take, even when we know that similar tasks have taken longer in the past. People believe that their case will be different because they are more motivated, more focused, or more capable. In reality, motivation does not eliminate the time required to learn complex material or perform practice assessments. The 6&ndash;9 month timeframe reflects the reality of studying while working full-time. Compressing this to three months would require either (1) reducing work hours (loss of income), (2) studying 3&ndash;4 hours per day (probably unsustainable), or (3) accepting lower quality learning. The antidote to planning fallacy is reference class forecasting: ask &ldquo;How long did this take for people similar to me?&rdquo; rather than &ldquo;How long do I think it will take me?&rdquo;',
  },
  {
    id: 'gs-2-2-check3',
    question:
      'An electrical contractor sets quarterly goals in January, but forgets to review them until December. When reviewing, they discover they achieved only one of the four goals. What is the most likely explanation for this poor achievement rate?',
    options: [
      'The goals were not SMART enough',
      'The goals were too difficult',
      'The lack of regular review allowed priorities to drift and effort to dissipate without corrective action',
      'Quarterly goals are inherently less effective than annual goals',
    ],
    correctIndex: 2,
    explanation:
      'The most likely explanation is the absence of regular review. Goals that are set and then ignored become disconnected from daily behaviour. Without monthly or quarterly review, there is no opportunity to assess progress, identify obstacles, adjust strategies, or recommit to the goal when motivation wanes. Goal-setting is not a one-time event; it is an ongoing process of setting, tracking, reviewing, and adjusting. Research on goal achievement consistently shows that people who review their goals regularly (weekly or monthly) achieve them at significantly higher rates than people who set goals once and never revisit them. The recommended practice is: set goals quarterly, review progress monthly, and track leading indicators (activity goals) weekly or daily. This creates a feedback loop that keeps goals alive and actionable.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How far ahead should I plan? Is a 10-year goal useful or too uncertain?',
    answer:
      'The appropriate planning horizon depends on your career stage and the stability of your industry. For apprentices and early-career electricians, a 3&ndash;5 year horizon is usually more practical than a 10-year horizon because your knowledge of the industry, your preferences, and your opportunities will change significantly as you gain experience. For established electricians and business owners, a 10-year vision can be valuable as a directional guide, but it should be held lightly and reviewed annually. The further into the future you project, the less specific the goal should be. A 10-year goal might be: &ldquo;Build a successful electrical contracting business employing 5&ndash;10 electricians.&rdquo; A 1-year goal would be far more specific: &ldquo;Recruit one JIB Approved Electrician and achieve &pound;250,000 revenue.&rdquo; Use long-term goals for direction, medium-term goals for milestones, and short-term goals for action.',
  },
  {
    question: 'What if my short-term goals are urgent but my long-term goals feel more important?',
    answer:
      'This is the classic tension between urgent and important, famously explored by Stephen Covey in the Eisenhower Matrix. Urgent tasks demand immediate attention (a client complaint, a looming deadline, a piece of equipment that has broken). Important tasks contribute to long-term goals (studying for a qualification, building client relationships, improving business systems). The trap is spending all your time on urgent tasks while neglecting important tasks. Over time, this leads to stagnation because you are always firefighting and never building. The solution is to schedule time for important but non-urgent tasks (Quadrant 2 in Covey&rsquo;s framework) before urgent tasks consume your day. For example, block 6&ndash;7am for study (important, not urgent) before you check emails or take calls (urgent). Protect this time fiercely. If you wait for urgency to subside before pursuing important goals, you will wait forever.',
  },
  {
    question: 'Should I tell people about my long-term goals, or keep them private?',
    answer:
      'The research is nuanced. Sharing long-term goals with the right people in the right way can increase accountability and commitment. Dr Gail Matthews&rsquo; research found that people who shared goals with a friend and sent weekly progress updates were 42% more likely to achieve them. However, Peter Gollwitzer&rsquo;s research suggests that premature public announcement can create &ldquo;social reality&rdquo; where you receive praise for the intention rather than the achievement, reducing motivation. The distinction: share goals with accountability partners who will check your progress and challenge you (a mentor, a study group, a business coach). Do not broadcast goals widely for validation. A good test: if the person you share with will ask &ldquo;How is your progress on that goal?&rdquo; in three months, share. If they will forget immediately or just offer vague encouragement, do not share.',
  },
  {
    question:
      'I set goals at the start of the year but lose motivation by March. How do I maintain momentum?',
    answer:
      'This is extremely common and reflects two issues: (1) lack of short-term wins, and (2) insufficient review cycles. First, ensure your goal structure includes short-term goals (0&ndash;3 months) that provide regular wins. If all your goals are 12-month goals, you will go months without visible progress, which is demotivating. Break the 12-month goal into quarterly milestones, and celebrate when each milestone is achieved. Second, implement monthly review sessions. Block one hour at the end of each month to review: What did I achieve this month? What obstacles did I encounter? What will I do differently next month? Am I still committed to this goal? This review creates accountability and allows you to course-correct before motivation collapses entirely. Many people lose motivation not because the goal is wrong, but because they have drifted off-track without noticing. Regular review catches the drift early.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'In the three horizons framework for goal planning, which timeframe typically defines short-term goals for electricians?',
    options: ['0&ndash;1 week', '0&ndash;3 months', '0&ndash;12 months', '0&ndash;2 years'],
    correctAnswer: 1,
    explanation:
      'Short-term goals for electricians typically span 0&ndash;3 months. This timeframe is long enough to accomplish meaningful tasks (complete a workbook section, finish a short course module, perform 10 EICRs) but short enough to maintain focus and urgency. Goals shorter than one month risk becoming task lists rather than strategic goals. Goals longer than three months start to overlap with medium-term goals. The three horizons framework typically uses: short-term (0&ndash;3 months), medium-term (3&ndash;12 months), and long-term (1&ndash;5+ years). These are flexible guidelines, not rigid rules, but they provide a useful structure for most tradespeople.',
  },
  {
    id: 2,
    question:
      'A qualified electrician has the following long-term goal: &ldquo;Become a NICEIC Approved Contractor and run a successful domestic installation business.&rdquo; Which of the following is the best example of a medium-term goal that supports this long-term goal?',
    options: [
      'Complete one EICR this week',
      'Read the NICEIC scheme rules document',
      'Complete City &amp; Guilds 2391-52 Inspection and Testing qualification and perform 30 documented EICRs by December 2026',
      'Earn &pound;1 million in revenue within 10 years',
    ],
    correctAnswer: 2,
    explanation:
      'Option 3 is the best medium-term goal because it is a significant milestone (qualification + documented competence) that directly enables the long-term goal (NICEIC approval requires inspection and testing competence and documented job history). Option 1 is a short-term activity goal. Option 2 is a task, not a goal. Option 4 is another long-term goal that is not necessarily a stepping stone to NICEIC approval. Medium-term goals should be concrete achievements that close the gap between where you are now (qualified electrician) and where you want to be (NICEIC Approved Contractor). Effective medium-term goals answer: &ldquo;What must I achieve in the next 6&ndash;12 months to make my long-term goal inevitable?&rdquo;',
  },
  {
    id: 3,
    question:
      'The planning fallacy, identified by Kahneman and Tversky, explains why people consistently underestimate how long tasks will take. What is the most effective strategy to counteract the planning fallacy when setting goal deadlines?',
    options: [
      'Add 10% to your initial time estimate',
      'Use reference class forecasting: base your estimate on how long similar tasks took for similar people',
      'Set very ambitious deadlines to increase motivation',
      'Avoid setting deadlines at all to reduce pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Reference class forecasting is the most effective strategy to counteract planning fallacy. Instead of asking &ldquo;How long will this take me?&rdquo; (which triggers optimistic bias), ask &ldquo;How long did this take for people similar to me in similar circumstances?&rdquo; For example, if you are planning to complete the City &amp; Guilds 2391-52 qualification, research how long it typically takes electricians working full-time (usually 6&ndash;9 months). Use that as your baseline, then adjust slightly based on your specific circumstances (more or less study time available, prior experience with testing). Adding 10% to your initial estimate helps, but it does not address the root cause of the bias. Avoiding deadlines removes the benefits of time-bound goals. Setting overly ambitious deadlines worsens the problem.',
  },
  {
    id: 4,
    question:
      'An apprentice electrician sets three goals: (1) Pass AM2 assessment. (2) Learn to play guitar. (3) Run a half-marathon. All three goals are SMART. However, after three months, the apprentice has made minimal progress on all three. What is the most likely explanation?',
    options: [
      'The goals were not specific enough',
      'The apprentice lacks discipline',
      'Attention and effort are spread too thin across unrelated goals, preventing focused progress on any single goal',
      'The goals were all too easy',
    ],
    correctAnswer: 2,
    explanation:
      'The most likely explanation is that attention and effort are spread too thin. Each goal competes for the same scarce resources: time, energy, and willpower. When goals are unrelated (electrical competence, musical skill, running fitness), there is no compounding benefit &mdash; progress on one does not support progress on another. Most people can sustain focused effort on 2&ndash;3 major goals at a time. Beyond that threshold, performance degrades. The solution is to prioritise: choose the 1&ndash;2 goals that matter most right now (for an apprentice, passing AM2 is almost certainly the top priority), commit to those fully, and defer the others until the priority goals are achieved. This approach creates momentum and builds confidence through completed goals rather than scattered effort and incomplete goals.',
  },
  {
    id: 5,
    question:
      'Stephen Covey advises to &ldquo;begin with the end in mind&rdquo; when setting long-term goals. For an apprentice electrician, what does this principle suggest?',
    options: [
      'Focus only on short-term goals because the future is uncertain',
      'Visualise where you want to be in 3&ndash;5 years (qualified electrician, business owner, specialist), then work backwards to identify the medium and short-term goals required to get there',
      'Set the most difficult goals possible to maximise effort',
      'Copy the goals of successful electricians you admire',
    ],
    correctAnswer: 1,
    explanation:
      '&ldquo;Begin with the end in mind&rdquo; means starting with a clear long-term vision, then working backwards to identify the steps required to achieve it. For an apprentice, the &ldquo;end&rdquo; might be: &ldquo;JIB Approved Electrician, NICEIC registered, earning &pound;45,000+, specialising in domestic rewires.&rdquo; Once the destination is clear, you can ask: What must I achieve in year 3 to reach this destination? (Complete Level 3, pass AM2.) What must I achieve in year 2? (Complete Level 2, demonstrate competence in installation tasks.) What must I achieve in the next 3 months? (Master BS 7671 cable selection, improve conduit bending to AM2 standard.) This backwards planning ensures that short-term effort is aligned with long-term direction. Without the long-term vision, short-term goals can become aimless activity.',
  },
  {
    id: 6,
    question:
      'An electrical contractor sets a goal to increase revenue by 25% in the next 12 months. This is a long-term achievement goal. To ensure the goal is achieved, the contractor should also set which type of supporting goals?',
    options: [
      'More revenue goals at different timeframes',
      'Activity goals (leading indicators) such as &ldquo;Contact 10 new commercial clients per month&rdquo; and &ldquo;Submit 15 quotes per month&rdquo;',
      'Easier goals to build confidence',
      'Goals in unrelated areas to maintain work-life balance',
    ],
    correctAnswer: 1,
    explanation:
      'To support a revenue achievement goal (lagging indicator), the contractor must identify and track activity goals (leading indicators) that drive revenue. Revenue is the outcome of specific behaviours: contacting prospects, submitting quotes, delivering quality work that generates referrals, upselling maintenance contracts, etc. By setting activity goals around these behaviours and tracking them weekly or monthly, the contractor can influence the revenue outcome. If the activity goals are being met but revenue is not increasing, the contractor can diagnose the issue (low conversion rate? pricing too low? poor quality leading to no referrals?) and adjust. Leading indicators are controllable; lagging indicators are the result. Manage the leading indicators, and the lagging indicators follow.',
  },
  {
    id: 7,
    question:
      'For electricians, which of the following is a legitimate reason to adjust or abandon a previously set goal?',
    options: [
      'The goal has become difficult or uncomfortable',
      'New information or changed circumstances make the goal no longer relevant or aligned with your values',
      'A friend suggests a different goal that sounds more interesting',
      'You have been working on the goal for two weeks and have not seen results yet',
    ],
    correctAnswer: 1,
    explanation:
      'Goals should be adjusted or abandoned when new information or changed circumstances make them no longer relevant or aligned with your values and direction. For example, an electrician sets a goal to specialise in industrial electrical work, then discovers through experience that they strongly prefer domestic installation work. The goal was set based on incomplete information; revising it based on new self-knowledge is rational. However, abandoning a goal because it has become difficult, uncomfortable, or has not produced results in two weeks is avoidance, not wisdom. Goals are meant to be challenging, and meaningful results take time. The test is: &ldquo;If I had already achieved this goal, would I still want the outcome?&rdquo; If yes, persist. If no, revise.',
  },
  {
    id: 8,
    question:
      'An electrician sets quarterly goals in January, April, July, and October, and reviews progress monthly. What is the primary benefit of this quarterly goal-setting + monthly review structure?',
    options: [
      'It reduces the number of goals, making life simpler',
      'It creates a regular rhythm of planning, action, and reflection that keeps goals aligned with changing circumstances and maintains momentum',
      'It eliminates the need for long-term goals',
      'It makes goals easier to achieve',
    ],
    correctAnswer: 1,
    explanation:
      'The quarterly planning + monthly review structure creates a feedback loop that keeps goals alive and actionable. Quarterly planning (every 3 months) provides a natural checkpoint to set new short-term goals aligned with medium and long-term direction. Monthly review (every 4 weeks) ensures that you assess progress, identify obstacles, celebrate wins, and adjust tactics before significant drift occurs. This rhythm prevents both the rigidity of never reviewing goals and the chaos of constantly changing direction. It is sustainable, evidence-based, and used by high-performing individuals and organisations across industries. The structure does not eliminate the need for long-term goals (those provide direction) or make goals easier (goal difficulty is separate from review frequency), but it does ensure that goals remain connected to behaviour.',
  },
];

export default function GSModule2Section2() {
  useSEO({
    title: 'Short, Medium & Long-Term Goal Planning | Goal Setting Module 2.2',
    description:
      'Three horizons framework, goal cascading, planning fallacy, seasonal planning for electrical trade, and review cycles.',
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
            <Link to="../gs-module-2">
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
            <Calendar className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Short, Medium &amp; Long-Term Goal Planning
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Three horizons framework, goal cascading, planning fallacy, seasonal planning for
            electrical trade, and review cycles
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Short-term:</strong> 0&ndash;3 months (immediate action and quick wins)
              </li>
              <li>
                <strong>Medium-term:</strong> 3&ndash;12 months (major milestones and
                qualifications)
              </li>
              <li>
                <strong>Long-term:</strong> 1&ndash;5+ years (career vision and strategic direction)
              </li>
              <li>
                <strong>Goal cascading:</strong> Short-term goals feed into medium-term, which feed
                into long-term
              </li>
              <li>
                <strong>Planning fallacy:</strong> We underestimate time required; use reference
                class forecasting
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Direction:</strong> Long-term goals prevent aimless activity
              </li>
              <li>
                <strong>Momentum:</strong> Short-term wins maintain motivation during long journeys
              </li>
              <li>
                <strong>Coherence:</strong> Goal cascading ensures all effort compounds towards a
                destination
              </li>
              <li>
                <strong>Realism:</strong> Planning fallacy awareness prevents unrealistic deadlines
                and burnout
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define the three goal horizons (short, medium, long-term) and explain the appropriate timeframes for electricians',
              'Apply goal cascading to ensure short-term goals support medium-term goals, which support long-term direction',
              'Identify the planning fallacy and use reference class forecasting to set realistic deadlines',
              'Adapt goal planning to the seasonal rhythms of the electrical trade (summer, winter, financial year-end)',
              'Implement quarterly goal-setting and monthly review cycles to maintain alignment and momentum',
              'Distinguish between directional long-term goals and specific short-term goals',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Three Horizons Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Three Horizons Framework
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The three horizons framework divides goals into three timeframes: short-term
                (0&ndash;3 months), medium-term (3&ndash;12 months), and long-term (1&ndash;5+
                years). Each horizon serves a different purpose. Short-term goals provide immediate
                direction and create quick wins that build momentum. Medium-term goals define major
                milestones that mark progress towards larger objectives. Long-term goals provide
                strategic direction and ensure that short-term effort is not random activity but
                purposeful movement towards a meaningful destination. Together, the three horizons
                create a coherent goal system where daily action connects to weekly progress,
                monthly milestones, and multi-year vision.
              </p>

              <p>
                For electricians, the three horizons align naturally with the structure of the
                trade. <strong>Short-term goals</strong> (0&ndash;3 months) might include:
                completing a specific section of a qualification, mastering a particular skill
                (conduit bending, three-phase motor control), or delivering a defined number of jobs
                (10 EICRs, 5 consumer unit changes). These are concrete, achievable within a
                quarter, and provide regular evidence of progress.
                <strong> Medium-term goals</strong> (3&ndash;12 months) might include: completing a
                full City &amp; Guilds qualification (2365 Level 3, 2391-52), passing the AM2
                assessment, joining a competent person scheme, or achieving a specific JIB grading.
                These are significant milestones that typically require sustained effort over
                multiple months. <strong>Long-term goals</strong> (1&ndash;5+ years) might include:
                becoming a JIB Approved Electrician, starting a self-employed contracting business,
                achieving NICEIC Approved Contractor status, or specialising in a particular area
                (inspection and testing, industrial controls, renewable energy systems).
              </p>

              <p>
                The key principle is that goals should become less specific as the time horizon
                lengthens. A short-term goal should be extremely specific: &ldquo;Complete BS 7671
                Section 433 overcurrent protection workbook questions 1&ndash;50 by 31 March
                2026.&rdquo; A medium-term goal can be broader: &ldquo;Complete City &amp; Guilds
                2365 Level 3 qualification by December 2026.&rdquo; A long-term goal can be
                directional: &ldquo;Build a successful self-employed electrical contracting business
                specialising in domestic installation and testing.&rdquo; This graduated specificity
                reflects increasing uncertainty the further you project into the future. You can
                plan this week in detail; you can plan this year in outline; you can plan the next
                five years in broad strokes. Trying to plan five years in detail is both impossible
                and counterproductive because circumstances will change.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Three Horizons Example: Apprentice Electrician
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Short-term (3 months):</strong> &ldquo;Achieve 95%+ accuracy on all BS
                      7671 cable selection exercises for ring final circuits and radial circuits by
                      30 April 2026.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Medium-term (12 months):</strong> &ldquo;Complete City &amp; Guilds
                      2365 Level 3 Diploma with a merit grade or higher by December 2026.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Long-term (3 years):</strong> &ldquo;Achieve JIB Approved Electrician
                      status, pass AM2 assessment, and secure employment with a reputable electrical
                      contractor earning &pound;40,000+ per year.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Goal Cascading */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Goal Cascading: Linking the Horizons
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goal cascading is the process of ensuring that goals at each time horizon support
                goals at the next horizon. Short-term goals should feed into medium-term goals.
                Medium-term goals should feed into long-term goals. This creates a coherent pathway
                where every action contributes to a larger objective. Without cascading, you risk
                setting goals that are individually SMART but collectively incoherent &mdash; a
                collection of unrelated achievements that do not compound into a meaningful career
                trajectory. Cascading ensures that effort compounds rather than scatters.
              </p>

              <p>
                To apply goal cascading, start with your long-term vision and work backwards. Ask:
                &ldquo;What must I achieve in the next 12 months to make this long-term goal
                inevitable or highly probable?&rdquo; The answer becomes your medium-term goal. Then
                ask: &ldquo;What must I achieve in the next 3 months to make this medium-term goal
                achievable?&rdquo; The answer becomes your short-term goal. For example: Long-term
                goal (5 years): &ldquo;Run a successful electrical contracting business employing
                3&ndash;5 electricians and earning &pound;80,000+ profit per year.&rdquo;
                Medium-term goal (12 months): &ldquo;Complete City &amp; Guilds 2391-52 Inspection
                and Testing qualification, join NICEIC as a Domestic Installer, and complete 50
                notifiable jobs with zero non-conformances.&rdquo; Short-term goal (3 months):
                &ldquo;Perform and document 10 full EICRs in accordance with BS 7671:2018+A2:2022
                and GN3 9th Edition, achieving supervisor sign-off on all reports.&rdquo;
              </p>

              <p>
                Notice how each tier supports the next. The short-term goal (10 documented EICRs)
                builds the practical competence required for the medium-term goal (2391-52
                qualification and NICEIC registration). The medium-term goal (qualification +
                competent person scheme membership) provides the credentials and client trust
                required for the long-term goal (running a contracting business). Each goal is a
                necessary step on the path to the next. This is cascading in action. If any goal in
                the sequence is not clearly connected to the tier above it, the goal may not be
                relevant. Test every short-term goal by asking: &ldquo;Does this contribute to my
                medium-term goal?&rdquo; Test every medium-term goal by asking: &ldquo;Does this
                move me towards my long-term vision?&rdquo; If the answer is no, reconsider the
                goal.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Cascading Test</p>
                <p className="text-base text-white leading-relaxed">
                  For every short-term goal you set, complete this sentence: &ldquo;Achieving this
                  goal will contribute to [medium-term goal] by [specific connection].&rdquo; For
                  every medium-term goal, complete: &ldquo;Achieving this goal will move me towards
                  [long-term vision] by [specific connection].&rdquo; If you cannot complete these
                  sentences, the goals may not be properly cascaded.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Planning Fallacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Planning Fallacy: Why We Underestimate Time
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The planning fallacy is a cognitive bias identified by psychologists Daniel Kahneman
                and Amos Tversky. It describes the systematic tendency for people to underestimate
                how long tasks will take, even when they know from experience that similar tasks
                have taken longer in the past. The planning fallacy affects electricians in two
                common scenarios: (1) estimating how long a job will take (leading to under-quoting
                and lost profit), and (2) estimating how long it will take to achieve a
                qualification or skill (leading to unrealistic goal deadlines and demotivation when
                progress is slower than expected).
              </p>

              <p>
                The planning fallacy occurs because we focus on the best-case scenario and ignore
                base rates. When estimating how long it will take to complete the City &amp; Guilds
                2391-52 qualification, most people think: &ldquo;I am highly motivated, I will study
                hard, there is no reason this should take long.&rdquo; They imagine the ideal
                scenario where nothing goes wrong: no work delays, no personal interruptions, no
                difficult topics that require extra time. In reality, work does run late sometimes,
                family emergencies do occur, and some topics do require more time than expected. The
                result is that tasks take 2&ndash;3 times longer than the initial optimistic
                estimate. Research shows that even when people are warned about the planning
                fallacy, they continue to make optimistic predictions for their own tasks while
                correctly predicting longer durations for other people&rsquo;s tasks.
              </p>

              <p>
                The antidote to the planning fallacy is <strong>reference class forecasting</strong>
                . Instead of asking &ldquo;How long will this take me?&rdquo; (which triggers
                optimistic bias), ask &ldquo;How long did this take for people similar to me in
                similar circumstances?&rdquo; For example, if you want to complete the 2391-52
                qualification while working full-time, research the typical duration for
                full-time-employed electricians (usually 6&ndash;9 months). Use that as your
                baseline estimate, then adjust slightly based on your specific circumstances (more
                or less study time, prior experience with testing, access to real installations for
                practice). This external reference point counteracts your internal optimism. It does
                not guarantee perfect accuracy, but it produces far more realistic estimates than
                unaided intuition.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Worked Example: Planning Fallacy in Action
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Optimistic estimate:</strong> &ldquo;I can complete the City &amp;
                      Guilds 2365 Level 3 qualification in 4 months if I study hard.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Reference class data:</strong> The Level 3 qualification is typically
                      delivered over 12&ndash;18 months for apprentices studying part-time alongside
                      full-time employment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Realistic estimate:</strong> &ldquo;I will aim to complete Level 3 in
                      12 months, allowing buffer time for work interruptions and difficult topics.
                      If I finish early, that is a bonus.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Seasonal Planning for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Seasonal Planning for the Electrical Trade
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The electrical trade has seasonal rhythms that affect workload, income, and
                available study time. Understanding these rhythms allows you to set realistic goals
                that account for predictable busy and quiet periods.
                <strong> Summer (May&ndash;September)</strong> is typically the busiest period for
                domestic electricians. Clients want outdoor lighting installed, garden electrics
                completed, and rewires finished before winter. Days are longer, weather is better,
                and construction activity peaks. For employed electricians, this often means
                overtime and long hours. For self-employed electricians, this is peak earning
                season. The trade-off is that summer is the worst time for intensive study &mdash;
                you are tired, work is demanding, and daylight hours that could be spent studying
                are consumed by work.
              </p>

              <p>
                <strong>Winter (November&ndash;February)</strong> is typically quieter, especially
                for domestic and new-build work. Shorter days, worse weather, and clients delaying
                non-urgent work lead to reduced demand. For self-employed electricians, this can
                mean financial pressure as income drops. However, winter is an excellent time for
                study and professional development. With fewer billable hours available, the
                opportunity cost of studying is lower. Many electricians use winter to complete
                qualifications, attend training courses, or prepare for exams. The emotional
                challenge of winter is managing the income drop while investing time in activities
                (study) that do not generate immediate revenue. This requires financial planning and
                a long-term perspective.
              </p>

              <p>
                <strong>Financial year-end (April)</strong> and{' '}
                <strong>tax return season (January)</strong> create predictable administrative
                burdens for self-employed electricians. Goals that require significant time
                (intensive study, major projects) should avoid these periods if possible. For
                employed electricians, the rhythms are less pronounced but still present: December
                is often slow due to Christmas shutdown, while March and September (end of financial
                quarters for many businesses) can see increased commercial work. When setting
                medium-term goals with 6&ndash;12 month deadlines, consider the seasonal pattern. A
                goal to complete a qualification by December (after a summer of long working hours)
                may be harder to achieve than a goal to complete by April (after a winter of focused
                study).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Seasonal Goal Planning Strategy
                </p>
                <p className="text-base text-white leading-relaxed">
                  Use summer for earning and light maintenance learning (podcasts, short videos,
                  revision). Use winter for deep study and qualification completion. Set your most
                  ambitious study goals with deadlines in late winter or early spring (February,
                  March, April) when work is quieter and focus is easier. This seasonal alignment
                  reduces friction and increases achievement rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Review Cycles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Review Cycles: Monthly and Quarterly
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goal-setting is not a one-time event; it is an ongoing process of setting,
                executing, reviewing, and adjusting. Without regular review, goals become
                disconnected from behaviour. You set goals in January with good intentions, but by
                March, daily life has reasserted itself and the goals are forgotten. The antidote is
                a structured review cycle: <strong>monthly reviews</strong> to assess progress and
                adjust tactics, and <strong>quarterly planning sessions</strong> to set new
                short-term goals aligned with medium and long-term direction.
              </p>

              <p>
                <strong>Monthly review (1 hour, last Sunday of each month):</strong> Block one hour
                at the end of each month to review the previous month and plan the next. Ask
                yourself: (1) What did I achieve this month? (List completed goals and milestones.)
                (2) What obstacles did I encounter, and how did I handle them? (3) What activity
                goals did I meet, and which did I miss? (4) Am I still committed to my current
                goals, or has something changed? (5) What are my top 3 priorities for next month?
                This review takes less than one hour but provides critical feedback. It allows you
                to catch drift early (you planned to study 10 hours this month but only studied 3
                &mdash; why?), celebrate progress (you completed 15 EICRs, exceeding your goal of
                10), and adjust course before small issues become large problems.
              </p>

              <p>
                <strong>
                  Quarterly planning (2&ndash;3 hours, first weekend of January, April, July,
                  October):
                </strong>{' '}
                Every three months, block 2&ndash;3 hours for deeper planning. Review the past
                quarter: What major milestones did I achieve? What goals did I abandon, and why?
                What lessons did I learn? Then plan the next quarter: What are my top 1&ndash;3
                short-term goals for the next 3 months? How do these support my medium-term goals?
                What specific activity goals (weekly behaviours) will drive these goals? What
                obstacles do I anticipate, and how will I handle them? Quarterly planning creates a
                rhythm that prevents both stagnation (goals never change) and chaos (goals change
                every week). Three months is long enough to achieve meaningful progress but short
                enough to maintain focus and urgency.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sample Monthly Review Questions
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What did I achieve this month that I am proud of?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Which activity goals did I meet consistently? (e.g., studied 3x per week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Which activity goals did I miss, and what got in the way? (work overload?
                      illness? poor planning?)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Am I on track for my quarterly goals, or do I need to adjust my timeline or
                      approach?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What are my top 3 priorities for next month?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section introduced time horizons and goal cascading as the structure for
                coherent goal systems. The points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Three horizons</strong> provide structure: short-term (0&ndash;3 months)
                    for action, medium-term (3&ndash;12 months) for milestones, long-term
                    (1&ndash;5+ years) for direction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Goal cascading</strong> ensures short-term effort compounds towards
                    long-term vision. Every short-term goal should support a medium-term goal; every
                    medium-term goal should support the long-term direction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Planning fallacy</strong> causes systematic underestimation of time
                    required. Use reference class forecasting (how long did this take others?) to
                    set realistic deadlines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Seasonal planning</strong> aligns goals with the electrical trade
                    calendar: summer for earning, winter for studying, avoiding April (tax) and
                    December (shutdown).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Monthly reviews</strong> (1 hour) and
                    <strong> quarterly planning</strong> (2&ndash;3 hours) create a feedback loop
                    that keeps goals aligned and actionable.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore
                  career goals specific to electricians &mdash; the JIB pathway, ECS cards, City
                  &amp; Guilds qualifications, professional registration, and specialisation paths.
                  Time horizons give you the structure; career pathways give you the map.
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
            <Link to="../gs-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-2-section-3">
              Next: Career Goals for Electricians
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
