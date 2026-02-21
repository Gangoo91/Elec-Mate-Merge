/**
 * Emotional Intelligence Mock Exam Question Bank
 *
 * 200 questions covering all 5 categories with difficulty distribution.
 *
 * Categories (5):
 *   Understanding Emotional Intelligence (40) | Self-Awareness (40) |
 *   Self-Regulation (40) | Motivation & Empathy (40) |
 *   Social Skills & Applying EI (40)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const emotionalIntelligenceCategories = [
  'Understanding Emotional Intelligence',
  'Self-Awareness',
  'Self-Regulation',
  'Motivation & Empathy',
  'Social Skills & Applying EI',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const emotionalIntelligenceMockExamConfig: MockExamConfig = {
  examId: 'emotional-intelligence',
  examTitle: 'Emotional Intelligence Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/ei-module-6',
  categories: emotionalIntelligenceCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomEIExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    emotionalIntelligenceQuestionBank,
    numQuestions,
    emotionalIntelligenceCategories
  );
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const emotionalIntelligenceQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING EMOTIONAL INTELLIGENCE — 40 questions (id 1–40)
  // =======================================================================

  // ===== BASIC (id 1-16) =====
  {
    id: 1,
    question: 'How is emotional intelligence (EI) most accurately defined?',
    options: [
      'The ability to perceive, understand, manage, and use emotions effectively in oneself and others',
      'The capacity to suppress negative emotions in professional settings',
      'A measure of how emotionally sensitive a person is compared to others',
      'The skill of always remaining calm regardless of circumstances',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Emotional intelligence is defined as the ability to perceive, understand, manage, and use emotions effectively. This definition, rooted in the work of Salovey and Mayer (1990), emphasises that EI involves both recognising emotions and using them constructively, not suppressing them.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'EI definition',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 2,
    question:
      'Which two psychologists first formally proposed the concept of emotional intelligence in 1990?',
    options: [
      'Daniel Goleman and Howard Gardner',
      'Peter Salovey and John D. Mayer',
      'Reuven Bar-On and Paul Ekman',
      'Martin Seligman and Mihaly Csikszentmihalyi',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Peter Salovey and John D. Mayer published the first formal academic model of emotional intelligence in 1990, defining it as a form of intelligence involving the ability to monitor one's own and others' feelings and to use this information to guide thinking and action.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Salovey & Mayer 1990',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 3,
    question:
      'Daniel Goleman\'s 1995 book "Emotional Intelligence" is primarily credited with which achievement?',
    options: [
      'Inventing the concept of emotional intelligence',
      'Popularising emotional intelligence and bringing it to mainstream awareness',
      'Proving that EI is more important than IQ in every situation',
      'Developing the first psychometric test for measuring EI',
    ] as const,
    correctAnswer: 1,
    explanation:
      "While Salovey and Mayer originated the academic concept in 1990, Daniel Goleman's 1995 bestselling book brought emotional intelligence to mainstream public and business awareness. He did not invent the concept, but his work made it widely accessible and applicable to workplace settings.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Goleman 1995',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 4,
    question: 'What is the relationship between emotional intelligence (EI) and IQ?',
    options: [
      'EI and IQ measure the same underlying ability',
      'EI and IQ are separate constructs that both contribute to overall effectiveness and success',
      'A high IQ automatically means a high EI',
      'EI has been proven to be irrelevant compared to IQ',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research consistently shows that EI and IQ are distinct constructs. IQ measures cognitive ability, while EI measures emotional and social competence. Both contribute to professional effectiveness. Studies suggest EI can account for up to 58% of job performance across various roles.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'EI vs IQ',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 5,
    question:
      'According to TalentSmart research involving over one million people, what percentage of top performers were found to have high emotional intelligence?',
    options: ['50%', '70%', '90%', '100%'] as const,
    correctAnswer: 2,
    explanation:
      "TalentSmart's research, one of the largest studies of its kind involving over one million participants, found that 90% of top performers scored high in emotional intelligence. This finding highlights EI as a critical differentiator between average and exceptional workplace performance.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'TalentSmart research',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 6,
    question:
      'In the Salovey-Mayer four-branch model, what is the correct sequence of emotional abilities from most basic to most complex?',
    options: [
      'Perceiving emotions → Using emotions to facilitate thought → Understanding emotions → Managing emotions',
      'Managing emotions → Understanding emotions → Using emotions → Perceiving emotions',
      'Understanding emotions → Perceiving emotions → Managing emotions → Using emotions',
      'Using emotions → Managing emotions → Perceiving emotions → Understanding emotions',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The Salovey-Mayer four-branch model arranges emotional abilities hierarchically: (1) Perceiving emotions (identifying them in faces, voices, images), (2) Using emotions to facilitate thought (harnessing emotions to aid reasoning), (3) Understanding emotions (comprehending emotional language and signals), and (4) Managing emotions (regulating emotions in self and others). Each branch builds upon the previous one.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Four-branch model',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 7,
    question: 'What does the Bar-On EQ-i model measure?',
    options: [
      'Only cognitive intelligence as it relates to emotions',
      'Emotional and social competencies that influence how effectively we understand and express ourselves, relate to others, and cope with daily demands',
      'The speed at which a person can identify facial expressions',
      'Whether a person has a clinical emotional disorder',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Bar-On Emotional Quotient Inventory (EQ-i), developed by Reuven Bar-On, measures a range of emotional and social competencies including intrapersonal skills, interpersonal skills, stress management, adaptability, and general mood. It was the first scientifically validated measure of emotional intelligence.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Bar-On EQ-i',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 8,
    question: 'What role does the amygdala play in emotional processing?',
    options: [
      'It controls logical reasoning and mathematical calculations',
      "It acts as the brain's emotional alarm system, processing threats and triggering rapid emotional responses",
      'It is solely responsible for storing long-term memories',
      'It regulates body temperature and hunger',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The amygdala is an almond-shaped structure in the brain's limbic system that serves as an emotional alarm system. It processes incoming sensory information for potential threats and can trigger rapid fight-flight-freeze responses before the conscious mind has time to evaluate the situation. Understanding this mechanism is fundamental to emotional intelligence.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Amygdala',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 9,
    question:
      'Which brain region is most associated with rational thinking, planning, and the conscious regulation of emotions?',
    options: [
      'The amygdala',
      'The hippocampus',
      'The prefrontal cortex',
      'The cerebellum',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The prefrontal cortex, located behind the forehead, is responsible for executive functions including rational thinking, planning, decision-making, and the conscious regulation of emotions. It works in partnership with the amygdala; when functioning well, it can moderate the amygdala's impulsive emotional reactions.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Prefrontal cortex',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 10,
    question: 'The limbic system is best described as:',
    options: [
      'The part of the brain that controls motor movement and balance',
      'A collection of brain structures involved in emotional responses, memory formation, and motivation',
      'The outer layer of the brain responsible for language processing',
      'A single structure that only processes fear',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The limbic system is a collection of interconnected brain structures including the amygdala, hippocampus, thalamus, and hypothalamus. It plays a central role in emotional responses, memory formation, motivation, and behavioural reactions. Understanding the limbic system helps explain why emotions can sometimes override rational thought.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Limbic system',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 11,
    question:
      "According to Paul Ekman's research, which six emotions are considered universal across all human cultures?",
    options: [
      'Happiness, sadness, anger, fear, surprise, and disgust',
      'Joy, guilt, shame, pride, love, and jealousy',
      'Excitement, boredom, anxiety, contentment, envy, and grief',
      'Trust, anticipation, ecstasy, rage, terror, and admiration',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Paul Ekman's cross-cultural research identified six basic emotions that are universally recognised across all human cultures: happiness, sadness, anger, fear, surprise, and disgust. These emotions produce distinct facial expressions that people worldwide can identify, regardless of cultural background.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Ekman 6 emotions',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 12,
    question: 'What is an "amygdala hijack"?',
    options: [
      'A medical condition requiring treatment',
      'An overwhelming emotional reaction disproportionate to the trigger, where the amygdala overrides the rational brain',
      'A technique for improving emotional control',
      'The process of consciously activating the amygdala to enhance performance',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The term "amygdala hijack," coined by Daniel Goleman, describes a situation where the amygdala triggers an intense emotional response that overrides the prefrontal cortex\'s rational processing. This results in a reaction that is immediate, overwhelming, and often disproportionate to the actual stimulus. Recognising when this occurs is a key EI skill.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Amygdala hijack',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 13,
    question: 'The fight-flight-freeze response is best described as:',
    options: [
      'A deliberate decision-making process used in conflict resolution',
      "The body's automatic physiological reaction to perceived danger, preparing for immediate action or immobility",
      'A training technique used in martial arts',
      'A management strategy for dealing with difficult employees',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The fight-flight-freeze response is the body's automatic survival mechanism triggered by the amygdala when a threat is perceived. It releases stress hormones like cortisol and adrenaline, increasing heart rate, tensing muscles, and preparing the body to fight, flee, or freeze. On a construction site, understanding this response helps explain why workers may react impulsively in high-pressure situations.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Fight-flight-freeze',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 14,
    question: 'What is emotional contagion?',
    options: [
      'A clinical disorder where emotions spread uncontrollably',
      "The phenomenon where one person's emotions and related behaviours trigger similar emotions and behaviours in others",
      "The process of deliberately copying someone else's emotional state",
      'A technique used in therapy to transfer positive emotions to patients',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional contagion is the well-documented phenomenon where emotions spread between people, often unconsciously. Research shows that people tend to "catch" the emotions of those around them through facial expressions, body language, and tone of voice. On a construction site, a supervisor\'s negative mood can quickly spread through an entire team, affecting morale and safety.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Emotional contagion',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 15,
    question:
      'The cognitive triangle (also known as the CBT triangle) shows the relationship between which three elements?',
    options: [
      'Past, present, and future',
      'Thoughts, feelings, and behaviours',
      'Intelligence, personality, and environment',
      'Stimulus, response, and reinforcement',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The cognitive triangle, central to Cognitive Behavioural Therapy (CBT), illustrates the interconnected relationship between thoughts, feelings, and behaviours. Each element influences the other two: changing how you think about a situation can alter how you feel and behave, and vice versa. This is a foundational concept for developing emotional intelligence.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'Cognitive triangle',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 16,
    question: 'Which statement about emotional intelligence is supported by research?',
    options: [
      'Emotional intelligence is fixed at birth and cannot be developed',
      'Emotional intelligence can be learned and developed throughout life with deliberate practice',
      'Only people in leadership roles need emotional intelligence',
      'Emotional intelligence decreases steadily as people age',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research consistently shows that emotional intelligence is not a fixed trait — it can be developed and strengthened at any age through deliberate practice, feedback, and coaching. Studies by Goleman and others have demonstrated that EI competencies improve with targeted training, making it accessible to everyone regardless of their starting point.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'basic' as const,
    topic: 'EI development',
    category: 'Understanding Emotional Intelligence' as const,
  },

  // ===== INTERMEDIATE (id 17-32) =====
  {
    id: 17,
    question:
      "What are the five domains of emotional intelligence according to Daniel Goleman's framework?",
    options: [
      'Self-awareness, self-regulation, motivation, empathy, and social skills',
      'Perception, facilitation, understanding, management, and application',
      'Intrapersonal, interpersonal, adaptability, stress management, and general mood',
      'Emotional literacy, emotional fitness, emotional depth, emotional alchemy, and emotional mastery',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Goleman's influential framework identifies five key domains of EI: (1) Self-awareness — knowing your emotions, (2) Self-regulation — managing your emotions, (3) Motivation — using emotions to drive goals, (4) Empathy — recognising emotions in others, and (5) Social skills — managing relationships effectively. These five domains contain 25 specific competencies.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: "Goleman's 5 domains",
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 18,
    question:
      'Goleman\'s model includes 25 competencies distributed across the five domains. Which of the following is a competency within the "self-regulation" domain?',
    options: [
      'Emotional self-awareness',
      'Trustworthiness — maintaining standards of honesty and integrity',
      'Achievement drive',
      'Influence',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In Goleman's framework, the self-regulation domain contains five competencies: self-control, trustworthiness, conscientiousness, adaptability, and innovation. Trustworthiness involves maintaining standards of honesty and integrity. Emotional self-awareness belongs to self-awareness, achievement drive to motivation, and influence to social skills.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: "Goleman's 25 competencies",
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 19,
    question:
      'Why does Goleman argue that the five EI domains build sequentially upon one another?',
    options: [
      'Because each domain requires formal certification before progressing to the next',
      'Because you must understand your own emotions before you can regulate them, and you must manage yourself before you can effectively manage relationships with others',
      'Because research shows each domain develops at a different age',
      'Because employers require employees to master them in a specific order',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Goleman's model is sequential: self-awareness is the foundation because you cannot manage what you do not recognise. Self-regulation builds on awareness. Motivation uses managed emotions to drive goals. Empathy extends emotional understanding outward to others. Social skills build on all prior domains to manage relationships. Each domain serves as a prerequisite for the next.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Domains building sequentially',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 20,
    question:
      'The HSE Management Standards identify six key areas of work design that can affect stress levels. Which of the following is one of these six areas?',
    options: [
      'Annual salary and bonus structure',
      'Demands — including workload, work patterns, and the work environment',
      'Office décor and furniture quality',
      'Social media access during work hours',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The HSE Management Standards cover six areas: Demands (workload, work patterns, work environment), Control (how much say a person has), Support (from management and colleagues), Relationships (promoting positive working), Role (clarity of role), and Change (how change is managed). Understanding these standards helps apply EI to workplace wellbeing in the construction industry.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'HSE Management Standards',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 21,
    question:
      'CITB behavioural competencies for site managers include emotional intelligence-related skills. Which of the following is a CITB behavioural competency?',
    options: [
      'Advanced mathematics for construction calculations',
      'Leading and motivating others, including managing relationships and understanding team dynamics',
      'Operating heavy plant machinery',
      'Designing structural steelwork',
    ] as const,
    correctAnswer: 1,
    explanation:
      'CITB behavioural competencies for construction managers include leading and motivating others, communicating effectively, team building, and managing relationships — all of which require emotional intelligence. These competencies recognise that technical skills alone are insufficient for effective site management; interpersonal and emotional skills are equally critical.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'CITB behavioural competencies',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 22,
    question: 'How does emotional intelligence contribute to safety on construction sites?',
    options: [
      'It replaces the need for formal safety training',
      'It helps workers recognise emotional states like stress, fatigue, and frustration that impair judgement and increase accident risk',
      'It only matters for office-based safety managers',
      'It has no proven link to workplace safety',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research shows that emotional states directly affect safety behaviour. Stress, anger, fatigue, and frustration impair judgement, reduce concentration, and increase risk-taking. EI helps workers and supervisors recognise these states in themselves and others, enabling early intervention before unsafe behaviours lead to incidents. Studies indicate that teams with higher collective EI have fewer workplace accidents.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'EI and safety',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 23,
    question:
      'In a construction team context, which scenario best demonstrates the practical application of emotional intelligence?',
    options: [
      "A site supervisor ignoring a worker's personal problems because they are not work-related",
      "A site supervisor noticing an apprentice is unusually quiet, checking in privately, and adjusting the day's tasks to support them",
      'A site supervisor shouting at the team to work faster because the project is behind schedule',
      'A site supervisor sending a group email about productivity targets',
    ] as const,
    correctAnswer: 1,
    explanation:
      'This scenario demonstrates multiple EI competencies in action: empathy (noticing the change in behaviour), social awareness (checking in privately to preserve dignity), and relationship management (adjusting tasks to support the individual while maintaining productivity). In construction, where mental health challenges are prevalent, such emotionally intelligent leadership can literally save lives.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'EI in construction',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 24,
    question:
      'What is the primary purpose of the Mates in Mind programme in the UK construction industry?',
    options: [
      'To provide financial loans to construction workers',
      'To raise awareness, address the stigma of poor mental health, and improve mental wellbeing in the construction industry',
      'To offer free construction training courses',
      'To recruit apprentices into the building trades',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Mates in Mind is a UK charitable programme established to address the disproportionately high rates of mental health problems and suicide in the construction industry. It works to raise awareness, address stigma, and improve mental wellbeing by providing training, resources, and support frameworks for construction organisations. EI skills are central to its approach.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Mates in Mind',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 25,
    question: 'What are the potential costs of low emotional intelligence in a construction team?',
    options: [
      'Low EI has no measurable impact on construction projects',
      'Higher conflict, poor communication, increased staff turnover, more safety incidents, and reduced productivity',
      'Slightly slower project delivery but no other effects',
      'Only the individual with low EI is affected, not the wider team',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Low emotional intelligence in teams has wide-ranging costs: increased interpersonal conflict, communication breakdowns, higher staff turnover (recruitment and training costs), more safety incidents (compensation and delay costs), reduced productivity, and lower morale. Research suggests these factors can increase project costs by 20-30% and significantly impact programme delivery.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Cost of low EI',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 26,
    question: 'How does emotional contagion typically spread within a construction team?',
    options: [
      'Only through written communications such as emails and text messages',
      'Through facial expressions, tone of voice, body language, and behavioural patterns — often unconsciously',
      'Only when someone verbally states their emotional condition',
      'It does not occur in physically demanding work environments',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Emotional contagion spreads primarily through non-verbal channels: facial expressions, tone of voice, body language, and observable behaviours. Research shows this process is largely unconscious — people mirror the emotions of those around them without deliberate intent. On a busy site, a supervisor's frustration can spread through the entire team within minutes, affecting safety and productivity.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Emotional contagion in teams',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 27,
    question: 'In the context of EI, what does "emotional literacy" specifically refer to?',
    options: [
      'The ability to read books about emotions',
      'The ability to accurately identify, name, and describe emotions in oneself and others',
      'The ability to write about emotional experiences in a journal',
      'The ability to pass a written test about emotional theories',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional literacy is the foundational EI skill of being able to accurately identify, name, and describe emotions. Research by Lisa Feldman Barrett on emotional granularity shows that people who can make finer distinctions between emotions (e.g., distinguishing frustration from disappointment from irritation) are better at regulating those emotions. This skill is the building block for all other EI competencies.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Emotional literacy',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 28,
    question:
      'Which of the following best describes the concept of "emotional agility" as developed by Susan David?',
    options: [
      'The ability to switch emotions on and off at will',
      'The skill of being flexible with thoughts and feelings so that you can respond optimally to everyday situations',
      'The speed at which a person recovers from emotional distress',
      'The capacity to feel multiple emotions simultaneously',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Susan David's concept of emotional agility involves being flexible with your thoughts and feelings in order to respond optimally to life's situations. It means neither ignoring emotions nor being controlled by them, but rather engaging with them in a mindful, values-driven way. This approach aligns with evidence that rigid emotional responses lead to poorer outcomes.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Emotional agility',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 29,
    question:
      'According to research, how does emotional intelligence relate to leadership effectiveness in the construction industry?',
    options: [
      'EI is useful only for senior executives and has no relevance to site-level leadership',
      'Leaders with higher EI consistently achieve better team performance, safety records, and employee retention',
      'Technical knowledge is the only factor that determines leadership effectiveness on site',
      'EI and leadership effectiveness are negatively correlated in high-pressure environments',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Research across industries, including construction, consistently shows that leaders with higher emotional intelligence achieve better outcomes including improved team performance, stronger safety records, higher employee engagement, and better retention rates. Goleman's research found that EI accounts for nearly 90% of the difference between star performers and average ones in leadership positions.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'EI and leadership',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 30,
    question: 'What is the primary difference between "trait EI" and "ability EI" models?',
    options: [
      'There is no meaningful difference between them',
      'Trait EI models measure self-perceived emotional competencies through questionnaires, while ability EI models measure actual performance on emotion-related tasks',
      'Trait EI is innate while ability EI is learned',
      'Trait EI applies only to extroverts while ability EI applies to introverts',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Trait EI models (like Bar-On's EQ-i and Goleman's ECI) assess how people perceive their own emotional competencies through self-report questionnaires. Ability EI models (like the Mayer-Salovey-Caruso Emotional Intelligence Test, MSCEIT) measure actual performance on tasks such as identifying emotions in faces or predicting emotional outcomes. Both approaches provide valuable but different information.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Trait vs ability EI',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 31,
    question:
      'In the context of the UK construction industry, why is emotional intelligence particularly important for managing subcontractor relationships?',
    options: [
      'Because subcontractors do not require technical competence',
      'Because effective coordination of diverse teams with different cultures, pressures, and priorities requires strong empathy, communication, and conflict resolution skills',
      'Because subcontractors are always emotionally unstable',
      'Because contracts require evidence of EI training',
    ] as const,
    correctAnswer: 1,
    explanation:
      'UK construction projects typically involve multiple subcontractors with different organisational cultures, commercial pressures, and priorities. Managing these relationships effectively requires strong EI skills including empathy (understanding different perspectives), communication (clear and respectful interaction), and conflict resolution (addressing disputes constructively). Poor relationships between parties are a leading cause of project delays and cost overruns.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'EI and subcontractor management',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 32,
    question:
      'How does the concept of "neuroplasticity" relate to developing emotional intelligence?',
    options: [
      'Neuroplasticity has no connection to emotional intelligence',
      "The brain's ability to form new neural pathways throughout life means that EI skills can be developed and strengthened at any age through repeated practice",
      'Neuroplasticity only occurs in childhood, so EI must be learned before adulthood',
      'Neuroplasticity means emotional patterns are permanently fixed once formed',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Neuroplasticity — the brain's ability to reorganise itself by forming new neural connections throughout life — is the biological basis for EI development. When a person repeatedly practises EI skills like pausing before reacting or identifying emotions, they strengthen neural pathways that make these behaviours more automatic over time. This is why consistent practice is essential for lasting EI improvement.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'intermediate' as const,
    topic: 'Neuroplasticity and EI',
    category: 'Understanding Emotional Intelligence' as const,
  },

  // ===== ADVANCED (id 33-40) =====
  {
    id: 33,
    question:
      "When comparing Goleman's, Bar-On's, and Salovey-Mayer's models of emotional intelligence, which statement is most accurate?",
    options: [
      'All three models are identical and interchangeable',
      'Salovey-Mayer focuses on cognitive emotional abilities, Bar-On on emotional-social personality traits, and Goleman on workplace performance competencies — each offering a different but complementary lens',
      'Only the Goleman model has any scientific validity',
      'The Bar-On model is solely focused on clinical diagnosis of emotional disorders',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The three major EI models offer complementary perspectives: Salovey-Mayer's ability model treats EI as a cognitive ability measured through performance tasks (MSCEIT). Bar-On's model views EI as a set of emotional-social personality traits and competencies (EQ-i). Goleman's model focuses on emotional competencies that drive workplace performance (ECI). Understanding all three provides the most comprehensive view of EI.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'Comparing EI models',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 34,
    question:
      "A construction project manager notices that two teams on site are in open conflict, productivity has dropped significantly, and several workers have requested transfers. Using Goleman's framework, which sequence of EI application would be most effective?",
    options: [
      'Immediately discipline both teams and enforce stricter rules',
      "First manage their own emotional reaction (self-regulation), then seek to understand each team's perspective (empathy), identify the root cause (social awareness), and facilitate a collaborative resolution (social skills)",
      'Ignore the conflict and hope it resolves itself over time',
      'Replace the team leaders without investigation',
    ] as const,
    correctAnswer: 1,
    explanation:
      "This scenario requires the sequential application of Goleman's domains: Self-regulation (managing own frustration about the situation), empathy (genuinely understanding each team's perspective and concerns), social awareness (identifying the underlying causes beyond the surface conflict), and social skills (facilitating dialogue and collaborative problem-solving). Skipping any domain typically leads to superficial or counterproductive interventions.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'Applying EI frameworks',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 35,
    question:
      'Critical analysis of emotional intelligence research has raised several valid concerns. Which of the following is a legitimate critique?',
    options: [
      'EI has no research basis whatsoever',
      'Some EI measures have limited discriminant validity, meaning they overlap significantly with existing personality constructs like the Big Five, raising questions about whether EI is truly a distinct construct',
      'EI research has never been published in peer-reviewed journals',
      'The concept of emotions in the workplace has been completely debunked',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A legitimate academic critique of EI is that some measures, particularly trait-based ones, show significant overlap with established personality dimensions such as agreeableness and neuroticism from the Big Five model. This raises questions about discriminant validity — whether EI is truly a unique construct or a repackaging of existing traits. However, ability-based measures (MSCEIT) show better discriminant validity, and the practical utility of EI frameworks remains well-supported.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'EI critique and validity',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 36,
    question:
      "An electrical contractor is tendering for a major hospital project. How might the organisation's collective emotional intelligence provide a competitive advantage during the bid process?",
    options: [
      'EI is irrelevant to commercial tendering processes',
      'Teams with high collective EI can better understand client concerns, communicate their approach empathetically, build trust during interviews, handle challenging questions with composure, and demonstrate collaborative working relationships — all of which influence bid evaluations',
      'High EI simply means offering the lowest price',
      'Only the bid document quality matters, not the people presenting it',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In modern construction procurement, particularly for complex projects like hospitals, clients evaluate not just price and technical competence but also the quality of relationships and collaboration. Teams with high collective EI demonstrate stronger communication, better understanding of client needs, more effective presentation skills, and greater trustworthiness — all increasingly scored in quality-based bid evaluations. This is a significant competitive differentiator.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'EI competitive advantage',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 37,
    question:
      'How does the Mayer-Salovey-Caruso Emotional Intelligence Test (MSCEIT) differ fundamentally from self-report EI measures?',
    options: [
      'The MSCEIT is shorter and easier to administer',
      'The MSCEIT measures actual ability through performance-based tasks with consensus or expert scoring, while self-report measures assess perceived competence — meaning someone could score high on self-report but low on ability, revealing a self-awareness gap',
      'Self-report measures are always more accurate',
      'The MSCEIT only measures one dimension of EI while self-reports measure all dimensions',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The MSCEIT is an ability-based test that presents actual emotional scenarios and tasks (identifying emotions in faces, predicting emotional outcomes, managing emotional situations) scored against consensus or expert norms. Self-report measures ask people to rate their own competence. The critical difference is that discrepancies between self-report and ability scores can reveal self-awareness blind spots — a person may believe they are highly emotionally intelligent while actually performing poorly on ability tasks.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'MSCEIT vs self-report',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 38,
    question:
      'Research on the "dark side" of emotional intelligence suggests that EI can sometimes be used manipulatively. Which scenario best illustrates this concern?',
    options: [
      'A supervisor using empathy to support a struggling team member',
      "A project manager who understands others' emotions well and deliberately exploits team members' insecurities to maintain control and compliance",
      'A worker who manages their frustration during a difficult conversation',
      'A team leader who uses EI skills to resolve conflicts fairly',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research by scholars including Martin Kilduff has identified a "dark side" of EI where emotionally intelligent individuals use their ability to read and influence others\' emotions for self-serving or manipulative purposes. This is sometimes called "strategic emotional intelligence" or linked to Machiavellianism. It highlights that EI is morally neutral — a skill set that can be used ethically or unethically — and underscores the importance of coupling EI development with ethical frameworks.',
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'Dark side of EI',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 39,
    question:
      'A site engineer with excellent technical skills consistently receives poor 360-degree feedback on interpersonal competencies. Using the concept of EI development, what would be the most evidence-based approach to improvement?',
    options: [
      'Send them on a one-day EI awareness course and consider the matter resolved',
      'Accept that some people simply cannot develop EI and focus only on their technical contributions',
      'Implement a structured programme combining specific feedback, coaching, deliberate practice of targeted competencies, regular reflection, and ongoing support over a sustained period',
      'Transfer them to a role with no interpersonal requirements',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Research on EI development, including Goleman's work and studies of leadership development programmes, consistently shows that lasting EI improvement requires sustained, multi-faceted intervention: specific behavioural feedback (not just awareness), one-to-one coaching, deliberate practice of targeted skills in real situations, structured reflection, and ongoing support over months rather than days. One-off training events typically produce only temporary awareness without lasting behavioural change.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'Evidence-based EI development',
    category: 'Understanding Emotional Intelligence' as const,
  },
  {
    id: 40,
    question:
      "In integrating multiple EI frameworks for a construction organisation's leadership development programme, which approach would be most theoretically sound and practically effective?",
    options: [
      'Choose one model exclusively and ignore all others',
      "Use Salovey-Mayer's ability model for baseline assessment, Goleman's competency framework for identifying development areas, and Bar-On's model for tracking self-perceived progress — leveraging the strengths of each approach",
      'Avoid using any established framework and create an entirely new model from scratch',
      'Only focus on technical competencies since EI frameworks are too complex for construction professionals',
    ] as const,
    correctAnswer: 1,
    explanation:
      "An integrated approach leverages the distinct strengths of each major model: Salovey-Mayer's ability model (via MSCEIT or similar) provides an objective baseline of actual emotional abilities. Goleman's competency framework identifies specific workplace-relevant skills to develop. Bar-On's self-report model tracks perceived progress and self-awareness development. This triangulation provides the most comprehensive and robust approach to EI development.",
    section: 'Understanding Emotional Intelligence',
    difficulty: 'advanced' as const,
    topic: 'Integrating EI frameworks',
    category: 'Understanding Emotional Intelligence' as const,
  },

  // =======================================================================
  // SELF-AWARENESS — 40 questions (id 41–80)
  // =======================================================================

  // ===== BASIC (id 41-56) =====
  {
    id: 41,
    question: 'According to Goleman, which three competencies make up the self-awareness domain?',
    options: [
      'Emotional self-awareness, accurate self-assessment, and self-confidence',
      'Self-control, adaptability, and conscientiousness',
      'Empathy, service orientation, and organisational awareness',
      'Influence, communication, and conflict management',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Goleman identifies three competencies within the self-awareness domain: (1) Emotional self-awareness — recognising your emotions and their effects, (2) Accurate self-assessment — knowing your strengths and limitations, and (3) Self-confidence — a strong sense of your self-worth and capabilities. These form the foundation upon which all other EI competencies are built.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: "Goleman's self-awareness competencies",
    category: 'Self-Awareness' as const,
  },
  {
    id: 42,
    question: 'Lisa Feldman Barrett\'s research on "emotional granularity" refers to:',
    options: [
      'The physical texture of emotions in the brain',
      'The ability to make fine-grained distinctions between similar emotions, such as differentiating irritation from frustration from anger',
      'The rate at which emotions change throughout the day',
      'The total number of emotions a person experiences in a lifetime',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional granularity, a concept developed by Lisa Feldman Barrett, refers to the ability to draw precise distinctions between similar emotional states. People with high emotional granularity can distinguish between feeling irritated, frustrated, and angry, rather than labelling all of these simply as "feeling bad." Research shows that higher emotional granularity leads to more effective emotion regulation and better mental health outcomes.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Emotional granularity (Barrett)',
    category: 'Self-Awareness' as const,
  },
  {
    id: 43,
    question: "Plutchik's Wheel of Emotions organises emotions according to which principle?",
    options: [
      'Alphabetical order',
      'Eight primary emotions arranged in opposing pairs with varying intensities, where combinations create more complex emotions',
      'A simple list of positive and negative emotions',
      'The chronological order in which emotions develop in childhood',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Robert Plutchik's Wheel of Emotions arranges eight primary emotions (joy, trust, fear, surprise, sadness, disgust, anger, anticipation) in opposing pairs (e.g., joy vs. sadness, trust vs. disgust). Each emotion varies in intensity (e.g., annoyance → anger → rage), and combinations of primary emotions create more complex ones (e.g., joy + trust = love). This model is a valuable tool for developing emotional vocabulary.",
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: "Plutchik's wheel",
    category: 'Self-Awareness' as const,
  },
  {
    id: 44,
    question:
      'Which of the following is a common physical signal that someone is experiencing anxiety or stress?',
    options: [
      'Feeling unusually relaxed and calm',
      'Increased heart rate, shallow breathing, muscle tension, or stomach tightness',
      'Improved vision and hearing clarity',
      'A strong desire to sleep deeply',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Anxiety and stress trigger the sympathetic nervous system's fight-or-flight response, producing physical symptoms including increased heart rate, shallow or rapid breathing, muscle tension (particularly in the jaw, shoulders, and back), stomach tightness, and sweating. Recognising these physical signals is a key self-awareness skill that allows early intervention before emotions escalate.",
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Physical signals',
    category: 'Self-Awareness' as const,
  },
  {
    id: 45,
    question: 'The stimulus-thought-emotion-behaviour chain suggests that:',
    options: [
      'Emotions are caused directly by external events with no intermediary process',
      'An external event triggers a thought or interpretation, which generates an emotion, which then drives a behaviour',
      'Behaviours always occur before emotions',
      'Thoughts have no influence on emotional responses',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The stimulus-thought-emotion-behaviour chain illustrates that emotions are not caused directly by events themselves, but by our interpretation of those events. A stimulus (event) triggers a thought (interpretation), which generates an emotion (feeling), which drives a behaviour (action). Understanding this chain is essential for self-awareness because it reveals that we have a choice point at the thought stage where we can reframe our interpretation.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Stimulus-thought-emotion-behaviour chain',
    category: 'Self-Awareness' as const,
  },
  {
    id: 46,
    question:
      'On a construction site, which of the following is most likely to be a common emotional trigger for electricians?',
    options: [
      'Receiving a compliment from the project manager',
      'Being given an unrealistic deadline, discovering previous work needs to be redone, or being publicly criticised in front of colleagues',
      'Having a well-organised material store',
      'Working with clear and accurate drawings',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Common emotional triggers in the electrical trade include unrealistic deadlines, having to redo work due to others' errors (or design changes), public criticism, unclear or incorrect drawings, material shortages, and being asked to compromise on quality or safety. Identifying personal triggers is a fundamental self-awareness skill that enables proactive emotion management.",
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Common triggers',
    category: 'Self-Awareness' as const,
  },
  {
    id: 47,
    question: 'The Johari Window model divides self-knowledge into four quadrants. What are they?',
    options: [
      'Open (Arena), Blind Spot, Hidden (Facade), and Unknown',
      'Conscious, Subconscious, Unconscious, and Preconscious',
      'Past, Present, Future, and Potential',
      'Strengths, Weaknesses, Opportunities, and Threats',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The Johari Window, developed by Joseph Luft and Harrington Ingham, divides self-knowledge into four quadrants: (1) Open/Arena — known to self and others, (2) Blind Spot — known to others but not to self, (3) Hidden/Facade — known to self but not to others, and (4) Unknown — not known to self or others. Expanding the Open area through feedback and self-disclosure is a key self-awareness development strategy.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Johari Window basics',
    category: 'Self-Awareness' as const,
  },
  {
    id: 48,
    question: 'Carol Dweck\'s concept of a "growth mindset" is most accurately described as:',
    options: [
      'The belief that intelligence and abilities are fixed traits that cannot change',
      'The belief that abilities and intelligence can be developed through dedication, hard work, and learning from mistakes',
      'The desire to grow a business as quickly as possible',
      'The tendency to set increasingly ambitious goals without a plan',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Carol Dweck\'s research identifies two mindsets: a "fixed mindset" (believing abilities are innate and unchangeable) and a "growth mindset" (believing abilities can be developed through effort, strategies, and learning). A growth mindset is fundamental to self-awareness development because it encourages viewing challenges and failures as learning opportunities rather than evidence of inadequacy.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Growth mindset basics',
    category: 'Self-Awareness' as const,
  },
  {
    id: 49,
    question: 'Which daily practice is most effective for developing emotional self-awareness?',
    options: [
      'Avoiding all stressful situations',
      'Keeping a brief daily log of emotional states, triggers, and responses to identify patterns over time',
      'Only focusing on positive emotions and ignoring negative ones',
      'Asking others to manage your emotions for you',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research supports that maintaining a daily emotional log — recording emotional states, what triggered them, and how you responded — is one of the most effective self-awareness practices. Over time, patterns emerge that reveal personal triggers, habitual responses, and areas for development. This practice takes only a few minutes daily but builds the habit of emotional reflection that is the cornerstone of self-awareness.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Daily self-awareness practices',
    category: 'Self-Awareness' as const,
  },
  {
    id: 50,
    question: 'What is the primary purpose of emotional self-awareness in the workplace?',
    options: [
      'To eliminate all negative emotions from the work environment',
      'To recognise your emotions as they occur and understand their impact on your thoughts, decisions, and interactions with others',
      'To demonstrate vulnerability to colleagues at all times',
      'To diagnose emotional disorders in co-workers',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional self-awareness in the workplace means recognising your emotions in real time and understanding how they influence your thinking, decision-making, and interactions with others. It is not about eliminating negative emotions (which are natural and informative) but about being conscious of them so they do not unconsciously drive poor decisions or harmful behaviours.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Purpose of self-awareness',
    category: 'Self-Awareness' as const,
  },
  {
    id: 51,
    question: 'Which of the following best describes "emotional vocabulary"?',
    options: [
      'The technical terminology used by psychologists',
      'The range and precision of words a person uses to describe their emotional experiences',
      'The language used in emotional support helplines',
      'A glossary found in psychology textbooks',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional vocabulary refers to the range and precision of words a person can use to describe their emotional experiences. Research shows that people with a broader emotional vocabulary (who can say "I feel apprehensive" rather than just "I feel bad") have better emotional regulation and self-awareness. Expanding emotional vocabulary is a practical step toward improved emotional granularity.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Emotional vocabulary',
    category: 'Self-Awareness' as const,
  },
  {
    id: 52,
    question:
      'In the construction industry, why is recognising personal stress responses particularly important?',
    options: [
      'It is not important — stress is just part of the job',
      'Because unrecognised stress impairs concentration, judgement, and reaction time, increasing the risk of accidents in a high-hazard environment',
      'Because stressed workers are always sent home immediately',
      "Because construction companies are legally required to test workers' stress levels daily",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Construction is a high-hazard industry where impaired concentration, poor judgement, and slower reaction times can have life-threatening consequences. Unrecognised stress directly affects these cognitive functions. Self-awareness of stress responses — physical symptoms, emotional changes, and behavioural patterns — enables early intervention before safety is compromised. This is why EI and self-awareness are critical safety skills, not just soft skills.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Stress recognition in construction',
    category: 'Self-Awareness' as const,
  },
  {
    id: 53,
    question: 'What does "accurate self-assessment" mean as a Goleman EI competency?',
    options: [
      'Always rating yourself as highly competent to maintain confidence',
      'Having an honest understanding of your own strengths and limitations, and being open to learning',
      'Comparing yourself to colleagues to determine your ranking',
      'Taking online personality tests regularly',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Accurate self-assessment, one of Goleman's three self-awareness competencies, involves having an honest, realistic understanding of your strengths and limitations. People with this competency are reflective, learn from experience, welcome constructive feedback, and have a sense of humour about themselves. They know where they need help and actively seek development opportunities.",
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Accurate self-assessment',
    category: 'Self-Awareness' as const,
  },
  {
    id: 54,
    question: 'Which of the following is an example of an internal emotional trigger?',
    options: [
      'A colleague making a critical remark about your work',
      'A recurring negative thought pattern, such as "I\'m not good enough" or "They don\'t respect me"',
      'A sudden loud noise on site',
      'A change in project deadline communicated by the client',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Internal emotional triggers come from within — recurring thought patterns, beliefs, memories, or self-talk. Examples include thoughts like "I\'m not good enough," "They\'re judging me," or "This always happens to me." These internal triggers can be just as powerful as external events in generating emotional responses. Self-awareness involves recognising both internal and external triggers.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Internal triggers',
    category: 'Self-Awareness' as const,
  },
  {
    id: 55,
    question: 'Self-confidence, as an EI competency, is best described as:',
    options: [
      'Believing you are always right and never making mistakes',
      'A strong sense of your self-worth and capabilities, enabling you to express views and make decisions even under pressure',
      'Being the loudest and most assertive person in the room',
      'Never experiencing self-doubt',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Self-confidence as an EI competency means having a strong sense of your self-worth and capabilities. This is not arrogance or the absence of doubt — it is the ability to present yourself with assurance, voice views that may be unpopular, and make sound decisions under pressure. Genuinely self-confident people can acknowledge uncertainty while still acting decisively.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Self-confidence competency',
    category: 'Self-Awareness' as const,
  },
  {
    id: 56,
    question: 'Why is it important to distinguish between primary and secondary emotions?',
    options: [
      'There is no meaningful difference between primary and secondary emotions',
      'Primary emotions are the initial, automatic response (e.g., fear), while secondary emotions are reactions to primary emotions (e.g., anger about feeling afraid), and understanding this distinction helps identify the true source of emotional responses',
      'Primary emotions are more important than secondary ones',
      'Secondary emotions only occur in clinical settings',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Primary emotions are the initial, automatic responses to a stimulus (e.g., feeling afraid when startled). Secondary emotions are emotional reactions to primary emotions (e.g., feeling angry or ashamed about being afraid). Distinguishing between them is crucial for self-awareness because people often respond to secondary emotions without recognising the primary emotion underneath, leading to misdirected coping strategies.',
    section: 'Self-Awareness',
    difficulty: 'basic' as const,
    topic: 'Primary vs secondary emotions',
    category: 'Self-Awareness' as const,
  },

  // ===== INTERMEDIATE (id 57-72) =====
  {
    id: 57,
    question:
      "Albert Ellis's ABC model identifies three components of emotional experience. What do A, B, and C stand for?",
    options: [
      'Action, Behaviour, Consequence',
      'Activating event, Beliefs (about the event), Consequences (emotional and behavioural)',
      'Awareness, Balance, Control',
      'Anxiety, Boredom, Confusion',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Albert Ellis's ABC model from Rational Emotive Behaviour Therapy (REBT) identifies: A = Activating event (what happened), B = Beliefs (how you interpret the event), and C = Consequences (the emotional and behavioural outcomes). The key insight is that B (beliefs) determines C (consequences), not A (the event itself). This means changing beliefs can change emotional responses, which is a powerful self-awareness tool.",
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'ABC model (Ellis)',
    category: 'Self-Awareness' as const,
  },
  {
    id: 58,
    question: 'The SBI feedback model stands for:',
    options: [
      'Strengths, Barriers, Improvements',
      'Situation, Behaviour, Impact',
      'Start, Build, Integrate',
      'Self, Blind spot, Insight',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The SBI (Situation, Behaviour, Impact) feedback model provides a structured framework for giving clear, specific, and non-judgemental feedback. It describes the Situation (when and where), the specific Behaviour observed (what the person did), and the Impact it had (the effect on others or the work). This model enhances self-awareness by providing actionable, observable data rather than vague personality assessments.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'SBI feedback model',
    category: 'Self-Awareness' as const,
  },
  {
    id: 59,
    question: 'The Dunning-Kruger effect describes:',
    options: [
      'The tendency for highly skilled people to overestimate their abilities',
      'A cognitive bias where people with limited knowledge or competence in a domain significantly overestimate their ability, while experts tend to underestimate theirs',
      'The phenomenon where experts become increasingly confident with more experience',
      'A learning technique that accelerates skill acquisition',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Dunning-Kruger effect, identified by David Dunning and Justin Kruger in 1999, describes a cognitive bias where people with limited knowledge or competence in a domain overestimate their ability (they lack the awareness to recognise their incompetence), while highly competent individuals tend to underestimate their relative ability. This has direct relevance to self-awareness — recognising this bias in yourself is an important EI skill.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Dunning-Kruger effect',
    category: 'Self-Awareness' as const,
  },
  {
    id: 60,
    question: "Gibbs' Reflective Cycle contains which six stages?",
    options: [
      'Plan, Do, Check, Act, Review, Repeat',
      'Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan',
      'Observe, Question, Hypothesise, Test, Conclude, Apply',
      'Input, Process, Output, Feedback, Adjustment, Completion',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Gibbs' Reflective Cycle (1988) provides a structured framework for learning from experience through six stages: (1) Description — what happened, (2) Feelings — what you were thinking and feeling, (3) Evaluation — what was good and bad, (4) Analysis — what sense you can make of it, (5) Conclusion — what else you could have done, (6) Action Plan — what you would do next time. This systematic reflection process is a powerful tool for developing self-awareness.",
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Gibbs Reflective Cycle',
    category: 'Self-Awareness' as const,
  },
  {
    id: 61,
    question: 'Body scanning as a self-awareness technique involves:',
    options: [
      'Using a medical scanner to check for physical illness',
      'Systematically directing attention through different parts of the body to notice physical sensations, tension, and areas of discomfort that may indicate emotional states',
      'Having someone else observe your body language',
      'Measuring your heart rate with a fitness tracker',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Body scanning is a mindfulness-based technique where you systematically direct attention through different parts of your body — from head to toe or vice versa — noticing physical sensations without judgement. This practice develops the ability to detect emotional states through their physical manifestations (tight shoulders = stress, clenched jaw = anger, tight chest = anxiety), enhancing the connection between physical awareness and emotional self-awareness.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Body scanning',
    category: 'Self-Awareness' as const,
  },
  {
    id: 62,
    question:
      'Viktor Frankl famously stated: "Between stimulus and response there is a space." How does this relate to emotional intelligence?',
    options: [
      'It means emotions are uncontrollable automatic reactions',
      'It highlights the critical moment of choice between an emotional trigger and our reaction — recognising and expanding this space is a core EI skill that separates reactive from intentional behaviour',
      'It suggests we should ignore all stimuli',
      'It means we should always delay our responses by a fixed amount of time',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Frankl's observation identifies the crucial moment between experiencing a trigger and responding to it. In that space lies the freedom to choose our response rather than react automatically. Developing self-awareness means learning to recognise this space and expand it — through practices like pausing, breathing, and reflecting — so we can respond with intention rather than impulse. This is one of the most practical and powerful concepts in emotional intelligence.",
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Frankl quote',
    category: 'Self-Awareness' as const,
  },
  {
    id: 63,
    question:
      'What is the primary purpose of conducting regular emotional check-ins with yourself throughout the working day?',
    options: [
      'To ensure you are always in a positive emotional state',
      'To build the habit of noticing and naming your current emotional state, catching unhelpful patterns early, and making conscious choices about how to proceed',
      'To avoid all negative interactions with colleagues',
      'To create a written report for your supervisor',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Regular emotional check-ins — briefly pausing to notice and name your current emotional state — serve multiple self-awareness purposes: they build the habit of emotional attunement, catch unhelpful emotional patterns before they escalate, provide data about personal triggers and patterns, and create a moment of choice where you can decide how to proceed. Even a 30-second check-in between tasks can significantly improve emotional self-management.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Emotional check-ins',
    category: 'Self-Awareness' as const,
  },
  {
    id: 64,
    question: 'In the Johari Window, a "blind spot" refers to:',
    options: [
      'Information known to yourself but hidden from others',
      'Aspects of your behaviour and personality that are visible to others but that you are unaware of',
      'Information that neither you nor others are aware of',
      'Information that you and others both know about you',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In the Johari Window, the blind spot quadrant contains aspects of your behaviour, communication style, and personality that others can see but you cannot. For example, a site supervisor might not realise that their tone becomes sharp when under pressure, even though their team clearly notices. Reducing blind spots requires actively seeking and being open to honest feedback from others — one of the most challenging but valuable self-awareness practices.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Blind spots',
    category: 'Self-Awareness' as const,
  },
  {
    id: 65,
    question: 'How does the concept of "meta-cognition" relate to emotional self-awareness?',
    options: [
      'Meta-cognition and emotional self-awareness are unrelated concepts',
      'Meta-cognition — thinking about your own thinking — enables you to observe your emotional responses as they happen, creating a reflective distance that allows conscious choice rather than automatic reaction',
      'Meta-cognition only applies to academic learning, not emotional processes',
      'Meta-cognition means thinking faster than others',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Meta-cognition — the ability to think about your own thinking — is directly linked to emotional self-awareness. It enables a person to step back and observe their emotional responses as they occur, creating a reflective distance. Instead of being "in" the emotion (e.g., "I am angry"), meta-cognition allows you to observe the emotion (e.g., "I notice I\'m feeling anger"). This observer perspective is fundamental to self-awareness and creates the space for conscious emotional management.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Meta-cognition',
    category: 'Self-Awareness' as const,
  },
  {
    id: 66,
    question:
      'An electrician notices that they consistently feel defensive when receiving feedback from the main contractor\'s project manager. Using the ABC model, which "B" (belief) might be driving this reaction?',
    options: [
      'The belief that feedback is a normal part of project coordination',
      'An underlying belief such as "They think I\'m incompetent" or "They are always looking for someone to blame"',
      'The belief that the project is going well',
      'A belief that they should seek more feedback to improve',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Using Ellis\'s ABC model: A (activating event) = receiving feedback, B (belief) = "They think I\'m incompetent" or "They\'re always looking for blame," C (consequence) = defensive emotional and behavioural response. Identifying the belief (B) is the key self-awareness skill because it reveals that the defensive reaction stems from an interpretation, not the feedback itself. Challenging and reframing this belief can change the emotional response.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'ABC model application',
    category: 'Self-Awareness' as const,
  },
  {
    id: 67,
    question:
      'What is the difference between "emotional suppression" and "emotional awareness" as approaches to managing emotions?',
    options: [
      'They are the same thing with different names',
      'Emotional suppression involves pushing down or denying emotions (which research shows increases physiological stress), while emotional awareness involves acknowledging and understanding emotions without being controlled by them',
      'Emotional awareness is less effective than suppression in professional settings',
      'Emotional suppression is the recommended approach in the construction industry',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research by James Gross and others has demonstrated that emotional suppression — pushing down or denying emotions — actually increases physiological stress responses and impairs memory and cognitive function. Emotional awareness, by contrast, involves acknowledging emotions as valid information without being overwhelmed by them. In the construction industry, where a "tough it out" culture often promotes suppression, understanding this distinction is critical for both mental health and effective self-awareness.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Suppression vs awareness',
    category: 'Self-Awareness' as const,
  },
  {
    id: 68,
    question:
      'How can an electrician use the "feelings wheel" (an expansion of Plutchik\'s model) to improve their emotional self-awareness?',
    options: [
      'By memorising every word on the wheel for an examination',
      'By using it as a reference tool to identify and name their emotions with greater precision, moving from vague descriptions like "bad" to specific terms like "overwhelmed," "frustrated," or "disappointed"',
      'By displaying it in the site office for decoration',
      'By using it to diagnose emotional disorders in colleagues',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The feelings wheel is a practical tool for developing emotional granularity. When someone notices they feel "bad," the wheel helps them identify whether "bad" is actually frustrated, overwhelmed, disappointed, resentful, anxious, or something else. This precision matters because each specific emotion suggests different causes and different effective responses. Regular use of the wheel builds the habit of precise emotional identification.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Feelings wheel application',
    category: 'Self-Awareness' as const,
  },
  {
    id: 69,
    question:
      'Research on self-awareness suggests that there are two distinct types: internal self-awareness and external self-awareness. What is the difference?',
    options: [
      "Internal means knowing your emotions; external means controlling other people's emotions",
      'Internal self-awareness is how clearly you understand your own values, feelings, and impact, while external self-awareness is how accurately you understand how others perceive you',
      'Internal self-awareness relates to physical health; external relates to social media presence',
      'They are the same concept described from different perspectives',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research by Tasha Eurich identifies two distinct types of self-awareness: Internal self-awareness (understanding your own values, passions, aspirations, fit with environment, reactions, and impact on others) and External self-awareness (understanding how other people view you in terms of those same factors). Importantly, these two types are not correlated — being high in one does not guarantee being high in the other. Effective self-awareness requires developing both.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Internal vs external self-awareness',
    category: 'Self-Awareness' as const,
  },
  {
    id: 70,
    question: 'What is a "values-behaviour gap" and why is it relevant to self-awareness?',
    options: [
      'The gap between what a person earns and what they spend',
      'The discrepancy between the values a person claims to hold and how they actually behave, which reveals areas where self-awareness is incomplete or self-deception is occurring',
      'The difference between company values and individual values',
      'A training gap identified through performance reviews',
    ] as const,
    correctAnswer: 1,
    explanation:
      "A values-behaviour gap is the discrepancy between a person's stated values and their actual behaviour. For example, someone who values respect but regularly interrupts others has a values-behaviour gap. Identifying these gaps is a powerful self-awareness exercise because they reveal areas of unconscious behaviour or self-deception. In construction, a supervisor who values safety but routinely cuts corners under pressure has a significant values-behaviour gap.",
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Values-behaviour gap',
    category: 'Self-Awareness' as const,
  },
  {
    id: 71,
    question: 'How does "confirmation bias" affect emotional self-awareness?',
    options: [
      'Confirmation bias has no effect on emotional self-awareness',
      'It causes people to selectively notice and remember information that confirms their existing emotional beliefs while ignoring contradictory evidence, creating a distorted self-picture',
      'It makes people more accurate in their emotional assessments',
      'It only affects decisions about technical matters, not emotions',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Confirmation bias — the tendency to seek, interpret, and remember information that confirms pre-existing beliefs — significantly distorts emotional self-awareness. A person who believes "my team doesn\'t respect me" will selectively notice evidence that supports this belief while ignoring evidence to the contrary. This creates a self-reinforcing cycle of distorted emotional interpretation. Recognising confirmation bias in your own emotional reasoning is an advanced self-awareness skill.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Confirmation bias',
    category: 'Self-Awareness' as const,
  },
  {
    id: 72,
    question:
      'A foreman uses Gibbs\' Reflective Cycle after losing their temper with a subcontractor. At the "Analysis" stage, they should:',
    options: [
      'Simply repeat what happened again in more detail',
      'Explore why events occurred as they did, examining what knowledge, assumptions, and emotional triggers influenced the situation, and connecting the experience to broader patterns or theories',
      'Decide what action to take next without further reflection',
      "Only focus on the other person's faults in the situation",
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Analysis stage of Gibbs\' Reflective Cycle goes deeper than the Evaluation stage by asking "why." It involves exploring the underlying causes: What triggered the emotional response? What assumptions were at play? Were there past experiences or patterns influencing the reaction? How does this connect to known EI concepts like amygdala hijack or confirmation bias? This deeper analysis is where the most valuable self-awareness insights emerge.',
    section: 'Self-Awareness',
    difficulty: 'intermediate' as const,
    topic: 'Gibbs analysis stage',
    category: 'Self-Awareness' as const,
  },

  // ===== ADVANCED (id 73-80) =====
  {
    id: 73,
    question:
      'A senior electrician consistently receives feedback that they are perceived as unapproachable, despite believing themselves to be friendly and open. Using the Johari Window framework, which quadrant does this discrepancy sit in, and what is the most effective strategy to address it?',
    options: [
      'The Hidden quadrant — they should share more personal information with colleagues',
      'The Blind Spot quadrant — they should actively seek specific behavioural feedback to understand exactly what behaviours are creating the perception, then work on modifying those behaviours',
      'The Unknown quadrant — there is nothing that can be done about it',
      'The Open quadrant — the feedback is simply wrong and should be dismissed',
    ] as const,
    correctAnswer: 1,
    explanation:
      "This sits in the Blind Spot quadrant — others can see something the electrician cannot. The most effective strategy involves: (1) Accepting the feedback as valid data about others' perceptions, (2) Asking for specific examples of behaviours that create the unapproachable impression (e.g., closed body language, short responses, not making eye contact), (3) Working to modify those specific behaviours, and (4) Seeking follow-up feedback to check progress. This process moves information from the Blind Spot into the Open quadrant.",
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Johari Window in team settings',
    category: 'Self-Awareness' as const,
  },
  {
    id: 74,
    question:
      'Research by Tasha Eurich found that most people believe they are self-aware, but only a small percentage actually are. According to her research, approximately what percentage of people who think they are self-aware actually meet the criteria?',
    options: ['About 80%', 'About 50%', 'About 10-15%', 'About 30%'] as const,
    correctAnswer: 2,
    explanation:
      'Tasha Eurich\'s extensive research, involving thousands of participants across multiple studies, found that while 95% of people believe they are self-aware, only about 10-15% actually meet the criteria for genuine self-awareness. This "self-awareness gap" is one of the most significant findings in EI research and highlights the Dunning-Kruger-like effect that operates in the emotional domain — the very people who most need to develop self-awareness are least likely to recognise this need.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Self-assessment accuracy',
    category: 'Self-Awareness' as const,
  },
  {
    id: 75,
    question:
      'An electrical project manager prides themselves on making purely rational, emotion-free decisions. From an EI perspective, what is problematic about this approach?',
    options: [
      'Nothing — emotion-free decision-making is the gold standard',
      'Neuroscience research (including Antonio Damasio\'s "somatic marker hypothesis") demonstrates that emotions are essential to effective decision-making, and people who believe they are making purely rational decisions are simply unaware of the emotional influences operating below conscious awareness',
      'Emotional decisions are always better than rational ones',
      'It is only problematic if the decisions turn out to be wrong',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Antonio Damasio\'s research on patients with damage to emotion-processing brain regions showed that without emotional input, people make poorer decisions, not better ones. His "somatic marker hypothesis" demonstrates that emotions provide crucial information that guides decision-making. A project manager who believes they make emotion-free decisions lacks self-awareness of the emotional influences that are inevitably present, potentially leading to blind spots in their decision-making process.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Emotions in decision-making',
    category: 'Self-Awareness' as const,
  },
  {
    id: 76,
    question:
      'How might the concept of "alexithymia" — difficulty identifying and describing one\'s own emotions — present challenges in a construction workplace?',
    options: [
      'It would have no workplace impact since construction does not require emotional skills',
      'Workers with alexithymic traits may struggle to recognise their own stress, fatigue, or frustration until these states become severe, potentially leading to safety risks, interpersonal conflicts, and burnout without early warning signs',
      'It would only affect office-based workers, not those on site',
      'Alexithymia is a rare clinical condition that does not affect the general workforce',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Alexithymia — difficulty identifying and describing emotions — exists on a spectrum, with studies suggesting 10-13% of the general population show significant alexithymic traits. In construction, where emotional awareness is already challenged by cultural norms around toughness, workers with alexithymic traits may not recognise their stress, frustration, or emotional exhaustion until these states are severe. This delayed recognition bypasses the early intervention window, increasing risks for safety incidents, interpersonal blow-ups, and burnout.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Alexithymia in the workplace',
    category: 'Self-Awareness' as const,
  },
  {
    id: 77,
    question:
      "A construction team leader uses multiple self-awareness frameworks (Johari Window, ABC model, Gibbs' Cycle, and body scanning) in their practice. In what sequence would these tools be most effectively applied after a difficult incident?",
    options: [
      'The sequence does not matter — all tools should be used simultaneously',
      "Body scanning first (immediate physical awareness) → ABC model (identifying triggering beliefs) → Gibbs' Reflective Cycle (structured reflection on the full incident) → Johari Window (seeking external feedback to identify blind spots)",
      'Johari Window first → then all others in any order',
      'ABC model only — the other tools are redundant',
    ] as const,
    correctAnswer: 1,
    explanation:
      "An effective sequence after an incident would be: (1) Body scanning first — to ground yourself in the present moment and identify the physical emotional state (e.g., noticing racing heart, tense shoulders), (2) ABC model — to identify what beliefs drove the emotional reaction, creating initial cognitive awareness, (3) Gibbs' Reflective Cycle — for a comprehensive structured reflection covering description, feelings, evaluation, analysis, conclusion, and action plan, (4) Johari Window — seeking feedback from others who witnessed the incident to uncover blind spots. This sequence moves from immediate physical awareness through cognitive analysis to external perspective-gathering.",
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Integrating multiple frameworks',
    category: 'Self-Awareness' as const,
  },
  {
    id: 78,
    question:
      'Research suggests that the practice of "self-distancing" — referring to yourself in the third person when reflecting on emotional experiences — can enhance self-awareness. Why might this be effective?',
    options: [
      'It has no proven effectiveness',
      "Third-person self-talk creates psychological distance from the emotion, activating more of the prefrontal cortex's analytical capacity and reducing the amygdala's emotional intensity, allowing for more objective self-reflection",
      'It makes the person feel like someone else is dealing with the problem',
      "It is a way of avoiding responsibility for one's emotions",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research by Ethan Kross and colleagues has demonstrated that self-distancing (e.g., thinking "Andrew is feeling frustrated" rather than "I am frustrated") activates more of the prefrontal cortex\'s analytical processing and reduces amygdala-driven emotional intensity. This creates a more objective, observer-like perspective on one\'s own emotions, enhancing the quality of self-reflection. It is not avoidance — it is a neuroscience-supported technique for achieving greater emotional clarity.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Self-distancing technique',
    category: 'Self-Awareness' as const,
  },
  {
    id: 79,
    question:
      'An apprentice electrician has strong internal self-awareness (they understand their own values and emotional patterns well) but weak external self-awareness (they do not understand how others perceive them). What specific risks does this imbalance create?',
    options: [
      'No significant risks — internal self-awareness is all that matters',
      'They may unintentionally alienate colleagues, miss important social cues, fail to adapt their communication style to different audiences, and receive repeated negative feedback they cannot understand or act upon',
      'They will automatically develop external self-awareness over time without any intervention',
      'The imbalance only matters in management positions, not for apprentices',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The internal-external self-awareness imbalance creates specific risks: the person knows who they are and what they feel but does not understand the impact they have on others. This can lead to unintentional relationship damage, missed social cues, inflexible communication, and a pattern of receiving critical feedback that feels inexplicable. For an apprentice, this imbalance can hinder their professional development and damage crucial mentoring relationships. Targeted feedback-seeking and perspective-taking exercises are needed to develop the external dimension.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Self-awareness imbalance',
    category: 'Self-Awareness' as const,
  },
  {
    id: 80,
    question:
      'How might cultural norms within the UK construction industry specifically hinder the development of emotional self-awareness among workers?',
    options: [
      'Cultural norms have no effect on self-awareness development',
      'Prevailing "tough it out" and "leave feelings at the gate" cultures actively discourage emotional expression and reflection, creating an environment where acknowledging emotions is seen as weakness, which drives emotional suppression, reduces help-seeking, and increases the risk of unrecognised mental health deterioration',
      'UK construction culture is already fully supportive of emotional awareness',
      'Cultural barriers only exist in other industries, not construction',
    ] as const,
    correctAnswer: 1,
    explanation:
      'UK construction industry culture has historically promoted stoicism and emotional suppression through norms like "man up," "tough it out," and "leave your problems at the gate." Research shows these cultural norms actively discourage the emotional reflection and expression that are essential for self-awareness development. Workers who internalise these norms may suppress rather than acknowledge emotional states, reducing their ability to recognise stress, seek help, or develop EI. Initiatives like Mates in Mind are working to shift these cultural norms, but change is gradual.',
    section: 'Self-Awareness',
    difficulty: 'advanced' as const,
    topic: 'Cultural barriers to self-awareness',
    category: 'Self-Awareness' as const,
  },

  // =======================================================================
  // SELF-REGULATION — first 20 questions (id 81–100)
  // =======================================================================

  // ===== BASIC (id 81-96) =====
  {
    id: 81,
    question: 'According to Goleman, which five competencies make up the self-regulation domain?',
    options: [
      'Self-control, trustworthiness, conscientiousness, adaptability, and innovation',
      'Emotional awareness, self-confidence, and accurate self-assessment',
      'Achievement drive, commitment, initiative, and optimism',
      'Empathy, service orientation, political awareness, and developing others',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Goleman's self-regulation domain contains five competencies: (1) Self-control — managing disruptive emotions and impulses, (2) Trustworthiness — maintaining honesty and integrity, (3) Conscientiousness — taking responsibility for personal performance, (4) Adaptability — flexibility in handling change, and (5) Innovation — being comfortable with novel ideas and approaches. Together, these enable a person to manage their internal states effectively.",
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: "Goleman's self-regulation competencies",
    category: 'Self-Regulation' as const,
  },
  {
    id: 82,
    question: 'What is the key difference between emotional suppression and emotional regulation?',
    options: [
      'There is no difference — they are the same thing',
      'Suppression involves pushing emotions down and pretending they do not exist, while regulation involves acknowledging emotions and choosing constructive ways to express or manage them',
      'Regulation means never experiencing negative emotions',
      'Suppression is healthier because it prevents emotional outbursts',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional suppression involves trying to push emotions down, deny them, or pretend they do not exist — research by James Gross shows this actually increases physiological stress and impairs cognitive function. Emotional regulation, by contrast, involves acknowledging emotions as valid, understanding their message, and choosing constructive ways to respond. Regulation does not mean eliminating emotions; it means managing how and when they are expressed.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Suppression vs regulation',
    category: 'Self-Regulation' as const,
  },
  {
    id: 83,
    question:
      'What is the "box breathing" technique and when might it be used on a construction site?',
    options: [
      'A technique involving breathing into a box-shaped bag',
      'A four-step breathing pattern (inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts) that activates the parasympathetic nervous system to reduce stress and restore calm',
      'A technique only used by competitive athletes',
      'A medical procedure that requires professional supervision',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Box breathing (also called square breathing) involves four equal phases: inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. This pattern activates the parasympathetic nervous system, which counteracts the stress response. On a construction site, it can be used discreetly when feeling stressed, angry, or overwhelmed — for example, before responding to a difficult conversation, after a near-miss incident, or during a challenging task. It requires no equipment and takes less than a minute.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Box breathing',
    category: 'Self-Regulation' as const,
  },
  {
    id: 84,
    question: 'Jill Bolte Taylor\'s "90-second rule" states that:',
    options: [
      'All emotions last exactly 90 seconds regardless of the situation',
      'The initial neurochemical response of an emotion surges and then dissipates within approximately 90 seconds — any emotional experience lasting longer is being sustained by our own thoughts and self-talk',
      'You should wait 90 seconds before expressing any emotion',
      'It takes 90 seconds for the brain to process a new emotion',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Neuroscientist Jill Bolte Taylor observed that the initial chemical cascade triggered by an emotion lasts approximately 90 seconds. After that, any continuing emotional experience is being sustained by our own thought patterns and self-talk — essentially, we are choosing to re-stimulate the emotion. This insight is powerful for self-regulation because it means that if you can observe the initial surge without fuelling it with repetitive thoughts, the intensity will naturally subside.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: '90-second rule (Jill Bolte Taylor)',
    category: 'Self-Regulation' as const,
  },
  {
    id: 85,
    question: 'The STOP technique for emotional regulation stands for:',
    options: [
      'Shout, Think, Overreact, Panic',
      'Stop, Take a breath, Observe what you are feeling, Proceed with awareness',
      'Suppress, Tolerate, Overcome, Push through',
      'Sit down, Talk to someone, Open up, Plan ahead',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The STOP technique is a simple, practical self-regulation tool: S = Stop what you are doing, T = Take a breath (activating the parasympathetic nervous system), O = Observe what you are feeling and thinking without judgement, P = Proceed with awareness and intention. It creates the pause between stimulus and response that Viktor Frankl described, and it can be used discreetly in any situation — including on a busy construction site.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'STOP technique',
    category: 'Self-Regulation' as const,
  },
  {
    id: 86,
    question: 'The 10-10-10 rule for emotional decision-making asks you to consider:',
    options: [
      'The cost of a decision in 10 pounds, 10 hundred pounds, and 10 thousand pounds',
      'How you will feel about this decision in 10 minutes, 10 months, and 10 years',
      'Whether 10 colleagues, 10 managers, and 10 clients would agree with the decision',
      'Taking 10 seconds, 10 minutes, and 10 hours to think before acting',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The 10-10-10 rule, developed by Suzy Welch, is a self-regulation tool that creates emotional perspective by asking: "How will I feel about this decision in 10 minutes? In 10 months? In 10 years?" This temporal distancing technique helps counteract the intensity of immediate emotional reactions by placing the situation in a broader time context. It is particularly useful when anger or frustration is pushing toward a reactive decision.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: '10-10-10 rule',
    category: 'Self-Regulation' as const,
  },
  {
    id: 87,
    question: 'What is "cognitive reappraisal" in the context of emotional regulation?',
    options: [
      'Denying that an emotional situation exists',
      'Changing the way you think about or interpret a situation in order to alter its emotional impact',
      'Repeating positive affirmations until you feel better',
      'Asking someone else to explain how you should feel about a situation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Cognitive reappraisal is one of the most effective emotion regulation strategies identified by research. It involves deliberately changing how you interpret or think about a situation to alter its emotional impact. For example, reappraising critical feedback from "They are attacking me" to "They are giving me information I can use to improve" changes the emotional response from defensiveness to openness. Research by James Gross shows reappraisal is significantly more effective than suppression.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Cognitive reappraisal basics',
    category: 'Self-Regulation' as const,
  },
  {
    id: 88,
    question:
      'Which of the following is an example of healthy emotional regulation on a construction site?',
    options: [
      'Shouting at a colleague who made a wiring error',
      'Noticing your frustration about a programme delay, taking a moment to breathe, then calmly discussing the issue and possible solutions with the team',
      'Bottling up your anger about repeated delays and pretending everything is fine',
      'Leaving site without telling anyone because you feel overwhelmed',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Healthy emotional regulation involves: (1) Noticing the emotion (self-awareness of frustration), (2) Using a regulation technique (taking a moment to breathe), (3) Choosing a constructive response (calm discussion of the issue), and (4) Directing toward a productive outcome (exploring solutions). Shouting is an unregulated expression, bottling up is suppression, and leaving without communicating is avoidance — none of which are effective regulation strategies.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Healthy regulation example',
    category: 'Self-Regulation' as const,
  },
  {
    id: 89,
    question: 'Why is sleep particularly important for emotional regulation?',
    options: [
      'Sleep has no significant impact on emotional regulation',
      "Sleep deprivation impairs prefrontal cortex function, reducing the brain's ability to regulate emotional responses from the amygdala, leading to increased emotional reactivity and poorer self-control",
      'Sleep only affects physical energy, not emotions',
      'Sleeping more than 6 hours per night actually hinders emotional regulation',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Neuroscience research consistently demonstrates that sleep deprivation significantly impairs prefrontal cortex function — the brain region responsible for rational thinking and emotional regulation. When sleep-deprived, the amygdala becomes more reactive while the prefrontal cortex's moderating influence weakens, resulting in greater emotional reactivity, poorer impulse control, and reduced decision-making quality. In the construction industry, where early starts and long hours are common, understanding this link between sleep and emotional regulation is critical for safety.",
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Sleep and regulation',
    category: 'Self-Regulation' as const,
  },
  {
    id: 90,
    question: 'The concept of "emotional flooding" describes:',
    options: [
      'A therapeutic technique for treating phobias',
      'A state where emotions become so intense that rational thinking is temporarily overwhelmed, often leading to reactive behaviour or complete shutdown',
      'The normal process of experiencing multiple emotions throughout a day',
      'A method of deliberately intensifying emotions to build resilience',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Emotional flooding occurs when the intensity of emotional arousal exceeds a person's capacity to process and manage it. The amygdala essentially overwhelms the prefrontal cortex, leading to a state where rational thinking is temporarily compromised. Signs include racing heart, inability to think clearly, tunnel vision, and either explosive reactivity or complete shutdown. Recognising the early signs of flooding and using regulation techniques before reaching this point is a key self-regulation skill.",
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Emotional flooding',
    category: 'Self-Regulation' as const,
  },
  {
    id: 91,
    question:
      'What does "adaptability" mean as a self-regulation competency in Goleman\'s framework?',
    options: [
      'Agreeing with everyone to avoid conflict',
      'Flexibility in handling change, being able to adjust your emotional responses and approach when circumstances shift unexpectedly',
      'Changing your personality to fit different situations',
      'Adapting your work to the lowest standard acceptable',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Adaptability as a Goleman self-regulation competency refers to flexibility in handling change. It means being able to adjust your emotional responses, thinking, and approach when circumstances shift. Adaptable people manage the emotional discomfort of uncertainty and change rather than rigidly clinging to plans or becoming emotionally destabilised. In construction, where programmes, specifications, and conditions change frequently, adaptability is essential for maintaining effectiveness and wellbeing.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Adaptability competency',
    category: 'Self-Regulation' as const,
  },
  {
    id: 92,
    question: 'Which of the following best describes "impulse control" as a self-regulation skill?',
    options: [
      'Never acting on any impulse under any circumstances',
      'The ability to resist or delay an immediate emotional urge in order to consider consequences and choose a more constructive response',
      'Suppressing all emotional reactions permanently',
      'Always doing the opposite of what you feel like doing',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Impulse control is the ability to resist or delay acting on an immediate emotional urge, creating space to consider consequences and choose a more constructive response. It does not mean never acting on impulses or suppressing all emotional reactions — it means having the capacity to pause and choose rather than being driven by automatic reactive patterns. This is particularly important in high-pressure construction environments where impulsive reactions can have serious safety and relationship consequences.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Impulse control',
    category: 'Self-Regulation' as const,
  },
  {
    id: 93,
    question: 'How does physical exercise support emotional regulation?',
    options: [
      'Physical exercise has no documented effect on emotional regulation',
      'Exercise reduces cortisol (stress hormone) levels, releases endorphins, improves prefrontal cortex function, and provides a healthy outlet for physical tension associated with strong emotions',
      'Exercise only benefits physical health and has no psychological effects',
      'Exercise is only beneficial if done for more than two hours daily',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research extensively documents the benefits of physical exercise for emotional regulation: it reduces cortisol (the primary stress hormone), stimulates endorphin release (natural mood enhancers), improves prefrontal cortex function (enhancing rational thinking), and provides a constructive outlet for the physical energy and tension that accumulate with strong emotions. Even moderate exercise like a brisk 20-minute walk can measurably improve emotional regulation capacity.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Exercise and regulation',
    category: 'Self-Regulation' as const,
  },
  {
    id: 94,
    question: 'What is "trustworthiness" as a self-regulation competency?',
    options: [
      'Never questioning authority or organisational decisions',
      'Maintaining standards of honesty and integrity, being consistent between what you say and what you do, and acknowledging your own mistakes',
      'Trusting everyone you work with without question',
      'Keeping secrets for colleagues regardless of the consequences',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Trustworthiness as a Goleman self-regulation competency involves maintaining honesty and integrity, acting ethically even when it is difficult, building trust through reliability and consistency between words and actions, and being willing to acknowledge mistakes and confront unethical actions in others. In construction, where safety and compliance depend on honest reporting, this competency is fundamental.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Trustworthiness competency',
    category: 'Self-Regulation' as const,
  },
  {
    id: 95,
    question:
      'A site electrician feels intense frustration when they discover that plasterboard has been installed over cable routes before first fix was completed. Which self-regulation technique would be most appropriate as an immediate response?',
    options: [
      'Immediately confront the plasterer and express their anger forcefully',
      'Use the STOP technique: Stop, Take a breath, Observe the frustration without acting on it, then Proceed by calmly raising the issue through the appropriate site coordination process',
      'Pretend the problem does not exist and work around it',
      'Leave site without saying anything',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The STOP technique is ideal for this common construction scenario: Stop (pause before reacting), Take a breath (activate the calming parasympathetic response), Observe (notice the frustration and recognise it as understandable but not helpful if acted on impulsively), Proceed (address the issue through proper channels — speaking to the site foreman or raising it at the coordination meeting). This approach resolves the practical problem while maintaining professional relationships.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'STOP technique application',
    category: 'Self-Regulation' as const,
  },
  {
    id: 96,
    question: 'What role does "self-talk" play in emotional regulation?',
    options: [
      'Self-talk has no influence on emotions',
      'The internal dialogue we maintain with ourselves directly influences our emotional state — negative self-talk can escalate emotions while constructive self-talk can help regulate them',
      'Only positive self-talk is acceptable; all other self-talk is harmful',
      'Self-talk is a sign of poor mental health',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Self-talk — the ongoing internal dialogue we maintain — has a direct and powerful influence on emotional regulation. Negative self-talk (e.g., "This is a disaster, I cannot cope") escalates emotional arousal and sustains the stress response beyond the initial 90-second chemical cascade. Constructive self-talk (e.g., "This is frustrating, but I have dealt with similar situations before") helps regulate emotions by providing perspective and activating the prefrontal cortex. Learning to notice and redirect unhelpful self-talk is a core regulation skill.',
    section: 'Self-Regulation',
    difficulty: 'basic' as const,
    topic: 'Self-talk and regulation',
    category: 'Self-Regulation' as const,
  },

  // ===== INTERMEDIATE (id 97-100) =====
  {
    id: 97,
    question:
      "James Gross's process model of emotion regulation identifies five families of regulation strategies. Which strategy involves changing the situation itself before the emotion fully develops?",
    options: [
      'Response modulation — changing the emotional response after it has occurred',
      'Situation modification — actively changing aspects of the situation to alter its emotional impact before the full emotional response develops',
      'Attentional deployment — redirecting attention away from the situation',
      'Cognitive change — reinterpreting the meaning of the situation',
    ] as const,
    correctAnswer: 1,
    explanation:
      "James Gross's process model identifies five strategy families in temporal order: (1) Situation selection (choosing whether to enter a situation), (2) Situation modification (changing the situation to alter its emotional impact), (3) Attentional deployment (redirecting attention), (4) Cognitive change (reappraising the situation), and (5) Response modulation (changing the response after the emotion arises). Situation modification is proactive — it changes the circumstances before a full emotional response develops. For example, a supervisor might rearrange task assignments to prevent a known personality clash.",
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'James Gross strategies',
    category: 'Self-Regulation' as const,
  },
  {
    id: 98,
    question:
      'The Kubler-Ross Change Curve describes emotional responses to significant change. What is the typical sequence of emotional stages?',
    options: [
      'Acceptance → Anger → Bargaining → Denial → Depression',
      'Denial → Anger → Bargaining → Depression → Acceptance',
      'Anger → Acceptance → Denial → Depression → Bargaining',
      'Depression → Denial → Bargaining → Anger → Acceptance',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Kubler-Ross Change Curve, originally developed in the context of grief but widely applied to organisational change, identifies five stages: Denial ("This is not happening"), Anger ("Why is this happening?"), Bargaining ("Maybe if we..."), Depression ("I cannot see how this will work"), and Acceptance ("Let\'s make this work"). Understanding this model helps with self-regulation during periods of change on site — recognising which stage you are in normalises the emotional experience and enables more constructive responses.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Kubler-Ross Change Curve',
    category: 'Self-Regulation' as const,
  },
  {
    id: 99,
    question:
      'Walter Mischel\'s "marshmallow experiment" demonstrated the long-term importance of which self-regulation skill?',
    options: [
      'The ability to express emotions freely',
      'Delayed gratification — the ability to resist an immediate reward in favour of a larger future benefit, which predicted better life outcomes decades later',
      'The importance of sugar consumption for brain function',
      'The ability to make quick decisions under pressure',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Walter Mischel's Stanford marshmallow experiment (1960s-1970s) offered children one marshmallow immediately or two marshmallows if they could wait 15 minutes. Follow-up studies decades later found that children who demonstrated greater delayed gratification had better academic outcomes, healthier relationships, lower substance abuse, and better stress management as adults. This highlights that self-regulation — specifically, the ability to manage impulses for long-term benefit — is a foundational life skill with far-reaching consequences.",
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Marshmallow experiment implications',
    category: 'Self-Regulation' as const,
  },
  {
    id: 100,
    question:
      'The Trust Equation (developed by David Maister) states that Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. How does this relate to the self-regulation competency of trustworthiness?',
    options: [
      'The Trust Equation is unrelated to emotional intelligence',
      'Self-regulation directly affects all four components: managing emotions maintains credibility, consistent behaviour builds reliability, emotional openness creates intimacy, and regulating self-interest reduces self-orientation — all of which build trust',
      'Only the "reliability" component is related to self-regulation',
      'The equation shows that trust is purely a mathematical calculation with no emotional component',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Trust Equation provides a practical framework connecting self-regulation to trust: Credibility is maintained by regulating emotional outbursts that damage professional reputation. Reliability is built through consistent, emotionally regulated behaviour over time. Intimacy (closeness/safety) develops when a person is emotionally open and regulated enough to be safe to confide in. Self-Orientation (the denominator) is kept low by regulating self-serving impulses. This demonstrates how self-regulation is the behavioural foundation of trustworthiness.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Trust Equation basics',
    category: 'Self-Regulation' as const,
  },

  // -------------------------------------------------------------------------
  // Self-Regulation CONTINUED — Intermediate (101-112) & Advanced (113-120)
  // -------------------------------------------------------------------------
  {
    id: 101,
    question:
      'Acceptance and Commitment Therapy (ACT) promotes psychological flexibility — the ability to stay in contact with the present moment and change or persist in behaviour that serves valued ends. How does psychological flexibility relate to self-regulation on a construction site?',
    options: [
      'Psychological flexibility means agreeing with every instruction without question',
      'It enables a worker to notice frustration when plans change (e.g., a cable route is blocked), accept the emotion without being controlled by it, and redirect effort toward the project goal — which is the essence of adaptive self-regulation',
      'Psychological flexibility only applies in therapy settings, not workplaces',
      'It means being physically flexible enough to work in confined spaces',
    ] as const,
    correctAnswer: 1,
    explanation:
      "ACT's psychological flexibility model (Hayes, Strosahl & Wilson) maps directly onto workplace self-regulation. The six core processes — present-moment awareness, acceptance, cognitive defusion, self-as-context, values, and committed action — help workers respond adaptively rather than reactively when site conditions change unexpectedly.",
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Psychological flexibility (ACT)',
    category: 'Self-Regulation' as const,
  },
  {
    id: 102,
    question:
      "Carol Dweck's growth mindset research distinguishes between fixed and growth mindsets. When BS 7671 is amended (e.g., Amendment 3:2024 adding Regulation 530.3.201), how would a growth mindset support self-regulation?",
    options: [
      'A growth mindset person would ignore the amendment because they already know enough',
      'A growth mindset person would see the amendment as a threat to their existing competence and react defensively',
      'A growth mindset person would view the amendment as an opportunity to learn, regulate any frustration about having to update their knowledge, and approach the new material with curiosity rather than resistance',
      'Growth mindset has no connection to how people handle regulatory changes',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Dweck's research shows that people with a growth mindset interpret challenges as learning opportunities rather than threats. When regulations change, growth-minded electricians regulate the natural resistance to change (a self-regulation skill) and engage with new material proactively. This contrasts with a fixed mindset, which might trigger defensive reactions and avoidance.",
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Growth mindset and change',
    category: 'Self-Regulation' as const,
  },
  {
    id: 103,
    question:
      'Digital impulse control is an increasingly important aspect of self-regulation. Which scenario best demonstrates poor digital impulse control in a construction context?',
    options: [
      'Waiting until break time to check personal messages',
      'Immediately posting a frustrated rant about a client on social media after a disagreement on site, without considering the professional consequences',
      'Drafting an email response and reviewing it before sending',
      'Turning off phone notifications during safety-critical work',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Digital impulse control involves regulating the urge to react immediately through digital channels. Posting a frustrated rant about a client demonstrates failure to pause between stimulus (frustration) and response (posting). The consequences can include disciplinary action, client loss, and reputational damage. The other options all demonstrate good digital self-regulation.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Digital impulse control',
    category: 'Self-Regulation' as const,
  },
  {
    id: 104,
    question:
      'Research shows that cortisol (the stress hormone) takes approximately 20-60 minutes to return to baseline after an acute stress response. How should this "cortisol cooldown period" inform self-regulation strategy on site?',
    options: [
      'It is irrelevant because stress hormones do not affect decision-making',
      'You should make all important decisions immediately while cortisol is high because it sharpens thinking',
      'After a stressful incident (e.g., a near-miss or heated confrontation), you should delay important decisions and conversations for at least 20 minutes where possible, allowing the physiological stress response to subside before engaging',
      'Cortisol cooldown only takes 2-3 minutes, so a brief pause is always sufficient',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The cortisol cooldown period is a neurobiological reality that directly impacts self-regulation. During elevated cortisol, the prefrontal cortex (responsible for rational decision-making) is less effective, while the amygdala (emotional reactions) is more active. Delaying important decisions by 20+ minutes allows the nervous system to return to baseline, enabling better-regulated responses.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Cortisol cooldown period',
    category: 'Self-Regulation' as const,
  },
  {
    id: 105,
    question:
      'Cognitive reappraisal is the process of reinterpreting a situation to change its emotional impact. A site supervisor tells you your installation work needs to be partially redone. Which response demonstrates cognitive reappraisal?',
    options: [
      'Feeling angry and arguing that your work was fine',
      'Feeling nothing because good electricians do not have emotional reactions',
      'Initially feeling disappointed, then reframing the feedback as an opportunity to improve quality and catch a potential issue before inspection — reducing the negative emotional intensity',
      'Pretending to agree while internally planning to ignore the feedback',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Cognitive reappraisal (Gross, 1998) is an antecedent-focused emotion regulation strategy — it changes the emotional trajectory before the full response develops. By reframing criticism as useful feedback, the electrician genuinely reduces the negative emotional impact rather than suppressing it. Research shows reappraisal leads to better outcomes than suppression for both the individual and their relationships.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Cognitive reappraisal scenarios',
    category: 'Self-Regulation' as const,
  },
  {
    id: 106,
    question:
      'The Kubler-Ross Change Curve describes five stages: denial, anger, bargaining, depression, and acceptance. When a construction company transitions to a completely new digital reporting system, which stage might manifest as an electrician saying "I\'ll use the new system for small jobs but keep doing the big ones on paper"?',
    options: [
      'Denial — they are refusing to acknowledge the change',
      'Anger — they are expressing frustration about the change',
      'Bargaining — they are attempting to negotiate a partial adoption, trying to retain some of the old approach while partially accepting the new one',
      'Acceptance — they have fully embraced the change',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The bargaining stage of the Kubler-Ross model involves attempting to negotiate or compromise with the change. The electrician is neither fully denying the change nor fully accepting it — they are trying to find a middle ground. Recognising which stage someone is in helps with self-regulation (managing your own response to change) and empathy (understanding others' resistance).",
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Kubler-Ross and construction change',
    category: 'Self-Regulation' as const,
  },
  {
    id: 107,
    question:
      'Emotional flooding occurs when the intensity of emotions overwhelms the capacity for rational thought. What is a reliable physiological indicator that emotional flooding may be occurring?',
    options: [
      'Feeling slightly bored during a meeting',
      'Heart rate exceeding approximately 100 beats per minute (outside of physical exertion), accompanied by difficulty thinking clearly, tunnel vision, or an urge to flee or fight',
      'Feeling mildly annoyed but still able to engage in conversation',
      'Experiencing a brief moment of surprise that quickly passes',
    ] as const,
    correctAnswer: 1,
    explanation:
      'John Gottman\'s research identified that when heart rate exceeds approximately 100 bpm (Diffuse Physiological Arousal), the capacity for rational, empathetic communication drops dramatically. This "flooding" response triggers fight-or-flight mechanisms that override the prefrontal cortex. Recognising these physical signs is the first step in self-regulating during high-conflict situations.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Emotional flooding',
    category: 'Self-Regulation' as const,
  },
  {
    id: 108,
    question:
      "In Goleman's EI framework, conscientiousness is a self-regulation competency defined as taking responsibility for personal performance. Which behaviour best demonstrates conscientiousness in an electrical context?",
    options: [
      'Only checking your work when you know an inspector is coming',
      'Consistently testing installations to standard even when unsupervised, documenting results accurately, and proactively addressing any issues found — because your internal standards drive your behaviour, not external monitoring',
      'Doing the minimum required to pass inspection',
      'Blaming poor workmanship on time pressure from the main contractor',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Conscientiousness as an EI competency means that internal standards, not external pressure, drive quality. A conscientious electrician self-regulates by maintaining high standards regardless of supervision. This differs from compliance (doing what is required when watched) because the motivation is intrinsic — the person takes genuine ownership of their performance.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Conscientiousness',
    category: 'Self-Regulation' as const,
  },
  {
    id: 109,
    question:
      "Innovation, in Goleman's framework, is a self-regulation competency involving comfort with novel ideas and approaches. Why is innovation classified under self-regulation rather than, say, motivation?",
    options: [
      'It was a classification error by Goleman',
      'Innovation requires regulating the fear of failure, discomfort with uncertainty, and resistance to change — all self-regulation processes — before creative thinking can occur',
      'Innovation has nothing to do with emotions',
      'It is only classified under self-regulation in older versions of the framework',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Innovation requires overcoming emotional barriers: fear of judgement, discomfort with ambiguity, anxiety about failure, and attachment to familiar methods. Self-regulation is needed to manage these emotions so that creative thinking is not blocked. On a construction site, suggesting a more efficient cable routing method requires regulating the fear that colleagues might dismiss the idea.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Innovation as self-regulation',
    category: 'Self-Regulation' as const,
  },
  {
    id: 110,
    question:
      'When joining a new site team, a qualified electrician feels anxious about establishing credibility. Applying the Kubler-Ross model to this personal transition, what self-regulation strategy would be most effective?',
    options: [
      'Overcompensating by trying to prove superiority to the new team immediately',
      'Withdrawing and avoiding interaction until the anxiety passes naturally',
      'Acknowledging the anxiety as a normal response to change, using cognitive reappraisal to view the situation as an opportunity to learn from a new team, and gradually building trust through consistent, reliable behaviour',
      'Masking all emotions and pretending complete confidence from day one',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This integrates multiple self-regulation strategies: emotional awareness (recognising anxiety), normalisation (understanding it is a natural change response), cognitive reappraisal (reframing as opportunity), and behavioural regulation (building trust through consistency). This multi-layered approach is more effective than single strategies like suppression or avoidance.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Kubler-Ross and new site teams',
    category: 'Self-Regulation' as const,
  },
  {
    id: 111,
    question:
      'The concept of "emotional granularity" (Lisa Feldman Barrett) refers to the ability to make fine-grained distinctions between similar emotions. How does emotional granularity support self-regulation?',
    options: [
      'It does not — knowing the exact name of an emotion does not help manage it',
      'The more precisely you can identify your emotion (e.g., distinguishing "frustrated" from "disappointed" from "overwhelmed"), the more effectively you can select the appropriate regulation strategy — because different emotions require different responses',
      'Emotional granularity only matters for therapists, not tradespeople',
      'It helps by eliminating emotions entirely through precise categorisation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Barrett\'s research on emotional granularity shows that people who can make fine-grained emotional distinctions regulate their emotions more effectively. If you only know you feel "bad," your regulation options are limited. But if you can identify that you feel specifically "undervalued" (not angry, not sad), you can target the specific need — perhaps by seeking recognition or reassessing whether your contribution is visible.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Emotional granularity',
    category: 'Self-Regulation' as const,
  },
  {
    id: 112,
    question:
      'A foreman receives news that the project deadline has been moved forward by two weeks. He notices his jaw clenching and his thoughts racing with worst-case scenarios. According to the cognitive reappraisal model, what should he do FIRST?',
    options: [
      'Immediately call a team meeting to share the bad news',
      'Recognise the physical stress response (jaw clenching) and racing thoughts as signals that his amygdala has been triggered, then pause to allow the prefrontal cortex to re-engage before deciding on a course of action',
      'Suppress the stress and carry on as if nothing has changed',
      'Express his anger openly to the client who set the new deadline',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The cognitive reappraisal model begins with awareness of the emotional response. The physical symptoms (jaw clenching) and cognitive patterns (catastrophising) indicate amygdala activation. Pausing creates space for the prefrontal cortex to re-engage, after which the foreman can reappraise the situation (e.g., "This is challenging but we can reprioritise tasks") before communicating to the team from a regulated state.',
    section: 'Self-Regulation',
    difficulty: 'intermediate' as const,
    topic: 'Cognitive reappraisal scenarios',
    category: 'Self-Regulation' as const,
  },
  {
    id: 113,
    question:
      'An experienced electrician discovers a serious wiring error made by a colleague on a commercial installation. The error poses no immediate safety risk but will fail inspection. Integrating multiple self-regulation strategies, what is the most emotionally intelligent approach?',
    options: [
      'Fix it silently without telling anyone, to avoid confrontation',
      'Report it to the site manager immediately without speaking to the colleague first',
      'Regulate initial frustration (emotional awareness), approach the colleague privately using cognitive reappraisal to frame it as a quality issue rather than personal failure, discuss the error factually, offer to help correct it, and document it appropriately — balancing accountability with empathy',
      'Post about the error in the site group chat as a "learning example"',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This advanced scenario requires integrating: emotional awareness (recognising frustration), impulse control (not reacting immediately), cognitive reappraisal (framing as quality not personal attack), empathy (approaching privately to preserve dignity), conscientiousness (ensuring it is documented and corrected), and trustworthiness (maintaining transparency). This multi-strategy approach reflects mature self-regulation.',
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Integrating multiple regulation strategies',
    category: 'Self-Regulation' as const,
  },
  {
    id: 114,
    question:
      'The Trust Equation states Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. An electrician is highly credible and reliable but has very high self-orientation (always talking about their own achievements). According to the equation, what happens to trust — and what self-regulation skill is needed?',
    options: [
      'Trust remains high because credibility and reliability compensate',
      "Trust is significantly reduced because self-orientation is the denominator — it divides the total. The self-regulation skill needed is managing self-serving impulses and genuinely shifting attention to others' needs, which requires ongoing emotional regulation of ego and need for recognition",
      'Self-orientation has no effect on trust in professional settings',
      'The person should simply stop talking about achievements without addressing the underlying emotional need driving the behaviour',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In Maister's Trust Equation, self-orientation is the denominator, so even small increases dramatically reduce overall trust. An electrician with scores of 8+8+8 in the numerator but 10 in self-orientation scores only 2.4 out of a possible 24. The self-regulation challenge is deep: it requires recognising the emotional need driving self-promotion (perhaps insecurity) and regulating it, not just suppressing the behaviour.",
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Trust Equation deep application',
    category: 'Self-Regulation' as const,
  },
  {
    id: 115,
    question:
      "In construction culture, there is often an unspoken expectation to project toughness and hide vulnerability. Brene Brown's research suggests that vulnerability is actually essential for trust and connection. How does this create a self-regulation challenge for electricians?",
    options: [
      'It creates no challenge — construction workers should simply be tougher',
      'The challenge is that effective self-regulation sometimes requires acknowledging difficulty or uncertainty (vulnerability), which conflicts with cultural norms of toughness — requiring the person to regulate the fear of judgement while still being authentic, a sophisticated form of emotional courage',
      'Vulnerability has no place in professional construction settings',
      'The solution is to be vulnerable with everyone all the time regardless of context',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Brown's research shows that vulnerability — defined as emotional risk, exposure, and uncertainty — is the birthplace of trust, creativity, and belonging. In construction, this creates a self-regulation paradox: mature emotional regulation sometimes requires admitting struggle, but cultural norms may punish this. The advanced self-regulation skill is calibrated vulnerability — being authentic in appropriate contexts while managing the real social risks.",
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Brene Brown on vulnerability',
    category: 'Self-Regulation' as const,
  },
  {
    id: 116,
    question:
      "Gross and John's (2003) research compared people who habitually use expressive suppression versus cognitive reappraisal. Which finding accurately reflects their research on long-term effects?",
    options: [
      'Suppression and reappraisal produce identical long-term outcomes',
      'Habitual suppressors showed worse social outcomes (fewer close relationships, less social support, lower life satisfaction) and paradoxically experienced MORE negative emotion over time — while habitual reappraisers showed better outcomes on all these measures',
      'Habitual suppressors were happier because they did not dwell on negative emotions',
      'The research found no significant differences between the two strategies',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Gross and John's landmark 2003 study found that habitual expressive suppression was associated with: less positive emotion, more negative emotion, worse interpersonal functioning, less social support, lower life satisfaction, and poorer wellbeing. Habitual cognitive reappraisal showed the opposite pattern on every measure. This evidence strongly supports teaching reappraisal over suppression as a self-regulation strategy.",
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Suppression long-term effects',
    category: 'Self-Regulation' as const,
  },
  {
    id: 117,
    question:
      'ACT (Acceptance and Commitment Therapy) identifies six core processes of psychological flexibility. One is "cognitive defusion" — the ability to see thoughts as thoughts rather than facts. A site manager thinks "I am a terrible leader because we missed the deadline." What would cognitive defusion look like?',
    options: [
      'Believing the thought completely and resigning from the role',
      'Suppressing the thought and pretending everything is fine',
      'Noticing the thought and reframing it: "I am having the thought that I am a terrible leader. This is a thought, not a fact. Missing one deadline does not define my entire leadership capability" — creating distance between the self and the thought',
      'Arguing with the thought using positive affirmations until it goes away',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Cognitive defusion in ACT involves creating psychological distance from thoughts. The technique of prefacing with "I am having the thought that..." transforms fusion (I AM a terrible leader) into defusion (I am having a THOUGHT that...). This does not deny the content but changes the relationship with the thought, allowing the person to respond based on values rather than reactive self-judgement.',
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'ACT psychological flexibility',
    category: 'Self-Regulation' as const,
  },
  {
    id: 118,
    question:
      'An electrician takes ownership when a circuit they designed causes nuisance tripping, rather than blaming the manufacturer or the design brief. According to self-regulation theory, what distinguishes ownership from blame culture?',
    options: [
      'There is no real difference — both address the problem equally',
      'Ownership requires self-regulation of defensive impulses (ego protection, fear of consequences), involves taking responsibility without self-condemnation, and focuses on learning and solution — whereas blame culture is driven by unregulated fear and redirects negative emotion outward to protect the self',
      'Ownership means accepting all blame regardless of whether it is deserved',
      'Blame culture is actually more effective because it identifies the real cause faster',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Ownership versus blame represents a fundamental self-regulation distinction. Taking ownership requires regulating: defensive impulses (the urge to protect ego), fear of consequences (anxiety about punishment), and shame (the feeling of being fundamentally flawed). Healthy ownership says "I made an error, I will learn from it and fix it" — regulating both the defensive impulse and excessive self-blame.',
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Ownership vs blame culture',
    category: 'Self-Regulation' as const,
  },
  {
    id: 119,
    question:
      'During a high-pressure commissioning where multiple systems are failing, an electrical project manager needs to maintain composure while the client is escalating complaints. Which advanced self-regulation approach integrates the most strategies effectively?',
    options: [
      'Suppress all emotion and respond in a flat, robotic manner',
      "Match the client's emotional intensity to show you take it seriously",
      'Use physiological regulation (controlled breathing to manage cortisol), cognitive reappraisal (reframe as "this is a solvable technical challenge, not a personal attack"), psychological flexibility (accept discomfort while committing to values of professionalism), and measured vulnerability ("I understand this is frustrating — let me walk you through our resolution plan")',
      'Delegate all client communication to someone else',
    ] as const,
    correctAnswer: 2,
    explanation:
      "This response integrates four distinct self-regulation frameworks: physiological regulation (managing the body's stress response), cognitive reappraisal (changing the interpretation), ACT psychological flexibility (accepting discomfort while staying values-aligned), and calibrated vulnerability (acknowledging difficulty without losing authority). This multi-layered approach represents advanced self-regulation mastery.",
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Complex self-regulation scenarios',
    category: 'Self-Regulation' as const,
  },
  {
    id: 120,
    question:
      'Adaptability is a self-regulation competency in Goleman\'s framework. The construction industry is experiencing rapid change: new regulations, digital tools, sustainability requirements, and evolving safety standards. What distinguishes adaptability as a self-regulation competency from simply "going along with changes"?',
    options: [
      'There is no real difference — adaptability just means accepting whatever happens',
      'True adaptability requires actively regulating emotional resistance to change, maintaining effectiveness during ambiguity, proactively seeking new approaches, and flexing strategies without losing core values — it is an emotionally regulated, intentional process, not passive compliance',
      'Adaptability means changing your values to match whatever the current trend demands',
      'Adaptable people do not experience any discomfort during change',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Goleman's adaptability competency involves: flexibility in handling change, emotional comfort with ambiguity, willingness to generate new ideas, and ability to juggle multiple demands. This is fundamentally different from passive compliance because it requires active self-regulation of the discomfort that change naturally produces. Truly adaptable people still feel the discomfort — they just regulate it effectively.",
    section: 'Self-Regulation',
    difficulty: 'advanced' as const,
    topic: 'Adaptability in construction change',
    category: 'Self-Regulation' as const,
  },

  // -------------------------------------------------------------------------
  // Motivation & Empathy — Basic (121-136)
  // -------------------------------------------------------------------------
  {
    id: 121,
    question:
      "In Goleman's EI framework, motivation is not about external rewards but about internal drive. Which of the following is one of Goleman's four motivation competencies?",
    options: [
      'Salary negotiation',
      'Achievement drive — a striving to improve or meet a standard of excellence',
      'Avoiding difficult tasks',
      'Working only when supervised',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Goleman identifies four motivation competencies: achievement drive (striving to improve or meet a standard of excellence), commitment (aligning with the goals of the group or organisation), initiative (readiness to act on opportunities), and optimism (persistence in pursuing goals despite obstacles). These are all intrinsic motivators, not dependent on external rewards.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Goleman motivation competencies',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 122,
    question:
      "Which of Goleman's motivation competencies involves aligning personal goals with the goals of the team or organisation?",
    options: [
      'Achievement drive',
      'Initiative',
      'Commitment — aligning with the goals of the group or organisation',
      'Optimism',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Commitment in Goleman's framework means willingly aligning personal effort with group or organisational goals. For an electrician, this might mean prioritising a team deadline over personal preference for how to sequence work. It requires finding genuine connection between personal values and organisational objectives.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Goleman motivation competencies',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 123,
    question:
      'Daniel Pink\'s book "Drive" identifies three elements of intrinsic motivation. What are they?',
    options: [
      'Money, status, and power',
      'Autonomy (the desire to direct our own lives), mastery (the urge to get better at something that matters), and purpose (the yearning to do what we do in the service of something larger than ourselves)',
      'Fear, competition, and deadlines',
      'Praise, promotion, and bonuses',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Pink's research, drawing on decades of motivation science, identifies autonomy, mastery, and purpose as the three pillars of intrinsic motivation. These supersede traditional carrot-and-stick motivators for complex, creative work. For electricians, autonomy might mean choosing how to route cables, mastery means developing expertise, and purpose means contributing to safe buildings.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Daniel Pink Drive',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 124,
    question:
      'Self-Determination Theory (SDT), developed by Deci and Ryan, identifies three basic psychological needs. What are they?',
    options: [
      'Food, shelter, and safety',
      'Autonomy (feeling in control of your own behaviour and goals), competence (feeling effective and capable), and relatedness (feeling connected to others)',
      'Achievement, power, and affiliation',
      'Survival, reproduction, and dominance',
    ] as const,
    correctAnswer: 1,
    explanation:
      'SDT identifies autonomy, competence, and relatedness as universal psychological needs that, when satisfied, enhance intrinsic motivation, wellbeing, and performance. When a work environment supports all three — e.g., giving electricians some choice in methods (autonomy), opportunities to develop skills (competence), and a supportive team (relatedness) — motivation and quality naturally increase.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Self-Determination Theory basics',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 125,
    question:
      'Mihaly Csikszentmihalyi\'s concept of "flow" describes a state of complete absorption in an activity. Which condition is NOT required for flow to occur?',
    options: [
      'The task must be challenging enough to engage your skills but not so difficult that it causes anxiety',
      'Clear goals and immediate feedback must be present',
      'The person must be earning a high salary for the work',
      "There must be a balance between the challenge of the task and the person's skill level",
    ] as const,
    correctAnswer: 2,
    explanation:
      'Flow states are independent of external rewards like salary. The conditions for flow include: a balance between challenge and skill, clear goals, immediate feedback, deep concentration, a sense of control, loss of self-consciousness, and altered sense of time. An electrician might experience flow when solving a complex fault-finding problem that perfectly matches their skill level.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Flow states',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 126,
    question:
      'Martin Seligman identified the "3 Ps" that can trap people in pessimistic thinking after setbacks. What are they?',
    options: [
      'Power, prestige, and profit',
      'Personalisation (it is all my fault), pervasiveness (it will affect everything), and permanence (it will last forever)',
      'Planning, preparation, and practice',
      'Patience, persistence, and positivity',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Seligman\'s 3 Ps describe how pessimistic explanatory style magnifies setbacks: Personalisation ("It is all my fault" rather than seeing contributing factors), Pervasiveness ("This will ruin everything" rather than containing the impact), and Permanence ("This will never get better" rather than seeing it as temporary). Recognising these traps is the first step to developing learned optimism.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Seligman 3 Ps',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 127,
    question:
      'What is the standard definition of empathy in the context of emotional intelligence?',
    options: [
      'Feeling sorry for someone who is struggling',
      'The ability to understand and share the feelings of another person — to see the world from their perspective and to sense their emotional state',
      'Agreeing with everyone to avoid conflict',
      'Giving advice when someone shares a problem',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Empathy in EI is the ability to understand and share another person's feelings. It involves both cognitive empathy (understanding their perspective intellectually) and affective empathy (feeling something of what they feel). It is distinct from sympathy (feeling sorry for someone) and does not require agreement — you can empathise with someone while disagreeing with their position.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Empathy definition',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 128,
    question:
      'Research identifies three distinct types of empathy. Which option correctly names all three?',
    options: [
      'Sympathy, apathy, and antipathy',
      'Cognitive empathy (understanding what someone thinks/feels), emotional/affective empathy (feeling what someone feels), and compassionate empathy (understanding and feeling, then being moved to help)',
      'Passive empathy, active empathy, and reactive empathy',
      'Surface empathy, deep empathy, and complete empathy',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The three types are: (1) Cognitive empathy — understanding another\'s perspective ("I understand why you feel that way"), (2) Emotional/affective empathy — actually sharing the feeling ("I feel your frustration"), and (3) Compassionate empathy — understanding and feeling, plus being moved to act ("I understand, I feel it too, and here is how I can help"). Compassionate empathy is the most complete and actionable form.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Three types of empathy',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 129,
    question: 'What is the key difference between empathy and sympathy?',
    options: [
      'There is no difference — they are synonyms',
      'Empathy involves understanding and sharing another person\'s feelings from their perspective, while sympathy involves feeling pity or sorrow for someone\'s situation from your own perspective — empathy says "I feel with you," sympathy says "I feel for you"',
      'Sympathy is more useful in professional settings',
      'Empathy is a weakness while sympathy shows strength',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The distinction is fundamental in EI. Empathy involves stepping into someone\'s experience and understanding it from the inside ("I understand how frustrating that must be for you"). Sympathy involves observing from the outside and feeling sorry ("That is a shame, I feel sorry for you"). Brene Brown notes that empathy fuels connection while sympathy drives disconnection, because sympathy creates a power differential.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Empathy vs sympathy',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 130,
    question:
      'Mirror neurons are brain cells that fire both when we perform an action and when we observe someone else performing the same action. How do mirror neurons relate to empathy?',
    options: [
      'Mirror neurons have no connection to empathy',
      "Mirror neurons provide a neurological basis for empathy — they help us automatically simulate others' experiences in our own brain, which is why we wince when we see someone hurt or smile when we see someone happy",
      'Mirror neurons only exist in primates, not humans',
      'Mirror neurons are responsible for logical thinking, not emotional understanding',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Discovered by Giacomo Rizzolatti and colleagues, mirror neurons provide a neurobiological foundation for empathy. They create an automatic, pre-conscious simulation of others' actions and emotions in our own neural circuitry. This is why emotional contagion occurs — seeing a colleague's frustration can trigger similar neural patterns in your own brain, giving you a direct experiential sense of what they feel.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Mirror neurons basics',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 131,
    question: "In Goleman's framework, which of the following is one of his empathy competencies?",
    options: [
      'Self-confidence',
      "Understanding others — sensing others' feelings and perspectives, and taking an active interest in their concerns",
      'Emotional self-control',
      'Achievement drive',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Goleman identifies several empathy competencies including: understanding others (sensing feelings and perspectives), developing others (sensing development needs and bolstering abilities), service orientation (anticipating and meeting customer needs), leveraging diversity (cultivating opportunities through diverse people), and political awareness (reading group emotional currents and power relationships).',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Goleman empathy competencies',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 132,
    question:
      'Daniel Pink argues that "if-then" rewards (e.g., "If you finish early, you get a bonus") can actually decrease motivation for complex tasks. Why?',
    options: [
      'People do not like receiving bonuses',
      'External "if-then" rewards can undermine intrinsic motivation by shifting focus from the inherent satisfaction of the work to the external reward, narrowing thinking and reducing creativity — a phenomenon known as the "overjustification effect"',
      'Bonuses always increase motivation regardless of the task type',
      "Pink's argument has been completely disproved by subsequent research",
    ] as const,
    correctAnswer: 1,
    explanation:
      'The overjustification effect, demonstrated in numerous studies (including Deci\'s 1971 SOMA puzzle experiment), shows that adding external rewards to intrinsically motivating activities can reduce intrinsic motivation. For complex electrical work requiring problem-solving and creativity, "if-then" rewards can narrow focus and reduce the quality of thinking. Pink argues for "now-that" rewards (unexpected recognition after the fact) as a better alternative.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Daniel Pink Drive',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 133,
    question:
      'Which of the following best describes Goleman\'s motivation competency of "initiative"?',
    options: [
      'Waiting to be told exactly what to do before starting any work',
      'Readiness to act on opportunities and to go beyond what is required — taking proactive steps without waiting for direction',
      'Starting work before fully understanding the requirements',
      'Always being the first person to arrive on site',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Initiative in Goleman's framework means readiness to act on opportunities, mobilise others, and take proactive steps. For an electrician, this might mean noticing a potential issue during installation and addressing it before it becomes a problem, or suggesting improvements to working methods without being asked. It is driven by internal motivation rather than external direction.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Goleman motivation competencies',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 134,
    question:
      "Goleman's optimism competency within motivation means persistence in pursuing goals despite obstacles and setbacks. How does this differ from naive positivity?",
    options: [
      'There is no difference — optimism and naive positivity are the same thing',
      "Goleman's optimism involves realistic assessment of obstacles combined with genuine belief that effort and strategy can lead to success — it acknowledges difficulties but maintains persistent, evidence-based hope, unlike naive positivity which ignores or denies problems",
      "Goleman's optimism means always expecting the best possible outcome",
      'Optimism is an innate trait that cannot be developed',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Goleman\'s optimism competency is grounded in realism — it acknowledges obstacles but maintains the belief that persistent, strategic effort can overcome them. This is fundamentally different from naive positivity ("everything will be fine") which can lead to poor planning and denial of genuine risks. On a construction site, realistic optimism means acknowledging that a deadline is tight while believing the team can find ways to meet it.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Goleman motivation competencies',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 135,
    question:
      'Csikszentmihalyi found that flow states occur in a specific zone between anxiety and boredom. If an electrician is performing a task far below their skill level, which emotional state is most likely according to flow theory?',
    options: [
      'Flow — because easy tasks are enjoyable',
      'Anxiety — because they are worried about the task',
      'Boredom or apathy — because the challenge is too low relative to their skill level, offering no opportunity for engagement or growth',
      'Excitement — because easy tasks are always motivating',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Csikszentmihalyi's flow model maps the relationship between challenge and skill. When skill is high but challenge is low, the result is boredom or apathy. When challenge and skill are both high and well-matched, flow occurs. When challenge exceeds skill, anxiety results. This explains why experienced electricians may become demotivated when assigned repetitive, basic tasks — they need appropriately challenging work to enter flow.",
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Flow states',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 136,
    question:
      'In Self-Determination Theory, what happens to motivation when a work environment meets all three basic psychological needs (autonomy, competence, relatedness)?',
    options: [
      'Motivation decreases because people become complacent',
      'Intrinsic motivation, engagement, wellbeing, and performance quality all increase — because the fundamental psychological nutrients for self-motivated behaviour are present',
      'Only extrinsic motivation increases',
      'There is no measurable effect on motivation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Decades of SDT research (Deci & Ryan, 2000) consistently show that environments supporting autonomy, competence, and relatedness produce: higher intrinsic motivation, greater engagement, better performance quality (not just quantity), enhanced wellbeing, and reduced burnout. For construction teams, this means giving workers appropriate choice, supporting skill development, and fostering team connection.',
    section: 'Motivation & Empathy',
    difficulty: 'basic' as const,
    topic: 'Self-Determination Theory basics',
    category: 'Motivation & Empathy' as const,
  },

  // -------------------------------------------------------------------------
  // Motivation & Empathy — Intermediate (137-152)
  // -------------------------------------------------------------------------
  {
    id: 137,
    question:
      "Seligman's ABCDE model is a technique for building optimism. What do the five letters stand for?",
    options: [
      'Action, Behaviour, Consequence, Decision, Evaluation',
      'Adversity (the event), Belief (your interpretation), Consequence (resulting feelings/actions), Disputation (challenging unhelpful beliefs), and Energisation (the new, more optimistic outcome)',
      'Awareness, Balance, Commitment, Discipline, Excellence',
      'Acceptance, Bravery, Courage, Determination, Endurance',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Seligman's ABCDE model is a practical framework for developing learned optimism: Adversity (what happened), Belief (how you interpret it), Consequence (how the belief makes you feel and act), Disputation (actively challenging pessimistic beliefs with evidence), and Energisation (the improved emotional and behavioural outcome after successful disputation). It is a structured approach to cognitive reappraisal.",
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'ABCDE model',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 138,
    question:
      "An electrician fails an inspection on a domestic installation. Using Seligman's framework, which response demonstrates a pessimistic explanatory style?",
    options: [
      '"The inspector was thorough — I will fix these specific issues and learn from them"',
      '"I always mess things up (permanence), I am useless at everything (pervasiveness), and it is completely my fault because I am incompetent (personalisation)" — treating the setback as permanent, pervasive, and entirely personal',
      '"This is frustrating, but these are fixable issues and I can address them"',
      '"The standard has changed recently and I need to update my knowledge on this specific regulation"',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Seligman\'s pessimistic explanatory style features all 3 Ps: Permanence ("I always mess things up" — as if it is a fixed state), Pervasiveness ("I am useless at everything" — spreading one failure to the whole self), and Personalisation ("I am incompetent" — attributing to fundamental character rather than specific, correctable factors). The optimistic alternatives are specific, temporary, and identify actionable causes.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Pessimistic vs optimistic explanatory styles',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 139,
    question: 'What is the difference between realistic optimism and toxic positivity?',
    options: [
      'They are essentially the same — both focus on seeing the bright side',
      'Realistic optimism acknowledges genuine difficulties and negative emotions while maintaining evidence-based belief in the possibility of positive outcomes. Toxic positivity dismisses or invalidates negative emotions ("Just think positive!"), which actually increases suffering by adding shame about feeling bad on top of the original difficulty.',
      'Toxic positivity is more effective in high-pressure construction environments',
      'Realistic optimism is just pessimism dressed up with a positive label',
    ] as const,
    correctAnswer: 1,
    explanation:
      'This distinction is crucial for EI. Realistic optimism (Seligman, Schneider) validates the difficulty ("This is genuinely hard") while maintaining hope ("and I believe we can find a way through"). Toxic positivity invalidates emotions ("Don\'t be negative!", "Good vibes only!"), which research shows increases emotional suppression, reduces trust, and impairs mental health. In construction, dismissing genuine safety concerns as "negativity" can be dangerous.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Realistic optimism vs toxic positivity',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 140,
    question:
      'According to Csikszentmihalyi, what are the key conditions that must be present for a flow state to occur?',
    options: [
      'A quiet environment, no deadlines, and complete isolation',
      "Clear goals, immediate feedback, and a balance between the perceived challenge of the task and one's perceived skills — with both challenge and skill at a relatively high level",
      'External rewards, peer competition, and supervisor presence',
      'Low stakes, easy tasks, and unlimited time',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Csikszentmihalyi identified several conditions for flow: (1) clear, achievable goals, (2) immediate feedback on progress, (3) a balance between challenge and skill (both high). Additional features of the flow experience include: complete concentration, merging of action and awareness, loss of reflective self-consciousness, sense of control, distorted sense of time, and the experience being intrinsically rewarding (autotelic).',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Flow conditions',
    category: 'Motivation & Empathy' as const,
  },

  {
    id: 141,
    question:
      "Paul Ekman's research identified micro-expressions — brief, involuntary facial expressions lasting 1/25 to 1/5 of a second. Why are micro-expressions relevant to empathy in a workplace context?",
    options: [
      'They are not relevant — facial expressions can be easily faked',
      'Micro-expressions reveal genuine emotions that a person may be trying to conceal, providing empathic individuals with additional emotional data. Recognising a flash of fear or contempt that someone is hiding can help you respond to their actual emotional state rather than just their words',
      'Micro-expressions only occur in laboratory settings',
      'Only trained psychologists can detect micro-expressions',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Ekman\'s research showed that micro-expressions are universal across cultures and reveal true emotions that may contradict spoken words. For empathy, this means: if a colleague says "I am fine" but you catch a micro-expression of distress, you have deeper emotional information. While not everyone can read micro-expressions naturally, the skill can be trained, enhancing empathic accuracy in workplace interactions.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Ekman micro-expressions',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 142,
    question:
      "Research suggests that approximately 55% of emotional communication is through body language, 38% through tone of voice, and only 7% through words (Mehrabian's rule). In a construction context, which scenario demonstrates using body language awareness empathically?",
    options: [
      "Reading an email carefully to understand a colleague's emotional state",
      'Noticing that a normally confident apprentice is standing with hunched shoulders, avoiding eye contact, and speaking quietly — and recognising these non-verbal cues may indicate they are struggling or anxious, then gently checking in with them',
      'Ignoring body language because only spoken words matter',
      'Analysing body language to manipulate a negotiation',
    ] as const,
    correctAnswer: 1,
    explanation:
      "While Mehrabian's specific percentages apply only to incongruent messages about feelings, the broader principle is well-established: non-verbal cues carry significant emotional information. Empathically reading the apprentice's body language (hunched posture, avoidance) and checking in demonstrates compassionate empathy — using the information to help, not to gain advantage.",
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Body language basics',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 143,
    question:
      "Active listening is a core empathy skill. Which set of behaviours best demonstrates active listening during a colleague's description of a problem on site?",
    options: [
      'Maintaining eye contact, nodding, waiting until they finish, paraphrasing what you heard ("So you are saying the RCD keeps tripping after the load test?"), and asking clarifying questions — while resisting the urge to jump in with solutions',
      'Listening while simultaneously checking your phone',
      'Interrupting with your own similar experience to show you understand',
      'Nodding and saying "yes" at regular intervals while thinking about your lunch plans',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Active listening involves: full attention (no distractions), non-verbal engagement (eye contact, nodding), verbal confirmation (paraphrasing, reflecting), withholding judgement, and asking clarifying questions. Crucially, it means resisting the "fix-it" impulse — sometimes people need to feel heard before they are ready for solutions. This is a foundational empathy skill that enables all other empathic responses.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Active listening',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 144,
    question:
      'Perspective-taking is the cognitive component of empathy. A client is angry about a delay to their kitchen rewire. What does effective perspective-taking involve?',
    options: [
      'Telling the client they should not be angry because delays are normal',
      "Actively imagining the situation from the client's viewpoint: they may have taken time off work, arranged for the kitchen to be cleared, and planned meals around the completion date — understanding that the delay has a ripple effect on their daily life that extends beyond the electrical work itself",
      'Explaining the technical reasons for the delay in detail',
      'Offering a discount without understanding what the client actually needs',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Perspective-taking requires actively stepping into another person's situation and seeing it through their eyes. The client is not just waiting for wires — they have reorganised their life around the promised schedule. Understanding this broader impact (lost wages, disrupted meals, extended mess) allows you to respond to their actual experience rather than just the technical issue. This is cognitive empathy in action.",
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Perspective-taking',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 145,
    question:
      'Cultural sensitivity is an aspect of empathy. On a multi-cultural construction site, an electrician notices that a colleague from a different cultural background never makes direct eye contact during conversations. What is the empathically intelligent response?',
    options: [
      'Assume they are being disrespectful or evasive',
      'Force eye contact by moving into their line of sight',
      'Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens',
      'Report the behaviour to the site manager as suspicious',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Cultural empathy requires recognising that emotional expression and communication norms differ across cultures. Direct eye contact is expected in many Western cultures but can be considered disrespectful in parts of Asia, Africa, and the Middle East. Empathically intelligent people suspend their own cultural assumptions and seek to understand behaviour within its cultural context. This is increasingly important on diverse UK construction sites.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Cultural sensitivity',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 146,
    question:
      'What distinguishes compassionate empathy from cognitive and emotional empathy, and why is it the most useful form in professional settings?',
    options: [
      'Compassionate empathy is the weakest form and should be avoided at work',
      'Compassionate empathy combines understanding (cognitive), feeling (emotional), AND being moved to take appropriate action to help — making it the most complete and practically useful form because it translates empathic awareness into constructive behaviour',
      'Compassionate empathy means doing everything for someone so they do not have to',
      'There is no practical difference between the three types',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Compassionate empathy (also called empathic concern) is the integration of all three components: I understand your situation (cognitive), I feel something of what you feel (emotional), and I am motivated to help in an appropriate way (compassionate action). In construction, this might look like: understanding that an apprentice is overwhelmed, feeling their stress, and then offering specific, practical support — not just acknowledging the difficulty.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Compassionate empathy in action',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 147,
    question:
      'The famous MetLife study on optimism found that salespeople in the top 10% for optimism outsold the bottom 10% by 88%. What does this research suggest about the relationship between optimism and workplace performance?',
    options: [
      'Optimism has no effect on performance — the MetLife study was flawed',
      "Optimistic individuals persist longer after setbacks, approach challenges with greater creativity, and maintain motivation through difficult periods — leading to measurably better performance outcomes. The MetLife study demonstrated that optimism (measured by Seligman's ASQ) was a better predictor of success than traditional hiring criteria",
      'Only salespeople benefit from optimism',
      'The study showed that pessimists actually perform better in the long term',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The MetLife study (Seligman, 1991) was a landmark finding: agents hired based on optimism scores (even those who failed traditional criteria) outsold pessimistic agents significantly. The mechanism is persistence — optimists attribute setbacks to temporary, specific, and external factors, so they try again. Pessimists see setbacks as permanent, pervasive, and personal, so they give up sooner. This applies across professions including construction.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'MetLife study',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 148,
    question:
      'The Stockdale Paradox, named after Admiral James Stockdale, describes a crucial balance for maintaining motivation through extreme adversity. What is this paradox?',
    options: [
      'You must choose between optimism and realism — you cannot have both',
      'You must maintain unwavering faith that you will prevail in the end, AND at the same time, confront the most brutal facts of your current reality — holding both truths simultaneously',
      'Optimistic people always survive adversity while pessimistic people do not',
      'The paradox is that thinking about the future prevents you from acting in the present',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Stockdale, who survived seven years as a POW, observed that the prisoners who did not survive were the optimists who kept setting specific deadlines for rescue ("We\'ll be out by Christmas"). When those deadlines passed, they lost hope. The survivors maintained absolute faith in eventual success while simultaneously confronting the harsh reality of their current situation. This balances realistic optimism with honest assessment — crucial for sustaining motivation through prolonged construction difficulties.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Stockdale Paradox',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 149,
    question:
      'Karen Reivich and Andrew Shatte identified seven key abilities of resilience. Which of these is most directly connected to the motivation domain of EI?',
    options: [
      'Calming and focusing (related more to self-regulation)',
      'Reaching out — the ability to seek new opportunities and connect with others after setbacks, maintaining initiative and optimism despite adversity',
      'Reading non-verbal cues (related more to empathy)',
      'Emotion regulation (related more to self-regulation)',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Reivich and Shatte\'s "reaching out" resilience factor maps directly onto motivation competencies: it involves initiative (proactively seeking opportunities), optimism (believing new opportunities exist despite setbacks), and commitment (staying engaged with goals). While other resilience factors connect to different EI domains (emotion regulation to self-regulation, empathy to the empathy domain), reaching out is fundamentally motivational.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Reivich and Shatte resilience',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 150,
    question:
      'An electrician applies the ABCDE model after receiving critical feedback on an EICR report. Adversity: the report was returned for corrections. Belief: "I am not good enough to do inspection work." What would effective Disputation look like?',
    options: [
      'Accepting the belief as true and giving up inspection work',
      'Ignoring the belief and pretending the feedback was not given',
      'Challenging the belief with evidence: "I have completed 47 EICRs successfully. This one had specific issues with the schedule of test results section. One returned report does not make me incompetent — it means I need to review my process for that specific section." This replaces a permanent, pervasive, personal belief with a specific, temporary, actionable one',
      'Blaming the person who returned the report for being too pedantic',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective Disputation in the ABCDE model involves challenging pessimistic beliefs with evidence. The key shifts are: from permanent ("I\'m not good enough") to temporary ("this specific report had issues"), from pervasive ("inspection work") to specific ("the schedule of test results section"), and from personal ("I\'m incompetent") to actionable ("I need to review my process"). The Energisation that follows is a renewed, focused motivation to improve the specific skill.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'ABCDE model',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 151,
    question:
      'Ekman identified seven universal emotions that are expressed through the same facial muscles across all cultures. Which list correctly identifies these seven emotions?',
    options: [
      'Love, hope, pride, guilt, shame, jealousy, envy',
      'Happiness, sadness, fear, anger, surprise, disgust, and contempt',
      'Anxiety, depression, stress, worry, panic, dread, terror',
      'Joy, peace, contentment, serenity, bliss, ecstasy, euphoria',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Ekman's cross-cultural research identified seven universal emotions with distinct facial expressions: happiness (raised cheeks, lip corners up), sadness (inner brow raise, lip corners down), fear (raised brows, widened eyes), anger (lowered brows, pressed lips), surprise (raised brows, dropped jaw), disgust (wrinkled nose, raised upper lip), and contempt (one-sided lip raise). Recognising these in colleagues enhances empathic accuracy.",
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Ekman micro-expressions',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 152,
    question:
      "An apprentice's work quality has dropped significantly over two weeks. Using empathic inquiry rather than immediate criticism, which approach is most emotionally intelligent?",
    options: [
      'Issue a formal warning about the declining quality',
      'Ignore it and hope it improves on its own',
      'Find a private moment and use open, non-judgemental inquiry: "I have noticed your work has not been at its usual standard recently. I am asking because I am concerned about you, not criticising. Is everything all right?" — using empathy to understand the root cause before deciding on a response',
      'Ask other workers if they know what is wrong with the apprentice',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This demonstrates empathic leadership: noticing a change (observation), expressing concern rather than criticism (empathy), creating psychological safety through private conversation (social skill), and seeking to understand before acting (perspective-taking). The declining work quality is a symptom — the cause might be personal difficulties, site bullying, health issues, or learning challenges. Empathy uncovers the root cause so the response can be appropriate.',
    section: 'Motivation & Empathy',
    difficulty: 'intermediate' as const,
    topic: 'Active listening',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 153,
    question:
      "How can Daniel Pink's three elements of intrinsic motivation (autonomy, mastery, purpose) be integrated with Self-Determination Theory's three needs (autonomy, competence, relatedness) to create a comprehensive motivation framework?",
    options: [
      'They cannot be integrated because they are competing theories',
      'Both theories share autonomy as a core element. SDT\'s "competence" maps closely to Pink\'s "mastery" (both involve developing skills and feeling effective). The integration comes through recognising that Pink\'s "purpose" and SDT\'s "relatedness" both address connection to something beyond the self — purpose through meaning, relatedness through people. Together they form a five-factor model: autonomy, mastery/competence, purpose, relatedness, and intrinsic engagement',
      "Pink's model replaces SDT entirely",
      "Only SDT is scientifically validated, so Pink's model should be ignored",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Integrating Pink and SDT creates a richer understanding: both agree on autonomy\'s importance. Pink\'s "mastery" and SDT\'s "competence" overlap but with different emphasis (mastery is about the journey of getting better; competence is about feeling effective now). Pink\'s "purpose" and SDT\'s "relatedness" are complementary — purpose connects to meaning, relatedness connects to people. An electrical team that provides choice (autonomy), skill development (mastery/competence), meaningful work (purpose), and social connection (relatedness) maximises intrinsic motivation.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Integrating Pink and SDT',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 154,
    question:
      'Flow states in a team context present unique challenges. What conditions must be present for a construction team to experience "group flow," and how does this relate to individual flow?',
    options: [
      'Group flow is impossible — flow is only an individual experience',
      'Group flow requires all individual flow conditions PLUS additional social conditions: shared goals, close listening, equal participation, familiarity with each other, open communication, forward momentum, and an element of risk. The team must balance individual autonomy with collective coordination, creating a state where the group achieves more than any individual could alone',
      'Group flow just means everyone happens to be in individual flow at the same time',
      'Group flow requires a competitive environment where team members push each other',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Keith Sawyer's research on group flow identified conditions beyond individual flow: shared goals, deep listening, equal participation, familiarity, open communication, forward momentum, and the potential for failure. In construction, a team installing a complex distribution board under time pressure might achieve group flow — each person anticipating others' needs, working in synchrony, communicating efficiently, and producing work better than any individual could manage alone.",
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Flow in team context',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 155,
    question:
      'A project manager applies the ABCDE model to a major project failure (a complete rewire requiring significant rework). The initial belief is "This project is a disaster and my career is over." After successful disputation, which response demonstrates genuine Energisation?',
    options: [
      'Feeling slightly less bad about the situation but still avoiding similar projects',
      'A genuine shift to: "This is the most challenging situation I have faced, but I now have a clear action plan to address the specific issues. I have identified three process improvements that will prevent recurrence. I feel motivated to apply these lessons, and this experience will make me a significantly more capable project manager" — with the motivation to act matching the new belief',
      'Pretending the failure never happened and moving on without learning',
      'Feeling energised but not taking any concrete action',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Genuine Energisation in the ABCDE model is not just feeling better — it produces concrete, motivated action. The successful disputation reframes the setback from catastrophic ("career over") to challenging but instructive. The Energisation manifests as: specific action plans, identified improvements, genuine forward-looking motivation, and recognition that the experience adds capability. This is Seligman\'s learned optimism in action — the emotion change drives behaviour change.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'ABCDE deep application',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 156,
    question:
      'Empathy fatigue (also called compassion fatigue) can occur in helping professions when the emotional cost of empathy becomes overwhelming. How might empathy fatigue manifest in a site supervisor responsible for apprentice welfare?',
    options: [
      'Empathy fatigue is not possible in construction settings',
      "The supervisor might notice: decreasing patience with apprentices' problems, emotional numbness when hearing about difficulties, cynicism about whether support makes a difference, withdrawal from mentoring conversations, and irritability — all signs that their empathic capacity is depleted and they need to restore their own emotional resources",
      'Empathy fatigue only affects medical professionals',
      'The supervisor would simply become a better listener due to practice',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Empathy fatigue is relevant in any role involving sustained empathic engagement. A site supervisor who mentors multiple apprentices absorbs significant emotional content. Signs include: reduced empathic capacity, emotional numbing, cynicism, avoidance of emotional conversations, and increased irritability. The remedy includes: setting empathic boundaries, self-care practices, peer support, and recognising that maintaining empathy long-term requires deliberate recovery.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Empathy fatigue management',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 157,
    question:
      'On a construction site with workers from six different countries, an electrician needs to communicate a safety concern to a colleague whose cultural background includes very different norms around hierarchy, directness, and emotional expression. What level of cultural empathy is required?',
    options: [
      'Cultural differences are irrelevant to safety — just state the facts directly',
      'Advanced cultural empathy: understanding that safety communication styles must be adapted to cultural context. In high power-distance cultures, a peer raising concerns directly may be uncomfortable. In indirect communication cultures, blunt safety warnings may cause face-loss. The electrician must find a culturally appropriate way to communicate urgency without causing shame, possibly involving the site supervisor or using visual demonstration rather than direct verbal confrontation',
      'Simply speak louder and more slowly to overcome the cultural barrier',
      'Avoid communicating the safety concern to prevent cultural misunderstanding',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cultural empathy at this level requires understanding Hofstede's cultural dimensions (power distance, individualism/collectivism, uncertainty avoidance) and how they affect communication. The safety message must be delivered effectively AND respectfully. This might mean: involving appropriate authority figures (respecting power distance), using indirect language or demonstration (respecting face-saving norms), or finding a bilingual colleague. Safety cannot be compromised, but the delivery method should be culturally empathic.",
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Cultural empathy complexity',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 158,
    question:
      "During a tense client meeting about project delays and budget overruns, the project manager notices the client's jaw tightening, arms crossing, and breathing becoming shallow — while the client's words remain calm and professional. What does this incongruence suggest, and how should the project manager respond?",
    options: [
      'The body language is irrelevant — focus only on the words',
      'The incongruence between calm words and stressed body language suggests the client is suppressing significant frustration or anxiety. The project manager should: acknowledge the difficulty of the situation empathically ("I can see this is a stressful situation, and I understand why"), address the emotional undercurrent rather than just the facts, and create space for the client to express genuine concerns — because unaddressed suppressed emotions often escalate',
      'Confront the client about the mismatch between their words and body language',
      "Mirror the client's body language to build unconscious rapport",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Reading incongruence between verbal and non-verbal communication is an advanced empathy skill. The physical signs (jaw tension, crossed arms, shallow breathing) indicate sympathetic nervous system activation — the client is stressed despite calm words. Addressing the emotional reality (not just the stated content) prevents suppressed frustration from building to a breaking point. The key is to create safety for authentic expression without forcing it.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Reading people in high-stakes scenarios',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 159,
    question:
      'Showing empathy toward someone you find difficult is one of the most challenging EI skills. A subcontractor who has repeatedly caused problems on site is now visibly distressed about a personal issue. What does advanced empathy require in this situation?',
    options: [
      'Ignoring their distress because they have been difficult in the past',
      'Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries',
      'Using their vulnerability as leverage to address the past problems',
      'Offering excessive help to compensate for your negative feelings about them',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Empathy with difficult people requires separating the behaviour from the person, managing your own emotional history with them (a self-regulation skill), and responding to the human being in front of you. This is where empathy becomes a choice rather than a natural response. Research shows that empathic responses during vulnerability can fundamentally shift relationship dynamics — creating a turning point in difficult working relationships.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Empathy with difficult people',
    category: 'Motivation & Empathy' as const,
  },
  {
    id: 160,
    question:
      "An electrical contractor is managing a team where morale is low after two failed inspections in one week. Integrating Seligman's learned optimism, Pink's Drive, and Csikszentmihalyi's flow theory, what is the most comprehensive motivational approach?",
    options: [
      'Offer a financial bonus for the next successful inspection',
      'Tell the team to "stay positive" and move on',
      'Address the 3 Ps first (the failures are specific and temporary, not permanent or pervasive), then restore intrinsic motivation: give the team autonomy in developing their own quality-check process (Pink), provide clear goals and feedback loops for each installation (flow conditions), and ensure the purpose of quality work is connected to genuine values (safety, professionalism). This multi-framework approach addresses both the setback response and the ongoing motivation system',
      'Replace the team members who made the errors',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This advanced scenario requires integrating three frameworks: (1) Seligman — counter the 3 Ps by framing failures as specific, temporary, and actionable; (2) Pink — restore autonomy (let team develop solutions), mastery (skill development), and purpose (connection to safety and professionalism); (3) Csikszentmihalyi — create flow conditions through clear goals and feedback. This multi-framework approach addresses both the immediate morale crisis and the systemic motivation architecture.',
    section: 'Motivation & Empathy',
    difficulty: 'advanced' as const,
    topic: 'Complex motivation-empathy scenarios',
    category: 'Motivation & Empathy' as const,
  },

  // -------------------------------------------------------------------------
  // Social Skills & Applying EI — Basic (161-176)
  // -------------------------------------------------------------------------
  {
    id: 161,
    question:
      'Assertive communication is a social skill that sits between passive and aggressive communication. Which response demonstrates assertive communication when a colleague keeps borrowing your tools without asking?',
    options: [
      'Saying nothing and hiding your tools (passive)',
      'Shouting at them in front of the team (aggressive)',
      'Saying privately: "When you take my tools without asking, I feel frustrated because I cannot find them when I need them. I would like you to ask first so I can plan around it" — clearly stating the behaviour, its impact, and the desired change without aggression',
      'Complaining about them to other colleagues (passive-aggressive)',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Assertive communication uses the pattern: Behaviour (what happened) → Impact (how it affects you) → Request (what you need). It respects both your own needs and the other person's dignity. The statement is specific, non-blaming, and action-oriented. This is a core social skill in EI — expressing needs directly without aggression or submission.",
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Assertive communication',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 162,
    question:
      'The DESC model is a structured assertiveness framework. What do the four letters stand for?',
    options: [
      'Demand, Explain, Suggest, Conclude',
      'Describe (the situation objectively), Express (how it affects you), Specify (what you want to happen), and Consequences (the positive outcomes of change)',
      'Deny, Escape, Surrender, Comply',
      'Discuss, Evaluate, Solve, Celebrate',
    ] as const,
    correctAnswer: 1,
    explanation:
      'DESC is a practical assertiveness framework: Describe (state the factual situation without judgement), Express (share how the situation makes you feel, using "I" statements), Specify (clearly state what change you are requesting), Consequences (explain the positive outcome if the change happens). This structured approach helps people communicate assertively even in difficult situations.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'DESC model',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 163,
    question:
      'The Thomas-Kilmann Conflict Mode Instrument (TKI) identifies five approaches to conflict. Which of these five modes involves high assertiveness AND high cooperativeness?',
    options: [
      'Avoiding — low assertiveness, low cooperativeness',
      'Competing — high assertiveness, low cooperativeness',
      'Collaborating — high assertiveness AND high cooperativeness, seeking a solution that fully satisfies both parties',
      'Accommodating — low assertiveness, high cooperativeness',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The five TKI modes are: Competing (high assertive, low cooperative), Collaborating (high assertive, high cooperative), Compromising (moderate both), Avoiding (low both), and Accommodating (low assertive, high cooperative). Collaborating seeks win-win solutions where both parties' needs are fully met. While it takes more time and effort, it produces the strongest outcomes and preserves relationships.",
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Thomas-Kilmann 5 modes',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 164,
    question:
      "Amy Edmondson's research on psychological safety found that the highest-performing teams shared one key characteristic. What was it?",
    options: [
      'They had the most experienced members',
      'They had the highest combined IQ',
      'Team members felt safe to take interpersonal risks — to speak up, ask questions, admit mistakes, and propose ideas without fear of punishment or humiliation',
      'They had the strictest discipline and rules',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Edmondson's research (and later Google's Project Aristotle) found that psychological safety — the shared belief that the team is safe for interpersonal risk-taking — was the number one predictor of team effectiveness. In construction, this means: apprentices can ask questions without ridicule, workers can report near-misses without blame, and anyone can raise safety concerns without fear. This is a social skill that leaders create through consistent behaviour.",
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Psychological safety',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 165,
    question:
      'Goleman identified six leadership styles based on emotional intelligence. Which style involves creating harmony and building emotional bonds?',
    options: [
      'Pacesetting — setting high standards and expecting self-direction',
      'Commanding — demanding immediate compliance',
      'Affiliative — creating harmony and building emotional bonds, with the motto "people come first"',
      'Visionary — mobilising people toward a vision',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Goleman's six EI-based leadership styles are: Visionary (mobilising toward a vision), Coaching (developing people for the future), Affiliative (creating harmony and bonds), Democratic (building consensus through participation), Pacesetting (setting high performance standards), and Commanding (demanding compliance in crisis). The affiliative style is most effective for healing team rifts, building morale, and strengthening connections.",
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Goleman 6 leadership styles',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 166,
    question:
      'Influence without authority means persuading others when you do not have formal power over them. Which approach is most effective for an electrician trying to influence a plumber to adjust their pipe routing?',
    options: [
      'Threatening to report them to the site manager',
      "Explaining how the adjusted routing would benefit both trades — showing that the change makes the plumber's work easier while solving the cable routing problem, and offering to help with the adjustment",
      'Going ahead and moving the pipes yourself',
      'Complaining about the plumber to other trades',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Influence without authority relies on: finding mutual benefit (how does the change help THEM?), demonstrating respect for their expertise, offering reciprocity (help in return), and building the case logically. This is a core social skill in construction where multiple trades must coordinate without formal authority over each other. Coercion (threatening) and bypassing (doing it yourself) damage the working relationship.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Influence without authority',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 167,
    question:
      'What is the primary purpose of active listening as a social skill (as distinct from its role in empathy)?',
    options: [
      'To appear interested while planning your response',
      'As a social skill, active listening builds trust, reduces misunderstanding, and creates the psychological safety needed for effective collaboration — the speaker feels genuinely heard, which strengthens the working relationship and increases the quality of information shared',
      'To gather information that can be used against the speaker later',
      'To wait politely before telling the speaker what they should do',
    ] as const,
    correctAnswer: 1,
    explanation:
      'While active listening serves empathy (understanding feelings), as a social skill it serves relationship and team function: it builds trust (the speaker feels valued), reduces errors (accurate understanding prevents miscommunication), creates safety (people share more openly), and models respectful communication for the whole team. These social outcomes make active listening a foundational team skill, not just a personal empathy practice.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Active listening',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 168,
    question:
      'What is the first step in basic conflict resolution according to most EI frameworks?',
    options: [
      'Determine who is right and who is wrong',
      'Separate the people from the problem — acknowledge that both parties have legitimate perspectives and focus on the issue rather than personal attacks or character judgements',
      'Escalate immediately to management',
      'Avoid the conflict until it resolves itself',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Fisher and Ury\'s principled negotiation framework (from "Getting to Yes") establishes the foundational step: separate people from problems. This EI-based approach recognises that conflict becomes destructive when it becomes personal. By acknowledging both perspectives and focusing on the issue, you create space for collaborative problem-solving. This requires self-regulation (managing your own frustration) and empathy (understanding the other person\'s position).',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Conflict resolution basics',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 169,
    question:
      'How does emotional intelligence enhance teamwork beyond basic coordination of tasks?',
    options: [
      'EI has no effect on teamwork — only technical skills matter',
      'EI enhances teamwork by: enabling trust (through self-regulation and reliability), improving communication (through empathy and active listening), facilitating constructive conflict (through assertiveness and perspective-taking), and creating psychological safety (through social awareness) — transforming a group of individuals into a genuinely high-performing team',
      'EI only matters for team leaders, not team members',
      'EI makes teamwork slower because time is spent on feelings instead of work',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Research consistently shows that teams with higher collective EI outperform teams with higher collective IQ. EI enables the relational infrastructure of effective teamwork: trust allows vulnerability and risk-taking, empathic communication reduces misunderstanding, constructive conflict produces better decisions, and psychological safety enables learning from mistakes. In construction, where multi-trade coordination is essential, team EI directly affects quality and safety.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Teamwork and EI',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 170,
    question:
      'De-escalation is a critical social skill in construction environments where tensions can run high. Which technique is most effective for de-escalating an angry colleague?',
    options: [
      'Telling them to calm down',
      'Matching their energy and volume to show you take them seriously',
      'Speaking in a calm, measured tone, acknowledging their feeling ("I can see you are really frustrated about this"), asking them to help you understand the specific issue, and allowing them to express their concern fully before responding — lowering the emotional temperature through validation and genuine listening',
      'Walking away immediately without saying anything',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective de-escalation uses several EI skills simultaneously: self-regulation (maintaining your own calm tone despite the other person\'s intensity), empathy (acknowledging their emotional state), active listening (allowing full expression), and social awareness (reading when the emotion is subsiding). Critically, telling someone to "calm down" almost always escalates the situation because it invalidates their emotional experience.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'De-escalation',
    category: 'Social Skills & Applying EI' as const,
  },

  {
    id: 171,
    question:
      'Robert Cialdini identified six principles of ethical persuasion. Which principle is demonstrated when an electrician helps a plumber with a difficult task, and the plumber later willingly adjusts their pipe routing in return?',
    options: [
      'Authority — the electrician has more expertise',
      'Reciprocity — people naturally feel compelled to return favours, so helping first creates a genuine willingness to cooperate',
      'Scarcity — the plumber feels they might lose the opportunity',
      'Social proof — other trades are already cooperating',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Cialdini\'s reciprocity principle states that people feel a natural obligation to return favours. In construction, this is a powerful ethical influence tool: genuinely helping other trades creates a cooperative dynamic that benefits everyone. The key word is "ethical" — this is about genuine helpfulness creating genuine goodwill, not strategic manipulation.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Cialdini principles',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 172,
    question:
      'Servant leadership, as described by Robert Greenleaf, prioritises serving the needs of team members. How does this relate to EI-based social skills?',
    options: [
      'Servant leadership contradicts EI because leaders should focus on results, not people',
      "Servant leadership embodies advanced EI: it requires empathy (understanding team needs), self-regulation (managing ego and the desire to command), motivation (finding purpose in developing others), and social skills (creating environments where people thrive) — the leader's primary role is to remove obstacles and enable their team's success",
      "Servant leadership means doing everyone's work for them",
      'Servant leadership only works in non-profit organisations',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Servant leadership is deeply rooted in EI. The servant-leader uses empathy to understand what their team needs, self-regulation to manage ego (leading by serving rather than commanding), internal motivation (finding fulfilment in others' growth), and advanced social skills (creating conditions for team flourishing). In construction, this might mean a foreman who ensures their team has proper tools, clear instructions, and support before focusing on their own tasks.",
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Servant leadership',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 173,
    question: 'What are the key components of an effective EI development plan?',
    options: [
      'Just reading a book about emotional intelligence',
      'A structured plan that includes: self-assessment (identifying current EI strengths and gaps), specific goals (which competencies to develop), practice opportunities (real situations to apply new skills), feedback mechanisms (trusted people who will give honest observations), reflection practices (regular review of progress), and accountability (commitments to specific actions with review dates)',
      'Attending a single workshop and considering yourself trained',
      'Waiting for EI to develop naturally with age',
    ] as const,
    correctAnswer: 1,
    explanation:
      'EI development requires deliberate practice, not passive learning. An effective plan includes all six components: assessment (knowing where you are), goals (knowing where you want to be), practice (applying skills in real situations), feedback (external perspective on blind spots), reflection (processing experiences), and accountability (maintaining commitment). Research shows EI can be developed at any age with sustained, intentional effort.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'EI development plan basics',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 174,
    question:
      'When setting goals for EI development, why is the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound) important?',
    options: [
      'SMART goals are only relevant for technical skills, not emotional ones',
      'SMART goals transform vague EI intentions ("I want to be more empathetic") into actionable commitments ("I will practise active listening in every team meeting for the next 4 weeks, paraphrasing at least once per conversation, and ask my colleague for feedback on my listening quality each Friday")',
      'SMART goals are too rigid for emotional development',
      'EI development does not need goals — it happens naturally',
    ] as const,
    correctAnswer: 1,
    explanation:
      'SMART goals prevent EI development from remaining a vague aspiration. "Be more empathetic" is unmeasurable and vague. "Practise active listening by paraphrasing in every team meeting for 4 weeks, with weekly feedback from a trusted colleague" is specific, measurable, achievable, relevant, and time-bound. This structured approach brings the same rigour to emotional development that electricians already apply to technical skill development.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'SMART goals for EI',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 175,
    question:
      'Why are accountability structures important for EI development, and what might an effective accountability structure look like?',
    options: [
      'Accountability is not needed — people can develop EI entirely on their own',
      'Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals',
      'Accountability means having someone punish you when you fail to improve',
      'Reading about EI is sufficient accountability',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Changing emotional habits requires sustained effort against deeply ingrained patterns. Accountability structures provide: external perspective (others notice changes we miss), commitment devices (promising someone increases follow-through), reflection prompts (regular check-ins trigger review), and encouragement (support during difficult changes). Without accountability, EI development goals typically fade within weeks.',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Accountability structures',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 176,
    question:
      'How does emotional intelligence apply to written communication in construction (e.g., emails, site reports, messages)?',
    options: [
      'EI is irrelevant to written communication — only face-to-face matters',
      'Written communication carries emotional tone even without non-verbal cues. EI in writing means: considering how the reader will feel when they read it, choosing words that are clear and respectful, avoiding language that could be interpreted as blame or aggression, and re-reading messages before sending to check for unintended emotional impact — especially important when conveying criticism or bad news',
      'Written communication should be purely technical with no emotional consideration',
      'Emails should always include emojis to convey emotion',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Written communication lacks the tone, facial expression, and body language that soften spoken words — making EI even more important, not less. A message that feels neutral to the writer can read as critical or cold to the recipient. EI in writing involves: empathic anticipation (how will this be received?), tone management (does this convey respect?), clarity (does this prevent misinterpretation?), and the pause-and-review habit (re-reading before sending).',
    section: 'Social Skills & Applying EI',
    difficulty: 'basic' as const,
    topic: 'Written communication EI',
    category: 'Social Skills & Applying EI' as const,
  },

  // -------------------------------------------------------------------------
  // Social Skills & Applying EI — Intermediate (177-192)
  // -------------------------------------------------------------------------
  {
    id: 177,
    question:
      'Apply the DESC model to this situation: a fellow electrician regularly arrives late to site, meaning you have to start preparatory work alone. Write out what a DESC response would look like.',
    options: [
      'D: "You are always late and it is really annoying"',
      'D: "Over the last two weeks, you have arrived 20-30 minutes late on four occasions." E: "This means I start the prep work alone, which is frustrating and puts us behind schedule." S: "I need you to arrive by the agreed start time, or let me know in advance if you will be delayed." C: "If we start together, we will finish the prep in half the time and both have a smoother day."',
      'D: "Everyone has noticed you are always late"',
      'D: "I do not want to make a big deal of this but you are sometimes a bit late"',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Effective DESC application requires: Describe (specific, factual, non-judgemental — "four occasions" not "always"), Express ("I" statements about impact — "I start alone" not "you leave me"), Specify (clear, actionable request — arrive on time or communicate delays), Consequences (positive framing — "we will both benefit" not "or else"). This transforms a potentially confrontational conversation into a structured, respectful exchange.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'DESC model application',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 178,
    question:
      'The Thomas-Kilmann model distinguishes between collaborating (high assertive, high cooperative) and compromising (moderate assertive, moderate cooperative). When should you collaborate versus compromise on a construction site?',
    options: [
      'Always collaborate — compromising is a sign of weakness',
      'Collaborate when the issue is important to both parties and there is time to find a solution that fully meets both needs (e.g., designing a shared services route). Compromise when time is limited and a "good enough" solution is acceptable to both parties (e.g., sharing a limited workspace). The key difference is that collaboration seeks to expand the pie while compromise divides it',
      'Always compromise — collaboration takes too long on construction sites',
      'There is no practical difference between the two approaches',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The crucial distinction is: collaborating creates value (both parties get 100%), while compromising divides value (both parties get 50-70%). Collaboration is worth the time investment when: the issue is important, the relationship matters long-term, and creative solutions are possible. Compromise is appropriate when: time is limited, the stakes are moderate, and a partial solution is acceptable. Skilled conflict managers match the approach to the situation.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'TKI collaborating vs compromising',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 179,
    question:
      'Patrick Lencioni identified five dysfunctions of a team, forming a pyramid where each dysfunction builds on the one below. What is the foundational dysfunction — the one that all others rest upon?',
    options: [
      'Inattention to results',
      'Avoidance of accountability',
      'Absence of trust — without trust, team members will not be vulnerable with each other, leading to fear of conflict, lack of commitment, avoidance of accountability, and ultimately inattention to collective results',
      'Fear of conflict',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Lencioni's pyramid of dysfunctions is: (1) Absence of trust (foundation), (2) Fear of conflict, (3) Lack of commitment, (4) Avoidance of accountability, (5) Inattention to results. Trust is foundational because without it, people will not engage in honest conflict (they fear vulnerability), which means decisions lack genuine buy-in (commitment), which means people avoid holding each other accountable, which means results suffer. Building trust is therefore the first priority for any team leader.",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Lencioni 5 dysfunctions',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 180,
    question:
      'Goleman distinguishes between resonant leadership (which creates positive emotional climates) and dissonant leadership (which creates negative ones). Which of his six styles are considered dissonant?',
    options: [
      'Visionary and coaching',
      'Pacesetting and commanding — pacesetting creates anxiety through unrealistic expectations when overused, and commanding creates fear through coercive demands. Both have narrow appropriate applications but are destructive as default styles',
      'Affiliative and democratic',
      'All six styles are resonant when used properly',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Goleman's research found that four styles are generally resonant (visionary, coaching, affiliative, democratic) and two are generally dissonant (pacesetting, commanding). Pacesetting creates pressure through impossibly high standards; commanding creates compliance through intimidation. Both have legitimate but narrow uses: pacesetting for highly motivated, competent teams needing fast results; commanding for genuine emergencies requiring immediate action. Overuse of either erodes team EI and performance.",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Resonant vs dissonant leadership',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 181,
    question:
      "Boyatzis' Intentional Change Theory (ICT) outlines five discoveries for sustained personal change. What is the first discovery?",
    options: [
      'Identifying your current weaknesses',
      'The Ideal Self — developing a clear, compelling vision of who you want to become, which creates positive emotional energy (the Positive Emotional Attractor) that sustains the motivation for change',
      'Getting feedback from others about what to change',
      'Making a detailed action plan',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Boyatzis' ICT identifies five discoveries: (1) The Ideal Self (vision of who you want to become), (2) The Real Self (honest assessment of who you are now), (3) The Learning Agenda (bridging the gap through specific development goals), (4) Experimentation and Practice (trying new behaviours), (5) Trusting Relationships (support for the change process). Starting with the Ideal Self generates the positive emotional energy needed to sustain difficult change.",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Boyatzis Intentional Change Theory',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 182,
    question:
      "Kolb's experiential learning cycle has four stages. How does this cycle support EI development?",
    options: [
      "Kolb's cycle is only relevant for technical learning",
      'The four stages — concrete experience (having an emotional interaction), reflective observation (thinking about what happened and how you felt), abstract conceptualisation (identifying patterns and principles), and active experimentation (trying a new approach next time) — create a systematic method for learning from emotional experiences rather than repeating the same patterns',
      'EI cannot be learned through experience',
      "Kolb's cycle suggests that reading about EI is sufficient for development",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Kolb\'s cycle transforms everyday emotional experiences into learning opportunities. For EI: (1) Experience — a difficult conversation on site, (2) Reflect — "I noticed I became defensive when challenged," (3) Conceptualise — "Defensiveness is an ego-protection response; I could use cognitive reappraisal instead," (4) Experiment — "Next time I am challenged, I will pause, breathe, and ask a clarifying question before responding." This cycle, repeated consistently, builds EI competence through deliberate practice.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Kolb learning cycle',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 183,
    question:
      'A 90-day EI development plan is a practical structure for building specific competencies. What should the three phases typically cover?',
    options: [
      'Phase 1: Read a book. Phase 2: Read another book. Phase 3: Take a test.',
      'Phase 1 (Days 1-30): Foundation — self-assessment, identify target competency, establish baseline, begin daily reflection practice, and find an accountability partner. Phase 2 (Days 31-60): Practice — apply new skills in specific situations, gather feedback, adjust approach based on results. Phase 3 (Days 61-90): Integration — embed new behaviours into routine, measure progress against baseline, plan for ongoing development',
      'Phase 1: Awareness. Phase 2: More awareness. Phase 3: Complete mastery.',
      'All development should happen in the first week with no follow-up needed.',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A structured 90-day plan provides the sustained, phased approach that EI development requires. Phase 1 establishes the foundation (you cannot improve what you have not measured). Phase 2 provides deliberate practice (applying theory in real situations with feedback). Phase 3 ensures integration (new behaviours become habitual rather than effortful). This mirrors how electricians develop technical skills: learn, practise, embed.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: '90-day development plan',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 184,
    question:
      'The concept of "leading without a title" (Robin Sharma) suggests that leadership is a behaviour, not a position. How does EI enable leading without a title on a construction site?',
    options: [
      'It is not possible to lead without formal authority on a construction site',
      'EI enables informal leadership through: influence without authority (social skills), building trust through consistent, regulated behaviour (self-regulation), motivating others through enthusiasm and competence (motivation), understanding and responding to team needs (empathy), and modelling emotionally intelligent behaviour that others naturally follow (self-awareness)',
      'Leading without a title means telling people what to do even when it is not your role',
      'Only formally appointed supervisors should attempt to lead',
    ] as const,
    correctAnswer: 1,
    explanation:
      'EI provides all the tools needed for informal leadership: emotional self-awareness gives authenticity, self-regulation gives reliability, motivation gives energy that inspires others, empathy gives the ability to understand and respond to needs, and social skills give the ability to influence, communicate, and resolve conflicts. In construction, the most respected team members are often not the formally appointed leaders but those who demonstrate these qualities consistently.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Leading without title',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 185,
    question:
      'ACAS (Advisory, Conciliation and Arbitration Service) provides UK workplace guidance on handling conflict. Their principles align with which EI-based approach to conflict resolution?',
    options: [
      'Avoiding conflict entirely until it goes away',
      'ACAS promotes early, informal resolution through open conversation — addressing issues promptly, listening to all perspectives, seeking mutually acceptable solutions, and using formal processes only when informal approaches have been exhausted. This aligns with EI-based conflict resolution that prioritises empathic dialogue, assertive communication, and collaborative problem-solving',
      'Escalating all conflicts immediately to formal disciplinary proceedings',
      'Letting the most senior person decide the outcome',
    ] as const,
    correctAnswer: 1,
    explanation:
      "ACAS's approach to workplace conflict mirrors EI principles: address issues early (before they escalate), use informal conversation first (empathic dialogue), listen to all parties (perspective-taking), seek mutually acceptable outcomes (collaboration), and maintain dignity and respect throughout (emotional regulation). This is the UK legal and best-practice framework for workplace conflict resolution.",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'ACAS principles',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 186,
    question:
      'Digital communication (emails, WhatsApp, Teams) removes most non-verbal cues. What EI skills are most critical for effective digital communication in construction?',
    options: [
      'Digital communication does not require EI — just be clear and factual',
      "Empathic anticipation (imagining how the reader will interpret the message without tone of voice or body language), deliberate tone management (choosing words that convey respect and warmth that would normally come through voice), emotional impulse control (never sending when angry), and the pause-and-review habit (re-reading every message from the recipient's perspective before sending)",
      'Using as many exclamation marks as possible to convey enthusiasm',
      'Keeping all digital communication to single-word responses',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Digital communication amplifies EI challenges because: tone is easily misread, urgency can feel like aggression, brevity can feel like dismissal, and there is no immediate feedback to correct misunderstanding. The four skills identified — empathic anticipation, tone management, impulse control, and pause-and-review — compensate for the absence of non-verbal cues that normally smooth face-to-face communication.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Digital communication',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 187,
    question:
      'EI in client conversations is particularly important when delivering unwelcome news (e.g., discovering additional work needed during a rewire). Which approach demonstrates high EI?',
    options: [
      'Sending a text message with the additional costs to avoid a difficult conversation',
      'Explaining the situation in person, leading with the safety reason ("I have found a section of wiring that does not meet current safety standards"), showing the specific issue where possible, expressing empathy for the inconvenience ("I understand this is not what you were expecting"), presenting options rather than a single demand, and giving the client time to process before requiring a decision',
      'Adding the extra work to the invoice without discussing it first',
      'Minimising the issue to avoid upsetting the client',
    ] as const,
    correctAnswer: 1,
    explanation:
      "High-EI client communication involves: face-to-face delivery for difficult news (demonstrating respect), leading with safety rationale (providing context), showing physical evidence (building credibility), expressing empathy (acknowledging the emotional impact), offering choices (preserving the client's sense of control), and allowing processing time (respecting their emotional reaction). This approach builds trust even when the news is unwelcome.",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'EI in client conversations',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 188,
    question:
      'In Lencioni\'s model, "fear of conflict" is the second dysfunction. Why is the ABSENCE of conflict actually more dangerous than the presence of constructive conflict in a team?',
    options: [
      'Absence of conflict means the team is functioning perfectly',
      'When teams avoid conflict, important issues go unaddressed, decisions are made without genuine input (leading to lack of commitment), underlying tensions fester and eventually explode destructively, and the quality of decisions suffers because ideas are not challenged and refined through debate. Healthy teams have MORE open conflict, not less — but it is constructive, issue-focused conflict',
      'Conflict always damages team relationships regardless of how it is handled',
      'Teams should manufacture conflict even when none exists naturally',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Lencioni argues that "artificial harmony" (conflict avoidance) is more destructive than open disagreement. Without constructive conflict: bad ideas go unchallenged, team members do not genuinely commit to decisions they did not have input on, passive-aggressive behaviour replaces honest dialogue, and innovation is stifled. Psychologically safe teams engage in vigorous debate about ideas while maintaining respect for people — this requires high collective EI.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Fear of conflict',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 189,
    question:
      "Goleman's coaching leadership style involves developing people for the future. How does this style differ from the affiliative style, and when is each most appropriate?",
    options: [
      'They are identical — both focus on people over results',
      'Coaching focuses on individual development (asking "what do you want to become?" and helping bridge the gap through challenging assignments and feedback), while affiliative focuses on team harmony and emotional bonds (asking "how is everyone feeling?" and strengthening connections). Coaching is most appropriate for developing potential; affiliative is most appropriate for healing rifts or building morale',
      'Coaching is always superior to affiliative leadership',
      'Affiliative leadership is just coaching with a different name',
    ] as const,
    correctAnswer: 1,
    explanation:
      'While both styles are people-focused, their objectives differ: coaching develops capability (the leader invests time in identifying and stretching individual potential), while affiliative builds connection (the leader creates emotional bonds and harmony). A site supervisor might use coaching with a promising apprentice (stretching their skills through progressively challenging tasks) and affiliative with a demoralised team (rebuilding cohesion after a setback). Skilled leaders flex between styles.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Coaching leadership style',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 190,
    question:
      'Goleman warns about the risks of overusing the pacesetting style (leading by setting high standards and expecting others to follow). What typically happens when a construction manager relies exclusively on pacesetting?',
    options: [
      'The team consistently exceeds expectations and morale is high',
      'Initially, work quality may be high, but over time: team members feel overwhelmed and inadequate, initiative decreases (people fear not meeting the standard), morale drops, burnout increases, and the leader becomes a bottleneck because they end up doing everything themselves rather than trusting others — ultimately reducing both performance and wellbeing',
      'Pacesetting has no negative effects if the leader is genuinely skilled',
      'The team adapts to the high standards and becomes self-motivated',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Goleman\'s research found that pacesetting is the most commonly overused style by technically excellent people promoted to leadership (common in construction). The pattern: the leader\'s high standards become the only acceptable standard, others feel they can never measure up, initiative dies ("why bother trying — they will redo it anyway"), and the leader becomes exhausted trying to maintain everything personally. The remedy is developing coaching and delegating styles.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Pace-setting risks',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 191,
    question:
      'Boyatzis\' Intentional Change Theory identifies the importance of the "Positive Emotional Attractor" (PEA) versus the "Negative Emotional Attractor" (NEA) in sustaining change. What is the difference and why does it matter for EI development?',
    options: [
      'PEA and NEA are interchangeable — both motivate change equally',
      'PEA is activated by hope, compassion, and vision of the ideal self — it opens neural pathways for learning and change. NEA is activated by fear, anxiety, and focus on problems — it triggers defensiveness and closes learning pathways. EI development is more sustainable when driven by PEA ("I want to become a better leader") than NEA ("I must fix my weaknesses or I will fail")',
      'NEA is more effective for professional development because fear motivates action',
      'PEA only works for naturally optimistic people',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Boyatzis' neuroscience research shows that PEA activates the parasympathetic nervous system and neural circuits associated with open attention, cognitive flexibility, and positive emotion — facilitating learning. NEA activates the sympathetic nervous system and circuits associated with narrow attention and defensiveness — inhibiting learning. For EI development, this means starting with a compelling vision of who you want to become (PEA) is neurobiologically more effective than starting with what is wrong with you (NEA).",
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Boyatzis Intentional Change Theory',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 192,
    question:
      "Written communication on construction sites often involves reporting issues or raising concerns. Applying EI, which email approach is more effective when reporting a subcontractor's quality issue to a project manager?",
    options: [
      '"The sparks on Block B are doing a terrible job again. Their work is shoddy and they clearly do not care about quality."',
      '"I have identified three specific quality issues on the Block B first-fix installation: [list with photos]. I have discussed these with the subcontractor\'s supervisor, who has agreed to address items 1 and 2 by Friday. Item 3 may need your input as it relates to the specification. Happy to discuss further." — factual, solution-oriented, and respectful of all parties',
      '"FYI — problems on Block B. Someone needs to sort it out."',
      '"Everything on Block B is fine, no issues to report" (avoiding the difficult conversation)',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The EI-informed email is: specific (three identified issues, not vague complaints), evidence-based (photos), solution-oriented (already initiated resolution for two items), respectful (no character attacks on the subcontractor), clear about what is needed from the recipient (input on item 3), and professional in tone. This approach is more likely to achieve resolution and maintain working relationships than emotive, blaming, or avoidant alternatives.',
    section: 'Social Skills & Applying EI',
    difficulty: 'intermediate' as const,
    topic: 'Digital communication',
    category: 'Social Skills & Applying EI' as const,
  },

  // -------------------------------------------------------------------------
  // Social Skills & Applying EI — Advanced (193-200)
  // -------------------------------------------------------------------------
  {
    id: 193,
    question:
      'A site manager faces three simultaneous challenges: a client escalating a complaint, an apprentice struggling with mental health, and two subcontractors in open conflict. Each situation requires a different Goleman leadership style. Which combination is most appropriate?',
    options: [
      'Use the commanding style for all three — take control and give orders',
      'Client: visionary (redirect focus to the project outcome and shared goals), Apprentice: coaching combined with affiliative (develop their coping strategies while showing genuine care for their wellbeing), Subcontractors: democratic for initial conflict resolution (hearing both perspectives) shifting to commanding only if safety is at risk — demonstrating style-flexing based on situational needs',
      'Use the affiliative style for all three — focus on harmony',
      'Delegate all three situations to someone else',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Advanced leadership requires style-flexing — matching the leadership approach to the specific situation and person. The client needs visionary leadership (redirecting from complaints to shared outcomes). The apprentice needs coaching (development) and affiliative (emotional support) in combination. The subcontractors need democratic engagement (being heard) with commanding held in reserve for safety issues. This reflects the highest level of EI-based social skills — reading each situation and adapting in real time.',
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Complex leadership scenarios',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 194,
    question:
      'Integrating all five EI domains, describe the complete EI process when an electrician discovers that a regulation they have been following has been updated (e.g., BS 7671 amendment). How do all five domains work together?',
    options: [
      'Only self-regulation is relevant when handling regulatory changes',
      'Self-Awareness: recognise the emotional response (possibly frustration or anxiety about change). Self-Regulation: manage the resistance impulse and reappraise the change as professional development. Motivation: connect the update to professional purpose and mastery. Empathy: understand that colleagues may be at different stages of acceptance. Social Skills: communicate the change constructively, help the team adapt, and create a learning environment for the new requirements',
      'Only the social skills domain is relevant because the change affects how you work with others',
      'EI domains operate independently and never interact',
    ] as const,
    correctAnswer: 1,
    explanation:
      "This question demonstrates how all five EI domains form an integrated system. The emotional response to change cascades through all domains: awareness (noticing the reaction), regulation (managing it), motivation (finding purpose in it), empathy (understanding others' reactions), and social skills (facilitating collective adaptation). This integration is the hallmark of full EI competence — no domain operates in isolation.",
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Integrating all 5 EI domains',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 195,
    question:
      'Long-term EI development follows a pattern similar to the "conscious competence" learning model. What are the four stages, and what does the final stage look like for EI?',
    options: [
      'EI development is a linear process with a clear endpoint',
      'The four stages are: (1) Unconscious incompetence (not aware of EI gaps), (2) Conscious incompetence (aware of gaps but not yet skilled), (3) Conscious competence (able to use EI skills with deliberate effort), (4) Unconscious competence (EI skills are automatic and natural). The final stage looks like effortlessly reading emotional situations, naturally regulating responses, and instinctively supporting others — EI becomes who you are, not what you do',
      'EI development only has two stages: not knowing and knowing',
      'Most people reach unconscious competence within a few weeks of training',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The conscious competence model maps perfectly onto EI development. Most people begin at unconscious incompetence (not aware they lack EI skills). Training moves them to conscious incompetence (recognising gaps). Practice develops conscious competence (using skills deliberately). Sustained practice over months/years develops unconscious competence (skills become automatic). The final stage is visible in leaders who naturally create psychological safety without thinking about it — their EI is fully integrated into their character.',
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'EI development long-term',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 196,
    question:
      'Creating psychological safety (Edmondson) requires consistent leader behaviour over time. Which set of actions would most effectively build psychological safety in a construction team?',
    options: [
      'Setting strict rules about what team members can and cannot say',
      'Consistently demonstrating: (1) framing work as a learning problem ("what can we learn from this?"), (2) acknowledging your own fallibility ("I may have missed something — what do you see?"), (3) modelling curiosity by asking genuine questions, (4) responding to mistakes with inquiry rather than blame, (5) following through on commitments made when people do speak up, and (6) explicitly thanking people for raising concerns even when the news is unwelcome',
      'Telling the team "you can trust me" without changing any behaviour',
      'Avoiding all discussion of mistakes or problems',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Edmondson's research identifies specific leader behaviours that build psychological safety. The key insight is that safety is built through consistent behaviour patterns, not declarations. Every time a leader responds to vulnerability with support (rather than punishment), safety increases. Every time they respond with blame, safety decreases. On construction sites, this means: near-miss reports are thanked (not punished), questions are welcomed (not ridiculed), and mistakes are treated as learning opportunities (not career-enders).",
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Psychological safety creation',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 197,
    question:
      'A workplace conflict between two electricians has been simmering for weeks and now threatens project delivery. The conflict involves both a legitimate technical disagreement AND a personal relationship breakdown. Which TKI modes might need to be used in sequence?',
    options: [
      'Use avoiding for everything — the conflict will resolve itself',
      'Start with accommodating to let the louder person win',
      "Phase 1: Temporary avoiding (separate the parties to prevent escalation while you prepare). Phase 2: Accommodating toward emotional needs (acknowledge both parties' feelings before addressing content). Phase 3: Collaborating on the technical issue (bring both parties together to find the best technical solution). Phase 4: If collaboration stalls on minor points, compromising to maintain progress. This multi-phase approach addresses both the emotional and technical dimensions",
      'Use competing to force the technically correct solution regardless of the relationship',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Complex conflicts rarely resolve through a single TKI mode. This scenario requires sequencing: avoiding (strategic pause to prevent further escalation), accommodating (validating emotions to reduce defensiveness), collaborating (finding the best technical solution together), and potentially compromising (resolving minor sticking points). This approach recognises that the emotional dimension must be addressed BEFORE the technical dimension — people cannot collaborate effectively while their amygdalae are activated.',
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Conflict requiring multiple TKI modes',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 198,
    question:
      'How does emotional intelligence directly contribute to safety culture on construction sites, beyond just following HSE regulations?',
    options: [
      'EI has no connection to safety — safety is purely a technical and regulatory matter',
      'EI creates the psychological infrastructure for safety culture: self-awareness enables recognition of when fatigue or distraction creates risk, self-regulation prevents shortcuts under pressure, motivation sustains safety commitment even without supervision, empathy enables understanding of why others take risks (rather than just punishing them), and social skills create the communication culture where anyone can stop unsafe work without fear. Safety culture IS emotional culture',
      'EI only matters for office-based safety, not site safety',
      'Safety culture is created entirely through rules and penalties',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Safety culture research (e.g., Hudson's safety culture ladder) shows that the most evolved safety cultures are generative — where safety information flows freely, people are rewarded for reporting problems, and everyone takes personal responsibility. Every aspect of this requires EI: the self-awareness to recognise personal risk states, the self-regulation to resist production pressure, the empathy to understand human factors, and the social skills to create reporting cultures. EI IS the foundation of advanced safety culture.",
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'EI and safety culture',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 199,
    question:
      'Applying servant leadership (Greenleaf) through an EI lens to construction management, which behaviour best demonstrates the integration of both frameworks?',
    options: [
      'Making all decisions yourself to protect your team from difficulty',
      'Starting each week by asking your team: "What obstacles are you facing that I can help remove?" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves',
      'Servant leadership means letting the team do whatever they want',
      'Servant leadership is impractical on construction sites where strong direction is needed',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Servant leadership through an EI lens combines: empathy (understanding real needs, including emotional ones), self-regulation (managing the ego that wants to command and control), coaching (developing others\' capabilities rather than creating dependency), social skills (removing obstacles through influence and facilitation), and consistent follow-through (building trust through reliability). The question "What obstacles can I help remove?" embodies the servant-leader approach — the leader exists to serve the team\'s success.',
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Servant leadership through EI lens',
    category: 'Social Skills & Applying EI' as const,
  },
  {
    id: 200,
    question:
      'At the end of a comprehensive EI programme, an electrician is asked to demonstrate that they can integrate ALL five EI domains in a single workplace scenario. A client calls, very upset, saying their new consumer unit is making a buzzing noise and they are afraid it might be dangerous. Trace through all five EI domains in the ideal response.',
    options: [
      'Just tell the client it is probably fine and to stop worrying',
      'Self-Awareness: notice your own stress response to the urgent call and any defensive thoughts ("my installation was fine"). Self-Regulation: manage the stress, resist defensiveness, and stay calm and professional. Motivation: connect to your core purpose — client safety and quality of service. Empathy: genuinely understand the client\'s fear (they do not have technical knowledge; to them, buzzing = danger) and validate it. Social Skills: communicate reassuringly ("I understand this is worrying — you are right to call"), ask clear diagnostic questions, arrange a prompt visit, and follow up after resolution to rebuild confidence. Every domain contributes to the response',
      'Send the client a technical explanation of why consumer units sometimes buzz',
      'Tell the client to call the emergency services as a precaution',
    ] as const,
    correctAnswer: 1,
    explanation:
      "This capstone question demonstrates how all five EI domains integrate in real-time professional practice: Self-awareness (noticing internal reactions), Self-regulation (managing defensiveness and stress), Motivation (connecting to purpose), Empathy (understanding the client's experience), and Social skills (communicating effectively and taking appropriate action). This integration happens in seconds in a skilled practitioner — it is the hallmark of fully developed emotional intelligence, where all five domains work together seamlessly.",
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Whole-course integration scenarios',
    category: 'Social Skills & Applying EI' as const,
  },
];
