/**
 * Mental Health First Aid Mock Exam Question Bank
 *
 * 200 questions covering all 5 categories with difficulty distribution.
 *
 * Categories (5):
 *   Mental Health Fundamentals (40) | Depression, Anxiety & Stress (40) |
 *   Substance Misuse, Self-Harm & Suicide (40) |
 *   Psychosis, Eating Disorders & Complex Needs (40) |
 *   Workplace Implementation & Wellbeing (40)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const mentalHealthCategories = [
  'Mental Health Fundamentals',
  'Depression, Anxiety & Stress',
  'Substance Misuse, Self-Harm & Suicide',
  'Psychosis, Eating Disorders & Complex Needs',
  'Workplace Implementation & Wellbeing',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const mentalHealthMockExamConfig: MockExamConfig = {
  examId: 'mental-health-first-aid',
  examTitle: 'Mental Health First Aid Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/mental-health-module-6',
  categories: mentalHealthCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomMentalHealthExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(mentalHealthQuestionBank, numQuestions, mentalHealthCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const mentalHealthQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // MENTAL HEALTH FUNDAMENTALS — 40 questions (id 1–40)
  // =======================================================================

  // ===== BASIC (id 1-16) =====
  {
    id: 1,
    question: 'According to the World Health Organisation (WHO), mental health is defined as:',
    options: [
      'Trauma experienced indirectly through witnessing or hearing about others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' traumatic experiences; first aiders, supervisors, and colleagues may be at risk',
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'The emotional residue of exposure to others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' traumatic stories, which can lead to changes in the MHFA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s own worldview, beliefs, and psychological functioning',
      'Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The WHO defines mental health as 'a state of well-being in which every individual realises his or her own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to his or her community.' This definition emphasises that mental health is more than just the absence of illness.",
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Mental health definition (WHO)',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 2,
    question:
      'Approximately what proportion of people will experience a mental health problem in any given year?',
    options: [
      '1 in 2',
      '1 in 10',
      '1 in 4',
      '1 in 20',
    ] as const,
    correctAnswer: 2,
    explanation:
      'According to established UK statistics, approximately 1 in 4 people will experience a mental health problem in any given year. This widely cited figure highlights just how common mental health difficulties are and underscores the importance of mental health awareness and support in every workplace and community.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Prevalence statistics',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 3,
    question: 'What does the acronym ALGEE stand for in the MHFA action plan?',
    options: [
      'Assess, Listen, Give, Encourage professional help, Encourage other supports',
      'Approach, Lead, Give advice, Ensure professional help, Ensure other supports',
      'Ask, Learn, Guide, Enable professional help, Enable other supports',
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
    ] as const,
    correctAnswer: 3,
    explanation:
      'ALGEE stands for: Approach, assess and assist with any crisis; Listen non-judgementally; Give reassurance and information; Encourage appropriate professional help; Encourage other supports. This is the core action plan taught in Mental Health First Aid training.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'ALGEE action plan',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 4,
    question: 'Which of the following is a common myth about mental health?',
    options: [
      'Mental health problems are a sign of personal weakness',
      'People with mental health problems can recover and live fulfilling lives',
      'Mental health exists on a continuum',
      'Mental health affects people of all backgrounds and ages',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The belief that mental health problems are a sign of personal weakness is a widespread and harmful myth. Mental health conditions are influenced by a combination of biological, psychological, and social factors. They are not caused by weakness, laziness, or a lack of willpower, and perpetuating this myth contributes to stigma.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Common myths and misconceptions about mental health',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 5,
    question: 'The mental health continuum suggests that mental health:',
    options: [
      'Trauma-focused CBT and Eye Movement Desensitisation and Reprocessing (EMDR)',
      'Ranges from thriving through to struggling and crisis, and can fluctuate over time',
      'Stay calm, reassure them, and help them focus on slow breathing',
      'Emotional exhaustion, cynicism (depersonalisation), and reduced personal efficacy',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The mental health continuum model shows that mental health is not simply 'well' or 'unwell'. Instead, it ranges from thriving (good mental health) through to struggling and crisis. Everyone sits somewhere on this continuum, and a person's position can change over time depending on circumstances, support, and other factors.",
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Mental health spectrum/continuum',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 6,
    question:
      'How many working days are estimated to be lost each year in the UK due to mental health problems?',
    options: [
      'Approximately 120 million',
      'Approximately 30 million',
      'Approximately 70 million',
      'Approximately 10 million',
    ] as const,
    correctAnswer: 2,
    explanation:
      'It is estimated that around 70 million working days are lost each year in the UK due to mental health problems, including stress, depression, and anxiety. This represents a significant cost to employers, the economy, and individuals, reinforcing why workplace mental health support is so important.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Prevalence statistics',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 7,
    question: "What is 'public stigma' in the context of mental health?",
    options: [
      'When a person with a mental health problem internalises negative stereotypes about themselves',
      'When institutions and organisations have policies that discriminate against people with mental health problems',
      'When healthcare professionals refuse to treat people with mental health problems',
      'When the general public holds negative attitudes, beliefs, and stereotypes about people with mental health problems',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Public stigma refers to the negative attitudes, beliefs, and stereotypes held by the general public towards people who experience mental health problems. It can lead to discrimination, social exclusion, and reluctance to seek help. This is distinct from self-stigma (internalised shame) and structural stigma (institutional discrimination).',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Stigma (public, self, structural)',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 8,
    question: 'A Mental Health First Aider should NOT:',
    options: [
      'Diagnose mental health conditions or prescribe treatment',
      'Listen non-judgementally to someone in distress',
      'Encourage the person to seek appropriate professional help',
      'Provide initial support and reassurance',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A Mental Health First Aider is not qualified to diagnose mental health conditions or prescribe any form of treatment. Their role is to provide initial support, listen non-judgementally, offer reassurance and information, and encourage the person to access appropriate professional help. Staying within these boundaries is a core principle of the MHFA role.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Boundaries of the MHFA role',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 9,
    question:
      'Which piece of legislation places a duty on employers to protect the health, safety, and welfare of employees at work?',
    options: [
      'Encourage appropriate professional help',
      'The Health & Safety at Work Act 1974',
      'Cognitive Behavioural Therapy',
      'Heart failure due to electrolyte imbalances',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Health & Safety at Work Act 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This includes mental health as well as physical health, meaning employers have a legal obligation to address workplace factors that can harm mental well-being.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Health & Safety at Work Act 1974',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 10,
    question: "In the SOLER model of active listening, what does the 'S' stand for?",
    options: [
      'Speak clearly',
      'Stay calm',
      'Sit squarely',
      'Show sympathy',
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the SOLER model (developed by Gerard Egan), the 'S' stands for 'Sit squarely', meaning face the person you are listening to in order to show you are engaged and paying attention. The full model is: S - Sit squarely, O - Open posture, L - Lean towards the person, E - Eye contact, R - Relax.",
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'SOLER model',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 11,
    question: 'Which industry sector has a particularly high suicide rate in the UK?',
    options: [
      'Education and teaching',
      'Financial services',
      'Retail',
      'Construction',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The construction industry has a particularly high suicide rate in the UK. Male construction workers are approximately three times more likely to take their own lives compared to the male national average. Factors contributing to this include a culture that discourages speaking about emotions, job insecurity, physical demands, and working away from home.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Prevalence statistics',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 12,
    question: "What is 'self-stigma' in relation to mental health?",
    options: [
      'When a person with a mental health problem internalises negative stereotypes and feels shame about their condition',
      'When the media portrays people with mental health problems negatively',
      'When employers discriminate against employees with mental health problems',
      'When healthcare services are inadequate for people with mental health problems',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Self-stigma occurs when a person with a mental health problem internalises the negative stereotypes, prejudice, and discrimination that exist in society. This can lead to feelings of shame, reduced self-esteem, and reluctance to seek help. It is one of the three main types of stigma alongside public stigma and structural stigma.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Stigma (public, self, structural)',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 13,
    question:
      'The Equality Act 2010 protects people with mental health conditions from discrimination if their condition:',
    options: [
      'People who talk about suicide are just seeking attention and won\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t actually do it',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'Ranges from thriving through to struggling and crisis, and can fluctuate over time',
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Under the Equality Act 2010, mental health conditions are protected as a disability if they have a substantial and long-term (lasting or likely to last 12 months or more) adverse effect on a person's ability to carry out normal day-to-day activities. A formal psychiatric diagnosis is not strictly required; the focus is on the impact of the condition.",
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Equality Act 2010',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 14,
    question: 'Which of the following best describes the role of a Mental Health First Aider?',
    options: [
      'To act as a counsellor and provide ongoing therapy sessions',
      "To manage the person's mental health condition on an ongoing basis",
      'To provide initial support, listen non-judgementally, and guide the person towards appropriate help',
      "To report mental health concerns directly to the person's GP without their consent",
    ] as const,
    correctAnswer: 2,
    explanation:
      'The role of a Mental Health First Aider is to provide initial support, listen without judgement, offer reassurance and information, and encourage the person to access appropriate professional help and other supports. They are not counsellors, therapists, or ongoing case managers, and they should respect confidentiality.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'The MHFA role',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 15,
    question: 'An open question is one that:',
    options: [
      "Can be answered with a simple 'yes' or 'no'",
      'Requires a specific factual answer such as a date or number',
      'Is designed to challenge or confront the person',
      'Encourages a fuller, more detailed response from the person',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Open questions encourage the person to share more about their thoughts and feelings by requiring a fuller, more detailed response. They typically begin with words like 'how', 'what', 'tell me about', or 'describe'. This is an essential communication skill for Mental Health First Aiders when providing non-judgemental support.",
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Open questions',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 16,
    question: 'Confidentiality in the MHFA role means that:',
    options: [
      'You should keep what the person tells you private unless there is a risk of harm to themselves or others',
      'You should only share information with other Mental Health First Aiders in the workplace',
      'You must never share anything the person tells you, under any circumstances',
      "You are required to tell the person's manager everything they have disclosed",
    ] as const,
    correctAnswer: 0,
    explanation:
      'Confidentiality is a core principle of the MHFA role, meaning you should keep what the person tells you private. However, confidentiality can and should be broken if there is a risk of serious harm to the person themselves or to others. In such cases, you have a duty to share information with the appropriate people or services to ensure safety.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic' as const,
    topic: 'Confidentiality and when it can be broken',
    category: 'Mental Health Fundamentals' as const,
  },

  // ===== INTERMEDIATE (id 17-32) =====
  {
    id: 17,
    question:
      'A colleague confides in you that they have been feeling very low and anxious for several weeks but asks you not to tell anyone. You are concerned about their well-being. As a Mental Health First Aider, the most appropriate initial response is to:',
    options: [
      'Complex PTSD includes all PTSD symptoms plus difficulties with emotional regulation, self-concept, and relationships',
      'Listen non-judgementally, offer reassurance, and gently encourage them to seek professional help while respecting their confidentiality',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
      'He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The most appropriate initial response is to follow the ALGEE action plan: listen non-judgementally, provide reassurance and information, and encourage them to seek appropriate professional help. You should respect their request for confidentiality unless there is a risk of serious harm. Breaking confidentiality without sufficient cause would damage trust and discourage future help-seeking.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'ALGEE action plan',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 18,
    question:
      'The HSE Management Standards identify six key areas of work design that, if not managed properly, can lead to poor mental health. Which of the following is NOT one of these six areas?',
    options: [
      'Demands',
      'Relationships',
      'Salary',
      'Change',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The six HSE Management Standards areas are: Demands (workload, work patterns), Control (how much say a person has in their work), Support (encouragement and resources), Relationships (promoting positive working and dealing with conflict), Role (understanding of role and avoiding conflict), and Change (how organisational change is managed and communicated). Salary is not one of the six areas.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'HSE Management Standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 19,
    question:
      'Which of the following strategies is most effective for reducing stigma around mental health in the workplace?',
    options: [
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'Regularly eating large quantities of food very quickly to the point of discomfort, with a feeling of loss of control, without compensatory purging',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Creating an open culture where mental health is discussed regularly, leaders share their own experiences, and language is inclusive',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Research shows that stigma is most effectively reduced through contact (hearing from people with lived experience), education, and creating an open, inclusive culture. When leaders share their experiences and mental health is normalised as part of everyday conversation, people feel safer to seek help. Avoiding the topic or only discussing it in formal settings can actually reinforce stigma.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Reducing stigma',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 20,
    question:
      "The 'Thriving at Work' report (Stevenson/Farmer Review 2017) set out a series of core standards for employers. Which of the following is one of those core standards?",
    options: [
      'Produce, implement, and communicate a mental health at work plan',
      'Provide private health insurance to all employees',
      'Employ a full-time psychiatrist on site',
      'Guarantee that no employee will ever experience stress',
    ] as const,
    correctAnswer: 0,
    explanation:
      'One of the core standards from the Thriving at Work report is for employers to produce, implement, and communicate a mental health at work plan. Other core standards include developing mental health awareness among employees, encouraging open conversations, providing good working conditions, promoting effective people management, routinely monitoring employee mental health, and supporting employees returning to work after absence.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Thriving at Work core standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 21,
    question: 'In the SOLER model, maintaining appropriate eye contact serves the purpose of:',
    options: [
      'Making the person feel they are being watched and assessed',
      'Showing the person that you are engaged, interested, and paying attention to what they are saying',
      'Demonstrating authority and control over the conversation',
      "Ensuring you can read the person's facial expressions to diagnose their condition",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the SOLER model, maintaining appropriate eye contact (the 'E') demonstrates that you are engaged, interested, and attentive. It helps build rapport and trust. However, it should be natural and culturally sensitive - intense or unbroken eye contact can feel uncomfortable or intimidating, particularly for people from certain cultural backgrounds.",
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'SOLER model',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 22,
    question:
      'A Mental Health First Aider has been supporting a colleague who seems to be in crisis and mentions thoughts of ending their life. The colleague begs you to keep this confidential. You should:',
    options: [
      'Other Specified Feeding or Eating Disorder — an eating disorder that does not meet the full criteria for anorexia, bulimia, or binge eating disorder',
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'Recognise that this is a situation where confidentiality must be broken and seek appropriate help, explaining to the colleague why you need to involve others',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
    ] as const,
    correctAnswer: 2,
    explanation:
      'When someone expresses suicidal thoughts, this represents a risk of serious harm. In this situation, the duty of care overrides confidentiality. You should calmly explain to the person that because you are concerned about their safety, you need to involve appropriate support. This should be done sensitively and with as much involvement of the person as possible, contacting emergency services or an appropriate professional.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Confidentiality and when it can be broken',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 23,
    question:
      'Which of the following is an example of structural stigma in relation to mental health?',
    options: [
      'Thank them for telling you, listen without judgement, and gently suggest they speak to their GP or contact a support service',
      'Cultural background can influence how people experience, express, and seek help for mental health problems',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'An insurance policy that offers less coverage for mental health treatment compared to physical health treatment',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Structural stigma refers to institutional policies, practices, and systems that discriminate against people with mental health problems. An insurance policy providing less coverage for mental health compared to physical health is a clear example of structural stigma. Option A is self-stigma, option B is a form of public stigma or casual discrimination, and option D is social stigma/public stigma in action.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Stigma (public, self, structural)',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 24,
    question: "The 'Control' area in the HSE Management Standards refers to:",
    options: [
      'How much say a person has over how they do their work',
      'How much management monitors employee behaviour',
      'The level of control management has over budgets',
      'The security controls in place to protect data',
    ] as const,
    correctAnswer: 0,
    explanation:
      "In the HSE Management Standards, 'Control' refers to how much say employees have in the way they do their work. Evidence shows that when employees have an appropriate level of autonomy and input into how their work is organised and carried out, it supports better mental health. A lack of control over one's work is a well-established risk factor for work-related stress.",
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'HSE Management Standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 25,
    question:
      'When using active listening skills with someone who is distressed, which of the following approaches is most appropriate?',
    options: [
      'Interrupting regularly to share your own similar experiences so they feel less alone',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
      'Finishing their sentences to show you understand what they are trying to say',
      'Keeping the conversation factual and discouraging emotional expression to avoid things escalating',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Effective active listening involves allowing silences (giving the person space to think and feel), reflecting back what they have said (to show understanding), and using minimal encouragers such as nodding and brief verbal prompts. Interrupting, finishing sentences, or discouraging emotional expression can make the person feel unheard and dismissed.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Communication skills, active listening',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 26,
    question: 'A non-judgemental approach in MHFA means:',
    options: [
      'Emotional exhaustion, cynicism (depersonalisation), and reduced personal efficacy',
      'A chronic form of depression lasting 2 years or more with milder but persistent symptoms',
      'Setting aside your own opinions and values to provide a safe space where the person feels accepted and heard',
      'Post-Traumatic Stress Disorder; triggered by experiencing or witnessing a traumatic event',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Being non-judgemental means genuinely setting aside your own opinions, values, and assumptions so the person feels safe, accepted, and heard. It does not mean agreeing with everything, pretending you have no opinion, or avoiding difficult topics. It means creating a space where the person can express themselves without fear of being criticised, blamed, or dismissed.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Non-judgemental approach',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 27,
    question: "The 'duty to refer' in the context of mental health at work means:",
    options: [
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'Tolerance, physical dependence, overdose (especially when combined with alcohol or benzodiazepines), and respiratory depression',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'The responsibility of a line manager or MHFA to signpost a person to appropriate professional support when a situation is beyond their competence',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The duty to refer means recognising when a situation is beyond your competence and signposting or referring the person to appropriate professional support. For a Mental Health First Aider or line manager, this means knowing the limits of your role and directing the person towards services such as their GP, Employee Assistance Programme, occupational health, or emergency services as appropriate.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Duty of care, duty to refer',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 28,
    question: 'Cultural sensitivity in MHFA is important because:',
    options: [
      'Cultural background can influence how people experience, express, and seek help for mental health problems',
      'Different cultures have identical views on mental health and treatment',
      "It is a legal requirement to ask about someone's cultural background before offering support",
      'Only people from certain cultures experience mental health problems',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Cultural sensitivity is important because a person's cultural background can significantly influence how they experience, understand, express, and seek help for mental health problems. Some cultures may have different attitudes to mental health, different ways of expressing distress, or different expectations around family involvement. Being culturally sensitive means being aware of and respectful of these differences while still providing effective support.",
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Cultural sensitivity',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 29,
    question:
      "Which of the following best describes 'duty of care' in relation to mental health at work?",
    options: [
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'Employers have a reasonable responsibility to take steps to protect the physical and mental health of their employees',
      'Share relevant, accurate information and reassure the person that help is available and recovery is possible',
      'Recurrent, unexpected panic attacks with persistent worry about having further attacks',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Duty of care means that employers have a reasonable responsibility to take steps to ensure the health, safety, and well-being of their employees, including mental health. This does not mean guaranteeing no one ever experiences stress, but rather taking reasonable steps to prevent harm, manage risks, and support employees. This duty applies to all employers regardless of organisational size.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Duty of care, duty to refer',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 30,
    question: "The 'Relationships' area in the HSE Management Standards focuses on:",
    options: [
      'Having both a mental health condition and a substance use disorder simultaneously',
      'Offering rapid, specialist support during the first episode of psychosis to improve long-term outcomes',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Regular cannabis use, particularly high-strength varieties, is linked to increased risk of anxiety, depression, and psychosis',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The 'Relationships' area in the HSE Management Standards relates to promoting positive working to avoid conflict and dealing with unacceptable behaviour such as bullying and harassment. Healthy workplace relationships are a key factor in protecting mental health, and employers should have systems in place to address issues like bullying, conflict, and discrimination.",
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'HSE Management Standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 31,
    question: 'Which of the following is a core standard from the Thriving at Work report (2017)?',
    options: [
      'Offer all employees unlimited paid mental health leave',
      'Appoint a board-level mental health director in every organisation',
      'Remove all workplace targets and deadlines to reduce stress',
      'Routinely monitor employee mental health and well-being',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The Thriving at Work report (Stevenson/Farmer Review 2017) identified several core standards, one of which is to routinely monitor employee mental health and well-being. Other core standards include producing a mental health at work plan, developing mental health awareness, encouraging open conversations, providing good working conditions, and promoting effective people management.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'Thriving at Work core standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 32,
    question:
      "When giving reassurance and information (the 'G' in ALGEE), the Mental Health First Aider should:",
    options: [
      'Share relevant, accurate information and reassure the person that help is available and recovery is possible',
      'Provide a detailed explanation of all possible mental health conditions the person might have',
      "Minimise the person's concerns by telling them many people have it worse",
      'Recommend specific medications they have heard are effective',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The 'G' in ALGEE stands for 'Give reassurance and information'. This means providing relevant, accurate information about mental health and the support available, and reassuring the person that mental health problems are common, treatable, and recovery is possible. It does not involve diagnosing, recommending medication, or minimising the person's experience.",
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate' as const,
    topic: 'ALGEE action plan',
    category: 'Mental Health Fundamentals' as const,
  },

  // ===== ADVANCED (id 33-40) =====
  {
    id: 33,
    question:
      "A Mental Health First Aider in a construction company notices that a team of workers have become increasingly withdrawn after a colleague's suicide. Several team members are displaying signs of distress but none are seeking help. Considering cultural factors specific to the construction industry, the most effective approach would be to:",
    options: [
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed',
      'Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the construction industry, there is often a strong culture of masculinity and stoicism that discourages workers from openly seeking help for mental health concerns. Following a colleague's suicide, a proactive, informal, and culturally sensitive approach is most likely to be effective. This means being present and approachable, normalising conversations about mental health, and providing discreet access to support rather than relying on formal processes that may feel exposing or stigmatising in this context.",
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Cultural sensitivity',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 34,
    question:
      'An employer has identified through routine monitoring that work-related stress is increasing in a particular department. Using the HSE Management Standards framework, which approach would be most effective for addressing this?',
    options: [
      'Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The HSE Management Standards framework is designed to address work-related stress at the organisational level, not just the individual level. The most effective approach is to systematically assess all six areas (Demands, Control, Support, Relationships, Role, Change) within the affected department to identify specific risk factors, and then implement targeted organisational changes. While individual resilience training can be helpful, it should not be the primary or sole response, as this can inadvertently place the blame on employees rather than addressing systemic issues.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'HSE Management Standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 35,
    question:
      'A Mental Health First Aider is supporting a colleague who discloses they are self-harming. The colleague is over 18 and states clearly that they do not want anyone else to know. They say the self-harm helps them cope and they are not suicidal. Considering the legal and ethical framework, the most appropriate course of action is to:',
    options: [
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'Respect their autonomy as an adult while expressing concern, exploring their reasons for not wanting others to know, strongly encouraging professional help, and documenting the conversation for your own safeguarding records',
    ] as const,
    correctAnswer: 3,
    explanation:
      'This scenario requires balancing confidentiality, duty of care, and individual autonomy. As the person is an adult, not expressing suicidal intent, and has capacity, their autonomy should be respected. However, the MHFA should express genuine concern, explore barriers to seeking help, strongly encourage professional support, and keep a confidential record. Self-harm alone, in the absence of suicidal intent or immediate risk to life, does not automatically require breaking confidentiality. The MHFA should also seek supervision or support for themselves given the emotional weight of the disclosure.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Confidentiality and when it can be broken',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 36,
    question:
      'An organisation is implementing the enhanced standards from the Thriving at Work report. They already meet the core standards. Which of the following would represent progress towards the enhanced standards?',
    options: [
      'Increasing transparency and accountability through internal and external reporting on mental health, including senior leaders publicly championing mental health and sharing their own experiences',
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'Regularly eating large quantities of food very quickly to the point of discomfort, with a feeling of loss of control, without compensatory purging',
      'Physical health conditions can increase the risk of poor mental health, and poor mental health can lead to physical health problems — a holistic approach is needed',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The Thriving at Work enhanced standards go beyond the core standards and include measures such as increasing transparency and accountability through internal and external reporting, with senior leaders publicly championing mental health. Other enhanced standards include tailoring support for specific groups (such as those in high-risk roles), improving support for people returning to work after mental health absence, and measuring the impact of mental health initiatives. The enhanced standards reflect a deeper organisational commitment to mental health.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Thriving at Work core standards',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 37,
    question:
      'A large electrical contracting firm has noticed high turnover and increasing sickness absence. Exit interviews suggest poor management practices and a culture of presenteeism. Analysing this through the lens of both the Health & Safety at Work Act 1974 and the HSE Management Standards, which statement is most accurate?',
    options: [
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'The employer is potentially failing in their legal duty under the Health & Safety at Work Act 1974 to protect employee welfare, and a systematic assessment using the HSE Management Standards could help identify and address the organisational factors contributing to poor mental health, potentially reducing both turnover and absence',
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The Health & Safety at Work Act 1974 places a duty on employers to protect the health, safety, and welfare of employees, and this explicitly includes mental health. Poor management practices and a culture of presenteeism suggest the employer may be failing to manage psychosocial risks. The HSE Management Standards provide a practical framework for systematically assessing and addressing organisational factors such as demands, control, support, relationships, role clarity, and change management. Employers have a proactive duty; they should not wait for formal complaints.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Health & Safety at Work Act 1974',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 38,
    question:
      "When considering the mental health continuum in a workplace setting, which of the following scenarios best illustrates why a continuum model is more useful than a binary 'well/unwell' model?",
    options: [
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping',
      'An employee with no diagnosed condition begins to struggle with sleep, concentration, and motivation after a period of organisational change, and their performance gradually declines even though they would not meet diagnostic criteria for a mental health condition',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The continuum model is more useful because it recognises that mental health is not simply a matter of being 'well' or 'unwell'. Option B illustrates how an employee can move along the continuum from thriving to struggling without necessarily meeting diagnostic criteria for a specific condition. This model enables earlier intervention, as support can be provided when someone is beginning to struggle, rather than waiting until they reach a crisis point or receive a formal diagnosis. It also reduces stigma by normalising the fluctuation of mental health.",
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Mental health spectrum/continuum',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 39,
    question:
      'A Mental Health First Aider is approached by a colleague from a cultural background where mental health problems are considered deeply shameful and a private family matter. The colleague is clearly distressed but is reluctant to discuss their feelings or accept help. Applying principles of cultural sensitivity, non-judgemental communication, and the ALGEE framework, the best approach is to:',
    options: [
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Acknowledge and respect their cultural perspective without judgement, gently express your concern, offer to be available if they change their mind, and provide discreet information about culturally appropriate support services',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Cultural sensitivity requires respecting the person's cultural perspective while still showing genuine concern. The ALGEE framework should be adapted to the cultural context. This means approaching with care, listening without judgement, acknowledging their cultural frame of reference, not dismissing or challenging their beliefs, and offering support in a way that respects their autonomy. Providing information about culturally appropriate services (such as those available in their first language or from practitioners with shared cultural understanding) can reduce barriers to seeking help.",
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Cultural sensitivity',
    category: 'Mental Health Fundamentals' as const,
  },
  {
    id: 40,
    question:
      'An organisation is defending an employment tribunal claim under the Equality Act 2010 brought by an employee who was dismissed while experiencing a severe depressive episode. The employer claims they were unaware of the condition. Considering the legal framework, which of the following is most accurate?',
    options: [
      "Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee's disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed",
      "Acknowledge and respect their cultural perspective without judgement, gently express your concern, offer to be available if they change their mind, and provide discreet information about culturally appropriate support services",
      "The employer is potentially failing in their legal duty under the Health & Safety at Work Act 1974 to protect employee welfare, and a systematic assessment using the HSE Management Standards could help identify and address the organisational factors contributing to poor mental health, potentially reducing both turnover and absence",
      "Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency",
    ] as const,
    correctAnswer: 0,
    explanation:
      'Under the Equality Act 2010, employers have a duty to make reasonable adjustments for employees with disabilities, which can include mental health conditions that have a substantial and long-term adverse effect on day-to-day activities. Crucially, an employer can be held liable if they knew or could reasonably have been expected to know about the disability. This means that if there were visible signs such as changes in behaviour, performance, attendance patterns, or if the employee had disclosed to a manager or colleague, the employer may be deemed to have had constructive knowledge. Simply claiming ignorance is not always a defence.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced' as const,
    topic: 'Equality Act 2010',
    category: 'Mental Health Fundamentals' as const,
  },

  // =======================================================================
  // DEPRESSION, ANXIETY & STRESS — 40 questions (id 41–80)
  // =======================================================================

  // ============================================================
  // BASIC (16 questions, IDs 41-56)
  // ============================================================
  {
    id: 41,
    question:
      'How long must symptoms of low mood persist before clinical depression may be diagnosed?',
    options: [
      'At least 3 days',
      'At least 2 weeks',
      'At least 1 week',
      'At least 6 weeks',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Clinical depression is typically diagnosed when symptoms persist for at least 2 weeks and cause significant impairment in daily functioning. Low mood lasting a few days is a normal human experience and does not meet the threshold for clinical depression.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Clinical depression vs low mood',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 42,
    question:
      'Which of the following is a key difference between low mood and clinical depression?',
    options: [
      'So employees know who they can approach for support and how to reach them',
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'Clinical depression is a diagnosable condition that significantly impairs daily functioning',
      'Share relevant, accurate information and reassure the person that help is available and recovery is possible',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Clinical depression is a diagnosable mental health condition that significantly impairs a person's ability to function in daily life, work, and relationships. Low mood is a normal emotional response that usually passes on its own without treatment.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Clinical depression vs low mood',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 43,
    question:
      'Which type of depression is linked to seasonal changes, typically worsening during winter months?',
    options: [
      'Postnatal depression',
      'Persistent depressive disorder',
      'Major Depressive Disorder',
      'Seasonal Affective Disorder (SAD)',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Seasonal Affective Disorder (SAD) is a type of depression that follows a seasonal pattern, most commonly worsening during autumn and winter when daylight hours are reduced. It is thought to be related to reduced exposure to sunlight affecting serotonin and melatonin levels.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Types of depression',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 44,
    question: 'Which of the following is a common emotional symptom of depression?',
    options: [
      'Persistent feelings of hopelessness and sadness',
      'A fixed, false belief held despite evidence to the contrary',
      'CALM (Campaign Against Living Miserably)',
      'Grandiose thinking and inflated self-esteem',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Persistent feelings of hopelessness and sadness are core emotional symptoms of depression. Increased appetite can be a physical symptom (though decreased appetite is more common), while rapid heartbeat and muscle tension are more commonly associated with anxiety.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Depression symptoms',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 45,
    question: "What does the 'fight-flight-freeze' response describe?",
    options: [
      "They are not addictive, but stopping suddenly can cause withdrawal symptoms",
      "The body's automatic survival response to perceived danger",
      "Allowing flexible working hours or phased return to work after absence",
      "Withdrawing from social activities and isolating yourself",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The fight-flight-freeze response is the body's automatic physiological reaction to a perceived threat or danger. It is controlled by the sympathetic nervous system and prepares the body to either confront the threat (fight), run away (flight), or become immobile (freeze).",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Fight-flight-freeze response',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 46,
    question: 'Which of the following is a common physical symptom of anxiety?',
    options: [
      'Regular physical exercise and maintaining a routine',
      'Severity of generalised anxiety disorder symptoms',
      'Heart palpitations and shortness of breath',
      '"Just snap out of it and think positive"',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Heart palpitations and shortness of breath are common physical symptoms of anxiety caused by the activation of the sympathetic nervous system. Feeling emotionally numb and loss of interest are more associated with depression, while sleeping too much (hypersomnia) can occur in depression.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Physical symptoms of anxiety',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 47,
    question: 'How long does a typical panic attack usually last?',
    options: [
      '30 seconds to 1 minute',
      'The whole day',
      '1 to 3 hours',
      '5 to 20 minutes',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A typical panic attack usually peaks within about 10 minutes and lasts between 5 and 20 minutes, although some symptoms may linger longer. Despite feeling extremely distressing and frightening, panic attacks are not physically dangerous.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Panic attacks',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 48,
    question: 'What is the HSE definition of workplace stress?',
    options: [
      'The adverse reaction people have to excessive pressures or demands placed on them',
      'Produce, implement, and communicate a mental health at work plan',
      'A condition involving persistent, excessive worry about many different things',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The Health and Safety Executive (HSE) defines work-related stress as 'the adverse reaction people have to excessive pressures or other types of demand placed on them'. This distinguishes harmful stress from normal, manageable workplace pressure.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Workplace stress',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 49,
    question: 'What is the difference between acute and chronic stress?',
    options: [
      'Acute stress is always harmful; chronic stress is beneficial',
      'Acute stress is short-term; chronic stress is long-lasting and ongoing',
      'There is no meaningful difference between the two',
      'Acute stress only affects the mind; chronic stress only affects the body',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Acute stress is a short-term response to an immediate perceived threat or challenge and usually resolves quickly. Chronic stress is long-lasting, ongoing stress that persists over weeks, months, or years. Chronic stress is particularly harmful to physical and mental health.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Acute vs chronic stress',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 50,
    question:
      'Which of the following is something you should NOT say to someone experiencing depression?',
    options: [
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m here for you and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m listening"',
      '"Would you like to talk about how you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re feeling?"',
      '"Just snap out of it and think positive"',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed you haven\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t seemed yourself lately"',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Telling someone to 'snap out of it' or 'think positive' minimises their experience and implies that depression is a choice. Depression is a medical condition, not a lack of willpower. Supportive statements that show you care and are willing to listen are far more helpful.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'What to say / what NOT to say',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 51,
    question: 'What does CBT stand for?',
    options: [
      'Counselling-Based Technique',
      'Clinical Behavioural Treatment',
      'Comprehensive Brain Therapy',
      'Cognitive Behavioural Therapy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'CBT stands for Cognitive Behavioural Therapy. It is a widely used, evidence-based talking therapy that helps people identify and change unhelpful thinking patterns and behaviours. It is recommended by NICE as a first-line treatment for many mental health conditions including depression and anxiety.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Talking therapies',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 52,
    question: 'Which type of depression can occur after giving birth?',
    options: [
      'Postnatal depression',
      'Seasonal Affective Disorder',
      'Persistent depressive disorder',
      'Generalised Anxiety Disorder',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Postnatal depression (also called postpartum depression) can develop in the weeks and months following childbirth. It is different from the 'baby blues', which are milder and typically resolve within two weeks. Postnatal depression requires professional support and treatment.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Types of depression',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 53,
    question: 'What is a common behavioural symptom of depression?',
    options: [
      'Encourages a fuller, more detailed response from the person',
      'Withdrawing from social activities and isolating yourself',
      'Grandiose thinking and inflated self-esteem',
      'Step 3 — High-intensity interventions for moderate to severe depression',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Social withdrawal and isolation are common behavioural symptoms of depression. People may stop seeing friends, avoid activities they once enjoyed, and pull away from family and colleagues. Excessive hand-washing and checking are more associated with OCD, while hyperventilating is linked to anxiety and panic.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Depression symptoms',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 54,
    question: 'What is Generalised Anxiety Disorder (GAD)?',
    options: [
      'Acute stress is short-term; chronic stress is long-lasting and ongoing',
      'Stay calm, speak gently, and do not argue with their delusions',
      'A condition involving persistent, excessive worry about many different things',
      'Encourages a fuller, more detailed response from the person',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Generalised Anxiety Disorder (GAD) is characterised by persistent, excessive, and uncontrollable worry about a wide range of everyday issues such as health, finances, work, and relationships. The worry is disproportionate to the actual likelihood of the feared events occurring.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Anxiety disorders',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 55,
    question: 'What is the first thing you should do if someone is having a panic attack?',
    options: [
      'Persistent feelings of hopelessness and sadness',
      'Cycles of binge eating followed by compensatory behaviours such as purging',
      'Allowing flexible working hours or phased return to work after absence',
      'Stay calm, reassure them, and help them focus on slow breathing',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When someone is having a panic attack, the most helpful first response is to stay calm yourself, reassure them that they are safe and the panic will pass, and gently encourage slow, controlled breathing. Leaving them alone or dismissing their experience is unhelpful. Calling 999 is not usually necessary unless you suspect a medical emergency.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Panic attacks',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 56,
    question: 'Which of the following is a risk factor for developing depression?',
    options: [
      'Family history of depression',
      'Strong social support network',
      'Regular physical exercise',
      'Having a varied diet',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A family history of depression is a recognised risk factor, as genetics can play a role in predisposing someone to the condition. Other risk factors include significant life events, chronic illness, substance misuse, and social isolation. Regular exercise, strong social support, and a healthy diet are protective factors.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Risk factors for depression',
    category: 'Depression, Anxiety & Stress' as const,
  },

  // ============================================================
  // INTERMEDIATE (16 questions, IDs 57-72)
  // ============================================================
  {
    id: 57,
    question: 'What is persistent depressive disorder (formerly known as dysthymia)?',
    options: [
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'A chronic form of depression lasting 2 years or more with milder but persistent symptoms',
      'Ranges from thriving through to struggling and crisis, and can fluctuate over time',
      'The adverse reaction people have to excessive pressures or demands placed on them',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Persistent depressive disorder (previously called dysthymia) is a chronic form of depression where symptoms last for 2 years or more in adults. While symptoms are often less severe than Major Depressive Disorder, their persistent nature can significantly impact quality of life and daily functioning.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Types of depression',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 58,
    question: 'Which of the following best describes the cognitive symptoms of depression?',
    options: [
      'Diagnose mental health conditions or prescribe treatment',
      'Step 3 — High-intensity interventions for moderate to severe depression',
      'Difficulty concentrating, indecisiveness, and negative thinking patterns',
      'A free 24/7 crisis text service — text SHOUT to 85258',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Cognitive symptoms of depression include difficulty concentrating, problems with memory, indecisiveness, and persistent negative thinking patterns such as self-blame, guilt, and hopelessness. These cognitive changes can significantly impair work performance and daily decision-making.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Depression symptoms',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 59,
    question: 'What are the three dimensions of the Maslach Burnout Model?',
    options: [
      'Nausea, headaches, and increased anxiety in the first few weeks',
      'Listen non-judgementally and let them know you care, without insisting they stop',
      'People who talk about suicide are just seeking attention and won\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t actually do it',
      'Emotional exhaustion, cynicism (depersonalisation), and reduced personal efficacy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The Maslach Burnout Model identifies three key dimensions: emotional exhaustion (feeling drained and unable to cope), cynicism or depersonalisation (becoming detached and negative towards work and colleagues), and reduced personal efficacy (feeling incompetent and unproductive). All three dimensions must be considered when assessing burnout.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Maslach burnout model',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 60,
    question:
      "In the ALGEE action plan for mental health first aid, what does the 'E' (first E) stand for?",
    options: [
      'Encourage appropriate professional help',
      'CALM (Campaign Against Living Miserably)',
      'NHS Talking Therapies (formerly IAPT)',
      'Family history of depression',
    ] as const,
    correctAnswer: 0,
    explanation:
      "In the ALGEE action plan, the first 'E' stands for Encourage appropriate professional help. The full acronym is: Approach, assess and assist with any crisis (A), Listen non-judgementally (L), Give reassurance and information (G), Encourage appropriate professional help (E), and Encourage self-help and other support strategies (E).",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Supporting someone using ALGEE',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 61,
    question: 'What characterises social anxiety disorder?',
    options: [
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Intense fear and avoidance of social situations due to worry about being judged or embarrassed',
      'You should keep what the person tells you private unless there is a risk of harm to themselves or others',
      'An insurance policy that offers less coverage for mental health treatment compared to physical health treatment',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Social anxiety disorder (social phobia) involves an intense, persistent fear of being watched, judged, or embarrassed in social situations. People with this condition may avoid social interactions, public speaking, or eating in front of others. It goes beyond normal shyness and significantly impacts daily life.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Anxiety disorders',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 62,
    question:
      'Which of the following is true about SSRIs (Selective Serotonin Reuptake Inhibitors)?',
    options: [
      'They are physically addictive like opioids',
      'They work immediately from the first dose',
      'They are not addictive, but stopping suddenly can cause withdrawal symptoms',
      'They should only be taken during depressive episodes and stopped when feeling better',
    ] as const,
    correctAnswer: 2,
    explanation:
      'SSRIs are not addictive in the way that substances like opioids or alcohol are. However, stopping them suddenly can cause discontinuation symptoms (sometimes called withdrawal), such as dizziness, nausea, and mood changes. This is why doses should always be reduced gradually under medical supervision.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'SSRIs basics',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 63,
    question: 'What is agoraphobia?',
    options: [
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
      'A short, informal safety or awareness talk delivered on site, often at the start of a shift',
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Agoraphobia is an anxiety disorder characterised by fear and avoidance of situations or places where the person feels escape might be difficult or help unavailable if they have a panic attack. This can include open spaces, crowds, public transport, or being outside the home alone. It often develops alongside panic disorder.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Anxiety disorders',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 64,
    question: 'What does OCD stand for, and what are its two main features?',
    options: [
      'Obsessive Compulsive Disorder; obsessions (intrusive thoughts) and compulsions (repetitive behaviours)',
      'Obsessive Control Disorder; controlling behaviour and anger',
      'Occasional Compulsive Distress; occasional worry and distress',
      'Overwhelming Cognitive Dysfunction; memory loss and confusion',
    ] as const,
    correctAnswer: 0,
    explanation:
      'OCD stands for Obsessive Compulsive Disorder. It has two main features: obsessions (unwanted, intrusive, and distressing thoughts, images, or urges) and compulsions (repetitive behaviours or mental acts performed to reduce the anxiety caused by the obsessions). Common examples include contamination fears leading to excessive hand-washing.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'OCD and PTSD basics',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 65,
    question:
      'Why is the construction industry associated with higher levels of stress and mental health problems?',
    options: [
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
      'GPs assess symptoms, diagnose depression, discuss treatment options, and can refer to specialist services',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The construction industry faces unique mental health challenges due to factors such as long and unpredictable working hours, time away from home and family, job insecurity and short-term contracts, physically demanding work, a macho culture that discourages discussing emotions, and higher rates of substance misuse. These factors combine to create elevated risk.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Stress in construction',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 66,
    question: 'What is the NICE stepped care model for treating depression?',
    options: [
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'No — research shows that asking directly about suicide does not increase risk and can actually help',
      'A framework where treatment is matched to severity, starting with least intensive and stepping up if needed',
      'Difficulty managing or controlling emotional responses, leading to intense or rapidly shifting emotions',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The NICE stepped care model is a framework for organising mental health services where people receive the least intensive treatment appropriate to their needs first, and 'step up' to more intensive treatments only if they do not improve. Steps range from self-help and guided self-help at lower levels to specialist services and inpatient care at higher levels.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'NICE stepped care model',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 67,
    question: 'What is NHS Talking Therapies (formerly IAPT)?',
    options: [
      'A chronic form of depression lasting 2 years or more with milder but persistent symptoms',
      'When the general public holds negative attitudes, beliefs, and stereotypes about people with mental health problems',
      'It should include the organisation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s position, rules, support available, testing procedures (if applicable), and consequences of policy breaches',
      'An NHS service providing evidence-based psychological therapies for anxiety and depression, accessible via self-referral',
    ] as const,
    correctAnswer: 3,
    explanation:
      'NHS Talking Therapies (previously known as Improving Access to Psychological Therapies or IAPT) is an NHS programme that provides evidence-based talking therapies for common mental health conditions like depression and anxiety. A key feature is that people can self-refer without needing a GP referral, making it more accessible.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'GP referral pathway, NHS Talking Therapies',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 68,
    question: 'Which of the following is a common side effect when first starting SSRIs?',
    options: [
      'Nausea, headaches, and increased anxiety in the first few weeks',
      'Men who are feeling low or suicidal — 0800 58 58 58',
      'Emotional exhaustion, cynicism (depersonalisation), and reduced personal efficacy',
      'Acute stress is short-term; chronic stress is long-lasting and ongoing',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Common side effects when starting SSRIs include nausea, headaches, sleep disturbance, and a temporary increase in anxiety. These side effects usually improve within the first 1-2 weeks. SSRIs typically take 4-6 weeks to show their full therapeutic effect on mood. Serious side effects are uncommon.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'SSRIs basics',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 69,
    question: 'What is PTSD and what triggers it?',
    options: [
      'Persistent Tension and Stress Disorder; triggered by workplace pressure',
      'Post-Traumatic Stress Disorder; triggered by experiencing or witnessing a traumatic event',
      'Post-Treatment Stress Dysfunction; triggered by medical procedures',
      'Progressive Thought Suppression Disorder; triggered by negative thinking',
    ] as const,
    correctAnswer: 1,
    explanation:
      'PTSD (Post-Traumatic Stress Disorder) is a mental health condition triggered by experiencing or witnessing a terrifying or life-threatening event. Symptoms include flashbacks, nightmares, severe anxiety, hypervigilance, and avoidance of reminders of the trauma. It can develop weeks, months, or even years after the event.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'OCD and PTSD basics',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 70,
    question: 'What is the role of a GP in the treatment pathway for depression?',
    options: [
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'GPs assess symptoms, diagnose depression, discuss treatment options, and can refer to specialist services',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
    ] as const,
    correctAnswer: 2,
    explanation:
      'GPs play a central role in the depression treatment pathway. They assess symptoms, make diagnoses, discuss treatment options (including medication and talking therapies), monitor progress, and refer to specialist mental health services when needed. They are often the first point of professional contact for people experiencing depression.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'GP referral pathway, NHS Talking Therapies',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 71,
    question: 'Which of the following describes panic disorder?',
    options: [
      'Produce, implement, and communicate a mental health at work plan',
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Recurrent, unexpected panic attacks with persistent worry about having further attacks',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Panic disorder is characterised by recurrent and unexpected panic attacks, along with persistent worry or fear about having more attacks, and changes in behaviour to avoid situations that might trigger them. It is different from having occasional panic attacks in response to a specific trigger.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Anxiety disorders',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 72,
    question:
      'Which self-help strategy is widely recommended for managing both depression and anxiety?',
    options: [
      'Regular physical exercise and maintaining a routine',
      'Consuming alcohol to relax',
      'Avoiding all social contact to reduce stimulation',
      'Working longer hours to distract yourself',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Regular physical exercise is one of the most widely recommended self-help strategies for managing both depression and anxiety. Exercise releases endorphins, improves sleep, and provides structure to the day. NICE guidelines recommend structured exercise programmes as part of depression treatment. Maintaining a daily routine also helps provide stability and purpose.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate' as const,
    topic: 'Self-help and wellbeing strategies',
    category: 'Depression, Anxiety & Stress' as const,
  },

  // ============================================================
  // ADVANCED (8 questions, IDs 73-80)
  // ============================================================
  {
    id: 73,
    question:
      'In the NICE stepped care model for depression, at which step would high-intensity psychological interventions such as individual CBT typically be offered?',
    options: [
      'A short, informal safety or awareness talk delivered on site, often at the start of a shift',
      'Step 3 — High-intensity interventions for moderate to severe depression',
      'No more than 14 units per week, spread over 3 or more days',
      'Withdrawing from social activities and isolating yourself',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In the NICE stepped care model, high-intensity psychological interventions such as individual CBT, interpersonal therapy (IPT), or behavioural activation are offered at Step 3, which is for people with moderate to severe depression or those who have not responded to Step 2 low-intensity interventions such as guided self-help or computerised CBT.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'NICE stepped care model',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 74,
    question:
      "A construction worker discloses to you that he has been feeling hopeless for several weeks, has stopped eating properly, and says 'what's the point anymore'. Using the ALGEE framework, what should your first priority be?",
    options: [
      'Intense fear and avoidance of social situations due to worry about being judged or embarrassed',
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
      'Approach, assess, and assist with any crisis — including assessing for suicidal thoughts',
      'You should keep what the person tells you private unless there is a risk of harm to themselves or others',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The 'A' in ALGEE stands for 'Approach, assess and assist with any crisis'. When someone expresses hopelessness and uses phrases like 'what's the point', the first priority is to assess whether they are having suicidal thoughts and ensure their immediate safety. This always comes before listening, giving information, or encouraging help-seeking.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'Supporting someone using ALGEE',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 75,
    question:
      'How does Interpersonal Therapy (IPT) differ from CBT in its approach to treating depression?',
    options: [
      'Regular cannabis use, particularly high-strength varieties, is linked to increased risk of anxiety, depression, and psychosis',
      'To provide a confidential space for MHFAs to reflect on their experiences, process emotions, and receive guidance',
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Interpersonal Therapy (IPT) focuses on how a person's relationships and interpersonal difficulties (such as grief, role disputes, role transitions, and interpersonal deficits) contribute to their depression. CBT, in contrast, focuses on identifying and changing unhelpful thinking patterns and behaviours. Both are NICE-recommended treatments for depression.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'Talking therapies',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 76,
    question:
      'Which of the following accurately describes the relationship between the Maslach burnout dimensions and workplace outcomes in construction?',
    options: [
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'Tell him you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ve noticed changes and you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re worried, ask directly if he\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s having thoughts of suicide, offer to help him make a safety plan, and call professional support if needed',
      'While self-harm is not always a suicide attempt, it is one of the strongest risk factors for future suicide; approximately 50% of people who die by suicide have a history of self-harm',
      'The responsibility of a line manager or MHFA to signpost a person to appropriate professional support when a situation is beyond their competence',
    ] as const,
    correctAnswer: 0,
    explanation:
      'All three dimensions of the Maslach burnout model have significant implications for workplace safety in construction. Emotional exhaustion impairs concentration and alertness, cynicism (depersonalisation) undermines teamwork and communication vital for safety, and reduced personal efficacy leads to poor judgement and decision-making. Together, these create serious safety risks in high-hazard environments.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'Maslach burnout model',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 77,
    question:
      "A colleague tells you he's been prescribed sertraline (an SSRI) but wants to stop taking it after two weeks because 'it's not working'. What is the most appropriate response?",
    options: [
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
      'Explain that SSRIs typically take 4-6 weeks to show full effect and encourage him to discuss concerns with his GP before making changes',
      'Thank them for telling you, listen without judgement, and gently suggest they speak to their GP or contact a support service',
      'Self-harm is when someone deliberately hurts themselves as a way of coping with emotional distress',
    ] as const,
    correctAnswer: 1,
    explanation:
      'SSRIs typically take 4 to 6 weeks to reach their full therapeutic effect. Early side effects (such as nausea and increased anxiety) often settle within the first 1-2 weeks. It is important to encourage the person to continue taking the medication as prescribed and to speak with their GP before making any changes, as stopping suddenly can cause withdrawal symptoms.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'SSRIs basics',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 78,
    question:
      'Which of the following correctly distinguishes between a specific phobia and Generalised Anxiety Disorder?',
    options: [
      'Listen non-judgementally, offer reassurance, and gently encourage them to seek professional help while respecting their confidentiality',
      'He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help',
      'A specific phobia involves intense fear triggered by a particular object or situation; GAD involves persistent, excessive worry across multiple areas of life',
      'Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A specific phobia is an intense, irrational fear triggered by a particular object or situation (such as heights, spiders, or flying), leading to avoidance behaviour. GAD, by contrast, involves persistent and excessive worry about many different areas of life (health, finances, work, relationships) that is difficult to control and is not focused on a single trigger.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'Anxiety disorders',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 79,
    question:
      'In supporting a construction worker experiencing chronic stress and early signs of depression, which combination of actions best reflects the ALGEE approach and appropriate referral pathways?',
    options: [
      'He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help',
      'A coordinated plan including continued mental health support, substance misuse treatment, a safety plan, GP follow-up within 48 hours, social support networks, and regular monitoring of both conditions',
      'The responsibility of a line manager or MHFA to signpost a person to appropriate professional support when a situation is beyond their competence',
      'Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral',
    ] as const,
    correctAnswer: 3,
    explanation:
      "The ALGEE framework guides you to: approach and assess (checking for crisis), listen non-judgementally, give reassurance and information, encourage appropriate professional help (such as seeing their GP), and encourage self-help strategies. Suggesting NHS Talking Therapies, which allows self-referral, empowers the person to access support directly. You should never diagnose, recommend medication, or disclose someone's mental health to others without consent.",
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'Supporting someone using ALGEE',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 80,
    question:
      'According to NICE guidelines, when should antidepressant medication be considered as a first-line treatment for depression rather than psychological therapy alone?',
    options: [
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
      'Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site',
      'Warning signs, internal coping strategies, people and social settings for distraction, people to ask for help, professionals and agencies to contact, making the environment safe',
      'Physical health conditions can increase the risk of poor mental health, and poor mental health can lead to physical health problems — a holistic approach is needed',
    ] as const,
    correctAnswer: 0,
    explanation:
      'NICE guidelines recommend that antidepressant medication should be considered as a first-line treatment for moderate to severe depression, particularly when symptoms significantly impair functioning. It may also be considered when the person has a history of recurrent depression and has responded well to antidepressants in the past. For mild depression, guided self-help and low-intensity psychological interventions are typically recommended first.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced' as const,
    topic: 'NICE stepped care model',
    category: 'Depression, Anxiety & Stress' as const,
  },

  // =======================================================================
  // SUBSTANCE MISUSE, SELF-HARM & SUICIDE — 40 questions (id 81–120)
  // =======================================================================

  // ==================== BASIC (16 questions, IDs 81-96) ====================
  {
    id: 81,
    question: "What is the UK Chief Medical Officers' low-risk drinking guideline for adults?",
    options: [
      'No more than 21 units per week for men and 14 for women',
      'No more than 14 units per week, spread over 3 or more days',
      'No more than 10 units per week with at least 2 alcohol-free days',
      'No more than 28 units per week if consumed with meals',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The UK Chief Medical Officers advise that to keep health risks from alcohol low, both men and women should not regularly drink more than 14 units per week. These units should be spread evenly over 3 or more days rather than consumed in one or two sessions.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'UK alcohol guidelines',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 82,
    question: 'What is the difference between substance use and substance misuse?',
    options: [
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'Self-harm is when someone deliberately hurts themselves as a way of coping with emotional distress',
      'Substance use refers to any consumption, while misuse is use that causes harm or is hazardous',
      'Offering rapid, specialist support during the first episode of psychosis to improve long-term outcomes',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Substance use simply refers to the consumption of a substance, which may be entirely legal and non-harmful (e.g. moderate social drinking). Substance misuse refers to use that is harmful, hazardous, or in a way not intended, such as binge drinking, using prescription medication at higher doses than prescribed, or taking illicit drugs.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Substance use vs misuse vs dependency',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 83,
    question:
      'Which of the following is a common physical sign that someone may be misusing alcohol?',
    options: [
      'Difficulty concentrating, indecisiveness, and negative thinking patterns',
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'The adverse reaction people have to excessive pressures or demands placed on them',
      'Unexplained weight loss or gain, trembling hands, and facial redness',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Physical signs of alcohol misuse can include unexplained weight changes, trembling hands (particularly in the morning), facial redness or broken capillaries, bloodshot eyes, poor personal hygiene, and smelling of alcohol at inappropriate times. These signs may develop gradually and become more noticeable over time.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Alcohol misuse signs and health effects',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 84,
    question: 'Approximately how many people die by suicide each year in the UK?',
    options: [
      'Around 6,000',
      'Around 1,000',
      'Around 12,000',
      'Around 3,000',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Approximately 6,000 people die by suicide each year in the UK. This equates to roughly 16 people every day. Suicide is a significant public health concern, and understanding the scale of the problem is important for raising awareness and encouraging people to learn suicide prevention skills.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'UK suicide statistics',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 85,
    question: 'Which group is at the highest risk of suicide in the UK?',
    options: [
      'The body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s automatic survival response to perceived danger',
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'Recurrent, unexpected panic attacks with persistent worry about having further attacks',
      'Encourages a fuller, more detailed response from the person',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In the UK, men account for approximately three-quarters of all suicides. Middle-aged men (aged 45-54) have the highest suicide rate. Among occupations, construction workers have the highest rate of suicide. This is linked to factors including job insecurity, physical demands, a culture of not seeking help, and higher rates of substance use.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'UK suicide statistics',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 86,
    question:
      "What does the 'T' stand for in the TASC model for responding to someone who may be suicidal?",
    options: [
      'Treat the person with medication',
      'Test their knowledge of helplines',
      'Tell the person you are concerned about them',
      'Take control of the situation immediately',
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the TASC model, 'T' stands for 'Tell' — tell the person you are concerned about them. This opens the conversation in a caring, non-judgemental way. The full model is: Tell (express concern), Ask (ask directly about suicide), Safety plan (help create one), Call (contact professional help or emergency services if needed).",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'TASC model',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 87,
    question: "What is the Samaritans' free 24/7 helpline number?",
    options: [
      '0800 58 58 58',
      '85258',
      '0800 068 4141',
      '116 123',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The Samaritans can be contacted free of charge, 24 hours a day, 7 days a week on 116 123. They provide a confidential emotional support service for anyone experiencing distress or despair, including suicidal thoughts. You can also email them at jo@samaritans.org.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Key helplines',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 88,
    question: 'Which of the following best describes self-harm?',
    options: [
      'Self-harm is when someone deliberately hurts themselves as a way of coping with emotional distress',
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Self-harm is when someone deliberately hurts themselves as a way of dealing with overwhelming emotional distress, painful memories, or difficult situations. It is not always a suicide attempt — many people who self-harm do not wish to die but are struggling to cope. Self-harm can take many forms beyond cutting, including burning, hitting, poisoning, or other methods.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Self-harm definition, types, prevalence',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 89,
    question: 'What is the SHOUT crisis text line number in the UK?',
    options: [
      '116 123',
      '85258',
      '999',
      '0800 068 4141',
    ] as const,
    correctAnswer: 1,
    explanation:
      "SHOUT is the UK's first 24/7 crisis text line. You can text 'SHOUT' to 85258 to be connected with a trained volunteer. It is free on most major networks and is suitable for anyone who is struggling to cope and needs immediate support via text rather than a phone call.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Key helplines',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 90,
    question: 'Which of the following is a common myth about suicide?',
    options: [
      "The body's automatic survival response to perceived danger",
      "A belief that others are plotting to harm, deceive, or persecute you",
      "People who talk about suicide are just seeking attention and won't actually do it",
      "Restricting food intake leading to significantly low body weight",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The belief that people who talk about suicide are 'just seeking attention' is a dangerous myth. In reality, talking about wanting to die or feeling hopeless is often a warning sign that should be taken seriously. Many people who die by suicide have previously expressed suicidal thoughts. Taking all mentions of suicide seriously and responding with care can save lives.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Myths about suicide',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 91,
    question: "What is 'dependency' in the context of substance use?",
    options: [
      'To provide a confidential space for MHFAs to reflect on their experiences, process emotions, and receive guidance',
      'Substance use refers to any consumption, while misuse is use that causes harm or is hazardous',
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
      'A condition where a person feels they need a substance to function normally, with withdrawal symptoms if they stop',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Dependency (or addiction) is characterised by a compulsive need to use a substance, loss of control over how much is consumed, and experiencing withdrawal symptoms when the substance is not taken. The person may develop tolerance (needing more to get the same effect) and continue using despite harmful consequences to their health, relationships, or work.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Substance use vs misuse vs dependency',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 92,
    question: 'When responding to someone who self-harms, which approach is most appropriate?',
    options: [
      'Listen non-judgementally and let them know you care, without insisting they stop',
      'Tell them they must stop self-harming immediately',
      'Show them graphic images of self-harm injuries to discourage them',
      'Ignore it because it is their personal choice',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The most appropriate response is to listen without judgement, express genuine care and concern, and avoid insisting they stop immediately. Demanding that someone stop self-harming can increase their distress and cause them to hide their behaviour. Instead, support them to explore professional help in their own time while ensuring any immediate injuries receive first aid.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Responding to self-harm',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 93,
    question: "What is 'means restriction' in the context of suicide prevention?",
    options: [
      "Restricting someone's access to money to prevent them buying drugs",
      'Reducing access to the means by which people could take their own life',
      'Limiting the amount of media coverage about suicide',
      "Restricting someone's ability to leave their home",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Means restriction is a key suicide prevention strategy that involves reducing access to methods of suicide. Examples include barriers on bridges, blister packs for medication (making it harder to take large quantities quickly), and safe storage of firearms. Research shows that restricting access to means can prevent suicides because suicidal crises are often brief — if someone cannot access a method quickly, the urge may pass.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Means restriction as prevention',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 94,
    question: 'Which of the following is a warning sign that someone may be considering suicide?',
    options: [
      'GPs assess symptoms, diagnose depression, discuss treatment options, and can refer to specialist services',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
      'Talking about being a burden, giving away possessions, or withdrawing from others',
      'Withdrawing from social activities and isolating yourself',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Warning signs of suicide can include talking about being a burden to others, giving away prized possessions, withdrawing from friends and family, increased use of alcohol or drugs, changes in sleep patterns, expressing hopelessness, and talking about wanting to die. Recognising these signs can be the first step in offering support.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Warning signs of suicide',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 95,
    question: 'When should you call 999 for a mental health crisis?',
    options: [
      'Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
      'When there is an immediate risk to life, such as someone about to act on suicidal thoughts or who has seriously harmed themselves',
    ] as const,
    correctAnswer: 3,
    explanation:
      'You should call 999 when there is an immediate risk to life. This includes situations where someone has taken an overdose, is about to act on suicidal thoughts, has seriously injured themselves, or is in immediate danger. Mental health crises can be medical emergencies and should be treated with the same urgency as physical emergencies.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'When to call 999 for mental health crisis',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 96,
    question: 'Does asking someone directly about suicide increase their risk of acting on it?',
    options: [
      'No — research shows that asking directly about suicide does not increase risk and can actually help',
      'A short, informal safety or awareness talk delivered on site, often at the start of a shift',
      'Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal',
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Research consistently shows that asking someone directly about suicide does not increase their risk. In fact, it can reduce distress by showing the person they are not alone and that someone cares. Many people experiencing suicidal thoughts feel relieved when asked, as it gives them permission to talk about their feelings. Being direct — using words like 'suicide' rather than euphemisms — is recommended.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'basic' as const,
    topic: 'Asking directly about suicide',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },

  // ==================== INTERMEDIATE (16 questions, IDs 97-112) ====================
  {
    id: 97,
    question: "What is 'dual diagnosis' in mental health?",
    options: [
      'Being diagnosed with the same condition twice by different clinicians',
      'Having both a mental health condition and a substance use disorder simultaneously',
      'Being diagnosed with two different physical illnesses at the same time',
      'Receiving two different opinions from two different doctors',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Dual diagnosis (also called co-occurring disorders or comorbidity) refers to someone who has both a mental health condition (such as depression, anxiety, or psychosis) and a substance use disorder at the same time. The two conditions often interact — substance use can worsen mental health symptoms, and mental health problems can drive substance use as a coping mechanism. Treatment should ideally address both issues together.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Dual diagnosis',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 98,
    question: 'What are the six steps of a safety plan for someone experiencing suicidal thoughts?',
    options: [
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
      'They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb',
      'Warning signs, coping strategies, people to contact for distraction, people to ask for help, professionals to contact, making the environment safe',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The six steps of a safety plan are: (1) Recognising personal warning signs that a crisis may be developing, (2) Internal coping strategies the person can use themselves, (3) People and social settings that can provide distraction, (4) People the person can ask for help, (5) Professionals and agencies to contact in a crisis, and (6) Making the environment safe by reducing access to means. A safety plan is personalised and created collaboratively.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Safety planning',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 99,
    question: 'Which of the following best describes how cannabis can affect mental health?',
    options: [
      'Complex PTSD includes all PTSD symptoms plus difficulties with emotional regulation, self-concept, and relationships',
      'Approach, assess, and assist with any crisis — including assessing for suicidal thoughts',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Regular cannabis use, particularly high-strength varieties, is linked to increased risk of anxiety, depression, and psychosis',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Regular cannabis use, especially high-strength (high-THC) varieties like skunk, is associated with an increased risk of developing mental health problems including anxiety, depression, and psychosis. The risk is higher for those who start using in adolescence, use frequently, and have a family history of mental illness. While some people use cannabis to cope with stress, it can ultimately worsen mental health outcomes.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Drug misuse',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 100,
    question:
      'A colleague confides that they have been drinking heavily every evening to cope with stress at work. What is the most appropriate initial response?',
    options: [
      'Thank them for telling you, listen without judgement, and gently suggest they speak to their GP or contact a support service',
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
      'Remain calm, validate their feelings without judgement, and help them find a safe way to manage the situation',
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
    ] as const,
    correctAnswer: 0,
    explanation:
      'When someone discloses substance misuse, the best initial response is to thank them for their trust, listen non-judgementally, express concern for their wellbeing, and gently suggest professional support such as their GP, occupational health, or services like Drinkline (0300 123 1110). Avoid being critical or dismissive, as this may discourage them from seeking help.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Approaching someone about substance use',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 101,
    question: 'Why might someone self-harm even when they have no intention of ending their life?',
    options: [
      'An NHS service providing evidence-based psychological therapies for anxiety and depression, accessible via self-referral',
      'They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb',
      'The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes',
      'Trauma experienced indirectly through witnessing or hearing about others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' traumatic experiences; first aiders, supervisors, and colleagues may be at risk',
    ] as const,
    correctAnswer: 1,
    explanation:
      'People self-harm for many reasons that are not about wanting to die. Common reasons include managing overwhelming emotional pain, feeling a sense of control, expressing distress that is hard to verbalise, punishing themselves, feeling something when emotionally numb, or coping with trauma. While self-harm and suicide are linked (self-harm is a risk factor for suicide), many people who self-harm are not suicidal — they are trying to cope with life, not end it.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Why people self-harm',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 102,
    question: 'What risks are associated with benzodiazepine misuse?',
    options: [
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'Warning signs, coping strategies, people to contact for distraction, people to ask for help, professionals to contact, making the environment safe',
      'Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal',
      'Clinical depression is a diagnosable condition that significantly impairs daily functioning',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Benzodiazepines (such as diazepam/Valium) carry significant risks when misused. Physical dependence can develop within weeks of regular use, and sudden withdrawal can cause seizures and be life-threatening. Combining benzodiazepines with other depressants like alcohol or opioids is particularly dangerous as it can lead to respiratory depression and death. They also impair judgement, coordination, and memory.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Drug misuse',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 103,
    question: 'Which of the following is a protective factor against suicide?',
    options: [
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'A condition involving persistent, excessive worry about many different things',
      'A helpline for anyone under 35 who is experiencing thoughts of suicide, on 0800 068 4141',
      'Strong social connections, a sense of belonging, and reasons for living',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Protective factors are characteristics or conditions that reduce the likelihood of suicide. They include strong social connections and a sense of belonging, having reasons for living (e.g. family, faith, pets), access to mental health support, effective coping skills, restricted access to means, and cultural or religious beliefs that discourage suicide. Building protective factors is an important part of suicide prevention.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Risk factors and protective factors for suicide',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 104,
    question: "What does the 'A' stand for in the TASC model?",
    options: [
      'Ask directly about suicide',
      'Assess their medication',
      'Avoid talking about feelings',
      'Arrange transport to hospital',
    ] as const,
    correctAnswer: 0,
    explanation:
      "In the TASC model, 'A' stands for 'Ask' — ask directly about suicide. This means using clear, direct language such as 'Are you thinking about suicide?' rather than vague questions. Research shows that asking directly does not increase risk and can open a vital conversation. Being direct shows you take their feelings seriously and creates space for honest discussion.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'TASC model',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 105,
    question: 'What is the Papyrus HOPELINEUK helpline, and who is it for?',
    options: [
      'A helpline for parents of children with ADHD, on 116 123',
      'A helpline for anyone under 35 who is experiencing thoughts of suicide, on 0800 068 4141',
      'A helpline exclusively for medical professionals, on 0800 58 58 58',
      'A helpline for adults over 65 experiencing loneliness, on 0800 068 4141',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Papyrus HOPELINEUK (0800 068 4141) is a specialist helpline for children and young people under 35 who are experiencing thoughts of suicide, and for anyone concerned about a young person. It is staffed by trained advisors who can provide support, practical advice, and information. They can also be contacted by text (07860 039967) or email (pat@papyrus-uk.org).',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Key helplines',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 106,
    question: 'What are the key elements of a workplace drug and alcohol policy?',
    options: [
      "Warning signs, coping strategies, people to contact for distraction, people to ask for help, professionals to contact, making the environment safe",
      "Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities",
      "It should include the organisation's position, rules, support available, testing procedures (if applicable), and consequences of policy breaches",
      "Recognise that this is a situation where confidentiality must be broken and seek appropriate help, explaining to the colleague why you need to involve others",
    ] as const,
    correctAnswer: 2,
    explanation:
      "A comprehensive workplace drug and alcohol policy should include: the organisation's position on substance use at work, clear rules about acceptable behaviour, details of support available (e.g. employee assistance programmes, occupational health), testing procedures if applicable, consequences for breaching the policy, and how confidentiality is handled. It should balance welfare support with safety responsibilities and apply to all employees.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Workplace drug and alcohol policies',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 107,
    question: 'Which of the following is a risk factor for suicide?',
    options: [
      'When a person with a mental health problem internalises negative stereotypes and feels shame about their condition',
      'Current sickness absence rates, presenteeism costs, and staff turnover data alongside the £5 ROI for every £1 invested',
      'By including mental health in risk assessments, H&S policies, induction processes, and incident reporting',
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Risk factors for suicide include previous suicide attempts (the strongest single predictor), mental health conditions (especially depression, bipolar disorder, and schizophrenia), substance misuse, social isolation and loneliness, relationship breakdown, bereavement, financial problems, chronic pain or illness, exposure to others' suicide, and access to lethal means. Multiple risk factors often combine, and risk can change over time.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Risk factors and protective factors for suicide',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 108,
    question: 'What should you do if you discover someone has self-harmed and has an open wound?',
    options: [
      'Apply basic first aid (clean the wound, apply pressure if bleeding, cover with a clean dressing) and encourage them to seek medical attention if needed',
      'Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms',
      'A framework where treatment is matched to severity, starting with least intensive and stepping up if needed',
      'Creating an open culture where mental health is discussed regularly, leaders share their own experiences, and language is inclusive',
    ] as const,
    correctAnswer: 0,
    explanation:
      "If someone has an open wound from self-harm, provide basic first aid: apply pressure with a clean cloth if actively bleeding, clean the wound gently, and cover with a clean dressing. Encourage them to seek medical attention if the wound is deep, won't stop bleeding, or shows signs of infection. Treat them with the same care and compassion you would anyone with an injury, without judgement about how it occurred.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'First aid for self-harm injuries',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 109,
    question: 'What are the long-term health effects of heavy alcohol misuse?',
    options: [
      'Setting aside your own opinions and values to provide a safe space where the person feels accepted and heard',
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'A condition involving persistent, excessive worry about many different things',
      'Substance use refers to any consumption, while misuse is use that causes harm or is hazardous',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Long-term heavy alcohol misuse can cause serious damage to multiple organ systems. This includes liver disease (fatty liver, hepatitis, cirrhosis), cardiovascular disease, brain damage and cognitive impairment, increased risk of several cancers (mouth, throat, liver, breast, bowel), pancreatitis, weakened immune system, and mental health problems including depression and anxiety. It can also contribute to relationship breakdown and social problems.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Alcohol misuse signs and health effects',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 110,
    question: "What does the 'S' stand for in the TASC model?",
    options: [
      'Stay calm, speak gently, and do not argue with their delusions',
      'Diagnose mental health conditions or prescribe treatment',
      'Safety plan — help them create a plan to keep safe',
      'Tell the person you are concerned about them',
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the TASC model, 'S' stands for 'Safety plan' — help the person create a safety plan. This involves working with them to identify warning signs, coping strategies, supportive people they can contact, professional help available, and steps to make their environment safer. A safety plan is a collaborative, personalised document that gives the person practical steps to follow when they feel at risk.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'TASC model',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 111,
    question:
      'CALM (Campaign Against Living Miserably) provides a helpline for whom, and what is the number?',
    options: [
      'Women experiencing postnatal depression — 0800 068 4141',
      'People with eating disorders — 85258',
      'Children experiencing bullying — 116 123',
      'Men who are feeling low or suicidal — 0800 58 58 58',
    ] as const,
    correctAnswer: 3,
    explanation:
      "CALM (Campaign Against Living Miserably) runs a helpline on 0800 58 58 58, available from 5pm to midnight every day. While CALM's focus has historically been on men (reflecting the disproportionate male suicide rate), their services are available to anyone who needs support. They also offer a webchat service through their website.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Key helplines',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 112,
    question: 'What are the risks associated with prescription opioid misuse?',
    options: [
      'Tolerance, physical dependence, overdose (especially when combined with alcohol or benzodiazepines), and respiratory depression',
      'Explain that SSRIs typically take 4-6 weeks to show full effect and encourage him to discuss concerns with his GP before making changes',
      'Apply basic first aid (clean the wound, apply pressure if bleeding, cover with a clean dressing) and encourage them to seek medical attention if needed',
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Prescription opioids (such as codeine, tramadol, morphine, and fentanyl) carry significant risks when misused. Tolerance develops quickly, meaning higher doses are needed for the same effect. Physical dependence can lead to withdrawal symptoms. Overdose risk is serious, particularly when opioids are combined with alcohol, benzodiazepines, or other depressants, as this can cause fatal respiratory depression. The UK has seen rising rates of opioid-related deaths.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'intermediate' as const,
    topic: 'Drug misuse',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },

  // ==================== ADVANCED (8 questions, IDs 113-120) ====================
  {
    id: 113,
    question:
      'A construction worker who has recently separated from his partner begins turning up to site smelling of alcohol and withdrawing from colleagues. Using the TASC model, which of the following represents the most appropriate sequence of actions?',
    options: [
      "IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours",
      "Tell him you've noticed changes and you're worried, ask directly if he's having thoughts of suicide, offer to help him make a safety plan, and call professional support if needed",
      "A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community",
      "Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks",
    ] as const,
    correctAnswer: 1,
    explanation:
      "This scenario combines multiple risk factors: male gender, construction industry, relationship breakdown, substance use, and social withdrawal. The TASC model provides a structured response: Tell — express genuine concern about the changes you've noticed; Ask — ask directly if he is thinking about suicide; Safety plan — if he is struggling, help him identify coping strategies and support; Call — contact professional help (GP, Samaritans 116 123, or 999 if in immediate danger). Early intervention in such cases can be life-saving.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'TASC model',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 114,
    question:
      "A colleague with a known history of depression tells you they have been stockpiling their prescribed medication 'just in case'. What is the most appropriate response?",
    options: [
      'A coordinated plan including continued mental health support, substance misuse treatment, a safety plan, GP follow-up within 48 hours, social support networks, and regular monitoring of both conditions',
      'Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support',
      'Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping',
      'Acknowledge and respect their cultural perspective without judgement, gently express your concern, offer to be available if they change their mind, and provide discreet information about culturally appropriate support services',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Stockpiling medication is a significant warning sign that someone may be planning a suicide attempt. The appropriate response involves: taking it seriously and not dismissing it, asking directly about suicidal thoughts, encouraging disclosure to a professional, and applying means restriction — suggesting they give excess medication to a trusted person, return it to a pharmacy, or have someone else manage their medication. Means restriction is one of the most effective suicide prevention strategies, as it removes access during a crisis.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Means restriction as prevention',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 115,
    question:
      'A person experiencing dual diagnosis (alcohol dependency and severe depression) is being discharged from an inpatient unit. Which of the following post-crisis support plans is most comprehensive?',
    options: [
      'Respect their autonomy as an adult while expressing concern, exploring their reasons for not wanting others to know, strongly encouraging professional help, and documenting the conversation for your own safeguarding records',
      'A specific phobia involves intense fear triggered by a particular object or situation; GAD involves persistent, excessive worry across multiple areas of life',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'A coordinated plan including continued mental health support, substance misuse treatment, a safety plan, GP follow-up within 48 hours, social support networks, and regular monitoring of both conditions',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Post-crisis support for dual diagnosis requires a comprehensive, integrated approach that addresses both conditions simultaneously. Best practice includes: follow-up within 48 hours of discharge (a high-risk period), continued treatment for both the mental health condition and substance use disorder, a personalised safety plan, regular GP contact, engagement with community mental health services and substance misuse services, social support, and monitoring of both conditions. Treating only one condition significantly increases the risk of relapse in the other.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Post-crisis support',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 116,
    question:
      'Research indicates that the period immediately after discharge from psychiatric hospital is one of the highest-risk times for suicide. Which of the following time frames carries the greatest risk?',
    options: [
      'The first 1-2 weeks after discharge',
      '6-12 months after discharge',
      '3-6 months after discharge',
      'The risk is evenly distributed across the first year',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Research consistently shows that the first 1-2 weeks following discharge from psychiatric hospital is the period of highest suicide risk. This is why best practice guidelines recommend follow-up contact within 48 hours of discharge and close monitoring during this critical period. Risk factors during this time include the transition from a supported environment to independence, potential gaps in community services, medication changes, and return to triggering life circumstances.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Post-crisis support',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 117,
    question:
      'Cocaine use can have serious effects on both physical and mental health. Which of the following accurately describes the combined physical and psychological risks?',
    options: [
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
      'Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cocaine carries serious physical risks including heart attack (even in young, healthy people), stroke, seizures, and cardiac arrhythmias due to its stimulant effects on the cardiovascular system. Psychologically, it can cause intense paranoia, anxiety, aggression, and psychotic symptoms during use, and severe depression, fatigue, and cravings during withdrawal ('comedown'). It has a high potential for psychological dependency. Mixing cocaine with alcohol creates cocaethylene in the liver, which is more toxic than either substance alone.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Drug misuse',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 118,
    question:
      'When developing a safety plan with someone who has disclosed suicidal thoughts, what is the correct order of the six steps?',
    options: [
      'Professionals to contact, making environment safe, warning signs, coping strategies, people for distraction, people to ask for help',
      'Making the environment safe, calling 999, warning signs, coping strategies, people for help, professionals to contact',
      'Warning signs, internal coping strategies, people and social settings for distraction, people to ask for help, professionals and agencies to contact, making the environment safe',
      'Coping strategies, warning signs, making the environment safe, professionals to contact, people for help, people for distraction',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The correct order of the six steps in a safety plan is: (1) Warning signs — recognising personal triggers and early signs of crisis; (2) Internal coping strategies — things the person can do alone to manage the crisis; (3) People and social settings for distraction — places to go and people who can take their mind off things; (4) People to ask for help — trusted individuals they can talk to openly; (5) Professionals and agencies to contact — helplines, crisis teams, GPs; (6) Making the environment safe — removing or restricting access to means. The sequence moves from self-management to increasingly intensive levels of support.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Safety planning',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 119,
    question:
      'A young person has been self-harming through cutting for several months. They tell you it helps them cope with emotional pain from past trauma. They are not suicidal but are reluctant to seek help. What is the most therapeutically informed response?',
    options: [
      'In Complex PTSD, the negative self-concept is typically linked to specific traumatic experiences, whereas in BPD/EUPD, identity disturbance is more pervasive and fluctuating; the distinction matters because treatment approaches differ',
      'Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
    ] as const,
    correctAnswer: 3,
    explanation:
      "The most therapeutically informed approach recognises that self-harm is serving a function — it is the person's current coping mechanism for overwhelming emotional pain. Demanding they stop without offering alternatives can increase distress and remove their only coping strategy. Best practice involves: validating their experience, acknowledging the pain that drives the self-harm, not insisting they stop immediately, exploring readiness for alternative coping strategies (such as holding ice, exercise, journaling, or grounding techniques), ensuring any wounds receive first aid, and gently encouraging professional support when they feel ready. Maintaining the relationship and trust is paramount.",
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Responding to self-harm',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },
  {
    id: 120,
    question:
      'In the context of suicide prevention, which of the following statements about the relationship between self-harm and suicide is most accurate?',
    options: [
      'While self-harm is not always a suicide attempt, it is one of the strongest risk factors for future suicide; approximately 50% of people who die by suicide have a history of self-harm',
      'In Complex PTSD, the negative self-concept is typically linked to specific traumatic experiences, whereas in BPD/EUPD, identity disturbance is more pervasive and fluctuating; the distinction matters because treatment approaches differ',
      'Other Specified Feeding or Eating Disorder — an eating disorder that does not meet the full criteria for anorexia, bulimia, or binge eating disorder',
      'They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The relationship between self-harm and suicide is complex but significant. Self-harm is one of the strongest known risk factors for future suicide — research shows that approximately half of people who die by suicide have a history of self-harm. However, it is crucial to understand that most people who self-harm are not suicidal at the time. The risk increases with repeated self-harm, escalating severity, use of more lethal methods, co-occurring mental health conditions, and substance use. This is why all self-harm should be taken seriously and met with compassionate, non-judgemental support, even when the person states they are not suicidal.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced' as const,
    topic: 'Self-harm definition, types, prevalence',
    category: 'Substance Misuse, Self-Harm & Suicide' as const,
  },

  // =======================================================================
  // PSYCHOSIS, EATING DISORDERS & COMPLEX NEEDS — 40 questions (id 121–160)
  // =======================================================================

  // ============================================================
  // BASIC (16 questions, IDs 121–136)
  // ============================================================
  {
    id: 121,
    question: 'What is psychosis?',
    options: [
      'A type of personality disorder',
      'A loss of contact with reality',
      'A mild form of anxiety',
      'A learning disability',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Psychosis is defined as a loss of contact with reality. The person may experience hallucinations, delusions, or disordered thinking that significantly impair their ability to distinguish what is real from what is not.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Psychosis definition',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 122,
    question: 'What is the most common type of hallucination experienced during psychosis?',
    options: [
      'Visual hallucinations',
      'Olfactory hallucinations',
      'Auditory hallucinations',
      'Tactile hallucinations',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Auditory hallucinations — hearing voices or sounds that others cannot hear — are the most common type of hallucination experienced during psychosis. While visual, tactile, and olfactory hallucinations also occur, they are less frequent.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Hallucinations',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 123,
    question: 'What is a delusion?',
    options: [
      'Strong social connections, a sense of belonging, and reasons for living',
      'Acute stress is short-term; chronic stress is long-lasting and ongoing',
      'Mental health problems are a sign of personal weakness',
      'A fixed, false belief held despite evidence to the contrary',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A delusion is a fixed, false belief that is held with conviction despite clear evidence to the contrary. Delusions can be paranoid (believing others intend harm), grandiose (believing one has special powers), or referential (believing unrelated events have personal significance).',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Delusions',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 124,
    question: 'Approximately how many people does schizophrenia affect?',
    options: [
      '1 in 100',
      '1 in 1,000',
      '1 in 10',
      '1 in 50',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Schizophrenia affects approximately 1 in 100 people. It is a serious mental health condition that can cause hallucinations, delusions, and disordered thinking, and typically has its onset in the late teens to early 30s.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Schizophrenia',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 125,
    question:
      'Which of the following is the best approach when supporting someone who is experiencing psychosis?',
    options: [
      'Argue with their delusions to help them see reality',
      'Stay calm, speak gently, and do not argue with their delusions',
      'Ignore them until the episode passes',
      'Raise your voice so they can focus on what you are saying',
    ] as const,
    correctAnswer: 1,
    explanation:
      'When supporting someone experiencing psychosis, you should stay calm, speak gently, and avoid arguing with their delusions. Arguing can increase distress and agitation. Instead, acknowledge their feelings and focus on keeping them safe.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Supporting someone experiencing psychosis',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 126,
    question: 'Which category of mental health condition has the highest mortality rate?',
    options: [
      'Anxiety disorders',
      'Personality disorders',
      'Eating disorders',
      'Mood disorders',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Eating disorders have the highest mortality rate of any mental health condition. This is due to the severe physical health complications they cause, including heart failure, organ damage, and suicide risk.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Eating disorders',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 127,
    question: 'What is anorexia nervosa primarily characterised by?',
    options: [
      'Routinely monitor employee mental health and well-being',
      'Cycles of binge eating followed by compensatory behaviours such as purging',
      'Men who are feeling low or suicidal — 0800 58 58 58',
      'Restricting food intake leading to significantly low body weight',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Anorexia nervosa is primarily characterised by restricting food intake, leading to significantly low body weight, an intense fear of gaining weight, and a distorted perception of body shape or weight.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Anorexia nervosa',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 128,
    question: 'What is the BEAT helpline number for eating disorder support?',
    options: [
      '0808 801 0677',
      '0800 123 4567',
      '116 123',
      '0300 304 7000',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The BEAT helpline number is 0808 801 0677. BEAT is the UK's leading eating disorder charity, providing support and information for anyone affected by eating disorders.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'BEAT helpline',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 129,
    question: "What does the trauma-informed question 'What happened to you?' replace?",
    options: [
      "'How can I help you?'",
      "'What's wrong with you?'",
      "'When did this start?'",
      "'Why are you here?'",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A trauma-informed approach replaces 'What's wrong with you?' with 'What happened to you?' This shift recognises that many behaviours and difficulties are responses to traumatic experiences rather than inherent flaws in the person.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Trauma-informed approach',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 130,
    question: 'What does PTSD stand for?',
    options: [
      'Pre-Traumatic Stress Disorder',
      'Persistent Tension and Stress Disorder',
      'Post-Traumatic Stress Disorder',
      'Personal Trauma and Stress Diagnosis',
    ] as const,
    correctAnswer: 2,
    explanation:
      'PTSD stands for Post-Traumatic Stress Disorder. It is a mental health condition that can develop after experiencing or witnessing a traumatic event, and is characterised by four main symptom clusters: re-experiencing, avoidance, hyperarousal, and negative cognitions and mood.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'PTSD',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 131,
    question: 'Which two substances are most commonly associated with drug-induced psychosis?',
    options: [
      'Alcohol and tobacco',
      'Heroin and benzodiazepines',
      'Caffeine and paracetamol',
      'Cannabis and amphetamines',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Cannabis and amphetamines are the substances most commonly associated with drug-induced psychosis. Both can trigger psychotic symptoms including hallucinations and delusions, particularly with heavy or prolonged use.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Drug-induced psychosis',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 132,
    question: "What does 'person-first language' mean in the context of mental health?",
    options: [
      "Always referring to the person before their condition, e.g. 'a person with schizophrenia' rather than 'a schizophrenic'",
      "An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds",
      "Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help",
      "A condition where a person feels they need a substance to function normally, with withdrawal symptoms if they stop",
    ] as const,
    correctAnswer: 0,
    explanation:
      "Person-first language means referring to the person before their condition — for example, 'a person with schizophrenia' rather than 'a schizophrenic'. This avoids reducing someone to a diagnostic label and respects their identity beyond their mental health condition.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Person-first language',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 133,
    question: 'What does ACE stand for in the context of trauma and mental health?',
    options: [
      'Acute Clinical Episode',
      'Adverse Childhood Experience',
      'Advanced Care Evaluation',
      'Assisted Community Engagement',
    ] as const,
    correctAnswer: 1,
    explanation:
      'ACE stands for Adverse Childhood Experience. ACEs are potentially traumatic events that occur during childhood, such as abuse, neglect, or household dysfunction. Research shows a strong link between ACEs and poorer mental and physical health outcomes in adulthood.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Adverse Childhood Experiences (ACEs)',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 134,
    question: 'What is bulimia nervosa primarily characterised by?',
    options: [
      'Recurrent, unexpected panic attacks with persistent worry about having further attacks',
      'Difficulty concentrating, indecisiveness, and negative thinking patterns',
      'Cycles of binge eating followed by compensatory behaviours such as purging',
      'To access urgent mental health crisis support when it is not a life-threatening emergency',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Bulimia nervosa is characterised by repeated cycles of binge eating (consuming large amounts of food in a short period with a sense of loss of control) followed by compensatory behaviours such as self-induced vomiting, laxative misuse, or excessive exercise.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Bulimia nervosa',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 135,
    question: 'At what typical age range does schizophrenia most commonly first appear?',
    options: [
      'Early childhood (ages 3–7)',
      'Older adulthood (ages 65+)',
      'Middle age (ages 45–55)',
      'Late teens to early 30s',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Schizophrenia most commonly has its onset in the late teens to early 30s. Men tend to develop it slightly earlier than women. Early detection and treatment through Early Intervention in Psychosis (EIP) services can significantly improve outcomes.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'Schizophrenia',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 136,
    question:
      'Which of the following is a key feature of BPD (Borderline Personality Disorder), also known as EUPD?',
    options: [
      'An intense fear of abandonment',
      'Persistent auditory hallucinations',
      'A preference for solitary activities',
      'An inability to feel any emotions',
    ] as const,
    correctAnswer: 0,
    explanation:
      'An intense fear of abandonment is a key feature of BPD/EUPD. Other core features include emotional instability, impulsive behaviour, unstable relationships, and a higher risk of self-harm. A trauma-informed approach is essential when supporting someone with BPD/EUPD.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'basic' as const,
    topic: 'BPD/EUPD features',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },

  // ============================================================
  // INTERMEDIATE (16 questions, IDs 137–152)
  // ============================================================
  {
    id: 137,
    question:
      'A colleague on site tells you that the news reader on TV was sending him coded messages last night. What type of delusion is this most likely an example of?',
    options: [
      'Grandiose delusion',
      'Referential delusion',
      'Paranoid delusion',
      'Somatic delusion',
    ] as const,
    correctAnswer: 1,
    explanation:
      'This is a referential delusion — the belief that unrelated events, objects, or people have special personal significance or are communicating directly with the person. Believing a TV presenter is sending coded messages is a classic example of referential thinking.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Delusions',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 138,
    question: "What is 'first episode psychosis' and why is early intervention important?",
    options: [
      'The first time someone takes antipsychotic medication; early intervention reduces side effects',
      'The first time someone is admitted to hospital; early intervention prevents readmission',
      'The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes',
      'The first time a family member notices unusual behaviour; early intervention prevents family breakdown',
    ] as const,
    correctAnswer: 2,
    explanation:
      'First episode psychosis refers to the first time someone experiences psychotic symptoms such as hallucinations or delusions. Early intervention through specialist Early Intervention in Psychosis (EIP) services is critical because research shows it leads to significantly better long-term outcomes, including reduced symptom severity and improved quality of life.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'First episode psychosis',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 139,
    question: 'Which of the following is NOT one of the four main symptom clusters of PTSD?',
    options: [
      'Re-experiencing the traumatic event',
      'Avoidance of reminders of the trauma',
      'Hyperarousal and heightened startle response',
      'Grandiose thinking and inflated self-esteem',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The four main symptom clusters of PTSD are: re-experiencing (flashbacks, nightmares), avoidance (avoiding reminders of the trauma), hyperarousal (heightened startle response, difficulty sleeping, irritability), and negative cognitions and mood (persistent negative beliefs, emotional numbness). Grandiose thinking is not a PTSD symptom — it is associated with mania or certain types of delusion.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'PTSD',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 140,
    question: 'What does OSFED stand for and what does it describe?',
    options: [
      'Other Specified Feeding or Eating Disorder — an eating disorder that does not meet the full criteria for anorexia, bulimia, or binge eating disorder',
      'Ongoing Severe Feeding and Eating Dysfunction — a chronic condition requiring tube feeding',
      'Occasional Stress-related Food and Eating Disturbance — emotional eating during stressful periods',
      'Obsessive Selective Food and Eating Disorder — only eating a very narrow range of foods',
    ] as const,
    correctAnswer: 0,
    explanation:
      'OSFED stands for Other Specified Feeding or Eating Disorder. It describes eating disorders that cause significant distress but do not meet the full diagnostic criteria for anorexia nervosa, bulimia nervosa, or binge eating disorder. OSFED is just as serious and can be just as life-threatening as other eating disorders.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'OSFED',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 141,
    question:
      'Why are eating disorders in men, particularly in the construction industry, often underdiagnosed?',
    options: [
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Eating disorders in men are often underdiagnosed because of stigma, traditional masculine norms that discourage vulnerability, and the widespread misconception that eating disorders only affect women. In the construction industry, the physically demanding culture and 'tough' image can make it even harder for men to recognise or disclose disordered eating patterns.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Eating disorders in men and construction',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 142,
    question:
      'Which of the following is a serious physical health risk associated with eating disorders?',
    options: [
      '"Just snap out of it and think positive"',
      'Mental health problems are a sign of personal weakness',
      'Heart failure due to electrolyte imbalances',
      'Severity of generalised anxiety disorder symptoms',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Heart failure due to electrolyte imbalances is one of the most serious physical health risks of eating disorders. Other risks include osteoporosis, kidney damage, dental erosion (from purging), muscle wasting, and hormonal disruption. These physical consequences are a key reason eating disorders have the highest mortality rate of any mental health condition.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Physical health risks of eating disorders',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 143,
    question: 'What distinguishes Complex PTSD from standard PTSD according to ICD-11?',
    options: [
      'To access urgent mental health crisis support when it is not a life-threatening emergency',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'Employers have a reasonable responsibility to take steps to protect the physical and mental health of their employees',
      'Complex PTSD includes all PTSD symptoms plus difficulties with emotional regulation, self-concept, and relationships',
    ] as const,
    correctAnswer: 3,
    explanation:
      'According to ICD-11, Complex PTSD includes all the core symptoms of PTSD (re-experiencing, avoidance, hyperarousal, negative cognitions) plus additional features: difficulties with emotional regulation, a persistently negative or disrupted sense of self, and difficulties sustaining relationships. It typically results from prolonged or repeated trauma, such as childhood abuse or domestic violence.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Complex PTSD (ICD-11)',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 144,
    question:
      'A construction worker witnessed a fatal accident on site six months ago. He now avoids the area where it happened, has recurring nightmares, and feels constantly on edge. What condition might he be experiencing?',
    options: [
      'Post-Traumatic Stress Disorder (PTSD)',
      'Generalised anxiety disorder',
      'Obsessive-compulsive disorder',
      'Social anxiety disorder',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The symptoms described — avoidance of trauma-related locations, recurring nightmares (re-experiencing), and feeling constantly on edge (hyperarousal) — are classic symptoms of PTSD. Trauma in construction, including witnessing accidents and injuries, is a significant risk factor for developing PTSD in this industry.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Trauma in construction',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 145,
    question: 'What is emotional dysregulation?',
    options: [
      'The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes',
      'Difficulty managing or controlling emotional responses, leading to intense or rapidly shifting emotions',
      'When there is an immediate risk to life, such as someone about to act on suicidal thoughts or who has seriously harmed themselves',
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Emotional dysregulation refers to difficulty managing or controlling emotional responses. This can result in emotions that feel extremely intense, shift rapidly, or seem disproportionate to the situation. It is a core feature of BPD/EUPD and is often linked to traumatic experiences, particularly adverse childhood experiences (ACEs).',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Emotional dysregulation',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 146,
    question: 'What are the three main types of trauma?',
    options: [
      'Post-Traumatic Stress Disorder (PTSD)',
      'Heart failure due to electrolyte imbalances',
      'Single-incident, complex (repeated), and vicarious',
      'Tell the person you are concerned about them',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The three main types of trauma are: single-incident trauma (one traumatic event, such as an accident), complex trauma (repeated or prolonged trauma, such as ongoing abuse), and vicarious trauma (trauma experienced indirectly by witnessing or hearing about others' traumatic experiences). Construction workers may experience all three types.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Trauma types',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 147,
    question: 'What is a paranoid delusion?',
    options: [
      'A belief that one has special powers or abilities',
      'A belief that unrelated events are personally significant',
      "A belief that one's body is malfunctioning or diseased",
      'A belief that others are plotting to harm, deceive, or persecute you',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A paranoid delusion is a fixed, false belief that others are plotting to harm, deceive, or persecute you. It is one of the most common types of delusion experienced during psychosis. A grandiose delusion (option A) involves beliefs about special powers, while a referential delusion (option B) involves believing unrelated events are personally significant.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Delusions',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 148,
    question: 'What is binge eating disorder?',
    options: [
      'Regularly eating large quantities of food very quickly to the point of discomfort, with a feeling of loss of control, without compensatory purging',
      'An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Binge eating disorder involves regularly consuming large quantities of food very quickly, to the point of physical discomfort, accompanied by a sense of loss of control. Unlike bulimia nervosa, it does not involve compensatory behaviours such as purging. It causes significant distress and can lead to serious physical health problems.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Binge eating disorder',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 149,
    question: 'What is vicarious trauma and who might be at risk of it on a construction site?',
    options: [
      "They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb",
      "Trauma experienced indirectly through witnessing or hearing about others' traumatic experiences; first aiders, supervisors, and colleagues may be at risk",
      "Increasing transparency and accountability through internal and external reporting on mental health, including senior leaders publicly championing mental health and sharing their own experiences",
      "For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Vicarious trauma is trauma experienced indirectly through witnessing or hearing about others' traumatic experiences. On a construction site, first aiders who attend to injured colleagues, supervisors who manage incident responses, and colleagues who witness accidents may all be at risk of vicarious trauma.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Trauma in construction',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 150,
    question:
      'Which of the following best describes the purpose of Early Intervention in Psychosis (EIP) services?',
    options: [
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
      'To provide initial support, listen non-judgementally, and guide the person towards appropriate help',
      'Offering rapid, specialist support during the first episode of psychosis to improve long-term outcomes',
      'Talking about being a burden, giving away possessions, or withdrawing from others',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Early Intervention in Psychosis (EIP) services provide rapid, specialist, multidisciplinary support to people experiencing their first episode of psychosis. The aim is to intervene early to reduce symptom severity, prevent relapse, and significantly improve long-term outcomes. EIP teams typically offer a combination of medication, talking therapies, family support, and practical help.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Early Intervention in Psychosis services',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 151,
    question:
      'A colleague with BPD/EUPD becomes very upset after a minor disagreement with a workmate and threatens to walk off site. What is the most helpful response?',
    options: [
      'Listen non-judgementally and let them know you care, without insisting they stop',
      'Setting aside your own opinions and values to provide a safe space where the person feels accepted and heard',
      'An insurance policy that offers less coverage for mental health treatment compared to physical health treatment',
      'Remain calm, validate their feelings without judgement, and help them find a safe way to manage the situation',
    ] as const,
    correctAnswer: 3,
    explanation:
      'People with BPD/EUPD can experience emotional dysregulation, meaning their emotional responses may seem intense or disproportionate. The most helpful response is to remain calm, validate their feelings without judgement (a trauma-informed approach), and support them in finding a safe way to manage the situation. Dismissing their feelings or punishing them is likely to escalate distress.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'BPD/EUPD features',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 152,
    question:
      'What type of hallucination involves feeling sensations on the skin, such as crawling insects, when nothing is there?',
    options: [
      'Tactile hallucination',
      'Olfactory hallucination',
      'Auditory hallucination',
      'Visual hallucination',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A tactile hallucination involves feeling physical sensations — such as crawling, tingling, or pressure — when there is no external stimulus. Feeling insects crawling on the skin (formication) is a well-known example. Tactile hallucinations can occur in psychosis and are also associated with substance use, particularly stimulant drugs.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'intermediate' as const,
    topic: 'Hallucinations',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },

  // ============================================================
  // ADVANCED (8 questions, IDs 153–160)
  // ============================================================
  {
    id: 153,
    question:
      'According to NICE guidelines, what are the two recommended first-line psychological treatments for PTSD in adults?',
    options: [
      'Listen non-judgementally and let them know you care, without insisting they stop',
      'Trauma-focused CBT and Eye Movement Desensitisation and Reprocessing (EMDR)',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'Clinical depression is a diagnosable condition that significantly impairs daily functioning',
    ] as const,
    correctAnswer: 1,
    explanation:
      'NICE guidelines recommend trauma-focused Cognitive Behavioural Therapy (CBT) and Eye Movement Desensitisation and Reprocessing (EMDR) as the two first-line psychological treatments for PTSD in adults. Both are evidence-based approaches that help people process traumatic memories and reduce PTSD symptoms.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'NICE guidelines for PTSD treatment',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 154,
    question:
      'A site manager learns that a worker has been diagnosed with schizophrenia but is stable on medication and performing well. A colleague suggests the worker should be removed from duties involving heights due to their diagnosis alone. What is the correct response?',
    options: [
      'Always referring to the person before their condition, e.g. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'a person with schizophrenia\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' rather than \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'a schizophrenic\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'The higher the number of ACEs a person has experienced, the greater their statistical risk of physical and mental health problems in adulthood, including substance misuse, depression, and heart disease',
    ] as const,
    correctAnswer: 2,
    explanation:
      "A mental health diagnosis alone does not determine someone's fitness for work. Decisions must be based on individual risk assessment and occupational health guidance, considering the person's current functioning, not a diagnostic label. Many people with schizophrenia work safely and effectively when well-supported. Blanket exclusions based on diagnosis are discriminatory and contrary to person-first, non-stigmatising approaches.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Person-first language',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 155,
    question:
      'How does Complex PTSD (as defined by ICD-11) differ from BPD/EUPD in terms of self-concept, and why is this distinction clinically important?',
    options: [
      'Warning signs, internal coping strategies, people and social settings for distraction, people to ask for help, professionals and agencies to contact, making the environment safe',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'In Complex PTSD, the negative self-concept is typically linked to specific traumatic experiences, whereas in BPD/EUPD, identity disturbance is more pervasive and fluctuating; the distinction matters because treatment approaches differ',
    ] as const,
    correctAnswer: 3,
    explanation:
      'In Complex PTSD, the negative self-concept (e.g. feeling worthless or broken) is typically understood in relation to specific traumatic events. In BPD/EUPD, identity disturbance tends to be more pervasive, fluctuating, and not necessarily tied to identifiable traumas. This distinction is clinically important because it informs treatment: Complex PTSD benefits from trauma-focused approaches (such as trauma-focused CBT or EMDR), while BPD/EUPD may respond better to therapies like Dialectical Behaviour Therapy (DBT) or Mentalisation-Based Therapy (MBT).',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Complex PTSD (ICD-11)',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 156,
    question:
      'A young apprentice on site has been using cannabis heavily for several months. He begins telling colleagues that the site cameras are recording him specifically and that his supervisor is part of a surveillance operation. What is the most likely explanation and what action should be taken?',
    options: [
      'He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency',
      'Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Heavy cannabis use is a well-established risk factor for drug-induced psychosis. The paranoid beliefs about cameras and surveillance are consistent with paranoid delusions. The correct response is to remain calm, not argue with his beliefs, ensure his safety, and guide him towards urgent professional support, such as A&E or his GP. Cannabis-induced psychosis can resolve once the substance is cleared, but some individuals go on to develop longer-term psychotic conditions.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Drug-induced psychosis',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 157,
    question:
      'Research into Adverse Childhood Experiences (ACEs) has identified a dose-response relationship between ACE scores and health outcomes. What does this mean in practice?',
    options: [
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'The higher the number of ACEs a person has experienced, the greater their statistical risk of physical and mental health problems in adulthood, including substance misuse, depression, and heart disease',
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
      'Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The ACE study demonstrated a dose-response relationship: the more categories of adverse childhood experience a person has, the greater their statistical risk of a wide range of negative health outcomes in adulthood, including depression, substance misuse, suicide attempts, heart disease, and cancer. Importantly, a high ACE score indicates increased risk, not certainty — resilience factors and support can mitigate the effects.',
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Adverse Childhood Experiences (ACEs)',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 158,
    question: 'What is EMDR and how does it work as a treatment for PTSD?',
    options: [
      'In Complex PTSD, the negative self-concept is typically linked to specific traumatic experiences, whereas in BPD/EUPD, identity disturbance is more pervasive and fluctuating; the distinction matters because treatment approaches differ',
      'Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support',
    ] as const,
    correctAnswer: 2,
    explanation:
      "EMDR stands for Eye Movement Desensitisation and Reprocessing. It is a NICE-recommended treatment for PTSD in which the person recalls traumatic memories while simultaneously engaging in bilateral stimulation, most commonly guided side-to-side eye movements. This process helps the brain reprocess traumatic memories so they become less vivid, less emotionally charged, and are stored as 'past' events rather than being relived in the present.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Trauma-focused CBT, EMDR',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 159,
    question:
      'A construction worker develops PTSD after a scaffolding collapse. His therapist recommends trauma-focused CBT. Which of the following best describes what this involves?',
    options: [
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms',
      'Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Trauma-focused CBT is a structured psychological therapy, typically delivered over 8 to 12 sessions, that involves: psychoeducation about PTSD, carefully and gradually processing the traumatic memory (through imaginal exposure or narrative work), identifying and challenging unhelpful trauma-related beliefs (such as 'it was my fault'), and building coping strategies. NICE recommends it as a first-line treatment for PTSD.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Trauma-focused CBT, EMDR',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },
  {
    id: 160,
    question:
      'Why is it important to adopt a trauma-informed approach when working with someone who has BPD/EUPD, and what does this look like in practice on a construction site?',
    options: [
      "A trauma-informed approach avoids re-traumatisation; in practice this means creating predictable routines, providing clear communication, responding with empathy rather than punishment to emotional outbursts, and asking 'what happened to you?' rather than 'what's wrong with you?'",
      "Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee's disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed",
      "Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready",
      "Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level",
    ] as const,
    correctAnswer: 0,
    explanation:
      "Many people with BPD/EUPD have experienced significant trauma, particularly adverse childhood experiences. A trauma-informed approach recognises this and aims to avoid re-traumatisation. On a construction site, this means: creating predictable routines and clear expectations, communicating calmly and consistently, responding to emotional dysregulation with empathy rather than punishment, and framing understanding around 'what happened to you?' rather than 'what's wrong with you?' This approach reduces distress, builds trust, and supports better mental health outcomes.",
    section: 'Psychosis, Eating Disorders & Complex Needs',
    difficulty: 'advanced' as const,
    topic: 'Trauma-informed approach',
    category: 'Psychosis, Eating Disorders & Complex Needs' as const,
  },

  // =======================================================================
  // WORKPLACE IMPLEMENTATION & WELLBEING — 40 questions (id 161–200)
  // =======================================================================

  // ===== BASIC (16 questions, id 161-176) =====
  {
    id: 161,
    question:
      'What is the recommended starting ratio of Mental Health First Aiders (MHFAs) to employees in a workplace?',
    options: [
      '1 MHFA per 50 employees',
      '1 MHFA per 10 employees',
      '1 MHFA per 100 employees',
      '1 MHFA per 25 employees',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The recommended starting point is 1 trained MHFA per 10 employees. This ratio ensures adequate coverage and accessibility, though the exact number may vary depending on workplace size, shift patterns, and geographical spread.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'How many MHFAs needed',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 162,
    question:
      'According to research cited in the business case for workplace mental health, what is the approximate return on investment for every pound spent on mental health interventions?',
    options: [
      '£2 for every £1 spent',
      '£3 for every £1 spent',
      '£5 for every £1 spent',
      '£10 for every £1 spent',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Research, including that from Deloitte, indicates an average return of approximately £5 for every £1 invested in workplace mental health interventions. This makes a compelling business case for organisations to invest in mental health support.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Creating an MHFA programme, business case',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 163,
    question:
      'What is the telephone number for the Lighthouse Club construction industry charity helpline?',
    options: [
      '0800 068 4141',
      '0800 58 58 58',
      '116 123',
      '0345 605 1956',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The Lighthouse Club operates a free 24/7 helpline on 0345 605 1956, providing emotional, physical, and financial wellbeing support specifically for construction workers and their families.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Construction-specific (Mates in Mind, Lighthouse Club)',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 164,
    question: 'Which of the following is NOT one of the Five Ways to Wellbeing?',
    options: [
      'Compete',
      'Keep Learning',
      'Be Active',
      'Connect',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The Five Ways to Wellbeing, developed by the New Economics Foundation, are: Connect, Be Active, Take Notice, Keep Learning, and Give. 'Compete' is not one of them. These evidence-based actions promote positive mental health and wellbeing.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Five Ways to Wellbeing',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 165,
    question: 'What is the main difference between an MHFA and a Mental Health Champion?',
    options: [
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'MHFAs are trained to provide initial support and signpost; Champions raise awareness and reduce stigma but are not trained to provide first aid',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Mental Health First Aiders complete a full training course and are trained to recognise signs of mental ill health, provide initial support, and signpost to appropriate help. Mental Health Champions typically receive lighter training focused on raising awareness, promoting wellbeing, and reducing stigma, but are not trained to deliver mental health first aid.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'MHFAs vs Mental Health Champions',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 166,
    question: 'What does EAP stand for in the context of workplace mental health support?',
    options: [
      'Employee Appraisal Process',
      'Emergency Action Plan',
      'Employee Assistance Programme',
      'Equal Access Policy',
    ] as const,
    correctAnswer: 2,
    explanation:
      'EAP stands for Employee Assistance Programme. EAPs are typically free, confidential, and available 24/7. They offer counselling, information, and support services to employees and often their immediate family members.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'EAPs',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 167,
    question:
      'What telephone number should you dial in the UK if someone is in immediate danger due to a mental health crisis?',
    options: [
      '111',
      '0800 068 4141',
      '116 123',
      '999',
    ] as const,
    correctAnswer: 3,
    explanation:
      'If someone is in immediate danger to themselves or others, you should call 999 for the emergency services. This is the same number used for any life-threatening emergency in the UK.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Crisis services',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 168,
    question:
      'Which NHS service allows people to self-refer for talking therapy without needing a GP referral?',
    options: [
      'NHS Talking Therapies (formerly IAPT)',
      'Cognitive Behavioural Therapy',
      'Encourage appropriate professional help',
      'Employee Assistance Programme',
    ] as const,
    correctAnswer: 0,
    explanation:
      'NHS Talking Therapies (formerly known as IAPT - Improving Access to Psychological Therapies) allows adults in England to self-refer for evidence-based talking therapies for common mental health conditions like depression and anxiety, without needing a GP referral.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'NHS Talking Therapies, self-referral',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 169,
    question:
      'Which voluntary sector organisation provides a 24/7 listening service on the number 116 123?',
    options: [
      'Mind',
      'Samaritans',
      'CALM',
      'Anxiety UK',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Samaritans provides a free, confidential 24/7 listening service available on 116 123. They offer emotional support to anyone in distress or struggling to cope, not just those who are suicidal.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Voluntary sector',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 170,
    question: 'What is presenteeism in the context of workplace mental health?',
    options: [
      'Presenting mental health training to colleagues',
      'Being absent from work due to mental ill health',
      'Being present at work but functioning at reduced capacity due to ill health',
      'Being overly present and available at work',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Presenteeism refers to employees being physically present at work but functioning at reduced capacity due to ill health, including mental ill health. Research suggests presenteeism costs UK employers significantly more than absenteeism, as it is harder to identify and address.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Presenteeism vs absenteeism',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 171,
    question:
      'Under which piece of UK legislation must employers make reasonable adjustments for employees with a disability, including long-term mental health conditions?',
    options: [
      'Health and Safety at Work Act 1974',
      'Employment Rights Act 1996',
      'Mental Health Act 1983',
      'Equality Act 2010',
    ] as const,
    correctAnswer: 3,
    explanation:
      "The Equality Act 2010 requires employers to make reasonable adjustments for employees with a disability. Mental health conditions that have a substantial, long-term adverse effect on a person's ability to carry out normal day-to-day activities can qualify as a disability under this Act.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Reasonable adjustments under Equality Act 2010',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 172,
    question: 'What is a toolbox talk in the context of workplace mental health?',
    options: [
      'A short, informal safety or awareness talk delivered on site, often at the start of a shift',
      'A therapy session run by a qualified counsellor on site',
      'A meeting to discuss the tools and equipment needed for mental health first aid',
      'A formal disciplinary meeting about mental health issues',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A toolbox talk is a short, informal group discussion on a specific topic, typically delivered at the start of a shift or work period. Using toolbox talks to address mental health helps normalise conversations, raise awareness, and reduce stigma in workplace settings, particularly in industries like construction.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Toolbox talks on mental health',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 173,
    question: 'Which of the following best describes compassion fatigue?',
    options: [
      'Employers have a reasonable responsibility to take steps to protect the physical and mental health of their employees',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'Listen non-judgementally, offer reassurance, and gently encourage them to seek professional help while respecting their confidentiality',
      'A short, informal safety or awareness talk delivered on site, often at the start of a shift',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Compassion fatigue is a condition characterised by a gradual lessening of compassion over time. It is common among those who work directly with people in distress, including MHFAs, and results from the cumulative emotional toll of empathising with others' suffering.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Compassion fatigue definition and symptoms',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 174,
    question:
      'Which organisation specifically focuses on mental health in the construction industry?',
    options: [
      'Mind',
      'CALM',
      'Mates in Mind',
      'Rethink Mental Illness',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Mates in Mind is a charity that specifically focuses on improving and promoting positive mental health in the construction and related industries. It provides tools, resources, and training to help organisations address mental health at work.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Construction-specific (Mates in Mind, Lighthouse Club)',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 175,
    question: 'What does SHOUT provide as a mental health support service?',
    options: [
      'Face-to-face counselling sessions',
      'Workplace mental health audits',
      'Group therapy sessions in the community',
      'A free 24/7 crisis text service — text SHOUT to 85258',
    ] as const,
    correctAnswer: 3,
    explanation:
      'SHOUT is a free, confidential, 24/7 text-based support service for anyone in crisis. People can text SHOUT to 85258 to be connected with a trained volunteer who can provide immediate support via text message.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Voluntary sector',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 176,
    question: 'Why is it important for MHFAs to be visible and accessible in the workplace?',
    options: [
      'So employees know who they can approach for support and how to reach them',
      'So that MHFAs receive public recognition for their role',
      'So that MHFAs can be held accountable for any incidents',
      'So that management can monitor their activities',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Visibility and accessibility are essential for an effective MHFA programme. Employees need to know who the MHFAs are, where to find them, and how to approach them. This can be achieved through notice boards, intranet pages, lanyards, or posters displayed in communal areas.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic' as const,
    topic: 'Visibility and accessibility of MHFAs',
    category: 'Workplace Implementation & Wellbeing' as const,
  },

  // ===== INTERMEDIATE (16 questions, id 177-192) =====
  {
    id: 177,
    question:
      "The Stevenson/Farmer review 'Thriving at Work' (2017) proposed six core standards for workplace mental health. Which of the following is one of those core standards?",
    options: [
      'Ensure all managers have a counselling qualification',
      'Produce, implement, and communicate a mental health at work plan',
      'Provide free gym memberships for all employees',
      'Appoint a full-time psychologist in every workplace',
    ] as const,
    correctAnswer: 1,
    explanation:
      "One of the six core standards from the Stevenson/Farmer 'Thriving at Work' review (2017) is to produce, implement, and communicate a mental health at work plan. The six core standards are: (1) produce a mental health at work plan, (2) develop mental health awareness among employees, (3) encourage open conversations, (4) provide good working conditions, (5) promote effective people management, and (6) routinely monitor employee mental health and wellbeing.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Thriving at Work 6 core standards',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 178,
    question:
      'When building a business case for an MHFA programme, which of the following would be the most compelling data to present to senior leadership?',
    options: [
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'Current sickness absence rates, presenteeism costs, and staff turnover data alongside the £5 ROI for every £1 invested',
      'You should keep what the person tells you private unless there is a risk of harm to themselves or others',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A strong business case should include relevant organisational data such as sickness absence rates, presenteeism costs, staff turnover, and EAP usage, alongside evidence of the financial return (approximately £5 for every £1 spent). Individual diagnosis data would breach confidentiality and must never be shared.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Creating an MHFA programme, business case',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 179,
    question: 'What is the PHQ-9 used to assess?',
    options: [
      'Generalised anxiety disorder severity',
      'Alcohol dependency levels',
      'Post-traumatic stress disorder symptoms',
      'Depression severity over the past two weeks',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The PHQ-9 (Patient Health Questionnaire-9) is a validated screening tool used to assess the severity of depression over the past two weeks. It consists of 9 questions scored 0-3, giving a total score of 0-27. It is widely used by GPs and NHS Talking Therapies services.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'GP pathway, PHQ-9, GAD-7',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 180,
    question: 'What does the GAD-7 questionnaire measure?',
    options: [
      'Severity of generalised anxiety disorder symptoms',
      'Single-incident, complex (repeated), and vicarious',
      'Persistent feelings of hopelessness and sadness',
      'How much say a person has over how they do their work',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The GAD-7 (Generalised Anxiety Disorder-7) is a validated screening tool used to assess the severity of generalised anxiety disorder. It consists of 7 questions scored 0-3, giving a total score of 0-21. Scores of 5, 10, and 15 represent cut-off points for mild, moderate, and severe anxiety respectively.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'GP pathway, PHQ-9, GAD-7',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 181,
    question:
      'Which of the following is an example of a reasonable adjustment an employer might make for an employee with a long-term mental health condition?',
    options: [
      'Dismissing the employee to reduce team stress',
      'Allowing flexible working hours or phased return to work after absence',
      'Removing the employee from all team activities',
      "Telling all colleagues about the employee's condition so they can help",
    ] as const,
    correctAnswer: 1,
    explanation:
      'Reasonable adjustments under the Equality Act 2010 might include flexible working hours, phased return to work, changes to workload, provision of a quiet workspace, or additional support during busy periods. Adjustments should be agreed with the individual and keep their information confidential.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Reasonable adjustments under Equality Act 2010',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 182,
    question:
      'How can an MHFA programme be integrated with existing health and safety arrangements in the workplace?',
    options: [
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'An insurance policy that offers less coverage for mental health treatment compared to physical health treatment',
      'By including mental health in risk assessments, H&S policies, induction processes, and incident reporting',
      'When a person with a mental health problem internalises negative stereotypes and feels shame about their condition',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Integrating mental health with existing health and safety systems means including mental health risks in workplace risk assessments, updating H&S policies to cover psychological wellbeing, incorporating mental health awareness into inductions, and ensuring reporting systems capture mental health-related incidents alongside physical ones.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Integrating mental health with existing H&S',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 183,
    question:
      'Which of the following KPIs would be most useful for measuring the impact of an MHFA programme?',
    options: [
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
      'Substance use refers to any consumption, while misuse is use that causes harm or is hazardous',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
      'Sickness absence rates, EAP utilisation, staff survey results, and number of MHFA interactions',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Relevant KPIs for measuring MHFA programme impact include: sickness absence rates (particularly for mental health-related absence), EAP utilisation rates, staff survey results on wellbeing and psychological safety, number of MHFA interactions, staff turnover rates, and presenteeism measures.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Measuring impact (KPIs, sickness absence, EAP usage, surveys)',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 184,
    question: 'What is vicarious trauma and how might it affect an MHFA?',
    options: [
      "The emotional residue of exposure to others' traumatic stories, which can lead to changes in the MHFA's own worldview, beliefs, and psychological functioning",
      "It should include the organisation's position, rules, support available, testing procedures (if applicable), and consequences of policy breaches",
      "Recognise that this is a situation where confidentiality must be broken and seek appropriate help, explaining to the colleague why you need to involve others",
      "When the general public holds negative attitudes, beliefs, and stereotypes about people with mental health problems",
    ] as const,
    correctAnswer: 0,
    explanation:
      "Vicarious trauma (also called secondary traumatic stress) occurs when someone is repeatedly exposed to others' accounts of traumatic experiences. For MHFAs, hearing distressing stories can cumulatively affect their own psychological wellbeing, potentially altering their worldview, sense of safety, and emotional functioning. This is why supervision and self-care are essential.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Vicarious trauma',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 185,
    question: 'Why is supervision important for MHFAs in the workplace?',
    options: [
      'A framework where treatment is matched to severity, starting with least intensive and stepping up if needed',
      'To provide a confidential space for MHFAs to reflect on their experiences, process emotions, and receive guidance',
      'Difficulty managing or controlling emotional responses, leading to intense or rapidly shifting emotions',
      'No — research shows that asking directly about suicide does not increase risk and can actually help',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Supervision provides MHFAs with a safe, confidential space to reflect on their interactions, process difficult emotions, identify signs of compassion fatigue or vicarious trauma, and receive guidance on complex situations. Regular supervision supports the MHFA's own wellbeing and helps maintain the quality of support they provide.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Supervision and debriefing',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 186,
    question: 'Which of the following is an appropriate boundary for an MHFA to maintain?',
    options: [
      'Giving out their personal mobile number for 24/7 availability',
      'Promising to keep secrets even if there is a risk to life',
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
      'Taking on a counselling role if the person cannot afford private therapy',
    ] as const,
    correctAnswer: 2,
    explanation:
      'MHFAs should maintain clear boundaries, including keeping interactions within agreed hours, not acting as ongoing counsellors, and signposting to appropriate services for out-of-hours support. Giving personal numbers, taking on a counselling role, or promising absolute confidentiality when there is risk to life would all be inappropriate and potentially harmful.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Setting boundaries as an MHFA',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 187,
    question:
      'What is the connection between physical and mental health that employers should consider?',
    options: [
      'Creating an open culture where mental health is discussed regularly, leaders share their own experiences, and language is inclusive',
      'Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Physical health conditions can increase the risk of poor mental health, and poor mental health can lead to physical health problems — a holistic approach is needed',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Physical and mental health are closely interconnected. People with long-term physical conditions are two to three times more likely to experience mental ill health, and those with severe mental illness die on average 15-20 years earlier due to physical health conditions. Employers should adopt a holistic approach that addresses both physical and mental wellbeing together.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Physical-mental health connection',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 188,
    question: 'What should be included in a workplace mental health policy?',
    options: [
      'A commitment to supporting mental health, roles and responsibilities, confidentiality procedures, support available, and how adjustments will be made',
      'Remain calm, validate their feelings without judgement, and help them find a safe way to manage the situation',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'The emotional residue of exposure to others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' traumatic stories, which can lead to changes in the MHFA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s own worldview, beliefs, and psychological functioning',
    ] as const,
    correctAnswer: 0,
    explanation:
      "A comprehensive mental health policy should include: the organisation's commitment to supporting mental health; roles and responsibilities; confidentiality and data protection procedures; details of support available (MHFAs, EAP, occupational health); how reasonable adjustments will be managed; how the policy links to other policies; and how it will be reviewed and updated.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Mental health policy development',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 189,
    question:
      "Which voluntary sector organisation specifically supports men's mental health and operates the helpline 0800 58 58 58?",
    options: [
      'The Health & Safety at Work Act 1974',
      'CALM (Campaign Against Living Miserably)',
      'An intense fear of abandonment',
      'The first 1-2 weeks after discharge',
    ] as const,
    correctAnswer: 1,
    explanation:
      'CALM (Campaign Against Living Miserably) is a charity dedicated to preventing male suicide. Their helpline (0800 58 58 58) is available from 5pm to midnight every day. They also offer a webchat service. Male suicide remains a significant concern in the UK, with men accounting for approximately three-quarters of all suicides.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Voluntary sector',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 190,
    question:
      'How can an MHFA promote openness and reduce stigma around mental health in the workplace?',
    options: [
      'Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks',
      'They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb',
      'By leading by example with open conversations, supporting campaigns like Time to Talk Day, and normalising mental health discussions through toolbox talks and awareness events',
      'Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency',
    ] as const,
    correctAnswer: 2,
    explanation:
      'MHFAs can help reduce stigma by modelling openness, participating in and promoting awareness campaigns (such as Time to Talk Day and Mental Health Awareness Week), delivering toolbox talks, sharing wellbeing resources, and encouraging a culture where talking about mental health is normalised and supported.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Promoting openness and reducing stigma',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 191,
    question: 'What is the purpose of NHS 111, option 2?',
    options: [
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'To access urgent mental health crisis support when it is not a life-threatening emergency',
    ] as const,
    correctAnswer: 3,
    explanation:
      'NHS 111, option 2 provides access to urgent mental health crisis support. It is available 24/7 across England and connects callers to trained mental health professionals who can provide immediate advice and support. It is appropriate when someone needs urgent help but the situation is not immediately life-threatening (which would require 999).',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Crisis services',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 192,
    question:
      'Which of the Five Ways to Wellbeing involves paying more attention to the present moment, including your thoughts, feelings, and the world around you?',
    options: [
      'Take Notice',
      'Give',
      'Connect',
      'Keep Learning',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Take Notice is the element of the Five Ways to Wellbeing that involves being more aware of the present moment, including your thoughts, feelings, body, and the world around you. It is closely aligned with mindfulness principles and can help people savour positive experiences and better understand their emotional responses.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate' as const,
    topic: 'Five Ways to Wellbeing',
    category: 'Workplace Implementation & Wellbeing' as const,
  },

  // ===== ADVANCED (8 questions, id 193-200) =====
  {
    id: 193,
    question:
      'An MHFA notices they have become emotionally numb, are dreading interactions with colleagues seeking support, and have started avoiding people at work. Which of the following best describes what they may be experiencing, and what should they do?',
    options: [
      'Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site',
      'They may be experiencing compassion fatigue or vicarious trauma and should access supervision, review their boundaries, and consider temporarily stepping back from the role',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
    ] as const,
    correctAnswer: 1,
    explanation:
      'These are classic signs of compassion fatigue or vicarious trauma — emotional numbing, dread, and avoidance. The appropriate response is to seek supervision, review and reinforce boundaries, engage in self-care, and consider temporarily stepping back from the MHFA role. Pushing through without support can worsen the condition and reduce the quality of support provided to others.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Compassion fatigue definition and symptoms',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 194,
    question:
      'A large construction company with 500 employees across multiple sites wants to implement an MHFA programme. Considering the recommended ratio, shift patterns, and site coverage, which approach would be most effective?',
    options: [
      'Apply basic first aid (clean the wound, apply pressure if bleeding, cover with a clean dressing) and encourage them to seek medical attention if needed',
      'Current sickness absence rates, presenteeism costs, and staff turnover data alongside the £5 ROI for every £1 invested',
      'Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site',
      'IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Using the 1:10 starting ratio, approximately 50 MHFAs would be needed for 500 employees. They should be distributed across all sites and shift patterns to ensure accessibility. A mix of roles and seniority helps ensure employees feel comfortable approaching someone. Supplementing with Mental Health Champions on each site further extends reach. Head office-only or manager-only provision would leave significant gaps in coverage.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'How many MHFAs needed',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 195,
    question:
      "When implementing the Stevenson/Farmer 'Thriving at Work' enhanced standards, which of the following represents a comprehensive approach to measuring and reporting on mental health outcomes?",
    options: [
      'The responsibility of a line manager or MHFA to signpost a person to appropriate professional support when a situation is beyond their competence',
      'Respect their autonomy as an adult while expressing concern, exploring their reasons for not wanting others to know, strongly encouraging professional help, and documenting the conversation for your own safeguarding records',
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The enhanced standards of the Thriving at Work review recommend transparency and accountability through regular board-level reporting. This should include multiple data sources: sickness absence (especially mental health-related), EAP utilisation, staff survey results on wellbeing and psychological safety, MHFA programme data, staff turnover, and benchmarking against sector standards to demonstrate progress and identify areas for improvement.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Thriving at Work 6 core standards',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 196,
    question:
      'An employee discloses to an MHFA that they are having suicidal thoughts but begs the MHFA not to tell anyone. They say they have already called Samaritans and have a GP appointment next week. What is the most appropriate course of action?',
    options: [
      "Acknowledge the person's wish for confidentiality, explore the immediacy of risk, explain the limits of confidentiality where there is risk to life, and collaboratively agree next steps including whether crisis services are needed before the GP appointment",
      "Training managers to recognise signs of presenteeism, promoting flexible working, reviewing workload management, enhancing EAP promotion, and creating a culture where taking time off for mental health is supported",
      "Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions",
      "Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level",
    ] as const,
    correctAnswer: 0,
    explanation:
      "MHFAs cannot promise absolute confidentiality when there is risk to life. The appropriate approach is to acknowledge the person's request, assess the immediacy of risk (including whether they have a plan, means, and timeframe), explain the limits of confidentiality, and work collaboratively to agree on safety measures. While it is positive they have contacted Samaritans and have a GP appointment, the MHFA needs to determine if the person is safe in the interim and whether more immediate support (such as crisis services) is needed.",
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Setting boundaries as an MHFA',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 197,
    question:
      "A company's annual wellbeing survey shows that presenteeism accounts for significantly more lost productivity than absenteeism. Which combination of interventions would most effectively address this?",
    options: [
      'The higher the number of ACEs a person has experienced, the greater their statistical risk of physical and mental health problems in adulthood, including substance misuse, depression, and heart disease',
      'Training managers to recognise signs of presenteeism, promoting flexible working, reviewing workload management, enhancing EAP promotion, and creating a culture where taking time off for mental health is supported',
      'Acknowledge and respect their cultural perspective without judgement, gently express your concern, offer to be available if they change their mind, and provide discreet information about culturally appropriate support services',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Addressing presenteeism requires a multi-faceted approach: training managers to recognise and sensitively address signs of presenteeism; promoting flexible working arrangements; reviewing workloads; actively promoting EAP services; and fostering a culture where mental health is openly discussed and taking time off when unwell is supported rather than stigmatised. Stricter monitoring would likely worsen the problem by increasing fear of taking necessary time off.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Presenteeism vs absenteeism',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 198,
    question:
      'An MHFA has been supporting a colleague through a difficult period for several weeks. The colleague has become increasingly reliant on the MHFA, contacting them daily and resisting referral to professional services. What reflective practice should the MHFA apply?',
    options: [
      'Increasing transparency and accountability through internal and external reporting on mental health, including senior leaders publicly championing mental health and sharing their own experiences',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
      'Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This scenario illustrates the importance of reflective practice and boundaries. Through supervision, the MHFA should recognise that a dependency dynamic has developed, which is outside the scope of the MHFA role. The appropriate response is to compassionately but clearly re-establish boundaries, explain that the MHFA role is for initial support and signposting rather than ongoing counselling, and work with the colleague to create a concrete plan for transitioning to professional services such as NHS Talking Therapies, a counsellor through the EAP, or their GP.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Personal resilience and reflective practice',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 199,
    question: 'Papyrus is a UK charity that specifically focuses on which area of mental health?',
    options: [
      'The body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s automatic survival response to perceived danger',
      'Previous suicide attempts, mental health conditions, substance misuse, and social isolation',
      'Withdrawing from social activities and isolating yourself',
      'Prevention of young suicide (under 35) and provides the HOPELINEUK service',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Papyrus is a UK charity dedicated to the prevention of young suicide. They support young people under 35 who are experiencing thoughts of suicide, as well as anyone concerned about a young person. Their HOPELINEUK service (0800 068 4141) is staffed by trained advisors who provide practical support and advice.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Voluntary sector',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 200,
    question:
      'An organisation wants to embed the Five Ways to Wellbeing into its MHFA programme and wider workplace culture. Which implementation strategy best demonstrates a comprehensive approach?',
    options: [
      'Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)',
      'Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A comprehensive approach to embedding the Five Ways to Wellbeing requires translating each element into tangible workplace initiatives: Connect through team-building and social activities; Be Active through physical activity schemes and active travel; Take Notice through mindfulness and reflective practice; Keep Learning through CPD, mentoring, and skills-sharing; and Give through volunteering, peer support, and community engagement. Simply communicating the framework without action will not achieve meaningful impact on workplace wellbeing.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Five Ways to Wellbeing',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
];
