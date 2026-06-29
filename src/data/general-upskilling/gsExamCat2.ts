import { StandardMockQuestion } from '@/types/standardMockExam';

export const gsCat2Questions: StandardMockQuestion[] = [
  // =====================================================
  // Category 2: Setting Effective Goals (id 41-80)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================

  // --- BASIC (16 questions: id 41-56) ---
  {
    id: 41,
    question: 'What does the "S" stand for in the SMART goals framework?',
    options: [
      'Strategic',
      'Specific',
      'Simple',
      'Structured',
    ],
    correctAnswer: 1,
    explanation:
      'In George T. Doran&rsquo;s SMART framework, first published in the November 1981 issue of Management Review, the "S" stands for Specific. Doran emphasised that goals must clearly define what is to be accomplished, avoiding vague or generalised statements. A specific goal answers the questions of who, what, where, when, and why.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 42,
    question: 'Which researcher is credited with creating the SMART goals acronym in 1981?',
    options: [
      'Edwin Locke',
      'Peter Drucker',
      'George T. Doran',
      'Stephen Covey',
    ],
    correctAnswer: 2,
    explanation:
      'George T. Doran introduced the SMART acronym in his 1981 article "There&rsquo;s a S.M.A.R.T. Way to Write Management Goals and Objectives" published in Management Review. Although Peter Drucker popularised management by objectives earlier, Doran was the first to codify the specific SMART criteria.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 43,
    question:
      'Which of the following is an example of a short-term goal for an electrical apprentice?',
    options: [
      'Retire at age 55 with a full pension',
      'Become a Senior Technician within ten years',
      'Achieve Chartered Engineer status by 2035',
      'Pass next month&rsquo;s City &amp; Guilds 2365 unit assessment',
    ],
    correctAnswer: 3,
    explanation:
      'A short-term goal typically covers 0&ndash;3 months. Passing a specific unit assessment within a month is a clear, immediate objective. The other options represent medium-term or long-term aspirations that span years or decades.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Timeframes',
    category: 'Setting Effective Goals',
  },
  {
    id: 44,
    question: 'In the JIB career pathway, what grade comes immediately after Electrical Labourer?',
    options: [
      'Trainee Electrician',
      'Approved Electrician',
      'Graded Electrician',
      'Technician',
    ],
    correctAnswer: 0,
    explanation:
      'The JIB career pathway progresses from Electrical Labourer to Trainee Electrician, then to Graded Electrician, Approved Electrician, Technician, and finally Senior Technician. Understanding this progression helps electricians set appropriate career goals at each stage.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'JIB Career Pathway',
    category: 'Setting Effective Goals',
  },
  {
    id: 45,
    question: 'What does the "M" in SMART goals stand for?',
    options: [
      'Motivating',
      'Measurable',
      'Meaningful',
      'Manageable',
    ],
    correctAnswer: 1,
    explanation:
      'In Doran&rsquo;s SMART framework, "M" stands for Measurable. A measurable goal includes criteria that allow you to track progress and know when the goal has been achieved. For example, "complete 5 site inspections this month" is measurable, whereas "do more inspections" is not.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 46,
    question: 'Which time period best describes a medium-term goal?',
    options: [
      '0&ndash;3 months',
      '5&ndash;10 years',
      '3&ndash;12 months',
      '1&ndash;5 years',
    ],
    correctAnswer: 2,
    explanation:
      'Medium-term goals typically span 3&ndash;12 months. They bridge the gap between short-term actions (0&ndash;3 months) and long-term aspirations (1&ndash;5+ years). An example for an electrician might be completing an entire City &amp; Guilds 2391 qualification within one year.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Timeframes',
    category: 'Setting Effective Goals',
  },
  {
    id: 47,
    question: 'What is the primary purpose of writing goals down, according to Dr Gail Matthews?',
    options: [
      'It eliminates the need for deadlines',
      'It satisfies employer requirements',
      'It reduces the need for planning',
      'You are significantly more likely to achieve them',
    ],
    correctAnswer: 3,
    explanation:
      'Dr Gail Matthews of Dominican University conducted research in 2015 demonstrating that people who wrote down their goals were 42% more likely to achieve them compared to those who merely thought about them. The physical act of writing engages different cognitive processes that strengthen commitment and clarity.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Writing',
    category: 'Setting Effective Goals',
  },
  {
    id: 48,
    question:
      'Which City &amp; Guilds qualification is specifically for inspection and testing of electrical installations?',
    options: [
      '2391',
      '2396',
      '2365',
      '5357',
    ],
    correctAnswer: 0,
    explanation:
      'City &amp; Guilds 2391 (Inspection and Testing of Electrical Installations) is the industry-standard qualification for those wishing to carry out inspection and testing. The 2365 covers electrical installation, 2396 covers design and verification, and 5357 covers initial verification.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Electrical Qualifications',
    category: 'Setting Effective Goals',
  },
  {
    id: 49,
    question: 'What is an "outcome goal"?',
    options: [
      'A goal that defines who you want to become',
      'A goal focused on the end result you want to achieve',
      'A goal set by your employer on your behalf',
      'A goal about the daily habits you will follow',
    ],
    correctAnswer: 1,
    explanation:
      'An outcome goal focuses on the desired end result, such as "pass the AM2 practical assessment." It differs from a process goal (focused on specific actions or behaviours) and an identity goal (focused on the type of person you want to become). Locke &amp; Latham&rsquo;s research shows outcome goals are most motivating when combined with process goals.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Types',
    category: 'Setting Effective Goals',
  },
  {
    id: 50,
    question: 'Which Stephen Covey habit states you should "begin with the end in mind"?',
    options: [
      'Habit 3',
      'Habit 1',
      'Habit 2',
      'Habit 7',
    ],
    correctAnswer: 2,
    explanation:
      'Stephen Covey&rsquo;s second habit from The 7 Habits of Highly Effective People (1989) is "Begin with the end in mind." This means envisioning your desired outcome before starting any task or project, ensuring every action moves you towards your long-term vision rather than being reactive.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Covey Framework',
    category: 'Setting Effective Goals',
  },
  {
    id: 51,
    question: 'What does the "A" in SMART goals most commonly stand for?',
    options: [
      'Adaptive',
      'Aggressive',
      'Absolute',
      'Achievable',
    ],
    correctAnswer: 3,
    explanation:
      'In Doran&rsquo;s original 1981 SMART framework, "A" stands for Assignable, though it is now most commonly interpreted as Achievable or Attainable. The principle is that a goal should stretch your capabilities while remaining realistic given your current resources, skills, and timeframe.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 52,
    question:
      'What type of card does the Electrotechnical Certification Scheme (ECS) issue to qualified electricians?',
    options: [
      'A skills card confirming competence level',
      'A credit card for purchasing materials',
      'A National Insurance card',
      'A driving licence endorsement',
    ],
    correctAnswer: 0,
    explanation:
      'The ECS card scheme, managed by the JIB, issues skills cards that confirm an electrician&rsquo;s qualifications, competence level, and role. Card types include Apprentice (red), Installation Electrician (gold), and Technician (black). Cards typically require renewal every five years.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'ECS Cards',
    category: 'Setting Effective Goals',
  },
  {
    id: 53,
    question: 'What is a "process goal"?',
    options: [
      'A goal describing the final result you want',
      'A goal focused on the specific actions or behaviours you will carry out',
      'A goal about changing your core identity',
      'A goal that only applies to manufacturing processes',
    ],
    correctAnswer: 1,
    explanation:
      'A process goal focuses on the specific behaviours and actions you control, such as "study BS 7671 regulations for 30 minutes every evening." Research by Locke &amp; Latham shows that process goals increase self-efficacy because they are entirely within your control, unlike outcome goals which may depend on external factors.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Types',
    category: 'Setting Effective Goals',
  },
  {
    id: 54,
    question: 'Which of the following best describes the Eisenhower Matrix?',
    options: [
      'A technique for wiring three-phase systems',
      'A method for calculating electrical load',
      'A tool for prioritising tasks by urgency and importance',
      'A formula for cable voltage drop',
    ],
    correctAnswer: 2,
    explanation:
      'The Eisenhower Matrix, also popularised by Stephen Covey in The 7 Habits of Highly Effective People, divides tasks into four quadrants based on urgency and importance. It helps electricians and professionals prioritise their workload so that important-but-not-urgent goals (like studying for qualifications) do not get neglected.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Eisenhower Matrix',
    category: 'Setting Effective Goals',
  },
  {
    id: 55,
    question: 'What does the "T" in SMART goals stand for?',
    options: [
      'Trackable',
      'Targeted',
      'Transparent',
      'Time-bound',
    ],
    correctAnswer: 3,
    explanation:
      'In Doran&rsquo;s SMART framework, "T" stands for Time-bound (originally "Time-related"). Every goal should have a clear deadline or timeframe. Locke &amp; Latham&rsquo;s Goal Setting Theory confirms that time-bound goals create a sense of urgency that drives focused effort.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 56,
    question: 'Which of the following is a long-term career goal for an electrician?',
    options: [
      'Achieve Chartered Engineer (CEng) status within five years',
      'Complete next week&rsquo;s timesheet before Friday',
      'Pass tomorrow&rsquo;s mock exam on inspection and testing',
      'Read one chapter of BS 7671 this evening',
    ],
    correctAnswer: 0,
    explanation:
      'Long-term goals span 1&ndash;5+ years and represent significant career milestones. Achieving CEng status through the IET is a substantial professional goal requiring years of experience and development. The other options are short-term tasks completed within days.',
    section: 'Setting Effective Goals',
    difficulty: 'basic' as const,
    topic: 'Goal Timeframes',
    category: 'Setting Effective Goals',
  },

  // --- INTERMEDIATE (16 questions: id 57-72) ---
  {
    id: 57,
    question:
      'According to Locke &amp; Latham&rsquo;s Goal Setting Theory, which type of goal leads to the highest performance?',
    options: [
      'Easy and vague goals',
      'Specific and challenging goals',
      'Goals set by someone else without explanation',
      'Goals with no deadline',
    ],
    correctAnswer: 1,
    explanation:
      'Edwin Locke &amp; Gary Latham&rsquo;s Goal Setting Theory, developed from the 1960s onwards and consolidated in their 1990 book A Theory of Goal Setting &amp; Task Performance, found that specific, challenging goals lead to higher performance than easy or vague goals. Their research showed a direct linear relationship between goal difficulty and performance, provided the individual has sufficient ability and commitment.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 58,
    question: 'What is "goal cascading"?',
    options: [
      'Increasing goal difficulty every week automatically',
      'Abandoning goals when they become difficult',
      'Breaking long-term goals into progressively shorter-term actions',
      'Setting the same goal for every team member',
    ],
    correctAnswer: 2,
    explanation:
      'Goal cascading is the process of breaking a long-term goal into medium-term milestones and then into short-term actions. For example, a five-year goal of becoming a Senior Technician cascades into yearly qualification targets, monthly study plans, and weekly revision sessions. This approach aligns with both Covey&rsquo;s "begin with the end in mind" and Locke &amp; Latham&rsquo;s emphasis on proximal sub-goals.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Cascading',
    category: 'Setting Effective Goals',
  },
  {
    id: 59,
    question: 'What is an "implementation intention" as described by Peter Gollwitzer?',
    options: [
      'A financial budget for training courses',
      'A general desire to improve your career',
      'A written contract signed by your employer',
      'An "if-then" plan linking a situation to a specific action',
    ],
    correctAnswer: 3,
    explanation:
      'Peter Gollwitzer&rsquo;s research on implementation intentions, published from 1993 onwards, shows that creating specific "if-then" plans dramatically increases follow-through. For example, "If it is 7pm on a weekday, then I will study BS 7671 for 30 minutes." Gollwitzer&rsquo;s meta-analysis found this technique has a medium-to-large effect size on goal achievement.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Implementation Intentions',
    category: 'Setting Effective Goals',
  },
  {
    id: 60,
    question:
      'Which IET professional registration level requires a BEng or equivalent and is suitable for experienced electrical engineers?',
    options: [
      'Incorporated Engineer (IEng)',
      'Engineering Technician (EngTech)',
      'Chartered Engineer (CEng)',
      'ICT Technician (ICTTech)',
    ],
    correctAnswer: 0,
    explanation:
      'Incorporated Engineer (IEng) registration through the IET typically requires a BEng (Hons) degree or equivalent, plus evidence of professional competence. EngTech requires technician-level qualifications, while CEng requires a Master&rsquo;s-level qualification or equivalent. Understanding these levels helps electricians set appropriate long-term professional development goals.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'IET Professional Registration',
    category: 'Setting Effective Goals',
  },
  {
    id: 61,
    question:
      'In the Eisenhower Matrix, which quadrant contains tasks that are important but not urgent?',
    options: [
      'Quadrant 1',
      'Quadrant 2',
      'Quadrant 3',
      'Quadrant 4',
    ],
    correctAnswer: 1,
    explanation:
      'Quadrant 2 of the Eisenhower Matrix contains tasks that are important but not urgent, such as studying for qualifications, building professional networks, and long-term career planning. Covey argues that spending more time in Quadrant 2 is the key to personal effectiveness, as it prevents crises (Quadrant 1) from dominating your life.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Eisenhower Matrix',
    category: 'Setting Effective Goals',
  },
  {
    id: 62,
    question: 'What is the "planning fallacy" identified by Daniel Kahneman?',
    options: [
      'The habit of over-planning and never starting',
      'The belief that planning is unnecessary for simple tasks',
      'The tendency to underestimate the time needed to complete tasks',
      'The tendency to set too many goals simultaneously',
    ],
    correctAnswer: 2,
    explanation:
      'Daniel Kahneman and Amos Tversky identified the planning fallacy in 1979, describing our systematic tendency to underestimate the time, costs, and risks of future actions while overestimating their benefits. When setting goals with deadlines, electricians should build in buffer time and use reference class forecasting &mdash; looking at how long similar tasks have taken in the past.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Planning Fallacy',
    category: 'Setting Effective Goals',
  },
  {
    id: 63,
    question:
      'Which City &amp; Guilds qualification covers the design, erection, and verification of electrical installations?',
    options: [
      '2919',
      '2391',
      '2365',
      '2396',
    ],
    correctAnswer: 3,
    explanation:
      'City &amp; Guilds 2396 covers Design and Verification of Electrical Installations. It is aimed at those who need to design electrical systems and verify that installations meet BS 7671 requirements. This is distinct from 2391 (Inspection and Testing) and 2365 (Installation). Setting a goal to achieve 2396 is a strong medium-term career objective for electricians wanting to move into design work.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Electrical Qualifications',
    category: 'Setting Effective Goals',
  },
  {
    id: 64,
    question:
      'According to Locke &amp; Latham, which of the following is NOT one of the five key principles of effective goal setting?',
    options: [
      'Simplicity',
      'Clarity',
      'Challenge',
      'Commitment',
    ],
    correctAnswer: 0,
    explanation:
      'Locke &amp; Latham identified five key principles of effective goal setting: Clarity, Challenge, Commitment, Feedback, and Task Complexity. "Simplicity" is not among them. While goals should be clear, they should also be sufficiently challenging &mdash; their research consistently demonstrated that difficult goals produce higher performance than easy ones.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 65,
    question: 'What is a "personal mission statement" as described by Stephen Covey?',
    options: [
      'A formal business plan submitted to your employer each year',
      'A written declaration of your core values, purpose, and long-term vision',
      'A list of measurable targets with deadlines for the next quarter',
      'A signed contract committing you to a specific qualification',
    ],
    correctAnswer: 1,
    explanation:
      'Stephen Covey described a personal mission statement in The 7 Habits of Highly Effective People as a written declaration of your core values, guiding principles, and long-term life purpose. It acts as a personal constitution against which all goals and decisions can be measured. Covey recommended reviewing and updating it regularly as your understanding of your purpose evolves.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Personal Mission Statement',
    category: 'Setting Effective Goals',
  },
  {
    id: 66,
    question: 'What is an "identity goal"?',
    options: [
      'A goal set by your line manager during appraisal',
      'A goal about proving your identity with official documents',
      'A goal focused on the type of person you want to become',
      'A goal about changing your legal name',
    ],
    correctAnswer: 2,
    explanation:
      'An identity goal focuses on who you want to become rather than what you want to achieve or do. For example, "I want to become the kind of electrician who is recognised as an expert in renewable energy" is an identity goal. James Clear, building on Locke &amp; Latham&rsquo;s work, argues that identity-based goals create lasting behaviour change because they address motivation at its deepest level.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Types',
    category: 'Setting Effective Goals',
  },
  {
    id: 67,
    question:
      'Which competent person scheme allows electricians to self-certify notifiable electrical work under Part P of the Building Regulations?',
    options: [
      'IET Wiring Matters',
      'ECS card scheme',
      'City &amp; Guilds',
      'NICEIC or NAPIT',
    ],
    correctAnswer: 3,
    explanation:
      'NICEIC (National Inspection Council for Electrical Installation Contracting) and NAPIT (National Association of Professional Inspectors and Testers) are both government-approved competent person schemes. Registration with either allows electricians to self-certify notifiable electrical work under Part P of the Building Regulations in England and Wales, without needing to involve Building Control.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Competent Person Schemes',
    category: 'Setting Effective Goals',
  },
  {
    id: 68,
    question:
      'An electrician sets the goal: "I want to earn more money." Why does this fail the SMART criteria?',
    options: [
      'It is not specific, measurable, or time-bound',
      'It is too specific and leaves no room for flexibility',
      'It is challenging but not relevant to an electrician',
      'It has a deadline but no clear method of measurement',
    ],
    correctAnswer: 0,
    explanation:
      'The goal "earn more money" fails Doran&rsquo;s SMART criteria because it lacks specificity (how much more?), measurability (what metric?), and a timeframe (by when?). A SMART version would be: "Increase my annual income by £5,000 within 12 months by completing City &amp; Guilds 2391 and taking on inspection work." This provides clear, trackable parameters.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'SMART Goals',
    category: 'Setting Effective Goals',
  },
  {
    id: 69,
    question:
      'Which City &amp; Guilds qualification is the practical assessment required to complete an electrical apprenticeship?',
    options: [
      '2365',
      'AM2',
      '2391',
      '2396',
    ],
    correctAnswer: 1,
    explanation:
      'The AM2 (Achievement Measurement 2) is a practical assessment that apprentice electricians must pass to demonstrate competence in real-world installation tasks. It is a mandatory requirement for obtaining the JIB Approved Electrician grade and the corresponding ECS gold card. Setting a specific date to sit the AM2 is a key medium-term goal for apprentices.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Electrical Qualifications',
    category: 'Setting Effective Goals',
  },
  {
    id: 70,
    question:
      'What does "feedback" mean in the context of Locke &amp; Latham&rsquo;s five goal-setting principles?',
    options: [
      'Receiving criticism from your employer about your work',
      'Completing an anonymous customer satisfaction survey',
      'Regularly reviewing progress towards your goal and adjusting your approach',
      'Writing online reviews for training providers',
    ],
    correctAnswer: 2,
    explanation:
      'In Locke &amp; Latham&rsquo;s Goal Setting Theory, feedback refers to the process of regularly reviewing your progress towards a goal so you can make adjustments. Without feedback, you cannot know whether your effort and strategies are working. This could involve weekly self-assessments, mock exam scores, or tracking completed study hours against your plan.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 71,
    question: 'How does an implementation intention differ from a standard goal?',
    options: [
      'It is always set by an employer rather than the individual',
      'It removes the need for any measurable outcome',
      'It applies only to long-term career goals, not daily tasks',
      'It specifies when, where, and how you will act, not just what you want to achieve',
    ],
    correctAnswer: 3,
    explanation:
      'Peter Gollwitzer&rsquo;s research distinguishes implementation intentions from goal intentions. A goal intention states what you want ("I intend to pass 2391"), while an implementation intention specifies the when, where, and how ("If it is Tuesday evening at 7pm, then I will complete one 2391 practice paper at my desk"). This specificity automates the initiation of goal-directed behaviour.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Implementation Intentions',
    category: 'Setting Effective Goals',
  },
  {
    id: 72,
    question:
      'What is the primary benefit of setting both outcome goals and process goals together?',
    options: [
      'Outcome goals provide direction while process goals provide daily actionable steps',
      'It guarantees the goal will be achieved regardless of effort',
      'It removes the need to set any deadline for the goal',
      'It means only one goal needs to be tracked at a time',
    ],
    correctAnswer: 0,
    explanation:
      'Research by Locke &amp; Latham and others shows that combining outcome goals (the desired result) with process goals (the daily actions) creates a powerful system. The outcome goal provides motivation and direction, while process goals break the journey into manageable, controllable actions. For an electrician, "pass AM2 by September" (outcome) paired with "practise wiring a consumer unit three times per week" (process) is highly effective.',
    section: 'Setting Effective Goals',
    difficulty: 'intermediate' as const,
    topic: 'Goal Types',
    category: 'Setting Effective Goals',
  },

  // --- ADVANCED (8 questions: id 73-80) ---
  {
    id: 73,
    question:
      'Locke &amp; Latham identified four mechanisms through which goals affect performance. Which of the following is NOT one of those mechanisms?',
    options: [
      'Direction of attention and effort',
      'Social conformity',
      'Persistence',
      'Discovery and use of task-relevant strategies',
    ],
    correctAnswer: 1,
    explanation:
      'Locke &amp; Latham identified four mechanisms by which goals improve performance: (1) directing attention and effort towards goal-relevant activities, (2) energising behaviour (higher goals lead to greater effort), (3) increasing persistence, and (4) prompting the discovery and use of task-relevant knowledge and strategies. Social conformity is not among these mechanisms &mdash; in fact, their theory emphasises individual commitment over group pressure.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 74,
    question:
      'An electrician wants to progress from Approved Electrician to Senior Technician within four years. Using goal cascading, which sequence best represents the correct breakdown?',
    options: [
      'Year 1: Study independently without sitting exams &rarr; Year 2: Continue studying &rarr; Year 3: Sit all exams at once &rarr; Year 4: Apply for grading',
      'Year 1: Apply for Senior Technician immediately &rarr; Year 2: Complete any required qualifications &rarr; Year 3: Wait for approval &rarr; Year 4: Receive card',
      'Year 1: Complete C&amp;G 2396 &amp; 2919 &rarr; Year 2: Gain design experience &amp; register with NICEIC &rarr; Year 3: Begin IET IEng application &rarr; Year 4: Achieve Technician then Senior Technician grade',
      'Year 1: Change employer &rarr; Year 2: Change employer again &rarr; Year 3: Request a promotion &rarr; Year 4: Demand Senior Technician status',
    ],
    correctAnswer: 2,
    explanation:
      'Effective goal cascading, as supported by both Covey&rsquo;s "begin with the end in mind" principle and Locke &amp; Latham&rsquo;s emphasis on proximal sub-goals, requires breaking a long-term objective into yearly, monthly, and weekly milestones. The correct answer shows a logical progression of qualifications (2396, 2919), practical experience, professional registration, and then JIB grading applications &mdash; each year building on the previous one.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Goal Cascading',
    category: 'Setting Effective Goals',
  },
  {
    id: 75,
    question:
      'According to Gollwitzer&rsquo;s research, why are implementation intentions particularly effective for overcoming habitual barriers to goal pursuit?',
    options: [
      'They reduce the importance of the goal so it feels less stressful',
      'They eliminate all obstacles from the environment',
      'They require a partner to hold you accountable at all times',
      'They create automatic cue-response links that bypass the need for conscious deliberation',
    ],
    correctAnswer: 3,
    explanation:
      'Gollwitzer&rsquo;s research demonstrates that implementation intentions work by creating strong mental associations between situational cues and planned responses. This "strategic automaticity" means that when the specified situation arises, the planned behaviour is triggered automatically, bypassing the effortful deliberation that often leads to procrastination. His 1999 meta-analysis in American Psychologist confirmed a medium-to-large effect size (d = 0.65) across multiple studies.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Implementation Intentions',
    category: 'Setting Effective Goals',
  },
  {
    id: 76,
    question:
      'A self-employed electrician consistently underestimates how long jobs take, leading to missed deadlines and financial losses. Which combination of strategies from goal-setting research would best address this?',
    options: [
      'Use reference class forecasting (Kahneman) to estimate durations, set specific time-bound goals (Locke &amp; Latham), and create implementation intentions (Gollwitzer) for schedule reviews',
      'Set vague &ldquo;do your best&rdquo; goals so there is no pressure to hit a deadline',
      'Quote more optimistic timescales to win work, then explain overruns afterwards',
      'Avoid setting deadlines altogether to remove the stress of missing them',
    ],
    correctAnswer: 0,
    explanation:
      'This scenario requires combining insights from multiple researchers. Kahneman&rsquo;s reference class forecasting addresses the planning fallacy by basing estimates on similar past jobs rather than optimistic prediction. Locke &amp; Latham&rsquo;s specific, time-bound goals ensure clear deadlines. Gollwitzer&rsquo;s implementation intentions ("If I finish the first fix by Wednesday, then I will review the remaining schedule") create automated review habits. This integrated approach is far more effective than any single technique.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Planning Fallacy',
    category: 'Setting Effective Goals',
  },
  {
    id: 77,
    question:
      'Which of the following best explains why Locke &amp; Latham found that goal commitment moderates the goal&ndash;performance relationship?',
    options: [
      'Commitment only matters for easy goals, not for challenging ones',
      'Without genuine commitment, even well-structured goals fail to direct behaviour because the individual does not invest sufficient effort or persistence',
      'Commitment automatically follows from setting a specific deadline',
      'Commitment is irrelevant once an implementation intention has been written',
    ],
    correctAnswer: 1,
    explanation:
      'Locke &amp; Latham&rsquo;s research identified commitment as a critical moderator of the goal&ndash;performance relationship. Their findings show that the positive effect of specific, challenging goals on performance is strongest when individuals are genuinely committed to the goal. Commitment is enhanced by two key factors: the belief that the goal is important (value) and the belief that it is attainable (self-efficacy). Without commitment, even perfectly structured SMART goals fail to motivate sustained effort.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 78,
    question:
      'An electrician is building a five-year career plan incorporating IET professional registration. Which pathway correctly sequences the EngTech, IEng, and CEng levels with their typical requirements?',
    options: [
      'IEng and CEng simultaneously (joint application) &rarr; EngTech (honorary title after 10 years)',
      'CEng first (no requirements) &rarr; IEng (after 2 years) &rarr; EngTech (final step)',
      'EngTech (Level 3 quals + competence) &rarr; IEng (BEng or equivalent + competence) &rarr; CEng (MEng or equivalent + leadership evidence)',
      'EngTech (requires PhD) &rarr; IEng (requires MBA) &rarr; CEng (requires medical degree)',
    ],
    correctAnswer: 2,
    explanation:
      'The IET professional registration pathway progresses through three levels: EngTech requires Level 3 qualifications (such as C&amp;G 2365/2357 or NVQ Level 3) plus demonstrated competence; IEng typically requires a BEng (Hons) or equivalent plus professional competence evidence; CEng requires a Master&rsquo;s-level qualification (MEng or BEng + further learning) plus evidence of technical leadership. Each level builds on the previous one, making this an excellent framework for long-term goal cascading.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'IET Professional Registration',
    category: 'Setting Effective Goals',
  },
  {
    id: 79,
    question:
      'How does the concept of "task complexity" function as a moderator in Locke &amp; Latham&rsquo;s Goal Setting Theory?',
    options: [
      'Task complexity has no measurable effect on the goal&ndash;performance link',
      'For complex tasks, specific difficult goals always outperform simpler ones',
      'Complex tasks require easy goals only, with no need for any strategy',
      'For complex tasks, the positive effect of difficult goals is weaker unless individuals are also given adequate strategies and time to learn',
    ],
    correctAnswer: 3,
    explanation:
      'Locke &amp; Latham found that task complexity moderates the goal&ndash;performance relationship. For simple, well-practised tasks, specific difficult goals strongly boost performance. However, for complex tasks requiring new strategies or skills (such as learning to design complex electrical installations), the effect is weaker unless individuals are also given time to develop appropriate strategies. This is why "do your best" goals can sometimes outperform specific goals on novel, complex tasks &mdash; they allow cognitive flexibility for strategy exploration.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Goal Setting Theory',
    category: 'Setting Effective Goals',
  },
  {
    id: 80,
    question:
      'An experienced electrician creates a personal mission statement, uses the Eisenhower Matrix daily, and sets implementation intentions for study sessions. Despite this, progress towards their City &amp; Guilds 2396 qualification stalls. Based on goal-setting research, what is the most likely root cause?',
    options: [
      'The goal lacks genuine commitment &mdash; the electrician may not truly value the 2396 or believe they can achieve it, undermining persistence as described by Locke &amp; Latham',
      'The planning tools are mutually incompatible and cancel each other out',
      'The Eisenhower Matrix should never be combined with implementation intentions',
      'A personal mission statement guarantees success on its own, so the others are redundant',
    ],
    correctAnswer: 0,
    explanation:
      'Locke &amp; Latham consistently emphasise that commitment is the critical moderator between goal setting and performance. Having sophisticated planning tools (mission statements, Eisenhower Matrix, implementation intentions) is necessary but not sufficient. If the individual lacks genuine value-commitment (they do not truly want the 2396) or self-efficacy (they do not believe they can pass it), performance will stall regardless of planning quality. The solution is to address the underlying motivation before refining the planning system.',
    section: 'Setting Effective Goals',
    difficulty: 'advanced' as const,
    topic: 'Goal Commitment',
    category: 'Setting Effective Goals',
  },
];
