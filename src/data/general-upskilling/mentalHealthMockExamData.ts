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
      'A state in which a person is completely free of any diagnosed illness, distress or psychological symptom, meaning that anyone who has ever felt low or anxious for a single day cannot be counted as mentally healthy',
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'A permanent trait fixed at birth which can never change in response to life events, relationships or support, so a person is simply born either mentally healthy or mentally unwell and remains so for life',
      'The ability to remain happy and entirely free of stress at every moment, whatever is happening around a person, so that any spell of worry, sadness or low mood proves that mental health has broken down',
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
      'Assess the risk, Lead the conversation, Give practical advice, Ensure a referral is made, Encourage time away from work',
      'Approach the person, Lead them to a decision, Give your own opinion, Ensure professional help is arranged, Ensure follow-up',
      'Ask questions, Learn the diagnosis, Guide the treatment, Enable a referral to a doctor, Enable a return to work',
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
      'Is fixed once a person reaches adulthood and rarely changes afterwards',
      'Ranges from thriving through to struggling and crisis, and can fluctuate over time',
      'Can only be classed as either completely healthy or clinically unwell, with nothing in between',
      'Is determined solely by whether a person has received a formal psychiatric diagnosis',
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
      'When a person with a mental health problem takes on board negative stereotypes and feels ashamed of their own condition',
      'When institutions and organisations operate policies and practices that discriminate against people with mental health problems',
      'When healthcare professionals decline to treat, or give lower priority to, people who present with mental health problems',
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
      'The Access to Medical Reports Act 1988',
      'The Health & Safety at Work Act 1974',
      'The Employment Relations Act 1999',
      'The Employment Rights Act 1996',
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
      'When newspapers and broadcasters portray people with mental health problems as dangerous or unpredictable in the news',
      'When an employer refuses promotion, training or overtime to any employee who has disclosed a mental health condition',
      'When local health services are too poorly funded to meet the needs of everyone with mental health problems',
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
      'Has been formally diagnosed by a consultant psychiatrist within the six months before the treatment complained of',
      'Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities',
      'Requires the person to be signed off work at the time and to be taking medication prescribed for them by their GP',
      'Has been disclosed to the employer in writing before the person started work and repeated at every annual appraisal',
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
      'To act as the workplace counsellor and provide the person with ongoing weekly therapy sessions on site',
      'To take charge of the condition day to day and decide when the person is fit to return to work',
      'To provide initial support, listen non-judgementally, and guide the person towards appropriate help',
      'To pass every disclosure straight to the GP of the person concerned without asking them first',
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
      'Can be answered with one word such as yes, no, or a simple number',
      'Asks for one specific fact, such as a date, a time or a number',
      'Is framed to challenge or confront the person directly',
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
      'You may share what you are told with the other Mental Health First Aiders on site but with nobody else at all',
      'You must never pass on anything the person tells you, whatever the circumstances and whatever the risk to them',
      'You are required to tell the line manager of the person everything that has been disclosed to you in confidence',
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
      'Tell their line manager straight away so that the workload causing the distress can be reduced without waiting for the person to agree to it',
      'Listen non-judgementally, offer reassurance, and gently encourage them to seek professional help while respecting their confidentiality',
      'Reassure them that feelings like this always pass on their own within a few weeks and that nobody else needs to be told about it',
      'Offer your own opinion about what the condition is and suggest some over-the-counter remedies that you have found helpful yourself',
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
      'Discussing mental health only in formal settings such as occupational health referrals, return-to-work meetings and formal HR case reviews',
      'Keeping every mental health conversation strictly private so that the subject is never raised openly anywhere in the workplace at all',
      'Requiring employees to declare any mental health condition to the rest of the team so that colleagues always know who needs help',
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
      'Provide private medical insurance to every employee and their family',
      'Employ a full-time consultant psychiatrist on every site the firm runs',
      'Guarantee in writing that no employee will ever experience stress at work',
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
      'Making the person feel they are being watched and judged so that they choose their words with care',
      'Showing the person that you are engaged, interested, and paying attention to what they are saying',
      'Demonstrating your authority so that you keep control of where the conversation goes next',
      'Allowing you to read facial expressions closely enough to work out a diagnosis yourself',
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
      'Agree to keep it entirely confidential, on the basis that breaking their trust now would do more harm than bringing anyone else into the situation could ever do',
      'Tell them to ring the Samaritans themselves and then end the conversation there, so that their wish for privacy is respected in full and nothing at all is passed on',
      'Recognise that this is a situation where confidentiality must be broken and seek appropriate help, explaining to the colleague why you need to involve others',
      'Wait quietly to see whether they raise the subject again over the next few days at work, before deciding whether any further action is really needed at all',
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
      'A person hiding a diagnosis from friends because they feel ashamed and believe they are weak for struggling with it',
      'A colleague joking to the gang that someone has gone crazy after they take a week off work for their mental health',
      'A manager refusing to sit next to a team member in the site canteen because he knows she has been treated for depression',
      'An insurance policy that offers less coverage for mental health treatment compared to physical health treatment',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Structural stigma refers to institutional policies, practices, and systems that discriminate against people with mental health problems. An insurance policy providing less coverage for mental health than physical health is a clear example, because the disadvantage is built into the rules of the institution. By contrast, an individual feeling ashamed is self-stigma, and jokes or avoidance by colleagues are forms of public stigma.',
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
      'How closely managers monitor the behaviour of their staff',
      'The level of control managers have over the budget',
      'The security controls that protect the site data',
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
      'Interrupting often to share your own similar experiences so that the person feels rather less alone with it',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
      'Finishing their sentences for them to show that you already understand what they are trying to tell you',
      'Keeping to the facts and steering away from emotion so that the conversation does not then escalate',
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
      'Agreeing with everything the person says so that they never feel challenged or upset by the conversation at all',
      'Steering away from any difficult or sensitive subject in case raising it causes the person even further distress',
      'Setting aside your own opinions and values to provide a safe space where the person feels accepted and heard',
      'Offering your honest view of the choices that led to the current situation so that the person can learn from them',
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
      'The duty of every employee to report the mental health condition of a colleague to the human resources department as soon as they first hear about it',
      'The requirement for a Mental Health First Aider to keep providing counselling sessions themselves until the person has fully recovered from it',
      'The obligation to send anyone who discloses a problem straight to their own GP without any discussion at all of what they want to happen next',
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
      'Every culture holds an identical view of mental health, so the same words and the same advice will suit anyone',
      'It is a legal requirement to ask about the cultural background of a person before offering any support at all',
      'Only people from certain cultural backgrounds ever develop mental health problems in the first place',
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
      'Employers must guarantee that no employee ever experiences stress or distress in the course of their normal working day',
      'Employers have a reasonable responsibility to take steps to protect the physical and mental health of their employees',
      'Employees are solely responsible for managing their own wellbeing, with no involvement at all from the employer at any stage',
      'The duty applies only to large organisations that have chosen to run an occupational health department of their own in house',
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
      'The personal relationships that employees have outside work and the effect these have on attendance',
      'How much say employees have over the way they organise and carry out their own daily work',
      'Promoting positive working relationships and dealing with unacceptable behaviour such as bullying',
      'The clarity employees have about their job role and the avoidance of conflicting duties',
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
      'Set out every possible mental health condition in detail so that the person can work out which one they may have',
      'Play down what the person describes by telling them that a great many other people have it far worse than that',
      'Recommend a particular medication that you have heard works especially well for this sort of problem',
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
      'Send a company-wide email instructing every worker affected by the death to book an appointment with the occupational health team, and treat anyone who does not book as unaffected, so that the site programme can carry on without any further interruption',
      'Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help',
      'Wait for individual workers to come forward of their own accord before offering any support or information, on the basis that raising the subject first would intrude on private grief and might plant distress in workers who are coping perfectly well already',
      'Hold a single formal group meeting at which every member of the team is required in turn to describe how the death has affected them, then record what each person says in the minutes and close the matter formally with no further follow-up of any kind',
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
      'Offer individual resilience and stress-management training to the staff in that department as the only intervention, on the basis that teaching people to cope better removes any need to look at workload, hours or the way the work itself is organised',
      'Remind the affected employees to make greater use of the Employee Assistance Programme and leave the causes of the pressure untouched, treating rising stress as a matter for each individual to sort out through counselling in their own time',
      'Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level',
      'Monitor the sickness absence figures for that department for a further year before deciding whether any action is needed, so that there is enough data to be certain the increase is real and not simply a seasonal variation in the workload',
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
      'Break confidentiality at once and inform the line manager, because every disclosure of self-harm is a safeguarding emergency that must be escalated whatever the age of the person and whatever the level of risk they are facing',
      'Insist that they stop self-harming straight away, ask them to promise never to do it again, and check their arms at the start of each shift so that you can be satisfied the promise is being kept while they are at work',
      'Respect their wish for privacy in full and take no further action of any kind, since they have said they are not suicidal and an adult is entitled to decide what happens to their own body, and treat the whole matter as closed',
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
      'Producing and communicating a mental health at work plan for the first time and circulating it to every employee by email, then filing it with the health and safety policy and reviewing it in three years',
      'Delivering a single one-off mental health awareness session to all employees on a company induction day, with no follow-up training, no refresher for new starters and no measurement of what changed',
      'Encouraging line managers to hold open conversations with their teams about wellbeing whenever they feel it is appropriate, without any training, any guidance on what to say or any route to further support',
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
      'The Health & Safety at Work Act 1974 covers physical hazards only, so the employer has no legal duty at all in respect of psychosocial matters such as management behaviour, workload or presenteeism, and the HSE Management Standards are a voluntary business tool which carries no legal weight where turnover and sickness absence are rising',
      'The employer is potentially failing in their legal duty under the Health & Safety at Work Act 1974 to protect employee welfare, and a systematic assessment using the HSE Management Standards could help identify and address the organisational factors contributing to poor mental health, potentially reducing both turnover and absence',
      'The employer is under no obligation to act at all until a formal grievance has been raised or a tribunal claim has been lodged, because the duty to look at working conditions is triggered by a written complaint rather than by what the employer sees in its own turnover figures, exit interview comments and sickness absence records',
      'High turnover and a culture of presenteeism are normal features of construction work, so the employer need not investigate the underlying causes at all and may treat the exit interview comments as the personal opinions of people who chose to leave rather than as evidence of any risk to the health of the wider workforce on site',
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
      'An employee receives a formal diagnosis of depression from their GP, is signed off work for several weeks, returns on a phased basis once the medication has taken effect, and is recorded by the employer as either fit or unfit for work at every stage of that process',
      'An employee with a long-standing anxiety disorder remains stable and well supported, performs their role effectively throughout the year, and is nevertheless treated by the organisation as permanently unwell purely because a diagnosis sits on their personnel record',
      'An employee with no diagnosed condition begins to struggle with sleep, concentration, and motivation after a period of organisational change, and their performance gradually declines even though they would not meet diagnostic criteria for a mental health condition',
      'An employee returns to work fully recovered after a course of treatment, reports no further symptoms of any kind at the return-to-work meeting, and is moved back from the unwell category to the well category on the record with no further monitoring of any kind',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The continuum model is more useful because it recognises that mental health is not simply a matter of being 'well' or 'unwell'. The scenario of someone with no diagnosis whose functioning gradually declines after organisational change shows how a person can move along the continuum from thriving to struggling without ever meeting diagnostic criteria. This enables earlier intervention, as support can be offered when someone is beginning to struggle rather than waiting for a crisis or a formal diagnosis, and it reduces stigma by normalising the fluctuation of mental health.",
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
      'Explain that the beliefs held in their culture about mental health are mistaken, set out the evidence that shows this, and encourage them to put those beliefs aside so that they can accept help in the way that you yourself would',
      'Involve members of their family straight away, since family is central to their culture, even though the person has not consented and has said clearly that they do not want anyone at home to be told anything about it at this stage',
      'Step back entirely and avoid raising the subject with them again at any point, on the basis that their culture treats mental health as a private family matter and any further approach from you would be an unwelcome intrusion on them',
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
      'An employer can be liable only where the employee gave written notice of a formally diagnosed condition before the dismissal, so a disability never put in writing to the employer cannot found a claim either and no duty to make reasonable adjustments arises at all however obvious the signs were at work',
      'Depression can never amount to a disability under the Equality Act 2010, because the Act protects only physical impairments that are permanent, so a severe depressive episode falls outside the protected characteristic however long it lasts and however badly it affects normal daily activities',
      'An employer has a complete defence to any claim simply by stating that it was unaware of the condition at the time, whatever the visible signs at work were, whatever colleagues had reported to managers and whatever the sickness absence record showed in the months before the dismissal was decided',
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
      'Low mood always lasts longer than clinical depression and is more resistant to treatment',
      'Clinical depression only ever affects mood, whereas low mood affects sleep, appetite and concentration',
      'Clinical depression is a diagnosable condition that significantly impairs daily functioning',
      'There is no real difference; the two terms describe exactly the same experience',
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
      'Persistent depressive disorder (dysthymia)',
      'Postnatal depression after childbirth',
      'Major depressive disorder (MDD)',
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
      'A racing heartbeat and shortness of breath in response to a perceived threat',
      'An exaggerated sense of self-importance and boundless energy',
      'A fixed, false belief held with conviction despite clear evidence against it',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Persistent feelings of hopelessness and sadness are core emotional symptoms of depression. Racing heartbeat and shortness of breath are more typical of anxiety, an inflated sense of self-importance is associated with mania, and a fixed false belief is a delusion seen in psychosis.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Depression symptoms',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 45,
    question: "What does the 'fight-flight-freeze' response describe?",
    options: [
      "A learned habit of avoiding difficult conversations at work",
      "The body's automatic survival response to perceived danger",
      "A gradual decline in mood over a period of several weeks",
      "A deliberate decision to confront, escape from, or ignore a stressful situation",
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
      'Persistent low mood and loss of interest in activities',
      'Sleeping far more than usual and feeling emotionally numb',
      'Heart palpitations and shortness of breath',
      'A fixed, false belief that others intend to cause harm',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Heart palpitations and shortness of breath are common physical symptoms of anxiety, caused by activation of the sympathetic nervous system. Persistent low mood, loss of interest and sleeping too much (hypersomnia) are more associated with depression, while fixed false beliefs are a feature of psychosis.',
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
      'Any feeling of pressure experienced at work, whether that pressure helps or harms you',
      'A condition involving persistent and excessive worry about a wide range of everyday matters',
      'The normal level of challenge that motivates most people to perform well in their own work',
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
      "\"I'm here for you and I'm listening\"",
      "\"Would you like to talk about how you're feeling?\"",
      "\"Just snap out of it and think positive\"",
      "\"I've noticed you haven't seemed yourself lately\"",
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
      'Repetitive checking and hand-washing rituals to reduce anxiety',
      'Withdrawing from social activities and isolating yourself',
      'Boundless energy and taking on far more tasks than usual',
      'Hyperventilating and an overwhelming urge to escape a situation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Social withdrawal and isolation are common behavioural symptoms of depression. People may stop seeing friends, avoid activities they once enjoyed, and pull away from family and colleagues. Repetitive checking and hand-washing are more associated with OCD, increased energy with mania, and hyperventilating with anxiety and panic.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'basic' as const,
    topic: 'Depression symptoms',
    category: 'Depression, Anxiety & Stress' as const,
  },
  {
    id: 54,
    question: 'What is Generalised Anxiety Disorder (GAD)?',
    options: [
      'An intense fear of one specific object or situation, such as heights or spiders',
      'A sudden, time-limited episode of overwhelming fear with physical symptoms',
      'A condition involving persistent, excessive worry about many different things',
      'A fear of social situations driven by worry about being judged by others',
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
      'Leave them alone in a quiet room until the attack passes by itself',
      'Tell them firmly to pull themselves together and stop overreacting',
      'Call 999 immediately, as every panic attack is a medical emergency',
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
      'A brief episode of severe depression that lifts completely within a few weeks without treatment',
      'A chronic form of depression lasting 2 years or more with milder but persistent symptoms',
      'A pattern of depression that occurs only during the winter months of each successive year',
      'A depressive episode that develops in the first weeks and months that follow childbirth',
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
      'Heart palpitations, sweating and trembling in stressful situations at work',
      'Withdrawing from friends and giving up all activities that were once enjoyed',
      'Difficulty concentrating, indecisiveness, and negative thinking patterns',
      'Disturbed sleep, low energy and changes in appetite or in overall body weight',
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
      'Alarm, resistance and exhaustion in response to any prolonged period of stress at work',
      'Denial, anger, bargaining and acceptance during a long period of bereavement',
      'Physical fatigue, disturbed sleep and a marked loss of appetite and weight',
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
      'Evaluate the severity of the person\'s symptoms',
      'Establish a formal diagnosis before offering support',
      'Educate the person about their condition in detail',
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
      'Excessive and uncontrollable worry about many different areas of everyday life, work and money matters',
      'Intense fear and avoidance of social situations due to worry about being judged or embarrassed',
      'Recurrent, unexpected panic attacks with a persistent fear that further attacks will follow soon',
      'A fear of open spaces or of crowds in a place from which escape might prove difficult or slow',
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
      'An anxiety disorder involving an intense fear of one specific creature or object, such as spiders, snakes or heights',
      'An anxiety disorder involving fear of social situations, driven by worry about being judged or embarrassed by others',
      'An anxiety disorder involving an overwhelming fear of becoming seriously ill or of being contaminated by germs and dirt',
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
      'Obsessive Control Disorder; controlling behaviour towards other people and sudden outbursts of anger at them',
      'Occasional Compulsive Distress; occasional periods of worry followed by short spells of distress',
      'Overwhelming Cognitive Dysfunction; loss of memory and confusion about the time, place and identity',
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
      'Generous rates of pay, secure long-term contracts, predictable indoor working conditions and a short and settled daily journey to work',
      'Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings',
      'An older workforce with ready access to on-site counselling, occupational health advice and specialist mental health support at every site',
      'A workforce that discusses its emotions openly and readily asks for help as soon as anyone on the job begins to struggle at all',
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
      'A framework in which every patient receives the same intensive treatment, whatever the severity of their symptoms',
      'A system in which patients choose whichever therapy they prefer, with no clinical assessment of what they need',
      'A framework where treatment is matched to severity, starting with least intensive and stepping up if needed',
      'An approach that always begins with admission to hospital and then steps down to guided self-help in the home',
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
      'A private therapy service which can be reached only through a GP referral and a fee paid by the patient for each session held',
      'A crisis helpline staffed by trained volunteers for people who are experiencing thoughts of suicide during the night',
      'A workplace counselling scheme provided directly by employers for their own staff and paid for by the employer alone',
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
      'Immediate, complete relief of low mood from the very first dose',
      'A rapid physical addiction comparable to that caused by opioids',
      'Severe withdrawal seizures within hours of taking the first tablet',
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
      'Persistent Tension and Stress Disorder; triggered by sustained pressure in the modern workplace',
      'Post-Traumatic Stress Disorder; triggered by experiencing or witnessing a traumatic event',
      'Post-Treatment Stress Dysfunction; triggered by an operation or other invasive medical procedure',
      'Progressive Thought Suppression Disorder; triggered by a pattern of negative thinking',
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
      'GPs personally deliver long-term weekly psychotherapy sessions to every patient they diagnose with depression',
      'GPs are able only to prescribe medication and cannot refer a patient on to any specialist NHS service at all',
      'GPs assess symptoms, diagnose depression, discuss treatment options, and can refer to specialist services',
      'GPs play no part in mental health care at all, which is handled entirely by hospital psychiatrists and nurses',
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
      'Persistent and excessive worry about a wide range of everyday issues and responsibilities',
      'An intense fear of one single object or situation, such as spiders or heights',
      'A fear of social situations driven by worry about being judged or embarrassed',
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
      'Drinking alcohol in the evening in order to unwind and relax',
      'Avoiding all social contact so as to reduce stimulation',
      'Working longer hours in order to distract yourself',
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
      'Step 1 — Recognition, assessment, and active monitoring of suspected depression',
      'Step 3 — High-intensity interventions for moderate to severe depression',
      'Step 2 — Low-intensity interventions such as guided self-help for mild depression',
      'Step 4 — Inpatient care and crisis services for those at significant risk',
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
      'Give him detailed written information about the causes and symptoms of clinical depression',
      'Encourage him to refer himself to NHS Talking Therapies as soon as he possibly can this week',
      'Approach, assess, and assist with any crisis — including assessing for suicidal thoughts',
      'Encourage him to take up self-help strategies such as regular exercise and a settled routine',
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
      'IPT uses medication to correct a chemical imbalance in the brain, while CBT relies only on talking and is offered once medication has already been tried and failed',
      'IPT explores childhood experiences in depth over several years, while CBT deals only with what is happening in the present moment and ignores the whole past',
      'IPT and CBT are identical approaches that differ only in the number of sessions offered and in the professional title of the person who is delivering them',
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
      'Only emotional exhaustion is relevant to safety on site; cynicism and reduced personal efficacy affect how a worker feels but have no bearing on the risk they present to others',
      'Burnout improves safety performance, because exhausted workers become noticeably more cautious, slow down of their own accord and take far fewer risks with the work in hand',
      'The three burnout dimensions affect morale and job satisfaction but have no measurable effect on physical safety outcomes such as accidents, injuries and near misses',
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
      'Agree that the medication is clearly not working after only two weeks and support his decision to stop taking it himself straight away today',
      'Explain that SSRIs typically take 4-6 weeks to show full effect and encourage him to discuss concerns with his GP before making changes',
      'Suggest that he doubles the dose himself for a week or two so that the effect comes on more quickly and he starts to feel better than that',
      'Tell him to switch to a different antidepressant that a friend of yours found helpful and to pick the new one up from a local pharmacy himself',
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
      'A specific phobia involves persistent worry about everyday matters such as money and work, while GAD involves an intense fear triggered by one particular object',
      'Both conditions involve recurrent panic attacks that come on without any warning, but only GAD includes avoidance of the situations that trigger them',
      'A specific phobia involves intense fear triggered by a particular object or situation; GAD involves persistent, excessive worry across multiple areas of life',
      'A specific phobia affects only children and is grown out of by adulthood, whereas GAD develops only in adults and is never seen at all before that age',
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
      'Diagnose the worker with depression yourself, recommend a particular antidepressant that has worked for other people you know, and then arrange for the prescription to be issued',
      'Tell him that stress of this kind is a normal part of construction work, that everyone on site feels much the same, and that the best thing he can do is to push on through it',
      'Keep the conversation entirely to yourself, avoid mentioning any professional service or self-help option, and wait to see whether he raises it with you again himself',
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
      'For every presentation of low mood regardless of severity, since NICE places medication ahead of guided self-help as the first step in all cases',
      'For any person who has completed several years of talking therapy without benefit, since NICE positions medication as the final step for everyone',
      'For people under 18 experiencing a first episode of low mood, for whom NICE recommends medication before any psychological intervention is offered',
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
      'Substance use is always illegal, whereas misuse only applies to prescription medicines',
      'Substance use means occasional consumption, while misuse means using a substance only once',
      'Substance use refers to any consumption, while misuse is use that causes harm or is hazardous',
      'There is no difference between the two terms; they describe the same behaviour',
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
      'Improved sleep quality and a consistently steady, calm mood',
      'Heightened startle response and recurring nightmares about a past event',
      'Persistent fixed false beliefs and hearing voices that others cannot hear',
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
      'Women aged 18-24, with students having the highest occupational rate',
      'Men aged 45-54, with construction workers having the highest occupational rate',
      'Adults over 65, with retired professionals having the highest rate',
      'Teenagers aged 13-17, with school pupils having the highest rate',
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
      'Self-harm is always a failed suicide attempt by someone who definitely intended to end their life',
      'Self-harm is an accidental injury sustained during a moment of severe panic or distress',
      'Self-harm is a deliberate attempt to gain attention and sympathy from other people',
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
      "Asking someone directly about suicide can open up a vital conversation and offer relief",
      "Most people who feel suicidal do not truly want to die; they want the pain to stop",
      "People who talk about suicide are just seeking attention and won't actually do it",
      "Suicidal crises are often temporary, so timely support can save a person's life",
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
      'A pattern of drinking or using drugs only in social settings, which the person is able to stop whenever they choose',
      'A single episode of heavy use followed by a hangover, after which the person returns to normal without difficulty',
      'A legal classification applied once a person\'s substance use has been recorded by their GP on their medical notes',
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
      'Taking up a new hobby and reconnecting with old friends and family',
      'Making detailed long-term plans for the future and looking forward to events',
      'Talking about being a burden, giving away possessions, or withdrawing from others',
      'Sleeping slightly less than usual during a busy and demanding period at work',
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
      'Whenever a colleague mentions they have been feeling stressed at work, so that paramedics can assess them before they start their shift',
      'As soon as someone discloses a mental health condition, because any disclosure of a diagnosis counts as an emergency requiring an ambulance',
      'When someone needs urgent advice outside office hours, because NHS 111 and local crisis teams operate only during normal working hours',
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
      'Yes — asking directly plants the idea and significantly raises the chance they will act',
      'Yes — it is always safer to avoid the word "suicide" and use gentler, indirect language',
      'It makes no difference either way, so it is best not to raise the subject at all',
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
      'Diagnosis, prescribed medication, hospital admission, discharge to the crisis team, a follow-up appointment, and review of the care plan at six months',
      'Approach, tell the line manager, ask for a diagnosis, reassure the person nothing will be shared, refer to HR, and record the conversation in writing',
      'Warning signs, coping strategies, people to contact for distraction, people to ask for help, professionals to contact, making the environment safe',
      'Approach and assess for risk, listen non-judgementally, give reassurance and information, encourage professional help, encourage self-help supports',
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
      'Cannabis reliably improves mental health and is recommended in NHS guidance as a first-line treatment for anxiety disorders',
      'Cannabis affects mood only in the hours after use, and high-strength varieties carry no more long-term risk than weaker ones do',
      'Cannabis affects only physical health, and no psychological symptom has ever been linked to its use at any strength or dose',
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
      'Warn them that you are obliged to report their drinking to their line manager before you are willing to continue the conversation',
      'Tell them firmly to stop drinking tonight and rely on willpower alone, since daily heavy drinking is safest broken without support',
      'Reassure them that drinking every evening to cope is harmless, and suggest they carry on until the pressure at work starts to ease',
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
      'Because self-harm is always an attempt to end life, so anyone who injures themselves in any way is acting on suicidal intent and should have an ambulance called for them',
      'They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb',
      'Because they are seeking attention, which is why self-harm is almost always done somewhere visible where colleagues or family are certain to notice it straight away',
      'Because the physical pain of a wound is always greater than the emotional pain behind it, so the injury works by giving them something worse to think about than their distress',
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
      'They can be stopped suddenly at any dose without medical advice, because benzodiazepine withdrawal produces no physical symptoms',
      'They carry no risk of dependence when taken regularly for many months, because tolerance to the sedative effect never develops',
      'Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal',
      'They are safe to combine with alcohol or opioids, since the effect of one cancels out the sedative effect of the other entirely',
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
      'Social isolation and a recent relationship breakdown',
      'A previous suicide attempt and a history of depression',
      'Easy access to lethal means and ongoing substance misuse',
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
      'It should set out the sanctions applied to anyone testing positive, and deliberately omit any mention of support so the rules are not undermined',
      'It should name every illegal drug individually and leave out alcohol, on the basis that a legally sold substance falls outside a workplace policy',
      "It should include the organisation's position, rules, support available, testing procedures (if applicable), and consequences of policy breaches",
      'It should apply only to safety-critical staff on site, exclude office-based employees, and leave testing arrangements to each manager\'s discretion',
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
      'Strong social connections, a clear sense of belonging, and regular contact with family and friends',
      'Good access to mental health support, effective coping skills, and a settled daily work routine',
      'A stable home life, restricted access to lethal means, and a strong sense of future purpose',
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
      'Refuse to touch the wound in case you are later held responsible, and tell them they must clean and dress it on their own before returning to work on site',
      'Lecture them about the dangers of self-harm and get a promise that they will stop, before you are prepared to offer any practical first aid yourself',
      'Photograph the injury for the accident book and send the picture to their line manager before doing anything at all to clean or cover the open wound',
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
      'Improved liver function, a strengthened immune system, and steadily better sleep quality over many years',
      'Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems',
      'A reduced risk of cancer, better cardiovascular health, and protection against memory loss later in life',
      'Temporary fatigue and poor sleep that resolve within days of stopping, leaving no lasting damage to the liver',
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
      'Signpost the person to their nearest pharmacy for advice',
      'Stay silent and wait for the person to raise the subject themselves',
      'Safety plan — help them create a plan to keep safe',
      'Stop the conversation and refer the person on immediately',
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
      'Constipation and mild drowsiness only, with no tolerance developing however long the prescription continues and no risk of overdose',
      'Short-lived nausea followed by a complete return to normal once the course ends, with dependence possible only with illegal opioids',
      'A reduced risk of harm when taken with alcohol, since alcohol slows absorption and protects breathing during opioid intoxication',
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
      'Report him to his supervisor for the smell of alcohol and wait to see whether he is disciplined, on the basis that a formal process protects everyone, without raising it with him',
      "Tell him you've noticed changes and you're worried, ask directly if he's having thoughts of suicide, offer to help him make a safety plan, and call professional support if needed",
      'Avoid mentioning the changes you have noticed in case raising them singles him out, and wait for him to bring up the separation himself whenever he feels ready to talk about it',
      'Tell him to take some annual leave and reassure him that things will look better after a rest, without asking any direct question about how he is coping since the separation',
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
      'Reassure them that keeping spare medication is sensible in case a repeat prescription is delayed, avoid asking anything that might embarrass them, and move the conversation on to something lighter so that it ends positively before they go back to work',
      'Avoid raising the subject directly, since asking someone about suicide plants the idea and makes them more likely to act, and instead watch quietly for further warning signs over the coming weeks before saying anything to anyone about what you were told',
      'Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping',
      'Confiscate the medication yourself and dispose of it without telling them, then inform their line manager and their GP that you have done so, leaving the colleague to discover at their next appointment that the tablets they were keeping have been taken away',
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
      'A plan treating the depression only, on the basis that the drinking is a symptom that will stop once mood improves, with the substance misuse service ending its involvement at the point of discharge itself',
      'A plan treating the alcohol dependency only, with mental health follow-up closed on discharge because abstinence is expected to resolve the depression without any further psychiatric involvement',
      'A plan offering a single follow-up appointment three months after discharge, with no safety plan, no GP contact in the first 48 hours and no monitoring of either condition in the intervening period',
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
      'Cocaine has no effect on the heart and carries no risk of stroke or seizure at any dose; the only psychological effect is a mild low in the days afterwards, which passes without any lasting change in mood',
      'Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency',
      'Cocaine affects mood only briefly and has never been linked to physical harm; the paranoia and aggression seen during intoxication are caused by alcohol taken alongside it rather than by the drug itself',
      'Cocaine is physically harmless and produces no psychological withdrawal at all; the only genuine risk is the financial cost, since reliance on it is a matter of habit rather than any effect on the brain',
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
      'Professionals and agencies to contact, making the environment safe, warning signs, internal coping strategies, people and social settings for distraction, people to ask for help',
      'Making the environment safe, professionals and agencies to contact, internal coping strategies, warning signs, people and social settings for distraction, people to ask for help',
      'Warning signs, internal coping strategies, people and social settings for distraction, people to ask for help, professionals and agencies to contact, making the environment safe',
      'Internal coping strategies, warning signs, making the environment safe, professionals and agencies to contact, people to ask for help, people and social settings for distraction',
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
      'Insist they stop cutting immediately, ask them to promise never to do it again before you will discuss anything further, and tell them you will check their arms each week, on the basis that removing the behaviour has to come before any discussion of the past trauma behind it',
      'Tell them that self-harm is dangerous attention-seeking they will grow out of, explain that talking about past trauma only makes the urges worse, and suggest they keep themselves busy until each urge passes rather than seeing a counsellor who will make them dwell on it',
      'Break their confidence and report the self-harm to their manager as a disciplinary matter, explaining afterwards that you had no choice because anyone who injures themselves is unfit for site work, then leave any referral for the manager to arrange as they see fit',
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
      'Self-harm and suicide are completely unrelated, so a history of self-harm tells you nothing about future suicide risk and need not be taken into account when judging how safe a person is',
      'Everyone who self-harms is actively attempting suicide, so the two should be treated as one and the same thing and every episode should be recorded as a failed attempt on their life',
      'Self-harm always reduces the future risk of suicide by providing a safe outlet for distress, so a person who self-harms regularly is at a lower risk than someone who does not do it',
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
      'A severe form of personality disorder',
      'A loss of contact with reality',
      'A mild, short-lived form of anxiety',
      'A mild learning disability',
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
      'A sensory experience of something that is not actually present',
      'A temporary lapse in memory following a stressful event',
      'An intense, irrational fear of a specific object or situation',
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
      'Argue firmly against their delusions to help them see reality again',
      'Stay calm, speak gently, and do not argue with their delusions',
      'Ignore them completely until the episode has passed off on its own',
      'Raise your voice sharply so that they can focus on what you are saying',
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
      'Binge eating large amounts of food with a sense of loss of control, without purging',
      'Cycles of binge eating followed by compensatory behaviours such as purging',
      'Eating only a very narrow range of foods due to sensory aversions',
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
      '\'How can I help you today?\'',
      "'What's wrong with you?'",
      '\'When did this start?\'',
      '\'Why are you here?\'',
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
      'Using clinical diagnostic labels in place of the name of a person so that the written records stay accurate and consistent',
      'Only discussing the mental health of someone at a time when they are actually present in the room with you and can hear it',
      'Referring to a person solely by their diagnosis so that colleagues understand what their needs are straight away',
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
      'Restricting food intake severely, leading to a significantly low body weight',
      'Binge eating large amounts of food without any compensatory behaviours at all',
      'Cycles of binge eating followed by compensatory behaviours such as purging',
      'Eating only a very limited range of foods because of a fear of new tastes and textures',
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
      'Delusion of persecution',
      'Referential delusion',
      'Somatic delusion',
      'Delusion of guilt',
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
      'The first time someone takes antipsychotic medication; early intervention reduces the side effects that they experience from it',
      'The first time someone is admitted to a psychiatric hospital ward; early intervention prevents any readmission at all later on',
      'The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes',
      'The first time a family member notices unusual behaviour at home; early intervention prevents family breakdown later',
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
      'Ongoing Severe Feeding and Eating Dysfunction — a chronic condition that requires long-term tube feeding in a specialist hospital unit over many months',
      'Occasional Stress-related Food and Eating Disturbance — emotional eating that occurs only during unusually stressful periods at work and which settles by itself',
      'Obsessive Selective Food and Eating Disorder — eating only a very narrow range of familiar foods and refusing anything new that is offered by anybody else',
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
      'Men are biologically incapable of developing an eating disorder, so genuine cases in the construction industry are extremely rare',
      'Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help',
      'Screening tools for eating disorders are highly accurate for men, so very few cases are ever missed in practice on site',
      'Men are routinely screened for eating disorders at work, so underdiagnosis in the industry is not an issue at all today',
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
      'A temporary increase in muscle mass and improved bone density',
      'Better cardiovascular fitness and a stronger immune system',
      'Heart failure due to electrolyte imbalances',
      'A reduced long-term risk of osteoporosis and dental problems',
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
      'Complex PTSD involves milder symptoms than standard PTSD and resolves far more quickly without any treatment being needed',
      'Complex PTSD only ever follows a single traumatic event, unlike standard PTSD, which follows many separate events over time',
      'Complex PTSD has no re-experiencing or avoidance symptoms at all, only relationship difficulties and low self-worth',
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
      'Attention deficit hyperactivity disorder',
      'Obsessive-compulsive disorder in adults',
      'Social anxiety disorder (social phobia)',
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
      'A complete absence of any emotional response to events or to the situations around a person from day to day',
      'Difficulty managing or controlling emotional responses, leading to intense or rapidly shifting emotions',
      'A deliberate strategy of suppressing emotion so as to appear calm and in control under pressure',
      'A consistently flat, low mood that never changes whatever the circumstances happen to be at the time',
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
      'Physical trauma, emotional trauma and financial trauma',
      'Acute trauma, chronic trauma and situational trauma',
      'Single-incident, complex (repeated), and vicarious',
      'Mild trauma, moderate trauma and severe trauma',
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
      'A belief that a person has special powers or exceptional abilities of their own',
      'A belief that unrelated events carry a personal significance for you alone',
      'A belief that the body is malfunctioning or diseased in some serious way',
      'A belief that others are plotting to harm, deceive, or persecute you',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A paranoid delusion is a fixed, false belief that others are plotting to harm, deceive, or persecute you. It is one of the most common types of delusion experienced during psychosis. By contrast, a grandiose delusion involves beliefs about having special powers, a referential delusion involves believing unrelated events are personally significant, and a somatic delusion concerns the body being diseased.',
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
      'Binge eating large amounts of food that is then followed by purging through vomiting, laxative misuse or long bouts of excessive exercise afterwards',
      'Severely restricting food intake over a long period, leading to a dangerously low body weight and to serious physical health problems over time',
      'Eating only a narrow range of foods because of strong sensory aversions to their taste, smell and texture rather than to the calories they hold',
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
      'Trauma caused by directly experiencing a single life-threatening event yourself; only the injured worker is affected by it and nobody else on site is at risk',
      "Trauma experienced indirectly through witnessing or hearing about others' traumatic experiences; first aiders, supervisors, and colleagues may be at risk",
      'Trauma that results only from repeated physical injury on site; office staff and supervisors are never at any risk of it, whatever they may hear about it later',
      'Trauma that develops solely from long working hours; nobody who witnesses an incident on site is affected by what they have seen, however serious it was',
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
      'Providing long-term residential care for people with established, chronic schizophrenia in hospital units',
      'Delivering general mental health awareness training sessions to the wider workforce on every site each year',
      'Offering rapid, specialist support during the first episode of psychosis to improve long-term outcomes',
      'Managing routine medication reviews for people who have been stable on the same treatment for many years',
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
      'Tell them firmly to calm down and point out to them that they are overreacting badly to a very small issue at work',
      'Discipline them for threatening to leave the site so that the behaviour is not repeated by anyone else',
      'Ignore the situation entirely and let them walk off the site without any conversation about it at all first',
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
      'Long-term antipsychotic medication and electroconvulsive therapy (ECT) sessions',
      'Trauma-focused CBT and Eye Movement Desensitisation and Reprocessing (EMDR)',
      'Group support sessions and general counselling without any trauma focus at all',
      'Interpersonal therapy (IPT) and structured group exercise programmes',
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
      'Remove the worker from all duties at height immediately, on the basis that the diagnosis itself makes that work unsafe whoever holds it and however well controlled it is',
      'Keep the diagnosis secret from the worker while quietly reassigning their duties to other members of the team, without telling anyone why the change to the work has been made',
      'Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels',
      'Ask the rest of the team to vote on whether the worker should carry on in their present role, and then act on whatever the majority of them decide on the day of the vote',
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
      'In both conditions the self-concept is identical, so the distinction has no bearing at all on the treatment offered, and either diagnosis leads to exactly the same programme of therapy, the same medication and the same expected outcome',
      'In BPD/EUPD the negative self-concept is always tied to one single traumatic event, unlike in Complex PTSD, where the identity of the person is never affected at all by what they have been through over the years of their life',
      'In Complex PTSD identity is stable and unchanging, whereas in BPD/EUPD it never varies either, so neither condition involves any disturbance of the sense of self and the two conditions can be told apart only by the age of the person',
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
      'He is most likely joking about the site cameras and about his supervisor, so the beliefs should be dismissed and ignored by his colleagues until he drops the subject',
      'He is probably just stressed about the pace of the work and should be told to take the rest of the day off site and come back in the morning when he feels a bit better',
      'His beliefs should be argued against firmly and repeatedly until he accepts that nobody at all is watching him and that the cameras are there for site security',
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
      'A single adverse childhood experience guarantees that a person will go on to develop a mental illness in adulthood, so anyone with one ACE on their record should be treated as already unwell while at work',
      'The higher the number of ACEs a person has experienced, the greater their statistical risk of physical and mental health problems in adulthood, including substance misuse, depression, and heart disease',
      'The number of ACEs a person has experienced has no measurable effect on health outcomes later in life, so childhood history is of no use at all in understanding adult substance misuse or depression at work',
      'Only the most severe single ACE matters and the total number a person has experienced is irrelevant, so an assessment need only record the worst thing that ever happened to the person as a very young child',
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
      'Electronic Mood and Depression Regulation — a small device worn on the wrist that delivers mild electrical pulses to the skin to lift mood, worn throughout the working day and recharged each night by the person using it and by the clinic once a month',
      'A medication that blocks traumatic memories so that the person can no longer recall the event at all, taken daily until the memory has faded completely from the mind and the flashbacks have stopped, leaving the person with no memory of the event',
      'Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing',
      'A breathing technique used during panic attacks to slow the heart rate and restore calm, practised for a few minutes at the start and the end of each working day until the trauma no longer distresses and the person is signed off as recovered',
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
      'A single one-off session in which the worker is encouraged to forget the accident and move on with the job, after which no further therapy is offered and the case is closed by the therapist as fully complete',
      'Long-term medication management with no talking or psychological component of any kind, reviewed by a psychiatrist every few months until the symptoms settle on their own with no further review of any kind',
      'Repeated retelling of the trauma to large groups of other patients without any structure, any coping strategies or any support from the therapist in between the weekly sessions that are held on a ward',
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
      'A trauma-informed approach means avoiding the person entirely so that nothing said or done on site can ever trigger them, which in practice means keeping them off shared work areas, leaving them out of briefings and giving instructions only in writing at all times while they are on the job',
      'A trauma-informed approach focuses on disciplining emotional outbursts firmly so that they do not happen again, which in practice means a written warning after each incident and a record kept on the personnel file for the rest of the contract, whatever the trigger for the outburst was',
      'A trauma-informed approach involves asking the person to describe their past trauma in full detail to colleagues, which in practice means a group session at induction where each worker sets out their history so the team knows what to avoid saying to that particular person while on the site',
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
      'Champions are qualified to diagnose conditions and to recommend treatment, whereas MHFAs can only raise awareness and put up posters around the site',
      'MHFAs are trained to provide initial support and signpost; Champions raise awareness and reduce stigma but are not trained to provide first aid',
      'There is no difference at all; the two terms describe exactly the same role, the same training and exactly the same duties on any site at all',
      'MHFAs only work in the construction industry, whereas Champions work in every other industry and are never seen on a building site at all',
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
      'Employee Appraisal and Review Process',
      'Emergency Action Plan for staff',
      'Employee Assistance Programme',
      'Equality Access Programme',
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
      'Cognitive Behavioural Therapy on the NHS',
      'The Community Mental Health Team (CMHT)',
      'An Employee Assistance Programme (EAP)',
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
      'Presenting mental health awareness training sessions to colleagues on the site',
      'Being absent from work for a long period because of mental ill health',
      'Being present at work but functioning at reduced capacity due to ill health',
      'Being overly present and available at work at all hours of the day',
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
      'A therapy session run on site by a qualified counsellor for a small group of workers each week',
      'A meeting held on site to discuss the tools and equipment needed for mental health first aid',
      'A formal disciplinary meeting about mental health issues raised by a worker on site',
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
      'A sudden burst of empathy that improves the quality of the support a helper is able to offer to others who are in distress',
      'A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering',
      'A physical condition caused by long hours of heavy manual work carried out on a construction site over many years on end',
      'A short-term feeling of satisfaction that follows successfully helping a colleague through a difficult time at work on site',
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
      'Face-to-face counselling sessions held at a local centre',
      'Workplace mental health audits for employers',
      'Group therapy sessions held in the community',
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
      'So that MHFAs receive public recognition for the role they carry out on site',
      'So that MHFAs can be held accountable for any incident that occurs on site',
      'So that management can monitor their activities closely each week',
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
      'Ensure that all line managers hold a formal counselling qualification',
      'Produce, implement, and communicate a mental health at work plan',
      'Provide free gym memberships for all employees and for their families',
      'Appoint a full-time occupational psychologist in every single workplace',
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
      'The names and diagnoses of the individual employees who have recently sought support from an MHFA on site during this year',
      'A general statement that mental health matters to the business, with no supporting figures or data at all behind it',
      'Current sickness absence rates, presenteeism costs, and staff turnover data alongside the £5 ROI for every £1 invested',
      'Anecdotes about one or two individual employees, presented without any wider organisational context or figures',
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
      'Generalised anxiety disorder severity over two weeks',
      'Alcohol dependency levels over the past year',
      'Post-traumatic stress disorder in adults',
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
      'Severity of depression symptoms over the past two weeks',
      'A person\'s level of alcohol dependency and drinking habits',
      'The presence and severity of post-traumatic stress symptoms',
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
      'Dismissing the employee in order to reduce stress in the rest of the team',
      'Allowing flexible working hours or phased return to work after absence',
      'Removing the employee from all team activities and from all site meetings',
      'Telling all colleagues about the condition so that they can help out too',
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
      'By keeping mental health entirely separate from health and safety so as to avoid any confusion at all on site',
      'By treating mental health solely as an HR matter with no link at all to the safety arrangements on site',
      'By including mental health in risk assessments, H&S policies, induction processes, and incident reporting',
      'By addressing mental health only after a serious physical safety incident has occurred on the site',
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
      'The personal diagnoses disclosed by each employee who has approached an MHFA on site during the year',
      'The total number of hours that each MHFA spends away from their normal duties in a working week',
      'A subjective judgement by the managers about whether morale feels better than it did before',
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
      'A physical injury sustained by an MHFA while providing physical first aid to a colleague who has been badly hurt at work, which then keeps the MHFA off site for a period',
      'The boost in confidence an MHFA feels after successfully supporting someone through a crisis and then seeing that colleague return to work well again a few weeks later',
      'A condition that only ever affects the person who directly experienced the original traumatic event, and never those who simply hear about that event from them later',
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
      'To allow managers to monitor and assess the performance of each individual MHFA in the team over the course of the year',
      'To provide a confidential space for MHFAs to reflect on their experiences, process emotions, and receive guidance',
      'To formally record the names and the personal details of everyone an MHFA has supported during the year on site',
      'To train MHFAs to diagnose mental health conditions and to recommend suitable medication to colleagues at work',
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
      'Giving out their personal mobile number so that they are available 24 hours a day, seven days a week',
      'Promising to keep a secret for a colleague even where there is a clear risk to their life or safety',
      'Keeping interactions within agreed hours and signposting to crisis services outside those times',
      'Taking on a full counselling role if the person cannot afford to pay for private therapy fees',
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
      'Physical and mental health are entirely separate and have no influence on one another at all, so an employer can safely deal with each of them under a different policy',
      'Only physical health affects mental health; poor mental health has no physical consequences at all, so there is no need to consider it in a health surveillance scheme',
      'Mental health problems are always caused by physical illness and never the other way round, so treating the physical complaint on its own will always resolve the mental one',
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
      'A complete list of the personal mental health history and diagnoses of every employee on the payroll, kept on file for managers to consult when needed',
      'A set of disciplinary penalties for employees who disclose a mental health condition to their line manager at any point during their employment',
      'A requirement that all staff undergo a compulsory psychiatric assessment each year, whatever their role and whatever their health record may show',
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
      'BEAT (the UK eating disorders charity)',
      'CALM (Campaign Against Living Miserably)',
      'Papyrus (the young suicide prevention charity)',
      'Mates in Mind (the construction mental health charity)',
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
      'By keeping all mental health discussions strictly private and never raising the topic openly on site, so that nobody is ever put on the spot in front of their workmates at any time',
      'By publicly naming the colleagues who have sought support so that others feel encouraged to come forward and do exactly the same thing themselves in due course in the months ahead',
      'By leading by example with open conversations, supporting campaigns like Time to Talk Day, and normalising mental health discussions through toolbox talks and awareness events',
      'By discussing mental health only in formal disciplinary or HR meetings, so that the subject is always handled by somebody who is trained to deal with it properly on site',
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
      'To book a routine GP appointment about a non-urgent physical health concern during the week',
      'To report a crime that is in progress and which requires an immediate police response on site',
      'To order repeat prescriptions and to arrange medicine deliveries from a local pharmacy each month',
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
      'They are simply being lazy and should be reminded of their responsibilities as an MHFA and told to get on with the role that they volunteered for in the first place at the start',
      'They may be experiencing compassion fatigue or vicarious trauma and should access supervision, review their boundaries, and consider temporarily stepping back from the role',
      'They are developing schizophrenia and should be referred straight away for an urgent psychiatric assessment by the occupational health team based at the head office today',
      'They are experiencing the normal job satisfaction that goes with the role and no action of any kind is needed by them or by anyone else on the site at this point in time',
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
      'Training a single MHFA based at head office to cover all 500 employees across every site, and asking workers to telephone that person during normal office hours on weekdays',
      'Training MHFAs only from the management team, with none from the wider workforce, so that every conversation on the subject goes through a line manager first of all at the site',
      'Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site',
      'Training five MHFAs and relying on them to be available 24 hours a day, seven days a week, across all of the sites that the company runs in the region at any one time',
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
      'Tracking only the total number of MHFAs who have been trained, with no other outcome measures reported to the board and no comparison with earlier years or with other firms in the same sector at all',
      'Relying solely on informal feedback from line managers rather than on any structured data whatever, and reporting that feedback verbally to the board once a year with no written record being kept',
      'Measuring mental health outcomes once every five years to minimise the administrative burden, and publishing nothing at all in the meantime to the staff or to the wider board of directors either',
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
      'Agree to keep it completely confidential, since they already have a GP appointment next week and have contacted the Samaritans, and simply check in with them each day until that appointment comes round, while saying nothing to anyone else in the meantime at all',
      'Immediately call 999 and inform their line manager without discussing it any further with the person, on the basis that any mention of suicide always requires an emergency response from the services, whatever the person says about the risk they are at',
      'Tell them there is nothing more you can do until their GP appointment, end the conversation there, and leave it to the GP to decide what should happen next when the person is finally seen, since the appointment is only days away and the GP will take over',
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
      'Introducing stricter attendance monitoring, penalising employees who take any time off sick, and setting a target for each department to cut its recorded absence days by half over the coming twelve months of trading',
      'Training managers to recognise signs of presenteeism, promoting flexible working, reviewing workload management, enhancing EAP promotion, and creating a culture where taking time off for mental health is supported',
      'Requiring all employees to attend work in person regardless of how unwell they feel, and withdrawing the option of working from home for anyone with a health condition and withdrawing sick pay for the first three days off',
      'Removing the Employee Assistance Programme to encourage staff to rely on their own resilience, and reinvesting the money saved in a company bonus scheme, and moving the counselling budget into a staff social fund',
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
      'Continue offering daily support indefinitely, since the colleague finds it helpful and withdrawing now would feel like rejection, taking the view that an MHFA who has built trust is better placed to help than a professional the colleague has never met',
      'Stop all contact with the colleague without explanation so that they are forced to approach professional services, and decline to raise the decision in supervision on the grounds that the supporting relationship has ended and there is nothing to reflect on',
      'Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support',
      'Take on a formal counselling role to save the colleague the cost of private therapy, opening a case file and setting weekly appointments so that the support feels structured, while continuing to answer their calls between those weekly sessions as well',
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
      'Support for people affected by eating disorders of all ages',
      'Mental health in the construction and related industries',
      'Counselling for couples experiencing relationship difficulties',
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
      'Sending a single email listing the Five Ways to Wellbeing and treating the programme as delivered, on the basis that naming Connect, Be Active, Take Notice, Keep Learning and Give is enough for staff to act on them without activities, budget or management involvement, and measuring success by how many people opened the message',
      'Putting up posters of the Five Ways to Wellbeing in communal areas as the sole intervention, listing Connect, Be Active, Take Notice, Keep Learning and Give as personal responsibilities, with no team activities, walking schemes, reflective sessions, learning opportunities or volunteering days arranged by the organisation itself',
      'Asking employees to follow the Five Ways to Wellbeing in their own time and report back at appraisal, providing no workplace activities, and treating any request for time to join a lunchtime walk, a mindfulness session or a volunteering day as a matter for the individual to fit around contracted hours at their own expense',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A comprehensive approach to embedding the Five Ways to Wellbeing requires translating each element into tangible workplace initiatives: Connect through team-building and social activities; Be Active through physical activity schemes and active travel; Take Notice through mindfulness and reflective practice; Keep Learning through CPD, mentoring, and skills-sharing; and Give through volunteering, peer support, and community engagement. Simply communicating the framework without action will not achieve meaningful impact on workplace wellbeing.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced' as const,
    topic: 'Five Ways to Wellbeing',
    category: 'Workplace Implementation & Wellbeing' as const,
  },
  {
    id: 201,
    question: 'What is the most useful early sign that a colleague on site may be struggling?',
    options: [
      'They have always been a quiet person on site',
      'They wear different work clothing to the rest',
      'A change from how they normally are over weeks',
      'They asked a question about a job last Tuesday',
    ],
    correctAnswer: 2,
    explanation:
      'You are not looking for a type of person, you are looking for a change from what is normal for that person, sustained over time. Someone who has always been quiet is simply being themselves, so treating that as a warning sign tells you nothing and risks singling out a personality rather than noticing a difference.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic',
    topic: 'Recognising the Signs',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 202,
    question: 'Why does banter about being soft or weak matter on a working site?',
    options: [
      'It makes people less likely to speak up early',
      'It has no real effect because it is only banter',
      'It speeds up the work by keeping the mood light',
      'It only affects apprentices and never trades staff',
    ],
    correctAnswer: 0,
    explanation:
      'Language sets the rules about what can be said out loud. If struggling is framed as weakness, people stay silent until the problem is far bigger. Dismissing it as harmless banter misses that the audience is not the person telling the joke, it is everyone quietly deciding never to mention it.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'basic',
    topic: 'Reducing Stigma',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 203,
    question: 'You want to check in on a colleague. What is the best way to start?',
    options: [
      'Ask in the van in front of the whole crew at once',
      'Ask quietly and directly whether they are alright',
      'Wait until they raise it themselves at some point',
      'Send a group message asking what is wrong with them',
    ],
    correctAnswer: 1,
    explanation:
      'A quiet, direct question gives the person a real chance to answer honestly. Waiting for them to raise it first is the common instinct, but people who are struggling very often do not start that conversation, so waiting usually means nothing happens at all.',
    section: 'Mental Health Fundamentals',
    difficulty: 'basic',
    topic: 'Starting a Conversation',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 204,
    question: 'A colleague says they are fine but their manner says otherwise. What is a reasonable next step?',
    options: [
      'Accept the answer and never raise the subject again',
      'Tell them you do not believe a word they are saying',
      'Ask the rest of the crew what they think is wrong',
      'Say you are around, and check in again another day',
    ],
    correctAnswer: 3,
    explanation:
      'People often say fine the first time and open up later once they know the offer was genuine. Leaving the door open and returning to it respects their pace. Accepting the answer and dropping it forever looks polite but quietly closes the only route they had.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate',
    topic: 'Starting a Conversation',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 205,
    question: 'A colleague starts telling you about money worries at home. What is the most helpful response?',
    options: [
      'Jump in with a plan for sorting out their money',
      'Compare it to a worse time you went through once',
      'Listen without interrupting and let them finish',
      'Change the subject to the job to lighten the mood',
    ],
    correctAnswer: 2,
    explanation:
      'Being heard is the thing that helps, and interrupting stops the person before they reach what actually matters. Jumping to a plan feels useful and is a very natural trade instinct, but it turns their problem into your task and often ends the disclosure early.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Listening Skills',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 206,
    question: 'The HSE Management Standards cover six sources of work-related stress. Which set is correct?',
    options: [
      'Pay, hours, travel, tools, weather, and site parking',
      'Demands, control, support, relationships, role, change',
      'Diet, sleep, exercise, hobbies, family, and friends',
      'Training, PPE, permits, method statements, and RAMS',
    ],
    correctAnswer: 1,
    explanation:
      'The Management Standards name demands, control, support, relationships, role and change as the sources of stress at work. The lifestyle list is the attractive wrong answer because it sounds like wellbeing, but the Standards deliberately target things the employer controls, not the private habits of the worker.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate',
    topic: 'Workplace Stressors',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 207,
    question: 'Under the Health and Safety at Work etc Act 1974, the general duty of an employer extends to which of these?',
    options: [
      'Health, safety and welfare, so far as reasonably practicable',
      'Physical safety only, since health is a private matter',
      'Safety of tools and plant, but not of the people using them',
      'Welfare facilities such as toilets and a place to eat',
    ],
    correctAnswer: 0,
    explanation:
      'Section 2 places a duty to ensure the health, safety and welfare at work of employees so far as is reasonably practicable. Health sits in the wording alongside safety, so treating health as a private matter outside the duty misreads the Act at its most basic level.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Employer Duty',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 208,
    question: 'Should a risk assessment consider work-related stress?',
    options: [
      'No, because stress cannot be measured on a site',
      'Yes, because risks to health are covered as well',
      'No, unless a worker has already been signed off sick',
      'Yes, but only for office staff rather than site trades',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessment covers risks to health, not only risks of injury, and the Management Standards exist to make stress assessable in the same way. Waiting for someone to be signed off makes the assessment a reaction to harm that has already happened rather than a control that prevents it.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate',
    topic: 'Risk Assessment',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 209,
    question: 'Which pressure is particularly common for a self-employed electrician?',
    options: [
      'Having a fixed rota set months ahead by a planner',
      'Being told exactly which jobs to take each week',
      'Guaranteed sick pay whenever work has to be missed',
      'No income when unwell, so time off feels impossible',
    ],
    correctAnswer: 3,
    explanation:
      'Where earnings stop the moment work stops, taking time off carries a direct cost, so problems get worked through rather than dealt with. The other options describe features of employed work, which is exactly what the self-employed electrician does not have.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate',
    topic: 'Self-Employment',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 210,
    question: 'Why is a long daily drive to site a safety issue and not just a wellbeing one?',
    options: [
      'It uses fuel that the business has to pay for weekly',
      'Tiredness raises the chance of mistakes and errors',
      'It reduces the hours available for paid site work',
      'It makes parking near the compound harder to find',
    ],
    correctAnswer: 1,
    explanation:
      'People make more errors when fatigued, and an electrician making errors is a safety problem on the tools as well as behind the wheel. Cost and lost hours are real commercial effects, but they are business issues rather than reasons fatigue belongs in a risk assessment.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate',
    topic: 'Fatigue and Travel',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 211,
    question: 'A colleague asks you to promise to tell nobody before they speak. What should you say?',
    options: [
      'Promise straight away so that they will open up',
      'Refuse to listen at all unless they drop the request',
      'Say you will keep it private unless someone is at risk',
      'Agree, then tell the supervisor quietly afterwards',
    ],
    correctAnswer: 2,
    explanation:
      'Being honest about the limit before they speak is the only version that keeps trust intact. Promising everything to get them talking is tempting and feels kind, but if you later have to act on a risk you will have broken a promise at the exact moment they needed to rely on you.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate',
    topic: 'Confidentiality',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 212,
    question: 'Where should you point a colleague who needs more help than you can give?',
    options: [
      'To a search engine to work it out for themselves',
      'To another workmate who had something similar once',
      'To the site foreman for a formal written warning',
      'To a recognised support service or their own GP',
    ],
    correctAnswer: 3,
    explanation:
      'Signposting to a recognised support service or a GP connects the person to people qualified to help. Pointing them at a workmate with a similar story sounds relatable, but shared experience is not the same as trained support and can leave both of them out of their depth.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Signposting',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 213,
    question: 'What is the employee assistance programme, where an employer provides one?',
    options: [
      'A confidential support service arranged by the employer',
      'A record of sickness absence kept by the site office',
      'A training course all new starters must complete',
      'A bonus scheme paid for good attendance on site',
    ],
    correctAnswer: 0,
    explanation:
      'Where one is provided, it is a confidential service the employer arranges so staff can get support without going through their line manager. Confusing it with an absence record is the common mistake and matters, because people will not use a service they believe is being logged against them.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Employee Assistance',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 214,
    question: 'A normally reliable electrician is making unusual errors. What should the supervisor do first?',
    options: [
      'Issue a written warning about the standard of work',
      'Move them onto easier work without any discussion',
      'Have a private conversation about how they are doing',
      'Raise it in the morning briefing in front of everyone',
    ],
    correctAnswer: 2,
    explanation:
      'A change in a reliable worker is information, not yet misconduct, so the first move is to find out what is behind it. Moving them to easier work quietly seems considerate, but it removes their standing without ever telling them why and leaves the real cause untouched.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Supervisor Response',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 215,
    question: 'Which regulations require an employer to consult employees who are not represented by a union?',
    options: [
      'The Safety Representatives and Safety Committees Regulations 1977',
      'The Health and Safety (Consultation with Employees) Regulations 1996',
      'The Health and Safety (Information for Employees) Regulations 1989',
      'The Management of Health and Safety at Work Regulations 1999',
    ],
    correctAnswer: 1,
    explanation:
      'The 1996 Regulations cover consultation with employees who are not covered by union safety representatives. The 1977 Regulations are the attractive wrong answer because they are the better known consultation rules, but they apply only through recognised trade union representatives.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Consultation',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 216,
    question: 'What best describes noticing a pattern rather than reacting to a single bad day?',
    options: [
      'Judging a person by how they behaved on one morning',
      'Seeing the same change repeat over several weeks',
      'Waiting a full year before mentioning anything to them',
      'Recording every mood in a notebook for the employer',
    ],
    correctAnswer: 1,
    explanation:
      'Everyone has an off day, so one morning tells you very little, whereas the same change repeating carries real meaning. Note that patience is not the same as delay, and stretching the wait out to a year is not caution, it is simply avoiding the conversation.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate',
    topic: 'Recognising the Signs',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 217,
    question: 'Which of the HSE Management Standards is about how much say a worker has in the way they work?',
    options: [
      'Control, meaning say over how the work is done',
      'Demands, meaning workload and work patterns',
      'Change, meaning how changes are communicated',
      'Support, meaning encouragement and resources',
    ],
    correctAnswer: 0,
    explanation:
      'Control is defined as how much say the person has in the way they do their work. Demands is the easy confusion because both concern the work itself, but demands is about the size and shape of the workload rather than who decides how it gets done.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'intermediate',
    topic: 'Workplace Stressors',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 218,
    question: 'What does a supervisor do that most reduces stigma around mental health on site?',
    options: [
      'Put a poster in the welfare unit and leave it there',
      'Talk about it openly and treat it like any other risk',
      'Deal with it only when somebody is signed off sick',
      'Ask each worker to declare any condition in writing',
    ],
    correctAnswer: 1,
    explanation:
      'Stigma drops when the subject is ordinary, and a supervisor who raises it in the same tone as any other risk makes it ordinary. A poster is easy and visible but changes nothing on its own, because the crew take their lead from what is actually said out loud.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'intermediate',
    topic: 'Reducing Stigma',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 219,
    question: 'Why does knowing your limits matter when supporting a colleague?',
    options: [
      'It means you never have to speak to them about it',
      'It shifts all the responsibility onto the employer',
      'It lets you help without taking on a clinical role',
      'It proves you have completed a recognised course',
    ],
    correctAnswer: 2,
    explanation:
      'Your job is to notice, ask, listen and signpost, and knowing that boundary is what makes it safe to get involved at all. Treating limits as a reason to hand everything to the employer misses that the personal check in is the part only a workmate can do.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate',
    topic: 'Knowing Your Limits',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 220,
    question: 'You had a difficult conversation with a workmate last week. What is the best follow up?',
    options: [
      'Say nothing so they do not feel embarrassed',
      'Ask whether they have fixed the problem yet',
      'Tell the whole crew to keep an eye on them',
      'Ask how they have been since you last spoke',
    ],
    correctAnswer: 3,
    explanation:
      'Returning to it shows the first conversation was not a one off, and an open question lets them say as much or as little as they want. Saying nothing to spare their embarrassment is well meant but reads as regret, as though the subject is now off limits.',
    section: 'Mental Health Fundamentals',
    difficulty: 'intermediate',
    topic: 'Following Up',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 221,
    question: 'A colleague tells you in confidence something that suggests they may be at risk of harming themselves. What must you do?',
    options: [
      'Keep it to yourself because you gave your word',
      'Stay with them and get professional help right now',
      'Send them a leaflet about support services later',
      'Book a chat with them for the end of next week',
    ],
    correctAnswer: 1,
    explanation:
      'Where there is risk to life you stay with the person and get professional help immediately, and you never leave them or try to carry it alone. Keeping the promise is the strongest pull here, but confidentiality was never absolute, and a promise cannot outrank someone staying alive.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced',
    topic: 'Confidentiality',
    category: 'Substance Misuse, Self-Harm & Suicide',
  },
  {
    id: 222,
    question: 'Why should you avoid promising complete confidentiality before a colleague speaks?',
    options: [
      'Because the employer owns every conversation on site',
      'Because you may need to act if there is risk to life',
      'Because promises made at work are never enforceable',
      'Because the details must be logged in the site diary',
    ],
    correctAnswer: 1,
    explanation:
      'Say up front that you will keep it between you unless someone is at risk, so the limit is agreed rather than discovered later. Thinking the employer owns the conversation goes too far the other way and would make an honest chat impossible for anyone.',
    section: 'Substance Misuse, Self-Harm & Suicide',
    difficulty: 'advanced',
    topic: 'Confidentiality',
    category: 'Substance Misuse, Self-Harm & Suicide',
  },
  {
    id: 223,
    question: 'What is the difference between supporting a colleague and taking responsibility for them?',
    options: [
      'Support means listening and signposting, not fixing',
      'Support means solving the problem they brought you',
      'Support means managing their appointments and money',
      'Support means reporting each detail to the employer',
    ],
    correctAnswer: 0,
    explanation:
      'Support keeps the person in charge of their own decisions while you stay alongside and point towards help. Taking over their affairs feels like the caring option, but it removes their control, which is one of the things that was already in short supply.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Supporting vs Responsibility',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 224,
    question: 'You have supported a struggling workmate for weeks and are now drained yourself. What is the right step?',
    options: [
      'Carry on alone because you promised to be there',
      'Cut contact suddenly so the pressure is removed',
      'Get support for yourself and share the load safely',
      'Hand over the full details to the whole site crew',
    ],
    correctAnswer: 2,
    explanation:
      'Supporters need support, and bringing in other help keeps you useful rather than heading for your own crisis. Carrying on alone out of loyalty is the trap, because the person ends up depending on one exhausted individual instead of anything that lasts.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Supporting vs Responsibility',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 225,
    question: 'A performance drop may have a cause behind it. How should a supervisor open that discussion?',
    options: [
      'State the standard expected and end the discussion',
      'Describe what changed and ask what is going on',
      'Ask the crew for examples before speaking to them',
      'Start a formal capability process straight away',
    ],
    correctAnswer: 1,
    explanation:
      'Naming the observable change and then asking an open question separates the fact from the cause and gives the person room to explain. Restating the standard and closing the conversation is the most common management reflex, and it reliably guarantees the cause stays hidden.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Supervisor Response',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 226,
    question: 'An employer says stress cannot be risk assessed because it is personal. Why is that wrong?',
    options: [
      'Because personal matters are never work related',
      'Because a doctor alone may assess any health risk',
      'Because work factors can be assessed and managed',
      'Because every worker reacts in the same way to it',
    ],
    correctAnswer: 2,
    explanation:
      'The Management Standards exist precisely to make stress assessable by targeting work factors such as demands, control, support, relationships, role and change. Saying only a doctor can look at health confuses assessing the work with assessing the individual, which is not what the employer is being asked to do.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Employer Duty',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 227,
    question: 'Which change to a job is most likely to reduce stress under the demands standard?',
    options: [
      'Adding a further supervisor above the existing one',
      'Reviewing workload and the pattern of the work',
      'Sending a monthly wellbeing email to the crew',
      'Moving the team to a different site each Monday',
    ],
    correctAnswer: 1,
    explanation:
      'Demands covers workload, work patterns and the work environment, so changing those is a direct control. A wellbeing email is visible and cheap but leaves the workload exactly as it was, which is why awareness activity alone rarely shifts anything.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Workplace Stressors',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 228,
    question: 'Why does lone working raise the risk of work-related stress?',
    options: [
      'Because lone workers always carry heavier tools',
      'Because a risk assessment is not needed when alone',
      'Because travel time counts towards the working day',
      'Because contact and support from others are reduced',
    ],
    correctAnswer: 3,
    explanation:
      'Support and relationships are both Management Standards, and working alone weakens each of them, so people can feel isolated or disconnected. Assuming no assessment is needed gets it backwards, since lone working is one of the situations that most needs assessing.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Lone Working',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 229,
    question: 'What practical arrangement most helps a lone worker who is struggling?',
    options: [
      'Agreeing regular contact and including them in updates',
      'Leaving them to work in peace with no interruptions',
      'Fitting a tracker so their location is always known',
      'Asking them to report only when a job goes wrong',
    ],
    correctAnswer: 0,
    explanation:
      'Agreed regular contact plus inclusion in meetings and updates rebuilds the support that lone working removes. A tracker answers where somebody is, not how they are, so it satisfies the safety question while leaving the isolation entirely unchanged.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Lone Working',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 230,
    question: 'Which observation is the strongest reason to check in on a workmate?',
    options: [
      'They have taken a different route to site this week',
      'They have withdrawn from the crew for several weeks',
      'They have been given a job they have not done before',
      'They have chosen to eat lunch in the van one day',
    ],
    correctAnswer: 1,
    explanation:
      'A sustained withdrawal from people they normally spend time with is a change in the person, held over weeks. Lunch alone on one day is the same behaviour without the pattern, and reading too much into a single instance is how people end up feeling watched rather than supported.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Recognising the Signs',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 231,
    question: 'Why is knowing what is normal for a person important before drawing conclusions?',
    options: [
      'Because quiet behaviour always means someone is unwell',
      'Because change from the usual is what carries meaning',
      'Because a manager must record a baseline for each worker',
      'Because behaviour is fixed and does not change at all',
    ],
    correctAnswer: 1,
    explanation:
      'Managing work-related stress relies on understanding what is normal for a person and spotting a change early. Treating quietness itself as a warning sign is the trap, because it labels a personality rather than noticing anything has actually altered.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Recognising the Signs',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 232,
    question: 'A worker jokes that a colleague is off with a bad case of stress. What is the best reply?',
    options: [
      'Laugh along so that nobody is singled out on site',
      'Say nothing and raise it with the manager later',
      'Say calmly that it is not something to joke about',
      'Reply with a longer joke to move the moment on',
    ],
    correctAnswer: 2,
    explanation:
      'A calm, immediate correction sets the standard in front of everyone who heard the joke, without turning it into a row. Raising it privately later is safer for you but leaves the joke standing at the time it was made, which is the moment the crew learn what is acceptable.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Reducing Stigma',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 233,
    question: 'What does listening rather than fixing look like in practice?',
    options: [
      'Asking open questions and letting the silence sit',
      'Offering a solution as soon as the problem is clear',
      'Explaining what you would do if you were in their place',
      'Taking notes so the details can be repeated later',
    ],
    correctAnswer: 0,
    explanation:
      'Open questions and a tolerance for pauses let the person reach what they actually came to say. Offering a solution the moment the problem appears is the strongest instinct in a trade built on fixing things, and it usually ends the conversation before the real issue surfaces.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Listening Skills',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 234,
    question: 'Why is asking directly better than hinting when you are worried about someone?',
    options: [
      'It removes any need to speak to them again later',
      'It makes a clear, honest opening they can answer',
      'It guarantees they will tell you what is happening',
      'It shows the crew that you have raised the matter',
    ],
    correctAnswer: 1,
    explanation:
      'A direct question is unambiguous, so the person knows the offer is real and can choose to take it. Expecting a guaranteed answer sets you up to feel rebuffed, when in fact a no today often becomes a yes once they have had time to think.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Starting a Conversation',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 235,
    question: 'Where and when is it best to check in on a workmate you are worried about?',
    options: [
      'During the site induction with the whole team present',
      'At the toolbox talk so the message reaches everyone',
      'By email after work so there is a written record',
      'On the way to the van, quietly and without an audience',
    ],
    correctAnswer: 3,
    explanation:
      'A private, low key moment alongside normal work lets someone answer honestly without performing for an audience. A toolbox talk raises awareness for the group, which is useful in itself, but it is the wrong setting for a conversation about one named individual.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Starting a Conversation',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 236,
    question: 'What does the HSE approach to Management Standards ask an employer to do?',
    options: [
      'Treat stress causes through risk assessment and partnership',
      'Provide a counselling service instead of any assessment',
      'Ask each worker to disclose any diagnosis they may have',
      'Record sickness absence and report the totals each year',
    ],
    correctAnswer: 0,
    explanation:
      'The Standards simplify risk assessment for stress and encourage working partnership between employers, employees and their representatives. Providing a support service instead is the popular substitute, but it helps people cope with causes that nobody has yet tried to remove.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Employer Duty',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 237,
    question: 'Which is a proper use of the role standard from the Management Standards?',
    options: [
      'Making sure job adverts describe the pay in full',
      'Making sure every worker holds the same job title',
      'Making sure duties are clear and do not conflict',
      'Making sure roles are rotated across the crew weekly',
    ],
    correctAnswer: 2,
    explanation:
      'Role is about people understanding what their role is and not being given conflicting ones. Rotating roles sounds like good practice and can help variety, but constant change without clarity makes the role problem worse rather than better.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Employer Duty',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 238,
    question: 'How should an employer involve the workforce when tackling causes of stress?',
    options: [
      'Consult workers and their representatives on the causes',
      'Decide the controls in the office and issue them out',
      'Ask the managers who set the work programme instead',
      'Wait for a formal grievance before taking any action',
    ],
    correctAnswer: 0,
    explanation:
      'Consultation is a legal duty and the Standards are built around partnership, because the people doing the work know where the pressure sits. Deciding controls centrally produces measures that look sound on paper and miss what is actually happening on site.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Consultation',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 239,
    question: 'A worker discloses a mental health difficulty to a supervisor. What is the right handling of that information?',
    options: [
      'Share it with anyone who asks after the shift ends',
      'Share it where needed, after asking for consent',
      'Record it on the noticeboard so the crew can help out',
      'Repeat it at the next site meeting as a safety point',
    ],
    correctAnswer: 1,
    explanation:
      'Information goes only as far as it needs to for the person to be supported, and consent is asked for first wherever possible. Telling the crew so they can help is well intentioned but takes the choice away from the one person whose information it is.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Supervisor Response',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 240,
    question: 'A subcontractor is doing long days plus two hours of driving each way. What should the employer consider?',
    options: [
      'That travel outside site hours is never their concern',
      'That fatigue affects only the drive and not the work',
      'That a later start would remove the risk completely',
      'That the hours and travel form part of the demands',
    ],
    correctAnswer: 3,
    explanation:
      'Work patterns and hours sit inside the demands standard, and fatigue raises error rates on the tools as well as on the road. Treating travel as nothing to do with the employer ignores that the work pattern is what created the journey in the first place.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Fatigue and Travel',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 241,
    question: 'Which feature of self-employment most limits access to workplace support?',
    options: [
      'There is more paperwork than an employed role has',
      'There is a wider range of jobs to choose between',
      'There is no employer scheme or line manager in place',
      'There is a need to buy and maintain your own tools',
    ],
    correctAnswer: 2,
    explanation:
      'With no employer behind you there is no assistance scheme, no line manager and no team noticing a change, so support has to be sought deliberately from outside. Paperwork is a genuine pressure but it is a workload problem rather than the reason help is hard to reach.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Self-Employment',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 242,
    question: 'What should you say when a workmate needs more help than you can offer?',
    options: [
      'That you are not the right person and must step back',
      'That you will stay alongside them while they get help',
      'That they should wait until the job is finished first',
      'That you will speak to their family on their behalf',
    ],
    correctAnswer: 1,
    explanation:
      'Signposting works best when it is not an exit, so you name your limit and stay present while they reach proper support. Stepping back cleanly respects the boundary but can land as rejection at the exact point they finally decided to say something.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Signposting',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 243,
    question: 'Why should an electrician avoid trying to diagnose a colleague?',
    options: [
      'Because a diagnosis is not needed to offer support',
      'Because a diagnosis can be made only in writing',
      'Because the employer must record it on the file',
      'Because a colleague will always deny it anyway',
    ],
    correctAnswer: 0,
    explanation:
      'You do not need a label to notice a change, ask a question and point towards help, and labelling is work for qualified people. Believing you must name the problem first is what stops many people from starting the conversation at all.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Knowing Your Limits',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 244,
    question: 'What most shows a crew that speaking up will be treated seriously?',
    options: [
      'Seeing a wellbeing policy pinned up in the office',
      'Seeing an annual survey sent out to all the staff',
      'Seeing a poster campaign run for a single week',
      'Seeing a request for help acted on without any fuss',
    ],
    correctAnswer: 3,
    explanation:
      'People judge a workplace by what happened to the last person who asked, not by what is written down. A policy on the wall is necessary but proves nothing on its own, because it costs the employer nothing until it is actually tested.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Reducing Stigma',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 245,
    question: 'An apprentice fears that asking for help will affect their future work. What is the best response?',
    options: [
      'Tell them to keep it quiet until they qualify fully',
      'Tell them nothing bad will ever happen to them here',
      'Explain how it will be handled and who they can ask',
      'Suggest they raise it once the contract has finished',
    ],
    correctAnswer: 2,
    explanation:
      'Being specific about the process and the people removes the unknown, which is usually what the fear is really about. A blanket reassurance is kindly meant but is a promise you cannot personally guarantee, and one bad experience would destroy it.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Reducing Stigma',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 246,
    question: 'Which is the best reason to raise a concern early rather than waiting?',
    options: [
      'It gives more chance for support to make a difference',
      'It creates a record that can be used later on if needed',
      'It moves the problem across to the site management team',
      'It avoids the need for any further conversation at all',
    ],
    correctAnswer: 0,
    explanation:
      'Early contact means support arrives while there are still options, which is the whole argument for spotting change at an early point. Framing it as creating a record turns a supportive act into an administrative one and changes how the person will read it.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Recognising the Signs',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 247,
    question: 'A manager reduces reported stress by discouraging people from raising it. Why does that fail?',
    options: [
      'Because reporting figures are published every quarter',
      'Because managers may not speak to staff about health',
      'Because it removes the need for a risk assessment',
      'Because the causes remain and the harm still happens',
    ],
    correctAnswer: 3,
    explanation:
      'Suppressing reports changes the number, not the work, so the demands, control and support problems carry on producing harm unseen. Thinking managers are barred from discussing health is a separate misunderstanding, and it is often the excuse used for saying nothing.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Employer Duty',
    category: 'Workplace Implementation & Wellbeing',
  },
  {
    id: 248,
    question: 'What belongs in a risk assessment that covers health as well as safety?',
    options: [
      'The personal history of each individual employee',
      'The medical records held by the company doctor',
      'Work factors such as demands, control and support',
      'A list of workers who have been off sick this year',
    ],
    correctAnswer: 2,
    explanation:
      'The assessment looks at the work and the conditions it creates, which is exactly what the Management Standards set out. Gathering personal histories feels thorough but assesses the people instead of the job, and it collects sensitive information with no control to attach it to.',
    section: 'Depression, Anxiety & Stress',
    difficulty: 'advanced',
    topic: 'Risk Assessment',
    category: 'Depression, Anxiety & Stress',
  },
  {
    id: 249,
    question: 'Why does following up matter as much as the first conversation?',
    options: [
      'It shows the offer of support was genuine and lasting',
      'It closes the matter off so it need not be raised again',
      'It provides evidence that the correct process was used',
      'It transfers the concern to somebody else on the crew',
    ],
    correctAnswer: 0,
    explanation:
      'A second conversation proves the first was not a one off duty done, and it is often where the person says what they held back. Treating the follow up as closing the matter misreads it, because support is a thread rather than a task with a completion date.',
    section: 'Mental Health Fundamentals',
    difficulty: 'advanced',
    topic: 'Following Up',
    category: 'Mental Health Fundamentals',
  },
  {
    id: 250,
    question: 'What single habit does most to support mental health across a working crew?',
    options: [
      'Waiting for people to come forward when they choose',
      'Running one awareness session each calendar year',
      'Keeping work talk and personal talk fully separate',
      'Checking in with each other regularly and honestly',
    ],
    correctAnswer: 3,
    explanation:
      'Regular, ordinary check ins build the baseline you need to spot a change and make asking normal rather than an event. Waiting for people to come forward respects privacy but relies on the one thing struggling people find hardest, which is starting the conversation.',
    section: 'Workplace Implementation & Wellbeing',
    difficulty: 'advanced',
    topic: 'Supporting Others',
    category: 'Workplace Implementation & Wellbeing',
  },
];
