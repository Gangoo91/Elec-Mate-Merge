import { ArrowLeft, Focus, CheckCircle } from 'lucide-react';
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
    id: 'gs-2-1-check1',
    question:
      'An apprentice electrician sets a goal: &ldquo;I want to improve my electrical skills.&rdquo; Which element of the SMART framework is most clearly missing from this goal?',
    options: [
      'Specific &mdash; the goal does not identify which particular skills will be improved',
      'Measurable &mdash; there is no way to track progress or know when the goal is achieved',
      'Achievable &mdash; the goal may be too ambitious for an apprentice',
      'All three elements (Specific, Measurable, and Time-bound) are missing',
    ],
    correctIndex: 3,
    explanation:
      'This goal lacks Specific detail (which skills?), Measurable criteria (how will you know you have improved?), and a Time-bound deadline (by when?). A SMART version might be: &ldquo;Complete BS 7671 Section 522 cable selection exercises with 100% accuracy by the end of this month.&rdquo; This revised goal identifies a specific skill (cable selection under BS 7671:2018+A2:2022 Regulation 522), provides measurable success criteria (100% accuracy), and sets a deadline (end of month). The original goal is a wish rather than a goal. SMART goals force precision, which is essential for electrical work where vague intentions lead to incomplete competence.',
  },
  {
    id: 'gs-2-1-check2',
    question:
      'A qualified electrician sets the following goal: &ldquo;Pass the City &amp; Guilds 2391-52 Inspection and Testing qualification by 31 December 2026.&rdquo; According to Locke and Latham&rsquo;s goal-setting research, what additional step would most significantly increase the likelihood of achieving this goal?',
    options: [
      'Share the goal publicly on social media to create accountability',
      'Break the goal into implementation intentions: specific if-then plans for when and where study will occur',
      'Reduce the difficulty of the goal to make it more achievable',
      'Set multiple backup goals in case the 2391-52 proves too difficult',
    ],
    correctIndex: 1,
    explanation:
      'Peter Gollwitzer&rsquo;s research on implementation intentions shows that adding specific if-then plans dramatically increases goal achievement rates. For example: &ldquo;If it is 7pm on Monday, Wednesday, and Friday, then I will study 2391-52 testing procedures for one hour at my kitchen table.&rdquo; Implementation intentions work by pre-deciding when, where, and how you will act, removing the need for willpower at the moment of action. Locke and Latham&rsquo;s research confirms that difficult, specific goals lead to higher performance than easy goals, so reducing difficulty would be counterproductive. Public accountability can help but is less effective than implementation intentions. The goal as stated is already SMART; the missing element is the action plan that bridges intention to behaviour.',
  },
  {
    id: 'gs-2-1-check3',
    question:
      'An electrical contractor sets a goal: &ldquo;Increase company revenue by 40% in the next six months.&rdquo; The goal is specific, measurable, relevant, and time-bound. However, the company has historically grown at 8&ndash;12% per year. Which SMART element is most likely violated here, and what is the likely consequence?',
    options: [
      'Measurable &mdash; percentage-based goals are harder to track than absolute figures',
      'Achievable &mdash; the goal may be so unrealistic that it demotivates rather than motivates',
      'Relevant &mdash; revenue growth may not be the most important metric for an electrical contractor',
      'Time-bound &mdash; six months is too short a period to achieve meaningful revenue growth',
    ],
    correctIndex: 1,
    explanation:
      'While the goal is admirably ambitious, a 40% increase in six months when historical growth is 8&ndash;12% per year represents a roughly 400% acceleration. This violates the Achievable element of SMART. Locke and Latham&rsquo;s research shows that difficult goals drive high performance, but only when the individual believes the goal is possible. When a goal is perceived as unattainable, motivation collapses and performance often declines below baseline. The likely consequence here is either: (1) the goal is abandoned within weeks, or (2) unethical shortcuts are taken (cutting corners on quality, misrepresenting financials, overcharging clients). A more achievable stretch goal might be 15&ndash;20% growth in six months, which is still challenging but credible given the company&rsquo;s track record.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is it better to set many small goals or a few big goals?',
    answer:
      'The most effective approach is hierarchical goal-setting: one or two major long-term goals supported by multiple medium-term and short-term goals that cascade from the larger objective. Think of it as a pyramid: at the top, you might have a five-year goal (&ldquo;Become a JIB-registered Senior Technician and earn &pound;55,000+&rdquo;). Below that, you have one-year goals (&ldquo;Complete City &amp; Guilds 2396 Design qualification&rdquo;, &ldquo;Pass 2391-52 Inspection and Testing&rdquo;). Below that, you have quarterly goals (&ldquo;Complete BS 7671 cable selection module&rdquo;), and at the base, you have weekly goals (&ldquo;Study three hours this week&rdquo;). Each smaller goal is a stepping stone towards the larger goal. This structure provides both direction (the big goal) and momentum (the small wins). Setting only big goals without intermediate milestones leads to overwhelm; setting only small goals without a unifying direction leads to aimless activity.',
  },
  {
    question: 'What if I set a goal and then realise it is not right for me?',
    answer:
      'Goals are tools for growth, not prison sentences. If you gather new information or your circumstances change, it is entirely appropriate to revise or abandon a goal. However, distinguish between (1) abandoning a goal because it genuinely no longer serves you, and (2) abandoning a goal because it has become difficult or uncomfortable. The first is wisdom; the second is avoidance. A useful test: ask yourself, &ldquo;If I had already achieved this goal, would I still want the outcome?&rdquo; If the answer is yes, the difficulty is temporary and the goal is still valid. If the answer is no, the goal itself is misaligned. For example, an apprentice might set a goal to become self-employed within two years, then discover through experience that they prefer the security and structure of employed work. That is a valuable insight, not a failure. Revise the goal to reflect your new understanding.',
  },
  {
    question: 'How do I stay motivated when progress is slow or invisible?',
    answer:
      'Slow progress is still progress, and in skill-based fields like electrical work, improvement is often invisible until a threshold is crossed. Three strategies help: (1) Track leading indicators, not just lagging indicators. A lagging indicator is the outcome (passing the AM2 assessment). A leading indicator is the behaviour that drives the outcome (hours of conduit bending practice). You have direct control over leading indicators, so tracking them provides daily evidence of progress even when the outcome has not yet arrived. (2) Celebrate process goals, not just outcome goals. If your process goal is &ldquo;Study 30 minutes per day, five days per week&rdquo;, you can achieve that goal this week regardless of your exam result. This creates a sense of competence and control. (3) Review past progress regularly. When motivation dips, compare your current skill level to where you were six months ago. The apprentice who struggles with three-phase motor control today has forgotten that they could not wire a light switch six months ago. Keep a record of completed tasks and past wins to remind yourself that you are moving forward, even when the destination is not yet visible.',
  },
  {
    question: 'Should I share my goals with other people or keep them private?',
    answer:
      'The research is mixed, and the answer depends on your personality and the type of accountability you need. Dr Gail Matthews&rsquo; research at Dominican University found that people who shared their goals with a friend and sent weekly progress updates were 42% more likely to achieve their goals than those who kept goals private. Public commitment creates social accountability. However, other research (notably by Peter Gollwitzer) suggests that premature sharing can create a &ldquo;social reality&rdquo; where you receive praise for the intention rather than the achievement, reducing motivation to actually do the work. The distinction appears to be this: sharing goals with an accountability partner who will check your progress is beneficial. Broadcasting goals to a wide audience for validation without accountability is counterproductive. A good middle ground: share your goal with one or two people who will actively support and challenge you (a mentor, a study partner, a colleague), but do not announce it widely until you have demonstrated consistent progress.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'The &ldquo;S&rdquo; in the SMART framework stands for Specific. Which of the following goals is the MOST specific for an apprentice electrician?',
    options: [
      'Improve my understanding of BS 7671',
      'Get better at electrical calculations',
      'Complete all 20 questions in the BS 7671 Section 433 overcurrent protection workbook with 100% accuracy by Friday',
      'Become a more competent electrician',
    ],
    correctAnswer: 2,
    explanation:
      'Option 3 is the most specific because it identifies exactly what will be done (complete 20 questions), in which area (BS 7671:2018+A2:2022 Section 433 overcurrent protection), to what standard (100% accuracy), and by when (Friday). The other options are vague and open to interpretation. Specificity is critical in goal-setting because it eliminates ambiguity and provides a clear target. A specific goal also makes it easier to create an action plan. If your goal is &ldquo;improve my understanding of BS 7671&rdquo;, you do not know where to start. If your goal is to complete a specific workbook by a specific date, the action plan is self-evident.',
  },
  {
    id: 2,
    question:
      'The &ldquo;M&rdquo; in the SMART framework stands for Measurable. Which of the following is a measurable success criterion for a goal to improve conduit bending skills?',
    options: [
      'Feel more confident when bending conduit',
      'Bend a 20mm conduit 90-degree bend with less than 2mm deviation from the target angle, verified with a digital protractor',
      'Impress my supervisor with my conduit work',
      'Get faster at bending conduit',
    ],
    correctAnswer: 1,
    explanation:
      'Option 2 provides an objective, verifiable measurement: less than 2mm deviation from 90 degrees, verified with a digital protractor. This is measurable because a third party could check whether the criterion has been met. The other options are subjective (feeling confident, impressing someone, getting faster without specifying a baseline or target). Measurable criteria are essential because they allow you to know definitively whether you have achieved the goal. Feelings and opinions fluctuate; measurements do not. For trade skills, measurable goals often involve tolerances (within 2mm), time (complete task in under 10 minutes), or pass/fail tests (score 85%+ on assessment).',
  },
  {
    id: 3,
    question:
      'An electrician sets a goal: &ldquo;Pass the City &amp; Guilds 2391-52 Initial Verification exam on my first attempt within the next four months.&rdquo; Which SMART element does this goal demonstrate most strongly?',
    options: [
      'Specific &mdash; the goal identifies a particular qualification',
      'Time-bound &mdash; the goal has a clear deadline of four months',
      'Both Specific and Time-bound are equally well demonstrated',
      'Achievable &mdash; four months is a realistic timeframe for exam preparation',
    ],
    correctAnswer: 2,
    explanation:
      'This goal demonstrates both Specific (City &amp; Guilds 2391-52 Initial Verification, first attempt) and Time-bound (within four months) elements strongly. It identifies exactly which exam (not just &ldquo;an inspection qualification&rdquo;), the success criterion (pass on first attempt), and the deadline (four months). Whether the goal is Achievable depends on the individual&rsquo;s current knowledge, available study time, and prior experience, which are not stated in the goal itself. The SMART framework requires all five elements, but this particular goal excels in specificity and time-binding while leaving achievability as a separate assessment.',
  },
  {
    id: 4,
    question:
      'According to Locke and Latham&rsquo;s goal-setting theory, which type of goal produces the highest performance?',
    options: [
      'Easy goals that are certain to be achieved, providing consistent success',
      'Moderate &ldquo;do your best&rdquo; goals that reduce pressure',
      'Difficult but achievable goals that require significant effort and stretch current capability',
      'Extremely difficult goals that may be impossible, creating maximum motivation',
    ],
    correctAnswer: 2,
    explanation:
      'Locke and Latham&rsquo;s four decades of research consistently shows that difficult, specific goals produce higher performance than easy goals, &ldquo;do your best&rdquo; goals, or no goals at all. The key qualifier is that the goal must be believable &mdash; the individual must accept the goal as achievable, even if difficult. When goals cross the line into impossible, motivation collapses. The optimal goal difficulty is at the edge of current capability: hard enough to require full effort and focus, but not so hard that success seems impossible. For an apprentice electrician, an optimal goal might be: &ldquo;Score 90%+ on the AM2 assessment&rdquo; (difficult but achieved by many apprentices annually). A demotivating goal would be: &ldquo;Score 100% on the AM2 assessment with zero errors&rdquo; (extremely rare, bordering on impossible).',
  },
  {
    id: 5,
    question:
      'Peter Gollwitzer&rsquo;s research on implementation intentions found that creating if-then plans significantly increases goal achievement. Which of the following is the best example of an implementation intention for a goal to study BS 7671 regulations?',
    options: [
      '&ldquo;I will study BS 7671 more often.&rdquo;',
      '&ldquo;I will try to study BS 7671 whenever I have free time.&rdquo;',
      '&ldquo;If it is 7pm on Monday, Wednesday, and Friday, then I will study BS 7671 Section 433 for 30 minutes at my kitchen table.&rdquo;',
      '&ldquo;I want to become an expert in BS 7671.&rdquo;',
    ],
    correctAnswer: 2,
    explanation:
      'Option 3 is a textbook implementation intention. It specifies exactly when (7pm on Monday, Wednesday, Friday), where (kitchen table), and what (BS 7671 Section 433 for 30 minutes). Implementation intentions work by creating a strong mental association between a situational cue (seeing the time 7pm on Monday) and a specific behaviour (opening BS 7671 Section 433). This pre-commitment removes the need for willpower and decision-making at the moment of action. Options 1, 2, and 4 are intentions, but not implementation intentions &mdash; they lack the if-then structure and the situational specificity. Research shows that implementation intentions can double or triple goal achievement rates compared to goal intentions alone, making them one of the most powerful tools in the goal-setting toolkit.',
  },
  {
    id: 6,
    question:
      'An apprentice sets the goal: &ldquo;Improve my cable calculation skills.&rdquo; What is the primary problem with this goal from a SMART perspective?',
    options: [
      'It is not relevant to an apprentice electrician',
      'It is not achievable within a reasonable timeframe',
      'It lacks both measurable success criteria and a deadline',
      'It is too specific and should be broader',
    ],
    correctAnswer: 2,
    explanation:
      'The goal lacks two critical SMART elements: Measurable (how will you know you have improved?) and Time-bound (by when?). A SMART revision might be: &ldquo;Complete 50 cable calculation exercises covering BS 7671:2018+A2:2022 Appendix 4 methods with 95% accuracy by the end of this month.&rdquo; This version is measurable (50 exercises, 95% accuracy) and time-bound (end of month). Cable calculation skills are absolutely relevant to apprentices and achievable with practice, so those elements are not the issue. The original goal is an aspiration, not a goal. SMART goals force you to define what success looks like in concrete, verifiable terms.',
  },
  {
    id: 7,
    question:
      'A self-employed electrician sets the goal: &ldquo;Earn &pound;60,000 in the next 12 months.&rdquo; This goal is specific, measurable, and time-bound. To make it fully SMART, what additional element must be considered?',
    options: [
      'Whether &pound;60,000 is achievable given current client base, pricing, and capacity',
      'Whether the goal is written down in a specific format',
      'Whether the goal has been shared with family and friends',
      'Whether the electrician has set similar goals in the past',
    ],
    correctAnswer: 0,
    explanation:
      'The missing element is Achievable (and, by extension, Relevant). To assess whether &pound;60,000 in 12 months is achievable, the electrician must consider: current average monthly earnings, available working days (accounting for holidays, sickness, and quiet periods), average day rate, client pipeline, and capacity constraints. If the electrician currently earns &pound;35,000/year working full-time, a jump to &pound;60,000 in one year requires either a 71% increase in day rate or a 71% increase in billable days, both of which may be unrealistic without significant changes to the business model. An achievable stretch goal might be &pound;42,000&ndash;&pound;45,000 (20&ndash;30% growth). Writing goals down and sharing them are valuable practices but are not part of the SMART framework itself.',
  },
  {
    id: 8,
    question:
      'Which of the following represents the best balance between activity goals and achievement goals for an apprentice preparing for the AM2 assessment?',
    options: [
      'Activity only: &ldquo;Practice conduit bending for two hours every Saturday.&rdquo;',
      'Achievement only: &ldquo;Pass the AM2 assessment with a score of 85%+.&rdquo;',
      'Both: &ldquo;Practice conduit bending for two hours every Saturday (activity), in order to pass the AM2 conduit task with no major defects (achievement).&rdquo;',
      'Neither activity nor achievement goals are useful for practical skills',
    ],
    correctAnswer: 2,
    explanation:
      'The most effective goal structure combines both activity goals (behaviours you control) and achievement goals (outcomes you want). Activity goals provide daily direction and are entirely within your control &mdash; you can decide to practice conduit bending for two hours, regardless of external factors. Achievement goals provide the ultimate target and meaning &mdash; you are not practicing conduit bending for its own sake, but to pass the AM2 assessment. When you combine both, you get the benefits of controllable daily action and meaningful long-term direction. If you focus only on activity, you may practice ineffectively without progressing. If you focus only on achievement, you may become paralysed by the magnitude of the goal without a clear action plan. The best goals answer two questions: What will I do? (activity) and Why am I doing it? (achievement).',
  },
];

