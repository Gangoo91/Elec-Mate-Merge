import { ArrowLeft, Target, CheckCircle } from 'lucide-react';
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
    id: 'gs-1-2-check1',
    question:
      'According to Locke &amp; Latham&rsquo;s Goal Setting Theory (1990), which of the following is NOT one of the five key principles that make goals effective?',
    options: [
      'Clarity &mdash; goals must be specific and unambiguous',
      'Challenge &mdash; goals should be difficult enough to require effort and focus',
      'Ease &mdash; goals should be simple and require minimal disruption to current routines',
      'Commitment &mdash; the individual must buy into the goal and intend to achieve it',
    ],
    correctIndex: 2,
    explanation:
      'Ease is not one of Locke &amp; Latham&rsquo;s five principles. In fact, their research shows the opposite: goals that are too easy do not motivate high performance. The five principles are: clarity (specific, unambiguous goals), challenge (difficult but attainable goals that require effort), commitment (the individual must accept and be committed to the goal), feedback (regular progress information), and task complexity (ensuring the goal is not so complex that it overwhelms). Challenge is essential because it focuses attention, energises effort, and encourages persistence. Goals that require no stretch or disruption to current routines do not drive performance improvement. For electricians, this means effective career goals should push you slightly beyond your current comfort zone &mdash; learning a new specialism, achieving a higher qualification, or taking on supervisory responsibility.',
  },
  {
    id: 'gs-1-2-check2',
    question:
      'A qualified electrician sets a goal: &ldquo;I want to get better at inspection work this year.&rdquo; According to Locke &amp; Latham&rsquo;s principle of clarity, what is the main problem with this goal?',
    options: [
      'It is too ambitious and will lead to burnout',
      'It is too vague &mdash; &ldquo;get better&rdquo; is not specific or measurable, so the electrician will not know if they have achieved it',
      'It focuses on inspection work, which is too narrow a specialism',
      'It has a one-year timeframe, which is too long for effective goal setting',
    ],
    correctIndex: 1,
    explanation:
      'The goal lacks clarity. &ldquo;Get better at inspection work&rdquo; is vague and subjective &mdash; what does &ldquo;better&rdquo; mean? How will you know when you have achieved it? Locke &amp; Latham&rsquo;s research shows that specific goals (e.g., &ldquo;Complete the City &amp; Guilds 2391 Inspection &amp; Testing qualification by December&rdquo; or &ldquo;Carry out 20 supervised EICRs and receive feedback on each one by the end of Q2&rdquo;) are far more effective than vague goals because they provide a clear target and measurable success criteria. Specific goals also make it easier to identify the actions required. The electrician can break down &ldquo;complete 2391 by December&rdquo; into concrete steps: enrol on course, study GN3, book exam, revise weak areas. &ldquo;Get better&rdquo; provides no such roadmap.',
  },
  {
    id: 'gs-1-2-check3',
    question:
      'CITB (Construction Industry Training Board) research into why construction workers do not undertake training found that the most commonly cited barrier was:',
    options: [
      'Lack of interest in career progression',
      'Lack of time due to work and family commitments',
      'Courses being too expensive',
      'Lack of relevant courses available locally',
    ],
    correctIndex: 1,
    explanation:
      'CITB research consistently identifies time poverty as the number one barrier to training and development for construction workers, including electricians. Long working hours, commuting, family responsibilities, and the physical tiredness that comes with manual work leave little time or energy for formal learning. This is compounded by the culture of the industry, where taking time off work for training can be seen as lost earnings (especially for self-employed tradespeople) or as letting the team down. While cost, availability, and interest are also factors, time is the dominant constraint. This is why goal setting is particularly important for tradespeople &mdash; without a clear, committed goal and a realistic plan, training and development simply gets crowded out by the urgent demands of work and life. Effective goals include time-management strategies: blocking out study time, negotiating with employers for day release, using evenings or weekends strategically.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do goals actually improve performance, or is this just motivational hype?',
    answer:
      'The research evidence is clear and robust: goals do improve performance. Locke &amp; Latham&rsquo;s 1990 meta-analysis (a statistical synthesis of hundreds of individual studies) found that specific, challenging goals led to higher performance than easy goals, &ldquo;do your best&rdquo; goals, or no goals at all in over 90% of the studies examined. The effect size was large and consistent across different tasks, settings, and populations. This is not motivational hype &mdash; it is one of the most replicated findings in psychology. For electricians, this means that setting a clear, challenging goal (such as &ldquo;achieve ECS Gold Card by completing NVQ Level 3 and AM2 within 18 months&rdquo;) will, on average, lead to better outcomes than vaguely hoping to &ldquo;improve&rdquo; or waiting for opportunities to arise. Goals work because they focus attention, mobilise effort, increase persistence, and motivate strategy development.',
  },
  {
    question: 'Why do most electricians not set formal goals if they are so effective?',
    answer:
      'Several reasons. First, the construction industry culture emphasises immediate, practical action over planning and reflection &mdash; &ldquo;just get on with it&rdquo; is a common mindset. Goal setting can feel abstract or &ldquo;corporate&rdquo;, not relevant to tradespeople. Second, many electricians have not been taught goal-setting frameworks or seen them modelled. Apprenticeships focus on technical skills, not personal development planning. Third, time poverty and mental load make it hard to step back and think strategically about career direction &mdash; you are too busy reacting to the next job. Fourth, fear of failure or embarrassment: writing down a goal makes it real and public (even if only to yourself), which creates psychological pressure. Fifth, lack of confidence: some electricians do not believe they are capable of achieving ambitious goals, so they do not set them. Overcoming these barriers requires recognising that goal setting is a skill that can be learned, and that even imperfect goals are better than no goals.',
  },
  {
    question: 'What is the difference between a goal and a wish or a dream?',
    answer:
      'A wish is passive (&ldquo;I wish I earned more&rdquo;). A goal is active and has three elements: a specific outcome, a timeframe, and a commitment to action. &ldquo;I will complete my HNC in Electrical Engineering by June 2027 by enrolling on the part-time course at the local college and dedicating Sunday mornings to study&rdquo; is a goal. It is specific, time-bound, and includes action. A dream is long-term and aspirational, often vague (&ldquo;I want to run my own electrical business one day&rdquo;). Dreams are valuable as direction-setters, but they need to be broken down into medium-term and short-term goals with concrete actions to become reality. The relationship is: dream (long-term vision) &rarr; goals (medium-term targets) &rarr; actions (short-term steps). Many electricians have dreams but no goals, which is why the dreams never materialise.',
  },
  {
    question: 'Can goal setting backfire or cause stress?',
    answer:
      'Yes, if done badly. Poorly designed goals can increase stress, reduce performance, and damage wellbeing. Common pitfalls include: setting goals that are too ambitious or unrealistic given current constraints (leading to repeated failure and demoralisation), setting too many goals simultaneously (creating overwhelm and lack of focus), setting goals imposed by others without genuine commitment, focusing only on outcome goals and ignoring process goals (creating anxiety about results you cannot fully control), and failing to adjust goals when circumstances change (leading to inflexibility). Effective goal setting includes: ensuring goals are challenging but achievable, limiting the number of active goals (2&ndash;4 major goals at any time), ensuring you have genuine commitment, balancing outcome and process goals, and building in review points to adjust course. The solution is not to avoid goal setting, but to do it well.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Locke &amp; Latham&rsquo;s Goal Setting Theory was first formally published in which year?',
    options: ['1968', '1981', '1990', '2002'],
    correctAnswer: 2,
    explanation:
      'Locke &amp; Latham&rsquo;s seminal book &ldquo;A Theory of Goal Setting and Task Performance&rdquo; was published in 1990, synthesising 25 years of research into a comprehensive framework. Edwin Locke began researching goal setting in the late 1960s, and Gary Latham joined the research programme in the 1970s. Their 1990 publication is considered the definitive statement of the theory, and their 2002 follow-up article in American Psychologist (&ldquo;Building a Practically Useful Theory of Goal Setting and Task Motivation&rdquo;) updated and extended the theory based on subsequent research. The theory has been tested across hundreds of studies in organisational, educational, and sports settings, and remains one of the most robust and widely applied motivation theories.',
  },
  {
    id: 2,
    question:
      'According to Locke &amp; Latham, specific and challenging goals improve performance by doing which of the following?',
    options: [
      'Reducing stress and anxiety by providing clarity',
      'Directing attention, mobilising effort, increasing persistence, and motivating strategy development',
      'Reducing the need for supervision and feedback',
      'Ensuring that all tasks are completed on time',
    ],
    correctAnswer: 1,
    explanation:
      'Locke &amp; Latham identify four mechanisms through which goals affect performance. First, goals direct attention and effort towards goal-relevant activities and away from distractions. An electrician with a goal to pass the 2391 exam will focus study time on inspection and testing rather than unrelated topics. Second, goals have an energising function &mdash; higher goals lead to greater effort. Third, goals increase persistence &mdash; people with goals work longer and are less likely to give up when faced with difficulty. Fourth, goals motivate the development and use of task-relevant strategies &mdash; if a goal cannot be achieved with current methods, the individual will search for better approaches. These mechanisms explain why goals are so effective at driving performance improvement.',
  },
  {
    id: 3,
    question:
      'The principle of &ldquo;commitment&rdquo; in Locke &amp; Latham&rsquo;s theory means that:',
    options: [
      'The goal must be written down and shared publicly',
      'The individual must genuinely accept the goal and be determined to achieve it, rather than just going through the motions',
      'The goal must have a financial reward attached to motivate commitment',
      'The goal must be set by a manager or supervisor to ensure accountability',
    ],
    correctAnswer: 1,
    explanation:
      'Commitment refers to the degree to which the individual is attached to the goal and determined to achieve it, even in the face of obstacles. Without commitment, a goal is just words on paper. Research shows that commitment is higher when the individual participates in setting the goal (rather than having it imposed), when they believe the goal is important and attainable, when they have the resources and support to achieve it, and when they publicly declare the goal (which creates social accountability). For electricians, this means self-set goals (&ldquo;I want to achieve this&rdquo;) are more effective than externally imposed goals (&ldquo;my boss says I should do this&rdquo;). It also means that goal-setting conversations should explore the &ldquo;why&rdquo; &mdash; why does this goal matter to you? What will achieving it enable? &mdash; because intrinsic motivation drives commitment.',
  },
  {
    id: 4,
    question:
      'Locke &amp; Latham found that &ldquo;do your best&rdquo; goals (e.g., &ldquo;I&rsquo;ll do my best to improve&rdquo;) are:',
    options: [
      'Just as effective as specific goals because they reduce pressure',
      'More effective than specific goals because they allow flexibility',
      'Less effective than specific goals because they are too vague and do not provide a clear target or performance standard',
      'Only effective for highly experienced individuals who do not need external structure',
    ],
    correctAnswer: 2,
    explanation:
      '&ldquo;Do your best&rdquo; goals are a common default in the absence of formal goal setting, but research consistently shows they are far less effective than specific, challenging goals. The problem is ambiguity: &ldquo;do your best&rdquo; does not define what &ldquo;best&rdquo; means, so individuals can rationalise almost any level of performance as acceptable. Specific goals (e.g., &ldquo;complete 10 EICRs this month&rdquo;, &ldquo;pass the 18th Edition exam with a score of 90% or higher&rdquo;) provide a concrete target that focuses effort and allows clear assessment of success or failure. For electricians, replacing &ldquo;I&rsquo;ll try to get more inspection work&rdquo; with &ldquo;I will complete the 2391 qualification by October and carry out 15 supervised inspections by December&rdquo; creates a clear performance standard and motivates action.',
  },
  {
    id: 5,
    question:
      'An apprentice electrician sets a goal: &ldquo;I will memorise all BS 7671 regulation numbers and be able to recite them on demand.&rdquo; According to Locke &amp; Latham&rsquo;s principle of task complexity, what is the problem with this goal?',
    options: [
      'It is not challenging enough',
      'It is too complex and unrealistic, and does not align with how the regulations are used in practice &mdash; the goal should focus on understanding and application, not rote memorisation',
      'It is too specific and does not allow for flexibility',
      'It requires too much feedback from others',
    ],
    correctAnswer: 1,
    explanation:
      'Task complexity refers to the match between the goal and the individual&rsquo;s current capability. Goals that are excessively complex or require skills the individual does not yet possess can overwhelm and paralyse, leading to avoidance or ineffective effort. Memorising all BS 7671 regulation numbers is not how competent electricians use the regulations &mdash; they develop familiarity with the structure, understand the principles, and know where to look up specific requirements. A more appropriate goal would be: &ldquo;I will develop fluency in using BS 7671 by studying one Part per week, understanding the underlying principles, and being able to locate relevant regulations for common installation scenarios within 2 minutes.&rdquo; This goal is challenging but realistic, and aligns with actual workplace competence. Effective goal setting requires matching goal difficulty to current capability and ensuring the goal is meaningful, not arbitrary.',
  },
  {
    id: 6,
    question:
      'Locke &amp; Latham&rsquo;s research found that feedback is essential for goal achievement because:',
    options: [
      'Feedback allows individuals to monitor progress, identify gaps, and adjust strategies, without which they cannot know if they are on track',
      'Feedback from supervisors creates accountability and fear of failure, which motivates effort',
      'Feedback replaces the need for goal clarity',
      'Feedback is only important for complex tasks, not simple tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Feedback provides information about progress towards the goal. Without feedback, you are flying blind &mdash; you do not know if your current approach is working, whether you are on track, or what needs to change. Feedback can be self-generated (e.g., tracking how many past exam papers you have completed, recording test results) or external (e.g., tutor feedback on assignment performance, supervisor comments on installation quality). The key is regularity and relevance. For electricians working towards qualifications, this means: using practice exams to identify weak areas, seeking feedback from experienced colleagues or assessors, tracking hours of study or practice, and reviewing progress against milestones. Feedback turns goals from static targets into dynamic learning systems that adapt based on performance.',
  },
  {
    id: 7,
    question:
      'Why do many construction workers, including electricians, not engage in formal training according to CITB research?',
    options: [
      'Most electricians believe they already know everything they need to know',
      'Time poverty (work and family commitments leave little time for study) is the most commonly cited barrier',
      'Training courses are always held in inconvenient locations',
      'The electrical trade does not require ongoing learning after initial qualification',
    ],
    correctAnswer: 1,
    explanation:
      'CITB&rsquo;s Skills and Training in the Construction Industry reports consistently identify time constraints as the dominant barrier to training uptake. Electricians work long hours (often 50+ hours per week including travel), have family commitments, and are physically tired at the end of the working day. Evening or weekend courses require sacrificing personal or family time. Day-release courses may not be supported by employers, or may result in lost earnings for the self-employed. This is not an excuse &mdash; it is a real structural barrier that goal setting and planning can help address. Effective goals for tradespeople must include realistic time management: identifying when training will happen, negotiating time with employer or family, and building in buffer time for inevitable disruptions. Without this planning, training goals simply get crowded out by more immediate demands.',
  },
  {
    id: 8,
    question:
      'An electrician sets the following goal: &ldquo;I will increase my earnings.&rdquo; According to the principles of effective goal setting, this goal could be improved by:',
    options: [
      'Adding emotional language to increase motivation',
      'Making it specific, measurable, and time-bound (e.g., &ldquo;I will increase my average weekly earnings from &pound;700 to &pound;900 by the end of Q3 by taking on two evening/weekend jobs per month and completing my inspection qualification to access higher-value work&rdquo;)',
      'Reducing the challenge level to make it more achievable',
      'Avoiding numerical targets to reduce pressure',
    ],
    correctAnswer: 1,
    explanation:
      'The original goal (&ldquo;increase my earnings&rdquo;) is too vague. It lacks specificity (by how much?), measurability (how will you know you have succeeded?), a timeframe (by when?), and a clear action plan (how will you achieve it?). The improved version addresses all of these: it specifies the target increase (&pound;700 to &pound;900 per week), sets a timeframe (by end of Q3), and identifies concrete actions (two additional jobs per month, complete inspection qualification). This level of detail transforms the goal from a wish into a plan. It also allows for progress tracking (am I on track to hit &pound;900 by Q3? Have I completed the inspection course? Am I finding the additional work?) and strategy adjustment if the initial approach is not working. This is the difference between goal setting and goal achievement.',
  },
];

