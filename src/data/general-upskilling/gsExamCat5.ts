import { StandardMockQuestion } from '@/types/standardMockExam';

export const gsCat5Questions: StandardMockQuestion[] = [
  // =====================================================
  // Category 5: Your Growth Action Plan (id 161-200)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================

  // --- BASIC (16 questions: 161-176) ---
  {
    id: 161,
    question:
      'In Chris McChesney&rsquo;s 4 Disciplines of Execution (4DX), what does WIG stand for?',
    options: [
      'Work In General',
      'Wildly Important Goal',
      'Weekly Improvement Guide',
      'Wider Industry Growth',
    ],
    correctAnswer: 1,
    explanation:
      'WIG stands for Wildly Important Goal. McChesney argues that focusing on one or two WIGs at a time &mdash; rather than spreading effort across dozens of goals &mdash; dramatically increases the likelihood of achieving breakthrough results. The 4DX framework is built around this principle of disciplined focus.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 162,
    question:
      'According to Daniel Pink&rsquo;s book Drive, which three elements make up intrinsic motivation?',
    options: [
      'Speed, Accuracy, Consistency',
      'Money, Status, Security',
      'Autonomy, Mastery, Purpose',
      'Fear, Reward, Habit',
    ],
    correctAnswer: 2,
    explanation:
      'Daniel Pink identifies Autonomy (the desire to direct your own life), Mastery (the urge to get better at something that matters), and Purpose (the yearning to do what we do in service of something larger than ourselves) as the three pillars of true motivation. These intrinsic drivers consistently outperform external rewards for complex, creative work.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Intrinsic Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 163,
    question: 'What is the &ldquo;5-minute rule&rdquo; for overcoming procrastination?',
    options: [
      'Take a 5-minute break every time a task starts to feel difficult or boring',
      'Spend the first 5 minutes of any task planning it out in detail before starting',
      'Reward yourself with a 5-minute treat each time you complete a task',
      'Commit to working on a task for just 5 minutes, then decide whether to continue',
    ],
    correctAnswer: 3,
    explanation:
      'The 5-minute rule works because starting is almost always the hardest part. By committing to just 5 minutes, you lower the psychological barrier to beginning. Research in behavioural psychology shows that once people start a task, they frequently continue well beyond the initial commitment due to the Zeigarnik effect &mdash; our brains dislike leaving tasks incomplete.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Overcoming Procrastination',
    category: 'Your Growth Action Plan',
  },
  {
    id: 164,
    question: 'According to Angela Duckworth, what two components make up &ldquo;grit&rdquo;?',
    options: [
      'Passion and perseverance',
      'Confidence and speed',
      'Intelligence and discipline',
      'Talent and luck',
    ],
    correctAnswer: 0,
    explanation:
      'Angela Duckworth defines grit as the combination of passion (a deep, enduring interest) and perseverance (the sustained effort to keep going despite setbacks). Her research at the University of Pennsylvania shows that grit is a stronger predictor of long-term success than IQ or talent alone.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Grit',
    category: 'Your Growth Action Plan',
  },
  {
    id: 165,
    question:
      'What does the ASTD (now ATD) study suggest happens to goal achievement when you have an accountability partner?',
    options: [
      'Success rate drops to 10%',
      'Success rate rises to approximately 65%',
      'It makes no measurable difference',
      'Success rate rises to approximately 30%',
    ],
    correctAnswer: 1,
    explanation:
      'The American Society for Training &amp; Development found that having a specific accountability partner raises the probability of completing a goal to approximately 65%. When you add a scheduled accountability appointment, that figure rises further to around 95%. This demonstrates the powerful effect of social commitment on follow-through.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Accountability Partners',
    category: 'Your Growth Action Plan',
  },
  {
    id: 166,
    question: 'Why are 90-day planning cycles considered effective for goal achievement?',
    options: [
      'They align neatly with the four quarters used in company financial reporting',
      'They are the shortest period over which any meaningful habit can be formed',
      'They are long enough to make meaningful progress but short enough to maintain urgency',
      'They guarantee a goal will be achieved regardless of the effort applied',
    ],
    correctAnswer: 2,
    explanation:
      'Ninety-day cycles strike the optimal balance between ambition and urgency. Research by Brian Moran in The 12 Week Year shows that shorter execution periods reduce procrastination because deadlines feel immediate. A 90-day window is long enough to complete substantial projects but short enough that you cannot afford to waste the first few weeks.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: '90-Day Planning',
    category: 'Your Growth Action Plan',
  },
  {
    id: 167,
    question: 'What is the &ldquo;sunk cost fallacy&rdquo; in the context of goal pursuit?',
    options: [
      'Abandoning a goal the moment it stops feeling enjoyable or exciting',
      'Setting goals that are far too ambitious for the time you have available',
      'Investing only in goals that promise the quickest possible financial return',
      'Continuing to invest in a goal because of what you have already spent, rather than future value',
    ],
    correctAnswer: 3,
    explanation:
      'The sunk cost fallacy describes our tendency to continue pursuing something because of resources (time, money, effort) already invested, even when the rational choice is to stop. Behavioural economists Daniel Kahneman and Amos Tversky identified this cognitive bias as a major obstacle to sound decision-making in both business and personal goals.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Sunk Cost Fallacy',
    category: 'Your Growth Action Plan',
  },
  {
    id: 168,
    question:
      'In James Clear&rsquo;s identity-based motivation model, what should you focus on first when setting goals?',
    options: [
      'The type of person you want to become',
      'The specific outcome you want to achieve',
      'The process or system you will follow',
      'The rewards you will receive',
    ],
    correctAnswer: 0,
    explanation:
      'James Clear argues in Atomic Habits that lasting change begins with identity. Instead of saying &ldquo;I want to pass the inspection exam,&rdquo; you say &ldquo;I am the type of electrician who studies every day.&rdquo; When behaviour is tied to identity, motivation becomes self-reinforcing because every action is a vote for the person you are becoming.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Identity-Based Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 169,
    question: 'What is the key difference between intrinsic and extrinsic motivation?',
    options: [
      'Intrinsic motivation works for everyone; extrinsic motivation only works for some people',
      'Intrinsic motivation comes from internal satisfaction; extrinsic comes from external rewards',
      'Intrinsic motivation is short-lived; extrinsic motivation always lasts a lifetime',
      'Intrinsic motivation applies only to physical tasks; extrinsic to mental tasks',
    ],
    correctAnswer: 1,
    explanation:
      'Intrinsic motivation is driven by personal enjoyment, curiosity, or a sense of purpose, whereas extrinsic motivation relies on external rewards such as money, praise, or certification. Daniel Pink&rsquo;s research in Drive shows that for complex cognitive tasks, intrinsic motivation produces better long-term performance and satisfaction than external incentives alone.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Intrinsic vs Extrinsic Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 170,
    question:
      'In the persist, pivot, or stop decision framework, when should you consider &ldquo;pivoting&rdquo;?',
    options: [
      'When both the goal and your current approach are clearly working well',
      'When you have lost all interest in the goal and want to abandon it entirely',
      'When the goal is still valid but the current approach is not working',
      'When you have only just started and have invested very little so far',
    ],
    correctAnswer: 2,
    explanation:
      'Pivoting means keeping the overall direction but changing your method or approach. Eric Ries popularised this concept in The Lean Startup, and it applies equally to personal goals. If your destination (e.g., becoming a qualified electrician) remains right but your route (e.g., self-study alone) is failing, a pivot &mdash; such as joining a study group &mdash; is the correct response.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Persist, Pivot, or Stop',
    category: 'Your Growth Action Plan',
  },
  {
    id: 171,
    question:
      'What popular saying captures the idea of overestimating short-term progress and underestimating long-term progress?',
    options: [
      'A goal without a deadline is simply a wish that will never be achieved',
      'If you can dream it, you can achieve it within a single year of effort',
      'Success is 10 per cent inspiration and 90 per cent perspiration',
      'We overestimate what we can do in 1 year and underestimate what we can do in 10 years',
    ],
    correctAnswer: 3,
    explanation:
      'This insight, often attributed to Bill Gates, highlights how humans misjudge the pace of change. In 1 year, progress feels frustratingly slow. Over 10 years, compound growth creates extraordinary results. For electricians, consistent small improvements &mdash; one new skill per quarter, one additional qualification per year &mdash; compound into a dramatically different career.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'The Long Game',
    category: 'Your Growth Action Plan',
  },
  {
    id: 172,
    question: 'What is one key benefit of having a mentor in the electrical trade?',
    options: [
      'They provide guidance based on real experience, helping you avoid common mistakes',
      'They take legal responsibility for any mistakes you make on site',
      'They guarantee you will be promoted faster than colleagues without a mentor',
      'They complete your continuing professional development records on your behalf',
    ],
    correctAnswer: 0,
    explanation:
      'Mentoring provides access to hard-won experience and accelerates professional development. The IET runs a formal mentoring scheme that pairs early-career engineers with experienced professionals. Research consistently shows that mentored individuals progress faster, earn more, and report higher job satisfaction than those without mentors.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Mentoring in the Electrical Trade',
    category: 'Your Growth Action Plan',
  },
  {
    id: 173,
    question: 'What is burnout prevention most closely related to in a growth plan?',
    options: [
      'Pushing through tiredness so that productivity is never interrupted',
      'Building rest and recovery into your schedule as a non-negotiable part of growth',
      'Setting goals so ambitious that they leave no time for breaks',
      'Working the longest hours possible to get ahead of competitors',
    ],
    correctAnswer: 1,
    explanation:
      'Research by Christina Maslach at UC Berkeley shows that burnout results from chronic workplace stress that has not been successfully managed. Rest is not the opposite of productivity &mdash; it is a prerequisite for it. Growth plans that schedule deliberate recovery periods (evenings off, weekends protected, annual leave used) sustain performance far longer than those that demand constant output.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Burnout Prevention',
    category: 'Your Growth Action Plan',
  },
  {
    id: 174,
    question: 'In the 4DX framework, what is a &ldquo;lead measure&rdquo;?',
    options: [
      'The final outcome you are working towards, such as passing an exam',
      'A target that is reviewed only once at the very end of the goal period',
      'A predictive, influenceable metric that drives progress towards the goal',
      'A measure of how impressive your progress looks to other people',
    ],
    correctAnswer: 2,
    explanation:
      'Chris McChesney distinguishes between lag measures (outcomes you cannot directly control, like passing an exam) and lead measures (actions you can control, like hours of study per week). Focusing on lead measures is more effective because they are both predictive of the goal and influenceable by your daily actions.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 175,
    question: 'What is the purpose of an annual review in your growth action plan?',
    options: [
      'To calculate the total income earned over the previous twelve months',
      'To compare your performance directly against that of your competitors',
      'To produce a record required by HMRC for self-assessment purposes',
      'To reflect on what worked, what did not, and to set refreshed goals for the year ahead',
    ],
    correctAnswer: 3,
    explanation:
      'An annual review is a structured reflection process that helps you recognise achievements, identify patterns in what worked and what did not, and set intentional goals for the coming year. Research by Harvard Business School professor Francesca Gino shows that structured reflection improves performance by approximately 23% compared to simply accumulating more experience.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Annual Review',
    category: 'Your Growth Action Plan',
  },
  {
    id: 176,
    question:
      'Which of the following best describes a &ldquo;mastermind group&rdquo; for tradespeople?',
    options: [
      'A small peer group that meets regularly to share challenges, ideas, and hold each other accountable',
      'A formal qualification that certifies an electrician as a business expert',
      'A one-to-one relationship in which a senior expert directs a junior&rsquo;s career',
      'A software tool that automatically tracks your business performance metrics',
    ],
    correctAnswer: 0,
    explanation:
      'The mastermind concept, popularised by Napoleon Hill in Think and Grow Rich, involves a small group of peers who meet regularly to support each other&rsquo;s growth. For tradespeople, mastermind groups provide a confidential space to discuss pricing, business challenges, technical problems, and career strategy with others who understand the trade.',
    section: 'Your Growth Action Plan',
    difficulty: 'basic' as const,
    topic: 'Mastermind Groups',
    category: 'Your Growth Action Plan',
  },

  // --- INTERMEDIATE (16 questions: 177-192) ---
  {
    id: 177,
    question: 'In the 4DX framework, what role does a &ldquo;compelling scoreboard&rdquo; play?',
    options: [
      'It records detailed financial accounts for the business at the end of each year',
      'It creates engagement by making progress visible so the team knows whether they are winning or losing',
      'It lists every possible goal so the team never loses sight of any of them',
      'It provides a private log that only the manager is allowed to see',
    ],
    correctAnswer: 1,
    explanation:
      'McChesney&rsquo;s third discipline states that people play differently when they are keeping score. A compelling scoreboard must be simple, visible, and show both lead and lag measures at a glance. The scoreboard drives engagement because humans are naturally motivated when they can see whether their efforts are making a difference.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 178,
    question:
      'Scott Belsky describes the &ldquo;messy middle&rdquo; of any project. What characterises this phase?',
    options: [
      'A short burst of intense progress made immediately after the project begins',
      'The smooth, predictable plateau that follows once the hardest work is done',
      'Volatile swings between moments of optimism and moments of doubt, far from the excitement of starting or finishing',
      'A final sprint of energy and clarity experienced just before a project is completed',
    ],
    correctAnswer: 2,
    explanation:
      'In The Messy Middle, Scott Belsky explains that the middle phase of any project or goal is characterised by uncertainty, self-doubt, and the temptation to quit. Unlike the energising start or the rewarding finish, the middle demands resilience. Belsky argues that enduring and optimising the messy middle is what separates those who finish from those who abandon their goals.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'The Messy Middle',
    category: 'Your Growth Action Plan',
  },
  {
    id: 179,
    question: 'How does the 4DX &ldquo;cadence of accountability&rdquo; work in practice?',
    options: [
      'A single annual meeting where the whole year&rsquo;s progress is reviewed at once',
      'An open-ended discussion with no fixed format, length, or schedule',
      'A one-way briefing where the manager sets the goals and the team listens',
      'Brief, regular meetings where each person reports on commitments made the previous week and makes new ones',
    ],
    correctAnswer: 3,
    explanation:
      'The fourth discipline of execution requires a regular rhythm &mdash; typically weekly &mdash; of brief accountability sessions. McChesney emphasises that each session should last no more than 20 minutes and follow a simple format: report on last week&rsquo;s commitments, review the scoreboard, and make specific commitments for the coming week. This cadence creates a consistent drumbeat of execution.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 180,
    question:
      'According to Daniel Pink, why can large financial bonuses sometimes reduce performance on complex tasks?',
    options: [
      'They create anxiety and narrow focus, which impairs the creative thinking needed for complex work',
      'They make the task feel so easy that workers stop paying attention to it',
      'They remove the deadline pressure that complex tasks usually depend on',
      'They cause workers to share the reward, reducing each person&rsquo;s effort',
    ],
    correctAnswer: 0,
    explanation:
      'Pink cites research by Dan Ariely and others showing that high-stakes external rewards can impair performance on tasks requiring cognitive skill. The pressure of a large reward narrows attention and triggers anxiety, which is counterproductive for tasks demanding creativity and problem-solving. This is why intrinsic motivation &mdash; autonomy, mastery, purpose &mdash; produces better outcomes for complex work.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Intrinsic Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 181,
    question:
      'In the persist, pivot, or stop framework, which question best helps you decide whether to stop pursuing a goal?',
    options: [
      'How much time, money and effort have I already put into this goal?',
      'If I were not already invested in this, would I start it today knowing what I now know?',
      'What will other people think of me if I give up on this goal now?',
      'How close am I to the original deadline I set for this goal?',
    ],
    correctAnswer: 1,
    explanation:
      'This question, rooted in the work of behavioural economists Kahneman and Tversky, forces you to evaluate the goal on its future merits rather than past investment. By mentally &ldquo;resetting&rdquo; your position to zero, you bypass the sunk cost fallacy and make a decision based on expected value going forward rather than emotional attachment to what has already been spent.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Persist, Pivot, or Stop',
    category: 'Your Growth Action Plan',
  },
  {
    id: 182,
    question:
      'What does James Clear mean by &ldquo;every action is a vote for the type of person you wish to become&rdquo;?',
    options: [
      'Important life decisions should be put to a vote among your peers',
      'Only your biggest, most visible achievements shape who you become',
      'Each small behaviour casts a vote that builds your desired identity',
      'Habits only matter when they produce a measurable external result',
    ],
    correctAnswer: 2,
    explanation:
      'Clear&rsquo;s identity-based model in Atomic Habits argues that habits are not just about what you achieve but about who you become. Each time you study for 30 minutes, you cast a vote for being &ldquo;someone who learns continuously.&rdquo; Over time, these votes accumulate into a strong identity that makes the behaviour feel natural rather than forced.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Identity-Based Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 183,
    question:
      'Angela Duckworth&rsquo;s research found that grit predicts success better than which commonly assumed factor?',
    options: [
      'University degree classification',
      'Financial background',
      'Physical fitness',
      'IQ and natural talent',
    ],
    correctAnswer: 3,
    explanation:
      'Duckworth&rsquo;s studies at West Point, the National Spelling Bee, and in various professional settings consistently showed that grit &mdash; the combination of sustained passion and perseverance &mdash; predicted success more reliably than IQ, talent, or socioeconomic background. This has profound implications for tradespeople: consistent effort over years matters more than initial aptitude.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Grit',
    category: 'Your Growth Action Plan',
  },
  {
    id: 184,
    question:
      'According to the ASTD research, what happens to goal completion rates when you schedule a regular accountability appointment with a partner?',
    options: [
      'The success rate rises to approximately 95%',
      'The success rate stays at 65%',
      'The success rate drops because of added pressure',
      'There is no additional benefit beyond having a partner',
    ],
    correctAnswer: 0,
    explanation:
      'The ASTD study showed a progression: having a goal gives you a 10% chance of completion, a plan raises it to 50%, committing to someone else reaches 65%, and having a specific scheduled accountability appointment pushes it to approximately 95%. The scheduled meeting creates a social contract that is psychologically difficult to break.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Accountability Partners',
    category: 'Your Growth Action Plan',
  },
  {
    id: 185,
    question:
      'Which of the following is a key date in a UK electrician&rsquo;s career progression calendar?',
    options: [
      'Annual MOT test for work vehicles in March',
      'ECS card renewal every 5 years',
      'Monthly HMRC corporation tax payments',
      'Weekly submission of CIS returns',
    ],
    correctAnswer: 1,
    explanation:
      'ECS (Electrotechnical Certification Scheme) cards must be renewed every 5 years, and renewal requires evidence of continuing professional development. Other key calendar dates include BS 7671 amendment cycles (typically every 3&ndash;5 years), the 31 January self-assessment deadline, and annual public liability insurance renewal. Tracking these dates prevents lapses that can stop you from working on site.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Career Progression Calendar',
    category: 'Your Growth Action Plan',
  },
  {
    id: 186,
    question:
      'What concept from energy management suggests you should schedule your most demanding tasks during your peak energy periods?',
    options: [
      'Decision-fatigue batching &mdash; grouping every task of the day into one long unbroken session',
      'Parkinson&rsquo;s law &mdash; allocating the maximum available time to every task so nothing feels rushed',
      'Chronotype-aligned work scheduling &mdash; matching task difficulty to your natural energy cycles',
      'Flat-load scheduling &mdash; spreading effort evenly so every hour of the day carries identical demand',
    ],
    correctAnswer: 2,
    explanation:
      'Daniel Pink&rsquo;s research in When: The Scientific Secrets of Perfect Timing shows that most people have a peak period (typically morning), a trough (early afternoon), and a recovery period (late afternoon). Scheduling analytical tasks during your peak and routine administrative tasks during your trough significantly improves both output quality and energy sustainability.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Energy Management',
    category: 'Your Growth Action Plan',
  },
  {
    id: 187,
    question:
      'What does Scott Belsky recommend for navigating the &ldquo;messy middle&rdquo; when motivation drops?',
    options: [
      'Abandon the project and start fresh whenever motivation drops',
      'Wait for inspiration to return before doing any further work',
      'Make one dramatic, sweeping change to reignite your enthusiasm',
      'Optimise what is working and cut what is not, in small steps',
    ],
    correctAnswer: 3,
    explanation:
      'Belsky&rsquo;s key insight is that the messy middle requires a dual approach: enduring the lows while optimising the process. Rather than waiting for inspiration or making drastic pivots, he advocates for small, deliberate refinements to your approach. This incremental optimisation keeps you moving forward even when the emotional fuel of a new start has faded.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'The Messy Middle',
    category: 'Your Growth Action Plan',
  },
  {
    id: 188,
    question:
      'Why is it important to distinguish between &ldquo;lag measures&rdquo; and &ldquo;lead measures&rdquo; in your growth plan?',
    options: [
      'Lag measures tell you if you have achieved the goal but only lead measures tell you what to do daily to get there',
      'Lag measures are always more accurate than lead measures, so only they should be tracked',
      'Lead measures describe the end result while lag measures describe the daily actions',
      'Lead and lag measures are interchangeable, so it does not matter which you track',
    ],
    correctAnswer: 0,
    explanation:
      'McChesney uses the analogy of weight loss: the number on the scale is the lag measure (result), while calories consumed and minutes exercised are lead measures (actions). For an electrician pursuing a new qualification, the exam pass is the lag measure, while study hours per week and practice questions completed are lead measures. Focusing on lead measures gives you daily control over your trajectory.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 189,
    question: 'How does the IET mentoring scheme typically match mentors and mentees?',
    options: [
      'By employer, pairing colleagues from the same company',
      'By career stage, professional interests and development goals',
      'By geographic location, so all meetings can be held in person',
      'By seniority alone, pairing the most senior with the newest',
    ],
    correctAnswer: 1,
    explanation:
      'The Institution of Engineering and Technology (IET) runs a structured mentoring programme that matches mentees with experienced professionals based on their career aspirations, technical interests, and development needs. The IET provides training for mentors and a framework for the relationship, including goal-setting templates and regular review points to ensure both parties benefit.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Mentoring in the Electrical Trade',
    category: 'Your Growth Action Plan',
  },
  {
    id: 190,
    question:
      'In the context of goal resetting, what does a &ldquo;post-mortem without blame&rdquo; involve?',
    options: [
      'Identifying which individual was responsible so they can be held accountable',
      'Avoiding any discussion of failure so that morale is not damaged',
      'Analysing why a goal was not achieved by examining systems and processes rather than attributing personal fault',
      'Postponing all analysis until enough time has passed to forget the details',
    ],
    correctAnswer: 2,
    explanation:
      'A blame-free post-mortem, a concept widely used in agile methodology and championed by researchers like Amy Edmondson at Harvard, examines what went wrong in terms of systems, processes, and circumstances rather than individual fault. This approach creates psychological safety, which encourages honest reflection and leads to genuinely useful insights for resetting goals effectively.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Annual Review',
    category: 'Your Growth Action Plan',
  },
  {
    id: 191,
    question:
      'Daniel Pink identifies &ldquo;autonomy&rdquo; as a key motivator. How might a self-employed electrician leverage this?',
    options: [
      'By taking on as many clients as possible to maximise income',
      'By following the same fixed daily routine without variation',
      'By delegating all decisions to a manager to cut their workload',
      'By choosing their specialisms, clients and working week',
    ],
    correctAnswer: 3,
    explanation:
      'Pink defines autonomy as having control over task (what you do), time (when you do it), technique (how you do it), and team (who you do it with). Self-employed electricians have a natural advantage here: they can choose to specialise in areas they find meaningful, set their own schedules, and select clients who align with their values &mdash; all of which boost intrinsic motivation.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Intrinsic Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 192,
    question:
      'What is one evidence-based strategy for preventing burnout while pursuing ambitious career goals?',
    options: [
      'Scheduling deliberate recovery periods and protecting non-work time as rigorously as work commitments',
      'Only resting once you notice the first clear physical signs of exhaustion',
      'Removing all rest from your week to maximise time spent on your goals',
      'Relying on a single long holiday each year to recover from the workload',
    ],
    correctAnswer: 0,
    explanation:
      'Christina Maslach&rsquo;s burnout research identifies six key risk factors, including unsustainable workload and insufficient reward. Proactive recovery &mdash; scheduling rest before you need it &mdash; is far more effective than reactive rest after breakdown. Alex Soojung-Kim Pang argues in Rest that deliberate downtime actually enhances creativity and productivity, making it a strategic advantage rather than a luxury.',
    section: 'Your Growth Action Plan',
    difficulty: 'intermediate' as const,
    topic: 'Burnout Prevention',
    category: 'Your Growth Action Plan',
  },

  // --- ADVANCED (8 questions: 193-200) ---
  {
    id: 193,
    question:
      'An electrician has spent 18 months studying for a specialism but market demand has shifted. Using the persist, pivot, or stop framework and accounting for sunk cost fallacy, what is the most rational approach?',
    options: [
      'Persist with the original specialism regardless of demand, because abandoning 18 months of study would waste the investment already made',
      'Evaluate whether the specialism still has future value regardless of time already invested, and pivot the knowledge to a related growing area if not',
      'Double down by investing even more time and money, on the basis that the breakthrough must be close after so much effort',
      'Stop immediately and discard everything learned, treating the entire 18 months as a complete and unrecoverable loss',
    ],
    correctAnswer: 1,
    explanation:
      'Kahneman and Tversky&rsquo;s work on loss aversion shows that the 18 months already invested are irrelevant to the forward-looking decision. The rational approach evaluates future expected value. Belsky&rsquo;s messy middle framework adds nuance: if the core knowledge transfers to a growing adjacent specialism (e.g., from solar PV to battery storage), a pivot preserves most of the investment while redirecting toward opportunity.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Sunk Cost Fallacy',
    category: 'Your Growth Action Plan',
  },
  {
    id: 194,
    question:
      'How would you design a 90-day growth plan using all four of McChesney&rsquo;s 4DX disciplines for achieving an electrical specialism qualification?',
    options: [
      'Set a dozen equally important goals at once, track only the final exam result, and review progress just once at the very end of the 90 days',
      'Focus solely on lag measures such as the exam pass, since the outcome is what ultimately matters and daily actions cannot be controlled',
      'Set one WIG (pass the exam), identify 2&ndash;3 lead measures (study hours, practice tests), create a visible scoreboard, and hold weekly accountability check-ins',
      'Keep the scoreboard private to yourself and avoid any accountability meetings, so that the pressure of being watched does not cause anxiety',
    ],
    correctAnswer: 2,
    explanation:
      'A fully integrated 4DX plan starts with a single WIG (the exam pass), then identifies lead measures you can control daily (e.g., 5 hours of study per week, 2 practice papers per fortnight). The scoreboard &mdash; a simple chart on your wall or phone &mdash; tracks these weekly. Finally, a weekly 15-minute accountability session with a study partner creates the cadence that sustains execution across all 90 days.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: '4 Disciplines of Execution',
    category: 'Your Growth Action Plan',
  },
  {
    id: 195,
    question:
      'An electrician is experiencing the &ldquo;messy middle&rdquo; of building their own business &mdash; 18 months in, initial excitement gone, profitability still inconsistent. Applying Belsky&rsquo;s framework and Duckworth&rsquo;s grit research, what combination of strategies is most likely to sustain them?',
    options: [
      'Wait passively for the early excitement and motivation to return before taking any further action on the business',
      'Make one dramatic, sweeping change to the entire business model in the hope of reigniting enthusiasm overnight',
      'Abandon the business altogether, since inconsistent profitability after 18 months proves the venture was never viable',
      'Optimise current processes (Belsky), reconnect with their long-term purpose (Duckworth), and use a mastermind group for accountability and perspective',
    ],
    correctAnswer: 3,
    explanation:
      'Belsky&rsquo;s framework recommends optimising what is working and cutting what is not, rather than making dramatic changes. Duckworth&rsquo;s research shows that passion (the &ldquo;why&rdquo;) sustains effort when the going gets tough. Combining these with a mastermind group (Napoleon Hill) creates a support system that provides tactical advice, emotional support, and accountability &mdash; the three elements most needed during the messy middle.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'The Messy Middle',
    category: 'Your Growth Action Plan',
  },
  {
    id: 196,
    question:
      'How would you construct a comprehensive career progression calendar for an electrician transitioning from employed to self-employed over a 10-year period?',
    options: [
      'Map ECS renewal dates, BS 7671 amendment cycles, tax registration milestones, insurance renewals, and qualification targets onto a single timeline with 90-day execution sprints',
      'List only the single end goal of being self-employed in 10 years, with no intermediate dates or milestones to track along the way',
      'Plan only the first year in detail and leave the remaining nine years entirely open, reacting to regulatory deadlines as they arise',
      'Focus the calendar exclusively on income targets for each year, since financial growth is the only milestone worth scheduling',
    ],
    correctAnswer: 0,
    explanation:
      'A 10-year career calendar integrates regulatory requirements (ECS renewal every 5 years, BS 7671 amendments approximately every 3&ndash;5 years), financial milestones (CIS registration, VAT threshold monitoring, pension setup), and professional development targets. Breaking this into 90-day sprints (Brian Moran) makes the long-term vision actionable, while the overarching timeline prevents you from underestimating what 10 years of compound growth can achieve.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Career Progression Calendar',
    category: 'Your Growth Action Plan',
  },
  {
    id: 197,
    question:
      'A qualified electrician wants to transition from extrinsic motivation (money, status) to intrinsic motivation (autonomy, mastery, purpose) as described by Daniel Pink. Which sequence of changes is most likely to succeed?',
    options: [
      'Immediately abandon all paid work and chase purpose first, trusting that money and security will follow once the work feels meaningful',
      'First secure a financial baseline that removes money anxiety, then progressively choose work that offers more autonomy, pursue mastery in a chosen specialism, and align work with personal purpose',
      'Increase the external rewards &mdash; higher rates and more status symbols &mdash; until they eventually transform into genuine intrinsic motivation',
      'Pursue autonomy, mastery and purpose all at once on day one, ignoring financial stability as an irrelevant distraction from the transition',
    ],
    correctAnswer: 1,
    explanation:
      'Pink acknowledges that baseline financial security must be met before intrinsic motivators become dominant &mdash; this aligns with Maslow&rsquo;s hierarchy. The transition is sequential: first remove financial anxiety (adequate savings, steady income), then use that stability to make increasingly autonomous choices about specialisms, clients, and working patterns. Purpose often emerges naturally once autonomy and mastery are established.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Intrinsic Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 198,
    question:
      'Using James Clear&rsquo;s identity-based approach and Angela Duckworth&rsquo;s grit framework, how would you help an apprentice who repeatedly fails their AM2 assessment rebuild their motivation?',
    options: [
      'Tell the apprentice that repeated failure proves a lack of natural talent and advise them to consider a different career entirely',
      'Have them re-sit the whole assessment repeatedly without changing anything, trusting that persistence alone will eventually produce a pass',
      'Shift focus from the outcome (&ldquo;I failed&rdquo;) to identity (&ldquo;I am someone who persists&rdquo;), analyse specific skill gaps with lead measures, and use deliberate practice on weak areas',
      'Reduce the difficulty of their practice so they always succeed, protecting their confidence by avoiding the areas they find hardest',
    ],
    correctAnswer: 2,
    explanation:
      'Clear&rsquo;s identity model reframes failure from a verdict on ability to a data point in an ongoing process. Combined with Ericsson&rsquo;s deliberate practice (targeted effort on specific weaknesses rather than general repetition) and Duckworth&rsquo;s grit (sustained passion and perseverance through setbacks), this approach turns repeated failure into a structured improvement plan. The identity shift from &ldquo;I am a failure&rdquo; to &ldquo;I am someone who keeps learning&rdquo; is psychologically transformative.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Identity-Based Motivation',
    category: 'Your Growth Action Plan',
  },
  {
    id: 199,
    question:
      'An electrician running their own business is showing early signs of burnout: irritability, reduced quality of work, and dreading Monday mornings. Using Maslach&rsquo;s burnout research and energy management principles, what is the optimal intervention strategy?',
    options: [
      'Push through the symptoms by working longer hours, on the basis that the dip in mood and quality is temporary and will pass on its own',
      'Take a single two-week holiday and then return to exactly the same workload and schedule that caused the symptoms in the first place',
      'Address only the financial side by raising rates, assuming that more income will automatically resolve the irritability and dread',
      'Address all six Maslach burnout dimensions: reduce workload, increase control, ensure fair reward, strengthen community, restore fairness, and reconnect with values',
    ],
    correctAnswer: 3,
    explanation:
      'Maslach identifies six workplace factors that contribute to burnout: workload, control, reward, community, fairness, and values. Effective intervention requires assessing which dimensions are most impaired and addressing them systematically. Daniel Pink&rsquo;s energy management research adds that restructuring the working day to align demanding tasks with peak energy periods can dramatically reduce the subjective experience of overload without reducing actual output.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Burnout Prevention',
    category: 'Your Growth Action Plan',
  },
  {
    id: 200,
    question:
      'How would you integrate the ASTD accountability research with McChesney&rsquo;s 4DX cadence of accountability and the IET mentoring scheme to create a maximally effective growth support system for an electrician pursuing Chartered Engineer status?',
    options: [
      'Combine an IET mentor (expert guidance), a 4DX accountability partner (weekly commitments and scoreboard reviews), and a mastermind group (peer support) into a layered support structure with different review cadences',
      'Rely on a single annual review with one IET mentor and avoid any weekly or peer accountability, to keep the support system simple and low-pressure',
      'Work entirely alone without any mentor, partner or group, on the basis that Chartered status must be earned through purely independent effort',
      'Use the same person to act as mentor, weekly accountability partner and peer group all at once, so every type of support comes from one relationship',
    ],
    correctAnswer: 0,
    explanation:
      'The ASTD research shows that structured accountability dramatically increases success rates. Layering different types of support creates resilience: an IET mentor provides expert technical and career guidance (monthly meetings), a 4DX accountability partner ensures weekly execution against lead measures, and a mastermind group of peers provides emotional support and diverse perspectives (fortnightly or monthly). Each layer serves a different function, and the combination is more robust than any single relationship.',
    section: 'Your Growth Action Plan',
    difficulty: 'advanced' as const,
    topic: 'Accountability Partners',
    category: 'Your Growth Action Plan',
  },
];