export default function GSModule2Section1() {
  useSEO({
    title: 'The SMART Framework for Trade Careers | Goal Setting Module 2.1',
    description:
      'Specific, Measurable, Achievable, Relevant, Time-bound goals for apprentices, qualified electricians, and business owners.',
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
            <Focus className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The SMART Framework for Trade Careers
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Specific, Measurable, Achievable, Relevant, Time-bound goals for apprentices, qualified
            electricians, and business owners
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SMART</strong> = Specific, Measurable, Achievable, Relevant, Time-bound
              </li>
              <li>
                <strong>Specific:</strong> Exactly what, where, when, and how
              </li>
              <li>
                <strong>Measurable:</strong> Objective success criteria you can verify
              </li>
              <li>
                <strong>Achievable:</strong> Difficult but believable given your current capability
              </li>
              <li>
                <strong>Relevant:</strong> Aligned with your larger career direction
              </li>
              <li>
                <strong>Time-bound:</strong> Clear deadline creating urgency
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Clarity:</strong> SMART goals eliminate ambiguity and provide a clear target
              </li>
              <li>
                <strong>Motivation:</strong> Difficult, specific goals drive higher performance than
                vague intentions
              </li>
              <li>
                <strong>Accountability:</strong> Measurable criteria make it impossible to
                self-deceive about progress
              </li>
              <li>
                <strong>Action:</strong> SMART goals lead directly to action plans and
                implementation intentions
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define each element of the SMART framework and explain why it matters for goal achievement',
              'Convert vague intentions into SMART goals for apprentices, qualified electricians, and business owners',
              'Apply Locke and Latham&rsquo;s goal-setting principles to electrical trade careers',
              'Create implementation intentions (if-then plans) to bridge goal setting and goal achievement',
              'Distinguish between activity goals (what you do) and achievement goals (what you accomplish)',
              'Identify common goal-setting mistakes and apply corrective strategies',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is SMART? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            What is SMART?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SMART framework is the most widely used goal-setting method in the world. It was
                first published by George T. Doran in a 1981 issue of <em>Management Review</em>{' '}
                under the title &ldquo;There&rsquo;s a S.M.A.R.T. Way to Write Management&rsquo;s
                Goals and Objectives.&rdquo; Doran worked at the Washington Water Power Company and
                observed that most organisational goals were too vague to be useful. His SMART
                acronym provided a simple checklist to ensure that goals were actionable. Over four
                decades, the framework has been validated by extensive research in psychology,
                management science, and education. For electricians &mdash; whether apprentices
                learning new skills, qualified tradespeople pursuing additional qualifications, or
                business owners growing their companies &mdash; SMART provides a proven structure
                for turning intentions into achievements.
              </p>

              <p>
                SMART stands for <strong>Specific, Measurable, Achievable, Relevant,</strong> and
                <strong> Time-bound</strong>. Each element addresses a common failure mode in
                goal-setting. Goals fail when they are vague (not specific), when success is
                undefined (not measurable), when they are impossibly difficult or trivially easy
                (not achievable), when they do not align with larger objectives (not relevant), or
                when they lack urgency (not time-bound). The SMART framework forces you to confront
                each of these failure modes explicitly. A goal that passes all five tests is far
                more likely to be achieved than a goal that fails one or more tests. This is not
                theory &mdash; it is empirical fact demonstrated across thousands of studies.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  SMART vs &ldquo;Do Your Best&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed">
                  Edwin Locke and Gary Latham&rsquo;s research spanning four decades consistently
                  shows that difficult, specific goals (SMART goals) produce higher performance than
                  &ldquo;do your best&rdquo; goals, easy goals, or no goals at all. When people are
                  told to &ldquo;do your best&rdquo;, they typically achieve less than when given a
                  specific challenging target. Why? Because &ldquo;do your best&rdquo; allows for
                  self-deception and rationalisation. SMART goals eliminate ambiguity and create
                  accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: S = Specific */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>S = Specific
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A specific goal answers the questions: What exactly will I do? Where will I do it?
                When will I do it? How will I do it? Vague goals like &ldquo;get better at
                electrical work&rdquo; or &ldquo;improve my knowledge of BS 7671&rdquo; fail the
                specificity test because they do not identify what particular aspect of electrical
                work or which specific section of BS 7671:2018+A2:2022 will be improved. A specific
                version might be: &ldquo;Complete all 30 questions in the BS 7671 Section 433
                overcurrent protection workbook, focusing on cable sizing calculations for motor
                circuits.&rdquo; This goal is specific because it identifies exactly what will be
                done (30 questions), in which area (Section 433 overcurrent protection), and what
                type of calculation (motor circuit cable sizing).
              </p>

              <p>
                Specificity matters because it directs attention and effort. When a goal is vague,
                your brain does not know where to focus. When a goal is specific, your brain can
                begin to construct an action plan automatically. The specific goal also makes it
                easier to identify when you are procrastinating or off-track. If your goal is
                &ldquo;learn more about BS 7671&rdquo;, you can spend an hour reading random
                sections and feel productive. If your goal is &ldquo;complete Section 433
                overcurrent protection workbook questions 1&ndash;30&rdquo;, there is no ambiguity
                about whether you are making progress. For electricians, specificity is particularly
                important because electrical competence is domain-specific &mdash; being good at
                conduit bending does not make you good at three-phase motor control. You must target
                specific skills explicitly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Worked Example: Vague to Specific
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Vague:</strong> &ldquo;Improve my testing skills.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Specific:</strong> &ldquo;Perform and document 10 full electrical
                      installation condition reports (EICRs) in accordance with BS 7671:2018+A2:2022
                      and GN3 9th Edition, including all required tests from insulation resistance
                      through to RCD tripping times.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The specific version identifies the exact skill (EICR testing), the standard
                      (BS 7671:2018+A2:2022 and GN3 9th Edition), and the scope (all required
                      tests). This goal provides a clear target.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: M = Measurable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>M = Measurable
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A measurable goal includes objective criteria that allow you to verify whether the
                goal has been achieved. Measurable criteria might include: a numerical target (score
                85%+ on the exam), a tolerance (bend conduit within 2mm of the target angle), a
                completion count (complete 50 cable calculations), or a pass/fail test (pass the AM2
                assessment on first attempt). The key requirement is that the measurement is
                objective &mdash; a third party should be able to determine whether you achieved the
                goal without relying on your opinion or feeling.
              </p>

              <p>
                Goals like &ldquo;feel more confident with three-phase systems&rdquo; or
                &ldquo;impress my supervisor&rdquo; are not measurable because they rely on
                subjective judgement. Confidence and impressions fluctuate based on mood and
                context. A measurable version might be: &ldquo;Wire and commission a three-phase
                motor starter circuit with DOL and star-delta configurations, verified by supervisor
                sign-off.&rdquo; This is measurable because there is a physical output (the wired
                circuit), a functional test (commission = prove it works), and external verification
                (supervisor sign-off). Measurability creates accountability and prevents
                self-deception. You cannot claim to have achieved a measurable goal unless the
                evidence supports it.
              </p>

              <p>
                For electricians, measurable goals often align with industry standards and
                assessment criteria. The AM2 assessment, City &amp; Guilds exams, and JIB grading
                all provide measurable standards. Use these external benchmarks wherever possible
                because they are objective, recognised, and portable (they mean something to
                employers and clients). When no external benchmark exists, create your own
                measurable criteria based on time, accuracy, or completion count. The goal is not to
                make measurement easy, but to make achievement verifiable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Worked Example: Vague to Measurable
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Vague:</strong> &ldquo;Get faster at fault finding.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Measurable:</strong> &ldquo;Diagnose and rectify a simulated lighting
                      circuit fault (broken neutral, reversed polarity, or loose connection) in
                      under 15 minutes, verified by timed practice sessions.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The measurable version provides a time target (under 15 minutes), a defined
                      task (diagnose and rectify three specific fault types), and a verification
                      method (timed practice). This is objective and verifiable.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: A = Achievable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>A = Achievable
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An achievable goal is one that is difficult but believable given your current
                knowledge, skills, resources, and time. This is the most nuanced element of SMART
                because it requires balancing two competing risks: setting goals that are too easy
                (leading to underperformance) and setting goals that are too hard (leading to
                demotivation and abandonment). Locke and Latham&rsquo;s research shows that the
                optimal goal difficulty is at the edge of current capability &mdash; you should
                succeed approximately 50&ndash;70% of the time if you apply full effort. If you
                succeed 100% of the time, your goals are too easy. If you succeed less than 30% of
                the time, your goals are likely too difficult.
              </p>

              <p>
                For an apprentice electrician in the first year of training, an achievable goal
                might be: &ldquo;Complete BS 7671 cable selection exercises for final circuits with
                90% accuracy within two weeks.&rdquo; The same goal would be trivially easy for a
                qualified electrician and inappropriately difficult for someone with zero electrical
                knowledge. Achievability depends on context. When assessing whether a goal is
                achievable, ask yourself: Have I (or has someone with similar starting capability)
                achieved this before? Do I have the resources (time, tools, materials, access to
                learning) to make progress? Do I believe I can succeed if I apply sustained effort?
                If the answer to any of these questions is no, the goal may not be achievable in its
                current form.
              </p>

              <p>
                It is important to distinguish between achievable and easy. Achievable goals should
                require significant effort, focus, and possibly discomfort. They should stretch your
                current capability. But they should not require a miracle. A common mistake is
                setting &ldquo;aspirational&rdquo; goals that are actually fantasy goals &mdash; for
                example, an apprentice setting a goal to pass the City &amp; Guilds 2391-52
                Inspection and Testing exam next week without having studied the content or
                performed any test procedures. This goal is not achievable. It is a wish. The
                distinction matters because unachievable goals destroy motivation, while difficult
                but achievable goals build it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Goldilocks Principle for Goal Difficulty
                </p>
                <p className="text-base text-white leading-relaxed">
                  Your goals should be like Goldilocks&rsquo; porridge: not too easy (you are
                  coasting), not too hard (you are overwhelmed), but just right (you are challenged
                  but capable). A good test: when you set a goal, you should feel a mix of
                  excitement and slight nervousness. If you feel only excitement, the goal may be
                  too easy. If you feel only nervousness or dread, the goal may be too hard. The
                  sweet spot is where both emotions coexist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: R = Relevant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>R = Relevant
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A relevant goal is one that aligns with your larger career objectives and personal
                values. Relevance answers the question: Why does this goal matter? How does it
                contribute to where I want to be in one year, five years, or ten years? A goal can
                be specific, measurable, achievable, and time-bound but still be irrelevant if it
                does not serve a larger purpose. For example, an apprentice electrician might set a
                goal to learn advanced PLC programming. This goal can be SMART on all other
                dimensions, but if the apprentice wants to specialise in domestic installation work
                where PLCs are never used, the goal is not relevant. The effort would be better
                directed towards goals that directly support domestic installation competence.
              </p>

              <p>
                Relevance is particularly important for tradespeople because time is scarce. Between
                working full-time, studying for qualifications, maintaining tools and vehicles, and
                managing personal life, there are limited hours available for goal pursuit. Every
                goal you commit to is a goal you cannot pursue elsewhere. This means you must be
                selective and strategic. Relevant goals create compounding progress &mdash; each
                achievement builds on the last, moving you closer to a coherent destination.
                Irrelevant goals create scattered progress &mdash; you accumulate skills and
                knowledge that do not connect to a larger career narrative.
              </p>

              <p>
                To assess relevance, map your short-term goals to your medium-term and long-term
                goals. If you cannot draw a clear line from &ldquo;complete this workbook&rdquo; to
                &ldquo;become a JIB Approved Electrician&rdquo; to &ldquo;run my own electrical
                contracting business&rdquo;, the goal may not be relevant. This does not mean every
                goal must be career-focused &mdash; personal goals (fitness, relationships, hobbies)
                are relevant if they contribute to your overall wellbeing and energy. However,
                within your career goals, every goal should support the larger trajectory. Relevance
                ensures that effort is not wasted.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Worked Example: Relevant vs Irrelevant
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Relevant:</strong> An electrician who wants to specialise in
                      inspection and testing sets a goal to complete the City &amp; Guilds 2391-52
                      qualification. This goal directly supports the career direction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Irrelevant:</strong> The same electrician sets a goal to learn
                      advanced solar PV system design when they have no intention of working in
                      renewable energy. The goal is not aligned with their career direction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Both goals could be SMART on other dimensions, but only the first is relevant.
                      Relevance is about strategic alignment.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: T = Time-bound */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>T = Time-bound
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A time-bound goal has a clear deadline that creates urgency and focus. Without a
                deadline, goals drift indefinitely. &ldquo;I will complete the City &amp; Guilds
                2365 Level 3 qualification&rdquo; is not time-bound. &ldquo;I will complete the City
                &amp; Guilds 2365 Level 3 qualification by 30 June 2026&rdquo; is time-bound. The
                deadline forces planning and prioritisation. If you have six months to achieve a
                goal, you can calculate backwards: What must be done in month five? Month three?
                This week? Without a deadline, there is no forcing function to start today rather
                than tomorrow.
              </p>

              <p>
                Deadlines also make goals measurable in a temporal sense. When the deadline arrives,
                you either achieved the goal or you did not. There is no ambiguity. This
                accountability is psychologically powerful. Research on Parkinson&rsquo;s Law
                (&ldquo;work expands to fill the time available for its completion&rdquo;) shows
                that people with tight deadlines often achieve the same quality of output as people
                with generous deadlines, but in significantly less time. Deadlines focus effort and
                reduce procrastination. For electricians juggling work, study, and personal
                commitments, time-bound goals are essential for ensuring that study does not get
                perpetually deferred.
              </p>

              <p>
                The appropriate deadline length depends on the scope of the goal. A goal to complete
                a single workbook section might have a deadline of one week. A goal to pass the AM2
                assessment might have a deadline of six months (allowing time for structured
                practice and consolidation). A goal to achieve JIB Approved Electrician status might
                have a deadline of three years (the typical apprenticeship duration). The deadline
                should create urgency without creating panic. If the deadline is too short, you will
                feel overwhelmed and may abandon the goal. If the deadline is too long, you will
                procrastinate and waste time. The Goldilocks principle applies here as well: not too
                tight, not too loose, but just right.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Fixed Deadlines vs Rolling Deadlines
                </p>
                <p className="text-base text-white leading-relaxed">
                  Fixed deadlines (e.g., &ldquo;complete by 31 March 2026&rdquo;) are best for goals
                  tied to external events like exams or contract deadlines. Rolling deadlines (e.g.,
                  &ldquo;within the next four months&rdquo;) are acceptable for personal development
                  goals but carry a higher risk of procrastination. Where possible, use fixed
                  calendar dates rather than relative time periods. &ldquo;Complete by 15
                  August&rdquo; is more powerful than &ldquo;complete in 12 weeks&rdquo; because the
                  calendar date is concrete and inescapable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Implementation Intentions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Implementation Intentions: The Missing Link
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A SMART goal tells you <em>what</em> to achieve and <em>by when</em>, but it does
                not tell you <em>how</em> or <em>when</em> you will work on it. This is where
                implementation intentions come in. An implementation intention is an if-then plan
                that specifies exactly when, where, and how you will take action towards your goal.
                The format is simple: &ldquo;If [situational cue], then I will [specific
                behaviour].&rdquo; For example: &ldquo;If it is 7pm on Monday, Wednesday, and
                Friday, then I will study BS 7671 Section 433 for 30 minutes at my kitchen
                table.&rdquo;
              </p>

              <p>
                Implementation intentions were researched extensively by psychologist Peter
                Gollwitzer and have been shown to double or even triple goal achievement rates
                compared to goal intentions alone. Why are they so powerful? Because they automate
                the decision to act. Without an implementation intention, you must decide every day:
                Should I study tonight? When should I start? Where should I sit? What should I study
                first? Each decision consumes willpower and creates an opportunity to procrastinate.
                With an implementation intention, the decision is pre-made. When the situational cue
                occurs (it is 7pm on Monday), the behaviour is triggered automatically. You do not
                deliberate; you execute.
              </p>

              <p>
                For electricians, implementation intentions are particularly valuable because work
                schedules can be unpredictable and exhausting. After a long day on site, willpower
                is depleted and the temptation to collapse on the sofa is strong. If you rely on
                in-the-moment motivation to study, you will fail more often than you succeed. But if
                you have a pre-committed implementation intention (&ldquo;If I arrive home and it is
                before 7pm, then I will study for 20 minutes before turning on the TV&rdquo;), the
                decision is already made. You remove the friction and the internal negotiation. This
                is how disciplined people appear to have endless willpower &mdash; they do not rely
                on willpower at all. They rely on pre-commitment and environmental design.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Worked Example: SMART Goal + Implementation Intentions
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>SMART Goal:</strong> &ldquo;Complete all 50 cable calculation
                      exercises in the BS 7671 Appendix 4 workbook with 95% accuracy by 31 March
                      2026.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Implementation Intention 1:</strong> &ldquo;If it is 6:30am on Tuesday
                      and Thursday, then I will complete five cable calculation exercises before
                      leaving for work.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Implementation Intention 2:</strong> &ldquo;If it is Sunday at 9am,
                      then I will complete 10 cable calculation exercises and review any errors from
                      the previous week.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      These implementation intentions specify exactly when (days and times), where
                      (implied: at home before work / Sunday morning), and how many (5 exercises
                      twice per week + 10 on Sunday = 20/week = 50 in 2.5 weeks, providing a
                      comfortable buffer before the 31 March deadline). The goal is clear; the plan
                      is concrete.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Activity Goals vs Achievement Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Activity Goals vs Achievement Goals
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are two types of goals: activity goals (also called process goals or behaviour
                goals) and achievement goals (also called outcome goals or result goals). Activity
                goals focus on what you do: &ldquo;Study for 30 minutes per day.&rdquo; Achievement
                goals focus on what you accomplish: &ldquo;Pass the AM2 assessment with a score of
                85%+.&rdquo; Both are important, and the most effective goal structures combine
                both. Activity goals provide daily direction and are entirely within your control.
                Achievement goals provide ultimate meaning and ensure that activity is directed
                towards a worthwhile outcome.
              </p>

              <p>
                The advantage of activity goals is that you can achieve them regardless of external
                factors. You control whether you study for 30 minutes today. You do not fully
                control whether you pass an exam (exam difficulty, your state of health on the day,
                and other variables influence the outcome). When goals are purely achievement-based,
                you can feel helpless if progress is slow. Activity goals restore agency and provide
                daily wins. However, activity goals alone can become empty rituals if they are not
                connected to meaningful outcomes. You can study for 30 minutes per day for a year
                and still fail your exam if the study is unfocused or ineffective. This is why both
                types of goals are necessary.
              </p>

              <p>
                The optimal goal structure is: one achievement goal supported by multiple activity
                goals. For example: <strong>Achievement goal:</strong> &ldquo;Pass the City &amp;
                Guilds 2391-52 Initial Verification exam on my first attempt by 30 September
                2026.&rdquo; <strong>Activity goals:</strong> (1) &ldquo;Complete one past paper per
                week under timed conditions.&rdquo; (2) &ldquo;Study GN3 9th Edition testing
                procedures for 45 minutes every Monday, Wednesday, and Friday.&rdquo; (3)
                &ldquo;Perform at least five full EICRs on real installations, documented in
                accordance with BS 7671:2018+A2:2022.&rdquo; The achievement goal provides the
                destination; the activity goals provide the journey. If you complete all the
                activity goals consistently, the achievement goal becomes almost inevitable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Leading Indicators vs Lagging Indicators
                </p>
                <p className="text-base text-white leading-relaxed">
                  Activity goals are leading indicators &mdash; they predict future success.
                  Achievement goals are lagging indicators &mdash; they measure success after it has
                  occurred. You cannot control lagging indicators directly, but you can control
                  leading indicators. By focusing on the right leading indicators (deliberate
                  practice, focused study, documented EICRs), the lagging indicators (exam pass,
                  qualification achieved) take care of themselves. Track both, but manage your
                  leading indicators daily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Common SMART Goal Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Common SMART Goal Mistakes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when people understand the SMART framework, several predictable mistakes occur.
                <strong> Mistake 1: Too many goals.</strong> Setting 15 SMART goals across every
                area of life is a recipe for burnout and failure. Attention is finite. Most people
                can sustain focused effort on 2&ndash;3 major goals at a time. Additional goals
                beyond this threshold dilute effort and reduce achievement rates across all goals.
                Be selective. Choose the 2&ndash;3 goals that matter most right now, commit to them
                fully, and defer other goals until these are achieved.
              </p>

              <p>
                <strong>Mistake 2: Goals without implementation intentions.</strong> A SMART goal
                tells you what to achieve, but not when or how to work on it. Without implementation
                intentions, the goal remains an abstract intention that is easily displaced by
                immediate demands. Always pair SMART goals with if-then plans that specify when,
                where, and how action will occur.
                <strong> Mistake 3: Focusing only on achievement goals.</strong> If all your goals
                are outcome-based (&ldquo;pass the exam&rdquo;, &ldquo;earn &pound;50,000&rdquo;),
                you lack daily direction and may feel helpless when progress is slow. Balance
                achievement goals with activity goals that you fully control.
              </p>

              <p>
                <strong>Mistake 4: Setting goals to please others.</strong> Goals imposed by
                parents, partners, or employers that do not align with your own values and interests
                are unlikely to be sustained. Motivation is highest when goals are autonomously
                chosen &mdash; when you pursue them because you genuinely want the outcome, not
                because someone else expects it. This does not mean you should ignore external
                expectations entirely (if passing the AM2 is required for your apprenticeship, it is
                a legitimate goal), but the goal should connect to your own reasons and values, not
                just external pressure.
              </p>

              <p>
                <strong>Mistake 5: Never reviewing or revising goals.</strong> Goals are not carved
                in stone. Your circumstances change, your knowledge changes, and sometimes your
                priorities change. A goal that was relevant six months ago may no longer be relevant
                today. Review your goals monthly. Ask: Is this goal still aligned with where I want
                to go? Am I making progress? If not, why not? Is the goal too difficult, or am I not
                executing the activity goals? Adjust as needed. Rigid adherence to an outdated goal
                is not discipline; it is stubbornness.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The 2&ndash;3 Goal Rule</p>
                <p className="text-sm text-white leading-relaxed">
                  Most people can sustain focused effort on 2&ndash;3 major goals simultaneously.
                  More than that, and performance degrades across all goals. Choose your top
                  2&ndash;3 goals for this quarter. Write them down. Commit to them. Defer
                  everything else. Once you achieve one of the top three, you can promote a new goal
                  from the deferred list. This approach creates focus and momentum rather than
                  scattered effort and mediocre results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: SMART Goals for Apprentices, Qualified Electricians, and Business Owners */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            SMART Goals for Apprentices, Qualified Electricians, and Business Owners
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                SMART goals look different at different career stages.
                <strong> For apprentices,</strong> the primary focus is skill acquisition and
                qualification completion. Example SMART goals: (1) &ldquo;Complete the City &amp;
                Guilds 2365 Level 2 Diploma with a merit grade or higher by June 2026.&rdquo; (2)
                &ldquo;Pass the AM2 practical assessment on my first attempt with no major defects
                by December 2026.&rdquo; (3) &ldquo;Achieve 100% accuracy on BS 7671 cable selection
                calculations for ring final circuits and radial circuits by the end of this
                month.&rdquo; These goals are specific to the apprenticeship journey and aligned
                with the qualification requirements.
              </p>

              <p>
                <strong>For qualified electricians,</strong> goals shift towards specialisation,
                additional qualifications, and career progression. Example SMART goals: (1)
                &ldquo;Complete the City &amp; Guilds 2391-52 Inspection and Testing qualification
                by September 2026 and perform 20 documented EICRs by December 2026.&rdquo; (2)
                &ldquo;Achieve JIB Technician grading by completing the City &amp; Guilds 2396
                Design qualification and demonstrating design competence on five commercial
                projects.&rdquo; (3) &ldquo;Join NICEIC as an Approved Contractor and complete 50
                notifiable jobs with zero non-conformances by March 2027.&rdquo; These goals reflect
                the transition from competent installer to specialist or senior tradesperson.
              </p>

              <p>
                <strong>For business owners,</strong> goals expand to include financial performance,
                team development, and business systems. Example SMART goals: (1) &ldquo;Increase
                monthly recurring revenue from maintenance contracts to &pound;5,000/month by
                signing 10 new commercial maintenance contracts by December 2026.&rdquo; (2)
                &ldquo;Recruit and train one JIB Approved Electrician to deliver domestic
                installation work independently, verified by supervisor sign-off on 10 completed
                jobs by June 2026.&rdquo; (3) &ldquo;Achieve net profit margin of 20% by
                implementing job costing systems and reducing material waste to under 5% by
                September 2026.&rdquo; Business goals require both technical and commercial
                competence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Tailor SMART to Your Context
                </p>
                <p className="text-base text-white leading-relaxed">
                  The SMART framework is universal, but the content of the goals must reflect your
                  current stage, role, and context. An apprentice&rsquo;s SMART goal focuses on
                  learning; a qualified electrician&rsquo;s SMART goal focuses on specialisation or
                  progression; a business owner&rsquo;s SMART goal focuses on growth and
                  profitability. Use the framework, but fill it with goals that matter to you right
                  now.
                </p>
              </div>
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
                This section introduced the SMART framework as the foundation for effective
                goal-setting. The points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>SMART goals</strong> are Specific (exactly what, where, when),
                    Measurable (objective success criteria), Achievable (difficult but believable),
                    Relevant (aligned with larger objectives), and Time-bound (clear deadline).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Implementation intentions</strong> (if-then plans) bridge the gap
                    between goal-setting and goal achievement by pre-committing to when, where, and
                    how action will occur.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Activity goals</strong> (what you do) and
                    <strong> achievement goals</strong> (what you accomplish) work together. Track
                    leading indicators (activity) to drive lagging indicators (achievement).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Optimal goal difficulty</strong> is at the edge of current capability
                    &mdash; hard enough to require full effort, but not so hard that success seems
                    impossible.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Focus on 2&ndash;3 major goals</strong> at a time to avoid diluting
                    effort and reducing achievement rates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Review and revise goals monthly.</strong> Goals are tools, not prison
                    sentences. Adjust when circumstances or priorities change.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore
                  short, medium, and long-term goal planning &mdash; the three horizons framework,
                  goal cascading, planning fallacy, and review cycles. SMART gives you the structure
                  for individual goals; time horizons give you the structure for a coherent goal
                  system.
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
            <Link to="../gs-module-2-section-2">
              Next: Short, Medium &amp; Long-Term Goal Planning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