export default function GSModule1Section2() {
  useSEO({
    title: 'Why Goal Setting Matters for Tradespeople | Goal Setting & Growth Module 1.2',
    description:
      'Locke &amp; Latham Goal Setting Theory, the goal-performance link, and why most tradespeople don&rsquo;t set formal goals.',
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
            <Target className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Why Goal Setting Matters for Tradespeople
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Locke &amp; Latham Goal Setting Theory, the goal-performance link, and why most
            tradespeople don&rsquo;t set formal goals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Goal Setting Theory:</strong> Specific, challenging goals improve
                performance (Locke &amp; Latham, 1990)
              </li>
              <li>
                <strong>Five principles:</strong> Clarity, challenge, commitment, feedback, task
                complexity
              </li>
              <li>
                <strong>Evidence:</strong> Goals outperform &ldquo;do your best&rdquo; in 90%+ of
                studies
              </li>
              <li>
                <strong>Most tradespeople don&rsquo;t set goals</strong> due to time poverty,
                culture, lack of training
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career control:</strong> Goals give you direction rather than drifting
                through your career
              </li>
              <li>
                <strong>Performance boost:</strong> Research shows 10&ndash;25% performance
                improvement with goals
              </li>
              <li>
                <strong>Focus:</strong> Goals help you prioritise what matters and say no to
                distractions
              </li>
              <li>
                <strong>Measurable progress:</strong> You can see if you&rsquo;re moving forward or
                stuck
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the five key principles of Locke &amp; Latham&rsquo;s Goal Setting Theory',
              'Explain the four mechanisms through which goals improve performance',
              'Evaluate the research evidence linking goal setting to performance outcomes',
              'Identify the main barriers preventing tradespeople from setting formal goals',
              'Distinguish between effective goals and ineffective goals',
              'Apply Goal Setting Theory principles to electrical trade career scenarios',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Locke & Latham Goal Setting Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Locke &amp; Latham Goal Setting Theory &mdash; The Research Foundation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Goal Setting Theory was developed by Edwin Locke (Professor Emeritus at the
                University of Maryland) and Gary Latham (Professor at the University of Toronto)
                over several decades of research beginning in the late 1960s. Their seminal book,
                &ldquo;A Theory of Goal Setting and Task Performance&rdquo; (1990), synthesised
                hundreds of studies and established goal setting as one of the most robust and
                practical theories in organisational psychology. The core finding is simple but
                powerful:{' '}
                <strong>
                  specific, challenging goals lead to higher performance than easy goals, vague
                  goals, or &ldquo;do your best&rdquo; instructions.
                </strong>
              </p>

              <p>
                The theory has been tested in laboratories, workplaces, schools, and sports settings
                across multiple countries and cultures. It has been applied to tasks ranging from
                simple manual work to complex problem-solving, and to populations from students to
                senior executives. The consistency of the findings is remarkable: in over 90% of
                studies, specific challenging goals produced better performance than alternative
                conditions. For a psychological theory, this level of replicability and effect size
                is exceptional. Goal setting is not motivational hype or pseudoscience &mdash; it is
                evidence-based practice.
              </p>

              <p>
                Locke &amp; Latham identified five key principles that determine whether a goal will
                be effective: <strong>clarity</strong>, <strong>challenge</strong>,{' '}
                <strong>commitment</strong>, <strong>feedback</strong>, and{' '}
                <strong>task complexity</strong>. Goals that meet these five criteria consistently
                drive higher performance, persistence, and satisfaction. Goals that violate one or
                more of these principles tend to be ineffective or even counterproductive. We will
                examine each principle in turn.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Goal Setting Theory in One Sentence
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    Specific, challenging goals to which the individual is committed, supported by
                    feedback, and matched to their capability, lead to higher performance than easy,
                    vague, or absent goals.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Five Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Five Principles of Effective Goals
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>1. Clarity:</strong> Goals must be specific, unambiguous, and measurable.
                Vague goals such as &ldquo;improve my skills&rdquo; or &ldquo;do better&rdquo; do
                not provide a clear target or performance standard. Specific goals such as
                &ldquo;complete City &amp; Guilds 2391 Inspection &amp; Testing by December
                2026&rdquo; or &ldquo;reduce average job completion time from 8 hours to 6 hours by
                improving cable run planning&rdquo; provide a concrete aim and measurable success
                criteria. Clarity eliminates ambiguity and focuses effort. For electricians, this
                means replacing &ldquo;I want to earn more&rdquo; with &ldquo;I will increase my
                average weekly earnings from &pound;650 to &pound;850 by March by taking on two
                additional evening jobs per month&rdquo;.
              </p>

              <p>
                <strong>2. Challenge:</strong> Goals should be difficult enough to require effort,
                focus, and possibly new strategies. Easy goals that can be achieved with minimal
                effort do not motivate high performance. Research shows a linear relationship
                between goal difficulty and performance up to the point where the goal becomes so
                difficult that the individual gives up. The optimal goal is challenging but
                attainable &mdash; a stretch that requires you to grow, but not so extreme that it
                feels impossible. For apprentices, this might mean aiming for 90% on the end-point
                assessment rather than just a pass. For qualified electricians, it might mean
                setting a goal to move into a new specialism (design, inspection, or management)
                rather than simply continuing current work.
              </p>

              <p>
                <strong>3. Commitment:</strong> The individual must accept the goal and be
                determined to achieve it. Imposed goals that you have no buy-in to are far less
                effective than self-set or participatively set goals. Commitment is strengthened by:
                involving the individual in goal setting, ensuring the goal is perceived as
                important and attainable, providing the necessary resources and support, and
                creating public accountability (telling someone else about your goal). For
                electricians, this means your goals should be your goals, not just what your
                employer wants or what you think you &ldquo;should&rdquo; want. Genuine commitment
                comes from aligning the goal with your values and long-term aspirations.
              </p>

              <p>
                <strong>4. Feedback:</strong> Regular feedback on progress is essential for goal
                achievement. Without feedback, you cannot know if you are on track, what is working,
                or what needs to change. Feedback can be self-generated (tracking hours studied,
                test scores, number of jobs completed) or provided by others (tutor comments,
                supervisor assessments, customer reviews). The frequency and quality of feedback
                matters: vague, delayed feedback (&ldquo;you&rsquo;re doing okay&rdquo; once per
                year) is far less useful than specific, timely feedback (&ldquo;your conduit runs
                are improving but you need to work on maintaining correct spacing &mdash;
                here&rsquo;s a good example&rdquo; within days of the work). For self-directed
                goals, build in feedback mechanisms: monthly progress reviews, practice exams, peer
                feedback.
              </p>

              <p>
                <strong>5. Task Complexity:</strong> The goal must be matched to the
                individual&rsquo;s current capability and the task&rsquo;s inherent complexity.
                Goals that are too simple waste potential. Goals that are excessively complex or
                require skills the person does not yet have can overwhelm and paralyse. For complex
                goals, break them down into smaller sub-goals or provide additional training and
                support. An apprentice setting a goal to &ldquo;become a design engineer&rdquo; in
                their first year is setting a goal that is too complex for their current stage. A
                more appropriate goal would be &ldquo;understand the basic principles of circuit
                design by completing the Level 3 design module and working through 10 example
                designs with supervision&rdquo;. Task complexity recognition ensures goals are
                challenging but realistic.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Applying the Five Principles: An Example
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Weak goal:</strong> &ldquo;I want to get better at testing.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Why it&rsquo;s weak:</strong> Lacks clarity (what does
                  &ldquo;better&rdquo; mean?), no challenge level specified, no timeframe, no
                  feedback mechanism.
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Strong goal:</strong> &ldquo;I will achieve competence in inspection and
                  testing by completing the City &amp; Guilds 2391 course by October 2026, carrying
                  out 20 supervised EICRs with feedback from my mentor, and passing the exam with a
                  score of 85% or higher.&rdquo;
                </p>
                <p className="text-sm text-white leading-relaxed">
                  <strong>Why it&rsquo;s strong:</strong> Clarity (specific qualification and exam
                  score), challenge (85% target, 20 supervised inspections), commitment (I will, not
                  I might), feedback (mentor supervision and exam result), task complexity (matched
                  to a qualified electrician&rsquo;s capability).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: How Goals Improve Performance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            How Goals Improve Performance &mdash; The Four Mechanisms
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Locke &amp; Latham identified four psychological mechanisms through which goals
                enhance performance. Understanding these mechanisms helps explain why goal setting
                is so effective and also reveals how to set better goals.
              </p>

              <p>
                <strong>
                  1. Goals direct attention and effort towards goal-relevant activities and away
                  from distractions.
                </strong>{' '}
                When you have a clear goal, you know what to focus on. An electrician with a goal to
                pass the 18th Edition exam directs study time towards BS 7671 content, past papers,
                and circuit calculations, and away from unrelated topics or time-wasting activities.
                Without a goal, attention is diffuse and easily captured by whatever is most
                immediate or enjoyable. Goals create a filter: does this activity move me towards my
                goal? If no, deprioritise it. This is particularly valuable for tradespeople who
                face constant competing demands on their time.
              </p>

              <p>
                <strong>
                  2. Goals have an energising function &mdash; higher goals lead to greater effort.
                </strong>{' '}
                If the goal is to &ldquo;just pass&rdquo; an exam, you will allocate enough effort
                to scrape through. If the goal is to score 90%, you will study harder, practise
                more, and prepare more thoroughly. Research shows a positive linear relationship
                between goal difficulty and effort (up to the point where the goal is perceived as
                impossible). Challenging goals mobilise energy and resources that easy goals do not.
                For electricians setting earnings goals, aiming for a 10% increase will generate
                less behavioural change than aiming for a 30% increase (which forces you to think
                about new revenue streams, efficiency improvements, or skill upgrades).
              </p>

              <p>
                <strong>
                  3. Goals increase persistence and reduce the likelihood of giving up when faced
                  with obstacles.
                </strong>{' '}
                People with clear, committed goals work longer and are more likely to push through
                setbacks. If you encounter a difficult section in your studies, a clear goal
                (&ldquo;I must pass this exam in six weeks&rdquo;) encourages you to persist, seek
                help, or try a different learning strategy. Without a goal, the temptation to give
                up or procrastinate is much stronger. Persistence is particularly important in the
                trades, where many valuable qualifications (NVQ Level 3, HNC, 2391) require
                sustained effort over months or years alongside full-time work.
              </p>

              <p>
                <strong>
                  4. Goals motivate the development and use of task-relevant knowledge and
                  strategies.
                </strong>{' '}
                When your current approach is not sufficient to achieve the goal, you are forced to
                think strategically. An apprentice struggling with conduit bending who has a goal to
                achieve competence will seek out YouTube tutorials, ask experienced colleagues for
                tips, practise in their own time, or attend additional training. Without the goal,
                they might just muddle through and remain mediocre. Goals create productive
                discomfort that drives learning and adaptation. This mechanism is why goals are
                particularly effective for skill development.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Goals in Action: JIB Career Progression
                </p>
                <p className="text-base text-white leading-relaxed">
                  The JIB grading structure (Trainee → Approved Electrician → Technician) is
                  essentially a goal framework. Each grade has clear criteria (clarity), requires
                  progressively higher skill levels (challenge), includes assessments that provide
                  feedback, and is matched to career stage (task complexity). Electricians who
                  actively set goals within this framework (&ldquo;I will achieve Approved
                  Electrician status by passing AM2 within 12 months&rdquo;) progress faster and
                  more reliably than those who drift through training without clear targets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Research Evidence &mdash; Do Goals Actually Work?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The empirical support for Goal Setting Theory is extensive and robust. Locke &amp;
                Latham&rsquo;s 1990 book synthesised over 400 studies involving more than 40,000
                participants across laboratory and field settings. The findings were consistent:
                specific, challenging goals led to higher performance than easy goals, vague goals
                (&ldquo;do your best&rdquo;), or no goals in approximately 90% of the studies
                examined. The average performance improvement was 10&ndash;25% depending on the
                task, which is a substantial effect size for any behavioural intervention.
              </p>

              <p>
                The research has been replicated in diverse contexts: manufacturing productivity,
                sales performance, academic achievement, sports training, health behaviour change
                (weight loss, exercise adherence), and safety compliance. The theory has been tested
                across cultures including the United States, Canada, the United Kingdom, Australia,
                Japan, and Israel, with consistent results. While some cultural variations exist
                (collectivist cultures may place more emphasis on group goals, for example), the
                core finding &mdash; that specific challenging goals outperform vague or easy goals
                &mdash; holds across settings.
              </p>

              <p>
                A 2002 review by Locke &amp; Latham in <em>American Psychologist</em> updated the
                evidence base and addressed criticisms. They found that the theory had been
                supported by an additional decade of research and remained one of the most valid and
                practical theories in psychology. Importantly, the research also identified boundary
                conditions &mdash; situations where goals are less effective or can backfire. These
                include: goals imposed without participation or commitment, goals set in contexts
                where individuals lack the necessary skills or resources, goals that encourage
                unethical behaviour (e.g., sales targets that incentivise mis-selling), and
                excessively complex goals that overwhelm rather than motivate.
              </p>

              <p>
                For electricians, the practical implication is clear: goal setting is not guesswork
                or wishful thinking. It is a proven method for improving performance, increasing
                persistence, and achieving career outcomes. The question is not &ldquo;does goal
                setting work?&rdquo; &mdash; the evidence says it does. The question is &ldquo;am I
                using it?&rdquo; and &ldquo;am I doing it well?&rdquo;
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Meta-Analysis Results: Specific Goals vs &ldquo;Do Your Best&rdquo;
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Task: Quantity of output</strong> &mdash; Specific goals improved
                      performance by an average of 16% compared to &ldquo;do your best&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Task: Quality of work</strong> &mdash; Specific goals improved quality
                      by 8&ndash;16% depending on the complexity of the quality criteria
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Task: Persistence</strong> &mdash; Individuals with specific goals
                      persisted 30&ndash;40% longer on difficult tasks than those with &ldquo;do
                      your best&rdquo; instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Effect size:</strong> Cohen&rsquo;s d of 0.5&ndash;0.8 (medium to
                      large) across multiple meta-analyses
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Why Most Tradespeople Don't Set Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Why Most Tradespeople Don&rsquo;t Set Formal Goals
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite the strong evidence for goal setting, most electricians and other
                tradespeople do not engage in formal, written goal setting. Research by the
                Construction Industry Training Board (CITB) and industry bodies consistently shows
                low uptake of training, limited career planning, and reactive rather than proactive
                development. The reasons are structural, cultural, and psychological.
              </p>

              <p>
                <strong>1. Time poverty and mental load.</strong> Electricians work long hours
                (often 45&ndash;60 hours per week including travel), have physically demanding jobs,
                and many have family responsibilities. By the end of the working day, there is
                little time or mental energy left for reflection, planning, or study. Formal goal
                setting requires stepping back from the immediate demands of work and thinking
                strategically about the future &mdash; a luxury many tradespeople feel they cannot
                afford. Training courses, which are often the vehicle for achieving goals, require
                evenings, weekends, or day release, all of which compete with work and family time.
              </p>

              <p>
                <strong>2. Industry culture.</strong> The construction and electrical trades have a
                strong culture of action-orientation and practical problem-solving (&ldquo;just get
                on with it&rdquo;). Planning, reflection, and goal setting can be seen as
                &ldquo;soft&rdquo;, &ldquo;corporate&rdquo;, or irrelevant to hands-on work. There
                is often an implicit assumption that career progression happens through time served
                and practical experience, not through formal goals and structured development. This
                culture is reinforced by the lack of goal-setting role models &mdash; most
                electricians have never seen a supervisor, trainer, or successful tradesperson use
                formal goal-setting frameworks.
              </p>

              <p>
                <strong>3. Lack of training in goal setting.</strong> Apprenticeships focus almost
                entirely on technical skills &mdash; installation, testing, regulations, health and
                safety. Very little time is dedicated to personal development skills such as goal
                setting, self-assessment, or career planning. As a result, many electricians do not
                know how to set effective goals, do not recognise the benefits, and have no
                framework or tools to support the process. Goal setting is a skill that must be
                learned, not an innate ability.
              </p>

              <p>
                <strong>4. Fear of failure and public commitment.</strong> Writing down a goal makes
                it real and creates accountability. If you tell people you are going to achieve
                something and then fail, there is embarrassment and perceived loss of face. For some
                electricians, it feels safer not to set goals at all than to risk public failure.
                This is compounded by fixed mindset beliefs (&ldquo;I&rsquo;m not the type of person
                who sets goals&rdquo; or &ldquo;goals are for ambitious people, not people like
                me&rdquo;).
              </p>

              <p>
                <strong>5. Lack of confidence and self-efficacy.</strong> Some electricians do not
                set goals because they do not believe they are capable of achieving them. This is
                particularly true for goals requiring academic qualifications (HNC, degree) or
                business skills (running a company). Low self-efficacy (&ldquo;I&rsquo;m not
                academic&rdquo;, &ldquo;I&rsquo;m not good with numbers&rdquo;) becomes a
                self-fulfilling prophecy that prevents goal setting and therefore prevents growth.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Overcoming the Barriers: Practical Strategies
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Time:</strong> Start with small, realistic goals that require
                      30&ndash;60 minutes per week, not hours per day
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Culture:</strong> Find a peer, mentor, or community who value
                      development and can provide support and accountability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Skills:</strong> Learn goal-setting frameworks (SMART, OKRs) and
                      practise using them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Fear:</strong> Start with private goals; share them only when you feel
                      ready for accountability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Confidence:</strong> Set one small, achievable goal to build
                      self-efficacy, then progress to larger goals
                    </span>
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
                This section has established why goal setting matters for tradespeople and what
                makes goals effective. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Locke &amp; Latham&rsquo;s Goal Setting Theory (1990)</strong> is one of
                    the most robust theories in psychology, supported by hundreds of studies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Five key principles:</strong> clarity, challenge, commitment, feedback,
                    and task complexity determine whether a goal will be effective.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Four mechanisms:</strong> Goals improve performance by directing
                    attention, energising effort, increasing persistence, and motivating strategy
                    development.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Research evidence:</strong> Specific challenging goals improve
                    performance by 10&ndash;25% on average compared to &ldquo;do your best&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Most tradespeople don&rsquo;t set goals</strong> due to time poverty,
                    industry culture, lack of training, fear of failure, and low self-efficacy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Barriers can be overcome</strong> through realistic time allocation,
                    peer support, learning goal-setting skills, and building confidence through
                    small wins.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore the
                  different types of goals &mdash; SMART goals, outcome vs process vs identity
                  goals, short/medium/long-term horizons, and how to choose the right goal type for
                  your situation.
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
            <Link to="../gs-module-1-section-3">
              Next: Types of Goals
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
