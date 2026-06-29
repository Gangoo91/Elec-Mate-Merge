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
      'A natural personality trait that some people are simply born with and others lack entirely',
      'The ability to perceive, understand, manage, and use emotions effectively in oneself and others',
      'The ability to suppress negative emotions and project a consistently positive outward image',
      'A measure of how emotionally sensitive a person is compared to those around them',
    ] as const,
    correctAnswer: 1,
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
      'Reuven Bar-On and Paul Ekman',
      'Peter Salovey and John D. Mayer',
      'Martin Seligman and Mihaly Csikszentmihalyi',
    ] as const,
    correctAnswer: 2,
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
      'Inventing the original academic concept of emotional intelligence',
      'Developing the first validated psychometric test for measuring EI',
      'Proving that EI matters more than IQ in every situation',
      'Popularising emotional intelligence and bringing it to mainstream awareness',
    ] as const,
    correctAnswer: 3,
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
      'EI and IQ are separate constructs, each contributing to overall effectiveness',
      'EI is simply another name for IQ measured on a different scale',
      'EI is a fixed trait determined entirely by IQ in early childhood',
      'High IQ reliably guarantees a correspondingly high level of EI',
    ] as const,
    correctAnswer: 0,
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
    options: [
      '50%',
      '90%',
      '70%',
      '100%',
    ] as const,
    correctAnswer: 1,
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
      'Using emotions → Managing emotions → Perceiving emotions → Understanding emotions',
      'Managing emotions → Understanding emotions → Using emotions → Perceiving emotions',
      'Perceiving emotions → Using emotions to facilitate thought → Understanding emotions → Managing emotions',
      'Understanding emotions → Perceiving emotions → Managing emotions → Using emotions',
    ] as const,
    correctAnswer: 2,
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
      'The speed at which a person can identify emotions in photographs of faces',
      "A person's general cognitive ability and capacity for abstract reasoning",
      'How frequently a person experiences positive versus negative moods each day',
      'Emotional and social competencies for understanding ourselves and relating to others',
    ] as const,
    correctAnswer: 3,
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
      "It acts as the brain's emotional alarm system, processing threats and triggering rapid emotional responses",
      'The brain region chiefly responsible for long-term planning and rational decision-making',
      'The structure that converts short-term memories into long-term storage',
      'The area that coordinates fine motor control and physical balance',
    ] as const,
    correctAnswer: 0,
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
      'The hippocampus',
      'The prefrontal cortex',
      'The cerebellum',
      'The amygdala',
    ] as const,
    correctAnswer: 1,
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
      'A single structure dedicated solely to converting short-term memories into long-term ones',
      'The outermost layer of the brain responsible for conscious, rational thought',
      'A collection of brain structures involved in emotional responses, memory formation, and motivation',
      'The network of nerves that carries motor signals to the muscles of the body',
    ] as const,
    correctAnswer: 2,
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
      'Excitement, boredom, anxiety, contentment, envy, and grief',
      'Trust, anticipation, ecstasy, rage, terror, and admiration',
      'Joy, guilt, shame, pride, love, and jealousy',
      'Happiness, sadness, anger, fear, surprise, and disgust',
    ] as const,
    correctAnswer: 3,
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
      'An overwhelming emotional reaction where the amygdala overrides the rational brain',
      'A deliberate technique for calming yourself during a stressful conversation',
      'A gradual build-up of mild irritation over the course of a working day',
      'The conscious decision to walk away from a confrontation before it escalates',
    ] as const,
    correctAnswer: 0,
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
      'A learned habit of avoiding difficult conversations whenever possible',
      "The body's automatic physiological reaction to perceived danger",
      'A slow, gradual rise in stress hormones over several hours of work',
      'The conscious choice to confront a problem head-on rather than withdraw',
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
      'The deliberate effort to hide your true emotions from those around you',
      'A technique for accurately naming the specific emotion you are feeling',
      "The phenomenon where one person's emotions trigger similar emotions in others",
      "The tendency to misread other people's emotions based on your own mood",
    ] as const,
    correctAnswer: 2,
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
      'Stimulus, response, and reinforcement',
      'Intelligence, personality, and environment',
      'Thoughts, feelings, and behaviours',
    ] as const,
    correctAnswer: 3,
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
      'Emotional intelligence can be learned and developed throughout life with deliberate practice',
      'Emotional intelligence is a fixed trait that cannot be changed after childhood',
      'High emotional intelligence is found almost exclusively in senior managers',
      'Emotional intelligence has no measurable effect on workplace performance',
    ] as const,
    correctAnswer: 0,
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
      'Emotional literacy, emotional fitness, emotional depth, emotional alchemy, and emotional mastery',
      'Self-awareness, self-regulation, motivation, empathy, and social skills',
      'Perception, facilitation, understanding, management, and application',
      'Intrapersonal, interpersonal, adaptability, stress management, and general mood',
    ] as const,
    correctAnswer: 1,
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
      'Achievement drive — striving to improve or meet a standard of excellence',
      'Emotional self-awareness — recognising your emotions and their effects',
      'Trustworthiness — maintaining standards of honesty and integrity',
      'Influence — wielding effective tactics for persuasion',
    ] as const,
    correctAnswer: 2,
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
      'Because the domains are entirely independent and can be developed in any order',
      'Because social skills are the easiest domain and should always be learned first',
      'Because empathy must be fully mastered before any self-awareness can develop',
      'Because you must understand and manage yourself before you can manage relationships',
    ] as const,
    correctAnswer: 3,
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
      'Demands — workload, work patterns, and the work environment',
      'Demand, Effort, Reward, and Imbalance from the workload',
      'Plan, Do, Check, and Act in a continuous cycle',
      'Hazard, Risk, Control, and Review on each task',
    ] as const,
    correctAnswer: 0,
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
      'Maintaining accurate records of plant and material deliveries to site',
      'Leading and motivating others, including managing relationships and team dynamics',
      'Calculating the correct cable sizes for a given circuit load',
      'Interpreting structural drawings to set out a building accurately',
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
      'It guarantees that no accidents will occur as long as procedures are followed',
      'It replaces the need for formal risk assessments and method statements',
      'It helps workers recognise stress and fatigue that impair judgement on site',
      'It mainly improves the speed at which routine tasks are completed',
    ] as const,
    correctAnswer: 2,
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
      'Insisting that every worker on site adopt an identical communication style',
      "Recording each team member's mood in a daily log for management review",
      'Setting deliberately high targets to push the team beyond their comfort zone',
      'A supervisor noticing a quiet apprentice, checking in, and adjusting their tasks',
    ] as const,
    correctAnswer: 3,
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
      'To address the stigma of poor mental health in the construction industry',
      'To provide a national accreditation scheme for electrical qualifications',
      'To negotiate pay and conditions on behalf of construction trade unions',
      'To certify that construction sites meet minimum welfare facility standards',
    ] as const,
    correctAnswer: 0,
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
      'Slightly slower decision-making but no measurable effect on safety or morale',
      'Higher conflict, poor communication, more safety incidents, and lower productivity',
      'Improved short-term output at the expense of long-term staff development',
      'A reduction in administrative paperwork but an increase in technical errors',
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
      'Primarily through formal written instructions and documented site procedures',
      "Mainly through deliberate, conscious decisions to copy a colleague's mood",
      'Through facial expressions, tone, body language, and behaviour — often unconsciously',
      'Only when team members already share a close personal friendship',
    ] as const,
    correctAnswer: 2,
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
      'The ability to read and write technical documentation accurately',
      'The capacity to memorise large amounts of emotional theory',
      'The skill of persuading others to adopt your emotional viewpoint',
      'The ability to identify, name, and describe emotions in oneself and others',
    ] as const,
    correctAnswer: 3,
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
      'Being flexible with your thoughts and feelings to respond optimally to situations',
      'A rigid set of rules dictating exactly how to feel in each situation',
      'The practice of suppressing all emotions to maintain professionalism',
      'A technique for permanently eliminating unwanted negative emotions',
    ] as const,
    correctAnswer: 0,
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
      'EI is useful only for senior executives and has no relevance at site level',
      'Leaders with higher EI achieve better team performance, safety, and retention',
      'Technical knowledge is the sole factor determining leadership effectiveness',
      'EI and leadership effectiveness are negatively correlated under pressure',
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
      'Trait EI is measured in children while ability EI is measured in adults',
      'Trait EI applies to individuals while ability EI applies only to teams',
      'Trait EI measures self-perceived competencies; ability EI measures task performance',
      'Trait EI is innate and fixed while ability EI is learned and changeable',
    ] as const,
    correctAnswer: 2,
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
      'Because subcontractors are legally barred from raising concerns directly',
      'Because technical competence alone fully determines project success',
      'Because empathy is irrelevant once a contract has been formally signed',
      'Because coordinating diverse teams requires empathy, communication, and conflict skills',
    ] as const,
    correctAnswer: 3,
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
      'The brain can form new neural pathways for life, so EI can be developed at any age',
      'The fixed structure of the adult brain that prevents EI from changing after 25',
      'A genetic limit that caps how much emotional intelligence a person can develop',
      'The idea that emotional skills can only be learned during early childhood',
    ] as const,
    correctAnswer: 0,
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
      'All three models are essentially identical and use interchangeable measures',
      'Each model offers a different but complementary lens on emotional intelligence',
      "Goleman's model is the only one supported by any scientific evidence",
      "Bar-On's model has entirely replaced the earlier Salovey-Mayer approach",
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
      'Immediately discipline the most vocal worker to restore order quickly',
      'Reassign both teams to separate sites to avoid any further contact',
      'Self-regulate first, then use empathy, social awareness, and social skills to resolve it',
      'Wait for the conflict to resolve itself without any intervention',
    ] as const,
    correctAnswer: 2,
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
      'Emotional intelligence has been conclusively proven to be entirely innate',
      'No EI measure has ever shown any correlation with workplace performance',
      'Ability-based EI tests are universally rejected by the research community',
      'Some EI measures overlap with personality traits, questioning its distinctness',
    ] as const,
    correctAnswer: 3,
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
      'High collective EI lets teams understand clients and build trust during the bid',
      'Lowering the bid price below cost is the only reliable way to win the work',
      'Technical specifications alone determine the outcome of every bid evaluation',
      'Collective EI is irrelevant because procurement is decided solely on price',
    ] as const,
    correctAnswer: 0,
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
      "The MSCEIT relies entirely on the test-taker's own rating of their abilities",
      'The MSCEIT measures actual ability through tasks, not self-perceived competence',
      'Self-report measures use performance tasks while the MSCEIT uses questionnaires',
      'Both approaches measure identical things and produce interchangeable scores',
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
      'A manager who openly shares credit with their team for shared successes',
      'A supervisor who uses empathy to support a struggling apprentice',
      "A manager who exploits team members' insecurities to maintain control and compliance",
      'A leader who honestly admits their own mistakes to build team trust',
    ] as const,
    correctAnswer: 2,
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
      'Send the engineer on a single one-day awareness workshop and consider it resolved',
      'Reassign the engineer to purely technical tasks with no team contact',
      'Simply inform the engineer of the poor feedback and expect them to self-correct',
      'A structured programme of feedback, coaching, deliberate practice, and reflection',
    ] as const,
    correctAnswer: 3,
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
      'Combine the ability, competency, and trait models to leverage the strengths of each',
      'Adopt a single model exclusively and disregard the other two frameworks entirely',
      "Avoid all formal models and rely purely on managers' personal intuition",
      'Use only self-report questionnaires because they are quicker to administer',
    ] as const,
    correctAnswer: 0,
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
      'Self-control, adaptability, and conscientiousness',
      'Emotional self-awareness, accurate self-assessment, and self-confidence',
      'Empathy, service orientation, and organisational awareness',
      'Influence, communication, and conflict management',
    ] as const,
    correctAnswer: 1,
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
      'The tendency to experience the same few emotions repeatedly over time',
      'The ability to mask emotions so completely that others cannot detect them',
      'The ability to make fine distinctions between similar emotions, like irritation and anger',
      'The speed at which an emotion fades once the trigger has passed',
    ] as const,
    correctAnswer: 2,
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
      'Four primary emotions arranged in a straight line from positive to negative',
      'A simple list of emotions ranked from least to most socially acceptable',
      'Eight primary emotions grouped solely by how pleasant each one feels',
      'Eight primary emotions in opposing pairs and intensities that combine into complex ones',
    ] as const,
    correctAnswer: 3,
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
      'Increased heart rate, shallow breathing, muscle tension, or stomach tightness',
      'A sudden feeling of calm and a noticeable slowing of the heart rate',
      'Improved concentration and a heightened sense of physical relaxation',
      'Lowered blood pressure accompanied by deep, slow breathing',
    ] as const,
    correctAnswer: 0,
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
      'Emotions are caused directly by external events, regardless of interpretation',
      'An event triggers a thought, which generates an emotion, which drives a behaviour',
      'Behaviour always comes before the thought that triggers an emotion',
      'Events trigger behaviours directly, bypassing any thought or feeling',
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
      'Receiving clear, well-co-ordinated drawings ahead of starting a task',
      'Being given generous timescales and ample materials for a job',
      'An unrealistic deadline, having to redo previous work, or being publicly criticised',
      'Working alongside a supportive team who routinely check their work',
    ] as const,
    correctAnswer: 2,
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
      'Strengths, Weaknesses, Opportunities, and Threats',
      'Conscious, Subconscious, Unconscious, and Preconscious',
      'Past, Present, Future, and Potential',
      'Open (Arena), Blind Spot, Hidden (Facade), and Unknown',
    ] as const,
    correctAnswer: 3,
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
      'The belief that abilities can be developed through effort and learning from mistakes',
      'The belief that intelligence and ability are fixed and cannot be changed',
      'A naturally optimistic temperament that some people are simply born with',
      'The conviction that talent matters far more than effort or practice',
    ] as const,
    correctAnswer: 0,
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
      'Avoiding any reflection on emotions to prevent dwelling on the negative',
      'Keeping a brief daily log of emotional states, triggers, and responses to spot patterns',
      'Asking colleagues each day to rate your mood on your behalf',
      'Reading widely about emotional theory without applying it personally',
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
      'To eliminate all negative emotions before they can affect your work',
      'To ensure you always appear calm and positive to colleagues',
      'To recognise your emotions as they occur and understand their impact on your actions',
      'To learn to hide your emotions so they never influence your decisions',
    ] as const,
    correctAnswer: 2,
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
      'The total number of languages in which a person can express emotions',
      'The volume or loudness at which a person typically expresses feelings',
      'The speed at which a person can recall an emotional memory',
      'The range and precision of words a person uses to describe their emotional experiences',
    ] as const,
    correctAnswer: 3,
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
      'Because unrecognised stress impairs judgement and reaction time on a high-hazard site',
      'Because stress always improves focus and sharpens reaction time',
      'Because recognising stress is mainly useful for office-based roles',
      'Because stress has no measurable effect on physical safety on site',
    ] as const,
    correctAnswer: 0,
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
      'Always presenting yourself as highly confident regardless of your actual ability',
      'Having an honest understanding of your own strengths and limitations, and being open to learning',
      'Comparing your performance favourably against that of your colleagues',
      'Focusing only on your strengths and avoiding any thought of weaknesses',
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
      'A specific external event, such as a deadline being moved or a tool going missing',
      'A physical sensation in the body, such as a racing heart or tight chest',
      "A recurring negative thought pattern, such as \"I'm not good enough\" or \"They don't respect me\"",
      "A colleague's facial expression or tone of voice during a conversation",
    ] as const,
    correctAnswer: 2,
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
      'Always being the loudest and most dominant voice in any discussion',
      'The absence of any self-doubt or uncertainty in any situation',
      'A tendency to take on far more work than you can realistically manage',
      'A strong sense of your self-worth and capabilities, even when under pressure',
    ] as const,
    correctAnswer: 3,
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
      'Primary emotions are the automatic response; secondary emotions react to those',
      'Primary emotions are positive while secondary emotions are always negative',
      'Primary emotions are felt by everyone while secondary emotions are rare',
      'Primary emotions are conscious while secondary emotions are entirely unconscious',
    ] as const,
    correctAnswer: 0,
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
      'Awareness, Behaviour, and Consequence of the action',
      'Activating event, Beliefs about it, and the Consequences that follow',
      'Action, Belief, and the resulting Choice made',
      'Adversity, Bargaining, and a return to Calm',
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
      'Start, Build, Integrate',
      'Situation, Behaviour, Impact',
      'Self, Blind spot, Insight',
    ] as const,
    correctAnswer: 2,
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
      'A bias where people consistently and accurately judge their own competence',
      'A tendency for experts to greatly overestimate their own abilities',
      'The effect where confidence rises steadily in proportion to skill',
      'A bias where the less competent overestimate their ability and experts underestimate theirs',
    ] as const,
    correctAnswer: 3,
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
      'Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan',
      'Define, Measure, Analyse, Improve, Control, and Sustain',
      'Denial, Anger, Bargaining, Depression, Acceptance, and Hope',
      'Plan, Do, Study, Act, Review, and Repeat the cycle',
    ] as const,
    correctAnswer: 0,
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
      'Rapidly tensing and releasing each muscle group to release physical stress',
      'Directing attention through the body to notice tension that may signal emotional states',
      'Visualising a calm scene to distract yourself from physical discomfort',
      'Counting your breaths until your heart rate returns to its resting level',
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
      'It proves that we have no control over how we react to any trigger',
      'It shows that emotional reactions are always instantaneous and automatic',
      'It highlights the moment of choice between a trigger and our reaction — a core EI skill',
      'It suggests that the gap between stimulus and response should be eliminated',
    ] as const,
    correctAnswer: 2,
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
      'To build the habit of noticing your emotional state and choosing how to proceed',
      'To ensure you suppress any unhelpful emotions as soon as they arise',
      'To compare your emotional state with that of your colleagues',
      'To build the habit of noticing and naming your emotional state and choosing how to proceed',
    ] as const,
    correctAnswer: 3,
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
      'Aspects of your behaviour and personality that are visible to others but that you are unaware of',
      'Aspects of yourself that you are aware of but deliberately hide from others',
      'Aspects of yourself that neither you nor anyone else is yet aware of',
      'Aspects of yourself that are openly known to both you and others',
    ] as const,
    correctAnswer: 0,
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
      'It refers to the speed at which the brain processes emotional information',
      'Thinking about your own thinking lets you observe responses and choose rather than react',
      'It is the ability to memorise and recall emotional vocabulary accurately',
      'It describes the tendency to think about other people more than yourself',
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
      'A specific external event, such as receiving the feedback itself',
      'A physical reaction, such as a tightening of the chest or clenched jaw',
      "A belief such as \"They think I'm incompetent\" or \"They are looking to blame me\"",
      'A learned habit of avoiding feedback conversations altogether',
    ] as const,
    correctAnswer: 2,
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
      'Emotional suppression and emotional awareness are simply two names for the same process',
      'Suppression acknowledges emotions openly while awareness hides them from others',
      'Awareness eliminates emotions entirely while suppression merely delays them',
      'Suppression denies emotions and raises stress; awareness acknowledges them without control',
    ] as const,
    correctAnswer: 3,
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
      "By using it to name emotions precisely, from \"bad\" to \"overwhelmed\" or \"frustrated\"",
      'By using it to rank emotions from least to most professionally acceptable',
      'By memorising the entire wheel so emotions can be recited on demand',
      'By using it to decide which emotions colleagues are permitted to express',
    ] as const,
    correctAnswer: 0,
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
      'Internal self-awareness concerns the past while external concerns the future',
      "Internal is understanding your own feelings; external is how accurately you read others' views of you",
      'Internal self-awareness applies to leaders while external applies to followers',
      'Internal self-awareness is innate while external self-awareness is impossible to develop',
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
      'The gap between what a person knows and what they are able to do technically',
      "The difference between a person's stated goals and their actual achievements",
      'The discrepancy between the values a person claims and how they actually behave',
      'The mismatch between how confident a person feels and how skilled they are',
    ] as const,
    correctAnswer: 2,
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
      'It causes people to forget emotional information almost as soon as they receive it',
      'It makes people equally open to all evidence regardless of their existing beliefs',
      'It improves emotional accuracy by forcing constant re-evaluation of beliefs',
      'It makes people notice evidence confirming existing beliefs, creating a distorted self-picture',
    ] as const,
    correctAnswer: 3,
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
      'Explore why events occurred, examining the assumptions and triggers that influenced them',
      'Simply describe in plain terms exactly what happened during the incident',
      'State only how the experience made you feel at the time',
      'Decide immediately what you will do differently next time',
    ] as const,
    correctAnswer: 0,
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
      'The Open quadrant — they should simply continue behaving exactly as they do now',
      'The Blind Spot quadrant — seek specific feedback, then work on modifying the behaviours',
      'The Hidden quadrant — they should disclose more personal information to colleagues',
      'The Unknown quadrant — no action is possible because no one is aware of the issue',
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
    options: [
      'About 80%',
      'About 50%',
      'About 10-15%',
      'About 30%',
    ] as const,
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
      'Purely rational decision-making is the gold standard that all managers should aim for',
      'Emotions are a distraction that consistently lead to worse decisions',
      'People who exclude emotion from decisions make demonstrably better choices',
      "Damasio's research shows emotions are essential to good decisions; the 'rational' just don't notice them",
    ] as const,
    correctAnswer: 3,
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
      'Workers may not recognise stress or fatigue until it becomes severe, creating safety risks',
      'Workers with alexithymic traits typically have unusually high emotional awareness',
      "Alexithymia mainly affects a person's technical skills rather than their emotions",
      'Alexithymia makes workers overly sensitive and prone to overreacting emotionally',
    ] as const,
    correctAnswer: 0,
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
      "Johari Window first (seeking feedback) → Gibbs' Cycle → ABC model → body scanning last",
      "Body scanning first, then the ABC model, then Gibbs' Cycle, then the Johari Window",
      "ABC model first → body scanning → Johari Window → Gibbs' Cycle last",
      "Gibbs' Cycle first → Johari Window → body scanning → ABC model last",
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
      'Because referring to yourself in the third person eliminates the emotion entirely',
      'Because it distracts you from the situation so the emotion is simply ignored',
      'Third-person self-talk creates distance, engaging the prefrontal cortex and easing intensity',
      'Because speaking aloud about yourself increases amygdala activity and clarity',
    ] as const,
    correctAnswer: 2,
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
      'They will understand others perfectly but be unable to understand their own feelings',
      'They will become overconfident about their technical abilities on site',
      'They will struggle to identify their own values while reading others flawlessly',
      'They may alienate colleagues, miss social cues, and not understand the feedback they receive',
    ] as const,
    correctAnswer: 3,
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
      "\"Tough it out\" cultures discourage emotional expression, driving suppression and poor help-seeking",
      'Construction culture strongly encourages open emotional expression and reflection',
      'Workplace culture has no measurable influence on emotional self-awareness',
      "The fast pace of site work naturally improves workers' emotional awareness",
    ] as const,
    correctAnswer: 0,
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
      'Emotional awareness, self-confidence, and accurate self-assessment',
      'Self-control, trustworthiness, conscientiousness, adaptability, and innovation',
      'Achievement drive, commitment, initiative, and optimism',
      'Empathy, service orientation, political awareness, and developing others',
    ] as const,
    correctAnswer: 1,
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
      'Suppression and regulation are simply two terms for the same underlying process',
      'Suppression acknowledges the emotion openly while regulation hides it from view',
      'Suppression pushes emotions down; regulation acknowledges them and manages them constructively',
      'Regulation removes the emotion completely while suppression merely postpones it',
    ] as const,
    correctAnswer: 2,
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
      'A technique of holding your breath as long as possible to reset the nervous system',
      'A method of breathing rapidly to energise yourself before a demanding task',
      'A practice of breathing only through the mouth to slow the heart rate',
      'Inhale for 4, hold for 4, exhale for 4, hold for 4 — calming the nervous system',
    ] as const,
    correctAnswer: 3,
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
      "An emotion's neurochemical surge passes in about 90 seconds; longer is sustained by our thoughts",
      'Any strong emotion physically lasts for a minimum of 90 minutes before fading',
      'It takes about 90 seconds to consciously decide how to respond to any emotion',
      'The first 90 seconds of an emotion are the only part we can consciously control',
    ] as const,
    correctAnswer: 0,
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
      'Stay calm, Tolerate it, Override the feeling, and Push through',
      'Stop, Take a breath, Observe what you are feeling, Proceed with awareness',
      'Stop, Think it over, Organise yourself, and Plan ahead',
      'Sense it, Tense up, Observe closely, and Process slowly',
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
      'Whether 10 colleagues, 10 managers, and 10 clients would agree with the decision',
      'How you will feel about this decision in 10 minutes, 10 months, and 10 years',
      'Taking 10 seconds, 10 minutes, and 10 hours to think before acting',
    ] as const,
    correctAnswer: 2,
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
      'Physically removing yourself from any situation that triggers a strong emotion',
      'Distracting yourself with another task until the emotion naturally passes',
      'Expressing the emotion outwardly as forcefully as possible to release it',
      'Changing the way you think about or interpret a situation in order to alter its emotional impact',
    ] as const,
    correctAnswer: 3,
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
      'Noticing your frustration about a delay, breathing, then calmly discussing solutions',
      'Shouting at the team to vent the frustration so it does not build up further',
      'Bottling up the frustration completely and saying nothing to anyone',
      'Leaving the site without explanation until the frustration has subsided',
    ] as const,
    correctAnswer: 0,
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
      'Sleep mainly affects physical stamina and has little impact on emotions',
      'Sleep loss impairs the prefrontal cortex, reducing its ability to regulate the amygdala',
      'Lack of sleep strengthens the prefrontal cortex and improves self-control',
      'Sleep deprivation calms the amygdala, reducing emotional reactivity',
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
      'A deliberate technique for releasing emotions in a controlled, healthy way',
      'A state of complete emotional numbness where no feelings are experienced',
      'A state where emotions are so intense that rational thinking is temporarily overwhelmed',
      'The gradual build-up of minor stresses over several working days',
    ] as const,
    correctAnswer: 2,
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
      'Rigidly sticking to the original plan no matter how circumstances change',
      'The ability to suppress any emotional reaction to unexpected events',
      'Always agreeing with whatever change is proposed to avoid conflict',
      'Flexibility in handling change, adjusting your responses when circumstances shift',
    ] as const,
    correctAnswer: 3,
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
      'Resisting an immediate urge to weigh consequences and respond constructively',
      'Permanently eliminating any urge to act on an emotion',
      'Always acting immediately and decisively on every emotional urge',
      'The inability to feel strong emotions in high-pressure situations',
    ] as const,
    correctAnswer: 0,
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
      'Exercise mainly improves physical fitness and has little effect on mood',
      'It lowers cortisol, releases endorphins, and provides a healthy outlet for tension',
      'Vigorous exercise raises cortisol levels, which sharpens emotional focus',
      'Exercise works only as a distraction and has no biological effect on stress',
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
      'Always agreeing with colleagues to avoid any kind of disagreement',
      'The ability to complete tasks quickly under tight time pressure',
      'Maintaining honesty and integrity, acting consistently, and owning your mistakes',
      'Maintaining a consistently cheerful demeanour regardless of circumstances',
    ] as const,
    correctAnswer: 2,
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
      'Immediately confront the person responsible loudly so others learn from it',
      'Say nothing and quietly redo the work yourself to avoid any conflict',
      'Leave the issue entirely and hope it is not noticed at inspection',
      'Use STOP: Stop, breathe, observe the frustration, then raise it through site coordination',
    ] as const,
    correctAnswer: 3,
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
      'Internal dialogue shapes emotion — negative self-talk escalates it, constructive self-talk eases it',
      "Self-talk has no measurable influence on a person's emotional state",
      'Negative self-talk reliably calms emotions while positive self-talk inflames them',
      'Self-talk only matters when spoken aloud, not when it is internal',
    ] as const,
    correctAnswer: 0,
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
      'Situation selection — choosing whether to enter a situation in the first place',
      'Situation modification — changing the situation to alter its emotional impact early',
      'Attentional deployment — redirecting your focus once an emotion has begun',
      'Response modulation — changing your reaction after the emotion has fully arisen',
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
      'Anger → Acceptance → Denial → Depression → Bargaining',
      'Denial → Anger → Bargaining → Depression → Acceptance',
      'Depression → Denial → Bargaining → Anger → Acceptance',
    ] as const,
    correctAnswer: 2,
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
      'Cognitive reappraisal — reinterpreting a situation to change its emotional impact',
      'Active listening — fully attending to another person before responding',
      'Emotional contagion — catching the emotions of those around you',
      'Delayed gratification — resisting an immediate reward for a larger future benefit',
    ] as const,
    correctAnswer: 3,
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
      'Self-regulation builds credibility, reliability, and intimacy while lowering self-orientation',
      'Trust is increased because high self-orientation signals confidence and ambition',
      'The equation shows that self-orientation has no real effect on trust',
      'Self-orientation is the numerator, so raising it directly increases trust',
    ] as const,
    correctAnswer: 0,
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
      'It mainly involves rigidly following the original plan despite any change',
      'It lets a worker accept frustration when plans change and redirect effort to the goal',
      'It is the ability to suppress all emotion so work can continue uninterrupted',
      'It means avoiding any situation that might provoke an emotional response',
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
      'A growth mindset person would resist the amendment as an unnecessary burden',
      'A growth mindset person would ignore the change until forced to comply',
      'They view the amendment as a chance to learn and regulate any frustration about updating',
      'A growth mindset person would feel the change proves their knowledge is now worthless',
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
      'Pausing before replying to a heated email until you have calmed down',
      'Discussing a difficult client issue privately with your supervisor first',
      'Reviewing your tone in a message before sending it to a colleague',
      'Posting a frustrated rant about a client on social media after an on-site disagreement',
    ] as const,
    correctAnswer: 3,
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
      'Delay important decisions for at least 20 minutes to let the stress response subside',
      'You should make all important decisions immediately while emotions are vivid',
      'The cooldown period only applies to physical exertion, not emotional stress',
      'You should suppress the stress response so decisions can be made at once',
    ] as const,
    correctAnswer: 0,
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
      'Immediately telling the supervisor their assessment is completely wrong',
      'Reframing the feedback as a chance to improve quality before inspection, easing the negativity',
      'Suppressing your disappointment entirely and saying nothing at all',
      'Walking away from the conversation until the supervisor changes their mind',
    ] as const,
    correctAnswer: 1,
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
      'Denial — they are refusing to accept that any change is taking place',
      'Acceptance — they have fully embraced the new system without reservation',
      'Bargaining — negotiating a partial adoption while retaining some of the old approach',
      'Anger — they are openly hostile and refusing to engage with the change',
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
      'Heart rate above about 100 bpm with unclear thinking and an urge to flee',
      'Improved clarity of thought and a heightened sense of control',
      'Slow, deep breathing accompanied by relaxed shoulders and jaw',
      'Heart rate above about 100 bpm with difficulty thinking clearly and an urge to fight or flee',
    ] as const,
    correctAnswer: 3,
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
      'Testing installations to standard even when unsupervised, driven by internal standards',
      'Producing high-quality work only when a supervisor is watching closely',
      'Completing tasks as quickly as possible regardless of testing standards',
      'Always deferring to others rather than taking responsibility for outcomes',
    ] as const,
    correctAnswer: 0,
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
      'Because innovation is purely a cognitive skill unrelated to any emotion',
      'It requires regulating fear of failure and resistance to change before creativity can occur',
      'Because innovation depends only on external rewards and incentives',
      'Because innovation is mainly about copying ideas from other people',
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
      'Demanding immediate respect by emphasising your qualifications to the team',
      'Avoiding the team entirely until you feel completely confident',
      'Acknowledge the anxiety, reappraise it as a chance to learn, and build trust through reliability',
      'Suppressing the anxiety and pretending you have no concerns at all',
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
      'Because identifying emotions precisely makes them more intense and harder to manage',
      'Because naming an emotion removes it entirely, so no regulation is needed',
      'Because vague emotional labels give you more flexibility in how you respond',
      'Naming the emotion precisely lets you choose the right regulation strategy for it',
    ] as const,
    correctAnswer: 3,
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
      'Recognise the stress signals as an amygdala trigger, then pause to re-engage the prefrontal cortex',
      'Immediately announce the new deadline to the team while still feeling stressed',
      'Suppress the physical signs of stress and carry on as though nothing happened',
      'Make a quick decision about resourcing before the stress response subsides',
    ] as const,
    correctAnswer: 0,
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
      "Publicly point out the colleague's error so the whole team can learn from it",
      'Regulate frustration, raise it privately as a quality issue, and offer to help correct it',
      'Quietly correct the work yourself without mentioning it to anyone',
      'Report the colleague to management before speaking to them at all',
    ] as const,
    correctAnswer: 1,
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
      'Trust is increased because high self-orientation signals drive and ambition',
      'Trust is unaffected because credibility and reliability outweigh everything else',
      'Trust falls because self-orientation is the denominator; managing self-interest is the skill needed',
      'Trust improves slightly because talking about achievements builds credibility',
    ] as const,
    correctAnswer: 2,
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
      'The challenge is that vulnerability always damages professional credibility on site',
      'The challenge is that construction culture fully supports emotional openness already',
      'The challenge is that vulnerability and self-regulation are the same skill',
      'Self-regulation can require vulnerability, which conflicts with the cultural norm of toughness',
    ] as const,
    correctAnswer: 3,
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
      'Suppressors had worse social outcomes and more negative emotion; reappraisers fared better',
      'Habitual suppressors showed better social outcomes and more positive emotion over time',
      'There was no measurable difference in outcomes between suppressors and reappraisers',
      'Reappraisers showed worse wellbeing because they over-analysed every situation',
    ] as const,
    correctAnswer: 0,
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
      'Repeating the thought firmly until you fully believe it is an accurate fact',
      "Seeing the thought as a thought, not a fact: \"I'm having the thought that I'm a poor leader\"",
      'Pushing the thought out of your mind and refusing to acknowledge it at all',
      'Acting immediately on the thought before it has a chance to fade',
    ] as const,
    correctAnswer: 1,
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
      'Ownership and blame are essentially the same response to a workplace error',
      'Blame culture requires more emotional regulation than taking genuine ownership',
      'Ownership regulates defensive impulses and focuses on learning; blame redirects fear outward',
      'Ownership means accepting fault while also condemning yourself harshly for it',
    ] as const,
    correctAnswer: 2,
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
      "Immediately matching the client's rising emotional intensity to show you care",
      "Suppressing all outward signs of stress while ignoring the client's feelings",
      'Deflecting responsibility onto the supplier until the client calms down',
      'Combine breathing, cognitive reappraisal, psychological flexibility, and measured vulnerability',
    ] as const,
    correctAnswer: 3,
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
      'Actively regulating resistance to change and flexing strategies without losing core values',
      'Simply accepting every change without question to avoid any conflict',
      'Resisting all change firmly to protect established and proven methods',
      'Waiting for management to enforce changes rather than engaging with them',
    ] as const,
    correctAnswer: 0,
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
      'Emotional self-awareness — recognising your emotions and their effects',
      'Achievement drive — a striving to improve or meet a standard of excellence',
      'Trustworthiness — maintaining standards of honesty and integrity',
      'Service orientation — anticipating and meeting the needs of clients',
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
      'Achievement drive — striving to improve or meet a standard of excellence',
      'Initiative — readiness to act on opportunities without waiting for direction',
      'Commitment — aligning with the goals of the group or organisation',
      'Optimism — persistence in pursuing goals despite obstacles and setbacks',
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
      'Reward, recognition, and reinforcement',
      'Salary, security, and status',
      'Direction, deadlines, and discipline',
      'Autonomy, mastery, and purpose',
    ] as const,
    correctAnswer: 3,
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
      'Autonomy, competence, and relatedness',
      'Achievement, affiliation, and power',
      'Safety, esteem, and self-actualisation',
      'Direction, structure, and supervision',
    ] as const,
    correctAnswer: 0,
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
      'The person must be earning a high salary for the work',
      'Clear goals and immediate feedback must be present',
      "There must be a balance between the challenge of the task and the person's skill level",
    ] as const,
    correctAnswer: 1,
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
      'Planning, preparation, and persistence',
      'Pressure, panic, and paralysis',
      'Personalisation, pervasiveness, and permanence',
      'Positivity, patience, and perspective',
    ] as const,
    correctAnswer: 2,
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
      'The ability to persuade others to adopt your own emotional viewpoint',
      "The capacity to remain completely detached from other people's feelings",
      'The skill of accurately predicting how a situation will turn out',
      "Understanding and sharing another person's feelings, seeing the world from their perspective",
    ] as const,
    correctAnswer: 3,
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
      'Cognitive empathy (understanding), emotional empathy (feeling), and compassionate empathy (acting)',
      'Strong empathy, weak empathy, and neutral empathy based on intensity',
      'Verbal empathy, written empathy, and visual empathy based on channel',
      'Conscious empathy, unconscious empathy, and learned empathy based on awareness',
    ] as const,
    correctAnswer: 0,
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
      'Empathy and sympathy are simply two words for the same emotional response',
      "Empathy shares another's feelings from their view; sympathy feels for them from your own",
      'Empathy is felt only towards friends, while sympathy is felt towards strangers',
      'Sympathy requires understanding the other person while empathy does not',
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
      'Mirror neurons are responsible for storing long-term emotional memories',
      'Mirror neurons fire only when we are performing an action, never when observing',
      "They let us automatically simulate others' experiences, providing a neural basis for empathy",
      "Mirror neurons prevent us from being affected by other people's emotions",
    ] as const,
    correctAnswer: 2,
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
      'Self-control — managing disruptive emotions and impulses',
      'Achievement drive — striving to meet a standard of excellence',
      'Adaptability — flexibility in handling change and shifting demands',
      'Understanding others — sensing their feelings and taking interest in their concerns',
    ] as const,
    correctAnswer: 3,
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
      'They shift focus from the work to the reward, narrowing thinking (the overjustification effect)',
      'Because external rewards always increase the quality of complex creative work',
      'Because workers ignore any reward that is not paid in cash',
      'Because complex tasks are unaffected by either rewards or motivation',
    ] as const,
    correctAnswer: 0,
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
      'Readiness to act on opportunities and go beyond what is required, unprompted',
      'Readiness to act on opportunities and go beyond what is required, without waiting for direction',
      'Flexibility in adjusting your approach when circumstances change',
      'Aligning your personal goals with those of the wider organisation',
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
      'Naive positivity and realistic optimism are essentially the same outlook',
      'Optimism means ignoring all obstacles so they cannot affect your mood',
      'It pairs realistic assessment of obstacles with belief that effort can still succeed',
      'Realistic optimism guarantees success while naive positivity guarantees failure',
    ] as const,
    correctAnswer: 2,
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
      'Flow — because the task perfectly matches their high level of skill',
      'Anxiety — because the task far exceeds their current ability',
      'Deep concentration — because routine tasks require the most focus',
      'Boredom or apathy — the challenge is too low for their skill level to engage them',
    ] as const,
    correctAnswer: 3,
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
      'Intrinsic motivation, engagement, wellbeing, and performance quality all increase',
      'Motivation falls sharply because meeting all three needs removes any challenge',
      'Only short-term motivation rises, while long-term performance declines',
      'Motivation is unaffected because these needs apply only outside of work',
    ] as const,
    correctAnswer: 0,
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
      'Awareness, Behaviour, Choice, Decision, Evaluation',
      'Adversity, Belief, Consequence, Disputation, and Energisation',
      'Acknowledge, Breathe, Calm, Decide, Engage',
      'Activating event, Bias, Calculation, Decision, Energy',
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
      '"This particular installation had a specific fault that I can now identify and correct"',
      '"The inspector found one issue; I will review my process for that detail"',
      "Treating the setback as permanent, pervasive, and entirely personal (\"I always mess up\")",
      '"This is a useful reminder to double-check that section more carefully next time"',
    ] as const,
    correctAnswer: 2,
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
      'Realistic optimism and toxic positivity are simply two terms for the same outlook',
      'Realistic optimism denies all difficulties while toxic positivity acknowledges them',
      'Toxic positivity validates negative feelings while realistic optimism dismisses them',
      'Realistic optimism acknowledges difficulties; toxic positivity dismisses negative emotions',
    ] as const,
    correctAnswer: 3,
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
      'Clear goals, immediate feedback, and a balance of high challenge and high skill',
      'Complete isolation from others and the absence of any external distractions',
      'A guaranteed reward at the end of the task and recognition from a manager',
      'High pressure and a tight deadline that forces total concentration',
    ] as const,
    correctAnswer: 0,
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
      'Micro-expressions are deliberate signals people use to communicate clearly',
      'They reveal genuine emotions a person conceals, giving you data about their true state',
      'Micro-expressions last several seconds and are easy for anyone to read',
      "Micro-expressions reveal a person's long-term personality rather than their emotions",
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
      'Telling the apprentice firmly to stand up straight and make more eye contact',
      "Ignoring the apprentice's posture since body language is unreliable",
      "Noticing an apprentice's hunched shoulders and quiet voice, then gently checking in with them",
      'Assuming the hunched posture simply means the apprentice is physically tired',
    ] as const,
    correctAnswer: 2,
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
      'Interrupting frequently to offer solutions before the speaker has finished',
      'Nodding politely while planning your own response to what they are saying',
      "Listening only for the technical facts and ignoring the speaker's feelings",
      'Eye contact, nodding, paraphrasing what you heard, and asking clarifying questions',
    ] as const,
    correctAnswer: 3,
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
      "Imagining the client's viewpoint — the time off, planning, and disruption the delay causes",
      'Explaining to the client exactly why the delay was unavoidable on your part',
      'Reminding the client that delays are a normal part of any building project',
      'Focusing only on the technical reasons for the delay and not its wider impact',
    ] as const,
    correctAnswer: 0,
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
      'Telling the colleague directly that avoiding eye contact appears evasive',
      'Recognising that eye-contact norms vary by culture and adjusting your communication style',
      'Assuming the colleague is being deliberately rude and responding in kind',
      'Insisting that everyone on site adopt the same communication norms',
    ] as const,
    correctAnswer: 1,
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
      'Compassionate empathy involves understanding a situation without any feeling',
      "Compassionate empathy means feeling another's emotion without understanding it",
      'It combines understanding and feeling with being moved to take helpful action',
      'Compassionate empathy is purely intellectual and never leads to any action',
    ] as const,
    correctAnswer: 2,
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
      'Optimism has no measurable link to performance in real workplace settings',
      'Optimistic and pessimistic salespeople performed almost identically in the study',
      'Pessimism predicted higher performance because it encouraged careful planning',
      'Optimists persist longer after setbacks, so optimism predicted performance better than other criteria',
    ] as const,
    correctAnswer: 3,
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
      'Keep unwavering faith you will prevail while confronting the brutal facts of your reality',
      'You must remain purely optimistic at all times and never dwell on difficulties',
      'You should focus only on the harsh facts and abandon any hope of success',
      'You must set firm deadlines for when the adversity will end and stick to them',
    ] as const,
    correctAnswer: 0,
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
      'Emotion regulation — managing your emotional responses under stress',
      'Reaching out — seeking new opportunities and connecting with others after setbacks',
      'Impulse control — resisting the urge to act on immediate feelings',
      "Empathy — accurately reading and responding to others' emotions",
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
      'Accepting the criticism silently and concluding you are simply not capable',
      "Dismissing the feedback as unfair and blaming the inspector's standards",
      'Challenging the belief with evidence: one returned report is temporary and fixable, not proof',
      'Avoiding all future inspection work to prevent the feeling happening again',
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
    correctAnswer: 3,
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
      'Use private, non-judgemental inquiry to understand the cause before deciding how to respond',
      'Immediately issuing a formal warning to address the drop in work quality',
      'Publicly pointing out the declining standard so the apprentice improves',
      "Reducing the apprentice's responsibilities without discussing it with them",
    ] as const,
    correctAnswer: 0,
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
      'Both share autonomy; mastery maps to competence, and purpose and relatedness add connection',
      'Both share autonomy; mastery maps to competence, and purpose and relatedness both add connection',
      'Both theories reject autonomy as a meaningful element of motivation',
      "SDT's relatedness directly contradicts Pink's concept of purpose",
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
      'Group flow requires only that each individual reach personal flow separately',
      'Group flow needs identical skill levels and removes any element of risk',
      'Group flow needs all individual conditions plus shared goals and close listening',
      'Group flow depends solely on a single dominant leader directing the team',
    ] as const,
    correctAnswer: 2,
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
      '"At least this proves I should never have taken on a project of this size"',
      '"The damage is done; I will just have to accept that my reputation is ruined"',
      '"I will avoid complex projects from now on so this can never happen again"',
      'A genuine shift to a clear action plan with motivation to apply the lessons learned',
    ] as const,
    correctAnswer: 3,
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
      'Less patience, emotional numbness, cynicism, and withdrawal — signs their empathy is depleted',
      'Increasing patience and a renewed sense of enthusiasm for mentoring',
      "A sudden improvement in the supervisor's ability to read others' emotions",
      'Heightened emotional sensitivity that makes every conversation feel rewarding',
    ] as const,
    correctAnswer: 0,
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
      'Communicating the safety concern in exactly the same blunt way to everyone',
      'Advanced cultural empathy — adapting safety communication to convey urgency without causing shame',
      'Avoiding the conversation entirely to prevent any cultural misunderstanding',
      'Assuming that safety language needs no adjustment as long as it is accurate',
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
      'Calm words with stressed body language suggest suppressed frustration; acknowledge it',
      "The body language is irrelevant because the client's words are professional",
      'Calm words with stressed body language suggest suppressed frustration; acknowledge it empathically',
      'The incongruence shows the client is deliberately trying to deceive you',
    ] as const,
    correctAnswer: 2,
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
      'Reminding the subcontractor of their past failures before offering any support',
      'Withholding empathy entirely until the subcontractor improves their work',
      'Treating the distress as an opportunity to gain the upper hand in the dispute',
      'Separating the person from past behaviour and responding to their present distress with compassion',
    ] as const,
    correctAnswer: 3,
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
      'Address the 3 Ps, then restore autonomy, clear goals and feedback, and purpose',
      'Tell the team firmly that morale is their own responsibility to fix',
      'Focus only on the technical causes of the failures and ignore morale',
      'Offer a one-off cash bonus and assume motivation will recover by itself',
    ] as const,
    correctAnswer: 0,
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
      'Saying nothing and quietly accepting that your tools will keep disappearing',
      'Stating the behaviour, its impact on you, and the change you want, without aggression',
      'Loudly confronting the colleague in front of the whole team about it',
      'Hiding your tools so the colleague is unable to borrow them again',
    ] as const,
    correctAnswer: 1,
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
      'Decide, Engage, Sustain, Conclude',
      'Describe, Explain, Suggest, Close',
      'Describe, Express, Specify, and Consequences',
      'Discuss, Evaluate, Schedule, Confirm',
    ] as const,
    correctAnswer: 2,
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
      'Competing — high assertiveness AND low cooperativeness, pursuing your own way',
      'Accommodating — low assertiveness AND high cooperativeness, yielding to others',
      'Avoiding — low assertiveness AND low cooperativeness, sidestepping the issue',
      'Collaborating — high assertiveness and high cooperativeness, satisfying both parties',
    ] as const,
    correctAnswer: 3,
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
      'Members felt safe to speak up, ask questions, and admit mistakes without fear',
      'Team members had the highest average level of technical qualification',
      'Team members worked the longest hours and rarely took breaks',
      'Team members were closely supervised and monitored at all times',
    ] as const,
    correctAnswer: 0,
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
      'Visionary — mobilising people towards a shared, compelling vision',
      'Affiliative — creating harmony and building emotional bonds, with the motto "people come first"',
      'Pacesetting — setting extremely high performance standards for all',
      'Commanding — demanding immediate compliance, with the motto "do what I say"',
    ] as const,
    correctAnswer: 1,
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
      'Reminding the plumber that electrical work must always take priority on site',
      'Reporting the plumber to the site manager to force the routing change',
      'Showing how the adjusted routing benefits both trades and offering to help with it',
      'Simply re-routing the cables yourself without involving the plumber',
    ] as const,
    correctAnswer: 2,
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
      'Its main purpose is to give the listener time to plan their own reply',
      "Its primary value is allowing you to identify weaknesses in the speaker's argument",
      'It is mainly a technique for appearing attentive without truly engaging',
      'It builds trust and psychological safety, so the speaker feels genuinely heard',
    ] as const,
    correctAnswer: 3,
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
      'Separate the people from the problem and focus on the issue, not personal attacks',
      'Immediately decide who is right and who is wrong before discussing anything',
      'Escalate the matter to management before either party has spoken',
      'Insist that both parties drop the issue and simply move on',
    ] as const,
    correctAnswer: 0,
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
      'It builds trust, communication, constructive conflict, and psychological safety',
      'It builds trust, communication, constructive conflict, and psychological safety in the team',
      'EI primarily reduces the amount of paperwork a team must complete',
      'EI chiefly helps a team work in silence without needing to communicate',
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
      'Telling the colleague firmly to calm down before you will listen to them',
      'Matching their raised voice to show that you take the issue seriously',
      'Lowering your voice, acknowledging their feelings, and listening fully before responding',
      'Walking away immediately and refusing to engage until they are calm',
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
      'Authority — people comply because the request comes from an expert',
      'Scarcity — people value things more when they appear to be in short supply',
      'Social proof — people follow the actions of those around them',
      'Reciprocity — people feel a natural obligation to return a favour they have received',
    ] as const,
    correctAnswer: 3,
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
      "It requires empathy, self-regulation, and social skills to enable the team's success",
      'Servant leadership means letting the team make every decision without guidance',
      "Servant leadership prioritises the leader's authority over the team's needs",
      'Servant leadership avoids EI by focusing purely on task delegation',
    ] as const,
    correctAnswer: 0,
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
      'Memorising the academic theory of EI and reciting it accurately',
      'Self-assessment, specific goals, practice, feedback, reflection, and accountability',
      'Attending a single EI workshop and considering your development complete',
      'Waiting for emotional skills to improve naturally with age and experience',
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
      'SMART goals are useful for technical skills but cannot be applied to EI',
      'Vague EI intentions are more effective because they allow greater flexibility',
      'It turns vague intentions into specific, measurable, time-bound development commitments',
      'SMART goals remove the need for any feedback or reflection on progress',
    ] as const,
    correctAnswer: 2,
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
      'Accountability structures are unnecessary because EI develops automatically over time',
      'Accountability mainly creates pressure that undermines genuine EI development',
      'EI changes are so easy that no external support or structure is required',
      'A development partner, a reflective journal, self-assessments, and scheduled review points',
    ] as const,
    correctAnswer: 3,
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
      'Writing carries emotional tone, so consider how the reader will feel and re-read before sending',
      'Written communication carries no emotional tone, so EI is irrelevant to it',
      'EI matters less in writing because the reader cannot see your reaction',
      'Tone in writing is fixed by the words alone and cannot be misread',
    ] as const,
    correctAnswer: 0,
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
      "\"You're always late and it's really starting to wind everyone up on site.\"",
      'Describe the lateness, express its impact, specify the change wanted, and state the benefit',
      "\"Whatever — I'll just keep doing the prep on my own from now on.\"",
      "\"It's fine, don't worry about it, I can manage the early start by myself.\"",
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
      'Always collaborate, since compromise produces inferior outcomes in every case',
      'Always compromise, because collaboration wastes time the team cannot spare',
      'Collaborate when both needs matter and there is time; compromise when time is short',
      'Use whichever approach the more senior person on site happens to prefer',
    ] as const,
    correctAnswer: 2,
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
      'Fear of conflict — team members avoid honest, productive disagreement',
      'Lack of commitment — members do not genuinely buy into decisions',
      "Inattention to results — members prioritise personal goals over the team's",
      'Absence of trust — without it, members avoid vulnerability, conflict, and accountability',
    ] as const,
    correctAnswer: 3,
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
      'Pacesetting and commanding — both create anxiety or fear when used as default styles',
      'Visionary and coaching — both can create dependency if overused',
      'Affiliative and democratic — both slow decision-making in a crisis',
      'Coaching and democratic — both ignore the emotional needs of the team',
    ] as const,
    correctAnswer: 0,
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
      'The Real Self — an honest assessment of who you are right now',
      'The Ideal Self — a compelling vision of who you want to become that energises change',
      'The Learning Agenda — specific development goals to close the gap',
      'Trusting Relationships — the support network that sustains the change',
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
      'The cycle eliminates the need to reflect on emotional experiences at all',
      'The cycle works only for technical learning and not for emotional skills',
      'Its four stages turn emotional experiences into systematic learning rather than repetition',
      'The cycle skips straight from experience to action without any reflection',
    ] as const,
    correctAnswer: 2,
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
      'Days 1-30 integration, Days 31-60 assessment, Days 61-90 foundation',
      'Days 1-30 mastery, Days 31-60 review, Days 61-90 reassessment',
      'Days 1-30 theory only, Days 31-60 theory only, Days 61-90 a final exam',
      'Phase 1 foundation and assessment, Phase 2 practice and feedback, Phase 3 integration',
    ] as const,
    correctAnswer: 3,
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
      'It enables informal leadership through influence, trust, motivation, and empathy',
      'Leadership requires a formal title before any influence is possible',
      'EI is useful only for those who already hold a management position',
      'Informal leadership relies purely on technical skill, not emotional skill',
    ] as const,
    correctAnswer: 0,
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
      'ACAS recommends escalating straight to formal disciplinary processes first',
      'It promotes early, informal resolution through open conversation and listening',
      'ACAS advises avoiding workplace conflict entirely wherever possible',
      'ACAS focuses solely on legal penalties rather than open conversation',
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
      'Empathic anticipation, deliberate tone, impulse control, and reviewing before sending',
      'Brevity is always best because shorter messages cannot be misread',
      'Empathic anticipation, deliberate tone management, impulse control, and reviewing before sending',
      'Speed of reply matters far more than how a message might be received',
    ] as const,
    correctAnswer: 2,
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
      'Sending the bad news by text to avoid an awkward face-to-face conversation',
      'Delivering the news bluntly and immediately demanding a decision',
      'Downplaying the issue to avoid worrying the client unnecessarily',
      'Explaining in person, leading with safety, showing empathy, and offering options',
    ] as const,
    correctAnswer: 3,
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
      'Avoided conflict leaves issues unaddressed and tensions festering, harming decision quality',
      'The absence of conflict is always healthier than open disagreement',
      'Conflict avoidance has no real effect on the quality of team decisions',
      'Teams perform best when all disagreement is suppressed to keep the peace',
    ] as const,
    correctAnswer: 0,
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
      'Coaching and affiliative are essentially identical people-focused styles',
      'Coaching develops the individual; affiliative builds harmony and emotional bonds',
      'Coaching focuses on team harmony while affiliative develops individuals',
      'Coaching is only appropriate in a crisis, while affiliative suits routine work',
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
      'Over time the team feels overwhelmed, initiative drops, and the leader bottlenecks',
      'The team becomes more self-reliant as members rise to meet the standards',
      'Over time the team feels overwhelmed, initiative drops, morale falls, and the leader bottlenecks',
      'Initiative increases because workers feel trusted to match the high bar',
    ] as const,
    correctAnswer: 2,
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
      'PEA and NEA produce identical effects on the brain and on learning',
      'NEA driven by fear is the more reliable route to lasting EI development',
      'PEA closes neural pathways while NEA opens them to new learning',
      'PEA (hope, vision) opens learning pathways; NEA (fear) closes them, so PEA sustains change',
    ] as const,
    correctAnswer: 3,
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
      'A factual, solution-oriented note listing the specific issues and the agreed next steps',
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
      'Visionary for the client, coaching for the apprentice, democratic for the conflict',
      'Visionary for the client, coaching and affiliative for the apprentice, democratic for the conflict',
      'Apply pacesetting throughout to drive rapid resolution of every issue',
      'Use only the affiliative style everywhere to keep everyone happy',
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
      'Rely on a single domain — self-regulation — and ignore the other four',
      'Apply the domains one at a time over several weeks rather than together',
      'Each domain contributes: notice the feeling, regulate, find purpose, empathise, communicate',
      'Use only social skills, since communicating the change is all that matters',
    ] as const,
    correctAnswer: 2,
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
      'The final stage is permanent unconscious incompetence — EI is never truly learned',
      'The four stages run in reverse, ending at unconscious incompetence',
      'The final stage requires constant conscious effort that never becomes natural',
      'Unconscious incompetence, conscious incompetence, conscious competence, unconscious competence',
    ] as const,
    correctAnswer: 3,
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
      'Framing work as learning, admitting your own fallibility, and welcoming people who speak up',
      'Issuing a written policy declaring that the team is now psychologically safe',
      'Punishing the first person who admits a mistake to set a clear example',
      'Telling the team once that they should feel free to speak up, then moving on',
    ] as const,
    correctAnswer: 0,
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
      'Brief avoiding, then accommodating emotions, then collaborating, then compromising',
      'Brief avoiding, then accommodating the emotions, then collaborating, then compromising if needed',
      'Rely on avoiding alone and hope the conflict resolves on its own',
      'Apply only accommodating so both electricians feel completely satisfied',
    ] as const,
    correctAnswer: 1,
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
      'Self-awareness, regulation, motivation, empathy, and social skills build safety culture',
      'EI is a soft skill with no measurable link to safety outcomes on site',
      'Self-awareness, regulation, motivation, empathy, and social skills together build safety culture',
      'Safety culture depends only on enforcement and penalties, not on EI',
    ] as const,
    correctAnswer: 2,
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
      'Directing every task personally so the team never has to make a decision',
      'Keeping the most interesting work for yourself to demonstrate your expertise',
      "Avoiding involvement in the team's problems so they learn independence",
      'Asking what obstacles you can remove, then using empathy and follow-through to enable the team',
    ] as const,
    correctAnswer: 3,
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
      "Notice your stress, regulate it, find purpose, empathise with the client's fear, reassure",
      "Focus solely on the technical fault and dismiss the client's fear as irrational",
      'Reassure the client everything is fine without arranging to inspect the unit',
      'Become defensive about your installation and insist the client is mistaken',
    ] as const,
    correctAnswer: 0,
    explanation:
      "This capstone question demonstrates how all five EI domains integrate in real-time professional practice: Self-awareness (noticing internal reactions), Self-regulation (managing defensiveness and stress), Motivation (connecting to purpose), Empathy (understanding the client's experience), and Social skills (communicating effectively and taking appropriate action). This integration happens in seconds in a skilled practitioner — it is the hallmark of fully developed emotional intelligence, where all five domains work together seamlessly.",
    section: 'Social Skills & Applying EI',
    difficulty: 'advanced' as const,
    topic: 'Whole-course integration scenarios',
    category: 'Social Skills & Applying EI' as const,
  },
];
