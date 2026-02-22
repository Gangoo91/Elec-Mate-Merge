import { ArrowLeft, Layers, CheckCircle } from 'lucide-react';
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
    id: 'gs-1-3-check1',
    question:
      'An apprentice electrician writes the goal: &ldquo;I want to get better at electrical work.&rdquo; According to George T. Doran&rsquo;s SMART framework, what is the PRIMARY problem with this goal?',
    options: [
      'It is too ambitious and should be scaled down',
      'It lacks specificity &mdash; &ldquo;get better at electrical work&rdquo; is too vague to measure, action, or track progress against',
      'It is a process goal when it should be an outcome goal',
      'It does not include a financial target',
    ],
    correctIndex: 1,
    explanation:
      'Doran&rsquo;s SMART framework (1981) emphasises that goals must be Specific, Measurable, Achievable, Relevant, and Time-bound. The statement &ldquo;I want to get better at electrical work&rdquo; fails primarily on the Specific criterion. &ldquo;Get better&rdquo; is subjective and undefined &mdash; better at what? Installation? Testing? Theory? Fault finding? Without specificity, the apprentice has no clear direction, no way to measure progress, and no basis for creating an action plan. A SMART rewrite might be: &ldquo;I will improve my cable sizing calculations by completing one worked example every weekday evening for the next four weeks, aiming to answer practice questions with at least 80% accuracy.&rdquo; This version is specific (cable sizing calculations), measurable (80% accuracy), achievable (one example per weekday), relevant (directly applicable to electrical qualifications), and time-bound (four weeks).',
  },
  {
    id: 'gs-1-3-check2',
    question:
      'James Clear argues that the most powerful form of behaviour change happens when you shift from outcome-based goals to identity-based goals. In the context of an electrician&rsquo;s career, which of the following best represents an identity-based goal?',
    options: [
      '&ldquo;I will pass the 2391 Inspection &amp; Testing exam by December&rdquo;',
      '&ldquo;I will study for one hour every evening after work&rdquo;',
      '&ldquo;I am the kind of professional who continuously invests in learning and maintains the highest technical standards&rdquo;',
      '&ldquo;I will earn &pound;50,000 this year&rdquo;',
    ],
    correctIndex: 2,
    explanation:
      'James Clear&rsquo;s identity-based habits concept (from Atomic Habits) proposes three layers of behaviour change: outcomes (what you get), processes (what you do), and identity (who you are). Most people start with outcome goals (&ldquo;pass the exam&rdquo;, &ldquo;earn more money&rdquo;) and try to change their behaviour to match. Clear argues this is backwards. The most lasting change starts with identity &mdash; deciding the type of person you want to be, then proving it to yourself with small actions. Option A is an outcome goal (a result you want). Option B is a process goal (a behaviour you perform). Option D is another outcome goal. Option C is an identity goal &mdash; it defines who you are as a person and professional. Once you genuinely see yourself as &ldquo;someone who continuously invests in learning&rdquo;, the studying, the exam preparation, and the CPD follow naturally because they are consistent with your identity.',
  },
  {
    id: 'gs-1-3-check3',
    question:
      'Stephen Covey&rsquo;s principle &ldquo;Begin with the end in mind&rdquo; suggests that effective goal planning should start from:',
    options: [
      'Your current situation and work outwards from there',
      'Whatever goal is most immediately achievable',
      'Your long-term vision of where you want to be, then work backwards to identify the milestones and daily actions needed to get there',
      'What your employer or training provider expects of you',
    ],
    correctIndex: 2,
    explanation:
      'Covey&rsquo;s Habit 2 from The 7 Habits of Highly Effective People (1989) states that all things are created twice &mdash; first in the mind (mental creation) and then in reality (physical creation). &ldquo;Begin with the end in mind&rdquo; means defining your destination before you start the journey. For an electrician, this means first envisioning where you want to be in 5 or 10 years &mdash; perhaps running your own NICEIC-approved business, or becoming a senior inspection engineer, or training the next generation. From that vision, you work backwards: What qualifications do I need? What experience must I gain? What contacts should I build? What should I be doing this month, this week, today? Without this end-to-mind approach, goal setting becomes reactive and fragmented &mdash; you chase whatever seems urgent rather than building towards a coherent long-term destination.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do I need to set goals for every area of my life, or just my career?',
    answer:
      'There is no obligation to set formal goals for every domain, but it is worth considering that career goals rarely exist in isolation. Your health, finances, relationships, and personal development all affect your ability to pursue professional objectives. Many goal-setting frameworks &mdash; including those by Stephen Covey and Brian Tracy &mdash; recommend setting goals across multiple life areas to maintain balance. For electricians, this might mean: a career goal (achieve Qualified Supervisor status within two years), a financial goal (build three months of emergency savings), a health goal (improve fitness to maintain energy on long site days), and a learning goal (read one technical book per quarter). The key is intentionality &mdash; not doing everything at once, but being deliberate about what you focus on rather than drifting.',
  },
  {
    question: 'What if I set SMART goals but still don&rsquo;t follow through?',
    answer:
      'This is one of the most common challenges in goal setting, and it usually points to one or more of these issues. First, the goal may not be personally meaningful &mdash; it might be something you feel you &ldquo;should&rdquo; do rather than genuinely want to do. Locke &amp; Latham&rsquo;s research shows that goal commitment is essential for performance. Second, you may have set outcome goals without process goals &mdash; knowing the destination but not the daily steps. Third, you may have set too many goals simultaneously, creating decision fatigue and diluting focus. Fourth, you may lack accountability &mdash; telling someone else about your goal and reporting progress significantly increases follow-through. Fifth, the goal may genuinely be too ambitious for your current circumstances, and you need to scale it down or adjust the timeline. The solution is usually to pick one high-priority goal, break it into small daily or weekly actions, and build an accountability mechanism.',
  },
  {
    question: 'Is it better to have one big goal or many small goals?',
    answer:
      'The research supports a layered approach rather than choosing exclusively one or the other. Having a single overarching long-term goal (&ldquo;Become an NICEIC Qualified Supervisor within three years&rdquo;) provides direction and purpose &mdash; what Covey calls &ldquo;beginning with the end in mind.&rdquo; But that big goal must be broken down into medium-term milestones (&ldquo;Pass the 2391 exam within six months&rdquo;) and small daily or weekly actions (&ldquo;Study for 45 minutes every weekday evening&rdquo;). Research by Locke &amp; Latham confirms that specific sub-goals enhance performance on complex, long-term tasks because they provide regular feedback and a sense of progress. The danger of only having a big goal is that it feels distant and overwhelming. The danger of only having small goals is that they lack strategic direction. The most effective approach is goal cascading: one clear long-term vision, a handful of medium-term milestones, and a short list of immediate daily actions.',
  },
  {
    question: 'How often should I review and adjust my goals?',
    answer:
      'Goal review is essential because circumstances change, you learn new information, and your priorities evolve. A practical review cadence for tradespeople is: daily (a quick check on your process goals &mdash; did I do the thing I committed to today?), weekly (a brief review of short-term goals &mdash; am I on track this week?), monthly (assess medium-term goals &mdash; am I progressing towards my quarterly milestones?), and quarterly (evaluate long-term alignment &mdash; is my overall direction still right?). Adjusting a goal is not failure &mdash; it is intelligent adaptation. If you set a goal to pass the 2391 by June but realise in March that you need more preparation time, moving it to September is not quitting, it is being realistic. What you should not do is constantly change goals without giving any of them sufficient time to produce results. The balance is between rigid adherence to a plan that is no longer working and restless goal-switching that never allows momentum to build.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'George T. Doran published his SMART goals framework in which year and in which publication?',
    options: [
      '1975 in the Harvard Business Review',
      '1981 in Management Review',
      '1989 in The 7 Habits of Highly Effective People',
      '1996 in Emotional Intelligence by Daniel Goleman',
    ],
    correctAnswer: 1,
    explanation:
      'George T. Doran published the SMART acronym in November 1981 in the journal Management Review, in a paper titled &ldquo;There&rsquo;s a S.M.A.R.T. Way to Write Management&rsquo;s Goals and Objectives.&rdquo; Doran was a consultant and former Director of Corporate Planning for Washington Water Power Company. His paper proposed that management goals should be Specific, Measurable, Assignable, Realistic, and Time-related. The acronym has since been widely adapted &mdash; &ldquo;Assignable&rdquo; is now commonly rendered as &ldquo;Achievable&rdquo; or &ldquo;Attainable&rdquo;, and &ldquo;Realistic&rdquo; as &ldquo;Relevant&rdquo; &mdash; but Doran&rsquo;s 1981 paper remains the original source. It is one of the most cited frameworks in personal and professional development worldwide.',
  },
  {
    id: 2,
    question:
      'Which of the following goals is BEST classified as a &ldquo;process goal&rdquo; rather than an outcome goal or identity goal?',
    options: [
      '&ldquo;I want to become an NICEIC Qualified Supervisor&rdquo;',
      '&ldquo;I will practise one cable sizing calculation every evening for the next 30 days&rdquo;',
      '&ldquo;I am someone who takes their professional development seriously&rdquo;',
      '&ldquo;I want to earn &pound;60,000 per year within three years&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'A process goal focuses on the specific behaviours and actions you will perform, regardless of the outcome. Option B (&ldquo;I will practise one cable sizing calculation every evening for the next 30 days&rdquo;) is a clear process goal because it defines a behaviour (practise cable sizing), a frequency (every evening), and a duration (30 days). You have full control over whether you do this or not, which makes process goals particularly powerful for building momentum and habits. Option A is an outcome goal &mdash; it describes a result you want to achieve. Option C is an identity goal &mdash; it describes who you want to be. Option D is also an outcome goal tied to a financial result. Research consistently shows that pairing outcome goals with process goals leads to better performance than setting outcome goals alone, because process goals direct daily behaviour and create a sense of progress even when the final outcome is still distant.',
  },
  {
    id: 3,
    question:
      'James Clear&rsquo;s identity-based habits framework argues that lasting behaviour change is most effectively driven by:',
    options: [
      'Setting bigger and more ambitious outcome goals',
      'Using willpower and discipline to force new behaviours',
      'Changing who you believe yourself to be, then aligning your habits with that identity',
      'Focusing exclusively on external rewards and incentives',
    ],
    correctAnswer: 2,
    explanation:
      'James Clear&rsquo;s framework in Atomic Habits (2018) identifies three layers of behaviour change: outcomes (results), processes (habits and systems), and identity (beliefs about yourself). He argues that most people attempt change from the outside in &mdash; starting with outcomes and hoping behaviour follows. The more effective approach is inside out &mdash; starting with identity. When you decide &ldquo;I am a professional who values continuous improvement&rdquo;, each study session, each course attended, and each technical book read becomes evidence that reinforces that identity. The behaviour becomes self-sustaining because it is consistent with who you believe yourself to be, not because of external motivation or willpower. For electricians, this means the shift from &ldquo;I should study for the 2391&rdquo; (outcome-driven, externally motivated) to &ldquo;I am someone who continually develops their technical knowledge&rdquo; (identity-driven, internally motivated).',
  },
  {
    id: 4,
    question:
      'An electrician sets the following goal: &ldquo;I will become better at my job this year.&rdquo; Which element of the SMART framework does this goal MOST clearly violate?',
    options: [
      'Time-bound &mdash; because &ldquo;this year&rdquo; is too vague a timeframe',
      'Measurable &mdash; because there is no way to quantify &ldquo;better at my job&rdquo;',
      'Specific &mdash; because &ldquo;better at my job&rdquo; could mean almost anything and does not identify a concrete area for improvement',
      'Achievable &mdash; because the goal is unrealistically ambitious',
    ],
    correctAnswer: 2,
    explanation:
      'While this goal also has problems with measurability, the most fundamental violation is Specificity. &ldquo;Better at my job&rdquo; is so broad that it provides no direction whatsoever. Better at what? Installation quality? Testing speed? Customer communication? Business management? Theoretical knowledge? Without specificity, you cannot create an action plan, measure progress, or know when you have achieved the goal. The goal actually does have a time element (&ldquo;this year&rdquo;), so Time-bound is partially addressed. Achievability is not the main issue &mdash; the goal is arguably too easy rather than too ambitious, because &ldquo;better&rdquo; could mean any marginal improvement. A SMART revision would be: &ldquo;I will achieve a first-time pass on the City &amp; Guilds 2391-52 Inspection &amp; Testing qualification by sitting the exam in October, completing all training modules and at least 10 practice inspections by September.&rdquo;',
  },
  {
    id: 5,
    question:
      'Stephen Covey&rsquo;s principle &ldquo;Begin with the end in mind&rdquo; is Habit 2 in The 7 Habits of Highly Effective People. Applied to an electrician&rsquo;s career planning, this principle means:',
    options: [
      'Focus only on what is immediately in front of you and do not worry about the future',
      'Define your long-term career vision first, then work backwards to identify the qualifications, experience, milestones, and daily actions needed to get there',
      'Set your goals based on what your employer or training provider tells you to do',
      'Wait until you have finished your apprenticeship before thinking about career goals',
    ],
    correctAnswer: 1,
    explanation:
      'Covey&rsquo;s &ldquo;Begin with the end in mind&rdquo; principle states that effective people start with a clear vision of their desired destination and then organise their activities to move towards it. For an electrician, this means asking: Where do I want to be in 5 or 10 years? Perhaps running a NICEIC-approved contracting business, or working as a senior inspection engineer, or lecturing at a college. From that vision, you work backwards: What qualifications will I need? What experience must I accumulate? What skills should I develop? What should I be doing this year, this month, this week? This backward-planning approach ensures that daily actions are strategically aligned with long-term objectives. Without it, electricians often spend years reacting to whatever work comes their way without building towards a coherent career destination. Covey draws from Viktor Frankl&rsquo;s insight that between stimulus and response there is a choice &mdash; and effective people choose proactively based on their values and vision.',
  },
  {
    id: 6,
    question: 'Goal cascading refers to the practice of:',
    options: [
      'Setting as many goals as possible across all areas of life simultaneously',
      'Abandoning goals that become too difficult and replacing them with easier ones',
      'Breaking a long-term goal down into medium-term milestones and short-term actions, so that daily behaviour is strategically connected to the ultimate objective',
      'Copying the goals of a successful mentor and applying them to your own career',
    ],
    correctAnswer: 2,
    explanation:
      'Goal cascading is the process of decomposing a large, long-term goal into progressively smaller and more immediate sub-goals, creating a clear pathway from daily action to ultimate achievement. For example, a long-term goal of &ldquo;Become an NICEIC Qualified Supervisor within three years&rdquo; cascades down into medium-term milestones (&ldquo;Pass 2391 within nine months&rdquo;, &ldquo;Complete 50 supervised inspections within 18 months&rdquo;, &ldquo;Pass QS assessment within 30 months&rdquo;) and then into short-term actions (&ldquo;Study Chapter 6 of GN3 this week&rdquo;, &ldquo;Complete two practice inspection schedules this fortnight&rdquo;). Cascading ensures that every small action is connected to the bigger picture, preventing the common problem of being busy without being productive. It also provides regular milestones for measuring progress and maintaining motivation, because the long-term goal alone can feel distant and abstract.',
  },
  {
    id: 7,
    question:
      'Locke &amp; Latham&rsquo;s Goal Setting Theory distinguishes between performance goals and mastery goals. Which of the following best describes a mastery goal?',
    options: [
      '&ldquo;I want to score higher than my colleagues on the end-of-module assessment&rdquo;',
      '&ldquo;I want to deeply understand three-phase power theory so that I can confidently explain it to others and apply it in complex fault-finding scenarios&rdquo;',
      '&ldquo;I want to complete the course as quickly as possible&rdquo;',
      '&ldquo;I want to receive a distinction on my City &amp; Guilds assessment&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'A mastery goal (also called a learning goal) is focused on developing deep competence and understanding in a subject area. It is intrinsically motivated &mdash; you pursue it because you want to genuinely understand and be able to apply the knowledge, not because you want to outperform others or achieve a specific grade. Option B is a mastery goal because it focuses on deep understanding, the ability to explain to others (which requires genuine comprehension), and practical application in complex scenarios. Options A and D are performance goals &mdash; they are about demonstrating competence relative to a standard or to other people. Option C is neither &mdash; it is about speed rather than depth. Locke &amp; Latham found that mastery goals are particularly effective for complex tasks because they encourage exploration, strategy development, and deeper engagement with the material. For electricians tackling challenging topics like three-phase systems, power factor, or circuit design, a mastery orientation leads to more robust and lasting understanding than a performance orientation.',
  },
  {
    id: 8,
    question:
      'Which of the following is the most common goal-setting mistake made by tradespeople, according to the patterns discussed in this section?',
    options: [
      'Setting goals that are too small and easily achievable',
      'Setting vague, unmeasurable goals that lack a clear action plan and timeline &mdash; such as &ldquo;I want to get ahead&rdquo; or &ldquo;I should do more training&rdquo;',
      'Setting too many specific goals with detailed action plans',
      'Reviewing goals too frequently and adjusting them too often',
    ],
    correctAnswer: 1,
    explanation:
      'The most prevalent goal-setting mistake among tradespeople is vagueness. Goals like &ldquo;I want to get ahead&rdquo;, &ldquo;I should do more training&rdquo;, or &ldquo;I want to earn more money&rdquo; are wishes, not goals. They lack the specificity, measurability, and time constraints that would make them actionable. Without a clear target, there is no way to create an action plan, measure progress, or know when you have succeeded. This vagueness often stems from never having been taught structured goal-setting methods &mdash; trade apprenticeships focus heavily on technical skills but rarely include explicit training in career planning and personal development. The fix is straightforward but requires discipline: convert vague wishes into SMART goals, break them into process goals (daily and weekly actions), and build a review mechanism. Option A is rarely the problem &mdash; most tradespeople under-set rather than over-set goals. Options C and D would actually be signs of good goal-setting practice, not mistakes.',
  },
];

export default function GSModule1Section3() {
  useSEO({
    title: 'Types of Goals | Goal Setting & Growth Module 1.3',
    description:
      'SMART goals, outcome vs process vs identity goals, short-term to long-term goal planning, goal cascading, and common goal-setting mistakes for electricians.',
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
            <Link to="../gs-module-1">
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
            <Layers className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Goals
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            SMART goals, outcome vs process vs identity goals, short-term to long-term planning,
            goal cascading, and common mistakes tradespeople make when setting goals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SMART goals</strong> are Specific, Measurable, Achievable, Relevant, and
                Time-bound &mdash; a framework from George T. Doran (1981)
              </li>
              <li>
                <strong>Outcome goals:</strong> The result you want (&ldquo;Pass the 2391&rdquo;)
              </li>
              <li>
                <strong>Process goals:</strong> The behaviour that gets you there (&ldquo;Study 1
                hour nightly&rdquo;)
              </li>
              <li>
                <strong>Identity goals:</strong> Who you become (&ldquo;I invest in professional
                development&rdquo;)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Direction:</strong> Different goal types serve different functions &mdash;
                you need all three
              </li>
              <li>
                <strong>Motivation:</strong> Identity goals sustain you when willpower fades
              </li>
              <li>
                <strong>Planning:</strong> Long-term vision cascades into daily action through
                structured goal types
              </li>
              <li>
                <strong>Clarity:</strong> SMART criteria turn vague wishes into concrete, actionable
                plans
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain all five elements of Doran&rsquo;s SMART framework and apply them to trade-specific goals',
              'Distinguish between outcome goals, process goals, and identity goals with real electrical trade examples',
              'Describe James Clear&rsquo;s identity-based habits concept and explain why identity goals drive lasting change',
              'Classify goals by time horizon: short-term (0&ndash;3 months), medium-term (3&ndash;12 months), and long-term (1&ndash;5+ years)',
              'Apply Covey&rsquo;s &ldquo;Begin with the end in mind&rdquo; principle to backwards-plan from a career vision',
              'Explain goal cascading and demonstrate how a long-term goal decomposes into milestones and daily actions',
              'Differentiate between performance goals and mastery goals (Locke &amp; Latham)',
              'Identify and avoid the most common goal-setting mistakes made by tradespeople',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: SMART Goals — George T. Doran (1981) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            SMART Goals &mdash; George T. Doran&rsquo;s Framework (1981)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SMART acronym is one of the most widely used goal-setting frameworks in the
                world, yet very few people know its origin. It was published by George T. Doran, a
                consultant and former Director of Corporate Planning for Washington Water Power
                Company, in a paper titled &ldquo;There&rsquo;s a S.M.A.R.T. Way to Write
                Management&rsquo;s Goals and Objectives&rdquo; in the November 1981 issue of
                Management Review. Doran&rsquo;s original formulation was: Specific, Measurable,
                Assignable, Realistic, and Time-related. Over the decades, the acronym has been
                adapted &mdash; &ldquo;Assignable&rdquo; is now commonly rendered as
                &ldquo;Achievable&rdquo; or &ldquo;Attainable&rdquo;, and &ldquo;Realistic&rdquo; as
                &ldquo;Relevant&rdquo; &mdash; but the core principle remains the same: goals must
                be precisely defined, not vague aspirations.
              </p>

              <p>
                Doran&rsquo;s framework addressed a problem he observed in corporate management:
                people set goals that were too vague to be useful. Statements like &ldquo;increase
                productivity&rdquo; or &ldquo;improve performance&rdquo; sound purposeful but
                provide no clear target, no way to measure progress, and no deadline for completion.
                This same problem is rampant in the trades. An apprentice says &ldquo;I want to get
                better at my job&rdquo;. A qualified electrician says &ldquo;I should do more
                training&rdquo;. A business owner says &ldquo;I want to grow the business&rdquo;.
                None of these are goals &mdash; they are wishes. The SMART framework transforms
                wishes into goals by requiring five essential elements.
              </p>

              <p>
                <strong>S &mdash; Specific:</strong> The goal must clearly define what will be
                accomplished. &ldquo;Get better at electrical work&rdquo; is not specific.
                &ldquo;Improve my cable sizing calculations to the point where I can consistently
                select the correct cable for a given circuit design&rdquo; is specific. Specificity
                forces you to think about exactly what you want to achieve, which areas you need to
                develop, and what success looks like. For electricians, this often means narrowing
                down from a broad area (&ldquo;testing&rdquo;) to a concrete skill (&ldquo;dead
                testing continuity of protective conductors on ring final circuits using the R1+R2
                method&rdquo;). The more specific the goal, the clearer the path to achieving it.
              </p>

              <p>
                <strong>M &mdash; Measurable:</strong> You must be able to track progress and know
                when the goal has been achieved. &ldquo;Get better at theory&rdquo; is not
                measurable. &ldquo;Score at least 75% on each of the next five practice papers for
                the City &amp; Guilds 2365 unit assessments&rdquo; is measurable. Measurability
                provides feedback &mdash; you can see whether you are progressing, stagnating, or
                falling behind. It also provides motivation, because reaching measurable milestones
                creates a sense of achievement. In the trades, measurable goals might include:
                number of practice tests completed, exam scores, number of supervised inspections
                carried out, number of client reviews received, revenue targets, or hours of CPD
                completed.
              </p>

              <p>
                <strong>A &mdash; Achievable (originally Assignable):</strong> The goal must be
                realistic given your current resources, time, knowledge, and circumstances. An
                apprentice in their first year setting the goal &ldquo;become an NICEIC Qualified
                Supervisor by June&rdquo; is not achievable &mdash; the qualification pathway takes
                years and requires significant experience. However, &ldquo;complete all Year 1
                college units with a pass grade by June&rdquo; is achievable. Setting unachievable
                goals is counterproductive because repeated failure destroys motivation and
                reinforces a fixed mindset (&ldquo;see, I knew I couldn&rsquo;t do it&rdquo;).
                Achievability does not mean easy &mdash; the goal should stretch you, but it must be
                within the realm of possibility given genuine effort and effective strategy.
              </p>

              <p>
                <strong>R &mdash; Relevant (originally Realistic):</strong> The goal must matter to
                you and align with your broader career direction. Studying for a qualification that
                you have no intention of using is not relevant, regardless of how SMART it is in
                other dimensions. Relevance ensures that the effort you invest is strategically
                directed. For an electrician who wants to specialise in inspection and testing,
                studying for the 2391 is highly relevant. Studying for a plumbing qualification is
                not (unless they are genuinely diversifying into multi-trade work). Relevance also
                connects to intrinsic motivation &mdash; goals that are personally meaningful are
                far more likely to be pursued with genuine effort than goals imposed by others.
              </p>

              <p>
                <strong>T &mdash; Time-bound (originally Time-related):</strong> The goal must have
                a deadline or timeframe. &ldquo;I want to pass the 2391 someday&rdquo; is not
                time-bound. &ldquo;I will sit the 2391 exam in October and pass with a first-time
                attempt&rdquo; is time-bound. Deadlines create urgency, prevent procrastination, and
                allow you to work backwards from the target date to plan your preparation schedule.
                Without a timeframe, goals drift indefinitely. Many electricians have had &ldquo;I
                should do the 2391&rdquo; on their mental to-do list for years without ever booking
                a course, precisely because there is no deadline creating momentum.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  SMART Goal Example &mdash; Apprentice Electrician
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Vague wish:</strong> &ldquo;I want to pass my exams.&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>SMART goal:</strong> &ldquo;I will achieve a pass grade (minimum 60%) on
                  my City &amp; Guilds 2365 Unit 202 (Principles of Electrical Science) assessment
                  in the March exam window, by completing all recommended textbook exercises,
                  attending every college session, and completing at least three full practice
                  papers under timed conditions before the exam date.&rdquo;
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mt-4">
                <p className="text-sm font-medium text-white mb-3">
                  SMART Goal Example &mdash; Experienced Electrician
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Vague wish:</strong> &ldquo;I should get into inspection work.&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>SMART goal:</strong> &ldquo;I will achieve the City &amp; Guilds 2391-52
                  Inspection &amp; Testing qualification by enrolling on a training course starting
                  in April, completing all coursework and practice inspections by August, and
                  sitting the final assessment in September &mdash; passing with a first-time
                  attempt by studying for a minimum of five hours per week throughout the
                  course.&rdquo;
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mt-4">
                <p className="text-sm font-medium text-white mb-3">
                  SMART Goal Example &mdash; Business Owner
                </p>
                <p className="text-base text-white leading-relaxed mb-3">
                  <strong>Vague wish:</strong> &ldquo;I want to grow my business.&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>SMART goal:</strong> &ldquo;I will increase my monthly revenue from
                  &pound;6,000 to &pound;8,000 by the end of Q3 this year, by securing at least
                  three new regular commercial maintenance clients through targeted outreach to
                  local property management companies, completing a minimum of five quotations per
                  week, and following up every quote within 48 hours.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Outcome Goals vs Process Goals vs Identity Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Outcome Goals vs Process Goals vs Identity Goals
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all goals serve the same function, and understanding the different types of
                goals is essential for effective planning. The most useful distinction is between
                three categories: <strong>outcome goals</strong>, <strong>process goals</strong>,
                and <strong>identity goals</strong>. Each operates at a different level of behaviour
                change, and the most effective goal-setters use all three in combination.
              </p>

              <p>
                <strong>Outcome goals</strong> describe a result you want to achieve. They are
                focused on the destination &mdash; the end product of your efforts. Examples from
                the electrical trades include: &ldquo;Pass the 2391 Inspection &amp; Testing
                exam&rdquo;, &ldquo;Get NICEIC approval&rdquo;, &ldquo;Earn &pound;50,000 this
                year&rdquo;, &ldquo;Win the AM2 practical assessment&rdquo;, &ldquo;Secure my first
                commercial contract&rdquo;. Outcome goals are useful because they provide a clear
                target and a sense of purpose. However, they have a significant limitation: you do
                not have complete control over the outcome. You can study diligently for the 2391
                and still fail if the exam paper is unusually difficult or you have a bad day. You
                can quote competitively and still lose the commercial contract. Outcome goals are
                necessary for direction, but relying on them exclusively makes you vulnerable to
                discouragement when results do not match effort.
              </p>

              <p>
                <strong>Process goals</strong> describe the specific behaviours and actions you will
                perform. They are focused on the journey &mdash; the daily and weekly activities
                that lead towards the outcome. Examples include: &ldquo;Study for one hour every
                evening after work&rdquo;, &ldquo;Complete two practice inspection schedules per
                week&rdquo;, &ldquo;Read one chapter of the IET On-Site Guide per week&rdquo;,
                &ldquo;Send five quotations to potential clients every Monday&rdquo;,
                &ldquo;Practise one cable sizing calculation every day&rdquo;. Process goals are
                powerful because you have almost complete control over them. You may not control
                whether you pass the exam, but you absolutely control whether you study tonight.
                Process goals build momentum, create habits, and provide a sense of daily progress
                even when the ultimate outcome is still distant. Research consistently shows that
                people who set process goals alongside outcome goals perform better than those who
                set outcome goals alone.
              </p>

              <p>
                <strong>Identity goals</strong> describe the type of person you want to become. They
                are focused not on what you do or what you get, but on who you are. Examples
                include: &ldquo;I am someone who invests in professional development&rdquo;,
                &ldquo;I am a craftsman who takes pride in quality workmanship&rdquo;, &ldquo;I am a
                business owner who delivers exceptional service&rdquo;, &ldquo;I am a lifelong
                learner who stays current with industry standards&rdquo;. Identity goals are the
                deepest and most powerful form of goal because they address the root cause of
                behaviour. When your actions are consistent with your identity, they feel natural
                and self-sustaining. When they conflict with your identity, they feel forced and are
                abandoned as soon as willpower runs out.
              </p>

              <p>
                The practical difference between these three types becomes clear in a worked
                example. Consider three electricians who all want to pass the 2391 exam:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Electrician A (outcome only):</strong> Sets the goal &ldquo;Pass the
                    2391 by December.&rdquo; Has no defined study schedule. Studies sporadically
                    when motivation strikes. Crams before the exam. Results are hit-or-miss.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Electrician B (outcome + process):</strong> Sets the outcome goal
                    &ldquo;Pass the 2391 by December&rdquo; and the process goal &ldquo;Study for 45
                    minutes every weekday evening and complete one practice paper every Saturday
                    morning.&rdquo; Studies consistently. Builds knowledge steadily. Much more
                    likely to pass.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Electrician C (identity + outcome + process):</strong> Starts from the
                    identity: &ldquo;I am a professional who continuously develops my technical
                    knowledge and qualifications.&rdquo; From that identity, the outcome goal (pass
                    the 2391) and the process goal (study schedule) follow naturally. Studying is
                    not a chore &mdash; it is an expression of who they are. Even after passing the
                    2391, they continue learning because it is part of their identity, not just a
                    means to an end.
                  </span>
                </li>
              </ul>

              <p>
                Electrician C has the best chance of not only passing the exam but of sustaining
                professional growth throughout their entire career. This is the insight at the heart
                of James Clear&rsquo;s identity-based habits concept, which we will examine next.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Quick Reference: Three Goal Types
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Outcome goal:</strong> What you want to achieve &mdash; &ldquo;Pass
                      the AM2 assessment&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Process goal:</strong> What you will do daily/weekly &mdash;
                      &ldquo;Practise consumer unit wiring for 30 minutes every Saturday&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Identity goal:</strong> Who you are becoming &mdash; &ldquo;I am a
                      skilled electrician who takes pride in high-quality, compliant work&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: James Clear's Identity-Based Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            James Clear&rsquo;s Identity-Based Habits
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                James Clear, author of Atomic Habits (2018), provides one of the most compelling
                frameworks for understanding why identity goals are so powerful. Clear proposes that
                there are three layers of behaviour change, visualised as concentric circles:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Outer layer &mdash; Outcomes:</strong> The results you want. Changing
                    your outcomes means changing what you get. (&ldquo;I passed the exam&rdquo;,
                    &ldquo;I earned &pound;50k&rdquo;, &ldquo;I got the contract&rdquo;)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Middle layer &mdash; Processes:</strong> The habits and systems you
                    follow. Changing your processes means changing what you do. (&ldquo;I study
                    every evening&rdquo;, &ldquo;I send quotations every Monday&rdquo;, &ldquo;I
                    read technical updates weekly&rdquo;)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Inner layer &mdash; Identity:</strong> Your beliefs about yourself.
                    Changing your identity means changing who you are. (&ldquo;I am a professional
                    who invests in learning&rdquo;, &ldquo;I am someone who follows through on
                    commitments&rdquo;)
                  </span>
                </li>
              </ul>

              <p>
                Clear argues that most people attempt behaviour change from the outside in. They
                start with an outcome (&ldquo;I want to pass the 2391&rdquo;), then try to build
                processes to achieve it (study schedule), relying on motivation and discipline to
                maintain those processes. This works for a while, but when motivation fades &mdash;
                as it always does &mdash; the processes collapse and the outcome becomes unlikely.
                This is why so many New Year&rsquo;s resolutions fail by February: the motivation
                spike fades, and without a deeper anchor, behaviour reverts to its default.
              </p>

              <p>
                The more effective approach, Clear argues, is to change from the inside out. Start
                by deciding the type of person you want to be. Not the outcome you want, but the
                identity you want to hold. Then use small actions as evidence to build that
                identity. Every time you sit down to study, you are casting a vote for the identity
                &ldquo;I am someone who develops their skills&rdquo;. Every time you skip studying,
                you are casting a vote against it. No single vote is decisive &mdash; identity is
                built through the accumulation of many small actions over time. But the direction
                matters.
              </p>

              <p>
                For electricians, this framework explains a pattern that many will recognise. The
                electricians who consistently upskill, pursue qualifications, stay current with
                regulations, and grow their careers are not necessarily more disciplined or more
                talented. They have a different identity. They see themselves as professionals who
                continuously develop &mdash; and their behaviour follows from that identity.
                Contrast this with the electrician who sees themselves as &ldquo;just a
                sparks&rdquo; who does the job for a wage. This identity limits aspiration and makes
                professional development feel like an imposition rather than an expression of self.
              </p>

              <p>
                The practical application of Clear&rsquo;s framework for goal setting is this:
                before you set outcome goals or process goals, ask yourself who you want to become.
                What type of electrician do you want to be? What type of professional? What type of
                business owner? Once you have clarity on identity, the goals and habits align
                naturally. The identity provides the &ldquo;why&rdquo; behind the &ldquo;what&rdquo;
                and the &ldquo;how&rdquo;.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Identity Statements for Electricians at Different Career Stages
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Apprentice:</strong> &ldquo;I am a dedicated apprentice who treats
                      every day on site and every college session as an opportunity to improve my
                      skills and knowledge.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Newly qualified:</strong> &ldquo;I am a competent electrician who
                      takes responsibility for the quality and safety of every installation I work
                      on, and who actively seeks to expand my capabilities.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Experienced electrician:</strong> &ldquo;I am a technical professional
                      who stays current with standards, mentors others, and continually pursues
                      mastery in my chosen specialisation.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Business owner:</strong> &ldquo;I am a professional business leader
                      who builds a reputation on quality, compliance, and reliability &mdash; and
                      who invests in both my team and my own development.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Short-Term, Medium-Term, and Long-Term Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Short-Term, Medium-Term, and Long-Term Goals
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goals can also be classified by their time horizon. This classification matters
                because different timeframes serve different psychological and practical functions.
                Short-term goals create momentum and quick wins. Medium-term goals provide
                meaningful milestones. Long-term goals provide strategic direction and purpose. An
                effective goal-setting system uses all three, with each timeframe feeding into the
                next.
              </p>

              <p>
                <strong>Short-term goals (0&ndash;3 months)</strong> are immediate, actionable steps
                that you can start today or this week. They are small enough to be non-threatening
                but meaningful enough to create forward progress. Because they have tight deadlines,
                they resist procrastination. For electricians, short-term goals typically involve
                specific, concrete actions:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>&ldquo;Complete my AM2 booking by the end of this week&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Buy a copy of BS 7671 and read the first three chapters within two
                    weeks&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Complete three practice dead-test sequences under supervision this
                    month&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Set up a business bank account and register as self-employed with HMRC
                    within the next fortnight&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Research three 2391 training providers and compare prices and dates by
                    Friday&rdquo;
                  </span>
                </li>
              </ul>

              <p>
                Short-term goals are the engine of progress. They provide immediate feedback (you
                either did or did not complete the action), build confidence through accomplishment,
                and create the daily habits that compound into significant achievement over time.
                Without short-term goals, long-term ambitions remain abstract and unactioned.
              </p>

              <p>
                <strong>Medium-term goals (3&ndash;12 months)</strong> are qualification-level or
                project-level goals that represent meaningful milestones in your career journey.
                They are large enough to require sustained effort but close enough to feel real and
                motivating. Medium-term goals often involve completing a course, gaining a
                qualification, or achieving a significant business milestone:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Pass the 2391-52 Inspection &amp; Testing exam within six months&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Get my first 10 clients as a newly self-employed electrician within nine
                    months&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Complete the EAL Level 3 Electrotechnical qualification with a merit or
                    distinction by the end of the academic year&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Gain competence in EV charger installation by completing a certified
                    course and installing at least five units under supervision within eight
                    months&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Build my domestic testing portfolio to include 20 completed EICRs within
                    12 months&rdquo;
                  </span>
                </li>
              </ul>

              <p>
                Medium-term goals provide the framework for your short-term goals. If your
                medium-term goal is &ldquo;pass the 2391 in six months&rdquo;, your short-term goals
                this week might include &ldquo;enrol on the course&rdquo;, &ldquo;order the study
                materials&rdquo;, and &ldquo;set up a study schedule&rdquo;. Each short-term action
                is meaningful because it serves a larger purpose.
              </p>

              <p>
                <strong>Long-term goals (1&ndash;5+ years)</strong> are career-defining goals that
                represent your ultimate professional destination &mdash; or at least the next major
                chapter of it. They are the big-picture vision that gives meaning and direction to
                everything else. Long-term goals require patience, persistence, and strategic
                planning:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Become an NICEIC Qualified Supervisor within three years&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>&ldquo;Achieve IET EngTech registration within two years&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Establish a profitable electrical contracting business with two employed
                    electricians within five years&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Transition from domestic installation to commercial and industrial work
                    as a senior electrician within three years&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    &ldquo;Complete an HNC in Electrical and Electronic Engineering and move into a
                    design or consultancy role within four years&rdquo;
                  </span>
                </li>
              </ul>

              <p>
                Long-term goals are your compass. They do not tell you what to do today, but they
                ensure that what you do today is heading in the right direction. Without long-term
                goals, you risk spending years being busy but not building towards anything
                meaningful &mdash; what Stephen Covey describes as &ldquo;climbing the ladder of
                success only to find it was leaning against the wrong wall&rdquo;.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Time Horizon Connection
                </p>
                <p className="text-base text-white leading-relaxed">
                  Long-term goals answer the question: <strong>Where am I going?</strong>{' '}
                  Medium-term goals answer:{' '}
                  <strong>What milestones must I reach along the way?</strong> Short-term goals
                  answer: <strong>What must I do this week?</strong> All three are essential.
                  Long-term goals without short-term actions remain dreams. Short-term actions
                  without long-term direction are busy work. The most effective electricians hold a
                  clear long-term vision while executing daily and weekly actions that move them
                  towards it &mdash; consistently, patiently, and deliberately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Begin with the End in Mind — Stephen Covey */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Begin with the End in Mind &mdash; Stephen Covey
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stephen Covey&rsquo;s The 7 Habits of Highly Effective People (1989) remains one of
                the most influential personal development books ever written, with over 40 million
                copies sold worldwide. Habit 2 &mdash; &ldquo;Begin with the end in mind&rdquo;
                &mdash; is directly relevant to goal setting for tradespeople. Covey draws from the
                idea that all things are created twice: first in the mind (the mental creation or
                design phase) and then in reality (the physical creation or execution phase). A
                building must be designed before it can be built. A circuit must be planned before
                it can be installed. In the same way, your career must be envisioned before it can
                be achieved.
              </p>

              <p>
                &ldquo;Begin with the end in mind&rdquo; means starting your goal-setting process
                not from where you are today, but from where you want to end up. Instead of asking
                &ldquo;What should I do next?&rdquo;, ask &ldquo;Where do I want to be in five
                years?&rdquo; and then work backwards. This backward-planning approach ensures that
                every action you take is purposefully connected to your ultimate destination. It
                prevents the common trap of drifting &mdash; taking whatever opportunity appears
                without strategic consideration of whether it moves you closer to or further from
                your long-term goals.
              </p>

              <p>
                For an electrician, this might work as follows. Start with the five-year vision:
                &ldquo;In five years, I want to be running my own NICEIC-approved electrical
                contracting business, specialising in commercial installation and inspection, with a
                team of three employed electricians and annual turnover of &pound;250,000.&rdquo;
                Now work backwards:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Year 4&ndash;5:</strong> Scale the business &mdash; hire a second and
                    third electrician, develop systems for quoting, scheduling, and quality control,
                    build commercial client relationships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Year 3&ndash;4:</strong> Achieve NICEIC Qualified Supervisor status,
                    hire first employee, transition from sole trader to limited company
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Year 2&ndash;3:</strong> Build a commercial client base, complete the
                    2391 Inspection &amp; Testing qualification, gain experience in commercial
                    installations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Year 1&ndash;2:</strong> Establish the business (register, get
                    insurance, join a competent person scheme), build a reputation through quality
                    domestic work, complete the 18th Edition qualification
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> Research NICEIC requirements, set up a business
                    bank account, create a simple website, book the 18th Edition course
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>This week:</strong> Write down the five-year vision, research three 18th
                    Edition course providers, calculate start-up costs
                  </span>
                </li>
              </ul>

              <p>
                This backward-planning approach transforms an ambitious long-term vision into a
                concrete sequence of achievable steps. Each step is connected to the one above it
                and the one below it, creating a coherent ladder from today&rsquo;s actions to the
                five-year destination. Without this approach, the same electrician might spend five
                years doing reactive, unplanned work &mdash; always busy, never building.
              </p>

              <p>
                Covey also emphasises the importance of a personal mission statement &mdash; a
                written declaration of who you want to be and what you want to accomplish. For
                electricians, this might be as simple as: &ldquo;I am committed to building a
                successful, quality-focused electrical business that I am proud of, while
                continuously developing my technical skills and treating every client with integrity
                and professionalism.&rdquo; This statement becomes the lens through which you
                evaluate every decision: Does this opportunity move me towards my mission, or away
                from it?
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Exercise: Your Five-Year Backward Plan
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Write down where you want to be professionally in five years. Be as specific as
                  possible &mdash; what role, what qualifications, what income, what type of work,
                  what lifestyle. Then work backwards through Year 4, Year 3, Year 2, Year 1, this
                  quarter, this month, this week, and today. What is the single most important
                  action you could take today that would move you one step closer to that five-year
                  vision? That is your starting point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Goal Cascading */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Goal Cascading &mdash; From Vision to Daily Action
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goal cascading is the practice of decomposing a high-level strategic goal into
                progressively smaller, more immediate sub-goals until you arrive at specific daily
                and weekly actions. The concept is widely used in organisational management (where
                company-level objectives cascade down through departments to individual performance
                targets) but is equally powerful for personal career planning. The purpose is to
                create a clear, traceable line from your grandest ambition to the thing you do
                today.
              </p>

              <p>
                Without goal cascading, people tend to operate at one extreme or the other. Some
                people only have big, abstract goals (&ldquo;I want to be successful&rdquo;) but
                never translate them into specific actions, so they remain permanently aspirational
                and never achieved. Others only have small, immediate tasks (&ldquo;I need to finish
                this job today&rdquo;) but never connect them to a larger purpose, so they feel like
                they are on a treadmill &mdash; working hard but not going anywhere. Goal cascading
                bridges the gap by making every small action strategically meaningful and every
                large ambition practically actionable.
              </p>

              <p>
                Here is a worked example of goal cascading for an electrician seeking to become an
                NICEIC Qualified Supervisor:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Long-term goal (3 years):</strong> Achieve NICEIC Qualified Supervisor
                    status and begin supervising electrical work under my own name
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Medium-term milestone 1 (6 months):</strong> Complete the City &amp;
                    Guilds 2391-52 Inspection &amp; Testing qualification
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Medium-term milestone 2 (12 months):</strong> Complete 50 supervised
                    inspections and build a comprehensive testing portfolio
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Medium-term milestone 3 (24 months):</strong> Gain commercial
                    installation and testing experience; complete IET Wiring Regulations course
                    (current amendment)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Medium-term milestone 4 (30 months):</strong> Apply for NICEIC QS
                    assessment; prepare portfolio of evidence and technical knowledge
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Short-term goal (this month):</strong> Research and enrol on a 2391
                    course starting next quarter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>This week:</strong> Compare three 2391 training providers (price, dates,
                    location, pass rates); read the NICEIC QS entry requirements on their website
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Today:</strong> Spend 30 minutes reading the NICEIC website&rsquo;s QS
                    information page and writing down the qualification and experience requirements
                  </span>
                </li>
              </ul>

              <p>
                Notice how the 30-minute task today is directly connected, through a clear chain of
                sub-goals, to the three-year objective. This is the power of cascading &mdash; it
                makes even the smallest action feel purposeful because you can see how it connects
                to the bigger picture. It also makes the biggest ambition feel achievable because
                you can see the concrete steps that lead to it.
              </p>

              <p>
                Goal cascading also provides natural checkpoints for reviewing progress. At each
                milestone, you can assess: Am I on track? Do I need to adjust my timeline? Have my
                priorities changed? Is this still the right long-term direction? This regular review
                process prevents the common problem of setting goals and then forgetting about them
                until the deadline has passed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Cascading Principle</p>
                <p className="text-base text-white leading-relaxed">
                  Every long-term goal should cascade down to a specific action you can take today.
                  If you cannot identify what to do today in service of your long-term goal, the
                  cascade is incomplete &mdash; you need to break it down further. If your daily
                  actions cannot be traced upwards to a meaningful long-term objective, you may be
                  busy without being productive. Goal cascading is the bridge between dreaming and
                  doing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Performance Goals vs Mastery Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Performance Goals vs Mastery Goals &mdash; Locke &amp; Latham
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Edwin Locke and Gary Latham, the researchers behind Goal Setting Theory (which we
                examined in Section 2), also drew attention to an important distinction between two
                orientations in goal setting: <strong>performance goals</strong> and{' '}
                <strong>mastery goals</strong> (sometimes called learning goals). This distinction
                is particularly relevant for electricians because it affects how you approach
                complex topics and challenging skills.
              </p>

              <p>
                <strong>Performance goals</strong> are focused on demonstrating competence relative
                to a standard or to other people. The aim is to prove ability. Examples include:
                &ldquo;Get the highest score in the class on the end-of-module test&rdquo;,
                &ldquo;Complete this installation faster than last time&rdquo;, &ldquo;Pass the exam
                with distinction&rdquo;, &ldquo;Win the Screwfix Trade Apprentice of the Year
                award&rdquo;. Performance goals are about the external marker of success &mdash; the
                grade, the ranking, the recognition.
              </p>

              <p>
                <strong>Mastery goals</strong> are focused on developing deep competence and genuine
                understanding. The aim is to improve ability. Examples include: &ldquo;Understand
                three-phase power theory well enough to explain it clearly to an apprentice&rdquo;,
                &ldquo;Develop my fault-finding skills to the point where I can systematically
                diagnose any circuit fault I encounter&rdquo;, &ldquo;Master the cable selection
                process in Appendix 4 of BS 7671 so thoroughly that I can apply it without referring
                to the tables&rdquo;. Mastery goals are about the internal reality of competence
                &mdash; what you can actually do, understand, and apply.
              </p>

              <p>
                Both types of goals have their place. Performance goals can be motivating, provide
                clear benchmarks, and encourage competitive effort. However, Locke &amp;
                Latham&rsquo;s research found that for complex tasks &mdash; tasks that require
                learning new strategies, adapting to unfamiliar situations, or developing deep
                understanding &mdash; mastery goals consistently outperform performance goals. The
                reason is that performance goals can lead to counterproductive behaviours: focusing
                on looking competent rather than becoming competent, avoiding challenging material
                that might lower your score, using surface-level study strategies (memorisation)
                rather than deep strategies (understanding), and giving up on topics that threaten
                your performance record.
              </p>

              <p>
                For electricians, this has practical implications. An apprentice studying for the
                EAL Level 3 assessments might set a performance goal: &ldquo;Pass every unit first
                time.&rdquo; This sounds positive, but it can lead to surface-level revision focused
                on passing the test rather than genuinely understanding the material. Compare this
                with a mastery goal: &ldquo;Understand electrical science deeply enough to apply it
                on site &mdash; I want to genuinely know why we use certain cable sizes, not just
                memorise the formula for the exam.&rdquo; The mastery-oriented apprentice is more
                likely to develop the kind of robust, transferable knowledge that makes a genuinely
                competent electrician, even if they occasionally score lower on individual tests
                while grappling with difficult material.
              </p>

              <p>
                The most effective approach combines both: set performance goals for motivation and
                accountability (&ldquo;Pass the 2391 by October&rdquo;) and mastery goals for
                learning depth (&ldquo;Genuinely understand the inspection and testing process well
                enough to carry out compliant EICRs independently&rdquo;). The performance goal
                provides the deadline and external motivation; the mastery goal ensures that you are
                building real competence, not just collecting certificates.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Performance vs Mastery: Side by Side
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Performance:</strong> &ldquo;Pass the 2391 exam&rdquo; &bull;{' '}
                      <strong>Mastery:</strong> &ldquo;Understand inspection and testing deeply
                      enough to inspect any domestic or commercial installation competently and
                      confidently&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Performance:</strong> &ldquo;Get the best mark in the class&rdquo;
                      &bull; <strong>Mastery:</strong> &ldquo;Understand the theory well enough to
                      teach it to someone else&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Performance:</strong> &ldquo;Complete installations faster than my
                      colleagues&rdquo; &bull; <strong>Mastery:</strong> &ldquo;Develop the skill to
                      produce consistently high-quality, fully compliant installations&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Common Goal-Setting Mistakes for Tradespeople */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Common Goal-Setting Mistakes for Tradespeople
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding goal types is important, but equally important is recognising the
                common mistakes that prevent goals from being effective. The following mistakes are
                especially prevalent among electricians and tradespeople, often because formal
                goal-setting skills are rarely taught in trade education.
              </p>

              <p>
                <strong>Mistake 1: Goals that are too vague.</strong> This is the most common
                problem. &ldquo;I want to get ahead&rdquo;, &ldquo;I should do more training&rdquo;,
                &ldquo;I want to earn more money&rdquo; &mdash; these are wishes, not goals. They
                provide no specific target, no way to measure progress, and no basis for an action
                plan. The fix is to apply the SMART framework: convert every vague aspiration into a
                specific, measurable, achievable, relevant, and time-bound goal. &ldquo;I should do
                more training&rdquo; becomes &ldquo;I will complete the City &amp; Guilds 2391-52
                qualification by October by enrolling on a course in April and studying for a
                minimum of five hours per week.&rdquo;
              </p>

              <p>
                <strong>Mistake 2: Goals that are too ambitious without a plan.</strong> Setting a
                massive goal without breaking it into steps is a recipe for overwhelm and inaction.
                &ldquo;I want to start my own electrical business&rdquo; is an admirable long-term
                goal, but without sub-goals and milestones, it feels so large and complex that you
                do not know where to begin, so you do not begin at all. The fix is goal cascading:
                decompose the big goal into medium-term milestones and short-term actions until you
                arrive at something you can do today.
              </p>

              <p>
                <strong>Mistake 3: Goals that are not personally meaningful.</strong> Setting goals
                because you think you &ldquo;should&rdquo; &mdash; because your employer expects it,
                because your mate did it, because social media says you should &mdash; leads to weak
                commitment and poor follow-through. Locke &amp; Latham&rsquo;s research confirms
                that goal commitment is a critical moderator of the goal&ndash;performance
                relationship. If you do not genuinely care about the goal, you will not sustain the
                effort required to achieve it. The fix is to connect every goal to your personal
                values and identity. Ask: Why does this goal matter to me? How does it connect to
                the life and career I genuinely want?
              </p>

              <p>
                <strong>Mistake 4: Setting only outcome goals without process goals.</strong> Many
                electricians set a destination (&ldquo;pass the 2391&rdquo;) but not a route
                (specific study schedule, practice activities, review methods). Without process
                goals, outcome goals depend entirely on sporadic motivation, which is unreliable.
                The fix is to pair every outcome goal with at least one process goal that defines
                the regular behaviour needed to reach the outcome.
              </p>

              <p>
                <strong>Mistake 5: Setting too many goals at once.</strong> Attempting to achieve
                five or six major goals simultaneously dilutes focus, creates decision fatigue, and
                leads to mediocre progress on everything rather than strong progress on anything.
                Research on willpower and cognitive load supports the principle of focus: you are
                better off pursuing one or two key goals with full attention than spreading yourself
                across many. The fix is ruthless prioritisation: identify the one or two goals that
                will have the greatest impact on your career right now, and focus on those until
                they are achieved or well-established as habits.
              </p>

              <p>
                <strong>Mistake 6: Confusing activity goals with achievement goals.</strong>
                &ldquo;Attend a training course&rdquo; is an activity goal &mdash; you can attend a
                course without learning anything meaningful. &ldquo;Achieve the qualification and be
                able to apply the knowledge independently on site&rdquo; is an achievement goal
                &mdash; it requires genuine competence, not just attendance. Many electricians
                collect CPD certificates and training attendance records without ever reflecting on
                whether they actually learned anything or changed their practice. The fix is to
                define goals in terms of capability, not activity. Ask: What will I be able to do
                after achieving this goal that I cannot do now?
              </p>

              <p>
                <strong>Mistake 7: No review mechanism.</strong> Setting a goal and then never
                reviewing it is almost as bad as not setting one at all. Life changes, priorities
                shift, and goals need to be adjusted. Without regular review, goals become stale and
                disconnected from your current reality. The fix is a simple review cadence: daily
                (did I do my process goals?), weekly (am I on track?), monthly (is my direction
                still right?), and quarterly (do I need to adjust my medium-term milestones?).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Activity vs Achievement Trap
                </p>
                <p className="text-base text-white leading-relaxed">
                  Be honest with yourself: are your goals about doing things (attending courses,
                  buying books, watching videos) or about achieving things (gaining competence,
                  passing assessments, applying knowledge on site)? Activity goals feel productive
                  but can mask a lack of genuine progress. Achievement goals are harder and less
                  comfortable, but they lead to real capability. The electrician who reads GN3 cover
                  to cover but never practises an actual inspection has achieved an activity goal,
                  not an achievement goal. The electrician who completes 20 practice inspections
                  under supervision has achieved something real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Worked Examples — SMART Goals by Career Stage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Worked Examples &mdash; SMART Goals by Career Stage
          </h2>
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To bring all of the concepts in this section together, here are comprehensive worked
                examples showing how SMART goals, goal types, time horizons, and goal cascading
                apply to electricians at four different career stages. Each example includes an
                identity statement, a long-term goal, medium-term milestones, short-term actions,
                and process goals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-3">
                  Example 1: First-Year Apprentice
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Identity:</strong> &ldquo;I am a dedicated apprentice who treats every
                      learning opportunity seriously and builds strong foundations for a long
                      career.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Long-term goal (4 years):</strong> Complete my Level 3 apprenticeship,
                      pass the AM2 practical assessment, and qualify as a competent electrician with
                      a strong foundation in both installation and testing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Medium-term milestone (6 months):</strong> Pass all Year 1 college
                      unit assessments with a minimum 65% score, demonstrating genuine understanding
                      rather than surface memorisation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Short-term goal (this month):</strong> Complete all homework for the
                      Electrical Science unit on time and score at least 70% on the mid-term
                      practice test
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Process goals:</strong> Review college notes for 30 minutes every
                      weekday evening; ask my supervisor at least one technical question per day on
                      site; complete one practice calculation per evening
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-3">
                  Example 2: Newly Qualified Electrician (Just Passed AM2)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Identity:</strong> &ldquo;I am a competent professional electrician
                      who takes ownership of the quality and safety of my work and who actively
                      pursues further qualifications.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Long-term goal (3 years):</strong> Establish myself as a fully
                      independent electrician capable of handling domestic installation, testing,
                      and inspection &mdash; with the 2391 qualification and membership of a
                      competent person scheme
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Medium-term milestone (9 months):</strong> Complete the 2391-52
                      Inspection &amp; Testing qualification with a first-time pass
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Short-term goal (this month):</strong> Research 2391 course providers,
                      compare at least four options (price, dates, pass rates, reviews), and book
                      onto a course starting within the next quarter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Process goals:</strong> Read one chapter of GN3 per week; practise
                      dead testing on every job (even if not strictly required, to build speed and
                      confidence); keep a log of every test I perform and review it fortnightly
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-3">
                  Example 3: Experienced Electrician (10+ Years)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Identity:</strong> &ldquo;I am a senior technical professional who
                      mentors others, stays at the cutting edge of industry standards, and
                      continuously expands my expertise into new areas.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Long-term goal (2 years):</strong> Achieve IET EngTech registration
                      and transition into a role that combines installation supervision with
                      technical consultancy and training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Medium-term milestone (8 months):</strong> Complete the IET EngTech
                      application, including the competence report and professional review interview
                      preparation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Short-term goal (this month):</strong> Download the IET EngTech
                      application guidance, identify the required competence areas, and begin
                      drafting evidence statements from my career experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Process goals:</strong> Spend 45 minutes every Saturday morning
                      working on the EngTech application; read one IET technical article per week;
                      mentor one apprentice and document the mentoring activities for the competence
                      report
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Example 4: Electrical Business Owner
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Identity:</strong> &ldquo;I am a professional business leader who
                      builds a quality-focused, profitable electrical contracting company while
                      investing in the development of my team and my own skills.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Long-term goal (5 years):</strong> Grow the business to &pound;500,000
                      annual turnover with four employed electricians, NICEIC-approved contractor
                      status, and a strong reputation for quality commercial and domestic work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Medium-term milestone (12 months):</strong> Hire the first full-time
                      electrician, increase turnover from &pound;120,000 to &pound;180,000, and
                      secure at least three regular commercial maintenance contracts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Short-term goal (this month):</strong> Create a one-page business
                      services flyer, identify 20 local property management companies, and send
                      introductory emails with a follow-up call within one week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Process goals:</strong> Send five quotations per week; follow up every
                      outstanding quote within 48 hours; review financial performance every Friday
                      afternoon; read one business or marketing book per month
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has examined the different types of goals available to you, the
                frameworks for creating effective goals, and the common mistakes that prevent
                tradespeople from achieving their professional ambitions. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>SMART goals</strong> (Specific, Measurable, Achievable, Relevant,
                    Time-bound) transform vague wishes into concrete, actionable plans. The
                    framework was published by George T. Doran in 1981.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Outcome goals</strong> define the result you want.{' '}
                    <strong>Process goals</strong> define the daily behaviours that get you there.{' '}
                    <strong>Identity goals</strong> define who you are becoming. The most effective
                    approach uses all three.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>James Clear&rsquo;s identity-based habits</strong> show that the most
                    lasting behaviour change starts from identity, not outcomes. Decide who you want
                    to be, then align your habits with that identity.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Short-term goals</strong> (0&ndash;3 months) create momentum.{' '}
                    <strong>Medium-term goals</strong> (3&ndash;12 months) provide milestones.{' '}
                    <strong>Long-term goals</strong> (1&ndash;5+ years) provide direction. All three
                    timeframes are essential.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Covey&rsquo;s &ldquo;Begin with the end in mind&rdquo;</strong> means
                    starting from your long-term vision and working backwards to identify what you
                    should be doing today.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Goal cascading</strong> decomposes large goals into progressively
                    smaller sub-goals until every daily action is connected to the bigger picture.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Performance goals vs mastery goals:</strong> Performance goals focus on
                    proving ability; mastery goals focus on developing it. For complex learning,
                    mastery goals lead to deeper, more transferable competence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Common mistakes</strong> include: goals that are too vague, too
                    ambitious without a plan, not personally meaningful, outcome-only without
                    process, confusing activity with achievement, and having no review mechanism.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will examine the
                  barriers that prevent tradespeople from achieving their goals &mdash; including
                  fear of failure, imposter syndrome, perfectionism, and environmental obstacles
                  &mdash; and explore evidence-based strategies for overcoming them.
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
            <Link to="../gs-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-1-section-4">
              Next: Overcoming Barriers to Growth
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
