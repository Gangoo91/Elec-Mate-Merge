/**
 * General Upskilling &mdash; Category 4: Tracking Progress &amp; Continuous Improvement
 *
 * 40 questions (IDs 121&ndash;160)
 * Difficulty split: 16 basic, 16 intermediate, 8 advanced
 */

import { StandardMockQuestion } from '@/types/standardMockExam';

export const gsCat4Questions: StandardMockQuestion[] = [
  // =====================================================
  // BASIC (16 questions) &mdash; IDs 121&ndash;136
  // =====================================================
  {
    id: 121,
    question:
      'Peter Drucker is widely credited with the principle &ldquo;What gets measured gets managed.&rdquo; What does this mean for an electrician tracking their career development?',
    options: [
      'Recording your progress makes you more likely to improve',
      'You should only focus on tasks that can be measured numerically',
      'Measurement is only useful for managers, not tradespeople',
      'Tracking progress is a waste of time on site',
    ],
    correctAnswer: 0,
    explanation:
      'Drucker&rsquo;s principle highlights that the act of measuring something focuses attention on it, making improvement more likely. For electricians, this could mean logging completed installations, test results, or CPD hours. When you track a metric, you naturally start working to improve it.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Measurement Principles',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 122,
    question:
      'What is the difference between a &ldquo;lead measure&rdquo; and a &ldquo;lag measure&rdquo; when tracking professional progress?',
    options: [
      'Lead measures track inputs you can control; lag measures track outcomes that follow',
      'Lead measures are more important than lag measures',
      'Lag measures track daily activities; lead measures track annual results',
      'There is no meaningful difference between them',
    ],
    correctAnswer: 0,
    explanation:
      'Lead measures are predictive and influenceable &mdash; for example, hours spent practising terminations each week. Lag measures are the outcomes, such as passing an AM2 assessment. McChesney, Covey &amp; Huling popularised this distinction in &ldquo;The 4 Disciplines of Execution,&rdquo; showing that focusing on lead measures gives you the best chance of improving lag results.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Lead vs Lag Measures',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 123,
    question:
      'Teresa Amabile&rsquo;s research at Harvard identified the &ldquo;progress principle.&rdquo; What did she find to be the most powerful workplace motivator?',
    options: [
      'Making meaningful progress in small steps',
      'Receiving a large annual bonus',
      'Being praised publicly by a manager',
      'Working longer hours than colleagues',
    ],
    correctAnswer: 0,
    explanation:
      'Amabile&rsquo;s research, published in &ldquo;The Progress Principle&rdquo; (2011), analysed nearly 12,000 diary entries from knowledge workers. She found that small wins &mdash; making meaningful progress on tasks that matter &mdash; were the single most powerful motivator at work, outranking recognition, incentives, and interpersonal support.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'The Progress Principle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 124,
    question:
      'The &ldquo;Seinfeld Strategy&rdquo; (&ldquo;don&rsquo;t break the chain&rdquo;) involves which simple tracking method?',
    options: [
      'Marking a calendar with an X for each day you complete a habit',
      'Writing a detailed journal entry every evening',
      'Setting a new goal at the start of each month',
      'Reviewing your progress only at the end of the year',
    ],
    correctAnswer: 0,
    explanation:
      'Comedian Jerry Seinfeld reportedly used this method: he wrote jokes every day and marked each successful day on a wall calendar with a big red X. As the chain grew, the visual streak became its own motivation. This technique leverages loss aversion &mdash; once you have built a chain, you don&rsquo;t want to break it.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'The Seinfeld Strategy',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 125,
    question: 'How many stages does David Kolb&rsquo;s Experiential Learning Cycle contain?',
    options: ['Four', 'Three', 'Five', 'Six'],
    correctAnswer: 0,
    explanation:
      'Kolb&rsquo;s Experiential Learning Cycle (1984) has four stages: Concrete Experience, Reflective Observation, Abstract Conceptualisation, and Active Experimentation. The model shows that learning is not just about doing &mdash; you must also reflect, form theories, and then test those theories in practice.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Kolb&rsquo;s Learning Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 126,
    question:
      'Which stage of Kolb&rsquo;s Experiential Learning Cycle involves thinking about what happened after completing a task?',
    options: [
      'Reflective Observation',
      'Concrete Experience',
      'Abstract Conceptualisation',
      'Active Experimentation',
    ],
    correctAnswer: 0,
    explanation:
      'Reflective Observation is the stage where you step back and think about what you experienced. For an electrician, this might mean reviewing why a particular cable run was difficult or why an RCD kept tripping during testing. Kolb emphasised that without reflection, experience alone does not lead to learning.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Kolb&rsquo;s Learning Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 127,
    question:
      'What is the main difference between Donald Sch&ouml;n&rsquo;s &ldquo;reflection-in-action&rdquo; and &ldquo;reflection-on-action&rdquo;?',
    options: [
      'Reflection-in-action happens during the task; reflection-on-action happens afterwards',
      'Reflection-on-action is more valuable than reflection-in-action',
      'Reflection-in-action is written down; reflection-on-action is not',
      'There is no difference &mdash; they are the same thing',
    ],
    correctAnswer: 0,
    explanation:
      'Donald Sch&ouml;n introduced these concepts in &ldquo;The Reflective Practitioner&rdquo; (1983). Reflection-in-action is thinking on your feet &mdash; adjusting your approach while wiring a distribution board, for example. Reflection-on-action is looking back after the job is complete to consider what went well and what could improve.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Sch&ouml;n&rsquo;s Reflective Practice',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 128,
    question: 'How many stages does Graham Gibbs&rsquo; Reflective Cycle contain?',
    options: ['Six', 'Four', 'Five', 'Seven'],
    correctAnswer: 0,
    explanation:
      'Gibbs&rsquo; Reflective Cycle (1988) has six stages: Description, Feelings, Evaluation, Analysis, Conclusion, and Action Plan. It provides a structured framework for reflecting on experiences, and is particularly useful for electricians debriefing after challenging installations or incidents.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Gibbs&rsquo; Reflective Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 129,
    question:
      'According to Anders Ericsson&rsquo;s research, what distinguishes &ldquo;deliberate practice&rdquo; from ordinary repetition?',
    options: [
      'Deliberate practice targets specific weaknesses with focused effort and feedback',
      'Deliberate practice means practising for longer hours than anyone else',
      'Deliberate practice only applies to musicians and athletes, not tradespeople',
      'Deliberate practice requires no feedback or coaching',
    ],
    correctAnswer: 0,
    explanation:
      'Ericsson&rsquo;s landmark research, summarised in &ldquo;Peak: Secrets from the New Science of Expertise&rdquo; (2016), showed that deliberate practice requires focused attention on weaknesses, immediate feedback, and structured repetition. Simply repeating the same tasks without conscious effort to improve does not lead to expertise.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Deliberate Practice',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 130,
    question:
      'What does CPD stand for in the context of electrical industry professional development?',
    options: [
      'Continuing Professional Development',
      'Certified Professional Diploma',
      'Compulsory Practical Demonstration',
      'Construction Project Delivery',
    ],
    correctAnswer: 0,
    explanation:
      'CPD stands for Continuing Professional Development. It is a requirement for maintaining professional registration with bodies such as the IET and the Engineering Council. CPD ensures that electricians keep their knowledge and skills current throughout their careers.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'CPD Requirements',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 131,
    question:
      'Which of the following is an example of &ldquo;formal&rdquo; CPD for an electrician?',
    options: [
      'Attending an accredited BS 7671 amendment course',
      'Reading a wiring diagram during a tea break',
      'Watching a general YouTube video about DIY wiring',
      'Having an informal chat with a colleague about a job',
    ],
    correctAnswer: 0,
    explanation:
      'Formal CPD includes structured, accredited learning such as courses, workshops, and examinations. The Engineering Council UK-SPEC framework recognises four types of CPD: formal (courses), informal (reading/networking), on-the-job (workplace learning), and self-directed (personal study).',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Types of CPD',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 132,
    question: 'How often must an ECS (Electrotechnical Certification Scheme) card be renewed?',
    options: ['Every five years', 'Every three years', 'Every year', 'Every ten years'],
    correctAnswer: 0,
    explanation:
      'ECS cards are valid for five years. Renewal requires evidence of ongoing competence, typically including up-to-date qualifications, a valid health and safety assessment, and evidence of CPD activity. This ensures that cardholders maintain current knowledge of regulations and practices.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'ECS Card Renewal',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 133,
    question:
      'What is a &ldquo;vanity metric&rdquo; in the context of tracking professional progress?',
    options: [
      'A measurement that looks impressive but does not indicate real improvement',
      'A metric used by vain people who want to show off',
      'Any numerical measure of progress',
      'A metric that is too difficult to track accurately',
    ],
    correctAnswer: 0,
    explanation:
      'Vanity metrics are numbers that make you feel good but do not reflect genuine progress. For example, counting the number of courses enrolled in (rather than completed) or social media followers rather than actual skills gained. Eric Ries popularised this concept in &ldquo;The Lean Startup,&rdquo; emphasising that actionable metrics are far more valuable.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Vanity Metrics vs Real Progress',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 134,
    question:
      'When tracking your progress, why is it important to measure yourself against your own past performance rather than comparing yourself to others?',
    options: [
      'Because everyone starts from a different point and has different circumstances',
      'Because comparing yourself to others is always motivating',
      'Because other people&rsquo;s progress is irrelevant to any industry',
      'Because there is no way to measure other people&rsquo;s performance',
    ],
    correctAnswer: 0,
    explanation:
      'The &ldquo;comparison trap&rdquo; can be demotivating and misleading because each person has a unique starting point, learning style, and set of circumstances. Research by Festinger (Social Comparison Theory, 1954) shows that upward comparison often reduces self-esteem. Measuring against your own past self gives an accurate picture of genuine progress.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Comparison Trap',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 135,
    question: 'What is the purpose of a daily debrief habit at the end of a working day?',
    options: [
      'To reflect on what went well, what could improve, and what to do differently tomorrow',
      'To write a formal report for your employer',
      'To complain about problems encountered during the day',
      'To plan social activities for the evening',
    ],
    correctAnswer: 0,
    explanation:
      'The daily debrief is a structured reflection habit, typically involving five questions: What did I accomplish? What went well? What could improve? What did I learn? What will I do differently tomorrow? Research by Di Stefano et al. (2014) at Harvard Business School found that workers who spent 15 minutes reflecting at the end of the day performed 23% better after 10 days than those who did not.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Daily Debrief Habit',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 136,
    question: 'What is a professional development journal used for?',
    options: [
      'Recording skills learned, challenges overcome, and CPD activities completed',
      'Writing personal diary entries about your feelings',
      'Keeping a record of hours worked for payroll purposes',
      'Documenting site safety incidents only',
    ],
    correctAnswer: 0,
    explanation:
      'A professional development journal is a structured record of your learning journey. It typically includes CPD activities, new skills acquired, challenges overcome, and reflections on practice. The Engineering Council recommends maintaining such records to demonstrate ongoing competence and support professional registration reviews.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'basic' as const,
    topic: 'Professional Development Journal',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  // =====================================================
  // INTERMEDIATE (16 questions) &mdash; IDs 137&ndash;152
  // =====================================================
  {
    id: 137,
    question:
      'An electrician tracks &ldquo;number of successful first-fix inspections per month&rdquo; as a performance metric. Is this a lead measure or a lag measure?',
    options: [
      'A lag measure &mdash; it tracks an outcome that has already happened',
      'A lead measure &mdash; it predicts future success',
      'Neither &mdash; it is a vanity metric',
      'Both &mdash; it can be either depending on context',
    ],
    correctAnswer: 0,
    explanation:
      'The number of successful first-fix inspections is a lag measure because it records an outcome that has already occurred. A corresponding lead measure might be &ldquo;hours spent reviewing installation drawings before starting work each week.&rdquo; McChesney, Covey &amp; Huling explain that you cannot directly influence lag measures &mdash; you can only influence the lead measures that drive them.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Lead vs Lag Measures',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 138,
    question:
      'According to Teresa Amabile&rsquo;s progress principle, which of the following management behaviours is MOST likely to undermine an employee&rsquo;s inner work life?',
    options: [
      'Dismissing the significance of small day-to-day achievements',
      'Providing regular constructive feedback',
      'Setting challenging but achievable goals',
      'Encouraging team collaboration on difficult projects',
    ],
    correctAnswer: 0,
    explanation:
      'Amabile&rsquo;s research found that setbacks &mdash; and particularly having progress dismissed or undermined by managers &mdash; had a disproportionately negative effect on motivation, creativity, and engagement. She called this the &ldquo;inner work life&rdquo; system and showed that even minor setbacks could have a greater negative impact than equivalent positive events.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'The Progress Principle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 139,
    question:
      'In Kolb&rsquo;s Experiential Learning Cycle, what happens during the &ldquo;Abstract Conceptualisation&rdquo; stage?',
    options: [
      'The learner forms theories or principles based on their reflections',
      'The learner carries out a new task for the first time',
      'The learner observes someone else performing the task',
      'The learner repeats the original experience unchanged',
    ],
    correctAnswer: 0,
    explanation:
      'Abstract Conceptualisation is where the learner draws conclusions and develops theories from their reflective observations. For an electrician, this might mean realising that a particular approach to cable containment causes problems and forming a new rule of thumb. Kolb (1984) argued that this stage transforms reflection into actionable knowledge.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Kolb&rsquo;s Learning Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 140,
    question:
      'An electrician notices during an installation that the cable route they planned will not work due to an unexpected steel beam. They adapt their approach in real time. Which of Sch&ouml;n&rsquo;s concepts does this best illustrate?',
    options: [
      'Reflection-in-action',
      'Reflection-on-action',
      'Abstract conceptualisation',
      'Active experimentation',
    ],
    correctAnswer: 0,
    explanation:
      'This is a clear example of Sch&ouml;n&rsquo;s reflection-in-action &mdash; thinking and adjusting while the work is happening. The electrician is not waiting until after the job to reflect; they are problem-solving in the moment. Sch&ouml;n (1983) described this as the hallmark of a skilled professional practitioner.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Sch&ouml;n&rsquo;s Reflective Practice',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 141,
    question:
      'In Gibbs&rsquo; Reflective Cycle, which stage asks &ldquo;What sense can I make of the situation?&rdquo;',
    options: ['Analysis', 'Evaluation', 'Description', 'Action Plan'],
    correctAnswer: 0,
    explanation:
      'The Analysis stage of Gibbs&rsquo; Reflective Cycle (1988) is where you try to make sense of the experience by examining what happened and why. It goes deeper than Evaluation (which asks &ldquo;What was good and bad?&rdquo;) by exploring underlying causes, patterns, and connections to existing knowledge or theory.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Gibbs&rsquo; Reflective Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 142,
    question:
      'Anders Ericsson found that experts typically sustain intense deliberate practice for a maximum of how many hours per day before diminishing returns set in?',
    options: [
      'Approximately four hours',
      'Approximately eight hours',
      'Approximately two hours',
      'Approximately six hours',
    ],
    correctAnswer: 0,
    explanation:
      'Ericsson&rsquo;s research across multiple domains &mdash; including music, chess, and sports &mdash; consistently found that elite performers could sustain focused deliberate practice for roughly four hours per day. Beyond this, concentration and quality declined. This does not mean stopping all work after four hours, but rather that the most demanding, improvement-focused practice has natural limits.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Deliberate Practice',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 143,
    question:
      'Which body sets out the UK-SPEC (UK Standard for Professional Engineering Competence) that defines CPD requirements for registered engineers?',
    options: [
      'The Engineering Council',
      'The Health and Safety Executive',
      'The Joint Industry Board',
      'City &amp; Guilds',
    ],
    correctAnswer: 0,
    explanation:
      'The Engineering Council publishes UK-SPEC, which sets competence and commitment standards for professional registration (EngTech, IEng, CEng). UK-SPEC requires all registrants to undertake CPD that is relevant, planned, and recorded. The IET, as a licensed institution, uses these standards when assessing members for professional registration.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Engineering Council UK-SPEC',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 144,
    question:
      'NICEIC registered contractors are subject to which type of assessment to maintain their registration?',
    options: [
      'Annual assessment of work quality and compliance procedures',
      'A single assessment at initial registration only',
      'Bi-annual written examinations',
      'Monthly site inspections by an external auditor',
    ],
    correctAnswer: 0,
    explanation:
      'NICEIC conducts annual assessments of registered contractors, examining the quality of electrical work, compliance with BS 7671, and the adequacy of testing and certification. This ongoing assessment ensures that registered contractors continue to meet the required standard and provides a form of externally verified continuous improvement.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'NICEIC Assessments',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 145,
    question:
      'BS 7671:2018 has been updated by several amendments. Which amendment, published in 2024, added requirements for bidirectional and unidirectional devices?',
    options: [
      'Amendment 3 (A3:2024)',
      'Amendment 1 (A1:2020)',
      'Amendment 2 (A2:2022)',
      'Amendment 4 (A4:2024)',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671:2018+A3:2024 was issued on 31 July 2024 and added Regulation 530.3.201 concerning bidirectional and unidirectional protective devices. Keeping up with amendments is a core CPD responsibility for electricians, as these changes directly affect how installations must be designed, installed, and tested.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'BS 7671 Amendments',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 146,
    question:
      'CITB (Construction Industry Training Board) offers training grants to employers. What is the primary purpose of these grants?',
    options: [
      'To subsidise the cost of training and encourage employers to invest in workforce development',
      'To pay employees&rsquo; wages while they attend courses',
      'To fund the construction of new training centres',
      'To provide free tools and equipment for apprentices',
    ],
    correctAnswer: 0,
    explanation:
      'CITB training grants are designed to reduce the financial barrier to training, encouraging employers in the construction industry to invest in their workforce. Grants are available for a wide range of qualifications and short courses. Employers who pay the CITB levy can claim grants that typically cover a significant portion of training costs.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'CITB Training Grants',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 147,
    question: 'Which of the following is an example of &ldquo;on-the-job&rdquo; CPD activity?',
    options: [
      'Learning a new cable containment technique from a senior electrician during an installation',
      'Attending an evening course at a local college',
      'Reading a technical article in a trade magazine at home',
      'Completing an online assessment from a certification body',
    ],
    correctAnswer: 0,
    explanation:
      'On-the-job CPD occurs through workplace experiences such as shadowing experienced colleagues, tackling unfamiliar installations, or learning new techniques during actual projects. The Engineering Council recognises this as a valid form of CPD alongside formal courses, informal learning, and self-directed study.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Types of CPD',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 148,
    question:
      'In the daily debrief habit, one of the five key questions is &ldquo;What will I do differently tomorrow?&rdquo; Which stage of Gibbs&rsquo; Reflective Cycle does this most closely align with?',
    options: ['Action Plan', 'Description', 'Feelings', 'Evaluation'],
    correctAnswer: 0,
    explanation:
      'The Action Plan stage of Gibbs&rsquo; Reflective Cycle is where you decide what you would do differently if the situation arose again. The daily debrief question &ldquo;What will I do differently tomorrow?&rdquo; directly mirrors this forward-looking, action-oriented stage, closing the loop between reflection and future practice.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Daily Debrief Habit',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 149,
    question:
      'An electrician counts the number of social media followers on their business page as evidence of professional growth. According to best practice in progress tracking, why might this be misleading?',
    options: [
      'Social media followers are a vanity metric that does not necessarily reflect professional competence or real business growth',
      'Social media is completely irrelevant to the electrical industry',
      'Follower counts are always accurate indicators of business success',
      'Only qualified professionals should use social media',
    ],
    correctAnswer: 0,
    explanation:
      'Social media follower counts are a classic vanity metric &mdash; they can be inflated by bots, irrelevant audiences, or viral content that has nothing to do with professional competence. Eric Ries argues that actionable metrics (such as customer retention rate, referral rate, or first-time fix rate) are far more meaningful indicators of genuine professional and business progress.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Vanity Metrics vs Real Progress',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 150,
    question:
      'When applying Kolb&rsquo;s cycle to learning a new skill such as three-phase motor control, what does the &ldquo;Active Experimentation&rdquo; stage involve?',
    options: [
      'Trying out the new approach or theory in a practical setting to test what you have learned',
      'Reading the manufacturer&rsquo;s installation manual',
      'Watching a colleague demonstrate the technique',
      'Writing up notes about the experience',
    ],
    correctAnswer: 0,
    explanation:
      'Active Experimentation is the final stage of Kolb&rsquo;s cycle where the learner applies their new understanding in practice. After reflecting on an experience and forming theories, you test those theories by doing. For three-phase motor control, this might mean wiring a DOL starter using the new technique you developed from reflecting on previous attempts.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Kolb&rsquo;s Learning Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 151,
    question:
      'NAPIT member contractors are required to undergo periodic assessment. What is the primary purpose of this assessment?',
    options: [
      'To verify that the contractor&rsquo;s work continues to comply with BS 7671 and other relevant standards',
      'To generate revenue for NAPIT through inspection fees',
      'To assess the contractor&rsquo;s financial stability',
      'To check that the contractor has a valid driving licence',
    ],
    correctAnswer: 0,
    explanation:
      'NAPIT assessments exist to ensure that member contractors maintain competence and compliance with current regulations, primarily BS 7671. Assessors review completed work, certification, and testing records. This external verification is a powerful form of continuous improvement because it provides independent, expert feedback on the quality of your work.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'NAPIT Assessments',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 152,
    question:
      'An apprentice electrician compares their wiring speed to that of a qualified electrician with 20 years of experience and feels demoralised. What concept does this illustrate?',
    options: [
      'The comparison trap &mdash; measuring yourself against someone with vastly different experience',
      'Deliberate practice &mdash; the apprentice is practising deliberately',
      'The progress principle &mdash; small wins are motivating',
      'The Seinfeld strategy &mdash; the chain has been broken',
    ],
    correctAnswer: 0,
    explanation:
      'This illustrates the comparison trap. Festinger&rsquo;s Social Comparison Theory (1954) explains that upward comparisons &mdash; especially to those far ahead of us &mdash; can reduce motivation and self-esteem. The apprentice would benefit more from tracking their own speed improvement over weeks and months, focusing on personal progress rather than comparing to someone at a completely different career stage.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'intermediate' as const,
    topic: 'Comparison Trap',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  // =====================================================
  // ADVANCED (8 questions) &mdash; IDs 153&ndash;160
  // =====================================================
  {
    id: 153,
    question:
      'A site supervisor wants to improve first-time-right installation rates. Using the lead/lag measure framework, which combination of metrics would be MOST effective?',
    options: [
      'Lead: hours of pre-installation planning per job; Lag: percentage of installations passing first inspection',
      'Lead: number of installations completed per week; Lag: total revenue per month',
      'Lead: percentage passing first inspection; Lag: hours of planning per job',
      'Lead: customer complaints received; Lag: number of warranty claims',
    ],
    correctAnswer: 0,
    explanation:
      'Hours of pre-installation planning is a lead measure because the supervisor can directly influence and control it. The percentage of installations passing first inspection is the lag measure &mdash; the desired outcome. McChesney, Covey &amp; Huling emphasise that the best lead measures are both predictive of the lag measure and directly influenceable by the team. Option C reverses the lead/lag relationship incorrectly.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Lead vs Lag Measures',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 154,
    question:
      'A qualified electrician uses Gibbs&rsquo; Reflective Cycle to analyse a near-miss incident where they nearly drilled into a concealed cable. They have completed Description, Feelings, Evaluation, and Analysis. What should the Conclusion and Action Plan stages produce?',
    options: [
      'Conclusion: identifying what they could have done differently (e.g., always use a cable detector); Action Plan: specific steps to prevent recurrence (e.g., purchase a CAT scanner, add pre-drill check to personal checklist)',
      'Conclusion: blaming the previous electrician for poor cable routing; Action Plan: filing a complaint with the building owner',
      'Conclusion: accepting that near-misses are inevitable in the trade; Action Plan: no changes needed',
      'Conclusion: summarising what happened in written form; Action Plan: reading the HSE website for general safety tips',
    ],
    correctAnswer: 0,
    explanation:
      'Gibbs (1988) designed the final two stages to be action-oriented. The Conclusion stage asks &ldquo;What else could I have done?&rdquo; and the Action Plan asks &ldquo;If it arose again, what would I do?&rdquo; Effective reflective practice produces concrete, specific changes to future behaviour &mdash; not generic intentions or blame-shifting. The best Action Plans are measurable and immediately actionable.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Gibbs&rsquo; Reflective Cycle',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 155,
    question:
      'An electrician has been terminating SWA cables for 10 years but still occasionally makes errors. According to Ericsson&rsquo;s deliberate practice framework, what is the MOST likely reason for this plateau?',
    options: [
      'They have been repeating the same technique without targeted feedback on their specific errors',
      'Ten years is not enough experience to master SWA terminations',
      'SWA termination is too complex to ever be fully mastered',
      'They need to switch to a completely different cable type to refresh their skills',
    ],
    correctAnswer: 0,
    explanation:
      'Ericsson&rsquo;s research demonstrates that experience alone does not guarantee expertise. Many professionals reach an &ldquo;acceptable performance&rdquo; plateau where they repeat habitual actions without focused improvement. The key differentiator is deliberate practice: identifying specific weaknesses, getting expert feedback, and making targeted adjustments. An electrician who never analyses why specific terminations fail will continue making the same errors regardless of years served.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Deliberate Practice',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 156,
    question:
      'The Engineering Council&rsquo;s UK-SPEC requires CPD to be &ldquo;planned, action-oriented, and regularly reviewed.&rdquo; An IET-registered EngTech electrician has completed 30 hours of CPD this year, all in the same narrow topic area. How would this likely be assessed during a professional review?',
    options: [
      'It may be assessed as insufficient because CPD should demonstrate breadth across multiple competence areas, not just volume of hours',
      'It would be rated as excellent because 30 hours exceeds most requirements',
      'It would be irrelevant because CPD quality is never assessed at review',
      'It would be automatically accepted because all formal training counts equally',
    ],
    correctAnswer: 0,
    explanation:
      'The Engineering Council evaluates CPD on quality and relevance, not just quantity. UK-SPEC expects CPD to cover multiple competence areas including technical knowledge, design, management, and professional commitment. A professional review panel would likely ask why all development was concentrated in one area and whether broader professional competences are being maintained. Balance and strategic planning of CPD are key assessment criteria.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Engineering Council UK-SPEC',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 157,
    question:
      'BS 7671 was amended by A1:2020, A2:2022, and A3:2024. An electrical contractor who last updated their knowledge at A1:2020 now encounters a solar PV installation requiring bidirectional overcurrent protection. What is the MOST significant gap in their knowledge?',
    options: [
      'They will be unaware of Regulation 530.3.201 introduced by A3:2024, which specifically addresses bidirectional and unidirectional protective devices',
      'They will not know how to select cable sizes for solar installations',
      'They will be unable to perform earth fault loop impedance testing',
      'They will not understand the basic principles of overcurrent protection',
    ],
    correctAnswer: 0,
    explanation:
      'Amendment 3 (A3:2024), issued 31 July 2024, introduced Regulation 530.3.201 specifically addressing the selection of bidirectional and unidirectional protective devices &mdash; directly relevant to solar PV installations where current can flow in both directions. An electrician who stopped updating at A1:2020 would also have missed changes in A2:2022. This illustrates why tracking amendments is an essential part of continuous improvement.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'BS 7671 Amendments',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 158,
    question:
      'A training manager wants to integrate Kolb&rsquo;s Experiential Learning Cycle and Sch&ouml;n&rsquo;s reflective practice into a structured apprentice development programme. Which approach BEST combines both frameworks?',
    options: [
      'Apprentices complete practical tasks (Concrete Experience), reflect during the task (reflection-in-action), discuss afterwards (reflection-on-action and Reflective Observation), draw conclusions (Abstract Conceptualisation), and apply improvements on the next task (Active Experimentation)',
      'Apprentices attend classroom lectures and then sit a written examination',
      'Apprentices watch demonstration videos and write summaries',
      'Apprentices repeat the same practical task 20 times without any structured reflection',
    ],
    correctAnswer: 0,
    explanation:
      'This approach integrates both frameworks effectively. Kolb&rsquo;s cycle provides the overall structure (experience, reflect, theorise, test), while Sch&ouml;n&rsquo;s concepts add depth by distinguishing between real-time thinking (reflection-in-action during the task) and post-task analysis (reflection-on-action). Together, they create a comprehensive development model that captures learning both in the moment and upon review.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Combined Reflective Frameworks',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 159,
    question:
      'An electrician maintains a professional development journal and records: &ldquo;Completed 18th Edition course, learned about RCD selection, plan to apply this on my next domestic rewire.&rdquo; Using Amabile&rsquo;s progress principle and Gibbs&rsquo; framework, how could this journal entry be improved?',
    options: [
      'Add specific details about what was learned, how it felt to overcome challenging concepts, analyse why RCD selection was previously a weakness, and create a concrete action plan with measurable steps',
      'Keep it brief because detailed entries waste time',
      'Remove the personal reflection and focus only on listing the course title and date',
      'Add the course fee and receipt number for tax purposes only',
    ],
    correctAnswer: 0,
    explanation:
      'Amabile&rsquo;s research shows that documenting meaningful progress in detail reinforces motivation (the progress principle). Gibbs&rsquo; six stages (Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan) provide a structure that transforms a superficial log entry into genuine reflective learning. The improved entry would capture not just what happened, but the emotional experience, what was good and bad, deeper analysis, and specific forward actions.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Professional Development Journal',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
  {
    id: 160,
    question:
      'A self-employed electrician is preparing their CPD portfolio for ECS card renewal and IET EngTech professional review simultaneously. They have evidence of formal training (18th Edition update), informal learning (reading technical articles), on-the-job learning (complex commercial installation), and self-directed study (practising inspection and testing techniques). Which aspect of their portfolio MOST demonstrates alignment with both Ericsson&rsquo;s deliberate practice and the Engineering Council&rsquo;s UK-SPEC requirements?',
    options: [
      'The self-directed study where they identified a specific weakness in inspection and testing and systematically practised to improve it',
      'The formal training course because it has the most recognised certification',
      'The informal reading because it covers the widest range of topics',
      'The on-the-job learning because it required the most hours',
    ],
    correctAnswer: 0,
    explanation:
      'Self-directed study that targets a specific weakness aligns perfectly with both Ericsson&rsquo;s deliberate practice (focused effort on identified weaknesses with feedback) and UK-SPEC&rsquo;s requirement for planned, purposeful CPD. The Engineering Council values evidence that a professional has identified development needs, created a plan to address them, and can demonstrate improvement. While all four CPD types have value, the self-directed targeted practice best demonstrates both the scientific principles of expert development and the professional standards required by the Engineering Council.',
    section: 'Tracking Progress &amp; Continuous Improvement',
    difficulty: 'advanced' as const,
    topic: 'Combined CPD Framework',
    category: 'Tracking Progress &amp; Continuous Improvement',
  },
];
